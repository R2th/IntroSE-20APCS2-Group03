Vào một chiều đông 17/12/2020, tôi nhận được cái email thông báo đã pass OSCP ngay lần thử đầu tiên.

<p align="center">
<img src="https://user-images.githubusercontent.com/44463004/103184760-064b1e00-48ec-11eb-8917-edeea81c8254.png">
</p>

Thực ra, đối với tôi việc học và thi OSCP nằm ngoài dự tính vì tôi không có ý định theo mảng Security. Mọi chuyện bắt đầu khi tôi muốn chuyển việc để bồi dưỡng chuyên môn mảng network, tôi ứng tuyển vào [Viettel Cyber Security](https://viettelcybersecurity.com) và gặp các anh sếp cực kỳ có tâm tại đây. Lúc mới vào tôi thấy ở đây như kiểu một nơi huyền bí của những con người im im nhưng nguy hiểm, âyyyy guuuu cảm giác tò mò lại xâm chiếm lấy tâm trí tôi. =))

Sau đó, tôi bắt đầu tìm hiểu về Security và quyết định học cái gì đó cho riêng mình. Cuối cùng tôi chọn OSCP vì nó là chứng chỉ thi lab, tôi thích lab (chỉ đơn giản thế thôi). =))

Tiện đây quảng cáo luôn, bên [Viettel Cyber Security](https://viettelcybersecurity.com) (VCS) vẫn đang tuyển rất nhiều vị trí bao gồm cả Developer, DevOps, Cloud, Security Researcher... Ai có mong muốn tham gia vào gia đình bự bự này thì email đến thanhdatna2892@gmail.com cho tôi nhé! Ngoài ra, ai có công việc nào hot hot có thể gửi JD cho tôi vào email hoặc liên hệ với tôi qua [MyLinked](https://www.linkedin.com/in/n9uy3n7h4nhd4753) luôn nhé! Tôi sẵn sàng nghênh chiến ở bất kỳ mảng nào nếu cảm thấy thực sự hứng thú. :))))

Nào, kết thúc màn quảng cáo và quay lại vấn đề chính. Trong bài này tôi sẽ không nói về những vấn đề chuyên môn hay kỹ thuật mà chỉ đơn giản viết ra những điều tôi băn khoăn trước kỳ thi, có thể sẽ giúp cho các bạn sắp thi có một tâm lý vững vàng nhất.

## OSCP là gì?
OSCP (Offensive Security Certified Professional) là chứng chỉ thuộc hệ thống chứng chỉ của `Offensive Security` - một công ty của Mỹ hoạt động trong lĩnh vực `Information Security`. Chứng chỉ hướng đến các `Pentester` cung cấp kỹ năng cần thiết để kiểm thử xâm nhập trên nền tảng `Windows` và `Linux` dựa vào `Kali Linux` (`Kali Linux` là nền tảng kiểm thử xâm nhập được chính `Offensive Security` phát triển và duy trì, cung cấp rất nhiều công cụ phục vụ cho tấn công kiểm thử).

## Thi OSCP cần những gì?
Đi thẳng vào vấn đề chính, một số thứ cần thiết để có thể bắt đầu:
- Kiến thức cơ bản và nâng cao về OS (Linux, Windows) cụ thể các bạn sẽ phải làm quen và thành thục với shell trên linux; Powershell, cmd trên Windows.
- Kiến thức cơ bản về database, càng nhiều loại database càng tốt (bao gồm: MySQL, Oracle, NoSQL...) --> hữu dụng khi khai thác SQLi.
- Kiến thức cơ bản về WebServer (bảo gồm: HTML, JS...) và HTTP request methods--> hữu dụng khi khai thác XSS và khai thác lỗ hổng web.
- Ngôn ngữ lập trình (cụ thể: Python, C...) --> ít nhất có thể đọc và hiểu Python script.
- Tính đa nghi và tính kiên nhẫn --> cứ lao vào thử thì biết =))

Có lẽ tôi là người may mắn vì tôi được làm trong một môi trường mà tôi có thể làm bất kỳ mảng nào tôi thích, chỉ cần tôi muốn vì thế trước khi học OSCP tôi đã có kha khá kinh nghiệm về database, system, network.
Tuy nhiên, nếu ai đó mới bắt đầu cũng đừng ngại vì không cần kinh nghiệm quá sâu đâu, chỉ cần sờ sờ mó mó tí bên ngoài tí là được rồi. =))

## Quá trình chuẩn bị
Tôi có dự định thi OSCP từ đầu năm 2020 và đến cuối năm mới tự tin đặt lịch thi. Vậy cả năm 2020 tôi đã làm những gì?
- Khoảng thời gian từ tháng 1/2020 - 9/2020: 
    - Tôi luyện tập rất nhiều trên nền tảng [HackTheBox](https://www.hackthebox.eu). Nếu bạn có thể tự khai thác các máy trên HTB thì tốt nhưng nếu không khai thác được cũng không sao, bạn có thể đọc write-up rồi làm theo. Tuy nhiên, trước khi đọc write-up hãy tự khai thác trước đã nhé.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/44463004/103186557-950f6900-48f3-11eb-8b13-666485365193.png">
    </p>
    
    - Tôi xem khá nhiều clip trên [IppSecChannel](https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA), hãy xem kỹ vì nó sẽ cho bạn tư duy để nhận diện các lỗ hổng.
    - Tôi viết rất nhiều thứ bao gồm: write-up các máy đã khai thác trên HTB; những điều hay ho tôi đọc được; những command hay ho mà tôi nhìn thấy người ta làm lên [github](https://github.com). Nó sẽ thực sự hữu dụng nếu bạn cần lục lại kiến thức hoặc hệ thống hóa lại kiến thức lúc cần. Tôi đã có 1 repo to đùng về kiến thức học được như ở dưới, yên tâm đi tôi không để public đâu mà tìm cho mất công. Bạn nên tự làm thì sẽ nhớ lâu hơn đấy. =))
    <p align="center">
    <img src="https://user-images.githubusercontent.com/44463004/103186836-a7d66d80-48f4-11eb-85ac-b64a2e5866b5.png">
    </p>

- Khoảng thời gian từ tháng 10/2020 - 11/2020: tôi mua khóa học PWK và bắt đầu lab trên mạng ảo của Offensive. Tôi đã root được 47 máy trong vòng 2 tháng và note tất cả vào OneNotes, bạn nên note lại từng bước một (step-by-step) từ lúc bắt đầu dò lỗ hổng đến lúc lấy được `reverse shell` đến lúc lên được `root` hoặc `administrator`. Bạn note càng chi tiết bạn sẽ càng có lợi trong kỳ thi, hãy tập thói quen note lại tất cả và chụp ảnh màn hình từng bước một.
<p align="center">
<img src="https://user-images.githubusercontent.com/44463004/103187283-5af39680-48f6-11eb-84a3-69f169e84ff1.png">
</p>

**Trong quá trình lab bạn nên viết báo cáo thi cho 5 máy bất kỳ để bạn biết bạn còn thiếu sót ở đoạn nào, đến lúc thi chụp ảnh màn hình và note cho chuẩn.**

**Bạn nên dành khoảng 7-10 ngày cuối cùng của thời gian lab để luyện tập BufferOverflow trên 3 máy cá nhân mà Offensive dành riêng cho bạn. Bạn tự cài cắm các dịch vụ có thể khai thác BufferOverflow và tự viết mã khai thác để quen với dạng bài này.**

- Ngày 15/12/2020, tôi bắt đầu bài thi của mình. Các bạn sẽ phải đăng ký thi trước khoảng 2-3 tuần, chú ý thời gian thi của Offensive khá kín nên bạn đăng ký chậm có thể bị chiếm mất slot. Bạn nên đăng ký thi luôn ngay sau khi kết thúc lab hoặc lúc gần kết thúc lab. Nếu để lâu quá, `kiến` thức nó sẽ chui vào lỗ mất và sẽ không bò ra nữa đâu. =))
- Ngày 17/12/2020, tôi đã nhận được kết quả thi của mình.

## Một số điều chú ý trong kỳ thi
Tôi sẽ đề cập một số chú ý quan trọng mà tôi cũng băn khoăn trước và trong kỳ thi:
- Bạn sẽ có 23h45p để khai thác 5 máy tổng là 100 điểm, trong đó:
    - 1 máy BufferOverflow: 25 điểm
    - 1 máy: 25 điểm
    - 2 máy: 20 điểm
    - 1 máy: 10 điểm
    - 1 máy: debug dùng để viết mã khai thác cho máy BufferOverflow.
- Bạn có thể dùng internet thoải mái nhưng đừng có dại mà nhảy vào các phần mềm chat nhé! Tất cả màn hình của bạn phải share cho 1 ông proctors ở bển theo dõi 24/24, nhảy vào mấy cái đó là bạn có thể bị đánh trượt đấy.
- Bạn phải bỏ tất cả điện thoại, các loại máy tính (nếu không dùng cho kỳ thi) ra ngoài. Bạn có thể ra ngoài (ra khỏi khu vực thi) tùy ý để ăn uống, gọi điện chat chit với crush... nhưng phải báo với proctors 1 tiếng qua phần mềm chat của Offensive.
- Trước khi thi thì bạn nên đọc lại [Exam Guide](https://help.offensive-security.com/hc/en-us/articles/360040165632-OSCP-Exam-Guide) để nắm lại tất cả các thông tin vì hướng dẫn này sẽ update thường xuyên, nếu không đọc bạn có thể sẽ `miss` thông tin gì đó và có thể bị trượt nếu sai luật đấy.
- Trước khi thi bạn nên đọc [Proctoring Tools Guide](https://help.offensive-security.com/hc/en-us/articles/360050299352-Proctoring-Tool-Student-Manual) để chuẩn bị trước một số phần mềm phục vụ cho tool giám sát của Offensive (nếu không giám sát được là nó không cho thi đâu). Theo một số kinh nghiệm của mấy ông đi trước thì bạn nên chạy Windows OS trên máy host rồi chạy `Kali Linux` trên `VMWare`, nếu bạn chạy trực tiếp `Kali Linux` trên host thì có thể gặp lỗi khi chạy extension giám sát đấy (tin hay không tùy bạn, không tin thì cứ thử đi rồi biết =))).

## Chiến lược làm bài thi
Tôi có một chiến lược nho nhỏ khi làm bài thi (thực chất là đọc review của mấy ông nước ngoài xong đúc rút lại kinh nghiệm thôi chứ thi lần đầu móc đâu ra chiến với chả lược =))):
- Bước 1: bắt đầu làm bài thi bạn chạy [nmapAutomator](https://github.com/21y4d/nmapAutomator) trên 4 máy (trừ máy bufferOverflow) (chú ý là chạy script với `options` All nhé!) .
- Bước 2: viết mã khai thác máy BufferOverflow và hoàn thành máy BufferOverflow (mất khoảng 1.5h - 2h).
- Bước 3: Khai thác máy 10 điểm (máy này khá dễ nên quất luôn đi cho gọn nợ)
- Bước 4: Lúc này, `nmapAutomator` ở bước 1 đã chạy xong; bắt đầu nhảy vào mấy cái mày củ chuối (thích làm máy nào thì nhảy vào máy đó, dò xét một lúc khó quá thì nhảy sang máy khác).

Bài thi của tôi thời gian như sau:
- Tôi thi lúc 12h trưa ngày 15/12/2020 và đến 3h sáng ngày 16/12/2020 (khoảng 15 tiếng) thì tôi đã root được 4 máy (1 máy buffer 25 điểm, 1 máy 25 điểm, 1 máy 20 điểm, 1 máy 10 điểm).
- Tiếp theo đó, tôi ngủ đến 7h 16/12/2020 (4 tiếng).
- Tiếp theo đó, tôi còn đến 11h45 16/12/2020 (khoảng 4h45p) để root máy 20 điểm còn lại nhưng ôi thôi không thể sờ mó được gì cái con máy củ khỉ này.
- 11h45 16/12/2020, `proctors` báo hết thời gian và ngắt kết nối VPN.

**Sau đó tôi viết báo cáo chi tiết nhất có thể và hi vọng không bị mất điểm nào cho màn viết báo cáo..............VÀ kết quả như nào thì các bạn cũng biết rồi đấy =))**

## Một số bài viết nên đọc
Dưới đây là một bài review cực chi tiết về tài liệu thi cũng như một số đường dẫn cực hữu ích để luyện tập BufferOverflow và luyện tập khai thác các lỗi cơ bản.
https://forum.hackthebox.eu/discussion/1730/a-script-kiddie-s-guide-to-passing-oscp-on-your-first-attempt

Một số repo cực hữu ích trong quá trình khai thác cũng như chiếm quyền quản trị cao nhất, **nếu bạn đã từng thử khai thác lỗ hổng bạn sẽ hiểu những repo dưới để làm gì =))**:

https://github.com/swisskyrepo/PayloadsAllTheThings

https://gtfobins.github.io

http://pentestmonkey.net

**Tôi khuyến nghị bạn nên có một repo riêng note lại từng thứ học được qua từng máy đã khai thác và lý do vì sao lại phải dùng câu lệnh hoặc phương pháp đó. Điều đó sẽ khiến bạn nhớ rất lâu!!!**

Và điều cuối cùng tôi muốn nói: **thích thì cứ làm đi, chờ đợi đến bao giờ nữa! Trong tình yêu, đợi chờ là hạnh phúc nhưng trong IT nói chung đợi chờ là tự giết chính mình đấy =))**