- Xin chào các bạn. Lại là mình đây! Bài viết này chúng ta sẽ thảo luận về đối tượng Set trong JavaScript.
- Trước khi vào chủ đề chính của bài viết chúng ta hãy xem qua vấn đề sau. Giả sử task chúng ta làm cần `lưu trữ danh sách email người dùng (điều kiện email không được trùng nhau)`. Tôi chắc chắn đa số sẽ nghĩ tới việc sử dụng Array, đối với yêu cầu bài toán thì có vẻ như vậy là đủ. Khi sử dụng Array:
    - Trước khi lưu email chúng ta cần kiểm tra xem email đó đã tồn tại hay chưa.
    - Khi xóa một email trong danh sách chúng ta sẽ dựa vào chỉ số phần tử.
    - ...
- Có vẻ bài toán của chúng ta đã được giải quyết ngon rồi, chuẩn bị tạo pull thôi (:yum: :yum:).
- PAUSE :vertical_traffic_light:, chậm lại một chút, hãy suy nghĩ một chút nào. Đối với một ứng dụng nhỏ thì không có gì để nói, nhưng đối với một ứng dụng lớn thì việc sử dụng Array trong bài toán này đã hợp lý chưa? Bạn đã bao giờ tìm hiểu các hàm có sẵn trong Array xử lý hết bao nhiều thời gian chưa? Đây là một trong các nguyên nhân dẫn đến việc ứng dụng chạy chậm.
- Let's go. Chúng ta bắt đầu tìm hiểu về Set, và việc áp dụng nó vào bài toán trên có những lợi thế nào nhé! :muscle::muscle::muscle:

## Điểm khác biệt của Set so với Array
- Mảng là một danh sách có đánh chỉ mục (index). Điều đó có nghĩa là giá trị của phần tử trong mảng được sắp xếp theo chỉ mục.
```
const arr = [A, B, C, D];
console.log(arr.indexOf(A)); // Result: 0
console.log(arr.indexOf(C)); // Result: 2
```
- Ngược lại, Sets là một danh sách có khóa (key collection). Thay vì sử dụng các chỉ mục, Sets sắp xếp dữ liệu bằng cách sử dụng keys. Các phần tử trong Sets có thể lặp đi lặp lại theo thứ tự chèn và *nó không thể chứa bất kỳ dữ liệu trùng lặp nào*. Nói cách khác, phần tử trong Set phải là duy nhất.
- A đây rồi! Các phần tử Set là `duy nhất` giải quyết vấn đề `email không được trùng nhau`. (ngonroi)

## Các lợi ích chính của Set
- Sets có một số lợi thế so với mảng, đặc biệt là khi có thời gian chạy nhanh hơn:
    -  Search item: Array sử dụng `indexOf` hoặc `includes` để kiểm tra item có tồn tại trong danh sách không là chậm (Độ phức tạp là O(n)) - Set sử dụng phương thức `has()` có độ phức tạp là O(1).
    -  Delete item: Trong Set, bạn có thể xóa một item theo giá trị của nó (`delete()`). Trong Array, tương đương là sử dụng `splice()` dựa trên `chỉ số phần tử`. Như điểm trên thì phụ thuộc vào chỉ số sẽ chậm.
    -  Insert item: Thêm item vào Set (`add()`) nhanh hơn là thêm vào Array ( `push()`, `unshift()` hoặc một phương thức tương đương).
    -  **Lưu trữ NaN: Không thể sử dụng `indexOf` hoặc `includes()` để tìm giá trị NaN trong mảng, trong khi Set có thể lưu trữ giá trị này.**
    -  Remove duplicates: Giá trị lưu trữ trong Set là duy nhất, nếu muốn tránh lưu các phần tử trùng lặp thì đây là một lợi ích đáng kể so với mảng.
> Note: Để có đầy đủ thông tin về các phương thức dựng sẵn trong Set, nên tham khảo tại đây [MDN Web Docs.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Methods)

## Độ phức tạp
- Các phương thức mà mảng sử dụng để tìm kiếm các mục có độ phức tạp là O(n). Nói cách khác, thời gian chạy phụ thuộc vào kích thước của mảng.
- Ngược lại, các phương thức tìm kiếm, xóa, chèn trong Set có độ phức tạp là O(1). Điều này có nghĩa là kích thước của dữ liệu hầu như không ảnh hưởng đến thời gian chạy của các phương thức.
> Note: Tìm hiểu thêm về [Big O Notation](https://medium.com/@bretcameron/ace-your-coding-interview-by-understanding-big-o-notation-and-write-faster-code-6b60bd498040)

## Chính xác thì Set nhanh hơn bao nhiêu?
- Thời gian chạy có thể khác nhau đáng kể tùy thuộc vào hệ thống được sử dụng, kích thước của dữ liệu được cung cấp và các điều kiện khác. Bạn cũng có thể tự kiểm tra dựa vào hướng dẫn dưới đây.
### Chuẩn bị
- Trước khi chạy bất kỳ bài test nào, hãy tạo một mảng và một Set với 1 triệu phần tử. 
```
let arr = [], set = new Set(), n = 1000000;
for (let i = 0; i < n; i++) {
  arr.push(i);
  set.add(i);
}
```

### Test 1: Search item
- Chúng ta sẽ tìm số `123123` mà chúng ta đã biết nó tồn tại trong danh sách.
```
let result;
console.time('Array'); 
result = arr.indexOf(123123) !== -1; 
console.timeEnd('Array');
console.time('Set'); 
result = set.has(123123); 
console.timeEnd('Set');
```
- Kết quả:
    - Array: 0.173ms
    - Set: 0.023ms
    - Set nhanh hơn 7.54 lần.

### Test 2: Add item
- Bây giờ, hãy thêm một item mới vào mỗi danh sách:
```
console.time('Array'); 
arr.push(n);
console.timeEnd('Array');
console.time('Set'); 
set.add(n);
console.timeEnd('Set');
```

- Kết quả:
    - Array: 0.018ms
    - Set: 0.003ms
    - Set nhanh hơn 6.73 lần

### Test 3: Delete item
- Cuối cùng, hãy xóa một item từ mỗi danh sách. Trong Array không có phương thức được tích hợp sẵn để xóa phần tử dựa trên giá trị, vì thế chúng ta sẽ tạo một function để giải quyết:
```
const deleteFromArr = (arr, item) => {
  let index = arr.indexOf(item);
  return index !== -1 && arr.splice(index, 1);
};
```
- Và đây là đoạn code thực hiện test:
```
console.time('Array'); 
deleteFromArr(arr, n);
console.timeEnd('Array');
console.time('Set'); 
set.delete(n);
console.timeEnd('Set');
```
- Kết quả:
    - Array: 1.122ms
    - Set: 0.015ms
    - Set nhanh hơn 74.13 lần (:scream::scream::scream:)

- Nhìn chung, chúng ta có thể thấy rằng những cải tiến đáng kể trong thời gian chạy có thể được thực hiện bằng cách sử dụng Set thay vì mảng. Bây giờ hãy xem một số ví dụ thực tế nơi Set có thể hữu ích.

## Case 1: Loại bỏ các giá trị trùng lặp khỏi một mảng
- Nếu bạn muốn xóa nhanh các giá trị trùng lặp khỏi một mảng, bản có thể chuyển đổi nó thành Set. Đây là cách ngắn gọn nhất để lọc ra các giá trị duy nhất:
```
const duplicateCollection = ['A', 'B', 'B', 'C', 'D', 'B', 'C'];
// If you want to turn the array into a Set
let uniqueCollection = new Set(duplicateCollection);
console.log(uniqueCollection) // Result: Set(4) {"A", "B", "C", "D"}
// If you want to keep your values in an array
let uniqueCollection = [...new Set(duplicateCollection)];
console.log(uniqueCollection) // Result: ["A", "B", "C", "D"]
```

## Case 2: Câu hỏi phỏng vấn của Google
### Question
- Cho một mảng số nguyên bất kỳ và một giá trị `sum`, trả về `true` nếu tổng của bất kỳ 2 phần tử nào bằng  `sum`, nếu không sẽ trả về `false`.
- Giả sử chúng ta có mảng `[3, 5, 1, 4]` và `sum = 9`, kết quả trả về sẽ là `true` vì `5 + 4 = 9`
### Solution
- Hướng tiếp cận tốt nhất cho bài toán này như sau. Khi chúng ta duyệt qua phần tử `3` chúng ta sẽ thêm `6` vào Set bởi vì chúng ta biết chúng ta cần tìm `sum = 9`. Sau đó, mỗi lần chúng ta duyệt qua một phần tử trong mảng, chúng ta có thể kiểm tra xem nó có tồn tại trong Set không. Khi duyệt đến giá trị `5` chúng ta sẽ thêm `4` vào Set. Sau đó, khi duyệt giá trị `4`, chúng ta sẽ thấy nó tồn tại trong Set. Vì vậy kết quả trả về là `true`.
- Code sẽ như thế này:
```
const findSum = (arr, val) => {
  let searchValues = new Set();
  searchValues.add(val - arr[0]);
  for (let i = 1, length = arr.length; i < length; i++) {
    let searchVal = val - arr[i];
    if (searchValues.has(arr[i])) {
      return true;
    } else {
      searchValues.add(searchVal);
    }
  };
  return false;
};
```
- Và đây là một version ngắn hơn:
```
const findSum = (arr, sum) =>
  arr.some((set => n => set.has(n) || !set.add(sum - n))(new Set));
```
- Vì `Set.prototype.has()` có độ phức tạp chỉ là O(1), sử dụng Set sẽ tốt hơn là sử dụng Array trong quá trình tìm kiếm.
- Nếu chúng ta thay thế phụ thuộc vào `Array.prototype.indexOf()` hoặc `Array.prototype.includes()`, cả hai đều có độ phức tạp là O(n), tổng sẽ là O(n2). Rất chậm.

## Kết luận
- Nếu bạn chưa từng làm với Sets trước đây, tôi hi vọng rằng bạn sẽ thấy bài viết này hữu ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!
- Nguồn tham khảo: [How to make your code faster using JavaScript Sets](https://medium.com/@bretcameron/how-to-make-your-code-faster-using-javascript-sets-b432457a4a77)