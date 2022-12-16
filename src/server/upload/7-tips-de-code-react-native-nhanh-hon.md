React Native khá là tuyệt vời. Nó cho phép tạo ra các ứng dụng đa nền tảng khá đẹp mắt. Việc áp dụng chúng thì không ngừng tăng lên và hay được áp dụng với start up.
Trọng tâm chính của bài này, tôi muốn chia sẻ về hiệu suất, khả năng mở rộng và so sánh nó với các tùy chọn khác.

Tôi là fan của tốc độ và tôi muốn chúng sử dụng công nghệ tuyệt vời này một cách nhanh chóng như thế nào.

Vì vậy, sau 2 năm làm việc với React Native, tôi quyết định sưu tập và chia sẻ 7 tips giúp tôi và giúp bạn có thể tối ưu tốc độ code React Native.

# 1. Sử dụng máy Mac
Khi phát triển dự án React Native, tôi chắc chắn rằng bạn cần một chiếc máy Mac,  mặc dù bạn đã rất quen với Windows .

Có hai lí do chính cho việc này: 

1. Điều này rõ ràng, bởi nó cho phép xây dựng ứng dụng trên IOS. Không phải ngẫu nhiên tất cả hướng dẫn đều cho rằng bạn nên sử dụng máy Mac - nếu bạn muốn phát triển đa nền tảng, sớm hay muộn, bạn sẽ cần máy Mac.
2. Hiệu suất chung và ổn định. React Native bắt đầu trên ios, từ buid, hot reload, debugging hoạt động rất tốt và ổn đinh. Tuy nhiên, trên windows, npm, React native , thậm chí là dòng lệnh đều không ổn.

Quá trình phát triển React native nhanh ít nhất gấp đôi trên macOS, vì vậy để có bắt đầu tốt nhất, hãy đảm bảo bạn là (hoặc sẽ) là người dùng OS.

# 2. Sử dụng máy Mac tốt 
React Native là một trong những công nghệ có thể phát triển cao từ resource cho phép và thực sự lợi ích từ nó. Trong quá trình sử dụng, đôi khi có lúc phải mở 3 hoặc 4 máy ảo android/ios cùng một lúc.

Càng nhiều, càng tốt, có thể xem rõ được hoạt động, hiển t  trên từng loại máy cùng lúc,  giúp tiết kiệm thời gian build, fix bug nhanh hơn.

Ngoài ra, việc sử dung Ctrl +S trong lúc code giúp theo dõi thay đổi ngay lập tức.
Tuy nhiên, nếu sử dụng trên một con máy cũ và hoạt động kém, thì thực sự rất khó, chỉ cần bật quá nhiều máy ảo, thao tác quá nhiều, máy sẽ bị treo.

Vậy nên, đầu tư một con máy Mac tốt là lựa chọn tốt nhất.

# 3. Làm cho IDE linh hoạt theo ý mình
Mỗi một IDE đi kèm một số loại tính năng định dạng và bạn nghĩ như thế là đủ.
Nhưng ngày này, IDE lại càng ngày thông minh hơn.

Format code, xoá biến không cần thiết, sắp xếp import, chuyển đổi dấu ngoặc, warn... tất cả làm cho code của bạn đẹp và clear hơn, đến nỗi có thể không nhớ lần cuối cùng mình sửa dụng phím tab =)) .

Echobind có một bài viết rất hay về quy tắc [Prettier + Eslint + airbnb tích hợp trong VS code](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a).


Nó tác động khá lớn trong thời gian bạn code, suggest cho bạn làm việc nhanh hơn, tiện hơn, chuyên nghiệp hơn, không thể sống mà thiếu nó, tôi dùng format key cho việc save key đó.

# 4. Viết tóm lược mọi thức
Bạn có thấy mình viết thủ công `<View></View>` hay `<Text></Tex>` lặp lại khá nhiều lần? Hãy biến chúng thành một đoạn.

Không chỉ dừng lại ở đó, chúng ta có thể apply style của view bằng cách như trên.
Hãy thử làm như thế, xác định số lần lặp lại và thay thế chúng bằng những đoạn nhỏ, dần dần tạo ra thói quen và làm việc nhanh hơn.

Trong bài viết, đây là hơn [25 snippets ](https://pastebin.com/9zJRdHLs) sử dụng trong việc phát triển dự áp React Native mà bạn có thể tham khảo. 

![](https://images.viblo.asia/e95aae7c-4711-488a-8937-3765cf8d0e9b.gif)

 ![](https://images.viblo.asia/d712d3fd-ce38-453a-8cb7-5a0bc502b62f.gif)

Hãy thử tạo chúng và sử dụng IDE như theo ý mình, cảm giác trông sẽ chuyên nghiệp và hiệu quả hơn rất nhiều.

# 5. Gấp đôi màn hình,gấp đôi tốc độ ?
Tuy không hoàn toàn, nhưng thực sự rất hữu ích.

Bất cứ khi nào bạn thấy mình tung hứng qua hai tập tin giống nhau hết lần này đến lần khác, hãy tạo thói quen chia đôi cửa sổ đó thành hai.

Phần này xin đưa ra quan điểm từ cá nhân tôi một chút.

Phải công nhận, có rất nhiều case mà việc sử dụng xem 2 màn song song rất hữu ích, như trường hợp add language ja và en chẳng hạn, giúp ích rất nhiều cho việc xem sự khác nhau: 

![](https://images.viblo.asia/0fd9ce95-cd5a-4ac5-b7de-a7bc7689b44d.png)


Việc sử dụng các phím tắt trong việc sử dụng IDE nên trở thành một thói quen để bạn làm việc hiểu quả, nhanh hơn kiểu như: open 1 tab mới (Ctrl+N) , open file (Ctrl+P), ... giúp làm việc nhanh hơn là phải tìm các button về chúng trên menu.

# 6. Sử dụng Hot reloading
Điều đầu tiên, sử dụng các này trong việc create UI, tôi cảm thấy rất thích :D, rất nhanh, chỉ một chút thay đổi của mình, màn UI đó ngay lập tức được render lại mà không cần mất công Ctrl+R và đi tới lại màn hình tôi muốn check.

Tuy nhiên thì cái gì cũng có mặt hạn chế, đôi khi trong lúc đang code logic, có một thay đổi nhỏ ở dòng code cũng làm nó reload lại, lúc đó lại cảm thấy khá bất tiện,

Vậy nên đừng quá lạm dùng hot reloading, tôi nghĩ nó nên dành tốt nhất cho việc create UI hơn, còn không cần dùng thì nên disable chúng.

# 7. Sử dụng hot reloading một cách thông minh hơn
Như đã nói ở trên, thế mạnh cái này rất tốt trong việc create UI, cho phép kiểm tra trực quan hình dạng, border,... của element.

Hot reloading ngoài việc đóng góp phát triển nhanh hơn, hiệu quả hơn, nó cũng là công cụ kiểm tra element hữu ích.
![](https://images.viblo.asia/f30b102e-cad7-49a4-a9a6-b29cde275591.gif)

Như trên video, bạn không cần reload lại toàn app, mà những gì bạn edit bên IDE sẽ update luôn bên simulator giúp việc xem, check UI hiệu quả, thực sự nhanh chóng.

Một mẹo khác là trong khi sử dụng hot reloading có khả năng kiểm tra giá trị của biến đó ngay hiện tại :

Đây là một đoạn code view giá trị ở stat
```
<View>
 {stats.map(stat => 
   <Stat {...stat} />
 )}
</View>
...
export const Stat = ({ value = '-', name }) => ...
```
Ta có thể code dạng: 
```
<View>
  {stats.map(stat => 
    <Stat dog={console.log(stat)} {...stat} />
  )}
</View>
```
Lúc này giá trị từ stat sẽ hiển thị ngay trên view để thấy kiểu ví dụ: 

![](https://images.viblo.asia/ca8dc611-695a-468b-ba8d-bd6e6ea0cabb.png)

Thế là có dữ liệu mà không cần reload, không cần debug, không inspects.

Vì vậy, hãy sử dụng hot reloading khi lúc nào bạn cần thiết để giải quyết nhanh vấn đề.

Trên đây, bài dịch của mình từ nguồn: https://medium.com/better-programming/7-tips-for-maximum-coding-efficiency-in-react-native-ec36adc97937

Tuy nhiên có chút chỉnh sửa và thêm một chút ý kiến cá nhân.
Hãy tham khảo và làm cho công việc code trở nên dễ dàng, nhanh chóng hơn nhé!
Happy coding!