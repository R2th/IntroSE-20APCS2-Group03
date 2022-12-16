**Chào mừng các bạn đã quay trở lại với series How to Build Command-Line Apps Part 2**


Ở phần trước mình đã hướng dẫn các bạn thực hiện 1 ví dụ đơn giản nhưng kinh điển là HelloWorld.

Hôm nay chúng ta sẽ cùng nhau tìm hiểu về cách sử dụng các Class trong Console Command


**Bước 1**  Từ folder part 1. Chúng ta tạo thêm 1 folder với tên src
![](https://images.viblo.asia/f30ea3d8-6d3b-4848-b154-f9bc10a4e7ec.png)

**Bước thứ 2**  Từ folder src tạo ra 1 class php tên là SayHelloCommand, namespace Acme
![](https://images.viblo.asia/7ff6ea90-30f0-4342-9c67-cce568c3b880.png)

**Bước thứ 3**  Trong file composer.json thêm dòng xử lý việc autoload với namespace Acme và folder src. Sau đó trên terminal chúng ta chạy dòng lệnh composer dump-autoload
![](https://images.viblo.asia/2dc02ae4-a952-4a0f-8471-94f3b5154a00.png)
![](https://images.viblo.asia/29042284-2f11-48a1-bcf0-26f81dac2a9f.png)

**Bước thứ 4**  Quay trở lại Class vừa tạo thêm vào 2 function configure() và execute()
![](https://images.viblo.asia/07bd48b0-c084-4dd0-b872-97de8c01784d.png)

**Bước thứ 5**  Tại function configure() thực hiện việc khai báo của app command chính là copy phần khai báo đầu tiên và Input của part 1
![](https://images.viblo.asia/c8406c82-1f63-46f6-bfa0-a4418d842d3d.png)

**Bước thứ 6**  Còn với function execute() thực hiện việc Output
![](https://images.viblo.asia/23b26dbf-d88e-4650-a6d2-9520573ef2c5.png)

**Bước thứ 7**  Việc tạo Class về cơ bản là đã hoàn thành. Chúng ta quay trở lại file main ban đầu, xóa các phần đã copy sang Class. Sau đó gọi Class SayHelloCommand()
![](https://images.viblo.asia/adc4e8e8-62da-41a8-89ff-0b407074d83e.png)

**Bước thứ 8** Giờ thì chúng ta lại thực hiện việc chạy ở terminal và kết quả sẽ như sau
![](https://images.viblo.asia/cdf638f5-0cf0-4973-8c61-cad29081c190.png)

**Bước thứ 9** Okie vậy là chúng ta đã xử lý công việc như part 1 nhưng sử dụng thay bằng Class. Sau đây chúng ta sẽ edit lại 1 chút 2 function như sau :
![](https://images.viblo.asia/92dd390c-64b5-4c5a-b87d-67035af6eca6.png)
![](https://images.viblo.asia/b90301c7-4cf2-4de3-94c2-0f7602be1f7b.png)

Bằng cách này chúng ta đã thêm 1 Option ghi đè lên trên câu chào Hello mặc định, để có thể thay đổi vào các câu chào khác để phục vụ cho các ngôn ngữ khác nhau.
Cuối cùng chúng ta thực hiện lệnh chạy và thêm --greeting option, nếu không thêm option --greeting thì vẫn sẽ hiển thị câu chào mặc định là "Hello"
![](https://images.viblo.asia/9fb1ac08-f515-4b25-a4c2-05ecabc7a3b3.png)

Vậy là mình đã kết thúc part 2 của series. Phần tiếp theo mình sẽ hướng dẫn chúng ta thực hiện 1 app command phức tạp hơn 2 phần basic mở đầu