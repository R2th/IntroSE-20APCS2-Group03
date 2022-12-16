![](https://cdn-images-1.medium.com/max/2000/1*0s8jbREtTX-vTJ9t5JRGaA.png)

*Tác giả bài viết gồm team Treebo: [*Lakshya Ranganath*](https://twitter.com/__lakshya) và team Chrome: [*Addy Osmani*](https://twitter.com/addyosmani)*


[Treebo](https://treebo.com/) là chuỗi khách sạn bình dân hàng đầu của Ấn Độ, hoạt động ở phân khúc trung bình và cận cao cấp trong ngành du lịch trị giá 20 tỷ USD. Gần đây họ đã quyết định viết lại trang web dưới dạng [Progressive Web App](https://www.treebo.com/blog/google-io-2017-features-treebos-progressive-web-app/) để giúp cho người dùng chạy phiên bản web trên di động có những trải nghiệm y như là trải nhiệm trên App mobile. Ban đầu code họ sử dụng [ReactJS](http://reactjs.com/) và cuối cùng họ quyết định bỏ ReactJS để chuyển sang sử dụng [PreactJS](http://preactjs.com/) để làm ra sản phẩm hoàn thiện.

Những gì họ đo đếm được so với trang web trên thiết bị di động cũ đó là cải thiện được hơn 70% thời gian chờ đợi cho lần tương tác đầu tiên, cải thiện 31% [thời gian tương tác](https://github.com/WPO-Foundation/webpagetest/blob/master/docs/Metrics/TimeToInteractive.md). Và sử dụng mạng 3G trung bình thì thời gian tải chỉ dưới 4 giây (trong tình huống là nhiều khách truy cập cùng lúc), test bằng các thiết bị mobile trung bình. Khi sử dụng mạng 3G chậm (thử bằng tool WebPageTest mô phỏng tốc độ 3G thực tế ứng với nhiều vùng của Ấn Độ), trang web mất khoảng 5s để load và bắt đầu tương tác được.

![](https://cdn-images-1.medium.com/max/1000/1*gVklUhiYIWw3LAKSL8wJjg.png)

Chuyển từ React sang Preact đã cải thiện thêm khoảng 15% về thời gian tương tác mà người dùng bỏ ra trên trang web (người dùng chịu khó nghịch ngợm nhiều hơn vì web app chạy nhanh hơn). Bạn có thể vào trang [Treebo.com](https://treebo.com/) để thử trải nghiệm bản web đầy đủ hiện tại của họ. Còn hôm nay chúng tôi muốn đi sâu vào một số bước về kỹ thuật đã khiến trang web Treebo phiên bản PWA này chạy nhanh đến thế.


*Hình bên dưới là các giao diện hiện tại của trang web Treebo chạy dưới dạng Progressive Web App (là trang web vào bằng URL từ trình duyệt mobile nhưng sẽ được cache lại sau lần chạy đầu tiên, và từ lần sau có thể chạy offline)*
![](https://cdn-images-1.medium.com/max/1000/1*QSIGKBY4t49YdOENePb2Jw.png)

# Quá trình thực hiện chuyển đổi

## Trang web di động cũ

Trang web di động cũ của Treebo được xây dựng bằng Framework Django (Framework MVC viết bằng Python giúp xây dựng trang web động dạng API call đến Database). Người dùng phải chờ sau khi resquest đến máy chủ mỗi lần click vào một url để gọi hiển thị 1 trang web nào đó. Với phiên bản code cũ sử dụng toàn bộ mặc định của framework, chưa thêm thắt gì, thì trang web bắt đầu hiện ra 1 cái gì đó mất khoảng 1,5s, thời gian bắt đầu hiện đầy đủ màn hình là 5,9s và bắt đầu có thể đụng chuột vào control để tương tác là vào khoảng 6,5 giây.

![](https://cdn-images-1.medium.com/max/2000/1*zEQEtv1mzxBaE7lg4cpurg.png)

## Viết lại trang web dạng React SinglePage-App

Trong nỗ lực đầu tiên, họ cố gắng thử viết lại trang web Treebo bằng một ứng dụng SinglePage-App được xây dựng bằng React và sử dụng bộ build [webpack](https://webpack.js.org/) với các config mặc định để gom toàn bộ ứng dụng thành 1 file js duy nhất.

Bạn có thể xem mã thực sự được sử dụng bên dưới. Webpack đã tạo ra một số gói bundles JavaScript và CSS đơn giản (gom toàn bộ các file riêng lẻ lại thành một khối, 1 file js và 1 file css duy nhất).

{@embed: https://gist.github.com/lakshyaranganath/d809f1d8fb7c5702b875435599d78d68#file-webpack-js}

Sau lần nâng cấp này, chúng ta có các con số đo đếm được như sau: Hiển thị một cái gì đó mất 4,8s, bắt đầu vuốt để tương tác được là 5,6s và toàn bộ trang web đầy đủ (kể cả các image header) được hiện ra vào khoảng 7,2s.

![](https://cdn-images-1.medium.com/max/2000/1*e623cjcetyonpGXys4yOLQ.png)

## Cải thiện thêm bằng cách render nội dung trước ở phía máy chủ (Server-side Rendering)

Rõ ràng là chuyển qua dùng React không làm cho thời gian chờ đợi lần đầu tiên giảm xuống so với web truyền thống.

Do đó, họ mong muốn tối ưu hóa việc chờ đợi một cái gì đó hiện ra đối với người dùng, nên họ đã thử dùng Server-side Rendering, cho phép nội dung được nhào nặn sẵn ở phía server mà không cần làm gì ở client. Nhưng cần phải nhớ là cái giá phải trả cho việc Server-side Rendering không hề rẻ hơn Client-side-Rendering. Bạn sẽ phải đánh đổi tài nguyên phía server cho việc này.

> Sử dụng [server-side-react-rendering](https://css-tricks.com/server-side-react-rendering/) thì response từ server về cho trình duyệt là file HTML của trang, sẵn sàng hiển thị ngay lên trình duyệt mà không cần phải chờ tất cả file JavaScript được tải xuống và chạy.

Treebo đã sử dụng hàm [renderToString()](https://facebook.github.io/react/docs/react-dom-server.html#rendertostring) của React để rendering các component thành chuỗi HTML và gắn thêm vào đó các trạng thái (state) của màn hình trong lần khởi động đầu tiên.

{@embed: https://gist.github.com/lakshyaranganath/f4d08e0391e015ee295a53ff3ccabafe#file-reactmiddleware-js}

Trong trường hợp của Treebo, việc sử dụng hiển thị phía máy chủ (**Server-side Rendering** hay còn gọi là **SSR**) đã giảm thời gian bắt đầu vẽ giao diện giảm xuống còn 1,1s và thời gian hiển thị một cái gì đó vào khoảng 2,4s - cái này cải thiện rất lớn **"cảm nhận"** của người dùng khi họ cảm thấy trang web đã sẵn sàng, họ có thể đọc nội dung sớm hơn và Server-side Rendering cũng giúp trang web có điểm SEO tốt hơn trước (bảng xếp hạng trang web theo từ khóa tìm kiếm Google). Nhưng nhược điểm là nó đã có tác động khá tiêu cực về thời gian bắt đầu tương tác được với trang web, vẫn phải chờ đợi tới hơn 5s để thao tác được trên trang.

![](https://cdn-images-1.medium.com/max/2000/1*SSKzzeSML-gTmWZQB9EqSQ.png)

Mặc dù người dùng có thể *xem* nội dung trên trang web, toàn bộ nội dung bên trong trang đều là tĩnh, đứng im khi người dùng vuốt hoặc nhấn vào màn hình. Và phải đợi toàn bộ file bundles JavaScript tải về đầy đủ thì các thao tác nhấn nút mới bắt đầu hoạt động được.

**Với SSR, trình duyệt phải tìm nạp và xử lý một file HTML lớn hơn nhiều so với trước đây và lần gọi sau đó vẫn phải request và và load lại file đó. Rồi phải phân tích cú pháp/biên dịch và thực thi một cục bundles JavaScript lớn. Như vậy thực tế là SSR làm cho trình duyệt phải gồng mình gánh team, bị bắt làm nhiều việc hơn.**

Điều này có nghĩa là user tương tác bắt đầu xảy sau khoảng 6.6s, trang nào cũng bị như vậy.

**SSR** cũng dễ khiến cho user điên tiết vì việc cứ khóa cứng màn hình không cho làm gì ngoài việc ngồi nhìn, càng tệ hại khi mà dùng các thiết bị mobile đời cũ có tốc độ CPU thấp.

## Chia nhỏ code và chia code dựa theo Route-based

Điều tiếp theo mà Treebo xem xét là chia nhỏ code dựa trên các Route (từng url dẫn đến các màn hình khác nhau) để giúp giảm số lượng code cần phải tải về máy mobile ứng với từng màn hình, làm giảm thời gian user phải chờ đợi trong vô vọng.

> [Route-based chunking](https://gist.github.com/addyosmani/44678d476b8843fd981ff8011d389724) là để gửi code ít nhất, chỉ các code cần thiết dùng cho việc user tương tác trên một màn hình nào đó, bằng cách [chia code](https://webpack.js.org/guides/code-splitting/) các route thành "khối" để có thể được load theo yêu cầu tùy từng trang. Điều này nhằm phân phối tài nguyên ở mức độ vi mô theo từng màn hình hiển thị chức năng.

Những gì họ đã làm ở đây là họ tách các thư viện của bên nhà cung cấp thứ 3 (vendor, các thư viện control viết bởi bên thứ 3, nhúng vào code base react), các config chạy Webpack (runtime manifests) và cả các file config route - thành các file riêng biệt.

{@embed: https://gist.github.com/lakshyaranganath/bc4a63c13173a1908c764c67e1fb8df2#file-reactmiddleware-js}

{@embed: https://gist.github.com/lakshyaranganath/bc4a63c13173a1908c764c67e1fb8df2#file-vendor-js}

{@embed: https://gist.github.com/lakshyaranganath/563e6bda38f4f5b6293ceb32f38c85a2#file-routes-js}

{@embed: https://gist.github.com/lakshyaranganath/563e6bda38f4f5b6293ceb32f38c85a2#file-webpack-js}

Điều này làm giảm thời gian tương tác đầu tiên xuống còn 4.8s. Tuyệt vời!

Nhược điểm duy nhất là trang web bắt đầu tải xuống toàn bộ JavaScript của route hiện tại chỉ sau khi các bundle ban đầu (dùng cho hiển thị) đã load xong, việc này cũng chưa lý tưởng lắm.

Nhưng nó ít nhất đã có một số tác động tích cực về trải nghiệm người dùng. Để hỗ trợ chia tách code dựa trên route và nâng cấp được trải nghiệm UX này, họ đang sử dụng cả viêc load code đồng thời - asynchronously. Họ đang sử dụng hỗ trợ khai báo của React Router cho getComponent với một sự hỗ trợ từ tool webpack import() để giúp loading đồng thời (asynchronously) vài khối code cùng một lúc, giúp tận dụng tối đa băng thông.

![](https://cdn-images-1.medium.com/max/2000/1*YEJIN_D73FLy6bT-F2p1WA.png)

## Tiếp tục cải thiện bằng cách làm theo mẫu hiệu suất PRPL

**Chunking** (cắt nhỏ code) dựa trên route là bước đầu tiên tuyệt vời trong việc đóng gói code một cách thông minh, để phục vụ hiên thị trang web và lưu trữ **cache** gọn gàng hơn. Treebo muốn tiếp tục đi theo hướng này và họ đã tìm thấy [**mô hình PRPL**](https://developers.google.com/web/fundamentals/performance/prpl-pattern/).

> PRPL là một mô hình cho việc cấu trúc và phục vụ dưới dạng PWA, nhấn mạnh vào hiệu suất hiển thị ứng dụng ở lần đầu tiên khởi chạy.

PRPL là viết tắt của:

-   **Push**: Đẩy toàn bộ các tài nguyên cần thiết nhất đến cho trang chủ (root route, vì thời gian chờ đợi trang web + thư viện tải về ở lần đầu tiên bao giờ cũng là lâu la nhất)
-   **Render**: Hiển thị trang chủ.
-   **Pre-cache**: Tải tiếp tài nguyên cho các route còn lại ngay ở trang chủ khi mà chưa có gọi gì đến các trang con (route mà được gắn link ở trang chủ).
-   **Lazy-load**: tải chậm và tạo các route còn lại tùy theo yêu cầu (route level 3).

Một hình ảnh minh họa cho PRPL bởi Jimmy Moon
![](https://cdn-images-1.medium.com/max/1000/1*wSy1jUPr08N8UKL_fHhXlw.png)


Quá trình đẩy (**"Push"**) nói đến ở trên khuyến khích server nên trả về một bản build Javascript mà không cần gom code vào thành 1 file bundle. Trái lại, từng file riêng lẻ được gửi về trình duyệt, vì trình duyệt hiện đại đang chuẩn hóa sang dùng giao thức HTTP/2. Giao thức này tối ưu cho việc load các file cần cho lần hiển thị đầu tiên trong khi các file tiếp theo lần lượt được cache lại một cách âm thầm. Việc phân phối các tài nguyên này có thể được kích hoạt hiệu quả bằng cách sử dụng [<link rel="preload">](https://developers.google.com/web/updates/2016/03/link-rel-preload) hoặc [HTTP / 2 Push](https://developers.google.com/web/fundamentals/performance/http2/#server-push) .

Treebo đã nghĩ ra một cách rất khôn khéo ở chỗ này. Đó là sử dụng `<link rel = "preload" />` ở ngay trang chủ, để tải trước các tài nguyên (javascripts, images) cho route hiện tại ngay trong lúc đang render route hiện tại. Điều này có tác động giảm thời gian tương tác lần đầu tiên của trang web, vì khi route hiện tại render xong, thì webpack sẽ tìm cách load các file cần thiết tiếp theo. Lúc này các file đã nằm gọn gàng trong cache rồi nên k cần call request về server nữa. **"Thủ thuật mờ ám"** này đã giúp thời gian chờ đợi giảm xuống một chút và do đó tương tác đầu tiên đã xảy ra ở mốc 4.6s.

![](https://cdn-images-1.medium.com/max/2000/1*Uhwf9VgUNDWtxV7Gp9NZkg.png)

Thủ thuật tuyệt vời vừa rồi chỉ có một nhược điểm duy nhất. Đó là không phải trình duyệt nào cũng hỗ trợ link pre-load. Tuy nhiên, tương lai khá là sáng lạn khi mà trình duyệt Safari đang thử nghiệm một bản Tech Preview, trong đó có hỗ trợ *link rel preload*. Tôi hy vọng rằng nó sẽ hoàn thiện sớm trong năm nay. Ngoài ra bên team làm trình duyệt Firefox cũng đang rục rịch ra mắt bản hỗ trợ cho link preload rồi, sớm thôi.

## Truyền trực tuyến HTML (HTML Streaming)

> Một khó khăn khi dùng hàm **renderToString()** đó là nó chạy tuần tự, và nó có thể trở thành một nút thắt cổ chai về hiệu suất trong việc render phía máy chủ khi render nhiều trang React cùng lúc. Máy chủ sẽ không gửi response cho đến khi toàn bộ file HTML được tạo xong. Khi web server truyền trực tuyến (stream) các nội dung trước, các trình duyệt có thể hiển thị (render) các trang nội dung cho người dùng trước khi toàn bộ lệnh đợi response kết thúc. Có một project opensource tên là [react-dom-stream](https://github.com/aickin/react-dom-stream) có thể giúp trong chuyện này.

Để cải thiện hiệu suất load trang và tạo cảm giác trang web load ngay tức thì, Treebo đã nhờ đến **HTML Streaming**. Họ sẽ thêm vào thẻ <header> các đường link pre-reload được thiết lập để tải trước các file CSS và JavaScripts của trang. Sau đó, họ thực hiện phần server side rendering và gửi phần html đã nén về cho trình duyệt.

Lợi ích của việc này là việc tải xuống các file resources (cần cho hiển thị) đã bắt đầu sớm, trong khi đợi server-side-rendering trả về cục html, giảm thời gian bắt đầu vẽ giao diện xuống còn 0.9s và tương tác đầu tiên lúc 4.4s. Ứng dụng luôn có thời gian bắt đầu tương tác xung quanh dấu mốc 4,9s/5s.

![](https://cdn-images-1.medium.com/max/2000/1*6PgaKR-HCQctzQVE7dIRqg.png)

Nhược điểm ở đây là phải giữ kết nối mở lâu hơn một chút giữa client và server, điều này có thể có vấn đề nếu bạn chạy vào lúc mạng chậm hoặc server có quá nhiều truy cập. Đối với luồng HTML, Treebo đã định nghĩa một đoạn đầu với nội dung <head>, sau đó là nội dung chính và phần cuối. Toàn bộ những thứ này đều được đưa vào trang. Trông nó như thế này.

{@embed: https://gist.github.com/lakshyaranganath/33142b2eae0806210ecead567dceab75#file-html-js}

{@embed: https://gist.github.com/lakshyaranganath/33142b2eae0806210ecead567dceab75#file-reactmiddleware-js}

Các cài đặt như thế này thực sự có hiệu quả. Đoạn đầu đã có các câu lệnh rel = preload cho tất cả các thẻ script khác nhau. Đoạn cuối đã có yêu cầu máy chủ kết xuất html và những thứ còn lại bao gồm trạng thái của các trang (state) hoặc các thư viện JavaScript cần thiết khác sẽ được tải cuối cùng, sau khi các cái kia đã tải xong.

## Viết các đoạn CSS cần hiển thị gấp dưới dạng Inlining

> các file CSS Stylesheets quá lớn có thể làm cho hiển thị trang web bị chậm. Vì một khi server đã gửi cho trình duyệt 1 file css. Trình duyệt sau khi gửi request file css cần lấy, bắt đầu phải load và phân tích cú pháp file css của bạn, trong khi trình duyệt loay hoay làm việc đó thì trang web có thể vẫn trắng trơn. Bằng cách giảm dung lượng CSS trình duyệt phải đọc và duyệt qua, bằng cách chia nhỏ file cs vbbbbbvvvvvvvvvvBasynchronously asynchronously vs chỉ để các css cần thiết cho từng màn hình ở thẻ <head> bên trên thẻ <body>  [Hãy xem thêm về kiểu viết critical path css ở đây](https://jonassebastianohlsson.com/criticalpathcssgenerator/#what-is), do đó loại bỏ bớt dung lượng css cần lấy qua HTTP, chúng tôi có thể làm cho trang web hiển thị nhanh hơn.

Treebo đã viết thêm code để **Inlining CSS** các css cần nhất cho route trang chủ và tải nhiều file đồng thời (asynchronously ) các phần css còn lại của giao diện bằng cách sử dụng [loadCSS](https://github.com/filamentgroup/loadCSS) sau khi đã load xong các DOM (DOMContentLoaded).

Đoạn code bên dưới là các hàm của Webpack giúp thực thi Inlining CSS được team Treebo viết, giúp cải thiện thời gian bắt đầu vẽ giao diện sớm hơn khoảng 0,4 giây.

{@embed: https://gist.github.com/lakshyaranganath/f7410178545720e260898de3b5054276#file-fragments-js}

{@embed: https://gist.github.com/lakshyaranganath/f7410178545720e260898de3b5054276#file-html-js}

{@embed: https://gist.github.com/lakshyaranganath/f7410178545720e260898de3b5054276#file-webpack-client-js}

Nhược điểm là thời gian để bắt đầu tương tác tăng lên một chút đến 4,6s vì kích thước load file lớn hơn với kiểu viết inline CSS và mất thời gian để phân tích CSS trước khi JavaScript có thể được thực thi.

![](https://cdn-images-1.medium.com/max/2000/1*pnXHVJYx4wnb5NogNcBcTg.png)

## Lưu tài nguyên tĩnh vào bộ nhớ cache offline

> Sử dụng [Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) là một proxy mạng có thể lập trình, cho phép bạn kiểm soát các request đến server được xử lý trước khi được gửi đi và ngược lại, xử lý response từ server trước khi client nhìn thấy. Thậm chí bạn có thể điều hướng request đến và đi để cache lại các tài nguyên thường dùng, để mục đích là lưu lại nguyên cả trang, chạy offline được.

Treebo đã viết code thêm phần hỗ trợ cho bộ nhớ đệm của Service Worker, để lưu lại toàn bộ các assets (tài sản tĩnh) của họ cũng như một trang offline tùy chỉnh (trang này không được đầy đủ như trang gốc, chỉ bao gồm các thông tin tham khảo, không thể thao tác được gì với server). Dưới đây chúng ta có thể thấy việc đăng ký Service Worker của họ và cách họ sử dụng [sw-precache-webpack-plugin](https://www.npmjs.com/package/sw-precache-webpack-plugin) để cache toàn bộ các tài nguyên "

{@embed: https://gist.github.com/lakshyaranganath/fb2b569631a5c6d5585951ae516302ea#file-fragments-js}

{@embed: https://gist.github.com/lakshyaranganath/fb2b569631a5c6d5585951ae516302ea#file-html-js}

{@embed: https://gist.github.com/lakshyaranganath/fb2b569631a5c6d5585951ae516302ea#file-server-js}

{@embed: https://gist.github.com/lakshyaranganath/fb2b569631a5c6d5585951ae516302ea#file-webpack-js}


![](https://cdn-images-1.medium.com/max/1000/0*TwNbHKi9HH60PKa7.)

Lưu trữ các assets tĩnh như là CSS và các gói bundle JavaScript có nghĩa là các trang load (gần như) ngay lập tức từ lần ghé thăm thứ 2 trở đi, vì chúng được tải từ bộ nhớ cache trên ổ đĩa thay vì phải request đến server để lấy về. Nếu bạn tự tạo header bên trong header có các định nghĩa tài nguyên mà trình duyệt cần cache lại, thì cũng vẫn có thể lưu cache cho lần thứ 2 vào trang. Nhưng vấn đề là Service Worker cung cấp cho trang web khả năng hiển thị các resource đó lên ngay cả khi đã offline.

![](https://cdn-images-1.medium.com/max/800/0*ISP4LE8o1LO-DbFI.)

Việc cung cấp JavaScript được lưu trữ bằng cách dùng Service Worker sử dụng API Cache (như chúng tôi đã trình bày trong [JavaScript Start-up Performance](https://medium.com/reloading/javascript-start-up-performance-69200f43b201) ) cũng có kết cục khá tốt đẹp khi tải toàn bộ trang Treebo vào bộ đệm code của trình thực thi Javascript V8 của chrome, nhằm tiết kiệm một chút thời gian khởi động trong các lần truy cập lặp lại.

Tiếp theo, Treebo muốn thử giảm kích thước các file bundle của các thư viện bên thứ 3 và giảm bớt thời gian chờ đợi thực thi file JS, nên họ quyết định từ bỏ React và sang dùng Preact để làm ra sản phẩm hoàn thiện.

# Chuyển từ React sang Preact

[**Preact**](http://preactjs.com/) là một thư viện cực kỳ nhỏ gọn, chỉ nhỏ 3KB, hoàn toàn thay thế được thư viện React vì cùng sử dụng API của **ES2015**. Nó ra đời nhằm mục đích cung cấp khả năng render cực nhanh và không cần quá quan tâm đến sự tương thích ngược, vì nó hỗ trợ hàm preact-compat, chạy biên dịch tốt các phần còn lại của hệ sinh thái React, vd như Redux.

Một phần nguyên nhân kích thước của Preact siêu nhỏ, đó là vì nó đã loại bỏ các xác thực *Synthetic Events* và *PropType*. Ngoài ra nó còn:

-   So sánh nhanh được sự khác nhau giữa *DOM ảo* và *DOM thật*.
-   Cho phép viết các thuộc tính ví dụ *class* hoặc *for*
-   Có thể truyền được các thuộc tính (props, state) sang cho bộ render để hiển thị theo yêu cầu
-   Sử dụng các sự kiện chuẩn mà mọi trình duyệt đều đang dùng
-   Render hiển thị hoàn toàn là theo chế độ đa luồng, bất đồng bộ (async )
-   Kiểm tra Subtree bị lỗi theo mặc định.

Trong một số ứng dụng dạng **PWA**, việc chuyển sang **Preact** đã dẫn đến các kích thước gói JS nhỏ hơn và thời gian khởi động JavaScript ban đầu thấp hơn. Các app PWA gần đây mới ra mắt như ứng dụng gọi xe Lyft, Uber và Housing.com đều sử dụng **Preact** cho phiên bản phát hành trên store của họ.

**Lưu ý: Bạn đang làm việc với một codebase React và vẫn muốn sử dụng thêm Preact? Lý tưởng nhất, bạn nên sử dụng Preact và preact-compat cho dev, prod và test builds của bạn. Điều này sẽ cho phép bạn sớm phát hiện ra bất kỳ lỗi nào sớm hơn. Nếu bạn chỉ muốn đưa preact và preact-compat vào trong Webpack để chèn nó vào bản builds sản phẩm (ví dụ bạn thích và đang sử dụng Enzyme), hãy đảm bảo kiểm tra kỹ lưỡng mọi thứ hoạt động như mong muốn trước khi deploy preact code sang server.**

Trong trường hợp của Treebo,việc chuyển đổi này có tác động giảm kích thước cho gói của thư viện bên thứ 3 từ 140kb xuống 100kb. Tất cả đều được nén bằng chuẩn gzipped. Nó giúp giảm thời gian tương tác đầu tiên từ 4,6s xuống 3,9s trên phần cứng mobile mục tiêu mong muốn của Treebo, đó rõ ràng là một thắng lợi lớn.

![](https://cdn-images-1.medium.com/max/2000/1*asckjwAnPWgEnH5UcAKd3w.png)

Bạn có thể làm tương tự trong cấu hình Webpack của bạn bằng cách chuyển từ react sang [preact-compat](https://github.com/developit/preact-compat) , và react-dom sang preact-compat.

{@embed: https://gist.github.com/lakshyaranganath/3a435a65e8a78957c97a27e9589ef38a#file-webpack-js}

Nhược điểm của phương pháp này là họ phải chỉnh sửa thêm một vài thứ, để Preact hoạt động chính xác với toàn bộ hệ sinh thái React mà họ muốn sử dụng.

Preact thường sẽ hoạt động hoàn hảo cho khoảng 95% codebase có sẵn, trường hợp bạn đang sử dụng React; và khoảng 5% cho các trường hợp khác, bạn có thể sẽ gặp phải các lỗi mà bạn phải mày mò fix bằng tay.

*Lưu ý: Vì WebPageTest hiện không cung cấp một cách để kiểm tra theo kiểu máy Moto G4 thực trực tiếp từ Ấn Độ, các thử nghiệm hiệu suất được chạy bằng cài đặt "Mumbai - EC2 - Chrome - Emulated Motorola G (gen 4) - 3GSlow - Mobile". Nếu bạn muốn xem các test này, chúng có thể được tìm thấy [ở đây](https://gist.github.com/addyosmani/d2fc259e1f1d19b64ae0fcbdfac025a2).*

## Hiển thị màn hình khung xương (Skeleton Screens)

> "Màn hình khung xương về cơ bản là phiên bản trống trơn của trang mà thông tin được tải dần về để lấp đầy."

> ~ Luke Wroblewski

![](https://cdn-images-1.medium.com/max/1000/1*sahnJCMruB6mmvjMwzDkUQ.png)

Treebo thích triển khai màn hình khung của họ bằng cách sử dụng các component xem trước dạng nâng cao (một chút giống như màn hình bộ xương cho mỗi component). Cách làm cơ bản là viết thêm một component dạng preview cho bất kỳ component nào (Văn bản, Hình ảnh, v.v.), nếu dữ liệu nguồn đang request cho component đó đang được tải về, trong lúc chờ đợi thì show phiên bản preview của component đó lên nhằm đánh lừa thị giác là đã có 1 cái gì đó ở đó rồi.

Ví dụ, nếu bạn nhìn vào tên khách sạn, tên thành phố, giá cả vv trong các mục danh sách ở trên, chúng được thực hiện bằng cách sử dụng các component Typography như <Text />, có thêm hai props, preview và previewStyle cũng được sử dụng như vậy.

{@embed: https://gist.github.com/addyosmani/fb053d71edcf002ccb88a278a2fec306#file-text-js}

Về cơ bản, nếu hotel.name không tồn tại thì component đó sẽ thay đổi nền thành màu xám với chiều rộng và các kiểu khác được đặt theo previewStyle được truyền xuống (chiều rộng mặc định là 100% nếu không có previewStyle được truyền).

{@embed: https://gist.github.com/lakshyaranganath/41a92ed1059756aed91dfe4afe42d60a#file-text-css}

{@embed: https://gist.github.com/lakshyaranganath/41a92ed1059756aed91dfe4afe42d60a#file-text-js}

Treebo thích cách tiếp cận này bởi vì logic để chuyển sang chế độ xem trước sẽ viết độc lập với dữ liệu thực sự được hiển thị làm cho code khá linh hoạt. Nếu bạn vào màn hình "Incl. of all taxes", nó chỉ hiện văn bản tĩnh, được hiển thị ngay từ đầu nhưng điều đó sẽ có vẻ rất khó hiểu với người dùng vì giá của từng mục vẫn đang tải trong suốt cuộc gọi api.

Vì vậy, để có được trang preview của màn hình “Incl. of all prices” họ chỉ sử dụng chính giá tiền làm logic cho chế độ preview.

{@embed: https://gist.github.com/addyosmani/65d5f5932241ba68473a55c09707a00e#file-textpreview-js}

Bằng cách này trong khi giá tiền đang tải bạn sẽ hiện được một UI màu xám thế chỗ để người dùng xem trước và một khi api trả về thành công bạn có thể nhìn thấy giá tiền thế chỗ vào từng vị trí đó.

## Phân tích các file bundles tạo ra bởi Webpack

Tại thời điểm này, Treebo muốn thực hiện một số phân tích bundles để xem những thứ còn ẩn dấu mà họ có thể tối ưu hóa thêm.

**Lưu ý: Nếu bạn đang sử dụng thư viện như React trên thiết bị di động, điều quan trọng là phải chăm chỉ tối ưu và cập nhật về các thư viện của nhà cung cấp bên thứ 3 mà bạn đang sử dụng. Không làm như vậy có thể tác động tiêu cực đến hiệu suất. Tốt nhất vẫn là chia phần code của thư viện nhà cung cấp theo từng route để chỉ tải các thư viện khi thực sự cần thiết.**

Treebo đã sử dụng [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) để theo dõi các thay đổi kích thước gói bundle của họ và theo dõi những mô-đun nào được chứa trong mỗi route. Họ cũng sử dụng nó để tìm các khu vực nơi họ có thể tối ưu hóa để giảm kích thước gói, ví dụ vị trí của moment.js và sử dụng lại thư viện ở lần gọi kế tiếp.

## Tối ưu hóa moment.js với webpack

Treebo dựa chủ yếu vào [moment.js](https://momentjs.com/) cho việc thao tác với ngày tháng trên web app. Khi bạn nhập moment.js và nến nó lại bằng Webpack, gói bundle của bạn sẽ bao gồm tất cả toàn bộ file moment.js và theo mặc định là nó nặng ~ 61.95kb gzipped. Điều này rõ ràng là gia tăng đáng kể kích thước gói bundle tổng thể.

![](https://cdn-images-1.medium.com/max/1000/0*hCQTD69-U1v7tO8x.)

Để tối ưu hóa kích thước của moment.js, có [hai plugin webpack](https://github.com/jmblog/how-to-optimize-momentjs-with-webpack) có sẵn: [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/) , [ContextReplacementPlugin](https://webpack.js.org/plugins/context-replacement-plugin/)

Treebo đã chọn xóa tất cả các file locate (file dịch ra đa ngôn ngữ cho ngày tháng) của moment.js bằng IgnorePlugin vì họ không cần bất kỳ ngôn ngữ nào khác ngoài tiếng Ấn.

```
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```

Với các file locate bị loại bỏ, kích thước đóng gói của moment.js giảm xuống còn ~ 16.48kb.

![](https://cdn-images-1.medium.com/max/800/0*ZjW0M4b_xhN_GFaE.)

Cải tiến lớn nhất là tác dụng phụ của việc loại bỏ các file locate của moment.js là kích thước gói của nhà cung cấp đã giảm từ ~ 179kb xuống còn ~ 119kb. Giảm được tới 60kb là khá ổn vì đó là một gói bundle quan trọng phải được phục vụ trong lần tải đầu tiên. Tất cả điều này dẫn đến giảm đáng kể thời gian tương tác đầu tiên. Bạn có thể đọc thêm về tối ưu hóa moment.js [tại đây](https://github.com/jmblog/how-to-optimize-momentjs-with-webpack) .

## Sử dụng lại các deep dependencies hiện có

Ban đầu, Treebo sử dụng mô-đun "qs" để thực hiện các hoạt động chuỗi truy vấn. Sử dụng đầu ra webpack-bundle-analyzer, họ thấy rằng “react-router”  bao gồm mô-đun “history” mà trong đó bao gồm mô-đun “query-string” .

![](https://cdn-images-1.medium.com/max/800/0*8yOSbnWVyHeXltKM.)

Vì có hai mô-đun khác nhau đều có các chức năng tương tự nhau, họ đã thay thế "qs" bằng phiên bản “query-string” (bằng cách cài đặt nó qua npm), giảm kích thước chung của cả gói thêm 2,72kb (chính là kích thước của Mô-đun "qs").

Treebo họ cũng là một công dân rất cởi mở trong việc chia sẻ mã nguồn mở. Họ đã sử dụng rất nhiều phần mềm nguồn mở. Đổi lại, họ đã thực sự chia sẻ mã nguồn phần lớn cấu hình Webpack của họ, cũng như một bản mẫu có chứa rất nhiều thiết lập mà họ đang sử dụng trong sản phẩm hoàn hiện. Bạn có thể ngó qua ở đây: <https://github.com/lakshyaranganath/pwa>

![](https://cdn-images-1.medium.com/max/800/0*u6wzzX7XAxJFBQ0T.)

Họ cũng cam kết cố gắng cập nhật các opensource họ đã share một cách thường xuyên. Khi trang web Treebo phát triển dần dần, bạn có thể tận dụng xem code của nó với mục đích tham chiếu và học hỏi thêm về PWA.

# Kết luận và tương lai

Treebo biết rằng không ứng dụng nào là hoàn hảo, họ tích cực khám phá nhiều phương pháp để tiếp tục cải thiện trải nghiệm mà họ cung cấp cho người dùng của họ. Một số trong số đó là:

## Lazy Loading Images
Một số bạn có thể đã nhìn thấy điểm bất thường từ các hình minh họa "thời gian chờ đợi trước khi bắt đầu tương tác được" ở bên trên. Đó là việc loading các hình ảnh cho trang web cũng tranh giành băng thông với tải file JS.

![](https://cdn-images-1.medium.com/max/2000/0*a_0WeA_JrALu8-lV.)

Bỏi vì khi trình duyệt một khi đã đọc và phát hiện ra có 1 thẻ <img>, ngay lập tức nó sẽ đi tìm và tải xuống hình ảnh đó, dẫn đến băng thông mạng bị chiếm mất 1 nửa trong quá trình tải xuống file JS. Một giải pháp đơn giản sẽ là lazy loading images, chỉ hiện hình ảnh khi mà người dùng đã cuộn qua nó, khi nó đang bị che thì chưa load vội làm gì cả. Điều này sẽ làm cho thời gian phải chờ đợi trước khi được tương tác là giảm kha khá.

Tool Lighthouse nêu bật những vấn đề này trong bài kiểm tra về hình ảnh:

![](https://cdn-images-1.medium.com/max/800/1*fbZP4KSAzZdUD6_q1WnO1Q.png)

## Tải song song

Treebo cũng nhận ra rằng mặc dù họ tải đồng thời các phần CSS còn lại của ứng dụng (sau khi đã tải xong các css quan trọng ở phần đầu header), cách tiếp cận này không khả thi đối với người dùng của họ trong thời gian dài khi ứng dụng của họ phát triển nâng cao thêm nhiều tính năng. Nhiều tính năng và route hơn có nghĩa là nhiều CSS hơn và tải xuống tất cả điều đó dẫn đến việc nghẽn cổ chai và lãng phí băng thông.

Họ lại nghĩ đến giải pháp hợp nhất các CSS đó lại bằng thư viện [loadCSS](https://github.com/filamentgroup/loadCSS) và [babel-plugin-dual-import](https://github.com/faceyspacey/babel-plugin-dual-import) , Treebo đã thay đổi cách tiếp cận của họ để tải CSS bằng cách sử dụng một lời gọi tới một tệp IMPORTCss ('chunkname') được tùy chỉnh để tải xuống đoạn CSS song song với tải đoạn code gọi js của họ ('chunkpath' ).

{@embed: https://gist.github.com/lakshyaranganath/834e4e3efdba3766770849f688a275a8#file-html-js}

{@embed: https://gist.github.com/lakshyaranganath/834e4e3efdba3766770849f688a275a8#file-importcss-js}

{@embed: https://gist.github.com/lakshyaranganath/834e4e3efdba3766770849f688a275a8#file-routes-js}

Với cách tiếp cận mới này, một quá trình chuyển đổi route đến hai yêu cầu đồng thời chạy song song, một cho JS và một cho CSS. Không giống như cách tiếp cận trước đó, khi tất cả CSS đã được tải xuống trên DOMContentLoaded. Điều này khả thi hơn vì người dùng sẽ chỉ tải xuống CSS yêu cầu cho các route họ đang truy cập.

## Thử nghiệm A/B
Treebo hiện đang triển khai phương pháp thử nghiệm A/B với hiển thị phía máy chủ và chia tách code để chỉ đẩy xuống biến thể mà người dùng cần trong khi hiển thị phía máy chủ và phía máy khách. (Treebo nói họ sẽ viết một bài và đăng lên blog để nói về cách họ giải quyết vấn đề này, chúng ta hãy cùng chờ đợi và theo dõi).

## Eager Loading
Treebo lý tưởng không muốn tải tất cả các phần của ứng dụng khi tải trang ban đầu, vì họ muốn tránh sự tranh chấp băng thông để tải xuống các tài nguyên quan trọng trước. Việc tải toàn bộ này cũng là lãng phí băng thông quý giá ở người dùng di động. Vì không lưu vào bộ nhớ đệm dẫn đến các tài nguyên lại phải load lại cho lần vào kế tiếp. Nếu chúng ta xem xét Treebo đang hoạt động như thế nào dựa trên các số liệu như sự tương tác nhất quán, vẫn còn nhiều chỗ để cải thiện:

![](https://cdn-images-1.medium.com/max/1000/1*jSAh4rt_B2qhJsKfYMfuBA.png)

Đây là một khu vực mà họ đang thử nghiệm với việc cải tiến. Một ví dụ là mong muốn tải trước các tài nguyên của route tiếp theo khi đang mở splash screen loading (sau khi click vào một nút nào đó). Treebo thực hiện thao tác [dynamic-imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) gọi tới đoạn nhập tài nguyên của route tiếp theo và trì hoãn quá trình gọi route bằng setTimeout. Họ cũng muốn đảm bảo rằng route tiếp theo đủ nhỏ để tải xuống trong khoảng thời gian chờ ít hơn 400ms trên mạng 3G chậm.

## Đó là tất cả những gì họ đã làm.

Thật thú vị khi cộng tác với team Treebo trong bài viết này. Rõ ràng là còn có nhiều việc phải làm tiếp theo, nhưng chúng tôi hy vọng bạn đã nhìn thấy rõ hành trình của Treebo một cách thú vị :) Bạn có thể tìm thấy chúng tôi trên twitter tại [@addyosmani](https://medium.com/@addyosmani "Cấu hình trung bình cho @addyosmani") và [@__lakshya](https://medium.com/@__lakshya "Cấu hình trung bình cho @__lakshya") (vâng, gạch chân 2 phát nhé xD), chúng tôi rất thích nghe các chia sẻ và suy nghĩ của các bạn.

*Xin cám ơn [@_zouhir](https://twitter.com/@_zouhir) , [@_developit](https://twitter.com/@_developit) và [@samcccone](https://twitter.com/@samccone) cho các đánh giá và các thông tin quý giá của họ.*

Nếu bạn mới sử dụng React, [React cho người mới bắt đầu](https://goo.gl/G1WGxU) bởi Wes Bos là một bài tổng quan toàn diện để bạn có thể bắt đầu học và thực hành.



-----


Đây là một bài dịch, các bạn có thể đọc bài gốc tại đây: https://medium.com/dev-channel/treebo-a-react-and-preact-progressive-web-app-performance-case-study-5e4f450d5299