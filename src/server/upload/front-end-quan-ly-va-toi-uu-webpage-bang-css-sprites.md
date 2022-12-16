**CSS Sprites** thật ra đã là một cái tên khá cũ rồi và mình viết bài viết này hy vọng nó sẽ hữu ích cho các anh em nào chưa bao giờ biết đến cái tên của nó.

![](https://images.viblo.asia/287668ec-cfcc-4d99-b07f-7ac2435b8978.jpg)

Giới thiệu một tí đây là link bài viết gốc của mình ahihi :smile:

[https://hungphamdevweb.com/front-end-quan-ly-va-toi-uu-webpage-bang-css-sprites.html](https://hungphamdevweb.com/front-end-quan-ly-va-toi-uu-webpage-bang-css-sprites.html)

## Vậy CSS Sprites Là Gì ?

**CSS Sprites** hay còn có một cái tên cún cơm khác là “CSS Image Sprites”, nó là một phương thức dùng để gộp nhiều ảnh nền cần sử dụng vào một file hình duy nhất và thường sử dụng thuộc tính background-position để xác định vị trí thành phần ảnh nền cần sử dụng.

## Tại Sao Lại Cần Sử Dụng Sprites ?

Một trang web có thể chứa từ vài chục thậm chí vài trăm bức ảnh, trong số đó thì sẽ có chứa một số lượng lớn các bức ảnh có kích thước nhỏ như icons, logo hay social buttons … Và hãy tưởng tượng nếu các anh em có một webpage có hơn 100 icons độc lập và vô số hình ảnh đại diện cho bài viết, sau khi trình duyệt load xong mã HTML, nó sẽ gửi đi vô vàng request đến server để lấy các bức ảnh này.

Để giải quyết vấn đề trên ta chỉ cần gộp tất cả các icons thành một file ảnh duy nhất và gửi 1 request đến server khi cần.

![](https://images.viblo.asia/0b133984-4e65-48d6-9332-b7b0f8231fb0.jpeg)
>css sprites facebook nhìn cool ngầu vãi

## Cách Hiện Thực Sprites:
Ở đây mình sẽ có hai phương thức để hiện thực **Sprites**:

* Cách thứ nhất: dùng photoshop gộp tất cả các icon thành một file và dùng CSS để lấy các icons bằng thuộc tính background-position.
* Cách thức hai: mình sẽ dùng Gulp/Grunt/Node để tự động giúp mình gộp tất cả các file ảnh và sinh ra file CSS giúp mình.

### Cách Đầu Tiên:
Giả sử mình có 1 file hình mà mình đã gộp tất cả icons như vầy.

![](https://images.viblo.asia/ad6641ad-5007-42d4-a78e-3775dae383c6.png)
>cái này lấy trên mạng á :)))

Đầu tiên mình sẽ viết css load bức ảnh ở trên cho 3 icon: twitter, facebook, vimeo.

```
.icon-twitter, .icon-facebook, .icon-vimeo{
  background-image: url('./css-sprite.png');
  background-repeat: no-repeat;
}
```
Ba icon sẽ load cùng bức ảnh ở trên và chứa tất cả các icon nằm hết ở trên bức ảnh này.

Để lấy được icon theo đúng ý mình muốn lúc này mình sẽ dùng thuộc tính background-position để xác định vị trí của icon, height và width là hai thuộc tính dùng để scale đúng icon trong bức ảnh.

```
.icon-twitter {
height: 72px;
width: 72px;
background-position: -2px -3px;
}

.icon-facebook {
height: 72px;
width: 72px;
background-position: -78px -3px;
}

.icon-vimeo {
height: 72px;
width: 72px;
background-position: -231px -3px;
}
```

Và dưới đây là ví dụ cụ thể, các anh em có thể xem thêm để hiểu rõ thêm nhé

[https://codepen.io/masterhungpham/pen/wQNeGJ](https://codepen.io/masterhungpham/pen/wQNeGJ)

### Cách Thứ Hai:

Cách thứ 2 như mình đã đề cập từ trước, thì chúng ta sẽ dùng các tool để build **Sprites**, nếu dùng tool nó sẽ tiết kiệm thời gian hơn rất nhiều thay vì chúng ta phải ngồi define CSS cho từng icon một.

Có rất nhiều tool hiện nay có thể build **Sprites** như là: Grunt, Gulp hoặc là Webpack. Trong bài viết này thì mình sẽ dùng Webpack vì nó cũng đang nổi nên tiện chia sẽ để các anh em cùng tìm hiểu.

Điều kiện cần và đủ để build **Sprites** đó là các anh em cần phải install một package của Webpack có tên là **[webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)** sau khi cài đặt xong, bước tiếp theo chúng ta cần phải config một tí trong file `webpack.config.js` để bắt đầu build.

```
//webpack.config.js
var path = require('path');
 
var SpritesmithPlugin = require('webpack-spritesmith');
 
module.exports = {
    // ...
    module: {
        rules: [
            {test: /\.styl$/, use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ]},
            {test: /\.png$/, use: [
                'file-loader?name=i/[hash].[ext]'
            ]}
        ]
    },
    resolve: {
        modules: ["node_modules", "spritesmith-generated"]
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/ico'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
                css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        })
    ]
    // ...
};
```

Phía trên là code hướng dẫn của cái plugin này, các anh em nên lưu ý một vài điều đây để code vào file config Webpack của mình nha.

**Rules:**  ở đây theo file config mặc định nó dùng `styl`, các em dùng cái gì code CSS thì khai báo vào đó ( lưu ý là nhớ khai báo rule cho file ảnh `test: /\.png$/` nếu không thì file CSS của các anh em không thể load được ảnh sau khi đã được combine )

**Src:** ở đây nó sẽ import tất cả icon theo thư mục `src/ico` để build **Sprites**, các em lưu ý để chỉnh lại đường dẫn theo ý của mình.

**Target:** ở đây thì các anh em để ý là có hai cái là: image và css, image là nơi nó sẽ sinh ra file ảnh sau khi đã combine còn css là CSS sau khi đã build **Sprites** xong.

![](https://images.viblo.asia/c2176a39-4967-4dc5-b10a-965f955d39ff.gif)
>Lưu ý xem kỹ cách config để tránh tình trạng code không chạy giống như trên :smile:

Sau khi đã config thì dưới đây là hướng dẫn sử dụng trước khi dùng:

Để build **Sprites** thì các anh em cần phải tạo icon đã được resize từ trước sau đó đặt nó vào thư mục ico đã được khai báo ở trên.

Sau khi đã tạo icon và đặt nó vào thư mục ico, thì điều tiếp theo là run build cái Webpack.

Để hiển thị icon như mong muốn, chúng ta cần phải sử dụng class mà Webpack đã tạo cho chúng ta, đường dẫn bên dưới là chỗ sẽ khai báo tất cả các **CSS Sprites**, sau khi chúng ta đã run build.

```
css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl')
```

**Ví dụ:**

Các anh em có một icon là `zalo.png`, thì sau khi run build xong để sử dụng icon này chúng ta cần sử dụng class như sau:

```
<i class="icon-zalo"></i>
```

Các anh em có thể coi thêm về cách config của mình ở đây nha:

**[https://github.com/phamphihungbk/master](https://github.com/phamphihungbk/master)**

Mọi thắc mắc vui lòng để bình luận bên dưới nhé, thân ái và quyết thắng  :smile: