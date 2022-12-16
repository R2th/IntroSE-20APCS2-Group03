> Dạo gần đây vì nhu cầu của dự án, khách hàng muốn team mình code Java bằng framework Dropwizard. Qua mấy ngày tìm hiểu thì mình có một vài chia sẻ như sau :


> Dropwizard là gì ?
> https://www.dropwizard.io/
> 
> Dropwizard is a Java framework for developing ops-friendly, high-performance, RESTful web services
> 
> Là một framework nhỏ gọn giúp chúng ta phát triển API một cách nhanh chóng và tiện lợi. Cùng với hiệu năng cao với các ứng dụng microservice.


>    Và lập trình viên chúng ta bao giờ cũng thế! Khi học một ngôn ngữ hoặc framwork mới, chúng ta sẽ làm một project example với cái chúng ta đang học.Mình cũng vậy, vậy nên hôm nay mình xin trình bày cách tạo một ứng dụng API đơn giản bằng Dropwizard. 
>    
>    Bao gồm tạo mới 1 User, xem danh sách User, xem thông tin một User, cập nhật User, và xóa User.
## 1. Tạo project maven
Đầu tiên mình sẽ tiến hành tạo một project maven.
{@embed: https://gist.github.com/tungpv-0974/f2131b561e290ecd80df40524b8e43e9}
Sau đấy mình thêm các dependency cần thiết như `dropwizard` và `lombok`:

{@embed: https://gist.github.com/tungpv-0974/207fbd8d694baa1ae986bd78deddf55b}
## 2. Config
Tiến hành tạo class `AppConfig` extends class `Configuration` như sau:
{@embed: https://gist.github.com/tungpv-0974/85e003a49509aca7f40c66efc20e2c5b}

Tạo file config.yml để config:
{@embed: https://gist.github.com/tungpv-0974/eb6ad5a1cf7e2c2ec73eaedb40ae9611}

Và cuối cùng, chương trình nào cũng phải có hàm main đúng không ?

Mình tạo class `MainApplication` chứa hàm `main` để có thể chạy được server:
{@embed: https://gist.github.com/tungpv-0974/88ae8149df180e90cb363fd6ba0a3506}

> Vậy là đã đủ để mình có thể phát triển RestAPI với dropwizard!


## Implement Resource

Mình sẽ tạo ra một `Model` có tên là `User`: *(Mình có sử dụng lombok để không phải viết constructor, setter và getter)*
{@embed: https://gist.github.com/tungpv-0974/56ed24e520a3f5894962d79304b089ec}

Tiếp theo mình tạo `UserResource`, *(Resource ở dropwizard giống như controller trong Spring framework)*.

Trong UserResource này mình có đầy đủ 5 phương thức GET, POST, PUT và DELETE, đầy đủ cho một `RestfulAPI` đơn giản :
{@embed: https://gist.github.com/tungpv-0974/fbc56f1749420b6afd633147f5537225}

Với dropwizard, mình phải tiến hành đăng ký resource mới tạo vào trong hàm run() ở class `MainApplication` thì mới có thể gọi đến các đầu API mình vừa viết ở trong class `resource`:
```
    @Override
    public void run(AppConfig configuration, Environment environment) {
        environment.jersey().register(new UserResource());
    }
```

> Vậy là xong rồi !


**Mình tiến hành test API với các curl sau:**
{@embed: https://gist.github.com/tungpv-0974/0d1c229aceb8e644e8c606e5143df1df}

Mặc dù `Dropwizard` sinh ra để hỗ trợ để tạo ra các API, nhưng nó cũng hỗ trợ webview nếu chúng ta muốn. Trong bài sau, mình sẽ tiến hành cấu hình `Dropwizard` với `thymeleaf` để thêm giao diện cho webapp này!
> MÌNH ĐÃ CẬP NHẬT PHẦN CONFIG để sử dụng thymeleaf với dropwizard ở đây ! https://viblo.asia/p/dropwizard-view-voi-thymeleaf-template-engine-63vKjv36K2R
> 
> Hẹn gặp lại! :grinning::grinning::grinning:

> SOURCE CODE MÌNH CÓ ĐỂ TẠI ĐÂY !!! https://github.com/tungpv-0974/example-dropwizard