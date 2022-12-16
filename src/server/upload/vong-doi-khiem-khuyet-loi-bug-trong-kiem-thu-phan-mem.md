**Giới thiệu về vòng đời của khiếm khuyết (defect):**

Bài viết này sẽ nói về vòng đời của một khiếm khuyết (defect) để giúp bạn nhận thức được các giai 

đoạn khác nhau của một khiếm khuyết (defect) mà một người kiểm thử (tester) phải đối phó trong 

quá trình kiểm thử.

Trong thực tế, lỗi (errors) / sai lầm (mistakes)/ lỗi lầm (faults) đều được gọi là lỗi/ khuyết tật, do đó 

có thể nói, mục tiêu chính của việc kiểm thử là đảm bảo rằng sản phẩm ít bị lỗi hơn.


**Khiếm khuyết (defect) là gì?**

Một khiếm khuyết (defect), nói đơn giản, là một lỗ hổng hoặc một lỗi trong một ứng dụng đang gây 

ra những hạn chế tới hoạt động bình thường của một ứng dụng bằng việc không phù hợp với hành 

vi mong đợi của ứng dụng trong thực tế.

Các khiếm khuyết (defect) xảy ra khi xuất hiện bất kỳ sai lầm nào được thực hiện bởi một nhà phát 

triển (developer) trong quá trình thiết kế hoặc xây dựng một ứng dụng và khi lỗ hổng này được tìm 

thấy bởi quá trình kiểm thử, nó được coi là một khiếm khuyết (defect).

Trách nhiệm của người kiểm thử (tester) là tiến hành kiểm thử kỹ lưỡng một ứng dụng với ý định 

tìm ra càng nhiều lỗi càng tốt để đảm bảo rằng một sản phẩm chất lượng sẽ được tiếp cận khách 

hàng.

Điều quan trọng là phải hiểu về vòng đời của khiếm khuyết (defect) trước khi chuyển sang các trạng

thái khác nhau của khiếm khuyết (defect).

### Chi tiết vòng đời của khiếm khuyết (defect):

Vòng đời khiếm khuyết (defect) hay còn được gọi là vòng đời của bug, là một chu kỳ của một khiếm

khuyết (defect) mà nó trải qua các trạng thái khác nhau trong toàn bộ quá trình của nó.

Quá trình này được bắt đầu từ ngay sau khi bất kỳ lỗi mới nào được tìm thấy bởi người kiểm thử 

(tester) và kết thúc khi người kiểm thử (tester) đóng lỗi đó để đảm bảo rằng nó sẽ không được sao 

chép lại.

**Quy trình làm việc của khiếm khuyết (defect) :**

![](https://images.viblo.asia/dab3f29a-e514-47b6-8402-8545d0018a20.jpg)

**Trạng thái lỗi:**
    
**1) New (Mới tạo) :**

Đây là trạng thái lỗi đầu tiên trong vòng đời khiếm khuyết (defect). 

Khi tìm thấy bất kỳ khiếm khuyết mới nào, nó rơi vào trạng thái 'New (Mới tạo)', việc xác nhận và 

kiểm tra được thực hiện trên lỗi này trong các giai đoạn sau của vòng đời khiếm khuyết (defect).

**2) Assigned (Được chỉ định):**

Trong giai đoạn này, lỗi mới được tạo sẽ được gán cho nhóm phát triển (developer) để khắc phục lỗi. 

Điều này được chỉ định bởi người quản lý dự án hoặc người quản lý của nhóm kiểm thử (tester 

leader) cho một nhà phát triển (developer).

**3) Open (Mở):**

Ở đây, nhà phát triển (developer) bắt đầu quá trình phân tích lỗi và hoạt động trên sửa lỗi, nếu 

được yêu cầu. 

Nếu nhà phát triển (developer) cảm thấy rằng lỗi này không phù hợp thì nó có thể bị chuyển sang 

bất kỳ trạng thái nào dưới đây dựa trên lý do cụ thể:

Duplicate (trùng lặp), Deferred (Trì hoãn), Rejected (Từ chối) hoặc Not a Bug (Không phải bug)

**4) Fixed (Đã sửa lỗi)**: 

Khi nhà phát triển (developer) hoàn thành công việc sửa lỗi bằng cách thực hiện các thay đổi cần 

thiết thì có thể đánh dấu trạng thái của lỗi là 'Fixed (Đã sửa lỗi)'.

**5) Pending Retest (Đang chờ kiểm tra):**

Sau khi sửa lỗi, nhà phát triển (developer) gán lỗi cho người kiểm thử (tester) để kiểm tra lỗi ở cuối 

và cho đến khi người kiểm thử (tester) bắt đầu hoạt động để kiểm tra lỗi, trạng thái lỗi vẫn còn 

trong 'Pending Retest (Đang chờ kiểm tra)'.

**6) Retest (Kiểm tra lại):**

Tại thời điểm này, người thử nghiệm (tester) bắt đầu nhiệm vụ làm việc để kiểm tra lại lỗi để xác 

minh xem lỗi có được nhà phát triển (developer) sửa chữa chính xác theo yêu cầu hay không.

**7) Reopen (Mở lại):** 

Nếu có bất kỳ vấn đề nào vẫn tồn tại trong lỗi thì nó sẽ được gán trả lại cho nhà phát triển 

(developer) một lần nữa để kiểm tra lại và trạng thái của lỗi lúc này được thay đổi thành 'Reopen

(Mở lại)'.

**8) Verified (Xác minh):**

Nếu người kiểm thử (tester) không tìm thấy bất kỳ vấn đề nào và nhận thấy rằng lỗi đã được sửa

chữa chính xác thì trạng thái của lỗi được gán là 'Verified (Xác minh)'.

**9) Closed (Đã đóng):**

Khi lỗi không tồn tại nữa thì người kiểm thử (tester) sẽ thay đổi trạng thái của lỗi thành 'Closed (Đã 

đóng)'.

*Ngoài ra:*

- Rejected (Bị từ chối): 
Nếu lỗi này không được coi là lỗi từ phía nhà phát triển (developer) thì lỗi đó được nhà phát triển (developer) đánh dấu là 'Rejected (Bị từ chối)'.

- Duplicate (Trùng lặp):
Nếu nhà phát triển (developer) tìm thấy lỗi hiện tại giống như bất kỳ lỗi nào khác hoặc nếu khái niệm về lỗi phù hợp với bất kỳ lỗi nào khác thì trạng thái của lỗi được thay đổi thành 'Duplicate (Trùng lặp)'.

- Deferred (Trì hoãn): 
Nếu nhà phát triển (developer) cảm thấy rằng lỗi không phải là ưu tiên rất quan trọng và nó có thể được khắc phục trong bản phát hành tiếp theo thì có thể thay đổi trạng thái của lỗi là 'Deferred (Trì hoãn)'.

- Not a Bug (Không phải là lỗi): 
Nếu lỗi không ảnh hưởng đến chức năng của ứng dụng thì trạng thái của lỗi sẽ bị thay đổi thành 'Not a Bug (Không phải là lỗi)'.

Các trường bắt buộc khi người kiểm tra ghi lại nội dung về bất kỳ lỗi mới nào bao gồm:

*Build version (phiên bản ứng dụng), Submit On (Gửi), Product (Sản phẩm), Mô-đun, Severity (Mức độ nghiêm trọng), Tóm tắt và Mô tả để tái tạo*

Trong danh sách ở trên, có thể thêm một số trường tùy chọn nếu đang sử dụng template bug thử công (excel). 

*Các trường tùy chọn này bao gồm tên khách hàng, trình duyệt, hệ điều hành, tệp đính kèm hoặc ảnh chụp màn hình.*

**Chu kỳ khiếm khuyết (defect):**

![](https://images.viblo.asia/4be3346d-6627-42ea-b063-cab4ad935b9c.jpg)

Hình ảnh trên khá chi tiết và khi bạn xem xét các bước quan trọng trong vòng đời của lỗi, bạn sẽ

nắm bắt nhanh được vòng đời của nó.

Khi đã xác định chắc chắn một lỗi, được xem xét bởi người phát triển (developer) hoặc người quản 

lý kiểm thử (tester leader). 

Công cụ quản lý lỗi có thể đặt trạng thái cho lỗi là 'Open (Mở)', có thể gán lỗi cho nhà phát triển

(developer) hoặc lỗi có thể được trì hoãn cho đến khi phát hành tiếp theo.

Khi một lỗi được gán cho một nhà phát triển (developer) và họ có thể bắt đầu làm việc trên nó. 

Nhà phát triển có thể đặt trạng thái lỗi là không khắc phục được, Không thể tái tạo, Cần thêm thông tin hoặc 'Fixed (Đã sửa)'.

Nếu trạng thái lỗi được thiết lập bởi nhà phát triển (developer) là 'Need more info (Cần thêm thông

tin)' hoặc 'Fixed (Đã sửa)'thì người kiểm thử (tester) sẽ trả lời bằng một hành động cụ thể. 

Nếu lỗi được sửa thì người kiểm thử (tester) sẽ kiểm tra lỗi và có thể đặt trạng thái lỗi là đã được

'Verified (xác minh)' đã 'Close (đóng)' hoặc 'Reopen (Mở lại)'.



*Nguồn tham khảo:*
*https://www.softwaretestinghelp.com/bug-life-cycle/*