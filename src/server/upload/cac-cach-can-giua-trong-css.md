Trong quá trình làm giao diện chắc chắn chúng ta sẽ phải căn giữa một item nào đó trong giao diện, có rất nhiều cách để có thể căn giữa một item. Trong bài viết hôm nay mình sẽ chia sẻ mọi người 3 cách căn giữa, tùy vào từng trường hợp các bạn có thể áp dụng các cách khác nhau nhưng cứ cách nào đơn giản nhất thì các bạn hãy sử dụng

Đầu tiên ta sẽ sử dụng chung 1 file html như sau để tiến hành căn giữa trong cả 3 trường hợp
```PHP
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./main.css">
</head>
<body>
  <div class="box">
    <h3>Center me</h3>
  </div>
</body>
</html>
```
và file css main.css

```PHP
*{
  padding: 0;
  margin: 0;
}

.box {
  background-color: salmon;
  width: 100%;
  height: 300px;
}
```

![image.png](https://images.viblo.asia/d54e2f45-50ea-4a56-a563-40148466323b.png)
# Sử dụng line-height
Đầu tiên để căn giữa theo chiều ngang ta thêm thuộc tính `text-align: center` cho thẻ H3. Để có thể căn theo chiều dọc ta sẽ thêm thuộc tính `line-height: 300px` cho thẻ H3. Đối với chữ thì nó sẽ luôn luôn nằm giữa chiều cao của dòng chữ đó cho nên ta chỉ cần điều chỉnh chiều cao của dòng chữ đúng bằng với thẻ cha của nó thì chữ sẽ tự động được căn giữa theo chiều dọc ở đây box có chiều cao là 300px nên tao set line-height của H3 bằng 300px ta được kết quả
```PHP
h3 {
  text-align: center;
  line-height: 300px;
}
```

![image.png](https://images.viblo.asia/abb666ab-0971-48b3-b379-38fd24920f55.png)
# Sử dụng Flexbox
Đề căn giữa sử dụng Flexbox ta cần set cho thẻ cho của thẻ ta cần căn giữa có thuộc tính `display: flex`, căn giữa theo chiều ngang ` justify-content: center;`, căn giữa theo chiều dọc  `align-items: center;`
ta cũng thu được kết quả tương tự
```PHP
.box {
  background-color: salmon;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

```
# Sử dụng position
Để căn giữa bằng positon thì đầu tiên thẻ cha của thẻ cần căn giữa phải có  `position: relative;`, thẻ con thì sẽ có  `position: absolute;`. Khi đó ta muốn căn giữa theo chiều ngang ta sẽ cho thẻ cho cách left 50% `left: 50%` khi đó thẻ con sẽ cách bên trái 50% nhưng ta muốn thẻ này phải nằm giữa của màn hình thì ta tiến hành lùi thẻ con lại 50% so với chiều cao của chính nó khi đó nó sẽ nằm giữa theo chiều ngang  ` transform: translateX(-50%);`. Đối với chiều dọc thì tương tự ta được 
```PHP

.box {
  background-color: salmon;
  width: 100%;
  height: 300px;
  position: relative;
}

h3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
  transform: translateY(-50%);
}

```
# Tổng kết
Đó là 3 cách căn giữa 1 item bên trong 1 item khác. Đa phần 3 cách này sẽ giải quyết được các trường hợp cần căn giữa. Các bạn có thể linh động tùy vào từng trường hợp mà lựa chọn cách phù hợp để căn giữa 1 item nào đó