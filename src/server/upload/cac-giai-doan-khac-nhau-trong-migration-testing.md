# **I. What is Migration Testing?**
![](https://images.viblo.asia/ffabcdec-372e-4975-bfe3-2efe16b1fdf7.jpg)

***Migration Testing*** là một quá trình xác minh sự di chuyển từ hệ thống cũ sang hệ thống mới bằng cách xác định sự gián đoạn / thời gian chết (disruption/downtime) tối thiểu, với tính toàn vẹn dữ liệu và đảm bảo rằng tất cả các khía cạnh chức năng và phi chức năng cụ thể của ứng dụng đều được đáp ứng.

# **II. Different Phases of Migration**

![](https://images.viblo.asia/e9c9a16a-05e0-435e-bdaf-586246f391ae.jpg)

## **1. Phase #1: Pre-Migration Testing**

Trước khi di chuyển dữ liệu, Pre-Migration được thực hiện như một phần của giai đoạn kiểm tra trước khi di chuyển. Điều này được bỏ qua hoặc không được xem xét trong các ứng dụng đơn giản hơn. Nhưng khi các ứng dụng phức tạp được di chuyển, các hoạt động Pre-Migration là bắt buộc.

Dưới đây là danh sách các hành động được thực hiện trong giai đoạn này:

* Đặt phạm vi rõ ràng của dữ liệu - dữ liệu nào phải được đưa vào, dữ liệu nào phải được loại trừ, dữ liệu nào cần chuyển đổi / chuyển đổi, v.v.
* Thực hiện ánh xạ dữ liệu giữa hệ thống cũ (legacy) và ứng dụng mới (new application) - đối với từng loại dữ liệu trong ứng dụng cũ so sánh loại có liên quan trong ứng dụng mới và sau đó ánh xạ chúng - Ánh xạ mức cao hơn.
* Nếu ứng dụng mới có trường bắt buộc trong đó, nhưng nó không phải là trường hợp kế thừa, và sau đó đảm bảo rằng ứng dụng cũ không có trường đó là null - Ánh xạ mức thấp hơn.
* Nghiên cứu ứng dụng mới : Lược đồ dữ liệu, tên, loại, giá trị tối thiểu và tối đa, độ dài, trường bắt buộc, v.v.
* Một số bảng trong hệ thống cũ sẽ được ghi chú và nếu có bất kỳ bảng nào bị loại bỏ và thêm di chuyển bài cần phải được xác minh.
* Một số bản ghi trong mỗi bảng, quan điểm cần lưu ý trong ứng dụng cũ
* Nghiên cứu các giao diện trong ứng dụng mới và các kết nối của chúng. Luồng dữ liệu trong giao diện phải được bảo mật cao và không bị phá vỡ..
* Chuẩn bị các  test cases, test scenarios và các cases sử dụng cho các điều kiện mới trong các ứng dụng mới.
* Thực hiện một loạt các test cases, scenarios với một tập hợp người dùng và giữ kết quả, logs stored. Điều tương tự cần được xác minh sau khi di chuyển để đảm bảo rằng dữ liệu và chức năng cũ vẫn còn nguyên vẹn.
* Số lượng data và record cần được ghi chú rõ ràng, cần được xác minh sau khi di chuyển để không mất dữ liệu.

## **2. Phase #2: Migration Testing**

"*Migration Guide*", tài liệu được chuẩn bị bởi Migration team cần phải được tuân thủ nghiêm ngặt để thực hiện hoạt động di chuyển. Điều kiện lý tưởng, hoạt động di chuyển bắt đầu bằng việc sao lưu dữ liệu trên băng (tape), khi đó, hệ thống cũ có thể được khôi phục bất cứ lúc nào.
Xác minh tài liệu "*Migration Guide*" cũng là một phần của Migration Testing- xác nhận tài liệu rõ ràng và dễ làm theo. Tất cả các scripts và các steps phải được ghi lại chính xác mà không có bất kỳ sự không rõ ràng nào. Bất kỳ loại lỗi tài liệu (documentation errors, miss matches) theo các bước thực hiện cũng quan trọng để chúng và cần báo cáo báo cáo để sửa chữa.
Migration scripts, guide và các thông tin khác liên quan đến việc di chuyển thực tế cần phải được chọn từ kho lưu trữ kiểm soát phiên bản để thực hiện.

Để ghi lại thời gian thực tế thực hiện di chuyển tính từ thời điểm bắt đầu di chuyển cho đến khi di chuyển thành công sang hệ thống mới, một trong những trường hợp thử nghiệm được thực hiện. Do đó, "Thời gian di chuyển hệ thống" (Time taken to migrate the system) cần được ghi lại trong báo cáo cuối cùng, và được gửi như một phần kết quả của Migration test, và thông tin này sẽ rất hữu ích. Thời gian chết (downtime) được ghi lại trong môi trường thử nghiệm để tính toán thời gian chết gần đúng trong hệ thống mới.

Trong quá trình thử nghiệm, tất cả các thành phần của môi trường thường sẽ được đưa xuống và xóa khỏi mạng để thực hiện các hoạt động di chuyển. Do đó, cần lưu ý thời gian chết  (downtime) cần thiết cho Migration test. 

Hoạt động di chuyển được xác định trong "*Migration Guide*" bao gồm:
* Di chuyển thực tế của ứng dụng
* Tường lửa, cổng, máy chủ, cấu hình phần cứng, phần mềm đều được sửa đổi theo hệ thống mới
* Rò rỉ dữ liệu, kiểm tra bảo mật được thực hiện
* Kết nối giữa tất cả các thành phần của ứng dụng được kiểm tra

Người kiểm tra nên xác minh những điều trên ở backend hoặc bằng cách tiến hành white box testing.

Có khả năng phần mềm hỗ trợ nhiều nền tảng khác nhau. Trong trường hợp như vậy, việc di chuyển cần phải được kiểm tra riêng biệt trên mỗi nền tảng.

Xác minh Migration scripts sẽ là một phần của Migration test. Đôi khi, Migration scripts riêng lẻ cũng được xác minh bằng cách sử dụng white box testing trong môi trường thử nghiệm độc lập. Do đó, Migration testing sẽ là sự kết hợp của cả kiểm thử hộp trắng và hộp đen.

Khi việc xác minh liên quan đến di chuyển này được thực hiện và các thử nghiệm tương ứng được thông qua, đội dự án có thể tiến hành thêm với hoạt động kiểm tra sau khi di chuyển.

## **3. Phase #3: Post-Migration Testing**

Khi ứng dụng được di chuyển thành công, các hoạt động kiểm tra sau khi di chuyển sẽ được thực hiện. Hoạt động kiểm tra hệ thống đầu cuối được thực hiện trong môi trường thử nghiệm. Người kiểm thử thực hiện các trường hợp kiểm thử đã xác định, các kịch bản kiểm thử, các trường hợp sử dụng dữ liệu cũ với một bộ dữ liệu mới.

Tất cả những điều này được ghi lại trong test case nằm  trong tài liệu "Test Specification".

1. Kiểm tra xem tất cả dữ liệu trong hệ thống cũ có được di chuyển sang ứng dụng mới trong thời gian chết (downtime) như đã lên kế hoạch hay không. Để đảm bảo điều này, hãy so sánh số lượng records giữa hệ thống cũ và ứng dụng mới cho mỗi bảng  trong cơ sở dữ liệu. Ngoài ra, báo cáo thời gian thực hiện để di chuyển 10000 records.
2. Kiểm tra xem tất cả các thay đổi schema (các trường và bảng được thêm hoặc xóa) theo hệ thống mới được cập nhật.
3. Dữ liệu được di chuyển từ hệ thống cũ sang ứng dụng mới sẽ giữ lại giá trị và định dạng của nó, trừ khi nó không được chỉ định giữ lại. Để đảm bảo điều này, hãy so sánh các giá trị dữ liệu giữa cơ sở dữ liệu của hệ thống cũ và ứng dụng mới.
4. Kiểm tra dữ liệu di chuyển so với ứng dụng mới. Ở đây, hãy cover tối đa số lượng testcases có thể. Để đảm bảo 100% độ bao phủ liên quan đến việc xác minh di chuyển dữ liệu, hãy sử dụng công cụ kiểm tra tự động.
5. Kiểm tra bảo mật cơ sở dữ liệu.
6. Kiểm tra tính toàn vẹn dữ liệu cho tất cả các records (có thể).
7. Kiểm tra và đảm bảo rằng chức năng được hỗ trợ trước đó trong hệ thống cũ hoạt động như mong đợi ở hệ thống mới.
8. Kiểm tra luồng dữ liệu trong ứng dụng.
9. Giao diện giữa các thành phần nên được kiểm tra, vì dữ liệu không được sửa đổi, bị mất và bị hỏng khi đi qua các thành phần.
10. Kiểm tra dữ liệu thừa ở hệ thống cũ. Không được sao chép dữ liệu thừa, bị duplicate trong quá trình di chuyển.
11. Kiểm tra các trường hợp không khớp dữ liệu, như kiểu dữ liệu đã thay đổi, định dạng lưu trữ được thay đổi, v.v.
12. Tất cả các mức độ kiểm tra trong ứng dụng cũ cũng nên được áp dụng trong ứng dụng mới.
13. Bất kỳ bổ sung dữ liệu nào trong ứng dụng mới sẽ không ảnh hưởng đến hệ thống cũ.
14. Cập nhật dữ liệu ứng dụng cũ thông qua ứng dụng mới nên được hỗ trợ. Sau khi cập nhật trong ứng dụng mới, dữ liệu sẽ không phản ánh lại ở hệ thống cũ.
15. Việc xóa dữ liệu cũ trong ứng dụng mới nên được hỗ trợ. Sau khi xóa trong ứng dụng mới, dữ liệu cũng không bị xóa ở hệ thống cũ.
16. Xác minh rằng các thay đổi ở cho hệ thống cũ nhằm hỗ trợ chức năng mới sẽ được apply sang hệ thống mới, và chức năng sẽ họat động tốt ở  hệ thống mới.
17. Xác minh người dùng từ hệ thống cũ có thể tiếp tục sử dụng cả chức năng cũ và chức năng mới, đặc biệt là những người có liên quan đến các thay đổi. Thực hiện các trường hợp thử nghiệm và kết quả thử nghiệm được lưu trữ trong quá trình thử nghiệm trước khi di chuyển.
18. Tạo người dùng mới trên hệ thống và thực hiện các thử nghiệm để đảm bảo rằng chức năng từ ứng dụng cũ cũng như ứng dụng mới, hỗ trợ người dùng mới được tạo và nó hoạt động tốt.
19. Thực hiện các thử nghiệm liên quan đến chức năng với nhiều mẫu dữ liệu (nhóm tuổi khác nhau, người dùng từ khu vực khác nhau, v.v.)
20. Cũng cần phải xác minh xem "Feature Flags" được bật cho các tính năng mới và bật / tắt tính năng này tương ứng với các tính năng bật và tắt khác.
21. Kiểm tra hiệu năng rất quan trọng để đảm bảo rằng việc di chuyển sang hệ thống / phần mềm mới không làm giảm hiệu suất của hệ thống.
22. Cần được thực hiện các bài kiểm tra tải (Load and stress tests) để đảm bảo sự ổn định của hệ thống.
23. Xác minh rằng việc nâng cấp phần mềm đã không mở ra bất kỳ lỗ hổng bảo mật nào và tiến hành kiểm tra bảo mật, đặc biệt là ở nơi các thay đổi đã được thực hiện trong quá trình di chuyển.
24. Khả năng sử dụng là một khía cạnh khác cần được xác minh, trong đó nếu bố cục GUI / hệ thống giao diện người dùng thay đổi hoặc bất kỳ chức năng nào đã thay đổi, khả năng dễ sử dụng mà người dùng cuối đang cảm thấy,... so với hệ thống cũ.

### Một số tips dành cho tester để viết testcase thực hiện sau di chuyển:

* Khi ứng dụng được di chuyển, không có nghĩa là các testcase phải được viết cho toàn bộ ứng dụng mới. Các testcase đã được viết cho ứng dụng cũ sẽ áp dụng được cho ứng dụng mới. Vì vậy, sử dụng lại các testcase cũ và sửa đổi các testcase cũ cho phù hợp ứng dụng mới bất cứ khi nào cần thiết.
* Nếu có bất kỳ thay đổi tính năng nào trong ứng dụng mới, thì các testcase liên quan đến tính năng sẽ được sửa đổi.
* Nếu có bất kỳ tính năng mới nào được thêm vào trong ứng dụng mới, thì các testcase mới sẽ được tạo cho tính năng cụ thể đó.
* Các testcase được thiết kế phải đáng tin cậy và nhất quán về mặt sử dụng. Việc xác minh dữ liệu quan trọng cần được đề cập trong testcase để không bị bỏ sót trong khi thực hiện.
* Khi thiết kế của ứng dụng mới khác với thiết kế của ứng dụng cũ (UI), thì các testcase liên quan đến giao diện người dùng nên được sửa đổi để phù hợp với ứng dụng mới. Có thể đưa ra quyết định cập nhật hoặc viết mới, dựa trên khối lượng thay đổi.

Do phạm vi thử nghiệm sau khi di chuyển rất lớn, nên cần tách biệt các thử nghiệm. Các bài kiểm tra quan trọng cần thực hiện trước để đủ điều kiện cho việc di chuyển thành công và sau đó thực hiện các thử nghiệm còn lại sau đó. Cũng nên tự động hóa từ đầu đến cuối các trường hợp thử nghiệm chức năng và các trường hợp thử nghiệm có thể khác để giảm thời gian thử nghiệm và kết quả có sẵn nhanh chóng.

Tài liệu tham khảo :
https://www.softwaretestinghelp.com/data-migration-testing/?fbclid=IwAR0to_6IjGksT0b8l-qptRbmCxsYG9KLiBwbxzhFWVN-rBt8KSdXvXSPCYU