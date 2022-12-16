### Giới thiệu
Hôm nay xin giới thiệu với Anh Em cách làm 1 cái sidebar menu đơn giản với hamburger đóng mở chỉ với HTML vs CSS thôi. Bình thường khi chúng ta code sidebar đóng mở chúng ta sẽ thường dùng JS để thực hiện việc này tuy nhiên với mẹo này sẽ giúp các bạn tiết kiệm được thời gian đấy. Cùng xem ví dụ dưới đây nhé.

![](https://images.viblo.asia/4dd77071-6473-440c-9f73-bbdeb6f7dc43.png)


###  Cách làm
**HTML**
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Side Navbar</title>
</head>
<body>
    <nav>
        <input type="checkbox" name="open" id="open">
        <label for="open" class="open">
            <i class="fas fa-bars"></i>
        </label>
        <div class="menu">
            <div class="logo">
                <a href="#">
                    <img src="logo.png" alt="">
                </a>
            </div>
          <ul>
              <li>
                  <a href="#">
                      <span><i class="fas fa-home"></i></span>
                      Home
                  </a>
              </li>
              <li>
                  <a href="#">
                      <span><i class="fas fa-address-card"></i></span>
                      About
                  </a>
              </li>
              <li>
                  <a href="#">
                      <span><i class="fas fa-cog"></i></span>
                      Settings
                  </a>
              </li>
              <li>
                  <a href="#">
                      <span><i class="fas fa-address-book"></i></span>
                      Contact
                  </a>
              </li>
              <li>
                  <a href="#">
                      <span><i class="fas fa-comments-alt-dollar"></i></span>
                      Feedback
                  </a>
              </li>
          </ul>
        </div>
    </nav>
</body>
</html>
```
**CSS**
```CSS
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}
body{
    overflow: hidden;
    font-family: sans-serif; 
    background-color: #387b6a;
    height: 100vh;  
}

.menu{
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 250px;
    padding-top: 60px;
    background-color: #212121; 
    transition: 0.5s;
    transform: translateX(-250px);
}
.logo a{
    padding: 15px 25px;
    font-size: 40px;
    text-transform: uppercase;
    color: white;
    /*margin-left: 5px*/
}
.logo a img{
    max-width:140px;
    border-radius: 50%;
    margin-bottom: 10px;
}
ul li{
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    transition: 0.3s;
    /*text-align: center;*/
    padding-left: 25px;
}
ul li:hover{
    padding-left: 35px;
    background-color: #445665;
}
ul li a{
    display: block;
    color: #fff;
    padding: 20px;
    text-transform: uppercase;
    font-weight: bold;
}

#open{
    display: none;
}
.open{
    height: 80px
    width: 80px;
    /*position: absolute;*/
    /*background-color: #000;*/
}
.open i{
    font-size: 25px;
    cursor: pointer;
    margin-left: 25px;
    margin-top: 25px;
    background-color: #000;
    padding: 15px 15px;
    color: white;
    z-index: 99;
}
#open:checked ~ .menu{
    transition: 0.5s;
    transform: translateX(0);
}
#open:checked ~ .open i{
    transition: 0.5s;
    margin-left: 190px;
    position: absolute;
}
```

**Demo**

Ví dụ các bạn có thể xem ở đây nhé<br>
https://codepen.io/Truelove/pen/oNwMJzd

### Lời kết
Như vậy chỉ 1 mẹo nhỏ CSS thôi là chúng ta có thể làm được sidebar menu với mỗi HTML vs CSS mà không cần động chạm gì tới JS rất là đơn giản. Hi vọng bài viết sẽ có ích cho các bạn Frontend mới nhé.
Cảm ơn các bạn đã đọc bài!