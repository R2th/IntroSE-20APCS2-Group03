## Môi trường thử nghiệm là gì?
Một môi trường thử nghiệm là một thiết lập phần mềm và phần cứng cho các nhóm thử nghiệm để thực thi các testcase . Nói cách khác, nó hỗ trợ thực hiện kiểm tra với phần cứng, phần mềm và cấu hình mạng.

Test bed hoặc môi trường thử nghiệm được cấu hình theo nhu cầu của Ứng dụng đang thử nghiệm(Application Under Test). Trong một số trường hợp, test bed  có thể là sự kết hợp của môi trường thử nghiệm và dữ liệu thử nghiệm mà nó vận hành.

Thiết lập một môi trường kiểm thử đúng đảm bảo kiểm thử phần mềm thành công. Bất kỳ sai sót trong quá trình này có thể dẫn đến chi phí và thời gian thêm cho khách hàng
![](https://images.viblo.asia/c76f26d6-d8d2-4a8b-946e-d025a2da4101.jpg)


## Các điểm chính để thiết lập trong môi trường thử nghiệm
Đối với môi trường thử nghiệm, một khu vực chính cần thiết lập bao gồm

1. Hệ thống và ứng dụng
2. Dữ liệu kiểm tra
3. Máy chủ cơ sở dữ liệu
4. Môi trường chạy front-end
5. Hệ điều hành khách hàng
6. Trình duyệt( Browser) 
7. Phần cứng bao gồm hệ điều hành máy chủ
8. Network
9. Tài liệu cần có như tài liệu tham khảo / hướng dẫn cấu hình / hướng dẫn cài đặt / hướng dẫn sử dụng 

 ![](https://images.viblo.asia/93e88672-1122-4954-a37e-76aaf40f4233.png)


## Quy trình thiết lập môi trường kiểm thử phần mềm
Các thử nghiệm giới hạn trong những gì có thể được kiểm tra và những gì không nên được kiểm tra.

Những người  sau có liên quan đến thiết lập môi trường thử nghiệm: 

1. Quản trị viên hệ thống,
2. Developers
3. Tester
4. Đôi khi là người dùng hoặc kỹ thuật viên có thể thử nghiệm.
Môi trường thử nghiệm yêu cầu thiết lập nhiều khu vực khác nhau như:

### Thiết lập máy chủ thử nghiệm

Mọi thử nghiệm có thể không được thực hiện trên một máy cục bộ. Nó có thể cần thiết lập một máy chủ thử nghiệm, có thể hỗ trợ các ứng dụng.

Ví dụ: Fedora thiết lập cho PHP, các ứng dụng dựa trên Java có hoặc không có máy chủ thư, thiết lập cron, ứng dụng dựa trên Java, v.v.

### Mạng

Mạng được thiết lập theo yêu cầu thử nghiệm. Bao gồm:

1. Thiết lập Internet
2. Thiết lập mạng LAN
3. Thiết lập mạng riêng
Điều đó đảm bảo rằng sự tắc nghẽn xảy ra trong quá trình thử nghiệm không ảnh hưởng đến các thành viên khác. (Developers, v.v.)
![](https://images.viblo.asia/3a41409e-083d-4ab5-a172-d9eeddfb321a.png)


### Kiểm tra cài đặt PC

Để kiểm tra web, bạn có thể cần thiết lập các trình duyệt khác nhau cho những người kiểm tra khác nhau. Đối với các ứng dụng máy tính để bàn, bạn cần nhiều loại HĐH khác nhau cho các PC thử nghiệm khác nhau.

Ví dụ: thử nghiệm ứng dụng Windows phone có thể yêu cầu

* Cài đặt Visual Studio
* Trình giả lập điện thoại Windows
* Ngoài ra, chỉ định một điện thoại windows cho người kiểm tra.

###  Báo cáo lỗi

Các công cụ báo cáo lỗi nên được cung cấp cho người kiểm tra.
![](https://images.viblo.asia/5c9555f0-cd4b-4388-be0d-aa2dd580596e.png)


### Tạo dữ liệu thử nghiệm cho môi trường thử nghiệm

Nhiều công ty sử dụng một môi trường thử nghiệm riêng biệt để kiểm tra sản phẩm phần mềm. Phương pháp phổ biến được sử dụng là sao chép dữ liệu sản xuất để kiểm tra. Điều này giúp người kiểm tra, phát hiện các vấn đề tương tự như một máy chủ sản xuất trực tiếp, mà không làm hỏng dữ liệu sản xuất.

Phương pháp sao chép dữ liệu sản xuất để kiểm tra dữ liệu bao gồm:

* Thiết lập công việc sản xuất để sao chép dữ liệu vào môi trường thử nghiệm chung
* Tất cả PII (Thông tin nhận dạng cá nhân) được sửa đổi cùng với dữ liệu nhạy cảm khác. PII được thay thế bằng dữ liệu chính xác, nhưng không phải dữ liệu cá nhân.
* Xóa dữ liệu không liên quan đến bài kiểm tra của bạn.

Người thử nghiệm hoặc nhà phát triển có thể sao chép điều này vào môi trường thử nghiệm cá nhân của họ. Họ có thể sửa đổi nó theo yêu cầu của họ.
Quyền riêng tư là vấn đề chính trong dữ liệu sản xuất sao chép. Để khắc phục các vấn đề riêng tư, bạn nên xem xét dữ liệu thử nghiệm bị ẩn giấu và ẩn danh.

Để ẩn danh dữ liệu, có hai cách tiếp cận có thể được sử dụng:

* BlackList: Trong phương pháp này, tất cả các trường dữ liệu được giữ nguyên. Ngoại trừ những trường được chỉ định bởi người dùng.
* WhiteList: Theo mặc định, cách tiếp cận này, ẩn danh tất cả các trường dữ liệu. Ngoại trừ một danh sách các lĩnh vực được phép sao chép. Một trường trong danh sách trắng ngụ ý rằng việc sao chép dữ liệu là ổn và không cần phải ẩn danh.

Ngoài ra, nếu bạn đang sử dụng dữ liệu sản xuất, bạn cần phải thông minh về cách lấy dữ liệu nguồn. Truy vấn cơ sở dữ liệu bằng tập lệnh SQL là một cách tiếp cận hiệu quả.

## Quản lý môi trường thử nghiệm
Quản lý môi trường thử nghiệm liên quan đến việc bảo trì và bảo trì giường thử nghiệm.

Danh sách các hoạt động của chức năng quản lý môi trường thử nghiệm bao gồm:

1. Bảo trì một kho lưu trữ trung tâm với tất cả các phiên bản cập nhật của môi trường thử nghiệm.
2. Kiểm tra quản lý môi trường theo yêu cầu của nhóm thử nghiệm.
3. Theo yêu cầu mới tạo ra môi trường mới
4. Giám sát môi trường
5. Cập nhật / xóa môi trường kiểm tra lỗi thời
6. Điều tra các vấn đề về môi trường
7. Phối hợp cho đến khi giải quyết vấn đề.
![](https://images.viblo.asia/37c69600-c6a2-42a8-a3b7-e21aff527a64.jpg)


## Danh sách kiểm tra môi trường
###  Phần cứng
Kiểm tra xem thiết bị cần thiết để thử nghiệm có sẵn không? Nếu đây không phải là trường hợp, phân tích thời gian cung cấp!
Kiểm tra xem thiết bị ngoại vi có sẵn không? Chẳng hạn như máy quét, máy in đặc biệt, thiết bị cầm tay, vv

### Phần mềm / kết nối 
Là các ứng dụng cần thiết được chỉ định? Một ứng dụng như excel, word, bản vẽ, v.v. 
Đối với phần mềm mới, môi trường thử nghiệm có tồn tại cho tổ chức không? Có kinh nghiệm tổ chức với việc sử dụng và bảo trì phần mềm? 

### Dữ liệu môi trường
Kiểm tra xem các bộ dữ liệu thử nghiệm tiêu chuẩn có sẵn? Với bộ kiểm tra hồi quy, hãy xem xét quản trị Khiếm khuyết để thu thập dữ liệu kiểm tra.    
Các thỏa thuận với chủ sở hữu dữ liệu thử nghiệm về dữ liệu thử nghiệm có tồn tại không? Xem xét bảo trì chức năng.  

### Công cụ / quy trình bảo trì
Kiểm tra xem một điểm tiếp xúc duy nhất tồn tại để bảo trì môi trường thử nghiệm?Nếu không, hãy chuẩn bị một danh sách tất cả các thành viên có thể tham gia để duy trì môi trường thử nghiệm. Nó nên bao gồm thông tin liên lạc của họ là tốt.
Liệu thỏa thuận đạt được về sự sẵn sàng và chất lượng của môi trường thử nghiệm? Ví dụ: tiêu chí chấp nhận, yêu cầu bảo trì, v.v. Ngoài ra, hãy kiểm tra xem các thuộc tính chất lượng khác / bổ sung cho các môi trường có được thỏa thuận hay không.
Có phải tất cả các thành viên tham gia vào quá trình bảo trì đều được biết đến?

Bên cạnh đó, có một vài câu hỏi khác để trả lời trước khi thiết lập môi trường thử nghiệm.

* Có nên phát triển Môi trường thử nghiệm nội bộ hay thuê ngoài?
* Liệu có tuân theo tiêu chuẩn công ty nội bộ hay tuân theo bất kỳ Bên ngoài nào (IEE, ISO, v.v.) không?
* Bao lâu môi trường thử nghiệm được yêu cầu?
* Sự khác biệt giữa các hệ thống thử nghiệm và sản xuất và tác động của chúng đến hiệu lực thử nghiệm phải được xác định.
* Bạn có thể sử dụng lại một thiết lập hiện có cho các dự án khác trong công ty không?

## Những thách thức trong việc thiết lập Quản lý môi trường thử nghiệm
1. Lập kế hoạch phù hợp về sử dụng tài nguyên
Lập kế hoạch không hiệu quả cho việc sử dụng tài nguyên có thể ảnh hưởng đến đầu ra thực tế. Ngoài ra, nó có thể dẫn đến xung đột giữa các đội.

2. Môi trường từ xa
Có thể môi trường Test nằm cách nhau về mặt địa lý. Trong trường hợp như vậy, nhóm thử nghiệm phải dựa vào nhóm hỗ trợ cho các tài sản thử nghiệm khác nhau. (Phần mềm, phần cứng và các vấn đề khác).

3. Xây dựng thời gian thiết lập
Đôi khi, kiểm tra được thiết lập quá phức tạp trong các trường hợp Kiểm thử tích hợp .

4. Sử dụng chung theo nhóm
Nếu môi trường thử nghiệm được sử dụng bởi nhóm phát triển và thử nghiệm đồng thời, kết quả thử nghiệm sẽ bị hỏng.

5. Cấu hình thử nghiệm phức tạp
Một số thử nghiệm yêu cầu cấu hình môi trường thử nghiệm phức tạp. Nó có thể đặt ra một thách thức cho nhóm thử nghiệm.

## Thực hành tốt nhất để thiết lập Quản lý môi trường thử nghiệm
1. Hiểu các yêu cầu kiểm tra kỹ lưỡng và giáo dục các thành viên trong nhóm thử nghiệm.
2. Kết nối phải được kiểm tra trước khi bắt đầu thử nghiệm
3. Kiểm tra phần cứng và phần mềm cần thiết, giấy phép
4. Trình duyệt và phiên bản
5. Lập kế hoạch sử dụng theo lịch trình của môi trường thử nghiệm.
6. Công cụ tự động hóa và cấu hình của chúng.

## Test bed là gì?
Nói chung, một giường thử nghiệm là một môi trường phát triển phần mềm. Nó cho phép các nhà phát triển kiểm tra các mô-đun của họ mà không ảnh hưởng đến các máy chủ sản xuất trực tiếp. Giường thử nghiệm không chỉ giới hạn cho các nhà phát triển mà còn được sử dụng bởi những người thử nghiệm. Nó được gọi là một môi trường thử nghiệm là tốt.

Tóm tắt :

1. Môi trường thử nghiệm là thiết lập phần mềm và phần cứng mà nhóm thử nghiệm sẽ tiến hành thử nghiệm
2. Đối với môi trường thử nghiệm, một khu vực chính cần thiết lập bao gồm
* Hệ thống và ứng dụng
* Dữ liệu kiểm tra
* Máy chủ cơ sở dữ liệu
* Môi trường chạy front-end, v.v.
3. Vài thử thách trong khi thiết lập môi trường thử nghiệm bao gồm,
* Môi trường từ xa
* Sử dụng kết hợp giữa các đội
* Xây dựng thời gian thiết lập
* Lập kế hoạch không hiệu quả để sử dụng tài nguyên để tích hợp
* Cấu hình thử nghiệm phức tạp