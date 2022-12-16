![](https://images.viblo.asia/df5abfc1-a493-4635-b335-2507d2d872ab.jpeg)
Nguồn ảnh: bởi Jantine Doornbos trên Unsplash

-----


Một lập trình viên có tài là một người có thể làm cho người khác hiểu được code của mình theo cách của họ, thậm chí là khái niệm Wormholes cũng có thể được giải thích chỉ bằng một tờ giấy và một chiếc bút chì găm trên đó. Vậy thì điều khác biệt ở đây là gì? Là một iOS developer mình luôn cố gắng làm code của mình dễ đọc và hiểu nhất có thể, bắt đầu từ việc đặt tên biến và function rõ ràng hay tuân theo convention cụ thể. Tuy nhiên, mình luôn cảm thấy mình vẫn đang thiếu mất điều gì đó, có vẻ như mình đang chú trọng vào việc cố gắng làm nó "đơn giản" mà chưa để ý đến việc thể hiện ra "làm sao" mà nó có thể hoạt động như vậy. 

## Đặt Vấn đề

Chắc hẳn bạn đã từng cảm thấy khó hiểu khi đọc code của một developer khác. Nếu không được giải thích về ngoại cảnh trước đó thì bạn rất dễ "bị lạc" giữa một mớ các dòng code cùng ý nghĩa của mỗi property và function.

Chúng ta đều nhận ra rằng hầu hết các loại ngôn ngữ lập trình đang càng ngày được đơn giản hoá để trở nên gần gũi hơn với developer và nhất là với những người mới bước vào lập trình. Các Syntax bằng tiếng anh trở nên đơn giản, dễ hiểu và dễ đọc hơn trước rất nhiều. Khi nhìn một đoạn code được viết cẩn thận, người đọc có thể hiểu rõ mục đích của đoạn code kể cả khi không biết trước về ngữ cảnh mà đoạn code được viết nên. Vậy chúng ta hãy cùng tìm hiểu một số cách đơn giản để làm chương trình của chúng ta đơn giản và dễ hiểu hơn.

## Đặt tên các function rõ ràng và thể hiện được chức năng của nó

Khi tạo ra một function mới, chúng ta mặc nhiên là người đọc đã hiểu được ngoại cảnh và lí do tạo ra nó, sau đó cho nó một cái tên chung chung như là "handleRedView()", khi có người khác nhìn vào function này họ có thể sẽ thắc mắc rằng từ "RedView" này đại diện cho cái gì? Ý nghĩa của cái funtion này để làm gì? Ý muốn "handle" là như thế nào? Có thể rút ra kết luận rằng trong một vài trường hợp mục đích của function vẫn còn khá là chung chung nếu người đọc không biết trước về ngoại cảnh của nó.

Chúng ta có thể xếp các function thành 4 loại:

        1. Informer functions
        2. Mangement functions
        3. Router functions
        4. Execution functions
        

### 1. Informer function (function mang tính thông báo)

Informer function thường được dùng làm tiền đề cho Router hoặc Management functions:

```
// Informer Functions
override func engineStarted()
{
 super.engineStarted()
 handleCarStarted()
}
```

Informer function sẽ call back function và thông báo về sự việc xảy đến để bạn đưa ra phương pháp xử lí phù hợp. Chủ yếu kiểu function này được dùng để xử lí delegate trigged action hoặc xử lí với notification.

### 2. Management function (function quản lí)

Thường được dùng để tổng hợp các function khác để nhằm tới một múc đích chung mà không cần dependency, mọi dòng code bên trong đều sẽ execute.

```
// Management Function
func handleCarStarted()
{
   turnLights(on: true)
   turnAC(on: true
}
```

Xem qua đoạn code trên chúng ta có thể dễ dàng hiểu bên trong Management funtion hoạt động như thế nào rồi.

### 3. Router function 

Mục đích của Router về cơ bản giống như Management function nhưng sẽ đi cùng một hoặc một số dependency, code bên trong chỉ execute khi cần thiết:

```
// Router Function
private func turnLights(on shouldTurnLightsOn: Bool)
{
  if shouldTurnLightsOn
  {
    turnExteriorLightsOn()
    checkForBurnedBulbs()
  }
  else { turnExteriorLightsOff() }
  // When an if statment has only 1 thing to execute i like to write it
  // at the same line with the "if" "else" word, it makes reading your code more fluent.
}
```

### 4. Execution fuction

ví dụ: 

```
// Execution Functions
  private func turnExteriorLightsOn()
  {
    leftFrontLight .isOn = true
    rightFrontLight.isOn = true
    leftBackLight  .isOn = true
    rightBackLight .isOn = true
  }
  private func checkForBurnedBulbs()
  {
     for lightBulb in bulbs where !lightBulb.isUseable
     {
       Dashborad.display(errorType: .lights)
       break
     } 
  }
```

Bản thân cái tên của execution function đã phải thể hiện rõ function này để làm gì. Hiểu rõ được mục đích của execution function sẽ giúp việc tìm bugs sau này dễ dàng hơn rất nhiều, ngoài ra nó còn rất có lợi nếu sau này chúng ta muốn sửa đổi, thay thế, hoặc thêm chức năng cho nó.

Sau khi đã phân định rõ các loại function, chúng ta phải sắp xếp chúng một cách hợp lí. Informer, management và router 
có thể viết trong class chính của bạn, sau đó tất cả các execution/logic function khác sẽ được sắp xếp vào các extension ở cùng hoặc khác file. Và kết quả là bạn đã có một cấu trúc các funtion ngắn gọn và rõ ràng, dễ dàng bảo trì và sửa chữa.

Một điều nữa mà chúng ta phải lưu ý đó là, mỗi function chỉ nên đảm nhiệm một chức năng nhất định, 
trách dùng "and" trong tên của function: prepareAndPlay(), saveAndClose(),.. 
ngoài ra không nên đưa những từ mang tính chất không chắc chắn, không rõ ràng vào tên function: handleRedViewIfNeeded(), triggerButtonIfNeeded(),..

trong một số trường hợp bạn sẽ muốn đặt tên button của mình là onClickButton hay selectedButton,.. đôi khi điều này sẽ gây khó hiểu cho người đọc. Một lời khuyên là chúng ta nên đặt tên cho Button theo chức năng của nó như là: toNextViewTrigger hay openToolBarTrigger,.. Tương tự như thế, các loại view khác như Label hay Textfied cũng nên có một cái tên đại diện cho chức năng hoặc thứ mà nó biểu diễn.

Trên đây là một số cách đơn giản để làm code trong app của chúng ta dễ hiểu hơn, điều này không những giúp chúng ta làm việc nhóm hiệu quả hơn mà còn giúp cho khách hàng có thiện cảm với code của mình nhất là khi họ cũng hiểu biết về ngôn ngữ lập trình.

Cảm ơn mọi người đã đọc hết bài chia sẻ của em/mình,
Nếu như bạn/anh/chị/em nào có những cách tương tự thì hãy chia sẻ cho em/mình và mọi người cùng tham khảo ở dưới phần cmt nhé!

Bài viết này được tham khảo từ [Medium](https://medium.com/ios-os-x-development/making-your-ios-application-easy-to-read-with-these-simple-steps-b63067900b72)