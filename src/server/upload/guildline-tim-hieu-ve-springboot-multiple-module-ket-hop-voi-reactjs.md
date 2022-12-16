# 1. Thông tin cơ bản về ReactJS
https://viblo.asia/p/tim-hieu-ve-reactjs-di-kem-voi-spring-boot-thong-qua-vi-du-cua-okta-3P0lPQa45ox
# 2. Apply vào dự án trainning
Cấu trúc cơ bản gồm 3 module chính bên BE : system-batch, system-core và system-api. Và 1 folder app chứa source code bên ReactJs

## Module system-api

![](https://images.viblo.asia/4e7469f6-d8e7-4631-9d53-4f5c59983231.png)

Trong đó, ReactJS : Ngoài thư mục public chứa template chính là file index.html, còn lại ta phân các file js cùng chức năng vào các nhóm thư mục để dễ dàng quản lý. Lưu ý: bên dưới chưa phân tách rõ ràng các file js vào các thư mục theo function để tiện bề quản lý.
![](https://images.viblo.asia/0018213f-4f75-4fa2-a147-9f7fdc426de8.png)
Một số file nổi bật :
- index.html : Template chính
- manifest.json : Chứa các thuộc tính metadata của trang web
- thư mục common : chứa các Component chung, có khả năng reuse nhiều lần
- thư mục constant : chứa các file js khai báo các thuộc tính constant
- thư mục resources : chứa các file static như ảnh, css,...
- thư mục utils : chứa các file js gồm các hàm utils có khả năng reuse nhiều lần

- file App.js : file dùng để phân route, path, cách chia các component. Có thể hiểu là Component/Path management page
- file package.json : khai báo các dependency của ReactJS, config của yarn/npm...Khi muốn install dependency thì sử dụng lệnh yarn install. Khi run ReactJS server thì chạy dòng lệnh yarn start

## Module system-core : chứa các file Entity, Constant, và Repository/Persistent

![](https://images.viblo.asia/ba1336bf-a853-4fb7-a327-789155472291.png)

## Module system-api : security config, API config, controller, service, form,….

![](https://images.viblo.asia/320dbfe4-f3ab-467c-9d4e-cadbbf2004db.png)
- CurrentUser : Custom annotation để tiện việc get Current User đã login
- CustomUserDetailsServiceImpl : custom lại cách thức load user info theo interface UserDetailsService của Spring
- JwtAuthenticationEntryPoint : gửi lỗi 401 khi cố gắng access vào resource khi chưa đăng nhập
- JwtAuthenticationFilter :filter, apply việc xử lý validate token đăng nhập ở từng incoming request, vứt UserPrincipal vào context
- JwtTokenProvider : Custom class, hỗ trợ JwtAuthenticationFilter xử lý generateToken, parse data từ token, validate token theo secret key
- UserPrincipal : Implement UserDetails, custom class miêu tả data mà UserPrincipal sẽ chứa
- WebMvcConfig : Configuration class, override addCorsMappings(), allow connection giữa Spring Server và ReactJS server
- WebSecurityConfig : Config security, encodePassword. Important : .cors(),  // disable csrf because its generate a token for any request, conflict with current login API token
            .csrf().disable()
- thư mục form : Chứa các dto request và response dto, sẽ được trao đổi thông qua API

# 3. Syntax, tranfer giữa các Component của ReactJS
ReactJS sẽ tương tác thông qua giữa nhiều thằng Component với nhau. Thường một số Component sẽ được cung cấp bởi một số thư viện JS đi kèm với Boostrap để thiết kế, vì vậy nếu ta thiết kế một 
trang web với các thành phần html thuần, sẽ gặp khó khăn trong việc áp dụng hết toàn bộ những feature của React. Còn nếu hoàn toàn sử dụng Component thì phải có cơ sở nhất định về FE, và đồng thời phải mất 1 thời gian để learning và làm quen với các thư viện Component của các bên thứ 3

ReactJS là một thư viện JS nổi bật, mới mẻ. Bởi vì vậy, nó bù đắp rất nhiều cho JS thuần, vì vậy, syntax và các ví dụ thường được trình bày, sử dụng theo ES5, ES6
![](https://images.viblo.asia/d2afc3fd-8692-4f43-a968-3aac18e6a79d.png)

![](https://images.viblo.asia/8c295280-163a-4d87-8008-783a30f91ed7.png)
Đồng thời, các attribute của các thẻ tag sẽ thay đổi tùy theo đặc thù của ReactJS, giả dụ như className thay cho class...

## Cách pass/tranfer một method từ Parent Component xuống Child Component
![](https://images.viblo.asia/4f02813f-e7d5-4a98-a043-b8f0ccc5d6ae.png)
Ở Child Component, ta có thể gọi method từ Parent Component truyền qua thông qua name tương ứng, ở đây là onLogin1. Các method và properties tương ứng sẽ được lưu trữ thông qua biến props.
Và tất nhiên, khi apply method này, method sẽ compile dựa trên từ khóa this, và chính xác là thực thi đến các state/biến tương ứng của Child Component, not Parent Component

![](https://images.viblo.asia/75c7d72e-295b-47b8-8098-24d47ea1c535.png)

Tương tự, properties cũng có thể pass qua cũng bằng cách trên : Lưu ý const customText

![](https://images.viblo.asia/b1605356-05ee-44bf-acf5-a144e1186b65.png)

## Cách pass/tranfer một method từ Child Component lên Parent Component

Ở dưới Child Component ta có một Action như sau, dùng để toggle chính nó là 1 Modal

![](https://images.viblo.asia/a1b72a47-8fef-4637-a382-62c09189ee92.png)

Đồng thời ở Parent Component của nó là thanh header, sẽ có một Button để khi click vào, ta phải gọi được hàm toggle từ Modal Component để hiển thị Modal đó lên.

![](https://images.viblo.asia/11f5d70a-b5e6-4819-9565-6a497bec2c39.png)

## Cách đổ một list data entity từ Controller để hiển thị trên màn hình
Trước hàm render, ta tạo và init 1 biến postViews để lưu trữ các View Post Component
![](https://images.viblo.asia/118a1946-3912-4eca-bac2-ea36cfe677b0.png)

Và hiển thị bằng cách gọi biến này như sau:
![](https://images.viblo.asia/1c004c4f-b7fe-472a-9848-eb8415d35e06.png)