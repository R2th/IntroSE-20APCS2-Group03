[Lodash](https://lodash.com) là một thư viện JavaScript mạnh mẽ dùng để xử lý tất cả các dữ liệu như Array, Collection, Date, Function, Lang, Math, Number, Object, Seq, String, Util, Properties … với nhiều chức năng hơn và có hiệu năng tốt hơn.

Với mỗi loại dữ liệu, lại có rất nhiều hàm tiện ích để bạn có thể sử dụng trong những trường hợp khác nhau. Nếu không thực sự tự tin về việc kiểm tra thuần về kiểu và dữ liệu thì hãy 1 lần thử Lodash. Biết đâu bạn sẽ yêu thích nó!

Đầu tiên là cài đặt thông qua npm:
> **npm i --save lodash**


Sau đó cùng điểm qua 1 vài hàm thường hay sử dụng.
### 1. Xử lý với Array
1. **_.chunk(array, [size=number])** Tạo một mảng mới từ mảng đã có, gồm các mảng con có số phần tử tùy chọn truyền vào. Nếu không truyền size, mặc định sẽ = 1.
```js
const array = [1,2,3,4]

_.chunk(array,1) => [[1],[2],[3],[4]]

_.chunk(array,2) => [[1,2],[3,4]]

_.chunk(array,3) => [[1,2,3],[4]]
```

2. **_.compact(array)** Tạo ra một mảng mới và loại bỏ tất cả các giá trị **falsy** ( false, null, 0, "", undefined, và NaN ).
```js
const array = [1, 2, "a", 0, null, "b", false]

_.compact(array) => [1, 2, "a", "b"]
```

3. **_.concat(array, [values])** Tạo ra mảng mới bằng cách nối nối mảng lại với nhau hoặc thêm giá trị mới vào.
```js
const array = [1, 2, 3]

_.compact(array,4) => [1, 2, 3, 4]

-.compact(array,[4],5,6) => [1, 2, 3, 4, 5, 6]

-.compact(array, [[4]], 5, 6) => [1, 2, 3, [4], 5, 6]
```

4. **_.drop(array, [n=1])** Tạo ra mảng mới và loại bỏ các giá trị từ vị trí đầu tới vị trí n. Nếu không khai báo n thì mặc định là 1.
```js
const array = [1, 2, 3, 4, 5]

_.drop(array) => [2, 3, 4, 5]

_.drop(array,2) => [3, 4, 5]

_.drop(array,5) => []
```

5. **_.slice(array, start=0, end=array.length)** Tạo ra mảng mới từ vị trí gồm các phần tử bắt đầu từ ví trí start đến vị trí end.
```js
const array = [
   {name: "A", age: 10},
   {name: "B", age: 14}, 
   {name: "C", age: 14}
]

_.slice(array, 0, 1) => {name: "A", age: 10}

_.slice(array, 0, 2) => [{name: "A", age: 10},{name: "B", age: 14}]
```

### 2. Collection
1. **_.find(collection, [predicate=_.identity], [fromIndex=0])** Lặp lại các phần tử của collect, trả về phần tử có vị trí đầu tiên thỏa điều kiện.

```js
var users = [
    { name: "Looj", age: 16},
    { name: "Looj", age: 5},
    { name: "Quoc", age: 5},
    { name: "Anh", age: 20}
];
_.find(users, {name: "Looj", age: 5 }) //=> {name: "Looj", age: 5}

_.find(users, function(user) { 
    return user.age > 18;           //=>  {name: "Looj", age: 16}
});
```

2. **_.filter(collection, [predicate=_.identity])** Tạo ra một mảng mới bằng cách lặp từng phần tử của collection thỏa các điều đưa vào.

```js
const arr = [
    {name: "A", age: 16},
    {name: "A", age: 14},
    {name: "B", age: 5},
    {name: "C", age: 4},
    {name: "D", age: 19},
];
_.filter(arr, x=>x.age >= 16) 
//=> [{name: "A", age: 16}, {name: "D", age: 19}]

_.filter(arr, {name: "A", age: 14})
//=> [{name: "A", age: 14}]
```

### 3. Kiểm tra kiểu dữ liệu
- Cái này mình hay sử dụng nhất bởi vì ko tự tin lắm khi tự check các biến dữ liệu ^^
```js
_.isNull(null)        => true

_.isFunction(_)       => true

_.isNumber(8.4)       => true

_.isNumber('8.4')     => false

_.isNumber(NaN)       => true

_.isObject({})        => true

_.isObject([1, 2, 3]) => true

_.isObject(1)         => true
```

### 4. Tổng kết
Trong phạm vi bài viết, mình chỉ giới thiệu được một số hàm cơ bản cũng như cách dùng cơ bản của lodash mà không nhắc tới nhược điểm của nó, các bạn có thể tự tìm hiểu thêm nhé. Cám ơn các bạn đã theo dõi!