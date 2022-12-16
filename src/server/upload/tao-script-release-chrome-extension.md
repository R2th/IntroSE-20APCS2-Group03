Xin chào mọi người! :wave::wave::wave:

Chào mừng bạn đã đến với series/tutorial ***Lập trình Chrome extension với Typescript + Vue.js theo phong cách Viblo***. Mình tên là Kim, cũng là một trong các thành viên trong [Viblo Team](https://viblo.asia/o/viblo).  Rất hân hạnh được đồng hành cùng các bạn trong series này.

## Overview

Bài viết này sẽ thực hiện tạo script để thuận tiện cho việc release extension về sau. Tất nhiên chúng ta có thể tạo `bash` script nhưng ở đây, mình sẽ sử dụng luôn JavaScript cho lành. Bạn sẽ học được gì từ bài viết này:
- Biết cách parse arguments từ command line để tùy biến truyền tham số vào cho script của mình
- Biết vận dụng Node.js API của `webpack`
- Tạo file zip từ code JavaScript

Về cơ bản các lệnh để release vẫn giống như chúng ta đã làm trong phần trước, bao gồm:
- Compile Vue.js application
- Đóng gói extension thành file `.zip` (để upload lên store)
- Tùy biến compile bằng cách thêm 

Nào bây giờ, hãy cùng tạo file một file `scripts/realease.js` để bắt đầu nhé:

```javascript:/scripts/release.js
console.log('Released!! ^^');
```

Thêm alias `release` cho NPM scripts bên trong `package.json`:

```json:package.json
"scripts": [
  "release": "cross-env NODE_ENV=production node ./scripts/release.js"
]
```

```bash
> yarn release
Released!! ^^
```

## Compile Vue.js application

Lần này thay vì sử dụng `yarn build` để chạy webpack thì chúng ta sẽ sử dụng Node.js API của webpack. Đơn giản chỉ cần import package `webpack`, sử dụng `compiler.run()` như sau:

```javascript:/scripts/release.js
const webpack = require('webpack');
const webpackConfig = require('../package.json');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    throw error;
  }
  
  // do more things...
});
```

Nếu bạn muốn trong quá trình build cần print các thông tin `stats`, bạn có thể thêm đoạn code sau:

```javascript:/scripts/release.js
  const statsString = stats.toString({
    colors: true,
    modules: false,
    entrypoints: false,
  });

  process.stdout.write(`${statsString}\n\n`);
  process.stdout.write('Packing extension...\n');
```

Nếu cần hiểu chi tiết rõ hơn về các dữ liệu trong `stats`, bạn có thể đọc thêm [tại đây (Webpack API for Node.js)](https://webpack.js.org/api/node/#run).

## Zip your extension

Sau khi compile, chúng ta sẽ đóng gói luôn kết quả vào một file `zip` để upload lên store và publish. Mình sẽ sử dụng hai package phục vụ cho việc `zip` file là `fs` và `archiver`. Khi sử dụng `fs` sẽ giúp chúng ta mở luồng ghi dữ liệu ra một file được chỉ định như sau:

```javascript:/scripts/create-archive.js
  const output = fs.createWriteStream(`${path}/${filename}`);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });
  
  // pipe archive data to the file
  archive.pipe(output);

  archive.directory(sourceDir, false);

  archive.finalize();
```

Trong đó, `zlib: { level: 9 }` là khai báo cho `archiver` biết cần phải nén file zip với dung lượng tối ưu nhất. Bạn có thể add thêm event để handle lỗi nếu muốn, ví dụ:

```javascript:/scripts/create-archive.js
  output.on('close', () => resolve({
    path: output.path,
    size: archive.pointer(),
  }));

  output.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('error', (err) => {
    reject(err);
  });
```

## Parse command line argument

Nhiều khi bạn cần truyền thêm các tùy chọn khi release. Chẳng hạn như Viblo, khi build cần optimize một số thứ riêng cho browser Chrome và Firefox. Giả sử mình sẽ truyền một argument là `browser` vào trong `release.js` để làm căn cứ và sử dụng. Lúc này, chúng ta có thể sử dụng một package hỗ trợ việc parse argument từ command line đơn giản đó là [`yargs`](http://yargs.js.org/):

```javascript:/scripts/release.js
const argv = require('yargs')
    .usage('Release extension.\nUsage: $0 <browser>')
    .describe('browser', 'Target browser: chrome | firefox | opera')
    .string('browser')
    .showHelpOnFail(false, 'Specify --help for available options')
    .help('help')
    .argv;

console.log(argv.browser)
```

Trong đó, các function như:
- `usage`: Cách sử dụng của lệnh đang build
- `help`: Giúp hiển thị cách sử dụng thông qua `--help`
- `describe`: Mô tả chi tiết một argument sẽ có tác dụng như nào
- `string`: Khai báo có một argument dạng `String`, sẽ được alias với tên `browser`

Nhìn chung nó cũng khá dễ để mọi người làm quen và sử dụng. Sau khi khai báo như trên, bạn có thể thoải mái sử dụng các giá trị của argument thông qua biến `argv` như mẫu trên.

## TL;DR

Tài liệu tham khảo:
- [Yargs](http://yargs.js.org/)
- [Archiver in NPM](https://www.npmjs.com/package/archiver)
- [Webpack API for Node.js](https://webpack.js.org/api/node/#run)
- [How to parse command line arguments](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)

Nếu bạn thấy series này hay và hữu ích thì đừng quên [share](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fviblo.asia%2Fs%2Ftao-chrome-extension-voi-typescript-vue-theo-phong-cach-viblo-pmleB8G95rd&title=Tạo%20Chrome%20extension%20với%20Typescript%20%2B%20Vue%20theo%20phong%20cách%20Viblo), upvote, folow mình để đón đọc các bài viết tiếp theo của mình trên Viblo nhé!

Bạn cũng có thể subscribe các tag về [Vue](https://viblo.asia/tags/vue) và [Typescript](https://viblo.asia/tags/typescript) trên Viblo để nhận được nhiều hơn nữa các bài viết mới nhất về các topic này trên Vbilo nhé! Viblo sử dụng các dữ liệu mà bạn folow, quan tâm cho hệ thống gợi ý nên các bạn hãy folow những topic bạn yêu thích để hệ thống recommend thêm nhiều bài hay và bổ ích từ hàng nghìn bài viết trên Viblo mà bạn còn chưa từng đọc!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***