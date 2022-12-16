Thông thường chúng ta hay validate các Edittext theo kiểu sau : 
```
  etUser.addTextChangedListener(object: TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                val content = etUser?.text.toString()
                etUser?.error = if (content.length >= 6) null else "Minimum length = 6"
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) { }
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) { }
        })
```
Khi edittext chúng ta nhập vào có độ dài ít hơn 6 thì sẽ hiện như thế này !

![](https://images.viblo.asia/7db3c332-2e41-48ff-91de-a51f743a3134.jpg)

Nếu trường hợp trong app có nhiều edittext cần validate thì chúng ta phải code lại ở trên nhiều lần. Nhưng với kotlin chỉ cần chúng ta sử dụng [Extension Functions](https://kotlinlang.org/docs/reference/extensions.html) thì có thể làm code ngắn gọn và có thể sử dụng nhiều chỗ khác nhau.
Ví dụ :
```
etUser.validate({ s -> s.length >= 6 }, "Minimum length = 6")
```
Chúng ta chỉ cần tạo 1 file EdittextExt.kt và viết như sau : 
```
fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object: TextWatcher {
        override fun afterTextChanged(s: Editable?) {
            afterTextChanged.invoke(s.toString())
        }

        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) { }

        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) { }
    })
}
```
Sử dụng như sau : 
```
 etUser.afterTextChanged{
            etUser.error = if (it.length >= 6) null else "Minimum length = 6"
        }
```
Chúng ta có thể làm ngắn gọn hơn nữa bằng cách thêm đoạn này ở file EdittextExt.kt
```
fun EditText.validate(validator: (String) -> Boolean, messageError: String) {
    this.afterTextChanged {
        this.error = if (validator(it)) null else messageError
    }
}
fun String.isValidLenght(): Boolean  = this.length >= 6
```
Đoạn trên giúp chúng ta thực hiện việc kiểm tra với 1 case bất kỳ mà chúng ta muốn, ví dụ ở đây là `isValidLenght()`.Nếu sai sẽ trả về 1 messageError.
Khi sử dụng chỉ cần viết như sau :
```
etUser.validate({ etUser -> etUser.isValidLength() }, "Minimum length = 6")
```
hoặc có thể :
```
etUser.validate({ s -> s.length >= 6 }, "Minimum length = 6")
```
Kết quả : 

![](https://images.viblo.asia/7705f905-4d9e-48cf-b38e-8690f5dab3c7.gif)

Cảm ơn các bạn đã đọc bài của mình .

Nguồn : [Đây](https://proandroiddev.com/easy-edittext-content-validation-with-kotlin-316d835d25b3)