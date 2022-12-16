<h1>Hiểu bài toán của mình</h1>

<p>Điều đầu tiên và quan trọng nhất đó là bạn cần hiểu các yêu cầu của ứng dụng khi tương tác với Audio. Bạn sẽ cần phải trả lời một số câu hỏi sau đây để có thể estimate một cách chuẩn xác cho ứng dụng sử dụng Audio của mình, và nhiều khi, khách hàng cũng chẳng rõ specs cho lắm cho tới khi bạn Q&amp;A.</p>

<p>Câu hỏi hẳn là các bạn sẽ có sẵn lời giải đáp, đó là: <em>Ứng dụng play hay ghi âm, hay cả hai</em>.</p>

<h3>Ứng dụng có play audio</h3>

<ul><li>Ứng dụng load audio từ đâu? (iOS, local app hay từ server trên mạng)</li><li>Audio được sử dụng để làm gì? (sound effect, background music, music)</li><li>Ứng dụng có cho phép âm thanh của các ứng dụng khác (như khi người dùng bật audio từ iTunes, Zing Mp3, Spotify, Podcast,…) được play cùng không?</li><li>Người dùng có thể tương tác với audio không, nếu có thì làm được những gì? (play/pause, next/back, đổi tốc độ play, đổi volume,…)</li><li>Nút bấm tai nghe có được phép hoạt động không, cần xử lý các event nào (toggle play/pause, next/back,…)</li><li>Có hiển thị Media Player ở màn hình khóa không, nếu có thì những thông tin nào được show ra và các nút tương tác nào user có thể sử dụng.</li><li>Khi cắm, rút tai nghe, hành vi của app sẽ thực hiện ra sao?</li><li>Các hành vi cụ thể của việc play âm thanh sẽ ra sao khi cắm, rút tai nghe hoặc khi bị ngắt bởi các ứng dụng khác hay cuộc gọi tới?</li></ul>

<h3>Ứng dụng có ghi âm</h3>

<ul><li>Ứng dụng có thể cắt audio, ghép audio hay không?</li><li>Ứng dụng có yêu cầu vẽ sound wave không?</li><li>Nếu có vẽ sound wave, animation của sound wave chạy thế nào? (Điều này ảnh hưởng đến chu kì nhả data ghi âm vào buffer nên clear phần này là rất quan trọng nhé)</li><li>Có nén dữ liệu sau khi ghi âm không, nếu có, định dạng nén là gì?</li><li>Có cần khôi phục và ghi tiếp khi app bị kill đột ngột hay không?</li><li>Các hành vi cụ thể của việc ghi âm sẽ ra sao khi cắm, rút tai nghe hoặc khi bị ngắt bởi các ứng dụng khác hay cuộc gọi tới?</li></ul>

<p>Nói chung mà nói, ghi âm sẽ khó hơn, bạn cần tìm hiểu nhiều concept về media hơn, thậm chí, nếu yêu cầu phức tạp, bạn có thể sẽ phải xuống tới tầng Core Audio và làm việc với các thư viện C, phải hiểu và tự setup các cổng input/output, tự xử lý buffer,… và tốt nhất là bạn nên đẩy lên tầng <code>AVFoundation</code> càng nhanh càng tốt.</p>

<p>Sẽ còn nhiều những bài toán có những yêu cầu đặc biệt hơn dựa trên specs của ứng dụng. Do đó, các bạn cần hiểu đây là các câu hỏi tham khảo, và bạn có thể mở rộng nó ra nhé!</p>

<h1>Hiểu các lớp tương tác Audio trong AVFoundation</h1>

<p>Trước tiên phải nói <code>AVFoundation</code> là gì? Nói vậy chứ ông nào định làm việc với audio mà chả nghe về nó rồi. Nhưng để mà hiểu nó hơn thì chúng ta sẽ đi phân tích lại nhé!</p>

<p>Ngày xửa ngày xưa, khi chưa có AVFoundation (mà ngay cả lúc có rồi nhưng vẫn còn bug lòi ra), các developer muốn phát triển ứng dụng tương tác với audio cần phải làm việc ở tầng Core Audio, code bằng C/C++, và phải xử lý rất là lắm thứ liên quan kể cả việc thiết lập điều khiển phần cứng. </p>

<p>Tuy nhiên, Apple đã phát triển <code>AVFoundation</code>, kiến tạo các class dùng chung, xử lý hết mớ lằng nhằng mà ta phải implemtent hết lần này lần khác với Core Audio, và xuất ra một Objective-C interface để ta có thể sử dụng bằng Objective-C cho nó tiện. </p>

<img src="https://images.viblo.asia/12459bba-69e2-445c-9ae9-ed31f74a2b40.png" alt=""/>

<p>Vâng đó là <code>AVFoundation</code> framework, phải công nhận rằng nó rất tiện. Play audio hay ghi âm chỉ cần một đoạn code ngắn rất clear và dễ hiểu.</p>

<p>Vậy thì cuối cùng, <code>AVFoundation</code> có gì để trở nên bá đạo như vậy?</p>

<h3>AVAudioSession</h3>

<p>Nếu bạn chưa biết, thì mỗi ứng dụng trong hệ điều hành iOS có duy nhất một audio session, được truy cập trong code thông qua <code>AVAudioSession.sharedIntance()</code>. </p>

<p>Audio session là trung gian giữa iOS và ứng dung, nó thể hiện các ý định tương tác với audio mà người lập trình mong muốn. Ta thể hiện nó thông qua việc cấu hình các thuộc tính của Audio session.</p>

<p>Audio session có 3 tính năng cơ bản:</p>

<ul><li>Thiết lập category: Một category là một key xác định một loại các audio behavior cho app của ta. Chi tiết về các loại category xem ở <a href="https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/AudioSessionCategoriesandModes/AudioSessionCategoriesandModes.html">đây</a> nhé.</li><li>Post notification về interruptions và route changes.</li><li>Trích xuất các thông số phần cứng.</li></ul>

<p>Audio session là điều đầu tiên ta cần quan tâm và thiết lập bởi vì nó sẽ xác định các audio behavior cho ứng dụng.</p>

<h3>AVAudioPlayer</h3>

<p>Đơn giản như cái tên gọi của nó, đây là một audio player. Tuy nhiên nó cũng không hẳn mạnh mẽ như cái tên nó được hưởng, bởi vì ta chỉ có thể sử dụng lớp này để <br>
mở các audio ở bộ nhớ trong hoặc từ buffer. Có nghĩa là bạn cần có file sẵn trong máy, hoặc down về xong xuôi rồi mới có thể play audio bằng <code>AVAudioPlayer</code>.  </p>

<p>Về các tính năng hàn lâm, tham khảo docs của Apple nhé: <a href="https://developer.apple.com/documentation/avfoundation/avaudioplayer">AVAudioPlayer</a></p>

<p>Chú ý rằng, không như <code>AVPlayer</code>, <code>AVAudioPlayer</code> không tự động xử lý audio session interruption cũng như audio session route change, do đó ta cần chủ động xử lý. Tham khảo: </p>

<p><a href="https://developer.apple.com/documentation/avfoundation/avaudiosession/responding_to_audio_session_interruptions">Responding to Audio Session Interruptions</a></p>

<p><a href="https://developer.apple.com/documentation/avfoundation/avaudiosession/responding_to_audio_session_route_changes">Responding to Audio Session Route Changes</a></p>

<p>Thực ra <code>AVAudioPlayer</code> cũng có tự dừng khi gặp phải interruption, tuy nhiên khi việc ngắt play xảy ra với một cơ chế thiếu chủ động, nó tạo ra bug. Bản thân người viết đã làm việc với nó và phải đối phó với bug này. Chúng ta sẽ bàn tiếp về nó ở phần sau nhé!</p>

<h3>AVPlayer</h3>

<p>Có thể nói, đây là một loại player hết sức là ghê gớm. Tại sao người ta chỉ gọi nó là Player mà không phải kiểu như AudioPlayer?</p>

<p>Bởi vì nó play cả video được luôn thưa quý bạn!</p>

<p>Điều đó có nghĩa là gì, có nghĩa là đây là một chiếc player đa di năng, nó có thể play audio/video từ local, audio/video từ kết nối mạng bên ngoài. Ngoài ra, nó cũng cung cấp cơ chế play khác với <code>AVAudioPlayer</code>, đó là thông qua <code>AVPlayerItem</code>. Nhờ đó mà ta có thể tách rời logic xử lý lỗi giữa player và item, cover được một số case phức tạp hơn</p>

<p><code>AVPlayer</code> có khả năng tự động xử lý audio session interruption và route change. Nếu bạn muốn cập nhật lại UI dựa trên việc xử lý interrupt của AVPlayer, bạn chỉ cần observe một số thuộc tính cần thiết, ví dụ như <code>timeControlStatus</code> chẳng hạn.</p>

<p>Còn những thứ hàn lâm về AVPlayer, mời các bạn xem Apple docs nhé: <a href="https://developer.apple.com/documentation/avfoundation/avplayer">AVPlayer</a></p>

<p>Và rồi cũng sẽ đến lúc bạn tự hỏi, <code>AVPlayer</code> bá đạo như thế thì ta dùng <code>AVAudioPlayer</code> để làm gì? <code>AVPlayer</code> vừa play được local file, vừa play được file từ server, sao không dùng 1 loại thôi?</p>

<p>Thực ra <code>AVPlayer</code> và <code>AVAudioPlayer</code> có sự định hướng khác nhau trong mục đích sử dụng, do đó cấu trúc class của nó sẽ phản ánh điều này:</p>

<ul><li><code>AVAudioPlayer</code> đơn giản và thuận tiện hơn, nó có sẵn các thuộc tính tiện lợi như <code>isPlaying</code>, <code>volume</code>,… trong khi AVPlayer không có, tuy rằng đều có thể thiết lập được nhưng một số chức năng cũng cần code khá dài dòng.</li><li><code>AVAudioPlayer</code> là một phiên bản audio player tinh gọn và dễ dàng sử dụng hơn <code>AVPlayer</code>, và bởi chính vậy, nó cũng bị giới hạn khả năng sử dụng là chỉ với local file và buffer để có thể đảm bảo tính đơn giản của nó. Nếu bạn cung cấp tính năng streaming file từ kết nối trên mạng, có hàng đống case mà bạn phải xử lý, và khi đó bạn không thể đơn giản được nữa, bạn cần <code>AVPlayer</code>.</li><li><code>AVPlayer</code> dường như là một phiên bản audio player phức tạp hơn, và tất cả các tính năng thêm thắt mà nó cung cấp là để thuận tiện nhất cho việc xây dựng và xử lý file streaming qua kết nối bên ngoài.</li></ul>

<p>Và để trả lời cho câu hỏi ban đầu, xin thưa, bạn có thể bỏ hoàn toàn <code>AVAudioPlayer</code> để sử dụng duy nhất <code>AVPlayer</code>. Tuy nhiên, điều bạn vừa làm là trường hợp điển hình của câu nói "dùng dao mổ trâu giết gà". Sự cồng kềnh và nặng nề sẽ đặt lên những dòng code của bạn, và chuyên mục "thách bé maintain" sẽ bắt đầu sớm thôi.</p>

<h3>AVAudioRecorder</h3>

<p>Ghi âm là một công việc phức tạp, luôn luôn là vậy. Và vì AVAudioRecorder được xây dựng nhằm hướng tới việc giảm thiểu độ cồng kềnh của code khi thiết lập cho chức năng ghi âm, nó không cung cấp khả năng ghi đè, và để viết code cắt ghép với AVAudioRecorder thì đúng là thảm họa.</p>

<p>Rất tiếc phải nói rằng để cung cấp tính năng ghi âm một cách tử tế và hoàn thiện, phần lớn ta thường phải xuống tới tầng Core Audio, sử dụng <em>Audio Queue Services</em> hoặc <em>Audio Units</em>.</p>

<p>Về các tính năng cơ bản của <code>AVAudioRecorder</code>, tham khảo docs của Apple nhé: <a href="https://developer.apple.com/documentation/avfoundation/avaudiorecorder">AVAudioRecorder</a></p>

<h3>AVAudioEngine</h3>

<p>Đây là cả một chân trời mới trong thế giới của <code>AVFoundation</code>. Được ra mắt từ iOS 8, <code>AVAudioEngine</code> là một thư viện Objective-C mô phỏng cơ chế của Audio Unit trong Core Audio. </p>

<p>Nếu bạn chưa biết cơ chế của Audio Unit thì có thể hiểu <code>AVAudioEngine</code> giống như là một phần mềm remix. Chúng ta có thể kết nối nhiều node vào với nhau, trộn âm thanh nhờ một hay nhiều player node với các effect node phong phú và cung cấp sẵn từ bộ thư viện của <code>AVAudioEngine</code>, sau đó xuất ra một bản remix tuyệt vời.</p>

<p>Chúng ta cũng có thể ghi âm với khả năng xử lý cắt ghép tốt do ghi âm với <code>AVAudioEngine</code> không hoàn toàn đóng kín như <code>AVAudioRecorder</code>.</p>

<p>Tuy nhiên, đây là một thư viện mới và theo kinh nghiệm sử dụng nó của tôi thì cái thư viện này thực sự đầy bug, nhiều khi nói thật là crash như chơi. Apple docs không có nhiều hướng dẫn chi tiết về việc thiết lập sao cho nó "best practice", chỉ có một số đóng góp từ cộng đồng và một số tutorial.</p>

<p>Nếu bạn cần nhiều effect hơn là việc chỉ thay đổi play speed? Có lẽ bạn cần chuyển từ <code>AVAudioPlayer</code> sang <code>AVAudioEngine</code>.<br>
Nếu bạn đang muốn ghi âm với <code>AVAudioEngine</code>? Vừa nên lại vừa không. Còn làm thế nào thì chúng ta sẽ sang bài sau nhé!</p>

<h1>Kết</h1>

<p>Phần 1 sẽ kết thúc ở đây, bài tiếp theo tôi sẽ hướng dẫn triển khai đồng thời đưa ra một số lời khuyên từ bản thân qua kinh nghiệm thu được khi làm việc với audio nhé mọi người!</p>