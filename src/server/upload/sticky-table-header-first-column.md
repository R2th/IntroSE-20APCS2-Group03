Sticky table headers trên các thiết bị đem lại trải nghiệm người dùng tốt. Khác với các văn bản in, người dùng có thể dễ dàng thoải mái đối chiếu trên một table lớn với rất nhiều data. Trên thiết bị thì nó lại rất dài và khó để hiểu được mình đang target vào cột nào khi mà bạn nhảy vào giữa table đó.
Đã có những plugins jquery support cho việc này, bằng cách này, bất cứ khi nào chúng ta scroll table xuống, phần thead sẽ luôn luôn fixed trên cùng để người dùng có thể dễ dàng đối chiếu.
Gần đây, với position sticky, một thuộc tính mới của css mà mới chỉ support trên chrome cũng cho phép chúng ta làm điều đó, và nó khá là smooth, dễ sử dụng.

Chúng ta không thể sticky cả thead, hay tr, nhưng chúng ta lại có thể sticky được th, điều đó có nghĩa là chúng ta có thể sticky được header của table bằng cách sticky các th.
Một chú ý nhỏ là chúng ta sẽ cần apply position relative cho table sử dụng sticky.

### Sticky header table only
{@embed: https://codepen.io/buiduccuong30051989/pen/ExxMbdK}

### Sticky header & cột đầu tiên trong table
{@embed: https://codepen.io/buiduccuong30051989/pen/zYYbPJr}

Một chú ý nhỏ là safari và ios sẽ cần set property sticky cho cả tfood nữa, chrome thì ko.

Mặc dù thuộc tính này vẫn còn mới và chưa dc hỗ trợ nhiều trên các trình duyệt khác, nhưng với tính thực tiễn của nó thì sớm muộn gì nó cũng sẽ rất phổ biến thôi.
Mới lạ dù có hỗ trợ hay không thì nó cũng không làm ảnh hưởng đến layout của bạn. Còn nếu bạn muốn hỗ trợ trên các trình duyệt khác thì hãy dùng plugins hoặc tự viết js cho an toàn.
Các bạn có thể tham khảo trên [tympanus](https://tympanus.net/codrops/2014/01/09/sticky-table-headers-columns/), bài viết này hướng dẫn dùng js.