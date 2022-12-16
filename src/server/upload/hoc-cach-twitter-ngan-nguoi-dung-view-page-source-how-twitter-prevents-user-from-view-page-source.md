Xin chào các bạn, lại là mình đây :) :).
Thời gian vừa rồi bận chuẩn bị cho cuộc sống mới nên chưa có thời gian chia sẻ tiếp về những điều mình học được cho các bạn. Mấy hôm nay ngồi voọc cái vấn đề này, vừa làm vừa nhẩm bụng phải cố làm đc lên chia sẻ cho ae trên này, hehe :-D

Bài này mình sẽ viết nó theo trình tự từ lúc mình gặp vấn đề và theo luồng suy nghĩ của mình nhé các bạn. Nếu có gì thắc mắc cứ comment nhiệt tình cho mình biết nhé ;)
# Sự vi diệu của Twitter
Mình có một thói quen đó là vì là Goét Đi ve lốp pơ, nên vào bất kì trang web nào mình hầu như đều xem source của nó, xem nó dùng công nghệ gì, có lộ tí gì cho ae copy được không :-D, kéo kéo trình duyệt tí xem có responsive không, trang nào responsive tốt là yêu ngay rồi <3, mình thích frontend mà :-D. 

1 ngày nọ vào [Twitter](https://twitter.com), đăng nhập (nhớ phải đăng nhập nhé) và như 1 thói quen click chuột phải và mở View Page Source trên trình duyệt, bùm 1 tab mới bật ra và chẳng hề có 1 cái gì gọi là có giá trị trên đó (Xem hình)

![Twitter.com](https://images.viblo.asia/66157a45-5e28-45ba-9fb5-dd08f5a98a56.png)

Không một file JS, không gọi API, mình thắc mắc: thế nội dung nó render từ đâu mà ra, những nội dung mình thấy, hình ảnh mình xem từ đâu render mà có, vẫn địa chỉ đó, KHÔNG CÓ 1 thứ gì ngoài vài dòng HTML "vớ vẩn"

Thử copy chỗ HTML kia về rồi chạy thử thì thấy trang reload liên tục. Xong, không hiểu tại sao :dizzy_face::dizzy_face:
# Tìm kiếm trợ giúp từ Google
## Tìm kiếm tập 1
Sau đó có lên Google tìm hiểu về điều này thì thấy chỉ có duy nhất 1 anh bạn cũng thắc mắc như mình tạo câu hỏi trên reddit, các bạn có thể xem tại [đây](https://www.reddit.com/r/javascript/comments/9kfbny/how_does_twitter_abstract_its_source_code_after/)
Hầu hết mọi người đều băn khoăn không biết tại sao Twitter làm được thế. Có anh bạn còn comment thế này: 

![reddit_comment](https://images.viblo.asia/a1f268f1-d8a8-46f1-b6e4-7a1a33fa9933.png)

Đại loại là: vì code js đc lưu vào bộ nhớ trình duyệt nên Twitter xoá sạch thẻ `script` đi mất rồi :-D :-D. Comment thần thánh quá mình phải comment lại tôn làm GOD ngay bên dưới :-D

Nhưng có 1 người phát hiện ra rằng Twitter dùng 1 trường tên là Referer để từ đó xác định xem nên trả về cho client nội dung như thế nào. Mình thử thì đúng thật, khi truy cập vào Twitter như bình thường thì có trường `referer` gửi kèm `header` trong `request`, nhưng khi mở View Page Source thì không có. Dùng Postman cũng cho kết quả tương tự. Lại càng thêm thắc mắc.

## Tìm kiếm tập 2
Sau đó mình lại quay lại Google tìm cách "prevent user from viewing source code", thì toàn các bạn chỉ cho cách ngăn user bấm chuột phải :-D. Tự thắc mắc: nếu user không bấm chuột mà bấm tổ hợp phím thì ngăn sao? Override lại tổ hợp phím à? OK, thế nếu user dùng trình duyệt khác hoặc cuối cùng là họ dùng POSTMAN thì tính sao. ->> BẾ TẮC 
# Các bài học nhận ra
Đến đây mình đành phải tự lực cánh sinh, mò mẫm tìm hiểu. Mình xoáy sâu vào trường `referer` trong `header` của `request` đã nói ở trên, cố gắng gán giá trị cho nó. Dùng JS các kiểu, lên server vào Nginx config trực tiếp cũng không thể nào thay đổi giá trị của nó được. Haizz... đến đây đành phải nghiêm túc lại học lý thuyết rồi :-D

## Referer là gì
Sau đó mình mới đọc kĩ cố tìm hiểu thật kĩ về `referer` thì mô tả ngắn gọn về nó như sau: nó là 1 trường với giá trị là trang web mà bạn đã truy cập ngay trước trang web hiện tại.
`referer` có thể hiểu là: người tham chiếu - người đã giới thiệu bạn đến trang web của tôi là ai, ai giới thiệu chú đến chỗ chị :-D

Và `referer` KHÔNG được tự thay đổi bởi user mà sẽ tự được gửi theo request trên trình duyệt (theo mình đã thử và search thì như thế :))

Khi mình mở 1 tab mới vào truy cập vào `zing.vn` chẳng hạn, khi đó ta không bắt đầu từ trang nào trước đó, nên ta không có `referer`, ta đi thẳng trực tiếp từ tab mới vào `zing.vn`. Chỉ các resource(js, css, ...) được tải kèm là có trường `referer` vì sau khi ta truy cập vào `zing.vn` thì các resource mới được tải. Tiếp theo ta thử bấm vào 1 tin trên `zing.vn` thì từ bây giờ ta sẽ có `referer` ngay khi trang load lần đầu vì ta đã có `người tham chiếu là trang trước đó rồi` 

Đến đây mình thử  mở 1 tab mới, truy cập lại Twitter, thì thấy: Ồ có trường `referer` ngay từ đầu luôn, vi diệu vậy ba :clap::clap:

## Cách Twitter tải trang
Vì thấy Twitter có `referer` ngay từ đầu, và `referer` đó có giá trị là `https://twitter.com` luôn:

![Twitter_request](https://images.viblo.asia/e44f542e-487e-4390-b260-850addbeb555.png)

Điều này chứng tỏ, khi chúng ta truy cập vào Twitter thì nó được tham chiếu bởi chính nó hay nói cách khác: đó là là địa chỉ trang web được truy cập ngay trước trang hiện tại là `twitter.com`, nghĩa là chúng ta đã ở trang `twitter.com` từ trước đó, sau đó ta lại redirect đến `twitter.com`

WTFFF, tức là mình truy cập 2 lần vào `twitter.com` à? Nhưng mình đâu có thấy điều hướng gì đâu nhỉ?????

Thử để ý sâu hơn 1 chút nữa khi mở Twitter (không cần clear cache hay cookie gì nhé):

[Xem ảnh](https://i.imgur.com/09wyly3.gifv)

Nếu để ý kĩ, ngay tại thời điểm chúng ta truy cập vào Twitter.com từ tab mới, nếu để ý kĩ, ta sẽ thấy trình duyệt đã load 2 lần (không cần phải đến slow motion :-D). 1 khoảng thời gian rất ngắn ban đầu thôi, nhưng đủ để chúng ta thấy nếu để ý kĩ.

Từ đây mình rút ra rằng. Tại thời điểm ban đầu khi truy cập `twitter.com` chúng ta (user) sẽ như sau:
- Ban đầu truy cập chưa có `referer`, trang sẽ redirect đến chính nó (phỏng đoán: chắc là dùng js để redirect cho dễ)
- Sau đó lần sau có `referer` rồi thì load source thật vào rồi render nội dung thôi

# Nghiền ngẫm giải pháp
Từ đây mình mới nhớ lại cái trang rỗng tuếch của Twitter mình nói ở đầu bài khi ta bấm View Page Source. Thử copy trang đó về và tự chạy, thấy trang load lại liên tùng tục đến khi nào browser nó chặn thì thôi, từ đó mình đoán ra vấn đề rất có thể từ đây. Trang này không hoàn toàn vô dụng như mình nghĩ từ đầu. Ban đầu còn tưởng nó làm trang đó để đánh lừa trông cho thần thánh chứ :-D.

Nhưng điều băn khoăn lại nảy sinh, đó là mình làm thì bị reload liên tục, tại sao Twitter chỉ reload có 1 lần là ngon -> Phải có 1 cái gì đó kiểm tra, sau lần thứ nhất thì render nội dung được rồi, không cần load tiếp nữa, việc này chắc sẽ không cần đến backend vì đã cần query xử lý dữ liệu qué chỗ nào đâu :-D. Chắc Webserver là thằng chịu trách nhiệm chính ;)

Đến đây thì mình dặn lòng: thôi đành nghiền ngẫm thật kĩ lại cái trang "rỗng tuếch" kia xem từng thứ 1 trong đó là gì. Cùng nhìn lại:

![Twitter_page _source](https://images.viblo.asia/66157a45-5e28-45ba-9fb5-dd08f5a98a56.png)

Ở đây những thẻ như `meta` hay đoạn `css` không quan trọng, nghĩ thế nên mình không tập trung vào, còn lại những chỗ sau:

* Thẻ `noscript`: thẻ này sẽ chạy khi Javascript không được bật hoặc không hỗ trợ trên trình duyệt, khi đó Twitter sẽ bảo người dùng tự bấm vào cái link trong thẻ `a` để tự load lại trang (tự redirect bằng tay), nhằm mục đích lấy `referer`
* Xuống thẻ `script` bên dưới có trường `nonce`, để ý thấy khi load lại trang source này thì trường `nonce` thay đổi liên tục, không hiểu nó để làm gì, và cái gì đã làm thay đổi được nó trong khi trang không hề có tí JS nào
* Để giải thích ngắn gọn về trường `nonce`: trường này để ngăn chặn hacker tấn công XSS, bảo mật cho trang web của mình hơn, trường này cần là 1 mã băm đủ dài và cần phải khác nhau giữa mỗi lần tải trang, nếu không thì nó vô dụng. Đây là 1 trong rất nhiều cách bảo vệ trang web bằng `Content-Security-Policy`, các bạn đọc kĩ hơn ở  [đây](https://scotthelme.co.uk/content-security-policy-an-introduction/) nhé. Việc generate trường này tự động và khác nhau thì ở tut [này](https://scotthelme.co.uk/csp-nonce-support-in-nginx/), mình làm cũng sấp mặt mà chỉ đc ở VPS không làm đc ở local :-D. Sau khi đọc ý nghĩa của nó thì mình nghĩ rằng trường này không phải thứ chúng ta nên tập trung bây giờ (sau này thì vẫn cần quan tâm :-D )
* Tiếp theo là đến câu lệnh tạo cookie: cookie này tên là `app_shell_visited`, ứng với route `/` và có thời gian sống là 5 giây. Thực sự đến bây giờ mình vẫn không hiểu được là trường này dùng để làm gì, khi load lại check trong khoảng 5 giây cũng chẳng thấy nó đâu
* Câu lệnh cuối cùng `location.replace(location.href.split("#")[0]);`, code JS chạy đến đây sẽ reload lại trình duyệt của chúng ta dựa vào địa chỉ trang web hiện tại. Tức là nếu mình đang ở `twitter.com` thì nó sẽ redirect đến cùng địa chỉ `twitter.com`. Mà như thế là redirect xong ta sẽ có `referer` -> Chìa khoá đây rồi :-D

# Demo
## Chuẩn bị
Để chuẩn bị demo ta tạo một số file đơn giản như sau: 

Các bạn xem code ở [repository này nhé](https://bitbucket.org/maitrungduc1410/twitter-hacking/src/master/)

Giải thích: 
* ở đây ta có 1 file `login.html` file này để login, và redirect người dùng về homepage nơi chứa nội dung chính
* `index.html` và folder `static`: ở đây mình demo luôn 1 project bằng VueJS thay vì HTML thuần cho mọi người. Vì có thể có bạn thắc mắc nếu HTML thuần thì chịu khó đọc ở cửa sổ Inspect là được :-D (chả cần phải giấu)
* `default.html`: file này là file khi người dùng chưa có `referer` sẽ nhìn thấy, là file khi mà user chọn View Page Source sẽ thấy. Nội dung thì mình copy y như của Twitter luôn. Mình đã xoá đi dòng code set cookie bằng JS vì thấy nó không cần thiết
* Server mình làm là Nginx trên VPS Ubuntu 16.04 nhé.

Phần chính chính là file config của Nginx. Các bạn có thể thấy mình sử dụng `map` để check giá trị của biến và gán giá trị cho chúng. Mình không dùng `if` vì `if` trong Nginx được khuyên không nên dùng, vì nó hoạt động có thể không chính xác tại nhiều trường hợp. Và thật sự mình mất nguyên 1 ngày cuối tuần vì mắc kẹt trong vòng luẩn quẩn của `if` :-D. May sao cuối tuần được nghỉ 2 ngày nên vẫn chơi được :sunglasses:.

Ở trong file config mình đã cố gắng comment chi tiết nhất có thể để các bạn có thể hiểu, file config này cũng chưa phức tạp lắm, các bạn có thể ốp vào dùng đc ngay.

Vì giải thích khái niệm những thứ trong config thì khá loằng ngoằng, những chỗ mình dùng trong đó search google hoặc đọc docs trên trang chủ Nginx đều có hết nhé :). Mình nói ngắn gọn cách hoạt động của nó thế này:
* Ban đầu khi user truy cập trang -> không có cookie tên là `auth_token` -> trả về client trang `login.html`
* Khi bấm click login thì có 1 đoạn code JS ở file `login.html` các bạn có thể xem. Mình set cookie và reload lại trang.
* Lúc này Nginx thấy đã có cookie cần thiết, mà cũng có referer luôn (vì vừa reload/redirect mà). nên trả về cho trang homepage
* Nếu ta thử bấm View Page Source thì sẽ thấy trang `default.html` vì lúc đó có cookie nhưng không có `referer`
* nếu ta thử xoá cookie và load lại thì sẽ lại về login vì lúc đó ta có `referer` nhưng không còn cookie nữa (coi như chưa auth)
* Vì trong file config ta đã bắt trường hợp user truy cập trực tiếp vào file .html, đồng thời Vue-router mình cũng bắt trường hợp đó nữa, nên nếu các bạn cố truy cập vào file.html thì cũng chỉ thấy được nội dung trang tuỳ vào vai trò hiện tại (auth hay chưa, có referer hay không)

## Kết quả
Các bạn có thể xem kết quả mình đã hiện thực hoá ở đây nhé, demo này vẫn còn ở mức lởm lởm lắm ae xem thấy có gì không ổn comment cho mình nhé :-D

[Website](https://twitter-hacking.jamesisme.com/)

Thử đăng nhập với email bất kì cũng đc nhé ;), sau đó View page source thử xem. Sau đó tiếp lại thử clear cookie đi và f5 lại xem nhé.

## Note khi setup demo
Nếu bạn xem file config Nginx của mình thấy khó hiểu khi dùng `map` và muốn thay vào đó dùng `if` thông thường và kết hợp với `rewrite` (vì `try_files` không dùng được  bên trong `if`) thì các bạn nên cẩn thận. Rất có thể sẽ xảy ra trường hợp trang bị load lại vô hạn đó nhé ;)

Đọc bài viết này từ trang chủ Nginx để hiểu hơn sao không nên dùng `if` nhé: [if is evil](https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/)
# Kết luận
Sau 2 ngày to hết đầu vì cái này thì cuối cùng cũng có được 1 cái gì đó để tiếp tục chia sẻ với mọi người.
Qua đây mình thấy việc bảo mật code sao cho càng làm khó các developer thì càng ngày càng được ưa chuộng, dù sao thì che giâú càng nhiều càng tốt phải không :-D. Mặc dù làm thế này nhưng nếu user đăng nhập vào twitter, lấy cookie đó sau đó gửi bằng postman kèm referer (dùng postman thì gửi referer theo được) thì vẫn sẽ thấy source. Nên mình nghĩ cũng rất khó để ngăn chặn được hết các hành động của user trên trình duyệt :).

Đồng thời chúng ta cũng hiểu thêm được 1 cách tiếp cận mới mà ông lớn Twitter thực hiện (mình không dám chắn chắn phần đằng sau - server làm giống được như họ). Chúng ta cũng thấy rằng thế giới ngoài kinh thật :-D, nghĩ ra đủ thử mới cho mình luôn luôn phải học theo :sunglasses::sunglasses:. 

Thôi thì cứ đành đi bòn góp kiến thức, tích luỹ dần dần để tăng khả năng của bản thân nhé các bạn đọc của tôi, hẹn gặp lại các bạn vào các bài sau <3

Tại hạ cũng chỉ mong muốn giúp người, không yêu xin đừng nói lời cay đắng ;)