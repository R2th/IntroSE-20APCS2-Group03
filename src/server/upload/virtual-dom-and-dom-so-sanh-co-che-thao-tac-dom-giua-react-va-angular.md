Chào mọi người, bài viết này mình sẽ trình bày về Virtual DOM, cơ chế làm việc với DOM giữa Angular và React js.
Để đi vào vấn đề trước tiên hãy cùng xem DOM là gì nhé.
# DOM là gì
Như chúng ta đã biết thì bất kỳ framework frontend hay lib js hiện nay đều cần tương tác với người dùng thông qua DOM. bài viết hôm nay chúng ta cùng tìm hiểu về cách mà React js và Angular thay đổi nội dung trang như thế nào và vì sao React js lại có hiệu năng DOM cao hơn Angular.

> DOM là viết tắt của Document Object Model - là một web API interface cho tài liệu html và xml.
> Nó định nghĩa cấu trúc của Document và cách mà Document được truy cập từ các chương trình để chúng có thể thay đổi cấu trúc, style và nội dung Document.

### Trong html thì:

HTML DOM là một Object cho HTML. Nó định nghĩa:

- HTML elements là những objects
- Thuộc tính cho HTML elements
- Các phương thức dành cho HTML elements
- Các sự kiên dành cho HTML elements

### Còn đối với Javascript thì
HTML DOM là một API Interface đã được định nghĩa, với DOM javascript có thể:

- JavaScript có thể thêm sửa xóa HTML elements
- JavaScript có thể thêm sửa xóa HTML attributes
- JavaScript có thể thêm sửa xóa CSS styles
- JavaScript có thể quản lý events trên HTML

Trong javascript, Document Object Model chính là object ```document```

![](https://images.viblo.asia/9a6ef185-6277-4f3d-a153-fc215f0451a4.png)

# Mở đầu
Thao tác với DOM là công việc chủ yếu của các web framework hay lib UI hiện đại, tuy nhiên các framework/ lib thường cập nhật DOM nhiều hơn mức cần thiết bởi yêu cầu về trải nghiệm người dùng càng ngày càng cao.

React sử dụng công nghệ DOM ảo còn Angular thì sử dụng DOM thường.  Vậy DOM ảo là gì? Bài viết hôm nay sẽ đào sâu vào cơ chế của DOM ảo ở React js.

- Thao tác trên DOM thực là sử dụng bộ web api interface được định nghĩa cho object document
- Thao tác với DOM thông qua DOM ảo thì sử dụng API của framework hoặc lib UI

Ví dụ chúng ta cần tìm kiếm một element, sử dụng DOM thật chúng ta sẽ gọi hàm sau:

```html
<ul>
    <li id ='myFirstLI' >First list item</li>
</ul>
```

``` javascript
var item = document.getElementById("myFirstLI");
item.parentNode.removeChild(item);
```

Ngày nay các trang web cấu trúc phức tạp, nên cây DOM khá lớn. Việc tạo dựng một web site động đòi hỏi query & update DOM rất nhiều, nên đến đây sẽ xảy ra vấn đề về hiệu năng của website.

# Virtual DOM là gì?

DOM ảo được cho là một phiên bản thu nhỏ của DOM. Nó chứa tất cả thông tin cần thiết để tạo nên một DOM

>DOM ảo (VDOM) là một khái niệm lập trình trong đó một đại diện của một DOM trên trang được lưu trong bộ nhớ và được đồng bộ hóa với DOM thật bởi thư viện ReactDOM.
>

Có thể hiểu DOM thật là một căn nhà còn DOM ảo sẽ là một bản thiết kế của căn nhà đó. React js sử dụng DOM ảo, vì thế thao tác trên DOM sẽ không thông qua các method dành cho DOM như đã nói ở trên nữa, mà thông qua API của React.

Về cơ bản thì làm việc với DOM ảo sẽ nhanh hơn là làm việc với DOM thật bởi thay đổi DOM ảo giống như thay đổi một bản thiết kế, khác với DOM thật là thay đổi trực tiếp một căn phòng trong căn nhà.

Giả sử chúng ta cần giải quyết bài toán sau:

> Thay đổi nội dung thẻ li đầu tiên từ "List item" thành "List item one" và thêm một item khác là "List item two".
> 

-----

```html
<!DOCTYPE html>
<html lang="en">
 <head></head>
 <body>
    <ul class="list">
        <li class="list__item">List item</li>
    </ul>
  </body>
</html>
```

Mô tả nó theo cây DOM

```
--> html
--> head lang="en"
-->   body
-->     ul class="list"
-->       li class="list__item"
-->         "List item"
```

Ví dụ sau đây là một *trường hợp thông thường* mà chúng ta update nội dung trang, như sau:

- Sử dụng DOM API để tìm element mà chúng ta muốn update
- Thêm element, attributes và nội dung
- Và cuối cùng là update DOM element đó

```javascript
const listItemOne = document.getElementsByClassName("list__item")[0];
listItemOne.textContent = "List item one";

const list = document.getElementsByClassName("list")[0];
const listItemTwo = document.createElement("li");
listItemTwo.classList.add("list__item");
listItemTwo.textContent = "List item two";
list.appendChild(listItemTwo);
```

Phương thức như ```document.getElementsByClassName()``` sẽ ổn khi update trang ít nội dung và không thường xuyên. Ngược lại lúc update nhiều nội dung trong thời gian ngắn thì sẽ tốn kém tài nguyên khi phải liên tục tìm và update DOM - một đặc điểm của Angular.

Hơn nữa, do cách thiết kế của DOM API, việc tìm và update phần lớn DOM nó sẽ dễ hơn là tìm và chỉ update phần khác biệt nhỏ.

Quay về ví dụ của danh sách item phía trên, một trong những cách dễ hơn để thay đổi list item bằng item khác là update luôn toàn bộ danh sách ;).

```javascript
const list = document.getElementsByClassName("list")[0];
list.innerHTML = `
  <li class="list__item">List item one</li>
  <li class="list__item">List item two</li>
`;
```

Cả hai cách trên vẫn ổn nếu trang ít nội dung đúng không nào?

Nhưng với DOM ảo chúng ta sẽ không làm như vậy.

> DOM ảo được thiết kế để giải quyết vấn đề update DOM thường xuyên một cách có hiệu năng cao hơn. Vì nó là bản thiết kế của DOM nên có thể update thường xuyên mà không cần sử dụng đến DOM API.
> 
> Khi tất cả các thay đổi đã được update trên DOM ảo, React sẽ kiểm tra xem thay đổi cụ thể nào cần được áp dụng vào DOM gốc (bởi thuật toán so sánh diff của React), và áp dụng thay đổi này vào chính xác chỗ cần thay đổi. 
> 
Hãy cùng xem một DOM ảo sẽ trông như thế nào?

*Lưu ý là những ví dụ trong bài viết chỉ là mô phỏng công nghệ chứ không phải là cách thực tế mà lib hay framework xử lý*

```
--> html
--> head lang="en"
-->   body
-->     ul class="list"
-->       li class="list__item"
-->         "List item"
```

Cây này có thể mô tả như một object javascript như sau:

```javascript
const vdom = {
    tagName: "html",
    children: [
        { tagName: "head" },
        {
            tagName: "body",
            children: [
                {
                    tagName: "ul",
                    attributes: { "class": "list" },
                    children: [
                        {
                            tagName: "li",
                            attributes: { "class": "list__item" },
                            textContent: "List item"
                        } // end li
                    ]
                } // end ul
            ]
        } // end body
    ]
} // end html
```

Cũng như DOM thật, nó là một object đại diện cho html document nhưng nó là một object javascript thuần túy vì thế nên chúng ta có thể thay đổi nó một cách thoải mái và thường xuyên mà không cần query ra DOM trừ khi chúng ta muốn áp dụng lên DOM thật.

Thay vì làm việc với một object lớn là toàn bộ document. Chia ra các object nhỏ là phổ biến hơn giống như việc chia nhỏ trang ra thành nhiều component.

Ví dụ với một object list cho list html phía trên như sau:

```javascript
const list = {
    tagName: "ul",
    attributes: { "class": "list" },
    children: [
        {
            tagName: "li",
            attributes: { "class": "list__item" },
            textContent: "List item"
        }
    ]
};
```

- Đầu tiên chúng ta cần làm là tạo ra một bản copy của DOM ảo này, chứa những nội dung đã thay đổi.

Đây là đoạn mô tả sau khi DOM ảo được update:

```javascript
const copy = {
    tagName: "ul",
    attributes: { "class": "list" },
    children: [
        {
            tagName: "li",
            attributes: { "class": "list__item" },
            textContent: "List item one"
        },
        {
            tagName: "li",
            attributes: { "class": "list__item" },
            textContent: "List item two"
        }
    ]
};
```

- Sau đó đem 2 object này ra để so sánh ```diff```, điều này khá quen thuộc khi làm việc với git.

Bản copy này được sử dụng để tạo ra cái được gọi là một ```diff``` so với DOM ảo ban đầu, trong trường hợp này là danh sách và bản cập nhật. Một ```diff``` sẽ trông giống như thế này:

```javascript
const diffs = [
    {
        newNode: { /* version mới của list item one */ },
        oldNode: { /* version gốc của list item one */ },
        index: /* index của element của list item trong số  các node con */
    },
    {
        newNode: { /* list item two */ },
        index: { /* */ }
    }
]
```

Bản ```diff ``` này cung cấp cơ chế update DOM như thế nào. Một khi mà những điểm khác nhau giữa 2 phiên bản được tìm thấy, chúng ta có thể update thay đổi lên DOM ở chỉ những chỗ cần thay đổi.

- Lặp array diffs này và so sánh xem chỗ nào có thay đổi và thay đổi nếu cần thiết:

```javascript
const domElement = document.getElementsByClassName("list")[0];

diffs.forEach((diff) => {

    const newElement = document.createElement(diff.newNode.tagName);
    /* Add attributes ... */
    
    if (diff.oldNode) {
        // Nếu tồn tại old version, sẽ thay nó bằng version mới
        domElement.replaceChild(diff.newNode, diff.index);
    } else {
        // Nếu không tồn tại old version, sẽ tạo node mới
        domElement.appendChild(diff.newNode);
    }
})
```

*Lưu ý: Thực tế lib update sẽ có nhiều case khác nhau, ví dụ trên chỉ là mô phỏng đơn giản cách mà DOM ảo hoạt động.*

ReactJS sử dụng thuật toán diff để tìm số bước tối thiểu để cập nhật DOM thực. Khi có các bước này, nó sẽ thực hiện tất cả các bước trong một vòng lặp sự kiện mà không liên quan đến DOM thật. Do đó, nếu có thêm phần tử trong DOM ảo được cập nhật, React js sẽ đợi vòng lặp sự kiện kết thúc, sau đó sẽ cập nhật hàng loạt đối với DOM thật.

Khi tất cả các bước được thực thi, React sẽ update DOM thật. Điều này có nghĩa là trong vòng lặp sự kiện, chỉ có một lần update DOM thật. Do đó, tất cả quá trình bố trí sẽ chỉ chạy vào đúng thời điểm để cập nhật DOM thực.

Angular thì không như vậy, Angular sử dụng công nghệ gọi là Incremental DOM, DOM update được trigger mỗi khi model thay đổi.
Mỗi component được biên dịch thành các chỉ dẫn để update lên DOM mỗi khi dữ liệu được thay đổi.

# Kết
Hy vọng qua bài viết mọi người hiểu được Virtual DOM là gì, cũng như hiểu được sự khác nhau giữa Angular và React js khi làm việc với DOM.

Cảm ơn mọi người đã theo dõi bài viết. 

Tham khảo:

- https://hackernoon.com/virtual-dom-in-reactjs-43a3fdb1d130
- https://bitsofco.de/understanding-the-virtual-dom/