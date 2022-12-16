### Vòng đời phát triển Game

`Tiền sản xuất`: Trong giai đoạn này, ý tưởng trò chơi, cốt truyện, tính năng, phân tích yêu cầu và tài liệu được thực hiện. Giai đoạn này bao gồm tài liệu thiết kế kỹ thuật và thông số kỹ thuật tính năng, kiến trúc trò chơi, lớp phủ khung, hoạt hình. Các mục sau đây được xem xét :

* Âm nhạc, Máy ảnh (phóng to và thu nhỏ, phát lại, xem điện ảnh,) thuộc tính trình phát và hành động
* Luồng logic trò chơi, Quy tắc và điều kiện để đạt được cấp độ tiếp theo
* Đối tượng & sự kiện kích hoạt, điểm số, chuyển động và định vị người chơi, thống kê người chơi,
* Trình tự không tương tác, Hiệu ứng đặc biệt, màn hình tiêu đề, hành động đa nút
* Tay chơi game, clip phim, hiệu ứng sốc / rung, văn bản pháp lý, sử dụng các chức năng của nút, sử dụng chế độ analog & kỹ thuật số.
![](https://images.viblo.asia/4b2ec504-e481-4379-bd48-8ccbcc0c50e8.png)

`Sản xuất:` . Giai đoạn này bao gồm mã hóa, tích hợp các mô-đun khác nhau.

`Kiểm thử và triển khai:` Ở giai đoạn này chúng ta thực hiển kiểm thử chức năng, kiểm thử hồi quy, Alpha, Beta  Kiểm tra phạm vi và lưu lượng, tính toàn vẹn dữ liệu, kiểm tra cụ thể thuật toán, kiểm tra đường dẫn, kiểm tra gia tăng cũng được thực hiện.

Trong hướng dẫn này, bạn sẽ được giới thiệu về :
* Vòng đời của phát triển game
* Kiểm thử game với Kiểm thử phần mềm khác như thế nào.
* Các loại thử nghiệm game
* Chơi game hỗ trợ sử dụng công nghệ thích ứng
* Số liệu game mà một người thử nghiệm nên biết.
* Rủi ro chính trong thử nghiệm game

###  Kiểm thử Game khác với Kiểm thử phần mềm khác như thế nào.
Thử nghiệm game là một quá trình lặp đi lặp lại mỗi bản build mới có thể có lỗi và phải được kiểm tra kỹ lưỡng.

Tất cả các thử nghiệm game tuân theo một cấu trúc cơ bản bất kể kích thước của trò chơi và thời gian cần thiết để sản xuất Game

Chuyên nghiệp đảm bảo chất lượng, cần nghiên cứu các quy tắc và yêu cầu của trò chơi. Hiểu kiến trúc thành phần trò chơi tổng thể và kiến ​​trúc tệp, luồng và cấu trúc tệp và các phụ thuộc liên quan đến trò chơi. Với mỗi nguyên mẫu mới của trò chơi, các tài liệu thử nghiệm cần phải được xem lại thường xuyên để cập nhật mọi thay đổi về thông số kỹ thuật, trường hợp thử nghiệm mới và hỗ trợ cấu hình mới. Người kiểm tra cần đảm bảo rằng không có vấn đề mới nào được đưa ra.

Công việc của một Game Tester bao gồm:

* Phân loại các yêu cầu dựa trên mục đích dự định và đối tượng mục tiêu.
* Xác định yêu cầu của người dùng , hệ thống và nên được phân loại thành các yêu cầu  chức năng, phi chức năng
* Xác định các mục có thể kiểm thử, các mục không thể kiểm thử, các mục tiêu và biện pháp cho các yêu cầu chức năng và phi chức năng
* Kiểm tra xem các yêu cầu chức năng có đầy đủ, nhất quán và dễ hiểu không
* Xác định các yêu cầu tùy biến, các yêu cầu xung đột
* Xác định các yêu cầu phụ thuộc lẫn nhau.
* Ưu tiên các yêu cầu dựa trên tính độc đáo, phức tạp, quan trọng
* Xác định chủ đề của Game, Nhân vật, Hoạt hình, AI, Điện ảnh, Chế độ xem camera, lối chơi

### Các loại kiểm thử Game

1) Kiểm thử chức năng
Người QA thực hiện tìm kiếm các vấn đề trong game hoặc giao diện và đồ họa người dùng của game, chẳng hạn như các vấn đề cơ học , vấn đề ổn định và tính toàn vẹn tài sản. Kiểm tra giao diện người dùng, đảm bảo tính thân thiện với người dùng của game

Ví dụ: Kiểm tra màu sắc và hình nền, cấu trúc menu, hướng màn hình và độ phân giải màn hình, kích thước phông chữ, lỗi căn chỉnh, khả năng sử dụng, điều hướng hệ thống như thời gian tải, thời gian chờ và hiển thị, sắp xếp, thông báo xác nhận, trình tự, hoạt hình và các yếu tố âm thanh của trò chơi, hướng dẫn và tin nhắn đối thoại. Tương tác người dùng, Giao diện người dùng, Kiểm tra giao dịch, Kiểm tra hiệu chuẩn và độ chính xác của camera điện thoại di động, Độ phân giải màn hình, Kiểm tra thiết kế đáp ứng di động, Kiểm tra chất lượng âm thanh

2) Kiểm tra tương thích
Kiểm tra xem trò chơi có tương thích trên các thiết bị khác nhau không và trên các cấu hình khác nhau của phần cứng và phần mềm.

Ví dụ: Cài đặt và Gỡ cài đặt trò chơi trên tất cả các bảng điều khiển / máy tính để bàn / điện thoại di động được hỗ trợ.

3) Kiểm tra hiệu suất
Kiểm tra hiệu suất tổng thể của game . Điều chỉnh hiệu suất được thực hiện để tối ưu hóa tốc độ trò chơi.

Các tham số quan trọng được kiểm tra trong quá trình kiểm tra hiệu suất
Thời gian đáp ứng trên máy khách và máy chủ, Thời gian hoàn thành giao dịch, Hiệu suất tải tối đa, Tuổi thọ, vùng phủ sóng, Rò rỉ bộ nhớ, bộ nhớ thấp, pin yếu, Thời gian tải xuống ứng dụng, truy cập đồng thời (Nhiều người dùng) vào máy chủ của ứng dụng, tốc độ, thông lượng, độ tin cậy, khả năng mở rộng, ...
Tiêu thụ pin và hiệu suất đồ họa: Đo mức tiêu thụ pin của trò chơi di động. Tiêu thụ pin phải tối ưu trong nhiều giờ và phản hồi của trò chơi phải thỏa đáng trong các mức tải nặng khác nhau trên các thiết bị khác nhau
Hạn chế của bộ xử lý và bộ nhớ: Bộ đếm hiệu suất được sử dụng để đo mức tiêu thụ CPU và bộ nhớ của ứng dụng.
Kết nối mạng: Đo thời gian phản hồi của các trò chơi di động trên các loại mạng khác nhau (Wi-Fi, 2G, 3G, 4G), Nó cung cấp cái nhìn tổng thể về mức độ hiệu quả của trò chơi trên các mạng không đáng tin cậy. Nó cũng kiểm tra kết nối giữa các thiết bị di động, trung tâm dữ liệu hoặc đám mây. Toàn bộ Thời gian Đỉnh, Kết nối Jittery, Sao chép dữ liệu, Mất gói, Phân mảnh dữ liệu được theo dõi.
Thử nghiệm hiệu năng trò chơi, đặc biệt là MMO

4) Kiểm tra sự phù hợp / tuân thủ
Tuân thủ nguyên tắc thị trường (ví dụ: chính sách của Apple App Store), Tuân thủ chính sách doanh nghiệp (ví dụ: nội dung bị cấm. Tuân thủ cũng có thể đề cập đến các cơ quan quản lý như PEGI và ESRB. Trò chơi nhắm mục tiêu xếp hạng nội dung cụ thể. Nếu có nội dung phản cảm Không phù hợp với xếp hạng mong muốn, sau đó chúng được xác định và báo cáo. Ngay cả một vi phạm trong việc đệ trình phê duyệt giấy phép có thể khiến trò chơi bị từ chối, phát sinh thêm chi phí trong thử nghiệm và gửi lại.

Ví dụ: Nếu trò chơi sẽ được xuất bản ở các nước châu Âu, hãy thử nghiệm chuyển đổi PAL nếu trò chơi được sản xuất cho Bắc Mỹ, thử nghiệm chuyển đổi NTSC.

5) Thử nghiệm bản địa hóa
Thử nghiệm bản địa hóa trở nên thiết yếu quan trọng khi một trò chơi được nhắm mục tiêu cho thị trường toàn cầu. Tiêu đề trò chơi, nội dung và văn bản cần được dịch và thử nghiệm với các thiết bị bằng nhiều ngôn ngữ. Các loại thử nghiệm này có thể được thực hiện nhanh chóng (với sự trợ giúp của truy cập thiết bị dựa trên đám mây và tự động hóa thử nghiệm).

Ví dụ: Cần bản địa hóa cụ thể cho khu vực MENA (Trung Đông / Bắc Phi), bản địa hóa tiếng Ả Rập (Hỗ trợ văn bản từ phải sang trái, hiển thị hai hướng), thử nghiệm bản địa hóa giả, ký tự hai byte (cho các ngôn ngữ Đông Á), địa phương thời gian / ngày, tiền tệ, định dạng địa chỉ và các yêu cầu địa phương khác.

6) Ngâm thử
Thử nghiệm này liên quan đến việc để trò chơi chạy trong một thời gian dài trong các chế độ hoạt động khác nhau. Ví dụ, không hoạt động đã tạm dừng hoặc ở màn hình tiêu đề. Ngâm có thể xác định rò rỉ bộ nhớ hoặc lỗi làm tròn.

Ví dụ: Trò chơi đã bắt đầu và nhân vật được tạo ra để đứng yên trong 24 giờ. Kỹ thuật này được sử dụng để phát hiện các sự cố do rò rỉ bộ nhớ và các lỗi khác trong công cụ trò chơi.

7) Kiểm thử phục hồi
Trong phần mềm, kiểm thử khôi phục ứng dụng có thể được phục hồi tốt như thế nào từ sự cố, lỗi phần cứng và các lỗi tương tự khác. Ứng dụng buộc phải thất bại, và sau đó nó sẽ được quan sát cách nó phục hồi từ các điều kiện thất bại và môi trường.

Ví dụ: Trong khi ứng dụng chơi trò chơi đang chạy, đột nhiên khởi động lại bàn điều khiển trò chơi và kiểm tra tính hợp lệ của dữ liệu

8) Kiểm tra bảo mật
Nó được thực hiện để kiểm tra mức độ an toàn của phần mềm hoạt động khỏi các mối đe dọa bên ngoài. Bảo vệ dữ liệu khỏi các mối đe dọa bên ngoài, hạn chế truy cập hệ thống không được kiểm soát, vi phạm dữ liệu, hệ điều hành, hệ thống truyền thông và các thuật toán mã hóa yếu.

Ví dụ: Thay đổi URL từ / đăng nhập thành / chơi trên trang web chơi trò chơi không được phép truy cập trực tiếp vào các trò chơi.

9) Thử nghiệm trò chơi khác
Thử nghiệm các nhân vật thật hay ảo. Trong các trò chơi video nhiều người chơi, kết nối với máy chủ và đồng bộ hóa trạng thái trò chơi là hai lĩnh vực quan trọng cần được kiểm tra.

Ví dụ: Trò chơi đua xe 3D nhiều người chơi.

Thử nghiệm các tính năng mới như cập nhật trạng thái trò chơi, lời mời kết bạn, chia sẻ quà tặng cao cấp, v.v ... Điều này đảm bảo trải nghiệm chơi game phong phú cho người dùng.

Ví dụ: Facebook, Blog

Kiểm tra âm thanh
Kiểm tra nếu có lỗi trong việc tải các tệp, nghe các tệp âm thanh để tìm lỗi hoặc biến dạng, trình lược tả CC để phân tích bình luận màu
Cơ sở dữ liệu và thống kê trò chơi
Xác minh cơ sở dữ liệu bằng cách sử dụng gỡ lỗi để điều tra nếu trò chơi đang sử dụng dữ liệu chính xác. Đảm bảo rằng dữ liệu được tải đúng nơi và hiển thị thông tin chính xác

### Kiểm tra hộp trắng
White Box tests for Games tập trung vào các khía cạnh kiến trúc, tích hợp và hệ thống của trò chơi di động.

* Kiểm tra mã: Mã nguồn được xem xét, Logic chương trình & các lỗi lập trình phổ biến, việc tuân thủ các tiêu chuẩn mã hóa được phân tích.
* Kiểm tra tập trung: Các chuỗi mã được đưa đến các mô-đun bị cô lập và đầu ra được phân tích.
* Phân tích dữ liệu: Việc sử dụng, giải thích và thao tác dữ liệu được phân tích và xác nhận cho các mô-đun khác nhau.
* Kiểm tra đường dẫn và dòng chảy: Trình tự chính xác của các đối tượng được thực thi.
* Kiểm tra cụ thể theo thuật toán: Kiểm tra một kịch bản hoặc tính năng trò chơi cụ thể bằng cách đặt các biến dữ liệu, giá trị dữ liệu cho mã và thực thi nó trong môi trường thời gian chạy.
* Phân tích trí tuệ nhân tạo: Thống kê chạy các bước di chuyển và phát có thể lập trình của thành phần AI được tạo ra. Kết quả được xác nhận để kiểm tra xem tất cả các di chuyển có thể lập trình được sử dụng. Ví dụ: nắm bên trên ván trượt tuyết và chơi (cú đấm / đá kết hợp trong hành động đa chiều) được sử dụng.

### Chơi game hỗ trợ sử dụng công nghệ thích ứng
Trò chơi hỗ trợ còn được gọi là trò chơi tiếp cận. Các tính năng được thiết kế sử dụng công nghệ thích ứng cho những người khuyết tật khác nhau như thị lực kém, mờ mắt, mù lòa, không có khả năng phân biệt màu sắc, lời nói, thính giác, suy giảm nhận thức, vận động và vận động.

Cardinal Direction (CD), Tower of London (TOL) là hai trò chơi phổ biến đã được sửa đổi cho người dùng bị thách thức trực quan. Trong các trò chơi này, kích thích thị giác được thay thế bằng đầu vào âm thanh.

Một người kiểm tra cần lưu ý những điều sau trong khi thử nghiệm một trò chơi như vậy

* Các màu sẽ nhấp nháy theo một mẫu và các tông màu sẽ phát cho từng màu.
* Mỗi màu nên được đi kèm với một âm thanh nghe được.
* Dữ liệu trực quan cần được mô tả bằng từ ngữ để người khiếm thị không phải đối mặt với bất kỳ vấn đề nào nhận được thông qua việc sử dụng trình đọc màn hình.
* Người chơi nên nghe âm thanh trong trò chơi theo ba chiều và phải điều hướng từ bằng cách sử dụng Âm thanh 3D và Âm thanh không gian trên màn hình cảm ứng

###  Số liệu trò chơi mà một người thử nghiệm nên biết.
`DAU / MAU` (Người dùng hoạt động hàng ngày / người dùng hoạt động hàng tháng): Tỷ lệ người dùng hoạt động chơi mỗi ngày so với số người dùng hoạt động hàng tháng. Cũng thường được gọi là các yếu tố dính.

Phiên: Mỗi khi bất kỳ người dùng nào mở ứng dụng, sẽ được tính là một phiên. Ở đây tập trung vào số phiên trung bình trên mỗi DAU.

`Xếp hạng tải xuống`: Thứ hạng của một trò chơi trong một cửa hàng ứng dụng cụ thể (iOS, Android Play) theo lượt tải xuống trò chơi hàng tháng.

`Duy trì: `Số liệu rất quan trọng trong một trò chơi miễn phí. Để tính toán duy trì, hãy tách người dùng thành các nhóm dựa trên ngày ứng dụng được tải xuống.

`Chỉ số hiệu suất`: Đây là để theo dõi hiệu suất của các trò chơi trực tuyến hoặc các trò chơi liên tục. Tốc độ khung hình mà trò chơi thực thi trên nền tảng phần cứng máy khách hoặc trong trường hợp máy chủ trò chơi, độ ổn định và hiệu suất của trò chơi có thể được sử dụng để theo dõi các tính năng và cập nhật thay đổi.

### Rủi ro chính trong thử nghiệm trò chơi
1. Trò chơi không tạo ra trải nghiệm hấp dẫn cho đối tượng mục tiêu.
2. Trò chơi không có thiết kế lấy người chơi làm trung tâm
3. Yếu tố thú vị và lối chơi gây nghiện còn thiếu trong các trò chơi.
4. Trò chơi không độc đáo, cạnh tranh, nhịp độ nhanh.
5. Trò chơi thất bại vì các vấn đề kỹ thuật, tính năng bị hỏng, lỗi nghiêm trọng, âm nhạc tệ và video kém.
6. Chi phí phát triển trò chơi vượt quá ngân sách
7. Trò chơi nên có thiết kế thẩm mỹ và lối chơi đơn giản .

### Tóm lược:
* Vòng đời phát triển trò chơi bao gồm ba giai đoạn Tiền sản xuất, sản xuất, thử nghiệm và triển khai
* Kiểm thử trò chơi là một quá trình lặp đi lặp lại mỗi bản dựng mới có thể có lỗi và do đó, nó phải được kiểm tra kỹ lưỡng
* Các loại kiểm thử  khác nhau là 1) Kiểm thử chức năng, 2) Kiểm thử tính tương thích, 3) Kiểm thử hiệu năng, 4) Kiểm tra sự phù hợp / tuân thủ 5) Kiểm thử bản địa hóa, 6) Thử nghiệm ngâm, 7) Kiểm thử  khôi phục, 8) Kiểm thử bảo mật
* Kiểm thử hộp trắng cho các trò chơi tập trung vào các khía cạnh kiến trúc, tích hợp và hệ thống của trò chơi di động bao gồm 1) kiểm tra mã 2) kiểm tra tập trung 3) Phân tích dữ liệu 4) Kiểm tra đường dẫn và lưu lượng 5) Kiểm tra thuật toán cụ thể 6) Phân tích trí thông minh nhân tạo
* Trò chơi hỗ trợ còn được gọi là trò chơi tiếp cận. Các tính năng được thiết kế bằng công nghệ thích ứng cho cá nhân
* Một số số liệu trò chơi quan trọng là DAU / MAU, Phiên, Xếp hạng tải xuống, Duy trì và Số liệu hiệu suất
* Rủi ro chính của thử nghiệm trò chơi là nó không tạo ra trải nghiệm hấp dẫn cho đối tượng mục tiêu

Nguồn :https://www.guru99.com/game-testing-mobile-desktop-apps.html#1