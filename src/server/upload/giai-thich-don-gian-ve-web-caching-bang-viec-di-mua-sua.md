Nếu là một người thường xuyên dùng internet, chắc chắn bạn đã tiếp cận với web cache rất nhiều (cache là gì thì có thể đọc định nghĩa trên wiki ở [đây](https://en.wikipedia.org/wiki/Cache_(computing))). Nhưng caching, cụ thể là web caching hoạt động như thế nào thì chưa chắc ai cũng biết.

Dưới góc độ của một lập trình viên, caching giúp việc xây dựng các ứng dụng web và web server có hiệu năng cao dễ dàng hơn. Thay vì lúc nào cũng phải tìm cách tối ưu máy chủ (thứ lúc nào cũng phải tải hàng trăm hàng nghìn request từ client), lập trình viên có thể cài đặt các giao thức caching. Việc sử dụng caching và không sử dụng đôi khi chỉ khác nhau ở tốc độ tải trang từ 2 giây giảm xuống còn...1 giây, có vẻ không ấn tượng lắm nhỉ. Nhưng với các hệ thống cần xử lý một lượng lớn người dùng thì caching lại rất cần thiết.

Bài viết này sẽ cố gắng giải thích cơ chế caching một cách dễ hiểu nhất qua ví dụ đi mua sữa ở siêu thị thay vì sử dụng nhiều thuật ngữ chuyên ngành. Ngoài ra để hiểu được sâu hơn thì mình khuyên mọi người nên đọc qua các kiến thức cơ bản về web servers trước nhé.

## Internet sẽ như thế nào nếu không có caching
Trước khi đi sâu vào cơ chế caching, hãy thử tưởng tượng mạng internet sẽ như thế nào nếu thiếu nó nhé. Coi như bạn đang sống ở những năm 1700 hay 1800 tại một vùng hẻo lánh đi. Bạn có một trang trại, vài con bò sữa và không có cái tủ lạnh nào cả. Do vậy sữa của mấy con bò không giá trị lắm do rất dễ bị hỏng. 

Bạn cần bán sữa cho mọi người, nhưng tất nhiên họ cũng sẽ chỉ uống được sữa trước khi sữa hỏng. Bạn có một con bò ngày nào cũng sản xuất ra cả lít sữa, nhưng nếu có nhiều người muốn mua sữa trong ngày mà bạn thì đã hết sữa, tất nhiên bạn sẽ phải bảo vài người về nhà tay không và đợi tới ngày hôm sau mới có thể mua. 
![](https://images.viblo.asia/63d12901-f54c-4ba6-8f0d-2cc87eed9fd4.png)

Thêm nữa bạn không thể mua thêm bò và mở rộng sản xuất do tài nguyên có hạn. Chỉ có người trong vùng bạn sống mới có thể mua sữa của bạn. Rõ ràng kinh doanh thế này thì chán quá.
![](https://images.viblo.asia/46a51ac9-d625-4c76-8ac2-0379cf480bb3.png)

Nếu không sử dụng caching thì khả năng tính toán của máy chủ cũng bị giới hạn giống như việc kinh doanh sữa của bạn vậy. Caching được sử dụng để tải các tài nguyên tĩnh như:
* Ảnh
* CSS
* Các file HTML tĩnh
* Các file Javascript
![](https://images.viblo.asia/72dcd966-26ed-46a7-8565-0ba1cb7c59bb.png)
Một máy chủ mặc định sẽ phải gửi trả một response mới cho mỗi request gửi lên. Nhưng một request tải một trang có thể gồm 4 request riêng biệt khác - mỗi request là để tải các tài nguyên đã liệt kê ở phía trên. Nếu  phải xử lý các file ảnh có kích thước rất lớn, máy chủ của bạn sẽ dễ bị quá tải bởi người dùng trên khắp thế giới. Và người dùng tất nhiên sẽ phải tốn nhiều thời gian chờ đợi tải trang.  Lúc này bạn sẽ muốn giảm gánh nặng cho máy chủ bằng cách lưu lại các response các request thường gặp. Máy chủ sẽ không phải xử lý từng request riêng biệt nữa mà thay vào đó bộ cache sẽ giúp nó gửi trả ngay một response. Một giải pháp khác là bạn mua thêm nhiều máy chủ khác nhưng tất nhiên là bạn sẽ phải có rất nhiều tiền. 

## Server-side caching là gì
Quay trở lại với nông trại sữa của chúng ta nào. Đã ai nghĩ ra cách gì giúp việc quản lý kinh doanh sữa hiệu quả hơn chưa?

Một siêu thị có quầy đông lạnh!

Như vậy khách hàng sẽ không phải tới nông trại của bạn và sử dụng sữa ngay trong ngày trước khi sữa hết hạn. Bạn cũng có thể trữ sữa hàng tuần mà không lo bị hỏng.

Siêu thị cũng sẽ giúp giảm gánh nặng cho nông trại của bạn, vì không phải lúc nào mấy con bò cũng sản xuất sữa đều đặn theo nhu cầu người dùng được. Siêu thị sẽ xử lý các nhu cầu thị trường của người dùng cho bạn. Bạn chỉ cần lo chăm sóc bò sao cho chúng sản xuất sữa đều đặn là được. Khách hàng từ các nơi khác cũng có thể mua sữa từ nông trại của bạn do ai cũng có thể tới siêu thị mua.
![](https://images.viblo.asia/5652c147-4a08-461d-8c06-bb082e634ea2.jpeg)
![](https://images.viblo.asia/d36c952b-5231-4070-9362-1a366b565fa0.jpeg)
Giống với siêu thị, một [server-side](https://www.digitalocean.com/community/tutorials/web-caching-basics-terminology-http-headers-and-caching-strategies) cache cũng sẽ xử lý các request phổ biến và gửi trả lại response/nội dung với tốc độ nhanh hơn nhiều.

Trong ảnh trên tôi sử dụng một thuật ngữ **caching proxy**.  Một caching proxy là một server lưu các files tĩnh để phục vụ cho việc gửi trả lại các response cho các request phổ biến. Nó sẽ tiếp nhận các request thông thường và nhanh chóng gửi response. Caching proxy sẽ giúp máy chủ chính của bạn không phải xử lý các request này, do đó giảm gánh nặng cho phía server.

Chắc hẳn bạn đang có hàng đống câu hỏi kiểu:

1.  Các request phổ biến là gì?
2.  Proxy sẽ cache các response trong thời gian bao lâu?

Sẽ phải thêm một bài viết chi tiết hơn để hướng dẫn cài đặt caching, nhưng trong khuôn khổ bài viết này bạn nên biết thêm một khái niệm mới là **độ tươi**. Caching proxy sẽ lưu các files khác nhau ở những thời điểm khác nhau, nó cần quyết định xem files nào nên cache và các files đã được cache có tiếp tục được sử dụng không. Quyết định này dựa trên một thứ gọi là cơ chế caching. 

Một nhà quản lý siêu thị cũng cần quyết định xem sẽ trữ sữa của bạn để bán trong bao lâu trước khi vứt đi để có lãi. Các caching proxy sẽ giải quyết vấn đề này dựa trên một cái gọi là **hệ số cache hit** - tỉ lệ các nội dung các response gửi trả qua caching server.

## CDN là gì?
Vậy là bạn đã có một siêu thị để bán sữa, một bước tiến lớn đấy. Nhưng vẫn có một vấn đề khác là bạn muốn mở rộng kinh doanh, khách hàng ở những khu khác cũng có thể mua sữa của bạn. Bạn sẽ cần có thêm vài cửa hàng bán sữa nữa.

Vậy là bạn sẽ bắt đầu phân phối sữa tới nhiều siêu thị khác. Bây giờ bạn đã có thể đem thương hiệu sữa của mình tới nhiều khu vực hơn. Mạng cung cấp nội dung - **Content Delivery Network (CDN)** cũng na ná vậy. Một CDN là tập các máy chủ proxy được đặt khắp nơi trên thế giới.

Nếu là người dùng bình thường, bạn có thể sẽ nghĩ internet tốc độ cao giúp các trang web tải rất nhanh. Nhưng thực ra đó là nhờ họ sử dụng các CDNs để tải các file tĩnh với tốc độ cao.

Nếu bạn ở Anh và cố tải một file được cache trong một server ở Virginia, bạn sẽ phải đợi một khoảng thời gian lâu hơn nếu có một máy caching proxy địa phương đặt ở Anh. 
![](https://images.viblo.asia/02b2db9b-a5e9-41ac-8a49-490dd7b4a124.jpeg)
![](https://images.viblo.asia/129fc912-79bd-418c-bb91-e2f6746319e6.jpeg)
Nói tóm lại các máy chủ của bạn có thể gửi các bản copy của các file tĩnh tới từng máy chủ proxy trong mạng CDN của bạn, và nó sẽ xử lý từng request trong khu vực cho tới khi tài nguyên không còn "tươi" nữa. Một vài nhà cung cấp CDN phổ biến là Rackspace, Akamai, Amazon Web Services.

## Vậy còn caching trong trình duyệt thì sao?
Bây giờ mọi người khắp thế giới đã có thể mua sữa từ trang trại của bạn về nhà. Nhưng vẫn còn một vấn đề nữa - họ không có cách nào để trữ sữa trong nhà họ. Khách hàng vẫn phải uống sữa của bạn trước khi hết hạn và phải liên tục quay lại cửa hàng để mua tiếp sữa. Hệ thống kinh doanh của bạn vẫn chưa thực sự hoàn thiện lắm.

Giải pháp? Dùng tủ lạnh!

Với một cái tủ lạnh, bạn có thể trữ sữa trong nhà và không phải quay lại siêu thị nhiều lần để mua sữa. Quay lại với web caching, sẽ có một nơi riêng biệt để lưu trữ các tài nguyên tĩnh bên phía client - trình duyệt. Còn các máy chủ proxy sẽ được đặt ở những nơi khác.

Với những trang như Facebook, Amazon hoặc các trang web bạn thường truy cập, caching bên phía client sẽ hoạt động rất hiệu quả. Phía server cũng sẽ giảm được số lượng request phải xử lý.
![](https://images.viblo.asia/c79f12d4-adbb-4ebd-b5bc-b5c8a892ad13.jpeg)
![](https://images.viblo.asia/9085a140-3836-47e5-8f6f-c7a3d4bba7b5.jpeg)
Cần lưu ý là sữa không tự dưng xuất hiện trong tủ lạnh của bạn. Tương tự với các tài nguyên tĩnh. Bạn vẫn sẽ phải gửi request đầu tiên tới máy chủ hoặc máy chủ proxy. Sau đó các tài nguyên tĩnh sẽ được cache trong máy tính của bạn.

Vậy làm thế nào mà trình duyệt biết được khi nào cần gửi request tải file mới từ server? 

Các nhà sản xuất sữa thường dán nhãn hạn sử dụng cho sản phẩm. Tương tự các máy chủ cũng sẽ thêm các định danh trong phần header của HTTP response. Về cơ bản có 4 cách sử dụng HTTP caching nhưng trong phạm vi bài viết sẽ tạm thời chưa nói đến phần này. Nếu bạn nào muốn đọc trước về HTTP caching thì có thể tham khảo ở [link này](https://betterexplained.com/articles/how-to-optimize-your-site-with-http-caching/)
![](https://images.viblo.asia/96074f62-421b-4fd6-ad0e-a428626fe30c.png)
## Khi nào sử dụng caching
Nếy bạn mới bắt đầu tạo trang web đầu tiên của mình, bạn sẽ không phải lo lắng nhiều về caching nếu chưa có hàng nghìn người dùng sử dụng trang web của bạn. Nhưng nếu sau này trang web đó phát triển hơn, bạn sẽ phải sử dụng caching.

Heroku là một công cụ rất tốt để bạn deploy trang web đầu tiên của mình. Nhưng bạn sẽ phải sử dụng các công cụ khác để cài đặt caching cho trang web như CloudFront của Amazon hoặc CloudFare nếu dùng Heroku. 

Ở phía trình duyệt, bạn sẽ gặp phải một số tình huống khi bạn tải lại trang với các tài nguyên tĩnh mới nhưng trang web đó lại không thay đổi gì cả. Bạn có tải lại trang bao nhiêu lần đi nữa thì vẫn không có gì thay đổi. Vấn đề này xảy ra do một vài caching protocol của trình duyệt. Để gửi request tải tài nguyên mới từ server xuống bạn chỉ cần sử dụng tổ hợp phím **Cmd + Shift + R** trên Mac hoặc **Ctrl + Shift + R** trên PC

## Tài liệu tham khảo
Lược dịch: 
* https://medium.freecodecamp.org/web-caching-explained-by-buying-milk-at-the-supermarket-2ba6133ca4ed
* https://betterexplained.com/articles/how-to-optimize-your-site-with-http-caching/