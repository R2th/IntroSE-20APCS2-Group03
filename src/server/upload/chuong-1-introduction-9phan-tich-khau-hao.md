Ở các bài viết trước mình đã trình bày về Running Time Analysis, phân tích về thời gian chạy của thuật toán trong các trường hợp Worst case, Best case, Average case phụ thuộc vào dữ liệu input đầu vào của một operation riêng lẻ.\
Bài viết này chúng ta sẽ thảo luận về Amortized Analysis - Cũng là phân tích nhưng sẽ trên bài toán 1 cách tổng quan hơn(chuỗi operations).\
Trong sách tác giả viết khá ngắn gọn nên mình có tham khảo cả ở [link sau](https://www.geeksforgeeks.org/analysis-algorithm-set-5-amortized-analysis-introduction/) \
Đi vào chi tiết nào.

### 1.27 Amortized Analysis
**Amortized analysis đề cập đến việc xác định time-averaged running time cho một chuỗi operations(hoạt động).**\
Nó được sử dụng cho các thuật toán trong đó **một operation không thường xuyên rất chậm( Tốn nhiều chi phí)**, còn **hầu hết các operation khác nhanh hơn(Tốn ít chi phí).**\
Trong Phân tích khấu hao, chúng ta phân tích **chuỗi operations** và **đảm bảo thời gian trung bình trong trường hợp xấu nhất thấp hơn thời gian trong trường hợp xấu nhất của một operation tốn nhiều phi phí.**

Khi một sự kiện trong một chuỗi ảnh hưởng đến chi phí của các sự kiện sau đó:
* Một nhiệm vụ cụ thể có thể tốn kém.
* Nhưng nó có thể khiến cấu trúc dữ liệu ở trạng thái mà một vài thao tác tiếp theo trở nên dễ dàng hơn.

\
Lý thuyết này có lẽ hơi trừu tượng, mình sẽ lấy vài ví dụ để các bạn dễ hình dung hơn: \
**Example1**:\
Chúng ta hãy xem xét một mảng các phần tử mà từ đó chúng ta muốn tìm phần tử nhỏ nhất thứ k.\
Chúng ta có thể giải quyết vấn đề này bằng cách sử dụng sắp xếp.\
Sau khi sắp xếp mảng đã cho, chúng ta chỉ cần trả về phần tử thứ k từ nó.\
Chi phí thực hiện sắp xếp (giả sử thuật toán sắp xếp dựa trên thuật toán Merge Sort) là O (nlogn).\
Nếu chúng ta thực hiện n lựa chọn như vậy thì chi phí trung bình của mỗi lựa chọn là O (nlogn / n) = O (logn).\
Điều này chỉ ra rõ ràng rằng việc sắp xếp một lần là giảm độ phức tạp của các hoạt động tiếp theo.

**Example2:**\
Chúng ta có một dynamic array, nguyên lý là mỗi khi đầy sẽ tăng kích thước. Chi tiết các bước như sau:
1. Cấp phát bộ nhớ cho kích thước bảng lớn hơn, thường gấp đôi bảng cũ.
2. Sao chép nội dung của bảng cũ sang một bảng mới.
3. Giải phóng bảng cũ.

![image.png](https://images.viblo.asia/ae4f2e5c-1d19-46d7-8471-024f876b4f61.png)

**Phân tích time complexity của n lần insert thêm phần tử vào mảng:**\
Nếu chúng ta sử dụng phân tích đơn giản, chi phí chèn trong trường hợp xấu nhất là $O ( n )$).\
Do đó, chi phí trong trường hợp xấu nhất của n lần chèn là $n ^ { \star } O ( n )$ là $O ( n ^ { 2 } )$.\
Phân tích này đưa ra giới hạn trên upper bound, nhưng không chặt chẽ cho n lần chèn vì tất cả các lần chèn không mất $O ( n )$ thời gian.\
Giả sử dữ liệu được thêm vào như sau: 

![image.png](https://images.viblo.asia/19a2c179-c3b2-43ba-b2d0-edaedca47d85.png)

Ta thấy luôn ở các vị trí 2^x + 1 là 2, 3, 5, 9, ... ta sẽ có cost tương ứng 2^x + 1(Chi thêm thêm phần tử vào là 1, chi phí dịch 2^x phần tử sang mảng mới tốn chi phí 2^x, giả bỏ qua cost bước 1 và 3)\
=> Amortized Cost = (1 + 2 + 3 + 5 + 1 + 1 +  9 + 1 + ...) / n\
Chúng ta có thể đơn giản hóa biểu thức trên thay 2, 3, 5, 9, ... bằng (1+1), (1 + 2), (1 + 4), (1 + 8), ...\
=> Amortized Cost = [(1+1+1+...) + (1 + 2 + 4 + 8 + ...)] / n \
Ta có  biểu thức (1+1+1+...) có n phần tử => tổng = n\
Biểu thức (1 + 2 + 4 + 8 + ...) có log(n-1) + 1 phần tử (Log ở đây cơ số 2) => Tổng <= 2n (Chứng minh các bạn có thể sử dụng [Geometric series](https://viblo.asia/p/chuong-1-introduction-5-ung-dung-trong-phan-tich-thuat-toan-r1QLxPY2LAw) trong bài viết này)

=> Amortized Cost = [(1+1+1+...) + (1 + 2 + 4 + 8 + ...)] / n \
$\quad \quad \quad \quad \quad \quad \quad \quad \leq (n + 2n)/n$ \
$\quad \quad \quad \quad \quad \quad \quad \quad \leq 3$ 

Bằng cách sử dụng Phân tích khấu hao, chúng ta đã chứng minh rằng Mảng động có thời gian insert O(1) (Lưu ý bài toán này luôn insert vào cuối của array, insert vào vị trí bất kỳ trong mảng sẽ là bài toán khác).


### Kết thúc 
Tới đây là kết thúc lý thuyết của chương 1, hi vọng mọi người sẽ có thêm kiến thức về cách mà chúng ta phân tích thuật toán.