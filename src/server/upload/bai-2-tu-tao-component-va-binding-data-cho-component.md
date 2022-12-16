Chào các bài đến với bài tiếp theo của mình, ở bài trước mình đã hướng dẫn các bạn [Cài đặt Vue và chạy chương trình Hello world đầu tiên](https://viblo.asia/p/bai-1-cai-dat-vue-va-chay-chuong-trinh-hello-world-dau-tien-3P0lPzyoKox). Ở bài này chúng ta sẽ cùng thử tạo một component, khai báo sử dụng và binding data cho nó nhé. 
# Khai báo mới component
Để khai báo mới một component trước hết chúng ta cần tạo một mới file `.vue` là component đó. Các bạn mở thư mục `resources/assets/js/components`, tạo mới một file, đặt tên là `MyComponent.vue` với nội dung như sau: 
```html:html
<template>
    <div class="my-component">This is my first component</div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Các bạn có thể thấy ở trên mình khai báo một thẻ div với nội dung như trên, cùng với đó bên dưới mình set css cho nó luôn.

Chú ý Vue yêu cầu tất các các dữ liệu trong thẻ `<template>` phải được để tất cả ở trong một thẻ gọi là `root element` của component (thường là div). Ví dụ như sau khi compile sẽ báo lỗi:
```html:html
<template>
    This is my first component
</template>
```
Ví dụ trên xảy ra lỗi `Component template requires a root element, rather than just text` vì đoạn text chúng ta để "trần" không là con của một thẻ html nào cả. Hoặc
```html:html
<template>
    <div class="my-component">This is my first component</div>
    <div class="my-component">This is my first component</div>
</template>
```
Sẽ báo lỗi ` Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.` vì chúng ta có tận 2 thẻ là `root element`

> Từ Vue 3 trở đi lỗi bên trên đã không còn nữa rồi các bạn à 🥳🥳🥳🥳

Sau khi xong phần component, để sử dụng chúng ta cần khai báo nó trong file `app.js`, Thêm đoạn code sau vào file `app.js`: 
```javascript:js
Vue.component('my-component', require('./components/MyComponent.vue').default);
```
Bằng cách viết như trên chúng ta khai báo component có tên là `my-component` (tên tuỳ ý) nội dung ở trong file `MyComponent.vue`, component này được khai báo với scope là global, nghĩa là chúng ta có thể gọi đến chúng ở bất kì một component nào khác trong tương lai mà không cần phải `import` hay `require` lại.

Bước cuối cùng là đưa thẻ này vào view Laravel bằng cách chỉnh sửa lại file `resources/views/welcome.blade.php` như sau:
```html:html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>Laravel</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
    </head>
    <body>
        <div id="app">
            <my-component></my-component>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>
```
Nhớ luôn chạy app Laravel và compile Vue bằng 2 command sau nhé:
```bash
php artisan serve
npm run watch
```
Mở `http://localhost:8000/`, bạn sẽ thấy xuất hiện dòng chữ `This is my first component` màu đỏ. Thế là ta đã thành công rồi đó.
## Binding data cho component
Quay lại component `Example.vue`. Thay vì viết text trực tiếp trong thẻ html chúng ta có thể làm như sau:
```html:html
<template>
    <div class="my-component">{{ message }}</div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'This is my first component using binding data'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây trong phần `script`, chúng ta có thêm phần `data`, nó `return` về một biến dạng key-value là `message` có giá trị là `This is my first component using binding data` (Sau này toàn bộ data của component chúng ta đều phải để ở trong `return` nhé).

Ở phần code HTML ở trên để sử dụng biến `message` chúng ta phải gọi nó ở trong cặp thẻ `{{ }}`. Dữ liệu trong data chúng ta có thể khai báo khá đa dạng: số, mảng, object, string, ...mình sẽ nói dần dần ở các bài sau nhé.

Thử load lại trình duyệt chúng ta sẽ thấy nội dung đã được thay đổi.

Ở bài tiếp theo chúng ta sẽ sử dụng Vue.js devtools để có thể theo dõi các quá trình thay đổi dữ liệu ở các component VueJS nhé.

Cám ơn các bạn đã theo dõi ^^!