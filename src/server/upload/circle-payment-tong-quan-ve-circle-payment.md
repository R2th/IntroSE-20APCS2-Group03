Circle Payment là sản phẩm giúp cho các cá nhân, doanh nghiệp có thể thanh toán và gửi các khoản thanh toán trên toàn cầu bằng 1 tài khoản duy nhất. Khách hàng có thể thanh toán qua nhiều hình thức như Bank, thẻ thanh toán hay ví tiền crypto.

### 1. Mô hình hoạt động Circle Payment
### 

Circle Payment ho phép người dùng thanh toán bằng tiền pháp định thông qua ngân hàng, thẻ,... hoặc USDC thông qua ví tiền điện tử. Số tiền này sẽ được gửi vào Circle Account. 

Số tiền thanh toán khi về Circle Account, có thể gửi qua ví điện tử người dùng khác, hoặc gửi về tài khoản ngân hàng (hỗ trợ hơn 87 quốc gia) hoặc ACH - một dạng thanh toán tại Hoa Kỳ.

Có thể thấy Circle Account đóng vai trò trung tâm, luân chuyển tiền từ các sản phẩm Payment và Payounts. Do tính tiện dụng, các tổ chức muốn hợp tác với Circle cần tạo Circle Account.

![image.png](https://images.viblo.asia/23cb4508-8d1e-423c-b820-677f1a67bd08.png)


### 2. Pricing
### 

Như đã nói ở trên, các tổ chức muốn hợp tác với Circle cần tạo Circle Account. Theo pricing plan được list trên trang chủ của Circle mức default cho payment service là 1000$/month với tỉ lệ fee giao dịch cố định khá cao dưới đây (có lẽ contact sale có thể down được phần nào). Các bạn có thể tham khảo thêm ở [đây](https://www.circle.com/en/pricing#payments)

![image.png](https://images.viblo.asia/8bcfafbd-6ab4-4ab1-9d87-284c2b11a2fb.png)


### 3. Developer tools
### 
Circle Payment cùng như tất cả các dịch vụ của Circle cung cấp cho Developer 3 tools chính hỗ trợ việc phát triển bao gồm:

* Sandbox environment [link](https://my-sandbox.circle.com)
* API documentation [link](https://developers.circle.com/docs/getting-started-with-the-circle-payments-api)
* Sampple app for testing api [link](https://developers.circle.com/docs/check-out-a-sample-payments-application#api-viewer) 
* Ngoài ra các bạn cũng có thể test trực tiếp api [ở đây](https://developers.circle.com/reference) 

### 4. Tài khoản sandbox
### 

Như đã nói ở trên, Circle cung cấp môi trường sandbox tương tự môi trường production hỗ trợ Developer tích hợp các sản phẩm của mình. Để tạo tài khoản các bạn access url sau và tiến hành khởi tạo https://my-sandbox.circle.com/signup

> Tips : Sau khi tạo tài khoản bạn sẽ được tự động login vào tài khoản vừa tạo, tuy nhiên lúc này các dịch vụ không xuất hiện đủ trên giao diện đâu (chắc là bug gì đấy của Circle hi vọng lúc bạn đọc các dòng này thì CIrcle đã fix rồi) các bạn nên login lại nhé.
![image.png](https://images.viblo.asia/674be1bb-1094-4efc-9054-1d44cf2864c8.png)

Sau khi tạo tài khoản thành công  chúng ta cần tạo api key để sử dụng cho quá trình tích hợp payment vào hệ thống. 

***SETTING -> Sandbox API Keys -> Get new api key -> Lưu lại api key***

All done, đến đây các bạn đã có thể bắt đầu sử dụng các api ở môi trường sandbox với api vừa tạo. 

**Ở bài viết sau mình sẽ hướng dẫn các bạn cách tích hợp Circle Payment thanh toán FIAT với Card**