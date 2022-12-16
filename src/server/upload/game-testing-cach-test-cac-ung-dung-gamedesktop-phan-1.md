**Nội dung bài viết sẽ tập trung vào các vấn đề sau:**

* Vòng đời phát triển của các ứng dụng Game/Desktop.
* Kiểm thử Game và Kiểm thử phần mềm khác nhau như thế nào.
* Các kiểu của kiểm thử Game.
* Chơi Game hỗ trợ sử dụng các công nghệ thích ứng.
* Các chỉ số đo lường Game mà một tester nên biết.
* Các rủi ro chính trong việc test Game.

**1. Vòng đời phát triển của các ứng dụng Game/Desktop**

**Vòng đời phát triển của các ứng dụng Game/Desktop thường trải qua 3 giai đoạn**: Giai đoạn trước khi phát triển sản phẩm, giai đoạn phát triển sản phẩm và giai đoạn test và release sản phẩm. 

![](https://images.viblo.asia/e4a7a2f2-8816-4b84-b48f-74665ad5f6a6.png)

**Giai đoạn trước khi phát triển sản phẩm**: Trong giai đoạn này, ý tưởng trò chơi, cốt truyện, những tính năng, việc phân tích yêu cầu và hệ thống tài liệu được thực hiện. Giai đoạn này bao gồm tài liệu thiết kế kỹ thuật và các thông số về kỹ thuật và tính năng, kiến trúc game, hình động. Các đầu mục sau đây sẽ cần được cân nhắc đến:

+	Âm nhạc, Máy ảnh (phóng to và thu nhỏ, phát lại, ...) và các thuộc tính hành động
+	Luồng logic của game, những quy luật và điều kiện để đạt được cấp độ tiếp theo trong game.
+	Đối tượng và các sự kiện kích hoạt, điểm số, sự di chuyển và vị trí người chơi, các thống kê liên quan đến người chơi, ...
+	Trình tự không tương tác, các hiệu ứng đặc biệt, các màn hình tiêu đề, các hành động đa nút, ...
+	Gamepad, video clip, các hiệu ứng sốc hoặc rung, các văn bản pháp lý liên quan đến game, cách sử dụng các chức năng của nút, cách sử dụng chế độ analog và kỹ thuật số.

**Giai đoạn phát triển sản phẩm**: Trong giai đoạn này, quá trình code thực sự sẽ được thực hiện. Giai giai đoạn này sẽ bao gồm các công việc code và tích hợp các module khác nhau.

**Giai đoạn test và release sản phẩm**: Trong giai đoạn này, Quá trình kiểm tra chức năng, kiểm tra hồi quy, các phiên bản Alpha, Beta, Gold được thực hiện. Các quá trình test bao phủ và test lưu lượng, kiểm tra tính toàn vẹn của dữ liệu, việc kiểm tra các thuật toán cụ thể, kiểm tra đường dẫn, kiểm tra tăng cường cũng được thực hiện.

**2. Kiểm thử Game và Kiểm thử phần mềm khác nhau như thế nào**

Kiểm thử Game là một quá trình lặp đi lặp lại do mỗi bản build mới đều có thể có lỗi và phải được kiểm tra lại một cách kỹ lưỡng.

Tất cả quá trình kiểm thử Game đều tuân theo một kiến trúc cơ bản bất kể kích thước của trò chơi và thời gian yêu cầu để sản xuất trò chơi như thế nào.

Để đảm bảo chất lượng Game một cách chuyên nghiệp thì bạn cần nghiên cứu kỹ các quy tắc và yêu cầu của trò chơi. Bạn cần hiểu tổng thể kiến trúc các thành phần của trò chơi và kiến trúc file, luồng và cấu trúc file, và các phụ thuộc liên quan đến trò chơi. Với mỗi nguyên mẫu mới của trò chơi, các tài liệu test cần phải được xem lại thường xuyên để cập nhật mọi thay đổi về thông số kỹ thuật, testcase mới và hỗ trợ cấu hình mới. Người kiểm tra cần đảm bảo rằng không có vấn đề mới nào phát sinh.

Các công việc của một Game Tester bao gồm:

+	Phân loại các yêu cầu dựa trên mục đích dự định hướng đến và các định được mục tiêu.
+	Chỉ ra các yêu cầu của người dùng và hệ thống và những yêu cầu này nên được phân loại theo các yêu cầu chức năng, không chức năng, miền.
+	Chỉ ra các mục có thể kiểm tra, các mục không thể kiểm tra, các mục tiêu và biện pháp cho các yêu cầu chức năng và không chức năng.
+	Kiểm tra xem các yêu cầu chức năng có đầy đủ, nhất quán và dễ hiểu không.
+	Chỉ ra các yêu cầu tùy biến, các yêu cầu xung đột.
+	Chỉ ra các yêu cầu phụ thuộc lẫn nhau.
+	Ưu tiên các yêu cầu dựa trên tính độc đáo, phức tạp, quan trọng.
+	Xác định chủ đề của trò chơi, Nhân vật, Hoạt hình, AI, Chế độ xem camera, lối chơi, ....

**3. Các kiểu của kiểm thử Game**

***3.1. Kiểm tra chức năng***

Những QA thực hiện vieejc kiểm tra chức năng tìm kiếm các vấn đề chung trong game hoặc giao diện người dùng của nó và giao diện đồ họa, chẳng hạn như các vấn đề về cơ học, các vấn đề liên quan đến độ ổn định và tính toàn vẹn của game. Việc kiểm tra giao diện người dùng để chắc chắn rằng game là thân thiện với người dùng.

Ví dụ: Kiểm tra màu sắc và hình nền, cấu trúc menu, hướng màn hình và độ phân giải màn hình, kích thước phông chữ, lỗi căn chỉnh, khả năng sử dụng, sự điều hướng của hệ thống như thời gian tải, thời gian chờ và hiển thị, sắp xếp, thông báo xác nhận, trình tự, hoạt hình và các yếu tố âm thanh của trò chơi, các hướng dẫn và tin nhắn đối thoại. Những tương tác người dùng, giao diện người dùng, kiểm tra giao dịch, Kiểm tra hiệu chuẩn và độ chính xác của camera, các độ phân giải màn hình, kiểm tra thiết kế đáp ứng di động, kiểm tra chất lượng âm thanh.

***3.2. Kiểm tra tương thích***

Kiểm tra tương thích là kiểm tra xem trò chơi có tương thích trên các thiết bị khác nhau không và trên các cấu hình khác nhau của phần cứng và phần mềm không.

Ví dụ: Thử nghiệm việc cài đặt và gỡ trò chơi trên tất cả các bảng điều khiển / máy tính để bàn / điện thoại di động được hỗ trợ.

***3.3. Kiểm tra hiệu năng***

Tại bước này, hiệu năng tổng thể của Game sẽ được kiểm tra. Việc điều chỉnh hiệu năng cũng được thực hiện để tối ưu hóa tốc độ của game.

Các tham số quan trọng được kiểm tra trong quá trình kiểm tra hiệu năng bao gồm:

+	Thời gian đáp ứng trên client và server, thời gian hoàn thành giao dịch, hiệu suất tải tối đa, tuổi thọ, vùng phủ sóng, các vấn đề liên quan đến rò rỉ bộ nhớ, bộ nhớ thấp, pin yếu, thời gian tải xuống ứng dụng, khả năng truy cập đồng thời (Nhiều người dùng) vào server của ứng dụng, tốc độ, băng thông, độ tin cậy, khả năng mở rộng, ...
+	Mức độ tiêu thụ pin và hiệu suất đồ họa: Đo mức tiêu thụ pin của game. Tiêu thụ pin phải là tối ưu trong nhiều giờ và phản hồi củagame phải thỏa mãn trong các mức tải nặng khác nhau trên các thiết bị khác nhau.
+	Sự tiêu thụ của bộ xử lý và bộ nhớ: Bộ đếm hiệu suất được sử dụng để đo mức tiêu thụ CPU và bộ nhớ của ứng dụng.
+	Kết nối mạng: Đo thời gian phản hồi của các game trên các loại mạng khác nhau (Wi-Fi, 2G, 3G, 4G), điều này sẽ cung cấp cái nhìn tổng thể về game sẽ hoạt động tốt như thế nào trên các mạng không đáng tin cậy. Nó cũng kiểm tra kết nối giữa các thiết bị di động, data center hoặc cloud. Toàn bộ thời gian đỉnh, những kết nối Jittery, viêc sao chép dữ liệu, mất gói tin, phân mảnh dữ liệu sẽ được theo dõi.
+	Kiểm tra hiệu năng của game, đặc biệt là khả năng MMO (Massively Multiplayer Online).

***3.4. Kiểm tra sự phù hợp / tuân thủ***

Tuân thủ nguyên tắc thị trường (ví dụ: chính sách của Apple App Store), tuân thủ chính sách doanh nghiệp (ví dụ: nội dung bị cấm). Việc tuân thủ này cũng có thể đề cập đến các cơ quan quản lý như PEGI và ESRB. Mỗi game thường nhắm đến một mục tiêu nội dung cụ thể. Nếu game có những nội dung phản cảm không phù hợp ở mức độ mong muốn thì chúng sẽ được xác định và báo cáo. Thậm chí một vi phạm trong việc đệ trình phê duyệt giấy phép cũng có thể khiến game bị từ chối, phát sinh thêm các chi phí trong việc kiểm tra và gửi lại để lấy chứng nhận.

Ví dụ: Nếu trò chơi được dự định sẽ xuất bản ở các nước châu Âu, hãy kiểm tra các chuyển đổi PAL, còn nếu trò chơi được sản xuất cho Bắc Mỹ, hãy kiểm tra những chuyển đổi NTSC.

***3.5. Kiểm tra tính bản địa***

Kiểm tra tính bản địa của game là một yêu cầu quan trọng khi game được nhắm mục tiêu cho thị trường toàn cầu. Tiêu đề trò chơi, nội dung và văn bản cần được dịch và thử nghiệm với các thiết bị bằng nhiều ngôn ngữ. Các bài test này có thể được thực hiện nhanh chóng (với sự trợ giúp của truy cập thiết bị dựa trên đám mây và tự động hóa).

Ví dụ: Game sẽ cần bản địa hóa cụ thể cho khu vực MENA (Trung Đông / Bắc Phi), bản địa hóa tiếng Ả Rập (Hỗ trợ văn bản từ phải sang trái, hiển thị hai chiều), kiểm tra bản địa hóa giả, những ký tự hai byte (cho các ngôn ngữ Đông Á), thời gian / ngày các địa phương, tiền tệ, định dạng địa chỉ và các yêu cầu địa phương khác.

***3.6. Kiểm tra theo kiểu ngâm***

Khái niệm “Ngâm” ở đây liên quan đến việc để game chạy trong một thời gian dài trong các chế độ hoạt động khác nhau. Ví dụ, chế độ không hoạt động đã tạm dừng hoặc để game ở màn hình tiêu đề. Dựa trên kịch bản đó có thể xác định được việc rò rỉ bộ nhớ hoặc những lỗi làm tròn.

Ví dụ: Game đã bắt đầu và nhân vật được tạo ra để đứng yên trong 24 giờ. Kỹ thuật này được sử dụng để phát hiện các sự cố do rò rỉ bộ nhớ và các lỗi khác trong game.

***3.7. Kiểm tra phục hồi***

Trong phần mềm, kiểm tra khả năng phục hồi là việc kiểm tra ứng dụng có thể được phục hồi tốt như thế nào từ sự cố, lỗi phần cứng và các lỗi tương tự khác. Để làm điều này, ứng dụng có thể bị buộc phải phát sinh lỗi và sau đó việc phục hồi của nó sẽ được quan sát từ các điều kiện gây ra lỗi và môi trường nó hoạt động.

Ví dụ: Trong khi ứng dụng chơi trò chơi đang chạy, đột nhiên khởi động lại bảng điều khiển trò chơi và kiểm tra tính hợp lệ của dữ liệu.

***3.8. Kiểm tra bảo mật***

Kiểu test này được thực hiện để kiểm tra mức độ an toàn của phần mềm hoạt động khỏi các mối đe dọa bên ngoài. Bảo vệ dữ liệu khỏi các mối đe dọa bên ngoài, các truy cập hệ thống không được kiểm soát, việc vi phạm dữ liệu, hệ điều hành, hệ thống truyền thông và nguy cơ từ các thuật toán mã hóa yếu.

Ví dụ: Thay đổi đường dẫn từ /login thành /play trên trang web của game không nên được phép truy cập trực tiếp vào các trò chơi.

***3.9. Thử nghiệm trò chơi khác***

Thử nghiệm các nhân vật thật hay ảo. Trong các game video có nhiều người chơi, kết nối với server và đồng bộ hóa trạng thái game là hai lĩnh vực quan trọng cần được kiểm tra.

Ví dụ: Trò chơi đua xe 3D nhiều người chơi. 

Kiểm tra các tính năng mới như cập nhật trạng thái trò chơi, lời mời kết bạn, chia sẻ quà tặng cao cấp, ... Điều này đảm bảo trải nghiệm chơi game phong phú cho người dùng.

Ví dụ: Facebook, Blog

***3.10. Kiểm tra âm thanh***

Kiểm tra nếu có lỗi trong việc tải các tệp âm thanh hay không, tiến hành nghe các tệp âm thanh để tìm lỗi hoặc sự biến dạng nếu có, sử dụng bộ phân tích để phân tích biểu đồ âm thanh.

***3.11. Kiểm tra cơ sở dữ liệu và thống kê của game***

Xác minh cơ sở dữ liệu bằng cách sử dụng gỡ lỗi để điều tra nếu game đang sử dụng dữ liệu chính xác hay không. Đảm bảo rằng dữ liệu được tải đúng nơi và hiển thị thông tin chính xác

***3. 12. Kiểm tra hộp trắng***

Kiểm tra hộp trắng tập trung vào các khía cạnh kiến trúc, sự tích hợp và tính hệ thống của game di động:

+	Kiểm tra mã nguồn: Mã nguồn, logic chương trình, các lỗi lập trình phổ biến, việc tuân thủ các tiêu chuẩn mã hóa sẽ được đưa ra phân tích.
+	Kiểm tra tập trung: Các chuỗi mã khác nhau sẽ được đưa đến các module đã bị cô lập, và đầu ra sau đó sẽ được phân tích.
+	Phân tích dữ liệu: Việc sử dụng, phân tích và thao tác trên dữ liệu sẽ được phân tích và xác nhận cho các module khác nhau.
+	Kiểm tra đường dẫn và dòng chảy: Đảm bảo trình tự chính xác của các đối tượng được thực thi.
+	Kiểm tra theo thuật toán cụ thể: Kiểm tra một kịch bản hoặc tính năng cụ thể của game bằng cách đặt các biến dữ liệu, giá trị dữ liệu cho mã nguồn và thực thi nó trong môi trường thời gian chạy.
+	Phân tích trí tuệ nhân tạo: Thống kê chạy các bước di chuyển và chơi có thể lập trình của thành phần AI được tạo ra. Kết quả sẽ được xác nhận để kiểm tra xem tất cả các di chuyển có thể lập trình có được sử dụng hay không. Ví dụ: nắm bên trên ván trượt tuyết và chơi (đẩy / đá kết hợp trong hành động đa chiều) được sử dụng.

**4. Liên kết tham khảo**

https://www.guru99.com/game-testing-mobile-desktop-apps.html