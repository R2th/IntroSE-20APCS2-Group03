**Một vài điểm cân nhắc khi chọn số lượng partition trong kafka:**

* Thông lượng bạn muốn lưu trữ cho một topic là bao nhiêu, ví dụ bạn muốn là write 100KB or 1 GB trong 1 giây.
* Thông lượng tối đa mà bạn muốn đạt được khi tiêu thụ từ một partition duy nhất, bạn sẽ luôn luôn có nhiều nhất là một consumer đang đọc thừ partition, nếu bạn biết rằng việc người tiêu thụ chậm hơn việc write data vào cơ sở dữ liệu và việc xử lý này sẽ không quá 50 MB trên 1 giây từ mỗi luồng để ghi nó, sau đó bạn sẽ giới hạn tiêu thụ data từ mỗi thread là 60 MB.
*  Chúng ta có thể thực hiện một vài ví dụ để xem data tối đa của một producer cho một partition, và cuối cùng bạn sẽ rút ra một điều đó là producer sẽ luôn luôn nhanh hơn consumer. 
*  Nếu bây giờ data của bạn ít, nên bạn chọn số lượng partition nhỏ, sau một thời gian dự án của bản phát triểu thì bạn thay đổi bằng cách thêm số lượng partition → điều này thực sự khó khăn, do đó hãy dự đoán data trong tương lai để chọn cho chính xác, chứ không phải là data hiện tại mà ứng dụng đang phải handle.
*  Bạn cũng không nên chọn số lượng partition quá nhiều, mỗi partition có sử dụng một memory và lượng resource khác nhau trên broker, điều này sẽ dẫn đến việc tăng thời gian chọn ra leader khi gặp vấn đề không may.

-----

**Tóm Lại:**
Với tất cả những thứ cơ bản ở trên mình nghĩ nó đã khá rõ để bạn chọn số lượng partition cần sử dụng trong dự án của bạn. Nếu bạn muốn một topic có khả năng read and write 1GB/sec, với mỗi consumer có thể chỉ process 50MB/s, điều đó có nghĩa là bạn cần ít nhất 20 partition, như vậy bạn có 20 consumers read data từ topic, đáp ứng được điều kiện hoàn thành 1GB/sec.

-----

**Gợi ý:**
* Nếu bạn không có thông tin chi tiết từ về dữ liệu cần xử lý, thì theo như một cuốn sách mình đọc thì tốt nhất là ít hơn 6GB sẽ là an toàn.