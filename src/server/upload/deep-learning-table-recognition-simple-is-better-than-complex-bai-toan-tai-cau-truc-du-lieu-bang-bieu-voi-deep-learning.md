Các phần nội dung chính sẽ được đề cập trong bài blog lần này
- Tổng quan về Document Understanding và ứng dụng
- Giới thiệu và bài toán Table Recognition
- Các phương pháp SOTA hiện tại cho Table Recognition
- Các nhược điểm, hạn chế của các phương pháp hiện tại
- Giới thiệu pipeline và phương pháp cho bài toán Table Recognition
- Kết quả thu được
- Đánh giá và cải thiện
- Kết luận

---

Kết quả thu được với bài toán tái cấu trúc lại thông tin từ bảng biểu, từ trên xuống dưới:
- __Ảnh đầu vào__

| Column 1 | Column 2 |
| -------- | -------- |
| ![Imgur](https://i.imgur.com/TDyTNN7.jpg)  ![Imgur](https://i.imgur.com/W8KG3ta.jpg)| ![Imgur](https://i.imgur.com/BU6txGP.jpg) |

- __Ảnh table đã được nhận diện chính xác các cell của bảng__

| Column 1 | Column 2 |
| -------- | -------- |
| ![Imgur](https://i.imgur.com/JrncMde.jpg) ![Imgur](https://i.imgur.com/ZvHeexN.jpg)| ![Imgur](https://i.imgur.com/bNIdy8g.jpg) |

- __Chuyển dạng bảng đã nhận diện được vào file excel, kèm theo các nội dung tương ứng với từng cell__

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| ![Imgur](https://i.imgur.com/uUjRf7h.png) | ![Imgur](https://i.imgur.com/g5wyM43.png) | ![Imgur](https://i.imgur.com/Bo1wlqX.png) |

- Phần dữ liệu trên tập __PubTable__ mình đã tiền xử lý và tự tạo để train model sẽ được cập nhật sau tại repo: __[Table_Recognition_solution](https://github.com/huyhoang17/Table_Recognition_solution)__

# Tổng quan về Document Understanding và ứng dụng

- Mình sẽ đề cập kĩ hơn về các __baseline models__ mình sử dụng bên dưới.

- __Document Understanding__ là 1 topic research rất rộng, bao gồm nhiều bài toán con bên trong, là quá trình sử dụng AI hay các công cụ RPA (Robot Process Automation) để tự động hóa quá trình phân loại, tìm kiếm, nhận dạng và trích rút thông tin từ 1 loại văn bản (document) bất kì nào đó. Hoạt động được trên các loại văn bản có cấu trúc như: giấy CMND, giấy khai sinh,... hay các loại văn bản phi cấu trúc, phức tạp hơn như: hóa đơn, bảng biểu,...

- 1 số các topic trong Document Understanding như:
    - __Key information extraction__: xác định, phân loại và trích rút các trường thông tin trong loại văn bản, ví dụ trích rút thông tin địa chỉ, tổng giá tiền trong hóa đơn
    - __Document Layout Analysis__: xác định vị trí và thể loại của từng vùng đối tượng trên ảnh, ví dụ xác định các vùng: text, paragraph, title, table, image
    - __Optical Character Recognition__: nhận dạng kí tự quang học, là bài toán phổ biến nhất, xác định vị trí và nhận diện text trong ảnh
    - __Visual Document Question Answering__: trả lời câu hỏi dựa trên input là ảnh và câu truy vấn
    - __Table Recognition & Understanding__: tái cấu trúc bố cục và trích rút thông tin từ bảng biểu
    - __Multi-model Document Understanding__: sử dụng đa dạng và kết hợp các loại thông tin từ ảnh, text, layout, position cho các bài toán xử lý văn bản nhất định 
    - ......

- Các bạn có thể tham khảo thêm tại các nguồn tài liệu sau:
    - [awesome-document-understanding](https://github.com/tstanislawek/awesome-document-understanding)
    - [Bài toán trích rút thông tin từ hóa đơn với Graph Convolution Network](https://viblo.asia/p/djeZ1yPGZWz)

# Sơ lược về table recognition

- Định nghĩa bài toán: là bài toán phát hiện, nhận dạng, trích rút thông tin và lưu giữ chính xác bố cục và hình thái của bảng biểu, từ đó có thể lưu trữ các thông tin dạng bảng biểu dưới các format có thể chỉnh sửa được như Docx, Excel,... Là bài toán có tính ứng dụng cao trong việc số hóa văn bản, chỉnh sửa, tìm kiếm và truy vấn các tài liệu. Trong thời gian gần đây mới nhận được sự quan tâm nhiều hơn từ cộng đồng nghiên cứu, nhiều SOTA model và solution được công bố hơn.

- Các bài toán con điển hình về dữ liệu bảng (table):
    - __Table Detection__ (TD): xác định vị trí bảng trong ảnh
    - __Table Structure Recognition__ (TSR): nhận diện, tái cấu trúc và lưu giữ thông tin vị trí tương đối (relative position) của các cell (ô chứa nội dung) trong bảng
    - __Table Recognition__ (TR): tương tự như TSR, nhưng bao gồm cả việc đọc thông tin, nhận dạng kí tự trên bảng và ánh xạ chính xác vào từng cell trong bảng
    - __Table Understanding__ (TU): là bài toán khó nhất, khá đặc thù, liên quan đến việc trích rút thông tin từ bảng biểu, có thể dựa trên các thông tin input như ảnh bảng + câu truy vấn (table question answering),....

- Trong bài blog này, mình sẽ có đề cập tới 3 bài toán đầu, bài toán thứ 4 về Table Understanding sẽ không nói tại đây. 

- Để có thể thực hiện các bài toán về TSR và TR, chúng ta cùng định nghĩa 1 số đối tượng cơ bản trong bảng biểu trước, bao gồm:
    - __Table__: bảng
    - __Row, Column__: hàng, cột của bảng
    - __Grids__: đơn vị nhỏ nhất biểu diễn tọa độ trong bảng, chỉ thuộc 1 hàng và 1 cột nhất định
    - __Cells__: lớn hơn Grid, 1 cell có thể bao gồm nhiều Grid con (gọi là span-cell), hay chỉ có 1 Grid con thì là single-cell. Chứa thông tin vị trí và nội dung text bên trong cell đó
    - __Single-cells__: là cell, 1 cell ứng với 1 grid
    - __Spanning-cells__: là cell, 1 cell ứng với nhiều grid, tức hàng / cột được trải dài / rộng, bao phủ lên nhiều hàng / cột con khác
    - __Column Header cell__: là các cell thuộc phần header của bảng, phần title cho nội dung bên dưới
    - __Projected Row Header__: không phải header, nhưng là các dòng được kéo dài, có tác dụng như chỉ mục chia các phần nội dung
    - __Relative Position__: vị trí tương đối của các cell / grid trong bảng, biểu diễn bởi index 0,1,2,3,... gốc tọa độ trên top-left, gồm 4 thông số (start_row, end_row, start_column, end_column)
    - __Absolute Position__: vị trí chính xác của từng cell / grid trong bảng, giá trị trong đoạn [0, image_width/image_height], gốc tọa độ tại top-left, gồm 4 thông số (xywh) hoặc (xyxy)

- Để dễ hiểu hơn, hãy cùng nhìn hình minh họa bên dưới:
 
| Input image | 12 Grids | 9 Cells (2 span-cells) |
| -------- | -------- | -------- |
|  ![Imgur](https://i.imgur.com/LTIsguh.png)  | ![Imgur](https://i.imgur.com/PopSlDJ.png) | ![Imgur](https://i.imgur.com/MDktbmn.png)  |

- Mình tạm gọi các đường đỏ là các __đường phân tách hàng / cột__. Dễ thấy, nếu phân chia thành các grid thì bảng này bao gồm 4x3=12 ô grid nhỏ. Còn nếu hợp các grid của cùng 1 span-cell thì bao gồm 9 cells (2 span-cells và 7 single-cells). Với cách phân chia grid như vậy, ta có 1 table 4 hàng, 3 cột; các đường phân tách hàng có index là 0,1,2,3,4 (đường kẻ đỏ ngang và 2 biên trên dưới), các đường phân tách cột có index là 0,1,2,3 (đường kẻ đỏ dọc và 2 biên trái phải). Từ đó, ta xây dựng được các __relative position__ của từng cell bao gồm 4 thông số (start_row, end_row, start_col, end_col).

- Ví dụ: cell __`Australia`__ có relative position là (1, 3, 0, 1), cell __`Precipitation 2001-2005`__ có relative position là (0, 1, 0, 3), cell __`Queensland`__ có tọa độ (2, 3, 1, 2), tương tự với các cell khác,... Còn absolute position là vị trí chính xác, ví dụ (100, 100, 150, 120),...

- Các phần về __Column Header Cell__ và __Projected Row Header Cell__, các bạn có thể nhìn ảnh minh họa bên dưới (trong paper TableTransformer)

![Imgur](https://i.imgur.com/tpqwtgm.jpg)

- Ngoài ra, để phục vụ cho 2 bài toán quan trọng TSR và TR, phần bảng cũng được phân chia thành các loại bảng khác nhau:
    - __Full-border table__: là dạng bảng có các đường thẳng phân cách (border) rõ ràng giữa từng cell của bảng
    - __Borderless table__: bảng chỉ có 1 số ít đường thẳng phân cách, thường là giữa phần header và nội dung bên dưới
    - __No Border table__: bảng hoàn toàn không có đường phân cách, nhưng thường là các dạng bảng đơn giản, không chứa spanning-cells

- Hay ví dụ như cách phân loại trong tập dữ liệu [TNCR]( https://github.com/abdoelsayed2016/TNCR_Dataset), bảng được chia thành 5 loại:
    - __full-lined__: dạng full-border, không có spanning-cells

     ![Imgur](https://i.imgur.com/OgQPCEm.png)
    - __merged_cells__: dạng full-border, có ít nhất 1 spanning-cells

    ![Imgur](https://i.imgur.com/UNREFRM.png)
    - __partial_lined__: bảng chỉ có 1 vài đường line phân cách, không chứa spanning-cells

    ![Imgur](https://i.imgur.com/Jao63cZ.png)
    - __partial_lined_merged_cells__: tương tự như partial_lined, nhưng có spanning-cells

    ![Imgur](https://i.imgur.com/QgOh4Mc.png)
    - __nolines__: ngược lại với full_lined khi hoàn toàn không chứa đường line phân cách, có thể có spanning-cells

    ![Imgur](https://i.imgur.com/uCYBK8b.png)

- 1 số tập dữ liệu về TD, TSR và TR điển hình 

| Dataset | TD | TSR | TR | Number of sample | TSR Format |
| -------- | -------- | -------- | -------- | -------- | -------- |
| [TableBank](https://github.com/doc-analysis/TableBank)  | ✔️ | ✔️ | ❌ | 417K (TD), 144k (TSR)  | Table Detection, Table2HTML |
| [PubTabNet](https://developer.ibm.com/exchanges/data/all/pubtabnet/)  | ❌ | ✔️ | ✔️ | 568K  | Table2HTML |
| [FinTabNet](https://developer.ibm.com/exchanges/data/all/FinTabNet/)  | ❌ | ✔️ | ✔️ | 113K  | Table2HTML |
| [SciTSR](https://github.com/Academic-Hammer/SciTSR)  | ❌ | ✔️ | ✔️ | 15K  | Text bounding box, Relative cell position, Cell Adjacency Relation |
| [TIES_2.0](https://github.com/hassan-mahmood/TIES_DataGeneration)  | ❌ | ✔️ | ✔️ | Unbounded  | Synthetic data, table-type classification, Table Structure to HTML |
| [TabLex](https://drive.google.com/drive/folders/1l60XunwuTShRiJnTbmM8eloECNLXxEPp)  | ❌ | ✔️ | ✔️ | 1M+  | Structure information code, Content information code (similar to Table2HTML) |
| [PubTable](https://github.com/microsoft/table-transformer)  | ✔️ | ✔️ | ✔️ | 948K  | Structure recognition, functional analysis, text content & bbox location |
| ...   |   |   |  |  |

---

# Các phương pháp hiện tại cho Table Recognition

- Phần này mình sẽ review 1 số các phương pháp về TSR và TR nổi bật

### DeepDeSRT

![Imgur](https://i.imgur.com/0f2Sv8W.png)

- Sử dụng 1 mạng Object Detection (Fast-RCNN) để nhận diện hàng và cột của table. Phương pháp đơn giản. Sau khi đã có hàng/cột thì nhận diện cell, dựa vào tọa độ để tái cấu trúc bảng. Tuy nhiên, nhược điểm dễ thấy nhất là không xử lý được dạng bảng có spanning-cells

### TableNet

![Imgur](https://i.imgur.com/k7lJEa8.png)

- Sử dụng 1 model segment để phát hiện cả table và cột trong cùng 1 mạng. Nhược điểm cũng giống với phương pháp bên trên là không xử lý được với spanning-cells

### GraphTSR

- Là paper mình tiếp xúc và thử nghiệm đầu tiên khi làm bài toán TSR này. Ngoài phần model, trong paper cũng publish thêm tập dữ liệu SciTSR với 12k train và 3k test, chủ yếu là các scientific table trong paper. 

![Imgur](https://i.imgur.com/y1qwjss.png)

- Phần modeling được thiết kế theo dạng đồ thị (graph) và mô hình hóa với __Graph Neural Network__ (GNN). Các bạn có thể tham khảo bài blog sau của mình để hiểu hơn về GNN:
    - [Graph Neural Network - A literature review and applications](https://viblo.asia/p/6J3ZgP0qlmB)
    - [Bài toán trích rút thông tin từ hóa đơn với Graph Convolution Network](https://viblo.asia/p/djeZ1yPGZWz)

- Với GNN, các node trong mạng được biểu diễn là các bounding-box của chữ (text), ví dụ như hình thì các chữ như: Method, D1, D2, P, R, F1,... sẽ ứng với từng node (đỉnh) trong graph. Các cạnh của đồ thị chính là các đường nối các đỉnh. Paper mô hình hóa bài toán TSR dưới dạng 1 bài __Edge-classification__ (phân loại cạnh của đồ thị), tức với các đỉnh và cạnh đã có, ta sẽ xác định xem các cạnh vừa tạo sẽ thuộc 1 trong 3 label: 0 / 1 / 2 (0 là không có liên hệ, 1 ứng với đường xanh lá bên trên tức có mối liên hệ ngang, 2 ứng với đường đỏ tức có mối liên hệ dọc)

- Mối liên hệ ngang (đường xanh lá) tức 2 cell liền kề ứng với cạnh đó là thuộc cùng 1 dòng hoặc span-cell và các cell con của nó. Ví dụ như cell __`Method`__ là 1 row-span cell, sẽ có 2 đường nối tới 2 cell lân cận khác là __`D1`__ và __`P`__. Tương tự đối với mối liên hệ dọc (đường đỏ)

- Bằng việc xác định các mối liên hệ giữa từng cell (0 / 1 / 2) như vậy, ta có thể xác định được các span-cell và thực hiện tái cấu trúc bảng như hình mô tả trên. Với 1 row-span cell __`Method`__ gồm 2 dòng con và 2 column-span __`D1`__, __`D2`__ với 3 cột con (`P`, `R`, `F1`).

- Tuy nhiên, phương pháp này cũng tồn tại những hạn chế nhất định, mình sẽ đề cập kĩ hơn tại phần Section lớn bên dưới.

- Reference:
    - Paper: https://arxiv.org/abs/1908.04729
    - Github: https://github.com/Academic-Hammer/SciTSR

### Table2HTML

- Phương pháp này coi bài toán như 1 bài toán OCR, nhận dạng kí tự. Tuy nhiên, có tùy chỉnh thêm phần mô hình và output là dạng thẻ mã HTML. Để dễ hình dung, mình sẽ mô tả 1 phương pháp gần đây mình có thử nghiệm là [TableMASTER](https://arxiv.org/abs/2105.01848)

- Về phần model, __Table-MASTER__ được dựa trên model MASTER, là 1 model OCR (nhận dạng ký tự) dùng transformer. Tuy nhiên, nếu chỉ output ra các thẻ HTML string thì chỉ nhận biết được phần cấu trúc của bảng thôi (không có nội dung), không nhận biết được tọa độ các cell thì không có căn cứ để mapping phần nội dung vào từng cell tương ứng! Do đó, trong phần model của Table-MASTER có thiết kế thêm 1 nhánh nhỏ Transformer-layer nữa cho phần Bounding-box Regression, tương tự các model Object Detection, để xác định tọa độ bounding box của các cell (single-cell hoặc span-cell). Từ đó, tối ưu đồng thời cả 2 nhánh output của model

![Imgur](https://i.imgur.com/iidDZln.png)

- Model này sử dụng tập dữ liệu PubTabNet, gồm mã HTML chứa thông tin layout của bảng. Sau khi đã thực hiện pre-process, trong paper định nghĩa 39 classes như hình dưới. Các __`rowspan`__ hay __`colspan`__ chính là biểu thị các các span-row, span-column với số row/column con tương ứng.

![Imgur](https://i.imgur.com/yKok2BC.png)

- Hình mô tả với đầu ra bounding-box regression ứng với từng cell. 1 Cell chứa nhiều dòng, việc có thêm branch `Bounding-box Regression` để kết hợp với model text-line detection từ PSENet, giúp xác định 1 cell sẽ chứa các text-line nào. Sau đó, có 1 model Multilines text recognition để nhận dạng chữ. Việc xác định đó thì trong paper đề xuất 3 rule-based để mapping là: center-point, IoU, Distance Rule. Chi tiết về các rule các bạn có thể đọc thêm trong paper

![Imgur](https://i.imgur.com/ALrNB4Y.png)

- Đây cũng là phương pháp __đạt top2 leaderboard tại task B - Table Recognition của ICDAR 2021 competition__: [Task A + B](https://icdar2021.org/program-2/competitions/competition-on-scientific-literature-parsing). Về các solution khác tại cuộc thi, các bạn có thể tham khảo tại technical report sau: [ICDAR 2021 Competition on Scientific Literature Parsing](https://arxiv.org/abs/2106.14616)

- 1 tool khác cũng implement theo hướng Table2HTML là PaddleStructure từ PaddleOCR. Tuy nhiên, phần model có thiết kế nhỏ gọn lại với CNN-Seq2Seq-Attention, hiện tại support thêm các feature khác như Layout Analysis, export to editable format (Excel).

- Reference:
    - Paper: https://arxiv.org/abs/2105.01848
    - Github: https://github.com/JiaquanYe/TableMASTER-mmocr
    - PaddleStructure: https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.2/ppstructure/README.md

### Deep Split-Merge

- Đây là paper với phần modeling mình thấy khá độc đáo và chia nhỏ từng bước để tái cấu trúc mô hình. Về sau, phần model mình xây dựng cũng tham khảo dựa trên paper này và paper Split-Embed-Merge bên dưới. Đây là phương pháp được 1 đội trong ICDAR2021 áp dụng và giành vị trí __top7 chung cuộc__. Với Split-Merge, model bao gồm 2 model con là Split và Merge. Split-model có tác dụng dự đoán tất cả các __đường phân tách hàng / cột__ có trong bảng, tạo thành các __grid__ (như 1 số phần định nghĩa đối tượng bảng mình đã đề cập tại phần __Sơ lược__ bên trên), sau đó Merge-model dùng để dự đoán xem các grid gần nhau nào nên được hợp thành 1 span-cell lớn. Ví dụ như hình minh họa bên dưới, 3 grid ngang trên cùng liền kề nhau hợp thành 1 column-span cell (cell __`Precipitation 2001-2005`__), 2 grid dọc thẳng nhau hợp thành 1 row-span cell (cell __`Australia`__).

![Imgur](https://i.imgur.com/hYjRSMr.png)

- Với Split-model, hiểu đơn giản là model output ra 2 vector với độ dài lần lượt là W, H, cũng chính là kích thước ảnh crop-table, trong đoạn [0, 1]. Khi đó, mỗi số trên vector sẽ biểu thị khả năng có phải là 1 đường phân tách hay không, ví dụ với vector (0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0), thì sẽ có 2 vùng phân tách với độ rộng lần lượt là 3 và 2 pixel, chính là số __các vùng chỉ chứa số 1__ và số __số 1__ của từng vùng. 1 cách modeling bài toán khá độc đáo và model thiết kế xong cũng rất gọn nhẹ, chưa đến 1M params. Ví dụ minh họa ảnh mask được tạo từ ground-truth vector label của Split-model:

![Imgur](https://i.imgur.com/3KtRa4l.png)

- Về cách thức tạo ground-truth label cho Split-model như hình trên, mình sẽ mô tả kĩ hơn tại phần Pipeline bên dưới!

- Như vậy, sau khi đã xác định các vùng phân tách, ta có thể nhận biết được các grid trên table (4 hàng x 3 cột = 12 grids với table trên). Với Merge-model để xác định span-cell thì hơi khác 1 chút, model output ra 2 ma trận (1 cho xác định column-span cell, 1 cho row-span cell), giá trị trong đoạn [0, 1], với giá trị 1 biểu thị rằng 2 grid gần nhau cần được merge để tạo thành 1 span-cell mới

![Imgur](https://i.imgur.com/jd9oqH3.png)

- Ví dụ với grid 4x3 (M x N) đang có, ta sẽ có 2 ma trận ground-truth 2D là __gt_D__ cho row-span cell với size: (M - 1) x N = (3 x 3) và __gt_R__ cho column-span cell với size: M x (N - 1) = 4 x 2. Các bạn nhìn 2 ma trận gt với số 1 biểu thị rằng 1 phần các đường ngang/dọc màu đỏ cần xóa đi để tạo thành 1 span-cell, ví dụ với __gt_D__ chính là phần đường màu đỏ cắt ngang qua chữ __`Australia`__! Cuối cùng, khi có được các thông tin về tọa độ chính xác của các grid và xác định được các span-cell, ta hoàn toàn có thể thực hiện tái cấu trúc chính xác thông tin bảng!

- Reference:
    - Paper: https://ieeexplore.ieee.org/document/8977975
    - Unofficial code: https://github.com/fireae/Split_Merge_table_recognition

### Split-Embed-Merge

- Paper này cũng mới được publish gần đây, đạt __top 3 ICDAR2021 Competition__, __top 1 leaderboard với dạng bảng phức tạp (complex)__, liên quan khá nhiều đến paper Deep Split-Merge bên trên. Cũng với cách tiếp cận __chia để trị__, paper chia model thành 3 model nhỏ hơn, lần lượt là Split, Embed, Merge

![Imgur](https://i.imgur.com/NMbxxWo.png)

- __Split-model__ thì với chức năng tương tự như bên trên, dùng để xác định __các vùng phân tách hàng / cột__. Tuy nhiên, thay vì tiếp cận theo hướng output 2 vector, paper tiếp cận theo hướng segmentation, output là 2 ảnh mask tương ứng cho __hàng và cột phân tách__.

![Imgur](https://i.imgur.com/1HPQe7o.png)

- __Embed-model__ với grid đã xác định từ Split-model, sử dụng Roi-Align để extract feature từng vùng grid của ảnh, gọi là Vision Module. Đồng thời, Embed sử dụng thêm Text-Module với BERT làm feature extraction để trích rút thêm text feature. Sau đó, 2 phần module được kết hợp với nhau để làm input cho model thứ 3 là Merge, với giả định rằng việc dùng cả vision-feature và text-feature sẽ giúp model đạt độ chính xác cao hơn khi tái cấu trúc bảng. Và thực nghiệm trong paper cũng cho thấy điều đó!

- __Merge-model__ với ý tưởng cũng tương tự như Deep-Split-Merge. Tuy nhiên, phần modeling, paper sử dụng 1 GRU model với Attention, tại từng timestep có output là 1 merged-map MxN dimension (MxN là kích thước grid từ Split-model), biểu thị rằng tại timestep này, các grid nào cần được merge với nhau, biểu thị là 1, ngược lại là 0. Từ đó, thực hiện tái cấu trúc bảng tương tự Deep-Split-Merge.

![Imgur](https://i.imgur.com/4KMfYHO.png)

- Reference:
    - Paper: https://arxiv.org/abs/2107.05214

### LGPMA

- 1 phương pháp từ HikVision, 1 cty chuyên về camera AI, IoT và là phương pháp __đạt top1 leaderboard của ICDAR 2021 - Table Recognition__. Ngoài ra, team HikVion cũng giành luôn __top 1 tại task A về Document Layout Analysis__. Phần đánh giá cho TSR của ICDAR2021 thì dùng metric là TEDs, vì đánh giá cả phần cấu trúc và nhận diện nội dung bên trong bảng

![Imgur](https://i.imgur.com/wFucgVN.png)

- Top1-Davar-Lab-OCR là team từ HikVision, Top2-VCGroup là đội sử dụng phương pháp TableMASTER (Table2HTML), Top3-XM sử dụng model Split-Embed-Merge, đạt top1 trên dạng bảng complex. Top7-PaodingAI là đội sử dụng phương pháp đời đầu Deep-Split-Merge.

![Imgur](https://i.imgur.com/dDd0UYC.png)

- Phương pháp được xây dựng dựa trên Mask-RCNN, 1 model instance-segmentation, với đầu ra bao gồm cả bounding-box và mask segment. Model bao gồm 4 module chính: Aligned Bounding-box Detection, LPMA (local pyramid mask alignment), GPMA (global pyramid mask alignment) và Aligned Bounding-box Refinement.

- __Align Bounding-box Detection__ sử dụng các feature trích rút từ Roi-Align, gồm 2 nhánh đầu ra là bbox-classification và bbox-regression, tương tự như trong model của Mask-RCNN, dùng để nhận biết các non-empty cells. Tuy nhiên, phần nhận diện cell này cũng không dễ để xác định các cell, do dễ bị nhầm lẫn với các cell trống (empty-cells) khác. Do đó, paper đề xuất các module sau để alignment và refinement các proposed-cell đó.

- __LPMA__ gồm 2 nhánh con, 1 cho binary segmentation dùng để nhận biết các text region (vùng chứa chữ), 1 nhánh khác cho pyramid mask regression task để nhận diện 2 pyramid-mask của từng vùng text. Phần mask regression này thì trong paper có tham khảo từ 1 model text-detect là pyramid mask text detector, với việc dùng các soft-label segmentation, như việc tạo 2 mask với gradient giảm dần từ vùng trung tâm của text, xác định cho cả vertical mask và horizontal mask. Hình minh họa bên dưới:

![Imgur](https://i.imgur.com/zvl424X.png)

- __GPMA__ cũng là 1 module segmentation, với 2 module nhỏ hơn là Global segmentation và Global pyramid mask regression. Phần Global segmentation thì đơn giản là 1 binary segmentation module để nhận biết aligned-cells, bao gồm cả non-empty cells và empty-cells (khác với phần Align Bounding-box detection chỉ nhận diện non-empty cells). Phần Global pyramid mask regression dùng để nhận diện tất cả các non-empty cells trên chỉ với 2 output là horizontal pyramid mask và vertical pyramid mask, cũng tiến hành tạo soft-label segmentation như LPMA bên trên.

- Phần loss function của LGPMA khá "cồng kềnh", gồm nhiều thành phần:

![Imgur](https://i.imgur.com/304cjaG.png)

- Các loss RPN, CLS, BOX, MASK thì tương tự như model Mask-RCNN thông thường. LPMA-loss và GPMA-loss là pyramid label regression loss, tối ưu với pixel-wise L1 loss. SEG-loss là loss cho global binary segment của GPMA, sử dụng Dice-loss. Các hệ số lambda_1, lambda_2, lambda là các trọng số, trong phần thực nghiệm đều set = 1.

- Module cuối là Aligned Bounding-box Refinement dùng để tinh chỉnh lại phần nhận diện cell, bằng cách voting các vùng segment được tạo bởi các local-mask và global-mask của các module trước đó. Sau đó, phần post-process cũng bao gồm 3 module con là: Cell matching dùng để nhận biết các cell cùng hàng, cùng cột; Empty Cell Search dùng để xác định các empty-cells và Empty Cell Merging dùng để merge các empty-cell gần nhau.

![Imgur](https://i.imgur.com/Uwzj8Ww.png)

- 1 ảnh kết quả với việc cho thấy tác dụng của module refinement khi tinh chỉnh lại bbox location của từng cell cho chính xác!

- Có thể thấy mô hình này được thiết kế khá phức tạp và gồm nhiều module con bên trong, trích rút cả local và global feature rồi từ đó voting để refinement lại cấu trúc của bảng.

- Reference:
    - Paper: https://arxiv.org/abs/2105.06224
    - Github: https://github.com/hikopensource/DAVAR-Lab-OCR/tree/main/demo/table_recognition/lgpma

### TGRNet

- 1 phương pháp khác cũng modeling TSR dưới dạng __Graph Neural Network__. Bên cạnh đó, paper cũng publish 1 tập dữ liệu tương đối lớn, theo format train của TGRNet, gọi là TableGraph350K: 

![Imgur](https://i.imgur.com/rH3zRV3.png)

- Paper mô hình hóa bài toán với 2 module chính: __Cell spatial location__ và __Cell logical location prediction__. Phần module __Cell spatical location__ có tác dụng xác định vị trí các cell của table, hay cell bounding-box. Với backbone Resnet50-FPN, kết hợp cùng với 1 module Split-aggregation Module ngay sau để segment 3 đối tượng chính: background, cell và boundary (vùng phân chia). Sau đó, để tính toán vị trí các cell, paper dựa trên các vùng connected-component đã segment được để xác định các bounding-box của từng cell.

- Phần module __Cell logical location prediction__ có tác dụng dự đoán thêm vị trí tương đối (relative position) của các cell. Với các cell vừa nhận diện được, module này sử dụng Roi-Align để trích rút feature cho từng vùng. Tiếp đó, modeling bài toán với GCN và để thuận tiện thì chuyển bài toán sang dạng Ordinal Node classification, thay vì Regression, ví dụ với output của start_row là: (1, 1, 1, 0, 0, 0, 0) thì hiểu là cell có start_row là index 2 (trên tổng số 7 index từ 0->6); tương tự với 3 offset khác là end_row, start_column, end_column. Giả dụ với output offset là (start_row, end_row, start_column, end_column)=(1, 3, 0, 1), tức cell này trải dài từ dòng có index 1 ==> 3, cột có index 0 ==> 1, và là 1 row-span cell.

- Reference:
    - Paper: https://arxiv.org/abs/2106.10598
    - Github: https://github.com/xuewenyuan/TGRNet

### Table-Transformer

- Phương pháp gọi là __Table-Transformer__ được publish cùng với tập dữ liệu PubTable-1M, trong paper [PubTables-1M: Towards comprehensive table extraction from unstructured documents](https://arxiv.org/abs/2110.00061). Về phần dataset, paper đề cập tới việc xây dựng bộ dữ liệu từ XML file từ bộ corpus lớn PMCOA. Mặc dù không thể đảm bảo chính xác hoàn toàn 100% ground-truth label tạo ra là chính xác nhưng phần label nhiễu là ít, có thể chấp nhận được. Và quan trọng hơn đây là bộ dữ liệu về TSR lớn nhất từ trước đến nay, từ Microsoft, khoảng gần 1M ảnh (train + val + test) với 6 class, gấp đôi số lượng sample so với PubTabNet.

-  Về phần mô hình của PubTable sử dụng 1 model object detection theo dạng query-based là DETR để xác định vị trí các đối tượng. Trong paper, tác giả dùng tập data này cho 3 task: __Table Detection__, __Table Structure Recognition__ và __Table Functional Analysis__, ảnh mô tả như bên dưới:

![Imgur](https://i.imgur.com/tpqwtgm.jpg)

- __Table Detection__ là bài toán phát hiện bảng, trong paper thì tiếp cận theo hướng nhận biết và xác định 2 class: bảng thẳng và bảng bị xoay. __Table Structure Recognition__ là bài toán tái cấu trúc lại bảng, được định nghĩa bằng việc xác định các: dòng, cột và span-cell (ảnh giữa); từ đó có thể tái cấu trúc lại bảng chính xác dựa trên việc xác định phần giao nhau giữa các bbox của từng class. __Table Functional Analysis__ là việc xác định phần Column Header (có thể hiểu là tiêu đề của bảng) và projected-row-header cell (là các cell được kéo dài, như đề mục chia tách từng phần của bảng vậy). Có chú ý rằng, ground-truth bounding-box của từng đối tượng trong dataset này là dilated-bounding-box, tức các bbox đều được mở rộng đến __điểm chính giữa của vùng phân tách giữa các cell__, không có vùng trắng hay khoảng cách giữa chúng.

- Trong paper xây dựng 2 model: 1 model Table Detection với 2 class (bảng thẳng, bảng bị xoay ngược chiều kim đồng hồ), 1 model Detection khác gộp cả 2 task TSR và TFA. Phần data của PubTable thì không phải là dạng bảng đã crop như PubTabNet, trong phần model thứ 2 cũng định nghĩa thêm class là table, tức việc phát hiện ra cùng lúc 6 đối tượng, bao gồm: Table, Table Row, Table Column, Table Spanning Cells, Table Column Header, Projected Row Header Cell. Rồi sau đó, thực hiện các bước xử lý post-process cần thiết để thu được phần cấu trúc bảng tương ứng. Các bạn có thể crop lại ảnh cho sát dựa trên class __`table`__, rồi tương tự train model TSR với 5 class còn lại.

- Tại repo chính của paper mới chỉ cung cấp file weight (20 epochs) cho Table Detection model. Dưới đây là phần metric evaluation với mAP cho 2 task, rất cao và vượt trội hoàn toàn so với baseline là Faster-RCNN!

![Imgur](https://i.imgur.com/zELKMD8.png)

- Reference:
    - Paper: https://arxiv.org/abs/2110.00061
    - Github: https://github.com/microsoft/table-transformer
    - Dataset: https://msropendata.com/datasets/505fcbe3-1383-42b1-913a-f651b8b712d3

# Các nhược điểm, hạn chế của các phương pháp hiện tại

- Bên trên thì mình cũng đã giới thiệu tương đối nhiều các phương pháp về Table Structure Recognition. Mình cũng đã thử nghiệm 1 vài phương pháp trong số đó như: GraphTSR, Split-Merge, Table2HTML, LGPMA, Table-Transformer và nhận thấy 1 vài nhược điểm và hạn chế như sau:
    - Đầu tiên là về dữ liệu. Format dữ liệu của 1 số phương pháp không hề dễ tạo, ví dụ như dạng convert table sang HTML với phương pháp TableMASTER, việc tối ưu model cho ánh xạ (n-1) đã khó (vì nhiều bảng có thể có chung 1 format HTML) thì việc tạo thêm dữ liệu để finetune hoặc cách để tạo semi-label cũng cực kì khó và không khả thi.
    - Cách modeling bài toán quá đơn giản, chỉ giải quyết được với các dạng bảng đơn giản, không có span-cell như 2 phương pháp DeepDeSRT và TableNet
    - Cách modeling bài toán còn hạn chế, khó chuẩn bị dữ liệu và các giả định về dữ liệu đầu vào là không thực tế như với cách tiếp cận của GraphTSR.
    - Model nặng cồng kềnh, inference time lâu như với phương pháp TableMASTER mình có thử nghiệm thì với cách decoding là autogressive transformer khiến inference time rất chậm. Tất nhiên, có thể tùy chỉnh lại model cho đơn giản, ví dụ như model của PaddleStructure (chỉ dùng CNN-Seq2Seq-Attention), tuy nhiên vẫn gặp hạn chế lớn về phần dữ liệu, xử lý post-processing và khả năng mở rộng để cải tiến sau này!
    - Khó có 1 mô hình nào có thể xử lý tốt với nhiều loại bảng đa dạng (fullborder, borderless,...) . Các paper thường thử nghiệm trên tập 500K PubTabNet, có khoảng gần 1 nửa table là có span-cell, phần nhiều table là dạng borderless nên khi predict trên ảnh fullborder-table thông thường trong thực tế lại kém chính xác hơn.
    - Khó tổng quan khi test trên các bộ data thực tế. Ví dụ, trước mình có đi crawl các file PDF trên các trang web Việt Nam và thu được 1 bộ dữ liệu bảng scan của Việt Nam, đa phần là fullborder-table. Tuy nhiên khi áp dụng thử các phương pháp top1 (LGPMA), top2(Table2HTML, TableMASTER) leaderboard trên bộ test PubTabNet, tại ICDAR2021 Table Recognition, hay các phương pháp khác như Table-Transformer, Split-Merge,... thì các phương pháp đều dự đoán sai rất nhiều, tổng quan kém trên dữ liệu thực tế. Hay khi mình test trên các dữ liệu bảng borderless-table thực tế khác như bảng báo cáo tài chính, bảng điểm,... thì cũng nhận diện sai / thiếu cell nhiều.

- Từ đó, mình mới thiết kế pipeline hiện tại gồm nhiều model để cố gắng vẫn duy trì được độ chính xác và đạt độ tổng quan tốt trên dữ liệu thực tế. Phần pipeline như sau:

![Imgur](https://i.imgur.com/YPie6oe.png)

- Về từng phần mô hình sẽ được mình đề cập kĩ hơn bên dưới

---

# Giới thiệu pipeline cho bài toán Table Recognition

Các phần model và phương pháp được thực hiện:
- Table Detection
- Image Alignment
- Table-Type image classification
- Table Line segmentation
- Table Row / Column space segmentation
- Table Row / Column span segmentation
- Text Detection
- Text Recognition
- Table Reconstruction
- Export to editable format (Docx, Excel)
    
 ### Table Detection
 
 - Phần model này cũng khá dễ dàng thực hiện, vì các bộ dataset về Table Detection khá nhiều, có thể kể tới 1 số bộ dữ liệu như: 

| Dataset | Samples | Number of classes | Format | have TSR format | Note|
| -------- | -------- | -------- | -------- | -------- | -------- |
| [TableBank](https://github.com/doc-analysis/TableBank)     | 417K  | 1  | Image | Yes | TSR theo hướng image-based |
| [FinTabNet](https://developer.ibm.com/exchanges/data/all/FinTabNet/)     | 113K  | 1  | Image | Yes | TSR theo hướng image-based  | 
| [PubLayNet](https://github.com/ibm-aur-nlp/PubLayNet)     | 113K  | 5  | Image, PDF | No | Figure (image), table, text, title, list  |
| [PubTable](https://msropendata.com/datasets/505fcbe3-1383-42b1-913a-f651b8b712d3)     | ~1M  | 6  | Image | No | Table, Spanning-cells, Table-Row, Table-Column, Projected-Row-Header, Column Header  |
| [IIIT-AR-13K](http://cvit.iiit.ac.in/usodi/iiitar13k.php)     | 13K  | 5  | Image | No | Figure, table, image, logo, signature  |
| [TNCR](https://github.com/abdoelsayed2016/TNCR_Dataset)     | 9.5K  | 1  | Image | No | |
| ...   |   |   |  |  |

- Về việc chọn dataset cho bài toán Table Detection, ưu tiên chọn các tập dataset với lượng sample lớn, đa dạng với nhiều loại bảng. Bên cạnh đó, việc annotate thêm data cho model này cũng không khó, theo format của bài toán Object Detection và tùy loại dữ liệu, ví dụ thực hiện finetune trên các tập dữ liệu scan của Việt Nam.

- Phần model không quá nổi bật, vẫn là mô hình Object Detection để phát hiện table (figure, image,...) thông thường. Tuy nhiên, cần xem xét các hướng xử lý dữ liệu, ví dụ phân biệt các loại table: full-border, borderless, no-border table. Hoặc xây dựng 1 model detect table chung cho tất cả các loại bảng, rồi 1 model classify phía sau để hạn chế false-positive case.  Việc phân loại như vậy cũng ảnh hưởng tới hướng xử lý phần TSR về sau. Mỗi loại có thể sẽ cần hướng xử lý để reconstruct riêng, ví dụ loại full-border sẽ dễ xử lý hơn loại bảng borderless và no-border. Hay các loại bảng full-border nhưng có span-cell cũng sẽ khó xử lý hơn các bảng full-border đơn giản chỉ có single-cell!

- Với pipeline mình xây dựng thì model table detection được train trên bộ dữ liệu tổng hợp của nhiều bộ dataset lớn khác: TableBank, FinTabNet, PubLayNet, TNCR,... Model sẽ detect chung 1 class là bảng, chứ không chia nhỏ hơn, về sau sẽ có 1 model để phân loại loại của bảng (full-border table, borderless table).

### Table-Type image classification

- Table-Type image classification là model dùng để phân loại các loại bảng, đã được cắt ra sau phần Table Detection. Về hướng xử lý, sau 1 thời gian khá dài thử nghiệm về các phương pháp cho bài toán Table Recognition và nhận thấy sự đa dạng các loại bảng, mình có chia thành 2 loại bảng chính:
    - __Full-border table__: bảng với các phần nội dung được ngăn cách rõ ràng bởi các đường thẳng, bao gồm cả dạng bảng đơn giản không có span-cells và loại bảng có span-cells (span-cell tức cột hoặc dòng chứa nhiều cột con / dòng con khác)
    - __Borderless table__: tức dạng bảng chỉ có 1 ít hoặc hoàn toàn không có các đường thẳng dùng để phân tách nội dung. Ngoài ra, cũng có thể chia nhỏ hơn thành:
        - __Borderless no span-cells__: borderless không có span-cells
        - __Borderless with span-cells__: borderless có span-cells

- Về phần dữ liệu cho bài toán này, mình có tham khảo từ chính tập dataset [TNCR](https://github.com/abdoelsayed2016/TNCR_Dataset), bao gồm cả format cho Table Detection và Table-Type image classification. Trong paper của TNCR, table được chia thành 5 loại như mình đã đề cập ở trên.

- Sau khi thu được phần model cho Table-Type classification, tùy từng loại bảng sẽ được xử lý với pipeline riêng biệt, phục vụ cho phần Table Reconstruction sau này

### Table Line segmentation

- Table Line segmentation là phần model dùng để segment ra các đường phân tách giữa các cell của bảng. Ban đầu, phần model này được sử dụng cho riêng loại bảng Full-border Table, vì với loại này thì các cell hoàn toàn rõ ràng, kể cả single-cell và span-cell. Tuy nhiên, trong quá trình thực nghiệm, mình nhận thấy rằng, có nhiều trường hợp các đường line đó gây ảnh hưởng đến kết quả của mô hình phát hiện + nhận diện chữ (text detect + text recognize) sau này, có thể do đường line quá sát chữ dẫn tới đọc text bị sai. Do đó, mình cũng dùng model line segment này để loại bỏ các đường line đó đi, trước khi thực hiện OCR, phần nào cũng giúp cải thiện độ chính xác của text detect và text recognize.

- Phần dữ liệu này không có sẵn và nhiều như 2 model bên trên. Tuy nhiên, hoàn toàn có thể tự gen hoặc tổng hợp được. Trước đây, 1 người em của mình là [@buiquangmanh](https://viblo.asia/u/buiquangmanh), đã nghĩ ra cách dùng 1 tool có sẵn là [Camelot](https://github.com/camelot-dev/camelot) để tạo line-mask cho bảng, dựa trên file PDF, tuy nhiên tool này chỉ sử dụng được trên các file PDF "đẹp" (có metadata, ví dụ 1 file PDF các bạn có thể copy nội dung text bên trong đó), chứ không thực hiện được trên các file scanned-PDF hay ảnh chụp.

- Để thực hiện thì đầu tiên là đi crawl các file PDF đẹp hoặc các tập dữ liệu có chứa file PDF đẹp. Các nguồn dữ liệu PDF đẹp thì mình có đi crawl data ở 1 số trang web ở Việt Nam. Các nguồn dữ liệu có sẵn như: tập [SciTSR](https://github.com/Academic-Hammer/SciTSR), là 1 tập data về Table Structure Recognition theo hướng Graph-net, gồm 15k ảnh, ngoài ảnh ra thì còn cung cấp các file PDF đi kèm. Do đó, có thể dùng tool Camelot để lấy được các line của table rồi tạo mask cho model line-segmentation. Ngoài ra, với những dữ liệu bảng có được ở phần Table Detection, các bạn cũng có thể thực hiện annotate (mặc dù sẽ hơi tốn công 1 chút). Tool cho annotate dữ liệu thì mình hay dùng CVAT, support đủ các dạng format như Object Detection, Segmentation, Line Annotation,...

- Việc tiếp theo là code model-segment và thêm augment để tập dữ liệu được đa dạng. Ảnh minh họa với input và output của model segmentation:

| Input image | Mask output |
| -------- | -------- |
| ![Imgur](https://i.imgur.com/E9EvwK5.jpg) | ![Imgur](https://i.imgur.com/tgYAmiO.png)  |
| ![Imgur](https://i.imgur.com/4sNDCyL.jpg) | ![Imgur](https://i.imgur.com/U1dyYCg.png) |
| ![Imgur](https://i.imgur.com/lCy6aiI.jpg) | ![Imgur](https://i.imgur.com/M9TOTe5.png) |

###  Table Row/Column space segmentation

- Phần xử lý để nhận diện hàng, cột và span-cell của dạng __bảng borderless__ thì mình có kết hợp sử dụng 2 model segmentation, lần lượt gọi là __Row/Column space segmentation model__ và __Row/Column span segmentation model__. 

- Row/Column Space segmentation model có tác dụng như Split-model trong paper Split-Embed-Merge, mình tạm gọi là __Space-model__. Phần model này sẽ được xử lý để nhận diện __vùng phân tách các cell ứng với từng dòng / cột của bảng__. Mình đã có đề cập tại phần model __Split-Embed-Merge__ nhưng hãy cùng nhìn lại để hiểu rõ hơn về phần label segment này (để ảnh nhìn không bé quá thì mình để mỗi ảnh ví dụ là 2 dòng, lần lượt là row-space mask và column-space mask:

| Input image | Space mask |
| -------- | -------- |
| ![Imgur](https://i.imgur.com/J6UZRTU.png) |  |
| ![Imgur](https://i.imgur.com/3Cm7yk0.png) | ![Imgur](https://i.imgur.com/RRUl1Kg.png) |
| ![Imgur](https://i.imgur.com/SGroYsY.png) |  |
 ![Imgur](https://i.imgur.com/eurK4BH.png) | ![Imgur](https://i.imgur.com/4f3wJ4c.png) |
| ![Imgur](https://i.imgur.com/dWuc47L.png) |  |
![Imgur](https://i.imgur.com/2gBLxgu.png) | ![Imgur](https://i.imgur.com/pv5qqVh.png) |

- Có thể thấy, phần segment này mình không hướng đến việc segment dòng/cột của bảng, mà segment vùng ranh giới phân chia giữa từng dòng / cột, bao gồm cả dạng bảng đơn giản và có span-cells, sau đây mình sẽ tóm gọn lại là __vùng / đường phân tách dòng / cột__ của bảng. Với bảng có span-cells thì __đường phân chia__ sẽ được kéo dài ra, bất kể khi nào cần phân tách các cell của bảng.

- Vấn đề tiếp theo của phần model này là dữ liệu, vì không hề có dữ liệu cấu trúc như vậy ở các tập dataset về Table Structure Recognition. Tuy nhiên, mình cũng có tham khảo được việc tự tạo dữ liệu trong paper Split-Embed-Merge như sau:

![Imgur](https://i.imgur.com/TFbpUGN.png)

- Ta cần xác định được từng cell của bảng có __relative position__ như thế nào, được trải dài từ dòng A đến dòng B, và từ cột C đến cột D cụ thể nào đó mà mình đã đề cập tại phần __Sơ lược__ bên trên. Sau đó, kết hợp với thông tin bounding box của từng chữ (text) thì có thể dựa vào đó để tạo ảnh mask tương ứng, sao cho từng __vùng hàng / cột phân tách__ với diện tích tối đa, không cắt vào phần giữa của bất kì __non-spanning cells__ (hay single-cell) nào! Sau tất cả các bước đó, ta thu được 2 ảnh mask cho phân tách hàng và cột như các ảnh ví dụ bên trên.

- Ban đầu, mình sử dụng thông tin từ 2 tập dữ liệu là SciTSR (12k train) và PubTabNet (~500k train). Tập SciTSR khá nhỏ nên mình sẽ không đề cập tới. Còn với PubTabNet, label ban đầu của tập này chỉ cung cấp các thông tin như: mã HTML (không có content) ứng với layout của bảng, text bounding box và nội dung của nó; không có sẵn 2 mask segment mình có mô tả. Tuy nhiên, hoàn toàn có thể dựa vào các thông tin trên để tạo được phần ảnh mask tương ứng. Mã HTML bao gồm các thẻ __`<td>`__ và __`<tr>`__ cho hàng và cột, kèm theo các thông tin biểu thị rằng hàng cột đó có chứa span-cells hay không (các thuộc tính __`colspan`__, __`rowspan`__). Từ đó, xác định được các __relative position__ của từng cell, kết hợp với thông tin text-bbox đã có để tiến hành tạo được 2 mask tương ứng cho Space-model.

- Về sau, mình có biết tới tập dữ liệu __PubTable__ nữa, khoảng gần 1M ảnh (train/val/test). Tuy nhiên, format thì khác so với PubTabNet. Phần modeling trên format của PubTable, các bạn có thể tham khảo phương pháp Table-Transformer bên trên. Với tập dataset này, vì bounding-box của từng đối tượng đã có (6 classes), không phải convert từ HTML như bên PubTabNet nên việc xác định các relative-position của từng cell cũng dễ dàng hơn so với PubTabNet. Kết hợp với thông tin text-bbox đã có sẵn, ta có thể tạo ground-truth mask cho Space-model như hình dưới! 

- Phần model cho segmentation thì mọi người có thể tùy chọn model theo ý mình. Ngoài ra, cũng nên tham khảo việc thay đổi 1 số thông số của lớp Conv như hướng dẫn trong paper Split-Embed-Merge:

![Imgur](https://i.imgur.com/D40qapX.png)

- Ngoài ra, còn 1 bộ dữ liệu khác từ IBM là FinTabNet, tương tự như PubTabNet, gồm nhiều dạng bảng trông hiện đại với màu sắc hơn. Tuy nhiên, mình thấy phần gt của TSR hơi nhiễu nên không sử dụng thêm, còn cách sinh data từ tương tự PubTabNet, vì cũng đã cung cấp sẵn phần thẻ HTML cho layout và text-bbox.

- Sau khi tìm cách tạo được ground-truth label từ 3 tập dữ liệu SciTSR, PubTabNet và PubTable, mình thu được 1 bộ dữ liệu __khoảng gần 1,5 triệu ảnh__ để tiến hành training, với tỉ lệ convert thành công của PubTabNet là __98.87%__ (500K) và của PubTable là __99.94%__ (~1M). Ngoài ra, mình có thực hiện khá nhiều các cách augment khác nhau để làm đa dạng data và giúp model có khả năng tổng quan hóa (generalization) tốt hơn. Ngoài các augment cơ bản như: thay đổi Blur, GrayScale, Hue, Saturation, Brightness, Dropout, ... thì mình có tự định nghĩa thêm các phương thức khác như:
    - Vì mình có thông tin bbox của phần text nên có random "xóa trắng" 1 phần các ô, khiến bảng trống và nhận diện khó hơn, mình không xóa các cell thuộc cột đầu / dòng đầu.
    - Ghép chồng bảng theo chiều dọc hoặc chiều dài
    - Thay đổi màu của các hàng / cột so le nhau, vì trong thực tế các dạng bảng borderless thường dùng cách phân tách này khá nhiều
    - Random resize ảnh bảng theo 1 tỉ lệ (ví dụ từ 0.8->1.2), tránh skew quá.
    - [TabAug paper](https://arxiv.org/abs/2104.14237), augment table bằng cách Replication (nhân rộng) và Deletion (xóa) ngẫu nhiên các hàng / cột của bảng
    - .....


### Table Row/Column span segmentation

- Nhìn chung, phần model này tương tự như model Row/Column space segmentation, mình tạm gọi là __Span-model__. Tuy nhiên, model sẽ segment các pixel thuộc span-cells (row-span cell hoặc column-span cell), có tác dụng như Merge-model trong 2 paper Deep-Split-Merge và Split-Embed-Merge.

- Cũng giống như cách tạo dữ liệu cho Space-model, mình cũng sử dụng 3 tập dữ liệu là: SciTSR, PubTabNet, PubTable. Với phần model này, ta cũng hoàn toàn dựa vào các thông tin có sẵn của tập dữ liệu để tiến hành tạo 2 ảnh mask tương ứng, 1 mask cho row-span-cell, 1 mask cho column-span-cell. Dưới đây là 1 số ảnh ví dụ 2 mask được generate:

| Column-span mask | Row-span mask |
| -------- | -------- |
| ![Imgur](https://i.imgur.com/r1637Ki.png) | ![Imgur](https://i.imgur.com/v7R6yKB.png) |
| ![Imgur](https://i.imgur.com/42LdsR5.png) | ![Imgur](https://i.imgur.com/aJDjCed.png) |
| ![Imgur](https://i.imgur.com/J7NjzNt.png) | ![Imgur](https://i.imgur.com/Ao8NviX.png) |

- Ban đầu, mình có thực hiện train model này với 1 input là ảnh crop-table 3 kênh màu RGB. Tuy nhiên, thử nghiệm cho thấy rằng các vùng pixel segment rất dễ bị dính / giao với nhau giữa các row/column span-cell liên tiếp. Và với output mask như vậy thì rất khó xử lý post-processing thêm. Mình vẫn tham khảo hướng tiếp cận trong 2 paper là:
    - Deep-Split-Merge: với việc training Merge-model có sử dụng thêm thông tin là output từ Split-model.
    - Split-Embed-Merge: với việc tạo grid sau khi xử lý post-process từ output của Split-model, từ đó phần grid này sẽ được dùng làm thông tin cho 2 model sau là Embed và Merge

- Với model-span hiện tại, thay vì dùng input là 1 ảnh table RGB thông thường, mình nối thêm 2 channel khác chính là 2 mask output của Space-segment model bên trên, tạo thành 1 ảnh 5 channel làm input cho model Span-segment. Dễ thấy, với các __vùng phân tách dòng / cột__ đã xác định được, model span sẽ dễ dàng xác định các span-cell hơn và hạn chế việc vùng segment bị dính / giao với nhau. Nó có tác dụng như đường biên để hạn chế các vùng lem pixel không chính xác. Thực nghiệm cho thấy rằng, với cách làm này, điểm mIOU của model tăng khoảng 15%, 1 khoảng cách rất lớn!

- 1 số kết quả từ Space-model và Span-model:

| Input image | Span mask |
| -------- | -------- |
| ![Imgur](https://i.imgur.com/9FW1scD.png) |  |
| ![Imgur](https://i.imgur.com/ZFwFW3I.png) | ![Imgur](https://i.imgur.com/UON1IFq.png) |
| ![Imgur](https://i.imgur.com/yAWKums.png) | ![Imgur](https://i.imgur.com/iX2g2cX.png) |
| ----- | ----- |
| ![Imgur](https://i.imgur.com/V6NjbBy.png) |  |
| ![Imgur](https://i.imgur.com/YGEBsbf.png) | ![Imgur](https://i.imgur.com/DxVuPFD.png) |
| ![Imgur](https://i.imgur.com/InJcHMG.png) | ![Imgur](https://i.imgur.com/x40pO6L.png) |
| ----- | ----- |
| ![Imgur](https://i.imgur.com/b1crxvx.png) |  |
| ![Imgur](https://i.imgur.com/i9SyzJw.png) | ![Imgur](https://i.imgur.com/4F4FN9x.png) |
| ![Imgur](https://i.imgur.com/Rixkvwn.png) | ![Imgur](https://i.imgur.com/1Vs6WmF.png) |

- Dựa trên các vùng span-cell được xác định, kết hợp với vùng grid từ model Space-segment, ta hoàn toàn có thể xác định được các span-cell và tọa độ các cell trong bảng, rồi từ đó tiến hành tái cấu trúc bảng với dữ liệu text và format tương ứng!

### OCR

- Các bài toán về Text Detection và Text Recognition đã rất quen thuộc rồi. Với text detection có thể kể tới 1 số phương pháp nổi bật như: CRAFT, DB, PAN,... Text Recognition thì cũng có rất nhiều các phương pháp. Ngoài 2 phương pháp quen thuộc là CRNN-CTC và Attention-OCR, trong thời gian qua có nhiều paper đề cập tới các cách tiếp cận khác như: Transformer-OCR, sử dụng thêm các mạng Language Model để giúp model nhận diện chính xác hơn,... Về 2 phần này, các bạn có thể tham khảo tại 1 repo tổng hợp sau: [Scene-Text-Recognition-Recommendations](https://github.com/HCIILAB/Scene-Text-Recognition-Recommendations)

### Table Cell Reconstruction

- Phần Table Cell Reconstruction model liên quan đến việc tái cấu trúc lại hình thái và thông tin của bảng biểu, sao cho giữ được đúng hình dạng và nội dung của nó. Đây cũng là phần model cuối, sử dụng các thông tin đã được nhận diện từ trước như: Table-Type classification, Table Line Segmentation, Row/Column Space Segmentation, Row/Column Span Segmentation, OCR model.

- Như mình đã có mô tả qua ảnh pipeline của bài toán ở trên. Ứng với mỗi bảng được detect, chúng sẽ được tiến hành phân loại vào 1/2 loại bảng (Fullborder, Borderless). Với dạng bảng Fullborder, sau khi đã segment ra các đường line trong bảng, mình có thể lấy được tọa độ các line đó, dựa vào các phương pháp trong xử lý ảnh. Với dạng bảng Borderless, dựa trên output của Space-model và Span-model, ta cũng dễ dàng xây dựng được các đường line tương ứng.

- Sau đó, xác định được các giao điểm của chúng để tổng hợp được tọa độ của từng cell trong bảng (cell có thể là single-cell hoặc span-cell, nhưng phải thỏa mãn là 1 hình chữ nhật, không phải cell có hình dáng chữ L).  Với borderless thì xác định cell nào là span-cell với Span-model để tiến hành merge các grid gần nhau lại,... Cuối cùng, để có thể tiến hành tái cấu trúc bảng giống với ảnh đầu vào, và hướng đến mục đích xa hơn là có thể export dạng thông tin này sang các format khác như: Docx, Excel, HTML, ... chúng ta cần định nghĩa 1 format chung để lưu giữ thông tin.

- 2 tập data thường được dùng để benchmark là: SciTSR và PubTabNet. 2 tập này ngoài phần thông tin về tọa độ text-bbox, còn chứa các thông tin về relative-position của từng cell. Ví dụ: 1 cell sẽ được biểu diễn thêm bởi 4 thông số như: start_row=0, end_row=1, start_col=0, end_col=2; tức cell này trải rộng trên 1 dòng (từ dòng index 0 đến index 1) và trải dài trên 2 cột (từ cột 0 đến cột 2), đồng nghĩa với đây là 1 span-cell. Gọi là relative-position vì nó biểu thị vị trí tương đối, không quan tâm kích thước của từng cell!

- Tiếp theo, dựa vào tọa độ của từng cell đã xây dựng được, ta dễ dàng xác định được các text-bbox thuộc từng cell. Kết hợp với format vừa thiết lập ở trên thì có thể dễ dàng chuyển thông tin bảng vào Docx, Excel,... Lưu ý rằng, Docx hay Excel thì các cell cũng đều phải là dạng chữ nhật, không thể export các cell bị sai có hình dáng chữ L được.

- Tool để chuyển đổi sang Docx, Excel thì các bạn có thể tham khảo 1 số lib như: PythonDocx, xlwt, xlsxwriter, openpyxl. Ngoài ra, mình cũng có code 1 web demo nhỏ với streamlit, tuy nhiên streamlit không nhúng được file excel trên browser nên mình dùng lib `xlsx2html` để convert Excel file sang HTML file, từ đó hiển thị trên web browser. Ảnh minh họa web demo:

![Imgur](https://i.imgur.com/5bDHydw.png)

# Kết quả thu được

- Để thể hiện rõ hơn độ tổng quan của pipeline hiện tại, mình có ví dụ thêm với 1 số các dạng bảng đa dạng khác:

    - __Dạng bảng fullborder__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/NPiWPrB.jpg)     | ![Imgur](https://i.imgur.com/KFSyIL2.jpg)     |

    - __Dạng bảng fullborder khác với các cell nhỏ__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/pEY78fN.jpg) | ![Imgur](https://i.imgur.com/Qvm58rl.jpg) |

    - __Dạng bảng borderless gồm cả row-span cell và column-span cell__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/1vpZw1g.jpg) | ![Imgur](https://i.imgur.com/0aAPyqt.jpg) |
    
    - __Dạng bảng gồm các spancell chồng nhau__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/0OXPgYH.jpg) | ![Imgur](https://i.imgur.com/SraFcF1.jpg) |
    
    - __Dạng bảng nhiều nội dung__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/Bso5DBc.jpg) | ![Imgur](https://i.imgur.com/zMcmYtD.jpg) |
    
    - __Dạng bảng gồm spancell và các cell nhỏ khó nhận diện nội dung__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/Wq1LQP2.jpg) | ![Imgur](https://i.imgur.com/02W9Zj4.jpg) |
    
    - __Dạng bảng mập mờ, khó nhận diện spancell__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/iz8ZH7H.jpg) | ![Imgur](https://i.imgur.com/33HySsi.jpg) |
    
    - __Dạng bảng borderless, báo cáo tài chính Việt Nam__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/C4sn3xE.jpg) | ![Imgur](https://i.imgur.com/kZw8hh9.jpg) |
    
    - __Bảng chụp từ điện thoại__

    | Column 1 | Column 2 |
    | -------- | -------- |
    | ![Imgur](https://i.imgur.com/0V3jrrB.jpg) | ![Imgur](https://i.imgur.com/5ytroGi.jpg) |

    - __Bảng fullborder vừa nhận diện bằng flow fullborder và borderless__

    | Column 1 |
    | -------- |
    | ![Imgur](https://i.imgur.com/YDyWURn.png) |
    | ![Imgur](https://i.imgur.com/STuEEzV.png) |

# Phương thức đánh giá

- Về phần metric đánh giá cho bài toán Table Structure Recognition cũng khá đa dạng, có thể kể đến 1 số phương pháp đánh gía trong các paper mình có đề cập bên trên như:

    - __Cell location prediction__: căn cứ dựa vào vị trí các cell được detect, cách thức sẽ tương tự như các bài Object Detection dùng mAP, ví dụ như mAP 0.5, mAP 0.75,.... Được dùng trong các paper như Table-Transformer
    - __Cell logical location prediction__: hay cell structure prediction, căn cứ dựa trên mối liên hệ giữa các cell (adjacency relations), ví dụ mối liên hệ ngang, dọc như mình có đề cập trong phương pháp SciTSR bên trên. Được dùng trong các paper như: SciTSR, LGPMA, TGRNet, Deep-Split-Merge,...

- Về __Cell location prediction__ thì khá quen thuộc rồi, các bạn có thể đọc thêm về metric đánh giá mAP tại bài blog sau của mình: [Thuật toán Faster-RCNN với bài toán phát hiện đường lưỡi bò](https://viblo.asia/p/bJzKmREOZ9N#_metric-danh-gia-12)

- Còn về __Cell logical location prediction__, đa phần các paper đều có đề cập tới metric này và reference sang cách đánh giá trong ICDAR2013-Table Recognition, được report tại paper [A Methodology for Evaluating Algorithms for Table Understanding in PDF Documents](https://dl.acm.org/doi/10.1145/2361354.2361365). Về cách thức đánh giá, tác giả có lấy 1 ví dụ như hình dưới:

![Imgur](https://i.imgur.com/b1fRxvH.png)

- Tức việc tính toán các mối liên hệ giữa từng cell, hay các cell lân cận sẽ được quy về bằng việc tính Presicion và Recall, dựa trên một 1D list, gọi là adjacency relations (mối liên hệ giữa các cell lân cận). Việc dùng metric này thì trong paper có bảo là `Using neighbourhoods makes the comparison invariant to the absolute position of the table and also avoids ambiguities arising with dealing with different types of errors`, tức sẽ không bị ảnh hưởng bởi ví trí chính xác của cell, hay các trường hợp như merge-cell, empty-cell,... Như hình trên có mô tả thì có tổng cộng 31 relation ground-truth (có chấm đen), nhưng model chỉ dự đoán đúng 24 relations (chấm đen hình dưới), trên tổng số 28 relations dự đoán được. Cuối cùng, tính toán Precision, Recall theo công thức đã cho

- Tuy nhiên, sau khi research thêm về phần metric evaluation, mình thâý cách đánh giá này thực sự không ổn lắm (không biết mình có đọc thiếu hay chưa hiểu rõ phần nào không :/). Nhưng khá là khó hiểu khi định nghĩa các relation màu trắng bên trên. Mình đang hiểu có thể các cell đó bị trống, không match với content của ground-truth nên bị coi là sai. Tuy nhiên, nếu phần content đó dài hơn, model vẫn dự đoán nhầm 1 đường phân chia dọc như trên thì content sẽ bị chia làm 2 phần, khi đó thì mối liên hệ sai sẽ được định nghĩa như thế nào? Với lại, nếu các cell đầu tiên bị dự đoán sai thì các cell sau cũng sẽ bị lệch index, từ đó việc tính precision, recall giữa trên các mối liên kết cell chắc chắn sẽ không chính xác nếu dựa vào cell-index.

- Mình có tham khảo qua paper TGRNet và có định nghĩa lại phần metric evaluation như sau, gọi là __Adjacency Relation Accuracy__ (lưu ý phần đánh giá này chỉ quan tâm đến structure recognize, chứ không quan tâm phần nội dung bên trên, vì đó là output của model OCR):
    - Xác định vị trí các cell trùng khớp nhau giữa ground-truth và prediction, dựa trên IoU.
    - Mỗi cell được dự đoán chỉ trùng khớp với 1 cell ground-truth (1-1), từ đó thu được 1 danh sách ánh xạ `cell_ID to cell_ID` giữa gt và prediction
    - Tính toán các ground-truth relation và tổng số (Y1), bao gồm cả liên kết ngang và dọc, hoặc có thể tính riêng cho từng relation.
    - Với prediction, tính toán các cell-relation, dựa trên mapping `cell_ID to cell_ID` có tìm được bên trên, ta có thể xác định được các relation nào là chính xác. Gọi số relation chính xác là Y2, số relation dự đoán được (cả đúng + sai) là Y3
    - Dựa trên công thức precision, recall từ ICDAR2013 Competition, ta định nghĩa như sau:
        - Precision = số relation dự đoán đúng / số gt relation = Y2 / Y1
        - Recall = số relation dự đoán đúng / số relation dự đoán được = Y2 / Y3

- Ta cùng xem xét ví dụ sau với ảnh input, ground-truth cell và prediction-cells

| Input | Ground-truth | Prediction |
| -------- | -------- | -------- |
| ![Imgur](https://i.imgur.com/LTIsguh.png) | ![Imgur](https://i.imgur.com/1UoaOpZ.png) | ![Imgur](https://i.imgur.com/KkNnKAS.png) |


- Với cách định nghĩa metric evaluation như bên trên, mình lấy ngưỡng IoU = 0.9 và lần lượt tính toán 3 thông số Y1, Y2, Y3. Các số màu xanh dương là cell index, các đường màu cam là mối liên hệ dọc, đường màu xanh lá là mối liên hệ ngang. Như vậy ta có tổng số grouth-truth relation Y1 = 14

- Tương tự với hình prediction-cells thứ 3, có tổng cộng 15 relation phát hiện được nên Y3 = 15. Dựa trên IoU, dễ thấy cell_2 ở gt không trùng với bất kì cell nào ở prediction. Từ đó, ta có thể biết được các cell trùng khớp với nhau giữa gt và prediction (1-1). Với IoU=0.9, ta sẽ có mapping `cell_ID to cell_ID` từ gt tới prediction như sau: (1, 1), (3, 3), (4, 4), (5, 6), (6, 7), (7, 8), (8, 9), (9, 10)

- Dựa vào mapping này và số gt relation, prediction relation đã đếm bên trên, ta có thể xác định các relation nào là đúng. Ví dụ như hình trên thì có 10 relation đúng, 5 relation sai, nên Y2=10

- Theo đúng công thức, ta có: `R = (Y2 / Y1) = 10 / 14 = 71.43%`, `P = (Y2/ Y3) = 10 / 15 = 66.67%` ==> `F1 = 2PR / (P + R) = 0.6897(%)`

- Với cách định nghĩa như vậy, mình thực hiện đánh giá pipeline hiện tại trên 3 bộ test:
    - __>1100 ảnh dạng bảng scan__: là nguồn dữ liệu crawl từ các trang web Việt Nam, đều là fullborder table. Với pipeline hiện tại đạt __~92%__ table-recognition accuracy. Được định nghĩa rằng nếu tất cả các cell của bảng được nhận diện chính xác thì mới coi là đúng, ngược lại nếu có ít nhất 1 cell bị nhận diện không chính xác hoặc thừa thiếu cell thì coi là sai luôn. Tức cứ 100 bảng thì có khoảng 92 bảng được nhận diện chính xác tất cả cell bên trong nó.
    - __>9k test PubTabNet__: đa phần là borderless table
        - Với __IoU = 0.5__, Adjacency Relation đạt __0.9457__ (F1-score)
        - Với __IoU = 0.75__, Adjacency Relation đạt __0.9057__ (F1-score)
        - $AP^{IoU=0.50}$ = 0.9375 , $AP^{IoU=0.75}$ = 0.8665, $AP^{IoU=0.5:0.05:0.9}$ = 0.8067 (đây là AP của phần nhận diện cell, còn trong paper Table-Transformer thì tính mAP trên 6 classes)
    - __>90k test PubTable__: đa phần là borderless table
        - Với __IoU = 0.75__, Adjacency Relation đạt __0.9063__ (F1 score)

- Ở dạng bảng borderless, __Adjacency Relation Accuracy__ khi tính toán với các giá trị IoU cao như 0.9, 0.95 là khá thấp với nhiều bảng, mặc dù cấu trúc bảng được dự đoán ra vẫn chính xác khi nhìn bằng mắt thường. Nguyên nhân là do việc xử lý output từ Space-model, dẫn tới tọa độ các cell có thể bị xê dịch đi 1 khoảng tương đối, dẫn đến việc tính toán độ chính xác bị sai, đặc biệt đối với các dạng bảng "dày đặc", nhiều cell hoặc kích thước ảnh input tương đối nhỏ hoặc khá mờ! __IoU=0.75__ là 1 ngưỡng có thể chấp nhận được.

# Các "hạn chế" của luồng xử lý hiện tại và hướng cải tiến

- Như mình có đề cập từ đầu, nếu chỉ sử dụng 1 model thì việc tái cấu trúc với các dạng bảng khác nhau cũng sẽ gặp những vấn đề khác nhau, chưa kể đến việc khả năng tổng quát của model khá kém khi test trên dữ liệu thực tế! Với pipeline mình có xây dựng như vậy, mình nhận thấy 1 số điểm hạn chế, và có thể coi đó là 1 hướng nghiên cứu để cải tiến về sau như:
    - Table Alignment & Dewarping: trong pipeline hiện tại mình cũng có xử lý align để xoay bảng lại cho thẳng góc, tuy nhiên vẫn giả định rằng bảng là bảng thẳng, vuông vức, không bị xô lệch quá nhiều. Ví dụ khi người dùng cầm chụp 1 ảnh tài liệu có chứa bảng, khiến cho phần giấy bị cong vênh làm phần nhận diện + tái cấu trúc sẽ khó hơn rất nhiều.
    - Hướng xứ lý hiện tại sẽ khó chuẩn đối với các dạng bảng free-style, không có cấu trúc rõ ràng, hoặc các dạng bảng mà __relative-position__ không rõ ràng (không rõ từ cột A->B, dòng C->D). Ví dụ như bảng dưới, khi không rõ cấu trúc và nhìn bằng mắt thường cũng khó để xác định:
    ![Imgur](https://i.imgur.com/N7OZadC.png)
    - Cải tiến phần model segment hiện tại: các bạn có thể tùy chỉnh lại hoặc thay đổi phần model này, cũng có thể xem xét việc tối ưu cả 4 mask của 2 model Space và Span trong cùng 1 model, thay vì tách thành 2 model con như cách tiếp cận hiện tại của mình,... Hoặc có thể thiết kế phần segment sử dụng pyramid soft-label như trong paper LGPMA hoặc tạo Differentiable Binarization mask như trong paper [DB](https://arxiv.org/abs/1911.08947) text detection,... Reference: [DB_text_minimal](https://github.com/huyhoang17/DB_text_minimal). Đây mới chỉ là __baseline models__ của mình, hoàn toàn có thể cải thiện tốt hơn nhiều!

# Kết luận

- Cuối cùng thì mình cũng đã hoàn thành bài blog khá dài... dòng này của mình. Hi vọng qua đây cũng sẽ giúp mọi người có thêm cái nhìn mới khi tiếp cận và xử lý với 1 bài toán AI nào đó. Bài blog này mình sử dụng các model đã rất quen thuộc trong CV nói chung (image classification, image segmentation, object detection), nhưng cái muốn hướng tới là cách giải quyết bài toán hơn là việc cặm cụi tối ưu chỉ 1 mô hình nào đó. Bạn nào để ý thì mình có lấy 1 câu trong [`The Zen of Python`](https://peps.python.org/pep-0020) để làm phần tiêu đề của bài blog của mình: __`Simple is better than complex`__

- Mình có để khá nhiều các tài liệu mình tham khảo được tại phần cuối, mọi người có thể tìm đọc thêm.

- Nếu các bạn có bất kì câu hỏi, thắc mắc gì, vui lòng comment dưới bài blog hoặc gửi mail về địa chỉ: `hoangphan0710@gmail.com`. Nếu thấy hay hãy cho mình 1 upvote hoặc clip nhé, hẹn gặp lại mọi người trong các bài blog tiếp theo (lâu lâu mình mới ra 1 bài 😅) Bye byee 👋

# Reference

- Survey paper: https://arxiv.org/abs/2104.14272
- [Awesome-Table-Recognition](https://github.com/cv-small-snails/Awesome-Table-Recognition)
- [Document_AI-Lei-Cui - Slide](https://www.microsoft.com/en-us/research/uploads/prod/2021/09/Document_AI-Lei-Cui.pdf)
- Tencent R&D center - table recognition solution: https://zhuanlan.zhihu.com/p/69793742
- [TableParser: Automatic Table Parsing with Weak Supervision from Spreadsheets](https://github.com/DS3Lab/TableParser)
- [Sequence labeling model for row and column seperators segmentation](https://github.com/L597383845/row-col-table-recognition)
- [Data Generation for Table Recognition](https://github.com/hnmspirit/table_datagen)
- [table_reconstruction - Sun Asterisk](https://github.com/sun-asterisk-research/table_reconstruction)
- [WTW-Dataset - Parsing Table Structures in the Wild](https://github.com/wangwen-whu/WTW-Dataset)
- [PST-table - github](https://github.com/tommyMessi/PST-table)
- [tableImageParser_tx - github](https://github.com/tommyMessi/tableImageParser_tx)
- [table-ocr - github](https://github.com/chineseocr/table-ocr)