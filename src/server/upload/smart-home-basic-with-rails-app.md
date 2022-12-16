Như chúng ta đã biết đến với IOT mà trong đó Smart Home là một hệ thống điển hình, Smart Home là hệ thống nhà hay căn hộ được trang bị những hệ thống điều khiển hiện đại như đèn, tivi, rèm cửa, an ninh.. và nhiều mục đích khác nhằm mục đích làm cho cuộc sống trở nên tiện nghi, an toàn và tiết kiệm được tài nguyên sử dụng trong nhà. \
Tuy nhiên để chi trả cho một hệ thống nhà thông minh như vậy hiện tại ở Việt Nam khá là đắt đỏ, vậy nên hôm nay mình xin giới thiệu với mọi người một project nhỏ sử dụng `Rails app`, module điều khiển `Arduino Wemos D1` hoặc `Kit NodeMCU ESP 8266`, và sử dụng `FIREBASE`(*realtime communication system*) để điều khiển các thiết bị điện trong nhà một cách đơn giản nhất.\
Bài viết mình sẽ chia ra làm 2 phần lớn là implement on Rails app và ESP 8266.
### 1. Implement on Rails App
#### 1.1 Config Firebase
Về Firebase thì như chúng ta đã biết là một Google Service và hôm nay chúng ta sẽ sử dụng FIREBASE như là một phương thức giao tiếp giữa Arduino và Rails thông qua file JSON được base realtime data. Ngoài ra FireBase cũng được build realtime để làm chat app, multi player game, và được sử dụng nhiều trong dashboard trong game mobile.
Để implement thì chúng ta sẽ create a project on [Firebase console](https://console.firebase.google.com/u/0/) 

![](https://images.viblo.asia/73c9e078-e494-4993-8f2b-459ea0e3fb1d.png)\
Click vào add Project và điền thông tin vào như hình trên vào và click `CREATE PROJECT`\
\
![](https://images.viblo.asia/6c42942b-4b5f-441b-ad34-e582b1e1f62c.png)\
Sau khi tạo thì nó sẽ redirect đến trang dashboard và bạn chọn phần `Setting(icon răng cưa) =)) > Project Setting`\
\
![](https://images.viblo.asia/7eb799cc-5df6-4e2d-a4d7-06da92a9a929.png)\
và chọn phần Service Account để lấy Secret key bằng cách là di chuột vào ô secret rồi chọn show để copy và đến phần rails app mình sẽ paste vào.

#### 1.2 Implement Rails app
Ở đây chúng ta sẽ tạo một rails app và thêm gem [firebase](https://github.com/oscardelben/firebase-ruby) vào gem_file nhé.
```ruby
gem 'firebase'
```
và sau đó chạy bundle
Đầu tiên chúng ta sẽ thử nó trong console nhé. :)
```ruby
2.5.1 :001 > base_uri = 'https://smart-home-with-rails-app.firebaseio.com/'
2.5.1 :002 > base_secret = "zSZ4mX9PBIiNA7Rhq8zE3eOds11dFwe2Tg******"
2.5.1 :003 > firebase = Firebase::Client.new(base_uri, base_secret)
2.5.1 :004 > response = firebase.push("smart-home-with-rails-app", {name: "tran hai quan", age: 22 })
```
ở đây base_uri chính là url ở trong mục Develop > Database ở bên dashboard nhé, base_secret chinhs là secret mà mình nói ở phần khởi tạo prioject firebase rồi, sau đó chúng ta khởi tạo một firebase client với uri và secret và push vài thông tin lên để thử xem.
![](https://images.viblo.asia/bfaad011-9f2f-4f31-a2d3-283b4c7bcb1e.png)
Như vậy thì chúng ta có thể push được thông tin lên Firebase rồi, ở đây mình chỉ xin phép trình bày ngắn gọn về cách push thông tin lên và dùng arduino để get data vậy nên về mặt cụ thể trong code cũng như giao diện thì mình k trình bày ở đây. 
### 2. Implement on ESP 8266
Đối với arduino thì chúng ta có thể sử dụng wemos D1 hoặc là Kit NodeMCU Esp 8266, tuy nhiên theo mình thì nên sử dụng Esp 8266 vì nó nhỏ gọn hơn wemos D1\
![](https://i1.wp.com/www.hoangvancong.com/wp-content/uploads/2016/10/nodemcu_pinout_700.png?resize=539%2C455)
\
Kit NodeMCU Esp 8266 là một loại kit được tích hợp wifi nên đây là lý do mà mình chọn kit này để sử dụng ở đây.
Một số thông số kỹ thuật của kit: \
* Được sử dụng với nguồn 5V
* Hỗ trợ kết nối wifi
* 16 Pin GPIO(IO)
* Hỗ trợ giao tiếp UART, I2C
* Tương thích với trình biên dịch Arduino or Sublime text với package (Arduino like IDE)
* ...
\
Trên đây là phần giới thiệu về Kit thôi, còn bây giờ sẽ là phần code:
Tạo 1 project arduino với đuôi file là `.ino`
```c++
// your url firebase
#define FIREBASE_HOST "https://smart-home-with-rails-app.firebaseio.com/"
// app's secret
#define FIREBASE_AUTH "zSZ4mX9PBIiNA7Rhq8zE3eOds11dFwe2Tg******"
//name router
#define WIFI_SSID "Wifi Router Name"
// password of router
#define WIFI_PASSWORD "Router Password"
// define GIO2 is PIN connect with LIGHT(or LIGHT)
#define LIGHT 2

void setup() {
  pinMode(LIGHT,OUTPUT);
  digitalWrite(LIGHT,0);
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  if(Firebase.getInt("LIGHTStatus")) {
    digitalWrite(LIGHT, HIGH);
  } else {
    digitalWrite(LIGHT, LOW);
  }

  if (Firebase.failed()) // Check for errors {
    Serial.print("setting /number failed:");
    Serial.println(Firebase.error());
    return;
  }
  delay(1000);
}
```
Việc của bạn sau đó là connect Esp với máy tính của bạn và compile code vào Esp để chạy nhé.
Đối với thiết bị trong nhà hiện tại ở VN thì chủ yếu là đầu vào 220V mà Esp chỉ cho ra nguồn là 5V vậy nên chúng ta phải điều khiển thiết bị thông qua relay đóng ngắt, và sơ đồ sẽ nối như sau:
![](http://fritzing.org/media/fritzing-repo/projects/i/iot-switch-onoff-220-240v-device-with-nodemcu-5v-r/images/Fritzing.png)\
**VCC**: Nguồn 5v lấy từ ESP ứng với PIN VCC/5V\
**GND**: Nguồn âm, hay còn gọi là chân đất\
**IN**: PIN IO chính là chân số 2 lúc nãy mình khai báo ở code
### Lưu ý
***Một lưu ý khi kết nối là hãy đảm bảo răng bạn có chút kiến thức về điện, điện tử, và mọi kết nối của bạn là chính xác, bởi vì mình làm việc trực tiếp với điện 220v nên là hãy cẩn thận nhé.***
### Summary
Như vậy ở bài viết này mình đã giới thiệu và hướng dẫn mọi người làm một project nhỏ sử dụng rails app và esp 8266 để điều khiển thiết bị điện trong nhà cùng vowius firebase.
Bài viết còn nhiều sai sót. Mong mọi người đọc và cho mình ý kiến đóng góp nhé, cảm ơn tất cả mọi người!\
Tài liệu tham khảo:\
https://www.instructables.com/id/Firebase-Integrate-With-ESP8266/ \
https://medium.com/@channaly/connect-to-firebase-realtime-database-from-rails-application-f42c81dbb532 \
https://github.com/oscardelben/firebase-ruby/wiki