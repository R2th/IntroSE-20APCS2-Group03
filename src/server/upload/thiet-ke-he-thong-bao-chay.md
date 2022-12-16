Trong những năm gần đây tình hình hỏa hoạn diễn ra khá thường xuyên và để lại các hậu quả khá nghiêm trọng. Các vụ đặc biệt nghiêm trọng lại diễn ra ở các chung cư, là nơi có mật độ người rất cao. Việc trang bị hệ thống báo cháy cho chung cư là 1 việc làm vô cùng cần thiết. Trong bài viết này chúng ta sẽ thử thí nghiệm 1 mạch báo cháy với Arduino và 3 cảm biến.

# Thiết bị
* Mạch Arduino Uno R3
* Dây dẫn
* 1 đèn LED
* 1 loa
* 2 điện trở 220 Ohm
* 3 điện trở 10k 
* Nhiệt trở MF58
* Module cảm biến khí Gas MQ-2
* Module cảm biến ánh sáng Tuhu

Các cảm biến trên các bạn có thể tra được doc. Riêng với cảm biến ánh sáng Tuhu thì các bạn phải tự đo. Tuy nhiên đây là thông tin các cổng của nó(ảnh chất lượng hơi thấp nhưng vẫn đọc rõ. Mong các bạn thông cảm).

![](https://images.viblo.asia/2fa47810-b88b-4bc3-b531-50f455bb6e1a.jpg)

# Mắc mạch

Mình biết là trông dây dợ lằng nhằng. Nhưng đừng ai nhầm mình đăng lắp mạch kích nổ cho bom nhé =))

![](https://images.viblo.asia/f932e77c-a80a-4b5d-9ffc-be76a73b30ff.jpg)

* Đèn LED mắc nối tiếp điện trở 220 Ohm. Cực dương cắm ở chân Digital 13. Cực âm nối với GND của Arduino.
* Loa mắc nối tiếp điện trở 220Ohm thứ 2. Cực dương nối chân Digital 3. Cực âm nối với GND của Arduino.
* 2 module cảm biến đều có 4 chân như nhau: VCC, GND, Ao và Do. VCC của 2 cảm biến nối với chân 5V ở phía Analog. GND nối GND. Chân Ao của MQ-2 nối với A0 của Arduino. Chân Ao của Cảm biến quang Tuhu nối với A1 của Arduino.
* mắc nối tiếp 3 điện trở 10k với nhau và nối tiếp Nhiệt trở MF-58. 1 đầu cụm điện trở này nối chân 5V của Arduino. Đầu còn lại nối chân GND. Giữa cụm điện trở 10k và nhiệt trở, cắm dây dẫn nối từ đó tới chân Analog A2.

# Sourcecode
```
#define led 13
int pinSpeaker = 3; 

void setup() {
  pinMode(led,OUTPUT);
  pinMode(pinSpeaker, OUTPUT);
  Serial.begin(9600);  //Mở cổng Serial để giap tiếp | tham khảo Serial
}

int checkFire(int x, int y){
  if(x<=y){
    return 1;
  } else {
    return 0;  
  }
}

void alarm(int sensor1,int sensor2,int sensor3){
  if (checkFire(400, sensor1)==1){
    digitalWrite(led,HIGH);
    playTone(300, 160); 
    Serial.println("Có cháy");
  } else if (checkFire(sensor2, 300)==1){
    digitalWrite(led,HIGH);
    playTone(300, 160); 
    Serial.println("Có cháy");
  } else if (checkFire(sensor3, 720)==1){
    digitalWrite(led,HIGH);
    playTone(300, 160); 
    Serial.println("Có cháy");
  } else {
    digitalWrite(led,LOW);
    playTone(0, 0); 
  }
}

void playTone(long duration, int freq)
{
  duration *= 1000;
  int period = (1.0 / freq) * 1000000;
  long elapsed_time = 0;
  while (elapsed_time < duration)
  {
    digitalWrite(pinSpeaker,HIGH);
    delayMicroseconds(period / 2);
    digitalWrite(pinSpeaker, LOW);
    delayMicroseconds(period / 2);
    elapsed_time += (period);
  }
}

void loop() {
  int gasSensor = analogRead(A0);   //đọc giá trị điện áp ở chân A0 - chân cảm biến MQ-2
  int lightSensor = analogRead(A1);   //đọc giá trị điện áp ở chân A1 - chân cảm biến quang Tuhu
  int heatSensor = analogRead(A2);   //đọc giá trị điện áp ở chân A2 - cụm điện trở. Khi có nhiệt tác động biến trở nhiệt giá trị này thay đổi
  //-----------------------------------------------------
  delay(100);           //đợi 0.1 giây để bạn kịp tháy serial - (optional)
  alarm(gasSensor,lightSensor,heatSensor);
}
```

# Demo

{@youtube: https://youtu.be/hd0OJDcbNRw}

# Kết luận và giải pháp nâng cấp

Đây là sản phẩm demo chỉ hoạt động trên quy mô phòng thí nghiệm. Còn thực tế chúng ta có thể bố trí cảm biến quang để cảnh báo chập điện, cảm biến khói trên trần nhà hoặc trong khu vực để khí gas để phát hiện rò rỉ gas. Hoặc chúng ta thay lệnh `Serial.println("Có cháy");` bằng 1 lệnh gửi thẳng thông tin tới smartphone báo động. 

Cảm nghĩ cá nhân: May cho mình là nó chỉ ở mức độ phòng thí nghiệm. Mức độ thật chắc lo nguy cơ chết người quá =))) Cơ mà mức độ này mình cũng đã đủ hãi do dây dợ, breadboard và Arduino đều đồ đi mượn =)) mỗi MQ-2, MF-58, LED và Loa là đi mua. Bắt lửa 1 phát thì kiếm việc làm cửu vạn ngày giỗ Tổ mua đền mất =)))

Cảm ơn các bạn đã theo dõi bài viết.