Chỉ có một Module trong ứng dụng android là rất phổ biến và nhiều dự án đã được cấu trúc theo cách này. Có thể do Android studio tạo 1 module bới vì nó là mặc định (app module).

Ngược lại chúng ta có thể cấu trúc app của chúng ta để sử dụng nhiều modules để làm việc cùng nhau. Khi chúng ta thêm thư viện vào build.gradle, cũng như chúng ta đang sử dụng module của người khác vào code của chúng ta. Chúng ta có thể làm tương tự cho code của chúng ta như thế

**Vậy lợi ích phát triển của việc sử dụng nhiều  modular là gì ?**

* Bảo trì project dễ dàng hơn

Khi chúng ta thêm nhiều code hơn vào project . Project sẽ trở lên phức tạp hơn dẫn để hệ quả việc bảo trì project sẽ khó khăn hơn. Thêm chức năng mới yêu cầu nhiều thời gian hơn, năng lượng .... 
Vì thế khi sử dụng nhiều module chúng ta sẽ chia nhỏ ra dể quản lý hơn , thay vì một cục lớn giờ chúng ta đã chia ra thành nhiều cục nhỏ để quản lý hơn.

* Modules có thể được tái sử dụng

Nếu bạn có nhiều hơn 1 project sẽ có nhiều code được lặp đi lặp lại nhiều lần bằng cách sử dụng nhiều module bạn có thể viết chỉ một lần và xài đc nhiều lần nữa. 



* Code tốt hơn và API tốt hơn

Làm việc với nhiều module buộc bạn phải suy nghĩ nhiều hơn về code và mối quan hệ giữa những phần dẫn đến việc viết code tốt hơn vì mỗi phần đảm nhiệm một chức năng của nó.



* Bạn có thể tận dụng source của cộng đồng


Bạn không muốn chia sẽ toàn bộ dự án của mình lên mạng . Nhưng bạn có thể share một phần của dự án chung như 1 phần cắt ảnh, .... Bằng cách này bạn có thể  thấy được lợi ích của open sourcing mà không sợ bị lộ source hay ý tưởng của mình. 



**Thêm module vào trong Project của chúng ta** 

Chúng ta chỉ cần thêm theo hướng dẫn như sau : `File -> New -> New Module`

![](https://images.viblo.asia/0d97df80-a658-40c2-94b0-e2d0ceba11b6.png)

Cách này  thì tất cả modules cùng nằm trong một  project và thường thì chúng có thể sử dụng xen kẽ nhau. ưu điểm của phương pháp này là rất dễ  điều chỉnh modules và xem kết quả trả về nhanh. Tuy nhiên lý do chính  mà chúng tôi muốn  module hóa là để có  một project nhỏ  dễ quản lý hơn và dễ duy trì hơn. Nhưng chúng ta không thể sử dụng các module này trong một dự án khác. Vì thế tùy từng trường hợp bạn sử dụng

**Phát triển modules như là một thư viện riêng biệt**

![](https://images.viblo.asia/40efbaff-80cc-4d19-982b-af58da718d09.jpeg)

Chúng ta có thể  tạo modules của chúng ta một cách riêng biệt trong project của chúng ta, upload chúng lên server và sau đó sử dụng chúng như là thư viện bằng cách thêm dependency tới build.gradle .  Có nhiều dịch vụ online để thư viện của bạn public hoặc là private.  Theo mình biết là Bintray.com . Bạn cũng có thể là chủ của server của bạn nếu bạn muốn  :)

Tôi thì thích cách tiếp cận như thế vì dự án được chia thành nhiều mảng nhỏ hơn dễ quản lý hơn . chúng tôi có thể phát triển một module  một lần và sử dụng được nhiều lần . Do đó sẽ giảm được lượng thời gian phát triển


**Chúng ta có nên lúc nào cũng sử dụng nhiều module thể không ?**

Modular development yêu cầu thêm một ít việc, đặc biệt là lúc mới bắt đầu dự án.Vì thế nếu project của bạn đơn giản hoặc là không muốn chia sẽ code giữ các project  bạn có thể làm trên một module đơn lẻ
Tuy nhiên, Tôi tin tưởng rằng nhiều project rất có ích trong việc sử dụng nhiều module 

Kết thúc bài của mình rồi. Cám ơn các bạn đã đọc ,Bạn có thể comment  nếu có thiếu xót gì 
:heart_eyes::heart_eyes::heart_eyes:

Tài liệu tham khảo:

https://proandroiddev.com/modular-way-of-building-android-apps-500ac816825