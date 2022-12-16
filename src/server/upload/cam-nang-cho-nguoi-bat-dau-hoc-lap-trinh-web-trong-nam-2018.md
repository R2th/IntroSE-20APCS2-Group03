![](https://images.viblo.asia/71ac617e-0693-4f0d-b32b-40f187e72dfa.png)
Bạn muốn thử học lập trình web, nhưng không biết nên bắt đầu từ đâu?

Chắc hẳn bạn cũng đã thử tìm kiếm những khóa học trên google, nhưng lại có quá nhiều nguồn tài liệu và đa số chúng lại chứa nhiều thông tin khiến bạn quá tải.

**bạn chỉ cần những kiến thức cơ bản nhất về lập trình web - một tài liệu cung cấp các giải thích tổng thể và giúp bạn có định hướng phát triển**

Đó là lý do tại sao tôi viết bài này. Bài viết sẽ chỉ cung cấp các kiến thức về  công nghệ năm 2018 trong lĩnh vực lập trình web ở mức độ cơ bản nhất nếu bạn muốn thử sức trong lĩnh vực này. **Nếu bạn là người mới học lập trình, đây là bài viết dành cho bạn!**

Bài viết sẽ bao gồm những phần sau:

* Những kiến thức cơ bản trong lập trình web,
* Cái nhìn tổng thể về các ngôn ngữ lập trình và các frameworks,
* Các nguồn tài liệu hữu ích.

Đó là tất cả những gì một người mới chập chững bắt đầu cần để phát triển sự nghiệp trong lĩnh vực này!
## Phần 1: Chúng ta sẽ  bắt đầu với những thứ cơ bản trước:
* **Thế nào là lập trình web:** giải thích điều gì thực sự xảy ra khi bạn tải một trang web trong trình duyệt của bạn.
* **HTML, CSS và Javascript**: nền tảng của mọi website
* **Các công cụ hữu ích**: sử dụng các trình soạn thảo và Git
* Thế nào là **front-end** và **back-end**

## Phần 2: tiếp theo hãy tìm hiểu về các kĩ năng front-end
* **Responsive design**: đảm bảo website của bạn nhìn tuyệt đỉnh kể cả trên máy tính, tablets hay điện thoại
* **Grunt, Gulp và WebPack**: sử dụng các build tools hỗ trợ
* Giới thiệu về các **framework của Javascript**: React, Vue và Angular

## Phần 3: Các kĩ năng back-end
* Tổng thể về các **ngôn ngữ back-end** thường được sử dụng
* Giới thiệu về **cơ sở dữ liệu** và ngôn ngữ cơ sở dữ liệu
* Cơ bản về cách thiết lập một website trên **máy chủ**

## Kết: tài liệu tham khảo
* Danh sách các khóa học online, các bài hướng dẫn và những quyển sách hữu ích.

Trước khi đi qua tất cả các kiến thức trên về website, hãy bắt đầu với bản thân bạn trước đã!

## Mục đích tối thượng khi học lập trình của bạn là gì?
Trong cuốn sách *7 thói quen của người thành đạt*, Stephen R.Covey đã khẳng định để thành công, bạn phải bắt đầu bằng "sự kết thúc trong tâm trí" trước đã.

Ngoài lý do khiến bạn bắt đầu học lập trình, điều gì mà bạn muốn nhắm tới sau khi học xong?

Điều gì là mục tiêu tối thượng của bạn?

Bạn đang tìm kiếm một sở thích vui vui? một sự thay đổi nghề nghiệp? Hay chỉ đơn giản là một công việc linh động giúp bạn có thể sắp xếp thời gian gần gũi với gia đình nhiều hơn?

**Cách bạn tiếp cận với lập trình web nên được dựa trên mục tiêu của bạn.**

Khi đọc bài viết này, hãy nhớ kĩ các mục tiêu của bạn trong đầu và để chúng quyết định: ngôn ngữ nào bạn nên học, thậm chí là cách bạn học nó như thế nào.

Ok đủ rồi, hãy bắt đầu với các kiến thức cơ bản trước đã!
![](https://cdn-images-1.medium.com/max/800/1*wCBlcgi36bFR_JfU1pcp8Q.png)
## Phần 1: Kiến thức nền tảng
Tôi sẽ bắt đầu bằng một điều hiển nhiên trước: **Trọng tâm của lập trình web là việc xây dựng các websites**

Một website có thể rất đơn giản như một trang web tĩnh hay phức tạp như các ứng dụng web ngày nay. Nếu bạn có thể xem một thứ gì đó trong một trang web trên trình duyệt của bạn, thứ đó chắc chắn liên quan tới lập trình web.

Dưới đây là một giải thích đơn giản cách các websites hoạt động:
1. **Websites** về bản chất chỉ là tập hợp các file được lưu trữ trên các máy tính gọi là máy chủ.
2. **Server / Máy chủ** là các máy tính dùng để "host" website, nôm na là lưu trữ các file của websites. Các server được kết nối trong mạng lưới khổng lồ World Wide Web hay còn gọi là Internet.
3. **Browsers/Trình duyệt** là các phần mềm chạy trên máy tính của bạn. Chúng tải các file của websites qua kết nối internet. Máy tính của bạn được coi như một **client** và được kết nối tới **server**

**Tài liệu tham khảo**

* [Internet hoạt động thế nào? ](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work) - Mozilla Developer Network
* [Sự khác biệt giữa webpage, website, web server và search engine?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines) -Mozilla Developer Network

### 3 thành phần tạo nên mọi website

Như đã nói ở trên, websites là tập hợp các files, chủ yếu là các file HTML, CSS, Javascript. Hãy cùng tìm hiểu chi tiết từng thứ nhé.

### HTML hay HyperTextMarkup Language
HTML là nền tảng của mọi website. Nó là một file quan trọng được tải xuống bằng trình duyệt của bạn khi bạn truy cập một trang web.

Bạn hoàn toàn có thể tự tạo một website rất rất đơn giản chỉ với HTML mà không cần tới bất kì files nào khác. Nó sẽ khá nhạt nhẽo nhưng HTML là thứ tối thiểu bạn cần để một website có thể được gọi là một website.

(nếu bạn hứng thú với các kiến thức cơ bản của HTML, bạn có thể đọc qua bài [blog/video](https://coder-coder.com/how-to-make-simple-website-html/) hướng dẫn này)

### CSS hay Cascading Style Sheets
Nếu không có CSS, website của bạn sẽ nhạt nhẽo như một văn bản được soạn thảo bằng Word vậy.

Với CSS, bạn có thể thêm màu, chỉnh phông chữ và sắp xếp lại bố cục trang web theo ý thích của bạn. Thậm chí bạn còn có thể thêm các hiệu ứng chuyển động nếu sử dụng các kĩ thuật CSS nâng cao.
### Javascript
Javascript là ngôn ngữ lập trình cho phép bạn tương tác với các thành phần trên website và thay đổi chúng.

Nếu CSS trang trí cho HTML thì Javascript thêm tương tác và khiến trang web của bạn sinh động hơn.

Bạn có thể sử dụng Javascript để cuộn lên đầu trang khi click vào một button, hay làm một slideshow ảnh có các button điều hướng qua lại để xem hình ảnh.

Để làm việc với HTML, CSS và Javascript, bạn cần dùng một phần mềm khác là trình soạn thảo .

### Trình soạn thảo nào bạn nên dùng?
Đây là một câu hỏi rất phổ biến, đặc biệt là với những bạn mới bắt đầu học lập trình. Câu trả lời là trình soạn thảo phù hợp nhất với bạn sẽ phụ thuộc nhiều vào ngôn ngữ bạn lựa chọn để lập trình.

Nếu bạn làm việc chủ yếu với HTML, CSS, Javascript, bạn hoàn toàn có thể lập trình bằng Windows Notepad hay TextEdit trên Mac nếu bạn muốn.
Nhưng như thế thì có vẻ không chuyên nghiệp lắm.

Các trình soạn thảo như Sublime hay VS Code có rất nhiều tính năng giúp công việc lập trình của bạn dễ dàng hơn. Chúng cho phép bạn căn lề nhiều dòng, highlight các dòng code theo ngôn ngữ lập trình phù hợp.

![](https://cdn-images-1.medium.com/max/800/1*JCnyi8HTMhlUNX3Ym16S8A.jpeg)

Đối với các ngôn ngữ back-end (chúng ta sẽ tìm hiểu sâu hơn ở phần sau), bạn sẽ cần các trình soạn thảo mạnh mẽ hơn gọi là IDE(môi trường phát triển tích hợp). IDE giúp bạn debug và compile đoạn code ngay trong trình soạn thảo.

Dưới đây là vài trình soạn thảo phổ biến:

![](https://cdn-images-1.medium.com/max/800/0*z4FzNLD6u884XHFT.png)

**[VS Code](https://code.visualstudio.com/)**: Phiên bản nhẹ hơn của Visual Studio, một IDE của Microsoft. VS Code mới ra đời cách đây vài năm nhưng nó đã trở nên phổ biến vì tốc độ nhanh, dễ sử dụng, các tính năng mạnh mẽ. VS Code là lựa chọn ưa thích của tôi nên có lẽ tôi hơi thiên vị một chút khi nói đến trình soạn thảo này.

![](https://cdn-images-1.medium.com/max/800/0*XNya7s0zovmrqiRJ.png)

**[Atom](https://atom.io/)**: tạo ra bởi GitHub và được quảng cáo là trình soạn thảo có thể "hackable". Atom là một trình soạn thảo khá được yêu mến. Một trong những điểm mạnh của nó là khả năng tùy biến. Bạn có thể cài các packages và giao diện cho phép bạn thêm các tính năng vào trình soạn thảo.

![](https://cdn-images-1.medium.com/max/800/0*Qb5K88ZRZ2d9JP-m.png)

**[Sublime](https://www.sublimetext.com/)**: Một trình soạn thảo siêu nổi tiếng có tuổi đời lớn hơn so với VS Code hay Atom. Giống như Atom, bạn có thể cài các packages và giao diện. Sublime cũng có tốc độ rất nhanh. Khác với hai trình soạn thảo trên, bạn phải bỏ ra 70 đô để mua bản quyền Sublime nhưng có thể thử nó miễn phí.

Tôi khuyên bạn nên dùng thử một vài trình soạn thảo trước rồi hẵng chọn ra trình soạn thảo phù hợp nhất với mình. Sau đó hãy gắn bó với nó và học cách sử dụng các phím tắt cũng như tính năng thành thạo.

### Version control - Quản lý phiên bản
Sau khi chọn được trình soạn thảo phù hợp, bạn bắt đầu viết code.

Tuy nhiên bạn lại vô tình gây ra lỗi trong những dòng code của mình, và mặc cho việc bạn có Ctrl-Z bao nhiêu lần thì code bạn vẫn lỗi, bạn sẽ làm gì trong trường hợp này?

Câu trả lời là hãy sử dụng **version control**!

Version control giống như việc bạn có các **save points** (bạn nhớ khi chơi game thường hay có các mốc mà khi nhân vật của bạn chết, bạn có thể chơi lại game từ mốc đó mà không phải bắt đầu lại từ đầu chứ? Nó chính là save points!) trong file code của bạn vậy.

Nếu bạn nghĩ việc bạn sắp làm có thể làm hỏng mọi thứ trong file code của bạn, bạn có thể tạo một save point mới (gọi là commit). Sau đó nếu bạn có lỡ làm hỏng trang web, bạn có thể khiến code của bạn trở lại trạng thái cũ trước khi chưa bị hỏng bằng version control.

Version control là một chiếc phao cứu sinh tuyệt vời nếu bạn có lỡ gây ra lỗi và muốn quay về trạng thái ban đầu.

**Nghe tuyệt đó! Nhưng nó hoạt động thế nào vậy?**

Sử dụng một [hệ thống quản lý phiên bản](https://www.atlassian.com/git/tutorials/what-is-version-control) (VCS) tức là bạn đã lưu trữ các file code và toàn bộ lịch sử thay đổi của chúng trong một kho lưu trữ gọi là **repository**.

Thông thường bạn sẽ sử dụng một repository cho mỗi một website hay project

Sau đó bạn lưu trữ repository của mình trực tuyến ở một chỗ gọi là **central repository** (kho lưu trữ trung tâm), đồng thời giữ một phiên bản của nó ở trong máy tính của bạn trong **local repository**. Bất cứ khi nào bạn thay đổi thứ gì đó trong các file code trên máy tính của bạn, bạn có thể tạo một commit và đẩy nó lên central repository.

Tiến trình này giúp nhiều người có thể cùng làm việc trên một file code và thay đổi nhiều files đồng thời.

**Git là hệ thống quản lý phiên bản phổ biến nhất hiện nay**

Hệ thống quản lý phiên bản chủ chốt hiện nay là [Git](https://git-scm.com/). Một đối thủ của nó là [Subversion](https://subversion.apache.org/), một hệ thống cũ hơn. Nhưng đa số các bài hướng dẫn và các trại code ngày nay đều sử dụng Git, do đó tôi khuyên bạn hãy học cách sử dụng nó.

**Tài liệu tham khảo**

* [Hướng dẫn sử dụng git cơ bản](https://try.github.io/levels/1/challenges/1)
* [Hướng dẫn chi tiết về GitHub](https://guides.github.com/activities/hello-world/)

Bây giờ chúng ta sẽ đi sâu vào các ngôn ngữ và frameworks được sử dụng, và để bắt đầu hãy cùng đi qua hai thuật ngữ phổ biến: **front-end và back-end**

### Frontend là tất cả những gì bạn nhìn thấy trên một trang web
![](https://cdn-images-1.medium.com/max/800/0*1ZgqE7dZv3rSaRT2.gif)

Front-end (hay còn gọi là phía client) là tất cả những gì được tải xuống trên trình duyệt của người dùng (client). Nó có thể là HTML và CSS, thứ chúng ta đã nhắc tới phía trên. Ban đầu Javascript cũng chỉ được dùng như một ngôn ngữ front-end nhưng ngày nay bạn cũng có thể sử dụng nó cho cả back-end.

**Front-end quyết định website của bạn sẽ đẹp long lanh hay xấu đau xấu đớn .**

Hay nói cách khác, nó liên quan tới việc website của bạn hoạt động có phù hợp với người dùng không (thứ này gọi là UX - User Experience, tức trải nghiệm người dùng).

Nếu bạn hứng thú với việc thay đổi CSS để đảm bảo trang web của bạn hoàn hảo tới từng pixel, hay việc thêm các hiệu ứng bằng Javascript cũng làm bạn ngồi lì trước máy tính cả ngày, bạn có thể sẽ đam mê theo đuổi mảng lập trình front-end đấy.

### Còn backend đảm bảo mọi thứ trên website của bạn hoạt động ổn định - nó là tất cả các tính năng của một trang web.

![](https://media.giphy.com/media/jRK2yEZTIz6Ra/giphy.gif)

Trong khi front-end là ngoại hình của trang web thì backend là thứ đứng phía sau đảm bảo website của bạn hoạt động với đầy đủ các tính năng hữu ích.

Nếu bạn đang làm lập trình back-end, bạn hẳn đã phải làm những công việc liên quan tới xử lý các yêu cầu tới server và cơ sở dữ liệu.

Một số ví dụ về các công việc của backend có thể là việc lưu trữ dữ liệu khi người dùng điền form trên trang liên hệ, hay việc lấy dữ liệu để hiển thị các bài viết theo một danh mục cụ thể mà người dùng yêu cầu. Công việc của back-end cũng có thể bao gồm cả cài đặt website trên server, xử lý vấn đề deploy/triển khai trang web trên server và cài đặt cơ sở dữ liệu SQL.

Nếu bạn thấy việc triển khai các thành phần chức năng của một trang web thú vị, bạn hoàn toàn phù hợp với mảng back-end.

### Ghép chúng lại nào

Cái tên front-end và back-end bắt nguồn từ việc front-end là những thứ bạn nhìn thấy trong trình duyệt và back-end là những thứ bạn không nhìn thấy nhưng chúng giúp xử lý các tác vụ trong trang web và đảm bảo phần front-end hoạt động ổn định.

Bạn có thể coi front-end là cửa hiệu của một tập đoàn, thứ mà khách hàng thường nhìn thấy và sử dụng. Back-end là các trung tâm chế tạo và phân phối giúp cửa hiệu hoạt động hiệu quả. 

Trong lập trình web cả front-end và back-end đều quan trọng như nhau.

### Front end, back end, hay full stack?

Trong lập trình web, bạn có thể chỉ cần tập trung vào mỗi front-end hay back-end. Hoặc bạn có thể làm cả hai, công việc này được gọi là lập trình full stack.

Thứ bạn chọn sẽ phụ thuộc chủ yếu vào hai điều sau:
* **Sở thích cá nhân** của bạn: không phải ai cũng thích cả front và back end
* **Công việc**: hãy tham khảo danh sách công việc tại địa phương bạn và tham gia vào các buổi gặp mặt lập trình viên để có cái nhìn chung về các lĩnh vực nghề nghiệp. 

Lưu ý là nếu bạn đam mê cả front end và back end, trở thành một lập trình viên full stack sẽ giúp bạn có nhiều cơ hội nghề nghiệp hơn. Cũng có lý thôi, càng nhiều công nghệ bạn biết thì bạn càng dễ kiếm việc.

Stack Overflow đã báo cáo rằng trong [bản thống kê người dùng năm 2017](https://insights.stackoverflow.com/survey/2017#developer-profile-specific-developer-types) của họ, có 63.7% lập trình viên full stack, 24.4% lập trình viên back end, còn 11.9% là lập trình viên front end.

![](https://cdn-images-1.medium.com/max/800/1*UYtHdEZA9xAiq_ys3Z9ArQ.png)

Tuy nhiên điều này cũng phụ thuộc nhiều vào các công ty. Một số công ty tận dụng các lập trình viên full stack, một số lại chia ra thành back và front end. Số khác thậm chí chia các lập trình viên front-end của họ sang mảng thiết kế. Các lập trình viên này sẽ tự thiết kế và xây dựng phần front-end cho ứng dụng.

![](https://cdn-images-1.medium.com/max/800/1*Y3XK4wTNDRfVtdBhVD0nlw.png)

## Phần 2: Mài dũa các kĩ năng front-end

Sau khi đã nắm được các kiến thức cơ bản về HTML, CSS và Javascript, bạn có thể đi sâu vào các kĩ năng nâng cao hơn của front-end. Phần này sẽ điểm qua các công cụ hữu ích và kĩ năng giúp bạn phát triển được khả năng của mình.

### Responsive design là kiến thức bắt buộc phải có trong thời đại smartphone

Khi website mới xuất hiện, bạn chỉ có thể xem chúng trên duy nhất một thiết bị là máy tính.

Điện thoại thông minh và dữ liệu di động vẫn chưa xuất hiện. Khi làm một website, bạn chỉ phải suy nghĩ về cách chúng hiển thị trên máy tính như thế nào.

Nhưng hiện nay theo thống kê của [Statcounter.com](http://gs.statcounter.com/press/mobile-and-tablet-internet-usage-exceeds-desktop-for-first-time-worldwide), số lượng người sử dụng điện thoại của họ để duyệt web đã nhiều hơn số lượng sử dụng máy tính.

![](https://cdn-images-1.medium.com/max/800/1*LJTR6eQvxIwaQZj4yN4MDQ.png)

Vậy nên chúng ta cần đảm bảo websites hoạt động và nhìn ổn định trên tất cả mọi thiết bị từ các màn hình lớn nhất cho tới những chiếc điện thoại nhỏ nhất.

Kĩ năng này gọi là **responsive design**. Nó có tên như vậy vì các thiết kế có thể "tùy biến" trên mọi loại thiết bị hiển thị.

Bạn có thể kiểm tra một website có responsive hay không bằng cách thay đổi độ rộng của cửa sổ trình duyệt để xem thiết kế đó hiển thị như thế nào.

Xây dựng một website có thể responsive cần chuẩn bị từ bước lên kế hoạch trong khâu thiết kế. Bạn phải cân nhắc mọi thứ hiển thị như thế nào trên tất cả thiết bị. Tới khâu lập trình, bạn phải sử dụng media queries (chính là @media) để điều khiển các thuộc tính CSS được sử dụng như thế nào tùy thuộc vào độ rộng cụ thể.

**Frameworks có thể giúp bạn xây dựng các website responsive nhanh hơn**

Bạn có thể tưởng tượng việc viết code CSS cho một trang web responsive mệt mỏi thế nào.

Nếu bạn không thể dành nhiều thời gian cho nó, hãy sử dụng một framework hỗ trợ responsive như [Bootstrap](https://getbootstrap.com/) hay [Zurb Foundation](https://foundation.zurb.com/).

Sức mạnh của các framework này là nó đã hỗ trợ sẵn các code CSS và Javascript tùy biến. Các thành phần như headlines và buttons đã được viết những đoạn code tùy biến phù hợp. Chúng cũng đi kèm các thành phần Javascript khác như cửa sổ popup dạng modal và thanh điều hướng.

Sử dụng các công nghệ đã được đảm bảo sẽ giúp bạn xây dựng website dễ dàng hơn. Điều duy nhất bạn cần lưu ý là không nên phụ thuộc quá nhiều vào các frameworks.

**Tài liệu tham khảo**

* [Ví dụ về thiết kết responsive từ Designmodo.com](https://designmodo.com/responsive-design-examples/)
* [Cơ bản về thiết kế responsive webiste của Google](https://developers.google.com/web/fundamentals/design-and-ux/responsive/)
* [Hướng dẫn Bootstrap 4 của W3Schools](https://www.w3schools.com/bootstrap4/bootstrap_get_started.asp)
* [Hướng dẫn Zurb Foundation](https://foundation.zurb.com/learn/tutorials.html)

### Sass sẽ giúp bạn tiết kiệm thời gian và sức lực khi viết CSS.

Một khi đã quen với CSS, tôi khuyên bạn nên học Sass vì nó rất tuyệt. Sass là viết tắt của "Syntactically Awesome Style Sheets" và được miêu tả trên trang chủ của nó là "[phần mở rộng của CSS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)". Nó giúp việc viết CSS dễ dàng hơn, linh động hơn và nhanh hơn.

Đừng hiểu nhầm tôi, CSS vẫn rất tốt. Nhưng khi bắt đầu làm, bạn sẽ nhận ra việc viết CSS thuần mệt mỏi thế nào. Và nếu bạn không siêu cẩn thận trong cách tổ chức các dòng code CSS, đoạn code của bạn sẽ trở nên rối như mớ bòng bong.

**Sass giúp bạn kiểm soát code tốt hơn, nhiều sức mạnh hơn.**

Dưới đây là vài ví dụ chứng minh Sass sẽ giúp cuộc sống bạn dễ dàng hơn nhiều

* **Mixins:** Thay vì việc phải sao chép và dán các đoạn code CSS giống nhau hàng nghìn lần, bạn có thể sử dụng mixins. Nó cho phép bạn tái sử dụng các style css.
* **Nesting:** Giúp bạn giảm số lượng code trùng lặp bằng cách hỗ trợ kế thừa.

![](https://cdn-images-1.medium.com/max/800/1*QeU_j0ZkguS_Sqyzc5hJcg.png)

Ngắn gọn, sử dụng Sass sẽ giúp bạn tiết kiệm thời gian và giảm sự khó chịu. Hãy học cách sử dụng nó.

**Tài liệu tham khảo**

* [Bắt đầu với Sass](http://thesassway.com/beginner/getting-started-with-sass-and-compass)
* [Cơ bản về Sass](http://sass-lang.com/guide)

Lưu ý: Vì các trình duyệt web không thể đọc được file Sass, bạn phải compile lại các file này về CSS. Để làm được điều đó, bạn phải sử dụng một thứ gọi là build tool và chạy nó trên máy tính của bạn. Vậy nê hãy tiếp tục với phần tiếp theo có chủ đề là **build tool!**.

### Build tools là gì?
![](https://cdn-images-1.medium.com/max/800/1*f5D9s0KsC4sIauxLEz9oUg.png)

Chắc hẳn bạn đã nghe tới một vài cụm từ sau: npm, Webpack, Grunt, Gulp, Bower, Yarn,... vân vân và mây mây.

Các công cụ này thường được nhắc tới với các tên như build tools, task runners, task managers, nói nôm na là "Bây giờ tôi phải cài thứ gì đây?!"

**Vài công cụ giúp bạn làm các công việc mệt mỏi.**

Các build tools như [Grunt](https://gruntjs.com/), [Gulp](https://gulpjs.com/) hay [Webpack](https://webpack.js.org/) thường được dùng để thực hiện các công việc sau:
* **Xử lý** các file Sass thành CSS
* **Gộp** nhiều file CSS hoặc Javascript thành một file CSS/Javascript lớn.
* **Nén** các files CSS, Javascript, thậm chí là ảnh.
* **Tự động** tải lại trình duyệt sau khi thay đổi CSS hay Javascript.

Bạn hoàn toàn có thể tự làm các công việc trên. Nhưng việc phải làm đi làm lại những thứ đó khi bạn chỉ tạo ra một thay đổi nhỏ trong file CSS hay Javascript có thể làm bạn phát điên.

### Tôi nên dùng build tool nào?
Thời điểm hiện tại Webpack áp đảo toàn bộ các build tools khác, nhưng Grunt và Gulp vẫn được sử dụng. Tôi chắc chắn sẽ học Webpack, nhưng học thêm Grunt hay Gulp cũng là lựa chọn không tồi (Gulp nhanh hơn và việc chạy nó cũng dễ dàng hơn)

### Một số công cụ để cài thêm các gói packages cho bạn.
Để thực hiện các tác vụ trên, bạn thường sẽ phải tải về và cài đặt các gói hỗ trợ hay packages.

![](https://cdn-images-1.medium.com/max/800/1*g_5-PNq-uB6f1ooeD-7gNA.png)

Đó là lí do bạn phải sử dụng các tool như [npm](https://www.npmjs.com/) (Node Package Manager), [Bower](https://bower.io/), hay [Yarn](https://yarnpkg.com/en/). Đây là những công cụ cho phép bạn cài đặt các packages trên máy tính chỉ bằng cách gõ các dòng lệnh trong cửa sổ command line. Hiểu đơn giản thì chúng là những tools giúp bạn tải về tools khác.

Bạn nên học cách sử dụng **npm** vì nó là trình quản lý package chiếm hữu thị phần hiện giờ. **Bower** cũng là một trong những công cụ quản lý packages đầu tiên, nhưng nó đã chính thức bị thay thế - nhà sáng lập Bower.io khuyến khích mọi người sử dụng **Yarn**.
Yarn là công cụ có nhiều điểm tương đồng với npm được tạo bởi Google, Faceboook, và một số thành viên khác [hứa hẹn sẽ sửa chữa các vấn đề npm gặp phải](https://scotch.io/tutorials/yarn-package-manager-an-improvement-over-npm). Mặc dù số lượng người sử dụng Yarn vẫn còn ít nhưng tôi khuyên bạn nên thử vì nó đang dần phổ biến.

**Tài liệu tham khảo**
* [Cài đặt Webpack +2.0](https://codeburst.io/easy-guide-for-webpack-2-0-from-scratch-fe508a3ce44e)
* [Các công cụ Javascript - Tương lai của JS và các build tools](https://blog.qmo.io/javascript-tooling-the-evolution-and-future-of-js-front-end-build-tools/)
* [Cheat sheet NPM và Yarn](https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc)
### Mọi người đều yêu thích các frameworks của Javascript.

Bạn có thể đã để ý tới một vài frameworks của Javascript, các thư viện, toolkit,... tất cả đều có cái tên kết thúc bằng ".JS". Trước tiên hãy cùng xem lại định nghĩa một framework của Javascript là gì cái đã.

Tùy thuộc vào người bạn nói chuyện cùng, các khái niệm framework, thư việc, bộ công cụ có thể là như nhau ([điều này vẫn đang được tranh cãi](https://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library)). Nhưng tựu chung chúng đều là những công cụ cần thiết để hỗ trợ bạn trong công việc xây dựng một trang web.

**Framework là một cấu trúc được xây sẵn để bạn có thể phát triển ứng dụng của bạn.**

Nói đơn giản framework là một hệ thống được tạo bởi người khác, bạn chỉ việc sử dụng chúng.  Để sử dụng framework, bạn phải cài đặt nó trên website của bạn. Sau đó dựa trên các cấu trúc có sẵn của chúng, bạn thêm thắt những thứ do bạn tự xây nên để dựng lên ứng dụng/website của mình. Sử dụng framework giống như việc mua một căn nhà có đầy đủ cấu trúc từ nền, khung, mái nhà vậy, nhưng căn nhà đó vẫn chưa hoàn thiện. Bạn cần phải thêm điện, nước, xây cabin, sơn tường và trang trí. 

Một vài framework front-end điển hình của Javascript là [React](https://reactjs.org/), [Vue](https://vuejs.org/) và [Angular](https://angular.io/).

**Thư viện là tập hợp các công cụ được thiết kế sẵn để bạn thêm vào cấu trúc của mình.**

Thư viện là tập hợp các thành phần riêng lẻ bạn có thể lấy ra và thêm vào hệ thống của mình.

**Đây là sự khác biệt cơ bản của framework và thư viện**:  framework là một cấu trúc được dựng sẵn, còn thư viện bản thân nó không phải một cấu trúc. Thư viện chỉ cung cấp thêm các chức năng bạn có thể thêm vào hệ thống của mình.

Để tiếp tục xây một căn nhà, bạn có thể coi thư viện như các dụng cụ bạn mua để đặt vào nhà như bếp, vòi tắm, điều hòa,... Bạn cần phải cài đặt chúng trong căn nhà để hoạt động.

Một ví dụ của thư viện là jQuery.  [jQuery](http://jquery.com/) là một thư viện Javascript mà bản thân nó không có cấu trúc, nhưng lại chứa [300 hàm](http://api.jquery.com/) khác nhau bạn có thể dùng.

**Nhắc lại lần nữa, những định nghĩa về thư viện và framework trên không được tất cả mọi người nhất trí.**

bản thân React và jQuery là các thư viện, còn Angular và Vue là frameworks.

### Ba ông lớn trong Javascript framework: Angular, React, Vue
![](https://cdn-images-1.medium.com/max/800/1*8lqOL3IOvK879eu64unZCA.png)

Năm 2010 có sự bùng nổ của các framework kết thúc bằng ".js", gần như mỗi tháng đều có một framework mới.

Tuy nhiên khi tiến gần tới 2020, chúng ta chỉ còn lại ba kẻ chiến thắng là Angular, React và Vue

**Các framework Javascript bắt đầu như một xu hướng sớm nổi chóng tàn, nhưng tới nay nó vẫn tồn tại vững chắc.**

Angular, React, Vue đều đang phát triển, và bản thân Javascript đang ngày càng phổ biến. Javascript hiện là [công nghệ được sử dụng nhiều nhất](https://insights.stackoverflow.com/survey/2017#most-popular-technologies) trong 5 năm gần đây theo thống kê hàng năm của Stack Overflow. Stack Overflow đã công bố những xu hướng công nghệ dựa vào số lượng câu hỏi hàng tháng. Có thể thấy Angular chiếm tỉ lệ nhiều nhất. Cả Angular và React đều phát triển đều đặn mỗi năm.

![](https://cdn-images-1.medium.com/max/800/1*Z2fsSGzW1zz8BZwaku8CCg.png)

Bảng khảo sát [các giai đoạn của Javascript](https://stateofjs.com/2017/front-end/results) cho thấy React có số lượng lập trình viên sử dụng và yêu quý nhiều nhất, theo sau là Angular. Angular có vẻ không còn thú vị và được nhiều người muốn tái sử dụng nữa. Vue có số lượng người sử dụng ít hơn, nhưng lại dẫn đầu trong công nghệ các lập trình viên muốn thử trong tương lai nhiều nhất. Có thể đoán trước được Vue sẽ là một tay chơi lớn trong vài năm tới. Tuy nhiên tôi nghĩ rằng bộ ba này vẫn sẽ tồn tại vững chắc trong tương lai, ít nhất là trong vài năm tới.

### TL,DR: framework nào tôi nên sử dụng?

Tùy thuộc vào bạn. Nếu bạn đang tìm kiếm một công việc lập trình web toàn thời gian, tôi khuyên bạn nên xem danh sách các công việc tại địa phương để tìm hiểu framework nào được nhắc tới nhiều nhất. Nếu bạn chỉ đang bắt đầu học mà chưa có mục tiêu cụ thể, Vue là một khởi đầu tốt. Nó rất nhẹ và có các ghi chép hướng dẫn khá tốt. Tuy nhiên cá nhân tôi sẽ không chỉ học mỗi Vue. Bạn nên học thêm React hoặc Angular, phụ thuộc vào sở thích cá nhân của bạn.

**Tài liệu tham khảo**
* [Các framework, thư viện và công cụ Javascript tốt nhất năm 2017](https://www.sitepoint.com/top-javascript-frameworks-libraries-tools-use/)
* [Sổ tay hướng dẫn lựa chọn Javascript framework](https://webdesign.tutsplus.com/tutorials/the-noobs-guide-to-choosing-a-javascript-framework--cms-28538)
### Quay trở lại với back-end nào
**Ngôn ngữ nào tôi nên học đầu tiên?**

Có hàng ngàn ngôn ngữ back-end. Một vài ngôn ngữ đã tồn tại lâu đời, vài ngôn ngữ khác mới chỉ ra đời gần đây. Điều này khiến việc lựa chọn ngôn ngữ để bắt đầu khá khó khăn. Tôi sẽ đề xuất một vài nguyên tắc có thể giúp bạn đưa ra lựa chọn tốt hơn:
* Chọn ngôn ngữ **dễ học**: nó phải là ngôn ngữ dễ học, có các ghi chép hướng dẫn cẩn thận, có hệ thống hỗ trợ online
* Chọn ngôn ngữ **liên quan** tới mục tiêu nghề nghiệp của bạn
* Chọn một ngôn ngữ **thú vị**. Học lập trình web rất khó khăn, sẽ không có nghĩa lý gì để ép buộc bản thân bạn phải học một ngôn ngữ bạn không thích.

**Điều quan trọng ban cần phải nhớ đó là bạn không cần phải học hết TẤT CẢ các ngôn ngữ.**

Nếu bạn là người mới bắt đầu tôi khuyên bạn nên tập trung vào một ngôn ngữ trước đã. **Tất cả ngôn ngữ lập trình đều có vài điểm chung.**

Ví dụ bạn đều có thể viết các vòng lặp "for" trong Javascript, PHP, C# và Python. Một khi bạn đã làm quen với các nguyên tắc cơ bản của lập trình, việc chuyển đổi qua lại giữa các ngôn ngữ sẽ trở nên dễ dàng hơn. Tôi hi vọng sau khi biết điều này sẽ giúp bạn thấy thoải mái hơn trong việc chọn lựa ngôn ngữ khi học.

Cùng xem qua một vài ngôn ngữ back-end phổ biến nào

**Java**

[Java](https://www.oracle.com/java/index.html) là một ngôn ngữ ổn định được sử dụng rộng rãi và đã tồn tại khá lâu đời. Nó nằm trong top bảng xếp hạng [TIOBE](https://www.tiobe.com/tiobe-index/) từ năm 2001 (TIOBE là bảng xếp hạng những ngôn ngữ lập trình dựa trên số lượng tìm kiếm)

![](https://cdn-images-1.medium.com/max/800/1*HqJzc1ZlB4pBPQgBfXPYWg.png)

Ngoài ra Java cũng xếp vị trí thứ ba trong [bảng xếp hạng những ngôn ngữ được sử dụng nhiều nhất](https://insights.stackoverflow.com/survey/2017#technology-programming-languages) trên Stack Overflow và có [số lượng câu hỏi nhiều thứ hai](https://stackoverflow.com/tags) trên trang web này

![](https://cdn-images-1.medium.com/max/800/1*68BlQUD0zRq2YGf__-O2Vg.png)

Rất nhiều các công ty công nghệ lớn sử dụng [Java](https://en.wikipedia.org/wiki/Programming_languages_used_in_most_popular_websites) cho website của họ: Google, Youtube, Facebook, Amazon, Twitter, và nhiều trang web khác. Lý do chính là Java rất nhanh và có thể xử lý tốt khi mở rộng quy mô trang web. Nó cũng là một ngôn ngữ dễ bảo trì. Twitter ban đầu được viết bằng Ruby on Rails nhưng tới năm 2015 họ đã chuyển sang [Scala](https://www.quora.com/Why-did-Twitter-switch-to-a-Java-based-front-end-after-successfully-using-Ruby-on-Rails-with-200-million-users) để có thể mở rộng quy mô (Scala là ngôn ngữ chạy trên Java Virtual Machine)

**C# (C Sharp)**

[C#](https://docs.microsoft.com/en-us/dotnet/csharp/getting-started/introduction-to-the-csharp-language-and-the-net-framework) tạo ra bởi Microsoft và được coi như đối thủ của Java. Có thể thấy thời đại hoàng kim của C# là năm 2009 trên bảng xếp hạng xu hướng của Stack Overflow nhưng tới nay nó lại đang giảm dần.

![](https://cdn-images-1.medium.com/max/800/1*ddhjNfjMedPiY8QK_6Z6Cw.png)

Nhưng tôi không cho rằng C# sẽ biến mất. Nó là ngôn ngữ hướng đối tượng mạnh mẽ, có số lượng tags nhiều thứ ba trên [bảng xếp hạng các tags](https://stackoverflow.com/tags) của Stack Overflow. Nó cũng nằm thứ ba trong bảng xếp hạng các ngôn ngữ cần nhiều nguồn nhân lực trong tháng 12 năm 2017.

![](https://cdn-images-1.medium.com/max/800/1*uop6ItxTX3wFkTQnuFZOvA.png)

C# được sử dụng rộng rãi trong các ứng dụng như ứng dụng trên Windows hay lập trình Android. Nó cũng được sử dụng nhiều trong lập trình game bằng [Unity](https://www.quora.com/What-is-unity-game-engine/answer/Harshal-B-Kolambe). Nếu bạn hứng thú với lập trình Android hay game, C# là một lựa chọn không tồi.

**Node.js**
Javascript đang là ngôn ngữ được sử dụng nhiều nhất theo báo cáo của Stack Overflow trong 5 năm qua. Một phần nguyên do của điều này cũng từ [NodeJS](https://nodejs.org/en/), một công nghệ chiếm lĩnh top đầu trong [danh sách](https://insights.stackoverflow.com/survey/2017#technology-frameworks-libraries-and-other-technologies) các framework, thư viện được dùng nhiều nhất trong năm 2017.

![](https://cdn-images-1.medium.com/max/800/1*VOHEKe0YQunX-g6USjpMVg.png)

Bản thân NodeJS được mô tả là "Javascript runtime", đơn giản nó là Javascript chạy phía back end.

Ban đầu nó được sử dụng như một [giải pháp](https://www.infoworld.com/article/3210589/node-js/what-is-nodejs-javascript-runtime-explained.html) hiệu quả hơn server Apache. Kể từ khi được ra đời năm 2009, Node.js đang ngày càng được sử dụng nhiều do tốc độ và sự gọn nhẹ của nó.

Các lập trình viên node thường sử dụng framework [Express](https://expressjs.com/) để xây dựng ứng dụng web. Express.js là một framework gọn nhẹ dành cho Node.js

Sử dụng Node và Express ở backend, và Angular hay React phía front-end, bạn có thể tự gọi bản thân là lập trình viên Javascript full stack được rồi đấy! Sự phối hợp các công nghệ này hiện đang rất phổ biến, [đặc biệt là ở các startup](https://codingvc.com/which-technologies-do-startups-use-an-exploration-of-angellist-data).

**Python**

[Python](https://www.python.org/) lần đầu xuất hiện vào năm 1991 và thường là ngôn ngữ đầu tiên mà nhiều sinh viên lần đầu tiếp xúc với lập trình học. Do sự [dễ đọc](https://en.wikipedia.org/wiki/Python_%28programming_language%29) và sử dụng các từ khóa bằng tiếng Anh, Python được coi là một ngôn ngữ dễ học. Dưới đây là một vài framework Python bạn có thể sử dụng
* [Django](https://www.djangoproject.com/) với nhiều tính năng có sẵn 
* [Flask](http://flask.pocoo.org/) gọn nhẹ và linh động

Sự phổ biến của Python đang tăng dần những năm trở lại đây. Tính tới thời điểm bài viết này, nó nằm ở [vị trí thứ 4](https://www.tiobe.com/tiobe-index/) trong bảng xếp hạng TIOBE. Tới 2017 nó đã nằm ở [vị trí thứ 2](https://octoverse.github.com/) trong bảng xếp hạng các ngôn ngữ có số lượng pull request gửi lên GitHub nhiều nhất, dựa vào thống kê năm 2017 của họ.

![](https://cdn-images-1.medium.com/max/800/1*FK5xi-zleQCUafgucPamlw.png)

Tháng 9 vừa qua Stack Overflow thống kê rằng data science, machine learning và các nghiên cứu học thuật là lý do chính cho sự phát triển của Python. Kể cả khi bạn không phải là data scientist, kĩ năng làm việc và thay đổi các dữ liệu cũng có thể trở nên rất hữu ích. Alexus Strong của Code Academy [viết](http://news.codecademy.com/why-learn-python/):

> "Python có sức hấp dẫn với những người ngoại đạo vì nó giúp việc phân tích dữ liệu trở nên dễ dàng"

Nếu bạn tò mò về data sciene hay machine learning, Python sẽ là lựa chọn tốt cho bạn vì đây là các lĩnh vực đang ngày càng phát triển.

**Ruby**

Ra đời vào năm 1995, [Ruby](https://en.wikipedia.org/wiki/Ruby_%28programming_language%29) bắt đầu thu hút sự chú ý vào đầu những năm 2000 khi startup [Basecamp](https://basecamp.com/about) tạo ra framework [Ruby on Rails](http://rubyonrails.org/). Cùng với cú pháp thân thiện và dễ đọc của Ruby, Rails khiến việc xây dựng các ứng dụng web trở nên nhanh chóng và dễ dàng. Ruby on Rails trở nên phổ biến và là sự lựa chọn hàng đầu cho rất nhiều startup như Codepen.io, GitHub, và [Shopify](https://basecamp.com/about).

Tuy nhiên Ruby lại không được sử dụng nhiều như các ngôn ngữ kể trên. Năm ngoái nó nằm ở [vị trí thứ 10](https://insights.stackoverflow.com/survey/2017#technology-programming-languages) trên bảng xếp hạng của Stack Overflow lẫn TIOBE. Lí do là Ruby on Rails không hoạt động tốt với những trang web cần sức tải lớn, điều này dẫn tới việc nhiều startup chuyển sang các ngôn ngữ khác khi họ bắt đầu lớn mạnh (Twitter đã chuyển sang Java là một ví dụ điển hình)

Tuy Ruby không nằm top đầu trong những bảng xếp hạng nhưng nó là lựa chọn tốt để bạn bắt đầu học một ngôn ngữ lập trình. Nếu bạn hứng thú với thế giới startup hay địa phương của bạn có nhiều công việc Ruby (hay là bạn muốn làm việc ở Framgia), hãy cân nhắc học Ruby và Ruby on Rails

**PHP**

PHP là ngôn ngữ nhiều người rất thích chì chiết.

Trái ngược với số lượng câu hỏi nhiều kinh khủng khiếp "[PHP chết chưa](https://www.quora.com/Is-PHP-dead-What-is-the-job-outlook-and-future-of-PHP-in-the-next-five-years)" trên Quora thì đến nay đây vẫn là ngôn ngữ được sử dụng rộng rãi phía backend. Khảo sát của [W3Techs.com](https://w3techs.com/technologies/overview/programming_language/all) cho thấy 83%  websites sử dụng PHP (ngôn ngữ theo sau là ASP.net với 14%)

![](https://cdn-images-1.medium.com/max/800/1*Wsn6WoqlDCLANKqny2TzIw.png)

Các hệ thống quản lý CMS là lý do chính giải thích cho thị phần của PHP. Ba CMS nổi tiếng là WordPress, Joomla, Drupal đều được xây dựng bằng PHP. Bản thân WordPress đã chiếm thị phần rất lớn trong CMS, [29.5%!](https://w3techs.com/technologies/overview/content_management/all)

Nếu bạn đang tìm kiếm công việc thì lập trình WordPress có thể là một lựa chọn tốt, bạn sẽ phải tùy biến các website và xây dựng giao diện, plugin cho chúng.

Ngoài các hệ thống quản lý, PHP có các framework giúp việc lập trình trở nên nhanh chóng và dễ dàng. [Laravel](https://laravel.com/), một framework ra đời năm 2011 hiện là framework phổ biến nhất.

**Tài liệu tham khảo**
* [Nhập môn lập trình backend](https://www.upwork.com/hiring/development/a-beginners-guide-to-back-end-development/)
* [Các framework backend](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks)
* [Ngôn ngữ lập trình nào phù hợp nhất cho tôi?](http://www.bestprogramminglanguagefor.me/)

## Làm việc với dữ liệu và cơ sở dữ liệu

Cơ sở dữ liệu có thể trông nguy hiểm nếu bạn chưa làm quen với chúng, Tuy nhiên nếu nghĩ lại, chắc chắn bạn đã từng sử dụng và làm việc với dữ liệu ít nhất một lần trong đời. Nếu bạn sử dụng Excel để tổ chức dữ liệu, tạo bảng biểu, bạn đã làm những công việc gần giống với chức năng của một cơ sở dữ liệu

**Tôi cần học gì để sử dụng cơ sở dữ liệu**

May mắn là bạn không phải học nhiều ngôn ngữ. Ngôn ngữ chính sử dụng trong các cơ sở dữ liệu là [SQL](https://en.wikipedia.org/wiki/SQL) (đọc là sequel)

SQL (Structured Query Language) được tạo ra những năm 1970 bởi IBM và sử dụng trong các [cơ sở dữ liệu quan hệ.](https://en.wikipedia.org/wiki/Relational_database). Các mô hình quan hệ là cách bạn tổ chức dữ liệu thành hàng và cột (hãy coi chúng như một bảng Excel). Mỗi cột được thiết kế cho một kiểu dữ liệu và nó có thể đòi hỏi dữ liệu phải đúng định dạng. Và mỗi hàng, hay một bản ghi, chứa một ID riêng biệt hay các khóa.

![](https://cdn-images-1.medium.com/max/800/1*axy8IyyF8aiv3NKDQk5QBw.png)

Các bản ghi được lưu trữ trong thành một tập hợp gọi là bảng. Tập hợp các bảng tạo nên toàn bộ khung cơ sở dữ liệu 

Có ba hệ cơ sở dữ liệu SQL chính là:
* [MySQL](https://www.mysql.com/) (sử dụng cho PHP và các ứng dụng open source)
* [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017) (sử dụng chủ yếu trong các ứng dụng .NET)
* [PostgreSQL](https://www.postgresql.org/) (open source)

**NoSQL**

Mặc dù SQL vẫn chiếm lĩnh thị phần lớn trong cơ sở dữ liệu, còn một ngôn ngữ khác là NoSQL (non SQL). Đúng như cái tên, cơ sở dữ liệu NoSQL đối lập với các cơ sở dữ liệu SQL truyền thống. [NoSQL](https://en.wikipedia.org/wiki/NoSQL) không có quan hệ, và chúng không ép buộc các cấu trúc như SQL. Thay vào đó bạn có thể lưu trữ mọi loại dữ liệu một cách tự do và linh hoạt hơn trong hệ thống của mình. Điều này giúp hệ thống của bạn xử lý nhanh hơn và phù hợp với các ứng dụng phức tạp, đòi hỏi xử lý lớn. Đổi lại bạn sẽ không có sự ổn định dữ liệu. Craig Buckler của Sitepoint đã [viết](https://www.sitepoint.com/sql-vs-nosql-differences/):

> NoSQL linh hoạt và thoải mái hơn, nhưng việc có thể lưu trữ mọi loại dữ liệu ở bất kì đâu có thể dẫn tới các vấn đề bất ổn.

NoSQL nổi lên từ những năm 2000 do các công ty lớn như Facebook và Amazon cần xử lý và lưu trữ dữ liệu nhanh hơn. [MongoDB](https://www.mongodb.com/) là một hệ thống NoSQL được sử dụng nhiều nhất. Các hệ thống khác như Cassandra, Elasticsearch vafCouchbase cũng được sử dụng nhiều theo thống kê của [Hackernoon](https://hackernoon.com/top-4-nosql-databases-infographic-b6acc389befc).

**SQL hay NoSQL?**

Bạn có thể sẽ đọc được những bài tranh luận liệu NoSQL có thay thế SQL hay cái nào thì tốt hơn. Sự thật là cả hai cơ sở dữ liệu đều có điểm mạnh và điểm yếu riêng. Giống như các vấn đề trên, sự lựa chọn đều nằm ở yêu cầu project và công việc. Cá nhân tôi khuyến khích nên học cả SQL và NoSQL

**Tài liệu tham khảo**
* [Lịch sử SQL](https://www.thebalance.com/what-is-sql-and-uses-2071909)
* [SQLCourse.com](http://www.sqlcourse.com/intro.html)
* [Sự khác biệt giữa SQL và NoSQL](https://medium.com/xplenty-blog/the-sql-vs-nosql-difference-mysql-vs-mongodb-32c9980e67b2)
* [Giải thích về NoSQL](https://www.mongodb.com/nosql-explained)
## Chạy website trên server
![](https://cdn-images-1.medium.com/max/800/0*zZFtoXHQdZd2pZCC.gif)

Như đã nói ở trên, server là các máy tính lưu trữ các files của website và các tài nguyên khác như cơ sở dữ liệu. Để một website có thể truy cập được trên Internet, nó cần phải cài đặt trên server. Dưới đây là vài việc bạn cần làm trước khi có thể truy cập website của bạn trên Internet.

**Tên miền và chứng thực SSL**

Tên miền là địa chỉ trang web, như Google.com, Wikipedia.com. Để có được một tên miền, bạn phải chọn một tên có thể sử dụng và mua lại chúng từ các dịch vụ tên miền như như [Namecheap.com](https://www.namecheap.com/) hay [Google Domains](https://domains.google/#/). Các công ty này đăng kí các miền với [ICANN](https://en.wikipedia.org/wiki/ICANN). ICANN là một tổ chức quản lý DNS (hệ thống tên miền) và IP (giao thức internet) của internet toàn cầu.

Ngoài tên miền, bạn cũng cần kiếm một chứng nhận SSL (Lớp cổng bảo mật) cho website của bạn. SSL sẽ [mã hóa](https://www.digicert.com/ssl/) các truy cập tới website và giúp website tránh khỏi các cuộc tấn công mạng.

**Không gian lưu trữ**

![](https://cdn-images-1.medium.com/max/800/1*XgwG8TIIqH_6RHDMiOO6ew.jpeg)

Sau khi đã có tên miền, bạn cần mua lại không gian lưu trữ server. Có một số sự khác biệt giữa các dịch vụ hosting web.

* **Shared server**: đây là sự lựa chọn rẻ nhất, rơi vào tầm từ vài đô la cho tới 20 đô một tháng. Như cái tên, bạn sẽ chia sẻ không gian server với các website "hàng xóm". Điểm mạnh là nó rẻ, nhưng điểm trừ là tốc độ truy cập sẽ chậm và khả năng bị sập cũng cao hơn. Một số dịch vụ host nổi tiếng là [SiteGrounds](https://www.siteground.com/), [BlueHost](https://www.bluehost.com/) và [WP Engine](https://wpengine.com/).
* **Cloud servers**: Cloud hosting là một giải pháp khá mới mẻ. Đây là hệ thống mà các máy chủ đều dùng chung dữ liệu với nhau. Mỗi người dùng sẽ nhận được một máy chủ ảo để lấy dữ liệu từ kho dữ liệu chung. Nó giúp việc cài đặt trở nên linh hoạt và băng thông có thể mở rộng nhanh chóng. Một công ty là [Digital Ocean](https://www.digitalocean.com/) làm việc chủ yếu với cloud server. Giá thành dịch vụ phụ thuộc vào quy mô server của bạn, có thể từ vài đô một tháng tới gần nghìn đô.
* **VPS**: VPS giống với cloud hosting ở điểm mỗi khách hàng có một máy chủ ảo riêng và mọi người đều chia sẻ một máy chủ vật lý. Nó tốt hơn shared hosting vì bạn được bố trí riêng một vùng cho các tài nguyên trên máy chủ của bạn. Tuy vậy nó lại hơi đắt, từ 20 đến 60 đô một tháng.
* **Dedicated servers**: Bạn sẽ có toàn bộ một máy chủ vật lý. Dĩ nhiên lựa chọn này rất đắt đỏ. Chúng là những máy chủ được quản lý. Điều đó đồng nghĩa với việc công ty cung cấp dịch vụ sẽ bảo trì và làm các tác vụ khác cho bạn. Dedicated hosting thường tốn khoảng vài trăm đô la một tháng.

**Thiết lập máy chủ và bảo trì**

Một khi bạn đã có tên miền và không gian lưu trữ, bạn cần phải thiết lập một số thứ cho trang web của bạn trên server. Nó có nghĩa là bạn phải có đường dẫn từ tên miền tới địa chỉ IP máy chủ của bạn, thiết lập các files của websites và cơ sở dữ liệu cùng một số cài đặt khác. Số lượng công việc bạn phải làm sẽ phụ thuộc vào các dịch vụ máy chủ bạn mua. Dịch vụ shared server đơn giản nhất thường chỉ tốn một cú click chuột, sau đó mọi thứ sẽ được tự động cài đặt cho bạn. Một số server khác như Digital Ocean lại yêu cầu bạn phải tự cài đặt mọi thứ.

**Deploy files lên máy chủ**

Bạn có thể tự hỏi làm thế nào để các files trong máy tính của bạn xuất hiện được trên máy chủ. Bạn có thể thực hiện việc này bằng cách sử dụng một giao thức (có thể hiểu là cách thức để truyền files hoặc các dữ liệu khác từ máy chủ này tới máy chủ khác).

**HTTP**, cách mà trình duyệt của bạn tải website, là một loại giao thức. HTTP là viết tắt của Hypertext Transfer Protocol.

Cách đơn giản nhất là sử dụng giao thức [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) (File Transfer Protocol). Tuy nhiên hiện nay việc sử dụng FTP không còn được khuyến khích nữa vì bảo mật kém. Ngày nay mọi người sử dụng giao thức khác được bảo mật tốt hơn là FTPS (FTP over SSL) hay SFTP.

Để FTP/SFTP hoạt động, bạn cần tạo một tài khoản trên máy chủ. Sau đó kết nối tới máy chủ qua địa chỉ IP của máy chủ và sử dụng tài khoản của bạn để đăng nhập.

Để truyền files qua FTP/SFTP bạn có thể dùng các phần mềm như [Filezilla](https://filezilla-project.org/) hoặc [CyberDuck](https://cyberduck.io/). Những phần mềm này có giao diện đồ họa giúp việc tải lên/xuống các files từ máy tính tới server dễ dàng hơn.

**Công cụ deploy**

![](https://cdn-images-1.medium.com/max/800/1*1jvILZIbneS98ISyxfynXQ.jpeg)

Việc phải tự tay tải files lên máy chủ mỗi lần bạn thay đổi code rất chán ngán. Thêm nữa nếu nhiều người cùng làm việc trên một file và tải chúng lên đồng thời thì sẽ thế nào? May mắn là bạn có thể cài đặt công đoạn deploy thông qua đường dẫn tới repository trên Git của bạn.

Công cụ deploy này sẽ lưu các cài đặt FTP/SFTP của bạn, và mỗi khi bạn đẩy một thay đổi lên nhánh master trên Git, công cụ này sẽ tự tải file đó cho bạn. Như vậy bạn không cần phải nhớ bạn đã thay đổi file nào để tự tay tải lên. Một website phức tạp có nhiều người cùng làm việc sẽ có nhiều công cụ và hệ thống hỗ trợ việc deploy tốt hơn để có thể giúp công việc deploy của bạn ổn định.

Các hệ thống này nằm ngoài phạm vi của bài viết nhưng tôi sẽ để cho bạn từ khóa tìm hiểu ở đây là [continuous integration](https://aws.amazon.com/devops/continuous-integration/)

**Tài liệu tham khảo**
* [Quá trình đăng ký tên miền](https://whois.icann.org/en/domain-name-registration-process)
* [8 dịch vụ hosting phổ biến](https://www.thebalance.com/types-of-web-hosting-services-2532072)
* [Continuous integration và continuous delivery và continuous deployment](https://www.atlassian.com/continuous-delivery/ci-vs-ci-vs-cd)

**Chúc mừng**

![](https://cdn-images-1.medium.com/max/800/0*hDquyfV9gO45z7Vf.gif)

Nếu bạn đọc được tới dòng này thì chúc mừng, bạn đã nắm được cơ bản mọi thứ về cách xây dựng một website rồi đó. Tuy nhiên mọi thứ vẫn chưa kết thúc đâu. Dưới dây là danh sách các tài liệu mà tôi nghĩ sẽ phù hợp với bạn khi bạn bắt đầu học lập trình nói chung cũng như lập trình web nói riêng.

## Các nguồn tài liệu học tập
Tôi sẽ liệt kê một số bài hướng dẫn phổ biến và phù hợp dành cho bạn ở phần tiếp theo này

**Các khóa học lập trình web**

![](https://cdn-images-1.medium.com/max/800/1*YPpb4B_k1FehpeRNxDApzw.png)

[freeCodeCamp](https://www.freecodecamp.org/): là một tổ chức phi lợi nhuận cung cấp các bài học miễn phí cho những người muốn trở thành lập trình viên web. Chương trình học của họ trải dài từ front tới back end (sử dụng Node và Express) cùng nhiều thứ khác. Nhiều người đã kiếm được việc sau khi học trên freeCodeCamp. Bạn cũng có thể đóng góp cho các project [open source](https://www.freecodecamp.org/nonprofits/) của họ trên GitHub. Một trong những điểm mạnh của freeCodeCamp là nó có cộng đồng rất lớn, với bảng tin và các nhóm trên facebook, bạn có thể dễ dàng tìm sự hỗ trợ trong quá trình học.

Bạn có thể đọc một số bài nhận xét về freeCodeCamp trên [Quora](https://www.quora.com/How-did-Free-Code-Camp-change-your-life) và [Reddit](https://www.reddit.com/r/learnprogramming/comments/4cen3v/a_review_of_freecodecamp_the_first_25_hours_from/).

![](https://cdn-images-1.medium.com/max/800/0*4nEbzCm3SWCGX_jJ.png)

**Colt Steele’s Web Developer Bootcamp** ([link](https://www.udemy.com/the-web-developer-bootcamp/?siteID=T4jMTDexBoM-4eq5n6HlbL7PAfBCL8SWqw&LSNPUBID=T4jMTDexBoM) / [link](https://www.udemy.com/the-web-developer-bootcamp/))

Cold từng là người hướng dẫn ở các trại code. Hiện tại anh ấy đã dạy nhiều khóa học về lập trình web trên Udemy và đa số các khóa học đều dược đánh giá tích cực. Các khóa học của anh ấy sẽ bắt đầu từ những kiến thức cơ bản cho tới lập trình full stack(sử dụng Node và Express phía back-end) với nội dung được cập nhật liên tục. Bạn có thể đọc bài đánh giá về khóa học của anh ấy trên trang của [Udemy](https://www.udemy.com/the-web-developer-bootcamp/#reviews) và trên một bài viết trong [diễn đàn của freeCodeCamp](https://forum.freecodecamp.org/t/the-web-developer-bootcamp-udemy-review/61595/4)

![](https://cdn-images-1.medium.com/max/800/0*8mRX8qP022AC1ygz.png)

**Udacity**

Udacity cung cấp cả các [khóa học miễn phí](https://www.udacity.com/courses/web-development) lẫn những chương trình thu phí như [Nanodegrees](https://www.udacity.com/nanodegree). Nanodegrees là chương trình học cấp tốc (12 giờ/tuần) giúp bạn có thể tự tạo một trang portfolio và nhận được nhiều sự hỗ trợ hơn các khóa miễn phí. Nhưng chương trình này không hề rẻ, bạn phải trả khoảng 199 đô một tháng.

Nếu hứng thú bạn có thể đọc một vài bài đánh giá về Nanodegree trên [Quora](https://www.quora.com/Are-Udacity-Nanodegrees-worth-it-for-finding-a-job) hoặc [Hacker News](https://news.ycombinator.com/item?id=9313088), bài viết này trên[ Quora](https://www.quora.com/What-is-the-difference-between-a-Udacity-nanodegree-degree-program-and-free-courses) cũng trả lời về sự khác biệt giữa các khóa học miễn phí của Udacity với chương trình Nanodegree

![](https://cdn-images-1.medium.com/max/800/0*4v3jYDpiexq_tDvo.png)
**Treehouse** : [Team Treehouse](https://teamtreehouse.com/tracks) là một website học lập trình nổi tiếng. Họ không có các nội dung miễn phí, nhưng lại có mô hình thuê bao. Treehouse cung cấp một gói 25 đô một tháng và bạn có thể học các khóa học không giới hạn. Bạn có thể dừng thuê bao của mình nếu bạn muốn nghỉ ngơi trong vài tháng và quay lại khi bạn đã sẵn sàng

Ngoài các khóa học riêng lẻ, họ còn có các chương trình dài hơi như lập trình web bằng Java hay Lập trình Frontend gồm các khóa học được lựa chọn phù hợp với chủ đề.

![](https://cdn-images-1.medium.com/max/800/0*eEoOMNC5kTo9Eoas.png)

**[Udemy](https://www.udemy.com/courses/development/web-development)**: Udemy là một trong những trang học trực tuyến lớn nhất và các khóa học của họ không chỉ giới hạn trong lĩnh vực lập trình mà còn nhiều lĩnh vực khác. Bạn có thể trả tiền cho từng khóa học và họ cũng thường có các chương trình giảm giá chỉ còn 10 tới 20 đô một khóa. Tất nhiên với số lượng khóa học lớn nên chất lượng của Udemy khá tạp nham, bạn cần suy nghĩ kĩ trước khi mua một khóa học. Tôi khuyên mọi người nên đọc kĩ đánh giá các khóa học trên Udemy trước khi mua chúng.

![](https://cdn-images-1.medium.com/max/800/0*ExV7N_TGY8rzoH5B.png)

**[Wes Bos](http://wesbos.com/courses/)** là một người hướng dẫn lập trình web đã tạo vài khóa học phổ biến gần đây. Một khóa học tôi đặc biệt khuyên các bạn thử là **[Javascript 30](https://javascript30.com/)**. Nó là một thử thách lập trình bằng Javascript thuần (không framework hay thư viện gì cả) trong 30 ngày và nó hoàn toàn miễn phí. Anh ấy cũng có các khóa học thu phí khác về React, Node và Javascript nâng cao trên website.

Bạn có thể đọc các bài đánh giá về khóa học của anh ấy trên [Reddit](https://www.reddit.com/r/webdev/comments/69yd1g/wes_bos_learn_node_course_officially_launched/) và [diễn đàn freeCodeCamp](https://forum.freecodecamp.org/t/want-to-learn-node-wes-bos-review/113286/13)

![](https://cdn-images-1.medium.com/max/800/1*a9ES6TeAXN-VtU7CjVB1MQ.png)

**[Microsoft virtual Academy](https://mva.microsoft.com/)**: MVA có rất nhiều khóa học trực tuyến từ C# tới Python hay SQL server và các mảng khác như lập trình game. Một số khóa học nổi tiếng của họ là [Nhập môn lập trình với Python](https://mva.microsoft.com/en-us/training-courses/introduction-to-programming-with-python-8360), [Cơ bản C#,](https://mva.microsoft.com/en-US/training-courses/c-fundamentals-for-absolute-beginners-16169), [cơ bản cơ sở dữ liệu SQL](https://mva.microsoft.com/en-US/training-courses/sql-database-fundamentals-16944). Một số bài dánh giá trên [Reddit](https://www.reddit.com/r/learnprogramming/comments/7kum1x/c_course_on_microsoft_virtual_academy_looks_to_be/) và [LinkedIn](https://www.linkedin.com/pulse/review-microsoft-virtual-academy-database-course-michelle-hoque).

![](https://cdn-images-1.medium.com/max/800/0*GkbtxAeIvIIUTz0q.png)

**[SoloLearn](https://www.sololearn.com/)** có một phương pháp tiếp cận việc học lập trình khá độc đáo: không chỉ học trên website của họ, bạn còn có thể học qua ứng dụng điện thoại miễn phí của họ. Một số khóa học nổi tiếng của họ là Python, C++ và Java. Họ cũng có một bảng tin gần giống với StackOverflow với các câu hỏi và thảo luận. Một số bài đánh giá trên [Reddit](https://www.reddit.com/r/learnprogramming/comments/7tks7h/is_sololearn_a_good_app_for_learning_code/) và [Quora](https://www.quora.com/How-good-are-SoloLearn-courses-for-learning-programming-Do-their-certificates-have-any-credibility-if-mentioned-in-a-resume)

**Sách**

Nếu bạn muốn học từ những quyển sách, dưới đây là một vài cuốn tôi nghĩ sẽ phù hợp với người mới bắt đầu. Có một số cuốn miễn phí và bạn có thể đọc trực tuyến, còn lại bạn sẽ phải mua.

![](https://cdn-images-1.medium.com/max/800/0*O7xUZsT9qn-TGvvu.jpg)

**[HTML và CSS](http://amzn.to/2GNgyFt) của Jon Duckett / [Javascript và jQuery](http://amzn.to/2EZOq1m) của Jon Duckett**

Các cuốn sách của Jon Duckett có lẽ là những cuốn phổ biến nhất dành cho những người mới bắt đầu lập trình web. Chúng không phải là những cuốn sách dày đặc chữ thông thường mà  tất cả đều được thiết kế cẩn thận với minh họa bắt mắt để dạy bạn những khái niệm lập trình cơ bản.

![](https://cdn-images-1.medium.com/max/800/1*Kk8_Xc9hFSRWZoYqHX1DVQ.jpeg)

**[Sổ tay dành cho lập trình viên front end](https://www.gitbook.com/book/frontendmasters/front-end-developer-handbook-2018/details)** là một cuốn sách trực tuyến miễn phí tới từ [FrontEnd master](https://frontendmasters.com/) và được viết bởi Cody Lindley. Nó được cập nhật hàng năm nên bạn có thể coi như đây là cuốn sổ ghi chép lại từng giai đoạn của lập trình front end cũng được, với nhiều thông tin mới, các nguồn tài liệu, xu hướng và công nghệ trong lĩnh vực này.

![](https://cdn-images-1.medium.com/max/800/1*FIStnBRnDyvqAyayjQzF6A.jpeg)
**[Hùng biện về Javascript](http://eloquentjavascript.net/)** là cuốn sách dành cho người mới học lập trình muốn tập trung vào Javascript. Bạn có thể đọc nó miễn phí trên website, điểm cộng là trang web có một cửa sổ console giúp bạn có thể viết và chạy thử code trong quá trình đọc. Nếu muốn cầm trên tay cuốn sách, bạn có thể mua từ [Amazon](http://amzn.to/2EVJYof)

### Kết

Liệu việc tự học lập trình web bằng các nguồn trực tuyến có khả thi? Câu trả lời là có

Tuy vậy việc này sẽ không dễ dàng một chút nào. Học và thành thạo bất cứ thứ gì đều sẽ rất khó khăn và tốn thời gian, học lập trình cũng vậy. Nếu bạn muốn theo con đường lập trình viên, dưới đây là một vài lời khuyên:

**Hãy tập trung**

Khi tự học, việc bỏ dở một khóa học để nhảy sang một chương trình học khác hấp dẫn hơn là điều luôn xảy ra. Đặc biệt khi bạn bắt đầu gặp khó khăn. Nhưng làm vậy sẽ khiến kiến thức của bạn lủng củng và không thống nhất, trong khi để trở thành một lập trình viên bạn cần có kiến thức sâu về chuyên môn. Hãy theo sát một khóa học/một cuốn sách bạn đang đọc, trừ khi bạn không thích chúng. Cố gắng vượt qua những khó khăn sẽ giúp bạn phát triển các kĩ năng một cách chuyên sâu.

Càng gặp nhiều khó khăn, bạn sẽ càng quen với việc vượt qua thử thách.

**Mọi khóa học đều chỉ là bước đầu của con đường học tập**

Việc hoàn thành một khóa học không có nghĩa bạn đã trở thành chuyên gia. Bạn cần học và luyện tập thêm rất nhiều để có thể thực sự hiểu ra vấn đề.

Hãy cố gắng thử học lại một lần nữa, tìm hiểu lại cùng một vấn đề nhưng sử dụng các thông tin và khóa học khác. Bạn sẽ thấy mọi người giải thích cùng một vấn đề khác nhau như nào, và nó sẽ giúp bộ não bạn ghi nhớ kiến thức tốt hơn

**Và tất nhiên, không gì tốt hợp là trải nghiệm thực tế**

Trong quá trình học, hãy cố gắng rèn luyện kĩ năng bằng cách tự xây dựng một project cá nhân, tạo một trang web miễn phí cho bạn bè hay đóng góp vào các dự án phi lợi nhuận. Càng giải quyết nhiều vấn đề, bạn sẽ càng hiểu sâu.

#### Nguồn
**[The absolute beginner’s guide to learning web development in 2018](https://medium.freecodecamp.org/the-absolute-beginners-guide-to-learning-web-development-in-2018-d87ba925549b)**