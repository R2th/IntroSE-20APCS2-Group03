SnapKit là tool giúp bạn có thể sử dụng autolayout bằng cách sử dung constraint 1 cách rất dễ dàng.
Bằng cách sử dụng Snapkit, bạn có thể tạo, update, remove, quản lý các contraint của view đơn giản.

# Cài đặt
CocoaPods:
```
source 'https://github.com/CocoaPods/Specs.git'
platform :ios, '10.0'
use_frameworks!

target '<Your Target Name>' do
    pod 'SnapKit', '~> 4.0.0'
end
```

# Cách sử dụng
Đoạn code trên sẽ add constraint của box so với superview offset là 20.

```
let box = UIView()
superview.addSubview(box)

box.snp.makeConstraints { (make) -> Void in
    make.top.equalTo(superview).offset(20)
    make.left.equalTo(superview).offset(20)
    make.bottom.equalTo(superview).offset(-20)
    make.right.equalTo(superview).offset(-20)
}
```

## References
Bất cứ khi nào bạn cần keep references của constrait bạn có thể sử dụng như sau:

```
var topConstraint: Constraint? = nil

// when making constraints
view1.snp.makeConstraints { (make) -> Void in
  self.topConstraint = make.top.equalTo(superview).offset(padding.top).constraint
  make.left.equalTo(superview).offset(padding.left)
}

...
// then later you can call
self.topConstraint.uninstall()

// or if you want to update the constraint
self.topConstraint.updateOffset(5)
```

## snp.updateConstraints
snp.makeConstraints tạo constraint, và snp.updateConstraints sẽ update constrain value cho bạn.
```
 self.growingButton.snp.updateConstraints { (make) -> Void in
        make.center.equalTo(self);
        make.width.equalTo(self.buttonSize.width).priority(250)
        make.height.equalTo(self.buttonSize.height).priority(250)
        make.width.lessThanOrEqualTo(self)
        make.height.lessThanOrEqualTo(self)
    }
```

## snp.remakeConstraints
- tương tư như snp.makeConstraints nhưng snp.remakeConstraints sẽ remove toàn bộ constraits rồi mới tạo mới.
```
self.button.snp.remakeConstraints { (make) -> Void in 
    make.size.equalTo(self.buttonSize)

    if topLeft {
      make.top.left.equalTo(10)
    } else {
      make.bottom.equalTo(self.view).offset(-10)
      make.right.equalTo(self.view).offset(-10)
    }
  }
```