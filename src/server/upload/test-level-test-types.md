# 1. Test level 

## 1.1. Unit Testing
**Unit Testing** (kiểm thử đơn vị) là một mức kiểm thử phần mềm với mục đích để xác nhận từng unit của phần mềm được phát triển đúng như được thiết kế. Unit testing là mức test nhỏ nhất trong bất kỳ phần mềm nào. các hàm (Function), thủ tục (Procedure), lớp (Class), hoặc các phương thức (Method) đều có thể được xem là Unit. Nó thường có một hoặc vài đầu vào nhưng đầu ra là duy nhất.

**Unit testing** được thực hiện bởi lập trình viên và là white box testing. Được thực hiện càng sớm càng tốt trong giai đoạn viết code và xuyên suốt quá trình phát triển phần mềm.

**Mục đích**: 

- Tăng sự đảm bảo khi có sự thay đổi mã

- Code dễ sử dụng, dễ hiểu có thể tái sử dụng 

- Chi phí sửa chữa thấp hơn các giai đoạn sau

- Dễ dàng sửa lỗi hơn

## 1.2. Integration Testing

**Integration Testing** ( kiểm thử tích hợp) là thực hiện kiểm thử tích hợp 1 nhóm mô đun riêng lẻ với nhau. Một hệ thống phần mềm bao gồm nhiều module được code bởi nhiều người khác nhau. Tích hợp kiểm thử tập trung vào việc truyền dữ liệu giữa các module với nhau. 

- Kiểm thử tích hợp được thực hiện để phát hiện các lỗi về giao diện hoặc trong tương tác giữa các thành phần hoặc hệ thống tích hợp.

- Kiểm thử tích hợp thành phần: kiểm tra sự tương tác giữa các thành phần với điều kiện các thành phần đã pass ở phần kiểm thử thành phần trước đó.

- Kiểm thử tích hợp hệ thống: kiểm tra sự tương tác giữa các hệ thống con khác nhau và các hệ thống này đã pass ở lần kiểm thử trước đó.

- Được thực hiện bởi developer, một test team chuyên biệt hay một nhóm chuyên developer/kiểm thử viên tích hợp bao gồm cả kiểm thử phi chức năng và được thực hiện sau Unit Testing và trước System Testing.

**Một số phương pháp kiểm thử tích hợp**:

**BIGBANG**

![](https://images.viblo.asia/4b007472-35a7-483b-ac45-0ded30f592ac.PNG)
Hình 1.1. Bigbang Integration Testing

Đây là phương pháp test tích hợp mà tất cả hoặc hầu hết các unit được kết hợp với nhau và cùng được kiểm thử. Phương pháp này được thực hiện khi team kiểm thử nhận được toàn bộ phần mềm.

**Ưu điểm**: phù hợp với các dự án nhỏ

**Nhược điểm**: có thể bỏ qua các bug giao diện nhỏ trong quá trình tìm bug, mất thời gian cho tích hợp hệ thống nên không có thời gian cho test.

**TOP DOWN**
![](https://images.viblo.asia/290cec13-bfbe-4b6d-b893-16341fb775ef.PNG)
Hình 1.2. Top Down Testing

Kiểm thử được thực hiện từ trên xuống dưới. Đơn vị cao nhất được kiểm thử đầu tiền, đơn vị thấp hơn được kiểm thử sau đó một cách tuần tự.

**Ưu điểm**: thu gọn bug dễ dàng hơn, module quan trọng được kiểm thử đầu tiên lỗi trong thiết kế lớn có thể được tìm thấy và cố định đầu tiên.

**Nhược điểm**: module ở mức độ thấp hơn sẽ được kiểm tra không đầy đủ

**BOTTOM UP** 
![](https://images.viblo.asia/306a494e-e8d6-47b9-aac9-94af530c071f.PNG)


Hình 1.3. Bottom up Testing

Kiểm thử được thực hiện từ dưới lên trên. Đơn vị thấp nhất được kiểm thử đầu tiền, đơn vị cao hơn được kiểm thử sau đó.

**Ưu điểm**: thu gọn bug dễ dàng hơn, không mất thời gian để đợi các module được tích hợp.

**Nhược điểm**: module quan trọng của hệ thống có thể dễ bị lỗi, không giữ được nguyên mẫu ban đầu của hệ thống.

**SANDWICH** 


![](https://images.viblo.asia/d4a13c3a-04cb-4eee-b83e-3a4b01fac311.PNG)

Hình 1.4. Sandwich Testing

Sandwich là một cách tiếp cận để kiểm thử tích hợp, đó là sự kết hợp của các phương pháp Top Down và Bottom Up.

## 1.3. System Testing

**System testing** (kiểm thử hệ thống) là thực hiện kiểm thử một hệ thống đã được tích hợp hoàn chỉnh để đảm bảo nó hoạt  động đúng yêu cầu.

Kiểm thử hệ thống là kiểm thử hộp đen và được tập trung vào chức năng của hệ thống. Kiểm tra các chức năng và giao diện, các hành vi của hệ thống một cách hoàn chỉnh đáp ứng đúng với yêu cầu. 

Mục đích của giai đoạn này là để đánh giá sự hoạt động của hệ thống có đúng theo như tài liệu đặc tả và được thực hiện bởi các tester.

## 1.4. Acceptance Testing

Kiểm thử chấp nhận chính thức liên quan đến yêu cầu và quy trình kinh doanh để xác định liệu hệ thống có đáp ứng tiêu chí chấp nhận hay không và cho phép người dùng, khách hàng hoặc tổ chức được ủy quyền khác xác định có chấp nhận hệ thống hay không.

Kiểm thử chấp nhận là mức thứ 4 được thực hiện sau khi hoàn thành kiểm thử hệ thống và trước khi đưa sản phẩm vào sử dụng chính thức. Với mục đích đảm bảo phần mềm đáp ứng đúng yêu cầu của khách hàng. Sản phẩm nhận được sự chấp nhận từ khách hàng/ người dùng cuối.

Kiểm thử chấp nhận được chia thành 2 mức khác nhau

- Kiểm thử alpha: được thực hiện tại nơi phát triển phần mềm bởi những người trong tổ chức nhưng không tham gia phát triển phần mềm.

- Kiểm thử beta: được thực hiện tại bởi khách hàng/ người dùng cuối tại địa điểm của người dùng cuối.

# 2. Test type

## 2.1 Smoke test

**Smoke Testing** là 1 quá trình để kiểm tra liệu build đã triển khai ổn định hay không? Để xác nhận liệu QA team có thể tiếp tục với further testing hay không? Các Smoke Testing là 1 thiết lập các bài test tối thiểu chạy trên mỗi bản build.

**Smoke Testing** là quá trình mà phần mềm build đã được triển khai tới môi trường QA và đã được kiểm tra độ ổn định của ứng dụng. Nó cũng được gọi là “Build verification testing”.

**Smoke testing** bao gồm hầu hết các chức năng chính của phần mềm nhưng không có chức năng nào sâu. Kết quả của thử nghiệm này được sử dụng để quyết định có nên tiến hành thử nghiệm thêm hay không. Nếu bài test này qua, sẽ tiếp tục với test chức năng. Nếu thất bại, tạm dừng các bài test tiếp theo và yêu cầu bản build mới với các bản sửa lỗi được yêu cầu. Nếu một ứng dụng bị hỏng nặng, việc kiểm tra chi tiết có thể gây lãng phí thời gian và công sức.

**Smoke Testing** được thực hiện bất cứ khi nào các chức năng mới của phần mềm được phát triển và tích hợp với bản build hiện hành mà được triển khai trong môi trường QA/staging. Nó đảm bảo rằng tất cả các chức năng quan trọng đang hoạt động chính xác hay không.

**Smoke Testing** được thực hiện bởi các kỹ sư QA/QA lead. Bất cứ khi nào có 1 bản build mới, QA team xác định chức năng chính trong ứng dụng để thực hiện Smoke Testing. QA team kiểm tra các danh mục liên quan trong ứng dụng mà đang được test. Các bài test được thực hiện trong môi trường dev trên code để đảm bảo tính chính xác của ứng dụng trước khi release bản build tới QA.

**Smoke Testing** thường được thực hiện thủ công mặc dù nó có thể thực hiện tương tự qua automation.

**Manual Smoke Testing**: Nhìn chung, Smoke Testing được thực hiện thủ công. Khi build được release tới QA, các test case của các chức năng có độ ưu tiên cao được thực hiện và kiểm tra để tìm ra các lỗi quan trọng trong hệ thống. Nếu các test pass, chúng ta sẽ tiếp tục với functional testing. Nếu các bài test fail, build sẽ bị hủy bỏ và gửi ngược lại dev team để chỉnh sửa. Smoke Testing được thực hiện trên build mới và sẽ được tích hợp với các build cũ để duy trì sự chính xác của hệ thống. Trước khi thực hiện Smoke Testing, QA team sẽ kiểm tra tính chính xác của các phiên bản build.

**Automation Smoke Testing**: Thay vì việc phải lặp đi lặp lại các bài test thủ công khi software build mới được triển khai, các smoke test case được ghi lại được thực hiện lại với build. Nó xác định xem các chức năng chính vẫn hoạt động đúng hay không. Nếu bài test fail, sau đó họ có thể chỉnh sửa build và triển khai build lại ngay lập tức. Bằng cách này chúng ta có thể tiết kiệm thời gian và đảm bảo chất lượng build tới môi trường QA.

![](https://images.viblo.asia/424fbcdb-fa2f-4f90-985a-e6d72b48013d.PNG)

Hình 2.1. Quy trình Smoke Testing

**Ưu điểm của Smoke Testing**:

- Các lỗi quan trọng được phát hiện sớm ngay từ đầu giảm thiểu rủi ro và chi phí cho việc sửa chữa lỗi.

- Cải thiện chất lượng hệ thống và tối ưu hiệu quả thời gian của việc test.

## 2.2. Functional Testing

**Kiểm thử chức năng** là một loại kiểm thử hộp đen (black box) và test case của nó được dựa trên đặc tả của ứng dụng phần mềm/thành phần đang test. Các chức năng được test bằng cách nhập vào các giá trị nhập và kiểm tra kết quả đầu ra, và ít quan tâm đến cấu trúc bên trong của ứng dụng.

Kiểm thử chức năng là một trong số 4 loại kiểm thử chính thuộc level kiểm thử thứ 2- Kiểm thử tích hợp (Integration Test) trong kiểm thử phần mềm.

**Mục đích của Functional Testing**: kiểm thử chức năng chỉ ra rằng chương trình không tương thích với các đặc tả bên ngoài của nó.

**Lợi ích của việc kiểm thử chức năng**: tránh kiểm thử dư thừa và ngăn chặn sự quan tâm nhiều vào quá nhiều loại lỗi tại từng thời điểm.

**Các kỹ thuật trong kiểm thử chức năng**: 

Kỹ thuật phân vùng  tương đương
Kỹ thuật dùng bảng quyết định
Kỹ thuật phân tích giá trị biên 
Đoán lỗi 

**Kiểm thử chức năng bao gồm 5 bước**: 

- Xác định các chức năng mà phần mềm mong muốn sẽ thực hiện.

- Tạo ra các dữ liệu đầu vào dựa trên các tài liệu đặc tả kỹ thuật của các chức năng.

- Xác định kết quả đầu ra dựa trên các tài liệu đặc tả kỹ thuật của các chức năng.

- Thực hiện các trường hợp kiểm thử.

- So sánh kết quả thực tế và kết quả mong muốn. 

## 2.3. Usability Testing 

**Usability Testing** (kiểm thử tính khả dụng) là một kỹ thuật kiểm thử hộp đen để xác định sản phẩm của bạn có thân thiện với người dùng hay không. Kiểm thử tính khả dụng thường được thực hiện trong System Testing và Acceptance Testing.

**Usability testing bao gồm 5 phần chính**:

● Learnability (Khả năng có thể học được): Bạn có thể học cách dùng phần mềm nhanh đến mức nào? 

● Efficiency (Hiệu quả): Bạn có thể thực hiện công việc mong muốn nhanh đến mức nào?

● Memorability (Khả năng ghi nhớ): Bạn có thể nhớ cách dùng phần mềm đó nhanh đến mức nào?

● Errors (Lỗi): Mức độ thường xuyên mà bạn gặp lỗi trong phần mềm đó là như thế nào?

● Satisfaction (Mức độ hài lòng): Bạn thích dùng phần mềm đó đến mức nào?

Sau khi xác định được 5 thành phần chính trên, bạn hoàn toàn có thể xác định được:

● Tính năng cần đưa vào sản phẩm là gì? 

● Làm thế nào để các tính năng sử dụng dễ dàng hơn, đem lại cảm giác dễ chịu cho người dùng? 

● Tính năng hữu ích là gì?

**Ai là người thực hiện Usability Testing?** 

Những người tham gia thử nghiệm nên là đại diện của những người dự định sử dụng sản phẩm của bạn hoặc là những người có hành vi, kỹ năng, kiến thức liên quan đến sản phẩm mà bạn đang phát triển. Để trả lời được câu hỏi “Ai sẽ là người thực hiện usability testing?” bạn cần trả lời các câu hỏi như sau:

● Liên quan: Ứng dụng của bạn có liên quan tới người dùng thử nghiệm không?

● Tần suất sử dụng: Người dùng này có thường xuyên sử dụng ứng dụng của bạn trong công việc mà người đó làm hay không?

● Nhân khẩu học: Sự khác biệt văn hoá là một yếu tố quan trọng đối với trải nghiệm của người dùng. Tập trung vào nơi ở, tuổi, giới tính khi lựa chọn người dùng mẫu.

● Mức thu nhập: Những người dùng này có sẵn sàng trả tiền để sử dụng ứng dụng/dịch vụ của bạn không? Bao gồm cả khả năng tài chính và thói quen mua sắm.

**Khi nào nên thực hiện Usability Testing?**

Usability testing được khuyến khích sử dụng sớm – ngay từ những giai đoạn đầu tiên của mô hình phát triển phần mềm và thực hiện xuyên suốt những giai đoạn sau đó.

**Ưu điểm**: 

● Giúp phát hiện sớm các vấn đề về khả năng sử dụng trước khi sản phẩm được bán ra thị trường.

● Cải thiện sự hài lòng của người dùng.

● Giúp đem lại cảm giác dễ chịu cho người dùng cuối khi sử dụng sản phẩm. Nhờ đó sản phẩm được đánh giá cao hơn.

● Giúp thu thập thông tin phản hồi từ đúng đối tượng mục tiêu sẽ sử dụng sản phẩm của bạn chứ không phải những người dùng ngẫu nhiên.

**Nhược điểm**: khá tốn kém nguồn lực(thời gian, nhân lực…) và chi phí để thực hiện.

## 2.4. Security Testing


Kiểm thử bảo mật là một phần mở rộng của kiểm thử tiêu cực. Nó tập trung vào những giá trị đầu vào không hợp lệ và liệu những đầu vào này có khả năng tạo ra những thất bại đáng kể liên quan đến các yêu cầu nhất định của sản phẩm đang được kiểm thử hay không. Ta cần đưa ra đầy đủ chứng cứ để chứng minh với khách hàng rằng hệ thống và những thông tin hệ thống của họ được đảm bảo an toàn và bảo mật trước những đầu vào không hợp lệ là một phần vô cùng quan trọng trong kiểm thử bảo mật.

Có bốn lĩnh vực trọng tâm chính được xem xét trong thử nghiệm bảo mật (Đặc biệt đối với các trang web / ứng dụng):

- Network security (bảo mật mạng): Điều này liên quan đến việc tìm kiếm các lỗ hổng trong cơ sở hạ tầng mạng (tài nguyên và chính sách).

- System software security (bảo mật phần mềm hệ thống): Điều này liên quan đến việc đánh giá các điểm yếu trong các phần mềm khác nhau (hệ điều hành, hệ thống cơ sở dữ liệu và phần mềm khác) mà ứng dụng phụ thuộc vào.

- Client-side application security (bảo mật ứng dụng phía máy khách): Điều này liên quan đến việc đảm bảo rằng máy khách (trình duyệt hoặc bất kỳ công cụ nào như vậy) không thể bị thao túng.

- Server-side application security (bảo mật ứng dụng phía máy chủ): Điều này liên quan đến việc đảm bảo rằng mã máy chủ và các công nghệ của nó đủ mạnh để chống lại mọi sự xâm nhập.


## 2.5. Performance Testing


**Performance Testing** là một loại kiểm thử nhằm xác định mức độ đáp ứng, băng thông, độ tin cậy và/hoặc khả năng mở rộng của hệ thống dưới một khối lượng làm việc/truy cập nhất định. 

Performance Testing thường được sử dụng để:

- Đánh giá mức độ sẵn sàng của sản phẩm

- Đánh giá dựa vào các tiêu chí hiệu suất

- So sánh giữa các đặc tính hiệu suất của đa hệ thống hoặc cấu hình hệ thống

- Tìm ra nguồn gốc của các vấn đề về hiệu suất

- Hỗ trợ điều chỉnh hệ thống

- Tìm các mức độ băng thông

**Tại sao cần phải thực hiện Performance Testing?**

- Đánh giá sự sẵn sàng phát hành:
Cho phép bạn dự đoán hoặc ước tính các đặc tính hiệu suất của một ứng dụng trong sản xuất và đánh giá có hay không thực hiện kiểm tra hiệu suất dựa trên những dự đoán đó. Những dự đoán này cũng có giá trị để các bên liên quan đưa ra quyết định về việc liệu một ứng dụng đã sẵn sàng để phát hành hoặc khả năng xử lý tăng trưởng trong tương lai, hoặc nó cần phải cải thiện hiệu suất/phần cứng trước khi phát hành.

- Cung cấp dữ liệu cho thấy khả năng của người dùng không hài lòng với hiệu suất của hệ thống.
Cung cấp dữ liệu để hỗ trợ trong việc dự đoán các tổn thất doanh thu hay uy tín thương hiệu do khả năng mở rộng, khả năng ổn định hoặc do người dùng không hài lòng với thời gian phản hồi của ứng dụng.

Đánh giá cơ sở hạ tầng:

- Đánh giá sự phù hợp của hiệu suất hiện tại

- Xác định khả năng ổn định

- Xác định năng lực của cơ sở hạ tầng của ứng dụng, cũng như xác định các nguồn lực cần thiết trong tương lai để cung cấp hiệu suất chấp nhận được.

So sánh cấu hình của các hệ thống khác nhau để xác định hoạt động tốt nhất cho ứng dụng và doanh nghiệp

Thẩm định việc áp dụng các đặc tính hiệu suất mong muốn trong ràng buộc sử dụng ngân sách nguồn lực.

Đánh giá đầy đủ về hiệu suất phần mềm:

- Xác định đặc tính hiệu suất mong muốn của phần mềm trước và sau khi thay đổi.

- Cung cấp các so sánh giữa các đặc tính hiệu suất hiện tại và ứng dụng mong muốn.

Nâng cao hiệu quả hoạt động:

- Phân tích hành vi của ứng dụng tại các mức tải khác nhau.

- Xác định các vướng mắc trong việc áp dụng.

- Cung cấp các thông tin liên quan đến tốc độ, khả năng mở rộng và sự ổn định của sản phẩm trước khi phát hành, do đó cho phép bạn đưa ra quyết định về việc khi nào sẽ điều chỉnh hệ thống.

**Một số loại kiểm thử hiệu năng**: 

**Load test** (Kiểm thử tải): là một loại kiểm thử hiệu năng được thực hiện để đánh giá hành vi của một hệ thống khi tăng khối lượng công việc.

**Stress test** (Kiểm thử độ bền): là một loại kiểm tra hiệu suất được thực hiện để đánh giá hành vi của một hệ thống ở hoặc vượt quá giới hạn khối lượng công việc dự kiến của nó.

**Endurance testing**: Mục tiêu để đảm bảo phần mềm có thể xử lý tải dự kiến trong một khoảng thời gian dài.

**Spike testing** : Mục tiêu để kiểm tra phản ứng của phần mềm đối với các thay đổi lớn đột ngột trong tải do người dùng tạo.

## 2.6. Regression Testing

Phần mềm được nâng cấp, sẽ có những phiên bản mới hơn phiên bản hiện tại, có những tính năng được thêm mới, có những tính năng được mở rộng,vv… Tuy nhiên, theo thời gian điều này có thể dẫn đến sự mất ổn định của ứng dụng.

Trong quá trình kiểm thử hồi quy, các trường hợp kiểm thử mới không được tạo nhưng các trường hợp kiểm thử được tạo trước đó được thực hiện lại.

Kiểm thử hồi quy có thể được thực hiện trong bất kỳ cấp độ kiểm tra nào (Đơn vị, Tích hợp, Hệ thống hoặc Chấp nhận) nhưng chủ yếu liên quan trong kiểm thử hệ thống. Kiểm thử hồi quy toàn bộ là không thể nên chỉ tập trung kiểm thử hồi quy vào các chức năng chính của hệ thống.

- Dựa vào những yếu tố sau để xác định được mức độ của Regression Testing:

- Dựa vào kinh nghiệm và sự hiểu biết với ứng dụng.

- Việc thảo luận với các developer.

Những nơi mà sự thay đổi được thực hiện. 

Ví dụ: Nếu sự thay đổi được thực hiện trên trang chủ, thì cần phải quan tâm nhiều hơn so với những trang có lượt truy cập ít hơn.

Dựa trên tình hình (thời gian và nguồn lực sẵn có), mức độ nghiêm trọng của sự thay đổi (mức độ ảnh hưởng của nó), đầu vào... sẽ hiệu quả hơn khi bạn lựa chọn đúng một bộ kiểm thử so với việc kiểm thử toàn bộ:

- Unit regression nghĩa là bạn chỉ cần thực hiện retest đối với sự thay đổi ở module hoặc vùng nào đó của ứng dụng.

- Partial regression nghĩa là bạn sẽ thực hiện retest đối với sự thay đổi ở các module kèm theo những tương tác với nó.

- Full regression là bạn sẽ phải kiểm tra lại toàn bộ ứng dụng, không phụ thuộc vào vị trí của sự thay đổi.

# Kết Luận 

Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về Test level, Test Types . Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn về Test level, Test Types và áp dụng vào công việc bạn đang làm. Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học, tìm hiểu một cách tốt nhất!

Tài liệu tham khảo:https://reqtest.com/testing-blog/different-levels-of-testing/
https://www.softwaretestinghelp.com/types-of-software-testing/