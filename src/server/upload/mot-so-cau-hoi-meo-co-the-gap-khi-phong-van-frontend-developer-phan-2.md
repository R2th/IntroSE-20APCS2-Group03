Ở phần trước, mình đã giới thiệu với các bạn một số câu hỏi có thể gặp khi đi phỏng vấn Frontend Developer. Hôm nay, mình sẽ tiếp tục gửi đến các bạn thêm một số câu hỏi nữa về vấn đề này. Hi vọng sẽ giúp ích cho các bạn!

Các bạn có thể xem phần một tại [đây](https://viblo.asia/p/mot-so-cau-hoi-meo-co-the-gap-khi-phong-van-frontend-developer-phan-1-RQqKLvPpl7z)

# 1. Thuộc tính data trong HTML dùng để làm gì?
Thuộc tính data-* được giới thiệu trong HTML5 dùng để lưu trữ dữ liệu trực tiếp trên trang HTML. Trong đó * phải gồm ít nhất một ký tự trở lên và không dùng chữ in hoa.

Sử dụng thuộc tính data-* chúng ta có thể lưu trữ dữ liệu trên trang HTML mà không cần phải gửi yêu cầu (thường thông qua AJAX) lên máy chủ. Dữ liệu này sau đó có thể lấy ra thông qua JavaScript.

Ví dụ sử dụng jQuery bạn có thể lấy ra giá trị của thuộc tính data-user-id của phần tử <div> có giá trị ID là my-div như sau:
    
`$("#my-div").data("user-id");`

# 2. Sự khác nhau giữa localStorage, sessionStorage và cookie
* localStorage
    * Khả năng lưu trữ vô thời hạn: Có nghĩa là chỉ bị xóa bằng JavaScript, hoặc xóa bộ nhớ trình duyệt, hoặc xóa bằng localStorage API.
    * Lưu trữ được 5MB: Local Storage cho phép bạn lưu trữ thông tin tương đối lớn lên đến 5MB, lưu được lượng thông tin lớn nhất trong 3 loại.
    * Không gửi thông tin lên server như Cookie nên bảo mật tốt hơn.

* sessionStorage
    * Lưu trên Client: Cũng giống như localStorage thì sessionStorage cũng dùng để lưu trữ dữ liệu trên trình duyệt của khách truy cập (client).
    * Mất dữ liệu khi đóng tab: Dữ liệu của sessionStorage sẽ mất khi bạn đóng trình duyệt.
    * Dữ liệu không được gửi lên Server
    * Thông tin lưu trữ nhiều hơn cookie (ít nhất 5MB)

* cookie
    * Thông tin được gửi lên server
    * Cookie chủ yếu là để đọc phía máy chủ (cũng có thể được đọc ở phía máy khách), localStorage và sessionStorage chỉ có thể được đọc ở phía máy khách.
    * Có thời gian sống
    * cho phép lưu trữ tối đa 4KB và vài chục cookie cho một domain.

# 3. Phân biệt các giá trị của box-sizing
* content-box: Giá trị mặc định, nghĩa là giá trị width và height chỉ áp dụng cho khu vực nội dung bên trong, không bao gồm padding, border và margin.
* border-box: Khi thiết lập giá trị này, thì width và heigh sẽ bao gồm cho cả phần nội dung, padding và border nhưng không bao gồm margin.
* padding-box: Với giá trị này thì width và height chỉ bao gồm cho phần nội dung và padding, không bao gồm border và margin.

# 4. CSS Box Model gồm những thành phần nào?

* Content: là phần xuất hiện của text và hình ảnh. Tổng kích cở của text bao nhiêu (có thể lớn nhỏ nếu chúng ta tùy chỉnh font-size) hay hình ảnh bao lớn thì đó cũng là kích cở của content.
* Padding: là thuộc tính dùng để tạo ra một vùng khoảng trống bao bọc xung quanh content và nằm bên trong border
* Border: là thuộc tính nằm bên ngoài padding, dùng để định dạng đường viền cho thành phần
* Margin: lớp cuối cùng của Box Model, dùng để tạo khoảng cách xung quanh element để cách element đó với các thứ khác

# 5. Sự khác nhau giữa Responsive Design (RD) và Adaptive Design (AD)
* RD phù hợp với việc thay đổi sự hiển thị trên những thiết bị khác nhau trong khi AD thay đổi thiết kế và đáp ứng cho một tập hợp các thiết bị và kích thước màn hình.
* AD có thể xây dựng trên một trang web đã có từ trước. Đối với RD thì bạn phải thiết kế website gần như lại từ đầu.
* AD hỗ trợ hiển thị trang web riêng bằng URL riêng biệt hoặc theo mã HTML / CSS riêng biệt. RD chỉ dựa vào HTML/CSS3 và Javascript.
* RD liên quan nhiều hơn tới code và chiến lược thực hiện trong khi AD tiếp cận dựa vào kích thước màn hình đã được xác định trước.
* RD cung cấp hình ảnh gốc sau đó chỉnh lại kích thước cho phù hợp với màn hình mà nó hiển thị trong khi AD đã có sẵn hình ảnh được điều chỉnh cho độ phân giải cụ thể.

# 6. Việc sử dụng phần tử *canvas* trong HTML5
`<canvas>` là phần tử trong HTML5 mà chúng ta có thể sử dụng để vẽ đồ họa sử dụng kịch bản (JavaScript). Phần tử này hoạt động như một container cho đồ họa và phần còn lại sẽ được thực hiện bởi kịch bản. Chúng ta có thể vẽ hình ảnh, đồ thị và một chút hình ảnh động Etcetera sử dụng phần tử `<canvas>`

```
<canvas id="canvas1" width="300" height="100"></canvas>
```

# Lời kết
Trên đây là một số câu hỏi mà rất có thể nhà tuyển dụng có thể dùng để "chơi" chúng ta. Hy vọng phần 2 này sẽ giúp ích thêm cho các bạn trong những cuộc "đối đầu" với các nhà tuyển dụng trong tương lai!!!

Tham khảo: https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/master/Translations/Vietnamese#c%C3%A1c-c%C3%A2u-h%E1%BB%8Fi-v%E1%BB%81-css

Xem tiếp phần 3 tại [đây](https://viblo.asia/p/mot-so-cau-hoi-co-the-gap-khi-phong-van-frontend-developer-phan-3-gDVK2Qqe5Lj)