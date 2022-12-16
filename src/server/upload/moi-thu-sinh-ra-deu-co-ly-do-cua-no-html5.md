Trong cuộc sống cũng như trong lập trình điều mà ta thấy chưa chắc đã đúng. Html5 cũng vậy cũng phát triển thêm các thẻ có chức năng rất giống nhau nhưng trên ý nghĩa họ muốn chúng ta sử dụng chúng một cách đúng nhất.
## 1. <s> vs <del>
CSS công nhận là rất tuyệt để styling, nhưng nó không giúp chúng ta hiểu ý nghĩa nội dung của text. Khi sử dụng strikethrough thì các bạn chỉ nghĩ sẽ tạo một dấu gạch ngang để thể hiện dòng đó mình muốn bỏ, sử dụng thẻ <s> hoặc <del>
  <br>
```HTML
<s> Nội dung không còn phù hợp nữa </s>   
<del> Đoạn text bị xoá trong các tài liệu </del>
```
![](https://images.viblo.asia/ce4c33fe-e1df-4bf7-920b-38bd7dd44a9a.png)

  Rất giống nhau phải không, vậy khi nào ta nên dùng <s> và <del>
#### <s>
>  Sử dụng khi nội dung không còn phù hợp nữa.
#### <del>
>  Sử dụng khi nội dung trong tài liệu bạn muốn người thấy đoạn này đã được bỏ đi.
    
Ví du cho 2 trường hợp đơn giản trên :
```html
<p><s>$100</s></p>
<p>$999.99</p>
```
kết quả 

![](https://images.viblo.asia/5c318c9f-e6e2-446f-85c8-9f71812dfa14.png)

```html
<p>TODO</p>

<ul>
  <li><del>Get a Job</del></li>
  <li>Become a Senior Developer</li>
</ul>
```
   ![](https://images.viblo.asia/4b902fd2-864a-486c-ac03-0a50a8e1c3ed.png)
Tóm lại nếu nội dung của bạn muốn chứng tỏ xoá thì bạn sử dụng <del> những trường hợp còn lại ta sử dụng <s>
    
##   2. <del> with <ins>
   Mặc dù hai thẻ này không giống nhau nhưng tiện đây mình muốn giới thiệu cho các bạn biết chúng sử dụng như thế nào. Sự so sánh trên cho thấy thẻ <del> chưa được sử dụng nhiều nhưng trong trường hợp sử dụng với thẻ <ins> thì thẻ <del> thực sự toả sáng. 
>   Chúng được sử dụng cùng nhau để nhấn mạnh đoạn text này đã có sự thay đổi trong nội dung của bạn
    <br>
    
   Ví dụ đơn giản nhất đó là github nó thể hiện những cái đã xảy ra và sự thay đổi![](https://images.viblo.asia/a351fc87-1367-44b5-a516-14d5c5212934.png)
  Hoặc

   ```html
    <p>My name is
      <del>Smanta</del>
      <ins>Samantha</ins>
    </p>
   ```
![](https://images.viblo.asia/29204f24-9745-4c93-b6f1-0b74eae5b197.png)

Ta cần nắm rõ cách sử dụng **<sticke>** , nó đã thay đổi cách sử dụng từ khi lên HTML5 sang sử dụng <s> và <del>  được sử dụng khá hữu ích ngay cả trên Internet Explorer và tránh sử dụng thẻ <stricke>. Mọi thứ sinh rea đều có ý nghĩa của nó đúng không nhỉ.
  ##   3. <code> vs <kbd>
 Hai thẻ này khi sử dụng cực kì giống nhau cùng font-family là **monospace** nhưng cái cách ta dùng dựa trên ý nghĩa khác nhau<br>
####     <kbd>
>  Văn bản cho biết đầu vào của người dùng từ bàn phím, đầu vào bằng giọng nói hoặc bất kỳ thiết bị nhập văn bản nào khác.
####     <code>
>  Văn bản chỉ ra một đoạn ngắn của mã máy tính.

<br>
Ngoài ra còn một thẻ cũng cũng giống tương tự hai thẻ này đó là <samp><br>
    
#### <samp>

>  Xác định đoạn text đầu ra là từ một chương trình máy tính
    
 Thật là dễ đọc khi bạn thấy kí tự Crtl, Shift,Tab .... vậy thì tại sao không sử dụng như vậy cho các coder dễ đọc và phân biệt hơn nhỉ
##   2. Một vài thẻ html5 chưa gặp bao giờ
#### <bdi>
>  hữu ích khi một trang web tự động chèn một số văn bản và không biết tính định hướng của văn bản được chèn. Một số ngôn ngữ ở các nước Tây Á bạn sẽ gặp lỗi này
    thử đoạn code này nhé
    
```html
    <p><span class="name">تی  سمی</span>: 3rd place</p>
    <p><bdi class="name">الرجل القوي إيان</bdi>: 4th place</p>
```
#### <ruby> ,<rb>, <rt>
>    Chú thích ruby là một văn bản phụ nhỏ, được đính kèm với văn bản chính để chỉ cách phát âm hoặc ý nghĩacủa các ký tự tương ứng. Loại chú thích này thường được sử dụng trong các ấn phẩm của Nhật Bản.
```html
    <ruby>
    漢 <rp>(</rp><rt>kan</rt><rp>)</rp>
    字 <rp>(</rp><rt>ji</rt><rp>)</rp>
    </ruby>
```  
#### <wbr>
>    Thẻ này vẫn là thẻ inline, nó đánh dấu cho vị trí ngắt từ, một vị trí trong văn bản trong đó trình duyệt có thể tùy ý ngắt một dòng, mặc dù các quy tắc của thẻ inline không cho phép, thông thường trong inline ta phải dùng kí tự ` &shy;` để xuống dòng
```html
   <div id="example-paragraphs">
        <p>Fernstraßenbauprivatfinanzierungsgesetz</p>
        <p>Fernstraßen<wbr>bau<wbr>privat<wbr>finanzierungs<wbr>gesetz</p>
        <p>Fernstraßen&shy;bau&shy;privat&shy;finanzierungs&shy;gesetz</p>
   </div>
```
 Cũng lại câu nói đó "Mọi thứ sinh ra đều có lý do của nó", Hãy sử dụng một cách hợp lý và cùng mình tìm hiểu comment và đóng góp ý kiến nào