© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Software development life cycle (SDLC) từ truyền thống đến hiện đại](https://viblo.asia/s/software-development-life-cycle-sdlc-tu-truyen-thong-den-hien-dai-3m5WB8aQlO7).

Software development life cycle (SDLC) là gì, vì sao các developer chúng ta cần quan tâm, nó có đem lại lợi ích gì không?

SDLC là quy trình phát triển phần mềm đảm bảo cân bằng được **3 yếu tố**:
> - **Chất lượng** tốt nhất.
> - **Chi phí** thấp nhất.
> - **Thời gian** ngắn nhất.

Khá giống với **ngon, bổ, rẻ** :joy:. 

Một quy trình cơ bản bao gồm các thành phần:
> - Kế hoạch phát triển.
> - Kế hoạch bảo trì.
> - Kế hoạch nâng cấp/thay thế phần mềm.

Và các giai đoạn phát triển:
> - Lập kế hoạch.
> - Thiết kế.
> - Phát triển/Thực thi.
> - Kiểm thử.
> - Triển khai.

Các developer như chúng ta không chỉ làm bạn với các dòng code mà còn làm việc với đồng nghiệp, quản lý cấp trên hoặc nhân sự cấp dưới, thậm chí là khách hàng.

Do đó, việc nắm rõ quy trình phát triển sản phẩm sẽ có một vài lợi ích sau:
> - Hiểu các bước, quy trình để phát triển một sản phẩm.
> - Từ các bước đó, biết cách phối hợp nhịp nhàng với đồng nghiệp, với team để làm việc hiệu quả với mục đích đạt được **3 yếu tố** trên.
> - Nâng cao kiến thức, giá trị bản thân, tiến tới PM hoặc đơn giản là dễ dàng deal lương :joy:.

## 1) Waterfall model
**Waterfall model** được coi là mô hình đầu tiên, lâu đời nhất trong phát triển phần mềm. Vì là đầu tiên nên rất dễ hình dung, tiếp cận và áp dụng.

![](https://i.imgur.com/eBARRsy.png)

Mô hình này được gọi là **Waterfall model (mô hình thác nước)** vì nó được thực hiện một chiều từ trên xuống dưới. Các bước nói chung được gọi là **phase**, với Waterfall model, output của phase trước là input của phase sau:
- **Requirement**: với phase đầu tiên là thu thập và xác định yêu cầu từ khách hàng, hoặc của sản phẩm mà chúng ta phát triển.
- **Analysis & Design**: sau khi có requirement sẽ tiến hành phân tích logic, nghiệp vụ và thiết kế hệ thống.
- **Development**: khi có design cụ thể, tiến hành implement, nói một cách gần gũi là viết code cho ứng dụng.
- **Testing**: sau khi ứng dụng phát triển xong cần tiến hành kiểm thử, phát hiện và fix bug nếu có. Sẽ có quá trình lặp lại **Development** và **Testing** nhằm mục đích phát triển sản phẩm tốt nhất có thể.
- **Operation & Maintenance**: cuối cùng là vận hành sản phẩm, release cho người dùng. Ngoài ra bao gồm các công đoạn như bảo trì hoặc nâng cấp phần mềm.

Nguồn gốc của Waterfall model bắt nguồn từ.. quy trình sản xuất sản phẩm :joy:. Khi nói đến ngành công nghiệp sản xuất, ta thường nghĩ đến các nhà máy sản xuất các sản phẩm giống nhau theo một cách nhất quán, có quy trình từng bước. Tất cả các yêu cầu, thiết kế đều được lập kế hoạch chi tiết và phạm vi công việc gần như cố định. 
- Quá trình sản xuất đều được tự động hóa bao gồm các danh mục, quy trình và công cụ cũ ràng: **checklist, process and tools**.
- Dựa trên mô hình chung output của phase trước là input của phase sau. Nếu trong một phase xảy ra lỗi, nó sẽ ảnh hưởng đến toàn bộ các phase sau. Ví dụ với nhà máy sản xuất mì tôm, nếu thay đổi yêu cầu từ mì tôm bò sang mì tôm gà sẽ ảnh hưởng đến tất cả các công đoạn phía sau như thiết kế bao bì, cách pha chế gia vị và cách kiểm tra sản phẩm. Chi bằng sản xuất cả 2 loại mì :joy:, nhưng với phần mềm thì không làm 2 loại được.
- Vì lý do đó, phạm vi và yêu cầu của dự án nếu có thay đổi cần ít nhất có thể, và thường fixed scope để không ảnh hưởng đến các phase sau.
- Ngoài ra, các dự án sử dụng Waterfall model cần có quy trình rất rõ ràng và các tài liệu cực kì chuẩn chỉ.

Lưu ý, nhiều Waterfall model có thêm hoặc bớt các phase tùy thuộc vào từng dự án nhưng tựu chung lại bao gồm các phase cơ bản trên.

## 2) Sự thật đau khổ
Sau khi hiểu được **Waterfall model**, chúng ta hình dung được vài sự thật đau khổ khi áp dụng vào quá trình phát triển phần mềm:
- Vấn đề đầu tiên là **không đem lại nhiều giá trị (late of business value)** trong khoảng thời gian đầu. Cần chờ ít nhất cho đến khi quá trình kiểm thử đầu tiên hoàn thành để đảm bảo phần mềm chạy được các case cơ bản và không gặp lỗi. Tuy nhiên mọi thứ vận động không ngừng, trong một thời gian ngắn sản phẩm đang làm có thể không còn là xu hướng và nhu cầu cần thiết của thị trường. **Nó có thể dẫn tới việc sản phẩm fail hoàn toàn mặc dù đã tiêu tốn nhiều thời gian, công sức và tiền bạc*.
- Vấn đề thứ hai liên quan đến việc **thay đổi requirement** không linh hoạt. Với phát triển phần mềm, mọi thứ đều thay đổi chóng mặt từ môi trường làm việc, con người, kĩ năng cá nhân.. và đặc biệt là **requirement** để phù hợp với nhu cầu thị trường. Do đó, **việc thay đổi requirement với Waterfall model là rất hạn chế** nếu bạn không muốn công sức đổ sông đổ bể.

Phát triển phần mềm vốn dĩ là những quá trình lặp đi lặp lại, không giống với việc sản xuất một thùng mì gói. Việc chú trọng vào các checklist hoặc sự kiểm soát không giúp ích được gì. 

Phát triển phần mềm lấy con người làm trung tâm, phụ thuộc vào khả năng phán đoán và sáng tạo của chúng ta. Do đó, không dễ thành công nếu áp dụng Waterfall model vào phát triển phần mềm.

## 3) Khi nào không đau khổ
Tất nhiên, không thể cứ chê **Waterfall model** mãi được. Nó cũng có những ưu điểm và phù hợp riêng cho từng dự án:
- Các dự án nhỏ với hệ thống đơn giản và thời gian phát triển ngắn. Requirement rõ ràng, mang tính ổn định cao.
- Các dự án maintain cũng có thể áp dụng mô hình này tuy nhiên đội ngũ developer cần có kiến thức về domain đủ sâu.

### Reference
Reference in series:  [Software development life cycle (SDLC) từ truyền thống đến hiện đại](https://viblo.asia/s/software-development-life-cycle-sdlc-tu-truyen-thong-den-hien-dai-3m5WB8aQlO7).

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)