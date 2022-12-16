Bên cạnh việc xử lý vòng lặp với mảng như bài viết đầu tiên trong series thì hôm nay mình cũng sẽ giới thiệu về một bộ ba cũng thường là những tác nhân gây đau đầu cho các lập trình viên khi thao tác với chúng : **slice()**, **splice()**, **split()**. Ngay từ việc đọc tên thôi cũng đã làm cho không ít người bối rối.

![](https://images.viblo.asia/a325a874-268f-4415-8e16-4b4e4e149c49.jpg)

Đảo lại qua một chút về **Array** trong javascript, phần tử của nó có thể là nhiều kiểu dữ liệu chứ không chỉ là một loại như trong các ngôn ngữ **C**,  **Java**, ...

Một ví dụ về dạng array hợp lệ trong Js có thể kể đến như :
```js
let array = [1, 2, 3, "hello world", 4.12, true];
```

## Slice
<hr>

Dịch từ này sáng tiếng Việt thì se nôm na là xắt, thái và tác dụng của nó cũng khá giống như vậy, cắt bỏ một phần của array, tuy nhiên điểm cần lưu ý đó chính là hàm **slice** sẽ tạo ra một **array mới** chứ không hề chỉnh sửa trên đối tượng **array** gọi đến nó.

### Syntax

```js
array.slice(from, until)
```

Trong đó :

   * **from**: Chí số của phần tử bắt đầu được chọn để cắt
   * **until**:  Chỉ số  của phần tử được cắt đến .

Chúng ta hãy thử qua một ví dụ trức quan sau:

```js
let array = [1, 2, 3, "hello world", 4.12, true];
let newArray = array.slice(1, 4);
```

Và kết quả trả về là :
```js
> array
(6) [1, 2, 3, "hello world", 4.12, true]

> newArray
(3) [2, 3, "hello world"]
```

Như vậy có thể thấy hàm **splice()** không hề gây thay đổi với đối tượng ban đầu nó tạo ra một đối tượng mới là **newArray**, đối tượng này là một bản cắt của đối tượng **array** từ phần tử thứ **1** đến phần tử thứ **3** (trước 4)

## Splice

Đây chính là hàm hay bị nhầm lẫn với **slice** nhẩt, tuy nhiên nó lại có rất nhiều khác biệt so với hàm **slice**. **Splice** thường được dùng để thêm hoặc xóa phần tử trong mảng, và điều ngược lại so với **slice()** là hàm **splice()** sẽ thay đổi trực tiếp trên đối tượng gọi đến nó.

### Xóa bỏ phần tử

**Syntax:**
```js
array.splice(index, number of elements);
```

Để xóa bỏ phần tử trong mảng, đối số truyền vào hàm số sẽ là :

* **index:** chỉ số của phần tử đầu tiên được cắt
* **number of elements:** số lượng phần tử sẽ bị cắt đi.

Trong trường hợp đối số **number of elements** không được truyền vào hàm, nó sẽ tự động loại bỏ tất cả phần tử từ phần tử thứ **index** trong mảng

```js
> array = [1, 2, 3, "hello world", 4.12, true];
> array.splice(3)
< (3) ["hello world", 4.12, true]
```

Với ví dụ bên trên các bạn có thể thấy tất cả các phần tử từ index 3 trở lên sẽ bị remove và tạo ra một mảng mới. Mảng **array** cũ sẽ là mảng sau khi bị cắt các phần tử từ index 3

```js
> array
< (3) ["hello world", 4.12, true]
```

### Thêm phần tử

Phần này cũng là một phần khá rối của **splice()**,  khác với việc loại bỏ phần tử, thêm phần tử sẽ truyền vào 3 đối số trở lên

**Syntax:**

```js
array.splice(index, howmany, item1, ....., itemX)
```

Trong đó :

* **index:** Vị trí bắt đầu được thêm vào
* **howmany:** Số lượng phần tử bị xóa 
* **item1, ..., itemX:** Các phần tử có thể được thêm vào 

Thử qua ví dụ này các bạn sẽ thấy dễ hiểu hơn

```js
let months = [1, 2, 3, 4]
months.splice(0, 1, 'january')
```

Đoạn code trên có thể tạm dịch là **xóa bỏ 1 phần tử từ vị trí index 0 ghi thêm phần tử january vào vị trí đó**. Kết quả nhận về sẽ là

```js
> months
(4) ["january", 2, 3, 4]
```

## Split()

Đây là một hàm rất hữu ích đối với mình khi thao tác với **String**, nó có nhiệm vụ chia một chuỗi **string** thành các **substrings** và trả về nó dưới dạng một mảng. 

**Cú pháp:**
```js
string.split(separator, limit);
```
Trong đó:

* **separator:** Định nghĩa ra kí tự để chia chuỗi 
* **limit:** Giới hạn số lượng phần tử được tách trả về trong mảng

Thực nghiệm qua ví dụ dưới đây nhé :

```js
"How are you doing today?".split(" ", 3)
```

Đoạn code trên với mục đích tách string "How are you doing today?", đối số đầu tiên là " " , ta có thể hiểu là kí tự phân chia chuỗi, đối số tiếp theo là 3 sẽ chỉ ra số lượng kết quả trả về trong mảng. Như vậy kết quả của đoạn code trên sẽ là 

```js
(3) ["How", "are", "you"]
```

## Kết luận

### **Slice() :**
 * Không thay đổi mảng gốc
 * Trả về kết quả là 1 mảng mới
 * Có thể sử dụng cho cả mảng và chuỗi (string)

### **Splice() :**

* Dùng cho việc thêm, xóa phần tử trong mảng
* Trả về mảng là những phần tử bị xóa (trong trường hợp xóa phần tử trong mảng)
* Thay đổi trực mảng gốc
* Chỉ dùng cho mảng
* Cú pháp thêm phần tử:  **array.splice (index, number of elements, element)**
* Cú pháp xóa phần tử: **array.splice (index, number of elements)**

### **Split() :**

* Chia 1 chuỗi thành các chuỗi con
* Trả về là 1 mảng
* Không làm thay đổi chuỗi gốc
* Chỉ dùng cho String
* Lấy vào 2 đối số (có thể không bắt buộc) : **string.split(separator, limit)**


## Tham khảo

Bài viết của mình có dịch và sửa đổi từ bài viết trên FreeCodeCamp, các bạn có thể thao khảo linh bài viết gốc : https://www.freecodecamp.org/news/lets-clear-up-the-confusion-around-the-slice-splice-split-methods-in-javascript-8ba3266c29ae/