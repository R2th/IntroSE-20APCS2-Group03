![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/08/notepad-3299127_1280.jpeg)

## Làm game Hangman với Python
Khi học một ngôn ngữ mới 🐍, việc làm ra một sản phẩm có thể dùng được, chơi được sẽ có động lực vô cùng lớn với bản thân 💪 🥳 😇

Hôm nay mình sẽ giới thiệu đến mọi người một phiên bản của trò chơi học từ vựng tiếng anh 🏴󠁧󠁢󠁥󠁮󠁧󠁿 bằng cách đoán từ 🤔, phiên bản Hangman(người treo cổ), cùng với các kiến thức Python 🐍🐍🐍 cơ bản nhé.

Trước tiên mời bạn chơi thử trò chơi ở đây 👉: https://replit.com/@diemthanhthanh/Hangman-Demo#main.py

Bạn cũng có thể đăng ký tài khoản [repl.it](http://repl.it/) rồi chọn “Fork Repl” để tải ⬇️ bản game về tài khoản của bạn. Tại đây, bạn có thể thay đổi nội dung 🔤 trong file words.py để chứa các từ 🍎 🍊 🥦 🍇 bạn muốn học hay thực hành.

Để có thể làm được một trò chơi như vậy, sẽ đi qua các bước sau:

1. Tìm hiểu về trò chơi và luật chơi

2. Chơi thử game demo xem các chương trình sẽ hoạt động ra sao

3. Phân tích trò chơi và vẽ sơ đồ của trò chơi để mô tả logic

4. Làm phiên bản đơn giản

5. Nâng cấp trò chơi, thêm các yếu tố khác để trò chơi hấp dẫn với người dùng hơn

Và tất nhiên là không thể thiếu một ít kiến thức về Python cơ bản như biến, câu lệnh điều kiện(if/else), vòng lặp while/for, …

Còn chần chừ gì nữa, hãy ghé [bài blog này](https://beautyoncode.com/lam-game-hangman-voi-python/) để làm một trò chơi riêng của mình rồi khoe với bạn bè người thân nha.

## Techie Story
“Techie Story” – một sister-site của cộng đồng Webuild mà mình cũng vừa biết đến. Mình đã đọc một lèo hết năm sáu câu chuyện của mọi người đủ thấy các câu chuyện chân thực và cuốn hút đến mức nào rồi. 

Bạn có thể bắt gặp: 

– Lam Do – Software Engineer tại Facebook kể về những điều khó nói của nữ giới trong ngành CNTT 

– Đức Nghiêm – từ startup community đến ông bố đã học làm bố trong ba năm với cô con gái có năng khiếu logic như thế nào 

– Chị Cúc – Google Intern với câu chuyện đầy nghị lực của một người mẹ đã cắp sách đến trường sau khi con đi học mẫu giáo, ngững dòng tự truyện đầy nghị lực làm mình cảm thấy bản thân có thêm thật nhiều động lực(vì mình cũng là một bà mẹ) 

– Thắm Lê – Lead Software Engineer tại Chợ Tốt, với các tâm sự hơi khó đọc của nữ giới ở những năm đầu ngành công nghệ ở VN cũng là động lực giúp chị càng tiến xa hơn trên con đường chị đã chọn

Ngoài ra còn nhiều câu chuyện khác của các anh chị trong ngành nữa, ghé [Techie](https://techiestory.net/)

## Gỡ lỗi chương trình
Hôm nay mình muốn nói về “Gỡ lỗi”(Debugging)🐞, một qui trình sửa lỗi trong chương trình phần mềm. Điều quan trọng đầu tiên cần nhớ là:

Đừng cảm thấy thất vọng khi bạn tạo ra một con bug.

Khi viết một chương trình thì việc gặp bug 🐞 là việc đương nhiên 🥲. Mình sẽ giới thiệu một số mẹo và kỹ thuật để nhận dạng bug và sửa nó hiệu quả:

✍️ Mô tả vấn đề(Describe the problem)

Để fix bug, đầu tiên bạn cần mô tả được vấn đề mà mình gặp phải.

🐞  Tái tạo lại lỗi(reproduce the bug)

Rất nhiều khi bug chỉ thỉnh thoảng xuất hiện. Để fix được những bug như vậy lập trình viên cần biết cách tái tạo lại con bug đó và tìm hiểu chính xác vấn đề mà trường hợp đó gặp phải là gì thì mới có thể sửa lỗi được.

💻 Thử thực hiện chương trình như máy tính(Play computer)

Với một chương trình phức tạp như có logic với nhiều điều kiện rẽ nhánh, hay gọi nhiều hàm khác nhau, thì việc sửa lỗi sẽ càng khoai hơn. Lúc này bạn cần tưởng tượng mình là máy tính, và với đầu vào cụ thể nào đó, bạn tự kiểm tra từng dòng một của chương trình như cách máy tính chạy để tìm manh mối cho lỗi của mình.

🏹 Sửa lỗi(fix the errors)

Viết chương trình mà editor báo lỗi hay chạy chương trình mà bị lỗi là lỗi có thể thấy và sửa ngay được. Còn nếu chương trình chạy không đúng thì cần kiểm tra lại từng đoạn code, từng dòng code, hiểu rõ từng thứ mình viết ra thì mới mong sẽ tìm ra manh mối 🧐

🛠 Dùng các công cụ hỗ trợ kiểm tra lỗi(print, log, debugger)

In ra các dòng để hiển thị kết quả của biến, hay đơn giản là code có chạy vào đó không cũng là một cách debug. Thêm nữa hãy học cách dùng debugger là như hổ mọc thêm cánh luôn nhé 😎

Mời bạn ghé đọc thêm chi tiết ở [bài blog này](https://beautyoncode.com/go-loi-chuong-trinh/) của mình nhé.

## Clean code - Câu chuyện câu chuyện code xấu giết chết một công ty
Một câu chuyện về một dự án với một team dev vô cùng tài năng và cứng tay nghề 💪, có giai đoạn đầu phát triển cực nhanh và làm việc cực kỳ năng suất 🚀.

Mọi chuyện rất êm đẹp ở những tháng đầu tiên, qua những tháng tiếp theo thì tốc độ phát triển bắt đầu chậm lại. Bước ngoặt là ở tháng thứ 7, khi mà một feature không được release đúng dự kiến, quản lý thất hứa với khách hàng quan trọng, họ hủy hợp đồng ❌. Đó chính là lúc khoảng cách của Scary Gap (chênh lệch giữa thời gian business plan và thời gian thực tế) tăng dần 🆘.

Họ quyết định thuê thêm dev 👨‍🏭 để tăng năng suất, nhưng năng suất tháng đầu lại giảm và sau ba tháng khi dev mới đã quen với luồng công việc thì năng suất chỉ tăng được tầm 1.2 lần 😕. Điều này đồng nghĩa với quỹ lương tăng gấp đôi, gấp ba những năng suất gần như là như cũ. Cứ như vậy, Scary Gap của dự án tăng dần 🆘. Cuối cùng đành đập sản phẩm để xây lại.

Bài toán khó lại đặt ra: “làm sao có thể bơ hết requirements từ dự án cũ qua dự án mới?” 🤔

Tài liệu của dự án thì rất ít mà còn bị outdate 😭, requirements thì thay đổi liên tục, ở khắp mọi (slack, cho tới cả nói miệng trong những buổi call hay discussion). Chỉ còn một nơi tin tưởng nhất, là code. Nhưng, đọc code vẫn không hiểu :))) vì … code xấu 🥲.

Cuộc chạy đua giữa thỏ(dự án mới) và rùa(dự án cũ) 🏎 diễn ra đến tận hai năm cuối cùng đã có thể release 🙏. Nhưng, vẫn sót requirement nào đó, bug vẫn xảy ra trên hệ thống mới 🐞, khách hàng vẫn phàn nàn liên tục 😞. Sau vài tháng, dự án mới cũng bắt đầu phình to ra, không thua gì dự án cũ, và vòng lặp lại bắt đầu ⭕️.

Kết cuộc chắc bạn cũng đoán được.

Vậy nguyên nhân chính ở đây là gì?

Đó là code xấu ❌**. Việc code xấu đã dẫn đến hệ thống quá cồng kềnh, phức tạp, không có độ tin cậy cao. Động chỗ này hỏng chỗ kia, không ai dám sửa.**

Và việc năng suất làm việc tăng cao khi bắt đầu một hệ thống mới khiến chúng ta có một ảo tưởng đó là “đập đi xây lại” sẽ giải quyết được mọi vấn đề.

Và giải pháp là?

Chạy trốn khỏi code bẩn không phải là cách làm đúng đắn. Có nợ thì phải trả, nợ kỹ thuật tương tự như nợ ngân hàng. Nợ ngân hàng nếu cứ chần chừ không trả, sớm muộn cũng bị lấy nhà. Nợ kỹ thuật không trả, sớm muộn cũng bị lấy mất công ty 😭

Và cuốn sách “Clean Code” nên là cuốn sách gối đầu giường của dev(hic, tui chưa đọc)

Mời bạn đọc thêm [bài viết ở blog hung.dev](https://hung.dev/clean-code-1)

## Cách đặt tên file
Bạn đặt tên một file như thế nào?

Ví dụ bạn có một tấm ảnh, bạn sẽ đặt nó tên gì? có thể là “image 1.png” hay “2022-07-12_img1_a-beautiful-dog.png”

Việc đặt tên tưởng chừng rất đơn giản, vì nó dễ làm thật, nhưng nó lại là một trong những thử thách lớn nhất của người dùng thiết bị nói chung, hay một lập trình viên nói riêng. Và cũng đã có rất nhiều thảo luận xoay quanh vấn đề này, kèm theo đó là sự ám ảnh nhẹ với cái tên “naming convention”

Việc đặt tên là quan trọng, vì nó sẽ sử dụng để nhận dạng, tìm kiếm, phân loại, … file này giữa hàng ngàn, hàng triệu file khác.

Có 3 nguyên tắc chính khi đặt tên file: machine readable: máy có thể đọc được human readable: người có thể đọc được plays well with default ordering: cái tên hoạt động tốt với những cách phân loại mặc định(phân loại theo ngày tháng, theo nhóm, …)

Giới thiệu đến bạn chi tiết và ví dụ về ba nguyên tắc trên ở [link này](http://www2.stat.duke.edu/~rcs46/lectures_2015/01-markdown-git/slides/naming-slides/naming-slides.pdf). Chúc bạn hiểu thêm về cách đặt tên sao cho chuyên nghiệp, dễ tìm kiếm và dễ phân tích dữ liệu nhé.

## Những điều thú vị về React
ReactJS vẫn đang làm mưa làm gió trên cộng đồng lập trình web với mức lương khủng và nhu cầu thị trường rất nhiều. Một số điều thú vị về React:

Thuật toán áp dụng khi xử lý DOM ảo là diff algorithm, nó sẽ so sánh các phiên trước và sau khi state hoặc props thay đổi. DOM ảo là một bản copy của DOM thật theo tỉ lệ 1-1, DOM ảo là một object với các thuộc tính như loại element, các node con. DOM ảo hoạt động và đồng bộ với DOM thật qua thư viện ReactDOM, quá trình này gọi là Reconciliation DOM ảo cũng là một object, object được lưu trữ trong stack, heap, và các bạn này được lưu ở trên ram DOM ảo có thực sự nhanh hơn DOM thật? Vấn đề này vẫn đang được tranh cãi Có phải ReactJS là cha đẻ của DOM ảo? Không nha, ReactJS sử dụng DOM ảo nhưng không tạo ra khái niệm này, nó đã có từ trước. Vuejs hay Elm cũng có sử dụng DOM ảo, mỗi thư viện có cách áp dụng khác nhau. Tại sao lại chia ra hai thư viện react và reactDOM? Vì có sự xuất hiện React Native, lập trình app cho di động, nên react sẽ là phần lõi dùng chung của cả hai bên: web và di động, còn reactDOM thì chỉ sử dụng cho web app.

Bạn có thể đọc thêm ở [bài viết này](https://viblo.asia/p/su-that-thu-vi-ve-react-co-the-ban-chua-biet-L4x5xAawKBM).

## Từ fullstack đến devops
Làm thế nào để từ một fullstack engineer trở thành một devops và cloud engineer ?

Tác giả Quân Đỗ, một devops/cloud engineer chia sẻ những cuốn sách anh ấy đã học trên con đường này. Các chủ đề bao gồm:

Về cơ bản, bạn cần hiểu về hệ điều hành Linux với các cuốn sách: Linux for beginners Ubuntu Linux

Tiếp theo, là các chạy chương trình trên các hệ điều hành khác nhau với cuốn: Docker In Action

Học cách tự động deliver chương trình đến người dùng dễ dàng nhất(CI/CD) với cuốn: Continous Delivery with Docker and Jenkins Tìm hiểu thêm về Container Orchestration với cuốn “Kubernetes In Action”

Tìm cách vận dụng vào thực tế và đọc thêm nâng cao với các cuốn sách: Managing Kubernetes Kubernates best practice

Để trở thành một Devops Engineer tốt hơn những devops engineer khác, bạn cần biết về Cloud với các cuốn sách: Amazon Web Service In Action Terraform In Action

Và tiếp tục học nâng cao kiến thức về monitoring, elasticsearch, … Nếu bạn chọn con đường này có thể theo dõi [tác giả này](https://viblo.asia/p/side-story-nhung-cuon-sach-nen-doc-de-tro-thanh-devops-cho-nguoi-moi-bat-dau-YWOZrAqNKQ0) nhé ^^

## Free programming books repo
Có một repository đang là trending trên github chứa số lượng sách lập trình miễn phí khổng lồ.

Repo này đạt gần 250 ngàn stars(tức có gần 250 ngàn người dùng github, mà github thì toàn lập trình viên dùng), gần 50 ngàn lượt fork(tức là copy repo này về tài khoản riêng), hơn 10 ngàn người theo dõi và gần 2000 lập trình viên tham gia đóng góp.

Bạn có thể xem trang web để tìm kiếm theo ngôn ngữ, và theo chủ đề và lọc theo rất nhiều thứ tiếng.

Repo của dự án này ở [đây](https://github.com/EbookFoundation/free-programming-books) , muốn đóng góp gì cứ tạo PR nhé mọi người.

## Public APIs
Bạn muốn làm một dự án chỉ với kiến thức frontend, và đang tìm những API được public để có sử dụng cho dự án của mình? Đó có thể là một trang web hiển thị các bạn mèo, cốc cà phê yêu thích hay một trang về anime, games, …

Đây, mình tìm được một [repo](https://github.com/public-apis/public-apis) với 51 thể loại, hơn 1400 apis, bạn có thể fork về repo của mình để dễ dàng tìm trong tương lai nhé.

Tuy nhiên, lưu ý nhỏ là khi sử dụng public apis, bạn hãy kiểm tra cẩn thận xem còn public không, kiểm tra những gì bạn có thể sử dụng(các endpoints, các method, resources). Các apis này sử dụng để thực hành các kiến thức lập trình hay làm pet projects thì hợp lý hơn là làm một dự án commercial nha(nhỡ đâu người ta không public nữa hay có vấn đề gì sẽ rất rủi ro)

Bạn nào làm được dự án nhỏ nào có thể chia sẻ dưới comment này nhé!

---
Nội dung này thuộc BeautyOnCode's short posts là các bài viết ngắn tóm tắt nội dung và ý kiến cá nhân từ các nguồn như các slack channels (công ty, cộng đồng), các new letters, …

Các bài viết này cũng được đăng ở:

👉 [BeautyOnCode trên Careerly](https://careerly.vn/profiles/1140) (lời hứa với Careerly) Trên đây có gần 900 người theo dõi, và là trang tin công nghệ khá hay, bạn có thể tải app rồi theo dõi mình nhé.

👉 [Blog BeautyOnCode, chuyên mục “Short Posts”](https://beautyoncode.com/category/short-posts/)

👉 [Fanpage BeautyOnCode](https://www.facebook.com/beautyoncode)

👉 Trang [notion này](https://graphicdthanh.notion.site/BeautyOnCode-short-posts-c2996f46c7674f50bf9b88bb491094ab) tổng kết các bài viết

Nếu bạn thích đọc hàng ngày thì hãy follow các trang trên nhé. Chúc bạn đọc vui ^^

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!