Nhiều bài viết thảo luận về cách sử dụng **.forEach (), .map (), .filter (), .reduce ()** và **.find ()** trên các mảng trong JavaScript. Bài viết này cung cấp một lời giải thích khi nào nên sử dụng các phương thức này.

.map (), .filter (), .reduce () và .find () đều hoạt động rất giống với .forEach () vì vậy bây giờ chúng ta hãy tập trung vào .foreach trước.

### What is forEach? A way to work with items in an array.
có thể bạn sẽ quen với việc sử dụng vòng lặp for để lặp đi lặp lại qua một mảng hơn, phương thức .forEach() đơn giản chỉ là một cách khác để làm điều này.ví dụ:

vòng for:
```js
var array = [1,2,3];
for (var i = 0; i < array.length; i++){
  console.log(i);
}
```

forEach()
```js
var array = [1,2,3];
array.forEach(function(i){
  console.log(i);
});
```

### Why forEach? Ease of Use and Readability.

 .forEach () có lợi hơn vòng lặp for vì dễ sử dụng hơn. Mặc dù nó có cùng số dòng, nhưng có ít thiết lập hơn. Với một vòng lặp thông thường, bạn có ba bước:

1. Xác định một giá trị lặp: var i = 0;

2. Xác định một điểm kết thúc: i < array.length;

3. Cho biết vòng lặp nên lặp như thế nào: i ++;

Với .forEach () bạn chỉ cần truyền một hàm được thực thi trên mỗi phần tử trong mảng.

### Why forEach? Scope.
Khi sử dụng .forEach (), bạn chuyển một hàm riêng lẻ với phạm vi riêng của nó. Trong một vòng lặp for tiềm ẩn nhiều rủi ro hơn ở bất cứ  nào bạn đặt vòng lặp.

### When to use forEach?

sử dụng .forEach () khi bạn cần thực thi một hàm cho từng phần tử riêng lẻ trong một mảng. Tốt nhất là bạn nên sử dụng .forEach () khi bạn không thể sử dụng các phương thức mảng khác để thực hiện mục tiêu của mình. Nghe có vẻ mơ hồ, nhưng .forEach () là một công cụ chung, chỉ sử dụng nó khi bạn không thể sử dụng một công cụ chuyên dụng hơn (một trong những phương thức đặt thù ở dưới).

### When to use map?

.map () khi bạn muốn chuyển đổi các phần tử trong một mảng.

### When to use filter?

.filter () khi bạn muốn chọn một tập hợp con gồm nhiều phần tử từ một mảng.

### When to use find?

.find () Khi bạn muốn chọn một phần tử từ một mảng.

### When to use reduce?

.reduce () khi bạn muốn lấy một giá trị từ nhiều phần tử trong một mảng.

### A word about speed.

Một trong những lời chỉ trích lớn nhất của .forEach () là tốc độ hoạt động.

Trong thực tế, bạn không nên sử dụng .forEach () trừ khi các phương thức khác như .map () có thể thực xử lý được. .map () thực sự nhanh hơn một chút so với .forEach (). Phải thừa nhận rằng .forEach () và .map () vẫn chậm hơn vòng lặp for . Nhưng việc đánh giá một phương pháp chỉ dựa trên tốc độ thực hiện là 1 điều sai lầm. đánh giá này này hoàn toàn bỏ qua tính Readability của code và scope.
Điểm đáng chú ý ở đây là **đừng sử dụng các vòng lặp vì bạn nghĩ rằng chúng nhanh hơn, hãy sử dụng chúng khi bạn biết bạn cần.**

Nguồn tham khảo:

https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

https://medium.com/@JeffLombardJr/understanding-foreach-map-filter-and-find-in-javascript-f91da93b9f2c