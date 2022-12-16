## 1. GMO payment Gateway là gì?
GMO payment gateway là một cổng thanh toán điện tử của Nhật Bản. Cung cấp các dịch vụ xử lý thanh toán cho các giao dịch thương mại trực tuyến và thẻ tín dụng. Nó cung cấp nhiều phương thức thanh toán khác nhau cho các doanh nghiệp thông qua các cổng thanh toán như thẻ tín dụng, cửa hàng tiện lợi, tiền điện tử, Paypal...

GMO PG cung cấp 3 loại hình kết nối cho việc triển khai hệ thống thanh toán:

1. Protocol type: GMO sẽ cung cấp các đầu API cho việc quản lý thành viên, thẻ và thanh toán. Các thông tin như SiteID, SitePass, ShopId, ShopPass sẽ được sử dụng để gọi được các API này. 
1. Module type: GMO cung cấp cho chúng ta một module(Java, PHP) để xử lý thanh toán có thể tích hợp vào trong máy chủ của website.
1. Link type: Việc thanh toán sẽ được chuyển hướng đến site của GMO, khách hàng sẽ tiến hành nhập thông tin thanh toán bên site của GMO mà không phải nhập thông tin trên website của shop. Việc này đảm bảo an toàn hơn. Giao diện của màn hình thanh toán có thể tùy biến tùy vào config của Shop trên trang quản lý shop của GMO.

Để tìm hiểu thêm về GMO, đăng ký môi trường test và tìm hiểu về loại hình kết nối **Protocol type**  thì mọi người có thể đọc thêm bài viết : [Tìm hiểu về cổng thanh toán GMO](https://viblo.asia/p/tim-hieu-ve-cong-thanh-toan-gmo-3P0lPvMpKox) của tác giả [Tran Cong Trinh](https://viblo.asia/u/trantrinh1102).

> Còn ở bài viết này, mình sẽ giới thiệu loại hình kết nối **Link type**, được nhiều hệ thống ưu tiên sử dụng vì tính ưu việt và đảm bảo an toàn hơn so với loại **Protocol type**.

Gmo payment gateway cung cấp 2 chức năng chính đó là:
* chức năng chỉnh sửa thẻ(card).
* chức năng thanh toán.

## 2. Chức năng chỉnh sửa thẻ.

![](https://images.viblo.asia/52a0dcee-6a83-4950-b65b-c51eece86bd7.png)
Mô tả luồng hoạt động :

1. Người dùng yêu cầu chỉnh sửa thẻ( trên website của shop).
1. Website (phía shop) điều hướng đến Url chỉnh sửa thẻ của GMO.
1. Người dùng nhập thông tin thẻ và nhấn cập nhật (trên site GMO).
1. GMO thông báo về website của shop về việc cập nhật thẻ thành công.
1. GMO hiện thị thông báo cập nhật thẻ thành công cho người dùng.
1. Người dùng nhấn nút quay về trên site GMO, và được chuyển hướng về website của shop.

Vậy trong luồng hoạt động này, thì để điều hướng được người dùng đến site của GMO và nhập thông tin chỉnh sửa thẻ, thì chúng ta cần lấy được URL chỉnh sửa thẻ của GMO và nhúng vào trong trang web của chúng ta. Để mỗi lần người dùng yêu cầu chỉnh sửa thẻ thì chúng ta chỉ cần redirect đến cái Url đấy là được. Còn lại các công việc khác như nhận thông tin thẻ hay lưu lại thì GMO sẽ xử lý hoàn toàn.

Để tạo được URL này thì có 2 cách :
1.  Chúng ta có thể tự tạo ra URL này dựa vào quy tắc mà GMO cung cấp.
1.  Chúng ta gọi API của GMO để GMO trả về cho chúng ta URL.


### 2.1 Tạo URL chỉnh sửa thẻ theo định dạng mà GMO quy định.
Format của URL chỉnh sửa thẻ :
![](https://images.viblo.asia/4089f3f5-cc4e-4e98-a98c-a35fba959d4f.png)

1. Giao thức https (http không khả dụng)
1. Domain GMO: Môi trường production: link.mul-pay.jp. Môi trường test: stg.link.mul-pay.jp
2. Version.
3. Tên của loại thanh toán Gmo plus.
4. ID cửa hàng. (ID cửa hàng của cửa hàng thành viên).
5. Loại chức năng. Chỉ định "member" cho biết chức năng chỉnh sửa thẻ.
6. Bộ tham số được mã hóa base64 + mã băm của nó. ( chi tiết mình sẽ mô tả sau).

Các bước để tạo bộ tham số mã hóa base64 và mã băm (7).
![](https://images.viblo.asia/d13a54aa-bd12-46c7-b2c8-2d45e9d81d8d.png)
Đại loại là sẽ cần tạo ra dữ liệu String từ Json, bao gồm các thông số như trên hình.

Sau đó dùng hàm Base64Encode để mã hóa dữ liệu trên.

Nối đoạn dữ liệu sau khi encode bằng base64 với ShopPass và băm với hàm băm sha256. 
Cái được chú thích (7) trên hình là kết quả  nối chuỗi của base64Encode và hash được phân cách bởi dấu chấm (".").

Code bằng Java như sau:
{@embed: https://gist.github.com/tungpv-0974/a523fe679aab330a5b0029252e584dce}

Các thông tin như shopId, shopPass thì lúc đăng ký GMO sẽ cung cấp cho chúng ta, chi tiết thì đọc bài viết mình có đính kèm ở bên trên nhé!
Còn bộ tham số như configid, member,... thì các bạn đọc chi tiết ở **mục 19.5.1 trang 142** [tài liệu này](https://drive.google.com/file/d/1gcpTEoKt7-_QWgZPqWI4f30RdkKxCr28/view?usp=sharing) nhé.
### 2.2  API get URL do GMO cung cấp.
GMO sẽ cung cấp cho chúng ta đầu API sau để get URL edit member :  **[POST]https://[gmo-url]/payment/GetLinkplusUrlMember.json**

[gmo-url] là thông tin được gửi về trong email lúc chúng ta đăng ký với GMO, xem thêm bài viết  [Tìm hiểu về cổng thanh toán GMO](https://viblo.asia/p/tim-hieu-ve-cong-thanh-toan-gmo-3P0lPvMpKox) của tác giả [Tran Cong Trinh](https://viblo.asia/u/trantrinh1102).

example: https://kt01.mul-pay.jp/payment/GetLinkplusUrlMember.json

Khi chúng ta gọi API này thành công, sẽ nhận được một URL có format như sau:
![](https://images.viblo.asia/bbb4ba9e-968c-4945-93be-41bdf8785e26.png)

Chỉ khác với format URL mà chúng ta tự tạo ở phần 2.1 là nó được chỉ định version là v2. và (7) là một API key chứ không còn là bộ tham số được mã hóa base64 + hash nữa. 
Mình có một đoạn CURL example để call API này như sau: 
```
curl --location --request POST 'https://kt01.mul-pay.jp/payment/GetLinkplusUrlMember.json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "configid": "001",
    "geturlparam":{
        "ShopID": "tshop00001111",
        "ShopPass": "shopPass"
    },
    "member": {
        "MemberID": "sample",
        "MemberName": "Phan Van Tung",
        "Cardeditno": "CardEditNo001"
    }
}'
```
Các tham số chi tiết các bạn đọc ở mục **19.5.1 trang 142** [tài liệu này](https://drive.google.com/file/d/1gcpTEoKt7-_QWgZPqWI4f30RdkKxCr28/view?usp=sharing) nhé.
Và tùy vào ngôn ngữ thì chúng ta implement **external service** để gọi API này cho phù hợp.
Nếu thành công, url sẽ được gửi về trong object response.

### 2.3 Giao diện edit card
example url: 

https://stg.link.mul-pay.jp/v2/plus/tshop00048001/member/96942eeac78906a6b9edaa9db6724dbd3ad928dbf7ccb18ee855880cb42a269a

Chúng ta nhúng url này vào website, khi người dùng request add card thì tiến hành redirect tới url trên và kết quả nhận được như sau:
![](https://images.viblo.asia/e4892918-6579-4492-ba73-f5804a35151f.png)


## 3. Chức năng thanh toán
![](https://images.viblo.asia/52a0dcee-6a83-4950-b65b-c51eece86bd7.png)
Mô tả luồng hoạt động :

1. Người dùng mua hàng, đi đến màn hình thành toán, chọn thanh toán.
1. Website chuyển hướng người dùng đến URL thanh toán của GMO.
1. Người dùng nhập thông tin thanh toán và nhấn xác nhận thanh toán trên site GMO.
1. GMO gửi thông báo transaction về cho site của shop.
1. GMO hiển thị màn hình thanh toán thành công cho người dùng.
1. Người dùng nhấn nút quay về trên site GMO, và được chuyển hướng về website của shop.

Cũng giống như luồng chỉnh sửa thẻ (card) thì luồng thanh toán chúng ta cũng chỉ cần tạo được url để chuyển hướng đến màn hình thanh toán của GMO, và cũng có 2 cách để chúng ta có thể có được url này.
### 3.1 Tạo URL thanh toán theo định dạng mà GMO quy định.
Format của URL thanh toán :
![](https://images.viblo.asia/b36f2478-95e8-451d-aa62-360710db110c.png)
1. Giao thức https (http không khả dụng)
1. Domain GMO: Môi trường production: link.mul-pay.jp. Môi trường test: stg.link.mul-pay.jp
2. Version.
3. Tên của loại thanh toán Gmo plus.
4. shopId. (ID cửa hàng của cửa hàng thành viên).
5. Loại chức năng. Chỉ định "checkout" cho biết chức năng thanh toán.
6. Bộ tham số được mã hóa base64 + mã băm của nó. ( chi tiết mình sẽ mô tả sau).

Các bước để tạo bộ tham số mã hóa base64 và mã băm (7).
![](https://images.viblo.asia/4996e807-003e-4b72-be33-bf426c3451ff.png)
Giống như việc tạo ra url edit card chúng ta có đoạn code example bằng java sau:
{@embed: https://gist.github.com/tungpv-0974/def5dad58a493d84a0b0024837232490}

Bộ tham số cho việc thanh toán các bạn có thể đọc mục **4.5.1 trang 40**  [tài liệu này](https://drive.google.com/file/d/1gcpTEoKt7-_QWgZPqWI4f30RdkKxCr28/view?usp=sharing) nhé.

### 3.2 API get URL payment do GMO cung cấp.
GMO sẽ cung cấp cho chúng ta đầu API sau để get URL payment :  **[POST]https://[gmo-url]/payment/GetLinkplusUrlPayment.json**

[gmo-url] là thông tin được gửi về trong email lúc chúng ta đăng ký với GMO, xem thêm bài viết  [Tìm hiểu về cổng thanh toán GMO](https://viblo.asia/p/tim-hieu-ve-cong-thanh-toan-gmo-3P0lPvMpKox) của tác giả [Tran Cong Trinh](https://viblo.asia/u/trantrinh1102).

example: https://kt01.mul-pay.jp/payment/GetLinkplusUrlPayment.json

Khi chúng ta gọi API này thành công, sẽ nhận được một URL có format như sau:

![](https://images.viblo.asia/81e34a84-dc4f-47b6-868c-030425dfac94.png)

Chỉ khác với format URL mà chúng ta tự tạo ở phần 3.1 là nó được chỉ định version là v2. và (7) là một API key chứ không còn là bộ tham số được mã hóa base64 + hash nữa. 
Mình có một đoạn CURL cho việc lấy url thanh toán bằng hình thức credit card như sau:
```
curl --location --request POST 'https://kt01.mul-pay.jp/payment/GetLinkplusUrlPayment.json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "configid": "001",
    "geturlparam": {
        "ShopID": "tshop00001111",
        "ShopPass": "shopPass"
    },
    "transaction": {
        "OrderID": "0001OR123456",
        "Amount": 200,
        "Tax": 10,
        "PayMethods": [
            "credit"
        ]
    },
    "credit": {
        "JobCd": "CAPTURE",
        "Method": "1",
        "TdFlag": "1",
        "Tds2Type": "1",
        "MemberID": "1234567"
    }
}'
```

Các tham số chi tiết các bạn đọc ở mục **4.5.1 trang 40**  [tài liệu này](https://drive.google.com/file/d/1gcpTEoKt7-_QWgZPqWI4f30RdkKxCr28/view?usp=sharing) nhé.
Và tùy vào ngôn ngữ thì chúng ta implement **external service** để gọi API này cho phù hợp.
Nếu thành công, url sẽ được gửi về trong object response.
### 3.3 Giao diện thanh toán

example url: 

https://stg.link.mul-pay.jp/v2/plus/tshop00048001/checkout/542f23990a856230d497fe668ab0eef95020a076e5b30a0b7038b603bba72e96

Chúng ta nhúng url này vào website, khi người dùng request add card thì tiến hành redirect tới url trên và kết quả nhận được như sau:
![](https://images.viblo.asia/346b6c30-4044-4b21-8297-f62324d68d66.png)

## 4. KẾT LUẬN

> Vậy, để có thể triển khai loại kết nối Link type của GMO( hay còn gọi là GMO plus) thì mấu chốt chúng ta cần tạo ra hoặc lấy được url để nhúng vào website của shop. 
> Khi người dùng yêu cầu chỉnh sửa thẻ hay thanh toán thì điều hướng đến url đấy. Những việc còn lại sẽ do phía GMO xử lý, nên thông tin người dùng được xử lý và lưu trữ bên phía GMO mà không qua bất kỳ bên trung gian nào. Nâng cao độ an toàn về giao dịch và thông tin của người dùng. Vì vậy loại hình này đang được sử dụng nhiều và thay thế cho cách làm cũ, tuy nhiên tài liệu tiếng Việt không có. 

> Trong quá trình làm dự án mình có tìm hiểu tài liệu [GMO plus](https://drive.google.com/file/d/1gcpTEoKt7-_QWgZPqWI4f30RdkKxCr28/view?usp=sharing) và chia sẻ lại ở bài viết này những gì mình đã làm. Vậy nên không tránh việc có thể thiếu sót. Mong mọi người góp ý để mình hoàn thiện hơn.
> Thanks!