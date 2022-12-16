"**Chatwork** là một nền tảng tích hợp tất cả trong một: tính năng chat, chỉ định công việc, gọi thoại/video và chia sẻ tập tin. Chatwork giúp nhân viên dễ dàng làm việc theo nhóm bằng hình thức đối thoại trực tiếp, tăng khả năng tương tác và nâng cao hiệu quả công việc" - Giới thiệu từ trang chủ chatwork :D

![](https://images.viblo.asia/0ada7560-23fb-4185-95fa-6f96a40eb813.jpg)

Thật vậy, chatwork được sử dụng khá rộng rãi, nhất là các công ty IT Nhật. Nó đơn giản, không quá cầu kỳ, không quá hoàn hảo nhưng cũng đủ tính năng để sử dụng cho công việc.

Mình chỉ đang dẫn chuyện chứ không có ý quảng cáo cho chatwork đâu nhé (Chatwork thật sự hơi lởm, lâu lâu đơ như cây cơ, phải tắt tab, mở tab khác mới dùng được :stuck_out_tongue_winking_eye:)

## 1. Thực tế
Mình chưa thử thống kê, nhưng chắc cũng khá nhiều bạn biết, từng sử dụng qua chatwork. "**TO**" là một thuật ngữ ám chỉ việc gửi message đến ai đó và kèm theo thông báo. Và chắc hẳn, nó đã là từ thông dụng nhất trong mỗi cuộc trao đổi, hội thoại: "**Em vừa mới TO cho anh đấy**", "**Em TO cho cả team rồi mà**", "**Em bị lack vì chị có TO em đâu**",...thay vì "**Em vừa mới gửi tin nhắn cho anh đấy**", "**Em gửi tin nhắn cho cả team rồi mà**", "**Em bị lack vì chị có gửi tin nhắn cho em đâu**",...Nghe nó thật khô nhưng chất, ra dáng IT =))

Và cũng từ việc TO ấy, có nhiều vấn đề phát sinh với chatwork, điển hình nếu bạn muốn gửi một message cứ lặp đi lặp lại trong ngày đến một người hoặc một số người nào đó (chẳng hạn: Thông báo deploy source cho team QA, gọi anh em đi ăn trưa,...) thì:
- Tìm đến box chat, gõ gõ gõ, gửi (Gõ mãi một message cũng chán lắm :v)
- Đưa message ra đâu đó (notepad, sublime text,...) để tiện lần sau copy, tìm đến box chat, paste, gửi.
- Dùng code cho ra dáng IT
## 2. Ý tưởng dùng code
Thứ bạn cần chỉ là 1 đoạn script:
```
document.getElementById('_chatText').value = `
[To:2770356] Lam Ngoc Khuong
Trời mưa thì mặc trời mưa :v
(tungtang)
`;
document.getElementById('_sendButton').click();
```

Chatwork dùng ReactJs nên việc tìm các id **_chatText**, **_sendButton** cũng hơi chuối một tý.

![](https://images.viblo.asia/b43b8198-91a8-4db6-8826-ebea8dc457d3.png)

Script là vậy, nhưng không thể lúc nào muốn gửi message thì lại tìm đến đúng box, F12, copy + paste script ấy vào. Nó cũng chả nhanh hơn là mấy so với việc ***"Đưa message ra đâu đó (notepad, sublime text,...) để tiện lần sau copy, tìm đến box chat, paste, gửi"***

Lúc này mình mới nảy ra ý tưởng save lại message ở một nơi nào đó trên trình duyệt (kèm theo link box cụ thể muốn gửi), và sau đó chỉ việc click message để gửi thôi (sẽ xử lý sao đó để tự động thực thi đoạn script trên, không cần F12 + chạy paste script)

Cuối cùng, chrome extension là thứ mà mình cần tìm, mong muốn thi triển ý tưởng trên đó. (tungtang)
## 3. Coding

Đây là phần chính mà mình muốn giới thiệu. Ý tưởng chỉ là màn dạo đầu, coding mới là then chốt của thành phẩm :v: 

Giới thiệu về ý tưởng [Chatwork Fast TO](https://github.com/lamngockhuong/chatwork-fast-to) vẫn chỉ là phụ, cách xây dựng một chrome extension cho newbie (như mình) mới là hơn hết :D

### a. Khởi tạo project
- Tạo một thư mục mới, VD: ***chatwork-fast-to***
- Tạo mới file **manifest.json** tại thư mục gốc project:
```
{
    "manifest_version": 2,
    "name": "Chatwork Fast TO",
    "version": "1.0",
    "default_locale": "en",
    "description": "Chatwork Fast TO",
    "icons": {
        "16": "assets/icon/icon-16.png",
        "32": "assets/icon/icon-32.png",
        "48": "assets/icon/icon-48.png",
        "128": "assets/icon/icon-128.png"
    },
    "permissions": [
        "storage",
        "tabs",
        "activeTab"
    ],
    "browser_action": {
        "default_icon": {
            "16": "assets/icon/icon-16.png",
            "24": "assets/icon/icon-24.png",
            "32": "assets/icon/icon-32.png"
        },
        "default_title": "Chatwork Fast TO",
        "default_popup": "page/popup.html"
    },
    "author": "Lam Ngoc Khuong <me@ngockhuong.com>",
    "background": {
        "scripts": ["assets/js/background.js"],
        "persistent": false
    },
    "options_page": "page/options.html",
    "content_security_policy": "script-src 'self' https://ajax.googleapis.com https://cdnjs.cloudflare.com; object-src 'self'"
}
```

> Mình giới thiệu qua vài thuộc tính chính của file manifest này (Còn nhiều thuộc tính khác nữa, tham khảo chính chủ tại https://developer.chrome.com/apps/manifest bạn nhé):
>
> + **manifest_version**: Có 2 phiên bản: 1 và 2. Version 1 được dùng cho các chrome version cũ, Version 2 dùng cho chrome mới
> + **name**: Cái tên nói lên tất cả. Tên không thể thiếu của một extension
> + **version**: Đánh version cho extension của bạn (Nó được chú thích required trong extension docs)
> + **description**: Mô tả, không bắt buộc
> + **icon**: Mặc dù không bắt buộc, nhưng nên có để tạo điểm nhấn cho extension của bạn nhé
> + **permissions**: Quan trọng cực kỳ, bạn muốn cấp quyền thao tác với những thứ gì trên chrome thì yêu cầu vào đó (Ở đây mình cần dùng ***storage*** là chính)
> + **browser_action**: Định nghĩa và mô tả cho popup page
> 
> (Là cái này bạn nhé)
> ![](https://images.viblo.asia/cfde3e73-a73d-47fb-a573-ad9ed3d893f0.png)
> + **background**: Định nghĩa đường dẫn đến script file của background. Background script là nơi quản lý các event của extension. Nó đóng vai trò là ***event handler***. (Chi tiết mô tả về background script: https://developer.chrome.com/extensions/overview#background_script)
> + **options_page**: Click phải chuột vào extension icon >> Chọn options >> Một html page xuất hiện. Đây là nơi chứa các setting, option của extension
> 
> ![](https://images.viblo.asia/4690f1fb-e9af-48d6-bffa-79dbce065493.png)
> + **content_security_policy**: "Đây là thứ tồn tại duy nhất, những thứ khác có hay không, không quan trọng" =)). Mình cần nhúng các thư viện như jquery, bootstrap,...từ cdn để giảm dung lượng cho extension. Nên cần khai báo ở đây.

### b. Dựng options page
Mình đã khai báo thuộc tính ***options_page*** với url **page/options.html**. Vậy mình sẽ tạo 1 html page ngay tại thư mục **page** bạn nhé. Đây chỉ là một html page đơn giản với table (list messages), form (add/update message).

Và quan trọng hơn hết là một file js để xử lý chính. Đặt tên là **options.js** cho gần gũi nhé :v: 

Bên trong nó là 2 đoạn xử lý chính:
```
// Get messages array từ local storage, được set khi extension install
// Dùng đoạn này ở phần list messages
chrome.storage.local.get(['messages'], (storage) => {
    // Do some things
});
```
```
// Set messages array vào local storage
// Dùng tại phần add/update/delete message và ... (xem tiếp bên dưới nhé)
chrome.storage.local.set(
    {
        messages: this.messages,
    },
    () => {
        var error = chrome.runtime.lastError;
        if (!error) {
            // Set SUCCESS
            // Do some things
        }
    }
);
```
Đoạn `chrome.storage.local.set` cần phải được sử dụng ở một nơi nữa, nếu không list messages được get ra từ local storage sẽ dính lỗi ***undefined*** ngay. Bạn cần thêm đoạn này ở file **background.js** (đã được cấu hình ở file manifest):
```
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set(
        {
            messages: [],
        },
        null
    );
});
```
Mục đích: Khởi tạo messages array trong local storage khi extension được install thành công.

Bạn có thể tham khảo thêm phần xử lý của options ở đây:
+ options.html: https://github.com/lamngockhuong/chatwork-fast-to/blob/master/page/options.html
+ options.js: https://github.com/lamngockhuong/chatwork-fast-to/blob/master/assets/js/options.js

### b. Dựng popup page
Đây là page quan trọng, đóng vai trò then chốt trong ứng dụng của chúng ta. Bạn cần tạo 1 file **popup.html** tại thư mục **page** như đã định nghĩa ở ***browser_action***. (Tương ứng cũng cần file **popup.js** đi kèm)

Tại đây, chúng ta thực hiện các công việc như:
- List ra các message được quản lý ở options page
- Handle click + send message

(+) List messages: Công đoạn này tương tự như list messages tại table bên options page (sử dụng `chrome.storage.local.get` để get messages array từ local storage và hiển thị)

(+) Làm cách nào đó để send đoạn script
```
document.getElementById('_chatText').value = `
[To:2770356] Lam Ngoc Khuong
Trời mưa thì mặc trời mưa :v
(tungtang)
`;
document.getElementById('_sendButton').click();
```
xuống console của tab chatwork hiện tại, khi đó tin nhắn sẽ được gửi đi.

Như vậy, chúng ta sẽ sử dụng `chrome.tabs.executeScript` để thực hiện thi triển một đoạn script, tác động đến chrome tab (chatwork) hiện tại đang mở (Nếu bạn execute script trên trực tiếp, không thông qua chrome.tabs.executeScript thì page chịu tác động sẽ là popup.html nhé)
```
// Load đến chatwork box, nơi mà bạn cần send script
chrome.tabs.executeScript({
    code: `
        window.location.href = '${url}';
    `
});

// Send script đến active tab
chrome.tabs.onUpdated.addListener(function sendMessage(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.url == box) {
        chrome.tabs.onUpdated.removeListener(sendMessage);
        chrome.tabs.executeScript({
            code: `
                document.getElementById('_chatText').value = \`${message}\`;
                document.getElementById('_sendButton').click();
            `
        });
    }
});
```

Nguyên văn phần xử lý của popup:
+ popup.html: https://github.com/lamngockhuong/chatwork-fast-to/blob/master/page/popup.html
+ popup.js: https://github.com/lamngockhuong/chatwork-fast-to/blob/master/assets/js/popup.js
### c. Pack extension

Phần code mới là quan trọng, đây chỉ là thao tác đóng gói extension, ném cho quan khách sử dụng thôi :D

Truy cập: [chrome://extensions/](chrome://extensions/) trên trình duyệt (Hoặc chọn More tools > Extensions) để mở trang quản lý các extension

![](https://images.viblo.asia/73f71206-c6da-4ea1-86c2-ba287f6403ff.png)

Chọn **Pack extension** > Chọn đường dẫn đến thư mục root project ở **Extension root directory** > Nhấn **Pack extension**. OK có ngay 1 file ***chatwork-fast-to.crx*** để gửi cho con tấm con cám dùng thử rồi :D

Hoặc xịn hơn, bạn có thể upload lên [chrome store](https://chrome.google.com/webstore/category/extensions?hl=vi) để mọi người tải về và update một cách tự động nhé ;) (Cơ mà để xác minh account, bạn cần trả 5$ cho extension đầu tiên)

Mình đã pack extention ra để đây, bạn có thể download dùng thử nhé :)
>Download: [chatwork-fast-to.crx](https://github.com/lamngockhuong/chatwork-fast-to/blob/download-extension/chatwork-fast-to.crx?raw=true) (84 KB)

## 4. Thành phẩm

Như vậy mình đã giới thiệu xong ý tưởng xây dựng chrome extension [Chatwork Fast TO](https://github.com/lamngockhuong/chatwork-fast-to/blob/download-extension/chatwork-fast-to.crx?raw=true) cũng như hướng dẫn nhập môn xây dựng simple extension cho newbie (như mình)

Bạn có thể làm thử, thêm ý tưởng, thêm code để quen với những tính năng, docs của chrome extension nhé.

Nếu có thời gian rảnh, có thể cùng mình contribute cho project này: https://github.com/lamngockhuong/chatwork-fast-to

Một vài tấm ảnh nháy hàng trước khi kết thúc bài, cảm ơn bạn đã theo dõi (bow)
![](https://images.viblo.asia/5850cc27-696b-4fc1-ac1a-f2133a0c1f01.png)

![](https://images.viblo.asia/e55b9c45-d3e8-484e-b706-7ca92cc5ba03.png)

Update: Vui lòng không lạm dụng tool để spam tin nhắn ạ (bow) Các sếp sẽ thịt bạn ngay đấy :v