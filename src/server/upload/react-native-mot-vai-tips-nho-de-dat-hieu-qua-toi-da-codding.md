React Native là 1 nền tảng rất tuyệt vời. Nó cho phép chúng ta tạo ra các ứng dụng đa nền tảng, và đẹp mắt k kém thậm chí còn có điểm hơn so với Native App. Việc áp dụng nền tảng này trong quá trình phát triển ứng dụng mobile đã không ngừng tăng lên.

Và trọng tâm chính trong công việc nghiên cứu (research), phát triển ngày nay dường như các developer, các công ty công nghệ sẽ tập trung vào hiệu suất (perfomance), khả năng mở rộng hoặc so sánh giữa React Native và các tùy chọn khác để tạo ra 1 sản phẩm cho chất lượng tốt nhất. Tuy nhiên làm như thế nào "HOW", và phải đạt tốc tộ nhanh "HOW QUICKLY" thì lại và 1 vấn đề.

Sau 1 vài dự án đã trải qua coding React Native, mình chia sẻ 1 số mẹo giúp sẽ giúp bạn tối đa hóa tốc độ coding của mình trong React Native. Cùng bắt đầu nhé.

Lest't go

# 1. Get a Mac
Nếu bạn thực sự đã quen với hệ điều hành Windows và nghĩ rằng sẽ tốt hơn nếu sử dụng HĐH mà bạn đã quen (ban đầu mình cũng nghĩ như vậy), tuy nhiên thực tế điều này hoàn toàn chưa chính xác - macOS chắc chắn là cách tốt để phát triển React Native.
Có hai lý do chính cho việc này:
- Nó cho phép bạn xây dựng ứng dụng iOS (Chỉ máy MAC ms lập trình đc IOS, mình k tính trường hợp các bạn cài hackintosh). Không phải ngẫu nhiên mà tất cả các hướng dẫn đều cho rằng bạn sử dụng máy Mac - nếu bạn muốn phát triển đa nền tảng, sớm muộn gì bạn cũng cần có máy Mac.
- Hiệu suất ổn định. React Native bắt đầu như một thứ iOS ngay lập tức và điều đó cho thấy. Máy ảo (simulator), quá trình build (build process), các tính năng live/hot, reload, gỡ lỗi JS (remote JS debugging) - tất cả đều hoạt động tuyệt vời trên macOS. Trên Windows, npm, React Native và thậm chí dòng lệnh Windows đều là có lỗi.
- Quy trình làm việc (workflow) có thể xử lý tối đa 3 hoặc 4 trình giả lập (máy ảo emulators) iOS / Android khác nhau mở cùng một lúc.

# 2. Make the IDE Do the Work for You
Hãy để IDE làm việc cho bạn, những việc thực sự cần thiết để đạt hiệu quả thực sự. 
- Mỗi IDE đi kèm với một số tính năng định dạng và bạn có thể nghĩ rằng như vậy là đủ. Nhưng ngày nay IDE đã trở nên thông minh hơn, và còn hơn thế nữa.
Mã thụt lề (Indenting code), loại bỏ các biến (variables), sắp xếp import, chuyển đổi dấu ngoặc kép và mọi thứ khác làm cho code của bạn sạch hơn và nhất quán hơn, tất cả đều có thể được thực hiện bởi IDE của bạn và nên để IDE của bạn được thực hiện các việc đó.
Ngoài ra, các bạn có thể kết hợp IDE + 1 số Extentions. Ví dụ: Eslints. 
Các bạn có thể tham khảo thêm [tại đây](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)

# 3. Snippet Everything
Bạn có thấy mình viết thủ công <View> </ View> hoặc <Text> </ Text> quá thường xuyên không? Hãy biến chúng thành một ***snippet***. Và hoàn toàn bạn có thể tự tạo cho mình 1 style áp dụng cho view mà bạn vừa tạo. 

![](https://images.viblo.asia/c9a8f070-e94e-4a30-ada9-f8339b1c42a8.gif)

Mình đã tạo 1 số snippet theo thói quen, hay đơn giản là bắt buồn từ cảm hứng của mình khi code. Chỉ cần định danh các ký tự mà bạn hiểu của riêng bạn hoặc có thể theo 1 chuẩn quy tắc nào đó, miễn sao, nó khiến bạn trở lên nhanh hơn, gọn hơn khi code là được :D

![](https://images.viblo.asia/30813e7b-0019-4402-a623-f1c9eaaed662.gif)

# 4. Twice the Windows, Twice the Speed?
Chia đôi màn hình, gấp đôi speed :D. Liệu có thực sự đạt được hiệu quả.
Chắc chắn không hẳn là vậy, tuy nhiên sẽ rất hữu ích. Ví dụ: 

Trường hợp cứ khi nào bạn thấy mình mở đi mở lại, hoặc tab qua tab lại *hai tập tin giống nhau* hết lần này đến lần khác chưa, nếu có thì hãy tạo thói quen chia đôi cửa sổ đó thành hai nhé.
![](https://images.viblo.asia/60160bc6-c80c-4da2-833d-d10ec5333734.png)

Nghe có vẻ hơi khó hiểu hoặc áp đặt, nhưng, đặc biệt là nếu bạn đã đạt đến trình độ nhất định , thì đó là cách tốt để đạt hiệu quả code.

Tiếp nữa, bạn hãy trở nên thân thiện với các phím nóng (hotkeys) của bạn , để hướng tới việc biến điều này thành thói quen. Hãy tìm và liên kết các hotkets trên IDE phù hợp nhất với bạn nhé. 
Ví dụ: Với mình hay có thói quen code Android từ ngày xưa là code Android bằng IDE là Esclipse, và mình cũng đã quen với hầu hết các phím tắt, phím nóng của Esclipse, và khi chuyển sang code Android bằng Android Studio, hay là code React Native bằng Visual Code thì việc đầu tiên của mình đó là thiết lập keymap của IDE là Esclipse. Nó là một trải nghiệm thoải mái hơn nhiều và cũng sẽ giúp bạn tiết kiệm thời gian.

# 5. Use Hot Reloading. Wisely
Sử dụng tính năng "Hot reloading" một cách khôn ngoan.

Khi làm việc với React Native, bạn sẽ thấy 1 tính năng cực kỳ thú vị đó là ***"Hot reloading"***. Đó là một "hottest" implementations khi nói đến việc previewing code change.
Hiện tại, có hơn 130 issue liên quan đến "hot reloading" trên repo React Native, và vì lý do chính đáng - hot reloading vẫn rất mong manh và yếu ớt ^^.

Lý do nó bị crash thường khá khó phát hiện (detect), nhưng mình đã nhận thấy rằng hầu hết nó không phải là **"bad code"**, mà là simply code, có thể coi nó không hấp dẫn 1 chút thôi.
Ví dụ: sau vài giờ debugging, tôi nhận ra rằng việc thay đổi mã của mình từ:
```javascript
componentDidMount = async () => {}
```
thành
```javascript
async componentDidMount() {}
```
và  hot reloading lại làm việc trở lại bình thường.

Tất nhiên, nó không phải lúc nào cũng là chức năng đi đầu, nó thay đổi từ codebase sang codebase. Nhưng mẹo để làm cho nó hoạt động liên tục đó là chú ý đến đoạn code nào là code khiến cho nó bị crash, và sau đó tái cấu trúc (refactoring) nó thành một phiên bản đơn giản hơn.
Đừng dành thời gian cần thiết để keep hot reloading trong trạng thái làm việc. Nó giúp ích rất nhiều cho việc tạo UI nhanh hơn và, cũng là một công cụ mạnh mẽ để debugging cả UI và business logic.

# 6. Use Hot Reloading. Smartly
Sử dụng tính năng "Hot reloading" một cách thông minh.

Một trong những điều chính mà mọi người phàn nàn khi chuyển từ Web sang React Native là hệ thống bố cục (layout system) của nó - chủ yếu là thiếu giao diện người dùng thích hợp / hữu ích của "Inspect" UI , cho phép bạn kiểm tra trực quan kích thước (size), hình dạng (shape) và đường viền (boder) của các elements.
Hot reloading, ngoài việc đóng góp trong quá trình phát triển nhanh hơn, hiệu quả hơn, hóa ra cũng là một công cụ kiểm tra element thực sự hữu ích.
Ví dụ dưới dây:
![](https://images.viblo.asia/76f7d543-5acb-4a88-b721-1b9e5f2ec9b8.gif)

Kết hợp sức mạnh của "hot reloading" với một "quick snippet", bạn có thể nhận được chính xác những gì bạn cần trong chưa đầy một giây. Tất cả mà không cần rời khỏi IDE của bạn.

Tạo một snippet để tạo viền màu đỏ, sử dụng nó bên trong bất kỳ elements nào, nhấn CMD + S và xem phần tử của bạn được hiển thị trên màn hình ngay lập tức. Sau đó, bạn có thể điều chỉnh hoặc nâng cao style theo ý thích. Điều này có vẻ đơn giản và hạn chế, nhưng trong thực tế hóa ra chỉ là những gì bạn cần 90% thời gian.

Phương pháp này cũng có nghĩa là bạn không cần phải mở kiểm tra (open inspect) các popup và menu, và phá vỡ quy trình coding workflow của bạn. Hãy debug khi bạn thực hiện thủ thuật đơn giản này nhé. 

Một mẹo thậm chí hữu ích hơn khi sử dụng "hot reloading" là khả năng kiểm tra giá trị của bất kỳ biến (variables) nào từ frame hiện tại.

Ví dụ như sau:
![](https://images.viblo.asia/7b1e2939-7b88-4fe6-834e-9d308815e2db.png)

Mình đã tạo ra màn hình Stats Player này, mục đích là hiển thị số liệu thống kê của một người chơi. Nhưng có vẻ như một cái gì đó đang gây lỗi và không hiển thị được thông tin.
Đây là code mình làm: 
```JavaScript
<View>
 {stats.map(stat => 
   <Stat {...stat} />
 )}
</View>
...
export const Stat = ({ value = '-', name }) => ...
```
Trong ảnh chụp màn hình ở trên, các bạn có thể thấy giá trị chỉ số luôn luôn là ký tự ngạch ngang này "-". Điều này chỉ ra rằng cấu trúc biến số *stat* không hoàn toàn đúng, vì vậy chúng ta cần kiểm tra nó.

Một cách để kiểm tra dữ liệu trong React Native là bạn kích hoạt trình gỡ lỗi hay đơn giản đó là chúng ta sẽ debug, đặt break point đến điểm bạn nghi ngờ dữ liệu đang chưa đúng, reload app, điều hướng trong ứng dụng của bạn đến màn hình và sau đó kiểm tra dữ liệu nhận được của bạn.

Các bạn có thể làm điều này dễ dàng hơn nếu bạn in thông tin giá trị của biến ra màn hình console để kiểm tra, tức là chúng ta sẽ đặt ***log*** nhé , điều hướng đến màn hình này và sau đó kiểm tra dữ liệu đã ghi.

NHƯNG, hot reloading sẽ cho phép chúng ta tiến thêm một bước:
```JavaScript
<View>
  {stats.map(stat => 
    <Stat dog={console.log(stat)} {...stat} />
  )}
</View>
```

Việc gán console.log (stat) cho một thuộc tính hoàn toàn tùy ý  (trong trường hợp này là dog - một chuỗi ngẫu nhiên mà mình thấy tiện dụng, các bạn đặt tên thế nào cũng được nhé) và sau đó lưu để kích hoạt hot reloading, nó sẽ đánh giá toàn bộ chức năng render cùng với thuộc tính *dog* mà mình vừa tạo.

![](https://images.viblo.asia/b5ddbc55-d17c-4e12-915b-b30451e1b18e.png)

Như vậy, đã có dữ liệu. Không reload, không inspect, không kết nối với trình gỡ lỗi từ xa; phương pháp này sẽ giúp cho các bạn dữ liệu ngay lập tức.

Và ở ví dụ trên, bây giờ chúng ta có thể thấy rằng chúng ta thực sự cần phải truyền là *stat.content* chứ không phải *stat*, vì dữ liệu của chúng ta được lồng trong *content*.

# Conclusion
Trên đây là những tip nhỏ mà mình đã và đang sử dụng trong quá trình làm việc với react native. Không chỉ riêng một ngôn ngữ nào, các bạn hãy tạo cho chính mình 1 thói quen trước khi làm việc với công việc lập trình, để đạt hiệu quả tốt nhất trong việc code, bất kể là ngôn ngữ nào nhé. Hy vọng các mẹo trên sẽ giúp ích cho các bạn khi làm việc vs React native thật nhanh, thật hiệu quả. 

Thanks for reading!

Tài liệu tham khảo
https://medium.com/better-programming/7-tips-for-maximum-coding-efficiency-in-react-native-ec36adc97937