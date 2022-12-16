*Bản gốc: [受け入れテスト（UAT）とは？実施の目的を観点別に紹介](https://service.shiftinc.jp/en/column/3659/)*

----------------------------------------------

Trong phát triển phần mềm, hoạt động test (kiểm thử) là một công đoạn quan trọng để đảm bảo chất lượng sản phẩm. Kiểm thử phần mềm có thể được chia thành bốn giai đoạn (cấp độ) sau Tùy theo mức độ chi tiết của đối tượng cần kiểm tra.

- Component Test (Unit Test)

- Integration Test

- System Test

- Acceptance Test

Bài viết này sẽ tập trung vào Acceptance Test để giới thiệu cách hiểu cũng như các điểm quan trọng cần lưu ý khi thực hiện.

## User Acceptance Test là gì?

![](https://images.viblo.asia/eb31a6cc-ce7b-476c-bc64-28b20ce2af50.jpg)
Trong hoạt động kiểm thử chấp nhận (Acceptance Test), bên đặt hàng phát triển phần mềm (khách hàng) sẽ sử dụng phần mềm theo đúng quy trình được sử dụng trong môi trường vận hành thực tế hoặc môi trường gần giống vậy. Dựa trên kết quả kiểm thử, đánh giá xem phần mềm đã đáp ứng được nhu cầu của bên đặt hàng chưa, cũng như phần mềm đã sẵn sàng hoạt động sau khi release hay chưa.

Việc test chức năng để xem phần mềm có hoạt động theo các thông số kỹ thuật hay không...tất nhiên rất cần thiết, tuy nhiên với hoạt động kiểm thử chấp nhận này, chúng ta sẽ thao tác/thực hiện chức năng trên môi trường vận hành thực tế thông qua phần mềm. 

Kế hoạch kiểm thử thông thường được lên ở giai đoạn đầu của dự án. Việc lập kế hoạch kiểm thử sớm trong dự án giúp cả bên đặt hàng và nhà phát triển dễ dàng có hình dung chung về phần mềm sau khi hoàn thành sẽ như thế nào, các tính năng hoạt động ra sao...Do đó, cũng giúp cho việc lập kế hoạch kiểm thử ở các cấp độ khác như Component Test, Intergration Test trở lên dễ dàng hơn.

Lý tưởng nhất là hoạt động Acceptance Test được bên đặt hàng (khách hàng) lập kế hoạch và thực hiện trên tinh thần đã cân nhắc đến môi trường vận hành thực tế. Tuy nhiên, trong thực tế, có thể có trường hợp bên đặt hàng thiếu nguồn lực để test , hoặc không thể lên kế hoạch và thực hiện test bao quát tình trạng sử dụng của từng người dùng. Do đó, việc test này có trường hợp chỉ một số đại diện bên phía khách hàng phụ trách, hoặc có thể được thực hiện thông qua một công ty đối tác bên thứ ba.

### Tầm quan trọng của User Acceptance Test

### User Acceptance Test trong mô hình V Model

**Mô hình V Model là gì?**

![](https://images.viblo.asia/4d0f0243-d463-4fd3-a585-4e119476aa71.jpg)
Để đảm bảo chất lượng của phần mềm, cần thiết phải làm rõ các loại test sẽ được thực hiện đối với mỗi công đoạn phát triển. Các dự án nếu có thể tham khảo mô hình hình chữ V thì phần nào đó có thể giảm bớt các thiếu sót.

Mô hình chữ V là mô hình sắp xếp theo từng cặp công đoạn phát triển trên (上流工程/Upper Process) và công đoạn test. Do có thể tận dụng được độ chính xác phù hợp với công đoạn phát triển trên nên cũng dễ dàng để đạt được nhận thức chung hơn.

**Công đoạn phát triển trên liên kết với Acceptance Test khi áp dụng mô hình V Model**

Trong mô hình hình chữ V, test tiếp nhận (Acceptance Test) và test hệ thống (System test) được ghép cặp với các định nghĩa Requirement. Thông qua đó, sẽ kiểm tra được các đầu mục lớn như "Mục đích tạo hệ thống", "Đơn giản hóa xử lý nghiệp vụ", "Tạo chức năng cho một xử lý nhất định"...được quyết định khi tạo định nghĩa Requirement.

## Phương pháp thực hiện Acceptance Test 

![](https://images.viblo.asia/aea5804e-713f-4cac-a908-a1315f72f5d7.jpg)

Trong bài viết này sẽ giới thiệu một số ví dụ thực tế về Acceptance Test ứng với từng loại kiểm thử (Test type). 

Các loại kiểm thử - test type được phân loại theo mục đích kiểm thử, có 6 loại điển hình thường được sử dụng

- Test chức năng (Function Test)
- Test kết nối (Connectivity Test)
- Test hiệu suất (Performance Test)
- Test hồi quy (Regression Test)
- Test bảo mật (Security Test)
- Test khả năng sử dụng (Usability Test)

Trong Acceptance Test, điều quan trọng là phải đảm bảo rằng phần mềm đang đạt được mục đích mà nó tồn tại, tập trung vào những người dùng thực tế sẽ sử dụng. Do đó, ở đây chủ yếu thực hiện "Test chức năng" và "Test khả năng sử dụng".

Mặt khác, một số loại kiểm thử như "Test hiệu suất" và "Test kết nối" chủ yếu được thực hiện bởi các nhà phát triển phần mềm, có thể coi gần như không được thực hiện trong Acceptance Test. Điều này là do nó được coi là gần như hoàn thành ở cấp độ thử nghiệm trước đó.

Bây giờ, chúng ta sẽ cùng đi vào từng loại thử nghiệm!!!

### Test chức năng

Đây là bài test để xác minh rằng các chức năng phần mềm hoạt động đúng theo các thông số kỹ thuật được xác định trong quy trình phát triển trên do người quản lý sản phẩm quyết định.

**Cách thực hiện test chức năng trong Acceptance Test**

Test chức năng sẽ kiểm tra hoạt động của phần mềm bằng cách sử dụng lưu lượng và dữ liệu thực tế.

Đặc biệt, chúng ta nên kiểm tra chức năng chú ý đến việc xử lý ngoại lệ (exception) và hành vi khi xảy ra lỗi. Điều này là do, trong việc test chức năng trong Acceptance Test, thì quan điểm về việc thực tế người dùng sau khi confirm message lỗi xong có làm hành động gì tiếp theo hay không...là rất quan trọng.

Do đó, trong loại test chức năng, chúng ta có thể kiểm tra hiệu quả bằng cách chuẩn bị trước các điều kiện và dữ liệu test để tạo ra lỗi.

### Test khả năng sử dụng

Việc thực hiện nghiệp vụ thực tế trên phần mềm, việc giả định các kịch bản (scenario) để xác minh khả năng hoạt động và khả năng sử dụng của người dùng...chính là Usability Test - Test khả năng sử dụng.

**Cách thực hiện test chức năng trong Acceptance Test**

Test khả năng sử dụng hướng đến mục đích nắm được khả năng sử dụng của người dùng, do vậy ở đây sẽ thực hiện các bài test để đánh giá xem liệu phần mềm có dễ sử dụng hay không trên môi trường thực tế (giả định). 

Bằng cách để người dùng thực tế thao tác trên phần mềm sẽ thu thập được các ý kiến trung thực từ người dùng, do đó có thể giúp cải thiện chất lượng của các bài test tiếp nhận.

Ví dụ: giả sử có một kịch bản trong đó phần mềm chỉ hiển thị thông báo lỗi "Thông tin input không đủ" khi nhập dữ liệu chưa đủ. Trong trường hợp này, có thể nghĩ đến việc người dùng sẽ liên hệ với bộ phận hỗ trợ khách hàng do không biết lỗi xảy ra ở đâu.

Tuy nhiên, nếu trước đó đã cho hiển thị thông báo lỗi "Có lỗi trên màn nào đó/item nào đó"  thì có khả năng người dùng có thể tự giải quyết vấn đề.

Vì vậy, trong Acceptance Test phải kiểm thử đến mức “người sử dụng có thể hiểu được đầu vào nào có lỗi và xử lý được”.

## Lời kết

Kiểm thử phần mềm được chia thành bốn cấp độ, nhưng kiểm thử chấp nhận - Acceptance Test là công đoạn cuối cùng trong quá trình kiểm thử. Để xác nhận phần mềm được phát triển có đáp ứng nhu cầu của người dùng hay không, Acceptance Test chủ yếu thực hiện các bài kiểm tra bao gồm thao tác thực tế của người dùng khi sử dụng phần mềm.

Đặc biệt, Acceptance Test là một quá trình quan trọng trong quá trình kiểm thử vì nó giúp phần mềm hoạt động trơn tru hơn sau khi phát hành - bằng cách xác nhận xem người dùng có thể chuyển sang hành động tiếp theo đúng cách khi xảy ra lỗi hay không.