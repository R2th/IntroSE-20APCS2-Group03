# 1. Data Migration Testing là gì

Chúng ta thường thấy một application được move sang server mới, chuyển đổi công nghệ mới, update version hay move sang database server mới...Vậy thực sự nó nghĩa là gì và chúng ta mong đợi điều gì từ việc kiểm thử những tình huống như vậy?

Đối với việc kiểm thử, expect của những tình huống trên chính là ứng dụng phải được kiểm thử end - to - end, tức là toàn bộ chức năng phải được kiểm tra khi migrate hệ thống.Việc kiểm thử thực hiện với tất cả dữ liệu cũ và dữ liệu mới, function cũ và funtion được update, thêm mới

![](https://images.viblo.asia/7b9f14ec-58fe-49db-9db2-d6fb6bbfdf62.jpg)

Thay vì gọi là Migration testing, chúng ta có thể gọi là Data migration testing, nơi toàn bộ dữ liệu của user được migrated sang một system mới. Do đó migration testing sẽ bao gồm kiểm thử với data cũ, data mới và combination cả hai, feature cũ được kiểm tra cùng với feature mới

Application cũ thường được gọi với cái tên là "legacy" application. Song song với việc kiểm thử new/upgraded application, cần phải kiểm thử cả  "legacy" application cho đến khi new/upgraded application ổn định và nhất quán. Ngoài ra kiểm thử trên hệ thống mới còn giúp ta phát hiện thêm những vấn đề không tìm thấy ở hệ thống cũ (legacy application)

## Khái niệm Migration tesing:

*"Migration Testing is a verification process of migration of the legacy system to the new system with minimal disruption/downtime, with data integrity and no loss of data, while ensuring that all the specified functional and non-functional aspects of the application are met post-migration."*

*"Migration testing là quá trình xác minh việc chuyển đổi từ hệ thống cũ sang hệ thống mới mới thời gian disruption/downtime tối thiểu, với data thỏa mãn tính toàn vẹn dữ liệu, không bị mất dữ liệu, đồng thời đảm bảo tất cả các khía cạnh chức năng và phi chức năng đều đáp ứng đúng yêu cầu sau khi được chuyển đổi."*

![](https://images.viblo.asia/6a2e2aff-567d-4b83-9241-8c772fa3df18.jpg)

## 2. Tại sao phải thực hiện Migration test?

Khi chúng ta chuyển đổi ứng dụng sang hệ thống mới sẽ phát sinh nhiều vấn đề vì nhiều lý do như : system consolidation (hợp nhất hệ thống), obsolete technology(công nghệ lỗi thời), optimization hoặc nhiều lý do khác nữa...
Do đó khi chuyển đổi sang hệ thống mới, những điều dưới đây cần được đảm bảo:
- Bất kì các sự cố gây gián đoạn, bất tiện (disruption/inconvenience) gây ra cho user cần được tránh hoặc giảm thiểu như downtime, loss of data
- Đảm bảo rằng user có thể tiếp tục sử dụng all tính năng của phần mềm bằng cách giảm thiểu hoặc loại bỏ hoàn toàn damage trong quá trình thực hiện migration. VD: change function, remove một phần của chức năng...
- Điều quan trọng nữa là phải lường trước và loại trừ, tất cả các trục trặc / cản trở có thể xảy ra trong quá trình migration của live system.

Để đảm bảo quá trình migrate diễn ra suôn sẻ cần thực hiện kiểm thử để loại bỏ những vấn đề đó, do đó data migration có vai trò rất quan trọng

Về mặt kỹ thuật, migration test thực hiện cho các mục đích sau:
- Để đảm bảo tính tương thích của ứng dụng mới / được nâng cấp với tất cả phần cứng và phần mềm có thể có mà ứng dụng cũ hỗ trợ. Ngoài ra, tính tương thích mới cũng nên được kiểm tra đối với nền tảng phần cứng, phần mềm mới.
- Để đảm bảo tất cả các chức năng hiện có hoạt động như trong ứng dụng kế thừa. Không có sự thay đổi nào về cách thức hoạt động của ứng dụng khi so sánh với ứng dụng cũ.
- Khả năng xảy ra một số lượng lớn các vấn đề do migrate là rất cao. Nhiều vấn đề thường liên quan đến dữ liệu và do đó những issue này cần được xác định & sửa chữa trong quá trình thử nghiệm.
- Để đảm bảo liệu Thời gian phản hồi của hệ thống của ứng dụng mới / được nâng cấp có giống hay ít hơn thời gian phản hồi của ứng dụng cũ hay không.
- Để đảm bảo nếu kết nối giữa các máy chủ, phần cứng, phần mềm, v.v., tất cả đều nguyên vẹn và không bị đứt trong khi kiểm tra. Luồng dữ liệu giữa các thành phần khác nhau không được phá vỡ trong bất kỳ điều kiện nào.

# 3. Khi nào thì thực hiện migration?

Việc kiểm thử cần được thực hiện vào thời điểm trước và sau khi migration
1. Pre-Migration Testing
2. Migration Testing
3. Post Migration Testing

Ngoài ra, những thử nghiệm sau cũng được thực hiện như một phần của migration testing:
1. Backward Compatibility Verification - Khả năng tương thích ngược
2. Rollback Testing - Khả năng khôi phục

Trước khi thực hiện kiểm thử, cần phải clear rõ các điểm dưới đây:
1.  Những thay đổi xảy ra như một phần của hệ thống mới (máy chủ, giao diện người dùng, DB, lược đồ, luồng dữ liệu, chức năng, v.v.)
2. Để hiểu chiến lược migrate thực tế do nhóm đặt ra. Quá trình migrate diễn ra như thế nào, các thay đổi từng bước xảy ra trong phần phụ trợ của hệ thống và các tập lệnh chịu trách nhiệm cho những thay đổi này.
Do đó, điều cần thiết là phải nghiên cứu kỹ lưỡng hệ thống cũ và hệ thống mới, sau đó lập kế hoạch và thiết kế các trường hợp thử nghiệm và kịch bản thử nghiệm được đề cập như một phần của các giai đoạn thử nghiệm và chuẩn bị chiến lược thử nghiệm.

# 4. Data Migration Testing Strategy

Data Migration Testing Strategy bao gồm một tập hợp các hoạt động sẽ được thực hiện và một số khía cạnh cần được xem xét. Điều này là để giảm thiểu các lỗi và rủi ro xảy ra do quá trình migrate và để thực hiện kiểm tra migrate một cách hiệu quả.

**Activities in this Testing:**

#1) Specialized team formation:

Thành lập nhóm thử nghiệm với các thành viên có kiến thức & kinh nghiệm cần thiết và cung cấp đào tạo liên quan đến hệ thống đang được chuyển đổi.

#2) Business risk analysis, possible errors analysis:

Current business sẽ không bị cản trở sau khi migrate và do đó thực hiện các cuộc họp 'Business Risk Analysis' liên quan đến các bên liên quan phù hợp (Test Manager, Business Analyst, Architects, Product Owners, Business Owner etc.,) và xác định các rủi ro và các biện pháp giảm thiểu có thể thực hiện. Thử nghiệm nên bao gồm các tình huống để phát hiện ra những rủi ro đó và xác minh xem các biện pháp giảm thiểu thích hợp đã được thực hiện chưa.

Tiến hành ' Phân tích lỗi có thể xảy ra' bằng cách sử dụng 'Error Guessing Approaches' thích hợp và sau đó thiết kế các bài kiểm tra xung quanh những lỗi này để khám phá chúng trong quá trình kiểm tra.

#3) Migration scope analysis and identification:

Phân tích phạm vi rõ ràng của kiểm tra migrate như khi nào và những gì cần được kiểm tra.

#4) Identify the appropriate Tool for Migration:

Trong khi xác định chiến lược của kiểm thử, automated hay manual, hãy xác định các công cụ sẽ được sử dụng. Vd: Automated tool to compare source and destination data.

#5) Identify the appropriate Test Environment for Migration:

Xác định sự khác biệt giữa môi trường của Pre and Post Migration. Hiểu được khía cạnh của sự khác nhau giữa Legacy and New system of Migration, để đảm bảo môi trường thử nghiệm được thiết lập sau theo đó

#6) Migration Test Specification Document and review:

Chuẩn bị Migration Test Specification document là tài liệu mô tả rõ test approach, area, test method, testing methodology,  number of cycles of testing, schedule of testing, approach of creating data và using live data ...

#7) Production launch of the migrated system:

Phân tích và ghi lại danh sách việc cần làm cho quá trình chuyển đổi sản xuất và xuất bản trước

# 5. Các giai đoạn khác nhau của Migration

### Phase #1: Pre-Migration Testing

Trước khi migrate, các hoạt động thử nghiệm được thực hiện như một phần của giai đoạn thử nghiệm. Hoạt động này có thể bỏ qua nếu như application quá đơn giản  Nhưng khi các ứng dụng phức tạp cần được migrate, thì các hoạt động Pre-Migration là điều bắt buộc.

Dưới đây là danh sách các activity được thực hiện trong giai đoạn này:

- Set a clear scope of the data (Đặt phạm vi dữ liệu rõ ràng) - dữ liệu nào phải được đưa vào, dữ liệu nào phải loại trừ, dữ liệu nào cần chuyển đổi / chuyển đổi, v.v.
- Perform data mapping between legacy and the new application - Thực hiện ánh xạ dữ liệu giữa ứng dụng cũ và ứng dụng mới - đối với mỗi loại dữ liệu trong ứng dụng kế thừa, hãy so sánh loại có liên quan của nó trong ứng dụng mới và sau đó ánh xạ chúng 
- Nếu ứng dụng mới có trường là bắt buộc trong đó, nhưng nó không phải là trường hợp kế thừa, và sau đó đảm bảo rằng kế thừa không có trường đó là rỗng. - Ánh xạ mức thấp hơn.
- Nghiên cứu lược đồ dữ liệu của ứng dụng mới – tên trường, kiểu, giá trị tối thiểu và tối đa, độ dài, các trường bắt buộc, xác thực mức trường, v.v., rõ ràng
- Một số bảng trong hệ thống kế thừa phải được ghi chú lại và nếu có bảng nào bị loại bỏ và việc migrate bài đăng được thêm vào cần phải được xác minh.
- Một số bản ghi trong mỗi bảng, dạng xem cần được lưu ý trong ứng dụng kế thừa.
- Nghiên cứu các giao diện trong ứng dụng mới và các kết nối của chúng. Dữ liệu chảy trong giao diện phải được bảo mật cao và không bị hỏng.
- Chuẩn bị các trường hợp thử nghiệm, kịch bản thử nghiệm và trường hợp sử dụng cho các điều kiện mới trong các ứng dụng mới.
- Thực thi một tập hợp các trường hợp kiểm thử, các kịch bản với một nhóm người dùng và lưu giữ các kết quả, nhật ký. Điều tương tự cũng cần được xác minh sau khi migrate để đảm bảo rằng dữ liệu và chức năng kế thừa vẫn nguyên vẹn.
- Số lượng dữ liệu và hồ sơ cần được ghi lại rõ ràng, nó cần được xác minh sau khi migrate để không bị mất dữ liệu.

### Phase #2: Migration Testing

' ‘Migration Guide’  do nhóm Migrate chuẩn bị cần phải được tuân thủ nghiêm ngặt để thực hiện hoạt động migration. Lý tưởng nhất là hoạt động migration bắt đầu với dữ liệu được sao lưu  do đó legacy system có thể được restored bất cứ lúc nào

Xác minh phần tài liệu của ‘Migration Guide’ cũng là một phần của Migration Testing. Xác minh xem tài liệu có rõ ràng và dễ theo dõi hay không. Tất cả các script và stept phải được ghi lại một cách chính xác mà không có bất kỳ sự mơ hồ nào. Bất kỳ loại lỗi tài liệu nào, sai sót đối sánh theo thứ tự thực hiện các bước cũng cần được xem xét quan trọng để chúng có thể được báo cáo và sửa chữa.

Tập lệnh migrate, hướng dẫn và thông tin khác liên quan đến quá trình migrate thực tế cần được chọn từ kho lưu trữ kiểm soát phiên bản để thực thi.

Ghi lại thời gian thực tế để migrate từ thời điểm bắt đầu migrate cho đến khi khôi phục thành công hệ thống, là một trong những trường hợp thử nghiệm được thực hiện và do đó 'Thời gian thực hiện để migrate  hệ thống' cần được ghi lại trong bản cuối cùng báo cáo thử nghiệm sẽ được gửi như một phần của kết quả thử nghiệm migrate  và thông tin này sẽ hữu ích trong quá trình khởi chạy. Thời gian ngừng hoạt động được ghi lại trong môi trường thử nghiệm được ngoại suy để tính toán thời gian ngừng hoạt động gần đúng trong hệ thống trực tiếp.

### Phase #3: Post-Migration Testing

Sau khi ứng dụng được migrate thành công, quá trình kiểm tra Post-Migration sẽ xuất hiện.

Ở đây kiểm tra hệ thống end-to-end được thực hiện trong môi trường thử nghiệm. Người kiểm thử thực hiện các trường hợp thử nghiệm đã xác định, các kịch bản thử nghiệm, các trường hợp sử dụng với dữ liệu kế thừa cũng như một tập dữ liệu mới.

Ngoài những điều này, có những mục cụ thể cần được xác minh trong môi trường đã migrate được liệt kê bên dưới:

Tất cả những điều này được ghi lại như một trường hợp thử nghiệm và được bao gồm trong tài liệu ‘Test Specification’ 

- Kiểm tra xem tất cả dữ liệu trong legacy có được di chuyển sang ứng dụng mới trong thời gian downtime  đã được lên kế hoạch hay không. Để đảm bảo điều này, hãy so sánh số lượng bản ghi giữa legacy  và ứng dụng mới cho mỗi table và view trong cơ sở dữ liệu. Ngoài ra, report thời gian thực hiện để di chuyển 10.000 bản ghi.
- Kiểm tra xem tất cả schema changes  (trường và bảng được thêm vào hoặc bị xóa) theo hệ thống mới có được cập nhật hay không.
- Dữ liệu được di chuyển từ ứng dụng cũ sang ứng dụng mới phải giữ nguyên giá trị và định dạng trừ khi nó không được chỉ định để làm như vậy. Để đảm bảo điều này, hãy so sánh các giá trị dữ liệu giữa cơ sở dữ liệu kế thừa và ứng dụng mới.
- Kiểm tra dữ liệu đã di chuyển so với ứng dụng mới. Ở đây bao gồm một số trường hợp tối đa có thể xảy ra. Để đảm bảo mức độ phù hợp 100% liên quan đến xác minh di chuyển dữ liệu, hãy sử dụng công cụ kiểm tra tự động.
- Kiểm tra bảo mật cơ sở dữ liệu.
- Kiểm tra tính toàn vẹn của dữ liệu cho tất cả các bản ghi mẫu có thể có.
- Kiểm tra và đảm bảo rằng chức năng được hỗ trợ trước đó trong hệ thống kế thừa hoạt động như mong đợi trong hệ thống mới.
- Kiểm tra luồng dữ liệu trong ứng dụng bao gồm hầu hết các thành phần.
- Giao diện giữa các thành phần nên được kiểm tra rộng rãi, vì dữ liệu không được sửa đổi, mất mát và bị hỏng khi đi qua các thành phần. Các trường hợp kiểm thử tích hợp có thể được sử dụng để xác minh điều này.
- Kiểm tra tính dự phòng của dữ liệu kế thừa. Không có dữ liệu kế thừa nào được tự sao chép trong quá trình di chuyển
- Kiểm tra các trường hợp dữ liệu không khớp như kiểu dữ liệu bị thay đổi, định dạng lưu trữ bị thay đổi, v.v.,
- Tất cả các kiểm tra cấp trường trong ứng dụng cũ cũng phải được bao gồm trong ứng dụng mới
- Bất kỳ bổ sung dữ liệu nào trong ứng dụng mới sẽ không phản ánh lại legancy
- Cập nhật dữ liệu của ứng dụng cũ thông qua ứng dụng mới sẽ được hỗ trợ. Sau khi được cập nhật trong ứng dụng mới, nó sẽ không phản ánh lại legancy
- Việc xóa dữ liệu của ứng dụng cũ trong ứng dụng mới sẽ được hỗ trợ. Sau khi bị xóa trong ứng dụng mới, nó cũng sẽ không xóa dữ liệu cũ.
- Xác minh rằng các thay đổi được thực hiện đối với hệ thống legancy hỗ trợ chức năng mới được cung cấp như một phần của hệ thống mới.
- Xác minh rằng người dùng từ hệ thống legancy có thể tiếp tục sử dụng cả chức năng cũ và chức năng mới, đặc biệt là những chức năng có liên quan đến thay đổi. Thực thi các trường hợp thử nghiệm và kết quả thử nghiệm được lưu trữ trong quá trình thử nghiệm Trước khi di chuyển.
- Tạo người dùng mới trên hệ thống và thực hiện các thử nghiệm để đảm bảo rằng chức năng từ ứng dụng cũ cũng như ứng dụng mới, hỗ trợ người dùng mới được tạo và nó hoạt động tốt.
- Thực hiện các thử nghiệm liên quan đến chức năng với nhiều mẫu dữ liệu khác nhau (nhóm tuổi khác nhau, người dùng từ các khu vực khác nhau, v.v.)
- Cũng cần phải xác minh xem 'flag function có được bật cho các tính năng mới hay không và bật / tắt nó để bật và tắt các tính năng.
- Kiểm tra hiệu suất là rất quan trọng để đảm bảo rằng việc di chuyển sang hệ thống / phần mềm mới không làm giảm hiệu suất của hệ thống.
- Nó cũng được yêu cầu thực hiện các thử nghiệm tải và ứng suất để đảm bảo hệ thống ổn định.
- Xác minh rằng việc nâng cấp phần mềm không mở ra bất kỳ lỗ hổng bảo mật nào và do đó, thực hiện kiểm tra bảo mật, đặc biệt là trong khu vực đã thực hiện các thay đổi đối với hệ thống trong quá trình di chuyển.
- Khả năng sử dụng là một khía cạnh khác cần được xác minh, trong đó nếu bố cục GUI / hệ thống giao diện người dùng đã thay đổi hoặc bất kỳ chức năng nào đã thay đổi, thì Tính dễ sử dụng mà người dùng cuối cảm thấy như thế nào so với hệ thống cũ.

## Một vài tip:
- Khi ứng dụng được migrate, điều đó không có nghĩa là các test case phải được viết lại. Các test case đã viết cho hệ thống cũ vẫn có thể sử dụng cho hệ thống mới.
- Nếu có bất kỳ thay đổi nào về function trong ứng dụng mới, thì các trường hợp thử nghiệm liên quan đến function sẽ được sửa đổi.
- Nếu có bất kỳ function mới nào được thêm vào trong ứng dụng mới, thì các test case mới sẽ được design cho function cụ thể đó.
- Các test case được thiết kế phải luôn đáng tin cậy và nhất quán về cách sử dụng. Việc xác minh dữ liệu quan trọng nên được bao gồm trong các test case để nó không bị bỏ sót trong khi thực thi.
- Khi design của ứng dụng mới khác với design của ứng dụng cũ (Giao diện người dùng), thì các test case liên quan đến giao diện người dùng phải được sửa đổi để phù hợp với ứng dụng mới

Nguồn: https://www.softwaretestinghelp.com/data-migration-testing/