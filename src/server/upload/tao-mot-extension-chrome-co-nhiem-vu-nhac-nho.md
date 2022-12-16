# Giới thiệu

Mục đích là viết thử extension trên chrome nó có nhiệm vụ hiển thị popup nhắc nhở viết đúng formmat commit khi gửi pull trong github, dành cho những member "đãng trí" :v. Bây giờ chúng ta cùng bắt đầu nào!

# Code
 

##  Trước tiên ta tạo file manifest.json
 
 ```json
 {
  "name": "Popup",
  "description": "Popup reminder",
  "version": "1.0",
  "browser_action": {
     "default_icon": "reminder.png"
  },
  "permissions": [
    "tabs"
  ],
  "content_scripts": [
    {
      "matches": ["*://*/*"],
      "css": ["app.css"],
      "js": ["index.js"]
    }
  ],
  "manifest_version": 2
}
 ```
 Trong đó:
 
 **name**: Đây là tên của extension.
 
**description**: Mô tả cho extension.

**version**: Phiên bản của extenssion.

**browser_action**: Dùng để tùy chỉnh icon, popup, tooltip, bài này mình chỉ sử dụng icon.. xem thêm [Browser Action](https://developer.chrome.com/extensions/browserAction)

**permissions**: liệt kê các quyền mà extension của bạn muốn sử dụng, khai báo các url website mà muốn nó chạy và các quyền. xem thêm [permissions](https://developer.chrome.com/extensions/permissions)

**manifest_version**: là version chrome extension bạn sử dụng (hiện nay là version 2). bạn có thể xem ở đây  [manifest_version](https://developer.chrome.com/extensions/manifest/manifest_version)

**content_scripts**: dùng để liệt kê các file sẽ được inject vào trình duyệt chrome, khi vào các trang web phù hợp với các địa chỉ được khai báo trong matches, như ở đây là all page. [Content Scripts](https://developer.chrome.com/extensions/content_scripts)

## Tạo file **index.js**

```
var str= `<div id="extensionsReminder" class="overlay"> <div class="popup"> <h2>Reminder</h2> <div id="extensionsClose" class="close">&times;</div> <div class="content"> Check format commit <br/> [Task #tickedNo][API|UT] description task </div> </div> </div>`;

document.body.appendChild(htmlToElement(str))

if(/https:\/\/github.com(.*compare)/i.test(location.href)
  || /https:\/\/github.com(.*pull)/i.test(location.href)){
  document.getElementById('extensionsReminder').classList.add('target')
}else{
  document.getElementById('extensionsReminder').classList.remove('target')
}

document.getElementById('extensionsClose').addEventListener('click', function(){
  document.getElementById('extensionsReminder').classList.remove('target')
});

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

```

`/https:\/\/github.com(.*compare)/` đây là đoạn regex check nếu đang ở page github và url có chứa `compare` or `pull` thì chúng ta show popup 

`htmlToElement` function để tạo html element từ chuỗi string

follow đơn giản là vào page tạo popup ở trạng thái ẩn check url đúng điều kiện thì cho hiển thị

## Tạo file app.css

tạo file css để style cho popup:

```
body {
  font-family: Arial, sans-serif;
  height: 100vh;
}

h1 {
  text-align: center;
  font-family: Tahoma, Arial, sans-serif;
  color: #06D85F;
  margin: 80px 0;
}

.box {
  width: 40%;
  margin: 0 auto;
  background: rgba(255,255,255,0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
  z-index: 99999;
}
.overlay.target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}
.popup .close:hover {
  color: #06D85F;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px){
  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }
}
```

# Cài đặt
Như vậy là đủ để extension của chúng ta hoạt động rồi. Để cài đặt chúng ta có thể nhập url `chrome://extensions/` trên thanh địa chỉ của Chrome, bật `Chế độ dành cho nhà phát triển`, sau đó chọn `Tải tiện ích đã giải nén`. Tiếp theo là chọn thư mục chứa code và nhấn nút Ok thôi nào. 

# Tổng kết

vì github được viết theo kiểu SPA chúng ta nên detect khi url có sự thay đổi thì show popup

một cách đó là dùng setInterval() để check

**Source**:  https://github.com/trangianhuan/reminder
Demo khi vào trang github:

bạn để ý extension mình sau khi cài là icon hình chiếc chuông màu vàng nhỏ trên thanh địa chỉ đấy :v: 
![](https://images.viblo.asia/e8c89dbc-81a0-4b8c-ad0d-d0c5ccbaf811.png)