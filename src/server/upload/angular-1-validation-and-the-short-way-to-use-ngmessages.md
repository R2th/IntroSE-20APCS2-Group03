Chào các bạn, hôm nay chúng ta cùng đi tìm hiểu cách bắt validate trên client bằng Angular 1. Hẳn khi làm dự án thì việc validate trên client sẽ gặp rất nhiều, giờ chúng ta sẽ cùng nhau tìm hiểu tổng quát nội dung của bài viết hôm nay:
* Giới thiệu cách validate thông thường.
* Sử dụng ng-messages để validate.
* Cách viết ng-messages để có thể kế thừa lại.

# Yêu cầu cơ bản

* Bài viết sẽ sử dụng app Rails và Angular 1.
* Các bạn tự cài đặt Angular 1 với Rails nhé, nếu chưa biết cách cài thì tham khảo: https://viblo.asia/p/cau-hinh-de-angular-1-chay-voi-rails-Az45bNgw5xY
# Cách validate client cơ bản

Cách validate client cơ bản nhất trên view chính là gì. Sử dụng `ng-show` của Angular JS.
Để có thể validate một form bất kỳ thì cần:
* đặt name cho form đó.
* thêm điều kiện validate cho form.

Giả sử chúng ta có view như sau:
```html
<form>
  <input type="text" name="staffName" />
</form>
```
Input trên là nhập tên của staff vào, ta muốn validate:

* Bắt buộc nhập tên vào.
* Độ dài text tối thiểu.
* Độ dài text tối đa.

thì sử dụng:

* required
* ng-minlength
* ng-maxlength

```html
<form name="staffForm">
  <input type="text" name="staffName" ng-model="staff.name" ng-minlength="3" ng-maxlength="8" required />
  <p ng-show="staffForm.staffName.$error.minlength">Staffname have to have min-length is 3</p>
  <p ng-show="staffForm.staffName.$error.maxlength">Staffname have to have max-length is 8</p>
  <p ng-show="staffForm.staffName.$error.minlength">Staffname should be required</p>
</form>
```

Giải thích thêm về form trên:

* Đặt tên cho form là staffForm.
* Khởi tạo ng-model cho input staffName là staff.name.
* Thêm các điều kiện `required`, `ng-minlength`, `ng-maxlength` vào cho input staffName.
* Khi nhập text vào cho input staffName thì form sẽ tiến hành validate, nếu có lỗi sẽ gửi vào `staffForm.$error` (Trong này sẽ chứa 1 array các lỗi của form)

Để có thể xem list các error thì các bạn có thể thêm dòng này vào view:
```
{{staffForm.$error}}
```
Nếu muốn xem bằng console.log thì thêm button vào như sau:
```html
<form name="staffForm" ng-controller="RegisterUserController as vm">
  <input type="text" name="staffName" ng-model="staff.name" ng-minlength="3" ng-maxlength="8" required />
  <p ng-show="staffForm.staffName.$error.minlength">Staffname have to have min-length is 3</p>
  <p ng-show="staffForm.staffName.$error.maxlength">Staffname have to have max-length is 8</p>
  <p ng-show="staffForm.staffName.$error.minlength">Staffname should be required</p>
  <button type="submit" ng-click="vm.showFormError(staffForm)">Create staff</button>
</form>
```

Trong file angular của bạn:

```javascript
vm.showFormError = function(staffForm) {
  console.log(staffForm.$error);
}
```

# Cách validate client với ngMessages

Tương tự yêu cầu như trên, nhưng với ngMessages thì chúng ta sử dụng như sau:
```html
<form name="staffForm" ng-controller="RegisterUserController as vm">
  <input type="text" name="staffName" ng-model="staff.name" ng-minlength="3" ng-maxlength="8" required />
  <div ng-messages="staffForm.staffName.$error">
    <p ng-message="minlength">Staffname have to have min-length is 3</p>
    <p ng-message="maxlength">Staffname have to have max-length is 8</p>
    <p ng-message="required">Staffname should be required</p>
  </div>
  <button type="button" ng-click="vm.showFormError(staffForm)">Create staff</button>
</form>
```

Ngoài ra bạn cần phải required `ngMesssages` vào trong app nữa:

*  Tải https://github.com/angular/bower-angular-messages/blob/master/angular-messages.min.js về, bỏ vào thư mục javascripts/lib rồi required nó vào layout nhé.
*  Sau đó thêm require `ngMessages` vào trong app.

Thế thôi là chạy ngon rồi.

# Cách viết ngMessages hay hơn

Phần này mình học hỏi được từ một cậu bạn trong dự án, nay xin phép được chia sẻ lại cho các bạn. Đầu tiên, mình nêu những nhược điểm của cách viết `ngMessages` vừa sử dụng trên:

* Hiện tại cứ với mỗi attribute cần validate thì ta lại phải thêm một `div với ng-mesages như trên` nữa. Do đó, việc gọi đi gọi lại một đoạn code như vậy làm cho code dài, khó fix bug sau này. ( xem ví dụ dưới để thấy sự trùng lặp code)

```html
<form name="staffForm" ng-controller="RegisterUserController as vm">
  <input type="text" name="staffName" ng-model="staff.name" ng-minlength="3" ng-maxlength="8" required />
  <div ng-messages="staffForm.staffName.$error">
    <p ng-message="minlength">Staffname have to have min-length is 3</p>
    <p ng-message="maxlength">Staffname have to have max-length is 8</p>
    <p ng-message="required">Staffname should be required</p>
  </div>
  <input type="email" name="staffEmail" ng-model="staff.email" ng-minlength="3" ng-maxlength="8" required />
  <div ng-messages="staffForm.staffEmail.$error">
    <p ng-message="minlength">Staff email have to have min-length is 3</p>
    <p ng-message="maxlength">Staff email have to have max-length is 8</p>
    <p ng-message="required">Staff email should be required</p>
  </div>
  <button type="button" ng-click="vm.showFormError(staffForm)">Create staff</button>
</form>
```
Vì vậy cần viết như sau để tối ưu hoá code và sử dụng cho nhiều trường hợp khác nhau:

1. Tạo một component với tên error_messsage.js:
```javascript
"use strict";

angular.module("corporationApp")
  .component("errorMessages", {
    templateUrl: "error-messages-template.html",
    bindings: {
      messages: "<",
      attribute: "@"
    }
  })
```
2. Require nó vào layout.
3. Vào layouts/applicationapplication.html.erb (sẽ phụ thuộc vào tuỳ trường hợp dự án của bạn đang sử dụng layout nào nhé): Kiểm tra có dòng này chưa, nếu chưa thì thêm vào:

```
<%= yield(:javascripts) %> # Mục đích của việc thêm này để angular có thể lấy được templateURL
```

4. Tạo file error_message.html.erb với nội dung:

```html
<%= content_for :javascripts do %>
<script type="text/ng-template" id="error-messages-template.html">
    <div ng-messages="$ctrl.messages">
        <p ng-messages="required">
            {{$ctrl.attribute}} should be required
        </p>
        <p ng-messages="minlength">
            {{$ctrl.attribute}} have to have min-length is 3
        </p>
        <p ng-messages="maxlength">
            {{$ctrl.attribute}} have to have max-length is 8
        </p>
    </div>
</script>
<% end %>
```

5. Bên trang view hiện tại của chúng ta, thay từ:
```html
<form name="staffForm" ng-controller="RegisterUserController as vm">
  <input type="text" name="staffName" ng-model="staff.name" ng-minlength="3" ng-maxlength="8" required />
  <div ng-messages="staffForm.staffName.$error">
    <p ng-message="minlength">Staffname have to have min-length is 3</p>
    <p ng-message="maxlength">Staffname have to have max-length is 8</p>
    <p ng-message="required">Staffname should be required</p>
  </div>
  <input type="email" name="staffEmail" ng-model="staff.email" ng-minlength="3" ng-maxlength="8" required />
  <div ng-messages="staffForm.staffEmail.$error">
    <p ng-message="minlength">Staff email have to have min-length is 3</p>
    <p ng-message="maxlength">Staff email have to have max-length is 8</p>
    <p ng-message="required">Staff email should be required</p>
  </div>
  <button type="button" ng-click="vm.showFormError(staffForm)">Create staff</button>
</form>
```

thành: ====>

```html
<form name="staffForm" ng-controller="RegisterUserController as vm">
  <input type="text" name="staffName" ng-model="staff.name" ng-minlength="3" ng-maxlength="8" required />
  <error-messages messages="staffForm.staffName.$error" attribute="staffName">
  </error-messages>
  <input type="email" name="staffEmail" ng-model="staff.email" ng-minlength="3" ng-maxlength="8" required />
  <error-messages messages="staffForm.staffEmail.$error" attribute="staffEmail">
  </error-messages>
  <button type="button" ng-click="vm.showFormError(staffForm)">Create staff</button>
</form>
```

Thế là xong, rất ngắn đúng không ạ, chúng ta có thể tái sử dụng một templateURl cho nhiều điều kiện hiển thị như nhau.
Và ngoài ra còn có thể thêm các options khác vào như điều kiện hiển thị lỗi,  I18N, ...
Mình đã thử và thành công, các bạn test thử xem sao nhé:

![](https://images.viblo.asia/3cad1bc8-269f-4928-a59e-2aadd3fd632a.png)


Giả sử giờ mình cần thêm điều kiện hiển thị cho các text_field trên thì làm như thế này:

1. Trong component vừa viết, thêm điều kiện hiển thị:
```javascript
"use strict";

angular.module("corporationApp")
  .component("errorMessages", {
    templateUrl: "error-messages-template.html",
    bindings: {
      messages: "<",
      attribute: "@",
      conditionForShow: "<"
    }
  })
```

2. Sau đó, trên view thêm `condition-for-show` cho từng `error-messsages`:
```html
<form name="staffForm" ng-controller="RegisterUserController as vm">
  <input type="text" name="staffName" ng-model="staff.name" ng-minlength="3" ng-maxlength="8" required />
  <error-messages messages="staffForm.staffName.$error" attribute="staffName" condition-for-show="staffForm.staffName.$touched">
  </error-messages>
  <input type="email" name="staffEmail" ng-model="staff.email" ng-minlength="3" ng-maxlength="8" required />
  <error-messages messages="staffForm.staffEmail.$error" attribute="staffEmail" condition-for-show="staffForm.staffEmail.$touched>
  </error-messages>
  <button type="button" ng-click="vm.showFormError(staffForm)">Create staff</button>
</form>
```

3. Trong template cũng thêm điều kiện hiển thị với `ng-show`:

```html
<%= content_for :javascripts do %>
<script type="text/ng-template" id="error-messages-template.html">
    <div ng-messages="$ctrl.messages">
        <p ng-messages="required" ng-show="$ctrl.conditionForShow">
            {{$ctrl.attribute}} should be required
        </p>
        <p ng-messages="minlength" ng-show="$ctrl.conditionForShow">
            {{$ctrl.attribute}} have to have min-length is 3
        </p>
        <p ng-messages="maxlength" ng-show="$ctrl.conditionForShow">
            {{$ctrl.attribute}} have to have max-length is 8
        </p>
    </div>
</script>
<% end %>
```

Vậy là xong, giờ các bạn test thử thì lỗi sẽ không hiển thị lên ngay khi chưa nhập input nữa mà chỉ hiển thị khi user đã nhập nhé.

Cảm ơn các bạn đã theo dõi, hẹn gặp lại ở phần khác!