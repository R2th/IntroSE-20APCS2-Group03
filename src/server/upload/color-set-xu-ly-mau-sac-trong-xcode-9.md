- Bạn có gặp ức chế khi làm việc với màu sắc trên Storyboard?
- Bạn có gặp phải project tuỳ hứng đổi màu sắc như thay áo?
- Bạn có gặp phải khó khăn khi đồng bộ màu sắc trong code với trong storyboard (xib nữa)

Xcode 9 đã cung cấp thêm 1 công cụ mới giúp chúng ta quản lý màu sắc: Color Set (trong Assets.xcassets), giúp chúng ta giải quyết triệt để những vấn đề nêu trên.

# Các tạo Color Set
**Bước 1**: Trong Project navigator, Chọn **Assets.xcassets**:

![](https://images.viblo.asia/e7648f8f-9135-47f6-9922-106d99c365e1.png)



**Bước 2**: Click chuột phải vào trong vùng chứa danh sách hình của **Assets.xcassets** và chọn **New Color Set**
![](https://images.viblo.asia/96018747-15d1-49ef-8de7-93e7c992007b.png)

Sau khi chọn 'New Color Set' sẽ xuất hiện thêm 1 asset color mới như hình sau:
![](https://images.viblo.asia/dc58c8df-6bb5-4509-aeb7-f04657ba37be.png)

**Bước 3**: Chỉnh màu
Sau đó chọn vào màu vừa tạo:
![](https://images.viblo.asia/00e5ce5b-d007-4cc2-987e-b8b6e9f26265.png)



Ở mục **Color** trong **Attributes Inspector** bạn có thể chọn màu cho color vừa tạo:

![](https://images.viblo.asia/5685aecb-c58d-4193-93e3-12f786537b72.png)



Ở mục Input Method bạn có thể đổi thành Hexa code, hay đưa về dạng mã màu từ 0 -> 255, hoặc mà từ 0 -> 1

Tất nhiên bạn có thể đổi tên của màu như đổi tên ảnh ý :D

Trong project demo của mình, mình đã tạo các Color như hình dưới dây:
![](https://images.viblo.asia/efb2959c-1d0e-454e-817d-8782b51b03f0.png)



# Cách sử dụng Color Set
### Trong storyboard hoặc xib
Sau khi đã tạo color set. Khi chọn màu cho view, bạn sẽ thấy xuất hiện thêm mục: **Named Colors** trong đó là những Color Set mà mình đã tạo ở trên:

![](https://images.viblo.asia/c214c660-599b-43f2-bd01-140256baa305.png)

YEAH!!! Vậy là chúng ta có thể dễ dàng chọn 1 màu sắc tuỳ ý trên storyboard. Nếu muốn đổi màu cho toàn bộ view đang sử dụng màu đó, bạn chỉ cần vào lại Assets.xcassets để đổi màu cho nó là được.

### Trong code
Để sử dụng Color set trong code thì cũng rất dễ dàng:
```
view.backgroundColor = UIColor(named: “backgroundColor”)
```
Nhưng việc paste cả string tên vào code thế kia thực sử cùi bắp đúng không? Để cải thiện code bạn có thể tạo 1 enum để quản lý những Color Set mà bạn đã tạo:
```
enum ColorSet: String {
    case backgroundColor
    case detailTextColor
    case mainColor
    case titleHeaderColor

    var color: UIColor {
        guard let color = UIColor(named: self.rawValue) else {
            fatalError("Invalid Color Set name")
        }
        return color
    }
}
```

Sau đó khi  dùng bạn có thể gọi như sau
```
view.backgroundColor = ColorSet.backgroundColor.color
```

Thật thú vị phải không nào? :D

# Kết luận
Việc sử dụng Color Set giúp bạn có thể quản lý màu sắc của app dễ dàng hơn. Có tính tuỳ biến tốt, có thể dùng chung cho cả Storyboard và trong Code.


**Tài liệu tham khảo:**
- https://medium.com/@vinbhai4u/the-power-of-color-sets-in-xcode-9-8a2e3ff7157f