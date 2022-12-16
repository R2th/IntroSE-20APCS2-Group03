Javascript vẫn tiếp tục thay đổi và có những điều mới mẻ, sau đây là 9 tricks giúp cho bạn code sạch và hiệu quả hơn.

## 1. async / await

Nếu bạn vẫn còn mắc kẹt trong địa ngục callback năm 2014. Chỉ cần không sử dụng callback, trừ khi thực sự cần thiết, ví dụ như yêu cầu của thư viện hoặc vì lý do hiệu suất. Promises cũng tốt, nhưng chúng trở nên khó sử dụng khi sử dụng codebase của bạn lớn hơn. Giải pháp tiếp theo của tôi hiện nay là async / await, giúp code dễ đọc và sạch hơn nhiều. Bạn có thể `await` mọi Promise trong JavaScript, trong trường hợp thư viện mà bạn đang sử dụng đang trả lại một Promise, chỉ cần `await` nó. Thực tế, async / await chỉ là cú pháp xoay quanh Promise. Để code của bạn hoạt động, bạn chỉ cần thêm từ khóa async trước một function. Dưới đây là một ví dụ nhanh:

```js
async function getData() {
    const result = await axios.get('https://dube.io/service/ping')
    const data = result.data
    
    console.log('data', data)
    
    return data
}

getData()
```

Lưu ý rằng việc `await` ở top level là không thể, bạn chỉ có thể gọi một async function.

> async / await đã được giới thiệu với ES2017, vì vậy hãy đảm bảo rằng code của bạn có thể transplile được .

## 2. async control flow

Thông thường, cần phải fetch nhiều datasets và thực hiện cái gì đó hoặc hoàn thành một task sau khi tất cả các async calls được hoàn thành và trả về giá trị.

### for…of

Giả sử chúng tôi có một vài Pokemon trên trang web và chúng ta phải lấy thông tin chi tiết về chúng. Chúng ta không muốn đợi tất cả các calls kết thúc, đặc biệt là khi chúng ta không biết có bao nhiêu calls, nhưng chúng ta muốn cập nhật bộ dữ liệu của mình ngay khi nhận được thứ gì đó. Chúng ta có thể sử dụng `for ... of` để lặp qua một mảng và thực thi async code bên trong block, việc thực thi sẽ bị tạm dừng cho đến khi mỗi call thành công. Điều quan trọng cần lưu ý là có thể có  performance bottlenecks (nghẽn cổ chai) nếu bạn làm điều gì đó như thế này trong code của mình, nhưng sẽ rất hữu ích trong một vài trường hợp. Đây là một ví dụ:

```js
import axios from 'axios'

let myData = [{id: 0}, {id: 1}, {id: 2}, {id: 3}]

async function fetchData(dataSet) {
    for(entry of dataSet) {
        const result = await axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
        const newData = result.data
        updateData(newData)
        
        console.log(myData)
    }
}

function updateData(newData) {
    myData = myData.map(el => {
        if(el.id === newData.id) return newData
        return el
    })
}
    
fetchData(myData)
```

> Những ví dụ này vẫn chạy được, vì vậy bạn có thể copy vào một code sandbox để chạy

### Promise.all

Điều gì xảy ra nếu bạn muốn fetch cùng lúc tất cả các Pokemon? Vì bạn có thể `await` tất cả các Promises, chỉ cần sử dụng `Promise.all`:

```js
import axios from 'axios' 

let myData = [{id: 0}, {id: 1}, {id: 2}, {id: 3}]

async function fetchData(dataSet) {
    const pokemonPromises = dataSet.map(entry => {
        return axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
    })

    const results = await Promise.all(pokemonPromises)
    
    results.forEach(result => {
        updateData(result.data)
    })
    
    console.log(myData) 
}

function updateData(newData) {
    myData = myData.map(el => {
        if(el.id === newData.id) return newData
        return el
    })
}
    
fetchData(myData)
```

> `for…of` và `Promise.all` đã được giới thiệu với ES6 +, vì vậy hãy đảm bảo rằng code của bạn được transpile.

## 3. Destructuring & default values

Hãy trở lại ví dụ trước, chúng ta đã làm như sau:

```js
const result = axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
const data = result.data
```

Chúng ta có thể sử dụng destructuring để chỉ lấy một hoặc một số giá trị từ một đối tượng hoặc một mảng.

```js
const { data } = await axios.get(...)
```

Bạn cũng có thể đổi tên biến:

```js
const { data: newData } = await axios.get(...)
```

Bạn có thể gán giá trị default, với cách làm như này đảm bảo bạn sẽ không bao giờ nhận được một giá trị `undefined` .

```js
const { id = 5 } = {}
console.log(id) // 5
```

Những thủ thuật này cũng có thể được sử dụng với các tham số của một hàm, ví dụ:

```js
function calculate({operands = [1, 2], type = 'addition'} = {}) {
    return operands.reduce((acc, val) => {
        switch(type) {
            case 'addition':
                return acc + val
            case 'subtraction':
                return acc - val
            case 'multiplication':
                return acc * val
            case 'division':
                return acc / val
        }
    }, ['addition', 'subtraction'].includes(type) ? 0 : 1)
}

console.log(calculate()) // 3
console.log(calculate({type: 'division'})) // 0.5
console.log(calculate({operands: [2, 3, 4], type: 'multiplication'})) // 24
```

Khi chúng ta không truyền bất kỳ giá trị nào làm tham số cho các hàm, các giá trị mặc định sẽ được sử dụng. Khi chúng ta truyền các giá trị, chỉ có giá trị mặc định các giá trị cho các đối số `undefined` được sử dụng.

> Destructuring và default values đã được giới thiệu với ES6, vì vậy hãy đảm bảo rằng code của bạn được transpile.

## 4. Truthy & falsy values

Khi sử dụng các giá trị mặc định, một số kiểm tra là không cần thiết . Tuy nhiên, thật tuyệt khi biết rằng bạn có thể làm việc với các giá trị truthy và falsy. Điều này sẽ cải thiện code của bạn và tiết kiệm cho bạn một vài hướng dẫn, làm cho nó trở nên dễ hiểu hơn. Tôi thường thấy mọi người làm như này:

```js
if(myBool === true) {
  console.log(...)
}
// OR
if(myString.length > 0) {
  console.log(...)
}
// OR
if(isNaN(myNumber)) {
  console.log(...)
}
```

Tất cả những thứ đó có thể được rút ngắn thành:

```js
if(myBool) {
  console.log(...)
}
// OR
if(myString) {
  console.log(...)
}
// OR
if(!myNumber) {
  console.log(...)
}
```

Để tận dụng lợi thế của  những câu lệnh này, bạn phải hiểu giá trị truthy và falsy là gì. Chúng ta overview một chút:

### Falsy

* chuỗi có độ dài bằng 0
* số `0`
* `false`
* `undefined`
* `null`
* `NaN`

### Truthy

* mảng rỗng
* object rỗng
* các giá trị khác

Lưu ý rằng khi kiểm tra giá trị truthy / falsy, không có so sánh rõ ràng, bằng với kiểm tra với hai dấu `===` và `!==`. Nói chung, sẽ có cùng một cách nhưng có một số tình huống nhất định bạn sẽ gặp bug. Đối với tôi, nó đã xảy ra chủ yếu với số `0`.

## 5. Logical and ternary operators

Một lần nữa, chúng ta  sử dụng  những cú pháp để rút ngắn code, giúp bạn tiết kiệm các dòng code quý giá. Thường thì chúng là những công cụ tốt  giúp giữ cho code của bạn sạch sẽ hơn, nhưng chúng cũng có thể tạo ra một số nhầm lẫn, đặc biệt là khi kết hợp với nhau.

### Logical operators

Các toán tử logic về cơ bản kết hợp hai biểu thức và sẽ trả về giá trị `true`, `false` hoặc matching value và được biểu thị bằng `&&`, có nghĩa là `and` cũng như `||` có nghĩa là `or`. Chúng ta hãy xem một chút:

```js
console.log(true && true) // true
console.log(false && true) // false
console.log(true && false) // false
console.log(false && false) // false
console.log(true || true) // true
console.log(true || false) // true
console.log(false || true) // true
console.log(false || false) // false
```

Chúng ta có thể kết hợp các toán tử logic với kiến thức của chúng ta từ điểm cuối cùng, giá trị truthy và falsy. Khi sử dụng toán tử logic, các quy tắc sau sẽ được áp dụng:

* `&&`: Giá trị giả falsy đầu tiên được trả về, nếu không giá trị truthy cuối cùng sẽ được trả về.
* `||`: Giá trị truthy đầu tiên được trả trả về, nếu không giá trị falsy cuối cùng sẽ được trả về.

```js
console.log(0 && {a: 1}) // 0
console.log(false && 'a') // false
console.log('2' && 5) // 5
console.log([] || false) // []
console.log(NaN || null) // null
console.log(true || 'a') // true
```


### Ternary operator

Toán tử ternary rất giống với toán tử logic, nhưng có ba phần:

1. Sự so sánh là falsy hoặc truthy
2. Giá trị trả về đầu tiên, trong trường hợp so sánh là truthy
3. Giá trị trả về thứ hai, trong trường hợp so sánh falsy

Đây là ví dụ:

```js
const lang = 'German'
console.log(lang === 'German' ? 'Hallo' : 'Hello') // Hallo
console.log(lang ? 'Ja' : 'Yes') // Ja
console.log(lang === 'French' ? 'Bon soir' : 'Good evening') // Good evening
```

## 6. Optional chaining

Bạn đã bao giờ gặp vấn đề khi truy cập một thuộc tính đối tượng lồng nhau, mà không biết liệu đối tượng hoặc một trong các thuộc tính phụ có tồn tại không? Bạn có thể sẽ kết thúc với một cái gì đó như thế này:

```js
let data
if(myObj && myObj.firstProp && myObj.firstProp.secondProp && myObj.firstProp.secondProp.actualData) data = myObj.firstProp.secondProp.actualData
```

Điều này thật tẻ nhạt và có một cách tốt hơn, ít nhất là một cách được đề xuất (tiếp tục đọc cách kích hoạt nó). Nó được gọi là optional chaining và hoạt động như sau:

```js
const data = myObj?.firstProp?.secondProp?.actualData
```

Tôi nghĩ rằng đó là một cách hùng hồn để kiểm tra các thuộc tính lồng nhau và làm cho cách code sạch hơn.

Hiện tại, optional chaining không phải là một phần của offical spec, nhưng ở giai đoạn 1 như là một tính năng thử nghiệm. Bạn phải thêm `@babel/plugin-proposal-optional-chaining` trong `babelrc`  để sử dụng nó.

## 7. Class properties & binding

Các hàm liên kết trong JavaScript là một nhiệm vụ phổ biến. Với việc giới thiệu các hàm mũi tên trong thông số ES6, giờ đây chúng ta có cách tự động liên kết các hàm với bối cảnh khai báo - rất hữu ích và thường được sử dụng giữa các nhà phát triển JavaScript. Khi các lớp được giới thiệu lần đầu tiên, bạn không còn thực sự có thể sử dụng các hàm mũi tên vì các phương thức lớp phải được khai báo theo một cách cụ thể. Chúng tôi cần liên kết các hàm ở nơi khác, ví dụ như trong hàm tạo (thực hành tốt nhất với React.js). Tôi luôn bị lỗi bởi quy trình làm việc của các phương thức lớp đầu tiên và sau đó ràng buộc chúng, nó chỉ có vẻ vô lý sau một thời gian. Với cú pháp thuộc tính lớp, chúng ta có thể sử dụng lại các hàm mũi tên và nhận được các lợi thế của tự động ràng buộc. Chức năng mũi tên bây giờ có thể được sử dụng trong lớp. Dưới đây là một ví dụ với _increasCount bị ràng buộc:

```js
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { count: 0 }
    }
    
    render() {
        return(
            <div>
                <h1>{this.state.count}</h1>  
                <button onClick={this._increaseCount}>Increase Count</button>
            </div>
        )
    }
    
    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }
}
```

> Hiện tại, optional chaining không phải là một phần của offical spec, nhưng ở giai đoạn 1 như là một tính năng thử nghiệm. Bạn phải thêm ` @babel/plugin-proposal-class-properties` trong `babelrc`  để sử dụng nó.

## 8. Sử dụng parcel

Như một frontend developer, bạn gần như chắc chắn đã gặp phải encountered bundling và transpiling code. Tiêu chuẩn thực tế cho điều này là webpack trong một thời gian dài. Lần đầu tiên tôi sử dụng webpack version 1, đó là một cực hình. Loay hoay với tất cả các tùy chọn cấu hình khác nhau, tôi đã dành vô số giờ cố gắng để có được bundle và chạy. Nếu tôi có thể làm như vậy, tôi sẽ chạm vào nó một lần nữa để không phá vỡ bất cứ điều gì. Một vài tháng trước, tôi đã thử `parcel`, nó trở nên hữu dụng ngay lập tức. Nó làm khá nhiều thứ, trong khi vẫn cho bạn khả năng thay đổi nó nếu cần thiết. Nó cũng hỗ trợ một hệ thống plugin, tương tự như webpack hoặc babel và cực kỳ nhanh. Nếu bạn không biết `parcel`, tôi chắn chắc bạn nên xem qua nó!. 

## 9.Tự viết nhiều code hơn

Đây là một chủ đề thú vị. Tôi đã có rất nhiều cuộc thảo luận khác nhau về nó. Ngay cả đối với CSS, rất nhiều người có xu hướng sử dụng một thư viện thành phần như bootstrap. Đối với JavaScript, tôi vẫn thấy mọi người sử dụng jQuery và các thư viện nhỏ để xác thực, thanh trượt, v.v. Mặc dù có thể có ý nghĩa khi sử dụng các thư viện, tôi thực sự khuyên bạn nên tự viết nhiều code hơn là cài đặt các gói npm một cách mù quáng. Khi có các thư viện lớn (hoặc thậm chí các frameworks), trong đó cả một nhóm đang xây dựng nó, chẳng hạn như Moment.js hoặc react-datepicker, sẽ không có ý nghĩa gì khi tự mình thử viết code. Tuy nhiên, bạn có thể viết hầu hết các code bạn đang sử dụng cho mình. Điều này sẽ cung cấp cho bạn ba lợi thế chính:

1. Bạn biết chính xác những gì đang diễn ra trong code của bạn
2. Tại một số điểm, bạn sẽ bắt đầu thực sự hiểu lập trình và cách mọi thứ hoạt động
3. Bạn ngăn không cho codebase của bạn bị cồng kềnh

Ban đầu, việc sử dụng  npm sẽ dễ dàng hơn. Sẽ mất nhiều thời gian hơn để tự thực hiện một số chức năng. Nhưng điều gì sẽ xảy ra nếu gói không thực sự hoạt động như mong đợi và bạn phải chuyển đổi nó sang gói khác, dành nhiều thời gian hơn để đọc cách thiết lập API của chúng. Khi tự mình thực hiện nó, bạn có thể điều chỉnh nó một trăm phần trăm cho usecase của bạn.

Tham khảo bài viết: [9 Tricks for Kickass JavaScript Developers in 2019](https://levelup.gitconnected.com/9-tricks-for-kickass-javascript-developers-in-2019-eb01dd3def2a)