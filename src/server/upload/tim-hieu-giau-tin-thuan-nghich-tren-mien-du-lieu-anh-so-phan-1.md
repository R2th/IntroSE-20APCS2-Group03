> Giấu tin và mã hóa là 2 phương pháp được sử dụng phổ biến nhất trong vấn đề bảo mật thông tin. Mã hóa giống như một " công chúa " được bảo vệ nhiều lớp với mọi biện pháp bảo vệ nhằm đảm bảo tốt nhất dữ liệu, tuy nhiên lại được sự chú ý của mọi người quan tâm. Còn giấu tin như một " sát thủ " ẩn nấp mọi nơi, thông tin có thể được giấu trong các dữ liệu khác như là ảnh số, phim hoặc âm thanh, v...v...
# Giới thiệu về giấu thông tin
## *Kỹ thuật Steganography*
Steganography là một kỹ thuật che giấu và bảo vệ thông tin không bị phát hiện. Cụm từ Steganography được ghép từ "steganos" và "graphein" ( nghĩa là " che giấu " và " ghi chép "). Kỹ thuật này được người Hy Lạp cổ đại sử dụng từ những năm 440 trước Công Nguyên nhằm che giấu trong những bản ghi bằng sáp - bằng cách ghi trực tiếp thông tin lên gỗ rồi phủ sáp ong lên hoặc ăm lên da đầu của nô lệ.
Trong chiến tranh thế giới I và II, các hoạt động gián điệp, khủng bố v...v... đã bước đầu có những kỹ thuật tiên tiến hơn được sử dụng như mực vô hình, vi ảnh, đánh dấu ký tự.
Ví dụ: Bức thư sau đây của một gián điệp gửi từ Hoa Kì sang Châu Âu trong chiến tranh Thế giới thứ I: 
> **P**RESIDENT'S **E**MBARGO **R**ULING **S**HOULD **H**AVE **I**MMEDIATE **N**OTICE. **G**RAVE SITUATION **A**FFECTING **I**NTERNATIONAL **L**AW. **S**TATEMENT **F**ORESHADOWS **R**UIN **O**F **M**ANY **N**EUTRALS. **Y**ELLOW **J**OURNALS **U**NIFYING **N**ATIONAL **E**XCITEMENT **I**MMENSELY. 

Đoạn thông điệp trên khi ghép các chữ cái đầu vào là: **PERSHINGSAILSFROMNYJUNEI** có nghĩa là - **PERSHING SAILS FROM NY JUNE I.**
Ngày nay, trong xã hội trong thời đại số hóa thì kỹ thuật Steganography đã đang được phát triển. Việc giấu dữ liệu số vào bất kỳ một dữ liệu nào khác đã phát triển vượt bậc, các đối tưởng chủ yếu được giấu là ảnh số và âm thanh.
Có nhiều loại Steganography theo B.Pflizmann nhưng được chia làm 2 nhánh chính là:
* Technical steganography: Sử dụng các phương pháp vật lý hoặc hóa học che giấu thông tin mật.
* Linguistics steganography: Có thể sử dụng các thực thể vật lý và các thông tin mật được thể hiện qua ý nghĩa của các đối tượng, hoặc sựa vào các thông tin giấu trong những tín hiệu có công suất lớn.
## *Yêu cầu của một thuật toán giấu thông tin*
#### Tính bền vững
Thể hiện ở khả năng ít thay đổi trước các tấn công bên ngoài như: thay đổi tính chất (thay đổi biên độ, thay đổi tần số lấy mẫu …) đối với tín hiệu âm thanh, các phép biến đổi affine (phép quay, tỉ lệ …), thay đổi chất lượng ảnh đối với tín hiệu ảnh, chuyển đổi định dạng dữ liệu (JPG – BMP, WAV – MP3, …). Hiện nay chưa có phương pháp nào có thể đảm bảo tính chất này một cách tuyệt đối. Với từng ứng dụng cụ thể, mức độ yêu cầu tính chất này sẽ khác nhau (yêu cầu cao hơn đối với watermarking). 
#### Khả năng không bị phát hiện
Tính chất này thể hiện ở khả năng khó bị phát hiện, nghĩa là khó xác định một đối tượng có chứa thông tin mật hay không. Để nâng cao khả năng này, hầu hết các phương pháp ẩn dữ liệu dựa trên đặc điểm của hai hệ tri giác người là hệ thị giác (HVS – Human Visual System) và hệ thính giác (HAS – Human Auditory System). Đây là hai cơ quan chủ yếu được dùng để đánh giá chất lượng của một tín hiệu. 
Khả năng không bị phát hiện phụ thuộc vào hai yếu tố sau: 
* Kĩ thuật giấu tin: dữ liệu được nhúng phải phù hợp với đối tượng chứa và thuật toán nhúng. Ví dụ như một thông tin mật sẽ khó bị phát hiện khi nhúng vào đối tượng A nhưng lại rất dễ thấy khi nhúng vào đối tượng B. 
* Kinh nghiệm của kẻ tấn công: nếu kẻ tấn công có nhiều kinh nghiệm thì khả năng phát hiện ra một đối tượng có chứa thông tin mật là không quá khó. 
#### Khả năng lưu trữ
Khả năng này thể hiện ở lượng thông tin có thể nhúng trong đối tượng chủ thể. Do yêu cầu bảo mật nên khả năng lưu trữ luôn bị hạn chế. Do đó trong trường hợp muốn ẩn một thông tin có kích thước lớn, ta thường chia nhỏ thông tin ra và nhúng vào các đối tượng khác nhau. 
#### Tính chắc chắn
Tính chất này khác quan trọng trong chứng nhận bản quyền, xác thực … Trong thực tế tiêu chí này được đặt nặng trong kĩ thuật gán nhãn thời gian. 
#### Tính bảo mật
Có nhiều cấp độ bảo mật khác nhau, nhưng nhìn chung có 2 cấp độ chính: 
* Người dùng hoàn toàn không biết có sự tồn tại của thông tin mật. 
* Người dùng biết sự tồn tại của thông tin mật, nhưng phải có khóa khi truy cập. 

# Mô hình giấu thông tin tổng quát
![](https://images.viblo.asia/0ef17cc9-e8f2-4747-b3db-6ba2e8474803.png)
### *Ảnh số*
- Điểm ảnh (pixel) là thành phần cơ bản cấu tạo nên ảnh số (digital image). 
- Chỉ có hai trạng thái (0, đen hoặc 1, trắng) cho mỗi điểm ảnh
- Đối với ảnh xám thường có giá trị từ 0 đến 255
- Ảnh màu(biểu diễn bằng 24 bit) là một ma trận có kích thước [M*N]*3 – ba kênh màu gồm đỏ xanh lá và xanh dương
###  *Ảnh đen trắng*
Đó là những bức ảnh mà mỗi điểm ảnh chỉ là những điểm đen hoặc trắng, được quy định bằng một bit. Nếu bit mang giá trị là 0 thì điểm ảnh là điểm đen, còn nếu mang giá trị là 1 thì điểm ảnh là điểm trắng. Do đó để biểu diễn một điểm ảnh đen trắng ta có thể dùng một ma trận nhị phân, là ma trận mà mỗi phần tử chỉ nhận một trong hai giá trị là 0 hoặc 1. 
### *Ảnh màu*
Quá trình giấu tin vào ảnh màu cũng tương tự như với ảnh đen trắng nhưng trước hết ta phải chọn từ mỗi điểm ảnh ra bit có trọng số thấp nhất (LSB) để tạo thành một ảnh nhị phân gọi là ảnh thứ cấp. Sử dụng ảnh thứ cấp này như ảnh môi trường để giấu tin, sau khi biến đổi ảnh thứ cấp ta trả nó lại ảnh ban đầu để thu được ảnh kết quả

> Để thực hiện việc giấu tin trong ảnh, trước hết ta phải nghiên cứu cấu trúc của ảnh và có khả năng xử lý được ảnh tức là phải số hoá ảnh. Quá trình số hoá các dạng ảnh khác nhau và không như nhau. Có nhiều loại ảnh đã được chuẩn hoá như: JPEG, PCX, BMP… Sau đây là cấu trúc ảnh *. BMP
# GIẤU TIN THUẬN NGHỊCH LÀ GÌ?
> Giấu tin thuận nghịch là một kỹ thuật giấu ảnh mà khi tách thông điệp chúng ta có thể khôi phục được ảnh gốc cũng như chất lượng của ảnh gốc đó. Bài viết này sẽ tập trung việc giấu tin thuật nghịch dựa vào biến đổi trên miền WAVELET

Trước tiên, chúng ta cần nắm được một số khái niệm đơn giản là: **LSB** và **NSAS** 
* Bit có trọng số thấp (**LSB- Least significant bit**): Trong một chuỗi bit B, bit ít quan trọng nhất (LSB) của B được định nghĩa là bit đầu tiên từ phải sang trong biểu diễn nhị phân của B, đồng thời cũng là bit đơn vị của B. Bit này cho ta biết tính chẵn lẻ của B và khi nó bị thay đổi sẽ không làm ảnh hưởng nhiều đến giá trị của B. Ngược lại bit có tầm quan trọng nhất là bit đầu tiên tử trái sang trong biểu diễn nhị phân của B. Khi ta thay đổi bit này sẽ ảnh hưởng rất lớn đến giá trị của B. 

* **Giấu tin dùng LSB**: là kĩ thuật giấu đơn giản nhất, ta nhúng trực tiếp các bit của thông điệp cần gửi vào các bit ít quan trọng của ảnh chủ thể. Sự thay đổi các bit ít quan trọng sẽ không tạo ra sự khác biệt mà mắt người có thể nhận ra, nguyên nhân là do biên độ của sự thay đổi nhỏ. Hình 1. 12 minh họa phương pháp giấu dùng LSB trong trường hợp ảnh số. 
Ưu điểm của phương pháp LSB là dễ dàng thực hiện và được sử dụng trong nhiều kĩ thuật khác. Tuy nhiên, hiệu quả của phương pháp này tỉ lệ nghịch với số bit thay thế trong mỗi điểm ảnh và chỉ có thể dừng lại trong khoảng ba bit, nên lượng thông tin nhúng sẽ không được nhiều (chỉ khoảng 20% dung lượng so với ảnh chủ thể). 
Phương pháp BPCS được đề xuất nhằm cải thiện không gian giấu (rất quan trọng trong kĩ thuật steaganography), thay vì chỉ sự dụng một mặt phẳng bit ít quan trọng, ta cần sử dụng cả những mặt phẳng bit khác để nhúng thông tin vào. 
> Để đánh giá chất lượng của bức ảnh ta thường sử dụng hai cách: Sai số bình phương trung bình – MSE (mean square error) và tỉ số tín hiệu trên nhiễu đỉnh – PSNR (pesak to signal to noise ratio). MSE giữa ảnh gốc và ảnh khôi phục được tính như sau: 

Trong đó tổng lấy theo j, k tính cho tổng tất cả các điểm ảnh trong ảnh và
N là số điểm ảnh trong ảnh. Còn PSNR giữa hai ảnh (b bít cho mỗi điểm
ảnh, RMSE là căn bậc 2 của MSE) đước tính theo công thức dB như sau: 
![](https://images.viblo.asia/d70090a1-e02a-4cdf-8eaf-befa34dd70d8.png)

![](https://images.viblo.asia/40067fed-eeb8-4866-87dc-690807972c06.png)

#### *GIẤU TIN NSAS VÀ NSAS CẢI TIẾN* 
> Ý tưởng NSAS : Đề xuất của Ni và các cộng sự (2004) nhúng dữ liệu bằng cách dịch chuyển các biểu đồ tần số. Phương pháp này lần đầu tiên xây dựng 1 biểu đồ ảnh của ảnh gốc để có được 1 điểm cực đại và 1 điểm cực tiểu. Sau đó các dữ liệu nhúng bằng cách di chuyển các biểu đồ tần số. 

> Ý tưởng NSAS cải tiến : Thay vì dịch chuyển tất cả các điểm ảnh giữa điểm cực đại và điểm cực tiểu trước khi nhúng, ta kết hợp sự dịch chuyển và các quá trình nhúng với nhau để chỉ ra số lượng điểm ảnh dịch chuyển cho 1 kích thước dữ liệu nhúng nhất định. Vì vậy không có thêm khoảng trống giữa các điểm ảnh để dịch chuyển so với phương pháp Ni và các cộng sự (2006). 
```
Phần này chủ yếu giới thiệu và đưa ra một số ý tưởng, ứng dụng demo trong link dưới. Phần sau mình sẽ đi chi tiết hơn nữa vào phân tích kỹ thuật này cũng như triển khai lập trình.
```
[Demo (windows)](https://drive.google.com/file/d/0B4nGfPNBpXhXeG5QS0thRmdET0U/view?usp=sharing)