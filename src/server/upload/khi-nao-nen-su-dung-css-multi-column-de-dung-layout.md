## Tổng quan
CSS Multi-column thường bị bỏ qua khi chúng ta sử dụng CSS Grid và Flexbox để dựng Layout. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu sự khác nhau giữa CSS Column và các phương pháp dựng Layout khác cũng như 1 số Layout nên sử dụng CSS Multi-column. CSS Multi-column thường được gọi tắt là CSS Columns. Chúng ta cũng sẽ tìm hiểu khi nào sử dụng CSS Columns và 1 số điều lưu ý khi sử dụng nó.
## Multi-column là gì?
Ý tưởng cơ bản của Multi-column là bạn có thể lấy một đoạn nội dung và chuyển nó thành nhiều cột như trong một tờ báo. Bạn làm điều này bằng cách sử dụng một trong hai thuộc tính. Thuộc tính `column-count` xác định số cột mà bạn muốn nội dung hiển thị. Thuộc tính `column-width` xác định chiều rộng số cột mà bạn muốn nội dung hiển thị. Sẽ không có vấn đề nào xảy ra đối với Layout của chúng ta vì nội dung vẫn hiển thị theo Normal Flow và được chia thành nhiều cột với độ rộng xác định. Điều này làm cho CSS Columns không giống như các phương thức dựng Layout khác mà chúng ta có trong các trình duyệt hiện nay. Ví dụ như Flexbox hay CSS Grid sẽ lấy các phần tử bên trong container của nó để hiển thị dạng Flexbox hoặc Grid không theo Normal Flow.

Trong ví dụ dưới đây, chúng ta sử dụng thuộc tính `column-width` để hiển thị độ rộng của một cột ít nhất là 14em. CSS Columns gán các cột với độ rộng 14em sao cho phù hợp và chia khoảng cách hiển thị  giữa các cột. Các cột được tạo ra sẽ mặc định sẽ hiển thị responsive, chúng ta không cần Media Query và thay đổi số column giữa các màn hình khác nhau, thay vào đó chúng ta thay đổi chiều rộng phù hợp với các màn hình khác nhau.

{@embed: https://codepen.io/rachelandrew/pen/xmyzad}

## Style Colums
Các cột sẽ được tạo ra khi chúng ta sử dụng một trong các thuộc tính CSS Columns để dựng Layout. Chúng ta không thể sử dụng Javascript để giải quyết vấn đề này. Bạn cũng không thể style một box riêng lẻ để tạo `background-color` hoặc điều chỉnh `padding` và `margin` . Tất cả các cột sẽ có cùng chiều rộng. Điều duy nhất bạn có thể làm là thêm rule giữa các cột sử dụng thuộc tính `column-rule` mà nó hiển thị  tương tự như border. Bạn cũng có thể kiểm soát khoảng cách giữa các cột sử dụng thuộc tính `column-gap`với giá trị mặc định là **1em**, tuy nhiên chúng ta có thể thay đổi chúng bằng bất kỳ giá trị nào chúng ta muốn. 
{@embed: https://codepen.io/rachelandrew/pen/OrBErd}

Trên đây là các chức năng cơ bản của CSS Columns. Bạn có thể lấy một đoạn nội dung và chia nó thành các cột. Nội dung sẽ lần lượt điền vào các cột, tạo các cột theo hướng inline. Bạn có thể kiểm soát các khoảng trống giữa các cột và thêm rule với các giá trị giống như thuộc tính `border`.  Hiện nay, các thuộc tính trên đã tương thích rất tốt trên các trình duyệt và hiện nay có thể sử dụng phổ biến. Sau đây chúng ta sẽ tìm hiểu thêm một số thuộc tính khác của CSS Columns cũng như 1 số vấn đề tiềm ẩn khi sử dụng CSS Columns. 
## Spanning Columns
Đôi khi chúng ta muốn chia một số nội dung thành các cột, nhưng sau đó làm cho một phần tử có độ rộng bằng độ rộng của container trên các cột. Sử dụng thuộc tính `colum-span` cho các phần tử bên trong container của CSS Columns để đạt được điều này. 
{@embed: https://codepen.io/rachelandrew/pen/YdJvgv}
## Kiểm soát content Breaks
Giả sử chúng ta có nội dung chứa các tiêu đề và chúng ta muốn tránh tình huống một tiêu đề kết thúc như là điều cuối cùng trong một cột với nội dung đi vào cột tiếp theo. Nếu bạn có hình ảnh với chú thích thì tình huống lý tưởng sẽ là hình ảnh và chú thích ở dạng một đơn vị không bị chia thành các cột. Để giải quyết những vấn đề này, CSS có các thuộc tính để kiểm soát nơi nội dung bị phá vỡ.

Khi bạn chia nội dung của mình thành các cột, bạn thực hiện cái được gọi là phân mảnh. Điều tương tự cũng đúng nếu bạn chia nội dung của mình giữa các trang, chẳng hạn như khi bạn style cho ngữ cảnh máy in.
{@embed: https://codepen.io/rachelandrew/pen/PXyBrN}
## Những vấn đề của CSS Columns trên Web
Một lý do tại sao chúng ta không thấy nhiều CSS Columns  được sử dụng nhiều trên web là vì nó sẽ rất dễ dàng để kết thúc với trải nghiệm đọc khiến người đọc cuộn theo kích thước khối. Điều đó có nghĩa là cuộn lên xuống theo chiều dọc đối với những người trong chúng ta sử dụng tiếng Anh hoặc chế độ viết dọc khác. Đây không phải là một kinh nghiệm đọc tốt!

Nếu bạn sửa chiều cao của container, ví dụ bằng cách sử dụng đơn vị `vh` và có quá nhiều nội dung, thì hiện tượng tràn sẽ xảy ra theo hướng nội tuyến và do đó bạn sẽ có một thanh cuộn ngang thay thế. Cả hai điều này đều không lý tưởng và việc sử dụng CSS Column trên web là điều chúng ta cần suy nghĩ rất kỹ về lượng nội dung mà chúng ta có thể hướng đến để chuyển vào các cột.
## Lợi ích của CSS Column trong dựng Layout?
Với đặc điểm kỹ thuật hiện tại, việc chia tất cả nội dung của bạn thành các cột mà không cần xem xét các vấn đề về việc scroll được khuyển khích sử dụng. Tuy nhiên, có một số trường hợp mà CSS Column là lý tưởng trên web.
CSS Column hữu ích ở bất kỳ nơi nào bạn có một danh sách nhỏ các mục mà bạn muốn chiếm ít không gian hơn. Ví dụ, một danh sách đơn giản các checkbox, hoặc một danh sách các tên. Thông thường, khách truy cập không đọc xuống một cột và sau đó quay lại đầu trang tiếp theo mà lướt qua nội dung sau đó nhấp vào 1 mục để chọn. Ngay cả khi bạn tạo ra trải nghiệm scroll, nó có thể không thành vấn đề.
- **Table of content**

Bạn có thể xem trang web sử dụng trong trường hợp này ở [đây.](https://www.donarmuseum.nl/spelers/)

![](https://images.viblo.asia/b3e978fd-39bc-4690-9162-4edde534da1e.png)
- **Masonry Display Content**
Một trường hợp mà CSS Columns hoạt động rất đẹp là nếu bạn muốn tạo kiểu hiển thị nội dung Masonry. CSS Column là phương pháp duy nhất hiện sẽ tạo ra loại Layout này với các mục có chiều cao không bằng nhau. Bạn có thể xem trang wwebswur dụng trường hợp này ở [đây](https://veerle.duoh.com/inspiration).

![](https://images.viblo.asia/3cd9b555-83b5-4604-b206-f46fe71d1ab5.png)

## Kết luận
CSS Column không được sử dụng phổ biến trước đây nhưng hiện tại đang dần trở lên phổ biến hơn. Hãy tìm hiểu về nó và sử dụng trong Project của các bạn nhé.

### Nguồn tham khảo: 
- https://www.smashingmagazine.com/2019/01/css-multiple-column-layout-multicol/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fragmentation