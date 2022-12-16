Notifications là 1 thứ cực kỳ hữu ích. Trên Google Chrome, Notifications được dùng rất phổ biến. Ví dụ như báo tin nhắn mới (trên các tool chat), báo có nội dung mới (trên SNS), báo có đơn hàng mới (trên các web E-Commerce)...  nói chung là rất nhiều.
Hôm nay chúng ta thử làm 1 sample Notification Extension trên chrome nhé.

### Step 1:
Tạo file **manifest.json** như sau: (mỗi Extension đều cần có 1 file manifest.json)
```
{
  "name": "Greeter Robot",
  "version": "1.0",
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
      "js": [
        "js/app.js"
      ]
    }
  ],
  "background" : {
    "scripts" : ["js/background.js"],
    "persistent": false
  },
  "permissions": ["notifications"],
  "browser_action": {
    "default_icon": "icon.png"
  },
  "manifest_version": 2
}
```

### Step 2: 
Ở cùng thư mục chứa file Manifest.json, tạo 1 thư mục là **js**, bên trong thư mục đó tạo 1 file** app.js**, nội dung như sau để add 1 button vào cửa sổ trình duyệt:
```
const button = document.createElement('button');
button.textContent = 'Greet me!'
document.body.insertAdjacentElement('afterbegin', button);
```

Sau đó, thêm Listener cho Event Click của button này để show Notification. 
Trong listener này bạn sẽ truyền Message có type là notification và các parameter cần thiết như title, message, iconUrl, type.
File app.js lúc này sẽ như sau:
```
const button = document.createElement('button');
button.textContent = 'Greet me!'
document.body.insertAdjacentElement('afterbegin', button);
button.addEventListener('click', () => {
  chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: 'Just wanted to notify you',
      message: 'How great it is!',
      iconUrl: '/icon.png',
      type: 'basic'
    }
  });
});
```

### Step 3: 
Cũng trong thư mục js, tạo thêm 1 file **background.js**, nội dung như sau để bắt sự kiện gửi message từ app.js gửi đến:
```
chrome.runtime.onMessage.addListener(data => {
  if (data.type === 'notification') {
    chrome.notifications.create('', data.options);
  }
});
```

Bạn có thể tìm 1 [sample extension folder](https://developers.chrome.com/extensions/samples) của Google Chrome, sau đó paste file manifest và cả thư mục js vào, đồng thời thêm 1 file icon.png vào cùng thư mục với file manifest để notification đẹp hơn.  
Thế là xong, giờ thử add Extension vào chạy chơi thử nhé. Cách add Extension tham khảo [tại đây](https://www.cnet.com/how-to/how-to-install-chrome-extensions-manually/).  
Mình thử vào 1 trang web như là StackOverflow.com, lúc này có 1 button là Greet me! xuất hiện.  
![](https://images.viblo.asia/f9165d8f-a443-4807-a414-7023da06179b.png)

Click vào đó và chúng ta sẽ thấy 1 notification như sau ở góc dưới màn hình:  

![](https://images.viblo.asia/61b7f147-279c-4d64-9650-39cc0007ab20.png)


Bạn có thể thay event Click trong file app.js thành 1 event bất kì mà bạn thích. 
Rất đơn giản phải không nào.  
Nguồn tham khảo:  
https://medium.com/@moshfeu/notifications-in-chrome-extension-50aac17b3b7d