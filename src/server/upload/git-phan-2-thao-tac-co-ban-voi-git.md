# Các thao tác với git khi tham gia dự án  
## Clone dự án về local
```
Git clone <url_repository >
```
![](https://images.viblo.asia/e85b5fb3-e1cf-4375-97b2-e9dbba3e2b5c.png)
 
Truy cập vào đường dẫn của repository trên gitlab hoặc github, chọn clone dự án sẽ thấy các lựa chọn clone bằng SSH hoặc clone bằng HTTPS như trong hình. <br>
 Thông thường đa phần mọi người sẽ lựa chọn ***clone with HTTPS*** , tuy nhiên khi tham gia dự án với công ty sẽ yêu cầu các bạn ***clone with SSH*** để tăng tính bảo mật cho dự án. Sự khác biệt giữa SSH và HTTPS các bạn có thể tham khảo thêm các bài viết khác để phân biệt và nắm rõ hơn. <br>
Copy URL của 1 trong  2 cách về, bật terminal rồi thực hiện clone thôi. <br>
Ví dụ: 
`git clone https://gitlab.com/nguyenthuylinhbt98/test.git`

##  Tạo branch làm việc
Clone về xong rồi thì tất nhiên là làm việc với nó rồi :) <br>
 Đã làm việc theo team thì chả ai lại code trực tiếp trên cùng 1 forder rồi nên là bây giờ mỗi ông sẽ được phân một nhánh riêng để tự xử thôi.
 Để tạo nhánh làm việc của mình thì thực hiện:
 
 `git checkout -b <branch_name>`
 
 Thời còn đi học, 1 team có 3-4 người làm 1 project bọn mình đặt branch kiểu *name1_dev, name2_dev, name3_dev*... <br>
 Sau khi đi thực tập mình thấy vào dự án thực tế công ty sẽ phân task để làm, lúc ấy mỗi lần thực hiện 1 chức năng sẽ tạo 1 task rồi thực hiện. <br>
 Có nhánh làm việc rồi thì code thôi, tự múa các thể loại nhưng đừng múa quá đà để conflict thì mệt lắm.
 
##  Thêm (add) && commit code
Sau khi thực hiện các chỉnh sửa, thêm chức năng trong code thì cần phải đề xuất các thay đổi code này. <br>
`git add <tên-tập-tin>` hoặc 
`git add *` 

Đề xuất ra thì phải cho những đồng chí khác biết mình code cái gì chứ, lâu lâu đọc lại còn chưa chắc biết mình làm gì nữa chứ chưa nói đến những ông khác đọc code mình.
Để thực sự commit những gì đã thay đổi chúng ta sử dụng câu lệnh sau: <br>
`git commit -m "Ghichú-cho-Commit"`

Commit sẽ theo chuẩn của công ty hoặc theo lead dự án, còn nếu không có chuẩn thì các bạn có thể Google để tập cẩn thận từ đầu, tạo thói quen commit code rõ ràng.
## Push thay đổi
List các thay đổi trong Working Directory của bạn nằm tại HEAD và nằm trên chính máy Local. Để gửi những thay đổi đó chúng ta thực hiện như sau: <br>
`git push origin HEAD` <br>
Sau khi push code thì đợi lead và đồng đội review rồi merge thôi.

Nếu bạn thực hiện project một mình thì có thể push trực tiếp lên master

` git push origin master`

## Cập nhật (pull) và trộn (merge) code
Để cập nhật toàn bộ thay đổi mới nhất từ Remote về repo local của bạn cần sử dụng câu lệnh<br>
`git pull`

câu lệnh trên được sử dụng để lấy vể ***(fetch)*** và trộn  ***(merge)***  các thay đổi ở Remote.

Để merge một nhánh vào nhánh đang hoạt động sử dụng:

`
git merge <nhánh>
`

Cả 2 trường hợp trên sẽ được tự động thực hiện. Nếu có xung đột xảy ra (2 nhánh cùng sửa đổi 1 file…) chúng ta sẽ phải thao tác thủ công chỉnh sửa file được hiển thị sau đó đánh dấu lại đã merge với lệnh

`git add <tên-tập-tin>`

### Clone project mới
| git | Nội dung | Ghi chú |
| -------- | -------- | -------- |
| git clone URL     | clone project từ git về local     |      |
| -------- | -------- | cd tời project vừa clone |
| git checkout -b dev_name     | tạo nhánh mới có tên dev_name và làm việc tại đây     | Text     |
| -------- | -------- | Múa code các thể loại |
| git add .     | đề xuất các thay đổi trong code     |      |
| git commit -m " nội dung thay đổi " | tạo commit code | ghi rõ ràng những thay đổi đã thực hiện trong code |
| git push origin HEAD     | đẩy code vừa thay đổi lên     |      |

### Làm việc với project cũ

| Git | Nội dung | Ghi chú |
| -------- | -------- | -------- |
| `git pull`  hoặc `git pull origin <branch_name>`   | update code mới nhất về local     |  có thể xảy ra conflict    |
| ---------  | ---------    |  fix conflict trong nước mắt :)    |
| git add .   |   đánh dấu thay đổi  |      |
| git commit -m "nội dung thay đổi"  |     |      |
| git push origin HEAD   |  -------   |  -------    |

Đây là các thao tác cơ bản nhất đối với git, trong quá trình làm việc các bạn sẽ còn gặp các trường hợp phải xử lý khác như mất code cũ, sửa conflict dẫn đến lỗi chức năng... và sẽ yêu cầu sử dụng các câu lệnh nâng cao hơn.

# Một số thao tác cần lưu ý
## Git fetch

Lệnh `git fetch` tải về dữ liệu từ Remote Repo (các dữ liệu như các commit, các file, refs)

Khi chạy câu lệnh `git fetch $remote_origin`, Git sẽ tải về dữ liệu của tất cả các branch của repository trên remote server nằm tại địa chỉ quy định bởi $remote_origin và cập nhật dữ liệu này với dữ liệu của cách branch phía dưới máy local.

Tuy nhiên `git fetch` không cập nhật dữ liệu của working copy. Điều này có nghĩa là nếu như có ***bất cứ thay đổi (commit) nào trên remote server thì chúng cũng không ảnh hưởng tới các tập tin, thư mục của bạn***.

* Tải về thông tin của tất cả các nhánh của remote có tên origin<br>
`git fetch origin`
hoặc
`git fetch --all`

* Tải thông tin của một nhánh, ví dụ master của remote origin <br>
`git fetch origin master`

## Git pull

Lệnh `git pull` lấy về thông tin từ remote và cập nhật vào các nhánh của local repo.

Khi chạy câu lệnh `git pull $remote_origin $branch_name`, Git sẽ áp thực hiện việc fetch dữ liệu của Git repository tại nhánh $branch_name từ server nằm tại địa chỉ quy định bởi $remote_origin và ***áp dụng (merge) các thay đổi này*** vào thư mục và tập tin ở working copy.

Thi hành lệnh: <br>
`git pull` <br>
Hoặc chỉ rõ remote: <br>
`git pull origin`
Git sẽ tải về thông tin và ngay lập tức merge cho nhánh đang làm việc, nó *tương đương* với lệnh <br>
`git fetch origin` hoặc
`git merge origin/master`

Các bạn có thể tìm hiểu ký hơn một số khái niệm về git như: git stash, git reset, git revert,... để phục vụ tốt hơn cho quá trình làm việc :)