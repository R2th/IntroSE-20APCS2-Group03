Nếu bạn đang băn khoăn tìm kiếm cho mình một thư viện JavaScript hay ho thì bạn đã ghé đúng nơi rồi. Ở bài viết này, mình sẽ không nói về các công cụ JavaScript đã quá phổ biến mà chỉ chia sẻ về những viên ngọc quý ít được biết đến nhưng không được chú ý đúng mức trong hệ sinh thái JavaScript quá đông đúc.
![](https://images.viblo.asia/cd29628e-c45a-4e8f-95f2-b3b6c2ff9c6d.jpg)

Các công cụ mình sắp giới thiệu trong bài viết này, trong đó có một số là thư viện và một số là các frameworks. Tuy nhiên, hầu hết các công cụ này đều là những công nghệ mới nổi, mang tiềm năng to lớn, đang chờ được các bạn khai thác. Không nói vòng vo nữa cùng tìm hiểu xem là công cụ nào được xướng tên thôi nào! 
### 1. Deno js
![](https://images.viblo.asia/8dfefb9c-c2d9-4f74-be10-85f7a1127cd2.jpg)
Vào năm 2018, Ryan Dahl (Cha đẻ của Node) trong một buổi thuyết trình về “10 Things I Regret About Node.js”, anh ấy giải thích Nodejs đã phát triển không tốt như thế nào.
Vì vậy, anh ấy bắt đầu làm việc và một công cụ được cải thiện có tên Deno.js ra đời. Đúng vậy, Deno là phép đảo chữ của Node và về cơ bản là tập hợp tất cả những gì mà Ryan đã bỏ lỡ để xây dựng trong Node.js.

Một trong những tính năng nổi bật của Deno (trái ngược với Nodejs) là các giao thức bảo mật nâng cao. Khi bạn sử dụng, Deno sẽ giới hạn quyền truy cập của ứng dụng, nếu không được cấp quyền, nó không thể truy cập file, network hay environment. Muốn thay đổi giới hạn này phải sử dụng các command-line arguments.

Và một điều tuyệt vời ở Deno là được tích hợp sẵn TypeScript mà không phải cài đặt thêm công cụ bên ngoài nào cả. Hỗ trợ song song cả .ts và .js khi viết code. Và thực thi vô cùng đơn giản với câu lệnh `deno run`.

Deno import các thư viện thông qua URL, giảm sự cồng kềnh của node_modules trên Node JS. Đây cũng là nhược điểm của Deno vì số lượng thư viện mặc định vẫn còn chưa nhiều, chưa đa dạng bằng Node, sẽ cần 1 thời gian nữa để cộng đồng contribute để ngày một tốt lên.

Đây là một ví dụ để import 1 package Deno:

`import { assertEquals } from “https://deno.land/std/testing/asserts.ts";`

Khi nào bạn cảm thấy NPM sẽ quá rắc rối cho một dự án nhất định thì bạn hãy thử trải nghiệm với Deno nhé.
### 2. Svelte
![](https://images.viblo.asia/00cd6332-134a-4ef8-b797-aad7d3447223.jpg)
Svelte là một component framework - giống như React hoặc Vue. Điều đặc biệt, Svelte là một compile-time framework  và không cần bất kỳ framework runtime cụ thể nào. Nó có kích thước nhỏ nhất trong số tất cả các framework. Svelte thực hiện việc DOM renderring thông qua reactive programming, cho kết quả nhanh hơn so với Virtual DOM ở hầu hết các lần thực hiện. Kết quả là, Svelte cho quá trình render nhanh nhất trong số tất cả các framework.

Svelte thật khá là nhỏ gọn và đơn giản. Để bắt đầu, bạn chỉ cần chạy các lệnh sau trong terminal:
```
# Clone project template
npx degit sveltejs/template PROJECT_NAME
cd PROJECT_NAME

# Install packages
npm install

# Start dev server
npm run dev
```

Svelte là một lựa chọn tốt nếu các bạn đang có ý định xây dựng một project nhỏ (dạng component hoặc web app đơn giản).
### 3. Ext JS
![](https://images.viblo.asia/2638d0e2-ce79-46c4-b633-8f7590a1c6a1.jpg)
Ext Js (Extended Javascript) là một framework Javascript thuần túy để xây dựng các ứng dụng Web tương tác bằng cách sử dụng các kỹ thuật như Ajax, DHTML và DOM. Ext JS có khả năng tương tác với jQuery and Prototype. Nó được coi là framework toàn diện nhất để xây dựng một ứng dụng we cross-platform với nhiều tính tương tác.

Các bài viết cũng như sách vở về Ext Js còn ít và không phong phú bằng các thư viện Javascript khác. Cách tốt nhất để học Ext Js là bạn hãy [đến đây](http://docs.sencha.com/ext-js/4-1/) để tham khảo các tài liệu hướng dẫn.
### 4. Gatsby JS
![](https://images.viblo.asia/5e069bcb-f566-4c51-97d6-b6ea2fbb0cd6.jpg)
Gatsby là một “static site generator” được build từ core ReactJS.
Là một framework để tạo web tĩnh, tối ưu tốc độ và bảo mật cho website. Việc chuyển qua lại giữa các trang trong website cũng rất nhanh do tất cả các style, html và javascript sẽ được load trong lần tải đầu tiên, nội dung được tải về dưới dạng JSON và hiển thị lên, không cần load lại toàn bộ trang khi bấm chuyển trang.

Bên cạnh đó vì Gatsby.js chuyên để tạo static website, nên việc triển khai hệ thống bình luận và tìm kiếm đều phải dựa vào service bên thứ 3 như: Disqus, Facebook…

Nhưng nếu bạn ưu tiên về tốc độ và hiệu suất, nền tảng hỗ trợ tốt, SEO Optimizer và cuối cùng là PWA(Progressive Web Apps) thì hãy trải nghệm qua Gatsby nha.
### 5. Polymer
![](https://images.viblo.asia/090551a9-3946-4bdd-87a8-bb4808c959e2.jpg)
Polymer là một thư viện JS được phát triển bởi Google và được sử dụng trong Google Earth và Youtube. Nó sử dụng phần bổ trợ web để xây dựng những ứng dụng web và cung cấp khả năng phối kết hợp JS, CSS và HTML như một phần tử tùy biến trong khi nâng tầm những công nghệ gốc trong trình duyệt hơn là dựa dẫm vào các thư viện JS.

Một trong những tính năng quan trọng của Polymer là Shadow DOM. Nó cung cấp polyfills (web component specifications) để tạo ra các phần tử tùy biến và tái sử dụng. Các lập trình viên tái sử dụng các component -> không phải thêm thẻ div chỉ để đáp ứng yêu cầu thiết kế.
### 6. Bulma CSS
![](https://images.viblo.asia/b29dede3-465e-44ab-b1f0-279f794c370a.jpg)
Bulma là một open source (mã nguồn mở) và framework miễn phí rất tốt về mặt tiết kiệm thời gian, công sức và ngày càng trở nên phổ biến, bởi nó rất đơn giản để học và sử dụng. Nó được xây dựng dựa trên Flexbox và thêm layout 2 chiều (2-dimensional).

Đặc biệt, Bulma hoàn toàn là CSS, không có JavaScript, bạn chỉ cần bao gồm một tệp .css trong dự án của mình để bắt đầu, không yêu cầu .js. Bulma chứa các UI component tuyệt vời như tab, navigation bar (thanh điều hướng), box, panel và hơn thế, framework này được thiết kế để cung cấp cho bạn một giao diện người dùng rõ ràng và hấp dẫn.
### 7. Tachyons CSS
![](https://images.viblo.asia/24b0704a-b5dd-42f5-aef9-e7581ce8a025.jpg)
Tachyons là một bộ công cụ CSS nhẹ nhưng toàn diện dựa trên kiến trúc ưu tiên thiết bị di động. Nó giúp bạn xây dựng các ứng dụng web có độ phản hồi cao với nỗ lực mã hóa tối thiểu, đặc biệt là trên mặt trận CSS. Toàn bộ thư viện có trọng lượng không quá 14kb! Vì vậy, ngay cả sau khi bạn thêm hình ảnh, các công cụ JS nhẹ hơn khác, bạn vẫn hoàn toàn có thể giữ kích thước trang web của mình dưới 100kb.

Để sử dụng thư viện Tachyons, các bạn tải [tại đây](https://github.com/tachyons-css/tachyons).

Cảm ơn bạn đã dành thời gian đọc bài viết!

**Tham khảo**: https://medium.com/swlh/8-interesting-javascript-ui-and-css-tools-you-must-try-in-2021-446884728ff5