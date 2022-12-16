<h1>Tổng quan</h1>
Trong phần này,mình sẽ giới thệu cách chúng ta điều khiển mọi thiết bị thông qua internet từ bất kì đâu,kết hợp ESP8266 và Firebase.Biến thiết bị thông thường thành smart.
<h1>Chuẩn bị</h1>
1.Tài khoàn Firebase và tao database(các bạn có thể tự tra google và làm nhé.nó rất đơn giản),tạo một giá trị như hình sau.

![](https://images.viblo.asia/d3bc1c3d-9cea-4976-a513-34665650ad6a.PNG)<br>
2. Copy FIREBASE_HOST và FIREBASE_AUTH trong phần databasesecrets.<br>![](https://images.viblo.asia/c04a882f-32d5-426d-9eb6-1544d34d8aea.png)<br>
3. Cài đặt Arduino cho lập trinh ESP8266.chi tiết bạn tham khảo [ ở đây](https://arduino.esp8266.vn/basic/install.html) <br>
4. Cài thư viện để sử dụng firebase,bạn có thể tải [ ở đây](https://github.com/mobizt/Firebase-ESP8266?fbclid=IwAR32pUmocETPvlOkaGEeUdNZUIKMcZLDuEQZv6gmnO3a0NrolxyOxzzSrTA)<br>
5. Lặp đặt phần cứng như hình vẽ ở phần một.với việc thay bóng đèn bằng bất kì thiết bị khác như tivi,quạt,tủ lạnh,...<br>
Xong rồi.bât Arduino lên và code thôi.
<h1>Lập trình</h1>
1. Thiết lập thông số <br>
       
       #define FIREBASE_HOST "your-project.firebaseio.com"             // the project name address from firebase id<br>
        #define FIREBASE_AUTH " your-secret key generated"       // the secret key generated from firebase<br>
        #define WIFI_SSID "xxxxxxxxxxxxx" // nhập tên wifi của bạn<br>
        #define WIFI_PASSWORD "xxxxxxxxxxxxxx" // mật khẩu của wifi ssid<br>
        #define PIN_CONTROL D3 // Chân dữ liệu nối ra modul relay<br>
2. Đọc dữ liệu từ Firebase<br>
  * Kết nối ESP8266 với wifi nhà bạn.
>     WiFi.begin (WIFI_SSID, WIFI_PASSWORD).
* Chờ cho kết nối thành công
>     while (WiFi.status() != WL_CONNECTED) {
>     Serial.print(".");
>     delay(500);
>     }
* Lấy dữ liệu từ firebase<br>
>     status = Firebase.getString("status"); // lấy đầu vào trạng thái từ firebase
* Kiểm tra chuỗi lấy được là "on" hay "off" để quyết định xem là đóng hay ngắt relay để điều khiển thiết bị<br>
>     if(status== "ON" || status== "on") {
>         Serial.println(" Turned ON");                        
>         digitalWrite(PIN_CONTROL, HIGH);                                              
>     }
>     else{
>     digitalWrite(PIN_CONTROL,LOW);
>     }
<h1>Tổng kết</h1>
Như vậy mình đã hướng dẫn các bạn cách kết nối ESP8266 với Firebase.Từ bài sau các bạn chỉ cần care cách thay đổi giá trị "status" trên firebase để tắt bật thiết bị,để trở thành "smart" rồi.Đến đây là việc tư duy lập trình phần mềm rồi.Chẳng cần quan tâm con modul thô cục kia nữa,mọi ý tưởng phong phú bắt đầu từ đây.Các bạn nhớ theo dõi bài viết tiếp theo nhé