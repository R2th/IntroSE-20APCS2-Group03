Khi nhắc tới layout, có thể nói **Flex** đã làm rất tốt nhiệm vụ của nó. Nhưng đôi khi việc cố gắng để hiểu những thuật ngữ như: *main-axis*, *cross-axis*, *justifyContent*, *alignItems* và nhiều thứ khác có thể khá mơ hồ hoặc đơn giản là dễ nhầm lẫn.

Có hàng tá những thứ như cheatsheets, hay tips tricks, hướng dẫn có thể tìm thấy, nhưng ai mà cần nhớ tất cả chúng chứ?!

Nên hôm nay tôi muốn giới thiệu một [UI Library](https://github.com/wix/react-native-ui-lib) layout modifiers.

Thông thường để tạo nên 1 View với các items bên trong được sắp xếp theo 1 hàng, bạn thường áp dụng kiểu như sau:

```
<View style={{flexDirection: ‘row’}}>
  <Text>top</Text>
  <Text>middle</Text>
  <Text>bottom</Text>
</View>
```
Sẽ dễ dàng hàng khi chỉ đánh dấu View đó với một prop, giống như thế này:
```
<View row>
  <Text>left</Text>
  <Text>middle</Text>
  <Text>right</Text>
</View>
```
Props *row* được thêm vào chỉ đơn giản thay đổi hướng hiển thị của View từ mặc định (column) sang *row* giống như các thông thường nhưng ngắn gọn hơn và bạn không cần phải nhớ đến thuộc tính *flexDirection*.

## A bit to the left
Cho đến đây, bạn đã quên hoàn toàn khái niệm về trục nào là trục chính hay *justifyContent* hoặc *alignItems* sẽ ảnh hướng thế nào đến layout ứng dụng của bạn.

Thay vì chơi trò chơi đoán thử, khi bạn cố thử tất cả những cách kết hợp khác nhau cho đến khi bạn tìm ra một thứ phù hợp, chỉ cần sử dụng các props được cung cấp trong thư viện: *left, top, right, bottom*.

Tôi gần như chắc chắn 100% ý của mọi người khi đề cập đến *left* như là bên trái của màn hình, *top* là phía trên của màn hình, hay *right*, *bottom* cũng thế .... không còn những cái tên khó hiểu nữa.

Vì thế, nếu tôi muốn sắp xếp nội dung View xuống phía dưới cùng chẳng hạn, tôi sẽ làm một việc như sau:
```
<View flex bottom>
  <Text text10>Bottom</Text>
</View>
```
![](https://images.viblo.asia/0f055e79-23bf-40d2-9f42-63be83f10410.png)

Kết hợp thêm prop *right* để có được vị trí dưới cùng bên phải của màn hình:
```
<View flex bottom right>
  <Text text10>Bottom</Text>
</View>
```
![](https://images.viblo.asia/c2a44196-de1b-44c3-a93d-454244666b91.png)

Rất đơn giản phải không. Và bạn có thể đoán phần còn lại sẽ hoạt động như thế nào.

## Center of Attention
Một trường hợp phổ biến khác là khi chúng ta cần căn giữa mọi thứ trong một *chiếc hộp lớn*, thông thường chúng ta sẽ làm một cái gì đó như thế này:

```
<View flex style={{justifyContent: 'center', alignItems: 'center'}}>
  <Text>Content</Text>
<View>
```
Nó khá là dễ dàng, không cần phải nhớ bất kỳ quy tắc nào, chỉ cần đặt mọi thứ vào trung tâm và nó sẽ hoạt động, nhưng...

Sẽ thế nào nếu chúng ta chỉ muốn căn giữa nội dụng theo chiều ngang?

OK, tôi có thể giải thích những gì diễn ra ở đâu và làm thế nào để xử lý một cách đẹp đẽ, nhưng tôi sẽ chỉ đưa cho bạn 3 props sau: *center*, *centerH*, *centerV*.

Tôi cược rằng tên của chúng đã ngụ ý về mục đích của chúng, nhưng dù sao tôi cũng sẽ giải thích.

Như trước đó, bạn không cần thực sự quan tâm đến trục và hướng, *center* sẽ tập trung hoàn toàn nội dung vào chính giữa View, *centerH* và *centerV* đơn giản sẽ căn giữa nội dung theo chiều ngang (Horizontal) và chiều dọc (Vertical)

Vì vậy, một vài dòng code tiếp theo
```
<View flex center>
  <Text text10>Center of Attention</Text>
</View>`
```
sẽ cho chúng ta kết quá như bên dưới:

![](https://images.viblo.asia/3e6b2cb8-4c8b-4df1-a19a-b3c40f7fc7b0.png)

## Flex
Một sửa đổi quan trọng khác là cần thiết khi tôi muốn căn chỉnh nội dung là *Flex*

Cuối cùng, tất cả các quy tắc căn cứ dựa trên *flex-box* và nếu chúng ta muốn căn chỉnh một vài dòng text vào chính giữa của View, trước tiên chúng ta cần chắc chắn rằng View được kéo dãn trên toàn bộ màn hình (hoặc không gian hiển thị app).

## Where do we go from here?

Đây là một cách tuyệt vời để nhanh chóng xây dựng layout màn hình mà không cần xứ lý hay biết đến những quy tắc cơ bản của flex-box. Nó sẽ giúp bạn tiết kiệm thời gian và những style objects không cần thết mà bạn thậm chí không chắc chắn phải gọi tên chúng như thế nào.

Có thể nói rằng, cá nhân tôi sẽ không lạm dụng nó. Quá nhiều công cụ sửa đổi có thể làm ảnh hưởng đến khả năng đọc code của bạn và có thể khó để bảo trì. Khi một hành vi cụ thể là duy nhất đủ hoặc lặp đi lặp lại, một style object có thể là một giải pháp tốt.

## What's next?
Không chỉ giúp việc xây dựng layout đơn giản hơn, UI lib còn cung cấp nhiều component khác hỗ trợ việc xây dụng ứng dụng react native.

Bạn có thể tham khảo tại [UI-Lib repo](https://github.com/wix/react-native-ui-lib)