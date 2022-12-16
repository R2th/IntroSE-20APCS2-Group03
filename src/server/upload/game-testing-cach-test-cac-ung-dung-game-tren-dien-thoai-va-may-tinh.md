Bản thân cũng đã từng kiểm thử một số ứng dụng Web và Mobile nhưng chưa bao giờ kiểm thử 1 ứng dụng Game nào (mặc dù chơi Game khá nhiều :D), nên khi bắt gặp chủ đề này mình vừa có chút mơ hồ, tò mò, vừa háo hức muốn bắt tay vào tìm hiểu ngay. Muốn kiểm thử được ứng dụng game thì trước hết chúng ta hãy cùng nhau tìm hiểu:

### Vòng đời phát triển ứng dụng Game

![](https://images.viblo.asia/ff09cf38-9f0b-4f49-836d-d5d33a2e9abe.png)

**Giai đoạn trước khi thành phẩm (Pre- Production) :**
Đây là giai đoạn lên ý tưởng Game, lập storyboard (bảng phân cảnh - một chuỗi các bản vẽ, kịch bản, câu thoại ...), xác định các tính năng, phân tích yêu cầu, lập tài liệu. Giai đoạn này bao gồm tài liệu thiết kế kỹ thuật và các đặc tả tính năng, kiến trúc game, lớp phủ khung hình (frame overlay), hoạt ảnh (animation). Các mục sau đây được quan tâm:
* Âm nhạc, Máy ảnh (phóng to và thu nhỏ, phát lại, xem kiểu điện ảnh), các thuộc tính của trình phát (player) và hành động.
* Luồng logic Game, quy tắc chơi và điều kiện để đạt được cấp độ tiếp theo.
* Trình kích hoạt đối tượng và sự kiện, điểm số, chuyển động và vị trí của người chơi, thống kê người chơi, chuỗi không tương tác, hiệu ứng đặc biệt, màn hình tiêu đề, các tác vụ nhiều nút.
* Gamepad, movie clip, hiệu ứng sốc / rung, văn bản pháp lý, sử dụng các nút chức năng, sử dụng chế độ analog và kỹ thuật số.

**Giai đoạn thành phẩm (Production) :**
Trong giai đoạn này, việc coding được thực hiện. Bao gồm : coding (viết mã), tích hợp các modul khác nhau.

**Giai đoạn Testing và Deployment :**
Trong giai đoạn này Kiểm thử chức năng, Kiểm thử hồi quy, Kiểm thử Alpha, Beta, Gold được thực hiện. Kiểm thử độ bao phủ và luồng, tính toàn vẹn dữ liệu, thử nghiệm thuật toán cụ thể, kiểm tra đường dẫn, thử nghiệm gia tăng cũng được thực hiện.

### Kiểm thử Game khác với Kiểm thử những phần mềm khác như thế nào?

![](https://images.viblo.asia/a3fbfb69-1e6c-4420-867f-465e719d3564.JPG)

Kiểm thử Game là một quá trình lặp đi lặp lại, mỗi bản build mới đều có thể có lỗi nên cần được kiểm tra đầy đủ kỹ lưỡng.

Tất cả thử nghiệm game đều theo một cấu trúc cơ bản bất kể quy mô của game và thời gian cần thiết để sản xuất ra game đó.

QA cần nghiên cứu các quy tắc và yêu cầu của game. Hiểu kiến trúc tổng thể của thành phần game, kiến trúc tệp, luồng, cấu trúc tệp và các phụ thuộc liên quan đến game. Với mỗi mẫu thử nghiệm mới của game, cần thường xuyên xem xét lại các tài liệu kiểm tra để cập nhật bất kỳ thay đổi nào về thông số kỹ thuật, các trường hợp thử nghiệm mới và hỗ trợ cấu hình mới. Người thử nghiệm phải đảm bảo rằng không có vấn đề mới nào được phát sinh.

1 Tester game cần :
* Phân loại các yêu cầu dựa trên mục đích dự định và đối tượng mục tiêu.
* Xác định yêu cầu của người dùng và hệ thống, nên phân loại thành các yêu cầu : chức năng, phi chức năng, miền.
* Xác định các mục có thể kiểm tra, các mục không thể kiểm tra, mục tiêu và các biện pháp cho các yêu cầu chức năng và phi chức năng.
* Kiểm tra xem các yêu cầu chức năng có hoàn chỉnh, nhất quán và dễ hiểu không.
* Xác định các yêu cầu tùy chỉnh, các yêu cầu bị xung đột.
* Xác định các yêu cầu phụ thuộc lẫn nhau.
* Xác định độ ưu tiên cho các yêu cầu dựa trên tính duy nhất, độ phức tạp, và mức độ nghiêm trọng.
* Xác định chủ đề của game, nhân vật, hoạt cảnh (Animation), AI, chuyển động hình ảnh, chế độ xem máy ảnh, gameplay ...

![](https://images.viblo.asia/a8a3d5f6-7a47-4ff4-abd3-519b6acfd615.png)

### Các loại Kiểm thử Game

![](https://images.viblo.asia/efe16e90-3f9c-4702-912b-ba34743d83d5.jpg)

**1. Kiểm thử chức năng**

Người kiểm thử chức năng tìm kiếm các vấn đề chung trong game hoặc giao diện người dùng và đồ họa của nó, chẳng hạn như các vấn đề về : logic game, vận hành game, các vấn đề về tính ổn định và tính toàn vẹn nội dung game. Kiểm tra giao diện người dùng đảm bảo sự thân thiện với người dùng.

Ví dụ: Kiểm tra màu sắc và hình nền, cấu trúc menu, hướng màn hình và độ phân giải màn hình, kích thước phông chữ, lỗi liên kết, khả năng sử dụng, điều hướng hệ thống như : thời gian tải, thời gian chờ và hiển thị, sắp xếp, các thông báo xác nhận, trình tự, hoạt ảnh và các yếu tố âm thanh , hướng dẫn và tin nhắn đối thoại. Tương tác người dùng, Giao diện người dùng, Kiểm tra giao dịch, Kiểm tra hiệu chuẩn và độ chính xác của máy ảnh, Độ phân giải màn hình, Kiểm tra tính đáp ứng thiết kế trên thiết bị di động, Kiểm tra chất lượng âm thanh ...

**2. Kiểm tra khả năng tương thích**

Kiểm tra xem game có tương thích trên các thiết bị khác nhau hay không và tính tương thích trên các cấu hình phần cứng và phần mềm khác nhau.

Ví dụ: Cài đặt và Gỡ cài đặt game trên tất cả các bàn điều khiển (consoles) / máy tính / điện thoại di động được hỗ trợ.

**3. Kiểm thử hiệu năng**

Kiểm tra hiệu suất tổng thể của game. Thực hiện điều chỉnh hiệu suất để tối ưu hóa tốc độ của game.

**Những thông số quan trọng được kiểm tra trong suốt quá trình kiểm thử hiệu năng:**

* Thời gian đáp ứng trên máy khách (client) và máy chủ (server), thời gian hoàn thành giao dịch, hiệu suất tải tối đa, tuổi thọ, độ bao phủ mạng, rò rỉ bộ nhớ, chạy trong điều kiện bộ nhớ thấp, chạy trong điều kiện pin yếu, thời gian thực hiện để tải xuống ứng dụng, nhiều người dùng truy cập đồng thời vào máy chủ của ứng dụng, test tốc độ, thông lượng, độ tin cậy, khả năng mở rộng, v.v...
* **Mức tiêu thụ pin và hiệu suất đồ họa** : Đo mức tiêu thụ pin của game trên thiết bị di động. Mức tiêu thụ pin phải tối ưu trong thời gian dài và phản hồi game phải đạt yêu cầu dưới các tải nặng khác nhau trên các thiết bị khác nhau
* **Các ràng buộc bộ xử lý và bộ nhớ** : Các bộ đếm hiệu suất được sử dụng để đo mức tiêu thụ CPU và bộ nhớ của ứng dụng.
* **Kết nối mạng** : Đo thời gian phản hồi của các game trên di động trên các loại mạng khác nhau (Wi-Fi, 2G, 3G, 4G), nhằm cung cấp thông tin tổng thể về mức độ hiệu quả của game trên các mạng không đáng tin cậy. Nó cũng kiểm tra kết nối giữa các thiết bị di động, trung tâm dữ liệu hoặc đám mây. Toàn bộ thời gian cao điểm, kết nối dữ dội, sao chép dữ liệu, mất gói, phân mảnh dữ liệu được theo dõi.
* Thử nghiệm hiệu suất game đặc biệt là MMO

**4. Kiểm thử tuân thủ**

Tuân thủ nguyên tắc thị trường (ví dụ: chính sách của Apple App Store ...), tuân thủ chính sách doanh nghiệp (ví dụ: các nội dung bị cấm ...). Tuân thủ cũng có thể liên quan đến các cơ quan quản lý như PEGI và ESRB. Nếu có nội dung phản cảm không phù hợp với các tiêu chí chuẩn, thì chúng sẽ bị report. Ngay cả một vi phạm nhỏ duy nhất trong việc đệ trình phê duyệt giấy phép cũng có thể khiến game bị từ chối, gây mất thời gian và phát sinh chi phí bổ sung trong việc kiểm tra và gửi lại ...

Ví dụ: Nếu muốn xuất bản game ở các quốc gia Châu Âu thì phải thử nghiệm theo chuẩn PAL, còn nếu muốn xuất bản game ở Bắc Mỹ thì phải thử nghiệm theo chuẩn NTSC.

**5. Kiểm thử Localization**

Kiểm thử Localization là quan trọng nếu game được nhắm mục tiêu cho thị trường toàn cầu. Tiêu đề, nội dung và văn bản game cần được dịch và kiểm thử với các thiết bị bằng nhiều ngôn ngữ. Các loại kiểm tra này có thể được thực hiện nhanh chóng (với sự trợ giúp của trình truy cập thiết bị dựa trên đám mây và kiểm thử tự động).

Ví dụ: Localization (bản địa hóa) ngoài các ngôn ngữ phổ biến thì còn cần cụ thể cho vùng MENA (Trung Đông / Bắc Phi), bản địa hóa tiếng Ả Rập (Hỗ trợ văn bản từ phải sang trái, Hiển thị hai hướng), ký tự 2 byte (dành cho ngôn ngữ Đông Á), ngày/giờ của từng vùng, đơn vị tiền tệ, định dạng địa chỉ và các yêu cầu khác của từng địa phương ...

**6. Soak testing**

Thử nghiệm này liên quan đến việc rời khỏi game đang chạy trong một thời gian dài ở các chế độ hoạt động khác nhau. Ví dụ: set trạng thái tạm dừng không hoạt động cho game (pause) hoặc dừng luôn ở màn hình tiêu đề... Soak testing có thể xác định các lỗi rò rỉ bộ nhớ hoặc các lỗi xung quanh.

Ví dụ: Trò chơi đã bắt đầu và nhân vật được đặt ở chế độ chờ trong 24 giờ. Kỹ thuật này được sử dụng để phát hiện các sự cố do bộ nhớ bị rò rỉ và các lỗi khác trong game.

**7. Kiểm thử phục hồi**

Trong phần mềm, kiểm thử phục hồi được dùng để kiểm tra xem khả năng phục hồi của ứng dụng như thế nào từ các sự cố, lỗi phần cứng và các lỗi tương tự khác. Trong loại kiểm thử này, ứng dụng buộc phải thất bại, và sau đó quan sát ứng dụng phục hồi như thế nào trong các điều kiện thất bại và môi trường trên.

Ví dụ: Trong khi ứng dụng game đang chạy, hãy đột ngột khởi động lại bảng điều khiển game và kiểm tra tính hợp lệ của dữ liệu ...

**8. Kiểm thử bảo mật**

Được thực hiện để kiểm tra xem độ an toàn của phần mềm như thế nào khi hoạt động trong các mối đe dọa từ bên ngoài. Bảo vệ dữ liệu khỏi các mối đe dọa từ bên ngoài, các hạn chế truy cập hệ thống không kiểm soát được, vi phạm dữ liệu, hệ điều hành có lỗ hổng, hệ thống truyền thông ﬂaws (có lỗ hổng) và các thuật toán mã hóa yếu.

Ví dụ: Thay đổi URL từ ```/login``` thành ```/play``` ở chỗ nhập URL trên trang web thì không được cho phép truy cập trực tiếp vào trò chơi (mà không đăng nhập).

**9. Các kiểm thử khác**

Kiểm tra các nhân vật là thực hay ảo. Trong các game nhiều người cùng chơi, khả năng kết nối với máy chủ và đồng bộ hóa trạng thái là hai lĩnh vực quan trọng cần được kiểm tra.
Ví dụ: Trò chơi đua xe 3D có nhiều người cùng chơi.

Thử nghiệm các tính năng mới như cập nhật trạng thái trò chơi, lời mời kết bạn, chia sẻ quà tặng cao cấp, v.v. Điều này đảm bảo trải nghiệm phong phú khi chơi game cho người dùng.
Ví dụ: Game trên Facebook, Blog ...

**Sound Testing** : Kiểm tra xem liệu có lỗi trong khi tải các tệp tin, nhận diện các tập tin có lỗi hoặc biến dạng, CC vào hồ sơ để phân tích các chú thích lỗi.

**Thống kê cơ sở dữ liệu và game**
Xác minh cơ sở dữ liệu bằng cách sử dụng trình gỡ lỗi để điều tra xem trò chơi có đang sử dụng dữ liệu chính xác hay không. Phải đảm bảo rằng dữ liệu được tải ở đúng nơi và hiển thị thông tin chính xác.

**White-box testing**

Kiểm thử hộp trắng cho Game tập trung vào các khía cạnh kiến trúc, tích hợp và hệ thống của game dành cho thiết bị di động.

1. **Kiểm tra mã** : Kiểm tra mã nguồn, phân tích các lỗi logic chương trình và các lỗi lập trình phổ biến, kiểm tra sự tuân thủ các tiêu chuẩn mã hóa.
2. **Focus Testing** : Các đoạn mã được nạp vào các mô-đun riêng và phân tích đầu ra.
3. **Phân tích dữ liệu** : Phân tích và xác thực : dữ liệu được sử dụng, giải thích (ghi chú) và thao tác cho các mô-đun khác nhau.
4. **Kiểm tra đường dẫn (path) và luồng (flow)** : Thực hiện đúng trình tự các đối tượng.
5. **Thử nghiệm thuật toán cụ thể** : Thử nghiệm một kịch bản hoặc tính năng game cụ thể bằng cách thiết lập các biến dữ liệu, giá trị dữ liệu và thực thi mã trong môi trường cụ thể (local ...).
6. **Phân tích trí tuệ nhân tạo** : Thống kê các chuyển động có thể lập trình và lượt phát của thành phần AI được tạo ra. Kết quả được xác nhận để kiểm tra xem tất cả các chuyển động có thể lập trình có được sử dụng hay không.
Ví dụ: kẹp bên trên ván trượt tuyết và lượt chơi (kết hợp cú đấm / đá trong hành động đa chiều) được sử dụng.

### Assistive gaming (Game có sự hỗ trợ) bằng cách sử dụng công nghệ thích ứng

![](https://images.viblo.asia/bc472cb7-b4be-4604-9ec4-b8861187940e.png)

Assistive Gaming còn được gọi là game trợ năng. Các tính năng được thiết kế sử dụng công nghệ thích ứng dùng cho những người chơi có khuyết tật khác nhau như thị lực kém, thị lực mờ, mù, không thể phân biệt màu sắc, lời nói, thính giác, nhận thức, động cơ và suy giảm khả năng vận động.

Ví dụ : Cardinal Direction (CD), Tháp London (TOL) là hai trò chơi phổ biến đã được chỉnh sửa để phù hợp với những người dùng khiếm thị. Trong các trò chơi này, kích thích trực quan thị giác được thay thế bằng đầu vào âm thanh ...

Những lưu ý trong khi kiểm thử một trò chơi như vậy:
* Các màu sẽ nhấp nháy trong 1 pattern và các tông màu sẽ phát cho từng màu.
* Mỗi màu phải kèm theo 1 loại âm thanh.
* Dữ liệu hình ảnh cần phải được mô tả bằng các từ để người khiếm thị không gặp phải bất kỳ vấn đề nào khi tiếp nhận thông tin thông qua việc sử dụng trình đọc màn hình.
* Người chơi sẽ nghe thấy âm thanh trong game theo ba chiều và phải điều hướng từ bằng cách sử dụng âm thanh 3D và âm thanh không gian khi cảm ứng với màn hình.

### Các số liệu game mà một người kiểm thử nên biết

**DAU/MAU (Daily active users/monthly active users):** Là tỷ lệ số lượng người dùng hoạt động mỗi ngày so với số lượng người dùng hoạt động hàng tháng.

**Session - Phiên :** Mỗi lần bất kỳ người dùng nào mở ứng dụng, được tính là một phiên. Ở đây, trọng tâm là số phiên trung bình trên mỗi DAU (số lượng phiên trung bình trong 1 ngày)

**Xếp hạng theo lượt Download :** Xếp hạng của một trò chơi trong Cửa hàng ứng dụng cụ thể (iOS, Android Play) theo lượt tải xuống trò chơi hàng tháng.

**Duy trì:** Chỉ số rất quan trọng trong các trò chơi miễn phí. Để tính toán tỷ lệ giữ chân (người dùng), hãy tách người dùng thành các nhóm thuần dựa vào ngày ứng dụng được tải xuống.

**Chỉ số hiệu suất:** Để theo dõi hiệu suất của trò chơi trực tuyến hoặc trò chơi liên tục. Tốc độ khung hình mà trò chơi thực thi trên nền tảng phần cứng của khách hàng hoặc trong máy chủ của game, các chỉ số hiệu suất và độ ổn định có thể được sử dụng để theo dõi các tính năng thay đổi và cập nhật thay đổi này.

### Các rủi ro chính trong Game Testing

1. Game không tạo ra trải nghiệm hấp dẫn cho đối tượng được hướng đến.
2. Game không có thiết kế tập trung vào người chơi.
3. Yếu tố thú vị và lối chơi gây nghiện bị thiếu trong game.
4. Game không độc đáo, cạnh tranh, nhịp độ nhanh.
5. Game không thành công do các vấn đề kỹ thuật, tính năng bị hỏng, lỗi nghiêm trọng, âm nhạc xấu và video kém.
6. Chi phí phát triển Game vượt quá ngân sách
7. Game nên có thiết kế thẩm mỹ và lối chơi đơn giản.

### Lời kết
Bài dịch từ nguồn : https://www.guru99.com/game-testing-mobile-desktop-apps.html