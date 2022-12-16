# Dạo quanh trang  [Github](https://github.com/) 1 vòng.
![](https://images.viblo.asia/03d8137b-c46c-4ea4-9787-385d07e0d9f1.png)

Chúng ta bắt đầu với 1 remote repository

**Repository** : Là 1 kho chứa, có thể coi  là nơi chứa source code, thông tin cần thiết, lịch sử thay đổi, nội dung thay đổi.

![](https://images.viblo.asia/63f962d9-f2ab-4934-b984-0503380beec3.png)

> Nhớ tích vào "Initialize this repository with a README"
>
Đây là Project của chúng ta: Có mỗi branch master mặc định chứa fide README.md mà lúc trên đã tích chọn. Là nơi để mô tả các chức năng của dự án.

![](https://images.viblo.asia/5cfc5ee6-8bfc-48bf-b205-71ad6360d3a6.png)

Đó là một remote repository, tiếp theo sau chúng ta tạo môi trường git ở máy tính tính của mình nhé.
Về việc cài đặt git các bạn có thể tham khảo [tại đây](https://thachpham.com/tools/git-cai-dat-git-va-thiet-lap-ban-dau.html).

Bước đầu tiên, chúng ta sẽ tạo 1 local repository.
```
$ git init
```
Giả sử là bạn đang đứng trên 1 project tên là sample_app. Lệnh này sẽ tạo ra 1 thư mục con mới có tên .git chứa tất cả các kho lưu trữ trong tương lai của bạn.

Tiếp đến ta có thể clone 1 repository đã có sẵn trên máy cục bộ.
```
$ git clone https://github.com/loc-0800/sample-app
```
## Vòng đời làm việc với git
![](https://images.viblo.asia/f2074465-1788-436e-bf03-8fb3264b7081.png)
Các bạn có thấy dòng màu đỏ không, đó là tường minh cho ta thấy 2 vùng làm việc giữa remote repository (kho lưu trữ từ xa) và local repository (kho lưu trữ cục bộ).


**WORKSPACE** là vùng tương tác, làm việc thực sự của chúng ta, có thể tạo ra các file, các dòng code mà lúc này nó chưa thực sự nằm trong git.

**INDEX** là cái stage area lúc mình dùng lệnh `$ git add 'file_name'`, sẵn sàng để commit.

**LOCAL REPOSITORY** và **REMOTE REPOSITORY** là hai nơi lưu trữ cục bộ và từ xa của project, coi như là đầu cuối của công việc.

### Làm quen với các lệnh git:

Giả sử ta tạo 1 file tên là file_name.html
```
$ touch file_name.html
```
Thêm vào **staging area** bằng lệnh add, ta có thể hiểu là từ **working directory** add vào **staging area**. Staging Area nghĩa là một khu vực mà nó sẽ được chuẩn bị cho quá trình commit.
```
$ git add "file_name.txt"
```
Muốn add nhiều file đnag làm việc cùng lúc
```
$ git add .
```
hoặc
```
$ git add *
```
Thường thì chúng ta sẽ không thấy sự khác biệt của 2 thằng này. Điểm khác biệt của 2 thằng này, đối với `$ git add .` khi mình đang đứng ở đâu thì nó sẽ add tất cả các file, thư mục từ nó trở xuống tính theo cấp cha con; còn đối với `$ git add *` nó sẽ add tất cả những gì mới ngay trong liên quan đến nó. Vậy cái nào hay được dùng hơn, mình hay dùng `$ git add .` hơn.

##### Commit là gì và cách thức hoạt động?
Commit nghĩa là một hành động để Git lưu lại một bản chụp (snapshot) của các sự thay đổi trong thư mục làm việc, và các tập tin và thư mục được thay đổi đã phải nằm trong Staging Area. Mỗi lần commit nó sẽ được lưu lại lịch sử chỉnh sửa của mã nguồn kèm theo tên và địa chỉ email của người commit.
Để commit tập tin file_name.html
```
$ git add -m "Tên commit"
```
Khi muốn commit vào commit trước đó.
```
$ git add --amend
```

**Điều kiện gì để commit một tập tin?**

Nếu bạn muốn commit một tập tin đó, bạn sẽ cần phải đưa tập tin đó vào trạng thái tracked bằng lệnh git add tên_file. Trong git có hai loại trạng thái chính đó là Tracked và Untracked, cụ thể:

* Tracked – Là tập tin đã được đánh dấu theo dõi trong Git để bạn làm việc với nó. Và trạng thái Tracked nó sẽ có thêm các trạng thái phụ khác là Unmodified (chưa chỉnh sửa gì), Modified (đã chỉnh sửa) và Staged (đã sẵn sàng để commit).
* Untracked – Là tập tin còn lại mà bạn sẽ không muốn làm việc với nó trong Git.

Nhưng bạn phải nên biết rằng nếu tập tin đó đã được Tracked nhưng đang rơi vào trạng thái (Modified) thì nó vẫn sẽ không thể commit được mà bạn phải đưa nó về Staged cũng bằng lệnh git add. 
Hơi lan man khó hiểu nhưng đừng quên bạn đã đọc tới đây.
 
 Kiểm tra trạng thái git hiện tại
 
```
$ git status
```
Nó sẽ hiển thị những file đang chờ thêm vào staging, những file đã được add..

**Hiển thị nhật kí commit**

```
$ git log
```
hoặc

```
$ git log --oneline
```
Nó sẽ hiển thị trên 1 dòng

**Push lên remote repository bằng cách nào?**

```
$ git push origin master
```

Trên đây là minh họa cho 1 lệnh push, chứ hiển nhiên trong dự án thực tế ta không push trực tiếp lên nhánh **master** mà là các nhánh khác.

Nếu bạn chưa có remote thì có thể thêm bằng cách:

```
$ git remote add loctran https://github.com/loc-0800/sample-app
```

**Trong hình trên mình đã cung cấp ta có thấy clone, fetch và pull. Liệu chúng có gì khác nhau???**

**git clone**
* Lệnh này sao chép toàn bộ dữ liệu trên remote repository về máy tính. Thường dùng khi chưa thực sự có project...

**git pull**

* Lệnh này lấy toàn bộ dữ liệu trên remote repository vào branch hiện tại đang đứng. Liên quan đến phần branch (xem phần dưới)

**git fetch**

* Lệnh này lấy toàn bộ dữ liệu trên remote repository nhưng việc gộp code là thực ti bằng tay.

#### Chúng ta cùng nhau qua phần branch nhé.
**Branch là gì?**

* Các nhánh (**branches**) được dùng để phát triển tính năng tách riêng ra từ những nhánh khác. Nhánh **master** là nhánh "mặc định" khi bạn tạo một repository. Sử dụng các nhánh khác tri đang trong giai đoạn phát triển và merge trở lại nhánh **master** một khi đã hoàn tất.

Hiện tại chúng ta đang ở nhánh master

Để sang nhánh khác làm việc với 1 chức nắng khác trong dự án. Giả sử chúng ta muốn làm chức năng đăng nhập.

```
$ git branch login_function
```

Để chuyển qua nhánh **login_function** làm việc ta cần checkout bằng cách
```
$ git checkout login_function
```

Hai lệnh trên có thể chung quy lại bằng lệnh này, mình vẫn hay dùng nhất.
```
$ git checkout -b login_function
```

Tức là, nếu chưa có nhánh login_function thì hệ thống sẽ tạo ra nhánh này và checkout qua để ta làm việc luôn, nếu đã tồn tại thì checkout qua như việc checkout bình thường.

Kiểm tra xem ta đang đứng ở nhánh nào.
```
$ git branch
```
Sẽ hiện ra tất cả các nhánh mà đang tồn tại ở local repository và thật sự ta đang đứng ở nhánh nào.

Thao tác xóa nhánh login_function

```
$ git branch -D login_function
```

Sau khi hoàn thành 1 chức năng, giả sử là chức năng **login** tại nhánh **login_function**.
Thì chúng ta sẽ phải thực hiện commit và chuyển nhánh sang master để thực hiện pull code về, đối với trường hợp này master chưa có gì thay đổi thì chưa có gì để pull về, còn với trường hợp khác ta phải tiếp tục thực hiện rebase hoặc merge để xưr lí code sau đó mới push lên remote repository.

**Merge, rebase và cách xử lí conflic code.**

Bạn có thể đọc [tại đây](https://freetuts.net/git-lenh-merge-branch-xu-ly-conflict-1076.html) để hiểu rõ, ở đây họ nói khá chi tiết cách dùng.

**Khi xong 1 nhánh mình sẽ thực hiện như sau:**
Giả sử nhánh đó tên là **chapter_5**

Thực thi lần lượt các lệnh.

	$ git add .
    
	git commit -m "Tên chức năng"
	Nếu đã có commit trước đó.
	$ git commit --amend
    
	$ git checkout master
	$ git pull origin master
	$ git checkout chapter_5
	$ git rebase master(-->Sửa conflic nếu có)
	$ git rebase --continue
 
	$ git rebase --abort : Để trở lại trạng thái khi chưa rebase nếu cần thiết.

Rồi thực hiện push lên remote repository:

	$ git push origin chapter_5
	$ git push origin chapter_5 -f nếu đã tồn tại nhánh chapter_5
    
##  Lời kết

Thực ra nếu chỉ đọc và học lý thuyết thì thật sự chúng ta không thực sự hiểu quy trình thực hiện của git ra sao. Chúng ta có thể áp dụng từ từ vào dự án rồi "mưa dầm thấm lâu" thì mới có thực sự ngấm được đôi phần. Ở bài sau mình sẽ chia sẻ những kinh nghiệm trong quá trình thực hiện dự án. Cám ơn bạn đã đọc bài chia sẻ của mình.

[Phần 2 tại đây!](https://viblo.asia/p/toi-da-bat-dau-voi-git-nhu-the-nao-phan-2-RQqKL2qpl7z)