Đây có lẽ sẽ là một vấn đề cơ bản và nó có thể được giải quyết trong một thời gian ngắn. Tuy nhiên sau một vài lần thử thì nó vẫn chưa được như ý muốn. Nhiều người lại quay sang sử dụng JS để giải quyết vấn đề này. Vì vậy ở bài viết lần này mình xin giới thiệu một vài cách sử dụng CSS để giải quyết vấn đề trên.
## Cách 1: Sử dụng flex
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .classParent {
      display: flex;
      flex-flow: column;
      height: 500px;
      width: 50%;
      margin: auto;
    }

    .childOne {
      background-color: green;
      color: #fff;
    }

    .childTwo {
      background-color: #DDDDDD;
      flex-grow : 1;
    }
  </style>
</head>
<body>
  <div class="classParent">
    <div class="childOne">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia architecto quaerat, laborum tempore ullam ab ea consequatur veniam ut explicabo cum quas libero repellat laboriosam aspernatur quae culpa nemo, odio.
    </div>
    <div class="childTwo">
        Thẻ div này sẽ dài hết chiều cao còn lại của parent.
    </div>
  </div>
</body>
</html>
```
Kết quả sẽ đạt được là:
![](https://images.viblo.asia/c3966e43-089c-4d4a-a0c5-ee07d2f3baf9.png)
Ưu điểm: Dễ thực hiện

Nhược điểm: một số trình duyệt không hỗ trợ
## Cách 2: Sử dụng position Absolute
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .classParent {
      height: 500px;
      width: 50%;
      margin:auto;
      position: relative;
    }

    .childOne {
      background-color: green;
      color: #fff;
      height: 100px;
    }

    .childTwo {
      background-color: #DDDDDD;
      position: absolute;
      top: 100px;
      bottom: 0;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="classParent">
    <div class="childOne">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia architecto quaerat, laborum tempore ullam ab ea consequatur veniam ut explicabo cum quas libero repellat laboriosam aspernatur quae culpa nemo, odio.
    </div>
    <div class="childTwo">
        Thẻ div này sẽ dài hết chiều cao còn lại của parent.
    </div>
  </div>
</body>
</html>
```
Kết quả là:
![](https://images.viblo.asia/648bbbf8-9618-4a44-9e57-8b8a9ce7f1cf.png)
Ưu điểm: dễ sử dụng

Nhược điểm: Bạn phải cố định chiều cao của childOne (không linh hoạt)
## Cách 3: Sử dụng Tables (display: table)
Bằng cách này chúng ta có thể phân phối không gian đã có trong các div con và gán chiều cao cố định cho một số phần tử, các phần tử khác sẽ kết thúc bằng chiều cao còn lại
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .classParent {
      display: table;
      height: 500px;
      width: 50%;
      margin:auto;
    }

    .childOne {
      background-color: green;
      color: #fff;
      display: table-row;
      height: 100px;
    }

    .childTwo {
      background-color: #DDDDDD;
      display: table-row;
    }
  </style>
</head>
<body>
  <div class="classParent">
    <div class="childOne">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia architecto quaerat, laborum tempore ullam ab ea consequatur veniam ut explicabo cum quas libero repellat laboriosam aspernatur quae culpa nemo, odio.
    </div>
    <div class="childTwo">
        Thẻ div này sẽ dài hết chiều cao còn lại của parent.
    </div>
  </div>
</body>
</html>
```
Kết quả là:
![](https://images.viblo.asia/648bbbf8-9618-4a44-9e57-8b8a9ce7f1cf.png)
Ưu điểm: Không cần fix height

Nhược điểm: Có thể gây ra một số tác dụng phụ với layout
## Cách 4: Sử dụng CSS3 calc
Cách này sử dụng hàm calc để gán chiều cao được tính từ tổng chiều cao trừ đi chiều cao của phần tử khác.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .classParent {
      height: 500px;
      width: 50%;
      margin:auto;
    }

    .childOne {
      background-color: green;
      color: #fff;
      height: 100px;
    }

    .childTwo {
      background-color: #DDDDDD;
      height: calc(100% - 100px);
    }
  </style>
</head>
<body>
  <div class="classParent">
    <div class="childOne">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia architecto quaerat, laborum tempore ullam ab ea consequatur veniam ut explicabo cum quas libero repellat laboriosam aspernatur quae culpa nemo, odio.
    </div>
    <div class="childTwo">
        Thẻ div này sẽ dài hết chiều cao còn lại của parent.
    </div>
  </div>
</body>
</html>
```
Kết quả: 
![](https://images.viblo.asia/648bbbf8-9618-4a44-9e57-8b8a9ce7f1cf.png)
Ưu điểm: dễ sử dụng

Nhược điểm: Một số trình duyệt không hỗ trợ, khó để maintain
## Kết luận
Như vậy mình cùng các bạn đã cùng nhau đi tìm hiểu về một số cách để cho một thẻ div con dài hết phần còn lại của thẻ div cha. Chúc các bạn học tập hiệu quả.