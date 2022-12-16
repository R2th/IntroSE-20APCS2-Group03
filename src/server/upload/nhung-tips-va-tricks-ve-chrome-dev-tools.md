![](https://images.viblo.asia/df9826e3-4ed9-449a-87ad-351b9f6e13fb.jpg)


Chrome Developer Tools là một bộ công cụ siêu mạnh để phát triển các ứng dụng web. Nó có thể làm rất nhiều, từ các hoạt động rất cơ bản như duyệt qua DOM, đến kiểm tra các network requests hoặc thậm chí cấu hình hiệu năng của ứng dụng của bạn.

Trong số các tính năng lớn, hàng ngày họ kích hoạt, có khá nhiều thứ quý giá tìm thấy nếu bạn nhìn đủ sâu. Các tính năng có thể giúp bạn tiết kiệm một hoặc hai lần click - và đó không phải là tất cả những gì chúng ta có ở đây?

#  Các truy vấn DOM kiểu jQuery trong console
JQuery thật tuyệt vời. Nó đã thống trị web trong hơn một thập kỷ và một số thống kê cho biết hơn [70% các trang web](https://en.wikipedia.org/wiki/JQuery#Popularity) phổ biến nhất trên thế giới chạy một số phiên bản của jQuery. Điều đó thật điên rồ đối với một thư viện có từ năm 2006.

API jQuery phổ biến nhất cung cấp là `$`, được sử dụng để chọn các thành phần DOM. Bảng điều khiển công cụ dành cho nhà phát triển Chrome cho phép bạn sử dụng bộ chọn `$` đó và hơn thế nữa. `$` là bí danh của `document.querySelector()`.

Ví dụ: nếu bạn muốn mô phỏng việc click vào một element bạn có thể làm:

![](https://images.viblo.asia/0d11776e-4ebd-4ece-9f83-39acad29b088.png)

Tương tự, $$ là một alias của `document.querySelectorAll()`:

![](https://images.viblo.asia/2398b934-6889-4477-a267-d8e595580671.png)

 
Có một vài thủ thuật nữa. Đôi khi, một selector có thể quá phức tạp để viết bằng trái tim hoặc bạn chỉ không biết một selector cụ thể. Nếu bạn chọn một phần tử trong tab `Elements`, bạn có thể truy xuất phần tử đó với biến `$0` trong console:

![](https://images.viblo.asia/91727eac-2256-4f81-a2b1-0e6d9d2bf946.gif)

 
Console thậm chí còn đi xa hơn, cho phép chúng ta truy cập không chỉ selection cuối cùng, mà cả 5 cuối cùng, theo thứ tự. Các selections được đưa ra thông qua các biến `$0` - `$4`:

![](https://images.viblo.asia/c380b9e0-2c6d-47de-ba6b-6fec0d5fc0ac.gif)

#  Sao chép thuộc tính của element
 
Tab elements là một tab thực sự hữu ích. Nó lưu trữ cây DOM trang web của chúng ta, nó cho phép chúng ta thấy CSS được áp dụng cho từng thành phần và chúng tôi có thể thay đổi các thành phần một cách nhanh chóng từ nó.

Một mẹo thực sự thú vị mà tôi đã tìm thấy là khả năng sao chép các thuộc tính của một phần tử (và không chỉ các thuộc tính) từ context menu.

Ví dụ: bạn có thể sao chép selector của một thành phần:

![](https://images.viblo.asia/2daaa6b2-b7cf-4773-a76c-f61c33ebc1cd.gif)

 
Bộ selector này có thể không đủ cụ thể hoặc quá cụ thể cho production, nhưng sẽ giúp cuộc sống của bạn dễ dàng hơn một chút khi debugging.

Như bạn có thể thấy trong ảnh gif trước, ẩn context menu sao chép một vài điều tiện lợi hơn mà bạn có thể sao chép. Bạn có thể sao chép các kiểu của phần tử, đường dẫn JS (`document.querySelector (SELECTOR)`) hoặc XPath.

# Filtering network requests
 
Đôi khi, bạn làm việc trên một trang có rất nhiều requests.

![](https://images.viblo.asia/6310094f-d99a-4696-9dbb-f28b2b03c659.gif)

 
Làm việc theo cách của bạn thông qua tất cả các requests có thể khó khăn khi bạn tìm kiếm một cái gì đó cụ thể. Rất may, bạn có thể rất dễ dàng lọc các requests.

Thanh công cụ bộ lọc có các nút bật nhanh cho các loại request khác nhau, chẳng hạn như XHR/Fetch, stylesheets, JS scripts, hình ảnh và hơn thế nữa:

![](https://images.viblo.asia/5d0ed664-88c7-429b-a2fe-47f3f6201b6a.gif)

 
Nếu bạn cần phải cụ thể hơn nữa hoặc để bạn có thể tìm thấy nó nhanh hơn, bạn chỉ cần viết tiêu chí lọc trong phần `filter` ngay phía trên thanh công cụ để tìm kiếm tên request:

![](https://images.viblo.asia/2d283a00-d4c5-4d52-a84e-e8b0fb37f011.gif)

# Emulating different network speeds
 
Sử dụng tab `Network`, chúng ta có thể kiểm tra trang web của mình ở nhiều tốc độ internet khác nhau. Giá trị đặt trước mặc định là `online` và bạn sẽ tận hưởng toàn bộ băng thông kết nối internet của mình.

![](https://images.viblo.asia/c51fb0b0-2a65-4656-b5fc-ba777e101bdc.png)
 
Bên cạnh `online`, còn có một vài cài đặt sẵn khác: `Fast 3G`, `Slow 3G` và `offline`, khác nhau về tốc độ tải lên, tốc độ tải xuống và độ trễ. Nếu bạn cần mô phỏng một tốc độ khác lạ hơn, bạn có thể thêm hồ sơ của riêng mình thông qua nút `Add` ...

![](https://images.viblo.asia/a0bbb4bd-bf2e-43e9-a4ba-b730cbb3262c.png)
# Using Live Expressions in console
`Live Expressions` là gì?
`Live Expressions`  là các biểu thức đánh giá liên tục ở đầu bảng điều khiển của bạn. Giả sử, bạn muốn theo dõi giá trị của một biến theo thời gian. Bạn có thể gọi nó nhiều lần:

![](https://images.viblo.asia/139954d7-d643-483c-a4f7-13d09ce9298b.png)

Với `Live Expressions`,  bạn có thể tập trung vào code của mình và để Chrome thực hiện việc giám sát:

![](https://images.viblo.asia/ce7cf8d5-d247-426a-8fc8-83ef3aeb2011.gif)
 
Điều này áp dụng cho các biến được xác định cả trong console và trong script.

# Emulating different devices
 
Những người trong chúng ta làm việc trên các ứng dụng responsive, biết cảm giác bạn làm việc thực sự chăm chỉ để tạo ra một bố cục đẹp, chỉ để thấy nó hoạt động sai trên các thiết bị có độ phân giải khác nhau.

![](https://images.viblo.asia/34ed7f44-ebeb-493d-baaa-767daa932ebf.png)

 
Khi bạn nhấp vào nút trông giống như máy tính bảng và điện thoại, bạn sẽ thấy chế độ xem của trình duyệt thay đổi để phản ánh kích thước của một thiết bị khác.

Bạn có thể chọn một thiết bị từ danh sách các cài đặt trước có chứa nhiều thiết bị phổ biến khác nhau, chẳng hạn như iPhone X, iPad Pro, Pixel 2, Pixel 2 XL và hơn thế nữa. Nó đủ tốt cho hầu hết các trường hợp.

Nếu bạn không thể tìm thấy một thiết bị phù hợp với nhu cầu của mình, bạn có thể đặt độ phân giải tùy chỉnh. Như bạn có thể thấy, tôi đã đặt độ phân giải tùy chỉnh để mô phỏng OnePlus 6.

![](https://images.viblo.asia/45803c16-da00-4347-a5fa-83fdf9631ad3.png)

# Forcing an element's state
 
Bạn đã bao giờ phải đối mặt với một tình huống mà bạn muốn làm việc với một phần tử: CSS `:hover`, nhưng mỗi khi bạn di chuyển chuột đến styles section trong các công cụ dev thì phần tử đó không còn là hover nữa?

Chrome dev tools cho thấy một cách hay để khóa trạng thái của một phần tử, do đó bạn có thể sử dụng các thuộc tính của nó. Bằng cách này, bạn có thể nhanh chóng chuyển đổi một phần tử `:active`, `:hover`, `:focus`, `:focus-within` và `:visited`:

![](https://images.viblo.asia/5e19812b-ec3b-4ebc-b824-8c98764ba435.png)

# Tham khảo
https://www.freecodecamp.org/news/awesome-chrome-dev-tools-tips-and-tricks/