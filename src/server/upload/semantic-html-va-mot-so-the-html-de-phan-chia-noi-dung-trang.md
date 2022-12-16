# Semantic HTML:

Semantic HTML là cách viết HTML mà sử dụng các thẻ HTML ứng với nội dung được chứa trong nó chứ không phải sử dụng các thẻ theo cách mà chúng ta muốn nội dung trong đó được hiển thị.
Ví dụ như không thể sử dụng thẻ `<h1>` để bọc 1 đoạn văn chỉ vì ta muốn đoạn văn đó có font chữ to ra. `<h1>` và `<p>` biểu diễn cho các nội dung rất khác nhau nên không thể sử dụng như thế

# Một số thẻ HTML để phân chia nội dung trang:

### 1.Thẻ `<section>`
    
Thẻ section dùng để phân chia các phần riêng biệt của trang HTML, ví dụ trong trang có các phần như About, Contact,... thì các phần này sẽ được bọc trong các thẻ `<section>`
    
### 2. Thẻ `<article>`
    
Thẻ article dùng để chứa các nội dung độc lập trong trang. Những nội dung này có thể được cắt ra mang đi nơi khác mà người dùng ở nơi khác đọc vẫn có thể hiểu được, không phụ thuộc vào nội dung chứa trong trang.

Ví dụ như trong trang có chứa phần giới thiệu về 1 quyển sách. Nội dung phần giới thiệu này bao gồm tiêu đề sách, tác giả, tóm tắt, giá,... những nội dung này có thể được trích dẫn ra rồi đem đi trang khác chia sẻ mà người dùng ở trang khác đọc vẫn có thể hiểu được nội dung này là gì. Ở đây, nội dung giới thiệu về trang sách này nên được bọc trong thẻ `<article>`

### 3. Thẻ `<nav>`
    
Thẻ nav khá dễ hiểu, nó dùng để chứa các thẻ `<a>` dẫn đến những nội dung chính của website, nên lưu ý là của website chứ không phải của trang HTML hiện tại, nav thường được bọc trong` <header>` hoặc `<footer>`.
    
Ví dụ:
```html
<nav>
  <a href="/html/">HTML</a>
  <a href="/css/">CSS</a>
  <a href="/js/">JavaScript</a>
  <a href="/jquery/">jQuery</a>
</nav>
```

**Lưu ý: Trong 1 trang có thể có 2 thẻ nav, 1 thẻ nav dẫn đến nội dung chính của website nằm ở phía trên header. 1 thẻ nav khác nằm ở phía footer, chứa đường link dẫn đến 1 số địa chỉ liên kết với website.**

### 4. Thẻ `<aside>`
Thẻ aside chứa 1 số thông tin bên lề nội dung chính của trang. Những nội dung chứa trong `<aside>` có thể bị xóa đi mà không làm ảnh hưởng đến nội dung chính của trang. Lưu ý, nếu `<aside>` nằm trong thẻ `<article>` thì nội dung nằm trong thẻ `<aside>` đó chỉ chứa thông tin bên lề nội dung chính của `<article>` chứ không phải của toàn trang.
    
Ví dụ ta có 1 trang với nội dung chính là giới thiệu về công nghệ VR, sau đó ta muốn dẫn thêm 1 vài thông tin bên lề về VR cho người xem:

```html
 <aside>
  <h3>More Article About VR</h3>
   <ol>
    <li><a href="#">Make a VR Game</a></li>
    <li><a href="#">Learn VR in Unity</a></li>
    <li><a href="#">Build Users Interfaces in VR</a></li>
   </ol>
   <blockquote>
    "Virtual reality was once the dream of science fiction. But the internet was also once a dream, and so were computers and smartphones. The future is coming."  
   <footer>
     - <cite><a href="https://www.facebook.com/zuck/posts/10101319050523971">Mark Zuckerberg</a></cite>
   </footer>
     </blockquote>
 </aside>
```

### 5. Thẻ `<main>`
Thẻ <main> dùng để chứa nội dung chính của trang, nó sẽ không chứa các thông tin như `<header>`, `<footer>`, `<aside>`,... hoặc những gì thuộc phần intro,... 
    
**Trong 1 trang chỉ có 1 thẻ `<main>` duy nhất**
    
### 6. Thẻ `<div>`
Thẻ `<div>` là thẻ không hề có Semantic meaning. Nó chỉ dùng để bọc những nội dung có liên quan đến nhau lại. Khi không tìm được thẻ thích hợp để bọc phần nội dung đó thì ta sẽ sử dụng thẻ div. 
    
Ví dụ như phần intro của trang web, nó không thể nằm trên header cũng không thể nằm trong main, khi ấy ta sử dụng thẻ div để bọc các thông tin đó lại. 

Ngoài ra, người ta còn sử dụng thẻ `<div`> để bọc những nội dung cần format giống nhau bằng CSS, cũng như tách trang thành từng phần nhỏ, để trình duyệt có thể render từng phần 1, tăng tốc độ hiển thị đến người dùng thay vì phải load toàn bộ trang mới render.
    
### 7. Thẻ `<header>` và `<footer>`
* Thẻ `<header>` bọc những thông tin giới thiệu về toàn trang web hoặc navigation bar
* Thẻ `<footer>` bọc những thông tin về trang web, thẻ footer của toàn trang thường chứa contact information, copyright information,...
**Lưu ý về thẻ `<header>` và `<footer>`: Có thể sử dụng nhiều thẻ `<header>` và `<footer>` trong trang theo nhiều trường hợp: 
1.     Đối với thẻ `<header>`, nó có thể chứa thông tin giới thiệu về element chứa nó (thường là các section)
2.     Đối với thẻ `<footer>`, nó có thể chứa những thông tin mở rộng cũng cho element chứa nó, tùy thuộc element đó là gì

# Ví dụ một trang web cụ thể:

```html
<!DOCTYPE html>
<html>
 <head>
   <title>VR Article</title>
  </head>
  
 <body>
   <div>
     <header>
       <h1>Experience VR</h1>
       <p>A simple blog about virtual reality experience</p>
       
       <nav>
         <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#articles">Articles</a></li>
          <li><a href="/#contact">Contact</a></li>
         </ul>
        </nav>
      </header>
      
     <article id="vr-articles">
       <header>
         <h2>VR Article </h2>
         <p>By: Harley</p>
         <p>Publish: June 19, 2018</p>
       </header>
       
       <img src="../../img/vr-user.jpg" alt="User trying a VR headset">
       
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce finibus urna lacus, ut lacinia elit pretium a. Praesent rutrum ac ipsum vitae rhoncus. Nam non molestie purus.</p>
       <aside>
        <q>This is a pull quote from the VR Article...</q>
       </aside>
       <p>Nunc imperdiet, dui in varius eleifend, magna enim imperdiet felis, at ultricies magna metus vitae ante. Nulla in porttitor nibh. Mauris non libero in massa porta varius non sed magna. Donec ac mauris mattis, viverra turpis ac, dictum arcu.</p>
       <p>Vivamus molestie laoreet viverra. Ut ac fringilla ex. Donec at nisl semper, commodo mi maximus, fermentum nisi. Duis bibendum gravida ante sit amet consectetur. Curabitur ac est id justo euismod porta quis ac arcu.</p>
     </article>
     
     <aside>
      <h3>More Article About VR</h3>
       <ol>
        <li><a href="#">Make a VR Game</a></li>
        <li><a href="#">Learn VR in Unity</a></li>
        <li><a href="#">Build Users Interfaces in VR</a></li>
       </ol>
       <blockquote>
        "Virtual reality was once the dream of science fiction. But the internet was also once a dream, and so were computers and smartphones. The future is coming."  
       <footer>
         - <cite><a href="https://www.facebook.com/zuck/posts/10101319050523971">Mark Zuckerberg</a></cite>
       </footer>
         </blockquote>
     </aside>
     
    <footer>
     <p>&copy;2018 Experience VR, The Blog</p> 
    </footer>
  </div>
  </body>
</html>
```

# Tổng kết:
Trên đây mình đã nói sơ qua về Semantic HTML và cách dùng của một số thẻ nhằm đảm bảo Semantic HTML. Hy vọng qua bài viết này các bạn có thể viết HTML một cách chuẩn mực hơn, không còn sử dụng các tag một cách tràn lan nhằm chỉnh font chữ hay xuống dòng,...

# Tài liệu tham khảo:
https://www.w3schools.com/html/html5_semantic_elements.asp

https://teamtreehouse.com/library/semantic-html-header-footer-and-section