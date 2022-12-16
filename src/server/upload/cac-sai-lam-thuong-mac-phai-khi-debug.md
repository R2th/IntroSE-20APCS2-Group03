Chắc hẳn tất cả chúng ta đều không còn lạ lẫm gì với các khái niệm Bug và Debug nữa rồi. Tuy nhiên tôi vẫn sẽ nhắc lại về hai khái niệm quen thuộc này:

> **Bug** trong tiếng anh là bọ, bọ ở đây ám chỉ những lỗi trong chương trình, hệ thống làm cho chương trình, hệ thống đó không hoạt động được hoặc hoạt động khác với kì vọng đã đề ra. Bug tiềm ẩn ở mọi nơi ,chúng ta khó mà có thể lường trước được tất cả các tình huống mà chỉ có thể cố gắng để giảm thiểu tối đa số lượng của nó tuỳ thuộc vào công nghệ và khả năng của chúng ta vào thời điểm phát triển và bảo trì chương trình, hệ thống.
> 
> **Debug** chính là quá trình tìm kiếm ra bug và nguyên nhân gây ra bug, từ đó có thể đưa ra hướng giải quyết vấn đề bug gây ra.
>
![](https://images.viblo.asia/ee8c718e-1cb7-41d5-b9f3-e7578d9a70bf.jpg)
Nguồng hình ảnh: Google


   Lập trình viên là những người có "tiềm năng" tạo ra bug nhất và cũng chính là những người debug hiệu quả nhất, Bug và Debug sẽ theo chúng ta xuyên suốt quá trình phát triển và bảo trì ứng dụng.

Trong bài viết này tôi sẽ dựa vào kinh nghiệm của bản thân và kiến thức tìm hiểu được trên mạng để kể ra cho mọi người một số lỗi lập trình viên chúng ta thường gặp phải khi debug. Từ đây chúng ta có thể rút kinh nghiệm để biết mình thiếu gì và cần gì để phát triển kĩ năng debug-một kĩ năng cần có của một developer.

### Log Messages không thành công

  Chắc hẳn chúng ta đã có ít nhất một lần rơi vào hoàn cảnh gặp phải một bug làm crash app nhưng khi check log message lại không đủ dữ kiện để xác định nguồn gốc của bug hoặc thậm chí là không thấy gì được log ra. 

Một cách giải quyết cho trường hợp này là chúng ta có thể đặt log và thử lại nhiều lần. Mục đích là để sau mỗi lần log và thử có thể dần khoang vùng được phần phát sinh bug.

### Đọc hoặc hiểu sai Error Messages

  Hồi mới học code tôi rất hay gặp những message khó hiểu và lúng túng trong việc giải quyết các lỗi này -> gây mất thời gian. Được một thời gian nhờ sự chỉ dạy tận tình của các đồng nghiệp cùng kinh nghiệm gặp rất nhiều bug, t đã có thể tự đọc và tìm hiểu về ý nghĩa của các error messages, tuy nhiên đôi khi vẫn hiểu chưa đúng hoặc chưa đầy đủ. Giải pháp là ngay khi đối mặt với error messages thì nên tìm hiểu (hỏi đồng nghiệp hoặc đơn giản là google-sama) dựa vào ngữ cảnh hiện tại để biết rõ ý nghĩa mà message muốn thể hiện.

### Đặt sai vị trí Log

  Việc đặt sai vị trí Log ngoài việc bởi chưa hiểu rõ flow của chương trình mà còn có thể do sơ xuất. Hậu quả là chúng ta bị đi trệch hướng khi tiến hành Debug -> mất thời gian và vì quay lại cũng có thể bị mất track, không biết mình sai ở đâu. Để chắc chắn rằng mình không Log sai ,chúng ta có thể thử lại nhiều lần trước khi chuyển sang bước debug tiếp theo.

### Viết ra rất nhiều các dòng code mới mà không xen kẽ với debug

  Chúng ta đều hiểu số lượng code càng lớn thì việc bới ra được bug trong đấy càng gặp nhiều khó khăn và tốn thời gian. Thay vào đó chúng ta có thể tự đặt các milestones nhỏ, sau khi có một số lượng code vừa đủ thì có thể build và chạy thử để nắm bắt được bug ngay khi nó xuất hiện.

### Không thử sử dụng phương pháp loại trừ

  Đôi khi sẽ có nhưng lúc mà chúng ta gặp khó khăn trong việc tìm ra cội nguồn của lỗi trong một trường hợp đặc biệt. Thay vì cứ đào bới code và liên tục check log, ta có thể xem xét vấn đề của lỗi trong các trường hợp kém đặc biệt hơn, từ đó loại trừ dần các khả năng có thể xảy ra và dần dần tiến tới được nguồn gốc của lỗi.

### Copy và Paste từ trên mạng 

  Đây là lỗi thường gặp ở các lập trình viên mới vào nghề. Những phần code trên mạng thường khác chung chung và thậm chí không hoàn toàn phù hợp với ngữ cảnh cụ thể của chương trình, hệ thống. Nếu muốn áp dụng phần code này vào chương trình thì cần xem xét và sửa đổi cho phù hợp đồng thời cũng phải lường trước phạm vi ảnh hưởng của nó.

### Quên mất cách debug một lỗi đã gặp phải rồi

  Có một kĩ thuật debug mà tôi tìm hiểu được đó là sau khi đã debug thành công một lỗi, chúng ta có thể tái hiện và debug lại lỗi ngay sau đó để nắm bắt hiểu rõ hơn vấn đề -> "Practice make perfect"

### Quên mất mình đã code cái gì

  Có thể bạn có hứng code và viết ra mấy trăm dòng code liên tục trong một block ,hôm sau chạy thử thì lại bị dính lỗi crash app và sau đó bạn phải ngồi track lại từng dòng code với vô số logic mà không nhớ rõ mình đã code cái gì ở đây. Thay vì vậy chúng ta có thể tách riêng từng phần của block đó thành những block nhỏ hơn, "chia để trị" không chỉ làm code của bạn dễ nhìn dễ đọc hơn mà còn làm đơn giản việc sửa đổi hệ thống.


Trên đây chỉ là một số lỗi chúng ta thường gặp phải mà tôi đúc kết + tham khảo được. Hi vọng là từ những lỗi này chúng ta có thể nâng cao được trình độ debug của mình. Cảm ơn các bạn đã đọc bài viết này của tôi.

Bài viết được tham khảo một số ý từ [trang web này](https://medium.freecodecamp.org/how-to-improve-your-debugging-skills-abb5b363bdb8)