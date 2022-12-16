> **C**hắc hẳn bug xuất hiện khi một thuộc tính css không được hỗ trợ trên một trình duyệt nào đó là điều không thể tránh khỏi khi mà hiện nay sử dụng css3 rất nhiều trong một bộ phận người dùng vẫn cố chấp sử dụng những trình duyệt họ thích hay những phiên bản cũ kĩ. Sử dụng @supports giúp ta kiểm tra sự hỗ trợ của trình duyệt đối với thuộc tính css để đưa ra phương án giả quyết tốt.

### Cú pháp
```
@supports(property:value) {
	/* styles */
}

property:value # Đây chính là thuộc tính css cần kiểm tra
```
- Giả sử ta muốn kiểm tra thuộc tính 'display: flex' trong việc hỗ trợ trên trình duyêt.

```
@supports(display: flex) {
	.class {
        display: flex;
       align-items: center;     #đây là các thuộc tính được sử dụng nếu trình duyết hộ trợ 'display: flex'
      justify-content: center;
    }
}
```

### Sử dung 'not' keyword
- Giúp ta muốn thực hiện phương án css khác nếu trình duyệt không hỗ trợ thuộc tính đang dùng.
 Cú pháp
```
@supports not (property:value) {
	# style thay thế nếu brower không hỗ trợ
}

```

- Example
```
@supports not (display: flex) {
	.class {
       float: left;
    } 
}

# Sử dụng thuộc tính 'float: left' nếu flex không được hỗ trợ trên trình duyệt.

```

### Kiểm tra một lúc nhiều thuộc tính
- Sử dụng 'or', 'and' để kiểm tra

+ Sử dụng OR
```
# OR
@supports (display: -webkit-flex) or
          (display: -moz-flex) or
          (display: flex) {
        # styles 
 }

```

+ Sử dụng AND
```
# AND
@supports (display: flex) and (-webkit-appearance: menulist) {
	# Sử dụng style
}

```

+ Ta có thể sử dụng cả OR và AND
```
# OR và AND
@supports ((display: -webkit-flex) or
          (display: -moz-flex) or
          (display: flex)) and (-webkit-appearance: menulist) {

    # Sử dụng style
}

```

### CSS.supports trong javascript

Cũng giống như trong css,, trong Javascript ta cũng cần truyền vào thuộc tính cho nó

- Thuộc tính đơn
```

var checkFlex = CSS.supports('display', 'flex);

```

- Nhiều thuộc tính với OR, AND
```
var checkFlexAndAppearance = CSS.supports("(display: flex) and (-webkit-appearance: menulist)");

```

### Example
- Ta lấy một ví dụ sử dụng @supports với phần menu:

```
  .menulist {
      float: left; # Thuộc tính mặc định
  }

@supports (display: -webkit-flex) or
          (display: -moz-flex) or
          (display: flex) {
    .menulist {
        display: -webkit-flex; # thuộc tính nếu trình duyệt hộ trợ flex
        display: -moz-flex;
    	display: flex;
    	float: none;
    }
}
```

### Link tham khảo
https://developer.mozilla.org/en-US/docs/Web/CSS/@supports