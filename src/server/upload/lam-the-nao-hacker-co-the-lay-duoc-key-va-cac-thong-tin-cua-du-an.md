![](https://images.viblo.asia/baa33847-0125-496b-a8b9-61206e1744f5.jpg)

Sau khi dự buổi seminar của sếp về vấn đề bảo mật thông tin dự án thì có nghe sếp bảo rằng không biết họ lấy thông tin của bảo mật của dự án như thế nào mà nhanh thế, key vừa public được vài phút thôi đã có ông Hách Cơ lấy được rồi. Vì tò mò nên mình cũng đi thử tìm hiểu xem làm thế nào mà các hách cơ có thể làm được điều kì diệu ấy :v 

API key, mật khẩu, SSH key và certificate đều là những phương pháp tốt để bảo mật, với điều kiện là **chúng phải thật sự private**. Private ở đây là gì, là chỉ những người có thẩm quyền thì mới được biết, và chỉ những người đó mới được sử dụng chúng. Về mặt cá nhân thì chỉ bạn có thể biết những thông tin này, còn đối với dự án thì phải có một quy trình đầy đủ xem ai được biết, ai được sử dụng, và sử dụng với quyền hạn như thế nào. Một khi chúng đã được public thì chả quan trọng Password có phức tạp đến mấy, hay thuật toán encrypt cao siêu đến mấy thì cũng rất có khả năng hệ thống của bạn sẽ bị các hackerman nhòm ngó và lợi dụng vào việc xấu.  Trong bài viết này mình sẽ chia sẻ một vài concept, phương pháp và tool được sử dụng để tìm thông tin và lợi dụng thông tin ấy.

Việc bảo mật thông tin này là một kèo không hề cân chút nào, bởi vì các hackerman chỉ cần thành công một lần, và chúng ta thì lại phải bảo vệ hệ thống của chúng ta trước tất cả các sự tấn công từ bên ngoài. Một khi bạn đã biết những nơi mà hacker có thể tấn công thì bạn hoàn toàn có thể bảo vệ hệ thống bởi một hoặc nhiều phương án giải quyết đơn giản nhưng cực kì hiệu quả:

- MFA: Multi Factor Authentication ở mọi nơi, từ Google, GitHub, AWS, GCP, VPN, ... tất cả mọi nơi mà bạn có thể nghĩ tới. Nếu service đó không có MFA thì nên cân nhắc về việc sử dụng nó. 
- Thay đổi key và password thường xuyên, áp dụng các policy về việc thay đổi này (độ phức tạp tối thiểu, không cho sử dụng lại password cũ, ... )
- Scan source code của hệ thống thường xuyên. Nên coi việc này là một step của việc release/deploy.
- Quản lý toàn bộ thông tin login và quyền access từ một hệ thống mà bạn có thể kiểm soát và theo dõi.

Nếu bạn biết đến [nguyên tắc 80/20](https://en.wikipedia.org/wiki/Pareto_principle) thì những hành động trên sẽ là 20% công việc để đảm bảo 80% việc bảo vệ lỗ hổng hệ thống. 

## Vậy các hách cơ làm thế nào để tìm ra thông tin mật của dự án?

### Tìm trong các file JavaScript

API key thường xuyên bị lộ ra ngoài, điều này xảy ra rất nhiều. Thường thì lý do khá là chuối nhưng dev thì lại hay quên:
- Để debug.
- Để dùng cho môi trường Development.
- Comment vào để cho Dev khác sử dụng

```javascript
// Cái này em dùng để test
// Pull Request sau em sẽ bỏ (bow)

API_KEY = "CaInAyLaApIkEyCuCkYqUaNtRoNgCuAdUaN";
```

Ngoài những ông Hách cơ nào rảnh thì sẽ ngồi mò từng file để tìm xem có lộ key ở đâu hay không thì phần lớn các hacker sẽ dùng những tool tự động scan với tool như [meg](https://github.com/tomnomnom/meg) để scan theo pattern. Hoặc một tool khác của cùng tác giả là [gf](https://github.com/tomnomnom/gf) (na ná nhưng xịn hơn `grep`) và sử dụng option `truffleHog` để tìm ra những đoạn string match với những pattern cơ bản mà một Key thường có. Hoặc đơn giản là tìm chữ `API_KEY` =))

Các file JavaScript không chỉ là nơi để các hackerman tìm thông tin key hay password mà bạn nên hiểu rằng: *Code JavaScript là code hệ thống được public cho bàn dân thiên hạ soi mói.* Một ông hacker thông minh thì họ có thể đọc code của hệ thống để hiểu được convention, path API, một số comment chứa thông tin hữu ích. Những thông tin này sau đấy có thể sẽ được họ đưa vào làm pattern cho các tool scanner để dễ dàng tìm được thông tin hơn. Việc này được gọi là "quét tự động thông minh (intelligent automated scan)", hiểu nôm na là việc kẻ tấn công sử dụng phối hợp giữa việc  tự động và thu thập thông tin hữu ích để khoanh vùng những thông tin cần thiết cho việc tấn công và lợi dụng. 

Một comment mình nghĩ chắc dự án nào cũng có, và vô hình chung đã để lộ ra điểm yếu của hệ thống:

```javascript
// example.com/api/v1 chưa xong nên tạm thời bỏ qua việc authentication, sẽ bổ sung sau.
```

 **Vậy ta nên làm gì ?**

- Minify/Uglify có thể làm rất tốt trong việc chặn các tool Scanner.
- Hạn chế tối đa việc để key trong code, nếu bắt buộc thì chỉ cấp đủ quyền cho key ấy hoạt động đúng mục đích của nó. Hạn chế việc lợi dụng key bằng việc đảm bảo key ấy chỉ được làm gì, và chỉ có thể làm được việc ấy ở đâu.
- Sử dụng chính những tool của hackerman sử dụng để tự động scan code trong CI. Nhất là những tool check pattern chạy nhanh gọn. Những câu `grep` hay  `gf` cơ bản có thể tìm được những pattern hay lỗ hổng bảo mật mà Dev không may để lại. 
- Tăng người review, chả có tool nào có thể thay thế được con người trong việc phát hiện ra các vấn đề cần giải quyết, cả về chất lượng lẫn bảo mật.

### Wayback machine
Nếu như bạn không biết thì trang web https://archive.org/ hay còn gọi là internet archive, Wayback machine, ... là một trang web lưu lịch sử scan của các website trên internet từ ngày xửa ngày xưa. Đây là một kho tàng thông tin để các hacker có thể đào bới. Với những tool như [waybackurls](https://github.com/tomnomnom/waybackurls), một hacker có tâm sẽ có thể bới ra những thông tin cần thiết từ các file cũ. Điều này có nghĩa là nếu hacker tìm thấy một đọan key cũ tuy đã không còn trong code hiện tại những chưa được thay đổi thì chúng vẫn có thể sử dụng được.

Nếu bạn tìm thấy một key xuất hiện ở chỗ mà nó không nên xuất hiện ? 
1. Tạo một key mới
2. Release một version mới sử dụng key mới, và xoá dòng để lộ key.
3. Xoá hoặc deactivate key cũ.

**Way backmachine không chỉ dùng để tìm key**

Code cũ của hệ thống chứa đủ những thông tin mà các hacker cần:
- Path API, cấu trúc folder, những endpoint không được bảo vệ mà bạn nghĩ sẽ không có ai tìm được. Có thể thông tin tìm được không trực tiếp giúp hacker lợi dụng sơ hở những sẽ giúp chúng phân tích được cấu trúc API và convention của hệ thống. Một khi đã code đã được public thì sẽ không thể nào control được hết các vấn đề như thế này. Đây là điều cốt yếu mà dev cần lưu tâm
- Trang quản trị của web, cũng như endpoint API, là một hướng đế các hacker tấn công vào hệ thống. Việc chúng ta cần làm là đặt basic authen cho các trang quản trị và thường xuyên kiểm tra quyền access từ bên ngoài. Một sự việc mình từng thấy đó là hacker đã có thể vào được trang quản trị hệ thống chỉ với việc bỏ `s` khỏi chuỗi `https`. (dab)

### Sử dụng GitHub

**GitHub là mỏ vàng cho hacker**. 

Chỉ cần biết cách search và search đúng chỗ thì sẽ có thể tìm ra những thứ chứa thông tin cực kì hữu dụng. Với mỗi account không sử dụng MFA, thì đấy chính là những lỗ hổng bảo mật cực kì nguy hiểm. Một Dev không sử dụng MFA, và password bị lộ. thì hacker đã có thể dễ dàng lấy được toàn bộ source code của các dự án dev này tham gia, lộ thông tin nhân viên công ty, ... mối hiểm hoạ là rất lớn. 

Bản chất  của Git là lưu lại toàn bộ thay đổi của tất cả các dự án. Mỗi dòng code được viết, hoặc bị xoá đều mang lại một ý nghĩa nào đấy đối với công ty và khách hàng. Để lộ những thông tin này sẽ có thể  dẫn đến những vấn đề ảnh hưởng tới kinh doanh, tiền bạc và danh dự của khách hàng cũng như là công ty tổ chức của mình.

**Tại sao lại xảy ra vấn đề này?**

- Các công ty/team không tự quét các lỗ hổng bảo mật.
- Cho phép sử dụng tài khoản cá nhân trong công việc.
- Không thường xuyên đổi key hoặc bắt buộc sử dụng 2FA. Hai việc đơn giản này đã có thể ngăn chặn được hầu hết các lỗ hổng bảo mật trên.

**Dork**

Thuật ngữ "Dork" chỉ những câu search sử dụng những tính năng của search engine để khoanh vùng và tìm chính xác kết quả theo một pattern mong muốn. [Đây](https://www.exploit-db.com/google-hacking-database) là danh sách những Google Search Dork mà trả về những thông tin dễ bị leak trên internet

GitHub Dork không phức tạp như của Google, tuy nhiên theo mình thì nó cũng đã có đủ hết những tính năng cần thiết để một hacker tìm ra được những lỗ hổng bảo mật. Thử search những cụm sau trên GitHub nhé :D 

```python
password
dbpassword
dbuser
access_key
secret_access_key
bucket_password
redis_password
root_password
api_key
```

Bạn có thể tìm theo loại file để tìm ra được những lỗ hổng mình mong muốn như `filename:.htpasswd`, `filename:.npmrc _auth`

Bạn có thể tìm hiểu thêm về GitHub Dork ở [đây](https://securitytrails.com/blog/github-dorks)

**Hướng giải quyết**

- Scan các thông tin bị rò rỉ trong CI ([GitRob](https://github.com/michenriksen/gitrob))
- **Bắt buộc sử dụng [2FA của GitHub](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/requiring-two-factor-authentication-in-your-organization) !!!**
- Thay đổi access key, secret key và password thường xuyên và độc nhất trên tất cả các hệ thống. 

### Sử dụng Google

Bây giờ thì chúng ta đều đã hiểu về Dork rồi nhé. Việc tận dụng tối đa Dork trên Google sẽ mở ra một chân trời mới trong việc tìm kiếm thông tin và lỗ hổng bảo mật của các dự án và hệ thống. Search Engine xịn xò của Google có cung cấp các tính năng search như chứa, không chứa chuỗi, định dạng file, domain, URL, v..v.. Thử search câu sau nhé:

```html:html
"MySQL_ROOT_PASSWORD:" "docker-compose" ext:yml
```

Câu search này tìm đến đích danh những file `yml` và những file không được bảo mật: `docker-compose`, nơi mà Dev thường lưu password. Bạn sẽ ngạc nhiên về danh sách kết quả search đó. 

Kinh khủng hơn là nhưng dòng có thể chứa RSA key hoặc AWS credential:

```shell
"-----BEGIN RSA PRIVATE KEY-----" ext:key
```

Với sức mạnh của Google thì việc các hách cơ tìm ra được những lỗ hổng bảo mật là việc rất dễ có thể xảy ra một khi code hoặc thông tin dự án bị public. Đây là [danh sách các Google Dork](https://github.com/BullsEye0/google_dork_list/blob/master/google_Dorks.txt) có thể lộ ra những thông tin quan trọng của bạn và dự án.

## Kết

Bảo mật là một vấn đề thường bị xem nhẹ với các đội startups. Dev và các ông quản lý thường chỉ tập trung vào tốc độ và thời gian để đẩy hệ thống lên public mà hay bỏ qua chất lượng cũng như bảo mật. Để thông tin bảo mật của dự án vào code trên repo, không thay đổi key và password thường xuyên, hay không đặt ra một quy trình bảo mật cụ thể, dẫn đến việc một Dev không may public một git clone của dự án. Nếu bạn đặt nên một quy trình nhất định về bảo mật như policy cho password, MFA, hay một tool share password một cách bảo mật như [SnapPass](https://github.com/pinterest/snappass), một hệ thống quản lý key và password chung như [Vault](https://www.vaultproject.io/), ... thì bạn sẽ có thể giữ được tốc độ phát triển nhanh mà không giảm đi độ bảo mật của dự án.

Biết được cách các Hacker làm việc thường sẽ là bước đầu tiên để hiểu được các vấn đề bảo mật và áp dụng vào hệ thống để chủ động ngăn chặn những hành vi xấu. Mình mong là các bạn sẽ hiểu được rằng những cái mình liệt kê ở trên chỉ là một vài cách trong vô số cách thức xâm nhập và đào bới của các hacker và việc bảo mật phải được áp dụng cho tất cả dự án, bất kể là phía người dùng hay phần core của hệ thống. 

Việc tiến hành và duy trì bảo mật thông tin thường khiến cho anh em khó chịu vì phải tuân theo đủ loại quy trình, tuy nhiên hãy yên tâm vì đôi khi chỉ với những việc làm đơn giản thì bạn và anh em đồng nghiệp sẽ tránh được vô số các mối nguy hại sau này.

Mình cảm ơn mọi người đã bỏ thời gian đọc bài viết của mình. Hẹn gặp lại (bow)

**Nguồn**: https://dev.to/omerxx/how-hackers-steal-your-keys-and-secrets-45g2