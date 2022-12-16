Bạn đã từng cảm thấy nản khi CSS quá rối rắm và khó hình dung? Bạn đã quen dần với việc copy paste và bỏ cuộc với việc tìm hiểu tại sao đoạn CSS này lại hoạt động? Vậy thì bài viết này hi vọng sẽ đem đến cho bạn một cái nhìn mới, trực quan và đầy thú vị giúp bạn nắm chắc một vài thuộc tính quan trọng  thường sử dụng trong CSS.
## Position
`position` là thuộc tính dùng để xác định vị trí của phần tử trong một container cha, mà cách nó hoạt động lại bị phụ thuộc vào thuộc tính của container đó.

Có 5 loại giá trị cho `position`, đó là: `static` (mặc định), `relative`, `absolute`, `fixed` và `sticky`.
### static & relative
Mặc định giá trị của thuộc tính `position` sẽ là `static`, có nghĩa là các phần tử xuất hiện theo thứ tự mà chúng được định nghĩa trong HTML document.

Các phần tử static này không chịu ảnh hưởng bởi các thuộc tính `top`, `left`, `right` và `bottom` dù cho chúng có được set giá trị gì đi nữa.

Để minh họa cho sự khác biệt, ta sẽ style cho các phần tử `<div>` một cái `border: 1px solid gray`, để sẽ dễ dàng quan sát kích thước của chúng trên trình duyệt hơn.

Bây giờ áp dụng `position: static` và `position: relative` lên mấy phần tử `<div>` này xem sao:

![](https://images.viblo.asia/45540000-2b0b-4b2f-9a4d-d990be016304.PNG)

Về cơ bản, các phần tử static và relative đều giống nhau, ngoại trừ việc phần tử relative có thể sử dụng `top`, `left`, `right`, `bottom` để xác định khoảng cách tương đối so với vị trí gốc của nó.

Chúng ta có thể sử dụng relative position khi muốn căn khoảng cách của text. Dẫu vậy, sử dụng thuộc tính `margin` và `padding` sẽ hợp lý hơn mà vẫn đạt được hiệu ứng tương tự. Bạn sẽ sớm thấy rằng sử dụng position relative là không đủ để sắp xếp các phần tử block giống như các hình ảnh, chỉ định ở một nơi cụ thể trên diện tích của phần tử cha. Do đó, `position: relative;` không nên được sử dụng trong các trường hợp cần phải đặt vị trí một cách chính xác bên trong một container cha. Thay vào đó người ta sẽ sử dụng `position: absolute;`.

### absolute & ﬁxed
![](https://images.viblo.asia/68d38b46-9415-43aa-a66c-ce414bd2a52e.PNG)

`absolute` được sử dụng trong trường hợp căn vị trí chính xác của phần tử theo từng pixel trong một container cha. Các phần tử với `fixed` cũng gần như y hệt khi dùng `absolute`, chỉ có điều nó sẽ cố định trên màn hình khi bạn cuộn trang.

Phía trên là ví dụ về việc các phần tử absolute và fixed sẽ collapse phần tử cha của nó nếu như không chỉ định kích thước của phần tử cha đó (phần tử cha chính là cái vạch đen kia kìa). Điều này có vẻ là một chi tiết không đáng chú ý, tuy nhiên bạn có thể sẽ thường xuyên gặp phải bây giờ hoặc sau này trong quá trình design layout, đặc biệt là khi chuyển các phần tử từ kiểu position relative sang absolute.

![](https://images.viblo.asia/81972d5c-dddc-487b-b371-2e551e75f479.PNG)

Bên trái là phần tử có `position: absolute` với một container cha không có kích thước. Còn bên phải tương tự với phần tử cha được chỉ định rõ kích thước. Dù sao thì về mặt tech, cả hai phần tử absolute đều có trục cố định ở vị trí 0 x 0.

![](https://images.viblo.asia/e6c2220d-582c-4067-bc3a-73d4ed6d410d.PNG)

Để sử dụng `position: absolute` cho các phần tử nhằm căn vị trí tương đối của nó so với cha thì phần tử cha cần phải có thuộc tính `position` khác `static` (mặc định). Quan sát ví dụ dưới đây để hiểu rõ hơn:

![](https://images.viblo.asia/5ad02030-1e5b-4a42-abe5-e7d9ba1728f1.PNG)

Hình bên trái cho thấy phần tử absolute bên trong một static container được xác định tương đối so với phần tử Document (Document ở đây đại diện cho một phần tử cha độc lập nằm ở cấp cao hơn). Hình bên phải cho thấy phần tử absolute bên trong một non-static container (`relative`, `absolute`, `fixed`, `sticky`) được xác định tương đối so với chính container đó.

![](https://images.viblo.asia/afadf84e-b343-4c39-a6a1-7017d225aca7.PNG)

Hình trên minh họa cách sử dụng `position: absolute` để căn các phần tử vào các góc của container.

Lưu ý: Bạn có thể sử dụng kết hợp `top`, `left`, `bottom` và `right` để thay đổi vị trí tương đối của phần tử so với vị trí gốc. Tuy nhiên bạn cũng đoán được rằng không thể sử dụng `left` và `right` cùng một lúc, cũng như `top` và `bottom`.

![](https://images.viblo.asia/28fc16e3-ce78-4cd3-942e-325e76fe1c12.PNG)

Hình ảnh minh họa ví dụ về cách sử dụng `position: absolute` với các giá trị offset là âm.
###  fixed
Như đã nói ở phần trước, `fixed` hoạt động giống như `absolute`, chỉ có điều phần tử fixed sẽ giữ nguyên vị trí trên màn hình (tương đối so với document) khi cuộn trang.

![](https://images.viblo.asia/9e80c676-8e49-4766-99cb-2847b5384d44.PNG)

![](https://images.viblo.asia/5a7d4d0b-77a7-4a26-9a4c-1375f77a1f2e.PNG)
### sticky
`sticky` là giá trị của thuộc tính `position` được thêm vào gần nhất của CSS. Trước đây người ta sẽ phải viết một đoạn code JavaScript hoặc media query để đạt được hiệu ứng này.

![](https://images.viblo.asia/ab36d597-d577-44c8-bfba-ab4d1784f282.PNG)

Người ta thường sử dụng sticky để tạo các floating navigation bar, tức là các thanh điều hướng có thể nổi ở trên màn hình như vầy.

![](https://images.viblo.asia/d9fc625b-e28c-4354-ae45-2e59781b2311.PNG)

Lưu ý rằng `-webkit-sticky` được thêm vào đây để có thể tương thích với các  webkit-based browsers (chẳng hạn như Chrome).
## Display
Đây là thuộc tính CSS được sử dụng để cho phép xác định cách hiển thị của các phần tử trên màn hình. 

Thuộc tính `display` có một vài giá trị quen thuộc như `inline`, `block`, `inline-block`.

![](https://images.viblo.asia/52d318c9-b797-45ed-ad44-c272abafb8f6.PNG)

Hình trên minh họa cho `display: inline`. Đây là giá trị mặc định sử dụng cho thẻ `<span>`, `<b>`, `<i>` và một số tags HTML khác được tạo ra để xử lý việc hiển thị text bên trong một container cha với width không được chỉ định.

Có thể thấy rằng các element được đặt ngay bên phải giới hạn độ rộng của phần tử trước đó, đây là một lựa chọn khá tự nhiên trong hiển thị văn bản.

Lưu ý: Một phần tử inline đủ dài sẽ tự động nhảy xuống dòng tiếp theo.

![](https://images.viblo.asia/28502436-8aea-40d3-8c89-1fc3e73986b6.PNG)

`display: block` - trái ngược với các phần tử inline - sẽ tự động chiếm không gian của toàn bộ dòng, bất kể width hay nội dung của nó là gì. Các thẻ `<div>` là một phần tử block theo mặc định.

![](https://images.viblo.asia/3508de9d-c823-460f-a1cb-820ed08c234d.PNG)

Trường hợp `display: block` với một phần tử được chỉ định width cho ta thấy sự khác nhau giữa width của container và width của nội dung phần tử đó.

![](https://images.viblo.asia/97047bcd-cd3f-4b26-98f0-73ec41852085.PNG)

`display: inline-block` kết hợp hành vi của inline và blocking để cho phép tùy chỉnh kích thước của các phần tử inline.

![](https://images.viblo.asia/a29a097f-b871-4cde-945b-2d2cefeae82d.PNG)

Đây là hình minh họa centered text (`text-align: center`) bên trong hai phần tử blocking với width bằng 50% container. Lưu ý rằng vì toàn bộ row đã bị blocking nên diện tích của phần content sẽ bằng 50% của cả dòng. Như vậy một phần tử block không hề được định nghĩa bởi nội dung bên trong của nó.

![](https://images.viblo.asia/b98361b1-9d42-4ecd-b090-673e810282d2.PNG)

Hai phần tử block với width xác định, khoảng 50%, cùng với `text-align: center` có thể sẽ được hiển thị giống như các phần tử inline bằng cách đặt thuộc tính `float`. Tuy nhiên, không như các phần tử inline, một phần tử block không bao giờ kéo xuống dòng tiếp theo.

![](https://images.viblo.asia/69202321-ec2a-4fb8-a56a-6e52508c1b29.PNG)

Lưu ý: Các phần tử inline luôn luôn bị giới hạn width với phần content của nó, bởi vậy text ở bên trong chúng không thể nào căn giữa được.

## Element Visibility
Thuộc tính `visibility` cho phép ta tùy chỉnh về khả năng nhìn thấy được của phần tử. Ta có thể giấu phần tử mà không xóa bỏ hoàn toàn ảnh hưởng về vị trí của nó trên giao diện, giống như là nó vẫn ở đó nhưng vô hình vậy.

![](https://images.viblo.asia/601b48d8-c7f5-49b1-825c-3caccfe1893d.PNG)

Hình trên minh họa hiệu ứng xảy ra khi thay đổi `visibility` của b sang `hidden`. Giá trị mặc định của nó là `visible` (giống như `unset`, `auto` hay `none`).

![](https://images.viblo.asia/535fe1d5-2f4c-4bfb-9966-4de2efbf4278.PNG)

Chúng ta cũng có thể set thuộc tính `display` giá trị `none`, lúc này thì phần tử sẽ hiển thị như là nó không hề có ở đó.
## Floating Elements
![](https://images.viblo.asia/2f6b839d-bcfd-4ecf-978c-090bac7786c6.PNG)

Các phần tử block với thuộc tính `float` có thể hiển thị ở trên cùng một dòng, miễn là tổng width của chúng nhỏ hơn width của phần tử cha.

![](https://images.viblo.asia/0159869b-41d4-4d72-9ca8-6bca1430efe5.PNG)

Nếu tổng width của hai phần tử floating lớn hơn width của phần tử cha, một trong số chúng sẽ bị blocked bởi cái kia và do đó nhảy xuống dòng tiếp theo.

![](https://images.viblo.asia/329e0d0f-cf4d-42dd-9b26-4e314c8723e4.PNG)

Bạn có thể dùng `clear: both` để xóa float và bắt đầu một dòng float mới.

## Tham khảo
[CSS Visual Dictionary](https://amzn.to/2Fyvg79) là một cuốn sách khá hay giúp bạn nâng cao trình độ CSS một cách hiệu quả. Cuốn sách sẽ đem đến cho bạn những kiến thức từ cơ bản đến nâng cao cùng các hình ảnh ví dụ trực quan, thú vị về các trường hợp sử dụng thông dụng của từng thuộc tính trong CSS. Hãy tìm và đọc nó để không bỏ lỡ những điều hay ho nha!