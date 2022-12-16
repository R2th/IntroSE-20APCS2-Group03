## 1. Issue
Giả sử bạn có một phương thức để setup một chiếc xe đạp `Fixed Gear` như sau: 

![image.png](https://images.viblo.asia/0f28f125-58d5-4e07-84ee-0fcc1577ed50.png)

```Java
void buildBike() {
  setPedal();
  setRim();
  ...
}
```

Mọi thứ không có gì thay đổi cho đến một ngày đẹp trời công ty bạn thay đổi chiến lược kinh doanh và bắt đầu cho phép khách hàng đặt mua xe `Fixed Gear` với phanh được lắp sẵn. Nhận được thông tin đó, bạn quyết định mở rộng phương thức `buildBike()` bằng cách thêm tham số boolean `includeBrakes` để xác định hành vi của nó:
```Java
void buildBike(boolean includeBrakes) {
    if (includeBrakes) {
        // do something
    }
    ...
}
```

Đoạn code trên thoạt nhìn khá ổn, tuy nhiên vấn đề đã bắt đầu manh nha xuất hiện ở đây. Sẽ ra sao nếu công ty lại thay đổi chiến lược sản xuất những chiếc xe đẹp với những phụ kiện khác nhau đi kèm như bộ đề, đèn trước/sau, khung...?

Chả sao cả 😆😆😆, bạn nói. **Nếu vấn đề không được giải quyết bằng một tham số boolean thì có nghĩa rằng chúng ta cần nhiều biến boolean hơn**.
```Java
void buildBike(boolean includeBrakes, boolean includeGear, boolean inculdeLight, boolean includeFrame) {
    if (includeBrakes) {
        // do something
    }
    
    if (includeGear) {
        // do something
    }
    
    if (includeLight) {
        // do something
    }
    
    if (includeFrame) {
        // do something
    }
    ...
}
```

Và nếu khách hàng cần một chiếc xe đạp với chỉ duy nhất một phụ kiện là bộ phanh lắp sẵn thì bạn sẽ gọi phương thức `buildBike()` như thế này:
```Java
buildBike(true, false, false, false);
```

Đến đây mọi thứ đã sáng tỏ. Chúng ta dễ dàng nhận ra những vấn đề sau:
- Khó đọc và rối mắt (`low sematic`), không những trong phương thức mà cả khi gọi phương thức (Vi phạm **SOLID**). Với một số ngôn ngữ như `Python` thì khi nhìn qua biết tham số nào được gán là true hay false còn đỡ, nhưng đối với `Java` thì thật là không thể xác định được nếu bạn không nhớ tên và thứ tự các tham số truyền vào.
- Khó để tìm kiếm, `method hierachy` từ method này trở nên rất nhiều, bạn sẽ mất kha khá thời gian để xác định chỗ nào thì cái xe đạp có phanh, chỗ nào thì cái xe đạp có đèn...
- Khả năng độ phức tạp của phương thức sẽ tăng lên theo thời gian.
 
> If your function has 17 parameters, you are missing one.

## 2. Solution
Tuân thủ theo `Single Responsibility Principle` và `Open-Closed Principle` thì chúng ta sẽ viết lại đoạn code trên bằng cách tách ra nhiều phương thức nhỏ thực hiện tính năng độc lập.
```
buildBikeWithBrakes() {
...
}

buildBikeWithBrakesAndGear() {
...
}

...
```

Nếu có nhiều hơn 4 hay 5 options thì việc viết method sẽ quá dài, lúc đó việc cân nhắc chuyển sang dùng builder pattern cũng là một lựa chọn tốt.
Bạn có thể sử dụng `enum` như một lựa chọn thay thế, nhưng đối với mình thì việc tách method vẫn dễ đọc và rõ ràng hơn.
## References
- https://softwareengineering.stackexchange.com/questions/147977/is-it-wrong-to-use-a-boolean-parameter-to-determine-behavior
- https://viblo.asia/p/write-clean-code-why-not-RnB5p1PwKPG
- https://martinfowler.com/bliki/FlagArgument.html
- https://understandlegacycode.com/blog/what-is-wrong-with-boolean-parameters/
- [Boolean has a very low semantic](https://stackoverflow.com/questions/6107221/alternatives-to-passing-a-flag-into-a-method)