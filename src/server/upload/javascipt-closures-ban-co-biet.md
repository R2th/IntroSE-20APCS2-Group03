JavaScript Closures luôn là một thứ gì đó rất huyền bí. Dù đã đọc nhiều bài viết khác nhau, đã sử dụng closures rất nhiều, thậm chí tôi đã sử dụng nó mà mình không hề biết mình đang sử dụng nó.
# Một số ví dụ đơn giản 
Trước khi bắt đầu, chúng ta hãy tìm hiểu những ví dụ đơn giản sau đây:
## Ví dụ 1
![](https://images.viblo.asia/492f6cc6-e0db-4ce3-aaa7-d7edca1bf55a.png)

Đối với bất kỳ ai đã từng làm việc với JavaScript thì kết quả đoạn code trên rất rõ ràng. Đoạn code trên sẽ in ra màn hình kết quả **12**. Để hiểu được cách JavaScript engine nó hoạt động như thế nào, chúng ta hãy break down chi tiết đoạn code trên:
1. Dòng 1, khai báo một biến mới có tên là **val1** trong **global execution context**, sau đó gán giá trị cho nó là **2**.
2. Dòng 2-5, khai báo là một biến tên là **multiplyThis**, sau đó gán cho nó giá trị là định nghĩa của một function.
3. Dòng 6, khai báo một biến mới có tên là **multiplied** trong **global execution context**. Sau đó gán giá trị của **multiplyThis** và thực thi nó với tham số truyền vào là **6**.
4. Quay lại dòng 2, thực thi function đồng nghĩa với việc một **local execution context** mới được tạo ra.
5. Trong **local execution context** này, có một điểm chú ý là biến được tạo đầu tiên không phải là **ret** mà là biến **n**. Sau đó, gán giá trị của tham số truyền vào cho n => **n=6**.
6. Dòng 3, khai báo một biến mới tên là **ret**.
7. Vẫn trên dòng 3, thực hiện phép nhân với hai toán tử là giá trị của hai biến **n** và **val1**. Trong **local execution context**, tìm biến **n**. Nó lã được gắn ở bước 5 và giá trị của nó ở đây là **6**. Tiếp đến tìm biến **val1**. Trong **local execution context** hiện tại không có biến nào tên **val1**. Tìm đến **calling context**. **calling context** lúc này là **global execution context**. Ơn giờ, ở bước 1 ta đã defined một biến **val1** và giá trị của nó là **2**.
8. Thực hiện phép nhân giữa hai biến **n** và **val1** => *6x2=12*. Sau đó, gán giá trị cho biến **ret** => **ret = 12**.

![](https://images.viblo.asia/40a104fe-7b55-4266-a39e-ce5ac3cb73e9.png)




9. Dòng 4, return giá trị của biến **ret**. Tiến hành pop **local execution context** ra khỏi Call Stack, đồng thời xóa biến **ret** và **n** khỏi bộ nhớ. Ở đây, biến **val1** không bị hủy vì nó nằm trong **global execution context**.
10. Quay là dòng 6, trong **calling context**, biến **multiplied** được gán giá trị là **12**.

![](https://images.viblo.asia/b64a66a3-f03b-4199-af64-0bea5f694356.png)


11. Cuối cùng, trên dòng 7, chúng ta sẽ thấy giá trị **12** được in ra màn hình.

Trong ví dụ trên, chúng ta cần nhớ rằng một function ngoài việc có thể truy cập đến những biến trong **local execution context** của nó thì nó có thể truy cập đến những biến trong **calling context** gọi đến function đó.
## Ví dụ 2
Ở ví dụ này, chúng ta sẽ tìm hiểu một function có giá trị trả về là một function.

![](https://images.viblo.asia/0c8c0406-94c3-44da-9d07-e51f61ebbe6a.png)


1. Tương tự như ở ví dụ trên, dòng 1-8, khai báo biến **val** có giá trị là **7** và biến **createAdder** có giá trị là định nghĩa của một function.
2. Dòng 9, khai báo một biến **adder**, gán giá trị của **createAdder** và thực thi nó. Ở đây, biến adder nhận giá trị là định nghĩa của function **addNumbers** được trả về trong function **createAdder**.

![](https://images.viblo.asia/330c90d5-a1e3-4b46-9f26-00eac12c7349.png)

 
3. Dòng 10, khai báo biến **sum**, gán giá trị của **adder** cho nó. Ở đây, **adder** đang nhận giá trị là một function nên sau đó ta thực thi function này với tham số truyền vào là **val** và **8**.
4. Dòng 3, khai báo hai biến **a** và **b** nhận giá trị là giá trị của tham số truyền vào. Biến **a** nhận giá trị của tham số truyền vào đầu tiên, ở đây là giá trị của biến **val** => **a=7**. Biến **b** nhận giá trị của tham số truyền vào thứ 2 => **b=8**.

![](https://images.viblo.asia/87a082af-7d57-4b04-931b-05c5d55a33ec.png)


5. Dòng 4, khai báo biến **ret**, gán giá trị của phép cộng giữa **a** và **b** => **ret=7+8=15**. Trả về giá trị của biến **ret** là **15**.

![](https://images.viblo.asia/0bfb8a50-d851-489b-ad62-e8fa37d77079.png)


6. Dòng 10, tiến hành pop **addNumbers** khỏi Call Stack, đồng thời xóa biến **a**, **b** và **ret** khỏi bộ nhớ. Biến **sum** được gán giá trị là **15**.

![](https://images.viblo.asia/f85a775f-dc46-413b-a823-6640a9597b5e.png)


7. Cuối cùng, in giá trị **15** ra màn hình.

Qua hai ví dụ đơn giản phía trên, chúng ta cần lưu ý một số điểm quan trọng.
1. Định nghĩa của một function có thể lưu vào một biến, function đó có thể không xuất hiện trong chương trình cho đến khi nó được gọi đến.
2. Mỗi lần function được gọi, một local execution context sẽ được tạo. Execution context đó sẽ bị pop khỏi Call Stack khi một function kết thúc.

# Closure
Tiếp theo, chúng ta hãy nhìn đoạn code phía dưới và tìm hiểu xem kết quả sẽ là gì?

![](https://images.viblo.asia/e95c5bcd-a506-447e-8255-5e824feaffa6.png)


Theo bạn, kết quả in ra màn hình sẽ là gì? 
**A.** 1 1 1
**B.** 1 undefined undefined
**C.** undefined undefined undefined
**D.** 1 2 3
**E.** Một đáp án khác
Nếu dựa vào cách giải nghĩa từ hai ví dụ trên thì đáng lẽ ra kết quả sẽ là đáp án **A** đúng không? Nhưng có gì đó không ổn ở đây, khi execute đoạn code trên thì kết quả khi in ra màn hình không phải là **1 1 1** mà lại là **1 2 3**. How? Bằng một cách *thần kỳ* nào đó, mà JavaScript đã nhớ được giá trị của biến **counter**.

Liệu có phải biến **couter** là một phần của **global execution context** không? Thử *console.log(counter)* xem sao và thật là giá trị lại là **undefined**.

Có lẽ, khi gọi function **increment**, bằng cách nào đó nó quay lại function đã tạo trước đó **createCounter**? Nhưng giá trị biến **increment** là một **function definition** nên không thể thực hiện điều này. 

Vậy thì phải có một cơ chế khác ở đây. Đó chình là **Closure**.

**Closure chứa tất cả các biến mà trong scope tại thời điểm tạo function đó.** Nó giống như một chiếc *ba-lô* chứa tất cả các biến trong scope tại thời điểm function được tạo ra.

Vì vậy, ví dụ trên có thể được giải thích như sau:

![](https://images.viblo.asia/e95c5bcd-a506-447e-8255-5e824feaffa6.png)


1. Dòng 1-8, khai báo biến **createCounter** có giá trị là định nghĩa của một function.
2. Dòng 9, khái báo biến **increment**, gán giá trị của **createCounter** và thực thi nó. Ở đây biến **increment** nhận giá trị là định nghĩa của function **myFunction**.

![](https://images.viblo.asia/e4b75fe5-21bf-4459-af86-1fb9b006a3a2.png)


3. Dòng 10, khai báo biến c1, gán giá trị của biến **increment** và thực thi nó.
4. Dòng 4, tìm biến **counter**. Trước khi tìm trong **local execution context** hoặc **global execution context**, chúng ta check trong *closure*. Trong Closure, chúng ta có chứa biến có tên là **counter**, nó có giá trị là **0**.

![](https://images.viblo.asia/b7180bb8-ccb0-4ce4-a6e4-3f9b91a14816.png)


5. Sau đó, thực hiện phép tính, kết quả trả về là **1**. Closure bây giờ chứa biến **counter** có giá trị mới là **1**.

![](https://images.viblo.asia/fdd3c0de-040e-40fe-b3e0-564ee451bdef.png)


6. Trả về giá trị của biến **counter** là **1**.

![](https://images.viblo.asia/f0dd075e-14b3-441f-b1b3-ba7ed1eac055.png)


7. Quay lại dòng 10, gán giá trị **1** cho biến **c1**.

![](https://images.viblo.asia/f8b56a8d-3e99-4d68-9054-2da8db881c79.png)


8. Dòng 11, lặp lại các bước 4-7. Lúc này tìm trong closure, ta thấy biến **counter** có giá trị là **1**. Ở bước 5, biến **counter** được gán giá trị là **2**. Và biến **c2** có giá trị là **2**.

![](https://images.viblo.asia/7b4a2599-0159-4b9b-92e4-a8e9e3a5023a.gif)


9. Dòng 12, tương tụ, biến **counter** có giá trị là **2**. Và biến **c3** có giá trị là **3**.

![](https://images.viblo.asia/da23c385-1071-4aae-89d8-5caf40e8c246.gif)


10. Cuối cùng, in ra màn hình lần lượt giá trị của các biến **c1 c2 c3** là **1 2 3**.

Qua ví dụ trên ta thấy đôi khi *Closure* xuất hiện nhưng chúng ta không hề nhận ra nó.

##For fun - Sử dụng Closure để implement **useState()** của React hooks
```javascript
function useState(initVal) {
    let _val = initVal;
    const state = () => _val;
    const setState = newVal => {
    _val = newVal;
    }
    return [state, setState];
}
const [count, setCount] = useState(1);
console.log(count());
setCount(2);
console.log(count());
```
Hãy thử execute đoạn code phía trên và theo dõi kết quả ^^

# Kết luận
Để đơn giản, hãy tưởng tượng *closure* tương tự như cái *ba-lô*. Nó chứa tất cả các biên trong scope từ lúc function được khai báo. Ngoài ra, closures còn giúp cho JavaScipt có thể define được *private variables*.
>[Closure] make it possible for a function to have "private" variables.
<br>-W3Schools-

# Tài liệu tham khảo
[1] [Link](https://kipalog.com/posts/I-never-understood-JavaScript-closures--vi-version)
<br>
[2] [Link](https://www.youtube.com/watch?v=KJP1E-Y-xyo)