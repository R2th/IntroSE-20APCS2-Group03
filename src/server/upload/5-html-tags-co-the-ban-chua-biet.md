Khi mới bắt đầu theo nghề, nhất là trên ghế nhà trường, lúc trước mình và các bạn của mình hay cùng rủ nhau thành một nhóm và tập code những website đơn giản như là: Langding page, blog,... tập code sao cho giống như web của người ta nhất rồi sau một hồi sửa thì cũng cảm thấy giống giống lúc đó cũng vui lắm. Hồi đó mình mới học thì thấy rất nhiều thẻ html nào là: `<div>`, `<p>`, `<a>`, `<b>`, `<strong>`, `<div>`,... còn **css** nữa nhiều vô kể, nên là chỉ nhớ được chừng đó thôi và hầu hết là không hiểu về **ngữ nghĩa (sematic)** của chúng, mình nhớ hầu hết là code bằng thẻ **div** thôi, đụng gì cũng thẻ **div** :v. Nhưng mà sau này tìm hiểu thì mình mới biết là có nhiều thẻ mà mình chưa bao giờ biết. Nên nay mình xin chia sẻ với các bạn để sau này có dùng thì mình còn nhớ, bổ sung thêm kiến thức cho những bạn mới.

###     1. Thẻ mark:
Là thẻ sử dụng để *hightlight* hoặc là đánh dấu 1 phần của đoạn text. Mặc định **color** của nó là màu đen và **background** là **yellow**
    
```html
<!DOCTYPE html>
<html>
    <head> </head>
    <body>
        <p>
            in this paragraph, there is a text
            <!-- 
                by default => (
                    color: black;                
                    background-color: yellow;
                )
             -->
            <mark>highlighted</mark>
        </p>
    </body>
</html>
```
    
**Output:** ![image.png](https://images.viblo.asia/ebae9476-30e0-459d-a7e8-3b1feaf32c82.png)
    
### 2. Thẻ address:
Là thẻ mang ngữ nghĩa là **hiển thị thông tin liên hệ** như là **email, phone number, address,...**

```html
<!DOCTYPE html>
<html>
    <head> </head>
    <body>
        <address>
            Posted by
            <a href="https://t.me/AyaBouchiha"> Aya Bouchiha </a>
            <br />
            Email Address:
            <a href="mailto:developer.aya.b@gmail.com">
                developer.aya.b@gmail.com
            </a>
            <br />
            Phone Number:
            <a href="tel:+212632772265">+212632772265 </a>
            <br />
            Morocco, Azemmour
        </address>
    </body>
</html>
```

**Output:** ![image.png](https://images.viblo.asia/4da0531b-af7b-4d17-8903-7d5bb552e091.png)

### 3. Thẻ noscript:
Thẻ này có thể đặt ở **body hoặc head tag** nó sẽ hiển thị một đoạn text html rằng nếu đoạn **script** không được **support** hoặc nếu **browser** disabled script. Còn không thì nó sẽ không hiển thị gì cả, thẻ này có tác dụng như một **message** thông báo cho **user** rằng đoạn script này không chạy hoặc không được hổ trợ.

> **Note:**  Bạn cũng nên chú ý rằng thẻ **noscript** có thể ảnh hưởng đến SEO khi nó được viết trên nhiều trang. Bạn hãy xem **[solutions](https://northcutt.com/seo/how-the-noscript-tag-impacts-seo-hint-be-very-careful/)** để tìm cách khắc phục.

```html
<!DOCTYPE html>
<html>
    <body>
        <script>
            alert("javascript is supported in your browser :)");
        </script>
        <noscript> Javascript is not supported in your browser :( </noscript>
    </body>
</html>
```

**Output:** ![image.png](https://images.viblo.asia/9a05a806-0777-4f53-9dc6-b402170b8c93.png)

### 4. Thẻ time:
Thẻ này đại diện cho một khoản thời gian cụ thể. Nó bao gồm thuộc tính **datetime** để mà **machine-readable** (ở đây có thể hiểu là **bot** của google có thể đọc được và hiểu). Tốt hơn cho **search engine**.

```html
<html>
    <head></head>
    <body>
        <p>
            The next meeting will be held on 
            <time datetime="2021-11-25">
                Nov 25
            </time>
            in Rabat
        </p>
    </body>
</html>
```

**Output:** ![image.png](https://images.viblo.asia/50b0a164-3194-4626-a83f-2ca065cdabe9.png)

### 5. Thẻ var:
Thẻ này giống trong **javascript** quá nhỉ :v. Thật ra về ngữ nghĩa thì **same** nhau thôi ạ, nó có nghĩa là **variables**, nhưng không phải được dùng để khai báo biến đâu nhé. Nội dung của nó là dạng **italicize**.

```html
<html>
    <head></head>
    <body>
        <div>
            <!--
                by default (
                    var {
                        font-style: italic;
                    }
                )
            -->
            <p>Ex:1 solve this equation:</p>
            <var>4x</var> + <var>2y</var> = 12
        </div>
    </body>
</html>
```

**Ouput:** ![image.png](https://images.viblo.asia/47529559-3afb-4f54-8e46-6edc2a32fd84.png)

### Summary:
`<mark>`: highlight text.

`<address>`: show thông tin liên hệ.

`<noscript>`: hiển thị một alert khi browser không hổ trợ scripting.

`<time>`: Định nghĩa một khoảng thời gian cụ thể.

`<var>`: Chỉ ra một đối tượng  như là biến.

Cảm ơn các bạn, hy vọng các bạn sẽ có thêm cho mình một chút kiến thức trên hành trang của mình!