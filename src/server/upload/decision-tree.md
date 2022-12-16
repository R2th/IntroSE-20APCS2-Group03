Decision tree là một mô hình supervised learning, có thể được áp dụng vào cả hai bài toán classification và regression. Mỗi một nút trong (internal node) tương ứng với một biến; đường nối giữa nó với nút con của nó thể hiện một giá trị cụ thể cho biến đó. Mỗi nút lá đại diện cho giá trị dự đoán của biến mục tiêu, cho trước các giá trị của các biến được biểu diễn bởi đường đi từ nút gốc tới nút lá đó. Kỹ thuật học máy dùng trong cây quyết định được gọi là học bằng cây quyết định, hay chỉ gọi với cái tên ngắn gọn là cây quyết định. 

## 1. Entropy
Giả sử ta có biến ngẫu nhiên rời rạc X:
- Có không gian mẫu là {x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>m</sub>} với xác suất
- P(X = x<sub>1</sub>) = p<sub>1</sub>,  P(X = x<sub>2</sub>) = p<sub>2</sub>, ...,  P(X = x<sub>m</sub>) = p<sub>m</sub>
Số bit trung bình nhỏ nhất để truyền một đơn vị dữ liệu theo phân phối P(X):
![](https://images.viblo.asia/0952b58c-d350-420a-b903-e0d7ff28273c.png)
 
 H(X) là entropy của X (0 <= H(X) <= log<sub>2</sub>m)<br>
 Xem xét m = 2, trong trường hợp X là tinh khiết nhất, tức là một trong hai p<sub>i</sub> bằng 0 và giá trị kia bằng 1, khi đó H(X) = 0. Khi X là vẩn đục nhất tức cả hai xác suất mang giá trị p<sub>i</sub> = 0.5, hàm entropy đạt giá trị cao nhất.
 
 ![](https://images.viblo.asia/8941ef24-c5f1-4c49-98dc-15b053b5d13b.png)

Vậy với m > 2,hàm entropy đạt giá trị nhỏ nhất nếu có một giá trị p<sub>i</sub> = 1 (tức các giá trị pi còn lại mang giá trị 0), đạt giá trị lớn nhất nếu tất cả pi bằng nhau.<br>
 Giá trị entropy:
 - Lớn: Phân phối P(X) gần với dạng phân phối đồng nhất (uniform distribution)
 - Nhỏ: Phân phối P(X) xa dạng phân phối đồng nhất
<br>Những giá trị này khiến nó được sử dụng trong việc đo độ vẩn đục của một pháp phân chia trong ID3 (Hôm bữa kiểm tra nói sai phần này :sob:). Nên ID3 còn được gọi là entropy-based descision tree.

### Entropy điều kiện H(Y|X)
H(Y|X) = trung bình các giá trọ entropy điều kiện cụ thể H(Y|X = v)
![](https://images.viblo.asia/5edffb00-7288-4f19-a1fb-56a5433ddf1b.png)

**Ví dụ:**

![](https://images.viblo.asia/fd1b7692-657a-46cf-8753-8bcddac8e8ff.png)

Ta có:

![](https://images.viblo.asia/5bacb4d6-5ae6-407f-acfd-cdce0a1b2ea1.png)

Vậy nên: 
H(Y|X) = 0.5 x 1 + 0.25 x 0  + 0.25 x 0 = 0.5

### Information Gain IG(Y|X)
IG(Y|X) là số lượng bit trung bình có thể tiết kiệm khi truyền Y mà hai đầu gửi và nhận đã biết X.<br>
Tức là: IG(Y|X) = H(Y)  - H(Y|X) <br>

**Ví dụ:** <br>
H(Y) = 1 <br>
H(Y|X) = 0.5<br>
IG(Y|X) = 1 - 0.5 = 0.5<br>

## 2. Iterative Dichotomiser 3 (ID3)
**Input:**

Tập dữ liệu huấn luyện D<br>
Tập các lớp C = {c<sub>1</sub>, c<sub>2</sub>, ..., c<sub>n</sub>} là thuộc tính đích.<br>
Attributes = F tập toàn bộ các thuộc tính điều kiện

**ID3**

1. Tạo nốt gốc (root) cho cây.
2. Nếu tất cả các đối tượng x thuộc D có cùng một lớp c<sub>k</sub>, trả về nốt gốc Root với nhãn c<sub>k</sub>.
3. Nếu không còn thuộc tính điều kiện nào (Attributes = rỗng), trả về nốt gốc Root với nhãn c<sub>k</sub> nào xuất hiện nhiều nhất trong D.
4. Nếu không thì:

    4.1. Chọn thuộc tính F<sub>i</sub> thuộc Attributes là thuộc tính phân lớp tốt nhất (với thuận toán ID3 là thuộc tính phân lớp tốt nhất là thuộc tính có độ lợi thông tin lớn nhất) cho tập D làm nốt gốc.
   
    4.2. Đối với mỗi giá trị v<sup>i</sup><sub>j</sub> của Fi
        4.2.1. Thêm một nhánh dưới nốt root tương ứng với F<sub>i</sub> = v<sup>i</sup><sub>j</sub>.<br>
        4.2.2. D(v<sup>i</sup><sub>j</sub>) là tập các đối tượng thuộc D có F<sub>i</sub>= v<sup>i</sup><sub>j</sub><br>
        4.2.3. Nếu D(v<sup>i</sup><sub>j</sub>) = rỗng, thêm một nốt lá (leaf node) dưới nhánh này với nhãn ck nào đó phổ biến nhất trong D. Ngược lại dưới nhánh này thêm một cây con ID3(D(v<sup>i</sup><sub>j</sub>), C, Attributes - {F<sub>i</sub>})<br>
5. Trả về nốt gốc Root.

### Ví dụ

![](https://images.viblo.asia/d47321be-76af-4e6a-81b3-4ec277fc5c30.png)

Information Gain theo từng thuộc tính.

![](https://images.viblo.asia/758faf16-59b9-4fc2-94cf-14b46244e263.png)

Dựng cây với nốt là thuộc tính Age.

![](https://images.viblo.asia/8949a325-5606-4453-9a90-ef8340139a2c.png)

Tiếp tục tính Information Gain cho những thuộc tính còn lại:

![](https://images.viblo.asia/9262193e-2e6c-4738-a3c5-2b9658f2801e.png)

Tiếp tục dựng cây:

![](https://images.viblo.asia/5b8e105f-3cf7-44ac-aad2-c21e7053adda.png)


## 3. Thuật toán C4.5
C4.5 là thuật toán cải tiến so với ID3:
- Sử dụng Gain Ratio (thay vì Information Gain) để chọn thuộc tính phân chia trong quá trình dựng cây.
- Xử lý tốt cả hai dạng thuộc tính: rời rạc, liên tục
- Xử lý dữ liệu không đầy đủ (thiếu một số giá trị tại một số thuộc tính).
+ C4.5 cho phép các thuộc tính - giá trị bị thiếu có thể thay bằng dấu hỏi (?)
+ Những giá trị bị thiếu không được xem xét khi tính toán Information Gain và Gain Radio
- Cắt tỉa cây sau khi xây dựng: Loại bỏ những nhánh cây không thực sự ý nghĩa (thay bằng nốt lá).

### Ý nghĩa của Gain Ratio (GR)

![](https://images.viblo.asia/c84e5eb3-a438-445b-9251-a21722a10b12.png)

Spliting entropy của thuộc tính Fi, ký hiệu SE(Fi):
![](https://images.viblo.asia/8bdcc4b4-1925-4671-9b47-aa3074dee26c.png)

Khi đó, Gain Ratio ký hiệu GR<sub>D</sub>(C|F<sub>i</sub>)

![](https://images.viblo.asia/67a06b5e-9f94-4edb-8f61-f4c43cd3d399.png)

Giá trị Information Gain và Gain Ratio


![](https://images.viblo.asia/14608e1b-e867-4da2-8f50-8c6a42e70f60.png)

1. Tiêu chí Information Gain thường "ưu tiên" chọn những thuộc tính có nhiều giá trị (miền xác định lớn)
2. Spliting entropy, SE<sub>D</sub>(F<sub>i</sub>) sẽ lớn khi thuộc tính F<sub>i</sub> có nhiều giá trị. Điều này giúp:<br>
2.1. Làm giảm Gain Ratio của thuộc tính có nhiều giá trị.<br>
2.2 Làm tăng Gain Ratio của thuộc tính có ít giá trị.<br>
3. Ý nghĩa khác:<br>
Giảm vấn đề "quá khớp"

## 4. Kết luận

### Ưu điểm
- Mô hình dễ hiểu và dễ giải thích.
- Cần ít dữ liệu để huẩn luyện.
- Có thể xử lý tốt với dữ liệu dạng số (rời rạc và liên tục) và dữ liệu hạng mục.
- Mô hình dạng white box rõ ràng.
- Xây dựng nhanh.
- Phân lớp nhanh.

### Nhược điểm
- Không đảm bảo xây dựng được cây tối ưu.
- Có thể overfitting (tạo ra những cây quá khớp với dữ liệu huấn luyện hay quá phức tạp).
- Thường ưu tiên thuộc tính có nhiều giá trị (khắc phục bằng các sử dụng Gain Ratio).

## 5. Ứng dụng

- Xử lý tốt dữ liệu dạng bảng biếu với số thuộc tính không quá lớn.
- Không phù hợp khi số lượng thuộc tính bùng nổ (như dữ liệu văn bản, hình ảnh, âm thanh, video, ...).


*Bài viết tham khảo bài giảng của thầy Phan Xuân hiếu - Giảng viên trường đại học Công Nghệ*