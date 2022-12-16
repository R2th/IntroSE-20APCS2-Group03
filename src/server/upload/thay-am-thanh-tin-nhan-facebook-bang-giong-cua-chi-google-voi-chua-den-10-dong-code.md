Nay lướt viblo Thấy bài https://viblo.asia/p/xay-dung-ung-dung-google-extension-don-gian-trong-10-phut-phan-1-RnB5pkrrlPG khá hay và mình khá hứng thú .vậy là mình bắt tay ngay vào viết 1 cái gì đó vui vui để thực hành ngay. 

## **Bài Toán**

Mình muốn khi có ai đó nhắn tin cho mình thay vì tiếng báo tin nhắn như thường lệ mà mình muốn 1 âm thanh khác phát lên.

Như video dưới đây .**nhưng chỉ giống phần kết quả thôi nhé.còn cách làm hoàn toàn khác thanh niên trong video nhé. vì video mình lấy trên mạng**.

{@embed: https://www.youtube.com/watch?v=kHFZsUvgH-o}

## **Hướng giải quyết**

1. Khi có tin nhắn thì chắc chắn Fb phải gửi 1 xhr lên để lấy thông tin của tin nhắn ấy => vậy mình cần phải tìm ra cái xhr đấy .
2. Khi xhr được gửi đi thì mình sẽ chạy 1 đoạn script để phát âm thanh mà mình muốn => vậy mình cần 1 file âm thanh, và 1 đoạn script
3. Muốn chạy được đoạn  script ấy mình sẽ dùng chome extension.

##  **Giải quyết**

**vấn đề 1 : Khi có tin nhắn thì chắc chắn Fb phải gửi 1 xhr lên để lấy thông tin của tin nhắn ấy => vậy mình cần phải tìm ra cái xhr đấy** 

* Vấn đề này thì khá dễ ràng để tìm ra nhờ chrome developer tool của trình duyệt . sau 1 hồi mò mẫn thì mình đã tìm ra cái xhr ấy

![](https://images.viblo.asia/30e2da8e-0c9e-4b78-9c21-e3571b323c3d.PNG)

* Vậy mình đã tim ra: https://www.facebook.com/ajax/mercury/delivery_receipts.php Mỗi lần có tin nhắn nó đề gửi cái này lên 

**vấn đề 2 :Khi xhr được gửi đi thì mình sẽ chạy 1 đoạn script để phát âm thanh mà mình muốn => vậy mình cần 1 file âm thanh, và 1 đoạn script**

* file âm thanh chị goole nói thì các bạn có thể truy cập https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=am-thanh-muon-phat&tl=vi&total=1&idx=0&textlen=5 để tải xuống file âm thanh và thay âm thanh bạn muốn phát vào thôi.
* Đoạn scrip phát âm thanh thì chỉ cần đơn giản thế này thôi :

         var audio = new Audio('duong-dan-den-file-am-thanh.mp3');
         audio.play();

**Vấn đề 3 : Viết chome extension  **

* Mình sẽ tạo ra 1 thư mục chứa 3 file :

1.     index.js => chứa đoạn script
2.     manifest.json => dùng để cấu hình cho extension
3.     notification.mp3 => file âm thanh

## **Cấu hình file manifest.json** 

```javascript
{
  "name": "Google and facebook",
  "version": "1.0",
  "description": "Google and facebook!",
  "permissions": ["webRequest","https://www.facebook.com/*"],
  "background": {
    "scripts": ["index.js"]
  },
  "manifest_version": 2
}
```

* permissions : ở đây mình xin quyền webRequest và mình chỉ sử dụng tiện ích này khi truy cập trang facebook
* các thông số khác chắc không phải giải thích gì thêm

## **File index.js** 

* Ở đây mình sẽ dùng webRequest để theo dõi khi có tin nhắn dựa vào cái xhr mình vừa tìm được

* Các bạn có thể xem chi tiết: https://developer.chrome.com/extensions/webRequest

* Đây là ví dụ lắng nghe sự kiện onBeforeRequest :
```
chrome.webRequest.onBeforeRequest.addListener(
        callback, filter, opt_extraInfoSpec); 
```

* vậy callback sẽ là function để thực thi 1 hành động gì đó khi thỏa mãn cái filter kia.

* Ở ví dụ này thì cái callback sẽ là function phát âm thanh, filter sẽ là cái urls ["https://www.facebook.com/ajax/mercury/delivery_receipts.php*"]

* Vậy mình ghép code file index.js  như sau:

```
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var audio = new Audio('notification.mp3');
    audio.play();
  },
  {
    urls: ["https://www.facebook.com/ajax/mercury/delivery_receipts.php*"]
  });
```

Vậy là xong : giờ mình đã có 1 thư mục chứa 3 file index.js, manifest.json, notification.mp3 . giờ mình chỉ việc import vào trình duyệt và test thành quả thôi.
* Để import vào trình duyệt bạn vào đường dẫn chrome://extensions/ bật chế độ nhà phát triển và tải lên tiện ích thì các b chỉ cần chọn đến thư mục chưa 3 file kia là ok .

![](https://images.viblo.asia/9a8e6ef8-4b23-4812-b423-123b0cc0d1cd.PNG)

## Kết luận: 
*   Vậy là xong giờ bạn vào facebook để xem thành quả thôi ! :) :100::joy: . Thành công hay không nhớ comment cho mình biết nhé !!!
* link github : https://github.com/phamtuananh1996/chome-extension