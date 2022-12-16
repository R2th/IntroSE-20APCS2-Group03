### 1/ Giới thiệu:
Locators đóng một vai trò rất quan trọng trong các automation script. Nó giúp script xác định các elements trên GUI của các ứng dụng Web để tương tác. Nếu bạn không xác định được các elements một cách chính xác thì các automation script của bạn sẽ không thể tương tác được với các elements đấy, bởi vậy việc xác định chính xác các element trên GUI là một bước vô cùng quan trọng trong phát triển Project Automation. 

CSS Selector và Xpath trong Selenium là hai trong số những cách mạnh mẽ nhất để định vị các phần tử Web. Tuy nhiên, việc xử lý get CSS Selector và Xpath này sẽ tốn kha khá thời gian của bạn. Hôm nay mình sẽ giới thiệu với các bạn 1 tools hỗ trợ các bạn trong việc xử lý get các  CSS Selector và Xpath này chỉ trong vòng 5s. Trước hết, nói về tools thì đã có rất nhiều tools hiện tại (Chrome Dev Tools, ChroPath, Xpath Helper...) đã hỗ trợ trong việc get giá trị CSS Selector và Xpath. Tuy nhiên mình thấy có 1 số vấn đề mà các tools kia không thực hiện được?

*  Có support ShadowDOM hay không?
*  Có support iFrame hay không?
*  Có support SVG Element hay không?
*  Có chỉ ra điểm sai của Xpath của bạn khi bạn viết chưa đúng?
*  Hệ thống auto-suggest của tools đó đã tốt hay chưa?

Với vô số câu hỏi ở trên, hôm nay mình sẽ chia sẻ cho các bạn 1 tools vô cùng bổ ích, đó là tool **SeletorsHub**, được phát triển bởi Sanjay Kumar.
Đây là một free extension trên nhiều browser (Chrome, Firefox,...). Nó không chỉ giúp bạn giải quyết các vấn đề ở trên, mà còn là 1 tools vô cùng hữu ích giúp các bạn cải thiện khả năng viết Xpath của mình bởi hệ thống auto-suggest các kết hợp các thuộc tính (attributes, text, siblings, etc. ), giúp bạn xây dựng một bộ Selectors nhanh chóng. Vì vậy, về cơ bản, bây giờ bạn sẽ phải tự viết XPath và CSS của mình thay vì đi copy và parse như các tools trước đây, vì vậy các bạn sẽ không mất đi kỹ năng và viết XPath của mình. Thú vị quá phải không?

Vì là một  free extension trên nhiều browser nên việc cài đặt là vô cùng đơn giản, bạn có thể tìm thấy ở Chrome web store:

![](https://images.viblo.asia/e5acf304-a88b-4e74-99d2-684a88b928fe.PNG)


### 2/ Tính năng:
* **Hệ thống auto-suggest tuyệt vời:**
Với tính năng này, SeletorsHub sẽ suggest những thuộc tính giúp người dùng có thể tạo CSS Selector và Xpath một cách dễ dàng. Như các bạn thấy, đối với field **UserName**, khi bạn type  `//input` nó sẽ auto-suggest bạn các thuộc tính như *id*, *placeholder*, *type* để bạn có thể hoàn thành Xpath một cách nhanh nhất.

![](https://images.viblo.asia/a08a579d-74ed-4412-880e-247db96e29ab.PNG)

Ngoài ra còn hỗ trợ cả Xpath Axes

![](https://images.viblo.asia/2807a428-de0a-4194-a936-993074d082da.PNG)

* **SVG Element Support:**  
Chúng ta có lẽ không biết rằng các SVG element `<svg>` không hỗ trợ định dạng XPath tiêu chuẩn. Các SVG element hỗ trợ các mẫu XPath khác nhau. SelectorsHub sẽ support chúng ta giúp cho việc này trở nên dễ dàng hơn nhiều bằng cách cho chúng ta biết định dạng chính xác. Nó cũng giúp chúng ta học cách viết các selectors cho SVG element một cách chuẩn xác hơn. Đa số các tool còn lại đều không hỗ trợ đối với SVG element.

![](https://images.viblo.asia/465ea39f-84b6-4729-9740-736fc8741078.PNG)

* **iFrame Support:**  
SelectorsHub cũng hỗ trợ cho iFrame. Nó sẽ cho chúng ta biết liệu element được kiểm tra có bên trong iFrame hay không. Giờ đây, bạn có thể nhanh chóng viết và xác minh selector cho các phần tử bên trong iFrame mà không tốn quá nhiều thời gian.

![](https://images.viblo.asia/d67fb5d4-310e-426e-b357-0c2362299456.PNG)

* **ShadowDOM Support:**  
Trước đây chúng ta không thể viết và xác minh selectors bằng CSS cho các ShadowDOM element , nhưng giờ đây, sự đổi mới tuyệt vời có tên SelectorsHub đã giúp điều đó trở nên khả thi. Với sự trợ giúp của SelectorsHub, bạn có thể nhanh chóng kiểm tra và xác minh selectors bằng CSS cho các ShadowDOM element.

![](https://images.viblo.asia/83ab3e41-baed-4846-b883-d91e576ba535.PNG)

* **Hiển thị thông tin lỗi của selectors:** Trước đây, khi bạn viết một selectors sai (cú pháp, pattern...) thì không có tools nào có thể cho chúng ta biết điều gì sai trong selectors của chúng ta. DevTools chỉ đề xuất *0 matching nodes* cho selector sai. Nhưng bây giờ bạn có SelectorsHub, nó sẽ giúp bạn bằng cách hiển thị thông báo lỗi chính xác và những gì không chính xác hoặc bị thiếu trong selectors của bạn.  Quá tuyệt vời phải không?

![](https://images.viblo.asia/246272cd-379f-4c78-baca-1d60977bbdbd.PNG)

Hoặc là:

![](https://images.viblo.asia/246272cd-379f-4c78-baca-1d60977bbdbd.PNG)

Các định nghĩa lỗi sẽ được define tại đây: https://selectorshub.com/xpath-and-cssselector-functions/

* **Hiển thị thông tin lỗi của selectors:** Ngoài các điểm mạnh ở trên, SelectorsHub vẫn sở hữu các tính năng như những tools khác

1/ Nếu có nhiều phần tử trên trang web được tìm thấy ứng với giá trị XPath/CSS được nhập, SelectorsHub sẽ tự scroll window đến phần tử đầu tiên tương ứng với XPath/CSS được tìm thấy.

2/ Nếu có nhiều phần tử trên trang web được tìm thấy ứng với XPath/CSS được nhập. SelectorsHub sẽ hiển thị tất cả các phần tử này và theo thứ tự xuất hiện. Trên trang web, ứng với mỗi phần tử tương ứng sẽ xuất hiện đường viền màu xanh nét đứt xung quanh để làm nổi bật phần tử này.

3/ Nếu bạn di chuột vào bất kỳ phần tử tương ứng nào phù hợp trong tab SelectorsHub, đường viền nét đứt màu xanh sẽ chuyển thành đường viền dấu chấm màu cam để làm nổi bật thành phần tương ứng trong trang web.

4/ Trường hợp phần tử được tìm thấy không nằm trong vùng hiển thị của trang web, thì khi hover chuột vào phần tử đó trong SelectorsHub tab, thì trang web sẽ tự động scrool đến vùng hiển thị của phần tử đó và được làm nổi bật bởi đường viền dấu chấm màu cam.

### 3/ Một số ưu điểm khi sử dụng SelectorsHub hơn khi sử dụng các XPath Tools & Selectors tools khác?
* Dễ cài đặt vì là 1 free - extension trên browser
* Hỗ trợ nhiều trình duyệt CHROME, SAFARI, FIREFOX, EDGE, OPERA
* Tính năng auto-suggest tuyệt vời
* Hỗ trợ ShadowDOM, iFrame, SVG Element
* Hiển thị chi tiết thông tin lỗi selector
* Cải thiện khả năng viết XPath and CSS Selectors của bạn
* Đặt biệt có hỗ trợ Dark theme
* SelectorsHub sẽ injects script khi bạn mở tab SelectorsHub để sử dụng nó trong khi các plugin khác sẽ injects script vào trang web của bạn ngay sau khi trang web được mở trong trình duyệt. Đây là lý do lớn nhất mà nhiều công ty không cho phép plugin trình duyệt nhưng bây giờ SelectorsHub giải quyết vấn đề này và xử lý vấn đề bảo mật, vì lẽ đó nên nó là một secure browser plugin
* SelectorsHub không lưu bất kỳ dữ liệu người dùng nào.
* SelectorsHub chỉ chạy trên local của bạn.

### 4/ Kết:
Nói tóm lại đây là một tools mà các bạn đang làm automation, cũng như các bạn đang học và cải thiện khả năng viết Xpath và CSS Selector nên thử và tìm hiểu. Tuy nhiên đây là tools vẫn còn đang được phát triển và cải thiện nên sẽ không tránh khỏi vẫn còn một số bugs nhất định. 

Các bạn có thể tìm hiểu thêm về SelectorsHub tại đây: https://selectorshub.com/

Ngoài ra các bạn cũng có thể tự học cách sử dụng Xpath trong Selenium tại đây: https://www.lambdatest.com/blog/complete-guide-for-using-xpath-in-selenium-with-examples/