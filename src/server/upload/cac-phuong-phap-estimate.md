## Các nhân tố ảnh hưởng đến estimate ban đầu 
- Yêu cầu chi tiết kĩ thuật có đầy đủ hay không
- Loại dự án (không quan trọng là các dự án giống nhau như thế nào, mỗi dự án là duy nhất à có thể kĩ thuật hay tool sử dụng khác nhau)
- Tính năng được mong đợi trong ứng dụng
- Sự phức tạp khi tích hợp backend, và nhiều thứ khác

Phần lớn các nhà cung cấp không thể hoàn thành dự án theo như ước tính ban đầu 

Ngoài ra, vì phần mềm ngày nay được xây dựng theo mô hình Agile, phân chia thành các vòng lặp và khách hàng luôn muốn thay đổi yêu cầu của họ, mỗi yêu cầu thay đổi hoặc tăng phạm vi sẽ tăng thêm thời gian để phát triển dự án.

Khi developer không thực hiện đúng estimate của họ, nó có thể gây ra hậu quả cho công ty:

- Missed milestones and delayed release
- Thâm hụt ngân sách
- Tăng ca
- Tinh thần đồng đội kém
- Doanh thu bị mất (đặc biệt trong trường hợp dự án giá cố định)
- Khách hàng không hài lòng và không trung thành
- Căng thẳng

Một vài lựa chọn dưới đây có thể giúp các developer ước tính cho dự án thực tế và chính xác hơn.

## PHƯƠNG PHÁP PHÂN LOẠI
**1. POKER ESTIMATE**

Tập hợp một nhóm lập trình viên và BA, hãy để mỗi người tự ước tính một cách lặng lẽ và sau đó so sánh và thảo luận. Những người đưa ra ước tính cao nhất và thấp nhất cung cấp các lập luận và toàn bộ team nên thảo luận về số lượng thời gian thực tế và có thể thực hiện được để gửi đến khách hàng.

**2. SO SÁNH ĐẾN DỰ ÁN SIMILAR**

Ở đây bạn cần so sánh dự án hiện tại với thời gian thực sự dành cho một dự án tương tự trong quá khứ, nhưng không phải là estimate ban đầu. Ngoài ra còn có một yếu tố phức tạp cần được xác định và nhân với số giờ dự kiến.

**3. BOTTOM UP & TOP DOWN**

Bước một là phân tách main task thành nhiều subtask và ước tính từng subtask riêng biệt. Sau đó tổng hợp kết quả để có được estimate cuối cùng.

Bước hai là ước tính toàn bộ task. Nếu sự khác biệt giữa 2 lần estimate là rất lớn, bạn cần tìm ra lý do và thương lượng một sự thỏa hiệp.

**4. EXTERNAL EXPERTISE**

Nếu team của bạn có vấn đề khi estimate sai lêch vài man-hours, hãy nhờ sự giúp đỡ của nhóm bên cạnh.

## PHƯƠNG PHÁP QUẢN LÝ DỰ ÁN
**1. RỦI RO**

Luôn thêm vào 15% -20% trên tổng thời gian estimate cho dự án để cover risk. Trên thực tế, risk có vẻ "dường như đã được xác định trong quá trình phát triển, thiết kế cơ sở dữ liệu sẽ phải thay đổi ..." Phần rủi ro nhất của dự án là những phần phức tạp nhất hoặc không rõ ràng nhất. Nếu bạn đã phân tách task, bạn chỉ có thể bao gồm 15% -20% cho các sub-task.

**2. PART-TIME RESOURCES**

Giả sử bạn chỉ có 80% resource sẵn có. Giả sử developer làm việc 32 thay vì 40 giờ một tuần. Đảm bảo áp dụng 80% này cho kế hoạch của từng milestone, nhưng không phải là áp dụng cho bản estimation. Như vậy, bạn ước tính 40 giờ, nhưng thông báo cho khách hàng rằng nhiệm vụ sẽ được hoàn thành trong 6 chứ không phải 5 ngày. Nó cho phép bạn bảo đảm những rủi ro và những việc phát sinh nằm ngoài dự kiến.

**3. OUT OF SCOPE**

Như đã đề cập ở trên, nhiều khách hàng thích cải thiện ý tưởng ban đầu của họ trong khi dự án đang được tiến hành, điều này hoàn toàn ổn hiện nay! Nó sẽ không ổn khi tin rằng ước tính ban đầu sẽ bao gồm những thay đổi này. Nếu khách hàng thay đổi yêu cầu thì cần update estimation để thêm vào những thay đổi này.

**4. THỐNG KÊ**

Trong cuốn sách Manage the Unmanageable Mickey W. Mantle và Ron Lichty tuyên bố rằng trung bình các developer code 55% thời gian của họ và dành thời gian còn lại để giao tiếp với các PM / tech lead, đồng nghiệp, tester, designer và client, thực hiện đánh giá mã, nghiên cứu và chuyển đổi giữa các nhiệm vụ. Nếu chúng ta xem xét toàn bộ dự án, 1/6 thời gian dành code chính và 1/2 cho testing và fix bug. 

## THỰC HÀNH TỐT NHẤT

**1. CHẤP NHẬN SAI SÓT ESTIMATE TRONG CÁCH THỨC TIMELY**

Hoàn toàn ổn khi ước tính ban đầu của bạn sẽ được cập nhật sau giai đoạn tìm hiểu. Khách hàng cung cấp càng nhiều chi tiết, bạn càng có thể đánh giá chính xác hơn thời gian để lên kế hoạch cho từng process. Và bạn càng có thể sớm phát hiện ra phạm vi ban đầu đã thay đổi, vì bạn luôn có thể thảo luận với khách hàng của mình về cách điều chỉnh phạm vi, thay đổi thời hạn milestone hoặc thêm nhiều vai trò hơn vào nhóm dự án của bạn.

Trong trường hợp tốt nhất, PM / tech lead người đầu tiên cần nhận thấy rằng nhóm bị chậm kế hoạch, nhưng trong thực tế, bạn cũng cần nhận thông tin từ các developer. Đặc biệt là trong tình huống khi PM / tech lead tham gia vào nhiều dự án cùng một lúc hoặc quá bận rộn để đi sâu vào từng chi tiết dự án.

**2. TỐC ĐỘ CÁ NHÂN**

Trong thực tế, các dự án không phải lúc nào cũng được thực hiện bởi chính những người estimate chúng. Vì hầu hết các quy trình phát triển ngày nay rất linh hoạt, các nhóm thường mở rộng quy mô tùy thuộc vào tình hình hiện tại và nhu cầu của khách hàng, do đó, rất có thể dự án sẽ được thực hiện bởi những người không tham gia vào ước tính ban đầu hoặc ước tính sơ bộ. Điều đó đặc biệt có liên quan trong các tình huống khi nhà cung cấp mang đến sự trợ giúp bên ngoài để ước tính phạm vi dự án. Như vậy, thông lệ là ước tính số giờ làm việc dựa trên tốc độ trung bình của một mid-level developer trong công ty của bạn.

**3. NGAY LẬP TỨC**

Đừng quên cần một chút thời gian để làm quen với project scope và task của dự án và khám phá các cách giải quyết và các giải pháp khả thi. Do đó luôn có kế hoạch 8-16 giờ thêm cho nghiên cứu trước khi khởi động dự án.

**4.TRÁNH GAPS TRONG CÁC PHƯƠNG PHÁP ESTIMATION**

Nếu bạn chọn cung cấp cho khách hàng của mình 2 cách thức estimate trở lên (ví dụ: thấp và cao, thực tế, bi quan và lạc quan), hãy đảm bảo bạn không đưa ra một sự khác biệt quá lớn về thời gian trong hai phương pháp đề xuất. Sự khác biệt này không nên chiếm hơn 20%! Phạm vi ước tính 200-1.000 giờ sẽ gây sợ hãi và làm nản lòng bất kỳ khách hàng nào. Vì vậy, hãy kiên định và thực tế! Tuy nhiên, một khoảng cách lớn trong phạm vi có thể chấp nhận được với điều kiện bạn có rất ít kiến thức về chi tiết dự án hoặc nếu bạn không thể đánh giá được hiệu suất của thư viện hoặc dịch vụ bên thứ 3.

Các công ty gửi RFP / RFQ theo cách của bạn thường mong đợi mỗi estimate sẽ bao gồm các khía cạnh chính sau: coding, design, analytics, management, QA, unit testing, code review, user manuals, documentation, automation. Luôn xác định phần nào ở trên được bao gồm và phần nào được loại trừ khỏi ước tính của bạn để tránh sự hiểu lầm và các vấn đề trong tương lai với khách hàng.

## TIẾP CẬN DỰ ÁN
Để loại bỏ các lỗi ước tính sơ bộ, chúng ta có thể lôi kéo khách hàng tiềm năng của mình tham gia vào một buổi họp tương tác (1 hoặc 2 ngày) thường được tổ chức tại văn phòng của họ. Cuộc họp này cho phép chúng tôi thu thập càng nhiều chi tiết dự án càng tốt, hoàn toàn thành công giai đoạn khám phá và lên ý tưởng, hỗ trợ đặc tả yêu cầu kỹ thuật và lập kế hoạch cho các milestone. Cách tiếp cận này cho phép chúng ta đưa ra các ước tính chính xác.

*Nguồn: https://intersog.com/blog/tech-tips/how-to-estimate-software-development-project-in-man-hours-realistically/*