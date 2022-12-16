**Cổng thanh toán** là một dịch vụ Thương mại điện tử được sử dụng để ủy quyền và xử lý các khoản thanh toán bằng thẻ tín dụng và thẻ ghi nợ cho các doanh nghiệp trực tuyến và cửa hàng truyền thống.

Ngày nay, nhiều doanh nghiệp đã chuyển từ các phương thức thanh toán truyền thống (chẳng hạn như chuyển khoản trực tiếp qua ngân hàng) sang các cổng thanh toán vì chúng cho phép thanh toán tức thì, tạo uy tín cho người bán và bảo mật, cùng các lợi ích khác.

Sau đây là ưu, nhược điểm của các loại cổng thanh toán.
### Hosted Payment Gateways - Cổng thanh toán được lưu trữ
**Tiến trình:**

Các cổng thanh toán được lưu trữ sẽ đưa khách hàng ra khỏi trang thanh toán của trang web của bạn. Khi người dùng nhấp vào nút thanh toán ngay tại trang web của bạn, người dùng sẽ được chuyển hướng đến trang nhà cung cấp dịch vụ thanh toán (payment service provider-psp). Tại đây người dùng cần điền vào chi tiết thanh toán của mình. Khi khách hàng đã thanh toán, họ sẽ được chuyển hướng trở lại trang web của bạn để kết thúc quá trình thanh toán.

Một tùy chọn khác là sử dụng iframe. Nhà cung cấp dịch vụ thanh toán (PSP) tạo một biểu mẫu (iframe) mà cửa hàng người bán chèn vào trang web của họ. Bởi người bán này chấp nhận thẻ tín dụng và thẻ ghi nợ một cách an toàn mà không cần thu thập hoặc lưu trữ thông tin thẻ trên trang web của họ. Thông tin thanh toán được thu thập bằng cách sử dụng biểu mẫu (iframe). Biểu mẫu được lưu trữ bởi PSP, vì vậy khi khách hàng điền vào biểu mẫu, PSP sẽ nhận được dữ liệu.

Đối với các khoản thanh toán định kỳ, hồ sơ được tạo cho người dùng với thông tin về số lần lặp lại, tần suất, số tiền, v.v. Cổng thanh toán sẽ khấu trừ các khoản thanh toán định kỳ với sự trợ giúp của hồ sơ đã tạo và sau đó gửi thông báo thanh toán đến trang web của bạn.

Việc hoàn lại tiền và hủy thanh toán cần được xử lý trên trang web của Cổng thanh toán.

Ví dụ nổi tiếng nhất về cổng thanh toán được lưu trữ là PayPal.

**Thông báo:**

URL thông báo có thể được đặt tại trang web của Cổng thanh toán hoặc trong tập lệnh của Cổng thanh toán của bạn. Bất cứ khi nào bất kỳ hoạt động nào được thực hiện để thanh toán, thông báo sẽ được gửi đến url đó và hành động liên quan sẽ diễn ra trên trang web của bạn.

![](https://images.viblo.asia/445cfb08-21a9-4a0d-9436-e94fc65fc36e.png)

**Ưu điểm:**
- Bảo mật:  Thông tin chi tiết về chủ thẻ được nhà cung cấp dịch vụ thanh toán (PSP) của bạn nắm bắt một cách an toàn.
- Đơn giản:  PSP của bạn sẽ đảm nhận tất cả việc thiết lập, vì vậy bạn chỉ cần tập trung vào việc điều hành doanh nghiệp của mình thành công.
- Có thể tùy chỉnh: Có thể thêm logo của bạn vào trang thanh toán để đảm bảo tùy chỉnh.

**Nhược điểm:**

- Trải nghiệm khách hàng - Không thể kiểm soát trải nghiệm đầu cuối.

### Self Hosted Payment Gateways - Cổng thanh toán tự lưu trữ

**Tiến trình:**

Với loại cổng này, chi tiết thanh toán được thu thập từ khách hàng trong trang web của người bán. Sau khi yêu cầu chi tiết, dữ liệu thu thập được sẽ được gửi đến URL của cổng thanh toán. Một số cổng yêu cầu dữ liệu thanh toán được cung cấp ở định dạng cụ thể, trong khi những cổng khác yêu cầu khóa băm hoặc khóa bí mật. 

Trong trường hợp lặp lại các khoản thanh toán tiếp theo sẽ được chính cổng thanh toán khấu trừ và gửi thông báo tương tự. Quá trình hoàn lại tiền và hủy cần được bắt đầu từ trang web của Payment Gateway.

Thanh toán B2B của QuickBooks Commerce và Shopify Payments là những ví dụ về cổng thanh toán tự lưu trữ và cả hai đều được cung cấp bởi Stripe.

**Thông báo:**

Thông báo được gửi dưới dạng bài đăng im lặng bởi cổng thanh toán. Bạn cần phải đề cập đến URL trang web của mình tại trang web Payment Gateways, nơi gửi thông báo. Mỗi khi khoản thanh toán bị trừ, một thông báo sẽ được gửi và tập lệnh của bạn có thể hoạt động tương ứng.

![](https://images.viblo.asia/4eb89fef-f2e1-42d1-8ccd-0ea3c47198c3.png)

**Ưu điểm:**
- Dễ dàng tùy chỉnh - Kiểm soát thanh toán của bạn từ đầu đến cuối và tạo trải nghiệm khách hàng như trên trang web của bạn.
- Trải nghiệm khách hàng: Người mua hàng không bao giờ rời khỏi trang web của bạn, giúp họ tự tin hơn khi hoàn tất giao dịch mua.

**Nhược điểm:**

- Bảo mật - Người bán phải thực hiện các biện pháp bảo mật để bảo vệ dữ liệu của chủ thẻ.

### API /Non Hosted Payment Gateways - Cổng thanh toán không được lưu trữ

**Tiến trình:**

Một số người bán muốn kiểm soát hoàn toàn quy trình thanh toán của họ và không muốn hướng khách hàng từ trang thanh toán của họ. Nếu đây là trường hợp của bạn - thì hãy sử dụng Cổng không được lưu trữ. Nó cho phép khách hàng nhập thông tin thẻ tín dụng hoặc thẻ ghi nợ của họ trực tiếp trên trang thanh toán của bạn và xử lý thanh toán bằng API của họ hoặc sử dụng một số truy vấn HTTPS.

Loại cổng này chủ yếu hỗ trợ thanh toán định kỳ cũng như cố định.

**Thông báo:**

Dựa trên thông tin chi tiết đã nhập, hệ thống sẽ tạo nội bộ một cuộc gọi thanh toán đến cổng thanh toán. Cuộc gọi này có thể là để tạo hồ sơ khách hàng (chỉ định kỳ) tại cổng để thanh toán tự động trong tương lai HOẶC chỉ cho thanh toán một lần. Sau khi tạo cuộc gọi, cổng thanh toán sẽ gửi thông báo đáp lại các cuộc gọi này. Hệ thống cần xử lý nó và xác nhận người dùng để thanh toán thành công hoặc lỗi (nếu có).

Một số cổng thanh toán cũng cung cấp tiện ích cho Yêu cầu thanh toán, Hủy thanh toán (hủy thanh toán trong tương lai), Hoàn lại tiền, v.v.

![](https://images.viblo.asia/c31d2fd4-4eaa-4409-a99f-84f80c902a34.png)

Ví dụ: Stripe, Authorize.net CIM

**Ưu điểm:**

- Tính linh hoạt: Bạn có toàn quyền kiểm soát giao diện người dùng trang thanh toán của mình.
- Trải nghiệm khách hàng: Người mua hàng không bao giờ rời khỏi trang web của bạn, giúp họ tự tin hơn khi hoàn tất giao dịch mua.
- Tính linh hoạt: Bằng cách sử dụng API, bạn có thể tích hợp giải pháp thanh toán qua internet của mình với bất kỳ thiết bị nào được kết nối với internet (điện thoại di động, máy tính bảng, v.v.).

**Nhược điểm:**

- Bảo mật - Tất cả trách nhiệm đối với Tuân thủ PCI DSS nằm trong tay bạn. Việc này sẽ vô hiệu hóa Tuân thủ PCI.
- Dịch vụ - Người bán có thể cần mua chứng chỉ SSL để bảo mật tốt hơn.

### Local bank integration - Tích hợp ngân hàng nội bộ
**Process**

Các cổng tích hợp ngân hàng nội bộ chuyển hướng khách hàng đến trang web của cổng thanh toán (trang web của ngân hàng), nơi họ nhập chi tiết thanh toán và chi tiết liên hệ của mình. Sau khi thực hiện thanh toán, khách hàng được chuyển hướng trở lại trang web của người bán, với dữ liệu thông báo thanh toán được gửi khi chuyển hướng.

Các loại cổng thanh toán này không hỗ trợ thanh toán định kỳ, hoàn lại tiền và hủy.

Ví dụ: Bank Audi, Payseal

**Ưu điểm:**

- Đơn giản - Tùy chọn tốt cho doanh nghiệp nhỏ, những người cần tùy chọn thanh toán một lần.

**Nhược điểm:**

- Nâng cao - Nó không có một số tính năng bắt buộc cơ bản như hoàn lại tiền và thanh toán định kỳ.

### Kết luận: 

Cổng thanh toán bạn chọn phải phụ thuộc vào mô hình kinh doanh của bạn, loại tính năng bạn yêu cầu và mức độ kiểm soát bạn muốn đối với trải nghiệm thanh toán của khách hàng.

Đặc biệt là đối với các doanh nghiệp trực tuyến và nhà bán buôn, cổng thanh toán tự lưu trữ mang lại trải nghiệm hợp lý nhất vì nó cho phép khách hàng hoàn tất giao dịch từ một trang duy nhất và cung cấp cho người bán quyền kiểm soát trải nghiệm của khách hàng. Và, với Thanh toán B2B của QuickBooks Commerce, bạn cũng có thể yên tâm rằng tất cả dữ liệu khách hàng đều được bảo vệ.

Tài liệu tham khảo:[ https://readybytes.in/blog/different-types-of-payment-gateways-in-ecommerce]
[https://www.tradegecko.com/blog/small-business-growth/types-of-payment-gateways-comparative-guide]

Tham khảo bài viết về cổng thanh toán: https://viblo.asia/p/tim-hieu-ve-cong-thanh-toan-payment-gateway-V3m5WvnWlO7

Phương thức thanh toán: https://viblo.asia/p/top-10-phuong-thuc-thanh-toan-truc-tuyen-cho-trang-web-thuong-mai-dien-tu-RQqKL01rK7z