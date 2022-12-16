Hi folks,

Hẳn các bạn là làm việc nhiều với việc copy dữ liệu trong JS trước đây, hoặc cho dù không biết thì có lẽ bạn cũng đã nghe về "tôn chỉ" trong functional programming đó là việc không nên sửa đổi những dữ liệu đang tồn tại . Và để làm được điều đó thì bạn phải biết cách sao chép dữ liệu một cách an toàn trong JS. Hôm nay chúng ta sẽ tìm hiểu về điều này. 🤟

## Thế nào là sao chép (copy)?
Một bản copy trông sẽ giống hệt bản gốc, nhưng thực ra không hoàn toàn như vậy. Khi bạn thay đổi dữ liệu của bản copy, bạn sẽ mong chờ rằng bản gốc sẽ giữ nguyên, chỉ có bản copy sẽ thay đổi.

Trong lập trình, ta lưu các giá trị trong các biến (variable). Tạo một bản sao chép nghĩa là bạn tạo một biến mới có cùng giá trị. Tuy nhiên có một vấn đề rất nguy hiểm khi copy mà ta phải xem xét kỹ: deep copy và shallow copy. Một bản deep copy nghĩa là toàn bộ giá trị được gán vào biến sẽ được sao chéo và tách rời hoàn toàn với bản gốc. Trong khi đó shallow copy có nghĩa là một số giá trị sẽ vẫn kết nối với bản gốc.

> Để hiểu hơn về vấn đề này thì ta phải đi vào cách mà JS lưu dữ liệu.
### Primitive data types
Primitive data types bao gồm:

* Number —  ví dụ: 1
* String — ví dụ: 'Hello'
* Boolean — ví dụ: true
* undefined
* null

Khi bạn tạo, những giá trị này sẽ gắn chặt với biến mà nó được gán cho. Và nó chỉ tồn tại duy nhât 1 lần, tức là bạn sẽ không phải quan tâm đến việc sao chép primitive data types trong JS. Khi bạn tạo một bản sao với các giá trị này thì bản sao đó là một bản sao "thực sự".

Hãy xem ví dụ sau đây

```js
const a = 5
let b = a // đây là một bản copy của a

b = 6

console.log(b) // 6
console.log(a) // 5
```

Khi thực hiện việc gán b = a, bạn tạo 1 bản copy. Giwof khi bạn gán giá trị mới cho b thì chỉ có giá trị của b là thay đổi, a vẫn giữ được tính bất biến.

### Composite data types — Objects and Arrays

Các giá trị này thực ra chỉ được lưu 1 lần khi khởi tạo, và việc gán nó cho biến thực chất chỉ lưu địa (pointer, reference) đến giá trị đó.

Khi ta copy b = a, thay đổi giá trị của b thì thực chất nó thay đổi cả giá trị của a luôn :|, vì a và b đang trỏ đến cùng một địa chỉ nơi chứa giá trị ban đầu. Ví dụ:
```js
const a = {
  en: 'Hello',
  de: 'Hallo',
  es: 'Hola',
  pt: 'Olà'
}
let b = a
b.pt = 'Oi'
console.log(b.pt) // Oi
console.log(a.pt) // Oi
```
Trong ví dụ này, ta đã thực hiện 1 shallow copy.

## Các cách để sao chép objects và arrays
### Objects
There are multiple ways to make copies of objects, especially with the new expanding and improving JavaScript specification.

#### Toán tử phân rã

```js
const a = {
  en: 'Bye',
  de: 'Tschüss'
}
let b = {...a}
b.de = 'Ciao'
console.log(b.de) // Ciao
console.log(a.de) // Tschüss
```

Cách này còn để gộp 2 object lại với nhau, ví dụ: ` const c = {...a, ...b}`.

#### Object.assign
```js
const a = {
  en: 'Bye',
  de: 'Tschüss'
}
let b = Object.assign({}, a)
b.de = 'Ciao'
console.log(b.de) // Ciao
console.log(a.de) // Tschüss
```

Lưu ý: Nested Objects
Như đã được lưu ý, có 1 vấn đề khi copy objects khi sử dụng 2 cách đề cập phía trên, đó là sử dụng với nested object (hoặc array). Khi bạn thực hiện cách  trên, các nested object bên trong object đó sẽ không được deep copy, bởi vì bản chất của chúng chỉ là pointers / references . Do đó nếu bạn thay đổi giá trị bên trong nested object thì cả 2 biến sẽ cùng thay đổi, kết quả là bạn chỉ thực hiện được shallow copy. 

```js
Example:// BAD EXAMPLE

const a = {
  foods: {
    dinner: 'Pasta'
  }
}
let b = {...a}
b.foods.dinner = 'Soup' // changes for both objects
console.log(b.foods.dinner) // Soup
console.log(a.foods.dinner) // Soup
```

Để tạo 1 deep copy của Nested Objects thì ta phải xem xét lại cách này. Có một cách để copy một cách hoàn chỉnh Nested Objects đó là ta phân rã cả các phần tử bên trong:

```js
const a = {
  foods: {
    dinner: 'Pasta'
  }
}
let b = {foods: {...a.foods}}
b.foods.dinner = 'Soup'
console.log(b.foods.dinner) // Soup
console.log(a.foods.dinner) // Pasta
```

#### Copy kiểu "không não"
Nếu bạn không quan tâm đến cấu trúc bên trong của object như nào? Có thể sẽ rất tẻ nhạt khi phải đi vào trong từng phần tử bên trong để sao chép 1 cách thủ công. Nên có một cách để sao chép mọi thứ mà không cần suy nghĩ.  Đó là `JSON.parse(JSON.stringify(originalObject))` -> Nhưng cách này chậm lém v_v

```js
const a = {
  foods: {
    dinner: 'Pasta'
  }
}
let b = JSON.parse(JSON.stringify(a))
b.foods.dinner = 'Soup'
console.log(b.foods.dinner) // Soup
console.log(a.foods.dinner) // Pasta
```

### Arrays
Sao chép Array khá tương đồng với việc sao chép Object. Rất nhiều logic phía sau tương tự vì Array bản chất cũng là Object.

#### Toán tử phân rã (Spread operator)
Tương tự như object, bạn có thể dùng spread operator để sao chép một Array.

```js
const a = [1,2,3]
let b = [...a]
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
```

#### Array functions — map, filter, reduce

Các phương thức này sẽ trả về một Array mới với với tất cả (hoặc một vài) giá trị của bản gốc. Trong quá trình chạy qua từng phần tử, bạn cũng có thể thay đổi giá trị trực tiếp:

```js
const a = [1,2,3]
let b = a.map(el => el)
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
```

Bạn có thể thay đổi giá trị element mong muốn khi sao chép:

```js
const a = [1,2,3]
const b = a.map((el, index) => index === 1 ? 4 : el)
console.log(b[1]) // 4
console.log(a[1]) // 2
```

#### Array.slice
Phương thức này thường dùng để trả về các phần tử được cắt ra với vị trí bắt đầu và kết thúc được xác định. Khi sử dụng array.slice() hoặc array.slice(0) bạn sẽ nhận được bản sao của Array ban đầu.

```js
const a = [1,2,3]
let b = a.slice(0)
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
```

Nested arrays
Tương tự như object, dùng các phương thức được đề cập phía trên để sao chép nested array sẽ trả về một array mới tuy nhiên các phần tử bên trong lại là những bản shallow copy.  Có một cách để hạn chế điều này đó là dùng hàm `JSON.parse(JSON.stringify(someArray))`. Tuy nhiên thì mình ko recomend cách này lắm vì nó khá chậm và tốn tài nguyên. ¯\\_(ツ)_/¯