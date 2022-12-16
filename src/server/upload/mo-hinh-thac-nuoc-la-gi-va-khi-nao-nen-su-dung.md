![](https://images.viblo.asia/26474432-60fc-4a26-b34a-8d1d8d8d0a3b.png)
Lần đầu tiên được được đưa ra bởi tiến sĩ Winston W.Royce trong một bài báo công bố vào năm 1970, Mô hình thác nước diễn tả một quá trình phát triển phần mềm. Mô hình thác nước chú trọng vào sự tiến triển logic của các bước được thực hiện trong suốt vòng đời phát triển của một phần mềm(software development life cycle-SDLC), giống như các bước mà một dòng nước đổ xuống một dòng thác . Mặc dù sự phổ biến của mô hình này đã giảm nhiều trong vài năm trở lại đây khi các phương pháp linh hoạt(Agile) hơn được ưa chuộng, tính logic tự nhiên của quá trình tuần tự được sử dụng trong phương pháp này là không thể phủ nhận, và nó vẫn là một quá trình thiết kế thông dụng trong ngành CNTT.

**Một vài mô hình SDLC khác:**
| Phát triển ứng dụng nhanh | Phát triển hướng kiểm tra | Vòng đời phát triển phần mềm |
| -------- | -------- | -------- |
| Mô hình phát triển lặp     | Lập trình cực độ     | Khung Agile Scaled     |
| Mô hình Agile     | Scrum    | Quy trình hợp nhất Rational     |
| Mô hình Big Bang     | Mô hình chữ V     | Mô hình khái niệm     |
| Mô hình Kaizen     | Mô hình Kanban    | Mô hình xoắn ốc     |

## **6 pha của mô hình thác nước**
Ứng dụng thực mô hình thác nước trong một dự án là một quá trình khá rõ ràng, phần lớn nhờ vào đặc điểm tuần tự từng bước một của chính mô hình này. Tùy thuộc vào developer (hay vào thời điểm)mà có vài khác biệt nhỏ trong những con số và chi tiết của các bước trong môt hình thác nước. Nhưng trong phần lớn  thì mọi ý niệm đều giống nhau và có một tầm nhìn rộng gồm các bước cần làm với một ý tưởng và phát triển một ứng dụng hoàn thiện.

**Xác định các yêu cầu:** Với pha đầu tiên, những yêu cầu có thể có của một ứng dụng được phân tích một cách có hệ thống nhằm mục đích tạo ra một tài liệu cụ thể phục vụ cho quá trình phát triển trong tương lai. Kết quả cần đạt được trong pha này một tài liệu mô tả các yêu cầu xác định ứng dụng sẽ hoạt động những gì, nhưng không cụ thể nó sẽ hoạt động như thế nào.

**Phân tích:** Trong pha tiếp theo, hệ thống được phân tích để có thể tạo ra một mô hình và logic của hệ thống phù hợp mà sẽ được sử dụng trong ứng dụng.

**Thiết kế:** Pha này phần lớn giải quyết các yêu cầu thiết kế về kỹ thuật, như ngôn ngữ lập trình, tầng dữ liệu, dịch vụ,…Một bản thiết kế điển hình sẽ được hoàn thành một cách càng cụ thể càng tốt. Nó sẽ mô tả chính xác logic của hệ thống được đề cập trong phần phân tích sẽ được thực thi như nào.

**Viết mã:** Công việc viết mã cuối cùng được thực hiện ở pha thứ tư này, nó sẽ thực thi toàn bộ các mô hình, logic của hệ thống, và các dịch vụ tích hợp đã được làm rõ trong các pha trước.

**Kiểm thử:** Tại pha thứ năm, QA, Beta tester, và tất cả các Tester sẽ tìm kiếm vào báo cáo các lỗi trong hệ thống mà cần được xử lý. Thông thường khi pha này sẽ có một vài công việc lặp lại(nhưng cần thiết) của pha Viết mã, nhằm mục đích các lỗi kỹ thuật được phát hiện sẽ được giải quyết triệt để.  

**Vận hành:** Cuối cùng, ứng dụng sẽ được triển khai trong môi trường thực tế. Tuy nhiên, pha vận hành không chỉ là công việc đưa dự án ra triển khai, nó còn bao gồm việc hộ trợ và bảo trì để giữ ứng dụng luôn hoạt động tốt và được cập nhật.

## **Ưu điểm của mô hình thác nước**
Dù mô hình thác nước đã dần dần biến mất trong vài năm trở lại đây nhường chỗ cho các mô hình linh hoạt(agile) hơn, nó vẫn đem lại một số lợi ích, đặc biệt trong các dự án và tổ chức lớn mà cần các giai đoạn và hạn hoàn thành của công việc nằm trong những thác nước này.

**Thích nghi tốt với những nhóm linh hoạt:** Dù không chỉ mình mô hình thác nước có ưu điểm này, ứng dụng nó giúp toàn bộ dự án được duy trì kỹ càng, có mục tiêu bao quát và thiết kế có cấu trúc nhờ vào việc phác thảo và pha tài liệu hóa từ trước. Điều này rất phù hợp với những nhóm lớn mà thường có các thành viên rời khỏi hoặc tham gia mới trong các chu trình sống của dự án. Nó cho phép thiết kế cốt lõi của dự án được đặt chủ yếu trong một tài liệu cụ thể, chứ không chỉ ở một thành viên nào đó của nhóm.

**Áp đặt một tổ chức có kết cấu chặt chẽ:** Điều này có thể bị coi là gánh nặng hơn là một lợi thế, nhưng sự thật là để duy trì mô hình thác nước bắt dự án, và thậm chí cả tổ chức xây dựng một dự án vô cùng chính xác, tuân nghiêm ngặt theo thiết kế và cấu tạo của nó. Những dự án lớn sẽ cần bao gồm những tiến trình cụ thể để quản lý toàn bộ khía cạnh của dự án, từ thiết kế và phát triển đến kiểm thử và triển khai.

**Cho phép những thay đổi thiết kế sớm:** Mặc dù sẽ rất khó để thay đổi thiết kế ở những giai đoạn sau, phương pháp thác nước giúp triển khai các thay đổi ở đầu vòng đời của ứng dụng khá dễ dàng. Vì chưa hề có mã hay bất cứ triển khai nào ở giai đoạn này, việc chỉnh sửa các tài liệu trở nên nhanh chóng và vô cùng đơn giản.

**Thích hợp cho những dự án theo hướng đến mốc:** Khi ứng dụng cấu trúc tuần tự của mô hình thác nước, những dự án sẽ rất phù hợp với những tổ chức vào nhóm hoạt động tốt dựa chủ yếu vào các mốc hoặc ngày. Với các pha rõ ràng và cụ thể, các thành viên trong nhóm có thể dễ dàng hiểu và chuẩn bị cho nó. Việc có một lịch trình cho toàn bộ quá trình và đề ra một vài thời điểm cụ thể hay dấu mốc quan trọng cho từng giai đoạn cũng đơn giản hơn. Tất nhiên điều này không có nghĩa rằng phát triển phần mềm thì không xảy ra chậm trễ, nhưng mô hình thác nước sẽ thích hợp cho những dự án có hạn chót hoàn thành.

## **Nhược điểm của mô hình thác nước**
Mặc dù một vài khi tiến sĩ Royce lần đầu công bố, mô hình thác nước được coi là một đột phát lớn ở năm 1970. Sau hơn bốn thế kỷ, một vài nhược điểm lớn đã thể hiện vì sao mô hình khó còn đáng mong đợi như kỳ vọng và bị thay thế bởi các mô hình Agile như ngày nay.

**Ràng buộc thiết kế thích ứng kém:** Mặc dù có thể viết hẳn một quyển sách viết riêng về chủ đề này, thiếu sót quan trọng nhất của mô hình thác nước là khả năng thích ứng trước thay đổi trong toàn bộ vòng đời phát triển. Khi việc kiểm thử ở pha thứ năm phát hiện ra một số lỗi ở phần thiết kế hệ thống, nó không chỉ yêu cầu một bước lùi lớn về các bước cũ, trong một vài trường hợp còn phá hủy tính thống nhất của toàn bộ hệ thống. Trong khi phần lớn các nhóm và lập trình viên có kinh nghiệm sẽ rất khó để xảy ra những phát hiện muộn màng như vậy ngay từ đầu, tình trạng này vẫn có thể xảy ra, đặc biệt khi là các pha thường được để ở cuối của toàn chu trình. 

**Bỏ qua phản hồi người dùng ở các giai đoạn sau:** Vì có một quá trình nghiêm ngặt từng bước một, mô hình thác nước gặp khó khăn trong vấn đề nhận phản hồi của người dùng ở những giai đoạn sau của vòng đời sản phẩm. Người quản lý dự án đương nhiên có thể đưa quá trình về các giai đoạn trước vì những yêu cầu hoặc thay đổi mới từ khách hàng, nhưng điều này sẽ vô cùng tốn kém và ngốn thời gian cho cả nhóm phát triển và khách hàng.

**Thời gian kiểm thử bị trì hoãn:** Trong khi phần lớn các mô hình SDLC hiện đại luôn tích hợp kiểm thử là một phần tất yếu và luôn luôn xuyên suốt mọi quá trình trong quá trình phát triển, mô hình thác nước để kiểm thử vào cuối vòng đời. Điều này không chỉ làm cho phần lớn lỗi kỹ thuật hay thậm chí vấn đề thiết kế không được phát hiện cho đến tận cuối chu trình sống, nó còn dễ gây ra thói quen viết mã kém chất lượng do việc kiểm thử chỉ thường khá ít và quá muộn.

## **Khi nào áp dụng Waterfall**
* Áp dụng Waterfall khi nắm được rõ yêu cầu của dự án một cách tốt nhất, yêu cầu là rõ ràng và có tính ổn định cao.
* Nắm vững được công nghệ phát triển.
* Không có những yêu cầu không rõ ràng.
* Tài nguyên phát triển phong phú và chuyên môn kỹ thuật cao.
* Thích hợp với những dự án nhỏ và ngắn hạn.

Nguồn: https://airbrake.io/blog/sdlc/waterfall-model