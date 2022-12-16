Chắc hẳn chúng ta đã quen với khái niệm DOM - Document Object Model nhưng không phải tất cả mọi người đều hiểu rõ về nó, sau đây mình sẽ trình bày rõ hơn khái niệm này.

# Quá trình hình thành DOM
![](https://images.viblo.asia/fa5264cd-8f81-49be-9711-daf1d06f3268.png)

Khi bạn request một website, dù cho phía backend là ngôn ngữ gì đi nữa (php, ruby, java, etc) thì nó cũng sẽ trả về một trang HTML.

Sau đây là các bước hình thành DOM khi mà người dùng request một website. 

## 1. Conversion
Trình duyệt web sẽ đọc những bytes dữ liệu thô của trang HTML được trả về translates nó sang những characters riêng biệt tùy thuộc vào chuẩn encode của file (thường là UTF-8).

Ví dụ: 

`<html><head></head><body><h1>hii</h1></body></html>`
## 2. Tokenizing
Ở bước này, trình duyệt sẽ converts những html tags ở trên thành những tokens riêng biệt.
![](https://images.viblo.asia/b12c5895-3da0-4716-9b15-25e19ff76bf2.jpg)
Những tokens là: 
* DOCTYPE
* start tag
* end tag
* comment
* character
* end-of-file
## 3. Lexing
Những tokens ở trên sẽ được chuyển thành những Node Objects có thuộc tính riêng biệt.
![](https://images.viblo.asia/42480acb-ed10-4ced-b1dd-abac8b02ef0b.jpg)
## 4. DOM construction
Ở bước cuối cùng này, nhờ vào html markup chúng ta có thể biết được quan hệ giữa các node objects trên và chuyển chúng thành một cây - đó chính là DOM. 

DOM tree trông sẽ như thế này: 
![](https://images.viblo.asia/d1d58227-935b-4ea8-8e54-af1538f8bcb3.jpg)

### Nodes in DOM tree
Mỗi HTML element là một Node trong cây, trong đó root node là node của thẻ `<html>`.

Hầu hết các node trong DOM tree đều có parent node (node cha - node liền trên), child nodes (node con - những nodes liền dưới) và siblings (nodes anh em - những nodes có cùng parent node) tạo thành một family.
Một số quy luật của các nodes trong DOM tree: 
* Nút gốc (root document) luôn luôn là nút đầu tiên.
* Tất cả các nút không phải là nút gốc và đều chỉ có 1 nút cha (parent).
* Một nút có thể có một hoặc nhiều con, hoặc cũng có thể không có con nào.
* Những nút anh em (siblings) thì có cùng nút cha.
* Trong các nút anh em (siblings), nút đầu tiên được gọi là anh cả (firstChild) và nút cuối cùng là em út (lastChild).


# Vậy DOM là gì?
Qua những bước trên, chúng ta có thể hiểu DOM là một model dưới dạng cây, nó biểu thị đầy đủ mối quan hệ, thuộc tính và nội dung của trang HTML mà trình duyệt nhận được. Document trỏ tới trang html hoặc xml được thể hiện như một đối tượng.  

Model này được tạo ra bởi trình duyệt, và tạo ra một đối tượng để thể hiện nó. Chúng ta có thể truy cập tới đối tượng này với Javascript.

Theo W3C (World Wide Web Consortium) standard thì DOM được định nghĩa như là một chuẩn để truy cập tới documents:

> "The W3C Document Object Model (DOM) is a platform and language-neutral interface that allows programs and scripts to dynamically access and update the content, structure, and style of a document."

W3C DOM standard chia làm 3 phần:
* Core DOM - standard model for all document types
* XML DOM - standard model for XML documents
* HTML DOM - standard model for HTML documents

# HTML DOM với  JS 
HTML DOM sẽ cho phép Javascipt chỉnh sửa nội dung của các elements trong trang HTML bằng Javascript thông qua DOM interface - `document`. Chúng ta có thể truy cập vào DOM tree của một trang html qua document interface này. 
### Các thuộc tính của document  
Dưới đây là các thuộc tính chính của document mà có thể truy cập và chỉnh sửa được.

![](https://images.viblo.asia/91c19646-676b-40e4-9c1d-53de71c518c0.jpg)

### Các phương thức của document  
Chúng ta có thể truy cập và thay đổi nội dung của document thông qua các methods của document object. Chúng ta có một vài methods chính như sau:
![](https://images.viblo.asia/b5f8bc2e-6bb0-469b-bace-7e538c4c1cf9.png)
# Tài liệu tham khảo
[The HTML DOM Document Object](https://www.w3schools.com/js/js_htmldom.asp) 

[Introduction to the DOM ](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

[Understanding Document Object Model (DOM) in Details](https://www.hongkiat.com/blog/understanding-document-object-model/)