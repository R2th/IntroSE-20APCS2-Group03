# Ngữ cảnh
Xin chào các bạn, như nói ở [bài trước](https://viblo.asia/p/hack-may-chu-lua-dao-EbNVQZlB4vR) tôi tiếp cận với một nhóm lừa đảo tinh vi hơn. Kỳ này là sàn tài xỉu đánh theo giá lên xuống của bitcoin. Đây là nhóm chuyên nghiệp hơn thể hiện ở web, tài khoản zalo nhân viên có lịch sử: các hình ảnh tạo dựng là doanh nhân trẻ thành đạt, nhóm có tính kỷ luật. Thời gian tôi tiếp cận có ít nhất 3 nhóm dùng 2 white label của một sản phẩm cốt lõi. 
Bạn nào muốn tìm hiểu cách thức lừa đảo, xem chim mồi diễn thì có thể ghé ngang qua [youtube](https://www.youtube.com/watch?v=5nsLE-wamWw&ab_channel=b%C3%B3ngbay) của tôi cho đời thêm thi vị, như thường lệ tôi thiên về kỹ thuật ở đây.

# Thu thập thông tin
### vnbitcoin
Máy chủ [vnbitcoin](https://vnbitcoin.cc) ở Hong Kong; cloud provider:  Pacificnet; sử dụng openresty là api gateway.
Cách tiếp cận là qua facebook ads, đến messenger rồi qua zalo, có link vô s3 dẫn tới sàn. Các bucket S3 này phân quyền khá tốt, tôi không vào để thay đổi static content được.
* https://d88.s3.amazonaws.com/8.html có mã giới thiệu: VmrPlg
* https://d66.s3.amazonaws.com/6.html có mã giới thiệu: 62jjK6

Chủ tài khoản là NGUYEN VAN NGOC, 19037943799018, Techcombank

Đăng ký thành viên có xác thực captcha
![Screen Shot 2022-10-13 at 11.29.21.png](https://images.viblo.asia/f5863d19-6501-418e-9ba1-8e1a865b199e.png)

Các endpoint đều có cảnh báo spam
![Screen Shot 2022-10-13 at 11.34.39.png](https://images.viblo.asia/6cc7eb90-4f3f-4fa0-8589-6d8b5dbfa88f.png)

### gateio
Máy chủ [gateio](https://gateio.com.mx) ở bờ tây Mỹ, cloud provider: CloudFlare, bộ đồ lòng y chang chỉ có áo là khác. Có điểm lưu ý là:
khi tôi tiếp cận thì không có link S3 mà chỉ có nhân viên messenger đưa tôi thẳng link vô sàn với mã: mrwoRp
và chủ tài khoản vẫn là NGUYEN VAN NGOC, hôm sau thì đổi sang tài khoản khác DANH GIAO. Vì xài 2 cloud provider khác nhau, tôi đoán 2 đại lý không liên quan đến nhau có chăng chỉ là chuyển giao công nghệ. Có thể xem mối quan hệ giữa chúng thế nào: tôi nói nhỏ với con hổ này bên khu rừng kia cũng có con hổ to lắm xem nó phản ứng thế nào, kết quả không như mong muốn: tôi buồn 2 phút ngẫm lại sức khoẻ tâm thần của mình.
![0358C262-79E6-465E-BB58-CC53F36AC396_1_105_c.jpeg](https://images.viblo.asia/f7c1a9c5-5bb1-41d7-a25d-99e31d6e912b.jpeg)

# Phương thức tấn công
Tôi sẽ chọn tấn công vnbitcoin, vì tôi đang trong zalo nhóm này, giao dịch khá xôm tụ. Tôi vẫn theo hướng DDoS, có nhiều lựa chọn: các endpoint nạp tiền/rút tiền (có thể cảnh báo chỉ là hù doạ), hoặc là đăng ký tài khoản mới. Tôi chọn phương án sau và xác thực captcha bằng machine learning.

Giải captcha là bài toán đã có nhiều người thông minh hơn tôi làm, việc tôi cần là chọn ra một model phù hợp. Có 2 thứ cần quan tâm: captcha generator và bản thân OCR model.
* Captcha generator: tôi chọn [base64Captcha](https://github.com/mojocn/base64Captcha), có demo web captcha mẫu nhìn rất giống.
![Screen Shot 2022-10-13 at 11.54.34.png](https://images.viblo.asia/c2101a01-c33b-4842-a188-414e682bd4ee.png)
Tôi chỉnh lại một chút cho ra khoảng 3000 mẫu và lưu dưới dạng jpeg vì tensorflow có một chút vấn đề khi grayscale hình png, chi tiết ở [đây](https://github.com/tensorflow/tensorflow/issues/28256)

* OCR model: có khá nhiều ocr model sẵn có trên mạng, tôi chọn [một ví dụ trên trang gốc keras](https://keras.io/examples/vision/captcha_ocr/). Vì model này khá đơn giản máy học nhanh và hiệu quả, bạn có thể cho máy học với free account trên colab, 1000 hình 50 epoch mất khoảng 20-30 phút, nếu mua GPU thì chưa tới 5 phút.

Train model xong tôi test thử 3 hình captcha trên colab, có vẻ ổn.
![real_data_res.png](https://images.viblo.asia/9a2142ac-10e4-4457-9900-024f0f114661.png)

Tiếp đến tôi lấy captcha về giải, tôi cho mỗi request cách nhau 2 giây để cho tiện theo dõi:
![infer.gif](https://images.viblo.asia/48ab0705-139d-404b-90d6-8c5d59bd0613.gif)

Giờ thì ráp api register vào và cho 20 thread cùng đăng ký:
![](https://images.viblo.asia/b1853d29-2465-4af8-830b-2105877d17f2.gif)


Tôi cho chạy 50 thread mỗi node, gồm 10 nodes nhưng vẫn không ăn thua, server này thật sự mạnh. Tôi phải tìm cách khác, quan sát api query nạp tiền tôi thấy có tham số pageSize mặc định là 20
![](https://images.viblo.asia/2d8cbefb-5d13-436f-b37c-d1a9e22cd659.png)
Nếu tôi spam tạo record nạp tiền và đồng thời query lại vớ pageSize là 999999999 thì đến một lúc nào đó record nạp tiền đủ lớn, IO database sẽ quá tải và làm timeout request khác đến hệ thống. Tôi chạy đươc 2 ngày lên khoảng 500,000 record thì hôm sau thấy bị reset lại là 0, và IP VPN của tôi bị chặn.
![reset_deposit.png](https://images.viblo.asia/f551f701-7885-4270-855b-04c17518ded0.png)

Tôi chuyển qua API upload hình, thấy có thể upload file hình lớn mà không bị giới hạn: 17MB
![upload.png](https://images.viblo.asia/b37263a2-2d86-45b0-b0b7-76f1dcdf39d1.png)
Tôi cho chạy 5 thread (upload cũng bị rate limit), khoảng 12 request / 6 giây vậy: 10 nodes  chạy sẽ là 29GB / 1 ngày, cũng đáng để thử. Rồi hình của tôi bị delete hết
![Screen Shot 2022-10-20 at 23.18.54.png](https://images.viblo.asia/499f425d-b53f-4bc4-859f-4b40d5d442db.png)

Các tấn công của tôi openresty có thể chặn dễ dàng, config GUI khá friendly, tới đây thì thấy cách lựa chọn stack cũng khá hợp lý: can thiệp nhanh; chỉ cần một chút IT cơ bản là có thể bảo vệ server.
![openresty.png](https://images.viblo.asia/f1b16386-f7ac-40eb-b1f3-1e701e826700.png) nguồn: [channel opesresty](https://www.youtube.com/watch?v=YKP091Y7sU0&ab_channel=OpenResty)

# Final thought
Đây là một hệ thống được cấu hình chặt chẽ và có lựa chọn stack khá tốt. Hệ thống có polling mỗi giây giá btc, trong lúc tấn công những request này hầu như không bị trễ; có thể cái này dựa vào QoS của openresty.
Xin cảm ơn các bạn đã theo dõi, tuy thực sự không có impact gì lớn đến hệ thống; mục đích cuối cùng của tôi vẫn là phơi bày trò lừa đảo sau khi tìm hiểu nhóm này.

# References
* targets:
    1. https://vnbitcoin.cc
    2. https://gateio.com.mx/#/pages/register/register?icode=mrwoRp
* github: https://github.com/quabongbay/vnbitcoin
* openresty: https://www.youtube.com/watch?v=YKP091Y7sU0&ab_channel=OpenResty
* youtube: https://www.youtube.com/watch?v=5nsLE-wamWw&ab_channel=b%C3%B3ngbay