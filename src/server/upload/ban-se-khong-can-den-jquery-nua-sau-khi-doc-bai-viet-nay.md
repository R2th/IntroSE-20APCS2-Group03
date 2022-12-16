![](https://images.viblo.asia/7bc68395-e540-466f-b11c-e2ad9ab0713a.jpeg)
# 1. Mở đầu
Không phải ngẫu nhiên mà [Github đã bỏ hoàn toàn JQuery ra khỏi trang web của họ](https://githubengineering.com/removing-jquery-from-github-frontend/). JQuery - theo như Github - "là một như viện khổng lồ", vì vậy sẽ tốn nhiều thời gian để load. Đối với trang web thì chỉ chệnh lệch vài mili giây thôi là cũng đã quyết định người dùng có ở lại trang web hay không rồi :v . Bài viết này mình xin phép được giới thiệu một số selector mà **Vanilla JS** (hay JS thuần) hỗ trợ. Đảm bảo khi đọc xong bài này, họa mi không cần đến JQuery nữa =))

# 2. Một số methods 
## 2.1 Dùng để select các elements
### getElementById()

Method này hoạt động y hệt như $('#id-gì-đó')  của jquery.

`var el = document.getElementsById('a-random-id');`

### getElementsByClassName()

Method này hoạt động giống với $('.class-gì-đó') của jquery

`var el = document.getElementsByClassName('a-random-class')`

Vì class có thể tái sử dụng đựoc nên method này sẽ trả về một tập hợp các element thỏa mãn

### getElementsByTagName()

`var buttons = document.getElementsByTagName('button');`

Method này hoạt động giống với $('tagname') của jquery

### querySelector()
Method này trả về **phần tử đầu tiên** thoả mãn, và selector phải theo cú pháp CSS, tức là bạn có thể sử dụng các selector tương ứng như sau:

- class: `document.querySelector('.a-class');`
- id: `document.querySelector('#an-id');`
- tag: `document.querySelector('button');`

### querySelectorAll()
Method này gần giống với `querySelector()` nhưng nó sẽ trả về **toàn bộ phần tử** thỏa mãn


`var contents = document.querySelectorAll('.content-data');` trả về toàn bộ phần tử chứa class `content-data`

### getAttribute()
Method này sẽ trả về giá trị của attribute tuơng ứng được chỉ định

`el.getAttribute('data-content')`
sẽ trả về giá trị của `data-content` của phần tử 


### addEventListener()

Method này thực hiện một hành động khi có một sự kiện được thực thi trên một phần tử, giống với `.on` của jquery.

Giả sử ta có element `el`, ta muốn thực hiện hàm khi click:
```
el.addEventListener('click', function(event){
    // logic
 })
```
Ngoài ra còn có nhiều event khác như select, kéo thả,...

## 2.2 Dùng để duyệt các phần tử trong DOM
### .childNodes
Thuộc tính này sẽ trả về toàn bộ các phần tử con của một phần tử. Nó gần như trả về **mọi thứ** và **mọi kiểu dữ liệu**, nên hãy cẩn thận khi dùng
```
var container = document.querySelector('.container')
var getContainerChilds = container.childNodes
```

sẽ trả về toàn bộ phần tử con của của phần tử được chọn

### .firstChild
Sẽ trả về phần tử con đầu tiên của phần tử được cho

```
var container = document.querySelector('.container');
var getFirstChild = container.firstChild;
```

### .nodeName
Sẽ trả về tên của phần tử được cho, giả sử ta chọn 1 div, thì nó sẽ trả về... "div" ( =)) )
```
var container = document.querySelector('.container');
var getName = container.nodeName;
```
### .parentNode
Sẽ trả về phần tử cha của phần tử được chọn

```
var container = document.querySelector('.container')
var getParent = container.parentNode;
```

### .firstElementChild
Sẽ trả về phần tử con đầu tiên của phần tử được chọn
```
var container = document.querySelector('.container')
var getValue = container.firstElementChild;
```

### .lastElementChild
Sẽ trả về phần tử con cuối cùng của phần tử được chọn 

```
var container = document.querySelector('.container')
var getValue = container.lastElementChild;
```

### .previousElementSibling

Sẽ trả về phần tử cùng cấp nhưng ở trước phần tử được chỉ định (tương tự có `nextElementSibling`)

```
var container = document.querySelector('.container')
var getValue = container.previousElementSibling;
```

# 3. Kết
Hy vọng sau bài viết này mọi người đã đựoc biết thêm về một số method có sẵn của JS, từ đó (phần nào) bớt lệ thuộc hơn vào JQuery :vulcan_salute: Để đọc thêm, mọi người có thể tìm hiểu tại [link](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)