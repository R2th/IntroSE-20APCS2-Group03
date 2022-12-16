Trong kiểm thử phần mềm, người kiểm thử thực hiện nhiều cấp độ kiểm thử khác nhau. Từ unit testing đến acceptance testing, đảm bảo rằng tất cả các thành phần của sản phẩm được kiểm tra kỹ lưỡng, không có bất kỳ trở ngại nào. Được thực hiện sau khi  integration testing và trước khi acceptance tests, system test là một trong những cấp độ kiểm thử phần mềm, sẽ được thảo luận chi tiết bên dưới.

## 1. System test là gì?
Kiểm thử hệ thống là một phương pháp theo dõi và đánh giá hành vi của sản phẩm hoặc hệ thống phần mềm hoàn chỉnh và đã được tích hợp đầy đủ, dựa vào đặc tả và các yêu cầu chức năng đã được xác định trước. Đó là giải pháp cho câu hỏi "Liệu hệ thống hoàn chỉnh có hoạt động đúng với yêu cầu hay không?"

System test được thử nghiệm trong hộp đen, tức là chỉ có các tính năng làm việc bên ngoài của phần mềm được đánh giá trong quá trình thử nghiệm này. Nó không đòi hỏi bất kỳ kiến thức nội bộ nào về codinh, lập trình, thiết kế, v.v. và hoàn toàn dựa trên quan điểm của người dùng.
## 2. Đặc điểm của System test:
* Trong Vòng đời phát triển phần mềm (SDLC), đây là thử nghiệm thực hiện nhiệm vụ kiểm tra toàn bộ phần mềm hoặc hệ thống.
* Đánh giá chức năng của hệ thống hoàn chỉnh theo yêu cầu chức năng được quyết định trước.
* Cùng với các yêu cầu chức năng, nó cũng xác minh và xác nhận các yêu cầu nghiệp vụ và kiến trúc của phần mềm.
* Staging server có thể hoạt động như một môi trường để thực hiện thử nghiệm.
* Một loại thử nghiệm hộp đen.
* Nó có thể bao gồm, cả thử nghiệm chức năng và phi chức năng.
* Giảm sự cố và bảo trì sau khi triển khai.
* Yêu cầu đội ngũ thử nghiệm độc lập với nhóm phát triển.
## 3. Khi nào thực hiện System Testing?
Như đã nêu trước đó, vòng đời kiểm thử phần mềm bao gồm nhiều cấp độ kiểm thử khác nhau, điều này khiến chúng ta phải hiểu khi nào, trong STLC mà system testing được thực hiện bởi những người kiểm thử. Dưới ây là các tình huống khi người kiểm thử có thể thực hiện system testing, bằng tay hoặc với sự hỗ trợ của các công cụ kiểm tra.
* Sau khi hoàn thành unit & integration testing.
* Trước khi bắt đầu acceptance testing
* Sau khi tích hợp hoàn toàn các mô-đun.
* Sau khi hoàn thành quy trình phát triển phần mềm, dựa trên đặc tả yêu cầu phần mềm (SRS).
* Sau khi môi trường thử nghiệm sẵn sàng.
## 4. Các lĩnh vực chính của System testing
Một số khía cạnh, trong đó system testing tập trung vào:
* Hiệu suất: Đảm bảo rằng hệ thống phần mềm thực hiện theo yêu cầu của người dùng, mà không xuất hiện bất kỳ lỗi hoặc sự cố nào.
* Bảo mật: Bảo vệ sản phẩm khỏi mọi vi phạm bảo mật, đánh cắp dữ liệu, v.v., có thể mất dữ liệu & thông tin quan trọng của tổ chức.
* Phục hồi: Đảm bảo rằng sự phục hồi của hệ thống theo mong đợi.
* Giao diện: Kiểm tra hệ thống cũng tập trung vào giao diện của sản phẩm, đảm bảo rằng tất cả các yêu cầu được đáp ứng chính xác và không có sự cố xảy ra khi các thành phần của hệ thống được tích hợp với nhau.
* Khả năng cài đặt: Ở đây, trọng tâm của kiểm tra hệ thống là đảm bảo rằng sản phẩm được cài đặt và triển khai vào môi trường production  mà không gặp bất kỳ khó khăn và sự cố nào.
* Tính khả dụng: Đây là một khía cạnh quan trọng khác được bao phủ bởi system testing. Nó đảm bảo trải nghiệm hệ thống của người dùng là tối ưu nhất.
* Tài liệu: Độ chính xác của tài liệu cũng được kiểm tra và giám sát bởi loại thử nghiệm này.
* Load/Stres: System testing cũng đảm bảo rằng hệ thống thực hiện và hoạt động chính xác dưới tải trọng và mức tải khác nhau.
## 5. Điều kiện tiên quyết của System testing
Dưới đây là một số điều kiện tiên quyết quan trọng của system testing:
* Phải đảm bảo phần mềm được thống nhất kiểm tra.
* Kiểm thử tích hợp đã được thực hiện trên sản phẩm.
* Phần mềm nên được phát triển hoàn chỉnh.
* Trước khi thực hiện quy trình kiểm tra hệ thống, phải đảm bảo rằng môi trường kiểm tra đã sẵn sàng.
## 6. Hoàn thành quá trình System testing
Vì tầm quan trọng của kiểm thử hệ thống là rất lớn trong STLC, điều quan trọng là chúng ta xác định quy trình của nó, để đảm bảo rằng quy trình được thực hiện chính xác mà không bỏ sót bất kỳ chi tiết hay bước quan trọng nào. Quá trình kiểm tra hệ thống có thể khác nhau tùy theo dự án, tuy nhiên, có sáu bước phổ biến được xác định dưới đây:
* **Tạo Test Plan:** Bước đầu tiên là tạo kế hoạch kiểm tra, trong đó leader hoặc test manager xác định phạm vi & mục tiêu kiểm tra, xác định chiến lược, quyết định giữa kiểm tra thủ công và tự động, xác định tiêu chí đầu vào và đầu ra, gán vai trò và trách nhiệm.
* **Tạo Test Case:** Các trường hợp thử nghiệm được chuẩn bị trên cơ sở các use case và các yêu cầu của thử nghiệm, chẳng hạn như kỹ thuật, giao diện người dùng, chức năng, phi chức năng, hiệu suất, v.v.
* **Chọn Test Data:** Sau khi tạo test case, chúng sẽ phối hợp với nhau để chọn hoặc tạo test data cần thiết. Đây là những điều kiện đầu vào giúp nhóm nhận được kết quả mong đợi.
* **Thực hiện test case:** Cuối cùng là thực hiện kiểm thử các test case được tạo trước đó, liên tục theo dõi quá trình và ghi lại bất kỳ sự khác biệt hoặc vấn đề nào gặp phải trong quá trình này. Ngoài ra, đầu ra của thử nghiệm cũng được ghi lại ở đây.
* **Báo cáo & Sửa lỗi**: Báo cáo tất cả các lỗi và sự cố được ghi lại cho thành viên của team. Sau khi báo cáo, lập trình viên hoặc nhà phát triển làm việc với nhóm thử nghiệm để khắc phục và giải quyết vấn đề.
* **Lặp lại chu trình kiểm tra (Nếu cần):** Sau khi tất cả các vấn đề và lỗi được giải quyết và khắc phục, nhóm kiểm thử lặp lại chu trình kiểm tra để có kết quả như mong đợi.
#### 7. Các loại kiểm tra được thực hiện trong System testing
Giống như kiểm thử phần mềm, kiểm thử hệ thống cũng là sự kết hợp của các kỹ thuật kiểm thử đa năng, cho phép xác nhận hiệu suất và chức năng tổng thể của sản phẩm. Mỗi kỹ thuật kiểm tra này được tập trung vào các khía cạnh khác nhau của sản phẩm và phục vụ các yêu cầu khác nhau của khách hàng / người dùng. Những loại system testing là:
* **Kiểm tra cài đặt:** Nó được sử dụng để kiểm tra chức năng mong muốn của phần mềm sau khi cài đặt thành công cùng với tất cả các yêu cầu cần thiết
* **Kiểm tra chức năng:**  Một loại thử nghiệm hộp đen cho phép đánh giá hoạt động đúng của phần mềm theo các yêu cầu được xác định trước của nó.
* **Kiểm tra khả năng phục hồi:** Nó được thực hiện bằng cách cố làm cho phần mềm bị crash hoặc fail, để đánh giá khả năng phục hồi của sản phẩm một cách nhanh chóng.

* **Kiểm tra khả năng tương tác:**  Nó đảm bảo khả năng phần mềm tương thích và tương tác với phần mềm hoặc hệ thống khác và các thành phần của chúng.
* **Kiểm tra năng suất:** Nó được thực hiện để kiểm tra phản ứng, độ ổn định, khả năng mở rộng, độ tin cậy và các số liệu chất lượng khác của phần mềm dưới các khối lượng công việc khác nhau.
* **Kiểm tra khả năng mở rộng:** Phần mềm phải có khả năng mở rộng, cùng với việc tăng tải, số lượng người dùng đồng thời, kích thước dữ liệu, v.v. Điều này nảy sinh nhu cầu kiểm tra khả năng mở rộng được tiến hành để xử lý các vấn đề liên quan đến khả năng mở rộng của phần mềm.
* **Kiểm tra độ tin cậy:** Việc kiểm tra này, đánh giá mức độ của phần mềm, giữa hai lỗi và thời gian cần thiết để sửa chữa.
* **Kiểm tra hồi quy:**  Nó đảm bảo chức năng ban đầu của phần mềm sau mỗi lần sửa đổi trong đó.
* **Kiểm tra tài liệu:** Điều này bao gồm đánh giá tài liệu, được chuẩn bị trước và trong giai đoạn thử nghiệm, để đánh giá các yêu cầu thử nghiệm, bao gồm trong thử nghiệm tài liệu.
* **Kiểm tra bảo mật:** Để đánh giá các tính năng bảo mật của phần mềm để đảm bảo, bảo vệ, tính xác thực, bảo mật và tính toàn vẹn của thông tin và dữ liệu.
* **Kiểm tra khả năng sử dụng:** Đảm bảo tính năng thân thiện với người dùng của phần mềm và ngăn việc end user gặp phải sự cố trong quá trình sử dụng sản phẩm phần mềm.
## 8. Lý do thực hiện System Testing:
Một số lý do  để thực hiện system test này là:
* Đảm bảo sản phẩm đáp ứng các tiêu chuẩn chất lượng.
* Xác minh hệ thống phần mềm đáp ứng các yêu cầu chức năng, kỹ thuật và kinh doanh theo yêu cầu của khách hàng.
* Thực hiện kiểm tra từ đầu đến cuối của sản phẩm phần mềm giúp ngăn ngừa lỗi hệ thống và sự cố trong quá trình thực hiện với môi trường thật.
* Được thực hiện trong một môi trường tương tự như môi trường production, cho phép các nhà phát triển cũng như các bên liên quan có được ý tưởng về phản ứng của người dùng đối với sản phẩm.
* Đóng một vai trò quan trọng trong việc cung cấp một sản phẩm chất lượng cho người dùng cuối.
* Chính trong giai đoạn này của vòng đời kiểm thử phần mềm (STLC), các Yêu cầu nghiệp vụ và Kiến trúc ứng dụng được kiểm tra.
* Đảm bảo rằng đầu vào được cung cấp đầu ra / kết quả như mong đợi.
## 9. Sự khác biệt giữa System Testing & Acceptance Testing
Mặc dù được thực hiện sau khi System Testing, mọi người thường cho rằng Acceptance Testing cũng là một phần của System Testing. Do đó, dưới đây là 1 vài điểm so sánh:

| System Testing | Acceptance Testing | 
| -------- | -------- | 
| 1. Là loại kiểm tra  đầu cuối và loại hộp đen.      |1. Là một loại kiểm tra chức năng.     |
| 2. Được thực hiện để đảm bảo rằng hệ thống đáp ứng các yêu cầu được chỉ định của khách hàng. |  2. Được thực hiện để đảm bảo sự tuân thủ của sản phẩm với các yêu cầu nghiệp vụ.|
| 3. Được thực hiện sau khi hoàn thành integration testing. | 3. Được thực hiện sau khi system testing. | 
| 4. System testing được thực hiện bởi tester cũng như developer. | 4. Acceptance testing được thực hiện bởi tester cũng như khách hàng.| 
| 5. Có thể là loại thử nghiệm chức năng và phi chức năng. | 5. Chủ yếu là loại thử nghiệm chức năng. | 

## 10. Kết luận:

System testing là một phần không thể thiếu trong vòng đời kiểm thử phần mềm, được thực hiện khi quá trình phát triển phần mềm hoàn tất và sản phẩm đã trải qua kiểm thử đơn vị và tích hợp. Thử nghiệm này không giới hạn ở một khía cạnh hoặc thành phần của sản phẩm mà được sử dụng để kiểm tra toàn bộ hệ thống phần mềm, điều này làm cho nó trở thành một phần quan trọng của bất kỳ chu kỳ thử nghiệm nào và do đó nó được thực hiện bởi tester, những nguuowif mong muốn cung cấp trải nghiệm người dùng tốt nhất.

#### ***Bài dịch và tham khảo từ nguồn http://www.professionalqa.com/system-testing***