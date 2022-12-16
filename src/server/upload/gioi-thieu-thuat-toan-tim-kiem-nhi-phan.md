Tìm kiếm nhị phân là một thuật toán cơ bản trong khoa học máy tính. Thay vì tìm kiếm một phần tử trong mảng một cách tuyến tính duyệt từng phần tử, tìm kiếm nhị phân cho ta cách tìm kiếm tối ưu hơn bằng cách sắp xếp các phần tử trước khi truy vấn. Cụ thể như nào các bạn hãy theo dõi bài viết nhé :D 

# Phân tích thuật toán

## Đặt vấn đề

Hãy thử tưởng tượng bạn đang cần tìm một từ trong cuốn sách từ điển tiếng Anh (tất nhiên giờ mọi người hầu như tra từ điển trên internet hết rồi :D). Cuốn sách từ điển được sắp xếp sẵn theo thứ tự bảng chữ cái. Giả sử từ cần tìm là "heart". Bằng cách tìm kiếm theo kiểu tuần tự, bạn sẽ phải lật từng trang một từ đầu cuốn sách cho đến từ mình cần tìm kiếm, cách này thường rất mất thời gian. Khi mà bộ từ điển càng nhiều từ, việc tìm kiếm càng trở nên khó khăn hơn. Hơn nữa, nhỡ không may trong từ điển không có từ "heart" thì toang :D bạn lại mất công tìm một thứ không có :) 

Okay! Nhớ rằng từ điển được sắp xếp theo thứ tự bảng chữ cái. Ta sử dụng cách làm nhanh hơn đó là chia từ điển thành 2 phần bằng nhau để tận dụng sự sắp xếp này. Bạn chọn một từ bất kì nằm giữa cuốn từ điển xem xem nó là từ gì, giả sử là từ "month" chẳng hạn. Vì sắp xếp theo thứ tự bảng chữ cái nên rõ ràng bạn không cần phải xét nửa sau của từ điển nữa mà chỉ cần tìm nửa đầu của cuốn từ điển. Sau đó bạn lại tiếp tục chia nửa đầu cuốn từ điển thành 2 phần bằng nhau và tiếp tục thực hiện tương tự. Đây là chiến thuật "chia để trị" giúp bạn tìm kiếm nhanh hơn rất nhiều so với cách tìm kiếm tuần tự. Rất thú vị, đây cũng chính là ý tưởng cho thuật toán tìm kiếm nhị phân.

Bài toán cụ thể trong lập trình được mô tả như sau: Cho một mảng $A$ gồm $n$ phần tử. Xác định vị trí của phần tử có giá trị $k$ trong mảng $A$.  

## Mô tả thuật toán

Điều kiện tiên quyết để áp dụng tìm kiếm nhị phân là ta cần sắp xếp lại các phần tử trong mảng theo thứ tự tăng dần (hoặc giảm dần). Không mất tính tổng quát của thuật toán, mình sẽ chọn cách sắp xếp tăng dần. Giả sử trong mảng $A$ đã được sắp xếp, việc tiếp theo là thực hiện thuật toán tìm kiếm nhị phân.

Sau đó ta thực hiện các bước như sau: 
- Đặt 2 biến đánh dấu vị trí đầu và cuối của phạm vi trong mảng cần xét.
- Chia mảng thành 2 phần bằng nhau và so sánh giá trị cần tìm với giá trị nằm giữa 2 phần đó. Nếu giá trị cần tìm lớn hơn, ta xét nửa sau của mảng. Nếu nhỏ hơn, thực hiện xét nửa trước của mảng. Ta cập nhật lại 2 biến đánh dấu phạm vi mảng cần xét. Nếu bằng, ta xác định được vị trí của phần tử và kết thúc thuật toán.
- Tiếp tục thực hiện 2 bước trên cho đến khi tìm được giá trị cần tìm. Nếu không tìm được ta suy ra trong mảng không tồn tại phần tử có giá trị như đề bài yêu cầu.

![Imgur](https://imgur.com/My2AxwS.png)

Mã giả của thuật toán:

```cpp
binary_search(A, k):
   lo = 1, hi = size(A)
   while lo <= hi:
      mid = lo + (hi-lo)/2
      if A[mid] == k:
         return mid            
      else if A[mid] < k: 
         lo = mid+1
      else:
         hi = mid-1
```
Ba biến được sử dụng trong việc cài đặt thuật toán: lo, hi, và mid. Lo, hi, mid lần lượt là điểm đầu, cuối và giữa của mảng con đang xét. Hiệu suất của code phụ thuộc vào số lần thực thi vòng lặp.

## Phân tích độ phức tạp

Tìm kiếm nhị phân chia kích thước mảng thành một nửa mỗi khi thực hiện vòng lặp. Số lần lớn nhất mảng kích thước $n$ bị cắt đi một nửa là $\log (n)$, nếu $n$ là lũy thừa của 2; ngược lại, nó là $\lfloor \log (n) \rfloor$. Nếu ta sử dụng một thao tác đơn lẻ để xác định xem hai giá trị bằng nhau, nhỏ hơn hay lớn hơn (thao tác so sánh), thì chỉ cần $\lfloor log (n) \rfloor$  thao tác. Do đó, độ phức tạp trung bình là $O (\log n)$.

Tìm kiếm nhị phân yêu cầu ba con trỏ đến các phần tử, có thể là chỉ số mảng hoặc con trỏ đến vị trí bộ nhớ, bất kể kích thước của mảng. Do đó, độ phức tạp không gian của tìm kiếm nhị phân là $O(1)$.

## Biến thể

Có hai biến thể chính của tìm kiếm nhị phân. Đầu tiên liên quan đến việc xử lý dữ liệu động trong đó người ta phải điều chỉnh việc cài đặt để cho phép chèn và xóa hiệu quả vào một tập dữ liệu trong khi vẫn duy trì một hiệu suất tìm kiếm có thể chấp nhận được. Nếu một mảng được sử dụng để lưu trữ tập dữ liệu thì việc chèn và xóa khá kém hiệu quả, vì mọi chỉ số trong mảng phải chứa một phần tử hợp lệ. Do đó, việc chèn liên quan đến việc mở rộng, tăng kích thước mảng và đẩy trung bình một nửa số phần tử về sau một vị trí. Việc xóa yêu cầu thu nhỏ mảng và di chuyển một nửa số phần tử xuống một vị trí chỉ số. Cả hai điều này đều không ổn cho lắm.

Miễn là tập dữ liệu phù hợp với bộ nhớ, một lựa chọn tốt là chuyển sang cách tiếp cận tìm kiếm dựa trên băm bằng cách sử dụng chuỗi xung đột (collision chaining). Trong bài viết sau mình sẽ trình bày “Tìm kiếm dựa trên băm”, mô tả một cách tiếp cận đơn giản để tìm kiếm trên dữ liệu động. Một phương pháp thay thế là tạo một cây tìm kiếm nhị phân trong bộ nhớ. Cách tiếp cận này có thể đơn giản để thực hiện nếu việc chèn và xóa đủ ngẫu nhiên để cây không trở nên quá sai lệch. Tuy nhiên, kinh nghiệm cho thấy rằng trường hợp này hiếm khi xảy ra và phải sử dụng loại cây tìm kiếm phức tạp hơn đó là "Cây tìm kiếm nhị phân cân bằng". 

Biến thể thứ hai giải quyết trường hợp dữ liệu vừa động vừa lớn so với bộ nhớ. Khi điều này xảy ra, thời gian tìm kiếm bị chi phối bởi các hoạt động nhập/xuất đến bộ nhớ thứ cấp. Một giải pháp hiệu quả là sử dụng một cây $n$-ary gọi là B-Tree. Đây là một cây nhiều cấp được tinh chỉnh để đạt được hiệu suất tốt trên bộ nhớ thứ cấp. 

# Tổng kết

Thuật toán tìm kiếm nhị phân là một thuật toán cơ bản nhưng được sử dụng rất nhiều trong lập trình thi đấu và trong cuộc sống. Việc áp dụng một cách khéo léo sẽ giúp bạn giải quyết và cải thiện các bài toán lập trình của mình.

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim