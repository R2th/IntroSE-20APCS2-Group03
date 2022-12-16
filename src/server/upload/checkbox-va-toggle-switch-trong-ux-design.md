![](https://images.viblo.asia/5f396fce-52ca-44a1-a20f-306cf43cf0f0.png)
Forms thường cung cấp một số trình điều khiển (control) giúp thu thập dữ liệu đầu vào từ user dễ dàng hơn. Sử dụng control đúng cách luôn là một thử thách trong thiết kế forms.
Checkbox control có ba trạng thái: unselected, selected và indeterminate (default - không xác định). Trạng thái cuối cùng biểu thị một tình huống mà trong đó trong một parent option có các sub options tồn tại cả hai trạng thái là selected và unselected.

Công tắc bật tắt đại diện cho một công tắc vật lý cho phép người dùng bật hoặc tắt mọi thứ, như công tắc đèn.
Khi click vào toggle switch là một action gồm hai bước: selection (lựa chọn) và excution (thực thi), trong khi checkbox chỉ bao gồm action selection (lựa chọn) một option, còn việc excution (thực thi) của checkbox thì sẽ cần một trình control khác.

Khi quyết định sử dụng checkbox hay toggle switch, tốt hơn hết nên tập trung vào bối cảnh sử dụng thay vì tập trung vào chức năng của chúng. Dưới đây là một số trường hợp sử dụng đi kèm với hướng dẫn để giúp người làm có cái nhìn đúng đắn hơn khi sử dụng hai trình control này trong các bản design form.

### Trường hợp 1: Phản hồi tức thì (Instant response)

 Sử dụng Toggle switch khi,
- Cần một phản hồi tức thì mà không có hành động rõ ràng gì hết.
- Setting yêu cầu các chức năng on/off và show/hide để hiển thị kết quả.
- User cần thực hiện các hành động tức thì mà không cần xem xét lại hay đợi xác nhận.

![](https://images.viblo.asia/4c77cd6e-2fab-429e-9c99-9ea4c3a18334.png)

Với trường hợp cần một phản hồi tức thì như này thì tốt hơn hết là sử dụng toggle switch

### Trường hợp 2: Settings confirmation (Xác nhận cài đặt)

Sử dụng Checkbox khi,
- Cài đặt được áp dụng khi cần được xác nhận hoặc xem xét bởi người dùng trước khi gửi đi (submitted).
- Cần thông qua các hành động như Gửi (Submit), Ok, Next, Apply trước khi hiển thị kết quả.
- User phải thực hiện các bước bổ sung để thay đổi trước khi có hiệu lực.

![](https://images.viblo.asia/796fcde6-5e49-4e68-abdb-de80ae6cd54a.png)
Ưu tiên sử dụng checkbox khi có các action rõ ràng được yêu cầu khi xác nhận cài đặt.

### Trường hợp 3: Nhiều tuỳ chọn (Multiple choices)

Sử dụng Checkbox khi,
- Có nhiều tuỳ chọn và user phải lựa chọn một hoặc nhiều option.
- Nếu click nhiều vào từng cái toggle switch và đợi kết quả sau mỗi lần click thì sẽ khá tốn thời gian.

![](https://images.viblo.asia/50a57ded-c40c-47ba-a117-f4a3d3501ce2.png)
Khi cần lựa chọn nhiều option trong một list danh sách thì trải nghiệm tốt nhất là sử dụng checkbox

### Trường hợp 4: Trạng thái không xác định (Indeterminate state)

Sử dụng Checkbox khi,
Tồn trại một trạng thái lựa chọn không xác định khi có quá nhiều tuỳ chọn trong cùng một nhóm thuộc một tuỳ chọn cha. Trạng thái không xác định này sẽ biểu hiện rằng có nhiều tuỳ chọn (nhưng không phải tất cả) sẽ được lựa chọn trong một list danh sách.
![](https://images.viblo.asia/20f184c4-8c6d-4cd1-ac7d-e4680b873def.png)
Ở trường hợp này thì lựa chọn tốt nhất là sử dụng checkbox

### Trường hợp 5: Trạng thái hình ảnh rõ ràng (Clear visual state)
Sử dụng Checkbox khi,
- Có khả năng bị nhầm lẫn với trạng thái on/off của toggle switch. Đôi khi gây khó hiểu không biết rằng switch đang show một trạng thái hay một hành động.
- Khi cần phải cung cấp rõ ràng trạng thái được lựa chọn hay không được lựa chọn.

![](https://images.viblo.asia/643b019f-4e71-4d9f-b6a1-7bd777104df2.png)
Đôi khi toggle switch không cho biết rõ đó là trạng thái hay hành động.

### Trường hợp 6: Các chỉ mục liên quan (Related items)

Sử dụng Checkbox khi,
- Người dùng phải lựa chọn các option trong list danh sách các đầu mục liên quan.

![](https://images.viblo.asia/32da94e2-d493-4135-86d6-157cab1ab662.png)
Để chọn các item liên quan trong một danh sách, nên dùng checkbox

Sử dụng Toggle switch khi,
- Người dùng cần thay đổi các tính năng độc lập hoặc một hành vi độc lập.

![](https://images.viblo.asia/ee22b4c7-e063-4a80-9fad-74c29a0554fb.png)
Với các item độc lập nên sử dụng toggle switch để lựa chọn

### Trường hợp 7: Lựa chọn đơn (Single option)

Sử dụng Checkbox khi,
- Cung cấp một kiểu lựa chọn yes or no.
- Chỉ có một lựa chọn là chọn hay bỏ chọn, mang ý nghĩa rõ ràng nhất quán.

![](https://images.viblo.asia/e51f0c49-042b-4da4-916c-c99344fc83b7.png)
Với kiểu yes or no option thì nên sử dụng checkbox

Sử dụng Toggle switch khi,
- Việc lựa chọn cho lựa chọn đơn này là bắt buộc và bạn chỉ có hai option là on/off để quyết định.

![](https://images.viblo.asia/f8146b95-950f-4346-96f0-270f7f7c05e0.png)
Trong trường hợp quyết định on/off này thì tốt hơn hết là sử dụng toggle switch

### Kết luận
Điều quan trọng là cần cung cấp một trình điều khiển đúng nơi đúng cách để khiến form trở nên thân thiện với người dùng hơn. Vì các forms thường khá dài và có nhiều option, nên sẽ gây chán đời cho người dùng nếu họ phải thực hiện quá nhiều lần click để điền thông tin của mình. Các trường hợp trên sẽ giúp người làm có những quyết định đúng đắn và hợp lý trong việc sử dụng checkbox hay toggle switch trong form của mình.

Link tham khảo [tại đây](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)