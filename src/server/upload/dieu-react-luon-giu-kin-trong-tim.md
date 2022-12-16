## ■ Mở đầu
Ngồi viết bài khi đang nghĩ vu vơ chuyện con gà hay quả trứng có trước, mình phân vân chưa biết sẽ chọn chủ đề gì để chúng ta có thể cùng nhau bàn luận. Nhớ có lần [một người anh của mình](https://viblo.asia/u/bui.gia.thinh) từng chia sẻ:
```hs
- Viết code thì dễ thôi, viết code để tối ưu mới khó !
```
Cơ mà trước khi muốn tối ưu thì phải hiểu nó đã. Thì vẫn là câu chuyện xoay quanh anh bạn `ReactJS`, nhưng sẽ quay về thuở sơ khai khởi tạo dự án bằng [`Create React App`](https://github.com/facebook/create-react-app), tìm hiểu về:
```js
React - Behind the scenes,
Điều React luôn giữ kín trong tim :v 
```
nhé, có được không nào :smile:))

![](https://images.viblo.asia/8a1d3d88-1171-40c7-890d-04aa5227bc22.png)

Trong bài viết này, với `folder structure` được tạo bởi [`Create React App`](https://github.com/facebook/create-react-app) *(v4.0.1)*, chúng mình sẽ cùng nhau tìm hiểu về `02 vấn đề` sau:
- Liên kết ngầm giữa `index.js` – `index.html`?
- `index.html` `"trắng trơn"` trên `browser`?

*Bắt đầu thôi!*

![](https://i.imgur.com/cxecklr.gif)

*Đầu tiên, hãy cùng nhau xem lại [`Create React App`](https://github.com/facebook/create-react-app) một chút!*

*Bạn nào rành đoạn này rồi thì có thể chuyển qua [Mục tiếp theo](https://viblo.asia/p/dieu-react-luon-giu-kin-trong-tim-WAyK893oZxX#_-lien-ket-ngam-indexjs--indexhtml-4) luôn nhaa ^^*


## ■ Creater React App

### Định nghĩa

Theo *[Official document](https://create-react-app.dev/docs/getting-started/)*:
> Create React App is an officially supported way to create single-page React applications with no configuration.


Đúng là như vậy, `Create React App` giúp chúng ta tất cả các bước từ A - Z để khởi tạo một ứng dụng `ReactJS`: *từ `setup` cho tới `config`; từ thiết lập `Babel` dịch `JSX` cho tới cấu hình `webpack`, đóng gói các tài nguyên, etc.*

Điều duy nhất chúng ta cần làm có lẽ là:
```
- Run command & enjoy !!!
```

Quả là sinh ra cho đời bớt khổ mà :smile: :smile:))

### Cấu trúc thư mục
Đây là vị trí các file `index.html`, `index.js` mình đề cập đến trong phạm vi bài viết này:
```
🧊 application
├──────────── package.json
├──────────── public
│            ├──── 📄 index.html
│            ├──── ...
└──────────── src
│            ├──── 📋 index.js
│            ├──── ...
├── ...
```

#### Notes:
*Nếu bạn chưa từng sử dụng `Create React App` hay chưa có trải nghiệm nào với `ReactJS`, hãy thử làm theo hướng dẫn và vọc vạch một chút để nắm được vai trò chính của các `files` này trước khi đọc tiếp nhé. Chi tiết có thể [tham khảo tại đây](https://www.freecodecamp.org/news/quick-guide-to-understanding-and-creating-reactjs-apps-8457ee8f7123/).*

*Bây giờ thì chúng ta lần lượt đi tìm câu trả lời cho `02 vấn đề phía trên` nào!*

![](https://i.imgur.com/mfpmwki.gif)

## ■ Liên kết ngầm: `index.js` – `index.html`?
Chúng ta có `index.html` chứa `div#root`:
```html
<div id="root"></div>
```
còn `index.js` thực hiện `render()`:
```js
const root= document.getElementById("root");
ReactDOM.render(<App />, root);
```

vậy thì `App` sẽ được load vào `div#root`.

*Ơ mà khoannn !?! Có gì đó sai sai thì phải...* :confused::confused:

Chúng ta biết rằng một trong những cách sử dụng `Javascript` trong `HTML` là khai báo qua thẻ `script` trong `html`:
```js
<script src="index.js" ></script>
// hoặc
<script>
    $blogUrl = document.getElementById('haodev.wordpress.com');
</script>
```

Ấy thế mà trong `index.html > body` chẳng có khai báo gì cả ngoài `div#root`.

Mà chưa kể khi chạy ứng dụng và mở trên trình duyệt, `View source code` đoạn `script` đó lại xuất hiện?

Như vậy, phải chăng có một liên kết ngầm nào đó giữa `index.html` và `index.js`?

![](https://i.imgur.com/L92gp2b.gif)

Câu trả lời đó là nhờ **`html-webpack-plugin`**.

<br/>

#### Html Webpack Plugin

`Plugin` này `config` `public/index.html` là `template` được đọc. `Plugin` này sẽ thêm đoạn `script` *(`bundle.js`, `chunk.js`)* vào `template` *(trước đó `webpack` đã cung cấp cho `plugin` một đường dẫn khả dụng)*.

Nói có sách mách có chứng chứ nhỉ :grinning:)) 

Vào ngay `node_modules/react-scripts/config/webpack.config.js` xem lại:
```js
plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
        Object.assign(
            {},
            {
                inject: true,
                template: paths.appHtml,
            },
         )
    )
]
```
Chèn `script` vào `file index.html` khi `npm start`.

Quá trình `npm start` thì xem tại `node_modules/.bin`:
```js
switch (script) {
    case 'start': {
        const result = spawn.sync(
        'node',
        [require.resolve('../scripts/' + script)].concat(args),
        // ...
    );
}
```

Vào `node_modules/react-scripts/config/paths.js` xem `html-webpack-plugin` đã làm gì với `template: paths.appHtml`:
```js
module.exports = {
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
};
```
Đó là lúc `index.html` bắt đầu được `resolve` rồi, `script` đã được chèn vào `template` của chúng ta ^^

![](https://i.imgur.com/BJGzC6i.gif)

## ■ index.html "trắng trơn" trên browser?

Một vấn đề nữa mình muốn chúng ta tìm hiểu, đó là sau khi phát triển ứng dụng, chạy `npm run build`, miệng nhấp ngụm trà xanh, đầu chắc cú rằng mọi thứ sẽ được `compile` ra như ý rồi. 

Lúc giờ mới chột dạ vì mở trên trình duyệt file build là `1 trang trắng tinh` :disappointed::disappointed:.


Để tìm ra nguyên nhân, chạy lệnh `npm run eject` để xem những gì được thực hiện `behind the scenes` sau `những câu lệnh có-vẻ-là-ngắn-gọn` - *`npm start`/ `run build`/`run test`* - trong `🧊 application/scripts`.

Quá trình chạy lệnh `npm start` sử dụng `webpack-dev-server`:
```js
// 🧊 application/scripts/start
const WebpackDevServer = require('webpack-dev-server');
```

Được rồi, bây giờ vào `webpack.config.js` xem thì thấy đoạn này:
```js
const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';
// "homepage" can be set to "." to enable relative asset paths
  ```
  
Đó chính là lý do, khi chúng ta mở trực tiếp `index.html` trên trình duyệt thì nhận được `"một trang trắng tinh"` bởi vì **`Webpack` đang cố tải các `static files` từ `🧊 application` chứ không phải từ `🧊 application/build`.** 
 
 Để khắc phục điều này, chúng ta vào `package.json` thêm dòng:
 ```json
 {
     // ...
     "homepage":".",
     // ...
 }
 ```
là ngon ngay :smile::smile:))

Chạy lại `npm run build` và mở `index.html` trên trình duyệt để xem kết quả nhé ❤
 
 ## ■ Kết
 
`Create React App` mặc dù không quá mới mẻ với các bạn đã và đang làm việc với `React`, nhưng cũng chẳng thể phủ nhận việc nó được xem như một công cụ vô cùng hữu hiệu, nhanh gọn và tiết kiệm thời gian cài đặt của chúng ta :grinning::grinning:.

Song song với loạt ưu điểm đó, còn muôn vàn những `behind the scenes` mà chẳng riêng 02 vấn đề kể trên mình mong muốn chúng ta chia sẻ với nhau. **Rõ ràng việc quan sát kỹ lưỡng và tìm hiểu một chút về cách hoạt động của các công cụ được sử dụng luôn là điều tốt đúng không nào ^^.**

![](https://i.imgur.com/zv42HUU.gif)

Mình cảm ơn các bạn vì đã đọc bài viết này và hy vọng rằng nó có thể mang lại được giá trị nào đó ^^ Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nha ❤

Chúc các bạn cuối tuần vui vẻ ^^
 
## ■ Credits

- **Resources from [Medium](https://medium.com/@louis.raymond/why-cant-i-open-my-react-app-by-clicking-index-html-d1778f6324cf), [Make It Awesome](https://haodev.wordpress.com/2020/09/24/lien-ket-ngam-giua-index-js-index-html/), [Viblo Question - Answer](https://viblo.asia/q/tai-sao-react-can-static-servers-sau-khi-build-yDZO71eOZwj), [Tree House](https://blog.teamtreehouse.com/getting-started-create-react-app-tool).**
- **Poster & thumbnail are edited from [MV poster of Son Tung M-TP](https://www.youtube.com/watch?v=psZ1g9fMfeo).**
- The post was originally published at [here](https://haodev.wordpress.com/2021/01/22/dieu-react-luon-giu-kin-trong-tim/).
- **Policies for this article:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**
- **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright for your contents, please [contact me](https://haodev.wordpress.com/me/).**

<br/>


***Happy coding !***