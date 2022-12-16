Hi, xin chào các bạn, ở phần 1 và phần 2 chúng ta đã tìm hiểu được 15 method của array.

Trong phần 3 này, mình tiếp tục giới thiệu tới các bạn những method cũng khá quan trọng của array mà các devjs hay nhầm lẫn khi sử dụng điển hình như slice() với splice() :sweat_smile:. Ta bắt đầu thôi

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 16. slice()

`slice()` dịch ra tiếng Việt nôm na là cắt, lát, thái, bla bla,... và chức năng của nó cũng dùng để cắt bỏ một số phần tử của array

`slice()` trả về một bản sao tham chiếu (shallow copy) **một phần của mảng** dưới dạng một mảng nhận các giá trị có **chỉ số từ begin đến end (không bao gồm end)**

* `slice()` **KHÔNG làm thay đổi mảng ban đầu**
* `slice()` **trả về một mảng mới** sau khi cắt

**Với chỉ số dương**
```javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'pig'];
   //=> index    0       1        2       3         4         5

console.log(animals.slice());
console.log(animals.slice(2));     // lấy từ 2 tới arr.length
console.log(animals.slice(2, 4));  // lấy 2,3 => lấy begin, không lấy end
console.log(animals.slice(1, 6));  // lấy 1,2,3,4,5
                                   // nếu end > arr.length, sẽ lấy tới tới arr.length
console.log(animals);

> Array ["ant", "bison", "camel", "duck", "elephant", "pig"]
> Array ["camel", "duck", "elephant", "pig"]
> Array ["camel", "duck"]
> Array ["bison", "camel", "duck", "elephant", "pig"]
> Array ["ant", "bison", "camel", "duck", "elephant", "pig"]
```

**Với chỉ số âm**
```javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'pig'];
   //=> index    0       1        2       3         4         5
   //=> -index  -6      -5       -4      -3        -2        -1

console.log(animals.slice(-4));       // lấy từ -4 tới arr.length
console.log(animals.slice(-5, -2));   // lấy -5,-4,-3
console.log(animals.slice(2, -1));    // lấy từ 2 tới -1 <=> -4,-3,-2
console.log(animals);

> Array ["camel", "duck", "elephant", "pig"]
> Array ["bison", "camel", "duck"]
> Array ["camel", "duck", "elephant"]
> Array ["ant", "bison", "camel", "duck", "elephant", "pig"]
```

Khá xoắn não với quả âm dương này nhỉ :grin:

**Cú pháp**
```javascript
arr.slice()
arr.slice(begin)
arr.slice(begin, end)

/* begin (Không bắt buộc): Chỉ số bắt đầu chọn phần tử
  Nếu chỉ số này là số âm, được xem như tính ngược từ cuối của mảng.
  Nếu begin là undefined, slice() bắt đầu từ chỉ số 0 */
  
/* end (Không bắt buộc): Chỉ số ngừng chọn phần tử
  slice() chọn ra các phần tử có chỉ số trước chỉ số end
  Chỉ số âm tính ngược từ cuối mảng về
  Nếu tham số end không được truyền vào, slice() chọn đến cuối mảng (arr.length)
  Nếu end lớn hơn độ dài mảng, slice() chỉ chọn đến cuối mảng (arr.length) */
```

### 17. splice()

`splice()` dùng để thay đổi phần tử của mảng bằng cách **xóa phần tử đang tồn tại** hoặc **thêm vào phần tử mới**
* `splice()` **CÓ làm thay đổi mảng ban đầu**
* `splice()` **trả về mảng chứa các phần tử đã bị xoá**

Đây là con hàng khá rắc rối khi nó vừa thêm được phần tử, vừa xoá được phần tử và thay đổi trực tiếp lên array ban đầu nên nếu bạn không kiểm soát được các đối số truyền vào sẽ bị toang ngay. Cùng xem ví dụ sau

**Xoá phần tử với đối số `start`**
```javascript
var months = ['Jan', 'March', 'April', 'June'];
         //=>   0       1        2        3  

months.splice(2);    // xoá các phần từ từ index 2 tới arr.length
console.log(months); // > Array ["Jan", "March"]
```

**Xoá phần tử có thêm đối số `deleteCount`** (deleteCount : chỉ định số lượng các phần tử sẽ bị xóa)
```javascript
var months = ['Jan', 'March', 'April', 'June'];
         //=>   0       1        2        3  

months.splice(1, 2); // xoá đi 2 phần tử kể từ index 1
console.log(months); // > Array ["Jan", "June"]
```

**Thêm phần tử với đối số thứ 3**
```javascript
var months = ['Jan', 'March', 'April', 'June'];
         //=>   0       1        2        3  

months.splice(1, 0, 'Feb'); // chèn thêm phần tử vào index 1, không xoá phần tử nào
console.log(months);        // > Array ["Jan", "Feb", "March", "April", "June"]
```

**Thêm vào nhiều item**
```javascript
var months = ['Jan', 'March', 'April', 'June'];
         //=>   0       1        2        3  

months.splice(2, 1, 'Feb', 'May'); // chèn thêm 2 phần tử vào index 2, xoá 1 phần tử
console.log(months);               // > Array ["Jan", "March", "Feb", "May", "June"]
```

Cũng không khó đúng không, tập trung chút là ngấm, thỉnh thoảng deadline dí tới là lại quên nhẹ thôi :sweat_smile:

**Cú pháp**
```javascript
var arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

/* start: Vị trí để bắt đầu thay đổi mảng (mặc định là 0)
  + Nếu lớn hơn độ dài của mảng, thì start được thiết lập bằng độ dài của mảng
  + Nếu giá trị là âm, thì start bắt đầu từ các phần từ cuối mảng
  + Nếu array.length + start < 0, thì start bắt đầu từ 0 */

/* deleteCount (Không bắt buộc): Con số chỉ định số lượng các phần tử sẽ bị xóa
  + Nếu deleteCount bị bỏ qua hoặc có giá trị >= array.length - start
    thì tất cả các phần tử từ vị trí start đến cuối mảng sẽ bị xóa bỏ
  + Nếu deleteCount bằng 0 hoặc là số âm, không phần tử nào bị xóa
    trong trường hợp này bạn sẽ phải xác định ít nhất 1 phần tử mới */
    
/* item1, item2, ... (Không bắt buộc):
 Các phần tử thêm vào mảng, bắt đầu từ chỉ số start 
 Nếu không có, splice() sẽ chỉ xóa các phần tử trong mảng */
```

### 18. Array.from()

`Array.from()` dùng để **tạo mới một mảng** từ
* object giống mảng (object có length và các element được index)
* iterable objects (object có thể get được elements của nó, như `Map` và `Set`)

`Array.from()` trả về 1 array mới

```javascript
var arr1 = Array.from('foo');
var arr2 = Array.from([1, 2, 3], function(x) {
  return x * x;
});

console.log(arr1); // > Array ["f", "o", "o"]
console.log(arr2); // > Array [1, 4, 9]
```

**Cú pháp**
```javascript
Array.from(arrayLike[, mapFn[, thisArg]])

/* arrayLike: Đối tượng có tính chất giống mảng */

/* mapFn (Không bắt buộc): Hàm map() được gọi khi thực thi trên từng phần tử */

/* thisArg (Không bắt buộc): Giá trị được sử dụng như this,
  thường là tham chiếu đến phạm vi của đối tượng gọi */
```

### 19. Array.isArray()

`Array.isArray()` dùng để kiểm tra giá trị truyền vào có phải là một mảng kiểu `Array` hay không
* `Array.isArray()` trả về kiểu **Boolean**: `true` nếu là mảng và `false` nếu không phải mảng
```javascript
Array.isArray([1, 2, 3]);    // true
Array.isArray({ foo: 123 }); // false
Array.isArray('foobar');     // false
Array.isArray(undefined);    // false
```
**Cú pháp**
```javascript
Array.isArray(value)

// value: Giá trị được kiểm tra
```

## Tổng kết

Túm cái váy lại ta có bảng tổng kết tóm tắt sau

| Method | Chức năng| Giá trị trả về | Thay đổi mảng ban đầu |
| -------- | -------- | -------- | -------- |
|  `concat ()` | Nối 2 hay nhiều mảng | Mảng mới sau khi nối| Không |
| `filter ()` |  Lọc ra các phần tử thoả mãn điều kiện | Mảng mới sau khi lọc| Không |
| `find()` | Lọc ra phần tử đầu tiên thoả mãn điều kiện | Giá trị ĐẦU TIÊN tìm thấy/`undefined` | Không |
| `forEach ()`| Duyệt qua từng phần tử của mảng| `undefined`| - |
| `includes ()`| Kiểm tra xem phần tử có tồn tại trong mảng hay không|`true`/`false` | Không |
| `indexOf ()`| Tìm kiếm vị trí của phần tử trong mảng | Index ĐẦU TIÊN tìm thấy/`-1` | Không |
| `join()`| Tạo ra một chuỗi mới | Chuỗi mới/Chính phần tử đó/`""` | Không |
| `map()`| Tạo ra mảng mới nhờ biến đổi mảng ban đầu | Mảng mới sau khi biến đổi | Không |
| `pop()`| Xoá phần tử cuối cùng  ra khỏi mảng | Phần tử đã bị xoá/`undefined `| Có |
| `shift ()`| Xoá phần tử đầu tiên  ra khỏi mảng | Phần tử đã bị xoá/`undefined `| Có |
| `push()`| Thêm 1 hoặc nhiều phần tử vào cuối mảng | ĐỘ DÀI MỚI của mảng | Có |
| `unshift ()`| Thêm 1 hoặc nhiều phần tử vào đầu mảng | ĐỘ DÀI MỚI của mảng | Có |
| `reduce ()`| Thực thi hàm lên từng phần tử để thu về 1 giá trị  | Giá trị sau khi rút gọn| Không |
| `reverse ()`| Đảo ngược mảng | Mảng sau khi đảo ngược | Có |
| `some()`| Kiểm tra có ít nhất 1 phần tử thoả mãn điều kiện  | `true`/`false`| Không |
| `sort()`| Sắp xếp các phần tử trong mảng | Mảng sau khi được sắp xếp| Có |
| `slice ()`| Cắt bỏ một số phần tử của mảng | Mảng mới sau khi cắt| Không |
| `splice ()`| Thêm/xoá phần tử trong mảng | Mảng chứa các phần tử đã bị xoá | Có |
| `Array.from ()`| Tạo mới một mảng | Mảng mới | - |
| `Array.isArray ()`| Kiểm tra giá trị truyền vào có phải là một mảng| `true`/`false`| - |

## Kết luận

Ok có vẻ đủ rồi, còn một số method nữa nhưng mình thấy ít dùng nên cũng không list vào, nếu bạn muốn có thể tìm các tài liệu trên mạng nhé. Hi vọng sau khi đọc xong chuỗi bài này bạn đã có thể làm chủ được array, một con hàng sẽ được dùng rất nhiều với các devjs

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !

Hẹn gặp lại ở các bài viết sau !