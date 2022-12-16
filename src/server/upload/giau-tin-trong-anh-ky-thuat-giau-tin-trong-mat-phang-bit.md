# Giới thiệu
BPCS (Bit Plane Complexity Segmentation steganography) là một kỹ thuật giấu tin mới được phát minh bởi Eiji Kawaguchi và Richard O. Eason vào năm 1997. Nó có thể nhúng thông tin bí mật trong vật chứa thường là một hình ảnh màu sắc thực sự (24- định dạng bit BMP) và đôi khi trong hình ảnh màu 8 bit. Nhúng (thực tế là thay thế) được thực hiện trên các mặt phẳng bit của hình ảnh. Tính năng quan trọng nhất của kỹ thuật giấu tin này là khả năng nhúng rất lớn. 
Ý tưởng chính của BPCS là giấu tin trên các vùng nhiễu thay vì giấu trên tất cả các vùng, nếu giấu trên các vùng đồng màu sẽ ảnh hưởng không nhỏ đến chất lượng ảnh, đặc biệt khi các khung hình của video được chiếu trên màn hình tivi lớn hay màn ảnh rộng việc gây ra nhiễu sắc màu cho các vùng này sẽ dễ bị ghi ngờ hơn.
BPCS-Steganography được cấp bằng sáng chế tại Hoa Kỳ (No. 6,473,516) năm 2002.
# Thuật toán BPCS
Nguyên tắc cơ bản là hình ảnh bìa đầu tiên được chia thành “vùng thông tin” và “vùng nhiễu”. Sau đó, thông tin bí mật được ẩn trong các khối nhiễu của hình ảnh chứa. Trong kỹ thuật LSB, dữ liệu được ẩn trong mặt phẳng bit thấp nhất. Nhưng trong kỹ thuật BPCS, dữ liệu có thể được ẩn trong các khối pixel của tất cả các mặt phẳng, từ mặt phẳng cao nhất (bit quan trọng nhất Most Significant Bit (MSB) plane) đến mặt phẳng thấp nhất (LSB plane), có các mẫu nhiễu. Trong BPCS, một hình ảnh màu bao gồm các điểm ảnh (pixels) n-bit có thể được phân tách thành n mặt phẳng nhị phân.

**Ví dụ:**

![](https://images.viblo.asia/095ada4f-7f61-47c0-8a6f-b7e240044270.png)
P là một hình ảnh màu n-bit; ở đây n=8. Do đó P = [P7, P6, P5, P4, P3, P2, P1, P0], P7 là mặt phẳng bit MSB và P0 là mặt phẳng bit LSB. Mỗi mặt phẳng bit có thể được phân đoạn thành vùng “thông tin” và vùng “nhiễu”. Đơn giản trong vùng thông tin thì không thể được sử dụng để giấu thông tin. Tuy nhiên, nếu là vùng nhiễu thì có thể được thay thế bằng một khối nhiễu khác để giấu tin. Kết quả là, nó sẽ không thay đổi chất lượng tổng thể của hình ảnh sau khi nhúng.
Bước quan trọng nhất trong BPCS là cách định vị các vùng nhiễu trong ảnh chứa một cách chính xác. Phương pháp thông thường là chia từng mặt phẳng bit của ảnh chứa thành các khối pixel nhị phân vuông nhỏ hơn. Các khối được coi là khối blocks; ta thường có các mẫu màu đen và trắng phức tạp. Thường giá trị phức tạp α được định nghĩa là tiêu chí để đánh giá liệu khối đó có là khối phức tạp hay không:

Với k là tổng các đường viền giữa màu đen và trắng trong ảnh, n là số hàng hoặc số cột của khối, và 2n(n-1) là chiều dài biên tối đa có thể thu được từ một mẫu n x n. Nếu α cao hơn giá trị ngưỡng cho trước, thì khối được coi là phức tạp (nhiễu).
Ví dụ: Giả sử một khung hình mà mỗi điểm ảnh được biểu diễn bởi 8 bit thì ta sẽ có 8 mặt phẳng bit tương ứng như minh họa trong hình 2, trong đó giả sử một điểm ảnh biểu diễn dưới dạng nhị phân là 01001110, trong mặt phẳng bit các màu đen ứng với giá trị 0 và màu trắng ứng với giá trị 1, do đó:

* Trong mặt phẳng bit thứ nhất tại vị tri (0,0) có một màu đen (biểu diễn giá trị 0).
* Trong mặt phẳng bit thứ 2 tại vị trí (0,0) có màu trắng (biểu diễn giá trị 1).
* Trong mặt phẳng bit thứ 3 tại vị trí (0,0) có màu đen.
* Tương tự đến mặt phẳng bit thứ 8 tại vị trí (0,0) có màu đen.

![](https://images.viblo.asia/9aba5aeb-fde1-4fef-b7b1-2ac5e32f6cdd.png)
Như vậy có thể hiểu sự phức tạp của khối blocks trong mặt phẳng bit là số lượng chuyển tiếp cảnh 1-0 và 0-1 theo cả hướng ngang và hướng dọc trên số lượng chuyển tiếp cảnh tối đa. Độ phức tạp của từng vùng mặt phẳng bit không phụ thuộc vào số lượng các bit số 0 và 1 một của vùng. Đối với mặt phẳng vuông kích cỡ n x n thì sẽ có giá trị chuyển tiếp cảnh tối đa là 2n(n-1) và tối thiểu là 0. Ví dụ trong trường hợp vùng khối có kích thước 8 x 8 bit thì số lượng chuyển tiếp cảnh tối đa là 112.

![](https://images.viblo.asia/8023031e-688a-467c-9f90-943f76e5e531.png)
Trong hình 3, với ngưỡng phức tạp  thì khối a) gọi là khối nhiễu và khối b) gọi là khối nhiều thông tin, bằng quan sát ta thấy có cùng số lượng bit 0 và 1 là như nhau nhưng giá phức tạp lại khác nhau (). Điều này cho thấy khối a) có rất ít thông tin thị giác hơn khối b), do đó nếu biến đổi khối a) để giấu thông tin mật thì có ảnh hưởng rất thấp về chất lượng ảnh. Ngược lại, nếu biến đổi khối b) để giấu thông tin sẽ gây ra biến dạng hay nhòe cạnh nhất định của hình ảnh, do đó sẽ gây ra nghi ngờ ít nhiều. Phương pháp này hoạt động rất tốt đối với khung hình của video tự nhiên vì nó có nhiều vùng nhiễu cao do đó có thể giấu thông tin với tỉ lệ cao. Với các khung hình có vùng bit ít phức tạp thì bất cứ thay đổi nào đều có thể tạo ra các dấu vết rõ ràng.
# BPCS Steganography cải tiến
Phương pháp tình toán sự phức tạp trên biên giới đen trắng là một phương pháp đơn giản và dễ dàng để đánh giá liệu các khối phức tạp hay không. Tuy nhiên nó không phải lúc nào cũng thực sự hữu ích.

**Ví dụ:** Các khối, chẳng hạn như bàn cờ hoặc sọc, được công nhận là các khối phức tạp theo cách này.  Như trong hình dưới đây:

![](https://images.viblo.asia/47bf5f41-012b-4103-9a43-d41edd24a83b.png)
Nhưng các khối này không thể được sử dụng để nhúng dữ liệu; nếu không hình ảnh sẽ xấu đi rõ ràng.
Có hai kỹ thuật mới để phân biệt các khối phức tạp với các khối đơn giản: run-length irregularity và border noisiness.

**Run-length irregularity (Bất thường về độ dài chạy)**

Run-length irregularity là biểu đồ bao gồm các độ dài chạy (run-length) của cả hai điểm ảnh đen trắng trong một hàng hoặc trong một cột.
Giả sử rằng h[𝑖] là tần số chạy 𝑖 pixel có màu đen hoặc trắng và 𝑛 là độ dài của chuỗi pixel; sau đó hs được sử dụng để đo sự bất thường của chuỗi pixel nhị phân:


Giá trị của  thường được chuẩn hóa thành [0, 1] và ký hiệu là 
Nếu kích thước của khối là 𝑛 × 𝑛 và ri và cj là hàng thứ i và cột thứ j của một khối, khi đó độ bất thường 𝛽 của một khối được định nghĩa như sau:

Trong đó:

Và  là giá trị trung bình của tất cả các phần tử của 𝑋.
Theo định nghĩa, các giá trị trung bình của hàng và cột được lấy làm giá trị của . Như đã thấy trong dưới, chúng đều được định kỳ trong hàng hoặc cột. Kết quả là, mọi Run-length irregularity 𝛽 đều là 0, vì vậy chúng đơn giản và không thể được sử dụng để nhúng thông tin. Run-length irregularity chỉ hữu dụng trong hàng hoặc cột. Nếu khối thường xuyên theo các hướng khác, 𝛽 sẽ không có gì liên quan đến nó, như trong hình sau:

![](https://images.viblo.asia/ad21a362-8b78-4b32-afa3-c4e4f528449b.png)

**Giá trị ngưỡng mặc định (Default Threshold Values).**

Một khối B chỉ được nhận dạng là phức tạp nếu nó thỏa mãn các điều kiện sau:

Ở đây các giá trị  là các giá trị mặc định:

Từ phương trình trên, có thể kết luận rằng mặt phẳng bit cao hơn và giá trị ngưỡng cũng lớn hơn. Đó là bởi vì nó sẽ nâng cao những thay đổi đáng chú ý cho việc nhúng dữ liệu quá mức trong mặt phẳng bit cao và cũng có đủ khả năng nhúng tự do trong mặt phẳng bit thấp.
Có một thực tế là các giá trị ngưỡng này là mặc định và không phải lúc nào cũng tối ưu. Chúng có thể được điều chỉnh theo cách thủ công theo các điều kiện thực tế.

**Các bước thực hiện và sơ đồ giấu tin, đánh giá thuật toán BPCS**

**Input**: Thông điệp (dạng bit), video để chứa thông điệp.

**Output**: Video đã được giấu tin và khóa K để giải mã thông điệp.
* 
* **Bước 1:** Tách khung hình ảnh từ video, chọn khung giấu tin và lưu vị trí này vào khóa K.
* **Bước 2:** Chia từng vùng ảnh thành các mặt phẳng bit với kích thước theo độ sâu màu. Phân loại các vùng thành các vùng “nhiều thông tin” và “nhiễu” dựa trên ngưỡng phân loại. 
* **Bước 3:** Nhúng thông tin vào các “nhiễu” để tạo thành vùng có giấu tin. Lưu vị trí các khối nhiễu đã giấu tin vào location map. 

* **Bước 4:** Có thể nhúng bản đồ định vị vùng giấu tin (location map) cùng các khối bí mật và chỉ lưu vị trí của khối này hoặc lưu trữ riêng cả location map này vào khóa. 
* **Bước 5:** Gửi video đã giấu tin và khóa cho người cần giải mã.

**Sơ đồ giấu tin thuật toán BPCS**

![](https://images.viblo.asia/418c9589-874a-421d-b7e6-064f03737b43.PNG)

**Ưu điểm:**

* Khả năng nhúng lớn.

* Thuật toán dễ hiểu, dễ cài đặt.

* Khả năng ứng dụng lớn.

**Nhược điểm:**

* Bản chất BPCS vẫn là thuật toán giấu tin trên miền không gian của khung hình Video, vì vậy vẫn có thể chịu ảnh hưởng bởi phương pháp thống kê cặp điểm ảnh POV, hoặc các kỹ thuật hình học trong xử lý ảnh như: làm mịn, co giãn ảnh, … 

Trên đây là một chút lý thuyết có phần khô khan về một kỹ thuật giấu tin đang được sử dụng hiện nay. Trong phần tới, mình sẽ tiến hành DEMO giấu tin và giải mã một thông điệp đơn giản trong ảnh để mọi người có thể có cái nhìn trực quan hơn :).Xin cảm ơn!
# Tài liệu tham khảo
[1]. Bằng sáng chế của BPCS tại Hoa Kỳ

[2]. A New Information Hiding Method Based on Improved BPCS Steganography

[3]. Applications of Steganography

[4]. What's BPCS-Steganography?