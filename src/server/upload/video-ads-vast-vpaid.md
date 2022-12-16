Mời các bạn xem [Part 2 : Ad Server & How does it work?](https://viblo.asia/p/ad-server-how-does-it-work-bJzKmy2EK9N)

Bạn đã bao giờ xem một video trực tuyến và thấy một *banner* quảng cáo hay một *video* quảng cáo xuất hiện đầu hoặc cuối mỗi *video*? 

Có thể cảm nhận được rằng *video* là một phương tiện quảng cáo cực kì hiệu quả, nó mang lại nhiều tính tương tác về thị giác, thính giác và cả trí tưởng tượng hơn là quảng cáo hình ảnh, *text*. 

Trong vài năm qua, mức tiêu thụ *video* đang tăng lên nhanh chóng. Nhiều nhà quảng cáo (`advertisers`) và tiếp thị (`marketers`) đã tham gia vào mảnh đất màu mỡ này, với nhiều kỳ vọng sớm áp dụng tiếp thị *video*.
Và trong các loại quảng cáo *video*, quảng cáo video tương tác (*interactive video ad*) có tác dụng thúc đẩy nhận thức và gắn kết thương hiệu nhiều hơn.

Về tổng quan, so với quảng cáo ko tương tác (`non-interactive video ads`) thì quảng cáo tương tác sẽ:
- Có tỷ lệ tương tác cao gấp ***4*** lần
- Nhận thức về thương hiệu cao hơn ***4%***
- Nâng cao ý định mua hàng của user lên ***5%***
- Liên kết tin nhắn nhiều hơn ***2%***

Trong *series* về quảng cáo *video* này, mình muốn giới thiệu sơ qua các định nghĩa, các thành phần cần thiết, xuất hiện trong quảng cáo *video* . Bài viết này sẽ nói về *VAST & VPAID*, chúng là gì? và vì sao chúng lại quan trọng trong quảng cáo *video*.

1. [Video Ads - Part 1 - VAST & VPAID](https://viblo.asia/p/video-ads-part-1-vast-vpaid-XL6lANgA5ek)
2. ...
## Tiền đề cho sự ra đời của VAST & VPAID
### Bối cảnh
Trong quảng cáo trực tuyến, các trình duyệt được dùng để hiển thị quảng cáo, việc *tracking* sự tương tác được thực hiện thông qua `HTML` bằng cách gửi dữ liệu thông qua nhiều mạng và `server` có liên quan. Tuy nhiên, với quảng cáo *video*, một `video player` không phải là một trình duyệt và có thể không dùng `HTML`. Mỗi `video player` được xây dựng dựa trên các công nghệ khác nhau, sử dụng lõi kỹ thuật riêng biệt.

Các server quảng cáo (`video ads server`)  muốn cung cấp quảng cáo cho *video player*, chúng cần phát triển các `tag` được thiết kế để hiển thị quảng cáo dựa trên công nghệ của từng *video player* được cung cấp. Vấn đề phức tạp là nhiều *server* có thể được yêu cầu là một phần của quá trình cung cấp quảng cáo, yêu cầu mỗi *server* sẽ cung cấp thông tin hiển thị quảng cáo chuyên biệt. Khi một `advertiser` muốn hiển thị video quảng cáo trên `publisher's website`, họ cần phải đảm bảo rằng `video ad-serving protocol` của họ phải phù hợp với `publisher's video player`, nếu không `advertiser` (hay `video ad-serving platform`) buộc phải thay đổi,
tạo ra các `response` khác nhau sao cho phù hợp với các *video player* cụ thể. Và bạn có thể tưởng tượng, điều này thực sự cồng kềnh và tốn thời gian.
### Sự ra đời
Tháng 9 năm 2008, **IAB** (*The Interactive Advertising Bureau* - Cục Quảng cáo tương tác) cho ra phiên bản đầu tiên của `VAST`.

**VAST** - ***video ad-serving template*** ra đời nhưng là lẽ thiết yếu, `VAST` cung cấp một cách thống nhất cho dữ liệu được truyền từ `ad server` đến với *video player* mà không phụ thuộc vào bất cứ công nghệ (tạo ra *video player*) nào, nó cho phép `ad server` và *video player* "*speak the same language*" thông
qua việc sử dụng chung `protocol`. 

Sử dụng `XML`, `VAST` cung cấp cho việc phân phát `video ad` tương tự như `HTML` cung cấp cho các quảng cáo khác trên trình duyệt (*browser*).

`VAST` hỗ trợ phân phát *video* cho bất cứ *video player* nào có thể *request* và *parse XML documents*. Không có gì trong `VAST` là *specific* cho **device** hay **platform**, điều này có nghĩa là nó có thể hoạt động trên nhiều *video player* trong các trường hợp bên dưới:
- Video player trong web page
- Video player trong mobile web page
- Video player trong mobile native application
- Video player trong Internet TVs
- Video playback thông qua IPTV hoặc các môi trường [set-top-box](https://vi.wikipedia.org/wiki/Set-top_box) khác

## [VAST or “Video Ad Serving Template”](https://iabtechlab.com/wp-content/uploads/2018/11/VAST4.1-final-Nov-8-2018.pdf)

### Overview
- Là tài liệu được phát triển bởi **IAB** 
- Cung cấp bộ khung chung, thống nhất để nhúng quảng cáo trong luồng *video* (*in-stream video ad*)
- Được thiết kế để tạo điều kiện và chuẩn hóa quá trình giao tiếp giữa *video player* và *video ad server*
- Có thể xem là *video ad-serving protocol*

Các định nghĩa có liên quan:

**Video player**:
- Được nhúng vào *publisher website* hoặc *mobile*, *TV app*, và được dùng để hiển thị *video* và *video ad*.

**VAST/ Video Ad server**
- `Ad Server` được dùng bởi `advertiser` để lưu trữ và phân phát quảng cáo *video*, phân tích và báo cáo lượng tương tác với *video* quảng cáo.
- Dựa trên *ad request* từ *VAST tag*, *Video ad server* sẽ trả về các tiêu chí `creatives` (*creatives criteria*) như "*what to serve?, how the video is to be played?, or what metrics to be tracked?*..."

(Về *overview* và cách hoạt động của *ad server* - hẹn các bạn trong những bài viết tiếp theo :) )

**VAST Ad Tag**
- Là bộ mã (*code*) đã được chuẩn hóa (dựa trên [`VAST guideline`](https://iabtechlab.com/wp-content/uploads/2018/11/VAST4.1-final-Nov-8-2018.pdf)) được đặt trên `publisher's website` hoặc trong ứng dụng giao tiếp với *ad server*.
- Nó cho *ad server* biết loại quảng cáo nào sẽ được hiển thị dựa trên các tiêu chí ngắm mục tiêu (*targeting criteria*)
- Mỗi không gian quảng cáo cần một `ad tag` mới.

> Bạn có thể tham khảo thêm định dạng của VAST tag thông qua các [sample tại đây](https://developers.google.com/interactive-media-ads/docs/sdks/html5/tags) và [ý nghĩa của các tag của VAST tại đây](https://iabtechlab.com/wp-content/uploads/2018/11/VAST4.1-final-Nov-8-2018.pdf)

Hãy nghĩ *VAST* như các kịch bản đưa ra hướng dẫn nhất quán cho *video player* về cách *handle ad*:
- which ad to play?
- how the ad should show up?
- how long it should last, and whether the viewers can skip it?
- where to find the ad (the ad server) ?
- what the click-through URL should be?
- and more...

*VAST tag* có nhiều phiên bản. Được giới thiệu đầu tiên từ năm 2008.
- VAST 1.0 (không còn được hỗ trợ) Septemper 2008 - only support linear ads
- VAST 2.0 November 2009 - support for multiple creatives, linear and non-linear ads, and companion ads.
- VAST 3.0 July 2012 - Support for skippable ads, ad pods, in-ad privacy notices, and better tracking.
- VAST 4.0 January 2016 - support for Server-side ad insertion, Mezzanine files and Creative ID, Ad Verification and Viewability, Category support, and Conditional Ad Declaration and others.
- VAST 4.1 November 2018 Improve of 4.0 & include something new: Verification, Digital Audio Ad Serving Template (DAAST), ... ([see more here](https://iabtechlab.com/wp-content/uploads/2018/11/VAST4.1-final-Nov-8-2018.pdf))

### Cách VAST hoạt động

![](https://images.viblo.asia/39b2ff1c-b11b-4488-9a31-d9186773171b.png)

1. **VAST Request**: Tại một vài điểm trong quá trình *play video*, có thể là trước (*pre-roll*), giữa (*mid-roll*) hoặc sau (*post-roll*), *video player* chạm (*reaches*) điểm thêm một quảng cáo và sử dụng *HTTP request* để gởi yêu cầu 1 quảng cáo. *Request* được gởi lên `primary ad server`, có thể là một `publishers ad server` hoặc một `supply-side platform`.
2. **Wrapper Response**: Khi nhận được *request ad*, *primary server* sẻ trả về *VAST*. *Response* này có thể là `Inline` hoặc `Wrapper`. Nếu *server* có thể *fill ad request* (kiểu như server đã chứa đầy đủ thông tin về quảng cáo), nó sẻ trả về *Inline response* (*step 4*). Trong nhiều trường hợp, *ad server* sẽ chuyển hướng *player* sang một *secondary server* sử dụng *Wrapper response*.
3. **Secondary VAST request** Nếu một *Wrapper response* được nhận, *player* sẽ tạo 1 *secondary request*  sang *server* khác. Cứ thế cho đến *server* cuối cùng trả về một *Inline response*.
4. **Inline Response** Như đã nói ở trên, sau một chuỗi các *Wrapper response*, *Ad server* cuối cùng trong chuỗi sẽ trả về một *Inline Response*.
5. **Inline execution**: *Media player* sẽ thực thi *VAST response*.
6. **Tracking**: Tại các *key point* trong quá trình *play ad* (Ví dụ: hiển thị *frame* đầu tiên, chạy được 1/4, 1/2, 3/4 video quảng cáo, click...), các thông tin được *tracking* sẽ được gởi lên cho cả *Inline* và *Wrapper server* mà *player* nhận được *response*.

### Tại sao VAST lại quan trọng?
Như đã nói ở trên, *VAST* quan trọng vì nó cho phép *video player* và *ad server* "*speak the same language*".

Với việc tuân theo quy định của *VAST*, `advertiser` sẽ không phải lo lắng việc *video ad* của họ không thể chạy trên nhiều *video player*. Còn *publisher* thì không phải lo lắng về kho quảng cáo bị hạn chế.

Nói cách khác, số lượng lớn hơn các `publisher` sẽ bán và hiển thị quảng cáo cho `advertiser`, mang lại nhiều doanh thu hơn. Các tiêu chuẩn dẫn đến quy mô, có lợi cho cả `publisher` và `advertiser`

Vậy nên nếu bạn là một `advertiser`, bạn nên tìm kiếm các *video ads* dựa trên tiêu chuẩn (*VAST*) để chiến dịch quảng cáo (*compaign*) đạt kết quả tốt hơn.


## [VPAID or “Video Player-Ad Interface Definition”](https://www.iab.com/wp-content/uploads/2015/06/VPAID_2_0_Final_04-10-2012.pdf)
### Overview
- Phát triển bởi **IAB** cho các tương tác giữa các đơn vị quảng cáo (`ad unit`) và *video player*, tập trung vào việc cho phép trải nghiệm quảng cáo trong luồng (*in-stream ad*) phong phú.
- Cho phép tương tác và đo lường mức độ *video ad* của bạn hoạt động tốt như thế nào thông qua việc theo dõi tương tác.
- Các mã chạy trong *video player* và làm nổi bật *video ad* của bạn với các tính năng tương tác giống như các lớp phủ của các view: "*Click & read more*".
- `Advertiser` thích quảng cáo được kích hoạt phản hồi từ các đối tượng mục tiêu và bạn có có thể đo lường *video ad* mà bạn đặt ở đó.
- Cho phép bạn biết nếu quảng cáo của bạn đang hoạt động.

Mặc dù *VPAID* có thể sử dụng độc lập, nhưng nó thường được nhúng vào *VAST*. Lý do là các `advertisers` có thể sử dụng tốt cả 2 khía cạnh: 
- Tương thích và *logic* với *VAST* 
- Các tính năng tương tác và báo cáo từ *VPAID*  mà có thể được thêm bằng cách sử dụng *Javascript* bên trong 1 *VPAID container*. 

=> So với *VAST*, *VPAID* cho phép `advertisers` phân phát quảng cáo tương tác phong phú cho người dùng và thu thập dữ liệu về cách người dùng tương tác với quảng cáo *video* của họ.

{@embed: https://www.youtube.com/watch?v=fabcZ67NYUw}

### Cách VPAID hoạt động
![](https://images.viblo.asia/975304f3-7888-4223-8fe6-811b404f2fab.png)

1. **Call**: *Video player*  gởi một *ad call* lên *ad server*. 
2. **Response**: *Ad server* trả về một *VAST XML* có chứa một `VPAID-compliant executable ad unit`
3. **Ongoing Communication**: *Video player* và *ad unit* vẫn nằm trong giao tiếp khi quảng cáo thực thi và hiển thị cho người xem. Với *VPAID*, người dùng có thể thể `get` và `set` các `properties` cho *ad unit*, và *ad unit* có thể gởi các *event* đến *video player*.
4. **Tracking Impressions & Activities**: *Video player* và *ad unit* có thể gởi các *tracking request* về hiển thị và các hành động tương tác đến các *ad server* tương ứng.

### Tại sao VPAID lại quan trọng với advertiser?
`VPAID` quan trọng với các `advertisers`  bởi nó giúp bạn có thể thấy các quảng cáo riêng lẻ đang hoạt động như thế nào và nghĩ ra những cách cải thiện để thu hút khán giả (người xem) và tăng mức độ tương tác với quảng cáo của bạn. 

`Advertiser` có thể chọn đặt thời gian và nơi quảng cáo xuất hiện trong nội dung, với các chức năng cơ bản như *play*, *pause*, *close*, *hide*... . Bất cứ hành động nào của người dùng thực hiện sẽ được ghi lại và báo cáo cho `advertiser`.

### Optimize để tối đa hóa kết quả từ VPAID
Để có kết quả tối ưu từ quảng cáo *video* của bạn: Ngoài hiệu suất của *ad unit*, bạn cần phải đảm bảo việc phân phát quảng cáo cũng được tối ưu hóa để có kết quả tối đa. Do đó, thường *VPAID* phải được gửi đến *video player* trong một *VAST ad response*, để đảm bảo tối đa hóa khả năng chèn quảng cáo *video* tiềm năng ở phía *publisher*.

## Summary
- Bạn sẽ có thể cắm (*plug*) quảng cáo này vào `ad server` của mình và nó sẽ hoạt động (miễn là bạn và nhà cung cấp đa phương tiện (*video player*) của bạn tuân theo định dạng *VAST* cơ bản).
- Bạn tiết kiệm thời gian trong việc lập lịch quảng cáo *video* của mình.
- Bạn không cần phải dành thời gian và nguồn lực cho việc đào tạo, phát triển và quản lý quảng cáo *video* tùy chỉnh cho *ad networks / servers / third-party*.
- Hợp lý hóa hoạt động của bạn thông qua việc đơn giản hóa việc phân phối quảng cáo
- Cho phép bạn(*publisher*) phân phát quảng cáo từ các nhà cung cấp khác mà không cần đại tu, thay đổi *video player* của bạn.
- Các nhà phát triển *video player* sẽ không lãng phí thời gian vào việc tùy chỉnh phát triển trình phát cho mỗi và mọi mạng quảng cáo mới hoặc bên thứ ba.

**REFERENCES**

https://clearcode.cc/blog/vast-vpaid-vmap-mraid/

https://www.mobileads.com/blog/vast-vpaid-why-is-it-important-for-video-advertising

https://iabtechlab.com/wp-content/uploads/2018/11/VAST4.1-final-Nov-8-2018.pdf

https://www.iab.com/wp-content/uploads/2015/06/VPAID_2_0_Final_04-10-2012.pdf

(*TO-BE-CONTINUED*)