Sau đây, chúng ta sẽ tìm hiểu về bước cuối cùng nhưng vô cùng quan trọng trong quá trình kiểm thử: Log bug hay còn gọi Tạo Bug report:
1. Bug report là gì?
Giả sử 1 bug xuất hiện (tất nhiên là nó sẽ xuất hiện) người tìm ra Bug phải có thể report nó (bằng văn bản và gửi) cho người có liên quan để sửa lỗi đó. Tưởng tượng rằng bạn gặp phải 1 bug và muốn send bug report. Bạn sẽ trình bày những thông tin gì?
Hầu như mỗi người đều có một câu trả lời của riêng mình, 9 người 10 ý.

2. Tại sao cần một bug report chuẩn?
Bất cứ ai cũng có thể viết một báo cáo lỗi. Nhưng không phải ai cũng có thể viết một báo cáo lỗi hiệu quả. Bạn có thể phân biệt giữa một báo cáo lỗi trung bình và một báo cáo lỗi tốt. Nếu bug report hiệu quả, tỉ lệ được fix của nó sẽ cao hơn. Việc fix bug phụ thuộc vào việc bạn report nó có hiệu quả hay không. Nó là một nghệ thuật, và bài viết này hướng dẫn bạn làm sao để trở thành một nghệ sỹ.
“The point of writing problem report(bug report) is to get bugs fixed” – Cem Kaner.
Khi tester report bug không chính xác, dev có thể reject bug vì không thể tái hiện (reprod ) được bug. 

3. Điều gì quyết định một bug report tốt?
Bạn sẽ thắc mắc rằng điều gì khiến cho một bug report tốt, và điều gì làm nó dở. Và tại sao cái dở lại nhiều hơn cái tốt? Dưới đây mình sẽ liệt kê ra một số phát biểu về vấn đề này để tách biệt giữa một bug report tốt, và một bug report tệ:
- Bug report tốt chứa đủ thông tin để reprod và sửa lỗi. Bug report tệ không chứa đủ thông tin để reprod và sửa lỗi.
- Bug report tốt là một cách hữu hiệu để liên lạc giữa người report bug và người sửa bug. Bug report tệ thường quá dài, và là phương tiện thiếu hữu hiệu để liên lạc giữa những người liên quan.
- Bug report tốt được sửa nhanh. Bug report tệ không bảo giờ được fix.
- Bug report tốt được gửi đến đúng người chịu trách nhiệm. Bug report tệ thì chẳng gửi ai, hoặc gửi nhầm người.
- Bug report tốt mô tả đúng thứ gì cần sửa. Bug report tệ không chứa đủ thông tin chi tiết.
- Bug report tốt được gửi theo đúng cách. Bug report tệ gửi theo đủ cách, nhưng không đúng (qua facebook hay mail chẳng hạn)
- Bug report tốt tạo nên được tiền đề để phối hợp. Bug report tệ sẽ khiến người ta không chịu hợp tác.

    Báo cáo lỗi là một khía cạnh quan trọng của kiểm thử phần mềm. Một báo cáo lỗi hiệu quả giao tiếp tốt với đội ngũ phát triển và tránh nhầm lẫn hoặc miscommunication. Sau đây là một số phương pháp áp dụng để báo cáo lỗi.
- Có đầu bug rõ ràng: Luôn assign một số duy nhất cho mỗi đầu bug. Điều này sẽ giúp bạn xác định bản ghi lỗi. Nếu bạn đang sử dụng bất kỳ công cụ báo lỗi tự động nào thì số duy nhất này sẽ được tạo tự động mỗi khi bạn báo cáo lỗi. Note lại số và mô tả ngắn gọn về mỗi lỗi bạn đã báo cáo.
- Khả năng tái sản xuất: Nếu lỗi của bạn không thể tái tạo, thì nó sẽ không bao giờ được sửa chữa. Bạn nên đề cập rõ đến các bước để tạo lại lỗi. Đừng giả sử hoặc bỏ qua bất kỳ bước sao chép nào. Từng bước mô tả vấn đề lỗi để dễ dàng để sao chép và sửa chữa.
- Cụ thể: Đừng viết một bài tiểu luận về vấn đề. Cụ thể và đúng vào vấn đề. Cố gắng tóm tắt vấn đề bằng những từ tối thiểu một cách hiệu quả. Không kết hợp nhiều vấn đề ngay cả khi chúng dường như tương tự. Viết các bug khác nhau cho từng vấn đề.
- Một báo cáo lỗi tốt phải rõ ràng và súc tích mà không thiếu các điểm chính. Bất kỳ sự thiếu nào rõ ràng dẫn đến sự hiểu nhầm và làm chậm quá trình phát triển. Viết và báo lỗi là một trong những phần quan trọng nhất nhưng bị bỏ quên trong vòng đời thử nghiệm.
- Viết tốt là một quá trình quan trọng để tạo một lỗi. Một điều quan trọng mà một tester nên ghi nhớ là không sử dụng lệnh commanding tone trong báo cáo. Điều này phá vỡ tinh thần và tạo ra một mối quan hệ công việc không lành mạnh. Sử dụng từ ngữ gợi ý.
- Đừng cho rằng nhà phát triển đã làm sai và bạn có thể sử dụng từ khắc nghiệt. Nó cũng quan trọng trước khi báo cáo để kiểm tra cho cùng một lỗi đã được báo cáo hay không.
- Lỗi trùng lặp là một gánh nặng trong chu kỳ kiểm tra. Kiểm tra danh sách các lỗi đã biết. Có thể xảy ra rằng các nhà phát triển đã biết đến vấn đề này và bỏ qua để release trong tương lai. Các công cụ như Bugzilla có thể được sử dụng để tự động tìm kiếm các lỗi trùng lặp. Tuy nhiên, tốt nhất là tự tìm kiếm bất kỳ lỗi trùng lặp nào.
- Thông tin nhập mà báo cáo lỗi phải liên lạc là "Làm thế nào?" Và "Ở đâu?" Báo cáo phải rõ ràng câu trả lời về cách kiểm tra đã được thực hiện và nơi xảy ra khiếm khuyết. Người đọc nên dễ dàng sao chép lỗi và tìm lỗi ở đâu.
- Hãy nhớ rằng mục tiêu của việc viết báo cáo lỗi là để cho nhà phát triển để hình dung ra vấn đề. Anh / Cô ấy nên hiểu lỗi từ bản báo cáo lỗi. Hãy nhớ cung cấp cho tất cả các thông tin có liên quan mà nhà phát triển đang tìm kiếm.
- Đồng thời, lưu ý rằng một báo cáo lỗi sẽ được lưu giữ để sử dụng trong tương lai và cần được viết bằng các thông tin cần thiết. Sử dụng những câu có ý nghĩa và những từ đơn giản để mô tả lỗi của bạn. Không sử dụng các câu nói khó hiểu gây lãng phí thời gian của người đánh giá.
- Báo cáo từng lỗi như một vấn đề riêng biệt. Trong trường hợp nhiều vấn đề trong một báo cáo lỗi, bạn không thể đóng nó trừ khi tất cả các vấn đề được giải quyết. Do đó tốt nhất là chia các vấn đề thành lỗi riêng. Điều này đảm bảo rằng mỗi lỗi có thể được xử lý riêng. Một báo cáo lỗi viết bằng văn bản giúp nhà phát triển tạo ra lỗi tại thiết bị đầu cuối của họ. Điều này giúp họ chẩn đoán vấn đề.

4. Cách báo cáo lỗi?
Đây là một format đơn giản của bug report. Tuỳ thuộc vào tool bạn đang dùng. Nếu bạn viết bug thủ công (excel...) thì có một số trường cần quan tâm đặc biệt, ví dụ như BUG ID hoặc priority.
- Reporter: Tên và email của bạn
- Product: Tên của Application Under Test (AUT)
- Version: Version đang test.
- Component: Module lớn của app.
- Platform: Mô tả nền tảng bạn dùng để chạy sản phẩm. Vd: Android, PC ..v...v
- Operating system: Mô tả hệ điều hành bạn dùng để test sản phẩm. Vd: Windows 10, Android 4.4.2....v..v.
- Priority: Bug nên được fix khi nào? Thường thì sẽ được set từ P.1 tới P.5 trong đó P.1 là "Fix càng sớm càng tốt" và P.5 là "Cho vào backlog"
- Severity: Types of Severity:
- Blocker: Không thể tiếp tục test.
- Critical: App crash, mất data.
- Major: Lỗi chức năng nghiêm trọng.
- Minor: Lỗi chức năng nhỏ.
- Trivial: Lỗi UI, lỗi alignment..v..v.
- Enhancement: Request để thêm feature mới hoặc cải thiện feature có sẵn.
- Status: Khi mới được log in hệ thống, bug sẽ ở trạng thái new và tuỳ trường hợp mà thành Verified, Fixed, Won\'t Fix, Reopen..v..v. Cái này sẽ nói rõ hơn vào bài khác.
- Assign To: Người nhận trách nhiệm fix bug của bạn. Ở nhiều cty trường này được để trống để PM tự assign người.
- URL: URL xảy ra bug.
- Summary: Giới hạn trong 60 từ. Mô tả bug ở đâu và bug xảy ra thế nào.
- Description: Description của bug. Ở đây ta có thể dùng cách viết sau.
- Reproduce steps: Mô tả rõ ràng các bước để xảy ra bug. Tuyệt đối không giả dụ, không bỏ step. Cứ nghĩ là bạn đang viết cho một đứa nhỏ 5 tuổi đọc và tìm bug.
- Expected result: Chúng ta trông đợi cái gì.
- Actual result: Và chúng ta nhận được gì (I.E đây là bug)

    Trên đây là những step quan trọng cần có trong 1 bug report. Bạn cũng có thể thêm trường Bug Type để mô tả dạng bug report.
    Thường là:
- Lỗi Coding
- Lỗi Design
- New suggestion
- Documentation issue
- Hardware problem

5. Các tính năng quan trọng trong báo cáo lỗi của bạn
- Số lỗi / id: Số lỗi hoặc số nhận dạng (như swb001) làm cho việc báo cáo lỗi và đề cập đến một lỗi dễ dàng hơn. Nhà phát triển có thể dễ dàng kiểm tra nếu một cụ thể đã được cố định hay không. Nó làm cho việc kiểm tra toàn bộ và thử lại mượt mà và dễ dàng hơn.
- Tiêu đề lỗi: Tiêu đề lỗi được đọc nhiều hơn bất kỳ phần nào khác của báo cáo lỗi. Nó nên nói về những gì có trong lỗi. Tiêu đề lỗi nên gợi ý đủ để người đọc có thể hiểu nó. Một tiêu đề rõ ràng rõ ràng làm cho nó rõ ràng để hiểu và người đọc có thể biết được nếu lỗi đã được báo cáo trước đó hoặc đã được cố định.
-  Mức độ ưu tiên: Dựa vào mức độ nghiêm trọng của lỗi, bạn có thể đặt ưu tiên cho nó. 1 lỗi có thể là một Blocker, Critical, Major, Minor, Trivial, hoặc một gợi ý. Ưu tiên lỗi từ P1 đến P5 có thể được cung cấp để những điểm quan trọng được xem trước.
- Nền tảng / Môi trường: Hệ điều hành và cấu hình trình duyệt là cần thiết cho một báo cáo lỗi rõ ràng. Đó là cách tốt nhất để truyền đạt về cách mà lỗi có thể được sao chép. Nếu không có nền tảng chính xác hoặc môi trường, ứng dụng có thể hoạt động khác và lỗi ở cuối của người thử nghiệm không thể sao chép vào cuối của nhà phát triển. Vì vậy, tốt nhất để đề cập đến rõ ràng môi trường trong đó phát hiện lỗi.
-  Mô tả: Mô tả lỗi giúp nhà phát triển hiểu lỗi. Nó mô tả các vấn đề gặp phải. Mô tả nghèo nàn sẽ tạo ra sự nhầm lẫn và lãng phí thời gian của các nhà phát triển và người kiểm tra là tốt. Cần phải thông báo rõ ràng về hiệu quả trong mô tả. Sẽ rất hữu ích nếu sử dụng các câu hoàn chỉnh. Đó là một cách thực hành tốt để tách riêng từng vấn đề một cách riêng biệt thay vì làm hỏng chúng hoàn toàn. Không sử dụng cụm từ như "Tôi nghĩ" hoặc "Tôi tin".
-  Các bước để sao chép: Báo cáo lỗi tốt nên đề cập rõ đến các bước để sao chép. Các bước nên bao gồm các hành động gây ra lỗi. Không đưa ra các tuyên bố chung. Hãy cụ thể trong các bước để làm theo.
- Kết quả mong đợi và thực tế: Mô tả lỗi không đầy đủ mà không có kết quả mong đợi và thực tế. Cần phải phác thảo kết quả của bài kiểm tra là gì và những gì người dùng nên mong đợi. Người đọc nên biết kết quả chính xác của bài kiểm tra. Rõ ràng, đề cập đến những gì đã xảy ra trong quá trình thử nghiệm và kết quả là gì.
- Ảnh chụp màn hình: Một bức tranh trị giá ngàn chữ. Chụp ảnh màn hình của trường hợp thất bại với phụ đề phù hợp để làm nổi bật lỗi. Làm nổi bật các thông báo lỗi không mong muốn với màu đỏ nhạt. Điều này thu hút sự chú ý đến khu vực yêu cầu.

6. Một số mẹo để viết báo cáo lỗi tốt
- Báo cáo vấn đề ngay lập tức: Nếu bạn phát hiện thấy bất kỳ lỗi nào khi thử nghiệm, đừng chờ đợi để viết báo cáo lỗi chi tiết sau. Thay vào đó hãy viết báo cáo lỗi ngay lập tức. Điều này sẽ đảm bảo báo cáo lỗi tốt và có thể tái sản xuất được. Nếu bạn quyết định viết báo cáo lỗi sau đó thì cơ hội để bỏ lỡ các bước quan trọng trong báo cáo của bạn.
- Tái hiện lỗi ba lần trước khi viết báo cáo lỗi: Lỗi của bạn phải được tái hiện. Đảm bảo rằng các bước của bạn đủ mạnh để tạo lại lỗi mà không có bất kỳ sự mơ hồ nào. Nếu lỗi của bạn không được tái hiện, bạn vẫn có thể gửi một lỗi đề cập đến bản chất định kỳ của lỗi.
- Kiểm tra sự cố lỗi tương tự trên các mô đun tương tự: Đôi khi nhà phát triển sử dụng cùng một mã cho các mô đun tương tự khác nhau. Vì vậy, rất có thể là cao lỗi trong một mô-đun có thể xảy ra trong các mô-đun tương tự khác là tốt. Bạn thậm chí có thể thử tìm phiên bản lỗi nghiêm trọng hơn bạn tìm thấy.
- Viết một bản tóm tắt lỗi tốt: Bản tóm tắt lỗi sẽ giúp các nhà phát triển nhanh chóng phân tích bản chất lỗi. Báo cáo chất lượng kém sẽ làm tăng thời gian phát triển và thử nghiệm không cần thiết.  Lưu ý rằng bản tóm tắt lỗi được sử dụng làm tài liệu tham khảo để tìm kiếm lỗi trong bản kiểm kê lỗi.
- Đọc báo cáo lỗi trước khi nhấn nút Submit: Đọc tất cả các câu, từ ngữ, các bước được sử dụng trong báo cáo lỗi. Xem nếu bất kỳ câu nào đang tạo ra sự mơ hồ có thể dẫn đến hiểu sai. Cần tránh các từ hoặc câu gây hiểu lầm để có một bản báo cáo lỗi rõ ràng.
- Không sử dụng ngôn ngữ Lạm dụng: Rất vui khi bạn đã làm việc tốt và tìm ra lỗi nhưng không sử dụng tín dụng này để chỉ trích nhà phát triển hoặc tấn công bất kỳ cá nhân nào.

Kết luận:
Không nghi ngờ gì nữa, báo cáo lỗi của bạn phải là một tài liệu có chất lượng cao. Tập trung vào việc viết báo cáo lỗi tốt và dành thời gian cho nhiệm vụ này vì đây là điểm giao tiếp chính giữa người kiểm tra, nhà phát triển và người quản lý. Người quản lý nên tạo ra nhận thức cho nhóm của họ rằng việc viết báo cáo lỗi tốt là trách nhiệm chính của bất kỳ người kiểm tra nào.
Nỗ lực của bạn để viết một báo cáo lỗi tốt sẽ không chỉ tiết kiệm tài nguyên của công ty mà còn tạo ra một mối quan hệ tốt giữa bạn và các nhà phát triển.