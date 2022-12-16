![image.png](https://images.viblo.asia/967ef80c-b544-4507-9756-aa52e8716de5.png)

Hiện nay, với sự phát triển của công nghệ và kỹ thuật dẫn đến tiềm năng phát triển trong mảng lập trình rất cao. Trong những năm gần đây, Mảng lập trình Frontend đặt biệt là Frontend web vô cùng phát triển nhờ vào mức thu nhập của công việc mang lại, khiến cho người người, nhà nhà đổ xô đi học lập trình Frontend web tại các trung tâm.

Tuy nhiên, nhiều bạn mới học sẽ gặp khó khăn để có thể “hấp thu” được kiến thức JavaScript trong quá trình học dẫn đến dễ chán nản. Nhưng đừng lo, trong series về JavaScript này, tôi sẽ giúp bạn hiểu và nắm rõ về nó. Chúng ta bắt đầu thôi! ?

Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/javascript-gioi-thieu-va-huong-dan-setup-moi-truong/

## 1. Giới thiệu về JavaScript.

![image.png](https://images.viblo.asia/dfafaa32-e13c-4b50-ae37-58742c1727dd.png)

Vậy chính xác [JavaScript](https://www.javascript.com/) là gì?

**JavaScript** là một ngôn ngữ lập trình dành cho việc tạo và phát triển web. Nó được nhúng vào trong file **HTML** giúp cho website trở nên sống động và đẹp hơn. JavaScript có thể cập nhật và thay đổi cả **HTML** và **CSS**.

Một ứng dụng thực tế mà ta dễ thấy nhất của JavaScript đó là các **animation, pop-up quảng cáo, autocomplete** khi search,… tất cả đều một tay JavaScript thực hiện.

JavaScript còn là một ngôn ngữ lập trình đa nền tảng, ngoài dành cho việc lập trình frontend trên nền tảng web ra thì nó còn được sử dụng cho việc lập trình và phát triển ứng dụng trên nền tảng mobile.

Ngày nay, JavaScript có thể thực thi không chỉ trong trình duyệt mà còn trên server hoặc bất kỳ thiết bị nào có chương trình đặc biệt gọi là **JavaScript engine**.

Với những ưu điểm của mình mà JavaScript được các ông lớn như Google, Facebook,… hỗ trợ trong việc phát triển để cho ra đời các library hay framework JavaScript nổi tiếng hiện nay như:

* AngularJS
* [ReactJS](https://200lab.io/blog/reactjs-la-gi/) và [React Native](https://200lab.io/blog/react-native-su-dung-animated-polyline-googlemap/)
* VueJS
* NuxtJS
* NextJS
* Jquery
* NodeJS
…

Một số các trang web nổi tiếng được xây dựng từ các library và framework trên như:

* ReactJS: Facebook, Instagram, Twitter, netflix, …
* VueJS: Trang chủ của VueJS, Behance, Font Awesome, upwork, …
* AngularJS:  JetBlue, samsung, freelancer, …

(Để biết được một trang web có được xây dựng bằng library hay framework kể trên bạn chỉ cần cài các extension hỗ trợ trên trình duyệt chrome để detect nhé, ví dụ: React và NextJS thì có React Developer Tools, VueJS và NuxtJS thì có Vue.js devtools, AngularJS có Angular Devtools).

https://200lab.io/blog/tim-hieu-reactjs/

## 2. Hướng dẫn setup môi trường JavaScript.

Giới thiệu như vậy là đủ rồi, chúng ta cùng bắt tay vào setup môi trường để có thể bắt đầu tìm hiểu sâu hơn về JavaScript nào ?

Đầu tiên trong series này, tôi khuyến khích các bạn nên dùng trình duyệt chrome để chạy các demo code của mình. Bởi vì chrome có rất nhiều tiện ích mở rộng (extension), giúp các bạn rất nhiều trong việc code cũng như debug sau này. Nếu các bạn chưa cài thì có thể [vào đây](https://www.google.com/intl/vi/chrome/?brand=CHBD&gclid=CjwKCAjw8cCGBhB6EiwAgORey_V-R79LhtX8EM-zTEyKg1fOHBkly8sEu7d048xclQmNhVLfy8BubxoC7q8QAvD_BwE&gclsrc=aw.ds) để tải và cài đặt nè.

Để viết code tôi dùng Visual studio code, đây là một trình soạn thảo code khá nổi tiếng đến từ ông lớn Microsoft được cộng đồng dev trên toàn thế giới dùng. Nó có một kho extension đồ sộ, support rất tốt cho quá trình code của chúng ta được nhanh và gọn hơn rất nhiều. Nếu các bạn chưa cài thì có thể [vào đây](https://code.visualstudio.com/download) để tải và cài đặt nhé.

Sau khi cài đặt xong ta có giao diện Visual studio code như hình:

![image.png](https://images.viblo.asia/9f3de4a0-1ce6-47c4-8978-ba680625a599.png)

Để run code, tôi dùng extension Live Server, extension này tạo một local host ngay dưới máy mình giúp run code một cách trực tiếp cho cả các trang web tĩnh hay web động, đồng thời khi ta thay đổi code thì nó cũng tự động reload trang của chúng ta trên trình duyệt mà không cần phải nhấn F5 như trước đây. Quá tiện lợi phải không nào ?

Để cài đặt bạn làm theo như hình là được:

![image.png](https://images.viblo.asia/2af6974d-efab-4a1a-9ce8-6149d6ba7e46.png)

(Khi cài đặt Visual studio code thì nó không có background glass như hình đâu nhé ?, nếu bạn thích UI như của mình thì có thể tải extension Vibrancy nhé ?).

Sau khi cài đặt xong hết rồi thì chúng ta cùng thử một ví dụ nhỏ nào ?

Tạo một thư mục tên first-project và mở nó bằng Visual studio code

![image.png](https://images.viblo.asia/5198d1fb-647e-416b-be07-ae7ed520de9a.png)

Tạo tiếp file `index.html` và thêm code HTML vào như hình:

![image.png](https://images.viblo.asia/0bc8dbd9-1fec-487e-a7af-2e2e63605b8f.png)

Để thêm code HTML nhanh thì bạn hãy cài extension HTML CSS Support, sau đó gõ dấu `!` sau đó nhấn tổ hợp phím `ctrl + space → enter` sẽ ra nhé.

Thêm đoạn code HTML như hình sau đó click vào chữ Go live như hình:

![image.png](https://images.viblo.asia/ff2cd53f-8908-4a99-b8df-61f9c553cf8d.png)

Nó sẽ tự mở trình duyệt mặc định của máy và hiển thị web, ta được output như hình:

![image.png](https://images.viblo.asia/1ff3d696-fb72-4840-aec4-739a766aeb1c.png)

Nhấn vào button `Click me` và ta được kết quả:

![image.png](https://images.viblo.asia/9d7ad0ea-1cc5-40a3-b825-030a28c30f3b.png)

Thành công rồi đấy, đơn giản đúng không nào ?

https://200lab.io/blog/javascript-es2021/

## 3. Tổng kết

Qua bài viết này, hy vọng bạn sẽ hiểu hơn về JavaScript, những chuyện bên lề của nó cũng như setup môi trường cho việc học JavaScript. Bài viết tiếp theo mình sẽ hướng dẫn các bạn về các câu lệnh console và thực hiện trên công cụ devtool nhé ?