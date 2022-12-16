Như thường lệ thì mời các bạn ủng hộ bài viết gốc của mình [tại đây](https://duthaho.com/blogs) nhé!

Chào mừng các bạn trở lại với series câu chuyện cổ tích về Javascript. Ở [bài trước](https://duthaho.com/blogs/js-cloning-array), chúng ta đã tìm hiểu qua Array. Bài viết hôm nay sẽ đề cập đến 1 chủ đề rất quan trọng, cũng là cốt lõi trong Javascript, nếu bạn muốn trở thành master trong `ngành` thì nhất định phải hiểu rõ. Nó là gì, hãy cùng mình tìm hiểu nhé!

---
Nhà bao việc, nói nhiều vcl. Vâng, chủ đề mình muốn giới thiệu hôm nay là **Prototype**. Bạn sẽ hiểu rõ Prototype trong Javascript như thế nào? dùng chúng ra sao? và quan trọng hơn hết là có thể chém gió về nó. Điều mà các bạn sẽ phải gặp 1 lần trong đời coder khi đi phỏng vấn :D.

> Bài viết này không đi sâu vào Object, mà chỉ dùng nó để giới thiệu về Prototye. Bạn muốn tìm hiểu về các cách tạo Object, có thể đọc thêm ở [đây](https://codeburst.io/various-ways-to-create-javascript-object-9563c6887a47)

#### Object Literal
Đây là cách đơn giản nhất và hay dùng nhất để  tạo 1 object. Chỉ với cặp ngoặc nhọn `{}` và dấu `.` là bạn đã tạo ra 1 object mình mong muốn rồi, easy game.

```js
let person = {}
person.name = 'duthaho'
person.mana = 69

person.eat = function (amount) {
  console.log(`${this.name} đi ăn.`)
  this.mana += amount
}

person.sleep = function (hours) {
  console.log(`${this.name} đi ngủ.`)
  this.mana += hours
}

person.play = function (hours) {
  console.log(`${this.name} đi chơi với gái.`)
  this.mana -= hours
}
```
Thế là bạn đã có 1 object với đầy đủ chức năng _ăn, ngủ, chơi_, bạn còn những thói sa đọa nào thì khai thêm chứ mình bấy nhiêu là đủ :). Trong khi bạn ngủ thì mình đi chơi với gái, abc...xyz các kiểu, thế là lòi ra thêm 1 person nữa cũng có những function tương tự, thế là lại tốn công viết thêm 1 object nữa để dùng cho nó. Cực vê lờ, có muốn đi chơi với gái mà cũng không được.

Để giải quyết vấn đề này, đơn giản, chúng ta sẽ đóng gói code logic của object person vào trong 1 function, sau đó muốn dùng thì gọi thôi. Hướng giải quyết này được gọi là `Functional Instantiation` pattern.

#### Functional Instantiation

```js
function Person (name, mana) {
  let person = {}
  person.name = name
  person.mana = mana

  person.eat = function (amount) {
    console.log(`${this.name} đang ăn.`)
    this.mana += amount
  }

  person.sleep = function (hours) {
    console.log(`${this.name} đi ngủ.`)
    this.mana += hours
  }

  person.play = function (hours) {
    console.log(`${this.name} đi chơi với gái.`)
    this.mana -= hours
  }

  return person
}

const ti = Person('Tí', 7)
const teo = Person('Tèo', 10)
```
Như bạn thấy, giờ mỗi lần đi chơi với gái mà ra sản phẩm mới thì cứ việc gọi function `Person` thôi. Quá đơn giản phải không nào, nhưng đừng vì _sướng con c* mà mù con mắt_, bạn có nhận ra được điểm hạn chế của pattern này không? Mỗi khi tạo mới 1 Person, chúng ta đều tạo mới 3 hàm `eat`, `sleep` và `play`, trong khi nó giống nhau cho tất cả các object (có thể bạn không chơi với gái nhưng chắc bạn sẽ chơi với trai chứ), điều này làm lãng phí bộ nhớ.

Để giải qyết vấn đề này, thay vì tạo mới hàm mỗi lần gọi Person, chúng ta có thể di chuyển các hàm dùng chung cho tất cả các Person sang 1 object, sau đó chia sẽ các hàm này cho Person.

#### Functional Instantiation với Shared Methods

```js
const personMethods = {
  eat(amount) {
    console.log(`${this.name} đang ăn.`)
    this.mana += amount
  },
  sleep(hours) {
    console.log(`${this.name} đi ngủ.`)
    this.mana += hours
  },
  play(hours) {
    console.log(`${this.name} đi chơi với gái.`)
    this.mana -= hours
  }
}

function Person (name, mana) {
  let person = {}
  person.name = name
  person.mana = mana
  person.eat = personMethods.eat
  person.sleep = personMethods.sleep
  person.play = personMethods.play

  return person
}

const ti = Person('Tí', 7)
const teo = Person('Tèo', 10)
```
Trong ví dụ trên, mỗi hàm `eat`, `sleep` và `play` của mỗi Person được tham chiếu đến cùng hàm trong shared object là `personMethods`, vì thế chúng ta đã giải quyết được vấn đền lãng phí bộ nhớ.

#### Object.create

Chúng ta cùng cải thiện ví dụ trên bằng cách dùng **Object.create**. Nguyên văn định nghĩa bằng tiếng Anh ở đây:

> **Object.create allows you to create an object which will delegate to another object on failed lookups**.

Nói 1 cách khác khó hiểu hơn bằng Vietsub thì Object.create cho phép chúng ta tạo ra 1 object từ 1 object trước đó. Khi nào bạn dùng 1 thuộc tính của object này, nếu nó không có thì nó sẽ được tiếp tục tìm kiếm trong object trước đó. Nói nhiều mà chắc mình cũng không hiểu bao nhiêu, đọc code để rõ hơn :D.

```js
const parent = {
  name: 'duthaho',
  age: 69,
  heritage: '1 tỷ' // gia tài
}

const child = Object.create(parent)
child.name = 'Tí'
child.age = 7

console.log(child.name) // Tí
console.log(child.age) // 7
console.log(child.heritage) // 1 tỷ
```
Trong ví dụ trên, object `child` được tạo ra từ `Object.create(parent)`, khi chúng ta truy cập 1 thuộc tính không có trong `child` thì Javascript sẽ tiếp tục tìm kiếm trong object `parent`. Điều này chứng tỏ vì sao thuộc tính `heritage` không có trong object `child` nhưng nó vẫn có giá trị là `1 tỷ`.

Chúng ta đã hiểu `Object.create` hoạt động như thế nào rồi đúng không? Hãy dùng nó để cải thiện ví dụ ở trên nào.

#### Functional Instantiation với Shared Methods và Object.create

```js
const personMethods = {
  eat(amount) {
    console.log(`${this.name} đang ăn.`)
    this.mana += amount
  },
  sleep(hours) {
    console.log(`${this.name} đi ngủ.`)
    this.mana += hours
  },
  play(hours) {
    console.log(`${this.name} đi chơi với gái.`)
    this.mana -= hours
  }
}

function Person (name, mana) {
  let person = Object.create(personMethods)
  person.name = name
  person.mana = mana

  return person
}

const ti = Person('Tí', 7)
const teo = Person('Tèo', 10)

ti.eat(10)
teo.play(5)
```
Bây giờ, khi chúng ta gọi `ti.eat`, Javascript sẽ tìm hàm `eat` trong object `ti`, kết quả là không tìm thấy, tiếp tục, Javascript sẽ tìm tiếp trong object `personMethods`, vì object `ti` được tạo ra bằng `Object.create(personMethods)`.

Đến đây thì mọi chuyện đã dần sáng tỏ, tất cả các Person chúng ta tạo ra đều dùng chung 3 hàm `eat`, `sleep` và `play` từ 1 object `personMethods`. Bạn thắc mắc là bài viết về Prototype nhưng đến bây giờ vẫn chưa thấy từ nào liên quan đến Prototype. Vâng, `prototype` cũng giống như cách chúng ta implement object `personMethods` ở trên, nếu bạn đã hiểu cách ví dụ trên hoạt động, thì việc hiểu `prototype` không có gì khó khăn.

Vậy, `prototype` trong Javascript thật sự là gì? Mỗi function trong Javascript đều có 1 thuộc tính tên là `prototype`, và nó tham chiếu đến 1 object. Thử chạy code sau để kiểm tra:
```js
function doThing () {}
console.log(doThing.prototype) // {}
```
Thay vì chúng ta tạo ra 1 object đễ lưu những hàm dùng chung như cách mình đã làm trong ví dụ trên với `personMethods`, thì bây giờ, mình sẽ đặt các hàm dùng chung này vào trong `prototype` của Person (vì prototype cũng là 1 object). Pattern này được gọi là `Prototypal Instantiation`.

#### Prototypal Instantiation

```js
function Person (name, mana) {
  let person = Object.create(Person.prototype)
  person.name = name
  person.mana = mana

  return person
}

Person.prototype.eat = function (amount) {
  console.log(`${this.name} đang ăn.`)
  this.mana += amount
}

Person.prototype.sleep = function (hours) {
  console.log(`${this.name} đi ngủ.`)
  this.mana += hours
}

Person.prototype.play = function (hours) {
  console.log(`${this.name} đi chơi với gái.`)
  this.mana -= hours
}

const ti = Person('Tí', 7)
const teo = Person('Tèo', 10)

ti.eat(10)
teo.play(5)
```

Ơ rê ka, thế là chúng ta đã trải qua màn dạo đầu để hiểu về **prototype trong Javascript**, prototype là 1 thuộc tính có trong mỗi Javascript function, và nó cho phép chúng ta chia sẽ các hàm cho tất cả các đối tượng được tạo ra từ function đó.

----------

Màn dạo đầu chắc phải dừng lại ở đây để chúng ta nghiền ngẫm thêm để tiếp tục đi sâu vào tìm hiểu **Prototype** trong tuần tới. Các bạn nhớ like và share để ủng hộ mình nhé. Hẹn gặp các bạn trong phần 2!