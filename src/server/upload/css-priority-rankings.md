Xin chào mọi người, trong bài viết này mình sẽ tập trung nói về vấn đề CSS Priority Rankings. Mình nghĩ đây là một kiến thức căn bản mà một Coder Front-end nên biết. Biết nó các bạn sẽ dễ dàng control CSS của mình khi sử dụng các CSS Framework trong quá trình đi xây dựng giao diện cho dự án. 

![](https://images.viblo.asia/f175ff5e-4348-4d0c-9bfe-5dcb94edd4f0.png)

# 1. CSS Priority Rankings là gì?
CSS Priority Rankings là thứ tự ưu tiên các CSS được browser quy định, thông qua đó các bạn có thể biết đâu sẽ là thuộc tính được hiển thị trong trường hợp có sự xung đột CSS trên cùng một phần tử HTML.

Dưới dây là danh sách liệt kê thứ tự ưu tiên của thuộc tính CSS:

![](https://images.viblo.asia/7e0d4ab2-327c-4f1a-9d0a-97f3a6a3785b.png)

# 2. Important
Là thuộc tính có thứ tự ưu tiên cao nhất trong CSS. Nó sẽ luôn luôn overwrite tất cả các thuộc tính CSS còn lại. Có thể nói đây là ông trùm của những ông trùm.

```html
<style>
  .red { 
      color: red; 
  }
  .blue { 
      color: blue!important; 
  }
</style>

<p class=”red blue”>Thuộc tính "important"</p>
```

- Theo quy định trên thì kết quả của đoạn text trên sẽ là màu `blue` vì ở đây chúng ta có thuộc tính **!important** được khai báo trong class `.blue`

# 3. Inline CSS
Inline CSS thường được dùng cho một phần tử HTML xác định. <style> attribute được dùng để style mỗi HTML tag.
    
Chúng ta có đoạn code sau đây:

```html
<style>
  .red { 
      color: red; 
  }
  .black { 
      color: black!important; 
  }
</style>

<h3 class=”red” style="color: blue;">Inline CSS</h3>
<h4  class=”red black” style=”color: blue;”>Inline CSS và Important</h4>
```
- Ở đây đoạn text trong tag h3 sẽ có kết quả là màu `blue` vì độ ưu tiên của Inline CSS cao hơn với việc style CSS bằng class, nhưng đoạn text trong tag h4 sẽ có màu `black` vì độ ưu tiên của thuộc tính Important cao hơn.
    
# 4. Media Query
Media Query là một trong những tính năng mới được thêm vào trong CSS3, bằng việc sử dụng những cú pháp query để chúng ta có thể đáp ứng được nhiều kích cỡ màn hình khác nhau cho riêng mỗi thiết bị: desktop, mobile, tablet.

Chúng ta có đoạn code như sau:
    
```html
<style>
  .red { 
      color: red; 
  }
  
  @media screen (mix-width: 320px) {
      .blue { 
          color: blue; 
      }
  }
</style>

<h1 class="red blue">Media Query</h1>
```
    
- Ở đây kết quả của đoạn text trong tag h1 sẽ màu blue ở kích cỡ màn hình lớn hơn 320px vì ở đây mình dùng Media Query để overwrite CSS và nếu màn hình nhỏ hơn 320px nó sẽ màu red.
    
# 5. Selector Specificity
Selector Specificity là việc dùng các thẻ ID hoặc Class để khai báo CSS, trong phần này nó có thêm một số thứ phức tạp khác như việc sử dụng Pseudo Class để khai báo CSS nhưng mình không có quá đi sâu vào cái này.

Chúng ta sẽ làm rõ phần này bằng đoạn code nhỏ như sau:
```html
<style>
  #red { 
      color: red; 
  }
    
  .blue { 
      color: blue; 
  }
    
  h2 { 
      color: yellow;
  }
</style>

<h1 class="blue" id="red">Selector Specificity</h1>
<h2 class="blue">Selector Specificity</h2>
<h2 id="red">Selector Specificity</h2>
```
- Theo thứ tự xếp độ ưu tiên thì Select phần tử HTML bằng ID > CLASS > Default tag HTML. Do đó thẻ h1 đầu tiên sẽ là `red`, thẻ h2 tiếp theo sẽ là `blue` và thẻ h2 cuối cùng sẽ là màu `red`.
    
# 6. Rule Order
Vì code của chúng ta luôn được trình duyệt đọc theo thứ tự từ trên xuống nên các CSS đặt sau cùng sẽ luôn luôn overwrite các CSS ở trên cùng.

Chúng ta sẽ làm rõ vấn đề này bằng việc khai báo hai CSS cùng dùng thuộc tính !important ở ví dụ sau:
```html
<style>
  .red { 
      color: red!important;; 
  }
    
  .blue { 
      color: blue!important;; 
  }
</style>

<h1 class="blue red">Rule Order</h1>
```
- Ở đây kết quả sẽ là màu `red` vì CSS của classs .red đứng sau CSS của class .blue
    
# 7. Browser Default
Browser Default là những CSS mặc định mà các trình duyệt quy định vì mỗi tag HTML sẽ được browser hiển thị theo từng các khác nhau và nó cũng là những CSS có cấp độ ưu tiên thấp nhất. 
    
# 8. Tổng kết
- Trên đây là thứ tự độ ưu tiên khi làm việc với CSS, rất hữu ích cho các bạn Front-end mới tập tãnh vào nghề, h vọng bài viết sẽ giúp ích cho các bạn. Cám ơn các bạn đã theo dõi!
- Nguồn: [thebookdesigner](https://www.thebookdesigner.com/2017/02/styling-priorities-css-for-ebooks-3/)