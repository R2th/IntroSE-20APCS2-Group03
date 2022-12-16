# Mở đầu 
Xin chào các bạn, ae dev thì chắc hẳn không lạ gì với terminal rồi nhỉ :D, vì thế hôm nay mình sẽ trình bày một số phím tắt trên terminal để anh em có thể làm việc hiệu quả hơn nhé :D. làm việc hiệu quả hơn thì  performance lại tăng lên và được tăng lương :D, thật là tuyệt vời. Trong bài viết này mình chỉ đề cập đến các phím tắt ở trên ubuntu linux thôi nhé, cùng bắt đầu luôn nào.
### Mở terminal
Để thực hiện mở terminal trên ubuntu bạn chỉ cần gõ 
```
crtrl + alt+ t
```
là cửa sổ terminal đã hiện lên để cho bạn thao tác.
### Mở thêm một tab mới
Nó sẽ thực hiện mở thêm một tab mới 
```
crtl + shift + t
```
### Di chuyển giữa các tab
Để thực hiện di chuyển giữa các tab bạn chỉ cần gõ lệnh với số thứ tự của tab tương ứng
```
alt + "số thứ tự của tab"
```
### Mở thêm một cửa sổ mới 
Nó sẽ thực hiện mở thêm một cửa sổ terminal mới
```
crtl + shift + n
```
### Đóng tab 
có 2 cách để đóng tab hiện tại đó là 
```
crtl + shift + w
```
hoặc 
```
crtl + d
```
### Xóa từ
Bình thường khi ấn xóa thì các bạn sẽ chỉ xóa được từng chữ một trên đó, để xóa nhanh hơn thì bạn ấn 
```
ctrl + w
```
nó sẽ xóa từng từ một thay vì xóa từng chữ.
### Xóa màn hình
Cái này tương tự khi bạn gõ lệnh `clear` nó sẽ thực hiện xóa toàn bộ  màn hình 
```
crtl + l
```
### Bỏ qua câu lệnh hiện tại
Nó sẽ bỏ qua và không thực thi câu lệnh hiện tại đang có trên màn hình 
```
crtl + c
```
### Hiển thị thư mục hiện tại 
Để hiển thị  ra đường dẫn đến thư mục làm việc hiện tại bạn chỉ cần gõ
```
pwd
```
 là viết tắt của print working directory.
### Di chuyển sang thư mục
* Để di chuyển vào thư mục con của thư mục hiện tại bạn chỉ cần gõ 
```
cd "tên thư mục con"
```
* Để di chuyển sang thư mục cha của thư mục hiện hành bạn chỉ cần gõ 
```
cd ..
```
### Liệt kê các thư mục 
* Liệt kê tất cả các thư mục (không tính các tập tin ẩn)
```
ls -l
```
* Liệt kê tất cả các thư mục (cả các tập tin ẩn), thông thường các  tập tin ẩn bắt đầu bằng dấu chấm.
```
ls -a
```
* liệt kê tất cả các thư mục và sắp xếp theo ngày tạo từ mới đễn cũ
```
ls -t
```
* liệt kê tất cả các thư mục và sắp xếp theo kích thước từ to đến nhỏ  
```
ls -s
```
### Tạo mới một file
Để tạo mới một file bạn gõ lệnh 
```
touch + "tên file"
```
### Copy file 
Để copy một file bạn chỉ cần gõ 
```
cp "tên file" "tên file copy"
```
### Đổi tên file 
```
mv "tên file cũ" tên "file mới"
```

### Xóa file 
* xóa file trong thư mục hiện tại 
```
rm "tên file"
```
* Xóa thư mục trống 
```
rmdir "tên thư mục"
```
* Xóa thư mục có các tập tin bên trong 
```
rm -rf "tên thư mục"
```
### Mở một file 
có 2 cách để mở một file 
```
less "tên file" 
```
hoặc 
```
catch "tên file"
```
### Copy file vào folder
```
cp "tên file"/"tên folder"
```
### Copy folder
```
cp -r "tên folder" "tên folder copy"
```
### Tạo một  folder mới 
```
mkdir "folder"
```
# Kết Luận 
Như vậy là mình đã giới thiệu đến các bạn một số phím tắt cũng như câu lệnh trên terminal để cho công việc của chúng ta được thực hiện một cách nhanh chóng và chuyên nghiệp hơn. Bài viết còn thiếu xót phần nào rất mong được sự đóng góp của các bạn. nếu thấy bài viết hữu ích hay cho  mình một upvote nhé. Một lần nữa cảm ơn các bạn