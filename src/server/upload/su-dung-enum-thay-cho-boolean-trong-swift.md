Cũng lâu lâu về trước mình đọc được một bài nói về việc sử dụng two-cased enum trong Swift, thấy hay nên mình cũng làm theo thử. Hiện giờ dùng được một thời gian mình thấy nó có ích, nên quyết định dịch lại để chia sẻ cho các bạn, nhất là các bạn ngại đọc tiếng anh.

**Ý tưởng thì là như sau:**

**Thay vì dùng boolean (true/false) thì các bạn tạo 1 enum với 2 case, và coi như 2 case đấy ứng với 2 trạng thái true/false luôn.**

**Việc này nhằm mục đích gì?** Đó là để tăng readablity  - độ dễ đọc cho code của bạn. Hầu hết các trường hợp dùng two-cased enum sẽ giúp code của bạn dễ dọc hơn. Và bởi vì chúng ta thường đọc code nhiều hơn là viết code, nên chỉ cần code dễ đọc hơn một chút là cuộc đời chúng ta đã vui hơn rồi.

**Ví dụ:**

```swift
// old
var isUserCorrect: Bool
isUserCorrect = true

// new
enum AnswerState {
    case correct
    case wrong
}

var answerState: AnswerState
answerState = .correct

// old
var containsNewArticles: Bool
containsNewArticles = true

// new
enum ArticleFeedState {
    case newArticles
    case nothingNew
}
```

Khi dùng sẽ thấy tác dụng:

```
// old
if !userIsCorrect {
	// Do something
}

// new
if answerState == .wrong {
	// Do Something
}
```

Đọc dễ hơn một chút đúng không?

Có thể chưa dễ hơn nhiều lắm, vì chúng ta code quen rồi thì việc đọc **!userIsCorrect** chắc cũng không vấp lắm.

Nên mình sẽ đưa thêm một số ví dụ nữa (thực ra vẫn là ví dụ mình ăn cắp trong bài nguồn kia thôi).

**1. Giả sử mình có 1 cái UIView, và mình muốn check xem cái UIView đấy có đang bị ẩn đi không.**

Dùng boolean sẽ kiểu:
```swift
if !someView.isHidden {
    // Do something
}
```
Lâu lâu đọc lại chắc phải ngớ nửa s để hình dung ra là đang check xem nó bị ẩn hay không bị ẩn.

Còn nếu dùng enum:
```swift
if someView.display == .visible {
    // Do something
}
```


**2. Một lí do nữa mà chúng ta nên dùng enum thay cho boolean, đó là để tránh boolean trap - xảy ra khi chúng ta pass 1 cái unnamed boolean vào 1 function, rồi sau đó đọc lại không hiểu ý nghĩa của cái boolean đấy là gì.**

Ví dụ, hàm ***stopAnimation()*** của **UIViewPropertyAnimator**. Khi chúng ta muốn dừng animation sẽ viết là:
```swift
animator.stopAnimation(false)
```

Giá trị pass vào hàm ***stopAnimation()*** là ***true*** hay ***false*** thể hiện việc sau khi dừng animation rồi thì có thực hiện cái final actions không. Nếu lần đầu biết đến hàm này, hoặc lâu lâu đọc lại thì chắc không đoán ra nổi. 

Nếu chúng ta dùng enum thì nó sẽ thành kiểu :
```swift
animator.stopAnimation(.notPerformFinalActions)
```

Đọc hiểu luôn, đỡ phải đoán.

**3. Một ưu điểm nữa, đấy là dùng enum sẽ để đường cho chúng ta mở rộng ra sau này**. 

Boolean thì chỉ có true hay false, nhưng enum thì bạn thêm bao nhiêu case cũng được. 

Chẳng hạn trong ví dụ đầu bài viết, cái **ArticleFeedState** đang chỉ có 2 case là ***newArticles*** với ***nothingNew***, nhưng sau này bạn có thể thêm case kiểu ***fetchFailed*** hay ***fetchInProgress*** chẳng hạn. Dùng boolean mà muốn làm được kiểu đấy thì chắc chỉ có thêm biến.


**4. Lý do cuối cùng mà chúng ta nên dùng enum thì là vì enum an toàn hơn:**

Khi bạn dùng enum trong **switch** statements, bạn sẽ phải code cách xử lý cho toàn bộ các case của enum đấy. Nếu không đủ thì XCode sẽ báo lỗi ngay. Việc này giúp chúng ta tránh việc bỏ sót case, tránh bug.

Thêm nữa, bạn sẽ tránh được việc gán value cho 1 biến bằng cách sử dụng 1 biến khác. Ví dụ như này:

```swift
game.isPlaying = user.isAuthenticated
```
Dòng code trên hoàn toàn ok. Game sẽ play nếu user đã được authenticated. Tuy nhiên về lâu dài rồi code nhiều lên thì cũng dễ gây rối đấy.

Nếu dùng enum thì bạn sẽ không được viết kiểu thế, mà phải viết kiểu:

```swift
if user.authentication == .loggedIn {
    game.mode = .playing
}
```

Như này thì an toàn hơn cho sau này, và cũng làm code của bạn dễ đọc hơn.

Sau một thời gian dùng enum thay cho boolean thì mình đã bắt đầu thấy lợi ích khá rõ. Mình nghĩ các bạn cũng nên dùng thử xem sao.

Nguồn: https://www.hackingwithswift.com/articles/172/using-two-cased-enums-in-place-of-a-boolean