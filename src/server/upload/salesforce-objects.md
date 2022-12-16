Nền tảng Salesforce lưu trữ dữ liệu trong các bảng quan hệ. Bản ghi trong các bảng này chứa dữ liệu cho chính cấu trúc của nền tảng này cũng như dữ liệu do người dùng tạo. Ví dụ: dữ liệu về cấu hình và cài đặt của tài khoản đã được tạo sẵn dưới dạng bảng quan hệ. Tuy nhiên, bạn cũng có thể tạo các bảng của riêng mình để lưu trữ dữ liệu cụ thể cho doanh nghiệp của bạn như 'lịch trình gửi hàng' trong một tuần giả sử bạn là công ty chuyển phát nhanh.

Các bảng quan hệ này gần như được gọi là Đối tượng API hoặc chỉ các đối tượng trong Salesforce. Có ba loại đối tượng Salesforce.

Đối tượng tiêu chuẩn - Đối tượng đã được tạo cho bạn bởi nền tảng Salesforce.

Đối tượng tùy chỉnh - Đây là những đối tượng do bạn tạo ra dựa trên quy trình kinh doanh của bạn.

Đối tượng bên ngoài - Các đối tượng mà bạn tạo ánh xạ tới dữ liệu được lưu trữ bên ngoài tổ chức của bạn.

Trong hướng dẫn này, chúng tôi sẽ tập trung vào các đối tượng tiêu chuẩn trong nền tảng Salesforce.

## Đối tượng tiêu chuẩn

Đây là các đối tượng đã tồn tại trong nền tảng Salesforce để quản lý các cấu hình và cài đặt của môi trường. Sau khi đăng nhập vào nền tảng salesforce, bạn có thể thấy các đối tượng có sẵn.

#### Ví dụ
Đối tượng tiêu chuẩn thường được gọi là Đối tượng Tài khoản, là đối tượng lưu trữ thông tin sơ bộ về khách hàng, đối tác, đối thủ cạnh tranh hoặc một tổ chức khác. Chúng ta có thể khám phá đối tượng tài khoản bằng cách thực hiện theo các bước bên dưới.

#### Bước 1
Đăng nhập vào nền tảng Salesforce và theo đường dẫn liên kết **Settings → Setup Home → Object Manager - Account** .

![](https://www.tutorialspoint.com/salesforce/images/stnrd_obj_step_1.JPG)

#### Bước 2
Trong bước này, hãy nhấp vào **Schema Builder**. Nó sẽ hiển thị bảng Tài khoản đầy đủ với tên trường và kiểu dữ liệu. Trong đó có các trường được đánh dấu màu đỏ. Các trường được đánh dấu màu đỏ cho biết rằng bắt buộc phải điền vào các trường khi tạo tài khoản.

![](https://www.tutorialspoint.com/salesforce/images/stnrd_obj_step_2.JPG)

Sử dụng các bước tương tự như trên, chúng ta có thể khám phá tất cả các đối tượng tiêu chuẩn có sẵn.

#### Các standard object quan trọng
Trong phần này, chúng ta sẽ thảo luận về các đối tượng tiêu chuẩn quan trọng trong Salesforce. Bảng sau liệt kê các đối tượng:

|Tên object | Ý nghĩa | Sử dụng|
| -------- | -------- | -------- |
| Account | Đại diện cho một tài khoản cá nhân, là một tổ chức hoặc người có liên quan đến doanh nghiệp như khách hàng, đối thủ cạnh tranh, đối tác, v.v. | Sử dụng đối tượng này để truy vấn và quản lý các tài khoản trong tổ chức của bạn.|
| Account History | Thể hiện lịch sử thay đổi đối với các giá trị trong các trường của tài khoản. | Sử dụng đối tượng này để xác định các thay đổi đối với tài khoản. |
| Case | Đại diện cho một trường hợp, là một vấn đề hoặc sự cố của khách hàng. | Sử dụng đối tượng trường hợp để quản lý các trường hợp cho tổ chức của bạn. |
| Contact | Đại diện cho một địa chỉ liên hệ, là một cá nhân được liên kết với một tài khoản. | Đối tượng này được sử dụng để quản lý các cá nhân được liên kết với một Tài khoản trong tổ chức. |
| User | Đại diện cho người dùng trong tổ chức. | Đối tượng này được sử dụng để truy vấn thông tin về người dùng và cũng giúp cung cấp và sửa đổi thông tin liên quan đến người dùng. |
| Asset | Đại diện cho một mặt hàng có giá trị thương mại, chẳng hạn như sản phẩm được bán bởi công ty hoặc đối thủ cạnh tranh mà khách hàng đã mua và cài đặt. | Đối tượng này được sử dụng để theo dõi các tài sản đã bán trước đó vào tài khoản của khách hàng. Với tính năng theo dõi tài sản, ứng dụng khách hàng có thể nhanh chóng xác định sản phẩm đã được bán trước đây hoặc hiện đang được cài đặt tại một tài khoản cụ thể. |
| Domain | Đối tượng -only đại diện cho một địa chỉ Web tùy chỉnh được gán cho một trang web trong tổ chức của bạn. | Đối tượng read-only này được sử dụng để đối tượng truy vấn các miền được liên kết với mỗi trang web trong tổ chức của bạn. |

## Custom Object 

Dữ liệu của tổ chức sẽ luôn không phù hợp với các đối tượng tiêu chuẩn hiện có. Vì vậy, chúng ta có thể mở rộng và tùy chỉnh nhiều đối tượng lực lượng bán hàng để đáp ứng nhu cầu này. Ví dụ: một công ty chuyển phát nhanh có thể tạo đối tượng tùy chỉnh để lưu trữ lịch trình và chi tiết gửi hàng cho mỗi tuần. Vì vậy, các đối tượng này lưu trữ dữ liệu duy nhất cho doanh nghiệp. Các đối tượng tùy chỉnh cũng có thể có các trường tùy chỉnh cùng với các trường tiêu chuẩn có sẵn trong Salesforce.

### Các tính năng của Custom Object
Sau đây là các tính năng có sẵn trên Customer Object. Các tính năng giúp bạn thực hiện các tính năng sau:

- Xây dựng bố cục trang để kiểm soát trường nào người dùng có thể xem và chỉnh sửa khi nhập dữ liệu cho bản ghi đối tượng tùy chỉnh.
- Nhập bản ghi đối tượng tùy chỉnh.
- Tạo báo cáo và trang tổng quan để phân tích dữ liệu đối tượng tùy chỉnh.
- Tạo tab tùy chỉnh cho đối tượng tùy chỉnh để hiển thị dữ liệu của đối tượng.
- Theo dõi nhiệm vụ và sự kiện cho các bản ghi đối tượng tùy chỉnh.
- Nhập bản ghi đối tượng tùy chỉnh.

### Tạo một Custom Object

Để tạo một đối tượng tùy chỉnh, chúng ta đi đến đường dẫn dòng như được hiển thị trong ảnh chụp màn hình sau:

![](https://www.tutorialspoint.com/salesforce/images/custom_obj_1.JPG)

Bây giờ chúng ta điền thông tin chi tiết của Custom Object mà chúng ta muốn tạo. Có những trường bắt buộc phải được điền trước khi Object có thể được lưu. Trong trường hợp của chúng ta, chúng ta đặt tên cho đối tượng là Delivery Schedule và lưu nó lại.

![](https://www.tutorialspoint.com/salesforce/images/custom_obj_2.JPG)

### Tạo một Custom Field 

Để thêm chi tiết hơn cho dữ liệu doanh nghiệp, chúng ta có thể thêm các trường tùy chỉnh trên Custom Object mà chúng ta đã tạo. Trong trường hợp này, hãy thêm trường gọi là Delivery Date vào Custom Object có tên Delivery Schedule. Để thực hiện việc này, chúng ta thực hiện theo đường dẫn **Setup Home → Objects and Fields → Object Manager → Deliver Schedule**. Sau đó, kéo xuống tab **Fields** và **Relationship** và nhấp vào **New**, trang để thêm Custom Field sau đây, chúng ta điền thông tin chi tiết như hình bên dưới.

![](https://www.tutorialspoint.com/salesforce/images/custom_obj_3.JPG)

Tiếp theo, chúng ta có thể xác minh việc thêm thành công Custom Field ở trên bằng cách theo cùng một đường dẫn liên kết như trên. Custom Field xuất hiện như được hiển thị trong ảnh chụp màn hình sau:

![](https://www.tutorialspoint.com/salesforce/images/custom_obj_4.JPG)

## Tham khảo
https://www.tutorialspoint.com/salesforce/salesforce_standard_objects.htm
https://www.tutorialspoint.com/salesforce/salesforce_custom_objects.htm