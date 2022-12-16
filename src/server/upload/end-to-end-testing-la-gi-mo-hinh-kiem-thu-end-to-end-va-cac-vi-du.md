Kiểm thử End to End (E2E) là một phương pháp kiểm thử để kiểm tra luồng hoạt động của ứng dụng từ đầu đến cuối. Mục đích của thử nghiệm E2E là mô phỏng kịch bản của người dùng thực, xác nhận hệ thống đang được thử nghiệm và các thành phần của nó để tích hợp và toàn vẹn dữ liệu.

Không ai muốn bị nổi tiếng về những sai lầm và sự cẩu thả của họ, và người kiểm thử cũng vậy. Khi người kiểm thử được chỉ định kiểm tra 1 ứng dụng, kể từ thời điểm đó, họ sẽ phải chịu trách nhiệm về việc đảm bảo chất lượng phần mềm và việc ứng dụng đó hoạt động đúng hay không sẽ là bằng chứng thể hiện kiến thức kiểm thử thực tế và kỹ năng của họ. 

Nếu mô tả về mặt kỹ thuật, để đảm bảo rằng việc kiểm thử được thực hiện hoàn chỉnh thì cần phải thực hiện End to End testing. 

![](https://images.viblo.asia/d42be2fe-37ee-4cbc-85c1-0da7a71e5712.jpg)


Trong bài hướng dẫn này, chúng ta sẽ tìm hiểu End to End testing là gì, cách thực hiện, lý do cần thiết, kỹ thuật được sử dụng là gì, cách  để kết thúc các trường hợp thử nghiệm cụ thể và một số khía cạnh quan trọng khác. Chúng ta cũng sẽ tìm hiểu System test và so sánh nó với thử nghiệm End to End 

## Kiểm thử End to End là gì 

![](https://images.viblo.asia/da276785-787b-40a5-be4a-462f5a878945.jpg)


Kiểm thử End to End (E2E) là một phương pháp kiểm thử phần mềm để kiểm tra luồng ứng dụng từ đầu đến cuối. Nó được thực hiện từ đầu đến cuối trong các tình huống thực tế như giao tiếp của ứng dụng với phần cứng, mạng, cơ sở dữ liệu và các ứng dụng khác.

Lý do chính để thực hiện thử nghiệm này là để xác định sự phụ thuộc lẫn nhau của một ứng dụng cũng như đảm bảo rằng thông tin được truyền đạt giữa các thành phần hệ thống khác nhau là chính xác . Nó thường được thực hiện sau khi toàn bộ chức năng và hệ thống của ứng dụng đã được kiểm thử. 

**Hãy lấy 1 ví dụ về Gmail**

![](https://images.viblo.asia/67e7e4e2-8f48-480c-ab6b-320fddaee67d.jpg)

Quá trình xác minh tài khoản Gmail End to End sẽ bao gồm các bước sau:

1. Khởi chạy trang đăng nhập Gmail thông qua URL.
2. Đăng nhập vào tài khoản Gmail bằng cách sử dụng thông tin đăng nhập hợp lệ.
3. Truy cập Hộp thư đến. Mở email đã đọc và chưa đọc.
4. Soạn email mới, trả lời hoặc chuyển tiếp email.
5. Mở các mục đã gửi và kiểm tra email.
6. Kiểm tra email trong thư mục Spam
7. Đăng xuất khỏi ứng dụng Gmail bằng cách nhấp vào 'đăng xuất'

## Công cụ kiểm thử End to End 
Một số công cụ kiểm thử End to End được khuyên dùng là : 

### **1. Avo Assure**

Avo Assure là một giải pháp tự động hóa kiểm tra 100% không cần kịch bản giúp bạn kiểm tra các quy trình kinh doanh từ đầu đến cuối chỉ với một vài lần nhấp vào các nút.

Nó cũng cho phép bạn kiểm tra các ứng dụng trên web, windows, nền tảng di động (Android và IOS),  dịch vụ web, chạy batchs, ERP, hệ thống máy tính lớn và trình giả lập liên quan thông qua một giải pháp.

Với Avo Assure, bạn có thể:

- Đạt được tự động hóa kiểm thử đầu cuối vì tính năng không code và cho phép kiểm tra trên đa dạng các ứng dụng. 
- Xem toàn bộ hệ thống phân cấp thử nghiệm của bạn, xác định kế hoạch thử nghiệm và thiết kế các trường hợp thử nghiệm thông qua tính năng Bản đồ tư duy.
- Chỉ với một cú nhấp chuột là có thể kiểm tra khả năng truy cập cho các ứng dụng của bạn. Nó hỗ trợ các tiêu chuẩn WCAG, ARIA.
- Tận dụng tích hợp với các SDLC khác nhau và các công cụ tích hợp liên tục như Jira, Sauce Labs, ALM, TFS, Jenkins, QTest, v.v.
-  Có thể thực hiện ngoài giờ làm việc.
- Thực thi các trường hợp kiểm thử trong một máy ảo duy nhất một cách độc lập hoặc song song với tính năng Lập lịch và Thực thi Thông minh.
- Phân tích báo cáo nhanh chóng vì chúng hiện có sẵn dưới dạng ảnh chụp màn hình và video về quá trình thực thi.
- Sử dụng lại hơn 1500 từ khóa được tạo sẵn và hơn 100 từ khóa dành riêng cho SAP để tiến hành thử nghiệm thêm.
- Avo Assure được chứng nhận để tích hợp với SAP S4 / HANA và SAP NetWeaver.

# 2) TestCraft
Chúng tôi khuyên bạn nên sử dụng công cụ tự động hóa kiểm thử E2E như TestCraft.

TestCraft là một nền tảng tự động hóa thử nghiệm Selenium không mã. Công nghệ AI mang tính cách mạng và mô hình trực quan độc đáo của nó cho phép tạo và thực hiện thử nghiệm nhanh hơn đồng thời loại bỏ chi phí bảo trì thử nghiệm.

Người thử nghiệm tạo các kịch bản thử nghiệm hoàn toàn tự động mà không cần mã hóa. Khách hàng tìm thấy lỗi nhanh hơn, phát hành thường xuyên hơn, tích hợp với phương pháp tiếp cận CI / CD và cải thiện chất lượng tổng thể của các sản phẩm kỹ thuật số của họ. Tất cả điều này đang tạo ra một trải nghiệm thử nghiệm End to End hoàn chỉnh.

### Kiểm thử End to End hoạt động như thế nào?

Để hiểu rõ hơn về End to End testing, chúng ta cùng tìm hiểu qua ví dụ sau : 

Xem xét một tình huống trong đó bạn đăng nhập vào tài khoản ngân hàng của mình và chuyển một số tiền sang tài khoản khác từ một số ngân hàng khác ( hệ thống phụ của bên thứ 3 ). Kịch bản kiểm thử End To End được vạch ra là :

1. Đăng nhập vào hệ thống ngân hàng
2. Kiểm tra số dư trong tài khoản
3. Chuyển một số tiền từ tài khoản của bạn sang một số tài khoản ngân hàng khác ( hệ thống phụ của bên thứ 3 )
4. Kiểm tra số dư tài khoản mới nhất của bạn
5. Đăng xuất ứng dụng

## Phương pháp kiểm tra E2E
### 1) Kiểm tra theo chiều ngang:

Phương pháp này được sử dụng rất phổ biến. Nó xảy ra theo chiều ngang trong bối cảnh của nhiều ứng dụng. Phương pháp này có thể dễ dàng xảy ra trong một ứng dụng ERP (Enterprise Resource Planning) đơn. 

Lấy ví dụ về một ứng dụng dựa trên web của hệ thống đặt hàng trực tuyến. Toàn bộ quá trình sẽ bao gồm các tài khoản, tình trạng tồn kho của sản phẩm cũng như chi tiết vận chuyển. 

### 2) Kiểm tra theo chiều dọc:

Trong phương pháp này, tất cả các chức năng của bất kỳ ứng dụng nào cũng đều được xác minh và đánh giá ngay từ đầu đến cuối. Mỗi lớp riêng lẻ của ứng dụng được kiểm thử bắt đầu từ trên xuống dưới. 

Lấy ví dụ về một ứng dụng dựa trên web sử dụng mã HTML để truy cập các máy chủ web. Trong những trường hợp như vậy, API được yêu cầu để tạo mã SQL dựa trên cơ sở dữ liệu. Tất cả các kịch bản tính toán phức tạp này sẽ yêu cầu xác nhận  và kiểm tra chuyên dụng. Vì vậy phương pháp này khó hơn nhiều. 

Cả kiểm thử hộp trắng cũng như kiểm thử hộp đen đều được liên kết với thử nghiệm này. Hay nói cách khác, chúng ta có thể nói, đây là sự kết hợp các lợi ích của cả kiểm thử hộp trắng và kiểm thử hộp đen. Tùy thuộc vào loại phần mềm đang được phát triển, ở các cấp độ khác nhau, cả kỹ thuật kiểm thử, tức là kiểm thử hộp trắng và hộp đen sẽ được sử dụng khi được yêu cầu. Về cơ bản, kiểm thử End to End thực hiện cách tiếp cận theo hướng chức năng cũng như là hướng kiến trúc cho bất kỳ phần mềm hoặc chương trình nào để xác nhận các chức năng của hệ thống.

Người kiểm thử thích phương án kiểm thử E2E vì khi viết các trường hợp kiểm thử từ quan điểm của người dùng và trong kịch bản thực tế, có thể tránh được hai lỗi phổ biến "bỏ lỡ mất 1 bug" và "viết các trường hợp thử nghiệm không thực tế ". Điều này cung cấp cho người thử nghiệm một cảm giác tuyệt vời khi hoàn thành việc test.

Dưới đây là một số nguyên tắc cần ghi nhớ trong khi thiết kế test case để thực hiện loại thử nghiệm này:

- Các test case được thiết kế theo quan điểm của người dùng cuối.
- Nên tập trung thử nghiệm một số tính năng hiện có của hệ thống.
- Nhiều kịch bản nên được xem xét để tạo ra nhiều trường hợp thử nghiệm hơn.
- Nên tạo ra nhiều bộ test case khác nhau để tập trung vào nhiều kịch bản của hệ thống.

Khi chúng ta thực hiện bất kỳ trường hợp thử nghiệm nào tương tự như trường hợp thử nghiệm này, nếu các trường hợp kiểm tra là ‘Pass’, tức là kết quả đầu ra đạt như mong đợi, điều đó nghĩa là hệ thống đã pass qua kiểm thử End to End. Tương tự như vậy, nếu hệ thống không tạo ra đầu ra mong muốn, thì cần phải kiểm thử lại trường hợp thử nghiệm bị failure.

### Tại sao chúng ta thực hiện kiểm thử E2E?
Trong tình huống hiện tại, cũng như trong sơ đồ trên, một hệ thống phần mềm hiện đại bao gồm sự kết nối với nhau của nó với nhiều sub-system đã làm cho các hệ thống phần mềm này trở nên rất phức tạp.

Những sub-system mà chúng ta đang nói đến có thể nằm trong cùng một tổ chức hoặc trong nhiều trường hợp cũng có thể thuộc các tổ chức khác nhau. Ngoài ra, các sub-system này có thể hơi giống hoặc khác với hệ thống hiện tại. Do đó, nếu có bất kỳ hỏng hóc hoặc lỗi nào trong bất kỳ sub-system nào, nó có thể ảnh hưởng xấu đến toàn bộ hệ thống Phần mềm dẫn đến sụp đổ hệ thống.

Những rủi ro lớn có thể tránh được và có thể được kiểm soát bằng loại thử nghiệm sau :

- Kiểm tra và thực hiện xác minh luồng hệ thống
- Tăng phạm vi bao phủ thử nghiệm của tất cả các sub-system liên quan đến hệ thống phần mềm
- Cố gắng phát hiện các  vấn đề nếu có với các sub-system

Dưới đây là một số hoạt động được bao gồm trong quá trình End to End testing : 

- Nghiên cứu kỹ lưỡng các yêu cầu để thực hiện thử nghiệm
- Thiết lập các môi trường thử nghiệm thích hợp 
- Nghiên cứu kỹ lưỡng các yêu cầu về Phần cứng và Phần mềm.
- Mô tả tất cả các sub-system cũng như hệ thống phần mềm chính có liên quan.
- Liệt kê các vai trò và trách nhiệm đối với tất cả các hệ thống và sub-system có liên quan.
- Các phương pháp được sử dụng trong thử nghiệm này cũng như các tiêu chuẩn được tuân theo, cùng với mô tả của nó.
- Thiết kế các trường hợp kiểm thử cũng như theo dõi các yêu cầu
- Ghi lại hoặc lưu dữ liệu đầu vào và đầu ra cho mỗi hệ thống.

## Thiết kế mô hình kiểm thử End To End

![](https://images.viblo.asia/cfcc696a-06b2-4177-8b0f-249b110ccc98.jpg)


Chúng ta sẽ lần lượt xem xét tất cả 3 loại:

### 1) Chức năng của Người dùng

Các hành động sau phải được thực hiện như một phần của việc xây dựng Chức năng Người dùng:

- Liệt kê các đặc điểm của hệ thống phần mềm và các sub-system được kết nối. 
- Đối với bất kỳ chức năng nào, hãy theo dõi các hành động đã thực hiện cũng như dữ liệu đầu vào và đầu ra.
- Tìm các mối quan hệ nếu có giữa những người sử dụng các chứng năng khác nhau.
- Tìm hiểu bản chất của các chức năng người dùng khác nhau. 
### 2) Điều kiện: 
Các hoạt động sau đây phải được thực hiện như một phần của điều kiện xây dựng dựa trên các chức năng của người dùng: 

- Đối với mỗi  chức năng của người dùng, cần chuẩn bị một tập hợp các điều kiện.
- Thời gian, điều kiện dữ liệu và các yếu tố khác ảnh hưởng đến chức năng của người dùng có thể được coi là các tham số.

### 3) Các trường hợp thử nghiệm 
Các yếu tố sau cần được xem xét để xây dựng các trường hợp thử nghiệm:

- Đối với mỗi kịch bản, một hoặc nhiều trường hợp test nên được tạo ra để kiểm tra lỗi và mọi chức năng của phần mềm.
- Mỗi điều kiện đơn lẻ nên được coi như một trường hợp thử nghiệm riêng biệt.

## Các metric liên quan

Đây là các hoạt động tiếp theo liên quan đến thử nghiệm này : 

**1. Trạng thái của việc chuẩn bị Test case**: Điều này có thể được theo dõi dưới dạng một biểu đồ để thể hiện tiến trình của các test case đã lên theo kế hoạch

**2. Theo dõi hàng tuần về tiến độ Kiểm thử**  :  Bao gồm cách thể hiện toàn diện tiến trình test trong tuần đó. Nó có thể được phản ánh thông qua đại diện tỷ lệ phần trăm các cases pass, thất bại, thực thi, không được thực hiện, không hợp lệ, vv .

**Tình trạng và báo cáo chi tiết cho các lỗi** : Báo cáo tình trạng cần được chuẩn bị trên cơ sở hàng ngày để hiển thị trạng thái thực hiện test case cũng như các lỗi được tìm thấy và ghi lại theo mức độ nghiêm trọng của chúng. Hàng tuần, phần trăm của các lỗi open và closed phải được tính toán. Ngoài ra, dựa trên mức độ nghiêm trọng của lỗi  và mức độ ưu tiên, tình trạng lỗi nên được theo dõi hàng tuần. 


Chúng ta gần như đã thấy tất cả các khía cạnh của thử nghiệm này. Bây giờ chúng ta hãy phân biệt “Kiểm thử hệ thống (System test) và kiểm thử End to End . Nhưng trước đó, chúng ta cần có 1 ý tưởng cơ bản về “Kiểm thử hệ thống” để có thể dễ dàng phân biệt giữa hai hình thức kiểm thử này.  

Kiểm thử hệ thống là hình thức kiểm thử bao gồm một loạt các kịch bản kiểm thử khác nhau với mục đích là thực hiện kiểm thử hệ thống hoàn chỉnh, tích hợp các chức năng . Kiểm thử hệ thống về cơ bản là một hình thức kiểm tra hộp đen trong đó trọng tâm là hoạt động bên ngoài của hệ thống phần mềm theo quan điểm của người dùng, dựa trên các điều kiện thực tế.

Kiểm thử hệ thống bao gồm : 

- Thử nghiệm một ứng dụng tích hợp đầy đủ bao gồm cả hệ thống chính
- Xác định các thành phần tương tác với nhau trong và ngoài hệ thống.
- Xác minh đầu ra mong muốn dựa  trên cơ sở đầu vào được cung cấp.
- Phân tích trải nghiệm của người dùng trong khi sử dụng các khía cạnh khác nhau của ứng dụng.

Ở trên chúng ta đã xem phần mô tả cơ bản về System testing để hiểu về nó. Bây giờ, chúng ta sẽ tìm ra sự khác biệt giữa "Thử nghiệm hệ thống" và "Thử nghiệm End to End" 



| No| End to End Testing | System Testing |
| -------- | -------- | -------- |
| 1    |Xác thực cả hệ thống Phần mềm chính cũng như tất cả các sub-system được kết nối với nhau.     | Test toàn bộ các chức năng chính của hệ thống phần mềm 
| 2     | Trọng tâm chính là xác minh luồng quy trình thử nghiệm từ đầu đến cuối.     | Trọng tâm chính là xác minh và kiểm tra các tính năng và chức năng của hệ thống phần mềm    |
|3    | Trong khi thực hiện kiểm tra, tất cả các giao diện bao gồm các quy trình phụ trợ của hệ thống phần mềm được thực hiện      |  Trong khi thực hiện thử nghiệm, chỉ các khu vực chức năng và phi chức năng và các tính năng của chúng được xem xét để thử nghiệm.    |
|4     | Kiểm thử End to End được thực hiện trước  hoặc  sau khi hoàn thành kiểm thử hệ thống của bất kỳ hệ thống phần mềm nào.     | Kiểm thử hệ thống về cơ bản được thực hiện sau khi hoàn thành kiểm thử tích hợp hệ thống phần mềm.    |
| 5    | Kiểm thử thủ công chủ yếu được ưu tiên để thực hiện kiểm tra End to End vì hình thức kiểm tra này liên quan đến việc kiểm tra các giao diện bên ngoài, đôi khi có thể rất khó tự động hóa. Và sẽ làm cho toàn bộ quá trình rất phức tạp.    |Cả kiểm thử thủ công và tự động hóa đều có thể được thực hiện như một phần của Kiểm thử hệ thống.     |
## 
## Phần kết luận
Hy vọng bạn đã học được các khía cạnh khác nhau của thử nghiệm End to End như quy trình, chỉ số và sự khác biệt giữa thử nghiệm hệ thống và thử nghiệm End to End.

Đối với bất kỳ bản phát hành thương mại nào của phần mềm, thử nghiệm End to End đóng một vai trò quan trọng vì nó kiểm tra toàn bộ ứng dụng trong môi trường mô phỏng chính xác hoạt động của người dùng trong thế giới thực như giao tiếp mạng, tương tác cơ sở dữ liệu, v.v.    

Hầu hết, kiểm thử End to End được thực hiện theo cách thủ công vì chi phí tự động hóa các trường hợp kiểm thử như vậy quá cao để có thể chi trả cho mọi tổ chức. Điều này không chỉ có lợi cho việc xác nhận hệ thống mà còn có thể được coi là hữu ích cho việc kiểm tra tích hợp bên ngoài.

Nguồn : https://www.softwaretestinghelp.com/what-is-end-to-end-testing/#What_isEnd_to_End_Testing