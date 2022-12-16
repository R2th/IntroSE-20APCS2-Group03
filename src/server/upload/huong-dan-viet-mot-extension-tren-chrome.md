# Tạo một extension cơ bản

Phần này mình sẽ hướng dẫn bạn thêm một extension cơ bản vào Chrome.
Bắt đầu với việc tạo một thư mục  `Hello Extensions` để chứa các file cho extension, tiếp theo các bạn tạo một file tên là `manifest.json` và thêm đoạn code sau:
```json
  {
    "name": "Hello Extensions",
    "description" : "Base Level Extension",
    "version": "1.0",
    "manifest_version": 2
  }
```
Tiếp theo bạn cần thêm extension vừa tạo vào Chrome:
1. Mở trang quản lý extension qua đường dẫn `chrome://extensions`.
    - Hoặc bạn có thể chọn trên chrome menu
    ![](https://images.viblo.asia/fcc304c8-7d7f-42ef-a84e-3dbd2bc3962b.png)

2. Bật chế độ Developer.
    ![](https://images.viblo.asia/31a362b3-e2b5-4ad0-ad63-decdd48b3129.png)

3. Click vào LOAD UNPACKED và chọn thư mục `Hello Extensions`.
    ![](https://images.viblo.asia/c261d569-8360-43ce-b9dc-311e4a58b75a.png)

    Giờ bạn có thể nhìn thấy extension của mình trên thanh menu
    ![](https://images.viblo.asia/e6d1fb1b-ff26-41dc-a663-5b47af43bd1d.png)

# Các thành phần chính
Một extension có thể có hoặc không một số phần chính sau:


| Thành phần | Mô tả |
| -------- | -------- |
| File manifest.json | Với file này bạn có thể cung cấp các thông tin về extension của bạn, version, name, icon, các quyền cần thiết, ... |
| Background script | Đây là file bạn xử lý các sự kiện của trình duyệt: load extensions, nhận message từ content script hoặc extension khác, ... |
|UI Elements|Là phần giao diện tương tác với người dùng của extension, nó có thể là context trên trang web, hộp tìm kiếm trên thanh menu, hoặc phím tắt, ... thường là một popup hiện ra khi bạn bấm vào Icon của extension trên Chrome menu|
|Content script| Là những đoạn mã sẽ chạy trên trang web mà bạn đang xem |

## Background script

Giờ với ví dụ `Hello Extensions` ở trên bạn hãy thêm đoạn code sau vào file `manifest.json`:
```json
"background": {
    "scripts": ["background.js"],
    "persistent": false
  }
```
Bạn hãy tạo thêm file `background.js`:
```js
chrome.runtime.onInstalled.addListener(function() {
  alert('Hello Extensions');
});
```
Giờ khi ngay khi cài đặt extensions, sẽ có một alert thông báo hiện ra. Đây là một ví dụ đơn giản về background script giúp bạn dễ hình dung.

## UI Elements

Mình sẽ lấy ví dụ đơn giản là một popup sẽ hiện ra khi bạn bấm vào Icon của Extension trên Chrome menu. 

Trong file manifest.json bạn thêm đoạn code sau:
```json
  "browser_action": {
    "default_popup": "popup.html"
  }
```

Giờ trong file `popup.html`:
```html
<html>
  <head>
    <title>Stone Block</title>
  </head>
  <body>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/xCkcSL3zfJk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </body>
</html>
```

Load lại extension:
![](https://images.viblo.asia/1817d623-d004-4879-8a02-1430b3609a55.png)

Vậy là mình có cái extension bấm vào thì sẽ hiện một video OST của phim Itaewon Class :v

## Content script

Đầu tiên bạn cần biết content script có thể chạy trên trang web bạn đang xem nghĩa là bạn có thể thao tác với DOM, gọi các Web API, ... như các script thông thường tuy nhiên content script chạy trên một môi trường độc lập với các script trên trang web chính, nghĩa là nếu bạn trên trang web của bạn có một thư viện JS như Jquery bạn sẽ không thể sử dụng nó trong content script.

Giờ chúng ta đến với ví dụ, bạn thêm đoạn code sau vào file `manifest.json`:

```json
"content_scripts": [
    {
      "matches": ["*://*/*"],
      "js": ["contentScript.js"]
    }
  ]
```

Và trong file `contentScript.js`: 
```js
var div = document.createElement('div');
div.style = "position: fixed; bottom: 0; right: 0; z-index:9999";
div.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/xCkcSL3zfJk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

document.body.appendChild(div);
```
Load lại extension:

![](https://images.viblo.asia/797afcf9-a743-4af7-bef5-76619dc32d1d.png)


Mình cũng chả biết gọi cái này là gì, nhưng giờ khi mở trang web nào mình cũng xem được cái video OST trên :)

Mình nghĩ là nên làm thêm nút bấm tắt nó đi.

# Kết bài
Hy vọng qua bài viết bạn đã hiểu được cách viết một extension cơ bản như thế nào. Còn để có thể viết được một Extension tuyệt vời như thế nào là tùy ở bạn rồi, chúc bạn vui vẻ với extension của mình. 

# Tham khảo
https://developer.chrome.com/extensions