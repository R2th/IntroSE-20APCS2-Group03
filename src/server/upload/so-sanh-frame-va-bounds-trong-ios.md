Để hiểu về frame và bounds, ta có thể định nghĩa nó như sau:

- Frame của view là vị trí và kích thước của nó, sử dụng hệ thống toạ độ của view cha (view này nằm trong một view cha)
- Trong khi đó, bounds là vị trí và kích thước của view đó sử dụng hệ thống toạ độ của chính nó.

### Frame vs Bounds
Ở bức hình bên trái, view được đặt ở top left của parent view, hình chữ nhật màu vàng đại diện cho frame của view. Ở bức hình bên phải, ta cũng thấy lại view này nhưng lần này, parent view lại không được hiện ra. Đó là do bounds không biết gì về parent view cả, và hình chữ nhật màu đỏ đại diện cho view bounds. Và chấm xanh ở cả hai bức hình đại diện cho điểm gốc của frame và bounds.

![](https://images.viblo.asia/3bca85dd-7681-45c8-85b9-99810d2ae563.png)

```
Frame
    origin = (0, 0)
    width = 80
    height = 130
 
 Bounds 
    origin = (0, 0)
    width = 80
    height = 130
```

Thật là rối rắm phải không, xem ra thì frame và bounds chẳng khác gì nhau cả???

Bây giờ hãy cùng xem ví dụ tiếp theo, ta sẽ thay đổi origin của frame như sau:

```
Frame
     origin = (40, 60)
     width = 80
     height = 130
 
 Bounds 
     origin = (0, 0)
     width = 80
     height = 130
```

![](https://images.viblo.asia/769b33d6-f0f5-43d1-8321-49474ccdff09.png)

Bây giờ thì có chút khác biệt rồi nhỉ, sau khi thay đổi toạ độ x-y, frame đã di chuyển khỏi vị trí ban đầu, nhưng nội dung của nó thì vẫn y như vậy. Trong khi đó, bounds vẫn không hề biết gì về sự thay đổi. Đến thời điểm này thì cả width và height của cả frame lẫn bounds đều giống nhau. Tuy nhiên nó không phải lúc nào cũng như vậy. Nếu ta xoay view đi 20 độ, nó sẽ không còn giống nhau nữa.

```
Frame
   origin = (20, 52)
   width = 118
   height = 187
 
Bounds 
   origin = (0, 0)
   width = 80
   height = 130
```

![](https://images.viblo.asia/7e12c30e-7e8e-4e31-9e98-eb0b05f905ce.png)

Ta có thể thấy bounds vẫn y như vậy, nó vẫn không hề biết chuyện gì đã xảy ra, trong khi frame thì thay đổi liên tục. Giờ thì rõ ràng frame và bounds khác nhau lắm rồi phải không?

Ta cần chú ý tới việc transform một view, khi đó frame của nó sẽ không định nghĩa được. Vì vậy, khung hình màu vàng được vẽ ở trên khi xoay hình thực ra không hề tồn tại. Điều đó có nghĩa là nếu cần xoay, scale hoặc làm bất cứ tác vụ transformation nào thì ta không nên sử dụng giá trị của frame. Nhưng vẫn có thể sử dụng được giá trị của bounds. Trong document của Apple có ghi:

> Important: If a view’s transform property does not contain the identity transform, the frame of that view is undefined and so are the results of its autoresizing behaviors.

Từ đầu đến giờ, ta nhận thấy rằng origin của bounds luôn nằm ở vị trí (0, 0). Tuy nhiên, nó không bắt buộc phải như vậy. Sẽ như thế nào nếu view có một subview quá lớn để hiển thị? Ta sẽ dùng UIImageView với một ảnh lớn. Dưới đây ta có thể thấy được toàn bộ nội dung của subview:

```
Frame
    origin = (40, 60)
    width = 80
    height = 130
 
Bounds 
    origin = (0, 0)
    width = 80
    height = 130
```

![](https://images.viblo.asia/264f5858-ec83-4ca6-b93c-3c2c4c499a51.png)
Chỉ có góc top left của khung hình được nằm trong bounds của view. Bây giờ nếu ta thay đổi toạ độ của bounds origin như bên dưới:

```
Frame
    origin = (40, 60)
    width = 80
    height = 130
 
Bounds 
    origin = (280, 70)
    width = 80
    height = 130
```

![](https://images.viblo.asia/f80aa497-95f6-4957-8158-c0124db5cc1b.png)

Frame vẫn nằm yên một chỗ trong parent view nhưng nội dung bên trong frame đã bị thay đổi, bởi origin của bounds bây giờ đang nằm ở một vị trí khác của view.  Đây cũng ý tưởng chính đằng sau UIScrollView và những subclass của nó (TableView, CollectionView...).

### Khi nào nên sử dụng frame, khi nào nên sử dụng bounds
Bởi frame liên quan đến vị trí của view trên parent view, nên ta thường sử dụng nó khi cần những thay đổi bên ngoài, như thay đổi width hoặc tìm khoảng cách giữa view và top của parent view. 
Trong khi đó, bounds được sử dụng trong các trường hợp cần những thay đổi bên trong, ví dụ như vẽ hoặc sắp xếp các subview bên trong view. Ngoài ra, bounds còn được dùng để lấy kích thước của view nếu ta đã áp dụng transformation cho nó trước đó.