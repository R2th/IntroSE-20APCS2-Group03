## Đặt vấn đề

Đọc xong tiêu đề này, bạn có thể tự hỏi - tại sao lại so sánh `Map` vs. `Object` mà không phải `Map` vs. `Array`, hay `Object` vs `Set`?

Chààà, cũng được thôi mà, song mình nhận thấy `Map` và `Object` có các trường hợp sử dụng rất giống nhau đòi hỏi chúng ta phải hiểu để có thể quyết định chọn dùng cái nào phù hợp trong mỗi trường hợp cụ thể.

![](https://i.pinimg.com/originals/48/99/50/489950a6f078cf521accb6264b1f485b.gif)

*Trong bài viết này chúng ta cùng nhau tìm hiểu nhé !*

## Concepts

#### What is `Map`?
Theo *Mozilla*:

> Map is a data collection type (in a more fancy way — abstract data structure type), can iterate its elements in insertion order.
> 

<br/>

Với `Map`, dữ liệu được lưu theo dạng cặp: một `unique key` và `value` tương ứng với `key` đó.

`Map` được dùng để tra cứu và truy cập nhanh dữ liệu được lưu. `Key` và `value` có thể được lưu trong bất kì kiểu dữ liệu nào, không chỉ là chuỗi và số như ta hay gặp.
```js
var myMap = new Map();

var keyString = 'a string',
    keyObj = {},
    keyFunc = function() {};

// đặt các values
myMap.set(keyString, "value associated with 'a string'");
myMap.set(keyObj, 'value associated with keyObj');
myMap.set(keyFunc, 'value associated with keyFunc');

myMap.size; // 3

// lấy các values
myMap.get(keyString);    // "value associated with 'a string'"
myMap.get(keyObj);       // "value associated with keyObj"
myMap.get(keyFunc);      // "value associated with keyFunc"

myMap.get('a string');   // "value associated with 'a string'"
                         // ?vì keyString === 'a string'
myMap.get({});           // undefined, vì keyObj !== {}
myMap.get(function() {}) // undefined, vì  keyFunc !== function () {}
```

 
#### What about `Object`?

Khi đọc bài viết này, mình nghĩ các bạn cũng chẳng xa lạ gì với `Object` nữa đúng không nào? 😸😸

`Object` là đối tượng? Hmm... Đúng nhưng chưa đủ 🤔🤔
> `Regular Object` is dictionary type of data collection.
> 
<br/>

`Object` cũng lưu `data` theo dạng `key - value` như `Map`. Với mỗi `key` trong `Object` (thông thường ta gọi là `property`) là độc nhất và là một giá trị đơn.

Ngoài ra, `Object` còn là một `built-in prototype`. Hầu hết tất cả các đối tượng đều là **`instances of Object`**, bao gồm cả `Map`.

#### Kết luận:
* **Giống**: lưu `data` dựa trên cùng một *concept*: `key - value`.
* **Khác**:
    * **`Key`**:
        * In Object, **the keys MUST be simple types** (`integer` || `string` || `symbols`).
        * In `Map`, the keys can be any data type *(an object, an array, etc…).*
    * **Element order**:
        * Trong `Map`, thứ tự ban đầu của các phần tử được giữ nguyên, `Object` thì không.
        * **Inheritance**: `Map` is an instance of `Object`

```js
var map = new Map([[1,2],[3,4]]);
console.log(map instanceof Object); //true
var obj = new Object();
console.log(obj instanceof Map); //false
```

*Đó mới chỉ là so sánh theo `Concept` thôi, tiếp theo chúng ta hãy xem cách khởi tạo `Object` và `Map` có gì đặc biệt nhé?* 🤗🤗
## How to construct

#### Object
Để tạo ra một đối tượng mới, đơn giản nhất ta chỉ cần dùng `literal declaration`:
```js
var obj = {}; //Empty object
var obj = {id: 1, name: "Test object"}; 
//2 keys here: id maps to 1, and name maps to "Test object"
```
Hoặc qua `constructor`:

```js
var obj = new Object(); //Empty Object
var obj = new Object;  //same result
```
Hay một cách khác với `Object.prototype.create`:

`var obj = Object.create(null); //Empty Object`

##### Special Notes
Không nên sử dụng `Object.create()`, trừ các trường hợp đặc biệt, ví dụ:
* **Inheritance** - Muốn kế thừa `prototype object` đó, không cần phải định nghĩa lại `prototype`:

```js
var Vehicle = {
    type: "General",
    display: function(){console.log(this.type);}
}
var Car = Object.create(Vehicle); //create a new Car inherits from Vehicle
Car.type = "Car"; //overwrite the property
Car.display();//"Car"
Vehicle.display();//still "General"
```

Những lý do ta nên tránh `built-in constructor`:
* Giảm performance
* Dễ gây rối và dễ gây lỗi:
```js
var obj = new Object(id: 1, name: "test") //Error - obviously
var obj1 = {id: 1, name: "test"};
var obj2 = new Object(obj1); //obj1 and obj2 points to the same one
obj2.id = 2;
console.log(obj1.id); //2
```

#### Map
Với `Map`, chỉ có một cách để tạo là sử dụng `built-in constructor` and **`new`** syntax.
```js
var map = new Map(); //Empty Map
var map = new Map([[1,2],[2,3]]);
// map = {1=>2, 2=>3}
```
<br/>

###### `Map([iterable]) argument`

Hàm `Constructor()` nhận vào một tham số hoặc là một mảng `array` hoặc là một `iterable object` *(arrays with 2 elements [key, value])*.

## Basic capabilities
### Accessing element
Với `Map`, lấy các giá trị phần tử qua `Map.prototype.get(key)`:
<br/>

`map.get(1) // 2`
<br/>

Với `Object` thì chúng ta đã có quen thuộc:
```
obj.id //1
obj['id'] //1
```
###### Kiểm tra `key` có đang tồn tại hay không?
```js
// MAP
map.has(1);//return boolean value:  true/false
// OBJECT
var isExist = obj.id === undefined;
// or
isExist = 'id' in obj;
//which will apply for inherited property as well.
// btw, using:
obj.hasOwnProperty()
// return boolean, NOT applied for inherited for that object
```
### Add new element

```js
// Map
map.set(4,5); //{1=>2, 2=>3, 4=>5}

// Object
obj['gender'] = 'female'; //{id: 1, name: "test", gender: "female"}
obj.gender = male; 

//Both is ok and will overwrite the existing mapped value if property already exists.
//{id: 1, name: "test", gender: "male"}
```
Như vậy, việc thêm một phần tử vào `Map` và `Object`, việc sử dụng `key` giúp ta không cần phải quét qua hết qua tất cả từng phần tử một 😛

### Remove element

##### Object
Đối với một `object`, không có các `built-in method` nào để xóa các `property` của một `object` mà chúng ta sử dụng:
<br/>

```js
delete obj.id;
//{name: "test", gender: "male"}
```
<br/>

**`delete` operator** trả về dạng `boolean`:
* `true` : cho tất cả các trường hợp NGOẠI TRỪ đối với các **own non-configurable property**
* `false` : trong `NON-strict mode`; hoặc ném về `Exception error` trong `strict mode`.

Một cách khác:
<br/>

`obj.id = undefined;`
<br/>

Hai cách này có khác nhau gì không? Xét về `logic` thì nó có khác một chút:
* **`delete(key)`**: xóa hẳn `key`(`property`) khỏi `object` đó luôn
* **setting `obj[key] = undefined`**: chỉ thay đổi giá trị của `key` đó thành `undefined`, `key`(`property`) vẫn còn đó

  ##### Side-effects:

  Điều này dẫn tới một `side-effect` với `for...in...`, nó sẽ thực hiện lặp qua tất các `key`, và kể cả các `key` có `value` là `undefined`. Và dĩ nhiên việc check property có tồn tại trong đối tượng đó hay không trong 2 cách trên sẽ cho ra 2 kết quả khác nhau 😄😄 ngoại trừ việc kiểm tra:
  <br/>
  
  `obj.id === undefined;// (same result)`
    <br/>
    
  Do đó, chúng ta nên chú ý khi quyết định sử dụng cách nào đó để xóa `property` của một `object` để nâng cao `performance` *(giả sử vậy)*, và nói vui thì, *tối ưu non đôi khi không đáng, mà dễ gây ra lỗi nữa đúng không nào* 😀😀 
  
##### Map
Với `Map`, ta có các `built-in methods` hỗ trợ sẵn, chẳng hạn:
* **`delete(key)`**: `method` này trả về giá trị kiểu `boolean`, đúng khi key đó tồn tại trong `Map` và đã được xóa thành công, `false` khi `key` đó không tồn tại trong `Map`:
```js
    var isDeleteSucceeded = map.delete(1); //{ 2=>3, 4=>5}
    console.log(isDeleteSucceeded); //true
```
* **`clear()`**: xóa TẤT CẢ các phần tử trong `Map`:
<br/>

  `map.clear(); //{}`
  <br/>

  So sánh một chút, với case này, `Object` phải thực hiện lặp qua từng `property` và xóa nó lần lượt phải không nào 😄😄
  
### Nhận xét
*Nhìn chung, cả hiệu năng của `Map` và `Object` trong việc `Add/Remove element` khá giống nhau. Xóa một `key` sẽ mất `O(1)`, trong khi xóa tất cả các phần tử là `O(n)` với `n` là kích thước của `Map/Object`.* 

*Tiếp theo, chúng ta xét thêm một khía cạnh nữa của `Map` và `Object` nhé* 🤭🤭

## Behaves

### Getting the size
Điểm này `Map` khá giống với `Array`, Map sẽ tự động update size tự động, chúng ta chỉ cần gọi ra các `build-in`:
```js
// Map
console.log(map.size);//0
```

Ngược lại, với `Object`, chúng ta phải dùng các `build-in-chạy-bằng-cơm` 😄😄:
```js
let size = Object.keys(obj).length;
console.log(size); //2
```

### Iterating

> Map is built-in iterable — Object is not.

Cách bạn có thể check được loại đó có tính iterable hay không:
```js
//typeof <obj>[Symbol.iterator] === 'function'
console.log(typeof obj[Symbol.iterator]); //undefined
console.log(typeof map[Symbol.iterator]); //function
```
Ouhh, khoan đã nào, ta cùng điểm qua một chút về đặc trưng của tính chất `iterable` nhé:
Ta nói `Map` có tính `iterable` nghĩa là trong `Map` ta có thể sử dụng `for… of...`:
```js
//For map: { 2=>3, 4=>5}
for (const item of map){
    console.log(item); 
    //Array[2,3]
    //Array[4,5]
}
```
hay
```js
for (const [key,value] of map){
    console.log(`key: ${key}, value: ${value}`);
    //key: 2, value: 3
    //key: 4, value: 5
}
```
hoặc *built-in `forEach()`*:
```js
map.forEach((value, key) => console.log(`key: ${key}, value: ${value}`));
//key: 2, value: 3
//key: 4, value: 5
```
Nhưng với `Object`, ta sử dụng `for… in...`:
```js
{id: 1, name: "test"}
for (var key in obj){
   console.log(`key: ${key}, value: ${obj[key]}`);
   //key: id, value: 1
   //key: name, value: test
}
```
Hoặc dùng `Object.keys(obj)` để lấy về một mảng keys và tiến hành lặp .forEach() cho mảng đó:
```js
Object.keys(obj).forEach(
    (key) => console.log(`key: ${key}, value: ${obj[key]}`)
);
//key: id, value: 1
//key: name, value: test
```

<br/>

*Okay, tới đây thì cho dù có khác về hướng xử lý đi chăng nữa, `Object` và `Map` vẫn có cấu trúc và hiệu năng như nhau. Được hỗ trợ bởi đa dạng các `build-in methods` thì có vẻ như `Map` chiếm ưu thế hơn. Bạn nghĩ như thế nào nếu ta ưu tiên dùng `Map` mà bỏ `Object`?*

## When to use `Map`? When to use `Object`?

*Mặc dù ở phần trên, `Map` "được lòng" hơn `Object` một chút, song, vẫn có những trường hợp mà `Object` sẽ xử lý tốt hơn `Map`. Dù sao thì **`Object` cũng là `concept` cơ bản nhất của Javascript** cơ mà* 😛😛
<br/>
<br/>

##### Khi nào dùng `Object`?
<br/>

`Object` là lựa chọn tuyệt vời cho các case như:

* **Structure Data**: cấu trúc đơn giản, tất cả các `key` là *chuỗi || số nguyên*. Bởi vì việc tạo một đối tượng đơn giản & truy cập `property` thuận tiện hơn nhiều so với việc tạo một `Map` rồi truy cập các phần tử qua `.set()`, `.get()` đúng không nào.
* **Logic separation**: Dùng `Object` khi cần phân chia logic riêng biệt:
```js
var obj = {
    id: 1,
    name: "It's Me!",
    print: function(){
        return `Object Id: ${this.id}, with Name: ${this.name}`;
    }
}
console.log(obj.print());//Object Id: 1, with Name: It's Me.
```


* **JSON support**:
    *  `JSON` hỗ trợ chuyển trực tiếp sang `Object` và ngược lại, còn `Map` thì chưa. Nên trường hợp mình cần thao tác nhiều với `JSON` (đa số là thế), `Object` là một lựa chọn phù hợp.

<br/>

##### Khi nào dùng `Map`?

* **Purely hash**: `Map` hoàn toàn là hàm băm; `Object` hơn thế một chút vì còn hỗ trợ logic bên trong nữa. Song, việc dùng `delete operator` đôi khi gây ra nhiều vấn đề về hiệu năng *(chúng ta sẽ cùng nhau tìm hiểu cụ thể nó trong một bài viết khác)*
* **Key order**: `Map` giữ nguyên bản các thứ tự của `keys`, nên sẽ được dùng trong các trường hợp thứ tự của các `key` có ý nghĩa.
  Nó đảm bảo `stable iteration performance` trên tất cả các trình duyệt.

* **Large set of data**: `Map` hoạt động tốt hơn trong việc lưu trự các bộ dữ liệu lớn.
    
## Kết

Nhìn chung, việc sử dụng `Map` hay `Object` còn phụ thuộc vào nhiều yếu tố như kiểu dữ liệu, số lượng bản ghi hay các thao tác sẽ thực hiện với nó, từ đó ta sẽ có lựa chọn phù hợp.

`Map` và `Object` không thể thay thế nhau. Không có cái nào tốt hơn mà chỉ có cái phù hợp hơn với `context` thôi đúng không nào 😄😄

Cho tới thời điểm hiện tại, cá nhân mình sử dụng `Object` nhiều hơn, đa phần vì cũng tiện và dữ liệu của mình không quá phức tạp nữa. Khi bản `ES6` ra đời thì thấy `Map` cũng hay ho và có vẻ thú vị nên mình viết bài này để chúng ta cùng nhau thảo luận. 
Bạn thích dùng cái nào hơn, chia sẻ cho mình biết ở dưới comments nhé !

![](https://data.whicdn.com/images/289858257/original.gif)

Cảm ơn vì đã đọc bài viết của mình. Nếu nó mang lại giá trị, tặng mình một `upvote` để có thêm động lực cho các bài tiếp theo nhé. Bạn có thể tham khảo thêm các bài viết về Tech [tại đây](http://haodev.wordpress.com). 

Chúc bạn có một tuần làm việc hiệu quả !

Happy Coding ❤

<br/>
<br/>

*Reference: [Complete Javascript](https://completejavascript.com/so-sanh-map-voi-object-trong-javascript), [Medium](https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373), [Stackoverflow](https://stackoverflow.com/questions/18541940/map-vs-object-in-javascript).*