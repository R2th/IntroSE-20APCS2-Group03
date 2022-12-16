# 1. Khi nào cần thực hiện audio testing?
Bạn nghĩ chúng ta cần thực hiện audio testing trong các trường hợp nào? Đừng suy nghĩ quá nhiều, đơn giản chỉ cần ứng dụng hay website của bạn có support 1 chức năng có phát ra âm thanh thì chúng ta đều đã cần quan tâm đến việc sẽ phải cover những vấn đề xung quanh đến nó. Lấy ví dụ một số ứng dụng quen thuộc có hỗ trợ âm thanh như:
<br/>
* Facebook, Youtube, .... họ có phát âm thanh khi play video
* Spotify, Apple Music,... họ có phát âm thanh khi play nhạc
* Vô số các game trên thị trường với nhạc nền và âm thanh hiệu ứng
* Hay kể cả Google Translate họ cũng có phát âm thanh khi user muốn nghe tiếng bản ngữ từ "chị" Google,.... <br/><br/>

**Và bạn đừng nghĩ việc phát ra âm thanh phụ thuộc hoàn toàn vào phần cứng nên việc dành effort cho audio testing là không cần thiết, kinh nghiệm của tôi đã cho tôi biết điều đó là sai hoàn toàn!** <br/><br/>
Việc âm thanh từ ứng dụng hay website của bạn có được đảm bảo hay không thì vẫn có những vấn đề có thể phát sinh hoặc có thể cải thiện từ phía developer team. Thế thì tại sao chúng ta lại bỏ qua được những gì có thể làm để nâng cao chất lượng sản phẩm phải không nào? 
# 2. Cần chuẩn bị gì trước khi thực hiện audio testing?
Trước hết, khi bắt đầu tiến hành audio testing, chúng ta nên có những bước set up, chuẩn bị môi trường để có thể mang lại kết quả test đáng tin cậy, như:
* Device test có đang hoạt động ổn định tính năng phát âm thanh hay không ? (có hư hỏng về phần cứng hay không)
* Nội dung âm thanh (âm thanh hiệu ứng, bài hát, video) có chất lượng tốt, là những nội dung mà ứng dụng sẽ hay thường sử dụng trong thực tế. Tức là chúng ta cần chuẩn bị những data test có mức độ tương đồng nhất định đối với data thật.
# 3. Quan điểm
Tương tự với mọi chức năng khác, một step hết sức quan trọng khi mà chúng ta đều cần thực hiện tốt đó chính là chuẩn bị bộ test case cover đủ các quan điểm testing cho chức năng đó. Và với audio testing, những quan điểm cơ bản mà chúng ta cần đảm bảo đó là:
* Âm thanh phát ra từ sản phẩm của bạn có ổn định hay không ?
* Đối với các ứng dụng support split screen, thì âm thanh có bị chồng chèo lên nhau không?
* Âm thanh sau các sự kiện interrupt như: tắt màn hình, minimize app, có cuộc gọi đến, thông báo đến, mất kết nối mạng,..... thì có còn được ổn định không? Sau đó người dùng lại bật app khác lên thì app trước có chồng chéo âm thanh lên không?
* Âm thanh trong các trường hợp thiết bị có trạng thái bất ổn như: pin yếu, máy vừa khởi động, máy đầy bộ nhớ......
* Âm thanh của ứng dụng có cho phép phát dù user đã về background hay thu nhỏ ứng dụng không?

**Riêng với các ứng dụng video/ nhạc, chúng ta cần để tâm đến:**
* Âm thanh có đồng bộ với cảnh khi play video không?
* Âm thanh có thay đổi đúng khi tua nhanh hay chuyển đoạn video/ nhạc không?
* Âm thanh đối với từng quality video/ bài hát có đảm bảo hay không, khác biệt về âm thanh mỗi khi thay đổi quality của content có đúng hay không? *(Vd: Với video thì có các loại chất lượng thường thấy như: 240p, 360p, 480p, 720p.... Với bài hát  thì có các loại như: 320 Kbps, 256 Kbps,... )*
* Khi chuyển đổi giữa các ứng dụng âm thanh, ví dụ: Apple Music -> Youtube -> Spotify -> Zing MP3  thì âm thanh từ ứng dụng trước có tạm dừng khi play ở ứng dụng sau hay không?
* Đối với các thiết bị 2 màn hình thì khi mở 2 màn hình là 2 ứng dụng play video/ nhạc khác nhau thì có phát âm thanh cùng lúc không? Kiểm tra tương tác khi ứng dụng A play thì ứng dụng B có tự động pause lại không?
* Khi bạn đang play một video, môt bài hát và nhận PUSH notification để play một video/ bài hát khác thì 2 content có phát đè lên nhau không? 
* Hay đối với video đa góc nhìn (4D) thì tap phóng to, thu nhỏ âm thanh như thế nào?
* Và trên một số loại hình video có nhiều khung cùng hiển thị đa góc nhìn trên cùng 1 video thì âm thanh có bị chồng chéo hay không?
![](https://images.viblo.asia/e289ef85-6d75-4e71-9df7-76b68e3f87f4.jpg)


**Riêng với các ứng dụng game, thì bạn đừng bỏ qua các quan điểm như:**
* Khi kiểm thử âm thanh của game thì chúng ta cần phân biệt sound effect và background music, xem các âm thanh này có được phát chính xác thời điểm người chơi thực hiện các thao tác trong game hay không, có khớp với từng hiệu ứng của game hay không?
* Đối với những ứng dụng game cho tắt/ bật effect sound, background music thì âm thanh thực tế khi chơi game phát ra có đúng như setting không?

**Đến đây tôi lại đặt câu hỏi, liệu khi test case đã cover được những quan điểm cơ bản nhưng khi test trên các thiết bị phát âm thanh khác nhau thì kết quả liệu có tương tự? Và liệu sẽ có những vấn đề khác nhau cho từng môi trường test?** <br/><br/>
**Câu trả lời là CÓ**, với thời buổi hiện đại hóa, công nghệ hóa, việc sử dụng các thiết bị phát âm thanh khác nhau vô cùng phổ biến, và việc có những vấn đề về audio trên từng loại thiết bị phát âm thanh khác nhau là hết sức dễ thấy. Do vậy ở vị trí một tester nắm bắt được xu hướng chúng ta không thể bỏ qua việc đảm bảo sản phẩm của mình luôn  work tốt trong các trường hợp đó.<br/>Những thiết bị đó có thể là loa của chính chiếc điện thoại, laptop, PC đang chạy ứng dụng; tai nghe có dây; tai nghe bluetooth;...Và sau đây tôi sẽ đưa ra một số quan điểm cũng như gợi ý cho bạn những ý tưởng testing trên các thiết bị đó.

### i. Âm thanh từ loa của thiết bị chạy ứng dụng: loa của mobile phone, laptop, ...
![](https://images.viblo.asia/384a0d25-bc60-4bae-bdb5-c27d64aa01d1.jpg)
Tất nhiên, đối với bất cứ sản phẩm nào chúng ta đều cần quan tâm đầu tiên là môi trường chính, trong trường hợp này đó chính là âm thanh từ loa của thiết bị đang chạy ứng dụng. Bạn cần đảm bảo rằng:
* Khi tăng giảm âm lượng bằng trình điều khiển hay nút cạnh thiết bị (Mobile) hay control trên thanh công cụ (PC, laptop), thì âm thanh có thay đổi theo điều chỉnh của người dùng không?
* Khi tua video, tua nhạc trên trình điều khiển thì âm thanh có đồng bộ với hình ảnh hay với thao tác người dùng không?
### ii. Thiết bị ngoài: Tai nghe có dây
Đối với tai nghe có dây, trên các tai nghe đều có sẵn các nút cứng hỗ trợ cho các tính năng như tăng giảm âm lượng, play/ pause. Chúng ta nên kiểm thử với các quan điểm sau:
![](https://images.viblo.asia/5238f0c7-3eef-456f-aad6-4fc0e325f240.png)
* Khi cắm tai nghe vào thiết bị thì có chuyển ngay lập tức âm thanh từ thiết bị sang tai nghe không?
* Khi sử dụng các nút tăng giảm âm lượng, play/ pause thì âm thanh phát ra từ ứng dụng có đồng bộ theo không?

### iii. Tai nghe bluetooth<br/>

Việc sử dụng tai nghe bluetooth đang ngày một phổ biến, không để ứng dụng/ website của mình mắc phải những sai khác trên tai nghe bluetooth thì chúng ta cũng nên kiểm thử với nó.
![](https://images.viblo.asia/53779002-33e0-49d8-89ec-e341e037c5c4.jpg)

Trong bài viết này tôi xin phép nói cụ thể 1 dòng sản phẩm đại diện, đó là Airpod. Airpod support người dùng 1 số thao tác đặc trưng khi double tap vào 1 hoặc cả 2 bên tai như: Pause/ Play, Next track, Previous track, Siri, Off.

Trong đó Pause/Play và Next track hay Previous track là những lệnh sẽ có nhiều ảnh hưởng khi user sử dụng các ứng dụng phát audio. Nên chúng ta cần kiểm thử thêm các event khác đối với tai nghe bluetooth các quan điểm như :
* Khi double tap phía tai nghe đã được set các lệnh Pause/ Play, Next track,... thì âm thanh có thay đổi đúng theo thao tác của người dùng không?
* Khi user tháo tai nghe khỏi tai thì âm thanh có tự động pause lại không? Khi đeo tai nghe trở lại tai thì có tự động play lại không? và tất cả các sự kiện đó có đồng bộ với hiển thị trên ứng dụng/ website không ?
* Khi kết nối tai nghe bluetooth với thiết bị khi đang phát 1 đoạn audio bất khi thì âm thanh có chuyển sang tai nghe bluetooth không? Và âm thanh có đảm bảo không?

### iv. Các thiết bị khác
- **Chromecast:** Ngoài việc phát âm thanh ra từ loa thiết bị chính, tai nghe thì ngày nay 1 chức năng của hầu hết các ứng dụng phát video đều có support đó chính là "Play on TV by Chromecast" - bằng cách phát video này, người dùng có thể truyền tải video từ các thiết bị thông minh nhỏ hơn (như máy tính, điện thoại, máy tính bảng ...) lên màn hình TV. Điều này giúp người dùng có được trải nghiệm nội dung tốt hơn với màn hình lớn. Song song với sự tiện lợi này thì chúng ta cũng phải hết sức để tâm đến việc hình ảnh, âm thanh khi truyền tải từ ứng dụng của mình lên TV có sự sai khác gì hay không. 
- **Loa bluetooth, loa có dây:** tương tự như tai nghe thì những thiết bị phát âm thanh ngoài này cũng sẽ có những đặc thù riêng ảnh hưởng ít nhiều đến chất lượng sản phẩm, nên nếu có đủ effort chúng ta cũng nên thực hiện smoke test đế nâng cao chất lượng sản phẩm.
# 4. Các điểm cần lưu ý khi kiểm thử âm thanh
![](https://images.viblo.asia/8f130dc4-f0ce-45a2-ac66-005898683efc.jpg)
- Bên cạnh đảm bảo các quan điểm là đủ, chúng ta cũng cần quan tâm đến **device mình sẽ test là gì**. Tùy thuộc vào project, chúng ta nên xác định  OS, version browser mà sản phẩm support hay dòng điện thoại, browser nào sẽ phổ biến ở thị trường mà sản phẩm hướng đến. Từ những thông tin đó, chúng ta sẽ xác định được device, OS/ version cần ưu tiên test.
- Và như đã nói ở trên, khi bắt đầu kiểm thử, điều đầu tiên chúng ta cần confirm là **môi trường test có đảm bảo hay không**. Nếu có sự hỏng hóc về phần cứng ngay từ đầu thì kết quả kiểm thử  từ đó sẽ bị ảnh hưởng toàn bộ, và chúng ta có thể dễ dàng bỏ sót bug hoặc bắt bug sai.
- Ngoài ra, vấn đề về âm thanh còn phụ thuộc ít nhiều vào **chất lượng âm thanh từ chính phía content** - tức là nội dung của bài hát/ video dùng để test có miêu tả âm thanh rè hay lớn nhỏ không ổn định hay không, điều này có thể gây hiểu lầm là bug khi tester lắng nghe để đánh giá chất lượng âm thanh.
- Một vấn đề âm thanh khác đó là do **tín hiệu** , **đường truyền không ổn định**. Bạn có thể dễ dàng thấy các video live-stream có chất lượng âm thanh bị ngắt quãng, không đồng bộ với phần hình, nên đây cũng là 1 vấn đề cần lưu ý, nếu gặp phải thì bạn có thể raise vấn đề lên và cùng team của mình tìm ra giải pháp để có thể tối ưu sản phẩm hơn.<br/><br/><br/>


*Trên đây là những chia sẻ từ chính kinh nghiệm và tìm hiểu của bản thân người viết. Nên nếu bạn có thắc mắc hoặc góp ý để đưa bài viết này trở thành một bản guideline cho audio testing hoàn thiện hơn thì đừng quên để lại comment nhé!*