![](https://images.viblo.asia/63d10433-c880-44f5-9e07-53f57a53221d.jpeg)

Vậy là bạn đã bắt đầu hành trình vào thế giới của phát triển web. Nhưng bạn học được gì đầu tiên? Internet quá tải với vô số thông tin về hàng triệu công nghệ khác nhau mà một nhà phát triển web có thể biết. 

Nó không khó để thấy tất cả khó hiểu và gây khó chịu như thế nào. 

Có rất nhiều thông tin ở đây - vì vậy hãy lấy đồ uống, cảm thấy thoải mái và để bắt đầu thôi nào!

# The Must Know’s
 Bất kể con đường và mục tiêu nghề nghiệp của bạn là gì, có một số điều mà mọi developer cần phải biết.
 
*  **Git/Source control**  - Mọi developer giỏi sẽ cần biết cách sử dụng Git, đặc biệt là trong môi trường làm việc nhóm. Vì vậy, hãy học cách clone repos, tạo commits, tạo branches và merge code.
*  **Debugging** - Frontend, hoặc backend, sẽ có lỗi.  Làm quen với các công cụ sửa lỗi cho IDE của bạn.
*  **IDE** - Có rất nhiều IDE bạn có thể sử dụng, vì vậy hãy chọn một và làm quen với nó. IDE của bạn là người bạn tốt nhất của bạn và việc biết các phím tắt và công cụ sẽ giúp bạn trở thành một developer tốt hơn. Bản thân tôi đang dùng VS Code.
*  **Methodologies (Agile/SCRUM/Kanban)** - Khi hoạt động trong một nhóm, hãy chắc chắn rằng bạn đã quen với cách họ làm việc.

# Front-end
![](https://images.viblo.asia/e5b8c8b3-d45d-493e-aebf-7c058c5a1184.jpg)

Một front-end developer thường có thể thực hiện các task sau:

* Implement thiết kế bằng HTML/CSS
* Tương tác với DOM bằng JavaScript
* Tương tác với API bằng FETCH API hoặc tương tự

Hãy xoáy sâu vào vấn đề này chi tiết hơn một chút nào.

## HTML/CSS

Đây là bánh mì và bơ của sự phát triển front-end. HTML được sử dụng để định vị và đặt các thành phần trên một trang web, trong khi CSS được sử dụng để định kiểu các thành phần đó. 


Một web developer sẽ được mong đợi biết công cụ này thực sự tốt. Điều quan trọng là phải biết:

* Sử dụng HTML để tạo một trang web
* Styling elements sử dụng CSS
* Các cách khác nhau để áp dụng CSS cho HTML - inline styles, style sheets, ... .

Khi bạn đã nắm chắc các điều cơ bản trên, hãy xem những phần nâng cao hơn:

* CSS Grid & Flexbox để bố trí và định vị các yếu tố dễ dàng hơn
* SCSS để làm cho CSS bình thường dễ quản lý hơn thông qua việc sử dụng các biến

## Frameworks
Giai đoạn tiếp theo là làm quen với các CSS frameworks. Về cơ bản, đây là những phần tử và styles mà bạn có thể áp dụng trong các dự án của mình. Hầu hết các công ty sử dụng những thứ này vì nó giúp tiết kiệm thời gian cho các developers. Có rất nhiều frameworks, nhưng bản thân tôi khuyên nên chọn một và làm quen với nó. Chúng thường khá giống nhau và một khi đã làm quen với nó, thật dễ dàng để chọn phần còn lại.
## Bootstrap
Tôi nghĩ bạn nên tìm hiểu Bootstrap ([getbootstrap.com](https://getbootstrap.com/)). Nó rất phổ biến và được sử dụng bởi rất nhiều công ty.

`"Chờ đã, tại sao tôi phải học CSS/HTML từ đầu nếu tôi chỉ có thể sử dụng một framework?!"`

Một câu hỏi hay. Vâng, có các frameworks, và trong khi rất nhiều công ty sử dụng chúng, bạn sẽ phải tùy chỉnh mọi thứ theo thời gian dựa trên dự án. Đối với điều này, bạn sẽ cần phải biết những điều cơ bản.
* **Media Queries.** Cũng như biết cách sử dụng CSS để tạo ra các responsive designs, bạn sẽ cần hiểu cách sử dụng **media queries** để xác định cách các yếu tố sẽ tìm các kích thước màn hình khác nhau.
* **Tránh sử dụng pixel cho sizes.** Tôi sẽ đề nghị sử dụng các đơn vị **rem** trên pixel. Một hình ảnh có chiều rộng 100px, sẽ luôn có chiều rộng 100px bất kể kích thước màn hình. Cố gắng sử dụng các đơn vị như **rem**, **vh** và **vw**, để đạt được các thiết kế đáp ứng.

> **BONUS TIP** -  Thường thì bạn cần phát triển một ứng dụng sử dụng cả màn hình di động và màn hình lớn hơn. Tập trung vào thiết bị di động trước khi tạo thiết kế và thêm media queries cho màn hình lớn hơn sau.
> 
## JavaScript
JavaScript là ngôn ngữ lập trình của web. Nếu bạn muốn trở thành một developer front-end thành công, bạn cần biết JavaScript. Và thực sự biết điều đó. Vâng, có các frameworks, nhưng giống như chúng ta đã học những điều cơ bản về HTML và CSS trước khi vào các frameworks, chúng ta sẽ làm tương tự ở đây. Điều này sẽ làm cho bạn trở thành một developer tốt hơn trong thời gian dài. Khi các frameworks đến và đi, các yếu tố cốt lõi của ngôn ngữ sẽ vẫn như cũ. 

Ở mức tối thiểu, là một junior developer, bạn sẽ cần phải biết:

* Objects, functions, conditionals, loops and operators
* Modules
* Arrays
* Lấy dữ liệu từ API bằng FETCH API
* Thao tác với DOM và sử dụng Events
* Async/Await
* JSON
* ES6+
* Testing (Jest, Enzyme, Chai, etc.)

Một junior developer không mong muốn biết tất cả mọi thứ về chủ đề này, nhưng bạn càng biết nhiều thì càng tốt. Khi bạn có thể tạo một ứng dụng web cơ bản mà không cần hướng dẫn, bạn có thể chắc chắn rằng bạn biết JavaScript.

Nếu bạn thực sự muốn trở thành một chuyên gia về JavaScript, hiểu đầy đủ ngôn ngữ và nổi bật trước đám đông, một số tài nguyên tuyệt vời để tìm hiểu các chủ đề JavaScript nâng cao hơn là:

* eloquentjavascript.net
* freeCodeCamp.org
* github.com/getify/You-Dont-Know-JS

Những tài nguyên này không chỉ dạy cho bạn JavaScript mà bạn còn học được rất nhiều về các khái niệm lập trình nói chung. Nghiêm túc mà nói, nếu bạn tìm hiểu các tài nguyên trong các tài nguyên trên, bạn sẽ là một junior developer thực sự tuyệt vời.

Một số ý tưởng dự án:
* Tạo trò chơi Super Mario (bạn sẽ học JavaScript, thao tác DOM và sử dụng các sự kiện)
* Tạo một dashboard hiển thị một số thống kê được lấy từ API. ví dụ: một Twitter dashboard, một GitHub dashboard hoặc mọi thứ mà bạn thích (bạn sẽ học được cách làm việc với APIs và JSON)
* Đừng lo lắng về cách mọi thứ nhìn vào đây. Tập trung vào việc học JavaScript, không phải CSS/HTML. Bạn luôn có thể làm cho nó trông đẹp hơn sau nếu bạn muốn!

## JS Frameworks
Có nhiều  JS frameworks, chọn một và tìm hiểu nó. Những cái phổ biến tại thời điểm này là Angular.js, React.js và Vue.js. Đây là tất cả các lựa chọn vững chắc. Cá nhân, tôi khuyên dùng React.js, nhưng bạn có thể thử những cái khác và xem bạn thích cái nào hơn. 

Quick Note - Nếu bạn đã học những điều cơ bản về JavaScript và có nền tảng vững chắc, các khung học tập nên là một miếng bánh! Bất kể bạn chọn frameworks nào, hãy chắc chắn rằng bạn biết rõ về nó.

Bạn không cần phải biết tất cả, sẽ có vẻ ấn tượng hơn nếu bạn biết thực sự rõ về một framework, trái ngược với việc có ít kiến thức về nhiều frameworks khác nhau.

## React

Nó có sự hậu thuẫn lớn từ Facebook, cộng đồng trực tuyến lớn và là phổ biến nhất trong ngành công nghiệp tại thời điểm này.  

Nếu bạn làm theo các bước trên và học được một chút JavaScript, thì việc chọn React nên không quá khó khăn. Là junior developer, bạn muốn chắc chắn rằng bạn nắm các khái niệm cốt lõi của React:

* Hiểu rằng React dựa trên các thành phần và cách các thành phần hoạt động 
* Sử dụng State và Props trong các thành phần của bạn
* JSX và cách sử dụng nó để kết xuất các phần tử HTML trên trang web
* Cách thức và khi các thành phần kết xuất lại
* Sử dụng React hooks
* NPM, Webpack và Babel

## State Management (e.g Redux)
Khi hiểu các khái niệm cốt lõi về React, bước tiếp theo là tìm hiểu Redux. Redux về cơ bản là một state management framework.  Hãy nghĩ về nó như một cơ sở dữ liệu mặt trước chứa trạng thái của ứng dụng web của bạn ở một nơi, dễ quản lý. 

Có rất nhiều bộ phận chuyển sang Redux, vì vậy đừng lo lắng nếu bạn cảm thấy quá tải. Bạn sẽ chỉ cần biết Redux khi làm việc với các ứng dụng web quy mô doanh nghiệp lớn. Tập trung vào việc hiểu các nguyên tắc cơ bản và state management bằng React.

Có một số công cụ có sẵn để giúp bạn gỡ lỗi React/Redux:
* [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension)

## Web Browsers
Là một front-end developer, điều quan trọng là phải biết cách sử dụng xung quanh các trình duyệt web. Chrome, Firefox và Edge là những cái chính. Bạn sẽ cần có một ý tưởng cơ bản xung quanh:

* Debugging tools (ví dụ: Chrome Developer Tools)
* Làm việc với các phương thức lưu trữ (local storage, session storage, cookies)
*  Các tính năng của trình duyệt

## Deployment & Hosting

Một front-end developer nên biết cách deploy và host một web app. Điều này là tốt cho portfolios, knowledge, và nói chung có một công việc. Tôi khuyên bạn nên sử dụng một managed service (nghĩa là để người khác thực hiện cách công việc nặng nhọc cho bạn), chẳng hạn như:
* GitHub Pages
* Heroku
* Netlify
* Digital Ocean
* AWS
* Firebase

Cá nhân tôi khuyên dùng Netlify hoặc Heroku. Nó giúp việc triển khai và lưu trữ ứng dụng thông qua UI rất dễ dàng. Mỗi dịch vụ này cung cấp một cấp miễn phí, do đó, nó không làm bạn tốn nhiều tiền để chạy. Nhược điểm của dịch vụ này là chúng không cung cấp cho bạn quyền truy cập tốt hơn mà một số nhà phát triển sẽ cần, chẳng hạn dịch vụ email, SSH hoặc FTP. Nếu bạn không biết những thứ này thì có lẽ bạn không cần chúng vì vậy dịch vụ đơn giản sẽ hoạt động tốt.

Nếu bạn quyết định super-fancy và lưu trữ một số dự án của bạn trên một miền tùy chỉnh (như .com), tôi khuyên bạn nên sử dụng **NameCheap** cho tên miền. Một lần nữa, thực sự dễ sử dụng và các tên miền, tốt, giá rẻ. 

# Back-end
![](https://images.viblo.asia/0f657b95-d779-485d-bdab-1567c8908afd.jpg)

Tóm lại, đây là nơi lưu trữ dữ liệu từ giao diện người dùng. Ví dụ: khi người dùng tạo Tweet, nó sẽ đi qua máy chủ và được lưu trữ trong cơ sở dữ liệu.

Một back-end developer thường có thể thực hiện các tác vụ sau:
* Tạo API mà giao diện người dùng sẽ sử dụng (thường bằng cách trả về JSON)
* Viết logic nghiệp vụ và logic xác thực
* Tích hợp với API của bên thứ 3
* Lưu và đọc dữ liệu từ cơ sở dữ liệu

## Programming Languages
Có rất nhiều programming languages mà bạn có thể chọn. Có rất nhiều thứ bạn có thể chọn. Nhưng đừng lo lắng, một vài ngôn ngữ chính bạn có thể chọn là:
* Java
* C#
* Python
* Node.js
* Go
* PHP

Một lần nữa, lời khuyên của tôi là chọn một và học nó một các thuần thục. Tôi gợi ý bạn có thể dùng **Node.js**, như bạn đã có tư duy như việc học JavaScript. Node.js thực sự dễ để tạo REST API's, đó là một trong những nhiệm vụ chính mà một junior developer sẽ cần phải làm.

Bất kì ngôn ngữ bạn chọn, hãy chắc chắn rằng bạn biết những điều sau:
* Tạo API
* Language basics (việc tạo functions, sử dụng conditionals, operators, variables, etc)
* Cách để kết nối với một database
* Cách query một database
* Package management
* Việc viết tests

Nếu bạn quyết định học Node.js, rất nhiều thứ sẽ quen thuộc với bạn. Đừng cố gắng và tìm hiểu tất cả! Là một junior developer, bạn sẽ không cần. Chọn ngôn ngữ phù hợp nhất với mục tiêu của bạn (nếu nó phát triển web, bất kỳ ngôn ngữ nào trong số đó cũng sẽ làm được) và tập trung vào nó và học tốt nó. Tất nhiên, nếu bạn tò mò về các ngôn ngữ khác (Node.js và Python khá khác nhau) thì hãy thỏa mãn sự tò mò của bạn và tìm hiểu xung quanh chúng.

## REST API & JSON
Việc tạo một REST API tốt là một trong những công việc chính của một backend developer.

Bạn sẽ cần biết:
* Những động từ khác nhau và những gì chúng được sử dụng cho
* Làm thế nào để tạo ra một good response
* Cách xử lý yêu cầu
* Yêu cầu xác thực
* Cách ghi lại API của bạn

**REST API's** là cầu nối giữa backed và frontend, vì vậy hãy chắc rằng bạn hiểu cách chúng hoạt động.

**JSON** là ngôn ngữ chính được sử dụng để truyền dữ liệu qua REST API. Dữ liệu được biểu diễn dưới dạng Objects và Arrays. Một lần nữa, nếu bạn đã học JavaScript hoặc front-end development, điều này sẽ trông quen thuộc với bạn.
## Databases & DevOps
![](https://images.viblo.asia/f04cdd77-6bb7-4362-8cd5-c2789f22bb0f.jpg)

Đây là phần cơ sở hạ tầng của web development. Tôi sẽ nói rằng heavy knowledge là một yêu cầu cho một junior developer. Tôi gần như đề xuất điều ngược lại, và nói rằng bạn chỉ thực sự cần biết sâu về nó nếu bạn muốn tham gia vào lĩnh DevOps. Khu vực rộng lớn mà bạn cần biết là:
* Cách quản lý cơ sở dữ liệu
* Các nền tảng khác nhau để lưu trữ (AWS, Azure, Google, etc)
* CICD và các công cụ như Jenkins, GitLab, etc
* Logging and monitoring

Tùy thuộc vào team hoặc công ty của bạn, có thể có các team hoặc người khác để quản lý việc này. Đây vẫn là một bộ kỹ năng thú vị và ấn tượng để có, vì vậy nếu bạn tò mò và có chút thời gian rảnh rỗi, việc học một số cơ sở dữ liệu và các kỹ năng DevOp sẽ đi một chặng đường dài.

## Advanced Topics

![](https://images.viblo.asia/ff48af3f-ae2f-4c75-a110-19aa7edcc94f.jpeg)

Dưới đây là một số chủ đề nâng cao tôi khuyên bạn nên một khi bạn đã thành thạo những thứ ở trên.
### Authentication using JWT/OAuth
 Đây là một cách tiếp cận phổ biến trong authenticates và authorises users (ví dụ: login)
 
Thêm thông tin tại: https://oauth.net/2/
### Design Patterns
Design patterns là giải pháp phổ biến cho các vấn đề phổ biến. Việc học các design patterns sẽ giúp dễ dàng giải quyết vấn đề hơn và chắc chắn là một developer tốt hơn.

* Thêm thông tin (ví dụ Java): github.com/iluwatar/java-design-potypes
* Thông tin khác (JavaScript): github.com/fbeline/Design-Potypes-JS

> **BONUS TIP** - Có rất nhiều design patterns, vì vậy hãy đừng thử và tìm hiểu tất cả chúng cùng một lúc. Thay vào đó, hãy làm quen với chúng và khi bạn gặp phải một vấn đề như một phần của dự án, hãy xem những mẫu thiết kế nào có sẵn để bạn sử dụng.
> 
### Progressive Web App’s and Mobile development
Progressive web apps ề cơ bản là các ứng dụng web chạy như ứng dụng gốc trên điện thoại người dùng. Khá tuyệt phải không? Kiểm tra chúng nếu bạn có thời gian.

Thêm thông tin tại: developers.google.com/web/progressive-web-apps/

Các tùy chọn khác bao gồm:
* React Native - cho phép bạn viết mã React được biên dịch sang Android / IOS 
* Flutter - tương tự React Native, chỉ sử dụng ngôn ngữ lập trình Dart 


Thêm thông tin tại: Medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4

### Using the command line (SSH/Bash etc)
Đôi khi, bạn sẽ cần sử dụng dòng lệnh khi GUI không khả dụng. Ở mức rất cơ bản, bạn sẽ cần biết cách: 

* Cách kết nối với máy chủ bằng SSH 
* Điều hướng xung quanh bằng cách sử dụng các lệnh (cd, ls, etc)
*  Chỉnh sửa tệp bằng vim (hoặc tương tự)

# Tham khảo
https://medium.freecodecamp.org/the-10-minute-roadmap-to-becoming-a-junior-full-stack-web-developer-1131d4ffc48