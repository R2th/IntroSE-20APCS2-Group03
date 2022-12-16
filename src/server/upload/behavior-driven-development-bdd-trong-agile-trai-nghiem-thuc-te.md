Bài viết được tham khảo từ nguồn:
https://www.nagarro.com/en/blog/bdd-behavior-driven-development-agile-project-experience

# 1. BDD là gì?

![](https://images.viblo.asia/427b994d-5e72-4c64-962c-117891b6fe1f.jpeg)


- BDD là viết tắt của (Behavior Driven Development) là một phương pháp được phát minh bởi Dan North, tập trung vào việc mô tả hành vi ứng dụng thay vì tập trung vào phát triển phần mềm theo hướng kiểm thử. Khi triển khai BDD trong một dự án thực tế, kể đến đó là nhiều thuận lợi trong việc chia tách các case dễ làm, dễ hình dung, các thành viên trong đội dự án được tương tác với nhau từ giai đoạn đầu (clarify requirement)...nhưng lại cũng có một số khó khăn nhất định và trong bài này chúng ta sẽ cùng xem khó khăn mà BDD ảnh hưởng đến dự án như thế nào và dự án cần làm gì để BDD được triển khai đúng trong dự án của mình nhé.

- Dựa vào yêu cầu của hệ thống, cách mà BDD triển khai là viết theo ngôn ngữ tự nhiên gồm ba bước như sau:

Bước 1: Viết user story (Given)

Bước 2: Viết tiêu chí chấp nhận (End)

Bước 3: Viết ra scenario (Then)

Given-end-then: Có thể được so sánh với các báo cáo lỗi vì cả hai đều mô tả các bước để tạo ra một hành vi hệ thống mong đợi. Tuy nhiên, Given-When-Then thường được viết trước khi hệ thống được triển khai và bỏ qua hành vi có lỗi, trong khi báo cáo lỗi được viết sau khi hệ thống đã được triển khai và cũng chứa lỗi:

![](https://images.viblo.asia/fdabd7aa-65f0-41d8-97c2-23f23b99c0e8.png)

Given-end-then cũng có thể được so sánh với mẫu thử nghiệm “Triple-A” nổi tiếng Unit test:

![](https://images.viblo.asia/6c96fb4f-b653-4ba7-b451-d2d784a79175.png)


## 2. Tổng quan về dự án

Mục tiêu của chúng tôi là hiện đại hóa cổng thông tin điện tử thông qua kiến trúc hướng dịch vụ. Các dịch vụ độc lập được nhóm lại thành các mô-đun để kích hoạt chức năng được sử dụng bởi các quy trình kinh doanh.

Để phát triển và test các dịch vụ như vậy, chúng tôi quyết định sử dụng phương pháp BDD. 

# 3. Cơ sở lý luận đằng sau việc triển khai BDD

Để triển khai các mô-đun và dịch vụ được yêu cầu, chúng tôi đã chọn cách tiếp cận lặp đi lặp lại theo mô hình Agile với chu kỳ một Sprint trong vòng 2 tuần. Điều này có nghĩa là chúng tôi có một luồng câu chuyện ổn định trong nhóm, trong đó một câu chuyện thường mô tả phạm vi của một dịch vụ sẽ được phát triển.

## Chúng tôi đã sử dụng phát triển theo BDD để:

- Minh họa rõ ràng hành vi ứng dụng bằng cách mô tả các trường hợp sử dụng cụ thể

- Tạo sự hiểu biết chung về các yêu cầu trong nhóm dự án

- Bao gồm các tiêu chí chấp nhận với các tình huống BDD

- Xác định cơ sở cho Auto test

=> Sau một vài lần chạy nước rút, chúng tôi đã xác định được nhiều phương pháp và thực tiễn hữu ích khác nhau đã hoạt động trong dự án của mình.

## 3.1. Mười con mắt nhìn thấy nhiều hơn hai

![](https://images.viblo.asia/756e109d-7382-453d-bd23-c5b3e70353fd.jpg)


Cú pháp ““Given, When, Then”” được đề xuất để phát triển theo hướng hành vi giúp nhóm suy nghĩ rõ ràng về hành vi của hệ thống hoặc kết quả mong muốn của một chức năng được mô tả. Trong các phiên cải tiến câu chuyện của chúng tôi có mặt một người từ mọi vai trò (tester, developer, nhà phân tích, product owner, kiến trúc sư phần mềm, v.v.), chúng tôi nhanh chóng nhận ra rằng BDD cho phép chúng tôi tạo ra hiểu biết chung về yêu cầu. Điều này cũng có lợi cho chúng tôi trong việc củng cố lòng tin vào mục đích của câu chuyện và hiểu được yêu cầu của end-user.

## 3.2. Kiểm tra tính khả dụng của dữ liệu

- Khi mô tả các tình huống với tư cách là tester hoặc test lead, điều quan trọng là phải xem xét dữ liệu thử nghiệm bạn cần để thực thi. Nếu có thể, hãy cố gắng bao gồm dữ liệu thực và ẩn danh từ hệ thống của bạn hoặc thử nghiệm.

- Sau đó, điều này giúp thực hiện các kịch bản dưới dạng các trường hợp thử nghiệm tự động và tích hợp chúng vào môi trường thử nghiệm. 

Ví dụ: Yêu cầu là kiểm tra xử lý dữ liệu cho một địa chỉ giao hàng nhất định như:
"Đường: Phạm Hùng - Thành phố: Hà nội", có thể dễ dàng tích hợp trên một giai đoạn sử dụng mô hình thử nghiệm nhưng sẽ không bao giờ chạy trên một giai đoạn sử dụng dữ liệu thực.

- Bao gồm cả doanh nghiệp hoặc end-user trong quá trình tạo hoặc xem xét các kịch bản BDD có thể phát hiện ra một số trường hợp cạnh hoặc các chòm sao dữ liệu đặc biệt cũng có thể được bao gồm trong các thử nghiệm.

- Bằng cách xác định dữ liệu thử nghiệm cần thiết, chúng tôi thường gặp phải các trường hợp và tình huống không được đề cập trong phần mô tả của câu chuyện. Xử lý các định dạng ngày / giờ cụ thể cho các quốc gia khác nhau.

## 3.3. Phân loại kịch bản

Việc gắn thẻ các tình huống ngay lập tức khi tạo chúng rất hữu ích, vì vậy bạn có thể biết ngay loại kịch bản mà mình đang xử lý (ví dụ: @Regression, @Smoketest, @ System-Integration, v.v.). Làm như vậy sẽ cho phép bạn tìm thấy một số testcase dễ dàng hơn và nhóm chúng lại với nhau để thực hiện chúng trong một lần chạy, đặc biệt nếu chúng được tự động hóa. 

Ví dụ: Sau khi triển khai, tất cả các testcase với danh mục “Smoketest” sẽ vượt qua trước khi tham gia vào bất kỳ hoạt động thử nghiệm nào tiếp theo.

## 3.4. Giữ các điều kiện tiên quyết ở mức tối thiểu

Một trong những điều quan trọng nhất trong quá trình thực hiện dự án là giữ cho dàn ý kịch bản (mô tả phạm vi của kịch bản) và các khối “Cho trước” càng nhỏ càng tốt. Nếu không, việc xử lý và tự động hóa các kịch bản sẽ nhanh chóng trở nên rất phức tạp và lộn xộn. Các kịch bản phức tạp có thể phản ánh chất lượng và quy mô của câu chuyện. Thông thường, nếu mô tả câu chuyện không đủ chi tiết hoặc toàn diện, các kịch bản có xu hướng không chính xác. Một nguyên tắc nhỏ là chia một câu chuyện nếu nó có nhiều hơn 8-10 tiêu chí chấp nhận.

![](https://images.viblo.asia/320220bd-5250-4922-9c38-08060915de6e.jpg)


## 3.5. Quản lý sự phức tạp
Mặc dù ký hiệu hoặc cú pháp của phát triển theoBDD khá rõ ràng, nhưng có những trường hợp bạn có nhiều khả năng để mô tả các user story nhất định trong các tình huống của mình.

Ví dụ về BDD như sau:

**Given:**  I am on the “Choose Size“ tab in the UI

**And:** the Size is 0 When I click the “Edit“ Button

**And:**  I click in the Input field

**And:**  I enter the value “50“

**And:**  I click the save Button

**Then:** the new Size should be 50

Mô tả này rất chi tiết và chủ yếu dựa vào các yếu tố giao diện người dùng như “button” hoặc “input field”. Nó cũng giống như một mô tả về quá trình thay vì hành vi. Việc này sẽ tốn nhiều thời gian ở giai đoạn bảo trì nếu một số nút UI thay đổi hoặc nếu chức năng chuyển sang tab khác.

### Sau đây là một cách tiếp cận tốt hơn:


**Scenarion:** User muốn edit size của một ứng dụng để mua hàng

**Given:** the Size is <initial>
    
**When:**  the User changes the Size to <newSize>
    
    
**Then:** the new Size should be <ResultSize>
    
Ví dụ:
    
| Initial | newSize | ResultSize |
| -------- | -------- | -------- |
| 0     | 50     | 50     |
| 50     | 20     | 20     |
| 20     | 0     | 0     |

    
Trong trường hợp này, không quan trọng các nút được gọi là gì hoặc tìm chức năng ở đâu - đó chỉ là hành vi được minh họa bằng ba ví dụ. Hành vi sẽ giống nhau cho dù có bất kỳ chi tiết triển khai nào được mô tả.
    
Trong quá trình làm dự án, mọi người trong team phải mất một vài lần chạy nước rút để suy nghĩ ở mức độ trừu tượng hơn chỉ tập trung vào hành vi.
    

##     3.6. Xác định trách nhiệm
    
BDD giúp ích rất nhiều trong việc hiểu trách nhiệm của các vai trò khác nhau trong nhóm phát triển phần mềm. Có một nhóm phân tán, điều này đôi khi khiến việc giao tiếp trở nên phức tạp. Với BDD, bạn có thể tạo ra các nhiệm vụ cho các thành viên khác nhau trong nhóm theo các tình huống, do đó làm cho mọi thứ rõ ràng hơn.
    
Ví dụ:
    
Tester chịu trách nhiệm cung cấp dữ liệu thử nghiệm.
    
Developer và kỹ sư Automation test chịu trách nhiệm triển khai kịch bản dưới dạng mã.
    
Product owner nhận được ý kiến đóng góp về các trường hợp tiên tiến từ người dùng.
    
Kiến trúc sư phần mềm đảm bảo rằng bất kỳ lỗ hổng chức năng nào được phát hiện trong các yêu cầu đều được xem xét trong một dịch vụ mới.
    
# Kết luận:
    
Phát triển theo định hướng BDD đã giúp ích rất nhiều trong việc tăng cường sự hiểu biết giữa các thành viên trong nhóm, đặc biệt là khi có sự rõ ràng về các trách nhiệm khác nhau và thảo luận về các tình huống giữa các vai trò khác nhau. Bắt đầu với BDD có thể hơi khó khăn, nhưng gắn bó với nó thực sự mang lại hiệu quả, miễn là bạn luôn thích nghi và cải thiện cách bạn sử dụng nó như một nhóm. Lợi ích nổi bật nhất mà BDD mang lại là nó khuyến khích, yêu cầu giao tiếp và phối hợp trong nhóm, do đó đảm bảo chất lượng cao ngay từ giai đoạn đầu của dự án.