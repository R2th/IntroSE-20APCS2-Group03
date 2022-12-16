© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Software development life cycle (SDLC) từ truyền thống đến hiện đại](https://viblo.asia/s/software-development-life-cycle-sdlc-tu-truyen-thong-den-hien-dai-3m5WB8aQlO7).

Với bài trước, chúng ta đã tìm hiểu về **Waterfall model** thông qua ưu nhược điểm và nỗi đau mà nó đem lại.

Để bớt đau hơn, năm 1986, Barry Boehm phát minh ra **Spiral model** dựa trên yếu tố phát triển mang tính lặp lại (interative) để xây dựng phần mềm. Cùng đi tìm hiểu cụ thể hơn với bài viết này nhé.

## 1) Spiral model
**Spiral model** là sự kết hợp tuyệt vời giữa **Waterfall model** và **Interative development**, đảm bảo 2 yếu tố sau:
- Bao gồm các phase có trong **Waterfall model**.
- Các phase phát triển lặp lại 1 -> 2 -> 3 -> 1 -> 2 ->3...

Nói một cách dễ hiểu, **Spiral model** là một chuỗi các **Waterfall model**. Trong đó, bao gồm các phase:
- Planning.
- Risk analysis.
- Engineering.
- Evaluation.

![](https://i.imgur.com/hHcuwTq.png)

Khi bắt đầu một **iteration** bất kì, input sẽ là output của **iteration** trước đó. Điều quan trọng cần lưu ý là mỗi **iteration** sẽ khác với **iteration** trước đó vì chúng ta đã trải qua nhiều đau thương mất mát, lần sau sẽ cần làm tốt hơn :joy:, hiểu rõ yêu cầu hơn và giảm thiểu rủi ro trong quá trình phát triển. Ngoài ra, **Spiral model** sẽ tích hợp thêm **Risk management** vào mỗi **iteration**, điều mà **Waterfall model** không có.

Cùng đi vào chi tiết từng phase trong mỗi iteration nhé.

### 1.1) Planning
Giống với **Waterfall model**, phase đầu tiên tập trung vào việc thu thập requirement, lên kế hoạch phát triển chi tiết, cụ thể.
Định nghĩa ra các key point mà sản phẩm cần hướng tới để quyết định sự thành bại của dự án.

### 1.2) Risk management
Phase này bao gồm các hoạt động liên quan đến rủi ro như:
- Xác định rủi ro.
- Các bước xử lý và ngăn chặn rủi ro.
- Nếu không ngăn chặn được cần tìm cách giảm thiểu nhất có thể.

Càng với các **iteration** sau, mức độ chi tiết và độ hoàn chỉnh càng cao. Từ đó trực tiếp giảm thiểu các nguy cơ xấu có thể xảy ra với dự án, đảm bảo chất lượng tốt nhất có thể.

### 1.3) Engineering
Phase này là giai đoạn liên quan nhiều đến kĩ thuật, nơi chúng ta thực hiện các hoạt động triển khai phần mềm:
- High level design, low level design, detail design...
- Coding
- Testing
- Deployment

Có thể với **iteration** đầu tiên chỉ tập trung đến design, **iteration** sau sẽ là phát triển và kiểm thử tùy thuộc vào tình hình thực tế của dự án để áp dụng đạt hiệu quả tối đa.

### 1.4) Evaluation
Với phase này, chúng ta sẽ nhận phản hồi từ các bên liên quan về sản phẩm. Sau đó tiến hành phân tích và lập kế hoạch cho **iteration** tiếp theo nếu có.

## 2) Iteration in Spiral model
Với **Sprial model** có 3 iteration, đều có các phase như nhau nhưng mục đích của mỗi iteration lại hướng tới mục tiêu khác nhau.
- **Prototype**: với iteration đầu tiên, chúng ta tập trung vào việc phát triển nhanh nhất có thể với các tính năng cơ bản để sớm nhận được phản hồi từ các bên liên quan.
- **Release candidate**: iteration thứ hai được xây dựng dựa trên iteration đầu tiên và phát triển với mục tiêu đưa ra sản phẩm gần như hoàn thiện cho khách hàng.
- **Lauch**: iteration cuối cùng phát triển với mục tiêu hoàn thiện sản phẩm và đưa ra thị trường. sẵn sàng make money :joy:.

![](https://i.imgur.com/btGl1zn.png)

Tổng kết, **spiral model** có 2 thứ quan trọng cần chú ý:
- Mô hình này đã khởi đầu phong trào phát triển phần mềm với quá trình lặp đi lặp lại. Các qui trình Agile hiện đại ngày nay cũng bắt nguồn trên tư tưởng này.
- Risk driven: việc xác định rủi ro Risk analysis là yếu tố sống còn và rất quan trọng trong mô mình này. Nó trực tiếp giảm nguy cơ thất bại của dự án.

## 3) Ưu điểm
**Spiral model** đã nhận ra nhược điểm của **Waterfall model** và cải tiến nó kết hợp với **Iteration development** để quá trình phát triển phần mềm trở nên linh hoạt hơn. Ưu điểm của mô hình này nằm ở:
- **Risk handling**: như đã trình bày ở trên, mô hình này tập trình rất nhiều vào quản lý rủi ro và cách hạn chế. Do đó, nó phù hợp với các dự án có nhiều rủi ro trong quản trị và vận hành. Tất nhiên dự án nào cũng có rủi ro chỉ là ít hay nhiều mà thôi :joy:.
- **Large project**: vì nó rất mạnh ở vấn đề quản lý rủi ro nên phù hợp với các dự án lớn, độ phức tạp cao. Project càng lớn thì rủi ro càng cao.
- **Interation**: mô hình này linh hoạt hơn **Waterfall model** vì nó áp dụng **iteration model**. Requirement có thể thay đổi, thị trường có thể biến động nhưng **iteration development** giúp chúng xử lý những vấn đề này một cách linh hoạt.

## 4) Nhược điểm
No silver bullet, mô hình nào cũng có ưu điểm và nhược điểm. Với **Spiral model**, một vài nhược điểm dễ dàng nhận thấy như sau:
- **Risk analysis**: sự thành bại của dự án phụ thuộc khá nhiều vào quá trình phân tích và quản lý rủi ro. Nếu không có chuyên môn và kinh nghiệm, khả năng rất cao dự án chỉ **còn cái nịt**.
- **Small project**: chỉ phù hợp với các dự án nhỏ vì chi phí vận hành và phát triển với mô hình này không hề thấp.
- **Time management**: vì tính linh hoạt có thể đáp ứng nhiều sự thay đổi của nó dẫn đến khó quản lý và ước lượng thời gian cần thiết để hoàn thành.

### Reference
Reference in series:  [Software development life cycle (SDLC) từ truyền thống đến hiện đại](https://viblo.asia/s/software-development-life-cycle-sdlc-tu-truyen-thong-den-hien-dai-3m5WB8aQlO7).

### After credit

Các mô hình cũ như **Waterfall** hay **Spiral** vẫn được áp dụng nhưng không nhiều. Thực tế khi triển khai nó bộc lộ rất rõ các nhược điểm. Do đó, Agile methodology ra đời giống như việc con người luôn tiến hóa để trở thành phiên bản tốt hơn. Bài tiếp theo sẽ tập trung vào các mô hình hiện đại ngày nay dựa trên Agile như Kanban, Scrum và Lean.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)