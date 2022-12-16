![](https://images.viblo.asia/2ecf0088-d5a1-4534-afd1-00721a477289.png)

Là một người lập trình web, đòi hỏi bạn sẽ phải thành thạo khá nhiều các framework và các ngôn ngữ lập trình khác nhau. Và một điều hiển nhiên, chúng ta không thể khai thác tất cả công dụng mà ngôn ngữ hay framework đó cung cấp để thấy hết tiềm năng nó mang lại.

HTML là bài học vỡ lòng đầu tiên của các dev nhưng hầu hết chúng ta không học và sử dụng hết các tag sẵn có mà chỉ dùng những tag phổ biến mà thôi. Bài viết này sẽ chia sẻ về một số tag rất tiện ích nhưng lại rất ít khi được sử dụng được ví như những đứa con rơi của HTML.

## 1. <acronym> & <abbr>
Tag `<acronym>` là một cách để xác định hoặc giải thích thêm một nhóm từ. Khi bạn hover qua văn bản có tag `<acronym>` được sử dụng, một box sẽ xuất hiện bên dưới với văn bản từ thẻ tiêu đề.
    
Ví dụ:
    
```html
<p> Tôi là <acronym title = "Hyper Text Markup Language"> HTML </ acronym>Xin chào các bạn!  </p>
```

Tag `<abbr>` tương tự với tag `<acronym>` dùng xác định một tiêu đề trong tag nhưng tag `<abbr>` chỉ được sử dụng để xác định các từ viết tắt. Khi khách truy cập di chuyển trên văn bản viết tắt, định nghĩa đầy đủ xuất hiện bên dưới. Tag `<abbr>` hiếm khi được sử dụng, nhưng lợi ích rất nhiều cho trình đọc màn hình, trình kiểm tra chính tả và công cụ tìm kiếm.
```html
<p><abbr title="World Health Organization">WHO</abbr> là một Tổ chức Y tế Thế giới.</p>
```
    
## 2. <ins> & <del>
Nếu bạn muốn hiển thị các bản chỉnh sửa có đánh dấu, `<ins>` và `<del>` là lựa chọn tuyệt vời. Tag `<ins>` làm nổi bật những gì đã được thêm vào tài liệu với phần gạch chân và `<del>` hiển thị những gì đã được đưa ra với một gạch ngang.
    
Tag `<del>` xác định một đoạn text bị xóa (gạch ngang) từ đoạn văn bản.
    
Tag `<ins>` để mô tả các cập nhật và sửa đổi trong văn bản.
    
Ví dụ:
```html
<p>Đội bóng yêu thích của tôi là <del>Liverpool</del> <ins>MU</ins>!</p>
```
    
 ![](https://images.viblo.asia/ff2a5d8e-f50d-4daf-b15a-d19be78835ca.png)
    

##  3. <wbr>
Tag `<wbr>` là một tag cực kỳ khó hiểu và rất hiếm được sử dụng. Về cơ bản, tag này cho phép bạn chỉ định một nơi mà bạn nghĩ rằng ngắt dòng có thể hữu ích, nhưng chỉ khi cần thiết. Nó rất hoàn hảo để tạo bố cục mà bạn muốn tránh có thanh cuộn ngang.
    
Tag `<wbr>` giúp chúng ta khắc phục tình trạng một từ quá dài dẫn đến trường hợp từ bị tràn ra khỏi phần tử. Tag `<wbr>` được chèn vào bên trong một từ:
- Nếu dòng hiện tại không đủ để chứa hết từ đó thì những ký tự nằm phía sau thẻ `<wbr>` sẽ được ngắt xuống dòng.
- Nếu dòng hiện tại đủ để chứa hết từ đó thì thẻ `<wbr>` được xem như vô nghĩa.

```html
<p>This is a
veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryvery<wbr>longwordthatwillbreakatspe
cific<wbr>placeswhenthebrowserwindowisresized.</p>
```
![](https://images.viblo.asia/0f95bf23-502b-4bdf-b455-cc140795c959.png)

## 4. <Base>
Tag `<base>` nằm bên trong thành phần `<head>`.
    
Tag `<base>` dùng để xác định một "đường dẫn cơ sở" trong trang web.
    
"Đường dẫn cơ sở" này sẽ kết hợp với những "đường dẫn tương đối" để tạo ra đường dẫn tuyệt đối.
```html
<head>
    <base href="https:///example.com/public/">
</head>
```
Tag `<base>` còn được dùng để xác định kiểu mở liên kết mặc định cho những liên kết chưa được thiết lập kiểu mở liên kết.
```html
<base target="_blank">
```
    
> Lưu ý: Thẻ `<base>` chỉ có hiệu lực với những đường dẫn nằm phía dưới nó. Do đó, nếu bạn muốn áp dụng thẻ `<base>` cho tất cả các đường dẫn trong trang web thì bạn nên đặt nó ở vị trí đầu tiên trong phần tử `<head>`.
    
## 5. <address>
Tag `<address>` xác định thông tin liên hệ cho tác giả hoặc chủ sở hữu của trang web, qua thông tin này người đọc có thể liên lạc với tác giả hoặc chủ sở hữu đó.
    
Tag `<address>` trả về giá trị in nghiêng.
    
Nếu thành phần `<address>` bên trong thành phần `<article>`, nó sẽ đại diện cho các thông tin liên lạc của tác giả / chủ sở hữu của trang web.

Ví dụ: 
```html
<html>    
   <head><title>Rare Tags:<address> </title></head>    
   <body>    
      <p>Contact Us:</p>    
      <address>    
         <a href="mailto:congchuabongbong@yahoo.co.in">congchuabongbong@yahoo.co.in</a><br>    
         <a href="tel:+12369999999">(236) 999-9999</a>    
      </address>    
   </body>    
</html>  
```
    
## 6. <cite>
Tất cả chúng ta sẽ quen thuộc với tag` <blockquote>`, nhưng bạn có biết về một người anh em khác của `<blockquote>` `<cite>` không? Tag `<cite>` cho phép bạn xác định văn bản bên trong phần tử làm tham chiếu. Thông thường, trình duyệt sẽ hiển thị văn bản bên trong tag `<cite>` in nghiêng, nhưng điều này có thể được thay đổi bằng một line CSS.
    
Thẻ <cite> thực sự hữu ích để trích dẫn thư mục và các tài liệu tham khảo trang web khác.
    
Ví dụ:
```html
<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
```
    
 ![](https://images.viblo.asia/e8c8e77e-01aa-4a77-9d0b-480af52f42e4.png)

## 7. <fieldset>
Tag `<fieldset>` được dùng để nhóm các thành phần bên trong `<form>` một cách hợp lý. Việc nhóm các thông tin như vậy sẽ giúp người dùng có thể dễ dàng trong việc xác định nội dung cần nhập. Nó tạo đường bao ngoài bao quanh các thành phần trong `<form>`.
    
Tag `<fieldset>` sử dụng kèm với các `<legend>` (là tag định nghĩa một chú thích cho `<fieldset>`).
    
Các thuộc tính của tag `<fieldset>`:
* disabled: vô hiệu hóa các phần tử nằm bên trong thẻ fieldset.
* name: tên của vùng fieldset.

Ví dụ: 
```html
<html>
   <body>    
      <form action="#">    
         <fieldset>    
            <legend>Simple fieldset</legend>    
               <input type="radio" id="radio">    
            <label for="radio">Spirit of radio</label>    
         </fieldset>    
      </form>    
   </body>    
</html>  
```
### Tổng kết
Trên là một số trong các tag ít khi được sử dụng mà tôi biết. Qua bài chia sẻ, tôi hi vọng bạn tìm thấy một số trường hợp sử dụng cho các tag này. Các bạn có thể tham khảo các tài liệu sau:
* https://www.w3schools.com/tags/
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    
Cảm ơn bạn đã dành thời gian đọc bài viết!