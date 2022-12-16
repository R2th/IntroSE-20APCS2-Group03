Khi mới bắt đầu học SQL, hồi tôi còn viết Perl CGI scripts cổ điển với những người bạn "tối cổ" của tôi. Thật là kỳ diệu; một bước chuyển đổi trong sự nghiệp của tôi là một kỹ sư phần mềm. Nếu không có sự hiểu biết ban đầu đó, làm thế nào để chia các business concepts thành các bảng riêng biệt, sau đó liên kết và tìm kiếm trên các bảng đó bằng cú pháp tiếng Anh.

Hồi đó, tôi và đồng nghiệp "tối cổ" của mình phải lập trình xây dựng từng truy vấn `INSERT`, `UPDATE` và `SELECT`. Chúng tôi đã không sử dụng một object relational mapper (nó có thể đã tồn tại; nó dường như không nắm trong suy nghĩ của cả team). Rất nhiều lần, việc xây dựng các truy vấn SQL rất tẻ nhạt và dễ bị lỗi. Vì vậy, hãy tưởng tượng niềm vui của tôi khi lần đầu tiên tôi chọn Rails và bắt đầu thay thế raw SQL bằng code Ruby thanh lịch thực hiện các thao tác với database.

Hiện tại, 14 năm sau khi tạo ứng dụng Rails đầu tiên, tôi hiếm khi phải viết SQL của riêng mình. Active Record đã xử lý hết các công việc. Nó giúp bảo vệ khỏi các lỗi ngớ ngẩn và các lỗ hổng bảo mật, khi được sử dụng đúng cách. Thành thật mà nói, việc nhớ lại SQL ngay lập tức đã khiến tôi gặp phải một số khó khăn và mất thời gian suy nghĩ rất nhiều về cách viết một câu SQL khi mà ActiveRecord không hỗ trợ.

Có ai trong chúng ta đã tự hỏi, với Active Record mạnh mẽ như bây giờ, tại sao một Rails developer lại cần có hiểu biết về SQL?

Có thể nói rằng, khi đã làm việc với ActiveRecord trong Rails thì gần như chúng ta không cần thiết phải biết về SQL để xây dựng một ứng ổn định, nhưng với 7 kịch bản dưới đây thì bạn có thể sẽ cần phải suy nghĩ lại về việc nắm rõ hơn về SQL

# Các truy vấn thủ công tốt hơn với Active Record
Lưu ý rằng việc này không phải lúc nào cũng đúng. Active Record là một công cụ rất mạnh mẽ hỗ trợ rất nhiều với các lập trình viên Rails, nhưng không phải là trong tất cả các trường hợp.

Điều gì xảy ra khi bạn muốn include dữ liệu từ một bảng riêng biệt trong truy vấn của mình? Nếu bạn biết SQL, thì bạn sẽ biết cần phải sử dụng `JOIN`. ActiveRecord thuận tiện kết hợp một phương thức `joins` để thực hiện điều này, nhưng nếu bạn không biết về biệt ngữ, hoặc khái niệm đằng sau nó, bạn có thể thấy mình đang tìm kiếm một câu trả lời một cách mù quáng.

# Thực hiện các truy vấn mà Activerecord không thể làm
Active Record trừu tượng hóa rất nhiều SQL, nhưng không phải tất cả. Ví dụ: bạn không thể thực hiện `LEFT OUTER JOIN` bằng cách sử dụng Active Record một mình cho đến khi Rails 5 được phát hành. Nếu ứng dụng của bạn vẫn chạy phiên bản cũ hơn hoặc bạn cần sử dụng một hàm SQL duy nhất cho nhà cung cấp cơ sở dữ liệu (database vendor) của mình, thì bạn sẽ cần phải viết truy vấn SQL bằng tay.

Kèm với đó là một nhược điểm: Một phần của điều kỳ diệu đằng sau Active Record là lớp trừu tượng mà nó áp dụng trên nhiều nhà cung cấp cơ sở dữ liệu. Viết raw SQL thay cho nó có thể làm cho code của bạn ít linh hoạt hơn. Nghĩa là nếu bạn chuyển từ database engine này sang database engine, rất có thể cần phải viết lại truy vấn đó. Hãy chắc chắn rằng bạn đã có thực hiện test đầy đủ và chắc chắn khi áp dụng phương pháp này.

Như đã nói, chúng ta có thể sẽ chỉ thực hiện việc đổi database engine một vài lần nên, đừng lo sợ nếu bạn đã viết SQL bằng tay vì Active Record không hỗ trợ.

# Thực hiện các truy vấn đặc biệt - ad-hoc queries
Ứng dụng của bạn có thể có trang admin quản lý mạnh mẽ với các báo cáo đẹp mắt được trình bày trong giao diện người dùng khéo léo, nhưng bạn sẽ làm gì khi được hỏi về một số dữ liệu mà không có sẵn ngay lập tức thông qua giao diện người dùng? Tùy thuộc vào thiết lập môi trường production của bạn, việc truy cập ngay vào dữ liệu có thể thông qua bảng điều khiển cơ sở dữ liệu (database console). Bạn có thể xử lý ngay các công việc đó thông qua các câu truy vấn SQL.

# Cải thiện hiệu suất ứng dụng
Như bạn đã biết, Active Record phải thực hiện thêm một vài bước để chuyển đổi truy vấn từ một chuỗi các phương thức Ruby sang câu lệnh SQL để chuyển đến *database engine*. Tuy nhiên không phải lúc nào nó cũng đủ nhanh. Trong những trường hợp như vậy, việc hiểu cách soạn một truy vấn SQL có được thông tin bạn cần một cách nhanh chóng và chính xác là rất quan trọng.

Cùng cảnh báo về lock-in nhà cung cấp cơ sở dữ liệu áp dụng. Nếu bạn sử dụng các thủ thuật hiệu suất chỉ có sẵn cho nhà cung cấp cơ sở dữ liệu hiện tại, bạn sẽ cần phải viết lại truy vấn nếu bạn chuyển đổi engines.

# Hiểu mã kế thừa
Active Record đạt được các tính năng mới với mỗi bản release của Rails. Nếu ứng dụng của bạn đã được đưa lên production, bạn có thể gặp phải các truy vấn không thể được thực hiện bởi Active Record tại thời điểm đó và do đó được viết bằng tay. Với một số hiểu biết về SQL, bạn có thể hiểu những gì các nhà phát triển trước đó cần phải thực hiện với code và truy vấn được đề cập. Bạn có thể tự tin thay đổi truy vấn và thậm chí có thể sử dụng cả phiên bản mới nhất của Active Record.

Trong số các lý do tôi đã liệt kê ở đây, đây là lý do tôi gặp phải thường xuyên nhất trong các dự án mà tôi làm việc. Raw SQL thực sự nổi bật khi được nối với code Ruby đẹp, nhưng tôi biết không phải ngẫu nhiên hoặc lén lút mà các nhà phát triển trước đây đã sử dụng nó. Và đôi khi, tôi có thể viết lại truy vấn bằng các công cụ Active Record không có sẵn cho các nhà phát triển trước đó và giảm thiểu việc chuyển ngữ cảnh cho các nhà phát triển trong tương lai.

# Không chỉ làm việc với Rails
Tôi đã làm việc chuyên nghiệp với Ruby, Perl, Python, PHP, ASP, JavaScript và có lẽ một vài ngôn ngữ khác mà tôi đã quên, để phát triển phụ trợ cho các ứng dụng web. Trong tất cả các kịch bản đó, cơ sở dữ liệu dựa trên SQL là hằng số. Nếu bạn từng thấy mình làm việc với một ngôn ngữ hoặc framework khác với Ruby on Rails, các kỹ thuật kết nối từ framework với cơ sở dữ liệu có thể hoàn toàn khác nhau, nhưng ẩn sau đó, có khả năng nó vẫn là SQL. Và hiểu được các nguyên tắc cơ bản sẽ giúp bạn chọn ra những gì độc đáo của cách framework tương tác cơ sở dữ liệu.

# Chuẩn bị cho phỏng vấn 
Điều này nghe có vẻ như không được hay cho lắm, nhưng thực tế thì nó là một điều rất quan trọng với lợi ích lâu dài của bạn. Bất kì công việc nào cũng vẫn thường liệt kê sự hiểu biết (mạnh mẽ)  về SQL như một yêu cầu bắt buộc. Nếu bạn bước vào một cuộc phỏng vấn vào sáng mai, bạn có thể chứng minh sự hiểu biết như vậy không?

Không ai có thể đảm bảo sau này sẽ có những ngôn ngữ hoặc framework mới thay thế Ruby và Rails. Nhưng với SQL thì điều đó sẽ có thể là khó bị thay thế. Và như tôi đã hy vọng lúc này đã thuyết phục bạn, có rất nhiều lý do cần thiết khác để giữ một số hiểu biết nhất định về SQL, bởi vì bạn không bao giờ biết khi nào nó sẽ hữu ích.

Bài viết được dịch từ [nguồn](https://everydayrails.com/2019/02/18/rails-sql-requirements.html). Cảm ơn các bạn đã theo dõi!