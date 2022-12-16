![](https://images.viblo.asia/d1c1fdbe-d1b8-4912-affe-b071f5840845.jpeg)
Có 2 cách xây dựng giao diện trên các ứng dụng iOS : dùng Interface Builder (Xib, Storyboard) và dùng code thuần. Việc auto-layout, kéo thả trong Interface Builder rất dễ dàng cho những developer mới tiếp cận, nhưng bên cạnh đó có những nhược điểm sau:

   * Việc kéo thả sẽ trở nên khó khăn đối với các giao diện phức tạp.
    * Thời gian compile tăng.
     * Dễ bị conflit code với người khác khi làm task trên cùng 1 storyboard.
    * Không có tính tái sử dụng.
Còn việc code thuần giao diện với các API apple đã hỗ trợ sẵn rất phức tạp và không thân thiện với những người mới tiếp cận.
Hôm nay mình sẽ giới thiệu với các bạn một thư viện giúp việc code giao diện trở nên dễ dàng và rõ ràng xúc tích hơn : [Stevia](https://github.com/freshOS/Stevia)

### Tại sao là Stevia?
* Với Stevia việc viết code auto-layout sẽ trở nên ngắn gọn và dễ hiểu.
* Giảm thời gian bảo trì cho dự án.
* Styles kiểu CSS rất thân thuộc với hầu hết mọi người.

### Usage:
Sử dụng Podfile
```
target ‘ProjectName’ do
pod ‘Stevia’
end
```

### Auto Layout

![](https://images.viblo.asia/6d3447d7-9d41-4bb0-afd5-8c98a800de7f.png)

Với giao diện như form login trên.

* Autou layout với native code:

```swift
        email.translatesAutoresizingMaskIntoConstraints = false
        password.translatesAutoresizingMaskIntoConstraints = false
        login.translatesAutoresizingMaskIntoConstraints = false
        addSubview(email)
        addSubview(password)
        addSubview(login)
        
        // Layout (using latest layoutAnchors)
        email.topAnchor.constraint(equalTo: topAnchor, constant: 100).isActive = true
        email.leftAnchor.constraint(equalTo: leftAnchor, constant: 8).isActive = true
        email.rightAnchor.constraint(equalTo: rightAnchor, constant: -8).isActive = true
        email.heightAnchor.constraint(equalToConstant: 80).isActive = true
        
        password.topAnchor.constraint(equalTo: email.bottomAnchor, constant: 8).isActive = true
        password.leftAnchor.constraint(equalTo: leftAnchor, constant: 8).isActive = true
        password.rightAnchor.constraint(equalTo: rightAnchor, constant: -8).isActive = true
        password.heightAnchor.constraint(equalToConstant: 80).isActive = true
        
        login.bottomAnchor.constraint(equalTo: bottomAnchor, constant: 0).isActive = true
        login.leftAnchor.constraint(equalTo: leftAnchor).isActive = true
        login.rightAnchor.constraint(equalTo: rightAnchor).isActive = true
        login.heightAnchor.constraint(equalToConstant: 80).isActive = true
```

**Với Stevia** có 3 phong cách auto-layout như sau:
* Type-safe visual format
```swift
    //add subviews
    sv(
         email,
         password,
         login
      )
        
    layout(
            100,
            |-email-| ~ 80,
            8,
            |-password-| ~ 80,
            "",
            |login| ~ 80,
            0
        )
```

* ⛓ Chainable api

```swift
      //add subviews
      sv(
         email,
         password,
         login
        )
        
        email.top(100).fillHorizontally(m: 8).height(80)
        password.Top == email.Bottom + 8
        password.fillHorizontally(m: 8).height(80)
        login.bottom(0).fillHorizontally().height(80)
```

*  📐 Equation based layout
```swift
        //add subviews
        sv(
         email,
         password,
         login
        )
        
        email.Top == Top + 100
        email.Left == Left + 8
        email.Right == Right - 8
        email.Height == 80

        password.Top == email.Bottom + 8
        password.Left == Left + 8
        password.Right == Right - 8
        password.Height == 80

        password.Top == email.Bottom + 8
        password.Left == Left + 8
        password.Right == Right - 8
        password.Height == 80

        login.Left == Left
        login.Right == Right
        login.Bottom == Bottom
        login.Height == 80
```

Ngoài ra **Stevia** còn cung cấp rất nhiều thuộc tính giúp cho việc code layout trở nên dễ dàng hơn, các bạn có thể xem docs tại đây: http://freshos.org/SteviaDocs/

### Kết
Như các bạn thấy ở trên thì code giao diện với **Stevia** trở nên ngắn gọn dễ hiểu và vui hơn so với code layout "native".  Hi vọng các bạn sẽ tìm được một phương pháp mới tốt hơn để thiết kế giao diện trong ứng dụng iOS đơn giản và hiệu quả hơn. Cảm ơn các bạn đã theo dõi.