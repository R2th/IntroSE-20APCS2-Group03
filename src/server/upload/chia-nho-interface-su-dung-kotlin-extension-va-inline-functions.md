Interface segregation: Nguyên lý thứ 4 trong SOLID

Robert C Martin nổi tiếng với biệt danh “*Uncle Bob*” đã định nghĩa các nguyên lý SOLID - là những nguyên lý cần tuân theo khi xây dựng phần mềm để dễ mở rộng và dễ bảo trì hơn. [SOLID](https://en.wikipedia.org/wiki/SOLID) là một từ viết tắt và mỗi chữ cái biểu thị một nguyên lý thiết kế hướng đối tượng. Trong bài viết này, chúng ta sẽ tập trung vào chữ cái “I” (trong SOLID giải thích ý tưởng về chia nhỏ Interface.

Vậy nguyên lý chia nhỏ Interface nói gì:

“Class con không bị buộc phải implement các method mà nó không sử dụng.”
Hoặc có thể hiểu: “Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể”

Hãy lấy ví dụ về interface [TextWatcher](https://developer.android.com/reference/android/text/TextWatcher). Interface này được sử dụng rộng rãi trong quá trình phát triển khi chúng ta muốn nhận các event khi người dùng thay đổi chữ/text trong EditText.
Ví dụ: Cần hiển thị thông báo Toast nội dung của EditText khi người dùng nhập ký tự vào EditText.
Ở đây, chúng ta buộc phải implement cả 3 function của interface TextWatcher. Code sẽ như thế này:

```swift
binding.editText.addTextChangedListener(object: TextWatcher {
    override fun beforeTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
        //NO OP
    }

    override fun onTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
        showToast(charSequence.toString())
    }

    override fun afterTextChanged(charSequence: Editable?) {
        //NO OP
    }

})
```

Ở đây, chúng ta chỉ cần function **onTextChanged** để hiển thị Toast. Chúng ta không cần các function **beforeTextChanged** và **afterTextChanged** và việc implement 2 function này vi phạm nguyên lý chia nhỏ Interface.

Bây giờ câu hỏi đặt ra: Làm thế nào chúng ta có thể chia nhỏ các function trong TextWatcher và chỉ sử dụng function onTextChanged.

Với sự trợ giúp của Extension function trong Kotlin và inline function, chúng ta hãy tối ưu hóa code để tuân theo nguyên lý chia nhỏ interface.

Bắt đầu với việc tạo một [Extension](https://kotlinlang.org/docs/extensions.html) function onTextChanged. Việc này sẽ thêm function vào lớp EditText và chúng ta có thể sử dụng nó ở bất cứ đâu chúng ta cần:

```swift
inline fun EditText.onTextChange(crossinline listener: (String) -> Unit) {
    this.addTextChangedListener(object: TextWatcher {
        override fun beforeTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
            //NO OP
        }

        override fun onTextChanged(charSequence: CharSequence?, p1: Int, p2: Int, p3: Int) {
            listener(charSequence.toString())
        }

        override fun afterTextChanged(p0: Editable?) {
            //NO OP
        }

    })
}
```

Extension function này được sử dụng như sau:

```scala
binding.editText.onTextChange {
    showToast(it)
}
```

Chúng ta có thể sử dụng cùng một cách tiếp cận khi chúng ta đang cố gắng triển khai các interface chứa rất nhiều function và chúng ta chỉ cần sử dụng một / hai function trong đó. Sử dụng cách tiếp cận này sẽ làm cho mã ngắn gọn và hiệu quả hơn.


Nguồn: [medium](https://medium.com/@vinayjohn/achieving-interface-segregation-in-android-using-kotlin-extension-and-inline-functions-f99f952fa6ca)