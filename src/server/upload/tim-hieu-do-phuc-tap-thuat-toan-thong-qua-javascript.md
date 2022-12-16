![](https://images.viblo.asia/96851ae4-1258-4f5e-97ac-2a6a1d23e6fc.png)

### 1. `Big O Notation` là gì?

Ký hiệu Big O chỉ là một cách biểu thị độ phức tạp tính toán khi bạn thực hiện một tác vụ

Mặc dù có các ký hiệu khác, ký hiệu `Big O` thường được sử dụng nhiều nhất vì nó tập trung vào kịch bản trường hợp xấu nhất, dễ dàng hơn để định lượng và trao đổi [(còn có Big Theta, Big Omega)](https://en.wikipedia.org/wiki/Big_O_notation)

Trường hợp xấu nhất có nghĩa là cần nhiều thời gian cũng như bộ nhớ nhất để hoàn thành nhiệm vụ, vì với các trường hợp tốt thì ta cũng không phải bận tâm làm gì.

Khi bạn tìm hiểu thêm về ký hiệu `Big O`, bạn có thể thấy nhiều biến thể khác nhau và tốt hơn của biểu đồ này. 

![](https://images.viblo.asia/ff6cbcf4-b1b3-4da4-8600-ae1a32fe6c84.png)

* Ảnh trên là độ phức tạp giữa các thuật toán sắp xếp

Phần tiếp theo sẽ là các ví dụ để làm rõ hơn các mức độ phức tạp của thuật toán

Dữ liệu để thực hiện ví dụ sẽ là 2 mảng dữ liệu một nhỏ, một lớn để kiểm chứng sự phức tạp trong từng thuật toán có phụ thuộc vào độ lớn của dữ liệu hay không

```
const smArr = [5, 3, 2, 35, 2];

const bigArr = [5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2, 5, 3, 2, 35, 2];
```

Ngoài ra, để có thể đo lường được thời gian thực hiện các tác vụ sẽ có sử dụng  performance API của JS

Đủ hết rồi đó, bắt đầu thôi!!!

### 2. O(1)

Đây chính là độ phức tạp lý tưởng giải thuật, cho dù có bao nhiêu item trong màng, dù là một hay một triệu, thời gian hoàn thành sẽ vẫn sẽ không đổi vì tác vụ đó chỉ cần thực hiện có một lần. 

Đẩy vào một mảng, nhận một item tại một chỉ mục cụ thể, thêm một phần tử con, v.v., tất cả sẽ mất cùng một khoảng thời gian bất kể độ dài của mảng.

```
const a1 = performance.now();
smArr.push(27);
const a2 = performance.now();
console.log(`Time: ${a2 - a1}`); // Less than 1 Millisecond


const b1 = performance.now();
bigArr.push(27);
const b2 = performance.now();
console.log(`Time: ${b2 - b1}`); // Less than 1 Millisecond
```

### 3. O(log n)

Ví dụ tốt nhất cho độ phức tạp logarit là tưởng tượng việc tìm kiếm một từ trong một cuốn từ điển (được sắp xếp aphabet). Bạn sẽ bắt đầu tìm kiếm tại một ví trí bất kì,  ví dụ là kí tự `N`, sau đó sẽ so sánh vị trí với vị trí kết quả muốn tìm kiếm để có thể điều chỉnh việc tìm kiếm tăng hay lùi lại (Giống với việc mysql select một bản ghi có đánh index)

Với cách tiếp cận `chia rẽ để trị` này, lượng thời gian để tìm thứ gì đó vẫn sẽ thay đổi tùy thuộc vào kích thước của từ điển nhưng không ở đâu gần với tỷ lệ `O (n)`. Bởi vì nó tìm kiếm trong các phần cụ thể dần dần mà không cần xem hầu hết dữ liệu, nên việc tìm kiếm trong một nghìn mục có thể mất ít hơn 10 thao tác trong khi một triệu có thể mất ít hơn 20, giúp bạn tìm kiếm được nhanh hơn

Trong ví dụ này, chúng ta có thể thực hiện một quicksort đơn giản.

```
const sort = arr => {
  if (arr.length < 2) return arr;

  let pivot = arr[0];
  let left = [];
  let right = [];

  for (let i = 1, total = arr.length; i < total; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  };
  return [
    ...sort(left),
    pivot,
    ...sort(right)
  ];
};
```

```
sort(smArr); // 0 Milliseconds
sort(bigArr); // 1 Millisecond
```

### 4. O(n)

Theo mặc định, tất cả các vòng lặp là một ví dụ về tính tuyến tính trong độ phức tạp `O(n)` vì có mối quan hệ một-một giữa kích thước dữ liệu và thời gian hoàn thành. 

Vì vậy, một mảng với các mục nhiều hơn 1000 lần sẽ mất thời gian chính xác hơn 1.000 lần.

```
const a1 = performance.now();
smArr.forEach(item => console.log(item));
const a2 = performance.now();
console.log(`Time: ${a2 - a1}`); // 3 Milliseconds

const b1 = performance.now();
bigArr.forEach(item => console.log(item));
const b2 = performance.now();
console.log(`Time: ${b2 - b1}`); // 13 Milliseconds
```

### 5. O(n^2)

Độ phức tạp theo cấp số nhân là một cái bẫy mà tất cả chúng ta đều rơi vào ít nhất một lần. 

Ví dụ cần tìm một cặp giá trị phù hợp cho từng mục trong một mảng? Đặt một vòng lặp bên trong một vòng lặp là cách tuyệt vời để biến một mảng 1.000 item thành một triệu kết quả tìm kiếm mà nó sẽ dẫn đến việc đóng băng trình duyệt của bạn.

```
const a1 = performance.now();
smArr.forEach(() => {
    arr2.forEach(item => console.log(item));
});
const a2 = performance.now();
console.log(`Time: ${a2 - a1}`); // 8 Milliseconds


const b1 = performance.now();
bigArr.forEach(() => {
    arr2.forEach(item => console.log(item));
});
const b2 = performance.now();
console.log(`Time: ${b2 - b1}`); // 307 Milliseconds
```

### 6. O(n!)

Cuối cùng, một trong những khả năng tồi tệ nhất, độ phức tạp giai thừa `O(n!)`.

Ví dụ theo kiểu sách giáo khoa là vấn đề nhân viên bán hàng du lịch. Nếu bạn có một loạt các thành phố có khoảng cách khác nhau, làm thế nào để bạn tìm ra con đường ngắn nhất có thể đi giữa tất cả chúng và trở về điểm xuất phát? 

Phương pháp chày cối nhát sẽ là kiểm tra khoảng cách giữa điểm có thể kết nối giữa mỗi thành phố, đây sẽ là một giai thừa các kết qủa và nó nằm ngoài khả năng của ta

Vì vấn đề đó trở nên rất phức tạp rất nhanh, chúng ta sẽ chứng minh sự phức tạp này bằng một hàm đệ quy ngắn. 

Hàm này sẽ nhân một số với hàm của chính nó, trừ đi một số. Mỗi chữ số trong giai thừa của chúng ta sẽ chạy chức năng riêng của nó cho đến khi nó về 0, với mỗi lớp đệ quy sẽ nối đằng trước  của nó vào số ban đầu của chúng tôi. Vì vậy, 3 được nhân với 2 chạy chức năng được nhân với 1 chạy lại bị dừng ở 0, trả về 6 (3*2*1 = 6)

Ví dụ:

```
const factorial = n => {
  let num = n;

  if (n === 0) return 1
  for (let i = 0; i < n; i++) {
    num = n * factorial(n - 1);
  };

  return num;
};
```

```
factorial(1); // 2 Milliseconds
factorial(5); // 3 Milliseconds
factorial(10); // 85 Milliseconds
factorial(12); //  11,942 Milliseconds
```

Ta có thể thấy độ phức tạp của thuật toán này lớn đến mức nào, thời gian xử lí giữa 10 và 12 chêch nhau quá nhiều

Dự định là cho lên 15 nhưng đến 12 thì máy cá nhân đã không thể chịu nổi rồi

### 7. Kết luận

Dựa trên các ví dụ trên thì ta có thể thấy việc giữ code của bạn càng hiệu quả càng tốt thật sự là cần thiết

Chúng ta luôn phải giữ cho sự phức tạp của thuật toán trong những dòng code càng thấp càng tốt, lý tưởng nhất là tránh mọi thứ trên `O (n)`.

Trên đây là tìm hiểu của mình về `Big O Notation`, hi vọng sẽ giúp ích được mọi người 

Cảm ơn đã theo dõi

### 8. Tài liệu tham khảo

[https://en.wikipedia.org/wiki/Big_O_notation](https://en.wikipedia.org/wiki/Big_O_notation)

[Big O notation](https://alligator.io/js/big-o-notation/)

[Js performance API](https://alligator.io/js/js-performance-api/)

[Bị gấu bỏ vì không biết Big O ](https://niviki.com/bi-gau-bo-vi-khong-biet-big-o-la-gi/)