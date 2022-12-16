Ở bài đầu tiên này mình sẽ hướng dẫn các bài cài đặt VueJS vào project Laravel, sau đó chúng ta sẽ cùng xem những thứ cơ bản của Vue nhé.

> Note: bài này mình mình setup Vue ở bên trong project Laravel (backend), nếu các bạn không muốn setup chung với Laravel thì nên dùng các tool như [Vue CLI](https://cli.vuejs.org/) hoặc [Vite](https://vitejs.dev/) (Đọc là "Vít", một tool để chạy và build app VueJS cực cực nhanh mình rất thích)
# Cài đặt Vue
Vì Laravel đã hỗ trợ tích hợp VueJS nên việc cài đặt của chúng ta sẽ hết sức đơn giản.Ở thời điểm hiện tại (05/2018) thì mỗi khi bạn tạo project Laravel thì nó đã tự động cài đặt Vue cho chúng ta rồi nhé (ở các phiên bản cũ hơn thì các bạn cũng chạy duy nhất command dưới nó sẽ làm tất cả :) ). Từ folder project các bạn mở terminal/powershell và chạy command sau để cài các node modules cần thiết ban đầu (và sau này) đồng thời để để build Vue luôn:
```bash
npm install
```
Hoàn tất cài đặt, chúng ta cùng xem qua thành quả nhé.

![](https://images.viblo.asia/206de841-b5c8-433c-ac53-ff857b4e4938.png)

# Khám phá Vue

Toàn bộ code VueJS ở trong folder `resources/assets/js`, nội dung gồm có:
1. `bootstrap.js`: khi mở lên chúng ta sẽ thấy trong đó đã require một số thư viện như `lodash`, `jquery`, một số config cho request. Mỗi khi ứng dụng của chúng ta chạy nó sẽ gọi đến file này và làm những công việc cần thiết trong đó.
2. `app.js`: đây là file nơi chúng ta import `Vue` vào ứng dụng, thường file này là file `root` nơi những khởi tạo ban đầu cho project, cùng với đó là những thiết lập về data, methods với phạm vi global mà sau này các components con có thể gọi đến bằng cách `this.$root`. Mở file này lên các bạn sẽ thấy nó sẽ require file `bootstrap.js` ở trên, sau đó import Vue vào project, tiếp theo nó khai báo component `example` phạm vi là global, cuối cùng là khởi tạo app - nó sẽ tìm đến thẻ có id là `app` trong ứng dụng của chúng ta và mount dữ liệu Vue từ đó.
3. `/components`: folder này chứa các components với đuôi file `.vue`, mở lên các bạn sẽ thấy có 3 phần là: `template`, `script` và `style` và đây cũng là cấu trúc chung của tất cả các component khác (đây là điều mình đánh giá là điểm Vue dễ học so với các framework js khác)
    * `template`: đây là code HTML cho component, ở đây chúng ta sẽ thoả sức sáng tạo, binding dữ liệu, gọi đến các computed hay methods được khai báo ở phần `script`
    * `script`: đây là phần code JS xử lý. Ở đây chúng  ta có thể import các component, khai báo dữ liệu, viết các methods, computed, watcher, xử lý khi component created,... vô vàn điều tuyệt vời khác xảy ra ở đây
    * `style`: phần này là phần "mông má" cho component đẹp hơn bằng cách viết code css. Điều tuyệt vời là chúng ta có thể viết code `sass` ở đây giúp tiết kiệm thời gian và trông đẹp hơn, cùng với đó là set phạm vi tác động cho các chỉnh sửa này bằng thuộc tính `scoped`(mình sẽ nói ở các bài tiếp).

Đây là cấu trúc thư mục chuẩn của Vue và chúng ta có thể tuỳ chỉnh tuỳ theo mục đích của mỗi dự án nhé.

**Chú ý: hiện tại component `example` đã được đổi tên thành `example-component` khi tạo mới project nhé các bạn**

**Cập nhật: ở thời điểm hiện tại Laravel 7.x các bạn check lại cho mình [ở đây](https://laravel.com/docs/master/frontend) cách cài VueJS vào Laravel nhé (Laravel không còn cài sẵn cho chúng ta nữa)**
# Chạy thử chương trình đầu tiên
Cuối cùng chúng ta sẽ thử chạy chương trình xem thế nào nhé.

Đầu tiên các bạn chạy Laravel trước bằng command sau:
```bash
php artisan serve
```
Sau đó compile VueJS bằng command:
```bash
npm run dev
```
hoặc 
```bash
npm run watch
```
Ý nghĩa là `dev` sẽ compile 1 lần còn `watch` sẽ compile mỗi khi có bất kí một thay đổi nào đó ở bên Vue.

Sau khi compile chúng ta sẽ thấy ở trong folder `/public/js` có file `app.js` đây chính là file sau khi được compile. Nếu truy cập ngay vào ứng dụng chúng ta sẽ chỉ thấy trang `welcome` mặc định của Laravel vì chúng ta chưa import Vue vào ứng dụng. Chúng ta làm như sau, mở file `resouces/view/welcome.blade.php`, xoá toàn bộ đi và sửa lại như sau: 
```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>Laravel</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
    </head>
    <body>
        <div id="app">
            <example></example>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>
```
Ở đây chúng ta tạo ra một thẻ `div` với id là `app` để bên Vue có thể mount vào (xem file `app.js` ở bên trên), trong đó chúng ta có thẻ `example`. Bên dưới chúng ta import file `app.js` trong folder `public` (**không phải file /rescources/assets/js/app,js nhé**) bằng thẻ `script`. Mọi thứ đã ổn rồi đó, mở trình duyệt web ở địa chỉ `http://localhost:8000/` và xem thành quả nhé:

![hello_world_vuejs](https://images.viblo.asia/327814c9-9031-49e2-be32-64affec53483.png)

Nếu thấy hình như trên thì xin chúc mừng bạn đã hoàn thành bước đầu tiên trên con đường đến với VueJS :)

Ở bài tiếp theo mình sẽ hướng dẫn các bạn [tự tạo component riêng và binding data nhé](https://viblo.asia/p/bai-2-tu-tao-component-va-binding-data-cho-component-GrLZDwwnKk0)

Cám ơn các bạn đã theo dõi ^^!
# Với các bạn dùng Vue 3