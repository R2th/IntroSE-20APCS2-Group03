Hầu hết các thư việc validate Javascript đều rất lớn và thường yêu cầu các thư viện đi kèm như jQuery.
Nhưng sự thật chúng ta không thể dùng hết những thứ được đi kèm trong các thư viện đó. Việc đó gây ra việc bạn cần dùng 1 file thư viện quá nặng trong project nhưng lại không dùng hết, điều đó gây ra lãng phí tài nguyên.
Vậy nên trong bài viết này, mình sẽ chỉ cho các bạn các cách validate một form trên Front-end một cách ngắn gọn và nhẹ nhất, có thể bạn sẽ không cần dùng đến những thư viện có sẵn nữa.

> Nhưng vẫn phải chú ý rằng, việc Validate trên Front-end có thể qua mặt bởi những người coder nhưng chính chúng ta. Vậy nên luôn luôn validate những dòng code của bạn trên Server nhé.
Trước hết chúng ta sẽ bắt đầu với những thứ cơ bản trước, hãy tìm hiểu Validate trên HTML thuần trước nhé.

Thông qua sự kết hợp giữa các loại đầu vào, cụ thể là các thẻ tag, ví dụ: 
```html
<input type="email">
```
Và các thuộc tính xác thực, chẳng hạn như **required** và **pattern**, các trình duyệt có thể xác thực hợp lệ các đầu vào biểu mẫu và cảnh báo cho người dùng khi họ làm sai.
Hỗ trợ các loại đầu vào và thuộc tính sẽ khác nhau theo từng loại trình duyệt, vậy đâu là cách để giải quyết và mẹo để tối đa hoá khả năng tương thích với trình duyệt với code của bạn?

## Xác thực văn bản

Giả sử bạn có một trường văn bản muốn người dùng phải nhập nó trước khi có thể gửi form đi. Thì chỉ cần thêm thuộc tính **required** vào thẻ tag input và các trình duyệt sẽ hỗ trợ cảnh báo người dùng bắt họ phải điền thứ gì đó vào =))

**HTML**
```html
<input type="text" required>
```

Và đây sẽ là kết quả của trình duyệt Chrome 
![](https://images.viblo.asia/f42faf19-30c4-49c6-8558-4f5b80c6aa94.png)

Nếu bạn muốn thêm số lượng kí tự tối thiểu và tối đa, hãy sử dụng **minlength** và **maxlength**. Ví dụ dưới đây yêu cầu người dùng phải nhập một đoạn văn bản nằm trong khoảng từ 3 đến 12 kí tự

```html
<input type="text" minlength="3" maxlength="12">
```
![](https://images.viblo.asia/323e09f6-be9d-42d6-ba15-5b348f9695e0.png)

Tiếp theo là thuộc tính **pattern**. Thuộc tính này cho phép bạn kiểm chứng Regex với giá trị đầu vào. Ví dụ nếu bạn yêu cầu mật khẩu chứa ít nhất 1 kí tự viết hoa, 1 kí tự viết thường và 1 chữ số, trình duyệt có thể xác thực điều đó cho bạn.

```html
<input type="password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required>
```

![](https://images.viblo.asia/2e177514-5e06-4e76-aeb9-5dfd514e6231.png)

Hình trên có cái thông báo cho người dùng là  *Match the requested format*. Nếu bạn muốn đổi cái thông báo đó thành một nội dung khác thì sao nhỉ? Hãy dùng thuộc tính **title**
Nếu bạn cung cấp một  thuộc tính **title** với **pattern**, giá trị của **title** sẽ được bao gồm trong bất kỳ thông báo lỗi nào nếu mẫu không khớp.

```html
<input type="password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number." required>
```

![](https://images.viblo.asia/e12dcb29-00f9-45c3-9708-15ab5ba32b2a.png)

## Xác thực số

Đối với thẻ input number thì nó chỉ cho phép bạn nhập các con số. Các trình duyệt sẽ từ chối chấp nhận các chữ cái và các ký tự khác hoặc cảnh báo người dùng nếu họ sử dụng chúng. Nhưng hãy cẩn thận, vì đối với **type="number"**, bạn vẫn có thể nhập vào kí tự trên hệ điều hành Ubuntu, còn trên Window thì hình như là chữ d. Vậy nên hãy cho nó thêm một thuộc tính **pattern** để chắc chắn chỉ được nhập số.

  ```html
<input type="number" pattern="[-+]?[0-9]">
  ```
  
  Theo mặc định. **number** chỉ cho phép chúng ta nhập vào số nguyên. Nhưng chúng ta có thể thay đổi điều đó, bạn có thể nhập vào số kiểu float với thuộc tính **step**. 
  
  Bạn cũng nên sửa đổi của bạn **pattern** để cho phép số thập phân.
  
  ```html
<input type="number" step="any" pattern="[-+]?[0-9]*[.,]?[0-9]+">
  ```
  Nếu các số phải nằm giữa một tập hợp các giá trị, trình duyệt có thể xác thực các số dựa trên hai thuộc tính **min** và **max**.
  
  ```html
<input type="number" min="3" max="42" pattern="[3-9]|[1-3][0-9]|4[0-2]">
```



{@embed: https://codepen.io/th-i-th-nh/pen/ebozeq}
## Xác thực Email và URL

Cách tốt nhất để xác thực email và URL là cung cấp cho trình duyệt một Regex.
Mẫu Regex dùng để xác thực email là một vấn đề khá sôi nổi. Vậy thì đâu mới là mẫu Regex để xác thực email chính xác nhất để thoả mãn thông số kỹ thuật [RFC822](http://jkorpela.fi/rfc/822addr.html)?

Bạn có tin dưới đây là cách tốt nhất?

```html
<input type="email" pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$">
```
Regex trên cho phép bạn không nhập phần mở rộng phía sau **@**. Nhưng bạn vẫn muốn yêu cầu người dùng nhập thì hãy sử dụng Regex sau:

```html
<input type="email" title="The domain portion of the email address is invalid (the portion after the @)." pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$">
```

Cũng giống như email, URL cũng sẽ validate tương tự.

```html
<input type="url" title="The URL is a missing a TLD (for example, .com)." pattern="^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$">
```

> Regex là một thứ gì đó rất vi diệu. Nếu bạn giỏi Regex, bạn sẽ làm được cơ số thứ đấy
> 

# Xác thực ngày tháng
Cái xác thực ngày tháng này không phải ai cũng biết. Hầu hết mọi người sẽ dùng thư viện. Nhưng...
có một vài loại đầu vào thực sự tuyệt vời không chỉ xác nhận ngày mà còn cung cấp các bộ chọn ngày gốc. Thật không may, Chrome, Edge và Mobile Safari là các trình duyệt duy nhất thực hiện nó. Firefox không áp dụng tính năng này.

Như trên, chúng ta có thể cung cấp một **pattern** cho trình duyệt

```html
<input type="date" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
```

Trong các trình duyệt hỗ trợ, ngày đã chọn được hiển thị như sau: **MM/DD/YYYY**. Nhưng value thực tế là trong định dạng này : **YYYY-MM-DD**.

Bạn nên cung cấp hướng dẫn cho người dùng các trình duyệt không được hỗ trợ về định dạng này. Một cái gì đó như "Vui lòng sử dụng định dạng YYYY-MM-DD."
{@embed: https://codepen.io/th-i-th-nh/pen/wRZWPj}

Nhưng chúng ta hoàn toàn có thể kiểm tra xem trình duyệt có hỗ trợ hay không để hiển thị cái message trên.

```html
<label for="date">Date <span class="description-date">YYYY-MM-DDD</span></label>
<input type="date" id="date" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">

<script>
  var isDateSupported = function () {
      var input = document.createElement('input');
      var value = 'a';
      input.setAttribute('type', 'date');
      input.setAttribute('value', value);
      return (input.value !== value);
  };

  if (isDateSupported()) {
      document.documentElement.className += ' supports-date';
  }
</scipt>

<style>
  .supports-date .description-date {
      display: none;
  }
</style>
```

{@embed: https://codepen.io/th-i-th-nh/pen/LMvZjZ}

Ok, vậy là bài viết của mình đến đây là hết. Lần sau mình sẽ hướng dẫn các bạn Validate sử dụng Validate API trong Javascript.
Hãy đón đọc nhé!
Happy hacking!!!