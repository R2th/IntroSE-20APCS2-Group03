Bây giờ, bạn có thể sử dụng Chrome DevTools để có thể kiểm tra trực quan CSS Grids của bạn và gỡ lỗi chúng.

CSS Grid là một mô-đun bố cục cho phép bạn thiết kế và phát triển các web phức tạp, đáp ứng hiệu quả hơn trong khi vẫn duy trì tính nhất quán giữa các trình duyệt.

> Đối với một nhà phát triển, CSS Gird là một công cụ giúp giải quyết những thứ như khả năng tái sử dụng code, kích thước màn hình, tốc độ tải trang, v.v. Đồng thời, đối với nhà thiết kế, nó hỗ trợ truyền tải thông điệp của khách hàng một cách hiệu quả.

Nói cách khác, cả nhà phát triển và nhà thiết kế chủ yếu được hưởng lợi từ CSS Grid. Do đó, trong bài viết này, tôi sẽ hướng dẫn bạn kiểm tra và gỡ lỗi các vấn đề về bố cục trang bằng Chrome DevTools.

## Debugging CSS Grids with Chrome DevTools

Khi bạn thiết kế các trang web của mình, bạn đã bao giờ cảm thấy rằng bạn cần phải xem các đường lưới chồng lên nhau như thế nào, số dòng hoặc tên vùng lưới chưa? Hiểu được những gì đang diễn ra đằng sau hậu trường của CSS Grid sẽ rất hữu ích, phải không?

### Bây giờ, hãy xem cách chúng ta có thể kiểm tra và gỡ lỗi các vấn đề về bố cục bằng Chrome DevTools

Bắt đầu với Grid debugging. Khi áp dụng `display: grid` hoặc `display: inline-grid` cho một phần tử HTML, bạn có thể nhìn thấy huy hiệu `grid` bên cạnh phần tử trong bảng Elements. Nếu bạn di chuyển con trỏ chuột qua huy hiệu `grid`, bạn có thể thấy rằng một lớp phủ xuất hiện trên phần tử, giống như một lưới để hiển thị vị trí của các đường lưới và viền của nó

![](https://images.viblo.asia/b3562c2c-4569-49d8-bd4f-85f68d1d8893.png)

Như bạn có thể thấy, có một phần mới được gọi là **Grid** trong tab `Layout`, chứa một số tùy chọn giúp bạn kiểm tra lưới tốt hơn

> Mẹo: Nếu chế độ **Layout** không xuất hiện ở cuối Chrome DevTools, hãy mở commands (Ctrl + Shift + P) và chọn tùy chọn *Enable new CSS Grid debugging features*. Bạn có thể cần reload lại DevTools để áp dụng các thay đổi

## 1. Grid Overlays

Phần này chứa danh sách tất cả các lưới có trên trang với checkbox và bằng cách bật và tắt lớp phủ lưới, bạn có thể chọn các lưới mà bạn muốn gỡ lỗi. Trong **Grid overlays**, bạn có thể:

### Enable Overlay Views of Multiple Grids

![](https://images.viblo.asia/e6a35a5a-9f77-43af-ab97-4930468ed6b5.png)

Bằng cách chọn checkbox tương ứng, bạn có thể bật và tắt lớp phủ lưới. Trong ví dụ đã cho, cả hai lớp phủ lưới đều được bật, mỗi lớp được biểu thị bằng một màu khác nhau

### Customize the Grid Overlay Color

Tùy chọn này giúp bạn xác định các lưới của mình một cách dễ dàng bằng cách cho phép bạn chọn một màu tùy ý

![](https://images.viblo.asia/1fb9c173-8ad5-47c6-8a59-b4783655c7a9.png)

### Highlight the Grid

Bạn có thể highlight phần tử HTML bằng cách nhấp vào biểu tượng highlight

![](https://images.viblo.asia/afb074b1-7eb9-4f38-bdea-6f0daeb790ad.png)

## 2. Overlay Display Settings

Phần này bao gồm một số tùy chọn như hiển thị số dòng, hiển thị tên dòng, v.v. Hãy xem những tùy chọn đó có ý nghĩa gì và công dụng của chúng là gì

### Show line numbers

Theo mặc định, số dòng được hiển thị trên lớp phủ lưới

![](https://images.viblo.asia/ebde9f27-5b81-4646-baf3-be85821bd2f8.png)

### Show Line Names

Chọn tùy chọn này từ danh sách sẽ hiển thị tên dòng thay vì số

![](https://images.viblo.asia/92241fc9-2c63-4ae9-b8a2-7f37463c366d.png)

Hiển thị tên dòng giúp dễ dàng hình dung vị trí đầu và cuối của một phần tử. Như bạn có thể thấy trong ví dụ trên, có bốn dòng: left, middle1, middle2 và right. Hơn nữa, phần tử được đánh số theo thứ tự từ trái sang phải

### Hide Line Labels

Tương tự như vậy, bạn có một tùy chọn để ẩn các nhãn dòng và số dòng cho mỗi lớp phủ lưới

![](https://images.viblo.asia/73c077b1-b368-47d9-a7af-59b2f7559ef6.png)

### Show Track Sizes

Bằng cách bật tùy chọn này, bạn có thể xem kích thước của lưới. DevTools hiển thị [authored size].[computed size] cho mỗi dòng, trong đó *authored size* là kích thước được định nghĩa trong stylesheet và *computed size* là kích thước thực trên màn hình

![](https://images.viblo.asia/af39b39e-8b8b-44cd-869b-37a6e77200fa.png)

Như bạn có thể thấy ở trên, đối với mỗi cột, cả *authored size* và *computed size* đều được hiển thị. Tuy nhiên, đối với các hàng, chỉ có thể nhìn thấy *computed size*. Đó là vì kích thước cột được xác định trong CSS và đối với các hàng, không có kích thước hàng nào được định nghĩa

### Show Area Names

Bạn có thể chuyển đổi để hiển thị hoặc ẩn tên khu vực, trong ví dụ này các khu vực lưới được đặt tên. Như bạn có thể thấy trong ví dụ sau, có bốn vùng trong Grid - top1, top2, top3 và bottom

![](https://images.viblo.asia/6fb29d56-4a48-4b1d-95c2-d27dff380cf1.png)

### Extend Grid Lines

Theo mặc định, các grid lines chỉ có thể được nhìn thấy bên trong phần tử có `display: grid` hoặc `display: inline-grid`. Bằng cách chọn tùy chọn này, bạn có thể mở rộng các grid lines đến cạnh viền màn hình

![](https://images.viblo.asia/aa4e5581-9b5e-4b7b-bda5-c878b5fd8c30.png)

Như bạn có thể thấy, tất cả các tùy chọn được đề cập ở trên giúp chúng ta giảm thời gian xác định các block được hiển thị như thế nào.

## Cuối cùng

Mặc dù có nhiều công cụ giúp các Nhà phát triển Front-End xây dựng các trang web dựa trên grid, nhưng việc giới thiệu CSS Grid Layout đánh dấu một cột mốc quan trọng

Bên cạnh đó, CSS Grid đã trải qua một chặng đường dài kể từ khi được giới thiệu vào năm 2011. Giờ đây, nó hỗ trợ tất cả các trình duyệt chính

Với sự hỗ trợ gần đây với DevTools, nó đã làm cho quá trình gỡ lỗi trở nên thoải mái hơn bao giờ hết. Như tôi đã đề cập trước đó, DevTools làm cho việc làm việc với với CSS Grid dễ dàng hơn. Bạn có thể trực quan hóa tất cả dữ liệu lưới, kiểm tra và gỡ lỗi phát sinh chỉ bằng một cú nhấp chuột. Bên cạnh đó, biết các tùy chọn trong Layout pane sẽ giúp bạn gỡ lỗi CSS grid của mình như một Pro!

Via: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)