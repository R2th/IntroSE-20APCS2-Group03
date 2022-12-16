Hellooo, lời hứa từ bài "Đánh cắp Cookie bằng cách lợi dụng lỗi bảo mật XSS " - [Link](https://viblo.asia/p/danh-cap-cookie-bang-cach-loi-dung-loi-bao-mat-xss-GrLZDeoglk0) đến giờ mới có dịp để thực hiện .

Như ở bài trước thì chúng ta đã lợi dụng lổ hổng bảo mật XSS để đánh cắp Cookie, vậy sau khi có Cookie rồi thì chúng ta làm được gì ??? Ở bài này mình sẽ hướng dẫn sử dụng Cookie để login account bằng tool EditThisCookie ( hiện có trên FF và Chrome lun,search phát ra ngay ) ^^ .

Bối cảnh thực hiện là ở cty đang áp dụng cái idea phải trả lời mấy câu hỏi về 7 Core Values thì mới được login .... buồn hao gầy (có khi nào mình đc giải đâu >"< ) , rồi ý tưởng là sử dụng Cookie để login thì khỏi phải mất công trả lời câu hỏi (ahihi).

## A. Đi kiếm Cookie của WSM

Hồi xa xưa , khi WSM còn cùi bắp, lỗ hổng XSS còn đầy thì đánh cắp được, sau vài lần báo lỗi thì cũng vá được một mớ, có thể sót ở đâu đó mà mình chưa tìm ra, thôi thì đi lấy Cookie chính chủ bằng cách truyền thống vậy :v Các bạn cần một tool để gởi API requests, xài Jmeter nhé ^^

Cùng ngâm cứu các API cần gởi để lấy Cookie nào :

1. Homepage : https://wsm.sun-asterisk.vn/ >>> gởi cái này để lấy được CSRFToken
2. Random questions :  https://fitm.sun-asterisk.vn//core_values/questions/random_question?language=en >>> gởi cái này để lấy câu hỏi của 7 core value
3. Valid answer : https://fitm.sun-asterisk.vn//core_values/questions/valid_answer >>> có câu hỏi ở 2 rồi thì gởi cái này để submit câu trả lời
4. GetCookie : https://wsm.sun-asterisk.vn/vi/users/sign_in >>> nếu câu trả lời ở 3 đúng thì 4 sẽ sign_in thành công, chúng ta sẽ có được Cookie cần thiết <3 <3 <3

Về các method gởi của requests, các Config element, các Param cần thiết để gởi request các bạn có thể lấy được khi Inspect Element (F12) trình duyệt lúc thực hiện sign_in wsm . Giờ mình sẽ hướng dẫn các tạo 1 plan chạy trên tool Jmeter , vừa ôn kiến thức Jmeter vừa lấy được Cookie, 1 công đôi việc ^^

![](https://images.viblo.asia/458f9a81-2b82-40c4-94f6-f124969cb3cd.jpg)

Cấu trúc Test plan như trên, đầu tiên mình add HTTP Cookie Manager để quản lý Cookie của toàn bộ Test plan, tiếp đó tạo Thread group với các requests đã liệt kê ở trên, lần lượt :  1. Homepage -> 2. Random questions -> 3. Valid answer -> 4. GetCookie

### 1.  Homepage : 
Method GET https://wsm.sun-asterisk.vn/ 

Request này không có param, sau khi gọi thì trong response trả về sẽ có CSRFToken , mình tạo Regular Expression Extractor để lấy CSRFToken như bên dưới

![](https://images.viblo.asia/f0285e54-01d8-44c3-9684-21ada78f7b6e.jpg)


### 2. Random questions :
Method GET https://fitm.sun-asterisk.vn//core_values/questions/random_question?language=en

Request này cũng không có param,  sau khi gọi thì trong response trả về sẽ có câu hỏi về 7 core value và các option của câu trả lời, mình lại tạo Regular Expression Extractor để lấy question và câu trả lời thôi. Lưu ý, question thì có 1 token của question nhưng câu trả lời thì có tới 4 token, mình chỉ cần lấy câu đầu tiên là đủ, bất kể câu trả lời đầu tiên là đúng hay sai nhé :) 

question_token
![](https://images.viblo.asia/1649fc8f-01ed-4d11-a4ad-eae372f175d4.jpg)

answer_tokens
![](https://images.viblo.asia/6de0fd97-af92-4c35-bda0-0cdcdab05268.jpg)

### 3. Valid answer
Method POST https://fitm.sun-asterisk.vn//core_values/questions/valid_answer 

Request này cần có Request Heades như bên dưới:

```
Connection: keep-alive
Host: fitm.sun-asterisk.vn
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
Content-Type: multipart/form-data; boundary=---------------------------213946871895
Origin: https://wsm.sun-asterisk.vn
Connection: keep-alive
Referer: https://wsm.sun-asterisk.vn/en
Content-Length: 457
```

Param truyền đi là các question_token và answer_tokens mà ta lấy được ở 2. Random questions  , các bạn chú ý chổ gọi lại biến ${question_token} và ${answer_tokens} nhé :

```
-----------------------------213946871895
Content-Disposition: form-data; name="question_token"

${question_token}
-----------------------------213946871895
Content-Disposition: form-data; name="answer_tokens[]"

${answer_tokens}
-----------------------------213946871895--
```

Sau khi gởi request thành công thì trong response trả về sẽ có 1 token kết quả , kết quả này có thể đúng hoặc sai, cứ lấy được token đã rồi tính tiếp:

![](https://images.viblo.asia/620974a6-cde7-43c2-a1fd-9490f60c6b13.jpg)

### 4. GetCookie 
Method POST  https://wsm.sun-asterisk.vn/vi/users/sign_in

Request này cần có Request Heades như bên dưới, ở đây bạn cần truyền vào CSRFToken đã lấy ở  1.  Homepage , chú ý chổ gọi lại biến ${CSRFToken} nhé :
```
Connection: keep-alive
Host: wsm.sun-asterisk.vn
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
X-CSRF-Token: ${CSRFToken}
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Origin: https://wsm.sun-asterisk.vn
Connection: keep-alive
Referer: https://wsm.sun-asterisk.vn/en
Content-Length: 486
```

Param truyền đi bao gồm:
- authenticity_token:  chính là ${CSRFToken} đã lấy ở 1. Homepage
- user[token_core_value] : chính là ${tokencorevalue} đã lấy ở 3. Valid answer
- user[email] : chính là email của bạn
- user[password]: chính là pass của bạn 

ahihi, che chắn cẩn thận rồi nhé
![](https://images.viblo.asia/56be8780-7375-4c0c-89a0-c9a146019039.jpg)

Sau khi gởi request thành công thì trong response trả về sẽ có Cookie, đây chính là mục đích mình cần lấy :

![](https://images.viblo.asia/cb253f68-810c-4b1c-a7a8-89e2edde9faa.jpg)

Tới đây mình cần BeanShell PostProcessor để in Cookie ra file txt, màu mè tí cho vui , có cũng được, không có cũng được ^^
```java
String cookie = vars.get("Cookie"); // get data from var Cookie 
String question = vars.get("question_content"); // get data from var question_content
String answer = vars.get("answer_tokens"); // get data from var answer_tokens
if (!cookie.equals("NOT_FOUND"))  // điều kiện nếu tìm thấy cookie thì mới in kết quả response
{
f = new FileOutputStream("D://result.txt", true); //specify true if you want to overwrite file. Keep blank otherwise.
p = new PrintStream(f);
this.interpreter.setOut(p);
print(cookie + "," + question + "," + answer);  // in ra cookie + question + answer

f.close();
}

```

OK, kịch bản sẽ như thế này :

User đến 
- 1. Homepage , a ta nhận được 1 câu hỏi 7 core value 
- 2. Random questions, a ta submit câu trả lời 
- 3. Valid answer, trả lời xong thì a ấy thực hiện sign in , sign in thành công a ấy sẽ có được 
- 4. GetCookie ^^

Vấn đề đặt ra là ở step 3. Valid answer , chúng ta không thể control được câu trả lời là đúng hoặc sai , Test Plan mình tạo ra ở trên sẽ nhận về 1 câu hỏi ngẫu nhiên và lấy option câu trả lời đầu tiên bất kể đúng hay sai để submit. Vậy thì để giải quyết vấn đề, mình cho chạy hàng loạt liên tiếp 10 lần để nhận về random 10 cặp question/answer , chỉ cần 1 cặp trả về kết quả đúng thì mình sẽ có Cookie và in ra file text cho mình :D Config thread group như bên dưới : 

![](https://images.viblo.asia/806a0fcb-b628-4e04-81ed-ea7de2301ee5.jpg)

Chạy thử phát rồi xem kết quả nào, túm được 2 Cookie lun nhá ^^

![](https://images.viblo.asia/141d271d-4a26-43f9-bddb-661f406c0d33.jpg)


## B. Sử dụng Cookie của WSM để login và by pass câu hỏi 7 core value

Thực ra bước lấy được Cookie mới khó, tới step này thì toàn sử dụng Tool, các bạn search tool EditThisCookie nhé :

![](https://images.viblo.asia/d82daea0-8f9b-4e92-b7f4-a62e6f4fed08.jpg)

Copy Cookie lấy được ở trên , đến homepage của WSM và paste Cookie vào tool EditThisCookie, sau đó click Save :

![](https://images.viblo.asia/1066cb04-1dd3-425f-abfb-41ef8ebdaca0.jpg)

F5 phát để thấy điều kỳ diệu, bạn đã sign in thành công WSM  với Cookie lấy được mà không cần phải trả lời câu hỏi 7 core value, clip demo:

[Video demo](https://drive.google.com/file/d/1XTVQta7oLsx7OnJDCwAggAE49ArUBsg_/view?usp=sharing)

Đến đây cho mình kết thúc bài viết, hy vọng qua đây các bạn có thể thấy được phần nào sự nguy hiểm của lỗi bảo mật XSS.