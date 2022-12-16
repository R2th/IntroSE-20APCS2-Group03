Ước lượng có thể là một nhiệm vụ khó khăn. Tôi đã từng thấy nhiều sai lầm trong quá khứ, từ việc mọi người bỏ lỡ các task thiết yếu trong ước lượng của họ, đến việc đặt ước lượng kiểm thử dựa trên tỷ lệ phần trăm của ước lượng phát triển được đặt cho dự án, đến việc mọi người hoàn toàn đoán vào một số ngày / tuần / tháng mà họ tin rằng thử nghiệm sẽ kết thúc.

Một ước lượng không chính xác chắc chắn có thể gây ra các vấn đề trong dự án, trong đó không có đủ thời gian được phân bổ để cho phép thực hiện kiểm thử đầy đủ dẫn đến sản phẩm kém chất lượng được phát hành hoặc bị hoãn ngày bàn giao sản phẩm. Cả hai tình huống đều làm cho khách hàng không hài lòng…

Điều quan trọng là không đặt ước lượng cho kiểm thử dựa trên tỷ lệ phần trăm của ước lượng cho việc phát triển bởi vì có thể có  những tình huống mà trong đó một chức năng mới có thể chỉ mất nửa ngày để phát triển, nhưng nó có thể ảnh hưởng đến nhiều chức năng khác của hệ thống sau khi chức năng mới đó được tích hợp, có nghĩa là quá trình kiểm thử sẽ mất nhiều thời gian hơn nửa ngày, nhưng nếu bạn đặt theo tỷ lệ phần trăm của nửa ngày đó, bạn có thể đã cung cấp ước lượng cho kiểm thử là một giờ…

Các ước lượng cho kiểm thử nên được thiết lập theo cách riêng, bởi người kiểm thử có kinh nghiệm với kiến thức đầy đủ về những gì cần để kiểm tra sản phẩm.

Vì vậy, bắt đầu từ đâu để thiết lập một ước lượng?

Khi được yêu cầu cung cấp ước lượng về thời gian kiểm thử cho một dự án mới, bạn cần suy nghĩ về bức tranh toàn cảnh hơn và cân nhắc các khía cạnh sau:

1) Danh sách các yêu cầu (cùng một danh sách các yêu cầu mà các nhà phát triển sẽ sử dụng để ước lượng): Điều quan trọng là phải trao đổi với các nhà phát triển và các bên liên quan để xây dựng kiến thức về phạm vi và kỳ vọng của hệ thống. Nếu không biết phạm vi là gì, thì sẽ rất khó để biết nỗ lực thử nghiệm là gì.

2) Bản đồ tư duy: Vẽ một số bản đồ tư duy! Điều này cho phép chúng tôi nghĩ ra nhiều kịch bản hơn và kết thúc các quá trình mà chúng ta có thể đã bỏ lỡ khi chỉ nhìn vào thông số kỹ thuật.

3) Hãy nghĩ đến các loại kiểm thử  khác nhau và cần thiết cho dự án: Nếu load test là bắt buộc, thì điều này sẽ thêm thời gian đáng kể để thực hiện, điều này sẽ được tính vào ước lượng của bạn. Đối với Kiểm tra hồi quy, hãy trao đổi với các nhà phát triển để thảo luận về các chu kỳ phát hành - Tìm hiểu có bao nhiêu giai đoạn phát hành được dự đoán. Về cuối dự án, kiểm tra hồi quy sẽ mất nhiều thời gian hơn so với lúc đầu do hệ thống đang phát triển với mỗi lần lặp lại các bản phát hành. Đối với giai đoạn UAT hoặc giai đoạn kiểm thử Beta, bạn có thể yêu cầu khách hàng hỗ trợ giai đoạn UAT của họ hoặc kiểm thử Beta để trợ giúp và hướng dẫn người dùng về thử nghiệm của họ. Điều quan trọng là phải suy nghĩ về tất cả các phương pháp kiểm thử khác nhau được yêu cầu thực hiện.

4) Suy nghĩ về 3 khía cạnh của thời gian xung quanh kiểm thử của bạn; “Lập kế hoạch và chuẩn bị”, “thực hiện” và “quản lý và điều tra lỗi”.

- “Lập kế hoạch và Thực hiện”: là khoảng thời gian bạn sẽ cần để tìm hiểu về hệ thống, tạo bất kỳ tài liệu kiểm tra nào (kế hoạch kiểm tra nếu được yêu cầu, bản đồ tư duy để nghiên cứu sâu hơn, báo cáo tài liệu, v.v.) và chuẩn bị cho kiểm tra (bộ thiết lập môi trường thử nghiệm, lấy và thiết lập các công cụ phù hợp và tạo / thiết lập dữ liệu thử nghiệm cần thiết để thực sự thực hiện thử nghiệm).

- “Thực hiện”: là khoảng thời gian để thực sự kiểm tra hệ thống, kiểm tra các yêu cầu, thực hiện kiểm tra đầu cuối, kiểm tra tích hợp và hồi quy và tất nhiên cần tính đến yếu tố re-test.

- “Quản lý và điều tra lỗi”: là thời gian cần thiết để thực sự điều tra thêm các lỗi được tìm thấy (đôi khi cộng tác với các nhà phát triển), ghi lại các lỗi được tìm thấy một cách thích hợp và sau đó theo dõi lỗi.

Chúng ta cần suy nghĩ về tất cả các khía cạnh này khi ước lượng thời gian. Tôi đã thấy mọi người cung cấp các ước lượng mà không tính đến thời gian cần thiết để lập kế hoạch kiểm thử hoặc thiết lập dữ liệu thử nghiệm hoặc nghĩ về thời gian cần thiết để ghi lại lỗi hoặc chuẩn bị báo cáo lỗi cho khách hàng.

5) Sử dụng kinh nghiệm: nghĩ lại các sản phẩm trước đây và bất kỳ vấn đề nào với ước lượng mà bạn đã từng làm, sau đó áp dụng kiến thức thu được từ những bài học kinh nghiệm đó với ước lượng mà bạn đang làm cho dự án mới.

6) Bổ sung dự phòng! Điều quan trọng là phải thêm thời gian cho mọi vấn đề không lường trước được và việc re-test có thể được yêu cầu.

Suy nghĩ về những khía cạnh này và xem xét chúng là một khởi đầu tuyệt vời để có thể đưa ra một ước lượng thích hợp cho thời gian kiểm thử sản phẩm mới.

Nguồn: https://danashby.co.uk/2012/10/22/6-area-to-consider-when-thinking-about-testing-estimations/