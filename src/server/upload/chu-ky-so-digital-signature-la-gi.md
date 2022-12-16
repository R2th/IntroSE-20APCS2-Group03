Chữ ký số không đơn thuần là loại hình ký có khả năng thay thế hoàn toàn Chữ ký tay. Để đáp ứng tiêu chuẩn đối với ký số trên môi trường điện tử, chứng thư số được gắn vào chữ ký số phải đảm bảo các tiêu chí sau: Tính chống chối bỏ, toàn vẹn dữ liệu và tính định danh xác thực của đối tượng thực hiện ký.

Bài viết liên quan: [Nhà cung cấp Dịch vụ Ký số từ xa Remote Signing Đầu tiên tại Việt Nam](https://savis.vn/savis-duoc-cap-phep-dich-vu-ky-so-tu-xa-remote-signing-vn/)


## 1. Chữ ký số là gì?
Chữ ký số được tạo ra bởi cặp khóa mật mã và thuộc quyền kiểm soát duy nhất của người ký. Là tập con của Chữ ký điện tử, Chữ ký số hoạt động với các đặc tính cơ bản:
**Xác thực danh tính người ký:**
Chữ ký số sử dụng chứng thư số và công nghệ PKI (Public Key Infrastructure), cùng thuật toán mật mã an toàn RSA-2048bit theo quy định tại Thông tư 06/2015/TT-BTTTT
**Chống chối bỏ chữ ký:**
Được công nhận về pháp lý, chống chối bỏ chữ ký theo các quy định về Giao dịch điện tử tại Nghị định 130/2018/NĐ-CP
**Đảm bảo toàn vẹn dữ liệu ký:**
Mã hóa hàm băm SHA256 theo Quy định tại Thông tư 06/2015/TT-BTTTT chống làm giả, hoặc sửa xóa mà không bị phát hiện

Căn cứ Khoản 6 Điều 3 Nghị định 130/2018/NĐ-CP hướng dẫn Luật Giao dịch điện tử về chữ ký số – chữ ký điện tử:

“Chữ ký số là một dạng chữ ký điện tử được tạo ra bằng sự biến đổi một thông điệp dữ liệu sử dụng hệ thống mật mã không đối xứng, theo đó, người có được thông điệp dữ liệu ban đầu và khóa công khai của người ký có thể xác định được chính xác:
a) Việc biến đổi nêu trên được tạo ra bằng đúng khóa bí mật tương ứng với khóa công khai trong cùng một cặp khóa;
b) Sự toàn vẹn nội dung của thông điệp dữ liệu kể từ khi thực hiện việc biến đổi nêu trên.”

Hiểu một cách đơn giản, chữ ký số là "chữ ký" chứa tất cả các dữ liệu, thông tin định danh của một doanh nghiệp/cá nhân được mã hóa dùng thay cho chữ ký trên các loại văn bản và tài liệu điện tử thực hiện đối với các giao dịch điện tử qua mạng internet.

* Khóa bí mật (Private Key) - Là một khóa trong cặp khóa dùng để tạo chữ ký số
* Khóa công khai (Public Key) - Là một khóa trong cặp khóa dùng để để đối chiếu với Khóa bí mật của chữ ký số, được tạo bởi khóa bí mật tương ứng trong cặp khóa
* Người ký - Thuê bao dùng khóa bí mật của mình để ký số vào một thông điệp dữ liệu với định danh của mình
* Người nhận - Tổ chức/ cá nhân nhận được thông điệp dữ liệu được ký số bởi người ký, bằng việc sử dụng chứng thư số của người ký để kiểm tra chữ ký số ở thông điệp dữ liệu nhận được và sau đó tiến hành các hoạt động, giao dịch liên quan.
* Ký số - Khóa bí mật được đưa vào một phần mềm để tự động tạo và gắn chữ ký số vào thông điệp dữ liệu.

## **2. Chứng thư số là gì**
Chứng thư số là một tệp hoặc mật khẩu điện tử chứng minh tính xác thực của thiết bị, máy chủ hoặc người dùng thông qua việc sử dụng mật mã và cơ sở hạ tầng khóa công khai (PKI). Chứng thư số giúp các tổ chức đảm bảo rằng chỉ những thiết bị tin cậy và người dùng tin cậy mới có thể thực hiện ký số.

Về cơ bản, chứng thư số là cặp khóa và đã được mã hóa dữ liệu gồm các thông tin như: công ty, mã số thuế của doanh nghiệp… Thông qua Chứng thư số, người dùng có thể sử dụng ký số để nộp thuế trực tuyến, khai báo hải quan điện tử và thực hiện các giao dịch điện tử khác (giao dịch ngân hàng, hợp đồng điện tử, tài liệu .

**Các thông tin tối thiểu cần có trong chứng thư số gồm:**

* Tên tổ chức cung cấp dịch vụ chứng thực chữ ký số
* Tên thuê bao
* Tên cá nhân/tổ chức sở hữu chứng thư số
* Số hiệu
* Thời hạn có hiệu lực của chứng thư số
* Khóa công khai (Public key)
* Chữ ký số
## 3. Tại sao nên dùng chữ ký số thay vì ký tay
Chữ ký tay là chữ ký được thực hiện thông qua ký bằng mực tươi lên giấy với ý nghĩa minh chứng cho sự hiện diện của cá nhân/tổ chức/doanh nghiệp nào đó. Chữ ký tay có thể là tên, biệt danh hay một ký hiệu bất kỳ và thường thấy trên tài liệu, hợp đồng, văn bản pháp lý,… nhằm xác định nội dung được ký.

**Nhược điểm của chữ ký tay**
* Quy trình vận hành phức tạp, thiếu linh hoạt: in ấn văn bản, ký tay, chuyển tiếp ký,…
* Tốn thời gian: khi ký số lượng lớn tài liệu, hợp đồng, hóa đơn; khách hàng phải chờ đợi quy trình giấy với nhiều vấn đề rủi ro và tốn kém
* Không đảm bảo tính bảo mật: dễ giả mạo, bị bắt chước, không có tính xác thực cao
* Không thuận tiện cho quá trình lưu trữ, tra cứu, tìm kiếm
* Dễ thất lạc, hỏng hóc, mất giá trị bằng chứng chứng cứ
* Chi phí cao (thủ tục hành chính, chuyển phát,...)

**Ưu điểm của chữ ký số**

* Tiết kiệm thời gian, nguồn lực trong quá trình vận hành, làm việc nội bộ và với khách hàng: Thông qua ký số, quy trình ký và gửi nhận tài liệu có thể rút ngắn từ vài ngày xuống 1 phút mà vẫn đảm bảo an toàn, bảo mật thông điệp dữ liệu, tiêu chuẩn lưu trữ theo quy định

* Khẳng định trách nhiệm pháp lý, tính bằng chứng chứng cứ của tài liệu sau ký: Chữ ký số giúp hạn chế tối đa những bất cập trong làm giả chữ ký, giả mạo tài liệu và gian lận thủ tục hành chính. Cùng với Dấu thời gian Timestamp, LTV, LTANS, eSeal, giải pháp ký số sẽ đảm bảo tính bằng chứng chứng cứ của tài liệu kể cả sau khi chứng thư số hết hạn. Hiệu lực của chứng thư số chữ ký số sẽ được thể hiện rõ ràng, cho căn cứ pháp lý vững chắc đối với những hợp đồng có giá trị lớn và yêu cầu pháp lý cao.

* Đảm bảo tính toàn vẹn dữ liệu: Việc ký số giúp xác nhận nội dung tài liệu, thông điệp giao dịch số, khẳng định sự tin cậy đối với các bên tham gia giao dịch/ký tài liệu, hợp đồng vì nội dung dữ liệu đã ký không thể sửa xóa, không thể thay đổi.

* Ký số mọi lúc, giao dịch mọi nơi: Hiện trên thị trường có 4 loại chữ ký số: Chữ ký số USB Token, chữ ký số qua sim, chữ ký số HSM, chữ ký số từ xa. 

Như vậy, công nghệ ký số đang trở thành xu hướng không thể chối bỏ trong bối cảnh chuyển đổi số mạnh mẽ tại các quốc gia đang phát triển. Chuyển đổi số toàn diện sẽ bắt đầu từ Ký số nhằm đảm bảo định danh và xác thực trên môi trường điện tử, cũng như đảm bảo cho quá trình này tại mọi tổ chức/doanh nghiệp được an toàn, bền vững. Để hiểu về Ký số, sẽ còn một hành trình rất dài, hãy cùng đón đọc bài viết tiếp theo xoay quanh Ký số từ xa, chứng thực dịch vụ ký số, các nhà cung cấp dịch vụ chứng thực ký số tin cậy tại Việt Nam.