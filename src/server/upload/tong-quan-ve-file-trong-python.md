Xin chào mọi người, hiện mình đang tìm hiểu về python, thấy một phần khá hay và quan trọng đó là xử lý với file. Hôm nay, mình xin viết một bài nhỏ để chia sẻ những thứ mình học được.
Trong python, văn bản được quản lý theo 2 kiểu:
1. Văn bản thường
2. Văn bản nhị phân
Cùng với một số quyền như đọc, ghi file. Ta đi từng bước theo bên dưới nhé !
## Mở File
Đầu tiên, khi làm việc với file,  chúng ta cần mở file đó ra. Trong python việc này khá đơn giản
`>>> myFile = open([path of file], [access mode], [buffer size])`
Ở đây myFile sẽ là đối tượng của tệp và open()phương thức sẽ mở tệp được chỉ định trong [đường dẫn tệp]. Hai đối số khác, [access mode] sẽ cung cấp chế độ truy cập và [buffer size] sẽ hỏi xem có bao nhiêu khối dữ liệu được lấy ra từ tệp. Lưu ý rằng, với đường dẫn file là bắt buộc còn với 2 tham số acces mode và buffer size là phần tùy chọn.
 [đường dẫn tệp] có thể là đường dẫn đầy đủ của tệp hoặc nếu nó tồn tại trong cùng một tệp như một chương trình thì chỉ cung cấp tên là đủ
 
 ![](https://images.viblo.asia/946fb408-4abb-4aca-9ec6-7a5ca95c09a1.png)

Trong trường hợp trên chỉ cần:

`>>> myFile = open("file.txt")`

Tuy nhiên, trong các tình huống như
![](https://images.viblo.asia/78d8399e-e440-4f0b-ba80-9a2d671a30f9.png)
 file.txt của bạn không nằm trong cùng thư mục như trong trường hợp trên, do đó ở đây bạn sẽ phải chỉ định toàn bộ vị trí như sau:
 
` >>> myFile = open("C:/c_code/file.txt")`

Như đã nói ở trên, làm việc với file chúng ta cần access mode , vậy acces mode gồm nhứng gì ?
1. chế độ đọc - "r" cho các tệp văn bản và "rb"các tệp nhị phân. Con trỏ tệp trỏ vào đầu tệp

    ` myFile = open("file.txt", "r")`

2. chế độ ghi - "w" cho các tệp văn bản và "wb"các tệp nhị phân. Con trỏ tệp trỏ vào đầu tệp.
`NaNundefinedmyFile = open("file.txt", "w")`
1. chế độ nối thêm - "a" cho các tệp văn bản và "ab"các tệp nhị phân. Điểm trỏ tệp ở cuối tệp
 
    ` myFile = open("file.txt", "a")`
  
4. chế độ đọc / ghi - "r+" hoặc "w+"cung cấp tùy chọn để thực hiện cả thao tác đọc và ghi trên cùng một đối tượng tệp. "rb+"hoặc "wb+"cho các tệp nhị phân. Con trỏ tệp trỏ vào đầu tệp.

    ` myFile = open("file.txt", "r+")`
  5.  nối / đọc - "a+" để bật chế độ đọc / nối thêm, "ab+"để thêm / đọc chế độ trên các tệp nhị phân. Điểm trỏ tệp ở cuối tệp.

       `myFile = open("file.txt", "a+")`
##        Đóng File
Trong python, đóng file cực kỳ đơn giản, ta chỉ cần gọi 

`>>> myFile.close()`

là có thể thực hiện thao tác đóng file
## Đọc File
Python cung cấp cho chúng ta một phương thức đọc file khá quen thuộc
`myFile.readline()` ,sẽ tiến hành đọc từng dòng bắt đầu vị trí của con trỏ.
Để in toàn bộ nội dung của tệp, lặp lại từng dòng, chúng ta có thể sử dụng for:

```
for line in myFile:
    # will print all the lines one by one
    print line
```
##  Ghi File
`write()` chức năng được sử dụng để viết một chuỗi duy nhất vào tệp. Ví dụ, có một chuỗi
```
>>> content = "Hello, World. I am learning Python."
>>> myFile.write(content)
```
chúng ta có thể ghi nhiều nội dung trong với writelines
```
>>> content = ["Python 2.x\n", "Hello, World. I am learning Python"]
>>> myFile.writelines(content)
```
## Sao chép File
Vậy khi chúng ta có 1 file, và muốn sao chép nó thì làm thế nào ? Rất may python đã trợ giúp ta điều đó, khá đơn giản bạn chỉ cần đọc toàn bộ 1 file, rồi ghi vào file khác:
```
>>> file1 = open("original.txt", "r")
>>> file2 = open("duplicate.txt", "w")
>>> l = file1.readline()
>>> while l:
 		file2.write(l)
		l = file1.readline()
>>> file1.close()
>>> file2.close()
```

Bên trên là một số khái niệm cơ bản về file mà mình đã tìm hiểu được thông qua quá trình tự học python. Các bạn hay học python, mình đảm bảo sẽ rất thú vị đó :) 
Bài viết của mình được tham khảo từ trang : https://www.studytonight.com/python