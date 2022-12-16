## Khái quát về DNS

Trong thế giới mạng, máy tính nó không sử dụng tên gọi thông thường như chúng ta ngoài đời như Tèo, Tí, Tôm mà nó chỉ hiểu những con số. Bởi vì đó là cách máy tính và các thiết bị tương tự khác nói chuyện và xác định với nhau qua mạng bằng cách sử dụng địa chỉ IP.

Mặt khác, chúng ta đã quen với việc sử dụng tên thay vì số cho dù nói chuyện trực tiếp với người khác hoặc xác định một đất nước(quốc gia), địa điểm hoặc sự vật, ... . Vì vậy để thu hẹp khoảng cách giao tiếp giữa máy tính và con người làm việc các **Paul V. Mockapetris** đã phát minh ra **DNS**.

Vậy nó có những chức năng gì? chức năng của nó là **Resolves names to numbers**(có nghĩa là nó phân giải tên miền thành địa chỉ IP).

Ví dụ nếu bạn muốn truy cập một trang website nào đó bạn mở trình duyệt lên và nhập tên miền(ở đây mình sử dụng tên miền **facebook.com**). Về mặt kỹ thuật ta không cần phải nhập **facebook.com** để truy xuất trang web facebook thay vào đó ta có thể nhập địa chỉ IP của nó(nếu ta biết được địa chỉ IP của nó là gì) ở đây địa chỉ IP của nó là **31.13.75.35** cùng xem bên hình bên dưới nào.

![](https://images.viblo.asia/d0f9ef10-83ab-4ea8-8f06-03209fd35165.png)

Và sau khi enter nó sẽ tự động chuyển bạn đến trang chủ của **facebook**

![](https://images.viblo.asia/51552de9-119c-42a6-82af-c16f36c42130.png)

Giải thích sơ xài một chút nếu ta nhập **facebook.com** nó sẽ như thế nào nhé. Khi ta nhập faceboook.com nói sẽ gọi đến máy chủ DNS để tìm kiếm thông tin thông qua cơ sở dữ liệu của nó xem có cái điạ chỉ IP khớp với thằng facebook.com này không. Nó sẽ tìm kiếm à nó thấy thằng facebook.com có cái ip là 31.13.75.35 nè ok anh bắt được mày rồi sau đó nó sẽ phân giải tên miền facebook.com thành địa chỉ vừa tìm được và sau đó là hoàn tất trình duyệt của bạn có thể giao tiếp với máy chủ web facebook và truy xuất trang web này.

**Chú thích thêm:** Về cơ bản nó hoạt động như danh bạn điện thoại, khi bạn tìm số điện thoại của ai đó thì bạn không tra số trước mà bạn tra tên của người cần tìm là ai trong danh bạ sau đó khi bạn tìm kiếm tên nó sẽ hiện ra số điện thoại chỉ đơn giản vậy thôi quá dễ phải không.

## Phân tích chi tiết về DNS

Chi tiết khi ta nhập tên miền facebook.com điều gì sẽ xảy ra nhé

* Đầu tiên khi ta nhập facebook.com trong trình duyệt web của mình và nếu trình duyệt web hoặc hệ điều hành không thể tìm thấy địa chỉ IP của thằng facebook này trong bộ nhớ đệm(cache) của chính nó, nó sẽ gửi truy vấn đến thằng máy chủ được gọi là máy chủ phân giải(**Resolver server** ). Về cơ bản thằng này là **ISP(Internet Service Provider)** hay được gọi là nhà mạng của chúng ta đang xài
* Truy vấn được gửi từ máy tính của ta đến **ISP** này khi nó nhận được truy vấn nó sẽ kiểm tra trong bộ nhớ đệm của nó xem có địa chỉ IP facebook.com không(ví dụ ở đây là lần đầu tiên có người gửi tên miền facebook.com đến cho nó nhé)  sẽ không tìm thấy nó sẽ gửi truy vấn đến thằng **Root Server** của nó.

    * Chú thích về thằng **Root Server** này là cái gì?

        1.  Là phần root(gốc) hay gọi là phần trên(top) của hệ thống phân cấp DNS.
        2.  Nó có **13** bộ máy chủ gốc và chúng được đặt ở vị trí chiến lượt trên khắp thế giới.
        3.  Được vận hành bởi **12** tổ hcwsc khác nhau và mỗi bộ máy chủ root(gốc) này có địa chỉ **IP duy nhất** của riêng chúng

* Khi thằng **ISP**(hay còn gọi là nhà mạng của chúng ta đó) nó sẽ nói giao lưu vài câu "Hey **Root**! dạo này khoẻ không chú" thằng 
**Root** chưa kịp trả lời thằng **ISP** hỏi thêm câu nữa "tôi có thằng nào đó yêu cầu tôi hỏi cái IP của thằng facebook.com mà tôi không biết nhờ bác giúp em tìm thằng này với", không cần suy nghĩ **Root** trả lời "tôi không biết rồi nhưng tôi biết được chỗ có thể giúp  tìm được địa chỉ IP đó". Sau đó anh **Root** gửi cho chú em **ISP** câu chốt hạ "hãy đi hỏi **TLD Server**(Top level domain) hay còn gọi với cái tên tiếng việt thân thương là **Tên miền cấp cao nhất** của domain **.com**.
    * Chú thích về thằng **TLD Server** này là cá gì?

        *    Là nơi cấp cao nhất lưu trữ thông tin địa chỉ cho các tên miền cấp cao, chẳng hạn như .com, .net, .org and etc.
    
***TLD Server** nhận được yêu cầu từ nhà mạng **ISP** cung cấp địa chỉ IP của facebook.com anh **TLD Server** này cũng sẽ nói một câu nói quên thuộc "không biết rồi". Nhưng cũng như **Root Server** , **TLS Server** này sẽ điều hướng trình phân giải này đến cấp tiếp theo và là cuối cùng để tìm ra được địa chỉ IP của facebook.com này là gì, đó **Name Server**.
*  Và rồi điều gì đến cũng sẽ đến **Name Server** nhận được một câu hỏi thân thương "Hey anh Name Server ơi, anh có biết được địa chỉ IP của thằng facebook.com không chứ em hỏi quanh 2 anh lớn kia rồi mà vẫn không tìm ra". Anh Name Server trả lời một câu chắc như đinh đóng cột "Cái này anh tìm được chú đợi anh một tẹo"(Vì đây là server có thẩm quyền cuối cùng nơi lưu trữ các domain name và địa chỉ IP của từng trang web). Sau đó **Name Server** trả lời thằng facebook.com có địa chỉ IP là 31.13.75.35.
*  Cuối cùng sau một hồi miệt mài tím kiếm thì nhà mạng của người gửi request(yêu cầu) facebook.com đã tìm được IP và nó sẽ cho máy tính người gửi biết địa chỉ IP là 31.13.75.35 và máy tính người gửi tên miền facebook.com có thể truy xuất trang web facebook.com rồi.
*  **Và một điều quan trọng nhất** là sau khi phân giải được điạ chỉ IP của thằng facebook.com này, nhà mang hay với cái tên mĩ miều **ISP**  nó sẽ lưu trữ địa chỉ đó trong bộ nhớ đệm của nó trong trường hợp nó nhận được một truy vấn khác cho facebook.com nó sẽ biết được điạ chỉ IP và trả về cho client(người gửi yêu cầu đến trang facebook.com) luôn chứ không cần phải đi hỏi các anh kia chi cho mắc công thực hiện lại tất cả các bước như trên.

Bài viết kết thúc và hy vọng các bạn hiểu được về cách mà DNS hoạt động.

Tài liệu tham khảo [PowerCert Animated Videos](https://www.youtube.com/watch?v=mpQZVYPuDGU).