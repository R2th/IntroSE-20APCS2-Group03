## Giới thiệu
Xin chào tất cả các bạn. Chắc hẳn các bạn không còn xa lạ gì với trình duyệt web Chrome nữa. Một điều mình rất thích chrome là hỗ trợ rất nhiều extension (Tiện ích mở rộng) như Google translate, Docs, Sheet, AdBlock, ... .Các tiện ích này rất hữu ích cho chúng ta đúng? Nhưng bạn có biết cách để tạo ra extension như thế nào? Trong bài viết này mình sẽ hướng dẫn các bạn làm một extension đơn giản và tương tác giữa extension với website.

## Cách hoạt động
Đầu tiên nãy nói về các khái niệm và mô hình hoạt động của chrome extension nhé.
![](https://images.viblo.asia/06b94e36-9691-45c7-b93c-69e92fe38f23.png)

### 1. Manifest file
Đây là 1 file rất quan trọng  nó dùng để khai báo các quyền mà extension cần ví dụ như tabs, storage, ... 
Khai báo các đường dẫn đến resource (icons, script, UI,...) của extenions.

Đây là ví dụ về file **manifest.json**

```
{
  "name": "demo-extension",
  "description": "A chrome extension",
  "version": "1.0.0",
  "manifest_version": 2,
  "permissions": [ "tabs", "https://www.yoursite.com/*"],
  "icons": { "16": "icons/icon_16.png", "48": "icons/icon_48.png", "128": "icons/icon_128.png" },
  "browser_action": { "default_title": "your title", "default_popup": "popup.html" },
  "background": {
    "scripts": ["background.js"]
  },
  "content_scripts": [{
    "matches": ["https://www.yoursite.com/*"],
    "js": ["content.js"]
  }],
  "options_ui": { "page": "options.html", "chrome_style": true },
  "externally_connectable": {
    "matches": ["https://www.yoursite.com/*"]
  }
}
```

Đối với người mới chỉ cần quan tâm đến các thuộc tính quan trọng sau:
 -   **permissions**: Khai báo các quyền cần sử dụng ví dụ `tabs` dùng để thao tác với các tab đang mở. Hoặc điền url `https://www.yoursite.com/*` để áp dụng quyền với 1 site cố định nào đó thôi. Nếu cần thêm một số quyền khác bạn hãy xem các quyền mà extension có thể có [ở đây](https://developer.chrome.com/apps/permissions)
 -   **default_popup**: Đường dẫn đến popup. Các extensions phải cần có popup để người dùng có thể thao tác với extension.
 -   **background**: Dẫn đến background script. Còn background script mình sẽ nói rõ hơn ở phần dưới
 -   **content_scripts**:  Phần này dùng để inject các script, style vào page được khai báo.
 -   **options_ui**: Cái này có thê có hoặc không. Dùng để hiển thị trang settings của extension.
 -   **externally_connectable**: Dùng để nhận message từ 1 page bất kỳ (không nằm ở popup, content hay options)  gửi đến background (Lưu ý cẩn cẩn thận khi setting mục này).

Bạn có thể xem chi tiết phần config file manifest.json [ở đây](https://developer.chrome.com/extensions/manifest)
    
### 2. Background script
Đây là script chạy ngầm của extension. Nó rất quan trọng, background nhận các message từ content script, popup, options và dựa vào đó để thực hiện các hành dộng phù hợp chẳng hạn update data, đẩy thông báo, ...
   
### 3. Popup
Popup cần thiết không kém background script. Khi chúng ta click vào icon extension ở trên chrome thì sẽ xuất hiện cửa sổ popup này. Nó cung cấp các chức năng để người dùng có thể tương tác giữa extension với tab active.
Ví dụ với extension adblock plus này có các chức năng để loại bỏ các element chứa quảng cáo trên tất cả các trang hoặc 1 số trang chỉ định.

![](https://images.viblo.asia/8e5ca637-462f-43c1-9b13-b6554dec1413.png)

### 4. Content script
Làm sao để có thể trao đổi dữ liệu giữa trang web với background của extentions khi web có thay đổi chẳng hạn như có email mới thì extension gmail sẽ hiển thị số email chưa đọc ở icon.
Hoặc inject các đoạn script (Ví dụ extension: Tampermonkey), style lên các website (Ví dụ extention: dark mode, ...) mỗi khi load trang


### 5. Options
Đây thường là phần dùng để hiển thị các setting cho extentions đó.  Chẳng hạn setting chọn ngôn ngữ, thông báo, ... Phần này có thể có hoặc không tùy vào mục đích của bạn. 

![](https://images.viblo.asia/fc18beca-b580-4bc4-a832-16f4e81961db.png)

## Thực hành làm một extenions
Sau đây mình sẽ làm một ví dụ 1 extension đơn giản.

### manifest.json
```
{
  "name": "demo-extension",
  "description": "A chrome extension",
  "version": "1.0.0",
  "manifest_version": 2,
  "permissions": [ "notifications", "https://www.google.com/*"],
  "icons": { "16": "icons/icon_16.png", "48": "icons/icon_48.png", "128": "icons/icon_128.png" },
  "browser_action": { "default_title": "your title", "default_popup": "popup.html" },
  "background": {
    "scripts": ["background.js"]
  },
  "content_scripts": [{
    "matches": ["https://www.google.com/*"],
    "js": ["content.js"]
  }],
  "options_ui": { "page": "options.html", "chrome_style": true }
}
```

### background.js
```
// recieve message from content, popup, options
chrome.runtime.onMessage.addListener((request, sender) => {
  if (['content', 'popup', 'options'].indexOf(request.from) !== -1) {
    switch(request.subject) {
      case 'SHOW_ALERT': {
        alert(`From ${request.from}: ${request.subject}`);
        break;
      }
      // Handle other message
      default: break;
    }
  }
});
```

### popup.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Popup</title>
</head>
<body>
  <button id="btnNotiFromPopup">Show alert from popup</button>
  <script src="./popup.js"></script>
</body>
</html>
```

### popup.js
```
function showAlert() {
  chrome.runtime.sendMessage(chrome.runtime.id, { from: 'content', subject: 'SHOW_ALERT' });
}
document.getElementById('btnNotiFromPopup').onclick = showAlert;
```

### content.js
```
const button = document.createElement('button');
button.id = 'btnNotiFromContent';
button.innerText = 'Show alert from content';
button.onclick = function () {
  chrome.runtime.sendMessage(chrome.runtime.id, { from: 'content', subject: 'SHOW_ALERT' });
};
document.getElementById('viewport').prepend(button);
```

### options.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Options</title>
</head>
<body>
  <button id="btnNotiFromOptions">Show alert from options</button>
  <script src="./options.js"></script>
</body>
</html>
```

### options.js
```
function showAlert() {
  chrome.runtime.sendMessage(chrome.runtime.id, { from: 'options', subject: 'SHOW_ALERT' });
}
document.getElementById('btnNotiFromOptions').onclick = showAlert;
```

**Lưu ý thêm**:
Nếu như các bạn biết về các framework chẳng hạn angular, react, vue, ... bạn có thể áp dụng vào để viết extention 1 cách nhanh chóng, tiện lợi và dùng webpack để build extention. 

## Kết luận
Trên đây là cách mình đã nói về cách hoạt động và cách làm một chrome extentions đơn giản. Có gì thắc mắc hãy bình luận ngay ở phía dưới để mình giải đáp cho các bạn nhé.
Cám ơn các bạn đã đọc bài viết này của mình. Nếu thấy thì hãy đừng quên bấm upvote để giúp mình có thêm động lực làm các bài biết khác nữa nhé. Tạm biệt các bạn và chúc các bạn một ngày làm việc, học tập thật hiểu quả :))))) Bye bye