> Một năm nữa đã qua và JavaScript đang thay đổi. Tuy nhiên, có một số mẹo có thể giúp bạn viết mã đẹp và hiệu quả hơn, thậm chí (hoặc có thể đặc biệt?) Vào năm 2019. Dưới đây là danh sách 9 mẹo hữu ích giúp bạn trở thành nhà phát triển tốt hơn.

## 1. Async / Await

`Promise` là tốt, nhưng nó vẫn làm code của bạn có đôi chút cồng kềnh. Có một giải pháp hiện nay là **async/await**,  nó  làm cho dễ đọc và cải thiện code sạch hơn rất nhiều. Trong thực tế, bạn có thể `await` mọi `Promise` trong JavaScript, trong trường hợp một thư viện bạn đang sử dụng được trả lại một `Promise`, chỉ cần chờ đợi nó. Để thực hiện công việc mã của bạn, bạn chỉ cần thêm từ khóa `async` ở phía trước của một *function*. Dưới đây là một ví dụ nhanh:

```javascript
async function getData() {
    const result = await axios.get('https://dube.io/service/ping')
    const data = result.data
    
    console.log('data', data)
    
    return data
}

getData()

```

Lưu ý rằng `await` ở cấp độ cao nhất là không thể, bạn chỉ có thể gọi một chức năng `async`.

> **Async/await** đã được giới thiệu với ES2017, vì vậy hãy đảm bảo code của bạn được biên dịch.

## 2. Async control flow

Thông thường, cần phải tìm lấy nhiều bộ dữ liệu và làm một cái gì đó cho từng bộ hoặc hoàn thành một nhiệm vụ sau khi tất cả các cuộc gọi không đồng bộ đã trả về một giá trị.

### for…of

Tôi có một vài pokemon, và tôi phải lấy thông tin chi tiết về chúng. Tôi không muốn chờ đợi cho tất cả các cuộc gọi đến cuối, đặc biệt là khi tôi không biết có bao nhiêu, nhưng tôi muốn cập nhật datasets của tôi ngay sau khi chúng tôi nhận được một cái gì đó trong return. Tôi có thể sử dụng **for... off** vòng lặp thông qua một mảng và thực thi mã `async` bên trong, thực hiện sẽ được tạm dừng cho đến khi mỗi cuộc gọi đã thành công. Điều quan trọng cần lưu ý là có thể có hiệu suất tắc nghẽn nếu bạn làm một cái gì đó như thế này trong mã của bạn, nhưng nó rất hữu ích để giữ trong công cụ của bạn. Dưới đây là một ví dụ:


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

### Promise.all

Điều gì xảy ra nếu bạn muốn tìm lấy song song tất cả các Pokemon? Vì bạn có thể `await` tất cả các Promise, chỉ cần sử dụng `Promise.all`:

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

>**for ... of** và **Promise.all** đã được giới thiệu với ES6 +, vì vậy hãy đảm bảo code của bạn được biên dịch.

## 3. Destructuring & default values

Hãy quay lại ví dụ trước của tôi, nơi tôi làm như sau:

```javascript
const result = axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
const data = result.data
```

Có một cách dễ dàng hơn để làm điều đó, chúng ta có thể sử dụng *destructuring* để chỉ lấy một hoặc một số giá trị từ một đối tượng hoặc một mảng. Tôi sẽ làm như thế này:


```javascript
const { data } = await axios.get(...)
```

Tôi đã lưu một dòng mã! Bạn cũng có thể đổi tên biến của mình:

```javascript
const { data: newData } = await axios.get(...)
```

Một mẹo hay khác là đưa ra các giá trị mặc định khi *destructuring*. Điều này đảm bảo rằng bạn sẽ không bao giờ kết thúc với `undefined` và bạn không phải kiểm tra các biến theo cách thủ công.

```javascript
const { id = 5 } = {}
console.log(id) // 5
```

Những thủ thuật này cũng có thể được sử dụng với các tham số function, ví dụ:

```javascript
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

Ví dụ ban đầu có vẻ hơi khó hiểu, nhưng hãy dành thời gian và làm quen nó. Khi chúng ta không chuyển bất kỳ giá trị nào làm đối số cho hàm của mình, các giá trị mặc định được sử dụng. Ngay khi  tôi bắt đầu chuyển các giá trị, chỉ các giá trị mặc định cho các đối số không tồn tại được sử dụng.

>**Destructuring** và **default values** đã được giới thiệu với ES6, vì vậy hãy đảm bảo code của bạn được biên dịch.

## 4. Truthy & falsy values

Khi sử dụng các giá trị mặc định, một số kiểm tra cho các giá trị hiện tại sẽ là giá trị trước đó. Tuy nhiên, thật tuyệt khi biết rằng bạn có thể làm việc với các giá trị **Truthy** và **Falsy**. Điều này sẽ cải thiện code của bạn và tiết kiệm cho bạn một thời gian tìm hiểu, làm cho nó trở nên rễ dàng hơn. Thường thì tôi thấy mọi người làm một cái gì đó như:

```javascript
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

Tất cả những cái đó có thể được rút ngắn thành:

```javascript
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

Để thực sự tận dụng những tuyên bố này, bạn phải hiểu giá trị **Truthy** và **Falsy** là gì. Đây là một kết luận nhỏ:

### Falsy

* strings with the length of 0
* the number 0
* false
* undefined
* null
* NaN

### Truthy

* empty arrays
* empty objects
* Everything else

Lưu ý rằng khi kiểm tra các giá trị truthy/falsy, không có so sánh rõ ràng, mà tương đương với việc kiểm tra với dấu hiệu bằng đôi bằng == và không phải ba ===. Nói chung, nó xử lý theo cùng một cách nhưng nó được dùng trong những tình huống nhất định. Đối với tôi, nó đã xảy ra chủ yếu là với số 0.

Thank for you reading!