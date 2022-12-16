<blockquote><p><b>Tạo một images sprite tự đông</b></p><p><b>Chỉ việc gọi và sử dụng</b></p></blockquote>

Chào các bạn, <br />
Hôm nay mình sẽ giới thiệu một kỹ thuật có lẽ khá quen thuộc với các bạn dev front-end đó là Images Sprite

Về giới thiệu cũng như lợi ích của việt sử dụng images sprite mình xin trích dẫn từ bài viết của bạn Nguyen Ngoc Phuong, các bạn có thể xem chi tiết hơn ở đây:

https://viblo.asia/p/toi-uu-tai-trang-voi-ky-thuat-css-sprites-naQZR7dQlvx

# Image Sprites là gì
Sprites là một hình ảnh lớn được tạo ra bằng cách gộp nhiều ảnh nhỏ lại với nhau theo một cách được định trước sao cho có thể tái sử dụng lại từng ảnh nhỏ mà không bị ảnh hưởng bởi các ảnh khác. Để hiển thị được một ảnh nhỏ từ Sprite Image, thay vì sử dụng qua thẻ img hoặc background thông thường thì ta phải sử dụng thuộc background kết hớp với thuộc tính background-position để xác định vị trí chính xác của bức ảnh cần hiển thị. Ví dụ về việc sử dụng Sprite image : 
![](https://images.viblo.asia/cba93725-f405-4e5f-bc60-5c0feb0403b8.png)

# Lợi ích của việc sử dụng CSS Image Sprites
<p>Một web page có thể tồn tại từ vài chục thậm chí vài trăm bức ảnh, trong đó sẽ có một phần khá lớn các bức ảnh có kích thước nhỏ như là các icons, logo hay social buttons... Những bức ảnh này tuy nhỏ nhưng lại gây ảnh hưởng lớn đến performance của web page.
Một số ảnh hưởng của việc tồn tại nhiều ảnh nhỏ trên web page:</p>
<ul>
<li>Quá nhiều kết nối đến web server để yêu cầu file ảnh: Tưởng tượng một webpage có 100 icons, nếu 100 icons này để độc lập nhau thì sau khi trình duyệt load xong mã html, nó sẽ gửi thêm 100 request tới web server để lấy về 100 file ảnh này. Quá nhiều request đồng thời có thể khiến cho người dùng có cảm giác web page bị giật trong quá trình tải trang.</li>
<li>Tổng dung lượng load sẽ lớn hơn:
<ul>
<li>Mỗi request luôn luôn kèm theo một http header. Dung lượng trung bình của header của mỗi request (request, response) khoảng 400 - 800 bytes. Với 100 images sẽ tương đương với 40000 - 80000 bytes, với những site lớn thì đây là một con số không nhỏ.</li>
<li>Mỗi bức ảnh luôn chứa đựng những thông tin như color table, mime type, format... Giả sử các bức ảnh được để riêng lẻ thì để hiển thị tất cả 100 hình ảnh, trình duyệt sẽ phải scan thông tin các ảnh 100 lần; điều này sẽ gây ảnh hưởng lớn để trải nghiệm người dùng. Với sprite image; trình duyệt sẽ chỉ phải scan duy nhất một lần để lấy ra các thông tin như color table, mime type, format (tất cả các ảnh nhỏ khi được gộp thành Sprite image sẽ share nhau chung một color table, mime type, format)</li>
<li>Dễ dàng hơn trong việc xử lý image cache: bằng cách sử dụng Sprite image chúng ta chỉ phải lo vấn đề cache version đối với một file duy nhất, hạn chế vấn đề bỏ sót cache file mỗi lần rebuild application</li>
</ul>
</li>
</ul>
<p>Xét hình ảnh sau:
<img src="https://images.viblo.asia/e1d2ea3b-1262-4e91-9bfe-8b352fa821fc.png" alt="" class="medium-zoom-image">
Với cùng một cách hiển thị trên web, ta có hai kết quả khác nhau rất nhiều:</p>
<ol>
    <li> <p>Trường hợp A: Sử dụng các hình ảnh logo riêng lẻ:</p>
<img src="https://images.viblo.asia/d5971dc2-e1e7-4b7f-a80b-d87bb2887cb6.png" alt="" class="medium-zoom-image"></li>
<li><p>Trường hợp B: Sử dụng Sprites image:</p>
<img src="https://images.viblo.asia/17ef44f2-e35e-44cf-a58a-1fc08d80da22.png" alt="" class="medium-zoom-image"></li>
</ol>

# Tạo một Image Sprites tự động
Tuy nhiên như các bạn có thể thấy ở trên, việc tạo một images sprite thủ công hoặc các công cụ generator online tốn khá nhiều thời gian và việc gọi image để sử dụng cũng khá bất tiện.

Bài viết này mình xin giới thiệu với các bạn một package sẽ giúp chúng ta tự động hoá việc tính toán cũng như tạo ra một spritesheet mà ta chỉ việc gọi đến đúng image mình cần để sự dụng:

package mình sử dụng ở đây là: Spritesmith

Link chi tiết; https://github.com/twolfson/gulp.spritesmith

Sau khi tiến hành cài đặt, bạn có thể cấu hình spritesmith trong gulpfile như sau:

```
var _source = "source";
var _dest = "dest";
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
var _sprite, _imgOutput, _scssOutput;
_scssOutput = _source + '/common/css/_sprite/';
_imgOutput = _source + '/common/images/sprite/';
_sprite = _source + '/common/images/_sprite/*.png';

var spriteData = gulp.src(_sprite).pipe(spritesmith({
imgName: 'sprite.png',
cssName: '_sprite.scss',
padding: 20,
cssFormat: 'scss',
imgPath : '/common/images/sprite/sprite.png?rev=' + new Date().getTime(), // có thể gắn thêm rev cho image ở đây
cssOpts: {
    functions: false
}
}));
spriteData.img.pipe(gulp.dest(_imgOutput));
spriteData.css.pipe(gulp.dest(_scssOutput));
});
```

Ở đây bạn có thể tuỳ chọn các option cho image sprite output như: name của image, type css output (vì sau khi build sẽ tự động gen ra một list biến về thông số của các image), khoảng cách của các image trong spritesheet, đường dẫn tham chiếu đến image, cssOpts là hàm trả về cho bạn một group mixin để sử dụng cho việc gọi các image.

Ok sau khi cài đặt và config xong, kết quả chúng ta có được sẽ như sau:

* Trước khi sprite:
    * ![](https://images.viblo.asia/826b1afb-2dad-4450-b640-1891962aa17b.png)
* Sau khi sprite:
    * ![](https://images.viblo.asia/cb8e6b7a-660b-4d1c-9659-45616e2c1cb3.png)

Các bạn có thể thấy, sau khi build tất cả các image ban đầu của mình sẽ tự động sprite lại trong một sheet như trên.
Bên cạnh đó cũng sẽ generate cho chúng ta một list các biến cần thiết để gọi đến image cần sử dụng như sau:

```
$ic-about-name: 'ic_about';
$ic-about-x: 148px;
$ic-about-y: 148px;
$ic-about-offset-x: -148px;
$ic-about-offset-y: -148px;
$ic-about-width: 32px;
$ic-about-height: 32px;
$ic-about-total-width: 276px;
$ic-about-total-height: 276px;
$ic-about-image: '/common/images/sprite/sprite.png?rev=1537587847744';
$ic-about: (148px, 148px, -148px, -148px, 32px, 32px, 276px, 276px, '/common/images/sprite/sprite.png?rev=1537587847744', 'ic_about', );
$ic-contact-name: 'ic_contact';
...
```

Đây là các thông số của các image trong spritesheet, nhiệm vụ của mình bây giờ là gom các thông số này lại thành một hàm, mà ở đó ta chỉ việc truy vấn tới image cần thiết để sự dụng thông qua các biến đã có ở list trên, mình sẽ tạo một mixin như sau: 
```
@mixin sprite-width($sprite) {
    width: nth($sprite, 5);
}

@mixin sprite-height($sprite) {
    height: nth($sprite, 6);
}

@mixin sprite-position($sprite) {
    $sprite-offset-x: nth($sprite, 3);
    $sprite-offset-y: nth($sprite, 4);
    background-position: $sprite-offset-x $sprite-offset-y;
}

@mixin sprite-image($sprite) {
    $sprite-image: nth($sprite, 9);
    background-image: url(#{$sprite-image});
    overflow: hidden;
    text-indent: -9999px;
}

@mixin sprite($sprite) {
    @include sprite-image($sprite);
    @include sprite-position($sprite);
    @include sprite-width($sprite);
    @include sprite-height($sprite);
}
```

Thực ra các mixin này đã được export trong quá trình tạo sprite, được config ở đây:
```
cssOpts: {
     functions: true
}
```

Tuy nhiên bạn cũng có thể custome thêm các thuộc tính cần thiết khi sử dụng bằng cách tạo một file riêng sau đó @import mixin này vào file *.scss cần sử dụng sprite như mình làm bên trên: 

```
@mixin sprite-image($sprite) {
    $sprite-image: nth($sprite, 9);
    background-image: url(#{$sprite-image});
    overflow: hidden;  // css custom
    text-indent: -9999px; // css custom
}
```

Rồi như vậy giờ mình chỉ việc gọi tới image và dùng thôi :D.

ở file *.scss mình có thể gọi:
```
@import "../common/css/_mixin.scss";
@import "../common/css/_sprite/_sprite";

.nav {
    display: flex;
    justify-content: center;

    &__item {
        list-style: none;
        padding: 10px 20px;
    }

    &__link {
    text-decoration: none;
    font-size: 20px;
    color: #000;
    font-weight: 600;
    display: flex;
    align-items: center;

    &::before {
        content: '';
            margin-right: 8px;
        }
    }

    &--home::before {
        @include sprite($ic_home); // gọi icon ic_home
    }

    &--about::before {
        @include sprite($ic_about); // gọi icon ic_about
    }

    &--news::before {
        @include sprite($ic_news); // gọi icon ic_news
    }

    &--contact::before {
        @include sprite($ic_contact); // gọi icon ic_contact
    }
}

.list {
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 4px #7ab2ef;
    padding: 15px;
    width: 650px;
    margin: 0 auto;

    &__title {
        font-size: 30px;
    }

    &__item {
        &:nth-of-type(1) {
            @include sprite($ic_item1); 
        }

        &:nth-of-type(2) {
            @include sprite($ic_item2);
        }

        &:nth-of-type(3) {
            @include sprite($ic_item3);
        }
    }
}

```

Kết quả ta được:
![](https://images.viblo.asia/e03aef78-9617-48bb-9df5-3133126118ce.png)

Việc gọi và sử dụng bây giờ trở nên đơn giản hơn nhiều rồi đúng không :D. Từ đây bạn có thể phát triền thêm để có thể sử dụng cho các trường hợp chia nhiều sprite, cũng như sử dụng sprite cho responsive trên Mobi nhé. Chúc các bạn thành công.
<br />
<br />


Hi vọng bài viết này sẽ có ích cho các bạn !

Cảm ơn vì đã quan tâm.