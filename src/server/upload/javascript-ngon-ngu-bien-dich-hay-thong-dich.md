# Tổng quát
Có 2 cụm từ mà chúng ta hay nhắc đến khi nói về một ngôn ngữ lập trình là biên dịch (compiled) và thông dịch (interpreted). 2 cụm từ này biểu đạt cho cách thức mà máy tính có thể hiểu được những gì chúng ta viết và thực thi nó. 
## Ngôn ngữ thông dịch 
Ngôn ngữ được coi là thông dịch khi chương trình được viết ra khi chạy sẽ được trực tiếp thành mã máy (ngôn ngữ mà máy tính có thể hiểu được) để máy tính thực thi chúng. Khi chương trình chạy đến dòng lệnh nào sẽ chuyển thành mã máy đến đó để máy tính có thể thực thi.

Bộ thông dịch thực hiện quá trình thông dịch gọi là interpreter.

**Ưu điểm**

* Interpreter dễ hiện thực hơn do bỏ qua việc kiểm tra lỗi và tối ưu code thường được thực hiện trong quá trình compiled.
* Hỗ trợ đa nền tảng.
* Kích thước chương trình thực thi nhỏ hơn.

**Nhược điểm**
* Chương trình có độ tin cậy thấp hơn do bỏ qua bước kiểm tra loại bỏ một số lỗi thường thực hiện trong quá trình compiled.
* Source code dễ dàng bị dịch ngược.
* Tốc độ thực thi chậm hơn.
* Tiềm tàng nguy cơ có lỗi do thiếu


## Ngôn ngữ biên dịch
Cách hoạt động của trình biên dịch khác so với thông dịch. Thay vì chạy trực tiếp thành mã máy, trình biên dịch sẽ phải chuyển đổi ngôn ngữ lập trình thành mã máy rồi chứa kết quả vào ổ đĩa cứng để có thể thực thi ở lần chạy sau.

Bộ biên dịch thực hiện quá trình biên dịch được gọi là compiler.

**Ưu điểm**
* Chương trình sau đó được thực thi nhanh hơn.
* Độ tin cậy cao
* Khó bị dịch ngược mã nguồn.

**Nhược điểm**
* Khó xây dựng một compiler có tính chính xác cao để chuyển toàn bộ chương trình thành mã máy.
* Mã máy của mỗi nền tảng là khác nhau, khó thực hiện đa nền tảng.

# Vậy JavaScript là ngôn ngữ nào?
Bạn đã mường tượng được JavaScript là ngôn ngữ thông hay biên dịch chưa? Đây là một câu hỏi mà hiện nay vẫn còn rất nhiều tranh cãi, đơn giản vì nhìn từ góc độ nào cũng đúng.
## JavaScript là ngôn ngữ thông dịch
JavaScript được tạo ra bởi Brendan Eich năm 1995, trong thời gian ông ở Netscape Communications. Cái tên JavaScript hình thành cũng là do ngôn ngữ này lấy cảm hứng từ một ngôn ngữ tên là Java, cùng với đó là 2 ngôn ngữ khác là Scheme và Self. 

Với ý tưởng là xây dựng một ngôn ngữ chạy trên trình duyệt tốt nhất thời đó, Netscape Navigator, JavaScript có thể chạy, thực hiện các cậu lệnh từng dòng một trên trình duyệt mà không cần phải compiled.

JavaScript có thể làm việc trực tiếp với cái câu lệnh HTML, ngay trên web page. Do vậy, một đoạn script chúng ta viết có thể tái sử dụng ở nhiều nơi khác nhau.

## JavaScript là ngôn ngữ biên dịch

**Thế tại sao JavaScript đã là ngôn ngữ thông dịch rồi lại còn là ngôn ngữ biên dịch?**

Sau một gian phát triển, người ta nhận thấy ứng dụng của JavaScript quá lớn, nhưng lại chưa có một hiệu suất tốt lắm. Có thể dạo gần đây các bạn nghe nhiều về V8 Engine hay Chakra, nhưng lại không rõ tại sao mọi người tung hô như vậy. 

**V8** là một engine JavaScript được xây dựng bởi Google. Đây là một engine [open source](https://github.com/v8/v8) được ứng dụng trong cả Browser (Google Chrome) và Sever Side (NodeJs).

Về cơ bản, V8 chuyển code JavaScript thành mã thay vì dùng interpreter. Engine compile những dòng code trong lúc thực thi bằng việc thực hiện thông qua một 
JIT (Just-In-Time) compiler. Mình có trích dẫn một đoạn trên Wikipedia về V8 Engine nói rõ về vấn đề này :

> V8 biên dịch JavaScript trực tiếp sang mã máy trước khi thự thi nó, thay vì các kỹ thuật truyền thống khác như giải mã thông dịch bytecode hoặc biên dịch toàn bộ chương trình sang mã máy và thực thi nó từ một hệ thống tập tin. Mã đã biên dịch được tối ưu hóa bổ sung (và được tối ưu hóa lại) một cách linh động trong thời gian thực thi, dựa trên các chẩn đoán của hồ sơ thực thi của mã. 

![](https://images.viblo.asia/7f1477be-5087-4d7d-bf67-f1f5ece2ef39.PNG)

Nhờ V8 Engine,những dòng code JavaScript hiện nay của chúng ta chạy cực kì nhanh. Do tính linh hoạt cộng với việc có sự bổ trợ của V8 Engine, có thể nói rằng chung ta đang sống trong một kỉ nguyên của JavaScript, ngôn ngữ mà **gần như** có thể thực hiện mọi yêu cầu mà người dùng đòi hỏi.
# Tổng kết 
Và chúng ta có thể thấy, JavaScript khởi đầu là một ngôn ngữ thông dịch nhưng sau một chặng đường dài phát triển và cải tiến, JavaScript mà hiện giờ có thể được coi là một ngôn ngữ lai, vừa là thông dịch vừa là biên dịch.

Những khái niệm trên trong quá trình lập trình thường không được coi trọng lắm nhưng sẽ hay hơn nếu những người lập trình hiểu rõ hơn một phần nào đó những việc phía dưới máy tính thực hiện sau khi chúng ta viết một chương trình.

# Tham khảo

https://en.wikipedia.org/wiki/Chrome_V8

https://www.quora.com/Is-JavaScript-compiled-or-interpreted-Whats-the-official-stance-from-the-engine-compiler-maintainers