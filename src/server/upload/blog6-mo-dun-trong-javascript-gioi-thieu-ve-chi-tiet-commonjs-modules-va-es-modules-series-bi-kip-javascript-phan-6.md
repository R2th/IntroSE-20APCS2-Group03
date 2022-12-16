![](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d4680e4f-d8f6-4d47-ba77-d23068eb2ec9/ddsyyge-b15b0284-ac88-4947-804b-690c2a77ae81.jpg/v1/fill/w_800,h_800,q_75,strp/006___charizard_by_petah55_ddsyyge-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvZDQ2ODBlNGYtZDhmNi00ZDQ3LWJhNzctZDIzMDY4ZWIyZWM5XC9kZHN5eWdlLWIxNWIwMjg0LWFjODgtNDk0Ny04MDRiLTY5MGMyYTc3YWU4MS5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Fgr85zNTzp29DOM29xZyRxeC09FlAEXR3L0UbjNp8Yw)

Mình là **TUẤN** hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Trong bài viết này, mình và bạn sẽ rí vìu qua cái gọi là mô-đun (Modules) trong JavaScript.

Mô-đun là một kỹ thuật được sử dụng nhiều trong **thiết kế/kiến trúc** phần mềm ngày nay.

Trước tiên, bạn sẽ tìm hiểu chúng là gì và các loại mô-đun đang tồn tại. Sau đó, bạn sẽ thảo luận về lý do tại sao các mô-đun lại hữu ích. Tiếp nữa, bạn sẽ xem các ví dụ và cú pháp cơ bản cho các loại mô-đun được sử dụng nhiều nhất, và cuối cùng bạn sẽ thảo luận về việc đóng gói, tại sao nó lại cần thiết và cách thực hiện.

Nào GÉT GÔ!🤣

Mục lục
-------

*   [Mô-đun là gì và tại sao chúng hữu ích](#whataremodulesandwhyaretheyuseful)
*   [Các loại mô-đun](#typesofmodules)
    *   [CommonJS](#commonjsmodules)
    *   [Mô-đun ES](#esmodules)
*   [Sử dụng mô-đun](#usingmodules)
*   [Bundling mô-đun](#bundlingmodules)
*   [Cuối cùng](#roundup)

Mô-đun là gì và tại sao chúng hữu ích
=====================================

Mô-đun chỉ là một đoạn code trong tệp mà bạn có thể gọi và sử dụng từ các tệp khác. Thiết kế mô-đun ngược lại với việc có tất cả code dự án của bạn trong một tệp duy nhất.

Khi phát triển một dự án lớn, sẽ rất hữu ích khi chia code của bạn thành các mô-đun vì những lý do sau:

*   Nó rất tốt cho việc phân chia các mối quan tâm và tính năng thành các tệp khác nhau, giúp hình dung và tổ chức code tốt hơn.
*   Code có xu hướng dễ bảo trì hơn và ít bị lỗi hơn khi nó được tổ chức rõ ràng.
*   Các mô-đun có thể dễ dàng được sử dụng và tái sử dụng trong các tệp và phần khác nhau của dự án mà không cần phải viết lại cùng một code.

Thay vì có tất cả các thành phần của chương trình trong một tệp duy nhất, bạn có thể chia nó thành các phần hoặc mô-đun và làm cho mỗi component trong số chúng chịu trách nhiệm về một tính năng hoặc một mối quan tâm duy nhất.

Nếu bây giờ khái niệm này vẫn chưa đủ rõ ràng, đừng lo lắng. Gét gô ví dụ nào.🤣

Các loại mô-đun
===============

Như với hầu hết mọi thứ trong cuộc sống, và đặc biệt là trong JavaScript, có nhiều cách để triển khai các mô-đun.

Vì JavaScript lần đầu tiên được tạo ra để chỉ là một ngôn ngữ kịch bản nhỏ cho các trang web, một tính năng cho các dự án lớn như mô-đun đã không được hỗ trợ ngay từ đầu.

Nhưng khi ngôn ngữ và hệ sinh thái phát triển, các nhà phát triển bắt đầu nhận thấy sự cần thiết của tính năng này. Vì vậy, các tùy chọn và thư viện khác nhau đã được phát triển để thêm tính năng này vào JavaScript.

Trong số rất nhiều cái có sẵn, bạn sẽ chỉ xem xét C[thenewstack.io](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/)ommonJS và ES modules, là những cái mới nhất và được sử dụng rộng rãi.

Ngoài lề: bạn có biết rằng [Javascript ban đầu được tạo ra chỉ trong 10 ngày làm việc](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/) ?

Khi phân tích sự phức tạp của JavaScript và hiểu ngôn ngữ này đã phát triển như thế nào, mình nghĩ rằng điều quan trọng cần lưu ý là ngôn ngữ ban đầu không được tạo ra để làm những gì hiện nay. Đó là sự phát triển của hệ sinh thái Javascript được hình thành và lớn mạnh như bây giờ.

Mô-đun CommonJS
---------------

[CommonJS](https://en.wikipedia.org/wiki/CommonJS) là một tập hợp các tiêu chuẩn được sử dụng để triển khai các mô-đun trên JavaScript. Dự án được bắt đầu bởi kỹ sư Mozilla Kevin Dangoor vào năm 2009. Anh em nào mà mê JS thì in hình **Sư phụ** **Kevin Dangoor** treo trong nhà nhé.

CommonJS chủ yếu được sử dụng trong các ứng dụng JS phía máy chủ có Node, vì các trình duyệt không hỗ trợ việc sử dụng CommonJS.

Như một comment bên lề, trước đây Node chỉ hỗ trợ CommonJS triển khai các mô-đun, nhưng ngày nay nó cũng hỗ trợ các mô-đun ES, đây là một cách tiếp cận hiện đại hơn.

Vì vậy, hãy xem CommonJS trông như thế nào trong code thực tế.

Để triển khai các mô-đun, trước tiên bạn cần có một ứng dụng Node trên máy tính của mình. Vì vậy, hãy tạo một cái bằng cách chạy `npm init -y.** (Run bằng công cụ gõ commandline bất kỳ nào mà bạn đang dùng)`

Đầu tiên, hãy tạo một tệp **main.js** với một hàm đơn giản trong đó.

```js
const testFunction = () => {  console.log('Im the main function')}
testFunction()
```
      

Được rồi, bây giờ giả sử bạn muốn có một hàm khác được gọi từ tệp **main.js**, nhưng bạn không muốn hàm được chứa trong file **main.js** vì nó không phải là một phần của tính năng cốt lõi. Đối với điều này, hãy tạo một tệp  `mod1.js` và thêm code này vào nó:

```js
const mod1Function = () =>
  console.log('Mod1 is alive!')
module.exports = mod1Function
```
      

`module.exports` là keyword sử dụng để khai báo tất cả những gì mà bạn muốn xuất từ ​​tệp đó.

Để sử dụng chức năng này trong tệp **main.js**, bạn có thể thực hiện như sau:

```js
mod1Function = require('./mod1.js')

const testFunction = () => {
  console.log('Im the main function')
  mod1Function()
}

testFunction()
```
      

Hãy xem bạn đã khai báo bất cứ thứ gì mình muốn sử dụng và sau đó gán nó cho tệp mà bạn muốn sử dụng. 🤓

Nếu bạn muốn xuất nhiều thứ từ một mô-đun, có thể làm như sau:

```js
const mod1Function = () =>
  console.log('Mod1 is alive!')
const mod1Function2 = () =>
  console.log('Mod1 is rolling, baby!')

module.exports = {
  mod1Function,
  mod1Function2,
}
```
      

Và trên tệp **main.js**, bạn có thể sử dụng cả hai hàm như sau:

```js
{
  mod1Function,
  mod1Function2,
} = require('./mod1.js')

const testFunction = () => {
  console.log('Im the main function')
  mod1Function()
  mod1Function2()
}

testFunction()
```
      
Khá đơn giản phải không? Nó đơn giản nhưng là một công cụ mạnh mẽ để sử dụng. 😂

Mô-đun ES
---------

Bây giờ bạn hãy xem qua ESmodules. ESmodules là một tiêu chuẩn đã được giới thiệu với ES6 (2015). Ý tưởng là độc lập hóa cách các mô-đun JS hoạt động và triển khai các tính năng này trong các trình duyệt (trước đây không hỗ trợ các mô-đun).

ESmodules là một cách tiếp cận hiện đại hơn hiện được hỗ trợ bởi trình duyệt và các ứng dụng phía máy chủ với Node.

Hãy xem điều này trong code. Một lần nữa, bạn bắt đầu bằng cách tạo một ứng dụng Node với `npm init -y` .

Bây giờ bạn đi đến `package.json` và thêm `"type": "module"` vào nó, như thế này:

```js
{
  "name": "modulestestapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```
      
Nếu bạn không làm điều này và cố gắng triển khai ESmodules trên Node, bạn sẽ gặp lỗi. 🤣

Bây giờ bạn hãy lặp lại cùng một ví dụ chính xác. Trong tệp **main.js**, mình sẽ có code sau:

```js
// main.js
import {mod1Function} from './mod1.js'

const testFunction = () => {
  console.log('Im the main function')
  mod1Function()
}

testFunction()
```
      

Và `mod1.js` sẽ có cái này:

```js
// mod1.js
const mod1Function = () =>
  console.log('Mod1 is alive!')
export {mod1Function}
```
      

Thay vì `require` thì bạn đang sử dụng `import` và thay vì `module.exports` bạn đang sử dụng `export`. Cú pháp có một chút khác biệt nhưng hành vi thì rất giống nhau.

Một lần nữa, nếu bạn muốn xuất nhiều thứ từ cùng một tệp, bạn có thể làm như thế này:

```js
import {
  mod1Function,
  mod1Function2,
} from './mod1.js'

const testFunction = () => {
  console.log('Im the main function')
  mod1Function()
  mod1Function2()
}

testFunction()
// mod1.js
const mod1Function = () =>
  console.log('Mod1 is alive!')
const mod1Function2 = () =>
  console.log('Mod1 is rolling, baby!')

export {mod1Function, mod1Function2}
```

Một tính năng khác có sẵn trong ESmodules là đổi tên nhập, có thể được thực hiện như sau:

```js
import {
  mod1Function as funct1,
  mod1Function2 as funct2,
} from './mod1.js'

const testFunction = () => {
  console.log('Im the main function')
  funct1()
  funct2()
}
testFunction()
```

Lưu ý rằng việc sử dụng keyword **as** sau mỗi hàm, và sau đó đổi tên nó theo cách chúng ta muốn. Sau đó trong code bạn có thể sử dụng tên mới đó thay cho tên ban đầu mà nhập có. 😎

Một điều khác bạn có thể làm là import tất cả các exports lại với nhau và đặt chúng lại với nhau trong một đối tượng, như sau:

```js
// main.js
import * as mod1 from './mod1.js'

const testFunction = () => {
  console.log('Im the main function')
  mod1.mod1Function()
  mod1.mod1Function2()
}

testFunction()
```
      

Điều này có thể hữu ích trong các trường hợp, khi bạn muốn rõ ràng về nguồn gốc nhập. Xem rằng các chức năng hiện đang được gọi như thế này: `mod1.mod1Function()` **.**

Điều đáng nói cuối cùng là keyword **default**. Với nó, bạn có thể xuất mặc định cho một mô-đun nhất định. Như thế này:

```js
// mod1.js
const mod1Function = () =>
  console.log('Mod1 is alive!')
const mod1Function2 = () =>
  console.log('Mod1 is rolling, baby!')

export default mod1Function
export {mod1Function2}
```

Chà, điều đó có nghĩa là bạn không phải phá hủy nó khi nhập khẩu. Ae có thể sử dụng nó như thế này:

```js
// main.js
import mod1Function, {
  mod1Function2,
} from './mod1.js'

const testFunction = () => {
  console.log('Im the main function')
  mod1Function()
  mod1Function2()
}

testFunction()
```
      

Bạn thậm chí có thể đổi tên **import** thành bất kỳ thứ gì bạn muốn mà không cần keyword **as**, vì JavaScript "**biết**" rằng nếu bạn không cấu trúc lại, thì sẽ là nhập mặc định.

```js
// main.js
import lalala, {
  mod1Function2,
} from './mod1.js'

const testFunction = () => {
  console.log('Im the main function')
  lalala()
  mod1Function2()
}

testFunction()
```
      

Và điều đó cũng tóm tắt về ESmodules. 😚

Sử dụng mô-đun
==============

Được rồi, bây giờ bạn đã rõ về các loại mô-đun khác nhau có sẵn và cách chúng hoạt động, hãy xem cách bạn có thể triển khai các mô-đun trong một trang web bằng cách sử dụng HMTL và **Vanilla JS (JS thuần).**

Hãy tạo một tệp HTML đơn giản với một tiêu đề, hai nút và một thẻ script liên kết đến tệp main.js:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, 
      initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>I'm just a test...</h1>
    <button id="isAlive">Is mod1 alive?</button>
    <button id="isRolling">Is mod1 rolling?</button>
    <script src="./main.js" type="module"></script>
  </body>
</html>
```
      
Hãy chú ý đến thực tế là mình đang khai báo **type="module"** trên thẻ **script**. Ae cần làm điều này để sử dụng tính năng mô-đun JS. Nếu không, bạn sẽ gặp lỗi như sau:

`Uncaught SyntaxError: Cannot use import statement outside a module`
      

Nếu bạn mở tệp HTML của mình, sẽ nhận được một cái gì đó như sau:  

![image.png](https://images.viblo.asia/706de470-d5c2-4fea-9b00-4a548c27695a.png)

Tệp **main.js** của bạn sẽ có code này:

```js
// main.js
import {mod1Function, mod1Function2} from './mod1.js'

const testFunction = () => console.log('Im the main function')

document.getElementById('isAlive').addEventListener('click', () => mod1Function())
document.getElementById('isRolling').addEventListener('click', () => mod1Function2())

testFunction()
```

Ae chỉ thêm trình xử lý sự kiện **click** vào mỗi nút để các chức năng đến từ tệp mod1.js được thực thi.

Được rồi, bây giờ bạn có thể **serve (run)** tệp HTML của mình và xem nó có hoạt động không. Ae cần **serve** tệp, bạn không thể chỉ mở HTML trong trình duyệt vì bạn sẽ gặp lỗi CORS như sau:

`Access to script at ... from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, brave, chrome-untrusted, https.`
      

Để **serve** nhanh chóng, bạn có thể sử dụng tiện ích mở rộng của VSCode là **Live server** hoặc tạo ứng dụng Node bằng cách chạy `npm init -y` và sau đó chạy `npx serve`.

Dù sao đi nữa, khi tệp được **serve**, bạn có thể nhấp vào từng nút và test xem các chức năng của bạn có thực thi chính xác hay không. Bảng điều khiển của bạn sẽ trông như thế này:  
![ảnh chụp màn hình_1-1](https://www.freecodecamp.org/news/content/images/2022/04/screenshot_1-1.png)

Nhưng có một điều nữa về điều này. Nếu bạn chuyển đến tab network của các công cụ dành cho nhà phát triển của trình duyệt và lọc theo tệp JS, bạn có thể thấy rằng trang web đang tải hai tệp `main.js` và `mod1.js` :  
![screenshot_3](https://www.freecodecamp.org/news/content/images/2022/04/screenshot_3.png)

Tất nhiên nếu bạn sẽ sử dụng code bên trong mỗi tệp, cả hai đều cần được tải - nhưng đây không phải là điều tốt nhất để làm. Đó là bởi vì trình duyệt cần thực hiện hai yêu cầu khác nhau để tải tất cả JS cần thiết.

Bạn nên luôn cố gắng giảm các yêu cầu xuống minimun để tăng hiệu suất cho các dự án của bạn. Vì vậy, hãy xem bạn có thể làm điều này như thế nào với sự trợ giúp của bundler mô-đun.

Ngoài lề: nếu bạn muốn giải thích bằng video, [Kent C Dodds có một giải thích tuyệt vời](https://egghead.io/lessons/javascript-use-javascript-modules-in-the-browser) . Mình thực sự khuyên bạn nên học theo youtuber này. Anh ấy là một trong những giáo viên JS giỏi nhất hiện có. Và [đây là một video](https://www.youtube.com/watch?v=qgRUr-YUk1Q) thú vị khác của Fireship. ;)

Bundling mô-đun
===============

Như đã đề cập trước đây, việc phân chia code của bạn thành các mô-đun là rất tốt vì codebase của bạn sẽ có tổ chức hơn và việc sử dụng lại code của bạn sẽ dễ dàng hơn.

Nhưng đây là những lợi thế chỉ dành cho giai đoạn phát triển của một dự án. Khi ở chế độ sản xuất, các mô-đun không phải là điều tốt nhất, vì việc buộc trình duyệt đưa ra yêu cầu cho mỗi tệp JS có thể làm ảnh hưởng đến hiệu suất của trang web.

Vấn đề này có thể được giải quyết dễ dàng với việc sử dụng bundler mô-đun. Nói một cách đơn giản, các bundlers mô-đun là các chương trình lấy mô-đun JS làm đầu vào và kết hợp chúng thành một tệp duy nhất (nhiều trình bundlers mô-đun có nhiều tính năng hơn nhưng đó là khái niệm cốt lõi của chúng).

Nhờ đó, với tư cách là các nhà phát triển, bạn có thể viết code dự án của mình chia nó thành các phần được tổ chức độc đáo và sau đó chạy một trình bundler mô-đun để có được code cuối cùng sẽ được sử dụng trong quá trình sản xuất.

Bước chuyển đổi "development code" thành "production code" thường được coi là "build".

Có nhiều tùy chọn để sử dụng cho việc này (như [Browserify](https://browserify.org/) , [Parcel](https://parceljs.org/) , [Rollup.js](https://rollupjs.org/guide/en/) , [Snowpack](https://www.snowpack.dev/) ...) nhưng được sử dụng rộng rãi nhất là [Webpack](https://webpack.js.org/). Vì vậy, bạn hãy xem một ví dụ sử dụng Webpack.

Ngoài lề: Nếu bạn muốn tìm hiểu sâu hơn về các bundler mô-đun và cách chúng hoạt động, [video tuyệt vời này của Fireship](https://www.youtube.com/watch?v=5IG4UmULyoA&t=382s) có thể là một nơi tốt để bắt đầu. Webpack là một công cụ rất mạnh mẽ và phức tạp, có thể thực hiện nhiều việc ngoài việc đóng gói các tệp JS. Xem [tài liệu của webpack](https://webpack.js.org/) nếu bạn muốn tìm hiểu thêm.

Tuyệt vời, vì vậy bây giờ bạn có thể bắt đầu bằng cách tạo một ứng dụng Node (nếu bạn chưa có) bằng cách chạy `npm init -y`. Sau đó, bạn sẽ cần cài đặt **Webpack** và **Webpack CLI** bằng cách chạy `npm i --save-dev webpack webpack-cli`

Tiếp theo, bạn sẽ tạo một tệp **webpack.config.js** và đặt code này bên trong nó:

```js
/* webpack.config.js */
const path = require('path')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
}
```
      

Tệp này sẽ chịu trách nhiệm về cấu hình của **Webpack** và cách nó sẽ hoạt động trong ứng dụng của bạn.

Những gì bạn đang làm ở đây đầu tiên là thiết lập tệp file bắt đầu ( `entry: './main.js'` ). **Webpack** sẽ bắt đầu bằng cách đọc tệp đó và sau đó phân tích tất cả các phụ thuộc (mô-đun được import từ tệp đó). Nói cách khác, entry file là tệp **main.js** của mình, nơi tất cả các mô-đun khác được nhập.

Sau đó, bạn khai báo đầu ra - đầu tiên khai báo đường dẫn nơi nó sẽ được lưu trữ và sau đó khai báo tên của tệp được đóng gói.

```json
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
}
```
      

😎Bây giờ bạn hãy đi đến tệp package.json của bạn và thêm một lệnh `build`, như sau:

```json
{
  "name": "testappv2",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  }
}
```
      

Sau đó, bạn có thể quay lại **terminal** của mình và chạy `npm run build`. Điều đó sẽ tạo ra một thư mục `dist` trong dự án của bạn và bên trong nó là một tệp **bundle.js**.

Nếu bạn test tệp đó, bạn sẽ thấy code này bên trong tệp:

`(()=>{"use strict";document.v.v.`

Bạn sẽ thấy rằng nó thực tế giống với code mà bạn đã code trong các tệp của mình, nhưng tất cả được gói gọn trong một tệp duy nhất và được rút gọn.

Điều duy nhất còn lại là thay đổi thẻ script trong tệp **index.html** của bạn để nó sử dụng nó, như thế này:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>I'm just a test...</h1>
    <button id="isAlive">Is mod1 alive?</button>
    <button id="isRolling">Is mod1 rolling?</button>
    <script src="./dist/bundle.js" type="module"></script>
  </body>
</html>
```

Bây giờ bạn có thể serve nó một lần nữa, hãy test xem JS vẫn hoạt động hoàn hảo và nếu bạn mở lại tab network, bạn sẽ thấy chỉ một tệp duy nhất đang được tải! 😱  
![ảnh chụp màn hình_2-1](https://www.freecodecamp.org/news/content/images/2022/04/screenshot_2-1.png)

Mình hy vọng ví dụ đơn giản này đã giúp bạn hiểu được mức độ liên quan của các bundler mô-đun và cách chúng giúp bạn bundler code với kiến trúc mô-đun nhưng hiệu suất trang web vẫn tốt.

Cuối cùng
=========

🤓, bạn đã hoàn thành cho ngày hôm nay. Trong bài viết này, chúng ta đã biết các mô-đun là gì, tại sao chúng lại thú vị, các cách khác nhau mà bạn có thể triển khai các mô-đun trong JavaScript và một ví dụ thực tế về việc đóng gói code của bạn với **Webpack**.

Để có hướng dẫn đầy đủ về các mô-đun JS, bạn có thể xem [qua bài viết này](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) .

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉
# Ref
* https://tuan200tokyo.blogspot.com/2022/09/blog6-mo-un-trong-javascript-gioi-thieu.html