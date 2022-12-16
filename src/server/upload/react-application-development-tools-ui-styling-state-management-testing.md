Bài viết được dịch từ nguồn: https://hackernoon.com/react-application-development-tools-ui-styling-state-management-testing-8b2m3ykk

Nếu bạn đã chọn React để xây dựng một ứng dụng web, bạn vẫn sẽ cần các công nghệ và `framework` bổ sung để mở rộng và phát triển dự án của bạn, thêm chức năng và tích hợp.

Tại Codica, chúng tôi chuyên xây dựng các ứng dụng React có thể bảo trì, bền vững và có thể mở rộng. Chúng tôi sử dụng toàn bộ các công cụ nâng cao bao gồm `framework` UI, công cụ CSS, thư viện quản lý `state` và `test tool`.

Trong bài đăng này, chúng tôi sẽ xem xét kỹ hơn về từng công cụ này.

## UI framework

Nhiều nhà phát triển thừa nhận tầm quan trọng của `framework` UI. Các lập trình viên thừa nhận khả năng phát triển nhanh và đơn giản hóa quá trình xây dựng một ứng dụng web. Tuy nhiên, chúng tôi có một lý do thuyết phục khác để sử dụng các `framework`. Chúng giải quyết vấn đề đồng bộ hóa giao diện người dùng và `internal app state`.

Một giao diện người dùng tuyệt vời đòi hỏi phải tạo ra giải pháp đồ họa tốt nhất có thể.

Tại Codica, chúng tôi sử dụng các `framwork` UI phổ biến sau:

### Antd

Ant Design là một hệ thống thiết kế mã nguồn mở dành cho các ứng dụng web với một hệ thống các thành phần React chất lượng cao. Theo tài liệu chính thức, danh sách các tính năng như sau:

- Toàn bộ `plugin` thiết kế và các công cụ phát triển;
- Hỗ trợ quốc tế hóa cho hàng chục ngôn ngữ;
- Tùy biến chủ đề mạnh mẽ trong từng chi tiết.

Dưới đây là hướng dẫn toàn diện về cách sử dụng Ant Design với ứng dụng tạo `app React`.

Alibaba, Tencent, Yahoo và các công ty khác sử dụng hệ thống thiết kế này cho các sản phẩm của họ

### Material UI

Google đã giới thiệu ngôn ngữ thiết kế này vào năm 2014. Nó được trang bị bố cục dựa trên `grid base layout`, hoạt hình linh hoạt, tiện ích bổ sung và hiệu ứng chiều sâu. Các tính năng bên ngoài chính bao gồm:

- Hiệu suất nhanh chóng;
- Khả năng mở rộng thông qua API plugin;
- Việc sử dụng CSS-in-JS trong lõi của nó hoạt động ở phía `server`.

`Material Design` nhằm vào ba điều: Sáng tạo, Hợp nhất và Tùy chỉnh.

### Semantic UI React

Semantic UI React là một tích hợp React JS chính thức cho Semantic UI . Ngoài các tính năng được cung cấp bởi công cụ chính thức, nó còn có một số chức năng bổ sung: API khai báo, Augmented và `auto controller state`.

Snapchat, Reviewable, SunSed và những người khác xây dựng sản phẩm của họ với sự trợ giúp của Semantic UI.

## Styling

Ngày nay, các nhà phát triển ReactJS yêu cầu chuỗi `toolchain` phức tạp để viết mã CSS. Bằng cách biết cách tạo CSS cho ứng dụng ReactJS của bạn đúng cách, bạn có thể đóng góp đáng kể vào thành công của dự án.

Ứng dụng của bạn nên có giao diện độc đáo, trực quan và hấp dẫn trực quan để mang lại trải nghiệm UX liền mạch.

Có nhiều cách tiếp cận khác nhau để cách điệu ứng dụng. Tuy nhiên, chúng tôi muốn tập trung vào hai tùy chọn chính mà chúng tôi sử dụng trong thực tế:

- Modular Stylesheets;
- CSS-in-JS.

Hãy cùng thảo luận về từng công cụ CSS.

### Modular stylesheets

Không phải là một đặc điểm kỹ thuật chính thức, các mô-đun CSS không được triển khai trong các trình duyệt. Thay vào đó, nó là một nhiệm vụ được đưa ra ở giai đoạn `code`. 

Cách tiếp cận này nhằm giải quyết vấn đề phạm vi tổng thể trong CSS. Các mô-đun đảm bảo rằng tất cả các kiểu của một thành phần nằm ở một block chỉ được áp dụng cho block đó.

### CSS-in-JS

JSS (CSS-in-JS) là một công cụ soạn thảo cho CSS. Với sự giúp đỡ của nó, các nhà phát triển có thể sử dụng JavaScript để mô tả các kiểu theo cách khai báo, không confic và có thể sử dụng lại. Nó có thể biên dịch trong trình duyệt, phía máy chủ hoặc tại thời điểm xây dựng trong Node.

## State management 

Đã có nhiều cuộc thảo luận xung quanh việc quản lý state trong phát triển ứng dụng React. Tương tự, công cụ cần thiết để hoạt động với quản lý state app React.js cũng là một chủ đề.

Các công cụ phổ biến nhất là Redux và MobX. Chúng tôi sẽ thảo luận về ưu và nhược điểm và chức năng của họ. Hãy bắt đầu với Redux.

### Redux

Redux là một công cụ cho phép các nhà phát triển quản lý cả state data và giao diện trong các ứng dụng JavaScript. Nó có thể được sửa đổi bằng một chuỗi các hành động. Nhiều khả năng của nó làm cho Redux trở thành một giải pháp phù hợp cho các sản phẩm web phức tạp.

Thư viện hoạt động cho các ứng dụng single page (SPA) trong đó sự tăng trưởng của ứng dụng có thể làm cho việc quản lý state trở nên phức tạp hơn.

Redux có ba nguyên tắc chính:

1. Single source of truth:
    Redux chỉ sử dụng một store cho toàn bộ app state.
2. State is read-only:
    Theo tài liệu của Redux, cách duy nhất để thay đổi trạng thái là emit một action, một đối tượng mô tả những gì đã xảy ra.
3. Changes are made with pure functions:
    Reducer là các chức năng xử lý các hành động và thực hiện các thay đổi state. Trên thực tế, đây là các hàm JavaScript thuần túy không có tác dụng phụ. Lợi nhuận của họ chỉ được xác định bởi các giá trị đầu vào.

### MobX

MobX là một thư viện cho phép quản lý app state. TFRP đơn giản hóa nó và làm cho nó có khả năng mở rộng hơn. Michel Weststrate đã tạo ra nó vào năm 2015 để giúp làm cho state nhất quán.

Các thành phần chính của MobX là:

1. State:
    Mảng, tham chiếu và đối tượng được coi là các ô dữ liệu ứng dụng ở state.
2. Derivations:
    Derivations là các giá trị mà app state xử lý tự động.
3. Reactions
    Reactions chủ yếu chịu trách nhiệm cho các hoạt động đầu vào-đầu ra và cập nhật DOM. Yêu cầu mạng phải được xử lý tự động đúng thời gian.
4. Actions
    Actions động sửa đổi trạng thái trong khi MobX đảm bảo rằng tất cả các thay đổi được xử lý đồng bộ.
    
Thư viện hỗ trợ Node.js, React Native, Rhino và tất cả các trình duyệt (trừ IE). Điều đáng chú ý là MobX không phải là một framework. Nó không biết gì về cách cấu trúc code của bạn, xử lý và lưu trữ dữ liệu.    

## Testing

Testing được thực hiện khi các nhà phát triển cần xác thực chức năng được tạo trong các yêu cầu đã xác định. Các phần cốt lõi của quá trình này là lập kế hoạch, tạo và chạy thử nghiệm, và phân tích các kết quả nhận được.

Kiểm thử phần mềm bao gồm các hoạt động sau:

- Phân tích và lập kế hoạch;
- Phát triển các kịch bản thử nghiệm;
- Đánh giá các bài test hoàn thành tiêu chí;
- Viết báo cáo;
- Tài liệu và xem xét code;
- Phân tích tĩnh.

### Test pyramid

Khi chọn một kỹ thuật test các ứng dụng React JS, hãy xem kim tự tháp thử nghiệm Agile. Nó giúp bạn tìm ra phương pháp thích hợp nhất.

![](https://images.viblo.asia/3e71bd97-e525-42fe-a8bb-08170f8c7818.png)

Kim tự tháp cho thấy nhiều unit-snapshot test có thể được sử dụng để xác nhận một thử nghiệm tích hợp. Bằng cách này, nhiều bài test tích hợp có thể được sử dụng để xác nhận một bài kiểm tra thủ công. Ở đỉnh cao của kim tự tháp, chúng tôi có một thử nghiệm từ đầu đến cuối: thử nghiệm thủ công toàn bộ app.

Hãy cùng thảo luận về các công cụ hiệu quả nhất để kiểm tra ứng dụng React.js của bạn.

### Jest

Jest là một thư viện mã nguồn mở để test JavaScript unit do Facebook phát hành. Công cụ này có hơn 1K người đóng góp, 30,1K GitHub Stars và 4.2K Fork.

![](https://images.viblo.asia/92fa66a8-8a1f-4d67-b014-52c4f7b8ddf0.png)

Nói một cách đơn giản, Jest mang đến cho bạn cơ hội để viết test với API có thể tiếp cận, mang lại cho bạn kết quả nhanh chóng. Nhiệm vụ của bạn là xác định các tham số đầu vào và đầu ra nên được tạo bởi một thành phần.

### Cypress

Cypress là một công cụ nguồn mở được sử dụng cho giao diện người dùng tự động và kiểm tra các ứng dụng web từ đầu đến cuối. Nó có 19K GitHub Stars và 1.1K Fork.

![](https://images.viblo.asia/cefed359-5d2b-45b3-9cb6-635996c3484f.png)

Nhiệm vụ chính của Cypress là kiểm tra sự tương tác client và server. Ngoài ra, công cụ cung cấp các testing tích hợp của các thành phần trang riêng lẻ.

## Conclusion

Chúng tôi tin rằng các phân tích của chúng tôi sẽ hữu ích khi bạn chọn phát triển ứng dụng React để xây dựng các sản phẩm phức tạp và có thể mở rộng.

Các framwork UI, các công cụ CSS, các thư viện test và state management được thảo luận ở trên sẽ giúp quá trình phát triển dự án trở nên trơn tru và đơn giản.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn