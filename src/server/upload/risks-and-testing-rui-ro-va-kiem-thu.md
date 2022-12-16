### 1. Định nghĩa về rủi ro
- Rủi ro liên quan đến khả năng của một sự kiện có thể xảy ra trong tương lai có hậu quả tiêu cực. Mức độ rủi ro được xác định bởi khả năng của sự kiện và ảnh hưởng (tác hại) từ sự kiện đó.
### 2. Phân loại rủi ro
- Rủi ro trong phát triển phần mềm có thể chia thành 2 loại: rủi ro về sản phẩm (product risk) và rủi ro trong dự án (project risk)
- **Rủi ro sản phẩm** liên quan đến khả năng một sản phẩm công việc (work product) (ví dụ như: tài liệu đặc tả, thành phần (unit), hệ thống (system) hoặc thử nghiệm (testing)) có thể không đáp ứng nhu cầu chính đáng của người dùng  hoặc các bên liên quan. Khi rủi ro sản phẩm liên quan đến đặc tính chất lượng cụ thể của sản phẩm (ví dụ: sự phù hợp về chức năng, độ tin cậy, hiệu quả hoạt động, khả năng sử dụng, bảo mật, tính tương thích, khả năng bảo trì và tính di động), rủi ro sản phẩm còn được gọi là rủi ro chất lượng (quality risk).  Ví dụ về rủi ro sản phẩm bao gồm:
    - Phần mềm không thực hiện được các chức năng dự định theo đặc tả kĩ thuật.
    - Phần mềm có thể không thực hiện các chức năng mong muốn theo nhu cầu của người dùng, khách hàng hoặc các bên liên quan.
    - Kiến trúc hệ thống không hỗ trợ đầy đủ một các số yêu cầu phi chức năng
    - Một tính toán cụ thể có thể được thực hiện không chính xác trong một số trường hợp. 
    - Cấu trúc điều khiển vòng lặp có thể được mã hóa không chính xác 
    - Thời gian đáp ứng có thể không đủ cho hệ thống xử lý giao dịch hiệu suất cao
    - Phản hồi về trải nghiệm người dùng (UX) có thể không đáp ứng mong đợi của sản phẩm
- **Rủi ro dự án** liên quan đến các tình huống, nếu chúng xảy ra, có thể có tác động tiêu cực đến khả năng đạt được các mục tiêu của dự án. Ví dụ về rủi ro dự án bao gồm: 
    - Project issues (các vấn đề của dự án):
        - Sự chậm trễ có thể xảy ra trong quá trình bàn giao sản phẩm, hoàn thành nhiệm vụ hoặc thỏa mãn tiêu chí dừng hoặc định nghĩa về việc thực hiện.
        - Ước tính không chính xác, việc tái phân bổ vốn cho các dự án ưu tiên cao hơn hoặc chi phí chung cho toàn tổ chức có thể dẫn đến việc tài trợ không đầy đủ.
        - Thay đổi muộn có thể dẫn đến việc làm lại đáng kể.
    - Organizational issues (các vấn đề về tổ chức):
        - Kỹ năng, đào tạo và nhân viên có thể không đủ 
        - Vấn đề nhân sự có thể gây ra xung đột 
        - Người dùng, nhân viên nghiệp vụ hoặc chuyên gia về chủ đề có thể không có sẵn do các ưu tiên nghiệp vụ mâu thuẫn.
    - Political issues (Các vấn đề chính sách):
        - Người kiểm thử có thể không truyền đạt đầy đủ kết quả kiểm tra cho developer hoặc người kiểm tra có thể không theo dõi thông tin được tìm kiếm trong quá trình kiểm thử và đánh giá
        - Có thể có thái độ không phù hợp đối với kì vọng của thử nghiệm (ví dụ: không đánh giá cao giá trị của việc tìm lỗi trong quá trình thử nghiệm).
    - Technical issues (Các vấn đề kĩ thuật):
        - Requirements  không được định nghĩa đầy đủ
        - Requirements có thể không được đáp ứng với các ràng buộc hiện có.
        - Thay đổi dữ liệu, kế hoạch thay đổi và công cụ hỗ trợ có thể bị chậm trễ 
        - Điểm yếu trong quá trình phát triển có thể ảnh hưởng đến tính nhất quán hoặc chất lượng của các sản phẩm công việc dự án như design, code, configuration, test data, và test cases  
        - Quản lý lỗi kém
    - Supplier issues (Các vấn đề về nhà cung cấp):
        - Bên thứ ba có thể không cung cấp sản phẩm hoặc dịch vụ cần thiết hoặc phá sản
        - Các vấn đề về hợp đồng.
       
**=>** Rủi ro dự án có thể ảnh hưởng đến cả hoạt động phát triển và hoạt động thử nghiệm. Trong một số trường hợp, người quản lý dự án chịu trách nhiệm xử lý tất cả các rủi ro dự án, nhưng không có gì bất thường khi người quản lý kiểm thử có trách nhiệm đối với các rủi ro dự án liên quan đến thử nghiệm.

### 3. Kiểm thử dựa trên rủi ro và chất lượng sản phẩm
- Rủi ro được sử dụng để tập trung nỗ lực cần thiết trong quá trình thử nghiệm. Nó được sử dụng để quyết định nơi và khi nào bắt đầu thử nghiệm và để xác định các khu vực cần chú ý hơn. Thử nghiệm được sử dụng để giảm xác suất xảy ra sự kiện bất lợi hoặc để giảm tác động của sự kiện bất lợi. Thử nghiệm được sử dụng như một hoạt động giảm thiểu rủi ro, để cung cấp phản hồi về các rủi ro đã xác định, cũng như cung cấp phản hồi về các rủi ro còn lại (chưa được giải quyết).
- Một cách tiếp cận dựa trên rủi ro để thử nghiệm cung cấp các cơ hội chủ động để giảm mức độ rủi ro sản phẩm. Nó liên quan đến phân tích rủi ro sản phẩm, bao gồm việc xác định rủi ro sản phẩm và đánh giá từng khả năng và tác động của rủi ro. Thông tin rủi ro sản phẩm kết quả được sử dụng để hướng dẫn lập kế hoạch kiểm tra, đặc điểm kỹ thuật, chuẩn bị và thực hiện các trường hợp kiểm thử, giám sát và kiểm soát kiểm tra. Phân tích rủi ro sản phẩm sớm góp phần vào sự thành công của một dự án.
- Theo cách tiếp cận dựa trên rủi ro, kết quả phân tích rủi ro sản phẩm được sử dụng để: 
    - Xác định các kỹ thuật kiểm tra sẽ được sử dụng
    - Xác định các cấp độ và loại thử nghiệm cụ thể sẽ được thực hiện (ví dụ: thử nghiệm bảo mật, thử nghiệm khả năng truy cập)
    - Xác định phạm vi thử nghiệm sẽ được thực hiện
    - Ưu tiên kiểm tra trong nỗ lực tìm ra các khiếm khuyết nghiêm trọng càng sớm càng tốt
    - Xác định xem có bất kỳ hoạt động nào ngoài thử nghiệm có thể được sử dụng để giảm rủi ro hay không (ví dụ: cung cấp đào tạo cho các nhà thiết kế thiếu kinh nghiệm)
- Thử nghiệm dựa trên rủi ro dựa trên kiến thức tập thể và hiểu biết của các bên liên quan của dự án để thực hiện phân tích rủi ro sản phẩm. Để đảm bảo rằng khả năng thất bại của sản phẩm được giảm thiểu, các hoạt động quản lý rủi ro cung cấp cách tiếp cận có kỉ luật đối với: 
    - Phân tích (và đánh giá lại một cách thường xuyên) những gì có thể sai (rủi ro)
    - Xác định rủi ro nào là quan trọng để giải quyết
    - Thực hiện các hành động để giảm thiểu những rủi ro đó
    - Lập kế hoạch dự phòng để đối phó với các rủi ro nếu chúng trở thành sự kiện thực tế. Ngoài ra, thử nghiệm có thể xác định rủi ro mới, giúp xác định rủi ro nào cần được giảm thiểu và giảm độ không chắc chắn về rủi ro.
    
### Kết luận: 
Việc xác định nơi nào trong phần mềm tiềm ẩn nhiều nguy cơ có thể xảy ra rủi ro là vô cùng quan trọng. Từ cách phân tích rủi ro chúng ta có thể dựa vào đó để improve các case kiểm thử tốt hơn. Từ đó, nâng cao chất lượng sản phẩm phần mềm.
###     Tài liệu tham khảo: 
CTFL-Syllabus-2018-GA
    https://www.istqb.org/