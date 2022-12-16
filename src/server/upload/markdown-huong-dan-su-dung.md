&nbsp;&nbsp;&nbsp;&nbsp; Khi bạn viết một tài liệu hay blog của mình thì bạn sẽ sử dụng công cụ gì để format? Dùng cái gì để viết nhanh hơn, tiết kiệm thời gian hơn, dễ đọc hơn, dễ viết hơn. Có thể một vài bạn sẽ trả lời ngay là dùng trình soạn thảo WYSIWYG (What You See Is What You Get). Trình soạn thảo WYSIWYG không phải lúc nào cũng là tốt nhất.  Menu chính, menu phụ, dialog cấu hình, dialog định dạng, nhân vật gợi ý, đồ họa hoạt hình, macro.... khá phức tạp và nhiều lúc không cần thiết và không cần sử dụng hết các tính năng của nó. Hôm nay mình sẽ giới thiệu về một trình soạn thảo có thể thay thế WYSIWYG để giải quyết những vấn đề trên. Ngay thời điểm mình đang viết bài viết này mình cũng đang dùng nó, đó là Markdown. :)

### 1. Markdown là gì?
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Markdown hiện nay đang được áp dụng khá phổ biến ở nhiều trang web cũng như apps. Một lập trình viên hiện đại sẽ không thể không biết khái niệm Markdown. Hôm nay mình sẽ giới thiệu với các bạn một công cụ thay thế trình soạn thảo WYSIWYG.  <br>
&nbsp;&nbsp;&nbsp;&nbsp; Markdown đã không còn xa lạ với các lập trình viên hiện đại thời nay nữa (nếu bạn chưa biết thì hãy học ngay để không bị lạc hậu nhé các bạn :D ). Một công cụ được phát triển với mục đích dễ viết, dễ học và dễ đọc cho những người không muốn học các tag html hoặc viết các tag html rối mắt, những vẫn đáp ứng được một định dạng văn bản "chuẩn web". Nói cách khác, Markdown là một công cụ chuyển đổi file text thông thường sang HTML. <br>

### 2. Tại sao nên sử dụng Markdown?
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Mục tiêu lớn nhất mà markdown ra đời là làm đơn giản và dễ đọc nhất có thể, để một người không quen với các thẻ html vẫn có thể hiểu được và viết được một văn bản chỉnh chu trên web.
<br><br>Ví dụ: 
HTML thông thường:
```html
<h4>Tại sao <em>bạn nên sử dụng markdown</em></h4>
<p><a href="http:/viblo.asia">Markdown</a> cực kỳ dễ hiểu, nó sẽ làm <em>việc soạn thảo một văn bản trên web</em> không quá phức tạp như bạn nghĩ. <strong>Cam đoan.</strong></p>
```
Còn đây là Markdown:
```
##### Tại sao *bạn nên sử dụng markdown*
[Markdown](http://viblo.asia) cực kỳ dễ hiểu, nó sẽ làm *việc soạn thảo một văn bản trên web *
 không quá phức tạp như bạn nghĩ. **Cam đoan.**
```

Kết quả: <br>
#### Tại sao *bạn nên sử dụng markdown*
[Markdown](http://viblo.asia) cực kỳ dễ hiểu, nó sẽ làm *việc soạn thảo một văn bản trên web*
 không quá phức tạp như bạn nghĩ. **Cam đoan.**
 
 <br> Cũng không khó lắm đúng không các bạn? rất dễ để học cũng như viết.
 ### 3. Cách dùng
##### 3.1 Với các thẻ h <br>
 ```
     h1 -> # h1
     h2 -> ## h2
     h3 -> ### h3
     ...
 ```
##### 3.2 Emphasis: 
  - In đậm: **Bold** <br>
  - In  nghiêm: *Italic*,<br>
  - chữ gạch ngang: ~~gạch ngang~~ <br>
```
    Bold -> **Bold**
    Italic -> *Italic*
    Gạch ngang -> ~~gạch ngang~~
```
##### 3.3 Xuống dòng, gạch ngang, khoảng trắng, tab
<hr>

```
<hr> -> gạch ngang
<br> -> xuống dòng
&nbsp; -> khoảng trắng
&ensp; -> tab

```
##### 3.4 Inline code 
`inline code` ta viết text ở trong dấu nháy ` (bên trái số 1 nhé :D)
```
    `inline code`
```
##### 3.5 Link: [Link](http://~)
```
    [tên Link](http://url)
```
##### 3.6 Image:  <br>
![test](https://media.giphy.com/media/huuk0XPg7APDO/giphy.gif)
```
    	![alt](https://media.giphy.com/media/huuk0XPg7APDO/giphy.gif)
```

##### 3.7 Unordered list:
* item 1
    * item 1.1
        * item 1.1.1
    * item 1.2
* item 2
```
* item 1
     * item 1.1
         * item 1.1.1
     * item 1.2
* item 2
```

##### 3.8 Ordered list

1. Item 1
2. Item 2
 
 ```
     1. Item 1
     2. Item 2
 ```
##### 3.9 Blockquotes: 
> Đây là một blockquotes

```
>  Đây là một blockquotes
```
##### 3.10 Code
- Đây là ví dụ về code html:
```html
<div class="viblo">
    <h4> Đây là thẻ h4 </h4>
</div>
```
- Đây là code js
```js
function hello() {
    console.log('Hello world!);
}
```
- Với mỗi một ngôn ngữ sẽ được highlight khác nhau. Chúng ra sử dụng như sau:
```
    ```html
        code html in here
    ```
    
    ```js
        code js in here
    ```
```

- Ngoài ra còn 1 số ngôn ngữ khác như:
<div align="center"  style="text-align: center;">

<br>

|Language              |Tag                |
|-------------------------|:-----------------:|
|      Applecript       |applecript      |
|    Asciidoc             |asciidoc  |
|   ASP.NET             |aspnet   |
|   batch files          |batch   |
|   CSS   |   css   |
|   Go	   |   go   |
|  HTTP    |   http   |
|  Javascript    |   js   |
|   Java   |   java   |
|  JSON    |   json   |
|  Markup    |   markup   |
|  Markdown    |   md   |
|  Objective-C    |   objectivec   |
|  PHP    |   php   |
|  Powershell    |   powershell   |
|  Python    |  py    |
|  Ruby    |   ruby   |
|  SASS    |    sass  |
|  SQL    |  sql    |
|  Swift    |    swift  |
|   VB.NET   |   vbnet   |
|   Vim   |   vim   |
|   Wiki   |   yaml   |
 
</div>
<br>

##### 3.11 Table

| Alignment             | Column 2       | Column 3      |   Column 4   |
| --------------------- |:--------------:| -------------:|:-------------|
| Center align column 2 |   căn giữa     |               |              |
| Right align column 3  |                | căn phải      |              |
| Left align numbers:   |                |               |   căn trái   |

```
| Alignment             | Column 2       | Column 3      |   Column 4   |
| --------------------- |:--------------:| -------------:|:-------------|
| Center align column 2 |   căn giữa     |               |              |
| Right align column 3  |                | căn phải      |              |
| Left align numbers:   |                |               |   căn trái   |
```

Để căn chữ trong bảng ta sử dụng dấu : về bên đó.
```
căn trái: :---------
căn phải: ---------:
căn giữa: :--------:
```
Vậy là trên đây mình đã giới thiệu cơ bản nhất về markdown. Các bạn có thể áp dụng ngay để test thử trên viblo hoặc trên [đây](https://stackedit.io/app#).