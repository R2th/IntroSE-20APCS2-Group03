Xin chào các bạn! Mình đã quay trở lại rồi đây.

Như các bạn đã biết thì khi lập trình cho một phần cứng nào đó ta cần phải nạp chương trình vào cho nó thì nó mới hoạt động được. Mỗi lần sửa một dòng hay chỉ là 1 biến thì ta đều phải biên dịch lại và nạp code cho em nó. Việc nạp phần mềm như thế này ta cần phải cắm trực tiếp thiết bị vào máy tính qua cổng usb. Thật là bất tiện phải không!

Giả sử bạn bán một thiết bị ra ngoài thị trường (bể cá thông minh chẳng hạn). Có 1000 người mua sản phẩm đó để sử dụng trong nhà. Bạn muốn nâng cấp phần mềm cho thiết bị đó chạy mượt mà hơn hoặc là bạn muốn thêm 1 tính năng cho nó thì sao. Bạn không thể vào từng nhà để nạp lại code được. Việc đó là không thể và cũng chẳng vui tý nào.

Thật may mắn, em wemos bé nhỏ của chúng ta có một tính năng rất hay đó là nạp phần mềm (firmware) qua mạng. Tính năng này được gọi là OTA (Over the Air) giúp bạn có thể nạp phần mềm cho nó bất cứ lúc nào, bất cứ khi nào và bất cứ nơi nào có mạng. Hôm nay chúng ta cùng đi tìm hiểu chức năng đặc biệt này nhé.

# Cơ chế hoạt động
Quá trình update firmware sẽ diễn ra như sau:

- **Sketch mới** sẽ được chứa trong dung lượng trống giữa **sketch cũ** và **spiff**. Spiff là bộ nhớ để lưu các file trong hệ thống tập tin (Filesystem).
- Trong lần khởi động lại tiếp theo thì `eboot` bootloader kiểm tra các câu lệnh.
- **Sketch mới** sẽ được copy ghi lên **sketch cũ**
- **Sketch mới** bắt đầu được chạy.

![](https://images.viblo.asia/f5c36fe3-c97a-4520-8857-78f312f39c3f.png)

**Yêu cầu:**

- Bộ nhớ Flash phải có đủ dung lượng để lưu cả sketch cũ (đang vận hành trên hệ thống) và sketch mới (cập nhật OTA).

# Các phương pháp OTA
Có 3 phương pháp để nạp Sketch mới cho ESP8266:
- Sử dụng [Arduino IDE](https://github.com/esp8266/Arduino/tree/master/doc/ota_updates#arduino-ide)
- Sử dụng [Web Browser](https://github.com/esp8266/Arduino/tree/master/doc/ota_updates#web-browser)
- Sử dụng [HTTP Server](https://github.com/esp8266/Arduino/tree/master/doc/ota_updates#http-server)

Các bạn có thể xem chi tiết tại [đây](https://github.com/esp8266/Arduino/tree/master/doc/ota_updates).

Mình sẽ giải thích một chút:
- Phương pháp sử dụng Arduino IDE để update firmware thì khi nạp Sketch mới cho Wemos thì cần phải sử dụng phần mềm Arduino IDE để nạp. Nó không được linh động cho lắm và chỉ nên dùng khi đang phát triển phần mềm thôi.
- Sử dụng Web Browser là phương pháp dùng Wemos làm server sau đó mình truy cập vào ip của Wemos upload file `Sketch` mới lên và Wemos sẽ tự động nạp vào bộ nhớ flash của nó.
- Phương pháp HTTP Server là phương pháp lập trình cho Wemos của chúng ta tự tải file `Sketch` mới về và tự nạp vào bộ nhớ của nó.

Chúng ta sẽ sử dụng phương pháp thứ 3 để áp dụng vào project của mình. Bây giờ cùng thực hiện thôi.
# Thiết kế chương trình
Sơ đồ hệ thống:

![](https://images.viblo.asia/577142ef-932a-461e-a8eb-18101f59dd20.png)

- **Người dùng** sẽ up `Sketch` lên server và nhận được link file `Sketch` trên server.
- **Người dùng** sử dụng socket io gửi sự kiện `update_firmware` kèm link file `Sketch mới` cho **Device** và yêu cầu **Device** nạp file này vào bộ nhớ của nó.
- **Device** thực hiện tải file `Sketch mới` về và nạp vào bộ nhớ của  nó. Sau khi nạp chương trình xong nó sẽ khởi động lại. Kết nối lại socket và emit sự kiện `firmware_updated` cho server thông báo là nó đã nạp xong firmware.

# Lập trình server
Phần này server mình sẽ dùng nodejs với thư viện express và multer để upload file. Tất nhiên không thể thiếu socket.io rồi.

```nodejs
let express = require('express');
let multer  = require('multer');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = 3000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Cài đặt thư mục lưu firmwares.
// Tên firmware sẽ được thêm biến thời gian vào đầu để không bị trùng tên.
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/firmwares');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({storage: storage});

app.use(express.static(__dirname + '/public'));

// Khi nhận được post request upload firmware.
// File firmware đó sẽ được lưu trong thư mục mình đã cài đặt ở trên.
// Và mình sẽ phải trả về chính xác URL của file đã upload.
app.post('/firmware', upload.single('firmware'), (req, res, next) => {
    console.log(req.file);
    let fileUrl = '';
    if (req.file) {
        fileUrl = 'firmwares/' + req.file.filename;
    }

    res.status(200);
    res.json({'file_url': fileUrl});
});

io.on('connection', (socket) => {
    // lắng nghe sự kiện join_room để biết được socket đó là của device hay user.
    // Device sẽ join và room devices và user sẽ join vào room users
    socket.on('join_room', (data) => {
        socket.join(data, () => {
            let rooms = Object.keys(socket.rooms);
            console.log(rooms); // [ <socket.id>, 'room 237' ]
        });
    });

    // Khi có sự kiện update_firmware thì sẽ emit sự kiện update_firmware vào room devices với data là url nhận được.
    socket.on('update_firmware', (data) => {
        io.to('devices').emit('update_firmware', data.firmware_url);
    });
});

```

# Lập trình user client

Mình sẽ tạo 1 form để upload file:
```html
<div class="col-md-4 col-md-offset-2">
    <h2 class="title">Upload firmware</h2>
    <div class="form-group">
        <input type="file" class="form-control" id="firmware" name="firmware">
    </div>
    <button class="btn btn-primary" id="upload">Upload</button>
</div>
```

Và một danh sách để lưu các file đã upload thành công:

```html
<div class="col-md-4">
    <h2 class="title">Firmwares list</h2>
    <ul class="list-group" id="firmwares">
    </ul>
</div>
```

Khi người dùng click vào nút upload thì sẽ nhận được url của file. Mình sẽ thêm phần tử đó vào **Firmwares list**

```javascript
$('#upload').on('click', () => {
    let firmware = document.querySelector('#firmware');
    let data = new FormData();
    data.append('firmware', firmware.files['0']);

    $.ajax({
        url: '/firmware',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: (data, textStatus, jqXHR) => {
            if (data.file_url) {
                let newItem = `<li class="list-group-item" data-url="${data.file_url}">
                    ${data.file_url} <a href="${data.file_url}">
                    <i class="fa fa-download" aria-hidden="true"></i></a></li>`;
                $('#firmwares').append(newItem);
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.log('ERRORS: ' + textStatus);
        }
    });
});
```

Và khi người dùng bấm vào phần tử trong firmware list thì mình sẽ emit sự kiện `upload_firmware`

```javascript
$('#firmwares').on('click', '.list-group-item', (event) => {
    let firmwareUrl = $(event.target).data('url');
    console.log(firmwareUrl);
    socket.emit('update_firmware', {firmware_url: firmwareUrl});
});

```

Đừng quên join room nhé

```javascript
socket.on('connect', () => {
    console.log('connect');
    socket.emit('join_room', 'users');
});
```

Chương trình đầy đủ bạn có thể tham khảo tại [đây](https://github.com/HoangHoi/viblo-be-ca-5);

# Lập trình device client
Ta vẫn sử dụng thư viện socketIOClient để tạo kết nối socket.

Hàm `updateFirmware` sẽ được viết như sau:

```C/C++
void updateFirmware(String firmwareUrl) {
    t_httpUpdate_return ret = ESPhttpUpdate.update(HOST, PORT, firmwareUrl);

    switch(ret) {
        case HTTP_UPDATE_FAILED:
            Serial.println("[update] Update failed.");
            break;
        case HTTP_UPDATE_NO_UPDATES:
            Serial.println("[update] Update no Update.");
            break;
        case HTTP_UPDATE_OK:
            Serial.println("[update] Update ok."); // may not called we reboot the ESP
            break;
    }
}
```

Ta chỉ cần sử dụng hàm ESPhttpUpdate.update(HOST, PORT, firmwareUrl); trong thư viện `ESP8266httpUpdate` là update được firmware. Thật đơn giản phải không.

Mỗi khi nhận được sự kiện `update_firmware` từ server thì ta chạy hàm update này `socket.on("update_firmware", updateFirmware);`.

Các bạn đừng quên join room nhé: `socket.emit("join_room", "devices");`

Chương trình đầy đủ cho wemos sẽ như sau:

```C/C++
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>
#include <SocketIOClient.h>

#define DATA_BUFFER_LEN 1024
#define HOST "server.vn"
#define PORT 3000

const char* ssid = "wifiname";
const char* password = "wifipassword";

SocketIOClient socket;

void setupNetwork() {
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void updateFirmware(String firmwareUrl) {
    t_httpUpdate_return ret = ESPhttpUpdate.update(HOST, PORT, firmwareUrl);

    switch(ret) {
        case HTTP_UPDATE_FAILED:
            Serial.println("[update] Update failed.");
            break;
        case HTTP_UPDATE_NO_UPDATES:
            Serial.println("[update] Update no Update.");
            break;
        case HTTP_UPDATE_OK:
            Serial.println("[update] Update ok."); // may not called we reboot the ESP
            break;
    }
}

void setup() {
    Serial.begin(115200);
    setupNetwork();

    socket.on("update_firmware", updateFirmware);
    socket.connect(HOST, PORT);
    socket.emit("join_room", "devices");
}

void loop() {
    socket.monitor();
}

```

# Lưu ý

- Khi trước khi quá trình cập nhật phần mềm được bắt đầu thì bạn phải tắt hoặc thực hiện hoàn tất hết tất cả các tác vụ đang hoạt động. Ví dụ như Wemos đang cho cá ăn chẳng hạn thì bạn nên viết thêm đoạn code chờ cho quá trình cho quá ăn hoàn tất rồi mới bắt đầu update.
- Bộ nhớ Flash phải có đủ dung lượng để lưu cả sketch cũ (đang vận hành trên hệ thống) và sketch mới (cập nhật OTA). Giả sử wemos có bộ nhớ là **4MB** thì bạn chỉ có **2MB** để viết chương trình cho nó thôi.
- Chỉ sử dụng socket.io phiên bản 1.7.4 dùng phiên bản cao hơn là không chạy được đâu.
- Nhớ để lệnh `socket.monitor();` vào trong hàm `loop` nhé.


# Các hàm cơ bản
- `ESP.getFreeSketchSpace()` kiểm tra dung lượng trống cho sketch mới.
- `ESPhttpUpdate.update("http://server/file.bin")` update firmware trả về kết quả HTTP_UPDATE_FAILED hoặc HTTP_UPDATE_NO_UPDATES hoặc HTTP_UPDATE_OK

# Kết luận
Vậy là mình cùng các bạn đã tìm hiểu xong việc OTA cho wemos nhỏ bé rồi.

Nếu có bất kì thắc mắc hay khó khăn gì thì hãy comment hoặc đặt câu hỏi ở phía dưới nhé.

Chúc các bạn thành công!

# Tài liệu tham khảo
- https://github.com/esp8266/Arduino/tree/master/doc/ota_updates
- https://arduino.esp8266.vn/network/ota.html