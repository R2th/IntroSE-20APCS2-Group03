Hôm nay mình sẽ giới thiệu cho mọi người về một tính năng khá hay của Laravel trên windown. Đó là Đó là Sử dụng `task scheduler` trên windown để  thực hiện lập lịch gửi mail trong laravel.
   
>    Ở đây mình sẽ không giới thiệu về việc tạo Task Scheduling trong laravel vì đã có rất nhiều bài hướng dẫn rồi.
>    Ở đây mình sẽ sử dụng Xampp để làm nhé.

## Bắt đầu nào.
*  **Bước 1:** Đầu tiên chúng ta mở cửa sổ windown lên và tìm kiếm **task scheduler** sau đó mở nó lên.
*  **Bước 2:**  Chúng ta sẽ tạo một **task scheduler** mới như hình dưới đây.

![image.png](https://images.viblo.asia/5e5b3f87-ee71-4ae8-8e54-ea0709bdd999.png)

* **Bước 3:** Đặt tên cho task mà ban muốn.
    * Chúng ta sẽ chọn **Run whether user is logged on or not**
    * **Configure for là windown 10** nhé.

![image.png](https://images.viblo.asia/d796551d-562b-4e2c-8027-6134395a04b3.png)

* **Bước 4:** Sang phần **Triggers** để setup thôi.
* **Bước 5:** Ở đây bạn tạo một trigger mới bằng cách ấn vào **New** và nó sẽ hiện ra như dưới đây.

![image.png](https://images.viblo.asia/ed15af71-a81e-4737-8c72-16f5a1e4a5c9.png)

* **Bước 6:** Tùy theo mục đích của công viêc mà bạn chọn những setting khác nhau.

    * Nếu bạn muốn lập lịch chạy hàng gày thì chọn `Daily` theo tuần thì chọn `Weekly` và theo tháng thì chọn cái cuối (tất nhiên thì chả ai làm lập lịch mà lại chỉ chạy 1 lần 🤣🤣).
    * **Start:** là thời điểm bắt đầu chạy.
    * Tiếp theo bạn chọn **Delay for up to và Repeat task every:** sau đó để `delay` là `1 day` còn `Repeat` thì chọn hoặc ghi thời gian bạn muốn nó lặp lại.
    * Cuối cùng tất nhiên là chọn **ok** thôi.
 * **Bước 7:** Chọn **Actions** để setup cho dự án bạn muốn dùng thôi nào.
     * Tất nhiên là cũng phải **New** một action mới thôi.
 ![image.png](https://images.viblo.asia/ce103ddb-23b7-4503-b46f-81fe1e0e5f5e.png)
 
     * Ở phần **Program/script** thì các bạn chọn đường dẫn đến file **php.exe** của xampp.
     * Tiếp đến là **Add arguments** thì bạn để đường dẫn đến dự án của bạn sau đó thêm đọan `artisan schedule:run`.
     * VD: C:\xampp\htdocs\du-an artisan schedule:run.
     * Cuối cùng thì chọn `OK` thôi.
    
 * **Bước 8:** Cuối cùng để chạy thì bạn chỉ cần chạy `queue` trong command của laravel là được rồi.
    
## Vậy là chúng ta đã tạo ra được task scheduler.

Trên đây là những chia sẻ của mình khi tìm hiểu về Task scheduler của laravel để làm lập lịch gửi mail. Mong rằng bài viết này sẽ giúp ích được cho mọi người 😅😅.