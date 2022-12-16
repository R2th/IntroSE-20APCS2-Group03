* Đọc và ghi file là một trong những kỹ thuật vô cùng quan trọng và không thể thiếu nếu bạn là một lập trình viên chuyên nghiệp. Hầu hết các sản phẩm phần mềm hiện nay đều sử dụng qua kỹ thuật này. 
* Python là 1 trong những ngôn ngữ phổ biến nhất hiện nay, và tất nhiên nó cũng câp các phương thức hỗ trợ việc thao tác với file.
* Và hôm nay mình sẽ giới thiệu đến các bạn cách mà chúng ta xử lý file với python.
# Mở File
- Hàm chính trong xử lý file với python là hàm `open()`
- Hàm `open()` có 2 đối số truyền vào: Tên file và chế độ.
- Có 4 chế độ mở file khác nhau:
   - "r":  Read - Giá trị mặc định. Chế độ này cho phép mở 1 file để đọc. Sẽ trả về lỗi nếu file không tồn tại.
    - "a": Append - Mở 1 file để thêm vào. Nếu file không tồn tại sẽ tự động tạo mới file.
    - "w": Write - Mở 1 file để ghi. Tự tạo file nếu không tồn tại
    - "x": Create - Tạo mới 1 file. Trả về lỗi nếu file đã tồn tại
 - Ngoài ra bạn có thể chỉ định nếu file được xử lý ở dạng nhị phân hoặc text.
     - "t": Text - Giá trị mặc định
    - "b": Binary - Xử lý nhị phân
- Để mở 1 file chỉ để đọc thì bạn chỉ cần chỉ định tên file là đủ
```
f = open("demofile.txt")
```
- Đoạn code trên sẽ tương đương với :
```
f = open("demofile.txt", "rt")
```
## Đọc File
- Giả sử ta có tệp `demo.text` có nội dung như sau:
```
Hello from
another place
```
- Bạn mở file và dùng hàm `read()` để đọc nội dung file
```
f = open("demo.txt", "r")
print(f.read())
```
- Kết quả

![](https://images.viblo.asia/7e6b7e0c-8cbd-45dc-8483-ba0d6e870ff9.png)
- Bạn có thể chỉ định số ký tự đọc trong file:
```
f = open("demo.txt", "r")
print(f.read(5))
```
- Kết quả

![](https://images.viblo.asia/60c21d29-7e22-44cd-bff4-0d5c9a3732a3.png)
- Bạn có thể chỉ định đọc file theo dòng.
```
f = open("demo.txt", "r")
print(f.readline())
```
- Kết quả

![](https://images.viblo.asia/ea5bddc7-80e5-4f27-a4fd-9f127311afb5.png)
- Để đọc cả file theo kiểu dòng. Bạn sử dụng vòng lặp
```
f = open('demo.txt')
for x in f:
    print(x)
```
- Kết quả

![](https://images.viblo.asia/772e3902-9071-4e49-b20f-9306298a3355.png)
- Hãy đóng file khi bạn không cần thao tác với nó nữa 
```
f = open('demo.txt')
for x in f:
    print(x)
f.close()
```
# Ghi File
## Ghi 1 file đã có sẵn
- Để ghi file bạn cần thêm đối số vào hàm open:
    -"a" - Append - Ghi tiếp vào cuối file
    - "w" - Write - Ghi đè lên file cũ
- Ví dụ mình có 1 file `demowrite.txt` có nội dung như sau:
```
This is a demo!
```
- Nếu ghi file dùng chế độ Append:
```
f = open('demowrite.txt', 'a')
f.write('text was write by append mode!')
f.close()
```
- Chạy đoạn lệnh trên và mở lại file `demowrite.txt` bạn sẽ thấy như sau:
```
This is a demo!
text was write by append mode!
```
- Nếu ta dùng chế độ Write
```
f = open('demowrite.txt', 'w')
f.write('text was write by Write mode!')
f.close()
```
- Chạy đoạn lệnh trên và mở lại file `demowrite.txt` bạn sẽ thấy như sau:
```
text was write by Write mode!
```
- Như vậy, chế độ Write sẽ ghi đè lên dữ liệu cũ của file, còn chế độ Append sẽ giữ nguyên dữ liệu cũ và ghi tiếp vào cuối file.
## Tạo mới File
- Để tạo mới file trong python, sử dụng hàm open() với các đối số sau:
    - "x": Create - Tạo file, trả về lỗi nếu file đã tồn tại.
    - "a" - Append - Tạo file nếu file chưa tồn tại
    - "w" - Write - Tạo file nếu chưa tồn tại
- Câu lệnh sau sẽ tạo ra 1 file `democreatefile.txt`
```
f = open("democreatefile.txt", "x")
```
# Xóa File
- Để xóa file, bạn cần import OS Module và dùng hàm `remove()` của nó. 
- Và để tránh trường hợp file không tồn tại, bạn nên check trước khi xóa :
```
import os
if os.path.exists("democreatefile.txt"):
    os.remove("democreatefile.txt")
else:
    print("The file does not exist")
```
# Xóa thư mục
- Để xóa thư mục, bạn dùng hàm `rmdir()` của OS Module:
```
import os
os.rmdir("myfolder")
```

# Kết luận
- OK vậy là mình đã giới thiệu xong tới các bạn 1 số thao tác cơ bản với file trong Python.
- Mọi ý kiến đóng góp mọi người vui lòng để lại dưới phần commet giúp mình nhé.
# Tài liệu tham khảo
 - https://www.w3schools.com/python/python_file_handling.asp