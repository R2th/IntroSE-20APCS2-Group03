Bài viết này mình sẽ trình bày về việc sử dụng một số thẻ trong HTML và những điểm lưu ý sau khi so sánh giữa [WHATWG](https://html.spec.whatwg.org/multipage/) và [W3C](https://www.w3.org/TR/html52/)

## <article> với <section>
> A section forms part of something else. An article is its own thing. But how does one know which is which? Mostly the real answer is "it depends on author intent"
> 
> [4.3.12.1 Article or section? | HTML Standard](https://html.spec.whatwg.org/multipage/sections.html#article-or-section)

### <article>
>  in principle, independently distributable or reusable
> 
> [4.3.2 The article element | HTML Standard](https://html.spec.whatwg.org/multipage/sections.html#the-article-element)
> 

Vì có khả năng phân bổ đọc lập nên được sử dụng trong cái blog hoặc các bài viết tin tức
### <section>
> A section, in this context, is a thematic grouping of content, typically with a heading.
> 
> [4.3.3 The section element | HTML Standard](https://html.spec.whatwg.org/multipage/sections.html#the-section-element)
> 
Sử dụng để tổng hợp những nội dung tiêu đề

## Tóm lại
- Những nội dung như là blog hoặc bình luận thì có thể dùng <article>
- Trường hợp không phải nội dung đó nếu là tổng hợp nội dung tiêu đề thì dùng <section>
- Ngoài các trường hợp trên thì dùng thẻ <div>

## Quan điểm về <main>
<header> với <footer> đúng như cái tên rất dễ hiểu nhưng mà <main> sẽ hiển thị nội dung gì thì hơi khó hiểu. Phần này sẽ phụ thuộc vào phán đoán của người implement. 

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Graduation Ceremony Summer 2022</title>
  </head>
  <body>
    <header>The Lawson Academy:
      <!-- 省略 -->
    </header>

    <main>
      <h1>Graduation</h1>
      <!-- 省略 -->
    </main>

    <footer> Copyright 2012 B.lawson</footer>
  </body>
</html>
```

Theo code ví dụ [HTML 5.2](https://www.w3.org/TR/html52/grouping-content.html#example-d638f6dc) thì sẽ được sắp xếp theo thứ tự `<header>/<main>/<footer>`

Có một điểm cần chú ý đó là với IE11 để không bị vỡ layout thì sẽ cần phải chỉ định thuộc tính sau
```
main {
  display: block;
}
```

[HTML5 semantic elements | Can I use](https://caniuse.com/#search=main)

## Sử dụng <aside> 

[<aside>: 余談要素 | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/aside)
aside dùng để biển hiện những nội dung ngoài lề. Nói như thế thì có vẻ khó hiểu và mơ hồ nhưng mà cụ thể là hiển thị những thứ như là link quảng cáo.
    
## Có được sử dụng nhiều tag <nav>
> In the following example, there are two nav elements, one for primary navigation around the site, and one for secondary navigation around the page itself.
> 
> [4.3.4 The nav element | HTML Standard](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element)
> 

Theo code mẫu của WHATWG đang được sử dụng 2 cái <nav>. Tuy nhiên chỉ nên sử dụng cho navigation quan trọng, chủ yếu, thông thường 2 cái là hợp lý.
    
## Có nên sử dụng nhiều <h1>
WHATQWG với W3C có sự khác nhau 
```
<!-- WHATWG nếu section sử dụng nhiều h1 cũng OK -->
<body>
 <h1>Let's call it a draw(ing surface)</h1>
 <section>
  <h1>Diving in</h1>
 </section>
</body>

<!-- W3C sử dụng h1-h6 -->
<body>
  <h1>Let’s call it a draw(ing surface)</h1>
  <section>
    <h2>Diving in</h2>
  </section>
</body>
```

Theo WHATWG không sao nhưng W3C thì không nói là không được nhưng mà trong phạm vi có thể không sử dụng nhiều thẻ h1, nên sử dụng chia ra làm nhiều thẻ h1-h6. Khi chia ra nhìn sẽ dễ nhìn hơn

## Trong <a> có <div> không 
>  The a element may be wrapped around entire paragraphs, lists, tables, and so forth, even entire sections, so long as there is no interactive content within (e.g. buttons or other links).
> 
> [4.5.1 The a element | HTML Standard](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
> 

Sử dụng không có vấn đề gì vì sao lại thế ? vì trong thẻ <a> có thẻ <div> hoặc <section> thì nhìn thẻ <a> có cảm giác đẹp, dễ nhìn hơn
    
 ## Trong <a> có <a> không
>     there must be no interactive content or a element descendants.
> 
> 4.5.1 The a element | HTML Standard
> 
Cái này không được phép. Vì nó sẽ vỡ layout
Ngoài tag <a> ra những tag như <button> <input> cũng không được phép sử dụng trong tag <a>

## Trong <span> có <span> không
>     Most elements that are categorized as phrasing content can only contain elements that are themselves categorized as phrasing content, not any flow content.
> 
> [3.2.5.2.5 Phrasing content | HTML Standard](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content)
> 

Sử dụng OK

## Image đương nhiên sẽ sử dụng <figure> ?
>    The element can thus be used to annotate illustrations, diagrams, photos, code listings, etc.
> 
> [4.4.12 The figure element | HTML Standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element)
> 

Nếu là image thì không hẳn là OK, theo đúng tên thì sẽ dùng để chỉ cái như là bản đồ, tranh minh hoạ, nếu như không có những cái đó thì sẽ không ảnh hưởng đến flow của đoạn văn thì sẽ được sử dụng. 
Nếu không phải trường hợp đó thì không sử dụng <figure>  nên sử dụng tag  kiểu như <p> đặt bên trong văn cảnh.
    

## Muốn sử dụng <picture>
   ```
    <picture>
    <source srcset="/media/examples/frog.png" media="(min-width: 1000px)">
    <img src="/media/examples/fish.png">
</picture>
   ```
   
   [<picture>: Image Element](https://developer.mozilla.org/ja/docs/Web/HTML/Element/picture)
 Ở những chỗ media chuyển qua sử dụng image sẽ rất tiện dụng nên tích cực sử dụng image nhưng mà từ HTML5.1 trở đi IE11 cần phải sử dụng [Picturefill](http://scottjehl.github.io/picturefill/)
    
## Chữ nhỏ dùng <small> 
>    Small print typically features disclaimers, caveats, legal restrictions, or copyrights. Small print is also sometimes used for attribution, or for satisfying licensing requirements.
> 
> [4.5.4 The small element | HTML Standard](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-small-element) 
> 
Sử dụng text ngắn trong kí hiệu pháp luật hoặc là bản quyền. Không sử dụng để làm nhỏ chữ, trường hợp này sử dụng CSS. 

## <em> với <strong> cái nào để nhấn mạnh 
>     The em element also isn't intended to convey importance; for that purpose, the strong element is more appropriate.
> 
> [4.5.2 The em element | HTML Standard](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-em-element)
> 
Cái nào cũng dùng để nhấn mạnh đơn thuần dùng <em>. Hiển thị tính quan trọng hoặc là tính nghiêm trọng sẽ sử dụng <strong>

Ví dụ:
```
<!DOCTYPE html>
<html>
  <head>
    <!-- meta -->
  </head>
  <body>

    <header>
      <h1>タイトル</h1>
      <nav>
        <ul>
          <li><a>リンク1</a></li>
          <li><a>リンク2</a></li>
          <li><a>リンク3</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <h2>見出し1</h2>
        <p>吾輩は猫である。名前はまだ無い。</p>
        <section>
          <h3>見出し2</h3>
          <p>どこで生れたかとんと見当がつかぬ。</p>
        </section>
      </article>
      <aside>
        <h2>関連リンク</h2>
        <ul>
          <li><a>リンク1</a></li>
          <li><a>リンク2</a></li>
          <li><a>リンク3</a></li>
        </ul>
      </aside>
    </main>

    <footer>
      <p><small>©Copyright</small></p>
    </footer>

  </body>
</html>
```
                                                                          
  
Tham khảo: https://qiita.com/noplan1989/items/cf3ba7b8a5da82f4150d