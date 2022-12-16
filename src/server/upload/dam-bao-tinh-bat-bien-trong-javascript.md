Khi làm việc với javascript, hẳn mọi người đã nghe đến tính bất biến của dữ liệu (immutability). Đặc tính này, nói một cách đơn giản, là khả năng giá trị của dữ liệu không bị thay đổi sau khi đã được khai báo. Tính bất biến giúp cho chương trình trở nên dễ dự đoán, ít xảy ra lỗi và trong một số trường hợp còn tăng hiệu suất của ứng dụng.

Tuy vậy, nếu mới làm quen với JavaScript, có thể bạn sẽ bỡ ngỡ không biết làm thế nào cho “chuẩn nhất”. Bài viết dưới đây giới thiệu một số kỹ thuật giúp bạn hướng đến immutability một cách dễ dàng hơn. Chúng ta sẽ nói về hàm thuần khiết, các thao tác xử lý dữ liệu trên mảng và object. Cuối cùng, bạn có thể áp dụng ngay những “tuyệt chiêu” vừa học để xây dựng một demo nhỏ bằng React.

### **Luôn dùng const khi khai báo dữ liệu**
Lời khuyên đầu tiên và cũng là căn bản nhất, luôn dùng const khi khai báo. Chắc bạn cũng đã biết, let và const được giới thiệu từ phiên bản ES6, cho phép khai báo biến có tầm vực theo khối và không thực hiện hoisting. Điểm khác biệt giữa let và const là bạn có thể thay đổi giá trị của biến khai báo với let, trong khi không thể với const.
```
let foo = 1
foo = 2 // Không thành vấn đề

const bar = 1
bar = 2 // Error: Assignment to constant variable.
```
Do đó, trong hầu hết các trường hợp bạn nên khai báo bằng const để tránh xảy ra lỗi khi giá trị của khai báo bị thay đổi bất ngờ. Cũng cần lưu ý là khi khai báo objects với const, mặc dù bạn không thể gán giá trị mới cho object nhưng giá trị của các thuộc tính vẫn có thể bị thay đổi.
```
const obj = { name: 'foo' }
obj = { name: 'bar' } // Error: Assignment to constant variable.
 
// Nhưng bạn có thể...
obj.name = 'bar'
console.log(obj) // { name: 'bar' }
```
### **Thao tác trên object**

Như vậy để thay đổi giá trị của object mà vẫn đảm bảo tính chất bất biến, chúng ta cần sử dụng Object.assign(target, ...sources). Hàm này có tác dụng sao chép thuộc tính của các đối tượng sources vào target. Ví dụ như:
```
const a = { name: 'foo' }
const b = Object.assign({}, a, { name: 'bar', age: 1 }, { id: 9 })
console.log(b) // { name: 'bar', age: 1, id: 9 }
```
Cần lưu ý để đảm bảo tính bất biến thì tham số target nên luôn là {}, vì khi đó các giá trị của sources sẽ được sao chép vào đối tượng mới. Một cách dùng sai là:
```
const a = { name: 'foo' }
const b = Object.assign(a, { name: 'bar', age: 1 }, { id: 9 })
console.log(b) // { name: 'bar', age: 1, id: 9 }
console.log(a) // Giá trị của a cũng bị thay đổi thành { name: 'bar', age: 1, id: 9 }
console.log(a === b) // true
```
Ngoài Object.assign(), bạn cũng có thể dùng cú pháp spread cho object. Ví dụ:
```
const a = { name: 'foo' }
const b = { ...a, name: 'bar', age: 1, id: 9 }
console.log(b) // { name: 'bar', age: 1, id: 9 }
console.log(a === b) // false
```
Lưu ý là cú pháp này hiện vẫn đang được đề xuất và chưa được hỗ trợ trên hầu hết các trình duyệt. Nếu muốn xài thì bạn phải dùng Babel hay Bublé để chuyển đổi nhé.

### **Một số thao tác thường gặp khác trên object**
Lấy tên các thuộc tính của một object
```
const obj = { name: 'bar', age: 1, id: 9 }
Object.keys(obj) // ['name', 'age', 'id']
```
Lấy giá trị của các thuộc tính của một object
```
const obj = { name: 'bar', age: 1, id: 9 }
Object.values(obj) // ['bar', 1, 9]
```
Lấy cặp [thuộc tính, giá trị] của một object
```
const obj = { name: 'bar', age: 1, id: 9 }
Object.entries(obj) // [ ['name', 'bar'], ['age', 1], ['id', 9] ]
```
Xóa một thuộc tính ra khỏi object
```
const a = { name: 'bar', age: 1, id: 9 }
 
// Xóa thuộc tính age
const b = Object.entries(a).reduce((acc, [key, value]) => {
  return key === 'age' ? acc : { ...acc, [key]: value }
}, {})
 
console.log(b) // { name: 'bar', id: 9 }
```
### **Thao tác trên mảng**

Bên cạnh object, mảng là cấu trúc dữ liệu rất thường gặp khi làm việc trong JavaScript. Để thay đổi dữ liệu của một mảng mà vẫn đảm bảo tính bất biến, bạn có thể sử dụng cú pháp spread, được giới thiệu từ ES5. Với một số yêu cầu khác, chúng ta có thể áp dụng các hàm có sẵn của lớp Array, như map(), filter(), reduce(). Một đặc điểm của các hàm này là chúng luôn trả về mảng/giá trị mới chứ không thay đổi mảng ban đầu.

**Áp dụng cú pháp spread**

Bạn có thể dùng spread để nhân bản một mảng.
```
const a = [1, 2, 3, 4, 5]
const b = a
console.log(a === b) // true
 
const c = [...a]
console.log(a === c) // false
```
Thêm một phần tử vào mảng
```
const a = [1, 2, 3]
 
// Không nên: a.push(4)
const b = [...a, 4] // [1, 2, 3, 4]
 
// Không nên: a.unshift(0)
const c = [0, ...a] // [0, 1, 2, 3]
```
Nối hai mảng với nhau
```
const a = [0, 1]
const b = [2, 3]
 
// Hoặc a.concat(b)
const c = [...a, ...b]
```
**Áp dụng hàm có sẵn để:**
Xóa một phần tử ra khỏi mảng các đối tượng
```
const a = [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' }]
 
const b = a.filter(obj => obj.id !== 2)
console.log(b) // [ { id: 1, name: 'Foo' }, { id: 3, name: 'Baz' } ]
```
Xóa một phần tử ở đầu mảng, cuối mảng hay ở bất cứ vị trí nào
```
const a = [0, 1, 2, 3, 4]
 
// Xóa phần tử ở đầu mảng
// Không nên: a.shift()
const b = a.filter((_, index) => index !== 0) // [1, 2, 3, 4] 
 
// Xóa phần tử ở cuối mảng
// Không nên: a.pop()
const c = a.filter((_, index, arr) => index != arr.length - 1) // [0, 1, 2, 3]
 
// Xóa phần tử ở vị trí bất kỳ
// Không nên: a.splice(3, 1)
const d = a.filter((_, index) => index !== 3) // [0, 1, 2, 4]
```
Thay đổi dữ liệu của mảng
```
const a = [1, 2, 3]
const b = a.map(x => x * 2) // [2, 4, 6] 
 
const c = [ { id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' } ]
const d = c.map(obj => Object.assign(obj, { name: obj.name.toUppercase() }))
console.log(d) // [ { id: 1, name: 'FOO' }, { id: 2, name: 'BAR' }, { id: 3, name: 'BAZ' } ]
```
Sắp xếp mảng: tránh dùng phương thức .sort để sắp xếp mảng, vì phương thức này thay đổi thứ tự của các phần tử trong mảng được sắp xếp. Thay vào đó:
```
const a = [ { id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' } ]
const b = [...a].sort((x, y) => y.id - x.id)
console.log(b) // [ { id: 3, name: 'Baz' }, { id: 2, name: 'Bar' }, { id: 1, name: 'Foo' } ]
```
Cũng tương tự khi bạn muốn đảo ngược (reverse) mảng.
```
const a = [0, 1, 2, 3, 4]
const b = [...a].reverse() // [4, 3, 2, 1, 0]
```
### **Kết luận**
Những tuyệt chiêu được đề cập trong bài viết này có thể áp dụng trong tất cả ứng dụng JavaScript. Mỗi khi bạn có ý định viết let, hãy suy nghĩ cách nào đó để chuyển thành const (và trong đa số trường hợp đều có thể làm được). Đồng thời khi làm việc với mảng hay object, luôn để ý xem thao tác này có thay đổi bản thân của đối tượng bị tác động hay không.

Ngoài các kỹ thuật ở trên, bạn cũng có thể sử dụng các thư viện được thiết kế riêng cho mục đích giữ tính bất biến, ví dụ như immutable-js, updeep, baobab, seamless-immutable hay mori. Điểm bất lợi khi sử dụng các thư viện này, có lẽ là kích thước của chúng.