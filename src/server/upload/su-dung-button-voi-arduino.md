Ở bài viết trước, mình đã giới thiệu về lập trình Arduino cơ bản, ở bài biết này mình sẽ hướng dẫn các bạn cách lập trình Arduino với button. Đầu tiên chúng ta hãy bắt đầu tìm hiểu về button.

# Cấu tạo Button - Phím nhấn


![ide](https://images.viblo.asia/200x200/df03ac43-7359-4a42-8a3b-67cd914bee58.jpg)

Giống với công tắc đóng / mở bạn thấy ở bất cứ đâu, nút nhấn cũng có cơ chế hoạt động giống như vậy. Thay vì chỉ có 2 chân như công tắc, nút nhấn có 4 chân chia làm 2 cặp. Những chân trong cùng một cặp được nối với nhau, những chân khác cặp thì ngược lại. Khi bạn nhấn nút, cả 4 chân của nút nhấn đều được nối với nhau, cho phép dòng điện từ một chân bất kì có thể tới 3 chân còn lại, khi ngừng nhấn, 2 cặp sẽ tách dời, dòng điện sẽ không còn liên thông nữa.


![flowar](https://images.viblo.asia/500x300/8c584bc4-59ab-4b4c-bc34-cdbeec92b2fa.png)


Tiếp đến ta sẽ thử sử dụng Button với Arduino thông qua ví dụ cơ bản: Làm đèn LED bật khi nhấn giữ button, tắt khi ta thả tay ra, để làm được ví dụ này, ta cần chuẩn bị một số phần cứng cần thiết.

# Bật tắt đèn LED với Button
## Phần cứng cần thiết

* 1 mạch Arduino Uno R3 bao gồm dây nối USB với máy tính ( Không thật sự bắt buộc phải là con Arduino này, bạn có thể thay thế bằng bất kỳ dòng Arduino khác cũng được, nhưng phải xem lại sơ đồ chân của nó )
* 01 đèn LED màu bất kỳ ( trên thị trường có bản 3mm hoặc 5mm, bản nào cũng được, 5mm thì sáng hơn )
* 02 điện trở 220 Ohm 
* 01 Button 4 chân
* Dây đấu nối


## Sơ đồ lắp đặt

![ledtudong](https://images.viblo.asia/500x500/89f2cf4e-9d27-42ed-80db-8d1e4becf389.jpg)

Trên sơ đồ lặp đặt trên mình đấu chân âm của đèn LED với chân GND của mạch, chân dương LED nối với chân pin 13 thông qua một điện trở. 

Với button ta có 4 chân đều như nhau, quan trọng là cặp của nó, ta chọn 1 chân bất kỳ nối với GND qua trở và nối với pin 2 trực tiếp, sau đó chọn 1 chân ở cặp còn lại nối với nguồn 5V

Vẫn lưu ý đấu nối với Arduino, bạn có thể dùng bất kỳ chân nào khác từ 0 đến 13 đều được không có gì khác biệt cả, chỉ khác khi ta lập trình.

Sau khi đấu nối xong, bạn sử dụng dây USB để kết nối Arduino với máy tính để ta tiến hành nạp code, ( hoặc nếu thích thì nạp code cho Arduino rồi đấu nối sau, không sao cả )

## Lập trình và nạp code

Ta có đoạn code sau:

```c
const int buttonPin = 2;     // pin nối button để điều khiển
const int ledPin =  13;      // pin nối LED

// Tạo một biến nhận diện trạng thái button:
int buttonState = 0;         

void setup() {
  // set ledPin là output
  pinMode(ledPin, OUTPUT);
  // set buttonPin là input để đọc giá trị từ button
  pinMode(buttonPin, INPUT);
}

void loop() {
  // đọc giá trị button rồi lưu vào buttonState
  buttonState = digitalRead(buttonPin);

  // nếu button được nhấn, buttonState nhận giá trị HIGH, và ngược lại
  if (buttonState == HIGH) {
    // Bật LED:
    digitalWrite(ledPin, HIGH);
  } else {
    // Tắt LED:
    digitalWrite(ledPin, LOW);
  }
}
}
```

Cấu trúc chương trình và các hàm sử dụng nếu bạn không hiểu rõ có thể tìm hiểu bài viết trước về lập trình Arduino cơ bản tại [đây](https://viblo.asia/p/huong-dan-lap-trinh-arduino-co-ban-4P856n4a5Y3).

Ở đây ta có hàm mới được sử dụng là digitalRead(<chân pin>), đây là hàm dùng để đọc giá trị digital của chân pin, ở đây khi button thay đổi trạng thái, giá trị digital sẽ gửi về chân pin được kết nối, để đọc được giá trị đó, ta sử dụng hàm digitalRead().

Bây giờ ta sẽ cần phải biên dịch mã trước khi nạp code cho mạch. Để biên dịch mã, hãy nhấp vào nút “Verify” được hiển thị bên dưới:

![verify](https://images.viblo.asia/6121d295-5e8a-4428-99f3-42d22c59186b.png)



Khi IDE đã hoàn tất việc biên dịch, bạn sẽ thấy một kết quả ở cửa sổ đầu ra ở cuối IDE. Cửa sổ đầu ra rất hữu ích để xem các thông tin trả về thành công, lỗi, cảnh báo và việc sử dụng bộ nhớ:

![log](https://images.viblo.asia/767a82ab-219b-424b-bce1-9258b4f305cc.png)


Bước cuối cùng là nạp code, để thực hiện việc này, hãy nhấp vào nút "Upload", là mũi tên ở bên phải của nút “Verify”.

Sau khi nạp code hoàn tất, đèn LED sẽ tắt, và nó sẽ bật lên khi bạn nhấn giữ button, bạn hãy tự trải nghiệm thành quả nhé.

Vậy là mình đã hướng dẫn xong lập trình cơ bản với Button, ở bài sau mình sẽ giới thiệu về kiến thức nâng cao hơn chút, đó là xử lý bất đồng bộ trong Arduino, các bạn nhớ đón xem nhé ! 

Hẹn gặp lại.