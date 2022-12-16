Cùng với sự phát triển của AI, ML, các hệ thống tìm kiếm ảnh cũng đã đạt được những thành tựu nhất định, đặc biệt là các hệ thống tìm kiếm ảnh dựa trên nội dung (Content-based Image Retrieval System). Tuy nhiên, để tận dụng được hiệu quả của những bộ máy tìm kiếm đã được phát triển (như Solr, Elasticsearch), ta cần có những kĩ thuật mã hóa các ảnh thật tốt để tránh làm mất mát thông tin của ảnh. blog này tập trung vào việc mô tả tổng quan về việc xây dựng hệ thống truy vấn ảnh dựa trên nội dung, và một kĩ thuật mã hóa mang tên Subvector-wise Clustering giúp tận dụng tốt khả năng tìm kiếm tuyệt với của Elasticsearch. 
# 1. Tổng quan Framework cho hệ thống tìm kiếm ảnh trong Elasticsearch
Workflow của hệ thống truy vấn ảnh được mô tả trong hình dưới đây: <br>
![](https://images.viblo.asia/a02639dd-7d2f-41b8-be8c-aa35a06a6474.png) <br>
* Với dữ liệu ảnh đầu vào, các features của ảnh được trích rút ra dựa trên CNN, những feature này sau đó được đưa vào quá trình encode tạo ra những chuỗi string tokens phục vụ cho full-text search trong Elasticsearch.
* Những chuỗi string tokens của dữ liệu sau đó được index vào Elasticsearch và chờ truy vấn
* Đối với quá trình truy vấn, ảnh cũng được encode theo cơ chế như lúc index, kết quả trả về được rerank và hiển thị theo thứ tự
* Đánh giá hiệu năng của hệ thống tìm kiếm dựa trên tập dữ liệu mẫu và tập kết quả trả về. <br>
 Phần 1 tập trung vào quá trình Indexing và Searching. Việc xây dựng và đánh giá hệ thống sẽ được trình bày ở các blog sau.
## 1.1. Indexing: 
* Feature vector của các ảnh có dạng: <br>
	$X := \{x_1, x_2, ..., x_n\} \subset R^d$ 
* Trước tiên các vector này được encode thành tập các chuỗi: <br>
$S := \{s_1, s_2, ..., s_n\}$ 
	
	
* Trong đó, $S_i = \xi(x_i)$  là bộ encoder biến đổi feature vector thành một tập  chuỗi ký tự. Feature vector ban đầu X cùng với chuỗi encode được index vào Elasticseach.

## 1.2. Searching 
Về cơ bản, pha tìm kiếm của hệ thống bao gồm 2 bước chính: tìm kiếm và xếp hạng lại kết quả. 
* Tìm kiếm: <br> 
Với mỗi ảnh query, nó được chuyển thành feature vector  $x_i$, sau đó được encode thành tập các chuỗi $s_i$ thông qua cơ chế giống như trong khi indexing. Kết quả trả về của việc query bao gồm  vector  $R := \{x_1, x_2, ..., x_n\}$, việc tìm kiếm dựa trên độ trùng lặp giữa tập chuỗi query $s$ và tập chuỗi được encode khi đưa vào Elasticsearch $S := \{s_1, s_2, ..., s_n\}$.

	
* Rerank: <br>
Sau khi đã có tập kết quả trả về, chúng sẽ được xếp hạng lại dựa trên khoảng cách Euclidean giữa các feature vector của từng kết quả với feature vector của câu truy vấn.

	

Có thể thấy việc lựa chọn hàm encode $\xi(x_i)$ đóng vai trò rất quan trọng góp phần vào việc tăng độ chính xác của kết quả trả về, từ đó tăng độ chính xác cho hệ thống. Hàm encode  tốt sẽ cho kết quả trùng lặp cao của các chuỗi ký tự nếu khoảng cách Euclidean của chúng gần nhau. Chi tiết phương pháp encode trong bài sẽ được đưa ra chi tiết ở phần tiếp theo.

# 2. Mô tả phương pháp encode: Subvector-wise Clustering
Về cơ bản, ý tưởng của phương pháp dựa trên việc gom nhóm các đặc điểm của feature vector $x$ của từng ảnh, sau đó thực hiển phân cụm để tạo ra những tổ hợp chuỗi giúp tận dụng khả năng tìm kiếm full-text của Elasticsearch trong hệ thống.
## 2.1. Gom nhóm các đặc điểm của feature vector
Với mỗi feature vector $x \in R^d$, chia chúng thành $m$ subvectors. Hình dưới đây mô tả cách gom nhóm được trình bày. Để đơn giản, giá trị $m$ được chọn sao cho $m$ là ước số của $d$.
![](https://images.viblo.asia/45bc0ab6-540f-4c1e-90c8-034d5cd8d86a.png) <br>
Quy ước $X^i = \{x_1^i, x_2^i, ..., x_n^i\}$ là một tập các subvectors thứ $i$ của tất cả các feature vector của ảnh với $i = 1, 2, ..., m$. 
## 2.2. Phân cụm với k-means
Sau khi thực hiện phân chia, ta được $m$ tập, mỗi tập có số phần tử bằng số điểm dữ liệu, mỗi phần tử có số chiều bằng nhau . Sau đó, k-means được áp dụng vào từng tập để phân các điểm dữ liệu trong từng tập thành $k$ cụm: <br>
$A^i: R^{d/m} \rightarrow \{1, 2, ..., k \}$ <br> 
Sau khi hoàn thành phân cụm, mỗi subvector được gán nhãn vào cụm mà nó được phân vào.
## 2.3. Quy tắc tạo ra tổ hợp các string tokens cho mỗi subvector
Việc encode được thực hiện dựa trên sự kết hợp giữa vị trí của subvector và nhãn của cụm mà nó được phân sau khi thực hiện k-means. Cụ thể: <br>
$\{"position1cluster\{A^1(x^1)\}", "position2cluster\{A^2(x^2)\}", ..., "position1cluster\{A^n(x^n)\}"\}$ <br>
<br> <br>
Toàn bộ ý tưởng việc encode được mô tả trong hình dưới dây. Sự đánh đổi giữa thời gian truy vấn và độ chính xác được điều chỉnh bởi 2 tham số $k$ và $m$ . Với $m$ và $k$ lớn, những kết quả trả về có tính chính xác cao hơn, đi cùng đó là thời gian encode và truy vấn tăng, và ngược lại.
![](https://images.viblo.asia/2e9e53e6-77c9-4359-8fdd-ff19658d4aa3.png) <br>
<b>Mô tả của phương pháp encode subvector-wise clustering:</b>
Vector  được chia thành subvectors. Các subvector ở cùng vị trí được xét cùng nhau và thực hiện phân cụm dựa trên thuật toán k-means. Sau đó subvector được encode thành chuỗi ký tự bằng việc kết hợp vị trí của nó trong  và nhãn của cụm mà nó được phân vào. Nhờ đó  chuỗi ký tự được sinh ra.

## Danh mục tài liệu tham khảo:
1. Mu, Cun, et al. "Towards practical visual search engine within elasticsearch." arXiv preprint arXiv:1806.08896 (2018).