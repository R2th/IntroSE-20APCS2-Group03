## Giới thiệu
Với dev FE thì chắc chắn là đã thao tác nhiều với các icon, trong các loại icon thì mình thích svg và icon-font, chứ dùng ảnh img thì sẽ bị vỡ khi kích thước thay đổi, ngoài ra svg và icon-font cũng có kích thước nhẹ hơn ảnh rất nhiều, cả bộ icon-font cả trăm cái có khi nặng chỉ bằng 1 cái img icon :v: trong khi svg thì có thể import trực tiếp vào code html. Cả svg và icon-font đều có thể css đổi màu, kích thước mà giữ nguyên độ nuột* của icon. Bài này mình sẽ giới thiệu cách tạo 1 bộ icon font rất đơn giản mà vui.

## Lý thuyết
Lý thuyết thì học hỏi từ fontawesome. Hẳn là ai cũng phải biết fontawesome rồi, các bạn có biết nó hoạt động như nào ko?
Cách sử dụng fontawesome là phải có 1 bộ icon-font đã, sau đó định nghĩa từng icon có content là gì ứng với font trong bộ font.
Ví dụ fontawesome có icon `<i class="fas fa-check-circle"></i>`, fas để xác định nó thuộc font-family: "Font Awesome 5 Pro", fa-check-circle để xác định nó có ::before với content là "\f058". Cái mã này đã có trong bộ font rồi, nên nó sẽ hiển thị ra icon.
![](https://images.viblo.asia/11a7d32f-f0aa-4505-b685-503b2e3b87ea.png)

Từ fontawesome thì mình sẽ làm 1 bộ tương tự: tạo 1 bộ font, định nghĩa class, css và gọi ra html.
Định nghĩa class và css thì dễ rồi, nhưng tạo bộ font như nào? Có vài cách nhưng bài này mình giới thiệu cách đơn giản nhất, lên trang fontello, drop icon svg vào và nó sẽ tạo thành icon font cho bạn, lưu ý là ko phải icon nào cũng convert đc, chỉ những icon dạng border đen thì convert dễ nhất. Tạo xong thì tải bộ font về thôi.

![](https://images.viblo.asia/d44a0757-7240-4411-83cb-da18b8dc222e.png)

![](https://images.viblo.asia/56318bcb-d956-4ad0-a427-2e34b44ab26c.png)


Đây là code:
```html:html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="custom.css">
</head>
<body>
  <p>
    Day la con Husky!
    <i class="d d-husky"></i>
  </p>
  <p>
    Day la con Husky mau xanh!
    <i class="d d-husky text-blue"></i>
  </p>
  <p>
    Day la con Husky to vai chuong!
    <i class="d d-husky font-3xl"></i>
  </p>
  <p>
    Day la con chuon chuon!
    <i class="d d-dragonfly"></i>
  </p>
</body>
</html>
```

```css:css
@font-face {
  font-family: 'My Icon Font';
  src: url('./fontello.ttf');
}

.d {
  font-family: 'My Icon Font';
  font-style: normal;
}

.d-husky::after {
  content: '\E800';
}

.d-dragonfly::after {
  content: '\E801';
}

.text-blue {
  color: #2196F3;
}

.font-3xl {
  font-size: 99px;
}
```

Thành quả:
![](https://images.viblo.asia/37fca744-e72a-4db6-8beb-1d6e554314a4.png)

## Kết luận
Thật thú vị phải không? Hãy tự phát triển thêm nhé :v: