Việc học code không hề dễ dàng. Trong bài viết này, Murat sẽ chia sẻ những lời khuyên về cách viết code khác biệt và thi vị, điều đã giúp anh ấy vượt qua gian đoạn học code ban đầu chật vật và thiếu chắc chắn.


-----

Trở lại năm 2008, khi bắt đầu học về design, tôi vẫn nhớ như in cảm giác lo sợ khi nhìn vào những dòng code. Lúc đó tôi có tham gia các khóa học về lập trình và đã trải qua khoảng thời gian khó khăn khi mới bắt đầu tiếp xúc với code. Bỗng nhiên, các từ tôi sử dụng trong tiếng Anh (chẳng hạn "new", "return" hay "throw/catch") mang một ý nghĩa hoàn toàn mới; cú pháp khó hiểu, dấu chấm phẩy, dấu ngoặc và những quy tắc hoàn toàn mới chẳng khiến mọi thứ dễ dàng hơn.

Nếu bạn mới tìm hiểu về Javascript và/hoặc có vật lộn với việc bổ sung nó vào những kỹ năng của mình thì có một cách tiếp cận giúp bạn vượt qua những rào cản này. Bạn chắc chắn không phải là trường hợp cá biệt và hoàn toàn có quyền khi nghĩ rằng việc học code là cực kỳ khó nhằn.

### Tại sao học code lại khó ?

Dưới đây là một trong những quan niệm sai lầm về việc tại sao tôi lại nghĩ rằng nhiều người đang gặp khó khăn trong việc tìm hiểu và quan tâm tới Javascript (hay bất cứ ngôn ngữ lập trình nào):

- Code khó hiểu, thuần chức năng và khá đáng sợ
-  Code chỉ có ý nghĩa với máy móc, vì vậy mọi người không cảm nhận và gắn bó được.
- Code không được coi là một ngôn ngữ bởi ngữ cảnh sử dụng hoàn toàn khác và trông không giống với bất cứ thứ gì mà nhiều người đã thấy
- Nhiều người thường có những suy nghĩ dập khuôn (như kiểu coi code là dành cho hacker nguy hiểm, có thể như các thanh niên trong bộ phim Matrix). Do đó không xác định được bản thân mình ra sao khi tiếp cận với code.

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_1600/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8ce7d4c0-bc1d-428f-af64-7bb324419ce6/writing-code-poetically-baby.png)
*Hình ảnh của tôi trước khi học code*

Là một lập trình viên, bạn thường sẽ phải nhìn nhận code theo một cách rất riêng biệt, thậm chí là suy nghĩ theo một hướng khác biệt (và có tính logic cao). Ngôn ngữ lập trình khá nghiêm ngặt và không có sự châm chước; một ký tự có thể khiến máy móc hiểu sai ý bạn và khiến các ứng dụng bị lỗi. Bạn thường sẽ bỏ qua và thay đổi những điều mà bạn biết từ việc nói và viết một ngôn ngữ giao tiếp (đây cũng là tình huống khi học một ngôn ngữ giao tiếp mới).

Nhưng không phải tất cả ngôn ngữ lập trình, tài liệu hay video hướng dẫn trên web được tạo ra với tư tưởng "chuyển đổi từ ngôn ngữ giao tiếp sang ngôn ngữ lập trình" này. Dĩ nhiên, chúng không nhất thiết phải vậy. Sau cùng, mục đích chính của code là ra lệnh cho máy móc hoạt động.

Cũng với lý do đó, không có sự so sánh nào ở đây và những ngôn ngữ giao tiếp mà bạn sử dụng (từ vựng và ngữ pháp) có vẻ không phù hợp để học ngôn ngữ lập trình. **Không có từ nào tương đương với "love" trong ngôn ngữ của Javascript**, hay việc nói "I love you" không có ý nghĩa gì cả. Một bộ máy (hoặc trình duyệt) đơn giản là không biết hay không quan tâm tới chuyện yêu đương (có thể là chưa chăng?). Cái cảm giác "mới hoàn toàn" và "không biết bắt đầu từ đâu" có thể rất đáng sợ.

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_1600/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ba520005-77e6-471e-b5f5-4f1a69f3ca73/writing-code-poetically-baby2.png)
*Hình ảnh của tôi khi bắt đầu học code*

Đó là lý do tại sao có bài viết này. Tôi nghĩ bạn có thể học Javascript theo một cách đơn giản và thi vị hơn rất nhiều với việc bám sát vào các kiến thức về ngôn ngữ giao tiếp và coi Javascript như bất kỳ ngôn ngữ giao tiếp nào khác. Để tôi mô tả bằng một ví dụ nhỏ sau đây.

**Sự thật thú vị**: *Một vài ngôn ngữ lập trình thực tế được chuyển đổi từ ngôn ngữ lập trình khác. Do đó sẽ dễ dàng hơn rất nhiều khi học nhiều ngôn ngữ lập trình - chỉ bằng việc học một ngôn ngữ.*

### Một ví dụ nhỏ

Trong nhiều trường hợp, ví dụ, khi muốn chạy một đoạn code JavaScript, bạn sẽ để trang web ở trạng thái sẵn sàng trước khi có thể thao tác với các thẻ HTML. Trong JavaScript thuần, bạn có thể đã từng gặp đoạn code dưới đây:

```javascript
(function() {
   // Your code goes here
})();
```

(Trong trường hợp này, một hàm được định nghĩa trong ngoặc tròn rồi sau đó được gọi ngay lập tức với cặp ngoặc tròn ở cuối. Đây được gọi là [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE))

Hoặc với trường hợp sau:

```javascript
if (document.readyState === ‘complete’) {
  // Your code goes here
}
```

Đoạn code đầu tiên cần phải giải thích, trong khi với đoạn code thứ hai, chỉ bằng cách nhìn vào đó, người ta có thể hiểu rõ rằng có một điều kiện cần thỏa mãn để việc gì đó xảy ra.

Dù vậy, hãy tưởng tượng một thứ như sau:
```javascript
onceUponATime(function () {
  // Your code (story) goes here
})
```
"onceUponATime" (ngày xửa ngày xưa) là câu nói thậm chí cả trẻ con cũng có thể hiểu được. Nó gắn bó với lập trình viên (bằng cách gợi nhớ về ký ức tuổi thơ), đồng thời về mặt lý thuyết cũng thực hiện điều tương tự. Đây là tư tưởng chuyển đổi ngôn ngữ giao tiếp sang ngông ngữ lập trình mà tôi luôn cân nhắc.

**Chú ý nhanh về "functions"**: Một function có thể coi là một kỹ năng mà bạn chỉ sử dụng khi cần. "To read" là một kỹ năng `function read() { ... }`, mà được sử dụng khi bạn muốn đọc một thứ gì đó như `read()`. Cũng có một thứ được gọi là "anonymous functions" (hàm ẩn danh) `function() { … }` (không có tên hàm, giống đoạn code bên trên) có thể coi là một hành động thường xuyên hoặc một lần xảy ra mà bạn không coi đó là một kỹ năng, chẳng hạn như "ấn một phím bấm"

### Xét theo chiều ngược lại: Từ thông điệp giao tiếp tới các điều căn bản của lập trình

Với ý tưởng xa hơn chút, chúng ta sẽ đảo vị trí của những lý do và các quan niệm sai lầm được đề cập ở phần trước của bài viết như sau:

> A small poem.
> 
> Written in JavaScript.
>
> Made for human beings.
>
> About the love between two individuals.

*Tạm dịch*
> Một bài thơ
> 
> Được viết bằng JavaScript
>
> Tạo bởi con người
>
> Về chuyện đôi lứa

```javascript
// Love at first sight
if (me.getDistanceTo(you.position) < 200) {
  me.setFeelings({
    inLove: true,
  });
}
```

Nó không có tính thực thi và hiện tại không có ý nghĩa với máy móc. Nó chỉ có ý nghĩa đọc hiểu đối với con người.

Nếu bạn nắm được thông điệp của bài thơ thì bạn thật sự hiểu đoạn code Javascript, điều mà bạn có thể đem so sánh với ngôn ngữ Anh.

Giờ bạn có thể tự hỏi chính mình rằng: Tôi hiểu điều này nhưng tại sao nó lại được viết như vậy? Quy tắc (ngữ pháp) của ngôn ngữ này là gì? Ý nghĩa của từ "me" (theo mặt kỹ thuật) là gì và tại sao đoạn code trên lại tương tự như tiếng Anh vậy?

### Quy tắc, Từ vựng và Biến

Một trong những điều quan trọng nhất để học một ngôn ngữ lập trình là **khái niệm về biến**.

Mọi ngôn ngữ lập trình đều có quy tắc (ngữ pháp) và rất nhiều từ vựng (được định nghĩa sẵn). Hiển nhiên, cả hai thứ trên đều phải học để có thể nói được một ngôn ngữ.

JavaScript, giống nhiều ngôn ngữ lập trình khác, cũng có bộ quy tắc (ví dụ dấu chấm giữa các từ hay việc câu lệnh `if` được viết như nào) và ngữ pháp của riêng nó (`if`, `document`, `window`, `Event`, ...). Những từ khóa này được định nghĩa sẵn bởi JavaScript và mỗi từ khóa có mục đích riêng  biệt.

Nhưng như đã đề cập lúc trước, việc đối chiếu giữa từ và câu với tiếng Anh có thể bị thiếu sót vì **không có điều tương đương**.

Đây là lúc biến được sử dụng. Lập trình viên có thể (hoặc thậm chí là phải) định nghĩa các biến để khiến máy tính và những lập trình viên khác hiểu ý nghĩa của code. Biến có thể ở nhiều dạng: Chuỗi từ và ký tự, số, hàm, hoặc thậm chí là một mảng. Bạn sẽ đặt tên cho biến.

Trong tất cả các ngôn ngữ, chắc chắn sẽ có một từ để mô tả về tình yêu. Bạn biết nó ý nghĩa là gì nhưng không thực sự rõ, vì nó mang tính chủ quan. Tuy nhiên, kiểu gì cũng có một từ để mô tả về nó.

Trong JavaScript, không có từ nào là "love" cho đến khi bạn định nghĩa nó. Nó có thể là bất cứ thứ gì bạn muốn.

```javascript
// Love at first sight
if (me.getDistanceTo(you.position) < 200) {
  me.setFeelings({
    inLove: true,
  });
}
```

Việc phân biệt giữa những điều đã được định nghĩa sẵn trong JavaScript (quy tắc và cú pháp) và những điều mà lập trình viên có thể tùy chỉnh được (thường được biết là logic ứng dụng hay logic nghiệp vụ) là rất quan trọng.

Trở lại với bài thơ được viết ở trên:
```javascript
// Love at first sight
if (me.getDistanceTo(you.position) < 200) {
  me.setFeelings({
    inLove: true,
  });
}
```

Những phát biểu sau đến từ những quy tắc/cú pháp của JavaScript:
```javascript
if (…) { … }
// if statement: when … is met, do things in { … }

{
    inLove: true,
}
// an “object” with some info, some thing in the world.
// can contain other info, and “skills” (functions).
// “inLove” is a custom property,
// “true” is pre-defined in javascript, (meaning: “yes”)
// and the value of “inLove”.

.
// needed to access an objects property “my name: me.name”

getDistanceTo()
// an expression to “call” a function (a “skill”).
// getDistanceTo is custom (not JavaScript), and a function,
// so it can be executed / called upon with the “()” after.
// sometimes you can pass arguments in those brackets (like “position”)
// to change the outcome of a function.
```

Và những biến sau đây (những thứ bạn được tự do định nghĩa tên và hành vi của chúng):
```javascript
me // an object, some thing in the world
you // an object, some thing in the world
position // an info about “you”, accessed by the “.”
getDistanceTo // a skill of me, accessed by the “.”
getDistanceTo() // the skill, with javascript grammar telling: do it.
getDistanceTo(position) // same, but do it with “position”.
setFeelings // another skill of me, accessed by the “.”
setFeelings({ inLove: true }); // the skill, with some instructions (an object).
```
Hãy giả sử bài thơ bây giờ được viết dưới dạng con người có thể đọc. Bạn có thể hiểu được thông điệp, bạn cũng có thể thấy được sự khác biệt giữa những quy tắc ngôn ngữ của JavaScript mà bạn cần tuân theo và những thứ có thể tùy chỉnh (các biến).

Nhưng còn về máy tính thì sao?

Nếu máy tính (trình duyệt) đọc bài thơ này, nó sẽ trả về lỗi. Máy tính cần một định nghĩa cho từ "me" và "you" bởi nó sẽ truy cập vào thuộc tính của chúng (thông qua dấu chấm `.` trong `me.getDistanceTo()`). Với khả năng phân biệt được đề cập ở trên, bạn có thể thực sự lập trình hóa từ "me" và "you" để bài thơ có thể hiểu và chạy được bởi máy tính như sau:
```javascript
// This is how the definition of a being (me/you) could look like

var me = {
  position: {x: 0, y: 0} // some coordinates, maybe
  getDistanceTo: function(position) {
    // calculate the distance, relative to own position
  },
  setFeelings: function(feelings) {
    // handle those feelings…
  }
}

var you = {
  position: {x: 0, y: 0} // some coordinates, maybe
}

// the poem itself
if (me.getDistanceTo(you.position) < 200) {
  me.setFeelings({
    inLove: true,
  });
}
```
Vậy chuyện gì đã xảy ra ở đây?

- Chúng ta đọc một bài thơ JavaScript, được viết bằng "ngữ pháp"  của JavaScript với mục đính duy nhất là có thể được hiểu bởi con người.
- Sau khi hiểu thông điệp, chúng ta phân biệt giữa những quy tắc, cú pháp và các biến để hiểu cấu trúc của bài thơ (ngữ pháp và những điều căn bản của JavaScript).
- Với sự phân biệt này, chúng ta lập trình hóa các biến còn lại của bài thơ, với những quy tắc của JavaScript để nó có thể thực thi bởi máy tính (trình duyệt).

**Điều này là có thể, bởi chúng ta đã coi JavaScript chỉ như ngôn ngữ Anh.**

### Một ví dụ lớn hơn: Thơ code có tính tương tác ###

Đây là dự án cá nhân của tôi [LoveBits](https://lovebits.bilebile.net/). LoveBits là một trải nghiệm về việc học và kể chuyện với code.


Mục đích của dự án trên là khiến mọi người quan tâm tới JavaScript/lập trình bằng việc:
- Đặt tính khả đọc và ngôn ngữ giao tiếp lên đầu
- Liên kết code với một môn nghệ thuật àm đọc giả có thể đã quen

Ngược lại, nó nói về hai Bit (các ô vuông): một trong số các Bit (Bit xanh) là một người lãng mạn và viết những bài thơ tình bằng JavaScript với Bit còn lại (Bit tím).

Khi bắt đầu sử dụng LoveBits, bạn có thể chọn một trong số nhiều bài thơ tình (viết bằng JavaScript). Mỗi bài thơ đều có một đoạn code được viết theo cách mà được coi là hiểu được đối với cả những người chưa quen với lập trình. **Yêu cầu duy nhất chỉ là biết tiếng Anh mà thôi.**

Ví dụ với "Love at first sight" (một trong những bài thơ của LoveBits, tạm dịch là Yêu từ cái nhìn đầu tiên) kể về việc Bit xanh nói rằng "If I get close enough to your position, I will 'set my feelings' to `inLove: true`." (Nếu tôi tiến tới đủ gần với vị trí của em, tôi sẽ để trạng thái cảm xúc của mình là đang yêu `inLove:true`).

Điều đặc biệt về những bài thơ này là bạn có thể "chạy" và "chơi" chúng đơn giản chỉ bằng thao tác nhấn vào phím "play" phía dưới trang web. Trong trường hợp của "Love at first sight", bạn sẽ thấy một ô vuông màu xanh và một ô vuông màu tính đi cùng một con số. Như bạn đã đoán được, chúng là những Bit được đề cập trong bài thơ và con số đó là khoảng cách giữa Bit xanh và Bit tím.

Như bài thơ đã gợi ý, bạn có thể muốn Bit xanh đem lòng yêu Bit tím bằng cách giảm khoảng cách giữa chúng, đúng không? Vậy bạn có thể làm gì? Bạn có thể tương tác và kéo Bit xanh ra xung quanh và khiến nó trở nên yêu. Nhưng cẩn thận, đôi khi có những kết quả khác nữa.

Người ta thực sự có thể nói rằng bạn là một cái máy trong trường hợp này. Bạn là người cần xử lý code JavaScript để có thể tương tác và giúp hai vật thể số đến với nhau.

### Từ đây có thể đi tiếp đến đâu?

Nếu bạn đang gặp khó khăn với lập trình, thử coi JavaScript như một ngôn ngữ giao tiếp và chỉ hiểu đơn giản các đoạn code làm gì đầu tiên thay vì những việc kết thúc sau đó.

Đây là một số lời khuyên cho những việc bạn nên làm tiếp theo:

- Luôn ưu tiên đi thẳng vào các ví dụ và code toàn bộ ứng dụng mà có liên kết các quy tắc, từng vựng và các biến để tạo nên một logic ứng dụng.
- Logic ứng dụng sẽ kể những câu chuyện giúp bạn không cảm thấy trống rỗng giống như những đoạn code ví dụ ở trên. Các công cụ và thư viện như `lodash` sẽ chỉ cung cấp những từ vựng mới mà chỉ hữu ích sau khi bạn đã đọc và hiểu JavaScript code.
- Xem lại code hiện tại và cố gắng chia nhỏ các hàm theo tên gọi, phản ánh những gì chúng thực hiện. Viết code mà gần gũi với cả con người và máy tính. Viết code theo một cách nào đó nó có thể được đọc thành một câu có ý nghĩa. Sử dụng comments khi cần. Cân nhắc làm sao để diễn đạt các đoạn code theo ngôn ngữ giao tiếp (đối với những lập trình viên khác).

### Kết luận

Việc học code có thể trở nên dễ dàng khi bạn coi code như một ngôn ngữ giao tiếp, chứ không phải một thứ gì đó xa lạ. Học cách phân biệt giữa đặc tính có sẵn (tích hợp) của ngôn ngữ và code tùy biến theo logic của ứng dụng là điều quan trọng. Việc hiểu logic của ứng dụng sẽ đặt bạn vào vị trí thuận lợi để cải thiện và thay đổi mọi thứ, thậm chí ngay cả khi không biết các đặc tính của ngôn ngữ.

**Thông điệp đi trước những điều căn bản**: Hiểu được thông điệp của bất cứ đoạn code nào và những điều căn bản của JavaScript sẽ thuận theo tự nhiên. Bao nhiêu lần bạn đã nghe ai đó nói rằng "Tôi hiểu về ngôn ngữ này nhưng tôi chưa nói được" ?. Đó là quy luật tự nhiên, điều có thể và nên được áp dụng cho việc học ngôn ngữ của con người, cả ngôn ngữ lập trình lẫn giao tiếp.

Luôn nhớ rằng code có một mục đích rõ ràng về mặt chức năng là điều đương nhiên nhưng không phải lúc nào cũng bắt buộc như vậy. Ngay cả ngôn ngữ giao tiếp cũng thuần về mặt chức năng nhưng khi nó được diễn đạt ở dạng thơ và thậm chí là bài hát (bài hát bằng JavaScript, liệu ai đã thử? ), sẽ kết nối mọi người với nhau theo những cách hoàn toàn khác biệt. Tôi nghĩ và hy vọng điều đó có thể áp dụng được với ngôn ngữ lập trình.

### Tìm hiểu thêm
["If Hemingway wrote JavaScript"](https://nostarch.com/hemingway), Angus Croll

Cuốn sách nói về các nhà thơ, các nghệ sỹ nổi tiếng và cách họ viết các đoạn code JavaScript. Khá là hài hước.

### ** Lược dịch **

**Murat Kemaldar**, *Learning To Code By Writing Code Poems*, [www.smashingmagazine.com](https://www.smashingmagazine.com/2018/07/writing-code-poems/)