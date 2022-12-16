### Giới thiệu
Xin chào các bạn, hôm nọ mình có hỗ trợ đồng nghiệp xử lý cái bug trên iPhone, nên mình viết bài này để các bạn gặp lỗi tương tự có thể tham khảo để sử dụng. Hãy xem nội dung phía dưới nhé

### Nội dung lỗi
Dev sử dụng thuộc tính **vh** để set chiều cao cho element, cụ thể dạng như sau:
```
.full-height {
    height: 100vh;
}
```
Mục đích là muốn cho class **full-height** có chiều cao là 100% màn hình, tuy nhiên trên thiết bị iOS thì kết quả không được như ý, cụ thể là chiều cao của box **full-height** này lại lớn hơn màn hình thực tế.

Nguyên nhân là do iOS tính cả Browser top bar và Browser bottom bar, như phép toán và hình bên dưới:

**top bar + document + bottom bar = 100vh**

![](https://images.viblo.asia/9b4cf4a5-7b3a-45f2-8305-cc4c4521596b.jpeg)

Vì thế để xử lý lỗi này chúng ta không set chiều cao là **100vh** được mà phải dùng giải pháp khác.

### Giải pháp
Cách mình đã dùng là mình sử dụng **JS** để lấy chiều cao của màn hình (trừ đi top bar và bottom bar), sau đó các phần cần full-height thì mình sẽ set cho giá trị chiều cao này, cụ thể như sau.

**Dùng JS để set giá trị cho biết window-height**
```
const windowHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--window-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', windowHeight);
windowHeight();
```

Ở đây mình tạo funciton **windowHeight** để set thuộc tính **--window-height** cho document bằng giá trị chiều cao của màn hình mà mình cần, khi thay đổi kích thước màn hình thì sẽ chạy lại function này để cập nhật giá trị chiều cao mới nhất.

**Set giá trị trong CSS**
Khi set giá trị cho thuộc tính **--window-height**, đồng nghĩa với việc đã định nghĩa một biến của CSS là biến **--window-height** và có giá trị là chiều cao của màn hình.

Khi đó chúng ta sử dụng như sau:
```
.full-height {
    height: var(--window-height);
}
```

Nếu bạn chưa rõ về **CSS Variables** thì có thể đọc ở [W3School CSS Variables](https://www.w3schools.com/css/css3_variables.asp)

Tuy nhiên có một hạn chế là CSS Variable không hoạt động trên tất cả trình duyệt, theo [caniuse.com](https://caniuse.com/css-variables) thì hỗ trợ những trình duyệt với các version như ảnh sau:

![](https://images.viblo.asia/6cae7ac5-8af5-4575-8203-df14f0613afd.png)

Do đó ta cần fallback cho những trình duyệt không hỗ trợ, cụ thể như sau:
```
.full-height {
    height: 100vh;
    height: var(--window-height);
}
```
Chúng ta sẽ set thuộc tính **height: 100vh** trước, và thuộc tính **height: var(--window-height)** ở phía dưới, nếu các trình duyệt hỗ trợ thì sẽ ăn theo cái biến **--window-height**, còn không thì sẽ ăn theo **100vh**, mà chỉ có trình duyệt IE và Opera không hỗ trợ, khi đó nó lại hoạt động tốt với **100vh**.

### Kết luận
Bài viết này là case study thực tế mà mình đã gặp, hi vọng nó có thể giúp các bạn gặp lỗi tương tự.