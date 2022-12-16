Ở bài viết trước, mình đã giới thiệu về lập trình Arduino với button, ở bài biết này mình sẽ tiếp tục hướng dẫn các bạn cách xử lý bất đồng bộ đơn giản với Arduino. Đầu tiên chúng ta hãy xét ví dụ sau.

# Đặt vấn đề
Trước khi nói về bất đồng bộ, chúng ta hãy xét qua ví dụ sau: Dùng Arduino điều khiển 2 đèn LED, trong đó 1 đèn LED bật tắt tự động sau 3 giây, còn 1 đèn LED được điều khiển bằng button.
Vậy để giải quyết bài toán này, ta sẽ cần:

## Phần cứng cần thiết

* 1 mạch Arduino Uno R3 bao gồm dây nối USB với máy tính ( Không thật sự bắt buộc phải là con Arduino này, bạn có thể thay thế bằng bất kỳ dòng Arduino khác cũng được, nhưng phải xem lại sơ đồ chân của nó )
* 02 đèn LED màu bất kỳ ( trên thị trường có bản 3mm hoặc 5mm, bản nào cũng được, 5mm thì sáng hơn )
* 03 điện trở 220 Ohm 
* 01 Button 4 chân
* Dây đấu nối


## Sơ đồ lắp đặt


![ledtudong](https://images.viblo.asia/a317f5bb-12fd-404a-8e93-5b43b3133063.png)

Cách đấu nối  đã được đề cập ở các bài viết trước, nếu bạn không hiểu có thể tìm trong Series về Arduino này của mình.

Sau khi đấu nối xong, bạn sử dụng dây USB để kết nối Arduino với máy tính để ta tiến hành nạp code bên dưới.

## Lập trình và nạp code

Dựa vào các kiến thức ở bài viết trước ta có thể code dễ dàng như sau:

```c
const int buttonPin1 = 2;     // pin nối button để điều khiển
const int ledPin2 =  8;      // pin nối LED điều khiển bằng button
const int ledPin1 =  10;      // pin nối LED bật tắt tự động sau 3s

// Tạo một biến nhận diện trạng thái button:
int buttonState = 0;         

void setup() {
  // set ledPin là output
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  // set buttonPin là input để đọc giá trị từ button
  pinMode(buttonPin, INPUT);
}

void loop() {

  if (digitalRead(ledPin1) == LOW) {  // nếu led đang tắt
    digitalWrite(ledPin1, HIGH); //bật led
  } else {
    digitalWrite(ledPin1, LOW); // tắt led
  }
  
  delay(3000); // dừng chương trình 3s để duy trì trạng thái của led 1
  
  // đọc giá trị button rồi lưu vào buttonState
  buttonState = digitalRead(buttonPin);

  // nếu button được nhấn, buttonState nhận giá trị HIGH, và ngược lại
  if (buttonState == HIGH) {
    // Bật LED:
    digitalWrite(ledPin2, HIGH);
  } else {
    // Tắt LED:
    digitalWrite(ledPin2, LOW);
  }
}
}
```

Cấu trúc chương trình và các hàm sử dụng nếu bạn không hiểu rõ có thể tìm hiểu bài viết trước trong series này.

Ở đây ta có thể tự động bật tắt LED 1 sau 3s và dùng button để điều khiển LED 2, nhìn code có vẻ đúng đúng không, bây giờ bạn nạp code vào và kiểm tra thử, bạn sẽ thấy rằng LED 1 đã hoạt động bật tắt tự động sau 3s đúng như bạn muốn, nhưng khi bạn bấm button để điều khiển led 2 thì chả có khác biệt gì cả, led 2 luôn tắt. Vậy tại sao ?

Lý do là bạn sử dụng hàm delay(), khi sử dụng nó, chương trình sẽ dừng mọi hoạt động xử lý và không nhận bất cứ thứ gì, do chương trình không chạy trong thời gian đang bị delay, nên bạn bấm button thì nó cũng không xử lý lệnh đó cho bạn. Vậy để xử lý tình huống này ta phải xóa hàm delay() đi thì button sẽ điều khiển được, nhưng như thế thì LED 1 không bật tắt sau 3s nữa, vậy ta phải xử lý sao bây giờ ???

Để cả hai cùng hoạt động, ta sẽ cần sửa đoạn code lại.

# Giải quyết vấn đề
Đoạn code được sửa lại sẽ như sau:

```c
const int buttonPin1 = 2;     // pin nối button để điều khiển
const int ledPin2 =  8;      // pin nối LED điều khiển bằng button
const int ledPin1 =  10;      // pin nối LED bật tắt tự động sau 3s

// Tạo một biến nhận diện trạng thái button:
int buttonState = 0;         
// Tạo một biến nhận thời gian làm mốc
unsigned long oldtime = 0;

void setup() {
  // set ledPin là output
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  // set buttonPin là input để đọc giá trị từ button
  pinMode(buttonPin, INPUT);
}

void loop() {

  if ((unsigned long) (millis() - oldtime) > 3000) { // sau 3s thì điều kiện thỏa mãn
      if (digitalRead(ledPin1) == LOW) {  // nếu led đang tắt
        digitalWrite(ledPin1, HIGH); //bật led
      } else {
        digitalWrite(ledPin1, LOW); // tắt led
      }
      oldtime = millis();    // thời gian làm mốc sẽ bằng thời gian hiện tại
  }
  
  
  // đọc giá trị button rồi lưu vào buttonState
  buttonState = digitalRead(buttonPin);

  // nếu button được nhấn, buttonState nhận giá trị HIGH, và ngược lại
  if (buttonState == HIGH) {
    // Bật LED:
    digitalWrite(ledPin2, HIGH);
  } else {
    // Tắt LED:
    digitalWrite(ledPin2, LOW);
  }
}
}
```


Như bạn đã thấy code ở trên, hàm delay() đã được xóa đi, và đoạn code tự động của LED 1 đã được sửa, bây giờ ta sẽ xét chi tiết.

Chúng ta có hàm mới millis(), đây là hàm trả về một số - là thời gian (tính theo mili giây) kể từ lúc mạch Arduino bắt đầu chương trình của bạn. Nó sẽ tràn số và quay số 0 (sau đó tiếp tục tăng) sau 50 ngày, vì tận 50 ngày, số nó sẽ rất lớn nên ta cần khai báo oldtime là unsigned long để có thể chứa nó.

Vậy nó dùng làm gì, ta hiểu một cách đơn giản, đầu tiên oldtime = 0, khi chương trình chạy sau 3s, điều kiện (millis() - oldtime) > 3000,
do đó led 1 tự động thay đổi trạng thái, sau đó  oldtime = millis() , đánh dấu mốc thời gian cho lần kiểm tra điều kiện tiếp theo, ở vòng loop kế tiếp, thì (millis() - oldtime) < 3000, khi đó code LED 1 sẽ không được chạy, mà sẽ đợi sau 3s nghĩa là (millis() - oldtime) > 3000 để tiếp tục.

Tóm lại, vòng loop() vẫn sẽ chạy liên tục bình thường, ta có thể điều khiển thoải mái button, còn led 1 sẽ bật tắt tự động khi thỏa mãn điều kiện, thế là 2 cái không ảnh hưởng đến nhau. Đó chính là bất đồng bộ trong Arduino.


Đơn giản thế thôi, vậy là mình đã hướng dẫn xong lập trình bất đồng bộ cơ bản với Arduino, ở bài sau mình sẽ giới thiệu về LED RGB với Arduino, các bạn nhớ đón xem nhé ! 

Hẹn gặp lại.