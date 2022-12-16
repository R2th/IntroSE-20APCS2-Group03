**1. Giới thiệu chung**

Charles (https://www.charlesproxy.com) vẫn được biết đến như một web proxy (HTTP Proxy / HTTP Monitor) cho phép lập trình viên / tester có thể theo dõi toàn bộ thông tin HTTP và SSL/HTTPS giữa thiết bị như browser / mobile tới Internet, bao gồm các request (yêu cầu), response (phản hồi) và HTTP headers (bao gồm cả cookie và caching). 

Là một lập trình viên / tester, việc thực hiện unit testing cho các bộ dữ liệu khác nhau là rất quan trọng. Chúng ta sẽ cần thay đổi đối tượng mô hình của mình trong thời gian chạy hoặc cập nhật server. Cả hai cách tiếp cận này có thể tạo ra một sự sụp đổ nếu chúng ta làm điều gì đó sai. Khi yêu cầu được truyền từ thiết bị, chúng ta thường không có quyền kiểm soát điều đó và việc thay đổi nó trong mã nguồn nhiều lần với các giá trị khác nhau không phải là một công việc dễ dàng. Do đó, việc sử dụng Charles Proxy sẽ giúp các lập trình viên tiết kiệm thời gian trong việc xử lý với các yêu cầu và phản hồi. Đối với các tester, nó cũng là một công cụ rất hữu ích và được sử dụng thường xuyên trong việc test các ứng dụng di động, đặc biệt là test tải.

Mục đích bài viết sẽ là phân tích chuyên sâu về những gì hoạt động sâu bên trong công cụ này để hiểu hơn về cách thức nó hoạt động hơn là hướng dẫn về cách sử dụng phần mềm. Vậy điều gì là lợi ích của việc hiểu các tính năng của Charles Proxy? Một khi bạn hiểu Charles, việc sử dụng và hiểu các phần mềm proxy khác như [fiddler](https://www.telerik.com/fiddler) sẽ không phức tạp. Nó đã giúp nhiều người tiết kiệm được thời gian và giúp cải thiện năng suất, mình hi vọng nó cũng sẽ mang đến điều tương tự cho chúng ta.

Bởi vậy, trước khi đi sâu vào phân tích các chức năng của Charles, chúng ta cùng làm rõ một số khái niệm cơ bản về Internet và Proxy.

***1.1. Cách thức hoạt động của Internet*** 

Mọi thứ kết nối với internet sẽ có địa chỉ IP. Địa chỉ IP không ở dạng người có thể đọc được, do đó khái niệm tên miền đã được đưa ra. Địa chỉ IP tương ứng với tên miền được tìm thấy trong máy chủ DNS, được phân loại thành (1) Trình phân giải đệ quy, (2) Máy chủ tên gốc, (3) Máy chủ tên miền TLD (Tên miền cấp cao nhất) và (4) Máy chủ tên có thẩm quyền. Hãy nhớ thứ tự vì đó là cách tìm kiếm địa chỉ IP tương ứng được thực hiện. NDL (Thiết bị chuyển dịch mạng) trong bộ định tuyến chuyển đổi địa chỉ IP tĩnh thành địa chỉ IP public. 

Thông tin trong internet được truyền dưới dạng gói. Trong khi các gói di chuyển đến đích, hàng ngàn bộ định tuyến hoạt động như một trung gian và thêm địa chỉ IP của chính nó vào các gói. Khi đến được máy chủ và điều hướng trở lại, bộ định tuyến sẽ mở khóa địa chỉ IP của nó khỏi gói.

***1.2. Proxy là gì?*** 

Proxy theo khái niệm cơ bản nhất của nó là quyền đại diện cho người khác. Máy chủ hoặc phần mềm proxy hoạt động như một trung gian giữa thiết bị đầu cuối và internet.

Yêu cầu và phản hồi được chuyển qua proxy, vì vậy chúng tôi có thể xem hoặc ghi lại lưu lượng truy cập của thiết bị. Máy chủ proxy cũng giúp lưu trữ dữ liệu, chặn lưu lượng độc hại. 

Đây cũng là thủ phạm chặn chúng tôi khỏi YouTube và Facebook.

**2. Cài đặt và các chức năng của Charles Proxy**

***2.1. Cài đặt***

Bạn có thể tải xuống bản dùng thử từ [liên kết sau](https://www.charlesproxy.com/download/) cho LINUX, Mac OS và Windows.

***2.2. Các chức năng***

Là một phần mềm proxy chạy trong hệ thống với các công cụ UI và công cụ dòng lệnh với khả năng sử dụng một cách dễ dàng.

Bao gồm hai loại view: Structure (Cấu trúc) và Sequence (Trình tự) như hình mô tả bên dưới. Structure giúp phân tách URL máy chủ khác nhau còn Sequence giúp chúng ta xác định thứ tự của mỗi lời gọi dựa trên thời gian, thời lượng, kích thước và nhiều hơn thế.

 ![](https://images.viblo.asia/00a713b7-0bd2-4268-84d6-77f76fc80b57.png)

Nếu bạn muốn xem từng tính năng cụ thể của Charles proxy hoạt động như thế nào, bạn có thể truy cập trực tiếp vào [liên kết này](https://www.youtube.com/playlist?list=PLwDwEGSoMC4UtmUzc2v4yr3TmbWDE5Lxi). Đó là các video hướng dẫn rất cụ thể. Bên dưới mình sẽ mô tả lại tóm tắt các chức năng này dưới khía cạnh chuyên sâu hơn.

***2.2.1. Xem lưu lượng HTTP***

Khi bạn kết nối Charles Proxy và thiết bị của mình trong cùng một mạng và thay đổi địa chỉ proxy trong thiết bị, Charles sẽ hiển thị từng yêu cầu và phản hồi chuyển qua nó. Bạn có thể xem các phản hồi như JSON, XML, TEXT, Image. Nếu phản hồi chứa SQL, bạn không thể xem trực tiếp nhưng bạn có thể lưu phản hồi và mở nó bằng các công cụ của bên thứ ba. Bạn có thể thấy một số lưu lượng được mã hóa vì chúng là lưu lượng truyền theo chuẩn Https. Để bắt đầu ghi lưu lượng truy cập http, chọn Proxy -> recording settings, sau đó lựa chọn Include tab -> và thêm .  như host. (*[Xem thiết lập và video demo việc xem lưu lượng truy cập HTTP](https://youtu.be/FC8X-WgF290))

***2.2.2. Giải mã lưu lượng SSL (HTTPS)***

SSL là một giao thức để tạo một liên kết được mã hóa giữa máy chủ và trình duyệt. SSL giúp chúng ta mã hóa, ẩn đi những gì chúng ta gửi và xác định những người chúng tôi đang gửi. Để kích hoạt kết nối SSL, máy chủ sẽ gửi chứng chỉ của nó với các chi tiết và một khóa chung (public key) để mã hóa thông tin. Các chi tiết được mã hóa chỉ có thể được giải mã bằng khóa riêng (private key) được lưu trữ trong máy chủ.

Các cửa hàng chứng chỉ gốc chính là Apple, Microsoft, Mozilla và Android. Khi bạn truy cập một trang web, trang web sẽ xuất trình một chứng chỉ mà được ký bởi một chứng chỉ khác, cho đến khi bạn đạt được một trong các chứng chỉ trong cửa hàng bạn sử dụng. Theo mặc định, trình duyệt hoặc hệ thống của chúng ta sẽ có một số chứng chỉ máy chủ đáng tin cậy. Để mã hóa các liên kết SSL, chúng ta cần tải xuống chứng chỉ Charles Proxy và tin tưởng vào nó.

Đây là [liên kết video](https://www.youtube.com/watch?v=FC8X-WgF290&feature=youtu.be) để thiết lập Charles Proxy và hướng dẫn cài đặt chứng chỉ gốc Charles trong thiết bị để giải mã yêu cầu và phản hồi SSL.
 
![](https://images.viblo.asia/28c3ae18-7502-4dd7-9765-6cb2693e4e2c.png)
 
Lưu ý: Nhập * . * , Điều này sẽ kích hoạt ủy quyền SSL cho tất cả các lời gọi API.

***2.2.3. Không thể giải mã tất cả lưu lượng, tại sao?***

Trên thực tế khi sử dụng Charles, chúng ta đang thực hiện một loại tấn công MIM (MAN-IN-MIDDLE). Chiến lược phổ biến để tránh cuộc tấn công này là ghim chứng chỉ. Chúng ta lưu trữ một bản sao chứng chỉ trong gói ứng dụng trong khi xây dựng ứng dụng và so sánh nó với chứng chỉ máy chủ trong khi kết nối. Nếu ghim SSL hoặc bất kỳ loại mã hóa đầu cuối (ví dụ WhatsApp) nào khác được sử dụng thì nó không thể được giải mã bằng charles proxy. Để biết thêm về việc ghim chứng chỉ, bạn hãy bấm vào [đây](https://infinum.co/the-capsized-eight/how-to-make-your-ios-apps-more-secure-with-ssl-pinning).

***2.2.4. Điểm dừng***

Điểm dừng là một điểm dừng hoặc tạm dừng có chủ ý trong một chương trình, được đặt đúng chỗ cho mục đích gỡ lỗi. Charles cho phép chúng ta tạm dừng và thực hiện chỉnh sửa với các yêu cầu và phản hồi. Khi giao diện người dùng và chức năng của chúng ta hoàn toàn phụ thuộc vào phản hồi của máy chủ thì chúng ta có thể tùy chỉnh phản hồi để xác định hành vi khác nhau dựa trên dữ liệu. Các kịch bản phức tạp và tốn thời gian như phiên hết hạn có thể dễ dàng được tạo lại với điều này. Hơn nữa, điều này cho phép chúng ta làm việc mà không thay đổi dữ liệu trong máy chủ, vì vậy các đồng nghiệp của chúng ta làm việc trên máy chủ sẽ không bị làm phiền. Các bạn có thể xem video giới thiệu về điểm dừng (Break Point) [tại đây](https://www.youtube.com/watch?v=GIm3JTt7G-k&feature=youtu.be).

***2.2.5. Yêu cầu và Phản hồi***

Nếu bạn tìm thấy bất kỳ lỗi nào liên quan đến phản hồi nhận được, bạn có thể lưu ngay phản hồi của bất kỳ lệnh gọi API nào để dễ dàng tái tạo lỗi hoặc bạn có thể lưu toàn bộ phiên Charles để xác định chính xác kịch bản lỗi. Với các lỗi có thể được sao chép không liên tục, tốt hơn hết là lưu toàn bộ phiên Charles.

Để lưu phản hồi, nhấp chuột phải vào bất kỳ lưu lượng truy cập nào và chọn Lưu phản hồi.
	 
![](https://images.viblo.asia/d9a0a54f-f1b5-48b1-8c96-9e47d492a020.png)
     
Để lưu toàn bộ phiên, lưu chọn Chọn tệp -> Lưu phiên dưới dạng.
 
![](https://images.viblo.asia/5e8040b6-68c3-4756-bd87-1d5ad7d8c5aa.png)

***2.2.6. Ánh xạ cục bộ và từ xa***

Khi bạn làm việc chăm chỉ để chỉnh sửa phản hồi, bạn có thể khiến ứng dụng của mình nhấn nó nhiều lần, bằng cách lưu phản hồi và ánh xạ URL tới phản hồi được lưu cục bộ. Nếu bạn có API web khác nhau cho sản phẩm và QA, và bạn muốn thử nghiệm trong cả hai API web, thì bạn có thể thay đổi URL tự động bằng cách ánh xạ từ xa. Bạn có thể xem Ánh xạ cục bộ và từ xa theo [liên kết này](https://www.youtube.com/watch?v=HKfVAXMjw_8&feature=youtu.be).

***2.2.7. Kiểm tra lặp lại và kiểm tra tải***

Bạn không cần phải có ứng dụng hoặc thiết bị của bạn để có thể truy cập máy chủ theo các yêu cầu. Sử dụng Charles Proxy, bạn có thể sử dụng chức năng lưu phiên và lặp lại lưu lượng. Bạn cũng có thể xác định tối đa số lượng người dùng mà ứng dụng của chúng ta có thể xử lý đồng thời bằng cách kiểm tra tải. Kiểm tra tải có thể được thực hiện ở Charles bằng cách sử dụng công cụ lặp lại nâng cao. Bạn có thể chọn số lượng thời gian URL cần để truy cập máy chủ và số lượng đồng thời của nó. Trong Charles, Nhấp chuột phải vào URL tương ứng và bạn có thể tìm thấy chức năng lặp lại và lặp lại nâng cao.

***2.2.8. Sự Điều tiết***

Sự điều tiết giúp chúng ta kiểm tra ứng dụng của mình trong các điều kiện mạng khác nhau (2G, 3G, 4G, 2Mbps, 100Mbps). Hãy nhớ rằng, sự điều tiết sẽ không giúp bạn ở tốc độ cao nếu mạng của bạn không hỗ trợ tốc độ cao.

***2.2.9. Gương***

Chức năng Gương cho phép chúng ta lưu các phản hồi một cách tự động. Thuật ngữ gương (Mirror) được sử dụng ở đây bởi vì, nó chỉ trình chiếu lưu lượng truy cập trang web bằng cách tách nó với các thư mục chính và thư mục con, giống như bạn thấy trong chế độ xem cấu trúc (Structure) của Charles Proxy.

***2.2.10. Danh sách đen & danh sách trắng***

Danh bạ thuộc sanh sách trắng (whitelist) thì nghĩa là chỉ họ mới có thể gọi cho bạn. Những người liên lạc trong danh sách đen, nghĩa là ngoại trừ họ, mọi người khác đều có thể gọi bạn. Mình giả sử rằng điều phát biểu trên đã giúp bạn hiểu danh sách đen và danh sách trắng là gì. Thêm URL vào danh sách trắng sẽ cho phép chỉ những URL đó di chuyển qua lại thông qua proxy. Thêm URL vào danh sách đen sẽ chặn các URL đó di chuyển qua proxy.

***2.2.11. Giả mạo DNS***

Nhiễm độc độc bộ đệm DNS là một kỹ thuật, trong đó kẻ tấn công chiếm quyền kiểm soát máy chủ DNS và thay đổi mục nhập địa chỉ IP của nó để chuyển hướng lưu lượng truy cập đến các trang web khác. Nhiễm độc bộ đệm DNS có thể không phải là bệnh truyền qua không khí, nhưng nó dễ dàng lây lan từ máy chủ này sang máy chủ khác.

***2.2.12. Nhiều thứ thêm để khám phá***

Reverse proxy và các công cụ dòng lệnh là các tính năng khác của Charles Proxy. Hãy nhớ rằng khi sử dụng Charles, bạn có thể soạn một truy vấn thông qua giao tiếp dòng lệnh. Nếu mối quan tâm của bạn liên quan nhiều hơn đến bảo mật thì hãy tìm hiểu về [proxy ZAP của OWASP](https://www.owasp.org/index.php/ZAP).

**3. Câu hỏi thường gặp**

**Charles Proxy có phải là phần mềm miễn phí không?**
Không. Nó có 30 ngày dùng thử miễn phí và có giá 30 USD / giấy phép. Để biết thêm chi tiết bấm [vào đây](https://www.charlesproxy.com/buy/purchase-charles-licenses/).

**Có gì để kiểm tra trong Phiên bản miễn phí?**
Mọi tính năng đều khả dụng nhưng cứ sau 30 phút, ứng dụng sẽ đóng lại và trong khi tải lại ứng dụng, bạn có thể phải đối mặt với một số độ trễ tối đa 10 giây.

**Bất kỳ thay thế cho Charles Proxy?**
[Fiddler, mitmproxy](https://mitmproxy.org/) - mã nguồn mở và [nhiều hơn nữa](https://alternativeto.net/software/charles/).

Để biết thêm câu hỏi thường gặp, bạn hãy bấm [vào đây](https://www.charlesproxy.com/documentation/faqs/).

**4. Liên kết tham khảo**

https://medium.com/@vsujananth/charles-proxy-a-competent-tool-fb7ce4a8439a

https://www.3pillarglobal.com/insights/using-the-charles-proxy-to-identify-api-calls-in-mobile-apps

https://www.charlesproxy.com/documentation/using-charles/load-testing/