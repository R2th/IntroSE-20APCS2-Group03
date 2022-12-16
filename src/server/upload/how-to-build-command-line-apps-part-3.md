**Sau một thời gian thì chúng ta lại gặp nhau trong series How to Build Command-Line Apps Part 3**

Ở 2 phần trước thì mình đã giới thiệu đến các bạn về cách sử dụng cơ bản của package : symfony/console

Hôm nay mình sẽ mang đến những ứng dụng mà package : symfony/console có thể làm tạo ra được.

Chắc hẳn nếu làm việc với laravel các bạn cũng đã rất quen thuộc với command-line : `laravel new blog` dùng để create 1 project mới. Nhưng đã bao giờ các bạn tự hỏi cơ chế hoạt động của command-line này là như thế nào chưa ??? 

Hôm nay chúng ta sẽ cùng thử tạo ra command-line này nhé. 

Đầu tiên chúng ta sẽ edit lại 1 số phần đoạn code ở Part 2 để viết thay đổi 1 chút về tên gọi cũng như việc xử lý của các function nhé 

Tại file main để chạy chúng ta sẽ edit lại 1 chút như sau : 

![](https://images.viblo.asia/42b14b66-2438-4938-b48f-73eb522c5d49.png)

Chúng ta sẽ gọi `new NewCommand()` . Đồng thời edit name class cũ thành NewCommand.php

![](https://images.viblo.asia/18347e19-b7d8-4c44-b548-248e7b12ee17.png)

Tiếp đó là sửa function trong file NewCommand.php. Đầu tiên trong function configure() chúng ta sửa name, description và hiện giờ chúng ta chỉ cần required tên của project truyền vào

![](https://images.viblo.asia/84e97e87-894b-4354-b228-17803949aa59.png)

Việc tiếp theo chúng ta phải xác định được các việc sẽ làm trong function execute() như sau :

![](https://images.viblo.asia/68dba467-e723-483e-83cd-43b600a0bea8.png)

Sau đó chúng ta sẽ bắt tay vào xử lý từng việc một. Đầu tiên là check xem folder chứa project mới đã tồn tại chưa

![](https://images.viblo.asia/708dcb15-2fbd-4df2-8def-7a68051fc8dd.png)

Lưu ý tại function assertApplicationDoesNotExist() chúng ta cần truyền đường dẫn folder để check và output để in ra message cho người dùng.Okie giờ thì chúng ta sẽ thực hiện unitest.
Để thực hiện test thì đơn giản là chúng ta tạo ra 1 folder bằng lệnh mkdir. Sau đó tạo thêm new 1 project trùng tên

![](https://images.viblo.asia/6dc2f07f-61ee-4832-918e-0c377f54dc59.png)

Okie vậy là function của chúng ta đã hoạt động. Thêm 1 chút style cho message trả về nhé 

![](https://images.viblo.asia/869148a3-ebce-41dc-9c38-56f89195310d.png)

![](https://images.viblo.asia/b1dcc12e-3686-4bbc-abe1-dbd0f4e007e6.png)

Vậy là trông đã khá chuyên nghiệp hơn khá nhiều rồi. Việc xử lý tiếp theo là download phiên bản mới nhất của laravel và giải nén file zip đó ra.
Để luôn download phiên bản mới nhất của Laravel chúng ta sẽ thực hiện cron job mỗi khi chạy đến function download này để thực hiện việc này chúng ta sẽ cần thêm package guzzlehttp/guzzle. Chúng ta chỉ cần chạy trên terminal `composer require guzzlehttp/guzzle` sau đó chờ trong ít phút

![](https://images.viblo.asia/d678c6c7-9d00-44d7-b497-c8058a66098a.png)

Tiếp theo là tạo 1 function khởi tạo như sau

![](https://images.viblo.asia/20be1b72-d472-44f3-8605-85cfdd4b1418.png)

Sau đó chúng ta sẽ thực hiện việc download tại function download()

Trong function này chúng ta sẽ tiến hành việc download file zip và save nó bằng tên mà chúng ta truyền vào trong function download()

![](https://images.viblo.asia/f6c0f543-a019-49ee-b033-9c7c24278c60.png)

Để đảm bảo rằng tên file không bị trùng chúng ta sẽ viết thêm 1 function makeFileName()

![](https://images.viblo.asia/52f7660a-d8cd-4ab4-b04b-afed9be876ed.png)

Sau đó để thực hiện việc giải nén chúng ta sẽ sử dụng ZipArchive 

![](https://images.viblo.asia/7c6906f7-ab43-49b7-8fdd-2c8cb5723854.png)

Cuối cùng chúng ta sẽ thêm function đã viết vào function execute() và thêm message thông báo thành công cho người dùng

![](https://images.viblo.asia/1e1096ac-0e46-4279-a840-4513354d7603.png)

Giờ hãy cùng run thử lại App mà chúng ta vừa viết 

![](https://images.viblo.asia/8d2a07f4-12e3-41d0-b568-c5775f764837.png)

Đã có lỗi xảy ra vì chúng ta chưa truyền GuzzleHttp\Client() vào hàm khởi tạo, edit lại 1 chút file main

![](https://images.viblo.asia/14552168-1789-471a-9b21-1da516aa399b.png)

Vậy là chúng ta đã có được kết quả 1 project laravel mới được tạo theo như ý muốn.

Hẹn gặp lại các bạn trong những phần tiếp theo của series