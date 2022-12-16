Javascipt một ngôn ngữ đã quá quen thuộc với chúng ta. Làm đi làm lại làm tới làm lui :smile:. Mà chúng ta vẫn có thể chưa hiểu hết được nó. Nhất là dân frontend developer, họ có thể quần với javascript cả ngày trời. Hôm nay mình xin giới thiệu 6 mẹo nhỏ giúp cho chúng ta phần nào hiểu hơn và nâng cao tay nghề javascript của chính mình.

# 1. Closures
Vậy closures là gì? Chúng ta nên hiểu nó như thế nào?

...

...

...


...Đừng suy nghĩ nữa hãy đi thử 1 ví dụ mà nó sẽ tự làm cho chúng ta phải hiểu?:upside_down_face:

Hãy cùng xem qua đoạn code bên dưới:
```javascript
function addPerson(name) {
  let baseName = `Mr/Miss: ${name}`
  
  return function(message) {
    console.log(`${message} ${baseName}`)
  }
}

const sendMessage = addPerson('John')

sendMessage('nice to meet you') // Mr/Miss: John nice to meet you
```
Như tình huống trên là chúng ta muốn khởi tạo 1 biến `name` và sau đó gửi 1 message nào đó cùng biến `name` đó mà ko cần phải truyền vào mỗi lần call như dưới.
```javascript
function sendMessage(name, message) {
    console.log(`${message} ${name}`)
}
```
Như vậy chúng ta thấy rằng `closure` sẽ giúp chúng ta giải quyết những tình huống muốn sử dụng lại một đoạn code nào đó chẳng hạn.

Vậy `closure` cuối cùng có thể làm gì? Như ví dụ bên trên nó cho phép một function có thể truy cập vào scope cha của nó. Có lẽ đã có rất nhiều developer giống mình, kiểu là trong khoảng thời gian đầu học về `javascript` thì cũng có nghe qua khái niệm này ở đâu đó (khi đi phỏng vấn quá nhiều chẳng hạn :joy: và học đòi thử code thì cảm thấy bị bối rối toàn tập. Nhưng sau một thời gian sử dụng thì mình thấy tác dụng của nó rất lớn, tao cơ hội cho chúng ta có nhiều phương án hơn kh xử lý một vấn đề nào đó.

# 2. Higher-order functions
Cũng là một từ khóa khá quen thuộc.

Trong ngôn ngữ lập trình chức năng (Functional Programming) thì function là first-class member nên nó có thể được sử dụng như những value khác, giúp chúng ta đa dạng hướng xử lý hơn.

Một higher-order function là một function nhận một function khác làm tham số đầu vào và trả về một function.

Có thể chúng ta đã sử dụng nó rất nhiều trong việc coding hằng ngày mà không hề hay biết :innocent:.

Hãy thử 1 ví dụ đơn giản:
```javascript
function addGreeting(message) {
  return `${message} nice to meet you`
}

function addHiMessage(sayGreeting) {
  let sayHiMessage = 'Hello'
  return addGreeting(sayHiMessage)
}

console.log(addHiMessage(addGreeting)) // Hello nice to meet you
```
Ở ví dụ trên chúng ta đặt tình huống là chúng ta muốn nói 1 lời chào "Hello" chẳng hạn nhưng thấy quá cộc và muốn thêm 1 lời chào hỏi nữa. Thì thay vì hay đổi message trong function `addHiMesage` thì chúng ta truyền vào 1 function có chức năng là thêm 1 một lời chào nữa. Rất mạch lạc và dễ hiểu đúng không?

Ngoài ra những function prototype như là `call` và `bind` cũng là những higher-order function. Nó giúp chúng ta chia nhỏ chức năng ra một cách hợp lý, dễ maintain và dễ hiểu nhất.

# 3. Invoking functions
`Invoking function` hay còn gọi là gọi function :smile:.

Bình thường chúng ta hay gọi function bằng cách sử dụng dấu `()` để gọi. Thì thay vào đó hãy thử sử dụng `call` và `apply` để gọi môt function. Việc sử dụng `call` và `apply` sẽ giúp chúng ta có thể chủ động xác định context sử dụng trong một function (giá trị của `this`) và gọi ngay sau đó.

Hãy thử 1 ví dụ :relaxed:
```javascript
const Person1 = {
    name: 'John',
    age: '20',
}

const Person2 = {
    name: 'Mary',
    age: '22',
}

function showNameAndAge() {
	return `My name is ${this.name}. I am ${this.age} years old.`
}

console.log(showNameAndAge.call(Person1)) // My name is John. I am 20 years old.
console.log(showNameAndAge.call(Person2)) // My name is Mary. I am 22 years old.
```

Chúng ta hãy chú ý và sử dụng trong các trường hợp khác nhau và như mong muốn :blush:!

Ở trên mình đã trình bày 3 mẹo giúp các bạn có thể hiểu rõ và nâng cao phần nào skill của mình trong javascript. Mong rằng sau bài viết này chúng ta sẽ tìm hiểu nhiều hơn nữa và áp dụng vào công việc của mình để tạo thuận lợi hơn trong công việc.

Bái viết đến đây là hết rồi! Cảm ơn các bạn đã theo dõi. Hẹn gặp lại các bạn trong các bài viết sau! :relaxed:
![](https://images.viblo.asia/949b1eb5-22b2-4a23-b7ff-44a67be29458.jpg)