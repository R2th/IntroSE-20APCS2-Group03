Khi bắt đầu tìm hiểu về ReactJS chắc hẳn mọi người đều sử dụng `create-react-app` cho việc khởi tạo một dự án (đơn giản vì nó được đề cập đến trong document của React mà :) ). Đây là một công cụ có thể giúp chúng ta nhanh chóng tạo ra một ứng dụng React, nó rất phù hợp cho việc nghiên cứu, học về React, test nhanh một demo nhỏ, ... Tuy nhiên khi thật sự muốn khởi tạo một dự án thực tế đó không còn là một sự lựa chọn tốt đặc biệt đối với những người chưa có kiến thức sâu về `design structure`. 
Để giải quyết những vấn đề khó khăn trog việc cấu trúc dự án React, `react-boilerplate` được tạo giúp cho các lập trình viên trong việc tạo dựng một cấu trúc dự án một cách khoa học, dễ dàng quản lý code cũng như dễ dàng trong việc debug, maintain, ... Ngoài ra nó còn hỗ trợ nhiều những tính năng hữu ích trong quá trình phát triển dự án.

### Một số modules chính của react-boileplate

react-boilerplate cung cấp một khung làm việc với dự án React dựa trên việc kết hợp những thư viện Javascript được coi là phổ biến và tính sử dụng thực tế cao.

#### Redux
Đây là một thư viện đã không còn xa lạ đối với những lập trình viên React, nó cung cấp giải pháp cho việc quản lý state tập trung trong ứng dụng React, được gọi là Store.

#### reselect
Thư viện `reselect` được sử dụng trong `react-boilerplate` giúp tạo ra các selector làm cho việc lấy dữ liệu, sử dụng các state cho các component trở nên dễ dàng, nhanh chóng.

#### redux-saga
Redux-saga là một thư viện `middleware` trong React nhằm giải quyết các side effects như việc xử lý bất đồng bộ khi load dữ liệu, ... Redux-saga được thiết kế thực sự tốt khi ta đem so sánh nó với một middleware khác là redux-thunk. Nó giúp tách biệt các xử lý bất đồng bộ khỏi action và được đặt vào các sagas, việc đọc code cũng trở nên dễ dàng, dễ hiểu hơn rất nhiều.

#### I18n
`react-boilerplate` được tích hợp thư viện `react-intl` một thư viện cho việc quản lý đa ngôn ngữ trong ứng dụng, các config đã được cài đặt sẵn chỉ cần sử dụng các CLI đã được cung cấp trên document giúp cho việc hỗ trợ đa ngôn ngữ trong ứng dụng React chưa bao giờ lại đơn giản như thế. 

#### Immer 
Một thư viện giúp đảm bảo tính bất biến của dữ liệu, được sử dụng thay thế cho `ImmutableJS` trong các phiên bản trước.

#### react-router

`react-route` là một thư viện giúp quản lý history, các url paths trong ứng dụng ReactJS, đây cũng là một thư viện nổi tiếng đối với các lập trình viên React.

Ngoài các thư viện chính trên `react-boilerplate` còn sử dụng rất nhiều những thư viện khác giúp việc triển khai dự án React trở nên dễ dàng hơn, tiết kiệm nhiều công sức trong việc setup dự án.

### Các tính năng hỗ trợ khác
#### Tổ chức code một cách khoa học
`react-boilerplate` đóng gói các thành phần views, reducers, sagas, styles, ... thành các containers, components một cách rõ ràng, các thành phần đi cùng được đặt chung vào một components, containers, giúp cho việc debug, maintain dễ dàng hơn nhiều so với việc chúng ta thường hay làm theo các tutorials trên mạng khi đặt các thành phần trên thành các thư mục riêng rẽ.

#### Hỗ trợ CLI giúp generate code
Việc khởi tạo một component hay một container mới đi kèm với việc phải tạo rất nhiều files như: reducers.js, sagas.js, ...
Đừng lo lắng đến vấn đề đó khi `react-boileplate` hỗ trợ CLI giúp generate chúng một cách nhanh chóng dựa trên thư viện `Plop`, các lập trình viên hoàn toàn có thể tạo, customize các templates giúp generate codes trong dự án một cách tự động và hiệu quả hơn.

#### Hỗ trợ JS mới
Các cách viết mới của ES6 được hỗ trợ, sử dụng trong `react-boilerplate`.

#### Các config giúp tăng hiệu năng
`react-boilerplate` được config và sử dụng các thư viện một cách tối ưu.

### Bắt đầu sử dụng react-boilerplate

Để khởi tạo một dự án với `react-boilerplate` không hề phức tạp. Đầu tiên bạn cần clone source của `react-boilerplate` trên github:

``` 
git clone https://github.com/react-boilerplate/react-boilerplate.git 
```

Tiếp đến là chạy lệnh setup để tự động setup môi trường:
```
npm run setup
```

Chạy lệnh clean để loại bỏ example app:
```
npm run clean
```

Việc còn lại là bắt đầu chiến thôi. Quá dễ dàng cho việc setup một dự án với bao nhiêu thư viện và config phức tạp :).

### Kết luận
Có thể ví `react-boilerplate` như một framework thực thụ khi nó giúp cho lập trình viên tạo ra một khung làm việc hỗ trợ đầy đủ các chức năng cần thiết cho việc phát triển dự án đi kèm với nhiều những tính năng hỗ trợ. Bạn hãy cân nhắc sử dụng `react-boilerplate` khi muốn phát triển một dự án React. Bài viết mang tính chất giới thiệu về `react-boileplate` các bạn có thể tham khảo thêm tại document của nó [tại đây](https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/general) và [đây](https://www.reactboilerplate.com/)