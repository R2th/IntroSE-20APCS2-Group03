Các bạn có thể theo dõi phần đầu ở đây ạ [Phần đầu](https://viblo.asia/p/lo-trinh-tro-thanh-mot-frontend-development-hien-dai-phan-dau-aWj53OGb56m). Chúng ta cùng tiếp tục với seri nhé.

# Package Managers

Trước khi bắt đầu vào phần này, nếu như bạn đã sử dụng một vài thư viện bên ngoài, một plugin hoặc một widget, bạn phải tải JavaScript(JS) và file CSS thủ công sau đó đặt chúng trong project, và khi những thư viện,plugin,.. ra một phiên bản mới bạn lại phải tải phiên bản mới đó và đặt chúng lại vào project của bạn và cứ như vậy ... Đó là một vòng lặp rất tốn thời gian và rắc rối. Package Managers sẽ giúp chúng ta giải quyết vấn đề này. Package Managers giúp chúng ta mang những thư viên, plugin,... vào trong project vì vậy chúng ta sẽ không phải lo lắng về việc copy chúng thủ công hoặc gặp phải những rắc rối về update chúng khi chúng release một phiên bản mới. Hiện tại có hai Package Managers phổ biến là **yarn** và **npm** bạn có thể chọn bất kì cái nào và một khi bạn đã học sử dụng một cái thì cái còn lại cũng rất dễ thôi :D.

# Hãy sử dụng cái chúng ta đã học nào

Sau khi đã có những hiểu biết cơ bản của Package Managers hãy thử install một vài thư viện vào webpage bạn làm ở phần trước nhé. Install thư viện khi user click một button thì sẽ hiện ra một message hoặc tạo một login form và làm cho form đó validation sử dụng vài thư viện validation. Bạn có thể tìm hiểu làm sao để cài các phiên bản khác nhau của một thư viện và tìm hiểu thêm một số option của Package Managers mà bạn đang dùng.

# CSS Preprocessors

Preprocessors làm CSS phong phú thêm với các chúc năng mà không có khẳ năng thực hiện với CSS thuần. Có nhiều lựa chọn khác nhau như Sass, less, Stylus, PostCss, ... Nếu như phải chọn một cái cho lần đâu tiên có lẽ bạn nên chọn sass. Tuy nhiên PostCss đã có được rất nhiều sự chú ý gần đây, nó được ví như một "babel" cho CSS với rất nhiều tính năng tuyệt vời và được phát triển liên tục. Bạn có thể sử dụng độc lập hoặc phía trên của sass. mình sẽ gợi ý bạn học Sass với thời điểm hiện tại và nên quay lại với PostCss khi nào bạn có thời gian.

# CSS Frameworks

Bạn không cần học Css Frameworks nữa, tuy nhiên nếu bạn muốn chọn một cái bất kì trong vô số Frameworks thì có một vài cái nổi tiếng nhất là Bootstrap, Materialize và Bulma. Nhưng nếu bạn nhìn vào nhu cầu của thị trường và bạn mới học thì mình khuyên bạn nên chọn Bootstrap.

# Cách tổ chức code CSS

Applicaiton của bạn lớn dần lên CSS bắt đầu trở nên lộn xộn và khó để quản lí bảo trì. có nhiều cách để cấu trúc code CSS của bạn tốt hơn cho khả năng mở rộng. Có **OOCSS, SMACSS, SUITCSS, Atomic và BEM**. Bạn nên biết những sự khác nhau của chúng nhưng mình thích [BEM](http://getbem.com/) hơn :D.

# Build Tools

Tools giúp bạn trong building/bundling và phát triển ứng dụng JS. Bao gôm các mục linters, task runners và bundlers.

Với task runners có nhiều lựa chọn khác nhau nhau gồm npm script, gulp, grunt,... Nhưng thời điểm này webpack cho phép bạn sử lí hầu hết những thứ thường làm với gulp, chỉ cần npm scripts trong task runners là bạn có thể sử dụng để tự động hóa các tasks mà webpack có thể có khả năng thực hiện. Bạn không cần học Gulp, tuy nhiên sau đó nếu bạn có thời gian thì đừng ngại tìm hiểu về nó và xem nó có thể giúp bạn trong ứng dụng của bạn không nhé.

Với linters chúng ta cũng có nhiều lựa chọn gồm  ESlint, JSlint, JSHint và JSCS. Nhưng hiện tại hầu hết đều sử dụng ESlint.

Với module bundlers cũng có một vài lựa chọn gồm Parcel, Webpack, Rollup, Browserify,... Nếu bạn phải chọn một thì hãy chọn ngay Webpack. Rollup thì khá phổ biến nhưng nó khuyến nghị để được sử dụng cho các thư viện, khi nói đến app thì đã có webpack. Vì vậy hãy tự dạy webpack cho bản thân mình ngay bây giờ và có thể tìm hiểu về Rollup sau nếu bạn muốn.

# Thực hành tiếp nào :)

Chúc mừng bạn có thể tự tin là một modern JavaScript developmet được khoảng 75% rồi. Bây giờ hãy tiếp tục và tạo ra 
một thứ gì đó với tất cả những gì đã học được. Có thể tạo ra một số loại thư viện JavaScript mà bạn phải sử dụng Sass và JavaScript. Sau đó sử dụng Webpack để convert Sass tới css và sử dụng babel để dịch code ES6. Khi bạn đã hoàn thành tất cả hãy đẩy nó lên Github hoặc nếu có thể thì cả npm nhé :v.

Hẹn gặp lại các bạn ở phần tiếp theo cũng là phần cuối nhé Chào thân ái và quyết thắng!!!

# Nguồn tham khảo
[Modern Frontend Developer in 2018](https://medium.com/tech-tajawal/modern-frontend-developer-in-2018-4c2072fa2b9c)