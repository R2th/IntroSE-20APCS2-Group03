![](https://images.viblo.asia/cc0a8832-33cd-4553-a85d-7b04ee36f989.png)

# Multiple back stacks
'Back stack' là một tập hợp các màn hình mà chúng ta có thể điều hướng trở lại thông qua nút quay lại của hệ thống, vậy thì ' multiple back stacks' chỉ là một loạt các hành động đó, phải không? Ồ, đó chính xác là những gì Google đã làm với multiple back stack hỗ trợ thêm vào [Navigation 2.4.0-alpha01](https://developer.android.com/jetpack/androidx/releases/navigation#2.4.0-alpha01) và [Fragment 1.4.0-alpha01](https://developer.android.com/jetpack/androidx/releases/fragment#1.4.0-alpha01) 

## Tầm quan trọng của nút back trên ứng dụng 
Cho dù bạn đang sử dụng hệ thống điều hướng cử chỉ mới của Android hay thanh điều hướng truyền thống thì khả năng 'back' là một phần quan trọng đối với trải nghiệm người dùng trên Android và thực hiện đúng điều đó là một phần quan trọng để làm cho ứng dụng của bạn trở nên tự nhiên, và tăng tính logic hơn.

Trong những trường hợp đơn giản nhất, nút back của hệ thống chỉ để kết thúc activity. Trước đây, bạn có thể ghi đè phương thức onBackPressed() trong activity nếu muốn custom hành động back này, còn bây giờ là 2021 và điều đó hoàn toàn không cần thiết. Thay vào đó, chúng có [APIs for custom back navigation](https://developer.android.com/guide/navigation/navigation-custom-back) trong `OnBackPressedDispatcher`.

Có nghĩa là khi bạn sử dụng Fragment hoặc Navigation, họ sẽ sử dụng `OnBackPressedDispatcher` để đảm bảo rằng nếu bạn đang sử dụng các back stack API của họ, nút quay lại của hệ thống sẽ hoạt động để đảo ngược từng màn hình mà bạn đã đẩy vào stack.

Multiple back stacks không thay đổi những nguyên tắc cơ bản này. Nút back của hệ thống vẫn là lệnh một hướng - ‘go back’. Điều này có rất ảnh hưởng đến cách hoạt động của multiple back stack APIs.

## Multiple back stacks trong  Fragments

Tôi sẽ giải thích một chút về cơ chế back stack của fragment. FragmentManager’s back stack không được tạo ra bởi các fragment mà được tạo ra bởi **fragment** **transactions**. Cụ thể ở đây là khi **fragment** **transaction** đó `addToBackStack()`.
Khi bạn `commit ()` một fragment transaction với `addToBackStack()`, **FragmentManager** sẽ thực hiện transaction đó bằng cách thực hiện từng thao tác (add, replace, v.v.) mà bạn đã chỉ định trên transaction, do đó di chuyển từng fragment đến trạng thái mong đợi của nó. Và **FragmentManager** sẽ giữ transaction đó như một phần trong back stack của nó.

Khi bạn gọi `popBackStack()`, transaction trên cùng của ngăn xếp sẽ bị xóa, fragment trước sẽ được hiển thị lại, v.v. Điều này đặt **FragmentManager** trở lại về trạng thái giống như trước khi fragment transaction được commit.

Có thể hiểu đơn giản `popBackStack()` là một hoạt động phá hủy: bất kỳ fragment nào được thêm vào sẽ có trạng thái destroyed khi transaction đó bị lấy ra khỏi stack. Đồng nghĩa với fragment đó sẽ không còn được hiển thị, mọi saved instance  và mọi ViewModel instances bạn đã khởi tạo trong fragment đó sẽ bị xóa. Đây là sự khác biệt chính giữa API đó và `saveBackStack()` mới. `saveBackStack()` thực hiện việc đảo ngược tương tự như cách popping transaction làm, nhưng nó đảm bảo rằng view state, saved instances và các ViewModel instances đều được lưu. Đây là cách API `restoreBackStack()` sau này có thể tạo lại các transaction đó và các fragment của chúng từ trạng thái đã lưu và 'redo' mọi thứ đã được lưu một cách hiệu quả.!

## Sơ lược về trạng thái trong fragment

Mặc dù các fragment luôn luôn có lưu lại trang thái của chính nó, nhưng thời điểm mà `onSaveInstanceState()` của fragment được gọi là khi `onSaveInstanceState()` của Activity được gọi. Để đảm bảo rằng trạng thái phiên bản đã lưu được lưu khi gọi `saveBackStack()`, chúng ta cũng cần đưa một lệnh gọi tới `onSaveInstanceState() `vào đúng điểm trong quá trình chuyển đổi vòng đời fragment. Chúng ta không thể gọi nó là quá sớm (fragment của bạn không bao giờ được lưu trạng thái trong khi nó vẫn **STARTED**), nhưng cũng không quá muộn (bạn muốn lưu trạng thái trước khi fragment bị destroyed).

Yêu cầu này đã khởi động một quy trình để khắc phục cách **FragmentManager** di chuyển đến trạng thái để đảm bảo có một nơi quản lý việc di chuyển một phân đoạn đến trạng thái mong đợi của nó và xử lý hành vi đăng nhập lại và tất cả các chuyển đổi trạng thái đi vào các fragment.

## Ví dụ về cách hoạt động của saveBackStack và restoreBackStack
Với nhiều issue đã được fix(và một FragmentManager đáng tin cậy và dễ hiểu hơn nhiều), mẹo của các API  của `saveBackStack ()` và `restoreBackStack ()` đã được thêm vào.
Nếu bạn không sử dụng các API mới này, không có gì thay đổi: ngăn xếp đơn FragmentManager hoạt động như trước đây. API `addToBackStack ()` hiện có vẫn không thay đổi - bạn có thể sử dụng tên null hoặc bất kỳ tên nào bạn muốn. Tuy nhiên, tên đó có một tầm quan trọng mới khi bạn bắt đầu xem xét nhiều ngăn xếp trở lại: chính tên đó là khóa duy nhất cho giao dịch phân đoạn mà bạn sẽ sử dụng với `saveBackStack ()` và sau đó với `restoreBackStack ()`.
Điều này có thể dễ dàng hơn để xem trong một ví dụ. Giả sử bạn đã thêm một phân đoạn ban đầu vào hoạt động của mình, sau đó thực hiện hai giao dịch, mỗi giao dịch có một thao tác thay thế duy nhất: 

```kotlin
// This is the initial fragment the user sees
fragmentManager.commit {
  setReorderingAllowed(true)
  replace<HomeFragment>(R.id.fragment_container)
}
// Later, in response to user actions, we’ve added two more
// transactions to the back stack
fragmentManager.commit {
  setReorderingAllowed(true)
  replace<ProfileFragment>(R.id.fragment_container)
  addToBackStack(“profile”)
}
fragmentManager.commit {
  setReorderingAllowed(true)
  replace<EditProfileFragment>(R.id.fragment_container)
  addToBackStack(“edit_profile”)
 ```
 Điều này có nghĩa là **FragmentManager** của chúng tôi trông giống như sau:

![](https://images.viblo.asia/ecb7c221-0f85-4f1c-ba99-71088b75fd7e.png)

Giả sử rằng chúng tôi muốn hoán đổi ngăn xếp trở lại `ProfileFragment` và hoán đổi thành `NotificationsFragment` . Chúng tôi sẽ gọi `saveBackStack ()` theo sau là một  **trannsaction** mới:

```kotlin
fragmentManager.saveBackStack("profile")
fragmentManager.commit {
  setReorderingAllowed(true)
  replace<NotificationsFragment>(R.id.fragment_container)
  addToBackStack("notifications")
}
```
Bây giờ giao dịch của chúng tôi đã thêm `ProfileFragment` và giao dịch đã thêm `EditProfileFragment` đã được lưu trong "profile"
key. Các Fragment đó đã được lưu hoàn toàn trạng thái của chúng và `FragmentManager` đang giữ trạng thái của chúng cùng với *state transaction*. Quan trọng là: các Fragment đó không còn tồn tại trong bộ nhớ hoặc trong `FragmentManager` - nó chỉ là trạng thái (và bất kỳ trạng thái không phải cấu hình nào ở dạng  `ViewModel` *instances*):

![](https://images.viblo.asia/730d8a99-c7f7-476a-b93d-df02a305157d.png)

Việc hoán đổi trở lại đủ đơn giản: chúng ta có thể thực hiện cùng một thao tác `saveBackStack ()` trên `"notifications"`  *transaction* của mình và sau đó `restoreBackStack ()`:

```kotlin
fragmentManager.saveBackStack(“notifications”)
fragmentManager.restoreBackStack(“profile”)
```
Hai ngăn xếp đã hoán đổi vị trí một cách hiệu quả:
![](https://images.viblo.asia/5622d86a-a8d1-44e7-af72-d01ae5d2cbd9.png)

Phong cách duy trì một ngăn xếp hoạt động trở lại duy nhất và hoán đổi các giao dịch vào nó đảm bảo rằng `FragmentManager` và phần còn lại của hệ thống luôn có một cái nhìn nhất quán về những gì thực sự phải xảy ra khi nhấn vào nút quay lại của hệ thống. Trên thực tế, logic đó hoàn toàn không thay đổi: nó vẫn chỉ bật giao dịch cuối cùng ra khỏi ngăn xếp fragment như trước đây.
Các API này có mục đích tối thiểu, mặc dù các tác dụng cơ bản của chúng. Điều này giúp bạn có thể xây dựng cấu trúc của riêng mình trên các khối xây dựng này trong khi tránh bất kỳ sự tấn công nào để lưu trạng thái chế độ xem Fragment, trạng thái phiên bản đã lưu và trạng thái không cấu hình.
Tất nhiên, nếu bạn không muốn xây dựng cấu trúc của riêng mình trên các API này, bạn cũng có thể sử dụng API mà chúng tôi cung cấp.

## Mutiple back stack trên navigation component

**Navigation Component** được xây dựng ngay từ đầu như một thời gian chạy chung không biết gì về Views,Fragments,Composables, hoặc một loại màn hình nào khác , hoặc là 1 cái **destination** (*đích*) đến nào khác mà bạn có thể triển khai trong **Activity** của mình. Thay vào đó, việc triển khai  **NavHost**  *interface* có trách nhiệm thêm một hoặc nhiều phiên bản **Navigator** biết cách tương tác với một loại destination cụ thể.
<br/>

Điều này có nghĩa là logic để tương tác với fragments hoàn toàn được gói gọn trong`navigation-fragment` và `FragmentNavigator` và `DialogFragmentNavigator` của nó. Tương tự, logic để tương tác với **Composables** nằm trong `navigation-compose` và `ComposeNavigator` của nó. Sự trừu tượng đó có nghĩa là nếu bạn chỉ muốn xây dựng ứng dụng của mình bằng **Composable**, bạn không bị buộc phải sử dụng bất kỳ sự phụ thuộc nào vào fragments khi bạn sử dụng `Navigation Compose`.
<br/>
Mức độ phân tách này có nghĩa là thực sự có hai lớp đối với nhiều ngăn xếp trở lại trong Điều hướng:
> *  Lưu trạng thái của từng cá thể `NavBackStackEntry` tạo nên ngăn xếp ngược `NavController`. Đây là trách nhiệm của `NavController`.
> *  Lưu bất kỳ trạng thái cụ thể nào của Bộ điều hướng được liên kết với từng `NavBackStackEntry` (ví dụ: fragment được liên kết với đích `FragmentNavigator`). Đây là trách nhiệm của `Navigator`.

<br/>
Đặc biệt chú ý đến các trường hợp `Navigator` chưa được cập nhật để hỗ trợ lưu trạng thái của nó. Mặc dù API điều hướng bên dưới được viết lại hoàn toàn để hỗ trợ trạng thái lưu (với các lần quá tải mới của API `navigate()` và `popBackStack()` mà bạn nên ghi đè thay vì các phiên bản trước đó), NavController sẽ lưu trạng thái `NavBackStackEntry` ngay cả khi `Navigator` chưa được được cập nhật (khả năng tương thích ngược là một vấn đề lớn trong thế giới Jetpack ).

<br/>

> PS: API `Navigator` mới này cũng giúp kiểm tra `Navigator` tùy chỉnh của riêng bạn một cách dễ dàng hơn bằng cách gắn `TestNavigatorState` hoạt động như một mini-`NavController`. 
<br/>

Nếu bạn chỉ đang sử dụng Điều hướng trong ứng dụng của mình, thì `Navigator` level là chi tiết triển khai hơn là thứ bạn cần tương tác trực tiếp. Chỉ cần nói rằng, chúng tôi đã thực hiện công việc cần thiết để đưa `FragmentNavigator` và `ComposeNavigator` sang các API `Navigator` mới để chúng lưu và khôi phục trạng thái của chúng một cách chính xác; bạn không cần phải làm gì ở cấp độ đó.

## saveState và restoreState trong Navigation Component

Nếu bạn đang sử dụng `NavigationUI`, tập hợp những người trợ giúp được cố vấn của chúng tôi để kết nối `NavController` của bạn với các thành phần *Material view components*, bạn sẽ thấy rằng nhiều ngăn xếp phía sau được bật theo mặc định cho các mục menu, `BottomNavigationView` (và bây giờ là `NavigationRailView!`) Và `NavigationView`. Điều này có nghĩa là sự kết hợp chung giữa việc sử dụng `navigation-fragment` và `navigation-ui`.

<br/>

Các API `NavigationUI` được xây dựng có chủ đích dựa trên các API công khai khác có sẵn trong Điều hướng, đảm bảo rằng bạn có thể tạo các phiên bản của riêng mình cho chính xác tập hợp các thành phần tùy chỉnh mà bạn muốn. Các API để cho phép lưu và khôi phục ngăn xếp phía sau cũng không ngoại lệ với điều này, với các API mới trên `NavOptions`, `navOptions` Kotlin DSL, trong Navigation XML, và trong một quá tải cho `popBackStack()` cho phép bạn chỉ định rằng bạn muốn một thao tác bật để lưu trạng thái hoặc bạn muốn một thao tác điều hướng để khôi phục một số trạng thái đã lưu trước đó.

<br/>

***Ví dụ:*** trong **Compose**, bất kỳ mẫu điều hướng chung nào (cho dù đó là bottom navigation bar, navigation rail, drawer) đều có thể sử dụng cùng một kỹ thuật hiển thị để tích hợp với`BottomNavigation` và gọi `navigate()` với các thuộc tính `saveState` và `restoreState` :

```kotlin
onClick = {
  navController.navigate(screen.route) {
    // Pop up to the start destination of the graph to
    // avoid building up a large stack of destinations
    // on the back stack as users select items
    popUpTo(navController.graph.findStartDestination().id) {
      saveState = true
    }

    // Avoid multiple copies of the same destination when
    // reselecting the same item
    launchSingleTop = true
    // Restore state when reselecting a previously selected item
    restoreState = true
  }
}
```
## Lưu trạng thái của bạn , lưu trạng thái của người dùng.

Một trong những điều khó chịu nhất đối với người dùng là mất trạng thái của họ. Đó là một trong những lý do tại sao các fragment có toàn bộ trang ở trạng thái lưu và một trong nhiều lý do tại sao tôi rất vui khi được cập nhật từng lớp để hỗ trợ nhiều ngăn xếp trở lại:
<br/>
>* Fragment (tức là hoàn toàn không sử dụng Navigation Component ): đây là một thay đổi chọn tham gia bằng cách sử dụng các API `FragmentManager` mới của `saveBackStack` và `restoreBackStack`.
><br/>
><br/>
>* The core Navigation Runtime: thêm chọn tham gia các phương thức `NavOptions` mới cho `restoreState` và `saveState` và quá tải mới của`popBackStack()` cũng chấp nhận boolean `saveState` (mặc định là false).
><br/>
><br/>
>* Điều hướng với các fragment: `FragmentNavigator` hiện sử dụng các API `Navigator` mới để dịch đúng cách các API thời gian chạy điều hướng thành các API phân đoạn bằng cách sử dụng các API thời gian chạy điều hướng.
><br/>
><br/>
>* `NavigationUI` : `onNavDestinationSelected()`, `NavigationBarView.setupWithNavController()` và `NavigationView.setupWithNavController()` hiện sử dụng `restoreState` mới và `saveState` `NavOptions` theo mặc định bất cứ khi nào chúng bật ngăn xếp phía sau. Điều này có nghĩa là mọi ứng dụng sử dụng các API `NavigationUI` đó sẽ nhận được nhiều ngăn xếp trở lại mà không có bất kỳ thay đổi mã nào sau khi nâng cấp Điều hướng 2.4.0-alpha01 trở lên.

<br/>

Nếu bạn muốn xem thêm một số ví dụ sử dụng API này, hãy xem `NavigationAdvancedSample` (mới được cập nhật mà không có bất kỳ mã `NavigationExtensions` nào được sử dụng để yêu cầu hỗ trợ nhiều ngăn xếp trở lại).