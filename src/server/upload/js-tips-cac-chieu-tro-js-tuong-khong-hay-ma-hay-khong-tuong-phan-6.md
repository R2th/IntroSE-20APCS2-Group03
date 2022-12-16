Xin chào các bạn,

Theo tình hình cập nhật hiện tại, Covid vẫn đang quanh ta mà series JS tips của mình vẫn còn dài ra :D Và hôm nay mình lại tiếp tục chia sẻ với các bạn một số "trò hay" mà mình góp nhặt được. Bài viết được nằm trong series JSTips của mình, theo dõi series để có thể học hỏi hoặc đóng góp không chỉ kiến thức mà còn những lượt upvote nữa nhé:

[[JS tips series] Các "chiêu trò" JS tưởng không hay mà hay không tưởng](https://viblo.asia/s/cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-DVK2jDyjKLj)

Những thủ thuật trong kì này...mình cũng không biết phân loại ra sao. Cùng xem nào!

![](https://images.viblo.asia/98809bf6-c027-4f62-b968-4a996904e7a2.png)


<h2>1. Phát hiện việc người dùng chuyển tab trên trình duyệt</h2>

Mở đầu với một "chiêu trò" khá là thú vị (với các bạn biết rồi thì không tính nhé :D), nếu sử dụng JS lâu rồi mà chưa biết tới "trò" này (như mình) thì mình nghĩ là nên ngó qua một chút. 

JS cho phép chúng ta phát hiện được rằng người dùng đang focus vào tab của chúng ta hay không, hoặc khi họ thu nhỏ cửa sổ trình duyệt xuống (minimize browser window). Việc này có tính ứng dụng khá cao như là dừng/phát nhạc khi người dùng không sử dụng/sử dụng tab. Hay là việc chạy quảng cáo đếm giây trước khi cho phép người dùng download chẳng hạn, dừng đếm giây khi người dùng chuyển qua tab khác, và tiếp tục đếm khi người dùng ở trang của chúng ta (bắt họ phải xem quảng cáo :joy: ).

Việc này được thực hiện khá là đơn giản như thế này thôi, pure JS luôn:
```javascript
document.addEventListener('visibilitychange', function()
   document.title = document.visibilityState;
   console.log(document.visibilityState);
});
```

Và kết quả chúng ta nhận được sẽ rất là vi diệu như sau:

![](https://images.viblo.asia/8c81838e-dc1f-426c-a4a8-4536c82eb39b.gif)

Bonus thêm một chút, ngoài cách trên kia mình lượm nhặt được thì cũng có nhiều cách khác nhau để các bạn check được điều này như là ```document.hidden``` chẳng hạn:
 
 ```javascript
 document.addEventListener('visibilitychange', function()
   console.log(document.hidden); // true or false
});
 ```
 
 Kết quả thì cũng giống như bên trên:
 ![](https://images.viblo.asia/3caef409-26c7-4887-92c9-3b40054f513d.gif)


<h2>2. Phát hiện kích thước trình duyệt</h2>

Tip thứ hai này vẫn là một tip "phát hiện", nói là phát hiện kích thước trình duyệt cho oai, chứ thực tế thì không hẳn như vậy đâu 😅. Thủ thuật này cũng rất là đơn giản, và sau khi nhìn đoạn code này các bạn sẽ hiểu được là tại sao không phát hiện được kích thước trình duyệt một cách chính xác:

```javascript
const matchResult = window.matchMedia("(max-width: 767px)");
console.log(matchResult);
```

Thế đấy, nó chỉ trả ra kết quả với mỗi màn hình có kích thước max hoặc min mà ta định sẵn, cái này là ```media query``` như bên css đó. Và ```console``` sẽ cho ra kết quả như sau:

![](https://images.viblo.asia/92380d73-30cb-4bcc-9109-d2ba654058e4.gif)

Cùng viết một hàm demo để thực hiện việc check nhé:
```javascript
function isSmallScreen() {
   return window.matchMedia("(max-width: 767px)").matches;
}
```

![](https://images.viblo.asia/50d92a9b-49b4-4a85-a5b4-bf961618ce2c.gif)

<h2>3. Phát hiện light/dark mode của hệ điều hành</h2>

Trong thời gian gần đây, chế độ tối (dark mode) đã và đang được ưa chuộng bởi nhiều người dùng, nó gần như là một phần thiết yếu của một số người theo "chủ nghĩa bóng tối" - từ system dark mode, application dark mode, web dark mode, ... Vì vậy mà đã có không ít các trang web cũng sinh ra 2 giao diện là light mode và dark mode để phù hợp với xu thế. 

Và đương nhiên là mặc định light/dark mode của web sẽ được hiển thị theo chế độ của OS hoặc là trình duyệt. Vì vậy nên thủ thuật này giúp bạn có thể phát hiện được chế độ sáng hoặc tối của hệ điều hành, giúp chúng ta hiển thị mặc định light/dark mode cho trang web của mình.

Cũng giống như thủ thuật trước, ở thủ thuật này cách phát hiện cũng tương tự, nhưng ta sẽ sử dụng ```prefers-color-scheme```:

```javascript
const matchResult = window.matchMedia("(prefers-color-scheme: dark)");
console.log(matchResult.matches);
```

Và khi viết thành một hàm thì kế quả thu được sẽ là:

![](https://images.viblo.asia/f21fbe54-04ed-44f8-aeb9-d443bd586498.gif)

<h2>4. Lấy phần mở rộng của file</h2>

Thủ thuật chỉ đơn giản là lấy phần mở rộng của một file mà chúng ta đã biết tên của file đó. Giả sử ta có file ```demo.txt``` thì phần mở rộng sẽ là ```txt```. 

```javascript
var file1 = "50.xsl";
var file2 = "30.doc";
getFileExtension(file1); //returs xsl
getFileExtension(file2); //returs doc

function getFileExtension(filename) {
  /*TODO*/
}
```

Rất đơn giản phải không? Nhưng ở thủ thuật cuối cùng này chúng ta sẽ có một phép so sánh giữa các cách làm mà mình sắp liệt kê ra sau đây nhé.

<h3>4.1 Sử dụng regex</h3>

Regex là một thứ...khá là <em>lằng nhằng</em> cho dù có là ngôn ngữ lập trình phổ biến nào đi nữa và trong phần này cũng vậy:
```javascript
function getFileExtension1(filename) {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}
```

Kết quả khi sử dụng cách này với một vài lần test như sau:

![](https://images.viblo.asia/737c9c91-d8e7-4360-95c1-daeddc88655f.png)

<h3>4.2 Sử dụng phương thức split</h3>

Cách này là cách mà hầu như chúng ta sẽ nghĩ tới khi được hỏi bài toán này, chỉ đơn giản là sử dụng phương thức ```split()``` có sẵn và lấy ra phần tử cuối cùng của mảng thu được mà thôi:

```javascript
function getFileExtension2(filename) {
  return filename.split('.').pop();
}
```
Nhưng có vẻ nó cũng không chạy chính xác hoàn toàn với một số trường hợp

![](https://images.viblo.asia/c1083d6c-753a-4521-9630-e8aa23b5a8e0.png)

<h3>4.3 Sử dụng phương thức slice, lastIndexOf</h3>

Khuyết điểm của 2 solution bên trên sẽ được khắc phục bằng cách sử dụng ```slice()``` và ```lastIndexOf()``` cộng thêm một chút <em>trick</em> như sau:

```javascript
function getFileExtension3(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

console.log(getFileExtension3(''));                            // ''
console.log(getFileExtension3('filename'));                    // ''
console.log(getFileExtension3('filename.txt'));                // 'txt'
console.log(getFileExtension3('.hiddenfile'));                 // ''
console.log(getFileExtension3('filename.with.many.dots.ext')); // 'ext'
```


Mọi thứ ổn hơn rồi phải không! Nhưng mà hàm này nó đã làm gì?

- Phương thức ```String.lastIndexOf(".")``` sẽ trả ra vị trí cuối cùng mà dấu <b>"."</b> xuất hiện, nếu không có thì nó sẽ trả ra -1. Cái này thì bạn nào cũng biết đúng không!?
- Trong trường hợp tên file  là ```'filename'``` và ```'.hiddenfile'``` thì ```String.lastIndexOf(".")``` sẽ trả ra lần lượt tương ứng là -1 và 0, vậy nên là ```(filename.lastIndexOf(".") - 1``` trong 2 trường hợp này sẽ cho ra -2 và -1. Toán tử <b>shift</b> ```>>>```  sẽ chuyển -1 thành 4294967295  và -2 thành 4294967294. Để ý kĩ nhé, đây chính là <em>"một chút trick"</em> mà mình nhắc tới bên trên đó.
- Sau đó phương thức ```String.prototype.slice()``` sẽ lấy ra được phần mở rộng của file dựa vào chỉ số mà ta tính toán được ở trên. Nếu như chỉ số mà vượt quá độ dài của chuỗi thì nó sẽ trả ra chuỗi rỗng ```""```

<h3>4.4 So sánh</h3>
Mình có thực hiện test một vài cách để so sánh xem chúng chạy ra sao, thì kết quả thu được như sau (test trên Chrome 81.0.4044 / Windows 10 version 1909 build 18363.778):

![](https://images.viblo.asia/80405d24-2c0f-4dd0-b99f-d713326edaed.png)

<h2>Kết luận</h2>

Khép lại bài lần này với 3 thủ thuật chuyên về việc "phát hiện" :D và một thủ thuật cuối để lấy phần mở rộng của file. Mình hy vọng các thủ thuật này mang lại phần nào sự hứng thú cũng như bổ ích cho các bạn. Cảm ơn các bạn đã chịu khó đọc tới cuối bài, hẹn gặp lại vào các bài viết sau.

Xin cảm ơn!

<h3>Reference: </h3>

- [jstips.co](https://www.jstips.co/)
- [Medium](https://medium.com/)