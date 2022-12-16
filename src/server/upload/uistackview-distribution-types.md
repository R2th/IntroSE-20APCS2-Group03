UIStackView là một view rất hữu ích, bạn có thể dễ dàng bố trí một list các view trong StackView theo chiều dọc hoặc chiều ngang. Bằng việc thay đổi các thuộc tính như **alignment**, **distribution** và **spacing**, các view chứa bên trong StackView sẽ tự động adjust space tương ứng. Bài viết này mình sẽ giải thích về thuộc tính **distribution**. 

Thuộc tính distribution để chỉ định các subview được layout như thế nào trong stack. Bạn có thể tìm chỗ setting ở Interface Builder như sau (hoặc setting trong code):

![](https://images.viblo.asia/725b1f2d-ec93-477f-854c-1944047a80f3.png)

## Fill

Đây là type distribution mặc định khi bạn tạo một UIStackView mới. Trong ví dụ, mình có 2 UIStackView, dùng subview là các UITextField bên trong horizontal UIStackView. 1 subview có CHP (Content Hugging Priority) thấp hơn sẽ tự fill rộng ra bằng với khoảng trống còn thừa của các subview còn lại.

Mình set CHP thấp hơn như sau:
![](https://images.viblo.asia/5a160cc8-047e-412b-ac29-85a6e1984283.png)

Kết quả:
![](https://images.viblo.asia/463cd987-ae9d-4613-a500-93dfbd77e26c.png)

Nếu tất cả các subview có cùng CHP thì XCode sẽ complain rằng layout là ambiguous:
![](https://images.viblo.asia/8af85fbe-f321-429f-ad09-601d275cbde3.png)

## Fill Equally

Với Fill equally, các subview trong UIStackView được giãn ra có kích thước bằng nhau, CHP không còn quan trọng vì mỗi subview có kích thước như nhau:
Ví dụ:
![](https://images.viblo.asia/4e192b95-b919-435d-8b7d-b6c7ed0b6c3f.png)

## Fill Proportionally

Đây là kiểu khá thú vị. Sẽ khó nhận thấy hiệu ứng nếu không thử các IPhone kích thước khác nhau và các hướng khác nhau. Fill Proportionally đảm bảo các subview sẽ được giãn ra với tỉ lệ bằng nhau khi layout của bạn giãn ra hay co lại. 

Ví dụ:
![](https://images.viblo.asia/3092920f-f4ff-4d1b-9159-d790230c810b.png)

Mình quay ngang màn hình:
![](https://images.viblo.asia/fedf2b0d-bafd-4428-904a-c97e3f66c40e.png)
## Equal Spacing

Equal Spacing sẽ duy trì khoảng cách bằng nhau giữa mỗi subview và sẽ không thay đổi kích thước các subview. Mình sẽ minh họa điều này bằng cách vẽ các đường màu đỏ để chỉ ra kích thước bằng nhau của khoảng cách giữa các label.

![](https://images.viblo.asia/51ee981c-36b8-4c03-b235-5539bd767712.png)

## Equal Centering

Cuối cùng, loại distribution cuối cùng hơi khó nhìn nếu không có hình minh họa. Nó sẽ equally space các center của các subview. Để minh họa điều này, mình đã vẽ các đường thẳng đứng màu đỏ xuống trung tâm của mỗi subview. Khoảng cách giữa các đường màu đỏ được đặt cách đều nhau.

![](https://images.viblo.asia/29444b00-ce8a-4b71-8ab0-98cc43b2edde.png)

Nguồn: 

https://spin.atomicobject.com/2016/06/22/uistackview-distribution/
https://www.raywenderlich.com/2198310-uistackview-tutorial-for-ios-introducing-stack-views