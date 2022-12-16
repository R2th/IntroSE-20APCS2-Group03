Trong javascript, dev thường dùng nhiều thời gian vào việc quyết định kiểu cấu trúc dữ liệu chuẩn có thể giúp thao tác sau này dễ dàng hơn, tiết kiệm thời gian và làm cho code dễ hiểu hơn. Hai cấu trúc dữ liệu phổ biến để lưu trữ data là Objects và Arrays (cũng là một loại object). Dev sử dụng Objects để lưu trữ cặp key/value và Arrays để lưu trữ danh sách chỉ mục. Tuy nhiên, để mang đến cho dev sự uyển chuyển nhiều hơn, ECMAScript 2015 giới thiệu 2 loại Object mới là Map, được sắp xếp theo bộ các cặp key/value và Set, là một bộ các cặp giá trị duy nhất.
trong hướng dẫn này, bạn sẽ tìm hiểu về Map và Set, làm cho chúng giống hoặc khác với Object và Array, các thuộc tính và phương thức có sẵn của chúng và ví dụ về một số cách sử dụng trong thực tế.
# 1. Map
Map là một tập hợp các cặp key/value có thể sử dụng mọi kiểu dữ liệu làm key và có thể duy trì thứ tự các phần tử của nó. Map có các yếu tố của Object (bộ key/value duy nhất ) và Array (một tập hợp được sắp xếp ), nhưng tượng tự như khái niệm object. Điều này là vì mặc dù kích thước và thứ tự của các phần tử được lưu trữ như một array, các phần tử vẫn là các cặp key/value như object.
Map có thể được khởi tạo với cú pháp và điều này sinh ra một map rỗng. :
```
const map = new Map()
=> Map(0) {}
```
## Thêm giá trị vào Map
Có thể thêm giá trị vào map với phương thức` set()`. Tham số đầu tiên có thể là 1 key, và thứ hai là value.  Ở đây chúng ta bắt đầu thấy Map có các yếu tố của object và array. Giống array, chúng ta có một bộ các phần tử với chỉ mục (index) từ 0, và chúng ta có thể thấy có bao nhiêu phần tử mặc định trong Map. Map sử dụng cú pháp `=>` để biểu thị key/value `key => value`
```
map.set('firstName', 'Luke')
map.set('lastName', 'Skywalker')
map.set('occupation', 'Jedi Knight')

=>
Map(3)
0: {"firstName" => "Luke"}
1: {"lastName" => "Skywalker"}
2: {"occupation" => "Jedi Knight"}
```
Ví dụ trên trông giống object thông thường với key là chuỗi, nhưng chúng ta có thể dùng bất kì kiểu dữ liệu nào cho key trong Map.
Ngoài cách thủ công set value cho Map chúng ta có thể khởi tạo Map với value có sẵn. Chúng ta sử dụng điều này bằng cách sử dụng array của array để chứa hai phần tử là mỗi cặp 1 key/value trông như sau:
```
[ ['key1', 'value1'],
  ['key2', 'value2'] ]
```
Sử dụng cú pháp sau, chúng ta có thể tạo lại cùng 1 map
```
const map = new Map([
  ['firstName', 'Luke'],
  ['lastName', 'Skywalker'],
  ['occupation', 'Jedi Knight'],
])
```
Ngẫu nhiên, cú pháp này giống như kết quả khi gọi Object.entries() trên 1 object.  Điều này cung cấp một cách sẵn sàng để chuyển object thành map, như trong đoạn code sau:
```
const luke = {
  firstName: 'Luke',
  lastName: 'Skywalker',
  occupation: 'Jedi Knight',
}

const map = new Map(Object.entries(luke))
```
Hoặc, bạn có thể biến map thành object hoặc array với 1 dòng code như sau :
```
const obj = Object.fromEntries(map)
=> {firstName: "Luke", lastName: "Skywalker", occupation: "Jedi Knight"}

const arr = Array.from(map)
=> kết quả :
[ ['firstName', 'Luke'],
  ['lastName', 'Skywalker']
  ['occupation', 'Jedi Knight'] ]
```
## Keys trong map
Map chấp nhận bất kì kiểu dữ liệu nào key, và không cho phép trùng lặp key value. Chúng ta có thể chứng minh điều này bằng cách tạo 1 map và sử dụng giá trị không phải chuỗi, như cài đặt 2 giá trị cùng 1 key:
```
const map = new Map()

map.set('1', 'String one')
map.set(1, 'This will be overwritten')
map.set(1, 'Number one')
map.set(true, 'A Boolean')
```
Ví dụ trên sẽ ghi đè key đầu tiên là 1 bằng khóa tiếp theo, nó sẽ coi '1'  và 1 là các khóa duy nhất.
```
0: {"1" => "String one"}
1: {1 => "Number one"}
2: {true => "A Boolean"}
```
Mặc dù nói là 1 object thông thường có thể xử lý number, booleans, và các kiểu dữ liệu khác làm khóa nhưng thực tế lại không phải vậy vì object thay đổi tất cả thành các key là chuỗi.
Như 1 ví dụ, khởi tạo object với key là number và so sánh value cho key là số 1 và '1' được xâu chuỗi :
```
// Initialize an object with a numerical key
const obj = { 1: 'One' }

// The key is actually a string
obj[1] === obj['1'] // true
```
Đây là lý do tại sao nếu bạn cố gắng sử dụng object làm key, nó sẽ in ra đối tượng chuỗi object Object. Ví dụ , tạo 1 object và sau đó sử dụng nó làm key của object khác.
```
// Create an object
const objAsKey = { foo: 'bar' }

// Use this object as the key of another object
const obj = {
  [objAsKey]: 'What will happen?',
}
kết quả :
{[object Object]: "What will happen?"}
```
Đây không phải trường hợp của Map, thử tạo một object và đặt nó làm key của map:
```
// Create an object
const objAsKey = { foo: 'bar' }

const map = new Map()

// Set this object as the key of a Map
map.set(objAsKey, 'What will happen?')

key: {foo: "bar"}
value: "What will happen?"
```
Có một điều quan trọng là ghi chú về sử dụng object/array như một key : Map được sử dụng tham chiếu đến object để so sánh sự bình đẳng, không phải giá trị theo nghĩa đen của object. Trong javascript,` {} === {}` return false, bởi vì 2 object không giống nhau mặc dù cùng value là rỗng. Điều này nghĩa là thêm 2 object duy nhất với cùng giá trị sẽ tạo Map với 2 mục :
```
// Add two unique but similar objects as keys to a Map
map.set({}, 'One')
map.set({}, 'Two')
kết quả :
Map(2) {{…} => "One", {…} => "Two"}
nhưng cùng object tham chiếu 2 lần thì tạo 1 Map với 1 mục
// Add the same exact object twice as keys to a Map
const obj = {}

map.set(obj, 'One')
map.set(obj, 'Two')
=> Map(1) {{…} => "Two"}
```
set() thứ 2 đang cập nhật key chính xác giống như key thứ nhất vì vậy ta kết thúc với 1 map chỉ có 1 value.
## Lấy và xóa phần tử từ Map
Một trong những nhược điểm của làm việc với Object là có thể khó khăn để liệt kê chúng, hoặc làm việc với tất cả keys hoặc values. Cấu trúc Map ngược lại, có rất nhiều thuộc tính tích hợp làm việc với các yếu tố tốt hơn.
Chúng ta có thể khởi tạo một Map để chứng minh các phương thức và thuộc tính sau: `delete(), has(), get(), size`
```
// Initialize a new Map
const map = new Map([
  ['animal', 'otter'],
  ['shape', 'triangle'],
  ['city', 'New York'],
  ['country', 'Bulgaria'],
])
```
Sử dụng `has()` để check sự tồn tại của 1 phần tử trong map, trả về giá trị boolean.
```
// Check if a key exists in a Map
map.has('shark') // false
map.has('country') // true
```
Lấy ra một value từ key
```
// Get an item from a Map
map.get('animal') // "otter"
```
Một lợi ích đặc biệt mà Map có trên object là bạn có thể tìm thấy size của Map bất cứ lúc nào, giống như với Array. Bạn có thể lấy số lượng phần tử trong Map với size(). Điều này bao gồm ít bước hơn là chuyển một object thành array và tìm độ dài.
```
// Get the count of items in a Map
map.size // 4
```
Phương thức `delete() `để xóa một item khỏi Map bằng key của nó. Phương thức này sẽ trả về giá trị true false.
```
// Delete an item from a Map by key
map.delete('city') // true

kết quả sau khi delete() :

Map(3) {"animal" => "otter", "shape" => "triangle", "country" => "Bulgaria"}
```
Cuối cùng, Map có thể bị xóa tất cả với phương thức clear()
```
map.clear()
Map(0) {}
```
## Keys, values, entries 
Object có thể lấy keys, values và entries bằng cách sử dụng các thuộc tính của object. Maps, bằng cách khác, có phương thức prototype cho phép lấy ra keys, values, entries của Map trực tiếp.
Các method `keys(), values(), entries()` đều trả về một MapIterator, tương tự như Array có thể dùng vòng lặp for..of để lấy ra values.
Ví dụ :
```
const map = new Map([
  [1970, 'bell bottoms'],
  [1980, 'leg warmers'],
  [1990, 'flannel'],
])

map.keys()
MapIterator {1970, 1980, 1990}
The values() method returns the values:
map.values()
MapIterator {"bell bottoms", "leg warmers", "flannel"}
The entries() method returns an array of key/value pairs:
map.entries()
MapIterator {1970 => "bell bottoms", 1980 => "leg warmers", 1990 => "flannel"}
```
## Vòng lặp với Map
Map có phương thức tích hợp forEach, giống như Array. Tuy nhiên, có một điểm khác nhau nho nhỏ trong cách lặp. callback của forEach trong Map lặp lại value, key và map chính nó, trong khi đó Array lặp lại item, index và chính mảng đó.
```
// Map
Map.prototype.forEach((value, key, map) = () => {}

// Array
Array.prototype.forEach((item, index, array) = () => {}
```
Đây là một lợi ích lớn của Map trên Object, vì object cần convert với keys(), values() hoặc entries(), và không có một cách đơn giản nào để lấy ra thuộc tính của một object nếu không convert nó.
Để chứng minh điều này, cùng lặp một Map và in key/value ra console:
```
// Log the keys and values of the Map with forEach
map.forEach((value, key) => {
  console.log(`${key}: ${value}`)
})
=> 1970: bell bottoms
1980: leg warmers
1990: flannel
```
Vì một vòng lặp for..of lặp đi lặp lại như Map và array, chúng ta có thể lấy kết quả chính xác bằng cách tách array của các phần tử map .
```
// Destructure the key and value out of the Map item
for (const [key, value] of map) {
  // Log the keys and values of the Map with for...of
  console.log(`${key}: ${value}`)
}
```
## Thuộc tính và phương thức của Map
![](https://images.viblo.asia/f2f9ca2a-bd42-4f5e-81c4-f55883f6a18b.png)
## Khi nào sử dụng Map?
Tóm lại, Maps giống với Object khi chúng cũng có các cặp key/value. Nhưng Map có các lợi ích hơn Object như :
- size : có thuộc tính size, Objects không có tích hợp để lấy ra size của nó.
- vòng lặp : Map có thể lặp lại trực tiếp, còn Object thì không.
- tính linh hoạt : Maps có thể có bất kì kiểu dữ liệu nào làm key cho 1 value, còn Object thì chỉ là chuỗi.
- sắp xếp : Map giữ lại thứ tự chèn của chúng, trong khi objects không có thứ tự bảo đảm.
Do những yếu tố này, Map là một cấu trúc dữ liệu mạnh. Tuy nhiên, object cũng có một số lợi ích quan trọng
- json : object làm việc hoàn hảo với JSON.parse() và JSON.stringify(), hai hàm thiết yếu khi làm việc với JSON, một kiểu data phổ biến mà nhiều REST API sử dụng.
- làm việc với một element : làm việc với một giá trị đã biết trong object, ban có thể truy cập trực tiếp bằng key mà không cần sử dụng phương thức, chẳng hạn như get() của Map.

Danh sách này sẽ giúp bạn quyết định nếu Map hoặc Object sẽ là kiểu dữ liệu phù hợp cho bạn.

# SET
Set là tập hợp các giá trị duy nhất. Không giống như Map, Set về mặt khái niệm tương tự như Array hơn là Object, vì đây là danh sách các giá trị chứ không phải cặp key / value. Tuy nhiên, Set không phải là sự thay thế cho array , mà là phần bổ sung để cung cấp hỗ trợ bổ sung để làm việc với dữ liệu trùng lặp.  Có thể khởi tạo Set với cú pháp sau :
```
const set = new Set()

tạo ra một Set rỗng :
Set(0) {}
```
Các phần tử có thể được thêm vào Set với add() method. (không bị nhầm lẫn với set() trong Map dù chúng tương tự nhau)
```
// Add items to a Set
set.add('Beethoven')
set.add('Mozart')
set.add('Chopin')
```
Vì Set chỉ có thể chứa các giá trị duy nhất, mọi nỗ lực thêm giá trị đã tồn tại sẽ bị bỏ qua.
`set.add('Chopin') // Set will still contain 3 unique values`
Lưu ý :
So sánh bằng nhau tương tự áp dụng cho các key của Map và các phần tử Set . Hai đối tượng có cùng giá trị nhưng không chia sẻ cùng một tham chiếu sẽ không được coi là bằng nhau.
Bạn cũng có thể khởi tạo Set với một mảng các giá trị. Nếu có các giá trị trùng lặp trong mảng, chúng sẽ bị xóa khỏi Tập hợp.
```
// Initialize a Set from an Array
const set = new Set(['Beethoven', 'Mozart', 'Chopin', 'Chopin'])
Set(3) {"Beethoven", "Mozart", "Chopin"}
```
Ngược lại, một Set có thể được chuyển đổi thành một Mảng :
```
const arr = [...set]
(3) ["Beethoven", "Mozart", "Chopin"]
```
Set có nhiều phương thức và thuộc tính giống như Map, bao gồm `delete (), has (), clear ()` và `size.`
```
set.delete('Beethoven') // true

// Check for the existence of an item
set.has('Beethoven') // false

// Clear a Set
set.clear()

// Check the size of a Set
set.size // 0
```
Lưu ý rằng Set không phải là cách để truy cập đến value qua key hoặc index, giống như Map.get(key) hoặc arr[index]
## Keys, Values, and Entries for Sets
Cả Map và Set đều có các phương thức key (), value () và entries () trả về 1 vòng lặp. Tuy nhiên, trong khi mỗi một phương thức trong các phương thức này có một mục đích riêng biệt trong Map, Set không có key và do đó, key là alias (bí danh) cho các values. Điều này có nghĩa là cả keys () và values () sẽ trả về cùng một vòng lặp và các entries () sẽ trả về giá trị hai lần. Điều hợp lý nhất là chỉ sử dụng các values() với Set, vì hai phương thức còn lại tồn tại để thống nhất và tương thích chéo với Map.
```
const set = new Set([1, 2, 3])
// Get the values of a set
set.values()
SetIterator {1, 2, 3}
```
## Vòng lặp trong Set
Giống như Map, Set cũng có tích hợp phương thức forEach(). do Set không có key, tham số thứ nhất và thứ hai của forEach() trả về cùng 1 giá trị, do đó không có trường hợp sử dụng nào cho nó ngoài khả năng tương thích với Map. các tham số của forEach() là value, ket, set.
Cả forEach và for..of đều có thể được sử dụng trên Set. Đầu tiên, chúng ta hãy thử với forEach():
```
const set = new Set(['hi', 'hello', 'good day'])

// Iterate a Set with forEach
set.forEach(value => console.log(value))

giờ hãy thử dùng for..of:
// Iterate a Set with for...of
for (const value of set) {
  console.log(value)
}
```
Cả hai cách đều ra kết qủa :
```
hi
hello
good day
```
## Thuộc tính và phương thức
![](https://images.viblo.asia/360bfc9c-1b29-436d-8373-fefa64c39f2f.png)

## Khi nào sử dụng Set?
Set là một bổ sung hữu ích cho bộ công cụ JavaScript của bạn, đặc biệt để làm việc với các giá trị trùng lặp trong dữ liệu. Trong một dòng duy nhất, chúng ta có thể tạo một Mảng mới mà không cần các giá trị trùng lặp từ một Mảng có các giá trị trùng lặp.
```
const uniqueArray = [...new Set([1, 1, 2, 2, 2, 3])] // (3) [1, 2, 3]
=> (3) [1, 2, 3]
```
Set có thể được dùng để tìm kiếm liên kết, điểm chung, sự khác biệt giữa hai bộ dữ liệu. tuy nhiên, arrays có một lợi thế đáng kể so với Set để thao tác bổ sung dữ liệu do các phương thức sort (), map (), filter () và less (), cũng như tương thích trực tiếp với các phương thức JSON.
# Kết luận :
Trong bài viết này, bạn đã biết rằng Map là một tập hợp các cặp key / value được sắp xếp và Set là một tập hợp các giá trị duy nhất. Cả hai cấu trúc dữ liệu này đều bổ sung các khả năng cho JavaScript và đơn giản hóa các tác vụ phổ biến như tìm độ dài của bộ sưu tập cặp key / value và loại bỏ các phần tử trùng lặp khỏi bộ dữ liệu. Mặt khác, các object và array thường được sử dụng để lưu trữ và thao tác dữ liệu trong JavaScript và có khả năng tương thích trực tiếp với JSON, tiếp tục biến chúng thành các cấu trúc dữ liệu thiết yếu nhất, đặc biệt là để làm việc với API REST. Map và Set chủ yếu hữu ích khi hỗ trợ cấu trúc dữ liệu cho object và array.

Nguồn : https://www.taniarascia.com/understanding-map-and-set-javascript/