Ở bài viết trước mình đả giải thích khá rỏ ràng về Zapier , các bạn có thể tham khảo ở đây nhé.
https://viblo.asia/p/zapier-la-gi-lap-trinh-no-nhu-the-nao-p1-Do7544L05M6

Bài viết tiếp theo này mình hướng các bạn đến một nền tảng khá đầy đủ của thằng Zapier này nhé . 
### 3. Tạo ứng dụng bằng Platform .

#### a. Bắt đầu .

Để tạo một Zapier app bằng Platform thì điều đầu tiên bạn cần tạo cho mình 1 tài khoản Zapier . Sau khi tạo xong bạn vào tạo một Integration của Zapier . 

https://zapier.com/app/developer/app/new

![](https://images.viblo.asia/f019de15-85ed-4838-a284-2464848b2928.png)

Đây là giao diện người dùng để tạo một Integration nhé. 
Bạn nhập thông tin cho chính xác. Để muốn hiểu rỏ hơn các chỉ mục bạn có thể đọc thêm ở đây .
https://platform.zapier.com/docs/start

Sau khi điền thông tin đầy đủ thì bạn submit để tạo một Integration
Dưới đây là giao diện khi tạo xong nhé. 

![](https://images.viblo.asia/457ffa98-9bf4-4ba6-a015-260291c773c1.png)

#### b. Authentication .
Sau khi có một Integration thì như làm một ứng dụng bất kỳ. Bạn phải có cái gì đó ràng buộc để có thể vào được Zap app của bạn.(Tức là mình phải có một bước để cái Zap app của bạn có thể login vào hệ thống của chúng ta để lấy dử liệu). Vậy nên điều đầu tiên chúng ta phải làm đó là Authentication cho app . 

Đương nhiên mình sẽ không hươngs dẩn lại cách để thực hiện từng Auth cụ thể. Mà mình sẽ xoáy sâu vào việc giải thích nó làm gì và hoạt động như thế nào. Vì cách làm thì nó có ở document rồi. Mình sẽ add link đi kèm để các bạn biết thứ tự .

> Có 5 cách để thực hiện việc Authentication
   
* Basic Auth
* Session Auth
* API Key
* OAuth v2
* Digest Auth

Đối với dân lập trình thì các bạn chắc cũng biết về chúng. Mình sẽ đi sơ qua nhé.

 * Basic Auth : 
 Link tham khảo : https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 
 Xác thực cơ bản cho phép người dùng kết nối tài khoản của họ với Zapier bằng tên người dùng và mật khẩu thông qua một hình thức được xây dựng sẵn mà sau đó, Zapier dùng lệnh gọi API để xác thực  tên người dùng và mật khẩu là hợp lệ.

* Session Auth

Xác thực phiên cho phép người dùng nhập tên người dùng và mật khẩu hoặc thông tin đăng nhập ứng dụng khác, với các trường tùy chỉnh tùy chọn nếu cần để xác thực. Sau đó, Zapier thực hiện cuộc gọi API tới URL trao đổi mã thông báo trong đó Zapier trao đổi thông tin đăng nhập cho mã thông báo xác thực, mà Zapier sẽ sử dụng để xác thực mọi cuộc gọi API tiếp theo.

* API Key

Xác thực khóa API cho phép người dùng nhập khóa API tùy chỉnh từ ứng dụng của bạn và có thể tùy chọn yêu cầu thông tin bổ sung như tên miền. Người dùng sẽ cần xác định vị trí khóa API từ ứng dụng của bạn, sau đó nhập mã này vào biểu mẫu xác thực Zapier. Sau đó, Zapier sẽ chuyển khóa API, cùng với bất kỳ chi tiết xác thực bổ sung nào cần thiết, để xác thực từng lệnh gọi API.

* OAuth v2

Xác thực OAuth v2 cho phép người dùng đăng nhập vào tài khoản ứng dụng và cho phép truy cập Zapier thông qua cửa sổ bật lên từ ứng dụng đó. Ứng dụng sẽ gửi mã thông báo yêu cầu trước khi người dùng xác thực, sau đó Zapier trao đổi lấy mã thông báo truy cập sau khi họ xác thực.

* Digest Auth

Xác thực Digest cho phép người dùng nhập tên người dùng, mật khẩu và các chi tiết cần thiết khác để xác thực ở dạng được cung cấp bởi Zapier. Sau đó, với mỗi lệnh gọi API, trước tiên, Zapier chạy một lệnh gọi API để yêu cầu khóa, trước khi chạy lệnh gọi API kích hoạt hoặc hành động chuyển các chi tiết xác thực được mã hóa và bất kỳ dữ liệu cuộc gọi API nào khác đến ứng dụng của bạn.

Trên là một số khái niệm . Còn khi làm thì bạn nên hiểu nó như này.
Để một Zap lấy được data từ một ứng dụng của mình để chia sẽ cho các ứng dụng khác. Bạn cần phải có một giao thức để truy cập vào ứng dụng của mình do mình tạo ra. 

Demo ví dụ mẩu có trên trang chủ của Zapier : https://platform.zapier.com/docs/basic

Điều chú ý. bạn cần cung cấp API login của ứng dụng để Zapier thiết lập một màn hình login vào hệ thống của chúng ta. Sau khi Zapier login xong thì sẽ lưu lại giá trị Authentication để tiếp tục request đến server ứng dụng của mình và lấy data với chỉ một lần đăng nhập đầu tiên .

![](https://images.viblo.asia/bdc42611-1db4-4117-9c2c-ae761c8b6401.png)

Đối với ứng dụng của mình thì mình dùng API key. Sau khi lựa cho APi key thì nó sẽ có 3 bước để thiết lập như trên hình. 

Bước 1:  Mình tạo một cái Fields để trên giao diện Zap app ta có thể có ô Input nhập vào submit lên server để check có đúng API key của ứng dụng mình không. 

Bước 2 :  Thiết lập Connect để kết nôí tới server (Giống như PostMan vậy ) Bạn cung cấp API cụ thể để nó check và trả response về. Nếu đúng trả về 200 và mình lưu data lại để lần request sau không cần phải login lại lần nữa. Nếu sai thì báo message lên cho người ta biết là mình Auth sai và yêu cầu nhập lại.

Bước 3: Bước này là bước xem kết quả sau khi mình thiết lập xong và nhập API key. 


#### c. Triggers .

![](https://images.viblo.asia/d05a1bac-d141-484d-830a-70b0cd29e3b0.png)

Đây là giao diện để tạo một triggers .

Đầu tiên bạn hiểu khái niệm Triggers là gì . Hiểu nôm na là nó là một hành động của Zapier truy cập vào data của ứng dụng của mình để lấy thông tin trích xuất cho Zapier.
 
Còn cách tạo một Triggers như thế nào thì bạn đọc ở đây sẽ rỏ 
https://platform.zapier.com/docs/triggers

Mỗi Zap bắt đầu với một trình kích hoạt, được cung cấp bởi một webhook theo dõi dữ liệu mới khi nó gọi API GET để kiểm tra dữ liệu mới định kỳ. Kích hoạt là cách người dùng ứng dụng của bạn có thể bắt đầu quy trình làm việc tự động bất cứ khi nào họ thêm hoặc cập nhật một cái gì đó trong ứng dụng của bạn. Zapier có thể xem bất kỳ mục mới hoặc cập nhật nào thông qua API của bạn hoặc tùy chọn, bạn có thể bao gồm các trường đầu vào để người dùng nhập bộ lọc, thẻ và các chi tiết khác để lọc qua dữ liệu mới và xem các mục họ muốn.

![](https://images.viblo.asia/e9fed491-dd35-48e0-8dcc-fc02a14dfd60.png)

Bên trên là một trigger minhf tạo sẵn của cái app mình demo .
Thực chất nó là mục để setting việc call api get data từ server của mình để zapier biết được những data nào đang thay đổi và cập nhật chúng, lọc dử liệu và gửi đến một ứng dụng thứ ba thông qua việc setting action. Bạn đọc thêm tài liệu và làm nhé. Mình chỉ giải thích nó là như thế nào thôi. Bây giờ chúng ta qua phần Action. 

#### d. Action .

Tất cả các Zaps bắt đầu với một trình kích hoạt theo dõi dữ liệu mới hoặc cập nhật. Họ nhận được data từ trigger. Mặc dù vậy, mọi thứ mà Zap thực hiện với dữ liệu đó đều được thực hiện bằng một Action nhất định. Các Action của Zapier đẩy hoặc đưa dữ liệu mới vào các ứng dụng thông qua các lệnh gọi API chuyển dữ liệu từ các trường nhập liệu tùy chỉnh của người dùng. Các bước hành động trong Zaps có thể tạo các mục mới trong ứng dụng hoặc cập nhật các mục hiện có bằng hành động tạo hoặc tìm các mục hiện có trong ứng dụng bằng các hành động tìm kiếm (có thể được ghép đôi với các hành động tạo để thêm một mục mới nếu tìm kiếm không trả về một kết quả). Mỗi hành động cũng trả về các trường đầu ra chi tiết những gì đã được tạo ra và dữ liệu đó có thể được sử dụng trong các bước tiếp theo để xây dựng các quy trình công việc chi tiết. Zapier không cho phép các bước hành động để xóa hoặc xóa dữ liệu, để tránh mất dữ liệu. Các bước hành động chỉ có thể thêm hoặc cập nhật dữ liệu.

![](https://images.viblo.asia/f920d655-5e0d-4956-8998-c32960bff6ac.png)

Trên là giao diện tạo một Action. Nó là một trình cài đặt API để thực hiện một lệnh tạo mới hoặc cập nhật data đến một ứng dụng bên ngoài .

Bạn có thể tham khảo thêm về cách tạo một action hợp lệ ở đây : https://platform.zapier.com/docs/actions

#### d. Kết luận .

Nếu một app đơn giản thì chỉ cần 3 yếu tố :
1. Authentication : Đơn giản là để truy cập vào app của mình thông qua một lần đăng nhập.
2. Trigger : Lất data từ app của mình để Zapier thu thập dử liệu , chuyển đổi dử liệu , thanh lọc dử liệu, đầu vào .
3. Action : Chuyển dử liệu đầu vào cho một ứng dụng thứ 3 bên ngoài .

Nếu phức tạp hơn thì bạn có thể làm them các mục mà zapier hổ trợ đó là :
- Search and create : https://platform.zapier.com/docs/search-create
- Advanced  : https://platform.zapier.com/docs/advanced
........
Và nhiều hơn nửa. 
ở bài viết trên thì mình tóm tắt và giải thích rỏ từng chức năng để hiểu và tạo được một Zap đơn giản. Ở bài viết sau mình sẽ hướng dẩn các bạn code một zap và cách deploy nó trên Zapier Store nhé. Thank for your readding (bow)