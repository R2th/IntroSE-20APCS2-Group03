![](https://images.viblo.asia/7f3291d5-0824-4f5b-96ec-39aa534b2f60.png)   

Giao tiếp giữa fragment và activity là một trong những phần rất quan trọng đối với một ứng dụng Android. Và nó có thể thực hiện được theo nhiều cách khác nhau. Nhưng mà khó khăn nhất vẫn là làm thế nào để thực hiện một cách đơn giản và tối ưu nhất.  Chúng ta có thể sử dụng `static field` nhưng nó lại có thể gây ra vấn đề về memory. Để tránh vấn đề về memory thì nhiều bạn có thể làm như sau:
```
(activity as MainActivity).passDataToAnotherFragment()
```
Với cách tiếp cận như trên thì fragment đã chỉ rõ đến một activity cụ thể. Như thế sẽ giảm tính tái sử dụng của fragment. Vậy đâu là cách nên được dùng?   
Google khuyến cáo chúng ta nên sử dụng `interface` (trước khi có `Viewmodel`). Để thực hiện chúng ta cần implement interface trong activity. Các fragment con sẽ chứa reference của interface được implement bởi activity. Data sẽ được truyền thông qua các phương thức của interface.   

![](https://images.viblo.asia/bf8531b0-5b91-41e1-9683-6fbe4da879c8.jpeg)    

Hãy giả sử bây giờ chúng ta có 2 interface nằm trên cùng một activity. Một fragment sẽ cho nhập số, fragment còn lại sẽ cho kết quả là 2 lần số nhập vào ở fragment đầu tiên. Activity sẽ hiển thị đoạn text kiểu như  **"Your input is 123"**   

![](https://images.viblo.asia/9d9f457f-7298-4a57-a8a6-f51f29e0cd39.gif)
Nếu xử lý theo cách sử dụng interface để gửi qua lại data như trên thì code của chúng ta sẽ bị phình to lên rất nhiều. Dẫn đến khó cho quá trình thực hiện maintain.   
# Easy way
Với sự xuất hiện của `Viewmodel` thì sẽ giải cứu cho chúng ta thoát khỏi trường hợp sử dụng `interface` như trên. Chúng ta chỉ cần tạo `Viewmodel` class . Sau đó tạo instance của Viewmodel trong activity. Khi đó thì viewmodel của chúng ta sẽ có thể sử dụng ở tất cả fragment con của acitivity đó.    

![](https://images.viblo.asia/c8b2b510-2f36-4a61-88de-a75cd1fdd2e6.jpeg)   

Tạo Viewmodel class:
```
class SharedViewModel:ViewModel(){
    val inputNumber = MutableLiveData<Int>()
}
```
Để sử dụng viewmodel đã tạo trong activity chúng ta phải sử dụng phương thức `ViewModelProvides.of()` như sau:
```
activity?.let {
    sharedViewModel = ViewModelProviders.of(it).get(SharedViewModel::class.java)
}

et_input.addTextChangedListener(object : TextWatcher {
    override fun afterTextChanged(p0: Editable?) {}

    override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {}

    override fun onTextChanged(txt: CharSequence?, p1: Int, p2: Int, p3: Int) {
        txt?.let {
            var input = 0
            if (txt.toString().isNotEmpty()) {
                input = txt.toString().toInt()
            }

            sharedViewModel?.inputNumber?.postValue(input)
        }
    }
```
Trong activity chúng ta chỉ cần tạo instance của Viewmodel và lắng nghe những thay đổi từ Livedata:
```
val sharedViewModel = ViewModelProviders.of(this).get(SharedViewModel::class.java)

sharedViewModel.inputNumber.observe(this, Observer {
    it?.let {
        // do some thing with the number
    }
})
```
Tiếp tục với fragment nhận kết quả của chúng ta. Thực hiện tương tự để cho fragment này để có thể lắng nghe sự thay đổi của dữ liệu. Nhưng  chúng ta phải tạo instance của viewmodel trong scope của activity. Nếu không android sẽ tạo 2 instance riêng biệt thay vì sử dụng cùng 1 instance của viewmodel.   
Output fragment:  
```
activity?.let {
    val sharedViewModel = ViewModelProviders.of(it).get(SharedViewModel::class.java)

    sharedViewModel.inputNumber.observe(this, Observer {
    it?.let {
            // do some thing with the number
        }
    })
}
```
Vừa rồi mình đã hướng dẫn các bạn làm thế nào để giao tiếp giữa fragment và activity sử dụng `viewmodel`.   
Happy coding!!! :stuck_out_tongue_winking_eye:   
Bài viết có tham khảo tại: https://medium.com/mindorks/how-to-communicate-between-fragments-and-activity-using-viewmodel-ca733233a51c