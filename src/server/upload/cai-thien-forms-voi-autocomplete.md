## Overview
Ở bài viết này, chúng ta sẽ tìm hiểu làm sao để cải thiện forms để thân thiện với người dùng hơn. Những trình duyệt Web hiện nay có một tính răng rất cool đó là [Autofill](https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill).
Người dùng sẽ đánh giá cao khi các trang web tiết kiệm thời gian cho họ bằng cách tự động điền vào các trường phổ biến như tên, địa chỉ email và hơn thế nữa, việc tự động - autocomplete còn giúp cho chúng ta cải thiện những lỗi input đầu vào cơ bản.
Vậy hãy cùng tìm hiểu về autocomplete và cải thiện sự trải nghiệm của người dùng trên trang web của bạn nhé.
##### Bạn sẽ học được gì?
:white_check_mark: Cách sử dụng các thuốc tính autocomplete để tận dụng tính năng autofill

:white_check_mark: Practices để cải thiện performance những forms của bạn.
##### Cần chuẩn bị những gì?
* Chrome Ediotor hoặc một editor nào đó mà bạn thích (Atom, VS Code, Sublime, etc...)
* Một chút kiến thức về GIT và Chrome DevTools

## Sample Code
Bạn có thể tải tất cả code mẫu về máy tính ở link này:

[:arrow_down: Tải xuống ZIP file](https://github.com/greenido/autocomplete-codelab/archive/master.zip)

hoặc clone từ Github repo bằng command line:
```cmd
$ git clone https://github.com/greenido/autocomplete-codelab.git
```

#### Chạy sample app
Sau khi tải hoặc clone code mẫu về, hãy mở nó lên bằng editor của bạn.

Ở đây mình dùng VS Code, nên mình cài thêm 1 extension nữa là Live Server để chạy nó.

Nếu bạn không dùng VS Code, có thể bạn phải cần set up 1 local web server. Có thể sử dụng XAMPP hoặc MAMP.
Sau khi chạy thì bạn sẽ được một trang như thế này.
![](https://images.viblo.asia/1f44e6fa-50ab-4eec-ac04-c3f104534aba.png)
## Xây dựng FORM
> Code hoàn thiện của step này trong thư mục **completed/step1**.

Ở một form cơ bản chúng ta sẽ mỗi input các thuộc tính là name, id và class. Mở thư mục code của bạn và hãy tạo một file là *index.html*, thêm vào nó đoạn code sau:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Autocomplete codelab</title>
</head>

<body>
  <div role="main">
    <form method="post" id="usrForm">
      <div class="form-group">
        <label for="frmNameA">Name</label>
        <input name="name" id="frmNameA">
      </div>
      
      <div class="form-group">
        <label for="frmEmailA">Email</label>
        <input type="email" name="email" id="frmEmailA">
      </div>

      <div class="form-group">
        <label for="frmEmailC">Confirm Email</label>
        <input type="email" name="emailC" id="frmEmailC">
      </div>

      <div class="form-group">
        <label for="frmPhoneNumA">Phone</label>
        <input type="tel" name="phone" id="frmPhoneNumA">
      </div>
    </form>
  </div>
</body>
</html>
```
Sau đó mở nó lên, bạn sẽ thấy như sau:
(Tất nhiên là bạn phải thêm CSS nữa, bạn có thể sử dụng css trong sample code hoặc là tự viết nhé)
![](https://images.viblo.asia/d6d8c658-c6e9-4f38-9886-bb52f565231d.png)
## Thêm thuộc tính autocomplete
Ở những form cơ bản chúng ta sẽ thêm vào mỗi thẻ input thuộc tính autocomplete. Thuộc tính này sẽ thông báo cho trình duyệt biết loại data nào mà bạn mong muốn với thẻ input tương ứng. Ví dụ như email, fullname, phone, etc...
Hãy thêm vào file *index.html* mà bạn đã thêm ở trên đoạn code sau:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Autocomplete codelab</title>
</head>
<body>
  <div role="main">
    <form method="post" id="usrForm">
      <div class="form-group">
        <label for="frmNameA">Name</label>
        <input name="name" id="frmNameA" autocomplete="name">
      </div>
      
      <div class="form-group">
        <label for="frmEmailA">Email</label>
        <input type="email" name="email" id="frmEmailA"          
        autocomplete="email">
      </div>

      <div class="form-group">
        <label for="frmEmailC">Confirm Email</label>
        <input type="email" name="emailC" id="frmEmailC"
        autocomplete="email">
      </div>

      <div class="form-group">
        <label for="frmPhoneNumA">Phone</label>
        <input type="tel" name="phone" id="frmPhoneNumA"
        autocomplete="tel">
      </div>
    </form>
  </div>
</body>
</html>
```
Và chúng ta sẽ được:
![](https://images.viblo.asia/9e4a6392-f837-4e75-865d-1c835d08fd19.png)

## Thêm placeholder và required
Chúng ta sẽ thêm cho mỗi thẻ input các thuộc tính placeholder và required.
Thêm vào file index.html của bạn như sau:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Autocomplete codelab</title>
</head>
<body>
  <div role="main">
    <form method="post" id="usrForm">
      <div class="form-group">
        <label for="frmNameA">Name</label>
        <input name="name" id="frmNameA"  autocomplete="name"
        placeholder="Full name" required>
      </div>
      
      <div class="form-group">
        <label for="frmEmailA">Email</label>
        <input type="email" name="email" id="frmEmailA"          
        autocomplete="email"
        placeholder="name@example.com" required>
      </div>

      <div class="form-group">
        <label for="frmEmailC">Confirm Email</label>
        <input type="email" name="emailC" id="frmEmailC"
        autocomplete="email"
        placeholder="name@example.com" required>
      </div>

      <div class="form-group">
        <label for="frmPhoneNumA">Phone</label>
        <input type="tel" name="phone" id="frmPhoneNumA"
        autocomplete="tel"
        placeholder="+1-650-450-1212" required>
      </div>
    </form>
  </div>

</body>
</html>
```
Và kết quả sẽ trông như thế này:
![](https://images.viblo.asia/e00d0c6a-03fe-4918-9699-bed359f0f8bf.png)

## Tổng kết

##### Chúng ta đã thực hiện được những gì

:white_check_mark: Cách sử dụng các thuốc tính autocomplete để cải thiện form

:white_check_mark: Practices để cải thiện UX (placeholder, required)

Như vậy chúng ta đã áp dụng các thuộc tính như autocomplete, required và placeholder
 vào trong một thẻ input.
Có thể nói các thuộc tính này là cần thiết khi chúng ta sử dụng forms.
Tuy nhiên tùy vào từng spec của dự án mà chúng ta có thể không sử dụng autocomplete hay required.
Nên đây chỉ là một cách cơ bản để giúp bạn cải thiện chất lượng, tính tương tác của người dùng trên site.
Nếu bạn muốn học thêm về điều này, bạn có thể học thêm [tại đây](https://www.udacity.com/course/building-high-conversion-web-forms--ud890)
Cám ơn các bạn đã đọc bài viết.