Xin chào các bạn :D

Chắc các bạn cũng đã đọc hết series những bài viết của mình về cách sử dụng Chatfuel để làm chatbot cho fanpage của mình rồi đúng không?

Mình đã chia sẻ những thứ hay ho ở trong các bài viết đó. Nếu bạn nào chưa đọc thì có thể truy cập các bài viết của mình để đọc lại theo các link ở dưới đây nhé.

- [Sử dụng Chatfuel để làm chatbot cập nhật tình hình virus Covid-19 (Chatfuel part 1)](https://viblo.asia/p/su-dung-chatfuel-de-lam-chatbot-cap-nhat-tinh-hinh-virus-covid-19-chatfuel-part-1-jvElaAENlkw)
- [Sử dụng Chatfuel để làm chatbot gửi ảnh ( Chatfuel part 2)](https://viblo.asia/p/su-dung-chatfuel-de-lam-chatbot-gui-anh-chatfuel-part-2-gAm5ybREKdb)
- [Sử dụng Chatfuel để làm chatbot tra cứu giá xăng ( Chatfuel part 3)](https://viblo.asia/p/su-dung-chatfuel-de-lam-chatbot-tra-cuu-gia-xang-chatfuel-part-3-3P0lPqmn5ox)

Và tiếp tục series những trò hay ho khi làm chatbot bằng Chatfuel, thì hôm nay mình mang đến cho các bạn một bài hướng dẫn nữa, đó là làm chatbot tra cứu dữ liệu thời tiết.

Ok. Let's go thôi nào :D

Để sử dụng ở bài viết này mình cần một api cung cấp giá trị dữ liệu về thời tiết và tìm trên google thì các bạn sẽ gặp khá nhiều kết quả trả về như thế này. 
https://rapidapi.com/blog/access-global-weather-data-with-these-weather-apis/

Ở đây, mình sử dụng API của **OpenWeatherMap**! được cung cấp tại https://openweathermap.org/api

Để sử dụng, chúng ta cần tạo một tài khoản ở đây để lấy api_key. Các bạn đăng ký tài khoản tại đây nhé: https://home.openweathermap.org/users/sign_up

Sau đó sẽ có 1 email gửi về cho chúng ta như thế này, có luôn cả hướng dẫn sử dụng. Nếu bạn thấy chưa đủ chi tiết thì chúng ta xem ở trang api của nó nha.

![](https://images.viblo.asia/e3aecc2d-e21e-4f3a-9860-28c787adfa2a.jpg)

Ok. Vậy là đã có API key, chúng ta bắt đầu code để submit dữ liệu khi truy vấn thôi. Bạn sử dụng đoan code ở bên dưới nhé.

https://gist.github.com/quangpro1610/cb11fa8dd29c2c52197a5dd7d9b25083

Trong đoạn code trên, các bạn nhớ thay đổi api key mà OpenWeatherMap đã gửi email cho bạn nhé.

Tiếp đến là setup cho chatbot, các bạn setup như hình bên dưới nhé :D

![](https://images.viblo.asia/0b1ed621-3634-4a8f-a05f-38beb20046a7.jpg)

Giải thích là do chúng ta sử dụng để nhận giá trị là tỉnh, thành phố của người dùng gửi tin nhắn cho bot để bot trả về kết quả cho nên chúng ta dùng phương thức get để nhận dữ liệu của người dùng, sau đó sẽ trả dữ liệu thông qua code của chúng ta đã làm ở phía trên.

Cuối cùng, sau khi đã thiết lập xong, chúng ta chạy thử và kết quả sẽ như vậy. Chúc thành công :D

![](https://images.viblo.asia/98c4dbd5-5b0a-4dcb-ba44-17a956303c34.jpg)