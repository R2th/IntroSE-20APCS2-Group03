![](https://images.viblo.asia/d297c0aa-e6d0-4224-9934-bf34fd2027db.jpg)

Chào các bạn, hôm nay mình vừa nghịch được ra 1 thứ rất thú vị, muốn chia sẻ với các bạn!

Chuyện là thế này, trước giờ mình cũng muốn up cái game làm bằng Unity lên FB lắm, nhưng ngặt 1 cái là dung lượng nó quá lớn, mỗi lần user chơi được cũng vô cùng cực khổ load nó. Chính vì vậy mình đã không mặn mà gì với mảnh đất FB nữa.

Nhưng hôm nay thì khác, sau khi biết được tin Unity ra mắt tính năng Project Tiny, giúp game của Unity có thể chỉ có dung lượng vài MB, bạn ko nghe nhầm đâu, thật sự là vài MB đó, dù có thể trước giờ bạn đã thử các kiểu project empty của Unity vẫn nặng tới 10MB, thì ngay bây giờ, với Unity 2018.3.0 bạn đã có thể làm cho nó chỉ vài MB. (yeah)

![](https://images.viblo.asia/aa957078-4ae7-4917-ba4d-0ce2799ab485.jpg)

Ngay từ khi có bản beta 2018.3.0 mình đã thử nghiệm nó, tuy nhiên việc đẩy nó lên FB lại ko đơn giản như mình nghĩ, và đến hôm nay thì mình đã làm được điều đó, vì vậy mình muốn chia sẻ với các bạn cách làm sao đưa 1 game Unity build ra từ Project tiny lên FB thật đơn giản ;)

Vào việc thôi nào, nói nhiều mất hứng :v: 

Bước 1: Build project tiny:

p/s: ở bài này mình sẽ sử dụng luôn 1 project sample của Unity cho nó nhanh nhé ;)

![](https://images.viblo.asia/73cff88a-9794-4f16-9334-4a046ee07051.JPG)

Bước 2: Config:

- Các bạn tạo 1 file với tên gọi fbapp-config.json có nội dung như sau:

    ```
    {
        "instant_games": {
            "navigation_menu_version": "NAV_FLOATING",
        }
    }
    ```

- Các bạn tạo file thứ 2 với tên gọi fbLoader.js có nội dung như sau:

    ```
    FBInstant.initializeAsync()
        .then(function() {
            FBInstant.setLoadingProgress(100);
        });
        FBInstant.startGameAsync()
        .then(function() {
            game.start();
        })
    ```
    
- Các bạn sửa lại file index.html với phần body có nội dung như sau:

    ```
    <script src="https://connect.facebook.net/en_US/fbinstant.6.2.js"></script>
        <script src="./fbLoader.js"></script>
    ```
    
- Giờ thì các bạn nén toàn bộ file trong thư mục đó lại đặt tên là 1 (đặt thế cho dễ quản lý phiên bản sau này):

![](https://images.viblo.asia/2a9dea17-d839-4301-8952-68bdcbae8369.JPG)

Bước 3: Thêm ứng dụng mới trên Facebook developer:

![](https://images.viblo.asia/a0645c4b-ef45-462f-baf4-0f21846bec2d.JPG)

![](https://images.viblo.asia/0ea8bf20-834c-48a7-a0dd-19f2723e9c17.JPG)

Bước 4: Thiết lập trò chơi:

![](https://images.viblo.asia/28673b29-3534-4b4b-9a9f-9224394fae2e.JPG)

![](https://images.viblo.asia/1a5b7c89-18e9-4a51-8913-dcee7ef6cd0d.JPG)

Bước 5: Tải trò chơi lên:

![](https://images.viblo.asia/3b952716-05a6-45f9-9223-cf39f9df7c7c.JPG)

![](https://images.viblo.asia/f846ebcc-ee27-403d-a339-e461bd61213b.JPG)

![](https://images.viblo.asia/cc54b881-44cf-4924-8e32-27a4e76a28c2.JPG)

![](https://images.viblo.asia/e204f2aa-4ecb-4789-afdd-cc2befee0fe9.JPG)

Bước 6: Chuyển sang chế độ Production:

![](https://images.viblo.asia/98957ee7-332d-4bc4-925a-c6ed6d2b7a06.JPG)

![](https://images.viblo.asia/29c6dafd-5bfb-44d8-922d-a07bf90d5c09.JPG)

![](https://images.viblo.asia/679ce93d-8a0b-4492-a5d0-422ee8370586.JPG)

Bước 7: Kiểm tra xem trò chơi đã có thể chơi được chưa:

![](https://images.viblo.asia/c935704a-67f0-490a-82ba-b985e8921c8d.JPG)

![](https://images.viblo.asia/62bc0a3a-5335-46bc-8268-a5730b232e59.JPG)

=> Sau khi copy link và truy cập vào mà trò chơi đã hoạt động bình thường thì có nghĩa là bạn đã upload thành công, việc còn lại của bạn chỉ là hoàn thành những config còn lại để có thể publish ra cho user chơi mà thôi!

Thật sự mình rất bất ngờ khi game làm ra từ Unity lại có thể chạy trên nền fb mượt mà và nhẹ nhàng tới vậy, load game chỉ mất vài giây, quá đã đúng ko nào! Chúc các bạn thành công nhé ^_^

Lưu ý: phần này cho những bạn nào trong quá trình làm mà gặp 1 trong 2 lỗi như sau:

1. Nếu game của bạn upload lên là bị cảnh báo:

![](https://images.viblo.asia/dca24bba-0813-4d87-bdbe-5e2327a5ae6c.JPG)

Thì có nghĩa là bạn chưa có phần body trong file index.html mà mình viết ở trên.

2. Nếu game của bạn nó cứ hiện màn hình Loading mãi mãi thì có nghĩa là bạn đã thiếu file fbLoader.js mà mình đã yêu cầu tạo bên trên.

Khi bạn mới build project ra thì ko có file này, vì vậy các bạn hết sức lưu ý tạo nó đúng theo các bước mình hướng dẫn nhé!