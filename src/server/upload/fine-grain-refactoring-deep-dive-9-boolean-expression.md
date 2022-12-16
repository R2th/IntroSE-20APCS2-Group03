## 1. Order of operand

Cho bài toán sau: Với một số `x` cho trước, hãy viết biểu thức boolean để kiểm tra xem `x` có nằm trong khoảng - **open intervals**  (1, 10)  hay không? Nếu có, hãy in ra màn hình giá trị của `x`.

Tức là chúng ta cần kiểm ta điều kiện `1 < x < 10` có thỏa mãn hay không. Nào, cùng điểm qua một vài cách viết:

```Java
 if (1 < x && 10 > x) {
     //print
 }
 
...

 if (x > 1 && 10 > x) {
     //print
 }
```

Bạn thấy gì qua ví dụ trên? Nhiều khả năng bạn sẽ thấy bình thường, nhưng với cá nhân mình thì có chút gì đấy hơi thiếu tự nhiên, không ăn khớp giữa luồng suy nghĩ và flow của code. Bởi vì `x` là đối tượng trung tâm của bài toán này, `x` phải là đối tượng xuất hiện đầu tiên trong biểu thức so sánh (comparison expression) thay vì đối tượng được so sánh với `x`. Thế nên mình viết lại biểu thức trên theo một cách mà đối với mình là tự nhiên nhất như sau:
```Java
 if (x > 1 && x < 10) {
     //print
 }
```

## 2. De Morgan’s Laws (Equivalent Boolean Expressions) 
Cho bài toán sau:  Với một số `x` cho trước, hãy viết chương trình in ra giá trị của `x` nếu `x`  **không thỏa mãn** cả hai điều kiện:
- `x` lớn hơn 1
- `x` nhỏ hơn 10

Và bạn sẽ viết chương trình như thế này:
```Java
if (!(x > 1 && x < 10)) {
     //print
 }
```
Đoạn code này thì đã thành công trong việc biểu diễn luồng suy nghĩ nhưng lại có một chút hơi khó đọc, tạo nên bối rối cho người khác vì theo như kinh nghiệm của mình thì biểu thức boolean dạng như thế này tương đối ít gặp do đó bộ não khi nhận được tín hiệu sẽ bị delay khi xử lý. Và câu chuyện bây giờ là áp dụng `De Morgan’s Laws` để chuyển biểu thức boolean trên thành một dạng phổ biến hơn:
```Java
if (!(x > 1) || !(x < 10)) {
     //print
 }
```

Định luật này được phát biểu như sau:
- The negation of a conjunction is the disjunction of the negations (Phủ định của một phép hội là phép tuyển của những phủ định)
- The negation of a disjunction is the conjunction of the negations (Phủ định của một phép tuyển là phép hội của những phủ định).

![image.png](https://images.viblo.asia/f447b0bd-c3a8-4976-ac61-c2db45095b50.png)

## References
- https://runestone.academy/ns/books/published/csjava/Unit3-If-Statements/topic-3-6-DeMorgan.html
- https://en.wikipedia.org/wiki/De_Morgan%27s_laws