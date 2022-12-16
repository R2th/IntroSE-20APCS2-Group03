![](https://images.viblo.asia/737d7e36-158f-4fd2-98e9-94a936247df5.png)

Nếu bạn cần đánh dấu text trong một đoạn văn bản, tôi khuyên bạn nên sử dụng `<mark>`. Đây là thẻ mới của HTML5 giúp xác định văn bản được đánh dấu, sử dụng khi muốn làm nổi bật văn bản của mình.. Tôi thường sử dụng thẻ `<span>` với một số style CSS, tuy nhiên việc này không thể hiện rõ ràng được ngữ nghĩa. HTML5 được sinh ra để thực hiện tất cả các điều trên.
```
 <p>
  <mark>Highlight</mark>
  text with HTML &lt;mark&gt; tag
</p>
```
    
##  Kiểu mặc định của <mark> 
    
Như mọi người thấy thì màu nền mặc định của `<mark>` là màu vàng.
    
```
 <p>
  <mark>Default Yellow Highlight</mark>
</p>
```
    
Output

![](https://images.viblo.asia/7d0e1eaa-5abe-46b8-aa18-2373c96efc59.png)
   
##  Custom style của `<mark>` với CSS
 
Tất nhiên, cũng giống như bất kỳ thẻ HTML nào, bạn có thể áp dụng việc custom style bằng CSS trên nó. Bạn có thể  nghĩ nó tương tự như việc tạo style cho thẻ `<p>`.
    
```
mark {
  background: red;
  color: white;
}
```
    
Output

![](https://images.viblo.asia/d47633f1-0051-4f8e-9434-44e87669a206.png)
    
## `<mark>` và một số thẻ định dạng HTML khác.
 
###  strong
    
`<strong>` được sử dụng để biểu thị văn bản có tầm quan trọng lớn hơn các đoạn văn bản xung quanh nó, chẳng hạn như một cảnh báo hoặc lỗi. Về mặt ngữ nghĩa, nó khá là quan trọng. Nó được hiển thị dưới dạng bôi đậm (**bold**).
     
### b
 
`<b>` cũng khá giống với `<strong>` vì nó cũng được hiển thị dưới dạng bôi đậm (**bold**). Tuy nhiên, không giống như `<strong>`, nó không thực sự truyền đạt bất kỳ tính quan trọng nào và nó được cho là một kiểu hơn là việc thể hiện ngữ nghĩa.

### em
 
`<em>` được sử dụng để nhấn mạnh vào một từ cụ thể. Nó xuất hiện dưới dạng chữ *nghiêng*.
    
### mark
 
`<mark>` đơn thuần chỉ là làm nổi bật sự liên quan của một đoạn văn bản nhất định. Trước sự tồn tại của thẻ này, nhiều người sử dụng `<em>` hoặc `<strong>` để cung cấp cho nội dung được highlight mang ngữ nghĩa nhất định. Nếu bạn cần đánh dấu highlight, hãy sử dụng thẻ này nhé.
 
## Tại sao thẻ HTML ngữ nghĩa lại quan trọng như vậy?
  
Lý do bạn không nên sử dụng thẻ `<div>` ở mọi nơi là vì chúng không có ngữ nghĩa. Những người mới bắt đầu học lập trình - những người quan tâm đến việc đúng ngữ nghĩa. Sai. Trong thực tế, công cụ tìm kiếm như Google đã làm! Bởi vì ngữ nghĩa sẽ truyền đạt ý nghĩa về trang web của bạn. Khi robot tìm kiếm trên trang web của bạn, chúng sẽ biết chuyện gì đang xảy ra. Nói cách khác, nó giúp cho SEO hay tối ưu hóa công cụ tìm kiếm của bạn.
    
Một lý do khác để có được sự chính xác về mặt ngữ nghĩa là khả năng tiếp cận. Rất nhiều công cụ dựa trên các thẻ ngữ nghĩa để biến trang web của bạn hữu ích và có ý nghĩa cho người sử dụng. Một ví dụ điển hình là những ngày trước, khi chúng ta có máy tính đọc nội dung text từ một trang web. Nếu không có ngữ nghĩa, thì đơn thuẩn nó cũng chỉ như một con robot đọc văn bản vậy. Chắc chắn là nó sẽ hoạt động - tuy nhiên thật là kinh khủng về mặt sử dụng cũng như trải nghiệm người dùng sẽ nhàm chán. Và khi bạn sử dụng ngữ nghĩa phù hợp,  như Siri vậy, có nét giống con người hơn bởi vì nó có những biến động khác nhau, thay đổi về cao độ và thậm chí biết khi nào nên tạm dừng. Và đây là loại trải nghiệm tương tự tốt hơn mà bạn có thể đạt được khi sử dụng các thẻ HTML chính xác về mặt ngữ nghĩa.
    
## HTML5 tag and SEO
    
 John Mueller, nhân viên Google đã đề cập đến điều này trong một phản hồi trên Twitter:
    
> > >  It certainly makes sense to use HTML5 properly if you can, there’s no SEO downside to doing so :).
    
Về cơ bản thì câu trên nói nên rằng: "Hoạt động SEO sẽ không bị ảnh hưởng xấu nào nếu bạn biết cách sử dụng HTML5 một cách hợp lý". Cũng khuyến khích bạn nên sử dụng các thẻ HTML5. Bên cạnh đó, vẫn còn các lợi ích về mặt tiếp cận. Một số thẻ HTML5 mang lại sự trải nghiệm thú vị cho người dùng về việc sử dụng các tính năng nâng cao của nó trong tương lai.
    
##  Một số lưu ý
    
Hi vọng, tôi đã truyền tải cho bạn những điều cơ bản về tầm quan trọng của các thẻ HTML ngữ nghĩa. Và bây giờ, bạn có thể sử dụng `<mark>` một cách tốt nhất.

Tuy nhiên với một số trình duyệt không hỗ trợ thẻ `<mark>`ta có thể sử dụng CSS và phần tử giả để đưa ra thông báo.
    
```
mark::before {
  content: " [highlight start] ";
}
mark::after {
  content: " [highlight end] ";
}
/* Hide the text created in the CSS content property */
mark::before, 
mark::after {
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```
    
Vì vậy, những gì màn hình đọc sẽ làm ở đây. Khi nó gặp văn bản mà được gói trong thẻ `<mark>`, nó sẽ được thông báo "highlight start" theo sau là văn bản trong thẻ. và sau đó thông báo "highlight end" khi gặp thẻ đóng.
 
Xin lưu ý: nếu bạn có rất nhiều "“announcement”", thì nó có thể rất dài dòng và thêm vào những thông tin không cần thiết đôi khi gây phiền nhiễu. Điều này có thể khiến một số người dùng tắt tính năng này. Vì vậy không được lạm dụng kỹ thuật này và chỉ áp dụng nó trong trường hợp nội dung được tô sáng KHÔNG ảnh hưởng xấu đến việc đọc hiểu cho người dùng.
 
## Các case sử dụng cho `<mark>`
 
Phần dưới đây khá thú vị! Hãy cùng xem một số trường hợp sử dụng `<mark>`:
    
### Case: Kết quả tìm kiếm
 
Ở đây, một trong những case khá phổ biến. Bạn có thể sử dụng nó để làm nổi bật thuật ngữ người dùng đã tìm kiếm.

```
<p>Search Result for "Vue"</p>
<hr>
<p><mark>Vue</mark> is an awesome JavaScript framework. <mark>Vue</mark> is awesome. Can you tell I really like <mark>Vue</mark></p>
```
    
 Output
    
  ![](https://images.viblo.asia/bb4ec4ad-8523-4304-a2b8-20f4e61e024e.png)
    
### Use Case: Quotes
 
Thật tuyệt vời khi sử dụng nó để highilight cho quotation (`<q>`) và khối quote (`<blockquote>`).
    
 `<p>According to Samantha, <q>Vue is <mark>AWESOME</mark></q></p>`
    
  Output
    
  ![](https://images.viblo.asia/a3fba3f4-6820-4e70-b47c-ad15bd1d69e8.png)
    
 
**Nguồn tài liệu**

* https://medium.com/@samanthaming/highlight-text-with-html-mark-tag-72297c053be8
*  [MDN Web Docs: HTML Mark](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
* [w3schools: HTML Mark](https://www.w3schools.com/tags/tag_mark.asp)
* [TutorialsPoint: HTML Mark Tag](https://www.tutorialspoint.com/html/html_mark_tag.htm)
* [20 HTML Elements for Better Text Semantics](https://www.sitepoint.com/20-html-elements-better-text-semantics/)
*[ Mark Tag in HTML5](https://www.c-sharpcorner.com/UploadFile/667ddf/mark-tag-in-html5/)
* [TechOnTheNet: HTML mark tag](https://www.techonthenet.com/html/elements/mark_tag.php)
* [HTML5Doctor: Draw attention with mark](http://html5doctor.com/draw-attention-with-mark/)
* [TutorialRepublic: HTML5 mark tag](https://www.tutorialrepublic.com/html-reference/html5-mark-tag.php)
* [Using HTML5 Properly Has No SEO Downside](https://www.seroundtable.com/google-html5-seo-25870.html)