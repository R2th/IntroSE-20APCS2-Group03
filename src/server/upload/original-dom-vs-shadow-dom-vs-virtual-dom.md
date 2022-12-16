## ■ Mở đầu
Với các bạn tìm hiểu về W*eb Development,* chắc hẳn không xa lạ gì với khái niệm `DOM` ? 
Hay cụ thể hơn như là `Original DOM` nhỉ :)

Ngoài các trang web nhỏ và vừa ra thì có bao giờ bạn tự hỏi, các trang web lớn như *Facebook, Twitter, GMail, etc* thì có cả một *"rừng cây Amazon"* trong `source code HTML` của mình thì họ quản lý `DOM Tree` như thế nào không?

![](https://images.viblo.asia/b460e300-064f-4aa8-b0a1-f51a7505022a.gif)

Và đương nhiên chỉ với `DOM` thôi thì các nhà phát triển web khó lòng xử lý hàng núi việc như thế. Từ đó ra đời khái niệm `Virtual DOM` và `Shadow DOM`.

Đúng như tiêu đề thì ở bài viết này các bạn hãy cùng mình tìm hiểu sâu hơn về `Original DOM`, `Shadow DOM` và `Virtual DOM` để có được cái nhìn đầy đủ hơn về chúng nhé.

*Cùng bắt đầu thôi nào ^^*

## ■ Original DOM

### Overview
Có thể bạn thừa biết 🤣🤣)) **DOM** là viết tắt của **Document Object Modal**.

`DOM` bao gồm:
* **Object-based representation of the HTML document**

    *Các phần tử trong `DOM` có cấu trúc được định nghĩa thành các đối tượng, có các phương thức, thuộc tính để có thể truy xuất dễ dàng.*
    
  *Chúng được coi như các `node` và được biểu diễn dưới dạng `DOM Tree`*.
  
 ```html
 <html>             -> document node
  <head>            -> element node - head
    <title>
      HTML DOM      -> text node
    </title>        -> element node - title
  </head> 

  <body>            -> element node - body
  </body> 

</html>
```

* **DOM APIs**

   *`HTML DOM` cung cấp các `APIs` để duyệt và chỉnh sửa các `node`.*
   
   *Ví dụ cụ thể về APIs có thể kể tới như `getElementById()` dùng để truy xuất một phần tử theo `id` cũng hay `removeChild()` dùng để loại bỏ một phần tử con dựa vào phần tử cha của nó.*
   
  
 ## ■ Shadow DOM
 ### Overview
`Mozilla` đã tóm tắt 3 đặc điểm cơ bản về **Shadow DOM**:
>  Shadow DOM can be thought of as:
> * Isolated DOM
> * A “lite” version of the DOM
> * NOT of a full standalone document

 <br/>
 
 Sở dĩ nói như vậy là do các `stylesheet` hay `javascript` từ bên ngoài **không-thể-tác-động** vào trong `Shadow DOM` được và ngược lại.
 
 Ví dụ như ta có thẻ `<Video>` như một *custom element*.
 
### Cấu trúc của một shadow DOM
Với `Shadow DOM` chúng ta sẽ có thêm `Shadow Root`.
Nội dung `Shadow Root` sẽ không được trình duyệt `render` mà thay vào đó là `Shadow Host`. `Shadow Host` được xem như một element bình thường nhưng nội dung bên trong nó (cả `stylesheet`) sẽ được đóng gói và độc lập với thế giới bên ngoài:

 ![](https://haodev.files.wordpress.com/2019/06/dd.png)
 
 ### Tạo một shadow DOM
```html
<style> p { color: green } </style>

<p id="sd-root">I am Shadow Root</p>

<script>
  const host = document.querySelector('#sd-root');
  const root = host.createShadowRoot();
  root.innerHTML = `
    
    <style> p { color: gray }</style>
    
    <p>Hello <strong>Shadow DOM</strong></p>
    
  `;
</script>
```
*Bạn đoán xem, kết quả sẽ là gì nào* 🤔🤔 . . .
<br/>

![](https://images.viblo.asia/8f53d168-06c9-44d5-9324-eeef3fd67aa6.gif)



<br/>

Ở đây khi trình duyệt render xong chúng ta sẽ nhận được: 

![](https://images.viblo.asia/f64a3a5a-df1a-4410-b021-bc4ea06aa311.PNG) thay vì là

![](https://images.viblo.asia/b058ffa5-0423-4ef4-aa8f-3c6197349f0e.PNG)

Khi `Inspect` phần tử lên ta sẽ thấy như thế này đây:

![](https://haodev.files.wordpress.com/2019/06/code-inspect.png?w=374&h=131)

Như vậy, chúng ta sẽ có vài nhận xét như sau:

* `Style` bên trong `Shadow DOM` dù conflict selector với bên ngoài nhưng không sao vì đặc tính của `Shadow DOM` (`scoped style sheet`)
* Khi chúng ta truy xuất `.innerHTML()` của element `#sd-root` thì ta CHỈ lấy được đoạn text khởi tạo: “*I am Shadow Root*” và cũng không-thể-tác-động được gì vào bên trong `Shadow Root`, cụ thể chính là `Shadow Host`.

<br/>

> Okay, chúng ta đã rõ hơn về **`DOM`**:
> - Phần sáng của nó (hay thường được gọi là **Light DOM**) là cái chúng ta có thể tương tác được.
> - Phần tối của nó, cái bóng (**Shadow DOM**) chỉ phản ánh lên nó sẽ được render thế nào khi `Light DOM` thay đổi.<br/>
> Và theo lẽ đương nhiên, ta không-bao-giờ có thể chạm được vào cái bóng của một vật nào cả 😄😄

<br/><br/>
*Oohh, `DOM` ngon vậy thì sao lại có `Virtual DOM` làm gì nhỉ ?*   🙄🙄

*Mình cùng tìm hiểu tiếp nhé* 😛😛
## ■ Virtual DOM
Mặc dù `concept` này đã xuất hiện từ khá lâu rồi nhưng nó chỉ mới trở nên phổ biến khi được sử dụng trong các thư viện nổi tiếng như `ReactJS`, `VueJS`...

### Overview

*Đúng như tên gọi của nó, DOM-ảo. Ảo, có nghĩa là không thật* :D

> Virtual-DOM là một Object chứa các thông tin cần thiết để tạo ra một DOM (Document Object Model).

`Virtual DOM` có khả năng tính toán, cập nhật các `node` mà không cần sử dụng `DOM APIs`. Sau khi cập nhật trên `DOM ảo`, các thay đổi sẽ được thực hiện với `Original DOM`.
 
Như một vài đặc điểm mình đã nêu ở trên, `Virtual DOM` được xem như một cách hiệu quả để giải quyết vấn đề cập nhật trên `DOM`, không cần `render` lại toàn bộ cả `DOM Tree`.

Dưới đây là đặc tả một `DOM Tree`:

![](https://haodev.files.wordpress.com/2019/06/html.png)

thành một `Virtual DOM`:

![](https://haodev.files.wordpress.com/2019/06/virtual.png)

*Trong thực tế, thay vì phải sử dụng `toàn-bộ-object`, chúng ta thường làm việc với các `object-nhỏ-hơn` tương ứng với các thành phần của `Virtual DOM`.*

### Cơ chế hoạt động

Ban đầu, một đối tượng có nhiệm vụ như một `snapshot` từ `virtual DOM` sẽ được tạo ra:

![](https://haodev.files.wordpress.com/2019/06/virt-cop.png)

Bản `copy` này được sử dụng để tạo `diff` để so sánh với bản `virtual DOM` ban đầu, về cơ bản thì nó sẽ có dạng như thế này:

![](https://haodev.files.wordpress.com/2019/06/diff.png)

Từ đó, giúp `Engine` biết rằng phải `update` element nào trong `original DOM`, chúng chỉ thực hiện `update` khi có sự thay đổi.

Để thực hiện việc này chỉ cần sử dụng một vòng `loop` với `diff` cho dù là thêm một `node` mới hay update  `node` cũ:

![](https://haodev.files.wordpress.com/2019/06/exam.png)

Sau đó, tiến hành cập nhật `list`, viết lại toàn bộ `template`, chạy lại hàm `render()`, hiển thị thay đổi ra ngoài `view`.

> Mặc dù nói là toàn bộ `template`, song, chỉ những phần thực sự thay đổi mới được cập nhật.
> Các thay đổi được thực hiện cho đối tượng này sau đó được đối chiếu và sửa đổi đối với `original DOM` .
>

### Why use Virtual DOM?
#### Speed
Trước đây mình nghĩ rằng lý do nói sử dụng `Virtual DOM` nhanh hơn `Original DOM` là do *việc set attribute cho object nó nhanh hơn việc update DOM*, nhưng **không phải** các bạn ạ 😂😂

*Thực tế là việc cập nhật `DOM` chẳng tốn nhiều thời gian là bao so với việc cập nhật attribute cho `object`.*

Điều thật sự ảnh hưởng tới `speed performance` ở đây là khi `DOM` thay đổi, `Browser` buộc phải ngồi tính lại `CSS`, build layout, paint template...

Vì cấu trúc của `DOM` là `tree structure` , khi muốn thay đổi các `element` và các thẻ con của nó, ta phải thông qua các `Reflow/Layout`. Từ đó, các thay đổi được sẽ được `re-painted`. Càng nhiều các `item` phải `reflow/repaint`, web của bạn sẽ càng `load` chậm 😦

*Hmmm...*

*Để hiểu sâu hơn vấn đề này, chúng ta hãy tìm hiểu thêm một khái niệm nữa đó là về cơ chế `binding`.*

#### Data-binding
Khái niệm `data-binding` có thể hiểu đơn giản là:

> `Data-binding`: Data in Model changes <=> View changes.
> 
<br/>

###### **Data-binding trong DOM thật**

Bây giờ ta lướt qua một chút các `framework` có cơ chế `data-binding` như `BackboneJS`, `AngularJS`, khi dữ liệu của `Model Object` thay đổi, nó sẽ:

1. Xác nhận các `event` + các `View Object` liên quan
2. Tác động vào các phần tử `DOM` trên `View` và phản ánh sự thay đổi dữ liệu đó.

<br/>

###### **Data-binding trong DOM ảo**

> Các `framework` sử dụng `Virtual-DOM`, `Virtual-DOM` vừa đóng vai trò là `Model`, vừa đóng vai trò là `View`
> 
<br/>

*Như vậy, khi `Virtual-DOM` thay đổi, mọi sự thay đổi trên `Model` đã kéo theo sự thay đổi trên `View` và ngược lại.*

Dù không tác-động-trực-tiếp vào các phần tử `DOM` ở `View` nhưng vẫn thực hiện được cơ chế `data-binding`. Điều này làm cho tốc độ ứng dụng tăng lên đáng kể.

### **BONUS: Virtual DOM trong ReactJS**

*Dù phần này có hơi mở rộng so với tiêu đề bài viết một chút , nhưng hôm rồi mình tình cờ đọc được một bài viết về cách `ReactJS` thao tác với `DOM ảo` khá  thú vị nên bonus vào để chúng mình hiểu sâu hơn về `Virtual DOM` nhé ^^*

Với một thư viện sử dụng `DOM ảo` như `ReactJS`, sau khi **DOM thật được load lần đầu tiên**, `DOM ảo` cũng được `React` tạo ra tương ứng với `DOM thật` bên trên. Trong React, nó cũng được gọi là một Component với tree structure gồm các Component con bên trong.

***Lưu ý:***

*Khi có một `state` mới được `set`, `React` đánh dấu nó như là một `dirty Component` (nghĩa là mỗi khi chúng ta gọi tới  `setState()` thì Component đó sẽ được đánh dấu là dirty)*


Các `event` khi ta thao tác với `DOM` được `React event listener` lắng nghe. Do đó, khi có `event` nào, `event` đó sẽ được gửi tới `React event listener` và sau đó sẽ chạy một `anonymous function()`

Trong `anonymous function()`, chúng ta gọi tới  `this.setState()` với một `new state value`.
*Sau khi `this.setState()` được chạy, Component đó được đánh dấu là dirty*.

Okay, điều gì xảy ra tiếp theo:

###### **Chạy qua Component lifecycle**

Quan trọng nhất trong quá trình update ở đây chính là `render()`, sau khi xây dựng lại Component, `DOM ảo` được tạo lại và update `DOM ảo` để tìm ra sự khác biệt*(như phần Cơ chế hoạt động mình trình bày phía trên)*, từ đó tìm ra cụ thể element thay đổi, và sau đó cập nhật chỉ những element đó ở `DOM thật`.

###### **Snapshots & Diffing**

`React` lấy một `snapshot` của `Virtual DOM` (bản ghi trạng thái ngay lúc đó) ngay trước khi áp dụng bất kỳ bản cập nhật nào. Sau đó, nó sử dụng `snapshot` này để so sánh với một Virtual DOM được cập nhật trước khi thực hiện các thay đổi.

Khi cập nhật được cấp cho `Virtual DOM` (**`Virtual DOM` sử dụng `key`, `ref` mà ở `DOM` không có và `Virtual DOM` được tạo mới sau mỗi lần render lại**), quá trình tiếp theo `React` sử dụng thuật toán `Diffing` để so sánh và đối chiếu để biết được sự cập nhật được diễn ra ở đâu sau đó cập nhật nó mà bỏ qua những elements không liên quan.

Do đó, `work-flow` của `React` thao tác với `DOM ảo` khi có `change detection`:


> 1. Xây dựng lại component
> 2. Update DOM ảo 
> 3. Tìm sự thay đổi
> 4. Update DOM thật

<BR/>

Nhờ có `DOM ảo`, `React` có thể tìm ra các `node` bị thay đổi và update ở `DOM thật` chỉ ở những cái `node` đó, thật thuận tiện và nhanh gọn phải không nào ^^

## ■ Kết

Như vậy là chúng ta đã điểm qua `Original DOM`, `Shadow DOM` hay `Virtual DOM` rồi. Hy vọng rằng bài viết này có thể giúp các bạn hiểu hơn về `DOM` và các vấn đề liên quan.

![](http://res.cloudinary.com/chatpp/image/upload/emo/0a1e52e1.gif)

Nếu bài viết này có thể giúp ích cho bạn, tặng mình `1 upvote` để có thêm động lực cho những bài viết sắp tới nha 😛😛 

Chúc bạn tuần mới làm việc hiệu quả !



## ■ Credits

- **Resources: [Viblo](https://viblo.asia/p/hieu-sao-ve-virtual-dom-trong-reactjs-bWrZngDblxw), [TechTalk](https://techtalk.vn/blog/posts/shadow-dom-la-gi), [Personal Blog](https://haodev.wordpress.com/2019/06/21/dom-vs-virtual-dom/).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2019/06/21/dom-vs-virtual-dom/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com/me/).**

<br/>


***Happy coding !***