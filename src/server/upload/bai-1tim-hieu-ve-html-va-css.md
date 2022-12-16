Chào các bạn,

Lời đầu tiên mình xin chúc các bạn một năm mới an khang thịnh vượng, vạn sự như ý! 
Khai bút đầu xuân mình sẽ viết về chủ đề vô cùng quen thuộc với anh em lập trình web. Đó là HTML, CSS. 
Bài viết sẽ giới thiệu về HTML, CSS là gì, các thẻ cơ bản HTML, CSS. Mục đích của bài viết để tổng hợp kiến thức cơ bản về HTML, CSS

### 1. HTML là gì?

- HTML là chữ viết tắt của Hypertext Markup Language, là ngôn ngữ được sử dụng rộng rãi nhất để viết các trang Web.
- Hypertext là cách mà các trang Web (các tài liệu HTML) được kết nối với nhau. Và như thế, đường link có trên trang Web được gọi là Hypertext. 
- Như tên gọi đã gợi ý, HTML là ngôn ngữ đánh dấu bằng thẻ (Markup Language), nghĩa là sử dụng HTML để đánh dấu một tài liệu text bằng các thẻ (tag) để nói cho trình duyệt Web cách để cấu trúc nó để hiển thị ra màn hình.

Vậy HTML là ngôn ngữ sử dụng các thẻ để xây dựng nên khung sườn của 1 website. 

- Cài đặt extension Live Server
Để việc thao tác được dễ dàng hơn, nên cài đặt Extension Live Server – giúp bạn tạo ngay một web server bên trong VSCode, hỗ trợ live reload. Rất tiện khi tạo layout HTML và tiết kiệm thời gian khi bạn code.

Link: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

![image.png](https://images.viblo.asia/b1c4d5a2-8565-4592-ac26-16769c481cb3.png)

Ví dụ cơ bản về HTML:
```html
<!DOCTYPE>
<html>
<head>
<title>Day la tieu de</title> </head> 
<body>
<h1>Day la dau de</h1>
<p>Phan noi dung cua tai lieu ...</p> </body>
</html> 
```

**Giải thích:**

**<!DOCTYPE>**: Đây là thẻ có nhiệm vụ báo cho trình duyệt biết được file đang hiển thị là HTML. Mọi tài liệu HTML đều phải có thẻ này.

**<html>**: Thẻ lớn nhất để bao bọc tất cả các thẻ con của file HTML. Gồm có 2 thẻ mở và đóng.
    
**<head>**: Nằm giữa thẻ <html> và <body>, thẻ <head> có nhiệm vụ dùng để chứa các meta data. Nghĩa là chứa các data dùng chung, cần thiết cho file HTML. 
    Như chứa tiêu đề, các thẻ link tới csss, script tới Javascript.
    
**<title>**: Nằm giữa thẻ <head> chứa tiêu đề của file HTML.
    
**<body>**: Thẻ xác định nội dung bên trong của file HTML. Vùng chứa toàn bộ nội dung của 1 trang web như header, footer, slider, hình ảnh, đoạn văn bản...
    
### 2. Các thẻ HTML
   
- Các thẻ hiển thị đầu đề từ h1 đến h6
    
**Ví dụ:**
    
```html
<h1>Ví dụ tiêu đề 1</h1>
<h2>Ví dụ tiêu đề 2</h2>
<h3>Ví dụ tiêu đề 3</h3>
<h4>Ví dụ tiêu đề 4</h4>
<h5>Ví dụ tiêu đề 5</h5>
<h6>Ví dụ tiêu đề 6</h6>
```
    
- Thẻ biểu diễn đoạn văn bản. p viết tắt là paragraph nghĩa là một đoạn văn bản.
    
 **Ví dụ:**
    
```html
    <p>Nội dung đoạn văn bản</p>
```
- Thẻ ngắt dòng dùng để ngắt dòng giữa các đoạn văn bản hoặc tạo khoảng cách giữa 2 phần tử.
    Lưu ý: thẻ br là thẻ đơn không có thẻ đóng.
    
     **Ví dụ:**
    
```html
    <p>Nội dung đoạn văn bản 1</p>
    <br>
    <br>
    <br>
    <p>Nội dung đoạn văn bản 2</p>
```
    
- Thẻ giữ nguyên định dạng trong HTML.
    
    
    Nếu chúng ta sử dụng thẻ p để tạo ra một đoạn văn bản. Trong đoạn văn bản đó ta nhập nhiều khoảng trắng liên tiếp hoặc dùng dấu Enter để xuống dòng thì khi hiển thị lên màn hình vẫn xem là một khoảng trắng.
    
**Ví dụ:**
    
```html
        <p>Lorem ipsum 
        dolor sit amet consectetur 
        adipisicing elit.         Pariatur, 
        
        
        minus amet?           Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!
    </p>
```
    
    Thẻ pre sinh ra giúp chúng ta giữ nguyên định dạng như khi soạn thảo.

**Ví dụ:**
    
 ```html
 <pre>
 Lorem ipsum 
        dolor sit amet consectetur 
        adipisicing elit.         Pariatur, 
        
        
        minus amet?           Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!
</pre>
```
    
    
- Thẻ <a> dùng để tạo một liên kết đến 1 link khác.
    
 **Ví dụ:**
```html
  <a href="https://google.com">Chuyển đến trang google</a>
```
    
- Thẻ <i> dùng tạo một văn bản có kiểu chữ in nghiêng
    
 **Ví dụ:**
```html
  <p>Học lập trình <i>Html & css</i> từ cơ bản đến nâng cao</p>
```
    
- Thẻ <audio> tạo một trình phát nhạc. Lưu ý thẻ này là thẻ mới trong HTML5
    
 **Ví dụ:**
```html
  <audio src="FileTestAudio.mp3" controls></audio>
```
    
- Thẻ div viết tắt của division – là thẻ được dùng để nhóm nhiều phần tử HTML lại với nhau.
   Được sử dụng để tạo ra một khu vực kiểu block nào đó trên một website, hay bạn có thể hiểu là gom nhóm tập hợp các phần tử trên website vào một khu vực với thẻ div.
    
    ![image.png](https://images.viblo.asia/c6bbcb70-65f3-49b8-87fd-8f427047736e.png)
    
  **Ví dụ:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <!-- Header -->
    <div> 
        <h1>Website học HTML & CSS</h1>
    </div>
    <!-- Content -->
    <div>
        <pre>Lorem ipsum 
            dolor sit amet consectetur 
            adipisicing elit.         Pariatur, 
            
            
            minus amet?           Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!
        </pre>

        <a href="https://google.com">Chuyển đến trang sgoogle</a>

        <p>Học lập trình <i>Html & css</i> từ cơ bản đến nâng cao</p>

        <audio src="FileTestAudio.mp3" controls></audio>

        <audio cont>
            <source src="FileTestAudio.mp3" type="audio/mp3">
            <source src="FileTestAudio.mp3" type="audio/mp3">
        </audio>
    </div>
    <!-- Footer -->
    <div>
        <p>Nội dung footer 1</p>
        <p>Nội dung footer 2</p>
    </div>
</body>
</html>
```   
    
- Thẻ <header> chứa thông tin đầu trang web. Thường sẽ bao gồm vài thông tin như: tên trang web, logo, thông tin liên hệ, câu khẩu hiệu....
    
 **Ví dụ:**
```html
        <h1>Website học HTML & CSS</h1>
        <div>Hướng dẫn học lập trình web từ cơ bản đến nâng cao</div>
``` 
   
- Thẻ <body> chứa toàn bộ nội dung trang web. Một trang web chỉ có 1 thẻ body.
    
- Thẻ <footer> là phần chân trang, nó chứa thông tin bản quyền, liên hệ, tác giả, ....
    
 **Ví dụ:**
```html
    <footer>
        <p>@copyright 2022
            Contact: xxxxxxxx
        </p>
    </footer>
```     
    
    
 - Thẻ  <button>  để tạo ra các nút nhấn trong trang web.
 **Ví dụ:**
```html
        <button>Đăng ký</button>
```         
    
- Thẻ <Form> và <input> giúp người dùng có thể nhập dữ liệu. Có rất nhiều kiểu input như: textbox, checkbox, radio, button, password, file, image....

Tham khảo: https://www.w3schools.com/html/html_forms.asp
    
    
  **Ví dụ:**
```html
        <form>
            User Name: <br>
            <input type="text"><br>
            Password: <br>
            <input type="password">
            <br>
            <input type="checkbox"> Remember
        </form>
        <button>Đăng nhập</button>
```        
    
- Hiển thị danh sách trong HTML (<ul> <li> <ol><li>)
    
 **Ví dụ:**
```html
        <ul>
            <li>HTML</li>
            <li>CSSS</li>
            <li>JAVASCRIPT</li>
        </ul>
    
            <ol>
            <li>HTML</li>
            <li>CSSS</li>
            <li>JAVASCRIPT</li>
        </ol>
```       
    
- Hiển thị bảng trong HTML: Bảng HTML được tạo ra bằng cách sử dụng thẻ <table> trong đó: thẻ <tr> được sử dụng để tạo các hàng và thẻ <td> được sử dụng để tạo các ô.
    **Ví dụ:**
```html

        <table border="1">
            <tr>
                <td>Dòng 1, Cột 1</td>
                <td>Dòng 1, Cột 2</td>
            </tr>
            <tr>
                <td>Dòng 2, Cột 1</td>
                <td>Dòng 2, Cột 2</td>
            </tr>
        </table>
```        
    
### 3. CSS là gì?
    
CSS là chữ viết tắt của **Cascading Style Sheet**s, nnó giúp tạo nên màu sắc hình ảnh, kiểu dáng, … cho trang HTML. Nói ngắn gọn hơn là ngôn ngữ tạo phong cách cho trang web. Bạn có thể hiểu đơn giản rằng, nếu HTML đóng vai trò định dạng các phần tử trên website như việc tạo ra các đoạn văn bản, các tiêu đề, bảng,…thì CSS sẽ giúp chúng ta có thể thêm style vào các phần tử HTML đó như đổi bố cục, màu sắc trang, đổi màu chữ, font chữ, thay đổi cấu trúc…

 - Cách chèn CSS vào trang HTML. Có 3 cách chèn CSS vào trang HTML
    
    Cách 1: Chèn trong cặp thẻ đóng mở <style></style>
 ```html
<head>
    <title>HTML cơ bản</title>
    <style>
    h1{
        color:red;
    }
    </style>
</head>
```        
   Cách 2: Chèn CSS ngay trong các dòng HTML bằng thuộc tính style=””
  ```html
<h1 style="color: red;">HTML & CSS</h1>
```           
    
 Cách 3: Chèn CSS bằng file .css
    
Chèn link file style.css vào file index.html được đặt bên trong thẻ <head></head>:
```html
  <link rel="stylesheet" href="style.css">
```
Thuộc tính trong file style.css như sau:
```html
 h1{
    color: red;
}
```    
    
### 4. Các thẻ CSS
    
- Đơn vị: Trong css chia làm 2 loại đơn vị :

    **Tương đối (Relative Units)** là những đơn vị được tính một cách tương đối dựa trên các phần tử khác (có thể là phần tử cha hoặc phần tử root). Các đơn vị loại này khá linh động, rất thích hợp cho việc thích ứng trên các thiết bị khác nhau. Một vài đơn vị tương đối như: rem, em, %, vw, vh, ex, ch, vmin, vmax.
    

    **Tuyệt đối (Absolute Units)** là những đơn vị mà giá trị của nó không bao giờ thay đổi và không bị ảnh hưởng bởi các thành phần khác. Tức là trong mọi kích thước màn hình thì kích thước của nó vẫn như thế. Với loại đơn vị này chỉ nên dùng cho những thứ có kich thước cố định, hoặc kích thước nhỏ không quá ảnh hưởng như border, … Một vài đơn vị tuyệt đối như: px, pt, cm, mm, pc, in.
    
Lúc mới học thì ta chỉ cần chú ý một vài đơn vị phổ biến.

**Đơn vị tương đối %** – đơn vị phần trăm sẽ tỉ lệ theo phần tử cha trực tiếp của nó.
    
Ví dụ:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .parent{
            background-color: red;
            width: 500px;
            height: 500px;
        }

        .child-1{
            background-color: green;
            width: 50%;
            height: 50%;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <div class="parent">
        <div class="child-1"></div>
    </div>
</body>
</html>
```
  
Đơn vị tương đối **em** - là đơn vị mà giá trị của nó được tính dựa trên tỉ lệ so với phần tử cha của nó hoặc chính nó thông qua giá trị của thuộc tính font-size
    
Ví dụ:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .parent{
            background-color: red;
            width: 500px;
            height: 500px;
            font-size: 50px;
        }

        .child-1{
            background-color: green;
            width: 50%;
            height: 50%;
            font-size: 2em; /*100px*/
        }
    </style>
    <title>Document</title>
</head>
<body>
    <div class="parent">
        parent
        <div class="child-1">
            Child-1
        </div>
    </div>
</body>
</html>
```
    
    
    
   ![image.png](https://images.viblo.asia/75a82af7-d51d-40d7-9f57-bef07fecf96c.png)
    
Đơn vị tương đối **rem** (root em) tương tự như em, nhưng đơn giản là nó sẽ tỉ lệ theo thuộc tính font-size của phần tử root <html>
    
 Ví dụ:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        html{
            font-size: 20px;
        }

        .testRem{
            font-size: 2rem;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <div class="testRem">
        Test font size of rem unit
    </div>
</body>
</html>
```
Đơn vị tuyệt đối px – pixels (1px = 1/96th of 1in). Pixels (px) là khác nhau giữa các thiết bị. Với các thiết bị có độ phân giải thấp (low-dpi devices), 1px là một chấm điểm hiển thị trên màn hình của thiết bị. Với máy in và các thiết bị có độ phân giải cao, 1px lại là nhiều chấm điểm hiển thị trên màn hình của thiết bị.
   
- Thuộc tính background dùng để thiết lập nền cho phần tử html.
    
 **background-color** dùng để đặt màu nền cho một thành phần.

Các loại màu trong css: https://www.w3schools.com/css/css_colors.asp
    
 ```CSS
background-color: #ff0000;
```       
**background-image** định nghĩa cho hình nền của một thành phần. Nó là giá trị được định nghĩa bằng một đường dẫn hình ảnh với ký hiệu url()
   
```CSS
background-image: url(https://png.pngtree.com/element_our/sm/20180411/sm_5acdd7d9526f7.png);
```
    
**background-repeat**  kiểm soát cách hình nền sau khi nó được đặt kích thước (bởi thuộc tính background-size) và vị trí (bởi thuộc tính background-position). Giá trị của của thuộc tính này có thể là một trong những từ khóa sau: repeat-x, repeat-y, repeat, space, round, no-repeat
    
**background-size** định nghĩa kích thước của hình nền. Giá trị của nó có thể là kích thước chiều dài và rộng hoặc là tỉ lệ phần trăm. Từ khóa có sẵn cho thuộc tính là contain và cover. Giá trị contain sẽ co dãn hình ảnh để phù hợp với khung. giá trị cover, ở một mặt khác nó sẽ kéo dãn hình ảnh sao cho vừa với khung mà ko gây sai lệch tỉ lệ.
    
- Font-size dùng để thiết lập "kích cỡ chữ" của văn bản.
    
- Định dạng text: color - thêm màu chữ, thiết lập chữ in hoa và in thường với ‘text-transform’. uppercase: chuyển đổi in hoa văn bản text, lowercase: chuyển đổi in thường văn bản text.

- Thiết lập vị trí của văn bản text (trái, phải, giữa, đều) với ‘text-align’. center : hiển thị text ngay giữa. left: hiển thị text bên trái. right: hiển thị text bên phải.  justify : hiển thị text canh đều so với lề phải và lề trái.
    
- Trang trí gạch chân, gạch đầu văn bản text với ‘text-decoration’. overline: gạch ngang trên văn bản text. underline: gạch dưới văn bản text. line-through: gạch ngang chữ text. none: không có gạch gì cả
    
- Hình ảnh
    
Ví dụ:
    
  ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        img{
            width: 100px;
            height: 100px;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <img src="./image1.png" alt="image1">
</body>
</html>
```   
    
- Link. Ta có thể dùng css thiết lập style cho các trạng thái link.
    
Trạng thái :link – biểu thị rằng trang web này trình duyệt chưa lưu (tức người sử dụng lần đầu tiên click vào đường dẫn này).

Trạng thái :visited – biểu thị rằng đường dẫn tới trang web này đã được lưu bởi trình duyệt (tức là người sử dụng đã click vào đường dẫn này trước đó rồi).

Trạng thái :hover – biểu thị rằng khi người sử dụng di chuyển chuột qua phần tử mà chứa link đó (tức là phần tử đó là một link khi người sử dụng di chuyển chuột qua phần tử đó).

Trạng thái :active – biểu thị đường link là active khi người sử dụng click chuột vào.
    
 Ví dụ:
    
  ```html
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>

        a:link{
            color: red;
        }

        a:hover{
            color: blue;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <a href="https://facebook.com">facebook</a>
</body>
</html>
```     
    
- Class và Id
    
 Thuộc tính id dùng để đặt tên cho một phần tử trong HTML, mỗi thuộc tính id chỉ chỉ định cho một phần tử duy nhất trong file HTML hiện hành.
    
  Giá trị id được sử dụng trong CSS hoặc JavaScript để chỉ định cụ thể định dạng hoặc thực hiện tác vụ nhất định cho phần tử đó
    
 Thuộc tính class dùng để đặt tên cho các phần tử trong html, mỗi thuộc tính class có thể chỉ định cho nhiều phần tử HTML (cùng hoặc khác loại) để có cùng định dạng.
    
 Giá trị class được sử dụng trong CSS hoặc JavaScript để chỉ định đồng loạt các định dạng chung hoặc thực hiện chung tác vụ cho các phần tử HTML có cùng thuộc tính class.
    
```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        h1{
            color: red;
        }

        #heading1{
            color: green;
        }

        .heading{
            color: blue;
        }
    </style>
</head>
<body>
    <h1>HTML</h1>
    <h1 id="heading1">CSS</h1>
    <h1 class="heading">JS</h1>
    <h1 class="heading">C#</h1>
    <h1 class="heading">PHP</h1>
    <h1>JAVA</h1>

    <h1 id="heading2">NODEJS</h1>
</body>
</html>
```
    
- Block element vs inlien element
    Block chiếm toàn bộ khoảng trắng mà nó có thể chiếm theo bề ngang (các thể h1, h2, thẻ p, … có mặc định là block element)
    
    Còn inline thì có thể cho các phần tử hiển thị trên cùng 1 dòng ngang (các thẻ img, thẻ input, textarea, …. Có mặc định là inline element )
    
    Tham khảo: https://www.w3schools.com/html/html_blocks.asp
    
    
- Css model box
    
    ![image.png](https://images.viblo.asia/eef44e16-b094-460d-b06e-9f8eafadf669.png)
    
Trong đó: 

Content: Vùng hiển thị nội dung (text, image, …) của phần tử HTML
    
Padding: Vùng đệm khoảng cách từ nội dung (content) đến đường viền (Border), bao quanh bốn mặt của Content
    
Border: Đường viền bao xung quanh phần tử HTML, bao quanh bốn mặt của Padding
    
Margin: Khoảng cách từ đường viền (Border) của phần tử này đến các phần tử khác hoặc các phần của trang Web (viền trang web), bao quanh bốn mặt của Border.
    
- Đường viền css  ta dùng thuộc tính border
    
Kiểu viền ta dùng {border-style: value;}
    
Độ dày của viền ta dùng    
> border-width: value;
![image.png](https://images.viblo.asia/fbd1e269-16da-45ed-b3da-042126203922.png)
    
Màu sắc của đường viền ta dùng
  
>   border-color: value;
    
 Thiếp lập đường viền cho từng cạnh
    (top, right, botoom, left)
>     border-top: 5px solid red;
    
 - Reset css dùng để giúp thiết lập các style của tất cả đối tượng HTML (element) theo một chuẩn nhất định.
```csss
 *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
```
    
- Padding: dùng để tạo không gian giữa nội dung và đường viền (bên trong border)
    
   Padding: <giá trị top> <giá trị right> <giá trị bottom> <giá trị left>
    
 -  Margin để tạo không gian giữa đường viền của phần tử này với phần tử khác (bên ngoài Border)
    
    Margin: <giá trị top> <giá trị right> <giá trị bottom> <giá trị left>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        .Lorem-1{
            /* Shorthand */
            border: 5px solid red;
            background-color: bisque;
            padding: 20px 0px 50px 20px;

            margin-top: 20px;
        }

        .Lorem-2{
            border: 5px solid red;
            margin-top: 20px;
        }

    </style>
</head>
<body>
        <p class="Lorem-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consequatur velit, officia nulla praesentium quis, delectus ex dignissimos perspiciatis, consequuntur necessitatibus aut. Quam eveniet totam consequuntur, dolore magnam necessitatibus officiis.
        </p>

        <p class="Lorem-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus omnis magnam, tempore nostrum voluptates incidunt eos, amet quas quos natus animi! Corporis dolorum ex quam placeat recusandae dolore. Nostrum, esse?
        </p>
</body>
</html>
```
    
    
- Position
  
    Trong những bài trước, ta có thể thấy rõ khi thay đổi hoặc di chuyển một phần tử nào đó qua Model Box của nó thì các phần tử liền kề đều bị ảnh hưởng

Vậy câu hỏi đặt ra: "Làm thế nào để di chuyển một phần tử mà không ảnh hưởng đến các phần tử khác hoặc không làm thay đổi bố cục định sẵn của trang web mà bạn đã định ra?”

Giải pháp của vấn đề này chính là Position!
    
Thuộc tính Position chỉ định cách định vị vị trí của một phần tử
    
Thuộc tính position: fixed
Với giá trị position là fixed thì sẽ lấy mốc là góc màn hình trình duyệt hiển thị, do đó khi bạn cuộn trang website xuống (dùng chuột scroll xuống) thì nó vẫn luôn nằm trên vị trí màn hình mà bạn quan sát
    
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=h1, initial-scale=1.0">
    <title>Document</title>

    <style>
         *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            height: 1500px;
        }

        .container{
            position: fixed;
```
            top: 20px;
            left: 0;
            background-color: red;
            height: 50px;
            width: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="heading">
            <h1 class="heading3"></h1>
        </div>
    </div>

</body>
</html>
```
    
Thuộc tính position: relative
Với giá trị position là relative thì chúng ta có thể di chuyển vị trí của nó xung quanh vị trí ban đầu, lấy vị trí ban đầu làm mốc
    
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=h1, initial-scale=1.0">
    <title>Document</title>

    <style>
         *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            height: 1500px;
        }

        .container{
            position: relative;
            top: 20px;
            left: 0;
            background-color: red;
            height: 50px;
            width: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="heading">
            <h1 class="heading3"></h1>
        </div>
    </div>

</body>
</html>
```
Thuộc tính postion: absolute
Với thuộc tính postion absolute thì sẽ lấy góc của phần tử cha có chứa thuộc tính position gần nhất là mốc.
```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=h1, initial-scale=1.0">
    <title>Document</title>

    <style>
         *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            height: 1500px;
        }

        .container{
            position: relative;
            top: 20px;
            left: 0;
            background-color: red;
            height: 50px;
            width: 50px;
        }

        .heading3{
            background-color: green;
            height: 50px;
            width: 50px;
            position: absolute;
            top: 20px;
            left: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="heading">
            <h1 class="heading3"></h1>
        </div>
    </div>

</body>
</html>
```

### 5. Tổng kết
Qua bài viết này mình đã giới thiệu về định nghĩa html, css, cũng như cách sử dụng 1 số thẻ cơ bản của html, css. Hy vọng được thảo luận và góp ý của anh em.

**Tham khảo:**
   
- https://www.w3schools.com/html/html_forms.asp
- https://dynonguyen.com/tat-tan-tat-don-vi-trong-css/
- https://viblo.asia/p/tat-tan-tat-ve-thuoc-tinh-background-trong-css-LzD5dPXW5jY
- https://www.w3schools.com/css/css_border.asp
 - https://www.howkteam.vn/course/lap-trinh-front-end-co-ban-voi-website-landing-page/thuoc-tinh-position-trong-css-2804