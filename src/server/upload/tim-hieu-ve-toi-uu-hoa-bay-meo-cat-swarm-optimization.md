## Giới Thiệu Về Tối Ưu Hóa Bầy Mèo
Xin chào, có lẽ đây là bài viết khá dài dòng của tôi vì giải thuật này khá nhiều lý thuyết cô đọng và khá trừu tượng về lũ *mèo ngáo* :D. Bạn có thể đọc lượt nhanh đến phần **bài toán áp dụng** của tôi để thực hành.  Nhưng đừng lướt nhanh quá sẽ khó hiểu đấy :D!
### Sơ Lược Về Tối Ưu Hóa Bầy Mèo
**Tối ưu hóa (Optimization)** là quá trình lựa chọn giải pháp tối ưu cho một vấn đề nhất định trong số nhiều giải pháp thay thế. Một vấn đề quan trọng của quá trình này là không gian tìm kiếm rộng lớn đối với nhiều vấn đề trong cuộc sống thực, trong đó việc kiểm tra tất cả các giải pháp trong một thời gian hợp lý là không khả thi. Các thuật toán lấy cảm hứng từ thiên nhiên là các phương pháp ngẫu nhiên, được thiết kế để giải quyết các loại vấn đề tối ưu hóa này. Người nghiên cứu thường tích hợp một số kỹ thuật xác định và ngẫu nhiên với nhau và sau đó so sánh lặp đi lặp lại một số giải pháp cho đến khi tìm được giải pháp ưng ý. 

1. Tối ưu hóa bầy mèo (Cat Swarm Optimization) được giới thiệu bởi nhóm tác giả **S. C. Chu, P. W. Tsai, and J. S. Pan** vào năm 2006 [1].
1. Giải thuật mô phỏng lại hành vi của mèo trong quá trình tìm kiếm giải pháp tối ưu trong không gian.
1. Giải thuật tìm kiếm **nghiệm tối ưu** trong *không gian lồi (hoặc lõm)* sao cho *tiệm cận* đến **nghiệm tốt nhất**. 

![2](https://images.viblo.asia/3740be4c-b03f-44b1-b448-203fb5074c03.jpg)

### Ứng Dụng Của Tối Ưu Hóa Bầy Mèo
Các ứng dụng của thuật toán tối ưu hóa bầy mèo, được phân thành bảy nhóm, cụ thể là kỹ thuật điện (electrical engineering), thị giác máy tính (computer vision), xử lý tín hiệu (signal processing), quản lý hệ thống và tối ưu hóa tổ hợp (system management and combinatorial optimization), mạng không dây và WSN (wireless and WSN), kỹ thuật dầu khí (petroleum engineering) và kỹ thuật dân dụng (civil engineering).
1.	Kỹ thuật điện: thuật toán CSO đã được ứng dụng rộng rãi trong lĩnh vực kỹ thuật điện. Hwang và cộng sự. áp dụng cả thuật toán CSO và PSO (particle swarm optimization) trên hệ thống thanh toán tiền điện nhằm giảm thiểu chi phí tiền điện cho khách hàng. Kết quả chỉ ra rằng CSO hiệu quả hơn và nhanh hơn PSO trong việc tìm ra giải pháp tốt nhất toàn cầu, ...v.v.v.
2.	Thị giác máy tính: nhận dạng cảm xúc trên khuôn mặt là một cách tiếp cận sinh trắc học để xác định cảm xúc của con người và phân loại chúng cho phù hợp. Lin và cộng sự và Wang và Wu đã đề xuất một hệ thống phản ứng trong lớp học bằng cách kết hợp thuật toán CSO với SVM (support vector machine) để phân loại nét mặt của học sinh, ...v.v.v.
3.	Xử lý tín hiệu: Bộ lọc IIR là viết tắt của đáp ứng xung vô hạn. IIR là một bộ lọc thời gian rời rạc, có ứng dụng trong xử lý tín hiệu và giao tiếp. Panda và cộng sự đã sử dụng thuật toán CSO để nhận dạng hệ thống IIR, Al-Asadi kết hợp Thuật toán CSO với SVM để phân loại tín hiệu điện tâm đồ, …v.v.v.
4.	Quản lý hệ thống và tối ưu hóa tổ hợp: Pratiwi đã tạo ra một hệ thống hybrid bằng cách kết hợp thuật toán CSO và thuật toán tìm kiếm quạ (crows swarm) và sau đó sử dụng nó để giải quyết vấn đề định tuyến phương tiện với các cửa sổ thời gian (VRPTW). Naem và cộng sự đã đề xuất một hệ thống dựa trên mô-đun bằng cách kết hợp thuật toán CSO với kỹ thuật phân cụm trung vị K để phát hiện cộng đồng chồng chéo trong mạng xã hội, …v.v.v.
5.	Mạng không dây và WSN: Trong bối cảnh của WSN là giảm thiểu tổng điện năng tiêu thụ trong khi vẫn đáp ứng các tiêu chí hiệu suất. Vì vậy, Tsiflikiotis và Goudos đã giải quyết vấn đề này được gọi là vấn đề phân bổ công suất tối ưu. Pushpalatha và Kousalya đã áp dụng CSO trong WSN để tối ưu hóa lựa chọn đầu cụm giúp tiết kiệm năng lượng và băng thông khả dụng, …v.v.v.
6.	Kỹ thuật dầu khí: Thuật toán CSO cũng đã được áp dụng trong lĩnh vực kỹ thuật dầu khí. Ví dụ, CSO đã được sử dụng như một phương pháp tối ưu hóa vị trí tốt bởi Chen và cộng sự, …v.v.v.
7.	Công trình dân dụng: Ghadim và cộng sự. đã sử dụng thuật toán CSO để tạo ra một mô hình nhận dạng phát hiện các vết nứt sớm trong kết cấu công trình,…v.v.v.

![3](https://images.viblo.asia/393b584c-61ec-4e7f-9c4f-059cb5fc5780.jpg)

## Nội Dung Của Tối Ưu Bầy Mèo
### Hành Vi Của Mèo
Theo phân loại sinh học, có khoảng 32 loài khác nhau thuộc sinh vật trong họ mèo, ví dụ như sư tử, hổ, báo, mèo, v.v. Mặc dù chúng có cách sống khác nhau về môi trường, nhưng vẫn có nhiều hành vi đồng thời tồn tại ở hầu hết các loài mèo. Mặc dù kỹ năng săn mồi không phải bẩm sinh đối với mèo nhưng mèo có thể được huấn luyện để có được. Đối với những *con mèo hoang dã*, kỹ năng săn bắn đảm bảo sự sống còn của chủng tộc của chúng nhưng đối với *con mèo nhà*, nó thể hiện bản năng tự nhiên là tò mò mạnh mẽ về bất kỳ vật chuyển động nào.Mặc dù tất cả các con mèo đều có tính tò mò mạnh mẽ, nhưng trong hầu hết các trường hợp, chúng không hoạt động. nếu bạn dành một chút thời gian để *quan sát* sự tồn tại của mèo, bạn có thể dễ dàng nhận thấy rằng những con mèo dành phần lớn thời gian để *nghỉ ngơi*. Tính cảnh giác của loài mèo rất cao, chúng luôn cảnh giác ngay cả khi chúng đang nghỉ ngơi. Vì vậy, bạn có thể đơn giản thấy rằng những con mèo thường trông lười biếng, nằm đâu đó nhưng **chúng lại mở to mắt nhìn xung quanh**. Đó là lúc, chúng đang quan sát môi trường để **tìm kiếm giải pháp**. Trông chúng có vẻ lười biếng, nhưng thực ra mèo rất *thông minh và có chủ kiến*.
Tối ưu hóa bầy mèo bao gồm *2 chế độ*, đó là **chế độ theo dõi (seeking mode)** và **tìm kiếm (tracking mode)**. Mỗi con mèo đại diện cho *một tập hợp giải pháp*, có **vị trí (position)**, **giá trị năng lực (fitness value)** và **một lá cờ riêng (flag)**.

Trong đó:
* Vị trí : là vector M chiều, mỗi chiều đều có vận tốc (velocity) riêng.
* Giá trị năng lực: Giải pháp của con mèo cho vấn đề.
* Lá cờ: Xác định mèo đang ở chế độ theo dõi hay tìm kiếm.

Do đó, trước tiên chúng ta nên chỉ định có bao nhiêu con mèo nên tham gia vào quá trình lặp và chạy chúng thông qua thuật toán. Con mèo tốt nhất trong mỗi lần lặp được lưu vào bộ nhớ và con mèo ở lần lặp cuối cùng sẽ đại diện cho giải pháp cuối cùng.

### Chế độ theo dõi (seeking mode)
Trong **chế độ theo dõi**, xác định 4 yếu tố cần thiết: tìm kiếm nhóm bộ nhớ (Seeking Memory Pool), tìm kiếm phạm vi của đã chọn (Seeking Range of the selected Dimension), số lượng nguyên cần thay đổi (Counts of Dimension to Change) và tự xem xét vị trí hiện tại (Self-Position Considering).
* **SMP** được sử dụng để xác định kích thước tìm kiếm trí nhớ cho mỗi con mèo, cho biết điểm mà con mèo tìm kiếm. Con mèo sẽ chọn một điểm từ nhóm ký ức theo đối với các quy tắc được mô tả sau.
* **SRD** khai báo tỷ lệ thay đổi cho các kích thước đã chọn. Trong chế độ tìm kiếm, nếu thứ nguyên được chọn để thay đổi, sự khác biệt giữa giá trị mới và giá trị cũsẽ không nằm ngoài phạm vi do SRD xác định.
* **CDC** tiết lộ có bao nhiêu kích thước sẽ thay đổi. Những yếu tố này đều đang chơivai trò quan trọng trong chế độ tìm kiếm.
* **SPC** là một biến Boolean, biến này quyết định xem điểm, nơi con mèo đang ở đâu sẵn sàng đứng, sẽ là một trong những ứng cử viên để chuyển đến. Không quan trọng giá trị của SPC là đúng hay sai thì giá trị của SMP sẽ không bị ảnh hưởng. 

Cách thức hoạt động của chế độ tìm kiếm có thể được mô tả trong *5 bước* như sau:
1. Tạo bản sao j của vị trí hiện tại của $cat_k$ , trong đó j = SMP. Nếu giá trị của SPC là true, đặt j = (SMP-1), sau đó giữ nguyên vị trí hiện tại là một trong các ứng cử viên.
1. Đối với mỗi bản sao, theo CDC, ngẫu nhiên cộng hoặc trừ phần trăm SRD củacác giá trị hiện tại và thay thế các giá trị cũ.
1. Tính giá trị thể lực ( FS ) của tất cả các điểm ứng viên.
1. Nếu tất cả FS không chính xác bằng nhau, hãy tính xác suất lựa chọn của mỗi điểm ứng cử viên theo phương trình (1), nếu không hãy đặt tất cả xác suất lựa chọn của mỗi ứng viên là 1 điểm.
1. Chọn ngẫu nhiên điểm để chuyển đến từ các điểm ứng viên và thay thế vị trị của $Cat_k$
$$
P_{i} = \frac{|FS_{i} - FS_{b}|}{FS_{max} - FS_{min}} , where (0 <i< j)  (1)
$$
Nếu mục tiêu của hàm năng lực (function fitness) là tìm nghiệm nhỏ nhất thì $FS_{b} = FS_{max}$ hoặc $FS_{b}= FS_{min}$.

![4](https://images.viblo.asia/c695f611-58bf-49b8-9a62-967b142fbdd3.jpg)

### Chế độ tìm kiếm (tracking mode)
Tiếp đó, **chế độ tìm kiếm** là mô hình phụ để mô hình hóa trường hợp của con mèo trong việc truy tìm một số giải pháp con. Khi một con mèo chuyển sang chế độ lần theo dấu vết, mèo sẽ di chuyển theo vận tốc riêng. Hoạt động của chế độ theo dõi có thể được mô tả trong 3 bước như sau:
1. Cập nhật vận tốc cho mọi thứ nguyên ( $V_ {(k,d)}$ ) theo **phương trình (2)**.
1. Kiểm tra xem các vận tốc có nằm trong khoảng của vận tốc cực đại hay không. Trong trường hợp vận tốc mới vượt quá phạm vi, hãy đặt nó bằng giới hạn.
1. Cập nhật vị trí của $Cat _ k$ theo **phương trình (3)**.

$$
v_{(k,d)} =  v_{(k,d)} + r_{1} × c_{1} × (x_{(best,d)} - x_{(k,d)} ) , where (d=1,2,3…M) (2)
$$
$$
x_ {(k,d)} = x_{(k,d)} + v_{(k,d)}  (3)
$$
Trong đó:
* 	$x_{(best,d)}$ là vị trí của con mèo có giá trị FS tốt nhất.
* 	$x_{(k,d)}$ là vị trí của mèo $cat_ k$
* 	$c_1$ và $r_1$ là giá trị ngẫu nhiên trong khoảng [0, 1]

![](https://images.viblo.asia/fdc1eeaf-cb00-4f0d-a9a8-16ce34904fb8.jpg)

### Quy trình của giải thuật
Như đã mô tả trong các phần trên, CSO bao gồm hai mô hình phụ, tìm kiếmchế độ và chế độ truy tìm. Để kết hợp hai chế độ vào thuật toán, chúng tôi xác định **tỷ lệ hỗn hợp (Mixture Ratio)** của chế độ tìm kiếm tham gia cùng với chế độ theo dõi. Bằng cách quan sát các hành vi của mèo, chúng tôi nhận thấy rằng mèo dành một phần thời gian khihọ đang thức khi nghỉ ngơi. Trong khi nghỉ ngơi, họ di chuyển vị trí cẩn thận và từ từ, đôi khi thậm chí giữ nguyên vị trí ban đầu. Bằng cách nào đó, để áp dụng điều này hành vi của CSO, chúng tôi sử dụng chế độ tìm kiếm để thể hiện nó.
Hành vi chạy theo mục tiêu của mèo được áp dụng cho chế độ truy tìm. Do đó, nó rất rõ ràng rằng MR phải là một giá trị nhỏ để đảm bảo rằng mèo chi tiêu hầu hết thời gian trong chế độ tìm kiếm, giống như thế giới thực. Quy trình của CSO có thể được mô tả theo 6 bước như sau:
1. 	Tạo N con mèo trong quá trình này.
1. 	Rắc ngẫu nhiên những con mèo vào không gian giải pháp M chiều và chọn độc lập các giá trị nằm trong phạm vi của vận tốc tối đa đến vận tốc của mỗi con mèo. Sau đó, chọn một cách ngẫu nhiên số lượng mèo và đặt chúng vào chế độ truy tìm theo MR và các chế độ khác được đặt thành chế độ tìm kiếm.
1. 	Đánh giá giá trị năng lực *(fitness)* của từng con mèo bằng cách áp dụng các vị trí của mèo vào hàm năng lực *(fitness function)*, đại diện cho tiêu chí mục tiêu của chúng tôi và giữ con mèo tốt nhất vào trí nhớ. Lưu ý rằng chúng ta chỉ cần nhớ vị trí của con mèo tốt nhất ($x_{best}$) do nó đại diện cho giải pháp tốt nhất cho đến nay.
1. 	Di chuyển mèo theo cờ của chúng, nếu mèo k đang ở chế độ tìm kiếm, hãy áp dụng mèo vào quy trình chế độ tìm kiếm, nếu không thì áp dụng nó cho chế độ truy tìm quá trình. Các bước quy trình được trình bày ở trên.
1. 	Chọn lại số lượng mèo và đặt chúng vào chế độ theo dõi theo MR, sau đó đặt những con mèo khác vào chế độ tìm kiếm.
1. Kiểm tra điều kiện kết thúc, nếu hài lòng, chấm dứt chương trình và nếu không, lặp lại bước 3 đến bước 5.
![](https://images.viblo.asia/c04d5d84-8c25-4e94-8062-ade9210ec2c7.png)

## Bài Toán Áp Dụng
### Mô tả bài toán
Bài toán tìm điểm trung chuyển đặt làm kho chứa hàng giữa các điểm nhận hàng được biểu diễn trên mặt phẳng $O_{xy}$. Thỏa mãn yêu cầu là điểm trung chuyển tiết kiệm chi phí di chuyển nhất.

H1: Mô tả điểm trung chuyển giả định và các điểm giao hàng
![](https://images.viblo.asia/1fafd7dd-faac-4c46-a3f8-84560319d08b.png)
### Phương pháp thực hiện

Ta sẽ chọn ngẫu nhiên các điểm dựa theo số lượng mèo trên mặt  $O_{xy}$ , sau đó sẽ tính toán các điểm mèo có đi đến khi mèo ở chế độ theo dõi. Tính toán FS của mỗi điểm có thể đi đến sau đó lựa chọn phương án tốt nhất. Cuối cùng là cập nhập lại vị trí của con mèo ở chế độ tìm kiếm. Phân bổ lại các vị trí có thể đi đến mới ở chế độ theo dõi và kiểm tra đã thỏa mãi được kỳ vọng chưa. Nếu thỏa mãi thì kết thúc ngược lại thì tiếp tục.

H2: Mô tả chế độ theo dõi
![](https://images.viblo.asia/c50c2080-416d-4d1f-9883-d1aceedb0378.png)

H3: Mô tả chế độ tìm kiếm
![](https://images.viblo.asia/c04050ce-6770-415e-98f1-02b85086533a.png)

Quy trình xử lý được mô tả qua **7 bước** sau:
1. Khởi tạo ngẫu nhiên $N_{cat}$ . Mỗi con mèo tượng trưng cho 1 bộ giải pháp.
1. Khởi tạo các vị trí ngẫu nhiên ở trạng thái theo dõi (Seeking mode).
1. Tính toán $FS_i$ ở trạng thái tìm kiếm (Tracking mode) theo **phương trình (2**).
1. Cập nhập vị trí con mèo với giá trị mới là $x_{best}$ và $y_{best}$ dựa trên tính toán $Maximum(FS_{i})$.
1. Đánh giá kỳ vọng, nếu thỏa mãi thì lưu trạng thái của $Cat_k$ ngược lại thì lặp lại **Bước 2**.
1. Tính $FS_{max}$ của $N_{cat}$ và đưa ra thông báo kết quả.
1. Kết thúc.
$$
TotalDistance = \sum_{\mathclap{1\le i\le n}} D_{Cat_k, i} (1)
$$
$$
FS_i= α ×  \frac{TotalDistance}{N}+ β ×N (2)
$$
Trong đó:
* 	α,β là 2 hệ số ngẫu nhiên.
* 	N là số điểm nhận hàng.
* 	TotalDistance là tổng số khoảng cách từ vị trí mèo đến các điểm nhận hàng theo **phương trình (1)**.

H4: Mô tả kết quả tìm kiếm 1 lần
![](https://images.viblo.asia/8bc8c243-a7aa-4be8-aebc-5dd20681ce1d.png)

H5: Mô tả kết quả 10 lần 
![](https://images.viblo.asia/d240de7a-50ae-4b90-a525-31efff6fb5ed.png)

**Ghi chú:** tham khảo toàn bộ mã nguồn bằng python ở [github](https://github.com/DoManhQuang/datasciencecoban/tree/master/source/cat-swarm-optimization).

### Nhận xét

Tối ưu hóa bầy mèo (CSO) là giải pháp tối ưu kết quả tìm kiếm trong không gian trạng thái. Kết quả của giải pháp **đa số là tối ưu** trong tất cả các trường hợp vì nghiệm của giải pháp luôn *tiệm cận giá trị* được cho là *tốt nhất*. Kết quả nghiệm cũng phụ thuộc vào các lần thả ngẫu nhiên nên ta thấy *cùng một dữ liệu đầu vào* nhưng lại có nhiều kết quả **khác nhau**.

| Ưu điểm| Nhược điểm |
| -------- | -------- |
| Giúp tìm kiếm nhanh ra nghiệm tối ưu cho vấn đề cần giải quyết.| Kết quả đưa ra có thể không phải là phương án tốt nhất.|
|Đa số là đưa ra kết quả tốt. |Vẫn có tỷ lệ kết quả xấu do việc lựa chọn ngẫu nhiên.|
|Áp dụng trong đa lĩnh vực cần tìm giải pháp tối ưu do thời gian tìm kiếm giải pháp tốt nhất là quá lâu.|Cùng một đầu vào dữ liệu nhưng có thể đưa ra nhiều kết quả khác nhau.|
|**Yêu thương lũ mèo ngáo :D**.||

## Tài Liệu Tham Khảo

[1].	S. C. Chu, P. W. Tsai, and J. S. Pan, “Cat swarm optimization,” in Proceedings of the Pacific Rim International Conference on Artificial Intelligence, pp. 854–858, Springer, Guilin, China, August 2006.

[2].	V. Snasel, L. Kong, P. Tsai, and J. S. Pan, “Sink node placement strategies based on cat swarm optimization algorithm,” Journal of Network Intelligence, vol. 1, no. 2, pp. 52–60, 2016.

[3].	Aram M. Ahmed, Tarik A. Rashid and Soran Ab. M. Saeed, “Cat Swarm Optimization Algorithm: A Survey and Performance Evaluation”, Hindawi Computational Intelligence and Neuroscience Volume 2020.