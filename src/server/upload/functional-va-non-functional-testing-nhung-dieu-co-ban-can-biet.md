Kiểm thử là một phần thiết yếu và là yếu tố làm nên thành công của quá trình phát triển phần mềm. Nếu việc quản lý kiểm thử được thực hiện một cách chính xác,  hoạt động kiểm thử có thể giúp tránh các lỗi và đảm bảo sản phẩm đạt chất lượng cao. Có rất nhiều phương pháp kiểm thử để đảm bảo rằng sản phẩm của bạn hoạt động chính xác và được sử dụng dễ dàng trên nhiều môi trường và nền tảng. Các phương pháp này thường được chia thành các thử nghiệm chức năng ( Functional testting) và phi chức năng (Non-functional Testing ) . 

### Khái niệm về Functional và Non-functional Testing : 

Functional Testing là một loại kiểm thử tập trung vào các yêu cầu nghiệp vụ của sản phẩm phần mềm. Ý tưởng chính đằng sau nó là đảm bảo rằng mỗi chức năng của phần mềm hoạt động như được chỉ định trong các tài liệu yêu cầu. Các loại kiểm tra này chỉ tập trung vào việc kiểm tra kết quả của các thao tác, hoàn toàn bỏ qua các trạng thái trung gian của hệ thống trong quá trình thực thi chúng. Functional Testing chủ yếu liên quan đến các kỹ thuật kiểm thử hộp đen, nơi bạn không xem xét cấu trúc code nội bộ mà chủ yếu dựa vào các thông số kỹ thuật.

Non-functional Testing  là kỹ thuật kiểm thử tập trung vào việc đánh giá các khía cạnh phi chức năng của hệ thống. Nó kiểm tra các tham số không được kiểm tra trong Function Testing, chẳng hạn như hiệu suất, khả năng sử dụng, độ tin cậy, v.v. Các kịch bản thử nghiệm phi chức năng cũng quan trọng như các bài kiểm tra chức năng vì chúng giúp hiểu cách hệ thống hoạt động. Mục tiêu chính của loại thử nghiệm này là cung cấp trải nghiệm tốt nhất cho người dùng cuối của sản phẩm phần mềm.

## Functional Testing bao gồm những loại nào ? 

Vì kiểm thử chức năng là một phương pháp kiểm tra các thông số khác nhau của một sản phẩm phần mềm, nên nó được thực hiện trong nhiều chức năng khác nhau. Hãy xem những giai đoạn được sử dụng nhiều nhất:

### Unit test (Kiểm thử mức đơn vị) 
Kiểm thử đơn vị là cấp độ kiểm thử đầu tiên, thường được thực hiện bởi các nhà phát triển. Quá trình này đảm bảo rằng các thành phần riêng lẻ của một phần mềm hoạt động và phản ứng như mong đợi. Hoạt động kiểm thử đơn vị có thể được thực hiện theo cách thủ công, nhưng việc tự động hóa quy trình sẽ tăng tốc các chu kỳ triển khai và mở rộng phạm vi kiểm tra.

Integration Tests (Kiểm thử tích hợp) 
Kiểm thử tích hợp được thiết kế để xác định xem các thành phần phần mềm riêng lẻ có hoạt động bình thường hay không khi chúng được kết nối với nhau. Kiểm thử tích hợp đảm bảo rằng mọi kết nối giữa các đơn vị khác nhau chạy trơn tru. Loại thử nghiệm này cố gắng phát hiện ra các loại lỗi khác nhau như sự không tương thích trong thông báo hoặc định dạng dữ liệu cũng như các tham số đầu vào hoặc đầu ra không hợp lệ có thể đột ngột làm gián đoạn một chức năng. 
![](https://images.viblo.asia/1f746a03-d773-4186-a9cf-6c9dbe3e4fe5.jpg)


### System tests (Kiểm thử hệ thống)

Kiểm thử hệ thống là một phương pháp kiểm thử hộp đen để đánh giá một sản phẩm phần mềm hoàn chỉnh và tích hợp. Mục tiêu của kiểm thử hệ thống là xác minh sự tuân thủ của hệ thống với các yêu cầu cụ thể. Loại kiểm tra này thường được thực hiện bởi một nhóm kiểm thử khác với nhóm phát triển trước khi phần mềm được đưa lên môi trường Production. 

### User acceptance tests (Kiểm thử chấp nhận) 

Kiểm thử chấp nhận đôi khi được gọi là kiểm thử ứng dụng, là giai đoạn cuối cùng của kiểm thử chức năng phần mềm được thực hiện trước khi sản phẩm phần mềm được phát hành ra thị trường. Mục tiêu của quá trình này là đảm bảo rằng phần mềm đã sẵn sàng để phân phối và đáp ứng nhu cầu của người dùng cuối. Đổi lại, điều này yêu cầu sản phẩm phải được thử nghiệm trong “thế giới thực” - bởi người dùng cuối thông qua quá trình thử nghiệm beta.

## Non-functional Testing bao gồm những loại nào ? 

Hoạt động kiểm thử phi chức năng là sự bổ sung hiệu quả cho hoạt động kiểm thử chức năng vì chúng cung cấp thông tin quan trọng về độ an toàn, khả năng phục vụ và độ tin cậy của hệ thống. Loại thử nghiệm này kiểm tra cách sản phẩm phần mềm hoạt động và bao gồm (nhưng không giới hạn ở) các loại sau:

### Reliability Tests (Kiểm thử độ tin cậy)

Kiểm thử độ tin cậy kiểm tra xem phần mềm có thể duy trì một mức hiệu suất nhất định với các điều kiện nhất định và trong một khoảng thời gian nhất định hay không.

### Robustness Tests (Kiểm thử độ bền)

Loại thử nghiệm này được thiết kế để chứng minh rằng hệ thống hoạt động chính xác trong mọi điều kiện, ngay cả trong các sự kiện bất ngờ.

### Stress tests 
Stress test có mục đích giám sát hành vi của hệ thống trong các trường hợp không điển hình, chẳng hạn như xác định khả năng chịu tải của hệ thống. 

### Performance Tests (Kiểm tra hiệu năng)

Kiểm thử hiệu suất được tiến hành để xác định cách phần mềm hoạt động về khả năng đáp ứng và tốc độ xử lý trong một khối lượng công việc.

### Load Tests (Kiểm thử tải) 

Load Test là quá trình mô phỏng độ chịu tải thực tế của bất kỳ ứng dụng hoặc trang web nào. Nó kiểm thử cách ứng dụng hoạt động trong điều kiện hoạt động bình thường và hoạt động hiệu suất cao.

### Usability Tests (Kiểm thử tính khả dụng) 

Đây là kỹ thuật được thiết kế để xác minh xem người dùng cuối có thể dễ dàng sử dụng sản phẩm phần mềm hay không.

### Maintainability Tests (Kiểm thử khả năng bảo trì)

Các bài kiểm tra khả năng bảo trì được thực hiện để đánh giá khả năng của phần mềm trong việc đáp ứng các yêu cầu của người dùng và khi được thay đổi thì không gặp bất kỳ vấn đề gì.

### Portability Tests (Kiểm tra tính di động)

Các bài kiểm tra tính di động đo lường mức độ dễ dàng chuyển phần mềm sang môi trường khác, chẳng hạn như mức độ dễ dàng chuyển ứng dụng di động sang các hệ điều hành khác nhau hoặc các thiết bị khác nhau.

## Sự khác biệt giữa Functional và Non-functional Testing 

Cả kiểm thử chức năng và phi chức năng trong phần mềm đều được thiết kế để cung cấp sản phẩm phù hợp với nhu cầu của khách hàng. Sự khác biệt chính giữa kiểm thử chức năng và kiểm thử phi chức năng là kiểm thử chức năng được chạy để đảm bảo rằng phần mềm đáp ứng các yêu cầu cụ thể, trong khi kiểm thử phi chức năng tập trung vào việc đảm bảo hệ thống hoạt động tốt.

 

Điều này được minh họa rõ nhất bằng ví dụ sau. Với Functional Testing, bạn có thể xác minh xem chức năng đăng nhập có hoạt động như dự kiến hay không. Ví dụ: bạn có thể kiểm tra xem việc nhập tên người dùng và mật khẩu có cho phép bạn đăng nhập vào tài khoản trên trang web hay không. Và với Non-functional Testing, bạn xác minh xem bằng cách nhập cùng một dữ liệu, bạn có thể đăng nhập vào tài khoản của mình trong vòng 2 giây hay không. Kiểm tra xem có bao nhiêu người dùng có thể đăng nhập vào hệ thống đồng thời là một ví dụ khác về thử nghiệm Non-functional Testing. 

Thứ hai, kiểm thử chức năng thường nhằm phát hiện và loại bỏ các lỗi trong phần mềm để nó có thể đáp ứng các yêu cầu nghiệp vụ một cách hoàn hảo. Trái ngược, các loại kiểm thử phần mềm phi chức năng quan tâm đến trải nghiệm và hành vi của người dùng nhưng không liên quan đến việc "tìm lỗi". 

 

Sự khác biệt thứ ba đề cập đến các tiêu chí dựa trên thử nghiệm chức năng và thử nghiệm phi chức năng. Trong kiểm thử chức năng, cả hoạt động hợp lệ và không hợp lệ đều được thực hiện để kiểm tra hành vi của phần mềm cả trong điều kiện mong muốn và không mong muốn. Mặt khác, trong khi chạy các kiểu kiểm thử phần mềm phi chức năng, bạn cần phải xem xét các tham số bị bỏ qua khi thực hiện kiểm tra chức năng tích cực(Positive) và tiêu cực (Negative Test). Còn một sự phân biệt nữa giữa hai loại thử nghiệm - các thử nghiệm chức năng được thực hiện trước các thử nghiệm phi chức năng.

Nguồn : https://testfort.com/blog/functional-and-non-functional-testing-the-basics-you-should-know