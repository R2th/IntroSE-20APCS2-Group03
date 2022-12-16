Hi mọi người, tiếp theo series mình sẽ trình bày về giải thuật Divide and Conquer(Chia để trị)

### 1.22 Master Theorem for Divide and Conquer Recurrences

Tất cả các thuật toán Divide and Conquer (Mình sẽ thảo luận chi tiết trong chương Divide and Conquer) **chia bài toán thành các bài toán con, mỗi bài toán là một phần của bài toán ban đầu, sau đó thực hiện một số công việc bổ sung để tính ra câu trả lời cuối cùng.**

Ví dụ, thuật toán Merge sort (Mình sẽ trình bày kĩ hơn ở chương Sort) hoạt động trên **hai bài toán con**, mỗi bài toán nhỏ bằng **một nửa kích thước của bài toán ban đầu T(n/2)**, và sau đó thực hiện thêm **O(n) công việc để hợp nhất**.\
=> Điều này đưa ra phương trình tính running time:\

![image.png](https://images.viblo.asia/ade7d8d0-ff6f-4b4f-8742-2413d02ab672.png)

\
Định lý sau có thể được sử dụng để xác định thời gian chạy của các divide and conquer.\
Đối với một chương trình (thuật toán) đã cho, trước tiên chúng ta cố gắng tìm mối quan hệ lặp lại cho vấn đề.\
Nếu sự lặp lại có dạng như dưới đây thì chúng ta có thể trực tiếp đưa ra câu trả lời mà không cần giải quyết hoàn toàn.\

![image.png](https://images.viblo.asia/4bb6cf3c-e62c-4105-bf11-e8f67266131a.png)
> \
> với **a ≥ 1, b > 1, k ≥ 0 và b là 1 số thực** thì: 
> 1.  Nếu **a > b^k**  \
>   ![image.png](https://images.viblo.asia/f65260a4-c70f-48f1-999f-3e8878391ad9.png)
> 2.   Nếu **a = b^k**
>         * a. Nếu **p > –1** \
> ![image.png](https://images.viblo.asia/0cf854b5-cb59-429b-987b-530cb5d9f34b.png)
>         * b. Nếu **p = –1** \
> ![image.png](https://images.viblo.asia/692ac282-ac1c-49b8-8ecf-ba478326e2bc.png)
>         * c. Nếu **p < –1** \
> ![image.png](https://images.viblo.asia/e38e957c-44b3-4504-a4e9-9fad23059402.png)
> 3.   Nếu **a < b^k**
>         * a. Nếu **p ≥ 0** \
> ![image.png](https://images.viblo.asia/6fd5c174-056f-4a39-8f9b-44b52df77a7a.png)
>         * b. Nếu **p < 0** \
> ![image.png](https://images.viblo.asia/33d2213a-0bfc-476c-a52e-d4846cb3d2b3.png)


Định lý quả thật phức tạp, mình xin phép chỉ dừng ở mức độ sử dụng định lý và áp dụng, các bạn nếu như có đam mê sâu hơn về toán muốn chứng minh định lý có thể tham khảo link sau(hoặc gg search thêm giúp mình nhé 😁):\
[https://www.cs.purdue.edu/homes/spa/papers/jacm-divide.pdf]

### 1.23 Divide and Conquer Master Theorem: Problems & Solutions
Đối với mỗi problem sau đây, đưa ra một biểu thức cho thời gian chạy T(n) nếu nó có thể được giải quyết bằng Master Theorem.\
Nếu không, chỉ ra rằng Master Theorem không áp dụng.

**Problem-1**\
T(n) = 3T (n/2) + n^2\
**Solution**: Các bạn tìm từ biểu thức các biến a, b, k, p rồi kiểm tra xem nó thuộc trường hợp nào trong Master Theorem, các bài sau các bạn áp dụng tương tự nhé.\
Giải thích chi tiết:\
Ta có a=3, b=2, k=2, p=0(Vì n^2 = n^2 * 1 = n^2 * (1 biểu thức bất kỳ)^0 )\
⇒ 3 < 2^2 và p = 0 ⇒ T(n) = Θ(n^2) (Master Theorem Case 3.a)


-----

**Problem-2**
T(n) = 4T (n/2) + n^2\
**Solution**: T(n) = 4T (n/2) + n^2 ⇒ T (n) = Θ(n^2 * logn) (Master Theorem Case 2.a)



-----


**Problem-3**
T(n) = T(n/2) + n 2\
**Solution**: T(n) = T(n/2) + n^2 ⇒ Θ(n^2) (Master Theorem Case 3.a)


-----


**Problem-4**
T(n) = 2^n * T(n/2) + n^n\
**Solution**: T(n) = 2^n T(n/2) + n n ⇒ Không áp dụng vì a không phải 1 hằng số)


-----



**Problem-5**
T(n) = 16T(n/4) + n\
**Solution**: T(n) = 16T (n/4) + n ⇒ T(n) = Θ(n^2) (Master Theorem Case 1)


-----


Từ đây các kí hiệu số mũ trong hàm log hơi khó biểu diễn trên viblo nên mình xin phép dùng ảnh 
![image.png](https://images.viblo.asia/b4c5751c-eeb5-4009-8381-ec8e1d332ea9.png)

![image.png](https://images.viblo.asia/6f1d6f27-84ac-43ed-b682-a100e04b29d0.png)

Bài viết này hơi nặng về toán, nó là lý thuyết tổng quát cho giải thuật chia để trị. Ở các chương sau khi có các bài toán cụ thể hơn sẽ áp dụng các lý thuyết này để tính được độ phức tạp của giải thuật 😁