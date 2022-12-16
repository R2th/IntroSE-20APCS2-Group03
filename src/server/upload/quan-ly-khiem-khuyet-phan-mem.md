*Mục tiêu chính của nhà phát triển là viết mã hóa để tạo phần mềm, trong khi mục tiêu chính của người kiểm thử phần mềm là tìm khuyết tật hoặc lỗi trong phần mềm đã  được phát triển.*

*Để trả lời câu hỏi "Phần mềm có khiếm khuyết hay lỗi gì hay không"? Chắc chắn là không bao giờ có thể chứng minh được phần mềm không có lỗi, chỉ là chưa tìm ra mà thôi.*

Vậy có nghĩa là: phầm mềm sẽ có lỗi, vậy thì làm sao để quản lý được Khiếm khuyết hay lỗi của phần mềm. Mình chia sẻ lại phần mình tìm hiểu được dưới đây nhé

### A. GIỚI THIỆU VỀ KHIẾM KHUYẾT
#### 1. Khiếm khuyết là gì

Khiếm khuyết (Defect)  hay Lỗi (Bug) của phần mềm: Chức năng phần mềm không phù hợp với tài liệu đặc tả yêu cầu được gọi là Defect hay Bug phần mềm.

![](https://images.viblo.asia/7339dba4-a9e1-421c-93dc-8c1ba49eae29.jpg)

#### 2. Loại khiếm khuyết 

Loại khiếm khuyết : Khiếm khuyết được phân loại dựa trên nguyên nhân gốc rễ về cách chúng xảy ra. 

Các loại khiếm khuyết:

***a. Lỗi mã hóa:***

- Các yêu cầu đã được mã hóa không chính xác do hành vi của chức năng phần mềm được triển khai không phù hợp với các tài liệu đặc tả yêu cầu.
- Nguyên nhân xảy ra các lỗi thường do các nhà phát triển tạo ra:
     + Mã hóa lỗi các yêu cầu được liệt kê trong tài liệu đặc tả 
     + Mã hóa các yêu cầu không được chỉ định trong tài liệu đặc tả
- Những loại lỗi này thường được gây ra bởi sự sai sót, lơ là trong giám sát của nhà phát triển.

Ví dụ:

Theo yêu cầu tài liệu đặc điểm kỹ thuật: Nếu người dùng nhấp vào liên kết “Home” trong trang web thì trang “Home” sẽ được hiển thị cho người dùng.

Người kiểm thử quan sát trong khi kiểm tra liên kết "Home”,  thấy rằng trang “About Me” được hiển thị mỗi khi liên kết “Home” được nhấp vào. Đây chính là một sai lệch của lỗi mã hóa.

***b. Thiếu yêu cầu:*** 

- Một yêu cầu hợp lệ bắt buộc và cần được mã hóa (hoặc cần hiện thực) đã bị bỏ qua (không mô tả trong tài liệu yêu cầu).
- Nguyên nhân sâu xa của lỗi này là do không nắm bắt được yêu cầu này trong tài liệu đặc tả.
- Các loại này được phân loại là Thiếu yêu cầu, vì các yêu cầu đã bị bỏ sót. Những loại khiếm khuyết này thường được gây ra bởi sự sai sót của nhà phân tích kinh doanh.

Ví dụ:

Theo hướng dẫn của tổ chức / quản trị trang web, bắt buộc phải hiển thị liên kết “Từ chối” trên trang web. Khi người kiểm thử quan sát trong khi kiểm tra trang web, thấy rằng liên kết “Từ chối” bị thiếu trong trang web. Lúc này người kiểm thử bày tỏ mối quan tâm của mình rằng liên kết “Từ chối” bị thiếu và mong muốn nhà phân tích kinh doanh sửa lại tài liệu đặc tả yêu cầu.

***c. Yêu cầu mới***

- Một yêu cầu không nằm trong phạm vi dự án để mã hóa (hoặc thực hiện) nhưng sau đó, nó được xác định là bắt buộc phải mã hóa (hoặc thực hiện) để giải quyết các lỗi tiềm ẩn trong sản phẩm (hoặc sau khi thực hiện).
- Những loại khiếm khuyết này thường được gây ra bởi yếu kém trong  phân tích yêu về phạm vi trong việc đánh giá các thất bại tiềm năng.

Ví dụ:

Theo yêu cầu tài liệu đặc tả: Hệ thống A truyền dữ liệu đến hệ thống B để xử lý dữ liệu trong hệ thống B.

Hệ thống A: Truyền hồ sơ học sinh (hồ sơ chứa dấu của từng học sinh) đến hệ thống B
Hệ thống B: Chịu trách nhiệm

   + Lọc hồ sơ sinh viên đã đạt hơn 80% điểm trong kỳ thi
   + Xử lý hồ sơ trên để chuyển thông tin này đến bộ phận học bổng

Người kiểm thử quan sát trong khi tiến hành kiểm tra tích hợp hệ thống, thấy rằng:

Dữ liệu không được tải trong hệ thống B và khi điều tra thêm, thấy được nguyên nhân gốc là do hạn chế bộ nhớ, tức là hệ thống B không tải được dữ liệu mỗi khi hệ thống A truyền hơn 100000 hồ sơ sinh viên .

Để giải quyết khuyết điểm này, các bên liên quan của dự án đã quyết định tạo thêm yêu cầu (hoặc mới). Vì vậy, các yêu cầu bổ sung (hoặc mới) được tạo như dưới đây trong tài liệu đặc tả:

Hệ thống A: Truyền hồ sơ sinh viên (hồ sơ chứa dấu của từng học sinh) đến hệ thống C

Hệ thống C: Hệ thống này được tối ưu hóa để xử lý (hoặc xử lý) khối lượng dữ liệu lớn, trong trường hợp này, bộ lọc sinh viên đã đạt được hơn 80% điểm trong kỳ thi và gửi đến hệ thống B để xử lý thêm.

Hệ thống B: Xử lý hồ sơ sinh viên để chuyển thông tin này đến bộ phận học bổng

### B. ĐỘ ƯU TIÊN CỦA KHIẾM KHUYẾT

Độ ưu tiên của khiếm khuyết phần mềm có thể được phân thành 4 nêu dưới đây:

#### 1. Độ ưu tiên 1 - Giải quyết ngay lập tức

- Với trường hợp không thể sử dụng để sử dụng hệ thống hay ứng dụng trừ khi nhà phát triển sửa lỗi mới có thể sử dụng.

- Trong trường hợp này, người kiểm thử phần mềm nên coi đây là ưu tiên hàng đầu hoặc lỗi có độ ưu tiên 1 để giải quyết ngay lập tức.

Ví dụ:

Người dùng không thể khởi chạy trang "Chuyển Tiền” trong ứng dụng Ngân hàng. Khi người dùng nhấp vào nút “Chuyển Tiền” từ trang chủ của ứng dụng thì lại xuất hiện thông báo "Có sự cố kỹ thuật, hoặc Không tìm thấy trang”.
Trong ví dụ này, người kiểm thử phần mềm nên báo cáo lỗi là Mức độ ưu tiên 1  vì hệ thống / ứng dụng đang thử nghiệm không hoạt động. 



#### 2. Độ ưu tiên 2 - Cao

- Trường hợp chức năng không thể sử dụng được và không có cách giải quyết nào để sử dụng chức năng ứng dụng trừ khi nhà phát triển sửa lỗi để có thể sử dụng.

- Trong ví dụ này, người kiểm thử phần mềm nên báo cáo lỗi là Severity 2 vì chức năng chính của hệ thống / ứng dụng được kiểm tra không hoạt động. 

Ví dụ: 

Người dùng có thể khởi chạy trang “Chuyển Tiền” trong ứng dụng Ngân hàng thành công nhưng nút “Hoàn tất chuyển khoản” không thể nhấp để bắt đầu chuyển tiền.
Với những trường hợp này này, người kiểm thử phần mềm nên coi đây là Mức ưu tiên 2 hoặc Cao để giải quyết lỗi sớm nhất.

#### 3. Độ ưu tiên 3 - Trung bình

- Trường hợp chức năng chính của hệ thống / ứng dụng được kiểm tra không hoạt động nhưng có một cách giải quyết tạm thời để sử dụng hệ thống.

- Trong trường hợp này, người kiểm thử phần mềm nên coi đây là Mức ưu tiên 3 hoặc Trung bình vì lỗi này có thể được doanh nghiệp xem là chấp nhận được để tiến hành xuất bản và giải quyết như một lỗi sản phẩm

Ví dụ: 

Người dùng có thể khởi chạy trang “Chuyển Tiền” trong ứng dụng Ngân hàng thành công và nút “Hoàn thành Chuyển tiền” có thể nhấp để bắt đầu chuyển tiền. Nhưng ứng dụng chỉ cho phép chuyển số tiền lên tới 1000 đô la và không quá 1000 đô la. Người sử dụng phải thực hiện  chuyển tiền 2 lần để chuyển $ 2000 với mỗi lần chuyển $ 1000.

Trong ví dụ này, người kiểm thử phần mềm phải báo cáo lỗi là Severity 3 hoặc Trung bình để 



#### 4. Độ ưu tiên 4 - Thấp:

- Trường hợp lỗi ở những phần không quan trọng, ví dụ như: sai chính tả, định dạng văn bản, lệch vị trí.....

- Trong trường hợp này, người kiểm thử phần mềm nên coi đây là  Mức ưu tiên 4 hoặc Thấp vì lỗi này có thể được doanh nghiệp coi là chấp nhận được để tiến hành xuất bản và giải quyết trong các phiên bản sau


### C. MỨC ĐỘ NGHIÊM TRỌNG CỦA KHIẾM KHUYẾT 

Mức độ nghiêm trọng của khiếm khuyết có thể được phân thành bốn loại dưới đây:

#### 1. Mức độ nghiêm trọng 1 (còn được gọi là Showstopper)
 
- Bất cứ khi nào hệ thống hoặc ứng dụng được kiểm tra không hoạt động, lúc này người kiểm thử phần mềm phải báo cáo lỗi là Mức độ nghiêm trọng 1 / Showstopper.

- Nói cách khác, không thể sử dụng để sử dụng hệ thống / ứng dụng trừ khi nhà phát triển sửa lỗi để có thể sử dụng thêm.

Ví dụ: Người dùng không thể khởi chạy trang “Chuyển Tiền” trong ứng dụng Ngân hàng. Khi người dùng nhấp vào nút “Chuyển Tiền” từ trang chủ của ứng dụng thì lại xuất hiện thông báo ‘Có sự cố kỹ thuật, hoặc‘ Không tìm thấy trang” được hiển thị cho người dùng.


#### 2. Mức độ nghiêm trọng 2 (cũng quan trọng)

- Bất cứ khi nào chức năng chính của hệ thống / ứng dụng được kiểm tra không hoạt động, người kiểm thử phần mềm phải báo cáo lỗi là Mức độ nghiêm trọng 2 / Quan trọng. 

- Nói cách khác, chức năng của ứng dụng không thể sử dụng được và không có cách giải quyết nào để sử dụng chức năng đó trừ khi nhà phát triển sửa lỗi để có thể sử dụng thêm.

#### 3. Mức độ nghiêm trọng 3 (tương đối nghiêm trọng)

- Lỗi xảy ra mỗi khi chức năng chính của hệ thống / ứng dụng được kiểm tra không hoạt động nhưng có một cách giải quyết tạm thời tồn tại để sử dụng hệ thống.

 - Lúc này người kiểm thử phần mềm phải báo cáo lỗi là Mức độ nghiêm trọng 3 

Ví dụ: Người dùng có thể khởi chạy Trang Chuyển tiền trong ứng dụng Ngân hàng thành công, nút “Hoàn thành chuyển tiền” có thể nhấp để bắt đầu chuyển tiền. Nhưng ứng dụng chỉ cho phép chuyển số tiền tối đa là 1000 USD. Do đó, người sử dụng phải chuyển tiền 2 lần để chuyển $ 2000 ứng với mỗi lần chuyển $ 1000.

#### 4. Mức độ nghiêm trọng 4 ( Ít nghiêm trọng)

- Lỗi xảy ra khi các thành phần của ứng dụng không hoạt động theo đặc điểm kỹ thuật, nhưng vẫn có thể quản lý được. Có thể sửa lỗi trong bản phát hành trong tương lai.

- Lúc này ngườii kiểm thử phải báo cáo lỗi là Mức độ nghiêm trọng 4 / (Nhỏ) 

Ví dụ: Các vấn đề về thẩm mỹ trang “Chuyển tiền” như: lỗi chính tả, vấn đề định dạng trang.


### D. VÒNG ĐỜI CỦA KHIẾM KHUYẾT

Trong một phần mềm, vòng đời của khiếm khuyết sẽ trải qua các trạng thái dưới đây:

1. **New**: Đây là trạng thái mặc định khi khiếm khuyết được tạo.

2. **Rejected**: Khiếm khuyết đã được đánh giá và được coi là không hợp lệ với phiên bản, hoặc nhầm lẫn nên bị từ chối.

3. **Open**: Khiếm khuyết đã được xem xét và đang chờ để được chỉ định người thực hiện

4. **Need more info**: Người được giao (thông thường là Leader hoặc Developer), người đã xác định rằng cần thêm thông tin cụ thể của khiếm khuyết, sẽ trả lại khiếm khuyết cho người tìm ra nó.

5. **Assigned**: Khiếm khuyết đã được chỉ định cho một thành viên trong nhóm để giải quyết.

6. **Analysis**: Khiếm khuyết đang trong quá trình phân tích.

7. **Repair**: Khiếm khuyết đang trong quá trình sửa chữa.

8. **Fixed**: Khiếm khuyết đã được giải quyết bởi người được giao và đang chờ để được đưa vào danh sách để kiểm thử lại.

9. **Deferred**: Khiếm khuyết được coi là không cần thiết ngay lập tức và sẽ được xem xét để phát hành vào phiên bản trong tương lai.

10. **Pending Management Decision**: Khiếm khuyết đã được phân tích và coi là cần có quyết định từ ban quản lý trước khi có bất kỳ hành động nào. Phản hồi từ quản lý là cần thiết trước khi quyết định làm gì với Khiếm khuyết đó.

11. **Ready for Re-Test**: Bản sửa lỗi của Khiếm khuyết đã được build trên môi trường thử nghiệm và sẵn sàng để kiểm tra lại.

12. **Monitor**: Khiếm khuyết được xác định có thể là do ngẫu nhiên trong tự nhiên. Vấn đề của khiếm khuyết sẽ được theo dõi trong một khoảng thời gian xác định để xác định xem nó có xảy ra lần nữa không, để quyết định hướng xử lý.

13. **Re-Open**: Khiếm khuyết sau khi sửa chữa không vượt qua được quá trình thử nghiệm lại.

14. **Closed**: Khiếm khuyết đã được giải quyết và được xác nhận bởi đội ngũ thử nghiệm; nó không còn là vấn đề nữa.

*Tài liệu tham khảo:*

*https://softwaretestingtopics.com/category/software-defect-management/*