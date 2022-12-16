# 1. Framework ExpressJS
![](https://images.viblo.asia/b7591a82-19a3-4f84-a2dd-a82349583ee5.jpg)
* Express js là một Framework nhỏ, nhưng linh hoạt được xây dựng trên nền tảng của Nodejs. Nó cung cấp các tính năng mạnh mẽ để phát triển web hoặc mobile
* Về các package hỗ trợ: Expressjs có vô số các package hỗ trợ nên các bạn không phải lo lắng khi làm việc với Framework này.
* Về performance: Express cung cấp thêm về các tính năng (feature) để dev lập trình tốt hơn. Chứ không làm giảm tốc độ của NodeJS.
* Và hơn hết, các Framework nổi tiếng của NodeJS hiện nay đều sử dụng ExpressJS như một core function, chẳng hạn: SailsJS, MEAN,..

Cài đặt:
```
$ npm install express --save
```

### Cấu trúc của ExpressJS
![](https://images.viblo.asia/989638b9-d72d-4e75-bdbb-531a7eac0d86.png)
![](https://images.viblo.asia/4ab397d8-ed49-46ca-a2eb-0ab8e24b0a8b.png)

Như các bạn thấy trên hình, Cấu trúc của express js vô cùng đơn giản.
* app.js chứa các thông tin về cấu hình, khai báo, các định nghĩa,... để ứng dụng của chúng ta chạy ok.
* package.json chứa các package cho ứng dụng chạy. Nếu bạn nào làm với PHP hoặc RoR rồi thì file này có chức năng tương tự như composer.json hoặc Gemfile.
* Folder routes: chứa các route có trong ứng dụng.
* Folder view: chứa view/template cho ứng dụng.
* Folder public chứa các file css, js, images,...cho ứng dụng.

# 2. Template Engine Handlebars
* Handlebars là một công cụ hỗ trợ cho bạn hiển thị ra các trang HTML với nội dung động.
* Handlebars là một thư viện javascrip rất mạnh mẽ giúp bạn có thể binding data vào một templete để hiển thị ra website.
* Handlebars binding data vào templete rất nhanh gọn.

Cài đặt
```
- Npm: `npm install --save handlebars`
- Bower `bower install --save handlebars`
- Download:  https://github.com/wycats/handlebars.js/
- Cdn:  https://cdnjs.com/libraries/handlebars.js/
```
 
 Config Handlebars trong Project
```
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
```

![](https://images.viblo.asia/609e0ed2-8b8e-4c41-9cf5-cc0f852c21a6.png)

# 3. Xây dựng ứng dụng NodeJS.
## 3.1. Tạo trang view 
Config ban đầu để thực hiện connect với PostgreSQL
```
var pg = require('pg');
var config = {
    user: 'postgres',
    database: 'Shopping',
    password: '123',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
}
pool = new pg.Pool(config);
```

database: database name kết nối.

password: mật khẩu database.

Tiến hành connect với DB để thực hiện get data từ table để hiển thị lên page.

```
var express = require('express');
var router = express.Router();
// var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.connect(function(err, client, done){
        // Handle connection errors
        if(err) {
            console.log(err);
        }
        // SQL Query > Insert Data
        client.query('SELECT * FROM public.sinhvien', function (err, result) {
            done();
            if(err){
                return console.log('error running query', err);
            }
            console.log(result.rows.length);
            var productChuck = [];
            var chuckSize = 3;
            for (var i = 0; i < result.rows.length; i+=chuckSize){
                productChuck.push(result.rows.slice(i, i+chuckSize));
            }
            res.render('shop/index', { title: 'Online shop', products: productChuck });
        });
    });
});
```

![](https://images.viblo.asia/679c216d-0fff-41f4-b797-fa9c6823aee0.png)

## 3.2. Tạo trang thêm
```
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET add product page. */
router.get('/', function(req, res, next) {
        console.log(req.session.passport.user)
        res.render('shop/addProduct')
});

/* POST add product page. */
router.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
     pool.connect(function(err, client, done){
            // Handle connection errors
            if(err) {
                console.log(err);
            }

            var txtTitle = req.body.txtTitle;
            var txtImagePath = req.body.txtImagePath;
            var txtDescription = req.body.txtDescription;
            var txtPrice = req.body.txtPrice;
            var txtMade = req.body.txtMade;
            console.log("Title " + txtImagePath);
            // SQL Query > Insert Data
            client.query("INSERT INTO public.sinhvien(image_path, title, description, price, made) VALUES ('"+txtImagePath+"', '"+txtTitle+"', '"+txtDescription+"', '"+txtPrice+"', '"+txtMade+"')", function (err, result) {
                done();
                if(err){
                    return console.log('error running query', err);
                }

                res.redirect('../');
            });
        });
});

module.exports = router;
```

router.get('/', function(req, res, next)  method get dùng để hiển thị page add.

router.post('/', urlencodedParser, function (req, res)  method post nhận dữ liệu submit từ client lên server.

![](https://images.viblo.asia/1a3d3f4c-96e7-440f-990e-602b082dc536.png)

## 3.3. Tạo trang sửa
```
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET update product page. */
router.get('/:id', function(req, res, next) {
        pool.connect(function(err, client, done){
            // Handle connection errors
            if(err) {
                console.log(err);
            }

            var id = req.params.id;
            console.log(id);

            // SQL Query > Insert Data
            client.query("SELECT * FROM public.sinhvien where id = '"+id+"'" , function (err, result) {
                done();
                if(err){
                    return console.log('error running query', err);
                }

                console.log('Update: '+result.rows[0].title);
                // var userName = req.session.userName;
                res.render('shop/updateProduct', { title: 'Online shop', product: result.rows[0]});
            });
        });
});

/* POST update product page. */
router.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    pool.connect(function(err, client, done){

        // Handle connection errors
        if(err) {
            console.log(err);
        }

        var txtTitle = req.body.txtTitle;
        var txtImage_path = req.body.txtImagePath;
        var txtDescription = req.body.txtDescription;
        var txtPrice = req.body.txtPrice;
        var txtMade = req.body.txtMade;
        var id = req.body.id;
        console.log("ID UPDATE"+ id);

        // SQL Query > Insert Data
        client.query("UPDATE public.sinhvien SET image_path='"+txtImage_path+"', title='"+txtTitle+"', description='"+txtDescription+"', price='"+txtPrice+"', made='"+txtMade+"' WHERE id = '"+id+"'" , function (err, result) {
            done();
            if(err){
                return console.log('error running query', err);
            }
            
            res.redirect('../');
        });
    });


});
module.exports = router;
```
router.get('/:id', function(req, res, next)  method get theo id từ page request update.

![](https://images.viblo.asia/8b0fcb43-92f4-431c-b5d5-6fe11ccb9f9c.png)

Link source: https://github.com/JAV-DN-team/NodeJS_CRUD_Passport_HieuPV