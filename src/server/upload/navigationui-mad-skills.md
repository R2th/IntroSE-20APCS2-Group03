# Giới thiệu
Navigation component cho phép người dùng điều hướng qua, vào và ra khỏi các phần nội dung khác nhau trong ứng dụng, được áp dụng rộng rãi trong Single Activity và các fragments đi kèm. Thay vì sử dụng nhiều Acticity khác nhau, lập trình viên sử dụng chuỗi các Fragments để giảm độ phức tạp của một ứng dụng. Để hiểu cơ bản về Navigation Component, các bạn có thể tham khảo bài viết tại đây.

Phạm vi bài biết ngày hôm nay chúng ta đi vào 1 thứ gọi là MAD Skills (Modern Android Development) về chủ để Navigation UI. Lần lượt xem qua một số trường hợp các thành phần UI như action bar, bottom tabs hay drawer được sử dụng để điều hướng các thành phần khác nhau trong ứng dụng.

# Tiến hành
Để tiện theo dõi cũng như có nguồn resources các bạn có thể check out Repo này, với tên gọi là Donut Tracker app.
![](https://images.viblo.asia/e1ae0996-61ab-4c5b-b0c7-3088396e9c39.png)

Với những sự thay đổi này là việc update Navigation graph với những destinations mới và các actions từ `coffeFragment` tới `coffeeDialogFragment`, tương tự với `selectionFragment` tới `donutFragment`. Tiếp theo chúng ta sẽ kết hợp mọi thứ lại với nhau và điều hướng tới SelectionFragment

## Options Menu
Hiện tại, code có một options menu nhưng vẫn chưa có hành động nào. Vì vậy chúng ta sẽ gọi tới `onNavDestinationSelected()` ở trong hàm `onOptionsItemSelected()` để việc click vào menu item cho navController xử lý. Lưu ý cách này chỉ thực hiện được khi id của menuItem trùng với id của destination trong navGraph.
```
override fun onOptionsItemSelected(item: MenuItem): Boolean {
    return item.onNavDestinationSelected(
        findNavController(R.id.nav_host_fragment)
    ) || super.onOptionsItemSelected(item)
}
```
Lúc này, Navigation có thể map MenuItems với các destination của chính nó.
```
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context="com.android.samples.donuttracker.MainActivity">
    <item
        android:id="@+id/selectionFragment"
        android:orderInCategory="100"
        android:title="@string/action_settings"
        app:showAsAction="never" />
</menu>
```
Bằng cách đơn giản và ngắn gọn này, chúng ta không mất công sức để lắng nghe sự kiện user click vào menuItem nào, vì đã có Navigation lo hết rồi 😃)))
![](https://images.viblo.asia/33a8cb0d-316b-4981-b00e-b7bf2e8de1c9.png)

## Toolbar
Hiện tại app đã có thể điều hướng tới `selectionFragment` nhưng title thì vẫn không đổi. chúng ta sẽ update title và show button back ở trong màn hình `selectionFragment`.

Việc đầu tiên là thêm vào `AppBarConfiguration` để quản lý các hành động của các Navigation button phía trên bên trái màn hình.
```
appBarConfiguration = AppBarConfiguration(navController.graph)
```
Tiếp theo hãy đi đến class MainActivity để lấy instance của navController, và cả toolbar. Sau đó xác thực xem hàm `setSuportActionBar()` có được gọi hay không. Đồng thời cập nhập toolbar của đối tượng tham chiếu trên.
```
val navHostFragment = supportFragmentManager.findFragmentById(
    R.id.nav_host_fragment
) as NavHostFragment
navController = navHostFragment.navController
val toolbar = binding.toolbar
```
Để thêm hỗ trợ điều hướng cho actionBar mặc định, ta gọi hàm `setupActionBarWithNavController() `với 2 tham số truyền vào là navController và appBarConfiguration.
```
setSupportActionBar(toolbar)
setupActionBarWithNavController(navController, appBarConfiguration)
```
Tiếp theo, chúng ta ghi đè hàm `onSupportNavigationUp()` và gọi tới navigateUp() cùng với `appBarConfiguration` trong nav_host_fragment để hỗ trợ điều hướng hoặc hiển thị menu icon, tùy thuộc vào điểm đến hiện tại.
```
override fun onSupportNavigateUp(): Boolean {
    return findNavController(R.id.nav_host_fragment).navigateUp(
        appBarConfiguration
    )
}
```
![](https://images.viblo.asia/2cb08523-482f-44da-83dc-b7d8ba26b741.png)
Bây giờ chúng ta chọn điều hướng tới selectionFragment, hãy chú ý tiêu đề đã được update và button back được hiển thị.

# Tổng kết
Với những kiến thức trên, chúng ta không cần quá nhiều công sức để setup code. NavigationUI đã giúp đỡ rất nhiều để tổ chức điều hướng trong ứng dụng một cách tốt hơn. Hãy thử áp dụng vào dự án của bạn nhé! Nguồn: https://www.youtube.com/watch?v=28kAFPvJ5lA&t=3s&ab_channel=AndroidDevelopers