Khi làm việc trong một dự án có nhiều thành viên,việc các thành viên trong nhóm có thể tạo branchs,thêm, sửa và  xóa files trong dự án. Sau đó thực hiện commits lên git khi hoàn thành code.
Tuy nhiên, trong một số trường hợp, bạn có thể nhận ra rằng những thay đổi bạn đã thực hiện không tốt cho lắm.

Bạn đã sửa đổi một số files, thêm và xóa rất nhiều dòng khỏi các files của mình, nhưng bạn muốn quay lại.
Vì bậy, bạn muốn “revert the changes” cái bạn đã làm và quay trở lại các files bạn đã có ban đầu.

Kỹ thuật này được gọi là “reset to HEAD” và nó là một công cụ khá mạnh cho các nhà phát triển sử dụng.

Trong bài viết này mình sẽ giới thiệu các bạn cách sử dụng reset to HEAD on Git.<br>

## **1. Git Hard Reset to HEAD**
Khi resetting files trên Git, chúng ta có 2 options đó là khôi phục cứng(hard reset files) và khôi phục mềm(soft reset files).<br>
Trong phần này, mình sẽ mô tả cách bạn có thể khôi phục cứng cài đặt gốc(hard reset files) các files trên Git.<br>
Để khôi phục cài đặt gốc các tệp về HEAD trên Git, hãy sử dụng lệnh “git reset” với tùy chọn “–hard” và chỉ định HEAD.<br>
```GIT
$ git reset     --hard HEAD     (going back to HEAD) 
$ git reset     --hard HEAD^     (going back to the commit before HEAD) 
$ git reset     --hard HEAD~1     (equivalent to "^") 
$ git reset     --hard HEAD~2     (going back two commits before HEAD)
```

### **Ví dụ về Hard Reset**
Để hiểu các trường hợp sử dụng "khôi phục cài đặt gốc", hãy xem một số ví dụ nhanh bên dưới.<br>
Khi cố gắng đặt lại files, lệnh đầu tiên bạn muốn khởi chạy là lệnh “git log”.<br>
Sử dụng lệnh “git log”, bạn sẽ có thể hiểu được tổng quan về các nhánh Git hiện tại của mình và các commits của nó.<br>
```GIT
$ git log   --oneline    –graph

* 941c450 (HEAD -> develop, origin/develop) three commit
* 8cfada9 second commit
* 17c751f firt commit
* 9fdeae3 (origin/main, origin/HEAD, main) Initial commit
```

Như bạn thấy commit có HEAD 941c450 là commit cuối cùng trong branch develop<br>
Để khôi phục cài đặt gốc về trước HEAD hãy sử dụng “git reset” với tùy chọn “–hard” và chỉ định HEAD ^.<br>
```
$ git reset --hard HEAD^

HEAD is now at 8cfada9 second commit
```
Như bạn có thể thấy, HEAD của nhánh phát hành hiện đang trỏ đến cam kết thứ hai: về cơ bản chúng ta đã đặt lại về cam kết trước HEAD.<br>
```
$ git log --oneline –graph

* 8cfada9 (HEAD -> develop) second commit
* 17c751f firt commit
* 9fdeae3 (origin/main, origin/HEAD, main) Initial commit

```

### **Khôi phục cài đặt gốc cho HEAD**

Để hoàn tác khôi phục cài đặt gốc trên Git, hãy sử dụng lệnh “git reset” với tùy chọn “–hard” và chỉ định “HEAD @ {1}”<br>
Sử dụng ví dụ mà chúng tôi đã sử dụng trước đây, điều đó sẽ cung cấp cho chúng ta kết quả sau<br>
```
$ git reset --hard HEAD@{1}
HEAD is now at 941c450 three commit

$ git log --oneline –graph

* 941c450 (HEAD -> develop, origin/develop) three commit
* 8cfada9 second commit
* 17c751f firt commit
* 9fdeae3 (origin/main, origin/HEAD, main) Initial commit

```

## **2.Git Soft Reset to HEAD**<br>

Để khôi phục lại các files về HEAD trên Git, hãy sử dụng lệnh “git reset” với tùy chọn “–soft” và chỉ định HEAD<br>
```
$ git reset    --soft HEAD    (going back to HEAD) 
$ git reset    --soft HEAD^    (going back to the commit before HEAD) 
$ git reset    --soft HEAD~1    (equivalent to "^") 
$ git reset    --soft HEAD~2    (going back two commits before HEAD)

```
Trái ngược với khôi phục cứng(hard reset files), khôi phục mềm(soft reset files) sẽ không làm thay đổi thư mục làm việc(working directory) và chỉ mục(index).<br>
Do đó, các thay đổi được thực hiện giữa HEAD ban đầu và HEAD hiện tại sẽ được thực hiện.<br>
Quay lại ví dụ mà chúng ta đã lấy trước đây, hãy xem nhanh nhánh "develop".<br>
```
$ git log --oneline –graph

* 941c450 (HEAD -> develop, origin/develop) three commit
* 8cfada9 second commit
* 17c751f firt commit
* 9fdeae3 (origin/main, origin/HEAD, main) Initial commit

```
Để di chuyển HEAD đến một cam kết trước đó, hãy sử dụng lệnh “git reset” với tùy chọn “–soft” và chỉ định “HEAD ^”<br>
```
$ git reset   --soft HEAD^         (or HEAD~1)
```
Lần này, khu vực tổ chức sẽ được lấp đầy với những thay đổi được thực hiện giữa cam kết 8cfada9 và cam kết 941c450.<br>
Hãy xem các thay đổi bằng lệnh "git status".<br>
```
$ git status
On branch develop
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   sample3.txt

```
### **Combining commits using soft reset**<br>

Một cách sử dụng phổ biến của lệnh soft reset là kết hợp nhiều commits khác nhau thành một commit duy nhất.<br>
Trên chi nhánh hiện tại của bạn, hãy xem tất cả các cam kết hiện đã được thực hiện.<br>
```
$ git log --oneline –graph

* 6039dc8 (HEAD -> develop) three commit
* 8cfada9 second commit
* 17c751f firt commit
* 9fdeae3 (origin/main, origin/HEAD, main) Initial commit

```
Để kết hợp ba lần cam kết cuối cùng, hãy di chuyển HEAD bằng cách sử dụng lệnh “git reset” với tùy chọn “–soft”.<br>
```
$ git reset --soft HEAD~3

$ git status
On branch develop
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   sample1.txt
        new file:   sample2.txt
        new file:   sample3.txt

```
Bây giờ các cam kết đã được khôi phục, hãy cam kết các tệp bằng lệnh "git commit".<br>
```
$ git commit -m "Combining commits using git reset"

$ git log --oneline --graph
* d88fc78 (HEAD -> develop) Combining commits using git reset
* 9fdeae3 (origin/main, origin/HEAD, main) Initial commit

```
Các cam kết của bạn hiện được kết hợp trong một cam kết duy nhất.<br>

**Note**: Trong trường hợp mà bạn đã thực hiện các commits và đã pushed code đến server,thì mình sẽ thực hiện lần lượt các lệnh sau để cập nhật các commits trên server nhé:<br>
```
1.	git reset  --hard  HEAD
2.	git clean -f  -d
3.	git push -f  <remote-name-origin> <branch-name-develop>

```
Tham khảo: https://devconnected.com/tag/git/<br>
Hy vọng bài viết này sẽ giúp các bạn hiểu hơn về cách sử dụng Git Reset HEAD!