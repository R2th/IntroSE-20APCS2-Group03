![](https://images.viblo.asia/53eb53ff-fc73-4ea9-a0b9-acc911c98215.png)
- Với vai trò Dev/QA thường thì chúng ta sẽ nhận được Requirement từ phía khách hàng/điều tra hệ thống cũ để có Requirement (đối với dự án maintenance).
-  Nhưng với vai trò là Seller/BrSe/BA của một dự án mới hoàn toàn thì mình đã từng thấy họ đi ngồi hàng giờ để tìm hiểu mong muốn, dự định, mô hình với khách hàng về dự án mới đó.
![](https://images.viblo.asia/56da9655-a847-424a-9381-03b16cbf18a6.jpg)

=> Vậy công việc phân tích requirement có khó không, cần những nội dung gì?... Chúng ta thử tìm hiểu nhé!  

# I. Phân tích yêu cầu là gì?
Thường thì khách hàng chỉ nói họ thích này thích cái kia. Công việc của người phân tích Requirement là phải giúp customer định hình được những mong muốn của họ. Chỉ ra hạn chế, khó khăn khi dự án còn trong trứng nước. Và quan trọng là đưa ra được những suggestion quan trọng để có được sự tín nhiệm của customer. 
![](https://images.viblo.asia/ef4b8e65-d40d-4bcc-b690-9a6d113df0e1.png)

### Phân tích yêu cầu là công việc bao gồm:

 - Xác định các yêu cầu cho một hệ thống mới hoặc được thay đổi, dựa trên cơ sở là các yêu cầu (có thể mâu thuẫn) mà những người có vai trò quan trọng đối với hệ thống, chẳng hạn người sử dụng đưa ra.
 - Xác định phạm vi ảnh hưởng của chức năng, data mà end user có thể gặp phải
 - Xác định tất cả các case có thể xảy ra trên thực tế
 - Các yêu cầu phải có tính đo được, kiểm thử được, có liên quan đến các nhu cầu đã xác định, và các yêu cầu phải được định nghĩa ở một mức độ chi tiết đủ cho việc thiết kế hệ thống.

# II. Các bước phân tích yêu cầu
![](https://images.viblo.asia/da7d5680-0c7d-41b2-b1e3-e64fe93c5f86.png)

- Eliciting requirements: giao tiếp với khách hàng và người sử dụng để xác định các yêu cầu của họ.

- Analyzing requirements: xác định xem các yêu cầu được đặt ra có ở tình trạng không rõ ràng, không hoàn chỉnh, đa nghĩa, hoặc mâu thuẫn hay không, và giải quyết các vấn đề đó.

- Recording requirements: yêu cầu có thể được ghi lại theo nhiều hình thức, chẳng hạn các tài liệu ngôn ngữ tự nhiên, các tình huống sử dụng (use case), câu chuyện sử dụng (user story), hoặc các đặc tả tiến trình.

- Phân tích yêu cầu có thể là một quá trình dài và khó khăn. Các hệ thống mới làm thay đổi môi trường và các mối quan hệ giữa con người, do đó điều quan trọng là phải xác định được tất cả những người có vai trò quan trọng, xem xét tất cả các nhu cầu của họ và đảm bảo rằng họ hiểu được các hàm ý của hệ thống mới

# III. Các kĩ thuật phân tích requirements
### 1. Phỏng vẫn trực tiếp 1-1/group kết hợp với Business process modeling notation (BPMN) 
![](https://images.viblo.asia/446bb291-aa5d-4c7d-a5f6-5df0f736d64a.png)

- Phương pháp phổ biến nhất là lắng nghe yêu cầu của các bên liên quan theo phong cách phỏng vấn 1-1. Đây là một phương pháp tốt cho việc bắt đầu giai đoạn phân tích khi bạn đang cố gắng tìm hiểu và xử lý các vấn đề, nhu cầu của tổ chức, dự án
- BPMN là biểu diễn bằng hình ảnh về quy trình bằng cách sử dụng các đối tượng đơn giản, giúp tổ chức giao tiếp theo cách chuẩn. Các đối tượng khác nhau được sử dụng trong BPMN bao gồm: 
  - Flow objects
  - Connecting objects
  - Swim lanes
  - Artifacts.
  Một mô hình BPMN được thiết kế tốt phải có thể cung cấp chi tiết về các hoạt động được thực hiện trong quá trình như:
 - Ai đang thực hiện các hoạt động này?
 - Những yếu tố dữ liệu nào được yêu cầu cho các hoạt động này?
 - Lợi ích lớn nhất của việc sử dụng BPMN là dễ dàng chia sẻ hơn và hầu hết các công cụ mô hình hóa đều hỗ trợ BPMN.
###  2. Phương pháp Brainstorming kết hợp UML (Unified Modeling Language)
 ![](https://images.viblo.asia/65bfc392-ab9c-4106-87b5-2d550af68040.jpg)
- Brainstorm là một phương pháp dùng để phát triển nhiều giải đáp sáng tạo cho một vấn đề. Phương pháp này hoạt động bằng cách nêu các ý tưởng tập trung trên vấn đề, từ đó, rút ra rất nhiều đáp án căn bản cho nó.
- UML là một tiêu chuẩn mô hình hóa chủ yếu được sử dụng để đặc tả, phát triển, trực quan hóa và tài liệu hóa hệ thống phần mềm. Để nắm bắt quy trình và tạo tác UML cung cấp các đối tượng như:
    - State
    - Object
    - Activity
    - Class diagram
- Một biểu đồ UML có thể có hai kiểu là Mô hình hành vi và Mô hình cấu trúc. Một mô hình hành vi cố gắng cung cấp thông tin về những gì hệ thống làm trong khi một mô hình cấu trúc sẽ cung cấp những gì hệ thống bao gồm.
- Kỹ thuật hiện đại hơn bao gồm: tạo nguyên mẫu (prototyping), và tình huống sử dụng.
- Khi cần thiết, nhà phân tích sẽ kết hợp các phương pháp này để thiết lập các yêu cầu chính xác của những người có vai trò quan trọng, nhằm mục đích xây dựng một hệ thống thỏa mãn các yêu cầu 
### 3. Phương pháp JRP and JAD Sessions
![](https://images.viblo.asia/26426cda-0f9e-447a-9d02-012a4c191f7d.jpg)

- JRP (Joint Requirement Planning)JAD (Joint Application Design)Một nhóm có cấu trúc caoMột nhóm có cấu trúc cao
- Tập hợp các stakeholders cùng nhauTập hợp các stakeholder cùng nhau (nghiêng về mặt kỹ thuật)
- Xác định yêu cầu, xác định design ứng dụng (prototype) =>Làm thành tài liệu cho các yêu cầu đó và có được tài liệu về thiết kế
- Chúng ta có thể chạy phiên làm việc JRP trước để tập hợp các yêu cầu và lấy tài liệu về chúng. Sau đó sẽ chạy phiên làm việc JAD để phát triển thiết kế sản phẩm hoặc ứng dụng.

### 4. Flow chart technique
![](https://images.viblo.asia/c75dca83-4535-4169-89ed-ded1a6fda8ff.png)

- Flow chart là một biểu diễn trực quan của luồng tuần tự và logic điều khiển của một tập hợp các hoạt động hoặc hành động có liên quan.
- Có các định dạng khác nhau cho Flow chart  bao gồm: 
        * Tuyến tính
        * Từ trên xuống và đa chức năng (swim lanes). 
- Flow chart có thể được sử dụng cho các hoạt động khác nhau như đại diện cho các luồng dữ liệu, tương tác hệ thống, v.v.
- Ưu điểm của việc sử dụng Lưu đồ là nó có thể dễ đọc và dễ viết ngay cả đối với các thành viên không phải là kỹ thuật và có thể hiển thị quá trình song song theo chức năng , các thuộc tính quan trọng của một quy trình, v.v.

### 5. Data flow diagram
![](https://images.viblo.asia/d34f00fa-27d5-4489-a788-6290452a1895.png)

- Data flow diagram cho thấy cách dữ liệu được xử lý bởi một hệ thống inputs and outputs. 
- Các thành phần của sơ đồ luồng dữ liệu bao gồm:

   * Process
   * Flow
   * Store
   * Terminator
- Data flow diagram cho thấy các hoạt động của hệ thống trong khi sơ đồ luồng dữ liệu vật lý cho thấy cơ sở hạ tầng của hệ thống. 
- Data flow diagram có thể được thiết kế sớm trong quá trình kích thích yêu cầu của giai đoạn phân tích trong SDLC (System Development Life Cycle) để xác định phạm vi dự án. 
- Để dễ dàng phân tích, một sơ đồ luồng dữ liệu có thể được đi sâu vào các quy trình phụ của nó được gọi là "levelled DFD".

### 6. Role Activity Diagrams- (RAD)
![](https://images.viblo.asia/da7427a6-8c0b-411a-a017-549a152f194f.png)
- Biểu đồ hoạt động vai trò tương tự như ký hiệu loại lưu đồ. Trong Sơ đồ hoạt động vai trò, các cá thể vai trò là những người tham gia quá trình, có trạng thái bắt đầu và kết thúc. 
- RAD yêu cầu kiến thức sâu sắc về quy trình hoặc tổ chức để xác định các vai trò.
-  Các thành phần của RAD bao gồm
    * Activities
    * External events
    * States
- Vai trò nhóm các hoạt động lại với nhau thành các đơn vị trách nhiệm, theo nhóm trách nhiệm mà họ đang thực hiện. Một hoạt động có thể được thực hiện riêng lẻ với một vai trò, hoặc nó có thể yêu cầu sự phối hợp với các hoạt động trong các vai trò khác.
- RAD rất hữu ích trong việc hỗ trợ giao tiếp vì dễ đọc và trình bày một cái nhìn chi tiết về quy trình và cho phép các hoạt động song song.

# IV. Vấn đề
![](https://images.viblo.asia/f0c790c2-2555-4ff2-b914-9899d379046d.jpg)

### 1. Vấn đề về người dùng và khách hàng
Một vài khả năng người dùng có thể cản trở quá trình thu thập yêu cầu như dưới:

- End user không hiểu họ muốn gì

- End user không tuân theo một bộ yêu cầu đã được tài liệu hóa

- End user nhất định đòi hỏi các yêu cầu mới sau khi chi phí và kế hoạch phát triển đã được hoạch định xong.

- Mức độ giao tiếp với End user là thấp

- End user thường không tham gia các đợt thẩm định hoặc không thể tham gia.

- End user không hiểu kỹ thuật

- End user không hiểu quy trình phát triển.

= > Những điều này có thể dẫn tới tình huống khi yêu cầu người dùng liên tục thay đổi ngay cả khi việc phát triển hệ thống hay sản phẩm đã được bắt đầu.

### 2. Vấn đề về developer
Các vấn đề sau có thể nảy sinh từ phía các developer:

- Nhân viên kỹ thuật và end user có thể có ngôn từ khác nhau. Kết quả là họ có thể tin rằng họ hoàn toàn đồng thuận cho đến khi sản phẩm hoàn thiện được đưa ra.

- Các developer có thể cố lái cho các yêu cầu khớp với một hệ thống hay mô hình sẵn có, thay vì phát triển một hệ thống theo sát nhu cầu của khách hàng

- Việc phân tích có thể do các developer thực hiện, thay vì các nhân viên có kỹ năng và kiến thức miền ứng dụng để có thể hiểu các nhu cầu của khách hàng một cách đúng đắn

### 3. Giải pháp
![](https://images.viblo.asia/8f92f2d2-6e7a-486e-8c34-51660360993f.jpg)

- Thuê các chuyên gia về doanh nghiệp hoặc chuyên gia phân tích hệ thống.
- Tạo UML, tình huống sử dụng. và phát triển phần mềm linh hoạt (Agile software development) cũng đã được dùng làm giải pháp cho các vấn đề trên.
- Sử dụng thuần thục các kỹ thuật để khai thác triệt để Requirement

# 5. Reference
https://en.wikipedia.org/wiki/Requirements_analysis

https://www.visual-paradigm.com/guide/requirements-gathering/requirement-analysis-techniques/