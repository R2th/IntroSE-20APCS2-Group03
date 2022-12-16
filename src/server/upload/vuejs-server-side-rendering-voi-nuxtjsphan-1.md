> Nuxt.js là một framework mạnh mẽ giúp chúng ta xây dựng trang web một cách đơn giản sử dụng Vue.js. 
> Nó xây dựng giao diện người dùng (UI rendering), trong trừu tượng hóa việc phân phối giữa client và server.
> Mục tiêu của Nuxt.js là tạo ra một framework đủ linh hoạt để bạn có thể sử dụng nó làm cơ sở cho project hoặc ngoài project dựa trên Node.js.
> Nuxt.js đã cài đặt sẵn tất cả cấu hình cần thiết để dễ dàng tạo ra một bộ khung hoàn chỉnh cho ứng dụng Vue.js.
> Ngoài ra, Nuxt.js cũng cung cấp một lựa chọn deploy khác, gọi là: nuxt generate. Nó sẽ xây dựng một Static Generated cho ứng dụng Vue.js. Lựa chọn này có thể là bước tiến lớn cho việc phát các ứng dụng Web trên microservices.
> Là một framework, Nuxt.js có rất nhiều tính năng giúp bạn phát triển giữa client và server, ví dụ như: Dữ liệu không đồng bộ, Middleware, Layouts,...

Trong phần đầu, chúng ta sẽ đi tìm hiểu tại sao phải dùng Server-Side Rendering(SSR) mà không phải là Client-Side Rendering(CSR), mặc dù CSR đang là thế mạnh của việc phát triển web hiện nay. Và tiến hành cài đặt Nuxt.js

# Vì sao vẫn nên sử dụng Server-Side Rendering?
- Initial load nhanh
- Dễ otpimize, vì toàn bộ dữ liệu đã được xử lý ở server. Client chỉ việc hiển thị
- Các web framework từ xưa đến nay đều hỗ trợ cơ chế này
- Dễ hiểu và dễ code hơn. Developer chỉ cần code 1 project web là được, không cần phải tách ra front-end và back-end
- Chạy được trên phần lớn mọi trình duyệt, kể cả disable JavaScript vẫn chạy tốt
- **Và lý do to nhất là  SEO tốt vì khi bot của Google, Bing vào web sẽ thấy toàn bộ dữ liệu dưới dạng HTML.**
# Cài đặt Nuxt.js
Để hoạt động cần có NPM `5.2.0` trở lên, tương đương với Node js `8.1.0` trở lên
Ta sẽ cài đặ nuxt bằng `yarn`, nên cần cài `yarn` trước đã
```
npm install yarn -g
```
## Khởi tạo project
Để khởi tạo một project mới ta dùng lệnh `yarn create nuxt-app <project-name>`, với `project-name` là tên của project. Cụ thể mình đặt tên project là `ssr-nux`
```
yarn create nuxt-app ssr-nux
```

Tiếp đó chọn các tùy chọn để Nuxt cấu hình sẵn cho bạn mọi thứ, nhưng câu hỏi quan trọng nhất là  câu `Choose rendering mode?` bạn chọn `Universal` thì nuxt sẽ cấu hình project của bạn hoạt động với cơ chế SSR.


![](https://images.viblo.asia/637a9486-4414-471f-ae7c-f0f650251b95.png)

Khi tạo xong, ta `cd` vào thư mục project `cd ssr-nux/`và chạy
```
yarn run dev
```

![](https://images.viblo.asia/ab8d0c4c-004e-4cc8-a8d6-f1e78de092f5.png)

Sau đó mở trình duyệt, vào địa chỉ `http://localhost:3000` là ta đã có một proiect sử dụng vue và hoạt động theo cơ chế Server-Side Rendering.

![](https://images.viblo.asia/98650658-6f6d-4ce1-b7cf-ec4a87961870.png)

## Cấu trúc thư mục
![](https://images.viblo.asia/95b47aff-49d9-4361-ac5c-594a6cf33ec0.png)

### .nuxt
- Đây là thư mục có thể coi là `core` của `nuxt`, nếu không muốn tìm hiểu sâu thì không cần quan tâm đến nó.
### assets
- Chứa các file tài nguyên chưa được biên dịch như pre-css(Less, Sass), image
### components
- Chứa các component có thể tái sử dụng. Các component này có thể truy cập được trong các `pages` hoặc các component khác bằng cách dùng import
```
import ComponentName from ~/components/ComponentName.vue
```

### layouts
- Thông thường các trang sẽ có nội dung khác nhau, nhưng có phẩn header và footer giống nhau, và trang nào cũng dùng chung nó, nó được gọi là layout. Thư mục `layouts` chứ các layout như vậy.
```
<template>
<h1>Admin content</h1>
</template>

<script>
export default {
layout: 'admin-layout'
}
</script>
```
### middleware
Middleware là các hàm có thể được thực hiện trước khi hiển thị page hoặc layout. Có nhiều lý do mà bạn nên làm như vậy. Bảo vệ định tuyến routes là một cách sử dụng phổ biến nơi bạn có thể kiểm tra Vuex store cho việc đăng nhập hợp lệ hoặc xác thực một số params (thay vì sử dụng phương thức xác thực trên chính thành phần đó).

Các hàm này có thể không đồng bộ nên cần cẩn thận, vì sẽ không có gì được hiển thị cho người dùng cho đến khi thành phần trung gian middleware được thực thi xong.
### pages
Chứa các file .vue, đây là một phần trong bộ định tuyến. Nuxt sẽ tự động xây dựng router tương ứng với nên file .vue, mỗi file .vue sẽ tương ứng với 1 route. Tạo file `home.vue` thì nuxt sẽ tạo cho ta một route `localhost:3000/home`
### plugins
Thư mục này cho phép bạn đăng ký các plugin Vue trước khi ứng dụng được tạo. Điều này cho phép các plugin được sử dụng trong suốt quá trình tương tác với ứng dụng của bạn trên instance Vue và bạn có thể truy cập bất cứ vào thành phần nào.
```
plugins: ['~/plugins/vue-toastr-2']
```
Chỉ cần khai báo như trên là ta có thể dùng được VueToastr2 trong mọi component

### static
Chứa các file tài nguyên được public. Được truy cập thông qua đường dẫn `/` . Ví dụ muốn lấy file `image.img` trong thư mục `static/image.img` thì chỉ cần vào địa chỉ `localhost:3000/image.img`
### store
Chứa các file khai báo vuex store
### `nuxt.config.js` file
File config tùy chỉnh cho framework

# Kết
Nhìn chung Nuxt khá giống với một framework của các ngôn ngữ backend như php, ruby, chỉ có điều không có phần thao tác với database.

Nhưng nhiêm vụ chính của nó vẫn chỉ là render html nhưng mà ở server mà thôi.

Phần tiếp theo ta sẽ tiến hành xây dựng một ứng dụng CRUD với Nuxt sử dụng cơ chế  Server-Side Rendering