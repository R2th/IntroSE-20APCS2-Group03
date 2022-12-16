![](https://cdn-images-1.medium.com/max/800/1*Aom0Yz2zVQZdBiiByborCA.png)

Với việc thu thập và sử dụng dữ liệu tiếp tục tăng theo cấp số nhân, nhu cầu trực quan hóa dữ liệu ngày càng trở nên quan trọng. Các nhà phát triển tìm cách hợp nhất hàng triệu bản ghi cơ sở dữ liệu thành các biểu đồ đẹp mà con người có thể diễn giải nhanh chóng và trực quan.

Công nghệ trực quan hóa dữ liệu (data visualization) đã tiếp tục được cải thiện trong thập kỷ qua và nhiều thư viện biểu đồ tiên tiến hiện có sẵn cho người dùng. Đầu những năm 2000, việc tạo biểu đồ bị chi phối bởi các biểu đồ bitmap từ phía máy chủ. Các plugin như Flash và Silverlight cung cấp trải nghiệm biểu đồ tương tác nhiều hơn nhưng lại ảnh hưởng lớn đến tốc độ tải xuống, thời lượng pin và tài nguyên hệ thống.

Với sự bùng nổ của việc sử dụng điện thoại di động và máy tính bảng, các plugin không còn được hỗ trợ trên các nền tảng chính và các nhà phát triển phải chuyển sang các công nghệ client có thể chạy ở mọi nơi. Đồng thời, sự ra đời của màn hình độ phân giải rất cao và việc phóng to thủ nhỏ trở lên phổ biến hơn đã đưa biểu đồ vector độc lập với độ phân giải lên hàng đầu.

Bước vào kỷ nguyên hiện tại của trực quan hóa dữ liệu bị chi phối bởi JavaScript và SVG. Biểu đồ hiện nay chạy trên tất cả các trình duyệt, không có plugin đặc biệt, hỗ trợ tính tương tác và hình động và trông sắc nét ngay cả trên các thiết bị có độ phân giải cao nhất. Đánh giá hơn 50 thư viện trực quan, và dưới đây là 9 sản phẩm nổi bật nhất:

### D3.js
![](https://cdn-images-1.medium.com/max/800/0*56k0AsJkq2arNg6J)

D3.js là một thư viện JavaScript đồ họa rất rộng lớn và mạnh mẽ. Nó cho phép bạn liên kết dữ liệu tùy ý với Document Object Model (DOM) và sau đó áp dụng các phép biến đổi dựa trên dữ liệu cho document.

D3 vượt xa các thư viện biểu đồ điển hình, bao gồm nhiều module kỹ thuật nhỏ hơn khác như axes, color, hierarchies, contours, easing, polygons, v.v. Tất cả điều này làm cho một đường cong dốc.

Cố gắng tạo một biểu đồ đơn giản có thể là phức tạp. Tất cả các yếu tố bao gồm các axes và các mục biểu đồ khác cần được xác định rõ ràng. Nhiều ví dụ cho thấy cách CSS có thể được sử dụng để style các thành phần biểu đồ. Không có tính năng dựa trên biểu đồ áp dụng tự động. Nếu bạn muốn đi sâu vào và sử dụng sự sáng tạo để kiểm soát hoàn toàn mọi yếu tố, đó là lựa chọn tốt nhất.

D3.js là mã nguồn mở và miễn phí sử dụng.

### JsCharting
![](https://cdn-images-1.medium.com/max/800/0*EHkkTHxIaVJNK1Bu)

Thư viện biểu đồ JSCharting hỗ trợ một số lượng lớn các loại biểu đồ bao gồm maps, gantt, stock và các loại khác thường yêu cầu các thư viện riêng để sử dụng. Nó bao gồm các bản đồ tích hợp của tất cả các quốc gia trên thế giới và một thư viện các SVG icons. Một bộ các biểu đồ vi mô độc lập có thể hiển thị trong bất kỳ nhãn biểu đồ hoặc trong bất kỳ phần tử div nào trên một trang. Các điều khiển UI (UiItems) cũng được bao gồm cho phép các biểu đồ tương tác phong phú hơn. Để kiểm soát dữ liệu hoặc các biến trực quan trong thời gian thực rất dễ dàng và các biểu đồ có thể được xuất sang các định dạng SVG, PNG, PDF và JPG.

Bộ sưu tập được chia thành loại biểu đồ và mẫu tính năng. Kiểu dáng biểu đồ được đánh bóng và mang lại một số biểu đồ trông sáng sủa và chuyên nghiệp hơn.

Các ví dụ bao gồm sử dụng một đối tượng cấu hình để tùy chỉnh biểu đồ. Các cài đặt để tạo và kiểm soát các loại biểu đồ rất đơn giản để sử dụng. Chỉ có vài cài đặt thuộc tính là cần thiết để chỉ định các loại biểu đồ phức tạp hơn và JSCharting có tính năng tự động cài đặt cấu hình tốt nhất cho các tình huống.

JSCharting miễn phí cho sử dụng phi thương mại và cá nhân và cũng cung cấp các tùy chọn giấy phép thương mại bao gồm tất cả các loại biểu đồ và sản phẩm cho một khoản phí duy nhất.

### Highcharts
![](https://cdn-images-1.medium.com/max/800/0*bSXH4y_B2p-uiT07)

Highcharts là một thư viện biểu đồ JavaScript phổ biến được sử dụng bởi nhiều công ty lớn nhất thế giới. Biểu đồ được tạo bằng cách sử dụng SVG và dự phòng cho VML để tương thích ngược kể cả với IE6 / IE8. Các biểu đồ demo cho thấy một bộ tính năng khá phong phú nhưng không trực quan. 

Biểu đồ sử dụng các tùy chọn cấu hình để tạo biểu đồ và API rất dễ sử dụng.

Highcharts là miễn phí cho sử dụng phi thương mại và cá nhân. Cấp phép thương mại là cần thiết cho việc sử dụng khác và biểu đồ, bản đồ và gantt được cấp phép riêng.

### amCharts
![](https://cdn-images-1.medium.com/max/800/0*I593rABRl3kiyQtu)

amCharts gần đây đã phát hành phiên bản 4 của họ, bổ sung một engine SVG animation mạnh mẽ cho phép tạo ra những cảnh giống như trong phim.

Các biểu đồ demo trông rất đẹp. Hầu hết các bản demo cung cấp một số bảng màu và giao diện người dùng thanh trượt để điều chỉnh các biến biểu đồ trong thời gian thực. Tài liệu bao gồm nhiều hướng dẫn và mô tả thuộc tính API đầy đủ.

Tạo biểu đồ cảm thấy hơi khác so với cách tiếp cận dựa trên cấu hình và thay vào đó sử dụng API khai báo nhiều hơn. Nó đòi hỏi nhiều code hơn một chút để cấu hình biểu đồ nhưng mang lại trải nghiệm hoàn thành code tốt hơn.

amCharts cung cấp giấy phép miễn phí với các biểu đồ thương hiệu và giấy phép trả phí cho việc sử dụng khác.

### Google Charts
![](https://cdn-images-1.medium.com/max/800/0*Px_k9CMoanMVYgRA)

Biểu đồ Google rất mạnh mẽ và dễ sử dụng.

Các biểu đồ mẫu trông sáng sủa và dễ nhìn. Thư viện và thư viện mở rộng hiển thị nhiều loại biểu đồ, nhưng khi nhấn "menu hamburger" sẽ hiển thị nhiều loại hơn (như calendar) không được hiển thị trong các danh sách thư viện này.

Mỗi loại biểu đồ có một hướng dẫn dành riêng với các ví dụ trực tiếp. Các hướng dẫn bao gồm code cho các tính năng liên quan và danh sách API. Đây là một trải nghiệm thú vị khi bắt đầu với một thư viện biểu đồ mới.

Biểu đồ được tùy chỉnh bằng cách sử dụng đối tượng tùy chọn cấu hình. Các tập dữ liệu được điền bằng lớp DataTable có thể được sử dụng bởi tất cả các biểu đồ. Mỗi loại biểu đồ có các tùy chọn duy nhất được liệt kê trong các hướng dẫn cụ thể về loại. Đặt tên thuộc tính được chuẩn hóa và nhiều tùy chọn hoạt động trên tất cả các loại.

### ZingChart
![](https://cdn-images-1.medium.com/max/800/0*HeP8nAU6yfNMP3Xf)

ZingChart cung cấp nhiều loại biểu đồ và tích hợp với các angular, react và frameworks khác. Nó có một tính năng mạnh mẽ được thiết lập với nhiều tùy chọn tùy chỉnh.

Các biểu đồ demo cho thấy một loạt các chủ đề phong cách, một số trong đó trông đẹp hơn các chủ đề khác, nhưng các tùy chọn để tạo kiểu cho chúng khi cần là có. Demo không thể hiện tất cả các loại biểu đồ có sẵn.

Tài liệu bao gồm các hướng dẫn cho tất cả các loại có sẵn, một số tính năng tốt và danh sách API đầy đủ.

ZingChart sử dụng các tùy chọn cấu hình để tùy chỉnh biểu đồ. Các mẫu bao gồm nhiều cài đặt thuộc tính như kiểu chữ. Chúng có thể hiểu theo cách nào là cần thiết cho một biểu đồ nhất định.

ZingChart có thể được sử dụng miễn phí với nhãn hiệu. Cấp phép trả phí có sẵn cho việc sử dụng không có thương hiệu.

### FusionCharts
![](https://cdn-images-1.medium.com/max/800/0*84Vdi2gMVwbFxuWF)

FusionCharts đã xuất hiện trong nhiều năm bắt đầu như một plugin biểu đồ dựa trên Flash. Nó là một thư viện trực quan biểu đồ mạnh mẽ. Nó hỗ trợ nhiều định dạng dữ liệu bao gồm XML, JSON và JavaScript, hoạt động trong các trình duyệt hiện đại và tương thích ngược với IE6. Nhiều framework JavaScript và ngôn ngữ lập trình server side cũng được hỗ trợ.

Bộ sưu tập biểu đồ bao gồm một số lượng lớn các ví dụ và chúng có hình thức rõ ràng.

Tài liệu bao gồm các mô tả API tốt và ví dụ về từng loại biểu đồ. Các thuộc tính cấu hình được nhóm theo các nhiệm vụ và tính năng biểu đồ.

Biểu đồ được tạo bằng các tùy chọn dựa trên cấu hình và tương đối dễ sử dụng. Danh sách các thuộc tính có thể dài khi đào sâu hơn vào API. 

FusionCharts miễn phí cho sử dụng cá nhân với biểu đồ thương hiệu. Cấp phép trả phí có sẵn cho sử dụng không có thương hiệu và thương mại.

### KOOLCHART

![](https://cdn-images-1.medium.com/max/800/0*bmPndiXb0YNxJL7C)

KoolChart là một thư viện biểu đồ JavaScript dựa trên nền tảng Canvas HTML 5. Một sản phẩm bản đồ và grid cũng có sẵn.

Bản phát hành v5 mới của họ bao gồm một bộ tính năng tương tác nhiều hơn và cập nhật styling. Hình ảnh clean và hiện đại. Việc sử dụng canvas cung cấp hiệu suất tốt hơn với chi phí dựa trên raster.

Các ví dụ sử dụng XML để áp dụng các tùy chọn biểu đồ có vẻ ít thực tế hơn các cách tiếp cận khác. Các tùy chọn này trông giống như HTML5 nhưng được đặt thông qua chuỗi JavaScript.

API được ghi lại tốt với các biểu đồ ví dụ cho từng thuộc tính. Một hướng dẫn PDF 173 trang cũng có sẵn.

Một thời gian dùng thử hai tháng có sẵn để đánh giá. Cấp phép là cần thiết sau khi hết thời gian dùng thử.

### Chart.js

![](https://cdn-images-1.medium.com/max/800/0*Ogie6LExIQTiZ9qM)

Chart.js là một thư viện JavaScript mã nguồn mở hỗ trợ 8 loại biểu đồ. Nó là một thư viện js nhỏ chỉ 60kb. Các loại bao gồm biểu đồ đường, biểu đồ thanh, biểu đồ khu vực, radar, biểu đồ hình tròn, bong bóng, sơ đồ phân tán và hỗn hợp. Một chuỗi thời gian cũng được hỗ trợ. Nó sử dụng phần tử canvas để kết xuất và phản hồi trên thay đổi kích thước cửa sổ để duy trì độ chi tiết tỷ lệ. Nó tương thích ngược với IE9. Polyfills cũng có sẵn để làm việc với IE7.

Các hình ảnh demo trông khá hiện đại và bao gồm các hình ảnh động ban đầu khi vẽ lần đầu tiên. Nó hoạt động trơn tru khi thêm loạt điểm hoặc dữ liệu trong thời gian thực. Các tùy chọn biểu đồ có thể được sửa đổi sau và gọi hàm `update()` vẽ lại biểu đồ.

Mã nguồn demo không được hiển thị trong thư viện trang web nhưng có sẵn trên GitHub. Tùy chọn cấu hình được sử dụng để tạo và sửa đổi biểu đồ. API tùy chọn sạch sẽ và trực quan.

Tài liệu này rất kỹ lưỡng và bao gồm các hướng dẫn với API thuộc tính và đoạn mã.

Chart.js là một thư viện mã nguồn mở và miễn phí sử dụng cho mục đích cá nhân và thương mại là một lợi thế. Số lượng loại hạn chế có thể là một vấn đề đối với các yêu cầu bảng điều khiển nâng cao hơn.

### Kết luận
Hệ sinh thái của các thư viện biểu đồ JavaScript đã phát triển đáng kể trong thập kỷ qua. Ngày nay, có một số lượng lớn các sản phẩm biểu đồ đáp ứng các yêu cầu rất đa dạng, phục vụ một loạt các dự án mặc dù hàng trăm loại biểu đồ. Hầu hết các thư viện cung cấp bản dùng thử miễn phí hoặc phiên bản có thương hiệu cho phép bạn đánh giá hiệu quả của biểu đồ với dữ liệu, tải và độ phức tạp của dự án.

Hầu hết các thư viện biểu đồ đều dễ dàng xử lý các tập dữ liệu được quản lý đơn giản và trực quan hóa tĩnh. Tuy nhiên, biểu đồ có thể không phải lúc nào cũng xử lý mọi thứ trơn tru khi dữ liệu động, thực tế được hiển thị. Có thể cần nhiều công việc hơn để điều chỉnh và sắp xếp các yếu tố sao cho biểu đồ xuất hiện chính xác và điều chỉnh thủ công này có thể bị phá vỡ khi dữ liệu động mới được hiển thị.

Để chọn giải pháp biểu đồ JS tốt nhất cho nhu cầu duy nhất của bạn, tôi khuyên bạn nên thử nghiệm dữ liệu của riêng mình dựa trên một vài thư viện được liệt kê ở trên để đảm bảo phù hợp lý tưởng cho các dự án hiện tại và tương lai của bạn.

Bài viết được sưu tầm và lược dịch từ https://medium.freecodecamp.org/these-are-the-best-javascript-chart-libraries-for-2019-29782f5e1dc2