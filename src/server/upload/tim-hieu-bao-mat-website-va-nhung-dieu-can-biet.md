### 1. Mở đầu:

Bạn khá yên tâm, tin tưởng và luôn nghĩ rằng website của bạn sẽ không bao giờ bị tấn công (hack website) bởi vì nhiều lí do khác nhau:

Lí do 1: Website của bạn chẳng có gì để hack cả. Thật ra hacker luôn có những lý do khác nhau từ nhỏ đến lớn để hack vào các website như của bạn. 

Lí do 2: Website của bạn đang sử dụng công nghệ ABC và nó rất xịn. Đảm bảo sẽ không ai hack bạn cả –> có thể bạn đúng, nhưng cũng có thể bạn “thiếu”. Những lỗ hổng trong website luôn xuất hiện cho dù vài chục năm nay người ta luôn cố gắn để lấp đầy. Nhưng nó vẫn còn đó và sẽ không ai mạnh miệng khẳng định 100% là không bị hack.

Lí do 3: Cho dù website tôi có bị hack thì cũng chẳng làm sao với tôi cả. Tôi không quan trọng –> bạn đang đánh giá thấp vai trò trang web của mình và tiềm năng kinh doanh trên mạng internet.

Thực tế cũng có khá nhiều người vô tư giống như bạn, họ không bận tâm đến vấn đề bị tấn công website, cho đến khi bị hack, họ mới hốt hoảng giật mình thì đã quá muộn rồi. Do đó muốn thảnh thơi tập trung vào việc kinh doanh thì bạn nên cân nhắc lựa chọn một công ty thiết kế website uy tín , sẽ góp phần rất lớn trong bảo mật website cho bạn. Mặc dù giao phó hoàn toàn cho bên công ty thiết kế trang web thì bạn cũng cần phải biết những nội dung cơ bản về bảo mật website là như thế nào.
 
### 2. Thường xuyên cập nhật phần mềm ứng dụng website:

Có vẻ như đây là một điều hiển nhiên, việc đảm bảo tất cả phần mềm được cập nhật là điều quan trọng trong việc giữ cho trang web của bạn tránh khỏi những nguy hiểm luôn luôn rình rập. Điều này có thể áp dụng cho cả hệ điều hành máy chủ và bất kỳ phần mềm nào bạn đang chạy trên trang web bao gồm CMS hoặc diễn đàn, khi lỗ hổng bảo mật website được tìm thấy trong phần mềm ứng dụng, tin tặc sẽ chớp lấy thời cơ nhanh chóng cố gắng lạm dụng chúng.

Nếu bạn đang sử dụng một giải pháp quản lý lưu trữ thì bạn không cần phải lo lắng nhiều về việc áp dụng các bản cập nhật bảo mật cho hệ điều hành vì công ty sở hữu đặc quyền sẽ giúp bạn quản lý việc này.

Nếu bạn đang sử dụng phần mềm của bên thứ ba chẳng hạn như một CMS hoặc diễn đàn, bạn nên đảm bảo rằng bạn đã sở hữu một phiên bản bảo mật khác. Hầu hết các nhà cung cấp sản phẩm đều có một danh sách gửi thư thông báo hoặc nguồn cấp dữ liệu RSS nêu rõ bất kỳ vấn đề về bảo mật website liên quan. WordPress, OpenCart và nhiều CMS khác sẽ thông báo cho bạn về những cập nhật hệ thống hiện có trong mỗi lần bạn đăng nhập.

Đảm bảo bạn luôn cập nhật các tính năng phụ thuộc và sử dụng các công cụ như Gemnasium để nhận thông báo tự động khi một lỗ hổng được công bố ở một trong các thành phần website của bạn.
 
### 3. Bảo mật SQL injection :

SQL injection là hình thức tấn công trang web phổ biến nhất dựa trên các thao tác form website, lý do là các nội dung này thường không được mã hoá chính xác và công cụ hacking tận dụng các điểm yếu này để hoạt động phá hoại, loại khai thác này rất dễ dàng để đạt được mục đích ngay cả những tin tặc thiếu kinh nghiệm cũng có thể thực hiện hành động này, nghiêm trọng hơn, nếu lỗi này được thực hiện bởi các tin tặc có tay nghề cao, chỉ cần một điểm yếu trong source code website có thể tiết lộ quyền truy cập root của các máy chủ web và từ đó tin tặc có thể tấn công sang các máy chủ mạng khác.

Structured Query Language (SQL) là ngôn ngữ gần như phổ quát của cơ sở dữ liệu cho phép lưu trữ, thao tác và truy xuất dữ liệu. Cơ sở dữ liệu sử dụng SQL bao gồm MS SQL Server, MySQL, Oracle, Access… và dĩ nhiên, các cơ sở dữ liệu này cũng phải chịu cuộc tấn công SQL injection. Các chương trình chống vi-rút cũng không mấy hiệu quả để có thể chặn các cuộc tấn công SQL injection, đơn giản vì chúng được sử dụng để phát hiện và ngăn chặn một loại dữ liệu hoàn toàn khác.

Cách phòng ngừa SQL injection phổ biến nhất được tạo thành từ hai thành phần. Đầu tiên là thường xuyên cập nhật và vá lỗi của tất cả các máy chủ, dịch vụ và ứng dụng, sau đó sản xuất và sử dụng tốt source code đồng thời kiểm thử source code trang web không cho phép tồn tại các lệnh SQL có dấu hiệu bất thường.


### 4.Bảo mật website với XSS:

Tấn công cross-site scripting (XSS) hay tấn công JavaScript độc hại vào website của bạn, sau đó chạy trong trình duyệt của người dùng và có thể thay đổi nội dung trang web hoặc ăn cắp thông tin để gửi lại cho kẻ tấn công. Ví dụ: nếu bạn hiển thị nhận xét trên một trang không có xác nhận hợp lệ thì kẻ tấn công có thể gửi một thông điệp chứa các thẻ tập lệnh và JavaScript có thể chạy trong trình duyệt của mọi người dùng khác và lấy cắp cookie đăng nhập của họ, từ đó cho phép xảy ra cuộc tấn công nhằm kiểm soát tài khoản của mọi người dùng đã xem bình luận. Bạn cần đảm bảo rằng người dùng không thể đưa nội dung JavaScript vào các trang đang hoạt động của bạn.

Đây là mối quan tâm đặc biệt trong các ứng dụng web hiện đại, nơi các trang được xây dựng chủ yếu từ nội dung người dùng và trong nhiều trường hợp tạo ra HTML, sau đó cũng được xử lý front-end như Angular và Ember. Các frameworks này cung cấp nhiều sự bảo vệ XSS nhưng lại kết hợp liên lạc giữa máy chủ và truy cập của khách hàng đôi lúc có thể tạo ra các đường tấn công mới phức tạp hơn, không chỉ là tích hợp JavaScript vào HTML hiệu quả, mà bạn còn có thể chèn nội dung source code bằng cách chèn các lệnh Angular hoặc Ember.

Chìa khóa ở đây là tập trung vào nội dung do người dùng tạo ra có thể thoát khỏi giới hạn mà bạn mong đợi và được trình duyệt hiểu như là một khía cạnh khác mà bạn đang dự định, điều này cũng tương tự như bảo vệ chống lại SQL injection. Khi tự động tạo ra HTML, sử dụng các hàm rõ ràng để thực hiện các thay đổi bạn đang tìm kiếm (ví dụ: sử dụng element.setAttribute và element.textContent, chứ không phải tự thiết lập element.innerHTML bằng tay) hoặc sử dụng các hàm trong frameworks tự động chạy phù hợp hơn là kết nối chuỗi hoặc thiết lập nội dung HTML.

Một công cụ mạnh mẽ khác trong hộp công cụ của XSS Defender là Content Security Policy (CSP). CSP là một thuộc tính mà máy chủ của bạn có thể trả về cho trình duyệt để giới hạn cách thức JavaScript được thực hiện như thế nào trong website, ví dụ như không cho phép chạy bất kỳ tập lệnh nào không được lưu trữ trên tên miền của bạn, không cho phép JavaScript inline hoặc vô hiệu hóa hàm eval(), điều này làm cho các tập lệnh của tin tặc khó làm việc hơn, ngay cả khi chúng có thể đưa vào trang web của bạn.

### 5. Bảo mật với các thông báo lỗi website :

Hãy cẩn thận với thông tin bạn hiển thị trong các thông báo lỗi, chỉ cung cấp những lỗi tối thiểu cho người dùng để đảm bảo rằng không bị rò rỉ bí mật trên máy chủ của bạn (ví dụ: API hoặc mật khẩu cơ sở dữ liệu). Không cung cấp đầy đủ các chi tiết ngoại lệ vì những điều này có thể làm cho các cuộc tấn công phức tạp như SQL injection trở nên dễ dàng hơn, lưu trữ các lỗi chi tiết trong nhật ký máy chủ của bạn và chỉ cho người dùng biết thông tin họ cần.

### 6. Phê duyệt / xác nhận hợp lệ bảo mật website phía máy chủ:

Xác nhận phải luôn luôn được thực hiện cả trên trình duyệt và phía máy chủ, trình duyệt có thể bắt các lỗi đơn giản như các trường bắt buộc không được bỏ trống hoặc khi bạn nhập văn bản vào các trường số. Tuy nhiên, thỉnh thoảng chúng có thể được bỏ qua và bạn phải đảm bảo kiểm tra các xác nhận này vì không thực hiện được điều đó có thể dẫn đến tình huống mã độc được chèn vào cơ sở dữ liệu có thể gây ra các kết quả không mong muốn trong trang web của bạn.

### 7. Cài mật khẩu có độ bảo mật cao:

Mọi người đều biết họ nên sử dụng mật khẩu phức tạp, nhưng điều đó không có nghĩa là họ luôn sẵn sàng thực hiện điều đó. Điều rất quan trọng là sử dụng mật khẩu đủ mạnh cho máy chủ và khu vực quản trị website, nhưng cũng cần nhấn mạnh mật khẩu tốt cho người dùng của bạn để bảo vệ tính bảo mật tài khoản của họ. Việc thực thi các yêu cầu về mật khẩu chẳng hạn như tối thiểu là khoảng tám ký tự, bao gồm một chữ cái và chữ viết hoa sẽ giúp bảo vệ thông tin của họ trong thời gian dài tuyệt đối an toàn.

Mật khẩu phải luôn luôn được lưu trữ dưới dạng các giá trị mã hoá, tốt hơn là sử dụng một thuật toán băm một chiều như SHA, sử dụng phương pháp này có nghĩa là khi bạn xác thực người dùng, bạn chỉ cần so sánh các giá trị được mã hóa. Trong trường hợp có ai đó xâm nhập và đánh cắp mật khẩu của bạn, việc sử dụng mật khẩu đã băm có thể giúp hạn chế thiệt hại vì khó có thể giải mã được chúng.

Bên cạnh đó bạn cũng cài đặt mật khẩu hai lớp cho tất cả các công cụ làm việc online của mình, từ tài khoản email, tài khoản hosting, tài khoản quản trị website. Tâm lý của tin tặc là chọn những trang nào lơ đễnh, ít phòng bị thì nó sẽ tấn công trước, những trang nào có độ bảo mật cao, khó quá thì cho qua.

### 8. Xét duyệt việc tải tập tin lên website:

Cho phép người dùng tải tệp lên trang web của bạn có thể là nguy cơ ảnh hưởng tới bảo mật website, ngay cả khi chỉ cần một thao tác nhỏ là thay đổi avatar của họ. Rủi ro là bất kỳ tệp nào tải lên vô tội vạ có thể chứa một tập lệnh được thực hiện trên máy chủ có đường dẫn tới trang web của bạn.

Nếu bạn sử dụng một hình thức tải tập tin, cần phải biết cách quản lý tất cả các file, nếu bạn cho phép người dùng tải lên hình ảnh, bạn không thể dựa vào phần đuôi mở rộng của ảnh hoặc loại mime để xác minh rằng tệp đó là một hình ảnh vì chúng có thể dễ dàng bị giả mạo, ngay cả việc mở tập tin hoặc sử dụng các chức năng để kiểm tra kích thước hình ảnh không phải là bằng chứng căn cứ đầy đủ, hầu hết các định dạng hình ảnh cho phép lưu trữ một phần miêu tả có thể chứa source code được thực hiện bởi máy chủ.

Vậy làm thế nào để bảo mật website từ việc tải tập tin?

Giải pháp được đề xuất là ngăn chặn truy cập trực tiếp vào các tập tin tải lên cùng nhau. Bằng cách này, bất kỳ tập tin nào được tải lên trang web của bạn cần được lưu trữ trong một thư mục bên ngoài webroot hoặc trong cơ sở dữ liệu dưới dạng blob. Nếu tệp của bạn không thể truy cập trực tiếp, bạn sẽ cần phải tạo một tập lệnh để tìm nạp các tập tin từ thư mục riêng và đưa chúng tới trình duyệt. Thẻ ảnh hỗ trợ thuộc tính src không phải là URL trực tiếp tới hình ảnh, do đó, thuộc tính src của bạn có thể trỏ đến tập lệnh phân phối tập tin cung cấp cho bạn đặt đúng loại nội dung trong tiêu đề HTTP.

Đảm bảo bạn có một thiết lập tường lửa và đang chặn tất cả các cổng không cần thiết, nếu có thể thiết lập một DMZ chỉ cho phép truy cập vào cổng 80 và 443 từ bên ngoài. Mặc dù điều này có thể không khả thi nếu bạn không có quyền truy cập vào máy chủ của mình từ mạng nội bộ vì bạn cần mở cổng để cho phép tải tệp lên và đăng nhập từ xa vào máy chủ của bạn qua SSH hoặc RDP, nếu bạn cho phép các tệp tải lên từ Internet chỉ sử dụng các phương thức truyền tải an toàn đến máy chủ của bạn như SFTP hoặc SSH.

Nếu có thể, hãy thao tác cơ sở dữ liệu của bạn trên một máy chủ khác với máy chủ web của bạn, điều này có nghĩa là máy chủ cơ sở dữ liệu không thể truy cập trực tiếp từ bên ngoài, chỉ có máy chủ website của bạn mới có thể truy cập, giảm thiểu nguy cơ dữ liệu của bạn bị lộ.

Cuối cùng, đừng quên giới hạn quyền truy cập vào máy chủ của bạn.

### 9. Bảo mật với HTTPS:

HTTPS là một giao thức được sử dụng để cung cấp bảo mật qua Internet, HTTPS đảm bảo với người dùng rằng họ đang tương tác với máy chủ mong đợi và không ai khác có thể chặn hoặc thay đổi nội dung mà họ đang xem.

Nếu có bất cứ thứ gì mà người dùng muốn riêng tư, bạn nên chỉ sử dụng HTTPS để phân phối nó. Một form đăng nhập thường sẽ được thiết lập cookie, được gửi cùng với mọi yêu cầu khác đến trang của bạn mà người dùng thao tác đăng nhập và được sử dụng để xác thực các yêu cầu đó, tin tặc sẽ có thể bắt chước người dùng một cách hoàn hảo và từ đó tiếp quản phiên đăng nhập của họ. Để đối phó các loại tấn công này, hãy sử dụng HTTPS cho toàn bộ website của mình. Điều đó không còn khó khăn và tốn kém như trước nữa, bạn chỉ cần bật HTTPS và có các công cụ cộng cộng hiện có cho các frameworks để tự động thiết lập điều này cho bạn.

Thêm vào đó, Google đã thông báo rằng họ sẽ tăng xếp hạng tìm kiếm của website nếu bạn sử dụng HTTPS, đây là một điều hoàn toàn có lợi cho việc SEO trang web

### 10. Công cụ bảo mật website:

Một khi bạn nghĩ rằng bạn đã làm tất cả những gì bạn có thể thì nên dành thời gian để tiến hành việc thử nghiệm bảo mật website, cách hiệu quả nhất để làm việc này là thông qua việc sử dụng một số công cụ bảo mật trang web.

Có rất nhiều sản phẩm thương mại và miễn phí để giúp bạn thực hiện việc này, chúng hoạt động trên cơ sở tương tự như các tập lệnh mà tin tặc sử dụng để kiểm tra tất cả các hành vi khai thác và cố gắng làm tổn hại đến trang web của bạn bằng cách sử dụng một số phương pháp đã đề cập trước đó như SQL injection. Một số công cụ miễn phí đáng lưu ý:

- Netsparker (có phiên bản miễn phí và phiên bản tính phí) tốt cho thử nghiệm SQL injection và XSS.
- OpenVAS, chương trình quét mã bảo mật mã nguồn mở tiên tiến nhất, tốt cho việc kiểm tra các lỗ hổng nhưng nó có thể khó thiết lập vì yêu cầu một máy chủ OpenVAS được cài đặt, OpenVAS là một phần của Nessus trước khi nó trở thành một sản phẩm thương mại mã nguồn đóng.
- SecurityHeaders.io (kiểm tra trực tuyến miễn phí), công cụ nhanh chóng báo cáo bảo mật website (chẳng hạn như CSP và HSTS đã bật hay như cấu hình một tên miền chính xác…).
- Xenotix XSS Exploit Framework, một công cụ của OWASP (Open Web Application Security Project) bao gồm một loạt các ví dụ về tấn công XSS mà bạn có thể nhanh chóng xác nhận liệu đầu vào trang web có dễ bị ảnh hưởng bởi Chrome, Firefox, Cốc cốc và IE hay không.

Kết quả từ các lần kiểm thử có thể gây hoang mang cho chúng ta vì chúng thể hiện rất nhiều vấn đề tiềm ẩn, điều quan trọng là phải tập trung vào các vấn đề quan trọng trước tiên, mỗi vấn đề báo cáo thường đi kèm với một giải thích tốt về tiềm năng dễ bị tổn thương, có thể bạn sẽ thấy một số vấn đề mức độ trung bình thấp không phải là mối quan tâm đối với website của bạn.

Nếu bạn muốn tiến thêm một bước nữa thì có một số cách tiếp theo bạn có thể thực hiện bằng cách thay đổi giá trị POST / GET, một proxy gỡ lỗi có thể giúp bạn vì nó cho phép bạn đánh chặn các giá trị của một yêu cầu HTTP giữa trình duyệt và máy chủ của bạn, một ứng dụng phần mềm miễn phí phổ biến được gọi là Fiddler cũng là một quyết định sáng suốt.