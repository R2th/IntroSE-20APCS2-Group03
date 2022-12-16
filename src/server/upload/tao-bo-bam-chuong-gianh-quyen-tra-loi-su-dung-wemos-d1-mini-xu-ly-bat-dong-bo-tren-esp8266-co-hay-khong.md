Xin chào các bạn!

Đã từ rất lâu rồi mình chưa viết về chủ đề IoT. Hôm nay mình sẽ chia sẻ với các bạn cách tạo bộ bấm chuông giành quyền trả lời khi chơi trò chơi sử dụng thiết bị wemos quen thuộc.

Như các bạn đã biết, trong một trò chơi trả lời câu hỏi có nhiều đội sau khi người dẫn chương trình đọc xong câu hỏi thì các đội sẽ `đua nhau` bấm chuông để giành quyền trả lời. Đội nào bấm chuông nhanh nhất thì sẽ được quyền trả lời câu hỏi đó. Dấu hiệu của việc xác định đội nào bấm chuông nhanh nhất là chỉ duy nhất đèn của đội đó sáng và chuông của đội đó kêu.
Như vậy chúng ta cần phải xây dựng một hệ thống sao cho khi một đội gửi tín hiệu bấm chuông thành công thì những đội khác không thể gửi thêm tín hiệu bấm chuông nào nữa. 

Yêu cầu của hệ thống là phải đáp ứng được các tiêu chí:

- Tính thời gian thực, độ trễ của hành động bấm chuông và phản hồi lại phải rất nhỏ
- Độ chính xác cao,
- Có thể thêm hoặc bớt thiết bị dễ dàng. Giả sử hôm nay có 3 đội chơi nhưng ngày mai có 6 đội chơi. Hệ thống phải đáp ứng được sự thay đổi đó.

Với các yêu cầu như vậy mình sẽ sử dụng:

- Phần cứng là wemos d1 mini: nhỏ gọn, kết nối wifi, dễ dàng lập trình và nhiều ưu điểm khác
- Giao thức sử dụng là socket io để đảm bảo tính thời gian thực và độ chính xác cao: trên máy chủ mình sẽ viết bằng nodejs, trên thiết bị phần cứng là chương trình C sử dụng [thư viện soket io cho wemos](https://github.com/HoangHoi/esp8266-socket.io-only)

Ngoài ra, qua bài viết này mình sẽ giới thiệu với các bạn cách xử lý bất đồng bộ trong những thiết bị phần cứng. Cụ thể là những dòng esp8266, arduino,...

# Xây dựng hệ thống
Trên thực tế thì trong hệ thống chỉ có một cái chuông. Đội nào có tín hiệu bấm chuông thì cái chuông đó cũng kêu báo hiệu có người bấm chuông và để biết được ai bấm thì mình phải nhìn vào đèn của đội nào sáng. Như vậy cái chuông mình sẽ để ra một bên. Hệ thống bấm chuông nhưng mình sẽ không dùng chuông :). Thay vào đó là những chiếc đèn led.

Các đội sẽ bấm vào một cái nút kết nối với wemos. Wemos sẽ gửi tín hiệu lên máy chủ. Máy chủ sẽ kiểm tra xem đội nào bấm trước rồi gửi tín hiệu nhấp nháy đèn led của đội đó.

Sơ đồ kết nối của hệ thống sẽ như sau:

![](https://images.viblo.asia/b76480b3-a579-4140-be04-48dfcfa8ac72.png)

# Thao tác với phần cứng
## Chuẩn bị phần cứng
Phần cứng mình chuẩn bị ở đây gồm có `2 bộ`, mỗi bộ bao gồm:

- 1 chiếc wemos D1 mini
- 1 nút bấm nhả. Nút này khi mình bấm thì 2 tiếp điểm của nút sẽ tiếp xúc với nhau. Khi mình nhả tay thì 2 tiếp điểm của nút cũng sẽ nhả ra theo. Nó khác với một loại nút bấm một cái là tiếp xúc, bấm cái thứ 2 là nhả ra.
- 1 chiếc đèn led
- 1 điện trở 1000 ôm (bạn có thể thay bằng loại có giá trị cao hơn cũng được nhưng đừng cao quá nhé dưới 10k ôm là ổn rồi).
- 1 điện trở 320 ôm (bạn có thể thay bằng điện trở thấp hơn hoặc cao hơn, tùy từng màu led. Việc tính thông số này có công thức tính đó. Nếu các bạn cần sự chính xác cho led sáng đẹp thì có thể tìm kiếm trên mạng cách tính chi tiết nhé. Thông thường dùng điện trở từ 100 ôm đến 320 ôm là led sáng đẹp).

## Kết nối phần cứng

Sơ đồ kết nối phần cứng sẽ như sau:

![](https://images.viblo.asia/c479e1c1-61dc-4e39-be46-f247a073d48a.png)

Ta sẽ sử dụng 4 chân trên mạch wemos: chân `D5` với `D6` bạn có thể thay bằng chân `D` khác

- Chân GND
- Chân 3.3v
- Chân D5 dùng làm LED_PIN
- Chân D6 dùng làm BUTTON_PIN

LED sẽ phân biệt chân âm và chân dương (Chân dương là chân dài hơn. Nếu bạn nhìn vào cái led thì chân dương sẽ nhỏ hơn chân âm). Chân âm của led sẽ nối với chân `D5` và chân dương của led sẽ nối qua điện trở 330 ôm rồi nối vào chân `3.3v`. Như vậy khi mình cấp mức logic `LOW` vào chân `D5` thì LED sẽ sáng. Khi cấp mức logic `HIGH` vào chân D5 thì LED sẽ tắt.

Công tắc sẽ được nối một chân vào `3.3v` và một chân vào `D6`. Chân `D6` sẽ nối qua điện trở 1000 ôm xuống chân `GND`. Mục đích của việc này là tạo giá trị ban đầu cho chân `D6` bằng `LOW`. Khi ấn nút thì `3.3v` sẽ đi trực tiếp vào `D6`. Lúc này `D6` sẽ có giá trị `HIGH`.

**Chú ý:**

- Bạn không thể bỏ điện trở 1000 ôm đi không thì hệ thống hoạt động sẽ không chính xác.
- Bạn không thể nối trực tiếp `D6` với `GND` vì như thế sẽ làm ngắn mạch khi ta bấm nút.

Mình làm thêm cho mỗi bộ thiết bị một cái hộp nữa bằng máy in 3D. Kết quả sau khi lắp vào hộp nó sẽ như thế này đây:

![](https://images.viblo.asia/44c951dc-c682-489c-a2d1-2aab30a846d2.jpg)

# Lập trình phần mềm

## Sơ đồ hoạt động

Hệ thống sẽ hoạt động theo sơ đồ sau

![](https://images.viblo.asia/2acbd034-51a3-469c-b5bf-2f62ecd0dd35.png)

Người dùng bấm nút trên wemos. Wemos sẽ emit một sự kiện (`trigg`) báo hiệu cho server biết nút của nó đã được nhấn. Server dựa vào thời gian thiết bị nào `trigg` trước để xác định thiết bị đó chiến thắng cuộc đua. Server sẽ gửi duy nhất một sự kiện `win` cho Wemos đã chiến thắng. Khi nhận được sự kiện `win` Wemos sẽ nhấp nháy đèn với một số lần nhất định.

Ngoài ra server có thể gửi sự kiện `clear` đến tất cả các thiết bị để xóa kết quả tranh đấu, đưa các thiết bị về trạng thái bình thường. Sự kiện này sẽ được gửi sau khoảng 5s kể từ khi có thiết bị `win`.

## Lập trình cho Server (Nodejs)

Mình sử dụng các thư viện:

- "colors": "^1.3.3" - Hiển thị màu console.log cho đẹp
- "dotenv": "^4.0.0" - Load file config
- "express": "^4.15.3"
- "socket.io": "^1.7.4"

File `package.json` sẽ có nội dung đầy đủ như sau:

```json
{
  "scripts": {
    "start": "DEBUG=* node server.js"
  },
  "dependencies": {
    "colors": "^1.3.3",
    "dotenv": "^4.0.0",
    "express": "^4.15.3",
    "socket.io": "^1.7.4"
  }
}
```

Chương trình server của mình rất đơn giản có nhiệm vụ nhận sự kiện kích hoạt nút bấm (`trigg`) từ Wemos. Server sẽ xác định xem thiết bị nào gửi sự kiện đó đầu tiên và nó sẽ gửi sự kiện `win` cho thiết bị đó. Wemos nào nhận được sự kiện `win` thì sẽ nhấp nháy đèn. Kể từ khi có 1 thiết bị `win` thì những thiết bị khác gửi `trigg` sẽ không nhận được phản hồi. Tức là chỉ có thể có một đội thắng trong cuộc đua bấm chuông. Bên cạnh đó Server sẽ đếm thời gian kể từ khi có một thiết bị `win` để `clear` kết quả của cuộc đua bấm chuông. Thời gian `clear` mình cài đặt là 5000ms tương ứng với 5s.

Chương trình đầy đủ sẽ như sau:

```javascript
require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var colors = require('colors');
var port = process.env.PORT || 3000;

// Khởi tạo người dùng win
var userWin = null;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

// Hàm xóa kết quả của cuộc đua bấm chuông trước đó
function clearUserWin() {
    userWin = null;
    var clients = io.sockets.clients().sockets;
    var clientsKey = Object.keys(clients);
    for (var i = 0; i < clientsKey.length; i++) {
        clients[clientsKey[i]].isTriggered = false;
    }
    
    // Emit sự kiện clear tới tất cả các người dùng kết nối đến để tắt nháy led khi người đó win.
    io.emit('clear', {status: 1});
}

// Thực hiện khi có một người dùng emit sự kiện trigg (bấm chuông)
function handleUserTrigg(socket) {
    if (!socket.isTriggered) { // Nếu người dùng chưa bấm lần nào trước đó
        if (userWin == null) { // Nếu chưa có người thắng cuộc
            userWin = socket;
            socket.emit('win', {status: 1}); // emit sự kiện win cho người dùng biết là nó đã thắng

            setTimeout(clearUserWin, 5000); // thiết lập bộ đếm thời gian để xóa kết quả cuộc đua
        }
        socket.isTriggered = true; // thiết lập cờ đánh dấu người dùng đã trigg
    }
}

io.on('connection', function (socket) {
    console.log('New client connect'.gray);

    socket.on('trigg', function () {
        handleUserTrigg(socket);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray);
    });
});

```

## Lập trình cho Wemos

Các công cụ mình sử dụng:

- [Arduino IDE](https://www.arduino.cc/en/main/software) để nạp chương trình cho Wemos
- [Visual studio code](https://code.visualstudio.com) để lập trình

Thư viện sử dụng:

-  Thư viện [soket io cho wemos](https://github.com/HoangHoi/esp8266-socket.io-only)


Như sơ đồ hoạt động ở trên thì wemos sẽ thực hiện được các chức năng:

- Nháy đèn khi nhận được sự kiện `win`
- Nhận thao tác bấm nút để emit sự kiện `trigg`
- Nhận sự kiện `clear` để trở về trạng thái sẵn sàng

Để hiểu rõ hơn từng phần mình sẽ lập trình từng hàm chi tiết thực hiện các chức năng riêng lẻ. Sau đó sẽ ghép vào với nhau để trở thành chương trình hoàn chỉnh.

### Hàm nháy đèn LED

Nháy đèn LED là một công việc hết sức đơn giản. Bạn có thể cho LED bật tiếp đó dùng hàm `delay()` để cho wemos 'chờ' một khoảng thời sau đó lại tắt rồi lại 'chờ', xong lại bật,... Quá trình này lặp đi lặp lại tạo hiệu ứng nháy đèn.

Hàm nháy đèn `n` lần sẽ như sau:

```c++
void blink(uint8_t blinkCount, uint32_t timeInterval) {
    for (uint8_t i = 0; i < blinkCount; i++) {
        digitalWrite(LED_PIN, LOW); // Bật đèn
        delay(timeInterval); // Chờ timeInterval mini giây
        digitalWrite(LED_PIN, HIGH); // Tắt đèn
        delay(timeInterval); // Chờ timeInterval mini giây
    }
}
```

Hàm `delay()` được sử dụng ở đây sẽ khiến cho hệ thống chờ `timeInterval` mini giây. Chương trình sẽ dừng lại cho đến khi `delay` chạy xong. Khoảng thời gian này bạn không thể làm bất kì công việc gì khác. Tức là khi hàm `blink()` bên trên được thực thi thì đến lúc đèn hết nhấp nháy chương trình mới có thể thực hiện tiếp phần bên dưới.

Như vậy thì làm sao có thể vừa nhấp nháy đèn vừa nhận được sự kiện điều khiển từ server được, làm sao có thể nhận được tín hiệu từ nút bấm và làm sao có thể thực hiện nhiều tác vụ cùng một lúc với một chương trình chạy tuần tự?

Sẽ có khá nhiều câu hỏi được đưa ra trong tình huống này và nội dung của câu hỏi chủ yếu là vấn đề chạy song song 2 hay nhiều tác vụ với một chương trình tuần tự. Sau một thời gian tìm hiểu mình đã tìm ra giải pháp. Muốn chạy được nhiều công việc khác nhau đổi với một chương trình tuần tự ví dụ có 2 công việc A và B chẳng hạn thì mình phải chạy 1 phần công việc A xong chuyển sang 1 phần công việc B rồi lại chạy tiếp 1 phần A, rồi B, cứ thế đến khi nào mà 2 công việc hoàn tất. Thời điểm mà mình chuyển giữa 2 công việc là thời gian nghỉ ('delay') của nó hoặc là một thời điểm mình chia công việc đó ra.

Đối với chương trình nháy `LED` ở trên thì thời điểm mình chuyển công việc khác chính là thời gian `delay`. Mình sẽ bỏ `delay` đi, thay vào đó là một biến đếm thời gian. Khi chương trình chính gọi hàm `blink` thì nó sẽ kiểm tra xem thời gian đã đến lúc nó phải chuyển trạng thái của đèn chưa. Nếu đến thời điểm đó rồi thì nó chuyển trạng thái đèn, ngược lại chưa đến thì nó sẽ return để nhường tài nguyên cho các thành phần khác. Đây gọi là kỹ thuật xử lý bất đồng bộ trong Arduino.

Như vậy phải sửa lại hàm `blink` bên trên như sau: Đầu tiên bạn phải lưu thời gian bắt đầu `time`. Mong muốn của mình là  sau một thời gian `timeInterval`, tức là tại thời điểm `time+timeInterval` đèn sẽ được thay đổi trạng thái (từ tắt sang sáng hoặc từ sáng sang tắt). Như bạn đã biết trong chương trình Arduino có hàm `loop`. Hàm này sẽ chạy đi chạy lại liên tục suốt quá trình hoạt động của thiết bị đây chính là hàm lặp vô hạn trong chương trình chính. Trong mỗi lần lặp như vậy mình phải kiểm tra thời điểm hiện tại có phải là thời điểm chuyển trạng thái đèn (`time+timeInterval`) hay không để thực hiện thay đổi tương ứng. Mình sẽ sử dụng hàm `millis()` để đại điện thời gian hiện tại của hệ thống. Hàm `millis()` là một hàm trả về một số biểu thị thời gian (tính theo *mili giây*) kể từ lúc mạch Wemos bắt đầu chương trình. Hàm `blink` được viết lại và chương trình sử dụng nó sẽ như sau:

```C
#define LED_PIN D5

uint8_t ledState = HIGH;
uint8_t ledBlinkCount = 0;
uint32_t ledBlinkTimeout = 0;
uint32_t ledTimeInterval = 500;

void blinkLed()
{
    if (ledBlinkCount) { // Kiểm tra xem đã blink hết số lần cài đặt chưa
        if (millis() > ledBlinkTimeout) { // Nếu thời gian hiện tại lớn hơn time+timeInterval thì thay đổi trạng thái LED
            ledState = !ledState; // Cập nhật giá trị state
            digitalWrite(LED_PIN, ledState); // Cập nhật giá trị state lên chân output
            Serial.println(ledState);
            Serial.println(ledBlinkCount);
            ledBlinkCount--; // Giảm số lần đổi trạng thái

            ledBlinkTimeout = millis() + ledTimeInterval; // Tính thời điểm thay đổi trạng thái tiếp theo
        }
    }
}

void setup() {
    pinMode(LED_PIN, OUTPUT); // Cài đặt chân LED_PIN sẽ là chân đầu ra
    ledBlinkCount = 10*2; //Cho LED nhấp nháy 10 lần. Nhân 2 vì 1 lần nhấp nháy sẽ là 2 lần thay đổi trạng thái
}

void loop() {
    blinkLed(); // Mỗi vòng lặp đều chạy hàm blinkLed()
}
```

Mình sẽ viết thêm vài hàm nữa để thao tác với hàm nháy led dễ dàng hơn

Hàm cài đặt giá trị nháy LED. Khi bắt đầu nháy LED thì gọi hàm này để LED bắt đầu nháy.

```C++
void setLedBlink(uint8_t blinkCount, uint32_t timeInterval)
{
    Serial.println(blinkCount);
    if (blinkCount > LED_MAX_BLINK_COUNT) {
        blinkCount = LED_MAX_BLINK_COUNT;
    }

    ledBlinkCount = blinkCount * 2;
    ledTimeInterval = timeInterval;
    Serial.println(ledBlinkCount);
    Serial.println(timeInterval);
}
```

Hàm dừng nháy LED.

```C++
void clearLedBlink()
{
    ledBlinkCount = 0;
    ledState = LED_SIGNAL_OFF;
    digitalWrite(LED_PIN, ledState);
}
```

### Hàm nhận trạng thái nút bấm

Để đọc giá trị của chân `BUTTON_PIN` mình sử dụng hàm `digitalRead(BUTTON_PIN)`. Nhưng có một sự thật là thời gian bắt đầu bấm nút xuống (tầm 0.01 giây), nút sẽ bị rung lắc. Nó sẽ chạm vào tiếp điểm không liên tục (chạm xong nhả, xong lại chạm). Wemos thì đọc giá trị nút bấm rất nhanh nên nó có thể sẽ đọc sai trong khoảng thời gian đầu của việc bấm nút. Như vậy ta cần `delay()` một khoảng thời gian nhất định sau khi nhận tín hiệu lần đầu rồi đọc tín hiệu lần hai. Đây mới là tín hiệu biểu thị chính xác trạng thái của nút bấm.

```C
#define BUTTON_PIN D4
#define BUTTON_SIGNAL_DOWN HIGH
#define BUTTON_SIGNAL_UP LOW
#define BUTTON_DELAY 10

void checkButton()
{
        if (digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_DOWN) {
            delay(BUTTON_DELAY);
            if (digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_DOWN) {
                Serial.println("digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_DOWN");
                // Xử lý khi bấm nút
            }
        }
}
```

Mình phải `checkButton` liên tục vì mình không thế biết được lúc nào người chơi bấm nút. Vì vậy mình phải cho nó vào hàm `loop()`. Nhưng từ từ đã, nếu mình cho hàm kia vào `loop()` thì lúc người dùng đang giữ nút, tức là nút đang có tín hiệu `BUTTON_SIGNAL_DOWN` thì đoạn `Xử lý khi bấm nút` sẽ luôn luôn chạy à. Do đó mình phải cho thêm một biến kiểm tra để cho đoạn xử lý chỉ chạy 1 lần, khi người chơi thả nút thì biến đó sẽ reset lại giá trị.

```
#define BUTTON_PIN D4
#define BUTTON_SIGNAL_DOWN HIGH
#define BUTTON_SIGNAL_UP LOW
#define BUTTON_DELAY 10

uint8_t triggered = 0;

void checkButton()
{
    if (triggered) {
        if (digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_UP) {
            delay(BUTTON_DELAY);
            if (digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_UP) {
                Serial.println("digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_UP");
                triggered = 0;
            }
        }
    } else {
        if (digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_DOWN) {
            delay(BUTTON_DELAY);
            if (digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_DOWN) {
                Serial.println("digitalRead(BUTTON_PIN) == BUTTON_SIGNAL_DOWN");
                 // Xử lý khi bấm nút
                triggered = 1;
            }
        }
    }
}
```

###  Hàm kết nối wifi

Hàm kết nối wifi mình viết đơn giản thôi, các bạn đọc comment để hiểu rõ hơn nhé:

```C++
#define WIFI_TIMES_TRY 20
#define WIFI_CONNECT_DELAY 500

#define WIFI_CONNECT_OK 1
#define WIFI_CONNECT_TIMEOUT 0

int connectWifi(const char* ssid, const char* pass)
{
    Serial.println("[WifiService][connect] Open STA....");
    Serial.print("[WifiService][connect] Wifi connect to: ");
    Serial.println(ssid);
    Serial.print("[WifiService][connect] With pass: ");
    Serial.println(pass);

    // Reset mode, chuyển về mode kết nối wifi và bắt đầu thực hiện kết nối
    WiFi.softAPdisconnect();
    WiFi.disconnect();
    WiFi.mode(WIFI_STA);
    delay(100);
    WiFi.begin(ssid, pass);

    int c = 0;
    Serial.println("Waiting for Wifi to connect");
    // Chờ một khoảng thời gian để kết nối wifi
    // Sau WIFI_TIMES_TRY = 20 lần chờ nếu không kết nối được thì báo timeout
    while (c < WIFI_TIMES_TRY) {
        if (WiFi.status() == WL_CONNECTED) {
            Serial.println("");
            Serial.println("Wifi connected!");
            Serial.print("Local IP: ");
            Serial.println(WiFi.localIP());

            return WIFI_CONNECT_OK;
        }
        delay(WIFI_CONNECT_DELAY);
        Serial.print(".");
        c++;
    }
    Serial.println("");
    Serial.println("Connect timed out");
    return WIFI_CONNECT_TIMEOUT;
}
```

###  Hàm emit, handle sự kiện

Theo kịch bản của hệ thống thì khi ấn nút sẽ gửi lên sự kiện `trigg` và khi thắng sẽ nhận được sự kiện `win`. Ngoài ra còn sự kiện `clear` để server xóa kết quả của lần tranh đấu trước đó. Như vậy sẽ có 3 hàm để thực hiện sự kiện:

```C+++
#include <SocketIOClient.h>

SocketIOClient socket;

// Gửi sự kiện trigg
void emitTrigg() {
    Serial.println("emitTrigg");
    socket.emit("trigg", "1");
}

// Thực hiện nháy đèn khi win
void handleWin(String data) {
    Serial.println("[handleWin] " + data);
    setLedBlink(20, LED_SHORT_TIMEOUT);
}

// Xóa trạng thái nháy đèn khi nhận được sự kiện clear
void handleClear(String data) {
    Serial.println("[handleClear] " + data);
    clearLedBlink();
}
```

### Hàm setup và loop

Hàm setup sẽ chạy 1 lần khi cấp điện cho wemos

```C++
#define SERIAL_BAUD_RATE 115200
#define HOST "192.168.2.13" // Địa chỉ ip của máy chủ
#define PORT 3000 // Cổng lắng nghe của máy chủ

void setup() {
    Serial.begin(SERIAL_BAUD_RATE);
    delay(100);
    Serial.println("\nStart up...");
    pinMode(LED_PIN, OUTPUT);
    pinMode(BUTTON_PIN, INPUT);
    digitalWrite(LED_PIN, LED_SIGNAL_ON);
    delay(500);
    digitalWrite(LED_PIN, LED_SIGNAL_OFF);
    delay(500);

    socket.on("win", handleWin);
    socket.on("clear", handleClear);
    socket.connect(HOST, PORT);
}
```

Hàm loop sẽ chạy lặp đi lặp lại nhiều lần trong quá trình hoạt động của wemos

```C++
#define WIFI_SSID "TenWifi"
#define WIFI_PASS "MatKhauWifi"

void loop() {
    blinkLed();
    checkButton();
    if (WiFi.status() == WL_CONNECTED) {
        socket.monitor();
        return;
    }

    connectWifi(WIFI_SSID, WIFI_PASS);
}
```

Chúng ta đã cùng nhau Lập trình được một thiết bị bấm chuông giành quyền trả lời để phục vụ cho các trò chơi rồi. Qua bài viết này mình hi vọng các bạn sẽ biết thêm được cách xử lý bất đồng bộ trong những thiết bị phần cứng. Bạn có thể tham khảo [chương trình server đầy đủ](https://github.com/HoangHoi/game/tree/server) và [chương trình Wemos đầy đủ](https://github.com/HoangHoi/game/tree/viblo) trên [git của mình](https://github.com/HoangHoi).

# Kết quả đạt được

{@embed: https://www.youtube.com/watch?v=HLoVVO10TWM&feature=youtu.be}

# Kết luận
Bài viết của mình xin kết thúc tại đây. Hi vọng sẽ giúp ích được cho các bạn. Nếu bạn thấy hay thì hãy upvote và chia sẻ cho bạn bè cùng đọc. Đừng quên Follow mình để nhận được thông báo khi mình có bài viết mới nhé. Chúc các bạn có một ngày tốt lành!