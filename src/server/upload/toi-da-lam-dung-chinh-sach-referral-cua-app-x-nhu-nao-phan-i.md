Trước hết, bài này là bài về kĩ thuật =))) Nhưng tản mạn hơi dài anh em cố đọc không thì kéo xuống dưới nhé

## Lời nói đầu

> Referal là loại hình marketing dạng như bạn mời người B cài app X qua một mã giới thiệu, giống kiểu Momo và 2 người (hoặc người đi mời) sẽ hưởng 1 quyền lợi cụ thể nào đó

Có thể nói Referral hay Referral Marketing là chiến lược Marketing mang tính truyền miệng. Đây có thể nói là chiến lược thay vì bỏ hàng đống tiền để chạy Ads (không nhìn thấy kết quả) thì ta có thể thấy rõ được bao nhiêu người sử dụng sản phẩm hay chiến lược có thành công không dựa vào số người được mời, số người cài đặt ứng dụng qua những lời mời của người khác. Tuy vậy, referral luôn luôn có kẽ hở, nhất là ở Việt Nam anh em chơi MMO đông như quân Nguyên thì referral marketing ở Việt Nam phải hết sức cẩn thận không thì "tiền mất tật mang"

Nói qua về chú blog này, mình được 1 người bạn cùng trường, anh này chơi MMO đỉnh lắm giới thiệu cho 1 con app của bên X. App này thì mới làm về thương mại điện tử kiểu như bán 1 mặt hàng nào đó, để tiết kiệm Marketing thì khi bạn cài app họ cho bạn 1 mã giới thiệu và khi giới thiệu đến 1 số người nhất định bạn sẽ được một món quà nào đó và 1 khoản tiền hoa hồng :D Nghe thật hấp dẫn. Đối với nhiều công ty thì họ lấy hình thức referral này dưới 1 cái tên mĩ miều là các cộng tác viên. Có khá nhiều "công tác viên" chân chính, nhưng ngoài ra có cái nhiều người đi cheat đi vọc :3rd_place_medal: 

## Làm như nào để chống lại nạn cheat referral
Mình thấy các công ty nhỏ làm referral thường event sống không được lâu do cheater lạm dụng rất nhanh. Dưới đây là lịch sử công ty X mà mình tìm ra chống lại cheater
- First release: Mời n người bạn đổi được 1 quà, 1 quà đổi được 1 sản phẩm, không giới hạn số quà mỗi user, không giới hạn số lần đổi quà
- Tiếp theo, vẫn mời n người đổi 1 quà, mỗi quà đổi 1 sản phẩm, không giới hạn số quà mỗi user, mỗi ngày đổi tối đa m quà
- Vẫn mời n người đổi 1 quà, mỗi quà đổi 1 sản phẩm, không giới hạn số quà mỗi user, mỗi ngày đổi tối đa 1 quà
- Vẫn mời n người đổi 1 quà, mỗi quà đổi 1 sản phẩm, không giới hạn số quà mỗi user, mỗi ngày đổi tối đa 1 quà, người được mời phải phát sinh giao dịch
- Vẫn mời n người đổi 1 quà, mỗi quà đổi 1 sản phẩm, không giới hạn số quà mỗi user, mỗi ngày đổi tối đa 1 quà, quà bây giờ chỉ là voucher ưu đãi không được miễn phí nữa

Ngoài ra, mỗi lần đổi quà, cộng tác viên nhận được 1 khoản gọi là hoa hồng :3 nếu không nhận quà thì có thể nhận hoa hồng cũng là 1 lựa chọn hay

Như vậy, có thể thấy, các công ty dường như phải chạy theo những cheater này để tìm cách chấp vá theo mình thấy không nên =))) Tại sao chúng ta phải thay đổi policy thay vào đó chúng ta có thể tìm hiểu tại sao cheater có thể lạm dụng chúng. Qua đây có thể nói, bộ phận pentest rất rất quan trọng ngay cả đơn vị lớn hay nhỏ

## Đây là cách mình đã lạm dụng nó và 1 số kịch bản
Mọi thứ chỉ đơn giản là mình tạo thật nhiều acc rồi ref với nhau thôi =)))) Rồi, nhiều bạn nghĩ app gì mà gà mờ thế. Tại sao không unique device qua 1 cái gì đó. Câu chuyện ở đây là đương nhiên họ phải unique device và unique device phải là thứ đầu tiên họ nghĩ đến vì đây là thứ ảnh hưởng trực tiếp đến ngân sách chứ :( Thế nhưng, mọi thứ pass quá dễ dàng
![](https://storage.googleapis.com/appcloner.appspot.com/screenshots/large/3.png)
Đây là một phút cho PR, mình còn nhẹ nhàng tìm được một con app hỗ trợ clone app, có option fake AndroidID, IMEI thậm chí cả MAC Address xịn xò chưa 🤡, thế thì bảo sao các app mấy anh Việt Nam đập dài dài.

À quên nói sơ ra một chút thì ngày xưa người ta sẽ dựa vào IMEI hay MAC để nhận diện thiết bị với nhau nhưng từ Android 8, Gooogle nhằm tăng cường bảo mật với người dùng nên đã recommend sử dụng AndroidID để thay thế, và mỗi app sẽ tự sinh AndroidID riêng biệt (khác với trước là AndroidID theo máy), cùng với đó là MAC không thể lấy được từ Android 6 và nếu bạn muốn sử dụng IMEI phải xin quyền gọi điện :D Ai muốn cho 1 cái app shop online quyền gọi điện đúng không nào?

> MAC addresses are globally unique, not user-resettable, and survive factory resets. For these reasons, to protect user privacy, on Android versions 6 and higher, access to MAC addresses is restricted to system apps. Third-party apps can't access them.

Tham khảo thêm tại [đây](https://developer.android.com/training/articles/user-data-ids)

Ngoài ra, một cái App để an toàn phải qua vô vàn bước ví dụ như sử dụng SSL Pinning để tránh bị bắt package (tham khảo tại [đây](https://viblo.asia/p/giao-tiep-an-toan-voi-server-tu-ung-dung-android-voi-certificate-pinning-LzD5deBdKjY)) nên việc bảo là lấy API ra call bằng code cũng hơi mệt (nhưng vẫn làm được :D) 

Thôi, bài này giải thích cho anh em phần chính là Referral là gì và các kịch bản để lạm dụng thôi :D phần sau mình sẽ đi vào thực tế nhé. Bài viết hơi ngắn nhưng hi vọng có cái nhìn giúp anh em thấy được một số lỗ hổng trong việc đưa ra các chiến dịch, chính sách phù hợp