Trong quá trình phát triển ứng dụng ios, chắc hẳn chúng ta thường xuyên phải làm việc với việc tạo giao diện của ứng dụng. Một ứng dụng có thể có một vài chỗ sử dụng lại UI đã được tạo sẵn trước đó. Trong bài viết này, mình sẽ chỉ ra cách mà mình đã dùng để tạo ra CustomView để tái sử dụng code UI và preview nó trên  Interface Builder thay vì phải build app lên mới có thể thấy được UI.
Đây là hình ảnh preview customview trên  Interface Builder:
![](https://images.viblo.asia/51ea4ef0-27a2-464a-8096-10b90692860b.png)

### Tạo project
Mình sẽ bắt đầu với Single View App và đặt tên cho nó là CustomView
 ![](https://images.viblo.asia/2f022947-9559-4b46-b02a-046609ee1c3c.png)
### Tạo CustomView.xib
Tiếp theo, mình sẽ tạo một file xib, một file .swift và đặt tên cho chúng là CustomView.
Trong file CustomView.xib mình sẽ layout UI mà mình dùng để tái sử dụng trong các màn hình khác. Ngoài ra, trong file xib, mình sẽ thêm tên của file Swift đã tạo trước đó vào phần File's Owner như hình dưới đây. 
![](https://images.viblo.asia/21f3a06c-fd2d-4b0a-83a3-823bc101413e.png)
#### Sử dụng func prepareForInterfaceBuilder và @IBDesignable trong file CustomView.swift
Theo như apple nói thì 
> Called when a designable object is created in Interface Builder.
```
override func prepareForInterfaceBuilder() {
        super.prepareForInterfaceBuilder()
        setup()
        contentView?.prepareForInterfaceBuilder()
    }
```

Khi CustomView được tạo trên Storyboard thì sẽ chạy vào trong func prepareForInterfaceBuilder
Chúng ta cần tạo một func để load view from file xib và update lên view.
```
func setup() {
        guard let view = loadViewFromNib() else { return }
        view.frame = bounds
        view.autoresizingMask =
            [.flexibleWidth, .flexibleHeight]
        addSubview(view)
        contentView = view
    }
```
```
func loadViewFromNib() -> UIView? {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: "CustomView", bundle: bundle)
        return nib.instantiate(
            withOwner: self,
            options: nil).first as? UIView
    }
```

Và dưới đây là đoạn code đầy đủ của file CustomView.swift
```
//
//  CustomView.swift
//  CustomView
//
//  Created by khuat.van.dung on 8/21/18.
//  Copyright © 2018 khuat.van.dung. All rights reserved.
//

import UIKit

@IBDesignable
class CustomView: UIView {
    
    var contentView : UIView?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        setup()
    }
    
    override func prepareForInterfaceBuilder() {
        super.prepareForInterfaceBuilder()
        setup()
        contentView?.prepareForInterfaceBuilder()
    }
    
    func setup() {
        guard let view = loadViewFromNib() else { return }
        view.frame = bounds
        view.autoresizingMask =
            [.flexibleWidth, .flexibleHeight]
        addSubview(view)
        contentView = view
    }
    
    func loadViewFromNib() -> UIView? {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: "CustomView", bundle: bundle)
        return nib.instantiate(
            withOwner: self,
            options: nil).first as? UIView
    }
}

```


### Mở storyboard và sử dụng CustomView
Tiếp theo mở file storyboard lên, kéo một UIView vào ViewController sau đó gán cho class của UIView đó là : CustomView
Và đây là kết quả:
![](https://images.viblo.asia/58a3563c-de9c-44dc-9faf-ce87027fd11b.png)

Github Sample: https://github.com/dungkv95/CustomView