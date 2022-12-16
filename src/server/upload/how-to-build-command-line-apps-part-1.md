Xin chào các bạn, hôm nay mình xin giới thiệu đến các bạn cách tạo App bằng cách sử dụng command-line và laravel.

**Bước đầu tiên** là chúng ta cần cài đặt laravel, homestead


**Bước thứ 2** : Có rất nhiều package để support cho chúng ta. Hôm nay thì mình xin giới thiệu đến các bạn package : symfony/console. Link : https://github.com/symfony/console. Đây là 1 package có khá nhiều thứ thú vị mà mình sẽ chỉ dần dần cho các bạn trong series này nhé
![](https://images.viblo.asia/1ad5db53-cfee-4165-b168-64655a023a4b.png)

**Các bước chuẩn bị đã xong. Giờ chúng ta bắt tay vào bài 1 nhé. Ví dụ kinh điển : Hello World**

- Đầu tiên chúng ta cần tạo ra 1 folder với tên gì tùy ý
![](https://images.viblo.asia/aca31433-0075-4487-ae4e-5b7ce17a5d93.png)
- Tiếp theo chúng ta sẽ cd đến thư mục vừa được tạo
![](https://images.viblo.asia/f786259f-2830-4fda-95b6-01f0481aadfb.png)

- Tiếp đến là tạo file composer.json và thêm package symfony/console. Và thực hiện composer install trên terminal

![](https://images.viblo.asia/cfdc8738-3ccf-42b7-8ae3-85d63eaa830b.png)
![](https://images.viblo.asia/c2f81e21-052c-4aad-a1a0-82a4a6286d3f.png)

- Sau khi chờ composer hoàn thành chúng ta sẽ tạo tiếp 1 file main với nội dung như sau. Chú ý: phần #! /usr/bin/env php vì chúng ta sẽ execute command-line để chạy. Sau đó là việc require autoload trong vendor để load package.

![](https://images.viblo.asia/ab81026d-6a34-428d-8d3b-c118d96bd243.png)

- Chúng ta tiếp tục thực hiện việc code như sau 

![](https://images.viblo.asia/abf95a07-698a-49e7-b851-d4ccdea62f57.png)

Đầu tiên chúng ta cần khởi tạo Application(). Sau đó chúng ta sẽ đi từ đơn giản, mình sẽ giải thích rõ hơn về ý nghĩa của các hàm mình đã sử dụng.

+ register() : chính là tên của app.
+ addArgument() : thêm vào 1 đối số để app của chúng ta có thể tùy biến
+ setCode() gồm InputInterface & OutputInterface là các dữ liệu đầu vào và đầu ra
+ run(): thực hiện việc app chạy 

- Nào giờ thì chạy thử xem sao nhé

![](https://images.viblo.asia/f4869209-2208-44bd-be7b-7d53249602ba.png)

- Đã có lỗi về phân quyền, chúng ta cần chắc chắn là file main của chúng ta đã được execute command-line trước khi chạy. Đơn giản là gõ thêm lệnh chmod +x

![](https://images.viblo.asia/1b3d4b0d-fefc-4ea9-bdaf-5d740697e2e8.png)

- Ok, vậy là đã xog. Giờ chúng ta cũng thử lại nhé.

![](https://images.viblo.asia/d2b74759-b832-4e05-9f81-13d8441e546e.png)

Vậy là đã có kết quả. Các bạn có thể thấy cái option được lựa chọn và tên của app của chúng ta đã xuất hiện ở cuối của gợi ý.
- Giờ thì chạy phần app mà chúng ta vừa code nào

![](https://images.viblo.asia/60bf23f1-2f25-462f-9afa-52e68b118a92.png)

- Vậy là đã có output Hello World rồi. Giờ thì chúng ta sẽ thử dùng thêm options nhé.Bằng việc thêm help ở trước tên app. Chúng ta sẽ có kết quả như sau:

![](https://images.viblo.asia/61527c4c-1df6-4695-9362-dee7404ec222.png)

Hãy chú ý phần Arguments sẽ có arguments: name mà chúng ta truyền vào ở hàm addArguments(). Và ở hàm addArguments() chúng ta có thể truyền thêm điều kiện bắt buộc hoặc không bắt buộc như sau:

![](https://images.viblo.asia/98f1ad10-f355-462d-948e-c3438cb53b64.png)

Class InputArgument có các const :
+ REQUIRED : bắt buộc nhập
+ OPTIONAL : không bắt buộc

Cùng thử chạy lại với việc thêm REQUIRED. Kết quả sẽ ra sao

![](https://images.viblo.asia/eac86d9c-e156-4bca-995f-d2a70ace8efe.png)

Giờ yêu cầu argument name sẽ là bắt buộc.

Okie, giờ chúng ta cũng đổi về OPTIONAL, và trong hàm addArgument sẽ thêm 1 option nữa là description của argument.

![](https://images.viblo.asia/18482744-d905-4fde-8675-22e4f927c055.png)

Phần description này sẽ được hiển thị thêm ở bên cạnh của của argument trong phần help.
- Tiếp theo chúng ta sẽ thực hiện việc get argument ở input và cho nó hiển thị ra ở output của app. Sửa đoạn code lại 1 chút như sau. Và sau đó chạy lại app chúng ta sẽ có kết quả

![](https://images.viblo.asia/716917d9-7f84-43bf-8c7f-d799ef5b5c26.png)
![](https://images.viblo.asia/c875e52f-ca74-4902-97ad-0ba8b896de63.png)

- Kết quả hiển thị ra có vẻ hơi đơn điệu và không có thú vị cho lắm. Giờ chúng ta sẽ thêm cho nó 1 chút màu sắc nhé. Chúng ta sẽ thêm 1 cặp thẻ đóng mở như html ở đoạn output

![](https://images.viblo.asia/b208d535-ef87-431a-90fe-14549916d246.png)

![](https://images.viblo.asia/b1a32219-6ed6-4ef6-89c5-4130c4888bd9.png)

Đã có thêm chút màu sắc rồi đúng không, các bạn có thể thử thêm các cặp thẻ khác như <info> .... Sau cùng chúng ta thử thay đổi đoạn code output 1 chút để nhìn dễ quen thuộc hơn nhé.

![](https://images.viblo.asia/b46a536d-1fe4-41e5-8d1d-000f6751dd29.png)
![](https://images.viblo.asia/81247e24-e76d-402c-b275-61f0fd31cd5b.png)

Kết quả vẫn như cũ và màu sắc thì đã sang màu xanh.


**Đây cũng là kết thúc Part 1 của series. Hẹn gặp lại các bạn vào những phần tiếp theo :kissing_heart:**