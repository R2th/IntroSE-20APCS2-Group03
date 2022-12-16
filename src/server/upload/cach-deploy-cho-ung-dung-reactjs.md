Vấn đề deploy một ứng dụng để test là một vẫn đề mà các developer luôn gặp phải, trong bài này chúng ta sẽ tìm hiểu cách deploy một ứng dụng viết bằng ReactJs.
Đầu tiên. chúng ta phải chú ý các điều sau:

- Code phải được lưu trên một công cụ quản lý theo phiên bản như git, hg…
- Không cần thêm các file được tạo ra tự động vào danh sách bỏ qua của công cụ kiểm soátnhư node_modules, generated js, CSS.

Một số thuật ngữ được sử dụng trong qua trình deploy:

- Quá trình xây dựng: quy trình chuyển đổi mã nguồn thành một gói "có thể thực thi" của trình duyệt.
- Bản dựng: Kết quả của quá trình trước đó, một tạo phẩm được tạo ra trong quá trình xây dựng bao gồm mã nguồn được giải thích và các tài sản được biên dịch.
- Triển khai: Quy trình đưa (triển khai) BUILD vào máy chủ.


1. Quản lý gói(Package Management)

Trong một ứng dụng react, có 2 công cụ chủ yếu được dùng để quản lý các thư viện là `NPM` và `yarn`. NPM là công cụ quản lý gói truyền thống cho Node.js. `Yarn` là một công cụ mới, nó nổi lên như là một cách thức để giải quyết một số vấn đề khi gặp phải khi sử dụng NPM:
- Xác định: đảm bảo rằng một tiến trình cài đặt hoạt động trên một hệ thống sẽ hoạt động chính xác theo cùng một cách trên bất kỳ hệ thống nào khác, nhờ một khóa khóa ngắn gọn (yarn.lock) và một thuật toán cài đặt xác định.
- Bảo mật: Yarn sử dụng tổng kiểm tra để xác minh tính toàn vẹn của mọi gói đã cài đặt trước khi mã của nó được thực hiện.
- Tốc độ: Yarn lưu trữ từng gói mà nó tải xuống để không bao giờ phải tải xuống lại.

Về cơ bản, chúng ta nên sử dụng Yarn làm công cụ quản lý các thư viện js.Dưới đây là một số phương pháp hay và mẹo khi sử dụng Yarn:
- Luôn luôn commit tập tin yarn.lock.
- Yarn tiêu thụ cùng định dạng tệp với tên NPM. Nếu chúng ta muốn kiểm tra `Yarn` trên một dự án hiện có, chỉ cần gõ `Yarn`.
- Tìm hiểu thêm về NPM vs Yarn trong tài liệu sau [NPM vs Yarn](https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc).


2. Linting

Khi chúng ta đã cài đặt các phụ thuộc của mình, chúng ta sẽ muốn thiết lập một công cụ quan trọng để theo dõi chất lượng code của chúng ta: đó là lint.

Trong ngắn hạn, linting được sử dụng để tìm mã code không phù hợp hoặc không mong muốn trong một dự án. Bằng cách linting mã code của chúng ta, chúng ta có thể bắt lỗi sớm, tránh những sai lầm tiềm năng, thực thi một tiêu chuẩn mã hóa code và giữ mã code dễ hiểu hơn.
Chúng ta có nhiều linters trong thế giới JavaScript, theo thứ tự thời gian là jshint, jslint, eslint. 
Eslint là một trong những ưu thế trong JavaScript và JSX, do vậy nên thêm một file `.eslintrc` vào thư mục gốc của dự án và luôn commit nó.

3. Testing

Điều tiếp theo cần làm là cần viết test cho các dòng code của chúng ta,để đảm bảo chất lượng khi thêm các chức năng mới hay refactor lại code.

Có rất nhiều framwork javascrip cho việc viết test như  ava, jasmine, Jest, mocha, tape. Với ứng dụng bằng reactJs, chúng ta nên dùng `Jest` để test, bởi vì `Jest` bao gồm một dom giả (jsdom), thích hợp với React.

4. Build

Có rất nhiều sự lựa chọn trong giai đoạn này, với những lựa chọn phổ biến nhất là Browserify và webpack.

Với Browserify chúng ta sử dụng một công cụ như Gulp hoặc Grunt và một danh sách dài các transforms và plugins để chạy mã code.

Webpack cung cấp đủ các thử cần thiêt để  chúng ta không cần Grunt hoặc Gulp, và chúng ta chỉ cần khai báo một tệp cấu hình đơn giản để xác định quá trình xây dựng của ứng dụng.
5. Deployment

Bây giờ bạn có thể muốn bao gồm những thứ ở đây là những thứ cần thiết để chạy ứng dụng của bạn. các tài sản như LESS, SASS, Coffeescript, cũng như các thư mục không mã như .git, node_modules, test, v.v ...
Dưới đây là ví dụ về cách thức CI hoạt động, bao gồm hai công việc:
Công việc xây dựng:

Đầu vào: Biến môi trường + mã nguồn của chúng ta.

Tác vụ: Khởi chạy tập lệnh xây dựng

Đầu ra: Tạo dựng, tạo ID

Triển khai công việc:

Đầu vào: ID đã xây dựng ở bước 1.

Công việc:
- Đẩy code lên amazon S3 với id commit, tên nhánh và số build.
- Gắn thẻ cam kết với số build và tên nhánh nếu có.