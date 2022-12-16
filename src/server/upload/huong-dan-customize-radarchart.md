Xin chào các bạn, hôm nay mình sẽ hướng dẫn các bạn cách để customize một radar chart, biến nó thành một radar chart có thể thay đổi các giá trị của nó. Đây chính là hình ảnh của một radarchart:
![](https://images.viblo.asia/bd0f1623-7232-4b1f-831f-8cf3b7146828.png)

Chart phía trên có 6 giá trị, bây giờ chúng ta sẽ customize để có thể kéo và thay đổi 6 giá trị đó. 
Đầu tiên các bạn hãy tải project về máy: https://github.com/dadalar/DDSpiderChart

Tạo một radarChart: 
 ![](https://images.viblo.asia/8c0fac0b-1b46-46f4-afa0-154dd619db87.png)
 
 Sau đó, chúng ta tìm đến class vẽ chart bằng UIBezierpath(), có tên là DDSpiderChartDataSetView.Swift
 
 ở class này, chúng ta có hàm draw(), đây chính là hàm để tính toán các điểm dựa trên các giá trị đã đưa vào, chúng ta sẽ tính được ra các điểm tương ứng với giá trị đã cho, tạo thành các điểm và nối với nhau thành chart. Để dễ hình dung các bạn hãy nhìn hình
 ![](https://images.viblo.asia/0fe6cad6-bdb4-48a6-a8ab-70ddaae2654c.png)
 
 Theo như trên, Cột facebook có giá trị là 0.8, cột twitter có giá trị là 1 ....
 Trờ lại với hàm draw, chúng ta sẽ thêm mỗi một điểm giá trị là một button hoặc một view, ở đây mình thêm các button có kích thước 10x10
 
```
 let ctrlpoint = UIButton(frame: CGRect(x: 0, y: 0, width: 10, height: 10))
            ctrlpoint.backgroundColor = .black
            ctrlpoint.center = CGPoint(x: x, y: y)
            ctrlpoint.isUserInteractionEnabled = true
            self.isUserInteractionEnabled = true
```
      
  thêm mỗi một button một gesture để có thể điều khiển: 
  ```
let gesture = UIPanGestureRecognizer(target: self, action: #selector(gestureAction(reconized:)))
  ctrlpoint.addGestureRecognizer(gesture)
```
Chúng ta sẽ được kết quả:

![](https://images.viblo.asia/c264c661-c9ac-44db-87b9-6ce58a020c2f.png)

Trong hàm gestureAction ta thêm giá trị để có thể di chuyển button
```
            reconized.view?.center = CGPoint(x: newpoint.x - newDeltaX, y: newpoint.y)
            drawPath()
```
            
Việc tiếp theo là chúng ta sẽ tính toán các miền giá trị dịch chuyển cho các button, để chúng có thể di chuyển trên một trục giá trị nhất định.
Dựa vào các công thức lượng giác, chúng ta sẽ tính được các miền giá trị trên trục xy của mỗi button. Toàn bộ code của hàm gestureAction như sau:
```
@objc func gestureAction(reconized: UIPanGestureRecognizer) {
        
        if (reconized.state == .began) {
            point = reconized.location(in: self)
            deltaX = point.x - center.x
            let deltaY = center.y - point.y
            const = abs(deltaX/deltaY)
        }
        let newpoint = reconized.location(in: self)        
        let deltaY = (point.y - newpoint.y)
        
        let degree = 360 - (CGFloat)((360/values.count)*reconized.view!.tag)
        let radian = degree * (CGFloat.pi / 180)
        let newDeltaX = newpoint.x - (deltaY*tan(radian) + point.x)
        let radiusY = cos(radian)*radius
        
        var limit = false
       
        if (abs(center.y - newpoint.y) > abs(radiusY)) {
            limit = true
        }
        
        if (radian > CGFloat.pi/2 && CGFloat.pi*3/2 > radian) {
            if (newpoint.y < center.y) {
                limit = true
            }
        } else {
            if (newpoint.y > center.y) {
                limit = true
            }
        }
        
        if (!limit) {
            reconized.view?.center = CGPoint(x: newpoint.x - newDeltaX, y: newpoint.y)
            drawPath()
        }
        
        if (reconized.state == .ended) {
            let angle = CGFloat(-Float.pi / 2) - CGFloat(reconized.view!.tag) * CGFloat(2 * Float.pi) / CGFloat(values.count)
            print("angle: %f", angle)
            print("radian: %f", radian)
            let value = (((reconized.view?.center.y)! - center.y)/radius)/sin(angle)
            print("value:", value)
        }
    }
  ```      
Khi đã có các vị trí chúng ta chỉ việc nối các điểm với nhau bằng UIbezierpath() là xong:
```
func drawPath() {
        pointArray.removeAll()
        let path = UIBezierPath()
        for view in self.subviews {
            if (view is UIButton) {
                pointArray.append(view.center)
            }
        }
        path.move(to: pointArray[0] )
        for i in 1...pointArray.count - 1 {
             path.addLine(to: pointArray[i])
        }
        path.close()
        shape.path = path.cgPath
        shape.fillColor = UIColor.gray.cgColor.copy(alpha: 0.5)
    }
```
Kết quả thu được:

![](https://images.viblo.asia/b31b2643-2fc0-4224-bb8e-8a01e3011d8b.png)
![](https://images.viblo.asia/c20998dc-17d9-4df6-8a6c-ec45ae5457af.png)

Sau mỗi lần điều chỉnh giá trị, chúng ra có thể bắt sự kiện tại hàm gestureAction, để nhận được giá trị mới của Chart, chuyển đối từ x,y về giá trị từ 0 đến 1.
```
 if (reconized.state == .ended) {
            let angle = CGFloat(-Float.pi / 2) - CGFloat(reconized.view!.tag) * CGFloat(2 * Float.pi) / CGFloat(values.count)
            print("angle: %f", angle)
            print("radian: %f", radian)
            let value = (((reconized.view?.center.y)! - center.y)/radius)/sin(angle)
            print("value:", value)
        }
```

Vậy là chúng ta đã hoàn thành customize radarchart, có thể sự dụng để hiển thị, điều chỉnh và xuất giá trị như 1 controller.
Cám ơn các bạn đã đọc bài viết. Hi vọng nó sẽ giúp ích cho các bạn.
Link project hoàn chỉnh: https://github.com/trinhtn-1878/RadarChart