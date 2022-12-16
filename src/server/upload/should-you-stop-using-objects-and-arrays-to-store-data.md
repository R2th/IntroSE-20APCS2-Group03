Trong nhiều năm, các Programmers đã sử dụng Object và Array để lưu trữ data. Xu hướng này không chỉ giới hạn ở Javascript.

Đơn giản là không có sự lựa chọn nào khác để lưu trữ nhiều giá trị và xử lý data structures.

Tuy nhiên, có 1 số hạn chế trong khi sử dụng các Object và Array như:
1. Array có thể lưu trữ các phần tử trùng lặp.
2. Không có method() có sẵn nào để tìm độ dài của Object.
3. Chỉ String có thể được lưu trữ trong các Object và không nhớ thứ tự insert.
4. Các Developers phải chọn Array hoặc Object tùy thuộc vào trường hợp sử dụng.
5. Phải sử dụng thư viện của bên thứ 3 như Lodash để xử lý Array dễ dàng hơn.

Nhưng với sự ra đời của ES6 vào năm 2015, mọi thứ đã thay đổi theo chiều hướng tốt hơn. ES6 hỗ trợ Map và Set nhằm khắc phục những hạn chế trên.
![](https://images.viblo.asia/02bb23cf-b64f-48ff-b9e9-3a2458688c69.jpg)

# Set

Set là tập hợp các giá trị không bị trùng lặp, nghĩa là trong 1 set không thể có 2 giá trị bằng nhau.

**Khai báo và khởi tạo Set**
```js
const set = new Set();
//or
const set = new Set([...]);
```
**Thêm và xóa các phần tử khỏi Set**

Bạn có thể dễ dàng chèn các phần tử vào tập hợp bằng method **.add()**
```js
const set = new Set();
set.add('John');
set.add('Martha')
set.add('Bryan');
set.add('John');
// set = {'John','Martha','Bryan'}
```
Việc xóa các phần tử cũng rất đơn giản bằng cách sử dụng method **.delete()** để xóa 1 phần tử trong Set và sử dụng method **.clear()** để xóa hết phần tử trong Set
```js
const set = new Set([1, 2, 3, 4, 5])

// Xóa một phần tử trong set
set.delete(3) // Set (4) {1, 2, 4, 5}

// Xóa hết phần tử trong set
set.clear()
```
**Size of Set**

Sử dụng method **.size** để get được số lượng phần tử trong Set
```
const set = new Set([1, 2, 3, 4, 5])
console.log (set.size) // => 5
```
**Accessing Elements in a Set**
```js
let arr = [1, 2, 3];
const set = new Set(arr);
console.log(set) // => [object Set]
console.log(arr) // => (3) [1,2,3]
```
Để duyệt qua các phần tử của Set, ta cần 1 SetIterator() để nhận tất cả các giá trị.

Javascript cung cấp 1 thuộc tính **.values()** để nhận iterator sau đó ta có thể sử dụng kết hợp với vòng lặp để truy xuất tất cả các giá trị.
```js
let arr = [1, 2, 3];
const set = new Set(arr);
let iterator = set.values();
console.log(iterator.next().value); // 1
```
Cách dễ dàng hơn để truy xuất tất cả các phần tử là sử dụng **.forEach()**
```js
let arr = [1, 2, 3];
const set = new Set(arr);
set.forEach(v => console.log(v));
// Result:
// 1
// 2
// 3
```
Ngoài ra, ta có thể kiểm tra xem 1 phần tử có tồn tại hay không bằng cách sử dụng method **.has()**, method sẽ trả về **true** nếu phần tử đó tồn tại.
```js
const obj = {}
const s = new Set([NaN, {}, obj, 1])
s.has(NaN) //true
s.has(obj) //true
s.has(1) //true
s.has({}) //false
s.has(2) //false
```
**Khi nào thì Set tốt hơn? Và khi nào thì Array tốt hơn**
- Set khác với Array. Nó không có nghĩa là để thay thế Array hoàn toàn, mà là *cung cấp, hỗ trợ bổ sung để hoàn thiện những gì Array còn thiếu*.
- Vì Set chỉ chứa những phần tử khác nhau, nó sẽ làm giảm việc xử lý hơn nhiều nếu ta biết trước rằng ta muốn *tránh lưu dữ liệu trùng lặp*
- Các operations cơ bản của Set như **union(), intersect(), difference(), ...** dễ dàng được thực hiện 1 cách hiệu quả dựa trên các operations tích hợp sẵn. Do method delete(), nó làm cho việc interect/union giữa 2 Set tiện lợi hơn nhiều so với làm tương tự với 2 Array.
- Array được dùng cho các trường hợp khi ta muốn *giữ các phần từ được sắp xếp theo thứ tự để truy cập nhanh* hoặc *thực hiện thêm, sửa, xóa phần tử* hoặc *bất kỳ hành động nào yêu cầu quyền truy cập index trực tiếp vào các phần tử*
# Map
**Khai báo và khởi tạo Map**
```js
const map = new Map();
//or
const map = new Map([
    [key, value],
    ...
]);
```
**Thêm và xóa các phần tử khỏi Set**

Map 1 mảng các cặp giá trị dạng **[key, value]** giống Object. Do đó, khi thêm giá trị, ta cần cung cấp key
```js
const map = new Map();
map.set('Name', 'iPhone'); // map.set(key,value) format
map.set('Brand', 'Apple');
map.set('Price', '$1000');
```
Để xóa giá trị từ Map, ta chỉ cần truyền key vào method **.delete()**
```js
const map = new Map();
map.set('Name', 'iPhone'); 
map.set('Brand', 'Apple');
map.set('Price', '$1000');
map.delete('Price'); //removes the element with key 'Price'
```
Giống như Set, ta có sử dụng **.clear()** để xóa tất cả các phần tử.
```js
map.clear() // removes all the element
```

**Size of Map**

Có thể dễ dàng truy xuất số lượng phần tử của Map bằng cách sử dụng thuộc tính **.size**
```js
const map = new Map();
map.set('Name', 'iPhone');
map.set('Brand', 'Apple');
map.set('Price', '$1000');
console.log(map.size)//=> 3
```
**Accessing Elements in Map**

Map cung cấp cho ta 1 phương thức **.get()** để lấy giá trị bằng cách truyền key vào method.
```js
const map = new Map();
map.set('Name', 'iPhone');
map.set('Brand', 'Apple');
map.set('Price', '$1000');
console.log(map.get('Name')); //iPhone
console.log(map.get('Brand')); // Apple
```
Giả sử, ta chỉ muốn lấy key, value hoặc cả key và value? Sử dụng **.keys(), .values(), .entries()** để đạt được điều đó.
```js
console.log(map.keys());
// iterator {'Name', 'Brand', 'Price'}
console.log(map.values());
// iterator {'iPhone', 'Apple', '$1000'}
console.log(map.entries());
//iterator {'Name': 'iPhone', 'Brand': 'Apple', Price': '$1000'}
```
Với Map, việc sử dụng vòng lặp cũng khá đơn giản
```js
//with for-each
map.forEach((value, key) => {
   console.log(`${key} is ${value} years old!`);
});

// with for-of
for(const [key, value] of map) {
  console.log(`${key} : ${value}`);
}
```
Ngoài ra, bạn cũng có thể kiểm tra xem phần tử có tồn tại hay không?
```js
let map = new Map();
map.set('age', 19);
console.log(map.has('age')) // true since 'age' key is present
```

**Converting Object into a Map**

Hãy sử dụng **.entries()**
```js
const myObject= {
  'Age': '25',
  'Gender': 'Male',
  'Nationality': 'Australian'
};

const myMap = new Map(Object.entries(myObject)); //object to map
const anotherObject = Object.fromEntries(myMap) // map to object
```
Để convert từ Map thành Array, ta có thể sử dụng **Array.from(myMap)**

**Khi nào sử dụng Map và khi nào sử dụng Object**
1. Khi nào nên sử dụng Map
    
    * Khi ta cần 1 số loại dữ liệu phức tạp làm key.
    * Khi ta cần thứ của key khi inserted, hãy sử dụng Map. Khi nghi ngờ về cấu trúc dữ liệu thì chỉ cần sử dụng Map. Map linh hoạt hơn trong các trường hợp sử dụng và có cú pháp nhất quán.
    * Với tính năng như size(), clear() thì việc sử dụng như 1 Array thì quá tốt cho những tình huống xử lý.
3. Khi nào nên sử dụng Object
    * Khi ta cần làm việc với JSON, hãy sử dụng Object. JSON sẽ không hoạt động với Map. Hãy thêm khảo thêm [tại đây](https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map)
    * Object là lựa chọn tuyệt vời cho các trường hợp khi ta chỉ cần cấu trúc đơn giản để lưu trữ dữ liệu và biết rằng tất cả các key là String hoặc Number (hoặc Symbol), bởi vì việc tạo Object đơn giản và truy cập thuộc tính của Object bằng 1 khóa cụ thể nhanh hơn nhiều so với việc tạo Map.

**Tại sao lại là size mà không phải length?**

Chúng ta có thể thấy để lấy số lượng phần tử của Set hay Map, ta dùng **size** thay vì **length**.

Lý do là vì: **length** dùng cho những chuỗi có thể index (đánh số) được, ví dụ với Array ta có thể arr[3]. Ngược lại, **size** dành cho những cấu trúc không có thứ tự như **Map** và **Set**.

# Tổng kết
Array và object không phải là lỗi thời theo bất kỳ nghĩa nào, tuy nhiên, việc sử dụng Set và Map là cách tốt hơn để xử lý dữ liệu, đặc biệt khi xây dựng các ứng dụng lớn và phức tạp.

**Tham khảo:**

https://medium.com/javascript-in-plain-english/stop-using-objects-and-arrays-to-store-data-289c3edaaa33

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map