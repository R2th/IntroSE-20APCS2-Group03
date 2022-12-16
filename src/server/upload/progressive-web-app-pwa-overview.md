**Theo bạn, một ứng dụng web lý tưởng là 1 ứng dụng web như thế nào? Đó có phải là một ứng dụng web có thể hoạt động được ofline hoàn toàn, có thời gian tải trang gần như tức thì và chạy một cách linh hoạt ngay cả khi đường truyền mạng thiếu ổn định? Nghe có vẻ những điều kiện đó là bất khả thi nhưng thực sự những trình duyệt web hiện đại ngày nay đa phần đều đã hỗ trợ những tính năng, việc bạn cần làm chỉ là sử dụng chúng mà thôi. Khi bạn xây dựng một ứng dụng web mà có thể tận dụng được những tính năng mạnh mẽ như vậy, bạn đang tạo ra một *Progressive web app (PWA)*
Trong bài viết này, mình sẽ cùng với các bạn xem xét những điều gì làm cho 1 trang web trở nên *progressive*, làm sao để bạn có thể tận dụng được những tính năng mạnh mẽ mà trình duyệt đã cung cấp sẵn để xây dựng những ứng dụng web như thế này. Mình hi vọng sau khi đọc xong, các bạn có thể hiểu được những lợi ích mà PWA manh lại cho người dùng, lý do tại sao PWA sẽ thay đổi bộ mặt của web. Cuối cùng, trăm nghe không bằng một thấy, chúng ta sẽ xem xét qua một số sản phẩm thực tế của các công ty đã áp dụng PWA vào sản phẩm của họ.**

## 1.1. PWA giải quyết cái gì?
Nhu cầu truy cập web trong thời đại hiện nay là cao chưa từng có, thật khó tưởng tượng một ngày nào đó mà bạn không lên facebook để cập nhật tin tức, lên báo vnexpress hoặc 24h để đọc tin, lên youtube xem video bóc phốt, đánh nhau :v, hay với mình là sáng nào cũng phải đọc báo bóng đá theo dõi tỉ số các thứ :D. Cho dù bạn có có sử dụng thiết bị gì, ngồi ở đâu, thì cách tiếp cận của bạn đối với các thông tin cũng không thay đổi quá nhiều: đó là truy cập qua web.
Nhưng không phải lúc nào bạn cũng có thể mở chiếc máy tính lên và vào các trang web được, vì chúng khá lớn và khá bất tiện nếu so với các điện thoại thông minh. Mặc dù các thiết bị điện thoại thông minh đang ngày một mạnh mẽ hơn về khả năng xử lý, tuy nhiên thì mạng di động lại chưa thể phát triển cùng mức độ với sức mạnh đó. Có thể lấy một ví dụ đơn giản: đa phần các máy điện thoại hiện đại đều có thể quay/phát video với độ phân giải 4k, nhưng tốc độ mạng di động mà đa phần người dùng có thể tiếp cận lại không thể tải nổi những video có độ phân giải này. Chưa kể ra nếu gặp phải nơi có sóng di động yếu (như trong thang máy ở keangnam chẳng hạn) thì việc mất kết nnối là điều khá thường xuyên. Do vậy, ở vị trí là một nhà phát triển web và có những sản phẩm dựa trên công nghệ web, đó là những vấn đề mà chúng ta cần giải quyết.

Nhưng phải chăng những vấn đề về việc ngắt kết nối/hoạt động offline đã được giải quyết bởi các native apps rồi sao? chưa kể rằng những ứng dụng được xây dựng bằng native apps thường có performance tốt và cho một trải nghiệm người dùng rất tốt. Nếu không có kết nối, bạn vẫn có thể sử dụng được ứng dụng. Nhưng có một vấn đề là chi phí phát triển một ứng dụng có thể hoạt động tốt trên mọi nền tảng di động + web là khá lớn, do đó, PWA sẽ giải quyết được vấn đề này.

Trước đây (và thậm chí là trong hiện tại), đa phần các ứng dụng web đều không thể cung cấp những tính năng như trên đầu bài mình đã đề cập: hoạt động offline, thời gian load tức thì, khả năng hoạt động ở mức tin cậy cao. Đó chính là những tính năng sẽ khiến cho PWA tỏa sáng. Những nhà phát triển trình duyệt đang làm việc cùng nhau để cải thiện cách chúng ta tạo ra những trang web mạnh mẽ và linh hoạt hơn vao giờ hết. Hãy cùng điểm lại một lần nữa những gì PWA mang lại:
*  Responsive
*  Hoạt động không phụ thuộc vào kết nối (connectivity-independent)
*  Cho trải nghiệm người dùng như native apps
*  Luôn luôn cập nhật
*  An toàn
*  Dễ dàng được tìm thấy bởi người dùng
*  Giữ chân người dùng tốt hơn 
* ...

Đọc đến đây các bạn có thể đặt ra một câu hỏi: PWA ngon thật, với trình duyệt hiện đại (và hại điện như Chrome) thì không sao, nhưng với những trình duyệt cũ và không cung cấp những tính năng đó thì sao? Câu trả lời là PWA thực sự *progressive*, tức là những trình duyệt không hỗ trợ những công nghệ mới liên quan đến PWA (như Service Worker) vẫn hoạt động như một website thông thường. Các công nghệ trong trình duyệt cho phép PWA có thể hoạt động tốt với mọi trình duyệt, nếu trình duyệt không hỗ trợ thì thôi, không có vấn đề gì cả :D

## 1.2. PWA basics
* Điều gì tạo nên một PWA? 
* Ở mức độ cơ bản nhất, PWAs là một web app thông thường được tạo bởi những công nghệ/công cụ hết sức quen thuộc đối với các web developer: HTML, CSS và JS.
* Tiếp theo PWA chứa một *manifest* file chứa những thông tin cho website của bạn, bao gồm icons, background, màu,... 
* PWA sử dụng một tính năng gọi là *Service Worker* để có thể xử lý những tác vụ liên quan đến truy cập dữ liệu thông qua mạng, xử lý để cho chúng có thể hoạt động offline, với Service Worker, bạn sẽ không còn phải chơi khủng long mỗi khi mất mạng nữa (mặc dù chơi cũng khá vui)
* PWA cho phép bạn *save* chúng ra màn hình home (sử dụng trên smartphone) và hoạt động như một native app (có icon, click vào là chạy)

![](https://images.viblo.asia/13009d3d-64c7-4ab3-a0d4-04e7f9412877.jpg)

### 1.2.1. Bussiness cases cho PWA
Là một developer, mình và có lẽ rất nhiều bạn khác cũng có chung sở thích là học và làm những công nghệ/framework mới nhất, hot nhất :D . Nhưng điều đó thường khiến chúng ta không để ý đến những giá trị mang lại về mặt bussiness: liệu sử dụng những công nghệ mới nhất, hot nhất như vậy có thể khiến business của chúng ta tốt hơn không? đó là một câu hỏi mà thường chúng ta thường không để ý tới khi chọn học và làm một công nghệ mới (kiểu mình thích thì mình làm thôi :D )

Với PWA, giá trị mang lại về mặt business theo mình thấy là khóa rõ ràng. Một trong những đặc điểm đáng giá nhất của PWA là bạn có thể nâng cấp từng tính năng một trên ứng dụng web hiện có của mình. Cho dù bạn đang sử dụng stack nào, thì PWA vẫn sẽ là 1 giải pháp không khó để tiếp cận vì nó dựa trên những thứ cơ bản nhất như HTML, CSS và JS.

Ok, quay trở lại với business, hãy dừng lại vài giây để có thể hình dung ra những việc bạn có thể làm hoặc cải thiện với PWA. Hãy cùng lấy một ví dụ đơn giản nhất: bạn làm một trang thông tin giới hiệu về các di tích lịch sử tại Hà Nội, bạn biết rằng khi người dùng sử dụng web của bạn, họ sẽ thường truy cập nhiều trang chứ không chỉ xem mỗi trang chủ, vậy tại sao chúng ta không cache những trang đó lại để khi người dùng không còn duy trì kết nối, họ vẫn có thể vào những trang đó và tìm kiếm thông tin? Hay một dự án mình đang phải làm là phục vụ việc tưới cây, mỗi khi một nhân viên thu thập tình trạng của cây nhưng không có mạng thì sao? với PWA, họ vẫn có thể thu thập được các thông tin đó, và khi có kết nối trở lại, những thông tin đó sẽ được đồng bộ với server.

Một tính năng khác có ảnh hưởng rất nhiều đến business là "Add to home screen". Lần này thay vì tưởng tượng, hãy cùng lấy một ví dụ thực tế: vào năm 2015, Flipkart, công ty thuơng mại điện tử lớn nhất của Ấn Độ đã bắt đầu xây dựng Flipkart Lite, là một PWA kết hợp những gì tốt nhất của phiên bản web và những gì tốt nhất của phiên bản native mobile. Nếu bạn truy cập flipkart.com trên mobile, bạn có thể đoán ra được lý do tại sao trang web này thành công: trải nghiệm người dùng là rất ấn tượng, trang chạy nhanh, hoạt động offline và sử dụng rất tiện lợi. Bằng cách áp dụng PWA, Flipkart có thể hiển thị trên màn hình của người dùng. Và theo thống kê của họ, những người dùng truy cập qua icon được tạo thông qua "Add to Homescreen" có tỉ lệ mua hàng cao hơn tới 70% so với những người duyệt qua website.

bất kì một ứng dụng nào đẩy lên PlayStore hoặc AppStore đều gặp khó khăn trong việc tiếp cận người dùng do có quá nhiều ứng dụng. Nhưng PWA (xét cho cùng là 1 trang web) lại có thể được dễ dàng tìm thấy qua các search engine, vì vậy, khả năng người dùng tiếp cận được với PWA rõ ràng là cao hơn do họ có thể thấy thông qua những mạng xã hội, google adsense,....

## 1.3 Service Workers: PWA's Maestro
Như mình đã nói ở trên, một trong những công nghệ trung tâm của PWA là Service Workers. Hiểu một cách đơn giản nhất, Service Workers là một worker script chạy ngầm, được viết bằng JS, giúp cho developer handle các request, push mesages và nhiều tác vụ khác. Nếu như người sử dụng dùng một trình  duyệt không hỗ trợ Service Workers, đơn giản là nó sẽ chạy như 1 website thông thường.

### 1.3.1 Services Worker 101
Mình có đọc được một lời giải thích khá hay của Jeff Posnick (kĩ sư phần mềm của Google) về Service Workder 
> Think of your web requests as planes taking off. Service Worker is the air traffic controller that routes the requests. It can load from the network or even off the cache

Do Services Worker là "air traffic controller", bạn có thể sử dụng Service Workers để kiểm soát hoàn toàn mọi request được tạo từ PWA của bạn. Cũng tuơng tự như "air traffic controller", bạn có thể điều hướng đến 1 sân bay khác, delay, hoãn chuyến, Service Workers sẽ giúp bạn redirect request hoặc dừng hẳn chúng.

Mặc dù Service Workes được viết bởi JS, nhưng nó hơi khác 1 chút so với những file JS thông thường. Service Workers làm những việc sau:
* Chạy trong global context riêng của nó
* Không gắn với bất kì trang web cụ thể nào 
* Không thể can thiệp vào DOM
* Chỉ chơi với HTTPS
Dưới đây mình minh họa qua cách mà Service Workers chạy trên trình duyệt của bạn. Như bạn có thể thấy, Serivce Worker chạy trong *worker context* và nó không thể truy cập DOM, cũng như chạy trên 1 thread khác so với những đoạn JS thông thường mà bạn sử dụng. Service Worker được thiết kế hoàn toàn async, có nghĩa là bạn không thể truy cập đựoc những thành phần synchronous như XHR hay localStorage. Service Worker qua hình minh họa dưới cũng thể hiện đặc điểm là nó chạy ở 1 thread độc lập, có thể chặn các network request xuất phát từ website của bạn, đặc điểm này khiến nó ở trên đặc biệt mạnh mẽ và cho phép bạn hoàn toàn tự do trong việc xử lý các requests.
![](https://images.viblo.asia/8cbd8e24-f5d6-4f58-ae62-e3ec4bc4a2e2.png)

Bạn không cần phải là một JS master để có thể bắt đầu tìm hiểu và sử dụng Service Workers, trên thực tế thì mình thấy bắt đầu với Service Workers là tuơng đối đơn giản với đa phần mọi nguời :D

### 1.3.2. The Service Workers lifecycle
Hãy cùng xem hình minh họa sau:

![](https://images.viblo.asia/9d0d5453-2590-4102-8a36-9fdb736bc072.png)

Lấy ví dụ một trang web về blogging, có rất nhiều lượt truy cập/ngày. Ở một mức hiểu đơn giản nhất, website này nhận những request về nội dung, bao gồm ảnh, videos,....

 * Khi người dùng lần đầu tiên truy cập vào URL, server trả về response cho trang web. Ở hình trên, bạn có thể thấy step 1, Service Workers bắt đầu download khi goi hàm `register()`. 
 * Trong quá trình register, browser sẽ tiến hành download, parse và chạy Service Worker (step 2).
     * Nếu trong bất kì thời điểm nào của bước này fail, `register()` promise sẽ reject, và Service Worker sẽ bị bỏ đi.
* Khi Service Workers được khởi chạy thành công, sự kiện install sẽ được kích hoạt. Một đặc điểm tuyệt vời của Service Worker là nó *event-based*, có nghĩa rằng bạn có thể bắt bất kì sự kiện nào (những sự kiện này có thể được sử dụng để phục vụ cho kĩ thuật caching cực nhanh mà mình có thể sẽ trình bày ở một bài viết khác).
* Khi quá trình install được hoàn thành, Service Worker sẽ được kích hoạt (activated) Nếu như tất cả những events trong lifecycle thành công, thì service worker sẽ được chính thức sử dụng.

Nếu bạn thấy quá trình trên tuơng đối khó hiểu, hãy thử hình dung qua cách hoạt động của đèn giao thông: trong quá trình registration, Service Workers tuơng ứng với đèn đỏ, vì nó cần download và parse. Tiếp theo, đèn vàng là khi nó đang được khởi chạy và chưa thực sự sẵn sàng để sử dụng. Nếu toàn bộ các bước trên thành công, Service Worker sẽ chuyển sang xanh và có thể được sử dụng.

Khi bạn tải trang lần đầu tiên và không active Service Worker, nó sẽ không handle bất kì request nào đi và đến. Chỉ khi nó được cài đặt và được active, nó mới có quyền kiểm soát chúng mà thôi. Điều đó có nghĩa: tất cả những logic trong Service Workers chỉ hoạt động khi bạn refresh trang hoặc di chuyển đến một trang mới.

# Tổng kết
* Nếu nói về UX, native app có khả năng cung cấp UX tốt hơn so với những website truyền thống.
* Web đang ngày càng phát triển và không có lý do gì để chúng ta cung cấp cho người dùng những ứng dụng web nhanh, linh hoạt và hấp dẫn. PWA giúp chúng ta có thể đạt được những điều này.
* Service Workers là chìa khóa để chúng ta có thể tận dụng được sức mạnh của trình duyệt. Có thể tưởng tượng Service Worker là một trung tâm điều khiển máy bay (trong việc đứng chặn giữa các HTTPS requests)

Hi vọng rằng với bài viết mở đầu về PWA, các bạn sẽ có cái nhìn rõ ràng hơn về khái niệm được cho là khá mới này và có thể bắt đầu tìm hiểu những vấn đề sâu hơn về PWA để có thể nâng cấp các sản phẩm của mình lên một tầm cao mới :D