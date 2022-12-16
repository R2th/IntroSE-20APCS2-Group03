Khi tiếp cận với ngôn ngữ javascript chắc chúng ta cũng đã từng nghe đến ES6, ES7 ... Vậy ES6, ES7 là gì và tính năng, cú pháp sử dụng nó như nào? 
# 1. ES6, ES7 là gì?
 ES6, ES7 là hai trong số những phiên bản của chuẩn ECMAScript. Rõ ràng hơn thì ECMAScript là tiêu chuẩn còn Javascript là ngôn ngữ lập trình.
![](https://images.viblo.asia/19d05a9e-d6f6-487a-83ba-b7576405e1c4.png)
ES6 được ra đời vào năm 2015 nên nó có thêm cái tên là ES2015. Tương tự như vậy ES7 hay còn gọi là ES2016.

# 2. Các tính năng, cú pháp hữu dụng của ES6
* Variables
* Arrow Functions 
* Destructuring
* Template literals
* Loops
* Array methods
* Classes
* ...



## 2.1 Variables
ES6 giới thiệu let và const như hai cách khai báo biến mới
* **const** không thể gán giá trị mới cho biến sau khi khai báo.
* **let** có thể gán giá trị mới cho biến sau khi khai báo.

![](https://images.viblo.asia/07d8d72a-c558-4ee6-a7c1-396352a33fbf.PNG)

*Lưu ý: Lời khuyên: Dùng const cho tất cả khai báo biến vì sẽ hạn chế trường hợp “vô tình” thay đổi giá trị của biến. Chỉ dùng let trong trường hợp bất khả kháng, và tránh xa var.*

## 2.2 Arrow Functions
Arrow Functions (Hàm mũi tên) – Một dạng khai báo hàm rút gọn trong javascript trong JavaScript.

Bình thường chúng ta khai báo hàm dạng: 

```javascript
function dude() { 
  console.log('hey dude') 
}
```

Nhưng đối với ES6 chúng ta có thể khai báo hàm như sau

```javascript
const dude = () => { 
  console.log('hey dude') 
}
```
Đối với hàm có tham số:
```javascript
const dude = (name, age) => { console.log(name + ' is ' + age) }
```
 Đối với những hàm có một tham số thì ta có thể bỏ dấu ngoặc đơn đi:


```javascript
const dude = name => { console.log('hey ' + name) }
```

Với hàm mũi tên trong ES6, giá trị của this chính là this trong tầm vực gần nhất với nó (lexical this)..

```javascript
function App() {
  this.count = 0

  setInterval(() => console.log(this.count++), 1000)
}
```

Nếu có dùng đến this thì hàm mũi tên rất hữu dụng. Trường hợp không dùng thì…cũng hữu dụng luôn vì mã nguồn gọn gàng dễ đọc hơn. Với những trường hợp bạn muốn bao đóng giá trị của this chỉ gói gọn trong hàm của nó, dùng function.

**Implicit returns**

```javascript
const implicit = () => true
```

tương ứng với hàm

```javascript
function implicit() {
  return true
}
```

## 2.3 Destructuring
 Destructuring -   giúp chúng ta  tách biến từ thuộc tính của đối tượng hay phần tử trong các đối tượng có thể duyệt với for, như mảng hoặc chuỗi.
 
ví dụ như:

```javascript
person = { first: 'Amber', last: 'Wilkie' }
const { first, last } = person 
```

```javascript
food = ['hotdog', 'soda']
const [eat, drink] = food
```

```javascript
const person = { 
  name: 'Amber', 
  favorites: { 
    food: 'French fries', 
    place: 'Ghent' 
  } 
}
const { food, place } = person.favorites // tách biến từ thuộc tính của đối tượng
```

**Renaming destructured variables**

```javascript
const { food: favoriteFood, place: favoritePlace } = person.favorites
```
bây giờ chúng ta có thể sử dụng biến favoriteFood == 'French fries'.

**Default values with reassignment**

Giống như với các định nghĩa hàm, chúng ta có thể đặt các giá trị mặc định cho các biến phân rã
```javascript
const game = { time: '15:30', place: 'East field', manager: 'Roy' }
const { time, place, manager, hotdogs = 0 } = game
```
ở trên, các biến đã được gán lại các giá trị và  hotdogs == 0.

**Easily swap variables**

Đổi chỗ các biến mà ko cần dùng các biến tạm thời 
```javascript
person1 = 'Jeff'
person2 = 'Susan'
[person1, person2] = [person2, person1]
```
khi này `person2 == 'Jeff'` và `person1 == 'Susan'`

**Automatically destructure information returned from a function**
```javascript
function twoOperations(num) { return [num*2, num/2] }
const [timesTwo, divideTwo] = twoOperations(5)
```
Điều này đặc biệt hữu ích khi chúng ta muốn lấy một đối tượng từ API.

**Destructure as you pass an object into a function**

```javascript
const fullName = ({first, last}) => `${first} ${last}`
fullName({first: 'Amber', last: 'Wilkie'})
```
Khi chúng ta truyền đối tượng vào hàm, nó sẽ tự động phân rã thành các biến **first** và **last** . 
chúng ta cũng có thể dùng:

```javascript
const fullName = ({first, last = 'Anonymous'}) => first + ' ' + last
fullName({first: 'Amber'})
```

kết quả trả về sẽ là: `'Amber Anonymous'.`

**The spread operator**
```javascript
const jewelry = ['ring', 'necklace']
const electronics = ['tv', 'ipad']
const valuables = [...jewelry, ...electronics]
// valuables == ['ring', 'necklace', 'tv', 'ipad']
```
Chúng ta không cần biết mỗi mảng có bao nhiêu phần tử và cũng ko cần dùng vòng lặp và cũng không cần  `.push()`.

## 2.4 Template literals
Chuỗi bản mẫu (template strings) là chuỗi chân phương (string literals) nhưng cho phép đính kèm biểu thức. Nó cũng cho phép khai báo chuỗi trên nhiều dòng. Để sử dụng, bạn dùng ký tự backtick ` (dấu huyền).

Nếu không dùng ES6 thì

```javascript
function myDetails(name, age, city) { 
  console.log(name + ' is ' + age + ' and lives in ' + city) // khá khó nhìn và cũng khó code
}
```
Còn đối với ES6 thì 

```javascript
function myDetails(name, age, city) { 
  console.log(`${name} is ${age} and lives in ${city}`)
}
```

so sánh hai đoạn code trên chúng ta có thể thấy khi dùng Template literals của ES6 thì đoạn code của chúng ta sẽ đẹp và sạch hơn.

*Lưu ý: Dùng Template literals khi chúng ta cần gắn biểu thức hay chuỗi có nội dung ở nhiều dòng. Còn lại thì vẫn dùng chuỗi bình thường với ' hay "*

## 2.5 Loops

**for / in** Lặp một mẳng tuần tự
```javascript
const cities = ['Gbg', 'Stockholm', 'Oslo']
for (const city in cities) { 
  console.log(city)
}
```
**for / of** có cấu trúc tương tự như **for / in**   nhưng for-in sẽ đọc các key của array và for-of sẽ đọc các value của array đó. Chúng ta có thể dùng continue, break, trong for-of tương tự với for.
```javascript
const cities = ['Gbg', 'Stockholm', 'Oslo']
for (const city of cities) { 
  console.log(city)
}
```
Chúng ta có thể dùng continue, break, trong for-of tương tự với for.
![](https://images.viblo.asia/ae9ca90f-0684-44f6-8806-320ac955eef6.png)

Nếu chúng ta cần truy cập vào chỉ mục thì sẽ sử dụng cú pháp dưới đây
```javascript
for (var [index, city] of cities.entries()) { 
  console.log(city, index) 
}
```

**for / of**  có thể hoạt động trên bất kỳ vòng lặp nào, không chỉ là mảng mà còn`  node lists`, `arguments`, ... .

## 2.6  Array methods
ES6 đã cung cấp cho chúng ta một số phương thức rất tiện dụng khi làm việc với array (mảng). Trong bài viết này chúng ta cùng tìm hiểu một số các phương thức sau.

**Array.from()**: là phương thức cho phép chúng ta lấy một vài object và tạo một mảng mới từ đó. 
```javascript
const listItems = document.querySelectorAll('li')
Array.from(listItems)

// 

Array.from(listItems, listItem.value => value*2)
```
**Array.of()**: là phương thức  cho phép chúng ta tạo các mảng từ các giá trị mà bạn chỉ định như là các arguments.

```javascript
Array.of('Chocolate', listItems, 135)
 => ["Chocolate", NodeList(91), 135]
```

**array.find()**  là một phương thức sẽ chỉ tìm phần tử đầu tiên thỏa mãn điều kiện thực hiện callback function
```javascript
const array = [1, 2, 3]
array.find( num => num % 2 == 0 )
```

**.findIndex()** chúng ta có thể dùng phương thức này để lấy ra chỉ mục. Trong trường hợp ko có phần tử nào của mảng thỏa mãn điều kiện thì **.findIndex()**  sẽ trả về giá trị là -1
## 2.7 Classes
ES6 mang đến cú pháp mới giúp tạo lớp trực tiếp và dễ dàng hơn.


```javascript
class Circle extends Shape {
//Constructor
  constructor(address) {
      console.log(address)
  }
 
//Methods
  getArea () {
    return Math.PI * 2 * this.radius
  }
 
//Calling superclass methods
  expand (n) {
    return super.expand(n) * Math.PI
  }
 
//Static methods
  static buildingMaterials() {
        return [ 'wood', 'brick', 'plaster', 'stone']
    }
}
```

Với ES6, nó cũng đã cung cấp cho chúng ta sử dụng từ khóa extends để kế thừa từ đối tượng khác.
```javascript
class Apartment extends House {
    constructor(tenants) {
        super()
        this.tenants = tenants
    }
}
```
*super() - viết với cú pháp như này thì là gọi lại constructor của lớp cha.*

 ES6 cũng hỗ trợ chúng ta thiết lập các setter và getter cho các thuộc tính.
 

```javascript
class House {
    constructor(address) {
        this.address = address
    }
    set (windows, number) {
      return this[windows*2] = number;
    }
    get (windows) {
      return this[windows/2]
    }
}
```
 Ở bài viết này đã chỉ ra một số các tính năng, cú pháp hữu ích của ES6. Với ES6 và các phiên bản cao hơn đã giúp cho việc lập trình với ngôn ngữ javascript đơn giản, sạch đẹp hơn. 
#  Tài liệu tham khảo
[Everything I learned from ES6 for Everyone](https://medium.com/craft-academy/everything-i-learned-from-es6-for-everyone-ff93ebc64b86)

[ES2015+ cheatsheet](https://devhints.io/es6)