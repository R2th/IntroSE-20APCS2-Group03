# Giới thiệu
Dạo này, mình đang tìm hiểu về Next.js, một framework giúp giải quyết vấn đề Server Side Rendering khi code với React. 
Next.js có rất nhiều điều hay ho đáng để học tập, mặt khác nó cũng rất phù hợp để triển khai các sản phẩm yêu cầu SEO như trang `Viblo` này chẳng hạn. :D

Trên tinh thần đó, mình dịch một bài viết trên Medium được khá nhiều lập trình viên quan tâm về chủ đề này. Mời các bạn cùng tìm hiểu. 
[Why I chose React + Next.js for my next website instead of Vue or Angular](https://medium.freecodecamp.org/use-react-with-next-js-framework-and-how-it-made-my-life-easier-4280b643451)

====

Đây không phải bài viết so sánh React, Vue hay Angular, vì chúng ta đã có khá nhiều bài viết về chủ đề này rồi. Mọi người đều có những sự lựa chọn riêng cho mình. Tôi thì thích sử dụng React hơn các thư viện hay framework khác để xây dựng giao diện cho website. Và sau đó, tôi giải thích tại sao, bạn cũng có thể sẽ chuyển sang dùng React nếu bạn chưa từng sử dụng nó.

Một vài tháng trước đây, tôi đang tìm một boilerplate hay starter kit cho React. Tôi khao khát tìm được một điều gì đó đơn giản và độc lập. Sau một thời gian dài tìm kiếm và tôi đã tìm thấy thứ tôi cần. Nó là một framework, được gọi là Next.js.

Nó có rất nhiều star trên [github](https://github.com/zeit/next.js/) , đó là một điểm cộng lớn đối với tôi. Điều đó có nghĩa là nó có thể có tương lai và một cộng động bạn có thể dựa vào khi cần giúp đỡ. 

Ngay phía trên của README file bạn sẽ tìm thấy đường dần [nextjs.org/learn](https://nextjs.org/learn). Đó là hướng dẫn ngắn dạy bạn làm thế nào đế sử dụng Next.js trong khoảng 1 giờ. Tôi không nghĩ đó là một lời giới thiệu đơn giản, bạn có thể làm theo hướng dẫn và bắt đầu xây dựng một ứng dụng. Điều đó thật là awesome!

# Tại sao lại là Next.js ?

![](https://images.viblo.asia/05ed1d03-7e2f-487d-a09b-7e77b142090b.png)

Tôi thấy Next.js đơn giản và hiệu quả hơn các thư viện hay framework khác. 

[Create React App](https://github.com/facebook/create-react-app) có rất nhiều star trên GitHub và hứa hẹn không cần config gì cả. Vì vậy nhìn nó rất đơn giản. Bạn cần học về client routing, page layout, .. nhưng không đề cập tới Server Side Rendering. 

Không giống với Next.js, bạn sẽ yêu thích làm việc với Next.js chỉ trong vòng 1 giờ. Ngày càng có nhiều người sử dụng Vue, ngay cả khi nó vẫn thua kém React và Angular ở một vài khía cạnh. Bởi vì bạn có thể làm được nhiều nhất trong thời gian ngắn nhất. Với tôi, Next.js đã khép lại khoảng cách React với Vue, và React trở thành sự lựa chọn hàng đầu. 

#  Vue dường như là một lựa chọn thay thế tốt, vậy còn Angular ?

Tất cả đều là nằm trong top các framework, với sự hỗ trợ tuyệt vời,  hiệu năng tốt và đề có bằng tương lại sáng. 
Nhưng tôi chọn React kết hợp với Next.js

# Vue

Tôi đã luôn coi [Vue](https://github.com/vuejs/vue) là ngôn ngữ phù hợp cho việc bắt đầu. Nhưng React kết hợp với Next.js thực sự cũng rất dễ dàng (chỉ trong vòng 1 giờ như phần trên tôi nói).

Công bằng mà nói, React cũng không khó để bắt đầu. Nó là `một con đường dốc nhưng bạn được trả tiền ở phía cuối con đường`. 
Hãy xem xét điều này, React trường thành hơn và đáng tin cậy hơn và được hỗ trợ bởi cộng đồng lớn như Facebook. 

# Angular 

[Angular](https://github.com/angular/angular) nghiêm túc mà nói là một framework trưởng thành trong đầu tôi, nhưng tôi không chọn nó. Đơn giản vì tôi không thích nó. 

Mặc dù Typescript là một lựa chọn nhưng bạn buộc phải dùng nó. Và toàn bộ framework dường như quá phức tạp mà không có lý do rõ ràng. Điều tồi tệ nhất đối với tôi là, tôi không tìm thấy lợi thế nào để tôi đánh đổi với việc  những quy tắc này và những rắc dỗi cần trải qua. 

# Các tính năng của Next.js

Dưới đây là các tính năng tuyệt vời của Next.js, được lấy từ trang [nextjs.org/learn](https://nextjs.org/learn):
- Mặc định là Server Side Rendering
- Tự động phân chia code để load trang nhanh hơn 
- Client side routing rất đơn giản (với nền tảng là page)
- Hỗ trợ Webpack môi trường dev hỗ trợ [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)
- Có thể cài đặt với Express hay bất cứ Node.js HTTP server nào
- Có thể customizable với  Babel and Webpack configurations của bạn

Hãy để tôi giải thích một chút các tính năng năng  này.

Ứng dụng được chia thành nhiều phần, server render và kết quả là: tốc độ load trang rất nhanh.
SEO hộ trợ cho các công cụ tìm kiếm, không hiển thị ở Client browser. 

Giải pháp Route và Webpack đã được tự động xử lý. Sau đó, tất cả những thay đổi sẽ được HMR cập nhật, giúp bạn tiết kiệm thời gian phát triển. Cuối cùng là cải thiện trải nghiệm lập trình. 

# Làm thế nào nó lại khiến vấn đề trở lên đơn giản như vậy 

Bất cứ khi nào tôi bắt đầu một project mới, tôi phải cài đặt những thư viện cần thiết và các đoạn script để mọi thứ hoạt động. Tôi phải làm một vài thứ như: cài đặt node-sass, cài đặt watchers, viết các npm scripts, ...

Trước khi bắt đầu code, tôi có hàng tá những thư viện cần thiết. Next.js nó có thể giúp tôi bỏ qua những công việc này và tôi có thể bắt đầu công việc chỉ trong một vài phút. 

## Styling
Next.js đến với bộ hỗ trợ CSS gọi là styled-jsx. Tôi phải thừa nhận tôi đã không sử dụng nó cho đến khi gần đây, vì nó không thể cạnh tranh được với các giải pháp tương tự khác như styled-component hay jss. Nhưng gần đây họ release version 2, đó là sự thay đổi rất nhiều tiềm năng lớn hơn so với version 1.

Đây là một vài tính năng họ được ra: 
- Hỗ trợ tất cả các CSS
- Kích thước chỉ 3kb (gzipped, từ  12kb)
- Đầy đủ các iolation: Selectors, animations, keyframes, 
- Tự động cập nhật các tiền tố CSS
- Transpilation rất nhanh, nhẹ và hiệu quả
- Hiệu năng cao khi runtime-CSS-injection khi không phải server side rendering
- Style động và hộ trợ theme
- CSS Preprocessing thông qua các plugins

Điều bạn cần biết đó là, đó là nó thực sự nhanh, linh hoạt và trên hơn hết, nó vừa khít với ý tưởng JSX và React. Và bạn không cần setup gì cả, vì nó đã có đủ khi bạn dùng Next.js.

Tuy nhiên, nếu bạn vẫn muốn sử dụng các old CSS preprocessor, bạn cũng có thể. Tôi phần nào đã quên LESS, SASS, PostCSS, và CSS-Module, nhưng nếu bạn vẫn ưu thích chúng, bạn chắc chắn vẫn có thể sử dụng. 

Và một thay thế styled-jsx khác tôi recommend bạn là [Material-UI-Next](https://material-ui-next.com/). Một framework nổi tiếng cho React Component, nó cài đặt Google’s Material Design. Nó là một JSS, có khả năng đáp ứng cao và có tương lai.

Tôi cũng đang sử dụng nó cho một project mới và trên tất cả tôi thích nó.

## webpack

Mỗi lần bạn khai báo sẽ được nhóm và tự động trả về với từng trang. Vì thế có nghĩa là, các trang không bao giờ tải các đoạn mã không cần thiết. 

Bạn thậm chỉ cũng có thể phân thích các bundle và tối ưu với các module lazy loading.

## routing

Routing rất đơn giản với tuỳ chọn tự động nạp trước để hiệu năng tốt nhất. Bạn không cần cài đặt bất kì dependencies nào để route hoạt động.

Mọi người đã sử dụng React Router hay một vài router khác sẽ hơi khó để bắt đầu nhưng Next.js thì thực sự đơn giản. Nó là một cách tiếp cận khác, điều mà với tôi nó khá dễ dàng thực hiện.

## deployment
Next.js cho phép bạn export ứng dụng của bạn ra một ứng dụng  HTML tĩnh, miễn là ứng dụng của bạn không tạo tự động khi đang chạy. ĐIều này có tuyệt vời không nào? 

Deploy ứng dụng của bạn khá kỳ diệu, không chỉ là sản phẩm kết quả cuối cùng chúng ta hướng đến mà là cách bạn làm nó. Bạn chỉ cần code nó bằng một lệnh và deploy nó lên bằng một lệnh khác.

Tuỳ chọn này có sẵn, nễu bạn sử dụng [ZEIT now](https://zeit.co/now) hosting. Tôi recommend bạn sử dụng nó. Và nếu bạn đang lên kế hoạch làm việc với Next.js nó sẽ giúp bạn dễ dàng deploy.

# Tóm lược

Có nhiều chi tiết tôi không đề cập đến trong bài này. Tôi chỉ đi nhanh qua những vẫn đề chủ yếu đối với tôi. 

Tôi không bao giờ thích React cho đến khi tôi tìm thấy Next.js. Nó dường như rất tự nhiên khi tôi làm việc với React và Next. Nó cho bạn biết làm thế nào để bắt đầu. 

Với tôi, nó là một lựa chọn đúng đắn để xây dựng giao diện web. Nó làm tôi thích React.