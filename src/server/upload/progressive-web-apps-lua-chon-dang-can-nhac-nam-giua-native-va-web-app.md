# Giới thiệu về Progressive Web Apps
Progresive Web App có tên viết tắt là **PWA** là một thuật ngữ dùng để ám chỉ một nhóm các tính năng mà bạn có thể thêm vào bất kỳ web app nào để cải thiện web trở nên *"ngon"* hơn, *"mượt"* hơn miễn là nó đang được chạy trên trình duyệt và có responsive ở mức chấp nhận được. Ngon hơn ở đây tức là đem tới những trải nghiệm tốt nhất tới người dùng với sự hỗ trợ của browser về các API có liên quan như Service Worker, push notification...  và thậm chí PWA vẫn có thể chạy mượt ngay cả khi không có mạng.

# Các khái niệm cơ bản về PWA
PWA là một ý tưởng và nhận được sự khuyến khích đến từ Google, cụ thể là nhóm phát triển Chrome. PWA được nhà thiết kế Frances Beriman và kỹ sư Chrome Alex Russell nhắc tới lần đầu vào năm 2015 với mục đích tận dụng triệt để những tính năng mới của trình duyệt để mang đến trải nghiệm cho người dùng web app không thua kém gì so với native app.

## Những tiêu chí tạo nên PWA
Một ứng dụng PWA cần cung cấp những tiêu chí dưới đây:
- **Progressive**: ứng dụng hoạt động với mọi thiết bị, mọi browser.
- **Responsive**: có giao diện tương thích với mọi kích cỡ của các thiết bị khác nhau như desktop, mobile, tablet,...
- **App-like**: sử dụng app-shell để cung cấp các chức năng định hướng và sự tương tác giống như app.
- **Fresh**: luôn update phiên bản mới nhất khi online (dựa trên Service Worker).
- **Safe**: tất cả dữ liệu được bảo mật khi truyền thông gia HTTPS.
- **Discoverable**: có thể được nhận dạng như là ứng dụng (dựa trên Service Worker và W3C manifest) và cho phép Search engine có thể tìm thấy.
- **Re-engageable**: giúp người dùng khám phá lại ứng dụng khi được cài đặt. Ví dụ như push notification,...
- **Installable**: có thể *Add to Homescreen* để lưu giữ ứng dụng ở ngoài màn hình.
- **Linkable**: dễ dàng share, chia sẻ đến nhiều người khác thông qua URL mà không cần cài đặt.

Nhưng ở trên mới chỉ là các tiêu chí được đặt ra, vậy làm sao để có thể implement các tiêu chí này? [Peter O'Shaughnessy](https://medium.com/@poshaughnessy?source=post_header_lockup) của Samsung Internet đã có một cách tiếp cận rất hay cho vấn đề này:

![](https://images.viblo.asia/6dd4fe85-8a78-43de-949b-0bd5bae13f6f.png)

## Service Worker
**Service Worker** giống như là một tiến trình chạy ngầm của trình duyệt và nó tách biệt so với thread chính của trình duyệt, thực hiện việc lưu cache tài nguyên, cung cấp nhiều API hữu ích cho PWA. Điều đó cho phép website chạy một số chức năng ngay cả khi bạn không truy cập vào nó. 

![](https://images.viblo.asia/f838bd7d-b671-46ae-9ff4-795d926d87fb.png)

Từ đó cho phép PWA thực hiện được các tính năng chạy nền giống như Native App ví dụ như push notification hay sync dữ liệu mới, download file, sử dụng định vị thời gian thực,... Nghĩa là nó sẽ là đứa đứng ra giúp cho PWA có thể chạy offline, khi có mạng PWA sẽ tải dữ liệu từ server, còn khi không có mạng, nó sẽ lấy dữ liệu đã lưu trong cache đưa cho PWA,

## HTTPS
HTTPS viết tắt của Hyper Text Transfer Protocol Secure (giao thức truyền tải siêu văn bản bảo mật) là phiên bản an toàn của HTTP, giao thức mà nhờ đó dữ liệu được gửi giữa trình duyệt và trang web bạn đang kết nối. Chữ 'S' ở cuối HTTPS là viết tắt của "Secure" (Bảo mật). Nó có nghĩa là tất cả các giao tiếp giữa trình duyệt và trang web đều được mã hóa. HTTPS thường được sử dụng để bảo vệ các giao dịch trực tuyến có tính bảo mật cao như giao dịch ngân hàng và đặt hàng mua sắm trực tuyến.

HTTPS được thêm vào nhằm đảm bảo tính an toàn cho PWA, tránh những trường hợp dữ liệu bị tấn công hoặc đánh cắp dễ dàng.

## Web App Manifest

Web App Manifest là một file JSON (manifest.json) cung cấp các thông tin về ứng dụng của bạn, như là tên, icon, cách hiển thị,... ví dụ nó được sử dụng để custom màu sắc hiển thị của trình duyệt như này
![](https://images.viblo.asia/17c88121-e4d5-4feb-98cb-749832559b54.png)

Việc sử dụng file manifest sẽ giúp cho ứng dụng được hiển thị gần gũi và đẹp hơn trong mắt người dùng, từ đó mang trải nghiệm của Native App đến gần hơn.

Ví dụ về một file manifest bên phía [mozilla](https://developer.mozilla.org/en-US/docs/Web/Manifest):

```
{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A readable Hacker News app.",
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
    "src": "images/touch/homescreen144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen168.png",
    "sizes": "168x168",
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

# So sánh giữa Native và Web App
Để có một cái nhìn rõ hơn về PWA thì mình nghĩ chúng ta nên nhìn về Native App và Web App ở góc độ ưu và nhược của từng đối tượng. Và khi hiểu được sự khác nhau cũng như nhược điểm của từng bên thì chúng ta sẽ hiểu được mục đích ra đời của PWA như là một giải pháp hoàn thiện cho cả 2 nền tảng này bằng cách mang cho mình ưu điểm của cả hai bên.

Chúng ta có thể tạm phận chia ứng dụng trên điện thoại thành 3 nhóm chính dựa theo cách thức triển khai như sau:
- **Native app**: là các app được viết theo ngôn ngữ riêng của từng nền tảng điện thoại như Swift/IOS, Java/Android,... Những ứng dụng này có khả năng sử dụng phần cứng và phần mềm dành cho thiết bị nên sẽ có hiệu năng ngon nhất.
- **Web app**: các website có thể truy cập thông qua browser.
- **Hybird app**: là dạng ứng dụng lai, được viết bằng các ngôn ngữ sử dụng trên nền tảng web (javascript) nhưng có thể build thành kiểu native app. Từ đó có thể truy cập vào hầu hết các chức năng thuộc phần cứng của điện thoại như máy ảnh, cảm biến... PWA và React Native nằm trong nhóm này.

![](https://images.viblo.asia/1cfe9fd7-b5a9-47d5-81d6-68e764db6b9e.png)

## Web App
**Ưu điểm**:
- Build một lần, chạy được trên mọi nền tảng, mọi thiết bị từ desktop cho đến mobile, từ ISO cho đến Android, từ Windows cho đến Linux,... nói chung là nhạc nào nó cũng có thể nhảy được.
- Có thể xuất hiện trên kết quả tìm kiếm của các Search Engine (Google, Bing, Yandex,... ) hoặc các mục quảng cáo để đặt ở nhiều nơi.
- Người dùng tiếp cập được những phiên bản mới nhất khi truy cập, đồng thời cũng không phải cài đặt ứng dụng vào trong máy gây tốn dung lượng và mất công update.

**Nhược điểm**:
- Không thể can thiệp sâu vào phần cứng, bộ nhớ của thiết bị cũng như tiếp cận được sự hỗ trợ từ phía hệ điều hành.
- Hoàn toàn phụ thuộc vào mạng, nếu không có mạng thì app cũng đi luôn.

## Native App
**Ưu điểm**:
- Có thể truy cập được hầu hết các tính năng của thiết bị như camera, la bàn,..
- Đem lại cảm giác và cái nhìn thân thiện hơn với người dùng vì sử dụng các control native của thiết bị được hệ điều hành cung cấp.
- Có thể vẫn hoạt động được ngay cả khi thiết bị không có kết nối mạng.
- Được hỗ trợ từ phía hệ điều hành nên sẽ đem lại performance tốt.

**Nhược điểm**:
- Phải cài đặt vào thiết bị, nhiều ứng dụng có kích thước lớn sẽ khiến người dùng phổ thông cân nhắc trước khi cài đặt. Chưa kể còn làm tăng chi phí về mặt dung lượng sử dụng mạng di động để tải khiến cho người dùng sẽ cân nhắc thời điểm tải.
- Không thể trực tiếp được searchable.
- Chi phí phát triển cao, hầu như phải phát triển 2 phiên bản dành cho Android và IOS.

## Ưu điểm của PWA
Có thể nhiều bạn bị nhầm giữa PWA với một chiếc web app có responsive ngon nghẻ bỏ đi thanh trình duyệt với một biểu tượng lối tắt ngoài màn hình có thể tạo trong Chrome nhưng không phải vậy, PWA ngon hơn nhiều. Mục đích PWA được sử dụng là để cải thiện trải nghiệm của người dùng như đang dùng native app:
- Vẫn có thể chạy được ngay cả khi mạng chậm hay thậm chí là không có mạng. Điều này đối với web app thì chịuu, mạng đi thì web cũng đi theo luôn.
- Sử dụng được các chức năng của phần cứng như camera, định vị...
- Có thể đồng bộ được dữ liệu khi app ở trạng thái background với Service Worker.
- Có một chú icon xinh xinh ngoài màn hình tiện cho việc truy cập.
- Bảo mật tốt với HTTPS
- Có sự tương tác với người dùng thông qua push notifications,..
- Không phải đợi approve từ các store ứng dụng.

## Một số thống kê thú vị
- Có hơn [1 tỉ website](https://siteefy.com/how-many-websites-are-there/#:~:text=built%20on%20WordPress%3F-,How%20many%20websites%20are%20there%20in%20the%20World%3F,to%201%2C295%2C973%2C827%20in%20January%202020) trên toàn thế giới.
- Tới quý 2 năm 2015 cho thấy 90% thời gian người sử dụng điện thoại tại Mỹ là dành cho Native App và 10% còn lại là cho browser. Nhưng trong con số 90% kia chủ yếu là những app đến từ các ông lớn như Facebook, Twitter, Youtube, Instagram,...
- Người dùng download app mới nhưng cũng dễ dàng gỡ bỏ nó bởi dung lượng điện thoại bị giới hạn đi kèm tâm lý sợ hết dung lượng. Có tới 65% người dùng sử dụng điện thoại không hề download ứng dụng mới hàng tháng chứng tỏ phí quảng cáo bỏ ra để kéo người dùng mới về các app native ngày càng cao.
- Tất cả những điều này cho thấy mobile web vẫn còn rất quan trọng. Nhưng lại có thêm một nghịch lý là, trong khi tỉ lệ người dùng mobile web so với tỉ lệ người dùng desktop web tăng trưởng rất nhanh và cao, nhưng tỉ lệ convert thành giá trị như đơn hàng lại rất thấp. Một phần trong đó là vì các ứng dụng web hiện tại không được optimize cho mobile cho các vấn đề về UX/UI và trong điều kiện mạng chậm.
- Một website có thể tải về dưới 3s người sử dụng sẽ happy với website của bạn, và có nghĩa là tỉ lệ rời bỏ thấp, đơn hàng sẽ tăng lên. Còn từ 3s-10s thì người sử dụng chỉ có thể nói là sẽ cố kiên nhẫn. Quá 10s người sử dụng sẽ rời bỏ trang web của bạn vì họ nghĩ nó không hoạt động.

# Tham khảo
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
https://www.linkedin.com/pulse/progressive-web-app-tương-lai-của-nền-tảng-phu-tran-phong/
https://viblo.asia/p/progressive-web-app-xoa-nhoa-khoang-cach-giua-web-va-mobile-apps-924lJY2mZPM