# 1. Sentry.io
- Sentry.io là 1 platform cho phép bạn thực hiện monitoring các lỗi xảy ra với application của mình.
- Khi xảy ra lỗi thì bạn sẽ nhận đc alert email và có thể nhẹ nhàng lên sentry.io xem log lỗi thay vì mò trong file log dài vài nghìn dòng =))
- Sentry.io support bắt lỗi với nhiều ứng dụng chạy trên các ngôn ngữ (Javascript, Python, Ruby, Node, Go) và framework khác nhau (React, Django, Rails, Flask, Angular, Lavarel), cả iOS, Android, React Native.
## a. Signup
- Để đăng ký account với sentry.io thì bạn chỉ cần truy cập https://sentry.io/signup/
- Điền các thông tin cần thiết vào form hoặc đăng ký qua account của bên thứ 3 như google, github, ...
![](https://images.viblo.asia/c77d68ae-a687-45a2-9dcf-ea0669834d33.png)

## b. Create project
- Sau khi đã đăng ký account thành công, bạn cần tạo 1 project.
- Click vào Projects trên left sidebar, click vào button Create Project để đi tới màn hình tạo project mới như hình bên dưới và điền các thông tin cần thiết.
- Trong ví dụ này mình chọn Server Rails và Project name là viblo.

![](https://images.viblo.asia/0414f4ac-9f16-40a0-a43c-f437dc1bb862.png)

## c. Config project
- Sau khi tạo project thành công, bạn cần thực hiện config project.
- Click vào Settings trên left sidebar, click vào Projects trên menu và chọn project viblo để vào màn hình Settings cho project viblo như bên dưới.

![](https://images.viblo.asia/66b8a03f-a6bd-4767-82b1-daf98dc67a92.png)

- Một vài Settings mà bạn cần chú ý bao gồm Project Settings, Project Teams, Alert, Security & Privacy, Error Tracking, Client Keys DNS.
- Trong đó **Project Settings** cho phép bạn thay đổi các thông tin của Project như Name, Platform, Allowed Domains, .....

![](https://images.viblo.asia/412c55f3-526c-4f54-a203-641efc72283c.png)

- **Project Teams** là danh sách các team có trong project, các member có trong các team này có thể xem log isssue và thực hiện config settings cho project của bạn tuỳ theo role của member đó trong team và trong project.

![](https://images.viblo.asia/92a43534-9573-4511-8830-2754b1d017a8.png)

- **Alert** là danh sách các rule và các action được trilgger khi xảy ra lỗi, bạn có thể config để gửi SMS thông qua Twilio hoặc gọi 1 callback URL để thực hiện 1 action khác.

![](https://images.viblo.asia/71eddc4c-fd26-49c0-8a87-2e1391fc21cf.png)

- **Client Keys (DSN)** lưu các thông tin config của Sentry mà bạn cần integrate vào source code để Sentry có thể hoạt động tốt, trong đó DSN và domain sẽ nhận được event khi có lỗi xảy ra, chú ý là DSN chứ không phải là DNS nha, chú ý kẻo nhầm =)).

![](https://images.viblo.asia/a4cc58c8-13b7-41ae-8795-b93979d95944.png)

- **Error Tracking** là danh sách link document của từng platform, ngôn ngữ để giúp bạn bắt đầu integrate sentry vào source code sau khi đã config xong.

![](https://images.viblo.asia/ceca89b4-086e-4e71-ba31-e43b894b25ac.png)

# 2. Gem sentry-raven
## a. Install:
- Để intergrate sentry với Rails, bạn có thể instal gem sentry-raven vào Gèmile và chạy bundle install.
    ```ruby
    # Gemfile
    gem "sentry-raven"
    ```
- Tạo file config/initializers/sentry.rb để config DSN cho sentry.
    ```ruby
    # config/initializers/sentry.rb
    Raven.configure do |config|
      config.dsn = ENV["SENTRY_DSN"]
    end
    ```
- Ngoài `dsn`, bạn cũng có thể config thêm 1 số value khác cho sentry.
- `environments` danh sách các environment sẽ gửi event tới sentry khi xảy ra lỗi.
-  Ví dụ: `config.environments = [production]` chỉ gửi event tới sentry khi xảy ra lỗi ở môi trường production.
- `excluded_exceptions` danh sách các lỗi sẽ được bỏ qua, không gửi event tới sentry khi xảy ra lỗi.
- Ví dụ: `config.excluded_exceptions -= ["ActiveRecord::RecordNotFound"]` theo mặc định thì khi xảy ra lỗi `ActiveRecord::RecordNotFound` sẽ không gửi event tới sentry, config này sẽ gửi event tới sentry khi xảy ra lỗi `ActiveRecord::RecordNotFound`.
- Khi sử dụng `rescue_from` thì event sẽ không được tự động gửi tới sentry, bạn cần gửi event tới sentry manual bằng cách gọi lại
    ```ruby
    Raven.capture_exception(exception)
    ```

# 3. Issue Stream
- Khi có lỗi xảy ra thì event sẽ được gửi tới project trên sentry và hiển thị trên issue của project.

![](https://images.viblo.asia/f4756723-2071-424b-96d7-23d9ecef6832.png)

- Với từng issue, sentry sẽ hiển thị đầy đủ các thông tin cần thiết như error messaage, browser, OS, level error, url, query string, body, .... giúp bạn có đủ thông tin để điều tra, tái hiện cũng như fix được bug.