Chào các bạn!

Nhìn tiêu đề bài viết có lẽ sẽ có khá nhiều bạn thắc mắc về khái niệm **pseudo** trong css. Nó là cái gì? Mình đã từng sử dụng nó hay chưa? Nó được sử dụng như thế nào? Bài viết này sẽ giải thích qua về khái niệm cho các bạn hiểu nhé.

**Pseudo** trong css được chia làm 2 nhánh: **Peseudo-classes** và **Pseudo-elements**. Ở bài này mình sẽ chỉ nói về **peseudo-classes** còn **pseudo-elements** sẽ được giới thiệu ở bài viết sau nhé.

## 1. Khái niệm

Hiểu một cách đơn giản thì **peseudo-classes** được dùng để xác định 1 trạng thái đặc biệt nào đó của 1 element.
Ví dụ, trạng thái chúng ta hay sử dụng nhất đó là **:hover**, **:check**

Cú pháp để viết như sau

```
selector:pseudo-class {
   thuộc tính: giá trị;
}
```

Ví dụ

```
a {
    color: blue;
    transition: color 0.2s;
}

a:hover {
    color: red;
}
```

## 2. Danh sách pseudo-classes

Bây giờ nếu bạn đã hiểu về **peseudo-classes** thì bạn nghĩ nó có bao nhiêu loại? Thực chất nó có rất nhiều. Mình sẽ list cho các bạn thấy như dưới đây.



| pseudo-classes | pseudo-classes| pseudo-classes |
| -------- | -------- | -------- |
| :active     | :host    | :only-child  |
|:link |:host()|:only-of-type
|:blank|:host-context()|:optional
|:checked|:hover|:out-of-range
|:current|:indeterminate|:past
|:default|:in-range|:placeholder-shown
|:defined|:invalid|:read-only
|:dir()|:is()|:read-write
|:disabled|:lang()|:required
|:drop|:last-child|:right
|:empty|:last-of-type|:root
|:enabled|:left|:scope
|:first|:link|:target
|:first-child|:local-link|:target-within
|:first-of-type|:not()|:user-invalid
|:fullscreen|:nth-child()|:valid
|:future|:nth-col()|:visited
|:focus|:nth-last-child()|:where()
|:focus-visible|:nth-last-col()|
|:focus-within|:nth-last-of-type()|
|:has()|:nth-of-type()|

## 3. Cách sử dụng pseudo-classes

Với số lượng pseudo-classes bên trên thì có lẽ chúng ta không dùng hết tất cả được. Tuy nhiên mình cũng sẽ giới thiệu về cách dùng của 1 số pseudo-classes hay được sử dụng cho các bạn hiểu nhé.


| pseudo-classes | Ví dụ | Mô tả chi tiết |
| -------- | -------- | -------- |
|:link|a:link|	Chọn tất cả các liên kết chưa được click|
|:hover|a:hover|Thay đổi trạng thái khi rê chuột qua <a>|
|:active|a:active|Thay đổi trạnh thái của <a> khi click vào nó)|
|:visited|a:visited|Chọn tất cả link đã truy cập|
|:checked|input:checked|Chọn mỗi phần tử <input> đã kiểm tra. |
|:disabled|input:disabled|	Chọn mỗi phần tử <input> bị vô hiệu|
|:empty|li:empty|	Chọn mỗi phần tử <li> không có con|
|:enabled|	input:enabled|Chọn mỗi phần tử <input> được bật|
|:first-child|	li:first-child|Chọn tất cả các phần tử <li> đó là con đầu tiên của parent của nó|
|:first-of-type|	li:first-of-type|Chọn phần tử p đầu tiên trong những phần tử <li> có trong 1 element|
|:focus|	input:focus|Thay đổi trạng thái của <input> khi vừa lựa chọn <input> đó|
|:invalid|	input:invalid|Chọn tất cả các phần tử <input> có giá trị không hợp lệ|
|:last-child|	li:last-child|	Chọn mỗi phần tử <li> là con cuối cùng của parent. Ngược lại với :first-child|
|:last-of-type|	li:last-of-type|Chọn phần tử <li> cuối cùng trong những phần tử <li> có trong 1 element. Ngược lại với :first-of-type|
|:not(selector)	|:not(li)|	Chọn mọi phần tử không phải là phần tử <li>|
|:nth-child(n)|	li:nth-child(2)|Chọn mỗi phần tử <li> là con thứ hai của parent. Tức là phần tử thứ 2 từ trên xuống|
|:nth-child(2n), :nth-child(even) |li:nth-child(2n), li:nth-child(even)|Lựa chọn tất cả các phần tử <li> có chỉ số chẵn|
|:nth-child(2n+1), :nth-child(odd)|li:nth-child(2n+1), li::nth-child(odd)|Lựa chọn tất cả các phần tử <li> có chỉ số lẻ|
|:nth-last-child(n)|li:nth-last-child(2)|Chọn mỗi phần tử <li> là con thứ hai của cha / mẹ nó, kể từ con cuối cùng. Tức là phần tử thứ 2 từ dưới lên|
|:nth-last-of-type(n)|li:nth-last-of-type(2)|Chọn mỗi phần tử <li> là phần tử <li> thứ hai của cha / mẹ nó, tính từ con cuối cùng. Tức là trong 1 element parent bao gồm: li, p, span. Khi đó pseudo-classes này sẽ chỉ quét những element nào là <li> sau đó lựa chọn phần tử <li> thứ 2 tính từ dưới lên  |
|:nth-of-type(n)|li:nth-of-type(2)|	Chọn mỗi phần tử <li> là phần tử <li> thứ hai của cha / mẹ|
|:only-of-type|li:only-of-type|Chọn mỗi phần tử <li> là yếu tố <li> duy nhất của cha mẹ nó. Tức là trong 1 element parent bao gồm: li, p, span. Khi đó pseudo-classes này sẽ chỉ quét những element nào là <li> chỉ xuất hiện đúng 1 lần. Còn nếu xuất hiện từ 2 lần trở nên sẽ không tác dụng|
|:only-child|li:only-child|Chọn mỗi phần tử <li> là con duy nhất của parent của nó|
|:optional|	input:optional|	Chọn các phần tử <input> không có thuộc tính “required”|
|:read-only|input:read-only|Chọn các phần tử <input> với thuộc tính “readonly” được chỉ định|
|:read-write|input:read-write|Chọn các phần tử <input> mà không có thuộc tính “readonly”|
|:required|input:required|Chọn phần tử <input> với thuộc tính “required” được chỉ định|
    
## 4. Pseudo-classes tác động lên link 

Trong nhóm này chúng ta sẽ có 4 pseudo-class chính đó là **:link,  :visited,  :hover và :active**. Về cách sử dụng của 4 pseudo-classes này mình cũng đã viết ở bên trên. Mọi người tìm đọc lại nhé
    
```
/* unvisited link */
a:link {
color: #FF0000;
}

/* visited link */
a:visited {
color: #00FF00;
}

/* mouse over link */
a:hover {
color: #FF00FF;
}

/* selected link */
a:active {
color: #0000FF;
}
```

Một điều chú ý ở đây là các bạn phải viết theo đúng thứ tự như trên thì css mới nhận do độ ưu tiên trong css. Nếu khi chúng ta tráo đổi vị trí như đưa **a:hover** lên trước **a:link** và **a:visited** thì khi ta rê chuột vào link nó sẽ không đổi màu, tương tự với việc nếu chúng ta đảo vị trí của **a:active** với **a:hover**.

Thực chất pseudo-class **:hover ** có thể sử dụng có các element khác chứ không chỉ sử dụng riêng cho <a> như 2 pseudo-classes **a:link** và **a:visited**.
    
## 5. Pseudo-classes tác động lên các element trong form
    
Những pseudo-class có tác dụng với các element trong form như **:focus, :checked, :active, :read-only, :disable, :require, :invalid, :optional, :read-write**. Tất cả những pseudo-classes này mình cũng đã giải thích cách sử dụng ở bên trên.

Riêng với **:checked** các bạn có thể tham khảo cách dùng cho input ở bài viết dưới này của mình nhé

[ https://viblo.asia/p/bai-10-css-cho-mot-so-tag-dac-biet-nhu-checkbox-radio-button-va-seclect-box-6J3ZgE1q5mB](https://viblo.asia/p/bai-10-css-cho-mot-so-tag-dac-biet-nhu-checkbox-radio-button-va-seclect-box-6J3ZgE1q5mB)
 
 Như vậy, qua bài viết này mình đã giới thiệu tới các bạn khái niệm cũng như cách sử dụng của 1 số pseudo-classes hay sử dụng. Hi vọng bài viết này sẽ giúp ích ít nhiều cho các bạn.