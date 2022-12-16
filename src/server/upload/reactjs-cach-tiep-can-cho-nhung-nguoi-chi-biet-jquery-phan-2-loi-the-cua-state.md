## Review phần 1
Ở [phần trước](https://viblo.asia/p/reactjs-cach-tiep-can-cho-nhung-nguoi-chi-biet-jquery-phan-1-state-la-gi-924lJbBXlPM) là một demo nhỏ mô tả về state đối chiếu từ phong cách code jquery. Trước khi sang phần 2 bạn cần nhớ được sự khác biệt cơ bản giữa jQuery và React:
* Với jQuery, bạn viết các *event handlers* dùng để trực tiếp sửa đổi **DOM**.
* Với React, bạn viết các *event handlers* sửa đổi **state**. Và **render ()** để phản ánh **state** hiện tại.
{@embed: https://codepen.io/julienben/pen/GPXKYa}

## Phần 2
Trong phần 2 tôi sẽ demo cách sử dụng state dựa trên cấu trúc của React DOM đê thấy được sự linh hoạt của state so với việc chỉnh sửa DOM bằng jQuery.

### Bước 7: Đếm số lượng ký tự còn lại (jQuery)
Tính năng tiếp theo chúng ta sẽ  thực hiện chức năng hiển thị số ký tự còn lại được phép nhập vào box area
![remaining character count.](https://images.viblo.asia/e0c4c313-9e8c-4722-a89b-d1f854c47fab.png)
Mô tả spec:
* The character count will display 280 — the length of the text.

**Trước tiên, chúng ta sẽ thực hiện bằng jQuery, sau đó là React.**

Bây giờ, chúng ta sẽ bắt đầu với việc triển khai jQuery trước đó và giữ code React. Tiếp đến, tôi sẽ cấp cho bạn mã code mới để bắt đầu ở đầu mỗi Bước, khi chúng ta xen kẽ giữa jQuery và React. Điều đó có nghĩa là sau khi bạn thực hiện với từng bước, bạn có thể trải nghiêm chình sửa với mã code tương ứng để hiểu rõ chức năng trước khi chuyển sang bước tiếp theo.
* HTML:
  
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CodePen</title>
</head>
<body>
  <div class="card bg-light">
    <div class="card-body text-right">
      <textarea class="form-control"></textarea>
      <br/>
      <button class="btn btn-primary">Tweet</button>
    </div>
  </div>
</body>
</html>
```
* jQuery:
```js
// Initially disable the button
$("button").prop("disabled", true);

// When the value of the text area changes...
$("textarea").on("input", function() {
  // If there's at least one character...
  if ($(this).val().length > 0) {
    // Enable the button.
    $("button").prop("disabled", false);
  } else {
    // Else, disable the button.
    $("button").prop("disabled", true);
  }
});
```
* [Đây là code demo ban đầu](https://codepen.io/julienben/pen/gZKVjd)

**Thực hiện**

Đầu tiên, thêm **số ký tự** trong **HTML**. Hãy đặt trong một thẻ ***span***:
```html
<textarea {...}></textarea><br>
<span>280</span>
<button {...}>Tweet</button>
```
Và bên trong JS, thêm code này để cập nhật số ký tự:
```js
$("textarea").on("input", function() {
  $("span").text(280 - $(this).val().length);
  ...
});
```
OK! Hãy thử gõ ký tự vào [ Tweet Box](https://codepen.io/julienben/pen/gZdJNJ) bên dưới và bạn sẽ thấy số lượng ký tự được cập nhật khi bạn nhập vào từ bàn phím.
 {@embed: https://codepen.io/julienben/pen/gZdJNJ}

### Step 8: Đếm số lượng ký tự còn lại (React)
Với React thì sao? Bạn nên thử tự làm điều này. 
* **Bắt đầu** từ việc thực hiện hiển thị Tweeter Box bằng React Component như [phần review](https://viblo.asia/p/reactjs-cach-tiep-can-cho-nhung-nguoi-chi-biet-jquery-phan-1-state-la-gi-924lJbBXlPM) ở trên.

*Gợi ý:*
    * Không cần thay đổi các phương thức constructor () hoặc handleChange ().
    * Sử dụng this.state.text.length trong render ().
 
.....
* **Tiến hành**

Thêm đoạn code sau thẻ **\<br/>** bên trong *render()*:
```js
<span>{280 — this.state.text.length}</span>
```
Kết quả:
{@embed: https://codepen.io/julienben/pen/QzVXOd}
**Bạn cảm thấy Quá dễ, quá nhanh ?** Tuy nhiên đó không phải lý do việc xây dựng UI để mà nói, với React lại tốt hơn hẳn jQuery.  Tốt thôi, bước tiếp theo sẽ phức tạp hơn và đó là lúc **React** thực sự **toả sáng** so với jQuery.

### Bước 9: Thêm “Add Photo” Button (React)
![](https://images.viblo.asia/1a7f5a6f-0813-4647-a486-8ce4423ff245.png)

Đối với tính năng tiếp theo, chúng ta sẽ thêm một nút **“Add Photo” Button** để thêm ảnh vào *Tweet Box*. Đây là lúc mọi thứ bắt đầu có chút khó khăn.

Tuy nhiên, chúng ta **không thực sự viết code để *upload images***. Thay vào đó, đây là những gì chúng ta sẽ làm:
"*Khi bạn tải lên một bức ảnh trên Twitter, nó sẽ được tính toán theo ký tự có giới hạn. Trong thực nghiệm của tôi, số lượng ký tự còn lại sẽ giảm từ 280 xuống còn 257.*"
> Mặc dù biết rằng Twitter không còn xử lý các bức ảnh dựa vào giới hạn ký tự nhưng chúng ta sẽ không để ý đến hướng dẫn này. Cứ làm như vậy thôi nhé ^^

**Spec như sau:**
* Tạo ra một  *“Add Photo” button*.
* Click vào button này sẽ **toggles ON/OFF state**.
* Nếu button *ON*, thì sẽ change button text thành **✓ Photo Added** và số ký tự sẵn có giảm đi 23.
* Cũng như dựa trên việc ký tự đã giảm đi, nếu button *ON*, thậm chí nếu không nhập text, thì *“Tweet” button* vẫn được *enabled*.

Đây là demo Codepen, thử click **"Add photo" button** xem:
{@embed: https://codepen.io/julienben/pen/roZXvE}
### Bước 10: Thêm *“Add Photo” Button* với jQuery 
**Trước đó**, chúng ta đã gắn một xử lý  sự kiện vào $ ("button") nhưng nếu chúng ta có 2 button thì cần tách riêng thành 2 sự kiên. Vì vậy, **hãy sửa đổi HTML như thế này**:
```html
...
<button class="js-tweet-button btn btn-primary" disabled>Tweet</button>
<button class="js-add-photo-button btn btn-secondary">Add Photo</button>
...
```
Đây là những thay đổi đã được tạo ra:
* Thêm button thứ 2 có nội dung *“Add Photo”*.
* Thêm class *js-tweet-button* và *js-add-photo-button* cho mỗi button. Các class names có tiền tố *js-* để nhớ rằng chúng chỉ được sử dụng trong JS(và không có CSS đi kèm).
* Thêm khởi tạo disabled attribute cho Tweet button vậy nên chũng ta không cần làm điều này bằng code JS.
-----
**Tiếp theo**, viết lại toàn bộ file JS như thế này:
```html
$("textarea").on("input", function() {
  $("span").text(280 - $(this).val().length);
  if ($(this).val().length > 0) {
    $(".js-tweet-button").prop("disabled", false);
  } else {
    $(".js-tweet-button").prop("disabled", true);
  }
});
```
Những thay đổi tạo ra là:
* **(Quan trọng) đã remove *$("button").prop("disabled", true);* từ dòng đầu tiên** bởi vì ta đã thêm *disabled attribute* trực tiếp cho Tweet button.
* **Thay thế $("button") bằng $(".js-tweet-button")** nên có thể phân biệt với *.js-add-photo-button*.
-----
**Công việc kế tiếp: Button hiển thị "đã thêm"**

Tiếp theo, chúng ta sẽ triển khai một trong các tính năng:
* Click vào  “Add Photo” button sẽ toggles ON/OFF state. nếu là ON, button sẽ hiển thị **✓ Photo Added**.

Để làm điều này, hãy để thêm đoạn mã này:
```js
$("textarea").on("input", function() {
  ...
});

$(".js-add-photo-button").on("click", function() {
  if ($(this).hasClass("is-on")) {
    $(this)
      .removeClass("is-on")
      .text("Add Photo");
  } else {
    $(this)
      .addClass("is-on")
      .text("✓ Photo Added");
  }
});
```
Chúng ta sử dụng class *is-on* để theo dõi state. **Kiểm tra xem điều này có hoạt động không** bằng cách click vào *"Add photo" Button* nhiều lần và xem text thay thế.

-----
**Đếm số lượng ký tự còn lại**

Tiếp theo ta sẽ thực hiện tính năng:
* Nếu button *ON*, thì sẽ change button text thành **✓ Photo Added** và số ký tự sẵn có giảm đi 23.

Để làm điều này, sửa đổixử lý sự kiên Click mà chúng ta vừa thêm như thế này:
```js
if ($(this).hasClass("is-on")) {
  $(this)
    .removeClass("is-on")
    .text("Add Photo");
  $("span").text(280 - $("textarea").val().length);
} else {
  $(this)
    .addClass("is-on")
    .text("✓ Photo Added");
  $("span").text(280 - 23 - $("textarea").val().length);
}
```
    Chúng ta thay đổi nội dung thẻ span’s mỗi khi click. Nếu *button* bật ON, chũng ta cần trừ đi text length từ *257 (là kết qủa 280 — 23)*. Ta sử dụng *280 — 23* cho rõ ràng ở tình hướng hiện tại nhưng, nếu chúng ta building a production app, ta nên dùng constants thay thế.
Kiểm tra xem có hoạt động không bằng cách click vào *“Add Photo” button*.

-----
**Chỉnh lại xử lý input**
Điều này chưa được hoan tất— **nếu “Add Photo” button ON và gõ vào textarea, đếm số ký tự còn lại sẽ không đồng bộ**.
Chuyện xảy ra bởi vì xử lý textarea không tính đến quản lý tình trạng của “Add Photo” button.
Để khắc phục điều này, chúng ta cần cập nhật xử lý cho textarea như thế này:
```js
$("textarea").on("input", function() {
  if ($(".js-add-photo-button").hasClass("is-on")) {
    $("span").text(280 - 23 - $(this).val().length);
  } else {
    $("span").text(280 - $(this).val().length);
  }

  if (...) {
    ...
  }
});
```
Hãy chắc chắn rằng cái này hoạt động bằng cách bật “Add Photo” button và sau đó nhập một số ký tự.

*điều này sẽ mất thời gian… code jQuery ở đây được cho là khó hiểu nên đừng lo lắng!*

----
**Thực thi tính năng cuối cùng**
* Nếu button *ON*, ngay cả khi không nhập text, thì *“Tweet” button* vẫn được *enabled*.

Chúng ta cần chỉnh sửa xử lý sự kiện click của *“Add Photo” button*
```js
$(".js-add-photo-button").on("click", function() {
  if ($(this).hasClass("is-on")) {
    ...
    if ($("textarea").val().length === 0) {
      $(".js-tweet-button").prop("disabled", true);
    }
  } else {
    ...
    $(".js-tweet-button").prop("disabled", false);
  }
});
```
Giải thích:
* Nếu “Add Photo” button sẽ chuyển từ ON sang OFF (điều kiện *if*) , ta cần check rằng không có đoạn text nhập vào textarea và do đó disable “Tweet” button.
* Nếu “Add Photo” button sẽ chuẩn bị OFF sang ON (điều kiện *else*), luôn luôn enable “Tweet” button.

**Một lần nữa, vẫn gặp lỗi ? Dĩ nhiên vì xử lý vẫn chưa xong đâu nhé, hãy thử tự làm bằng các bước sau:**
* Bật “Add Photo” button sáng trạng thái ON.
* Nhập vài text gì đó.
* Xóa toàn bộ text
* “Tweet” button vẫn nên được enabled vì  “Add Photo” button là ON, nhưng thực thi không đúng trong case này.

Điều này có nghĩa là *trình xử lý đầu vào* của chúng ta cho textarea thiếu một số logic. Để khắc phục điều này, **chúng ta cần thêm một điều kiện khác vào câu lệnh if trong *trình xử lý đầu vào***.
```js
$("textarea").on("input", function() {
  ...
  if ($(this).val().length > 0 || $(".js-add-photo-button").hasClass("is-on")) {
    ...
  } else {
    ...
  }
});
```
Giải thích cho điều kiện ở trên:
* Khi text nhập vào thay đổi, nếu không phải là trống HOẶC nếu “Add Photo” button đang ON => không được disable Tweet Button.

**Hãy thử các bước trên một lần nữa và lần này sẽ hoạt động như mong đợi.**

-----
### Step 11: Phản ánh về jQuery Code —Tại sao khó hiểu?

Đây là version cuối cùng HTML code + JS rất loằng ngoằng từ bước thực hiện trước @@:
{@embed: https://codepen.io/julienben/pen/YdJKqE}

----
Hãy xem lại code jQuery một lần nữa. Nó rất khó hiểu. Nếu bạn giữ nguyên code, bạn có thể cần *comment* ở mọi nơi để nhớ cách hoạt động của nó. Cũng có những dấu hiệu trùng lặp code rõ ràng nhưng bạn phải suy nghĩ khá nhiều trước khi tái cấu trúc nó.

Câu hỏi đặt ra là: **tại sao nó(cấu trúc code) lại trở nên xấu xí nhanh như vậy?**

Câu trả lời là do được thực hiện với coding stype của jQuery chúng ta đã nói trước đó. Nhớ lại sơ đồ này:
![](https://images.viblo.asia/e60f6ce9-6ba1-42c7-91ed-c044ba7be6ce.png)

Mọi thứ thật đơn giản khi chỉ có duy nhất 1 trình(luồng) xử lý sự kiện và 1 phần tử DOM. Tuy nhiên, như chúng ta đã thấy, **nếu một số trình xử lý sự kiện đang sửa đổi một số phần của cùng 1 DOM, code sẽ trở nên xấu và phức tạp khó hiểu**.

Đây là một ví dụ về cái mà mọi người nói "***spaghetti code***".

![](https://images.viblo.asia/fbd3ac60-8401-4c82-8840-b98df16159ea.png)

Hãy tưởng tượng việc thêm nhiều tính năng có thể ảnh hưởng đến cả giới hạn ký tự và trạng thái Button Tweet. Code sẽ trở nên khó quản lý hơn.

Về lý thuyết, bạn có thể giảm thiểu điều này bằng cách tái cấu trúc thành các chức năng có thể sử dụng lại. Nhưng bạn vẫn phải suy nghĩ kỹ về nó mỗi khi bạn thêm một cái gì đó mới.
> Note: Ai đó đã chia sẻ refactored vesion của jQuery code cho demo này. Cực kỳ clean. Bạn có thể nhận thấy rằng hàm *update ()* đảm nhiệm hầu hết các bản cập nhật cho DOM dựa trên trạng thái hiện tại của nó. Even listener sau đó chạy function này trên mỗi callback.
> 
> Theo cách này, nó tương tự như *render* của React. Tuy nhiên, vẫn còn nhiều nhược điểm cho giải pháp này. Chẳng hạn, sự vắng mặt của một đối tượng trạng thái thực làm cho logic mờ mịt hơn. Nó cũng không cho phép bạn chia nhỏ UI của bạn thành nhiều thành phần và có khả năng gặp vấn đề về hiệu năng khi bạn tiếp tục thêm chức năng và logic vào nó.
 
Bây giờ, hãy để xem "nó" sẽ như thế nào, khi muốn làm điều tương tự với React.

**gửi bạn Spoiler mới cho demo với version react: nó sẽ đơn giản hơn nhiiêềuuuu đấy!**

----
### Bước 12: “Add Photo” Button trong React
Bắt đầu với việc thực thi react trước đó:
{@embed: https://codepen.io/julienben/pen/QzVXOd}

----
**- Thêm Button**

Đầu tiên, hãy thêm vào “Add Photo” button. Sửa đổi JSX như sau:
```html
<button ...>Tweet</button>

<button className="btn btn-secondary">
  Add Photo
</button>
```
Bây giờ, hãy để thêm một xử lý click chuột vào nút này để text thay đổi từ *Add Photo* thành *✓ Photo Added*. Nhớ lại cách viết mã React:
![](https://images.viblo.asia/fde45fc7-6a9b-4cfd-b7f8-74cb690c137a.png)

**- Chúng ta sẽ làm theo thứ tự sau:**
1. Tạo một biến state để theo dõi xem “Add Photo” button là ON hay OFF.
2. Sử dụng state trong *render ()* để quyết định hiển thị Add Photo or ✓ Photo Added.
3. Cập nhật state trong khi xử lý click chuột.

**Thứ nhẩt**, chúng ta sẽ sửa đổi state ban đầu trong hàm tạo *constructor* bằng cách thêm cặp key-value để theo dõi xem ảnh có được thêm hay không:
```js
constructor(props) {
  super(props);
 
  this.state = {
    text: '',
    photoAdded: false,
  };
}
```
**Tiếp đến**, chúng ta sẽ sửa đổi JSX markup cho *“Add Photo” button*. Chúng ta sẽ có button cho biết “✓Photo Added” nếu *this.state.photoAdded is true*. chúng ta có thể chỉ dùng toàn tử tam nguyên ở đây:
```html
<button className="btn btn-secondary">
  {this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }
</button>
```
**Cuối cùng**, chúng ta sẽ đính kèm một xử lý sự kiện trên JSX giống như chúng ta đã làm cho textarea:
```html
<button className="btn btn-secondary" onClick={this.togglePhoto}>
  {this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }
</button>
```
Lưu ý rằng chúng ta sử dụng *onClick* thay vì *onChange*. Điều này là do chúng ta xử lý riêng một button chứ không phải là textarea hoặc input.

Chúng ta cũng sẽ thêm một phương thức xử lý để thay đổi giá trị của *this.state.photoAddded*:
```js
togglePhoto = () => {
  this.setState((prevState) => ({ photoAdded: !prevState.photoAdded }));
}
```
Lần này bạn sẽ thấy rằng chúng ta sẽ truyền một hàm tới *this.setState*. Điều này là cần thiết nếu bạn muốn cập nhật *state* thành phần của mình nhưng cần sử dụng một giá trị từ *state* trước đó. Tại sao chúng ta làm điều đó nằm ngoài phạm vi của hướng dẫn này nhưng bạn có thể đọc về nó trong phần [state](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly) của *the official React documentation*.

Bây giờ, nhấp vào *Add Photo* sẽ chuyển đổi *button text*. Hãy tự mình thử

----
**- Đếm số ký tự còn lại**

Bây giờ chúng ta sẽ thực hiện tính năng tiếp theo:
* Nếu “Add Photo” button đang ON, thì **số lượng ký tự có thể nhập sẽ giảm đi 23**.

Hiện tại, số lượng ký tự khả dụng được hiển thị như sau trong render ():
```html
<span>{280 - this.state.text.length}</span>
```
Giá trị này bây giờ cũng sẽ phụ thuộc vào *this.state.photoAdded* vì vậy chúng ta cần một *if ... else* ở đây.
>  in JSX, you can’t write if or else inside { ... }

Trường hợp này chúng ta có thể sử dụng toan tử 3 ngôi để dễ đọc hơn. Thường thì giải pháp đơn giản nhất là tái cấu truc code thành 1 method, Oke thừ luôn:

**Đầu tiên, sửa đổi code trên để sử dụng một class method, như thế này:**
```js
<span>{this.getRemainingChars()}</span>
```
và định ngĩa method như này:
```js
getRemainingChars = () => {
  let chars = 280 - this.state.text.length;
  if (this.state.photoAdded) chars = chars - 23;
  return chars;
}

```
Bây giờ, số lượng ký tự còn lại sẽ cập nhật như mong đợi khi “Add Photo” button được bật.

----
**- Câu hỏi**: trong hàm render(), tại sao {this.getRemainingChars()} có () nhưng {this.handleChange} và {this.togglePhoto} thì không?
OK. xem lại hàm **render**:
```js
render() {
  return (
    ...
      <textarea className="..." onChange={this.handleChange}></textarea>
    ...
    
    <span>{this.getRemainingChars()}</span>
    ...    
          
    <button className="..." onClick={this.togglePhoto}>
      ...
    </button>
    ...
    );
  }
```
**Trả lời**:
* Ta viết *getRemainingChars()* trả về number, và cần number này để đặt bên trong thẻ *<span></span>*
* Mặt khác: *handleChange* và *togglePhoto* là **event handlers** . chúng ta cần các method được gọi đến khi user tưowng tác với UI (gõ từ bàn phím trong textarea hoặc click button) vậy nên khi gọi method không có () và gán cho các thuông thính như *onChange*, *onClick*, **React sẽ đảm nhiệm việc gắn các phương thức tương ứng liên quan đến event listeners**

----
**- “Tweet” Button’s Status**

Thêm 1 tính năng nữa cần triển khai đó là:
* Nếu “Add Photo”  button *ON*, thậm chí nếu không nhập text, thì *“Tweet” button* vẫn được *enabled*.

Quá dễ đến set attribute disable cho button:
```js
<button ... disabled={this.state.text.length === 0}>...</button>
```
Mặt khác trạng thái disable của button còn phụ thuộc:
* The text’s length bằng 0

và
* “Add Photo” button thì OFF.

Và logic trông như này:
```js
<button ... disabled={this.state.text.length === 0 && !this.state.photoAdded}>...</button>
```

Có 1 cách có thể lam rõcode hơn là sử dụng *getRemainedChars ()*.Nếu vẫn còn 280 ký tự, điều đó có nghĩa là vùng textarea trống và  “Add Photo” button bị TẮT nên nút  “Add Photo” button phải bị disable.
```js
<button ... disabled={this.getRemainingChars() === 280}>...</button>
```
refactor code:
```js
render() {
    const isTweetButtonDisabled = this.state.text.length === 0 && !this.state.photoAdded;
  
    return (
      ...
        <button className="..." disabled={isTweetButtonDisabled}>Tweet</button>
      ...
    );
  }
```
Kết quả:
{@embed: https://codepen.io/julienben/pen/roZXvE}

-----
### Bước 13: Phản ánh về Mã React - Tại sao đơn giản như vậy?

Trong React, trình xử lý sự kiện sửa đổi state và bất cứ khi nào state được sửa đổi, **React sẽ tự động gọi render () một lần nữa để cập nhật UI**.
![](https://images.viblo.asia/fde45fc7-6a9b-4cfd-b7f8-74cb690c137a.png)

State trở thành một thứ trung gian nằm giữa các trình xử lý sự kiện và render ():
* Event listeners không cần phải lo lắng về phần nào của DOM thay đổi. Chỉ cần thiết lập state.
* Tương tự, khi bạn viết code cho render (), tất cả những gì bạn cần lo lắng là state hiện tại là gì.

-----
**So sánh với jQuery**

Bạn có thể tưởng tượng những gì sẽ xảy ra khi UI có nhiều tính năng hơn. Không có state trung gian, chúng ta sẽ có một thời gian khó khăn để quản lý sự phức tạp. Đây là lý do tại sao bạn muốn sử dụng React hơn jQuery cho các UI phức tạp.
![](https://images.viblo.asia/3d186649-6790-44ce-af5c-343bb8649e8b.png)

Một lần nữa, **có thể** viết mã jQuery sạch mà không giống như **spaghetti code**. Nhưng bạn phải tự mình nghĩ ra cấu trúc mã và suy nghĩ về cách cấu trúc lại mỗi khi bạn thêm một tính năng mới. React cung cấp cho bạn cấu trúc này và giảm tải thời gian cà công sức nhận thức của bạn.
> Lưu ý rằng ý tưởng tách state khỏi render đã được phát minh bằng React. Chúng ta chỉ nhìn vào nó từ quan điểm của React.

----
## Kết thúc!
Hướng dẫn xin kết thúc tại đây, hi vọng giúp bạn
* hiểu được các ưu điểm của việc bổ sung cấu trúc React’s component so với sửa đổi thủ công DOM bằng jQuery
* đã học cách viết các thành phần React đơn giản bằng JavaScript và JSX.

------
**Nguồn:** https://medium.freecodecamp.org/react-introduction-for-people-who-know-just-enough-jquery-to-get-by-2019-version-28a4b4316d1a