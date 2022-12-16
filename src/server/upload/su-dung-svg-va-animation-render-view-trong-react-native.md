Trong bài viết [lần trước](https://viblo.asia/p/react-native-animated-RQqKLEbMZ7z) nói về animation, mình có hứa bên dưới sẽ giới thiệu thêm về các hàm (sequence , parallel...). Tuy nhiên, trong bài này, mình lại có 1 ý tưởng mới hơn, vừa tiếp tục chia sẻ về animation lại vừa giới thiệu thêm một "chiêu trò" mới này =)):

### Video demo
![](https://images.viblo.asia/25cc9d17-9b32-41d4-94b7-e68d0fe5d472.gif)

Cũng thú vị chứ ạ? Bài viết này mình sẽ chia sẻ về cách sử dụng svg và linh hoạt sử dụng animation để làm một "cây phả hệ" như vậy ạ! 

Trước tiên, mình hãy cùng tìm hiểu một vài lí thuyết nhé!

# 1. [react-native-svg là gì ?](https://github.com/react-native-community/react-native-svg)

Svg là một dạng định dạng ảnh sử dụng cấu trúc XML để hiển thị hình ảnh dưới dạng vector, vì vậy có thể co giãn thoả mái mà không làm giảm chất lượng hình ảnh.

Còn react-native-svg là một lib cung cấp hỗ trợ svg cho React Native trên Android và IOS.
Nó hỗ trợ được hầu hết các elements and properties (Rect, Circle, Line, Polyline, Polygon, G, Path ...). Về cách cài đặt về sử dụng, bạn có thể đọc thêm ở link đầu mục.

# 2. [Path trong react-native-svg](https://www.w3.org/TR/SVG/paths.html#Introduction)
Để vẽ line có nhiều elements như: Line, Polyline, Path...

Trong bài này mình sẽ dùng Path để vẽ các đường cong từ hai điểm cho trước.

Lí do mình lựa chọn Path vì:
+ Line chỉ giúp tạo đường thẳng từ hai điểm cho trước
+  Polyline thì tạo hình dựa vào các đường thẳng
+   Path có thể tạo được đường thẳng, đường cong, tạo hình...  từ các điểm (đúng ý mình rồi :))) ).

Cùng mình tìm hiểu thêm về cách sử dụng Path nhé!

### **a. Một số thuộc tính của Path** 
- **d** : Các dữ liệu của Path được chứa trong thuộc tính **d** của Path, xác định đường bao bên ngoài cho hình khối  (dữ liệu trong d sử dụng các lệnh trên).
- **stroke**, **strokeWidth** : điều chỉnh được màu sắc và chiều rộng của nét vẽ.
- **strokeDashoffset**, **strokeDasharray**  : Hai thuộc tính này có thể giúp tạo hiệu ứng như line đang di chuyển.

    strokeDasharray: để tạo dòng đứt khúc.

    [strokeDashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset): xác định phần bị ẩn đi trên mảng dasharray gây nên sự thay đổi về hiển thị của mảng. 
    
    Hình minh hoạ: 
    
    *Hình line màu đen là line hiển thị còn line màu đỏ là mình vẽ thêm để giải thích về dashoffset*
    
    ![](https://images.viblo.asia/e005f694-fe8e-4764-8422-18255311825d.png)
    
    *Dashoffset lần lượt của các line*
    ```
    //line 1: no dasharray + dashoffset
    //line 2: dasharray(3,1), no dashoffset
    //line 3: dasharray(3,1),  dashoffset (1)
    //line 4: dasharray(3,1),  dashoffset (2)
    //line 5: dasharray(3,1),  dashoffset (3)
    ```


### **b. Một số lệnh cần biết** 
> + M = moveto
> + L = lineto
> + H = horizontal lineto
> + V = vertical lineto
> + C = curveto
> + S = smooth curveto
> + Q = quadratic Bézier curve
> + T = smooth quadratic Bézier curveto
> + A = elliptical Arc
> + Z = closepath

Các dòng lệnh trên có thể sử dụng được cả viết hoa và viết thường. Tuy nhiên, chữ viết hoa có ý nghĩa là vị trí tuyệt đối còn chữ thường là vị trí tương đối.


Ví dụ :  `// line with 2 point (100,100) and (200,300)`
```
const { width, height } = Dimensions.get('window');
return 
<Svg 
    width={width} 
    height={height} 
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Path
              d={"M100 100 L200 300"} 
              stroke={"green"}
              strokeWidth={6}
              fill="none"
            />
 </Svg>
```
Và đây là kết quả: 
![](https://images.viblo.asia/6b7918e7-4dbf-45fa-bccf-3e738a836be3.png)


Vậy để tạo đường cong thì sao?

### **c. Sử dụng 'A' và 'a' để tạo đường cong** 
+ A (absolute)  a (relative)
+ Đường cong được tạo ra dựa vào các cung tròn ( các phần của hình tròn hoặc hình eclipse ).
+ Sử dụng:
```
Lx1 y1 A rx ry x-axis-rotation large-arc-flag sweep-flag x y
Lx1 y1 a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
```
***Trong đó :*** 
1. Đối với A hay a các tham số :
* x1, y1: điểm bắt đầu
*  rx, ry lần lượt là 2 bán kính của hình eclipse. 
*  x-axis-rotation là góc quay của hình eclipse. 
*  large-arc-flag là lựa chọn cung lớn (1) hay nhỏ (0).
*  sweep-flag là chiều quay ( 1 : cùng chiều kim đồng hồ và 0 là ngược lại).

2. `x y` và `dx dy`
* Đối với A điểm cuối cùng sẽ là (x,y)
* Đối với a, điểm cuối của cung sẽ tính bằng (x1 + dx, y1 + dy).

Để hiểu rõ hơn cách sử dụng A hay a cũng như param truyền vào. Xét hai ví dụ sau: 

**Ví dụ 1:** 

`// using 'a' get line with 2 point (350,400) and (50,300) with radius 40`
```
const { width, height } = Dimensions.get('window');
return 
<Svg 
    width={width} 
    height={height} 
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Path
              d={"M350,400 L350 340 a 40,40 1 0 0 -40,-40 L50 300"}
              stroke={"green"}
              strokeWidth={6}
              fill="none" />
 </Svg>
```

**Ví dụ 2:** 

`// using 'A' get line with 2 point (350,400) and (50,300) with radius 40`
```
const { width, height } = Dimensions.get('window');
return 
<Svg 
    width={width} 
    height={height} 
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Path
              d={"M350,400 L350 340 A 40,40 1 0 0 310,300 L50 300"}
              stroke={"green"}
              strokeWidth={6}
              fill="none" />
 </Svg>
```

Và đây là kết quả của cả 2 ví dụ: 
![](https://images.viblo.asia/861d1a36-a031-4b43-9ef6-7f8981573235.png)


Giải thích: Đường cong được tạo bởi hình eclipse có rx = ry = 40, điểm bắt đầu là (350, 340) quay ngược chiều kim đồng hồ và lấy cung nhỏ ( Đó chính là cung giao giữa hình eclipse và đường cong như trong hình giải thích) và điểm kết thúc trên đường cong là (310, 300).

Trước hết, các bạn xem qua hình: 
![](https://images.viblo.asia/46fe1a47-69bb-41ed-99c1-6eb7afbe8592.png)

Hmm, dựa vào phần lí thuyết mình vừa nêu trên thử ngẫm lại xem sao nhé :D! Và từ những kiến thức trên, bạn có thể vẽ được các hình như trên demo ví dụ đầu bài đấy :D!

# 3. Vẽ line như video demo 
Nào, cùng bắt tay vẽ các line dựa và 2 điểm với list data mình cung cấp hoặc bạn có thể tự tạo data.

Tham khảo [dataPath](https://jsoneditoronline.org/?id=a8a2d88c15684a0291edae8b37b65487) mình truyền vào, mình chỉ truyền vào 2 điểm và vào thông tin vẽ nó sẽ giúp mình vẽ được line.

Đây là [cách viết của mình](https://github.com/HueDiemDue/MyProject/blob/master/source/utils/HelperLines.js) vẽ 3 type trên nhé!

Rất mong tham khảo thêm nhiều cách viết khác của bạn hơn ở dưới cmt ạ :D!
# 4. Vẽ avatar cho line 
Như vậy là xong cách vẽ các đường, giờ tới add các image vào đúng vị trí của chúng và tất nhiên chúng cũng phải "khớp" với line đúng vị trí và đúng time chạy animation.
Mình tạo một mảng[ dataPoint](https://jsoneditoronline.org/?id=7125b3870cd44e4faabe81701c8bfe68) khớp với các thông tin `dataPath` bên trên.
Mình để lại 1 điểm đánh dấu vẽ đầu tiên không nằm trong mảng để vẽ avatar của điểm bắt đầu.

Dựa vào x và y, ta có thể xác định được chính xác tâm của image đó, set được vị trí đặt avatar
```
<Image
   source={image}
   style={[
   styles.img,
   {
     marginLeft: x - 40,
     marginTop: y - 40,
   }
   ]} />
```

```
 img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
  }
```
Vậy là ta đã có path và có cả avatar rồi, giờ hãy tìm cách sử dụng animation thôi!

# 5. Add animation vào line
Như bài trước mình đã chia sẻ và animation, bài này mình sử dụng  timing để tạo animation cho từng line tạo chuyển động vẽ và sử dụng sequence/parallel để chạy lần lượt/song song một array animation.

**Phân tích**:
Như video demo ta thấy, đối với những avatar và path cùng x thì sẽ xuất hiện đồng thời (parallel), x lớn thì xuất hiện trước, dần dần xuất hiện hết. Vì vậy, trong `dataPath` và `dataPoint` mình có 1 thuộc tính là `parent` để đánh dấu time xuất hiện của 1 element(path/avatar). Nếu cùng xuất hiện thì sẽ return ra 1 arrayParallel và để chạy animation của toàn bộ "tree" sẽ là sequence.

Trước hết, tạo animation cho từng 1 item riêng biệt: 

**Animation của Path**:
Như đã giới thiệu ở trên, mình sẽ sử dụng hai thuộc tính của path để tạo animation là **strokeDashoffset**, **strokeDasharray** 
```
 this.animatedOffset[index] = new Animated.Value(dashOffset)
 this.animatedOffset[index].addListener(dashOffset => {
            this.refs[index].setNativeProps({
              strokeDashoffset: dashOffset.value,
       });
 });
```
```
   <Path
                      key={index}
                      ref={index}
                      d={d}
                      strokeDasharray={[dashOffset, dashOffset]}
                      strokeLinecap="round"
                      strokeDashoffset={dashOffset}
                      stroke={"#5294E2"}
                      strokeWidth={6}
                      fill="none"
                    />
```

**Animation của Image**:
```
<Animated.Image
                    source={image}
                    key={index}
                    style={[styles.img, {
                      marginLeft: parseInt(x) - 40,
                      marginTop: parseInt(y) - 40,
                      opacity: this.animatedOpacity[index]
                    }]} />
```


### Project chi tiết
Done! Thế là đã đầy đủ kiến thức và cách làm có thể làm được "cây phả hệ" giống với video đầu bài rồi :D! Còn đây là [project chi tiết](https://github.com/HueDiemDue/MyProject)  để bạn có thể tiện theo dõi và tham khảo chi tiết cách làm của mình. Hãy thử xem và đưa ra ý kiến của bạn về project ạ :)!

Cảm ơn các bạn đã đọc rất nhiều và rất mong nhận được nhiều ý kiến và chia sẻ của các bạn ở dưới cmt ạ!