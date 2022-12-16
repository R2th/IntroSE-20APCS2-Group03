## Giới thiệu
Đối với các rails developer thì hẳn là các bạn đã quá quen với các cú pháp trong file `.erb` như `<% %>`, `<%= %>`, `<%# %>`. Tuy nhiên, vẫn còn các cú pháp mà nhiều người chưa biết. Vì vậy, trong bài viết này mình sẽ tổng hợp những cú pháp đó và hy vọng các bạn có thể hiểu thêm về **Embedded Ruby** cũng như bỏ túi cho mình một số các cú pháp hữu dụng nhé. :clap: :clap: :clap:
## Sơ lược
Những cú pháp mà ta dùng hằng ngày được bắt nguồn từ [`eRuby`](https://en.wikipedia.org/wiki/ERuby), nó là một **templating system** cho phép viết code vào trong file HTML, tương tự như ASP, PHP, JSP, ... Bản stable release mới nhất là **1.0.5** vào ngày 14 tháng 12 năm 2004. Có ba thư viện implement thư viện này:
* [ERB](http://ruby-doc.org/stdlib/libdoc/erb/rdoc/ERB.html)
* [erubis](http://www.kuwata-lab.com/erubis/users-guide.html)
* [ember](http://snk.tuxfamily.org/lib/ember/)

Tuy nhiên, trong bài viết này, mình sẽ chỉ tổng hợp các cú pháp của `erubis` mà thôi, đơn giản là vì rails sử dụng gem này :rofl: **OK, let's go!**
## Cú pháp `-%>` và `=%>`
`-%>` dùng để loại bỏ khoảng trắng và dòng trống khi render html, còn `=%>` thực chất là chỉ thay thế cho `-%>` để dễ nhìn hơn chứ không có sự khác biệt nào cả.

**Trường hợp dùng `%>`**

**code:**
```java
<% x = "don't remove tail spaces and newline" %>

<% 5.times do |index| %>
  <%= x %>
  
<% end %>
```
**html:**
```html
<body>
    
  don't remove tail spaces and newline

  don't remove tail spaces and newline

  don't remove tail spaces and newline

  don't remove tail spaces and newline

  don't remove tail spaces and newline


  

</body>
```
**Trường hợp dùng `=%>`**

**code:**
```java
<% x = "remove tail spaces and newline" %>

<% 5.times do |index| %>
  <%= x =%>
  
<% end %>
```
**html:**
```html
<body>
    
  remove tail spaces and newline
  remove tail spaces and newline
  remove tail spaces and newline
  remove tail spaces and newline
  remove tail spaces and newline

  

</body>
```
Về phần mình thì mình thấy cú pháp này không quá quan trọng, tuy nhiên trong một số gem (ví dụ: devise) có sử dụng cú pháp này. Vì thế mình viết vào đây để các bạn có thể hiểu thêm. :grinning:
## Cú pháp `<%==`
Thông thường, để escape html tag, các bạn sẽ phải dùng `.html_safe`, `raw` hoặc là thêm hậu tố `_html` trong file `.yml` khi dùng `i18n`. Tuy nhiên, các cách này ít nhiều cũng sẽ gây bất tiện trong quá trình code. Thay vì thế, các bạn có thể dùng `<%==`, nó cũng sẽ **escape html tag** tương tự như các cách trên, ngoài ra code trông sẽ compact hơn rất nhiều! :thumbsup: 

**code:**
```java
<% x = "<span>&lt; &gt;</span>" %>

use nothing             <%= x %><br>
using &lt;%==           <%== x %><br>
using raw helper method <%= raw x %><br>
using html_safe         <%= x.html_safe %><br>
```
**html:**
```html
<body>
    use nothing <span>&lt; &gt;</span>
    <br>
    using <%== < >
    <br>
    using raw helper method < >
    <br>
    using html_safe < >
    <br>
</body>
```
## Các cú pháp khác
Ngoài ra, còn có rất nhiều các cú pháp "dị hợm" khác. Tuy nhiên, các cú pháp này không hữu dụng lắm, một số bị trùng lặp không cần thiết và một số không chạy được trong môi trường rails (chỉ chạy được trên `erubis`) nên mình sẽ bỏ qua. Nếu muốn các bạn có thể tham khảo [erubis](http://www.kuwata-lab.com/erubis/users-guide.html)  để biết thêm chi tiết nhé! :clap: :clap: :clap:
```java
<%=== ... %>
<%==== ... %>
[%= %]
<%% ... %> 
<%%= ... %>
<!--% ... %-->
<?rb ... ?>
@{...}@
@!{...}@
@!!{...}@
```
## Tài liệu tham khảo
1. [eRuby](https://en.wikipedia.org/wiki/ERuby)
2. [erubis](http://www.kuwata-lab.com/erubis/users-guide.html)