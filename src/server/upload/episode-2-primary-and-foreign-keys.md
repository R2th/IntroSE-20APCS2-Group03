Ở bài trước mình đã giới thiệu qua về cách import 1 cơ sở dữ liệu. Hôm nay mình sẽ cùng nhau đi tìm hiểu kĩ hơn về các thành phần, khái niệm cơ bản của 1 cơ sở dữ liệu.

Để bắt đầu hôm nay mình sẽ giới thiệu 1 phần không thể thiếu của các bảng đó là Primary Keys và Foreign Keys
Vậy  Primary Keys và Foreign Keys là gì ? Tại sao các bảng cơ sở dữ liệu lại cần có nó

Đầu tiên chúng ta cũng xem cấu trúc của bảng actor ở ví dụ đã được import bài trước
![](https://images.viblo.asia/232b3850-6c0e-4e8c-8737-b661c07bd46c.png)

Ở đây chúng ta có thể nhận thấy trường actor_id được tick unsigned, Key là PRI viết tắt của Primary key, Extra thì là auto_increment

Trở lại với Content của bảng nếu để ý chúng ta sẽ nhận ra trường actor_id có các giá trị là được cộng dần đều từ 1 đó chính là auto_increment options tự tăng luôn được sử dụng với các Primary Keys
![](https://images.viblo.asia/acf9e196-db8f-4cc4-84c9-ccd66c2f1ff9.png)

Khi chúng ta thử đổi 1 row actor_id thành 3. Và chúng ta sẽ thấy lỗi như sau, vì Primary Keys phải là duy nhất và không lặp lại nên chúng ta không thể update actor_id = 3 được vì actor_id = 3 đã tồn tại rồi

Ví dụ mình sẽ thêm 1 trường extra_id
![](https://images.viblo.asia/c9e244e6-8bf4-4342-9dfe-f70521bbae00.png)

Và giờ mình sẽ thêm các dữ liệu trùng nhau cho trường extra_id thì bạn có thể thấy chúng ta có thể thêm vào các giá trị trùng nhau vì khi thêm trường extra_id chúng ta không xét trường đó là Primary Keys nên trường extra_id có thể nhận các giá trị trùng nhau
![](https://images.viblo.asia/98da6f50-4747-43ec-b13e-771fbfa8542d.png)

Vậy thì chúng ta sẽ rút ra được khi 1 trường là Primary Keys thì giá trị ở mỗi row phải là duy nhất và không được lặp lại.Sau đây là câu lệnh sql cho phép tạo bảng actor với actor_id là primary keys
![](https://images.viblo.asia/0a7e1d67-de62-4b81-91b4-a1cc35cb3b14.png)

Tại sao chúng ta lại cần Primary Keys ?
Chúng ta sẽ cùng xem 1 bảng dữ liệu khác. Ở bảng film chúng ta có thể thấy trường film_id ở đây sẽ là Primary Keys. Nhưng ở thực tế thì 1 bộ phim có thể hỗ trợ được 1 hoặc nhiều ngôn ngữ khác nhau. Cùng nhìn vào trường language_id một chút nhé
![](https://images.viblo.asia/6f7aa17c-7ec3-49c3-b53b-5d5db036f6b5.png)

Và sau đó chúng ta chuyển tới bảng language thì sẽ có language_id là 1 là Tiếng Anh, vậy thì các bộ phim chúng ta vừa thấy như trong tiêu đề là ACADEMY DINOSAUR được hỗ trợ ngôn ngữ là Tiếng Anh và trường language_id cũng chính là Primary Keys của bảng language nhưng đồng thời cũng là Foreign Keys ở bảng film. Chính vì lý do trên nếu Primary Keys mà bị trùng ở 1 bảng thì chúng ta sẽ không xác định được value mình cần có để hỗ trợ cho bảng đang có Foreign Keys
![](https://images.viblo.asia/5d523117-46fa-4b3f-ab94-2a7bfcf02fac.png)




**Vậy là chúng ta đã hiểu được 2 khái niệm đầu tiên là Primary Keys và Foreign Keys. Việc thiết kế 2 khái niệm này là thiết yếu cho toàn bộ cơ sở dữ liệu để chúng ta có thể connect qua lại giữa các bảng nhằm dễ dàng có thể tìm được các kết quả phù hợp và tiện cho việc lưu trữ**