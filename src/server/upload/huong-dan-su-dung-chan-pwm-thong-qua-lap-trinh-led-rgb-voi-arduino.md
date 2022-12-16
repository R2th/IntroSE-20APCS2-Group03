Ở bài viết trước, mình đã giới thiệu về xử lý bất đồng bộ trong Arduino, ở bài biết này mình sẽ hướng dẫn các bạn cách lập trình với chân PWM của Arduino với led RGB. Đầu tiên chúng ta hãy bắt đầu tìm hiểu về led RGB nhé.

# Led RGB là gì ?

Khác với LED bình thường mà ta đã xét qua các bài trước, led RGB có 4 chân, trong đó có 1 chân chung và 3 chân riêng cho từng màu (R - red - đỏ, G - Green - Xanh lá, B - Blue - Xanh dương). Để thay màu sắc của LED RGB, ta chỉ việc thay đổi độ sáng của từng chân trong con led RGB. Để thay đổi độ sáng của một con LED ta chỉ việc điều chỉnh điện áp xuất ra từng chân của LED, mà để điều chỉnh điện áp xuất ra thì ta sẽ dùng xung PWM, hay đơn giản hơn là dùng chân PWM.

Với LED RGB, ta chia nó làm 2 loại, led chân dương chung và led chân âm chung, led chân âm chung là trong 4 chân có một chân chung là chân âm ( - ) nên nối với GND, còn 3 chân còn lại là chân dương riêng, với led chân dương chung thì ngược lại. Ở bài viết này ta dùng led chân âm chung. ( Để phân biệt khi nhìn thực tế hai con thì chỉ có cắm thử mà test thôi =)) )

![](https://images.viblo.asia/6165b62b-1828-436e-91f5-5d93d2592809.jpeg)

# Chân PWM là gì ?

Các chân PWM: là các chân có dấu '~' đằng trước, các chân này cho phép bạn xuất ra xung PWM với độ phân giải 8bit (giá trị từ 0 đến 255) tương ứng với mức giao động điện áp của chân từ 0V đến 5V, khác với các chân không phải PWM mà mình hay sử dụng ở các bài viết trước, chỉ có thể chọn giá trị 0V hoặc 5V.

Bạn có thể xem lại bài viết 	[này](https://viblo.asia/p/gioi-thieu-ve-arduino-LzD5deOOKjY) để rõ hơn về các chân Arduino.




# Điều khiển LED RGB
## Phần cứng cần thiết

* 1 mạch Arduino Uno R3 bao gồm dây nối USB với máy tính ( Không thật sự bắt buộc phải là con Arduino này, bạn có thể thay thế bằng bất kỳ dòng Arduino khác cũng được, nhưng phải xem lại sơ đồ chân của nó )
* 01 đèn LED RGB chung cực âm
* 03 điện trở 220 Ohm 
* Dây đấu nối


## Sơ đồ lắp đặt

![](https://images.viblo.asia/611125fe-0251-470a-8a07-cc679b086c62.png)

Trên sơ đồ lặp đặt trên mình đấu chân chung âm của đèn LED với chân GND của mạch, các chân dương riêng LED nối với chân pin PWM 9, 10 và 11 thông qua một điện trở. 

Vẫn lưu ý đấu nối với Arduino, bạn có thể dùng bất kỳ chân nào khác miễn là có dấu '~'.

Sau khi đấu nối xong, bạn sử dụng dây USB để kết nối Arduino với máy tính để ta tiến hành nạp code, ( hoặc nếu thích thì nạp code cho Arduino rồi đấu nối sau, không sao cả )

## Lập trình và nạp code

Ta có đoạn code sau:

```c
int red_light_pin= 11;
int green_light_pin = 10;
int blue_light_pin = 9;
void setup() {
  pinMode(red_light_pin, OUTPUT);
  pinMode(green_light_pin, OUTPUT);
  pinMode(blue_light_pin, OUTPUT);
}
void loop() {
  RGB_color(255, 0, 0); // Red
  delay(1000);
  RGB_color(0, 255, 0); // Green
  delay(1000);
  RGB_color(0, 0, 255); // Blue
  delay(1000);
  RGB_color(255, 255, 125); // Raspberry
  delay(1000);
  RGB_color(0, 255, 255); // Cyan
  delay(1000);
  RGB_color(255, 0, 255); // Magenta
  delay(1000);
  RGB_color(255, 255, 0); // Yellow
  delay(1000);
  RGB_color(255, 255, 255); // White
  delay(1000);
}

void RGB_color(int red_light_value, int green_light_value, int blue_light_value)
 {
  analogWrite(red_light_pin, red_light_value);
  analogWrite(green_light_pin, green_light_value);
  analogWrite(blue_light_pin, blue_light_value);
}
```

TRong chương trình, mình có viết sẵn một hàm RGB_color() để set gía trị tạo màu RGB cho LED, trong hàm có sử dụng analogWrite(<chân pin>,<giá trị>). Đây là hàm set giá trị cho chân PWM, nó khác với hàm digitalWrite() thường dùng, chỉ set giá trị cho các chân pin bình thường chỉ nhận giá trị HIGH và LOW.

Từ các giá trị từ 0 đến 255 được set cho các màu R G B, nó sẽ tạo ra vô vàn các màu khác nhau tùy bạn chọn, ở đây mình đã set các màu cơ bản làm ví dụ, và tự động thay đổi sau 1 giây.


Bây giờ ta sẽ cần phải biên dịch mã trước khi nạp code cho mạch. Để biên dịch mã, hãy nhấp vào nút “Verify” được hiển thị bên dưới:

![verify](https://images.viblo.asia/6121d295-5e8a-4428-99f3-42d22c59186b.png)



Khi IDE đã hoàn tất việc biên dịch, bạn sẽ thấy một kết quả ở cửa sổ đầu ra ở cuối IDE. Cửa sổ đầu ra rất hữu ích để xem các thông tin trả về thành công, lỗi, cảnh báo và việc sử dụng bộ nhớ:

![log](https://images.viblo.asia/767a82ab-219b-424b-bce1-9258b4f305cc.png)


Bước cuối cùng là nạp code, để thực hiện việc này, hãy nhấp vào nút "Upload", là mũi tên ở bên phải của nút “Verify”.

Sau khi nạp code hoàn tất, bạn hãy tự trải nghiệm thành quả đèn LED RGB đủ sắc màu nhé.

Vậy là mình đã hướng dẫn xong lập trình sử dụng chân PWM thông qua lập trình LED RGB với Arduino, từ ví dụ cơ bản này các bạn có thể tiếp tục phát triển các ý tưởng sử dụng LED RGB như tạo thành dải LED RGB, hay LED RGB nhấp nháy theo nhạc chẳng hạn.  

Hẹn gặp lại.