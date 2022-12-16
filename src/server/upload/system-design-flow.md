*Bản gốc: [システム設計の流れ](https://qiita.com/mikakane/items/b8045a11dba8d08e5fe4)*

# Flow chung

Flow đi từ Requirement definition→External Design→Internal Design→Development được coi là flow cơ bản trong thiết kế hệ thống.

Và ở đây, External design cũng có thể coi là Basic design, Internal design có thể được coi là Detail Design.


# Requirement definition

## Phát triển requirement

### Business flow

Thể hiện nghiệp vụ và flow chi tiết.

→Activity Diagram  Sơ đồ liên quan đến chức năng nghiệp vụ

### Business modal

Thể hiện nghiệp vụ tĩnh.

→ERD  Class diagram 


## Định nghĩa requirement

Phần này quyết định phạm vi của hệ thống, xác định rõ làm và không làm gì.

1.Yêu cầu chức năng

　Danh sách Use case, danh sách chức năng
 
2.Yêu cầu phi chức năng(FURPS+)

　Chức năng　Yêu cầu chức năng
 
　Usability　Phương châm UI, User training, manual
 
　Reliability　Quản lý, giám sát, bảo trì, phục hồi
 
　Performance　Hiệu suất, khả năng mở rộng
 
　Maintainability　Độ tin cậy, bảo mật
 
　Others　Cấu hình hardware, cấu hình network, cấu hình software

# External design

Ở external design (basic design) sẽ thực hiện thiết kế xem với hệ thống sẽ phát triển dựa trên định nghĩa requirement thì cần cung cấp những chức năng nào, hoặc cần có interface như thế nào.

Basic design mất nhiều hay ít effort hoàn toàn phụ vào độ chính xác của định nghĩa requirement, định nghĩa requirement càng rõ ràng, chính xác thì càng mất ít effort làm basic design, và ngược lại, định nghĩa requirement càng không rõ ràng, chung chung bao nhiêu thì càng tốn nhiều effort.

Nói tóm lại, có thể coi external design nhằm mục đích giảm các yêu cầu chức năng, yêu cầu phi chức năng và các ràng buộc có thể cung cấp ở phase định nghĩa requirement, cho đến khi có thể lập trình trên thực tế.

Nếu ở phase định nghĩa requirement vẫn còn có những điểm chưa rõ ràng, hoặc bị thiếu, thì nhất thiết cần phải được trao đổi ở đây.

Có thể chia external design thành 3 phần lớn như sau:

## Scheme design (Architecture design)

Quyết định cấu trúc hardware, software cũng như phương châm coding.

　→Platform design (Xác định Infra, middle ware, platform, framework...)
 
　→Application/Architecture design (Xác định cấu trúc tổng thể của application)
 
　→Xác định tiêu chuẩn phát triển và phương pháp test
 
##  Funtional design (Application design)

Phân chia tổng thể hệ thống thành đơn vị module, xác định specs cho từng module.

　→Business Logic Design
 
　→Database design
 
　→Screen and form design
 
　→Batch design

## Other design

　→Performance / Reliability design
 
　→Security design
 
　→Migration design (system/business)
 
　→Operation design (system/business)
 
#  Internal design

1.Phân chia chức năng

2.Design data vật lý

3.Design chi tiết input-output


# URL tham khảo

Flow tổng thể
http://salut.g.hatena.ne.jp/bbs/1/2

Phương châm basic design
http://itpro.nikkeibp.co.jp/article/lecture/20070702/276409/?ST=selfup