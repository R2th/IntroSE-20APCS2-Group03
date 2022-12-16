### Currying là gì?
Đầu tiên, curry là 1 thuật ngữ được sử dụng khá nhiều trong các ngôn ngữ lập trình. Vậy curry là gì?

Theo Wikipedia thì currying là kỹ thuật chuyển đổi một hàm nhận nhiều đối số theo cách mà nó có thể được gọi là một chuỗi các hàm, mỗi hàm có một đối số. Ví dụ, một hàm lấy hai đối số, một từ X và một từ Y, và tạo ra kết quả đầu ra trong Z, bằng cách currying được dịch thành một hàm lấy một đối số duy nhất từ X và tạo ra các hàm đầu ra từ Y đến Z.
Giả sử bạn có 1 function nhận vào X và Y trả về Z:
##### ![](https://images.viblo.asia/8e4e5b25-a0bf-4142-b1be-d0514e2b18b3.png)
Currying sẽ tạo 1 function mới:
##### ![](https://images.viblo.asia/cf65f83d-c254-4af8-9eae-d62c12fb198f.png)
h sẽ nhận vào 1 tham số duy nhất là X và trả về 1 hàm mới, hàm này nhận vào Y và trả về Z:
##### ![](https://images.viblo.asia/8e4e5b25-a0bf-4142-b1be-d0514e2b18b3.png)

### Currying in ruby
Có thể bạn vẫn chưa hiểu rõ lắm về cách dùng của curry, bây giờ ta sẽ xem xét currying được sử dụng như thế nào trong ruby nhé
Giả sử bạn có 1 lambda đơn giản như sau:

```
> add = -> (a, b) { a + b }
```

 Khi ta gọi lambda với 1 tham số truyền vào kết quả:
```
 > add.(1)
> wrong number of arguments (given 1, expected 2)
```

Bạn thấy lỗi xuất hiện vì thiếu tham số truyền vào.

Thực hiện currying:
```
> curry_add = add.curry
> addone = curry_add(1)
> addone.(2)
=>3
```
Giải thích: ta thấy curry_add sẽ nhận vào 1 số và trả về function, function đó nhận đầu vào là 1 số rồi thực hiện phép cộng và trả về kết quả, để thấy rõ sự khác nhau bây giờ ta có thể thực hiện:

```
> add_curry.(1).(2)
=> 3
> add.(1,2)
=> 3
```
- Ta vừa có function mới addone với chỉ 1 tham số truyền vào thông qua curry thay vì viết 1 function mới :

```
> addone = -> (b) { 1 + b }
```
- Có vẻ nó chưa thật sự hữu ích lắm, nhưng trong trường hợp nào đó khi đối số truyền vào là phức tạp và người sử dụng function không cần phải quan tâm tới nó thì curry khá hoàn hảo để rút gọn code hơn. Thay vì bạn phải viết lại function mới bạn chỉ việc sử dụng curry với function cũ và truyền vào tham số cho nó.  
### Kết
Hi vọng qua bài viết này các bạn có thể hiểu rõ hơn về kĩ thuật currying cũng như có thể ứng dụng nó vào lập trình giúp ta có thể linh hoạt hơn trong việc sử dụng function.