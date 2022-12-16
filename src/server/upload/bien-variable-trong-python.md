Bài viết liên quan:

[Hướng dẫn cài đặt Python trên hệ điều hành Windows MacOS và Linux](https://viblo.asia/s/huong-dan-cai-dat-python-tren-he-dieu-hanh-windows-macos-linux-2020-b85og8R452G)

### Điều gì sẽ xảy ra khi bạn chạy file hello_world.py

Chúng ta sẽ xem xét kỹ hơn về cách hoạt động của Python khi bạn chạy file **hello_world.py**.

Python thực hiện một khối lượng công việc khá lớn, ngay cả khi nó chạy chương trình đơn giản.

Tên file: hello_world.py

```
print("Hello Python world!")
```

Khi bạn chạy đoạn code này, bạn sẽ thấy kết quả như sau:

```
Hello Python world!
```

Khi bạn chạy file hello_world.py, phần đuôi .py cho biết file này là Python. 

Trình soạn thảo văn bản sẽ chạy file bằng trình thông dịch Python, và sẽ đọc xem từng chữ có ý nghĩa là gì.

Ví dụ: trình thông dịch nhìn thấy từ `print` được theo sau bởi `()`, chương trình sẽ in ra bất cứ thứ gì trong `()`.

Khi bạn viết chương trình, trình soạn thảo của bạn sẽ làm nổi bật những phần khác nhau trong chương trình của bạn.

Ví dụ: trình soạn thảo sẽ nhận ra rằng `print` là tên của một hàm và nó sẽ hiển thị một màu cho nó. Cụm từ **"Hello Python world!"** không phải là Python code nên sẽ hiển thị một màu khác. Chức năng này gọi là **syntax highlight**, khá hữu ích khi bạn viết chương trình.

![syntax highlight](https://1.bp.blogspot.com/-nQ13OgpcePM/XkAAJLANBSI/AAAAAAAAGEw/2fE-Os1lOrEPHeazQCugipAc0m8y1GJIACLcBGAsYHQ/s1600/Capture.PNG)

### Biến (Viriable)

Chúng ta sẽ bắt đầu sử dụng biến trong file hello_world.py.

Thêm một dòng vào đầu file, và chỉnh sửa lại dòng 2

```
message = "Hello Python world!"
print(message)
```

Chạy chương trình bạn sẽ thấy kết quả hiện ra giống như bạn nhìn thấy phần trước

```
Hello Python world!
```

Chúng ta thêm 1 biến tên là **message**. Mỗi biến sẽ được kết nối với 1 giá trị, đó là thông tin liên quan đến biến đó. Trong trường hợp này giá trị là **Hello Python world!**.

Thêm 1 biến sẽ làm cho khối lượng công việc của trình thông dịch Python tăng lên. 

Khi xử lý xong dòng đầu, biến **message** sẽ kết nối với đoạn văn bản **Hello Python world!**.

Khi đến dòng thứ 2, sẽ in ra giá trị kết nối với biến **message** ra màn hinh.

Chúng ta sẽ mở rộng chương trình này bằng cách in ra một kết quả thứ 2. 
Thêm 1 dòng trống vào hello_world.py, và sao đó thêm vào 2 dòng sau

```
message = "Hello Python Crash Course world!"
print(message)
```

![Hello code](https://lh3.googleusercontent.com/-QIq1gP5GtEY/XkADnVf2kHI/AAAAAAAAGFA/fYopSy6FtY4JwFQDJ_fAU0HFdJiy52-igCLcBGAsYHQ/h102/Capture.PNG)

Bây giờ, khi bạn chạy file hello_world.py, sẽ xuất ra kết quả như sau:

```
Hello Python world!
Hello Python Crash Course world!
```

Bạn có thể thay đổi giá trị của biến bất kỳ lúc nào, và Python sẽ luôn luôn lưu trữ giá trị hiện tại.

### Đặt tên và cách sử dụng biến

Khi bạn sử dụng biến trong Python, bạn cần tuân theo một vài qui tắc và hướng dẫn.

Phá vỡ qui tắc sẽ gây ra lỗi; phần hướng dẫn sẽ giúp bạn viết code dễ đọc và dễ hiểu hơn.

Bạn phải nằm lòng các qui tắc và hướng dẫn sau:

**Qui tắc:**

* Tên biến chỉ có thể chứa chữ cái, số và dấu gạch dưới `_`. Có thể bắt đầu bằng chữ cái hoặc dấu gạch dưới, nhưng không được bắt đầu bằng số. Ví dụ: bạn có thể đặt tên biến là `message_1` nhưng không được đặt là `1_message`.
* Khoảng trống (space) không được cho phép khi đặt tên biến, nhưng bạn có thể sử dụng dấu gạch dưới để tách các từ. Ví dụ: biến `greeting_message` sẽ chạy, nhưng biến `greeting message` sẽ bị lỗi.
*  Khi đặt tên biến không được sử dụng từ khóa Python và tên của hàm. Nghĩa là không được sử dụng những từ mà Python dành riêng cho lập trình, như là từ `print`.

**Hướng dẫn:**

*  Tên biến nên ngắn ngọn, nhưng mang đầy đủ ý nghĩa. Ví dụ: `name` thì sẽ tốt hơn `n`, `student_name` sẽ tốt hơn` s_n`, và `name_length` sẽ tốt hơn `length_of_persons_name`.
*  Cẩn thận khi sử dụng chữ thường `l` hoặc chữ hoa `O` bởi vì sẽ gây dễ nhầm lẫn với số `1` và `0`.

Bạn phải suy nghĩ thật kỹ để tạo ra tên biến tốt, sẽ giúp cho code bạn dễ đọc, dễ hiểu và dễ bảo trì, đặc biệt là khi chương trình của bạn ngày càng phức tạp. Hoặc bạn có thể học bằng cách đọc code của người khác, kiểm tra xem mình đã học được gì và tên biến có dễ hiểu hay không, có nên thay đổi thành tên khác?

**Lưu ý:** Các biến Python mà bạn sử dụng phải là chữ thường. Bạn sẽ không bị lỗi nếu như sử dụng chữ Hoa, nhưng chữ Hoa trong tên biến sẽ có ý nghĩa đặc biệt (sẽ thảo luận trong phần sau).

### Những lỗi thường gặp khi sử dụng biến

Mọi lập trình viên điều mắc lỗi, và hầu hết điều mắc lỗi mỗi ngày.

Mặc dù người lập trình viên giỏi có thể tạo ra lỗi, nhưng họ biết cách giải quyết lỗi một cách hiệu quả nhất.

Hãy xem xét một lỗi mà bạn hay gặp, và học các fix chúng.

Chúng ta sẽ viết đoạn code với mục đích tạo ra lỗi. Nhập đoạn code dưới đây, bao gồm lỗi chính tả **mesage**

```
message = "Hello Python Crash Course reader!"
print(mesage)
```

Khi lỗi xuất hiện trong Python, trình thông dịch Python sẽ giúp bạn tìm ra lỗi ở đâu.

Trình thông dịch cung cấp 1 traceback (lưu vết) khi chương trình chạy không thành công. Một traceback là một bản ghi khi trình thông dịch chạy bị lỗi.

Dưới đây là ví dụ traceback mà Python cung cấp sau khi bạn nhập sai tên biến:

![traceback](https://images.viblo.asia/913a271b-f373-409c-8c49-6c1484d390ac.PNG)


Traceback cho biết rằng: lỗi tại dòng 2 tại `print(mesage)` và tên biến `mesage` chưa được định nghĩa. Python không nhận diện được tên biến. Lỗi NameError thường là do bạn quên thiết lập giá trị cho biến trước khi sử dụng hoặc là bạn nhập tên biến sai chính tả. Trong trường hợp này thì tên biến bị sai chính tả.

Trong ví dụ này chúng ta đã bỏ 1 chữ cái s trong biến `message` tại dòng 2. Python không kiếm tra chính tả của chữ cái, nhưng nó đảm bảo rằng tên biến phải được sử dụng chính xác.

Ví dụ, bạn sửa từ `message` ở dòng 1 thành 1 chữ sai chính tả `mesage`.

```
mesage = "Hello Python Crash Course reader!"
print(mesage)
```

Trong trường hợp này chương trình vẫn chạy thành công

```
Hello Python Crash Course reader!
```

Các ngôn ngữ lập trình kiểm tra nghiêm ngặt, nhưng không kiểm tra chính tả. Vì thế, bạn không cần phải đúng chính tả hay ngữ pháp khi bạn tạo một tên biến và viết code.

Nhiều lỗi rất đơn giản, như là thiếu 1 chữ cái. Nếu bạn dành thời gian dài để hiểu về những lỗi này, nó sẽ rất có ích cho bạn. Nhiều lập trình viên có kinh nghiệm nhưng phải mất hàng giờ để tìm ra những lỗi đơn giản như vậy.

### Biến là nhãn (label)

Biến được mô tả như là cái hộp lưu trữ giá trị của bạn. Ý tưởng này có thể giúp ích cho bạn khi lần đầu sử dụng biến, nhưng nó không phải là một cách đúng mô tả về cách hoạt động của biến trong Python.

Nó sẽ tốt hơn nếu bạn xem biến như là một nhãn để gán giá trị vào. Bạn có thể xem là: biến tham chiều tới một giá trị nào đó.

Vấn đề này có vẻ không khác biệt khi bạn tạo chương trình đầu tiên, nhưng nó sẽ giúp ích cho bạn sau này.

Trong tương lai, bạn sẽ thấy cách hoạt động của biến không như bạn mong đợi, và sự hiểu đúng về cách hoạt động của biến sẽ giúp bạn nhận ra những gì đang xảy ra với code.

**Lưu ý:** Cách tốt nhất để hiểu khái niệm lập trình mới là thử sử dụng chúng trong trình thông dịch. Nếu bạn gặp khó khăn trong việc thực hiện bài tập, bạn hay nghỉ ngơi, và làm một việc gì đó trong một khoảng thời gian. Nếu vẫn không giải quyết được bạn hãy xem kỹ lại phần lý thuyết ở trên.

**Bài tập:** Thực hiện 2 bài tập dưới đây bằng 2 chương trình khác nhau, và cách đặt tên phải tuân theo qui ước của Python, sử dụng chữ thường vào dấu gạch dưới, ví dụ: **simple_program**

**Câu 1:** Gán một giá trị vào 1 biến, và xuất ra giá trị đó.
**Câu 2.**  Gán một giá trị vào 1 biến, và xuất ra giá trị đó. Sau đó thay đổi giá trị của biến và xuất ra giá trị thay đổi.

### Tổng kết
Trong phần này bạn đã học về cách khai báo biến, cách đặt tên biến một cách ý nghĩa và giải quyết vấn đề khi gặp lỗi.

Nếu có vấn đề khi cài đặt, bạn hãy comment bên dưới, mình sẽ hỗ trợ trong thời gian sớm nhất!

Cảm ơn các bạn đã quan tâm bài viết này.

### Tham khảo
PYTHON CRASH COURSE - A Hands On Project Based Introduction To Programming (Eric Matthes).