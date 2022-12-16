Phương thức equals và toán tử == thường được sử dụng để so sánh trong lập trình. Nhưng mấy ai thực sự hiểu rõ khi nào nên dùng phương thức equals, khi nào nên dùng toán tử ==.


### 1. Biến tham trị và tham chiếu.
Biến tham trị bao gồm các kiểu nguyên thủy của JAVA như: int, long, double…

Biến kiểu tham chiếu bao gồm: String, array, kiểu đối tượng…

Khi sử dụng biến kiểu tham trị, JAVA chỉ cho phép bạn sử dụng toán tử so sánh “==”.

Khi sử dụng biến kiểu tham chiếu, JAVA cho phép sử dụng cả toán tử “==” và equals().

Tuy nhiên, khi sử dụng toán tử “==”, bộ xử lý của JAVA sẽ so sánh xem 2 biến tham chiếu này có trỏ đến cùng một đối tượng hay không, còn nếu bạn sử dụng phương thức equals(), bộ xử lý JAVA sẽ so sánh giá trị của 2 biến tham chiếu đó.

### 2. Đối với biến tham trị
Để hiểu ro hơn vấn đề, dưới đây tôi có 2 ví dụ cụ thể:

Ví dụ 1: theo như thông thường sử dụng khai báo biến Integer.

![](https://images.viblo.asia/96d74b53-eb1c-4913-a523-0c774ca3e39b.png)

Thì chương trình sẽ trả về kết quả.

![](https://images.viblo.asia/fac22420-cbbf-492a-80ae-562619277721.png)


Ví dụ 2: tôi có đoạn code, bạn hãy tạm không nhìn đáp án mà trước đó hãy nghĩ xem kết quả là true hay false ?

![](https://images.viblo.asia/f6b9143c-1f26-49d9-b4a3-c0ffcdcd3660.png)

Kết quả là:

![](https://images.viblo.asia/71270dfc-0495-4eeb-b024-96e1da70406a.png)

Bất ngờ chưa, bạn có biết tại sao lại là false không ?

- Khi bạn thực hiện **Integer a = 3** thì lúc này bộ nhớ sẽ kiểm tra xem có địa chỉ nào đã có giá trị là **3** chưa, nếu chưa thì bộ nhớ sẽ lưu giá trị **3** vào một địa chỉ mới của bộ nhớ và trỏ **Integer a** đến địa chỉ chứa giá trị **3**, khi bạn tiếp tục thực hiện **Integer b = 3** thì lúc này bộ nhớ lại tiếp tục trỏ **Integer b** đến địa chỉ chứa giá trị **3** lúc nãy nên khi sử dụng toán tử "==" thì nhận được giá trị **true**.
- Khi bạn thực hiện **Integer a = new Integer(3)** và **Integer b = new Integer(3)** thì bộ nhớ sẽ lưu 2 giá trị **3** vào 2 địa chỉ khác nhau trên bộ nhớ và trỏ **Integer a** vào địa chỉ chứa giá trị **3** thứ nhất và **Integer b** đến địa chỉ chứa giá trị **3** thứ hai, nên khi sử dụng toán tử "==" sẽ nhận được kết quả false vì a và b được trỏ đến 2 địa chỉ khác nhau hoặc có thể hiểu là 2 đối tượng khác nhau.

### 3. Đối với biến tham chiếu
Đối với toán tử == tương tự như biến tham trị.

Ví dụ 1:

![](https://images.viblo.asia/62927349-d0bb-418b-8ad1-69fc517a01e1.png)

Kết quả:

![](https://images.viblo.asia/fac22420-cbbf-492a-80ae-562619277721.png)

Ví dụ 2:

![](https://images.viblo.asia/874ada83-9c47-4430-bfab-049558b84d1a.png)

Kết quả:

![](https://images.viblo.asia/71270dfc-0495-4eeb-b024-96e1da70406a.png)

Ngoài ra biến tham chiếu còn có phương thức equals.

Phương thức equals chỉ so sánh giá trị của 2 biến.

Ví dụ 3:

![](https://images.viblo.asia/d4fcd6e3-9db4-4f2f-a42e-1e7924e136c5.png)

Kết quả:

![](https://images.viblo.asia/fac22420-cbbf-492a-80ae-562619277721.png)

Ví dụ 4:

![](https://images.viblo.asia/0e1e9745-ba02-493f-82cc-58c602c3ffd3.png)


Kết quả:

![](https://images.viblo.asia/fac22420-cbbf-492a-80ae-562619277721.png)