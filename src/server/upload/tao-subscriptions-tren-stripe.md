Bài viết được tham khảo từ nguồn:
https://stripe.com/docs/billing/subscriptions/creating

# 1. Stripe là gì?
Stripe là một cổng thanh toán của Hoa Kỳ cho phép các trang thương mại điện tử nhận thanh toán trên website bán hàng của mình. Những quốc gia Stripe chấp nhận thì bạn mới có thể đăng ký tài khoản và nhận thanh toán được hiện tại Việt nam chưa nằm trong danh sách mà Stripe chấp nhận cho cổng thanh toán này.

# 2. Hướng dẫn thiết lập Suscription.
Hướng dẫn thiết lập một Subscription chạy qua tích hợp subscription cơ bản. Tuy nhiên, tính linh hoạt tích hợp sẵn của Stripe Billing cho phép các biến thể subscription gần như vô hạn phù hợp với nhu cầu của khách hàng của bạn. Ví dụ, bạn có thể tạo các Subscription này:

- Thêm chi phí một lần
- Giảm một vài khoản thanh toán thuê bao, hoặc tất cả chúng
- Thuế
- Tạo thời gian dùng thử miễn phí
- Theo dõi một khách hàng với nhiều Plan
- Kiểm soát thông tin payment khi khách hàng được lập hóa đơn.

Trong bài này bao gồm các mục:
+ Đăng ký các thành phần cơ bản của Subscription
+ Liên kết với các hướng dẫn cho các tùy chọn này và tùy chọn khác.

# 3. Định nghĩa Product và Plan

Một subscription cụ thể trước tiên được quyết định bởi Plan. Plan được set thông qua các yếu tố sau:
+ Đơn giá (Unit cost)
+ Khoảng thời gian thanh toán (Billing interval)
+ Tiền tệ (Currency)

Cả ba thuộc tính này đều được cố định trên một Plan sau khi được tạo, không thể cập nhật giá trị của các thuộc tính này sau đó. Thay vào đó, bạn có thể tạo một Plan mới với các đặc điểm mong muốn khác.

Tiền tệ được cố định không chỉ trên gói mà còn cho khách hàng: Một khi khách hàng bắt đầu đăng ký bằng một loại tiền cụ thể, đối tượng Khách hàng đó trong Stripe chỉ có thể được tính loại tiền đó mà không thể thay đổi được muốn thay đổi bạn phải tạo một account trên Stripe.

Mỗi Plan được đính kèm với một sản phẩm, đại diện cho ứng dụng hoặc dịch vụ được cung cấp cho khách hàng (Ví dụ: Khách hàng là Platinum, Gold...)

Mỗi sản phẩm có thể có nhiều hơn một gói, phản ánh các biến thể về giá và thời gian, chẳng hạn như giá hàng tháng và hàng năm ở các mức giá khác nhau. 

# 4. Thay đổi số tiền trên hóa đơn
Kế hoạch xác định chi phí cơ bản của một subscription, nhưng số tiền thực sự được lập hóa đơn cho khách hàng ở mỗi khoảng thời gian có thể được điều chỉnh trên cơ sở mỗi khách hàng sử dụng:
+ Thanh toán đồng hồ đo
+ Chuẩn bị
+ Phiếu giảm giá để tạo giảm giá
+ Thuế
+ Nhiều subscription (nghĩa là đăng ký đồng thời cho nhiều gói)

=> Những điều chỉnh này có thể được thực hiện khi subscription được tạo hoặc thay đổi thành thuê bao hiện có. Điều chỉnh hóa đơn một lần cũng có thể được thực hiện bằng cách sử dụng các mục hóa đơn.

# 5. Cách tạo sản phẩm theo Plan đính kèm.
Bài toán cụ thể: 
Ứng dụng về Book phòng, khách hàng khi đăng ký có gói dịch vụ là: Diamond, Gold. Phí mỗi tháng mà khách phải trả tương đương như bảng sau:

![](https://images.viblo.asia/34890f77-bc10-452e-b449-bd1932278178.png)

Step 1:
Đi đến trang Product:
https://dashboard.stripe.com/test/subscriptions/products
Step 2: Tạo Plan: Diamond và Gold
![](https://images.viblo.asia/00341082-129d-4ebd-a0b6-1ef2658f3272.png)

Step 3: Fill thông tin
![](https://images.viblo.asia/d42c073b-82ef-45c7-b2f9-fc1c41988ef4.png)

Step 4: Fill thông tin Subscription Monthly
![](https://images.viblo.asia/d1942c7f-2165-46e1-b7bc-069d6e781110.png)
Tương tự theo năm cũng như vậy.

Step 5:
Chú ý thông tin ID của từng Plan để setting trên Admin
![](https://images.viblo.asia/a9987fad-bb04-46e9-bb10-18391103085c.png)

Như vậy là chúng ta đã tạo được Subscription mỗi tháng rồi.

*Các khoảng thời gian thanh toán mà Stripe sử dụng cho dịch vụ thanh toán gồm:*

+ Daily
+ Weekly
+ Every 3 months
+ Every 6 months
+ Yearly
+ Custom

![](https://images.viblo.asia/f9a2e1fb-e31c-4d11-a470-e3224bf9096e.png)

Khoảng Custom setting như sau:
![](https://images.viblo.asia/e85082fa-d5c5-44ca-9564-fa7a5bb7f57b.png)
Có nghĩa là chúng ta sẽ có thể setting 2 ngày, 3 tuần, 3 tháng. Điều đó có nghĩa là nếu 3 tháng thì sẽ tương đương với một quý.

# Ứng dụng vào trong testing của chúng ta như thế nào với Custom?
Việc testing mà đợi cho đến 1 tháng, 1 năm sau mới có thể check được kết quả thì có khi là hệ thống của chúng ta đã release lâu rồi. Vì vậy việc setting trong Custom rất tiện lợi cho chúng ta test hệ thống.
Thay vì việc đợi một tháng mới biết hệ thống có thanh toán subscription có đúng hay không thì chúng ta có thể setting bằng việc đợi một ngày thôi.
Làm thế nào để test được như vậy? Setting khoảng Custom là:  1 days
![](https://images.viblo.asia/36932b6f-af5a-443c-b674-a533734f48da.png)
Tương tự như vậy đối với một năm chúng ta setting khoảng Custom là: 2 days cho loại subscription theo năm.

# Kết luận:
Qua bài này các bạn có thể mường tượng được phần nào cách check payment đối với hệ thống thương mại điện tử dùng qua bên thứ ba là Stripe. Mọi thứ chỉ trở nên phức tạp khi chúng ta không biết thôi, còn đã biết thì rất đơn giản đúng không ạ?
Cám ơn các bạn đã dành thời gian đọc bài viết ạ!