## 1. Quy trình phát triển phần mềm 
![](https://images.viblo.asia/d48c4930-3a81-420b-829f-fc0b82b204bd.png)

Quy trình phát triển hệ thống cung cấp một chuỗi các hoạt động cho các nhà phát triển để làm theo. Nó bao gồm các bước trong đó mỗi bước của quy trình phát triển phần mềm sẽ sử dụng các kết quả của bước trước.

Quy trình phát triển phần mềm tuân thủ theo các bước quan trọng cần thiết cho các nhà phát triển như phân tích yêu cầu và tài liệu đặc tả, phân tích và thiết kế hệ thống, thực hiện coding và unit test, kiểm thử và cuối cùng là cài đặt và bảo trì.

Có rất nhiều mô hình phát triển phần mềm như: V model, Waterfall, Iterative and Incremental (mô hình lặp và tăng dần), RAD model (mô hình phát triển ứng dụng nhanh), Spiral model (mô hình xoắn ốc), Scrum model … Các mô hình này tuy có các giai đoạn khác nhau nhưng các bước trong giai đoạn thì đều giống các bước cơ bản trong quy trình phát triển phần mềm.

                                                    
## 2. Quy trình kiểm thử
![](https://images.viblo.asia/dbafc63f-4290-4b77-95d0-706e2db07ef4.jpeg)

**Phân tích yêu cầu:** Kiểm thử thường sẽ bắt đầu lấy các yêu cầu trong các giai đoạn của vòng đời phát triển phần mềm. Trong giai đoạn thiết kế, các Tester làm việc với các nhà phát triển để xác định những khía cạnh của một thiết kế được kiểm chứng và những thông số được kiểm tra.

**Lập kế hoạch kiểm thử:**  Chiến lược kiểm thử, kế hoạch kiểm thử, kiểm thử sáng tạo… Và có một kế hoạch là cần thiết vì nhiều hoạt động sẽ được thực hiện trong thời gian kiểm thử.

**Thiết kế kiểm thử:**  Các quy trình kiểm thử, thiết kế các kịch bản, Test Case, các dữ liệu được sử dụng trong kiểm thử phần mềm.

**Chuẩn bị môi trường:** Chuẩn bị môi trường test, device test. Khi tham gia vào một dự án chúng ta cần biết mình cần phải test sản phẩm trên môi trường nào, điều này có thể confirm với phía khách hàng, PO của dự án


Ví dụ: Sản phẩm cần test trên hệ điều hành Window, trình duyệt Chrome, lastest version

**Thực thi:**   Sau khi có bản build chính thức dựa vào kịch bản kiểm thử, bộ testcases đã thiết kế chúng ta tiến hành kiểm thử. Dựa trên các kế hoạch, các văn bản kiểm thử và các báo cáo bất kỳ lỗi nào tìm thấy cho nhóm phát triển. 

**Kiểm thử báo cáo:**  Sau khi hoàn tất kiểm thử, các Tester tạo ra các số liệu và báo cáo cuối cùng về nỗ lực kiểm thử của họ và có sẵn sàng phát hành phần mềm hay không.
Phân tích kết quả kiểm thử hoặc phân tích thiếu sót được thực hiện bởi đội ngũ phát triển kết hợp với khách hàng để đưa ra quyết định xem những thiếu sót gì cần phải được chuyển giao, cố định và từ bỏ (tức là tìm ra được phần mềm hoạt động chính xác) hoặc giải quyết sau.

**Test lại khiếm khuyết:**  Khi một khiếm khuyết đã được xử lý bởi đội ngũ phát triển, nó phải được kiểm tra lại bởi nhóm kiểm thử.

**Kiểm thử hồi quy:** Người ta thường xây dựng một chương trình kiểm thử nhỏ là tập hợp của các bài kiểm tra cho mỗi tích hợp mới, sửa chữa hoặc cố định phần mềm, để đảm bảo rằng những cung cấp mới nhất đã không phá hủy bất cứ điều gì và toàn bộ phần mềm vẫn còn hoạt động một cách chính xác.


## 3. Kiểm thử phần mềm là gì?
### 3.1 Định nghĩa

Kiểm thử phần mềm là quá trình thực thi 1 chương trình với mục đích tìm ra lỗi. Kiểm thử phần mềm đảm bảo sản phẩm phần mềm đáp ứng chính xác, đầy đủ và đúng theo yêu cầu của khách hàng, yêu cầu của sản phẩm đề đã đặt ra. Kiểm thử phần mềm cũng cung cấp mục tiêu, cái nhìn độc lập về phần mềm, điều này cho phép việc đánh giá và hiểu rõ các rủi ro khi thực thi phần mềm. Kiểm thử phần mềm tạo điều kiện cho bạn tận dụng tối đa tư duy đánh giá và sáng tạo để bạn có thể phát hiện ra những điểm mà người khác chưa nhìn thấy.

### 3.2 Tại sao phải kiểm thử phần mềm? Mục tiêu kiểm thử là gì?
- Lý do cần kiểm thử phần mềm:

  • Kiểm thử phần mềm là yếu tố quyết định của SQA và khâu điển hình của rà soát đặc tả thiết kế và lập mã.  

  • Muốn nhìn thấy phần mềm như là một phần tử của hệ thống hoạt động (xem sản phầm) 
  • Hạn chế chi phí phải trả cho các thất bại do lỗi gây ra sau này (hiệu quả) 
  
  • Có kế hoạch tốt nâng cao chất lượng cho suốt quá trình phát triển (giải pháp) 
  
- Tầm quan trọng của kiểm thử phần mềm: 
 
     • Chi phí của kiểm thử chiếm: 40% tổng công sức phát triển ≥ 30% tổng thời gian phát triển 
 
     • Với phần mềm ảnh hưởng tới sinh mạng chi phí có thể gấp từ 3 đến 5 lần tổng chi phí khác cộng lại.

- Mục tiêu trước mắt: Cố gắng tạo ra các ca kiểm thử để chỉ ra lỗi của phần mềm với chi phí(thời gian, chi phí) thấp nhất. Một ca kiểm thử thắng lợi là phải làm lộ ra khiếm khuyết, đồng thời mang lại các lợi ích phụ.
- Mục tiêu cuối cùng: có một chương trình tốt, chi phí ít

## 4. 7 Nguyên lý kiểm thử
![](https://images.viblo.asia/a65b1292-4dc3-4b10-bc67-d44ecff1da1a.jpg)

**1. Kiểm thử đưa ra lỗi**

Kiểm thử phần mềm chỉ có thể chứng minh được phần mềm có lỗi nhưng không thể chứng minh được phần mềm đó không còn lỗi. Kiểm thử phần mềm giúp giảm xác suất lỗi chưa tìm thấy trong phần mềm. Vì vậy cần có 1 bộ test case tốt cover hết các trường hợp có thể xảy ra để tìm ra càng nhiều lỗi càng tốt.

**2. Kiểm thử cạn kiệt là không thể**

Nguyên tắc này có nghĩa là kiểm thử toàn bộ mọi thứ bao gồm cả điều kiện đầu vào và tiền điều kiện là không khả thi cho các trường hợp có rất nhiều giá trị đầu vào và hệ thống phức tạp. Thay vào đó ta nên vận dụng phân tích rủi ro, các kỹ thuật kiểm thử và độ ưu tiên để tập trung vào test các phần cần thiết có nguy cơ lỗi cao hơn.

**3. Kiểm thử càng sớm càng tốt**

Kiểm thử nên được bắt đầu càng sớm càng tốt trong vòng đời phát triển phần mềm. Lỗi càng được tìm ra sớm thì càng tiết kiệm được thời gian và chi phí fix lỗi

Chính vì thế quá trình phân tích requirement là vô cùng quan trọng và nên được phân tích kỹ càng để phát hiện lỗi sớm cũng như xây dựng phần mềm đúng theo yêu cầu khách hàng

**4. Sự tập chung của lỗi**

Lỗi thường tập trung ở các chức năng chính có liên quan nhiều đến các chức năng khác trong hệ thống. Thông thường thì ta sẽ tìm được 80% lỗi của hệ thống trong 20% chức năng chính của hệ thống. Vì vậy cần phải test kỹ các chức năng quan trọng để tìm ra bug và test các chức năng gần nó, có liên quan đến nó để ra nhiều bug hơn. Trong quá trình test chúng ta nên để ý đến các module thường sảy ra lỗi và tập chung test lại module đó trong lần 2, lần 3...

**5. Nghịch lý thuốc trừ sâu**

Nếu cùng một bộ test case đó ta test đi test lại nhiều lần sẽ bị nhờn và sẽ không tìm ra được bug mới. Hiệu quả của các lần kiểm thử sẽ giảm sau một số lần thực hiện vì vậy chúng ta nên suy nghĩ ra nhiều quan điểm test khác nhau và luôn update trong lần những lần test sau.

**6. Kiểm thử phụ thuộc vào ngữ cảnh**

Kiểm thử là khác nhau trong các ngữ cảnh khác nhau. Nếu bạn suy nghĩ test web và test mobile sẽ dùng các quan điểm test giống nhau thì điều đó là sai.Cũng như việc chúng ta est ok trên môi trường nhà phát triển nhưng khi chuyển sang môi trường production- môi trường của khách hàng chúng ta vẫn cần test lại.

**7. Không có lỗi sai lầm**

Việc không tìm thấy lỗi trên sản phẩm không đồng nghĩa với việc sản phẩm đã sẵn sàng tung ra thị trường mà bộ test case đó có thể tạo ra chỉ nhằm mục đích kiểm tra xem hệ thống đang hoạt động có đúng với yêu cầu hay không chứ không nhằm mục đích tìm ra lỗi mới. Theo nguyên tắc 1 và nguyên tắc 2 thì ta không thể test cạn kiệt tất cả các trường hợp và cũng không thể chứng minh rằng hệ thống không có lỗi nên hệ thống luôn luôn có lỗi tìm ẩn bên trong. Lỗi có thể xuất hiện sau 1 năm, 2 năm, thậm chí 10 năm sau khi đưa vào hoạt động là điều rất bình thường đó là lý do phần mềm luôn luôn cần bảo trì