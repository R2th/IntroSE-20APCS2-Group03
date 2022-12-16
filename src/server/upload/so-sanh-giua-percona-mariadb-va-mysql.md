# Giới thiệu

CSDL có mặt trong hầu hết các ứng dụng với rất nhiều sự lựa chọn. MySQL từ lâu đã là một lựa chọn nguồn mở phổ biến, tuy nhiên Percona và MariaDB là hai nhánh fork từ MySQL có thể thay thế bằng nhiều tính năng nâng cao. Bài viết này sẽ so sánh cả ba hệ quản trị CSDL để giúp bạn có sự lựa chọn phù hợp.

# MySQL

![](https://images.viblo.asia/a93e3d77-8c93-4c8e-a8ac-c44b1ce25917.png)

MySQL là một hệ thống quản lý cơ sở dữ liệu quan hệ (RDBMS) mã nguồn mở rất phổ biến, được biết đến rộng rãi. Nó được phát triển như một cơ sở dữ liệu đáng tin cậy, có tính sẵn sàng cao cho các ứng dụng dựa trên web trong những năm 1990. Mặc dù nguồn mở, nó thuộc sở hữu của Oracle, người cung cấp nó dưới dạng phiên bản cộng đồng miễn phí theo GPL ([GNU General Public License](http://www.gnu.org/licenses/gpl.html)) và là phiên bản được cấp phép thương mại. Phiên bản Oracle của MySQL là một bản cài đặt phổ biến trên nhiều máy chủ, một phần của  LAMP và WAMP và là cơ sở dữ liệu mặc định cho WordPress.

Sức mạnh của nó nằm ở tuổi thọ của nó. Code base ổn định và đáng tin cho các ứng dụng web. Có một cộng đồng lớn người dùng và quản trị viên MySQL, có một lượng lớn tài liệu cho MySQL, cả trên web và các bản in.

Điểm yếu của nó, so với hai cơ sở dữ liệu khác, nằm ở quản trị của nó. Nhiều người trong cộng đồng nguồn mở coi Oracle là một lực lượng ngăn chặn bản chất nguồn mở của dự án ban đầu. Ngoài ra, do mô hình cấp phép kép, một số ứng dụng yêu cầu giấy phép thương mại.

# MySQL so với MariaDB/Percona

Khi MySQL được Sun mua lại và sau đó là Oracle, các nhóm còn lại start các nhánh fork từ MySQL code. Điều đó đưa chúng ta đến với MariaDB và Percona. Cả hai đều được xây dựng để thay thế MySQL. Các ứng dụng hoạt động với MySQL cũng hoạt động tốt với một trong hai nhánh này. Mặc dù là đối thủ cạnh tranh, mỗi nhánh đều tham khảo từ mã nguồn mở của nhau. Ví dụ: MariaDB cung cấp XtraDB engine từ Percona. Percona đã chọn một số tối ưu hóa và cải tiến threed pool từ MariaDB. Cả hai đã được cải thiện dựa trên base MySQL, bao gồm sửa chữa các subqueries.

# MariaDB

![](https://images.viblo.asia/d84f2f51-e149-43a3-8ab3-8f406c42e332.png)

Bản fork MariaDB dựa vào việc mở rộng phạm vi các khả năng của MySQL và ít bảo thủ hơn về việc thêm các tính năng mới so với Percona. MariaDB đã thúc đẩy tiến bộ với query optimizer. Nó có thể là một lựa chọn tốt hơn nếu bạn không thể xác định loại query nào mà dự án của bạn cần thường xuyên. Một số tính năng khác phân biệt của MariaDB bao gồm:

- MariaDB bao gồm một mảng lớn hơn các công cụ lưu trữ so với MySQL base hoặc Percona, bao gồm cả tùy chọn NoQuery với Cassandra. Nó cũng bao gồm Percona’s XtraDB như một tùy chọn.
- Kể từ phiên bản 10.1, MariaDB cung cấp on-disk database encryption.
- MariaDB cung cấp các tính năng khả năng mở rộng bao gồm smulti-source replication, cho phép một máy chủ duy nhất sao chép từ nhiều nguồn.
- Sự tương thích của Global Transaction IDs giữa MariaDB và MySQL có thể yêu cầu triển khai một cách cẩn thận nếu bạn có dự định  sao chép phức tạp tới các nhánh của MySQL. Ví dụ: có thể sao chép từ MySQL 5.6 sang MariaDB 10.X, nhưng không thể ngược lại.

Nhìn chung MariaDB là một nhánh tương lai trưởng thành của MySQL nhằm mục đích cung cấp các tính năng và tiến bộ mới cho cơ sở dữ liệu. Nó phù hợp với các ứng dụng lưu trữ đám mây đa máy chủ lớn, đặc biệt là các ứng dụng thay đổi query patterns có thể tận dụng trình  MariaDB’s optimizer.

# Percona

![](https://images.viblo.asia/a7440529-5b39-4119-8613-e860dcc9e237.png)

Percona đã tập trung vào các ứng dụng rất khắt khe với giải pháp thay thế hiệu suất cao của riêng họ cho công cụ lưu trữ InnoDB có tên là XtraDB, bao gồm các công cụ thiết bị để điều chỉnh nó. Các tính năng của chúng có xu hướng cải thiện hiệu suất, tính khả dụng và khả năng mở rộng cho các cơ sở dữ liệu lớn nhất với thông lượng cao nhất. Trên trang web của họ, Percona tuyên bố sẽ gần gũi hơn với mã MySQL cơ bản từ quan điểm tương thích và bảo thủ hơn MariaDB. Các tính năng khác có lợi cho Percona bao gồm:

- Để thúc đẩy hiệu suất, Percona cung cấp nhiều bộ đếm và chẩn đoán hơn để đo hiệu suất và điều chỉnh cơ sở dữ liệu.
- Percona có các cải tiến về khả năng mở rộng cho các cơ sở dữ liệu lớn, bao gồm một số tính năng trong sản phẩm free Server của họ chỉ có sẵn ở cấp độ Enterprise của MySQL.
- Percona cũng có các công cụ bổ sung ngoài DB engine bao gồm XtraDB Cluster và tiện ích XtraBackup.

Giống như MariaDB, Percona là một nhánh mã nguồn mở trưởng thành của MySQL. Trọng tâm của họ là tập trung nhiều hơn vào hiệu suất của các cơ sở dữ liệu lớn nhất và đòi hỏi khắt khe nhất với các công cụ để đạt được và duy trì hiệu suất đó.

# Vậy thì cái nào tốt hơn?

Như hầu hết các so sánh về công nghệ, câu trả lời là phụ thuộc vào bài toán của bạn. Phần lớn các cuộc tranh luận dường như là một cuộc tranh luận hai giai đoạn chứ không phải là một cuộc chiến ba chiều. Giai đoạn đầu tiên là MySQL so với một trong những thay thế của nó. Bạn phải quyết định nếu bạn thậm chí cần một sự thay đổi. Các nhánh nâng cao MySQL base với các cải tiến hiệu suất và với các tính năng và công cụ bổ sung. Hiệu suất trở thành một thỏa thuận lớn hơn khi cơ sở dữ liệu của bạn càng lớn, do đó cơ sở dữ liệu nhỏ sẽ ít có khả năng nhìn thấy nhiều lợi ích đó trong các nhánh. Nhưng có thể có những lý do khác để hướng tới một sự thay thế, chẳng hạn như cấp phép hoặc linh hoạt dữ liệu. Nếu bạn quyết định thay đổi, thì cuộc thảo luận sẽ chuyển sang lựa chọn cái nào.

Sẽ quá dễ dàng để xem xét ngay cả so sánh ở trên và nói rằng MariaDB không quan tâm đến hiệu suất hoặc trình tối ưu hóa trong Percona là phụ. Điều đó hoàn toàn không đúng. Cả hai nhánh đều vượt trội ở cấp cơ sở dữ liệu cơ bản. Chúng phân biệt nhiều hơn khi bạn đạt đến ngưỡng.

Vậy thì điều gì quan trọng hơn? Nếu nó có khả năng lưu trữ các loại dữ liệu linh hoạt trên một số nguồn khác nhau, trước tiên hãy kiểm tra MariaDB. Nếu bạn có cơ sở dữ liệu lớn hơn mà vẫn yêu cầu hiệu năng linh hoạt, hãy bắt đầu tìm kiếm với Percona. Dù vậy, đừng bỏ qua các chi nhánh khác. Một số công cụ của họ, vì root MySQL chung, có thể hoạt động với một trong hai nhánh và có thể chỉ là giải pháp bạn cần.

Nếu bạn đã sử dụng qua MySQL và muốn tiếp cận với một trong những nhánh khác, nhưng bạn không có lợi thế về kích thước hoặc tính linh hoạt, thì quyết định dường như là một trong những sở thích. Công ty nào cung cấp cho bạn các dịch vụ hoặc công cụ mà bạn sẽ sử dụng?

Nếu bạn không chắc chắn, hoặc muốn tìm hiểu sâu hơn? Hãy tham khảo một thêm ở các nguồn sau đây:

- [Percona Feature Comparison](https://www.percona.com/doc/percona-server/5.6/feature_comparison.html)
- [MariaDB vs. MySQL Features](https://mariadb.com/kb/en/mariadb/mariadb-vs-mysql-features/)
- [Features of MariaDB 10](https://www.percona.com/live/mysql-conference-2013/sites/default/files/slides/mariadb10andwhatsnewwiththeproject-130426094744-phpapp01.pdf)