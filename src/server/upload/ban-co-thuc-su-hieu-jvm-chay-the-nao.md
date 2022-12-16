Xin chào a/e đã đang và sẽ thành dev Java như em, chắc 99% mọi người đều biết jvm là máy ảo, java là ngôn ngữ biên dịch,… nhưng ae có thực sự hiểu cơ chế hoạt động của java và jvm? <br>
Tại sao java lại ngốn ram hơn C/C++ (ví nó JVM)<br>
Tại sao java lại chạy chậm chậm hơn C,C++ (ví nó JVM)<br>
Thế vì sao chạy máy ảo (JVM) lại bị như vậy thì ít người có thể lý giải cụ thể cho mọi người biết.<br>
Rồi “úi dồi java ra 17 rồi, nhưng tao vẫn code java 5-8 có thấy khác gì đâu ngoài vài cái syntax…”<br>
Oki vậy cũng đi giải đáp các cấu hỏi trên nhé.<br>

![java-programming-programming-language-computer-wallpaper-preview.jpg](https://images.viblo.asia/2a7bdc97-2d2e-4d45-9dc7-fadd9b62a5e7.jpg)


`Bài viết này nằm trong chuỗi bài tìm hiểu spring boot native – GraalVM` 

**Java hoạt động như nào?** 


Bạn có một đoạn mã Java, trước tiền trình biên dịch sẽ đưa về bytecode với javac.
và rồi bạn đưa đống bytecode này lên bất kỳ hệ điều hành nào cài được JVM là nó sẽ chạy ngon lành cho bạn. khá đơn giản và dễ hiểu đúng? Vậy JVM sẽ làm gì với đống bytecode này?
 
 ![](https://images.viblo.asia/dfb55fbf-986a-4b1b-9122-ac9c6b65af9f.png)
 
Khi ứng dụng của bạn chạy, JVM sẽ đi đến từng bytecode của bạn thông dịch và chuyển đổi nó thành mã máy sau ddos gửi nó CPU. code của bạn được thực thi

![](https://images.viblo.asia/cd4dd97b-2526-4ecd-8a92-826f7f71935c.JPG)

Đây là luồng cơ bản JVM hoạt động, Nhưng thanh niên thông dịch khá là "ngáo" khi biên dịch lãi cả những đoạn mã đã từng biên dịch , việc làm vậy sẽ dẫn đến lãng tài nguyên và hiệu năng
=> JVM cho chúng ta 2 thằng xịn xò hơn "biến dịch viên" C1 và C2

**C1 compiler**

C1 hoạt động dựa trên cơ chế đếm số đoạn code được thực hiện. Khi con số này đạt qua 1 ngưỡng nhất định C1 sẽ lưu đoạn mã này vào Cache.
Vì vậy lần gọi tiếp theo sẽ không tôn tài nghiên đến thông dịch lần nữa. Lệnh sẽ được đưa trực tiếp đến CPU.

Ví dụ: bạn có method01 và method02.
method01 liên tục được gọi và thực hiện C1 sẽ được em nó vào cache.
method02 bị ghẻ lạnh hơn tiếp tục ở lại với em thông dịch đầu :(

![](https://images.viblo.asia/2138d9cd-50ac-4c50-a80d-39dc4a2c1d2d.JPG)

**C2 compiler**


Sau khi đoạn mã được đưa vào Cache ở C1. Các kỹ sư của Oracle tiếp tục tạo ra trình biên dịch C2 với mong muốn tối ưu hóa nhưng đoạn mã phức tạp nhằm cài thiện hiệu năng của Java.
“nhưng có vẻ dạo từ java 11 trở đi, C2 không còn được update quá nhiều để giúp tối ưu và chuyển sang mã máy nhanh hơn nữa thì phải ☹”.

Bạn tưởng vậy đã ngon? không đâu ạ việc C1 C2 chạy cùng lúc với ứng dụng, liên tục phải đếm đếm, tối ưu và đưa vào cache cũng làm hệ thống chậm đi :(
 
**AOT(aHead Of Time) và JIT(Just in time)**


Không biết dịch 2 thằng này như nào nữa ☹ Đại ý AOT : làm trước, JIT : làm trong lúc ứng dụng chạy :D

Oki. như ở trên đã nói C1 và C2 thực thi trong quá trình ứng dụng của bạn đang chạy. JVM sẽ cung cấp tài nguyên (Thread) dựa theo số đoạn mã cần được biên dịch qua C1C2 và Ram cho việc lưu trữ Cache dán tiếp gốn tài nguyên và làm chậm hệ thống lại. 
Việc này được gọi là JIT vì nó làm trong quá trình ứng dụng chạy.

Và tất nhiên chúng ta tòi thêm 1 thằng là AOT để khắc phục JIT.
Java 9+ đã cho phép chung ta tùy chỉnh mã AOT giúp bạn biên dịch trước khi chạy ứng dụng
(cái này mình sẽ bài cụ thể sau- nếu bài này nhiều sự quan tầm và … mình k bị sếp dị dealine =)))

**Tổng kết**


Việc liên tục phải thông dịch cả các mã đã từng thông dịch thành thành mã máy sẽ làm tốn tài nguyên và làm chậm của hệ thống.
Với sự xuất hiện của C1 và C2 giúp cài thiện và giảm bớt số lần thông dịch.
Nhưng việc counter số method chạy nhiều lần tiếp theo C2 Compile lần 2 nhắm tối ưu cần cấp Thread sau đó lưu vào Cache (Ram) cũng làm cho hệ thống tốn nhiều tài nguyên hơn.
Oracle đang tiền tục cho ra các version JDK nhắm tối ưu hơn. Với việc thêm AOT ở Java9 đã giảm đáng kể thời gian compiler trong ứng 
Vậy lên cứ update java version mạnh lên nhé ae, đừng code ở java 5,8 nữa :D