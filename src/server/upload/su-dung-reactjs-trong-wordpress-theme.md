### Giới thiệu
Hôm nay mình sẽ hướng dẫn các bạn sử dụng ReactJS trong WordPress theme. Bài viết này dành cho các bạn đã biết qua về WordPress cũng như ReactJS. Hãy cùng bắt đầu nhé.

### Cài đặt WordPress
Download WordPress về, giải nén ra thư mục `wp-reactjs` rồi chạy install, theme mặc đinh sau khi cài đặt WordPress là theme Twenty Seventeen:
![](https://images.viblo.asia/4d96e0b6-9d64-455f-9753-ded594202772.png)

### Tạo theme
Mình sẽ tạo 1 theme mới có tên là reactjs. Đi vào thư mục `wp-content/themes/` , tạo thư mục `reactjs`, và tạo một số file theo cấu trúc:

```
- style.css //File giao diện của theme
- index.php //Hiển thị của trang chủ
- header.php //Hiển thị của header
- footer.php //Hiển thị của footer
- js/script.js //File js của theme
```
Cụ thể nội dung các files như sau:
**style.css**
```
/*
Theme Name: ReactJS WordPress
Author: Minh Luu
Author URI: https://wordpress.org/
Description: WordPress theme using ReactJS
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: reactjs, WordPress Theme
Text Domain: reactjs
*/
```
**index.php**
```
<?php
get_header();
get_footer();
```
**header.php**
```
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri();?>/style.css">
    <script src="<?php echo get_template_directory_uri();?>/js/script.js" type="text/babel"></script>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <div id="app"></div>
```
**footer.php**
```
<?php wp_footer(); ?>

</body>
</html>
```
Sau khi active theme này lên thì giao diện ở phía Client đang trắng tinh vì chưa có nội dung nào cả.
![](https://images.viblo.asia/9bad24ca-582b-4684-9b55-2cdbac653898.jpg)
### Nhúng ReactJS vào theme
Trong bài này mình sử dụng thư viện ReactJS bằng cách nhúng đường dẫn CDN vào trong thẻ `<head>` của file **header.php**. Để sử dụng ReactJS trong theme ta cần nhúng ReactJS, ReactDOM và Babel để biên dịch JS, thêm 3 dòng code sau vào trước thẻ `<script>` trong thẻ `<head>`
```
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
Bây giờ chũng ta có thể code ReactJS trong file `js/script.js` được rồi.
### Code ReactJS trong theme
Trong file `js/script.js`, tạo component App và render ra bởi ReactDOM
```
class App extends React.Component {
    render() {
        return (
            <div className="home-page">
                Chào mừng bạn đến với React WordPress Theme
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
```
kết quả phía client như sau:
![](https://images.viblo.asia/a483f1a3-786e-42f8-b230-3f52bbbb5621.jpg)
Tạo thêm component Header, Main, Footer rồi lồng vào component `App` nhé, code ở file scrip.js sẽ như sau:
```
class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="container">Đây là header</div>
            </div>
        )
    }
}

class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <div className="container">Chào mừng bạn đến với React WordPress Theme</div>
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="container">Đây là footer</div>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="home-page">
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
```
Thêm một chút code trong file `style.css`:
```
html,body{
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
}
#app,
.home-page{
    height: 100%;
}
.container {
    max-width: 100%;
    width: 1000px;
    padding: 0 15px;
    margin: auto;
}
.header {
    background: #000;
    color: #fff;
    height: 50px;
    display: flex;
    align-items: center;
}
.main {
    min-height: calc(100% - 100px);
    background: #f5f5f5;
    color: #333;
    display: flex;
    align-items: center;
}
.footer {
    background: #1a1a1a;
    color: #ccc;
    height: 50px;
    display: flex;
    align-items: center;
}
```
Kết quả: 
![](https://images.viblo.asia/d2f819bb-51e5-4214-bc40-fbdfb6dbb21d.jpg)
### Kết luận
Bài viết này mới dừng lại ở bước sử dụng ReactJS trong WordPress Theme, để làm thành một trang web hoàn chỉnh còn rất nhiều công đoạn nữa.
Hẹn gặp lại các bạn trong các bài viết tiếp theo.