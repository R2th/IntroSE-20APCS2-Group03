![](https://images.viblo.asia/a4105cc0-5f33-46bd-bfaf-4bc4bca3b5fa.png)

Bắt đầu từ Rails 6, Webpacker đã trở thành trình biên tập mặc định cho JavaScript, có nghĩa là tất cả các dòng code JS mà bạn viết sẽ được xử lý bởi Webpacker thay vì assets pipeline cũ hay còn được biết đến với cái tên Sprockets. Ở bài viết này chúng ta sẽ cùng nhau tìm hiều về Webpacker nhé.

  ### 1. Webpacker là gì

`webpacker` là một gem đóng gói `Webpack` - một tool JavaScript nổi tiếng dùng để quản lý và đóng gói JavaScript code - và cung cấp các helpers để chúng ta có thể sử dụng `Webpack` trong ứng dụng Rails của mình. Nói đơn giản thì nó cung cấp cho Rails khả năng sử dụng `Webpack`.

Mỗi khi khởi tạo một ứng dụng mới với Rails 6, bạn sẽ nhìn thấy các output này được in ra trong console.

```
rails webpacker:install
RAILS_ENV=development environment is not defined in config/webpacker.yml, falling back to production environment
      create config/webpacker.yml
Copying webpack core config
      create config/webpack
      create config/webpack/development.js
      create config/webpack/environment.js
      create config/webpack/production.js
      create config/webpack/test.js
```

Đồng thời chúng ta cũng có thể tìm thấy gem `webpacker` trong `Gemfile` của ứng dụng.

***Lưu ý :***
> Với các anh em vẫn còn đang làm việc với ứng dụng Rails cũ, khi cập nhật lên Rails 6, sẽ không tự cài đặt gem `webpacker`. Chúng ta cần phải tự include nó vào `Gemfile` và chạy lệnh `rails webpacker:install`.

  ### 2. JavaScript có "chỗ ở mới"

Trước khi Rails 6 xuất hiện, tất cả các JavaScript code đều nằm trong đường dẫn `app/assets/javascript`. Nhưng trong ứng dụng chạy Rails 6, đường dẫn `app/assets/javascript` không còn tồn tại nữa. Thay vào đó, chúng ta có đường dẫn `app/javascript` để lưu trữ các đoạn code JS của mình. Với đường dẫn mới, chúng ta có thể biết được là nó là nơi chứa các đoạn JS mà sẽ được phần view của ứng dụng sử dụng, trực quan hơn rồi nhỉ?

Còn giờ thì cùng nhau đi sâu vào nội dung của đường dẫn mới thôi.

```
▶ tree app/javascript
app/javascript
├── channels
│   ├── consumer.js
│   └── index.js
└── packs
    └── application.js

2 directories, 3 files
```

Chúng ta có thể thấy nó chứa 2 thư mục là `channels` và `packs`. Thư mục `channels` được tạo ra bởi `ActionCable` của Rails. Hiện tại, chúng ta chưa cần quan tâm đến nó mà sẽ tập trung vào thành phần quan trong hơn đó là `packs`, cùng xem nó chứa gì nhé.

  ### 3. Pack là gì

`Webpack` có một concept dùng để xác định các entry points có thể xem như là các files nào sẽ được `Webpack` duyệt qua đầu tiên khi nó bắt đầu biên dịch JS code của bạn. Gem `webpacker` tạo một pack có tên là `application` và tên file sẽ là `application.js` nằm ở đường dẫn `app/javascript/packs`. Liên hệ với assets pipeline, file này sẽ tương tự như `app/assets/javascripts/application.js`

Pack `application` được Rails tạo ra sẽ chứa các đoạn code liên quan đến các components như `turbolinks`, `Active Storage`, và `Action Cable`.

> Bạn sẽ thấy là tất cả các Rails frameworks mà có JavaScript component như Rails-UJS, Turbolinks, Active Storage đều được migrate để hỗ trợ Webpacker. Kể cả framework mới như Action Text trong Rails 6 cũng hoạt động tốt với Webpacker.

Vậy là, chúng ta có thể biết được pack `application` sẽ là điểm đầu vào của tất cả JS code có trong ứng dụng. Chúng ta có thể tạo thêm các pack tùy chỉnh và đặt chúng trong `app/javascript/packs` và Webpacker sẽ tự động tìm chúng khi đang biên dịch.

Cài đặt này sẽ tự động config bởi Webpack trong file `config/webpacker.yml`



```
# config/webpacker.yml
5: source_entry_path: packs
```

Nếu muốn cho Webpack tìm kiếm ở các đường dẫn khác, chúng ta có thể config `resolved_paths` trong `config/webpacker.yml`.

  ### 4. Biên dịch JavaScript code

Tiếp theo, chúng ta sẽ tìm hiểu làm thế nào mà các đoạn code JS được biên dịch bởi `Webpack` với sự trợ giúp của gem `webpacker`. Trong môi trường phát triển (development mode), bạn không cần làm bất cứ thứ gì. Khi chạy `rails server`, trình biên dịch sẽ hoạt động đồng thời với request tương tự như assets pipeline xưa cũ.

**4.1. Live reloading với webpack-dev-server**

Webpacker tạo một file `bin/webpack-dev-server` có thể được sử dụng cho mục đích live reloading trong giai đoạn phát triển. Chúng ta sẽ phải tự chạy riêng server `webpack-dev-server` cho mục đích này và thành quả sẽ là live reloading cho những chỉnh sửa nóng trong các module.

**4.2. Production mode**

Trong môi trường production, webpacker sẽ thêm tác vụ `webpacker:compile` vào tác vụ `assets:precompile`. Cho nên, nếu pipeline chạy `assets:precompile` thì nó cũng sẽ kiêm luôn các files biên dịch được biên dịch bởi webpack. Vì gói webpack là một gói thuộc `package.json`, `yarn` sẽ lo việc cài đặt nó, nên, nó có thể biên dịch JS code.

  ### 5. Đính kèm JavaScript code vào ứng dụng

Chúng ta đã thấy các thức mà webpacker biên dịch JS code, nhưng làm thể nào để đính kèm nó vào ứng dụng của chúng ta nhỉ?

Cho vấn đề đó, Webpacker cung cấp một phương thức helper có tên là `javascript_pack_tag`. Như cái tên, chúng ta sử dụng nó để đính kèm các pack của webpacker vào các file layout. Nó cũng tương tự như `javascript_link_tag` của đàn anh assets pipeline thôi nhé.

```
# app/views/layouts/application.html.erb

<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```

`javascript_pack_tag` sẽ lo việc gọi đến các assets đã được biên dịch một cách chính xác trong môi trường phát triển cũng như production tương tự như assets pipeline.



Bên trên mình đã cung cấp một các thông tin sơ lược về `webpacker`, và làm thể nào nó có thể cho chúng ta sử dụng `Webpack` trong một ứng dụng Rails 6 và hiểu được `packs` trong thế giới của `Webpack`. Bên cạnh đó là quá trình biên dịch diễn ra như thế nào và làm sao sử dụng các đoạn code đã được biên dịch trong ứng dụng của chúng ta. Hẹn gặp lại các bạn ở bài sau, mong là bài viết đã mang lại các thông tin bổ ích cho các bạn. Peace!

## **Link tham khảo:**

https://github.com/rails/webpacker

https://prathamesh.tech/2019/08/26/understanding-webpacker-in-rails-6/