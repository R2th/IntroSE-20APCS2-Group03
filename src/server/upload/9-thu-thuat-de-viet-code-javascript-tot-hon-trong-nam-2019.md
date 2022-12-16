Bài viết được dịch từ [9 Tricks for Kickass JavaScript Developers in 2019](https://levelup.gitconnected.com/9-tricks-for-kickass-javascript-developers-in-2019-eb01dd3def2a) của tác giả  **Lukas Gisder-Dubé**


Javascipt đang ngày càng phát triển trở nên phổ biến và quen thuộc đối với các lập trình viên. Có một số mẹo nhỏ giúp bạn viết code hiệu quả và đẹp hơn. Dưới đây là 9 mẹo hữu ích sẽ giúp bạn viết code javascript tốt hơn trong năm 2019 này.
# 1.async / await
Trước đây khi chưa có  `async / await`, chắc hẳn ai cũng từng gặp vấn đề với bất đồng bộ. Promises rất tốt để giải quyết nó, nhưng nó sẽ làm code trở lên phức tạp hơn và đến một lúc nào đó, bạn sẽ gặp phải callback hell.  

Từ khi ECMA2015(ES6) ra đời chúng ta đã dễ dàng hơn trong việc xử lý bất đồng bộ, hầu như không cần phải gọi callback nữa, trừ khi có một số lý do đặc biệt về hiệu suất. 

Giải pháp là dùng `async / await` được giới  thiệu trong ES6, nó làm code trở nên đơn giản hơn. Thực tế `async / await` hoạt động dựa trên Promise. 
```javascript
async function getData() {
    const result = await axios.get('https://dube.io/service/ping')
    const data = result.data
    
    console.log('data', data)
    
    return data
}

getData()
```
# 2.Async control flow
Trong một số trường hợp, cần sử lý nhiều tác vụ bất đồng bộ, như gửi nhiều request , hay thậm trí gửi request trong vòng lặp. 

Dưới đây là 2 ví dụ về việc fetch data sử dụng nhiều request bất đồng bộ.
## for…of
Ví dụ dưới đây sẽ fetch lần lượt những pokemon, và requet tiếp theo sẽ chỉ được gửi khi reques trước đó đã kết thúc.
```javascript
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
> Bạn chỉ cần paste nó vào đâu đó như project nodejs, react, vue hay thậm trí là console trên trình duyệt để chạy nó.
>
## Promise.all
Mục đích vẫn như trên, nhưng giờ sẽ gửi một loạt request và đợi khi nào tất cả các request hoàn thành thì sẽ sử lý kết quả
```javascript
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

> `async / await` rất hữu ích nhưng hãy sử dụng nó một cách hợp lý, tránh lạm dụng vì có thể làm giảm hiệu năng của ứng dụng nếu code bị block một cách không cần thiết.
> 

# 3.Destructuring & default values
Ở ví dụ trên có đoạn code lấy `data`  như sau
```javascript
const result = axios.get(...)
const data = result.data
```

Có một cách ngắn gọn hơn
```javascript
const { data } = await axios.get(...)
```
Thậm trí bạn có thể đổi tên biến 
```javascript
const { data: newData } = await axios.get(...)
```
Đây được gọi là cú pháp `destructuring`

Một mẹo hữu ích nữa là `set default values` cho `destructuring`
```javascript
const { id = 5 } = {}
console.log(id) // 5
```


# 4.Truthy & Falsy
Khi làm việc với các đâu điều kiện`if else`
Ví dụ 
```javascript
let arr = someArray;
if(arr.length > 0) {
// do something
}
```
Ví dụ trên có thể được rút ngắn thành
```javascript
if(arr.length) {
// do something
}
```
2 ví dụ trên không hoàn toàn giống nhau nhưng trong trường hợp này, ví dụ rút ngắn có thể thay thế được cho ví dụ trên. Để sử dụng đúng được như ví dụ rút ngắn thì cần phải hiểu như nào là `truthy` và `falsy` trong javascript.
## Falsy
* Strings với độ dài bằng `0`  bao gồm` ("", '', ``)`
* Số `0`
* `false`
* `undefined`
* `null`
* `NaN`

## Truthy
*  Một mảng rỗng `[]`
*  Một object  rỗng `{}`
*  Và mọi giá trị khác

> Chú ý: Khi kiểm tra `true/false` mà không so sách rõ ràng, thì nó sẽ được kiểm tra với toán tử `==` thay vì `===`. Điều này có thể gây ra bug, chủ yếu đối với số `0`
> 

# 5.Toán tử logic và toán tử 3 ngôi
Toán tử logic và 3 ngôi làm code ngắn gọn hơn. Và phần lớn cũng làm code dễ đọc hơn.

## Toán tử logic
Toán tử logic về dơ bản là việc kết hai biểu thức và trả về `true` hay `false`

Các quy tắc cơ bản
```javascript
console.log(true && true) // true
console.log(false && true) // false
console.log(true && false) // false
console.log(false && false) // false
console.log(true || true) // true
console.log(true || false) // true
console.log(false || true) // true
console.log(false || false) // false
```

Khi sử dụng toán tử logic, bạn cần biết quy tắc sau
* `&&` : sẽ `return` giá trị `falsly` đầu tiên nó gặp  hoặc `return` giá trị  cuối cùng từ trái qua phải.
* `||`: `return` giá trị  `truthy` đầu tiên nó gặp hoặc `return` giá trị cuối cùng từ trái qua phải
```javascript
console.log(0 && {a: 1}) // 0
console.log(false && 'a') // false
console.log('2' && 5) // 5
console.log(true && 'a' && false && true) // false
console.log(true && 'a' && true && 1) // 1
console.log([] || false) // []
console.log(NaN || null) // null
console.log(true || 'a') // true

```
## Toán tử 3 ngôi
Toán tử 3 ngôi rất giống với toán tử logic nhưng nó có 3 phần
1. Phần so sánh, sẽ có kết quả `true` hoặc `false`
2. Giá trị `return` thứ nhất, trong trường hợp phần so sánh là `true`
3. Giá trị `return` thứ hai, trong trường hợp phần so sánh là `false`

```javascript
const lang = 'German'
console.log(lang === 'German' ? 'Hallo' : 'Hello') // Hallo
console.log(lang ? 'Ja' : 'Yes') // Ja
console.log(lang === 'French' ? 'Bon soir' : 'Good evening') // Good eveing
```
# 6.Đối tượng lồng nhau
Bạn đã từng gặp phải vấn đề khi truy cập thuộc tính của đối tượng lồng nhau, mà không biết những đối tượng hoặc thuộc tính trước nó có tồn tại không. Và bạn sẽ làm thế này
```javascript
let data
if(myObj && myObj.firstProp && myObj.firstProp.secondProp && myObj.firstProp.secondProp.actualData) data = myObj.firstProp.secondProp.actualData
```
có một cách ngắn gọn hơn được gọi là  `optional chaining`,  mà bạn có thể sử dụng như sau
```javascript
const data = myObj?.firstProp?.secondProp?.actualData
```
Đây là cách kiểm tra thuộc tính của các đối tượng lồng nhau rất hay, nó làm code ngắn gọn hơn.

> Hiện tại cú pháp này chưa được hỗ trợ chính thức, nên muốn dùng bạn phải config `babel`, thêm plugin sau `@babel/plugin-proposal-optional-chaining` vào file `babelrc`.
> 
# 7.Cú pháp `class properties`
Binding functions trong javascript là một công việc thường xuyên. Đặc biệt là trong `React`, khi ta phải thực hiện việc `bind function` cho đúng với ngữ cảnh trong `constructor `
```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = { count: 0 }
        this._increaseCount = this._increaseCount.bind(this)
    }
    
    render() {
        return(
            <div>
                <h1>{this.state.count}</h1>  
                <button onClick={this._increaseCount}>Increase Count</button>
            </div>
        )
    }
    
    _increaseCount(){
        this.setState({ count: this.state.count + 1 })
    }
}
```
Như đã biết thì arrow function sẽ tự động binding context với đúng ngữ cảnh được khai báo
Với cú pháp `class properties`, chúng ta có thể xử dụng arrow function trong class để tận dụng chức năng tự động binding của nó. Ví dụ trên sẽ được thay thế với cú pháp `class properties` như sau
```javascript
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
Function  `_increaseCount`đã được tự động binding mà không cần phải binding trong `contrustor` như bình thường nữa.

# 8. Sử dụng trình đóng gói [parcel](https://parceljs.org/)
Có lẽ nhiều người từng gặp phải vấn đề với thư viện `webpack` để đóng gói các tài nguyên của bạn. Webpack mạnh mẽ nhưng việc config nó thì không phải dễ dàng. Và giờ có thêm một thư viện giúp bạn đóng gói các tài nguyên nhanh hơn mà không phải mất nhiều công sức để config. Đó chính là **parcle**, nó rất đáng để  tìm hiểu và sử dụng trong năm 2019 này

# 9. Tự tìm hiểu những cái cơ bản
Bạn đã bao giờ tự hỏi những chức năng như slider, validate, .... hoạt động như nào chưa? 

Tại sao bạn không tự tìm hiểu và viết ra những chức năng đó để khỏi phải import một thư viện đồ sộ mà chỉ dùng một tính năng nhỏ, hoặc trí ít cũng nên biết thư viện đó hoạt động như thế nào . Việc tự code hoặc tìm hiểu hoạt động những chức năng nhỏ sẽ cho bạn 3 lơi thế sau
1.  Bạn sẽ biết thực sự code của mình chạy như thế nào
2.  Bạn sẽ  hiểu hơn về lập trình, và những thứ mình đang dùng, đây sẽ là một bước tiến mới trong con đường lập trình của bạn.
3.  Làm project của bạn nhẹ hơn

Nhưng không phải chức năng nhỏ nào cũng đáng để tự code, vì khi bạn tự code có thể gây ra bug, những thư viện dù nhỏ nhưng nó cũng được xây dựng bởi nhiều người và qua nhiều lần kiểm tra.

Bạn hãy cân nhắc những chức năng có thể kiểm soát và lựa chọn việc tự code hay dùng thư viện một cách hợp lý nhé.