## 1. Tính đặc hiệu là gì?
Tính đặc hiệu (hay độ ưu tiên) là cách mà trình duyệt quyết định sẽ áp dụng thuộc tính css nào với một phần tử khi có nhiều quy tắc css cùng trỏ đến phần tử đó.
Tính đặc hiệu dựa trên các quy tắc phù hợp bao gồm các loại selector (bộ chọn) CSS khác nhau.
## 2. Sự phân cấp tính đặc hiệu
Mỗi selector đều có vị trí của nó trong hệ thống phân cấp. Độ đặc hiệu của selector có 4 mức (như hình):
![](https://images.viblo.asia/95e97d61-63d0-40cd-bb95-0812c927ebdc.png)
## 3. Làm sao để tính toán tính đặc hiệu?
Ta biểu diễn tương đối tính đặc hiệu của một selector như sau:
* 1-0-0-0: Inline styles
* 0-X-0-0: Số lượng ID selector
* 0-0-Y-0: Số lượng Classes, attributes và pseudo-classes
* 0-0-0-Z: Số lượng Elements and pseudo-elements
Xem xét ví dụ dưới đây:

| Selector | Thousands | Hundreds | Tens | Ones | Total specificity |
| -------- | -------- | -------- | -------- | -------- | -------- |
| h1     | 0     | 0     | 0     | 1     | 0001     |
| h1 + p::first-letter     | 0     | 0     | 0     | 3     | 0003     |
| li > a[href*="jav"] > .active    | 0     | 0     | 2     | 2     | 0022     |
| #identifier    | 0     | 1     | 0     | 0     | 0100     |
|Thuộc tính được viết trong style attribute    | 1     | 0     | 0     | 0     | 1000     |

Có một sự nhầm lẫn nhẹ thường thấy khi theo dõi bảng này. Xét trường hợp như sau:
```html:html:HTML
<div class="a1">
  <div class="a2">
    <div class="a3">
      <div class="a4">
        <div class="a5">
          <div class="a6">
            <div class="a7">
              <div class="a8">
                <div class="a9">
                  <div class="a10">
                    <div class="a11">
                      <div id="box">Age of Empires</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
```go:CSS
#box { color: blue }; // Độ đặc hiệu: 0100
.a1 > .a2 > .a3 > .a4 > .a5 > .a6 > .a7 > .a8 > .a9 > .a10 > .a11 { color: red }; // Độ đặc hiệu: 00(11)0
```
Kết quả thu được là màu xanh. Vì bản chất class chỉ có tính đặc hiệu ở hàng trăm (X-0-0). Dù cố lồng bao nhiêu class thì nó vẫn chỉ tác động đối với các bộ chọn có độ đặc hiệu bằng hoặc thấp hơn.

**Lưu ý:**
* Universal selector (*) và combinators selector (+, >, ~) không làm tăng tính đặc hiệu.
* :not(x): Negation selector (:not) không có giá trị, đối số (x) mới làm tăng tính đặc hiệu.
* Đừng lạm dụng inline styles và !important, hãy thương lấy chính mình sau này!
## 4. Tổng kết
Tính đặc hiệu cùng với bộ chọn là một trong những vấn đề quan trọng nhất của css. Nắm rõ điều này sẽ giúp chúng ta dễ dàng phát triển và bảo trì ứng dụng.

Tài liệu tham khảo:

[https://www.w3schools.com/css/css_specificity.asp ](https://www.w3schools.com/css/css_specificity.asp)<br>
[https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity ](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)