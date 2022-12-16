Bài viết được dịch từ bài [Smooth Scroll with vanilla javascript](https://medium.com/@gurjitmehta/smooth-scroll-with-javascript-571283e9a3cd) của tác giả [Gurjit Singh](https://medium.com/@gurjitmehta).

-----
Scroll đến một element html (sử dụng selector) là một tình huống phổ biến mà các nhà phát triển web chúng ta gặp phải khá thường xuyên. Thật thú vị, vài ngày trước, tôi đã gặp một kịch bản tương tự mà tôi muốn cuộn đến một phần của trang khi tôi nhấp vào 1 button khác. Giải pháp đầu tiên xuất hiện trong đầu tôi là xử lý nó bằng jquery, điều đơn giản như sau:
```js
// Get the position of target <br />
 const position = $("#element").offset().top; <br />
// use jquery magic to get there ;) <br />
 $("HTML, BODY").animate({ scrollTop: position }, 1000);
```
Tình huống: bạn cần viết sự kiện trên 1 trang quảng cáo để nhúng tuy nhiên, Vì là trang nhúng cho nên không cho phép bạn nhúng bất kỳ thư viện nào gây ra tải nặng và xung đột với bên ngoài trang web. Vì vậy, cần phải viết bằng javascript thuần túy.

Bài viết này có thể giúp bạn viết chức năng một cách dễ hiểu.

-----
## Demo
{@embed: https://codepen.io/gurjit/pen/eLZYoy}

-----
## Điều kiện tiên quyết
Bạn cần một kiến thức cơ bản về DOM. Tôi sẽ trình bày một số ít, nhưng không chi tiết.

1. *window.scrollTo*
2. *window.requestAnimationFrame*
3. *Element.getBoundingClientRect*

-----
## Markup
Trước hết cần xây dựng hiện trường. Bạn có thể tạo bất kỳ số lượng nào bạn thích tôi sẽ chỉ chơi 6 phần có nhiều văn bản trong đó(đủ để xuất hiện thanh cuộn trang), cùng với một thanh menu điều hướng đơn giản.
```html
<body>
 <nav>
 <a href=”#one” class=”scroll”>One</a>
 <a href=”#two” class=”scroll”>two</a>
 <a href=”#three”class=”scroll”>three</a>
 <a href=”#four” class=”scroll”>four</a>
 <a href=”#five”class=”scroll”>Five</a>
 <a href=”#six” class=”scroll”>Six</a>
 </nav>
 
 <div id=”one”> …… lots of text …. </div>
 <div id=”two”> …… lots of text …. </div>
 <div id=”three”> …… lots of text …. </div>
 <div id=”four”> …… lots of text …. </div>
 <div id=”five”> …… lots of text …. </div>
 <div id=”six”> …… lots of text …. </div> 
 </body>
 
//For the styles , oh well you can do whatever fancy stuff you like ;). I gonna keep it real simple and quick ;)
nav, div { margin-bottom: 10px; } 
nav { position: fixed; background: #fff; }
```

-----
## Triển khai
Điều đầu tiên là cho phép lấy tag và áp dụng event on click, trong đó chúng ta phải sẽ `e.preventDefault();` (dừng / ngăn chặn hành vi mặc định của nó) và sẽ thực hiện một số hành vi tùy chỉnh riêng :).
```js
// Grab all the scroll class anchor elements, use whatever class you like
  const scrollElems = document.querySelectorAll('.scroll');
// Now add an event listeners to those element
for(let i = 0; i < scrollElems.length; i++){
    const elem = scrollElems[i];
    
      elem.addEventListener('click',function(e) {
       e.preventDefault();
       
       // 1. Get the element id to which you want to scroll
       const scrollElemId = e.target.href.split('#')[1];
       
       // 2. find that node from the document
       const scrollEndElem = document.getElementById(scrollElemId);
       
       // 3. and well animate to that node.. 
       const anim = requestAnimationFrame((timestamp) => {
         const stamp = timestamp || new Date().getTime();
         const duration = 1200;
         const start = stamp;
      
         const startScrollOffset = window.pageYOffset;
         const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;
      
         scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
       })
     })
   }
  }
```
1. Phần này rất đơn giản, chỉ cần nhìn lại thanh điều hướng trong đó chúng ta có các phần tử `neo` của chúng ta, vì vậy lấy từ `href` đó thành 2 phần ngăn cách bới dâu `#`, cắt lấy phần đằng sau có chứa Id của phần tử mà mình muốn cuộn .
2. Lấy element đó từ document bằng câu lệnh kinh điển và được yêu thích nhất: `document.getElementById`
3. Đây là nơi phép màu xảy ra, gọi **requestAnimationFrame**(*ND: hàm này của javascript nhá.*) cho phép bạn thực thi mã của mình trước khi lần tiếp theo trình duyệt được `vẽ` lại. Sau đó, lấy được thời điểm thời gian hiện tại và sẽ chỉ định thời gian bắt đầu và thời lượng mà mình muốn để màn hình này chạy `hoạt hình` (*ND(Người Dịch): giải thích 1 chút về câu này của tác giả nha, cái này sẽ là nguyên nhân cốt lõi gây ra cái hiệu ứng mà tin rằng đã duyệt web thì ai cũng từng tiếp xúc qua, cái mà người ta gọi là `Animations` đó*).
4. Cần lấy vị trí thanh cuộn hiện tại (`window.pageYoffset`) và vị trí của phần tử(element) mà mình muốn tiếp cận.

(*ND: Gợi ý - cần dùng đến cái vòng lặp for ở bên ngoài chẳng qua là do cấu trúc html markup mà chúng ta đã tạo ra mà thôi, bạn có thể thu gọn demo đi rất nhiều nếu thay đổi cấu trúc html về dạng chỉ còn 1 button duy nhất. thanks*)

-----
## Viết method để thực hiện Scroll đến 1 phần tử trên trang
Dưới đây là triển khai thực tế `magic method` chính của chúng ta giúp chúng ta đạt được mục tiêu của mình (Dưới đây là triển khai thực tế phương pháp ma thuật chính của chúng tôi giúp chúng tôi đạt được mục tiêu của mình: *cuộn trang một cách... mượt mà*):
```js
// Lets ignore it for the moment.
const easeInCubic = function (t) { return t*t*t }
 
const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
   const runtime = currentTime - startTime;
   let progress = runtime / duration;
   
   progress = Math.min(progress, 1);
   
   const ease = easeInCubic(progress);
   
   window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
if(runtime < duration){
     requestAnimationFrame((timestamp) => {
       const currentTime = timestamp || new Date().getTime();
       scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
     })
   }
 }
```
*Vì vậy, phương thức scrollToElem của chúng ta có 5 đối số là startTime (thời gian bắt đầu), currentTime (timeStamp), thời lượng(được thời gian xảy ra animation của chúng ta sẽ chạy), scrollEndElemTop (vị trí trên cùng của phần tử đích), startScrollOffset (vị trí bắt đầu cuộn).*

Vì vậy, những gì chúng ta làm là kiểm tra thời gian chạy(runtime) bằng cách lấy thời gian hiện tại trừ đi khỏi timeStamp bắt đầu (giúp chúng ta có được runtime).
Vì vậy, tiếp theo chúng ta sẽ chia tổng thời gian code của chúng ta đã chạy theo tổng thời lượng mong muốn để có được một yếu tố đặc biệt từ đó. Chúng ta kiểm tra ngay nếu thời gian chạy ít hơn thời lượng thực tế sẽ chạy => chúng ta sẽ gọi lại phương thức animation, cho đến khi chúng ta đạt được phần tử đích với thời lượng nhất định.

(*ND: gợi ý: bạn có thể thay đổi tham số `ease` bằng một giá trị khác ví dụ như: Math.pow(progress, 6) hay mũ 5,4,3 gì đó để thay đổi cái mà mình gọi là "nhanh dần", mình khó có thể giải thích kỹ ý nghĩa tham số này chỉ có test thực mới có thể biết rõ được tác dụng của nó lên hiệu ứng animation được tạo ra.- Mình không tự viết cái này nên cảm thấy ý tưởng của tác giả thật là pro a, ít nhất là so với mình!, nghịch xong xuôi thì phát hiện tác giả có "giải thích" 1 chút ở bên dưới*)

-----
### Chuyên mục giải đáp nghi ngờ?
**Q1. Tại sao chúng ta cần yếu tố (runtime / duration)?**

*  Trả lời: Nó có thể là do một số lý do như lấy thanh progress bar, hoặc trong trường hợp này tôi đang sử dụng tiến trình đó để có được Hiệu ứng EasInCubic.(*ND: ở trên bản thân mình đã trực tiếp chơi luôn progress^6 thay ease cho demo của mình ^^*)

**Q2. Nhưng chúng ta chỉ đơn giản là thêm vị trí hiện tại, nếu chúng ta muốn đi lên từ trên xuống thì sao?**

*   Trả lời: Nếu bạn biết rõ `Element.getBoundingClientRect()`, chúng ta sẽ lấy được các giá trị tương ứng cho top,bottom,left,right cho view port hiện tại của chúng ta. Điều đó có nghĩa là nếu chúng ta muốn vượt lên trên view port (hoặc màn hình trình duyệt), thì chúng ta sẽ nhận được giá trị newScrollOffset `âm` so với vị trí ban đầu. vì vậy vị trí hiện tại + (- vị trí elem cuối) sẽ đưa chúng ta lên top sau đó.

Vì vậy, cuối cùng ta gọi phương thức tương tự hết lần này đến lần khác (*ND: đệ quy đó bà con*) cho đến khi thời gian chạy bằng thời lượng chạy, và vì thế tiên trình sẽ dừng lại ở đó.(*ND: hay có thể hiểu là là khi progress/100 < 100% thì vẫn cứ chạy*)