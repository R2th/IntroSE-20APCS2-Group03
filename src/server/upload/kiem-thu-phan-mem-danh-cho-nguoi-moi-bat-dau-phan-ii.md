Ở phần I, chúng ta đã trả lời được câu hỏi Kiểm thử phần mềm là làm những công việc gì?

Trong phần II này, tôi sẽ chia sẻ với các bạn về hai đối tượng quan trọng bậc nhất trong kiểm thử phần mềm đó là Testing and Debugging hay còn gọi là Kiểm thử và Gỡ lỗi.

Nói cách khác, kiểm thử là cố gắng tìm ra lỗi phần mềm (BUG) và gỡ lỗi chính là tìm cách khắc phục, sửa chữa các lỗi đó

Phần II này, chúng ta sẽ tìm hiểu kỹ về BUG - lỗi phần mềm và cái giá phải trả nếu phần mềm xảy ra BUG

# I. Bug là gì?
BUG là lỗi hoặc sai sót khi chương trình phần mềm được tạo ra nhưng kết quả không giống như dự kiến mong muốn hoặc không chính xác. Nó khiến phần mềm bị ngăn cặn không thực hiện giống đặc tả và yêu cầu của phần mềm.
Trong kiểm thử phần mềm, có khá nhiều khái niệm liên quan đến lỗi này hay lỗi kia, tùy từng trường hợp mà người ta gọi nó bằng những cái tên như sau:
- Bug (lỗi)
- Defect (khiếm khuyết)
- Failure (thất bại)
- Error
- Problem
- Issue
- ...

Tuy nhiên, hầu hết chúng ta chỉ quan tâm tới 3 khái niệm cơ bản đó chính là Bug, Defect và Failure
Mối liên hệ của chúng có thể hiểu nôm na dựa và sơ đổ đơn giản sau: BUG -> DEFECT -> FAILURE
Cụ thể: 
* Trong quá trình thiết kế và xây dựng phần mềm, người lập trình có mắc các lỗi nhất định tại màn hình hay chức năng nào đó. Điều đó có nghĩa là đã xuất hiện lỗi trong phần mềm.
* Các màn hình/chức năng xuất hiện lỗi, thì bản thân chúng đang tồn tại những khiếm khuyết
* Nếu trong môi trường và tình huống lỗi nhất định trong ứng dụng hoặc sản phẩm được thực thi thì hệ thống sẽ tạo ra kết quả sai. Đây chính là thất bại của phần mềm

Vậy, chúng ta đặt câu hỏi? BUG đó từ đâu ra?

# II. Nguyên nhân phát sinh bug  trong phần mềm
Có rất nhiều nguyên nhân gây phát sinh bug tại mỗi giai đoạn phát triển của phần mềm, nó được biểu thị qua hình minh họa dưới đây:

![](https://images.viblo.asia/bc8832af-b740-4b05-bce5-9fb623c8a95c.gif)

Từ hình ảnh mình họa, chúng ta dễ dàng nhận thấy Bug phát sinh theo từng giai đoạn phát triển phần mềm và tỷ lệ phát sinh bug giảm dần từ giai đoạn đặc tả yêu cầu đến coding. Tại mỗi giai đoạn đều có những nguyên nhân cụ thể dẫn đến phát sinh bug.

## 1. Giai đoạn đặc tả yêu cầu phần mềm:
* Yêu cầu không có trong tài liệu đặc tả
* Yêu cầu có trong tài liệu đặc tả nhưng quá sơ sài và không kỹ lưỡng dẫn đến người đọc không hiểu rõ hoặc hiểu sai yêu cầu
* Yêu cầu được thay đổi nhưng lại không được cập nhật vào tài liệu đặc tả
* Trong quá trình xây dựng tài liệu đặc tả, khách hàng và team phát triển không thực hiện tốt việc giao tiếp dẫn đến team phát triển hiểu thiếu hoặc hiểu sai ý khách hàng
- Đây là giai đoạn mà khả năng phát sinh bug nhiều nhất bởi vì nó là giai đoạn đầu của quá trình phát triển, là giai đoạn hình thành và phân tích ý tưởng, khi mà mọi thứ còn mơ hồ với cả khách hàng và team vè sản phẩm phần mềm sẽ được tạo ra nên tỷ lệ sai sót xảy ra là rất rất cao

## 2. Giai đoạn thiết kế
* Người đảm nhận công việc thiết kế thực hiện quá vội vàng và không kỹ lưỡng theo các yêu cầu đặc tả
* Trong quá trình thiết kê, yêu cầu đặc tả bị thay đổi và dù nó đã được cập nhật trong tài liệu nhưng lại không được chỉnh sửa trong bản thiết kế
* Việc giao tiếp không tốt trong giai đoạn này lại một lần nữa là nguyên nhân gây phát sinh bug

## 3. Giai đoạn coding
* Độ phức tạp của phần mềm khiến cho người lập trình không thể hiểu rõ từng yêu cầu chức năng hoặc sự liên quan giữa các chức năng khiến cho bug phát sinh
* Đây là giai đoạn bắt đầu phát sinh những áp lực về mặt thời gian, công việc phải theo đúng lịch trình, deadline release mỗi function ... khiến cho lập trình viên không thể thực hiện một cách kỹ lưỡng và dành thời gian kiểm tra
* Một số sai lầm không đáng có đến từ các lập trình viên đến từ sự chủ quan
* Tài liệu đặc tả và tài liệu thiết kế kém chất lượng dẫn đến lập trình sai sót (sai từ gốc)

## 4. Những nguyên nhân khác
Ngoài ra còn rất nhiều nguyên khác dẫn đến việc phát sinh bug trong phần mềm như:
* Phần mềm đòi hỏi áp dụng công nghệ khó, trình độ lạp trình viên không đáp ứng được hết
* Hạn chế của các ngôn ngữ lập trình
* Ngôn ngữ lập trình thay đổi và phát triển nhanh chóng khiến phần mêm không theo kịp công nghệ
* Lỗi của bên thứ ba
* Và rất nhiều những nguyên nhân khác

# III. Chi phí cho các lỗi phần mềm

Trong quá trình phát triển phần mềm, chúng ta luôn phải quan niệm rằng: cẩn thận một khâu chính là một lần tiết kiệm chi phí lớn. Diều đó có nghĩa là nếu bạn tìm thấy một lỗi muộn trong chu kỳ phát triển, nó sẽ gây hại cho dự án hơn là một lỗi được tìm thấy trước đó.

## 1. Có một lỗi phần mềm có chi phí?

* Các lỗi phần mềm được phát hiện ở các giai đoạn khác nhau của Vòng đời phát triển phần mềm (SDLC) có các tác động tiêu cực và chi phí khác nhau đối với dự án. 
* Nếu bạn tuân theo vòng đời phát triển phần mềm chính xác (SDLC), việc có một phần mềm không có lỗi đáng tin cậy và dễ dàng hơn sẽ trở nên dễ dàng hơn. 
* Tuy nhiên, nó không đảm bảo rằng phần mềm sẽ không có lỗi. Một trong những mối quan tâm chính của tất cả các công ty phần mềm là giảm thời gian phát hành phần mềm. 
* Kiểm thử đôi khi được xem như một hoạt động làm tăng thời gian phát hành phần mềm và kết quả là nhận thức tiêu cực. 
* Thật không may, một số ít các tổ chức ít chú ý đến hoạt động quan trọng này và cung cấp chất lượng dịch vụ phần mềm thấp.
* Chi phí liên quan đến việc phát hiện và sửa chữa các khiếm khuyết tăng đáng kể trong suốt vòng đời, nếu chúng không được khắc phục đúng hạn. 
* Nói tóm lại, chi phí của một lỗi tăng theo cấp số nhân khi phần mềm tiến triển dọc theo SDLC.

Ví dụ 1:
Nếu phát hiện ra lỗi trong giai đoạn yêu cầu, chi phí có thể là 1 đô la. 
Nếu nó được phát hiện trong giai đoạn thiết kế, chi phí sẽ tăng lên $ 10, $ 100 trong quá trình mã hóa và $ 1000 trong quá trình thử nghiệm. 
Nếu bạn phát hiện ra một vấn đề ngay lập tức, nó có thể tiết kiệm thêm công việc sau này, như được mô tả trong hình ảnh dưới đây:

![](https://images.viblo.asia/312d9f43-bffd-4f15-91af-ab0f3cf1a4dc.jpg)

Ví dụ 2:

![](https://images.viblo.asia/7817c5bc-e540-402c-bef0-af759ac5db16.jpg)

Tất cả chúng ta đã nghe về trường hợp khét tiếng của điện thoại thông minh Samsung Galaxy Note 7 và tất cả các vụ nổ của điện thoại. 
Samsung đã phải chịu chi phí 17 tỷ USD cho lỗi này. 
Không chỉ tốn rất nhiều tiền mà cả danh tiếng của Samsung cũng bị ảnh hưởng nặng nề. 
Nếu họ đã phát hiện ra lỗi trước đó, nó sẽ giúp họ tiết kiệm rất nhiều tiền.

## 2. Một số thiệt hại nghiêm trọng có thể gây ra nếu bạn bỏ qua kiểm tra phần mềm được liệt kê bên dưới:
* Chất lượng phần mềm thấp hơn
* Sự gia tăng chi phí gián tiếp phát sinh đối với việc đảm bảo chất lượng do lỗi phần mềm được phát hiện sau trong chu kỳ phát triển
* Mất khách hàng, niềm tin và hình ảnh thương hiệu của nhà cung cấp phần mềm. Một trong những mất mát lớn nhất của chất lượng xấu là danh tiếng. Ngoài việc mất tiền, nhà cung cấp phần mềm còn mất hỗ trợ từ khách hàng
* Do đó, nên bắt đầu thử nghiệm sớm trong chu kỳ phát triển. CÀNG SỚM CÀNG TỐT

# IV. Quản lý chất lượng phần mềm tránh phát sinh BUG và hạn chế CHI PHÍ

Trong quá trình phát triển phần mềm, chúng ta có công thức liên hệ chặt chẽ giữa kiểm thử phần mềm và đảm bảo chất lượng phần mềm như sau:

**Quản lý chất lượng = Đảm bảo chất lượng (Quality Assurance - QA)  + Kiểm soát chất lượng (Quality Control - QC) **

- Đảm bảo chất lượng tập trung vào quy trình
- Kiểm soát chất lượng tập trung vào sản phẩm, dự án
- Kiểm thử phầm mềm là một phần của đảm bảo chất lượng phần mêm

## 1. Đảm bảo chất lượng là gì?

![](https://images.viblo.asia/05f9fe9e-d013-481b-9a5a-55b257590b74.jpg)

* Đảm bảo chất lượng viết tắt là QA.
* Là tập trung vào chất lượng của quy trình phát triển sản phẩm để tránh những sai lầm trong sản phẩm hoặc dịch vụ của dự án và do đó ngăn ngừa các vấn đề cho các bên liên quan của bạn. 
* Nó bao gồm các công việc: lên kế hoạch, thực hiện, kiểm tra và hành động
Cụ thể:
* **Kế hoạch** - Tổ chức nên lập kế hoạch và thiết lập các mục tiêu liên quan đến quy trình và xác định các quy trình được yêu cầu để cung cấp một sản phẩm chất lượng cao.
* **Thực hiện** - Phát triển và thử nghiệm các Quy trình và cũng "thay đổi" trong các quy trình
* **Kiểm tra** - Giám sát các quy trình, sửa đổi các quy trình và kiểm tra xem nó có đáp ứng các mục tiêu được xác định trước không
* **Hành động** - Thực hiện các hành động cần thiết để đạt được các cải tiến trong quy trình

### Nguyên tắc đảm bảo chất lượng
Có hai nguyên tắc để đảm bảo chất lượng. 
* Một là phù hợp với mục đích, có nghĩa là sản phẩm hoặc dịch vụ đáp ứng mục đích của nó. 
* Hai là, ngay lần đầu tiên, ngay lập tức, trong đó bất kỳ sai lầm nào chúng đều phải được xử lý kịp thời.

*Với hai nguyên tắc trên, mục tiêu là làm cho sản phẩm hoặc dịch vụ hoạt động chính xác mọi lúc thông qua việc quản lý các biến trong dự án. Để làm như vậy, đảm bảo chất lượng liên quan đến việc quản lý chất lượng của nguyên liệu thô, lắp ráp, sản phẩm và các thành phần; dịch vụ liên quan đến sản xuất; và quá trình quản lý, sản xuất và kiểm tra.*

## 2. Kiểm soát chất lượng là gì?

* Kiểm soát chất lượng phổ biến viết tắt là QC. 
* Đây là một quy trình Kỹ thuật phần mềm được sử dụng để đảm bảo chất lượng trong sản phẩm hoặc dịch vụ. 
* Nó không đối phó với các quy trình được sử dụng để tạo ra một sản phẩm; thay vào đó, nó kiểm tra chất lượng của "sản phẩm cuối" và kết quả cuối cùng.

### Mục đích chính của kiểm soát chất lượng
* Là kiểm tra xem các sản phẩm có đáp ứng các thông số kỹ thuật và yêu cầu của khách hàng hay không. 
* Nếu một vấn đề được xác định, nó cần được sửa chữa trước khi giao cho khách hàng.
* QC cũng được đánh giá về  mức chất lượng kỹ năng của họ và được đào tạo các chứng chỉ. 
* Đánh giá này là cần thiết cho tổ chức dựa trên dịch vụ để góp phần cung cấp dịch vụ "hoàn hảo" cho khách hàng.

## 3. Sự khác biệt giữa Đảm bảo chất lượng và Kiểm soát chất lượng

![](https://images.viblo.asia/3c8c725d-ec5f-48f2-9be0-c1ab8a4cacdf.png)

Đôi khi, QC bị nhầm lẫn với QA. 
Kiểm soát chất lượng là kiểm tra sản phẩm hoặc dịch vụ và kiểm tra kết quả. 
Đảm bảo chất lượng là kiểm tra các quy trình và thực hiện các thay đổi đối với các quy trình dẫn đến sản phẩm cuối cùng.



| Hoạt động kiểm soát chất lượng | Hoạt động đảm bảo chất lượng | 
| -------- | -------- | 
| Hướng dẫn     | Kiểm toán chất lượng     |
| Kiểm tra     | Định hướng quy trình sản xuất     |
| Xét duyệt     | Nhận dạng và lựa chọn công cụ     |
| Tổng hợp các điểm cần cải thiện     | Đào tạo về tiêu chuẩn và quy trình chất lượng     |

## 4. Sự khác biệt giữa Đảm bảo chất lượng và Kiểm thử

| Đảm bảo chất lượng | Kiểm thử phần mềm | 
| -------- | -------- | 
| Đảm bảo chất lượng phần mềm là về quy trình kỹ thuật đảm bảo chất lượng     | Kiểm thử phần mềm là kiểm tra sản phẩm để phát hiện sự cố trước khi sản phẩm đi vào hoạt động    |
|  Liên quan đến các hoạt động liên quan đến việc thực hiện các quy trình, thủ tục và tiêu chuẩn. Ví dụ - Đào tạo kiểm toán  | Liên quan đến kích hoạt liên quan đến xác minh sản phẩm Ví dụ - Kiểm tra đánh giá     |
| Tập trung vào quy trình   | Tập trung vào sản phẩm    |
| Kỹ thuật phòng ngừa     | Kỹ thuật khắc phục     |
| Biện pháp chủ động     | Biện pháp phản ứng     |
| Phạm vi của SQA được áp dụng cho tất cả các sản phẩm sẽ được tạo bởi tổ chức    | Phạm vi kiểm thử phần mềm áp dụng cho một sản phẩm cụ thể đang được thử nghiệm.    |

Nguồn:
Sách Software Testing: An ISTQB-BCS Certified Tester Foundation guide, xuất bản lần thứ 4

Nhóm tác giả: Brian Hambling, Peter Morgan, Angelina Samaroo, Geoff Thompson, Peter Williams