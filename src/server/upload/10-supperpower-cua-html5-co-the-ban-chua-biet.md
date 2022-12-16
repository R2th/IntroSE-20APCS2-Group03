# Đặt vấn đề
Trong vòng vài năm gần đây thì càng có nhiều tính năng mới về HTML được trình làng, song song đó là nhiều tính năng mới cũng đang trong giai đoạn phát triển để hỗ trợ tối đa cho developer và cho người dùng cuối sự trải nghiệm tối ưu nhất. Có thể vì sự phát triển nhanh chóng đó mà một vài tính năng chúng ta chưa kịp nắm bắt, một vài tính năng có thể dễ dàng để nắm bắt nhưng cũng có một vài không hề dễ để tiếp cận nếu không đào sâu.

Trong bài viết này, mình sẽ liệt kê 1 số tính năng rất hữu dụng mà có thể bạn chưa biết và nó có thể sẽ giúp bạn làm việc hiệu quả hơn khi xây dựng các ứng dụng web. Một vài tính năng đã được support ở hầu hết browser, và một trong số đó thì chỉ được support hạn chế ở một số browser, cùng tìm hiểu nhé.

# Các tính năng
## 1: details and summary tags
Chắc đôi lúc bạn cũng phải tạo 1 flag gì đó (trong React hoặc Angular) để giữ state của mấy cái nút toggle trong component rồi đúng không? Sử dụng thẻ details và summary sẽ giúp bạn đỡ phải viết JS code lằng nhằng phức tạp để handle button toggle này.

**Details** và **Summary** tag được hỗ trợ trên hầu hết browsers.

{@embed: https://codepen.io/erictheodore/pen/zYYBJrj}

## 2: Native modals

Mọi người đều phải đau đầu khi tạo các component dialog và modal trong các ứng dụng web, chúng phải responsive rồi linh hoạt để hoạt động tốt trong các hệ thống lớn. Thật sự thì chúng ta đã có giải pháp đơn giản cho việc này.

Và ví dụ dưới đây là cách mà **dialog component của HTML 5.2** được dùng. 

*Warning: ví dụ này không bao gồm **polyfills** và nó chỉ hoạt động được trên Chrome.*

{@embed: https://codepen.io/erictheodore/pen/eYYzLQL}

dialog có nhiều options hữu ích để bạn có thể custom. Ghé [this blog post](https://alligator.io/html/dialog-element/) để xem nó hoạt động như thế nào nhé.

**Dialog** element chỉ hỗ trợ bởi trình duyệt Chrome. Nhưng bạn có thể sử dụng **polyfill** để có thể tương thích code của nó ở các trình duyệt khác. Hi vọng nó sẽ sớm được hỗ trợ.

## 3: calc()
**calc()** là một tính năng CSS mạnh mẽ cho phép bạn tính toán các giá trị giữa các đơn vị màn hình (%, vh, px..) để đưa ra kết quả động cho thuộc tính của một phần tử. calc() rất hữu dụng để tính toán chiều cao hoặc chiều rộng theo cách linh động với các độ cao, rộng của các màn hình khác nhau.

Đây là một function rất hữu ích, hãy làm quen với nó ngay bây giờ, ghé [post này](https://slicejack.com/how-to-use-css-calc-function/) để xem nhé. 

Ví dụ, trang của bạn có header và main section. Header có height là 100px, bạn muốn tính toán height của main để nó không vượt quá độ cao màn hình (để không bị hiển thị thanh scrollbar), bạn có thể css như sau: 

```css
header {
    height: 100px;
}
main {
    height: calc(100vh - 100px);
}
```

## 4: contenteditable attrubute
Tính năng này chứa ma thuật nếu đây là lần đầu tiên bạn biết đến nó. Nó rất hữu dụng khi tạo một vài custom input ví dụ như text, blog engine hoặc bất cứ thứ gì liên quan đến text. Nó cho phép bạn được sửa đổi text này ngay trên vị trí nó hiển thị.

{@embed: https://codepen.io/erictheodore/pen/jOOMxKm}

Ngạc nhiên chưa: *contenteditable* được hỗ trợ ở hầu hết browser, kể cả IE6.

## 5: mark tag
<p><b>mark</b> là một thể đơn giản và rất hữu dụng. Nó dùng để <mark>marks things.</mark></p> 

Cú pháp khá đơn giản, vì viblo không hỗ trợ hiển thị thẻ mark nên bạn có thể copy nó ra file và chạy thử ở browser xem nó hiện ra như thế nào nhé.
```html
<p> 
  Some important text. 
  <mark>The most important part of the text</mark>. 
  The rest of the text 
</p>
```

**mark** element được hỗ trợ bởi hầu hết browsers, IE hỗ trợ mark từ phiển bản IE9+

## 6: @supports()
CSS3 cho chúng ta khá nhiều tool để làm việc nhưng chúng ta không chắc chắn được là những tính năng này có được hỗ trợ bởi các browser khác trên những hệ điều hành khác chạy trên những thiết bị khác nhau không. **@supports** function được tạo ra để chúng ta có thể tùy biến code trong trường hợp browser không hỗ trợ tính năng đó. Nó tạo ra 1 cơ chế fallback, nếu tính năng đó không được support, nó sẽ được bỏ qua bởi browser. Tính năng này sẽ giúp code clean và dễ dàng để xây dựng những logical block.

Ví dụ:
```css
@supports (display: grid) {
   /* Display:grid is supported, place my super cool grid layout here */
}

@supports not (display: grid) {
   /* Display:grid - fallback to some older way to solve it, flexbox maybe :p?*/
}
```

Có một điều khá buồn cười là chưa chắc là chính **@supports** có được hỗ trợ bởi hầu hết browser. Nên trong thực tế thì code sẽ như sau:

```css
/* Assume display:grid is not supported, place the fallback as your main solution */

@supports (display: grid) {
   /* Display:grid is supported, override the previous one with the new implementation  */
}
```

## 7: meter and progress tags
**meter** và **progress** tag được hỗ trợ để xây dựng các progress bar và hình tượng hóa các quá trình đong đếm:

{@embed: https://codepen.io/erictheodore/pen/YzzGoBv}

Ngoại trừ ngoài hình có thể thấy được sự khác nhau của 2 thẻ trên. Về mặt chức năng nó cũng khác nhau:
- progress: được dùng để hiển thị tiến độ đang diễn ra của 1 task.
- meter: đại diện cho việc đong đếm mà đã biết trược được giá trị đã hoàn thành, ví dụ disk usage, tỉ lệ bầu chọn.

Hãy ghé [post này](https://css-tricks.com/html5-meter-element/) để hiểu thêm về meter.
Nó được hỗ trợ ở hầu hết browser, bao gồm IE10+.

## 8: Multicolumn elements
**Multicolumn** là một tập hợp CSS attribute cho phép tách HTML elements ra thành nhiều cột, rất đơn giản giống như framework Bootstrap đã offer. Hãy xem ví dụ:

{@embed: https://codepen.io/erictheodore/pen/pooEMpP}

Không cẩn phải thay đổi bất kì thuộc tính display hay sizing. Chỉ với thuộc tính "column", bạn đã có thể chia đoạn paragraph thành 3 cột, thật tuyệt vời. Để xem nó có support cho browser nào, các bạn có thể check ở [đây](https://caniuse.com/#feat=multicolumn) 

## 9: picture tag
**picture** tag được tạo ra để giải quyết những thiếu sót trong việc hiện thị ảnh trên những màn hình khác nhau (resolution) từ những nguồn khác nhau (source) hoặc kích thước khác nhau (size). 

Hãy xem ví dụ dưới đây (và cho anh ấy 1 vote, thank **CharlesKiarie**)

{@embed: https://codepen.io/erictheodore/pen/KKKgOYX}

Ở ví dụ trên, image source thay đổi khi bạn thay đổi kích thước của màn hình. Hãy thử xem. 
picture tag được support bởi hầu hết browser và có polyfill cho những bản cũ của IE.

## 10: Web Components

Sự phát triển của web và mobile application ngày càng trở nên mạnh mẽ trong vòng 5 năm gần đây, và HTML, JS đã trở thành 1 phần trong cuộc cách mạng đó. Càng ngày càng có nhiều framework được tạo ra để giúp cho developer viết code nhanh và dễ bảo trì hơn. **Web Components** được phát triển để xây dựng common convention và pattern cho 1 component ở cả ứng dụng web và mobile. 

**Web component** là tập hợp các web platform API cho phép bạn tạo ra các HTML tag custom, dễ dàng sử dụng lại ở cả web page và web app. Custom component và widget được xây dựng trên Web Component chuẩn, có thể hoạt động trên các modern browser, và tương thích với nhiều thư viện, framework JS.
Nếu bạn muốn biết nhiều hơn về **Web Component,** bạn có thể bắt đầu tại [đây](https://medium.com/@javier.ramos1/introduction-to-web-components-4c9bd528baee).

# Lời kết
Trên đây là 10 tính năng HTML mình muốn chia sẽ, hi vọng sẽ những cái mới với bạn và có cái hữu ích với bạn, và bạn sẽ biết thêm được những kiến thức hữu ích về HTML. Cảm ơn các bạn đã đọc bài.

Bài viết được tham khảo từ https://dev.to/shadowwarior5/10-superpowers-that-html5-gives-you-and-you-are-not-using-4ph1?fbclid=IwAR2Eg8HDyhIZd0amP3sWtQvQRmBjbTU6qdzBMRTb7oXqQbeIWU6yP2fA4Fk