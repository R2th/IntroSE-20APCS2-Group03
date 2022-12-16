Việc phát triển web front-end side ở một số hệ thống lớn lâu nay vẫn được làm theo kiểu monoliths (dù có thể backend đã được microservice hoá), ai cũng biết đây là bad practice. Kể cả khi bắt đầu chia code ra thành các component, xài `require` hoặc `import` để tái sử dụng (chia ra thành các UI component lib hoặc javascript framework của riêng bạn), tuy vậy cái kết vẫn là một cục web app "monoliths" (một khối duy nhất). Đã đến lúc thay đổi điều này :smile:.

![](https://images.viblo.asia/26e9f476-6468-4e72-a7e8-fe9497039ab8.png)

## Tại sao code front-end là một cục "monolith"

Về cơ bản tất cả các web app đều mặc định là "monolith" trừ khi bạn thay đổi cách phát triển theo hướng micro frontends. Vì sao chuyển thành micro frontends? Ví dụ có 2 team dev front-end làm việc chung trên 1 cục code React, 1 team làm phần admin, 1 team làm phần user board chả hạn. 2 team này phải sync với nhau trong quá trình deployment cũng như dễ xảy ra các lỗi conflict khi merge code (vì chung 1 cục code, chung build system). Cách thoát ra khỏi "monolithic app" theo thường lệ là "microservices", nhưng nó chỉ dành cho backend thôi mà? :joy:

## Thực chất microservices là gì?

Theo cách mô tả đơn giản và ngắn gọn nhất về microservices, nó là một **cách phát triển cho phép các developers develop và deploy độc lập các thành phần của một platform mà không làm ảnh hưởng tới các thành phần khác**. Microservices cung cấp khả năng triển khai các module độc lập cho phép chúng ta xây dựng các service tách biệt và dễ dàng thay đổi. Nguyên tắc hàng đầu khi triển khai microservices là: mỗi service chỉ có một nhiệm vụ duy nhất và đảm bảo là nó không quá bự.

Dưới đây là một bản vẽ đơn giản đễ dễ thấy sự khác nhau của monolith và microservices:

![Microservices](https://cdn-images-1.medium.com/max/1600/1*LwJvLwza7FDa7_C5kaBLpg.jpeg)

Như các bạn thấy, trong kiến trúc microservices gồm nhiều service, mỗi service là một standalone application (ứng dụng chạy độc lập) ngoại trừ phần UI. UI vẫn chỉ là 1 cục duy nhất! Trong khi mỗi service ở phía backend được handle bởi một team khác nhau, khá dễ để scale lên, ngoại trừ team frontend thì vẫn phải handle monoltith app, đây có thể là một bottleneck (nghẽn cổ chai) của kiến trúc này.

![Bottleneck](https://cdn-images-1.medium.com/max/2000/1*aSWnsL6W4VIKLqSGJPbYqg.jpeg)

Ngoài ra, monolith front-end sẽ đem đến một vài vấn đề khó chịu trong phần `tổ chức team` và con người như đã đề cập ở trên, đó là khó triển khai thành nhiều team khác nhau làm việc độc lập với những nhiệm vụ riêng.

## Giải pháp cho front-end trong microservices: Micro Frontends

Giải pháp sẽ tương đối rõ ràng, đơn giản là áp dụng các nguyên tắc của microservices như cách áp dụng cho phía backend: Chia cục frontend monolith ra thành nhiều cục UI fragments. Nhưng UI không giống như các services, nó là giao diện thứ kết nối trực tiếp user với product, nó nên nhất quán và liền mạch thay vì mỗi cái một kiểu độc lập. Hơn thế nữa, trong kỉ nguyên của Single Page Application, phần render, logic của web app được nằm hoàn toàn ở phía client-side (client-side rendering: chạy trên trình duyệt), không còn là những file HTML đơn giản nữa, thay vào đó là những phần logic phức tạp không kém so với ở backend side. Định nghĩa micro frontend có thể nói như sau:

> The idea behind Micro Frontends is to think about a website or web app as a composition of features which are owned by independent teams. Each team has a distinct area of business or mission it cares about and specialises in. A team is cross functional and develops its features end-to-end, from database to user interface. ([micro-frontends.org](https://micro-frontends.org))

Theo kinh nghiệm của tui, ở nhiều công ty, thật khó để apply kiến trúc được đề xuất ở trên vào product một cách dễ dàng. Các developers có thể sẽ cảm thấy mệt mỏi khi phải đọc lại và migrate một đống legacy code từ hệ thống cũ sang (mà chắc không dễ gì là `clean code` rồi :smirk:) micro front-end.

## Cấu trúc tổng thể và một số thuật ngữ

Chúng ta sẽ phân chia một app monolith theo chiều dọc qua các nhóm chức năng (business functionalities). Làm theo cách này, cuối cùng chúng ta sẽ tạo ra được một số app monolith nhỏ hơn có cấu trúc tương tự với monolith app ban đầu. Tiếp theo, thêm vào một `special app` (có thể coi là một layer) ở lớp trên cùng của các app nhỏ vừa tạo ra, bằng cách này user sẽ giao tiếp với `special app` này, nó sẽ có nhiệm vụ kết hợp các app nhỏ kia thành một thể thống nhất. Lớp layer này có thể được gọi là `stitching layer`, vì nó nhận các UI đơn lẻ từ các monolith app nhỏ đó và cuối cùng tạo ra một UI liền mạch cho user, đây sẽ là cách triển khai đơn giản nhất của một kiến trúc micro frontends.

![Micro-frontends](https://cdn-images-1.medium.com/max/1600/1*L9W7jz1jj3ur4XkWoUcgqg.jpeg)

Để dễ hiểu hơn, tui sẽ gọi các app monolith nhỏ này là `micro-app`, vì tất cả đều là `standalone apps` chứ không chỉ là `microservices`, tất cả đều có UI và mỗi cái đại diện cho mỗi chức năng khác nhau.

Như đã biết, hệ sinh thái phía frontend ngày nay rất linh hoạt và có thể cực kì phức tạp. Và vì thế cách triển khai trực tiếp như này có thể sẽ không đủ cho một product quá lớn.

## Các vấn đề phải giải quyết trong micro frontends

- Làm thế nào để gom các micro-apps lại thành một thể UI thống nhất và liền mạch?

Thật khó để trả lời ngắn gọn câu hỏi này, một trong những ý tưởng là: tạo ra một `shared UI library` trong khi bản thân nó là `standalone micro-app` luôn. Bằng cách đó, các `micro-apps` khác sẽ phụ thuộc và kế thừa từ `shared UI library micro-app`. Trong trường hợp này, chúng ta chỉ tạo ra một UI dependency và hoàn toàn triệt tiêu lí tưởng của một `standalone micro-apps`.

Có một cách làm khác là tạo ra một lớp [CSS custom variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) trên level `:root:`. Lợi thế của ý tưởng này là có thể config một cách global về theme giữa các `micro-app`.

Hoặc chúng ta có thể share một số biến `SASS` và `mixins` giữa các dev team với nhau. Nhược điểm của cách làm này là việc triển khai lặp đi lặp lại các phần UI, và tính toàn vẹn của các thiết kế phải được check và confirm cho mỗi `micro-app`.

- Làm sao để đảm bảo các team không bị xung đột CSS (override CSS của team khác)?

Có thể triển khai các `CSS scoping` thông qua các tên của `CSS selector`, dược đặt dựa trên tên cuả mỗi `micro-app`. Bằng cách đặt phần xử lí này vào `stitching layer` sẽ khiến việc develop nhanh hơn, nhưng sẽ làm cồng kềnh phần `stitching layer`.

Với nhiều library hoặc framework mà có thể có nhiều cách triển khai nữa. Trong trường hợp bạn xài React thì có thể tham khảo cách dùng `styled-components`, nghĩa là biến mỗi thành phần UI thành một component, không bao giờ sợ bị override CSS, có thể đọc thêm ở đây: [https://www.styled-components.com/docs/basics](https://www.styled-components.com/docs/basics).

- Làm sao để share `global information` giữa các micro-app

Đây là một vấn đề được quan tâm nhiều nhất trong kiến trúc `micro-frontends`, giải pháp tương đối dễ: HTML5 có khá nhiều tính năng mạnh mẽ mà phần lớn frontend developer không biết đến. Lấy ví dụ, có thể dùng **custom events** để share information giữa các micro-apps.

Hoặc không bạn có thể phát triển một store theo hướng tương tự như `Redux` để giao tiếp giữa các app với nhau.

- Nếu các micro-apps là standalone apps, làm sao để client-side routing?

Tuỳ thuộc vào mỗi design và mỗi cách implement. Tất cả các library và framework SPA hiện tại đều có phần routing khá mạnh mẽ dựa trên `browser history state`. Vấn đề ở đây là phần nào sẽ chịu trách nhiệm cho routing và khi nào?

Cách làm cuả tui hiện tại là tạo ra một `shared client router` nằm ở trên cùng (top-level) có nhiệm vụ điều phối tới các micro-apps bên trong. Phần routing của các level ở dưới sẽ do mỗi micro-app quyết định. Thí dụ chúng ta có phần định nghĩa route: `/content/:id`. `shared router` sẽ thực hiện định tuyến phần `/content` tới `ContentMicroApp`, sau đó thằng `ContentMicroApp` sẽ resolve cho phần `/:id` còn lại.

- Liệu có possible cho việc apply `Server-side Rendering` vào micro-frontends?

Server-side rendering là một vấn đề khá thốn. Nếu bạn đang xem xét sử dụng `iframes` để kết hợp các micro-apps thì nên quên serverside-rendering đi. Dùng `web components` cho `stitching task` không mạnh mẽ hơn iframes. Nhưng nếu mỗi micro-app có khả năng render phía server side thì phần `stitching layer` sẽ chỉ phải chịu trách nhiệm cho việc tiếp nhận HTML fragments từ phía server.

Đọc thêm về micro-frontends server-side rendering tại đây: [https://micro-frontends.org/#serverside-rendering--universal-rendering](https://micro-frontends.org/#serverside-rendering--universal-rendering)

Dựa vào các câu hỏi và các giải pháp khả dĩ đã đề cập ở phía trên, có thể tổng kết lại như sau:

**Client-side**
- Cách phối hợp (micro-app)
- Routing
- Sự cô lập và nhất quán của micro-apps
- Giap tiếp app-to-app
- Tính nhất quán UI của các micro-app

**Server-side**
- Server-side rendering
- Routing
- Quản lí dependecies

## Một kiến trúc linh hoạt, mãnh mẽ nhưng tối giản: microfe

![Architecture](https://cdn-images-1.medium.com/max/1600/1*PPBwPDargPYJY8G5B1WP0w.jpeg)

Đã tới phần được chờ đợi nhất trong bài viết :joy:. Các thành phần và yêu cầu cơ bản của kiến trúc micro frontends đã dần lộ diện.

Qua tất cả những vấn đề được đặt ra và cách giải quyết ở trên, tui đã bắt đầu phát triển một solution cho `micro-frontends` đặt tên là `microfe`. Ở đây tui sẽ mô tả mục tiêu thiết kế của project này bằng cách nêu tên những component chính một cách trừu tượng.

Đơn giản nên bắt đầu từ phía client, có 3 thành phần chủ chốt: `AppsManager`, `Loader`, `Router` và thêm một `MicroAppStore`.

![microfe](https://cdn-images-1.medium.com/max/1600/1*UufGRwX-NCeuQfcohrW6yQ.jpeg)

### App Manager

App Manager là phần `core` của client-side micro-app. Tính năng chính của AppsManager là tạo dependency tree. Khi tất cả dependencies của một micro-app được resolve xong, nó giúp khởi tạo micro-app.

### Loader

Một phần quan trọng khác của client-side micro-app là Loader. Nhiệm vụ của Loader là tìm và nạp những micro-app chưa được resolve từ phía server.

### Router

Như đã giới thiệu trong phần trên thì ta sẽ có một router on top. Nhiệm vụ của nó là định hướng tới một micro-app dựa vào pattern của URL. Ví dụ url có `/content/detail/13` thì Router sẽ dẫn tới `ContentMicroApp`, sau đó micro-app này sẽ lo phần còn lại đó là resolve `details/13`.

### MicroAppStore

Để giải quyết vấn đề giao tiếp app-to-app ở client-side, tui tạo ra `MicroAppStore` trong microfe. Tính năng của nó khá giống với `Redux`, với một khác biệt: nó có khả năng đồng bộ và phục hồi các `data structure` nếu thay đổi, giảm thời gian khai báo.

---

Phần ở phía server có vẻ sẽ phức tạp hơn trong các bước implement nhưng có cấu trúc đơn giản hơn client-side. Nó bao gồm 2 phần chính: `StitchingServer` và các `MicroAppServer`.

### MicroAppServer

![MicroAppServer](https://cdn-images-1.medium.com/max/1600/1*a7mbRuahRiOvQQI-yYe3IA.jpeg)

Chức năng tối thiểu của MicroAppServer có thể được tóm gọm trong hai từ là `init` và `serve`.

Khi MicroAppServer chạy, thứ đầu tiên nó cần làm là `init`, cụ thể là thực hiện register endpoint với `SticthingServer`, khai báo micro-app dependencies, type và URL schema của MicroAppServer. Tui nghĩ không cần đề cập tới phần `serve` vì không có gì đặt biệt cả (serve một web app qua network thôi).

### StitchingServer

![StichingServer](https://cdn-images-1.medium.com/max/1600/1*YARt2ca7edLB675_QfkkGA.jpeg)

StitchingServer cung cấp một điểm `register endpoint` cho các `MicroAppServers`. Khi một MicroAppServer thực hiện register chính nó tới StichingServer, StichingServer lưu lại những khai báo của MicroAppServer đó.

Sau đó, StitchingServer dùng các khai báo trước đó của MicroAppServer để resolve một MicroAppServer từ URL được user request.

Sau khi resolve một MicroAppServer và tất cả dependencies của nó tất cả những phần trong file CSS, JS and HTML sẽ được prefix với tên của MicroAppServer đó. Một bước bổ sung là thực hiện prefixing cho CSS selectors của các CSS trong MicroAppServer (như đã đề cập ở trên) để chặn việc xung đột CSS giữa các micro-app.

Vậy, nhiệm vụ chính của StitchingServer là: tổng hợp và trả về một trang HTML liền lạc từ các MicroAppServer (triển khai theo các khai báo của chúng).

## Một số framework khác cho triển khai micro frontends

Từ trước khi mà kiến trúc này được gọi là **micro frontends** vào năm 2016, khá nhiều công ty lớn đã thử giải quyết các bài toàn tương tự micro frontends, thí dụ như Facebook với kiến trúc [BigPipe](https://www.facebook.com/notes/facebook-engineering/bigpipe-pipelining-web-pages-for-high-performance/389414033919/) của họ. Với sự phát triển của front-end side ngày nay, ngày càng nhiều các công ty bỏ tiền bạc và công sức vào micro frontends hơn.

**Zalando** đã open-source [Project Mosaic](https://www.mosaic9.org/) - một giải pháp Microservices cho phía Frontend. Có thể nói `microfe` của tui và Project Mosaic có cách tiếp cận giống nhau, nhưng có một số khác biệt rõ rệt khi implement. Trong khi `microfe` phân tán các định nghĩa của các `route` ở khắp nơi để tăng tính độc lập của các micro-app, Project Mosaic thì tập trung các định nghĩa về route ở một nơi và thực hiện `layout definitions`. Bằng cách này, Project Mosaic có vẻ sẽ dễ dàng hơn để test và thực hiện `dynamic Layout generation`.

Có khá nhiều cách tiếp cận khác mà không cần tới server-side, như dùng iframe để render chả hạn, tất cả đều được chạy trên client-side. Một giải pháp khá là đơn giản mà không cần server structure hay sự tham gia của DevOps. Công việc có thể hoàn thành tốt bởi mình team front-end và tốt ít chi phí thời gian hơn.

Ngoài ra còn có một framework nữa cho micro frontends, [single-spa](https://single-spa.js.org/). Framework này dựa trên các `naming conventions` của mỗi app để resolve và load micro-app. Khá dễ dàng để nắm bắt ý tưởng và làm theo các pattern của framework này. Nếu bạn mới bắt đầu với `micro frontends` có thể thử qua thằng này. Nhược điểm của nó là bạn phải build mỗi `micro-app` theo hướng mà single-spa framework đặt ra, hơi thiếu linh động một chút.

**Một số tính năng được `single-spa` giới thiệu:**

- **Framework Freedom**: Cho phép bạn sử dụng nhiều js framework khác nhau trong một single-page application, split code theo tính năng: xài chung React, Vue, Angular, etc.
- **Lazy load application:** Tối ưu hoá tốc độ load web app bằng cách lazy load các module, các module sẽ chỉ được load khi cần tới và sẽ không load lặp những module đã load sẵn.
- **Front-end microservices**: Giúp kết hơp nhanh các micro-app nhỏ (mỗi app xài mỗi framework khác nhau cũng được), giúp scale up hệ thống nhanh chóng, đáp ứng nhanh requirement changes.

### Tổng kết

Dưới đây là link tới github repos của `micro-fe` được phát triển bởi tác giả bài viết là **Öner Zafer**:

- [micro-fe-registry](https://github.com/onerzafer/micro-fe-registry)
- [micro-fe](https://github.com/onerzafer/micro-fe)

Bài viết được dịch và phát triển từ bài của tác giả [Öner Zafer](https://hackernoon.com/@onerzafer) trên [Hackernoon](https://hackernoon.com/understanding-micro-frontends-b1c11585a297).