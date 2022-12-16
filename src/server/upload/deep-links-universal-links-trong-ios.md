Bắt người dùng tải xuống và quay lại ứng dụng của bạn là một thách thức: ngay cả khi một người bị lôi kéo với dịch vụ hoặc sản phẩm của bạn tại cửa hàng của bạn, nếu họ được đưa đến một trang chủ không liên quan sau khi tải xuống ứng dụng, họ có thể chỉ đóng ứng dụng và không theo dõi . Ngay cả đối với những người đã có ứng dụng của bạn trên điện thoại của họ, các liên kết trong email hoặc nguồn cấp dữ liệu xã hội có thể là một hướng dẫn tốt để đưa họ trở lại dịch vụ của bạn, nhưng không có `Deep linking`, họ có thể không bao giờ mở lại ứng dụng của bạn.

Deep linking ra đời để giúp những người dùng đó quay lại ứng dụng của bạn. Đối với người dùng ứng dụng hiện tại, họ có thể xem nội dung phù hợp trong ứng dụng của bạn thay vì trang web - thường khó giữ chân người dùng trên trang web so với ứng dụng. Đối với người dùng mới, chúng ta muốn họ xem nội dung phù hợp sau khi tải xuống ứng dụng. 
![](https://images.viblo.asia/923141fd-9a44-4ee9-b296-832fac6ef218.png)

Trong bài đăng này, chúng ta sẽ tóm tắt các phương pháp bạn có thể sử dụng và các triển khai cơ bản cho ứng dụng iOS.

### Custom URL Schemes

Custom URL scheme là một kỹ thuật cũ  - các lược đồ của nó gần giống như các URL thông thường, nhưng mỗi lược đồ bắt đầu bằng một cái gì đó duy nhất cho ứng dụng của bạn thay vì HTTP hoặc HTTPS. Lược đồ này về cơ bản sẽ mở ứng dụng của bạn thay vì trang web và chuyển URL. Apple khuyến nghị Universal Links thay vì custom URL schemes, vì bất kỳ ai cũng có thể sử dụng lược đồ này để mở ứng dụng của bạn mà bạn không nhận thấy.
![](https://images.viblo.asia/1fc9dec4-aa8f-4473-8179-2823570eb3eb.png)

### Universal Links

`Universal links` được Apple giới thiệu cùng với việc giới thiệu iOS 9 và tvOS 10. `Universal links` là `URL HTTP` hoặc `HTTPS` mà các sản phẩm của Apple xem như là tài nguyên điều hướng trong cả web và ứng dụng. Bằng cách này, một URL duy nhất có thể được sử dụng để mở trang web hoặc ứng dụng tùy thuộc vào việc ứng dụng của bạn có được tải xuống hay không. Từ năm 2019, `universal links` cũng được giới thiệu cho các ứng dụng Mac OS. Để `universal links` hoạt động, bạn cần thực hiện các bước sau trên trang web và ứng dụng của mình và chúng cũng ngăn các ứng dụng của bên thứ ba sử dụng.

![](https://images.viblo.asia/03af0a28-3ad3-48b7-9d5f-1e4ca56d0717.jpeg)

### Steps to Setups:

Thêm `Associated Domains Entitlement` vào ứng dụng của bạn, nó cho biết các miền đủ điều kiện có thể đại diện trong ứng dụng của bạn. (Ví dụ `Associated Domains Entitlement` từ Apple bên dưới - tên miền được quốc tế hóa phải được mã hóa dưới dạng Punycode)
```
<array>
   <string>applinks:www.example.com</string>
   <string>applinks:*.example.com</string>
   <string>applinks:xn--fhqz97e.example.xn--fiqs8s</string> <!--上海海.example.中国-->
</array>
```

Thêm `Apple App Site Association file` vào trang web của bạn, đây là một tệp `JSON` được lưu trữ trong máy chủ web cho biết phần nào của tên miền web có thể được đại diện trong ứng dụng của bạn. (Ví dụ `App Site Association file from Apple` bên dưới)

```
{
  "applinks": {
      "details": [
           {
             "appIDs": [ "ABCDE12345.com.example.app", "ABCDE12345.com.example.app2" ],
             "components": [
               {
                  "#": "no_universal_links",
                  "exclude": true,
                  "comment": "Matches any URL whose fragment equals no_universal_links and instructs the system not to open it as a universal link"
               },
               {
                  "/": "/buy/*",
                  "comment": "Matches any URL whose path starts with /buy/"
               },
               {
                  "/": "/help/website/*",
                  "exclude": true,
                  "comment": "Matches any URL whose path starts with /help/website/ and instructs the system not to open it as a universal link"
               }
               {
                  "/": "/help/*",
                  "?": { "articleNumber": "????" },
                  "comment": "Matches any URL whose path starts with /help/ and which has a query item with name 'articleNumber' and a value of exactly 4 characters"
               }
             ]
           }
       ]
   },
   "webcredentials": {
      "apps": [ "ABCDE12345.com.example.app" ]
   }
}
```

### Vấn đề với Smart App Banner không có khả năng kiểm soát

`Universal links` cung cấp trải nghiệm người dùng gần như liền mạch một khi `Associated Domains Entitlement` và `App Site Association files` được thiết lập chính xác. Tuy nhiên, các nhóm tiếp thị thường dựa vào gói liên kết hoặc chuyển hướng web để đo lường hoặc phân bổ chiến dịch của họ. Thiết lập an toàn của `universal links` ngăn nhóm sử dụng các kỹ thuật tiếp thị này. Ngoài ra, Safari có thể chèn `Smart App banner` cho các trang có `universal links`. `Smart App banner` không thể được kiểm soát và có thể không phải là trải nghiệm tối ưu cho người dùng.
![](https://images.viblo.asia/47411f76-b490-4d6d-bed7-a253369735e4.png)

### Firebase Dynamic Links

Thiết lập liên kết động bằng `Firebase` giúp việc triển khai `Deferred deep linking` dễ dàng hơn. `Deferred deep linking` hoạt động giống như `deep links` thông thường cho người dùng ứng dụng hiện tại - trước tiên, người dùng khác phải vào App Store để tải xuống ứng dụng, sau đó xem trang được liên kết trước khi cài đặt hoàn tất. Thực tiễn này được biết là tối ưu hóa chuyển đổi, đặc biệt trong trường hợp người dùng tìm thấy một mặt hàng hấp dẫn trong cửa hàng thương mại điện tử. Nói chung, liên kết sâu hoãn lại có thể cung cấp trải nghiệm người dùng tốt hơn với hiệu suất và khả năng duy trì tốt hơn sau khi tải xuống.
![](https://images.viblo.asia/96bc3ff4-8bcb-4fca-9e38-56ba6e9fc881.png)

### Kết luận:
Và trên là một số thông tin tóm tắt và setup cho deep links và universal links trong iOS. Hi vọng nó sẽ giúp ích cho mọi người.


### Reference: https://medium.com/flawless-app-stories/bring-users-back-to-your-app-deep-linking-for-ios-5c57d8d85c2d