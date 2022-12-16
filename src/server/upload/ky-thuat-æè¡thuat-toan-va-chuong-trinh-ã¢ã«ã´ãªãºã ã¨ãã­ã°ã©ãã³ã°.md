Với sự đầu tư mạnh mẽ từ Nhật Bản, đặc biệt là trong lĩnh vực Công nghệ thông tin (CNTT), nhu cầu về nhân lực biết tiếng Nhật ngày càng tăng cao.

Tuy nhiên lượng nhân lực vừa có khả năng sử dụng tiếng Nhật, vừa có kiến thức chuyên môn hiện tại cực kỳ khan hiếm. Do đó, nhiều công ty giải quyết việc thiếu nhân lực bằng cách sử dụng các bạn có chuyên môn CNTT nhưng không biết tiếng Nhật, và sử dụng các bạn biết tiếng Nhật để biên phiên dịch (gọi là comtor).

Tuy nhiên việc này làm phát sinh rất nhiều vấn đề. Đối với các bạn lập trình viên thì luôn phải thông qua comtor để trao đổi với khách hàng, tốn rất nhiều thời gian và khả năng các thông tin được truyền đạt không chuẩn xác là không hề nhỏ. Còn đối với các bạn comtor, rất nhiều bạn comtor xuất thân từ các trường ngoại ngữ, nên các kiến thức chuyên ngành chưa đầy đủ, dẫn đến không hiểu hết và truyền đạt thông tin chưa đầy đủ cho các bạn lập trình viên.

Do đó, các bạn lập trình viên nên biết các khái niệm mình đang làm trong tiếng Nhật là gì, còn các bạn comtor cần phải biết các kiến thức CNTT cơ bản. Trong loạt bài viết này, mình sẽ tổng hợp các kiến thức kỹ thuật và tiếng Nhật cần thiết cho các bạn làm trong lĩnh vực CNTT. Hệ thống kiến thức được sắp xếp dựa trên nội dung của kỳ thi IT passport của Nhật Bản.

Mọi người có thể xem đầy đủ các nội dung tại đây

https://www.janen.net/


# 1. Thuật toán (アルゴリズム)
## 1.1. Cấu trúc dữ liệu (データ構造)
Dữ liệu (データ): thông tin được xử lý trong máy tính

Cấu trúc dữ liệu (データ構造): cơ chế sử dụng dữ liệu một cách có hệ thống

Biến số (変数): khu vực lưu tạm thời dữ liệu trong chương trình

Loại dữ liệu (データ型): loại dữ liệu được lưu trữ

Mảng (配列): lưu các dữ liệu cùng loại

List (リスト): cấu trúc dạng chuỗi liên kết nhiều dữ liệu phân tán

**Stack và Queue:**

* Stack (スタック) : phương pháp nhập/xoá dữ liệu theo dạng LIFO (Last in First out), tức là vào sau ra trước
* Queue (キュー): phương pháp nhập/xoá dữ liệu theo dạng FILO (first in last out) tức vào trước ra trước

## 1.2. Thuật toán (アルゴリズム)
Thuật toán (アルゴリズム) : các bước xử lý giải quyết vấn đề

**Biểu đồ chu trình (flowchart) (流れ図・フローチャット)**

Là biểu đồ biểu thị các bước trong chương trình hoặc chu trình làm việc bằng kí hiệu và mũi tên

**Cấu trúc cơ sở của thuật toán máy tính (アルゴリズムの基礎構造)**

* Cấu trúc tuần tự (順次構造): cấu trúc thể hiện chu trình xử lý theo tuần tự
* Cấu trúc chọn lọc (選択構造): cấu trúc thể hiện chu trình xử lý chọn lọc tuỳ thuộc vào điều điện
* Cấu trúc lặp (繰り返し構造): cấu trúc thể hiện chu trình xử lý lặp đi lặp lại trong một điều kiện hoặc cho đến khi một điều kiện nào đó thoả mãn


**Thuật toán tiêu biểu (代表的なアルゴリズム)**

* Tổng (合計): phép cộng
* Tìm kiếm (探索) : tìm dữ liệu khớp với điều kiện yêu cầu
* Kết hợp (併合 – マージ): tổng hợp 2 file mà vẫn giữ nguyên cách sắp xếp
* Sắp xếp (整列): sắp xếp dữ liệu theo trình tự

# 2. Chương trình và ngôn ngữ lập trình (プログラミング・プログラム言語)
Chương trình (プログラム) : tài liệu chỉ thị cho máy tính thực hiện các thuật toán

Ngôn ngữ lập trình (プログラミング言語): ngữ pháp và quy luật nhằm mô tả chương trình

**Các loại ngôn ngữ lập trình (プログラム言語の種類)**
* Ngôn ngữ cấp thấp (低水準言語): ngôn ngữ máy tính (機械語 – マシン語), ngôn ngữ Assembly (アセンブラ言語)
* Ngôn ngữ cấp cao (高水準言語): C, Java, Cobol, …

**Bộ xử lý ngôn ngữ (言語プロセッサ)**
Máy tính không thể thực hiện được chương trình được tạo ra viết bằng ngôn ngữ cấp cao. Do đó, để chuyển đổi thành ngôn ngữ mà máy tính có thể hiểu thì người ta sử dụng một phần mềm chuyển ngữ gọi là bộ xử lý ngôn ngữ.
* Compiler (コンパイラ) : dịch tất cả chương trình thành ngôn ngữ máy tính 1 lần
* Interpreter (インタプリタ) : dịch và thực hiện từng câu lệnh trong code của chương trình

**Markup language (マークアップ言語)**

Loại ngôn ngữ dùng tag đánh dấu để thể hiện kết cấu văn bản. Tiêu biểu có HTML (HyperText Markup Language) và XML (Extensible Markup Language).

Nguồn:

[Section 2-1: Thuật toán và chương trình (アルゴリズムとプログラミング)](https://www.janen.net/2022/09/18/section-6-thuat-toan-va-chuong-trinh-%e3%82%a2%e3%83%ab%e3%82%b4%e3%83%aa%e3%82%ba%e3%83%a0%e3%81%a8%e3%83%97%e3%83%ad%e3%82%b0%e3%83%a9%e3%83%9f%e3%83%b3%e3%82%b0/)