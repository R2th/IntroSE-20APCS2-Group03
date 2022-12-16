Xin chào các bạn, hôm nay mình sẽ cùng các bạn đi tìm hiểu về React Native và Flexbox. 
Cũng giống như các platform khác. Khi chúng ta làm app thì đều có công cụ hỗ trợ để thiết kế giao diện. Và đặc trưng của React Native thì đó là FlexBox. Chúng ta có thể dùng thuật toán FlexBox để dựng giao diện sao cho các layout sẽ phù hợp với các loại màn hình khác nhau. Tương tự như Auto Layout của iOS vậy :v . Trong document của React Native có mô tả rằng Flexbox cũng tương tự như CSS khi các bạn code Web. Chỉ có một vài điểm nhỏ khác biệt. Ví dụ như các gía trị mặc định có phần khác nhau, với FlexDirection có giá trị mặc định là column thay vì row, hay tham số Flex cũng sẽ chỉ hỗ trợ các số đơn lẻ, ... . 
# Flex
Thuộc tính flex sẽ định nghĩa cái view đó sẽ lấp trống view cha như thế nào. Hãy nhìn đoạn code bên dưới

```
import React from 'react';
import { View } from 'react-native';

export default FlexDirectionBasics = () => {
  return (
    // Try setting `flexDirection` to `column`.
    <View style={{flex: 1, flexDirection: 'column'}}>
     <View style={{flex: 1, backgroundColor: 'powderblue'}}>
     </View>
     <View style={{flex: 2, backgroundColor: 'red'}}>
     </View>
     <View style={{flex: 3, backgroundColor: 'blue'}}>
     </View>
    </View>
  );
};
```

Ví dụ trên đã vẽ 3 view, bao gồm các view màu powderblue, red, blue. Và đã được truyền vào các tham số flex có giá trị tương ứng là 1, 2, 3. 1+ 2 + 3 = 6, điều đó có nghĩa là view màu powderblue = 1/6 view cha, view màu red = 2/6 view cha, và view màu blue = 3/6 view cha. Khi run code lên chúng ta sẽ dễ dàng nhận thấy:
![](https://images.viblo.asia/52eff4c2-e7c6-4af3-b88e-724a4f94aa97.png)

# Flex Direction
Flex direction sẽ điều khiển hướng mà các view con sẽ được render ra. Nó gồm 4 giá trị như sau
- column(giá trị mặc định) : Các view sẽ được căn chỉnh theo thứ tự từ trên xuống dưới
- column-reverse: Các view con sẽ được căn chỉnh theo thứ tự từ dưới lên trên (ngược lại với column)
- row: Các view con sẽ được căn chỉnh theo thứ tự từ trái qua phải

![](https://images.viblo.asia/52463a9b-9b96-4f92-9a84-dabf5ee01586.png)
![](https://images.viblo.asia/52463a9b-9b96-4f92-9a84-dabf5ee01586.png)
![](https://images.viblo.asia/5e7e5a13-b182-48b2-90e6-59c784d7741c.png)
![](https://images.viblo.asia/f0bab802-8b8a-4b09-8e30-7705970369fa.png)

# Layout Direction
Layout Direction có thể gọi là gốc toạ độ (trái, phải). Mọi các view con hoặc text sẽ được layout từ trái qua phải tuỳ theo giá trị nào được set:
LTR (mặc định): Text và các view con sẽ được layout từ trái qua phải
RTL: Text và các view con sẽ được layout từ phải qua trái

# Justify Content
Justify Content sẽ căn chỉnh các view con dựa trên trục chính (trục nằm dọc) của view cha. 

- flex-start (giá trị mặc định): các view con sẽ được layout từ gốc toạ độ của view cha
- flex-end:các  view con sẽ được layout về phía cuối của gốc toạ độ view cha
- center: các view con sẽ được layout tại vị trí giữa của view cha
- space-between, space-around, space-evenly: Căn khoảng cách đều giữa các view
 Để trực quan hơn, các bạn hãy quan sát các trường hợp: 
 
 ![](https://images.viblo.asia/c8a4959a-60a8-47a6-b590-5f8fc21b2426.png)
![](https://images.viblo.asia/0c4abc0b-6b9a-408d-85b3-bfe06b8eadba.png)
![](https://images.viblo.asia/aac5a818-4b27-4481-90d0-82f3d263771a.png)
![](https://images.viblo.asia/69f7dca9-6726-4733-b1f2-9920c394e5b6.png)
![](https://images.viblo.asia/7b5dc47c-c7f2-4896-8db4-3b1719f94e04.png)
# AlignItem
Thuộc tính này tương tự với JustifyContent, chỉ có điều thay vì trục dọc thì nó căn chỉnh dựa trên trục ngang
- stretch (giá trị mặc định): chiều rộng của view con sẽ được kéo bằng với view cha. 
- flex-start: căn tại điểm bắt đầu của trục ngang
- flex-end: căn tại điểm kết thúc của trục ngang
- center: căn tại điểm giữa của trục ngang
- baseline: căn theo content của mỗi item
Lưu ý: đối với stretch, chúng ta cần phải remove thuộc tính set chiều rộng của view thì mới có tác dụng

```
import React from 'react';
import { View } from 'react-native';

export default AlignItemsBasics = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 100, backgroundColor: 'steelblue'}} />
      </View>
    );
};
```

![](https://images.viblo.asia/8da4284f-2e34-470b-bd84-7dbd3e24255b.png)
![](https://images.viblo.asia/71dcc761-601c-40f2-890e-9bc5190895d8.png)
![](https://images.viblo.asia/88f9a791-9d53-4441-b983-7754546cec29.png)
![](https://images.viblo.asia/30f184dd-a2aa-415b-b418-8e4623beb1b5.png)

# Align Self
Thuộc tính Align Self gần giống với Align Items, nhưng sẽ được set ở view con, tác động đến chính nó trên hệ quy chiếu là view cha.
Align Self sẽ có độ ưu tiên cao hơn Align Items

![](https://images.viblo.asia/d72bff26-1b62-439a-b93a-0767791a6198.png)
![](https://images.viblo.asia/a19e5c6f-362b-4515-b468-d09598566548.png)
![](https://images.viblo.asia/4a3d546e-450a-44f9-8e23-ef4a836bd1aa.png)
![](https://images.viblo.asia/7fc847ed-c1ad-43e4-a0b0-40ae279e91ed.png)

# Flex Wrap
Khi tổng chiều dài hoặc chiều rộng của các items trong view lớn hơn view cha thì chúng có thể được cắt thành một hàng hoặc cột mới.
Khi để mặc định, các view con sẽ tràn ra bên ngoài.

![](https://images.viblo.asia/c8abd02e-64fe-47fe-8911-89c9ac41e236.png)
![](https://images.viblo.asia/0f5be28e-826b-49f6-8f4d-359f4a03460b.png)
# Align Content
Thuộc tính này chỉ có hiệu qủa khi chúng ta đã dùng wrap. Nó sẽ căn chỉnh khoảng cách giữa các line đã được cắt bởi wrap
Các giá trị của nó tương tự như justify content vậy. Chỉ khác nhau đối được được áp dụng mà thôi. Hãy cùng quan sát
![](https://images.viblo.asia/d1f5ec4d-5af9-409a-a228-02a94bc9e3d4.png)
![](https://images.viblo.asia/753f8f58-7709-4b3b-9746-e888a5a2ff9c.png)
![](https://images.viblo.asia/cb1bf837-ce89-4465-82db-567d576c0e96.png)
![](https://images.viblo.asia/2d38cf5d-0415-48e0-869d-2ce737051808.png)
![](https://images.viblo.asia/c665f8b8-1635-404f-8480-23d6f05a4c2a.png)
![](https://images.viblo.asia/422a6ab5-3f14-419b-b257-47b0267cf57a.png)

# Flex Basis, Grow, and Shrink
## Flex Grow
flex grow định nghĩa xem item sẽ được dãn ra bao nhiêu để lấp vào khoảng trống của view cha.
Ví dụ rằng có 3 view như sau, tổng chiều rộng nhỏ hơn view cha

![](https://images.viblo.asia/3cea7b51-ffba-4fac-abeb-7c2dccfdae4c.png)

Khi set flex grow của view thứ nhất bằng 1, chiều rộng của nó sẽ cộng thêm khoảng trống để dàn hết view cha

![](https://images.viblo.asia/2ba90290-f73c-415e-8462-4e10f1f510df.png)

Giữ nguyên giá trị đó của view thứ nhất, ta set flex grow của view thứ 2 bằng 2

![](https://images.viblo.asia/518a4e80-0099-4e53-a45c-267ac257f38a.png)

Kết quả như sau: chiều rộng của view thứ 2 đã được cộng thêm  phần khoảng trống thừa bằng 2 lần view thứ nhất

## Flex Shrink
Thuộc tính này có phần ngược lại so với Flex grow, nếu như tổng các item lớn hơn view cha, thì thuộc tính này sẽ định nghĩa tỉ lệ bị trừ đi 
# Width and Height
Về chiều cao và chiều rộng của item, chúng ta có thế tính theo 3 cách sau:

- auto (giá trị mặc định): React Native sẽ tự động tính sao cho phù hợp với container
- pixel: chúng ta sẽ set cho chúng giá trị nhất định
- percentage: Dựa theo tỉ lệ giữa view và container

# Absolute & Relative Layout
Đây là thuộc tính về posittion, sẽ định nghĩa vị trí mà view sẽ xuất hiện trong view cha

- relative (giá trị mặc định): dựa vào 4 giá trị top, bottom, left, right. Khi thay đổi các gía trị này, các view khác có liên quan đến view này vẫn giữ nguyên vị trí
![](https://images.viblo.asia/23c2f00a-f2d8-430c-8fc3-8fda1cd8ede0.png)

- absolute: khi view được set posittion là absolute, nó được định độc lập so với các view khác trong view cha. 4 giá trị top, bottom, left, right chỉ có liên quan đến view cha mà không quan tâm đến các view ngang hàng khác. Có thể tưởng tượng giá trị trục z (độ cao) sẽ khác nhau khi chúng được set thuộc tính này 
![](https://images.viblo.asia/0540cf8e-e33c-4564-99d0-20d577676fff.png)


Trên đây là các điều cơ bản về Flexbox trong design của React Native, hi vọng sẽ giúp ích cho các bạn. Cám ơn đã đọc bài viết của mình.