# Tạo một "Pure router JS" cho một Single Page Application
Single Page Application (SPA) đang là một xu hướng rất phát triển trong lập trình web hiên nay. Là một web developer, chắc hẳn chúng ta đều không quá xa lạ với khái niệm này. Với sự phát triển ngày càng mạnh của các library, framework, cụ thể là 3 cái tên nổi bật nhất là: ReactJS, VueJS và Angular, đã hỗ trợ việc tạo ra các SPA một cách nhanh chóng, hiệu quả hơn.
![image.png](https://images.viblo.asia/da0e9088-7636-40d7-a38c-78e4a11a4971.png)
Rõ ràng không thể phủ định được độ tiện dụng cũng như độ dễ hiểu, dễ sử dụng của các library, framework kia mang lại. Tuy nhiên, chính vì chúng quá dễ sử dụng khiến cho các newbie frontend dev hay bị phụ thuộc vào chúng quá nhiều và không hiểu được cách các library, framework đó hoạt động như thế nào. Vì thế, ở bài viết dưới đây, chúng ta hãy cùng nhau đi tìm hiểu cách tạo một Router (xương sống của một SPA) bằng Javascript thuần.
## Các bước tạo ra một Router cho SPA
### 1: Tạo các file cần thiết
Để tạo ra một cấu trúc đơn giản, chúng ta cần tạo ra 3 file: 
1. File index.html 
    * Các thẻ `ul` và `li`  sẽ tạo ra menu đơn giản
    *  Phần `script` sẽ nhúng 2 file `routing.js`, `app.js`, `jquery` và nhúng `App()` sẽ là phần nội dung thay đổi theo đường dẫn
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Routing with pure Javascript</title>
    </head>
    <body>
    <div class="container-app">
        <div>
            <ul>
                <li><a href="javascript:App.navigateTo('/home')">Home</a> </li>
                <li><a href="javascript:App.navigateTo('/aboutus')">About US</a> </li>
                <li><a href="javascript:App.navigateTo('/contactus')">Contact US</a> </li>
                <li><a href="javascript:App.navigateTo('/services')">Services</a> </li>
            </ul>
        </div>
    </div>

    <script src="{{cdn}}/jquery.js"></script> 
    <script src="{{localhost}}/js/vendor/routing.js"></script>
    <script src="{{loclahost}}/js/app.js"></script>
    <script>
        $(document).ready(function () {
            if(App){
                App.init();
            }
        });
    </script>
    </body>
    </html>
    ```
2.  File app.js
    * Ở file này, chúng ta sẽ khai báo các router, mối router cần xác định được đường dẫn dẫn tới router đó và dữ liệu trả về.
    * Ở các router này, chúng ta có thể dễ dàng lấy được `title`, `id` tuỳ thuộc vào từng đường dẫn, từ đó có thể dùng các dữ liệu này làm tham số để `GET` dữ liệu về từ API
    ```js
    var App = {};

    var addRoutes = function () {
        $NB.addRoute('/books/:id', function (params) {
            console.log('Route is ', params.Title, params.id);
        }, 'books');

        $NB.addRoute('/:category/:id', function (params) {
            console.log('Route is ', params.Title, params.category, params.id);
        }, 'category');

        $NB.addRoute('/:category/:id/:action', function (params) {
            console.log('Route is ', params.Title, params.category, params.id, params.action);
        }, 'category action');


        $NB.addRoute(['/', '/:pagename'], function (params) {
            console.log('Route is ', params.Title, params.pagename);
        }, 'page');
    };



    App.init = function () {
        addRoutes();
        $NB.loadController(location.pathname);
    };

    App.navigateTo = function (pageUrl) {
        $NB.navigateTo(pageUrl);
    };
    ```

3. File js-routing
    * File này sẽ chưa các `function` cần thiết dùng trong file `app.js`
    ```js
    //Tự gọi các router tương ứng với các đường dẫn
    (function (window) {
    //khai báo một object rỗng
    var $M = {};
    //mảng các router, trong các router sẽ chứa đường dẫn và `function` thực thi
    $M.RoutingList = [];
    //Kiểm tra trạng thái của các trang
    $M.currentPage = '';

    //Khai báo class `RoutingClass` và các thuộc tính
    var RoutingClass = function (u, f, t) {
        this.Params = u.split('/').filter(function(h){ return h.length > 0; });
        this.Url = u;
        this.Fn = f;

        this.Title = t;
    };


    //Hàm kiểm tra sẽ trả về 'false' hoặc url params
    //sẽ phân tích cú pháp url và tìm các tham số từ `location.href` 

    var checkParams = function (urlParams, routeParams) {
        var paramMatchCount = 0, paramObject = {};

        for(var i =0 ; i < urlParams.length ; i++){
            var rtParam = routeParams[i];
            if(rtParam.indexOf(':') >= 0){
                paramObject[rtParam.split(':')[1]] = urlParams[i];
                paramMatchCount += 1;
            }
        }

        if(paramMatchCount === urlParams.length){
            return paramObject;
        }

        return false;
    };


    //thực hiện 'function(s)' theo 'url' tương ứng
    //cùng với các tham số đã phân tích được
    //Ví dụ:
    //:     /:page/:pageid 
    //:     /home/3434434
    //giá trị page=>home và pageid=>3434434
    $M.loadController = function (urlToParse) {
        if($M.currentPage !== urlToParse) {
            $M.previousPage = $M.currentPage;
            $M.currentPage = urlToParse;
            var uParams = urlToParse.split('/').filter(function (h) {
                return h.length > 0;
            });
            var isRouteFound = 0;
            for (var i = 0; i < $M.RoutingList.length; i++) {
                var routeItem = $M.RoutingList[i];
                if (routeItem.Params.length === uParams.length) {
                    var _params = checkParams(uParams, routeItem.Params);
                    if (_params) {
                        _params.Title = routeItem.Title;
                        isRouteFound += 1;
                        routeItem.Fn.call(null, _params);
                    }
                }
            }
        }else{
            console.log('you are on same page dude!!!!');
        }
    };


    //sử dụng chức năng pushSate của browser để điều hướng (thay đổi url)
    //và thực hiện các hàm tương ứng
    $M.navigateTo = function (navigateTo) {
        window.history.pushState(null, null, navigateTo);
        $M.loadController(navigateTo);
    };

    //thêm 'url' và 'function' vào routing list 
    $M.addRoute = function (urlToMatch, fnToExecute, t) {
        if(typeof urlToMatch === 'string'){
            $M.RoutingList.push(new RoutingClass(urlToMatch, fnToExecute, t));
        }else if(typeof urlToMatch && urlToMatch instanceof Array){
            urlToMatch.forEach(function (lItem) {
                $M.RoutingList.push(new RoutingClass(lItem, fnToExecute, t));
            });
        }

    };

    window.$NB = $M;
    })(window);
    ```
### Tổng kết
Như vậy, chỉ cần với 3 file đơn giản trên, bạn đã có thể bắt đầu tạo ra một SPA cho mình. Giờ đây, bạn chỉ cần định dạng lại cái router, viết các hàm render các giao diện tương ứng và đưa chúng vào khung sườn đã có bên trên bằng jquery.

Link tham khảo:  https://gist.github.com/muralikrishnat/9c7049fda1a3708c780c