# 1. Overview 
Khi làm việc với Python, bạn không cần thiết phải import hẳn một thư viện để đọc và ghi files. Bản thân nó đã cho phép chúng tả thực hiện điều này.

Việc đầu tiên trong quá trình đọc ghi file đó là sử dụng hàm `open` để trả về một `file object`. `File object` bao gồm các methods và attributes cho phép chúng ta có thể truy xuất thông tin, hay xử lý trên file.

Ví dụ: `mode attribute` trả về thông tin loại file, hay `name attribute` trả về tên file.

# 2. File Types
Với Python file được hiểu với một khái niệm tương đối khác với những gì chúng ta từng nghe trước đây. 

Trong Windows, file có thể là bất cứ những gì có thể thao tác, chỉnh sửa hay tạo mới bởi user/OS. Điều đó có nghĩa là files có thể là images, text documents, ... Hầu hết các files được lưu trữ trong các thực mục khác nhau nhằm dễ dàng quản lý. 

Trong Python, file được phân loại thành text hoặc mã nhị phân, và sự khác nhau giữa hai loại đấy là quan trọng. 

Text files được cấu trúc bởi các dòng, mỗi dòng gồm các ký tự. 

Mỗi dòng  kết thúc bởi một kí tự đặc biệt gọi là EOL hay kí tự **End Of Line**. Có một vài kiểu types nhưng phổ biến nhất là dấu {,} hay kí tự dòng mới. Nó kết thúc dòng hiện tại và trình biên dịch sẽ hiểu bắt đầu một dòng mới. 

Binary files là bất kỳ loại file nào không phải là text file. Binary file chỉ có thể xử bởi các ứng dụng biết hay hiểu về cấu trúc của file. Nói cách khác, chúng là các ứng dụng có thể đọc và giải mã nhị phân. 

# 3. Open Function
Như đã nói ở trên để thao tác file ta sử dụng `open` function.
```
file_object  = open("filename", "mode") 
```
`mode` cho phép trình biên dịch hiểu được file sẽ được sử dụng bởi mục đích gì. 

# 4. Mode 
`mode` là optional argument, nếu bạn không khái báo thì giá trị mặc định là `r` (read mode). 
* ‘r’ – Read mode khi mà file chỉ sử dụng để đọc
* ‘w’ – Write mode sử dụng để sửa, ghi thông tin trên file (nếu file đã tồn tại thì mọi thông tin trên file sẽ bị xóa) 
* ‘a’ – Appending mode sử dụng để thêm data vào cuối file
* ‘r+’ – Special read and write mode sử dụng để đọc, ghi khi làm việc với file

```
f = open(“workfile”,”w”) 
print(f) 
```
Câu lệnh trên mở file có tên là "workfile" với writting mode vì thể chúng ta có thể thay đổi nó. 

#  5. Create a text file
Mình sẽ lấy ví dụ với file có tên là testfile.txt 
```
file = open("testfile.txt","w") 
 
file.write("Hello World\n") 
file.write("This is our new text file\n") 
file.write("and this is another line\n") 
file.write("Why? Because we can\n") 
 
file.close() 
```
Bây giờ ta hãy cùng mở file để xem kết quả nhé 
```
$ cat testfile.txt 
Hello World 
This is our new text file 
and this is another line. 
Why? Because we can.
```

# 6. Reading a Text File 
Có rất nhiều cách để đọc file. 

Nếu bạn muốn lấy ra toàn bộ ký tự trong file có có thể dùng: 
```
file = open("testfile.txt", "r") 
print(file.read())
```
Hay in ra 5 ký tự đầu tiên: 
```
file = open("testfile.txt", "r") 
print(file.read(5))
```
Nếu bạn muốn đọc file line by line:
```
file = open("testfile.txt", "r") 
print(file.readline())
```
Nếu muốn trả về tất cả các line:
```
file = open("testfile.txt", "r") 
print(file.readlines())
```

# 7. Looping over a file object
```
file = open("testfile.txt", "r") 
for line in file: 
  print(line)
```

# 8. Closing a File
Khi bạn đã hoàn thành thao tác chúng ta hãy sử dụng function `close` để đóng file, giải phóng tài nguyên đang sử dụng. Sau khi đã close ta sẽ không thể thao tác lên file được nữa. 

Trên đây mình đã giới thiệu một số khái niệm đơn giản khi làm việc với file. Hy vọng bài viết sẽ giúp ích và chúc mọi người một ngày làm việc vui vẻ.

Tham khảo: [Reading and Writing Files in Python](https://www.pythonforbeginners.com/files/reading-and-writing-files-in-python)