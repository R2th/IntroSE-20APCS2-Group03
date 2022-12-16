## Bugzilla là gì?
Bugzilla là một hệ thống theo dõi lỗi / mã nguồn mở cho phép các nhà phát triển theo dõi các vấn đề nổi cộm với sản phẩm của họ. Nó được viết bằng Perl và sử dụng cơ sở dữ liệu MYSQL.

Bugzilla là một công cụ theo dõi và phát hiện, tuy nhiên nó có thể được sử dụng như một công cụ quản lý kiểm thử. Như vậy nó có thể dễ dàng liên kết với các công cụ quản lý test case khác như Quality Center, Testlink, vv.

Trình theo dõi lỗi mở này cho phép người dùng kết nối với khách hàng hoặc nhân viên của họ, để liên lạc về các vấn đề một cách hiệu quả trong chuỗi quản lý dữ liệu.

Các tính năng chính của Bugzilla bao gồm:

* Khả năng tìm kiếm nâng cao
* Thông báo qua email
* Sửa đổi file lỗi bằng e-mail
* Time tracking
* Bảo mật cao
* Khả năng tùy biến
* Có tính cục bộ

Trong hướng dẫn này, chúng ta sẽ tìm hiểu về:

* Đăng nhập vào tài khoản Bugzilla
* Tạo một BugReport
* Tạo báo cáo biểu đồ
* Cách sử dụng chức năng Browser
* Cách sử dụng tùy chọn tìm kiếm đơn giản trong Bugzilla
* Cách thêm hoặc xóa cột vào màn hình tìm kiếm mặc định
* Cách sử dụng tùy chọn tìm kiếm nâng cao trong Bugzilla
* Cách sử dụng tùy chọn trong Bugzilla

## Cách đăng nhập vào Bugzilla

### Bước 1:
Truy cập vào đường dẫn sau đây (https://bugzilla-dev.allizom.org/). Để tạo một tài khoản trong công cụ Bugzilla hoặc để đăng nhập vào tài khoản hiện tại, hãy vào tùy chọn New Account hoặc Login trong menu chính.

![](https://images.viblo.asia/f093b8b8-9810-4fc5-8fc3-36b95bbc8a23.png)

### Bước 2:
Bây giờ, nhập thông tin cá nhân của bạn để đăng nhập vào Bugzilla

1. Tên người dùng
2. Mật khẩu
3. Và sau đó bấm vào "Login"

![](https://images.viblo.asia/925a6231-4c37-4a78-bc25-5f2950b320df.png)

### Bước 3: 
Bạn đã đăng nhập thành công vào hệ thống Bugzilla

![](https://images.viblo.asia/ad7bd27e-7235-41b6-b4b4-d42c19be61fc.png)

## Tạo báo cáo lỗi trong Bugzilla

### Bước 1:
Để tạo một lỗi mới trong Bugzilla, hãy truy cập trang chủ của Bugzilla và nhấp vào tab New từ menu chính

![](https://images.viblo.asia/d1c55c0d-a0c5-4acc-9ace-84e65524c9db.png)

### Bước 2:
Trong cửa sổ tiếp theo

1. Nhập sản phẩm
2. Nhập thành phần
3. Đưa ra mô tả thành phần
4. Chọn phiên bản
5. Chọn mức độ nghiêm trọng
6. Chọn phần cứng
7. Chọn hệ điều hành
8. Nhập Tóm tắt
9. Nhập mô tả
10. Đính kèm tập tin
11. Submit

**LƯU Ý**: Các trường trên sẽ thay đổi tùy theo tùy chỉnh Bugzilla của bạn

![](https://images.viblo.asia/49eaa0ba-55ba-4a9c-9c08-44b4083b2d64.png)


LƯU Ý: Các trường bắt buộc được đánh dấu *.

Trong trường hợp của chúng tôi

* Tổng kết
* Mô tả

Là bắt buộc

Nếu bạn không điền chúng, bạn sẽ nhận được thông báo như bên dưới.

![](https://images.viblo.asia/ecb08249-41b6-4869-9083-62dbe2797250.png)

### Bước 3:
Bug được tạo ID # 26320 được gán cho Bug của chúng tôi. Bạn cũng có thể thêm thông tin bổ sung vào lỗi được chỉ định như URL, từ khóa, bảng trắng, thẻ, v.v. Thông tin bổ sung này rất hữu ích để cung cấp thêm chi tiết về Lỗi bạn đã tạo.

1. Nhập văn bản
2. URL
3. Bảng trắng
4. Từ khóa
5. Thẻ
6. Phụ thuộc
7. Blocks
8. Tài liệu đính kèm
 
![](https://images.viblo.asia/d2de9c38-1f90-4516-9487-7e0057f331a2.png)

### Bước 4:
Vẫn ở cửa sổ này, nếu bạn cuộn xuống bạn có thể chọn deadline và trạng thái của lỗi. Deadline trong Bugzilla thường đưa ra giới hạn để giải quyết lỗi trong khung thời gian nhất định.

![](https://images.viblo.asia/80cbcdee-ce33-4e21-8720-84b4b8088bdf.png)

## Tạo biểu đồ báo cáo

Báo cáo biểu đồ là một cách để xem trạng thái hiện tại của lỗi. Bạn có thể chạy các báo cáo thông qua bảng HTML hoặc biểu đồ cột / tròn. Ý tưởng đằng sau biểu đồ báo cáo trong Bugzilla là xác định một tập hợp các lỗi bằng giao diện tìm kiếm tiêu chuẩn và sau đó chọn một số khía cạnh của tập hợp đó để vẽ trên trục ngang và trục dọc. Bạn cũng có thể nhận được báo cáo 3 chiều bằng cách chọn tùy chọn "Multiple Pages".

Các báo cáo rất hữu ích theo nhiều cách, ví dụ, nếu bạn muốn biết thành phần nào có số lượng lỗi lớn nhất được báo cáo. Để hiển thị điều đó trong biểu đồ, bạn có thể chọn mức độ nghiêm trọng trên trục X và thành phần trên trục Y, sau đó nhấp vào để tạo báo cáo. Nó sẽ tạo ra một báo cáo với thông tin quan trọng.

![](https://images.viblo.asia/72df86e1-b3d1-47ce-863f-1b7ca820c88b.png)

Biểu đồ bên dưới là biểu đồ cột thể hiện mức độ nghiêm trọng của bug trong thành phần "Widget Gears".Ở biểu đồ bên dưới, các lỗi nghiêm trọng nhất (màu đỏ) có số lượng là 88 trong khi các lỗi có mức độ nghiêm trọng bình thường (màu vàng) là 667 lỗi.

![](https://images.viblo.asia/2bde3dc9-5f7f-4621-b562-c0517518132a.png)

Tương tự như vậy, chúng ta sẽ tạo biểu đồ đường, thể hiện quan hệ giữa % hoàn thành và deadline

### Bước 1:
Xem báo cáo của bạn.

* Nhấp vào Reports từ Menu chính
* Nhấp vào Graphical reports

![](https://images.viblo.asia/a255a11e-6b3f-4417-ba17-e0ae49a15c93.png)

### Bước 2:
Hãy tạo một biểu đồ % Hoàn thành Vs Deadline

Ở đây trên trục tung chọn % hoàn thành và trên trục hoành chọn deadline . Điều này sẽ đưa ra biểu đồ về số lượng công việc được thực hiện theo tỷ lệ phần trăm so với thời hạn đã đặt.

Bây giờ, đặt tùy chọn khác nhau để trình bày báo cáo bằng biểu đồ

1. Trục tung
2. Trục hoành
3. Nhiều hình ảnh
4. Loại biểu đồ:  biểu đồ đường, biểu đồ cột hoặc biểu đồ hình tròn
5. Lô dữ liệu
6. Phân loại lỗi của bạn
7. Phân loại sản phẩm của bạn
8. Phân loại thành phần của bạn
9. Phân loại trạng thái lỗi
10. Chọn độ phân giải
11. Bấm vào để tạo một báo cáo

![](https://images.viblo.asia/22468846-6e15-40f3-a3af-a07722668326.png)

Hình ảnh của biểu đồ sẽ xuất hiện như thế này

![](https://images.viblo.asia/730e7af4-b90b-4bf4-8871-d97f7360026e.png)

## Chức năng Browse

### Bước 1: 
Để xác định vị trí lỗi của bạn, chúng tôi sử dụng chức năng browse, nhấp vào nút Browse từ menu chính.

![](https://images.viblo.asia/00b6a133-bc88-43b7-803c-55b12cacfbfe.png)


### Bước 2:
Ngay sau khi bạn nhấp vào nút browse, một cửa sổ sẽ mở ra thông báo "**Chọn danh mục sản phẩm cần duyệt**" như hình dưới đây, chúng tôi duyệt lỗi theo danh mục.

* Sau khi nhấp vào nút browse
* Chọn sản phẩm "Sam's Widget" vì như vậy bạn đã tạo ra một bug bên trong nó

![](https://images.viblo.asia/bd693ab9-2cfc-4221-bd41-74c0062e14a8.png)


### Bước 3:
Một cửa sổ khác hiện ra, click vào **"widget gears"** . Thành phần Bugzilla là các phần phụ của sản phẩm. Chẳng hạn, trong đó sản phẩm của chúng tôi là WIDGET SAM có thành phần là WIDGET GEARS .

![](https://images.viblo.asia/ef94a3bb-cfa4-4600-b636-e71d499ff677.png)


### Bước 4:
Khi bạn bấm vào từng thành phần, nó sẽ mở một cửa sổ khác. Tất cả các lỗi được tạo ra theo loại cụ thể sẽ được liệt kê ở đây. Từ danh sách lỗi đó, chọn ID # bug của bạn để xem thêm chi tiết về lỗi.

![](https://images.viblo.asia/14c6925d-1292-4c74-8bbe-144ffdb2ceba.png)


Nó sẽ mở một cửa sổ khác, nơi thông tin về lỗi của bạn có thể được nhìn thấy chi tiết hơn. Trong cùng một cửa sổ, bạn cũng có thể thay đổi người được assignee, liên hệ QA hoặc danh sách CC.

![](https://images.viblo.asia/9be13807-cd5a-4883-861f-5ef7114c4467.png)


## Cách sử dụng tùy chọn tìm kiếm đơn giản trong Bugzilla

Bugzilla cung cấp hai cách tìm kiếm lỗi, đó là phương pháp tìm kiếm đơn giản và tìm kiếm nâng cao .

### Bước 1:
Trước tiên chúng ta sẽ tìm hiểu phương pháp "Tìm kiếm đơn giản" . Nhấp vào nút tìm kiếm từ menu chính và sau đó làm theo các bước sau

1. Nhấp vào nút "Simple Search"
2. Chọn trạng thái của lỗi - chọn mở nếu bạn đang tìm lỗi trong trạng thái mở và đóng cho lỗi trong trạng thái đóng
3. Chọn danh mục và thành phần của bạn và bạn cũng có thể đặt các từ khóa liên quan đến lỗi của mình
4. Bấm vào tìm kiếm

![](https://images.viblo.asia/a8ab7b91-f305-4c83-89ab-47ea9c0125da.png)

### Bước 2:
Ở đây chúng tôi sẽ tìm kiếm cả hai tùy chọn trạng thái mở và đóng , đầu tiên chúng tôi đã chọn trạng thái đóng cho lỗi và nhấp vào nút tìm kiếm.

![](https://images.viblo.asia/317a3096-9542-422a-9f49-25ce21f3ee86.png)

Đối với trạng thái đóng, nó đã tìm được 12 lỗi.

### Bước 3:
Tương tự như vậy, chúng tôi cũng đã tìm kiếm trạng thái mở và nó đã tìm ra 37 lỗi liên quan đến các truy vấn của chúng tôi.

![](https://images.viblo.asia/dbf0809e-0e7d-4b24-bdb4-1faad0fc2b95.png)


Ngoài ra, ở phía dưới màn hình, bạn có nhiều tùy chọn khác nhau như cách bạn muốn xem lỗi của mình - định dạng XML, Long format hoặc chỉ tóm tắt thời gian . Ngoài ra, bạn cũng có thể sử dụng tùy chọn khác như gửi mail đến người được assignee lỗi, thay đổi một số lỗi cùng một lúc hoặc thay đổi cột của màn hình, v.v.

![](https://images.viblo.asia/db64607c-d291-47f5-90a4-caf460fee449.png)

Trong bước tiếp theo, chúng tôi sẽ trình bày một trong những chức năng thay đổi cột của màn hình , qua đó chúng tôi sẽ tìm hiểu cách thêm hoặc xóa cột.

## Cách thêm hoặc xóa một cột vào màn hình tìm kiếm mặc định

Nhấp vào **thay đổi cột** như trong ảnh chụp màn hình ở trên. Nó sẽ mở một cửa sổ mới.

* Chọn bất kỳ cột nào bạn muốn xuất hiện trong màn hình chính - ở đây chúng tôi đã chọn % hoàn thành
* Nhấp vào nút mũi tên , nó sẽ di chuyển cột % hoàn thành từ cột có sẵn sang cột đã chọn
Các bước này sẽ di chuyển cột được chọn từ trái sang phải.

![](https://images.viblo.asia/7031735d-7c04-4938-81bf-b06bcda88e10.png)

% Hoàn thành được di chuyển từ trái sang phải như hiển thị bên dưới và khi chúng tôi nhấp vào cột thay đổi, nó sẽ xuất hiện trong màn hình chính

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut25.png)

Trước:
Màn hình kết quả tìm kiếm trước khi sử dụng tùy chọn "Thay đổi cột"

* Không có cột % hoàn thành trong kết quả màn hình tìm kiếm như bên dưới

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut26.png)

Sau:
Màn hình kết quả tìm kiếm sau khi sử dụng tùy chọn "Thay đổi cột"

* Bạn có thể thấy cột % hoàn thành được thêm vào bên phải trong cột hiện có trong màn hình chính, không phải là cột trước đó.

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut27.png)

**LƯU Ý**: Tương tự như vậy, bạn có thể loại bỏ hoặc thêm bất kỳ cột nào bạn muốn.

## Cách sử dụng Tìm kiếm nâng cao trong Bugzilla

### Bước 1: 
Sau khi tìm kiếm đơn giản, để thực hiện tính năng tìm kiếm nâng cao bạn cần làm theo các bước sau:

1. Nhấp vào tùy chọn tìm kiếm nâng cao
2. Chọn tùy chọn cho một bản tóm tắt, cách bạn muốn tìm kiếm
3. Nhập từ khóa cho lỗi của bạn.
4. Chọn danh mục lỗi của bạn theo phân loại, ở đây chúng tôi đã chọn Widget
5. Chọn sản phẩm của bạn theo đó bug của bạn đã được tạo
6. Thành phần- Widget gears
7. Trạng thái: Đã xác nhận
8. Giải pháp

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut28.png)


### Bước 2: 
Khi bạn chọn tất cả các tùy chọn, nhấp vào nút tìm kiếm. Nó sẽ phát hiện lỗi bạn tạo

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut29.png)

Tìm kiếm nâng cao sẽ tìm thấy lỗi của bạn và nó sẽ xuất hiện trên màn hình như thế này

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut30.png)

## Cách sử dụng tùy chọn trong BugZilla
Tùy chọn trong Bugzilla được sử dụng để tùy chỉnh cài đặt mặc định do Bugzilla thực hiện theo yêu cầu của chúng tôi.

* Tùy chọn chung
* Tuỳ chọn email
* Tìm kiếm đã lưu
* Thông tin tài khoản
* Quyền

### Tùy chọn chung

Đối với tùy chọn chung , bạn có một tùy chọn khác nhau như thay đổi giao diện chung của Bugzilla, vị trí của khung nhận xét bổ sung, tự động thêm tôi vào cc, v.v ... Ở đây chúng ta sẽ xem cách thay đổi giao diện chung của Bugzilla.

Có nhiều thay đổi bạn có thể thực hiện đó là tự giải thích và bạn có thể chọn tùy chọn theo yêu cầu của mình.


* Thiết lập background của Bugzilla
* Chuyển đến sở thích chung của Bugzilla (Skin)
* Chọn tùy chọn bạn muốn xem là thay đổi và submit thay đổi (Dusk -> Classic)
* Một thông báo sẽ xuất hiện trên cửa sổ cho biết các thay đổi đã được lưu, ngay khi bạn submit các thay đổi

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut31.png)

Sau khi tùy chọn giao diện được đổi thành Classic từ Dusk, màu nền của màn hình xuất hiện màu trắng

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut32.png)


Tương tự như vậy, đối với các thay đổi cài đặt mặc định khác có thể được thực hiện.

### Tuỳ chọn email

Tùy chọn email cho phép bạn quyết định cách nhận tin nhắn.


1. Bấm vào dịch vụ email
2. Bật hoặc tắt thư để tránh nhận thông báo về các thay đổi đối với lỗi
3. Nhận thư khi ai đó yêu cầu đặt cờ hoặc khi ai đó đặt cờ bạn yêu cầu
4. Khi nào và từ ai bạn muốn nhận thư và trong điều kiện nào. Sau khi đánh dấu tùy chọn của bạn ở cuối, submit các thay đổi.

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut33.png)

### Tùy chọn tìm kiếm đã lưu

Tùy chọn tìm kiếm đã lưu cho phép bạn tự do quyết định có chia sẻ lỗi của mình hay không.

### Bước 1:
Nhấp vào các tìm kiếm đã lưu, nó sẽ mở cửa sổ với tùy chọn như sửa lỗi, không chia sẻ, có thể xác nhận, v.v. Chọn tùy chọn theo nhu cầu của bạn.

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut34.png)

### Bước 2:
Chúng tôi có thể chạy lỗi của chúng tôi từ "Tìm kiếm đã lưu".

* Chuyển đến tìm kiếm đã lưu theo sở thích
* Click vào **"Run"**

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut35.png)


Ngay khi bạn chạy tìm kiếm từ tìm kiếm đã lưu, nó sẽ mở ra lỗi của bạn như hiển thị bên dưới

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut36.png)

### Bước 3:
Trong cùng một cửa sổ, chúng tôi cũng có thể chọn người dùng cụ thể mà chúng tôi muốn chia sẻ tìm kiếm bằng cách đánh dấu hoặc bỏ đánh dấu checkbox.

![](https://www.guru99.com/images/1-2015/011015_0940_BugzillaTut37.png)

***(Nguồn: https://www.guru99.com/bugzilla-tutorial-for-beginners.html#3)***