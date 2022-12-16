Chào mừng tất cả các bạn đã quay trở lại với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn cách xử lý các sự kiện khi người dùng tương tác bằng chuột hoặc bàn phím với VueJS, các bạn có thể xem lại ở [đây](https://viblo.asia/p/bai-14-event-handling-voi-vuejs-3P0lPze8Kox). Ở bài này chúng ta sẽ tìm hiểu về một trợ thủ rất đắc lực trong quá trình phát triển các ứng dụng Vue nữa đó là thiết lập phạm vi cho CSS trong Vue. 
# Vấn đề 
Trong quá trình phát triển ứng dụng, theo thời gian càng ngày code càng phình to theo thời gian, số lượng component tăng lên vùn vụt, các thiên tài trong group liên tục commit code lên branch, ngày mới đến công ty chào buổi sáng bằng command `git pull ...` xem lại project thì đã thêm một đống component, code mới. Ngại ngùng không muốn động vào mớ code ấy. Các bạn tiếp tục code phần của mình. 

Dẫu vậy đời không như là mơ, đến một ngày các bạn tạo một component Vue mới, viết code ngon lành, dẫu vậy lúc load lại trang chạy thử thì dòng text màu xanh mà liên tục bị chuyển thành màu đỏ. Bực mình sửa mãi không được thế là đánh bài cùi, sửa lại phần css ở component đó cho toàn bộ là `!important` cho chắc :).

Vấn đề ở đây là sau này code phình to hơn lần nào bạn cũng phải set `!important` hay sao? Hay sẽ ra sao nếu một thiên tài khác ở trong team khi code lại set `!important` cho class giống như của bạn? Chính bởi những điều đó nên các bạn nên nghĩ tới `scoped` trong Vue. 
> Cập nhật 2020: do có sự thay đổi của các package nên bài này mình phải update theo cho đúng nên comment của 1 số bạn comment trước đây trông có thể sẽ khác và nội dung ko còn đúng nữa nhé các bạn :)
# Cách sử dụng
Ở bài này chúng ta tạo ra 2 file để làm ví dụ như sau:

`Parent.vue`
```html
<template>
    <div>
        <h1 class="welcome-text">
            This is parent
        </h1>
        <Child></Child>
    </div>
</template>

<script>
    import Child from './Child.vue'
    export default {
        components: {
            Child
        }
    }
</script>

<style>
.welcome-text {
	color: red;
}
</style>
```
`Child.vue`
```html
<template>
    <h1 class="welcome-text">
        This is child
    </h1>
</template>

<script>
    export default {

    }
</script>

<style>
.welcome-text {
    color: blue;
}
</style>
```
Sau đó các bạn khai báo component `Parent` trong file `app.js` rồi thêm component đó vào `welcome.blade.php` nhé, nhớ luôn chạy `php artisan serve` và `npm run watch` nha.

Sau khi các bạn load trang lên có thể thấy kết quả như sau:

![](https://images.viblo.asia/fea54bf9-0382-4494-915a-6062d58eb695.png)



Có thể thấy rằng 2 dòng text in ra 1 của `Parent` và 1 của `Child` đều có cùng màu đỏ theo css ở trong `Parent`, thử inspect HTML ta thấy rằng css class `welcome-text` đã ghi đè thuộc tính `color` thành `red`

Để khắc phục điều này ta có thể làm như sau, sửa lại phần CSS ở `Child.vue` như sau:
```html
<style scoped>
//your CSS
</style>
```
Ở đây khi chúng ta thêm thuộc tính `scoped` vào thẻ `style` thì CSS sẽ ChỈ được áp dụng duy nhất cho component đó. Bằng cách này các component khác nhau có CSS trùng nhau sẽ không bị ảnh hưởng đến nhau. 

![Vue_Scope_CSS](https://images.viblo.asia/3358dbda-60c6-4c3d-93ec-0ce361622dbe.png)

Các bạn có thể thấy ở hình trên, ở component `Child.vue` khi render đã được thêm 1 định danh `data-v...`, định danh này sẽ được Vue tự sinh

Nom có vẻ ổn đấy nhỉ ? :)

Vậy giờ ở `Parent.vue` ta cũng thêm `scoped` thì sao? các bạn thêm `scoped` vào `Parent` như sau nhé:
```html
<style scoped>
.welcome-text {
	color: red;
}
</style>
```
Vậy là ta có `scoped` ở cả `Child` và `Parent`, thử load lại trình duyệt và xem nhé:

![Vue_Scope_CSS](https://images.viblo.asia/bbc88f6c-d945-4caa-a0b0-86266ebe6e1d.png)

Ô mai gốt, lại bị ghi đè !??!!?? đầu bài thi quảng cáo `scoped` thế này thế kia mà nom ra cuối cùng vẫn bị ghi đè :triumph::triumph:

Đây là lúc ta tận dụng thêm 1 sức mạnh nữa Vue mang lại: `css modules` :)

# CSS modules
## Cấu hình
Phần này chỉ dành riêng cho Laravel, nếu project các bạn tạo bằng `vue-cli` thì không cần nhé
Các bạn mở file `webpack.mix.js` và sửa lại như sau:
```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .webpackConfig({
      module: {
        rules: [
          {
            test: /\.css$/,
            loaders: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:8]', // số 8 ở đây là độ dài của chuỗi băm lát nữa mình sẽ giải thích, các bạn thích đổi thành bao nhiêu cũng đc nhé
                },
              },
            ],
          },
        ],
      },
    })
```

## Thực hành
Ở `Parent.vue` và `Child.vue` các bạn sửa lại cho mình như sau nhé
`Parent.vue`
```html
<template>
    <div>
        <h1 :class="[$style.welcome_text]">
            This is parent
        </h1>
        <Child></Child>
    </div>
</template>

<script>
    import Child from './Child.vue'
    export default {
        components: {
            Child
        }
    }
</script>

<style scoped module>
.welcome_text {
	color: red;
}
</style>
```

Và ở `Child.vue`
```html
<template>
    <h1 :class="[$style.welcome_text]">
        This is child
    </h1>
</template>

<script>
    export default {

    }
</script>

<style scoped module>
.welcome_text {
    color: blue;
}
</style>
```

Sau đó F5 lại trình duyệt:

![CSS modules](https://images.viblo.asia/567a3b40-71d5-43b3-b994-be455de3ba8a.png)

Các bạn có thể thấy bây giờ trên trình duyệt đã hiển thị đúng những gì ta muốn, bằng cách sử dụng `CSS modules`, mỗi class ở mỗi component bây giờ đi kèm đằng sau là 1 chuỗi băm định danh duy nhất và không trùng nhau.

Nom có vẻ ok đấy nhỉ? Vậy thì `scoped` ở đây thì làm vai trò gì ta? :)

Theo mình thấy, thì khi dùng tới css modules thì vai trò của `scoped` khá là thừa thãi và các bạn có thể bỏ đi, thử xem và load lại trình duyệt nhé ;).

## Vậy thì bài này nói về scoped CSS để làm gì??
Sau khi tới phần này, chắc các bạn đang nghĩ: "thôi tôi cứ củ chắc, chơi luôn `css modules` cho lành, yên tâm không bị đụng độ CSS.

Vấn đề ở đây là:
- Ta phải tự tay cấu hình `webpack` để có thể chạy được `css modules`, điều này có thể xảy ra lỗi trong tương lai nếu như package như `laravel-mix` thay đổi, ta sẽ phải check lại thay đổi của họ và sửa lại code tương ứng
- Hiện tại nếu bạn dụng `css modules` thì Laravel-mix chưa support pre-processor như `scss`, `sass`... Chỉ chạy được ở project tạo bằng `Vue-cli`, Ví dụ như sau:
```html
<style lang="scss" module> // không hoạt động ở project Laravel, chạy ok ở project tạo bằng vue-cli
```
- Dùng `css modules` thì ta sẽ phải bind class với biến `$style` nên cũng sẽ có phần dài dòng thêm
- Thường theo trải nghiệm bản thân thì thấy dùng `scoped` css là cũng rất ok rồi, rất hiếm khi mình rơi vào trường hợp phải dùng với `module`, và nếu có thì mình thường sửa lại tên class css để vẫn đủ dùng `scoped` là xong :-D
# Các lời khuyên khi viết CSS cho component
#### Sử dụng scoped cho tất cả các component
Mình khuyến khích các bạn thêm `scoped` vào tất cả các component trên ứng dụng VueJS của các bạn (thực ra đối với những component là layout hay component root các bạn không để `scoped` cũng chấp nhận được). Nhưng để an toàn nhất, tránh việc sau này có những ảnh hưởng xấu có thể xảy đến khi 5-10 người cùng code và thay đổi.
#### Viết CSS sử dụng pre-compiled SCSS
Khi viết CSS cho component Vue hỗ trợ chúng ta viết bằng SCSS, các bạn có thể tuỳ chỉnh bằng cách thay đổi tham số `lang="scss"` trong thẻ `style`.

Bằng cách viết này thay vì viết dài dòng như trước: 
```html
<style scoped>
.welcome-text {
    color: red;
}

.welcome-text .text {
    color: blue;
}
</style>
```
Giờ đây code đã gọn hơn rất nhiều như sau:
```html
<style lang="scss" scoped>
.welcome-text {
    color: red;
    .text {
        color: blue;
    }
}
</style>
```
Bên cạnh đó viết bằng SCSS giúp ta dễ quan sát hơn CSS được áp dụng lồng nhau như thế nào. code gọn hơn nhiều, lúc cần tìm một selector cũng sẽ dễ hơn.
# Kết luận
Qua bài này có 2 kĩ thuật mình muốn gửi tới các bạn đó là `scoped CSS` và `CSS module`, đồng thời mình khuyến khích các bạn nên áp dụng các kĩ thuật ấy một cách thích hợp vào trong các ứng dụng của riêng các bạn, bên cạnh đó mình có đưa ra một số lưu ý cho các bạn trong quá trình viết CSS cho component.

Cám ơn các bạn đã theo dõi, ở bài sau mình sẽ hướng dẫn các bạn cách chúng ta gọi API từ backend Laravel nhé (oh finally, tên series là `học ..... với Laravel` mà đến tận bài này mới ra đc 1 bài :-D). Nếu có gì thắc mắc các bạn để lại dưới phần comment nhé ^^!