### Mở đầu
Một vài ngày trước, tôi đã đọc một bài viết về `CSS Grid-system`. Có vẻ như còn nhiều thứ để theo dõi hơn là chỉ xây dựng grids với `Flexbox`, những gì đang làm việc tốt cho công việc của tôi. Nhưng với tư cách là một Developer, bạn không bao giờ thực sự biết được thứ gì đó hữu ích cho đến khi bạn thực sự thử nó. Vì vậy, hãy làm điều đó. Tôi sẽ tạo hai thiết kế cơ bản. Một sử dụng `Flexbox` và một sử dụng `Grid-System`.

![](https://images.viblo.asia/f817cfcd-1d53-487d-9467-341dd5f1b778.png)
######                                       Đó là những gì chúng ta muốn xây dựng

### Thực hiện bằng Flexbox và Grid
Sử dụng `Flexbox` để xây dựng bố trí thực sự là dễ hình dung nếu bạn hiểu khái niệm đó. Nó thực sự chỉ giúp bạn đặt hai item cạnh nhau, điều đó có nghĩa là nó đang chuyển tất cả các phần tử con vào trong "pseudo-inline-elements". Điều đó cũng có nghĩa là bạn phải suy nghĩ rất nhiều về cách bạn đặt các phần tử HTML của mình. Mỗi div-Element,  sẽ là một row đang chuyển vào một container bằng cách sử dụng `Flexbox`. Cuối cùng tôi sử dụng code dưới đây để xây dựng bố cục cho thiết kế tôi đã đưa ra ở trên:

`HTML`
```
<body>
    <header class="box">Header Content</header>
    <div class="flex Container">
        <div class="contentContainer">
            <div class="mainContainer flex">
                <main class="box">Main Content</main>
                <section class="box">Main Content</section>
            </div>
            <footer class="box">Footer Content</footer>
        </div>
        <sidebar class="box">Sidebar Content</sidebar>
    </div>
</body>
```

`CSS`
```
html {
    background: darkred;
    font-family: 'Avenir'
}
footer, header {
    height: 26vh;
}
.box {
    color: darkred;
    background: rgb(233, 233, 233);
    text-align: center;
    padding: 2em 1em;
    margin: 5px;
}
.mainContainer {
    height: 26vh;
}
.flex {
    display: flex;
}
.contentContainer {
    flex: 2;
}
sidebar {
    flex: 1;
    height: 52vh;
}
.flex > main, section {
    flex: 1;
}
```

Bây giờ chúng ta hãy xem một chút đến cách tiếp cận Grid.
> `CSS Grid Layout` là hệ thống bố cục mạnh mẽ nhất có sẵn trong `CSS`. Nó là một hệ thống 2 chiều, có nghĩa là nó có thể xử lý cả cột và hàng, không giống như `Flexbox` mà phần lớn là một hệ thống 1 chiều.
> 
Chúng ta có thể xây dựng bố cục hai chiều bằng cách sử dụng `Grid`! Khi mà tôi có thể ít tập trung hơn vào cấu trúc khi sắp đặt HTML, tôi có thể trực tiếp bước vào CSS và quyết định xem giao diện nó sẽ trông như thế nào. Thông thường, bạn đặt template-rows và template-columns và cung cấp cho chúng một width và height. Hơn nữa, bạn có thể quyết định column nào trong các phần tử row sẽ bắt đầu và kết thúc. Tuy nhiên tôi nhận ra rằng có một phương pháp mạnh mẽ trong `CSS-Grid`. Đó là sử dụng `Grid-Areas`. Cơ bản là đặt tên cho mỗi class CSS và xây dựng một template trực tiếp với những class CSS đó. Cùng xem này:

`HTML`
```
<body>
    <div class="gridContainer">
        <header class="box">Header Content</header>
        <main class="box">Main Content</main>
        <section class="box">Main Content</section>
        <sidebar class="box">Sidebar Content</sidebar>
        <footer class="box">Footer Content</footer>
    </div>
</body>
```

`CSS`
```
html {
    background: darkred;
    font-family: 'Avenir'
}

.gridContainer {
    display: grid;
    grid-gap: 5px;
    
/* Chúng ta setup một chuỗi string cho mỗi row trong bố cục. 
Mỗi row phải có số phần tử bằng với row có nhiều phần tử nhất - trong trường hợp này là row 2 */
    grid-template-areas: 
        'header header header' 
        'main section sidebar' 
        'footer footer sidebar';
    grid-template-rows: 32vh 32vh 32vh;
}

header { grid-area: header; }
main { grid-area: main; color: white;}
footer { grid-area: footer; color: white;}
sidebar { grid-area: sidebar; color: white}
section { grid-area: section; color: white}

.box {
    color: darkred;
    background: rgb(233, 233, 233);
    text-align: center;
    padding: 2em 1em;
}
```

Chúng ta phải khai báo placeholders cho mỗi row và thiết lập bao nhiêu không gian các element này sẽ chiếm trong row đó tương quan so với các element khác. Hãy thử đưa nó vào như bản demo của tôi. `Grid` thật tuyệt.

### Kết luận
Vậy chúng ta nên sử dụng cái nào đây?

Điều đó hoàn toàn phụ thuộc vào những gì bạn muốn xây dựng. Tôi sẽ không nói `Grid-system` sẽ thay thế các bố cục `Flexbox`, nhưng chúng sẽ (nếu bạn quen với ý tưởng này) có thể nhanh hơn để sử dụng và giúp bạn tùy chỉnh bố cục của element cha và không phụ thuộc vào cấu trúc của `HTML`. Điều này sẽ được nhận thấy khi bạn làm việc với dữ liệu động. Tuy nhiên, cả hai đều cho phép bạn sử dụng các thuộc tính `CSS` như align-items và justify-content mà chỉ cực kỳ tiện dụng cho các element đơn lẻ, `Flexbox` có lẽ là lựa chọn tốt hơn cho những ý tưởng đó.

Hy vọng bạn sẽ thích bài viết này và thấy nó bổ ích.