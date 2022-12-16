## TGIF - Thank God it's Friday!  🥰
Mình đùa thôi, nhưng nếu bạn cũng là developer như mình và bạn đang nghĩ thế vào ngày hôm nay thì hy vọng bài viết này giúp bạn thấy nhẹ nhàng và giải trí một chút.

Nôm na câu chuyện mình muốn nói ở đây là việc phức tạp hoá vấn đề.  
Mình thấy  vấn đề này rất hay gặp ở mấy anh em dev, chắc hẳn ai cũng từng gặp người như vậy, hoặc chính mỗi chúng ta cũng có những lúc như vậy.  
Dù sao thì, hôm nay thứ 6, nói về tech cả tuần rồi, cũng lâu không viết bài, hôm nay mình muốn chia sẻ một chút về vấn đề này. Tất cả là quan điểm cá nhân thôi, và cũng được mình rút ra sau những kinh nghiệm làm dự án, cũng như học hỏi từ những người giỏi hơn.  

Thực ra nói là phức tạp hoá cũng không chuẩn lắm, kiểu như là đôi khi chúng ta làm hoặc thể hiện mọi thứ có vẻ cao siêu hơn nhiều so với thực tế. Với một số người có lẽ là để ngầu hơn, hoặc với một số người khác là họ đã có lối suy nghĩ phức tạp như vậy rồi.

Mình sẽ đưa ra một số ví dụ để dễ hiểu hơn.

## 1. Sử dụng công nghệ mới nhất
Đây chắc là ví dụ hay gặp nhất, ở cái thời đại 4.0 này, đâu đâu chúng ta cũng thấy nói về công nghệ, các thuật ngữ về công nghệ tràn lan khắp nơi. Nào là *big data, blockchain, micro-service, AI,*...   

Anh em nào thích chạy theo công nghệ thì đều muốn được làm việc với những công nghệ mới nhất, tâm lý này là hoàn toàn bình thường, nhưng muốn thôi là một chuyện, còn gượng ép áp dụng nó vào mọi project là một chuyện khác.   

Mình và team đã từng phải trả giá khi PM (cũng là sếp) suggest áp dụng micro-service cho một project management system đơn giản, và mình đã đồng ý mặc dù thấy nó hơi cấn 😞  
Lúc đó trong team cũng không ai có kinh nghiệm set up micro-service, và sau khoảng 1 năm thì cái project đó trở thành micro-service nửa mùa, cộng với khách đổi requirement liên tục, deadline dí liên tục, kết quả là anh em dev cũng không học được gì, chỗ nọ fix chỗ kia làm code rối lên theo thời gian, project thì set up quá phức tạp.  
Nếu được quay lại chắc mình sẽ làm khác đi 😂

Trong lập trình có một nguyên tắc cơ bản mà ai cũng biết, đó là ***KISS***.   
***Keep It Simple Stupid*** - Hãy cố gắng giữ cho mọi thứ được đơn giản nhất có thể.  
Mình nghĩ áp dụng các công nghệ cao siêu cho một dự án đơn giản là điều không cần thiết, nhất là khi không có một senior về công nghệ đó để hướng dẫn và set up, đặc biệt với các công ty outsourcing, khi mà deadline thường sẽ quan trọng hơn cả.  
Không có công nghệ hay kiến trúc nào là mạnh hay yếu, chỉ có cái nào phù hợp với project của bạn hơn mà thôi. Các công nghệ mới nhất chưa chắc đã tốt hơn và xứng đáng so với effort bạn cần bỏ ra.  
Nếu bạn chưa biết thì mình nói thêm, phiên bản web của *Facebook, Instagram* và *Reddit*, cả 3 đều đang hoạt động cực kỳ ngon lành cành đào với kiến trúc *monolothic* truyền thống 🙄
Các công nghệ và kiến trúc mới ra đời để làm mọi thứ đơn giản hơn, nếu bạn sử dụng nó và cảm thấy câu chuyện còn phức tạp hơn, nghĩa là bạn đang dùng sai cách mất rồi.

## 2. Quá coi trọng lý thuyết
Cái này thì tuỳ người đánh giá.  
Một số người sẽ cho rằng lý thuyết giúp bạn có được một nền tảng vững, từ đó mới có thể hiểu sâu vấn đề hơn.   
Cá nhân mình thì không thích nói về lý thuyết lắm, kiểu như thuật toán hay mấy cái tương tự, mặc dù hồi đi học mình học Toán Tin với chương trình rất nặng về thuật toán.

Mình nhớ ngày xưa có một môn học là *Độ phức tạp thuật toán*, tính toán O(n) gì gì đó.  
Thành thật mà nói, mình không nhớ sao ngày xưa qua được môn này 😂
Bây giờ mà bắt tính toán độ phức tạp của một biểu thức thì mình không làm được, nhưng khi viết code, đặc biệt với các vòng lặp, trong gần như mọi trường hợp, mình vẫn biết cách làm sao để lượng phép tính tăng lên ít nhất khi lượng dữ liệu đầu vào tăng lên.  
Hình như đây là bản chất của độ phức tạp đúng không nhỉ?
Còn với trường hợp nào khó quá, mình search Google 🤣

Để mình ví dụ cho các bạn một chút.  
Đây là một đoạn tweet của **David Heinemeier Hansson**, người tạo ra framework nổi tiếng *Ruby on Rails*, đồng sáng lập *Basecamp* và *HEY*, đồng thời là một tay đua xe có tiếng (ông này đa tài ghê 😎).

![](https://images.viblo.asia/b8f03647-b1f6-4070-8ca4-919ed74cc4b3.jpg)  
Ý là ông này không biết diễn giải và cũng không nhớ nổi thuật toán *Bubble sort*, mỗi lần cần dùng là lại search google.  
Nếu có một buổi Whiteboard interview, ổng sẽ trượt chắc.
Và 3 năm sau khi cái tweet này ra đời, ổng vẫn không có ý định thay đổi. Đương nhiên vẫn thành công, chẳng ai phủ nhận việc David là một developer xuất sắc.  
Và David đã tạo ra một thế hệ những lập trình viên thành thật trên Twitter  😆

> *"5 năm làm Ruby mà mỗi lần cần dùng vẫn google cú pháp câu lệnh switch case"*  
![](https://images.viblo.asia/e8872aee-1050-4472-a9b3-7105b7f658ad.jpg)

> *"Biết hỏi đúng câu hỏi tốt hơn là cố gắng ghi nhớ mọi câu trả lời"*  
![](https://images.viblo.asia/120421ba-e663-41f1-a7e6-c1a2de582763.jpg)  

> *"Làm việc với Powershell từ năm 2006 mà vẫn không nhớ nổi cú pháp multiple parameter set"*  
![](https://images.viblo.asia/8b8b6dc2-08b8-4504-b215-7a9aa64dabc6.jpg)

> *Ông bạn này không biết O(n) là gì mà vẫn viết được vòng lặp* 😅😅 Khá giống mình  
![](https://images.viblo.asia/4430bdb7-f1b8-4f90-bef7-f920817b7981.jpg)

>*"Đừng bao giờ cố ghi nhớ thứ mà bạn có thể tìm kiếm"* - Albert Einstein  
![](https://images.viblo.asia/4c3b56cb-dc09-431f-9072-e93adb76f934.jpg)

> *"Tôi có 25 năm kinh nghiệm lập trình. Nếu bạn hỏi tôi một câu hỏi về thuật toán, nói cho tôi biết lần cuối bạn dùng thuật toán đó là khi nào"*  
![](https://images.viblo.asia/3fea8141-46de-4c5e-b0b6-ee9280efd30f.jpg)

> *Techlead của Twitch Esports không bao giờ để ý đến độ phức tạp thuật toán mọi người ơiii*  
![](https://images.viblo.asia/3e103e7b-c77a-44f4-b551-a61903064e54.jpg)

> *Web developer với 8 năm kinh nghiệm, mỗi lần dùng SQL joins lại phải google 😂😂😂*  
![](https://images.viblo.asia/1b0af076-71c7-46f8-8618-0ea74d7aecf1.jpg)

Mình cũng thành thật luôn, mình làm việc với JS 4 năm và C# 3 năm và không hề biết Set, Map, LinkedList hay HashTable là gì, viết SQL cũng thường xuyên google 😅

Các bạn có thể xem full các quote tweet để giải trí tại đây: https://twitter.com/dhh/status/834146806594433025?s=20...

Còn đây là quan điểm của David về UML, một thứ mà ai học về IT cũng phải trải qua. Mình cũng khá vật vã với nó hồi làm đồ án, mà giờ đi làm 4 năm rồi chưa động vào bao giờ 😂
![](https://images.viblo.asia/f170b7c9-6bf6-4106-85e7-7e7aea9f73a7.jpg)

Mình không có ý hạ thấp thuật toán nói riêng hay lý thuyết nói chung, mình nghĩ với các bạn làm về ngành khác, đặc biệt là nghiên cứu, thì có thể nó rất quan trọng.  
Nhưng với lập trình, cụ thể hơn là lập trình web app, thì đừng quá quan trọng điều này. Các bạn vẫn có thể trở thành một developer giỏi, có một công việc tốt nếu bạn không giỏi thuật toán.  
Thuật toán đôi khi chỉ là một cái tên, nhiều lúc bạn vẫn sử dụng nó hàng ngày, chỉ là bạn không biết mà thôi.

Mình nhớ ở buổi phỏng vấn công ty hiện tại của mình, mình được anh Principle engineer phỏng vấn và thực sự rất ấn tượng với cách làm việc của anh.  
Format bài phỏng vấn của công ty có 4 phần. Ở phần thứ 3 là live coding, mình được yêu cầu share màn hình và code 2 bài tập nhỏ về React rendering và Dark mode trong React app.  
Mình thấy người phỏng vấn không để ý mình viết gì, cũng chẳng quan tâm lắm đến kết quả, chỉ có một yêu cầu là trong khi code nghĩ gì trong đầu phải nói hết ra. Đó là cách để anh ấy đọc được hướng tư duy và cách giải quyết vấn đề của ứng viên.  
Còn đến phần thứ 4 là thuật toán, anh ấy hỏi luôn là em thích làm không, em không thích thì thôi vì anh thấy nó không quan trọng. Nghĩ lại cũng may, làm theo đúng format lại hỏi Bubble sort có khi mình trượt rồi 😂

Mình thấy kiếm được công ty với người phỏng vấn có tâm như thế khá là khó, nên mới sinh ra điều thứ 3.

## 3. Phỏng vấn quá phức tạp
Mình thấy nhiều nhà tuyển dụng khi phỏng vấn hỏi nhiều câu rất kinh khủng khiếp, mặc dù đang phỏng vấn role là junior hoặc thậm chí là intern 😂  
Những câu hỏi kiểu như là code lại một thư viện nào đó, hoặc đưa ra ý kiến để xử lý một vấn đề nào đó về realtime, caching,... sẽ không thể được giải quyết bởi một cá nhân trong thời gian một buổi phỏng vấn.  
Khi làm việc rất hiếm khi chúng ta làm việc một mình, đặc biệt với các vấn đề khó cũng không ai dám cho bạn làm một mình, nếu bạn có kinh nghiệm chưa đủ nhiều.  
Những câu hỏi quá sâu về lý thuyết huyền thoại kiểu như "4 tính chất của OOP?", "Phân biệt ABC với XYZ?",... cũng không có nhiều giá trị để đánh giá một ứng viên, theo quan điểm của mình, nó gần như mang tính học thuộc lòng nhiều hơn.

Mình cũng thấy nhiều bạn đi phỏng vấn mà ôn lên ôn xuống, ôn rất kỹ lý thuyết.  
Tất nhiên nắm vững lý thuyết cũng tốt thôi, nhưng nó sẽ tốt nếu như đó là thứ bạn cần làm hàng ngày, nếu không thì bạn sẽ quên nó rất nhanh thôi, và cũng không giúp ích được gì cả.  
Chúng ta đã mất 12 năm phổ thông, thêm 5 năm đại học nữa mới thoát được cái chuyện ôn tập kiểu thuộc lòng, giờ còn quay lại thời đó làm chi 😅

Mình hy vọng tình trạng này sớm được cải thiện, đỡ phí thời gian và công sức của cả công ty lẫn các bạn ứng viên.


*Tạm thời mình chỉ nghĩ được từng đó, lan man một chút về quan điểm cá nhân thôi, lần tới nghĩ được nhiều hơn sẽ viết thêm 😁  
Mình tự hào khi là một lập trình viên, nhưng cá nhân mình không thấy bản thân ngầu hơn chút nào khi nói về mấy công nghệ hay kiến trúc khủng bố tý nào, đặc biệt là khi nói chuyện với người non-tech hoặc ít kinh nghiệm 😅😅*

Mọi thứ nên đơn giản khi nói về lập trình.  
*Viết code thì đơn giản, viết code đơn giản mới khó.*

À, có bạn nào muốn thành thật như David Heinemeier Hansson thì comment nhé, xem chúng ta có giống nhau không 🤣🤣🤣  
Happy weekend everyone!