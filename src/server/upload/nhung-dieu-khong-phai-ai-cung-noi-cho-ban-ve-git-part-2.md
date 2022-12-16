Tiếp tục series giải thích những điều tưởng chừng như đơn giản mà không phải ai cũng hiểu rõ về Git ( mọi người có thể tham khảo phần 1 tại [LINK](https://viblo.asia/p/nhung-dieu-khong-phai-ai-cung-noi-cho-ban-ve-git-part-1-1VgZvwkYlAw)), hãy bắt đầu phần 2 này với một chút bỡ ngỡ về `merge` và `rebase` nhé :D

### 3. Tích hợp không phải là đơn giản
Trong môi trường làm việc nhóm có nhiều dev cùng tham gia một dự án thì việc mỗi người đảm nhiệm một feature là chuyện rất bình thường, đôi khi feature của ông A cần một số tính năng của ông B, ông B lại cần gì đó của ông C, đại loại như vậy thì đó là lúc chúng ta cần sử dụng đến `merge` và `rebase`. **Hai lệnh này đều được thiết kế ra nhằm một mục đích là tích hợp những thay đổi từ nhánh này vào một nhánh khác, nhưng chúng thực hiện điều đó theo những cách rất khác nhau.**

<br>
Xem xét tình huống dưới đây

![](https://images.viblo.asia/529d8305-99f1-41b8-ae85-3ce9b90ff673.png)

Bạn đang làm việc tại feature branch, trong quá trình phát triền feature thì ở master cũng phát sinh thêm những commit mới do các feature của các dev khác đã được merge vào master, bạn cần lấy một số tính năng ở các commit mới đó, nếu sử dụng `merge`:
```
git checkout master
git pull origin master #orign ở đây là tên upstream repo
git checkout feature
git merge master
```
Sau khi merge master vào feature lịch sử commit của chúng ta sẽ như sau:
![](https://images.viblo.asia/a341b2b3-0196-43be-8f74-b7b1f9b7a7ff.png)
Cách merge này được gọi là 3-ways merge, tại sao lại là 3 way: 3 way ở đây là 3 commit, 1 commit mới nhất nhánh feature, 1 commit mới nhất của master và 1 base commit, commit gốc nơi bắt đầu rẽ nhánh. 
* Git sẽ tự động gộp các commit trên 1 nhánh lại thành 1 ( tất cả xanh lá cây vào làm 1, tất cả xanh da trời vào làm 1)
* Giờ ta đang có 1 trắng 1 xanh lá và 1 xanh da trời, git tiếp tục gộp xanh lá với xanh da trời, những chỗ nào ở cả 2 ( xanh lá và xanh trời) cùng sửa so với trắng sẽ phát sinh conflict, fix xong conflict git sẽ tiếp tục quá trình merge, kết thúc quá trình ta được 1 commit mới là commit merge master vào feature branch, rất trực quan phải không nào.

<br>
Nếu không sử dụng `merge`, mà dùng `rebase` mọi chuyện sẽ diễn ra như sau:

![](https://images.viblo.asia/16065faa-154a-4445-a402-3e2ad1ff628f.png)

```
git checkout master
git pull origin master #orign ở đây là tên upstream repo
git checkout feature
git rebase master
```
Chuyện xảy ra đằng sau quá trình này cụ thể như sau:
* Git sẽ mang những commit mới ( mới so với feature) sang nhánh feature, vào trước những commit mới của feature
* Đồng thời với đó commit id của tất cả các commit bên nhanh feature sẽ bị thay đổi hết

Tất nhiên, mỗi một phương pháp sẽ có những ưu nhược điểm riêng của nó:


|So sánh| Merge | Rebase |
| -------- | -------- | -------- |
| Ưu điểm| Merge không làm thay đổi lịch sử commit của branch, giúp tránh khỏi những cạm bẫy tiềm ẩn của rebase | Ngược lại với merge rebase giúp cho lịch sử commit sẽ rất rõ ràng, nó sẽ chỉ bao gồm những commit do bạn tạo ra và không phát sinh những commit ngoài ý muốn |
| Nhược điểm | Tuy nhiên merge sẽ làm phát sinh thêm 1 commit merge trong lịch sử commit, điều này đôi khi gây ra khá bất tiện trong quá trình theo dõi, rà soát lại lịch sử làm việc. Đôi khi với các convention của từng dự án thì việc phát sinh commit ngoài ý muốn như vậy là không được phép  | Đánh đổi lấy lịch sử rõ ràng là 2 mặt khuất: sự an toàn và việc truy tìm nguồn gốc. Việc thay đổi toàn bộ lịch sử commit đôi khi sẽ dẫn tới rất nhiều rắc rối nếu bạn không nắm rõ những gì mình đang làm. Việc rebase không tạo commit merge cũng gây ra khó khăn trong việc tìm lại thời điểm bạn merge những nhánh khác vào nhánh mình đang làm việc

### 4. Tìm kiếm lịch sử commit
Git cung cấp cho chúng ta rất nhiều option để xem log commit ( oneline, graph, decorate, ...), mỗi một option sẽ có những ưu nhược điểm nhất định và mỗi người hẳn đã chọn cho riêng mình một kiểu xem phù hợp với nhu cầu nhất, tuy nhiên mình tin không phải ai cũng biết cách để tìm kiếm được một commit theo cách nhanh chóng nhất ( đặc biệt là trong tình huống đống commit đã lên đến con số hàng nghìn ), dưới đây là 1 số tip nhỏ sẽ giúp bạn thực hiện điều đó:

<br>

##### 4.1. Giới hạn số commit muốn hiển thị ra:
```
git log -n    # n là số lượng commit bạn muốn xem
```
lệnh này sẽ giới hạn số commit muốn show ra trên log, muốn xem 5 commit gần nhất -5, 10 commit gần nhất -10 ...

<br>

##### 4.2. Giới hạn bằng thời gian:
Bạn có thể tìm kiếm các commit sau, hoặc trước những mốc thời gian cụ thể, vdu như sau:
```
git log --after="2016-9-1"
git log --after="yesterday"
git log --after="2017-7-1" --before="2018-7-4"
```

<br>

##### 4.3. Tìm hiểu theo tên của author:
```
git log --author="ThinhBui"
```
Có thể sử dụng regex để lọc với nhiều điều kiện hơn, ví dụ:
```
git log --author="ThinhBui\|Conan"
```
lệnh trên sẽ tìm những commit được thực hiện bởi `ThinhBui` hoặc `Conan` :D

<br>

##### 4.4. Tìm kiếm theo commit message:
```
git log --grep="Add somethings to somethins"
```
Lệnh trên sẽ tìm những commit mà trong message có chứa `Add somethings to somethins`, bạn có thể làm tương tự với tên file và nội dung bên trong các file

<br>

##### 4.5. Loại bỏ các commit merge
Dùng `git log --no-merges` để sâu toàn bộ lịch sử commit mà không bao gồm các commit merge, cũng có thể làm ngươc lại `git log --merges` để chỉ show ra các commit merge

### 5. To be continued ...
Mình sẽ tiếp tục chia sẽ những điều bí mật nho nhỏ nữa về git với các bạn trong bài viêt sau nhé