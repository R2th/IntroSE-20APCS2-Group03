**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng bước học Vue2 tập 10.

Hôm nay chúng ta sẽ làm 1 bài tập để học cách làm thế nào một thành phần có thể thông báo cho các thành phần khác về một hành động hoặc sự kiện cụ thể vừa diễn ra?

Và mình sẽ làm 1 ví dụ cụ thể về việc nhập coupon code như sau

Đầu tiên ở chúng ta sẽ tạo file index.html như sau
![](https://images.viblo.asia/e717911e-7262-4c92-8701-6c75b658df49.jpg)

Ở file js chúng ta khởi tạo component như những bài trước, ở đây mình sẽ làm 1 ví dụ đơn giản nên chúng ta chỉ cần 1 input để nhập coupon code. Và khởi tạo methods onCouponApplied() show ra alert đơn giản để check xem việc xử lý đã đc chưa
![](https://images.viblo.asia/2a950d7b-962c-474a-9590-31583fa84600.jpg)

Okie quay lại view thì chúng ta đã có 1 ô input
![](https://images.viblo.asia/861c0b75-86ea-43a9-ad46-faf91de38631.jpg)

Tiếp theo mình sẽ xử lý tiếp ở js, mình sẽ thêm placeholder cũng như sự kiện blur để nhận methods khi chúng ta blur ra khỏi input
![](https://images.viblo.asia/a48522d2-3110-421c-9555-d8f1685cf9f4.jpg)

Quay trở lại view chúng ta nhập coupon code vào input rồi blur ra. alert đã hiển thị vậy có nghĩa là việc chạy vào onCouponApplied đã như chúng ta mong muốn
![](https://images.viblo.asia/f2afa21f-55e4-4117-9ec5-2629ef2ff796.jpg)

Để nhận được coupon code vừa nhập vào chúng ta có thể làm như sau để truyền xử lý xuống dưới
![](https://images.viblo.asia/c5b95d47-df1b-476b-9bae-ca931b0b401e.jpg)

Nhưng vì mình chỉ làm 1 ví dụ đơn giản và không cần check db để hiểu cách truyền thông báo trong component nên mình sẽ coi như là coupon code luôn đúng và xử lý file js đơn giản như sau:
![](https://images.viblo.asia/93736977-cf4b-493c-b535-75e7b3cce5f8.jpg)

Và quay trở lại trình duyệt nhập coupon code, blur ra thì alert của phần xử lý chính đã được show ra.
![](https://images.viblo.asia/d8f1f19c-0299-4bd8-88b7-0ca7b4dc34f5.jpg)

Sau khi nhận coupon code thì chúng ta có thể hiển thị 1 message ra để thông báo cho người dùng vì vậy mình sẽ khai báo thêm data là couponApplied và khởi tạo bằng false. Sau khi gọi đến methods onCouponApplied thì data couponApplied sẽ được gán bằng true
![](https://images.viblo.asia/243b247d-2579-4d0b-9c0e-85ed07516af0.jpg)

Và đơn giản ở ngoài file html chúng ta có thể thêm 1 cặp thẻ <h1> với if chính bằng data couponApplied để message có thể show ra khi coupon code đã được nhập
![](https://images.viblo.asia/555107a7-46e9-4b44-9193-cf69490b8bf7.jpg)

Okie, cũng test lại ở trình duyệt chúng ta sẽ có kết quả như sau
![](https://images.viblo.asia/2c533206-d9f9-46d3-9466-ef669fff068e.jpg)


Vậy là rất đơn giản chúng ta cũng đã thấy được  một thành phần có thể thông báo cho các thành phần khác về sự kiện đã vừa xảy ra. Cụ thể ở đây là việc nhập coupon code sau khi blur thì message sẽ được show ra

Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!