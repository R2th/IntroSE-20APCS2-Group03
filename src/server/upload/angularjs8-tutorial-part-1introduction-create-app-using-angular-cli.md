> Trong phần này chúng ta sẽ tìm hiểu cách xây dứng ứng dụng Angularjs8 cơ cơ bản. 
### Introduction 
Angularjs là một bộ Javascript Framework rất mạnh và thường được sử dụng để xây dựng project Single Page Application (SPA). Nó hoạt động dựa trên các thuộc tính mở rộng HTML (các atributes theo quy tắc của Angular). Đây là một Framework mã nguồn mở hoàn toàn miễn phí và được hàng ngàn các lập trình viên trên thế giới ưa chuộng và sử dụng.

AngularJS là một framework có cấu trúc cho các ứng dụng web động. Nó cho phép bạn sử dụng HTML như là ngôn ngữ mẫu và cho phép bạn mở rộng cú pháp của HTML để diễn đạt các thành phần ứng dụng của bạn một cách rõ ràng. Hai tính năng cốt lõi: Data binding và Dependency injection của AngularJS loại bỏ phần lớn code mà bạn thường phải viết. Nó xảy ra trong tất cả các trình duyệt, làm cho nó trở thành đối tác lý tưởng của bất kỳ công nghệ Server nào.

### What new Angularjs8

#### Differential Loading of Modern JavaScript
CLI sẽ bắt đầu sản xuất các gói JavaScript kế thừa (ES5) và hiện đại (ES2015 +) như một phần của quy trình xây dựng, sẽ được tải phía máy khách khác nhau để cải thiện tốc độ tải và thời gian để tương tác (TTI) cho các trình duyệt hiện đại.
#### Opt-in Ivy Preview
Bản xem trước về cách ứng dụng của bạn sẽ hoạt động với Ivy.
#### Angular Router Backwards Compatibility
Chúng tôi đã thêm một chế độ tương thích ngược giúp đơn giản hóa đường dẫn nâng cấp cho các dự án lớn. Nó sẽ giúp các nhóm di chuyển đến Angular dễ dàng hơn bằng cách cho phép tải nhanh các phần của ứng dụng AngularJS bằng cách sử dụng $route APIs.
####  Improved Web Worker Bundling
Web workers are a great way of writing code that runs off of the main thread, improving the speed and parallelizability of your application. We’re adding bundling support for web workers to our CLI to address this common request from developers.
Web workers là một cách tuyệt vời để viết mã chạy ra khỏi luồng chính, cải thiện tốc độ và tính song song của ứng dụng của bạn. 
#### Opt-In Usage Sharing
Để phù hợp hơn với những nỗ lực của chúng tôi với những gì cộng đồng cần, chúng tôi đã thêm từ xa vào CLI của chúng tôi. Với sự đồng ý của bạn, chúng tôi sẽ bắt đầu thu thập thông tin ẩn danh về những thứ như các lệnh được sử dụng và tốc độ xây dựng. C

### Create app using angular CLI

Trong suốt hướng dẫn này, bạn sẽ cập nhật và mở rộng ứng dụng khởi động đó để tạo ứng dụng tên là Tour of Heroes. Trong phần hướng dẫn này:
```
1. Cài đặt môi trường của bạn.
2. Tạo một không gian làm việc mới và khởi tạo dự án ban đầu.
3. Phục vụ ứng dụng.
4. Thay đổi ứng dụng.
```
### Set up your environment.
```
npm install -g @angular/cli
```
### Create a new workspace and an initial application

> Bạn phát triển ứng dụng trong context workspace của  Angular. Một context workspace chứa các tệp cho một hoặc nhiều ứng dụn. Ứng dụng là tập hợp các file bao gồm các ứng dụng, thư viện hoặc các bài kiểm tra đầu cuối (e2e). Đối với hướng dẫn này, bạn sẽ tạo ra một workspace làm việc mới.

#### Để tạo một workspace và khởi tạo ứng dụng ban đầu:
1. Đảm bảo rằng bạn chưa có trong thư mục workspace làm việc Angular. Ví dụ: nếu trước đây bạn đã tạo workspace làm việc Bắt đầu, hãy đổi thành thư mục cha của thư mục đó.
2. Chạy lệnh CLI ng new và cung cấp tên angular-tour-of-hero, như được hiển thị ở đây:
```
ng new angular-tour-of-heroes
```
3. Lệnh ng new nhắc bạn thông tin về các tính năng để đưa vào ứng dụng ban đầu. Chấp nhận mặc định bằng cách nhấn phím Enter hoặc Return.
Angular CLI cài đặt các gói npm Angular cần thiết và các phụ thuộc khác.
Nó  tạo ra các tệp ứng dụng workspace  và khởi động sau:
.Một không gian làm việc mới, với một thư mục gốc có tên angular-tour-of-hero.
.Một dự án ứng dụng bộ khung ban đầu, còn được gọi là angular-tour-of-hero (trong thư mục con src)
. Một dự án thử nghiệm đầu cuối (trong thư mục con e2e).
.Tập tin cấu hình liên quan.
### Serve the application
> Để chạy ứng dụng.
```
cd angular-tour-of-heroes
ng serve --open
```
Lệnh ng serve xây dựng ứng dụng, khởi động máy chủ phát triển, xem các tệp nguồn và xây dựng lại ứng dụng khi bạn thay đổi các tệp đó. --open mở trình duyệt tới http: // localhost: 4200 /.
Bạn có thể thấy ứng dụng trên trình duyệt của bạn.
### Angular components
Trang bạn nhìn thấy là bề ngoài ứng dụng. Vẻ bề ngoài được điều khiển bởi một thành phần Angular có tên AppComponent.

Các thành phần là các khối xây dựng cơ bản của các ứng dụng Angular. Được hiển thị dữ liệu trên màn hình, lắng nghe input của người dùng và thực hiện hành động dựa trên đầu vào đó.
### Make changes to the application
Mở dự án trong trình soạn thảo hoặc IDE yêu thích của bạn và điều hướng đến thư mục src/app để thực hiện một số thay đổi cho ứng dụng khởi động. Bạn sẽ thấy việc triển khai AppComponent shell được phân phối trên ba tệp:
```
app.component.ts được viết bằng TypeScript.
app.component.html được viết bằng HTML.
app.component.css :các kiểu CSS riêng của thành phần.
Change the application title
```
> Mở tệp (app.component.ts) và thay đổi giá trị của thuộc tính tiêu đề thành 'Tour of Heroes'..
```
//app.component.ts (class title property)

title = 'Tour of Heroes';

```
> Mở tệp (app.component.html) và xóa mẫu mặc định được tạo bởi Angular CLI. Thay thế nó bằng dòng HTML sau.

```
//app.component.html (template)

<h1>{{title}}</h1>

```
Refreshes trình duyệt và hiển thị nên title mới. 

### Add application styles
Hầu hết các ứng dụng cho ra một cái nhìn nhất quán trên toàn ứng dụng. CLI đã tạo một style.css trống cho mục đích này. Đặt style toàn ứng dụng của bạn ở đó.

Mở src/style.css và thêm mã dưới đây vào tệp.

```
//src/styles.css (excerpt)

/* Application-wide Styles */
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
h2, h3 {
  color: #444;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[type="text"], button {
  color: #888;
  font-family: Cambria, Georgia;
}
/* everywhere else */
* {
  font-family: Arial, Helvetica, sans-serif;
}

```
### Live example 
https://angular.io/generated/live-examples/toh-pt0/stackblitz.html
### Link source demo.
https://angular.io/generated/zips/toh-pt0/toh-pt0.zip

### Sumary
Bạn đã tạo cấu trúc ứng dụng ban đầu bằng cách sử dụng Angular CLI.

Bạn đã học được rằng các thành phần Angular hiển thị dữ liệu.

Bạn đã sử dụng dấu ngoặc kép của phép nội suy để hiển thị tiêu đề ứng dụng.

Bài viết của mình đến đây là hết hẹn gặp lại các bạn tại các bài viết sau.

Tài liệu tham khảo:

https://docs.angularjs.org/guide/introduction

https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7

https://angular.io/tutorial/toh-pt0

https://angular.io/guide/setup-local