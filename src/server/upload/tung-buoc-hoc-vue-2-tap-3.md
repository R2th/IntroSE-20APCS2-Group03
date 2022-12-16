**Giới thiệu cơ bản về Vue 2**

Hôm nay tôi sẽ giới thiệu đến các bạn việc thực hiện List trên Vue 2. Việc này cũng được chúng ta sử dụng rất nhiều trong quá trình làm việc với website. Không dài dòng thêm nữa chúng ta sẽ cùng thực hiện việc đó luôn và ngay nào
![](https://images.viblo.asia/19cd7e48-3aaf-450b-8259-b282a661d264.png)


Đầu tiên chúng ta sẽ thực hiện 1 đoạn code như trên, trong đó names chính là mảng các tên mà chúng ta mong muốn hiển thị ở trong list.
![](https://images.viblo.asia/843cf2b5-5229-442b-81cb-eae6a3988461.png)

Tiếp theo chúng ta sẽ tạo 1 cặp thẻ ul và li để hiển thị các tên theo dạng List bằng cách sử dụng v-for tương đương với vòng lặp. Ở đây thì mảng names được đặt phía sau in như hình trên. Và đây là kết qua mà chúng ta được trả ở view
![](https://images.viblo.asia/cec9caf4-acbc-4a44-998b-7b78c39510cd.png)

Nếu bạn không muốn sử dụng {{name}} cho việc echo tên thì chúng ta có 1 phương pháp nữa là sử dụng v-text như phía dưới
![](https://images.viblo.asia/7a917f16-193e-490f-b2aa-c04be28e6ee9.png)
Và kết quả của cả 2 cách cùng đều cho về chung 1 kết quả. Và sử dụng cách nào cũng được tùy thuộc vào bạn quen sử dụng cách nào đó.
![](https://images.viblo.asia/c8fa4f2c-f5ce-4284-8d0d-2734c3d6ea87.png)
Giờ chúng ta sẽ cùng nâng cấp 1 chút nhé, cùng tạo ra 1 input và 1 button để thực hiện việc add name vào mảng names nhé. Đầu tiên tôi sẽ đặt biến var app cho phần new Vue chứ không để tên biến mặc định nữa.
![](https://images.viblo.asia/dfebc862-64bf-4c95-8928-5cd97587acc6.png)
Và ở ngoài Inspect lúc này chúng ta có thể gọi được app ở tab Console rồi
![](https://images.viblo.asia/81101eca-fdfb-4e02-8c06-bf9b3c3411fb.png)
Okie vậy thử push thêm 1 phần tử Susan vào mảng names nhé. Câu lệnh rất đơn giản là app.names.push('Susan'). Và kết quả cũng được echo lên ngay trên view như hình dưới
![](https://images.viblo.asia/5d3c3fca-ff3e-46f0-9488-65c9b8f40321.png)
Cùng thực hiện việc thêm input và button cũng như việc bắt sự kiện như cách bt chúng ta làm việc nhé. Thêm vào input vs id="text", và 1 button với id="button" như dưới
![](https://images.viblo.asia/4919300d-d6a7-40c0-880b-ea6e3110f2b8.png)
Để thực hiện được mong muốn của chúng ta trên DOM có thể đơn giản code như sau
![](https://images.viblo.asia/ef8eec14-3163-45b7-a563-52366c4ac7f5.png)
Quay trở lại view chúng ta sẽ thêm tên Susan vào textbox sau đó click vào button Add Name sẽ thấy Susan được thêm ngay cuối cùng của view đã được hiện lên
![](https://images.viblo.asia/2be79563-e399-462c-b0f3-7ba2af7e1da9.png)
Okie thêm vào dòng code name.value = ''; để xóa trắng textbox sau khi click button. Sau đó chúng ta sẽ cùng chuyển tất cả đoạn code trên vào trong mounted  của Vue, sự kiện này cho phép việc code ở trong sẽ được thực hiện sau khi website được load hết lên, ngoài ra còn thêm những sự kiện như updated, destroyed cho phù hợp để chúng ta có thể sử dụng
![](https://images.viblo.asia/bbd7ff78-a4c9-4005-a34d-9865026c67c9.png)
Sau đó cùng thử lại trên view vs name là Susan nhé. Vậy là tên Susan cũng được thêm vào ở cuối danh sách vào textbox cũng đc thay thế bằng rỗng.
![](https://images.viblo.asia/89d714ee-dd07-40e3-9893-7e420ac51a3b.png)


Bài thứ 3 đến đây là kết thúc, hẹn gặp lại các bạn vào bài 4 của series nhé !!!!