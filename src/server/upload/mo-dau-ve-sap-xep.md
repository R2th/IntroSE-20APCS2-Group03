## I. Từ sắp xếp trong cuộc sống đến với tin học
<p>
Sắp xếp là một hành động quen thuộc trong cuộc sống hằng ngày của chúng ta, đó là những hành động, sự việc quen thuộc như:
</p>
<p>

* Mẹ dạy cho em bé gấp và sắp xếp quần áo theo một trật tự hợp lí.
* Thầy giáo chủ nhiệm sắp xếp học sinh trong lớp ngồi theo vị trí cụ thể.
* Học sinh sắp xếp sách vở vào từng ngăn của cặp sách trước khi đến trường.
</p>
<p>
Vậy còn trong tin học, khái niệm "sắp xếp" có giống với trong cuộc sống? Chắc hẳn chúng ta đều quen thuộc với cách viết tập hợp trong môn Toán ở năm lớp 6, thầy giáo thường yêu cầu chúng ta viết tập hợp các số nên theo thứ tự từ nhỏ đến lớn (hoặc ngược lại). Chẳng ai lại thích một cách viết lộn xộn cả, vừa khó theo lõi lại cảm giác khi đọc không hề "dễ chịu" chút nào, đúng không?
    
VD:

**$A = \left\{ 1; 3; 5; 7; 9; 11; ... \right\}$**
**$A = \left\{3; 1; 5; 9; 7; 11; ...\right\}$**
</p>
<p>
Và việc sắp xếp từ nhỏ đến lớn trong ví dụ trên cũng chính là những bài toán khởi đầu và cơ bản nhất trong Tin học:<br>
VD: Cho một mảng số nguyên, hãy sắp xếp và trả về kết quả mảng theo thứ tự không giảm.
</p>

## II. Xung quanh bài toán sắp xếp trong tin học
<p>
Giả sử bạn đang chơi trò chơi bài Tú-lơ-khơ (bài gồm 52 quân), bạn nhận được 10 lá bài ngẫu nhiên từ người chia bài, và đương nhiên bạn cần sắp xếp chúng theo các trật tự nào đó: cây, đôi, ba, rồng, ... Như vậy chúng ta có nhiều cách sắp xếp khác nhau, tùy vào mục đích. Trong tin học cũng vậy, có thể kể đến một số loại thuật toán sắp xếp cơ bản như:

* Sắp xếp nổi bọt (Bubble Sort)
* Sắp xếp nhanh (Quick Sort)
* Sắp xếp bằng đếm phân phối (Counting Sort)
...
</p>
<p>
Trong quá trình chơi, bạn cũng cần dựa vào tình hình diễn ra của trò chơi mà thay đổi chiến thuật của bản thân, từ đó dẫn đến bạn cần sắp xếp lại bài trong tay mình. Như vậy thuật toán sắp xếp có thể cần thay đổi trong từng trường hợp cụ thể của bài toán đặt ra, bởi mỗi thuật toán đều có ưu, nhược điểm của riêng mình.
</p>
<p>
Đối với một bài toán liên quan đến sắp xếp trong tin học, và xa hơn nữa sau này là những bài toán sắp xếp trong doanh nghiệp - bài toán thường có số liệu lớn và phức tạp hơn, chúng ta cần chú ý đến một vài vấn đề:

### 1. Thời gian chạy của chương trình.<br>
Có thể với bài toán có số liệu nhỏ bạn hoàn toàn không cần quan tâm đến thời gian. Nhưng nếu là trong trường hợp bạn cần sắp xếp thông tin về họ tên, ngày tháng năm sinh của các sinh viên thuộc một trường đại học với số lượng lên đến hàng chục nghìn thì vấn đề thời gian chạy đóng vai trò rất quan trọng. Điều đó cũng nói lên việc một thuật toán hoạt động có hiệu quả hay không khi áp dụng vào thực tế.

### 2. Bộ nhớ.<br>
Bộ nhớ bạn được sử dụng trong mỗi bài toán là có hạn. Mỗi thuật toán đều có những đặc điểm và cách hoạt động riêng biệt nên việc sử dụng lượng bộ nhớ cũng sẽ khác nhau, đây là một vấn đề cần lưu ý vì khi thao tác trên một hệ thống có bộ nhớ hữu hạn (ví dụ embedded system) không phải thuật toán nào cũng có thể hoạt động được.

### 3. Độ ổn định của thuật toán (stability).<br>
Độ ổn định được định nghĩa dựa trên điều gì sẽ xảy ra với các phần tử có giá trị giống nhau.
* Đối với thuật toán sắp xếp ổn định, các phần tử bằng với giá trị bằng nhau sẽ giữ nguyên thứ tự trong mảng trước khi sắp xếp.
* Đối với thuật toán sắp xếp không ổn định, các phần tử có giá trị bằng nhau sẽ có thể có thứ tự bất kỳ.
</p>

## III. Tài liệu tham khảo

* [https://vi.wikipedia.org/wiki/Thu%E1%BA%ADt_to%C3%A1n_s%E1%BA%AFp_x%E1%BA%BFp](https://vi.wikipedia.org/wiki/Thu%E1%BA%ADt_to%C3%A1n_s%E1%BA%AFp_x%E1%BA%BFp)
* [https://en.wikipedia.org/wiki/Sort_(C%2B%2B)](https://en.wikipedia.org/wiki/Sort_(C%2B%2B))