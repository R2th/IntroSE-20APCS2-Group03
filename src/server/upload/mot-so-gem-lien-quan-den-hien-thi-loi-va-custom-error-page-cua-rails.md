# 1. Gem better_erros:
- Gem `better_errors` được dùng để thay thế trang hiển thị lỗi mặc định của Rails với nhiều chức năng hữu ích hơn
## a. Default error page:
- Trang hiển thị lỗi mặc định của Rails gồm các phấn như sau
    ![](https://images.viblo.asia/cfdb9cb2-4c7e-4c40-8a04-420fe371fd7f.png)
    * Dòng code gay ra lỗi
    * Stack trace
    * Error response
    * Shell để run test code
## b. Install gem better_erors:
- Install gem `better_errors`
    ```ruby
    # Gemfile
    gem "better_errors"
    gem "binding_of_caller"
    ```
## c. Better errors page:
- Trang hiển thị lỗi của `better_errors` gồm các phần như sau
![](https://images.viblo.asia/7a90bc8e-230b-4f9d-a4a3-6982e64fbf03.png)
    * Full stack trace
    * Source code tương ứng với mỗi stack trace
    * Variable được gọi và giá trị của variable trong stack trace
    * Shell ứng với mỗi stack trace
    * Link để mở source code của stack trace với editor tương ứng
- Link source code demo: https://github.com/thanhlt-1007/demo_better_errors

# 2. Gem exception_handler:
- Gem `exception_handler` được dùng để thay thế trang hiển thị lỗi mặc định của Rails với dynamic views có thể custom được
## a. Install gem exception_handler:
- Install gem `better_errors`
    ```ruby
    # Gemfile
    gem "exception_handler"
    ```
- Enable gem `exception_handler` ở môi trường developmennt
    ```ruby
    # config/application.rb
    config.exception_handler = {
      dev: true
    }
    ```
## b. Exception handler page:
- Trang hiển thị lỗi của `exception_handler`
![](https://images.viblo.asia/9844ebb2-8800-4c1d-918c-3093f0db4838.png)
## Các option khác để custom exception handler:
### i: DB:
- Sau khi install gem `exception_handler` ta có thể chạy
    ```ruby
    rails db:migrate
    ```
- Gem `exception_handler` sẽ update file schema, tạo table `errors` có nội dung như sau
    ```
    # db/schema.rb
    create_table "errors", force: :cascade do |t|
        t.text "class_name"
        t.text "status"
        t.text "message"
        t.text "trace"
        t.text "target"
        t.text "referrer"
        t.text "params"
        t.text "user_agent"
        t.datetime "created_at", null: false
        t.datetime "updated_at", null: false
      end
    ```
- Khi  xảy ra lỗi, gem `exception_handler` sẽ insert record vào table `errors`
![](https://images.viblo.asia/29b04888-9b32-4a9a-a7d8-8f95491c490d.png)
- Tạo model `Error` ứng với table `errors`
    ```ruby
    # app/models/error.rb
    class Error < ApplicationRecord
    end
    ```
### ii. Views (layouts, locale):
- Màn hình error của gem `exception_handler` được generate bởi action `show` của `ExceptionHandler::ExceptionsController`
-Bạn có thể check source code tại [đây](https://github.com/richpeck/exception_handler/blob/master/app/controllers/exception_handler/exceptions_controller.rb)
- Để custom layout, bạn có thể overrite lại action `show` của `ExceptionHandler::ExceptionsController` hoặc thay đổi `layout` và `locale`
#### Custom locale
- Để custom lại locale bạn tạo file `en.yml`
    ```yml
    # config/locales/en.yml
    en:
      exception_handler:
        not_found:              "Your message here" # -> 404 page
        unauthorized:           "You need to login to continue"
        internal_server_error:  "This is a test to show the %{status} of the error"
    ```
- Với key là english name của lỗi
- Bạn có thể tham khảo tại [đây](https://github.com/rack/rack/blob/master/lib/rack/utils.rb#L520-L584).
- Với mỗi message bạn có thể nhận 2 params là `%{message}` và `%{status}`
#### Custom layout
- Theo mặn định thì error page của gem `exception_handler` sẽ  sử dụng layout `layouts/exception`
- Bạn có thể check tại [đây](https://github.com/richpeck/exception_handler/blob/master/app/views/layouts/exception.html.erb)
- Bạn có thể overrite lại file layout này
- Hoặc sử dụng config để quy định layout theo 1 trong các hướng sau
- Sử dụng layout được quy định bởi `ApplicationController`
    ```ruby
    # config/application.rb
    config.exception_handler = {
      exceptions: {
        all: { layout: nil }
      }
    }
    ```
- Quy định layout riêng cho từng lại exception theo HTTP status
    ```ruby
    # config/application.rb
    config.exception_handler = {
      exceptions: {
        all: { layout: 'exception' },
        5xx: { layout: 'server_error_exception' },
        4xx: { layout: 'client_error_exception' },
        500: { layout: 'internal_server_error_exception' }
      }
    }
    ```
### iii. Generators:
- Để generate ra các file view của gem, bạn có thể chạy lênh sau
    ```ruby
    rails g exception_handler:views
    ```