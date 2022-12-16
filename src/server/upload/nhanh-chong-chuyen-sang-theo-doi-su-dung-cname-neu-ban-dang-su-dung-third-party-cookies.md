# Mau mau chuyển sang theo dõi sử dụng CNAME nếu bạn đang sử dụng third-party cookies
1. Bối cảnh
2. Theo dõi dựa trên kĩ thuật CNAME là gì ?
3. Thu thập dữ liệu bằng CNAME
4. Theo dõi tên miền chéo
5. Cài đặt theo dõi CNAME
6. Tài liệu tham khảo
## 1. Bối cảnh
-  Trong bối cảnh theo dõi của third-party cookies hiện nay, đã có nhiều nhiều kỹ thuật bảo vệ quyền riêng tư trong trình duyệt (chẳng hạn như tiện ích mở rộng trình duyệt) đã được thiết kế để bảo vệ người dùng cuối.
-  Do ngày càng nhiều tiện ích mở rộng cho phép chặn theo dõi của bên thứ 3 vì vậy các nhà cung cấp theo dõi đã mất rất nhiều dữ liệu người dùng
-  Mới đây nhất Safari và Chrome đã cập nhật phiên bản mới để chặn cookies từ bên thứ 3 đồng nghĩa với việc người dùng không cần sử dụng tiện ích mở rộng cũng có thể chặn được theo dõi từ bên thứ 3.
-  Do đó đã có một biện pháp theo dõi CNAME giải quyết vấn đề này :laughing:
## 2. Theo dõi dựa trên kĩ thuật CNAME là gì ?
-  Bản ghi CNAME là một loại bản ghi Hệ thống tên miền (DNS) ánh xạ một tên bí danh với một tên miền đúng hoặc chuẩn. 
-  Sử dụng bản ghi CNAME đã trở thành một kỹ thuật mới nổi trong theo dõi web để ẩn các tên miền theo dõi thông thường bị chặn.
![](https://images.viblo.asia/c577667a-c904-464d-8f9a-336c28bac11e.png)
-  Để thực hiện yêu cầu các nhà cung cấp dịch vụ theo dõi yêu cầu khách hàng của họ ủy quyền miền phụ để thu thập dữ liệu và liên kết miền đó với miền bên ngoài bằng bản ghi CNAME.
-  Thực chất kĩ thuật CNAME là sử dụng các bản ghi CNAME để ngụy trang các yêu cầu tới trình duyệt theo dõi của bên thứ 3 là những yêu cầu của bên thứ nhất.

- Ví dụ như ảnh trên: khi người dùng cuối truy cập trang web example.com, nó thực sự nhúng tên miền phụ của bên thứ nhất có tên a.example.com, tên miền này trỏ đến nhà cung cấp theo dõi, ad.com qua CNAME x.ad.com. 

- => Do đó, nhà cung cấp theo dõi ad.com theo dõi hoạt động của người dùng cuối trên trang web, example.com.
## 3. Thu thập dữ liệu bằng CNAME
- Khi cookies được đặt ở máy chủ thu thập dữ liệu, khách hàng cần cấu hình bản ghi CNAME của máy chủ thu thập dữ liệu của họ như một quá trình triển khai cookie bên thứ nhất để tránh các vấn đề từ chối cookie của bên thứ 3
- Cấu hình miền máy chủ thu thập dữ liệu phải khớp với miên trang web của bạn để cookie ID khách truy cập được đặt làm cookie của bên thứ nhất.
- Khi cookie Analytics được đặt bởi máy chủ thu thập dữ liệu, nhiều khách hàng đã định cấu hình bản ghi CNAME của máy chủ thu thập dữ liệu như một phần của quá trình triển khai cookie của bên thứ nhất để tránh các vấn đề với các trình duyệt từ chối cookie của bên thứ ba. Quá trình này định cấu hình miền máy chủ thu thập dữ liệu của bạn để khớp với miền trang web của bạn để cookie ID khách truy cập được đặt làm cookie của bên thứ nhất.
- Máy chủ thu thập dữ liệu cũng có thể sử dụng để thu thập dữ liệu từ các máy chủ được cài đặt CNAME khác
## 4. Theo dõi tên miền chéo
1. Khách hàng có tên miền chính là: abc.com
2. Máy chủ thu thập dữ liệu là: tracking.abc.com
- Khi người dùng truy cập vào abc.com, cookie của dịch vụ được đặt bởi máy chủ thu thập dữ liệu. Điều này cho phép máy chủ thu thập dữ liệu sử dụng cookie trong ngữ cảnh của bên thứ nhất hoặc là chỉ cookie của bên thứ nhất.

**Lưu ý:** Safari và chrome hiện nay đã chặn tất cả cookie trong ngữ cảnh của bên thứ ba bất kể chúng được đặt như thế nào
## 5. Cài đặt  theo dõi CNAME
 - Mỗi một nhà cung cấp tên miền đều hỗ trợ cài đặt CNAME một cách dễ dàng
 - Chúng ta chỉ thêm mới một CNAME và trỏ tới máy chủ thu thập dữ liệu
 
 Ví dụ: ![](https://images.viblo.asia/5d7f31db-a4a0-4ac6-9235-18a1a388d2b7.png)
 ## 6. Tài liệu tham khảo
 - Các bạn có thể tham khảo thêm tại đây:
1.  https://blog.apnic.net/2020/08/04/characterizing-cname-cloaking-based-tracking/
2.  https://docs.adobe.com/content/help/en/id-service/using/reference/analytics-reference/cname.html