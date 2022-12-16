**Kiểm thử end-to-end** là thực hiện các bài kiểm thử xuyên từ hành động đầu đến cuối của ứng dụng hay phần mềm. Nó được thực hiện sau khi hoàn thành các giai đoạn function test và system test.
Kiểm thử end-to-end có 2 phương pháp : 
- Kiểm thử end-to-end ngang
- Kiểm thử end-to-end dọc

Chúng ta cần thực hiện end-to-end test vì: kiểm thử end-to-end giúp tăng vùng phủ sóng test tất cả hệ thống phụ có liên quan, phát hiện vấn đề tới cả các sub-system. Đặc biệt với phiên bản thương mại của phần mềm, end-to-end testing đống vai trò quan trọng trong việc kiểm tra toàn bộ ứng dụng trong môi trường sử dụng thục, tương tác cơ sở dữ liệu thực.

![](https://images.viblo.asia/821cc2c5-af96-425e-bb43-93f95346053d.jpg)

Chủ yếu end-to-end testing được thực hiện bằng tay do chi phí của việc test automation tương đối cao với mọi tổ chức. Thực hiện bằng tau còn rất hữu ích cho việc intergration test mở rộng nữa.

Nhưng nếu bạn muốn thực hiện kiểm thử end-to-end bằng cách kiểm thử tự động thì làm cách nào giảm thiểu chi phí? Trong bài viết này tôi sẽ chia sẻ về điều này

#### Tăng tốc kiểm thử end-to-end
- Nếu bạn đang thực hiện kiểm thử tự động, bạn nên thực hiện cả môi trường phát triển và môi trường người dùng thật trong những lần kiểm thử đó. Tôi thường thấy các tổ chức thực hiện acceptance test dựa vào một bản sao end-to-end của sản phẩm.

- Nhưng có một kế hoạch tốt hơn đó là: Chia nhỏ những thử nghiệm thành các thành phần nhỏ hơn. Bắt đầu kiểm thử từ thành phần trong môi trường nhỏ, sau đó tăng dần môi trường kiểm thử ngày một tiến đến môi trường của người dùng. Mục tiêu làm giảm … khi nó tới tay khách hàng.

- Và một điều nữa là: việc thực hiện kiểm thử tự động dựa vào bản clones lại là một ý tưởng tồi. Đó là vì cách tiếp cận này mang lại môi trường thật cao, nhưng phải mất thời gian dài để có được phản hồi khi vừa chạy vừa sửa chữa. Các thử nghiệm lớn cũng làm khó cho việc chuẩn đoán nguyên nhân vấn đề hơn.

![](https://images.viblo.asia/0846b07e-6430-4fe5-b41f-86ba09296061.png)

- Bạn có thể nhìn thấy lỗi mà người dùng cuối gặp phải trong hệ thống nhưng để biết được nguyên nhân lỗi thì là cả một vấn đề từ khâu tìm mã lỗi, debug để thấy được nguyên nhân lỗi. Vì vậy mà thời gian điều tra nguyên nhân lỗi tăng lên.

#### Bạn có nghĩ đến việc chia nhỏ bài kiểm thử ra không? 
Chu kỳ phản hồi dài đi ngược lại nguyên tắc cốt lõi của việc phân phối liên tục và DevOps. Cũng như bạn cố gắng duy trì việc xây dựng unit test trong CI, bạn nên cố gắng giữ những bài kiểm tra đúng. Đương nhiên không có nghĩa là bỏ qua những bài kiểm tra không thành công.

Các bài kiểm thử end-to-end có thể mất nhiều thời gian để sửa chữa, các nhóm có xu hướng làm quen với các task khác mà không thực hiện sửa chữa lỗi luôn.

Một chiến lược kiểm tra chủ yếu dựa vào các bài kiểm thử end-to-end trong môi trường bản sao sản phẩm, thường do một trong các lý do:
- Quy trình không đủ tự động, nên deverloper phải sử dụng phương pháp tiếp cận để duy trì môi trường end-to-end tĩnh.
- Ở những nơi khác, khách hàng phải đối mặt với những khó khăn về phần cứng như: không đủ thiết bị test, nên deverloper tin rằng các thực tế duy nhất để kiểm thử là sử dụng môi trường kiểm thử end-to-end tĩnh.
- Ngay cả khi không có phần cứng, nếu một sản phầm được sử dụng trên nhiều hệ điều hành, sử dụng nhiều cơ sở dữ liệu trên máy chủ khác nhau thì việc sử dụng môi trường tĩnh có vẻ hấp dẫn hơn môi trường linh động.

=> Điều này thật sự là không được tốt cho các hệ thống phần mềm đang phát triển hiện nay.

![](https://images.viblo.asia/2ce3b9ff-0dd1-49cc-b281-4f235bf568a0.png)

Có hai yếu tố giúp bạn giảm thời gian feedback và sửa lỗi:
- Thiết lập ranh giới kiểm thử rõ ràng
- Tăng dần ranh giới kiểm thử và giảm số lần thực hiện kiểm thử xuống.

Và khi bạn phân chia nhỏ thành phần trong hệ thống để kiểm thử thì bạn có thể hiểu được điều gì thực sự xảy ra trong quá trình kiểm thử. Điều này càng làm rõ hơn các bước cơ bản để xác định rõ ràng các thành phần của hệ thống đang được thử nghiệm ở từng giai đoạn. 

Các thành phần này nằm trong ranh giới của thử nghiệm trong giai đoạn hiện tại. Những thành phần khác trong hệ thống dược mô phỏng sao cho đảm bảo kết quả lặp lại.

Các thành phần kiểm thử (bên trong ranh giới kiểm thử) giống như biến phụ thuộc. Các thành phần bên ngoài ranh giới kiểm thử sẽ được kiểm soát để giảm bề mặt kiểm thử.

#### Giảm thời gian sửa lỗi bằng cách thu hẹp bề mặt kiểm thử
Một chiến lược kiểm thử tự động tiên tiến tối ưu cho phản hồi nhanh, bắt đầu với các bài kiểm tra nhanh về thành phần nhỏ cô lập, mô phỏng tất cả các phụ thuộc nó. Sau đó dần tăng bề mặt kiểm thử, thay thế dần các thành phần, tăng dần tiến độ.

Và đây là chìa khoá giúp thời gian chu kỳ nhanh hơn: Mỗi lần tăng bề mặt kiểm thử, số lượng bài kiểm thử sẽ được giảm xuống theo thứ tự độ lớn.

Khi thường xuyên gặp lỗi trong một giai đoạn kiểm thử nhất định đảm bảo rằng bề mặt kiểm thử ở giai đoạn trước được phủ đầy các kiểm tra và không phải thêm những bài kiểm thử vào bề mặt lớn hơn.

#### Thiết lập ranh giới kiểm thử rõ ràng
![](https://images.viblo.asia/3a059c28-7c69-44be-aa40-5934a2717825.png)

- Đầu tiên chắc chắn rằng bài unit test của bạn đã được thông qua.
- Tiếp theo bạn có thể kiểm tra các thành phần thay đổi, nhưng thử nghiệm với sự cô lập thành phần.
**Lưu ý** rằng bạn đang thử nghiệm 1 thành phần, bạn không kiểm tra liên kết giữ các dịch vụ bên thứ 3, mà chỉ kiểm tra logic thành phần với kết quả đầu ra.
- Bạn có thể chạy hàng chục bài kiểm thử thay vì chạy hàng trăm bài unit test, nhưng chúng phải nhanh chóng và hợp lý.
- Sửa lỗi các bài kiểm thử lỗi trong giai đoạn có thể liên quan tới bản ghi hay lỗi ngoại lệ bất ngờ. Unit test được thông qua chứng tỏ có lỗi liên quan từ thành phần khác.
- Để chắc chắn bạn cần thêm 1 số bài unit test xung quanh bộ phận khác để có thể đối phó với tình huống thất bại.
- Khi bạn đã phân loại, mở rộng phạm vi kiểm tra thành phần liền kề. Bạn có thể khám phá ra sự khác biệt từ sự phản hồi của các thành phần khác nhau.

Trên đây là một số tips giúp bạn tăng tốc trong khi thực hiện kiểm thử end-to-end tự động. Mong rằng sẽ giúp ích cho bạn

Link nguồn: https://techbeacon.com/want-speed-end-end-testing-dont-send-clones