Trong Javascript rất nhiều hàm được dựng sẵn cho phép bạn truyền vào với một số lượng tham số tùy ý

Ví dụ như
```
// Trả về số lớn nhất trong các số truyền vào.
Math.max(arg1, arg2, ..., argN) 

//sao chép nội dung của src1..N vào trong biến `dest`
Object.assign(dest, src1, ..., srcN) 
```

Trong bài viết này tôi sẽ hướng dẫn bạn cách để tạo ra các hàm kiểu như thế này.



#### Rest parameters

Là 1 hàm có thể gọi với số lượng tham số tùy ý

ví dụ như
```
 function sum(a, b) {
  return a + b;
}

console.log( sum(1, 2, 3, 4, 5) ); // 3
=> 3
````
Khi ta gọi `sum(1, 2, 3, 4, 5)` ta truyền vào 5 tham số tuy nhiên hàm sum định nghĩa với 2 tham số vẫn chẳng có bất cứ lỗi gì xảy ra. Bởi vì, Javascript cho phép bạn truyền nhiều hơn hoặc ít hơn số lượng tham số khai báo ở hàm. Và kết quả ta nhận được là `3`, hàm `sum` chỉ tính tổng của 2 tham số đầu tiên.

Sửa lại hàm `sum` để có thể tính toán đúng cho các trường hợp số lượng tham số khác nhau ta sử dụng `rest parameters` với phần định nghĩa tham số bắt đầu với 3 dấu chấm `...` có nghĩa tập hợp các tham số còn lại vào một mảng.

Cụ thể ta sẽ cài đặt như sau

```javascript
function sum(...args) { // args is the name for the array
  let sum = 0;

  args.forEach((arg) => sum += arg)

  return sum;
}

console.log( sum(1) ); // 1
console.log( sum(1, 2) ); // 3
console.log( sum(1, 2, 3) ); // 6
```

Hơn nữa chúng ta cũng có thể dùng các tham số khác cùng với `rest parameters`. Ví dụ ta có 2 tham số đầu tiên và tham số tiếp theo là một `rest parameters`
```javascript
function addList(list, ...args) {
  args.forEach((arg) => list.push(arg))
  return list;
}

addList([1], 2, 3); // [1, 2, 3]
```

Có một điều chú ý là `rest parameters` phải đặt ở cuối trong danh sách các parameters của hàm
Ví dụ trường hợp sau sẽ báo lỗi
```javascript
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

#### The `arguments` variable
Chắc bạn cũng đã từng nghe hoặc từng thấy chỗ nào đó gọi `arguments` trong hàm. Về cơ bản arguments cũng có thể nói là khá giống với `Rest parameters`. Arguments đơn giản là danh sách các tham số truyền vào khi gọi hàm. `Rest parameters` thì cao cấp hơn một chút nó chỉ rõ các tham số là tên là gì và cũng dễ đọc dễ hiểu hơn

```
function sum() {
  let total = 0;
  for (let argument of arguments){total += argument}
  return total;
}
sum(1, 2, 3); // 6
```

chú ý: `arguments` là một đối tượng kiểu `Arguments` không phải Array như `Rest parameters` nên bạn không thể dùng `forEach` được.

`arguments` thường được sử dụng trước khi có `rest parameters` hiện tại `arguments` vẫn được support chúng ta vẫn có thể dùng bình thường tuy nhiên theo khuyến cáo thì nên chuyển sang `rest parameters` sẽ tốt hơn.

Một điểm chú ý nữa là `arrow function` cũng sẽ ko dùng được `arguments` của chính nó
```
let showArg = () => alert(arguments[0]);
showArg(1); ///wrong

```

#### Spread operator
Ở phần trên chúng ta đã biết được cách làm sao có thể lấy được giá trị từ danh sách các tham số truyền vào. Nhưng một số trường hợp ta lại cần làm thế nào để truyền tất cả các tham số được lấy ra từ mảng.

Lấy ví dụ với hàm `Math.max` trả về số lớn nhất trong danh sách

```javascript
console.log( Math.max(3, 5, 1) ); // 5
```

Giờ ta có một array `[3, 5, 1]`, làm thế nào để lấy giá trị lớn nhất của array này ?

Truyền vào hàm đó array này như là 1 tham số sẽ không khả thi bởi vì hàm này yêu cầu tham số là tất cả các phần tử trong mảng, mỗi phần tử là một tham số riêng.
```
let arr = [3, 5, 1];

console.log( Math.max(arr) ); // NaN
```

Và như vậy chúng ta sửa lại như sau để chạy được
```javascript
Math.max(arr[0], arr[1], arr[2])
```
Đoạn mã trên chạy đúng trong trường hợp này tuy nhiên nhìn nó khá là tệ, bởi vì nó không tổng quát khi số lượng phần tử của array không cố định

Thật tuyệt khi Javascript có `Spread operator` có thể giải quyết được vấn đề này một cách hoàn hảo.

Sử dụng `...arr` khi gọi hàm `max`, nó sẽ biến các phần tử trong array `arr` thành danh sách các tham số .

Ví dụ
```
let arr = [3, 5, 1];

console.log( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)
```

Chúng ta cũng có thể truyền nhiều `spread operator` vào hàm theo cách này
```
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log( Math.max(...arr1, ...arr2) ); // 8
```

Chúng ta cũng có thể kết hợp các `spread operator` với các tham số thường

```
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Hơn thế nữa `spread operator` có thể tạo ra một array mới rất tiện lợi
```
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

console.log(merged); // [0,3,5,1,2,8,9,15]
```


#### Tham khảo
1. [rest-parameters-spread-operator](https://javascript.info/rest-parameters-spread-operator)