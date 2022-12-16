### I. Giới thiệu
Giao tiếp hay truyền dữ liệu giữa các thành phần trong ứng dụng là một trong những chủ đề quan trọng nhất của những lập trình viên và điều đó có thể được thực hiện thông qua rất nhiều cách. Nhưng làm sao để làm điều đó dễ dàng và tối ưu nhất thì cũng không phải điều dễ dàng. Chúng ta có thể sử dụng "static filed" nhưng điều đó có thể làm tốn bộ nhớ. 
### II. Bắt đầu
Như vấn đề vừa đề cập ở trên. Để tránh vấn đề bộ nhớ, nhiều lập trình viên sẽ sử dụng
```
(activity as MainActivity).passDataToAnotherFragment()
```
Vấn đề gặp phải của cách này là gì? Nó gắn fragment với một activity cụ thể và nó làm giảm khả năng tái sử dụng lại. Vậy cách được khuyến khích là gì?
Google đã khuyến khích dùng interface [link tham khảo](https://developer.android.com/training/basics/fragments/communicating#DefineInterface). 
Đối với cách này, chúng ta phải sử dụng interface trong activy.class, các fragment con sẽ phải giữ tham chiếu interface vừa được implement. Dữ liệu sẽ được truyền trong các phương thức của interface

![](https://images.viblo.asia/8111b7d1-a5f1-4c2a-8b44-b427f55b88e0.jpeg)

                         h1. Luồng hoạt động của việc truyền dữ liệu sử dụng interface
                                           
Giả sử chúng ta có 2 fragment trong 1 activity, 1 fragment để nhập text, và 1 fragment để hiển thị. Activity sẽ hiển thị thông tin chúng ta nhập vào. Ví dụ

![](https://images.viblo.asia/2e0881bb-e124-4960-8b7c-a01ed6103a76.gif)

Chúng ta cùng nhau đi thực hiện điều này. 
Chúng ta sẽ sử dụng ViewModel để giúp chúng ta thực hiện điều trên,
Chúng ta chỉ cần tạo ViewModel class và tạo instance trong fragment nhưng sử dụng trong phạm vi activity để chúng có thể có sẵn cho tất cả các fragment của activity bao gồm cả activity đó

![](https://images.viblo.asia/3aad46ba-3c4e-4dbb-8d3c-e698ef3b5930.jpeg)

Create ViewModel class

```
class SharedViewModel:ViewModel(){
    val inputNumber = MutableLiveData<Int>()
}
```

Để truyền dữ liệu nhập từ fragment , hãy tạo ViewModel thuộc phạm vi của activity. Để làm điều này, chúng ta truyền tham số activty như là parameter của phương thức ViewModelProvides.of(). Ví dụ:

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

Trong Activity chúng ta chỉ cần tạo thực thể của ViewModel và observe những dữ liệu như sau:

```
val sharedViewModel = ViewModelProviders.of(this).get(SharedViewModel::class.java)

sharedViewModel.inputNumber.observe(this, Observer {
    it?.let {
        // do some thing with the number
    }
})
```

Bây giờ ouput của fragment2 là gì? Chúng ta có thể làm tương tự cho fragment2 để quan sát dữ liệu. Nhưng hãy nhớ rằng chúng ta cần tạo ViewModel trong phạm vi của activity, nếu không thì Android sẽ tạo một instance riêng biệt thay vì chia sẻ cùng một instance và chúng ta sẽ không nhận được dữ liệu.

Ví dụ cho fragment2

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

### Tổng kết
Đây là một cách truyền dữ liệu khác giữa fragment và activity bên cạnh các chúng ta thường dùng là sử dụng interface.
Bài viết được tham khảo tại: https://medium.com/mindorks/how-to-communicate-between-fragments-and-activity-using-viewmodel-ca733233a51c