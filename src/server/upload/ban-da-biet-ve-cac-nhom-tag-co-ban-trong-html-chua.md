Chào các bạn!

Có lẽ khá nhiều bạn ở đây ít khi quan tâm đến khái niệm "**nhóm tag trong HTML**". Trước đây mình có một bài viết giới thiệu về 2 loại: **Block elements và Inline elements**. Các bạn có thể xem lại bài viết đó ở đây:

https://viblo.asia/p/ban-da-thuc-su-hieu-ve-block-elements-va-inline-elements-chua-4dbZNnOmZYM

Dù bài viết bên trên cũng là chia các elements trong HTML thành 2 nhóm nhưng thực tế lại khác nhau.

- **Block elements và Inline elements**: được chia theo định dạng hiển thị block và inline.
- **Nhóm tag trong HTML**: được phân chia theo chức năng.

Như vậy bản chất của 2 kiểu phân loại này là hoàn toàn khác nhau. Các bạn đừng gộp chúng lại làm 1 nhé.

Quay trở lại chủ đề chính, một câu hỏi được đặt ra ở đây là: Viết bài này để làm gì? Thực chất có khá nhiều bạn **đánh tay ngang**, chưa thực sự tìm hiểu kỹ HTML từ đầu nên sử dụng HTML tag khá lôm côm, lung tung dẫn tới code không được tối ưu. Vì vậy mình viết bài này đễ hỗ trợ phần nào các bạn hiểu rõ hơn về chức năng của các tag mà các bạn dự định sẽ sử dụng sao cho chính xác và tối ưu nhất có thể.
Đừng nghĩ là dùng tag HTML nào cũng được. Không tự nhiên mà HTML sinh ra các nhóm tag để sử dụng. Nếu sử dụng sai sẽ ảnh hưởng lớn tới performance đấy, mình dính nhiều lần rồi nên biết.

Ở bài viết này mình sẽ chỉ giới thiệu tới các bạn các nhóm tag cơ bản nhất, hay sử dụng nhất trong HTML. Còn đối với các nhóm tag mở rộng, các bạn có thể tự tìm hiểu thêm sau nhé. Các nhóm tag được nói tới trong bài này bao gồm:

- Headings
- Paragraphs
- Styles
- Text Formatting
- Quotation and Citation Elements
- Links
- Images
- Tables
- Lists
- Form

Trên đây là những nhóm tag hay sử dụng nhất. 

## HTML Headings

Nhóm tag này với mục đích chính là để hiển thị title hoặc subtitle trên 1 page. Hoặc bạn cũng có thể sử dụng các heading tags này cho title bài viết hoặc title product.

```
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

*Lưu ý*:  Đối với <h1> thì chỉ sử dụng **duy nhất 1 tag h1 cho 1 page**, tốt nhất là nên sử dụng <h1> trên phần logo của page. Còn các tag heading còn lại sẽ sử dụng lần lượt từ trên xuống h1->h2->h3->h4->h5->h6, đừng nhảy cóc. Các bạn nào làm về SEO sẽ hiểu cái này. 
 
## HTML Paragraphs

Tag  Paragraphs sử dụng để hiển thị các đoạn văn bản:

- **p**: Hiển thị đoạn văn bản
- **hr**: Là 1 tag rỗng, không có end tag, dùng để hiển thị 1 đoạn line ngăn cách
- **br**: Là 1 tag rỗng, không có end tag, dùng để xuống dòng trong cùng 1 đoạn văn bản mà không cần phải thêm nhiều tag.
- **pre**: Hiển thị 1 đoạn văn bản đã được định dạng sẵn. Text bên trong **pre** tag thường được định dạng sẵn font, thường là Courier.

## HTML Styles

```
<p>I am normal</p>
<p style="color:red;">I am red</p>
<p style="color:blue;">I am blue</p>
<p style="font-size:50px;">I am big</p>
```

Cái này chắc các bạn cũng không lạ lẫm gì nữa. Nó chính là để sử dụng trong inline css.
    
## HTML Text Formatting
    
Các tag này để định dạng text văn bản.

```
<p><b>This text is bold</b></p>
<p><i>This text is italic</i></p>
<p>This is<sub> subscript</sub> and <sup>superscript</sup></p>
<p><u>This text is underline</u></p>
```
    
Kết quả trả ra nó sẽ như thế này:

![](https://images.viblo.asia/5b9f7291-60ba-4bae-a802-1f24961ddaa6.png)

Ngoài các tag khá quen thuộc như **<b>, <i>, <u>** thì còn có 2 tag khá đặc biệt: **<sub>** và **<sup>**. 

- **<sub>**: Dùng để viết các chỉ số bên dưới
- **<sub>**: Dùng để viết các chỉ số bên trên

```
<p>H<sub>2</sub>0 and x<sup>2</sup></p>
```

## HTML Quotation and Citation Elements
    
- **<blockquote>**: Dùng để trích dẫn lại đoạn text từ 1 chỗ khác. Cái này dễ dàng gặp nhất trong các forum hoặc các tool chat.
- **<q>**: Chính là để thêm các dấu nháy cho đoạn mà bạn muốn trích dẫn.

```
<p>Viblo về nhóm tags trong HTML.</p>

<p>tag này có tác dụng: <q>Thêm dấu nháy cho đoạn muốn trích dẫn.</q></p>
```
    
![](https://images.viblo.asia/8bc20eed-2294-49b1-972b-12f8176c8ab3.png)

- **<abbr>**: Xác định chữ viết tắt hoặc từ viết tắt
- **<address>**: Sử dụng trong các trường hợp hiển thị thông tin liên lạc trong văn bản.
    
## HTML Links

```
<a href="url">link text</a>
```

Thôi cái tag này thì quá rõ ràng rồi, không cần nói thêm gì nữa. Về các attrs của <a> tag thì các bạn có thể tự tìm hiểu thêm nhé.
    
## HTML Images
    
```
<img src="img_chania.jpg" alt="Flowers in Chania">
```
Cũng là 1 thành phần vô cùng quen thuộc mà không cần phải nói gì thêm nữa.
    
## HTML Tables
    
Table được sử dụng khá nhiều và thường xuyên trong việc sắp xếp các dữ liệu thành nhiều hàng, cột. Tuy nhiên, các bạn đã thực sự biết các attrs và css riêng biệt của <table> chưa?
    
Bình thường chúng ta thường hay viết code cho 1 table như thế này
    
```
<table style="width:100%">
  <caption>Monthly savings</caption>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
  <tr>
    <td>February</td>
    <td>$50</td>
  </tr>
</table>
```
    
Nhưng thực chất, để viết đúng cấu trúc cho 1 table thì cần có **<thead>, <tbody>, <tfoot>**
    
```
<table style="width:100%">
  <caption>Monthly savings</caption>
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$50</td>
    </tr>
  </tbody>
  <tfoot>
  	<tr style="background-color: #FFE4B5">
      <td><b>Total: </b></td>
      <td style="color: red"><b>$150</b></td>
    </tr>
  </tfoot>
</table>
```
    
![](https://images.viblo.asia/1a460544-c9e6-4eba-a07c-935f5e6cbc90.png)

Ngoài các tags hay sử dụng trong table như: **<table>, <tr>, <th>, <td>, <thead>, <tbody>, <tfoot>** thì còn 3 tags nữa ít sử dụng hơn.
    
- **<caption>**: Hiển thị cation của table.
- **<colgroup>**:  Được sử dụng để định dạng cho một nhóm cột trong <table>. 
- **<col>**:  Được sử dụng để xác định giá trị thuộc tính cho một hoặc nhiều cột trong <table>
    
Còn attr và css riêng biệt cho <table> thì như thế nào?
    
- CSS **border-collapse**: Thuộc tính thu gọn lại border cho các cell trong table. Thường được set default là 0.
- CSS **border-spacing**: Thuộc tính dùng để set các khoảng cách giữa các cell trong table. Thường được set default là 0.
- Attr **colspan**: Gộp nhiều cột lại với nhau
- Attr **rowspan**: Gộp nhiều dòng lại với nhau.

## HTML Lists

Tag list trong HTML có 2 dạng chính: **unordered và ordered**.

**Unordered**

Unordered bắt đầu bằng **<ul>**. Các item bên trong sử dụng **<li>**

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

**Ordered**
 
Ordered bắt đầu sử dụng bằng **<ol>**. Các item bên trong cũng sử dụng **<li>**

```
<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
```

Vậy sự khác nhau giữa **unordered** và **ordered** là gì? Chính là ở **list-style-type** và "type". Giữa **unordered** và **ordered** thì cách gọi và các giá trị khác nhau nên hiển thị sẽ khác nhau. Chúng ta cùng đi vào bảng so sánh như sau:



| **unordered <ul>** | **ordered <ol>** |
| -------- | -------- |
|list-style-type | type |
|disc | 1 |
|circle | A |
| square|a  |
|none |  I|
| | i |

Ngoài 2 kiểu chính là **unordered** và **ordered** thì trong Lists tag còn có **Description Lists**. Trong đó vai trò của từng tag như sau:

- **<dl>**: định nghĩa 1 description list
- **<dt>** : xác định tên hoặc là thuật ngữ
- **<dd>**: mô tả lại các thuật ngữ hoặc tên đó
    
```
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
```

## HTML Forms

Cuối cùng là nói về Form. Thực chất, hệ thống của Form khá là rộng và đồ sộ. Không chỉ có số lượng element nhiều mà attibutes cũng vô cùng lớn. Do bài này chỉ là sơ lược về các nhóm tags trong HTML nên mình sẽ chỉ liệt kê element của form cùng với các loại type của input thôi nhé.

Form có những elements sau:

| Form Elements  | Form Elements | Form Elements |
| -------- | -------- | -------- |
|  <input> | <label> | <select> |
| <textarea>  | <button> |<fieldset>|
| <legend>  | <option> |<output>  |
|  <datalist> | <optgroup> |  |


Còn về các loại type của input thì sao?

| Type | Type | Type |Type|
| -------- | -------- | -------- |-------- |
|  button |  checkbox| color |date|
|  email | file | hidden |image|
|  month | number |password|radio|
|  range | reset |search  |submit|
|  tel | text | time |url|
| week  |  |  ||


Như vậy, qua bài viết này, mình hi vọng các bạn cũng hiểu được thêm về HTML và sử dụng chúng một cách tối ưu nhất có thể. 
Chúc các bạn thành công!