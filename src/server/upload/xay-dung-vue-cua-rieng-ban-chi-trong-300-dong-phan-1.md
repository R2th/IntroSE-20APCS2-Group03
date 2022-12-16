Xin chào các bạn,

Nhân đợt dịch COVID-19 này, khá rảnh cho nên mình quyết định xây dựng thử lại Vue phiên bản minimal theo đúng với những suy nghĩ, hiểu biết của bản thân về Vue.

# Concept chính
Để hoàn thành được Vue minimal này, mình sẽ lần lượt đi qua các mục như sau:
1. Như thế nào là Reactivity System?
2. Giải pháp xây dựng Reactivity System để có thể mở rộng sau này?
3. Bước đầu xây dựng Vue của riêng mình.
4. VNode là gì?
5. Từ VNode đến DOM HTML.
6. Bước đầu hoàn thiện Vue của riêng mình.
7. Xây dựng component cho Vue của mình.

# 1. Như thế nào là Reactivity System?
Đối với các bạn đã sử dụng Vue, hoặc những frameworks tương tự thì cũng sẽ thấy được các frameworks này có một điểm chung đó là khi cập nhật state thì nội dung trên web cũng sẽ được cập nhật lại.

## Vấn đề
Mình có ví dụ như sau:

```javascript
let price = 12
let quantity = 2
let total = price * quantity

console.log(total) // 24

quantity = 4
console.log(total) // 24
```

Trong ví dụ trên, mình định nghĩa **total** được tính bằng tích của số lượng và giá. Tuy nhiên sau khi mình cập nhật số lượng thì **total** lại không được cập nhật. Đấy chính là cách mà JavaScript hoạt động.

## Giải quyết
Để giải quyết vấn đề xảy ra bên trên, mình sẽ lưu lại những hàm tính giá trị, để sau khi cập nhật giá trị một biến mình sẽ gọi để nó cập nhật lại các biến cũ.

```javascript
let price = 12
let quantity = 2
let total = price * quantity

let memo = []

const saveTarget = (target) => {
  memo.push(target)
  // save this target for run later
}

const reUpdate = () => {
  for (let i = 0, l = memo.length; i < l; ++i) {
    const target = memo[i]
    target()
  }
}

let target = () => {
  total = price * quantity
}

// save calculate function for later use
saveTarget(target)

// call to calculate for the first time
target()

console.log(total) // 24

quantity = 4

reUpdate()

console.log(total) // 48
```

Như trong ảnh bạn sẽ thấy, mình tạo ra một mảng **memo** dùng để lưu tất cả các hàm tính giá trị để sau này mình có thể gọi cập nhật lại. Đi kèm với **memo** mình có định nghĩa thêm 2 hàm **saveTarget** và **reUpdate** để lưu lại các hàm tính giá trị và gọi lại tất cả các hàm tính giá trị đó để cập nhật lại toàn bộ giá trị các biến.

Lần này khác với lần trước, mình định nghĩa việc tính **total** bằng một hàm **target**, sau đó mình tiến hành lưu lại **target**. Sau khi cập nhật lại số lượng, mình chỉ cần gọi **reUpdate** là việc tính toán lại **total** của mình đã được thực hiện.

# 2. Xây dựng Reactivity System như thế nào để có thể dễ tái sử dụng?
Tuy ở trên đã giải quyết được việt cập nhật lại giá trị nhưng chúng ta vẫn cần một cách hiệu quả hơn, cần một cái gì đó quản lý những target phụ thuộc trên biến đó để gọi lại mà thôi. Nếu như cách ở trên thì dù có cập nhật những biến không ảnh hưởng gì bên trên, nhưng khi chúng ta gọi **reUpdate** chúng vẫn đều tính lại các giá trị mà bản thân nó không bị thay đổi. 

Chúng ta cần một class quản lý các phụ thuộc (dependencies) vào một biến, và khi cập nhật biến nào thì chỉ gọi **update** lại các giá trị phụ thuộc trên biến đó mà thôi.

Ở bên dưới là cách mình cài đặt class quản lý các phụ thuộc.

```javascript
class Dep {
  constructor() {
    this.subs = []
  }

  depend() {
    if (Dep.target && !this.subs.includes(Dep.target)) {
      this.subs.push(Dep.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; ++i) {
      subs[i].call()
    }
  }
}

Dep.target = null
```

Lúc này đoạn code ban đầu sẽ thay đổi như sau:

```javascript
let price = 12
let quantity = 2
let total = 0

let quantityDep = new Dep()

Dep.target = () => {
  total = price * quantity
}

// save calculate function for later use
quantityDep.depend()

// call to calculate for the first time
Dep.target()

// reset dependency target for another use
Dep.target = null

console.log(total) // 24

quantity = 4

quantityDep.notify()

console.log(total) // 48
```

Sau khi thay đổi thì các bạn sẽ thấy nó vẫn hoạt động đúng theo ý của mình và trông code có thể tái sử dụng hơn đúng không? Nhưng có một thứ mà mình vẫn thấy khó chịu đó chính là cứ phải set và reset lại cái **target**. Mình sẽ tạo thêm một hàm là **useEffect** để làm việc đó.

```javascript
function useEffect(fn, deps) {
  Dep.target = fn
  fn()
  deps.forEach((dep) => dep.depend())
  Dep.target = null
}
```

Hàm **useEffect** này mình sẽ truyền vào một hàm **target** và các **dependencies** của **target**.  Lúc này code lại tiếp tục thay đổi như sau.

```javascript
let price = 12
let quantity = 2
let total = 0

let quantityDep = new Dep()
let priceDep = new Dep()

useEffect(() => {
  total = price * quantity
}, [quantityDep, priceDep])

console.log(total) // 24

quantity = 4

quantityDep.notify()

console.log(total) // 48

price = 10

priceDep.notify()

console.log(total) // 40
```

Như vậy khi dùng **useEffect** mình sẽ truyền vào một hàm **target** và các **Dep** của những biến mà nó phụ thuộc. Và có lẽ các bạn cũng đều thấy cách dùng này vẫn chưa tối ưu. Mình muốn nó "thông minh" hơn nữa. Đó là mình chỉ cần **useEffect** truyền vào hàm **target**, và các biến được sử dụng trong đó sẽ tự thêm **target** vào **Dep** của chính nó chứ không cần mình tạo **quantityDep** hay **priceDep** nữa.

Đây chính là lúc mình sử dụng [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty). **Object.defineProperty** cho phép mình định nghĩa thêm **getter** và **setter** cho mỗi **key** trong object.

Lúc này, để sử dụng **Object.defineProperty** mình sẽ đưa dữ liệu về một object. Và cách mình sử dụng Object.defineProperty như sau.

```javascript
function defineReactiveData(data) {
  // apply getter, setter for each key of the object
  Object.keys(data).forEach((key) => {
    // create new dep
    let dep = new Dep()
    let value = data[key]
    Object.defineProperty(data, key, {
      get: function reactiveGetter() {
        // if target get value of this key
        // add target to dependencies
        dep.depend()
        return value
      },
      set: function reactiveSetter(newValue) {
        value = newValue
        // when value has changed
        // call all subscribers for re-update state
        dep.notify()
      },
    })
  })
}
```

Lúc này sau khi mình đã định nghĩa **getter** và **setter** cho mỗi key trong **data**, thì lúc này mình có cũng thay đổi useEffect một chút như sau.

```javascript
function useEffect(fn) {
  Dep.target = fn
  fn()
  Dep.target = null
}
```

Lúc này bạn chỉ cần thực hiện cập nhật giá trị như bình thường, các giá trị phụ thuộc trên giá trị vừa cập nhật cũng sẽ tự cập nhật lại. Những đoạn code ban đầu sẽ trở nên gọn gàng như sau.

```javascript
let total = 0

let data = {
  price: 12,
  quantity: 2,
}

defineReactiveData(data)

useEffect(() => {
  total = data.price * data.quantity
})

console.log(total) // 24

data.quantity = 4

console.log(total) // 48

data.price = 10

console.log(total) // 40
```

# Lời kết
Vậy là chúng ta đã hoàn thành xong một Reactivity System. Nếu các bạn có tìm hiểu qua thì cũng sẽ thấy Vue 2 cũng sử dụng **Dep** và **Object.defineProperty** để làm Reactivity System.

Ở phần sau mình sẽ cùng các bạn chuẩn bị cho Vue của riêng mình nhé.

Cảm ơn các bạn đã đọc, mong là bài viết này sẽ giúp được các bạn phần nào tiếp cận với Reactivity System và bước đầu hiểu sâu hơn về các frameworks như Vue,...

[Nhấn vào đây để xem tiếp phần 2](https://viblo.asia/p/xay-dung-vue-cua-rieng-ban-chi-trong-300-dong-phan-2-GrLZD3XJKk0)