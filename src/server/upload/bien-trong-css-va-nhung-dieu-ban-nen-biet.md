Trước khi đọc bài viết này thì bạn hãy trả lời câu hỏi biến là gì nhé! 

Chắc là tất cả các bạn **trai ngành và gái ngành** điều biết.
Okay, vậy chúng ta bắt đầu nhé!


Hầu hết tất cả các ngôn ngữ lập trình đều hỗ trợ biến, nhưng **CSS** - một trong những ngôn ngữ Markup quan trọng lại không hỗ trợ cho bạn dùng biến khi mới bắt đầu.

Bạn viết **CSS** và bạn sẽ không thể dùng biến để đặt tên cho một color chung, hay một thuộc tính dùng đi dùng lại nhiều lần, trừ khi bạn sử dụng *SASS* hoặc *LESS* để viết. Nhưng dùng *SASS* hay *LESS* thì cuối cùng nó cũng chỉ bind ra CSS thuần mà thôi.

> SASS và LESS là gì thì các bạn tự tìm hiểu nhé :D

Nhưng làm gì có cái gì dậm chân một chỗ, đến nay chúng ta có thể sử dụng biến trong **CSS** thuần mà không cần các thứ các thứ như *SASS* hay *LESS* kể trên.

Trong bài viết này, mình sẽ chỉ cho các bạn thấy được cách biến làm việc trong CSS thuần như thế nào và cách mà bạn vận dụng nó trong  code để **make life a lot easier**.

# Tại sao biến lại quan trọng
### More Readable code
Điều này thì có lẽ cũng k cần phải nói quá nhiều, viết code mà chỉ có mình đọc được thì quá lởm rồi =))
### Dễ dàng thay đổi
Bạn cứ tưởng tượng bạn có một dự án, có rất nhiều button, rất nhiều text, vân vân và mây mây đều sử dụng một mã màu A.
Điều gì sẽ xảy ra khi designer thay đổi mã màu A thành B.
Nếu không có biến, bạn sẽ phải đi dò hàng nghìn dòng có mã màu A để thay đổi. Ngược lại, có khai báo biến, bạn chỉ cần thay đổi mã màu cho biến. Chỉ cần thay đổi một chỗ. **Life is easy!**

# Khai báo biến trong CSS
Chúng ta nói qua Javascript một chút nhé
> Khai báo 1 biến
```javascript
var a;
```
và sau đó chúng ta có thể gán giá trị cho biến đó:
```
a = 'We make it awesome!'
```

Trong CSS, chúng ta khai báo biến với bất kì thuộc tính nào bằng cách thêm 2 dấu gạch ngang trên.
Ví dụ:
```CSS
.example {
    color: #373acd;
    /*variable*/
    --color: blue;
}
```

# Phạm vi biến trong CSS
Bất cứ ngôn ngữ nào cũng sẽ có biến cục bộ và biến toàn cục.
Và CSS cũng không ngoại lệ
Nó cũng có **global** và **local variable**

Để khai báo 1 biến có phạm vi toàn cầu, chúng ta sẽ có như sau: 
```CSS
:root {
    --color: #333;
}
```

Selector **:root** cho phép chúng ta target đến phần tử cao nhất trong DOM hoặc document.

Nên khi cần khai báo một biến toàn cục, chúng ta sẽ khai báo như thế :D
**GOT IT?**

Khai báo 1 biến Local thì giống như phía trên nhé :D


# Cách dùng biến CSS
Với SASS, chúng ta có thể dùng biến như thế này:
```CSS
$accent-color: #acd373;

.test {
     color: $accent-color;
}
```

Nhưng với CSS thuần thì không dùng được thế đâu, chúng ta sẽ có một xí khác biệt =)). Nó sẽ hơi giống Javascript một tý (đây là lí do mình nhắc đến khai báo biến trong Javascript ở trên)
```CSS
:root {
    --accent-color: #acd373;
}

.test {
    color: var(--accent-color);
}
```

> Muốn dùng biến trong CSS thuần thì nhớ dùng **var()** nhé

CSS quá vi diệu nhé, bạn sẽ cảm thấy thích thú CSS đấy, nhưng hãy cẩn thận =))
Chỉ sai một dòng cũng có thể đi cả hệ thống đấy nhé :D 
# Các thuộc tính khác
### 1. Biến CSS có thể dùng được với thẻ HTML
```html
<!--HTML-->
<html style="--color: red">

<!--CSS-->
body {
  color: var(--color)
}
```

### 2. Biến trong CSS cũng có tính thừa kế và xếp tầng nhé
```CSS
div {
  --color: red;
}

div.test {
  color: var(--color)
}

div.ew {
  color: var(--color)
}
```

Như với các biến thông thường, giá trị --color sẽ được thừa kế bởi các div.

### 3. Các biến CSS có thể sử dụng  với @media và các quy tắc có điều kiện khác

```CSS
:root {
 --gutter: 10px 
}

@media screen and (min-width: 768px) {
    --gutter: 30px
}
```
# Ví dụ đơn giản với Biến trong CSS

Ok, trải qua những thứ ở trên, chúng ta hãy cùng make một ví dụ đơn giản với biến nhé.

Chúng ta sẽ có một đoạn HTML như sau:
```html
<button class="btn">Hello</button>
<button class="btn red">Hello</button>
```

Chúng ta có một base class là *btn* và có những class khác để thay đổi màu của button là *red*

Ok, cùng CSS một tý cho base class nhé: 
```CSS
.btn {
  padding: 2rem 4rem;
  border: 2px solid black;
  background: transparent;
  font-size: 0.6em;
  border-radius: 2px;
}
/*on hover */
.btn:hover {
  cursor: pointer;
  background: black;
  color: white;
}
 ```

Chúng ta sẽ CSS một xúi cho class red nhé.
Đây nhé :)

```CSS
.btn.red {
  border-color: red
}
.btn.red:hover {
  background: red
}
```

Có phải bạn đang tự hỏi vậy dùng Biến ở đâu đúng không, vậy chúng ta cùng đổi một xí nhé.
CSS cho class ***btn***
```CSS
.btn {
   padding: 2rem 4rem;
   border: 2px solid var(--color, black);
   background: transparent;
   font-size: 0.6em;
   border-radius: 2px;
 }
 /*on hover*/ 
 .btn:hover {
  cursor: pointer;
   background: var(--color, black);
   color: white;
 }
```

Khi viết thế này
>    background: var(--color, black);

có nghĩa là set màu background là màu của biến --color, nếu không có biến  --color thì nó sẽ lấy màu black để thay thế nhé.

**Remember cái này nhé!**

Chúng ta chưa khai báo biến --color, chúng ta sẽ khai báo cho nó ở class red nhé

```CSS
.btn.red {
   --color: red
 }
```
Vậy là done!
Sau đó chúng ta sẽ có kết quả như thế này.
![](https://images.viblo.asia/75e3868a-ed8f-4a66-af47-6ad84f758d24.gif)

Vậy là bài viết của mình đã hết rồi :)
Bạn có thể tham khảo ví dụ trên của mình cụ thể hơn [ở đây](https://codepen.io/ohansemmanuel/full/PQYzvv/) nhé :D

Cám ơn các bạn đã theo dõi bài viết.
Hi vọng các bạn sẽ thấy CSS thú vị và tìm hiểu về nó nhiều hơn nữa :D

**Happy Hacking!**