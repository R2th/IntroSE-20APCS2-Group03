Đối với hầu hết chúng ta, HTML là bước đầu tiên của chúng ta khi đặt chân vào Web Development. Bình thường chúng ta có thể viết HTML bằng cú pháp truyền thống, nhưng khi chúng ta phát triển, thì các công cụ của chúng ta cũng như vậy. CSS, với các dấu ngoặc , dấu chấm phẩy,... thì cuối cùng đã tạo SASS, nó cho cho phép code chúng ta clean hơn, code nhanh hơn, và còn mang tới rất nhiều chức năng đáng chú ý. 


Bây giờ, trong thời đại của các Code Editor, HTML đã được cải tiến. Chúng ta không còn phải lo lắng về việc đóng thẻ hay việc copy/pasting nhưng thẻ trùng lặp. Ví dụ như 1  `<ul>` có thể được tạo bằng 2 dòng cho  dù có bao nhiêu thẻ `<li>` được chứa trong nó, hay bạn có thể sử dụng những vòng lặp,... Điều này có thể thực hiện được là nhờ một template engine cho Node.js và nó được gọi là Pug (trước đây được gọi là Jade).


Nếu bạn muốn tìm hiểu trước về Pug và các tính năng của nó , thì bạn tìm hiểu tại [đây](https://pugjs.org/api/getting-started.html)


## Cài đặt Pug

Cài đặt Pug dễ dàng như cách sử dụng nó. Theo đúng nghĩa đen, bạn có thể cài đặt và bắt đầu sử dụng pug trong vài phút. Pug giống như các nói Node package khác, có thể cài đặt thông qua các lệnh npm hoặc yarn, cụ thể như sau :


* Đối với npm:

```
npm install pug-cli -g
```

* Đối với yarn: 

```
yarn global add pug-cli
```

Để biên dịch một tệp (ví dụ: example.pug thành example.html), chúng ta sử dụng:

```
pug -P example.pug
```

##  Pug là một template engine hoàn chỉnh cho HTML?


Giống như nhiều ngôn ngữ khác, nó cung cấp các cấu trúc điều khiển (nếu, trừ khi, mỗi, trường hợp…),...


**Syntax**

Tên của các thẻ trong Pug được  lấy cảm hứng từ cú pháp CSS. Ngoài ra, cú pháp phụ thuộc vào thụt đầu dòng của nó làm cho nó trở nên cô đọng hơn, dễ đọc hơn và ít gặp vấn đề về việc không có thẻ đóng hơn.

Đây là 1 ví dụ cụ thể:

```
article#article-1
  h2 Class and id
  .class Class
  #id Id
```

Chúng ta sẽ nhận được HTML như sau:

```html
<article id="article-1">
    <h2>Class and id</h2>
    <div class="class">Class</div>
    <div id="id">Id</div>
</article>
```

**Mixins**

Để sử dụng lại các phần code một số nơi mà không cần viết lại cấu trúc hoặc các tham số,thì chúng có các mixin.

Ví dụ về mixin đại diện cho một biểu tượng với văn bản, hình ảnh, liên kết:

```
mixin textIcon(text, image, url)
  a(href=url).text-icon
    figure
      img(src=image, alt=text + ' icon').icon
      figcaption.text=text
```


Việc sử dụng một mixin được thực hiện bằng cách đặt trước tên của nó bằng dấu `+`. Trong trường hợp của chúng tôi, đó là `+ textIcon`:


```html
.icon-list
  +textIcon('Chrome', '/images/chrome-logo.png', 'https://www.google.fr/chrome/index.html')
  +textIcon('Firefox', '/images/firefox-logo.png', 'https://www.mozilla.org/fr/firefox')
  +textIcon('Edge', '/images/edge-logo.png', 'https://www.microsoft.com/fr-fr/windows/microsoft-edge')
  +textIcon('Safari', '/images/safari-logo.png', 'https://www.apple.com/fr/safari')
```

Khi nó được biên dịch qua HTML, nó sẽ trong như thế này:

```html
<div class="icon-list">
    <a class="text-icon" href="https://www.google.fr/chrome/index.html">
        <figure>
            <img class="icon" src="/images/chrome-logo.png" alt="Chrome icon" />
            <figcaption class="text">Chrome</figcaption>
        </figure>
    </a>
    <a class="text-icon" href="https://www.mozilla.org/fr/firefox">
        <figure>
            <img class="icon" src="/images/firefox-logo.png" alt="Firefox icon" />
            <figcaption class="text">Firefox</figcaption>
        </figure>
    </a>
    <a class="text-icon" href="https://www.microsoft.com/fr-fr/windows/microsoft-edge">
        <figure>
            <img class="icon" src="/images/edge-logo.png" alt="Edge icon" />
            <figcaption class="text">Edge</figcaption>
        </figure>
    </a>
    <a class="text-icon" href="https://www.apple.com/fr/safari">
        <figure>
            <img class="icon" src="/images/safari-logo.png" alt="Safari icon" />
            <figcaption class="text">Safari</figcaption>
        </figure>
    </a>
</div>
```

**Loop**

Bạn cũng có thể thực hiện các thao tác lặp  bằng cú pháp each-in hoặc while. Trong đoạn mã bên dưới, chúng tôi đã lặp qua một mảng để hiển thị danh sách các biến (lưu ý việc sử dụng 'li =' để đánh giá "val" như một biến bên dưới. Giá trị bạn lặp lại cũng có thể được chuyển vào mẫu như một biến!)

```
ul
  each val in [1, 2, 3, 4, 5]
    li= val
```


Khi đó chúng ta sẽ nhận được mã HTML như sau:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

Nếu bạn muốn tìm hiểu sâu hơn, và nhiều hơn tại đây:

1. [https://pugjs.org/api/getting-started.html](https://pugjs.org/api/getting-started.html)
2. [https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Template_primer](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Template_primer)