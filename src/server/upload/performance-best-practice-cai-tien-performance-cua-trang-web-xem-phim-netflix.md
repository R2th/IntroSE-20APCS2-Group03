![](https://cdn-images-1.medium.com/max/2000/1*Pxmm24WKcYUqFC1Fsh_n7g.png)


Cải thiện thời gian tương tác cho Netflix.com trên máy tính Desktop
------------------------------------------------------------------

Không có vũ khí hoàn hảo nào cho việc tối ưu hiệu suất (performance) các trang web 100%. Các trang web tĩnh đơn giản, chỉ bao gồm html, css, js được coi là nhanh nhất có thể, vì chúng được hưởng lợi từ việc server không cần phải làm gì ngoài việc trả về chính xác file html nào, file JavaScript nào cần hiển thị, mà không cần quá nhiều thư viện javascript phức tạp. Thư viện js có thể cung cấp giá trị tuyệt vời cho các trang phức tạp khi được sử dụng cẩn thận.

[Netflix](https://netflix.com/) là một trong những dịch vụ phát video trực tuyến phổ biến nhất. Kể từ khi ra mắt trên toàn cầu vào năm 2016, công ty đã phát hiện ra rằng nhiều người dùng mới không chỉ đăng ký xem phim trên thiết bị di động, hơn nữa họ còn sử dụng các thiết bị di động có mạng 3G kết nối khá chậm để vào xem phim.

Bằng cách tinh chỉnh JavaScript được sử dụng cho quá trình đăng ký của Netflix.com và sử dụng kỹ thuật tìm nạp trước, nhóm nhà phát triển có thể cung cấp trải nghiệm người dùng, tốt cho cả người dùng thiết bị di động và máy tính để bàn và cải tiến thêm một số tính năng.

-   Load xong màn hình và thời gian bắt đầu tương tác giảm 50% (đối với trang chủ dành cho máy tính desktop đã đăng xuất tại Netflix.com)
-   Kích thước gói JavaScript giảm 200kB bằng cách chuyển từ React và các thư viện phía client khác sang thư viện Vanilla JavaScript. React vẫn được sử dụng ở phía máy chủ để xử lý DOM.
-   Tìm nạp trước HTML, CSS và JavaScript (React) đã giảm thời gian chờ đợi xuống khoảng 30% cho các trang cần điều hướng đến từ trang gọi nó.

#### Giảm thời gian chờ đợi bằng cách gửi ít JavaScript hơn

Khu vực cần được tối ưu hóa cho performance được team Netflix chú ý đến, là trang chủ sau khi đăng xuất, nơi người dùng đến để đăng ký hoặc đăng nhập vào trang web.

![](https://cdn-images-1.medium.com/max/800/1*T_bJaPmnB7Muy1Vw67CBqg.png)

Trang này ban đầu chứa 300kb JavaScript, một số trong đó là React và các mã phía client khác (chẳng hạn như các thư viện tiện ích như Lodash), và một vài trong số đó là dữ liệu ngữ cảnh cần thiết để lưu trạng thái của React.

Tất cả các trang web của Netflix được phục vụ bởi React phía máy chủ, phục vụ file HTML đã được gen ra file tĩnh (server-side-rendering) và sau đó response cho ứng dụng phía client. Vì vậy điều quan trọng là giữ cấu trúc của trang chủ mới cũng phải hoạt động tương tự như cách vừa nói, để không làm bối rối các lập trình viên trong quá trình áp dụng.

 *Hình bên dưới cho thấy, Tab trang chủ là ví dụ về component ban đầu được viết bằng React*
![](https://cdn-images-1.medium.com/max/800/1*LaiM-eBWHnLloOpvbMggww.png)


Sử dụng 2 tool là ChromeDevTools và Lighthouse của Chrome để mô phỏng trang chủ đã đăng xuất đang được tải trên kết nối 3G chậm. Cho thấy trang chủ đã đăng xuất mất 7 giây để tải lại từ đầu, thời gian chờ đợi như vậy là quá lâu chỉ cho một trang chủ hiển thị đơn giản. Vì vậy họ đã phải dốc sức điều tra nguyên nhân. Với một số kiểm tra cơ bản về hiệu năng bằng 2 tool kia, Netflix đã phát hiện ra JS phía client của họ có [chi phí (dung lượng)](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) khá cao .


*Hình bên dưới cho thấy Netflix.com đã thử dùng giả lập mạng 3G tốc độ chậm trong Chrome DevTools để test trang chủ của họ*
![](https://cdn-images-1.medium.com/max/800/1*9lGTXyeixVs7P1cBL1p7NA.png)


Bằng cách tắt JavaScript của trình duyệt và quan sát yếu tố nào của trang web vẫn hoạt động, nhóm các nhà phát triển đã có thể xác định xem React có thực sự cần thiết cho trang chủ sau khi đăng xuất vẫn hoạt động hay không.

Vì hầu hết các phần tử trên trang là HTML cơ bản, các phần tử còn lại như xử lý nhấp chuột JavaScript và thêm class có thể được thay thế bằng JavaScript đơn giản và trình chuyển đổi ngôn ngữ của trang, được xây dựng ban đầu bằng React, được xây dựng lại bằng vanilla JavaScript chỉ có khoảng ít hơn 300 dòng code.

Danh sách đầy đủ các component được chuyển đến vanilla JavaScript là:

-   Tương tác cơ bản (các tab ở giữa trang chủ)
-   Trình chuyển đổi ngôn ngữ
-   Biểu ngữ cookie (cho khách truy cập không phải ở Hoa Kỳ)
-   Ghi log phía client để phân tích
-   Đo lường và ghi nhật ký performance
-   Mã khởi động pixel phân bổ quảng cáo (được sandbox trong iFrame để bảo mật)

![](https://cdn-images-1.medium.com/max/800/1*wBgSYuZmjbGP34BJiRSETw.jpeg)

Mặc dù dung lượng thêm vào của React chỉ là 45kB, sau khi loại bỏ React, một số thư viện và code ứng dụng tương ứng, ở phía client đã giảm tổng số lượng JavaScript xuống hơn 200kB, và đã giảm hơn 50% thời gian chờ đợi trước khi tương tác của Netflix cho trang chủ đã đăng xuất.


*Hình bên dưới cho thấy: So sánh tổng dung lượng loading trước và sau khi loại bỏ React, Lodash và các thư viện khác phía client.*
![](https://cdn-images-1.medium.com/max/800/1*zd9QTVBtN2xmrZ94s4TYYA.jpeg)


Trong môi trường [phòng thí nghiệm](https://developers.google.com/web/fundamentals/performance/speed-tools/#lab_data) , chúng tôi có thể xác thực người dùng hiện có thể tương tác với trang chủ Netflix nhanh chóng bằng cách sử dụng [Lighthouse](https://developers.google.com/web/tools/lighthouse/) ( [trace](https://www.webpagetest.org/lighthouse.php?test=180822_M4_a5899bc8928b958d06902161c15b2c86&run=2) ). Ở trang web chạy trên Desktop, thời gian chờ đợi trước khi có thể bắt đầu tương tác chỉ còn < 3.5s.

Hình bên dưới cho thấy: Báo cáo của tool Lighthouse sau khi tối ưu hóa Thời gian tương tác đã đạt được
![](https://cdn-images-1.medium.com/max/800/1*xviETZh4IDKxT5x_k2u8cg.png)



Còn về các số liệu khác thì sao? Sử dụng [báo cáo Trải nghiệm người dùng Chrome,](https://developers.google.com/web/tools/chrome-user-experience-report/)chúng tôi có thể thấy [Độ trễ đầu vào đầu tiên](https://developers.google.com/web/updates/2018/05/first-input-delay)  - thời gian từ khi người dùng tương tác lần đầu với trang web của bạn đến thời điểm trình duyệt thực sự có thể phản hồi tương tác đó -  cho thấy có tới  97% người dùng Netflix trên máy tính Desktop cảm nhận là trang web chạy [nhanh](https://bigquery.cloud.google.com/savedquery/920398604589:1692b8e0bdc94d4883437d8712cbb83a) . Quá là tuyệt vời.

*Hình bên dưới cho thấy: Độ trễ đầu vào đầu tiên (FID) đo lường sự chậm trễ của người dùng khi tương tác với trang.*
![](https://cdn-images-1.medium.com/max/800/1*Gxkl5liyc-tI7Wh7UTtDlQ.png)


#### Tìm và nạp trước React cho các trang tiếp theo

Để cải thiện hiệu suất hơn nữa khi điều hướng trang chủ đã đăng xuất của mình, Netflix đã sử dụng thời gian người dùng xem trên trang đích để tìm nạp trước tài nguyên cho trang tiếp theo mà người dùng có thể truy cập.

Điều này đạt được bằng cách sử dụng hai kỹ thuật - API trình duyệt [<link rel = prefetch> được tích hợp sẵn](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ) và tìm nạp trước XHR.

API trình duyệt tích hợp bao gồm thẻ link đơn giản trong phần header của trang. Nó nói cho trình duyệt biết rằng tài nguyên (ví dụ: HTML, JS, CSS, hình ảnh) có thể được tìm và nạp trước, mặc dù điều này không đảm bảo rằng trình duyệt thực sự *sẽ* tìm nạp trước tài nguyên đó. Và việc tìm nạp trước này không phải trình duyệt nào cũng hỗ trợ, [các trình duyệt khác](https://caniuse.com/#feat=link-rel-prefetch) có một số chưa hỗ trợ.

Hình bên dưới: So sánh các kỹ thuật tìm nạp trước
![](https://cdn-images-1.medium.com/max/800/1*TAv9_jZGqmX-aTJw5QDtRA.jpeg)


Mặt khác, XHR tìm nạp trước đã trở thành một tiêu chuẩn trình duyệt trong nhiều năm và tạo ra tỷ lệ thành công 95% khi nhóm phát triển Netflix dùng tính năng này để bắt trình duyệt luôn luôn cache các tài nguyên dùng nhiều trong trang. Mặc dù không thể sử dụng tính năng tìm nạp trước XHR để tìm nạp trước tài liệu HTML, nhưng nó đã được Netflix sử dụng để tìm nạp trước gói JavaScript và CSS cho các trang tiếp theo.

Lưu ý: Cấu hình header response HTTP của Netflix đang ngăn không cache HTML với XHR (chúng không lưu cache trên HTML của trang thứ hai). Ngoại trừ việc không thể đặt cache ở trang con sau khi đã đặt ở trang cha, thì link Prefetch luôn làm việc như mong đợi bởi vì nó sẽ làm việc trên HTML ngay cả khi không có bộ nhớ cache.
```
// tạo một yêu cầu XHR mới
const xhrRequest = new XMLHttpRequest ();

// mở yêu cầu cho tài nguyên để "tìm nạp trước"
xhrRequest.open ('GET', '../bundle.js', true);

// Gửi request!
xhrRequest.send ();
```

Bằng cách sử dụng cả API trình duyệt tích hợp và XHR để tìm nạp trước HTML, CSS và JS, thời gian chờ đợi trước khi tương tác đã giảm 30%. Việc triển khai này cũng không yêu cầu JavaScript phải viết lại và không ảnh hưởng tiêu cực đến performance của trang chủ đã đăng xuất và do đó cung cấp một công cụ có giá trị để cải thiện hiệu suất trang với rủi ro rất thấp.

![](https://cdn-images-1.medium.com/max/800/1*yusmoWBbhhfxDEv03OWPTQ.jpeg)

Sau khi tìm nạp trước được triển khai, các nhà phát triển Netflix đã quan sát các cải tiến bằng cách phân tích số liệu Thời gian chờ đợi tương tác đã được giảm bớt, cũng như sử dụng các công cụ dành cho nhà phát triển của Chrome để đo lường trực tiếp các lần truy cập bộ nhớ cache.

#### Trang chủ Netflix - tóm tắt bài học rút ra

Bằng cách tìm nạp trước tài nguyên và tối ưu hóa mã phía client trên trang chủ của Netflix, họ đã cải thiện đáng kể các chỉ số về thời gian tương tác của user trong quá trình sử dụng dịch vụ.  Netflix có thể giảm trung bình khoảng 30% thời gian user phải chờ đợi. 

Việc tối ưu hóa code được thực hiện bởi team lập trình của Netflix, cho thấy rằng trong khi React là một thư viện hữu ích, nó có thể không phải là giải pháp cho mọi vấn đề. Bằng cách xóa React khỏi code phía client trên trang chủ, thời gian chờ đợi đã được cải thiện hơn 50%. Giảm thời gian chờ đợi ở phía client cũng khiến người dùng nhấp vào nút đăng ký ở mức cao hơn, cho thấy rằng tối ưu hóa code có thể dẫn đến trải nghiệm người dùng tuyệt vời hơn về mọi mặt.

Trong khi Netflix không sử dụng React cho trang chủ, họ đã tìm nạp trước nó cho các trang tiếp theo. Điều này cho phép họ tận dụng React phía client trong suốt phần còn lại của quá trình đăng ký sử dụng dịch vụ.

Để biết thêm chi tiết về các tối ưu hóa này, hãy xem bài nói chuyện A + này của Tony Edwards:
{@embed: https://www.youtube.com/watch?v=V8oTJ8OZ5S0}

### Phần kết luận

Netflix đã phát hiện ra các cơ hội để cải thiện Thời gian tương tác của user bằng cách theo dõi chặt chẽ dung lượng của JavaScript. Để khám phá xem trang web của bạn có cơ hội nào để làm tốt hơn nữa hay không, hãy tham khảo [công cụ hiệu suất](https://developers.google.com/web/fundamentals/performance/speed-tools/) của bạn .

Vì sự cân bằng mà Netflix quyết định dùng server-render trên trang chủ dạng landing page của họ bằng cách loại bỏ React, nhưng vẫn tìm nạp trước code bằng React. Điều này tối ưu hóa hiệu suất cho lần tải đầu tiên, nhưng cũng tối ưu hóa thời gian tải cho phần còn lại của trang đăng ký (khi người dùng gọi trang đó từ trang chủ), và trang đăng ký có kích thước gói JS lớn hơn nhiều cần tải xuống vì đó là một ứng dụng dạng single-page app. Như vậy thì Netflix đã sử dụng trang tĩnh làm trang chủ của họ, và trong khi người dùng đang bận rộn đọc thông tin trên trang chủ, Netflix đã khôn khéo nhờ trình duyệt hãy tải luôn (tải trước) nội dung cần cho trang register (trang đăng ký làm thành viên).

Bạn cũng không cần nhất thiết phải viết mã trang tĩnh bằng thư viện Vanilla Script. Vì nếu trang chủ của các bạn khá đơn giản, hãy dùng javascritp thuần và không dùng thư viện gì phức tạp, đó sẽ là cách ứng dụng chạy nhanh nhất. Ngoài ra, các kỹ thuật như tìm nạp trước có thể giúp cải thiện thời gian tải trang cho các url điều hướng trang khi người dùng click vào url đó thì trình duyệt đã có sẵn tài nguyên để hiển thị chứ k mất công chờ đợi nữa.

#### Ghi chú bổ sung

-   Netflix đã từng xem xét sử dụng [Preact](https://preactjs.com/) để giúp thay thế cho React, nhưng sau cùng, vì luồng sử dụng trên trang chủ chỉ là trang đơn giản với tương tác thấp, ít control phức tạp, họ đã quyết định sử dụng VanillaScript vì sự đơn giản nhẹ nhàng của nó.
-   Netflix đã thử nghiệm với [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/) cho bộ nhớ đệm tài nguyên tĩnh. Vào thời điểm đó, Safari không hỗ trợ API của Service Worker.Nhưng hiện tại thì Safari đã hỗ trợ Service Worker, do đó Netflix đang thử dùng lại Service Worker. Quá trình đăng ký account Netflix cần hỗ trợ cả các trình duyệt cũ vì nhiều người dùng vẫn đăng ký account trên trình duyệt khá cũ, ví dụ các loại điện thoại cổ hoặc dùng trình duyệt trên tivi (vốn rất ngu học).
-   Trang chủ Netflix khá là động. Vì họ cần hiển thị các thông tin khác nhau tùy vào từng quốc gia, ngay cả ngôn ngữ với chữ dài cũng làm thay đổi cấu trúc trang. Với gần 200 quốc gia được hỗ trợ, có những thách thức về nội địa hoá, pháp lý và các giá trị khác nhau cho mỗi phát sinh. Netflix thậm chí đã phải sử dụng đến Machine Learning để có thể thử nghiệm độc lập cho từng quốc gia, giúp tìm ra trải nghiệm tốt nhất. Để biết thêm về thử nghiệm A/B, hãy xem [Thử nghiệm thành trải nghiệm người dùng tốt hơn](https://www.youtube.com/watch?v=TmhJN6rdm28) bởi Ryan Burgess.

*Xin cám ơn các kỹ sư giao diện người dùng Netflix, *[*Tony Edwards*](https://twitter.com/tedwards947)* , *[*Ryan Burgess*](https://twitter.com/burgessdryan)* , *[*Brian Holt*](https://twitter.com/holtbt?lang=en)* , *[*Jem Young*](https://twitter.com/JemYoung?lang=en)* , *[*Kristofer Baxter*](https://twitter.com/kristoferbaxter)* (Google), *[*Nicole Sullivan*](https://twitter.com/stubbornella)* (Chrome) và *[*Houssein Djirdeh*](https://twitter.com/hdjirdeh)* (Chrome) vì những đánh giá và đóng góp của họ cho bài viết này.*

Bài này là một bài dịch, các bạn có thể tham khảo bài viết gốc tại: https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9