### Trong phần tiếp theo này mình xin giới thiệu với các bạn về NSLayoutAnchor để có thể sử dụng AutoLayout bằng code một cách dễ dàng.
### NSLayoutAnchor
**NSLayoutAnchor:**
* Cho phép sử dụng AutoLayout mà không cần tạo NSLayoutConstraint.
* Ngắn gọn và dễ hiểu hơn
* Dễ dàng sử dụng do cách dùng khá tương tự với việc AutoLayout trên Storyboard
## Ví dụ
### Ví dụ 1: 
Hãy bắt đầu với một ví dụ đơn giản: tạo view1 và view2 có cùng chiều cao

**C1: Sử dụng NSLayoutConstraint:**
```Swift
let constraint = NSLayoutConstraint(item: view1,
                                            attribute: .height,
                                            relatedBy: .equal,
                                            toItem: view2,
                                            attribute: .height,
                                            multiplier: 1.0,
                                            constant: 0)
```

**C2: Sử dụng NSLayoutAnchor**
```Swift
        view1.heightAnchor.constraint(equalTo: view2.heightAnchor, multiplier: 1).isActive = true
```
Qua ví dụ trên có thể thấy rõ các ưu điểm đã nêu ở trên của **NSLayoutAnchor**. Cách dùng cũng rất đơn giản, ở đây **heightAnchor** là: **NSLayoutDimension** chính là các thuộc tính sẽ được sử dụng để layout, ngoài heightAnchor ra có rất nhiều các thuộc tính khác( Chỉ cần ghõ view.anchor xCode sẽ suggest ra các thuộc tính).
### Ví dụ 2:
Tạo view1 có chiều dài 120, chiều cao 50 và nằm chính giữa màn hình
Các bước để thực hiện khá đơn giản, tạo view1, sử dụng NSLayoutAnchor để view1 có frame như mong đợi.

```Swift
let view1 = UIView()
        view1.backgroundColor = .red
        /// Add constraint
        view1.widthAnchor.constraint(equalToConstant: 120).isActive = true
        view1.heightAnchor.constraint(equalToConstant: 50).isActive = true
        view1.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        view1.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
    
        view.addSubview(view1)
```

Tuy nhiên khi chạy sẽ có lỗi: phần Add constraint đã được thực hiện trước khi view1 được add vào view, do đó ta sẽ sửa lại, để phần addSubview lên trước và chạy lại. Lần này không có lỗi nào xuất hiện tuy nhiên không hề thấy view1 ở giữa màn hình như mong đợi. Tại sao vậy???
Đây là một lỗi mà trước kia mình cũng mắc phải, lỗi này liên quan đến thuộc tính : **translatesAutoresizingMaskIntoConstraints** của view1. Hiểu đơn giản **AutoLayout** sẽ không có tác dụng khi thuộc tính này có giá trị "*true*". Khi view được tạo trên storyboard, giá trị mặc định của thuộc tính này sẽ là "*false*", tuy nhiên khi view1 được tạo bằng **UIVIew()**, giá trị này sẽ là true, do đó AutoLayout không có tác dụng nên view1 không hiện lên như mong đợi. Vậy hãy cùng set thuộc tình này về false bằng cách thêm dòng code dưới đây vào và chạy lại:
```Swift
        view1.translatesAutoresizingMaskIntoConstraints = false
```
Lúc này view1 đã ở vị trí đúng như mong đợi.
Qua bài viết này hy vọng các bạn có thể sử dụng **NSLayoutAnchor** và tránh gặp phải một số lỗi như ở ví dụ trên. 
Bài viết của mình xin được kết thúc tại đây, cảm ơn các bạn đã theo dõi!