![](https://static1.squarespace.com/static/53978fa5e4b08e33c688fc04/t/5413712be4b03f8abbd190de/1409691768037/drag-drop.gif)

Bài này là một bài Step-by-step (**Hướng dẫn từng bước**) để bạn sẽ có thể tự code cho mình một trang web cá nhân chuyên nghiệp, hiện đại, giao diện tùy biến và đưa lên tên miền github.io hoàn toàn miễn phí (**miễn phí cả đời**). Bạn nên tự mình code cho mình một trang cá nhân, ít nhất đó sẽ là sản phẩm để bạn tự quảng cáo chính mình.

Nói đến trang web cá nhân, mọi người hay nghĩ ngay đến trang blog cá nhân, và nghĩ đến các **Opensource CMS** (**Content Management System**, hệ thống quản lý và xuất bản bài viết có mã nguồn mở). Nếu bạn dùng PHP thì có **Wordpress**, **Drupal**, **Joomla**... Nếu bạn dùng C# thì có **DotNetNuke**, **Umbraco**, **Sitecore**... Python thì có **Django**...

![](http://digitalitsolution.com/images/cms.png)

CMS thường sẽ gồm 2 phần, phần **Admin** để bạn quản lý cơ sở dữ liệu backend (các bài viết, comment, media, ảnh..) và phần **frontend** là trang **client (trang chủ)** được **publish (xuất bản, đăng lên)** các nội dung bài viết từ **admin** cho người dùng đọc.

![](https://learnwp.ca/wp-content/uploads/2016/03/Snip20160319_10.png)

Điểm chung của CMS đó là ta phải thuê một **Hosting** để "Host" (**Lưu trữ**) mã nguồn và cơ sở dữ liệu của trang web. Như thế thì một trang web **miễn phí** (vì lấy từ opensource) sẽ không còn là miễn phí nữa. Chúng ta phải đóng phí duy trì hosting trang web hàng tháng để web của ta không "**chết**". Ngoài Hosting ra, ta còn phải mua thêm **Domain** (tên miền) cho trang web để trỏ đến hosting (vốn chỉ có địa chỉ là một IP khó nhớ). Vậy là để làm web cá nhân ta thường có công thức sau:

> **Download mã nguồn Opensource về + Tải giao diện yêu thích + Chỉnh sửa và viết nội dung vào DB + Mua Hosting + Mua tên miền + Upload Code và DB lên Host = Trang web cá nhân.**

Điểm yếu nữa của CMS đó là bạn phải thực sự giỏi về mã nguồn mới có thể chỉnh sửa giao diện theo ý muốn của bạn được. Thường chúng ta đi lang thang để tìm kiếm một cái **template** giao diện ưng ý (ví dụ **Wordpress**) được cho download free ở đâu đó. Nhưng thực sự nó không bao giờ được như ý muốn 100%. Vì tôi cá là bạn đọc trang **viblo.asia** tức là bạn đã biết lập trình. Bạn sẽ muốn tự mình code ra một trang cá nhân chuyên nghiệp (cool) cho chính mình.

# Trang cá nhân là trang như thế nào?

Trang web cá nhân thường là các trang giới thiệu bản thân (**Profile cá nhân**) trong đó gồm cả CV (**sơ yếu lý lịch xin việc**) của chính bạn, hoặc một dạng Blog mà bạn **chia sẻ các bài viết** mà bạn viết ra hoặc sưu tầm được. Cũng có thể là một trang **web giới thiệu sản phẩm** mà bạn làm ra.

![](https://i.pinimg.com/originals/9f/bb/4f/9fbb4f17ee4568997c7402e7a50560fd.gif)

Trang web cá nhân thường là **trang tĩnh**. Nghĩa là chỉ có **một người dùng**, không có chức năng đăng nhập và thêm dữ liệu từ người khác ngoài bạn, người dùng chỉ có đọc tin, và tương tác duy nhất người dùng có là viết comment cho bài viết.

Trang tĩnh cũng có thể là trang `BÁO ĐIỆN TỬ`. Lúc này trang của chúng ta chỉ xuất bản thông tin đến người đọc. Người đọc có thể comment cho các bài viết như trang Blog.

![](https://www.wpzoom.com/wp-content/uploads/2017/05/magazine-themes.gif)


Một trang tĩnh cũng có thể là Landing Page (Trang web chỉ có 1 trang duy nhất, cuộn lên cuộn xuống). Một trang giới thiệu về một công ty, hoặc trang giới thiệu một product nào đó.

![](https://cdn.dribbble.com/users/285803/screenshots/1633225/farhan-razak.gif)


Hãy lấy ví dụ trang này của Việt Nam là một trang tĩnh dạng Landing Page, dùng để giới thiệu sản phẩm:  http://butphadiemthi.mcbooks.vn/


> **`Trang tĩnh tức là chỉ có HTML, CSS, Javascript à?`**

Đúng vậy, chúng ta chẳng cần đến cơ sở dữ liệu để lưu trữ gì cả, chỉ cần một bộ giao diện gồm Html, ít Css và tí tẹo Javascript là ta đã có một trang web. Html, Css, Javascript thì ai làm web cũng biết một ít, chẳng khó khăn gì để chỉnh sửa trang web của ta theo ý muốn, đúng không?

> **`Nếu chỉ dùng html, không PHP, không C#, vậy các phần lặp lại ở mỗi trang như là Header, Footer, Menu thì làm thế nào?`**

À, lúc này ta sẽ không dùng **Html thuần** được nữa. Ta sẽ phải viết một **Template** (bộ khung) trang web. Viết tách các phần lặp lại riêng ra, phần ruột ở mỗi trang viết riêng, và khi chạy sẽ ghép lại. Để làm được điều này ta cần một "**Web Static Generator**" (Bộ công cụ tạo trang web tĩnh từ template). 

Cách hoạt động của công cụ tạo trang tĩnh (Static Site Generator) như sau:

![](https://images.viblo.asia/8e0151d3-bc13-4735-b005-da5ca1dbdb5d.jpg)

# Web static đang là xu hướng của 2018+
Hãy nhìn qua trang web này, bạn sẽ thấy là có hàng tá các công cụ gen web static đâng được sử dụng khắp nơi:  https://www.staticgen.com/

![](https://images.viblo.asia/0f90ed45-c093-445c-8f45-89e5b9d45beb.png)

Thế giới web đã đi một chặng đường dài, từ web tĩnh từ những năm 90. Rồi đến web động thời 2000+. Và giờ cả thế giới lại yêu lại từ đầu với trang web tĩnh.

# Điểm mạnh của Static Site Generator (SSG) so với HTML thuần

### SSG có thể tạo ra web site đa ngôn ngữ rất nhanh và mạnh

Chúng ta cần một trang tĩnh nhưng lại đa ngôn ngữ, ví dụ Blog 2 ngôn ngữ Anh-Việt, hoặc web landing page giới thiệu sản phẩm nhiều ngôn ngữ khác nhau, Hugo hoặc các công cụ Static Site Generator khác có thể giúp được bạn. HTML thuần thì cũng làm được nhưng bạn sẽ vất vả khi chỉnh sửa từng file một thủ công ở từng thư mục, cho dù 2 thư mục của 2 ngôn ngữ cấu trúc giống nhau.

### SSG hỗ trợ tạo ra một Blog chuẩn
Nếu chúng ta cần làm một trang web cá nhân, trang đầu tiên chúng ta muốn làm hiển nhiên là một trang blog, trang để viết bài và hiển thị theo ngày tháng như một **tờ báo cá nhân**. Lúc này chúng ta cần các chức năng cơ bản sau đây của một trang Blog:

> 1. Hiển thị bài viết (post) theo ngày.
> 2. Lọc được theo ngày tháng.
> 3. Hiển thị nhóm bài viết theo thẻ (tags), hoặc mỗi bài gắn cho nó một danh mục (category) để gom được các bài viết liên quan lại với nhau.
> 4. Tìm kiếm được bài viết theo tiêu đề hoặc nội dung bên trong của toàn bộ Blog.
> 5. Hỗ trợ soạn thảo và hiển thị các embeded (nội dung của bên thứ ba, vd Youtube, Slideshare, Draw.io, Gify...) trực tiếp trong bài viết.
> 6. Cho phép bình luận dưới mỗi bài viết.
> 7. Hiển thị các bài viết liên quan đến bài đang đọc.
> 8. Hỗ trợ SEO mạnh để làm tăng view, cái này 1 website chuẩn cần phải có, site không chỉ là làm cho vui mà nó thực sự hoạt động hiệu quả. Ví dụ có hỗ trợ sitemap, robot, quản lý được meta tags, có url chuẩn SEO google.
> 9. Cần có Google Analytic để xem người xem đến từ đâu và làm SEO cho chuẩn.
> 10. Có RSS để bắt tay được với các trình đọc tin tức ngắn gọn (kiểu feedly, google news) nữa thì tốt.
> 11. Chia sẻ được các bài viết sang mạng xã hội ví dụ facebook.
> 
Các điểm trên đây Hugo làm ngon. Và hoàn toàn miễn phí, trang bị tận răng ngay khi cài đặt không cần bất kỳ Plugin gì cả. Các SSG khác có thể cần cài thêm mình k dùng nhiều nên k tìm hiểu hết. Chỉ cần biết là Hugo thực sự build ra 1 Blog dùng ngon luôn.

### SSG tạo giao diện rất nhanh và rất dễ chỉnh sửa.

Cái này thì rõ. Vì giao diện của trang web được viết dưới dạng html + đính kèm data. Nếu bạn đã từng code Angular hoặc React sẽ thấy Html được nhồi thêm Data vào (viết thành 1 cục dưới dạng template) thì SSG cũng viết như vậy.

### SSG cho phép nội dung được lưu trữ dưới dạng file, không cần cơ sở dữ liệu

Khi làm web động, chúng ta hiển nhiên đi tìm một cơ sở dữ liệu để nhét được data bài viết (post) vào. Ví dụ PHP thì ta dùng MySQL, C# thì đi với MSSQL, Python thì có thể dùng MongoDB...Nhưng làm web dạng SSG thì ta lưu trữ data vào file và dữ liệu hoàn toàn dạng text-base (thường là JSON hoặc TOML). Vì dữ liệu là dạng tree như JSON, chúng ta thích lưu trữ gì cũng được. Dữ liệu vẫn được quản lý, thêm sửa xóa độc lập với html template. Khi build ra html sẽ được các trang có đầy đủ data mong muốn.

### SSG sử dụng Markdown là ngôn ngữ để soạn thảo bài viết

Nếu bạn đã viết bài trên trang Viblo này thì bạn cũng đang dùng Markdown rồi. Còn bạn nào chưa biết thì phải học qua. Vì chúng ta sẽ không có trình soạn thảo như Word nữa, mà bạn phải soạn thảo format đậm nhạt bài viết bằng notepad++.

### SSG tạo ra web tĩnh, chỉ có Html, css, js. Tức là thời gian load cực nhanh

Hiển nhiên là như vậy, vì html thuần được lấy trực tiếp từ server về và hiển thị trên trình duyệt không cần chế biến gì nhiều như là web truyền thống. Web động thì phải nhồi data vào html còn ở đây tất cả đã nhào nặn sẵn.

### SSG thì chả có gì để mà hack, và không bao giờ sợ DDOS

Đúng vậy không ai đi hack một trang web tĩnh cả, vì nó không trỏ vào cơ sở dữ liệu nào cả tất cả dữ liệu bạn nhìn thấy đều là html. Tài nguyên server cũng chỉ có html, hơn nữa chúng ta sẽ host web của mình trên github luôn. Do vậy việc lo ngại website bị **sấp mặt** vì bất kỳ lý do gì thì cũng đều không có cửa.

# Lựa chọn Hugo để bắt đầu tạo website cho mình

Mỗi công cụ SSG sử dụng một ngôn ngữ riêng để làm template và code. Ở đây mình dùng **Hugo**. Vì nó thân thiện với HĐH Windows, cài phát dùng được luôn. Chứ k như **Jekyll** phải cài **Ruby** rồi **Gem** linh tinh. Hugo cũng viết bằng ngôn ngữ **Go**, thời gian **build** một trang web cực nhanh.

## 1. Cài đặt Hugo cho Windows

Bạn download file zip mới nhất tại đây:  https://github.com/gohugoio/hugo/releases

Máy mình Windows 10 - 64Bit nên mình download link này: https://github.com/gohugoio/hugo/releases/download/v0.39/hugo_0.39_Windows-64bit.zip

Sau khi giải nén file zip này ta sẽ được một file `hugo.exe`. File này không phải kích đúp vào để cài mà bạn làm như sau:

![](https://images.viblo.asia/7dd37fbd-9f20-423b-b954-72593960c1f7.jpg)

Bây giờ hãy thử gõ lệnh `hugo version` ở CMD để kiểm tra:
 
![](https://images.viblo.asia/2b51f9ce-09ba-44f1-adfc-abb541387523.jpg)

## 2. Bắt đầu tạo trang web đầu tiên bằng Hugo

Đầu tiên hãy tạo bộ khung project bằng Hugo command: `hugo new site [TenWebsite]` như sau:

![](https://raw.githubusercontent.com/chungminhtu/regex_practices/master/HugoNewSite.gif)

Lúc này thì trang web của chúng ta đang trắng trơn, chưa có gì cả.

## 3. Tải một bộ giao diện (theme) về sử dụng

Hãy làm theo các bước ở video sau đây nhé:

{@youtube:https://youtu.be/xlFkv_mfSwY}

Như vậy là chưa cần code gì chúng ta đã có một website khá **ngầu** rồi đúng không?

> **`Vậy nếu muốn sử dụng nhiều theme của cùng một trang blog thì làm như thế nào?`**
> 
OK vậy hãy làm theo từng bước sau đây:

{@youtube:https://www.youtube.com/watch?v=4VbP1CKWcRI}

> **`Hmmmm! Có thể chuyển đổi giao diện động, do người dùng chọn, sau khi đã build bằng hugo không?`**

Không thể, vì build ra Html hoàn toàn là tĩnh nên link bài viết (post) và link đến các trang khác nhau, css đều đã được cố định vào 1 thư mục, bạn có thể thấy sau khi build bằng lệnh `hugo` sẽ hiện ra thư mục tên **`public`** có các file sau khi được build ra trang web hoàn chỉnh. Nếu bạn muốn thay đổi giao diện bạn phải chọn lại theme và sửa config.toml rồi build lại.

> **`OK ngon, nhưng giờ viết bài post thì làm thế nào?`**
> 
OK vậy chúng ta tìm hiểu cách viết bài trong Hugo nhé.

## 4. Viết bài đăng lên website bằng Hugo

Hãy thực hiện từng bước như video sau đây:

{@youtube:https://www.youtube.com/watch?v=AhnNa0cobTc}


> Trong trường hợp bạn chỉ dùng một theme cố định. Bạn không cần đến thư mục themes. Mà có thể paste trực tiếp toàn bộ nội dung themes vào thư mục root luôn.

Hãy lấy ví dụ giao diện "hugo-tranquilpeak-theme" là cố định thì ta download file zip về và giải nén đè vào thư mục gốc MyBlog luôn.

{@youtube:https://www.youtube.com/watch?v=oJRcPs4SKGw}

## 5. Đưa trang web vừa làm lên mạng

Như vậy là cơ bản sau khi có một trang Blog với giao diện ngon nghẻ và viết các bài để chia sẻ thì giờ chúng ta có thể đưa nó lên mạng được rồi.

Chúng ta không cần mua hosting gì cả mà hãy đưa code lên trang github. Ai cũng tạo tài khoản github free được và github không giới hạn số code web (số Repository) mà bạn đưa lên. Trang Github có một dịch vụ miễn phí đó là hosting được file html tĩnh, được gọi là **Github Pages**. Bạn đưa code dạng html tĩnh lên trên **Github** thì lập tức có thể hiển thị được file html đó dưới dạng website thông thường. Tuyệt vời phải không.

Chú ý là trong bài hướng dẫn này mình đưa trang web lên Github chỉ các mã nguồn đã được gen ra (tạo ra html) bằng Hugo và không đưa toàn bộ source của Hugo lên. Nếu bạn muốn chia sẻ mã nguồn hugo của bạn thì bạn public toàn bộ lên gitHub cũng được.

Hãy làm theo video sau đây để đưa được code lên gitHub Pages nhé:

{@youtube:https://www.youtube.com/watch?v=ls92T1SVKc4}

Và như thế là bạn đã có một trang Blog cá nhân hoàn chỉnh rồi đấy.

> ĐÂY LÀ SOURCE của phần này để dành cho bạn nào cần tham khảo nhé: [LINK_SOURCE](https://github.com/chungminhtu/MyBlogSource)

# Dùng hugo để đưa một template Bootstrap tự làm thành trang web hoàn chỉnh

Chúng ta vừa tự làm được một trang Blog với đầy đủ đồ chơi người lớn. Tuy nhiên giao diện vẫn là mỳ ăn liền, chưa cool lắm đúng không. Nếu bạn có một template html css hoàn chỉnh bằng Bootstrap và muốn sử dụng Hugo để build thành trang web thì sao?

Phần này mình sẽ cắt sang một phần thứ 2 cho dễ theo dõi nhé. Mời các bạn đón đọc!

Đừng quên UpVote, Share cho bạn bè và Comment các câu hỏi nếu bạn cần nhé, mình sẽ trả lời tất cả. Nếu có ai có kinh nghiệm gì về Hugo cũng trao đổi thêm nhé.