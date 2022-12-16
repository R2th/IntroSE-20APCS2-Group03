## 1. Unit test

### 1.1 Định nghĩa

- Là một mức kiểm thứ phần mềm với mục đích để xác nhận từng unit của phần mềm được phát triển đúng như được 
thiết thế . UT là mức test nhỏ nhất trong bất kì phần mềm nào . Nó sử dụng tùy dự án ta quy định unit ở mức dộ nào.
Thường thì unit test sẽ đc quy định trong một function hoặc một class . Thực tế tùy vào developer sẽ đưa ra quyết định 
viết UT cho phù hợp , có thể test đầu vào đầu ra của hàm hay kiểm tra một phần hoặc toàn bộ class. 

### 1.2 Tại sao phải unit test ?
- Đôi khi do chủ quan thường không kiểm tra lại code dẫn đến lỗi hệ thống hoặc  trả về kết quả không mong đợi . Những ảnh hương trên 
dẫn đến việc tốn kem thời gian và tiền bạc để sửa lỗi .
- Giúp tăng khả năng tối ưu code , nâng cao khả năng tư duy về code
- Xử lý những vấn đề khi UT có thể xử lý rất nhiều vấn đề có thể xảy ra sau này trong quá trình dev và testing .
- Chi phí cho UT thì ít hơn nhiều so với các phase testing như là sysem testing, acceotance testing và nhất là chi phí issues/bus qua đến 
bên khách hàng
- Đo lường đc những đoạn code nào nào đã pass và đoạn nào chưa pass và dev có thể cover ngày sau khi chạy UT. 
- Giảm lượng bug phát sinh ở giai đoạn testing
- Phát hiện sớm các vấn đề về thiết kế , xử lý hệ thống , thậm chí các mô hình thiết kế .
- Tiết kiệm thời gian dev . Việc viêt UT và execute có thể sẽ tốn thời gian nhưng nó làm cho code đầy đủ hơn và phát sinh ít issues/bugs 
hơn.
- An toàn hơn cho các đoạn code 

### 1.3 Khi nào thực hiện
- UT là mức kiểm thử đầu tiên trong các mức kiểm thử phần mềm , nó đc thực hiện trước khi Intergration Testing.

### 1.4 Mục đích 
- Cô lập từng thành phần của chương trình và chứng minh các bộ phận riêng lẻ chính  xác về các yêu cầu chức năng.
- Tăng sự đảm bảo khi có sự thay đổi về code
- Code dễ đọc , dễ hiểu , có thể tái sử dụng nhiều hơn và debug rõ ràng hơn.
- Chi phí sủa lỗi thấp hơn so với các mức kiểm thử ở giai đoạn sau này .

## 2. Integration Testing 

### 2.1 Định nghĩa 
- Intergration Testing là một mức của kiểm thử phầm mềm với mục đích kiểm tra một nhóm các module nhỏ liên quan đến nhau xem 
chúng có hoạt động được với nhau đúng chức năng như trong thiết kế hay không . Theo ISTQB 
(International Software Testing Qualifications Board)
- Kiểm thử tích hợp được thực hiện để phát triển các lỗi về giao diện hoặc trong tương tác giữa các thành phần hoặc hệ thống tích hợp
- Kiểm thử tích hợp thành phần kiểm tra sự tương tác giữa các thành phần với điêu kiện các thành phần đã pass ở phần kiểm thử thành 
phần trước đó
- Kiểm thử tích hợp hệ thống kiểm tra sự tương tác giữa các hệ thống con khác nhau và các hệ thống này đã pass ở lần kiểm thử trước đó.

### 2.2 Tại sao phải Intergration Test
- Mỗi module nói chung được thiết kế bởi mỗi dev có kiến thức lập trình logic khác nhau . Kiểm thử tích hợp là cần thiết để đảm bảo tính
hợp nhất của phần mềm.
- Tại thời điểm phát triển module vẫn có thể thay đổi trong đặc tả yêu cầu của khách hàng , những thay đổi này có thể không kiểm tra 
ở giai đoạn unit test trước đó 
- Khi tích hợp hệ thống các module có thể không tương thích với cấu hình chung của hệ thống
- Thiếu các xử lý ngoại lệ xảy ra

### 2.3 Khi nào thực hiện Intergration Testing 
- IT là mức thứ 2 trong các mức kiểm thử phần mêm. Nó được thực hiện UT trước System Test.

### 2.4 Mục đích 
- Để lộ các lỗi trong sự tương tác giữa các đơn vị tích hợp, tìm ra lỗi trong quá trình tích hợp các thành phần, 
module lại với nhau. Các trình điều khiển thử nghiệm và các phần tử thử nghiệm được sử dụng để hỗ trợ trong Kiểm thử tích hợp

### 2.5 Có 4 loại kiểm tra trong Integration Test 
- **Kiểm tra cấu trúc (structure)**: Tương tự **White Box Test**( kiểm tra nhằm đảm bảo các thành phần trong một chương trình chạy đúng) , chú trọng đến các hoạt động của các thành phần cấu trúc bên trong của chương trình chẳng hạn các lệnh và nhành bên trong.
- **Kiểm tra hiệu năng (functional)** : Tương tự** Black Box Test** ( kiểm tra chỉ chú trọng đến chức năng của chương trình , k quan tâm đến
 cấu trúc bên trong, chỉ khảo sát chức năng của chương trình theo kỹ thuật
- **Kiểm tra hiệu năng (performance)** : Kiểm tra việc vận hành của hệ thống
- **Kiểm tra khả năng chịu tải (stress)** : kiểm tra các giới hạn của hệ thống

## 3. System Test 

### 3.1 Định nghĩa 
- Là một mức độ kiểm thử phần mềm , nơi phần mềm hoàn chỉnh và tích hợp kiểm tra
- Điểm khác nhau giữa IT và STS chú trọng các hành vi và lỗi trên toàn hệ thống 
còn IT chú trọng sự giao tiếp hữa các đơn vị hoặc đối tượng khi chúng làm việc cùng nhau.
thông thường thực hiện UT va IT để đảm bảo mọi Unit và sự tương tác giữa chúng hoạt động chính xác trước khi thực hiện System Test.
- Kiểm thử hệ thống bao gồm kiểm thử chức năng và phi chức năng
- Kiểm thử hệ thống tập trung nhiều hơn vào các chức năng của toàn bộ hệ thống
- Các trường hợp kiểm thử hệ thống bao gồm các chức năng của sản phầm hoàn chỉnh và đc thực hiện các trường hợp kiểm thử mức 
độ cao 
- Các hành vi của ứng dụng hoàn chỉnh được kiểm tra để đáp ứng các yêu cầu quy định 
- Các trường hợp kiểm thử và dữ liệu kiểm thử đc thực hiện và các dữ liệu thực tế không được sử dụng trong loại kiểm thử này .
### 3.2. Mục đích
- Để đánh giá sự  tuân thủ của hệ thống với các yêu cầu được chỉ định.

### 3.3 Phân loại system test 
- Basic test để chứng tỏ hệ thống có thể cái đặt đc , cấu hình được và hoạt động được .
- Functionality tests cung cấp kiểm tra toàn bộ yêu cầu (requirements_ trên cả hệ thống .
- Robustnes tests xác định xem khả năng phục hồi của hệ thống từ input errors và các tình huống failuree khác.
- Inter-opera bility test xác định xem hệ thống có thể tương thích (inter - operate) với các sản phẩm bên thứ 3 .
- Perform test đánh giá hiệu năng của hệ thống, eg..., bằng thông, phản hồi dưới các điều kiện khác nhau .
- Scalability test  xác định giới hạn quy mô hệ thống như quy môi người dùng , quy môi địa lý , quy mô nguồn lực .
- Stress test để hệ thống ở tình trạn áp lực để xác định giới hạn của hệ thống và khi nó fail xác định cách thứ để gây ra failure.
- Load and Stability kiểm tra khả năng ổn địng của hệ thống trong thời gian dài.
- Releability test kiểm tra hệ thống vẫn ổn định khi tích hợp thê các hệ thống con khác và bảo trì .
- Doncumentation test đmả bảo system user guides là chính xác và khả dụng.

## 4. Acceptance Test

### 4.1 Định nghĩa 
- Kiểm thử chấp nhận là một cấp đọ trong tiến trình kiểm thử phần mềm nhằm kiểm thử hệ thống và khẳ năng chấp nhận được .
- Mục tiêu của kiểm thử này là để đánh giá sự tuân thử cua hệ thống với các yêu cầu nghiệp vụ và thẩm định xem đã có thể chấp nhận 
để bàn giao chưa .
- Kiểm thử chấp nhận được khách hàng thực hiện ( Hoặc ủy quyền cho 1 bên thứ 3 thực hiện ) .
### 4.2 Có 2 loại kiểm thử 
 - Alpha test : người dùng kiểm thử phần mềm nay tại nơi phát triển phần mềm , dev sẽ ghi nhận các lỗi hoặc phản hồi và lên kế hoạch 
sửa chữa.
- Beta Test , Phần mềm sẽ được gửi tới cho người dùng để kiểm thử ngay trong môi trường thực , lỗi hoặc phản hồi cũng sẽ gửi ngược 
lại cho dev sửa chữa 
> Lưu ý không nhất thiết phải thực hiện tất cả cá loại kiểm tra nêu trên. Tùy vào yêu cầu đặc trưng của từng hệ thống ,
 tùy khả năng và thời gian cho phép của dự án , khi lên kế hoạch trưởng dự án sẽ quyết định áp dụng loại kiểm thử nào.