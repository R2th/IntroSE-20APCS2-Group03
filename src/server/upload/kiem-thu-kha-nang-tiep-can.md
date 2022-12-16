## 1. Kiểm tra khả năng tiếp cận là gì?
Kiểm thử khr năng tiếp cận(Accessibility Testing ) được định nghĩa là một loại Kiểm tra phần mềm được thực hiện để đảm bảo rằng ứng dụng đang được kiểm tra có thể sử dụng được bởi những người khuyết tật như thính giác, mù màu, tuổi già và các nhóm thiệt thòi khác. 

Nó là một tập hợp con của Kiểm tra khả năng sử dụng.
![](https://images.viblo.asia/2487b3c4-e48a-44aa-9a94-e1a4abc6996b.jpg)

Người khuyết tật sử dụng công nghệ hỗ trợ giúp họ vận hành sản phẩm phần mềm. Ví dụ về phần mềm này đó là:

Phần mềm nhận dạng giọng nói: Nó sẽ chuyển đổi từ được nói thành văn bản, dùng làm đầu vào cho máy tính.

Phần mềm đọc màn hình: Được sử dụng để đọc văn bản được hiển thị trên màn hình

Phần mềm phóng to màn hình: Được sử dụng để phóng to màn hình và giúp người dùng bị khiếm thị dễ đọc.

Bàn phím đặc biệt được thiết kế dành cho người dùng dễ dàng đánh máy, những người gặp khó khăn trong việc điều khiển động cơ.

## 2. Lý do nên kiểm thử khả năng tiếp cận
### Lý do 1: Tiếp cận thị trường người khuyết tật:
Khoảng 20% dân số là những người khuyết tật. 
* Cứ 10 người lại có 1 người khuyết tật nặng. 
* Cứ 2 người lại có 1 người trên 65 tuổi suy giảm các chức năng. 

Định nghĩa khuyết tật bao gồm mù, điếc, tật nguyền hoặc có bất cứ rối loạn nào trong cơ thể. Một sản phẩm phần mềm có thể phục vụ cho thị trường lớn này nếu nó tạo ra được sự thân thiện với người khuyết tật. Các vấn đề trợ năng trong phần mềm có thể được giải quyết nếu Kiểm thử khả năng tiếp cận trở thành một phần của vòng đời kiểm thử phổ thông nói chung.

### Lý do 2: Tuân thủ luật pháp về khả năng tiếp cận
Các cơ quan chính phủ trên toàn thế giới đã đưa ra các quy phạm pháp luật đòi hỏi các sản phẩm CNTT phải có khả năng tiếp cận được với người tàn tật. 

Dưới đây là các quy định pháp lý của các chính phủ về luật khả năng tiếp cận: 
* Hoa Kỳ: Đạo luật người Mỹ và các hành vi tiếp cận - 1990 
* Vương quốc Anh: Đạo luật về Phân biệt hành vi Khuyết tật - 1995 
* Úc: Đạo luật về Phân biệt hành vi Khuyết tật - 1992 
* Ireland: Luật Người khuyết tật 2005 
Như vậy, kiểm thử tiếp cận rất quan trọng để đảm bảo tuân thủ pháp luật.

### Lý do 3: Tránh các vụ kiện ngoài ý muốn:
Trước đây, các công ty thuộc Fortune 500 đã bị kiện vì sản phẩm của họ không thân thiện với người khuyết tật. Dưới đây là một vài trường hợp nổi bật: 
* Liên đoàn Người khiếm thị Quốc gia (NFB) vs Amazon (2007)
* Sexton và NFB vs Target (2007) 
* Giải quyết giữa NFB Vs AOL (1999)
Điều tốt nhất là tạo ra những sản phẩm hỗ trợ người khuyết tật và tránh các vụ kiện ngoài ý muốn.

## 3. Khuyết tật nào được hỗ trợ
Ứng dụng phải hỗ trợ những người khuyết tật như –


| Loại khuyết tật    | Mô tả khuyết tật | 
| ---------------| ----------------- |
| Khuyết tật thị lực   |-  Mù hoàn toàn hoặc mù màu hoặc thị lực kém - Các vấn đề về thị giác như nhấp nháy hình ảnh và các vấn đề về hiệu ứng nhấp nháy  | 
| Khuyết tật về thể chất     | - Không thể sử dụng chuột hoặc bàn phím bằng một tay.- Kỹ năng vận động kém như cử động tay và cơ bắp chậm chạp     | 
| Khuyết tật nhận thức	     | Khó khăn trong học tập hoặc Trí nhớ kém hoặc không thể hiểu các tình huống phức tạp hơn     | 
| Khuyết tật biết chữ	     | Đọc các vấn đề     | 
| Khuyết tật thính giác	     | - Các vấn đề về thính giác như điếc và khiếm thính - Không thể nghe hoặc không thể nghe rõ     | 


## 4. Checklist kiểm tra khả năng tiếp cận

Những điểm dưới đây cần được kiểm tra cẩn thận cho ứng dụng được sử dụng bởi tất cả người dùng:

* Đối với mỗi hoạt động của chuột, phím điều khiển hoặc cửa sổ, phải có bàn phím ảo hiển thị.

* Hướng dẫn sử dụng phải được cung cấp kèm theo phần mềm hoặc ứng dụng bằng ngôn ngữ đơn giản và dễ hiểu được hỗ trợ kèm theo hình ảnh ở những nơi cần thiết.
 
* Người dùng có thể di chuyển giữa các điều khiển và đối tượng bằng nút tab. Chuyển động nên tuần tự hoặc logic với một dòng chảy liền mạch.
 
* Người dùng phải có thể điều hướng trong ứng dụng bằng các phím tắt tiêu chuẩn, đặc biệt là đối với các mục menu.
 
* Ứng dụng phải hỗ trợ tất cả hoặc các hệ điều hành được sử dụng phổ biến nhất.
 
* Việc lựa chọn hình ảnh và hình ảnh trong ứng dụng phải phù hợp và dễ hiểu đối với người dùng.
 
* Nếu có các tùy chọn âm thanh và video, thì người dùng cũng có thể kiểm soát chúng.
 
* Người dùng có thể thay đổi phông chữ và âm thanh mặc định theo nhu cầu và yêu cầu của mình.
 
* Sơ đồ màu của ứng dụng phù hợp và dễ đọc đối với tất cả người dùng. 
* Đảm bảo nội dung âm thanh và video rõ ràng và dễ hiểu đối với người khuyết tật.
 
Mặc dù danh sách này chưa hết, nhưng nó vẫn là điểm khởi đầu cho quá trình kiểm tra khả năng truy cập ứng dụng của bạn. Có thể có nhiều điểm được thêm cụ thể vào ứng dụng đang thử nghiệm (AUT)

## Tài liệu tham khảo:

https://www.guru99.com/accessibility-testing.html