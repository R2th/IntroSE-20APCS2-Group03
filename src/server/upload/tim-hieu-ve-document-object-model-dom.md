Chắc hẳn ta đều đã nghe về nhiều **DOM** hay là **~~D~~ocument ~~O~~bject ~~M~~odel** khi được nhắc liên quan đến JavaScript. **DOM** là một khái niệm khá quan trọng trong việc phát triển web. Không có nó, ta sẽ không thể nào sửa đổi các trang **HTML** động trong trình duyệt được.

Việc học và hiểu được **DOM** sẽ là cách tốt hơn để truy cập, thay đổi và theo dõi các yếu tố khác nhau của trang HTML. Mô hình này cũng có thể giúp ta giảm thiểu những lần thực thi không cần thiết trong thời gian thực thi tập lệnh.

#### Cây cấu trúc dữ liệu

Trước khi nói về **DOM** là gì, làm thế nào nó đi vào sự tồn tại, nó tồn tại như thế nào, và những gì thực sự xảy ra bên trong nó? Tôi muốn bạn biết về cây cấu trúc dữ liệu.

Để cho đơn giản, ta có thể hiểu cấu trúc dữ liệu chính là việc sắp xếp dữ liệu của bạn. Vâng, đó chỉ là sự sắp xếp cũ đơn giản, cũng như bạn sẽ sắp xếp đồ đạc trong nhà hoặc sách trong giá sách hoặc tất cả các nhóm thức ăn khác nhau mà bạn đang dùng cho bữa ăn trên đĩa của bạn để làm cho nó có ý nghĩa và mục đích đối với chính bạn...

"Sự sắp xếp" này là trung tâm của tất cả. Nó cũng khá quan trọng trong DOM.
Nhưng ta chưa nói về DOM, vì vậy hãy hướng đến một cấu trúc dữ liệu mà có thể bạn sex quen thuộc: **array**.

#### Array & tree

Mảng sẽ có chỉ số và độ dài, chúng có thể đa chiều và có nhiều đặc điểm hơn. Quan trọng nhất là biết những điều này về mảng, đừng bận tâm với điều đó ngay bây giờ. Cứ hiểu đơn giản một mảng là khi bạn sắp xếp những thứ khác nhau trong một dòng. Như hình dưới:

![](https://images.viblo.asia/806ad64f-61df-41c0-ab78-6dd9375a899a.jpg)


Tương tự, khi nhắc đến cây, là khi ta đặt nhiều vật bên dưới một vật khác, bắt đầu với chỉ một vật ở trên cùng, như hình dưới:

![](https://images.viblo.asia/cd4c14ec-f8bc-434d-82aa-84aabd89d642.jpg)

Tùy thuộc vào dữ liệu của bạn là gì hoặc bạn sẽ sử dụng dữ liệu như thế nào, phần tử trên cùng trong cây (root) của bạn có thể là thứ quan trọng hoặc một thứ gì đó chỉ có ở đó để bao bọc các phần tử khác bên dưới nó. Phần tử root cung cấp một nơi để bắt đầu tìm kiếm bất kỳ thông tin nào ta muốn trích xuất từ cây.

![](https://images.viblo.asia/293eafde-1f3e-4649-889e-7e3b106e6b8c.jpg)

#### Ý nghĩa của DOM

**DOM** là viết tắt của từ **Document Object Model**. Tài liệu trỏ tới một tài liệu HTML (XML) được thể hiện như một đối tượng (trong JavaScript mọi thứ chỉ có thể được biểu diễn như một đối tượng!).

Model được tạo bởi trình duyệt có một tài liệu HTML và tạo một đối tượng đại diện cho nó. Ta có thể truy cập đối tượng này bằng JavaScript. Và vì ta sử dụng đối tượng này để thao tác với tài liệu HTML và xây dựng các ứng dụng của riêng mình, **DOM** cơ bản vẫn là một API.

#### Cây DOM

Trong JavaScript, tài liệu HTML được biểu diễn như một đối tượng. Tất cả dữ liệu đọc từ tài liệu đó cũng được lưu dưới dạng đối tượng, được lồng vào nhau

Vì thế, điều này về cơ bản là sắp xếp vật lý dữ liệu **DOM** trong code: mọi thứ được sắp xếp thành các đối tượng. Tuy nhiên, một cách hợp lý, đó là một cái cây.

#### DOM parser

Mỗi phần mềm trình duyệt đều có một chương trình gọi là **DOM Parser** chịu trách nhiệm phân tích cú pháp một tài liệu HTML thành **DOM**.

Các trình duyệt đọc một trang HTML và chuyển dữ liệu của nó thành các đối tượng tạo nên DOM. Thông tin trong các đối tượng **DOM** này được Javascript sắp xếp hợp lý dưới dạng cây cấu trúc dữ liệu được gọi là cây **DOM**. Xem hình bên dưới để dễ hiểu hơn.

![](https://images.viblo.asia/796c8d90-a451-4ed6-80b6-1aa66a4805f9.jpg)

#### Dịch dữ liệu từ HTML thành cây DOM

Xem một file HTML đơn giản, root là thẻ <html>, có con bên trong là <head> và <body>, mỗi thẻ con này lại có nhiều thẻ con của chính nó nữa.
    
```html
<html>
  <head>
    <meta/>
    <link/>
  </head>
  <body>
    <header>
      <h1></h1>
         <h2></h2>
    </header>
    <main>
      <article>
        <p></p>
        <p></p>
        <p></p>
      </article>
    </main>
    <footer>
      <div></div>
    </footer>
  </body>
</html>
```

Trình duyệt đọc dữ liệu HTML và sắp xếp các phần tử vào một cây **DOM** như sau:

![](https://images.viblo.asia/68e9314c-209e-43d3-85d9-b36a295774f6.jpg)

Mỗi phần tử HTML được biểu diễn dưới dạng một nốt ở trong cây **DOM**, và nốt `root` là thẻ <html> 

Vì là biểu diễn của tài liệu HTML nên **DOM interface** trong JavaScript được gọi là `document`. Và ta có thể truy cập cây **DOM** của một tài liệu HTML thông qua `document` bằng JavaScript.

Không những có thể truy cập, mà ta còn có thể tương tác với tài liệu HTML thông qua **DOM**. Ta có thể thêm các yếu tố vào trang web, xóa và cập nhật chúng. Mỗi lần thay đổi hoặc cập nhật bất kỳ nút nào trong cây **DOM**, nó sẽ được phản ánh trên trang web.

#### Cách các nốt được thiết kế

Làm thế nào các dữ liệu được lưu như một đối tượng có thể được sắp xếp hợp lý như một cây? 

Hầu hết các nốt trong một cây đều có một nốt cha (nốt ngày phía trên nó), các nốt con (các nốt bên dưới nó) và các anh chị em (các nốt khác thuộc cùng một gốc). Thế là đủ điều kiện nó như một phần tử của cây.

Thông tin gia đình của mỗi nốt được lưu dưới dạng thuộc tính trong đối tượng đại diện cho nốt đó. Ví dụ, `children` là một thuộc tính của một nốt mang một danh sách các phần tử con của nốt đó, do đó sắp xếp hợp lý các phần tử con của nó dưới nốt.

#### Tránh việc thao tác DOM quá mức

Giả sử bạn muốn cập nhật màu của <div> trên trang web bằng JavaScript. Những gì bạn cần làm là truy cập đối tượng nốt DOM tương ứng của nó và cập nhật thuộc tính `color`. Điều này không ảnh hưởng đến phần còn lại của cây (các nốt khác trong cây).
    
Nhưng, nếu bạn muốn loại bỏ một nốt từ một cây hoặc thêm một nốt vào nó? Toàn bộ cây có thể phải được sắp xếp lại, với nốt bị loại bỏ hoặc thêm vào cây đó. Đây là một công việc tốn kém. Phải mất thời gian và tài nguyên trình duyệt để hoàn thành công việc này.

Ví dụ, khi muốn thêm 5 hàng mới vào một bảng có sẵn. Với mỗi hàng mới, khi một nốt mới được tạo ra và thêm vào cây, cây sẽ được cập nhật lại. Như thế sẽ rất tốn thời gian và tài nguyên.

Ta có thể tránh việc này bằng cách sử dụng `DocumentFragment`. Nó như một cái hộp có thể chứa tất cả năm hàng và được thêm vào cây. Bằng cách này, năm hàng được thêm vào dưới dạng một phần dữ liệu duy nhất và không phải từng phần một, chỉ dẫn đến một bản cập nhật trong cây.

Điều này không chỉ xảy ra khi ta xóa hoặc thêm nốt; khi bạn thay đổi kích thước một nốt cũng có thể ảnh hưởng đến các nốt khác, vì phần tử đã thay đổi kích thước có thể cần các phần tử khác xung quanh nó để điều chỉnh kích thước của chúng. Vì vậy, các nốt tương ứng của tất cả các phần tử khác sẽ cần được cập nhật và các phần tử HTML sẽ được hiển thị lại theo các quy tắc mới.

Tương tự như vậy, khi bố cục của trang web nói chung bị ảnh hưởng, một phần hoặc toàn bộ trang web có thể được hiển thị lại. Đây là quá trình được gọi là **reflow**. Để tránh quá nhiều **reflow**, hãy đảm bảo rằng bạn không thay đổi **DOM** quá nhiều. 

Các thay đổi đối với **DOM** không phải là thứ duy nhất có thể làm cho **reflow** trên trang web. Tùy thuộc vào trình duyệt, các yếu tố khác cũng có thể đóng góp cho nó.

#### Kết

Kết lại, **DOM** được hiển thị như một cây được tạo thành từ tất cả các phần tử được tìm thấy trong một tài liệu HTML. Về mặt vật lý, nó là một tập hợp các đối tượng JavaScript lồng nhau trong đó các thuộc tính và phương thức chứa thông tin mà có thể sắp xếp chúng thành một cây hợp lý.

Hi vọng bài viết này sẽ hữu ích với bạn
***

#### Tham khảo

- https://www.hongkiat.com/blog/understanding-document-object-model/