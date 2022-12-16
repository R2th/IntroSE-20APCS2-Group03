Hôm trước trong một buổi họp với khách hàng, việc nâng cấp từ HTTP/1.1 lên HTTP/2 được bàn đến. Do tôi không có kiến thức về phần này nên đã tìm hiểu và thấy có một tài liệu rất bổ ích, vì thế tôi đã quyết định dịch và đăng lên viblo.

## Giới thiệu

Hypertext Transfer Protocol, hoặc HTTP, là một giao thức ứng dụng đã trở thành tiêu chuẩn thực tế cho giao tiếp trên World Wide Web kể từ khi được phát minh vào năm 1989. Từ khi phát hành HTTP / 1.1 vào năm 1997 cho đến gần đây, đã có một số bản sửa đổi đối với giao thức. Nhưng vào năm 2015, một phiên bản được mô phỏng lại có tên là HTTP / 2 đã được đưa vào sử dụng, cung cấp một số phương pháp để giảm độ trễ, đặc biệt khi xử lý các nền tảng di động, đồ họa và video sử dụng nhiều máy chủ. HTTP / 2 kể từ đó ngày càng trở nên phổ biến, với một số ước tính cho thấy rằng khoảng một phần ba số trang web trên thế giới hỗ trợ nó. Trong bối cảnh thay đổi này, các nhà phát triển web có thể hưởng lợi từ việc hiểu được sự khác biệt về kỹ thuật giữa HTTP / 1.1 và HTTP / 2, cho phép họ đưa ra quyết định sáng suốt và hiệu quả về việc phát triển các phương pháp hay nhất.

Sau khi đọc bài viết này, bạn sẽ hiểu sự khác biệt chính giữa HTTP / 1.1 và HTTP / 2, tập trung vào những thay đổi kỹ thuật mà HTTP / 2 đã áp dụng để đạt được một giao thức Web hiệu quả hơn.

## Bối cảnh

Để ngữ cảnh hóa những thay đổi cụ thể mà HTTP / 2 đã thực hiện đối với HTTP / 1.1, trước tiên, chúng ta hãy cùng xem xét quá trình phát triển lịch sử và hoạt động cơ bản của từng loại.

### HTTP/1.1

Được phát triển bởi Timothy Berners-Lee vào năm 1989 như một tiêu chuẩn giao tiếp cho World Wide Web, HTTP là một giao thức ứng dụng cấp cao nhất trao đổi thông tin giữa một máy khách và một máy chủ web cục bộ hoặc từ xa. Trong quá trình này, một máy khách gửi một yêu cầu dựa trên văn bản đến máy chủ bằng cách gọi một phương thức như GET hoặc POST. Đáp lại, máy chủ sẽ gửi lại một tài nguyên như trang HTML cho máy khách.

Ví dụ: giả sử bạn đang truy cập một trang web tại miền www.example.com. Khi bạn điều hướng đến URL này, trình duyệt web trên máy tính của bạn sẽ gửi một yêu cầu HTTP dưới dạng một thông báo dựa trên văn bản, tương tự như một thông báo hiển thị ở đây:

```
GET /index.html HTTP/1.1
Host: www.example.com
```

Request này sử dụng phương thức GET, phương thức này yêu cầu dữ liệu từ máy chủ lưu trữ được liệt kê sau cụm `Host:`. Để đáp ứng request này, máy chủ web example.com trả về một trang HTML cho ứng dụng khách yêu cầu, cùng với các image, stylesheet nào hoặc các tài nguyên khác được gọi trong HTML. Lưu ý rằng không phải tất cả các tài nguyên đều được trả lại cho máy khách trong lần gọi dữ liệu đầu tiên. Các request và response sẽ qua lại giữa máy chủ và máy khách cho đến khi trình duyệt web nhận được tất cả các tài nguyên cần thiết để hiển thị nội dung của trang HTML trên màn hình của bạn.

Bạn có thể coi việc trao đổi request và response này như một lớp ứng dụng duy nhất của Internet protocol stack, nằm phía trên cùng của Tầng giao vận (Transport layer)  (thường sử dụng Transmission Control Protocol hay còn gọi là TCP) và Tầng Mạng (Networking layer) (sử dụng Giao thức Internet hoặc IP ):

![](https://assets.digitalocean.com/articles/cart_63893/Protocol_Stack.png)

Có nhiều điều để thảo luận về các cấp thấp hơn của stack này, nhưng để có được hiểu biết cấp cao về HTTP / 2, bạn chỉ cần biết mô hình lớp trừu tượng này và vị trí HTTP được đưa vào.

Với tổng quan cơ bản về HTTP / 1.1 này, bây giờ chúng ta có thể chuyển sang kể lại sự phát triển ban đầu của HTTP / 2.

### HTTP/2

HTTP / 2 bắt đầu là giao thức SPDY, được phát triển chủ yếu tại Google với mục đích giảm độ trễ tải trang web bằng cách sử dụng các kỹ thuật như nén (compression), ghép kênh (multiplexing) và ưu tiên (prioritization). Giao thức này được dùng làm khuôn mẫu cho HTTP / 2 khi nhóm làm việc Hypertext Transfer Protocol httpbis của IETF (Lực lượng đặc nhiệm kỹ thuật Internet) đặt tiêu chuẩn lại với nhau, đỉnh điểm là việc xuất bản HTTP / 2 vào tháng 5 năm 2015. Ngay từ đầu, nhiều trình duyệt đã hỗ trợ nỗ lực tiêu chuẩn hóa này, bao gồm Chrome, Opera, Internet Explorer và Safari. Một phần do hỗ trợ trình duyệt này, đã có một tỷ lệ chấp nhận giao thức đáng kể kể từ năm 2015, với tỷ lệ đặc biệt cao trong số các trang web mới.

Từ quan điểm kỹ thuật, một trong những tính năng quan trọng nhất phân biệt HTTP / 1.1 và HTTP / 2 là Binary Framing layer, có thể được coi như một phần của lớp ứng dụng (application layer) trong Internet Protocol Stack. Trái ngược với HTTP / 1.1, giữ tất cả các request và response ở định dạng văn bản thuần túy, HTTP / 2 sử dụng Binary framing layer để đóng gói tất cả các thông báo ở định dạng nhị phân, trong khi vẫn duy trì ngữ nghĩa HTTP, chẳng hạn như động từ, phương thức và tiêu đề. Một API cấp ứng dụng sẽ vẫn tạo thông báo ở các định dạng HTTP thông thường, nhưng lớp bên dưới sau đó sẽ chuyển đổi các thông báo này thành nhị phân. Điều này đảm bảo rằng các ứng dụng web được tạo trước HTTP / 2 có thể tiếp tục hoạt động bình thường khi tương tác với giao thức mới.

Việc chuyển đổi thông báo thành nhị phân cho phép HTTP / 2 thử các cách tiếp cận mới để phân phối dữ liệu không có trong HTTP / 1.1, một sự tương phản là gốc rễ của sự khác biệt thực tế giữa hai giao thức. Phần tiếp theo sẽ xem xét mô hình phân phối của HTTP / 1.1, tiếp theo là mô hình mới nào được HTTP / 2 tạo ra.

## Mô hình giao hàng (Delivery Models)

Như đã đề cập trong phần trước, HTTP / 1.1 và HTTP / 2 chia sẻ ngữ nghĩa, đảm bảo rằng các request và response truyền giữa máy chủ và máy khách trong cả hai giao thức đều đến đích của chúng dưới dạng thông báo được định dạng truyền thống với tiêu đề và nội dung, sử dụng các phương thức quen thuộc như GET và POST. Nhưng trong khi HTTP / 1.1 chuyển những thứ này dưới dạng tin nhắn văn bản thuần túy, thì HTTP / 2 lại mã hóa những thứ này thành nhị phân, cho phép các khả năng mô hình phân phối khác nhau đáng kể. Trong phần này, trước tiên, chúng ta sẽ xem xét ngắn gọn cách HTTP / 1.1 cố gắng tối ưu hóa hiệu quả với mô hình phân phối của nó và các vấn đề nảy sinh từ điều này, tiếp theo là các ưu điểm của Binary Framing layer của HTTP / 2 và mô tả cách nó ưu tiên các yêu cầu.

### HTTP / 1.1 - Pipelining và Head-of-Line Block

Response đầu tiên mà máy khách nhận được trên một request HTTP GET thường không phải là trang được hiển thị đầy đủ. Thay vào đó, nó chứa các liên kết đến các tài nguyên bổ sung cần thiết cho trang được yêu cầu. Máy khách phát hiện ra rằng việc hiển thị đầy đủ trang yêu cầu các tài nguyên bổ sung này từ máy chủ chỉ sau khi máy chủ tải trang xuống. Do đó, máy khách sẽ phải thực hiện các yêu cầu bổ sung để lấy các tài nguyên này. Trong HTTP / 1.0, máy khách phải ngắt và tạo lại kết nối TCP với mỗi yêu cầu mới, một việc tốn kém cả về thời gian và tài nguyên.

HTTP / 1.1 giải quyết vấn đề này bằng cách giới thiệu các kết nối liên tục và pipelining. Với các kết nối liên tục, HTTP / 1.1 giả định rằng kết nối TCP phải được giữ ở trạng thái mở trừ khi được yêu cầu trực tiếp đóng. Điều này cho phép máy khách gửi nhiều yêu cầu dọc theo cùng một kết nối mà không cần đợi phản hồi cho từng yêu cầu, cải thiện đáng kể hiệu suất của HTTP / 1.1 so với HTTP / 1.0.

Thật không may, có một nút thắt tự nhiên đối với chiến lược tối ưu hóa này. Vì nhiều gói dữ liệu không thể vượt qua nhau khi đi đến cùng một đích, nên có những tình huống trong đó một yêu cầu ở đầu hàng đợi không thể truy xuất tài nguyên cần thiết của nó sẽ chặn tất cả các yêu cầu phía sau nó. Đây được gọi là chặn head-of-line (HOL) và là một vấn đề nghiêm trọng với việc tối ưu hóa hiệu quả kết nối trong HTTP / 1.1. Việc thêm các kết nối TCP song song, riêng biệt có thể giảm bớt vấn đề này, nhưng có giới hạn đối với số lượng kết nối TCP đồng thời có thể có giữa máy khách và máy chủ và mỗi kết nối mới yêu cầu tài nguyên đáng kể.

Những vấn đề này luôn nằm trong tâm trí của các nhà phát triển HTTP / 2, những người đã đề xuất sử dụng Binary Framing layer nói trên để khắc phục những vấn đề này, một chủ đề bạn sẽ tìm hiểu thêm trong phần tiếp theo.

### HTTP/2 — Những lợi thế của Binary Framing Layer

Trong HTTP / 2, Binary Framing layer mã hóa các request / response và cắt chúng thành các gói thông tin nhỏ hơn, làm tăng đáng kể tính linh hoạt của việc truyền dữ liệu.

Chúng ta hãy xem xét kỹ hơn cách hoạt động của điều này. Trái ngược với HTTP / 1.1, phải sử dụng nhiều kết nối TCP để giảm bớt ảnh hưởng của việc chặn HOL, HTTP / 2 thiết lập một đối tượng kết nối duy nhất giữa hai máy. Trong kết nối này có nhiều luồng dữ liệu. Mỗi luồng bao gồm nhiều message ở định dạng request / response quen thuộc. Cuối cùng, mỗi message này được chia thành các đơn vị nhỏ hơn được gọi là khung (frames):

![](https://assets.digitalocean.com/articles/cart_63893/Streams_Frames.png)

Ở cấp độ chi tiết nhất, kênh giao tiếp bao gồm một loạt các khung được mã hóa nhị phân, mỗi khung được gắn thẻ cho một luồng cụ thể. Các thẻ nhận dạng cho phép kết nối xen kẽ các khung này trong quá trình truyền và lắp ráp lại chúng ở đầu kia. Các yêu cầu và phản hồi xen kẽ có thể chạy song song mà không chặn các thông báo đằng sau chúng, một quá trình được gọi là ghép kênh. Ghép kênh giải quyết vấn đề chặn đầu dòng trong HTTP / 1.1 bằng cách đảm bảo rằng không có message nào phải chờ message khác kết thúc. Điều này cũng có nghĩa là máy chủ và máy khách có thể gửi request và response đồng thời, cho phép kiểm soát tốt hơn và quản lý kết nối hiệu quả hơn.

Vì ghép kênh cho phép máy khách xây dựng nhiều luồng song song, các luồng này chỉ cần sử dụng một kết nối TCP duy nhất. Việc có một kết nối liên tục duy nhất cho mỗi điểm gốc sẽ cải thiện dựa trên HTTP / 1.1 bằng cách giảm bộ nhớ và xử lý dấu vết trên toàn mạng. Điều này dẫn đến việc sử dụng mạng và băng thông tốt hơn và do đó giảm chi phí vận hành tổng thể.

Một kết nối TCP duy nhất cũng cải thiện hiệu suất của giao thức HTTPS, vì máy khách và máy chủ có thể sử dụng lại cùng một phiên bảo mật cho nhiều yêu cầu / phản hồi. Trong HTTPS, trong quá trình bắt tay TLS hoặc SSL, cả hai bên đồng ý về việc sử dụng một khóa duy nhất trong suốt phiên. Nếu kết nối bị ngắt, một phiên mới sẽ bắt đầu, yêu cầu khóa mới được tạo để liên lạc thêm. Do đó, việc duy trì một kết nối duy nhất có thể làm giảm đáng kể tài nguyên cần thiết cho hiệu suất HTTPS. Lưu ý rằng, mặc dù thông số kỹ thuật HTTP / 2 không bắt buộc phải sử dụng lớp TLS, nhiều trình duyệt chính chỉ hỗ trợ HTTP / 2 với HTTPS.

Mặc dù ghép kênh vốn có trong lớp khung nhị phân giải quyết một số vấn đề nhất định của HTTP / 1.1, nhưng nhiều luồng đang chờ cùng một tài nguyên vẫn có thể gây ra các vấn đề về hiệu suất. Tuy nhiên, thiết kế của HTTP / 2 có tính đến điều này bằng cách sử dụng ưu tiên luồng, một chủ đề chúng ta sẽ thảo luận trong phần tiếp theo.

### HTTP / 2 - Ưu tiên luồng

Ưu tiên luồng không chỉ giải quyết vấn đề có thể xảy ra của các yêu cầu cạnh tranh cho cùng một tài nguyên mà còn cho phép các nhà phát triển tùy chỉnh trọng lượng tương đối của các yêu cầu để tối ưu hóa hiệu suất ứng dụng tốt hơn. Trong phần này, chúng tôi sẽ chia nhỏ quá trình ưu tiên này để cung cấp thông tin chi tiết hơn về cách bạn có thể tận dụng tính năng này của HTTP / 2.

Như bạn đã biết bây giờ, Binary framing layer tổ chức các message  thành các luồng dữ liệu song song. Khi một máy khách gửi các request đồng thời đến một máy chủ, nó có thể ưu tiên các response mà nó đang yêu cầu bằng cách gán trọng số từ 1 đến 256 cho mỗi luồng. Số cao hơn cho thấy mức độ ưu tiên cao hơn. Ngoài ra, máy khách cũng nêu rõ sự phụ thuộc của mỗi luồng vào một luồng khác bằng cách chỉ định ID của luồng mà luồng đó phụ thuộc vào đó. Nếu định danh cha bị bỏ qua, luồng được coi là phụ thuộc vào luồng gốc. Điều này được minh họa trong hình sau:

![](https://assets.digitalocean.com/articles/cart_63893/Stream_Priority2.png)

Trong hình minh họa, kênh chứa sáu luồng, mỗi luồng có một ID duy nhất và được liên kết với trọng số cụ thể. Luồng 1 không có ID cha được liên kết với nó và theo mặc định được liên kết với nút gốc. Tất cả các luồng khác có một số ID gốc được đánh dấu. Việc phân bổ tài nguyên cho mỗi luồng sẽ dựa trên trọng lượng mà chúng nắm giữ và các yếu tố phụ thuộc mà chúng yêu cầu. Ví dụ, các luồng 5 và 6, trong hình đã được gán cùng trọng số và cùng một luồng mẹ, sẽ có cùng mức độ ưu tiên cho việc phân bổ tài nguyên.

Máy chủ sử dụng thông tin này để tạo một cây phụ thuộc, cho phép máy chủ xác định thứ tự mà các yêu cầu sẽ truy xuất dữ liệu của chúng. Dựa trên các luồng trong hình trước, cây phụ thuộc sẽ như sau:

![](https://assets.digitalocean.com/articles/cart_63893/Dependency_Tree.png)

Trong cây phụ thuộc này, luồng 1 phụ thuộc vào luồng gốc và không có luồng nào khác xuất phát từ gốc, vì vậy tất cả các tài nguyên có sẵn sẽ phân bổ cho luồng 1 trước các luồng khác. Vì cây chỉ ra rằng luồng 2 phụ thuộc vào việc hoàn thành luồng 1, nên luồng 2 sẽ không tiếp tục cho đến khi hoàn thành nhiệm vụ của luồng 1. Bây giờ, chúng ta hãy xem xét luồng 3 và 4. Cả hai luồng này đều phụ thuộc vào luồng 2. Như trong trường hợp của luồng 1, luồng 2 sẽ nhận được tất cả các tài nguyên có sẵn trước luồng 3 và 4. Sau khi luồng 2 hoàn thành nhiệm vụ của nó, các luồng 3 và 4 sẽ nhận được các tài nguyên; chúng được chia theo tỷ lệ 2: 4 như được chỉ ra bởi trọng số của chúng, dẫn đến phần tài nguyên cao hơn cho luồng 4. Cuối cùng, khi luồng 3 kết thúc, luồng 5 và 6 sẽ nhận được tài nguyên có sẵn thành các phần bằng nhau. Điều này có thể xảy ra trước khi luồng 4 hoàn thành nhiệm vụ của nó, mặc dù luồng 4 nhận được lượng tài nguyên cao hơn; các luồng ở cấp thấp hơn được phép bắt đầu ngay sau khi các luồng phụ thuộc ở cấp trên kết thúc.

Là một nhà phát triển ứng dụng, bạn có thể đặt trọng số trong yêu cầu của mình dựa trên nhu cầu của bạn. Ví dụ: bạn có thể chỉ định mức độ ưu tiên thấp hơn để tải hình ảnh có độ phân giải cao sau khi cung cấp hình ảnh thu nhỏ trên trang web. Bằng cách cung cấp phương tiện phân công trọng lượng này, HTTP / 2 cho phép các nhà phát triển kiểm soát tốt hơn việc hiển thị trang web. Giao thức cũng cho phép khách hàng thay đổi các phụ thuộc và phân bổ lại trọng số trong thời gian chạy để đáp ứng với tương tác của người dùng. Tuy nhiên, điều quan trọng cần lưu ý là máy chủ có thể tự thay đổi các ưu tiên được chỉ định nếu một luồng nhất định bị chặn truy cập vào một tài nguyên cụ thể.

## Tràn bộ nhớ

Trong bất kỳ kết nối TCP nào giữa hai máy, cả máy khách và máy chủ đều có sẵn một lượng bộ đệm nhất định để chứa các yêu cầu đến chưa được xử lý. Các bộ đệm này cung cấp tính linh hoạt để giải quyết nhiều request hoặc request đặc biệt lớn, ngoài tốc độ không đồng đều của các kết nối xuôi và ngược dòng.

Tuy nhiên, có những tình huống trong đó bộ đệm là không đủ. Ví dụ: máy chủ có thể đang đẩy một lượng lớn dữ liệu với tốc độ mà ứng dụng khách không thể đối phó được do kích thước bộ đệm hạn chế hoặc băng thông thấp hơn. Tương tự như vậy, khi một máy khách tải một hình ảnh lớn hoặc một video lên máy chủ, bộ đệm máy chủ có thể bị tràn, làm mất một số gói bổ sung.

Để tránh tràn bộ đệm, cơ chế kiểm soát luồng phải ngăn người gửi lấn át dữ liệu của người nhận. Phần này sẽ cung cấp tổng quan về cách HTTP / 1.1 và HTTP / 2 sử dụng các phiên bản khác nhau của cơ chế này để giải quyết vấn đề kiểm soát luồng theo các mô hình phân phối khác nhau của chúng.

### HTTP / 1.1
Trong HTTP / 1.1, điều khiển luồng dựa vào kết nối TCP bên dưới. Khi kết nối này bắt đầu, cả máy khách và máy chủ đều thiết lập kích thước bộ đệm của chúng bằng cách sử dụng cài đặt mặc định của hệ thống. Nếu bộ đệm của người nhận được lấp đầy một phần dữ liệu, nó sẽ thông báo cho người gửi biết cửa sổ nhận của nó, tức là lượng không gian khả dụng vẫn còn trong bộ đệm của nó. Cửa sổ nhận này được gửi trong một tín hiệu được gọi là gói ACK, là gói dữ liệu mà người nhận gửi để xác nhận rằng nó đã nhận được tín hiệu mở. Nếu kích thước cửa sổ nhận được này bằng 0, người gửi sẽ không gửi thêm dữ liệu nào cho đến khi máy khách xóa bộ đệm bên trong và sau đó yêu cầu tiếp tục truyền dữ liệu. Điều quan trọng cần lưu ý ở đây là việc sử dụng các cửa sổ nhận dựa trên kết nối TCP bên dưới chỉ có thể triển khai điều khiển luồng ở một trong hai đầu của kết nối.

Vì HTTP / 1.1 dựa vào lớp truyền tải để tránh tràn bộ đệm, mỗi kết nối TCP mới yêu cầu một cơ chế điều khiển luồng riêng biệt. HTTP / 2, tuy nhiên, ghép kênh trong một kết nối TCP duy nhất và sẽ phải thực hiện kiểm soát luồng theo một cách khác.

### HTTP / 2
HTTP / 2 ghép các luồng dữ liệu trong một kết nối TCP. Do đó, các cửa sổ nhận ở cấp độ kết nối TCP không đủ để điều chỉnh việc phân phối các luồng riêng lẻ. HTTP / 2 giải quyết vấn đề này bằng cách cho phép máy khách và máy chủ triển khai các điều khiển luồng của riêng họ, thay vì dựa vào Tầng giao vận (Transport layer). Tầng ứng dụng (Application) giao tiếp với không gian đệm có sẵn, cho phép máy khách và máy chủ đặt cửa sổ nhận ở mức của các luồng được ghép kênh. Điều khiển luồng quy mô nhỏ này có thể được sửa đổi hoặc duy trì sau kết nối ban đầu qua khung WINDOW_UPDATE.

Vì phương pháp này kiểm soát luồng dữ liệu ở mức của Tầng ứng dụng, nên cơ chế điều khiển luồng không phải đợi tín hiệu đến đích cuối cùng trước khi điều chỉnh cửa sổ nhận. Các nút trung gian có thể sử dụng thông tin cài đặt kiểm soát luồng để xác định việc phân bổ tài nguyên của riêng chúng và sửa đổi cho phù hợp. Bằng cách này, mỗi máy chủ trung gian có thể thực hiện chiến lược tài nguyên tùy chỉnh của riêng mình, cho phép hiệu quả kết nối cao hơn.

Tính linh hoạt trong kiểm soát dòng chảy này có thể có lợi khi tạo ra các chiến lược nguồn lực thích hợp. Ví dụ: máy khách có thể tìm nạp bản quét đầu tiên của một hình ảnh, hiển thị nó cho người dùng và cho phép người dùng xem trước nó trong khi tìm nạp các tài nguyên quan trọng hơn. Sau khi khách hàng tìm nạp các tài nguyên quan trọng này, trình duyệt sẽ tiếp tục truy xuất phần còn lại của hình ảnh. Do đó, trì hoãn việc triển khai kiểm soát luồng cho máy khách và máy chủ có thể cải thiện hiệu suất nhận thức của các ứng dụng web.

Về kiểm soát luồng và mức độ ưu tiên luồng được đề cập trong phần trước, HTTP / 2 cung cấp mức kiểm soát chi tiết hơn, mở ra khả năng tối ưu hóa cao hơn. Phần tiếp theo sẽ giải thích một phương pháp khác duy nhất cho giao thức có thể tăng cường kết nối theo cách tương tự: dự đoán các yêu cầu tài nguyên với sự thúc đẩy của máy chủ.

## Dự đoán Resource requests

Trong một ứng dụng web điển hình, máy khách sẽ gửi một yêu cầu GET và nhận một trang bằng HTML, thường là trang chỉ mục của trang đó. Trong khi kiểm tra nội dung trang chỉ mục, máy khách có thể phát hiện ra rằng nó cần tìm nạp các tài nguyên bổ sung, chẳng hạn như tệp CSS và JavaScript, để hiển thị đầy đủ trang. Máy khách xác định rằng nó chỉ cần các tài nguyên bổ sung này sau khi nhận được phản hồi từ yêu cầu GET ban đầu và do đó phải thực hiện các yêu cầu bổ sung để tìm nạp các tài nguyên này và hoàn thành việc ghép trang lại với nhau. Những yêu cầu bổ sung này cuối cùng làm tăng thời gian tải kết nối.

Tuy nhiên, có các giải pháp cho vấn đề này: vì máy chủ biết trước rằng máy khách sẽ yêu cầu tệp bổ sung, máy chủ có thể tiết kiệm thời gian của máy khách bằng cách gửi các tài nguyên này đến máy khách trước khi nó yêu cầu. HTTP / 1.1 và HTTP / 2 có các chiến lược khác nhau để thực hiện điều này, mỗi chiến lược sẽ được mô tả trong phần tiếp theo.

### HTTP/1.1 - Resource inlining

Trong HTTP / 1.1, nếu nhà phát triển biết trước tài nguyên nào mà máy khách sẽ cần để hiển thị trang, họ có thể sử dụng một kỹ thuật được gọi là nội tuyến tài nguyên để bao gồm tài nguyên cần thiết trực tiếp trong tài liệu HTML mà máy chủ gửi để phản hồi yêu cầu GET ban đầu. Ví dụ: nếu một khách hàng cần một tệp CSS cụ thể để hiển thị một trang, thì nội tuyến tệp CSS đó sẽ cung cấp cho khách hàng tài nguyên cần thiết trước khi nó yêu cầu, giảm tổng số yêu cầu mà khách hàng phải gửi.

Nhưng có một vài vấn đề với nội tuyến tài nguyên. Bao gồm tài nguyên trong tài liệu HTML là một giải pháp khả thi cho các tài nguyên nhỏ hơn, dựa trên văn bản, nhưng các tệp lớn hơn ở định dạng không phải văn bản có thể làm tăng đáng kể kích thước của tài liệu HTML, điều này cuối cùng có thể làm giảm tốc độ kết nối và vô hiệu hóa lợi thế ban đầu đã đạt được từ việc sử dụng kỹ thuật này. Ngoài ra, vì các tài nguyên nội tuyến không còn tách biệt với tài liệu HTML, nên không có cơ chế nào để máy khách từ chối tài nguyên mà nó đã có hoặc đặt một tài nguyên vào bộ nhớ cache của nó. Nếu nhiều trang yêu cầu tài nguyên, thì mỗi tài liệu HTML mới sẽ có cùng một tài nguyên được nội tuyến trong mã của nó, dẫn đến các tài liệu HTML lớn hơn và thời gian tải lâu hơn so với khi tài nguyên chỉ được lưu trong bộ nhớ cache ban đầu.

Do đó, một nhược điểm chính của nội tuyến tài nguyên là máy khách không thể tách biệt tài nguyên và tài liệu. Cần có một mức độ kiểm soát tốt hơn để tối ưu hóa kết nối, một nhu cầu mà HTTP / 2 tìm cách đáp ứng với sự đẩy của máy chủ.

### HTTP/2 - Server Push

Trong HTTP / 2, quá trình này bắt đầu khi máy chủ gửi một khung PUSH_PROMISE để thông báo cho máy khách rằng nó sẽ đẩy một tài nguyên. Khung này chỉ bao gồm tiêu đề của thư và cho phép máy khách biết trước tài nguyên mà máy chủ sẽ đẩy. Nếu nó đã có tài nguyên được lưu trong bộ nhớ cache, máy khách có thể từ chối việc đẩy bằng cách gửi một khung RST_STREAM để phản hồi. Khung PUSH_PROMISE cũng giúp máy khách không gửi một yêu cầu trùng lặp đến máy chủ, vì nó biết máy chủ sẽ đẩy tài nguyên nào.

Điều quan trọng cần lưu ý ở đây là sự nhấn mạnh của đẩy máy chủ là kiểm soát máy khách. Nếu một ứng dụng khách cần điều chỉnh mức độ ưu tiên của việc đẩy máy chủ hoặc thậm chí vô hiệu hóa nó, nó có thể gửi khung CÀI ĐẶT bất kỳ lúc nào để sửa đổi tính năng HTTP / 2 này.

Mặc dù tính năng này có rất nhiều tiềm năng, nhưng không phải lúc nào đẩy máy chủ cũng là câu trả lời để tối ưu hóa ứng dụng web của bạn. Ví dụ: một số trình duyệt web không thể luôn hủy các yêu cầu đã đẩy, ngay cả khi máy khách đã có tài nguyên được lưu trong bộ nhớ cache. Nếu máy khách nhầm lẫn cho phép máy chủ gửi tài nguyên trùng lặp, máy chủ đẩy có thể sử dụng hết kết nối một cách không cần thiết. Cuối cùng, việc đẩy máy chủ nên được sử dụng theo quyết định của nhà phát triển. Để biết thêm về cách sử dụng chiến lược đẩy máy chủ và tối ưu hóa các ứng dụng web, hãy xem mẫu PRPL do Google phát triển. Để tìm hiểu thêm về các sự cố có thể xảy ra với quá trình đẩy máy chủ, hãy xem bài đăng trên blog của Jake Archibald Quá trình đẩy HTTP / 2 khó khăn hơn tôi nghĩ.

## Nén dữ liệu

Một phương pháp phổ biến để tối ưu hóa các ứng dụng web là sử dụng các thuật toán nén để giảm kích thước của các thông điệp HTTP truyền giữa máy khách và máy chủ. HTTP / 1.1 và HTTP / 2 đều sử dụng chiến lược này, nhưng có những vấn đề triển khai trong chiến lược trước đó là cấm nén toàn bộ message. Phần sau đây sẽ thảo luận về lý do tại sao lại như vậy và cách HTTP / 2 có thể đưa ra giải pháp.

### HTTP/1.1

Các chương trình như gzip từ lâu đã được sử dụng để nén dữ liệu được gửi trong các thông điệp HTTP, đặc biệt là để giảm kích thước của các tệp CSS và JavaScript. Tuy nhiên, thành phần header của message luôn được gửi dưới dạng văn bản thuần túy. Mặc dù mỗi header khá nhỏ, gánh nặng của dữ liệu không nén này ngày càng đè nặng lên kết nối khi có nhiều yêu cầu hơn được thực hiện, đặc biệt là đối với các ứng dụng web phức tạp, nặng về API, đòi hỏi nhiều tài nguyên khác nhau và do đó có nhiều yêu cầu tài nguyên khác nhau. Ngoài ra, việc sử dụng cookie đôi khi có thể làm cho header lớn hơn nhiều, làm tăng nhu cầu về một số loại nén.

Để giải quyết nút thắt cổ chai này, HTTP / 2 sử dụng tính năng nén HPACK để thu nhỏ kích thước của tiêu đề, chủ đề này sẽ được thảo luận kỹ hơn trong phần tiếp theo.

### HTTP/2

Một trong những chủ đề đã xuất hiện nhiều lần trong HTTP / 2 là khả năng sử dụng Binary framing layer để thể hiện khả năng kiểm soát tốt hơn đối với chi tiết tốt hơn. Điều này cũng đúng khi nói đến nén header. HTTP / 2 có thể tách header khỏi dữ liệu của chúng, dẫn đến một khung header và một khung dữ liệu. Sau đó, chương trình nén HTTP / 2 cụ thể HPACK có thể nén khung header này. Thuật toán này có thể mã hóa metadata tiêu đề bằng mã hóa Huffman, do đó làm giảm đáng kể kích thước của nó. Ngoài ra, HPACK có thể theo dõi các trường siêu dữ liệu đã truyền tải trước đó và nén thêm chúng theo một chỉ mục được thay đổi động được chia sẻ giữa máy khách và máy chủ. Ví dụ: lấy hai yêu cầu sau: 

#### Request 1

```
method:     GET
scheme:     https
host:       example.com
path:       /academy
accept:     /image/jpeg
user-agent: Mozilla/5.0 ...
```

#### Request 2

```
method:     GET
scheme:     https
host:       example.com
path:       /academy/images
accept:     /image/jpeg
user-agent: Mozilla/5.0 ...
```

Các trường khác nhau trong các yêu cầu này, chẳng hạn như `method`, `scheme`, `host`, `accept`, and `user-agent`,, có cùng giá trị; chỉ có trường `path` sử dụng một giá trị khác. Do đó, khi gửi Request 2, máy khách có thể sử dụng HPACK để chỉ gửi các giá trị được lập chỉ mục cần thiết để cấu trúc lại các trường chung này và mã hóa mới trường `path`. Khung header kết quả sẽ như sau:

#### Header Frame for Request #1

```
method:     GET
scheme:     https
host:       example.com
path:       /academy
accept:     /image/jpeg
user-agent: Mozilla/5.0 ...
```

#### Header Frame for Request #2

```
path:       /academy/images
```

Sử dụng HPACK và các phương pháp nén khác, HTTP / 2 cung cấp thêm một tính năng có thể giảm độ trễ của máy khách-máy chủ.

## Kết luận

Như bạn có thể thấy từ phân tích từng điểm này, HTTP / 2 khác với HTTP / 1.1 theo nhiều cách, với một số tính năng cung cấp mức độ kiểm soát cao hơn có thể được sử dụng để tối ưu hóa hiệu suất ứng dụng web tốt hơn và các tính năng khác chỉ đơn giản là cải thiện giao thức trước đó. Bây giờ bạn đã có được quan điểm cấp cao về các biến thể giữa hai giao thức, bạn có thể xem xét các yếu tố như ghép kênh, ưu tiên luồng, kiểm soát luồng, đẩy máy chủ và nén trong HTTP / 2 sẽ ảnh hưởng như thế nào đến bối cảnh thay đổi của phát triển web .

Nếu bạn muốn xem so sánh hiệu suất giữa HTTP / 1.1 và HTTP / 2, hãy xem bản [Google demo](https://http2.golang.org/gophertiles) này để so sánh các giao thức cho các độ trễ khác nhau. Lưu ý rằng khi bạn chạy thử nghiệm trên máy tính của mình, thời gian tải trang có thể thay đổi tùy thuộc vào một số yếu tố như băng thông, tài nguyên máy khách và máy chủ có sẵn tại thời điểm thử nghiệm, v.v. Nếu bạn muốn nghiên cứu kết quả của thử nghiệm toàn diện hơn, hãy xem bài viết [HTTP/2 – A Real-World Performance Test and Analysis](https://css-tricks.com/http2-real-world-performance-test-analysis/). 

## Tài liệu tham khảo
https://www.digitalocean.com/community/tutorials/http-1-1-vs-http-2-what-s-the-difference