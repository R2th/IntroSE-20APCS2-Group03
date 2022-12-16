Hêlo mọi người, lại là mình đây.
Như câu nói "học thì phải đi đôi với hành", thì sau khi tìm hiểu lý thuyết về XSS xong thì mình nên sang thực hành luôn cho nóng nhé :v 

Thì hôm nay mình sẽ bay sang trang lab của Portswigger để thực hành về tấn công XSS, có thể phân tích bằng tay và áp dụng cả BurpSuite vào cho quen tay luôn.

Trước hết, nếu mọi người chưa biết đến XSS là gì thì có thể đọc lại bài viết trước của mình để biết thêm thông tin và cách sử dụng BurpSuite để áp dụng vào bài này nha.

OK Let's Go...
# 1. Lab: Reflected XSS into HTML context with nothing encoded
link: https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded

Đúng như tên gọi của bài Lab (html không được ***encode***). 

Cái này thì chắc chắn ai cũng biết rồi, đối với những form không validate và get thẳng giá trị thì chỉ cần chèn 1 đoạn script đơn giản như này vào là sẽ có alert ngay thôi.

![](https://images.viblo.asia/f7f6e895-1b87-442a-a2a2-3c160bc6d873.PNG)
![](https://images.viblo.asia/dd7244aa-8a3e-4377-b0bd-8d1436545ce9.PNG)

# 2. Lab: Stored XSS into HTML context with nothing encoded
link: https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded

Vẫn không encode nhưng lần này là **XSS Stored**

Vẫn lấy lại đoạn script trên, mình sẽ inject vào input của comment vào 1 bài post bất kì

![](https://images.viblo.asia/b6b72ca3-f7ec-4c03-acca-69c6d6b694c5.PNG)

Ok ngon, vừa post comment đã lên ngay alert.

![](https://images.viblo.asia/58763b41-dae8-43aa-aa2e-f108ea7aeef4.PNG)

Nếu check element chúng ta sẽ thấy đoạn script đã được inject thành công vào comment và tự động thực thi khi load

![](https://images.viblo.asia/bb988a9b-2361-4918-8ee5-f229850f1882.PNG)
# 3. Lab: Reflected XSS with some SVG markup allowed
link: https://portswigger.net/web-security/cross-site-scripting/contexts/lab-some-svg-markup-allowed

Trở lại với khung search tìm kiếm, lần này đã lợi hại hơn xưa, không còn cho phép tag script thực thi nữa :v

![](https://images.viblo.asia/dc3c6473-f41d-4805-ac48-675b9bfd2fb6.PNG)

Cuộc vui nào cũng có lúc dừng, và đối với cái khung search này cũng thế. Lab này hơi khó nhằn nên tôi mở **BurpSuite** lên đây 😊

Bằng cách bắt lại request lúc search và ném sang **Intruder**, chúng ta sẽ bắt đầu **Brute-Force** xem còn tồn tại những tag nào chưa được lọc sẽ lợi dụng mà inject vào.

![](https://images.viblo.asia/286b9c56-2989-48cd-8b87-d5c608d7c4c2.PNG)

Mình sẽ đánh dấu ***đô-la*** để lọc ra các tag vẫn chưa bị lọc trước

![](https://images.viblo.asia/4c064e49-1c76-4c7b-bf11-ee77b6d546db.PNG)

Sang trang ***[CheatSheet XSS](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)*** của PortSwigger và ***copy all tag*** để brute ra tag chưa được lọc và paste vào phần **payloads** trên **BurpSuite**

![](https://images.viblo.asia/3b695787-9a0a-46bf-9c63-94054fbfe728.PNG)
![](https://images.viblo.asia/7ab61a43-0142-4b76-8d9b-a4a9fbff1463.PNG)

Sau 1 hồi chờ đợi thì ta lọc được các tag chưa được filter với status code trả về là 200, chúng ta sẽ test thử bằng ***animatetransform*** thử xem sao.

![](https://images.viblo.asia/af106c80-83d6-4a30-990e-d446b664c6e4.PNG)

Syntax của ***animatetransform***

![](https://images.viblo.asia/d50dc874-e80f-4c30-b14c-f82b37638770.PNG)

Như vậy nếu có ***animatetranform*** thì phải có thẻ ***svg*** ở trước, hình như trong phần attack cũng có lọc được thẻ svg, vậy thì triển thôi.
Copy phần event lấy từ **[Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)** lúc nãy đưa vào phần payloads

Mình sẽ đặt 2 dấu đô-la sau ***animateTransform*** để brute các event được copy từ cheat sheet (%22 là space sau khi encode nhé, nếu bấm space trực tiếp trong phần request của Burp sẽ không nhận phần url phía sau đâu nha)

![](https://images.viblo.asia/65c6eb1d-3fd7-4dd3-b975-fcf84019b8c1.PNG)

Yeah, có statuscode 200 đây rồi, chúng ta sẽ test trên browser luôn

![](https://images.viblo.asia/172bf93b-0051-458c-bcdb-41defc55ce38.PNG)

À mình quên, tag ***animatetransform*** không có thẻ đóng nhé (mình gõ nhầm), lúc nãy brute không có thẻ đóng, nhưng bằng cách thần kì nào mà nó vẫn status code 200 😊

Đoạn code sẽ như này `link + ?search=<svg><animatetransform onbegin=alert(1)>`

Ok ngon :v: 

![](https://images.viblo.asia/2a3b5ff5-97d7-4167-9d50-727b650ddd68.PNG)
# 4. Lab: Reflected XSS into attribute with angle brackets HTML-encoded
link: https://portswigger.net/web-security/cross-site-scripting/contexts/lab-attribute-angle-brackets-html-encoded

Nếu ở đây chúng ta áp dụng kĩ thuật lúc nãy thì sẽ không thành công. Có lẽ chuỗi dữ liệu đã bị lọc hoặc bằng cách nào đó đã được truyền sang param khác.

![](https://images.viblo.asia/fd824a16-adb9-49b0-a403-f01889bdb7c5.PNG)

Chúng ta sẽ check source. Nếu để ý kĩ trong source thì ta sẽ thấy chuỗi tìm kiếm đã được chuyển vào value và  mã hóa đi các dấu đóng mở.

![](https://images.viblo.asia/a8337542-005f-433f-b5c2-6c00587aa0ed.PNG)

Ok chúng ta sẽ có cách xử lý khác. Đây là syntax 1 hàm bất kì trong thẻ input mà mình search ở w3school hoặc mọi người cũng có thể xem cheatsheet XSS nhé. ( mã hóa mấy dấu < > chứ có mã hóa mấy dấu ngoặc ' đâu :v )

![](https://images.viblo.asia/c7891fcc-d02e-4d4f-af3b-0837a17a8f7f.PNG)

Nếu dữ liệu được chuyển xuống value có code như sau `value=”cái gì đó”`

Vậy nếu mình đặt vào chuỗi tìm kiếm 1 cặp dấu ngoặc nữa như này `”onmousemove=”son dep trai` thì giá trị value sẽ vô nghĩa và dấu ngoặc còn lại sẽ được ghép với dấu ngoặc thứ 2 mà mình nhập vào
`Value=””onmousemove=”son dep trai”` => Logic 😊

![](https://images.viblo.asia/e9633cb5-b71b-4c2b-bbae-698595f63e4d.PNG)

Khi mình rê chuột đi sẽ xuất hiện alert, ngoài ra cũng có thể sử dụng các cheat sheet khác như trong bài viết trước mình đã chia sẻ như onmouseover, blabla...

![](https://images.viblo.asia/71015d73-5611-47db-8743-510b59120e14.PNG)


# 5. Lab: Stored XSS into anchor href attribute with double quotes HTML-encoded
link: https://portswigger.net/web-security/cross-site-scripting/contexts/lab-href-attribute-double-quotes-html-encoded

Lại là trang blog từ lab02, chúng ta sẽ vào bất kì 1 post nào và lại test lại chức năng comment.

Bây giờ đoạn script "son dep trai" :v: được thực hiện trên input comment đã không còn tác dụng.

![](https://images.viblo.asia/9ffe7552-ce33-433e-9495-40cc7a5fa079.PNG)

Nếu các bạn để ý sẽ thấy thẻ a href có đường dẫn đến website đã nhập ở input website. À hóa ra là dùng href chuyển đến website -> Thử truy cập vào sẽ thấy url có path của website và body là not found.

![](https://images.viblo.asia/df84e17f-75e3-4537-887e-c53cb21eb10f.PNG)

Vậy chúng ta sẽ inject script vào href của thẻ a (input của website) này

Syntax javascript bên trong href

![](https://images.viblo.asia/1e88d204-209c-46bb-92e7-4478a5080526.PNG)

Vậy input chúng ta sẽ nhập ở input website theo cấu trúc như trên
![](https://images.viblo.asia/77af57d2-820b-47b2-aa34-1b70afbb0e08.PNG)

OK Ngon, nhưng mà Portswigger vẫn chưa hiện lên là Solved :v (tại chưa dùng BurpSuite nha)
![](https://images.viblo.asia/40a80cb2-8182-40e3-98f5-4a23132e3fca.PNG)

Chúng sẽ mở BurpSuite lên và bắt lại request khi comment và đổi lại param của phần website và forward thôi 😊

![](https://images.viblo.asia/fe3db0d8-513a-4dfa-9995-f627f82402bd.PNG)
![](https://images.viblo.asia/e6b504c8-f848-448c-8b37-d1e4f905643d.PNG)
# 6. Lab: Reflected XSS into a JavaScript string with single quote and backslash escaped
link: https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-single-quote-backslash-escaped

Vẫn là trang blog cũ, nhưng lần này những kí tự đã được escape và tag mở script của mình cũng đã bay màu rồi 

![](https://images.viblo.asia/821620a8-dbdf-45b1-a337-96cee8449322.png)


Ok check source nào 

![](https://images.viblo.asia/9e76cef2-e1b5-4105-b715-166f5af6a179.png)

Bị dư 1 tag đóng script => thêm 1 tag đóng script ở đầu nhằm đánh lừa đoạn code là đã kết thúc script ở chỗ đóng script mình inject vào + Escape thì ta thay bằng số thôi :v

`</script><script>alert(123);</script>`

![](https://images.viblo.asia/0cb35257-6667-4789-9822-79db36ffdef0.PNG)
# 7. Lab: Reflected XSS into a JavaScript string with angle brackets HTML encoded
link: https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-string-angle-brackets-html-encoded

Lần này vẫn trang blog cũ, vẫn script cũ nhưng lại bị mã hóa dấu ngoặc lớn bé, nhưng còn dấu ngoặc đơn lại không mã hóa 😊

![](https://images.viblo.asia/72ad4087-0b5c-4206-bbf1-016e1b0ec9a3.PNG)

Theo như yêu cài của bài lab thì phải làm sao cho tấn công cho break out khỏi chuỗi javascript và gọi hàm alert lên

Mình đã chèn thử như này 'onerror='alert("XSS")'' nhưng không hiệu quả :v

Vậy chúng ta sẽ tận dụng dấu ngoặc không mã hóa để đóng chuỗi lại, thử đơn giản `';alert(1);'` xem sao.

Bằng cách thần kì nào đó mà đoạn script trên đã có tác dụng :laughing:.

![](https://images.viblo.asia/63d7143f-3fa4-4805-852a-fb084202c67e.PNG)

# 8. Lab: Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped
link: https://portswigger.net/web-security/cross-site-scripting/contexts/lab-onclick-event-angle-brackets-double-quotes-html-encoded-single-quotes-backslash-escaped

Lại trở lại với script ở comment, để xem chúng ta có gì nào

Input này có kiểm tra url nên mình sẽ nhập theo đúng url là `https://foo/?'-alert(‘son dep trai’)-'` như lúc trước thì sau khi check source sẽ có 1 hàng như sau

`<a id="author" href="http://foo?&apos;-alert(\'son dep trai\')-&apos;" onclick="var tracker={track(){}};tracker.track('http://foo?&apos;-alert(\'son dep trai\')-&apos;');">Test</a>`

1 sai lầm khi encode thành ```&apos;``` thay vì  ```&quot;```  ( là dấu ‘ sau khi bị encode nha )

Có vẻ như lúc này đoạn script đã bị encode + escape gần như hết ngoặc luôn rồi 

Nếu nhập `https://foo/?’alert(1)’` thì sẽ bị escape thành
![](https://images.viblo.asia/cbee4a19-2dff-49f7-9202-6bf3579dc693.PNG)

Như lab ở trên, escape thì thay số vào thôi.
Còn nếu đã encode html entities thì mình sẽ thay bằng entites encode luôn, để cho các dấu ngoặc ko bị encode như trên

Hoặc có thể dùng đoạn mã như sau: `http://foo?&apos;);alert(1)//`

Chúng ta sẽ lợi dụng ```&apos; và )``` được mã hóa thành dấu ```' )``` để đóng **function tracker.track** lại sau đó ```alert``` rồi thêm ```//``` để comment đoạn code phía sau đi

Sau khi bấm vào tên tác giả của comment sẽ xuất hiện alert

![](https://images.viblo.asia/fca55980-0249-4b08-a13b-5b2285016d37.PNG)
![](https://images.viblo.asia/3230b16c-855e-4b22-abe4-aa1802912ea0.PNG)

# 9. Lab: Reflected XSS into a template literal with angle brackets, single, double quotes, backslash and backticks Unicode-escaped
link: https://portswigger.net/web-security/cross-site-scripting/contexts/lab-javascript-template-literal-angle-brackets-single-double-quotes-backslash-backticks-escaped

Lại quay lại với blog search :v
Search 1 cái gì đó rồi check source nào

![](https://images.viblo.asia/1fbcd61a-5097-46e3-b9cd-e24af6176bf4.PNG)

Chúng sẽ sẽ thấy biến message được cho giá trị để gán vào innerText của searchMessage mà không có sự kiểm tra nào, thế nên ta sẽ áp dụng nối chuỗi.

Đây là 1 loại nối chuỗi trong javascript

![](https://images.viblo.asia/f5bb7d48-6a45-40f3-9f91-dc525cd39bf0.PNG)

Áp dụng câu alert cũ vào lab chúng ta đang làm thì hình như các dấu ngoặc lại bị encode rồi

`${ alert('son dep trai') }`

![](https://images.viblo.asia/ce4f86f5-9cb9-4226-993a-3ada3ad67840.PNG)

Thay lại bằng số thôi nha :v: 

![](https://images.viblo.asia/b42f5a90-aa4c-4271-bd2f-ee061545ecce.PNG)

# 10. Lab: DOM XSS using web messages
link: https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages

:vulcan_salute: 
Lần này có web mới rồi :v

Đây là dạng ***DOM-based XSS***, Portswigger cũng cung cấp cho ta 1 server exploit để send request :v

![](https://images.viblo.asia/6f4a312f-b609-4711-80a1-c26e8bee180c.PNG)

Sau khi mò xem source thì mình thấy có đoạn script như thế này

![](https://images.viblo.asia/81a1efbd-5186-476a-aa27-84dfb3b1271e.PNG)

Người ta đã dùng **innerHTML** để đưa dữ liệu vào DOM mà không có 1 đoạn code kiểm tra nào cho nên có thể dễ dàng inject XSS vào.

Thì như tiêu đề của bài lab là ***DOM XSS using web message*** cho nên chúng ta sẽ đi tới server exploit để thực hiện send request.

Body sẽ như thế này, chúng ta sẽ nhúng iframe vào, khi load iframe này lên sẽ thực thi đoạn **postMessage** nhé (còn postMessage là gì thì các bạn tự google nha), sau đó **alert cookie** sẽ hiện lên.

![](https://images.viblo.asia/cfe7ad79-9226-4542-80d0-e6f1b3e39b24.PNG)

Sau khi **Store** rồi **Deliver Exploi**t xong ta sẽ xem kết quả exploit

![](https://images.viblo.asia/6c391f4d-bc0f-4af6-8e1a-7e0106ddce42.PNG)

Đoạn alert sẽ xuất hiện vì src của thẻ img inject vào bị lỗi

***Ví dụ từ W3school:***

![](https://images.viblo.asia/88a59ea3-2d78-4b64-8dd9-e2ae6c2ac8df.PNG)

# Tổng Kết
Vậy là mình đã thực hành và giải thích xong 10 Labs về XSS giúp các bạn hiểu hơn về các kỹ thuật khai thác XSS đối với từng loại phổ biến hiện nay.

Bài viết đến đây là hết, nếu có thắc mắc hay sơ sót trong lúc viết bài mong mọi người góp ý để bài viết sau được tốt hơn ạ!!
# Tham Khảo
- XSS: https://portswigger.net/web-security/cross-site-scripting
- CheatSheet 2021 By PortSwigger: https://portswigger.net/web-security/cross-site-scripting/cheat-sheet