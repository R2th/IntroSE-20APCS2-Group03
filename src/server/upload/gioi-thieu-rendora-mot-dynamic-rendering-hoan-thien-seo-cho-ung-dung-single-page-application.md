# Đâu là các giải pháp SEO cho Single Page Application thường dùng?
Ứng dụng SPA (Single-page-application) kể từ khi ra đời đã giúp cho tất cả các developer trên thế giới này vô vàn những lợi ích tốt đẹp.
Nó giúp chúng ta sáng tạo ra những giao diện phản ứng nhanh, giàu tính năng, nhanh chóng mà tạo lên những trải nghiệm tuyệt vời với người dùng.
Tuy nhiên nó có một nhược điểm khiến chúng ta rất quan ngại khi một số dự án yêu cầu phải tốt cho SEO thì SPA gần như khó thể đáp ứng được với một đội ngũ chưa có kinh nghiệm này.
Những biện pháp phổ biến được đề cập tới suốt thời gian vừa qua là: “Làm sao để SEO cho ứng dụng SPA”. Các biện pháp đó có dễ thực hiện không? 
Và sau đây tôi sẽ đánh giá qua những ưu và nhược điểm khi áp dụng một số giải pháp hiện này trong việc phát triển SPA cho SEO.

Đầu tiên phải kể tên một số giải pháp phổ biến như: Client-Side-Rendering(CSR), Server-side-rendering(SSR), Pre-rendering và Isomorphic rendering.
Chỉ từng ấy giải pháp thôi cũng khiến đội ngũ phát triển của chúng ta phải đâu đầu lựa chọn ra một giải pháp tốt nhất cho dự án của mình.

Do những giải pháp này đã được đề cập nhiều trong nhiều bài viết trên cộng đồng, tôi cũng đã tìm hiểu về những giải pháp trên và trong phạm vi bài viết này tôi sẽ đưa ra một số phân tích về ưu nhược điểm mà khi áp dụng các phương pháp này sẽ gặp phải trong quá trình phát triển. Xem đâu là lựa chọn tốt nhất cho dự án của mình. Và đi cụ thể hơn vào giải pháp chưa được đề cập nhiều trên cộng đồng nhưng lại là một giải pháp rất hoàn thiện. Những tài liệu về những giải pháp trên được chia sẻ rất nhiều lên tôi sẽ không đi sâu vào giải thích chi tiết.
## Truyền thống với Server-side-rendering:
![](https://images.viblo.asia/4ff551b8-f8b8-432e-9b46-b87339fa8aa0.jpg)

Đây là một trong những cách phổ biến mà các developer chúng ta thường làm trước khi các framework về SPA xuất hiện. 
Chúng ta thực thiện render ra html ngay trên Server Backend với các ngôn ngữ như: PHP, NodeJS, Ruby, Python, Java,…
Đối với các ứng dụng SPA, thì thực hiện SSR phụ thuộc vào service chạy Nodejs có các thư viện  để thực hiện việc rendering html cho client.

Một số thư viện phổ biến như: **Angular Universal, Vuejs(Nuxt.js), React (Redux, Next.js )...**

![](https://images.viblo.asia/55a754e3-e2d5-4249-b31d-32c40d1104ea.jpg)
### Ưu điểm:
- Các trang web load html, css, javacript với tốc độ nhanh. Đặc biệt tốt cho tải trang lần đầu.
- Rất tốt cho SEO
- Có thể bổ sung Ajax cho các tính năng động và cập nhật dữ liệu mới mà không phải load lại trang.
- Rất dễ phát triển, xây dựng skill của đội ngũ.

### Nhược điểm.
- Và việc xây dựng triển khai cũng không dễ dàng theo cách SSR truyền thống trước đây.
- Phải thay đổi kiến trúc code từ cả front-end và backend. Tạo nên nhiều yếu tố không thống nhất ảnh hưởng đến quá trình phát triển.
- Phải sử dụng thêm thư viện mới làm giảm hiệu suất ứng dụng.

## Client-Side-Rendering:
![](https://images.viblo.asia/01e7ac18-d026-4194-80ce-e137b582b340.jpg)

Đặc trưng của ứng dụng SPA trái ngược hoàn toàn với  Server-side-rendering.
Máy khách sẽ chỉ nhận những gói dữ liệu rất nhỏ từ api server trả về và sử dụng javacript trên máy khách để tải giao diện html mới dựa trên dự liệu mới nhận được. Server không còn phải render ra html trả về cho Client nữa.

### Ưu điểm:
- Tốc độ phản ứng của trang web là rất nhanh, tăng trải nghiệm người dùng.
- Nó cung cấp các thư viện và component có thể tái sử dụng khiến cho tốc độ phát triển ứng dụng nhanh chóng và nhiều chức năng.
- Có thể mở rộng nhiều chiều, thích nghi với nhiều giải pháp, công nghệ mới hiện nay.
- Đa ứng dụng, có thể phát triển cho cả Web, mobile và desktop. Viết một mà chạy ở nhiều nơi. Tiết kiệm chi phí, thời gian cho phát triển đa nền tảng.

### Nhược điểm:
- Không tốt cho SEO. Hiện giờ khả năng đọc Javascript của Google, Bing, Yahoo là chưa thực sự giải quyết được vấn đề SEO cho ứng dụng SPA. Những dự án cần SEO thì đây chắc chắn không phải là lựa chọn của họ.
- Phải chia đội ngũ ra thành nhiều skill và cần team work nhiều hơn. Quá trình phát triển trở lên phức tạp và khó khăn hơn.
- Việc triển khai SEO cho SPA không phải là việc dễ dàng.

## Pre-rendering:
![](https://images.viblo.asia/6c2d25f2-169a-4bc5-a996-43e1912fc02c.jpg)
Đây là câu trả lời đầu tiên dành cho những ứng dụng SPA đòi hỏi về SEO.
Cụ thể có 2 cách triển khai phương pháp này:
1: Sử dụng dịch vụ mã nguồn bên thứ 3 để tích hợp vào server. Bên thứ 3 họ sẽ Cached lại html load được trên ứng dụng SPA để trả về trang đó cho crawler (bọ tìm kiếm).  Và sử dụng CDN để phân phối nội dung toàn cầu.
Một số dịch vụ phổ biến: **prerender.cloud, prerender.io, ostr.io...**
### Ưu điểm:
- Đây là một giải pháp dễ dàng tích hợp và sử dụng.
- Không gây ảnh hưởng nhiều đến  quá trình phát triển của dự án
- Rất tốt cho startup với chi phí tích hợp tối ưu.

### Nhược điểm:
- Do bên thứ 3 cached lại dữ liệu html thành nội dung tĩnh và phân phối lại cho bọ tìm kiếm. Nên những hay đổi mới nhất từ ứng dụng sẽ phải đợi đẻ được cập nhật và thêm mới.
- Phụ thuộc vào độ ổn định của dịch vụiêng
- Chi phí sẽ tăng lên dựa và số trang được cached và tần xuất cập nhật mới dữ liệu.
- Do độ trễ trong cập nhật nội dung tĩnh sẽ ảnh hưởng đến người dùng.
- Không thích hợp cho 1 ứng dụng lớn, liên tục cập nhật, và cũng không phải là lựa chọn lâu dài. Nếu sau này thay đổi sẽ là cực kỳ khó khăn khi mà ứng dụng đã lớn dần.

2. Sử dụng mã nguồn mở Pre-rendering tạo nên 1 service riêng để cached lại trang html.
Giải pháp này thì không được khuyên dùng khi mà sự phức tạp và kiểm soát hiệu quả service này trở lên thực sự khó khăn hơn rất nhiều.

## Dynamic renderering:
Đây có lẽ là một giải pháp rất hay mà nhiều nhà phát triển sẽ hướng đến. Và đây cũng là giải pháp mà Google đề xuất và ủng hộ trong tương lai trước khi họ tìm ra cách để  crawler của họ có thể thu thập được dữ liệu từ JavaScript.

Cụ thể: Họ sẽ ứng dụng một service sử dụng ***Pupperteer*** là  một thư viện Nodejs cung cấp API cấp cao để kiểm soát Chrome hoặc Chromium qua Giao thức DevTools. Puppeteer chạy Headless Browser theo mặc định, nhưng có thể được định cấu hình để chạy Chrome hoặc Chromium đầy đủ (không đầu).
Việc sử dụng API này giúp các nhà phát triển kiểm soát được những thứ chạy ở Brower bao gồm cả việc render trước dữ liệu html và trả lại cho client và clawler theo cấu hình tùy trình.
Ngoài ra Google còn giới thiệu đến một giải pháp mà họ cung cấp một mã nguồn mở mang tên là: Rendertron.

**Rendertron** là một giải pháp kết xuất Headless Chrome được thiết kế để kết xuất và nối tiếp các trang web một cách nhanh chóng. nó được xây dựng trên các API do Puppeteer cung cấp.

**Rendertron** được thiết kế để cho phép Ứng dụng web lũy tiến (PWA) của bạn cung cấp nội dung chính xác cho bất kỳ bot nào không kết xuất hoặc thực thi JavaScript. Rendertron chạy như một máy chủ HTTP độc lập. Rendertron kết xuất các trang được yêu cầu bằng Chrome không đầu, tự động phát hiện khi PWA của bạn đã tải xong và tuần tự hóa phản hồi trở lại yêu cầu ban đầu. Để sử dụng Rendertron, ứng dụng của bạn định cấu hình phần mềm trung gian để xác định xem có nên ủy quyền một yêu cầu tới Rendertron hay không. Rendertron tương thích với tất cả các công nghệ phía máy khách, bao gồm các thành phần web (web components).

Đây là câu trả lời thật sự có giá trị cho nhà phát triển khi mà nó khắc phục được các nhược điểm   mà những giải pháp trên gặp phải, chưa thực sự hoàn thiện.

### Ưu điểm:
- Là thư viện do google phát triển lên chắc chắn được sự ủng hộ từ cộng đồng, được cập nhật mới nhất.
- Khắc phục việc thay đổi code trên backend và client làm khó khăn trong quá trình phát triển, và thay đổi sau này.
- Việc tùy chỉnh cấu hình và sử dụng api của Puppeteer giúp cho ứng dụng tối ưu, dễ theo dõi được hiệu suất, giảm chịu tải cho cả server lẫn client.
- Deploy dễ dàng với document. Nó tích hợp với Docker và các nền tảng Cloud.
- Nó rất hoàn thiện đến thời điểm này.
 
### Nhược điểm:
- Cần service riêng để chạy và yêu cầu máy chủ phải là nodejs.
- Khó khăn khi đội ngũ phát triển cần phải làm chủ được API của Puppeteer.
- Với các giải pháp dùng  Puppeteer và **Headless Browser** thì hiệu suất cũng chưa phải tối ưu.
- Cần thêm 1 tấn services rất nhiều để xử lý các yêu cầu nếu ứng dụng mở rộng. Làm tăng phức tạp kiến trúc hệ thống. 

## Rendora
Chúng ta đã đi qua 1 trong những giải pháp phổ biến nhất được đề xuất để ứng dụng cho việc SEO trên SPA. Qua 1 loạt những phân tích kể trên tưởng chừng như Rendertron đã là 1 giải pháp hoàn hảo nhất mà chúng ta đang tìm kiếm.
Tuy nhiên tôi cũng không muốn các bạn phải chờ lâu và muốn giới thiệu đến những nhà phát triển một giải pháp không dễ được khám phá trên các diễn dàn. Và tôi nghĩ đây cũng nên là một lựa chọn cho những dự án muốn sự khả thì và bước đi dễ dàng hơn nhiều nhưng biện pháp kể trên.
Và đó là **Rendora**. Nghe rất giống người anh em song sinh Rendertron kể trên. Đôi khi tôi cũng tưởng một mà hai như mới ttìm hiểu nó.

**Rendora** là một trình kết xuất động (**Dynamic renderer**) để cung cấp kết xuất phía máy chủ có cấu hình không cấu hình(zero-configuration server-side), chủ yếu cho các trình thu thập dữ liệu web để cải thiện dễ dàng SEO cho các trang web được phát triển trong các khung Javascript hiện đại như React.js, Vue.js, Angular.js, v.v ... Rendora hoạt động hoàn toàn độc lập với ngăn xếp frontend và backend của bạn.

**Dynamic renderer :** Kết xuất động có nghĩa là máy chủ cung cấp HTML kết xuất phía máy chủ cho các trình thu thập dữ liệu web như GoogleBot và BingBot, đồng thời cung cấp HTML ban đầu điển hình cho người dùng thông thường để được hiển thị ở phía máy khách.
![](https://images.viblo.asia/17a6c655-f71f-4ff4-99ed-7052098aa6b7.jpg)

**Rendora** có thể được xem như một máy chủ **reverse HTTP proxy** nằm giữa máy chủ phụ trợ của bạn (ví dụ: Node.js / Express.js, Python / Django, v.v.) và có khả năng máy chủ proxy frontend của bạn (ví dụ nginx, traefik, apache, v.v. ..) hoặc thậm chí trực tiếp ra thế giới bên ngoài mà thực tế không có gì ngoài việc vận chuyển các yêu cầu và phản hồi như chúng ngoại trừ khi nó phát hiện các yêu cầu được liệt kê trong danh sách trắng theo cấu hình. Trong trường hợp đó, Rendora hướng dẫn một phiên bản **Headless Chrome** để yêu cầu và hiển thị trang tương ứng và sau đó trả lại trang được hiển thị phía máy chủ cho khách hàng (ví dụ: máy chủ proxy frontend hoặc bên ngoài). Chức năng đơn giản này làm cho Rendora trở thành một trình kết xuất động mạnh mẽ mà không thực sự thay đổi bất cứ điều gì trong cả code Frontend và code Backend.
![](https://images.viblo.asia/be4266e2-35d3-45b4-9fa3-22dea97bdd0c.jpg)

**Những tính năng mà Rendora có được:**

- Không phải thay đổi code từ back-end và front-end: Điều khó khăn nhất phải đối mặt khi phát triển.
- Cung cấp bộ lọc xịn xò cho các tác nhân và đường
- Được Bung lụa trên Golang. Tốc độ cực nhanh, hỗ trợ sử lý đồng thời mạnh mẽ. Yên tâm sử dụng với hiệu suất cao.
- Hỗ trợ nhiều chiến lược lưu đệm (cái này của pre-rendering). Tăng hiệu suất service khi đáp ứng yêu cầu từ client và clawler.
- Hỗ trợ mạnh mẽ cho ứng dụng bất đồng bộ.
- Có hỗ trợ công cụ theo dõi và giám sát hệ thống trực quan mã nguồn mở (Prometheus metrics
).
- Tùy chọn hệ thống với YAML, TOML, JSON.
- Hỗ trợ container, 

**Rendora hoạt động như thế nào?**

Rendora mặc định đang nghe cổng 3001 nhưng có thể được thay đổi bằng tệp cấu hình; đối với mọi yêu cầu đến từ máy chủ dockerngoại vi hoặc thế giới bên ngoài, có một số kiểm tra hoặc bộ lọc được kiểm tra đối với các tiêu đề và / hoặc đường dẫn theo tệp cấu hình của Rendora để xác định xem Rendora có nên vượt qua HTML ban đầu được trả về từ máy chủ phụ trợ hay không sử dụng Chrome không đầu để cung cấp HTML kết xuất phía máy chủ. Để cụ thể hơn, cho mỗi yêu cầu có 2 đường dẫn:

Nếu yêu cầu được đưa vào danh sách trắng làm ứng cử viên cho SSR (nghĩa là yêu cầu GET vượt qua tất cả các bộ lọc đường dẫn và tác nhân người dùng), Rendora sẽ hướng dẫn đối tượng Chrome không đầu để yêu cầu trang tương ứng, kết xuất nó và trả về phản hồi có chứa phía máy chủ cuối cùng kết xuất HTML. Bạn thường chỉ muốn đưa vào danh sách trắng các trình thu thập dữ liệu web như GoogleBot, BingBot, v.v ...

Nếu yêu cầu không được đưa vào danh sách trắng (nghĩa là yêu cầu không phải là yêu cầu GET hoặc không vượt qua bất kỳ bộ lọc nào), Rendora sẽ chỉ hoạt động như một proxy HTTP ngược trong suốt và chỉ truyền tải các yêu cầu và phản hồi như hiện tại. Bạn thường muốn đưa vào danh sách đen những người dùng thực để trả lại HTML được hiển thị phía máy khách thông thường đến từ máy chủ phụ trợ cho họ.

**Sự khác biệt giữa Rendora và server-side-rendering là gì?**

**Server-side-rendering** sử dung thêm thư viện ở cả front-end và back-end làm thay đổi cách phát triển dự án. Có thể yêu cầu server phải là NodeJS là lựa chọn mở rộng trở lên khỏ khăn với ngôn ngữ khác. Server chịu tải để render HTML làm giảm hiệu suất ứng dụng.

Rendora là 1 service proxy như Nginx, trafix đứng trung gian lọc các yêu cầu dựa theo cấu hình để linh hoạt hơn trong việc trả kết quả cho client hay clawler. Không bị giới hạn bởi công nghệ của front-end hay back-end. Nó không làm ảnh hưởng đến code của hệ thống. Và không làm ảnh hưởng đến hiệu suất xử lý của cả hai.

**Sự khác biệt giữa Rendora và Pre-rendering là gì?**

**Pre-rendering** là dịch vụ thuê trả phí bên thứ 3 tích hợp, sử dụng Headless Chrome và Cached để lưu trữ html static và trả lại cho clawler khi có yêu cầu.

**Rendora** là mã nguồn mở sử dụng Headless Chrome và Cached hoàn toàn miễn phí với hiệu suất và khả năng tùy chỉnh linh hoạt đáp ứng được các yêu cầu như 1 dịch vụ Pre-rendering. Chủ động trong việc kiểm soát hiệu suất của ứng dụng cả backend và frontend mà không phải thay đổi code.

**Sự khác biệt giữa Rendora và Puppeteer là gì?**
Puppeteer là một thư viện Node.js tuyệt vời cung cấp API cấp cao chung để kiểm soát Headless Chrome. Mặt khác, Rendora là một trình kết xuất động hoạt động như một proxy HTTP ngược được đặt trước máy chủ của bạn để cung cấp kết xuất phía máy chủ chủ yếu cho các trình thu thập dữ liệu web để dễ dàng cải thiện SEO.

Điều này cho thấy tốt độ xử lý các yêu cầu kết xuất tối ưu hơn Puppeteer cả về tốc độ và hiệu suất.

**Sự khác biệt giữa Rendora và Rendertron là gì?**

**Rendertron** có thể so sánh với **Rendora** theo nghĩa là cả hai đều nhắm đến việc cung cấp SSR bằng Headless Chrome; tuy nhiên có nhiều sự khác biệt có thể khiến Rendora trở thành lựa chọn tốt hơn nhiều:

**1- Kiến trúc:** Rendertron là một máy chủ HTTP trả lại HTML của SSR cho máy khách. Điều đó có nghĩa là máy chủ của bạn phải chứa mã cần thiết để lọc các yêu cầu và yêu cầu Rendertron cung cấp HTML SSR'ed và sau đó trả lại cho máy khách ban đầu. Rendora thực hiện tất cả những điều đó một cách tự động bằng cách hoạt động như một proxy HTTP ngược trước phần server của bạn.

**2- Bộ nhớ đệm:** Rendora có thể được cấu hình để sử dụng lưu trữ cục bộ nội bộ hoặc Redis để lưu trữ HTML của SSR. Điều này mang điều hiệu suất và khả năng mở rộng cao, tiết kiệm chi phí.

**3- Phát triển:** Rendertron được phát triển trong Node.js trong khi Rendora là một nhị phân duy nhất được viết bằng Golang.

**4- API và số liệu:** Rendora cung cấp số liệu Prometheus về độ trễ SSR và số lượng SSR'ed và tổng số yêu cầu. Hơn nữa, Rendora cung cấp endpoind kết xuất JSON có chứa body, status và headers của phản hồi SSR bằng Headless Chrome.

**5- Việc cài đặt và sử dụng:** dễ dàng hơn nhiều so với rendertron phải áp dụng Puppeteer.

Với những so sánh và lợi ích kể trên tôi tin chắc rằng các bạn sẽ sớm tìm được cho mình giải pháp tối ưu nhất.

Trong phạm vi bài viết này tôi không đi sâu vào những dòng code mà chỉ phân tích những phương pháp mà bản thân đã tìm hiểu để hỗ trợ các bạn tìm ra cho mình lời giải sớm nhất cho bài toán của mình. Rồi từ đó tiếp tục đào sâu và thử nghiệm thực tiễn chứng thực kết quả. Rất mong sau bài viết này nhận được những chia sẽ đóng góp của các bạn để chúng ta có thêm nhưng giải pháp tối ưu nhất trên mỗi dự án của mình.

Trong quá trình tìm hiểu còn gặp nhiều thiếu sót rất mong nhận được sự góp ý từ phía độc giả chia sẻ kinh nghiệm của mình.

## Nguồn tham khảo:
**Rendora:**

https://github.com/rendora/rendora

https://hashnode.com/post/instantly-solving-seo-and-providing-ssr-for-modern-javascript-websites-independently-of-frontend-and-backend-stacks-cjpuy274b01br3zs1zr46awfz

**Rendertron**:

https://itnext.io/using-rendertron-in-kubernetes-for-spa-seo-39055567c745

https://github.com/GoogleChrome/rendertron#auto-detecting-loading-function

https://angularfirebase.com/lessons/angular-6-universal-ssr-prerendering-firebase-hosting/#Prerendering-vs-Server-Side-Rendering-vs-Rendertron

**Puppeteer vs Headless Chrome:**

https://github.com/GoogleChrome/puppeteer

https://developers.google.com/web/updates/2017/04/headless-chrome

**Pre-rendering**

https://medium.com/js-dojo/is-my-single-page-app-seo-friendly-be2c827f1c38
https://prerender.io/
https://ostr.io/info/prerendering
https://www.prerender.cloud/

**Server-side-rendering vs Client-Side-Rendering:**

https://medium.com/@benjburkholder/javascript-seo-server-side-rendering-vs-client-side-rendering-bc06b8ca2383

https://nextjs.org/

**Isomorphic rendering:**

https://medium.com/airbnb-engineering/isomorphic-javascript-the-future-of-web-apps-10882b7a2ebc