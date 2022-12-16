**Có Phải SQL Động Luôn Luôn Chậm?**
      Gần đây tôi có tranh luận với một người cùng team xung quanh một chức năng của module quản lý nhóm khách hàng. Khi thảo luận về phần sql code, có hai phương án được đưa ra: dùng sql động, hoặc cố gắng dùng sql tĩnh. Dùng sql động thì code rất đơn giản, còn dùng sql tĩnh thì vòng vèo mà phải tạo thêm một số meta data để hỗ trợ. Anh chàng cùng team gợi ý dùng sql tĩnh, với lý do là dùng sql động làm giảm hiệu năng thực hiện.
    Tuy đúng là sql động chậm hơn sql tĩnh, nhưng sự “chậm hơn” này nhiều hay ít còn phụ thuộc vào từng ngữ cảnh. Sql động yêu cầu câu lệnh được biên dịch lại mỗi khi thực hiện (còn tùy theo cách viết). Trong khi sql tĩnh có thể dùng lại phương án thực thi đã biên dịch cho đến khi bị loại khỏi cache. Vì thế tần suất thực hiện của câu lệnh càng lớn thì nhược điểm này của sql động càng bộc lộ rõ so với sql tĩnh. Ví dụ một câu lệnh được gọi liên tục từ trang chủ của một website thì sql động chắc không thích hợp. Tuy nhiên, khi tần suất thực hiện giảm xuống thì khác biệt giữa hai phiên bản cũng trở nên ít đáng kể đi. Như trong trường hợp tôi nêu ở trên, chức năng này được dùng khoảng 5 lần/1 tháng bởi vài ba user trong nội bộ công ty. Khi đó khả năng câu lệnh sql tĩnh có phương án thực thi lưu sẵn trong cache là zero (tôi không nhớ chính xác thời gian lâu nhất được lưu là bao nhiêu, nhưng là rất ngắn, hình như 30s). Do đó mỗi lần chức năng được gọi đến, câu lệnh sql tĩnh cũng sẽ được biên dịch lại y chang như câu lệnh động, không có gì nhanh hơn.
Tuy khi sử dụng sql động bạn còn có một vài điểm khác cần lưu ý, nhưng bạn nên cân nhắc cả các yếu tố tần suất thực hiện và độ phức tạp của từng phương pháp mà chọn cách làm cho phù hợp. Có thể trong một số trường hợp, sql động lại là cách làm ưu thế hơn cả.

**Một số đặc tính của sql động**
Dù bạn dùng phương pháp thực hiện nào, sql động cũng có những đặc tính mà bạn cần nắm được khi sử dụng
Ngữ cảnh mới: chuỗi sql động khi thực thi sẽ tạo ra một ngữ cảnh mới, khác với ngữ cảnh mà thủ tục chứa nó đang thực thi. Điều này dẫn đến:

Các biến được khai báo trong thủ tục sẽ không truy cập được bên trong đoạn sql động; thậm chí bạn có thể khai báo biến bên trong sql động trùng tên với một biến trong trủ tục mà không bị phàn nàn gì.
Bảng tạm được tạo trong thủ tục có thể dùng trong đoạn sql động. Tuy nhiên bảng tạm tạo bên trong đoạn sql động chỉ tồn tại bên trong đó, khi đoạn sql động kết thúc thực thi thì bảng cũng bị xóa.
Bên trong sql động bạn có thể dùng lệnh USE để đổi sang database khác và các lệnh SQL trong đoạn đó sẽ thực hiện trên database mới; nhưng khi kết thúc đoạn sql động thì ngữ cảnh lại trở về database lúc đầu khi thủ tục bắt đầu thực thi.
sql động có kế hoạch thực thi riêng không nằm trong kế hoạch thực thi của thủ tục. Khi đoạn sql động cần biên dịch lại, nó có thể có kế hoạch thực thi mới nhưng kế hoạch thực thi của thủ tục (các phần khác) vẫn được giữ nguyên.
Quyền: Sql động đòi hỏi user thực hiện thủ tục chứa nó có đủ quyền trên các bảng được dùng trong đoạn đó. Ví dụ đoạn sql động thực hiện SELECT từ một bảng và UPDATE vào một bảng khác, thì user cần phải có quyền read trên bảng thứ nhất và write trên bảng thứ hai. Trong khi đó nếu thủ tục không chứa sql động thì user chỉ cần duy nhất quyền execute thủ tục. Điều này gây khó khăn khi bạn muốn hướng tất cả các truy nhập vào database thông qua thủ tục và gỡ bỏ hết các quyền trên bảng. Với SQL Server 2005 trở lên, một cách khắc phục là bạn dùng mệnh đề WITH EXECUTE AS ‘username’ khi viết thủ tục (đưa vào ngay sau tên thủ tục), để giả danh một username có đủ quyền cần thiết khi thực thi thủ tục.

Nguồn bài viết:
https://tech.homestudy.edu.vn/thread/sql-server-đong/