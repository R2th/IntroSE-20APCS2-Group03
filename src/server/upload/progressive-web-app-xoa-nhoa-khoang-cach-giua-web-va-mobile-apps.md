Đây là bài dịch, bài gốc mời các bạn xem ở đây : https://medium.freecodecamp.org/progressive-web-apps-bridging-the-gap-between-web-and-mobile-apps-a08c76e3e768

![](https://images.viblo.asia/61e00f12-b470-4393-84bd-bfedd865aecf.png)

Trừ khi đang sống trong một cái hốc đá nào đấy, nếu không thì ắt hẳn bạn đã từng nghe đến PWAs hay còn gọi là Progressive Web Apps. Đây là một chủ đề đang trở nên rất hot trong thời điểm hiện nay vì nó hỗ trợ cho việc phát triển ứng dụng đa nền tảng, và các ông lớn đang bắt đầu sử dụng công nghệ này cho các web apps của họ, như là Twitter, Lyft, Starbucks, NASA và rất nhiều công ty khác nữa.

Gần đây, PWAs đã nhận được thêm rất nhiều sự chú ý, kể từ khi Apple thông báo rằng Service Worker và Web Manifest đã được hỗ trợ trên Safari. Microsoft cũng đã mang PWAs đến Windows store, và Chrome đã thử nghiệm hỗ trợ PWAs trên tất cả các nền tảng.

Những điều trên liệu đã đủ thuyết phục bạn rằng PWAs là một thứ đáng để tìm hiểu thử rồi chứ?

Vì thế trong bài viết lần này tôi sẽ trình bày tổng quan về ý tưởng và cách tiếp cận mà PWAs đang áp dụng. Những điều tôi viết trong này hoàn toàn dựa trên kinh nghiệm xây dựng PWAs, và tôi đã tạo ra mục lục cho bài viết này sau khi trải qua khoá học về PWAs của Google: [Google Progressive Web Apps Training](https://developers.google.com/web/ilt/pwa/)

Khoá học đã làm rất tốt trong việc giải thích mọi thứ hoạt động như thế nào với nhau, và đồng thời cũng đưa tôi trực tiếp vào việc viết code. Ngoài ra thì khoá học của Udacity cũng khá là hữu ích nếu các bạn cần tham khảo thêm: [Mobile Web Specialist course](https://goo.gl/nvzoPG)

## Vì sao lại cần PWA?

![](https://images.viblo.asia/6e86fd12-1c9c-46aa-a26d-0ba717c26a7e.png)

Web có thể coi là là một Hệ điều hành độc lập, được sử dụng thường xuyên và là nền tảng lớn nhất trên internet hiện nay. Đồng thời chúng ta cũng thấy rằng người dùng dành nhiều thời gian trên các ứng dụng native hơn là trên web.

Vì sao lại thế nhỉ?

Lý do chính dẫn đến kết quả này là cảm nhận mượt mà (smooth) và sự tướng tác tốt mà các native app mang lại. Nếu chúng ta có thể mang những tính năng đó lên Web thì sao? Điều đó có nghĩa là một sự kết hợp giữa tính dễ truy cập, nguồn tài nguyên khổng lồ của Web (nhiều gấp 3 nếu so sánh với native app) và trải nghiệm tương tác tuyệt vời của native app.

Theo như Alex Russell, người tạo ra định nghĩa PWAs thì:

```
Chỉ đơn giản là các trang web đã được bổ sung đầy đủ vitamins và khoáng chất thiết yếu
```

Các vitamin chỉ đơn giản là các chức năng của native app mà chúng ta thêm vào Web App để tạo ra phiên bản ưu việt nhất của cả hai phía. Các app mà chúng ta có thể truy cập trực tiếp từ web sẽ hoạt động một cách mượt mà và nhanh chóng, đồng thời có thể cài đặt, thậm chí là có cả notification.

![](https://images.viblo.asia/d71caea9-ce8d-402d-b53b-5cca89b6c4a2.png)

## Những thành phần tạo nên PWAs

Theo Google, dưới đây là những khả năng mà PWAs cung cấp (nguồn: https://developers.google.com/web/progressive-web-apps/) :

1. **Tính tin cậy**: Offline-đầu-tiên, tức là nó có thể cung cấp các giao diện ngay cả trong điều kiện kết nối internet là kém hoặc không có. Nhưng điều đó không có nghĩa là app phải hoạt động khi không có mạng, mà nó thiên về nghĩa là các dịch vụ được cung cấp không gián đoạn trong mọi điều kiện về mạng.
2. **Nhanh**: Thời gian load gần như ngay lập tức, và cung cấp các trải nghiệm mượt mà ngay cả với các nội dung đang được load.
3. **Tương tác**: Cần cung cấp một trải nghiệm tương tác tốt, giống như là một native app. Có thể có Push Notification, Thanh toán qua Web, hoặc quản lý định danh, ... Đồng thời có thể cài đặt cũng là một chức năng chính trong đây.

Nhưng tất cả những điều đó chỉ là ở mức ý tưởng - làm thế nào chúng ta nghĩ ra cách implement các tính năng này dưới góc nhìn kỹ thuật? [Peter O'Shaughnessy](https://medium.com/@poshaughnessy?source=post_header_lockup) của Samsung Internet đã có một cách tiếp cận rất hay cho vấn đề này:

![](https://images.viblo.asia/625ed0de-35fe-49aa-85e3-eea55f15088a.png)

Và giờ chúng ta hãy cùng điểm qua từng tiêu chuẩn này:

## Service Worker

Đây về bản chất là một file Javascript chạy ngầm phía backgroung và hoàn toàn tách biệt so với thread chính của trình duyệt, đứng chắn giữa các request mạng, thực hiện việc lưu cache các tài nguyên, và cung cấp một phần khung cho rất nhiều API như là push notification, background sync, và caching.

![](https://images.viblo.asia/78e7668f-7cfe-42d6-8a0e-9016bcfa3458.png)

Khả năng của service worker khi có thể chạy biệt lập ở background đã giúp cho web có rất nhiều khả năng hoạt động ngay cả khi trang web đã đóng, do đó cung cấp thêm được rất nhiều trải nghiệm vàn tương tác giống với native app.

Bạn có thể tìm được một bài giới thiệu về service workers ở [đây](https://developers.google.com/web/fundamentals/primers/service-workers/), và Google cũng có một vài công cụ hỗ trợ mã nguồn mở có thể tìm thấy ở [Service Worker Toolbox](https://github.com/GoogleChromeLabs/sw-toolbox)

## HTTPS

Hypertext Transfer Protocol Secure là một sự thích nghi của Web để bảo mật việc giao tiếp thông qua giao thức HTTP bằng cách sử dụng mã hoá SSL hoặc TLS. Nhưng chúng ta sẽ không đi sâu vào chủ đề này mà thay vào đó, hãy cùng tìm hiểu lý do tại sao HTTPS lại rất quan trọng.

Ngoài lý do thực tế rằng PWAs được kỳ vọng là mang tính bảo mật cao. thì các service worker mà PWAs sẽ sử dụng có thể đứng giữa các network request và thay đổi các responses. Điều này có thể dẫn đến việc dữ liệu bị tấn công và đánh cắp một cách dễ dàng, dẫn đến các cuộc tấn công nghiêm trọng. Do đó việc bảo mật website bằng HTTPS là cần thiết, và có rất nhiều dịch vụ sẽ giúp bạn có một chứng chỉ SSL như là [LetsEncrypt](https://letsencrypt.org/) hay là [SSLforfree](https://www.sslforfree.com/)

## Web App Manifest

Về cơ bản nó là một file json chứa các thông tin cho ứng dụng của bạn, như là cách hiển thị ở màn hình home, hiển thị trên web, v..v... Nó còn có thể sử dụng để thêm màu cho giao diện, cài đặt icons cho màn hình home, và một màn hình splash screen với một vài thông tin đơn giản.

![](https://images.viblo.asia/dbb2abf9-26b4-464e-81cb-daf5cff32505.png)

Một file manifest đơn giản sẽ trông như thế này:

```json
{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A simply readable Hacker News app.",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen192.png",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }]
}
```

Việc sử dụng file manifest sẽ giúp cho PWA trông thân thiện giống như một ứng dụng native thực thụ với icon, giao diện và màn hình splash. Và đồng thời nó cũng có thể cài đặt được chỉ thông qua một file JSON.

Để tìm hiểu thêm về file manifest, bạn có thể đọc thêm về tài liệu của Mozilla: [Web Docs](https://developer.mozilla.org/en-US/docs/Web/Manifest) và tạo ra một file ở [đây](https://tomitm.github.io/appmanifest/).

Đối với việc sử dụng favicon cho nhiều kích thước khác nhau, bạn có thể tạo chúng từ một file ảnh chất lượng cao thông qua ứng dụng [Favicon-Generator](https://www.favicon-generator.org/), và cả theme nữa. Màu background có thể chọn từ bảng màu của ứng dụng.

## Push Notification và Background Sync

Phía server sẽ truyền các push message cho service workers, sau đó các service workers sẽ bắt lấy và cập nhật trạng thái của local hoặc hiển thị một notification cho người dùng. Bởi vì cái Service Worker này hoạt động độc lập như là một process chạy ngầm, nên việc này là hoàn toàn khả thi ngay cả khi ứng dụng đã đóng. [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) có thể giúp bạn implement chức năng này.

![](https://images.viblo.asia/1eafffa4-f4c1-4257-8ff9-2c2b7d437c65.png)

[Background Sync API](https://www.chromestatus.com/feature/6170807885627392) sẽ push các cập nhật định kì theo thời gian đến phía server, do đó ứng dụng có thể cập nhật được khi có  mạng. Về cơ bản, việc này sẽ giúp cho tất cả các message được gửi ngay khi có kết nối ổn định.

## Các concept bổ sung

Dưới đây là một số cách tiếp cận và tiêu chuẩn mà chúng ta có thể làm theo khi xây dựng Progressive Web App.

### Lighthouse và PWA Checklist

![](https://images.viblo.asia/3bc92824-a764-4de6-bd64-2d864a15a79d.png)

[Lighthouse](https://developers.google.com/web/tools/lighthouse/) là một công cụ giúp kiểm tra chất lượng của trang web một cách tự động, bằng cách thực hiện các kiểm tra hiệu năng, các best practice, khả năng truy cập, SEO và các tiêu chuẩn Progressive Web App. Đây là một cách rất tốt để kiểm tra xem web của bạn có đạt những tiêu chuẩn và hiệu năng của app nếu thành PWAs.

Bạn có thể tìm thấy những điều web app của bạn còn thiếu và cách để cải thiện bằng cách sử dụng các gợi ý từ kết quả thống kê của Lighthouse và từ cả [PWA checklist](https://developers.google.com/web/progressive-web-apps/checklist) của Google, bao gồm các hướng dẫn cơ bảnđể làm theo, và cách để sửa các vấn đề phát sinh. Và điều tuyệt vời nhất là hiện nay Lighthouse đã được tích hợp vào Chrome Dev Tools!

## Storage

Theo như Addy Osmani (trong đội phát triển Google Chrome), phương pháp tốt nhất đến thời điểm hiện tại về việc lưu trữ trong PWA là:

> Sử dụng [Cache API](https://davidwalsh.name/cache) cho các tài nguyên có thể đánh địa chỉ qua URL (là một phần của [Service Worker](https://developers.google.com/web/fundamentals/primers/service-worker/)). Với các dữ liệu khác, sử dụng IndexedDB(với một wrapper bằng [Promise](http://www.html5rocks.com/en/tutorials/es6/promises/))
> 

Cả 2 cái trên đều là các API bất đồng bộ hoạt động với service workers. Việc này giúp cho chúng hoàn toàn phù hợp để sử dụng với PWAs, không giống như các phương thức khác như là localStorage.

Để biết được IndexedDB là gì bạn có thể tham khảo nhanh ở [đây](https://developers.google.com/web/ilt/pwa/working-with-indexeddb).

Nói một cách đơn giản, nó là một hệ thống lưu trữ noSQL có khả năng mở rộng lớn có thể được lưu trữ bất cứ thứ gì của trình duyệt, đồng thời hiệu năng của API mặc định cũng khá cao.

## Caching 

Cache API có thể được sử dụng trong Service Worker, và nó sẽ cho phép bạn lưu trữ các response với key là các request. Việc này cho phép nội dung có thể trực tiếp được load từ Cache trong trường hợp mạng yêu và có thể cấu hình phức tạp hợp để chỉ load những thành phần dữ liệu cần thiết từ internet, trong khi các thành phần còn lại sẽ được load từ cache.

![](https://images.viblo.asia/4358fa10-fe0e-4894-a3a1-7b671ca17dcb.jpeg)

Một trong những mô hình phổ biến để đáp ứng khả năng offline-đầu-tiên và cung cấp các trải nghiệm giống như native-app là caching lại phần vỏ của ứng dụng. Việc này bao gồm lưu trữ các thành phần HTML cơ bản, CSS và Javascript làm nên phần navigation/toolbars hoặc bất cứ thứ gì chung dựa theo layout của app. Vì thế phần vỏ của ứng dụng sẽ được tải ngay lập tức và hiển thị một màn hình loading cho đến khi nội dung được tải về từ internet, do đó sẽ cung cấp một trải nghiệm liền mạch cho người dùng.

## Fetch và Promises

Để tải về các tài nguyện, cách mới nhất và được recommend hiện nay là sử dụng Fetch API với Promises.

```javascript
// Một ví dụ tải tài nguyên với promises
fetch(‘examples/example.json’)
.then(function(response) {
   // Do stuff with the response
})
.catch(function(error) {
   console.log(‘Looks like there was a problem: \n’, error);
});
```

Việc sử dụng `XMLHttpRequest` (XHR) sẽ trở nên rườm rà không cần thiết và với callbacks, các đoạn code sẽ trở nên khó hiểu khi có nhiều callback được sử dụng và nối vơi snhau.

Do đó Promises là cách tốt hơn để xử lý các đoạn code bất đồng bộ.

Cả Service Workers, Cache API và Network request đều sử dụng bất đồng bộ và fetch để thực hiện nhiều công việc khác nhau, và đều yêu cầu các chức năng này ở tầng cơ bản, do đó việc nắm vững các khái niệm này rất là quan trọng.

## Responsive Design

Việc này không chỉ có nghĩa là sử dụng các đơn vị responsive của chiều rộng. Các khối hiển thị nội dung cần được xử lý theo như cầu của layout. Ứng dụng cần phải nhìn giống như là được làm hoàn hảo cho mobile, và một cách tổng quan nó nên nhìn giống như là một native app được thiết kế tốt.

![](https://images.viblo.asia/92131881-d0ce-4561-b362-a05a13646a84.png)

*Các bước để xử lý nội dung*

Các hệ thống CSS layout hiện đại như là [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) (Có thể học thông qua một khoá miễn phí ở [đây](https://cssgrid.io/) - bởi Wes Bos) hay là [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) là những trợ thủ đắc lực cho việc quản lý các layout khác nhau và sắp xếp giao diện cho nhiều kích thước khác nhau.


## Tối ưu hình ảnh

![](https://images.viblo.asia/f6bfed9d-7c58-4987-8b82-3b32c50ce185.png)

*Phân phối dữ liệu trong ứng dụng web*

Một trong các chức năng chủ chốt của PWAs đó là khả năng hiển thị nhanh, và trong trường hợp này thì hình ảnh không thể giúp ích được nhiều. Các file hình ảnh cần được thay thế bởi các file SVGs hoặc cần phải được bỏ ngay khi có thể. Các định dạng hình ảnh được tối ưu cho web có thể được sử dụng với dung lượng càng thấp càng tốt.

Nhưng có một điều cũng rất quan trọng đó là các hình ảnh này có thể co giãn và hiển thị tốt với nhiều kích cỡ màn hình khác nhau, và cũng là một đặc trưng quan trọng của PWAs để nó cung cấp trải nghiệm giống như native app

## Một vài ví dụ tiêu biểu

Dưới đây là một vài ví dụ thực tế của PWAs

![](https://images.viblo.asia/3c3592c6-bc02-4561-8a84-06a43eeb934e.jpeg)


## Tổng kết

Với từng dịch vụ đều cung cấp app của riêng mình, người dùng có thể sẽ cảm thấy bất tiện khi phải lên store và download chúng. Họ ghét phải tốn quá nhiều thời gian, dữ liệu di động và dung lượng trên thiết bị. Điều đó thường dẫn đến việc người dùng tìm đến web, là thứ mà yêu cầu ít công việc hơn. Nhưng sau đó, chúng ta lại thấy tỉ lệ quay trở lại app rất cao, bởi vì các trải nghiệm trên web không mượt mà và tối ưu như là native app.

Giải pháp cho cả 2 vấn đề trên là Progressive Web Apps, là thứ kết hợp những điều tốt nhất của cả 2, và đem đến cho người dùng trải nghiệm tối ưu nhất.

Như đã nói đến trước đó, với việc hỗ trợ PWAs đang ngày càng tăng trưởng ở trên tất cả các nền tảng, giờ sẽ là thời điểm tốt nhất để bạn có thể bắt đầu.

[Progressive Web App tạo ra 80% tăng trưởng truy cập ở BookMyShow](https://developers.google.com/web/showcase/2017/bookmyshow)

[Xây dựng một Progressive Web App: Flipkart Lite](https://medium.com/progressive-web-apps/building-flipkart-lite-a-progressive-web-app-2c211e641883)

[Các ứng dụng Progressive Web App tuyệt vời](https://www.progressivewebapproom.com/index.html)