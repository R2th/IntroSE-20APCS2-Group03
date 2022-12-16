Như ở bài trước mình cũng đã viết một bài về cách debug lỗi trong JavaScript với [Debugger](https://viblo.asia/p/learn-how-to-debug-javascript-with-chrome-devtools-924lJLy6KPM) thì trong bài hôm nay mình sẽ giới thiệu một số Tricks khi debug bằng **console.log()** trong JavaScript. Cách debug lỗi JavaScript đơn giản là xuất kết quả thông qua phương thức `console.log()`. Có thể nó không phải là cách làm tối ưu nhất nhưng tại sao chúng ta không thử khám phá chúng?

![](https://images.viblo.asia/053820f1-11d2-4f81-aefd-cc8a0fcc3e0b.png)

Trường hợp sử dụng cơ bản nhất cho `console.log()` là để hiển thị đầu ra của code. Lấy code sau:

```js
function sayHello(name) {
  console.log(name)
}

sayHello('Indrek')
```

Kết quả là nó sẽ ghi lại tên được truyền vào hàm sayHello()
![](https://images.viblo.asia/c0b7ffa8-b82f-41d2-8017-8449aa5ab32d.png)

Vậy điều gì sẽ xảy ra nếu chúng ta muốn biết hàm sayHello() được gọi bao nhiêu lần? Có một cách dễ dàng cho điều đó và nó được gọi là `console.count()`.

## Console.count()

-----

Khi dùng tới `Console.count()` thì đầu ra sẽ là số lần nó được gọi với **label** của nó.

```bash
console.cout('Đếm lần');

// Đầu ra:
Đếm lần: 1
Đếm lần: 2
Đếm lần: ...
```

Nếu không có **label** truyền vào, thì đầu ra nó sẽ mặc định lấy `default` làm label, xem ví dụ sau:

```js
function sayHello(name) {
  console.count()
  console.log(name)
}

sayHello("Indrek")
sayHello("William")
sayHello("Kelly") 
```
Kết quả:
![](https://images.viblo.asia/fa2b5f81-9684-4666-bb5c-4ffe5b384091.png)

Điều này cho chúng ta đếm số lần chúng ta gọi hàm, nhưng nếu chúng ta muốn đếm số lần chúng ta gọi hàm có cùng `name` thì sao? Cách để làm điều đó chỉ đơn giản là truyền `name` vào `console.count()`.

```js
function sayHello(name) {
  console.count(name)
}
sayHello("Indrek")
sayHello("William")
sayHello("Kelly")
sayHello("Indrek")
```
![](https://images.viblo.asia/e7ca2b56-58d8-4e0d-b4b6-64ca468a8411.png)

## Console.warn()

-----

Phương pháp sau đây đưa ra một thông báo cảnh báo đến console. Nó hữu ích khi làm việc với các công cụ dành cho nhà phát triển hoặc API, `console.warn()` là lý tưởng để cho người dùng biết điều gì đó có thể không chính xác, chẳng hạn như bỏ qua một đối số hoặc cho nhà phát triển biết phiên bản API/package không dùng nữa.

```js
function sayHello(name) {
  if(!name) {
    console.warn("No name given")
  }
}

sayHello()
```
Đoạn code trên kiểm tra xem biến name có được truyền vào hàm hay không. Nếu không có nó sẽ hiển thị cho người dùng một thông báo cảnh báo khi không có giá trị name nào được truyền vào.

![](https://images.viblo.asia/807e9e31-7888-4f43-b944-3a4cf3e7e763.png)

## Console.table()

-----

Nếu bạn đang làm việc với các mảng hoặc các đối tượng, `console.table()` sẽ hữu ích khi hiển thị dữ liệu cho bạn biết. Mỗi phần tử trong mảng sẽ là một hàng trong bảng. Lấy ví dụ sau đây trong đó bạn có một loạt các loại trái cây. Nếu bạn truyền mảng fruits cho phương thức `console.table`, chúng ta sẽ thấy một bảng được in ra ở console.

```js
const fruits = ["kiwi", "banana", "strawberry"]

console.table(fruits)
```

Và nếu nhìn ở console khi F12 lên thì bạn sẽ thấy một bảng mô tả mảng fruits.

![](https://images.viblo.asia/d1bb0573-2cf0-4b33-8700-9f3cafd3f694.png)

Bạn có thể tưởng tượng điều này trở nên hữu ích như thế nào khi bạn làm việc với các mảng lớn hơn với hàng trăm giá trị :hushed: Vậy đối với Objects thay vì một Array thì sao???

Ví dụ bạn có một Object sau bao gồm 2 key là `name` và `type` thì nó sẽ hiển thị như nào

```js
const pets = {
  name: "Simon",
  type: "cat"
};

console.table(pets);
```
Kết quả sẽ là
![](https://images.viblo.asia/18d2e4f2-45ca-44da-96e6-269f7158c5b2.png)

Ở màn console sẽ hiển thị các khóa và giá trị. Vậy điều gì xảy ra nếu bạn có thêm một Object nữa và xem cách hiển thị của nó?

```js
const pets = {
  name: "Simon",
  type: "cat"
};

const person = {
  firstName: "Indrek",
  lastName: "Lasn"
}

console.table(pets, person);
```
Đúng như mong đợi, hai đối tượng riêng biệt sẽ được hiển thị trong hai bảng khác nhau.

![](https://images.viblo.asia/0de5bbc2-ec5e-414d-89fc-f19dd152aeec.png)

Nếu bạn muốn ghép chúng trong một bảng duy nhất, hãy cho các Objects vào bên trong một mảng khi console.table chúng ra.

```js
console.table([pets, person]);
```

Kết quả là sẽ nhóm các đối tượng vào một bảng duy nhất

![](https://images.viblo.asia/15bab924-dea9-4dfb-98c8-3efb9214e323.png)

## Console.group()

-----


Khi làm việc với các tập hợp hoặc dữ liệu được liên kết, hãy sử dụng các nhóm lồng nhau để giúp tổ chức đầu ra của bạn bằng cách liên kết trực quan các thông báo liên quan. Để tạo một khối lồng nhau mới, hãy gọi `console.group()`.

```js
console.log("This is the first level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the first level");
```

Đoạn code trên sẽ hiển thị các câu lệnh console group lồng nhau - hữu ích khi làm việc với dữ liệu dựa trên mối quan hệ.

![](https://images.viblo.asia/d9aec60b-4a09-415e-8486-620295e197f4.png)

## Tóm tắt

-----

Trên đây là một số Console Tricks mà mình tìm hiểu được, hi vọng nó sẽ giúp ích cho bạn trong việc debug khi làm việc với JavaScripts :+1:

Tài liệu tham khảo:

https://developer.mozilla.org/en-US/docs/Web/API/Console/log
https://ppolyzos.com/2019/01/03/javascript-console-tips-and-tricks/
https://www.freecodecamp.org/news/commanding-the-javascript-console-4e1caaeab345/