Chào mọi người,
Hôm nay mình xin giới thiệu một bài viết về helper html_safe mà mọi người hay xài cách hoạt động và tại sao Rubocop lại warning khi gọi html_safe
# html_safe hoạt động như thế nào
Bằng cácg gọi html_safe trên một chuỗi trả về một đối tượng mới mà nhìn và cư xử giống như một String, tuy nhiên thực sự là ActiveSupport::SafeBuffer
```
"foo".length
# => 3
```
```
"foo".class
# => String
```
```

"foo".html_safe.length
# => 3
```
```
"foo".html_safe.class
# => ActiveSupport::SafeBuffer
```
Behavior(hành vi) của SafeBuffer khác với một String chỉ với 1 chỗ là khi bạn append 1 String vào một SafeBuffer( bằng cách gọi + hay <<), thì chuỗi String đó được HTML-escaped trước khi được append vào SafeBuffer
```
"<foo>".html_safe + "<bar>"
# => "<foo>&lt;bar&gt;"
```
Khi bạn append SafeBuffer khác vào một SafeBuffer, sẽ không xảy ra escape

```
"<foo>".html_safe + "<bar>".html_safe
# => "<foo><bar>"
```
Chú ý khi gọi html_safe trên một chuỗi nó không escape hoặc unescape bản thân chuỗi đó. Nó lhông thay đổi hoàn toàn chuỗi đó. Tất cả việc nó là trả về 1 SafeBuffer mà sẽ handle(xử lý) việc concat(ghép) sau này khác với 1 String
# Làm sao Rails tự động escape trên view
Rails renders view của bạn vào một SafeBufferr. Nó bắt đầu với 1 SafeBuffer rỗng và appends one by one các component của views của bạn vào trong đó. Có nghĩa là bất kì <%= expression %> trong view teamplate sẽ được HTML-escaped nếu expression không trả về 1 SafeBuffer, cái mà không cần escaped.
Hãy xem ví dụ dưới đây

```
<p>
  <%= '<br />' %>
  <%= '<br />'.html_safe %>
</p>
```
Vào ở nơi nào đó thì Rails sẽ biến cái ở trên thành Ruby expression như cái này:
```
html = ''.html_safe
html << '<p>'.html_safe
html << '<br />'
html << '<br />'.html_safe
html << '</p>'.html_safe
html
```
Nếu bạn inspect thử đoạn ở trên qua HTML, chúng ta sẽ có kết quả như sau:
```
<p>
  &lt;br /&gt;
  <br />
</p>
```
# Những kinh nghiệm sương máu khi dùng sai và làm sao sửa lại
Trong này sẽ nói làm thế nào để html_safe có thể bị dùng sai và dẫn đến trang web của bạn bị tấn công bởi XSS. XSS đại loại là một kiểu tấn công mạng thường gặp khi người muốn tấn công sẽ chèn những lệnh script(Javascript) và các ô input để lấy thông tin của trang web
Hãy đặt tình huống chúng ta cần viết một helper method mà nhận vào một số content và bao nó trong thẻ <div> với class là "group". Vậy đầu tiên chúng ta sẽ implement giống như sau

```
def group(content)
  "<div class='group'>#{content}</div>"
end
```
Chúng ta chạy thử và nhận ra là method này đã escape quá nhiều. Content sẽ xuất hiện như sau
```
&lt;div class='group'&gt;content&lt;/div&gt;
```
Và một lỗi thông thường khi thấy những kí tự escape này, bạn sẽ nhanh chóng nãy lên là dễ thôi thêm html_safe vào là được

```
def group(content)
  "<div class='group'>#{content}</div>".html_safe
end
```
Chúng ta vừa tạo ra một helper mà bảo đảm trả về giá trị được html_safe. Bằng cách mở rộng, nó đảm bảo nội dung được an toàn, khi nó thực sự không biết gì về nội dung. Nếu content là không an toàn khi user nhận, It sẽ render unescaped
```
<div class="group"><script>alert('pwned!')</script></div>
```
Vậy nghĩ lại cái chúng ta thực sự cần chính là sẽ escape content nếu nó không an toàn, và để nó unescaped nếu nó an toàn. Vậy để đạt được như vậy thì đơn giản hãy dùng đặc tính nối chuỗi của SafeBuffer 
```
def group(content)
  html = "".html_safe
  html << "<div class='group'>".html_safe
  html << content
  html << "</div>".html_safe
  html
end
```
helpers của chúng ta vẫn trả về một chuỗi an toàn, nhưng sẽ escape nội dung nếu không an toàn. Lưu ý rằng helper group của chúng ta đã trở nên linh hoạt hơn nhiều bởi vì nó hoạt động như mong đợi với cả tham số an toàn và không an toàn. Bây giờ chúng ta có thể bỏ nó cho caller để input là an toàn hay không, và chúng ta không còn cần phải có những giả định về sự an toàn của content

Chú ý làm sao Rails helper có sẵn các method như link_to hay content_tag nó cũng generate HTML tags xung quanh các nội dung có thể  nhập bởi user. Những cái helper đó hoạt động giống cách mình vừa implement helper group phía trên, vì thế chúng ta có thể refactor code như sau:

```
def group(content)
  content_tag(:div, content, :class => "group")
end
```
# Rubocop
Bài trên cũng đã giải thích rõ về html_safe và tại sao Rubocop lại warning khi gọi html_safe trong các method.
```
# bad
"<p>#{text}</p>".html_safe

# good
content_tag(:p, text)

# bad
out = ""
out << content_tag(:li, "one")
out << content_tag(:li, "two")
out.html_safe

# good
out = []
out << content_tag(:li, "one")
out << content_tag(:li, "two")
safe_join(out)
```
Refer
https://www.bountysource.com/issues/38680226-using-html_safe-or-raw-inside-safe_join-is-being-flagged
http://akinov.hatenablog.com/entry/2017/05/25/112310
https://makandracards.com/makandra/2579-everything-you-know-about-html_safe-is-wrong