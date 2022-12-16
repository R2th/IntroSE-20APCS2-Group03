Từ khóa **this** là một khái niệm rất quan trọng trong Javascipt, và cũng đặc biệt là một chủ đề gây nhức não cho không chỉ những người mới học lập trình Js mà ngay cả những người đã có kinh nghiệm. Làm thế nào để xác định giá trị của this là gì ? Liệu có cách nào để chúng ta gán giá trị cho this hay không? Bài viết này chúng ta sẽ cùng tìm hiểu cách để làm điều đó với những methods liên quan đến this là **call()**, **apply()** và **bind()** và cách để phân biệt chúng thông qua các ví dụ. 

Bài viết này có 1 phần do mình dịch dựa trên một bài viết rất hay của [*Tania Rascia*](https://www.taniarascia.com), cô ấy có rất nhiều bài viết giải thích dễ hiểu cho các bạn mới tìm hiểu về lập trình. Nếu có thời gian mình sẽ dịch thêm nhiều bài viết khác của cô ấy. Các bạn có thể đọc link gốc [tại đây](https://www.taniarascia.com/this-bind-call-apply-javascript/ ) 

## 1. Một chút sơ qua về This 
Trên Viblo đã có một bài viết cực hay giải thích cặn kẽ cho các bạn về this. Nếu chưa rõ về this lắm, hãy dành 5' vào đây tìm hiểu kĩ về this trước đã nhé: https://viblo.asia/p/tat-ca-nhung-dieu-ban-can-biet-ve-this-trong-javascript-gAm5y8WEldb

Mình sẽ tóm tắt sơ qua những ý chính cần nhớ về this cho các bạn: 

* **Điều quan trọng nhất cần nhớ** : This trả về object gần nhất chứa nó
* **Nếu this đứng 1 mình** (tức global, không nằm trong method hay function nào) thì sẽ trả về "window obj"
* **Trong method** : This trả về obj chứa method đó
* **Trong function với strict mode** : This trả về "undefined"
* **Trong function không phải strict mode**: This trả về "window obj"
* **Trong 1 event** : This trả về element mà event đó tác động vào. 

Các bạn có thể đọc link trên để hiểu kĩ hơn. Còn bây giờ chúng ta sẽ đi đến phần chính của bài viết này : Tìm hiểu về các methods call((), apply() và bind() và cách phân biệt chúng. 

## 2. Call(), Apply() và Bind() Method
Như các bạn đã biết thì this mặc định sẽ được xác định thông qua context của nó ( là global?, trong 1 object? , trong 1 event?, .... Tất cả những thứ đó được gọi là Implicitly Context. Tuy nhiên bạn cũng có thể tự gán giá trị cho this thông qua các method, và lúc này ta nó this được gọi thông qua Explicity Context. 
### Call và Apply


**Cú pháp**: `func.call([thisArg[, arg1, arg2, ...argN]])`
`func.apply(thisArg [, argsArray])`

Trong đó: 

* thisArg : giá trị muốn gán cho this
* [arg1,  arg2, ....] các arguments truyền vào call() one by one
* [argsArray] : mảng đóng vai trò là argument truyền vào apply()

call và apply có vẻ rất giống nhau---đều gọi 1 function với 1 giá trị this xác định mà mình gán cho, cùng với những arguments. Điều khác nhau duy nhất giữa 2 method này đó là arguments truyền vào call sẽ được đọc từng giá trị một, trong khi arguments truyền vào apply là 1 array ? Khó hiểu ghê nhể, cùng xem ví dụ nhé.

Trong ví dụ này, chúng ta sẽ tạo một object book, và viết một function gọi this. 
```
const book = {
  title: 'Brave New World',
  author: 'Aldous Huxley',
}

function summary() {
  console.log(`${this.title} was written by ${this.author}.`)
}

summary() //"undefined was written by undefined"
```

**Giải thích :** Vì this đang được gọi trong 1 function, vì vậy khi này giá trị của this sẽ trả về window obj (như mình đã nói ở trên), nên giá trị của this.title và this.author là undefine. 

Vậy để summary() có thể gọi được title và author trong obj book ( tức là this ta gọi trong summary() sẽ trả về obj book) ta cần có một "sự kết nối" giữa chúng. Đây là lúc chúng ta cần tới call() và apply(). Sử dụng call() và apply() để gọi this trong obj book: 
```
summary.call(book) //"Brave New World was written by Aldous Huxley."
// or:
summary.apply(book) //"Brave New World was written by Aldous Huxley."
```



**Giải thích :** Cần nhớ rằng argument đầu tiên truyền vào 2 method này là *giá trị bạn muốn gán cho this* (thisArg). Ta truyền tham số "book" như trong ví dụ trên tức là ta đã gán this khi được gọi trong function summary() trả về book obj, khi đó 2 giá trị this.title và this.author sẽ được trả về.

Ngoài việc có thể pass this như argument đầu tiên, 2 method này còn cho phép chúng ta pass nhiều arguments khác. Và ở đây sẽ tạo ra sự khác biệt giữa 2 method này. Cùng xem ví dụ sau: 

Ta có một function: 
```
function longerSummary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`
  )
}
```
Gọi function này với call() : 
```
longerSummary.call(book, 'dystopian', 1932); //"Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```

Vậy nếu ta gọi function này với apply() thì sao?

```
longerSummary.apply(book, 'dystopian', 1932); //Uncaught TypeError: CreateListFromArrayLike called on non-object at <anonymous>:1:15
```


**Giải thích :** Có sự khác nhau giữa 2 kết quả trả về ở đây là vì cách chúng ta truyền tham số vào mà 2 method này yêu cầu khác nhau. Quay trở lại với cú pháp của 2 method này, **call() truyền vào từng arg one-by-one, trong khi apply() truyền arg vào là 1 mảng**. Bạn còn nhớ điều đó chứ ? Đây chính là sự khác nhau duy nhất giữa 2 method này đấy !

Vậy để có thể sử dụng apply(), ta cần chỉnh sửa lại cách truyền vào arg :
```
longerSummary.apply(book, ['dystopian', 1932]); //"Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```


Oke vậy là xong 2 methods rồi, còn nốt method cuối cùng thôi. 

### Bind
Hai method apply() và call() đều là 2 method gọi 1 lần. Tức là chỉ khi bạn gọi 2 hàm này thì giá trị của this mới được gán mới, còn bản chất function đó không hề thay đổi chút nào. Tuy nhiên, đôi khi sẽ có lúc bạn muốn sử dụng 1 method nào đó nhiều lần trong code với this của method đó sẽ do bạn gán. Và đó là lúc bạn cần sử dụng bind() để tạo ra 1 function mới thỏa mãn yêu cầu trên

```
const braveNewWorldSummary = summary.bind(book)

braveNewWorldSummary() //"Brave New World was written by Aldous Huxley"
```


**Giải thích :**

Có thể hiểu như sau: Bằng việc sử dụng bind ở đây,  chúng ta tạo một funcion mới braveNewWorldSummary() có chức năng hệt như function summary(), và this của nó sẽ được gán với book obj.  "braveNewWorldSummary()". Function mới được tạo này sẽ thay thế cho summary.bind(book). Tức là bạn có thể gọi đi gọi lại nhiều lần và nó sẽ luôn trả về cho bạn 1 function đã được "buộc chung" với 1 this cụ thể mà bạn mong muốn. 

Bạn chỉ có thể sử dụng bind() 1 lần. Cho dù bạn có cố gắng sử dụng bind() nhiều lần nữa, thì kết quả cũng sẽ chỉ trả về lần bind() đầu tiên : 

```
const braveNewWorldSummary = summary.bind(book)

braveNewWorldSummary() // Brave New World was written by Aldous Huxley.

const book2 = {
  title: '1984',
  author: 'George Orwell',
}

braveNewWorldSummary.bind(book2)

braveNewWorldSummary() // Brave New World was written by Aldous Huxley.
```

## Tổng kết
Oke vậy là chúng ta đã xử lí xong 3 methods liên quan tới this rồi. Có thể sẽ khá khó khăn với những bạn mới bắt đầu tìm hiểu và chưa hiểu rõ về this. Tuy nhiên nên nhớ rằng this là một khái niệm cực kì quan trọng trong Javascript, vậy nên hãy cố gắng nắm chắc về this mọi người nhé. Cảm ơn mọi người đã đọc :D

## References

- Bài viết gốc tiếng Anh : https://www.taniarascia.com/this-bind-call-apply-javascript/ 

- Giải thích về This :  https://viblo.asia/p/tat-ca-nhung-dieu-ban-can-biet-ve-this-trong-javascript-gAm5y8WEldb