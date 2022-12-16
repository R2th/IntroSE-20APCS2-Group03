Chào mừng anh em đã trở lại với series Javascript của mình ( mới tạo ) :stuck_out_tongue_winking_eye:

Như anh em đã biết thì **objects** được sử dụng để lưu trữ nhiều giá trị như một cấu trúc dữ liệu phức tạp.

Một object khi được khởi tạo thường được bao quanh bới 2 dấu nhọn `{...} ` đi kèm một list các properties. Một properties là một cặp **key - value** trong đó **key** luôn luôn là một **string**, còn value có thể mang bất cứ **type** nào.

Còn **arrays** là một mảng có thứ tự và chứa dữ liệu thuộc bất kì type nào. Mảng thường được khởi tạo bằng dấu ngoặc vuông  `[...]`, và trong mảng cho phép phần tử trùng lặp.

Cho đến ES6 (ECMAScript 2015), Trong JavaScript thì  **objects** và **arrays** là hai cấu trúc dữ liệu quan trọng nhất để xử lý dữ liệu, điều mà anh em làm thường ngày luôn.Chúng ta thì không có nhiều lựa chọn ngoài việc sử dụng hai thằng này. 

Tuy nhiên thì cái gì nó cũng có vài sự bất tiện khi sử dụng :

- Key của thằng **objects** chỉ có **types** là **string**.
- Khi anh em chèn thêm phần tử thì thằng **objects** sẽ không thể **duy trì được thứ tự các phần tử**.
- Không thể tính toán được **length** của một **object** một cách dễ dàng.
- **Arrays** là tập hợp các phần tử cho phép trùng lặp. Hỗ trợ cho **arrays** chỉ có các phần tử riêng biệt và bắt buộc chúng ta phải thêm xử lí logic.

Và để giải quyết những thiếu sót ở trên **Map** và **Set** đã được ra đời. Trong bài viết này, mình sẽ cùng anh em tìm hiểu cả hai và  cách sử dụng chúng trong các trường hợp khác nhau.

# Map :
**Map** là tập hợp các cặp **key - value** trong đó **key** có thể thuộc bất kỳ type nào. **Map** ghi nhớ thứ tự chèn ban đầu các phần tử của nó, có nghĩa là dữ liệu có thể được truy xuất theo đúng thứ tự đã được chèn vào.

Chúng ta có thể khởi tạo Map như sau :
```js
const map = new Map()
map 
// sẽ trả ra như sau Map(0) {}
```
Cũng có thể khởi tạo với initial Value :
```js
const map2 = new Map([
['name', 'ky'],
['age', '18']
]);

// kết quả chúng ta sẽ được như sau :
Map(2) {"name" => "ky", "age" => "18"}
```
# Để add value cho Map ta làm như sau :
```js
const map = new Map();

map.set('name','sun*');
map.set('team','R&D');

// Chúng ta sẽ được kết quả như sau :

Map(2) {"name" => "sun*", "team" => "R&D"}
```
Như anh em đã thấy ở trên , mình đã sử dụng **set (key, value)** để add thêm value cho **map**.

**set(key, value)**  có hai tham số truyền vào là  **key** và **value**, key và value có thể là bất cứ type giá trị nào ( boolean, string, number, ...) hoặc một đối tượng.

NOTE : Nếu anh em set thêm một giá trị mà trùng key thì nó sẽ không thêm mới đâu nhé, mà là chèn giá trị đó lên trên giá trị cũ 

```js
map.set('name', 'Sun* edited');

// Chúng ta có kết quả trả ra như sau :
Map(2) {"name" => "Sun* edited", "team" => "R&D"}
```

#  Làm sao để lấy value ra khỏi Map :
Đơn giản thôi anh em làm như sau :

```js
map.get('name');

// Chúng ta sẽ được như sau :
"Sun* edited"
```

# Về Map keys :
**Keys** của **Map** có thể thuộc bất cứ type nào. Đây cũng  là một trong những điểm khác biệt của **Map** với các **đối tượng JavaScript thông thường** ( keys chỉ có thể là một string ).

Ví dụ :

```js
const test = new Map()

test.set(true, 'R&D Unit');  // key là type boolean
test.set(1997, 'nam sinh tiep'); // key là type number
 let objA = { 'name' : 'ky', 'age' : 18 };
 test.set( objA, true );
 
 Kết quả ta được như sau:
 Map(3) { true => "R&D Unit", 1997 => "nam sinh tiep", {…} => true }
```
# Properties và methods của Map:
Map  có sẵn các properties và methods đã được xây dựng sẵn để sử dụng :

- Muốn biết size thì chúng ta sử dụng **size**  :
```js
test.size
Kết quả trả ra : 3
```

- Muốn tìm kiếm một phần tử ta sử dụng has với param truyền vào là key của phần tử đó, **has**  sẽ trả ra **true** nếu có phần tử đó và ngược lại :
```js
test.has(1997);

// Kết quả : true

test.has('hahahaha')

// Kết quả : false 
```
- Xóa một phần tử ta sử dụng delete cùng với param vẫn là key :
```js
test.delete(1997);

//Kết quả trả ra là: true
Và test của chúng ta còn lại gì ?

// Map(2) {true => "R&D Unit", {…} => true}
```
- Muốn xóa all phần tử trong Map, ta sử dụng **clear** :

```js
test.clear()

// Kiểm tra size nào : test.size; ta được kết quả bằng 0
```

# MapIterator: keys(), values(), and entries() :

Các methods **keys()**, **values(**) and **entries()**  trả về một MapIterator, rất hữu ích trong việc đi cùng for-of hoặc foreach.

Ta tạo ra một Map mới như sau :
```js
const peopleArr = new Map([
['Nam',24],
['Long',30],
['Thu',24],
['Ha',22]
])
```

- Lấy tất cả các keys ta làm như sau :
```js
peopleArr.keys()

//Kết quả trả ra : MapIterator {"Nam", "Long", "Thu", "Ha"}
```
- Tương tự muốn lấy ra tất cả values :

```js
peopleArr.values()

// Ta được kết quả như sau : MapIterator {24, 30, 24, 22}
```

- Cuối cùng, muốn lấy all cả keys và values chúng ta sử dụng entries() :

```js
peopleArr.entries()

// Ta được kết quả như sau : MapIterator {"Nam" => 24, "Long" => 30, "Thu" => 24, "Ha" => 22}
```

# Sử dụng cùng với for-of và foreach : 

```js
// Sử dụng cùng với foreach :

peopleArr.forEach((key, value) => {
console.log(`${key} năm nay ${value} tuổi`);
})

// Sử dụng cùng với for-of

for(const [key, value] of peopleArr) {
 console.log(`${key} năm nay ${value} tuổi`)
}

// Cả hai đều cho ra kết quả như sau :

Nam năm nay 24 tuổi
Long năm nay 30 tuổi
Thu năm nay 24 tuổi
Ha năm nay 22 tuổi
```

# Chuyển một Object thành một Map như thế nào ?

```js
Chúng ta làm như sau :
const country = {
'Name' : 'Ha Noi',
'Region' : 'Mien Bac',
}

const countryMap = new Map(Object.entries(country));

//Kết quả trả ra như sau :
Map(2) {"Name" => "Ha Noi", "Region" => "Mien Bac"}
```
 Muốn chuyển ngược lại cũng easy :
 
```js
Object.fromEntries(countryMap)

// ra nè : {Name: "Ha Noi", Region: "Mien Bac"}
```
# Chuyển một Map thành một Array ?
```js
Array.from(countryMap)

//Được kết quả như sau :

(2) [Array(2), Array(2)]
0: (2) ["Name", "Ha Noi"]
1: (2) ["Region", "Mien Bac"]
length: 2
__proto__: Array(0)
```

# Kết luận phần 1 : Khi nào sử dụng Map, khi nào dùng Object :
**Map** có đặc điểm của cả **object** và **array**. Tuy nhiên, **Map** giống như một object hơn là **array** do bản chất của việc lưu trữ dữ liệu ở dạng **key-value**.

Theo ý kiến cá nhân của mình thì anh em sử dụng **Map** khi :

- Khi mà anh em muốn dữ liệu trả về của mình không đơn giản, và muốn tạo các **keys** của mình không phải dạng **String**. 
- Dự liệu trả về là các elements được sắp xếp theo thứ tự. Còn **Objects** thì không thể duy trì được thứ tự.
- Với các methods rất hữu dụng như **has()**, **values()**, **delete()**, hay một **size**, **Map** giúp anh em dễ dàng thực hiện các thao tác hơn rất nhiều. Điều này giúp chúng ta giảm thiểu việc sử dụng package hỗ trợ của bên thứ ba như **lodash**.

Còn Objects khi :
- Anh em không có nhu cầu như phía trên =))

Trên đây là những tìm hiểu của mình về Map, nếu thấy hay thì anh em hãy follow  và upvote cho mình để mình có động lúc viết tiếp phần 2 nhé ( Phần 2 sẽ nói về thằng Set ).