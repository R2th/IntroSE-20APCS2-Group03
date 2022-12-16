# 1. User Acceptance Testing là gì
"Acceptance" nghĩa là chấp nhận/đồng ý. "User" là là người sử dụng phần mềm hoặc người khách hàng yêu cầu làm ra phần mềm đó (client)

User Acceptance Testing (UAT), còn được gọi là Beta Testing hay End-user Testing, được định nghĩa là việc người dùng cuối hoặc khách hàng thực hiện kiểm tra phần mềm để xác định xem nó có được chấp nhận hay không. Đây là thử nghiệm cuối cùng được thực hiện sau khi hoàn thành xong functional testing, system testing và regression testing.

Mục đích chính của thử nghiệm này là xác nhận phần mềm có được thực hiện đúng với business requirement hay không. Việc xác nhận này được thực hiện bởi những người dùng cuối đã quen thuộc với business requirement .

UAT, alpha và  beta testing là các type khác nhau của acceptance testing.

User Acceptance Testing (UAT) là giai đoạn kiểm thử cuối cùng được thực hiện trước khi phần mềm go live nên rõ ràng đây là cơ hội cuối cùng để khách hàng kiểm tra phần mềm và đo lường xem nó có phù hợp với mục đích của mình hay không.

# 2. Khi nào thì UAT được thực hiện
Đây thường là bước cuối cùng trước khi sản phẩm goes live hoặc deliver, được tiến hành sau khi bản thân sản phẩm được kiểm tra kỹ lưỡng (tức là sau khi thực hiện system testing ).

![](https://images.viblo.asia/0e7c7e44-23fb-4fe0-831a-76007230d92d.jpg)

# 3. Ai là người thực hiện UAT
Users hoặc client  - Đây có thể là người đang mua sản phẩm (trong trường hợp là phần mềm thương mại) với các role tương ứng.
# 4. Vì sao cần UAT
Developers và  functional testers là những người phát triển về mặt technical với nhiệm vụ validate phần mềm dựa trên functional specifications. Tuy nhiên có những business requirement và process chỉ có end-user mới biết hoặc bị bỏ sót, hoặc do quá trình trao đổi chưa hiệu quả.

UAT đóng một vai trò quan trọng trong việc xác nhận xem tất cả các yêu cầu nghiệp vụ có được đáp ứng hay không trước khi phát hành phần mềm để sử dụng trên thị trường. Việc sử dụng live data và real use cases làm cho việc kiểm tra này đóng vai trò quan trọng.

Nhiều doanh nghiệp bị thiệt hại lớn do các vấn đề sau khi phát hành do đó mới thấy được tầm quan trọng của UAT. Chi phí để fix những sai sót sau khi release lớn hơn nhiều lần so với trước đó.

Sau khi thực hiện function testing, integration testing và regression testing, người ta sẽ tự hỏi về sự cần thiết của UAT. Thực sự mà nói, đây là giai đoạn quan trọng nhất của dự án vì đây là thời điểm mà những người dùng thực sự sẽ sử dụng hệ thống sẽ xác nhận hệ thống phù hợp với mục đích của nó.

UAT là giai đoạn kiểm tra phần lớn phụ thuộc vào quan điểm của end-users và domain knowledge của một bộ phận đại diện cho người dùng cuối.

Trên thực tế, sẽ thực sự hữu ích cho business teams, nếu họ tham gia vào dự án từ khá sớm, để họ có thể đưa ra quan điểm và đóng góp của mình nhằm giúp sử dụng hiệu quả hệ thống trong thực tế.

# 5. Quy trình thực hiện UAT

Cách dễ nhất để hiểu quy trình này là hãy coi đây là một dự án thử nghiệm độc lập - có nghĩa là nó sẽ có kế hoạch, thiết kế và các giai đoạn thực hiện.

Sau đây là những điều kiện tiên quyết trước khi giai đoạn lập kế hoạch bắt đầu:

## 1) Thu thập key Acceptance Criteria

Nói một cách dễ hiểu, key Acceptance Criteria là một danh sách những thứ sẽ được đánh giá trước khi chấp nhận sản phẩm.

Đây có thể là 2 loại:

**(i)  Application Functionality hoặc Business Related**

Lý tưởng nhất là tất cả business functionality quan trọng phải được xác thực, nhưng do nhiều lý do khác nhau, bao gồm cả thời gian, không thực tế để thực hiện tất cả. Do đó, một hoặc hai cuộc họp với khách hàng hoặc những người dùng sẽ tham gia vào thử nghiệm này có thể cho chúng tôi ý tưởng về mức độ thử nghiệm sẽ tham gia và những khía cạnh nào sẽ được thử nghiệm.

**(ii) Contractual **

Chúng tôi sẽ không đi sâu vào vấn đề này và sự tham gia của nhóm QA trong tất cả những điều này hầu như không có gì. Hợp đồng ban đầu được soạn thảo ngay cả trước khi SDLC bắt đầu được xem xét và đạt được thỏa thuận về việc tất cả các khía cạnh của hợp đồng đã được chuyển giao hay chưa.

Chúng tôi sẽ chỉ tập trung vào chức năng ứng dụng.

## 2) Xác định phạm vi tham gia của QA.

QA có thể có những vai trò sau:

**(i) Không có sự tham gia - Điều này rất hiếm.**

**(ii) Hỗ trợ trong thử nghiệm này - Phổ biến nhất.** Trong trường hợp này, sự tham gia của chúng tôi có thể là đào tạo UAT user về cách sử dụng ứng dụng và ở chế độ chờ trong quá trình thử nghiệm này để đảm bảo rằng chúng tôi có thể giúp người dùng trong trường hợp có bất kỳ khó khăn nào. Hoặc trong một số trường hợp, ngoài việc ở chế độ chờ và hỗ trợ, chúng tôi có thể chia sẻ phản hồi của họ và ghi lại kết quả hoặc ghi lỗi, v.v. trong khi người dùng thực hiện kiểm tra thực tế.

**(iii) Thực hiện UAT và trình bày Kết quả** - user sẽ chỉ ra các khu vực  AUT mà họ muốn đánh giá và bản thân việc đánh giá được thực hiện bởi nhóm QA. Sau khi thực hiện xong, kết quả được trình bày cho khách hàng / người dùng và họ sẽ đưa ra quyết định xem kết quả mà họ có trong tay có đủ hay không và phù hợp với mong đợi của họ để chấp nhận AUT. Quyết định không bao giờ là của nhóm QA.

Tùy thuộc vào từng trường hợp, chúng tôi quyết định cách tiếp cận nào là tốt nhất.

**Mục tiêu và Kỳ vọng chính:**
![](https://images.viblo.asia/e2a68484-2eb5-4169-a8fb-03622fd2013e.jpg)

Thông thường, UAT được thực hiện bởiSubject Matter Expert (SME)  và / hoặc nbusiness user, người có thể là chủ sở hữu hoặc khách hàng của hệ thống đang được thử nghiệm. Tương tự như giai đoạn System testing, giai đoạn UAT cũng bao gồm các giai cụ thể trước khi nó được kết thúc.

Các hoạt động chính của mỗi giai đoạn UAT được xác định dưới đây:

![](https://images.viblo.asia/742954b3-d6af-4e04-9671-dbd5cb15deb4.jpg)

# 6. UAT trong dự án agile
Môi trường agile là một môi trường linh hoạt hơn. Trong agile, business users sẽ tham gia vào suốt các sprint và đóng góp các phản hồi kịp thời

Khi bắt đầu dự án, business users sẽ là những bên liên quan chính để đưa ra requirement và update backlog. Khi kết thúc mỗi sprint, business user sẽ tham gia vào bản demo sprint và sẵn sàng cung cấp bất kỳ phản hồi nào.

Hơn nữa, một giai đoạn UAT sẽ được lên kế hoạch trước khi hoàn thành sprint, nơi business user sẽ thực hiện xác nhận của họ.

Các phản hồi nhận được trong quá trình demo sprint và sprint UAT, được đối chiếu và bổ sung trở lại vào product backlog được liên tục xem xét và ưu tiên. Vì vậy, trong agile, người dùng doanh nghiệp gần gũi hơn với dự án và họ đánh giá phần mềm một cách thường xuyên, không như mô hình waterfall

# 7. Thách Thức Của UAT Và Kế Hoạch Giảm Thiểu
![](https://images.viblo.asia/89d204c4-6d71-4158-b5be-6858f3e374bd.png)

Không quan trọng nếu bạn là một phần của bản phát hành hàng tỷ đô la hay một nhóm khởi nghiệp, bạn nên vượt qua tất cả những thách thức này để cung cấp phần mềm thành công cho người dùng cuối.

## 1) Quá trình thiết lập và triển khai môi trường:

Việc thực hiện thử nghiệm này trong cùng một môi trường được sử dụng bởi nhóm thử nghiệm chức năng chắc chắn sẽ bỏ qua các trường hợp sử dụng trong thế giới thực. Ngoài ra, các hoạt động thử nghiệm quan trọng như thử nghiệm hiệu suất không thể được thực hiện trên môi trường thử nghiệm với dữ liệu thử nghiệm không đầy đủ .

Một khi môi trường UAT được tách khỏi môi trường thử nghiệm, bạn cần kiểm soát release cycle một cách hiệu quả. release cycle không được kiểm soát có thể dẫn đến các phiên bản phần mềm khác nhau trên môi trường thử nghiệm và UAT. Thời gian kiểm tra chấp nhận có giá trị bị lãng phí khi phần mềm không được kiểm tra trên phiên bản mới nhất.

Trong khi đó, thời gian cần thiết để theo dõi sự cố trên phiên bản phần mềm không chính xác là rất cao.

## 2) Lập kế hoạch Kiểm tra:

Việc kiểm tra này cần được lập kế hoạch với một kế hoạch kiểm tra chấp nhận rõ ràng trong giai đoạn phân tích yêu cầu và thiết kế.

Trong strategy planning, tập hợp các trường hợp sử dụng trong thế giới thực phải được xác định để thực hiện. Điều rất quan trọng là xác định các mục tiêu thử nghiệm cho thử nghiệm này vì không thể thực hiện thử nghiệm hoàn chỉnh đối với các ứng dụng lớn trong giai đoạn thử nghiệm này. Kiểm tra nên được thực hiện bằng cách ưu tiên các mục tiêu kinh doanh quan trọng trước.

Thử nghiệm này được thực hiện vào cuối chu kỳ thử nghiệm. Rõ ràng, đây là giai đoạn quan trọng nhất đối với việc phát hành phần mềm. Sự chậm trễ trong bất kỳ giai đoạn phát triển và thử nghiệm nào trước đó sẽ tiêu tốn thời gian của UAT.

Lập kế hoạch kiểm thử không đúng, trong trường hợp xấu nhất, dẫn đến sự chồng chéo giữa kiểm thử hệ thống và UAT. Do ít thời gian và áp lực để đáp ứng thời hạn, phần mềm được triển khai tới môi trường này ngay cả khi việc kiểm tra chức năng chưa hoàn thành. Các mục tiêu cốt lõi của thử nghiệm này không thể đạt được trong những tình huống như vậy.

Kế hoạch kiểm tra UAT nên được chuẩn bị và thông báo cho nhóm kỹ lưỡng trước khi bắt đầu kiểm tra này. Điều này sẽ giúp họ lập kế hoạch kiểm thử, viết các trường hợp kiểm thử & kịch bản kiểm thử và tạo môi trường UAT.

##  3) Xử lý các  new business requirements như là incidents/defects:

Sự mơ hồ trong các yêu cầu bị mắc kẹt trong giai đoạn UAT. Người kiểm tra UAT tìm thấy các vấn đề phát sinh do các yêu cầu không rõ ràng (bằng cách xem giao diện người dùng hoàn chỉnh không có sẵn trong giai đoạn thu thập yêu cầu) và ghi lại nó như là bug

Khách hàng mong đợi những điều này sẽ được khắc phục trong bản phát hành hiện tại mà không tính đến thời gian cho các yêu cầu thay đổi. Nếu ban quản lý dự án không đưa ra quyết định kịp thời về những thay đổi vào phút cuối này, thì điều này có thể dẫn đến việc phát hành không thành công.

## 4) Người kiểm tra chưa có kinh nghiệm hoặc người kiểm tra không có business knowledge:

Khi không có đội ngũ thường trực, công ty lựa chọn nhân viên UAT từ các bộ phận nội bộ khác nhau.

Ngay cả khi nhân viên đã quen thuộc với business knowledge hoặc nếu họ không được đào tạo cho các yêu cầu mới đang được phát triển, họ không thể thực hiện UAT hiệu quả. Ngoài ra, non-technical business team có thể gặp nhiều khó khăn về kỹ thuật trong việc thực hiện các trường hợp kiểm thử.

Trong khi đó, việc chỉ định tester vào cuối chu kỳ UAT không thêm bất kỳ giá trị nào cho dự án. Ít thời gian để đào tạo nhân viên UAT có thể làm tăng đáng kể cơ hội thành công của UAT.

## 5) Kênh giao tiếp không phù hợp:

Việc liên lạc giữa nhóm phát triển, kiểm tra và UAT từ xa trở nên khó khăn hơn. Việc liên lạc qua email thường rất khó khăn khi bạn có một đội công nghệ ở nước ngoài. Một sự không rõ ràng nhỏ trong báo cáo sự cố có thể trì hoãn việc khắc phục sự cố trong một ngày.

Lập kế hoạch phù hợp và giao tiếp hiệu quả là rất quan trọng để hợp tác nhóm hiệu quả. Các nhóm dự án nên sử dụng một công cụ dựa trên web để ghi lại các bug và câu hỏi. Điều này sẽ giúp phân phối khối lượng công việc đồng đều và tránh báo cáo các vấn đề trùng lặp.

##  6) Yêu cầu  Functional test team thực hiện kiểm tra này:

Không có tình huống nào tồi tệ hơn việc yêu cầu  Functional test team thực hiện UAT.

Khách hàng giao trách nhiệm của họ cho  Functional test team do thiếu nguồn lực. Toàn bộ mục đích của thử nghiệm này sẽ bị tổn hại trong những trường hợp như vậy. Khi phần mềm đi vào hoạt động, người dùng cuối sẽ nhanh chóng phát hiện ra các vấn đề mà Functional test team không coi là kịch bản trong thế giới thực.

Một giải pháp cho điều này là giao việc kiểm tra này cho những người kiểm tra chuyên dụng và có kỹ năng có business knowledge

## 7) Blame Game-Trò chơi đổ lỗi

Đôi khi người dùng doanh nghiệp chỉ cố gắng tìm lý do để từ chối phần mềm. Đó có thể là để thể hiện họ vượt trội như thế nào hoặc đổ lỗi cho development và testing team  để nhận được sự tôn trọng trong business team. Điều này rất hiếm xảy ra nhưng lại xảy ra ở những đội có chính trị nội bộ.

Rất khó để đối phó với những tình huống như vậy. Tuy nhiên, xây dựng mối quan hệ tích cực với business team chắc chắn sẽ giúp tránh trò chơi đổ lỗi.

Tôi hy vọng những nguyên tắc này chắc chắn sẽ giúp bạn thực hiện kế hoạch chấp nhận người dùng thành công bằng cách vượt qua nhiều thách thức khác nhau. Lập kế hoạch, giao tiếp, thực thi và đội ngũ có động lực phù hợp là chìa khóa để kiểm tra sự chấp nhận của người dùng thành công.

## 8) System Testing và User Acceptance Testing
Sự tham gia của testing team bắt đầu khá sớm trong dự án ngay từ giai đoạn phân tích yêu cầu.

Trong suốt vòng đời của dự án, một số loại xác nhận được thực hiện cho dự án: Static testing, Unit testing, System testing, integration testing, end to end testing,  regression testing... Điều này giúp chúng ta hiểu rõ hơn về thử nghiệm được thực hiện trong giai đoạn UAT và nó khác với thử nghiệm khác được thực hiện trước đó như thế nào.

Mặc dù chúng tôi nhận thấy sự khác biệt trong SIT và UAT, nhưng điều quan trọng là chúng tôi phải tận dụng sự hiệp lực nhưng vẫn duy trì sự độc lập giữa cả hai giai đoạn để giúp thời gian đưa ra thị trường nhanh hơn.

![](https://images.viblo.asia/b5a2dc4c-a9e8-4c4a-ba2e-71f89ad2fef7.jpg)

# 8. Phần Kết Luận
#1) UAT không phải về các page, fields hoặc button. Giả định cơ bản ngay cả trước khi thử nghiệm này bắt đầu là tất cả những thứ cơ bản đó đã được thử nghiệm và đang hoạt động tốt. Việc user tìm thấy một lỗi cơ bản như thế là một điều cấm kị cho QA

#2) Thử nghiệm này là về thực thể là yếu tố chính trong doanh nghiệp.

Để tôi cho bạn một ví dụ: Nếu AUT là một hệ thống bán vé, thì UAT sẽ không sử dụng, tìm kiếm menu mở ra một trang, v.v. Đó là về vé và đặt chỗ của họ, các trạng thái mà nó có thể thực hiện , hành trình của nó qua hệ thống, v.v.

Một Ví dụ khác , nếu trang web là một trang web đại lý ô tô, thì trọng tâm là “ô tô và doanh số bán hàng của nó” chứ không thực sự là trang web. Do đó, hoạt động kinh doanh cốt lõi là những gì được xác minh và xác thực và ai là người làm việc đó tốt hơn các chủ doanh nghiệp. Đó là lý do tại sao thử nghiệm này có ý nghĩa nhất khi khách hàng tham gia ở một mức độ chính.

#3) UAT cũng là một hình thức kiểm tra cốt lõi của nó, có nghĩa là cũng có cơ hội tốt để xác định một số lỗi ở giai đoạn này . Nó đôi khi xảy ra. Bên cạnh thực tế là nhóm QA sẽ leo thang nghiêm trọng, các lỗi UAT thường có nghĩa là một cuộc họp để ngồi và thảo luận về cách xử lý chúng vì sau quá trình kiểm tra này thường không có thời gian để sửa và kiểm tra lại.

Quyết định sẽ là:

Đẩy ngày ra mắt, khắc phục sự cố trước rồi tiếp tục.
Để lại lỗi như nó vốn có.
Hãy coi nó như một phần của yêu cầu thay đổi cho các bản phát hành trong tương lai.

#4) UAT được phân loại là thử nghiệm Alpha và Beta, nhưng việc phân loại đó không quá quan trọng trong bối cảnh của các dự án phát triển phần mềm điển hình trong ngành dựa trên dịch vụ.

Thử nghiệm alpha là khi UAT được thực hiện trong môi trường của người xây dựng phần mềm và có ý nghĩa hơn trong bối cảnh phần mềm đã được thương mại hóa.
Thử nghiệm beta là khi UAT được thực hiện trong môi trường sản xuất hoặc môi trường của khách hàng. Điều này phổ biến hơn đối với các ứng dụng hướng tới khách hàng. Người dùng ở đây là những khách hàng thực tế như bạn và tôi trong bối cảnh này.

#5) Hầu hết thời gian trong một dự án phát triển phần mềm thông thường, UAT được thực hiện trong môi trường QA nếu không có môi trường dàn dựng hoặc UAT.

Nói tóm lại, cách tốt nhất để tìm hiểu xem sản phẩm của bạn có được chấp nhận và phù hợp với mục đích hay không là thực sự đưa sản phẩm đó ra trước mặt người dùng.

Trong môi trường Agile, người dùng doanh nghiệp ngày càng tham gia nhiều hơn và các dự án đang được nâng cao và chuyển giao thông qua các vòng phản hồi. Tất cả đang được thực hiện, giai đoạn Chấp nhận người dùng được coi là cổng để bắt đầu thực hiện và sản xuất.

Nguồn: https://www.softwaretestinghelp.com/what-is-user-acceptance-testing-uat/