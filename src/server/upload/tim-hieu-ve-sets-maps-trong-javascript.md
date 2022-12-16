### Introduction Object Set And Map.
1. Đối tượng Set cho phép bạn lưu trữ các giá trị là duy nhất
2. Đối tượng Map cho phép bạn lưu trữ các cặp key-value  và ghi nhớ thứ tự chèn ban đầu của các khóa.
### Set
>  Set Là một bộ sưu tập các giá trị. Bạn có thể lặp qua các phần tử của Set theo thứ tự chèn. Giá trị trong Set chỉ có thể là duy nhất tập hợp của Set.
Trong Javascript đối tượng Set cho phép tùy chỉnh, cung cấp các phương thức hữu ích như thêm, sửa xóa, và lặp qua các phần tử của tập hợp Set.

##### Array vs Set
Array, giống như một tập hợp, là một cấu trúc dữ liệu cho phép tính toán, loại bỏ và lặp trên các chỉ m của nó.  Tuy nhiên, một Array khác với một Set theo nghĩa là nó cho phép bổ sung các giá trị trùng lặp và các hoạt động của nó tương đối chậm hơn.

Ví dụ: Khi tìm kiếm thông qua một array có độ phức tạp thời gian tuyến tính là O(n), giống như chèn một phần tử vào giữa một array. Điều này có nghĩa là thời gian chạy để tìm kiếm và chèn các chỉ mục cho array tăng lên khi kích thước của array tăng lên.Các phương thức array Push và Pop có thời gian chạy là O(1), có nghĩa là: các hoạt động này sẽ có thời gian thực hiện không đổi bất kể kích thước aray tăng n. 

Tuy nhiên, trong thực tế, thao tác Đẩy là O(n) phát sinh chi phí sao chép khi các vị trí bộ nhớ liền kề mới được phân bổ cho mảng array mới được tạo nên.

Set có thời gian chạy là O(1) với tất cả các tính toán, tìm kiếm.
#### Creating a Set
```
const set = new Set();

console.log(set); // Set {}
```
#### Initializing a Set
Để khởi tạo một Set, chúng ta có thể chuyển một array các giá trị cho hàm tạo Set, điều này sẽ tạo một Set với các giá trị đó:
```
const confectioneries = new Set(['oreo', 'marshmallow','oreo', 'kitkat', 'gingerbread']);

console.log(confectioneries); // result: Set { 'oreo', 'marshmallow', 'kitkat', 'gingerbread' }


```
Trong đoạn trên, giá trị trùng lặp oreo, được lặng lẽ xóa khỏi Set và chỉ các giá trị duy nhất được trả về.

#### Adding Items

Chúng ta có thể thêm nhiều mục vào Set bằng phương thức `add()`. Phương thức này thêm một giá trị mới vào đối tượng Set và trả về Set. 

Thêm một mục trùng lặp vào đối tượng Set sẽ không trả về lỗi, thay vào đó, mục đó sẽ không được thêm vào.
```
const confectioneries = new Set(['oreo', 'marshmallow', 'kitkat', 'oreo','gingerbread']);

confectioneries.add('donut');

console.log(confectioneries); //_ log result: Set { 'oreo', 'marshmallow', 'kitkat', 'gingerbread', 'donut' } _

confectioneries.add('kitkat');

console.log(confectioneries); //_ log result: Set { 'oreo', 'marshmallow', 'kitkat', 'gingerbread', 'donut' } _


```
#### Deleting Items
Sử dụng phương thức `delete()`, để xóa giá  trị cần xóa. Phương thức sẽ trả về giá trị Boolean `true` nếu việc xóa thành công và `false` nếu thất bại. 

Chúng ta có thể xóa tất cả các phần tử của Set bằng phương thức clear ().
```
confectioneries.delete('kitkat');

console.log(confectioneries); //_ log result: Set { 'oreo', 'marshmallow', 'gingerbread', 'donut' }_

confectioneries.clear();

console.log(confectioneries); // log result: Set {}


```
#### Size of a Set
Chúng ta có thể lấy size của Set bằng cách sử dụng thuộc tính size trên Set prototype. Điều này tương tự với thuộc tính length cho array:
```
const confectioneries = new Set(['oreo', 'marshmallow', 'kitkat', 'oreo','gingerbread']);

console.log(confectioneries.size); // log result: 5
```
#### Searching for Items
Chúng ta cần biết có 1 phần tử cụ thể trong Set. Điều này có thể được thực hiện bằng cách sử dụng phương thức `has()`.

Phương thức `has()` trả về `true` nếu phần tử nằm trong  Set và `false` nếu nó không:
```
console.log(confectioneries.has('marshmallow')); // log result: true

```
#### Returning the Items in a Set
Chúng ta có thể trả về các mục trong một Set theo cùng thứ tự chèn bằng cách sử dụng phương thức `values()`. Phương thức này trả về một đối tượng setIterator mới. 

Một phương thức tương tự để trả về các mục của một tập hợp là phương thức `keys()`:
```
console.log(confectioneries.values()); // _log result: _[_Set Iterator] { 'oreo', 'marshmallow', 'kitkat', 'gingerbread', 'donut' }_

console.log(confectioneries.keys()); //_ log result: _[_Set Iterator] { 'oreo', 'marshmallow', 'kitkat', 'gingerbread', 'donut' }_

```
Đối tượng setIterator là một đối tượng Iterator vì nó thực hiện các giao thức Iterizable và Iterator. 
Giao thức Iterable chỉ định một cách lặp qua các giá trị của bằng cách sử dụng các cấu trúc vòng lặp.

Nó cũng làm cho các giá trị được lặp lại bằng phương thức `next()`. Khi chúng ta gọi `next()` trên một đối tượng setIterator,  chúng ta sẽ nhận được giá trị tiếp theo trong lần lặp và false cho đến khi tất cả các giá trị của Set đã được lặp:
```
let iterator = confectioneries.values();

console.log( iterator.next()); // _{ value: 'oreo', done: false } 
_
console.log( iterator.next()); // _{ value: 'marshmallow', done: false }
_
console.log( iterator.next()); //_ { value: 'kitkat', done: false }
_
console.log( iterator.next()); //_ { value: 'gingerbread', done: false }
_
console.log( iterator.next()); //_ { value: 'donut', done: false }
_
console.log( iterator.next()); // _{ value: undefined, done: true }_
```
Do Bộ thực hiện giao thức Iterable, nên các cấu trúc vòng lặp như for ...of có thể được sử dụng như hiển thị bên dưới:
```
for (let confectionery of confectioneries) {
  console.log(confectionery);
}

/_ _console.log() result 
oreo
marshmallow
kitkat
gingerbread
donut 
__/

```
#### WeakSets
WeakSets cung cấp thêm tính linh hoạt khi làm việc với cấu trúc dữ liệu . 
Chúng khác với các bộ dữ liệu thông thường ở chỗ chúng chỉ chấp nhận các đối tượng và không thể lặp lại; họ có thể được lặp lại và không có phương thức clear(). Để khắc phục điều chúng ta sẽ sử dụng WeakSets.
Chúng ta có thể tạo một Weakset bằng cách sử dụng Weakset constructor:
```
let user1 = {name: 'user 1', email: 'user1@example.com'};
let user2 = {name: 'user 2', email: 'user2@example.com'};
let user3 = {name: 'user 3', email: 'user3@example.com'};

const users = new WeakSet([user1, user2, user3]);
```
 
### Maps
> Maps trong JavaScript là các đối tượng được thiết kế để lưu trữ và truy xuất các mục một cách hiệu quả dựa trên một khóa duy nhất cho mỗi phần tử. 
Map lưu trữ các cặp key-value trong đó cả key và value có thể là giá trị nguyên thủy hoặc đối tượng khác hoặc cả hai.

Một đối tượng Map lặp lại các phần tử của nó theo thứ tự chèn - một   for...of  trả về một mảng `[key, value]` cho mỗi lần lặp.
#### Creating a Map
```
const users = new Map();

console.log(users); // Map {}
```
#### Adding Items
Các cặp Key-value được thêm vào Map bằng phương thức `set()`. Phương thức này có hai đối số, đầu tiên là `key` và thứ hai `value`, được tham chiếu bởi `key`:
```
users.set('John Doe', {
  email: 'johndoe@example.com',
});

users.set('Jane Doe', {
  email: 'janedoe@example.com',
});

console.log(users);

/__ console.log result 
Map {
  'John Doe' => { email: 'johndoe@example.com'},
  'Jane Doe' => { email: 'janedoe@example.com'} }
__/
```

Không giống như Set loại bỏ các khóa trùng lặp, Maps sẽ cập nhật giá trị được đính kèm với khóa đó:
```
users.set('John Doe', {
  email: 'johndoe477@example.com',
});

console.log(users);

/__ console.log result 
Map {
  'John Doe' => {email: 'johndoe477@example.com'},
  'Jane Doe' => { email: 'janedoe@example.com'} }
__/
```

#### Deleting Items
Cũng gióng như Set, các cặp key-value có thể xóa bằng phương thức `delete()`. Key cần xóa được chuyển sang phương thức () như hiển thị bên dưới:
```
users.delete('Jane Doe');
```
Map cũng có một phương thức `clear()` để loại bỏ tất cả các cặp key-value khỏi Map:
```
users.clear();

console.log(users); // Map {}
```
#### Searching for Items
Maps cũng có phương thức `has()` để kiểm tra xem khóa có tồn tại trong Bản đồ hay không. Phương thức này sẽ trả về true nếu khóa nằm trong Map và false nếu nó không:
```
let users = new Map();

users.set('John Doe', {
  email: 'johndoe@example.com',
});

users.set('Jane Doe', {
  email: 'janedoe@example.com',
});

console.log(users.has('John Doe')); // true
```
#### Returning the Value of a Map item
Giá trị của key trong đối tượng Map có thể được nhận bằng phương thức `get()` trên nguyên mẫu của Map:
```
console.log(users.get('Jane Doe'); // { email: 'janedoe@example.com' }
```
Có thể lấy tất cả các keys và values của một đối tượng Map bằng cách sử dụng các phương thức `keys()` và `values()` tương ứng.
Các phương thức này đều trả về một đối tượng MapIterator mới có phương thức `next()` có thể được sử dụng để lặp qua các mục của Map:
```
let userKeys = users.keys();

console.log(userKeys.next()); // { value: 'John Doe', done: false }

let userValues = users.values();

console.log(userValues.next()); // _{ value: { email: 'johndoe@example.com' }, done: false }_
```
Cũng như với Set, các cấu trúc vòng lặp như `for ... of` và `forEach()` có thể được sử dụng để lặp qua các  Map:
```
for (let user of users) {
  console.log('[for...of]: ', user);
}

/_ Log result
  _[_for...of]:  _[_ 'John Doe', { email: 'johndoe@example.com' } ]
  _[_for...of]:  _[___ 'Jane Doe', { email: 'janedoe@example.com' } ]
_/

users.forEach((value, key) => console.log('[__forEach()]:  ', key, value));

/*_ Log result
  [__forEach()]:   John Doe { email: 'johndoe@example.com' }
  _[_forEach()]:   Jane Doe { email: 'janedoe@example.com' }
*_/
```
### WeakMaps
Như với WeakSets, WeakMaps khác với các đối tượng Map thông thường. WeakMaps chỉ chấp nhận các đối tượng làm khóa, không thể lặp lại và không có phương thức `clear()`.
```
let users = new WeakMap();

const user1 = {
  name: 'John Doe',
};
const user2 = {
  name: 'Jane Doe',
};

users.set(user1, {
  email: 'johndoe@example.com',
});

users.set(user2, {
  email: 'janedoe@example.com',
});
```
Như với WeakSets, việc đặt khóa của đối tượng WeakMap thành null sẽ ngầm thu thập chỉ mục đó:
````
user1 = null;
````
#### Summary
Trong bài viết này chúng ta đã tìm hiểu được về Set và Map cùng cách sử dụng của chúng. 
Hữu ích này cung cấp 1 cách dễ dàng và hiệu quả hơn để cấu trúc và truy cập dữ liệu trong các trường hợp sử dụng nhất định.

#### References
https://scotch.io/tutorials/exploring-sets-and-maps-in-javascript
https://javascript.info/map-set
https://en.wikipedia.org/wiki/JavaScript

Bài viết của mình đến đây là hêt :) Hẹn gặp lại các bạn trong các bài viết sau: :)