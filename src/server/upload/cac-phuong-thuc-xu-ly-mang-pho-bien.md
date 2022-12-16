# Giới thiệu:

Định nghĩa cơ bản về `Array` (mảng):
- Mảng (Array) là một nơi cho phép chúng ta lưu trữ nhiều giá trị theo thứ tự nhất định trong một biến duy nhất.
Nó có thể chứa nhiều giá trị với kiểu dữ liệu khác nhau như là chuỗi, số, đối tượng... và chiều dài của mảng có thể tự động tăng lên hay giảm xuống khi chúng ta thực hiện thêm hay xóa các phần tử trong mảng.
- Vị trí (index) của các phần tử trong mảng sẽ bắt đầu từ số 0.

Nội dung sau đây mình muốn giới thiệu đó là "Các `method`(phương thức) xử lý mảng phổ biến" mà bạn sẽ sử dụng rất nhiều trong quá trình làm việc với mảng.

### 1. concat
- Phương thức `concat` dùng để nối 2 hoặc nhiều mảng.  
- Phương thức này không làm thay đổi các mảng ban đầu, nhưng thay vào đó nó trả về 1 mảng mới.

![image.png](https://images.viblo.asia/3107af96-bfb6-4eaa-a0da-98b8e0439763.png)

Cú pháp: 
```
concat()
concat(value0)
concat(value0, value1)
concat(value0, value1, ... , valueN)
```

### 2. every
- Phương thức` every` kiểm tra xem tất cả các phần tử trong mảng có thỏa mãn điều kiện hay không. Trả về giá trị là 1 boolean. 

   + Tất cả giá trị đều thỏa mãn điều kiện => `true`
   + 1 giá trị không thỏa mãn điều kiện =>  `false`

![image.png](https://images.viblo.asia/93d06d5d-8429-4987-adda-7b7bb7c29d8b.png)

**Cú pháp:**
```
// Arrow function
every((element) => { ... } )
every((element, index) => { ... } )
every((element, index, array) => { ... } )

// Callback function
every(callbackFn)
every(callbackFn, thisArg)

// Inline callback function
every(function callbackFn(element) { ... })
every(function callbackFn(element, index) { ... })
every(function callbackFn(element, index, array){ ... })
every(function callbackFn(element, index, array) { ... }, thisArg)
```

**Parameters:** (tham số)

```
- callbackFn: Là hàm test, dùng để kiểm tra từng phần tử của mảng. 
có 3 tham số truyền vào:

  + element: Phần tử đang được xử lý trong mảng
  + index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  + array (không bắt buộc): Mảng nguồn là hàm every() đang xử lý

- thisArg (không bắt buộc): Giá trị của this bên trong hàm callbackFn
```

### 3. filter
- Phương thức `filter` trả về 1 mảng mới với tất cả các phần tử thỏa mãn điều kiện

   +  Không làm thay đổi mảng ban đầu
   +  Trả về mảng rỗng nếu không có phần tử nào thỏa mãn điều kiện

![image.png](https://images.viblo.asia/42536e02-2b1c-4bf2-8c92-76c0fd017960.png)

**Cú pháp:**
```
// Arrow function
filter((element) => { ... } )
filter((element, index) => { ... } )
filter((element, index, array) => { ... } )

// Callback function
filter(callbackFn)
filter(callbackFn, thisArg)

// Inline callback function
filter(function callbackFn(element) { ... })
filter(function callbackFn(element, index) { ... })
filter(function callbackFn(element, index, array){ ... })
filter(function callbackFn(element, index, array) { ... }, thisArg)
```

**Parameters:** (tham số)
```
- callbackFn: Là hàm test, dùng để kiểm tra từng phần tử của mảng. 
có 3 tham số truyền vào:

  + element: Phần tử đang được xử lý trong mảng
  + index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  + array (không bắt buộc): Mảng nguồn là hàm filter() đang xử lý

- thisArg (không bắt buộc): Giá trị của this bên trong hàm callbackFn
```

### 4. find
- Phương thức `find` trả về giá trị đầu tiên tìm thấy trong mảng thỏa mãn điều kiện, trả về `undefined` nếu không tìm thấy.
- Không làm thay đổi mảng ban đầu.

![image.png](https://images.viblo.asia/7df71f80-e0c5-4460-90da-d7d7c15780fd.png)

**Cú pháp:**
```
// Arrow function
find((element) => { ... } )
find((element, index) => { ... } )
find((element, index, array) => { ... } )

// Callback function
find(callbackFn)
find(callbackFn, thisArg)

// Inline callback function
find(function callbackFn(element) { ... })
find(function callbackFn(element, index) { ... })
find(function callbackFn(element, index, array){ ... })
find(function callbackFn(element, index, array) { ... }, thisArg)
```

**Parameters:** (tham số)
```
- callbackFn: Là hàm test, dùng để kiểm tra từng phần tử của mảng. 
có 3 tham số truyền vào:

  + element: Phần tử đang được xử lý trong mảng
  + index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  + array (không bắt buộc): Mảng nguồn là hàm find() đang xử lý

- thisArg (không bắt buộc): Giá trị của this bên trong hàm callbackFn
```

### 5.  findIndex
- Phương thức `findIndex` trả về `index` (chỉ mục) đầu tiên tìm thấy trong mảng thỏa mãn điều kiện.
-  Trả về `-1` nếu không có phần tử nào thỏa mãn điều kiện
- Không làm thay đổi mảng ban đầu.

![image.png](https://images.viblo.asia/181871ee-1a22-48fa-a1fd-7c9ac20a537a.png)

**Cú pháp:**
```
// Arrow function
find((element) => { ... } )
find((element, index) => { ... } )
find((element, index, array) => { ... } )

// Callback function
find(callbackFn)
find(callbackFn, thisArg)

// Inline callback function
find(function callbackFn(element) { ... })
find(function callbackFn(element, index) { ... })
find(function callbackFn(element, index, array){ ... })
find(function callbackFn(element, index, array) { ... }, thisArg)
```

**Parameters:** (tham số)
```
- callbackFn: Là hàm test, dùng để kiểm tra từng phần tử của mảng. 
có 3 tham số truyền vào:

  + element: Phần tử đang được xử lý trong mảng
  + index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  + array (không bắt buộc): Mảng nguồn là hàm findIndex() đang xử lý

- thisArg (không bắt buộc): Giá trị của this bên trong hàm callbackFn
```

### 6. forEach
- Phương thức `forEach` dùng để duyệt qua từng phần tử của mảng

![image.png](https://images.viblo.asia/cf013e54-7a1e-4a1c-8672-b5a34e1c9392.png)

**Cú pháp:**
```
// Arrow function
find((element) => { ... } )
find((element, index) => { ... } )
find((element, index, array) => { ... } )

// Callback function
find(callbackFn)
find(callbackFn, thisArg)

// Inline callback function
find(function callbackFn(element) { ... })
find(function callbackFn(element, index) { ... })
find(function callbackFn(element, index, array){ ... })
find(function callbackFn(element, index, array) { ... }, thisArg)
```

**Parameters:** (tham số)
```
- callbackFn: Là hàm test, dùng để kiểm tra từng phần tử của mảng. 
có 3 tham số truyền vào:

  + element: Phần tử đang được xử lý trong mảng
  + index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  + array (không bắt buộc): Mảng nguồn là hàm forEach() đang xử lý

- thisArg (không bắt buộc): Giá trị của this bên trong hàm callbackFn
```

### 7. includes
-  Phương thức `includes` kiểm tra xem phần tử đã cho có tồn tại trong mảng hay không:
   + Trả về `true` nếu tìm thấy
   + Trả về `false` nếu không tìm thấy
 - Không làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/1266da30-8a71-40d1-b46b-93a59bbf66aa.png)

**Cú pháp:**
```
includes(searchElement)
includes(searchElement, fromIndex)
```

**Parameters:** (tham số)
```
- searchElement: giá trị muốn tìm kiếm
- fromIndex (không bắt buộc): Vị trí trong mảng để bắt đầu tìm kiếm searchElement
```

### 8. indexOf
- Phương thức `indexOf` dùng để tìm kiếm vị trí của phần tử trong mảng, trả về` index`(chỉ mục) đầu tiên mà phần tử đó được tìm thấy trong mảng, trả về `-1` nếu không tìm thấy.
- Không làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/8c89de98-47ae-4714-936a-16b6fbe324c1.png)

**Cú pháp:**
```
indexOf(searchElement)
indexOf(searchElement, fromIndex)
```

**Parameters:** (tham số)
```
- searchElement: Phần tử cần tìm trong mảng.
- fromIndex (không bắt buộc): Vị trí index bắt đầu tìm kiếm
```

### 9. lastIndexOf
- Phương thức `lastIndexOf` dùng để tìm kiếm vị trí của phần tử trong mảng, trả về` index`(chỉ mục) đầu tiên mà phần tử đó được tìm thấy trong mảng theo chiều ngược lại, trả về `-1` nếu không tìm thấy.
- Không làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/bd9f5475-ba19-4166-94fd-9956f0d9fbe0.png)

**Cú pháp:**
```
indexOf(searchElement)
indexOf(searchElement, fromIndex)
```

**Parameters:** (tham số)
```
- searchElement: Phần tử cần tìm trong mảng.
- fromIndex (không bắt buộc): Vị trí index bắt đầu tìm kiếm
```

### 10. join
- Phương thức `join` và trả về một chuỗi mới bằng cách nối tất cả các phần tử trong một mảng, được phân tách bằng `dấu phẩy`(mặc định) hoặc một `chuỗi dấu phân cách` được chỉ định. 
- Nếu mảng chỉ có 1 phần tử, thì phần tử đó trả về mà `không cần sử dụng dấu ngăn cách`
- trả về một chuỗi rỗng `" "` nếu mảng đó có `độ dài bằng 0`.
- Không làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/4d99d6e5-df4a-4f23-aea8-b03f6194a978.png)

**Cú pháp:**
```
join()
join(separator)
```

**Parameters:** (tham số)
```
separator (không bắt buộc): Là một chuỗi xác định dùng để ngăn cách các phần tử liền kề của mảng
```

### 11. map
- Phương thức `map` trả về 1 mảng mới với các phần tử là kết quả từ việc thực thi một hàm lên `từng phần tử` của mảng ban đầu
- Độ dài của mảng mới và mảng ban đầu luôn luôn bằng nhau
- Không làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/90c5aaee-949e-4fd3-b32c-a29767b97f4b.png)

**Cú pháp:**
```
// Arrow function
map((element) => { ... })
map((element, index) => { ... })
map((element, index, array) => { ... })

// Callback function
map(callbackFn)
map(callbackFn, thisArg)

// Inline callback function
map(function callbackFn(element) { ... })
map(function callbackFn(element, index) { ... })
map(function callbackFn(element, index, array){ ... })
map(function callbackFn(element, index, array) { ... }, thisArg)
```

**Parameters:** (tham số)
```
- callbackFn: Là hàm test, dùng để kiểm tra từng phần tử của mảng. 
có 3 tham số truyền vào:

  + element: Phần tử đang được xử lý trong mảng
  + index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  + array (không bắt buộc): Mảng nguồn là hàm map() đang xử lý

- thisArg (không bắt buộc): Giá trị của this bên trong hàm callbackFn
```

### 12. push
- phương thức `push` thêm một hoặc nhiều phần tử vào cuối mảng và trả về độ dài mới của mảng.
- Có làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/58269bed-9ba5-458c-a69b-0c74d3fa9cb1.png)

**Cú pháp:**
```
push(element0)
push(element0, element1)
push(element0, element1, ... , elementN)
```

**Parameters:** (tham số)
```
elementN: Các phần tử thêm vào cuối mảng
```

### 13. pop
- phương thức `pop` xóa phần tử cuối cùng khỏi một mảng và trả về phần tử đó.
- Có làm thay đổi mảng ban đầu.
- Trả về `undefined` nếu mảng rỗng.

![image.png](https://images.viblo.asia/8ed78286-301b-4f48-a025-89080f4aa4b7.png)

**Cú pháp:**
```
pop()
```

### 14. unshift
- phương thức `unshift` thêm một hoặc nhiều phần tử vào đầu mảng và trả về độ dài mới của mảng.
- Có làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/77d1b97b-ec5a-472a-afd9-d0153fbc9b30.png)

**Cú pháp:**
```
unshift(element0)
unshift(element0, element1)
unshift(element0, element1, ... , elementN)
```

**Parameters:** (tham số)
```
elementN: Các phần tử thêm vào trước mảng
```

### 15. shift
- Phương thức `shift` dùng để xoá phần tử đầu tiên ra khỏi mảng và trả về phần tử đã xóa.
- Có làm thay đổi mảng ban đầu.
- Trả về `undefined` nếu mảng rỗng

![image.png](https://images.viblo.asia/e6d13c71-1b26-402a-9c52-8a1daaec11dd.png)

**Cú pháp:**
```
shift()
```

### 16.reduce
- Phương thức `reduce` là một phương thức sẵn có được sử dụng để thực thi một hàm lên các phần tử của mảng (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất.
- Không làm thay đổi mảng ban đầu.
- Không thực thi với mảng rỗng.

![image.png](https://images.viblo.asia/8c907298-7624-48ae-abe2-7f956ffb79f1.png)

**Cú pháp:**
```
// Arrow function
reduce((previousValue, currentValue) => { ... } )
reduce((previousValue, currentValue, currentIndex) => { ... } )
reduce((previousValue, currentValue, currentIndex, array) => { ... } )
reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)

// Callback function
reduce(callbackFn)
reduce(callbackFn, initialValue)

// Inline callback function
reduce(function callbackFn(previousValue, currentValue) { ... })
reduce(function callbackFn(previousValue, currentValue, currentIndex) { ... })
reduce(function callbackFn(previousValue, currentValue, currentIndex, array){ ... })
reduce(function callbackFn(previousValue, currentValue, currentIndex, array) { ... }, initialValue)
```

**Parameters:** (tham số)
```
- callbackFn là hàm thực thi với từng phần tử của hàm, với 4 tham số là: accumulator, currentValue, index và array.

    + accumulator: biến tích lũy, được trả về sau mỗi lần gọi hàm callbackFn.
    + currentValue: phần tử của mảng đang được xử lý.
    + index (không bắt buộc): chỉ số của phần tử trong mảng đang được xử lý.
    + array (không bắt buộc): mảng hiện tại gọi hàm reduce().
    
- initialValue: là giá trị cho tham số thứ nhất (accumulator) của hàm callbackFn trong lần gọi hàm đầu tiên. 
  Nếu giá trị này không được cung cấp thì giá trị phần tử đầu tiên của mảng sẽ được sử dụng.
```

### 17. splice
- Phương thức `splice` là phương thức dùng để xóa các phần tử trong mảng, hoặc thay thế một phần tử trong mảng thành một hoặc nhiều phần tử khác. Nói cách khác:
   + Bạn có thể dùng hàm array splice để xóa phần tử và trả về 1 mảng các phần tử đã xóa. Nếu không có phẩn tử nào được xóa (deleteCount = 0) thì trả về 1 mảng rỗng.
   + Hoặc dùng để bổ sung phần tử vào một vị trí nào đó trong mảng.

- Làm thay đổi mảng ban đầu

![image.png](https://images.viblo.asia/3c10eaf6-04fc-4eaf-897e-4d0b80aca9fd.png)

**Cú pháp:**
```
splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2, itemN)
```

**Parameters:** (tham số)
```
- start: là vị trí index(chỉ mục) bắt đầu thay thế.
- deleteCount (không bắt buộc): là số phần tử sẽ bị lại bỏ, tính tử vị trí chỉ mục start, và bao gồm cả phần tử start. 
  Nếu deleteCount = 0 thì sẽ không có phần tử nào bị loại bỏ.
- item1, item2, ...itemN (không bắt buộc): các phần tử sẽ được thêm vào từ vị trí start. Sau khi thêm, phần tử thứ start của mảng sẽ là item1,2...N.
```

### 18. some
- Phương thức `some` kiểm tra xem liệu có ít nhất một phần tử thỏa mãn điều kiện hay không.
    + Có ít nhất một phần tử thỏa mãn điều kiện => `true`
    + Không có phần tử nào thỏa mãn điều kiện => `false`
- Không làm thay đổi mảng ban đầu.

![image.png](https://images.viblo.asia/37838f0e-924e-48a9-ba74-05ffbfbed007.png)

**Cú pháp:**
```
// Arrow function
some((element) => { ... } )
some((element, index) => { ... } )
some((element, index, array) => { ... } )

// Callback function
some(callbackFn)
some(callbackFn, thisArg)

// Inline callback function
some(function callbackFn(element) { ... })
some(function callbackFn(element, index) { ... })
some(function callbackFn(element, index, array){ ... })
some(function callbackFn(element, index, array) { ... }, thisArg)
```

**Parameters:** (tham số)
```
- callbackFn: Là hàm test, dùng để kiểm tra từng phần tử của mảng. 
có 3 tham số truyền vào:

  + element: Phần tử đang được xử lý trong mảng
  + index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  + array (không bắt buộc): Mảng nguồn là hàm some() đang xử lý

- thisArg (không bắt buộc): Giá trị của this bên trong hàm callbackFn
```

### 19. sort
- Phương thức `sort` sắp xếp các phần tử của mảng và trả về mảng đã sắp xếp. 
- Thứ tự sắp xếp mặc định là tăng dần, được xây dựng dựa trên việc chuyển đổi các phần tử thành chuỗi (mã ascii). Tuy nhiên, khi sắp xếp các số sẽ không được chính xác (ví dụ 20 và 100 thì 20 sẽ lớn hơn 100 vì 2 > 1).
- Làm thay đổi mảng ban đầu.

![image.png](https://images.viblo.asia/33b5371d-f558-4be7-8a4a-03eb57ec52d8.png)

**Cú pháp:**
```
// Functionless
sort()

// Arrow function
sort((firstEl, secondEl) => { ... } )

// Compare function
sort(compareFn)

// Inline compare function
sort(function compareFn(firstEl, secondEl) { ... })
```

**Parameters:** (tham số)
```
- compareFn (không bắt buộc): Đây là một callback function dùng để quyết định thứ tự sắp xếp của các phần tử trong mảng. 
- Hai tham số firstEl và secondEl đại diện cho hai phần tử kề nhau trong mảng, và ta sẽ sử dụng nó để quyết định cách sắp xếp
- Returns:
    + Nếu hàm callback trả về số lớn hơn 0 thì secondEl sẽ đứng trước firstEl.
    + Nếu hàm callback trả về số bé hơn hoặc bằng 0 thì thứ tự được giữ nguyên, tức là firstEl sẽ đứng trước secondEl.
```
# Tổng kết
Ngoài các phương thức phổ biến mình đã liệt kê phía trên thì còn có nhiều phương thức xử lý mảng khác như là `reverse`, `slice`, `reducerRight`,...

Các bạn có thể xem chi tiết hơn tại đây:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

Cảm ơn các bạn đã theo dõi bài viết của mình, mình sẽ cố gắng cải thiện các bài viết khác trong thời gian sắp tới.