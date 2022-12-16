Validate một bộ dữ liệu trên form trước khi submit đến server là một trong những nhiệm vụ phổ biến nhất trong ứng dụng web. Trong ASP.NET Core bạn có thể dễ dàng làm được điều đó với sự hỗ trợ của validation attribites và tag helpers. Tuy nhiên, đôi khi bạn cần phụ trách xử lý validate phía client theo chiến lược của riêng mình. Cho ví dụ, bạn có thể xây dựng một Single page application (SPA) và muốn validate dữ liệu sử dụng tính năng của HTML5. Cuối cùng bài biết này sẽ thảo luận làm thế nào để có thể sử dụng các tính năng validate của form HTML5 trong TypeScript và ASP.NET Core.

Trước khi chúng ta thực hiện viết bất kì dòng code nào, hãy nhanh chóng giới thiệu vấn đề mà ta sẽ giải quyết. Quan sát hình bên dưới:

![](https://images.viblo.asia/33e70ac2-b860-469e-83be-12297f2bcc4e.png)

Form bao gồm 2 textbox và một button. Cả hai trường input đều sử dụng các attribute của HTML5 như ```readonly```, ```minlength```, and ```maxlength``` để validate input. Bất kỳ khi nào có lỗi về validate thì một custom error message sẽ được hiển thị bên cạnh input. Một list tất cả error message trong form được hiện thị ở cuối của trang.

Bây giờ bạn biết cái gì chúng ta cần làm, hay xem code HTML makup tạo nên form này.

```html
<form id="form1" asp-controller="Home" asp-action="Index2">
    <label for="name">Name : </label>
    <br />
    <input id="name" name="name" type="text" 
minlength="3" maxlength="10" 
pattern="^[A-Za-z]+$" required />
    <span id="msgName"></span>
    <br />
    <label for="age">Age : </label>
    <br />
    <input id="age" name="age" type="number" 
min="18" max="100" required />
    <span id="msgAge"></span>
    <br /><br />
    <button id="submit" type="submit">Submit</button>
</form>
<br />
<ul id="errorList"></ul>
```

Textbox **Name** có các attributes ```minlength```, ```maxlength```, ```pattern```, và ```required```. Trường này yêu cầu length nằm trong khoảng 3 đến 10 kí tự, ```pattern``` quy định name chỉ chứa các kí tự hoa, thường alphabet.

Textbox **Age** có các attributes ```min```,```max``` và ```required```. **Age** yêu cầu trong khoảng 18 đến 100.

Tạo một ứng dụng ASP.NET Core MVC mới và thêm code HTML trên vào file ```index.cshtml```. Hai action ```Index()``` và ```Index2()``` lần lượt thực hiện hiển thị và submit form:

```csharp
public IActionResult Index()
{
    return View();
}

[HttpPost]
public IActionResult Index2()
{
    ViewData["Message"] = "Form data received 
on the server";
    return View("Index");
}
```

Với action ```Index2()``` chỉ đơn giản là lưu một message trong ```ViewData``` để chỉ ra dữ liệu từ form đã truyền đến server.

Bây giờ chạy ứng dụng (chúng ta chưa viết bất kỳ code client nào) và click button **Submit**.

![](https://images.viblo.asia/07b287e4-cdfd-425c-842c-087b41a7f8cd.png)

Ở đây, khi click button trình duyệt sẽ kích hoạt validation. Textbox mà gây ra lỗi sẽ được highlight và một message được hiển thị trên popup. Chú ý rằng ở giai đoạn này trình duyệt hiển thị error message của riêng nó (nghĩa là có thể mỗi trình duyệt có thể có một error mesage khác nhau).

Bây giờ chúng ta muốn tùy chỉnh message này. Chúng ta cũng mong muốn thêm error message ở cấp độ input cũng như ở cấp độ form như đã chỉ ra ở hình đầu tiên.

Tạo một folder tên là TypeScript bên trong ```wwwroot``` và thêm một file TypeScript là ```FormValidation.ts```. Nếu dùng Visual studio nó sẽ nhắc bạn cài đặt ```Microsoft.TypeScript.MSBuid NuGet package```

![](https://images.viblo.asia/f459747c-301f-4d54-aea4-ff819bbf53c5.png)

Bây giờ, thêm một type alias trên đầu của file .ts như bên dưới:

```ts
type ValidationMessages = Partial<Record<'valueMissing' | 
'tooShort' | 'tooLong' | 'rangeUnderflow' | 
'rangeOverflow' | 'typeMismatch' | 'patternMismatch', 
string>>;
```

Ở đây, chúng ta tạo một type alias được gọi là ```ValidationMessages``` sử dụng 2 kiểu TypeScipt - ```Partial``` và ```Record```. Type ```Record``` cho phép chúng ta tạo một dictionary với một tập cố định keys và value của nó với type chỉ định. Trong ví dụ này chúng ta định nghĩa 7 key cố định. Những key này được lấy từ thuộc tính ```ValidityState``` của HTML5. Chúng ta làm điều này để đơn giản hóa logic validation sẽ được thảo luận sau.

Thêm một class TypeScript đặt tên là ```FormValidation``` như bên dưới:

```ts
class FormValidator {

}
```

Chúng ta viết một cặp methods bên trong class ```FormValidator```. Method đầu tiên xử lý cấp độ input được gọi là ```setValidationMessages()```. Code của nó như sau:

```ts
public setValidationMessages(ctrlID: string, msgEleID: string,
    messages: ValidationMessages) {

    let element:any = document.querySelector("#" + ctrlID);

    element.addEventListener("input", (evt) => {

        let flag: boolean;

        if (element.validity.valueMissing) {
            if (typeof messages.valueMissing !== "undefined") {
                element.setCustomValidity(messages.valueMissing);
                flag = true;
            }
        }

        if (element.validity.tooShort) {
            if (typeof messages.tooShort !== "undefined") {
                element.setCustomValidity(messages.tooShort);
                flag = true;
            }
        }

        if (element.validity.tooLong) {
            if (typeof messages.tooLong !== "undefined") {
                element.setCustomValidity(messages.tooLong);
                flag = true;
            }
        }

        if (element.validity.rangeUnderflow) {
            if (typeof messages.rangeUnderflow !== "undefined") {
                element.setCustomValidity(messages.rangeUnderflow);
                flag = true;
            }
        }

        if (element.validity.rangeOverflow) {
            if (typeof messages.rangeOverflow !== "undefined") {
                element.setCustomValidity(messages.rangeOverflow);
                flag = true;
            }
        }


        if (element.validity.patternMismatch) {
            if (typeof messages.patternMismatch !== "undefined") {
                element.setCustomValidity(messages.patternMismatch);
                flag = true;
            }
        }

        if (element.validity.typeMismatch) {
            if (typeof messages.typeMismatch !== "undefined") {
                element.setCustomValidity(messages.typeMismatch);
                flag = true;
            }
        }

        if (flag) {
            document.querySelector("#" + msgEleID).
innerHTML = element.validationMessage;
        }
        else {
            element.setCustomValidity("");
            document.querySelector("#" + msgEleID).innerHTML = "";
        }
    });
}
```

Method ```setValidationMessages()``` chấp nhận tham số. ```ctrlID``` là ID của textbox được validate, ```msgElelID``` là ID của thẻ ```<span>``` nơi để hiện thị error message cấp độ filed (textbox). ```message``` chứa key-value của error validate và custom error message. Type của tham số message là ```ValidationMessages```.

Bên trong, chúng ta lấy ra textbox bằng việc sử dụng phương thức ```querySelector()```. Tiếp theo, thêm một input event handler cho textbox sử dụng phương thức ```addEventListener()```. Input event sẽ được bắn ra khi value của element thay đổi. Event handler này cho chúng ta cơ hội để tùy chỉnh error message mặc định của trình duyệt.

Input event handler chứa một loạt các kiểm tra thuộc tính validity của element. Cho ví dụ, thuộc tính ```valueMissing``` return ```true``` nếu textbox có attribute required và value của nó là rỗng. Để thiết lập một custom error message chúng ta sử dụng phương thức ```setCustomValidity()``` của element. Phương thức ```setCustomValidity()``` chấp nhận một chuỗi validation message để hiển thị cho lỗi cụ thể. Chúng ta nhận custom message này từ các giá trị ```ValidationMessages```. Chúng ta cũng thiết lập một biến boolean để sử dụng về sau.

Khi việc kiểm tra error hoàn tất chúng ta kiểm tra trạng thái của biến boolean. Nếu flag là true chúng ta hiển thị validation error message của element trong thẻ ```span```.

Một điều cũng quan trọng là thông báo tới trình duyệt khi không có lỗi về validation. Ta làm điều này bằng cách gọi phương thức ```setCustomValidity()``` với một chuỗi rỗng. Tag ```span``` cũng được xóa đi các thông báo lỗi.

Ở giai đoạn này chúng ta có thể sử dụng class ```FormValidator``` để thấy được custom error messages. Để làm như vậy, chắc chắn project phải được compile như vậy sẽ có output là file ```FormValidation.js```

![](https://images.viblo.asia/10fc60c1-ed69-4fdc-8cf1-113e0eadea38.png)

Bây giờ đi đến file ```Index.cshtml``` và thêm tham chiếu ```<script>``` đến file ```FormValidation.js``` trước tag ```</body>```

```html
<script src="~/FormValidation.js"></script>
```

Tiếp theo thêm một khối ```<script>``` như bên dưới:

```js
window.onload = function () {

    let obj = new FormValidator();

    obj.setValidationMessages("name", "msgName", {
        valueMissing: "Name must be specified",
        tooShort: "Name is too short",
        tooLong: "Name is too long",
        patternMismatch:"Only alphabets allowed"
    });


    obj.setValidationMessages("age", "msgAge", {
        valueMissing: "Age must be specified",
        rangeUnderflow: "Age must be minimum of 18 years",
        rangeOverflow: " Age must be less than 100 years"
    });
}
```

Ở đây, chúng ta đã thêm một số code đến onload event handler. Code tạo ra một object của class ```FormValidator```. Tiếp theo gọi phương thức ```setValidationMessages()```.

Bạn cũng có thể thêm một số css để format error message:

```css
<style>
     span, ul {
        color: red;
        font-weight: bold;
        margin-left:5px;
    }
</style>
```

Bây giờ ta chạy ứng dụng và điền một số giá trị không hợp lệ trong cả hai textbox. Bạn nên thấy custom error message như bên dưới:

![](https://images.viblo.asia/a3aef943-dff8-4a35-98cd-b5ae4caa1baf.png)

Bạn phải chú ý rằng error message trên popup của trình duyệt chỉ hiển thị khi bạn nhấn button Submit. Click button submit chỉ là để xác nhận popup cũng phản ánh custom error message của bạn.

![](https://images.viblo.asia/3906ad91-edbc-4889-8c6d-8abbcb4131a1.png)

Ok. Bây giờ hãy thêm hỗ trợ cho validation cấp độ form.

Mở class ```FormValidator``` trở lại và thêm một phương thức khác được gọi là ```showValidationSummary()```. Bạn hãy quan sát code bên dưới:

```ts
showValidationSummary(formID:string, listID:string) {
    let form :any = document.querySelector("#" + formID);
    let errList = document.querySelector("#" + listID);
    errList.innerHTML = "";

    if (!form.checkValidity()) {

        for (let i = 0; i < form.elements.length; i++) {

            let element = form.elements[i];

            if (!element.checkValidity()) {
                errList.insertAdjacentHTML('beforeend', "<li>" + element.validationMessage + "</li>");
            }
        }
    };
  
    form.reportValidity();
}
```

Phương thức ```showValidationSummary()``` chấp nhận 2 tham số. ```formID``` là ID của element form. ```listID``` là ID của element sẽ hiển thị danh sách error message.

Bên trong, chúng ta kiểm tra phương thức ```checkValidity()```. Phương thức này return false, nếu có một hoặc nhiều validation error trong form ngược lại nó return true.

Bây giờ chúng ta cần gọi ```showValidationSummary()``` từ view Index. Như vậy, thêm phần code gọi phương thức này trong ```windown.onload``` event handler:

```js
window.onload = function () {

    let obj = new FormValidator();

    obj.setValidationMessages("name", "msgName", {
        valueMissing: "Name must be specified",
        tooShort: "Name is too short",
        tooLong: "Name is too long",
        patternMismatch:"Only alphabets allowed"
    });

    obj.setValidationMessages("age", "msgAge", {
        valueMissing: "Age must be specified",
        rangeUnderflow: "Age must be minimum of 18 years",
        rangeOverflow: " Age must be less than 100 years"
    });

    let submitBtn = document.querySelector("#submit");

    submitBtn.onclick = function () {
        obj.showValidationSummary("form1", "errorList");
    }
}
```

Chạy ứng dụng một lần nữa và kiểm tra xem phần hiển thị error message ở cấp độ form có hoạt đông hay không

![](https://images.viblo.asia/03ed7d5c-dde4-4600-b3cf-3566230df9d6.png)

# Kết
Bài viết này đã giới thiệu cho các bạn các kết hợp validate của HTML5 thuần và code TypeScript, đồng thời hướng dẫn làm cách nào để tùy chỉnh những validate này. Hy vọng sẽ có ích với các bạn mới làm quen về validate trong ứng dụng web.

**Bài viết được dịch từ nguồn:**

[Client Side Form Validations Using TypeScript For Beginners](http://www.binaryintellect.net/articles/472e496b-e7e6-4c68-b979-2e08386895af.aspx)