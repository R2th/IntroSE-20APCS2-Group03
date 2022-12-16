![](https://images.viblo.asia/6913ffa5-8c55-442b-bb8d-fcc277b629d7.png)

## Giới thiệu tổng quan về React
### 1. React là gì?
Chúng ta có thể hiểu đơn giản, React là một thư viện Javascript (không phải framework) được phát triển bởi Facebook (2013) giúp hỗ trợ xây dựng giao diện người dùng cho cả web và mobile một cách linh hoạt, đơn giản, nhanh chóng và hiệu quả. Nó cho phép xây dựng các giao diện phức tạp bằng việc kết hợp các "component" nhỏ, độc lập và có khả năng tái sử dụng lại với nhau.

React hiện là một trong những thư viện JavaScript phổ biến nhất, có nền tảng vững chắc cùng với cộng đồng phát triển mạnh mẽ.

### 2. React có gì hay so với các framework khác?
- React sử dụng toàn bộ đều là Component chứ không phải template:
    - Về mặt khái niệm, các component giống như các hàm của JavaScript, có input data tùy ý (được gọi là “props” - properties) và trả về các React elements HTML mô tả những gì sẽ hiển thị trên view thông qua hàm render().
    - Một component là một thành phần độc lập tạo thành UI, có thuộc tính, trạng thái riêng biệt. Với các trạng thái/thuộc tính khác nhau, trong một component có thể chứa các component khác. 
    - Và mỗi khi dữ liệu được thay đổi, React sẽ tự động cập nhật và re-render lại Component.
    - React khuyến khích việc tạo ra các component có thể tái sử dụng, những thành phần này dùng để hiển thị dữ liệu thay đổi theo thời gian.
    - Có hai cách để định nghĩa một component trong React: như một function hoặc một Class.
        + Stateful component: chỉ là một function và không trực tiếp quản lý các state bên trong.
        + Stateless component: có state là một Class và thực hiện quản lý các state trong các thuộc tính riêng của nó.
    - Sử dụng component giúp dễ dàng maintain khi quy mô dự án phát triển hơn.

- React chỉ thay đổi những gì thực sự cần thay đổi. Nó so sánh sự thay đổi giữa lần render này với lần render trước và tìm ra những thay đổi đã được thực hiện và chỉ cập nhật những gì thực sự thay đổi.

- React loại bỏ DOM, cung cấp một mô hình đơn giản với hiệu suất tốt hơn.
    + Thay vì thao tác trực tiếp với DOM của trình duyệt, React tạo một Virtual DOM trong memory, nơi thực hiện tất cả các thao tác cần thiết trước khi thực hiện các thay đổi trong DOM của trình duyệt.
    + Virtual DOM là một object Javascript, mỗi object chứa đầy đủ thông tin cần thiết để tạo ra một DOM (Document Object Model). Khi dữ liệu thay đổi nó sẽ tính toán sự thay đổi giữa object và real tree giúp tối ưu hoá việc re-render real DOM. Nói đơn giản, Virtual DOM "nhanh" hơn DOM thông thường.

![](https://images.viblo.asia/c4253703-7cc9-48f8-9165-ffc34881d275.png)

- React có thể render trên client và render trên cả server bằng Nodejs, có thể xây dựng native apps bằng cách sử dụng thư viện React Native. 

- React triển khai luồng dữ liệu một chiều, được truyền từ cha đến con thông qua props, điều này giúp chúng ta dễ dàng suy luận và kiểm soát luồng logic hơn so với kiểu ràng buộc dữ liệu truyền thống.
    + Props (read-only): là đầu vào của các component, có giá trị không thay đổi, giúp các component tương tác với nhau.
    + State: là nơi bắt đầu của dữ liệu và thể hiện trạng thái của ứng dụng, khi state thay đổi thì component đồng thời cũng render lại để cập nhật view. 
    + State nên càng đơn giản càng tốt và nên giảm thiểu số lượng các stateful components.

- React sử dụng JSX để tạo template thay vì JavaScript thông thường. 
    + JSX là một dạng ngôn ngữ cho phép viết các mã HTML trong Javascript, tương tác với đối tượng JavaScript.
    + JSX nhanh hơn do thực hiện tối ưu hóa trong khi biên dịch mã sang JavaScript, các lỗi được phát hiện ngay trong quá trình biên dịch.
    + An toàn và dễ sử dụng hơn do cú pháp khá giống với HTML thông thường.
    + JSX có khá nhiều ưu điểm, nhưng không nhất thiết phải sử dụng trong React.

- Cuối cùng, React khá "thân thiện" với SEO vì React có thể tăng tốc ứng dụng, thời gian tải trang. Các ứng dụng React cũng dễ dàng bảo trì và sửa lỗi.

### 3. Khi nào nên sử dụng React?
- React thường được sử dụng để giải quyết bài toán cho các ứng dụng quy mô lớn mà dữ liệu của chúng thường thay đổi liên tục theo thời gian hay các ứng dụng có giao diện phức tạp.
- React cũng thường được dùng làm phần "V" trong mô hình MVC, tuy nhiên tích hợp React với các framework MVC truyền thống khác yêu cầu cần phải cấu hình lại khá phức tạp.

### 4. Nhược điểm
Bên cạnh nhiều ưu điểm so với các framework khác thì React cũng tồn tại những hạn chế nhất định:
- Do chỉ dùng để xây dựng view UI, và chỉ là một library (kích thước ~116KB) nên chúng ta vẫn cần kết hợp React với các công nghệ khác để xây dựng một ứng dụng hoàn chỉnh.
- React chỉ triển khai luồng dữ liệu một chiều, không có Ajax hay ràng buộc dữ liệu hai chiều.
- Học cơ bản mới bắt đầu với React khá dễ dàng, tuy nhiên khi học nâng cao hơn (Redux, Hook, ...) sẽ khó khăn hơn. Ngoài ra, một số nhà phát triển sẽ khá lúng túng khi mới bắt đầu làm quen với JSX hay inline template trong React.
- Do cộng đồng phát triển khá mạnh mẽ nên nguồn tài liệu học tập khá nhiều, hỗn tạp nên dễ gây hoang mang cho người mới bắt đầu.
- Nhiều thư viện "mỳ ăn liền" :v

## React vs Vue
### 1. Tổng quan và độ phổ biến
![](https://images.viblo.asia/0ff8d353-d054-4c85-89e6-9a353ff0343b.png)

![](https://images.viblo.asia/7d188db8-787f-4a78-9060-d5acf26c53b9.png)

### 2. Đặc điểm khác
|# |  React | Vue  |
|---|---|---|
|Tài liệu, APIs  | Học cơ bản dễ, nâng cao khó hơn. Nguồn tài liệu phong phú, nhưng dễ gây hoang mang cho newbie do số lượng khá nhiều và cũng "thượng vàng hạ cám".| Dễ học, tài liệu khá ít ỏi nhưng rõ ràng và dễ hiểu. (https://vuejs.org/v2/guide/)  |
|  Tổ chức file | - Sử dụng JSX trong đó cả HTML và CSS đều được thể hiện qua JavaScript với cú pháp XML.<br>- Có thể viết chung cả JSX hoặc CSS trong một file hoặc tách riêng được.| - Sử dụng HTML thông thường hoặc khác (tùy chọn).<br>- Cách tiếp cận truyền thống: để cả HTML/CSS/JS trong một file, cũng có thể tách riêng.|
| Hệ sinh thái  |  Dựa vào các giải pháp bên ngoài như Flux/Redux để định tuyến và quản lý state bằng cách cung cấp một cách duy nhất để sửa đổi state, các khuôn khổ này đơn giản hóa việc gỡ lỗi. | Có ít thư viện đồng hành hơn. Với các ứng dụng lớn hơn, vẫn sẽ cần một thư viện bên ngoài để quản lý trạng thái như Vuex hoặc định tuyến như Vue-Router. Giống như Redux, nó chỉ có một cách để thay đổi state bằng cách sử dụng các hàm xử lý được gọi là mutations. | 
|Tốc độ: cả hai đều mạnh| - Mỗi khi có sự thay đổi component, việc re-render sẽ kích hoạt cho toàn bộ component con trong nhóm. Nếu không muốn kích hoạt re-rendering, có thể sử dụng PureComponent.<br>- Tốc độ tải ban đầu: 32.5/101.2KB không nén. | - Các component có liên quan lẫn nhau sẽ được tracking trong suốt quá trình render. Có nghĩa là hệ thống sẽ tự xác định component nào yêu cầu re-rendering sau khi state được thay đổi.<br>- 31KB/84.4 KB|
|Hiệu suất: cả hai đều có hiệu năng tuyệt vời| Có hệ thống tracking tương quan sử dụng quy tắc sắp xếp không đồng nhất giúp tăng hiệu năng đáng kể.| Tốt hơn một chút về phân bổ bộ nhớ và thời gian khởi động trong khi React nhanh hơn một chút trong thời gian chạy.|
|Khả năng mở rộng| - Đủ "nhẹ" để sử dụng trong các ứng dụng multi-page.<br>-  Nhiều thư viện cũng rất phù hợp cho các SPA lớn.|- Tuyệt vời khi xây dựng các ứng dụng tương tác nhiều trang, cho phép nhanh chóng import thư viện core và đưa Vue vào các trang hiện có.<br>- Mặc dù Vue rất phù hợp để phát triển các SPA lớn, nhưng nó không được tạo ra cho mục đích này. Khi dự án phát triển, việc sử dụng lại các mẫu HTML trở nên khó khăn hơn so với cú pháp JSX.|
|Server-Side Rendering (SSR)|Cần các thư viện của bên thứ ba như Next.js để hiển thị các trang trên máy chủ.|Đi trước React với khả năng SSR được tích hợp sẵn và hướng dẫn chi tiết ngay trong docs.|
|Mobile| React Native là lựa chọn tuyệt vời cho phát triển đa nền tảng không thể tranh cãi. Nó cho phép sử dụng lại tới 99% mã JS giữa Android và iOS với các component giống React. | Đi sau React, nhưng nó cũng cung cấp một số giải pháp để phát triển mobile:<br>- NativeScript: cho phép viết các ứng dụng Vue và biên dịch chúng sang các ứng dụng native iOS/Android.<br>- Vue Native: framework kết hợp các lợi thế của hệ sinh thái Vue và RN, khai báo rendering, ràng buộc dữ liệu hai chiều và một tập hợp các component cơ bản để tạo ứng dụng native đa nền tảng.<br>- Nền tảng Weex: do Alibaba phát triển, có kiến trúc component-based cho phép viết mã có thể được hiển thị trên web, iOS và Android. Cộng đồng chủ yếu từ Trung Quốc.<br>- Quasar: hỗ trợ xây dựng các hybrid mobile apps.|

![](https://images.viblo.asia/f98f6e64-e663-45c9-a185-20a18e4b0f56.png)

![](https://images.viblo.asia/053ae9dc-f718-4aa5-911f-8df828973ca1.png)

![](https://images.viblo.asia/a2b600fa-dca5-4e43-a6d1-80c63a456221.png)

### 3. Cộng đồng
|Github/Stackoverflow |  React | Vue  |
|---|---|---|
|Watchers|6.7K|6.2K|
|Stars|152K|168K|
|Forks|29.4K|25.2K|
|Contributors|1.480|371|
|Commits|13.5K|3.1K|
|Q&A|231K|78K|
|Live websites|1067K|851K|
|Size|116KB|91KB|

![](https://images.viblo.asia/218685af-c75d-443d-a610-e262f134eb0b.png)

### 4. Cơ hội nghề nghiệp
![](https://images.viblo.asia/8461c170-2f5b-4311-8346-e7ab5316ffff.png)

### 5. Tổng kết
|Lựa chọn React khi|Lựa chọn Vue khi|
|---|---|
 |- Muốn xây dựng một giải pháp phức hợp cấp doanh nghiệp hay các ứng dụng SPA.<br>- Có kế hoạch mở rộng lớn các chức năng của ứng dụng trong tương lai và sẽ cần sự hỗ trợ liên tục.<br>- Xây dựng một ứng dụng di động.<br>- Có đội ngũ phát triển React giàu kinh nghiệm.<br>- Hay đơn giản chỉ là ưu ái JS hơn HTML.|- Cần giải pháp làm việc càng sớm càng tốt (như startup).<br>- Ứng dụng khá đơn giản hoặc phải cần tốc độ "nhanh như chớp".<br>- Chuyển một dự án hiện có sang công nghệ mới trong một khoảng thời gian ngắn nhưng nguồn lực lại hạn chế.<br>- Team của bạn hầu hết là các nhà phát triển HTML/junior để tiết kiệm chi phí.<br>- Đơn giản chỉ là thích code rõ ràng và HTML.|
 
### Tham khảo
[React vs Vue](https://www.mindk.com/blog/react-vs-vue/)