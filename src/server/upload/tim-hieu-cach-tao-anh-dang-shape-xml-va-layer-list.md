![](https://images.viblo.asia/b4419d5c-6c77-4c04-b3e9-b5b76b0fb5f0.jpg)

## 1. Giới thiệu
Android cung cấp cho chúng ta rất nhiều cách để có thể tạo được một ảnh. Ví dụ như:
- Ảnh **Bitmap**: là dạng drawable được tổ chức theo ma trận các điểm ảnh, các ảnh bitmap được android hổ trợ bao gồm PNG, JPG và GIF.
- Ảnh **9-Patch** và ảnh **Vector**: ảnh 9-Patch tận dụng lại từ PNG gốc rồi phát triển hơn. Đối với Vector thì mang đến cho chúng ta một cách tổ chức và hiển thị hoàn toàn mới lạ, co giãn và không bị vỡ hình.

Ở bài này chúng ta sẽ tìm hiểu về một 2 loại khác đó là **Shape XML** và **Layer List**. Ít hay nhiều thì đối với một nhà phát triển android chúng ta đều phải động tới những loại này. Để tạo background hoặc custom những ảnh theo ý tưởng của mình.

## 2. Ảnh Shape XML
**Shape XML** dùng để thiết kế bất cứ hình khối nào dựng trên XML. Sau đó khi ứng dụng được thực thi, hệ thống sẽ căn cứ vào thiết kế trên XML mà vẽ ảnh ra cho bạn. Chính vì đựa trên thiết kế XML nên vẽ ảnh bằng Shape XML sẽ không tốn CPU như các loại ảnh như Vector ...

Chúng không tốn chi phí xử lý cua CPU, tức thời gian để vẽ chúng lên màn hình khá nhanh. Nhưng nhược điểm lớn nhất là độ khó và độ đa dạng của chính nó. Thường thì với Shape XML chỉ sử dụng để tạo các hình khối đơn giản, như background có bo tròn cho button, background có viền cho edittext...

### Cách vẽ ảnh Shape XML
Công thức đầy đủ để vẽ ra một Shape XML như sau:

```
<?xml version="1.0" encoding="utf-8"?>
<shape
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape=["rectangle" | "oval" | "line" | "ring"] >
    <corners
        android:radius="integer"
        android:topLeftRadius="integer"
        android:topRightRadius="integer"
        android:bottomLeftRadius="integer"
        android:bottomRightRadius="integer" />
    <gradient
        android:angle="integer"
        android:centerX="float"
        android:centerY="float"
        android:centerColor="integer"
        android:endColor="color"
        android:gradientRadius="integer"
        android:startColor="color"
        android:type=["linear" | "radial" | "sweep"]
        android:useLevel=["true" | "false"] />
    <padding
        android:left="integer"
        android:top="integer"
        android:right="integer"
        android:bottom="integer" />
    <size
        android:width="integer"
        android:height="integer" />
    <solid
        android:color="color" />
    <stroke
        android:width="integer"
        android:color="color"
        android:dashWidth="integer"
        android:dashGap="integer" />
</shape>
```

Nhìn vào nếu ai chưa từng làm qua chắc chắn sẽ rất khó hiểu. Nào, chúng ta cùng nhau tiến hành tìm hiểu chi tiết từng thẻ nào.

- Để bắt đầu vẽ một khối bằng Shape XML, bạn nhất định phải lhai báo thẻ **shape** ở gốc. Trong thẻ shape có thuộc tính **android:shape** dùng để chỉ định một trong các khối hình.
1. **Rectangle**: là hình chữ nhật, hình khối này là mặc định, có nghĩa là nếu không khai báo khối hình của chúng ta sẽ có hình chữ nhật.
2. **Oval**: là hình oval.
3. **Line**: là một đường thẳng với chiều dài dãn ra rộng hết không gian chứa nó, loại hình line này cần đến định nghĩa stroke kèm theo.
4. **Ring**: sẽ vẽ một vành tròn như là một chiếc nhẫn, được giới hạn bởi hai đường tròn làm biên, nếu dùng kiểu ring này thì cần định nghĩa thêm vài thuộc tính nữa ở thẻ này. Đầu tiên là : **android:innerRadius** hoặc **android:innerRadiusRatio** giúp định nghĩa đường kính vòng tròn bên trong, một cái dùng độ lớn còn một cái dùng tỉ lệ để định nghĩa; **android:thickness** hoặc **android:thicknessRatio** giúp định nghĩa khoảng cách giữa hai đường tròn, một cái dùng độ lớn còn một cái dùng tỉ lệ để định nghĩa, **android:useLevel** cho biết ring này có dùng drawable dạng LevelListDrawable hay không.
- Thẻ **conners**: dùng đẻ chỉ định độ bo tròn cho các góc của hình khối.
- Thẻ **gradient**: thẻ này giúp chỉ định ba điểm màn làm mốc, thông qua các thuộc tính **android:startColor**, **android:centerColor** và **android:endColor**. Nó sẽ giúp vẽ ra dãy màu biến thiên dần theo ba màu mốc đó. Thẻ này còn kèm thêm các thuộc tính để xác định kiểu để loát màu như **linear** : đậm dần hoặc nhạt dần, **radial**: tạo ra các vòng tròn nhạt dần hoặc đậm dầm, **sweep**: là kiểu dẻ quạt. Thuộc tính **android:angle** giúp chỉ định góc xoay của dãy màu với type là linear. Hay **android:gradientRadius** giúp định nghĩa bán kính của hình tròn ra-đa.
- Thẻ **padding** và **size** giúp chỉ định độ lớn của biên và độ lớn của hình khối.
- Thẻ **solid** giúp tô màu cho hình khối (ngược lại với cách tô màu biến thiên gradient trên kia). Do tô có một màu nên nó chỉ cần một thuộc tính **android:color** để chỉ định màu.
- Thẻ **stroke** chỉ định độ rộng cho đường biên của hình khối nhờ thuộc tính **android:width**. Và **android:color** của nó giúp chỉ định màu cho đường biên. Bạn còn có thẻ tạo đường biên với nét đứt nhờ **android:dashGap** và khoảng cách giữa các nét đứt **android:dashWidth**.
### ví dụ: Một background cho button trong ứng dụng chạy bộ uprace.
- Tạo file 1 drawable resoure trong package app/res/drawable:
```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <corners android:radius="1dp" />

    <size
        android:width="50dp"
        android:height="10dp" />

    <gradient
        android:centerColor="#3484BF"
        android:endColor="#64D4F0"
        android:startColor="#07368D" />
</shape>
```
- Và đây là kết quả:

![](https://images.viblo.asia/c8a64ed8-c232-4ae0-af44-e34a1b73389d.png)

Việc tiếp theo chúng ta chỉ cần set background và text cho button là giống như của app.

## 3. Ảnh Layer List
Tiếp theo giúp ta tìm hiểu một loại ảnh khác, nó được xem như là một phần mở rộng hơn của Shape XML ở trên, bằng cách kết hợp nhiều hình khối đơn giản đó lại với nhau để tạo thành một khối phức tạp và mới mẽ.
### Cách vẽ một ảnh Layer List
 **Layer List** là sự kết hợp của nhiều Shape XML với nhau. Trong Layer-List sẽ chứa danh sách cách thẻ item. Trong mỗi item chúng ta lại khai báo một Shape XML. Việc này giúp cho chúng ta có thể tạo ra những kiểu ảnh khác biệt cho ứng dụng của chúng ta tùy thuộc vào sức sáng tạo và chịu khó.
 
Chúng ta cũng có một cấu trúc cho LayerList như sau:
```
<?xml version="1.0" encoding="utf-8"?>
<layer-list
    xmlns:android="http://schemas.android.com/apk/res/android" >
    <item
        android:drawable="@[package:]drawable/drawable_resource"
        android:id="@[+][package:]id/resource_name"
        android:top="dimension"
        android:right="dimension"
        android:bottom="dimension"
        android:left="dimension" />
</layer-list>
```

Chúng ta cùng nhau tìm hiểu chi tiết các thẻ.

- Thẻ **layer-list** là thẻ gốc, nó hầu như không có tác dụng gì ngoài việc chứa các thẻ item bên trong nó.
- Mỗi thẻ **item** sẽ có vài thuộc tính kèm theo để định nghĩa bổ sung cho thẻ shape bên trong nó. **android:drawable** giúp chỉ định một resource drawable khác thay cho việc dùng thẻ shape. **android:id** giúp tạo id cho thẻ item. **android:top**, **android:bottom**, **android:left**, **android:right** giúp chỉ định các khoảng cách so với các biên của item đó. **android:width**, **android:height**, **android:gravity** lần lượt xác định chiều rộng, chiều cao và vị trí của item.

### Ví dụ:  tạo một ảnh hình trái tim
Được tạo ra từ một hình thoi và hai hình oval.
- Tạo một file drawable resource từ app/res/drawable:

```
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:bottom="21dp"
        android:left="32dp"
        android:right="32dp"
        android:top="37dp">
        <rotate android:fromDegrees="45">
            <shape>
                <solid android:color="@color/colorPrimary" />
                <size
                    android:width="100dp"
                    android:height="100dp" />
            </shape>
        </rotate>
    </item>

    <item
        android:bottom="52dp"
        android:right="68dp">
        <shape android:shape="oval">
            <solid android:color="@color/colorPrimary" />
        </shape>
    </item>

    <item
        android:bottom="52dp"
        android:left="68dp">
        <shape android:shape="oval">
            <solid android:color="@color/colorPrimary" />
        </shape>
    </item>

</layer-list>
```
- Thành quả chúng ta đạt được:

![](https://images.viblo.asia/78c30e73-99aa-495e-98b1-71629d02aa82.png)

## 4. Kết:
Đó là những gì cơ bản nhất về các tạo ảnh thông qua **shape XML** và **Layer List**. Đôi khi chúng ta làm nhưng không để ý kỹ đến nó. Với bài viết này mong rằng sẽ mang đến các bạn cái nhìn chi tiết hơn về nó. 

*Link tham khảo và nhiều bài học bổ ích:*
*https://yellowcodebooks.com*