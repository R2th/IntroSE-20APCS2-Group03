# I> Giới thiệu sơ qua:
* Để xử lý các animation, ta có thể lựa chọn cách viết truyền thống là css modules, viết css thuần, sau đó viết logic xử lý vài sự kiện bằng event. Tuy nhiên, ta nên thử lựa chọn 1 số thư viện, nó giúp việc quản lý animation bằng mã js dễ quản lý hơn. Trong đó 1 thư viện có thể giúp điều đó là Reacts-spring.
* Nó là 1 thư viện xử lý các hoạt hình, lấy cảm hứng từ animated và react-motion, xử lý các hoạt hình hầu như hay xảy ra với UI như việc hoạt động xử lý vật lý của con lắc lò xo khi lắc( khối lượng, độ căng của dây lò xo, ma sát với không khí). Bởi vì nó rất nhẹ ( 10.7KB với bản trên web, 9.7kb với bản trên native. Với khả năng xử lý linh động và được support từ các ông lớn như airbnb hay matterapp, thì việc được cộng đồng ủng hộ nhiệt tình từ khi nó mới ra mắt, còn chần chờ gì nữa mà không tìm hiểu nó nào.

![](https://images.viblo.asia/35450a6a-6447-4b58-a472-11ce1f506c98.png)


# II>  Bắt đầu cài đặt để tìm hiểu nào:

Câu lệnh cài đặt quen thuộc:
`npm install react-spring`

# III> Tìm hiểu về api các ứng dụng hay dùng của nó:
## 1> Các common api:
Đây là các api để config mà tất cả các spring(hook/component) đều sử dụng. Ta sử dụng chúng để config để có hoạt hình hợp lý, chia làm các nhóm sau(mình chỉnh liệt kê một số config cảm thấy hay dùng và có thể hiểu, vì nó rất nhiều).
### Configs:
* duration: thời gian hiệu ứng(giá trị mặc định là undefined)
* precision: độ chính xác
* tension: độ căng, giá trị này càng lớn hoạt hình càng diễn ra liên tục
* friction: ma sát, giá trị càng lớn dẫn đến sức cản của hoạt hình càng cao, hoạt hình diễn ra chậm hơn
* mass: khối lượng
### Presets:
Đây là bộ giá trị của mass, tension và friction. Mặc định của nó là : config.default tương ứng với { mass: 1, tension: 170, friction: 26 }. Các bộ khác các bạn có thể coi trong docs của nó.
### Properties:
Các thuộc tính hay dùng sẽ là:
* from: (từ) cũng giống như from trong keyframe
* to(đến):cũng giống như to trong keyframe
* delay: tạm dừng mili giây trước khi bắt đầu
* config: sử dụng các config đã nêu ở mục config trên
* reset: set bằng true nếu muốn reset lại mỗi khi kết thúc 1 lần hoạt hình.
* onStart: ở giai đoạn bắt đầu sẽ làm gì
* onReset: ở giai đoạn đứng yên sẽ làm gì
**Interpolations**: mình thấy các api hay dùng là map, output với extrapolate.
Tham khảo tại đây: https://www.react-spring.io/docs/hooks/api
## 2>Các hỗ trợ (unit):
* Màu sắc(names, rgb, rgba, hsl, hsla, gradients)
* Đơn vị(cm, mm, in, px, pt, pc)
* Relative lengths (em, ex, ch, rem, vw, vh, vmin, vmax, %)
* Góc đo(deg, rad, grad, turn)
* Flex and grid units (fr, etc)
* All HTML attributes
* SVG paths
* Arrays
* String patterns (transform, border, boxShadow, etc)
* Non-animatable string values (visibility, pointerEvents, etc)
* ScrollTop/scrollLeft

## 3> Một số hook api xử lý hoạt hình hay dùng:
React-spring có 5 hook hay dùng(viết hook, nên nó được dùng như custom hook). Mình sẽ giới thiệu 1 số ví dụ cơ bản và 1 số ví dụ hay dùng của nó. Các hook sẽ dùng với các api common đã được giới thiệu trước đó.
### a> Use Spring:
Được dùng với đơn hoạt hình, để di chuyển (giống như from -> to giống keyframe trong css).

**Một số ví dụ:**
* Ví dụ khi ta muốn hiệu ứng từ từ hiện ra đoạn text
![](https://images.viblo.asia/3df95d7a-8a61-42e2-882a-d196b305f286.png)

Ví dụ này tương đương:

```
from  {
opacity: 0;
}
to {
opacity: 1;
}
```

Phân tích ví dụ:
*  Ta sử dụng useString như một hook, và chắc chắn có truyền vào from và tham số khác và opacity , nó sẽ trả về props styles tương ứng (ngoài ra còn có set để set lại trạng thái style cho hoạt hình nếu muốn thay đổi khi có event xảy ra hay stop nếu muốn stop hoạt hình).
* animation.h1 → render ra thẻ h1 + props là styles được truyền vào → animation tương ứng

* Ví dụ về hiệu scroll:

Lần này ta ta truyền vào thay vì param opacity , ta truyền vào scroll . Hiệu ứng này có kết quả như sau:
![](https://images.viblo.asia/9ad2606c-b5bc-4f60-91d1-dbf9411e65b4.png)


* Ví dụ hiệu ứng vẽ svg:
![](https://images.viblo.asia/8e19514a-85f5-42ee-ae79-0cc4ca0a1601.png)

Lần này ta thêm config delay và duration để có thể xem hiệu ứng từ từ( config là 1 hỗ trợ thêm từ react-spring nếu ta muốn hiển thị theo nhiều cách khác nhau)

### b) useSprings:
Tương tự như với useSpring, tuy nhiên được áp dụng với 1 list các đối tượng mà ta muốn nó có hiệu ứng gần như giống nhau.
### c) useTrail:
Nếu bạn muốn xử lý 1 mảng các phần tử, bạn muốn các phần tử trong mảng này sẽ có hiệu ứng lần lượt được thực hiện từ phần tử thứ nhất đến phần tử cuối cùng. Hiệu ứng này sẽ tạo ra hiệu ứng liên tiếp nhau, ví dụ như thế này:

https://codesandbox.io/embed/zn2q57vn13?source=post_page-----636910f3abfa----------------------


### d) useTransition:
Nếu bạn muốn quản lý sự biến đổi của các hiệu ứng khác nhau:
Ngoài các api common, nó còn còn sử dụng các api khác như from, enter , update, leave,vv để quản lý các trạng thái khi đến, rời đi hay hủy bỏ.
Ví dụ mình thấy hay nhất trong docs của nó liên quan đến chuyển trang khi kết hợp react-router:

https://codesandbox.io/embed/1y3yyqpq7q?source=post_page-----636910f3abfa----------------------

### e)useChain:
xử dụng kết hợp với useRef để xác định đối tượng và xác định thứ tự thực hiện các animation.
Như ví dụ này:

https://codesandbox.io/embed/2v716k56pr?source=post_page-----636910f3abfa----------------------



## 4> Chú ý:
Ngoài ra, trước đây react-spring viết thành các component xử lý animation có chức năng tương tự: Spring tương ứng với useSpring, Transition tương ứng với useTransition, Trail tương ứng với useTrail.
Nhưng giờ đa phần họ dùng với hook, các ví dụ về component trên github cũng đã đã bị xóa đi và đều chuyển sang dùng với hook.
# IV> Kết luận:
Việc sử dụng react-spring rất linh hoạt, giúp việc kiểm soát animation bằng js , nó giúp kiểm soát khi nào bắt đầu , khi nào kết thúc hay hủy bỏ hiệu ứng một cách chủ động hơn.
Ngược lại, nó có thể nặng hơn so với việc sử dụng css thuần(nhưng chỉ áp dụng cho web, và 1 số platform rất hạn chế).
Do đó, việc sử dụng animation như thế nào còn tùy thuộc mức độ của dự án, cũng như mục đích hướng tới của nó là như thế nào.

**Tham khảo và các animation tham khảo thêm**
https://www.react-spring.io