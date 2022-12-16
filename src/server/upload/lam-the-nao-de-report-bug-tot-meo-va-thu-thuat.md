## 1. Tại sao phải report bug tốt? 
Nếu báo cáo lỗi - report bug của tester có hiệu quả, thì cơ hội có thể fix bug sẽ cao hơn. Vì vậy, việc fix bug phụ thuộc ít nhiều vào mức độ hiệu quả của báo cáo. 

“*Mục tiêu của việc báo cáo vấn đề là để sửa lỗi*” - “*The point of writing problem report(bug report) is to get bugs fixed*” – **By Cem Kaner**. Nếu tester không báo cáo bug chính xác, dev sẽ từ chối bug và trả bug về lại cho tester. 

![](https://images.viblo.asia/96ccf2dc-5fa8-4ed2-a904-c7631f3298e2.jpg)

## 2. Chất lượng của báo cáo lỗi tốt là gì?
Bất kì ai cũng có thể viết báo cáo nhưng không phải ai cũng có thể viết một báo cáo có hiệu quả.
Tester nên phân biệt giữa báo cáo lỗi trung bình và báo cáo lỗi tốt. Làm thế nào để phân biệt giữa một báo cáo lỗi tốt và không tốt? Câu trả lời là hãy áp dụng các đặc điểm và kỹ thuật sau đây khi viết báo cáo lỗi.

### 1. Mỗi bug có một ID riêng biệt.
- Luôn luôn gán một ID duy nhất cho mỗi bug khi báo cáo. Điều đó sẽ giúp tester quản lý và theo dõi bug dễ dàng và nhanh chóng hơn. Nếu project của bạn hiện đang dùng công cụ để quản lý bug thì các bug sẽ được tự động đánh số theo thứ tự tăng dần mỗi khi tester tạo.
- Trong mỗi bug nên có ID bug và mô tả ngắn gọn lỗi của bug đó.

### 2. Có thể tái hiện.
Nếu bug không thể tái hiện, nó sẽ không bao giờ được fix.
Tester nên mô tả các bước tái hiện rõ ràng và chi tiết. Đừng giả sử hoặc skip qua bất kỳ bước tái hiện nào. Một bug khi mà được mô tả rõ ràng từng bước (step by step) sẽ dễ dàng tái hiện và fix bug.

### 3. Mô tả cụ thể.
- Đừng viết một bài văn để mô tả vấn đề:

Hãy mô tả một cách cụ thể và cố gắng tóm tắt vấn đề với ít từ nhất có thể nhưng vẫn phải diễn tả rõ vấn đề. Không nên gộp nhiều vấn đề lại với nhau ngay cả khi chúng có vẻ tương tự nhau. Với mỗi vấn đề phải có report riêng cho từng vấn đề đó.
- Báo cáo bug hiệu quả:

Báo cáo lỗi là một phần quan trọng trong kiểm thử phần mềm. Một báo cáo lỗi hiệu quả sẽ giúp cho việc giao tiếp giữa team test và team dev trở nên dễ dàng hơn tránh được các nhầm lẫn và hiểu lầm đáng tiếc. Vì thế báo cáo nên được viết một cách rõ ràng, súc tích và phải tập trung vào vấn đề. Nếu có bất kỳ thông tin nào không rõ ràng có thể sẽ dẫn đến sự hiểu lầm và làm chậm quá trình phát triển. Các khiếm khuyết khi viết báo cáo là một trong những điều quan trọng nhất nhưng bị bỏ quên trong vòng đời thử nghiệm. 

Viết tốt là điều rất quan trọng khi báo cáo. Điều quan trọng nhất mà một tester nên lưu ý là không nên dùng từ ngữ với âm điệu ra lệnh (a commanding tone) trong báo cáo. Điều này sẽ ảnh hưởng ít nhiều đến mối quan hệ làm việc giữa team test và team dev. Thay vì sử dụng từ ngữ với âm điệu ra lệnh hãy sử dụng từ ngữ với âm điệu gợi ý (a suggestive tone).

- Trước khi báo cáo, điều quan trọng không kém là kiểm tra xem liệu bug đó đã được báo cáo hay chưa?

Khi một bug bị trùng lặp (duplicate) nó sẽ là một gánh nặng trong chu kỳ test. Đôi khi, team dev có thể đã biết việc trùng lặp bug nhưng đã skip và chuyển bug sang bản release tiếp theo. Công cụ Bugzilla có tính năng tự động tìm kiếm các lỗi trùng lặp.
- Báo cáo nên ghi rõ “Cách tái hiện”, “Vị trí xảy ra lỗi” sẽ giúp người đọc nên dễ dàng tái hiện và tìm xem bug do đâu:

Hãy nhớ rằng mục tiêu của việc viết báo cáo bug là giúp cho team dev có cái nhìn trực quan hóa vấn đề. Và hãy cung cấp tất cả thông tin có liên quan mà team dev đang tìm kiếm.

Ngoài ra, hãy nhớ rằng báo cáo bug cũng sẽ được sử dụng trong tương lai và nó sẽ là evidence khi cần thiết. Sử dụng các câu có ý nghĩa và các từ đơn giản để mô tả bug. Không sử dụng câu nói khó hiểu gây lãng phí thời gian của người đọc.
Trong trường hợp có nhiều vấn đề trong một báo cáo lỗi, tester không thể đóng nó trừ khi tất cả các vấn đề đã được giải quyết.
  
**=>**  Do đó tốt nhất là chia các vấn đề thành các lỗi riêng biệt. Điều này đảm bảo rằng mỗi lỗi có thể được xử lý riêng. Một báo cáo lỗi được viết tốt sẽ giúp cho dev tái hiện bug tại thiế t bị đầu cuối của họ. Điều này giúp dev xem xét và fix bug tốt hơn.

## 3. Làm thế nào để report một bug?
Dưới đây là một format report bug đơn giản. Nó có thể khác nhau tùy thuộc vào công cụ mà tester đang sử dụng. Nếu đang report bug theo cách thủ công thì cần lưu ý thông tin của một số trường sau:

✤ **Reporter - Người báo cáo:** Tên tester và email.

✤ **Product - Tên sản phẩm:** Tên sản phẩm mà tester tìm ra bug.

✤ **Version - Phiên bản:** Phiên bản của sản phẩm (Nếu có).

✤ **Component - Thành phần:** Là module phụ hay chính của sản phẩm.

✤ **Platform - Nền tảng:** Các nền tảng phần cứng mà tester tìm ra lỗi. Ví dụ: PC, MAC,...

✤ **Operating system - Hệ điều hành:** Tên các hệ điều hành mà tester tìm ra lỗi. 
*Ví dụ*: Windows, Linux, Unix, SunOS, Mac OS...Trong trường hợp bug chỉ xảy ra ở phiên bản cụ thể, tester nên bổ sung thêm phiên bản của hệ điều hành. Ví dụ: Windows NT, Windows 2000, Windows XP,...

✤ **Priority - Độ ưu tiên:** Khi nào bug nên được fix? Độ ưu tiên thường quy định từ P1 đến P5 theo thứ tự tăng dần.

✤ **Severity - Mức độ nghiêm trọng:** Mô tả tác động của bug đối với sản phẩm, người dùng. 
 
 *Các loại mức độ nghiêm trọng:*
- **Blocker:** Không thể thực hiện test thêm nữa.
- **Critical:** Ứng dụng bị crash, mất dữ liệu.
- **Major:** Thiếu chức năng chính.
- **Minor:** Thiếu chức năng phụ.
- **Trivial:** Cải thiện giao diện người dùng.
- Enhancement: Yêu cầu tính năng mới hoặc nâng cấp tính năng của chức năng hiện có.

✤ **Status - Trạng thái:** Khi tester vừa tạo bug -> trạng thái của bug là “New”. Sau đó sẽ có các trạng thái tương ứng như: Resolved - bug đã được fix; Done - bug đã được tester exe test; Reopen - Sau khi dev fix, test re-test vẫn còn lỗi;....

✤ **Assign To - Giao cho:** Nếu tester biết ai sẽ là fix bug thì gắn tên của dev vào bug tương ứng.

✤ **URL - Link:** Link URL của trang xảy ra lỗi.

✤ **Summary - Tóm tắt:** Một đoạn tóm tắt ngắn, dưới 60 từ dùng để mô tả về bug. Và đảm bảo rằng phần tóm tắt này mô tả đầy đủ về bug và vị trí xảy ra. 

✤ **Description - Mô tả:** Mô tả chi tiết về bug đang xảy ra. Gồm có:
- *Reproduce - Cách tái hiện:* Mô tả rõ ràng các bước tái hiện bug.
Actual result - Kết quả thực tế: Kết quả thực tế của việc chạy các bước tái hiện bug ở trên.
- *Expected result -Kết quả mong muốn:* Cách ứng dụng hoạt động đúng khi chạy các bước tái hiện bug ở trên.
## 4. Một số mẹo để có một bug report tốt
### - Báo cáo vấn đề ngay lập tức.
Nếu bạn tìm thấy bug trong khi đang test, bạn không cần chờ đợi đến khi test xong mới báo cáo. Thay vào đó hãy báo cáo lỗi ngay lập tức. Điều này sẽ đảm bảo không bị thiếu bug và có thể tái hiện. Nếu bạn viết báo cáo lỗi sau khi đã test xong sẽ không đảm bảo báo cáo đầy đủ các bug.
### - Tự tái hiện bug ba lần trước khi báo cáo
Bug của bạn nên có thể tái hiện được. Đảm bảo rằng các bước của bạn  là đầy đủ để tái hiện lỗi mà không có bất kỳ sự mơ hồ nào. Nếu lỗi của bạn không thể tái hiện bạn vẫn có thể note lại và sẽ re-test mỗi khi thực hiện test.
### - Test bug trên các module tương tự khác
Đôi khi dev sử dụng cùng một mã code cho các module khác tương tự nhau. Vì vậy, 
có khả năng khi một module có bug thì các module khác cũng sẽ có bug. Thậm chí tester có thể sẽ tìm được bug nghiêm trọng hơn ở các module khác.
### - Viết tóm tắt lỗi rõ ràng
Tóm tắt lỗi rõ ràng sẽ giúp dev dễ dàng phân tích lỗi. Một báo cáo chất lượng kém sẽ làm tăng thời gian phân tích, code và test.
### - Đọc lại báo cáo bug trước khi nhấn nút submit
Đọc lại tất cả các câu, từ và các bước được dùng trong báo cáo lỗi. Nếu có bất kỳ câu nào tạo ra sự mơ hồ có thể dẫn đến hiểu nhầm, tester phải thay thế các từ ngữ này để tránh gây hiểu lầm và để báo cáo lỗi rõ ràng hơn.
### - Không sử dụng ngôn ngữ gây tổn thương người đọc
Sẽ tốt hơn khi tester vừa tìm ra lỗi vừa không dùng các từ ngữ gây tổn thương đến dev hoặc bất kỳ người nào đọc báo cáo.
## 5. Kết luận
- Tập trung vào việc viết báo cáo lỗi tốt và dành thời gian cho công việc này vì đây là tài liệu giao tiếp chính giữa tester, dev và manager. Các manager nên tạo một nhận thức cho team rằng việc viết một báo cáo lỗi tốt là trách nhiệm chính của bất kỳ tester nào.
- Nỗ lực của tester để viết một báo cáo lỗi tốt không chỉ tiết kiệm tài nguyên của công ty mà còn tạo ra một mối quan hệ tốt đẹp giữa tester và dev.
 
 

------------------------------------------------------------------------------------------------------------------------
Link tham khảo:
https://www.softwaretestinghelp.com/how-to-write-good-bug-report/