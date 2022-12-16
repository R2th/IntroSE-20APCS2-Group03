### Bài toán
Trong quá trình tham gia một vài dự án React, tôi thấy có một vài vấn đề hay gặp.

- Thiếu bố cục thiết kế cho các component 
- Dự kiến thời gian phát triển chưa chính xác
- Mất nhiều thời gian cho quá trình cài đặt và tìm hiểu cho developer 
- Thiếu thống nhất giữa các component và view 
- Code bị lặp, khi giả sử có quá nhiều component, khoảng 1 đến 2 trăm thì sẽ rất khó để biết có bị trùng với có sẵn không component 
- Có rất nhiều component chi tiết cho mỗi trang, thiếu tính tổng quát của component  

Với những vấn đề trên, chúng ta nên suy nghĩ lại một cấu trúc hay một cách thiết kế để sắp xếp component phân tán hơn, tách biệt hơn và có tính tổ chức hơn. Có một phương pháp để giải quyết vấn đề này, đó là `Atomic Design`. Atomic Design cho phép tạo nhiều khối component, với độ phức tạp và sự phụ thuộc của cấu trúc khác nhau, tạo ra một hệ thống được thiết kế hoàn hảo từ những phần rất nhỏ, giúp tăng cường tư duy thiết kế cho dev, dựa theo các khái niệm component hoá, cấp bậc hoá và tái sử dụng code.  

Dưới đây là hình tượng hoá Atomic Design:
![](https://images.viblo.asia/86aa8055-f28d-47e0-9421-dcb8749517cd.png)

### Atomic Design là gì 
Trong thế giới desing, Atomic Design giúp tạo nên các hệ thống thống nhất, bền vững và có tính tái sử dụng cao. Tuy nhiên, trong thế giới React, hay các framework frontend dựa theo khái niệm component, Atomic Design được dùng chưa nhiều, nhưng nếu biết cách sử dụng đúng cách, thì đó là một công cụ rất đắc lực cho các dev.

Ý tưởng của Atomic Design bắt đầu từ ý tưởng chia nhỏ các component thành các atom (nguyên tử), molecule (phân tử), organism (sinh vật), template (khuôn mẫu) và page (trang). Vậy ý nghĩa của mỗi phần gì?

#### Atom
![](https://images.viblo.asia/c25f613a-984b-4ec9-89f8-18a702eb6354.png)

`Atom` là các component nhỏ nhất có thể, VD các button, title, input hay font, animation. Chúng có thể được đặt vào bất kỳ bối cảnh nào, toàn cục hay bên trong các component khác, khuôn mẫu khác, có chứa nhiều state, như với button: disabled, hover, các size khác nhau, ...

#### Molecule
![](https://images.viblo.asia/5a9ad826-a0be-4107-b1c0-74650299e9ad.png)

Chúng là tập hợp một hay nhiều component của atom. Tại đây, chúng ta bắt đầu tập hợp các component phức tạp và tái sử dụng một trong số chúng. Molecule có thể có các thuộc tính của chính nó và tạo ra các hàm mà được dùng bởi atom, trong khi atom sẽ không có bất kỳ hàm hay action nào cả.

#### Organism
![](https://images.viblo.asia/4405f418-5d9b-42a3-8017-a2d470e73ed6.png)

`Organism` là tập hợp nhiều molecule làm việc cùng nhau hay thậm chí có thể bao gồm các atom để tạo nên các giao diện chi tiết hơn. Ở mức này, các component bắt đầu có hình dáng cụ thể, nhưng chúng vẫn đảm bảo phải được độc lập, dễ dàng di chuyển và tái sử dụng với bất kỳ nội dung nào.

#### Template
![](https://images.viblo.asia/0fa74dca-0c70-4cb4-80bd-2467aa284c5b.png)

Ở giai đoạn này, chúng ta sẽ không đề cập đến xây dựng component mà chú ý đến cài đặt bối cảnh của nó. Tại đây, `template` sẽ xây dựng mối quan hệ giữa các organism và các component khác bằng cách chỉ định các vị trí, sắp xếp và xây dựng khuôn mẫu cho page, nhưng chưa có style, color hay component được render. Nó sẽ trông giống như một wireframe.

#### Page
![](https://images.viblo.asia/642299d1-8032-4a02-9a73-e912158d849e.png)

`Page` là một thành phần có hướng của app, là nơi các component được sử dụng dựa theo một template cụ thể. Các component này sẽ nhận nội dung thật và được kết nối với toàn bộ app. Ở giai đoạn này, chúng ta có thể kiểm tra mức độ hiệu quả của hệ thống design và phân tích xem các component có đủ độc lập hay không hay chúng cần được tách nhỏ hơn. 

### React + Atomic Design

Khi sử dụng Atomic Design trong React, chúng ta cần chỉnh sửa một vài rule để đảm bảo các component được tái sử dụng nhiều nhất có thể, hay có thể gọi là stateless (không có hay ít state nhất có thể), mà không bố cụ vị trí và chỉ định cụ thể margin để tránh ảnh hưởng đến các page của app.

Vì vậy, mỗi khi xây dựng một component mới, chúng ta nên tự hỏi: Liệu những component này có đủ khái quát để tránh chi tiết hay lặp code trong bất kỳ bối cảnh mà được dùng hay không?

Do đó, có một vài rule bổ sung:

- Atomic Design nên có một filefile chứa tất cả biến và nó phải được import trong mỗi component 
- Atom nên được viết mà không có margin và position 
- Chỉ molecule và organism có thể được cài đặt position của atom, nhưng những khối này cũng không thể style cho margin và position.
- Template chỉ có một chức năng: đó là cài đặt bố cục cho page, nhưng không có vị trí cụ thể cho component.
- Page sẽ render các component dựa theo một template đã được định nghĩa sẵn và từ đây, Atomic Design sẽ được kết nối đến toàn bộ phần còn lại của app.

### Sử dụng Storybook

Để xây dựng một thư viện UI, chúng ta nên dùng một công cụ gọi là [`Storybook`](https://storybook.js.org/), đó là một bạn đồng hành tuyệt với của Atomic Design trong React, cho phép render các component và hiện toàn bộ states/ các biến.

Khi cài Storybook, cấu trúc folder sẽ là:

![](https://images.viblo.asia/8e266ea9-ada0-4e52-b629-d8f68f3f72f8.png)

Chúng ta nên tìm hiểu bài viết [Cấu trúc CSS trong ReactJS](https://cheesecakelabs.com/blog/css-architecture-reactjs/) và file stories.js sẽ được import vào component trong storybook 

![](https://images.viblo.asia/e6034e2b-2f7d-459a-a9ab-18fe4898439c.png)

### Ví dụ 

Sau đây là một vài VD về cách chia component theo Atom Design 

##### VD 1:

![](https://images.viblo.asia/91f79d9e-0235-4a7c-adb8-3d4fd7c2bd9f.png)

Với page trên, chúng ta chia component theo hướng top-down 

- 1 page: dashboard
- 2 template: header và workspace
- Nhiều organism: tool, time, map, ...
- Nhiều molecule: tool button, thông tin temperature, feed item 
- Nhiều atom: label, icon, link, heading, ... 

##### VD 2:

Trang danh sách nhà hàng:

Với Organism là đường kẻ đỏ, nhỏ hơn Organism là đường kẻ xanh da trời, Molecule là màu xanh lá cây và Atom là màu vàng.

![](https://images.viblo.asia/49f2dde3-132a-4491-ad83-1fbcadaaa099.png)

### Chia sẻ và sáng tạo các UI component với Bit

[Bit](https://bit.dev/) là một công cụ và nển tảng mã nguồn mở cho phép tạo một tập các UI component ưa thích để khám phá và chia sẻ.

Với Bit, bạn có thể chia sẻ các component có thể tái sử dụng từ các dự án khác, có thể thử nghiệm ngay trực tiếp online và sử dụng chúng vào bất kỳ dự án nào. 

### Tổng kết

Chúng ta đã tìm hiểu được một cấu trúc đảm bảo dự án có thể phát triển và các dev khác có thể hiểu cấu trúc nhanh chóng. Có thể lúc đầu sẽ cần phải mất khá nhiều thời gian để viết story hay style nhưng đổi lại, dự án càng phát triển, lợi ích đạt được càng nhiều. 

Tuy nhiên, cấu trúc trên có thể không hiệu quả cho mọi dự án bởi vì nó phụ thuộc vào nhiều yếu tố. Trong đó yếu tố chính là thiết kế cần được suy nghĩ theo cùng hướng trong quá trình phát triển, theo cách nguyên tử. Nhưng việc tích hợp giữa thiết kế và phát triển là điểm mà mọi dự án đều muốn đạt tới