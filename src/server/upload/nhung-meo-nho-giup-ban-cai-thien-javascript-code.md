![](https://images.viblo.asia/7bd0357a-19a0-4253-999e-e8b3d068aa66.png)

10 năm trước, Amazon đã chia sẻ rằng với mỗi 100ms trễ sẽ khiến họ tổn thất 1% lợi nhuận trong cả một năm. Như vậy mỗi 1s mất đi, công ty này có thể mất đến hàng tỉ đô mỗi năm - một con số khổng lồ với quãng thời gian ngắn ngủi như thế. Tương tự Google chỉ với  500ms trễ  trên trang web tìm kiếm sẽ giảm lưu lượng truy cập đi 20%, tương đương 1/5 doanh thu. 

Rất ít trong chúng ta sẽ  phải đối mặt với vấn đề lớn như của Amazon và Google nhưng hầu hết cũng sẽ phải đối mặt với vấn đề tương tự ở qui mô nhỏ hơn. Đặc biệt trong việc phát triển web , tốc độ trang web sẽ đóng vai trò quan trọng để cạnh tranh với các đối thủ.

Trong bài viết này, mình sẽ đưa ra các mẹo giúp tăng tốc cho Javascript code của bạn, bất kể là nó được viết ở phía server với node.js hay phía client. 

# Code ít đi

> "The fastest code is the code that never runs." 

Nghe thì có vẻ vô lí nhưng thực ra nếu áp dụng vào 2 trường hợp sau đây thì sẽ rất thuyết phục :smile:
## 1. Loại bỏ các tính năng không cần thiết
Nhìn qua thì có vẻ cơ bản nhưng trong nhiều trường hợp hiệu năng sẽ được cải thiện đáng kể nếu ta nhìn lại những đoạn code của mình và cân nhắc rằng liệu chúng có thực sự cần thiết không? Liệu chương trình hiện tại có phải thực hiện tất cả các chức năng mà nó được lập trình hay không? Nếu không hãy loại bỏ nó ngay lập tức.

Đây là bước quan trọng nhất để cải thiện tốc độ cho chương trình nhưng lại dễ dàng bị bỏ qua.
## 2.Tránh các bước không cần thiết
Ở một qui mô nhỏ hơn, chúng ta cần cân nhắc liệu mỗi bước có cần thiết để đưa ra kết quả cuối cùng hay không? 
Cùng xem qua ví dụ sau:
```js
'incorrect'.split('').slice(2).join('');  // converts to an array
'incorrect'.slice(2);                     // remains a string 
```
Ở đây kết quả cuối cùng muốn đưa ra là `'correct'`. Cách 1 chuyển chuỗi `'incorrect'` thành mảng sau đó cắt bỏ 2 kí tự đầu tiên rồi lại chuyển thành chuỗi. Trong khi đó cách 2 chỉ cần cắt bỏ 2 kí tự đầu tiên => loại bỏ các bước rườm rà. So sánh hiệu năng 2 dòng code trên tại [đây](https://jsperf.com/unnecessary-steps)
![](https://images.viblo.asia/07e0e5b8-8e44-498d-8012-793e8cc7991d.png)

Ví dụ trên có thể rất đơn giản nhưng nó sẽ đại diện cho những vấn đề lớn hơn. Trong thực tế ít người trong chúng ta sẽ mắc phải lỗi tương tự, tuy nhiên trong các dự án kéo dài và code rất phức tạp thì việc thêm vào những bước không cần thiết để đưa ra cùng một kết quả trả về là hoàn toàn có thể xảy ra. Cố gắng chú ý và tránh mắc phải lỗi này! 

# Tránh code lặp lại
Một trong những khả năng tuyệt vời của code đó là nó cho phép ta thực hiện các hành động lặp lại một cách rất dễ dàng, tuy nhiên nó là con dao 2 lưỡi làm giảm hiệu năng khi các việc được lặp lại nhiều hơn mức cần thiết.
Hãy xem qua những trường hợp cụ thể sau đây:
![](https://images.viblo.asia/e3fc2391-9ad2-44ea-acca-f3a43463adb3.jpeg)
## 3. Thoát khỏi vòng lặp ngay khi có thể
Trong nhiều trường hợp thì ta không nhất thiết phải thực hiện toàn bộ vòng lặp. Ví dụ: Khi bạn đã tìm ra giá trị mà bạn đang tìm kiếm thì việc thực hiện vòng lặp tiếp theo là không cần thiết. Bạn nên thoát khỏi vòng lặp bằng cách sử dụng `break`:
```js
for (let i = 0; i < haystack.length; i++) {
  if (haystack[i] === needle) break;
}
```
Lưu ý rằng chúng ta hoàn toàn có thể thoát ra khỏi vòng lặp lồng nhau bằng cách sử dụng [labels](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label).  Việc gán nhãn giúp chúng ta có thể thoát ra khỏi một vòng lặp cụ thể: 
```js
loop1: for (let i = 0; i < haystacks.length; i++) {
  loop2: for (let j = 0; j < haystacks[i].length; j++) {
    if (haystacks[i][j] === needle) {
      break loop1;
    }
  }
}
```
## 4. Khởi tạo một lần duy nhất 
Cùng xem xét một hàm mà ta sẽ gọi nhiều lần trong ứng dụng của mình: 
```js
function whichSideOfTheForce(name) {
  const light = ['Luke', 'Obi-Wan', 'Yoda']; 
  const dark = ['Vader', 'Palpatine'];
  
  return light.includes(name) ? 'light' : 
    dark.includes(name) ? 'dark' : 'unknown';
};
whichSideOfTheForce('Yoda');   // returns "light"
whichSideOfTheForce('Anakin'); // returns "unknown"
```

Vấn đề của đoạn code trên chính là mỗi lần gọi hàm `whichSideOfTheForce`, ta lại tạo mới `light` và `dark`đồng nghĩa với việc phải cấp lại bộ nhớ cho 2 mảng trên.
Vì các giá trị đã cho là static nên tốt hơn hết là chỉ định nghĩa 2 mảng trên một lần sau đó tham chiếu đến chúng. 

Cách 1: sử dụng biến global, mỗi lần gọi hàm thì truyền biến vào.

Cách 2: sử dụng [Closures function](https://www.w3schools.com/js/js_function_closures.asp), có nghĩa là giá trị trả về sẽ là một hàm. 
```js
function whichSideOfTheForce2(name) {
  const light = ['Luke', 'Obi-Wan', 'Yoda'];
  const dark = ['Vader', 'Palpatine'];
  return name => light.includes(name) ? 'light' :
    dark.includes(name) ? 'dark' : 'unknown';
};
```
Vì ta đã sử dụng `closures function` nên mảng `light` và `dark` bây giờ sẽ chỉ được khởi tạo một lần duy nhất. 
![](https://images.viblo.asia/99782977-aa15-4c48-bee0-58249ea89f99.png)


So sánh hiêu năng tại [đây.](https://jsperf.com/pre-compute-once-only)

Điều này không chỉ áp dụng với biến mà cả với hàm. Xem qua ví dụ sau:
```js
function doSomething(arg1, arg2) {
  function doSomethingElse(arg) {
    return process(arg);
  };
  return doSomethingElse(arg1) + doSomethingElse(arg2);
}
```
Tương tự như trên mỗi lần ta gọi hàm `doSomething` thì hàm `doSomethingElse` lại được tạo mới. Lần nữa thì `closures function` lại là giải pháp :
```js
function doSomething(arg1, arg2) {
  function doSomethingElse(arg) {
    return process(arg);
  };
  return (arg1, arg2) => doSomethingElse(arg1) + doSomethingElse(arg2);
}
```
## 5. Sắp xếp code để tối giản khối lượng tính toán
![](https://images.viblo.asia/db71d483-3e2b-4bed-9106-4d24d3d072cb.jpg)
Hãy tưởng tượng chúng ta có một mảng giá các items, lưu trữ với đơn vị là cents. Bây giờ chúng ta cần tính tổng giá tiền các items và lưu với đơn vị dolars
```js
const cents = [2305, 4150, 5725, 2544, 1900];
```
Hàm của chúng ta sẽ làm 2 việc: chuyển đổi cents sang dollars và tính tổng. Ta có thể sử dụng hàm sau:
```js
function sumCents(array) {
  return '$' + array.map(el => el / 100).reduce((x, y) => x + y);
}
```
Tuy nhiên nếu làm theo cách này thì ta phải thực hiện phép chia với mỗi phần tử trong mảng. Bây giờ thử đảo lại thứ tự các hành động, kết quả sẽ chỉ phải thực hiện phép chia 1 lần:
```js
function sumCents(array) {
  return '$' + array.reduce((x, y) => x + y) / 100;
}
```
Vấn đề ở đây là ta phải đảm bảo các hành động phải được sắp xếp theo thứ tự tốt nhất có thể.
## 6. Học Big O Notation
![](https://images.viblo.asia/af7d6457-5995-4fb1-8e41-e70614aba82e.png)
Big O Notation hay còn gọi là "Độ phức tạp của thuật toán" là cách tốt nhất để hiểu tại sao một số hàm lại chạy nhanh hơn và tốn ít bộ nhớ hơn những hàm khác. Ví dụ: Big O Notation sẽ chỉ ra tại sao Binary Search lại là một trong những thuật toán tìm kiếm hiệu quả nhất, hay tại sao Quicksort được xem là có hiệu năng tốt nhất để sắp xếp dữ liệu.

Ngoài ra kiến thức của Big O Notation sẽ giúp bạn hiểu rõ hơn các phương pháp tăng hiệu năng chương trình được giới thiệu trong bài này. 
Đọc thêm về Big O Notation tại [đây](https://medium.com/@bretcameron/ace-your-coding-interview-by-understanding-big-o-notation-and-write-faster-code-6b60bd498040)

# Tăng tốc code của bạn
![](https://images.viblo.asia/28dd94d5-b213-4a79-829e-615cb28e0c37.jpg)
Trong phần này chúng ta sẽ tập trung vào thay đổi cách bạn code thay vì cắt giảm hoặc giảm thời gian chạy của chúng
## 7. Sử dụng hàm có sẵn
Vì trình biên dịch code được thiết kế đề tối ưu hiệu năng cho những hàm hoặc những loại dữ liệu có sẵn nên hãy dùng các hàm có sẵn của Javascript. Trừ khi trường hợp của bạn là rất đặc biệt, nếu không khả năng code của bạn chạy nhanh hơn hàm có sẵn là rất thấp.

Để kiểm tra thì tôi sẽ test hàm `map` của javascript và hàm `map` tự code:
```js
function map(arr, func) {
  const mapArr = [];
  for(let i = 0; i < arr.length; i++) {
    const result = func(arr[i], i, arr);
    mapArr.push(result);
  }
  return mapArr;
}
```
Tạo một mảng random từ 1-100:
```js
const arr = [...Array(100)].map(e=>~~(Math.random()*100));
```
Bây giờ ta test một phép toán đơn giản là nhân mỗi số lên 2 và xem sự khác nhau giữ hiệu năng:
```js
map(arr, el => el * 2);  // Our JavaScript implementation
arr.map(el => el * 2);   // The built-in map method
```
![](https://images.viblo.asia/a0785d4b-cc55-4016-aae9-7504dd589714.png)
Trong bài test của tôi thì hàm `map` tự viết chạy chậm hơn 69%. Test tại [đây](https://jsperf.com/prefer-built-in-methods/1)

[Source code hàm map](https://github.com/v8/v8/blob/master/src/builtins/array-map.tq)
## 8. Sử dụng đối tượng phù hợp nhất cho công việc đang làm
Cùng xem qua kết quả test của 2 ví dụ sau:

Ví dụ 1: [Thêm giá trị vào Set và array](https://jsperf.com/adding-to-a-set-vs-pushing-to-an-array)
![](https://images.viblo.asia/8e46a1da-556a-430f-9306-536699da11d9.png)

Ví dụ 2: [Thêm entries vào Map và thêm entries vào Object](https://jsperf.com/adding-map-vs-adding-object)
![](https://images.viblo.asia/8615e8d3-ef84-4fa5-a8b3-aa3a4766c2d2.png)
Trong ví dụ trên Set và Map là các `keyed collections` chính vì thế chúng sẽ tương thích trong trường hợp bạn cần thêm hoặc xóa các entries.

Tương tự ta sẽ thu được hiệu năng tốt nhất bằng cách chọn đối tượng có sẵn thích hợp nhất với công việc được giao. 

Các đối tượng có sẵn của Javascript vượt xa các loại nguyên thủy `Numbers` , `Strings` , `Functions` , `Objects`,...Nếu được dùng trong ngữ cảnh thích hợp, nhiều đối tượng ít phổ biến hơn lại đêm lại gia tăng hiệu năng đáng kể
## 9. Chú ý đến Memory
Vì là một ngôn ngữ bậc cao nên Javascript đã giúp chúng ta xử lí các vấn đề cấp thấp, một trong số đó chính là việc quản lí bộ nhớ. Javascript sử dụng một hệ thống gọi là `garbage collection` để dọn dẹp những vùng nhớ không cần thiết. Mặc dù nó được vận hành tự động tuy nhiên nó không hẳn đã là hoàn hảo.  Bạn có thể thực hiện thêm một số bước để quản lí và tránh rò rỉ bộ nhớ.

Ví dụ, `Set` và `Map` có một biến thể `yếu` của chúng dưới dạng `WeekSets` và `WeekMaps`. Chúng không thể trả về dưới dạng vòng lặp `Enumerable` tuy nhiên chúng lại ngăn ngừa rõ rỉ bộ nhớ bằng cách đảm bảo các giá trị không được tham chiếu đến được `garbage collection` dọn dẹp.

Ngoài ra bạn còn có thể quản lí vùng nhớ tốt hơn bằng cách sử dụng đối tượng  Javascript's `TypedArray`, được giới thiệu trong ES2017. Ví dụ `Int8Array` nhận giá trị trong khoảng -128 đến 127 và size chỉ bằng 1 byte.

# Kết luận
Cách tốt nhất để kiểm tra bạn có đang tối ưu trang web của mình không chính là đưa nó vào test. Bài viết này sử dụng  https://jsperf.com/ .
Ngoài ra để kiểm tra hiệu suất của cả trang web của bạn thì học cách sử dụng [Chrome’s Dev Tools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/) cũng là một lựa chọn không tồi.
Cuối cùng nhưng không kém phần quan trọng, tăng hiệu suất không phải là tất cả của việc code. Việc code dễ đọc và dễ bảo trì cũng không kém phần quan trọng, chính vì vậy không nên đánh đổi một chút hiệu năng nhỏ mà dẫn tới tốn thời gian để tìm kiếm và fix bug. 

Hy vọng qua bài này, các bạn có thể cải thiện Javascript code của mình và giúp chương trình chạy nhanh hơn! Hẹn gặp lại ở những bài viết sau!