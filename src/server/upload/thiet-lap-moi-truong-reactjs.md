**Mình bắt đầu vào bài học đầu tiên nhá: Bài viết này mình xin phép nói về cách tạo 1 app reactjs và những cách tạo mà mình đã tìm hiểu được, đó là:**

1. Tạo 1 serve bằng **Nodejs**.
2. Tạo 1 app chỉ có reactjs.
3. Kết hợp ReactJS và **Laravel** ( *những bài viết tiếp theo của mình sẽ làm trên cách này!* )
# I. Những cách tạo 1 app ReactJS.
Trước khi đi vào mình muốn nói render của ReactJS, hiện tại mình có biết là ReactJS render theo 2 kiểu đó là: render phía **Client** và render phía **Server**.
1. **Render phía Client là gì?**
   
   Theo cách hiểu của mình thì khi khách hàng gửi request lên server, thì phía server( có thể là nodejs, asp, php ,...) sẽ trả về cho khách hàng thì trong đó nó sẽ gồm mã script của `ReactJS` và lúc đó React nó mới chạy code để phát sinh ra giao diện cho bạn xem.(đây là khi ReactJS mới ra đời, các bạn có thể thấy lúc mà **server** nó tải dữ liệu về phía khách hàng thì lúc đó mới tải react, lúc đó ở phía client React nó mới render cho phía khách hàng, đến đây các bạn hiểu ý mình rồi phải không, ví dụ cụ thể hơn khi server gửi 1 hình ảnh cho phía **client**, mà làm theo cách này **google** nó sẽ không hiểu được hình ảnh này là hình ảnh nào vì khi đó React nó chưa render ra hình ảnh đó. => **SEO kém** )
2. **Render phía Server là gì?**

    Vì chính lý do ở trên nên họ mới nghĩ ra 1 cách đó là khi khách hàng gửi request cho **server** thì server nó sẽ render React thành HTML rồi mới tải về phía khách hàng, thì nếu server render như vậy thì google nó sẽ bắt được hình ảnh này là hình ảnh nào => **SEO tốt**.
    
    Hiện nay ReactJS bắt theo cả 2 cách, nghĩa là ở phía client google nó cũng bắt được => bạn dùng cách nào cũng được
    
### **1. Tạo 1 serve bằng NodeJS**
Đầu tiên các bạn cần cài đặt:

> Nodejs:
> 
> https://nodejs.org/en/

> Git-scm:
> 
> https://git-scm.com/

Sau khi tải xong 2 cái trên bạn tạo 1 thư mục là tên app ReactJS của bạn và mở nó lên bằng **Terminal** và gõ:
> npm init

bạn chỉ cần nhập name: còn những dòng còn lại bạn chỉ nhấn enter thôi. Sau khi làm xong bước này bạn kiểm tra sẽ thấy trong thư mục xuất hiện file `package.json`.

Chúng ta cần cài thêm 1 ít **modul** giúp render ra HTML

> npm install express ejs

**express** là 1 modul giúp cho bạn trong việc render ra 1 trang web trong môi trường nodejs.

**ejs** là 1 view enginee, có rất nhiều view enginee, lý do ở đây mình giới thiệu tới các bạn là mình thấy nó khá là thân thuộc với các bạn đã học HTML rồi.

Sau khi cài đặt xong sẽ có 1 thư mục **node_modul** chứa các modul ta cần sử dụng. Sau đó bạn hãy tạo thêm 1 file `index.js` nhằm mục đích làm server với nội dung như sau:

```js
var express = require("express");
var app = express();

//có nghĩa là tất cả request khách hàng gửi lên serve sẽ vào public
//ex: images, video, ....
app.use(express.static("public"));

//set view là ejs
app.set("view engine", "ejs");

//thiết lập thư mục views
app.set("views", "./views");

//mở 1 cổng nào đó khi khách hàng gui request lên serve(3000) ubuntu(4000)
app.listen(4000);

//create route
//req là tham số yêu cầu của khách hàng
//res là những gì serve node trả về
app.get("/", function(req, res) {
	res.render("home");
});
```

Các bạn cần phải tạo thêm:
- folder public
- folder views
- file home.ejs

`file views\home.ejs` với nội dung như sau:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <script src="lib/react.development.js" crossorigin></script>
    <script src="lib/react-dom.development.js" crossorigin></script>
    <script src="lib/babel.min.js"></script>
</head>

<style>
    .yellow {
        background-color: yellow;
    }
</style>

<body>
    <div id="root"></div>
    <!-- root là chỗ hứng kết quả khi reactjs render -->
        <script src="process.js" type="text/babel">
            
        </script>
</body>
</html>
```

Các bạn cần phải vào trang chủ **reactjs** để tải các thư viện mình khai báo ở trên `https://reactjs.org/docs/cdn-links.html`
các bạn copy đường link của nó mở trên 1 tab mới và save nó về thư mục **public/lib**. À chút quên các bạn nên cài thêm **babel** tiện cho việc viết code hơn. 
> https://unpkg.com/babel-standalone@6.26.0/babel.min.js
> https://unpkg.com/react@16/umd/react.development.js
> https://unpkg.com/babel-standalone@6.26.0/babel.min.js 

Như bạn thấy mình có link tới file `process.js`, bạn tạo nó với nội dung như sau:
```js
var Component = React.createClass({
	render: function() {
		return (
			//cú pháp reactjs
		    //React.createElement("h1", {}, "Hello")

		    //cú pháp JSX sử dụng với babel
		    <div>
		        <h1 className="yellow"> test </h1>
		    </div>
			)
	}
})

ReactDOM.render(
    <div>
    	<Component></Component>
    </div>
    , document.getElementById('root')
);
```
Các bạn cứ làm theo mình trước nhá, chạy được code rồi tính tiếp :v, có thắc mắc gì các bạn cứ comment phía dưới nhá.

Nếu bạn làm đúng bạn sẽ có cấu trúc thư mục như mình:
![](https://images.viblo.asia/ae884139-0f0e-4a85-8243-86106b6035c1.png)

Bước cuối cùng là bạn chạy, để chạy chương trình, nhớ sau đó vào địa chỉ là `localhost:4000` nhá:
> node indexjs

### **2. Tạo 1 app chỉ có ReactJS**
(facepalm) cuối cùng cũng xong 1 cách, cách tiếp theo sẽ ngắn gọn hơn các bạn cố gắng đọc nhá!

Bạn nhập theo từng dòng nhá:
> npm install -g create-react-app
> 
> create-react-app my-app

Sau khi chạy xong nó sẽ cho các chỉ dẫn:

```
npm start
	    Starts the development server.

	  npm run build
	    Bundles the app into static files for production.

	  npm test
	    Starts the test runner.

	  npm run eject
	    Removes this tool and copies build dependencies, configuration files
	    and scripts into the app directory. If you do this, you can’t go back!

	We suggest that you begin by typing:

	  cd tranning
	  npm start

	Happy hacking!
```

Vậy là xong rồi đó, nó sẽ tạo ra 1 app tên là my-app với cấu trúc như sau bạn chạy npm start để bắt đầu nhá.
![](https://images.viblo.asia/f733bae4-4bb6-4734-8817-1fd4c6d86dbb.png)

Mình sẽ nói về cấu trúc thư mục của nó vào bài viết tiếp theo, các bạn cứ chạy được app trước nhá!

### **3. Tạo 1 app ReactJS với Laravel**

Laravel 5.5 có Frontend Preset mới là ReactJS và None. Trong bài viết này chúng ta sẽ sử dụng React Preset để sử dụng ReactJs trong Laravel app.

Các bạn tạo cho mình 1 app, cách tải chắc cũng biết rồi nhỉ? :))
> laravel.com

### **Cài đặt ReactJS Preset**
> php artisan preset react

Sau khi chạy xong preset nó sẽ thông báo cho chúng ta, các bạn chạy theo nhá:
> npm install && npm run dev
### **Bắt đầu**
Các bạn vào theo đường dẫn này nhá `resources/assets/js/components` sẽ thấy có file Example.js với nội dung như sau:
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Example Component</div>

                            <div className="panel-body">
                                I'm an example component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```
Nếu các bạn có đọc 2 cách trên của mình thì đều thấy đoạn
```js
if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```

có nghĩa là react sẽ render compontn `Example` vào phần tử có id là `example` các bạn sang `file welcome.blade.php` của Laravel và thêm đoạn này vào nhá.

```html
...
<link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
....
<body>
    ....
    <div id="example"></div>
    ....
    <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</body>
```

Xong rồi đó các bạn bật serve nên và xem kết quả nhá:
> php artisan serve

![](https://images.viblo.asia/71bc0d76-45a9-4200-8814-ba09a12b6dc4.png)

:v Cuối cùng cũng xong rồi đấy, cảm ơn mọi người đã kiên nhẫn và đọc được đến đây (facepalm). Kiến thức còn ít nên mong có sai lầm gì mọi người comment góp ý giúp mình nhá!! Bài tới mình sẽ làm tốt hơn!!!