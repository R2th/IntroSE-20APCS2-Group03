## Sự khác biệt giữa testing truyền thống và Agile

![](https://images.viblo.asia/d8fe433a-2f5c-4b79-8c74-95d75f269528.jpeg)

Các hoạt động test có liên quan đến các hoạt động phát triển và do đó việc test thay đổi theo các vòng đời khác nhau. Tester phải hiểu sự khác biệt giữa testing trong các mô hình truyền thống (ví dụ: mô hình tuần tự như V-model hoặc mô hình lặp lại như RUP) và Agile để làm việc một cách hiệu quả nhất. Các mô hình Agile khác nhau về cách tích hợp các hoạt động testing và phát triển, sản phẩm dự án, tên, tiêu chí đầu vào và đầu ra được sử dụng cho các cấp độ testing khác nhau, việc sử dụng các công cụ và cách test độc lập có thể được sử dụng một cách hiệu quả.

Tester nên nhớ rằng các nơi khác nhau thường suy nghĩ về cách thực hiện vòng đời phát triển của họ khác nhau. Khả năng thích ứng với bối cảnh của một dự án nhất định, bao gồm cả các công việc phát triển phần mềm phải tuân theo, là yếu tố thành công chính đối với tester.

### 1. Test activity và Phát triển phần mềm

Một trong những điểm khác biệt chính giữa vòng đời truyền thống và vòng đời Agile là ý tưởng về các sprint ngắn, mỗi sprint làm cho phần mềm hoạt động và đưa ra các đợt release cho khách hàng. Khi bắt đầu dự án, có một giai đoạn là lập kế hoạch dự án. Tiếp theo là một chuỗi các sprint. Vào đầu mỗi sprint, phải có cuộc họp sprint planning. Khi xác định scope của sprint, các user story đã chọn sẽ được thực hiện, tích hợp với hệ thống và testing. Các sprint này có thể tuỳ chỉnh, với các hoạt động phát triển, tích hợp và testing diễn ra trong suốt mỗi sprint, hoạt động song song với nhau. Hoạt động test diễn ra trong suốt quá trình lặp lại, chứ không phải thực hiện cuối cùng.

Tester, developer và khách hàng đều có vai trò trong việc testing, như với các vòng đời truyền thống. Các developer thực hiện các unit test khi họ phát triển các tính năng từ các user story. Tester sau đó test các tính năng đó. Khách hàng cũng test các user story trong quá trình thực hiện. Khách hàng có thể viết test case, nhưng họ cũng có thể test đơn giản và sử dụng tính năng đã release để phản hồi nhanh chóng cho nhóm phát triển.

Khi test dựa trên risk được sử dụng như một trong các chiến lược test, phân tích risk nguy hiểm sẽ xảy ra trong quá trình lập kế hoạch release, những tester phân tích kỹ vấn đề đó. Tuy nhiên, các quality risk cụ thể có liên quan đến mỗi sprint được xác định và đánh giá trong việc lập kế hoạch cho sprint. Phân tích risk này có thể ảnh hưởng đến trình tự phát triển cũng như mức độ ưu tiên và độ sâu khi test đối với các tính năng. Nó cũng ảnh hưởng đến việc ước tính nỗ lực testing cần thiết cho từng tính năng.

Trong một số thực hành về Agile (ví dụ: Extreme Programming), pairing được sử dụng. Việc pair có thể liên quan đến việc những tester làm việc cùng nhau để test một tính năng. Việc pair cũng có thể liên quan đến việc tester pair với developer để phát triển và test một tính năng. Việc pair có thể khó khăn khi nhóm tester được phân ra.

![](https://images.viblo.asia/0f58bb42-b3e7-45fd-b84b-7ffcb757d8e8.jpeg)

Tester cũng có thể đóng vai trò là người giám sát về test và chất lượng trong nhóm, chia sẻ kiến ​​thức test và hỗ trợ công việc đảm bảo chất lượng trong nhóm. Điều này thúc đẩy ý thức sở hữu tập thể về chất lượng của sản phẩm.

Tự động hóa test ở tất cả các cấp độ test xảy ra trong nhiều team Agile và điều này có nghĩa là tester dành thời gian để tạo, thực thi, giám sát và duy trì các kết quả và  auto test. Do đa số việc test đều tự động hóa, với tỷ lệ cao hơn khi manual test nên các dự án Agile có xu hướng được thực hiện bằng cách sử dụng các kỹ thuật dựa trên kinh nghiệm và lỗi như tấn công phần mềm, exploratory testing và đoán lỗi. Trong khi các developer sẽ tập trung vào việc tạo các unit test, thì tester nên tập trung vào việc tạo các bài test tích hợp tự động và tích hợp hệ thống. Điều này dẫn đến xu hướng các team Agile ưu tiên những tester có nền tảng kỹ thuật và tự động hóa trong testing vững chắc.

Một nguyên tắc cốt lõi của Agile là sự thay đổi có thể xảy ra trong toàn bộ dự án. Do đó, tài liệu nhẹ nhàng được ưa chuộng trong các dự án Agile. Các thay đổi đối với các tính năng hiện có để test, đặc biệt là regression testing. Việc sử dụng test tự động là một cách để quản lý khả năng test liên quan đến sự thay đổi. Tuy nhiên, điều quan trọng là tốc độ thay đổi không vượt quá khả năng của team dự án để đối phó với những risk liên quan đến những thay đổi đó.

### 2. Các tài liệu dự án

![](https://images.viblo.asia/a5636b16-0b00-4009-b18e-c4735f79d367.png)

Các tài liệu dự án mà những tester Agile quan tâm thường thuộc ba loại:

  1. Các tài liệu business mô tả những gì cần thiết (ví dụ: requirements specifications) và cách sử dụng nó (ví dụ: user documentation)
  2. Các tài liệu phát triển mô tả cách hệ thống được xây dựng (ví dụ: database entityrelationship diagrams), cách triển khai hệ thống (ví dụ: code) hoặc đánh giá các đoạn mã riêng lẻ (ví dụ: unit test)
  3. Các tài liệu test mô tả cách hệ thống được test (ví dụ, test strategies and plans), test hệ thống (ví dụ: manual and automated tests) hoặc trình bày kết quả test (ví dụ: test dashboards)

Trong một dự án Agile điển hình, thông thường tránh tạo ra một lượng lớn tài liệu. Thay vào đó, hãy tập trung nhiều hơn vào việc có phần mềm hoạt động, cùng với các test auto để chứng minh sự tương thích với các yêu cầu. Khuyến khích giảm bớt tài liệu này chỉ áp dụng cho những tài liệu không mang lại giá trị cho khách hàng. Một Agile thành công, cần cân bằng giữa việc tăng hiệu quả bằng cách giảm bớt tài liệu và cung cấp đủ tài liệu để hỗ trợ các khách hàng, testing, phát triển và bảo trì. Team phải đưa ra quyết định trong quá trình lập kế hoạch release về stài liệu nào được yêu cầu và cấp độ của tài liệu là cần thiết.

Các tài liệu business trong các dự án Agile bao gồm các user story và các acceptance criteria. User story là requirement specification và phải giải thích cách hệ thống sẽ hoạt động liên quan đến một tính năng hoặc chức năng duy nhất. User story nên xác định một tính năng đủ nhỏ để hoàn thành trong một sprint. Các tập hợp lớn user story liên quan hoặc tập hợp user story phụ tạo nên một epic. Epic có thể bao gồm các user story cho các nhóm phát triển khác nhau. Ví dụ: một user story có thể mô tả những gì được yêu cầu ở cấp API, trong khi một user story khác mô tả những gì cần thiết ở UI. Những tập hợp này có thể được phát triển qua một nhiều sprint. Mỗi epic và user story phải có acceptance criterial liên quan.

Các tài liệu của developer trong các dự án Agile bao gồm code. Các Agile developer cũng thường viết unit test. Các đoạn test này có thể được tạo sau khi phát triển chức năng.

Các tài liệu của tester trong các dự án Agile bao gồm các auto test, cũng như các tài liệu như test planning, danh mục quality risk, manual test, báo cáo lỗi và nhật ký kết quả test. Các tài liệu được lưu giữ theo kiểu càng nhỏ gọn càng tốt, điều này thường đúng với những tài liệu này trong vòng đời truyền thống. Tester cũng sẽ tạo ra các số liệu test từ các báo cáo lỗi và nhật ký kết quả test.

### 3. Test level

![](https://images.viblo.asia/3727b6c0-d165-4075-87f1-f5cb8994ae05.png)

Test level là các hoạt động test có liên quan về mặt logic.

Trong các mô hình vòng đời tuần tự, các cấp độ test thường được xác định sao cho tiêu chí cuối của một cấp là tiêu chí đầu vào cho cấp tiếp theo. Trong một số mô hình lặp lại, quy tắc này không áp dụng. Test level chồng chéo lên nhau. Đặc tả yêu cầu, đặc tả thiết kế và các hoạt động phát triển phần mềm có thể trùng với các cấp độ test.

Trong một số vòng đời Agile, sự chồng chéo xảy ra do các thay đổi đối với yêu cầu, thiết kế và code có thể xảy ra bất kỳ lúc nào trong một sprint. Trong khi Scrum, về lý thuyết, không cho phép thay đổi các user story sau khi lập kế hoạch lặp lại, nhưng trong thực tế, những thay đổi như vậy đôi khi xảy ra. Trong một sprint, bất kỳ user story cụ thể nào thường sẽ tiến triển tuần tự thông qua các hoạt động testing sau:
  
  - Unit test, thường được thực hiện bởi developer
  - Feature acceptance testing, đôi khi được chia thành hai hoạt động:
    - Feature verification testing, thường được tự động hóa, có thể do developer hoặc tester thực hiện và bao gồm testing dựa trên acceptance criterial của user story
    - Feature validation testing, thường là test thủ công và có thể liên quan đến developer, tester và khách hàng cộng tác để xác định xem tính năng có phù hợp để sử dụng hay không, để cải thiện khả năng hiển thị của tiến trình đã đạt được và nhận được phản hồi thực sự từ khách hàng

Ngoài ra, thường có một quá trình regression testing song song xảy ra trong suốt vòng lặp. Điều này liên quan đến việc chạy lại các auto unit test và các bài test xác minh tính năng từ sprint hiện tại và sprint trước.

Trong một số dự án Agile, có thể có cấp độ System test, cấp độ này bắt đầu sau khi user story đầu tiên đã sẵn sàng.

Các team Agile có thể sử dụng nhiều hình thức acceptance testing khác nhau. Alpha testing và Beta testing có thể xảy ra khi kết thúc mỗi sprint, sau khi hoàn thành mỗi sprint hoặc sau hàng loạt sprint. Các user acceptance testing, operational acceptance testing, acceptance testing theo quy định và acceptance testing hợp đồng cũng có thể xảy ra khi kết thúc mỗi sprint, sau khi hoàn thành mỗi sprint hoặc sau loạt các sprint.

**Tham khảo**:
 - https://www.cabotsolutions.com/agile-vs-traditional-testing-which-is-the-better-choice-infographic#:~:text=However%2C%20Agile%20testing%20follows%20an%20iterative%20approach%20and,traditional%20testing%20has%20comprehensive%20documentation%20for%20future%20record.
 - https://marutitech.com/traditional-testing-vs-agile-testing/
 - https://www.etc-expo.com/difference-between-agile-testing-vs-traditional-testing/
 - https://www.professionalqa.com/traditional-testing-vs-agile-testing