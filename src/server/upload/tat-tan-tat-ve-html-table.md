# Giới thiệu về Table
HTML Table được sử dụng để sắp xếp dữ liệu ví dụ như text, ảnh, hoặc link,... vào một bảng có cột và hàng tương ứng

## Khi nào cần sử dụng Table?
HTML Table được thiết kế để sắp xếp dữ liệu.  Nó sẽ thật là thuận tiện nếu chúng ta muốn viết nhiều thông tin vào trong một Table
## Khi nào không cần sử dụng Table
HTML Table sinh ra chỉ để cho việc hiển thị dữ liệu nên chúng ta sẽ không dùng Table để làm layout. Ở thời điểm những năm 2000 thì có thể việc dùng Table làm layout rất phổ biến, nhưng hiện nay đã có rất nhiều phương pháp khác nhau để làm layout như Flexbox, CSS Grid. Vì thế tuyệt đối không tạo layout bằng HTML Table 
# Thành phần trong Table 
Table row (hàng) sẽ được nhóm thành `head`, `foot` và `body` tương ứng với các thuộc tính `thead`, `tfoot` và `tbody`. 

Không chỉ có hàng, bạn cũng có thể nhóm cột bằng thuộc tính `colgroup` và `col`
Giờ hãy cùng xem ví dụ dưới đây
{@codepen: https://codepen.io/thang21/pen/yZrLxg}

# Thành phần và thuộc tính của Table 
## <tfoot>
Như tên gọi của nó thẻ `tfoot` xác định một hoặc nhiều thẻ `<tr>` là những dòng cuối cùng trong một cột của table. 
`<tfoot>` phải nằm bên trong thẻ `<table>`

Trong HTML5, `<tfoot>` có thể đặt trước hoặc sau thẻ `<tbody>` và `<tr>`, nhưng phải đặt ở sau các thẻ như `<caption>`, `<colgroup>`, `<thead>`.

## <tbody>
Thẻ `<tbody>` phải nằm ngay sau thẻ `<table>` và được dùng để định nghĩa một table cùng với thẻ `<tr>`.
Thẻ `<tbody>` sẽ luôn nằm giữa thẻ `<thead>` và `<tfoot>`

## <thead>
Thẻ `<thead>` được dùng để nhóm các thành phần đầu trong <table>.

## <tr>
Thuộc tính của thẻ `<tr>` bao gồm: 
* <tr align=””>
* <tr valign=””>
* <tr bgcolor=””>
* <tr background=””>
* <tr bordercolor=””>

Thẻ `<tr>` dùng để nhóm thẻ `<th>` hoặc `<td>` vào một hàng đơn hoặc một table heading. Thẻ này có thể nằm ngay sau `<table>` hoặc nằm bên trong các thẻ cha như `<thead>`, `<tfoot>` hoặc `<tbody`

## col
Thẻ `<col>` nằm trong thẻ `<colgroup>`, được dùng để nhóm các cột bảng với nhau. Thẻ này không nhóm các cột với nhau theo một cấu trúc nào đó - mà là vai trò của phần tử. 

## colgroup
Thẻ `<colgroup>` được sử dụng để định dạng cho một nhóm cột trong `<table>`
Tag `<colgroup>` hữu ích trong việc định dạng chung cho toàn bộ cột, thay vì đình dạng riêng, lặp lại cho mỗi hàng.

# Những thuộc tính mà bạn cần biết
## Vertical-align
Giá trị của thuộc tính này: baseline, sub, super, text-top, text-bottom, middle, top, bottom, %, length

Thuộc tính này dùng để căn chỉnh nội dung bên trong bảng. Những giá trị mà hay dùng nhiều là `top`, `bottom`, `middle`
## White-space
Giá trị của thuộc tính này: normal, pre, nowrap, pre-wrap, pre-line

Thuộc tính này quản lí việc hiển thị text như thế nào (1 dòng hay xuống dòng,...)
## Border-collapse
Giá trị của thuộc tính này: collapse, separate

Thuộc tính border-collapse xác định đường viền của table có tách biệt ra hay không.
## Border-spacing
Giá trị của thuộc tính này: length

Thuộc tính border-spacing xác định khoảng cách giữa các đường viền của table
## Table-layout
Giá trị của thuộc tính này: auto, fixed

Auto là giá trị mặc định của thuộc tính này. Nếu thay đổi sang fixed, thì độ rộng của table và column được tính theo độ rộng của table và col của hàng đầu tiên.

# Một vài tricks hay
## Nesting Tables
Nesting Tables nghĩa là đặt một table bên trong một table. Tuy đây không phải là một giải pháp hữu hiệu vì độ phức tạp về markup nhưng cũng sẽ có lúc chúng ta cần phải sắp xếp theo tùy mục đích. Hãy chắc chắn rằng bạn phải viết đầy đủ cấu trúc của một table để cho nó hoạt động được nhé!

{@codepen: https://codepen.io/thang21/pen/GzLaKN}

## Zebra Striping Tables
Đây là một trong những dạng table phổ biến, table dạng sọc, nghĩa là sọc trắng và sọc ghi xen kẽ. Cách làm này rất đơn giản, bạn sẽ chỉ cần chỉnh sửa một chút css là được 
```
tbody tr:nth-child(odd) {background: #f4f4f4; }
```

Hãy cùng xem qua ví dụ dưới đây:
{@codepen: https://codepen.io/thang21/pen/mvgogg}

## Căn chỉnh Table ra giữa
Bạn có thể căn chỉnh Table ra giữa với một chút css 
```
margin: auto;
```
hoặc có thể dùng Flexbox
```
display: flex;
justify-content: center;
align-items: center;
```

Trên đây là bài viết về HTML Table, mong rằng qua bài này các bạn có thể hiểu rõ về Table và có thể áp dụng vào các dự án thực tế của riêng mình!
<hr>

Bài viết tham khảo tại [freecodecamp](https://medium.freecodecamp.org/html-tables-all-there-is-to-know-about-them-d1245980ef96)