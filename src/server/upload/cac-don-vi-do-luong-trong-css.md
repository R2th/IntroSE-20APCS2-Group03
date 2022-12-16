### Giới thiệu
### 

Trong CSS có hỗ trợ cho chúng ta rất nhiều các đơn vị đo độ dài để áp dụng vào trong các thuộc tính cần đến nó như: width, height, margin, ...

- Tuy nhiên các bạn cần chú ý một số điều sau khi sử dụng nó:

* Không được chứa khoảng trắng ở giữa các con số trong đơn vị đo. VD: 10px (đúng), 1 0 px (sai).
* Nếu như đơn vị bằng không thì bạn không cần phải thêm đơn vị vào phía sau.

### Các đơn vị đo

**Đơn vị đo tương đối.**

- Đơn vị đo tương đối là đơn vị đo thường được phụ thuộc vào 1 thành phần nào đó thì mới xác định được giá trị của nó. Trong các giá trị đo dưới đây thì các bạn cần chú trọng đến các đơn vị đo là **em, rem, vh, vw và %**, còn lại các đơn vị đo khác thì ít sử dụng hơn.

**em**: 1em = với kích cỡ của font hiện tại (font-size). Tương tự ta có 2em= 2 lần font,... 

**ex**: 1ex = với chiều cao của 1 chữ x (in thường) của font hiện tại 

**ch**: 1ch = chiều rộng của số 0

**rem**: giá trị tương đối với font của thành phần gốc

**vw**: 1vw = 1% của chiều rộng cửa sổ khung hình

**vh**: 1vh = 1% của chiều cao cửa sổ khung hình

**vmin**: 1vmin = 1% của khung nhìn nhỏ nhất

**vmax**: 1vmax = 1% của khung nhìn nhỏ nhất

**%**: 	Xác định một đơn vị đo theo phần trăm liên quan đến một giá trị khác, thường là một phần tử bao quanh.

**Đơn vị đo tuyệt đối.**

- Đơn vị đo tuyệt đối là đơn vị đo mà giá trị của nó đã được xác định sẵn rồi, nó sẽ không thay đổi hay phụ thuộc vào 1 thành phần khác. Trong các thành phần phía dưới thì mọi ngườicần chú ý đến đơn vị **px, pt** , còn lại những đơn vị khác thì ít sử dụng hơn.

**cm**: centimeters

**mm**: millimeters

**in**: inches (1in = 96px = 2.54cm)

**px**: pixels (1px = 1/96th of 1in)

**pt**: points (1pt = 1/72 of 1in)

**pc**: picas (1pc = 12 pt)

### Trình duyệt hỗ trợ.

![](https://images.viblo.asia/801705a7-82d5-46b4-a71e-674dea937fab.png)https://images.viblo.asia/801705a7-82d5-46b4-a71e-674dea937fab.png

### Tổng kết:

- Trong CSS hỗ trợ chúng ta rất nhiều các đơn vị đo và dựa vào đó mọi người có thể chọn ra đơn vị đo phù hợp nhất với dự án của mình!.