Chào các bạn, để tiếp tục chuỗi bài về Javascript của mình, hôm nay mình sẽ viết về một operator rất hữu ích, đó là spread operator (được viết là `...`). Spread operator là một cách rất hữu dụng và ngắn gọn để dùng trong các thao tác với mảng như thêm phần tử vào mảng, kết hợp mảng (hoặc object), truyền tham số mảng vào function, ... Chúng ta sẽ cùng tìm hiểu chi tiết nhé.

## Spread operator là gì ?
Trong Javascript, spread operator là nói đến cách sử dụng ký hiệu dấu ba chấm  `...`. Theo Javascrip.info thì spread operator được định nghĩa như sau :
> “When ...arr is used in the function call, it ‘expands’ an iterable object arr into the list of arguments.”

Spread operator được thêm vào từ phiên bản ES6 (ES2015), cũng như [rest parameter](https://www.geeksforgeeks.org/javascript-rest-operator/), 2 loại operator này giống nhau về mặt cú pháp, đó là cùng sử dụng dấu `...`.

## Vậy thì `...` dùng để làm gì ?
> “Spread operator to the rescue! It looks similar to rest parameters, also using ..., but does quite the opposite.” — JavaScript.info

Mình sẽ lấy ví dụ cơ bản nhất, đó là hàm tìm số lớn nhất trong mảng như sau :
```javascript
Math.max(1,3,5) // output: 5
Math.max([1,3,5]) // output: NaN
```

Khi chúng ta truyền một mảng 3 phần tử vào làm tham số của một hàm (ở đây là hàm Math.max()) như dòng thứ 2, chúng ta mong muốn rằng hàm này sẽ hiểu rằng chúng ta truyền vào 3 tham số riêng biệt, và tìm số lớn nhất trong 3 số này (như cách viết trong dòng thứ 2). Tất nhiên là nếu chúng ta viết như vậy thì hàm sẽ không hiểu được rồi, và sẽ cho ra output là NaN. Đây chính là lúc chúng ta cần đến `...`, chỉ cần thêm dấu `...` vào phần argument, chúng ta sẽ có kết quả mong muốn 

```javascript
Math.max(...[1,3,5]) // output: 5
```

Trong trường hợp này, spread operator đã mở rộng (spread) mảng 3 phần tử thành 3 tham số riêng biệt.

Ngoài chức năng như mình đã kể ở trên, spread operator còn có rất nhiều các chức năng hữu dụng khác giúp code của chúng ta ngắn gọn và dễ nhìn hơn rất nhiều, có thể kể đến như :
* Sao chép một mảng
* Tách hoặc kết hợp một hay nhiều mảng
* Sử dụng mảng như danh sách các argument
* Thêm một item vào một list
* Thao tác với state trong React
* Kết hợp các objects
* Chuyển NodeList thành một array

## Những ví dụ khác về spread operator `...`

Sau đây mình sẽ giới thiệu tới các bạn một vài ví dụ mà spread operator có thể làm được như sao chép mảng, tách string thành các characters, hoặc là kết hợp các thuộc tính của một object

```javascript
[...["😋😛😜🤪😝"]] // Array [ "😋😛😜🤪😝" ]
[..."🙂🙃😉😊😇🥰😍🤩!"] // Array(9) [ "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "!" ]

const hello = {hello: "😋😛😜🤪😝"}
const world = {world: "🙂🙃😉😊😇🥰😍🤩!"}

const helloWorld = {...hello,...world}
console.log(helloWorld) // Object { hello: "😋😛😜🤪😝", world: "🙂🙃😉😊😇🥰😍🤩!" }
```
### Sao chép mảng

Với spread operator `...`, chúng ta có thể sao chép mảng một cách rất ngắn gọn, bên cạnh đó việc thêm một hay nhiều phần tử vào mảng cũng rất dễ dàng :

```javascript
const fruits = ['🍏','🍊','🍌','🍉','🍍']
//sao chép mảng fruits sang mảng moreFruits
const moreFruits = [...fruits]; 
console.log(moreFruits) // Array(5) [ "🍏", "🍊", "🍌", "🍉", "🍍" ]
```

### Sử dụng mảng như danh sách các tham số
> “The Math object's set of functions are a perfect example of the spread operator as the only argument to a function.” — @davidwalshblog on his blog

Một trong những cách dễ hiểu nhất để hiểu cách sử dụng của spread operator đó là các phương thức của lớp `Math`, ở đây mình sẽ lấy hàm `Math.min()` và `Math.max()` làm ví dụ. Hàm này sẽ tìm số nhỏ nhất (hoặc lớn nhất) trong danh sách tham số mà chúng ta truyền vào. Số lượng tham số là tùy ý, hàm này chỉ nhận danh sách các tham số chứ không nhận tham số là mảng. Lúc này thì chúng ta có thể sử dụng spread operator:

```javascript
const numbers = [37, -17, 7, 0]
console.log(Math.min(numbers)) // output là NaN do hàm này không nhận array là tham số

//Sử dụng spread operator
console.log(Math.min(...numbers)) // output: -17 
console.log(Math.max(...numbers)) // 37
```

Không chỉ các hàm của lớp `Math`, mà tất cả những hàm nào mà nhận một số lượng tùy ý các tham số thì chúng ta đều có thể sử dụng được spread operator. Mình lấy thêm một vài ví dụ nhé :

```javascript
const fruitStand = ['🍏','🍊','🍌']
const sellFruit = (f1, f2, f3) => { console.log(`Fruits for sale: ${f1}, ${f2}, ${f3}`) }
sellFruit(...fruitStand) // Fruits for sale: 🍏, 🍊, 🍌
fruitStand.pop()
fruitStand.pop()
fruitStand.push('🍉')
fruitStand.push('🍍')
sellFruit(...fruitStand) // Fruits for sale: 🍏, 🍉, 🍍
fruitStand.pop()
fruitStand.pop()
sellFruit(...fruitStand,'🍋') // Fruits for sale: 🍏, 🍋, undefined
```

### Thêm phần tử vào mảng 

Như đã đề cập ở trên đây, spread operator còn có thể thêm một hay nhiều phần tử vào mảng, giúp cho đoạn code của chúng ta đơn giản và tự nhiên hơn rất nhiều so với cách viết code truyền thống như trước đây :
```javascript
const fewFruit = ['🍏','🍊','🍌']
const fewMoreFruit = ['🍉', '🍍', ...fewFruit] //thêm các phần tử của mảng fewFruit vào mảng fewMoreFruit
console.log(fewMoreFruit) //  Array(5) [ "🍉", "🍍", "🍏", "🍊", "🍌" ]
```

### Thao tác với state trong React

Khi làm việc với React, đặc biệt là React Hook, việc thêm một phần tử vào React state sẽ được thực hiện dễ dàng hơn rất nhiều, nếu chúng ta sử dụng `...`. Sau đây là một ví dụ :

```javascript
import React, { useState } from "react"
import ReactDOM from "react-dom"

import "./styles.css"

function App() {
  // Khai báo React Hook
  const [searches, setSearches] = useState([])
  const [query, setQuery] = useState("")

  const handleClick = () => {
     
    // Thêm một phần tử vào trong state searches của React Hook
    setSearches(searches => [...searches, query])
  }
```

### Kết hợp 2 hay nhiều object với nhau 

Spread operator ngoài có thể thao tác với mảng thì còn có thể thao tác với các object. Chúng ta có thể sử dụng spread operator để kết hợp các thuộc tính, các phương thức của 2 hay nhiều object lại thành một object mới. Sau đây là ví dụ :

```javascript
const objectOne = {hello: "🤪"}
const objectTwo = {world: "🐻"}

// Kết hợp objectOne, objectTwo lại trong objectThree và thêm thuộc tính laugh
const objectThree = {...objectOne, ...objectTwo, laugh: "😂"}
console.log(objectThree) // Object { hello: "🤪", world: "🐻", laugh: "😂" }

// Tương tự chúng ta có objectFour, với laugh là một hàm
const objectFour = {...objectOne, ...objectTwo, laugh: () => {console.log("😂".repeat(5))}}
objectFour.laugh() // 😂😂😂😂😂
```

## Một số lưu ý khi sử dụng spread operator

Có một điều khá thú vị làm nên sự hữu dụng của spread operator, đó là chúng sẽ tạo ra một tham chiếu mới, sau đó sao chép giá trị của tham chiếu cũ vào tham chiếu mới này. Khi đó, mọi thao tác làm thay đổi tham chiếu cũ sẽ không ảnh hưởng đến mảng được sao chép, điều mà sẽ xảy ra nếu chúng ta sao chép mảng sử dụng phương thức gán  `=`, 

```javascript
const array = ['😉','😊','😇']
const copyWithEquals = array // Thay đổi mảng array đồng nghĩa cũng sẽ thay đổi mảng copyWithEquals
const copyWithSpread = [...array] // Thay đổi mảng array sẽ không ảnh hưởng đến mảng copyWithSpread

array[0] = '😡' //thay đổi phần tử đầu tiên của mảng array

console.log(...array) // 😡 😊 😇
console.log(...copyWithEquals) // 😡 😊 😇
console.log(...copyWithSpread) // 😉 😊 😇
```

Như các bạn đã thấy, do đặc tính của spread operator, việc sao chép một mảng đã trở nên thuận tiện, dễ kiểm soát và ít xảy ra lỗi hơn rất nhiều.

## Kết luận

Kể từ khi ra đời từ phiên bản ES6 (ES2015), spread operator `...` đã được cộng đồng lập trình viên Javascript rất yêu thích vì tính hữu dụng và ngắn gọn của nó khi thao tác với mảng và object. Bản thân mình cũng thường xuyên sử dụng nó khi làm việc với React Hooks, nhất là khi thêm một phần tử vào mảng React state.

Việc biết thêm những cú pháp mới sẽ giúp chúng ta tiết kiệm thời gian khi code, đồng thời giúp code của chúng ta trở nên dễ đọc hơn rất nhiều. Và mình hi vọng bài chia sẻ này của mình sẽ giúp ích cho các bạn trong "sự nghiệp" code đầy gian nan và vất vả của bản thân nhé :sweat_smile::sweat_smile:

Tài liệu tham khảo:
https://www.geeksforgeeks.org/javascript-rest-operator/
https://medium.com/coding-at-dawn/how-to-use-the-spread-operator-in-javascript-b9e4a8b06fab