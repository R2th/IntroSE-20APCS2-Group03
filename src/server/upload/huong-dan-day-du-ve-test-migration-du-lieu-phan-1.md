### Tổng quan về Test migration dữ liệu: 

Thông thường, khi một ứng dụng được chuyển đến một server khác, hoặc thay đổi công nghệ, thì nó sẽ được update thành phiên bản tiếp theo, hoặc chuyển đến một database khác. Vậy: 

- Điều này thực sự có ý nghĩa gì?
- Mong muốn của test team trong tình huống này là gì?

Từ quan điểm test, nó có nghĩa là toàn bộ ứng dụng phải được test lại kỹ lưỡng, bao gồm cả việc migration từ hệ thống cũ sang hệ thống mới thành công.

Với trường hợp này, System test phải được thực hiện với cả dữ liệu cũ và dữ liệu mới. Các tính năng đã tồn tại và các tính năng mới hoặc đã được sửa chữa cũng cần được verify.

![](https://images.viblo.asia/d86b71f2-429a-43d1-bea0-06abf3e45719.jpg)

Có 2 tên gọi là: Migration Testing, còn gọi là Data Migration Testing, nghĩa là test việc chuyển đổi toàn bộ dữ liệu của user sang hệ thống mới.

Vì vậy, Migration testing bao gồm test với dữ liệu cũ, dữ liệu mới hoặc kết hợp cả hai, test các tính năng cũ (không được sửa đổi) và các tính năng mới (hoặc các tính năng đã được sửa đổi).

Ứng dụng cũ thường được gọi là ứng dụng di sản (legacy). Ứng dụng legacy bắt buộc phải được giữ lại cho đến khi ứng dụng mới/hoặc nâng cấp trở nên ổn định và nhất quán. Việc test migration mở rộng trên ứng dụng mới sẽ giúp tìm ra những issue không được tìm thấy trong ứng dụng cũ.

### Vậy Migration Testing là gì?

Migration Testing là một quy trình verify việc chuyển đổi hệ thống legacy sang hệ thống mới với sự gián đoạn/thời gian chết tối thiểu, đảm bảo sự toàn vẹn dữ liệu và không bị mất dữ liệu, đồng thời đảm bảo được rằng tất cả các chứng năng và phi chức năng của ứng dụng chạy đúng sau khi migration.

Ví dụ về Migration Testing:

![](https://images.viblo.asia/78a07ad6-e5d4-45ae-a700-f982002b8489.jpg)

### Tại sao phải Test Migration?

Như chúng ta đã biết, một ứng dụng được migration sang hệ thống mới do nhiều nguyên nhân, ví dụ: để hợp nhất hệ thống, do thay đổi công nghệ, tối ưu hóa, ...

Vì vậy, khi migration một ứng dụng sang một hệ thống mới, cần đảm bảo các điểm sau đây:

1. Cần tránh hoặc giảm thiểu một cách tối đa bất kỳ sự gián đoạn hay sự bất tiện nào gây ra cho người dùng. Ví dụ: thời gian chết, mất dữ liệu,...
2. Đảm bảo rằng người dùng vẫn có thể sử dụng tất cả các tính năng của phần mềm sau khi thực hiện migration. Ví dụ: thay đổi tính năng, loại bỏ một tính năng,...
3. Điều quan trọng là cần dự đoán và loại trừ tất cả những trục trặc, trở ngại có thể xảy ra khi thực hiện migration trên hệ thống live.

Vì vậy, cần phải thực hiện migration test trong phòng thí nghiệm để loại bỏ các defect, giúp cho việc migration của hệ thống live được thực hiện một cách trơn tru.

Về mặt kỹ thuật, Test Migration được thực hiện nhằm mục đích:

1. Đảm bảo rằng ứng dụng mới/nâng cấp tương thích với tất cả phần cứng và phần mềm mà ứng dụng legacy đã hỗ trợ. Ngoài ra, cần test cả khả năng tương thích mới cho nền tảng phần cứng, phần mềm mới.
2. Đảm bảo tất cả các chức năng hiện có hoạt động đúng như trong ứng dụng cũ. Không nên thay đổi cách thức hoạt động của các chức năng cũ khi migration.
3. Khả năng cao sẽ xảy ra một lượng lớn defect khi thực hiện migration. Rất nhiều defect xảy ra sẽ liên quan đến dữ liệu. Do đó, chúng cần được xác định và fix trong suốt quá trình test.
4. Đảm bảo rằng thời gian đáp ứng hệ thống của ứng dụng mới/nâng cấp tương đương hoặc nhanh hơn so với hệ thống cũ.
5. Đảm bảo kết nối giữa server, phần cứng, phần mềm là nguyên vẹn và không bị đứt đoạn khi test.  Luồng dữ liệu giữa các thành phần khác nhau cũng không bị đứt đoạn dưới bất kỳ điều kiện nào.

### Khi nào cần Test Migration?

Việc test này được thực hiện trước và sau khi thực hiện migration.

Các giai đoạn của Migration testting được thực hiện trong phòng thí nghiệm:

1. Test trước khi thực hiện migration
2. Test khi thực hiện migration
3. Test sau khi thực hiện migration

Ngoài ra, các việc test dưới đây cũng được thực hiện như là một phần của hoạt động test migration:

1. Xác minh tương thích ngược
2. Test rollback

Trước khi thực hiện migration testing, các tester cần thiết phải hiểu rõ những điểm sau:

1. Những thay đổi xảy ra như là một phần của hệ thống mới (server, front end, DB, schema, luồng dữ liệu, chức năng, ...)
2. Hiểu rằng chiến lược migration thực sự được đặt ra bởi team. Cách migration xảy ra, từng bước thay đổi xảy ra trong backend của hệ thống và và các đoạn script chịu trách nhiệm cho những thay đổi này.

Vì vậy, cần phải nghiên cứu kỹ lưỡng về hệ thống cũ và mới, sau đó lên plan và thiết kế test case, test scenario, từ đó chuẩn bị chiến lược test.

### Chiến lược Test Data Migration

Thiết kế chiến lược test migration bao gồm một tập hợp các hoạt động được thực hiện và một số khía cạnh được xem xét. Nó giúp giảm thiểu các lỗi và rủi ro có thể xảy ra do migration, và giúp thực hiện việc test migration hiệu quả. 

**Các hoạt động:**

**#1) Thành lập team chuyên biệt:**

Thành lập team test bao gồm các thành viên có chuyên môn và kinh nghiệm cần thiết, và cung cấp đào tạo về hệ thống được migration.

**#2) Phân tích rủi ro kinh doanh, phân tích những lỗi có thể xảy ra:**

Sau khi thực hiện migration, việc kinh doanh hiện tại cần thiết không được gặp bất kỳ trở ngại gì. Do đó, cần phải thực hiện cuộc họp "Phân tích rủi ro kinh doanh"  cùng với các bên liên quan như: Test Manager, Business Analyst, Kiến trúc sư, Product Owner, Business Owner,... Từ đó xác định các rủi ro và các cách giảm thiểu có thể thực hiện được. Vì vậy, việc test cần phải có các kịch bản test giúp khám phá các rủi ro, và xác minh xem giảm thiểu nào đã được thực hiện.

Đồng thời, cần phải tiến hành "Phân tích các lỗi có thể xảy ra" bằng phương pháp "Đoán lỗi" , sau đó thiết kế các thử nghiệm xung quanh các lỗi này để tìm ra các lỗi đó.

**#3) Xác định và phân tích phạm vi migration:**

Phân tích rõ ràng phạm vi thực hiện migration như: khi nào thực hiện? test những gì?

**#4) Xác định tool thích hợp cho migration:**

Trong khi xác định chiến lược test migration, dù tự động hay thủ công, cũng cần xác định tool thích hợp sẽ được sử dụng. 
Ví dụ: tool tự động giúp so sánh mã nguồn và dữ liệu đích.

**#5) Xác định môi trường thích hợp cho migration:**

Xác định các môi trường riêng biệt cho trước và sau migration. Hiểu và ghi chép lại các khía cạnh kỹ thuật của hệ thống lagacy và hệ thống mới, từ đó đảm bảo rằng môi trường thử nghiệm được thiết lập theo đó.

**#6) Ghi chép và review đặc tả Test Migration:**

Chuẩn bị tài liệu đặc tả test Migration. Nó mô tả rõ ràng: 

- cách tiếp cận test
- khu vực cần test
- cách thức test (tự động hay thủ công)
- phương pháp test (kỹ thuật black box, while box)
- số chu kỳ cần test
- schedule
- cách tạo dữ liệu và sử dụng dữ liệu live (thông tin nhạy cảm cần được che dấu)
- đặc tả môi trường test
- chất lượng tester,...

Sau đó cần thực hiện review tài liệu đó với các bên liên quan.

**#7) Launch sản phẩm:**

Phân tích và ghi chép danh sách to-do cho sản phẩm migration và thực hiện publish nó trước.

### Các giai đoạn khác nhau của Migration

**Giai đoạn 1: Trước khi test Migration**

Trước khi migrate dữ liệu, một tập các hoạt động được thực hiện như là một phần của giai đoạn trước migration test. Giai đoạn này thường bị bỏ qua trong các ứng dụng đơn giản. Nhưng với những ứng dụng phức tạp, các hoạt động trước migration là bắt buộc. 

Danh sách các hoạt động của giai đoạn này gồm có:

- Thiết lập phạm vi rõ ràng của dữ liệu: bao gồm những dữ liệu nào, loại bỏ những dữ liệu nào, dữ liệu nào cần chuyển đổi, ....
- Thực hiện việc ánh xạ dữ liệu giữa ứng dụng lagacy và ứng dụng mới: Với mỗi loại dữ liệu trong ứng dụng cũ, sau khi migration, cần so sánh với loại dữ liệu liên quan trong ứng dụng mới, sau đó thực hiện việc ánh xạ chúng. Đây được gọi là Ánh xạ ở mức cao.
- Nếu ứng dụng mới có trường bắt buộc, nhưng trường đó không có trong ứng dụng legacy, thì cần đảm bảo rằng ứng dụng lagacy không có trường đó là null. Đây là ánh xạ ở mức thấp.
- Nghiên cứu lược đồ dữ liệu của ứng dụng mới: tên trường, kiểu, giá trị min và max, độ dài, các trường bắt buộc ...
- Một số bảng của hệ thống legacy sẽ được ghi chú lại. Nếu có bất kỳ bảng nào bị xóa hay thêm mới vào sau khi migration, thì đều cần được xác minh.
- Một số bản ghi trong mỗi bảng, view cần được ghi chú trong ứng dụng legacy.
- Nghiên cứu các interface trong ứng dụng mới và kết nối chúng. Luồng dữ liệu trong interface cần có độ bảo mật cao và không bị phá vỡ.
- Chuẩn bị các test case, test scenario, và use case cho các điều kiện mới trong ứng dụng mới
- Thực thi bộ test case, scenario với một tập hợp người dùng và ghi lại kết quả, lưu log.  Tương tự, sau khi thực hiện migration, cần xác minh lại chúng để đảm bảo rằng dữ liệu và tính năng cũ là nguyên vẹn.
- Số dữ liệu và bản ghi cần được ghi chú lại rõ ràng, nhằm mục đích xác minh lại sau khi migration dữ liệu có bị mất hay không.

**Giai đoạn 2: Migration testing**

Cần tuân thủ nghiêm ngặt "Hướng dẫn migration" (được chuẩn bị bởi đội migration) để thực hiện các hoạt động migration. Lý tưởng nhất là hoạt động migration bắt đầu với các dữ liệu trên tape, để bất cứ khi nào hệ thống legacy cũng có thể khôi phục lại.

Xác minh tài liệu "Hướng dẫn migration" là một phần của hoạt động test migration. Cần xác minh rằng tài liệu là rõ ràng và dễ dàng follow. Tất cả các script và các step phải được ghi chép lại chính xác và không mơ hồ. Bất kỳ lỗi tài liệu hay không khớp với thứ tự các bước thực hiện cũng cần phải báo cáo và fix.

Các script, hướng dẫn migration và các thông tin khác có liên quan đến migration thực tế cần được chọn từ kho quản lý version.

Ghi lại thời gian thực tế của migration tính từ thời điểm bắt đầu thực hiện đến thời điểm khôi phục hệ thống thành công, là một trường hợp thử nghiệm cần được thực hiện. Do đó, cần ghi lại "Thời gian để migration hệ thống" trong báo cáo cuối cùng. Thông tin này sẽ hữu ích trong quá trình launch sản phẩm. Thời gian chết được ghi lại trong môi trường test được ngoại suy để tính toán thời gian chết gần đúng trong hệ thống live.

Đó là trên hệ thống legacy, nơi mà việc migration sẽ được thực hiện.

Trong suốt quá trình test, để thực hiện các hoạt động migration, tất cả các thành phần của môi trường thường sẽ được đưa xuống và remove khỏi mạng. Vì vậy, cần ghi lại "Thời gian chết" cần thiết cho test migration.  Lý tưởng nhất là thời gian chết bằng với thời gian migration.

Thông thường, các hoạt động migration được định nghĩa trong "Hướng dẫn migration" bao gồm:

- Migration thực tế của ứng dụng
- Thay đổi Firewall, port, host, cấu hình phần cứng, phần mềm theo hệ thống mới mà đang migrate ứng dụng lagacy sang.
- Thực hiện kiểm tra rò rỉ dữ liệu, kiểm tra bảo mật 
- Kiểm tra sự kết nối giữa các thành phần của ứng dụng

Các điều trên cần được kiểm tra trong backend của hệ thống, hoặc được kiểm tra bằng phương pháp while box testing.

Khi hoạt động migration chỉ định trong hướng dẫn được hoàn thành, tất cả server được đưa lên và tất cả các hoạt động cơ bản liên quan đến xác minh migration thành công sẽ được thực hiện. Điều này đảm bảo rằng tất cả các hệ thống đầu cuối được kết nối phù hợp, các thành phần giao tiếp được với nhau, DB hoạt động, front end kết nối thành công với backend. Các thử nghiệm này cần được xác định sớm hơn và ghi lại trong tài liệu đặc tả test migration.

Trong trường hợp phần mềm hỗ trợ nhiều nền tảng khác nhau, Migration cần được xác minh cho từng nền tảng độc lập.

Việc xác minh các đoạn script migration là một phần của hoạt động test migration. Đôi khi, đoạn script migration riêng lẻ cũng được xác minh bằng cách sử dụng while box testing trong môi trường thử nghiệm độc lập.

Vì vậy, Migration testing là sự kết hợp của cả 2 phương pháp while box và black box.

Khi migration được thực hiện, và các hoạt động test tương ứng cũng pass, thì team có thể chuyển qua các hoạt động test sau migration.

**Giai đoạn 3: Sau Migration**

Khi ứng dụng được migration thành công, chúng ta cần thực hiện test sau migration.

Trong giai đoạn này, hệ thống đầu cuối được thực hiện test trong môi trường thử nghiệm. Các tester sẽ thực hiện các test case, test scenario, use case với dữ liệu cũ cũng như dữ liệu mới.

Ngoài ra, cần phải xác minh các mục cụ thể như sau:

Tất cả các mục này được ghi lại như một test case trong tài liệu "Đặc tả kiểm thử".

1. Kiểm tra xem tất cả các dữ liệu của ứng dụng legacy đã được migration sang ứng dụng mới trong thời gian chết như kế hoạch hay chưa. Để đảm bảo điều này, hãy so sánh số lượng bản ghi của từng bảng hoặc view trong database giữa ứng dụng legacy với ứng dụng mới. Ngoài ra, hãy báo cáo thời gian cần thiết để di chuyển 10000 bản ghi.
2. Kiểm tra xem tất cả các thay đổi schema theo hệ thống mới (như: các trường, các bảng được thêm mới hoặc bị xóa) đã được cập nhật hay chưa.
3. Kiểm tra xem dữ liệu được migration từ ứng dụng legacy sang ứng dụng mới có được giữ nguyên giá trị và định dạng không (trừ trường hợp không được chỉ định thì không cần check). Để đảm bảo điều này, hãy so sánh dữ liệu database giữa ứng dụng legacy và ứng dụng mới.
4. Test dữ liệu migration so với ứng dụng mới. Ở đây bao gồm số lượng lớn tối đa các trường hợp có thể. Do đó, để đảm bảo 100% bao phủ, nên sử dụng tool test tự động cho trường hợp này.
5. Kiểm tra độ bảo mật database
6. Kiểm tra tính toàn vẹn dữ liệu cho tất cả các bản ghi mẫu có thể.
7. Kiểm tra và đảm bảo rằng các chức năng được hỗ trợ trước đó trong hệ thống cũ hoạt động như mong đợi trong hệ thống mới.
8. Kiểm tra luồng dữ liệu trong ứng dụng bao gồm hầu hết các thành phần.
9. Cần test giao tiếp interface giữa các thành phần của ứng dụng. Ví dụ như: dữ liệu không được sửa đổi, mất hay  hỏng khi đi qua các thành phần. Test tích hợp có thể được sử dụng để xác minh trường hợp này.
10. Kiểm tra những dữ liệu thừa kế bị thừa. Dữ liệu legacy không được bị duplicate sau khi migration.
11. Kiểm tra các trường hợp dữ liệu không phù hợp, ví dụ: kiểu dữ liệu bị thay đổi, hay format lưu trữ bị thay đổi,...
12. Những field level được check trong ứng dụng cũ cũng cần được check trong ứng dụng mới.
13. Bất kỳ việc bổ sung dữ liệu trong ứng dụng mới không được ảnh hưởng đến ứng dụng cũ.
14. Cần hỗ trợ việc update dữ liệu của ứng dụng legacy thông qua ứng dụng mới. Sau khi update trong ứng dụng mới, thì nó không được phản ánh lại ứng dụng legacy.
15. Cần hỗ trợ việc xóa dữ liệu của ứng dụng legacy thông qua ứng dụng mới. Sau khi xóa trong ứng dụng mới, thì dữ liệu của ứng dụng legacy sẽ không bị xóa.
16. Xác minh rằng việc thay đổi để ứng dụng cũ hỗ trợ tính năng mới là một phần của hệ thống mới.
17. Xác minh rằng user của hệ thống cũ có thể sử dụng cả tính năng cũ và tính năng mới, đặc biệt là những thay đổi có liên quan. Hãy thực hiện các test case và lưu trữ các kết quả test trong suốt quá trình test sau migration.
18. Tạo các user mới trên hệ thống và thực hiện kiểm tra để đảm bảo rằng các tính năng của hệ thống cũ hoạt động tốt trong hệ thống mới, hỗ trợ việc tạo user mới và nó hoạt động tốt.
19. Thực hiện test các tính năng liên quan đến nhiều loại dữ liệu, ví dụ: nhóm tuổi khác nhau, khu vực người dùng khác nhau,...
20. Nếu "Tính năng Flag" được bật cho chức năng mới, thì cần xác minh rằng nó sẽ cho phép ON/OFF.
21. Cần thực hiện performance test để đảm bảo rằng việc migration sang hệ thống mới không làm giảm hiệu suất của hệ thống.
22. Cần thực hiện Load test và Stress test để đảm bảo sự ổn định của hệ thống.
23. Cần thực hiện test bảo mật, đặc biệt là ở những khu vực có sự thay đổi khi migration, để xác minh rằng việc nâng cấp phần mềm không gây ra bất kỳ lỗ hổng bảo mật nào.
24. Tính khả dụng là một khía cạnh khác cần được xác minh. Ví dụ: nếu có sự thay đổi về layout GUI, front end, hoặc thay đổi tính năng nào đó, thì người dùng vẫn cảm thấy dễ sử dụng.

Vì phạm vi của test sau migration là rất lớn, nên lý tưởng là tách biệt các thử nghiệm quan trọng cần thử nghiệm trước để đảm bảo việc migration thành công, sau đó mới thực hiện test những phần còn lại.

Cũng nên sử dụng các tool tự động để giảm thiểu thời gian test, và đạt được kết quả nhanh nhất.

**Một vài tip cho test case của test sau migration:**

- Khi ứng dụng được migration, không có nghĩa là phải viết lại test case cho toàn bộ hệ thống mới. Test case của ứng dụng cũ vẫn sử dụng tốt cho ứng dụng mới. Vì vậy, tốt nhất là sử dụng các test case cũ. Nếu trường hợp nào cần thiết, thì mới chuyển đổi test case của ứng dụng cũ cho phù hợp với ứng dụng mới.
- Nếu có bất kỳ tính năng nào bị thay đổi trong ứng dụng mới, thì cần thay đổi test case của tính năng đó.
- Nếu có bất kỳ tính năng nào được thêm mới trong ứng dụng mới, thì cần thiết kế test case mới cho tính năng đó.
- Khi bất kỳ tính năng nào bị xóa khỏi ứng dụng mới, thì các test case liên quan của ứng dụng cũ sẽ bị bỏ qua, không cần xem xét đến.
- Các test case được thiết kế phải luôn luôn đáng tin cậy và nhất quán về mặt sử dụng. Việc xác minh dữ liệu quan trọng cần được đề cập trong các trường hợp thử nghiệm để không bị bỏ sót trong khi thực hiện.
- Khi UI của ứng dụng mới khác so với ứng dụng cũ, thì các test case liên quan cần được sửa chữa cho phù hợp với thiết kế mới. Dựa trên khối lượng thay đổi, tester sẽ quyết định update hay viết cái mới.

### Kiểm tra tương thích ngược

Khi thực hiện Migration, tester cũng cần kiểm tra tính tương thích ngược. Nghĩa là xác minh rằng hệ thống mới tương thích với hệ thống cũ (ít nhất là 2 phiên bản), và đảm bảo rằng nó hoạt động hoàn hảo với các phiên bản đó.

**Kiểm tra tương thích ngược nhằm mục đích:**

1. Xác minh rằng hệ thống mới có hỗ trợ các tính năng được hỗ trợ trong 2 phiên bản trước đó hay không.
2. Hệ thống có thể được di chuyển thành công từ phiên bản cách nó 2 phiên bản trước đó hay không.

Vì vậy, cần thực hiện các thử nghiệm liên quan đến tính tương thích ngược để đảm bảo nó hoạt động. Các thử nghiệm này cần được thiết kế và bao gồm trong tài liệu đặc tả test.

### Rollback testing

Trong trường hợp có bất kỳ vấn đề nào xảy ra khi thực hiện migration, hoặc migration bị lỗi ở một thời điểm bất kỳ, thì nên rollback về hệ thống legacy để phục hồi các chức năng của nó một cách nhanh nhất, và không ảnh hưởng đến người dùng cũng như các chức năng được hỗ trợ trước đó.

Vì vậy, để xác minh trường hợp này, các kịch bản test migration lỗi cần được thiết kế như một phần của test tiêu cực, và cơ chế rollback cũng cần được kiểm tra. Tổng thời gian yêu cầu để back về hệ thống legacy cần được ghi lại và báo cáo trong kết quả test.

Sau khi rollback, cần thực hiện test hồi quy (tự động) các chức năng chính để đảm bảo rằng việc migration không gây bất kỳ ảnh hưởng nào, và hệ thống đã được rollback thành công về hệ thống legacy.

### Báo cáo tóm tắt test migration

Sau khi hoàn thành việc test, cần tạo báo cáo tóm tắt. Báo cáo này cần bao gồm các báo cáo tóm tắt về các thử nghiệm/kịch bản khác nhau được thực hiện cho các giai đoạn migration khác nhau, với đầy đủ trạng thái kết quả (pass/fail) và test logs.

Cần ghi lại rõ ràng thời gian của các hoạt động sau đây:

1. Tổng thời gian thực hiện migration
2. Thời gian chết của ứng dụng
3. Thời gian để thực hiện migration 1000 bản ghi
4. Thời gian để thực hiện rollback

Ngoài những thông tin trên, bất kỳ quan sát/đề nghị nào cũng cần được báo cáo.

### Thách thức của Migration testing

**1. Chất lượng dữ liệu:**

Chúng ta có thể thấy rằng những dữ liệu được sử dụng trong ứng dụng legacy có chất lượng nghèo nàn trong ứng dụng mới/nâng cấp. Trong trường hợp này, chất lượng dữ liệu cần được cải thiện để đáp ứng các tiêu chuẩn kinh doanh.

Các yếu tố như giả định, chuyển đổi dữ liệu sau khi migration, dữ liệu được nhập trong ứng dụng legacy không hợp lệ, phân tích dữ liệu kém,... sẽ dẫn đến tình trạng chất lượng dữ liệu kém. Điều này dẫn đến chi phí hoạt động cao, tăng rủi ro tích hợp dữ liệu và sai lệch so với mục đích kinh doanh.

**2. Không khớp dữ liệu:**

Dữ liệu được migration từ ứng dụng legacy sang ứng dụng mới/nâng cấp có thể không khớp với nhau. Điều này có thể là do việc thay đổi kiểu dữ liệu, format lưu trữ dữ liệu, xác định lại mục đích sử dụng dữ liệu.

Kết quả là phải mất một effort khổng lồ thực hiện những thay đổi cần thiết để dữ liệu khớp với nhau và đạt được mục đích.

**3. Mất dữ liệu:**

Dữ liệu có thể bị mất khi migration từ ứng dụng cũ sang ứng dụng mới. Nó có thể xảy ra với các trường bắt buộc hoặc các trường không bắt buộc. 

Nếu dữ liệu bị mất là các trường không bắt buộc, thì bản ghi cho nó vẫn còn hiệu lực và có thể cập nhật sau này.

Nhưng nếu dữ liệu bị mất là các trường bắt buộc, thì bản ghi cho nó sẽ bị vô hiệu và không thể cập nhật lại. Kết quả là một lượng lớn dữ liệu bị mất, và nó phải được truy xuất từ database sao lưu hoặc nhật ký kiểm toán.

**4. Khối lượng dữ liệu:**

Nếu dữ liệu là khổng lồ, thì sẽ mất nhiều thời gian để thực hiện migration. Ví dụ: Thẻ cào trong ngành viễn thông, người dùng trên nền tảng mạng thông minh,... Thách thức ở đây là ở thời điểm dữ liệu cũ bị clear, thì một lượng dữ liệu mới khổng lồ sẽ được tạo ra và cần được migrate lại. Khi đó, tự động là cách thích hợp nhất để thực hiện migration với dữ liệu lớn. 

**5. Mô phỏng môi trường real-time (với dữ liệu thực):**

Mô phỏng môi trường real-time trong phòng thí nghiệm là một thách thức thực sự khác. Ở đó, tester sẽ gặp các vấn đề khác nhau về dữ liệu thực và hệ thống thực, mà chưa từng gặp trong suốt quá trình thử nghiệm.

Vì vậy, mẫu dữ liệu, sao chép môi trường thực, xác định khối lượng dữ liệu là tương đối quan trọng khi thực hiện migration dữ liệu.

**6. Mô phỏng khối lượng dữ liệu:**

Các team cần nghiên cứu cẩn thận dữ liệu trong hệ thống live và phân tích, từ đó đưa ra mẫu dữ liệu điển hình.

Ví dụ: người dùng có các nhóm tuổi: dưới 10 tuổi, từ 10-30 tuổi, ... Việc cần thiết là phải lấy dữ liệu trực tiếp, nếu không thì cần tạo dữ liệu trong môi trường thử nghiệm. Hãy sử dụng các công cụ tự động, nó sẽ giúp tạo ra khối lượng dữ liệu lớn một cách dễ dàng. 

### Cách để giảm rủi ro khi thực hiện Data migration

- Chuẩn hóa dữ liệu sử dụng trong hệ thống legacy, để khi thực hiện migrate, dữ liệu chuẩn sẽ có sẵn trong hệ thống mới.
- Nâng cao chất lượng của dữ liệu, để khi migrate, sẽ giúp việc test có cảm giác như người sử dụng cuối.
- Clean dữ liệu trước khi thực hiện migrate, để khi thực hiện migrate, sẽ không bị duplicate dữ liệu ở trong hệ thống mới.
- Check lại các ràng buộc, thủ tục lưu trữ, các query phức tạp đã có kết quả đúng hay chưa, để khi migrate, nó cũng sẽ trả về dữ liệu đúng trong hệ thống mới.
- Xác định chính xác các tool tự động thực hiện việc kiểm tra dữ liệu, bản ghi trong hệ thống mới so với hệ thống legacy.

Link tham khảo: https://www.softwaretestinghelp.com/data-migration-testing/