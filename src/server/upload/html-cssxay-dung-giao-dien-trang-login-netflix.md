Chào các bạn,

Tiếp theo bài viết về HTML & CSS cơ bản: https://viblo.asia/p/bai-1tim-hieu-ve-html-va-css-gAm5y7YDZdb.
Chúng ta sẽ đến với phần thực hành áp dụng những kiến thức đã tìm hiểu về HTML & CSS.

Trong bài này mình sẽ chia sẻ cách làm layout trang Login Netflix
![image.png](https://images.viblo.asia/585b6de4-3df9-44f9-b237-608a069f9051.png)

### 1. Yêu cầu kiến thức và các tool
Để làm được layout Login netflix các bạn phải nắm các kiến thức sau:
- Các thẻ HTML, CSS cơ bản
- Position CSS
- Flexbox CSS
Là một trong những cách giúp căn chỉnh phân chia không gian và vị trí của các item trong một vùng chứa- container một cách hiệu quả, dễ dàng.

Trong bài này mình sẽ sử dụng các tool:
- Visual studio code 
- ColorZilla extension để lấy mã màu trên website: https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en
- Page ruler redux để đo kích thước cách thành phần website:
https://chrome.google.com/webstore/detail/page-ruler-redux/giejhjebcalaheckengmchjekofhhmal?hl=en

### 2. Phân tích layout

- Trước khi bắt tay vào làm giao diện website ta phải trải qua bước phân tích layout. Khi đi làm thực tế thì front-end developer sẽ nhận file layout từ designer => lập trình viên front-end sẽ phân tích layout => bắt đầu code html & css.

- Để phân tích layout thì ta phải xem bố cục của layout gồm các phần nào: header, content, footer, slider, navarbar.... Có điểm gì đặc biệt không.

Phân tích layout trang Login của Netflix:
Layout gồm có 3 phần:
* Header chứa Logo chữ NetFlix in đậm ở góc trái.
* Content gồm có một popup chứa form login và các thông tin liên quan
* Cuối cùng là footer
* Layout này thuộc kiểu modal css. Gồm có một hình nền và một lớp phủ màu đen + popup form Login nội bật lên trên để nhập thông tin.

Tham khảo để biết modal csss là gì?https://www.w3schools.com/w3css/w3css_modal.asp#:~:text=A%20modal%20is%20a%20dialog,Open%20Modal

### 3. Xây dựng layout Login Netflix

- Tạo file index.html và style.css. Liên kết file style.css vào file index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Netflix</title>
</head>
<body>
</body>
</html>
```

- Tạo ra một thẻ div với class login-container chứa toàn bộ layout
```html
    <div class="login-container">
    </div>
```

- Bên trong sẽ chứa các division:  lớp phủ mờ, header, body và footer tương ứng với code bên dưới:
```html
    <div class="login-container">
        
         <div class="login-overlay">
        </div>
        
        <div class="login-header">
        </div>

        <div class="login-body">
            <!-- Form Login -->
        </div>

        <div class="login-footer"></div>
    </div>
```

- Thêm reset css giúp thiết lập các style của thành phần HTML theo 1 chuẩn nhất định.

```css
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
```

**Giải thích:** 

**Câu hỏi:** Giải thích code phần reset css?

Padding, margin có giá trị 0 giúp đưa padding, margin của border box css cho các phần tử html về 0. **So sánh khi có và không có reset css để thấy rõ sự khác biệt.**

box-sizing là thuộc tính css3, có giá trị border-box giúp giữ nguyên kích thước (width, height) của phần tử khi ta thêm padding, margin và border cho phần tử HTML.
Lúc này width = content + padding + border.
Khuyến khích sử dụng box-sizing: border-box để dễ tính toán kích thước phần tử trên website.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        p{
            width: 300px;
            height: 500px;
            background-color: paleturquoise;
            border: 5px solid green;
            padding: 50px;
            box-sizing: border-box; 
        }
    </style>
</head>
<body>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quod cumque sequi alias beatae?
         Aliquid illo libero veniam cum rerum reiciendis modi vero odit saepe repellendus. Molestiae nulla perspiciatis consectetur!</p>
</body>
</html>
```
![image.png](https://images.viblo.asia/3327f6e4-22d2-41d0-8b15-40829296b2b6.png)

Ngoài ra box-sizing còn có giá trị mặc định content-box: widh, height chỉ áp dụng cho nội dung bên trong, không áp dụng cho padding, border và marging.

padding-box thì width, height chỉ áp dụng content, padding, không bao gồm marging và border. (chỉ có ở trình duyệt firefox)




- Tải hình nền trên trang Netflix Login và thiết lập background-image cho trang Login

```css
.login-container{
    background-image: url("./netflix_login_bgr.jpg");
    background-size: cover;
    height: 1086px;
    position: relative;
    width: 100%;
}
```

**Giải thích:**

**Câu hỏi:** Phân biệt giá trị cover và contain của thuộc tính background-size?

background-size: cover để hình nền lấp đầy diện tích của phần tử. (đôi lúc hình sẽ bị thiếu bên phải hoặc dưới nếu tỉ lệ cao, rộng của hình không phù hợp với phần tử). So sánh hình gốc và hình nền để hiểu rõ.

Nếu xài background-size: contain thì hiển thị đầy đủ hình nền (không bị vỡ) nhưng phần tử sẽ bị khoảng trống.
Thêm background-repeat để hiểu rõ.

Relative: Định vị trí của phần tử so với vị trí ban đầu. Mặc định là giữ nguyên. Ta có thể điều chỉnh top:10px, left: 10px để xem thay đổi.


- Css cho lớp phủ mờ - overlay cho layout
```css
.login-overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
```
Absolute: Giá trị này dùng để thiết lập vị trí của một phần tử theo phần tử cha có giá trị thuộc tính position là relative hoặc absolute. Ở đây phần tử cha là thẻ div với class login-container. Mặc đính giá trị là 0.

Mã màu rgba với giá trị 3 màu red, green, blue (từ 0 - 255) và cuối cùng là opacity (độ mờ) giá trị 0 tới 1.

- Phần header ở trang Login Netflix là 1 file icon svg. Nhưng để đơn giản thì mình sẽ dùng thẻ a thay thế.
```html
    <div class="login-container">
        <div class="login-header">
            <a href="/">Netflix</a>
        </div>

        <div class="login-body">
            <!-- Form Login -->
        </div>

        <div class="login-footer"></div>
    </div>
```

 Xây dựng login body
```html
 <div class="login-body">
            <!-- Form Login -->
            <div class="login-form-container">
                <div class="login-form-header">
                    <h4>
                        Sign In
                    </h4>
                </div>

                <div class="login-form">

                </div>

                <div class="login-form-other">
                    
                </div>
            </div>
        </div>
```

- Css html chung cho trang web
```css
html{
    font-size: 10px;
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif
}
```

- Css cho phần header
```css
.login-header{
    padding-top: 20px;
    padding-left: 44px;
    position: absolute;
    top: 0;
    left: 0;
}


.login-header a{
    font-size: 5rem;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    color: #E50914;
}
```

Giải thích: 5rem nghĩa là 50px(gấp 5 lần font-size của root - html)

Absolute: Giá trị này dùng để thiết lập vị trí của một phần tử theo phần tử cha có giá trị thuộc tính position là relative hoặc absolute. Ở đây phần tử cha là thẻ div với class login-container.

- Css cho phần login-body
```css
.login-body{
    width: 448px;
    height: 660px;
    background-color:  rgba(0,0,0, 0.75);
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 88px;
    border-radius: 5px;
}
```

**Giải thích**: Màu nền với độ mờ 0.75

Để căn giữa ta dùng thuộc tính margin: auto.

- css cho login-form-header
```css
    font-size: 3.2rem;
    font-weight: 700px;
    color: #fff;

```

- Giải thích về z-index. 
Mặc định hiện tại đang đúng do thứ tự các phần tử html login-overlay đặt trước login-header và login-body.
Nếu ta thay đổi vị trí thì các phần tử sẽ bị chìm xuống.

=> Để giải quyết ta dùng z-index để thiết lập giá trị hiển thị của các phần tử html. z-index càng cao thì phần tử đó đứng trước và hiện lên trên.

**Lưu ý:** z-index chỉ làm việc cùng với position.
```css
z-index: 1; cho login-header và login-body
```

- Css cho login-form-container
```css
.login-form-container{
    padding: 60px 70px 0 70px;
}
```

Có thể viết tắt:  padding: 60px 70px 0;

- Tạo form input gồm 2 thẻ input text uername và password
```html
                <div class="login-form">
                    <input type="text" class="login-form-input" placeholder="Email or phone number">
                    <input type="password" class="signin-form-input" placeholder="Password">
                </div>
```

Bởi vì ta thấy định dạng của 2 thẻ input giống nhau nên ta đặt class chung.

- Css cho thẻ input
```css
.login-form-input{
    width: 100%;
    height: 50px;
    margin-top: 16px;
    padding: 0 16px;
    color: #fff;
    font-size: 1.6rem;
    background-color:  #333333;
    border: 1px solid #333333;
    border-radius: 4px;
    outline: none;
}
```

- Css thêm viền khi click vào input nhập thông tin
```css
.login-form-input:focus{
    border-bottom: 3px solid #eeaf67;
}
```

- Chỉnh khoảng cách thẻ input đầu tiên tới Login header

**Câu hỏi:** làm sao căn chỉnh khoảng cách của thẻ input đầu tiên tới Login header?
```css
.login-form-input:first-child{
    margin-top: 30px;
}
```

Note: để chỉnh các phần tử tiếp theo ta có thể dùng :nth-child(n)


- Thêm button Sigin
```html
     <button class="login-form-button">Sign In</button>
```

- Css cho button
```

.login-form-button{
    color: #fff;
    background-color: #e50914;
    width: 100%;
    font-size: 1.6rem;
    padding:16px;
    border-radius: 4px;
    border: 0px;
    margin: 40px 0 14px; (trên, hai bên, dưới)
    font-weight: 700;
}
```

- Thêm HTML cho phần checkbox, remember me, need help link.
```html
                    <div class="login-form-help">
                        <div class="login-form-rememberMe">
                            <input type="checkbox" class="remberMe-cbx" checked>
                            <label class="remember-lbl">Remember me</label>
                        </div>
                        <a class="help-link" href="/">Need help?</a>
                    </div>
```

- Css cho login-form-helper

**Câu hỏi:** khi chưa sử dụng display flex. Làm sao để 2 thành phần hiển thị lên trên?
```css
.login-form-help{
    color: #737373;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
}
```

**Giải thích:** Justify-content: giúp sắp xếp các phần tử nằm bên trong theo chiều dọc hoặc chiều ngang.

Gía trị này giúp cho các khoảng cách giữa các thành phần luôn bằng nhau, tuy nhiên phần tử đầu luôn nằm sát trái, phần tử cuối luôn nằm sát phải.

Tham khảo: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

- Css cho checkbox
```css
.remberMe-cbx{
    height: 16px;
    width: 16px;
    border-radius: 2px;
  /*accent-color:#737373;*/
}

.remember-lbl{
    position: relative;
    bottom: 3px;
}
```

Để chỉnh màu cho checkbox khi check ta có thể dùng thuộc tính accent-color. 

- Để click vào lable chọn checkbox ta dùng id
```html
                        <div class="login-form-rememberMe">
                            <input type="checkbox" class="remberMe-cbx" id="checkbox_id">
                            <label class="remember-lbl" for="checkbox_id">Remember me</label>
                        </div>
```

Còn để chỉnh nhiều định dạng hơn cho checkbox thì ta phải viết css tạo ra custom style checkbox css. 

- Thêm vào phần Login with facebook
```html
                    <a href="/" class="login-fb">
                        <img class="login-fb-icon"
                            src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png"
                            alt="">
                        <span class="login-fb-text">Login with Facebook</span>
                    </a>
```

- Css cho Login fb
```css
.login-form-other{
    margin-top: 60px;
}

.login-fb{
    text-decoration: none;
}

.login-fb-icon{
    height: 20px;
    width: 20px;
    margin-right: 10px;
}

.login-fb-text{
    font-size: 1.3rem;
    color: #737373;
    font-weight: 500;
   position: relative;
    bottom: 6px;
}
```

### 4. Tổng kết

Vậy là chúng ta đã cùng nhau xây dựng thành công giao diện trang Login Netflix.

Toàn bộ source code mọi người tham khảo:

- HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Netflix</title>
</head>
<body>
    <div class="login-container">

        <div class="login-header">
            <a href="/">Netflix</a>
        </div>

        <div class="login-body">
            <!-- Form Login -->
            <div class="login-form-container">
                <div class="login-form-header">
                    <h4>
                       Login
                    </h4>
                </div>

                <div class="login-form">
                    <input type="text" class="login-form-input" placeholder="Email or phone number">
                    <input type="password" class="login-form-input" placeholder="Password">
                    <button class="login-form-button">Sign In</button>

                    <div class="login-form-help">
                        <div class="login-form-rememberMe">
                            <input type="checkbox" class="remberMe-cbx" id="checkbox_id">
                            <label class="remember-lbl" for="checkbox_id">Remember me</label>
                        </div>
                        <a class="help-link" href="/">Need help?</a>
                    </div>
                </div>

                <div class="login-form-other">
                    <a href="/" class="login-fb">
                        <img class="login-fb-icon"
                            src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png"
                            alt="">
                        <span class="login-fb-text">Login with Facebook</span>
                    </a>

                    <div class="login-form-signupnow">
                        New to Netflix?
                        <a href="/" class="login-form-signupnow-link">Sign up now.</a>
                    </div>

                    <div class="login-term">
                        <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
                        <a href="">Learn more.</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="login-overlay">
        </div>

        <div class="login-footer">
        </div>
    </div>
</body>
</html>
```

- CSS
```css
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html{
    font-size: 10px;
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif
}

.login-container{
    background-image: url("./netflix_login_bgr.jpg");
    background-size: cover;
    height: 1086px;
    position: relative;
    width: 100%;
}

.login-overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.login-header{
    padding-top: 20px;
    padding-left: 44px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}


.login-header a{
    font-size: 5rem;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    color: #E50914;
}

.login-body{
    width: 448px;
    height: 660px;
    background-color:  rgba(0,0,0,0.75);
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 88px;
    border-radius: 5px;
    z-index: 1;
}

.login-form-header{
    font-size: 3.2rem;
    font-weight: 700px;
    color: #fff;
}

.login-form-container{
    padding: 60px 70px 0;
}


.login-form-input{
    width: 100%;
    height: 50px;
    margin-top: 16px;
    padding: 0 16px;
    color: #fff;
    font-size: 1.6rem;
    background-color:  #333333;
    border: 1px solid #333333;
    border-radius: 4px;
    outline: none;
}

.login-form-input:focus{
    border-bottom: 3px solid #eeaf67;
}

.login-form-input:first-child{
    margin-top: 30px;
}

.login-form-button{
    color: #fff;
    background-color: #e50914;
    width: 100%;
    font-size: 1.6rem;
    padding:16px;
    border-radius: 4px;
    border: 0px;
    margin: 40px 0 14px;
    font-weight: 700;
}

.login-form-help{
    color: #737373;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
}

.remberMe-cbx{
    height: 16px;
    width: 16px;
    border-radius: 2px;
    accent-color:#737373;
}

.remember-lbl{
    position: relative;
    bottom: 3px;
}

.help-link{
    text-decoration: none;
    color: #737373;
}

.login-form-other{
    margin-top: 60px;
}

.login-fb{
    text-decoration: none;
}

.login-fb-icon{
    height: 20px;
    width: 20px;
    margin-right: 10px;
}

.login-fb-text{
    font-size: 1.3rem;
    color: #737373;
    font-weight: 500;
    position: relative;
    bottom: 6px;
}

.login-form-signupnow
{
    font-size: 16px;
    color: #737373;
    margin-top: 16px;
}

.login-form-signupnow-link{
    color: #fff;
    text-decoration: none;
}

.login-term{
    color: #737373;
    font-size: 1.3rem;
    margin-top: 16px;
    color: #737373;

}

.login-term p{
    display: inline;
}

.login-term a{
    color: #0071eb;
    text-decoration: none;
}

.login-term a:hover{
    text-decoration: underline;
}


.login-footer{
    width: 100%;
    background-color:  rgba(0,0,0,0.75);
    height: 220px;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 30px 0;
}
```