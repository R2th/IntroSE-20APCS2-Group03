Hello! Chào cả nhà. Bài viết hôm nay mình sẽ chia sẽ những kinh nghiệm cho những bạn nào muốn tìm hiểu và làm thử một ứng dụng IoT(ví dụ như điều khiển on/off thiết bị điện trong nhà ở bất cứ đâu thông qua internet).
Để học và thực hành về IoT cần cố những thứ sau:
## Phần cứng.
- Khi bắt đầu tìm hiểu về IoT tôi tìm các bài trên mạng thì đa số các bài sẽ khuyên nên mua module tích hợp chip Wifi ESP8266, tôi chọn mua [Wifi ESP8266 NodeMCU Lua CP2102](https://hshop.vn/products/kit-rf-thu-phat-wifi-esp8266-nodemcu) đã tích hợp sẵn chịp nạp và đèn led để test hết 150k(bao gồm 35k tiền vận chuyển). Sau một thời gian test kết quả dựa vào các đèn led trên bo mạch, tôi quết định làm một project nhỏ nhỏ về điều khiển các thiết bị trong nhà qua mạng wifi nên tôi quyết định mua thêm 1 module gồm 4 relay [tại đây](https://www.dientubachviet.vn/389-4-relay-for-arduino.html) với giá 60k. Vậy tổng cộng là 210k(chỉ có hai món). Sau đó tôi phát hiện là để học và thực hành về IoT thì chúng ta nên mua bộ kít cho người mới học IoT [tại đây](https://www.sendo.vn/combo-bo-kit-hoc-tap-arduino-uno-r3-v1-co-ban-6980630.html?gclid=CjwKCAjw0JfdBRACEiwAiDTALhdhPVt9E6HaiWGFMnkk4ka9pWfPGdK3nTLv5xoe9FyPnq2NrIdNSxoCAcUQAvD_BwE) với giá 399k. Bộ kít này có đầy đủ các dụng cụ cho các bạn vọc vạch và phá phách. Nên tôi khuyên các bạn bắt đầu tìm hiểu về IoT thì nên mua bộ kít ở trên.
##  Phần mềm:
- OS thì tùy các bạn. Nhưng khi mới làm quên IoT mình khuyên các bạn nên dung Window.
- Về ngôn ngữ thì sẽ dùng arduino, các bạn nên đọc qua tài liệu cơ bản về arduino [tại đây](http://arduino.vn/reference).
- IDE thì các nên dùng Arduino IDE. Các bạn đọc và làm theo hướng dẫn [tại đây](http://arduino.vn/bai-viet/68-cai-dat-driver-va-arduino-ide) để cài đặt.
## Hello world
Khi bắt đầu học một ngôn ngữ mới nào đó, ta thường bắt đầu bằng một chương trình in ra dòng chữ "Hello World". Phần này mình sẽ hướng dẫn viết một chương trình "Hello World" bằng arduino trên chip ESP8266, tuy nhiên sẽ không in ra dòng chử "Hello world" mà sẽ là on/off đền led trên bo mạch qua mạng wifi.
Hay đảm bảo là bạn đã cài thành công Arduino IDE theo link hướng dẫn ở trên. Mở arduino IDE lên và edit lại thành nội dung như sau:
```
#include <ESP8266WiFi.h>
 
const char* ssid = "your-ssid";// tên wifi mà bạn muốn connect
const char* password = "your-password";//pass wifi
 
int ledPin = 2; // GPIO2
WiFiServer server(80);// Port 80
 
void setup() {
Serial.begin(115200);
delay(10);
 
pinMode(ledPin, OUTPUT);
digitalWrite(ledPin, LOW);
 
// Kết nối với wifi
Serial.println();
Serial.println();
Serial.print("Connecting to ");
Serial.println(ssid);
 
WiFi.begin(ssid, password);
 
while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("");
Serial.println("WiFi connected");
 
// Bắt đầu sever
server.begin();
Serial.println("Server started");
 
// In địa chỉ IP 
Serial.print("Use this URL to connect: ");
Serial.print("http://");
Serial.print(WiFi.localIP());
Serial.println("/");
 
}
 
void loop() {
// Kiểm tra xem đã connect chưa
WiFiClient client = server.available();
if (!client) {
return;
}
 
// Đọc data
Serial.println("new client");
while(!client.available()){
delay(1);
}
 
String request = client.readStringUntil(‘\r’);
Serial.println(request);
client.flush();
 
int value = LOW;
if (request.indexOf("/LED=ON") != -1) {
digitalWrite(ledPin, HIGH);
value = HIGH;
}
if (request.indexOf("/LED=OFF") != -1) {
digitalWrite(ledPin, LOW);
value = LOW;
}
//digitalWrite(ledPin, value);
 
 
// Tạo giao diện cho html!!! giống con elthernet shield á!!! bạn có thể thiết kế 1 giao diện html khác, cho đẹp
client.println("HTTP/1.1 200 OK");
client.println("Content-Type: text/html");
client.println(""); // do not forget this one
client.println("<!DOCTYPE HTML>");
client.println("<html>");
 
client.print("Led pin is now: ");
 
if(value == HIGH) {
client.print("On");
} else {
client.print("Off");
}
client.println("<br><br>");
client.println("Click <a href=\"/LED=ON\">here</a> turn the LED on pin 2 ON<br>");
client.println("Click <a href=\"/LED=OFF\">here</a> turn the LED on pin 2 OFF<br>");
client.println("</html>");
 
delay(1);
Serial.println("Client disonnected");
Serial.println("");
 
}
```

Trong code đã có comment giải thích rồi mình sẽ không nói thêm nữa. Chung qui code này sẽ run một server để nhận request tới check nếu có "/LED=ON" thì sáng đèn led, còn nếu có "/LED=OFF" thì đèn led sẽ off. Các bạn có thể tìm hiểu thêm về thư viện esp8266wifi [tại đây](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html).
Bây giờ kết nối module Wifi ESP8266 NodeMCU Lua CP2102 với máy tính bằng cáp micro usb và nạp code vào chip Wifi ESP8266 (bước này trong link cài đặt arduino ở trên có hướng dẫn rồi, các bạn làm theo nhé). 
Sau khi nạp xong hay mở Serial Monitor để xem IP của ESP8266. Sau đó vào trình duyệt trên thiết bị kết nối cùng wifi với ESP8266 và nhập đường link theo cấu trúc sau:
'http://ip_address' rồi bấm vào các button trên giao diện để xem kết quả nhé.
## Kết luận
Vậy là mình đã chia sẽ với các bạn một số kinh nghiệm về bước đầu tìm hiểu IoT. Hi vong đến đây các bạn sẽ có hứng thú để tiếp tục tìm hiểu về IoT và xây dựng những ứng dụng nho nhỏ từ những bộ phận có trong bộ kít mình giới thiệu ở trên.