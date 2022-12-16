# Lời nói đầu
React Native là một framwork tuyệt vời mang đến cho các nhà phát triển cách phát triển ứng dụng mobile đa nền tảng. Framwork có một danh sách dài các thư viện của bên thứ ba giúp các bạn thuận tiện hơn và tăng tốc phát triển.

Trong bài viết này, chúng tôi giới thiệu các thư viện bên thứ ba hiệu quả và đã được chứng minh cùng với các mô tả ngắn để bạn có thể chọn một thư viện mà không cần lướt internet hàng giờ. Để thuận tiện cho bạn, chúng tôi cũng phân loại các công cụ này theo mục đích chính của chúng.
## App state
Phần này chủ yếu là về thư viện Redux, vì nó là một trong những công cụ hiệu quả nhất để quản lý state. Chúng tôi cũng chia sẻ một số công cụ bổ sung để thực hiện chức năng Redux hoàn chỉnh.

### [redux](https://redux.js.org/)
Đây là một thư viện độc đáo giới thiệu một khái niệm mới để lưu trữ dữ liệu. Trong khi sử dụng Redux, bạn có thể truy vấn, chọn, chèn và cập nhật bản ghi trong cơ sở dữ liệu. Redux cũng có một tính năng thực sự hữu ích để chỉnh sửa mã trực tiếp.

### [react-redux](https://github.com/reduxjs/react-redux)
Thư viện Reac-redux là một đoạn mã ngắn tích hợp bộ chứa trạng thái này vào ứng dụng của bạn. Nó là một ràng buộc cho thư viện Redux.

### [redux-persist](https://github.com/rt2zz/redux-persist)
Đây là một thư viện có cấu trúc tốt và tài liệu tốt, cung cấp một cách nhất quán, hiệu quả và có cấu trúc để giúp chúng ta lưu trữ dữ liệu của redux 

## Side effects
Hoạt động không đồng bộ và quản lý các side efects có thể gây bối rối. Dưới đây là một số dụng cụ hỗ trợ rất tốt.

### [redux-saga](https://github.com/redux-saga/redux-saga)
Thư viện mã nguồn mở này được tạo ra để làm cho các side efects của ứng dụng trở nên dễ quản lý hơn, có thể thực thi được và xử lý các lỗi thất bại tốt hơn. Công cụ redux-saga hoạt động như một trung gian và hoạt động như một luồng mà bạn có thể bắt đầu, tạm dừng và hủy khỏi ứng dụng chính với các action Redux bình thường.

### [redux-thunk](https://github.com/reduxjs/redux-thunk)
Đây là một thư viện nổi tiếng để làm việc với các action không đồng bộ trong Redux. Trong khi sử dụng nó, các nhà phát triển có thể viết các trình tạo hành động trả về một hàm thay vì một hành động. Thư viện là một đoạn mã rất nhỏ mà dễ hiểu nhưng mạnh mẽ.

### [redux-observable](https://redux-observable.js.org/)
Thư viện này là phần mềm trung gian cho Redux được tạo bởi các nhà phát triển Netflix cho các dự án nội bộ của công ty. Tuy nhiên, dự án là nguồn mở, vì vậy bất cứ ai cũng có thể tận dụng lợi thế của nó. Mục đích chính của công cụ là gửi một hàm trả về một action có thể quan sát được, hứa hẹn hoặc lặp lại của một action.

## Navigation
Điều hướng pp không phải là vấn đề nữa với các thư viện sau.

### [React Navigation](https://reactnavigation.org/)
Thư viện này giúp các nhà phát triển dễ dàng thiết lập navigation trong ứng dụng. Nó có một công cụ điều hướng dễ sử dụng dựa trên JavaScript. Thư viện React Navigation hoàn toàn có thể tùy chỉnh và mở rộng.

### [React Router](https://reacttraining.com/react-router/)
React Router là một thư viện gồm các thành phần navigation kết hợp khai báo với ứng dụng của bạn. React Router cho phép bạn chỉ định các components được đặt tên, chuyển các thành phần bố cục và xây dựng tất cả các loại bố cục.

## Networking
Những công cụ networking này cũng được chứng minh và dễ làm việc. Chúng tôi sử dụng chúng để thiết lập quy trình làm việc mạng trong tất cả các dự án React Native của chúng tôi.

### [Axios](https://github.com/axios/axios)
Axios là một client HTTP nhẹ dành cho JavaScript, được xây dựng để gửi các yêu cầu HTTP không đồng bộ đến các điểm cuối REST và thực hiện các hoạt động CRUD. Tóm lại, điều đó có nghĩa là, bạn có thể sử dụng các hàm không đồng bộ và chờ các hàm để viết mã không đồng bộ dễ đọc hơn.

### [Apollo Client](https://www.apollographql.com/)
Nếu bạn sẽ sử dụng GraphQL trong công việc của mình, bạn sẽ cần ứng dụng khách Apollo. Ứng dụng khách này được xây dựng để giúp bạn tạo UI một cách hiệu quả để kéo dữ liệu bằng GraphQL. Công cụ này rất dễ sử dụng và tương thích.

### [react-native-firebase](https://github.com/invertase/react-native-firebase)
Đây là một lớp js phía trên các thư viện Firebase dưới native. react-native-firebase đơn giản hóa việc sử dụng Firebase với React Native bằng cách xây dựng cầu nối sử dụng JavaScript software development kits.

### [react-native-ble-manager](https://github.com/innoveit/react-native-ble-manager)
Đây là một plugin để tạo điều kiện kết nối và truyền dữ liệu giữa điện thoại di động và thiết bị ngoại vi BLE. Trình quản lý này quét các thiết bị, kết nối với nó, đọc và ghi các giá trị của các đặc tính.

## Type checking & linting
Các giải pháp React Native ngoài luồng tiện dụng này là cần thiết để kiểm tra và linting thành công.

### [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
PropTypes là cần thiết để kiểm tra kiểu biến.Chúng tôi sử dụng nó chủ yếu để ghi lại các loại thuộc tính dự định được truyền cho các components.

### [ESLint](https://eslint.org/)
ESLint được xây dựng để cung cấp tiện ích linting có thể cắm cho JavaScript và để cho các lập trình viên phát hiện các vấn đề với mã JavaScript của họ trước khi thực hiện nó.

Một lợi ích tuyệt vời của ESLint là nó mang đến cho các nhà phát triển tạo ra các quy tắc lint của riêng họ.

### [Flow](https://flow.org/)
Đây là trình kiểm tra kiểu tĩnh cho JavaScript, được tạo bởi Facebook, xác định các vấn đề trong khi mã hóa. Thư viện nhằm mục đích cải thiện độ chính xác và tốc độ mã hóa. Flow giúp phát triển các ứng dụng lớn, ngăn chặn các xung đột khi nhiều người đang làm việc trên một projecyt.

## User interface
Người dùng hiện đại chỉ yêu cầu trải nghiệm UI tốt nhất và thực sự không thích những ứng dụng trông như nghiệp dư. Sử dụng các thư viện này để làm cho giao diện người dùng ứng dụng của bạn thực sự chuyên nghiệp.

### [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
Thư viện này bao gồm một số lượng lớn các biểu tượng được thiết kế cho các dự án trong React Native. Mọi yếu tố đều có thể tùy chỉnh hoàn toàn. Thư viện cung cấp rất nhiều biểu tượng cho bất kỳ sở thích nào, chỉ cần chọn một biểu tượng và tích hợp nó vào giao diện người dùng ứng dụng của bạn.

### [lottie-react-native](https://github.com/react-native-community/lottie-react-native)
Animation là một cách tuyệt vời để làm cho giao diện người dùng ứng dụng của bạn hấp dẫn hơn. lottie-react-native là một thư viện được tạo bởi Airbnb cho các hiệu ứng hoạt hình. Thư viện phân tích cú pháp Adobe After Effects và xuất hình ảnh động dưới dạng JSON.

### [styled-components](https://github.com/styled-components/styled-components)
Thư viện thành phần theo kiểu cho phép các nhà phát triển viết mã CSS để tạo kiểu thành phần. Công cụ loại bỏ ánh xạ giữa các thành phần và kiểu, giúp dễ dàng sử dụng các thành phần làm cấu trúc kiểu dáng cấp thấp.

### [react-native-share](https://github.com/react-native-community/react-native-share)
Đây là một thư viện rất hữu ích nếu bạn muốn đưa bất kỳ tính năng chia sẻ trên mạng xã hội nào vào chức năng ứng dụng của mình. Sử dụng công cụ này để gửi và chia sẻ dữ liệu lên các mạng xã hội nổi tiếng nhất.

## Sensors
Nếu bạn làm việc trên một ứng dụng tập thể dục hoặc chăm sóc sức khỏe trong React Native, hãy xem các thư viện này cho Apple HealthKit và Google Fit.

### [rn-apple-healthkit](https://github.com/terrillo/rn-apple-healthkit)
Đây là thư viện giúp ứng dụng di động React Native của bạn giao tiếp với Apple HealthKit. Lưu ý rằng có một thư viện khác gọi là react-native-apple-healthkit trên Github. Các thư viện này rất giống nhau, tuy nhiên chúng tôi khuyên dùng rn-apple-healthkit vì nó mới hơn và theo quan điểm của chúng tôi thì tốt hơn một chút.

### [react-native-google-fit](https://github.com/StasDoskalenko/react-native-google-fit)
Thư viện này cho phép bạn làm việc với Google Fit và triển khai nó trong ứng dụng React Native của bạn. Nó hỗ trợ kiểm tra loại Flow và Promise cho kết quả API.
# Kết thúc
Chúng tôi hy vọng danh sách các giải pháp làm sẵn React Native hiệu quả nhất này sẽ giúp bạn tạo ra các ứng dụng React Native tốt hơn.

Người dịch: Nguyễn Khuyến

Nguồn: https://rubygarage.org/blog/react-native-best-libraries