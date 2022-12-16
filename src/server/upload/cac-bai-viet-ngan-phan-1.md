![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/06/food-2203732_1280.jpeg)
## Redis cơ bản cho người mới bắt đầu

Redis là một cơ sở dữ liệu trong bộ nhớ(in memory database) 📀, dữ liệu được lưu trữ theo dạng key-value 🔑 🔤 tức là từ khóa và giá trị của nó.

👩‍🍳 Redis thường sử dụng như là một cơ sở dữ liệu caching 📜, có tốc độ truy cập rất nhanh 💨

💻 Để làm quen với Redis, cài đặt nhanh trên Mac với “brew install redis”, sau đó chạy server với  “redis-server”.

Sau khi server được khởi chạy, bạn có thể bắt đầu làm quen với các câu lệnh cơ bản trong Redis bằng cách sử dụng CLI, mở một cửa sổ mới và gõ lệnh “redis-cli”

🧐 Câu lệnh SET, GET, EXISTS, KEYS

Vì lưu trữ dạng key-value nên câu lệnh cơ bản nhất sẽ là:

– gán trị vào từ khóa(set value to key): SET <key> <value>

– lấy giá trị ra từ từ khóa(get value from key): GET <key>

– kiểm tra xem từ khóa có trong bộ nhớ không: EXIST <key>

– tìm kiếm từ khóa theo pattern: KEYS <pattern>

Một bộ key-value cũng có thể được set thời gian nó tồn tại với từ khóa EXPIRE <key> <time>

Ngoài ra, Redis cũng có nhiều kiểu dữ liệu khác được lưu cho value như: list, sets, hashes và các từ khóa tương ứng sử dụng cho từng kiểu dữ liệu trên.

Mời bạn ghé đọc [bài viết này](https://beautyoncode.com/basic-knowledges-about-redis/) để tìm hiểu thêm và có video hướng dẫn để bạn có thể thực hành nữa ấy.
    
## Trang web hoạt động ra sao
    
Ba thành phần chính cấu tạo 🏗 nên một trang web là HTML 🪜, CSS 🌈 và JavaScript ✨.

👉 🪜 HTML là ngôn ngữ đánh dấu giúp cấu trúc cho nội dung trang.

👉 🌈 CSS là ngôn ngữ về các kiểu áp dụng vào nội dung HTML để làm đẹp cho trang

👉 ✨ JavaScript(JS) là ngôn ngữ kịch bản cho phép tạo một trang web với nội dung cập nhật, hình ảnh động, …
 
🧐 Vậy trang web được dựng lên như thế nào?

Khi bạn gõ đường dẫn vào trình duyệt và nhấn enter 👩‍💻🧑🏻‍💻, một yêu cầu ➡️ được gửi đến máy chủ và file HTML được tải về ⬇️

Sau đó, trình duyệt sẽ phân tích 🧐 HTML đầu tiên, theo thứ tự từ trên xuống dưới ⏬. Trong file này chứa <link> để tải tiếp CSS 🌈 và <script> để tải tiếp tệp JavaScript ✨

Trong khi phân tích HTML, trình duyệt tạo cây DOM, tạo cấu trúc CSSOM với nội dung CSS đồng thời cũng biên dịch và thực thi JavaScript 🏗

Quá trình này diễn ra đồng thời 🤖, trang web được vẽ lên màn hình 🖼 và bạn thấy trang web được hiển thị 🧑🏻‍💻

Thật thú vị phải không 🤩 Ngoài ra thì cũng có nhiều cách để tải và thực thi code JavaScript sao cho trang web hiển thị lên nhanh nhất, mời bạn ghé đọc thêm ở [bài viết này](https://beautyoncode.com/chien-luoc-tai-thuc-thi-code-javascript/).
    
## Tài khoản tiết kiệm sự nghiệp
Bạn sẽ làm gì khi “bị sa thải bất ngờ” 😭, có thể vì mâu thuẫn với sếp, đồng nghiệp 😕, hay bế tắc trên con đường phát triển 🥺, hay thậm chí là ở một nơi an toàn quá lâu 🥲 và khi khủng hoảng ập đến làm bạn mất đi công việc đã gắng bó và cống hiến bao lâu nay 😅? 

“Nhảy việc hay thay đổi chính mình” 👍 – một cuốn sách của Jon Acuff, với tựa đề thật là “thách thức” 💪, đã đề cập đến một “Tài khoản tiết kiệm sự nghiệp” 🔑 – một vũ khí bí mật giành cho sự nghiệp của bạn khi có những sự cố bất ngờ như thế ập đến. 

Vậy “Tài khoản tiết kiệm sự nghiệp” là gì? ✨ ✨ ✨ 

Tài khoản tiết kiệm sự nghiệp 

= (Mối Quan Hệ + Kỹ Năng + Phẩm Chất) * Nhiệt Huyết 

Các định nghĩa 🧐: 

😀 Mối quan hệ = những người mà bạn quen biết, nhóm người mà bạn có mối quan hệ mật thiết trong quá trình làm việc 

⚒ Kỹ năng = những điều bạn có thể làm được, cầu nối giữa kẻ nghiệp dư và chuyên gia 

😊 Phẩm chất = con người bạn, chất keo gắn kết toàn bộ các yếu tố lại với nhau 

🥰 Nhiệt huyết = cách làm việc của bạn, nhiên liệu thúc đẩy bạn làm những việc mà người khác không làm, và vì thế bạn có thể tận hưởng những thành quả đạt được trong khi người khác thì không 

Mời bạn ghé nghe episode 45 và 52 ở [podcast này](https://beautyoncode.com/podcast/ ) nhé 

Và link sách nếu bạn thích tậu [bản giấy](https://ti.ki/M39Oj1kb/CAREER-UP) về nghiên cứu nè 

## Những quy luật của đời người
    
Những quy luật của “đời người”:

▪️ Bạn sẽ có một cái thân. Bạn có thể thích nó hay ghét nó, nhưng nó sẽ là của bạn trong suốt cả quãng đời này.

▪️ Bạn sẽ phải học các bài học. Bạn học trọn thời gian trong một ngôi trường không chính thức được gọi là cuộc đời. Mỗi ngày trong ngôi trường này bạn sẽ có cơ hội để học bài. Bạn có thể thích các bài học ấy hay nghĩ rằng chúng chẳng liên quan gì hay thậm chí còn rất ngu ngốc nữa.

▪️  Ở đó không có sai lầm, chỉ có các bài học. Trưởng thành là một quá trình thử nghiệm để phát hiện chỗ sai rồi sửa, một quá trình thử nghiệm. Những thử nghiệm thất bại cũng là một phần quan trọng trong quá trình ấy, không khác gì những thử nghiệm thành công. Về lâu dài, chúng ta sẽ nhận những gì mình xứng đáng được nhận.

▪️ Một bài học sẽ lặp đi lặp lại nhiều lần cho đến khi chúng ta học xong bài học ấy. Một bài học sẽ thể hiện ra dưới nhiều hình thức khác nhau cho đến khi bạn đã học xong. Học xong rồi, bạn mới có thể chuyển sang bài học kế tiếp. 

▪️ Quá trình học hỏi không bao giờ chấm dứt. Không có phần nào trong cuộc sống của chúng ta mà không chứa đựng những bài học ấy cả. Chừng nào bạn còn sống, chừng đó vẫn còn có những bài học cần phải học.

▪️ “Ở chỗ kia” không có gì tốt hơn “ở chỗ này”. Khi “chỗ kia” đó biến thành “chỗ này”, bạn sẽ lại thấy một “chỗ kia” khác tốt hơn “chỗ này” nữa.

▪️ Mọi người chỉ là một tấm gương để bạn tự soi lại chính mình. Khi bạn yêu hay ghét điều gì đó của người khác, nghĩa là bạn cũng đang yêu hay ghét chính những điều đó trong bản thân mình.

▪️ Bạn muốn tạo nên cuộc đời mình như thế nào là tùy thuộc vào chính bạn. Bạn có tất cả mọi công cụ và mọi nguồn lực mình cần. Sử dụng chúng như thế nào là tuỳ thuộc vào bạn. Sự lựa chọn là của bạn.

▪️ Các câu trả lời nằm bên trong bạn. Câu trả lời cho các câu hỏi của cuộc đời bạn ở bên trong bạn. Tất cả những gì bạn cần làm chỉ là quan sát, lắng nghe và tin tưởng.

▪️ Rồi bạn sẽ quên tất cả những điều này.

Đối với tôi, nó giống như một bản hướng dẫn cho những người chuẩn bị được sinh ra làm người. Chúng ta hãy cùng xem lại những lời hướng dẫn này một cách kỹ lưỡng hơn nhé.

Trích dẫn từ cuốn “Cuộc đời là một trường học”

[Tải về sách ebook miễn phí](https://lnkd.in/gK_tWuVk)
    
## Những kỹ năng vô hình
KỸ NĂNG LÀ TẤT CẢ MỌI THỨ  🤯🤯🤯

Đúng vậy, tất cả những gì bạn làm trong công việc đều là kỹ năng: cách bạn nói chuyện với mọi người trong phòng nghỉ, ghi nhớ ngày sinh nhật của đồng nghiệp, … 

Tất cả những điều có vẻ rất nhỏ nhặt trên đều là kỹ năng, nó như là khoản lợi tức kép tiết kiệm dài hạn cho sự nghiệp của bạn.

3 kỹ năng vô hình quan trọng nhất:

👉 Đi làm

👉 Gia tăng giá trị của bạn

👉 Làm chủ thái độ của bạn. Thái độ là một quyết định.

Ngoài ra còn 9 kỹ năng vô hình khác, như là “vượt qua mong đợi”, “sự khéo léo”, “thể hiện lòng biết ơn”, “thể hiện sự quan tâm đối với người khác”, “tập trung vào những điều quan trọng”, “chơi đùa bằng sức mạnh của bạn và của những người khác”, “linh hoạt”, “tôn trọng thiết bị của công ty”, “tiếp tục sự nghiệp học tập của bạn”

Trên đây là một vài tóm tắt của chương “Nắm giữ các kỹ năng vô hình” mời bạn ghé nghe nội dung ở episode 49 trong podcast này https://beautyoncode.com/podcast/ Link sách tiki cho bạn nào cần mua về nghiên cứu nè https://ti.ki/M39Oj1kb/CAREER-UP
    
## Giới thiệu series Linux
Với các bạn mới bước chân vào học lập trình, thì việc tìm hiểu về thế giới mã nguồn mở, làm quen với gia đình Linux, những kiến thức cơ bản của Linux như các commands cơ bản, các công cụ phổ biến của Linux như là vi editor hay viết các câu lệnh cơ bản với bash script và hay quản lý source với git thường gặp nhiều khó khăn 😅

Trong series các bài blog về Linux này, mình sẽ cùng tìm về chủ đề này 👍:

✍️ Phần 1: Linux cơ bản

→ ✅ Giới thiệu về Linux(https://beautyoncode.com/gioi-thieu-ve-linux/)

→ ✅ Làm quen câu lệnh và hệ thống tập tin trong Linux(https://beautyoncode.com/lam-quen-cau-lenh-va-he-thong-tap-tin-trong-linux/)

→ ✅ Quản lý hệ thống tập tin trong Linux(https://beautyoncode.com/quan-ly-he-thong-tap-tin-trong-linux/)

→ ✅ Chuyển hướng câu lệnh trong Linux(https://beautyoncode.com/chuyen-huong-cau-lenh-trong-linux/)

→ ✅ Giới thiệu CLI và các câu lệnh làm việc với tập tin(https://beautyoncode.com/gioi-thieu-ve-cli-va-mot-so-cau-lenh-lam-viec-voi-file-trong-linux/)

✍️ Phần 2: Các công cụ phổ biến của Linux(coming soon)

Mời các bạn theo dõi fanpage để cập nhật các bài viết mới nhất nha

Happy Linux 🥰
    
## Làm game Hangman với Python
    
Khi học một ngôn ngữ mới 🐍, việc làm ra một sản phẩm có thể dùng được, chơi được sẽ có động lực vô cùng lớn với bản thân 💪 🥳 😇

Hôm nay mình sẽ giới thiệu đến mọi người một phiên bản của trò chơi học từ vựng tiếng anh 🏴󠁧󠁢󠁥󠁮󠁧󠁿 bằng cách đoán từ 🤔, phiên bản Hangman(người treo cổ), cùng với các kiến thức Python 🐍🐍🐍 cơ bản nhé.

Trước tiên mời bạn chơi thử trò chơi ở đây 👉 (link)

Bạn cũng có thể đăng ký tài khoản repl.it rồi chọn “Fork Repl” để tải ⬇️ bản game về tài khoản của bạn. Tại đây, bạn có thể thay đổi nội dung 🔤 trong file words.py để chứa các từ 🍎 🍊 🥦 🍇 bạn muốn học hay thực hành.

Để có thể làm được một trò chơi như vậy, sẽ đi qua các bước sau:

1. Tìm hiểu về trò chơi và luật chơi

2. Chơi thử game demo xem các chương trình sẽ hoạt động ra sao

3. Phân tích trò chơi và vẽ sơ đồ của trò chơi để mô tả logic

4. Làm phiên bản đơn giản

5. Nâng cấp trò chơi, thêm các yếu tố khác để trò chơi hấp dẫn với người dùng hơn

Và tất nhiên là không thể thiếu một ít kiến thức về Python cơ bản như biến, câu lệnh điều kiện(if/else), vòng lặp while/for, …

Còn chần chừ gì nữa, hãy ghé bài blog này để làm một trò chơi riêng của mình rồi khoe với bạn bè người thân nha.
    
## Tạm biệt Atom
Atom được ra mắt vào năm 2014, với mục tiêu cung cấp cho lập trình viên một code editor vừa dễ sử dụng vừa có khả năng tuỳ chỉnh cao từ đó sẽ có nhiều người có thể phát triển phần mềm hơn.

Tuy nhiên với sự phát triển vượt bậc của cloud cùng các sản phẩm Microsoft Visual Studio Code, Github Codespaces, team GitHub đã ra quyết định sẽ chia tay Atom vào cuối năm nay, 2022, để tập trung phát triển những sản phẩm khác đang thu hút lượng lớn người dùng hơn.

Bạn có biết Atom chính là nền tảng tạo ra Electron framework, mở đường để tạo ra hàng ngàn ứng dụng như Microsoft Visual Studio Code, Slack, và cả Github Desktop.

Nếu bạn đang sử dụng Atom thì bạn có 6 tháng để chuyển đổi qua editor khác. Bạn có thể đọc thêm chi tiết thông báo này ở link bên dưới:

https://github.blog/2022-06-08-sunsetting-atom/

    
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