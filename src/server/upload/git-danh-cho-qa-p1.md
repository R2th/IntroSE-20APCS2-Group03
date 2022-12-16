Bạn đã từng loay hoay trong một lô tài liệu về GIT cũng như hàng trăm câu lệnh về nó mà không biết nên bắt đầu từ đâu hoặc phải mất thời gian khá lâu bạn mới "ngộ" ra những gì mà một QA cần biết khi tiếp xúc với GIT. Mình cũng đã từng như vậy, và nhận thấy rằng nếu một developer có thể bắt nhịp nhanh với GIT thì một QA nhất là từ manual bắt tay vào 1 dự án có liên quan đến GIT thường sẽ bị lúng túng khi sử dụng các câu lệnh GIT, dù bạn đã thử tìm kiếm trên mạng với những từ khóa như "Các câu lệnh cơ bản của GIT", v.v... Thế nên sau thời gian sử dụng GIT khá nhiều, mình đã bắt đầu ghi chú lại những vấn đề mình lúng túng để bây giờ tổng hợp lại những câu lệnh về GIT theo cách hiểu của mình. Và hi vọng, bài viết này có thể giúp ích được bạn đôi điều khi bạn trở thành "bạn của GIT". 

# 1. Đẩy dữ liệu lên github quản lý
**Điều kiện**: Trên github, một repository đã được tạo ra, chẳng hạn repository của bạn là hello thì đường dẫn repository của bạn là: https://github.com/giang3t/hello . 
Vậy để đẩy dữ liệu của bạn lên github quản lý, cần thực hiện các bước sau:

**Bước 1**: Mở terminal, và đi đến thư mục 'hello'.
```
cd  D:/hello
```
**Bước 2**: Khởi tạo thư mục git trên máy local.
```
git init
```
**Bước 3**: Thêm tất cả các file đang có trong thư mục hiện tại.
```
git add .
```
**Bước 4**: Commit các file có thay đổi trong thư mục hello, với dòng message là "init data".
```
git commit -am "init data"
```
**Bước 5**: Liên kết từ thư mục ở máy local với github.
```
git remote add origin https://github.com/giang3t/hello
``` 
**Bước 6**: Xác thực liên kết này.
```
git remote -v
```
**Bước 7**: Đẩy (push) các thay đổi từ thư mục local lên github ở branch master.
```
git push origin master
```

# 2. Lấy dữ liệu từ một repository từ xa trên github

**Bước 1**: Đi đến đường dẫn muốn lưu trữ dữ liệu trên repository.
```
cd D:/data
```
**Bước 2**: Lấy dữ liệu từ repository trên git về local. Chẳng hạn nếu đường dẫn repository trên github là https://github.com/giang3t/hello , bạn sẽ dùng như sau.
```
git clone https://github.com/giang3t/hello
```
**Bước 3**: Đưa dữ liệu lên branch master.

Giả sử bạn thay đổi dữ liệu trên branch master và khi bạn có thay đổi các file dữ liệu trên máy local và muốn đưa các thay đổi đó lên github ở branch master, cần làm các bước sau:

a. Kiểm tra các file thay đổi:
```
git status
```

b. Kiểm tra sự khác nhau giữa commit gần nhất và hiện tại:
```
git diff
```

c. Nếu muốn đưa file mới thêm, dùng lệnh sau:
```
git add file_path
```

d. Commit các file có thay đổi
```
git commit -am "message description for action your change"
```

e. Lấy (hay dùng từ merge) các thay đổi từ github về nếu có
```
git pull origin master
```

f. Nếu khi bạn pull từ github về mà bị conflict với dữ liệu trên local của bạn (nguyên nhân là do nhiều người cùng sửa trên cùng 1 file), thì bạn hãy sửa các conflict đó trước rồi hãy push dữ liệu lên bằng câu lệnh:
```
git push origin master
```

# 3. Merge dữ liệu từ một branch khác vào branch master
Thông thường branch master được quy định làm nhánh chính khi triển khai lên production, sau khi các dữ liệu từ các branch khác được test ok và chuẩn bị cho vòng test kết thúc thì sẽ merge dữ liệu đó vào branch master. Vậy để làm điều đó thì cần thực hiện các bước sau, giả sử merge dữ liệu từ branch test-login vào master.

**Bước 1**: Kiểm tra các file dữ liệu thay đổi:
```
git status
```

**Bước 2**: Nếu muốn đưa file mới thêm, dùng lệnh:
```
git add file_path
```

**Bước 3**: Commit các file có thay đổi
```
git commit -am "message description for action your change"
```

**Bước 4**: Chuyển sang branch master
```
git checkout master
```

**Bước 5**: Merge dữ liệu với branch test-login
```
git merge test-login
```

**Bước 6**: Và cuối cùng đẩy (push) dữ liệu lên branch master:
```
git push origin master
```

..............................................................

**Tài liệu tham khảo:** https://git-scm.com/book/en/v1/Git-Basics