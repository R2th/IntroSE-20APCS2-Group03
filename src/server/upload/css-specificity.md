CSS là ngôn ngữ tạo phong cách cho trang web – Cascading Style Sheet language. Nó dùng để tạo phong cách và định kiểu cho những yếu tố được viết dưới dạng ngôn ngữ đánh dấu, như là HTML. 
![](https://images.viblo.asia/d6e2be76-7bfc-4dcb-97a5-ec10844339dc.jpg)

Mối tương quan giữa HTML và CSS rất mật thiết. HTML là ngôn ngữ markup (nền tảng của site) và CSS định hình phong cách (tất cả những gì tạo nên giao diện website), chúng là không thể tách rời.

Có thể nói việc học CSS là dễ nhất so với các ngôn ngữ khác liên quan đến web, bởi vậy những người mới bắt đầu học cách tạo một website thường học ngôn ngữ này và HTML đầu tiên.

Trong bài viết này sẽ nhắc lại những vấn đề cơ bản về CSS và làm rõ các mức độ ưu tiên trong css.

Với những người mới học về website khi làm việc với css đôi khi hay gặp phải phải việc muốn chuyển một đoạn chữ từ màu vàng sang màu đỏ nhưng css hoài mà không được vậy nguyên nhân là do đâu? Vì một quy tắc được sử dụng bởi các trình duyệt để áp dụng các mức độ ưu tiên khác nhau cho các kiểu CSS khác nhau. Do đó, các kiểu được áp dụng bằng bộ chọn CSS ưu tiên cao có thể bị ghi đè bởi bộ chọn CSS có mức độ ưu tiên thấp.
Vậy  có những kiểu CSS như nào?
![](https://images.viblo.asia/a4c139e7-dây276-417f-948d-032bab1ce39f.jpg)

## 1.  Default Browser Styles
Firefox, Chrome, Safari, Opera và Internet Explorer hiện là năm trình duyệt máy tính hàng đầu trên thị trường. Các trình duyệt này và tất cả các trình duyệt khác tuân theo quy tắc chuẩn để bao gồm các kiểu mặc định tích hợp sẵn để hiển thị các thành phần HTML.

ví dụ như:
![](https://images.viblo.asia/67fb5178-220f-45c2-954b-4065792c738d.jpg)

Tuy nhiên mỗi trình duyệt sẽ mặc định các thông số khác nhau , điều này gây ra sự không nhất quán trên các trình duyệt, đặc biệt là trong các trình duyệt cũ như IE6, 7 và Firefox 3.0.
![](https://images.viblo.asia/d48baf33-eb73-4d91-a8e2-0342964eee07.jpg)

như ở hình trên thì Firefox mới nhất hiển thị thẻ `blockquote` theo mặc định với lề: `16px 40px 16px 40px`, Internet Explorer 7 sẽ hiển thị thẻ `blockquote` với lề: `0px 40px.`

Để khắc phục sự bất đồng bộ này sẽ có rất nhiều cách, sau đây là ba cách thường dùng:

* [ Normalize.css](http://necolas.github.com/normalize.css/)
* [CSS Reset](http://meyerweb.com/eric/tools/css/reset/)
* [HTML5 Reset Stylesheet](http://html5doctor.com/html-5-reset-stylesheet/)


## 2. Các loại Selector
* **Type Selector:** theo type của HTML element

![](https://images.viblo.asia/8ce00485-d5d4-45f4-948f-eff5135dbed6.jpg)

* **Descendant Selector**: Cho phép trỏ tới 1 hay nhiều element là con, cháu chắt chút chít của element cụ thể.
```css
ul li { font-style: italic; }
```

*  **ID Selector** 
```css
#uniqueID {
  /** declaration **/
}
```
Lưu ý là trong một trang web ID là duy nhất, nghĩa là nếu bạn định nghĩa hai ID giống nhau trong 1 layout thì không đúng chuẩn giao diện của W3C. 

Giả sử có nhiều thẻ div và bạn muốn viết CSS cho một thẻ DIV nào đó thôi thì ta có thể chọn giải pháp là Selector theo ID của HTML. Chúng ta sử dụng dấu thăng (#) để đại diện cho ID.

*  **Selector class**
```css
p.box {
  /** declaration **/
} 
```
Với ID là duy nhất thì class ngược lại, nghĩa là có thể cho nhiều thẻ HTML có cùng tên class, điều này khá tiện lợi cho CSS. Ví dụ cần style cho một số thẻ div nào đó thôi thì nếu dùng ID thì không hay lắm vì phải viết nhiều lần, chính vì vậy ta sẽ chọn class. Selector cho class sẽ là dấu chấm (.).

* **Pseudo-class:** hiển thị element tại 1 trạng thái đặc biệt vd hiển thị khi click vào link anchor. Gồm có hover, link, visit, unvisit, active…

```css
a:hover{ color: #333;}
```

*  **Universal selector**: Áp dụng cho toàn bộ element trong page, ít khi được sử dụng
```css
*{
    font-size: 20px;
}
```

*  **Child Selector**: Trỏ chính xác tới các element con trong element cha. Sử dụng child selector giúp tăng performance tốt hơn descendant selector.
```css
 .nav > li { color: #123; }
```

* **Attribute Selector**: Trỏ tới element có thuộc tính được khai báo
```html
 <a href=”” rel=’friend zone’>Friend</a>
```
```css
 

a[rel~=’friend’]{ background-image: url(‘image.png’);}
```
## 3. Đánh giá độ ưu tiên của các selector
Biểu thức tính mức độ ưu tiên của selector
![](https://images.viblo.asia/67d566af-cecd-4dbc-b136-6056e042c48d.jpg)


Đối với biểu thức trên thì mỗi selector sẽ có giá trị là 5 chữ số và giá trị selector nào có giá trị lớn hơn sẽ ghi đè giá trị nhỏ hơn. Các giá trị được tính từ trên xuống dưới.

Sau đây là một số ví dụ về biểu thức tính giá trị selector

```css
#myDivId .myDivClass
{
    font-size: 20px;
}
```

như ở trên thì selector `#myDivId .myDivClass` sẽ có giá trị là **00110**.

```css
/*00030*/
.a .b .c
{
    color: green;
}

/*00020*/
.a .b
{
    color: red;
}
```
Ở đây biểu thức thứ nhất có giá trị 00030 và biểu thức thứ hai có giá trị 00020 do đó biểu thức thứ hai không thể ghi đè biểu thức đầu tiên.

Từ công thức ở trên thì ta có thể thấy được mức độ ưu tiên của !important là lớn nhất 

```css
/*00020*/
.a .b
{
    color: red;
}

/*00010*/
.b
{
    /*now becomes 10010*/
    color: yellow !important;
}
```

Lưu ý: `*, ~, >, +, [space]` and `:not` là các selector không có giá trị hay được tính là 00000

```css
/*00000 is the below express value*/
*{
    font-size: 20px;
}
```
### Một số lưu ý về !important
* Luôn luôn cân nhắc và tìm giải pháp trước khi sử dụng  **!important**
* Không bao giờ được sử dụng **!important** để viết plugin/mashup.
* Không bao giờ sử dụng !important trên site-wide CSS.

## Kết luận
Ở bài viết này đã trình bày lại các khái niệm cơ bản của CSS, cũng như giúp người đọc hiểu hơn về CSS. Đặc biệt giúp những người mới tiếp cận với việc làm web giải quyết vấn đề ghi đè một cách logic hơn thông qua việc đánh giá các Selector. Nên cố gắng giảm việc sử dụng **!important**. 
## Tài liệu tham khảo
[CSS Specificity: Priortizing Selectors Rules](http://qnimate.com/dive-into-css-specificity/)