**I.Phân loại**

Có hai loại kiểm thử diễn ra trên thiết bị di động đó là:

1.Kiểm thử phần cứng: 

Thiết bị bao gồm bộ xử lý trong, phần cứng bên trong, kích thước màn hình, độ phân giải, bộ nhớ, camera, radio, bluetooth, wifi,…

2.Kiểm thử phần mềm hoặc kiểm thử ứng dụng:

- Ứng dụng làm việc trên các thiết bị di động và các chức năng của nó được kiểm thử. 
- Đây gọi là kiểm thử Ứng dụng di động để phân biệt với các phương pháp có từ sớm hơn. 

 ***Các ứng dụng di động bao gồm:***
+ Ứng dụng gốc_Native apps: Là ứng dụng được tạo riêng trên một nền tảng giống như di động hoặc máy tính bảng.
+ Ứng dụng di động web_Mobile web apps: Là các ứng dụng phía server để truy cập vào các website trên di động sử dụng các trình duyệt khác nhau như: Chrome, Firefox bằng cách kết nối tới một mạng di động hoặc mạng không dây giống như WIFI
+ Ứng dụng lai_Hybrid apps : Là sự kết hợp giữa ứng dụng gốc và ứng dụng web. Chúng chạy trên các thiết bị hoặc offline và chúng được viết bằng các công nghệ web như HTML5 và CSS.

**II. Ý nghĩa của kiểm thử ứng dụng di động**

Kiểm thử ứng dụng trên thiết bị di động có nhiều thách thức hơn kiểm thử ứng dụng web trên máy tính để bàn bởi vì:
- Phạm vi khác nhau của các ứng dụng di động kèm theo sự khác nhau của độ phân giải màn hình và cấu hình phần cứng giống như: bàn phím cứng, bàn phím ảo và các con lăn chuột.
- Sự đa dạng của các thiết bị di động như: HTC, Sam sung, apple, nokia…
- Khác nhau của các hệ điều hành di động: Android, window, ios..
- Sự khác nhau giữa các phiên bản hệ điều hành: IOS5.x, 6.x…
- Sự khác nhau giữa các mạng di động: GSM and CDMA…
- Việc cập nhật thường xuyên: Với mỗi cập nhật nên tạo thêm một vòng kiểm thử mới để chắc chắn rằng không có chức năng nào của ứng dụng bị ảnh hưởng.

**III.Những điểm khác nhau cơ bản giữa kiểm thử di động và kiểm thử ứng dụng trên máy tính để bàn**
- Trên máy để bàn, ứng dụng được kiểm thử ở bộ xử lý trung tâm. Với thiết bị mobile, ứng dụng được kiểm thử trên các bộ ứng cầm tay: samsung, nokia, apple…
- Độ phân giải màn hình ứng dụng di động nhỏ hơn máy tính để bàn
- Ứng dụng di động có bộ nhớ nhỏ hơn máy tính để bàn
- Ứng dụng di động sử dụng kết nối mạng như: 2G, 3G, 4G, wifi trong khi máy tính để bàn sử dụng băng thông để kết nối
- Các công cụ tự động cho ứng dụng máy tính để bàn không thể làm việc trên ứng dụng di động.

**IV.Các loại kiểm thử ứng dụng di động**

Để giải quyết tất cả các khía cạnh kĩ thuật trên, các loại kiểm thử sau đây được thực hiện trên các ứng dụng di động:
- Kiểm thử tính khả dụng (Usability Testing): Kiểm tra các khía cạnh khả năng sử dụng các ứng dụng di động, để chắc chắn rằng ứng dụng di động dễ dàng sử dụng và mang lại sự hài lòng về trải nghiệm người dùng cho khách hàng.
- Kiểm thử chức năng (Function Testing): Kiểm tra các chức năng chính của ứng dụng di động theo đặc điểm kĩ thuật của thiết bị
- Kiểm thử khả năng tương thích (Compatibility Testing): Kiểm tra khả năng tương thích của ứng dụng của bạn với các tính năng thiết bị gốc để đảm bảo rằng ứng dụng của bạn không cản trở các ứng dụng khác trong thiết bị. 
Kiểm thử ứng dụng trên các loại thiết bị di động, trình duyệt, kích thước màn hình, phiên bản hệ điều hành khác nhau – dựa vào tài liệu yêu cầu.
- Kiểm thử giao diện (Interface testing): Kiểm tra màu sắc, menu, các icon, lịch sử, cài đặt, điều hướng trên ứng dụng, tính nhất quán của giao diện người dùng trên các thiết bị khác nhau.
- Kiểm thử dịch vụ (Services testing): Kiểm thử ứng dụng online và offline.
- Kiểm thử nguồn tài nguyên ở mức thấp (Low-level resource testing): Kiểm thử sử dụng bộ nhớ, tự động xóa các tệp tin tạm thời…
- Kiểm thử hiệu năng (Performance testing): Kiểm thử hiệu năng của ứng dụng bằng cách thay đổi kết nối từ 2G, 3G sang WIFI, chia sẻ tài liệu, khả năng tiêu thụ pin… Kiểm tra hành vi của ứng dụng di động trong các nguồn tài nguyên thấp (Bộ nhớ/ Không gian lưu trữ), hành vi của trang web điện thoại di động khi nhiều người sử dụng điện thoại di động cùng truy cập vào trang app di động.
- Kiểm thử khả năng hoạt động (Operational testing): Kiểm thử việc sao lưu và kế hoạch phục hồi dữ liệu nếu pin hết, hoặc mất mát dữ liệu trong khi nâng cấp ứng dụng từ kho ứng dụng.
- Kiểm thử cài đặt (Installation tests): Kiểm tra ứng dụng bằng cách cài đặt/ gỡ bỏ nó trên các thiết bị.
- Kiểm thử bảo mật (Security Testing): Kiểm thử một ứng dụng để xác minh liệu hệ thống thông tin có bảo mật dữ liệu hay không.
- Kiểm tra gián đoạn: Vì lí do các thiết bị di động có bộ nhớ thấp hơn nhiều so với desktop nên phải đảm bảo rằng khi có cuộc gọi thoại, tin nhắn SMS, cắm sạc, thông báo bộ nhớ thấp trong khi ứng dụng đang chạy không gây ra bất cứ xung đột nào.

**V.Chiến lược kiểm thử ứng dụng di động**

Chiến lược kiểm thử nên chắc chắn rằng tất cả chất lượng và hiệu năng cần phải phù hợp. Một vài chiến lược kiểm thử ứng dụng di động như sau:
1. Việc lựa chọn các thiết bị:
Phân tích thị trường và lựa chọn các thiết bị được sử dụng rộng rãi. 
(Quyết định này hầu như đều phụ thuộc vào khách hàng. Khách hàng hoặc người xây dựng ứng dụng xem xét các nhân tố phổ biến hoặc các thiết bị chính tốt nhất trên thị trường cần cho ứng dụng, cần sử dụng để kiểm thử )
 2. Môi trường giả lập:
Việc sử dụng giả lập là cực kỳ hữu ích trong giai đoạn đầu phát triển của ứng dụng. Nó cho phép chúng ta kiểm tra ứng dụng một cách nhanh chóng và hiệu quả.
Giả lập là một hệ thống chạy phần mềm từ môi trường này sang môi trường khác mà không cần thay đổi chính phần mềm đó. Nó bao gồm tất cả các tính năng và làm việc trên môi trường thật.

***Các môi trường giả lập thiết bị di động:***
+ Giả lập thiết bị: Cung cấp bởi các nhà sản xuất thiết bị.
+ Giả lập trình duyệt: Mô phỏng môi trường trình duyệt di động.
+ Giả lập hệ điều hành: Apple cung cấp giải lập cho Iphones, Microsoft cung cấp giả lập cho window phones và Google cung cấp cho android phones

***Danh sách một vài giả lập thiết bị ứng dụng miễn phí và dễ dàng sử dụng***
- iPhone Tester: Tất cả những gì bạn cần làm đó là nhập URL vào phần tìm kiếm và bạn sẽ được xem nó sẽ hiển thị như thế nào trên Iphone.
- Mobile Phone Emulator: Được sử dụng để kiểm tra các thiết bị cầm tay như iPhone, Blackberry, HTC, Samsung,…
- MobiReady: Với môi trường giả lập này, chúng tôi không chỉ kiểm tra ứng dụng web mà còn có thể kiểm tra mã.
- Responsivepx: Môi trường này giúp kiểm tra phản hồi của các trang web, hiển thị và các chức năng của trang web đó.
- Screenfly: Nó là một công cụ tùy biến và được sử dụng để kiểm tra các trang web theo các danh mục khác nhau.
 3. Sau khi đã đạt được sự hài lòng khi phát triển ứng dụng trên giả lập, bạn hãy dùng thiết bị thật để kiểm thử.
 4. Xem xét kiểm thử đám mây (cloud computing):
Các thiết bị chạy trên đa hệ thống hoặc mạng thông qua internet nơi mà các ứng dụng có thể được kiểm thử, cập nhật và quản lý. 
Về mục đích kiểm thử, nó tạo ra trang web dựa trên môi trường di động trên một giả lập để truy cập và ứng dụng di động.

***Ưu điểm:***
- Sao lưu và phục hồi: Điện toán đám mây tự động sao lưu dữ liệu của bạn. Khả năng lưu trữ dữ liệu là không giới hạn.
- Có thể truy nhập từ nhiều thiết bị khác nhau ở mọi nơi.
- Hiệu quả, dễ sử dụng, bảo trì và cập nhật.
- Phát triển nhanh chóng.
- Có thể chạy các script giống nhau trên một vài thiết bị song song.

***Nhược điểm:***
- Tính điều khiển kém: Vì các ứng dụng được điều khiển từ xa hoặc môi trường của bên thứ 3, người dùng bị hạn chế điều khiển và truy nhập trên một số chức năng.
- Vấn đề về kết nối mạng: Do được thiết lập trên internet, do đó vấn đề về mạng ảnh hưởng tới sự sẵn sàng và chức năng của ứng dụng.
- Vấn đề về an ninh: Không có cái gì trên Internet là được hoàn toàn bảo mật. Do đó, tạo cơ hội cho các hacker nhiều hơn.
 5. Kiểm thử tự động và kiểm thử bằng tay
- Nếu ứng dụng chứa chức năng mới, hãy kiểm thử nó bằng tay.
- Nếu ứng dụng yêu cầu kiểm thử một hoặc hai lần, hãy kiểm thử nó bằng tay.
- Sử dụng kiểm thử tự động cho trường hợp test hồi quy (regression test).
- Sử dụng kiểm thử tự động cho các kịch bản phức tạp, mất nhiều thời gian để thực hiện khi thực hiện nó bằng tay.
 6. Cấu hình mạng:
- Cấu hình mạng là một phần cần thiết của kiểm thử di động. Cần kiểm thử ứng dụng trên các mạng khác nhau như: 2G, 3G, 4G, wifi…

**VI.Testcase cho kiểm thử ứng dụng di động**

Ngoài các testcases cơ bản về chức năng, ứng dụng di động yêu cầu một vài test cases đặc biệt sau đây:
- Tiêu hao pin: Cần phải kiểm tra lượng tiêu thụ của pin trong khi chạy ứng dụng trên các thiết bị di động.
- Tốc độ của ứng dụng: Thời gian phản hồi trên các thiết bị khác nhau, với các tham số bộ nhớ khác nhau, với các loại mạng khác nhau…
- Yêu cầu dữ liệu: Cài đặt để xác nhận liệu người dùng có thể download nó với lượng data giới hạn hay không?
- Yêu cầu về bộ nhớ: Download, cài đặt và chạy thử.
- Tính năng của ứng dụng: Chắc chắn ứng dụng không bị crash khi bị lỗi mạng hoặc bất cứ điều gì.

*Phạm vi kiểm thử phụ thuộc vào một số yêu cầu cần kiểm tra hoặc mức độ thay đổi được thực hiện cho ứng dụng*. 

Nếu những thay đổi là ít, chỉ cần thực hiện 1 vòng kiểm thử. 

Trong trường hợp có những thay đổi lớn hoặc phức tạp, nên sử dụng kết hợp cả kiểm thử hồi quy.*

**VII.Cách kiểm thử ứng dụng di động trên nền tảng Android và IOS**

Điều này rất quan trọng đối với những người kiểm thử trên nền tảng Android và iOS bởi vì chúng có sự khác biệt rất lớn: Khác biệt về giao diện, lượt xem ứng dụng, tiêu chuẩn mã hóa, hiệu suất,…

***Sự khác biệt cơ bản giữa kiểm thử ứng dụng di động trên nền tảng IOS và Android***

1. Vì có rất nhiều thiết bị Android có sẵn trên thị trường và tất cả chúng đều có độ phân giải và kích thước màn hình khác nhau.
Ví dụ: kích thước Samsung S2 quá nhỏ khi so sánh với Nexus 6. Có khả năng cao là bố cục và thiết kế ứng dụng của bạn bị biến dạng trên một trong các thiết bị. 
Xác suất trong iOS thấp vì chỉ có các thiết bị có thể đếm được trên thị trường và trong số nhiều điện thoại có độ phân giải tương tự.
Ví dụ: trước khi iPhone 6 trở lên ra đời, tất cả các phiên bản cũ hơn chỉ có kích thước tương tự.
2. Ví dụ để khẳng định điểm trên là trong Android, các nhà phát triển phải sử dụng hình ảnh 1x, 2x, 3x, 4x và 5x để hỗ trợ độ phân giải hình ảnh cho tất cả các thiết bị trong khi iOS chỉ sử dụng 1x, 2x và 3x. Tuy nhiên, trách nhiệm của người thử nghiệm là đảm bảo rằng hình ảnh và các thành phần UI khác được hiển thị chính xác trên tất cả các thiết bị.
3. Khi thị trường tràn ngập các thiết bị Android, mã phải được viết theo cách mà hiệu suất vẫn ổn định. Vì vậy, rất có thể ứng dụng của bạn có thể hoạt động chậm trên các thiết bị phiên bản cũ hơn.
4. Một vấn đề khác với Android là nâng cấp phần mềm không có sẵn cho tất cả các thiết bị. Các nhà sản xuất thiết bị quyết định khi nào cần nâng cấp thiết bị của họ. Nó trở thành một nhiệm vụ rất khó khăn để kiểm tra mọi thứ cả với hệ điều hành mới và hệ điều hành cũ.
Ngoài ra, nó trở thành một nhiệm vụ khó khăn cho các nhà phát triển để sửa đổi mã của họ để hỗ trợ cả hai phiên bản.
Ví dụ: Khi Android 6.0 xuất hiện, đã có một thay đổi lớn hệ điều hành này bắt đầu hỗ trợ cấp quyền ứng dụng. Để làm rõ hơn, người dùng cũng có thể thay đổi quyền (vị trí, danh bạ) ở cấp ứng dụng.
Bây giờ, nhóm thử nghiệm có trách nhiệm đảm bảo rằng hiển thị màn hình quyền trên ứng dụng khởi chạy trên Android 6.0 trở lên và không hiển thị màn hình cấp phép trên các phiên bản thấp hơn.
5. Từ góc độ kiểm thử, thử nghiệm xây dựng tiền sản xuất (tức là phiên bản beta) khác nhau trên cả hai nền tảng.
Trong Android, nếu người dùng được thêm vào danh sách người dùng beta thì anh ta chỉ có thể thấy bản dựng beta được cập nhật trên Play Store nếu anh ta đăng nhập vào cửa hàng play với cùng một ID email được thêm dưới dạng người dùng beta.

**VIII.Các yếu tố chính trong kiểm thử ứng dụng di động:**

1. Xác định phạm vi kiểm thử của riêng bạn
- Mọi người đều có phong cách kiểm thử riêng. Một số người kiểm thử chỉ tập trung vào những gì họ nhìn thấy từ đôi mắt của họ và những người còn lại đam mê tất cả mọi thứ hoạt động đằng sau hậu trường của bất kỳ ứng dụng di động nào.
- Nếu bạn là người kiểm thử iOS / Android, lời khuyên, bạn ít nhất nên làm quen với một số hạn chế/ chức năng cơ bản phổ biến của Android hoặc iOS vì nó luôn tăng giá trị cho thử nghiệm của bạn. Và tất nhiên những điều này không đơn giản.
2. Đừng giới hạn quá trình kiểm thử của bạn
- Việc kiểm tra không nên chỉ giới hạn trong việc khám phá ứng dụng di động và tìm ra lỗi. Với tư cách là một QA bạn nên nhận thức được tất cả các yêu cầu gửi đến máy chủ và phản hồi mà chúng tôi nhận được từ đó.
- Cấu hình Putty để xem lịch sử hoặc xác minh logic cho lịch sử tùy thuộc vào nội dung đang được sử dụng trong dự án của bạn. Nó không chỉ giúp bạn biết được dòng chảy từ đầu đến cuối của ứng dụng mà còn giúp bạn trở thành một người thử nghiệm tốt hơn khi bạn có thêm ý tưởng và kịch bản ngay bây giờ.

*Lý do*:  
Không có gì đến thế giới này mà không có lý do. Bất kỳ tuyên bố nên có một lý do hợp lệ đằng sau nó. 
Lý do đằng sau việc phân tích lịch sử là có nhiều trường hợp ngoại lệ được ghi nhận trong lịch sử nhưng chúng không cho thấy bất kỳ tác động nào đến giao diện người dùng do đó chúng ta có thể không nhận thấy điều đó.

Vì vậy, chúng ta có nên bỏ qua nó?
Không, chúng ta không nên. Nó không có bất kỳ tác động nào đến giao diện người dùng nhưng nó có thể là một mối quan tâm tương lai. Chúng tôi có khả năng sẽ thấy ứng dụng của mình bị sập nếu các loại ngoại lệ này tiếp tục phát triển. Như chúng tôi đã đề cập về sự cố ứng dụng trong khâu cuối cùng, điều này dẫn đến việc QA có quyền truy cập vào các bản phân tích của dự án.

3. Kiểm tra đa nền tảng
- Kiểm tra tương tác đa nền tảng là rất quan trọng.
Trích dẫn một ví dụ đơn giản, giả sử bạn đang làm việc trên một ứng dụng trò chuyện như WhatsApp hỗ trợ gửi hình ảnh và video và ứng dụng được xây dựng trên cả hai nền tảng iOS và Android (Phát triển có thể hoặc không đồng bộ hóa). Đảm bảo kiểm tra khả năng giao tiếp của Android và iOS, lý do là iOS sử dụng “Objective C”, trong khi lập trình Android dựa trên Java và do cả hai đều được xây dựng trên các nền tảng khác nhau, đôi khi cần phải sửa chữa thêm ứng dụng để nhận ra các chuỗi đến từ các nền tảng ngôn ngữ khác nhau.
4. Theo dõi kích thước của Ứng dụng di động của bạn
- Một lời khuyên quan trọng khác cho những người kiểm thử trên thiết bị di động : "Hãy tiếp tục kiểm tra kích thước của ứng dụng của bạn ***sau mỗi lần phát hành***."
- Nên đảm bảo rằng kích thước của ứng dụng không đạt đến điểm mà người dùng cuối muốn tải xuống ứng dụng này mà kích thước lớn.
5. Kiểm thử nâng cấp ứng dụng
- Đối với người kiểm thử ứng dụng di động, trường hợp nâng cấp ứng dụng là rất quan trọng. Đảm bảo ứng dụng của bạn không gặp sự cố khi nâng cấp vì nhóm nhà phát triển có thể đã không khớp với số phiên bản.
- Việc lưu giữ dữ liệu cũng quan trọng không kém vì trong bất kỳ tùy chọn nào người dùng đã lưu trong phiên bản trước nên được giữ lại khi nâng cấp ứng dụng.
Ví dụ: Người dùng có thể đã lưu chi tiết thẻ ngân hàng của mình trong các ứng dụng như Airpay, Momo,…
6. Hệ điều hành thiết bị có thể không hỗ trợ Ứng dụng
Nghe có vẻ thú vị?
Vâng, nhiều thiết bị có thể không hỗ trợ ứng dụng của bạn. Nhiều người trong số các bạn phải biết rằng các nhà cung cấp viết các trình ứng dụng có thể mọi truy vấn SQL ứng dụng của bạn không tương thích với thiết bị và do đó, nó sẽ đưa ra một ngoại lệ và thậm chí có thể không khởi chạy ứng dụng trên điện thoại đó.
Điều quan tâm ở đây là: Hãy thử sử dụng ứng dụng của bạn trên các thiết bị của riêng bạn ngoại trừ những ứng dụng bạn sử dụng trong văn phòng. Hoàn toàn có thể bạn thấy một số vấn đề với ứng dụng của mình.
7. Kiểm tra quyền ứng dụng
Tiếp theo trong danh sách là Kiểm tra quyền của ứng dụng di động. 
Hầu như mọi ứng dụng thứ hai đều yêu cầu người dùng truy cập vào điện thoại liên lạc, máy ảnh, thư viện, địa điểm của họ,… Một vài người kiểm thử mắc lỗi bằng cách không kiểm tra sự kết hợp đúng đắn của các quyền này.
8. Nhận tổng quan về tiêu chí từ chối bản build
- Cuối cùng, phần lớn các bạn có thể đã gặp phải tình huống các bản build của bạn bị Apple từ chối. Chủ đề này đã giành được phần lớn sự quan tâm của độc giả nhưng nó luôn luôn tốt khi biết các chính sách từ chối của Apple.
Là một người kiểm thử, chúng tôi trở nên khó khăn trong việc phục vụ các khía cạnh kỹ thuật nhưng vẫn có một số tiêu chí loại bỏ mà người thử nghiệm có thể quan tâm.
9. Luôn luôn độc lập
- Là một người thử nghiệm, hãy suy nghĩ và làm việc một cách khách quan và độc lập. 
- Hãy xem xét mọi vấn đề từ nhiều phía từ Nhóm Dev/ Người quản lý. 
- Nếu bạn đam mê kiểm thử thì luôn luôn có mặt trong mọi tình huống. Cố gắng tham gia vào các hoạt động của dự án, trước khi bạn bắt tay vào kiểm thử.
10. Giữ ứng dụng của bạn ở chế độ nền trong một thời gian dài (12-24 giờ)
Nghe có vẻ lạ nhưng có nhiều logic đằng sau hậu trường mà tất cả chúng ta đều không hiểu. Bởi vì đã có ứng dụng bị sập sau khi khởi chạy nó, nói sau khoảng 14 giờ từ trạng thái nền. 
Lý do có thể là bất cứ điều gì tùy thuộc vào cách các nhà phát triển đã mã hóa nó.
11. Kiểm tra hiệu suất ứng dụng của bạn
- Trong thế giới di động, hiệu suất của ứng dụng của bạn tác động đến mức độ ứng dụng được công nhận trên toàn thế giới.
 Là một nhóm kiểm thử, việc kiểm tra phản hồi ứng dụng của bạn trở nên quá quan trọng và quan trọng hơn là cách thức hoạt động khi một số lượng lớn người dùng đang truy câp hoặc sử dụng đồng thời.
 
Thái độ của người kiểm tra rất quan trọng trong môi trường thử nghiệm thực sự. Khi bạn nghiêm túc thực hiện bạn sẽ đạt được thành quả nhất định.
Hi vọng qua bài viết trên đây các bạn sẽ hiểu được phần nào về kiểm thử trên ứng dụng di động.
 
**Checklist tham khảo cho kiểm thử ứng dụng di động**

 Checklist dưới đây có thể giúp bạn phần nào khi thực hiện kiểm thử các ứng dụng di động :
 
**1. Usability Testing :**
- Thao tác cài đặt và gỡ bỏ đơn giản, dễ thực hiện.
- Có thể cập nhật bản update 1 cách dễ dàng
- Nhất quán về: kích thước, màu sắc của button; phông chữ, cỡ chữ và màu chữ; icons; ảnh trên tất cả các màn hình.
- Không nên có quá nhiều Pop up và các cảnh báo validation.
- Cuộn trang để phù hợp với chế độ xem dữ liệu lớn mà không bị treo trang.
- Thiết kế UI đơn giản và súc tích.
- Cho phép trở lại trang trước hoặc undo thao tác trước.
- Tab và Navigation hoạt động trơn tru.
- Cho phép người dùng thực hiện thao tác phóng to/ thu nhỏ.
- Hiển thị thông báo cho sự cố như time out hoặc server not responding.
- Hiển thị thông báo lỗi cho sự cố như mất mạng.
- Việc sạc/ ngắt sạc không ảnh hưởng đến ứng dụng hoặc xuất hiện thông báo không thích hợp.
- Cho phép thay đổi hướng màn hình: Portrait- Landscape một cách trơn tru.

**2.Functional Testing :**
- Tất cả tính năng phải được kiểm thử kỹ.
- Tất cả các tính năng miễn phí và trả phí phải được kiểm tra.
- Ứng dụng phải tiếp tục tại thời điểm người dùng ngừng để thực hiện cuộc gọi hoặc nhắn tin.
- Ứng dụng phải dừng các thao tác liên quan đến các quá trình bị hủy đột ngột bởi cài đặt của thiết bị.
- Không xảy ra việc mất dữ liệu, nhất là các ứng dụng liên quan đến bán lẻ điện tử hoặc ngân hàng.
- Không làm gián đoạn các cuộc gọi khi ứng dụng đang chạy.
- Không làm gián đoạn các tin nhắn khi ứng dụng đang chạy.
- Không làm gián đoạn các thiết bị chính khi ứng dụng đang chạy.
- Không làm gián đoạn các tùy chọn các trang mạng xã hội như chia sẻ, comment khi ứng dụng đang chạy.
- Kiểm tra các trạng thái khác nhau của app: đóng và mở, mở lại và đóng, mở, đóng và mở lại,...

**3.Performance Testing :**
- Kiểm thử hiệu năng và trạng thái của app dưới các điều kiện như: pin yếu, dung lượng nhỏ hoặc mạng yếu,...
- Kiểm thử hiệu năng của app cài đặt trên nhiều thiết bị di động với các hệ điều hành, dung lượng bộ nhớ, tốc độ xử lý, kích cỡ màn hình,,, khác nhau.
- Kiểm tra tính ổn định của ứng dụng khi:
- Nhiều người dùng cùng truy cập tại 1 thời điểm.
- Nhiều người dùng cùng cài đặt tại 1 thời điểm.
- Thực hiện multi- task cùng lúc.
- Tải được cài đặt ngay trước điểm quá tải để xem hệ thống phản ứng thế nào.
- Thời gian để upload và download nhiều dạng của tệp.
- Ứng dụng và bản upgrade của nó không chiếm quá nhiều CPU và bộ nhớ.
- Trạng thái hoạt động của ứng dụng khi sử dụng mạng 2G, 3G và 4G.

**4.Compatibility Testing:**
- Đánh giá khả năng tương thích của ứng dụng với môi trường như:
- Hệ điều hành khác nhau -> Android, IOS, Windows.
- Các trình duyệt khác nhau -> Firefox, Google Chrome, IE, Safari.
- Đánh giá khả năng tương thích ứng dụng trên các thiết bị di động khác nhau có:
- Kích thước và độ phân giải màn hình.
- Phiên bản hệ điều hành và kích thước bộ nhớ.
- Phần cứng có khả năng xử lý ngắt mà không bị treo.
- Hỗ trợ đa ngôn ngữ.
- Hỗ trợ đa múi giờ.
- Kiểm tra độ tương thích với các kết nối: Bluetooth, Wi-Fi, USB, etc.

**5. Security Testing:**
- Ứng dụng có lưu thông tin thanh toán hoặc thông tin thẻ tín dụng không?
- Ứng dụng có đòi hỏi nhiều quyền hạn hơn nó cần không?
- Ứng dụng có sử dụng kết nối mạng an toàn không?
- Ứng dụng có giấy chứng nhận/ bản quyền không?
- Ứng dụng có hỏi trước khi truy cập vào dữ liệu của người dùng không?
- Có giới hạn tối đa số lần đăng nhập thất bại không?

**6.Compliance Testing:**
- Kiểm tra giao diện người dùng ứng dụng được thiết kế theo hướng dẫn của hệ điều hành nhất định.
- Các biểu tượng và nút được sử dụng theo định nghĩa trong hướng dẫn hệ điều hành

**7.Accessibility Testing:**
- Ứng dụng có dễ sử dụng đối với người khiếm thị.
- Chức năng chuyển đổi văn bản thành giọng nói hoạt động chính xác.
- Hỗ trợ độ tương phản cao để đảm bảo khả năng hiển thị.
- Ứng dụng được xây dựng theo tiêu chuẩn W3.

Tài liệu tham khảo: 

https://link.sun-asterisk.vn/sI1Sc3

https://link.sun-asterisk.vn/adRMpc

https://link.sun-asterisk.vn/a9FkVR