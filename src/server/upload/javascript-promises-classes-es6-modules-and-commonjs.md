Tiếp tục loạt bài về JavaScript ES6, trong bài viết lần này chúng ta sẽ cùng tìm hiểu cơ bản về `Promises`, `Classes`, `ES6 module` và `CommonJS`. 

Trong bài biết lần này mình sẽ sử dụng Editor là `Visual Studio Code` (https://code.visualstudio.com/) và `Firefox` (https://www.mozilla.org/en-US/firefox/new/). Các bạn có thể download và cài đặt ở link đính kèm, cách cài đặt cũng không khó nên mình sẽ không hướng dẫn ở đây mà mình sẽ đưa ra một số plugin gợi ý có thể thêm vào Visual Studio Code để dễ dàng hơn trong việc viết code JavaScript như hình sau
![](https://images.viblo.asia/475eac27-436b-4b80-aff0-584e046d79bd.png)
## Promises
`Promises` cung cấp cho chúng ta một cách đơn giản để thực hiện một task bất đồng bộ. Khi tạo ra một task không đồng bộ, một trong hai kết quả sẽ xảy ra: mọi thứ sẽ xảy ra như chúng ta mong đợi (`successful`) hoặc sẽ xuất hiện một lỗi (`unsuccessful`). Chúng ta sẽ xem xét một ví dụ sau để hiểu cách hoạt động của `promises`.

Chúng ta sẽ tạo một task bất đồng bộ là lấy data từ `randomuser.me` API.  Đây là API hỗ trợ việc tạo dữ liệu giả (`fake`) gồm nhiều thông tin của một user như địa chỉ email, tên, số điện thoại, vị trí,... Đầu tiên tạo function `getFakeMembers` trả về một promise như sau
```javascrip
        const getFakeMembers = count => new Promise((resolves, rejects) => {

        })
```
`count` là số lượng members chúng ta muốn lấy, khi khởi tạo một promise chúng ta sẽ truyền vào một function với hai tham số là `resolves` và `rejects`, hai tham số này cũng là 2 function sử dụng để  handle trong quá trình promise lấy dữ liệu. Tiếp theo chúng ta sẽ viết phần xử lý trong promise
```javascript
        const getFakeMembers = count => new Promise((resolves, rejects) => {
            const api = `https://api.randomuser.me/?nat=US&results=${count}`
            const request = new XMLHttpRequest()
            request.open('GET', api) // use GET method
            request.onload = () => 
                (request.status === 200) ? 
                resolves(JSON.parse(request.response).results) :
                rejects(request.statusText)
            request.onerror = (err) => rejects(err)
            request.send()
        })
```
Đoạn code trên mình thấy khá dễ hiểu nên mình ko giải thích nữa, nếu bạn nào đọc không hiểu có thể comment bên dưới bài viết mình sẽ giải thích nhé :D

Như vậy chúng ta đã định nghĩa được một `promise`. Để promise hoạt động, chúng ta sẽ gọi function `getFakeMembers`.
```javascript
        getFakeMembers(10).then(
            members => console.log(members), // resolves function 
            err => console.log(err) // rejects function
        )
```
Kết quả thu được

![](https://images.viblo.asia/ed6f67b4-60a8-4ecb-8c8f-cb1e0bbda27a.png)
Như vậy chúng ta đã hiểu cơ bản về cách sử dụng và hoạt động của `promise`. `Promise` được sử dụng nhiều trong `Node.js`. Các bạn có thể đọc thêm về `promise` tại https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise  và https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises .

## Classes
Trước đây trong JavaScript không có định nghĩa `class` chính thống mà chúng được định nghĩa thông qua `function`. Chúng ta có thể tạo ra một function và định nghĩa phương thức trên đối tượng function đó bằng việc sử dụng `prototype`.
```javascript
    function Vacation(destination, length) {
      this.destination = destination
      this.length = length
    }

    Vacation.prototype.print = function() {
      console.log(`${this.destination} will take ${this.length} days`)
    }

    let maui = new Vacation("Maui", 7)

    maui.print() // Maui will take 7 days
```
ES6 đã giới thiệu một cách mới để thể hiện `class` nhưng JavaScript bản chất vẫn hoạt động như cách cũ, tức là vẫn sử dụng `prototype` nhưng khác về cú pháp khai báo.
```javascript
    class Vacation {
      constructor(destination, length) {
        this.destination = destination
        this.length = length
      }

      print() {
        console.log(`${this.destination} will take ${this.length} days`)
      }
    }

    let maui = new Vacation("Maui", 7)

    maui.print() // Maui will take 7 days
```
`Classes` có thể được kế thừa. Khi một class được kế thừa, các class con sẽ được thừa kế các thuộc tính và phương thức của class cha. 

Chúng ta có thể sử dụng `Vacation` class như một class trừu tượng để tạo các loại `vacation`. Ví dụ chúng ta sẽ tạo một class `Expedition` kế thừa từ `Vacation`. 
```javascript
    class Expedition extends Vacation {
      constructor(destination, length, gear) {
        super(destination, length)
        this.gear = gear
      }
      
      print() {
        super.print()
        console.log(`Bring your ${this.gear.join(" and your ")}`)
      }
    }

    const trip = new Expedition("Mt. Whitney", 3, ["sunglasses", "prayer flags", "camera"])
    trip.print() 
    // Mt. Whitney will take 3 days.
    // Bring your sunglasses and your prayer flags and your camera
```
Giống như các ngôn ngữ lập trình hướng đối tượng khác, cú pháp khai báo `class` trong JavaScript là khá tương đồng. Điều này sẽ giúp chúng ta dễ dàng tiếp cận hơn.

## ES6 Modules
Module là một cách để tái sử dụng code được linh hoạt hơn, đây cũng là cách để chúng ta tương tác giữa các file JavaScript với nhau. JavaScript module được lưu trữ ở file, thông thường thì một file tương ứng là một module. Chúng ta có 2 lựa chọn khi tạo và export một module: 
1. Sử dụng từ khóa `export`

2. Sử dụng từ khóa `export default`

### export
Với từ khóa `export`, chúng ta có thể export tất cả các loại biến của JavaScript, trong một module (một file) có thể khai báo được `nhiều` từ khóa `export`. Ví dụ chúng ta sẽ tạo một file `custom.js` với đoạn code như sau
```javascript
// custom.js
export const addTextToBody = text => {
  const div = document.createElement('div')
  div.textContent = text
  document.body.appendChild(div)
}

export class Human {
  show() {
    console.log("Human: Hello world!")    
  }  
}
```
Chú ý khi sử dụng từ khóa `export`, chúng ta phải viết ngay khi khai báo class hoặc các biến như ví dụ trên, không thể khai báo trước xong mới export. Ví dụ
```javascript
const addTextToBody = text => {
  const div = document.createElement('div')
  div.textContent = text
  document.body.appendChild(div)
}

export addTextToBody // SyntaxError: missing declaration after 'export' keyword
```

Để sử dụng chúng ta sẽ tạo một file `index.html`
```xml
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script type="module">
      // code logic
  </script>
</body>
</html>
```
Vì sử dụng `module`, nên loại script sẽ là `type="module"`. Sau đó chúng ta sẽ sử dụng từ khóa `import` để import các biến, hằng số hoặc lớp đã được export như sau
```xml
  <script type="module">
    import {addTextToBody, Human} from './custom.js'

    addTextToBody("Hello World")

    const human = new Human
    human.show() // Human: Hello world!
  </script>
```

Chúng ta đã sử dụng cặp `{}` để import,  nhớ lại thì đây chính là cú pháp của `destructuring assigment` :D

Mặt khác chúng ta cũng có thể đổi tên biến, class được export trong module hiện tại khi import bằng từ khóa `as`. Ví dụ
```xml
  <script type="module">
    import {addTextToBody as a, Human as H} from './custom.js'

    a("Hello World")

    const human = new H
    human.show() // Human: Hello world!
  </script>
```
Ngoài ra chúng ta có thể import tất cả các biến, các lớp từ một module bằng cách sử dụng `import *`. Ví dụ
```xml
  <script type="module">
    import * as custom from './custom.js'

    custom.addTextToBody("Hello World")

    const human = new custom.Human
    human.show() // Human: Hello world!
  </script>
```
Chú ý khi dùng `import *`  tức là chúng ta đã gom tất cả các biến, lớp được export thành một object và chúng ta cần đặt tên cho object với từ khóa `as`, ở ví trụ trên là `custom`.

### export default
Với từ khóa `export default` , chúng ta cũng có thể export được lớp hoặc các biến như `export` nhưng có một số điểm khác biêt. Chú ý là chúng ta có thể sử dụng cả `export` và `export default` trong cùng một file tuy nhiên chúng ta chỉ có thể khai báo `một` từ khóa `export default` trong một module (một file). Ví dụ
```javascript
export default class Person {
  show() {
    console.log("Person: Hello world!")    
  }  
}
```
Đối với export default, chúng ta có thể khai báo xong rồi mới export
```javascript
const addTextToBody = text => {
  const div = document.createElement('div')
  div.textContent = text
  document.body.appendChild(div)
}

export default addTextToBody
```
Tuy nhiên nếu chúng ta export default ngay khi khai báo biến thì sẽ có lỗi vì cách này chỉ áp dụng được khi chúng ta khai báo một class.

Để sử dụng, cũng tương tự như `export` chúng ta cũng dùng từ khóa `import`, tuy nhiên trong trường hợp này nếu muốn đổi tên thì chỉ cần viết tên khác khi import mà không cần phải sử dụng từ khóa `as` (nếu sử dụng `as` ở đây sẽ xảy ra lỗi)
```xml
  <script type="module">
    import * as custom from './custom.js'
    import addText from './custom.js'
    addText("Hello World")

    const human = new custom.Human
    human.show() // Human: Hello world!
  </script>
```
Chú ý cú pháp `import *` ở trên không bao gồm các lớp hay các biến được export bởi `export default` do đó cần một câu lệnh `import` khác.

Một điểm nữa cần chú ý là ES6 module không hỗ trợ cho tất cả các trình duyệt, do đó chúng ta cần sử dụng Babel để transpiling  nhé :D
## CommonJS
`CommonJS` là một module pattern hỗ trợ cho tất cả các phiên bản Node.js. Với CommonJS, JavaScript objects sẽ được export với từ khóa `module.exports`. Ví dụ
```javascript
// custom.js
const log = (message) => console.log(message)

module.exports = {log}
```
CommonJS không sử dụng từ khóa `import` mà sử dụng `require` function để import:
```javasustom
// index.js
const {log} = require('./custom.js')

log("CommonJS")
```
Vì CommonJS là một pattern của Node.js, do đó để sử dụng được phía frontend, chúng ta cần một số công cụ bên thứ 3, trong phần này mình sẽ sử dụng [Browserify](http://browserify.org/) .
Cài đặt: 
```javascript
npm install -g browserify
```

Sau đó chúng ta sẽ sử dụng `browserify` CLI để chuyển đổi file `index.js` thành file `bundle.js` bằng lệnh
```javascript
browserify index.js > bundle.js
```
Bây giờ chúng ta có thể nhúng file bundle.js vào trong code html của chúng ta, trong tag script:
```xml
<!-- index.html -->
<script src="bundle.js"></script>
```
Sau khi load trang `index.html`, trong cửa sổ console của trình duyệt, chúng ta sẽ thu được kết quả `CommonJS`.

Như vậy chúng ta có thể sử dụng CommonJS ở cả backend lẫn frontend. Tuy nhiên CommonJS được dùng nhiều hơn phía backend (node server), do đó chúng ta cũng không cần thiết sử dụng CommonJS khi lập trình phía frontend. :D

#### Tài liệu tham khảo: http://shop.oreilly.com/product/0636920049579.do
#### Cảm ơn các bạn đã đọc bài viết. Happy coding!!!