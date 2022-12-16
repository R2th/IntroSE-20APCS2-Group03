# 5 quy tắc cơ bản trong xây dựng cấu trúc một project Node.js

Không giống như với PHP, phần lớn các Node.js framework không có một cấu trúc thư mục cố định. Điều này giúp chúng ta có thể linh hoạt hơn trong việc tự xây dựng cấu trúc theo nhu cầu và sở thích của mình. Tuy nhiên đó cũng sẽ là một thử thách không mấy đơn giản đối với người mới bắt đầu.
Việc xây dựng một project với cấu trúc hợp lý là một quá trình cần thiết để sẵn sàng cho một project linh hoạt, hoạt động hiệu quả, dễ dàng mở rộng và maintain. Tất nhiên, chúng ta hoàn toàn có thể xây dựng một project tùy ý, miễn là nó chạy được; có điều vấn đề sẽ trở nên phức tạp nếu ứng dụng của ta lớn dần lên và cần thiết phải mở rộng.
Trong bài này, chúng ta sẽ cùng tham khảo một số quy tắc cơ bản trong việc xây dựng cấu trúc cho một project Node.js

Có rất nhiều cách để tổ chức source code cho một project Node.js, và mỗi cách đó đều tồn tại những ưu, nhược điểm riêng. Tuy nhiên, dựa theo kinh nghiệm và chia sẻ của cộng đồng Dev Node.js, phần lớn các cách tổ chức source code đều hướng đến 2 yếu tố chính: `clean code` và `dễ dàng mở rộng tính năng`
Dựa trên hai yếu tố chính này, chúng ta có thể tham khảo 5 rules sau:
## #1 Tổ chức thư mục source code dựa trên tính năng
Giả sử rằng bạn đang làm việc với một project có các tính năng liên quan đến user và poroduct. Với mỗi tính năng đó ta sẽ cần có controller, model và view. Khi đó ta có thể sử dụng một cấu trúc thư mục như thế này
```
.
├── controllers
|   ├── product.js
|   └── user.js
├── models
|   ├── product.js
|   └── user.js
├── views
|   ├── product.hbs
|   └── user.hbs
```
Vấn đề của cách triển khai này như sau:
* Mỗi file cần thiết với một tính năng (user hoặc product) bị phân tán đến một thư mục riêng biệt (độc lập nhau: controllers, models, views). Do đó để có thể hiểu được mỗi tính năng hoạt động thế nào, ta buộc phải duyệt cả cây thư mục để xem chi tiết vào từng phần (1)
* Thường thì với mỗi tính năng, controller sẽ cần và thường xuyên làm việc với model và view của tính năng đó. Ở cách sắp xếp trên thì `controllers/product.js` sẽ cần làm việc với `models/product.js`; khi đó tại controller product ta sẽ phải require model như sau: `let ProductModel = require('../models/product');`
* Một vấn đề nữa đó là ngay trong quá trình development, bạn sẽ thường làm việc với controller, model và view gần như liên tục và cùng nhau, việc phải di chuyển cây thư mục quá dài giữa các thành phần này cũng sẽ mất thêm thời gian
> "Rule 1: Organize your files around features, not roles!" via @risingstack

Thay vì sử dụng cấu trúc như trên, chúng ta có thể sử dụng cấu trúc dưới đây, trong đó sẽ lấy tính năng (product, user) làm cách để phân chia thư mục. Cách này sẽ giúp chúng ta hiểu được các tính năng một cách đơn giản hơn
```
.
├── product
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   └── view.hbs
├── user
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   └── view.hbs
```

## #2 Không nên đặt logic trong file index
Trong nodejs, khi ta require một thư mục, require system trước tiên sẽ tìm kiếm file package.json để xác định file đích sẽ thực hiện require. Nếu package.json không tồn tại, require system sẽ sử dụng file index.js . Vì thế index.js được sử dụng như là entry point cho việc require thư mục, thay vì `require('./product/index.js')` chúng ta có thể dùng `require('./product')`. Trong quá trình phát triển, sẽ có những thời điểm mà ta muốn hoặc buộc phải thay đổi cách một feature hoạt động, thay đổi các tài nguyên mà feature yêu cầu; nếu index.js chứa quá nhiều logic thì việc thay đổi sẽ cần nhiều thời gian và gặp nhiều rủi ro hơn. Do đó, tốt nhất index.js không nên chứa các đoạn code logic quan trọng, mà nó chỉ nên được sử dụng như là một file khởi tạo, cung cấp tài nguyên feature đã được export từ các module (file) khác.

## #3 Đặt file test ngay cạnh file thực thi
Test không chỉ được sử dụng để check xem module có cho ra kết quả đúng như mong muốn hay không; test file còn là tài liệu cho module, là một cách rất hiệu quả để  chúng ta có thể tham khảo cách sử dụng, parameters hay kết quả của module là gì. Vì vậy nếu đặt test file ngay cạnh module chính thì sẽ giúp cho việc check lại module api dễ dàng hơn.

> "Rule 3: Place your test files next to the implementation." via @risingstack

```
.
├── product
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   ├── test.js
|   └── view.hbs
├── user
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   ├── test.js
|   └── view.hbs
```

## #4 Sử dụng thư mục `config`
Một điểm rất thuận tiện trong `Laravel` đó là gần như tất cả các config cho các package hoặc feature đều có thể được override và lưu trữ tập trung tại một chỗ (thư mục `config`). Cách làm này sẽ giúp chúng ta dễ tìm kiếm và thao tác khi setup hay điều chỉnh những thông tin cần thiết trong quá trình deployment

```
.
├── config
|   ├── server.js
|   ├── storage.js
|   ├── db.js
├── product
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   ├── test.js
|   └── view.hbs
├── user
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   ├── test.js
|   └── view.hbs
```

## #5 Đặt các `npm script` dài trong thư mục `scripts` thay vì viết vào file `package.json`
Đối với các script dài, việc viết trực tiếp vào file `package.json` sẽ không tối ưu, đôi khi còn gây khó khăn cho việc đọc hiểu và mở rộng. `NPM` khá linh hoạt trong việc start/run một script khi mà nó không chỉ cho phép chạy script theo tên đã được định nghĩa trong file package.json, mà nó còn cho phép chúng ta chạy trực tiếp file thực thi

`npm run --prefix /path/to/file`

```
.
├── scripts
|   ├── setup.sh
|   ├── build.sh
|   ├── clean.sh
├── config
|   ├── server.js
|   ├── storage.js
|   ├── db.js
├── product
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   ├── test.js
|   └── view.hbs
├── user
|   ├── index.js
|   ├── controller.js
|   ├── model.js
|   ├── test.js
|   └── view.hbs
```

Trên đây là một số quy tắc đơn giản giúp chúng ta có thể start một project một cách hợp lý và dễ dàng hơn. Một số thông tin mở rộng có thểm tham khảo tại:

https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/

https://github.com/RisingStack/multi-process-nodejs-example

https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/