![](https://images.viblo.asia/564c89ef-b5ab-49a2-8426-898b98b233c5.gif)

CSS Variables, một tính năng mới của CSS cho phép người dùng làm việc trực tiếp với biến trong stylesheeet mà không cần phải qua các bước thiết lập hay biên dịch nào. Về bản chất, CSS Variables cho phép bỏ qua các kiểu thiết lập style cũ như này:

```
h1 {  
  font-size: 30px;  
}

navbar > a {  
  font-size: 30px;  
}
```

...và thay thế bằng như này:

```
:root {  
  --base-font-size: 30px;  
}

h1 {  
  font-size: var(--base-font-size);  
}

navbar > a {  
  font-size: var(--base-font-size);  
}
```

Mặc dù cú pháp có vẻ hơn lạ, nhưng như vậy sẽ mang lại lợi ích là có thể thay đổi kích thước font chữ trên toàn bộ ứng dụng mà chỉ thông qua việc thay đổi biến *--base-font-size*


> Nếu muốn tìm hiểu thêm về CSS Variables, có thể tham khảo các bài học về CSS Variables [tại đây](https://scrimba.com/g/gcssvariables)

![](https://images.viblo.asia/91cde8d3-af09-44a1-a6fb-f0591af10de1.png)

Bây giờ hãy xem xét công nghệ mới này có thể giúp việc build một website responsive trở nên đơn giản hơn như thế nào.

Chúng ta cần làm responsive cho một website cá nhân như này:

![](https://images.viblo.asia/7fe3c45a-2cdf-43df-916d-20afbc1bd1c6.png)

Khi xem trên desktop, mọi thứ trông khá ổn. Nhưng nếu xem trên điện thoại thì các layout có gì đó sai sai:
![](https://images.viblo.asia/859b36a7-d454-4818-830e-68cb6f0034af.png)

Lẽ ra xem trên mobile phải như này mới đúng:
![](https://images.viblo.asia/d1a0510d-ab23-4722-9fba-290166ed6e3e.png)

Vậy phải làm sao để được nét như hình trên?
Cần thay đổi một chút về style để nó trông thuận mắt khi xem trên mobile. Và đây là kết quả:
* Sắp xếp lại grid để xếp chồng lên nhau thay vì để thành 2 columns.
* Dịch chuyển toàn bộ layout lên trên một chút.
* Thu nhỏ font chữ.

Để có kết quả như trên, thay đổi css như sau:

```
h1 {  
  font-size: 30px;  
}

#navbar {  
  margin: 30px 0;  
}

#navbar a {  
  font-size: 30px;  
}

.grid {  
  margin: 30px 0;  
  grid-template-columns: 200px 200px;  
}
```

Cụ thể hơn cần điều chỉnh bên trong *media query* như sau:

* Giảm font-size của h1 xuống 20px
* Giảm margin-top và margin-bottom của navbar xuống 15px
* Giảm font-size trong navbar xuống 20px
* Giảm margin-top của grid xuống 15px
* Thay đổi grid từ 2 columns thành 1 column

> Chú ý: Tất nhiên là css không thể ít như vậy, nếu muốn theo dõi rõ hơn có thể tham khảo bài học về CSS Variables  [tại đây](https://scrimba.com/g/gcssvariables)

**Theo cách làm cũ:**

```
@media all and (max-width: 450px) {  

  navbar {  
    margin: 15px 0;  
  }  

  navbar a {  
    font-size: 20px;  
  }  

  h1 {  
    font-size: 20px;  
  }

  .grid {  
    margin: 15px 0;  
    grid-template-columns: 200px;  
  }

}
```

**Theo cách mới:**

Giờ hãy nhìn xem CSS Variables đã giải quyết bài toán này như nào. Đầu tiên, lưu trữ lại các giá trị mà có thể sử dụng lại thường xuyên vào trong các biến như sau:

```
:root {  
  --base-font-size: 30px;  
  --columns: 200px 200px;  
  --base-margin: 30px;  
}

#navbar {  
  margin: var(--base-margin) 0;  
}

#navbar a {  
  font-size: var(--base-font-size);  
}

h1 {  
  font-size: var(--base-font-size);  
}

.grid {  
  margin: var(--base-margin) 0;  
  grid-template-columns: var(--columns);  
}
```

Khi setup xong như trên, chúng ta chỉ cần thay đổi giá trị các biến trong *media query* như sau:

```
@media all and (max-width: 450px) {  
  :root {  
    --columns: 200px;  
    --base-margin: 15px;  
    --base-font-size: 20px;  
}
```

Rõ ràng trông tường minh hơn nhiều so với cách cũ. Chúng ta chỉ cần target đến :root thay vì target đến các selectors như cách cũ.
Đây chỉ là một ví dụ đơn giản thôi. Khi áp dụng với một trang web với bộ css hoành tráng thì sẽ thấy nó tiện lợi như thế nào, chỉ cần thay đổi giá trị biến, thay vì làm một đống thao tác với các selectors phức tạp.

Và nhanh thôi, bạn sẽ trở thành một bậc thầy về CSS Variables :)

Link tham khảo [tại đây](https://dev.to/scrimba/how-to-make-responsiveness-super-simple-with-css-variables-1gnm)