**1. Giới thiệu chung**

Những lỗi và những điểm yếu của phần mềm theo thống kê có đến 84% là những lỗ hổng bảo mật nghiêm trọng đến từ tầng ứng dụng. Các bạn có thể tham khảo thêm tại [đây](https://www.csoonline.com/article/2978858/application-security/is-poor-software-development-the-biggest-cyber-threat.html) để nắm thông tin chi tiết hơn. Sự phổ biến của các vấn đề an ninh liên quan đến phần mềm là một trong những lý do cần đến các công cụ kiểm tra an toàn của phần mềm, ứng dụng, viết tắt là AST (Application Security Testing). 

Với sự phát triển ngày càng nhanh về cả số lượng và chất lượng của các công cụ kiểm tra an toàn của phần mềm hiện nay, sẽ rất khó cho các nhà quản lý, nhà phát triển và các kỹ sư phần mềm công cụ nào dùng để giải quyết vấn đề nào. Bài viết này sẽ giúp phân loại những kiểu khác nhau của các công cụ AST và cung cấp hướng dẫn để chỉ ra khi nào và như thế nào để sử dụng từng loại công cụ đó.

![](https://images.viblo.asia/4f5576a0-78ac-4e47-97b7-513f87a5ed02.png)

**2. Sự an toàn của ứng dụng là gì?**

Sự an toàn của ứng dụng không đơn giản là một lựa chọn nhị phân mà ở đó bạn có thể nói ứng dụng của bạn là an toàn hoặc không an toàn. Sự an toàn của ứng dụng cần được hiểu theo hướng rộng hơn đó là cung cấp nhiều lớp an ninh do ứng dụng để giảm thiểu nguy cơ của rủi ro đến mức chấp nhận được đối với từng công ty, tổ chức cụ thể. Do đó việc kiểm tra sự an toàn của ứng dụng chỉ làm giảm thiểu những nguy cơ, rủi ro của ứng dụng chứ không thể loại bỏ hoàn toàn nó. Nhiều bước có thể sẽ được thực hiện, tuy nhiên, việc loại bỏ các nguy cơ dễ dàng bao nhiêu thì việc sử dụng ứng dụng sẽ càng khó khăn bấy nhiêu.

Động lực chung cho việc sử dụng các công cụ AST là quá trình review code thủ công và quá trình lập kế hoạch test theo kiểu truyền thống khá tốn thời gian và những lỗ hổng bảo mật mới liên tục được giới thiệu hoặc khám phá. Trong nhiều trường hợp, việc sử dụng các công cụ AST mang tính chất hiển nhiên và bắt buộc. Và có lẽ điều quan trọng nhất là các công cụ AST được sử dụng phải đảm bảo theo kịp tốc độ phát triển của đối thủ của chúng là những lỗ hổng bảo mật.

Có nhiều thuận lợi khi sử dụng các công cụ AST, đó là nâng cao tốc độ, hiệu quả và đường hướng cho việc kiểm tra các ứng dụng. Những bài kiểm tra sẽ có khả năng lặp lại và mở rộng dễ dàng hơn. Một khi chức năng hỗ trợ mở rộng kiểm tra được sử dụng trong một công cụ, nó có khả năng thực thi lại nhiều dòng của mã nguồn đi kèm với tối giản hóa chi phí. Những công cụ AST rất hiệu quả trong việc dò tìm các lỗ hổng, những vấn đề và những điểm yếu đã được biết đến, và chúng cũng giúp người dùng phân loại những thứ được tìm thấy. 

**3. Phân loại những công cụ test Security**

![](https://images.viblo.asia/8bab2adf-0da0-4109-ac50-b9a985b4038c.png)

Hình bên trên vẽ một tháp trong đó liệt kê những lớp hoặc những loại của những công cụ test an toàn cho ứng dụng. Những sản phẩm khác nhau có thể sử dụng cùng lúc những loại khác nhau của các thành phần bên trong tháp công cụ test an toàn này. Những công cụ dưới đáy tháp là những công cụ nền móng, cơ sở cho việc test an ninh, tuy nhiên chúng đòi hỏi sự thành thạo cao. Các tổ chức có thể lựa chọn sang các công cụ thuộc các loại ở tầng cao hơn của tháp để có thể áp dụng nhanh chóng hơn.

***3.1. Static Application Security Testing (SAST)***

Những công cụ SAST có thể được xem như quá trình test mũ trắng hay test hộp trắng, nơi mà người test biết thông tin về hệ thống và phần mềm được test, bao gồm cả kiến trúc hệ thống, mã nguồn, … Những công cụ SAST kiểm tra mã nguồn để dò tìm và báo cáo những điểm yếu có thể dẫn đến những lỗ hổng an ninh

Việc phân tích mã nguồn có thể được thực hiện trên một mã nguồn chưa được dịch để kiểm tra những rủi ro như những lỗi số, xác thực đầu vào, những điều kiện biên, những con trỏ, tham chiếu, và nhiều hơn thế. Những bộ phân tích nhị phân và mã nguồn làm những công việc tương tự đối với những mã nguồn đã được build và dịch. Một vài công cụ chỉ chạy trên mã nguồn chưa được dịch, vài công cụ chỉ chạy trên mã nguồn đã dịch và một số khác có thể chạy trên cả hai.

***3.2. Dynamic Application Security Testing (DAST)***

Đối lập với SAST, các công cụ DAST được coi như các công cụ test mũ đen hoặc hộp đen, nơi mà những người test không có hiểu biết về hệ thống. Họ dò tìm những lỗ hổng an ninh của một ứng dụng trong trạng thái chạy của nó. Những công cụ DAST chạy trên code đang hoạt động để dò tìm các vấn đề với các giao tiếp, những yêu cầu, những phản hồi, những script (ví dụ javascript), lỗ hổng dữ liệu, sự xác thực, và nhiều hơn thế.

Các công cụ DAST sử dụng kỹ thuật fuzzing: Đưa những testcase được biết đến là không có giá trị và không được chờ đợi vào ứng dụng, thường là với một khối lượng lớn.
	
***3.3. Origin Analysis/Software Composition Analysis (SCA)***

Những quá trình quản lý phần mềm phụ thuộc vào việc kiểm tra và xem xét thủ công đang dần bị coi là sai lầm. Những công cụ SCA kiểm tra phần mềm để xác định nguồn gốc của tất cả các thành phần và những thư viện bên trong phần mềm. Những công cụ này có hiệu quả cao trong việc chỉ ra và tìm kiếm các lỗ hổng trong các thành phần chung và phổ biến và những thành phần mã nguồn mở riêng biệt. Tuy vậy, chúng không dò tìm được các thành phần được phát triển và tùy biến theo cách riêng.

Các công cụ SCA làm việc dựa trên việc so sánh những module đã được biết từ trước được tìm thấy trong mã nguồn với các lỗ hổng đã được biết từ trước. Các công cụ SCA cũng tìm kiếm các thành phần đã được biết từ trước và những lỗ hổng đã được tài liệu hóa và đưa ra cảnh báo nếu có những thành phần lâu chưa được cập nhật bản vá hoặc có những bản vá mới cần cập nhật.

Những công cụ SCA có thể chạy trên mã nguồn, mã byte, mã nhị phân, hoặc một vài sự kết hợp khác. 

***3.4. Database Security Scanning***

Virus có tên SQL Slammer năm 2003 đã lợi dụng một lỗ hổng bảo mật đã được biết từ trước trong một hệ thống quản lý cơ sở dữ liệu và đã có bản vá của nó từ hơn một năm trước khi đợt tấn công xảy ra. Mặc dùng những cơ sở dữ liệu không phải luôn được coi như một phần của ứng dụng, những người phát triển ứng dụng luôn đặt sự để ý cao vào hệ thống cơ sở dữ liệu và những ứng dụng cũng chịu ảnh hưởng nhiều của hệ thống cơ sở dữ liệu của chúng. Những công cụ quét an toàn của hệ thống cơ sở dữ liệu kiểm tra các bản vá và các phiên bản mới nhất đã được cập nhật, những mật khẩu yếu, những lỗi cấu hình, và nhiều vấn đề khác. Một vài công cụ có thể đào sâu vào log và tìm kiếm  những thành phần hoặc những hoạt động không hợp lệ, như những hoạt động quản trị vượt quá thẩm quyền.

Những hệ thống quét cơ sở dữ liệu thường hoạt động trên những dữ liệu tĩnh nằm trong hệ thống quản lý cơ sở dữ liệu đang hoạt động. Một vài bộ quét có thể quản lý các dữ liệu đang dịch chuyển.

***3.5. Interactive Application Security Testing (IAST) and Hybrid Tools***

Những cách thức lai đã được sử dụng trong thời gian dài nhưng gần đây mới được phân loại và thảo luận dưới thuật ngữ IAST. Các công cụ IAST sử dụng kết hợp các kỹ thuật phân tích động và tĩnh. Chúng có thể test tất cả các lỗ hổng được biết đến trong mã nguồn mà có thể thực sự bị khai thác trong khi chạy ứng dụng. 

Các công cụ IAST sử dụng kiến thức của luồng ứng dụng và luồng dữ liệu để sáng tạo các kịch bản tấn công nâng cao và sử dụng các kết quả phân tích động. Như một sự quét động được thực hiện, công cụ sẽ học những thứ của ứng dụng dựa trên cách nó đáp ứng với những testcase. Một vài ứng dụng sẽ sử dụng kiến thức này để sáng tạo thêm các testcase, cái mà sau đó sẽ lại cung cấp thêm hiểu biết để sáng tạo những testcase khác và tiếp tục như thế. Các công cụ IAST giúp làm giảm đáng kể số lượng lỗi, làm việc tốt với môi trường Algile và DevOps, nơi mà các công cụ DAST và SAST có thể sẽ tiêu tốn rất nhiều thời gian của chu kỳ phát triển.

***3.6. Mobile Application Security Testing (MAST)***

Dự án an toàn ứng dụng web mở (OWASP - Open Web Application Security Project) đã liệt kê 10 nguy cơ hàng đầu đối với các ứng dụng di động vào năm 2016 bao gồm:

* Sử dụng nền tảng không đúng.
* Lưu trữ dữ liệu không an toàn.
* Giao tiếp không an toàn.
* Xác thực không an toàn.
* Mã hóa không đủ an toàn.
* Cấp quyền không an toàn.
* Chất lượng mã nguồn khách hàng.
* Sự can thiệp vào mã nguồn.
* Kỹ thuật dịch ngược.
* Chức năng ngoại lai.

Các công cụ MAST là sự pha trộn của cách thức phân tích tĩnh, động và pháp lý. Chúng thực thi một vài chức năng tương tự như cách thức phân tích tĩnh và phân tích động truyền thống nhưng cho phép mã nguồn cho thiết bị di động có thể chạy theo nhiều phân tích khác nhau. Các công cụ MAST cũng tập trung vào các vấn đề cụ thể dành cho các thiết bị di động như khả năng jail-breaking hay root thiết bị, các kết nối wifi không đánh tin cậy, điều khiển và chứng thực các chứng thư, ngăn chặn dò gỉ dữ liệu và nhiều hơn thế.

***3.7. Application Security Testing as a Service (ASTaaS)***

Như cái tên của nó, với ASTaaS, bạn trả tiền cho một vài người để thực hiện việc test an toàn cho ứng dụng của bạn. Dịch vụ sẽ luôn là sự kết hợp của phân tích tĩnh và động, kiểm tra khả năng thâm nhập, kiểm tra các giao tiếp lập trình ứng dụng (API), chỉ ra những nguy cơ, và nhiều hơn nữa. ASTaaS có thể được sử dụng với các ứng dụng truyền thống, đặc biệt với các ứng dụng di động và web và đang phát triển sang lĩnh vực đám mây. 

***3.8. Correlation Tools***

Đối diện với các false positives là một vấn đề lớn trong việc kiểm tra an toàn của ứng dụng. Những công cụ Correlation Tools có thể giúp giảm đáng kể nhiễu bằng cách cung cấp một trung tâm lưu trữ phục vụ cho việc tìm kiếm những lỗ hổng từ các công cụ AST khác.

Những công cụ tìm kiếm khác nhau sẽ có những kết quả tìm kiếm khác nhau, bởi vậy các công cụ chuẩn hóa kiểu Correlation Tools sẽ giúp đánh số ưu tiên và xác nhận các vấn đề được tìm thấy.

***3.9. Test-Coverage Analyzers***

Những bộ phân tích bao phủ quá trình test thực hiện đo lường bao nhiêu phần trăm mã nguồn chương trình đã được đưa ra phân tích. Kết quả sẽ được thể hiện theo thuật ngữ kiểu như “phần trăm số dòng code đã được test” hoặc “phần trăm những đường dẫn đã được test”. 

Đối với các ứng dụng lớn, mức độ chấp nhận được của sự bao phủ test có thể được xác định ở mức nâng cao và sau đó so sánh với kết quả được cung cấp bởi những công cụ phân tích độ bao phủ của quá trình test để tăng tốc quá trình testing-and-release. Những công cụ test này cũng có khả năng tìm được các dòng code không có khả năng đạt đến để thực thi trong quá trình chạy của chương trình và đó sẽ là những nơi có thể phát sinh nguy cơ về an toàn và cũng sẽ là những dòng code không thực sự hiệu quả.

***3.10. Application Security Testing Orchestration (ASTO)***

ASTO tích hợp các công cụ an ninh xuyên suốt một chu kỳ phát triển phần mềm (SDLC - Software Development LifeCycle). Thuật ngữ ASTO vẫn còn khá mới và được đưa ra bởi Gartner. Ý tưởng của ASTO là một sự quản lý tập trung, có tính tương tác cao và báo cáo kết quả của tất cả các công cụ AST chạy trong một hệ sinh thái chung. Sẽ khó để nói trước thuật ngữ và dòng sản phẩm này có tồn tại lâu dài hay không, nhưng với sự phát triển của các công nghệ tự động hóa như ngày nay, ASTO chắc chắn sẽ được phát triển vì chúng ta cần đến nó.

**4. Liên kết tham khảo**

https://insights.sei.cmu.edu/sei_blog/2018/07/10-types-of-application-security-testing-tools-when-and-how-to-use-them.html

https://www.csoonline.com/article/2978858/application-security/is-poor-software-development-the-biggest-cyber-threat.html

https://tecordeon.com/5-best-mobile-security-testing-tools-that-can-mitigate-mobile-threats/

-----
Mình xin kết thúc bài viết ở đây, ở phần sau mình sẽ trình bày thêm về cách thức lựa chọn các công cụ test tính an toàn cho các ứng dụng cụ thể.