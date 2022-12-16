Ở bài viết trước, chúng ta đã có cái nhìn tổng quát về [Data Migration Testing](https://viblo.asia/p/data-migration-testing-p1-huong-dan-tong-quan-vyDZOz7OKwj). Trong phần tiếp theo này, tôi sẽ giới thiệu kĩ hơn về cách thực hiện Data Migration Testing

# Những giai đoạn của Data Migration
![](https://images.viblo.asia/c3ab9c27-d4c6-4b5d-bb57-a7a5204bd6cd.png)

### Giai đoạn # 1:  Pre-Migration Testing

![](https://images.viblo.asia/4c6c9871-628c-4776-84d6-2cb0cefb5bcf.png)

Trước khi migrate data, chúng ta thực hiện test những chức năng chính liên quan đến phần sắp được migrate như một phần của việc Pre-Migration Testing. Điều này bị bỏ qua hoặc không được xem trọng trong các ứng dụng đơn giản. Nhưng khi các ứng dụng, hệ thông phức tạp được migrate, các hoạt động Pre-Migration là bắt buộc.

Dưới đây là danh sách các hành động được thực hiện trong giai đoạn này:

* Xác định phạm vi rõ ràng của dữ liệu - dữ liệu nào phải được chứa, dữ liệu nào phải được loại trừ, dữ liệu nào cần chuyển đổi, v.v ...
* Thực hiện data mapping (ánh xạ dữ liệu) giữa ứng dụng kế thừa và ứng dụng mới - cho mỗi loại dữ liệu trong ứng dụng cũ so sánh loại dữ liệu có liên quan trong ứng dụng mới và sau đó ánh xạ chúng - Higher level mapping (Ánh xạ mức cao).
* Nếu ứng dụng mới có trường bắt buộc trong đó, nhưng nó không phải là trường hợp thừa kế, và sau đó đảm bảo rằng di sản không có trường đó là rỗng. - Lower level mapping (Ánh xạ mức thấp).
* Nghiên cứu các tên, loại, giá trị tối thiểu và tối đa của lược đồ dữ liệu của ứng dụng mới, độ dài, trường bắt buộc, xác thực cấp trường, v.v., rõ ràng
* Một số bảng trong hệ thống kế thừa sẽ được ghi lại và nếu bất kỳ bảng nào bị loại bỏ thì chúng ta phải xác minh phải việc đó trong giai đoạn post migration.
* Một số records trong mỗi bảng, views cần được ghi chú trong ứng dụng kế thừa.
* Nghiên cứu các giao diện trong ứng dụng mới và các kết nối của chúng. Data flowing (dòng chảy dữ liệu) trong giao diện phải được bảo mật cao và không bị lỗi.
* Chuẩn bị test cases, test scenarios và use cases cho các điều kiện mới trong các ứng dụng mới.
* Thực hiện một số test cases, scenarios với một tập hợp người dùng và lưu giữ lại kết quả. Cần phải xác minh tương tự sau khi migrated để đảm bảo rằng dữ liệu và chức năng cũ vẫn còn nguyên vẹn.
* Số lượng dữ liệu và records cần được ghi lại rõ ràng, nó cần phải được xác minh sau khi migrated để không mất dữ liệu.

### Giai đoạn #2: Migration Testing
![](https://images.viblo.asia/e8e1fd99-0a46-4078-8956-8b1d736138e3.jpg)

**' Migration Guide'** được Migration team chuẩn bị cần được tuân thủ nghiêm ngặt để thực hiện migrate. Lý tưởng nhất, migrate data bắt đầu với sao lưu data trước khi migrate vào ổ cứng hoặc nơi nào đó an toàn, sao cho bất kỳ lúc nào hệ thống cũ có thể được khôi phục.

**Việc xác minh phần tài liệu của 'Migration Guide' cũng là một phần của Migration testing** . Xác minh xem tài liệu có rõ ràng và dễ theo dõi hay không. Tất cả các scripts và steps phải được ghi lại một cách chính xác mà không có bất kỳ sự mơ hồ nào. Bất kỳ loại lỗi tài liệu nào, các kết quả bỏ lỡ theo thứ tự thực hiện các bước cũng cần phải được xem là quan trọng để có thể báo cáo và sửa lỗi.

Các Migration scripts , hướng dẫn và các thông tin khác liên quan đến việc migrate thực tế cần phải được chọn từ kho kiểm soát phiên bản để thực thi, việc chọn một phiên bản ổn định và ít lỗi nhất để thực hiện migration sẽ làm giảm rủi ro và giảm ảnh hưởng đến hệ thống nếu có lỗi xảy ra.

Để ghi lại thời gian thực tế được thực hiện cho việc migration từ điểm bắt đầu di cư đến thời điểm phục hồi thành công của hệ thống, là một trong những test case quan trọng phải được thực hiện và do đó** 'Thời gian thực hiện migration'** cần phải được ghi lại trong báo cáo thử nghiệm để nó được cung cấp như một phần của kết quả migration và thông tin này sẽ hữu ích trong việc release lên production. Các downtime của hệ thống được ghi trong môi trường test được dùng để tính toán downtime gần đúng nhất trên môi trường production.

Việc migration sẽ được thực hiện trên hệ thống di sản.

Trong quá trình migration testing, tất cả các thành phần của môi trường thường sẽ được đưa xuống và loại bỏ khỏi mạng để thực hiện các hoạt động Migrateion. Do đó cần phải lưu ý **'Downtime'** (thời gian chết) cần thiết cho Migration test. Lý tưởng nhất, nó sẽ bằng với thời gian thực hiện Migration

**Nói chung, các hoạt động cần được xác định trong tài liệu 'Migration Guide' sẽ bao gồm:**

* Những việc cần làm và cần chuẩn bị để Migration thực thi
* Tường lửa, cổng, máy chủ, phần cứng, cấu hình phần mềm đều được sửa đổi theo hệ thống mới mà di sản đang được di chuyển
* Rò rỉ dữ liệu, kiểm tra an ninh được thực hiện
* Kết nối giữa tất cả các thành phần của ứng dụng được chọn

Những lời khuyên trên dành cho tester để xác minh phần back end của hệ thống hoặc bằng cách thực hiện whitebox testing.

Khi việc migration được liệt kê trong phần hướng dẫn  được hoàn thành, tất cả các server được đưa lên và các bài test cơ bản liên quan đến xác minh migration thành công sẽ được thực hiện, đảm bảo rằng tất cả các hệ thống từ đầu đến cuối được kết nối phù hợp và tất cả các thành phần đều kết nối được với nhau , DB chạy và hoạt động, front end và back end kết nối thành. Các bài test này cần được xác định trước đó và được ghi lại trong tài liệu Migration Test Specification.

Có khả năng là phần mềm hỗ trợ nhiều nền tảng khác nhau. Trong trường hợp này, việc migraion cần được xác minh trên từng nền tảng riêng biệt.

Xác minh Migration scripts sẽ là một phần của Migration test. Đôi khi, những scripts này cũng được xác minh bằng cách sử dụng 'Whitebox testing' trong một môi trường test độc lập.

Do đó việc Migration testing sẽ là một sự pha trộn giữa ‘Whitebox and Blackbox testing’.

Sau khi xác minh liên quan đến việc migration được thực hiện và các bài test tương ứng được thông qua, nhóm có thể tiến hành thêm với hoạt động Post-Migration testing.


### Giai đoạn#3: Post-Migration Testing
Khi ứng dụng được migrated thành công, Post-Migration testing là băt buộc và rất cần thiết.

Ở đây kiểm thử hệ thống đầu cuối được thực hiện trên môi trường test. Tester thực thi các testcase, test scenario, use case với dữ liệu cũ cũng như một bộ dữ liệu mới.

![](https://images.viblo.asia/ec4ed8c4-eaca-46bc-b850-f8441e99e836.jpg)

**Ngoài ra, có các mục cụ thể cần được xác minh trong môi trường migration được liệt kê dưới đây:**

Tất cả các tài liệu này được ghi nhận như là một test case và được bao gồm trong tài liệu 'Test Specification'.

1. Kiểm tra xem tất cả dữ liệu trong di sản có được di chuyển sang ứng dụng mới trong thời gian ngừng hoạt động đã được lên kế hoạch hay không. Để đảm bảo điều này, so sánh số lượng records giữa di sản và ứng dụng mới cho mỗi table và views trong cơ sở dữ liệu. Ngoài ra, hãy báo cáo thời gian cần thiết để migrated 10.000 records.
1. Kiểm tra xem tất cả các thay đổi của schema (các fields và table được thêm vào hay bị loại bỏ) theo hệ thống mới được cập nhật.
1. Dữ liệu được migrated từ di sản sang ứng dụng mới sẽ giữ lại giá trị và định dạng của nó trừ khi nó không được chỉ định để làm như vậy. Để đảm bảo điều này, hãy so sánh giá trị dữ liệu giữa cơ sở dữ liệu của ứng dụng cũ và ứng dụng mới.
1. Kiểm tra dữ liệu đã được migrated đối với ứng dụng mới. Ở đây bao gồm một số lượng tối đa các trường hợp có thể xảy ra. Để đảm bảo mức độ bao phủ 100% đối với việc xác minh data migration, có thể sử dụng công cụ automated test hoặc làm bằng tay.
1. Kiểm tra bảo mật cơ sở dữ liệu.
1. Kiểm tra tính toàn vẹn của dữ liệu cho tất cả các sample records có thể có.
1. Kiểm tra và đảm bảo rằng chức năng được hỗ trợ trước đó trong hệ thống cũ hoạt động như mong đợi trong hệ thống mới.
1. Kiểm tra luồng dữ liệu trong ứng dụng bao gồm hầu hết các thành phần.
1. Giao diện giữa các thành phần cần được test kĩ lưỡng, vì dữ liệu không nên được sửa đổi, bị mất và bị hỏng khi nó đi qua các thành phần. Các integration test case có thể được sử dụng để xác minh điều này.
1. Kiểm tra dự phòng dữ liệu cũ. Không có dữ liệu cũ nào được sao chép trong quá trình migration
1. Kiểm tra các trường hợp dữ liệu không phù hợp như kiểu dữ liệu đã thay đổi, định dạng lưu trữ được thay đổi, v.v.
1. Tất cả các fields được check trong ứng dụng cũ cũng phải được đề cập trong ứng dụng mới
1. Mọi bổ sung dữ liệu trong ứng dụng mới sẽ không phản ánh lại trên ứng dụng di sản
1. Việc cập nhật dữ liệu của ứng dụng cũ thông qua ứng dụng mới sẽ được hỗ trợ. Sau khi cập nhật trong ứng dụng mới, nó không nên phản ánh lại về ứng dụng di sản.
1. Việc xóa dữ liệu của ứng dụng cũ trong ứng dụng mới sẽ được hỗ trợ. Sau khi xóa trong ứng dụng mới, nó cũng không nên xóa dữ liệu trong di sản.
1. Xác minh rằng các thay đổi được thực hiện cho hệ thống cũ hỗ trợ chức năng mới được phân phối như một phần của hệ thống mới.
1. Xác minh người dùng từ hệ thống cũ có thể tiếp tục sử dụng cả chức năng cũ và chức năng mới, đặc biệt là các chức năng liên quan đến các thay đổi. Thực hiện các test case và test result được lưu trữ trong quá trình Pre-Migration testing.
1. Tạo người dùng mới trên hệ thống và thực hiện các kiểm tra để đảm bảo rằng chức năng từ di sản cũng như ứng dụng mới, hỗ trợ người dùng mới tạo và hoạt động tốt.
1. Thực hiện các thử nghiệm liên quan đến chức năng với nhiều mẫu dữ liệu (nhóm tuổi khác nhau, người dùng từ các vùng khác nhau, v.v.)
1. Nó cũng được yêu cầu để xác minh nếu 'Feature Flags' được bật cho các tính năng mới và bật / tắt tính năng này cho phép các tính năng bật và tắt.
1. Performance testing là quan trọng để đảm bảo rằng việc migration sang hệ thống / phần mềm mới đã không làm giảm hiệu suất của hệ thống.
1. Nó cũng được yêu cầu để thực hiện Load and Stress testing để đảm bảo sự ổn định của hệ thống.
1. Xác minh rằng nâng cấp phần mềm đã không mở ra bất kỳ lỗ hổng bảo mật nào và do đó thực hiện kiểm tra bảo mật, đặc biệt là trong khu vực có thay đổi đối với hệ thống trong quá trình migration.
1. Khả năng sử dụng là một khía cạnh khác cần được xác minh, trong đó nếu bố cục GUI / hệ thống front-end đã thay đổi hoặc bất kỳ chức năng nào đã thay đổi, thì Dễ sử dụng mà người dùng cuối cảm thấy được so với hệ thống cũ.

Vì phạm vi Post-Migration testing trở nên rất lớn, nên lý tưởng là tách riêng các thử nghiệm quan trọng cần được thực hiện trước để đủ điều kiện Migration thành công và sau đó thực hiện phần còn lại sau.

Post-Migration testing cũng được khuyến khích là thực hiện bằng cách automated các testcase quan trọng để giảm thời gian test và kết quả sẽ có sẵn một cách nhanh chóng.

**Vài lời khuyên cho tester để viết các testcases để thực hiện Post-Migration testing :**

* Khi ứng dụng được migrated, nó không có nghĩa là các test cases phải được viết cho toàn bộ ứng dụng mới. Các test cases đã được thiết kế cho di sản vẫn nên giữ lại cho ứng dụng mới. Vì vậy,  sử dụng các test cases cũ và chuyển đổi các test cases kế thừa sang các trường hợp của ứng dụng mới bất cứ khi nào cần thiết.
* Nếu có bất kỳ thay đổi tính năng nào trong ứng dụng mới, thì các test cases liên quan đến những tính năng đó cần được sửa đổi.
* Nếu có bất kỳ tính năng mới nào được thêm vào trong ứng dụng mới, thì các test cases mới sẽ được thiết kế cho tính năng cụ thể đó.
* Khi có bất kỳ sự sụt giảm tính năng nào trong ứng dụng mới, các trường hợp thử nghiệm của ứng dụng kế thừa có liên quan không nên được thực thi  trong quá trình Post-Migration testing và chúng phải được đánh dấu là không hợp lệ và được giữ riêng biệt.
* Các test cases được thiết kế phải luôn đáng tin cậy và nhất quán về mặt sử dụng. Xác minh dữ liệu quan trọng cần được đề cập trong test cases để nó không bị bỏ qua trong khi thực hiện.
* Khi thiết kế của ứng dụng mới khác với ứng dụng cũ (UI), thì các trường hợp kiểm tra liên quan đến giao diện người dùng phải được sửa đổi để thích nghi với thiết kế mới. Quyết định cập nhật hoặc viết mới, trong trường hợp này, có thể được thực hiện bởi tester dựa trên khối lượng thay đổi đã xảy ra.

### Migration Test Summary Report
Test summary report phải được tạo ra sau khi việc test hoàn thành và sẽ bao gồm báo cáo tóm tắt các test cases/ scenarios khác nhau được thực hiện như một phần của các giai đoạn migration khác nhau với trạng thái kết quả (pass / fail) và nhật ký kiểm tra.

**Thời gian ghi nhận các hoạt động sau đây cần được báo cáo rõ ràng:**
1. Tổng thời gian để thực hiện Migration
1. Thời gian ngừng hoạt động (Downtime) của ứng dụng
1. Thời gian dùng để di chuyển 10.000 records
1. Đã dành thời gian để Rollback.
1. Ngoài các thông tin trên, bất kỳ quan sát nào bất thường / khuyến nghị nào cũng có thể được báo cáo.

# Kết Luận
Do tính chất phức tạp của Migration testing , chúng ta phải lưu ý rằng một sự thiếu sót trong bất kỳ khía cạnh nào trong quá trình test sẽ dẫn đến nguy cơ thất bại trong quá trình migration, việc thực hiện nghiên cứu cẩn thận và kỹ lưỡng là rất quan trọng & phân tích hệ thống trước và sau khi migration. Lập kế hoạch và thiết kế chiến lược migration hiệu quả với các công cụ mạnh mẽ cùng với những tester có kỹ năng và được đào tạo là rất quan trọng.

Trên đây là những giai đoạn và những bước để thực hiện Migration testing, hy vọng giúp các bạn phần nào hình dung ra những công việc cần phải thực hiện để có thể thực hiện Migration testing thành công. Chúc các bạn thành công với Migration testing. Hẹn gặp các bạn ở những bài viết tiếp theo về Migration testing

Nguồn : http://www.softwaretestinghelp.com