## Introduction
**JavaScript Notifications API** cho phép trình duyệt hiển thị messages cho user trên Desktop thông qua các nền tảng khác nhau. Những messages này hiển thị ngay cả khi user chuyển sang tab khác hoặc sang một ứng dụng khác. Những messages này (cũng được gọi là **desktop notification**) thường được sử dụng để thông báo cho user biết khi một event quan trọng nào đó vừa xảy ra: new email, new social media messages, reminders..

Trong bài viết này chúng ta cùng demo thử cách hoạt động cơ bản của Notifications API này.
## Implement
Có một số trình duyệt cũ có thể sẽ không support  **JavaScript Notifications API**, vì thế nên việc cần làm đầu tiên là check xem trình duyệt hiện tại có hỗ trợ **JavaScript Notifications API** hay không. Chúng ta có thể làm việc này thông qua checking property `Notification` của `window` object.
```javascript
if(!window.Notification) {
    console.log('Browser does not support notifications.');
} else {
    // display message here
}
```
Để có thể hiển thị **desktop notification**, chúng ta sẽ cần quan tâm đến hai vấn đề: `requesting permission` , `showing notification`.
### Requesting Permission
User sẽ cần phải set quyền cho phép hiển thị **Desktop Notification** trong phiên làm việc đó. Chúng ta có thể dễ dàng check được permission của user thông qua `Notification.permission` property, property này có 3 giá trị cơ bản:
* `Default` - User chưa có bất kỳ hành động tương tác nào với request message
* `Granted` - User đã cho phép website hiển thị notification
* `Denied` - User từ chối việc hiển thị notification từ website

Trong lần đầu tiên, chúng ta có thể request permission tới user thông qua method `requestPermission()` của API, nó sẽ mở ra dialog hỏi user cho phép hay chặn việc hiển thị notification của site. Một khi user đã có lựa chọn, setting sẽ được lưu trong phiên làm việc hiện tại.

Nếu user đã chặn việc hiển thị notification, chúng ta đơn giản là chẳng thể làm gì khác hơn. Trình duyệt sẽ bỏ qua bất cứ request nào liên quan đến việc hiển thị hay thậm chí là request permission thêm lần nữa.
```javascript
if (!window.Notification) {
    console.log('Browser does not support notifications.');
} else {
    // check if permission is already granted
    if (Notification.permission === 'granted') {
        // show notification here
    } else {
        // request permission from user
        Notification.requestPermission().then(function(p) {
           if(p === 'granted') {
               // show notification here
           } else {
               console.log('User blocked notifications.');
           }
        }).catch(function(err) {
            console.error(err);
        });
    }
}
```
Method `requestPermission()` trả về một `promise`. Callback function sẽ được gọi đến khi `promise` đã `resolved` hoặc `rejected` (tùy vào lựa chọn allow/block của user)
### Showing Notification
Nếu user đã cho phép việc hiển thị notification cho site, chúng ta có thể tạo một **Desktop Notification** thông qua `Notification()` contructor để hiển thị phía user.
```javascript
var notify = new Notification('Hi there!');
```
Chúng ta có thể tùy chọn thêm text body, icon, notification sound, etc..
```
var notify = new Notification('Hi there!', {
    body: 'How are you doing?',
    icon: 'https://bit.ly/2DYqRrh',
});
```
Tổng hợp lại, chúng ta sẽ tạo một function hiển thị **Desktop Notification** hoàn chỉnh:
```javascript
function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('Hi there!', {
                body: 'How are you doing?',
                icon: 'https://bit.ly/2DYqRrh',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('Hi there!', {
                        body: 'How are you doing?',
                        icon: 'https://bit.ly/2DYqRrh',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}
```
Chúng ta có thể bind function ở trên vào sự kiện `onload` trong body tag để fuction sẽ được gọi ngay sau khi webpage được load xong:
```html
<!DOCTYPE html>
<html>
<body onload="notifyMe()">
<!-- body content-->
</body>
</html>
```
Hoặc là khi user click button:
```html
<button onclick="notifyMe()">Notify Me</button>
```
Và ta sẽ được kết quả:
![](https://images.viblo.asia/5d885cb5-4569-41ae-afbf-24250698a65e.PNG)
## Summary
Bài viết nhằm giới thiệu về **Javascript Notification API** và demo cách sử dụng cơ bản của nó. Bài viết còn nhiều hạn chế, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn và tài liệu tham khảo:
* https://developer.mozilla.org/vi/docs/Web/API/notification
* https://dev.to/attacomsian/how-to-show-desktop-notifications-using-javascript-5aco