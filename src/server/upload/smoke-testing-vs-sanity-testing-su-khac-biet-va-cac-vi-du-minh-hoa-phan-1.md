Trong hướng dẫn này, chúng ta sẽ tìm hiểu Sanity Testing và Smoke Testing trong Kiểm thử phần mềm là gì. Chúng ta cũng sẽ tìm hiểu sự khác biệt chính giữa Sanity Testing và Smoke Testing với các ví dụ đơn giản.

Hầu hết thời gian chúng ta bị lẫn lộn giữa ý nghĩa của Sanity Testing và Smoke Testing. Trước hết, hai phương thức test này là khác nhau và được thực hiện trong các giai đoạn khác nhau của một chu kỳ kiểm thử phần mềm.

**1. Sanity Testing**

Sanity Testing được thực hiện khi đối với một QA, chúng ta không có đủ thời gian để chạy tất cả các bài test, có thể là Kiểm tra chức năng, Giao diện người dùng, HĐH hoặc Kiểm tra trình duyệt.

Do đó, chúng ta sẽ xác định,

“Sanity Testing như một bài test được thực hiện để chạm  vào mỗi thực thi và tác động của nó nhưng không triệt để hoặc không chuyên sâu. Nó có thể bao gồm bài test chức năng, giao diện người dùng, phiên bản, ... tùy thuộc vào sự thực thi và tác động của nó.”

Tất cả chúng ta đều rơi vào tình huống phải chờ trong một hoặc hai ngày nhưng bản build để thực hiện test vẫn chưa được release?

Tôi cá với bạn rằng bạn cũng phải đối mặt với tình huống này ít nhất một lần trong trải nghiệm test phần mềm của bạn. Tôi đã đối mặt với nó rất nhiều vì (các) dự án của tôi chủ yếu là nhanh và đôi khi chúng tôi được yêu cầu bàn giao nó ngay trong ngày. Trong trường hợp đó, làm cách nào tôi có thể thực hiện kiểm tra và release bản build trong một vài giờ?
 Và như một lớp kem trên một cái bánh, khách hàng đơn giản từ chối cho chúng ta thêm thời gian. Vậy làm cách nào chúng ta có thể hoàn thành toàn bộ việc test trong vài giờ, xác minh mọi chức năng, lỗi của phần mềm và tự tin vào việc phát hành nó?

![](https://images.viblo.asia/ff205de3-b6e5-4f9a-b239-f54999b34f6f.jpg)

Câu trả lời cho tất cả các vấn đề như vậy rất đơn giản, không có gì ngoài việc sử dụng chiến lược Sanity Testing.

Khi chúng ta thực hiện bài test này cho một module hoặc chức năng hoặc một hệ thống hoàn chỉnh, các test case để thực hiện được chọn sao cho chúng sẽ chạm vào tất cả các điểm và các phần quan trọng theo triết lý test rộng nhưng nông.

Đôi khi việc test thậm chí được thực hiện ngẫu nhiên mà không có test case nào cụ thể. Nhưng hãy nhớ, Sanity Testing chỉ nên được thực hiện khi bạn sắp hết thời gian, không bao giờ sử dụng điều này cho các bản release thông thường của bạn. Về mặt lý thuyết, bài test này là một tập hợp con của Regression Testing (Test hồi quy)

**Kinh nghiệm của tôi**

![](https://images.viblo.asia/ddab3c50-0370-428f-8284-f0da81d498ba.jpg)

Trong hơn 8 năm sự nghiệp của mình về test phần mềm, tôi đã có 3 năm làm việc trong phương pháp Agile và đó là thời gian tôi chủ yếu sử dụng bài sanity testing.

Tất cả các bản release lớn thông thường đã được lên kế hoạch và thực hiện một cách có hệ thống, nhưng đôi khi với các bản release nhỏ, chúng ta được yêu cầu gửi report càng sớm càng tốt. Chúng ta sẽ không có nhiều thời gian để ghi lại các testcase, quá trình thực thi, viết tài liệu mô tả lỗi, thực hiện test hồi quy và làm theo đầy đủ toàn bộ quá trình như thông thường.

**Dưới đây sẽ là một số gợi ý chính có thể sử dụng như đã nêu ở trên:**

#1) Ngồi với người quản lý và nhóm phát triển ngay khi họ đang thảo luận về việc triển khai vì họ phải làm việc nhanh và do chúng ta không thể mong đợi họ giải thích riêng cho chúng ta được.

Điều này cũng sẽ giúp bạn có được ý tưởng về những gì họ sẽ thực hiện, phạm vi nào sẽ ảnh hưởng đến … Đây là một việc rất quan trọng vì đôi khi chúng ta chỉ đơn giản là không nhận ra sự thực thi và nếu có bất kỳ chức năng hiện có nào sẽ có nguy cơ ảnh hưởng đến sản phẩm.

#2) Khi bạn không có nhiều thời gian, vào lúc nhóm phát triển đang thực hiện triển khai, bạn có thể ghi lại các testcase trong các công cụ như Evernote, ... Nhưng hãy đảm bảo rằng bạn viết chúng ở đâu đó để bạn có thể thêm các testcase đến chúng sau này.

#3) Giữ cho việc thực hiện test của bạn luôn sẵn sàng cho việc thực hiện. Nếu bạn cảm thấy rằng có bất kỳ dấu hiệu nào khiến cho việc test sẽ mất thời gian (và đó là một bài test quan trọng không thể bỏ qua khi release), bạn cần thông báo cho quản lý của bạn hoặc PO.

Bởi vì khách hàng muốn có kết quả càng sớm càng tốt, điều đó không có nghĩa là QA sẽ release kết quả test ngay cả khi nó mới thực hiện được một nửa.

#4) Thỏa thuận với nhóm và người quản lý của bạn rằng do thời gian gấp gáp, bạn sẽ chỉ thông báo lỗi cho nhóm phát triển và quy trình test chuẩn bao gồm việc thêm, đánh dấu các lỗi trong các giai đoạn khác nhau trong công cụ theo dõi lỗi sẽ được thực hiện sau để tiết kiệm thời gian.

#5) Khi nhóm phát triển đang thử nghiệm ở phía họ, hãy thử ghép nối với họ (Điều này được gọi là sự ghép nối dev-QA) và thực hiện một vòng test cơ bản trên chính thiết lập của họ, điều này sẽ giúp rà soát sớm nếu các thực thi cơ bản bị lỗi.

#6) Khi bạn có một bản build, hãy thực hiện kiểm tra các quy tắc cơ bản và tất cả các trường hợp sử dụng trước. Sau đó bạn có thể thực hiện các bài test chi tiết hơn như xác nhận trường, điều hướng, …

#7) Đối với các lỗi bạn tìm thấy, hãy ghi lại tất cả chúng và cố gắng báo cáo chúng với team phát triển cùng với nhau thành nhóm thay vì báo cáo riêng lẻ vì điều đó sẽ giúp team phát triển dễ dàng làm việc hơn trong việc xử lý lỗi.

#8) Nếu bạn có yêu cầu về việc Performance Testing, Stress Testing hoặc Load Testing thì hãy đảm bảo chắc chắn rằng bạn đã có một framework tự động hóa phù hợp để thực hiện chúng. Bởi vì gần như không thể kiểm tra thủ công những thứ này bằng một bài Sanity Testing.

#9) Đây là phần quan trọng nhất và thực sự là bước cuối cùng trong chiến lược Sanity Testing của bạn - Khi bạn soạn thảo email phát hành hoặc tài liệu, hãy đề cập đến tất cả các testcase mà bạn đã thực hiện, các lỗi được tìm thấy bằng cách đánh dấu trạng thái của chúng và nếu còn bất cứ điều gì còn lại chưa được kiểm tra, hãy đề cập đến nó với những lý do rõ ràng. Hãy cố gắng viết một câu chuyện rõ ràng về việc test của bạn, điều này sẽ truyền đạt cho mọi người về những gì đã được kiểm tra, xác minh và những gì chưa được kiểm tra.

**Dưới đây là những chia sẻ kinh nghiệm rất cụ thể của riêng tôi:**

#1) Chúng tôi đã làm việc trên một trang web và nó được sử dụng để bật quảng cáo lên dựa trên các từ khóa. Các nhà quảng cáo được phép đặt giá cho các từ khóa cụ thể với các màn hình đã được thiết kế như nhau. Giá đặt mặc định để được hiển thị màn hình này là $ 0,25, tuy nhiên có thể thay đổi.

Có thêm một nơi mà giá đặt có thể đượchiển thị và nó cũng có thể được thay đổi thành giá khác. Khách hàng đến với yêu cầu thay đổi giá trị đặt mặc định này từ $ 0,25 thành $ 0,5 nhưng anh ta muốn điều này khi hiển thị một màn hình cụ thể.

Sau cuộc thảo luận, chúng tôi đã quên về màn hình đặc biệt này bởi vì nó không được sử dụng nhiều cho mục đích đó. Nhưng trong khi test khi tôi thực hiện chạy các testcase cơ bản của giá trị quảng cáo là $ 0,5 và thực hiện kiểm tra từ đầu đến cuối, tôi thấy rằng cronjob bị lỗi vì tại một vị trí nó đã luôn tìm thấy giá trị quảng cáo là $ 0,25.

Tôi đã báo cáo điều này với nhóm của mình và chúng tôi đã thực hiện thay đổi nhanh chóng và thực hiện bàn giao sản phẩm thành công trong cùng ngày hôm đó.

#2) Trong cùng một dự án (đã đề cập ở trên), chúng tôi đã được yêu cầu thêm một trường văn bản nhỏ để ghi chú / nhận xét để đấu giá. Đó là một thực hiện rất đơn giản và chúng tôi cam kết cung cấp nó cùng một ngày.

Do đó như đã đề cập ở trên, tôi đã kiểm tra tất cả các quy tắc cơ bản và các trường hợp sử dụng xung quanh nó và khi tôi thực hiện một số kiểm tra xác thực, tôi thấy rằng khi tôi nhập một tổ hợp các ký tự đặc biệt như </>, trang bị sập.

Chúng tôi đã phân tích điều đó và nhận ra rằng người sử dụng thực tế sẽ không bao giờ sử dụng kết hợp như vậy. Do đó, chúng tôi đã phát hành nó với một ghi chú phân tích rõ về vấn đề này. Khách hàng chấp nhận rằng đó là một lỗi nhưng đã đồng ý với chúng tôi để triển khai vì đây là một lỗi nghiêm trọng nhưng không phải là lỗi trước đó.

#3) Gần đây, tôi đang làm việc trong một dự án phát triển ứng dụng di động và chúng tôi có yêu cầu cập nhật thời gian giao hàng được hiển thị trong ứng dụng theo múi giờ. Nó không chỉ được test trong ứng dụng mà còn được test với dịch vụ web.

Trong khi nhóm phát triển đang thực hiện triển khai, tôi đã tạo các tập lệnh tự động hóa để kiểm tra dịch vụ web và tập lệnh DB để thay đổi múi giờ của mục phân phối. Điều này đã tiết kiệm những nỗ lực của tôi và chúng tôi có thể đạt được kết quả tốt hơn trong một thời gian ngắn.

Đến đây hi vọng các bạn đã hiểu rõ hơn khái niệm về Sanity Testing. Phần sau một sẽ phân tích tiếp về Smoke Testing.

**2. Liên kết tham khảo:**

https://www.softwaretestinghelp.com/smoke-testing-and-sanity-testing-difference/