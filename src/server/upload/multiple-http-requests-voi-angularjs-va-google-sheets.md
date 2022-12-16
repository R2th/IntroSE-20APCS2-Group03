Trong bài viết này, tôi sẽ giới thiệu cách lấy data từ cùng lúc nhiều Google Sheets URL bằng AngularJS. 
## Google Sheets dạng JSON
Trước tiên là chuẩn bị dữ liệu Google Sheets. 

![](https://images.viblo.asia/1dc8c678-6aa4-4bbd-b5cd-038124d1db8d.png)
![](https://images.viblo.asia/e821cdbd-66fc-40b3-bf9a-15c48ca1dbc3.png)
Sau khi published sheet:
![](https://images.viblo.asia/5d59e0d2-8618-4da9-8642-1d24bca064ce.png)
![](https://images.viblo.asia/bf60af7f-16b8-4b31-a9e3-65ce14192f4f.png)

Tìm mã định danh trong URL:
```
https://docs.google.com/spreadsheets/d/1vFAgyxmwrKWn9Bss3vmk5GKqn1QEZVspVTg6eMINMcc/pubhtml
Unique Identifier: 1vFAgyxmwrKWn9Bss3vmk5GKqn1QEZVspVTg6eMINMcc
```
Rồi paste vào `unique-identifier` dưới đây:
```
https://spreadsheets.google.com/feeds/list/unique-identifier/1/public/values?alt=json
```
```
https://spreadsheets.google.com/feeds/list/1vFAgyxmwrKWn9Bss3vmk5GKqn1QEZVspVTg6eMINMcc/1/public/values?alt=json
```
Dữ liệu trả về có dạng:

![](https://images.viblo.asia/5879cb8c-b4fd-470a-9645-7b167a28c565.png)
![](https://images.viblo.asia/31fcd149-78d2-4c75-9fb5-dc28552ff3cb.png)

## Multiple Requests
Thông thường để lấy data, với mỗi Url ta sẽ gửi một request, nhưng nếu dữ liệu nằm trong hai sheet khác nhau, ví dụ một sheet chứa thông tin thời tiết cho từng ngày (weather), sheet còn lại phân loại các kiểu thời tiết (types). Yêu cầu là tạo một filter, hiển thị ngày có thời tiết chọn trong filter. Vậy cần gửi request để lấy types, và thêm 1 request nữa để lấy weather theo type đã chọn - không hay chút nào. Vì vậy, cần tìm cách khác để lấy dữ liệu từ 2 sheet đó cùng lúc. Thật may là AngularJS có hỗ trợ việc này bằng cách sử dụng $q, nó sẽ lấy dữ liệu từ mỗi request, sau đó trả tất cả dữ liệu vào cùng một respond. Đoạn mã dưới đây trong Controller mô tả việc này.
```
  var app = angular.module('myApp', []);
  app.controller('agencyCtrl', function($scope, $q, $http) {

    $scope.googleData =[];

    $q.all([
      $http.get(url1),
      $http.get(url2)
    ]).then(function(results) {
       /* enter your logic here */
       console.log(results);
    });
  });
```
Dữ liệu trả về của các URL được trả về chung một respond, tạo scope object `$scope.googleData` để lưu trữ từng kết quả. Dữ liệu trong bảng weather lưu vào `$scope.googleData.weather`, bảng types lưu trong `$scope.googleData.types`. Tôi sẽ cho hiện thị dạng JSON của record weather và type đã chọn ra màn hình. Điều này có ích khi muốn thay đổi dữ liệu trên sheet.

```
  var app = angular.module('myApp', []);
  app.controller('agencyCtrl', function($scope, $q, $http) {

      $scope.googleData =[];

      $q.all([
        $http.get('https://spreadsheets.google.com/feeds/list/1wD869kOVqY5y8FGsPwomQTKs0ZazOQwSy4M57MCnSZ8/1/public/values?alt=json'),
        $http.get('https://spreadsheets.google.com/feeds/list/1wD869kOVqY5y8FGsPwomQTKs0ZazOQwSy4M57MCnSZ8/2/public/values?alt=json')
      ]).then(function(results) {
         /* enter your logic here */

         /* store data from sheet 1  */
        $scope.googleData.weather = results[0].data.feed.entry;
        
        /* create data structure and store data from sheet 2  */
        weatherTypeData = results[1].data.feed.entry;

          var weatherTypes = [];

          angular.forEach(weatherTypeData, function(value, key){
            var newWeatherType = {
              'name' : value.gsx$type.$t
            };
            weatherTypes.push(newWeatherType);
          });
          $scope.googleData.types = weatherTypes;
      });

      console.log($scope.googleData);
  });
```

View:
```
<!DOCTYPE html>
<html>

  <head>
    <script data-require="angular.js@1.6.2" data-semver="1.6.2" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular.js"></script>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>

  <body>
    <div ng-app="myApp" ng-controller="agencyCtrl" id="xml">
      <h3>Weather</h3>{{googleData.weather[0]}}
      <h3>Types</h3>{{googleData.types[0]}}
      <h3>Example:</h3>

      filter: {{filterItem.types}}            <br />
      <select ng-model="filterItem.types">
        <option value="">All</option>
        <option ng-repeat="type in googleData.types" value="{{type.name}}">{{type.name}}</option>
      </select>
      <div ng-repeat="weather in googleData.weather | filter: {gsx$type:{$t:filterItem.types}}">
        {{weather.gsx$date.$t}} - {{weather.gsx$temp.$t}} - {{weather.gsx$type.$t}}
      </div>
    </div>
  </body>

</html>
```

Xem demo tại [đây](https://plnkr.co/edit/R7bcwlEne0YFmfarLWmW?p=preview).

Nguồn: [spin.atomicobject.com](https://spin.atomicobject.com/2017/07/27/http-requests-angularjs-google-sheets/)