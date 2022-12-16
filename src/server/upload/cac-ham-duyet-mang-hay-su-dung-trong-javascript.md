### Mở đầu

Hiện nay, hầu hết khi code chúng ta đều phải xử lý các mảng dữ liệu. Và sử dụng vòng for để duyệt là cách vô cùng dễ dàng và phổ biến. Tuy nhiên, sử dụng vòng for cũng đem lại nhiều nhược điểm, ví dụ như mỗi lần duyệt, vòng for sẽ khai báo lại giá trị đếm mà ta sử dụng. Hôm nay, chúng ta sẽ cùng tìm hiểu các hàm phổ biến như filter, reduce, map để làm việc với mảng một cách ngắn gọn và chuyên nghiệp hơn 


### Map()
Hàm map tạo ra 1 mảng mới. Mảng mới này là kết quả của việc xử lý từng phần tử của mảng cũ bằng cùng 1 phương thức xử lí mà ta quy định.

**Cú pháp**

```
var new_array = arr.map(function callbackFn(currentValue, index, array) { ... }, thisArg)
```

**Các tham số**
callback là hàm tạo ra một phần tử của mảng mới, lấy ba đối số:
* currentValue: phần tử hiện tại đang được xử lý trong mảng.
* index (không bắt buộc): chỉ mục của phần tử hiện tại đang được xử lý trong mảng.
* array (không bắt buộc): mảng được dùng để map.
* thisArg (không bắt buộc): Giá trị để sử dụng khi thực hiện callback.

**Ví dụ**
Chúng ta xét mảng sau
```
var names = ["nam", "phong", "trang", "hong"];
```

Yêu cầu được đưa ra là hãy viết hoa mọi chuỗi trong một mảng, để làm được việc này khá đơn giản chắc hẳn ai cũng nghĩ đến việc sử dụng vòng for để duyệt qua các phẩn tử của mảng, biến đổi mỗi phàn tử thành chuỗi in hoa sau đó push vào một mảng mới
```
var names = ["nam", "phong", "trang", "hong"];
var upperCaseNames = [];
for(let i=0, totalNames = names.length; i< totalNames ; i= i +1) {
    upperCaseNames[i] = names[i].toUpperCase();
}
```

Tuy nhiên khi sử dụng hàm map chúng ta có thể thực hiện logic trên một cách ngắn gọn hơn:
```
var names = ["nam", "phong", "trang", "hong"];
var upperCaseNames = names.map(name => name.toUpperCase());
```

### Filter()

Hàm filter là cũng tạo ra 1 mảng mới. Mảng mới này là kết quả của việc lọc tất cả các phần tử của mảng cũ để chọn ra những phần tử thỏa mảng 1 điều kiện gì đó. Điều kiện này được kiểm tra bằng 1 phương thức mà ta quy định.

**Cú pháp**

`var newArray = arr.filter(function callbackFn(element, index, array) { ... },  thisArg)`

**Các tham số**
callback dùng để kiểm tra từng phần tử của mảng. Trả về true để giữ nguyên tố, sai nếu không. Nó chấp nhận ba đối số:
* element: Phần tử hiện tại đang được xử lý trong mảng.
* index (không bắt buộc): chỉ mục của phần tử hiện tại đang được xử lý trong mảng.
* array (không bắt buộc): mảng được filter gọi.
* thisArg (không bắt buộc): giá trị được dùng khi thực hiện callback.

**Ví dụ**
Tìm những học sinh có tuổi lớn hơn 16

Sử dụng với for
```
const ages = [17, 22, 13, 14, 15]

  let olderThan16 = [];

  for (let i = 0; i < ages.length; i++) {
      if(ages[i] > 16){
          olderThan18.push(ages[i])
      }
  }

console.log(olderThan16); // [17, 22]
```

Sử dụng filter
```
var ages = [17, 22, 13, 14, 15];
var olderThan16 = ages.filter(n => n > 2);
olderThan16; // [17, 22]
```

### Reduce 

Reduce sẽ biến đổi một mảng thành một giá trị đơn giản bằng cách duyệt qua từng phần tử từ trái sang phải

**Cú pháp**

```
const reducedValue = array.reduce((prev, next, index, array) => {...}, initialValue);
```

* prev: hay còn gọi là accumulator - biến tích lũy, truyền giá trị trả về của mỗi lần gọi callback; nó là giá trị tích lũy được trả về trong lần gọi callback trước, hoặc giá trị của tham số initialValue, nếu được cung cấp
* next: hay còn gọi là currentValue Phần tử trong mảng hiện tại đang được xử lý.
* index (Optional): Chỉ mục (index) của phần tử đang được xử lý. Bắt đầu tại 0, nếu giá trị initialValue được cung cấp, và tại 1 nếu không có initialValue.
* array (Optional): Mảng đang được gọi với reduce().
* initialValue: Giá trị cho tham số thứ nhất (accumulator) của hàm callback trong lần gọi đầu tiên. Nếu giá trị ban đầu này không được cung cấp, phần tử đầu tiên của mảng sẽ được dùng. Do đó, gọi reduce() trên một mảng rỗng và không có giá trị ban đầu sẽ gây ra lỗi

Để dễ hiểu hơn chúng ta cùng tìm hiểu ví dụ tính tổng 1 mảng dưới đây:

```
let newArray = [0, 1, 2, 3, 4]
let intialValue = 0

let sum = newArray.reduce((total, currentValue, currenIndex, array) => {
    return total + currentValue
 }, initialValue);
console.log('sum': sum)
// sum: 10
```

Khá là dễ hiểu phải không, tiếp theo chúng ta hãy cùng đặt console.log vào callback xem nó hoạt động như thế nào nhé
```
let newArray = [0, 1, 2, 3, 4]
let intialValue = 0

let sum = newArray.reduce((total, currentValue, currenIndex, array) => {
    console.log('total:',total, 'currentValue: ', currentValue, 'currenIndex', currenIndex, 'array: ', currenIndex)
    return total + currentValue
 }, initialValue);
console.log('sum': sum)
// sum: 10

total: 0 currentValue: 0 currentIndex: 0 array[0, 1, 2, 3, 4]
total: 0 currentValue: 1 currentIndex: 1 array[0, 1, 2, 3, 4]
total: 1 currentValue: 2 currentIndex: 2 array[0, 1, 2, 3, 4]
total: 3 currentValue: 3 currentIndex: 3 array[0, 1, 2, 3, 4]
total: 6 currentValue: 3 currentIndex: 4 array[0, 1, 2, 3, 4]
sum: 10
```

Ngoài việc tính tổng 1 mảng, reduce còn có thể làm rất nhiều thứ hay ho khác như: tìm max, tìm min, đảo ngược array.....

### Kêt luận
Khi sử dụng map, filter, reduce sẽ mang lại khá nhiều lời ích như
* Nhìn code sẽ dễ đọc hơn rất nhiều
* Dễ hiểu hơn
* Dễ dàng debug
* Tránh thay đổi mảng ban đầu, do đó, giảm thiểu những rủi ro có thể xảy ra .
* Không cần quản lí vòng lặp

Qua bài viết này, mình đã giới thiệu đến các bạn một số hàm hay trong javascript được sử dụng để thao tác với dữ liệu của mảng. Mong bài viêt sẽ giúp các bạn code nhanh và hiệu quả hơn với javascript.

### Tài liệu tham khảo 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce