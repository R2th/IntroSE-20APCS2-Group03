Được giới thiệu trong phiên bản `es5` của `ECMAScript` vào năm 2009, Cùng với `forEach`, `map`, `every` thì `reduce` là một trong những method cực kỳ hữu ích khi chúng ta cần phải thực hiện các tính toán dựa vào dữ liệu của một mảng.

Tuy vậy, khác với `forEach`, `filter` hay `map`, 2 trong số các method thông dụng và được sử dụng nhiều nhất để xử lý mảng thì `reduce` lại lép vế hơn rất nhiều, đôi khi nó còn không được dùng trong những tình huống rành riêng cho nó. Lý do mà các đa phần các developer né tránh sử dụng reduce là vì nó phức tạp hơn các method khác. Chính vì vậy mà trong bài viết này, mình sẽ cố gắng giải thích cho các bạn về cách sử dụng `reduce` một cách dễ hiểu và ngắn gọn nhất có thể.

## Ví dụ tiêu biểu
Trước khi đi vào tìm hiểu cú pháp và cách sử dụng của `reduce` thì mình muốn các bạn xem qua ví dụ sau đây:

Trong ví dụ này, chúng ta sẽ phải tính tổng của các phần tử trong mảng `arr`.

```js
const arr = [1, 2, 3, 4, 5, 6];
```

Cách xử lý bài toán này khá đơn giản, chúng ta chỉ cần chạy một vòng lặp qua từng phần tử trong `arr` và cộng các phần tử đó với một biến có giá trị khởi đầu là `0`.

```js
const arr = [1, 2, 3, 4, 5, 6];

let result = 0;
arr.forEach(function(item) {
    result += item;
});

console.log(result); // => 21
```

## Giải quyết vấn đề với reduce
Cùng với vấn đề trên, bây giờ chúng ta sẽ xử lý nó với `reduce`

```js
const arr = [1, 2, 3, 4, 5, 6];

let result = arr.reduce(function(result, item) {
    result += item;
    return result;
}, 0);

console.log(result); // => 21
```

Như các bạn thấy, kết quả mà biến `result` trả về trong cả hai ví dụ là như nhau, đều là `21`. Để có thể hiểu được cách mà `reduce` trả về `21`, chúng ta hãy cùng tìm hiểu cú pháp của `reduce` nhé.

## Cú pháp của reduce
```js
arr.reduce(function(result, arrItem, index, hostArr) {
    return ...
}, resultInitialValue);
```

Cũng giống như `filter` và `map`, `reduce` cũng nhận vào một callback function, nhưng khác với `filter`, `map` và phần lớn các method khác của `Array` thì function này nhận vào tận 4 tham số thay vì 3:
1. `result`: tương tự như biến `result` ở ví dụ đầu tiên, `result` sẽ chứa giá trị mà `reduce` trả về sau khi nó lặp qua tất cả các phần tử trong một mảng.
2. `arrItem`: giá trị thứ 2 mà `reduce` nhận vào là phần tử của mảng ở vòng lặp hiện tại.
3. `index`: index của phần tử của mảng ở vòng lặp hiện tại.
4. `hostArr`: chính là mảng mà `reduce` đang xử lý.

Giá trị trả về của callback function của `reduce` đóng một vai trò rất quan trọng vì đây sẽ là giá trị của `result` trong vòng lặp tiếp theo, nếu vòng lặp hiện tại là vòng lặp cuối cùng thì đây cũng sẽ là giá trị mà `reduce` trả về.

`resultInitialValue`: ta có thể truyền bất cứ giá trị nào từ một number, string cho đến object hoặc array vào tham số này. Đây chính là giá trị khởi tạo của `result`. Ví dụ như ở ví dụ thứ hai thì giá trị khởi tạo của result sẽ là 0 vì ta muốn cộng các phần tử của mảng với `result` để tìm ra tổng của các phần tử trong một mảng.

## Cách hoạt động của reduce
Điều đặc biệt của `reduce` đó là nó một biến ngầm, biến này có nghiệm vụ tương tự như biến `result` ở ví dụ thứ nhất và nó sẽ là giá trị và `reduce` trả về.

Các bước hoạt động của `reduce` cũng rất đơn giản. `reduce` sẽ lặp qua các phần tử của một mảng, mỗi lần lặp, nó sẽ truyền các tham số như mình đã nêu ra ở mục trên vào callback function của nó và thực hiện các tính toàn mà ta viết trong  callback function đó. Sau khi các tính toán được thực hiện xong, `reduce` sẽ gán giá trị trả về của callback function vào biến `result` ngầm của mình. Sau khi vòng lặp cuối được chạy và gía trị của callback function trong vòng lặp này được gán cho biến `result` ngầm thì `reduce` sẽ kết thúc vòng đời của mình và trả về cho chúng ta giá trị mà biến `result` ngầm đang chứa.

## Viết lại logic của reduce
Dưới đây là một ví dụ đơn giản về cách hoạt động của reduce. Đây cũng là ví dụ mà mình viết mỗi khi có người hỏi mình về cách hoạt động `reduce` và mình tin rằng đây là cách tốt nhất để giải thích cho những ai chưa biết về `reduce`, rất ngắn gọn, xúc tích và người hỏi cũng không cần phải đọc cả 1 đoạn văn dài dòng như mình viết ở trên =))).

```js
function reduce(arr, callback, resultInitialValue) {
    // đây chính là biến `result ngầm` mà mình có nhắc ở trên
    let result = resultInitialValue;

    for(let i = 0; i < arr.length; i++) {
        // chạy callback và gán giá trị mà callback trả về cho biến `result ngầm`
        result = callback(result, arr[i], i, arr);
    }
    
    return result;
}
```

Chúng ta cùng chạy thử ví dụ trên nhé.

```js
...

const arr = [1, 2, 3, 4, 5, 6];

const result = reduce(arr, function(result, currentItem, index) {
  return result += currentItem; 
}, 0);

console.log(result); // => 21 Binggggo !!!
```

## Lời kết
Như các bạn có thể thấy thì cách hoạt động của `reduce` không có gì phức tạp, khó hiểu cả. Mong rằng qua bài viết này các bạn sẽ hiểu hơn về `reduce` và sử dụng nó nhiều hơn trong dự án của mình nhé. Chúc các bạn một ngày làm việc vui vẻ. Cheer !