# 0. Mở đầu
Ngày 3/9/2020 là tròn một năm mình làm full time công việc Pentest tại công ty (Sun Asterisk). Sau gần 1 năm mình cũng đã có thử sức và đạt được chứng chỉ OSCP. Ngày thứ 6, thứ 7 tuần trước (28 - 29/8/2020) mình đã hoàn thành bài thi và hiện tại đã có mail từ bên phía Offensive Security, xác nhận mình đã đạt được chứng chỉ.

![](https://images.viblo.asia/5c12b767-f77f-47dd-93dc-363a23765b82.PNG)


Mình không thể nói rằng chứng chỉ có "đáng học" với tất cả Pentester hay không, vì giá trị nó nằm ở những gì người học thu về được, chứ không nằm hoàn toàn ở cái chứng chỉ. 

Mình cũng không thể nói rằng chứng chỉ có khó hay không. Vì thực tế cái gì khó mà biết thì cũng trở thành dễ, cái gì dễ mà không biết thì cũng sẽ là khó.

Mình chỉ cảm thấy đúng đắn vì trong số nhiều chứng chỉ mình được hỗ trợ, mình đã chọn OSCP. Nó cho mình động lực để miệt mài, để cố gắng và để đạt được nó. 

Ban đầu mình định viết bài bằng tiếng Anh, để học lại câu cú, ngữ pháp. Nhưng những bài review về OSCP của nước ngoài đã có nhiều, còn ở Việt Nam dù không phải ít người có OSCP nhưng những bài review còn rất ít, mình Google search **chỉ ra 1 bài** tại [đây](https://vsec.com.vn/blog/75/minh-da-pass-oscp-nhu-the-nao), nên mình quyết định viết bằng ngôn ngữ mẹ đẻ để gần gũi và tiếp cận được nhiều người quan tâm nhất có thể.

Mình cần tới 2 lần thi để có được OSCP nhưng hoàn toàn đáng và nhờ đó mình cảm thấy đã học được rất nhiều. Nếu bạn có quan tâm và cảm thấy đó cũng là mục tiêu phấn đấu của bản thân. Bài viết này tự tin sẽ mang lại những thông tin, kinh nghiệm giá trị.
# 1. Về OSCP
OSCP nói riêng và các chứng chỉ của [Offensive Security](https://www.offensive-security.com/) nói chung đều thiên hoàn toàn về hướng thực hành, cả ở việc học và thi. Kể cả quyển "lý thuyết" dài hơn 800 trang và hơn 17 tiếng video cũng nhằm mục đích cung cấp kiến thức để bạn thực hành.

Cá nhân mình đánh giá Offensive 4.9/5 sao về độ chuyên nghiệp: Các labs được design đúng với mục đích rèn luyện, bài thi có tính thách thức cao, materials cực kỳ chi tiết và nhiều kiến thức, policy và quy trình rõ ràng,...

![](https://images.viblo.asia/bd89ba41-4b17-4d5d-953a-d0a5513696dd.png)

Quá trình làm Labs là quá trình bạn được trải nghiệm 1 course có tên PWK (Penetration Testing with Kali Linux), thời gian kéo dài 30/60/90 ngày tuỳ gói bạn chọn. 

Thời điểm sau 2/2020 là thời điểm thích hợp để chọn thi OSCP, vì từ thời điểm này Offensive đã bổ sung thêm **33% số lượng Labs** và upgrade materials lên mới nhất. Với những người thi trước đó mà muốn upgrade materials mới nhất, cũng sẽ mất một số tiền không ít:

![](https://images.viblo.asia/bb073c89-a4d4-4ef9-a422-a8889fc34bdc.PNG)

Toàn bộ thông tin về cách đăng ký và chi phí, các bạn có thể tham khảo tại [đây](https://www.offensive-security.com/pwk-oscp/).

Nếu đã đọc tới đây, hãy coi như ngày mai bạn sẽ đăng ký mua course và thi chứng chỉ, đọc tiếp và xem thử xem bạn sẽ được trải nghiệm những gì !

Những thông tin mình nêu ra bên dưới, đều là những thông tin đã được nhiều người khác chia sẻ public (ví dụ như tại [đây](https://medium.com/@das.pratikpd97/oscp-a-4-year-journey-of-trying-harder-cfb52456de5a) hoặc tại [đây](https://medium.com/@falconspy/oscp-exam-attempt-1-1893df5a0a00)), cũng như những thông tin được Offensive đưa ra. Nên những gì được nêu trong bài viết này không ảnh hưởng tới tính toàn vẹn, bảo mật,... của chứng chỉ.

## 1.1 Labs

Lab của mình kéo dài 30 ngày giá $999, từ 14/06 - 14/07. Bao gồm khoảng 4x labs và update những lỗ hổng mới nhất cùng AD (Active Directory). Trong 1 tháng đó, ngoài công việc trên công ty, đọc materials, thì đây là quá trình những labs mình đã xiên được:

Tuần đầu (14/06 - 20/06):  10 labs

Tuần tiếp theo (21/06 - 27/06): 5 labs

Tuần thứ 3 (28/6 - 03/07): 6 labs

Tuần cuối (04/07 - 14/07): 6 labs

Tổng cộng: 27 labs

Thực tế trước đây khi chơi [Hackthebox](https://www.hackthebox.eu/) và viết write-up, mình chỉ tự đặt target cho bản thân là 1 tuần 1-2 machine. Vì nó giống sở thích cá nhân hơn là công việc, nhưng đụng vào labs mà mất tiền để được làm thì nó là một câu chuyện khác. 27 labs trong khoảng 30 ngày nghĩa là gần như ngày nào cũng làm 1 lab và note lại. 

Việc note lại cách làm các labs là rất quan trọng, vì đây chính là quá trình rèn luyện và quyết định 80% bạn học được gì sau chứng chỉ. Sẽ có những attack vector mà thực sự mình chưa gặp trước đó bao giờ, cũng như việc labs này "thông" với labs kia như thế nào. Nếu Pentest và viết báo cáo chỉ dùng ở việc detect lỗ hổng, PoC và viết vào báo cáo, thì ở tất cả các Labs bạn sẽ phải tìm mọi cách khai thác lỗ hổng đó, RCE và get Root.

![](https://images.viblo.asia/ffb0a45c-ecdb-4056-9c73-886846393ac8.png)

*<p align="center">Hãy note lại để hệ thống hóa kiến thức thu được</p>*


Việc sử dụng notes về những kiến thức mình học được trong lúc thi là được phép. Phần mềm sử dụng thì mình suggest dùng [ notion.so](https://www.notion.so/), hoặc [Joplin](https://joplinapp.org/) (UX hơi ngu tí) hoặc Cherry Tree.

## 1.2 Exam

Những tools không được phép dùng: Các tools **khai thác tự động**, ví dụ SQLmap hay những tools có Spider và detect lỗi như Burpsuite Pro (Community thì được dùng). Metasploit/Metepreter thì được dùng nhiều lần nhưng chỉ với 1 machine duy nhất. Tìm hiểu thêm tại [Unofficial OSCP Approved Tools
](https://medium.com/@falconspy/unofficial-oscp-approved-tools-b2b4e889e707).

Concept của bài thi đã được share rất nhiều và không có gì bí mật: Trong 23h45p sẽ phải giải quyết 5 machine với số điểm như sau:

* 01 bài 10 điểm
* 02 bài 20 điểm
* 01 bài 25 điểm
* 1 bài Buffer Overflow 25 điểm

Toàn bộ quá trình làm bài của bạn sẽ được giám sát để tránh gian lận, qua việc bạn phải share các màn hình mình sử dụng trong khi thi và camera bật 24/24. Chi tiết tại [đây](https://support.offensive-security.com/proctoring-tool-student-manual/).

Sau khi kết thúc bài thi thì mọi người sẽ có 24h nữa để viết report và submit. Hướng dẫn chi tiết tại [đây](https://support.offensive-security.com/oscp-exam-guide/).

Sau khi viết báo cáo và gửi cho Offec, nếu đạt đủ 70/100 điểm và không vi phạm policy thì sẽ Pass, Offsec sẽ không báo lại chính xác bạn được bao nhiêu điểm, mà chỉ báo bạn Pass hay Fail.

# 2. Trải nghiệm thi OSCP

## 2.1 Lần thi thứ nhất (3.5/5 machine)

Ngày thi: 9h ngày 26/07/2020.

Lần thi này mình gặp vấn đề lớn với việc setup. Đó là khi mình chạy extension **Janus webrtc screensharing** trên Chrome và share screen qua proctoring software của Offsec thì screen đen kịt. Có thể do vấn đề quyền của Chrome khi chạy trên Kali Linux, chỉ có thể share Application Screen chứ không share đc Entire Screen. Vậy là mình phải lấy laptop chạy Windows, tải VMware, tải images Kali, setup và kết nối để thi. Tới tầm gần 11h mới bắt đầu thi được, nhưng đương nhiên thời gian tính giờ làm bài vẫn là 9h.

Đó cũng là kinh nghiệm nếu bạn dự định thi OSCP. Để chủ động, tốt nhất là dùng host OS là Windows và chuẩn bị sẵn 1-2 con máy ảo, cài đặt sẵn tools, command quen thuộc, wordlist...chứ không dùng trực tiếp Kali làm Host OS.

Time line:

* 2 tiếng đầu cài OS và làm thủ tục thi (kinh nghiệm xương máu)
* 2 tiếng tiếp theo xong bài BoF (25 điểm)  
* Nghỉ 30p 
* 3 tiếng sau thì xong bài 20 điểm thứ nhất  (20 điểm)
* Nghỉ 30p
* 2 tiếng tiếp theo xong bài 10 điểm (10 điểm)
* Nghỉ 30p
* 2 tiếng sau thì RCE được bài 25 điểm (12,5 điểm)

Như vậy tới tầm 9:30 PM (một nửa thời gian) là mình đã được 67,5 điểm.

Nhắc lại rằng Offsec không trả điểm, những con số trên là ước chừng xem mình đã được bao nhiêu điểm.

Những tiếng sau đó cố gắng để:

1. Root bài 25 điểm
2. Hoặc ít nhất RCE bài 20 điểm còn lại

để  >70 điểm thì mình đã không thành công. 

 Dù ở bài 20 điểm mình đã đọc được Flag, nhưng policy rất rõ ràng rằng screen shot khi cat flag sẽ cần kèm theo câu lệnh **ipconfig**, **ifconfig** hoặc **ip addr**. Mình tự biết không đạt được điều kiện cần là 70 điểm nên đã không gửi report.
 
![](https://images.viblo.asia/f85c00b2-af16-4d63-9bd5-2cea5ef46e0e.png)


Tới đây càng khẳng định thêm cho câu nói: **Cái gì khó mà biết thì cũng trở thành dễ, cái gì dễ mà không biết thì cũng sẽ là khó.** Nếu những bài đấy dễ, thì là do mình không biết. Nếu những bài đó thực sự rất khó, thì là do mình chưa đủ giỏi.

## 2.2 Chuẩn bị cho lần thi thứ hai

Theo policy của Offsec, sau lần thứ nhất, bạn cần ít nhất 4 tuần mới được đăng ký lần thi thứ 2. Phí thi lại là $150.

Tại đây mình thay đổi chiến thuật, từ **Try Harder** sang **Try Smarter**. Cùng với đó đây là tháng mà mình cần hoàn thành 1 cái chứng chỉ TOEIC và 4 môn thi cuối kỳ trên trường để ra trường, đến độ tối thi OSCP mà sáng vẫn thi cuối kỳ  =)). Đương nhiên công việc trên công ty thì vẫn phải làm và hoàn thành. Ít thời gian, thành ra thay vì **cày** lại những thứ mình đã biết, hoặc cố gắng làm thêm được vài labs, mình đã chọn cách **xem người giỏi làm gì**.

![](https://images.viblo.asia/355324bd-0a7b-4428-83cb-92346c1e562e.PNG)

Mình cày kha khá những videos của [IppSec](https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA), như một chân trời mới được mở ra, đặc biệt ở các cách leo thang đặc quyền.

Vì chỉ những machine đã đưa vào Retried thì mới được public Write-up nên trên IppSec sẽ chỉ có những Walkthrough của những machine đó. Rất may mình có VIP account trên hackthebox, nên những bài nào thực sự thú vị, thách thức mình đều có thể làm lại để trải nghiệm.

## 2.3 Lần thi thứ hai (5/5 machine)

Ngày ấy cũng đã đến.

Ngày thi: 18h 28/08/2020.

Mình chọn thi tối vì sau khoảng vài tiếng làm bài, mình có thời gian để ... ngủ. Thực sự mình cảm thấy trí lực đủ tốt thì mới có thể làm tốt được, tránh mắc lại "sai lầm" như ở lần thi thứ nhất. Timeline chính xác luôn như sau:

![](https://images.viblo.asia/ff61cdc0-6887-4a1b-ac42-b47c39f8bd06.png)


Như vậy là sau khoảng 15 tiếng tính cả thời gian ngủ nghỉ khoảng 7 tiếng, mình đã own 5/5 machine.

Đương nhiên không phải làm ra lúc nào là submit luôn lúc đó =)), có khi RCE xong, cố leo Root trước chứ không submit Flag ngay, nên có những lần Flag submit tương đối gần nhau không phải vì leo Root quá dễ.

Mình xem lại các bài thật cẩn thận và screenshot lại thật đầy đủ, đến tầm 10h30 thì xin kết thúc bài thi. Viết report tới tầm 18h ngày 29/08 thì hoàn thành.

Kết quả được Offsec trả vào 18h ngày 31/08. Quá nhanh vì ngày 30/08 là chủ nhật, không phải bussiness day. Có thể nói dù có pass hay fail, bạn sẽ biết kết quả chỉ trong 2-3 ngày.

# 3. OSCP và công việc hàng ngày (Penetration Testing)

## 3.1 Những cái mình thấy ít/không giống

Đầu tiên chắc chắn là phần ...leo thang đặc quyền. Tức là sau khi RCE được bạn sẽ phải leo lên Root hoặc admin/System (với Windows). Việc Pentest hàng ngày của mình không như vậy. Nếu RCE được, sẽ chỉ dừng ở mức đủ PoC, nêu ra root cause, recommend cách khắc phục và report lại. Mình chưa thấy một report nào về Pentest mà sau khi RCE được, Pentester còn **bonus** thêm cho client một pha leo Root nữa (trừ Red Teaming).

Tiếp theo đó là các lỗ hổng của các Labs và Exam đều là những lỗ hổng ở phía Server Side. Nó rất rộng và hay, thực sự có những bài phải kết hợp nhiều lỗi lại để có thể RCE được khiến não to ra nhiều. Nhưng sẽ không có các lỗi ở Client-side, điều này khác với việc Pentest của mình hằng ngày. Nơi mà những lỗi như XSS, CSRF, Open Redirect,... đều phải được pentest và report cẩn thận.

Burpsuite: Quả thực mình thấy những Labs trong OSCP **rất ít khi sử dụng tới Burpsuite**, dù trong Exam lần 2 mình đã phải sử dụng Burpsuite (Community Edition) nhiều để khai thác lỗi. Nó khác với việc Pentest Web apps/Mobile apps hàng ngày, khi mà việc đầu tiên cần làm gần như sẽ là bật Burpsuite 24/7 ngay cả khi chưa biết mặt mũi target như thế nào...

## 3.2 Những cái mình thấy liên quan

Tư duy: Mình rất thích một Security Researcher tên Ron Chan (ngalog). [Đây](https://ngailong.wordpress.com/) là blog cá nhân của anh ấy. Trong một lần interview anh ấy có chia sẻ rằng khi đến với Hacking, chứng chỉ / course đầu tiên mà anh ấy thử sức là OSCP và nó rất giá trị. Mình cũng thấy điều tương tự. Qua việc rèn luyện này, khi đứng trước một Website, bạn sẽ có nhiều attack vector hơn, việc sử dụng các công cụ cũng thành thục hơn, và luôn hướng tới target "tối thượng" là cố gắng RCE được nó.

Tiếp theo là về exploiting, nhiều lỗ hổng chỉ cần detect và PoC tương đối đơn giản là đã có thể viết vào report. Nhưng có những lỗ hổng yêu cầu biết cách exploit, có thể nó không khó nhưng phải biết để tăng tối đa impact có thể, ví dụ như RFI hay File Upload,...hay tuyệt hơn nữa là từ những lỗ hổng đó có thể dẫn tới được RCE. Thay vì chỉ upload được 1 file svg dẫn tới XSS, sao không thử bypass và cố gắng upload "một thứ gì đó" có thể khiến severity từ Medium/High => Critical ?

Tìm kiếm public resources để khai thác: Thực tế trong một lần Pentest một dịch vụ nọ của một đơn vị X, dịch vụ đó sử dụng 7 server thì có đến 3/7 server dính CVE-2020-10487, công việc thực sự rất là nhàn khi mà đã có sẵn mã khai thác, chỉ cần PoC. Offsensive-Security tạo ra và maintain một website chứa cả "kho" mã khai thác hàng đầu quả đất là [Exploit-db.com](https://www.exploit-db.com/). Không nhất thiết bạn phải là người đầu tiên khám phá ra bug, miễn nếu nó có bug, bạn không bỏ qua là được.

# 4. Kết luận

Việc đã có thời gian chơi HTB và tìm hiểu về leo thang đặc quyền trước đó của mình đã giúp ích rất nhiều cho chứng chỉ OSCP. Dù cần tới lần thứ 2 để có nó, nhưng "every time you put in will get back", mình xem đó là một điều tốt chứ không phải xấu. 

OSCP hay bất cứ chứng chỉ nào cũng có những cái hay riêng của nó. Hi vọng trong 2021 mình sẽ có thêm một bài viết nữa về một chứng chỉ nào đó của Offensive Security nữa, vì mình cảm thấy chứng chỉ của họ rất rất đáng tiền, đáng với thời gian, công sức bỏ ra !

Xin gửi lời cảm ơn chân thành tới anh em trong team Cyber của Sun* đã luôn tạo điều kiện và ủng hộ trong quãng thời gian học ôn chứng chỉ <3