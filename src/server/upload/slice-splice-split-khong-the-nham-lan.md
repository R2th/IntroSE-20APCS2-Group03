# Slice, Splice và Split (Anh em nhà S....)
Splice, Slice, Split cả ba function này đều bất đầu bằng chữ S.... và phát âm khá giống nhau. Nhiều lúc mình phải hỏi lại chị Google để có thể nhớ 3 function này là gì, đôi khi còn nhầm lẫn công dụng của mỗi function nữa. :innocent:

Bây giờ ta cùng tìm hiểu cách hoạt động của 3 function này nào !
## `Slice()`
`slice()` là sẽ **copy 1 phần của array** và trả về 1 **array mới không làm thay đổi array cũ**.
```js
let array = [1, 2, 3, "hello world", 4, 5];
let newArray = array.slice(0, 3);
```
Ta được kết quả như sau:
```js
//array
[1, 2, 3, "hello world", 4, 5]
//newArray
[1, 2, 3]
```
> Mảng được trả về là 1 mảng  **shallow copy** tức là nó sẽ truy suất vào mảng lồng trong mảng.
> Phương thức `slice()` có thể được dùng với chuỗi và sẽ trả ra một chuỗi mới.
```js
var b = 'ABCD'

var slicedStr = b.slice(1, 3);

console.log(b)
// "ABCD"
console.log(slicedStr)
// "BC"
```

## `Splice()`
Tên của `splice`  nghe khá giống với `slice` nên thường bị nhầm lẫn. Function `Splice()`  sẽ thay đổi array bằng cách xoá hoặc thêm mới một phần tử vào mảng.

### Xoá phần tử trong mảng
Để xoá phần tử trong mảng ta cần truyền vào vị trí cần xoá và số phần tử cần xoá.
```
array.splice(index, number of elements);
```
Nếu như ta không truyền vào tham số thứ 2, nó sẽ tự hiểu là sẽ xoá bắt đầu từ vị trí được chọn đến hết mảng.
```js
let array = [1, 2, 3, "hello world", 4, 5];
let arrayReceive = array.splice(1);
```
Ta sẽ được kết quả như sau:
```js
//arrayReceive
[2, 3, "hello world", 4, 5]
//array
[1]
```
Còn khi ta dùng cả 2 tham số. Nó sẽ xoá từ vị trí chỉ định đến số lượng cần cần xoá.
```js
let arrayReceive = array.splice(2, 1);
```
Kết quả
```js
// arrayReceive
[3]
// array
[1, 2, "hello world", 4, 5]
```

### Thêm phần tử trong mảng
Để thêm phần tử vào mảng thì cần tham số thứ 3 trở đi để biết thêm giá trị gì vào.
```js
let arrayResult = array.splice(1, 0, 9) // Xoá 0 phần tử ở vị trí 1, và thêm vào đấy giá trị 9

// arrayResult
[]
// array
[1, 2, 9, 3, "hello world", 4, 5]
```

## Split ()
2 phương thức `slice` và `splice` được sử dụng cho array, còn phương thức `split` được sử dụng cho string, và trả ra 1 mảng các phần tử được cắt từ chuỗi.
```
string.split(separator, limit);
```
Với tham số thứ nhất được dùng để định nghĩa chuỗi sẽ được cắt theo cách nào. VD theo dấu phẩy (,), khoảng trống ("  "), tham số thứ 2 được dùng để giới hạn số chuỗi được cắt nếu không có tham số thứ 2 mặc định sẽ cắt hết chuỗi theo tham số thứ 1.

```js
let array = array.toString();
// "1,2,3,"hello world",4,5"

array.split(",", 3);
// ["1", "2", "3"]
array.split(",");
["1", "2", "3", "hello world", "4", "5"]
```

Với hàm `split` ta có thể dễ dàng kiểm trả chuỗi đối xứng 1 cách dễ dàng.
```js
var str = "abcba";

function isPalindrome(str) {
  // cắt chuối thành array, sau đó đảo ngược cuối cùng join mảng lại với ''
  return str === str.split('').reverse().join(''); 
}

isPalindrome(str); // return true
```

### Tổng kết
#### Slice()
   - Copy phần tử từ một array
   - Trả về một mảng mới.
   - Không làm thay đổi array gốc.
   - Có thể dùng cho cả array và string
 #### Splice ()
 - Dùng để thêm hoặc xoá thần tử trong trong mảng.
 - Trả về một array chứa các phần tử đã được xoá.
 - Làm thay đổi array gốc.
 - Chỉ có thể dùng cho array.
 #### Split()
 - Chia chuỗi (string) thành các chuỗi con (substring).
 - Trả chuỗi (string) được chia thành một array.
 - Không làm thay đổi chuỗi (string) gốc.
 - Chỉ có thể dùng cho string.

### Tài liệu tham khảo

https://www.freecodecamp.org/news/lets-clear-up-the-confusion-around-the-slice-splice-split-methods-in-javascript-8ba3266c29ae/
https://medium.com/@jeanpan/javascript-splice-slice-split-745b1c1c05d2