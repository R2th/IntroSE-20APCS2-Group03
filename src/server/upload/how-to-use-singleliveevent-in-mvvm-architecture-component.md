## Introduction
**SingleLiveEvent.** **Tại sao tôi nên sử dụng nó? Chết tiệt! SingleLiveEvent là cái quái gì vậy?** 

Để tôi bắt đầu bằng câu hỏi tại sao chúng ta nên sử dụng SingleLiveEvent/LiveEvent trong ứng ụng MVVM của mình. Trong khi tìm kiếm cách làm tốt nhất cho quá trình truyền thông giữa các activities/fragments và ViewModel, tôi ghé qua github issue này và tôi nhận được giải pháp tốt nhất mà tôi có thể tìm thấy. Như vậy về cơ bản LiveEvent được sử dụng để gửi đi events/actions tới fragment/activity của bạn từ chính ViewModel của mình, do đó hãy quên đi cách sử dụng callbacks.

## What’s wrong with callbacks anyway?
Quá trình sử dụng callbacks giữa ViewModel và View đẩy bạn đến việc phá vỡ MVVM, do rất nhiều trong chúng ta giờ đây chỉ thực hiện MVP với ViewModel như là một presenter. Ví dụ, bạn đã đi theo MVP mà không phải MVVM, nó cũng là nguyên nhân của vấn đề khi bạn cần sử dụng ViewModel của mình cho các fragments khác nhau của cùng một activity, một phần xuất phát từ điều này bạn cũng sẽ phải xóa bỏ callback giao phó cho phương thức **OnCleared** của ViewModel, cái lần nữa là một sự rắc rối.
## How is SingleLiveEvent is better?
Nếu bạn theo dõi blog của Jose Alcerreca [ở đây](https://medium.com/google-developers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150), bạn sẽ biết chính xác tại sao, trong điều kiện đơn giản, SingleLiveEvent là một lớp con của MutableLiveData với một Observer duy nhất lắng nghe nó tại một thời điểm. Do đó nó nhận biết được vòng đời của view(activity/fragment). Tôi đã sử dụng nó trong project của mình vài lần và có một cuộc sống dễ dàng hơn. Bạn có thể tìm thấy SingleLiveEvent code [ở đây](https://github.com/googlesamples/android-architecture/blob/dev-todo-mvvm-live/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/SingleLiveEvent.java).

## How to use SingleLiveEvent?
Đây là làm thế nào tôi đã sử dụng SingleLiveEvent trong project của mình:

1. Thêm lớp SingleLiveEvent vào mã nguồn của mình. SingleLiveEvent không phải là một phần trong thư viện Android Architecture Lifecycle Component và do đó phạn phải thêm nó vào mã nguồn của mình. Tạo một lớp với tên SingleLiveEvent.kt và paste đoạn code [này](https://github.com/googlesamples/android-architecture/blob/todo-mvvm-live-kotlin/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/SingleLiveEvent.kt) vào đó.
2. Sau đó chúng ta sẽ tạo một **sealed** class gọi là BaseCommand.kt, bạn có thể tìm hiểu về **sealed classes** [ở đây](https://kotlinlang.org/docs/reference/sealed-classes.html). Trong các điều khoản của các lớp **sealed** thông thường là khá giống với enums trong java và chúng ta sử dụng nó để tạo các events khác nhau từ cùng một ViewModel.

```
sealed class BaseCommand {

    class Error(val errorString: String): BaseCommand()
 
    class Success(val toastMessage: String?): BaseCommand()
   
}
```

3. Đoạn code bên trên trình bày một **sealed** class trong kotlin cái tôi sẽ sử dụng như một kiểu suy luận(inferred type) cho SingleLiveEvent của mình. Điều này để đảm bảo rằng một SingleLiveData duy nhất có thể nhận được nhiều events xảy ra trong một ViewModel.
4. Đoạn code bên dưới trình bày cách sử dụng SingleLiveEvent với sealed class bên trên trong một ViewModel có tên là ApiViewModel.

```
class ApiViewModel @Inject constructor(private val apiRepository: Api,
                                         private val sharedPrefRepository: SharedPref)
    : ViewModel(),
        LifecycleObserver {

val command: SingleLiveEvent<BaseCommand> = SingleLiveEvent()
.
.
.
private fun startNetworkRequest(flag: String) {
    showProgressBar()
    apiRepository.verifyPhone(phone = phone.get()!!,
            country = selectedCountryCode!!,
            flag = flag)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .doOnSuccess {
                command.value = BaseCommand.Success("Network connection successfull")
            }
            .subscribe({
                hideProgressBar()
            }, { t: Throwable? ->
                command.value = BaseCommand.Error("Some error occured")
                Timber.d(t?.message)
                hideProgressBar()
            })
}
.
.
.
}
```

Đoạn code bên trên chứa rất nhiều thứ, nhưng để dễ hiểu, bạn chỉ cần tập trung vào những dòng này:

```
val command: SingleLiveEvent<BaseCommand> = SingleLiveEvent()
```

Chúng ta khởi tạo SingleLiveData của mình ở đây với BaseCommand như là một kiểu suy diễn(inferred type), do đó chúng ta có thể nhận được events của các loại con của BaseCommand. Bạn cũng có thể có một Int, String hoặc bất cứ loại nào nhưng điều đó sẽ hạn chế bạn từ các thay đổi được lắng nghe trong các giá trị của Int hoặc String, sử dụng sealed class ở đây là rất sạch và nó giúp bạn gửi các giá trị với rất nhiều kiểu khác nhau.

```
command.value = BaseCommand.Success("Network connection successfull")

command.value = BaseCommand.Error("Some error occured")
```

Ở đây chúng ta đang thay đổi các giá trị của SingleViewModelEvent, điều này sẽ được lắng nghe bởi View.

5. Giờ đây chúng ta sẽ cần lắng nghe các thay đổi trong SingleLiveEvent từ bên ngoài View giống như này:

```
apiViewModel.command.observe(this, Observer {
    when(it) {
        is BaseCommand.Success -> 
                 val snackBar = Snackbar.make(view, it.toastMessage.toString(), Snackbar.LENGTH_INDEFINITE)
snackBar.setAction("Okay", { snackBar.dismiss() })
snackBar.show()   
        }
        is BaseCommand.Error -> {
            val snackBar = Snackbar.make(view, it.errorString.toString(), Snackbar.LENGTH_INDEFINITE)
snackBar.setAction("Okay", { snackBar.dismiss() })
snackBar.show()
        }
    }
}
```

Như đã thấy trong mã nguồn bên trên, SingleLiveEvent thay đổi các giá trị được lắng nghe bên trong **when**, chỉ như làm thế nào chúng ta thực hiện nó với LiveData(SingleLiveEvent là một lớp con của LiveData).

Do đó, đây chính là những gì bạn có thể làm cho quá trình giao tiếp giữa ViewModel và View của mình mà không sử dụng interface callbacks cái không được đảm bảo lifecycle.

**Note**: Nếu bạn sử dụng lại ViewModel của mình trong trường hợp có một activity duy nhất và nhiều fragments, nơi mà nhiều fragments có liên quan tới một ViewModel duy nhất, việc sử dụng SingleLiveEvent bên trên không hoạt động. Điều này bởi vì, nếu bạn xem mã nguồn của SingleLiveEvent bạn sẽ thấy rằng SingleLiveEvent có thể liên kết với một observer duy nhất tại một thời điểm, do đó nếu nhiều Fragments cố lắng nghe cùng một SingleLiveEvent, quá trình lắng nghe sẽ chỉ làm việc với đối tượng lắng nghe đầu tiên.

**Solution**

1. Trong project của mình, bởi vì sự phức tạp là không quá nhiều, tôi chỉ đơn giản gọi **removeObserver** trong **onDestroyView()** của fragment.

```
override fun onDestroyView() {
    lifecycle.removeObserver(loginViewModel)
    super.onDestroyView()
}
```

2. Bạn có thể theo dõi [blog này](https://medium.com/google-developers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150) của Jose Alcerrreca, nơi mà a ta nói về trường hợp này một cách chi tiết.

## Source
https://medium.com/@abhishektiwari_51145/how-to-use-singleliveevent-in-mvvm-architecture-component-b7c04ed8705 <br />

## Reference
https://medium.com/google-developers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150