Hôm nay mình sẽ làm một loạt bài về những kiến thức cơ bản của hệ phân tán - 1 môn học mà mình tạch khi còn ngồi đại học:sweat_smile:.

**Hệ phân tán** được phát triển trên cơ sở sau:

- Do nhu cầu tăng không ngừng việc chia sẻ tài nguyên và thông tin mà các hệ điều hành đã có từ trước không đáp ứng được.
Trong quá trình triển khai ứng dụng Tin học vào đời sống, các mạng máy tính được phát triển không ngừng, các tài nguyên của các máy tính trong mạng (phần cứng, phần mềm) ngày càng được mở rộng và nâng cấp, giá trị các tài nguyên này càng tăng nhanh dẫn đến sự tăng trưởng vượt bậc nhu cầu chia sẻ tài nguyên và thông tin trong một hệ thống thống nhất. Hệ điều hành tập trung và hệ điều hành mạng thuần túy không đáp ứng được nhu cầu đối với sự tăng trưởng đó.

- Việc giá các trạm làm việc giảm nhanh chóng: làm cho chúng được sử dụng phổ dụng hơn, số lượng và chất lượng các trạm làm việc cũng tăng không ngừng, từ đó làm tăng yêu cầu xử lý phân tán.

- Việc sử dụng rộng rãi các mạng: Trên cơ sở việc kết nối mạng để triển khai hệ điều hành mạng tạo nên một cơ sở kỹ thuật hạ tầng (phần cứng, kết nối mạng, phần mềm) làm nền tảng phát triển hệ phân tán.

Và mở đầu cho chuỗi series này mình xin giới thiệu  **Tổng quan về hệ phân tán**.  Cùng tìm hiểu nhé!
# Định nghĩa về hệ phân tán
* Hệ thống phân tán có thể coi là 1 hệ thống tính toán với các thành phần tính toán được phân bố trên các vị trí địa lý khác nhau.
* Là tập hợp các máy tính độc lập, không phụ thuộc lẫn nhau, kết nối với nhau bằng 1 hạ tầng truyền thông.
*  Có hạ tầng phần cứng và phần mềm khác nhau kết nối với nhau bằng các công nghệ mạng (mạng máy tính), có khả năng phối hợp và chia sẻ tài nguyên.
- Thực hiện một nhiệm vụ chung.
- Cung cấp các tài nguyên tính toán cho người sử dụng dưới dạng nhất định. Thống nhất về giao diện cũng như cách thức truy cập dịch vụ.
- Người sử dụng không cần phải quan tâm tới các chi tiết của hệ thống.
# Đặc điểm của hệ phân tán
 Hệ phân tán có 4 đặc điểm đặc trưng sau:

* Chia sẻ tài nguyên
* Tính trong suốt
* Tính mở
* Tính co giãn

## 1. Chia sẻ tài nguyên
* Các tài nguyên trên máy tính được quản lý bởi chương trình quản lý tài nguyên.
* Chương trình quản lý tài nguyên có khả năng nhận các y/c do các chương trình khác gửi đến, chuyển các y/c này thành các y/c truy cập tài nguyên vật lý rồi nhận trả lời từ tài nguyên vật lý và cung cấp ngược lại cho các chương trình
* Lợi ích của việc chia sẻ tài nguyên:
    * Tiết kiệm chi phí đầu tư => số lượng các thiết bị ngoại vi đầu tư cho máy tính giảm => giảm suất đầu tư trên từng người sử dụng
    * Việc cho phép NSD kết nối các tài nguyên ở xa và các máy khác nhau làm tăng khả năng sẵn sàng của hệ thống

* Nhược điểm: 
     * Chương trình có những kết nối mạng => có lỗ hổng bảo mật => giảm mức độ an toàn bảo mật của hệ thống.
     * Khi quá trình chia sẻ thông tin kéo dài việc theo dõi tất cả thông tin được phép chia sẻ có thể tìm ra những thông tin ẩn, từ đó có những thông tin liên quan đến tính riêng tư có thể bị lộ.

## 2. Tính trong suốt
Tính trong suốt là khả năng cung cấp một khung cảnh lôgic của hệ thống cho người dùng, độc lập với hạ tầng vật lý. Hệ thống luôn là duy nhất đối với người dùng song nó sẽ che giấu được tính phân tán của hệ phân tán phía dưới.

Trong suốt được xem xét dưới nhiều góc độ khác nhau:
* **Trong suốt truy cập (Access)**: Che giấu sự khác nhau trong biểu diễn dữ liệu và cách thức truy cập tài nguyên. 
* **Trong suốt vị trí (Location):** Che giấu vị trí của tài nguyên, vị trí của TN không bị người sử dụng nhìn thấy.
* **Trong suốt di trú (Migration):** Che giấu việc tài nguyên chuyển đến địa điểm khác.
* **Trong suốt về việc chuyển địa điểm (Relocation):** Che giấu việc tài nguyên chuyển đến địa điểm khác ngay trong khi đang được sử dụng
* **Trong suốt sao lưu (Replication):** Che giấu việc dữ liệu được cung cấp từ nhiều bản sao khác nhau  (thường được sử dụng rỗng rãi trong các hệ thống phân tán để tăng hiệu năng và tính sẵn sàng của hệ thống)
* **Trong suốt tương tranh (Concurency)**: Che giấu việc tài nguyên được truy cập đồng thời bởi nhiều người sử dụng.
* **Trong suốt sự cố (Failure)**: Che giấu lỗi và quá trình phục hồi của tài nguyên
* **Trong suốt bền vững (Persistence)**: Che giấu việc tài nguyên/dữ liệu được lưu trữ bền vững (disk) hoặc không (RAM)

Việc đảm bảo tính trong suốt là 1 trong những y/c chắc chắn phải thực hiên để đảm bảo định nghĩa của hệ thống phân tán. Tuy nhiên để có được tính trong suốt ở mức độ tuyệt đối sẽ kéo theo chi phí về TN rất cao. Do đó không phải lúc nào cũng hướng tới trong suốt tuyệt đối

=> Cần xem xét trường hợp nào cần trong suốt đến đâu để tiết kiệm chi phí.
## 3. Tính mở
Theo định nghĩa chúng ta đã biết hệ thống phân tán là tập hợp các máy tính độc lập kết nối với nhau bằng hạ tầng truyền thông, cung cấp dịch vụ cho người sử dụng như 1 máy tính duy nhất. Ở góc độ phân chia vật lý hệ thống phân tán gồm nhiều máy tính tương tác lẫn nhau. Trên cơ sở hệ thống vật lý đó nhiều mức trừu tượng khác nhau chia hệ thống phân tán thành nhiều thành phần tương tác với nhau .
* 1 hệ thống có tính mở là hệ thống cho phép các thành phần được sản xuất bởi các nhà sản xuất khác nhau và có thể thay thế lẫn nhau, đồng thời cũng có khả năng cho phép thành phần mới bổ sung vào hệ thống.
* Hệ phân tán mở cung cấp các dịch vụ theo các đặc tả về cú pháp và ngữ nghĩa của các dịch vụ hay còn gọi là **giao diện**. 
* Trong giao diện có 2 thành phần :
    * Thành phần cài đặt giao diện: chịu trách nhiệm cung cấp dịch vụ cho thành phần khác
    * Thành phần sử dụng giao diện: sử dụng dịch vụ do các thành phần các cung cấp.

 => Điều kiện để 2 thành phần này có thể tương tác, phối hợp nhau là chúng cài đặt và sử dụng cùng 1 giao diện.
*  Để cài đặt và sử dụng 1 giao diện cần có các điều kiện sau:
    *  Đầy đủ. Nếu giao diện không quy định đầy đủ để các thành phần có thể sử dụng và cài đặt thì khi sử dụng và cài đặt các thành phân sẽ tự bổ sung vào những thành phần của giao diện cho đầy đủ => người cài đặt và người sử dụng bổ sung các kiểu khác nhau => không giao tiếp được
    *  Trung lập: độc lập, không phụ thuộc vào công nghệ, nền tảng, hạ tầng nào cả. Nó chi định nghĩa chung tương tác giữa 2 thành phần

* Sử dụng ngôn ngữ giao diện gọi là IDL (Interface Definition Language) để đảm bảo tính trung lập của giao diện cũng như thuận tiện hơn trong việc vaildate xem giao diện có đầy đủ hay không

## 4. Tính co giãn
* Là 1 khả năng của hệ thống có thể đáp ứng được các thay đổi của hạ tầng của môi trường xung quanh
* Tính co giãn thường được xem xét dưới 3 góc độ:
    * **Co giãn về mặt qui mô**: đảm bảo đáp ứng của hệ thống khi số lượng máy tính, số lượng người sử dụng, số lượng yêu cầu của người sử dụng gửi giữa các máy tính với nhau tăng
    * **Co giãn về mặt địa lý**: đảm bảo trao đổi thông tin trên mạng diện rộng như với mạng cục bộ
    * **Co giãn về mặt tổ chức**: khi tổ chức thay đổi hay máy tinh dịch chuyển từ cùng tổ chức này sang vùng tổ chức khác => tổ chức hệ thống thành các domain để khi cần thay đổi tổ chức ta chỉ cần thay đổi domain và thay đổi tin cậy giữa các domain đó

# Các thành phần hệ phân tán
## 1. Phần cứng
![](https://images.viblo.asia/5b1ae926-8867-4726-830f-61540d437cc6.png)

* Hệ thống có thể đơn vi xử lý hoặc đa vi xử lý. Hiện nay là các thiết bị đa vi xử lý ddược sử dụng rộng rãi
* Trong các thiết bị tính toán sử dụng đa vi xử lý, thông thường các bộ vi xử lý kết nối với bộ nhớ thông qua 1 trục thông tin chung của cả hệ thống. Trong các hệ thống xử lý tính toán với hiệu năng rất lớn có nhiều CPU và module bộ nhớ thì việc sử dụng 1 trục chung cho tất cả các CPU và CPU bộ nhớ dẫn đến việc khi 1 cặp CPU bộ nhớ sử dụng trục thì những cặp khác không sử dụng được => thời gian chờ dài =>  hệ thống có nhiều CPU và module bộ nhớ sẽ sử dụng kiên trúc khác như: kiến trúc có 1 switch, kiến trúc có hệ thống chuyển mạch với tốc độ truyền cao. Tuy nhiên đòi hỏi chi phí chế tạo cao.
* Với các tổ chức nhỏ hơn khi người ta có nhu cầu về thiết bị tính toán có hiệu năng cao đồng thời không có đủ khả năng tài chính để có thể mua những super computer thì người ta chọn phương án hiệu quả hơn là mua nhiều các máy tính mini computer hay các super computer với hiệu năng thấp hơn, giá thành nhỏ hơn và tìm cách làm cho hiệu năng tổng của các máy tính đó xấp xỉ bằng tổng hiệu năng của tất cả các máy tính con => gọi là các máy tính bó (hay còn goi là computer classter) 
* Computer classter dùng cho nhiều mục đích khác nhau như dùng cho các máy chủ tính toán, các máy chủ hosting, ...
* Trong các hệ thống computer classter để có thể kết nối với nhau thông thường các máy tính phải tương đối giống nhau => gọi là tập hợp các máy tính đồng nhất
* Trường hợp các máy tính sử dụng cho các mục đích khác nhau nhưng lại muốn kết nối với nhau => gọi là tập hợp các máy tính không đồng nhất
## 2. Phần mềm
Hệ phân tán giống hệ điều hành đặc điểm sau:
* Quản lý tài nguyên
*  Che giấu tính phức tạp và tính không đồng nhất

Phần mềm phân làm 2 loại:
* tightly-coupled systems (**DOS**): hệ điều hành phân tán
* loosely-coupled systems (**NOS**): hệ điều hành mạng
### Hệ điều hành phân tán (DOS)
![](https://images.viblo.asia/c29b5a70-93aa-4b42-9766-617d852ab08d.png)

- Là 1 hệ điều hành duy nhất được cài đặt trên hệ thống phần cứng của hệ phân tán
- Cung cấp 1 giao diện người dùng thống nhất
- NSD và người phát triển ứng dụng không cần phải quan tâm đến tất cả các chi tiết phân tán của hệ thống
* Đạt mức trong suốt tuyệt đối nhưng phải hi sinh tính độc lập giữa các thiết bị tính toán thành phần của hệ thống 
* 1 hệ điều hành phân tán phải có khả năng thích nghi với nhiều chủng loại máy tính, hệ điều hành cục bộ khác nhau
* Chưa có bản thương mại hóa

### Hệ điều hành mạng (NOS)
![](https://images.viblo.asia/5ebb6ed3-0f9b-460b-88f0-4f0768990051.png)

* Cung cấp 1 số dịch vụ cơ bản để các máy tính có thể kết nối với nhau thông qua các máy tính chung gian (các dịch vụ từ xa)
* Quan tâm tầng cao nhất các ứng dụng
* Cung cấp cho các chương trình có cơ chế trao đổi thông tin với nhau như: TCP, UDP, Socket, ...
* Tính trong suốt kém hơn so với hệ điều hành phân tán vì chúng ta không đòi hỏi quá nhiều ở hệ thống chỉ đòi hỏi hệ điều hành có hỗ trợ mạng
### Middleware
- Là sự kết hợp ưu điểm của DOS và NOS

 ![](https://images.viblo.asia/d56dfe49-e073-43bd-98f5-b74853444ca3.png)
 
*  Dịch vụ của Middleware: truy cập trong suốt, các phương tiện trao đổi thông tin bậc cao, dịch vụ định danh, dịch vụ lưu trữ bền vững, ...

Mình xin tổng kết lại 1 chút về phần này nhé!
| System | Description| Main Goal |
| -------- | -------- | -------- |
| DOS     | OS gắn chặt với hệ thống phần cứng (máy đa vi xử lý hoặc máy tính đồng bộ) multicomputers     | Trong suốt     |
| NOS     | NOS trên các máy tính cục bộ     | Cung cấp dịch vụ cục bộ cho các máy tính khác    |
| Middleware     | Cài đặt các dịch vụ cơ bản để thực hiện, phát triển các ứng dụng     | Tính trong suốt phân tán    |

**So sánh các phần mềm của hệ phân tán**

| Item| Distributed OS | Network OS |Middleware-based OS |
| -------- | -------- | -------- |  -------- |
| Mức độ trong suốt     | Cao (hoặc rất cao)     | Thấp     | Cao|
| Một HĐH trên các nút    | Yes    | Yes     | Yes|
| Số lượng bản HĐH    | 1 (hoặc N)    | N     | N|
| Trao đổi thông tin    | Bộ nhớ chia sẻ (hoặc chuyển thông báo)   | Tệp     | Tùy thuộc|
| Quản lý tài nguyên    | Toàn cục tập trung(hoặc phân tán)   | Theo nút     | Theo nút|
| Tính co giãn    | Có thể   | Có     | Tùy thuộc|
| Tính mở    | Đóng  | Mở    | Mở|

Trên đây là 1 số khái niệm cơ bản về tổng quan về hệ phân tán. Bài tiếp theo mình sẽ giới thiệu về [**Kiến trúc hệ phân tán**](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-2-kien-truc-he-phan-tan-naQZRLyG5vx) mong mọi người đón đọc:slightly_smiling_face:

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**: Bài giảng Hề điều hành - DHBKHN