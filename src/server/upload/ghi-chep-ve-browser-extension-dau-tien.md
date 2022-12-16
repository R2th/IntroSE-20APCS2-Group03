## Giới thiệu

Chẳng là mình rất hay dùng [GitHub](https://github.com/), mình có để ý nhỏ về cách GitHub hiển thị commit message như thế này:

-   Hiển thị full commit message nếu message có độ dài <= 72 ký tự
-   Nếu commit message có độ dài > 72 ký tự, GitHub sẽ cắt từ thứ 70 trở đi và thêm ký tự `…`

![](https://images.viblo.asia/7f46bb1c-f0cb-449a-b888-816db9515cdc.png)

![](https://images.viblo.asia/2eaa09c7-3031-4704-8713-007c839b0d8a.png)

![](https://images.viblo.asia/8ee95b85-d56c-493b-9d97-7b4973c192e2.png)

![](https://images.viblo.asia/d9937199-b60c-40e9-902e-87bec97ac0e6.png)

Về cơ bản thì git commit được chia làm 2 phần, title và body (body thì không được hiển thị khi dùng `git log --oneline`). Rule thường hay được áp dụng nhất là 50/72, tức là:

-   Dòng đầu tiên là title, không nên quá 50 ký tự
-   Cách 1 dòng trống
-   Tiếp theo là body, mỗi dòng thuộc body không nên quá 72 ký tự

Cái này chủ yếu là do sở thích và thói quen, cũng như có chút lịch sử liên quan đến màn hình terminal 80 cột, chứ không phải rule cứng nhắc bắt buộc. Các bạn có thể tìm hiểu thêm.

Với mình thì do muốn có một git history đẹp nên mỗi khi merge pull request (squash merge), mình thường phải copy commit message vào vscode để kiểm tra nó bao nhiêu ký tự, nếu dài quá thì sẽ phải hệ thống lại từ ngữ và cắt bớt phần chi tiết xuống body =))

Nên mình có nãy sinh ý định làm extension đếm ký tự, vừa hay để tìm hiểu về nó luôn. Trước hết là một extension đơn giản đã.

À mình dùng Firefox nên bài viết này là mình viết cho Firefox nhé :D do Firefox cũng sử dụng WebExtension API nên việc porting sang Chrome cũng không khó, mình sẽ đề cập ở cuối bài.

![https://www.reddit.com/r/redpandas/comments/i5jn9p/wink/](https://images.viblo.asia/16e1c06b-e92b-44e8-a308-601bdf996d1e.jpg)


## Ví dụ đơn giản

Thử cưỡi ngựa xem hoa trước cho dễ hình dung. Tham khảo tutorial [Your first extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension), nhưng mình thay đổi chức năng một chút đó là làm extension để khi bạn mở Facebook quá 30 phút, extension sẽ thêm border màu đỏ lên trang facebook.com.

Nào bắt đầu.

Để tạo một extension bạn cần có file `manifest.json` để khai báo thông tin về extension cho trình duyệt.

```
mkdir facebook-timing-warn
cd facebook-timing-warn
```

`manifest.json`

```json
{
    "manifest_version": 2,
    "name": "Facebook timing warn",
    "version": "1.0",
    "description": "Adds a red border to facebook.com if you open it for over 30 minutes",
    "content_scripts": [
        {
            "matches": ["https://*.facebook.com/*"],
            "js": ["content-script.js"]
        }
    ]
}
```

-   3 keys đầu tiên: `manifest_version`, `name` và `version` là bắt buộc
-   `description`, `icons` là tuỳ chọn, nhưng nó được khuyến khích thêm vào để hiển thị thêm thông tin và logo icon trong trình quản lý Add-ons Manager

Phần thú vị nhất ở đây đó là `content_scripts`, nó nhằm mục đích chỉ dẫn cho Firefox biết để load file `content-script.js` vào trang web `https://facebook.com` và kể cả các subdomains của nó.

Và file `content-script.js` dùng để tác động lên website facebook.com thông qua DOM API.

```js
document.body.style.borderRight = '10px solid green';

setTimeout(function () {
    document.body.style.borderRight = '10px solid red';
}, 1800000); // 30 minutes
```

Thử load extension:

```
facebook-timing-warn
├── content-script.js
└── manifest.json
```

Mở Firefox và mở địa chỉ `about:debugging`, click "This Firefox" và click "Load Temporary Add-on", sau đó open Folder `facebook-timing-warn`, temporary extension sẽ được giữ cho đến khi bạn khởi động lại Firefox.

Sau khi load extension, kiểm tra facebook.com bạn sẽ thấy nó được apply ngay lập tức.

Nếu extension có thay đổi gì, chúng ta cần "Reload" lại. Để debug bạn có thể dùng "Inspect".

![](https://images.viblo.asia/451b7e44-4529-434e-ad38-69b3ce9d8695.png)

## Cấu trúc extension

Ở trên chúng ta đã tự tay làm được 1 extension rồi, bây giờ tìm hiểu sâu hơn về cấu trúc của nó.

Một extension là một tập hợp các files được đóng gói thành một file zip để phát hành lên ["chợ"](https://addons.mozilla.org/en-US/firefox/extensions/) [extensions](https://chrome.google.com/webstore/category/extensions) để người dùng có thể tải về và cài đặt.

### manifest.json

File duy nhất mà mọi extension cần có đó là file [`manifest.json`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) dùng để khai báo metadata ví dụ như tên, version, các quyền mà extension cần có.

Chỉ có 3 key bắt buộc đó là:

```json
{
    "manifest_version": 2,
    "name": "How many characters",
    "version": "1.0"
}
```

Ngoài ra, manifest còn có thể chứa đường dẫn đến một số loại files:

-   _Background scripts_: File JS để thực hiện các logic chạy ngầm
-   _Content scripts_: File JS để inject trực tiếp vào các trang web
-   _Icons_: Icons để hiển thị đại diện cho extension và các icon khác dùng trong extension
-   _Sidebars, popups, and options pages_: HTML để tạo UI cho sidebar, popup hoặc trang config của extension
-   ...

![](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension/webextension-anatomy.png)

Chi tiết hơn, các bạn xem tài liệu về [`manifest.json`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json), ở đây mình giới thiệu 2 loại thường dùng nhất đó là background scripts và content scripts.

### Background scripts

Nghe tên background scripts chúng ta cũng hình dung được phần nào. Extension thường sẽ cần chạy ngầm (chạy khi mở trình duyệt cho đến khi tắt trình duyệt) mà không phụ thuộc vào bạn mở trang web nào.

Background scripts là để thực hiện việc đó. Nó được load ngay sau khi extension được load và giữ cho đến khi extension bị disabled hoặc uninstalled.

Để khai báo background scripts chúng ta sử dụng key `background` trong file `manifest.json`:

```json
"background": {
    "scripts": [
        "background-script1.js",
        "background-script2.js"
    ]
}
```

Hoặc bạn có thể cấu trúc thư mục riêng từng loại:

```json
"background": {
    "scripts": [
        "background-scripts/featureA.js",
        "background-scripts/featureB.js"
    ]
}
```

Các file background hoạt động độc lập với nhau tương tự như các scripts được load vào một trang web. Thực tế thì background scripts được chạy dưới context của một trang đặc biệt gọi là background page. Hoặc bạn có thể khai báo background page thay cho background script để tận dụng tính năng ES6 modules:

`manifest.json`

```json
"background": {
    "page": "background-page.html"
}
```

`background-page.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <script type="module" src="background-script.js"></script>
    </head>
</html>
```

Bạn có thể sử dụng tất cả WebExtension APIs trong background script, gọi XHR requests đến bất kỳ host nào miễn là extension request quyền và có quyền thực hiện nó.

Background script không support các function `alert`, `confirm` hay `prompt()`, để debug bạn có thể dụng `console.log` và inspect extension ở chế độ debugging.

Ngoài ra background script không thể tác động trực tiếp vào các trang web đang chạy khác, mà phải thông qua content scripts và cơ chế trao đổi message.

### Content scripts

Sử dụng content scripts để tác động lên các trang web đang chạy.

Content scripts được load vào trang web và được chạy dưới context của trang web đó. Do đó nó có thể thấy và tác động vào DOM của trang web, giống với các script bình thường được load bởi trang web bằng thẻ `<script>`.

Tuy nhiên, content scripts có thể làm một số thứ mà normal script không làm được đó là:

-   Tạo cross-domain XHR requests
-   Sử dụng một số WebExtension API
-   Trao đổi message với background script (tương cơ chế event-lister)

## Extension count characters

Quay trở lại với bài toán đầu bài =)) Dưới đây là quá trình mình làm.

### Version 1

Chức năng ở version 1: User bôi đen đoạn text => Click chuột phải => Click menu "Count characters" => Console log ra đoạn text được select và độ dài của nó.

Menu khi click chuột phải thường được gọi là "Context Menu", có keyword rồi search "firefox extension context menu" cái là ra: [Context menu items](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Context_menu_items)

```json
{
    "manifest_version": 2,
    "name": "How many characters",
    "version": "1.0",
    "description": "Count characters from a selected text",
    "icons": {
        "48": "icons/debian_256.png"
    },
    "background": {
        "scripts": [
            "background-scripts/characters-count-menu.js"
        ]
    },
    "permissions": [
        "contextMenus"
    ]
}
```

Tạo menu: `characters-count-menu.js`

```js
browser.contextMenus.create({
    id: 'menu-item-count-characters',
    title: 'Count characters',
    contexts: ['selection'],
});
```

`contexts: ['selection']` ở đây có nghĩa là chỉ hiển thị menu khi có 1 đoạn text đang được bôi đen.

Handle sự kiện click vào menu: `characters-count-menu.js`

```js
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == 'menu-item-count-characters') {
        console.log(info.selectionText, info.selectionText.length);
    }
});
```

Trong sự kiện [menu `onClicked`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/onClicked) chúng ta có thể biết thông tin về menu item được click và data liên quan đến context (ví dụ, context `selection` có data `info.selectionText`) và thông tin về tab nơi mà xảy ra xự kiện.

Load thử và inspect để xem kết quả:

![](https://images.viblo.asia/470668b7-c2af-456a-90b8-4ca49db0d7fe.png)

### Version 2

Do background script hoạt động dưới context của background page nên bạn phải inspect extension mới xem được console log, tất nhiên người dùng thì không thể làm thế chỉ để xem số lượng characters của một đoạn text rồi.

Nên ở version 2 mình sẽ nâng cấp: User bôi đen đoạn text => Click chuột phải => Click menu "Count characters" => Browser tạo thông báo lên màn hình.

Rất may là [WebExtension API `notifications`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications) hỗ trợ điều này.

Để sử dụng API này, extension cần có thêm quyền `notifications`:

```diff
    "permissions": [
        "contextMenus"
+       "notifications"
    ]
```

Tạo notification: `characters-count-menu.js`

```js
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == 'menu-item-count-characters') {
        browser.notifications.create({
            type: 'basic',
            iconUrl: browser.runtime.getURL('icons/icon-48.png'),
            title: info.selectionText.length + ' characters',
            message: info.selectionText,
        });
    }
});
```

Kết quả:

![](https://images.viblo.asia/e5729087-7649-4e0a-87b7-b0f43822be2b.png)

### Version 3

User phải click chuột phải, sau đó click vào menu mới biết được số lượng characters, có vẻ hơi bất tiện.

Nên ở version 3 mình tiếp tục nâng cấp thêm 1 chắc năng là có thể sử dụng phím tắt.

Điều này có thể được thực hiện bằng [WebExtension API `commands`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands).

Để khai báo keyboard shortcut, chúng ta thêm key `commands` vào file `manifest.json`:

```json
    "commands": {
        "command-count-characters": {
            "suggested_key": {
                "default": "Alt+C"
            },
            "description": "Send a 'command-count-characters' event to the extension"
        }
    }
```

Tiếp theo là listen khi command `command-count-characters` được thực hiện qua phím tắt `Alt` + `C`, khai báo trong file background script:

```js
browser.commands.onCommand.addListener(function (command) {
    if (command === 'command-count-characters') {
        console.log('Toggling the feature!');
    }
});
```

Tuy nhiên, có vấn đề phát sinh là làm sao để lấy được đoạn text được bôi đen, vì hàm listener callback chỉ truyền vào 1 tham số là tên command được thực thi?

Rất may là ở trên chúng ta đã nói đến Content scripts và một trong những tính năng của nó đó là "*Trao đổi message với background script (tương cơ chế event-lister)*".

Từ đây chúng ta có thể hình dung ra được luồng hoạt động của nó sẽ như thế này:

- (1) User nhấn tổ hợp phím tắt `Alt` + `C`
- (2) Browser gửi event "command `command-count-characters` vừa được thực hiện" đến background script
- (3) Background script gửi message cho content scripts "ê, gửi cho tui đoạn text cần đếm"
- (4) Content script lấy ra đoạn text được bôi đen và gửi lại cho background script "đây nhá *'ai mang cho tôi một đoá quỳnh, hỏi có bao nhiêu chữ??? - ô*'"
- (5) Background script lấy được đoạn text, chẳng hiểu đoạn text kia nghĩa là gì, chỉ việc đếm và tạo notification

Ở bước (3), có một bài toán nữa là background script cần biết tab nào đang active để chỉ gửi message đến riêng mình tab đó, không gửi cho nhiều người!!

Nhờ có google và tài liệu trên MDN, cộng thêm một bộ rất nhiều [examples về webextensions](https://github.com/mdn/webextensions-examples), mà mọi thứ trở nên thật dễ dàng.

Đầu tiên là handle command trong background script để gửi message đến content script, sử dùng API [`browser.tabs.query`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query) để lấy ra id của active tab và API [browser.tabs.sendMessage](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage) để gửi message: `characters-count-command.js`

```js
browser.commands.onCommand.addListener((command) => {
    if (command === 'command-count-characters') {
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                browser.tabs.sendMessage(tab.id, { type: 'COUNT_CHARACTERS' });
            });
    }
});
```

Khai báo content script, phạm vi tất cả các trang web: `manifest.json`

```json
    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ],
            "js": [
                "content-scripts/get-selected-text.js"
            ]
        }
    ]
```

Lấy ra đoạn text được bôi đen bằng content script và gửi lại cho background script bằng việc return `Promise` object: `get-selected-text.js`

```js
browser.runtime.onMessage.addListener((request) => {
    if (request.type === 'COUNT_CHARACTERS') {
        var activeElement = document.activeElement;
        var inputs = ['input', 'textarea'];

        // Firefox không lấy được selection trong <input> và <textarea> nên phải thông qua `document.activeElement`
        let selection = '';
        if (activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1) {
            selection = activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd);
        } else {
            selection = window.getSelection().toString();
        }

        return Promise.resolve({ selectionText: selection });
    }
});
```

Background script wait Promise từ content script để lấy ra hồi âm: `characters-count-command.js`

```js
browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => browser.tabs.get(tabs[0].id))
    .then((tab) => {
        browser.tabs.sendMessage(tab.id, { type: 'COUNT_CHARACTERS' })
            .then((response) => {
                browser.notifications.create({
                    type: 'basic',
                    iconUrl: browser.runtime.getURL('icons/icon-48.png'),
                    title: response.selectionText.length + ' characters',
                    message: response.selectionText,
                });
            });
    });
```

Ok, vậy là hoàn thành. Phần này có thể cải tiến thêm đó là tạo một trang extension option page để user có thể config phím tắt, tuy nhiên [trình duyệt đã có sẵn tính năng này](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands#updating_shortcuts) nên mình không làm nữa.

> Users can also update shortcuts via the "Manage Extension Shortcuts" option at about:addons in Firefox, as shown in this video. In Chrome, users can change shortcuts at chrome://extensions/shortcuts.

Các bạn có thể tham khảo thêm [example trên github](https://github.com/mdn/webextensions-examples/tree/master/commands).

### i18n

Trước khi đóng gói, chúng ta có thể làm cho extensions perfect hơn bằng cách support đa ngôn ngữ.

Các bước thực hiện cũng rất đơn giản.

Đầu tiên là thêm folder `_locales`, cấu trúc thư mục nó sẽ như thế này:

```
_locales
├── en
│   └── messages.json
└── vi
    └── messages.json
```

Sau đó khai báo `default_locale` trong file `manifest.json`, key này là bắt buộc nếu extension có folder `_locales`:

```json
    "default_locale": "en"
```

Nội dung của file `messages.json`:

```json
{
    "extensionName": {
        "message": "How many characters",
        "description": "Name of the extension"
    },
    "extensionDescription": {
        "message": "Count characters from a selected text",
        "description": "Description of the extension"
    },
    "countCharacters": {
        "message": "Count characters",
        "description": "Label for context menu"
    },
    "characters": {
        "message": "characters",
        "description": "Label for 'characters'"
    }
}
```

Sử dụng trong file `manifest.json` theo cú pháp:

```json
    "name": "__MSG_extensionName__",
    "description": "__MSG_extensionDescription__",
```

Sử dụng trong file JS thông qua [i18n API `browser.i18n.getMessage()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/i18n):

```js
browser.contextMenus.create({
    id: 'menu-item-count-characters',
    title: browser.i18n.getMessage('countCharacters'),
    contexts: ['selection'],
});
```

![](https://images.viblo.asia/db066abb-f969-4bb9-afa2-9dff15b58d2d.png)

Trên đây là ví dụ đơn giản về i18n, chi tiết hơn bạn xem document trên MDN: [Internationalization](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization).

### webext

Ngoài cách chạy thủ công bằng cách "Load temporary Add-on", Firefox cung cấp 1 [`web-ext`](https://github.com/mozilla/web-ext) command line tool để chạy.

Cài đặt:
```
npm install -g web-ext
```

Chạy extension bằng cách `cd` đến thư mục extension và chạy câu lệnh:

```
$ web-ext run
Running web extension from /home/ubuntu/Projects/browser-ex-count-characters
Use --verbose or open Tools > Web Developer > Browser Console to see logging
Installed /home/ubuntu/Projects/browser-ex-count-characters as a temporary add-on
The extension will reload if any source file changes
Press R to reload (and Ctrl-C to quit)
```

Khi chạy lệnh này, extension sẽ được auto reload khi source code thay đổi.

Ngoài ra tool này còn được dùng để đóng gói, kiểm tra extension trước khi publish.

### Đóng gói

Trước khi đóng gói, bạn hãy review lại 1 lượt, sau đó dùng tool để lint:

```
web-ext lint
```

Đóng gói:

```
web-ext build
```

Hoặc nếu có file nào không cần thiết, bạn có thể exclude (mặc định folder `.git`) sẽ được ignore:

```
web-ext build --ignore-files screenshots/
```

Mặc định command sẽ tạo ra file zip, sẵn sàng dùng để submit lên chợ: `web-ext-artifacts/how_many_characters-1.0.zip`

### Submit lên chợ

Việc [submit lên chợ extensions](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/) cũng khá dễ dàng, miễn phí, chỉ cần có tài khoản trên trang [https://addons.mozilla.org/en-US/firefox/](https://addons.mozilla.org/en-US/firefox/).

> Cập nhật 2021-08-09: Mình submit extension lên được 1 ngày thì được approved, chắc tại extension đơn giản nên được duyệt nhanh
>
> [https://addons.mozilla.org/en-US/firefox/addon/how-many-characters/](https://addons.mozilla.org/en-US/firefox/addon/how-many-characters/)

Có một số lưu ý:

- Bạn nên mô tả extension một cách rõ ràng, đầy đủ và dễ hiểu niết
- Kiểm tra lại `permissions` trong `manifest.json` xem có cái nào không cần thiết
- Nên có icon để nhận dạng
- Thiết lập `homepage_url` trong `manifest.json`, có thể là link đến github cũng được, để dễ được tin tưởng hơn
- Nếu extension có sử dụng các tool minify source code hay webpack thì lúc submit cần submit cả source code

Mình đã thử submit và đang chờ review. Mozilla có thông báo là đợt này đang nhiều extensions được submit nên phải đợi 3-4 tuần.

### Support Chrome

Mình có thử bê nguyên extension này lên Chrome để thử xem nó có chạy được không, kết quả là:

![](https://images.viblo.asia/594c4966-6287-4d23-bc1a-45dbba5147c1.png)

Mặc dù cùng sử dụng WebExtension API nhưng Firefox thì dùng [namespace là `browser` để access API, còn namespace của Chrome là `chrome`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API#browser_api_differences), và còn [những sự khác biệt khác](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities) nữa.

Cách đơn giản nhất là sử dụng [webextension-polyfill](https://github.com/mozilla/webextension-polyfill), một thư viện cho phép sử dụng namespace `browser` cho Chrome WebExtension API.

Tải về và add vào `manifest.json`, nếu bạn sử dụng API `browser.` trong background scripts thì bạn phải thêm vào key `background`, nếu bạn sử dụng ở content scripts thì cần thêm vào key `content_scripts`:

```diff
    "background": {
        "scripts": [
+           "browser-polyfill.js",
            "background-scripts/characters-count-menu.js",
        ]
    },
    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ],
            "js": [
+               "browser-polyfill.js",
                "content-scripts/get-selected-text.js"
            ]
        }
    ],
```

Reload extension :D

Firefox:

![](https://images.viblo.asia/5b139109-5291-4632-96f3-c4227f8b00b1.png)

Chrome:

![](https://images.viblo.asia/083f7b70-8cf8-4d04-a590-1b115109b962.png)

Như vậy là đã hoàn thành. Mã nguồn tham khảo mình để ở đây: [https://github.com/it-4-life/web-ext-characters-count](https://github.com/it-4-life/web-ext-characters-count)

Extension trên Firefox add-ons: [https://addons.mozilla.org/en-US/firefox/addon/how-many-characters/](https://addons.mozilla.org/en-US/firefox/addon/how-many-characters/)

> Cập nhật 2021-08-11: Extension có thể được dùng để đếm nhanh số ký tự khi validate min / max length của một ô input. Tính năng được phát hiện sau khi mình mang sản phẩm đi demo nhằm mục đích câu like =)) 
>
> Cảm ơn nhận xét rất có tâm của một người bạn (bow)

> Cập nhật 2021-08-21: [Extension đã được published trên Chrome](https://chrome.google.com/webstore/detail/how-many-characters/hnhmgniogpkaanhebibdlnnhnehlifck). Mình request lên Chrome Web Store vào 2021-08-14, đến ngày 15 thì bị reject và sau đó mình submit lại thì đến ngày 17 đã được approve.
>
> Chrome làm chặt hơn khi approve, mình sẽ nói trong bài tiếp theo. 

Cảm ơn các bạn đã đọc đến đây, hy vọng bài viết mang lại được một chút thông tin hữu ích nào đó : D

> P/S: Red Panda hay còn gọi là Firefox rất cute, mọi người hãy tải Firefox và trải nghiệm (go)
> {@youtube: https://www.youtube.com/watch?v=ajbt3-YyE4s}

## Tham khảo

- [MDN WebExtensions Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Firefox Extension Workshop](https://extensionworkshop.com/)
- [webextensions-examples](https://github.com/mdn/webextensions-examples)

Source code:

|Trình duyệt|Mã nguồn|
|---|---|
|[Firefox](https://addons.mozilla.org/en-US/firefox/addon/how-many-characters)|[https://github.com/it-4-life/web-ext-characters-count](https://github.com/it-4-life/web-ext-characters-count)|
|[Chrome](https://chrome.google.com/webstore/detail/how-many-characters/hnhmgniogpkaanhebibdlnnhnehlifck)|https://github.com/it-4-life/web-ext-characters-count/tree/chrome-mv2|