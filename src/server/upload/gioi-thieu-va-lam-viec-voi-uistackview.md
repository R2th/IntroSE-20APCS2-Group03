Chắc hẳn các bạn đều đã gặp phải bài toán xử lí dãn cách đều một số lượng view trên màn hình theo chiều dọc hoặc chiều ngang. Cách thủ công là chúng ta có thể kéo thả constraint từ view này sang view khác để cố định chúng trên màn hình. Tuy nhiên phương pháp này tốn kha khá thời gian, effort và sự kiên nhân của bạn. Trong khi đó iOS đã cung cấp cho chúng ta một côn cụ mạnh mẽ để quản lí việc hiện của các tập hợp View trên màn hình chỉ với vài thao tác đơn giản, đó chính là UIStackView. 

![](https://images.viblo.asia/1fd0e90b-dad9-4d92-8f32-b4739c31d974.jpg)

Trong ngôn ngữ khoa học máy tính, Stack có thể hiểu là một kiểu dữ liệu abtract đóng vai trò là tập hợp của một hoặc nhiều phần tử. Khái niệm này cũng co thể áp dụng với StackView, Stack View tập hợp các View con theo chiều ngang hoặc đứng, bản thân Stack View liền một khối và có thể tự có contraint của riêng mình. Syntax để sử dụng StackView rất đơn giản, bạn có thể tương tác với nó trên Storybroad mà không phải code một dòng nào.

![](https://images.viblo.asia/1fb8442d-3041-40fd-8412-b96a88d0641f.png)

Ta sẽ bắt đầu làm việc với 3 view bất kì, ở đây mình sử dụng một label dài, một UIImageView và một label ngắn.

![](https://images.viblo.asia/c757e8a0-b4b6-48e4-b38f-2695ff287490.png)

Outline của màn hình chủa có gì ngoài 3 View nói trên.
Bắt đầu với việc chọn tất cả các view. Có ba cách để làm việc này: bạn có thể kéo thả qua cả 3 view hoặc dùng command-click vào từng view một hoặc bạn cũng có thể tương tác với chúng trên outline phía bên tay trái. Bạn hay nhìn vào thanh công cụ ngay bên trên khu vực log và chọn nút hình vuông cùng mũi tên như hình minh hoạ bên dưới:

![](https://images.viblo.asia/8085d767-ae7a-41de-a44e-5fa4f06e0bf0.png)

Khi click vào bạn sẽ thấy các option cho phép embed các view bạn đã chọn vào một số thành phần khác như view, scroll view thậm chí là navigationController. Ở đây ta sẽ chọn Stack view.

![](https://images.viblo.asia/d363b6a3-da0a-40b5-8897-2a720c814f2e.png)

Và các view ta chọn đã nằm gọn trong Stack view. Đồng thời nếu các view này có constraint với bất kìa view nào trước đó đều sẽ bị clear hết constraint.

![](https://images.viblo.asia/d593c05e-929a-4699-b9e3-1a356e2996fd.png)

Trên outline cũng đã suất hiện Stack view với 3 elements là 3 view của chúng ta.
Bởi vì các view con đã mất hết constraint, sau khi embed, chúng ta phải set constraint cho stack view để cố định nó trên màn hình. Bạn cũng có thể kiêm tra lại constraint bằng Size inspector trong attribute của mỗi view. Trong một số trường hợp, các element có thể tràn ra lấp đầy stack view làm cho bạn khó có thể tương tác với nó để set up constraint, ta có hai cách để xử lí vấn đề này: đơn giản nhất là bạn có thể select nó trên outline, một cách khác là bạn dùng tổ hợp phím Shift-Right-click:

![](https://images.viblo.asia/b12ca2e3-e02d-4444-b671-102d6474ca8b.png)

Một cửa sổ sẽ hiện ra cho phép bạn chọn bất kì view nào trong tập hợp này. 
Để quản lí về hiển thị của Stack view ngoài axis (horizontal hoặc vertical) ra còn có Alignment và Distribution. 

![](https://images.viblo.asia/93813fbf-4562-48e2-abef-ad59274bbccc.png)

Alignment quản lí vị trí đặt của element trên stack view (căn trên, dưới, trái, phải, giữa và lấp đầy), trong khi đó Distribution quản lí cách element phân chia các khoảng trong stack view (cách đều, cách theo spacing cho trước, cách theo tỉ lệ).

![](https://images.viblo.asia/6792b4ec-59e7-4adb-8c64-0760ffec77de.png)

![](https://images.viblo.asia/41dc22e3-dbee-4be4-b37a-204ce208e605.png)

Chúng ta có thể dễ dàng embed các view vào một stack view rồi thê còn việc unembed thì sao? Việc này đơn giản y như cách stack view xuất hiện. Ta chọn stack view, click vào button embed ở góc phải chọn unembed, và sau đó các view con sẽ quay trở lại trạng thái ban đầu nhưng không còn constraint. 

![](https://images.viblo.asia/477741d4-bf88-4628-926a-0adfb847bc44.png)

Ngoài ra chúng ta cũng có thể tạo ra stack chứa các stack khác, mỗi element của stack có thể là các view riêng biệt về kiểu.

![](https://images.viblo.asia/bf61ec24-08bb-40b9-ad52-b19f963114b8.png)

Như bạn có thể thấy stack view kiểu horizontal đã được embed vào một stack view khác kiểu vertical.
Ngoài ra Stack view cũng có thể kết hợp hoàn hảo với Scroll view. Sau đây là các bước để để thử embed stack view kiểu vertical vào scroll view cùng kiểu:
*     B1: Chuẩn bị một màn hình trống.
*     B2: Thêm vào một scroll view, add contraint cho nó trùng với superview
*     B3: Thêm Stack view vào scroll view, bạn có thể để ý trên outline để keep track việc này, add contraint cho nó trùng với superview
*     B4: Thêm một phần tử vào Stack view, có thể là label hoặc view hoặc image, set width của phần tử này bằng với width của Scroll view.
*     B5: Tạo ra thêm một số phiên bản của phần tử và đổi màu cho vui mắt.
*     B6: Chạy thử.
    
![](https://images.viblo.asia/cf9aa51e-1e6e-4f61-8520-725708224618.png)

Stack view là một công cụ khá hữu dụng để quản lí một tập hợp các view, nó có thể giúp chúng ta thao tác nhanh và tiện lợi hơn so với thao tác truyền thống đồng thời cũng dễ sửa đổi hơn. 
Cảm ơn các bạn đã theo dõi!

Refference:

https://developer.apple.com/documentation/uikit/uistackview
https://www.raywenderlich.com/508-uistackview-tutorial-introducing-stack-views
https://medium.com/inloopx/uistackview-lessons-learned-e5841205f650
https://medium.com/the-traveled-ios-developers-guide/uistackview-a-field-guide-c1b64f098f6d