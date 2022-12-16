**Giới thiệu cơ bản về Vue 2**

Đầu tiên chúng ta cũng tìm hiểu về cơ bản thì VueJs là gì ? Nó có gì thú vị hay không ? 
Nếu các bạn đã có cơ hội làm việc với AngularJs hay ReactJs thì VueJs cũng là 1 framework về cơ bản thì đều sử dụng javascript để làm việc, nhưng các framework này cũng đã cung cấp và hỗ trợ rất nhiều thứ để giúp các lập trình viên làm việc dễ dàng và nhanh chóng hơn.
Thôi vào thực hành thực tế cho đỡ dông dài nào. Đầu tiên chúng ta cùng thử thực hiện 1 ví dụ cơ bản như trong docs của Vue nhé, theo mình đánh giá thì docs của Vue cũng khá là dễ hiểu và dễ đọc.

Bắt tay vào ví dụ kinh điển Hello world để hiểu thêm vuejs có thể giúp ta làm gì nhé. Đầu tiên chúng ta hãy tạo 1 file html như sau 
![](https://images.viblo.asia/2372b489-d1bd-49c6-9716-4173f684e8fd.png)

Tiếp đó chúng ta hãy nhúng link vuejs đã được mô tả ở trong docs vào và thêm 1 input.
![](https://images.viblo.asia/2c752491-b44d-4106-8a4e-b7d0f34c89a5.png)

Giả sử chúng ta vẫn sử dụng DOM của JS như bình thường thì chúng ta sẽ thực hiện việc thêm value cho input như thế nào ?
![](https://images.viblo.asia/f8cb0189-300a-4979-9a1d-09bdc6cac8cf.png)

![](https://images.viblo.asia/7dbfc514-a10d-4a87-875b-664deb885d72.png)

Đơn giản thì chúng ta có thể xử lý như sau ở trong thẻ script và output sẽ hiển thị như sau 
![](https://images.viblo.asia/639164d8-d0ed-4001-adf5-fcf173705aaa.png)

Okie, tiếp theo mình sẽ thực hiện yêu cầu như trên đối với vuejs 
![](https://images.viblo.asia/b339dac1-5bd7-483b-bede-ce49bc59e2ae.png)

Như các bạn đã nhìn thấy mình đã thêm vào class new Vue({}) bao gồm el và data. Thêm el để có thể tự do sử dụng các element ở trong div có chứa id="root" và phần data chính là thêm biến data đã được khai báo ở phía trên. Sau đó đơn giản là mình thêm v-model vào trong input với message là phần mà mình muốn set value trong input. Và kết quả sẽ như thế nào ?
![](https://images.viblo.asia/8999c256-0675-4155-9017-650d8ccfaf53.png)

Như các bạn đã thấy kết quả vẫn đúng như việc chúng ta sử dụng DOM của JS mà thôi. Nhưng điều đặc biệt của VueJS không chỉ có thế. Chúng ta cùng tiếp tục thêm 1 thẻ p như sau.
![](https://images.viblo.asia/5002baf1-c8e0-4f1e-a77f-bf15b992753d.png)

![](https://images.viblo.asia/09316ebc-e08c-4dda-9bc5-52000991d757.png)

Với {{message}} thì phần message: Hello World cũng được hiển thị ở trong thẻ p. Và khi chúng ta thay đổi value trong input thì phần thẻ p cũng được update theo
![](https://images.viblo.asia/810959e5-ccc6-41d4-9a52-adb8913674a4.png)

Khá là ổn phải không giá trị sẽ luôn được update tương tự như việc chúng ta bắt onchange() nhưng lại không phải code thêm nhiều. Sau cùng chúng ta sẽ xóa luôn biến data và nhét thẳng message vào trong data của hàm new Vue như sau :
![](https://images.viblo.asia/dfc793e2-6279-41b2-ac6d-012737350ae0.png)

Trên đây là ví dụ đơn giản nhất về VueJS. Cùng đến với những bài tập nâng cấp hơn ở những phần sau nhé !!!