Trong bài viết này, chúng ta sẽ tìm hiểu về một khái niệm không hề mới nhưng không phải ai cũng có thể nắm rõ và sử dụng linh hoạt, CSS Selector.

CSS Selector là gì, nó được chia ra làm những loại như thế nào ?

### **CSS Selector là gì**
Một css selector dùng để select một hoặc nhiều element mà chúng ta muốn css

Đối với những người chưa có kinh nghiệm hay chưa nắm rõ về CSS Selector thường sử dụng tên thẻ, id hoặc class để select các elements. Điều này dẫn đến những đoạn code css rất dài, rối rắm và khó kiểm soát. Sử dụng css selector linh hoạt giúp chúng ta viết css dễ dàng, ngắn ngọn và clean code hơn.

### Các loại CSS Selector
Chúng ta có thể chia CSS Selector thành 5 loại:
- Simple selectors
- Combinator selectors 
- Pseudo-class selectors
- Pseudo-elements selectors
- Attribute selectors

**1. Simple Selectors**

Simple Selectors: select các elements dựa trên element name, id, class.

+ selector dựa vào element name:

  ```p { color: red }```

+ selector dựa vào id, class: 

```
#para1, .center {
  text-align: center;
```
  + Bạn cũng có thể select một element cụ thể với một class name:

  `p.center {
  text-align: center;
}`

+ Universal selector: select tất cả element trong page:

```
* {
  text-align: center;
}
```
  
### 2. Combinator selectors

Select elements dựa trên mối quan hệ giữa các element


| <div align="center">Selector</div> | <div align="center">Example</div> | <div align="center">Description</div> |
| -------- | -------- | -------- |
| element element     | div p     | Selects tất cả thẻ p bên trong thẻ div     |
| element > element     | div > p     | Selects tất cả thẻ p là con trực tiếp của thẻ div     |
| element + element     | div + p     | Selects 1 thẻ p đứng sau liền kề thẻ div     |
| element ~ element     | div ~ p     | Selects tất cả thẻ p đứng sau thẻ div     |

### 3. Pseudo-class selectors 

Select elements dựa trên một trạng thái của element

Css cung cấp cho chúng ta rất nhiều pseudo-class selector. Dưới đây mình sẽ chỉ giới thiệu tới mọi người một số pseudo-class selector hay dùng.



| Selector | Example | Description |
| -------- | -------- | -------- |
| :active    | a:active     | Selects các thẻ a có trạng thái active     |
| :checked    | input:checked    | Selects tất cả thẻ input có trạng thái checked     |
| :disable   | input:disabled     | Selects các thẻ input có trạng thái disable     |
| :empty    | p:empty     | Selects các thẻ p không có children     |
| :enable    | input:enable     | Selects các thẻ input có trạng thái enable     |
| :first-child    | p:first-child    | Selects các thẻ p là first child của parent chính nó    |
| :fist-of-type    | p:first-of-type     | Selects các thẻ p là first child của một type cụ thể, của parent chính nó     |
| :focus    | a:focus    | Selects các thẻ a đang được focus     |
| :hover    | a:hover     | Selects các thẻ a đang được hover     |
| :last-child    | p:last-child     | Selects các thẻ p là last child của parent chính nó    |
| :last-of-type    | p:last-of-type     | Selects các thẻ p là last child của một type cụ thể, của parent chính nó     |
| :not    | :not(p)     | Selects các element không phải thẻ p    |
| :nth-child(n)    | p:nth-child(2)     | Selects các thẻ p là con thứ 2 của parent chính nó     |
| :nth-last-child(n)    | p:nth-last-child(2)    | Selects các thẻ p là con cuối cùng thứ 2 của parent chính nó, tính từ last child cuối cùng     |
| :only-child    | p:only-child     | Selects các thẻ p chỉ là con của parent chính nó     |
| :root    | root     | Selects document'root element     |
| :target    | a:target     | Selects các thẻ a đã được click vào URL     |
| :visted    | a:visted     | Selects các thẻ a đã được visted     |

Mọi người có thể tham khảo các pseudo-class selector khác tại đây: https://www.w3schools.com/css/css_pseudo_classes.asp

### 4.Pseudo-elements selectors 

Selects and style một phần của một element



| Selector | Example | Description |
| -------- | -------- | -------- |
| ::after    | p:after     | Chèn content vào sau các thẻ p     |
| ::before    | p:before     | Chèn content vào trước các thẻ p     |
| ::first-letter    | p:first-letter     | Selects kí tự đầu tiên của các thẻ p     |
| ::first-line    | p:first-line     | Selects dòng đầu tiên của các thẻ p     |
| ::selection    | ::selection    | Selects các phần mà user chọn (bôi đen)    |

### 5.Attribute selectors

 Selects elements dựa trên một attribute name hoặc attribute value
 
 

| Selector | Example | Description |
| -------- | -------- | -------- |
| [attribute]    | [target]     | Selects tất cả các element có một attribute target     |
| [attribute=value]    | [target=_blank]     | Selects tất cả các element có một attribute target="_blank"     |
| [attribute~=value]    | [title~=flower]     | Selects tất cả các element có một attribute title chứ từ "flower"     |
| [attribute|=value]    | [title|=hello]     | Selects tất cả các element có một attribute title bắt đầu bằng từ "hello"     |
| [attribute^=value]    |a[href^="https"]     | Selects tất cả các element a có một attribute href bắt đầu bằng "https"     |
| [attribute$=value]    | a[href$=".com"]     |  Selects tất cả các element a có một attribute href kết thúc bằng ".com"     |
| [attribute*=value]    | p[title="test"]     | Selects tất cả các element p có một attribute title có chứa từ  "test" không phải là first word  |