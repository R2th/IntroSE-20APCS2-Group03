Xin chào các bạn, mình đã quay trở lại rồi đây. Như đã nói ở [bài trước](https://viblo.asia/p/cac-thiet-bi-iot-ket-noi-internet-nhu-the-nao-bWrZnNJrZxw) bài hôm nay mình xin viết về việc cài đặt chương trình thiết lập kết nối vào mạng wifi cho ESP8266. Trong bài viết này mình vẫn sử dụng em wemos d1 mini như những bài trước.

![Wemos D1 mini](https://images.viblo.asia/3a371318-f8f8-4971-a360-bd3314bf299f.png)

# Ý tưởng
Ý tưởng để gửi SSID và PASS của wifi cho ESP8266 là ESP8266 sẽ làm một server web cung cấp 1 API để máy tính gửi dữ liệu vào. Nhưng muốn máy tính truy cập được API đó thì nó phải được kết nối cùng mạng với ESP8266. ESP8266 thì không thể kết nối được bất kì mạng wifi nào rồi bởi vì mình đang thiết kế chương trình để kết nối wifi mà :) . Vậy làm sao để ESP8266 có thể kết nối đến máy tính mà chính nó lại không thể kết nối wifi?

Bạn có thể nghĩ đến một phương án là cho ESP8266 kết nối đến wifi mặc định. Mỗi khi muốn cài đặt cho ESP8266 kết nối đến wifi khác thì máy tính phải phát một wifi mặc định cho ESP8266 kết nối đến rồi quá trình cài đặt diễn ra.  Đây là một ý tưởng có thể thực hiện được nhưng nó lại khá là phức tạp để thực hiện nếu người dùng không biết cách cài đặt cho việc phát wifi từ máy tính. 

Một ý tưởng khác được đặt ra là cho ESP8266 phát wifi để máy tính kết nối đến. Việc sử dụng máy tính để kết nối wifi thì ai ai cũng có thể làm được. Việc quan trọng là mình phải viết chương trình làm sao cho ESP8266 phát được wifi thôi. Để làm được việc này thì ESP8266 phải có chức năng phát wifi không thì sao có thể phát wifi được. Thật tuyệt vời ESP8266 có thể làm được điều đó. Nó có thể phát được wifi và đồng thời làm server web luôn.

Như vậy ý tưởng cho chương trình sẽ như sau: 
- ESP8266 phát một wifi với mật khẩu mặc định là "12345678" và đồng thời chạy web server cung cấp API nhận SSID và PASS của wifi. Máy tính sẽ kết nối đến wifi mà ESP8266 phát ra, truy cập vào địa chỉ IP của ESP8266 và gửi POST request yêu cầu ESP8266 kết nối đến wifi người dùng nhập vào. 
- Chúng ta cũng phải viết thêm chức năng để chuyển giữa chế độ hoạt động bình thường và chế độ cài đặt nữa. Ý tưởng được phát biểu như sau: khi ESP8266 đang hoạt động bình thường, muốn vào chế độ cài đặt thì phải ấn và giữ 1 nút trên phần cứng khoảng 3s. Khi cài đặt xong thì sẽ về chế độ bình thường. Mà khi đang ở chế độ cài đặt muốn về chế độ hoạt động bình thường thì người dùng cũng phải ấn và giữ nút cài đặt khoảng 3s để chuyển chế độ.

# Thiết kế chương trình
Sơ đồ hoạt động của hệ thống sẽ như sau:

![Sơ đồ hoạt động](https://images.viblo.asia/d4aa9540-5a77-4fd5-b58e-1658624b87b1.png)

Khi hệ thống hoạt động bình thường ấn và giữ nút cài đặt 3s để vào trạng thái cài đặt. Khi ở  trạng thái cài đặt ESP8266 sẽ phát ra 1 wifi với mật khẩu là "12345678". Đồng thời ESP8266 sẽ làm web server cung cấp API để truy cập vào. Máy tính sẽ kết nối với wifi ESP8266 do phát ra và sử dụng một giao diện web để truy cập API đến ESP8266. Và tiếp theo quá trình cài đặt sẽ diễn ra như sơ đồ bên trên.

# Viết chương trình cho ESP8266
Chương trình viết cho ESP8266 lần này sẽ phức tạp hơn 1 chút nên mình sẽ chia thành các Service nhỏ. Chúng ta cần xây dựng các service sau:

-  EEPROM Service: Service này sẽ có nhiệm vụ đọc và ghi dữ liệu vào EEPROM. Nói qua về EEPROM một chút. EEPROM là một loại bộ nhớ của ESP8266. Nó có thể lưu mãi mãi không bị mất khi mất điện hoặc reset. Nó còn không thể mất khi nạp lại chương trình, rất thích hợp để lưu các dữ liệu lâu dài.
-  Wifi Service: Service sẽ có nhiệm vụ giúp ESP8266 phát wifi và kết nối với wifi nhận được.
-  HttpServerH: Nhiệm vụ của Service này là giúp ESP8266 tạo một web server cung cấp các API. Mình thêm chữ H vì ESP8266 đã có một thư viện tên là HttpServer rồi.

Bây giờ chúng ta sẽ từng bước, từng bước tạo các Service đã được liệt kê ở bên trên.

Trong bài viết này mình sẽ sử dụng các thư viện:
- ArduinoJson: 5.13

Đầu tiên sẽ là EEPROM Service.

## EEPROM Service
Để thao tác với EEPROM ta sẽ sử dụng thư viện EEPROM của ESP8266. Tuy nhiên thư viện này chỉ thao tác với từng ô nhớ. Nhưng những giá trị cần lưu vào là các String do vậy cần phải viết các hàm thực hiện được điều đó. Service này sẽ có 4 hàm cơ bản sau:

- **write** Hàm ghi
- **read** Hàm đọc
- **clear** Hàm xóa dùng để xóa các ô nhớ về giá trị 0
- **commit** Hàm commit để lưu những thay đổi vào EEPROM thật

```
void EEPRomHClass::write(const String &data, int begin, int endMax)
{
    int end = data.length() + begin;
    if (end - 1 > endMax) {
        ECHOLN("[EEPRomService][write] Size too large");
        return;
    }
    clear(begin, endMax);

    for (int i = begin; i < end; i++) {
        EEPROM.write(i, data[i - begin]);
        ECHO("[EEPRomService][write] Wrote EEPROM: ");
        ECHOLN(data[i - begin]);
    }
}

String EEPRomHClass::read(int begin, int end)
{
    ECHO("[EEPRomService][read] Read eeprom: ");
    ECHO(begin);
    ECHO(" ");
    ECHOLN(end);
    String data;
    char c;
    for (int i = begin; i <= end; ++i) {
        c = (char) EEPROM.read(i);
        if (c != 0) {
            data += c;
        }
    }

    return data;
}

void EEPRomHClass::clear(int start, int end)
{
    ECHO("[EEPRomService][clear] Clearing eeprom: ");
    ECHO(start);
    ECHO(" ");
    ECHOLN(end);
    for (int i = start; i <= end; ++i) {
        EEPROM.write(i, 0);
    }
}

void EEPRomHClass::commit()
{
    ECHOLN("[EEPRomService][commit] Commit eeprom");
    EEPROM.commit();
}
```

## WIFI Service

Wifi service sẽ có 2 hàm 3 hàm để thực hiện việc: kết nối wifi, lưu trữ wifi, phát wifi. Cụ thể như sau:

**Kết nối wifi:** có 2 hàm kết nối wifi. Một là lấy dữ liệu từ bộ nhớ EEPROM rồi kết nối, một hàm sẽ cho phép truyền ssid và pass từ bên ngoài vào để kết nối. Khi truyền từ bên ngoài vào nếu wifi kết nối thành công thì ssid và pass sẽ được lưu lại để sử dụng cho lần sau. Code của hàm kết nối sẽ như sau:

```
int WifiServiceClass::connect()
{
    ECHOLN("[WifiService][connect] Read wifi SSID and PASS from EEPROM");
    String ssid = EEPROMH.read(EEPROM_WIFI_SSID_START, EEPROM_WIFI_SSID_END);
    String pass = EEPROMH.read(EEPROM_WIFI_PASS_START, EEPROM_WIFI_PASS_END);
    return connect(ssid, pass);
}

int WifiServiceClass::connect(const String &ssid, const String &pass, boolean isNew)
{
    ECHOLN("[WifiService][connect] Open STA....");
    ECHO("[WifiService][connect] Wifi connect to: ");
    ECHOLN(ssid);
    ECHO("[WifiService][connect] With pass: ");
    ECHOLN(pass);
    WiFi.softAPdisconnect();
    WiFi.disconnect();
    WiFi.mode(WIFI_STA);
    delay(100);
    WiFi.begin(ssid.c_str(), pass.c_str());

    ECHOLN("Waiting for Wifi to connect");
    int c = 0;
    while (c < 20) {
        if (WiFi.status() == WL_CONNECTED) {
            ECHOLN("Wifi connected!");
            ECHO("Local IP: ");
            ECHOLN(WiFi.localIP());
            if (isNew) {
                storeWifi(ssid, pass);
            }

            return CONNECT_OK;
        }
        delay(500);
        ECHO(".");
        c++;
    }
    ECHOLN("");
    ECHOLN("Connect timed out");
    return CONNECT_TIMEOUT;
}
```

**Lưu wifi:** Hàm này sẽ viết vào bộ nhớ và lưu lại. Địa chỉ cấp cho mỗi chuỗi ssid và pass là 20 byte tương đương với 20 ký tự.

```
void WifiServiceClass::storeWifi(const String &ssid, const String &pass)
{
    EEPROMH.write(ssid, EEPROM_WIFI_SSID_START, EEPROM_WIFI_SSID_END);
    EEPROMH.write(pass, EEPROM_WIFI_PASS_START, EEPROM_WIFI_PASS_END);
    EEPROMH.commit();
}
```

**Phát wifi:** Trước khi phát wifi cần phải ngắt hết mọi kết nối. Sau đó chuyển chế độ sang WIFI_AP để phát wifi.

```
void WifiServiceClass::setupAP()
{
    ECHOLN("[WifiService][setupAP] Open AP....");
    WiFi.softAPdisconnect();
    WiFi.disconnect();
    delay(3000);
    WiFi.mode(WIFI_AP);

    WiFi.softAP(WIFI_AP_SSID, WIFI_AP_PASSWORD);
    ECHO("[WifiService][setupAP] Connect to wifi:");
    ECHOLN(WIFI_AP_SSID);
    ECHO("[WifiService][setupAP] Password:");
    ECHOLN(WIFI_AP_PASSWORD);

    ECHOLN("[WifiService][setupAP] Softap is running!");
    IPAddress myIP = WiFi.softAPIP();
    ECHO("[WifiService][setupAP] IP address: ");
    ECHOLN(myIP);
}
```

Cuối cùng tạo object của class cho việc sử dụng: `WifiServiceClass WifiService;`

## HttpServerH

Service này sẽ tạo Web Server và cung cấp API phục vụ cho việc kết nối. Tất nhiên là dữ liệu trao đổi sẽ là chuỗi json để dễ xử lý. ESP8266 có thư viện ArduinoJson để thực hiện parse các chuỗi json. Chúng ta sẽ sử dụng thư viện này để parse dữ liệu nhận được từ máy tính.

Sẽ có 3 hàm thực hiện API chính:

- **handleStatus** dùng để kiểm tra trạng thái của thiết bị
- **handleWifis** dùng để quét các wifi gần kề để gửi trả lại phía máy tính
- **handleConnectTo** dùng để nhận mật khẩu từ máy tính gửi đến và gọi hàm connect wifi.

Hàm tạo `ESP8266WebServer` và `on` các request sẽ như sau: 

```
void startConfigServer() {
    if (server) {
        return;
    }

    ECHOLN("[HttpServerH][startConfigServer] Begin create new server...");
    server = new ESP8266WebServer(HTTP_PORT);

    server->on(F("/"), HTTP_GET, handleRoot);
    server->on(F("/status"), HTTP_GET, handleStatus);
    server->on(F("/wifis"), HTTP_GET, handleWifis);
    server->on(F("/connect-to"), HTTP_POST, handleConnectTo);
    server->on(F("/"), HTTP_OPTIONS, handleOk);
    server->on(F("/status"), HTTP_OPTIONS, handleOk);
    server->on(F("/wifis"), HTTP_OPTIONS, handleOk);
    server->on(F("/connect-to"), HTTP_OPTIONS, handleOk);
    server->begin();
    ECHOLN("[HttpServerH][startConfigServer] HTTP server started");
}
```

**Lưu ý:** Khi trình duyệt gửi request từ một địa chỉ khác (địa chỉ web giao diện tới địa chỉ ESP API là 2 địa chỉ khác nhau) thì trình duyệt sẽ gửi 1 OPTIONS REQUEST do vậy phải có các câu lệnh với methos là `HTTP_OPTIONS` cho tất cả các route được khai báo.

## Chương trình chính
Hàm `setup()` sẽ chạy đầu tiên khi bật nguồn. Do vậy hàm này sẽ phải cài đặt chế độ của các chân (PIN) cần thiết, init Serial và thực hiện là đọc SSID và PASS wifi được lưu trong bộ nhớ và kết nối đến wifi đó.

```
void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  Serial.println("\nStart up...");
  pinMode(PIN_RESET, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  WifiService.connect();
}
```

Hàm `loop()` sẽ kiểm tra chế độ làm việc của thiết bị để thực hiện các hàm tương ứng. Ở chế độ hoạt động bình thường (`NORMAL`) sẽ luôn kiểm tra kết nối wifi. Nếu wifi chưa được kết nối thì sẽ thực hiện kết nối wifi đã được lưu trong bộ nhớ. Khi mà đã kết nối wifi thì sẽ hoạt động bình thường. Ở đây mình sẽ cho nháy led để biểu thị là thiết bị đang hoạt động bình thường. Còn khi ở chế độ `SERVER` thì tất nhiên sẽ chờ client kết nối đến rồi (handleClient). Cuối cùng phải luôn luôn kiểm tra xem nút Setting có được bấm và giữ trong 3s hay không.

```

void handleNormalMode()
{
  if (WiFi.status() == WL_CONNECTED) {
    // Thực hiện nháy led
    if(toggleTimeout <= millis()) {
      digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
      toggleTimeout = millis() + LED_TIME_INTERVAL;
    }
    return;
  }
  // Kết nối wifi nếu không đang kết nối
  WifiService.connect();
}

void handleServerMode()
{
  if (server) {
      // Ở chế độ Server
     // Chờ client kết nối đến
    server->handleClient();
  }
}

void checkButtonResetClick()
{
    // Kiểm tra trạng thái của nút PIN_RESET và thời gian bấm nút
  if (digitalRead(PIN_RESET) == LOW && (settingTimeout + SETTING_HOLD_TIME) <= millis() && appMode != SERVER_MODE) {
    settingTimeout = millis();
    if (appMode != SERVER_MODE) {
      appMode = SERVER_MODE;
      WifiService.setupAP();
    }
  } else if(digitalRead(PIN_RESET) == HIGH) { // Nếu PIN_RESET ở mức cao thì đặt lại giá trị timer
    settingTimeout = millis();
  }
}

void loop() {
  if (appMode == NORMAL_MODE) {
    handleNormalMode();
  } else {
    handleServerMode();
  }
  checkButtonResetClick();
}
```

Mã chương trình đầy đủ tại [đây](https://github.com/HoangHoi/esp8266-connect-wifi)

# Kết luận
Trên đây mình đã hướng dẫn các bạn tạo một chương trình để thực hiện việc cài đặt wifi cho ESP8266. Nếu có bất kì thắc mắc nào hoặc bị vướng mắc ở phần nào thì hãy để lại comment bên dưới nhé.

Cảm ơn các bạn đã đọc bài viết của mình! Hy vọng bài viết sẽ giúp ích được cho các bạn. Chúc các bạn thành công!