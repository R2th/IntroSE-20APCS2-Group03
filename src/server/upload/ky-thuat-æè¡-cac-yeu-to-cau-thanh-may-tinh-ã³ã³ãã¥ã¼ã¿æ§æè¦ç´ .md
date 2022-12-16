Với sự đầu tư mạnh mẽ từ Nhật Bản, đặc biệt là trong lĩnh vực Công nghệ thông tin (CNTT), nhu cầu về nhân lực biết tiếng Nhật ngày càng tăng cao.

Tuy nhiên lượng nhân lực vừa có khả năng sử dụng tiếng Nhật, vừa có kiến thức chuyên môn hiện tại cực kỳ khan hiếm. Do đó, nhiều công ty giải quyết việc thiếu nhân lực bằng cách sử dụng các bạn có chuyên môn CNTT nhưng không biết tiếng Nhật, và sử dụng các bạn biết tiếng Nhật để biên phiên dịch (gọi là comtor).

Tuy nhiên việc này làm phát sinh rất nhiều vấn đề. Đối với các bạn lập trình viên thì luôn phải thông qua comtor để trao đổi với khách hàng, tốn rất nhiều thời gian và khả năng các thông tin được truyền đạt không chuẩn xác là không hề nhỏ. Còn đối với các bạn comtor, rất nhiều bạn comtor xuất thân từ các trường ngoại ngữ, nên các kiến thức chuyên ngành chưa đầy đủ, dẫn đến không hiểu hết và truyền đạt thông tin chưa đầy đủ cho các bạn lập trình viên.

Do đó, các bạn lập trình viên nên biết các khái niệm mình đang làm trong tiếng Nhật là gì, còn các bạn comtor cần phải biết các kiến thức CNTT cơ bản. Trong loạt bài viết này, mình sẽ tổng hợp các kiến thức kỹ thuật và tiếng Nhật cần thiết cho các bạn làm trong lĩnh vực CNTT. Hệ thống kiến thức được sắp xếp dựa trên nội dung của kỳ thi IT passport của Nhật Bản.

Mọi người có thể xem đầy đủ các nội dung tại đây

https://www.janen.net/


**PHẦN 1: Hệ thống máy tính (コンピュータシステム)**

**Chương 1: Các yếu tố cấu thành máy tính コンピュータ構成要素**


# 1. Processor (プロセッサ)
Processor là bộ xử lý trung tâm máy tính, một thiết bị được coi là đầu não của máy tính. Các tên gọi khác như CPU (Central Processing Unit), hay trong tiếng Nhật là còn được gọi là 「中央演算処理装置」.
## 1.1 Cấu trúc máy tính (コンピュータの構成)
Bộ phận tính toán(演算装置): thực hiện tính toán theo mệnh lệnh trong chương trình

Bộ phận điều khiển(制御装置): đọc phần mềm, sau đó đưa ra mệnh lệnh cho các thiết bị khác

Thiết bị lưu trữ(記憶装置): lưu trữ chương trình và dữ liệu

Thiết bị nhập(入力装置): thiết bị nhập dữ liệu vào bộ nhớ

Thiết bị xuất(出力装置): trích xuất dữ liệu từ bộ nhớ
## 1.2 Tổ chức cơ bản của CPU (CPUの基本的なしくみ)
CPU: đưa ra mệnh lệnh cho các thiết bị khác (chức năng điều khiển), và thực hiện các thuật toán theo mệnh lệnh của chương trình (chưc năng tính toán)

Tần số xung nhịp hay tốc đọ xung nhịp (クロック周波数): Xung Clock hay còn gọi là xung nhịp chủ của máy tính, dùng để đồng bộ thời điểm của các xử lý trong máy tính. Tần số xung nhịp được biểu thị bằng số tín hiệu trong đơn vị 1s

Chiều rộng đường dẫn (パス数 - path width): Đường dẫn (パス - path) là đường đi của dữ liệu giữa các thiết bị với nhau. Chiều rộng đường dẫn (パス数 - path width) là số lượng tín hiệu nằm trong đường dẫn.

# 2. Thiết bị lưu trữ (記憶装置)
Thiết bị lưu trữ (記憶装置) dùng để lưu trữ dữ liệu cần thiết để máy tính xử lý.
## 2.1 Bộ nhớ (メモリ)
Bộ nhớ (メモリ): thiết bị lưu trữ dữ liệu và chương trình cần thiết cho các xử lí. Bộ nhớ gồm 2 loại là RAM và ROM

+ RAM: khi ngắt nguồn điện, các nội dung đang lưu trữ bị xoá đi
+ ROM: ngay cả khi ngắt nguồn điẹn, các nội dung đang lưu vẫn được lưu lại

Công dụng của bộ nhớ:

+ Bộ nhớ chính (メインメモリ)

+ Bộ nhớ tạm thời (キャッシュメモリ)

+ Bộ nhớ đồ hoạ VRAM (グラフィックスメモリ)
## 2.2 Thiết bị lưu trữ phụ trợ (記憶媒体)
Là thiết bị lưu trữ các dữ liệu hay file đã tạo. Trong tiếng Nhật còn được gọi là 「補助記憶装置」.

Đĩa từ (磁気ディスク): thực hiện đọc và ghi dữ liệu bằng cách sử dụng từ tính

Đĩa quang (光ディスク): thực hiện đọc và ghi dữ liệu bằng cách sử dụng tia laze

Bộ nhớ flash (フラッシュメモリ): bộ nhớ có khả năng viết lại

# 3. Thiết bị nhập/xuất (入出力デバイス)
## 3.1 Giao diện nhập/xuất (入出力インタフェース)
Giao diện nhập/xuất (入出力インタフェース) chỉ thiết bị hay phương thức trung gian trao đổi dữ liệu giữa máy tính và các thiết bị ngoại vi

Giao diện nối tiếp (シリアルインタフェース): giao diện theo phương thức chuyển tiếp từng bit một của dữ liệu

Giao diện song song (パラレルインタフェース): giao điện theo phương thức chuyển tiếp nhiều bit data một lần

Giao diện vô tuyến(ワヤレスインタフェース): giao điện chuyển tiếp dữ liệu bằng các sử dụng kĩ thuật truyền không dây và hồng ngoại
## 3.2 Trình điều khiển thiết bị (デバイスドライバ)
Là phần mềm giúp sử dụng được các thiết bị ngoại vi

*Nguồn: *
[Section 2-2: Các yếu tố cấu thành máy tính (コンピュータ構成要素)](https://www.janen.net/2022/09/18/section-7-cac-yeu-to-cau-thanh-may-tinh-%e3%82%b3%e3%83%b3%e3%83%94%e3%83%a5%e3%83%bc%e3%82%bf%e6%a7%8b%e6%88%90%e8%a6%81%e7%b4%a0/)