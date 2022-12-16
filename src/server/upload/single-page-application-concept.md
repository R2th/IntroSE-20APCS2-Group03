Bạn đã từng nghe về một trang wed Single page hay chưa? Dạo gần đây Single page application là một cái tên đang nổi trong xu hướng phát triển web. Mặc dù concept này đã ra đời hơn chục năm nay. Cũng không ít website đã áp dụng kỹ thuật này. Việc sử dụng Single-page Application (SPA) sẽ rất hiệu quả và tiết kiệm về băng thông, cũng như cho trải nghiệm người dùng tốt hơn. Vậy thì SPA là gì? Tại sao nó lại trở thành xu hướng. Xin mời các bạn cùng tìm hiểu qua bài viết sau.

![](https://images.viblo.asia/36660cef-78cb-4ec2-9fdb-38bbfd461fa0.jpg)

# 1. Single-page Application (SPA) là gì?
## Concept
![](https://images.viblo.asia/2d35ba29-12ec-4f56-8fa7-a6c7aac13aba.png)
Single page Application là một ứng dụng web giúp nâng cao trải nghiệm người dùng bằng cách sử dụng HTML5 và AJAX. Đầu tiên khi tải một trang web bất kỳ, SPA sẽ tải một trang HTML đơn, sau đó dựa trên request của người dùng, SPA sẽ tiếp tục tải các HTML khác trong cùng một trang đó, SPA có thể sử dụng một vài thư viện JavaScript như AngularJS, Backbone.js, Durandal...

Hiểu một cách đơn giản, thì toàn bộ resource của web bao gồm các file CSS, Javascript, master layout hay cấu trúc web page sẽ được load lần đầu tiên khi chúng ta bắt đầu duyệt môt website A nào đó.
Ở những lần sau, khi chuyển trang khác, client sẽ gửi những ajax request để get dữ liệu cần thiết( thường là phần nội dung). Việc này mang đến trải nghiệm cho người dùng web tốt hơn, giảm thời gian phải load lại toàn bộ trang web cồng kềnh, tiết kiệm băng thông cũng như thời gian chờ đợi. Việc này là trái ngược hoàn toàn với trang web truyền thống khi toàn bộ trang web phải load lại mỗi khi chuyển trang.

Để có cái nhìn dễ hiểu hơn, bạn hãy nhìn hình minh họa bên dưới về single page application
* Vùng màu xanh được coi là khung hay master page của 1 website, 
* Vùng màu đỏ là content của web page sẽ hiển thị và thay thế mỗi khi chuyển trang.

![](https://images.viblo.asia/904a1aff-a68f-4216-a306-5a987597d3d6.png)

Một số trang web ứng dụng SPA như: Gmail, Google Maps, Facebook hay GitHub, http://enod.fr/, http://appleplugs.com/ ...

![](https://images.viblo.asia/70a5fd3f-259a-4738-8354-521aaf62c839.gif)

# 2. Single-page Application và một trang web truyền thống khác nhau nhau thế nào?
Multiple-page applications thì hoạt động theo cách truyền thống, khi người dùng yêu cầu một trang web, thì server sẽ tính toán và trả về trang web đó cho người dùng toàn bộ trang web dưới dạng mã html. Hầu như không có bất kỳ sự liên kết nào giữa 2 yêu cầu gần nhau. Do đó khi có nhiều yêu cầu được diễn ra thì sẽ làm quá trình tính toán diễn ra lâu hơn, bởi hệ thống phải tính toán nhiều thành phần trước khi trả về một trang web hoàn chỉnh.

Vậy thì làm sao để có thể biết được Web đó có đang sử dung SPA? Một cách đơn giản nhất là bạn hãy thử bằng chức năng load trang.

## Multiple-page applications

Lần đầu tiên truy cập trang web 'https://ngoisao.net/" toàn bộ dữ liệu của trang web sẽ được hiển thị. Sau đó, bạn chọn mở một bài viết bất kỳ, và chú ý biểu tượng loading trên favicon, trang web sẽ thực hiện load lại toàn bộ nội dung theo yêu cầu của bạn, điều đó khiến cho performance của trang web khá chậm

![](https://images.viblo.asia/e27fb8e7-c881-4173-81fd-3b271676802b.gif)


## Single page application
Một ví dụ đơn cử dễ hiểu là trang Facebook. Nếu bạn đang lướt News feed, hãy thử load lại. Tất cả những gì thay đổi chỉ là bảng tin mới nhất được update. 
Tương tự với trang Google, khi bạn nhập những gì muốn tìm kiếm, tất cả những thay đổi chỉ là những kết quả được xuất ra, riêng khung Google bên trên vẫn đứng yên dù bạn có chuyển sang trang 2, 3 v.v…

# 3. Single-page có tốt hơn cho SEO không?
Một trang duy nhất có làm cho bạn bị mất lợi thế để xếp hạng cao trên Google hay không? Dưới đây là những ưu điểm và khuyết điểm của website một trang và những lợi thế của một thiết kế site đơn giản.

## Single page thường sẽ cho trải nghiệm mobile tốt hơn
Với SPA, việc thiết kế phiên bản mobile cho ns sẽ dễ dàng hơn nhiều và người dùng cũng di chuyển dễ dàng hơn trên site đó.

Hơn nữa, single page sẽ giúp cho web load nhanh hơn, khiến nó trở thành lợi thế lớn khi phục vụ cho những người dùng thiếu sự kiên nhẫn. Nhiều người dùng cảm thấy khó khăn khi phải thực hiện các thao tác bấm trên thiết bị có màn hình nhỏ, như điện thoại di động, và Single page trong trường hợp này sẽ thích hợp hơn cho họ.

## Single page sẽ khiến cho việc target tới một đối tượng cụ thể dễ dàng hơn

Với Single page, tất cả mọi thông tin người dùng có thể tìm thấy đều đặt tại một trang duy nhất. Đối với SEO, đây là một cách làm tốt, bởi lẽ nó chỉ nhắm tới một hoặc một bộ từ khóa mà thôi.

Tuy nhiên, người dùng sẽ phải cuộn toàn bộ trang web để tìm thấy những thứ mà họ mong muốn, do đó họ có thể sẽ đi khỏi trang của bạn nếu như những nội dung ở phần đầu không đủ giá trị. Hãy đảm bảo rằng mọi thứ bạn đặt trên site đều có mục đích của nó và bạn đã suy tính kỹ lưỡng trước khi đặt chúng ở đó.

## Single page sẽ giúp bạn có độ tin cậy cao hơn

Link là một trong những yếu tố lớn quyết định một website sẽ được xếp hạng như thế nào. Đây chính là lợi thế của việc chỉ có một trang vì mọi link trỏ tới đều trỏ về trang chủ của bạn.

## Content của single page site không có độ chi tiết cao

Một trong những điểm bất lợi của site một trang đó là content sẽ không thể nào cụ thể và chi tiết được như site có nhiều trang. Ví dụ như trang Facabook, trên New Feeds của bạn chỉ có thể hiển thị nội dung giới hạn của một bài viết, và cũng như facebook không hổ trợ bạn việc tạo format cho một bài viết dài, có bullet, heading... Vì mục đích chính của FB là trang mạng xã hội dùng để chia sẽ cá nhân mà thôi. Việc lấp đầy content của Multiple pages trên Single page  là không thể. Điều mà bạn có thể làm là chia nhỏ các mục của content ra. Mỗi mục này sẽ tương ứng với một trang riêng biệt nếu bạn làm site có nhiều trang.

## Với single page site bạn sẽ không sử dụng các kỹ thuật SEO nâng cao được

Có những kỹ thuật SEO nâng cao mà chắc chắn là bạn không thể sử dụng được trên single page. Một trong các kỹ thuật đó là kỹ thuật cấu trúc website thành các Category và Sub-Category để hiển thị nội dung tốt nhất cho người dùng và giúp site của bạn được chia theo độ tin cậy. Kỹ thuật này được gọi là siloing. Chắc chắn với single page, bạn sẽ không thể nào áp dụng được kỹ thuật siloing này. Đây cũng có xem là một bất lợi của website single page.

## Kết luận

Thực tế thì website một trang sẽ không tốt bằng nhiều trang khi bạn làm SEO. Nhưng thường những người làm site dùng SPA thường không tập trung làm SEO lắm.
Khi quyết định xem bạn nên làm site một trang hay nhiều trang, bạn nên nghĩ tới mục đích kinh doanh của khách hàng, loại hình doanh nghiệp mà họ muốn hướng tới. Sau đó xem mục tiêu hướng đến của bạn là ai và tìm ra giải pháp tốt nhất cho họ.


Reference: 
https://seomxh.com/threads/single-page-website-co-tot-cho-seo-khong.415147/#ixzz5AkTyopYL
https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58