# 1. So sánh sort của Array

```js
const arr1 = ['a', 'b', 'c'];
const arr2 = ['b', 'c', 'a'];

console.log(
    arr1.sort() === arr1
    arr2.sort() == arr2
    arr1.sort() === arr2.sort()
);
```
Trước tiên chúng ta cần biết hàm sort nó làm cái gì, nó sắp xếp lại các phần tử, hiển nhiên, sau đó trả về cho tham chiếu ban đầu, không thay đổi tham chiếu gốc.

`Kết quả log trả về: true, true, false`
# 2. Set của các Object
Nếu có một Set bao gồm các object sau
```js
const mySet = new Set([{ a: 1 }, { a: 1 }]);
const result = [...mySet];
console.log(result);
```
Khi tạo một object Set nó sẽ xóa các giá trị trùng nhau, tuy nhiên { a: 1} # { a: 1}, dù là giá trị trùng nhau, nhưng nó vẫn tham chiếu khác nhau. Chỉ khi chúng ta viết như bên dưới nó mới tự xóa giá trị trùng
```js
const obj = { a: 1 };
new Set([obj, obj]);
```
`Kết quả log: [{a: 1}, {a: 1}]`

# 3. Mutate một object
Với đoạn code sau, kết quả log ra sẽ được gì
```js
const user = {
  name: 'Nhi',
  age: 25,
  pet: {
    type: 'dog',
    name: 'Kiki'
  }
};
Object.freeze(user);
user.pet.name = 'Kaka';

console.log(user.pet.name);
```
Object.freeze chỉ thực hiện freeze level 1 của object, nếu có mutate những level thấp hơn, vẫn được như thường.

`Đáp án: Kaka`

# 4. prototype inheritance
Chúng ta có một constructor function `Dog`. Tìm giá trị log ra là gì nhé
```js
function Dog (name) {
  this.name = name;
  this.speak = function() {
    return 'woof';
  };
}

const dog = new Dog('Kiki');

Dog.prototype.speak = function() {
  return 'Grass dog';
};

console.log(dog.speak());
```
Khi chúng ta new Dog, chúng ta đã gán giá trị cho speak là một function trả về woof. Phương thức speak bên dưới sẽ không bao giờ được gọi.

`Đáp án: woof`

# 5. Thứ tự resolve Promise.all
Chúng ta có một hàm timer trả về một Promise sẽ được resolve sau một khoảng thời gian ngẫu nhiên. Chúng ta dùng Promise.all để resolve toàn bộ array timer. Giá trị log ra là gì, hay là giá trị ngẫu nhiên?
```js
const timer = (a) => {
  return new Promise((res) =>
    setTimeout(() => {
      res(a);
    }, Math.random() * 100)
  );
};

const all = Promise.all([
    timer('first'),
    timer('second')
]).then((data) =>
  console.log(data)
);
```
Thứ tự resolve không quan trọng với `Promise.all`, chúng ta có thể hoàn toàn tin tưởng thứ tự trả về sẽ đúng với thứ tự chúng ta khai báo.

`Đáp án: first, second`

# 6. Tính toán với reduce
Giá trị log ra sẽ là?
```js
const arr = [
    (x) => x * 1,
    (x) => x * 2,
    (x) => x * 3,
    (x) => x * 4
];

console.log(arr.reduce((agg, el) => agg + el(agg), 1));
```
Với `Array.reduce` được truyền vào giá trị khởi tạo là 1 (cho biến agg), chúng ta loop qua các hàm trong mảng theo thứ tự

1 + 1 * 1 = 2
2 + 2 * 2 = 6
6 + 6 * 3 = 24
24 + 24 * 4 = 120

`Đáp án: 120`

# 7. Điều kiện rút rọn (short-circuit)
Kết quả log ra là...
```js
const notifications = 1;
console.log(
  `You have ${notifications} notifications ${notifications !== 1 && 's'}`
);
```
Cầu điều kiện rút gọn `notifications !== 1 && 's'` sẽ return false (dạng chuỗi). Chúng ta phải viết là `notifications !== 1 ? '' : 's'`

`Đáp án: You have 1 notifications false`

# 8. Spread và Rename
Chuyện gì xảy ra khi chúng ta `spread` mảng ra và thay đổi giá trị của object đầu tiên
```js
const arr1 = [{ firstName: 'nhitt' }];
const arr2 = [...arr1];
arr2[0].firstName = 'nhi';

console.log(arr1);
```
Spread chỉ tạo một `shallow copy`, nghĩa là object bên trong mảng ban đầu cũng chỉ tham chiếu đến arr1, nên thay đổi giá trị này từ arr2 sẽ ảnh hưởng đến arr1

`Đáp án: nhi`

# 9. Binding cho phương thức array
Kết quả log ra là gì
```js
const map = ['a', 'b', 'c'].map.bind([1, 2, 3]);
map((el) => console.log(el));
```
Khi gọi `['a','b','c'].map` nó sẽ gọi `Array.prototype.map` với giá trị this là `['a','b','c']`. Tuy nhiên khi sử dụng như một tham chiếu, thay vì gọi, nó trỏ đến `Array.prototype.map`, `bind` sẽ đặt giá trị this này thành `[1,2,3]`

`Đáp án: 1 2 3`

# 10. Đặt unique và sắp xếp
Trong code ở dưới chúng ta dùng `object Set` và `spread` để tạo một mảng mới. Giá trị log ra là gì ( những phần tử có bị force thành unique? chúng có được sắp xếp không?)
```js
const arr = [...new Set([3, 1, 2, 3, 4])];
console.log(arr.length, arr[2]);
```
Set sẽ force các phần tử thành unique, trùng nhau sẽ bị bỏ qua, nhưng không thay đổi thứ tự. arr sẽ có giá trị `[3, 1, 2, 4]`

Source nha

https://dev.to/nas5w/10-javascript-quiz-questions-and-answers-to-sharpen-your-skills-255m