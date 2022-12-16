Tôi đã có kinh nghiệm unit test code của tôi trong nhiều năm. Trong khi xây dựng hệ thống GIS , chúng tôi thực sự quan tâm đến chất lượng sản phẩm của mình. Nhu cầu của người dùng của chúng tôi yêu cầu ứng dụng hoạt động chính xác. Tôi đã cover 100% tất cả các phần quan trọng và phức tạp trong code của tôi, với nhiều paths và case khác nhau. Tôi cảm thấy vui khi tìm thấy lỗi, sửa nó, viết một vài bài test cho lỗi này và chắc chắn rằng nó sẽ không bị 1 lần nữa. 

Dưới đây là bộ sưu tập các best practices mà tôi đã xây dựng trong nhiều năm qua. Xin lưu ý: Tôi sẽ cho rằng bạn đã quen với khái niệm unit test.

Test cái gì
Tất nhiên, bạn có nguồn lực hạn chế và để test hoàn toàn mọi thứ sẽ cần một lượng thời gian khổng lồ. Bên cạnh đó, bạn cần giải thích unit test và lợi ích của nó cho người quản lý dự án của bạn và đàm phán với họ. Đó là lý do tại sao bạn cần ưu tiên.

Cách tốt nhất để ưu tiên là xem xét nhu cầu kinh doanh.

Nó có vẻ đáng ngạc nhiên đối với 1 developer. Bạn có thể nghĩ: test là code, chúng không liên quan gì đến kinh doanh.

Trong thực tế,code phải liên quan chặt chẽ với kinh doanh . Cuối cùng, bạn viết code để giải quyết vấn đề mà người dùng của bạn gặp phải và đó là nhu cầu kinh doanh.

Chọn phần quan trọng nhất của hệ thống. Đó có phải là kinh nghiệm mua hàng của khách hàng của bạn? Đây có phải là công cụ mà người dùng của bạn làm việc không? Có phải là luồng dữ liệu? Nó có phải là một phép tính toán phức tạp không?

Xác định nơi này và bắt đầu từ đó. Vì đó là phần quan trọng nhất của hệ thống, hoàn toàn phải hoạt động bình thường, bạn có thể biện minh cho việc dành thời gian cho unit test

Tại sao lại cần Unit Test
Unit test giúp đảm bảo code hoạt động chính xác. Unit test là một cách tuyệt vời để thực hiện test hồi quy: chỉ cần chạy chúng mỗi khi bạn thay đổi gì đó và đảm bảo không có chỗ nào  bị lỗi. Phát hiện một lỗi? Khắc phục và viết unit test để đảm bảo nó không xảy ra lần nữa.

Đối với các phần quan trọng của code, bạn cần viết các bài unit test để đảm bảo code hoạt động:

Trong trường hợp cơ bản
Khi người dùng và code khác làm những gì mong đợi từ họ.

Những bài test này là dễ viết nhất - sau tất cả, tất cả chúng ta đều hướng đến thành công :).

Truyền các param thích hợp cho function của bạn và làm cho bài test mong đợi giá trị trả về thích hợp.

Trong trường hợp biên
Bạn muốn đảm bảo code hoạt động trong các trường hợp biên- khi một kịch bản hiếm xảy ra.

Truyền 0 cho hàm toán học của bạn. Truyền -1. Truyền INT_MAX. Truyền một chuỗi empty.

Trong trường hợp thất bại
Bạn cũng cần xác minh rằng code bị hỏng . Ví dụ: nếu một hoạt động tài chính thất bại, chúng tôi phải chắc chắn rằng tiền đã không biến mất hoàn toàn.

Truyền một NULL object. Tạo ra các trường hợp ngoại lệ.
Bạn nghĩ rằng điều này là không thể bởi vì code gọi hàm của bạn không làm điều đó? Có lẽ ngay bây giờ là trường hợp; nhưng code thay đổi. Nếu frontend validate tất cả input, nhưng ngày mai có người refactor nó, bạn không muốn backend của mình bắt đầu bị lỗi bất ngờ.
Sau khi bao gồm code quan trọng nhất với các unit test toàn diện, bạn có thể làm việc theo cách của bạn đối với code ít quan trọng hơn, với các unit test ít hơn. Đó là sự tiên!
Modularization và phụ thuộc
Đôi khi, bước đầu tiên sẽ là chuẩn bị đoạn code của bạn để unit test. Đây là lúc Modularization phát huy tác dụng! Code càng nhiều mô-đun, càng dễ test.

Sau khi bạn xác định được các dependencies và phân chia chúng đúng cách, phần còn lại là dễ dàng. Đối với unit test, bạn phải mock các dependency, để đảm bảo bạn chỉ test hành vi của mô-đun hiện tại của mình. Nếu không, bạn cũng sẽ test hành vi của những thứ khác mà nó phụ thuộc vào. Nhưng những phần thì này cần được test riêng.

Bạn cũng có thể quyết định test mô-đun với các dependency. Mặc dù một số người có thể nói rằng nó không phải là unit test nữa (mà là integration test), nó vẫn là test và nó vẫn có tác dụng.


Test structure
Test đặt tên
Có một số cách tiếp cận để đặt tên cho các phương pháp thử nghiệm. Theo tôi điều quan trọng nhất là - cái tên đó phải được mô tả. Càng chi tiết càng tốt. Hãy để nó dài 200 ký tự - càng rõ ràng, càng tốt.

Bài test nhỏ
Vì tất cả các bài test đều có tên rất rõ ràng, bạn có thể thêm càng nhiều bài test nhỏ càng tốt - cho tất cả các ngóc ngách của bạn trong các trường hợp góc. Hãy chắc chắn rằng bài test của bạn chỉ test một kịch bản.

Cấu trúc thư mục
Đối với tôi, nó trở nên thuận tiện nhất khi cấu trúc dự án thử nghiệm lặp lại cấu trúc dự án chính. Bằng cách này, thật dễ dàng để tìm các bài test cho mô-đun.

Test độc lập
Hãy chắc chắn rằng các bài test của bạn không phụ thuộc vào nhau. Thực hiện một bước làm sạch vào đầu và cuối mỗi thử nghiệm, nếu bạn cần nó - thường có các phương pháp đặc biệt trong khung unit test để làm điều đó.

Thay đổi code - chạy thử nghiệm
Đôi khi tôi nghe ai đó hỏi: làm thế nào để tôi hiểu đoạn test nào sẽ chạy khi tôi chỉnh sửa code?

Chạy tất cả!

Vì cấu trúc thư mục để test lặp lại code cho code chính, nên rất dễ tìm thấy gói test liên quan đến thay đổi của bạn.

Khi bạn thực hiện bước mô đun hóa , và cả khi bạn làm cho chúng nhỏ, bạn đã chắc chắn rằng nó  chạy nhanh. Vì vậy, bạn có thể đủ khả năng để chạy test package khá thường xuyên, ví dụ, trong khi bạn phát triển và trước khi push code.

Thêm code - viết bài test
Thay đổi đoạn code quan trọng, theo nhu cầu kinh doanh của bạn, phải hoạt động? Viết một bài test.

Sửa một lỗi? Viết một bài test. Hãy biến nó thành thói quen! Các thử nghiệm là một phần quan trọng của code, vì vậy hãy nỗ lực để cập nhật chúng và chúng sẽ giúp bạn tiết kiệm được nhiều lần.

Không sao nếu các bài test vượt quá code
Trong thực tế, đó là đúng!

Thật tuyệt nếu bạn có nhiều bài test cho một đoạn code - điều đó có nghĩa là bạn test rất nhiều trường hợp.

Không sao nếu bạn dành thời gian cho việc viết bài test - đôi khi, thậm chí nhiều hơn là viết code. Test là một mạng lưới an toàn cho các bộ phận kinh doanh quan trọng của bạn, nhớ không?

Khi không cần unit test
Trong dự án của tôi, chúng tôi đã không cover tất cả các code của chúng tôi bằng các bài unit test. Đối với một số người, chúng tôi đã đưa ra quyết định có ý thức không làm điều đó. Vì vậy, khi nào nó không cần thiết?

Khi code của bạn không quan trọng và doanh nghiệp của bạn có thể mắc một số lỗi trong phần đó của hệ thống.

Khi nỗ lực để làm cho code có thể test và viết các bài kiểm tra là quá lớn và kiểm tra thủ công đòi hỏi ít nỗ lực hơn. Bạn cần ước tính effort, trong khoảng thời gian bạn dự định maintain dự án.

Khi có một dependency mà bạn không thể trừu tượng hóa: bạn đã chuyển nó ra khỏi tất cả các mô-đun khác thành một mô-đun, nhưng bạn không thể loại bỏ nó khỏi đó. Trong trường hợp này, bạn có thể unit test tất cả các mô-đun khác, nhưng mô-đun này sẽ phải kệ như hiện tại. Một ví dụ phổ biến là một mô-đun sử dụng current timestamp.

Khi đó là một prototype, một proof-of-concept, hoặc code thử nghiệm và bạn cần phát triển nó nhanh nhất có thể, và dù sao bạn cũng có thể sẽ vứt nó đi.

Và cuối cùng nhưng không kém phần quan trọng - khi bạn chắc chắn code của mình là tốt nhất :)

Nguồn: http://smartpuffin.com/unit-testing-best-practices/