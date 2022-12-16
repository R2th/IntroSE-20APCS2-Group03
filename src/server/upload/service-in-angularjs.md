Trong loạt bài về AngularJS hôm nay mình xin chia sẻ với mọi người một topic khá hay và có lẽ mọi người từng làm từng đọc ở đâu đó: `Service in AngularJS`.
Về phần khái niệm cơ bản mình xin phép không giới thiệu nữa mà sẽ đi trực tiếp vào ví dụ cụ thể và phân tích ví dụ đó cùng mọi người nhé.
Trước tiên mình có một file sau: `// This file is app/scripts/services/services.js`

```
var services = angular.module('guthub.services', ['ngResource']);
services.factory('Recipe', ['$resource',
  function($resource) {
    return $resource('/recipes/:id', {
      id: '@id'
    });
  }
]);
services.factory('MultiRecipeLoader', ['Recipe', '$q',
  function(Recipe, $q) {
    return function() {
      var delay = $q.defer();
      Recipe.query(function(recipes) {
        delay.resolve(recipes);
      }, function() {
        delay.reject('Unable to fetch recipes');
      });
      return delay.promise;
    };
  }
]);
services.factory('RecipeLoader', ['Recipe', '$route', '$q',
  function(Recipe, $route, $q) {
    return function() {
      var delay = $q.defer();
      Recipe.get({
          id: $route.current.params.recipeId
      }, function(recipe) {
          delay.resolve(recipe);
      }, function() {
        delay.reject('Unable to fetch recipe '
    });
    return delay.promise;
  };
}]);
```

Trong đoạn code trên chúng ta đã tạo ra 3 service, trong đó có một recipe service, nó trả về những thứ mà chúng ta gọi trong Angular Resource.Trong đó có những RESTful resource nó trỏ tới RESTful server.
Angular Resource đóng gói $http service ở cấp thấp, vì thế bạn có thể tương tác với các objects trong code của bạn.Chỉ với một dòng code trả về: `return $resource`, chúng ta có thể đặt công thức như là argument trong bất kì controller nào của chúng ta, và nó sẽ được inject vào trong controller.Hơn nữa, mỗi công thức đối tượng có các method built in sau:

*  Recipe.get()
*  Recipe.save()
*  Recipe.query()
*  Recipe.remove()
*  Recipe.delete()

Lưu ý: Nếu bạn muốn sử dụng Recipe.delete, và bạn muốn app của bạn work trên IE, bạn sẽ gọi nó như sau: Recipe[delete].Đó là bởi vì delete là keyword trên IE.Rất thú vị phải không nào thỉnh thoảng chúng ta cũng gặp một vài rắc rối với IE như thế nhỉ!

Trong số các phương pháp trước đó, tất cả trừ truy vấn làm việc với một công thức; truy vấn trả về một mảng các công thức theo mặc định.Đoạn code khai báo resource `return $resource` cũng là một số ít điều thú vị cho chúng ta.

1. Lưu ý: id trong URL được chỉ định cho RESTful resource.Về cơ bản nó nói rằng khi bạn thực hiện bất kỳ truy vấn (say, Recipe.get ()), nếu bạn pass vào object một trường id, thì giá trị của trường đó sẽ được thêm vào cuối URL.
Có nghĩa là: gọi `Recipe.get({id: 15})` sẽ thực hiện cuộc gọi đến `/recipe/15.`

2. Còn object thứ hai đó là gì? {Id: @id}? Vâng, một dòng code là trị giá hàng ngàn lời giải thích, vì vậy hãy lấy một ví dụ đơn giản.
Giả sử chúng ta có đối tượng công thức, trong đó có các thông tin cần thiết đã được lưu trữ trong đó, kể cả id.Sau đó, chúng ta có thể lưu nó bằng cách đơn giản như sau:


```
// Assuming existingRecipeObj has all the necessary fields,
// including id (say 13)
var recipe = new Recipe(existingRecipeObj);
recipe.$save();
```

Nó sẽ tạo ra một POST request tới /recipe/13.

Các @id nói với chính nó để chọn id field từ đối tượng của nó và sử dụng nó như là tham số id.Đó là một cách hay để chúng ta có thể tiết kiệm một vài dòng code.

Như chúng ta đã viết còn có 2 service trong file `services in apps/scripts/services/services.js.`, cả 2 trong số đó đều là Load-ers, một load là RecipeLoader, và cái còn lại là MultiRecipeLoader.
Chúng được sử dụng khi chúng ta nối các routes.Tại core của chúng, cả đều hành xử khá giống nhau.Follow của các services là như sau:

1.Create một $q deferred object (có AngularJS promises, sử dụng cho chaining asyn‐chronous functions).
2.Tạo lời gọi tới server
3.Trả về deferred object khi server returns value.
4.Return promise sẽ được sử dụng bởi routing mechanism của AngularJS.

### Promises in an AngularJS land
Promise là một interface liên quan đến các đối tượng được trả về hoặc được điền vào điểm tương lai trong thời gian (về cơ bản, hành động không đồng bộ).
Ở cốt lõi của nó, một promise là một đối tượng có function then().

Để giới thiệu kĩ hơn, chúng ta hãy lấy một ví dụ mà chúng ta cần phải fetch profile hiện tại của người dùng:

```
var currentProfile = null;
var username = 'something';
fetchServerConfig(function(serverConfig) {
  fetchUserProfiles(serverConfig.USER_PROFILES, username, function(profiles) {
    currentProfile = profiles.currentProfile;
  });
});
```

Sẽ có vài vấn đề trong cách tiếp cận này:

1. Việc code khá là ác mộng đặc biệt là khi bạn phải thay đổi multiple calls.
2. Thông báo lỗi giữa callbacks và functions có khuynh hướng bị mất, trừ khi bạn handle nó và xử lí thủ công ở mỗi step.
3. Bạn phải gói gọn logic những gì bạn muốn làm với currentP.

Promises giải quyết những issues đó.Trước khi chúng ta đi vào việc làm thế nào, chúng ta hãy cùng nhìn vào vấn đề implement promises:

```
var currentProfile = fetchServerConfig().then(function(serverConfig) {
  return fetchUserProfiles(serverConfig.USER_PROFILES, username);
}).then(function(profiles) {
  return profiles.currentProfile;
}, function(error) {
  // Handle errors in either fetchServerConfig or
  // fetchUserProfiles here
});
```

Lưu ý những lợi thế sau:
1. Bạn có thể gọi các function calls, vì vậy không hẳn mọi thứ là ác mộng.
2. Bạn được đảm bảo rằng các lời gọi function call trước đó được hoàn thành trước khi các function tiếp theo trong chuỗi được gọi.
3. Mỗi lời gọi then() có 2 argument(có cả functions).Đầu tiên là gọi callback thành công thứ hai là handler lỗi.
4. Trong trường hợp lỗi trong chuỗi, lỗi sẽ được truyền qua phần còn lại của
error handlers. Vì vậy, bất kỳ lỗi nào trong callbacks có thể được handle cuối cùng.

Điều gì sẽ được giải quyết hoặc reject, bạn có hỏi như thế không? Vâng, deferred trong AngularJS là một cách tạo ra promises. Gọi cách giải quyết trên nó đáp ứng promise (gọi success handler), 
trong khi call reject trên lời gọi handle error của promise.
Hy vọng ví dụ nhỏ ở trên sẽ giúp ích cho công việc của các bạn.
Tham khảo từ cuốn sách: "AngularJS - Brad Green & Shyam Seshadri" chapter 4