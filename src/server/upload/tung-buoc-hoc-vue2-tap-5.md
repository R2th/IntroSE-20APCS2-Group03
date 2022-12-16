**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng bước học Vue2 tập 5.

Hôm nay mình sẽ giới thiệu đến các bạn về Computed Properties những điều cần biết.

Đầu tiên chúng ta cùng đọc xem khái niệm Computed Properties là gì :
> Computed: These properties may at first look like they’d be used like a method, but are not. In Vue, we use data to track changes to a particular property that we’d like to be reactive. Computed properties allow us to define a property that is used the same way as data, but can also have some custom logic that is cached based on its dependencies. You can consider computed properties another view into your data.

Đọc qua thì chắc các bạn cũng hiểu là Computed khá giống với Method nhưng nếu như là giống nhau thì Vue cũng không định nghĩa thêm Computed làm gì cả. Computed cũng được dùng để định nghĩa các property nhưng lại có thể xử lý logic của các data được định nghĩa. Để dễ hiểu hơn thì chúng ta hãy cùng vào với ví dụ để xem Computed Properties hoạt động như thế nào
![](https://images.viblo.asia/138bec59-f5d6-4c1c-b339-25a739a9b19c.png)

Và đương nhiên trên view sẽ hiển thị text Hello World
![](https://images.viblo.asia/02c18e85-3e73-4bf9-a73d-644a3758487b.png)

Giờ chúng ta sẽ xử lý cho text hiển thị ngược lại nhé
![](https://images.viblo.asia/91b9d1cb-3a29-403c-b48b-a1f317657a47.png)

Cùng check lại ở view nào
![](https://images.viblo.asia/86b25467-363e-4a7a-8da5-08a9c7bbaf72.png)

Okie, giờ cùng xử lý việc trên bằng cách sử dụng Computed như sau:
![](https://images.viblo.asia/62fb97de-baed-4f0e-8e77-2a75efe53cd4.png)

Thay vì xử lý ở trong thẻ h1 thì chúng ta sẽ xử lý ngay trong Computed, và nhớ thay reversedMessage vào đoạn echo ở thẻ h1 nhé. Kết quả nhận được sẽ là :
![](https://images.viblo.asia/6de9703a-e7df-475f-a2a4-df1167fb1b88.png)

Và sau đây sẽ là 1 ví dụ thực tiễn hơn nhé. Chúng ta cũng sửa lại data 1 chút, mình sẽ đặt 1 array các tasks cần thực hiện của bản thân như sau :
![](https://images.viblo.asia/4b85baaf-ca6e-4329-8c5a-b2b25fa2ebf2.png)

Sau đó mình sẽ tạo thành 1 list như sau 
![](https://images.viblo.asia/71cd45d9-5fde-46cb-b08d-5a7f2f37ac6c.png)

Kết quả trả về ở view sẽ là :
![](https://images.viblo.asia/0749c391-9859-443c-bef2-e4a2dec2c5a5.png)

Giờ mình sẽ lọc ra những Task chưa được hoàn thành bằng cách xử lý ở trong computed với mảng tasks đã được định nghĩa 
![](https://images.viblo.asia/3ae7ec1e-a47e-43f1-80a0-298d0160d18d.png)
![](https://images.viblo.asia/332cc39f-38bc-4a38-9872-e900cd216dc8.png)

Và kết quả thu được sẽ là 
![](https://images.viblo.asia/d90082b1-b094-4c1f-ab1a-c660846109bd.png)

Okie vậy là 1 số ví dụ đơn giản để các bạn cũng hiểu được Computed Properties đã kết thúc. Mong rằng các bạn cũng đã hiểu phần nào và áp dụng được Computed trong những dự án của mình.

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!