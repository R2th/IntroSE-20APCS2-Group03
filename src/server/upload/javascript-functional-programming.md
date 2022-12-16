`Lập trình hàm (Functional programming)` không còn là cái tên lạ lẫm trong thời gian gần đây, nhiều lập trình viên đã và đang dần chuyển đổi theo mô hình lập trình này. Trong bài viết hôm nay, chúng ta sẽ cùng nhau tìm hiểu cơ bản về `lập trình hàm` trong `JavaScript`. 
## Basic example
Chúng ta sẽ xem xét một số ví dụ để thấy được một số điểm thú vị của `lập trình hàm` trong `JavaScript` nhé. Ở đây, mình sẽ sử dụng cú pháp `ES6`, nếu bạn nào chưa quen dùng ES6 thì có thể tham khảo các bài viết phần `JavaScript - ES6` của mình tại [đây](https://viblo.asia/s/javascript-es6-WrZngQrnlxw) :D

Trong `JavaScript` , `functions` là `variables`
```javascript
    // functions are variables
    const log = message => console.log(message) 
```
Vì `functions` là `variables` nên chúng ta có thể dễ dàng đưa chúng vào trong một đối tượng như sau
```javascript
    // function are variables => we can add them to objects
    const obj = {
      message: "message",
      log(message) {
        console.log(message)
      }
    }
    obj.log(obj.message) // message
```

Tương tự, chúng ta hoàn toàn có thể đưa chúng vào trong một mảng
```javascript
    // we can add function to arrays
    const arr = ["hello", message => console.log(message)]
    arr[1](arr[0]) // hello
```

Chúng ta cũng có thể truyền `functions` vào `function` khác như một đối số
```javascript
    // we can send functions to other functions as arguments
    const insideFn = logger => logger("test")
    insideFn(message => console.log(message)) // test
```

Tương tự, chúng ta sẽ có thể trả về một `function` trong một `function` khác
```javascript
    // we can return a function
    const returnFn = () => log
    returnFn()("return a function") // return a function
    
    const returnFn2 = logger => message => logger(message.toUpperCase())
    returnFn2(message => console.log(message))("Nguyen Thanh Tuan") // NGUYEN THANH TUAN
```
Ở đoạn này ` const returnFn2 = logger => message => logger(message.toUpperCase())` có thể có nhiều bạn khó hiểu nên mình sẽ viết lại theo cú pháp cũ như sau
```javascript
    var returnFn2 = function(logger) {
      return function(message) {
        logger(message.toUpperCase())
      }
    }
    returnFn2(message => console.log(message))("Nguyen Thanh Tuan") // NGUYEN THANH TUAN
```
Như vậy, qua một số ví dụ trên, chúng ta có thể thấy trong `lập trình hàm`, `hàm (function)` được sử dụng khá thuận tiện và linh hoạt, các bạn đã thấy thú vị hay chưa? :D
## Imperative vs Declarative
`Imperative` là một mô hình lập trình quen thuộc với chúng ta, như C, Java, ... đều được thiết kế dựa trên mô hình này. Tuy nhiên `lập trình hàm` không nằm trong mô hình này mà nó là một phần của mô hình lập trình `Declarative`. Có nhiều cách để hiểu hai mô hình này mà chúng ta có thể tìm thấy trên mạng tuy nhiên mình sẽ nói theo cách hiểu của mình như sau
* `Imperative` : nói cho máy tính các bước làm (**how**) để thực hiện công việc.
* `Declararive`: nói cho máy tính công việc là gì (**what**).

Ví dụ chúng ta muốn nối các phần tử của một mảng ngăn cách bởi khoảng trắng và tạo thành một chuỗi. Cách làm tương ứng với hai mô hình lập trình như sau
```javascript
    const array = ["Hello", "World"]
    // imperative
    let result = ""
    for (let i = 0; i < array.length; i++) {
      result += array[i]
      if (i !== array.length - 1) {
        result += " "
      }
    }
    console.log(result) // Hello World
    
    // declarative
    console.log(array.join(" ")) // Hello World
```
Như vậy, với cách làm theo `imperative`, chúng ta sẽ phải chỉ ra tuần tự các bước để máy tính thực hiện và cho ra kết quả, còn đối với `declarative`, chúng ta chỉ cần chỉ ra công việc là gì và không cần quan tâm máy tính sẽ làm như nào để có được kết quả. Hy vọng qua ví dụ nhỏ này, các bạn có thể hiểu hơn về hai mô hình lập trình trên.
## Functional Concepts
Tiếp theo, chúng ta sẽ tìm hiểu các `concept` trong `lập trình hàm`.
### Immutability
Đầu tiên là `immutability` - không thay đổi. Điều này có nghĩa là chúng ra sẽ hạn chế thay đổi các biến trong chương trình, việc này sẽ giúp khi chúng ta debug hoặc maintain chương trình. Ví dụ
```javascript
    let person = {
      name: "Tuan",
      age: 25,
      phone: "0123456789"      
    }
    const changePhone = (person, phone) => {
      person.phone = phone
      return person
    }
    console.log(changePhone(person, "474747474747").phone) // 474747474747
    console.log(person.phone) // 474747474747
```
Trong `JavaScript`, đối số của function được trỏ trực tiếp đến dữ liệu thật. Do đó khi thay đổi `phone` của `person`, chúng ta đã thay đổi chính data thực. Để không thay đổi, chúng ta cần tạo ra bản sao của `person`
```javascript
    let person = {
      name: "Tuan",
      age: 25,
      phone: "0123456789"      
    }
    const changePhone = (person, phone) => Object.assign({}, person, {phone: phone})
    console.log(changePhone(person, "474747474747").phone) // 474747474747
    console.log(person.phone) // 0123456789
```
Ngoài cách trên chúng ta có thể sử dụng cú pháp `spread operator`
```javascript
    let person = {
      name: "Tuan",
      age: 25,
      phone: "0123456789"      
    }
    const changePhone = (person, phone) => ({
      ...person,
      phone
    })
    console.log(changePhone(person, "474747474747").phone) // 474747474747
    console.log(person.phone) // 0123456789
```

Để hiểu hơn về `immutability`, chúng ta sẽ làm thêm một ví dụ khác
```javascript
    let list = [
      {title: "Rad Red"},
      {title: "Lawn"},
      {title: "Party Pink"}
    ]
    var addColor = function(title, colors) {
      colors.push({title})
      return colors
    }
    console.log(addColor("test", list).length) // 4
    console.log(list.length) // 4
```

Các bạn có thể viết thử cách khác để đảm bảo tính `immutability` của `addColor` xem sao nhé :D

### Pure Functions
`Pure functions` là một function cần được thỏa mãn các điều kiện sau
+ Có ít nhất một đối số.
+ Trả về 1 giá trị hoặc 1 function khác.
+ Không làm thay đổi đối số hoặc bất kỳ giá trị nào của đối số.

Chúng ta sẽ lấy một ví dụ sau:
```javascript
    let me = {
      name: "Thanh Tuan",
      favorite: "Programming"
    }

    // not a pure function
    const changeName = (person, newName) => {
      person.name = newName
      return person
    }
    console.log(changeName(me, "Nguyen Thanh Tuan").name) // Nguyen Thanh Tuan
    console.log(me.name) // Nguyen Thanh Tuan
```
Như vậy chúng ta thấy ở đây, đối số person đã bị thay đổi giá trị, do đó đây không phải là `pure function`. Để làm cho đối số không bị thay đổi, chúng ta sẽ tạo ra một bản sao của person và thay đổi trên bản sao này
```javascript
    let me = {
      name: "Thanh Tuan",
      favorite: "Programming"
    }

    // a pure function
    const changeName = (person, newName) => ({
      ...person,
      name: newName
    })
    console.log(changeName(me, "Nguyen Thanh Tuan").name) // Nguyen Thanh Tuan
    console.log(me.name) // Thanh Tuan
```
Như vậy, `changeName` đã trở thành một pure function. Ở đây mình cũng chú ý một cách viết gọn và nhanh hơn như sau
```javascript
    // a pure function
    const changeName = (person, name) => ({
      ...person,
      name
    })
```
Ở đây, bộ dịch sẽ tự hiểu được lấy tên đối số là key và giá trị của đối số là value trong object. Các bạn chú ý nhé :D

### Data Transformations
Để giảm thiểu sự phức tạp và đảm bảo tính `immutability`, Javascript đã cung cấp một số function để hỗ trợ mạnh mẽ cho chúng ta. 
#### join
Khi chúng ta muốn nối các phần tử của một mảng thành một chuỗi, đơn giản chúng ta sẽ sử dụng `join` function. Ví dụ
```javascript
    let schools = [
      "Thanh Tri",
      "Linh Nam",
      "Tran Phu"
    ]

    // join function: array to string
    console.log(schools.join(", ")) // Thanh Tri, Linh Nam, Tran Phu
```

#### filter
Nếu chúng ta muốn tạo một mảng gồm các `school` có tên bắt đầu bằng chữ `T`. Chúng ta sử dụng `filter` function.
```javascript
    // filter function: array to new array
    const tSchools = schools.filter(school => school[0] === "T")
    console.log(tSchools)
```
`Array.filter` function là một function chuyển đổi từ một mảng nguồn thành một mảng mới với đối số là một function (function này luôn luôn trả về `true` hoặc `false`) - `predicate` function. `Array.filter` sẽ gọi `predicate` mỗi lần tương ứng với mỗi phần tử của mảng nguồn. Nếu phần tử thỏa mãn điều kiện trong `predicate` thì sẽ được thêm vào mảng mới.

`Array.filter` là một immutable function, do đó khi muốn xóa một phần tử từ một mảng chúng ta nên sử dụng function này thay thế cho Array.pop hoặc Array.splice. Ví dụ
```javascript
    const cutSchools = (cut, list) => list.filter(item => item !== cut)
    console.log(cutSchools("Thanh Tri", schools)) // Array [ "Linh Nam", "Tran Phu" ]
```
#### map
`Arrray.map` cũng chuyển đổi một array thành một new array.  Tuy nhiên đối số của `map` khác với đối số của `filter`. Đối số của `map` là một function và kết quả trả về từ function này sẽ được thêm vào mảng mới. Ví dụ
```javascript
    // map function: array to new array
    const highSchools = schools.map(school => `${school} high school`)
    console.log(highSchools) // Array(3) [ "Thanh Tri high school", "Linh Nam high school", "Tran Phu high school" ]
```
Ngoài ra, `map` cũng có thể chuyển một object thành một mảng các object. Ví dụ
```javascript
    // map function: object to array
    schools = {
      "Thanh Tri": 10,
      "Tran Phu": 2
    }
    const schoolsArray = Object.keys(schools).map(key => ({
      name: key,
      wins: schools[key]
    }))
    console.log(schoolsArray) // Array [{name: "Thanh Tri", wins: 10}, {name: "Tran Phu", wins: 2}]
```
`Object.keys` là một function trả về một mảng gồm tất cả các `key` của một object. Các bạn chú ý nhé :D

#### reduce và reduceRight
`Array.reduce` và `Array.reduceRight` là hai function sẽ chuyển đổi từ một mảng thành một giá trị bất kỳ như kiểu số, kiểu chuỗi, kiểu boolean hoặc thậm chí là một function. Ví dụ chúng ta muốn tìm giá trị lớn nhất (max) của một mảng sô, chúng ta sẽ sử dụng `reduce`
```javascript
    // reduce and reduceRight function: array to value (number, string, object, boolean, ...)
    // array to number
    const ages = [23, 45, 98, 57]
    const maxAge = ages.reduce((max, current) => max >= current ? max: current, 0)
    console.log(maxAge) // 98
```
Đối số của function là callback function và giá trị khởi tạo. Ở ví dụ trên giá trị khởi tạo là 0. `Callback` function sẽ được gọi tương ứng một lần với mỗi phần tử của mảng. Đối số của `callback` sẽ là giá trị trả về từ lần gọi trước đó và phần tử của mảng hiện tại.
+ Lần 1: max = 0, current = 23 => return 23 (ban đầu max chính bằng giá trị khởi tạo ban đầu)
+ Lần 2: max = 23, current = 45 => return 45
+ Lần 3: max = 45, current = 98 => return 98
+ Lần 4: max = 98, current = 57 => return 98 - final => MAX = 98
Tương tự khi sử dụng `reduceRight` cũng sẽ hoạt động như trên nhưng có một điểm khác là function này sẽ duyệt mảng từ phải qua trái.

Một ví dụ khác chúng ta sẽ sử dụng `reduce` để chuyển đổi một mảng thành một mảng mới. Ví dụ
```javascript
    const colors = ["red", "red", "green", "blue", "green"]
    const distinctColors = colors.reduceRight((distinct, color) => 
      distinct.indexOf(color) === -1 ? [...distinct, color] : distinct
    , [])
    console.log(distinctColors) // Array(3) [ "red", "green", "blue" ]
```
`Array.indexOf` là function trả về vị trí của phần tử đó trong mảng, nếu mảng không chứa phần tử đó thì sẽ return về `-1`. Các bạn có thể thử viết cách hoạt động của ví dụ trên để hiểu rõ hơn nhé :D 

Trên là 4 `function` được sử dụng nhiều nhất để chuyển đổi dữ liệu mảng trong Javascript. Hy vọng phần này giúp bạn hiểu rõ hơn về tư tưởng của `Lập trinh hàm` trong Javascript. :D
### Higher-Order Functions
`Higher-Order Functions` là các function có thể sử dụng các function khác. Chúng ta có đưa function như một `đối số (arguments)` hoặc  `trả về (return)` function hoặc cũng có thể cả hai. 

Như ở phần trước, `Array.map, Array.filter, Array.reduce` đều sử dụng function như một `đối số` do đó các function này đều là `higher-order functions`. 

Chúng ta sẽ xét một ví dụ sau
```javascript
    const show = (condition, funcTrue, funcFalse) => condition ? funcTrue() : funcFalse()
    const showWelcome = () => console.log("Welcome")
    const showUnauthorized = () => console.log("Unauthorized")

    show(true, showWelcome, showUnauthorized) // Welcome
    show(false, showWelcome, showUnauthorized) // Unauthorized
```
`Higher-Order function` sẽ giúp chúng ta handle được các trường hợp phức tạp với các task bất đồng bộ trong Javascript. 

### Recursion
`Recursion` - đệ quy là một kỹ thuật để một function có thể gọi lại chính nó. Ví dụ
```javascript
    // recursion
    const countdown = (value, func) => {
      func(value)
      return value > 0 ? setTimeout(() => countdown(value - 1, func), 1000) : value
    }
    countdown(10, mess => console.log(mess))
```
Đệ quy cũng được áp dụng khá nhiều ở các ngôn ngữ lập trình khác, do đó function trên mình thấy khá dễ hiểu nên không giải thích nữa nhé :D
### Composition
Trong lập trình nhiều trường hợp chúng ta sẽ thấy kết quả của function này là đối số của function khác. `Composition` là một kỹ thuật dùng để sinh ra một `higher-order function` bằng việc tổ hợp các function đơn giản. Ví dụ
```javascript
    // composition
    const returnDate = date => date.getDate()
    const logger = value => console.log(value)
    // kết quả của function này là đối số của function khác
    const both = date => logger(returnDate(date))
    both(new Date)
```
Ở ví dụ trên, `both` là một function tổ hợp của `logger` và `returnDate`. Tuy nhiên với cú pháp trên có một vấn đề xảy ra khi số lượng function ở đây là số lượng lớn, khi đó chúng ta rất khó để bảo trì và mở rộng. Chúng ta sẽ xem xét một hướng đi khác cho kỹ thuật `compositon` như sau
```javascript
    const compose = (...funs) => (arg) => funs.reduce((composed, f) => f(composed), arg)

    const both2 = compose(
      returnDate,
      logger
    )
    both2(new Date)
```

Để dễ hiểu hơn, mình sẽ viết hoạt động của `compose` function như sau

    1. composed = arg; f = returnDate
    2. composed = returnDate(arg), f = logger
    3. both2 = arg => logger(returnDate(arg))
    
Nói cách khác, sau khi `compose` các function chúng ta sẽ lại thu được một function tương tự như `both` function. Tuy nhiên với cú pháp ở trên, chúng ta sẽ dễ dàng hơn khi muốn thêm một function nào đó vào trong logic của `both2` function. Một lợi ích nữa là chúng ta có thể thay đổi thứ tự gọi của các function được linh hoạt hơn.
##  Summary
Trên đây là những kiến thức cơ bản khi `Lập trình hàm` trong `Javascript`. Có 3 điểm chúng ta cần nhớ khi đi theo mô hình lập trình này (trong Javascript)
1. Giữ dữ liệu không bị thay đổi.
2. Sử dụng các pure function (có ít nhất một đối số và trả về dữ liệu hoặc một function khác và không làm thay đổi giá trị của đối số).
3. Sử dụng đệ quy để thay thế vòng lặp khi có thể.

Hy vọng bài viết này sẽ giúp được các bạn phần nào hiểu được tư tưởng và cách áp dụng mô hình `lập trình hàm` nói chung và trong `Javascript` nói riêng. :D 
#### Tài liệu tham khảo: http://shop.oreilly.com/product/0636920049579.do
#### Cảm ơn các bạn đã đọc bài viết. Happy coding!!!