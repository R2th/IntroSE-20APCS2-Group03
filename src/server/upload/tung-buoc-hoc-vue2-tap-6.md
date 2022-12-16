**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng bước học Vue2 tập 6.

Hôm nay mình sẽ giới thiệu đến các bạn cách sử dụng Component.

Đầu tiên chúng ta cùng đọc xem khái niệm Component trong Vue là gì :
> Components are reusable Vue instances with a name: in this case, <button-counter>. We can use this component as a custom element inside a root Vue instance created with new Vue.

Dịch : Component là các đối tượng Vue có thể sử dụng lại được với một cái tên: trong trường hợp này là <button-counter>. Chúng ta có thể dùng component này như là một phần tử bên trong đối tượng Vue gốc được tạo bởi new Vue.
    
Cùng bắt tay để xem component hoạt động như thế nào và lúc nào thì chúng ta nên dùng nó. Bình thường để tạo ra những list hoặc nav chúng ta thường sử dụng các thẻ <ul><li> như sau:
![](https://images.viblo.asia/c4980c78-0b4a-4867-9dde-0919ce9e858c.png)


Với Vue chúng ta có thể xử lý bằng cách sử dụng component như sau, cùng tạo ra 1 file main.js và sử dụng ở view html
![](https://images.viblo.asia/5b796320-7e3f-45bc-bb61-6b9b81a786ae.png)
    
File main.js sẽ bao gồm component:
![](https://images.viblo.asia/1905f724-c833-4075-adc5-8aa6b044d0ab.png)    

Quay trở lại index.html và thêm cặp thẻ <task> vào trong <div id="root">

   ![](https://images.viblo.asia/621b52d9-9c1a-4218-87e0-d0a81d0f651d.png)

Okie giờ mở browers xem kết quả hiển thị
    ![](https://images.viblo.asia/2a97fa95-ba87-426f-a3eb-f7feb6900f18.png)

Thực tế thì chúng ta sẽ sử dụng rất nhiều hơn 1 thẻ task như trong ví dụ để tạo thành list hoặc nav-bar. Nên hãy thử thêm các cặp thể task vào như sau
    ![](https://images.viblo.asia/5a529802-b193-4cdb-886a-363519a82134.png)

Quay lại trình duyệt để xem kết quả
    ![](https://images.viblo.asia/59c52507-b6e5-43d2-8170-f13eb07720de.png)

Tất nhiên là kết quả sẽ như trên do chúng ta đang hard-code nhưng mà dữ liệu của mỗi cặp thẻ thì phải là dynamic nên mình sẽ sửa đoạn code như sau
    ![](https://images.viblo.asia/b92ec3d3-e866-4706-b805-fa747adfd422.png)

 Và quay lại trình duyệt sẽ được kết quả như sau
    ![](https://images.viblo.asia/4dca4777-1bff-4aee-b896-d77150d57b60.png)

    
   
Vậy là đơn giản thêm 1 cặp thẻ <slot> thì text sẽ nằm gọn trong cặp thẻ này và dữ liệu sẽ được dynamic như chúng ta mong muốn

Bài học hôm nay tạm dừng ở đây, đón xem tập tiếp theo trong series để xem tiếp xử lý Component nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!