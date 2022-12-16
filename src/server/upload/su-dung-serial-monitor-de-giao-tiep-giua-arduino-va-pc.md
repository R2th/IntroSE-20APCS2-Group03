Tiếp tục trong Series này, mình sẽ giới thiệu về Serial Monitor trong Arduino, Serial Monitor là thành phần của Arduino IDE, giúp ích rất nhiều khi ta sử dụng Arduino. Đầu tiên chúng ta hãy bắt đầu tìm hiểu về Serial Monitor nhé.
# Serial Monitor là gì ?
Serial Monitor là một thành phần trong Arduino IDE, giúp bo mạch và máy tính có thể gửi và nhận dữ liệu với nhau qua giao tiếp USB. Cơ bản là vậy, ta có thể nói rõ hơn bằng cách chia nó làm 2 phần :
* **Arduino → PC**: PC nhận dữ liệu từ Arduino và hiển thị dữ liệu trên màn hình. Điều này thường được sử dụng để debug và giám sát kết quả
* **PC → Arduino**: Gửi dữ liệu hay lệnh từ PC đến Arduino.


# Khởi chạy Serial Monitor
Sau khi bạn đã kết nối Arduino với PC qua USB và cấu hình đúng cổng COM cho Port ( nếu bạn chưa rõ về cấu hình cổng COM cho Port, bạn có thể xem ở [đây](https://viblo.asia/p/huong-dan-lap-trinh-arduino-co-ban-4P856n4a5Y3#) ) , ta có thể nhấp vào biểu tượng Serial Monitor để khởi chạy nó :

![](https://images.viblo.asia/c6d76597-0e78-497f-b798-b677367e463e.jpg)


Ta có được màn hình Serial Monitor như sau:

![](https://images.viblo.asia/700x300/f7b2e6af-51ff-4040-b089-8fd0b96c9ed9.png)

# Các thành phần của Serial Monitor

* **Output console**: Hiển thị dữ liệu nhận được từ Arduino

![](https://images.viblo.asia/800x300/5b5065ec-3f2c-4115-8d94-93f3a2604dc2.png)

* **Autoscroll checkbox**: Tùy chọn để chọn giữa tự động cuộn hoặc không

![](https://images.viblo.asia/800x300/003f33ce-1048-47d3-aa65-096f8a958610.png)

* **Show timestamp checkbox**: Cho phép hiển thị thời gian khi dữ liệu được hiển thị trên Serial Monitor

![](https://images.viblo.asia/800x300/a69c3dfc-fb9a-42e9-9e2d-1b2304fbdcc8.png)

* **Clear output button**: Xóa sạch dữ liệu hiểu thị trên Output console

![](https://images.viblo.asia/800x300/8fda57a2-234b-43e7-8515-f762a0fd9af4.png)


* **Baud rate selection**:  Chọn tốc độ truyền ( baud rate ) giữa Arduino và PC. Giá trị này PHẢI giống với giá trị được khai báo trong code Arduino khi ta sử dụng hàm :
     ```c
     Serial.begin(<baud rate>)
     ```
     Ta sẽ nói rõ hơn về cái này ở phần dưới.
     
![](https://images.viblo.asia/800x300/cd20fd3c-ab3a-480e-ad7b-a4697aff31d8.png)

* **Textbox**: Nơi người dùng nhập dữ liệu gửi tới Arduino

![](https://images.viblo.asia/800x300/720d3425-53b0-4bf3-8a21-cac1aab4a02e.png)

* **Ending selection**: Chọn các ký tự kết thúc được thêm vào dữ liệu khi nó được gửi đến Arduino:
    1. *No line ending*: Không thêm gì
    1. *Newline*: Thêm kí tự xuống dòng (LF, hoặc '\n')
    1. *Carriage return*: Thêm kí tự di chuyển con trỏ về đầu dòng (CR, hoặc '\r')
    1. *Both NL and CR*: Kết hợp giữa *newline* và *carriage return* (CRLF, hoặc '\r\n') 
  
 ![](https://images.viblo.asia/800x300/2d544154-96b9-4a57-baa4-b6cebb899f75.png)

* **Send button**: Gửi dữ liệu từ Textbox và Ending selection đến Arduino

![](https://images.viblo.asia/800x300/b2c5e7cb-bf4a-4b47-bdf3-007ff46917d3.png)

# Cách sử dụng Serial Monitor
## Arduino → PC
Để gửi dữ liệu từ Arduino đến PC, chúng ta làm như sau:

Thêm vào trong hàm setup() của Arduino :
```c
Serial.begin(<baud rate>)
 ```

Hàm này có tác dụng khai báo baud rate sử dụng là bao nhiêu và bắt đầu Serial port.

Đến đây thì bạn có thể thắc mắc baud rate là gì, nó là số bit truyền được trong 1s, ở truyền nhận không đồng bộ ở đây thì ở các bên truyền và nhận phải thống nhất Baud rate, nghĩa là Arduino gửi với Baud rate 9600 thì PC cũng cần đọc ở Baud rate 9600. Các thông số tốc độ Baud rate thường hay sử dụng để giao tiếp với máy tính là 600, 1200, 2400, 4800, ...

Thực ra để hiểu rõ về Baud rate thì nó khá là phức tạp, nếu bạn chỉ muốn hiểu để sử dụng Arduino thì không cần biết rõ cái này, bạn chỉ cần quan tâm 2 điều sau:
* Bạn set baud rate cho Arduino bao nhiêu thì khi bật Serial Monitor trên PC cũng phải để giống hệt như thế thì nó mới giao tiếp được, nếu không lỗi hoặc không hiển thị gì.
* Thường thì để mức Baud rate là 9600 hầu hết các trường hợp, một số trường hợp đặc biệt sẽ yêu cầu mức Baud rate khác như 115200, cái đó ta sẽ nói ở các ví dụ thực tế khác sau.

Để gửi dữ liệu dạng String lên Serial Monitor ta có thể sử dụng hàm:
```c
Serial.print(<String>) // in ra chuỗi
 ```
 hoặc
 ```c
Serial.println(<String>) // in ra chuỗi và xuống dòng
 ```
Đây là 2 hàm được sử dụng phổ biến nhất, còn một số hàm khác bạn có thể tự tra cứu lấy khi cần :stuck_out_tongue:

Bây giờ ta sẽ đi vào ví dụ đơn giản: In chuỗi Hello World ra màn hình sau mỗi 1 giây.
```c
void setup()
{
  Serial.begin(9600);
}
void loop()
{
  Serial.print("Hello world");
  delay(1000);
}
```

Bạn nạp code cho Arduino xong, rồi bật Serial Monitor lên, chỉnh mức Baud rate là 9600,  ta sẽ được như sau :

![](https://images.viblo.asia/f34b60c4-91f1-4416-b24e-1216ce0fd4f3.png)


## PC → Arduino
Để gửi dữ liệu từ PC đến Arduino và làm cho Arduino đọc và xử lý nó, chúng ta làm như sau:

Thêm vào trong hàm setup() của Arduino :
```c
Serial.begin(<baud rate>)
 ```
 
 Và trong hàm loop() ta cần thêm:
 ```c
if(Serial.available())
{
	// xử lý lệnh ở đây
}
 ```
Hàm Serial.available() trả về true nếu có lệnh từ PC gửi đến Arduino thông qua Serial Monitor.

Để Arduino đọc được sữ liệu được gửi tới, ta có thể sử dụng các hàm: Serial.read(), Serial.readBytes(), Serial.readString(), ... Bạn có thể tự tìm hiểu lấy, trong bài viết này mình sẽ sử dụng hàm mình hay dùng :
```c
Serial.readStringUntil(<kí tự dừng>) // cho phếp đọc toàn bộ chuỗi được gửi đến cho đến khi gặp kí tự dừng.
 ```

Bây giờ ta sẽ đi vào ví dụ đơn giản: Bật tắt đèn LED khi gõ ON / OFF trên Serial Monitor :stuck_out_tongue:

Ta sẽ sử dụng lại mạch mà mình đã nói ở bài viết trước, bạn có thể xem nó tại [đây](https://viblo.asia/p/huong-dan-lap-trinh-arduino-co-ban-4P856n4a5Y3#)

![](https://images.viblo.asia/600x300/5236e469-928a-467e-bb91-8b94d6cebb59.png)

Ở đây ta code như sau:
```c
void setup()
{
  Serial.begin(9600);
  pinMode(8, OUTPUT);
  digitalWrite(8, LOW); // lúc đầu ta để LED tắt
}
void loop()
{
  if(Serial.available()) { // nếu có dữ liệu gửi đến
    text = Serial.readStringUntil('\n'); // đọc giá trị gửi đến cho đến khi gặp kí tự xuống dòng \n
    
    if(text == "ON") {
        digitalWrite(8,HIGH); // bật LED
        Serial.println("LED is turned ON");  // gửi lại thông báo lên Serial Monitor
    }
    
    if(text == "OFF") {
        digitalWrite(8,LOW); // tắt LED
        Serial.println("LED is turned OFF");
    }
   }
 }
```

Sau đó bạn nạp code cho Arduino xong, rồi bật Serial Monitor lên, chỉnh mức Baud rate là 9600 và để Ending selection là newline, cuối cùng bạn nhập ON hoặc OFF để tận hưởng thành quả :

![](https://images.viblo.asia/477651a6-389e-44e3-96b4-1b44cd2d6db9.png)

![](https://images.viblo.asia/8ad4a1d9-1713-492e-9421-788f1cdf247b.png)


Vậy là mình đã hướng dẫn xong Serial Monitor cơ bản, ở các bài sau mình sẽ giới thiệu tiếp các dự án khác về Arduino và sẽ ứng dụng Serial Monitor để dựa vào đó bạn có thể lập trình Arduino một cách thành thạo hơn.

Hẹn gặp lại.