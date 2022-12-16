![](https://images.viblo.asia/2e8f6ea4-7988-4c0e-8572-4b9ca6b8ec30.jpeg)

Cách đơn giản nhất để debug JavaScript là hiển thị kết quả hay giá trị lên console của trình duyệt bằng phương pháp `console.log()`. Cách này dễ dùng, đơn giản, tuy nhiên đôi khi không phải là cách tối ưu nhất để làm việc. Hôm nay chúng ta sẽ làm quen với một vài cách "nghịch" console khá mới mẻ để phục vụ cho nhiều mục đích debug khác nhau.

![](https://images.viblo.asia/ec2be735-b34d-42ac-bb0f-06f8feab166b.png)

Object `console` cung cấp việc sử dụng console debug của trình duyệt. Tuy nhiên cách nó hoạt động đôi khi có thể khác nhau giữa các trình duyệt khác nhau, tuy nhiên trên thực tế có một bộ tính năng được cung cấp khi sử dụng `console`, và các câu lệnh này có thể hoạt động với tất cả các thư việc và framework do chúng được viết trong core của JavaScript rồi.

## `console.log()`

Cách sử dụng cơ bản nhất của `console.log()` là hiển thị output của code. Xem đoạn sau nhé:

```javascript
function sayHello(name) {
  console.log(name);
}

sayHello('Sun*');
```

Trong log sẽ hiển thị giá trị của `name` đã được truyền vào hàm `sayHello()`.

![](https://images.viblo.asia/d4cdd9b7-76af-4476-b4b8-f840eb2c7da2.png)

Nếu như chúng ta muốn đếm số lần chúng ta gọi đến hàm `sayHello()` thì sao? Đơn giản thôi: `console.count()`

## `console.count()`

`count()` nhận 1 tham số là `label`,  và sẽ output ra số lần nó được gọi đến với `label`. Nếu không có tham số nào thì nó đếm số lần chính nó được gọi đến với `label` là "default"

```javascript
function sayHello(name) {
  console.count()
  console.log(name)
}

sayHello("Đạt")
sayHello("Trung")
sayHello("Tuấn")
```

Đoạn code trên sẽ log ra như sau: 

![](https://images.viblo.asia/7f9d6aed-7d3b-4d54-aa29-2eb3d34cccad.png)

`console.count()` ở đây giúp chúng ta đếm được số lần gọi đến hàm `sayHello()`, nhưng để đếm ra số lần hàm ấy được gọi với cùng một tham số `name` thì sao? Chúng ta chỉ việc truyền tham số `name` như một `label` vào hàm `count()`

```javascript
function sayHello(name) {
  console.count()
  console.log(name)
}

sayHello("Đạt")
sayHello("Trung")
sayHello("Tuấn")
sayHello("Trung")
```

Tada! Chúng ta đã có thể đếm được số lần mà chúng ta gọi hàm `sayHello()` với mỗi `name` khác nhau.

![](https://images.viblo.asia/28c5fa55-3bf7-423a-a562-dac39b1d542f.png)

## `console.warn()`

Phương pháp này sẽ output một warning ra console. `console.warn()` sẽ rất hữu dụng khi làm việc với các API.  `console.warn()` là lựa chọn lý tưởng nhất để thông báo cho người dùng biết được rằng có lỗi ở đâu đó, như thiếu tham số hay có API / Package nào đã bị xóa (deprecated).

```javascript
function sayHello(name) {
  if(!name) {
    console.warn("Error 404: Name not found")
  }
}

sayHello()
```

Đoạn code trên check rằng tham số `name` có được truyền vào hay không. Nếu không có tham số `name` nào được truyền vào thì thông báo sau sẽ được log ra:

![](https://images.viblo.asia/50fddf2a-dace-45f0-b6b9-5c32e41edaa5.png)

## `console.table()`

Nếu chúng ta làm việc với Arrays hay Objects, sử dụng `console.table()` là cách hữu dụng nhất để hiển thị dữ liệu. Mỗi phần tử của mảng sẽ được hiển thị dưới dạng dòng trong bảng. Ở ví dụ sau chúng ta có một mảng các loại quả, nếu truyền mảng đó vào `console.table()` thì chúng sẽ được output ra console dưới dạng bảng dữ liệu.

```javascript
const fruits = ["kiwi", "banana", "strawberry"]

console.table(fruits)
```

Chúng ta sẽ có bảng dữ liệu sau:

![](https://images.viblo.asia/72d21cdf-c448-41cf-95d0-42ef78e163d9.png)

Việc sử dụng  `console.table()` sẽ trở nên cực kì hữu dụng trong trường hợp phải làm việc và xử lý những mảng lớn lên đến hàng trăm phần tử. Sau đây mình sẽ ví dụ cho các bạn về một mảng có nhiều phần tử để thấy được sự tiện dụng của phương pháp này

```javascript

const fruits = [
  "Apple",
  "Watermelon",
  "Orange",
  "Pear",
  "Cherry",
  "Strawberry",
  "Nectarine",
  "Grape",
  "Mango",
  "Blueberry",
  "Pomegranate",
  "Carambola",
  "Plum",
  "Banana",
  "Raspberry",
  "Mandarin",
  "Jackfruit",
  "Papaya",
  "Kiwi",
  "Pineapple",
  "Lime",
  "Lemon",
  "Apricot",
  "Grapefruit",
  "Melon",
  "Coconut",
  "Avocado",
  "Peach"
];

console.table(fruits);
```

Đây là output khi chúng ta dùng `console.table()`:

![](https://images.viblo.asia/0e6223fb-a31d-4b81-9d47-b6cbaf68b2a0.png)

Array thì như vậy, vậy Object thì sao ? Object sau chứa 3 key, `name`, `breed` và `type` của thú cưng.

```javascript

const pets = {
  name: "Edgar",
  breed: "pug"
  type: "dog"
};

console.table(pets);
```

Và output dưới dạng bảng hiển thị key và value của Object: 

![](https://images.viblo.asia/1176a81f-d1c9-4c66-80ca-0d5d5e0d1b4e.png)

## `console.group()`

Khi làm việc với một tập các dữ liệu liên kết với nhau thì group lại các message hay output vào các group lồng nhau và liên quan tới nhau sẽ khiến dễ hiểu hơn bao giờ hết. Để tạo ra một group, chúng ta sẽ dùng cặp `console.group()` và `console.groupEnd()`. Hãy xem ví dụ sau: 

```javascript
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

Và đây là output của đoạn code trên dưới dàng các block lồng nhau theo từng level ở trong console. Điều này hiển nhiên sẽ khiến làm việc với những dữ liệu có tính liên quan tới nhau dễ dàng hơn.

![](https://images.viblo.asia/1dda94a2-745f-473b-998d-75273c721628.png)

Phương thức `console.groupCollapsed()` cũng làm được điều tương  tự tuy nhiên block mới sẽ được rút gọn lại và cần phải click vào để bung ra. 

## Tổng kết
Vậy là mình đã nói khai quát qua về những cách sử dụng `console` khác nhau, còn khá nhiều cách dùng khác, tuy nhiên mình chỉ nêu ra những cái mình hay dùng nhất. Cuối bài mình sẽ list ra các câu lệnh `console` khác nữa để nếu bạn cảm thấy thú vị thì có thể tìm hiểu thêm nhé (bow)

Thank you and stay fresh !

```javascript
console.assert()
console.clear()
console.count()
console.debug()
console.dir()
console.dirxml()
console.error()
console.exception()
console.group()
console.groupCollapsed()
console.groupEnd()
console.info()
console.log()
console.profile()
console.profileEnd()
console.table()
console.time()
console.timeEnd()
console.timeStamp()
console.trace()
console.warn()
```

*Nguồn: [Indrek Lasn - medium.com](https://medium.com/better-programming/boost-your-javascript-debugging-skills-with-these-console-tricks-ab984c70298a)*