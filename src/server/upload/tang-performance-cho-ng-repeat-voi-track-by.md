Một trong những thứ đầu tiên mà cơ bản nhất khi học Angular đó là `ngRepeat`:
```
<ul class="tasks">
    <li ng-repeat="task in tasks" ng-class="{done: task.done}">
        {{task.id}}: {{task.title}}
    </li>
</ul>
```

## Problem
Giờ giả định ta có một chức năng refresh lại data, mỗi khi click vào, ta thực hiện GET danh sách `task` và gán lại cho biến `tasks` trong controller:
`$scope.tasks = newTasksFromTheServer;`
Đoạn code trên sẽ buộc `ngRepeat` phải remove hết các `li` element hiện đang có và tạo lại chúng lần nữa, việc này sẽ rất tốn performance thao tác trên DOM nếu như có rất rất nhiều `li` hoặc cấu trúc template của `li` phức tạp như chứa nhiều filter, format, v.v...khiến cho đôi khi ta có cảm giác giật lag trên màn hình.

```
// View
<div ng-controller="TasksCtrl">
    <button ng-click="refresh()">Refresh Tasks</button> Click this to feel the delay, then change the HTML on the left to see the no-delay version that uses "track by"
    
    <ul class="tasks">        
        <li ng-repeat="task in tasks" task="task" class="task"></li>
        <!--<li ng-repeat="task in tasks track by task.id" task="task" class="task"></li>-->
    </ul>
</div>
```

```
// Controller
angular.module('myApp', [])
.controller('TasksCtrl', function($scope) {
    var date = new Date().toISOString();
    $scope.tasks = [];
    for (var i = 1; i < 13001; i++) {
        $scope.tasks.push({
            id: i,
            title: 'Task ' + i, 
            date: date
        });
    }
    
    $scope.refresh = function() {
        console.log("refreshing")
        $scope.tasks = angular.copy($scope.tasks);
    };
})
.directive('task', function() {
    return {
        scope: {
            task: '='
        },
        template: '{{ task.title }} <span class="time">({{ prettyTaskDate }})</span>',
        link: function(scope) {
            console.log('rendering', scope.task.id);
      
            scope.$watch('task.date', function() {
                scope.prettyTaskDate = moment(scope.task.date).fromNow();
            });
        }
    };
});
```

Câu hỏi đặt ra là tại sao lại như vậy ? Thực tế, `ngRepeat` thêm property `$$hashKey` vào mỗi task để tracking task đó. Nếu ta thay thế `tasks` ban đầu với một `tasks` object mới từ server, kể cả nội dung `tasks` mới đó chả khác gì `tasks` hiện tại, thì `ngRepeat` cũng vẫn sẽ không nhận ra bởi `tasks` mới sẽ không chứa `$$hashKey`, từ đó buộc phải render lại.

## Giải pháp tình thế
Giải pháp đầu tiên có thể nghĩ đến đó là, thay vì replace toàn bộ `tasks` bằng `tasks` mới, ta có thể giữ nguyên `$$hashKey` bằng cách loop qua `tasks` và chỉ cập nhật property.
Nghe có vẻ khá là cơ bắp nhỉ ? Chưa kể làm như vậy khá là khó đọc và khó để maintain.
```
$scope.refresh = function() {
   console.log("refreshing")
   var newTasks = $scope.tasks;
   $scope.tasks.forEach(function(t){
      var newTask = newTasks.find(function(nT){return nT.id === t.id});
      t.a = newTask.a;
      t.b = newTask.b;
      ...
   })
};
```

## Track by
Từ phiên bản Angular 1.2, một sự bổ sung được thêm vào cú pháp của `ngRepeat` đó là: mệnh đề `track by`. Nó cho phép ta tự chỉ định key để `ngRepeat` track objects thay vì key tự gen ra (`$$hashKey`). Thay đoạn trên bằng:
```
ng-repeat="task in tasks track by task.id"
```
như vậy ngRepeat sẽ biết `tasks` ban đầu và `updated tasks` là một và sẽ ko tạo lại DOM mà tái sử dụng chúng.

# KẾT LUẬN
### Tài liệu tham khảo
1. [https://www.codelord.net/2014/04/15/improving-ng-repeat-performance-with-track-by/](https://www.codelord.net/2014/04/15/improving-ng-repeat-performance-with-track-by/)