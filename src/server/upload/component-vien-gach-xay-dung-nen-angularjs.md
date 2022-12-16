Trong AngularJS, Component là một dạng directive đặc biệt, sử dụng dễ dàng hơn, phù hợp với cấu trúc của ứng dụng
Việc sử dụng component rất thuận tiện trong việc xây dựng cấu trúc WEB, tuơng thích cực mạnh với DOM
Ưu điểm:
- config đơn giản hơn so với directives
- tối ưu hóa dựa trên cấu trúc thành phần
- dễ dạng trong việc nâng cấp
Trường hợp không nên sử dụng component:
- đối với những directives mà cần thực hiện những hành động trong quá trình compile hoặc pre-link, bởi vì, thời điểm đó chúng chưa tồn tại
- Khi bạn muốn dùng directives để kích hoạt các thuộc tính hoặc Css class chứ không phải 1 element

:satisfied::satisfied::satisfied::satisfied::satisfied:

Trên đây là sách dạy như vậy, còn theo mình thì component đơn giản là 1 KHỐI, Khối này bao gồm 2 thành phần core: Controller và View(View dùng để hiển thị và làm nền, controller sẽ quản lí các hoạt động của View).
Khối này độc lập, thể hiện một nhóm chức năng có liên quan, có thể nhúng vào nhiều nơi, có thể chứa các component khác, có khả năng truyền dữ liệu với phía bên ngoài component.

Vậy làm sao để tạo ra một Component? Đơn giản, chỉ cần xây dựng xong 2 phần core của nó :Controller và View

Chúng ta cần 1 file .html để làm View và 1 file .Js để làm controller
```
//hero.html
<div>
    <span >{{$ctrl.name}}</span>
</div>
```


```
//hero.js
angular.module('App')
  .component('hero', {
    templateUrl: hero.html',
    controller: 'heroController',
    bindings: {
    
    }
    }).controller('heroController', ['$scope', function($scope) {
        var _this = this;
        _this.name = 'Lion';
    }})
```

đã xong, vậy là chúng ta đã có một component không thể đơn giản hơn, với chức năng là hiển thị tên một Hero( ở đây là 'lion'), rất độc lập, có thể nhúng vào khắp nơi mà App quản lí.
Ví dụ nhúng :
```

//app.html
<div>
    <hero></hero>
 </div>
```

Sau khi compile, chúng ta sẽ có đoạn html như sau
```
<div ng-app=""App>
    <div>
        <span >Lion</span>
    </div>
</div>
```
 Chú ý:
 - Ở controller là _this.name thì ở view dùng là $ctrl.name
 - Code chỉ hoạt động trong phạm vi quản lí bởi ng-app

Giờ tiếp theo mình sẽ demo việc truyền data đối với component:
Để truyền data, chúng ta sử dụng binding, chi tiết về binding anh em có thể tham khảo ở [cơ chế binding trong Angular](https://viblo.asia/p/cac-kieu-binding-data-trong-angularjs-1-3Q75wq3GZWb)

Rồi, test thử nhé =))
```
//hero.html
<div>
    <span >{{$ctrl.name}}</span>
</div>
```


```
//hero.js
angular.module('App')
  .component('hero', {
    templateUrl: hero.html',
    controller: 'heroController',
    bindings: {
        name: '<'
    }
    }).controller('heroController', ['$scope', function($scope) {
        var _this = this;
    }})
```

Rồi vẫn nhúng vào app.html, nhưng nhớ truyền tham số
```

//app.html
<div>
    <hero name="Lion"></hero>
 </div>
```


Kết quả thu được vẫn như trên:

```
<div ng-app=""App>
    <div>
        <span>Lion</span>
    </div>
</div>
```

Truyền vào rồi thì thử truyền ra nhỉ :v: 

```
//hero.html
<div>
    <span >{{$ctrl.name}}</span>
</div>
```


```
//hero.js
angular.module('App')
  .component('hero', {
    templateUrl: hero.html',
    controller: 'heroController',
    bindings: {
        name: '<',
        level: '='
    }
    }).controller('heroController', ['$scope', function($scope) {
        var _this = this;
        _this.level = _this.level + 1;
    }})
```

Nhúng vô nào:
```
//index.js
$scope.level = 1
```


```
<div ng-app="App">
    <hero name="Lion" level="$scope.level"></hero>
    {{$scope.level}}
 </div>
```
Kết quả:
```
<div ng-app=""App>
    <div>
        <span>Lion</span>
        2
    </div>
</div>
```

Vậy là chúng ta đã xem qua cấu trúc cơ bản của một component, việc sử dụng component sẽ làm project của chúng ta dễ dàng maintain và quản lí hơn. Hi vọng m.n có một trải nghiệm thú vị!!!!!