Tiếp nối series **Authentication story** của mình lần trước, chắc hẳn các bạn đã nắm rõ về bản chất của quá trình authentication, chính là **Xác thực một HTTP request bằng một dấu hiệu nào đó**. Trong phần 2 này, mình sẽ liệt kê cho các bạn một số cơ chế authentication cơ bản khi làm việc với nền tảng web. 

Tuy nhiên, mình tiếp cận việc liệt kê này dưới góc nhìn của **bản chất** quá trình authentication đã được nêu từ bài viết trước, qua đó làm sáng tỏ được 3 phần của một cơ chế authentication:

- **Tạo ra dấu hiệu gì**
- **Lưu trữ dấu hiệu ở đâu** 
- **Kiểm tra dấu hiệu thế nào** 

Với các cơ chế authentication phức tạp, mình cũng sẽ không để nó nguyên 1 cục như vậy mà sẽ tách thành nhiều quá trình authentication nhỏ hơn để các bạn hiểu được rõ bản chất dựa vào 3 phần mình đã nói. 

Về cơ bản thì một quá trình authentication sẽ gồm 2 bước:
- **Xác thực một user (thường là request đầu tiên)**
- **Lưu giữ đăng nhập (cho các request phía sau)**


Trong bài viết này, mình sẽ đề cập chủ yếu tới 3 cơ chế lưu giữ đăng nhập người dùng cơ bản là:

- **Basic Authentication**
- **Session-based Authentication**
- **Token-based Authentication**

## First things first

Khoan hãy đi sâu vào bài viết, trước hết các bạn hãy cởi bỏ giày dép, mặc quần đùi mát mẻ, kiếm ly nước mát đặt trên bàn và ngồi khoanh chân một cách thoải mái trên ghế để có một tư thế thoải mái trước khi bắt đầu.

Bài viết yêu cầu các bạn trang bị cho mình thêm một số kiến thức cơ bản trước khi bắt đầu. Mình có thể nói qua nhưng sẽ không nói sâu về những thứ này ở đây:

- **Session/cookie:** Nó là gì, được lưu tại đâu, khác nhau thế nào.
- **Mã hóa, giải mã:** Biết mã hóa 1 chiều, 2 chiều, giải mã là gì, nếu biết cả mã hóa đối xứng, bất đối xứng thì tốt.

Tạm thời thế, nếu đã chuẩn bị hành trang đầy đủ thì hãy bắt đầu nào. Nên nhớ, tất cả các cơ chế này chỉ mang tính chất tham khảo và được chấp nhận rộng rãi. Tuy nhiên bạn **hoàn toàn và chủ động** trong việc chọn lựa 1 trong các cơ chế, kết hợp các cơ chế hay thậm chí là thay đổi hoặc tạo ra cơ chế authentication cho riêng hệ thống của mình.

## Basic Authentication

Basic Auth là cơ chế xác thực đơn giản nhất của một ứng dụng web, việc ứng dụng nó rất dễ dàng và đã được nhiều phần mềm / máy chủ tích hợp và xử lý một cách tự động. 

> Cách hoạt động của Basic Auth là gửi chính **username + password** của người dùng theo **mỗi request**. 

### Flow

- **Dấu hiệu:** Chuỗi username:password đã được mã hóa Base64. Ví dụ có username là `abc`, password là `123` thì ta tạo chuỗi mã hóa: `abc:123` --Base64--> `YWJjOjEyMw==`
- **Lưu trữ dấu hiệu:** 
    - Tại server: Máy chủ web sẽ lưu lại username, password trong database, file (`htpasswd`),...
    - Tại client: Sau khi hỏi người dùng nhập username và password lần đầu, browser sẽ lưu lại 2 giá trị này trong bộ nhớ được quản lý bởi mỗi trình duyệt (và chúng ta không thể tiếp cận bộ nhớ này bằng code trên trang) để tránh phải liên tục hỏi chúng ta username, password. Tuy nhiên thời gian lưu thường là có giới hạn.
    - Truyền tải: chuỗi đã mã hóa base64 phía trên sẽ được truyền trong HTTP request trong **Authorization header** với từ khóa Basic phía trước: `Authorization: Basic YWJjOjEyMw==`
- **Kiểm tra dấu hiệu:** Với **mỗi request** gửi lên kèm thông tin username/password trên, server sẽ **so sánh** username/password với database, config file,... để kiểm tra tính hợp lệ.

Flow của Basic Auth: 

![basic](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/9px2o01d7v_BasicAuth.jpg)

### Usecase

Dưới đây là 1 số ưu nhược điểm (thật ra gọi là đặc điểm thì đúng hơn, vì nhược điểm cũng có thể là ưu điểm khi phù hợp với usecase). 

**Trước hết là ưu điểm:**

- **Đơn giản**, do đó được hầu hết các trình duyệt, webserver (nginx, apache,...) hỗ trợ. Bạn có thể dễ dàng config cho webserver sử dụng Basic Auth với 1 vài dòng config.
- **Dễ dàng kết hợp với các phương pháp khác**. Do đã được xử lý mặc định trên trình duyệt và webserver thông qua truyền tải http header, các bạn có thể dễ dàng kết hợp phương pháp này với các phương pháp sử dụng cookie, session, token,...

**Nhược điểm:**

- **Username/password dễ bị lộ**. Do mỗi request đều phải truyền username và password nên sẽ tăng khả năng bị lộ qua việc bắt request, log server,...
- **Không thể logout**. Vì việc lưu username, password dưới trình duyệt được thực hiện tự động và không có sự can thiệp của chủ trang web. Do vậy không có cách nào logout được người dùng ngoại trừ việc **tự xóa lịch sử duyệt web** hoặc **hết thời gian lưu của trình duyệt**.
- **Không thân thiện với người dùng**. Việc hiển thị hộp thoại đăng nhập cũng như thông báo lỗi của trình duyệt, như các bạn đã biết là vô cùng nhàm chán, không chứa đựng nhiều thông tin cho người dùng.

Vì những đặc điểm trên, Basic Auth thường được sử dụng trong **các ứng dụng nội bộ**, **các thư mục cấm** như **hệ thống CMS**, **môi trường development**, **database admin**,... lợi dụng việc chặt chẽ của kiểm tra Basic Auth trên các web server để tránh tiết lộ thông tin hệ thống nội bộ cho người ngoài, phòng chống hack, khai thác lỗ hổng ứng dụng,...

Ví dụ để bảo vệ đường dẫn tới phpMyAdmin là trang quản trị CSDL MySQL, ngoại trừ việc yêu cầu login vào DB mình sẽ đặt thêm Basic Auth vào toàn bộ đường dẫn để chống người ngoài xâm nhập.

## Session-based Authentication

Cơ chế **session-based authentication** thi thoảng còn được gọi là cookie-based authentication. Tuy nhiên đừng nhầm lẫn giữa 2 khái niệm này nhé. Nó không giống nhau về ý nghĩa nhiều như bạn tưởng đâu. Nếu các bạn đều đã biết session nghĩa là gì, thì mình hãy điểm qua xem session-based authentication là gì:

> Session-based authentication là cơ chế đăng nhập người dùng dựa trên việc tạo ra **session** của người dùng ở **phía server**. Sau quá trình xác thực người dùng thành công (username/password,...) thì **phía server** sẽ tạo và lưu ra một session chứa **thông tin của người dùng đang đăng nhập** và trả lại cho client **session ID** để truy cập session cho những request sau.

### Flow

Chúng ta hãy điểm qua các khía cạnh cơ bản của cơ chế này:

- **Dấu hiệu:** 1 chuỗi (thường là random) unique gọi là **Session ID**
- **Lưu trữ dấu hiệu:** 
    - Tại server: Lưu **dữ liệu của session** trong database, file, ram,... và dùng **Session ID** để tìm kiếm.
    - Tại client: Lưu **Session ID** trong bộ nhớ cookie, hoặc URL trang web, form field ẩn,...
    - Truyền tải: Session ID sẽ xuất hiện trong các HTTP request tiếp theo trong **Cookie** (header `Cookie: SESSION_ID=abc`), **URL** (`/profile?session_id=abc`), **body** (form field ẩn),...
- **Kiểm tra dấu hiệu:** Server dùng **Session ID** client truyền lên để tìm **dữ liệu của session** từ các nguồn lưu như database, file, ram,...

> Quá trình set **Session ID** thường được thực hiện một cách tự động bởi server, cho nên session-based authentication thường sử dụng **Cookie**, vì cookie có thể set được từ phía server và được browser áp dụng tự động cho các request tiếp theo. Do đó cơ chế này thường đi liền với cookie. Tuy nhiên hãy nhớ là có nhiều cách để sử dụng được session ID mà không dùng cookie nữa nhé.

Flow của Session-based Authentication

![session-based](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/z7sywllwa3_SessionBased.jpg)

### Usecase

**Ưu điểm:**

- **Thông tin được giấu kín:** Client chỉ được biết tới **Session ID** thường là 1 chuỗi random không mang thông tin gì của người dùng, còn mọi thông tin khác của phiên đăng nhập hay người dùng hiện tại đều được lưu phía server nên cơ chế này giữ kín được thông tin của người dùng trong quá trình truyền tải.
- **Dung lượng truyền tải nhỏ:** Bởi vì tự thân **Session ID** không mang theo thông tin gì, thông thường chỉ là một chuỗi ký tự unique khoảng 20-50 ký tự, do vậy việc gắn Session ID vào mỗi request không làm tăng nhiều độ dài request, do đó việc truyền tải sẽ diễn ra dễ dàng hơn.
- **Không cần tác động client:** Theo mình thì để sử dụng cơ chế session này bạn chủ yếu chỉ cần sửa phía server. Client mà cụ thể là browser hầu như không cần phải xử lý gì thêm bởi đã được tích hợp tự động (đối với cookie), hoặc response trả về của server đã có sẵn (đối với session ID ở URL hoặc hidden form)
- **Fully-controlled session:** Tính chất này có thể cho phép hệ thống quản trị **TẤT CẢ** các hoạt động liên quan tới phiên đăng nhập của người dùng như thời gian login, force logout,...

**Nhược điểm:**

- **Chiếm nhiều bộ nhớ:** Với mỗi phiên làm việc của user, server sẽ lại phải tạo ra một session và lưu vào bộ nhớ trên server. Số data này có thể còn lớn hơn cả user database của bạn do mỗi user có thể có vài session khác nhau. Do vậy việc tra cứu đối với các hệ thống lớn nhiều người dùng sẽ là vấn đề.
- **Khó scale:** Vì tính chất stateful của việc lưu session data **ở phía server**, do đó bạn sẽ khó khăn hơn trong việc scale ngang ứng dụng, tức là nếu bạn chạy ứng dụng của bạn ở 10 máy chủ, hay 10 container, thì 1 là bạn phải **dùng chung chỗ lưu session**, 2 là nếu không dùng chung bộ nhớ session thì phải có giải pháp để **ghi nhớ user đã kết nối tới server nào** của bạn. Nếu không rất có thể chỉ cần ấn refresh thôi, user kết nối với server khác khi cân bằng tải là sẽ như chưa hề có cuộc login ngay.
- **Phụ thuộc domain:** Vì thường sử dụng cookie, mà cookie lại phụ thuộc vào domain, do vậy khả năng sử dụng phiên đăng nhập của bạn sẽ bị giới hạn ở đúng domain được set cookie. Điều này không phù hợp với các hệ thống phân tán hoặc tích hợp vào ứng dụng bên thứ 3.
- **CSRF:** Nói nôm na là **Session ID** thường được lưu vào **Cookie**, và cookie mới là thứ dễ bị tấn công kiểu này. Vì cookie được **tự động** gắn vào các request tới domain của bạn. Ví dụ:
    + User vừa login vào `my-bank.com` và được set cookie: session_id=123
    + User vào trang web `taolahacker.com` xem tut của mình
    + Trên `taolahacker.com` mình ngầm gửi 1 request ajax tới domain `my-bank.com`.
    + Vì browser **tự động** thêm cookie `session_id=123` vào request ajax trên, do vậy request của mình có thể thao tác mọi thứ **NHƯ USER**

Vì những đặc điểm trên, **Session-based Authentication** thường được dùng trong các **website** và những ứng dụng web làm việc chủ yếu với browser, **những hệ thống monolithic** do cần sự tập trung trong việc lưu session data và sự hạn chế về domain.

## Token-based Authentication

Chắc hẳn các bạn đều đã nghe tới cơ chế token-based authentication dạo gần đây, rồi là JWT, microservices,... đều liên quan tới cái này. Chúng ta sẽ tìm hiểu vì sao.

> Token-based Authentication là cơ chế đăng nhập người dùng dựa trên việc tạo ra **token** - một chuỗi ký tự (thường được mã hóa) mang **thông tin xác định người dùng** được **server tạo ra** và **lưu ở client**. Server sau đó có thể **không lưu lại** token này.

### Flow

- **Dấu hiệu:** 1 chuỗi chứa thông tin người dùng (thường được mã hóa và signed) gọi là **token**
- **Lưu trữ dấu hiệu:** 
    - Tại server: Thường là **không cần lưu**.
    - Tại client: Ứng dụng client (javascript, mobile,...) phải tự lưu token trong các bộ nhớ ứng dụng, local storage, cookie,...
    - Truyền tải: Token sẽ xuất hiện trong các HTTP request tiếp theo trong **Authorization header** (`Authorization: Bearer abc`), **Cookie** (header `Cookie: token=abc`), **URL** (`/profile?token=abc`), **body** (ajax body, field),...
- **Kiểm tra dấu hiệu:** Token thường có tính self-contained (như JWT), tức là có thể tự kiểm tra tính đúng đắn nhờ vào các thuật toán mã hóa và giải mã chỉ dựa vào thông tin trên token và 1 secret key nào đó của server. Do đó server không cần thiết phải lưu lại token, hay truy vấn thông tin user để xác nhận token.

> [**JWT**](https://jwt.io/introduction/) hay Json Web Token là **một loại token** được chấp nhận và sử dụng rộng rãi như một tiêu chuẩn của các nền tảng web hiện đại ([RFC 7519](https://tools.ietf.org/html/rfc7519)) bởi nó thỏa mãn được tính chất **self-contained**, được hỗ trợ bởi nhiều ngôn ngữ và nền tảng và hơn hết là cấu trúc JSON đơn giản, nhỏ gọn hơn rất nhiều so với các loại token khác như **Simple Web Tokens (SWT)** and **Security Assertion Markup Language Tokens (SAML)**.

Flow của Token-based Authentication:

![token-based](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/4775k0z5fg_TokenBased.jpg)

### Usecase

**Ưu điểm:**

- **Stateless:** Bởi vì token thường có tính chất self-contained, do vậy server không cần lưu thêm thông tin gì về token hay map giữa token và người dùng. Do vậy đây là tính chất quan trọng nhất, phục vụ cho việc scale ứng dụng theo chiều ngang khi không cần quan tâm tới việc bạn sẽ sinh ra token ở đâu và verify token ở đâu.
- **Phù hợp với nhiều loại client:** Nên nhớ, cookie là một concept được **các browser** áp dụng tự động, còn với các client sử dụng Web API như mobile, IoT device, server,... thì việc sử dụng cookie lại rất hạn chế. Sử dụng token trong header hay URL,... sẽ dễ dàng hơn cho client trong việc lưu lại token và truyền tải token.
- **Chống CSRF:** Do việc sử dụng token phải được client xử lý từ việc lưu tới truyền tải, do vậy sử dụng token (mà không dùng cookie) sẽ phòng chống được các trường hợp tấn công như với trường hợp session/cookie.
- **Không bị giới hạn bởi domain:** Đây là tính chất giúp các hệ thống hiện đại có sự tham gia của bên thứ 3 hoạt động dễ dàng hơn khi không bị giới hạn chỉ ở domain của hệ thống đăng nhập.

**Nhược điểm:**

- **Khó quản lý đăng xuất:** Bởi vì server không lưu thông tin gì về token hay session của user, do đó điều khó kiểm soát nhất chính là việc đăng xuất. Và vì việc kiểm tra token chỉ dựa vào thông tin trên token, do vậy sẽ khó để ứng dụng của chúng ta vô hiệu hóa một token vẫn còn hiệu lực.
- **Phức tạp phần client:** Cơ chế sử dụng token thường yêu cầu client phải có xử lý liên quan tới lưu token, gửi token, do vậy sẽ không phù hợp với những website kiểu cũ, sử dụng nhiều server render html và phần javascript hạn chế.
- **Thông tin dễ lộ:** Khác với session, thông tin về phiên đăng nhập của người dùng có trên token và được lưu phía client, do vậy sẽ có các nguy cơ liên quan tới lộ thông tin trong token trong quá trình lưu trữ, truyền tải,... Chính vì vậy, thông thường người ta chỉ lưu 1 số thông tin thiết yếu như `user_id`, `username` mà không lưu những thông tin nhạy cảm như `password` vào token.
- **Dung lượng truyền tải lớn:** Thường thì 1 token sẽ dài hơn session ID khá nhiều, mà token lại được gửi với mỗi request, do vậy độ dài request sẽ tăng lên, do đó băng thông truyền tải cũng sẽ cần phải tăng theo. Tuy nhiên, đây chỉ là một điểm hạn chế nhỏ so với những lợi ích nó mang lại.

Vì các đặc điểm trên, **Token-based Authentication** thường được sử dụng trong các hệ thống **Web API**, các **hệ thống phân tán, micro-services**, các hệ thống có sự tham gia của các nền tảng khác như **mobile, IoT, server,...**, hoặc các website kiểu mới (phân tách rõ UI app và API).

## Bảng so sánh

Sau đây là bảng so sánh để các bạn dễ hình dung về 3 cơ chế đăng nhập này:

|   Đặc điểm  |              Basic               |                   Session-based                   |                       Token-based                        |
|-------------|----------------------------------|---------------------------------------------------|----------------------------------------------------------|
| Dấu hiệu    | username + password              | Chuỗi random (Session ID)                         | Chuỗi mang thông tin được mã hóa                         |
| Truyền tải  | Authorization Header             | Header (cookie) / URL / Body (form)               | Header (Auth, custom) / URL / Body                       |
| Lưu Server  | Không lưu (vì chính là UserDB)   | Có lưu Session Data (memory, database, file,...)  | Không lưu (vì token chứa đủ thông tin rồi)               |
| Lưu Client  | Browser tự lưu (username + pass) | Cookie (Session ID)                               | Local storage, Cookie, session storage (browser)         |
| Cách verify | So sánh với UserDB               | Dùng Session ID để tìm data trong session storage | Kiểm tra tính toàn vẹn của token qua signature của token |
| Phù hợp cho | Hệ thống internal                | Monolithic website                                | Web API của hệ thống phân tán, đa nền tảng,...           |

Bonus một trường hợp dễ hiểu lầm:

> **Signed Cookie** là cookie chứa thông tin phiên đăng nhập được mã hóa và signed, là 1 phương pháp cookie-based nhưng xếp vào loại **Token-based** vì thông tin phiên đăng nhập được lưu hết trên cookie (client) nhé

## Kết luận

Trên đây là 3 cơ chế cơ bản của quá trình đăng nhập người dùng trên ứng dụng web của bạn. 3 cơ chế này nhằm mục đích giữ người dùng đăng nhập trên ứng dụng web và được mình phân tích dựa trên đặc điểm về việc **tạo ra dấu hiệu**, **lưu và truyền tải dấu hiệu**, **kiểm tra dấu hiệu** xoay quanh HTTP request.

Như đã nói ở đầu bài, quá trình authentication gồm 2 bước:
- **Xác thực một user**
- **Lưu giữ đăng nhập**

Thì mình đã giới thiệu qua cho các bạn 3 cơ chế cơ bản của **bước 2: lưu giữ đăng nhập**. Các bài tiếp theo chúng ta sẽ quay trở lại **bước 1: xác thực một user** và làm quen với các khái niệm như Single Sign On, Social Sign In, OAuth,... để xác thực một user với hệ thống sau nhé.

Cám ơn các bạn đã theo dõi, mọi góp ý xin để lại comment.