Việc bảo mật website thường bị bỏ qua phần đảm bảo an ninh cho phần giao diện front-end của website vì họ thường nghĩ rằng chỉ cần thực hiện tốt ở phần back-end thì mọi thứ sẽ được đảm bảo an toàn. Các dữ liệu của người dùng, các thông tin nhạy cảm hay  dữ liệu quan trọng đều được lưu trữ ở phía backend và các lập trình viên phải thực hiện việc bảo vệ dữ liệu này. Mặc dù dữ liệu có thể được bảo vệ một cách chặt chẽ ở phía backend nhưng front-end là một trong những con đường tấn công đầu tiên mà hacker tiếp cận tới website của bạn, và đây cũng là con đường mà hacker có thể lấy được những thông tin quan trọng trong website của bạn nếu có được quyền truy cập. Vì vậy, việc thực hiện đảm bảo an toàn tốt cho website không chỉ thực hiện ở phía back-end bằng cách biện pháp đảm bảo an toàn thì phần front-end cũng đóng vai trò quan trọng giúp giảm thiểu đáng kể nguy cơ bị tấn công vào website cũng như việc thất thoát dữ liệu. Trách nhiệm đảm bảo an toàn cho website là trách nhiệm của lập trình viên ở cả phía front-end và back-end.

Có rất nhiều cách tấn công vào hệ thống của chúng ta qua con đường tấn công từ phía front-end. May mắn thay, việc chúng ta thực hiện tốt các biện pháp đảm bảo an toàn giúp giảm thiểu rất nhiều nguy cơ bị tấn công cũng như giảm thiểu mức độ nguy hại của các cuộc tấn công vào website. Bài viết sẽ đề cập tới một số biện pháp đảm bảo an toàn được áp dựng từ phía front-end.
# Các biện pháp đảm bảo an toàn
## Sử dụng các framework hiện đại, đảm bảo an toàn
JavaScript frameworks là một trong những thành phần quan trọng trong phát triển web hiện đại. Hầu hết các trang web hiện nay được xấy dựng bằng các framework hiện đại như: React, Vue hoặc Angular. Những framework này được xây dựng với rất nhiều các biện pháp đảm bảo an ninh và những lợi ích của nó đem lại khiến ngày càng nhiều người sử dụng nó.
![](https://images.viblo.asia/875419f9-4773-41b1-a110-1f643ee14473.jpg)

Một ví dụ về framework AngularJS. Nó có khả năng tự động chống lại các cuộc tấn công Cross Site Scripting ([XSS](https://viblo.asia/p/ky-thuat-tan-cong-xss-va-cach-ngan-chan-YWOZr0Py5Q0)). Angular tự động thực hiện encoding các dữ liệu đầu ra của người dùng thông qua việc sử dụng {{output_data}} mà không sử dụng dữ liệu raw từ phía người dùng nhập vào. Hay khi sử dụng innerHTML, Angular tự động làm sạch dữ liệu đầu ra để chống lại tấn công XSS. Hoặc khi sử dụng các biến URLs, CSS, Angular cũng tự động đảm bảo rằng các biến này được xử lý một cách an toàn trước khi đượ sử dụng.

Angular chỉ là một ví dụ, các framework khác cũng hỗ trợ việc chống lại các cuộc tấn công XSS. Dù không thể chống lại hoàn toàn các cuộc tấn công, nhưng việc sử dụng các framework này giúp giảm thiểu đáng kể các cuộc tấn công so với chỉ lập trình bằng javascript đơn thuần.
Ngoài ra, chúng ta cần đảm bảo các framework chúng ta sử dụng luôn được cập nhật ở phiên bản mới nhất để tránh các rủi ro bị tấn công khi các phiên bản cũ có lỗ hổng bảo mật đã được public. 
## An toàn trong quá trình phát triển ứng dụng
**Không sử dụng innerHTML đối với dữ liệu người dùng, thay vào đó sử dụng textContent**
Thuộc tính Element.innerHTML giúp set, hoặc get đoạn mã HTML của một phần tử nào đó trên trang web.
Ví dụ: Ta có một thẻ < h1 > sau có đoạn text được bôi đậm:

`<h1 id="Viblo" style="color: red"><strong>Viblo</strong> code</h1>`

Để "get" (lấy được) nội dung của phần tử có id "Viblo" nói trên, viết code như sau:

```
var element = document.getElementById("Viblo");
element.innerHTML
```
Kết quả trả về của đoạn code JavaScript trên là:

"<strong>Viblo</strong> Code"

Vậy là thuộc tính này không chỉ làm việc với text đơn thuần, mà nó mục đích là để truyền vào hoặc copy các đoạn code HTML. Vì vậy nếu chúng ta không cần truyền nội dung có các thẻ html mà chỉ nội dung text thuần thì không nên sử dụng innerHTML mà hãy dùng textContent. Thuộc tính textContent sẽ không hiểu đoạn mã bạn truyền vào là một cú pháp HTML, mà chỉ là text 100% không hơn không kém

**Encode dữ liệu đầu ra**

Chúng ta có thể sử dụng các hàm: escapeHtml(), escape trong javascript, auto escape trong AngularJS... để thực hiện encode dữ liệu đầu ra, tránh các lỗi XSS. Việc encode này sẽ được thực hiện chuyển các ký tự sang dạng encoded, ví dụ: 

```
 & --> &amp;
 < --> &lt;
 > --> &gt;
 " --> &quot;
 ' --> &#x27;     
 / --> &#x2F;     
```
## Thiết lập an toàn khi phát triển ứng dụng
### Đảm bảo XSS protection được sử dụng
**Sử dụng mode: `"X-XSS-Protection": "1; mode = block"`.**

Nếu các đoạn mã javascript độc hại được tiêm từ đầu vào của người dùng, chúng ta có thể hướng dẫn trình duyệt chặn phản hồi bằng cách cung cấp tiêu đề "X-XSS-Protection": "1; mode = block".

### Thiết lập Content Security Policy
Content Security Policy (CSP) là chính sách bảo mật nội dung, được sử dụng để xác định các nguồn nội dung an toàn trên website mà trình duyệt có thể tải về cho người dùng. CSP là biện pháp đối phó rất hiệu quả với kiểu hack chèn mã độc Cross Site Scripting (XSS).

Khi bạn truy cập vào một trang web, trình duyệt sẽ gửi yêu cầu tải nội dung đến máy chủ. Máy chủ sẽ gửi trả lại nội dung của trang web này cho trình duyệt, trong đó bao gồm các file CSS, Javascript, Font, Frame … Trình duyệt sẽ tải toàn bộ những file này, vì nó được chỉ định phải làm như vậy từ mã nguồn của trang web để có thể hiển thị nội dung
![](https://images.viblo.asia/957e4954-e7d1-448e-b1e0-58cd2c1307aa.png)

Hacker có thể lợi dụng điều này để đặt một đoạn mã ở trong mã nguồn ( những người sử dụng mã nguồn không rõ nguồn gốc hoặc hàng nulled rất hay bị dính ) hoặc trong một phần bình luận trên trang web để tải một số file Javascript độc hại từ một nguồn bên ngoài.
Trình duyệt sẽ không tự biết được có nên tải những file này hay không, nó chỉ thực thi theo yêu cầu, cho dù nguồn gốc của file Javascript đến từ trang web độc hại

Thiết lập các thuộc tính trng CSp (theo OWASP)
```
default-src: Define loading policy for all resources type in case of a resource type dedicated directive is not defined (fallback),
script-src: Define which scripts the protected resource can execute,
object-src: Define from where the protected resource can load plugins,
style-src: Define which styles (CSS) the user applies to the protected resource,
img-src: Define from where the protected resource can load images,
media-src: Define from where the protected resource can load video and audio,
frame-src: Define from where the protected resource can embed frames,
font-src: Define from where the protected resource can load fonts,
connect-src: Define which URIs the protected resource can load using script interfaces,
form-action: Define which URIs can be used as the action of HTML form elements,
sandbox: Specifies an HTML sandbox policy that the user agent applies to the protected resource,
script-nonce: Define script execution by requiring the presence of the specified nonce on script elements,
plugin-types: Define the set of plugins that can be invoked by the protected resource by limiting the types of resources that can be embedded,
reflected-xss: Instructs a user agent to activate or deactivate any heuristics used to filter or block reflected cross-site scripting attacks, equivalent to the effects of the non-standard X-XSS-Protection header,
```
### Disable iframe embedding để ngăn chặn tấn công clickjacking

Clickjacking là một hình thức tấn công đánh lừa người dùng nhấp chuột vô ý vào một đối tượng trên website. Khi nhấp chuột vào một đối tượng trên màn hình, người dùng nghĩ là mình đang click vào đối tượng đó nhưng thực chất họ đang bị lừa click vào một đối tượng khác đã bị làm mờ hay ẩn đi.

Kẻ tấn công có thể sử dụng kỹ thuật tấn công này cho nhiều mục đích. Đánh cắp tài khoản người dùng, lừa click vào quảng cáo để kiếm tiền, lừa like page hoặc nguy hiểm hơn là cài một webshell lên máy chủ web.

Thiết lập:
```
"X-Frame-Options": "DENY"
```

### Không để lộ thông tin referrer value
When you click on a link that navigates away from your website, the destination website will receive the URL of the last location on your website in a referrer header. That URL may contain sensitive and semi-sensitive data (like session tokens and user IDs), which should never be exposed.
Khi bạn nhấp vào liên kết điều hướng khỏi trang web của bạn, trang web đích sẽ nhận được URL cuối cùng bạn click trước đó trên trang web của bạn trong referrer header. URL đó có thể chứa dữ liệu nhạy cảm (như sessionID người dùng), những thông tin này không nên được tiết lộ.
Để ngăn chặn việc này, chúng ta thực hiện thiết lập:

`"Referrer-Policy": "no-referrer"`
## Cẩn trọng khi sử dụng các thành phần của bên thứ 3
### Các dịch vụ của third party
Các dịch vụ của bên thứ ba như Google Analytics, Intercom, Mixpanel hay những thư viện JavaScript có sẵn của bên thứ 3 cung cấp sẵn cho chúng ta những tiện ích và dễ dàng sử dụng. Nhưng đồng thời, tiềm ẩn nguy cơ có thể làm cho trang web của bạn dễ bị tổn thương hơn, bởi vì nếu dịch vụ của bên thứ ba bị xâm phạm, thì đó sẽ là trang web của bạn.

Nếu bạn quyết định tích hợp dịch vụ của bên thứ ba, hãy đảm bảo đặt chính sách thiết lập CSP đủ mạnh vẫn sẽ cho phép dịch vụ đó hoạt động bình thường. Hầu hết các dịch vụ phổ biến đã ghi lại những chỉ thị CSP mà họ yêu cầu, vì vậy hãy đảm bảo tuân theo các hướng dẫn của họ.
### Sử dụng  Subresource Integrity cho các đoạn mã của bên thứ 3
Đối với các đoạn mã bạn sử dụng của bên thứ 3, cần đảm bảo rằng thiết lập giá trị `integrity` nếu có thể.  Trình duyệt có chức năng `Subresource Integrity `có thể xác thực hàm băm mật mã của tập lệnh mà bạn đang tải và đảm bảo rằng nó không bị giả mạo.
Đoạn mã của bạn sử dụng cần thực hiện như sau:
```
<script src="https://example.com/example-framework.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>
```
# Kết luận
Có rất nhiều kỹ thuật tấn công khác nhau để tấn công vào website của bạn, các biện pháp tôi đưa trên đây không đảm bảo an toàn tuyệt đối cho website của bạn. Nhưng nếu bạn áp dụng đầy đủ các biện pháp trên, phần lớn nguy cơ tấn công website của bạn sẽ được giảm thiểu, đặc biệt là các cuộc tấn công qua phía front-end.

Các biện khuyến nghị trên chỉ không phải là yêu cầu bắt buộc tôi muốn các lập trình viên sử dụng khi lập trình vì nó còn phụ thuộc và nhiều yếu tố khác: yêu cầu hệ thống, chức năng, nghiệp vụ...Nhưng đứng trên cái nhìn của người làm về bảo mật, tôi vẫn khuyến nghị các bạn sử dụng các biện pháp trên càng nhiều càng tốt vì nó sẽ giúp trang web của các bạn giảm thiểu được nguy cơ cũng như hậu quả của các cuộc tấn công.

Cảm ơn các bạn đã theo dõi!!!
# Nguồn tham khảo:
https://levelup.gitconnected.com/10-security-tips-for-frontend-developers-19e3dd9fb069
https://www.shopify.com/partners/blog/website-security