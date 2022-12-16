Tại Google I/O 2019 vừa rồi, Google đã giới thiệu [Jetpack Compose](https://developer.android.com/jetpack/compose). Cùng với đó, Android Studio 4.0 (phiên bản thử nghiệm) cũng đã hỗ trợ phát triển ứng dụng sử dụng Jetpack Compose. Do đó, mình viết bài viết này để chia sẻ về cách sử dụng Jetpack Compose với mô hình MVVM. Chúng ta sẽ xây dựng một màn hình đơn giản với một danh sách user và cập nhật giá trị của list. Trước khi bắt đầu, mình xin giới thiệu qua một số đặc điểm cơ bản của Jetpack Compose:
* `@Composable` là annotation dùng để đánh dấu một function là compose function.
* `@Model` là annotation được dùng để đánh dấu một class sẽ làm cho ui tương ứng với class đó được cập nhật khi giá trị của model thay đổi.
* Luồng của dữ liệu luôn luôn là từ trên xuống dưới. Do đó, trong mô hình MVVM dữ liệu sẽ đi từ Repository -> ViewModel -> Activity và từ Activity thì stateModel được update, từ đó UI được update.
* Để có thể xử lý các sự kiện từ UI như là click button, chúng ta sẽ sử dụng biểu thức lambda để cập nhật Activity mà sự kiện này xảy ra. Từ Activity, luồng sự kiện sẽ là Activity -> ViewModel -> Repository và từ Repository dữ liệu sẽ được gửi trở về bằng luồng đã được nhắc tới ở trên.
* Ứng dụng này chỉ sử dụng cho mục đích demo là chủ yếu, do đó mình sẽ cố gắng sử dụng ít code nhất có thể. Cùng với đó, mình sẽ không sử dụng Repository Pattern mà thay vào đó là dữ liệu tĩnh được khởi tạo trục tiếp từ trong ViewModel.

Nếu bạn muốn code theo bài viết, bạn cần phải sử dụng Android Studio 4.0 trở lên, có thể tải về [tại đây](https://developer.android.com/studio/preview).

Khi tạo project, chọn `Empty compose activity` khi chọn project template để sử dụng.

Bây giờ, ta hãy bắt đầu code thôi!

Đầu tiên, ta cần phải tạo một user model đơn giản, cũng như tạp một list user. Class UserModel:
```
class UserModel(name:String,surName:String,job:String) {
    var userName:String = name
    var userSurName:String = surName
    var userJob:String = job
}
```
Tiếp theo, tạo một Model class để giữ list các UserModel. Chúng ta cần phải thông báo tới UI mỗi khi danh sách được cập nhật, do đó ta sẽ đánh dấu class này bằng annotation `@Model`.
```
import androidx.compose.Model

@Model
class UsersState(var users:ArrayList<UserModel> = ArrayList())
```
Tiếp đó, ta sẽ tạo một object class để giữ các composable function cho UI. Các function của chúng ta sẽ nhận vào tham số là UserState. Một điều cần chú ý đó là ta có thể sử dụng Kotlin code như thông thường trong composable function.
```
import androidx.compose.Composable
import androidx.ui.core.Text
import androidx.ui.core.dp
import androidx.ui.foundation.VerticalScroller
import androidx.ui.graphics.Color
import androidx.ui.layout.Column
import androidx.ui.layout.FlexColumn
import androidx.ui.layout.Row
import androidx.ui.layout.WidthSpacer
import androidx.ui.material.*

object UsersListUi {

    @Composable
    fun addList(state: UsersState) {
        MaterialTheme {
            FlexColumn {
                inflexible {
                    // Item height will be equal content height
                    TopAppBar( // App Bar with title
                        title = { Text("Users") }
                    )
                    VerticalScroller {
                        Column {
                            state.users.forEach {
                                Column {
                                    Row {
                                        Text(text = it.userName)
                                        WidthSpacer(width = 2.dp)
                                        Text(text = it.userSurName)
                                    }
                                    Text(text = it.userJob)
                                }
                                Divider(color = Color.Black, height = 1.dp)
                            }
                        }
                    }
                }
            }
        }
    }
}
```
Ở đoạn code phía trên, ta đang sử dụng vòng lặp để hiển thị danh sách. Điều này nghe có vẻ không hiệu quả lắm. Để hiển thị danh sách một cách hiệu quả, Google cung cấp một thứ gọi là ScrollingList. Tuy nhiên, tại thời điểm bài viết này được viết, nó vẫn chưa được đưa vào bộ Jetpack Compose. Tuy nhiên, nếu khi bạn đọc bài viết này nó đã được ra mắt, chỉ cần chú ý rằng thay vòng lặp kia bằng ScrollingList.
```
//state.users.forEach {
ScrollingList(state.users) {it ->
```
Bây giờ, ta sẽ tạo một ViewModel để chứa business logic. Ta sẽ sử dụng LiveData để tạo một list userModel.
Thêm các dependency sau vào file `build.gradle`:
```
implementation 'android.arch.lifecycle:runtime:1.1.1'
implementation 'android.arch.lifecycle:extensions:1.1.1'
```
Tạo một file mới cho UserListViewModel:
```
import androidx.lifecycle.MutableLiveData

class UsersListViewModel {

    private val usersList: MutableLiveData<ArrayList<UserModel>> by lazy {
        MutableLiveData<ArrayList<UserModel>>()
    }
    private val users:ArrayList<UserModel> = ArrayList()
     fun addUsers(){
        users.add(UserModel("jon","doe","android developer"))
        users.add(UserModel("john","doe","flutter developer"))
        users.add(UserModel("jonn","dove","ios developer"))
        usersList.value = users
    }

    fun getUsers():MutableLiveData<ArrayList<UserModel>>{
        return usersList
    }
}
```
Tiếp theo, đưa tất cả mọi thứ vào trong MainActivity cùng nhau:
```
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.ui.core.setContent

class MainActivity : AppCompatActivity() {
    private val usersState: UsersState = UsersState()
    private val usersListViewModel:UsersListViewModel = UsersListViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        usersListViewModel.getUsers().observe(this, Observer {
            usersState.users.addAll(it)
        })
        usersListViewModel.addUsers()
        setContent {
            UsersListUi.addList(usersState)
        }
    }

}
```
![](https://images.viblo.asia/c79c44de-9cfd-4274-b28e-d76626438bca.jpeg)
* *** Chạy ứng dụng***
Tất cả code của ứng dụng hiện tại có [tại đây](https://github.com/kushal2011/jetpack_compose_with_mvvm/tree/master).
Dành cho những bạn muốn thêm, xoá dữ liệu trong danh sách user, các bạn có thể đọc tiếp phần tiếp theo dưới đây.
Trong classs UserListUi, thay đổi khai báo phương thức addList để nhận vào 2 biểu thức lambda để thông báo về sự kiện click button:
```
Composable
fun addList(state: UsersState, onAddClick: () -> Unit, onRemoveClick: () -> Unit) {
```
Sau đó, thêm 2 nút bấm và invoke lambda khi chúng được click:
```
FlexRow() {
    expanded(flex = 1f) {
        Button(
            text = "add",
            onClick = { onAddClick.invoke() },
            style = OutlinedButtonStyle()
        )

    }
    expanded(flex = 1f) {
        Button(
            text = "sub",
            onClick = { onRemoveClick.invoke() },
            style = OutlinedButtonStyle()
        )
    }
}
```
Từ activity, gửi lambda tới các function:
```
UsersListUi.addList(
    usersState,
    onAddClick = { usersListViewModel.addNewUser() },
    onRemoveClick = { usersListViewModel.removeFirstUser() })
```
Khi một button được click, nó sẽ invoke lambda, từ đó thông báo tới activity và activity sẽ gọi các phương thức của ViewModel để cập nhật dữ liệu trong danh sách.
Cảm ơn bạn đã đọc bài viết của mình. Hi vọng những gì mình vừa chia sẻ sẽ có ích cho bạn khi bắt đầu tìm hiểu về Jetpack Compose.
Tham khảo: [Jetpack Compose With MVVM](https://medium.com/@kushaldave2011/jetpack-compose-with-mvvm-5c8b0ad00e50)