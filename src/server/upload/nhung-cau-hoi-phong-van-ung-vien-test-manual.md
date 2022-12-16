Trong quá trình tuyển dụng, nhà tuyển dụng sẽ luôn đưa ra những câu hỏi vừa kiểm tra kiến thức cơ bản của ứng viên, rồi kiến thức nâng cao, có cả những câu hỏi về kiến thức xử lý tình huống.
Chắc hẳn để phỏng vấn vào một công ty mình mơ ước là điều mà tất cả chúng ta đều quan tâm. Tuy nhiên để vượt qua được vòng phỏng vấn thì bạn cần nắm kỹ kiến thức đã học, và thêm càng nhiều kinh nghiệm làm việc càng tốt. 
Cá nhân tôi cũng đã đôi lần đi phỏng vấn, trượt cũng có, thành công cũng nhiều. Nhưng mỗi một nhà phỏng vấn đều có những câu hỏi nói đúng là rất BÁ ĐẠO, và sau này suy ngẫm thấy rất hay
Ở bài viết này là danh sách một số câu hỏi và câu trả lời phỏng vấn gợi ý cho ứng viên  Kiểm thử phần mềm Thủ công MANUAL TESTING. Bao gồm các câu hỏi về kiểm tra thủ công, câu hỏi kiểm tra web, câu hỏi chứng nhận ISTQB và CSTE, và một số thử nghiệm mô phỏng để kiểm tra kỹ năng kiểm thử của bạn.

Những câu hỏi ở bài viết hăn sẽ chưa tổng hợp được hết, nhưng mong rằng nó giúp các bạn có cái nhìn tổng quan hơn

![](https://images.viblo.asia/854a9dea-6fd5-46ad-bd3a-c360b690cfc5.jpg)

## A. Những câu hỏi phỏng vấn thú vị
**1. Trong một ứng dụng hiện đang trong quá trình sản xuất, một mô-đun mã đang được sửa đổi. Có cần thiết phải kiểm tra lại toàn bộ ứng dụng hay không? Hay chỉ kiểm thử chức năng liên quan đến mô-đun đó?**

***Gợi ý trả lời:*** 
Một ứng dụng đang trong quá trình sản xuất, một mô-đun được thay đổi, cần thiết phải kiểm tra lại cả 2. Phải kiểm tra chức năng của mô-đun đó cũng như các mô-đun khác. Nhưng chú trọng đến mô-đun được thay đổi nhiều hơn.
Ví dụ cụ thể:
Nếu Mô-đun A được sửa đổi, Mô-đun B phụ thuộc vào mô-đun A, Mô-đunl C là mô-đun chung nhưng độc lập với mô-đun A.
- Trong trường hợp này, bạn sẽ kiểm tra chi tiết cho tất cả các trường hợp thử nghiệm của mô-đun A. 
- Sau đó, thực hiện stress test cho mô-đun B. 
- Với modul C cũng sẽ phải thử nghiệm nhưng có thể với mức độ không nhiều, vì mô-đun C không phụ thuộc vào mô-đun A nhưng có thể phụ thuộc vào mô-đun B.
- Ngoài ra, nếu thử nghiệm hộp trắng, bạn có thể biết mô-đun nào sẽ bị ảnh hưởng và mô-đun nào cần được kiểm tra, nếu thử nghiệm hộp đen, bạn cũng sẽ cần thử nghiệm hồi quy để đảm bảo. Nhưng việc thử nghiệm hộp trắng phụ thuộc vào kinh nghiệm và trình độ về thuật toán, mã hóa của người thử nghiệm

**2. Tình huống khó khăn nhất mà bạn có trong quá trình thử nghiệm là gì?**

***Gợi ý trả lời:*** 
Với câu hỏi này thì còn tùy vào kinh nghiệm làm việc và mức độ công việc của cá nhân, mà việc gặp khó khăn lớn hay nhỏ, 
Tuy nhiên thì có lẽ chưa ai mà chưa từng gặp khó khăn trong công việc, chỉ là ít hay nhiều
Đây là một câu hỏi hay! 
Trước đây khi tôi chuyển công việc, chính bản thân tôi cũng từng gặp câu hỏi này rồi
Việc trả lời câu hỏi này phụ thuộc vào chính bản thân cá nhân mình, nhưng cần phần phải trả lời thực tế, không bịa đặt để trả lời xong câu hỏi này.

**3. Bạn sẽ làm gì nếu không có Spec của chức năng hoặc bất kỳ tài liệu nào liên quan đến hệ thống, và developer phát triển chức năng không còn làm việc trong công ty nữa, nhưng bạn cần phải thực hiện test hệ thống này?**

***Gợi ý trả lời:*** 
- Với tình huống này, bạn sẽ cần phải làm thử nghiệm thăm dò sản phẩm. Trong thử nghiệm này, bạn sẽ hiểu hơn về hệ thống và quy trình làm việc cơ bản của nó. Trong thử nghiệm thăm dò, bạn cũng có thể tìm thấy một số lỗi 'chặn' gây ra sự cố cho hệ thống
- Nếu bạn có thể thử nghiệm hộp trắng thì bước tiếp theo bạn có thể làm là kiểm thử mã của các mô-đun. Bằng cách này, bạn sẽ biết các trường hợp thử nghiệm cho các mô-đun khác nhau và mối quan hệ của các mô-đun.
- Tuy nhiên đã có trường hợp không những không có spec, developer không còn làm việc ở công ty nữa, mà còn không có cả source code để team kiểm tra. Điều này thì hoàn toàn phụ thuộc vào việc thử nghiệm thăm dò.

## B. Những câu hỏi và gợi ý trả lời phỏng vấn kiểm thử web phổ biến

Kiểm thử Web là thử nghiệm các ứng dụng web cho bất kỳ lỗi hoặc vấn đề tiềm ẩn nào, trước khi ứng dụng web được chuyển sang môi trường sản xuất tức là trước khi thực hiện bất kỳ ứng dụng web nào.

Dựa trên yêu cầu kiểm thử web, có nhiều yếu tố cần được cân nhắc. Những yếu tố này bao gồm bảo mật ứng dụng web, giao tiếp TCP / IP, khả năng xử lý lưu lượng truy cập, tường lửa, v.v.

Kiểm thử web bao gồm thử nghiệm chức năng, kiểm tra khả năng sử dụng, kiểm tra bảo mật, kiểm tra giao diện, kiểm tra khả năng tương thích, kiểm tra hiệu suất,...
Dưới đây là danh sách các câu hỏi phỏng vấn thường dùng nhiều nhất

![](https://images.viblo.asia/78f2ddce-73ad-46ee-8b11-3d61afd71017.png)

**1. Bạn hiểu gì về ứng dụng web?**

***Gợi ý trả lời:***
Ứng dụng web là phương tiện để giao tiếp và trao đổi thông tin với khách hàng. Không giống như bất kỳ ứng dụng máy tính để bàn nào được thực thi bởi một hệ điều hành, một ứng dụng web chạy trên một máy chủ web và được truy cập bởi một trình duyệt web hoạt động như một máy khách.

Ví dụ về ứng dụng web là ‘Gmail’. Trong Gmail, tương tác được thực hiện bởi một người dùng cá nhân hoàn toàn độc lập với những người khác. Bạn có thể gửi và nhận thông tin qua email cũng như thông qua tệp đính kèm.

Bạn có thể duy trì tài liệu trong một ổ đĩa, duy trì bảng tính trong tài liệu của Google và bao gồm nhiều tính năng khác khiến người dùng nhận ra rằng họ có môi trường được tùy chỉnh theo danh tính cụ thể của họ.

**2. Xác định máy chủ Web**

***Gợi ý trả lời:***
Máy chủ Web tuân theo mô hình máy khách / máy chủ nơi chương trình sử dụng HTTP (Giao thức truyền siêu văn bản). Để đáp lại yêu cầu của một máy khách HTTP, máy chủ web xử lý xác thực phía máy khách và máy chủ và cung cấp nội dung web dưới dạng các trang web cho người dùng.

Các trình duyệt chúng ta sử dụng, chẳng hạn như Safari, Chrome, Internet Explorer, Firefox, vv, đọc các tệp được lưu trữ trên máy chủ web và cung cấp thông tin cho chúng ta dưới dạng hình ảnh và văn bản bằng phương tiện internet. Bất kỳ máy tính nào lưu trữ trang web đều phải có máy chủ web.

Một số máy chủ web hàng đầu là:
- Apache
- Máy chủ thông tin Internet của Microsoft (IIS)
- Máy chủ web Java
- Máy chủ web của Google

**3. Một số kịch bản thử nghiệm quan trọng để thử nghiệm một trang web.**

***Gợi ý trả lời:*** 
Có nhiều thông số cần được xem xét trong khi quyết định các kịch bản thử nghiệm quan trọng để kiểm tra bất kỳ trang web nào. Ngoài ra, loại trang web được kiểm tra và đặc điểm yêu cầu của trang web đóng một vai trò quan trọng ở đây.

Một số trường hợp thử nghiệm quan trọng được áp dụng để thử nghiệm bất kỳ loại trang web nào:
- Kiểm thử GUI (Giao diện đồ họa người dùng) của trang web để kiểm tra tính nhất quán của các yếu tố thiết kế và bố cục trang.
- Tất cả các liên kết trang và siêu liên kết chuyển hướng của chúng đến trang mong muốn đều được kiểm tra.
- Trong trường hợp có bất kỳ biểu mẫu hoặc trường nào trên trang web, các tình huống thử nghiệm bao gồm: thử nghiệm với dữ liệu hợp lệ, dữ liệu không hợp lệ, thử nghiệm với các bản ghi hiện có cũng như thử nghiệm với các bản ghi trống.
- Kiểm thử chức năng theo đặc tả yêu cầu thực hiện.
- Hiệu suất của một trang web được kiểm tra dưới tải nặng để xác định thời gian phản hồi của máy chủ web và thời gian truy vấn cơ sở dữ liệu.
- Kiểm thử khả năng tương thích được thực hiện để kiểm tra hành vi của một ứng dụng trên một kết hợp trình duyệt và hệ điều hành khác nhau.
- Kiểm thử khả năng sử dụng và kiểm tra cơ sở dữ liệu cũng được thực hiện như một phần của các kịch bản thử nghiệm.

**4. Các cấu hình khác nhau cần được xem xét khi thử nghiệm một trang web là gì?**

***Gợi ý trả lời:*** 
Cấu hình khác nhau bao gồm các trình duyệt khác nhau cũng như hệ điều hành mà trang web đang được kiểm tra. Plugin trình duyệt, kích thước văn bản, độ phân giải video, độ sâu màu, tùy chọn cài đặt trình duyệt cũng được xem xét khi chúng ta nói về cấu hình.

Các kết hợp khác nhau của trình duyệt và hệ điều hành được sử dụng để kiểm tra tính tương thích của trang web. 

Vài trình duyệt quan trọng bao gồm:
- Internet Explorer
- Firefox
- Chrome
- Safari
- Opera

Vài hệ điều hành quan trọng bao gồm:
- WINDOWS
- UNIX
- LINUX
- MAC

**5. Thử nghiệm ứng dụng Web có khác gì so với thử nghiệm Ứng dụng Desktop? Phải giải thích như nào về điều này?**
***Gợi ý trả lời:*** 
Đúng, Giữa ứng dụng web và ứng dụng dành cho máy tính để bàn có rất nhiều sự khác biệt


| **Tiêu chí** | **Ứng dụng WEB** | **Ứng dụng Máy tính** |
| -------- | -------- | -------- |
| Định nghĩa     | Ứng dụng web là ứng dụng có thể chạy trên bất kỳ máy khách nào có kết nối internet mà không cần cài đặt bất kỳ tệp thực thi nào     | Các ứng dụng trên máy tính để bàn là một ứng dụng được cài đặt và thực hiện riêng trên máy tính cá nhân.     |
| Hiệu suất     | Hành động người dùng, phản hồi, thống kê có thể dễ dàng theo dõi cũng như cập nhật dữ liệu ở một nơi được phản ánh ở mọi nơi trong ứng dụng web     | Không thể giám sát các hành động của người dùng cũng như các thay đổi về dữ liệu ở máy     |
| Kết nối     | Ứng dụng web có thể được truy cập trên bất kỳ máy tính nào có kết nối internet bằng trình duyệt web, nơi hiệu suất của ứng dụng phụ thuộc vào tốc độ internet     | Ứng dụng máy tính để bàn chỉ có thể được truy cập trên PC cụ thể khi ứng dụng được cài đặt     |
| Rủi ro bảo mật     | Ứng dụng web dễ bị đe dọa hơn vì các ứng dụng có thể được truy cập bởi bất kỳ ai trên internet.     | Ứng dụng trên máy tính để bàn ít bị đe dọa hơn khi người dùng có thể kiểm tra các vấn đề bảo mật ở cấp hệ thống     |
| Dữ liệu người dùng     | Dữ liệu người dùng được lưu và truy cập từ xa trong trường hợp các ứng dụng web     | Dữ liệu được lưu trữ, lưu và truy cập từ cùng một máy mà trên đó ứng dụng được cài đặt     |

**6. Ứng dụng Intranet là gì?**
***Gợi ý trả lời:*** 
Ứng dụng Intranet là một loại ứng dụng riêng được triển khai và chạy trên máy chủ LAN cục bộ và chỉ có thể được truy cập bởi những người trong tổ chức. Nó sử dụng mạng cục bộ để chia sẻ thông tin.

Ví dụ: Tổ chức thường có một ứng dụng lưu trữ thông tin về sự tham gia của bạn, ngày lễ, lễ kỷ niệm sắp tới trong tổ chức hoặc một số sự kiện hoặc thông tin quan trọng cần được lưu hành trong tổ chức.

**7. Giải thích sự khác biệt giữa Ủy quyền và Xác thực trong thử nghiệm Web.**

***Gợi ý trả lời:*** 
Sự khác biệt giữa Ủy quyền và Xác thực được tổng hợp dưới:


| **Xác thực** | **Ủy quyền** |
| -------- | -------- |
| Xác thực là quá trình mà hệ thống xác định người dùng là ai?     | Ủy quyền là quá trình mà hệ thống xác định người dùng được phép làm gì?     |
| Xác thực xác định danh tính của người dùng.     | Ủy quyền quyết định các đặc quyền được sẽ cấp cho người dùng, tức là người dùng có thể truy cập hoặc thao tác các tính năng của một chương trình nhất định hay không     |
| Có nhiều loại xác thực khác nhau, như dựa trên mật khẩu, dựa trên thiết bị, v.v     | Có hai loại ủy quyền, như chỉ đọc và đọc viết cả hai     |
| Ví dụ: Trong một tổ chức, mỗi nhân viên có thể đăng nhập vào một ứng dụng mạng nội bộ     | Ví dụ: Chỉ người quản lý tài khoản hoặc người trong bộ phận tài khoản mới có thể truy cập phần tài khoản     |

**8. Các loại vấn đề bảo mật kiểm tra Web là gì?**

***Gợi ý trả lời:***
Một số vấn đề về bảo mật web bao gồm:

- Tấn công từ chối dịch vụ (DOS)
- Tràn bộ nhớ
- Trực tiếp chuyển URL nội bộ thông qua địa chỉ trình duyệt
- Xem các thống kê khác

**9. Định nghĩa HTTP**

***Gợi ý trả lời:*** 
HTTP là viết tắt của Hypertext Transfer Protocol. HTTP là giao thức truyền dữ liệu xác định cách thức các tin nhắn được định dạng và chuyển qua World Wide Web. HTTP cũng xác định phản hồi của các sự kiện được thực hiện bởi máy chủ web và trình duyệt.

Ví dụ, khi một URL được nhập vào trình duyệt web, lệnh HTTP được gửi đến máy chủ web, lần lượt tìm nạp trình duyệt web được yêu cầu.

**10. Định nghĩa HTTPS**

***Gợi ý trả lời:*** 
HTTPS là viết tắt của Hypertext Transfer Protocol Secure. Đây là HTTP cơ bản thông qua SSL (Lớp cổng bảo mật) cho mục đích bảo mật. Khi truyền dữ liệu giữa người dùng và máy chủ web khi trang web sử dụng giao thức HTTP luôn có cơ hội nghe trộm dữ liệu 

Do đó, các trang web sử dụng cách bảo mật, tức là mã hóa SSL của giao thức HTTPS dữ liệu được gửi qua lại sẽ đảm bảo an toàn hơn. Hầu như tất cả các trang web yêu cầu đăng nhập người dùng sử dụng giao thức HTTPS. Vài ví dụ là trang web ngân hàng, trang web thương mại điện tử, v.v.

**11. Các vấn đề chung gặp phải trong thử nghiệm Web là gì?**

***Gợi ý trả lời:*** 
Một số vấn đề thường gặp phải trong thử nghiệm web thường là:

- Sự cố máy chủ, bao gồm máy chủ bị sập và máy chủ bảo trì.
- Sự cố khi kết nối cơ sở dữ liệu.
- Sự cố tương thích giữa phần cứng và trình duyệt.
- Các vấn đề liên quan đến bảo mật.
- Hiệu suất tải và các vấn đề liên quan.
- Các vấn đề liên quan GUI (giao diện người dùng đồ họa)

**12. Kiểm tra cookie là gì?**

***Gợi ý trả lời:*** 
Cookie là một đoạn văn bản ghi thông tin được tạo ra và lưu trên trình duyệt của máy người dùng. Cookie thường được tạo ra khi người dùng truy cập một website, cookie sẽ ghi nhớ những thông tin như tên đăng nhập, mật khẩu, các lựa chọn do người dùng lựa chọn đi kèm. Các thông tin này lưu trong máy tính thường được dùng để nhận ra người dùng khi truy cập một trang web. Cookie là những tập tin mà trang web gửi đến máy tính của người dùng.

Cookie được sử dụng để theo dõi phiên của người dùng, hiển thị quảng cáo, nhớ lựa chọn của người dùng khi truy cập bất kỳ trang web nào, nhớ và truy xuất giỏ hàng của người dùng, theo dõi số lượng khách truy cập, v.v.

Giả sử trang web thương mại điện tử có thể truy cập được ở nhiều quốc gia như Hoa Kỳ, Canada, Úc và thử nghiệm của họ được thực hiện ở Ấn Độ. Trong trường hợp đó, trong khi kiểm tra trang web thương mại điện tử cho các quốc gia khác nhau ở Ấn Độ, tại các quốc gia tương ứng, cookie được đặt sao cho dữ liệu thực tế như múi giờ, v.v, được truy cập của quốc gia cụ thể đó.

**13. Định nghĩa xác thực phía máy khách**

***Gợi ý trả lời:*** 
Xác nhận phía máy khách là xác thực cơ bản được thực hiện ở cấp trình duyệt, nơi đầu vào của người dùng được xác thực tại chính trình duyệt mà không có sự tham gia của máy chủ.

Ví dụ:
Giả sử người dùng nhập định dạng email không chính xác trong khi điền vào biểu mẫu. Sau đó, trình duyệt sẽ nhắc nhở và sửa lỗi trước khi chuyển sang trường tiếp theo. Do đó, mọi trường đều được sửa trước khi gửi biểu mẫu.

Xác thực phía máy khách thường được thực hiện bằng ngôn ngữ kịch bản như JavaScript, VBScript, thuộc tính HTML 5.

Hai loại xác thực phía Máy khách là:
- Xác nhận cấp độ trường
- Xác nhận cấp độ biểu mẫu

**14. Bạn hiểu gì về xác thực phía máy chủ?**
***Gợi ý trả lời:*** 
Xác thực phía máy chủ xảy ra khi xác thực và xử lý các yêu cầu của người dùng yêu cầu phản hồi từ máy chủ. Để hiểu rõ hơn, đầu vào của người dùng đang được gửi đến máy chủ và việc xác thực được thực hiện bằng các ngôn ngữ kịch bản phía máy chủ như PHP, Asp.NET, v.v.

Sau khi quá trình xác nhận hoàn thành, phản hồi được gửi lại cho khách hàng dưới dạng trang web được tạo động.

Khi so sánh với quy trình xác thực phía máy khách, quy trình xác thực phía máy chủ an toàn hơn vì ứng dụng ở đây được bảo vệ chống lại các cuộc tấn công nguy hiểm và người dùng có thể dễ dàng bỏ qua ngôn ngữ kịch bản phía máy khách.

**15. Phân biệt giữa trang web tĩnh và trang web động**

***Gợi ý trả lời***: 
Sự khác biệt giữa các trang web tĩnh và động như sau:


| **Trang web tĩnh** | **Trang web động** |
| -------- | -------- |
| Trang web tĩnh là trang web chỉ cung cấp thông tin và không có loại tương tác nào giữa người dùng và trang web     | Trang web động là trang web có thể tương tác với người dùng giữa trang web và người dùng cùng với việc truyền đạt thông tin     |
| Chi phí để phát triển và lưu trữ các trang web tĩnh là rất rẻ     | Chi phí để phát triển và lưu trữ các trang web động tốn kém, chi phí lưu trữ cũng cao hơn     |
| Các trang web tĩnh được tải dễ dàng trên trình duyệt của khách hàng vì nội dung cố định của nó và không có kết nối cơ sở dữ liệu     | Các trang web động thường mất thời gian tải trên trình duyệt của khách hàng vì nội dung để hiển thị được tạo động và truy xuất bằng truy vấn cơ sở dữ liệu     |
| Các trang web tĩnh có thể được tạo từ HTML, CSS và không yêu cầu bất kỳ ngôn ngữ ứng dụng máy chủ nào     | Các trang web động yêu cầu ngôn ngữ ứng dụng máy chủ như ASP.NET, JSP, PHP để chạy ứng dụng trên máy chủ và hiển thị đầu ra trên trang web     |
| Thay đổi bất kỳ nội dung nào của trang web tĩnh nào; yêu cầu được tải lên trên máy chủ nhiều lần     | Trang web động cung cấp các cơ sở để thay đổi nội dung trang bằng ứng dụng máy chủ     |

**16. Bạn hiểu gì về kiểm tra Client-Server?**

***Gợi ý trả lời:*** 
Ứng dụng Client-server là ứng dụng được tải hoặc cài đặt trên máy chủ trong khi tệp EXE ứng dụng được tải trên tất cả các máy khách. Môi trường này thường được sử dụng trong mạng Intranet.

Các kiểm thử sau được thực hiện trên ứng dụng Client-server:

- Kiểm thử giao diện (GUI) trên cả hai hệ thống máy khách và máy chủ.
- Thử nghiệm tương tác giữa máy khách và máy chủ.
- Thử nghiệm chức năng của một ứng dụng.
- Thử nghiệm tải và thử nghiệm hiệu suất.
- Kiểm thử khả năng tương thích.
Tất cả các trường hợp thử nghiệm và các kịch bản thử nghiệm được sử dụng trong thử nghiệm ứng dụng máy khách-máy chủ đều được lấy từ kinh nghiệm của người kiểm tra và các đặc tả yêu cầu.

**17. Các mã phản hồi HTTP được máy chủ trả về**

***Gợi ý trả lời:*** 
Mã phản hồi HTTP được server trả về gồm:
- 2xx - Điều này có nghĩa là 'Thành công'
- 3xx- Điều này có nghĩa là 'Chuyển hướng'
- 4xx- Điều này có nghĩa là 'Lỗi ứng dụng'
- 5xx- Điều này có nghĩa là 'Lỗi máy chủ'

**18. Vai trò của kiểm thử khả năng sử dụng trong thử nghiệm Web là gì?**

***Gợi ý trả lời:***
Trong thử nghiệm web, kiểm tra khả năng sử dụng đóng một vai trò quan trọng. Nó cũng được thử nghiệm khả năng sử dụng là phương tiện để đánh giá sự dễ dàng sử dụng của một người dùng cuối dù có biết hoặc không biết kiến thức ngôn ngữ lập trình.

Việc thử nghiệm web, kiểm thử khả năng sử dụng bao gồm những điều sau đây:
- Để kiểm thử xem trang web có thân thiện với người dùng không?
- Người dùng cuối có thể dễ dàng điều hướng trong ứng dụng không?
- Bất kỳ trở ngại nào có thể cản trở trải nghiệm người dùng.
- Kiểm tra xem người dùng có thể hoàn thành nhiệm vụ trong ứng dụng nhanh như thế nào.

**19. Các môi trường có sẵn trên Web là gì?**

***Gợi ý trả lời:*** 
Các loại môi trường khác nhau trên Web là:
- Intranet (Mạng cục bộ)
- Internet (Mạng diện rộng)
- Extranet (Mạng riêng tư qua internet)

**20. Trang web tĩnh và web động có các trường hợp thử nghiệm là gì?**

***Gợi ý trả lời:*** 
Với trang web tĩnh:
- Trường hợp kiểm thử front-end
- Trường hợp kiểm thử điều hướng

Với trang web động:
- Trường hợp kiểm thử front-end
- Trường hợp kiểm thử back-end
- Trường hợp kiểm thử điều hướng
- Trường hợp kiểm thử xác thực cho các trường
- Các trường hợp kiểm thử bảo mật, v.v.

**21. Một số công cụ kiểm thử web?**

***Gợi ý trả lời:*** 
Một số công cụ kiểm tra web như dưới đây:
- Eggplant functional
- Selenium
- SOA test
- JMeter
- iMacros, etc.

**22. Hãy nêu một số ví dụ về các ứng dụng web được sử dụng hằng ngày của chúng ta**

***Gợi ý trả lời***: 
Một số ứng dụng web như:

- Các cổng web như eBay, Amazon, Flipkart,...
- Các ứng dụng ngân hàng như ICICI, Yes Bank, HDFC, Kotak Mahindra,...
- Nhà cung cấp dịch vụ email như Gmail, Yahoo, Hotmail,...
- Mạng xã hội như Facebook, Twitter, LinkedIn,...
- Các diễn đàn thảo luận….

**23. Máy chủ proxy là gì?**

***Gợi ý trả lời:*** 
Máy chủ proxy là một máy chủ hoạt động như một trung gian hoặc là máy chủ nằm giữa máy khách và máy chủ chính.

Giao tiếp giữa máy chủ chính và máy chủ khách được thực hiện thông qua máy chủ proxy vì yêu cầu của khách hàng về bất kỳ kết nối, tệp, tài nguyên nào từ máy chủ chính được gửi qua máy chủ proxy và lại phản hồi từ máy chủ chính hoặc bộ nhớ cache cục bộ client-server được thực hiện thông qua máy chủ proxy.

Mục đích sử dụng proxy:
- Để cải thiện hiệu suất phản hồi của web.
- Trong trường hợp có tài liệu trong bộ nhớ cache, phản hồi sẽ được gửi trực tiếp đến máy khách.
- Máy chủ proxy lọc nội dung trang web dưới dạng proxy web.
- Một máy chủ proxy cũng được sử dụng để chặn nội dung web xúc phạm được người dùng truy cập đặc biệt trong một tổ chức, trường học và cao đẳng.
- Web proxy ngăn chặn sự tấn công của virus máy tính và phần mềm độc hại.

**24. Máy chủ cơ sở dữ liệu là gì?**

***Gợi ý trả lời:*** 
Máy chủ cơ sở dữ liệu có thể được định nghĩa như một máy chủ dùng để chỉ hệ thống back-end của một ứng dụng cơ sở dữ liệu cung cấp các dịch vụ cơ sở dữ liệu như truy cập và lấy dữ liệu từ cơ sở dữ liệu.

Máy chủ cơ sở dữ liệu sử dụng kiến trúc máy khách / máy chủ nơi dữ liệu có thể được truy cập thông qua máy chủ cơ sở dữ liệu bằng “giao diện người dùng” chạy và hiển thị dữ liệu trên máy của người dùng hoặc “back end” chạy trên chính máy chủ cơ sở dữ liệu.

Một máy chủ cơ sở dữ liệu giống như một kho dữ liệu và cũng nắm giữ trên Hệ thống quản lý cơ sở dữ liệu (DBMS).

Ngoài những câu hỏi trên thì còn rất nhiều câu hỏi phỏng vấn khác, về kiến thức ISTQB
Ở những câu hỏi bên trên, chỉ là tổng hợp rất nhỏ. Mong mọi người bổ sung thêm để có bộ câu hỏi đầy đủ hơn.

*Tài liệu tham khảo:*
https://www.softwaretestinghelp.com/some-interesting-software-testing-interview-questions/
https://www.softwaretestinghelp.com/software-testing-interview-questions/