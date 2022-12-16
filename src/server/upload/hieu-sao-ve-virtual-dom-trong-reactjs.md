Khi làm việc với ReactJs, sớm hay muộn chúng ta cũng sẽ nghe đến Virtual DOM. Nghe DOM thì có vẻ quen quen, vậy thêm Virtual vào thì khác gì? Hoặc bạn được nói là Virtual DOM ngon lắm, nhanh lắm thì có thực sự đúng không?

# Trước tiên, DOM là gì?
![](https://images.viblo.asia/74e0e748-dff2-4790-a202-f80b29519951.gif) 

*nguồn: w3school*

**DOM** là tên gọi tắt của **Document Object Model** (Mô hình Đối tượng Tài liệu), là một chuẩn được định nghĩa bởi W3C dùng để truy xuất và thao tác trên code HTML hay XML bằng các ngôn ngữ lập trình thông dịch (scripting language) như Javascript.

**DOM** giúp thao tác với dữ liệu theo mô hình hướng đối tượng do các phần tử trong **DOM** có cấu trúc được định nghĩa thành các *đối tượng, phương thức, thuộc tính* để có thể truy xuất dễ dàng. Chúng được coi như các *node* và được biểu diễn dưới dạng **DOM Tree**.

Trong khi HTML là 1 đoạn code, **DOM** là một thể hiện trừu tượng của đoạn code đó trong bộ nhớ.

```html
<html>                                                   -> document node
<head>                                                   -> element node - head
    <title>
        HTML DOM                                         -> text node
    </title>                                             -> element node - title
</head>                                                  
<body>                                                   -> element node - body
</body>                                                   
</html>                                                   
```
**HTML DOM** cung cấp API để duyệt và chỉnh sửa các *node*. Nó chứa các phương thứcthức như `getElementById` hay `removeChild`.
```JS
var content = document.getElementById("myContent");
content.parentNode.removeChild(item);
```
Vì vậy với lập trình viên web, khi nắm rõ kiến thức về **DOM** và khả năng thao tác với **DOM** cũng có nghĩa là có sức mạnh thay đổi mọi thứ của trang web :v 

# DOM ngon vậy thì sao lại có Virtual DOM?
Chúng ta có thể thấy hình ở trên, **HTML DOM** được cấu trúc dạng cây. Thực sự rất ngon vì có thể duyệt cây rất dễ dàng. Thật là đen, ở đây không phải cứ dễ là tốc độ nhanh.
![](https://images.viblo.asia/1a81fa13-edd6-4366-b47f-34d1f080ea4b.png)

Tuy nhiên đừng hiểu nhầm việc đọc và ghi vào **DOM** của trình duyệt là chậm. Điều này không đúng. **DOM** nhanh. Việc cập nhật các `node` trong **DOM** không mất nhiều thời gian hơn việc thiết lập một thuộc tính trên một đối tượng JavaScript. Đó là một hoạt động đơn giản.

Điều chậm ở đây là layout mà các trình duyệt phải làm bất cứ khi nào DOM thay đổi. Mỗi khi DOM thay đổi, trình duyệt cần phải tính toán lại CSS, thực hiện dựng lại trang web. Đây là việc cần có thời gian.

Và hiện nay **DOM Tree** thực sự rất lớn. Việc những trang web SPA ngày càng được phát triển mạnh và đa dạng, vì vậy việc sửa đổi **DOM Tree** là liên tục không ngừng và sửa đổi rất nhiều. 

Xem xét một **DOM** được tạo bởi hàng nghìn `div`, Có quá nhiều phương thức để xử lý các event `click, submit, ...` Điển hình của việc xử lý event trong *jQuery* sẽ là:
* Tìm tất cả các *node* liên quan đến event
* Cập nhật nó nếu thấy cần thiết

Chúng ta gặp 2 vấn đề:
* Thực sự rất khó để quản lý. Tưởng tượng xem nếu phải chỉnh sửa một đoạn xử lý event mà không nắm được context thì bạn sẽ phải bơi thật sâu trong code để có thể xem nó đang làm gì. Tốn thời gian và rủi ro cao.
* Nó không hiệu quả. Có nhất thiết cứ phải đi tìm tất cả những gì liên quan không? Hay có thể thông minh hơn bằng cách chỉ tìm `node` nào cần cập nhật.


ReactJs đến và cho chúng ta giải pháp, thay vì xử lý **DOM Tree** thủ công, chúng ta định nghĩa các `component` trông giống giống thế còn ReactJs sẽ thực hiện công việc ở tầng thấp hơn. Thực chất, công việc xử lý sẽ được **HTML DOM API** đảm nhiệm ở các tầng đó. Đây chính xác là cách mà **Virtual DOM** hoạt động.
# Virtual DOM
**Virtual DOM** không được tạo ra bởi React tuy nhiên nó được React sử dụng và cung cấp miễn phí.

Một cách tổng quát thì nó là một định dạng dữ liệu JavaScript nhẹ được dùng để thể hiện nội dung của DOM tại một thời điểm nhất định nào đó. Nó có tất cả các thuộc tính giống như **DOM** nhưng không có khả năng tương tác lên màn hình như **DOM**.

Bạn có thể tưởng tượng, ở **DOM** có thẻ `div` và các thẻ `p` ở trong, ReactJs sử dụng **Virtual DOM** bằng cách tạo ra các `object` `React.div` và `React.p` và khi tương tác, ta sẽ tương tác qua các object đó một cách nhanh chóng mà không phải đụng tới **DOM** hay **DOM API** của nó. 

Đây là lí do tại saosao JSX của code ReactJs có thể trông như code HTML thuần tuý =))
```javascript
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="text">
        Syntax like HTML
      </div>
    );
  }
});
```
Trong hầu hết các trường hợp, khi bạn có đoạn code HTML và muốn chuyển nó vào ReactJs, tất cả những gì bạn phải làm là:
* Gõ code HTML trong render
* Thay thế `class` thành `className` 


 **Virtual DOM** sử dụng `key, ref` mà ở **DOM** không có :D và **Virtual DOM** được tạo mới sau mỗi lần `render` lại.



-----


Tuy nhiên, sự đặc biệt của **Virtual DOM** nằm ở *Snapshots & Diffing*
Như giải thích ở trước đó, cách hoạt đông của **Virtual DOM** trong React đó là:

React lấy một *snapshot*  của **Virtual DOM** (có thể hiểu là bản ghi trạng thái ngay lúc đó) ngay trước khi áp dụng bất kỳ bản cập nhật nào. Sau đó, nó sử dụng `snapshot` này để so sánh với một **Virtual DOM** được cập nhật trước khi thực hiện các thay đổi.

![](https://images.viblo.asia/78271889-d823-4670-b2f4-f2ab6f601dfb.png)

Khi cập nhật được cấp cho **Virtual DOM**, quá trình tiếp theo React sử dụng thuật toán `Diffing` để so sánh và đối chiếu để biết được sự cập nhật được diễn ra ở đâu sau đó cập nhật nó mà bỏ qua những elements không liên quan.

![](https://images.viblo.asia/e5e383ef-6745-43bb-b09d-3438a15342f6.png)

Chỉ những đối tượng này được cập nhật trên  **DOM** và các thay đổi trên **DOM** vừa rồi sẽ làm cho màn hình thay đổi.
![](https://images.viblo.asia/692456e7-5624-4a0d-b3d1-ece222431ead.png)
# Lợi ích của Virtual Dom

> Việc tách biệt logic liên quan đến việc *rendering* ra khỏi **DOM** cho phép React chạy được trên nhiều môi trường khác nhau thay vì chỉ một môi trường duy nhất là trình duyệt (React Navtive hoặc SSR - Server-Side Rendering cho cả React). Chúng ta biết rằng Virtual DOM trên thực tế chỉ là một JavaScript object do đó chúng ta chỉ cần một môi trường cho chép chạy JavaScript và việc sử dụng Virtual DOM là hoàn toàn khả thi. Một số ví dụ có thể nói đến ở đây là: SSR sử dụng NodeJS hoặc embedded JavaScript khi xây dựng các ứng dụng native cho nền tảng Web cũng như Mobile. Công việc của chúng ta là thay đổi generation algorithm cho từng môi trường cụ thể nhằm thu được các output mong muốn cho từng môi trường đó.
 
> Sử dụng Virtual DOM cho phép chúng ta tính toán các thay đổi trên đó (just JavaScript) và áp dụng đồng thời các thay đổi đó lên Actual DOM khi cần thiết. Phương pháp này sẽ hiệu quả hơn khá nhiều so với việc access Actual DOM element (sử dụng jQuery chẳng hạn) và tính toán các thay đổi trên đó.
> 

# Một số vấn đề
##### Thực sự Virtual DOM trong ReactJs nhanh hơn nhiều so với DOM?
Bản thân **Virtual DOM** thực sự rất nhanh, nó có thể tìm kiếm, cập nhật và xoá bỏ các `elements` từ **Virtual DOM Tree** một cách nhanh chóng. Tuy nhiên, ở **DOM** thì những công việc đó cũng rất nhanh, chỉ là việc bố cục và thể hiện các elements của **DOM** mới là điều chậm. Nhưng React **Virtual DOM** không nhanh hơn. 


Một lợi ích gắn liền khi sử dụng React là chúng ta có thể kiểm soát việc *re-render* của các `component` bằng cách sử dụng phươnt thức `shouldComponentUpdate` và `setState`.



-----



##### Vậy sử dụng Virtual DOM có làm tăng performance cho ứng dụng không?
![](https://images.viblo.asia/23e46448-8866-4317-a45e-528f2d0f4726.png)

*Có thời điểm React ghi rằng sử dụng Virtual DOM sẽ làm tăng performance. Tuy nhiên giờ đã không còn nữa mà chỉ đề cao sự tiện lợi cho nhà phát triển*

Trong thời kì đầu của **Virtual DOM** (đặc biệt là React), một số người nổi tiếng có nói rằng  **Virtual DOM** giúp cập nhật **DOM** nhanh chóng. Như chúng ta có thể thấy được, điều này không khả thi về mặt kỹ thuật. Cập nhật **DOM** phải được tối ưu hóa trong mã gốc của trình duyệt chứ không có phép màu nào có thể giải quyết vấn đề này cả.
# Kết luận
Bài viết này mình muốn làm rõ ý đồ sử dụng của **Virtual DOM** trong React. Lợi ích của nó là điều dễ nhận ra. Tuy nhiên những vấn đề vừa đề cập do mình tổng hợp và cảm thấy khá hợp lý chứ không phải là sự khẳng định chính thống nào cả. Mong nhận được sự đóng góp của các bạn!

Tham khảo: 

https://medium.com/@hayavuk/why-virtual-dom-is-slower-2d9b964b4c9e

https://www.quora.com/Why-is-Reacts-virtual-DOM-so-much-faster-than-the-real-DOM

https://viblo.asia/p/how-does-the-vue-template-work-Qpmleqvklrd

http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/

https://medium.com/@hidace/understanding-reacts-virtual-dom-vs-the-real-dom-68ae29039951