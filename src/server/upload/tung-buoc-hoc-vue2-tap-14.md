**Giới thiệu cơ bản về Vue 2**

Xin chào lại là mình quay trở lại với series về Vue2

Như các bạn đã biết thì Vue không cung cấp bất kì chức năng về ajax cụ thể nào. Nhưng trong các dự án thực tế thì việc sử dụng ajax luôn là cần thiết. Hôm nay mình sẽ giới thiệu các bạn 1 library giúp các bạn có thể fetch API khá là tiện dụng mà mình cũng đang sử dụng.

Okie, cùng bắt đầu tạo 1 project laravel kết hợp cùng vue2 nhé

![](https://images.viblo.asia/b2eb00eb-de00-4680-88d2-0e7ac15159aa.jpg)

Đầu tiên mình chạy command line để tạo project tên là vue-app

![](https://images.viblo.asia/e83d28c1-70cb-4cff-8538-c5fd0a66e8cb.jpg)

Sau khi hệ thống chạy xog chúng ta sẽ bật project lên, với mình ở đây là dùng subl. Vì mình sẽ sử dụng Vue nên mình sẽ xóa hết hết code trong file app.js đi thay vào đó là vue

![](https://images.viblo.asia/f84b1f20-b021-4e75-8dac-fb1ee2ad5142.jpg)

Ở welcome.blade.php mặc định mình cũng sẽ xóa hết các script đi thay vào đó là sử dụng vue.js và include app.js vừa đc thay đổi ở trên vào để sử dụng
![](https://images.viblo.asia/bfeec4ad-deff-4816-b40f-d1b8d929fd63.jpg)

Tiếp đến ở web.php mình define routes vs method GET và return 1 mảng các skills như sau
![](https://images.viblo.asia/ccf19b99-7d2c-462d-a83e-5707b612cc6c.jpg)

Thư viện được mình giới thiệu hôm nay được gọi là chung là axios.Các bạn có thể vào github và xem thêm docs cũng như những chức năng được support
![](https://images.viblo.asia/8a6707cc-8b49-476a-8b4c-d8b771995c24.jpg)

Sau đó mình sẽ include file js của axios vào welcome.blade.php.
![](https://images.viblo.asia/b95d0801-a465-4406-a675-aa17cf1a817a.jpg)

Chuyển qua file app.js. Đơn giản mình sẽ gọi axios.get để gọi đến API skills
![](https://images.viblo.asia/15938b04-accf-473c-9ae4-2fb6d5a3261c.jpg)

Giờ cùng bật chorme và Inspect lên. Okie ở bước này có lẽ mình đã đặt sai tên element nhưng không sao các bạn có thể check được dữ liệu ở API cũng đã trả về đúng như khai báo
![](https://images.viblo.asia/c555b4b3-2649-42f4-b9af-a48da2cf00a7.jpg)

Giờ mình sẽ đổi tên #app và console.log thêm data 
![](https://images.viblo.asia/c2c22ab8-4960-4bc0-9e2a-6811fdca2817.jpg)

Quay trở lại trình duyệt chúng ta sẽ có kết quả được ở Console như hình dưới
![](https://images.viblo.asia/094d57f2-aa00-4ae9-aee5-7877834cb35c.jpg)

Giờ mình sẽ hiển thị kết quả API trả về trên view, đầu tiên mình đặt thêm data là skills ở app.js. Sau đó gán nó bằng dữ liệu API trả về
![](https://images.viblo.asia/e6507569-1597-4dfd-ba5d-635046def331.jpg)

Chuyển qua blade mình sẽ gọi v-for để hiển thị các dữ liệu bên API trả về
![](https://images.viblo.asia/2366a78f-748c-4d94-8a26-64dfd70b9064.jpg)

Giờ chuyển qua trình duyệt chúng ta đã có được các dữ liệu hiển thị như sau
![](https://images.viblo.asia/6c0d3e98-1ef9-4509-ad47-55fcbd5f4de8.jpg)

Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!