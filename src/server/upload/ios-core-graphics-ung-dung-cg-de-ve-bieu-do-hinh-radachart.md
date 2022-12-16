#  Giới thiệu

Trong phần trước, mình đã giới thiệu các bạn một số hàm vẽ cơ bản trong ios. Trong phần này mình sẽ hướng dẫn cách sử dụng các hàm này để vẽ một biểu đồ rada chart như hình dưới
![](https://images.viblo.asia/115ffb2c-c7a6-451d-9c63-2d716ed4153b.png)


# Chuẩn bị

Khi phân tích đề trong hình ta thấy để vẽ được biểu đồ như trên ta cần phải thực hiện các công việc sau:
 - Vẽ các trục toạ độ
 - Vẽ các đường tròn cơ sở
 - Tô màu cho vùng đa giác bên trong
 
 ![](https://images.viblo.asia/9b7fae7e-fd9c-4c92-9581-2eec85a209e0.png)


Vậy để vẽ được hình này ta cần phải nắm rõ được cách vẽ đường thẳng, đường tròn, và đa giác bằng các hàm của Core Graphics.

## Vẽ đường thẳng.

   - B1: Tạo new Project 
   - B2: Tạo file .swift với tên bất kì. (file này sẽ tiến hành vẽ)
   - B3: Trong file vừa tạo, tạo một custom view kế thừa class UIView
   - B4: Trong Storyboard, tạo 1 view và set class cho nó thành class bạn vừa tạo

   Trong ví dụ này mình tạo một file có tên là RadaChart như sau.

```
import UIKit

@IBDesignable
class RadaChart: UIView {
    override func draw(_ rect: CGRect) {
        super.draw(rect)
     
    }
   }
    
```
- Thuộc tính @IBDesignable để có thể vẽ view  in time trong lúc code. Do đó giúp bạn có thể test trực tiếp mà ko cần phải build app
- Khi Uiview được khởi tạo, nó sẽ gọi hàm draw() để vẽ các layer cho view. Vì vậy để vẽ ta sẽ phải override hàm này và vẽ các hình theo ý muốn.

- Để vẽ đường thằng ta sẽ sử dụng công cụ là UIBezierPath(). 
```
override func draw(_ rect: CGRect) {
        super.draw(rect)
        
        let path = UIBezierPath()
        path.move(to: CGPoint(x: 0, y: 0))
        path.addLine(to: CGPoint(x: 150, y: 150))
        path.lineWidth = 2
        UIColor.red.setStroke()
        path.stroke()
    }
```

- Đầu tiên ta khởi tạo công cụ vẽ path.
- Dùng hàm moveto() để xác định điểm bắt đầu
- hàm addlineto() để xác định điểm kế thúc cho path
- Dùng hàm stroke() để vẽ path vừa tạo lên view.
- Ngoài ra có thể set các thuộc tính lineWidth, và color...

Kết quả: 
    ![](https://images.viblo.asia/5f4cbadc-3d6d-4ade-be03-c607612818d4.png)

## Vẽ đường tròn
Tương tự như vẽ đường thẳng ta sứ dụng UIBezierPath() để vẽ đường tròn

```
let path = UIBezierPath()
        let center = CGPoint(x: frame.width/2,
                             y: frame.height/2)
        
        path.addArc(withCenter: center,
                    radius: 70,
                    startAngle: 0,
                    endAngle: 2 * .pi,
                    clockwise: true)
        path.lineWidth = 2
        UIColor.red.setStroke()
        path.stroke()
```
- Ở đây ta sử dụng hàm addArc để tạo 1 cung tròn có độ rộng từ 0 đến 2 pi. tạo thành một cung tròn khép kín.
Trong đó:
- center: là tâm đường tròn
- startAngle: là góc bắt đầu cung tròn
- endAngle: là góc kết thúc
- clockwise: là biến xác định vẽ theo chiều kim đồng hồ hay ko. Nếu set = false thì cung sẽ đc vẽ theo chiều ngược KĐH

Kết quả:

![](https://images.viblo.asia/f638f319-0fca-4efe-9ea7-9c1042fd8565.png)


## Vẽ đa giác
Tiếp tục chúng ta cần vẽ một đa giác bằng cách dùng hàm addline() để nối các đỉnh của nó. 

```
super.draw(rect)
        
        let path = UIBezierPath()
        let center = CGPoint(x: frame.width/2,
                             y: frame.height/2)
        
        path.move(to: CGPoint(x: 0, y: 0))
        path.addLine(to: CGPoint(x: 40, y: 15))
        path.addLine(to: CGPoint(x: 80, y: 45))
        path.addLine(to: CGPoint(x: 90, y: 60))
        path.addLine(to: CGPoint(x: 50, y: 70))
        path.addLine(to: CGPoint(x: 30, y: 40))
        path.addLine(to: CGPoint(x: 0, y: 0))
        path.lineWidth = 2
        UIColor.red.setStroke()
        path.stroke()
```
 Trong đoạn code trên mình đã nối các điểm để tạo thành một hình đa giác, Ta có thể dùng setFill() để tô màu cho đa giác
 
Kết quả:

![](https://images.viblo.asia/ff3011e1-88af-4995-a10a-a8102abe779e.png)

Như vậy đến đây chúng ta, đã có đủ kiến thức cần thiết để vẽ một biểu đồ RadaChart.

# Tiến hành vẽ
## B1: Vẽ các trục toạ độ

- Trục toạ độ là các đường thẳng chạy từ tâm của biểu đồ chia biểu đồ thành cách khoảng cách đều nhau.
    ![](https://images.viblo.asia/ac6601fe-8238-47b3-8ce6-46c74c32f28f.png)
    

- gọi numberOfAxis là số trục toạ độ cần vẽ. (giả sử n = 6)

Để vẽ được những đường thẳng này ta cần phải xác định toạ độc của điểm đầu và điểm cuối của mỗi đường. Theo hình vẽ ta có thể thấy điểm đầu startpoint của mỗi đường thẳng trùng với tâm của hình. Vậy làm thế nào để tìm điểm cuối của mỗi đường.
- Để trả lời câu hỏi này, ta cần nắm được một số kiến thức hình học về toạ độ. Don't worry, mình sẽ cố gắng giải thích thật dễ hiểu nhé.

### Hệ trục toạ độ Decartes

![](https://images.viblo.asia/82371f27-8e0e-48d4-84c1-07c9009f3723.png)

- Trong trục toạ độ decartes, 2 trục toạ độ chia mặt phẳng thành 4 góc phần tư, các góc trên mặt phẳng được chạy từ 0 đến 2 pi. Toạ độ của mỗi điểm trong hệ trục toạ độ có thể xác định nếu biết được khoảng cách của nó đến tâm và góc nghiêng a của nó bằng công thức:
   -   x = r * cos(a)
   -   y = r * sin(a)

 Vì vậy, giả sử ta đã có trước r = 90, để tìm được toạ độ (x, y) của mỗi điểm, ta cần tìm các góc a. 
Trong hệ decartes một cung tròn có giá trị là 2pi, 6 trục toạ độ chia mặt phẳng thành 6 phần, vì vậy mỗi phần sẽ có giá trị là 2pi / 6.
Cho i chạy từ 0...6 vậy giá trị thì toạ độ của các điểm cần tìm lần lượt là.

 - x = 90 * cos(2 pi * (i / 6))
 - y = 90 * sin(2 pi * (i / 6))

Đến đây ta đã có được toạ độ của các điểm cần tìm, bây giờ ta sẽ dùng các điểm đó để vẽ các trục toạ độ.

```
class CustomView: UIView {
    let numberofAxis = 6
    let maxLength: CGFloat = 100
    
    override func draw(_ rect: CGRect) {
        super.draw(rect)
        drawAxis()
      
    }
    
    func drawAxis() {
        for i in 0...numberofAxis {
            let ratio = CGFloat(i) / CGFloat(numberofAxis)
            let axisPath = UIBezierPath()
            axisPath.move(to: CGPoint(x: 0, y: 0))
            let currentArg: CGFloat = (2 * .pi) * ratio
            let maxPoint = CGPoint(x: maxLength * cos(currentArg),
                                   y: maxLength * sin(currentArg))
            axisPath.addLine(to: maxPoint)
            axisPath.lineWidth = 3
            UIColor.black.setStroke()
            axisPath.stroke()
        }
    }
}
```

và bây giờ kết quả thu được sẽ như sau:


Ồ, có vẻ có gì đó sai sai ở đây, rõ ràng ta đã thay vào đúng công thức tính nhưg toạ độ ở đây lại kết quả sai. 
Đó là do công thức chúng ta đang áp dụng là cho trục toạ độ decartes có tâm nằm ở điểm (0, 0). Tuy nhiên trong hệ toạ độ của màn hình gốc toạ độ lại nằm ở phía góc trên của màn hình. 
![](https://images.viblo.asia/d135a154-4c32-40e8-a12f-22f0965f5e3b.png)

Vì vậy, ta phải dời tâm của hệ trục toạ độ từ (0, 0) về tâm của view (width/ 2, height/2)
![](https://images.viblo.asia/0128bd9f-1471-4778-8d7d-5831d2f3cbf6.png)
 Souce code:
 ```
 func drawAxis() {
        let width = frame.width/2
        let height = frame.height/2
        
        let centerPoint = CGPoint(x: frame.width/2, y: frame.height/2)
        for i in 0...numberofAxis {
            let ratio = CGFloat(i) / CGFloat(numberofAxis)
            let axisPath = UIBezierPath()
            axisPath.move(to: centerPoint)
            let currentArg: CGFloat = (2 * .pi) * ratio
            let maxPoint = CGPoint(x: width + maxLength * cos(currentArg),
                                   y: height + maxLength * sin(currentArg))
            axisPath.addLine(to: maxPoint)
            axisPath.lineWidth = 1
            UIColor.black.setStroke()
            axisPath.stroke()
        }
    }
 ```
 
- Kết quả 

![](https://images.viblo.asia/6d98ca99-fb97-4351-954b-01cd8da28235.png)
 ![](https://images.viblo.asia/0e849170-eae7-4c8c-a15f-a3710ab8f176.png)
 
Kết quả có vẽ ổn hơn, tuy nhiên có vẻ có của các đường thẳng của các đường thẳng lại ko đúng với yêu cầu. 

Để giải quyết vấn đề này, ta cần phải xoay góc của các đường thẳng này về đúng vị trí mong muốn. Để làm được điều này ta cần hiểu cơ chế góc gradian của hệ trục trong device iOs.
![](https://images.viblo.asia/b86fc9c2-42ce-4475-bf87-c5d337f4660b.png)
    hệ trục Decartes
    
   ![](https://images.viblo.asia/4dc41704-7664-4c00-8e7e-0023fb91654a.png)

Hệ trục Device iOs.

Như vậy để quay đúng về vị trí của trục y. ta cần quay các đường thẳng thêm một góc là 3 pi/ 2
![](https://images.viblo.asia/ab502f15-2b6b-4f63-a7d7-b1769639589b.png)

Thay vào công thức ta tính ta sẽ có công thức tính góc như sau

```
let currentArg: CGFloat = (2 * .pi) * ratio + 3 * .pi / 2
```

Thay công thức tính góc mới ta được kết quả:
![](https://images.viblo.asia/0e849170-eae7-4c8c-a15f-a3710ab8f176.png)

Tiếp theo ta sẽ vẽ các vòng trong cơ sở:
## Vẽ các vòng trong cơ sở

Trong bước này ta sẽ ap dụng hàm addArc để vẽ các đường tròn đồng tâm.
Giả sử ta cần vẽ 5 đường tròn đồng tâm với khoảng cách 10% độ dài của trục

```
func drawStandardCircle() {
        let centerPoint = CGPoint(x: frame.width/2, y: frame.height/2)

        for i in 5...10 {
            let circlePath = UIBezierPath()
            circlePath.addArc(withCenter: centerPoint,
                              radius: CGFloat(i) * maxLength / 10 ,
                              startAngle: 0,
                              endAngle: 2 * .pi,
                              clockwise: true)
            UIColor.gray.setStroke()
            circlePath.stroke()
        }
    }

```

Kết qủa:
![](https://images.viblo.asia/167bd4f2-d319-4fde-9688-ae5066048095.png)

Đến đây các bạn đã có thể hiểu được hầu hết các kiến thức về vẽ hình trong Core Graphics. Chúng ta tiếp tục bước cuối cùng. Vẽ đa giác giá trị.

## Vẽ đa giác kín

Để vẽ được đa giác này, tương tư như vẽ các trục cơ sở, ta cần xác định giá trị các điểm trên trục toạ độ bằng góc cho trước rồi nối chúng lại với nhau. 
![](https://images.viblo.asia/89941d65-78d5-4ebb-b8a7-8a19d11b36fe.png)

Chúng ta sẽ làm tương tự như vẽ các trục toạ độ

```
func drawValuePolygon() {
        let width = frame.width/2
        let height = frame.height/2
        
        let polygonPath = UIBezierPath()
        for i in 0...numberofAxis {
            let ratio = CGFloat(i) / CGFloat(numberofAxis)
            
            let currentArg: CGFloat = (2 * .pi) * ratio + 3 * .pi / 2
            let valuePoint = CGPoint(
                x: (width + (maxLength * cos(currentArg)) * 0.7),
                                     y: (height + (maxLength * sin(currentArg)) * 0.7)
            )
            
            if i == 0 {
                polygonPath.move(to: valuePoint)
            } else {
                polygonPath.addLine(to: valuePoint)
            }
            
            polygonPath.lineWidth = 1
            UIColor.blue.setStroke()
            polygonPath.stroke()
            UIColor.purple.withAlphaComponent(0.2).setFill()
            polygonPath.fill()
        }
    }
```

```
let valuePoint = CGPoint(
                x: (width + (maxLength * cos(currentArg)) * 0.7),
                                     y: (height + (maxLength * sin(currentArg)) * 0.7)
            )
```
Giả sử chiều dài của đa giác bằng 70% chiều dài của trục cơ sở, ta có cách tính các điểm như sau (với currentArg là các góc tương ứng với các trục )

Ta được kết quả. 
![](https://images.viblo.asia/0d177509-3302-4cfa-9639-fa9c720b85c7.png)

Source code tham khảo 

```
//
//  ViewController.swift
//  RadaChart
//
//  Created by Dat Le Anh on 11/27/18.
//  Copyright © 2018 Dat Le Anh. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

@IBDesignable
class CustomView: UIView {
    let numberofAxis = 6
    let maxLength: CGFloat = 100
    
    override func draw(_ rect: CGRect) {
        super.draw(rect)
        drawAxis()
        drawStandardCircle()
        drawValuePolygon()
    }
    
    func drawAxis() {
        let width = frame.width/2
        let height = frame.height/2
        
        let centerPoint = CGPoint(x: frame.width/2, y: frame.height/2)
        for i in 0...numberofAxis {
            let ratio = CGFloat(i) / CGFloat(numberofAxis)
            let axisPath = UIBezierPath()
            axisPath.move(to: centerPoint)
            let currentArg: CGFloat = (2 * .pi) * ratio + 3 * .pi / 2
            let maxPoint = CGPoint(x: width + maxLength * cos(currentArg),
                                   y: height + maxLength * sin(currentArg))
            axisPath.addLine(to: maxPoint)
            axisPath.lineWidth = 1
            UIColor.black.setStroke()
            axisPath.stroke()
        }
    }
    
    func drawStandardCircle() {
        let centerPoint = CGPoint(x: frame.width/2, y: frame.height/2)

        for i in 5...10 {
            let circlePath = UIBezierPath()
            circlePath.addArc(withCenter: centerPoint,
                              radius: CGFloat(i) * maxLength / 10 ,
                              startAngle: 0,
                              endAngle: 2 * .pi,
                              clockwise: true)
            UIColor.gray.setStroke()
            circlePath.stroke()
        }
    }
    
    func drawValuePolygon() {
        let width = frame.width/2
        let height = frame.height/2
        
        let polygonPath = UIBezierPath()
        for i in 0...numberofAxis {
            let ratio = CGFloat(i) / CGFloat(numberofAxis)
            
            let currentArg: CGFloat = (2 * .pi) * ratio + 3 * .pi / 2
            let valuePoint = CGPoint(
                x: (width + (maxLength * cos(currentArg)) * 0.7),
                                     y: (height + (maxLength * sin(currentArg)) * 0.7)
            )
            
            if i == 0 {
                polygonPath.move(to: valuePoint)
            } else {
                polygonPath.addLine(to: valuePoint)
            }
            
            polygonPath.lineWidth = 1
            UIColor.blue.setStroke()
            polygonPath.stroke()
            UIColor.purple.withAlphaComponent(0.2).setFill()
            polygonPath.fill()
        }
    }
}
```

### Kết luận
Đến đây, bạn gần như nắm được các kiến thức cơ bản để vẽ các hình bằng UIBezierPath(). Một số kiến thức cần nắm

 - Vẽ đường thẳng
 - Vẽ đường cong
 - Vẽ đa giác
 - Hiểu được cách tính góc trong hệ trục toạ độ (Decartes, hệ trục của ios)
 - Cách dời hệ trục toạ độ về tâm của view.
 
 Trong bài sau mình sẽ hướng dẫn một level cao hơn để có thể vẽ được các hình có các đường cong phức tạp hơn. Ví dụ như chú chim này
 ![](https://images.viblo.asia/45c22117-0d45-4b58-9047-862a72eaca49.png)
 
 Part 2: https://viblo.asia/p/ios-core-graphics-ung-dung-cg-de-ve-logo-swift-3Q75wQWJZWb