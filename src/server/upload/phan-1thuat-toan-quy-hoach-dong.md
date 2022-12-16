**Xin chào các bạn hôm nay chúng ta cùng nhau tìm hiểu một chút về thuật toán, cụ thể mình sẽ nói đến thuật toán qui hoạch động**

### Giới thiệu về thuật toán qui hoạch động

- Là một kĩ thuật thiết kế thuật toán theo kiểu chia bài toán lớn thành các bài toán con, sử dụng lời giải của các bài toán con để tìm lời giải cho bài toán ban đầu.
- Khác với chia để trị, quy hoạc động, thay vì gọi đệ quy, sẽ tính trước lời giải của các bài toán con và lưu vào bộ nhớ (thường là một mảng), và sau đó lấy lời giải của bài toán con ở trong mảng đã tính trước để giải bài toán lớn

Ví dụ : bài toán kinh điển **Fibonaci**. Tính số fibonaci thứ `n`, `F(n)`

+ `F(0)=0`, `F(1)=1`

+ `F(n)=F(n-2)+F(n-1)` với `n>1`

+ `F(2)=1`, `F(3)= 2`, `F(4) = 3`, `F(5)=5`, `F(6)=8` ...

Để các bạn dễ hình dung về qui hoạch động, chúng ta hãy cũng tiếp cận theo chia để trị trước sau đó chúng ta quan sát cách thức hoạt động của 2 thuật toán này.

**Chia để trị**

```
Function Fib(n)
{
  if n<2 then
    return n;
  else
    return Fib(n-1) + Fib(n-2);
}
```

![](https://images.viblo.asia/f43e92ef-3e69-4461-9bfe-ec863f725721.png)


![](https://images.viblo.asia/511ed656-264f-4112-be6c-3b891bf16681.png)

Ta thấy được chia để trị khi gọi để qui ta phải tính lại các bài toán con rất nhiều lần. Rõ ràng như vậy không ổn lắm :))

**Vì vậy cùng thử phân tích theo qui hoạch động xem sao nhé :**

### Phân tích thuật toán

![](https://images.viblo.asia/90c84d67-bebb-4826-ae1f-f7514df7cecc.png)

![](https://images.viblo.asia/1e03206d-138b-4e5d-833b-783eac783a12.png)


Ta sử dụng một mảng để lưu trữ kết quả của bài toàn trước vì vậy việc tính toán trở nên đơn giản hơn rất nhiều.

**Bạn hãy thử suy nghĩ giữa 2 cách trên, so sánh bộ nhớ và thời gian thực hiện xem cái nào tối ưu hơn ?**

Chúng ta phải nên chấp nhận một điều đó là tốc độ tỉ lệ nghịch với bộ nhớ (bộ nhớ ở đây là RAM nhé chứ không phải ssd đâu ạ :v )

Tuy nhiên trong bài toán này dùng qui hoạch động sẽ tối ưu hơn khi chúng ta tính toán với những con số lên đến triệu hoặc tỉ....
nếu dùng chia để trị thì mình nghĩ tính F[1 tỷ] máy tính bạn sẽ đơ luôn đấy :)) không tin tự mình thử đi.
 
 Tóm lại mình xin tóm tắt ý tưởng của qui hoặc động như sau:
 
- **Phân rã**: Chia bài toán cần giải thành những bài toán con nhỏ hơn đến mức có thể giải trực tiếp được hay không?? 
- **Nếu được** => **Giải các bài toán con và ghi nhận lời giải**: Lưu trữ lời giải của các bài toán con vào một bảng để sử dụng về sau.
- **Tổng hợp lời giải:**
  - Tổng hợp lời giải các bài toán con kích thước nhỏ hơn thành lời giải bài toán lớn hơn.
  - Tiếp tục cho đến khi thu được lời giải của bài toán xuất phát (là bài toán con có kích thước lớn nhất)

![](https://images.viblo.asia/3460f8af-2fad-45fa-8fa9-574465b350d0.png)

### Kết luận

Rồi vậy là bạn đã hiểu cơ bản qui hoạch động là gì rồi đấy .

Đừng vội mừng nha vì đây mới là phần mở đầu để các bạn có thể biết nó là gì thôi còn phần sau nữa, phần sau mình sẽ đưa những bài toán phức tạp áp dụng qui hoạch động. hãy theo dõi phần tiếp theo của mình nhé.

Cảm ơn các bạn đã đọc bài viết này của mình xin chào và hẹn gặp lại các bạn!

### Tài liệu tham khảo.

https://www.geeksforgeeks.org/dynamic-programming/

phần 2: https://viblo.asia/p/phan-2thuat-toan-quy-hoach-dong-maGK73zbKj2