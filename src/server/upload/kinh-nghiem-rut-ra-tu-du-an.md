*Hiện tại mình đang join 1 dự án và đang nằm trong giai đoạn test/fix bug. Mình join khi dự án được kickoff, tính ra thì có thể coi là từ đầu (Thực ra dự án đã lăn bánh từ đầu năm cơ, nhưng mãi tới giữa năm mới bắt đầu kickoff và bắt tay vào tìm hiểu hệ thống. Dự án của mình là chuyển một phần của hệ thống KH đang dùng sang theo kiểu Single Page App. Tình từ lúc bắt đầu vào tới giờ cũng đã 4 tháng, có rất nhiều vấn đề mình gặp phải và nghĩ nên ghi lại để làm kn cho những dự án tiếp theo.*

### 1> Không est khi chưa hiểu mình đang phải làm cái gì
Mình nhảy vào dự án và đc ném cho 1 cái wireframe và được yêu cầu est. Nói thật là đọc cái wireframe xong éo biết là cái gì luông và est vào mắt. Nhưng thôi, dí thì cứ est và cứ nghĩ nó ez nên est + buffer lên x3 (Vì cũng chưa rõ là cái gì nên cứ x3 cho chắc cú). Xong rồi cứ dựa vào est đó, các bề trên đưa người vào. Rồi bắt đầu tìm hiểu hệ thống, 1 tuần, 2 tuần rồi 3 tuần thì vỡ lẽ ra est sai mịa rồi. Cả team hiểu sai về cái phải làm, cứ nghĩ nó là làm mới nhưng thực ra là giống kiểu copy paste lại 1 cái đã có (Có chỉnh sửa tí tẹo). Lại hì hục est lại chứ còn sao nứa

### 2> Clear với Khách hàng về các tài liệu cần thiết
Được ông KH hào phóng ném cho một đống code to tổ bố trong đó chỉ có 1/10 code mình cần đọc, cộng thêm một đống tài liệu như một cái thư viện sách mà trong đó mình thực sự chỉ cần dùng có vài quyển thôi và phán một câu làm giống hệ thống của họ.  Cả team đã chủ quan và không clear rõ xem tài liệu, code nằm cụ thể ở đâu, cần focus vào những tài liệu nào và cứ húc đầu vào tìm hiểu. Sau khi tìm một hồi thì mệt mỏi vì mờ mắt cũng k rõ ở đâu. Xong cũng không báo sớm KH, 1 phần sợ KH chê kém. Và kết quả là giờ đây vẫn phải đi hỏi KH spec chưa biết, mỗi lần demo lại tòi thêm vài spec lạ hoắc đã có sẵn. Hự

### 3> Thiết kế hệ thống và dựa vào đó đánh giá tính khả quan của dự án, resource có phân bố đúng không
Sau khi mường tượng được hệ thống, bên mình dựng lên bản thiết kế hệ thống, từ đó nhìn vào thì nhận thấy phân bổ resource bị sai, team cần nhiều người thì lại ít, team ít người thì lại nhiều (Cái này cũng do est sai).

### 4> Khi bí trong tìm hiểu tài liệu, code thì nhờ KH support càng sớm càng tốt để hiểu hệ thống của họ
Thực sự thì có đọc với tìm hiểu code cũng chỉ hiểu đc 50% thôi, dùng hệ thống của họ thì mới giúp clear thêm. Trong khi hệ thống họ share thì toàn tiếng Nhật mà dev thì k biết tiếng Nhật, cứ loay hoay mò nhờ vào BrSE với comter. Hự. Sau đó, nhờ KH demo cho mới vỡ lẽ và hiểu nhanh hơn.

### 5> Tài liệu spec nên để QA làm, đừng cho ai làm ngoài QA
Mình làm vị trí dev nhưng vì khá thừa effort do mình trong team ít việc nên nhận làm thêm spec detail. Làm xong thì nhìn vào như 1 mớ hổ lốn, QA vào đọc rồi hỏi thì vỡ ra thiếu đầy spec. Hự. Tất nhiên nếu muốn học thì cũng đc nhưng nên có QA chỉ bảo

### 6> Khi cái gì chưa hiểu rõ, chỉ lờ mờ 70-80% thì tốt nhất nên confirm lại cho KH, đừng có đoán
Dự án mình có làm tính năng in tài liệu. Bên mình đọc tài liệu thì biết KH đã có sẵn tính năng xuất file pdf thì mng đoán rằng tính năng in là in file pdf kia và tặc lưỡi, ez. Nhưng đến lúc dự án sắp release bản Alpha thì mới biết là éo đơn giản nt, bên KH họ có cái máy in cầm tay, muốn in phải build cái app, code để đăng ký form rồi gọi api ghép vào cái form đó ra bản...bla bla và bên mình implement mất mịa 1 tháng cho cái đấy. Cái việc connect tới cái máy in cũng khoai chứ không ez như máy in thường.

### 7> Không nên dùng Docker kiểu thông thường cho production
Cái này hơi kiểu technical, Docker kiểu thông thường là cài Docker engine rồi chạy container. Kể cả có xử lý auto scale tốt. Vấn đề nằm ở chỗ khi một instance được bật lên thì mất 3 bước là start instance, start Docker rồi mới start app, risk sẽ tăng, thời gian để lên đc app cũng lâu hơn. Nếu dùng kiểu thông thường không có docker thì chỉ cần 2 bước thôi. Docker tốt thì nên dùng các service sẵn có từ AWS như ECS (nếu KH dùng dịch vụ của AWS)

### 8> Kết luận
Mình chỉ nhớ ngần nầy thôi đấy, note lại đây để nhớ những kinh nghiệm này cho những dự án tiếp theo. :)