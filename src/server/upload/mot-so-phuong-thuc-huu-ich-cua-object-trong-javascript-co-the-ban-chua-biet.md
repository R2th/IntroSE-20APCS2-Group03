# Mở đầu
Nếu đã hoặc đang làm việc với JavaScript, có lẽ bạn đã biết đến lớp Object và sử dụng qua những phương thức như Object.keys(), Object.values() hay Object.entries(). Nhưng có thể bạn chưa biết nhưng phương thức khác của lớp mà nó cũng hữu ích không kém. Và trong bài viết này chúng ta hay cùng "chỉ mặt gọi tên" chúng và tìm hiểu cách sử dụng nhé.

# 1. Khái niệm Object trong JavaScript
Trong JavaScript, một Object (đối tượng) là một tập hợp các cặp key - value không có thứ tự. Mỗi cặp key - value được gọi là một thuộc tính.

* Key của một thuộc tính có thể là một chuỗi
* Value của một thuộc tính có thể là bất kỳ giá trị JavaScript hợp lệ nào, ví dụ: Một chuỗi, một số, một mảng và thậm chí là một hàm.

Khi một hàm là một thuộc tính của một object, nó không còn được gọi là hàm nữa mà thường được gọi là một phương thức (method)

JavaScript cung cấp cho bạn nhiều cách để tạo một object mới. Cách phổ biến nhất là sử dụng cú pháp theo nghĩa đen (sử dụng cú pháp { }) của object.

## 1.1 Tạo Object sử dụng cú pháp { }
Ví dụ sau tạo một object trống bằng cách sử dụng cú pháp theo nghĩa đen của object:
```js
const student = { };
```

Để tạo một object có thuộc tính, bạn sử dụng key: value trong dấu ngoặc nhọn { }.

Ví dụ: Đoạn code tạo một student object.
```js
const student = {
    name: "Ngọc Anh",
    age: 18
};
```

Hoặc sử dụng từ khóa new Object()

## 1.1 Tạo Object sử dụng cú pháp new Object()
Ví dụ sau tạo một object trống bằng cách sử dụng cú pháp new Object():
```js
let student = new Object();
```

Để thêm các thuộc tính ta dùng
```js
student.name = "Ngọc Anh";
student.age = 18

// Or

let student = new Object({
    name: "Ngọc Anh",
    age: 18
});
```

Bản thân Object là một hàm dựng (constructor) được dùng để tạo ra thể hiện (instance) của lớp kiểu dữ liệu tương ứng cho giá trị được truyền vào. Nếu value là null hay undefined, kết quả sẽ là một đối tượng rỗng.

# 2. Một số phương thức hữu ích của Object trong JavaScript
## 2.1 Object.create()
Cho phép bạn tạo một thể hiện của một lớp bằng cách dùng prototype mà không cần phải gọi đến hàm dựng (constructor)

Cú pháp:
```js
Object.create(prototype, [properties])
```

* prototype: Object prototype mới được tạo. Nó có thể là object hoặc null.
* properties: Các thuộc tính của object mới (tùy chọn).

### 2.1.1 prototype
Ví dụ: 

**Không có prototype**
```js
const user = Object.create()
console.log(user) // {}
```

**Có prototype**
```js
class User {
  constructor() {
    this.createdAt = new Date()
  }
}

const user = Object.create(User.prototype)
console.log(user.constructor === User) // true
console.log(user.createdAt) // undefined

// So sánh khi dùng từ khoá `new`
const user2 = new User()
console.log(user2.createdAt) // 2021-05-15T16:00:30.528Z
```

Một trong những ứng dụng phổ biến của Object.create() là tạo ra đối tượng không kế thừa từ bất cứ lớp nào, hay nói một cách khác, không có prototype. Vì mặc định trong JavaScript, khi bạn khai báo một object literal như thế này
```js
const obj = {
  foo: 1
}
console.log( obj.constructor === Object) // true
```
Bản thân của obj là một thể hiện của lớp Object và obj.constructor === Object. Bằng cách gọi Object.create(null) hoặc Object.create(undefined), chúng ta có thể tạo ra những đối tượng "không cha không mẹ, là tinh tuý của đất trời".
```js
const tonNgoKhong = Object.create(null)
console.log(tonNgoKhong.prototype) // undefined
```
> Nếu đã học qua Java/C#/Ruby thì chắc bạn đã nghe tới tất cả các lớp đều được kế thừa từ lớp Object.

### 2.1.2 properties
Tham số properties của Object.create() cho phép bạn khai báo những thuộc tính của thể hiện được tạo bằng cách truyền vào các property descriptors.

**Vậy property descriptor là gì?**

Property descriptor (mô tả thuộc tính) là một object JavaScript thông thường (Plain Old JavaScript Object - POJO), được sử dụng trong Object.create(), Object.defineProperty(), hoặc Object.defineProperties() để thay đổi các thuộc tính đã có của một đối tượng, hoặc tạo đối tượng mới.

Ví dụ
```js
const user = Object.create(User.prototype, {
  id: {
    // Sử dụng data descriptor
    writable: false,
    configurable: true,
    value: 1998,
  },
  name: {
    // Còn đây là accessor descriptor
    get() {
      return this.value
    },
    set(name) {
      this.value = name.toUpperCase()
    },
    configurable: true,
  },
})

user.name = 'Doan Phu'
console.log(user.id) // 1998
console.log(user.name) // DOAN PHU
```
Property descriptor được chia làm hai loại: accessor descriptors và data descriptors. Bạn chỉ có thể sử dụng **MỘT TRONG HAI** loại descriptor này cùng lúc mà thôi.
```js
  // Hai thiết lập này dùng chung cho tất cả property descriptors
  configurable: true,
  enumerable: true,

  // Chỉ dành riêng cho accessor descriptors
  get() { return this.value },
  set(newValue) { this.value = newValue },

  // Chỉ dành riêng cho data descriptors
  value: 1998,
  writable: true,
```

**Property descriptors**
* configurable: Nếu bằng true, property descriptor của thuộc tính này có thể được thay đổi, hoặc thuộc tính này có thể được xoá ra khỏi đối tượng. Mặc định: false.
* enumerable: Nếu bằng true, thuộc tính này có thể được truy xuất khi dùng for...in hoặc Object.keys(). Mặc định: false.

**Accessor descriptors** là một cặp getter/ setter gồm hai hàm:
* get: () -> any Hàm get() trả về giá trị của thuộc tính, hoặc undefined nếu không được khai báo.
* set: any -> () Hàm set(value) nhận vào một giá trị bất kì.

**Data descriptors** lại bao gồm hai thiết lập sau:
* value: Cái này quá rõ ràng rồi, không cần phải nói nhiều.
* writable: Nếu bằng true, thuộc tính này có thể được gán giá trị mới. Mặc định: false.

**Note:** Nếu bạn khai báo một mô tả thuộc tính mà có chứa lẫn lộn accessor và data descriptors, trình biên dịch sẽ quăng ra một TypeError.
```js
const user = Object.create(User.prototype, {
  name: {
    get() {
      return this.value
    },
    value: "Doan Phu"
  },
})
// TypeError: property descriptors must not specify a value or be writable when
// a getter or setter has been specified
```

## 2.2 Object.defineProperty()
Phương thức này cho phép chúng ta khai báo thuộc tính mới, hoặc thay đổi một thuộc tính đã có của một object bằng cách sử dụng property descriptors, như đã trình bày ở phần trước.

Phương thức này chỉ cho phép ta thay đổi một thuộc tính duy nhất.

Cú pháp:
```js
Object.defineProperty(obj, prop, descriptor)
```

Ví dụ:
```js
const user = { }

Object.defineProperty(user, 'age', {
  value: 23,
  enumerable: true,
})

// Khai báo một thuộc tính để chứa dữ liệu ẩn
Object.defineProperty(u, 'internalName', {
  writable: true, // Đừng quên mặc định `writable` có giá trị false
  enumerable: false, // Không hiển thị thuộc tính này
})

// `this` trong getter/ setter là biến `user`
Object.defineProperty(user, 'name', {
  enumerable: true,
  get() {
    return this.internalName
  },
  set(name) {
    this.internalName = name
  },
})

internalName.name = 'Doan Phu'
console.log(internalName) // { age: 23, name: 'Doan Phu', internalName: 'Doan Phu' }
```

**Ủa sao không gán đại như này luôn user.age = 23 mà phải viết như kiểu kia cho dài dòng, mệt thật sự?**

Nhưng khác nhau, bản chất nó là đây:
```js
user.age = 23
// tương đương với
Object.defineProperty(user, 'age', {
  value: 23,
  writable: true,
  configurable: true,
  enumerable: true,
})

// trong khi
Object.defineProperty(user, 'age', { value: 23 })
// lại là
Object.defineProperty(user, 'age', {
  value: 23,
  writable: false,
  configurable: false,
  enumerable: false,
})
```

## 2.3 Object.defineProperties()
Nó cũng là phương thức này cho phép chúng ta khai báo thuộc tính mới, hoặc thay đổi một thuộc tính đã có của một object bằng cách sử dụng property descriptors.

Cái này gần giống với giống như Object.defineProperty(), nhưng khác ở chỗ là lại cho phép bạn thay đổi nhiều thuộc tính cùng lúc.

Cú pháp:
```js
Object.defineProperties(obj, props)
```

Ví dụ:
```js
const user = { }
Object.defineProperties(user, {
  age: { value: 23 },
  name: { value: 'Doan Phu' },
})
```

## 2.4 Object.assign()
 Sẽ sao chép những thuộc tính có thể duyệt được (enumerable) của một hoặc nhiều đối tượng nguồn (sources) qua đối tượng đích (target).
 
Cú pháp:
```js
Object.assign(target, ...sources)
```

Ví dụ:
```js
const user = Object.create(null, {
  id: { value: 1, enumerable: true },
  name: { value: 'Doan Phu', enumerable: true },
  password: { value: 'password', enumerable: false },
})

const user1 = Object.assign(user, { age: 23 })
console.log(user1) // { id: 1, name: 'Doan Phu', age: 23 }
console.log(user1 === user) // true
```

Thông thường chúng ta sẽ dùng Object.assign() để sao chép một đối tượng, thế nên bạn hay thấy tham số đầu tiên của Object.assign() là một đối tượng rỗng.
```js
const user2 = Object.assign({}, user, { age: 23 })
console.log(user2 === user) // false
```

Nhưng giờ thì ai cũng xài object spread cho nhanh hết rồi.
```js
const user3 = { ...user, age: 23 }
console.log(user3) // { id: 1, name: 'Doan Phu', age: 23 }
```

## 2.5 Object.preventExtensions()
Phươn thức này làm một chuyện rất đơn giản: không cho phép bạn thêm thuộc tính mới vào đối tượng.

Để kiểm tra một đối tượng có thể được mở rộng hay không, bạn có thể dùng phương thức Object.isExtensible().

Cú pháp:
```js
Object.preventExtensions(obj)
```

Ví dụ:
```js
const obj = {}
Object.isExtensible(obj) // true
Object.preventExtensions(obj)
Object.isExtensible(obj) // false

Object.defineProperty(obj, 'foo', { value: 1 })
// TypeError: Cannot define property foo, objectis not extensib
```

## 2.6 Object.seal()
Phương thức này dùng để ngăn không cho bạn thêm thuộc tính mới vào đối tượng. Nhưng bạn vẫn có thể thay đổi giá trị của chúng.

Để kiểm tra một đối tượng có bị phong kín hay không, bạn dùng Object.isSealed().

Cú pháp:
```js
Object.seal(obj)
```

Ví dụ:
```js
const user = {
  age: 23
};

Object.seal(user);
user.age = 18;
console.log(user.age); // 18

delete user.age; // cannot delete when sealed
console.log(user.age); // 18
```

## 2.7 Object.freeze()
Phương thức "đông cứng" một đối tượng: không cho phép thêm vào thuộc tính mới, hay thay đổi hành vi của những thuộc tính đã có, hay xóa thuộc tính. Nói tóm lại, không làm được gì cả :D

Cú pháp:
```js
Object.freeze(obj)
```

Bạn có thể dùng Object.isFrozen(obj) để kiểm tra một object có bị đông cứng không. Tình hình là hiện tại không có phương thức nào để "rã đông" một đối tượng hết.

Ví dụ: 
```js
const user = Object.freeze({ username: 'doanphu', password: '12345678' })
Object.isFrozen(user) // true
delete user.username // Không có lỗi xảy ra, nhưng user.username vẫn tồn tại
console.log(user) // { username: 'doanphu', password: '12345678' }

Object.defineProperty(config, 'address', { value: 'Hà Nội' })
// TypeError: Cannot define property address, object is not extensible

Object.defineProperty(config, 'username', { value: 'doanphua4' })
// TypeError: Cannot redefine property: username
```

## 2.8 Object.keys() và Object.values()
Cặp đôi hoàn cảnh này thì quá quen thuộc rồi. Object.keys() trả về một mảng chứa tên các thuộc tính của một đối tượng, và Object.values() trả về một mảng chứa giá trị của các thuộc tính đó.

Cú pháp:
```js
 Object.keys(obj)
 Object.values(obj)
```

Ví dụ:
```js
const user = { id: 1, name: 'Doan Phu', age: 23 }
const keys = Object.keys(user) // [ 'id', 'name', 'age' ]
const values = Object.values(user) // [ 1, 'Doan Phu', 23 ]
```

**Note:** Đừng quên là những thuộc tính này phải có enumerable = true nhé.

## 2.9 Object.entries()
Phương thức này trả về một mảng các cặp (pair) thuộc tính có dạng [tên thuộc tính, giá trị].

Cú pháp:
```js
Object.entries(obj)
```

Ví dụ:
```js
const user = { id: 1, name: 'Doan Phu', age: 23 }
Object.entries(user)
// Kết quả:
[
  ['id', 1],
  ['name', 'Doan Phu'],
  ['age', 23],
]
```

Object.entries() rất hữu ích khi bạn cần truy xuất tên và giá trị của thuộc tính cùng lúc. Chẳng hạn như:
```js
const settings = {
  websiteUrl: 'https://ehkoo.com',
  facebookUrl: 'https://facebook.com/ehkoo.dev',
}

return (
  <SettingContainer>
    {Object.entries(settings).map(([key, value]) => (
      <TextInputField key={key} name={key} value={value} />
    ))}
  </SettingContainer>
)
```

**Lưu ý** thứ tự của các cặp thuộc tính được trả về không phụ thuộc vào thứ tự chúng được khai báo nhé. Bạn cũng có thể dùng Object.entries() để chuyển đổi một object thường thành Map, WeakMap hay bất cứ constructor nào nhận một mảng các cặp [key, value].
```js
const settingMap = new Map(Object.entries(settings))
```

## 2.10 Object.fromEntries()
Phương thức này giúp bạn chuyển đổi mảng, Map, hay bất cứ đối tượng nào sử dụng giao thức lặp (iterable protocol) thành object.

Cú pháp:
```js
Object.fromEntries(entries)
```

Ví dụ:
```js
const obj = Object.fromEntries(settingMap)
// {
  websiteUrl: 'https://ehkoo.com',
  facebookUrl: 'https://facebook.com/ehkoo.dev',
}
```

## 2.11 Object.is()
Phương thức giúp ta so sánh hai giá trị có bằng nhau không.

Cú pháp:
```js
Object.is(value1, value2)
```

**value1 được xem là bằng value2 nếu:**
* Cả hai cùng là undefined
* Cả hai cùng là null
* Cả hai cùng là true, hoặc cùng là false
* Cả hai cùng là chuỗi có độ dài bằng nhau với các ký tự được xếp theo cùng một thứ tự
* Cả hai cùng trỏ về một đối tượng
* Cả hai cùng là +0, -0, hoặc NaN
* Cả hai cùng là số khác 0, không phải NaN và có giá trị bằng nhau

Điểm khác nhau giữa phương thức này với == là == có thực hiện ép kiểu nếu value1 và value2 không cùng một kiểu giá trị, trong khi Object.is() không thực hiện việc chuyển đổi này. Object.is() cũng khác === vì === xem +0 === -0 và Number.NaN !== NaN.

Ví dụ:
```js
Object.is('foo', 'foo') // true
Object.is(window, window) // true

Object.is('foo', 'bar') // false
Object.is([], []) // false

const foo = { a: 1 }
const bar = { a: 1 }
Object.is(foo, foo) // true
Object.is(foo, bar) // false

Object.is(null, null) // true

// Trường hợp đặc biệt
Object.is(0, -0) // false
Object.is(-0, -0) // true
Object.is(NaN, 0 / 0) // true
```

## 2.12 Object.prototype
Khi một hàm được tạo trong Javascript thì nó sẽ thêm thuộc tính prototype vào hàm đó. Thuộc tính prototype là một object với mặc định có constructor.

Tất cả các object trong Javascript kế thừa các thuộc tính và phương thức từ prototype.

Xem ví dụ sau về protype object:
```js
function User(firstName, lastName) {
	this.firstName = firstName,
	this.lastName = lastName
};

User.prototype.fullName = function() {
    console.log(this.firstName + ' ' + this.lastName);
    return this.firstName + ' ' + this.lastName;
}

const user = new User('Doan', 'Phu');
user.fullName(); // Doan Phu
```

# Tổng kết
Có lẽ đọc xong bài viết này bạn chỉ cần ghi nhớ về các giá trị { writable, enumerable, configurable } của một thuộc tính trong đối tượng là đủ rồi. Bạn có thể không sử dụng Object.freeze() hay Object.seal() trong công việc hàng ngày, nhưng biết đến sự tồn tại của chúng có thể sẽ hữu ích trong một số trường hợp đấy.

Bài viết của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn trong quá trình học tập cũng như làm việc. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.

# Tham khảo
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object