# Tìm hiểu về ref và out trong C#
![](https://images.viblo.asia/c0074075-e1a0-4429-84c5-f06b1a3ca997.jpeg)

Trong ngôn ngữ lập trình C#, khi để truyền tham chiếu ta có 2 sự lựa chọn là 2 từ khóa ref và out, hôm nay mình sẽ chia sẻ hiểu biết của mình về sự khác nhau của 2 từ khóa này trong C#.
Để tìm hiểu về 2 từ khóa này trước tiên ta cần biết về 1 số định nghĩa:

- **Biến tham chiếu** là 1 biến mà vùng nhớ của biến đó chỉ chứa địa chỉ của đối tượng dữ liệu và lưu trong bộ nhớ Stack. Đối tượng dữ liệu thực sữ được lưu trữ trong bộ nhớ heap. [Chi tiết về bộ nhớ heap và stack](http://net-informations.com/faq/net/stack-heap.htm).
- **Truyền tham chiếu** thực chất là truyền địa chỉ ô nhớ của 1 đối tượng dữ liệu cụ thể và gán vào 1 biến nào đó, khi giá trị thực sự của đối tượng thay đổi thì các biến tham chiếu lưu cùng địa chỉ ô nhớ của đối tượng này sẽ bị thay đổi giá trị theo.
- Một số kiểu dữ liệu thuộc kiểu tham chiếu: object, dynamic, string và tất cả các kiểu dữ liệu do người dùng định nghĩa.

## Bài toán
Mình có 1 chương trình như này
![](https://images.viblo.asia/a7da94d2-9bf1-4aa7-830b-b31323483db1.PNG)

Mình muốn sau khi chạy hàm Increase thì thằng biến outSideVar của mình phải là 21 nhưng đời không như mơ và chúng ta cũng đều hiểu kết quả sẽ là 20 :)
![](https://images.viblo.asia/c6957c4c-7e56-4c39-a138-ded4e234c248.PNG)

Vấn đề ở đây là khi bước vào function Increase thì giá trị outSideVar truyền vào được lưu trong 1 biến inSideVar và nó chỉ có tác dụng khi đang thực thi hàm Increase, khi hàm Increase kết thúc thì giá trị này cũng không còn tồn tại. 

Để giải quyết điều này ta có thể sử dụng 1 trong 2 cách là ref và out.
## Truyền tham chiếu sử dụng ref
![](https://images.viblo.asia/ce14721e-c219-4b60-9cf9-6135e4355785.PNG)

![](https://images.viblo.asia/5023224d-f375-4c18-9e4d-ea0dff379005.PNG)

- Khi sử dụng từ khóa ref này sẽ phải được khai báo trước tên tham số truyền vào khi sử dụng hàm và trước kiểu dữ liệu khi khai báo hàm.
- Tác dụng của ref là sẽ truyền tham chiếu tham số truyền vào (outSideVar) khi sử dụng hàm (Increase) cho biết cục bộ trong hàm (inSideVar). Nên khi kết thúc hàm, giá trị của outSideVar cũng thay đổi theo. 
- Truyền tham số với từ khóa ref thì kiểu dữ liệu không được là hằng số và phải được khởi tạo giá trị trước khi truyền vào (Nếu không có giá trị làm sao truyền tham chiếu cho ông bên trong được :laughing:).

## Truyền tham chiếu sử dụng out
![](https://images.viblo.asia/e154dfbe-ef10-49e1-bdbc-313f16d15bbd.PNG)

![](https://images.viblo.asia/91306886-b45a-4624-b905-ef9818726466.PNG)

- Khi sử dụng từ khóa out này sẽ phải được khai báo trước tên tham số truyền vào khi sử dụng hàm và trước kiểu dữ liệu khi khai báo hàm.
- Tác dụng của từ khóa out là sẽ truyền tham chiếu của biến cục bộ trong hàm (inSideVar) cho tham số truyền vào (outSideVar). Vậy nên khi kết thúc hàm, giá trị của outSideVar sẽ bi thay đổi theo. Ngược lại với ref phải không nào :grinning:
- Truyền tham số với từ khóa out thì kiểu dữ liệu không cần thiết phải khởi tạo giá trị trước khi truyền vào.
- Khi khai báo hàm, phải khởi tạo giá trị tham số truyền vào trong phần khai báo. (Nếu không có giá trị thì làm sao truyền tham chiếu cho ông bên ngoài được :laughing:)

## Tổng kết
Trên đây là những nhận xét của mình về 2 truyền tham chiếu với 2 từ khóa ref và out trong C#, rất mong sự góp ý của các bạn để mình hoàn thiện hơn trong các bài viết tiếp theo <3