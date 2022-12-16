### 1. Cài đặt Postman
Bạn có thể cài đặt Postman Native App ở đường dẫn sau :
https://www.getpostman.com/apps

hoặc cũng có thể cài đặt từ Google Chrome web store (Postman extension) bằng cách dùng link bên dưới :

https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en

Postman rất dễ sử dụng. Nó cung cấp một tập các API calls và mọi người phải tuân theo để có thể test API
### 2. Ưu nhược điểm của Postman

Postman là 1 công cụ để test API của cty Postdot Technologies được bắt đầu phát triển từ năm 2012. Hiện tại Postman có 3 phiên bản: Postman, Postman Pro (2016) và Postman Enterprise (2017). Mình mới sử dụng Postman phiên bản free nên mình chỉ giới thiệu phần này.

**1.  Ưu điểm:**
* Dễ sử dụng, hỗ trợ cả chạy bằng UI và non-UI.
* Hỗ trợ viết code cho assert tự động bằng Javascript.
* Hỗ trợ cả RESTful services và SOAP services.
* Có chức năng tạo API document.

**2. Nhược điểm:**
* Những bản tính phí mới hỗ trợ những tính năng advance: Làm việc theo team, support trực tiếp… 
### 3. Các thành phần chính của Postman
Giao diện của Postman:
![](https://images.viblo.asia/6fac31c4-50d0-41f7-9b5d-dce264a5b753.png)
1. **Settings**: chứa các thông tin về cài đặt chung.
![](https://images.viblo.asia/0f13ab35-872d-47ee-aa33-cca1b11aa8d6.png)
* Thông tin Account: dùng để Login, logout và sync data.
* Settings tùy chỉnh: themes, shortcut, format…
* Import data từ ngoài vào
2. **Collections**: lưu trữ thông tin của các API theo folder hoặc theo thời gian
![](https://images.viblo.asia/88fad9a0-b172-4b89-9b61-ef74feda262e.png)
3. **API content**: hiển thị nội dung chi tiết API và các phần hỗ trợ giúp thực hiện test API. 
Đây là phần mà tester phải làm việc nhiều nhất.
![](https://images.viblo.asia/adc5637b-5951-4637-9c28-5d55814000b3.png)
Trong phần này gồm có 3 thành phần chính:

* Enviroments: Chứa các thông tin môi trường. Ví dụ: mình làm 1 dự án nhưng có 3 môi trường khác nhau: dev, staging và product. Có phần này, mình có thể nhanh chóng đổi sang môi trường cần test mà không phải mất công đổi URL của từng request. (Cái này sẽ được nói rõ hơn ở những bài sau)
* Request: Phần chứa các thông tin chính của API. Có thể đọc lại bài [Cơ bản về API Testing (Phần 2)](https://viblo.asia/p/co-ban-ve-api-testing-phan-2-RQqKLQmbZ7z)
* Reponse: Chứa các thông tin trả về sau khi Send Request.
### 4. Tạo Request 
Khi vào dự án thật, những thông tin trên thì bạn lấy ở đâu, ở developer nhé. Muốn test được API thì phải có API documents. Cái này tùy công ty sẽ có chuẩn và mẫu riêng, nhưng mà nhìn chung thì phải cung cấp đủ các thông tin sau: Tên API, mục đích sử dụng, Method, URL, Params, Sample Request, Sample Response.
1. Tạo Request GET
![](https://images.viblo.asia/a7a1a210-3ddc-44a7-934b-760c0a165fa5.png)
* URL: https://echo.getpostman.com/get (Update: https://postman-echo.com)
* Method: GET
* Headers: Không cần điền gì cả
* Body: Phương thức GET không có body, các bạn phải điền tham số vào Params
![](https://images.viblo.asia/2a2055b3-ae77-4401-94ec-0e8d43727aef.png)

Lưu ý: Tất cả các Params truyền vào phải chính xác, không được để thừa 1 khoảng trống hay xuống dòng.

Sau khi điền đầy đủ thông tin thì ấn SEND để gửi request và chờ response trả về.
![](https://images.viblo.asia/56c6fa03-e810-4ef0-891f-07173fe942f5.png)

Thông tin trả về sẽ có mấy điểm cần quan tâm:
* Định dạng dữ liệu trả về: thông thường là json và nên để chế độ Pretty để cho dễ nhìn.
* Nội dung dữ liệu: Đây là phần bạn phải kiểm tra.


– Bạn so sánh với cái Sample Response ở API docs để xem cấu trúc trả về đã đúng hay chưa.

– Value của từng key đã đúng chưa, so sánh với nội dung trong DB. (không có DB là ko làm được API testing đâu, tất nhiên khi làm API auto test thì ko so sánh với DB).
* Trạng thái của API (status) và thời gian trả về.
Xin được lưu ý, thời gian chạy API bằng Postman luôn ngắn hơn thời gian test trên giao diện Mobile vì nhiều lý do: đường truyền internet ở máy tính ổn định hơn wifi, và sau khi nhận response thì Mobile phải chạy code khởi tạo giao diện để hiển thị.

3. Tạo Requets Post
Tương tự như phần trên, chỉ khác là điền tham số vào trong body.
![](https://images.viblo.asia/4522f3b1-86c9-4f28-aa90-1e7b48e8d456.png)
Tương tự như phần trên, chỉ khác là điền tham số vào trong body.
![](https://images.viblo.asia/11726040-585a-45d2-afe9-21fe77d5319c.png)

-----------------
Nguồn: 

https://www.guru99.com/api-testing.html

https://medium.com/aubergine-solutions/api-testing-using-postman-323670c89f6d