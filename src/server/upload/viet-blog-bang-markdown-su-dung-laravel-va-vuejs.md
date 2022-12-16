Xin chào các bạn quay trở lại với blog của mình, hôm nay mình sẽ hướng dẫn các bạn cách tạo ứng dụng viết blog bằng Markdown sử dụng Laravel và VueJS

# Thiết lập
Mình mặc định là các bạn đã tạo sẵn project bằng Laravel và đã chạy `npm install` nhé.

Tiếp theo các bạn vào `resources/assets/js/components` tạo mới file `Blog.vue`. Sau đó các bạn vào `app.js` khai báo component `Blog` như sau:
```javascript
Vue.component('blog', require('./components/Blog.vue'));
```
Tiếp theo chúng ta đưa component này vào trang `welcome.blade.php`, khi đó nội dung trang sẽ như sau:
```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>Laravel</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    </head>
    <body>
        <div id="app">
            <Blog></Blog>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>
```
Ổn rồi đó, các bạn nhớ chạy 2 command sau để khởi động app nhé:
```
php artisan serve
npm run watch
```

# Markdown
Tiếp theo để viết được `Markdown` ta sử dụng package `vue-markdown`, cài đặt như sau:
```
npm install --save vue-markdown
```
Sau đó ta quay lại file `Blog.vue` và sửa như sau:
```html
<template>
    <div class="my-blog container full-height">
        <div class="row editor-toolbar">
            <div class="col-md-12">
                <a class="fa fa-bold"></a>
                <a title="Italic (Cmd-I)" class="fa fa-italic"></a>
                <a title="Strikethrough" class="fa fa-strikethrough"></a>
                <a title="Big Heading" class="fa fa-header fa-header-x fa-header-1 active"></a>
                <a title="Medium Heading" class="fa fa-header fa-header-x fa-header-2"></a>
                <a title="Small Heading" class="fa fa-header fa-header-x fa-header-3"></a>
                <i class="separator">|</i>
                <a title="Code (Cmd-⌥-C)" class="fa fa-code"></a>
                <a title="Quote (Cmd-')" class="fa fa-quote-left"></a>
                <a title="Generic List (Cmd-L)" class="fa fa-list-ul"></a>
                <a title="Numbered List (Cmd-⌥-L)" class="fa fa-list-ol"></a>
                <a title="Insert Table" class="fa fa-table"></a>
                <a title="Insert Horizontal Line" class="fa fa-minus"></a>
                <a title="Clean block (Cmd-E)" class="fa fa-eraser fa-clean-block"></a>
                <i class="separator">|</i>
                <a title="Insert Link" class="fa fa-link"></a>
                <a title="Insert Image" class="fa fa-image"></a>
                <i class="separator">|</i>
                <a title="Toggle Preview" class="fa fa-eye no-disable"></a>
                <a title="Side by side mode" class="fa fa-columns no-disable no-mobile"></a>
                <a title="Fullscreen mode" class="fa fa-arrows-alt no-disable no-mobile"></a>
                <i class="separator">|</i>
                <a title="Undo" class="fa fa-undo no-disable"></a>
                <a title="Redo" class="fa fa-repeat no-disable"></a>
                <i class="separator">|</i>
                <a title="Markdown Help" class="fa fa-question-circle"></a>
            </div>
        </div>
        <div class="row full-height markdown">
            <div class="col-md-6 area-input full-height">
                <div class="form-group">
                    <textarea :value="input" @input="update" class="syncscroll form-control full-height" name="myscroll1"></textarea>
                </div>
            </div>
            <div class="col-md-6 preview full-height syncscroll" name="myscroll1">
                <VueMarkdown :source="input"></VueMarkdown>
            </div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    export default {
        components: {
            VueMarkdown
        },
        data() {
            return {
                input: ''
            }
        },
        computed: {
            compiledMarkdown() {
                return this.input
            }
        },
        methods: {
            update: _.debounce(function (e) {
              this.input = e.target.value
            }, 300)
        }
    }
</script>

<style lang="scss" scoped>
.separator {
    display: inline-block;
    width: 0;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #fff;
    color: transparent;
    text-indent: -10px;
    margin: 0 6px;
}
.preview {
    background: white;
    border-radius: 5px;
    border: solid 1px #ddd;
    height: 90vh;
    overflow: auto;
}
.area-input {
    textarea {
        height: 90vh;
    }
}
.editor-toolbar {
    a {
        display: inline-block;
        text-align: center;
        text-decoration: none!important;
        color: #2c3e50!important;
        width: 30px;
        height: 30px;
        margin: 0;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;
        line-height: 30px;
        &:hover {
            background: #fcfcfc;
            border-color: #95a5a6;
        }
    }
}
.markdown {
    margin-top: 20px;
}
</style>
```
Giải thích về code bên trên:
* Đầu tiên ta cần import `VueMarkdown` vào để sử dụng
* Mình tạo ra 2 phần 1 bên là `textarea` và phần preview kết quả
* Thanh editor bar ở phía trên mình làm giống như của `Viblo`
* Các bạn chú ý ở `textarea` mình sử dụng `@input` mục đích là mỗi khi người dùng nhập vào mình sẽ xử lý input để không render ngay, vì việc này làm liên tục sẽ dẫn tới việc app của chúng ta bị chậm, nên mình sử dụng cách là mỗi khi có input ta gọi đến hàm `update`, hàm này sử dụng hàm `debounce` của `lodash` (mặc định lodash được cài cùng app ban đầu luôn, nếu chưa có các bạn cài bằng npm nhé)
* Để xuất kết quả bằng markdown ta chỉ cần `bind source` của component `VueMarkdown` là được
* Phần CSS bên dưới cho đẹp tí thôi :)
Cùng test app xem có gì nhé.

![](https://images.viblo.asia/09d87eb3-4f7a-4f47-95ad-5c0411df71c7.png)

Ở đây các bạn thấy kết quả khá là oke rồi. Nhưng cùng xem lại đoạn code trên của mình. Các bạn để ý `textarea` và thẻ `div preview` có cùng 1 class là `syncscroll` và có cùng `name`, mục đích của mình là làm giống như Viblo khi scroll 1 màn thì màn bên kia phải scroll theo. Để làm điều đó các bạn add một thư viện nhỏ như sau nhé. Ở file `welcome.blade.php`, ta thêm vào thẻ `head`:
```html
<script type="text/javascript" src="http://asvd.github.io/syncscroll/syncscroll.js"></script>
```
Ổn rồi đó load lại trang và làm một đoạn markdown dài dài nào. Các bạn thử với đoạn markdown mình tạo sẵn ở [đây](https://github.com/maitrungduc1410/viblo-repo/blob/master/markdown). Một điểm hay là các bạn có thể viết cả các icon như :), 8-), mục lục. Các chi tiết các bạn có thể xem ở [đây](https://github.com/miaolz123/vue-markdown)

Các bạn có thể thực hành viết tiếp các chức năng cho các nút ở phía trên nhé.
Đến đây mình xin kết thúc bài post này. Có gì thắc mắc các bạn để lại dưới comment nhé ^^!