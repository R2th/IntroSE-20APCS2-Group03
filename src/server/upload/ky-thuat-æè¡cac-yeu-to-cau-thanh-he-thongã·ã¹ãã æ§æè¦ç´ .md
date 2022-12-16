Với sự đầu tư mạnh mẽ từ Nhật Bản, đặc biệt là trong lĩnh vực Công nghệ thông tin (CNTT), nhu cầu về nhân lực biết tiếng Nhật ngày càng tăng cao.

Tuy nhiên lượng nhân lực vừa có khả năng sử dụng tiếng Nhật, vừa có kiến thức chuyên môn hiện tại cực kỳ khan hiếm. Do đó, nhiều công ty giải quyết việc thiếu nhân lực bằng cách sử dụng các bạn có chuyên môn CNTT nhưng không biết tiếng Nhật, và sử dụng các bạn biết tiếng Nhật để biên phiên dịch (gọi là comtor).

Tuy nhiên việc này làm phát sinh rất nhiều vấn đề. Đối với các bạn lập trình viên thì luôn phải thông qua comtor để trao đổi với khách hàng, tốn rất nhiều thời gian và khả năng các thông tin được truyền đạt không chuẩn xác là không hề nhỏ. Còn đối với các bạn comtor, rất nhiều bạn comtor xuất thân từ các trường ngoại ngữ, nên các kiến thức chuyên ngành chưa đầy đủ, dẫn đến không hiểu hết và truyền đạt thông tin chưa đầy đủ cho các bạn lập trình viên.

Do đó, các bạn lập trình viên nên biết các khái niệm mình đang làm trong tiếng Nhật là gì, còn các bạn comtor cần phải biết các kiến thức CNTT cơ bản. Trong loạt bài viết này, mình sẽ tổng hợp các kiến thức kỹ thuật và tiếng Nhật cần thiết cho các bạn làm trong lĩnh vực CNTT. Hệ thống kiến thức được sắp xếp dựa trên nội dung của kỳ thi IT passport của Nhật Bản.

Mọi người có thể xem đầy đủ các nội dung tại đây

https://www.janen.net/


**PHẦN 1: Hệ thống máy tính (コンピュータシステム)**

**Chương 2: Các yếu tố cầu thành hệ thống  (システム構成要素)**

# 1. Cấu trúc hệ thống (システムの構成)
Hệ thống thông tin (情報システム):: là hệ thống sử dụng máy tính để xử lý công việc
## 1.1 Hình thức xử lí hệ thống thông tin (情報システムの処理形態)
Xử lý tập trung (集中処理): xử lí toàn bộ chỉ bằng 1 một máy tính

Xử lý phân tán (分散処理): chia nhỏ và xử lí bằng cách sử dụng nhiều máy tính trong cùng mạng lưới
## 1.2 Cấu trúc hệ thống thông tin (情報システムの構成)
Hệ thống kép (デュアルシステム): tiến hành xử lí cùng một chương trình trên hai hệ thống có cùng cấu trúc, vừa xử lý vừa so sánh kết quả xem có sai sót không.

Hệ thống đôi (デュプレックスシステム): sử dụng hai hệ thống trong đó có một hệ thống chính và một hệ thống máy phụ (máy chờ)

Thin Client (シンクライアント): hệ thống mà các tài nguyên như phần mềm hay file được quản lý trên server, phía client chỉ có những chức năng tối thiểu.

Cluster (クラスタ): những máy tính riêng lẻ được kết nối với nhau và hoạt động giống như một hệ thống
## 1.3 Hình thức sử dụng của hệ thống thông tin (情報システムの利用形態)
Xử lý với thời gian thực(リアルタイム処理): hình thức xử lí tức thời tại thời điểm phát sinh yêu cầu xử lí

Xử lí đồng loạt(バッチ処理): hình thức xử lí đồng loạt sau khi tích luỹ dữ liệu trong một khoảng thời gian cố định

Xử lý tương tác(対話型処理): một hình thức trong đó người dùng và máy tính tương tác với nhau thông qua màn hình máy tính
## 1.4 Hệ thống client-server (クライアントサーバシステム)
Là hệ thống cấu thành bởi phần: server cung cấp dịch vụ cho các máy tính trong mạng lưới và client là nơi yêu cầu dịch vụ đối với server

# 2. Chỉ tiêu đánh giá hệ thống (システムの評価指標)
## 2.1 Tính chất của hệ thống (システムの性質)
Thời gian phản hồi (レスポンスタイム): thời gian phản hồi được tính từ lúc yêu cầu xử lí đến lúc nhận được phản hồi đầu tiên

Thời gian quay vòng:(ターンアラウンドタイム thời gian xử lí được tính từ lúc yêu cầu một loạt công việc đến khi nhận được toàn bộ kết quả
## 2.2 Sự tin cậy của hệ thống (システムの信頼性)
- Hiệu suất hoạt động (稼働率): thể hiện tỉ lệ thời gian hoạt động bình thường của hệ thống
    + Thời gian trung bình giữa 2 lần xảy ra sự cố (平均故障間隔 MTBF): Thời gian trung bình hệ thống hoạt động giữa 2 lần xảy ra sự cố
    + Thời gian khôi phục trung bình(平均修復時間 - MTTR): Thời gian trung bình cần để sửa chữa hệ thống trong trường hợp bị lỗi
- RAID (レイド): Công nghệ xử lý trong đó nhiều đĩa cứng sẽ được gộp lại coi như một thiết bị lưu trữ để lưu trữ dữ liệu một cách phân tán
## 2.3 Tính kinh tế của hệ thống (システムの経済性)
TCO (total cost of ownership) : tất cả các chi phí bao gồm chi phí mua phần cứng - phần mềm, chi phí đào tạo người dùng, chi phí duy trì hoạt động, chi phí bảo dưỡng, chi phí thiệt hại gây nên bởi trục trặc hệ thống, ...

*Nguồn: *

[Section 2-3: Các yếu tố cầu thành hệ thống (システム構成要素)](https://www.janen.net/2022/09/18/section-8-cac-yeu-to-cau-thanh-he-thong-%e3%82%b7%e3%82%b9%e3%83%86%e3%83%a0%e6%a7%8b%e6%88%90%e8%a6%81%e7%b4%a0/)