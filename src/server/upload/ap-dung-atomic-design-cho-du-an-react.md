Với rất nhiều người khi bắt đầu phát triển ứng dụng với React thì các sẽ gặp rất nhiều tình trạng chọn cấu trúc folder như thế nào để dễ dàng quản lý. Lúc trước thì mình thường hay sử dụng cấu trúc phân theo từng chức năng.
Ví dụ: Đây là ứng dụng đăng ký và đăng nhập. Và mình cấu trúc thư mục theo từng chức năng.
![](https://images.viblo.asia/f2585e0a-1c0b-4436-a3f3-2d947ce96ff8.png)

Với cấu trúc folder như thế này, có vấn đề sẽ nãy sinh đó là ở component Login hay Register đây là 2 form, thì nó có cùng những features như submit, reset,… Ngoài ra, thông thường style của 2 form này là tương đối giống nhau về mặt cấu trúc, chưa kể thêm style của các thẻ 
<input /> sẽ giống nhau, như vậy chúng ta cần phải phân thêm những component nữa.
![](https://images.viblo.asia/b1a818fe-a730-45b1-84ba-c13fafa8064b.png)

Hãy tưởng tượng xem khi chúng ta bắt đầu phát triển một dự án lớn hơn thì chúng ta sẽ có rất rất nhiều component nhưng mà chúng ta cũng không thể control được tất cả các component và cũng không thể phân cấp được component.

## Vậy với Atomic design thì sẽ như thế nào?
Trước hết chúng ta hãy xem **Atomic** là gì? -   **Atomic design** là một phương pháp thiết kế chương trình. Và được chia thành 5 cấp: ***Atoms, Molecules, Organisms, Templates, Pages***.

Trong bài viết này thì mình sẽ không đi sâu vào định nghĩa mà mình chỉ mô tả đơn giản từng thành phần:

**Atoms**: đây là thành phần cơ bản nhất. Vd: *button*,*label*,*title*,...

**Molecules**: bao gồm những thành phần **Atoms** tạo thành một thành phần lớn hơn. Vd: *Thanh search*,*Menu*,*Slider*...

**Organisms**: là một thành phần lớn hơn, là sự kết hợp của **Atoms**,**Molecules**. Vd: *Search Header*,*Banner*,...

**Templates**: sẽ nhóm các thành phần **Organisms** thành một một phần ở một trang. Vd: *Header*,*Sidebar*,...

**Page**: là sự kết hợp các **Template** để thành một trang hoàn chỉnh.

Đó là phần sơ lược về **Atomic design**, nhưng khi áp dụng, chúng ta có thể linh hoạt trong việc sử dụng chúng.

Áp dụng cho ví dụ ở trên:
![](https://images.viblo.asia/e1f1f677-447c-4d63-b3af-ec2a0959da9a.png)

Ở thư mục *atoms* mình có 5 components: **Button**,**Input**,**Label**,**Modal**,**Title**. 

Tiếp theo ở thư mục *molecules* mình có 3 component: **GroupButton** (Component gồm 2 button), **GroupInput** (gồm label, input), **Message** (gồm modal, label).

Ở thư mục *organisms* thì là sự kết hợp của *atoms*, *molecules* để tạo thành 2 form. 


Với việc sử dụng **Atomic design** chúng ta tạo một cấu trúc thư mục: rõ ràng hơn, được phân chia. Ở ví dụ trên có ít components nên chỉ cần vậy là đủ để chúng ta có thể tạo nên UI mà mình mong muốn.

## Tổng kết
Tùy theo từng dự án React mà sẽ có một cấu trúc tối ưu cho nó. Và **Atomic design** là một trong số đó. Mình khá là thích thú khi áp dụng nó vào dự án của mình, nó giúp mình dễ control, maintain code hơn trong quá trình phát triển dự án.
Trên đây là những kiến thức mà mình có được và chia sẻ cho mọi người. Cảm ơn mọi người đã đọc bài viết của mình, nếu như có sai sót, hay đóng góp các bạn có thể để lại comment giúp mình viết tốt hơn.

### Tham khảo
https://bradfrost.com/blog/post/atomic-web-design/