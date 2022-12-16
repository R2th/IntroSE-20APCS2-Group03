![](https://images.viblo.asia/c46e9ef0-4e13-475d-b64c-5209db1df03a.png)

Thuộc tính outline trong CSS khá thú vị và hiếm khi được sử dụng. Thông thường, chúng ta sẽ ghi đè hoặc set 0 hoặc không set giá trị nào hết cho outline. Nhưng có vẻ đó là một thiếu sót nếu chúng ta bỏ qua nó như vậy.

```
:focus {
    outline: -webkit-focus-ring-color auto 5px;
}
```

Có vẻ như outline trông gần giống như thuộc tính border, nên dễ gây hiểu lầm. Mặc dù hai thuộc tính này có thể khai báo các giá trị giống nhau, nhưng vẫn có vài điểm khác biệt nhất định.

- Sự khác biệt chính giữa hai thuộc tính này là outline không ảnh hưởng đến box model. Nghĩa là nó sẽ chỉ đơn thuần là một đường viền bao ngoài, không ảnh hưởng đến kích thước của box như border. Điều này khá hữu ích khi nó vẫn có thể đóng vai trò như một border những không làm ảnh hưởng đến design tổng thể.
- Không thể xác định được độ rộng khi sử dụng outline, và cũng không thể tạo một style cho nó hay mong muốn tạo một đường cong khi sử dụng như khi bọc viền cho một button chẳng hạn. 
- Có thể sử dụng thuộc tính offset trong outline. Điều này sẽ giúp tạo được nhiều giải pháp khá hay ho khi muốn style cho nó.

```
.btn.is-outline:focus {
    outline: 3px solid #2f3ffa;
    outline-offset: 2px;
}
```

- Không thể set outline theo nhiều góc cạnh. Không như border, chúng ta có thể set riêng border-left hay border-right chẳng hạn. Thì với outline chúng ta không làm được điều đó. Không có cái gọi là outline-top hay outline-right, chỉ có thể set outline duy nhất một lần cho tất cả.

Vậy thuộc tính này giúp ích được gì?

Thuộc tính này vẫn có tác dụng ở một vài trường hợp đơn giản hơn. Không nên bỏ qua nó chỉ vì nó không thể tạo ra các trạng thái style nổi bật.
Chúng ta có thể sử dụng các thuộc tính như outline-color, outline-width hay outline-style, sẽ tạo ra được các điểm độc đáo riêng. Khi gặp một trường hợp phức tạp, nên tìm nhiều giải pháp để có thể bao quát hết được mọi thứ.

Hãy xem ví dụ dưới đây, thay vì sử dụng box-shadow và pseudo class ::before, chúng ta có thể thấy việc sử dụng outline linh hoạt như thế nào.

{@embed: https://codepen.io/roselove/pen/vbwGPJ}

Với box-shadow, chúng ta cũng có thể set multiple offset cho nó. Nhưng sẽ không ổn lắm vì chúng ta không thể sử dụng color transparent giữa khoảng cách đường viền ngoài và phần button.

```
&.is-shadow-offset:focus {
    box-shadow: 0 0 0 2px #fff,
                0 0 0 4px #2f3ffa;
}
```

Khi sử dụng pseudo ::before, chúng ta có thể đạt được mục đích mong muốn, nhưng sẽ số dòng code sẽ dài hơn.

```
&.is-before {
    position: relative;
}
```

```
&.is-before:focus::before {
    content: '';
    height: calc(3rem + 4px);
    width: calc(100% + 4px);
    position: absolute;
    top: -4px;
    left: -4px;
    background: none;
    border-radius: 3rem;
    border: 2px solid #2f3ffa;
}
```

Bài viết được tham khảo [tại đây](https://pineco.de/css-quick-tip-using-outline/)