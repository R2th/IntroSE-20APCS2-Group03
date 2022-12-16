# Web Session làm việc như thế nào?      
**Session là gì ?**   

Session là một thuật ngữ máy tính liên quan tới những thứ dường như khác nhau:  a shell session, a tcp session, a login session, a desktop session, a browser session, a server session, ... Điều đó làm chúng ta dễ nhầm lẫn để hiểu thực sự session là gì. Cũng giống như 'cache' một thuật ngữ khó hiểu ( data cache, browser cache, framework cache, network cache..) . Nhưng thực ra những định nghĩa khó hiểu đó là cách họ mô tả. 
Đầu tiên, chúng ta phải hiểu session dùng để làm gì.

**Sử dụng một session**

Nói chung, bạn nên hiểu session làm việc như các trạng thái khác nhau của một ứng dụng trong thời gian người dùng tương tác với nó, nó để định danh cho người dùng. Bây giờ cụ thể hơn cho web session, session là cấu trúc dữ liệu mà một ứng dụng sử dụng để lưu trữ dữ liệu tạm thời chỉ hữu ích trong thời gian người dùng tương tác với ứng dụng. 
Ví dụ, bạn có thể lưu tên người dùng trong phiên để bạn không phải truy vấn cơ sở dữ liệu mỗi lần bạn cần hoặc bạn có thể lưu trữ dữ liệu trong phiên để lưu trạng thái giữa các trang (giữa các trang của quy trình thanh toán chẳng hạn) ).

Hãy suy nghĩ về nó như một bộ nhớ có thể truy cập nhanh chóng được cung cấp cho mỗi người dùng đang sử dụng ứng dụng, và khi người dùng thoát, nó bị phá hủy.
Đây là khái niệm chung, cơ chế lưu trữ và cách nó được triển khai thực hiện cụ thể cho ứng dụng. Bộ nhớ tạm thời này có thể nằm trên hệ thống tệp trong các tệp văn bản, trên cơ sở dữ liệu hoặc trong bộ nhớ trong của chương trình đang thi hành ứng dụng.
Tiếp theo, chúng ta sẽ cần tìm hiểu về cấu trúc của session.

**Cấu trúc của một session**

Session là một cấu trúc dữ liệu key-value. Hãy nghĩ về nó như là một hashtable trong đó mỗi người dùng nhận được một hashkey để đưa dữ liệu của họ vào. Hashkey này sẽ là “session id”. Cấu trúc dữ liệu của session sẽ giống như sau:

![](https://images.viblo.asia/eea615f1-4026-4eb3-ba61-feb122e0b3de.png)
Mỗi người dùng chỉ có thể truy cập vào session của họ. Session có thể được lưu trữ trên server hoặc trên client. Nếu ở máy khách, nó sẽ được lưu trữ bởi trình duyệt ( hầu hết là trong cookie ) và nếu nó được lưu trữ trên server, session_id sẽ được tạo và quản lí bởi server. Vì vậy nếu có một triệu người truy cập vào server thì cũng sẽ có 1 triệu session_id cho những người dùng đó trên server.

Bây giờ, chúng ta sẽ tập trung vào session bên phía server

**Một session làm việc như thế nào?**

Làm cách nào một người dùng có thể truy cập chính xác vào session của họ? 

Đối với một ứng dụng người dùng đơn lẻ, giống như một ứng dụng máy tính để bàn, chỉ có một người dùng, vì vậy cũng có một phiên, không khó cho ứng dụng tạo kết nối giữa người dùng và dữ liệu phiên của họ. Tuy nhiên, đối với một ứng dụng web, một máy chủ có nhiều máy khách, làm cách nào để biết phiên nào là của bạn? Đó là nơi session_id phát ra.
Nguyên tắc chung đó là khi client cung cấp cho máy chủ session_id của bạn, và ngược lại máy chủ cấp cho bạn quyền truy cập vào dữ liệu phiên của bạn nếu nó tìm thấy session_id được lưu trữ trong kho dữ liệu session của nó. Cấu trúc session giống như một locker dữ liệu cho người dùng, và key cho locker là session_id, server là người cho bạn thấy cái nào là locker của bạn.
![](https://images.viblo.asia/ace9347e-f6a8-4908-9a7f-1d20087b6e71.png)
Hãy bắt đầu từ thời điểm bạn truy cập trang web. Khi bạn nhận được một trang web từ máy chủ, cùng với nội dung trang, máy chủ gửi cho bạn (thường trong cookie) session_id mà nó đặt để xác định kết nối của bạn trong tất cả các yêu cầu mà nó nhận được.
Thực tế, kiểm tra cookie trên trình duyệt, ta sẽ thấy:

![](https://images.viblo.asia/f4770d97-04f0-4ccf-b75c-2438d95b325a.png)

Sau khi bạn đăng nhập, ứng dụng đã xác thực mật khẩu của bạn và đăng nhập và lưu id người dùng của bạn trong phiên để mỗi khi bạn yêu cầu, bạn sẽ không phải đăng nhập lại (điều này sẽ được trình bày chi tiết sau).

Bây giờ chúng ta hãy xem xét sơ đồ trên để hiểu những gì đang diễn ra khi bạn thực hiện một yêu cầu khác để nhận được nhiều dữ liệu hơn. 
Ví dụ: giả sử bạn đã truy cập vào hộp thư đến Gmail sau khi bạn đăng nhập và bây giờ bạn muốn điều hướng đến trang dự thảo (drafts)  của mình. 

**Trình tự hoạt động sẽ là:**

1 - Bạn gửi yêu cầu http đến máy chủ yêu cầu trang dự thảo. Cùng với yêu cầu http này, bạn gửi id phiên của mình để thông báo cho máy chủ “hey, tôi đã đăng nhập từ trước đây, hãy cho tôi trang dự thảo của tôi ngay bây giờ”. Session_id thường được gửi trong cookie, nhưng nó cũng có thể được gửi trong các tham số GET hoặc POST, hay bất kể kỹ thuật nào mà session_id chỉ cần được gửi đến máy chủ.

2 - Máy chủ nhận yêu cầu của bạn. Trước khi nó cung cấp cho bạn trang dự thảo, nó kiểm tra session_id của bạn, tìm nó trong kho dữ liệu phiên, nó tìm thấy 5, id phiên của bạn.

3 -Máy chủ sau đó thực thi mã tương ứng với yêu cầu của bạn “cung cấp cho tôi trang nháp”.

4 - Mã bắt đầu bằng cách lấy id người dùng của bạn từ phiên được cung cấp bởi máy chủ trước đó, sau đó nó sử dụng nó để hỏi cơ sở dữ liệu "cung cấp cho tôi bản nháp của người dùng có id người dùng này".

5 - Cuối cùng khi mã nhận được bản nháp của bạn từ cơ sở dữ liệu, nó tạo một trang html, đặt các bản nháp của bạn vào đó và đưa nó vào máy chủ.

6 - Máy chủ gửi cho bạn trang nháp của bạn, cùng với session_id của bạn. 

**Trạng thái đã đăng nhập**

Trong trao đổi này, bạn có thể vừa gửi id người dùng trong yêu cầu của mình và nói với máy chủ bạn muốn bản nháp của id người dùng này. Nhưng điều đó có nghĩa là bất kỳ ai biết id người dùng của bạn cũng sẽ có thể nhận bản nháp của bạn và bạn không muốn điều đó cho dữ liệu cá nhân của mình. Bạn thích rằng ứng dụng chỉ gửi dữ liệu này cho bạn. Vì vậy, để bảo vệ dữ liệu của bạn, ứng dụng giúp bạn đăng nhập trước để đảm bảo rằng người yêu cầu dữ liệu thực sự là bạn. Và thông thường đối với bất kỳ yêu cầu cho dữ liệu cá nhân, nó sẽ hỏi bạn là ai đầu tiên.
Nếu không có session_id trong quá trình trao đổi này, khi bạn hỏi trang dự thảo của mình, máy chủ sẽ không biết bản nháp của người bạn đang yêu cầu và nó sẽ yêu cầu bạn đăng nhập trước. HTTP là giao thức không trạng thái vì vậy nó không lưu thực tế là bạn đã đăng nhập. Tại mỗi yêu cầu, HTTP không biết gì về những gì đã xảy ra trước đó, nó chỉ mang yêu cầu. Vì vậy, đối với bất kỳ yêu cầu cho dữ liệu cá nhân, bạn sẽ phải đăng nhập lại để đảm bảo ứng dụng biết điều này thực sự là bạn. Điều này sẽ rất khó chịu.
Đó là vấn đề mà các session giải quyết. Để tránh đăng nhập mọi lúc sau lần đầu tiên, các session giữ cho bạn đăng nhập trong khi bạn kết nối với máy chủ. Về cơ bản, sau khi bạn đăng nhập lần đầu tiên, máy chủ ghi nhớ trong session rằng đây thực sự là bạn và cho phép bạn yêu cầu thêm dữ liệu mà không hỏi lại bạn là ai. Đó là cách session hoạt động rất hữu ích.
![](https://images.viblo.asia/0dc84e85-39ba-4f14-95c9-94bc72fda307.png)
Việc giữ cho bạn đăng nhập là một trong những ứng dụng chính của session, nhưng các session cũng có thể được sử dụng để lưu dữ liệu tạm thời hoàn toàn độc lập với trạng thái đăng nhập. Bạn có thể quyết định đặt một số dữ liệu trong session bởi vì nó nhanh hơn để truy cập.
Cũng như một lưu ý phụ, từ quan điểm của máy chủ: một kết nối = một phiên id. Vì vậy, nếu bạn kết nối từ hai trình duyệt khác nhau, máy chủ sẽ tạo hai session_id. Bạn nên nhớ rằng session_id chỉ xác định kết nối của bạn với máy chủ. Tất cả logic nhận dạng người dùng được xử lý bởi ứng dụng. 

Tài liệu tham khảo: https://machinesaredigging.com/2013/10/29/how-does-a-web-session-work/