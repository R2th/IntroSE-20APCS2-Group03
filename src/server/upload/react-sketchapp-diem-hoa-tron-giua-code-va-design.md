![](https://images.viblo.asia/406c04fd-4229-49d7-b2cd-22c11f7cf203.png)

### 1. Điểm mở đầu
Dù mới tìm đọc được về những dòng đầu tiên về package này của Airbnb nhưng mình cảm thấy rất hào hứng vì đây sẽ làm một công cụ thay đổi workflow của Frontend development, khi developers và designers hoàn toàn có thể có tiếng nói chung.

Bản chất của [Sketchapp](https://www.sketchapp.com/) là một phần mềm có thể lập trình (scriptable), việc này giảm thiểu rất nhiều các thao tác thủ công lặp đi lặp lại của một designer khi thiết kế một dự án lớn cũng như các lỗi có thể tiềm ẩn trong các thao tác này (copy-paste, reproduce components/symbols, thay đổi articles để lên mockups hoàn hảo.v.v..). Bản thân Sketchapp và các plugins được viết cho app này cũng trợ giúp rất nhiều cho các designer: cắt bớt thời gian, mang đến cảm giác thoải mái về workflow... tuy nhiên, chúng chưa đủ mạnh mẽ và theo kịp mong muốn của Frontend dev.

Dưới những gì Airbnb gặp phải, khi design systems có thể lên đến 200+ components lớn nhỏ, nested; với 100 designers và gần 1000 engineers cùng làm việc thì việc thay đổi design systems có thể dễ dàng bị bất đồng bộ với specs/implementations. Bỗng nhiên việc cỏn con này làm giảm giá trị của thiết kế trong dự án và gây ra quãng chờ không đáng có. Hãy tưởng tượng product đã lên form và cần có sự thay đổi, dev sẽ chờ thiết kế update (và thường việc này sẽ không... nhanh) trong khi dev team hoàn toàn có thể implement những cái này trên code và generate lại view (cược là việc này sẽ diễn ra nhanh hơn)

Airbnb đã cân nhắc để có thể đưa ra quyết định đồng bộ việc này với code, và sử dụng code làm **Source of truth** duy nhất. Họ tìm cách tạo ra các React Components và render chúng ra Sketchapp. Một ý tưởng tuyệt vời!

Và từ đó, [**React Sketch.app**](http://airbnb.io/react-sketchapp/) ra đời.

### 2. Vision của **React Sketch.app**

Airbnb cho rằng việc giải quyết các vấn đề nội bộ của họ chỉ là điểm mở đầu cho **React Sketch.app**. Sketch chỉ là MỘT trong các target có thể render.

Theo Joe Gold, tác giả của package này thì mong muốn của ông là có thể render ở bất cứ đâu và bất kể input/output là gì.

Hãy xem công nghệ [AI của Airbnb](https://twitter.com/Airbnbdesign/status/922970398169350144?ref_src=twsrc%5Etfw) render hand-drawn sketch thành code.

![](https://images.viblo.asia/a1d5de42-9523-4bca-b7cd-aa5ce2750451.png)

Một ví dụ khác của hãng này sử dụng ngôn ngữ [Markdown render thành code](https://jon.gold/2017/08/dragging-rectangles/)

![](https://images.viblo.asia/e260b452-1283-4245-9bab-d629362347f5.png)

Các ví dụ này cũng tương tự như chọn Sketch làm output của việc render React Component, ngược lại API của Sketchapp được base trên CocaScript, tất nhiên là nó khó tiếp cận hơn React với đại bộ phận các Frontend dev. Đó là lý giải React và Sketchapp là sự  kết hợp tốt nhất vào lúc này.

Vậy bức tranh toàn cảnh của **React Sketch.app** có thể được khái quát:

![](https://images.viblo.asia/67390d85-1f97-45ea-961c-fa6dc60b9887.png)

Khi việc sử dụng React Components là **trung tâm** của bức tranh, ta có nhiều lựa chọn hơn trong công cụ phù hợp với workflow của chúng ta.

### 3. Design với Components

Nếu bạn hiểu concept Components trong React thì việc áp dụng vào thiết kế dễ dàng hơn rất nhiều. Đó là một sự kết hợp mạnh mẽ và đầy cơ hội. Hãy đánh giá cụ thể những điểm mạnh yếu của nó:

#### Điểm mạnh:
- Quản lý được design systems, đặc biệt là những project lớn
- Sử dụng những component đã được hình thành trong React vào thiết kế trong Sketchapp
- Làm việc trực tiếp với data thực tế: No more fake data.
- Đồng bộ là yếu tố tạo sự khác biệt.
- Một cách làm việc hoàn toàn mới khi có thể sử dụng Sketchapp làm canvas và thiết kế với...code.

#### Điểm yếu
- Flow mới mẻ, cần thay đổi mindset và cách vận hành
- Đòi hỏi chuyên môn cao của người phát triển (... Frontend Devs và Designers giờ là một?)
- Package còn đang phát triển và còn nhiều việc phải làm.

### 4. Tạm kết

Chỉ là những tìm hiểu ban đầu về **React Sketch.app** nhưng mình đánh giá cơ hội của package này là rất lớn.

React Sketch.app rất phù hợp với một developer muốn làm chủ và linh hoạt trong thiết kế. Khá thử thách với một designer khi sẽ cần hiểu code và đặc biệt là React để làm chủ thiết kế của mình. Đó sẽ là một tool đáng để chú tâm để đầu tư, hứa hẹn một workflow hoàn toàn mới mẻ, chặt chẽ và nhanh chóng!!!

Kì sau chúng ta hãy bắt đầu cài đặt và 'nhúng' React Sketch.app vào project, tiếp đó đánh giá những thay đổi nó mang lại trong workflow của một Dev/Designer nhé. Mình tin điểm hòa trộn sẽ diễn ra ở đây. Hẹn gặp lại các bạn!

### 5. References
- [Phỏng vấn cha đẻ của React Sketch.app](https://medium.com/sketch-app-sources/react-sketch-app-backstory-and-full-vision-39861c4c0549)
- [React Sketch.app document](http://airbnb.io/react-sketchapp/)