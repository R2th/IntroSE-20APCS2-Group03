**UITransform Component Reference**

UITransform component xác định thông tin hình chữ nhật trên giao diện người dùng, bao gồm content size và vị trí neo của hình chữ nhật. Thành phần này cho phép các dev sửa đổi kích thước và vị trí của hình chữ nhật một cách tự do, nói chung là để rendering, tính toán các sự kiện nhấp chuột, bố cục giao diện người dùng, điều chỉnh màn hình, v.v.

**UITransform Properties**

*ContentSize* : Kích thước nội dung của hình chữ nhật giao diện người dùng. AnchorPoint
*AnchorPoint*: Vị trí neo của hình chữ nhật giao diện người dùng. 

```
import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Example')
export class Example extends Component {
    start () {
        const uiTransform = this.getComponent(UITransform);
        // method one
        uiTransform.setContentSize(200, 120);
        uiTransform.setAnchorPoint(0, 0.5);
        // method two
        uiTransform.width = 200;
        uiTransform.height = 120;
        uiTransform.anchorX = 0;
        uiTransform.anchorY = 0.5;
    }
}
```

**Deprecation of the priority property**

Thuộc tính  priority của UITransform component không được chấp nhận trong v3.1 và người dùng có thể điều chỉnh thứ tự hiển thị bằng cách sử dụng thứ tự của cây nút` setSiblingIndex()`.

**Mô tả về thuộc tính không dùng nữa priority và setSiblingIndex() phương pháp được đề xuất :**

Thuộc tính priority trên UITransform component  không được chấp nhận trong v3.1 do không rõ ràng và xung đột đặt tên với các thuộc tính khác trong công cụ. 
Thuộc tính priority ban đầu được thiết kế để cung cấp lối tắt cho người dùng để sắp xếp cây nút, nhưng không có mục đích sử dụng nào khác và không liên quan đến ý nghĩa của "ưu tiên" và thực tế vẫn điều chỉnh thứ tự hiển thị bằng cách thay đổi thứ tự của cây nút.
Sau khi không dùng thuộc tính priority, người dùng có thể thay thế nó bằng `setSiblingIndex()` method, method này điều chỉnh thứ tự của cây nút bằng cách ảnh hưởng đến thuộc tính `siblingIndex` của nút. Sự khác biệt là thuộc tính priority có giá trị mặc định và thuộc tính siblingIndex của một nút thực sự là vị trí của nút trong nút cha của nó, vì vậy giá trị của thuộc tính của nút siblingIndex sẽ thay đổi khi cây nút thay đổi. Điều này yêu cầu rằng khi sử dụng `setSiblingIndex()` phương pháp, vị trí tương đối của nút trong nút cha phải được biết và kiểm soát để thu được kết quả mong muốn.

Lưu ý : siblingIndex không nên sử dụng thuộc tính giống như thuộc tính priority (không được dùng nữa) vì chúng có ý nghĩa khác nhau. Để thay đổi thuộc tính siblingIndex, cần hiểu và biết rằng nó đại diện cho vị trí bên dưới nút cha và sẽ thay đổi khi cây nút thay đổi, và chỉ có thể được sửa đổi bằng `setSiblingIndex()` method.

Xem xét nhu cầu phân loại nhanh các nút, một giao diện thuận tiện và nhanh chóng hơn cho người dùng để sắp xếp các nút sẽ được cung cấp trong các phiên bản trong tương lai.