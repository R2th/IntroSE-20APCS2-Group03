![](https://images.viblo.asia/26884b13-38c3-4a72-bd14-3a31c67e3777.jpg)

Chào các bạn, hôm rồi mình có cơ hội được làm việc với thiết bị Mixed Reality(MR) và thấy có đôi chút bỡ ngỡ, khác biệt và phức tạp so với hồi dùng oculus.

Vì vậy bài hôm nay mình xin chia sẻ kinh nghiệm để kết nối MR với Unity, giúp anh em mới tiếp cận có thể setup nhanh gọn không mất thời gian tìm hiểu thử nghiệm nhiều ;)

Ok, vào bài thôi! 

Một số lưu ý:
1. Các bạn cần chuẩn bị ổ cứng còn khoảng trên 30GB để việc cài đặt không bị gián đoạn.
2. MR là công nghệ rất mới vì vậy hãy cứ update win 10 mới nhất, unity mới nhất, và Visual Studio mới nhất để giảm thiểu lỗi.
3. Sau khi cài đặt tất cả mọi thứ đôi khi nó sẽ không hoạt động ngay, ae hãy khởi động lại để mọi thứ hoạt động ổn định nhé ;)

Bắt đầu thôi!

Bước 1: Cài đặt Unity.

Có thể nhiều ae sẽ nói, cài đặt Unity thì có gì đâu cần hướng dẫn!
Đúng vậy, bước này là phần mở rộng thôi, ae nhớ chọn Windows Store .NET Scripting Backend thì mới có thể làm việc với MR nhé ;)

![](https://images.viblo.asia/60d2cdc8-527c-451f-8ef0-64ab8b72f3ae.PNG)

Bước 2: Cài đặt Visual Studio.

- Update Visual Studio phiên bản mới nhất.

![](https://images.viblo.asia/da9d73d7-abd8-48b7-80c5-7def9283fd24.PNG)

- Cài đặt thêm cái gói bổ sung cho Visual Studio.

![](https://images.viblo.asia/44f5e614-8b1c-4f6d-b5f2-2974d4972116.PNG)

![](https://images.viblo.asia/97715e5e-c177-4c8b-b737-7db7ad532391.png)

![](https://images.viblo.asia/280f12ea-06a7-4552-ad70-4560a49752d0.png)

- Nếu các bạn sử dụng IL2CPP trong Unity thì nhớ cài cả gói Desktop development with C++ nhé!

![](https://images.viblo.asia/725e6ed9-09c0-418a-a061-f232af561d75.png)

![](https://images.viblo.asia/14bd2b3a-3934-428b-9f9c-d89b3f61e2df.PNG)

Bước 3: Cài đặt cho kính MR.

- Mặc định khi gắn kính vào (cắm cable HDMI vào vga và USB vào cổng USB 3.0) thì phần mềm Mixed Reality Portal sẽ được bật lên, tuy nhiên nếu nó ko bật thì các bạn hãy vào Start -> Mixed Reality Portal nhé ;)

![](https://images.viblo.asia/22c909bf-6ebc-4544-b1e7-d44a31adba7b.png)

![](https://images.viblo.asia/27bbf00f-259c-41fa-b29e-43fc40abf744.png)

![](https://images.viblo.asia/6180e668-9762-4e5f-a2ea-c573b5162b89.png)

![](https://images.viblo.asia/61969db7-7448-409b-ba13-a1e3f717c723.png)

- Kết nối tay cầm.

![](https://images.viblo.asia/5caabbb1-2fe0-40e5-9efe-5c86462f860b.png)

![](https://images.viblo.asia/b8d1cc1e-3113-43fa-b7f8-eed04c476c12.png)

![](https://images.viblo.asia/6f3bc11e-b182-4874-bc0f-f20538113b24.png)

- Chọn cách tương tác, ở đây ta có 2 cách, 1 là có thể di chuyển quanh 1 vùng nhất đinh, 2 là chỉ ngồi tại chỗ để tương tác.

![](https://images.viblo.asia/b711bbca-25f5-4713-9547-4f133bc67383.png)

![](https://images.viblo.asia/49393c0c-2631-4919-bd66-1f68895ddfe5.png)

Bước 4: Tạo 1 dự án Unity sử dụng MR.

- Switch dự án qua Universal Windows Platform

![](https://images.viblo.asia/965dc685-31d0-48f5-96c2-5aeaf6dad2d6.PNG)

- Chuyển Scripting Backend trong Other Settings qua .net

![](https://images.viblo.asia/8688c4d7-66c1-4e30-ac6a-4c8301283167.PNG)

- Trong XR Settings bật Vitual Reality Supported

![](https://images.viblo.asia/d5e9fe69-4bd1-4d7a-a65a-729c2639d4df.PNG)

Khi đã xong hết tất cả các bước trên, các bạn hãy cẩn thận khởi động lại máy 1 lần để đảm bảo mọi thứ đều hoạt động ngon lành. Sau khi khởi động lại xong các bạn bật Mixed Reality Portal lên trước, rồi vào dự án Unity ấn play thì sẽ thấy thành quả trong kính ;)

Chúc các bạn sẽ có những giây phút vui vẻ với MR và Unity nhé ^_^