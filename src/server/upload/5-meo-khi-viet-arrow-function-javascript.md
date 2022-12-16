# 5 mẹo khi viết arrow function
`Arrow function` đã quá phổ biến, hầu như ai sử dụng JS cũng biết nó là gì, và Viblo cũng có nhiều bài [giới thiệu](https://viblo.asia/p/es6-arrow-functions-QpmleLr9Zrd) nên giờ chúng ta đi tìm hiểu cách viết arrow function cho mượt mà nha.

## 1. Gán tên cho arrow function
`arrow function` trong javascript là một `anonymous` (hàm không có tên), nếu gọi vào `name` của nó chúng ta sẽ nhận được một chuỗi rỗng `''`
```js
(number => number + 1).name; // => ''
```
Thật không may, trong lúc debug hoặc phân tích call stack, hàm dạng `anonymous` rất khó chịu vì không biết đang chạy cái gì
![](https://images.viblo.asia/e3eb026b-3b7b-429b-a61d-af9e1ecb0cc4.png)

Bên cột call stack có 2 function `anonymous`, không có bất kỳ thông tin nào được trích xuất ra ở đây luôn, nó chỉ hiển thị vẻn vẹn `anonymous` =)) 

Nhưng nếu chúng ta khai báo một biến `arrow function`, Javascript lúc này lại ngầm hiểu nó là tên cho function đó (các đặc tính khác của `arrow function` không đổi)
```js
const increaseNumber = number => number + 1;

increaseNumber.name; // => 'increaseNumber'
```

Lúc debug, nó đã hiện nguyên hình như này nè

![](https://images.viblo.asia/184084cf-c387-4c58-b67b-0084f6e52519.png)

Vì các arrow function đã có tên, nên call back cung cấp thêm thông tin về mã được thực thi:
* `handleButtonClick` Tên hàm chỉ ra rằng một sự kiện click đã xảy ra
* `increaseCounter` tăng một biến số truy cập.

## 2. Inline khi nào có thể

Hàm inline là một hàm chỉ có một biểu thức. Hàm mà clean về có một dòng nhìn lại thích mê ấy.

Thay vì phải viết một cách dài dòng như này
```js
const array = [1, 2, 3];

array.map(number => {
  return number * 2;
});
```
Thì hãy bỏ hẳn `{}` và `return`, ở dạng một `expression`
```js
const array = [1, 2, 3];
array.map(number => number * 2);
```
^^
## 3. Sử dụng với phép so sánh
Các phép so sánh `>`, `<`, `<=`, `>=` nhiều khi dễ gây nhầm lẫn khi đứng chung với thằng `=>`

GIả dụ như 
```js
const negativeToZero = number => number <= 0 ? 0 : number;
```
Lại mất công dùng não rồi =))

Để không đánh đố người đọc, bọc nó lại trong dấu ngoặc đơn `()` 
```js
const negativeToZero = number => (number <= 0 ? 0 : number);
```
hoặc một cách tường minh hơn thì như này 
```js
const negativeToZero = number => {
  return number <= 0 ? 0 : number;
};
```
## 4. Sử dụng với object literal
Nếu viết object literal như bên dưới chắc chắn bạn bị báo lỗi như này
```js
const array = [1, 2, 3];

// throws SyntaxError!
array.map(number => {'number': number});
```
JavaScript coi các dấu ngoặc nhọn là một khối mã, chứ không phải là một đối tượng theo nghĩa đen. Nên nhớ thêm ngoặc đơn cho nó nha
```js
const array = [1, 2, 3];

// Works!
array.map(number => ({ 'number': number }));
```
Nếu đối tượng bằng chữ có nhiều thuộc tính, bạn thậm chí có thể sử dụng dòng mới, trong khi vẫn giữ nguyên chức năng
```js
array.map(number => ({
  'number': number,
  'propA': 'value A',
  'propB': 'value B'
}));
```
## 5. Hạn chế lồng nhiều arrow function

Cú pháp arrow function ngắn thì tốt lắm đấy. Nhưng lại có tác dụng phụ, là có thể khó hiểu khi nhiều arrow function được lồng vào nhau.

Thí dụ có một button, sau khi click chúng ta request lên server, sau khi nhận được giá trị, log xuống trình duyệt
```js
myButton.addEventListener('click', () => {
  fetch('/items.json')
    .then(response => response.json());
    .then(json => {
      json.forEach(item => {
        console.log(item.name);
      });
    });
});
```
Làm một cú ba arrow lồng nhau nên thiên hạ chê khó đọc, đọc cái hàm mà tốn não quá, nên để tường minh tốt nhất nên tách các hàm riêng ra, đặt tên biến cho từng hàm mô tả chính xác nhiệm vụ mỗi hàm thì có thể bạn nên xem xét qua như này
```js
const readItemsJson = json => {
  json.forEach(item => console.log(item.name));
};

const handleButtonClick = () => {
  fetch('/items.json')
    .then(response => response.json());
    .then(readItemsJson);
};

myButton.addEventListener('click', handleButtonClick);
```
Thậm chí muốn ngon hơn thì dùng luôn `async/await`
```js
const handleButtonClick = async() => {
  const response = await fetch("/items.json");
  const json = await response.json();
  json.forEach(item => console.log(item.name));
};

myButton.addEventListener("click", handleButtonClick);
```

## 6. Kết luận

* Các `arrow function` trong JavaScript là ẩn danh. Để làm cho việc debug hiệu quả, thì nên sử dụng các biến để gọi đến các hàm đó. 
* `arrow function inline` có ích khi thân hàm có một biểu thức.
* Các biểu thức `>`, `<`, `<=`và `>=`trông cứ na ná `=>`. Vậy nên đặc biệt phải cẩn thận khi các toán tử này được sử dụng bên trong các hàm inline.
* Cú pháp bằng chữ của đối tượng `{prop: 'value'}` tương tự như mã của khối `{}`. Vì vậy, khi đối tượng bằng chữ được đặt bên trong hàm mũi tên nội tuyến, bạn cần bọc nó thành một cặp dấu ngoặc : `() => ({prop: 'value'})`.
* Cuối cùng, việc lồng nhau quá mức của các hàm làm lu mờ ý nghĩa mã. Để tiếp cận tốt hơn là làm giảm các arrow function lồng nhau trích xuất chúng thành các biến con. Ngoài ra, hãy cố gắng sử dụng các tính năng tốt hơn như `async/await` nha.

*source:
https://dmitripavlutin.com/javascript-arrow-functions-best-practices/*