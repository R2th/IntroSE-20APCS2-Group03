Chào các bạn. Thời gian WFH cũng là thời gian làm cho con người ta cảm thấy mệt mỏi, tù túng nhất có thể. Nhưng chắc không mệt mỏi bằng việc nhờ người khác review code. Hay phải review code cho một cái PR to tổ bố. Thôi thì cùng mình ngó qua một chút về một vài kinh nghiệm cũng như kiến thức của bản thân mình đã trải qua và tổng hợp lại được nhé.

Như thường lệ, tổng quan bài viết gồm 3 phần như sau
1. Tổng quan về review code
2. Review code như thế nào?
3. Tổng kết

**Một vài từ ngữ viết tắt**
- UT = Unit Test
- PR = Pull Request
- CL = Change Line


## Tổng quan về review code
### Review code là gì
- Là quá trình mà các lập trình viên xem xét và đánh giá code của một thành viên khác trong nhóm
- Đồng thời cũng là quá trình thảo luận, đưa ra những góp ý nhằm giúp các đoạn code thêm chất lượng hơn.
i![4l0h6v.jpg](https://images.viblo.asia/906110ad-e432-4a38-8113-ba0c2332e2fa.jpg)

### Lợi ích của review code
**Về cá nhân:**
- Nâng cao trình độ bản thân.
- Học cách truyền đạt và góp ý cho người khác, cũng như kiểm chứng lại kiến thức của mình.

**Về công việc:**
- Nắm bắt được những gì diễn ra trong dự án
- Là một bước quan trọng để giảm thiểu lỗi phát sinh
- Giúp cho chất lượng code tốt hơn => chất lượng dự án sẽ tốt hơn.

### Tiêu chuẩn chung của review code
**Chung**:
- Đảm bảo rằng tình trạng của toàn bộ codebase được cải thiện theo thời gian
- Không có “**perfect**” code, chỉ có “**better**” code
- Technical facts > sở thích cá nhân

**Cá nhân:**
- Cần có khả năng học hỏi và tiến bộ đối với từng PR của mình
- Cần có trách nhiệm với PR mà mình đã review
- Tránh lặp lại các lỗi tương tự


=> Reviewer nên chấp thuận PR khi nó chắc chắn cải thiện tình hình của codebase, ngay cả khi PR không hoàn hảo

![d7vtilcf2rg61.jpg](https://images.viblo.asia/9c191024-1ead-4ff6-b555-8afad7660ac0.jpg)

## Review code như thế nào
### Khi review code chúng ta nhìn vào những gì?
![4384a800d27433f17a5518101181433a.jpg](https://images.viblo.asia/30ded9da-83f8-4fad-844a-ebab91d035f8.jpg)

**Sai lầm phổ biến**
- Formatting: Khoảng trắng hay break line ở đâu, dùng tab hay space, …
- Style: Khai báo biến ở đâu, truyền params như thế nào?

Khi review code, chúng ta không nên chú ý vào 2 vấn đề trên, vì về cơ bản các tools đã hỗ trợ chúng ta việc đó, hay tận dụng chúng. Thay vào đó, bản thây mình nghĩ chúng ta nên **chú trọng vào các vấn đề sau**

1. Design
2. Readability & Maintainability
3. Functionality
4. Tests
5. Performance
6. Security


#### 1. Desgin
 ![1_gpIXyLjxnebMNZpw8KvmUA.png](https://images.viblo.asia/af32ad0c-3d84-4335-9122-725145511afc.png)
- CLs có phù hợp với **kiến trúc hiện tại** của codebase không?
- Nếu codebase có nhiều tiêu chuẩn hoặc style khác nhau, thì style của CLs có phù hợp không?
- CLs có tuân theo các **design pattern** phù hợp không?
- CLs có tuân theo các **nguyên tắc cơ bản** như
    - SOLID
    - DDD(Domain Driven Design)
- CLs có được đặt đúng chỗ không, ví dụ: Liên quan tới Order, thì nó có ở trong Order Services không?
- CLs có thể sử dụng lại 1 số function cũ hay không?
-Liệu CLs có được thiết kế quá mức hay không?

#### 2. Readability & Maintainability
![maintainability-is-king.jpg](https://images.viblo.asia/3ca41f58-e092-47ef-bdee-49ebfbcceb76.jpg)
- Liệu rằng **cách đặt tên** (của fields, variables, parameters, methods and classes) có dễ hiểu và biểu thị đúng chức năng của nó không?
- Khi đọc code, Unit Test bạn có hiểu nó đang làm gì không?
- **Error message** có biểu thị đúng hay không?
- **Comments** có được viết hợp lý hay không?
- **Docs** có được update không?

#### 3. Functionality	
![Functionality-473x270.jpg](https://images.viblo.asia/5dc8277a-686e-4d35-902f-c29cb37227e9.jpg)
- Liệu rằng CLs có hoạt động đúng như developer mong muốn hay không?
- Có các UT đảm bảo cho việc này hay không?
- Liệu rằng có tiềm ẩn những lỗi như, ví dụ: như sử dụng “and” thay vì “or”

#### 4. Tests
![Unit-Test-and-Test-Driven-Development-TDD.png](https://images.viblo.asia/08f40801-d651-45f5-aa1f-7274adb564e0.png)
- Có UT (Unit Test) cho code mới/sửa hay không?
- Có UT cho các đoạn logic phức tạp hay không?
- Bạn có đang hiểu những gì UT thể hiện không?
- Các UT có phù hợp với yêu cầu không?
- Các UT có bị miss case nào quan trọng không?

#### 5. Performance
![96412.jpg](https://images.viblo.asia/d4ec139e-5e09-45c2-85f9-ca382ff59798.jpg)
- CLs có ảnh hưởng tiêu cực đến performance hiện tại?
- Chú ý tới các vấn đề có thể gây ảnh hưởng đến performance
    - Gọi tới services khác, timeout
    - Xử lý với database
        - N+1 query
        - Deadlock, …
    - Các vấn đề liên quan tới thread, memory leak, ...

#### 6. Security
![an-ninh-mang-1.jpg](https://images.viblo.asia/16eabbdf-9f7d-45a2-9967-8931b25c1151.jpg)
- Sử dụng tools để check các lỗi bảo mật cơ bản (nếu có thể). Chú ý đến các raw query
    - SQL Injection
    - Cross-site Scripting
    - …
- Kiểm tra xem các dữ liệu có cần phải được mã hóa
- Kiểm tra xem có **lộ các key**

**=> Thường thì các framework đã tránh hết các vấn đề bảo mật cơ bản rồi.**


### Làm thế nào để review code tốt hơn?

**Các bước của quá trình review **
 ![stepbystep.jpg](https://images.viblo.asia/742cc4f4-fbe4-4941-ae90-c7d749cbcf88.jpg)
1. Nhìn tổng quan 1 lượt các CLs (**Change Lines**)
2. Kiểm tra kỹ các phần chính của CLs
3. Kiểm tra phần còn lại của CLs theo thứ tự hợp lý

#### 1. Nhìn tổng quan 1 lượt các CLs

- Đầu tiên cần hiểu về spec của CLs, và confirm lại với dev xong CLs có khớp với spec không? => **Nếu không có thể reject ngay**.
- Nếu vấn đề này xảy ra quá thường xuyên => cần xem lại quy trình làm việc của team.

#### 2. Kiểm tra kỹ các phần chính của CLs
- Tìm “**main**" files của CLs, thông thường đó là các files có lượng thay đổi logic lớn nhất.
- Hãy review thật kỹ phần “main” này trước => cung cấp ngữ cảnh cho tất cả các phần khác của CLs
- Nếu CLs quá lớn, có thể đề nghĩ dev tách CLs ra các phần nhỏ
- Nếu thấy các vấn đề liên quan đến design => cần phản ánh lại cho dev ngay lập tức. 


#### 3. Kiểm tra phần còn lại của CLs theo thứ tự hợp lý

- Hãy cố gắng tìm ra một trình tự hợp lý để reivew qua các CL đồng thời đảm bảo rằng không miss bất kì CL nào.
- Thông thường, khi đã xem qua các "**main**" CL ⇒ chúng ta chỉ cần xem lại các file theo thứ tự lần lượt mà công cụ review suggest
- Đôi khi, cũng hữu ích nếu bạn **đọc UT trước khi đọc qua main CLs** ⇒ giúp bạn nắm được ý tưởng về những thay đổi được cho là đang thực hiện


### Những chú ý khi comments vào PR
![1_Ypd0z4OhOmegm-WHyGHgxg.jpeg](https://images.viblo.asia/88bd5705-76b8-44d7-806e-49b571bf611e.jpeg)
- **Tôn trọng nhau**, đưa ra những comments mang tính góp ý, xây dựng, nhẹ nhàng.
- **Giải thích tại sao? **(Có thể) đưa ra các đề xuất khác nếu không đồng ý với cách giải quyết của developer
- Nên cân nhắc việc chỉ ra vấn đề với việc đưa ra hướng dẫn trực tiếp. Vì bên cạnh mục tiêu chính là làm cho CLs tốt nhất, còn mục tiêu khác là nâng cao năng lực của developer.

**CHÚ Ý: CẦN TÔN TRỌNG NHAU KHI REVIEW CODE**

### Những chú ý cải thiện tốc độ review code
![please-sir-code-review-please.jpg](https://images.viblo.asia/7bdaa38c-e118-44c5-8d5d-283d55a23428.jpg)
- Cần đánh giá độ quan trọng của task cần review => đưa ra thời điểm review hợp lý
- Nếu không focus vào task nào => nên review ngay sau khi PR được tạo
- Cần feedback ngay cho developer khi có comment
- **Tách nhỏ CLs** nếu có thể
- Mỗi lần review **không nên quá 1 tiếng**
- Nên xây dựng **checklist review** tránh trường hợp bị miss

=> Thường thì 1 ngày là thời gian tối đa cần có để review.

## Tổng kết
![code-review-passed.jpg](https://images.viblo.asia/f34708b1-6c74-4fb6-816f-2a27f426ea94.jpg)

Bài viêt trên có một vài chú ý mình muốn tóm gọn như sau:

- PR cải thiện codebase là có thể chấp nhận
- Automation hết mức có thể
- Review code với tinh thần tôn trọng, học hỏi lẫn nhau

Hãy chờ đón phần tiếp theo nhé. Nêu có bất kì thắc mắc gì cần giải đáp, hoặc góp ý cho mình, thì hãy comment ở dưới nhé. Cảm ơn các bạn đã đọc bài viết đến đây.
___
[@hoangpn - Better every day!](https://hoangpn.com)