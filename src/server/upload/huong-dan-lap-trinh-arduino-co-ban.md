Ở bài viết trước, mình đã giới thiệu qua về Arduino, ở bài biết này mình sẽ hướng dẫn các bạn cách lập trình Arduino cơ bản thông qua ví dụ cơ bản: Làm đèn LED tự động bật tắt sau một khoảng thời gian. Đầu tiên chúng ta hãy bắt đầu tìm hiểu về cấu trúc của một chương trình Arduino.

# Cấu trúc chương trình Arduino


![ide](https://images.viblo.asia/400x400/c5a3eb43-9995-4a21-823b-0ab91abc4d65.png)

Cấu trúc ban đầu của chương trình trong Arduino IDE khá đơn giản, chỉ bao gồm hai hàm setup() và loop(). Khi chương trình bắt đầu chạy, những lệnh trong setup() sẽ được xử lý đầu tiên, ta thường dùng hàm này để khởi tạo trạng thái và giá trị của các biến hay các thông số trong chương trình.

Sau khi setup() chạy xong, những lệnh trong loop() được chạy. Đây là một vòng lặp vô tận, do đó các dòng code trong hàm này sẽ được lặp đi lặp lại liên tục cho tới khi nào bạn ngắt nguồn của board Arduino mới thôi hoặc can thiếp bằng nút Reset trên bảng mạch, chương trình của bạn sẽ trở về lại trạng thái như khi Arduino mới được cấp nguồn, tức là bắt đầu chạy lại từ hàm setup().

Quá trình này bạn có thể xem như hình dưới đây:


![flowar](https://images.viblo.asia/62659131-3de6-4ffb-8433-205f13ffc17f.png)


Tiếp đến ta sẽ thử lập trình Arduino thông qua ví dụ cơ bản: Làm đèn LED tự động bật tắt sau một khoảng thời gian, để làm được ví dụ này, ta cần chuẩn bị một số phần cứng cần thiết.

# Tạo LED tự động bật tắt sau một khoảng thời gian
## Phần cứng cần thiết

* 1 mạch Arduino Uno R3 bao gồm dây nối USB với máy tính ( Không thật sự bắt buộc phải là con Arduino này, bạn có thể thay thế bằng bất kỳ dòng Arduino khác cũng được, nhưng phải xem lại sơ đồ chân của nó )
* 01 đèn LED màu bất kỳ ( trên thị trường có bản 3mm hoặc 5mm, bản nào cũng được, 5mm thì sáng hơn )
* 01 điện trở 220 Ohm 
* Dây đấu nối


## Sơ đồ lắp đặt

![ledtudong](https://images.viblo.asia/600x300/5236e469-928a-467e-bb91-8b94d6cebb59.png)

Trên sơ đồ lặp đặt trên mình đấu chân âm cửa đèn LED với chân GND của mạch ( hay còn gọi nối đất ), chân dương LED nối với chân pin 8 thông qua một điện trở. Chú ý thêm cách phân biệt chân dương và âm của LED, như hình bạn sẽ thấy chân dương bị cong còn chân âm sẽ thẳng, nhưng khi bạn mua mới về thì sẽ thấy hai chân đều thẳng, khi đó chân nào dài hơn sẽ là chân dương. Với điện trở, ta không cần quan tâm đầu âm và đầu dương.

Với đấu nối với Arduino, ở đây mình sử dụng chân pin 8, bạn có thể dùng bất kỳ chân nào khác từ 0 đến 13 đều được không có gì khác biệt cả, chỉ khác khi ta lập trình.

Sau khi đấu nối xong, bạn sử dụng dây USB để kết nối Arduino với máy tính để ta tiến hành nạp code, ( hoặc nếu thích thì nạp code cho Arduino rồi đấu nối sau, không sao cả )

## Lập trình và nạp code

Trước khi nạp code ta cần kiểm tra xem IDE đã kết nối tới mạch hay chưa, để làm điều này ta vào Tools > Port và xem cổng COM có đúng Arduino hay không.

![config1](https://images.viblo.asia/8d2c74a2-c4e7-43ae-860f-4d0b71fbd11e.png)


Sau khi kiểm tra đúng cổng, ta cần báo với IDE loại board Arduino nào ta đang dùng, để làm điều này ta vào Tools > Board và chọn “Arduino / Genuino Uno”.
![config2](https://images.viblo.asia/6dc930fb-0f36-4a4c-ab83-ff07f3baaec2.png)


Tiếp đến ta nhập đoạn code sau:

```c
int led = 8; //chân digital kết nối với LED thông qua trở
 
void setup() {                
   pinMode(led, OUTPUT);   
}
 
void loop() {
  ​digitalWrite(led, HIGH);   
  ​delay(1000); 
  ​digitalWrite(led, LOW); 
  ​delay(1000);
}
```

Giải thích:

* Trong hàm setup ta khởi tạo trạng thái cho chân pin qua hàm pinMode(), có 2 chế độ cơ bản OUTPUT và INPUT, với OUTPUT là để xuất tín hiệu điều khiển ( như điều khiển LED bật tắt trong bài này ) , còn INPUT là đọc giá trị bên ngoài vào ( mình sẽ giới thiệu trong bài khác sau ).

* Trong hàm loop ta có hàm digitalWrite, đây là hàm để đặt trạng thái điều khiển cho các chân digital, có 2 trạng thái là HIGH ( hay nhập giá trị 1 cũng được ) và LOW ( giá trị 0 ), ở đây HIGH là bật LED, LOW là tắt LED, còn hàm delay làm chương trình ngừng chạy trong khoảng thời gian là ms, giúp ta giữ trạng thái LED hiện tại trước khi sang trạng thái mới.


Bây giờ ta sẽ cần phải biên dịch mã trước khi nạp code cho mạch. Arduino là một mạch nhỏ chỉ có thể đọc mã máy, nhưng mã được viết trong IDE lại là ngôn ngữ C. Do đó, để Arduino hiểu được các lệnh C, chúng ta phải chuyển chúng thành mã máy, quá trình này được gọi là biên dịch. Để biên dịch mã, hãy nhấp vào nút “Verify” được hiển thị bên dưới:

![verify](https://images.viblo.asia/6121d295-5e8a-4428-99f3-42d22c59186b.png)




Khi IDE đã hoàn tất việc biên dịch, bạn sẽ thấy một kết quả ở cửa sổ đầu ra ở cuối IDE. Cửa sổ đầu ra rất hữu ích để xem các thông tin trả về thành công, lỗi, cảnh báo và việc sử dụng bộ nhớ:

![log](https://images.viblo.asia/767a82ab-219b-424b-bce1-9258b4f305cc.png)


Bước cuối cùng là nạp code, để thực hiện việc này, hãy nhấp vào nút "Upload", là mũi tên ở bên phải của nút “Verify”.

Đèn LED trên bo mạch của Arduino bây giờ sẽ nhấp nháy khi bạn nạp code, sau khi nạp code xong hãy tận hưởng thành quả !

Vậy là mình  đã hướng dẫn xong lập trình cơ bản với ví dụ Led tự động, ở các bài sau mình sẽ giới thiệu tiếp các dự án khác về Arduino để dựa vào đó bạn có thể lập trình Arduino một cách thành thạo hơn.

Hẹn gặp lại.