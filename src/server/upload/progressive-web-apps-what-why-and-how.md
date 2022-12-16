Xin chào tất cả mọi người, hôm nay mình xin giới thiệu đến các mọi người một "đồ chơi" mới trong lĩnh vực Web đó chính là Progressive Web App (PWA). Và bài viết hôm nay mình xin được giới thiệu về PWA tập trung vào 3 câu hỏi chính là What is a PWA?, Why do we need one? and How can we build one?
## Introduce
![](https://images.viblo.asia/8e439fae-b381-4c13-96ae-180fa9a5dd5d.jpg)

Chắc hẳn ai là tín đồ của cộng đồng Instagram thì có lẽ là đã từng nhìn thấy dòng chữ "Add to Home Screen" như ảnh phía trên. Khi click vào button trên thì "app" sẽ được install trong background trong máy bạn. Khi bạn mở app trong list app của bạn thì bạn có thể trải nghiệm như là bạn đang truy cập vào trang đó vậy, có thể bạn sẽ chưa hiểu ngay đâu, hãy từ từ nhé. :relieved:

Những gì bạn đang nhìn thấy bây giờ là một app được down từ web về chứ không cần down ở trên App Store như bao ứng dụng khác nưa nhé.

Easy nhỉ! Nhưng đó chưa phải là điểm quan trọng nhất của PWA mà đó là khi mà bạn mở app, bạn có quyền duyệt nội dung ngay cả khi bạn không kết nối Intenet và dĩ nhiên đó là ngoại tuyến, ngoài ra nó còn có thể push notification nữa nhé. Yeah, so cool! Đến đây thì bạn đã hiểu tại sao mình gọi nó là app rồi nhé. :D

Những gì mình vừa nói và các bạn tưởng tượng được chính là Progressive Web App đấy. PWA cho phép bạn install App từ cửa số trình duyệt của bạn, và nó có luôn shortcut như một app thông thường chúng ta download ở trên App Store, và dĩ nhiên là nó có thể hoạt động ngoại tuyến. Why not!

Tuy nhiên nó có thực sự có ý nghĩa đối với web app progressive. Chúng ta hãy cùng tìm hiểu sâu hơn progressive là gì và điều gì làm cho nó thực sự khác biệt với những App native khác nhé.

## What is a Progressive Web App?
Thuật ngữ Progressive Web App được đưa ra bởi Alex Russell và Frances Berriman, trong đó Alex viết rằng:
> Progressive Web Apps are just websites that took all the right vitamins.


Và nó không phải là framework mới hay là công nghệ mới. Nó là một tập hợp tốt nhất để làm cho chức năng web tương tự như app trên desktop hay là mobile. Và đây là một trải nghiệm liền mạch đến mức mà người dùng không thể biết sự khác nhau giữa PWA và native mobile app. Vi diệu thật! :hushed

PWA cung cấp trải nghiệm người dùng thông qua việc cải tiến. Về cơ bản điều đó có nghĩa là PWA sẽ thực hiện các chức năng trên Iphone8 giống với Iphone thế hệ cũ. Chắc chắn một số tính năng là không khả dụng nhưng ứng dụng vẫn tiếp tục hoạt động bình thường.:pouting_cat:

 ## Why do we need a Progressive Web App?
 Trước khi đưa ra lý do tại sao lại cần PWA thì chúng ta hãy cùng điểm lại một chút về native app và web app.
 
 **Internet speed:**  bạn có thể không nhận ra điều này tùy thuộc vào nơi bạn sống, nhưng 60% dân số thế giới vẫn đang sử dụng internet 2G. Ngay cả ở Mỹ, một số người phải sử dụng quay số để truy cập internet.
 
 **Tải trang web chậm:** bạn có biết người dùng chờ đợi bao lâu để nhấp vào nút Đóng(X) nếu trang web quá chậm không? 3 giây! 53% người dùng từ bỏ một trang web nếu nó quá chậm.
 
 **Cọ sát cao:** mọi người không muốn cài đặt ứng dụng gốc. Một người dùng trung bình cài đặt 0 ứng dụng trong một tháng.
 
 **Sự tham gia của người dùng:** người dùng dành phần lớn thời gian của họ cho các native app, nhưng phạm vi tiếp cận web di động gần gấp 3 lần so với các native app. Do đó, hầu hết người dùng không tích cực tham gia. Tuy nhiên, người dùng đang dành 80% thời gian cho chỉ 3 native app hàng đầu của họ.
 
 ![](https://images.viblo.asia/20f6c72d-197c-4987-9493-ae35367ed18a.png)
 
 PWAs giúp chúng ta giải quyết những vấn đề này. Có nhiều lý do để sử dụng một PWA, nhưng đây là một số khả năng hàng đầu mà nó cung cấp:
 
 * **Fast:** PWA cung cấp trải nghiệm luôn nhanh chóng. Từ lúc người dùng tải xuống một ứng dụng cho đến khi họ bắt đầu tương tác với nó, mọi thứ diễn ra rất nhanh. Vì bạn có thể lưu trữ dữ liệu, nên cực kỳ nhanh chóng để khởi động lại ứng dụng ngay cả khi không connect internet.
 * **Trải nghiệm người dùng tích hợp**: PWA cảm nhận và hành xử giống như các native app. Bạn ở trong màn hình chính của người dùng, gửi thông báo đẩy như native app và có quyền truy cập vào một chức năng của thiết bị như native app. Trải nghiệm cảm thấy liền mạch và tích hợp.
 * **Trải nghiệm đáng tin cậy:** với sự giúp đỡ của nhân viên phục vụ, chúng tôi có thể vẽ một bức tranh đáng tin cậy trên màn hình người dùng ngay cả khi mạng bị lỗi.
 * **Thu hút**: vì chúng tôi có thể gửi thông báo cho người dùng, chúng tôi thực sự có thể thúc đẩy sự tham gia bằng cách giữ cho người dùng được thông báo và tương tác với ứng dụng.

## How to build a Progressive Web App
Hiện tại thì google đã cung cấp cho chúng ta [checklist](https://developers.google.com/web/progressive-web-apps/checklist) của item đối với PWA. 
### Web app manifest![](https://images.viblo.asia/2fe50ecc-6d37-4507-8ef5-b4cbae1a056a.png)
Đây chỉ là ảnh demo về file json cung cấp thông tin vê một web app. Nó có thông tin như biểu tượng của ứng dụng (mà người dùng nhìn thấy sau khi cài đặt nó trong app list của họ), màu nền của ứng dụng, tên của app, tên ngắn, v.v. Bạn có thể tự viết tệp json này hoặc bạn có thể sử dụng các [tool](https://app-manifest.firebaseapp.com/) để tạo một tệp cho bạn.

### Service worker
Service worker là những worker run theo event và được chạy trong background của app và hoạt động như một proxy giữa network và app. Bạn có thể chặn các network request và thông tin cache trong background. Điều này có thể được sử dụng để tải dữ liệu khi sử dụng ngoại tuyến. Chúng ta cũng có một đoạn JS để lắng nghe các sự kiện như fetch and install và thực hiện tasks.

`sample.js`

```javascript
self.addEventListener('fetch', event => {
    //caching for offline viewing
    const {request} = event;
    const url = new URL(request.url);
    if(url.origin === location.origin) {
        event.respondWith(cacheData(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});
async function cacheData(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}
```
### Icon
Icon được sử dụng để cung cấp một icon của app khi người dùng install PWA trong máy của họ. Nếu bạn không tự design được thì rất nhiều tool để tạo ra cái này, và dĩ nhiên nó phải là ảnh vuông(jpeg, jpg, png...).
### Served over HTTPS
Để tạo ra một PWA app, thì web app phri được trang bị một secure network. Với các dịch vụ như Cloudfare and LetsEncrypt, việc lấy SSL certificate rất dễ. Một secure network không chỉ là một cách làm tốt mà nó cũng thiết lập để chứng minh độ đáng tin cậy web của bạn và tránh bị hack. 

## SUMMARY
Như vậy, mình cũng đã giới thiệu tới các bạn được như thế nào là Như thế nào là PWA, Tại sao lại cần nó và build nó. PWA là một "đồ chơi" mà chúng ta nên học cũng như nên biết để ứng dụng cho Website của mình cũng như của các dự án nếu như có specs, và chúng ta phải công nhận một điều rằng PWA thực sự là hay và nó đem lại một trải nghiệm không thể tuyệt vời hơn khiến người dùng còn lầm tưởng nó là native App. Hy vọng qua bài viết này, giúp các bạn hiểu được phần nào về PWA và tiếp tục tìm hiểu nó. 

See you, :muscle:

Thank for reading!

-------------------
Tài liệu tham khảo:

https://medium.freecodecamp.org/progressive-web-apps-101-the-what-why-and-how-4aa5e9065ac2