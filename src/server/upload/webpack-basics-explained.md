"Webpack", một từ mà nếu bạn là một người đang định hướng trở thành một front-end developer, tôi cá chắc các bạn sẽ nghe đến rất nhiều lần.
Và nếu bạn đã cố tìm hiểu trên mạng các bài viết giải thích thế nào là webpack hay cách sử dụng nhưng vẫn không tài nào hiểu nổi vì các "siêu nhân" trên mạng trình bày quá phức tạp và đi sâu xa quá thì tôi hi vọng bài viết này sẽ là một "lớp vỡ lòng" dành cho các bạn để các bạn có thể hiểu một cách cơ bản nhất, "Webpack rốt cuộc là cái trời ơi đất hỡi gì" nhé :))

### Webpack là gì?
Dạo Google với từ khoá "What is webpack" hay "Webpack là gì" thì chắc 99,9% các bạn sẽ thấy định nghĩa này: "Webpack là một module bundler".
"Ôi khó hiểu quá" là suy nghĩ đầu tiên với mình khi gặp định nghĩa này, nó súc tích một cách vô cùng trìu tượng =))

Bạn có thể dịch tạm "module" là các file

"Bundle" là gói lại

vậy "module bundler" là một thứ hay một "công cụ để gói file các lại." 

Thế "nó gói các file nào lại" hay "tại sao phải gói lại" sẽ là câu hỏi tiếp đến chúng ta sẽ băn khoăn.

Để trả lời câu hỏi này, chúng ta cùng quay ngược thời gian khi mà ECMA Script được giới thiệu. Nó cho phép chúng ta có thể import file JS này vào trong file JS nọ, cũng từ đó mà thuật ngữ "module" ra đời.
Cách làm này giúp chúng ta specialize/ nhóm các tập chức năng hướng đến một đối tượng, hay business nào đó vào một module/file để dễ quản lý hơn. Thay vì ném tất cả code JS vào một file tầm 1000 dòng. 

Nhưng vấn đề phát sinh là một số browser không hiểu được khâu "import" đó. Nên việc chúng ta cần là bundle/gộp các file đó vào một file duy nhất và ném link nó vào thẻ <script> trong file page HTML. 
    
Và những cái tên như Webpack, Gulp, Browsertify, Grunt ra đời, và một trong những mục đích của nó là giúp chúng ta thực hiện công việc trên. 
    
(Các bạn lưu ý là giải quyết công việc trên chỉ là một trong số rất nhiều chức năng mà Webpack cung cấp, một vài chức năng khác mình sẽ đề cập đến trong phần cuối của bài).

### Cách sử dụng

Đầu tiên bạn cần phải install Webpack vào trong folder dự án của bạn
```
npm install webpack
```

Thử tưởng tượng bạn có 2 module sau:
**cats.js**
```
var cats = ['dave', 'henry', 'martha'];
module.exports = cats;
```
**App.js**
```
cats = require('./cats.js');
console.log(cats);
```

Cách đơn giản nhất để gộp 2 file này lại (không cần dùng đến configuration file) là bạn cung cấp cho webpack tên của input file ( hay còn gọi là Entry) và output file
```
webpack app.js bundle.js
```

![](https://images.viblo.asia/81977a36-1e14-4738-9fe9-02cc1605025b.png)https://images.viblo.asia/81977a36-1e14-4738-9fe9-02cc1605025b.png
> Step 1: Webpack đọc Entry và phân tích các dependencies, các dependencies của dependencies...
> Step 2: Webpack gói Entry và các dependencies của nó vào 1 file duy nhất (trong ví dụ của chúng ta là bundle.js).

### Thực tế
Với các dự án lớn trong thực tế, chúng ta không chỉ muốn gói file bằng lệnh ```webpack app.js bundle.js"``` mà chúng ta muốn quản lý các file một cách hệ thống hơn. Ví dụ các file cats.js và app.js trong folder source và file bundle.js sẽ được đặt trong folder bin, thì lúc này ta cần dùng đến configuration file. 
Một file webpack.config.js cơ bản sẽ trông như sau:
```
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'app.bundle.js'
    }
};
```
Để run file config, các bạn đơn giản chỉ cần gõ:
```
webpack
```
Trong quá trình phát triển, chúng ta không muốn cứ sau mỗi lần thay đổi lại phải chạy lại lệnh webpack này. 
Lúc này, bạn có thể sử dụng
```
webpack --watch
```

### Loader
Hiện nay, khi mà single-page application đang trở thành một trend. Chúng ta phải tiếp cận và viết JS trên các framework như React, Vue, Angular. 
Trường hợp bạn dùng Vue, Vue có các file của mình với phần đuôi .vue. Nhưng ngặt nỗi các browser của chúng ta không hiểu và dịch được các file này.
Và Webpack lại một lần nữa trở thành cứu tinh cho chúng ta bằng việc sử dụng các Loader.
Loader là các module đặc biệt của webpack mà webpack sử dụng để "dịch" các file .vue sang file .js - file mà browser hiểu và đọc được.

Để cài đặt Loader, ta gõ
```
npm install vue-loader
```
trong file webpack.config.js, ta add thêm object module.rules
```
module: {
        rules: [
        {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        ]
    }
}
```
>  Loader 'vue-loader' sẽ tìm tất cả các file đuổi .vue để dịch sang file .js.
>  Việc loại trừ các file trong node_modules sẽ giúp giảm thời gian dịch các file không cần thiết. 

Ngoài vue-loader chúng ta còn hàng tá các loader khác nữa mà các bạn sẽ muốn tìm hiểu, như babel-loader, css-loader, style-loader, file-loader, url-loader,...

### Lời kết
Còn rất nhiều các tính năng khác mà Webpack cung cấp giúp chúng ta hệ thống hoá source trong dự án, các bạn hãy dành thời gian tìm hiểu nhé. 
Một vài nguồn mà các bạn có thể tham khảo: 
* [Webpack Crash Course by Traversy media](https://www.youtube.com/watch?v=lziuNMk_8eQ)
* [WHAT IS WEBPACK, HOW DOES IT WORK? | Webpack 2 Basics Tutorial by Academind](https://www.youtube.com/watch?v=GU-2T7k9NfI&t=59s)

*Tài liệu sử dụng trong bài viết*
* https://housefrommars.com/webpack-basics-explained/
* https://github.com/webpack/docs/wiki/usage