Xin chào các bạn, học JavaScript chắc chắn chúng ta phải biết đến Object. Trong một số bài toán cụ thể, đôi khi ta sẽ cần đến thao tác 'Clone Objects' để thực hiện các function khác nhau. Bài viết này sẽ giới thiệu tới các bạn '3 cách để Clone Objects trong JavaScript'
![](https://images.viblo.asia/a97a95bd-93d9-4032-a5a8-8cd7125d5915.png)
### Objects là một loại tham chiếu
Lần đầu clone 1 obj mình cũng sử dụng phép gán `=`, log ra kết quả khá như ý
```javascript
const obj = { one: 1, two: 2 };

const obj2 = obj;

console.log(
  obj,  // { one: 1, two: 2 };
  obj2  // { one: 1, two: 2 };
)
```
Tuy nhiên khi thêm mới/sửa 1 item nào đó hãy xem điều gì sẽ xảy ra
```javascript
const obj2.three = 3;

console.log(obj2);
// {one: 1, two: 2, three: 3}; <-- ✅

console.log(obj);
// {one: 1, two: 2, three: 3}; <-- 😱
```
Tại sao Object ban đầu vẫn bị ảnh hưởng ?  Đó là vì Object là loại tham chiếu, vì vậy khi bạn sử dụng `=`, nó đã sao chép con trỏ vào không gian bộ nhớ mà nó chiếm, các kiểu tham chiếu không giữ các giá trị, chúng là một con trỏ tới giá trị trong bộ nhớ. Vì vậy ta cần tìm đến một phương án khác để Clone Object mà không ảnh hưởng tới Object 'gốc'

## 1. Sử dụng Spread

```javascript
const food = { corn: '🌽', bacon: '🥓' };

const cloneFood = { ...food };

console.log(cloneFood); 
// { corn: '🌽', bacon: '🥓' }
```
Sử dụng Spread sẽ giúp ta clone Obj. Lưu ý khi sử dụng nó bạn có thể cần phải compile cùng với Babel

## 2. Sử dụng Object.assign

```javascript
const food = { corn: '🌽', bacon: '🥓' };

const cloneFood = Object.assign({}, food);

console.log(cloneFood);
// { corn: '🌽', bacon: '🥓' }
```
Ngoài IE huyền thoại thì `Object.assign` support hầu như đầy đủ, `Object.assign` nằm trong bản phát hành chính thức và ta có thể dùng nó để clone 1 Obj nhanh chóng. Xem thêm về [Object.assign()](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

## 3. Sử dụng JSON

```javascript
const food = { corn: '🌽', bacon: '🥓' };

const cloneFood = JSON.parse(JSON.stringify(food))

console.log(cloneFood); 
// { corn: '🌽', bacon: '🥓' }
```

### Shallow Clone vs Deep Clone
Một sự so sánh nhẹ giữa clone "nông" và clone "sâu". Cùng quan sát ví dụ sau

```javascript
const nestedObject = {
  country: '🇨🇦',
  detail: {
    city: 'vancouver'
  }
};

const shallowClone = { ...nestedObject };
// Changed our cloned object
shallowClone.country = '🇹🇼'
shallowClone.detail.city = 'taipei';

console.log(shallowClone);
// {country: '🇹🇼', detail: {city: 'taipei'}} <-- ✅

console.log(nestedObject);
// {country: '🇨🇦', detail: {city: 'taipei'}} <-- 😱
```

Clone "nông" có nghĩa ta chỉ clone được level đầu, các level sâu hơn sẽ được hiểu là tham chiếu. Và khi sử dụng cách 3

```javascript
const deepClone = JSON.parse(JSON.stringify(nestedObject));

console.log(deepClone);
// {country: '🇹🇼', detail: {city: 'taipei'}} <-- ✅

console.log(nestedObject);
// {country: '🇨🇦', detail: {city: 'vancouver'}} <-- ✅
```
### Object.assign vs Spread
**Object.assign là một hàm sửa đổi và trả về đối tượng đích**. Khi sử dụng
```javascript
const cloneFood = Object.assign({}, food);
```
`{}` được hiểu là đối tượng được sửa đổi, đối tượng đích không được tham chiếu bởi bất kỳ biến nào tại thời điểm đó, nhưng vì `Object.assign` trả về đối tượng đích, chúng ta có thể lưu trữ đối tượng được gán kết quả vào biến `cloneFood`
```javascript
const food = { corn: '🌽', bacon: '🥓' };

Object.assign(food, { corn: '🌽🌽' });

console.log(food);
// { corn: '🌽🌽', bacon: '🥓' }
```
Rõ ràng giá trị của `corn` trong đối tượng `food` là sai, vì vậy ta có thể gán giá trị chính xác cho `corn` bằng `Object.assign`. Chúng ta thực sự không sử dụng giá trị trả về của hàm, nhưng chúng ta đang sửa đổi đối tượng mục tiêu mà chúng ta đã tham chiếu với đối tượng `food`.

`Spread` là một cách sao chép các thuộc tính của một đối tượng thành một đối tượng mới
```javascript
const food = { corn: '🌽', bacon: '🥓' };

food = {
  ...food,
  corn: '🌽🌽',
}
// TypeError: invalid assignment to const `food'
```
`...`  gây ra lỗi, vì chúng ta sử dụng Spread tạo đối tượng mới và do đó đang gán một đối tượng hoàn toàn mới cho `food` được khai báo với hằng số const là sai. Giải pháp là tạo ra 1 biến mới để lưu đối tượng
```javascript
const food = { corn: '🌽', bacon: '🥓' };

const newFood = {
  ...food,
  corn: '🌽🌽',
}

console.log(newFood);
// { corn: '🌽🌽', bacon: '🥓' }
```
hoặc có thể dùng `let`, `var` cho phép chúng ta gán một đối tượng hoàn toàn mới
```javascript
let food = { corn: '🌽', bacon: '🥓' };

newFood = {
  ...food,
  corn: '🌽🌽',
}

console.log(newFood);
// { corn: '🌽🌽', bacon: '🥓' }
```

### Kết luận

Trên đây mình đã giới thiệu tới các bạn  '3 cách để Clone Objects trong JavaScript', hi vọng sẽ giúp ích cho các bạn khi làm việc với Object trong JavaScript

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !

-----

Bài viết này được dịch, chỉnh sửa dựa trên [3 Ways to Clone Objects in JavaScript](https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects)