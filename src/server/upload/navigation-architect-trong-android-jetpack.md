### Mở đầu
**Thành phần Navigation là một phần của gói AndroidX là giới thiệu kể từ Android SDK 28. Thành phần này bao gồm các cấu trúc cho ứng dụng của bạn, đặc biệt là chuyển hướng giữa các fragment.**
> Nguyên tắc của Navigation :
> Ứng dụng nên có 1 điểm bắt đầu cố định 
> Chức năng Navigation Up không bao giờ được thoát ứng dụng của bạn
### Cấu hình build.gradle 
```
buildscript {
	...
	repositories {
    		google()
	}
	dependencies {
    		...
    		classpath 'android.arch.navigation:navigation-safe-args-gradle-plugin:2.1.0'
	}
}
```
**Implement trong app**
```
implementation 'android.arch.navigation:navigation-fragment:2.1.0'
implementation 'android.arch.navigation:navigation-ui:2.1.0'
```
**Và apply **
```
apply plugin: 'androidx.navigation.safeargs'
```
### Xây dựng Ui và chuyển hướng trong app với Navigation 
Tạo ACtivity có thẻ Fragment Host làm chủ để dẫn đến các fragment khác 
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">


    <fragment
        android:id="@+id/my_nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/navigation_graph" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
> app:navGraph : Định nghĩa file navigation làm chủ các liên hết có ở Host Fragment 
> 
> app:defaultNavHost="true" .hệ thống navigation chặn việc hệ thống Back  ra khỏi app  khi ấn nút Back

**Destination : ĐIểm đến khi thực hiện 1 hành động di chuyển **
**Bước đầu tiên ta tạo ra file xml Navigation với Resource type là Navigation **
Chúng ta có thể định nghĩa 1 Action bằng việc kéo thả như sau
![](https://images.viblo.asia/61ea71b2-8888-4bab-a158-2654d0a59e2a.gif)
Hoặc cũng có thể tạo ra các thẻ Action như file sau
```
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/navigation_graph"
    app:startDestination="@id/firstFragment">

    <fragment
        android:id="@+id/firstFragment"
        android:name="com.FirstFragment"
        tools:layout="@layout/navigation_first_fragment" >
        <action
            android:id="@+id/action_first_Fragment_to_second_Fragment"
            app:destination="@id/secondFragment"
            app:enterAnim="@anim/nav_default_enter_anim"  />
    </fragment>
    <fragment
        android:id="@+id/secondFragment"
        android:name="com.SecondFragment"
        tools:layout="@layout/navigation_second_fragment" />
</navigation>
```
****
**Tiếp đển rebuild app **
Sau đó 

Có 2 cách để chuyển hướng đến Fragment khác 

```

button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               FindNavController().navigate(FirstFragmentDirections.actionfirstFragmentToSecondFragment()
            }
        });

```

**Truyền argument mỗi khi chuyển hướng . Ví dụ**
```
<fragment
        android:id="@+id/firstFragment"
        android:name="com.FirstFragment"
        android:label="navigation_first_fragment"
        tools:layout="@layout/navigation_first_fragment" >

        <argument
            android:name="test_string"
            android:defaultValue="hello world"
            app:argType="string" />
    </fragment>
```
sau đó ở Fragment 1 
```
 button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               findNavController().navigate(
                    firstFragmentDirections.actionFirstFragmentToTwoFragment(
                        "Chuỗi String"
                    )
                )
            }
        });
```
Nhận ở Fragment 2
```
private val args: FirstFragmentArgs by navArgs()
//Sau đó ở nơi lấy ra
args.test_string
```
**Để pop Fragment hiện tại ta dùng .  findNavController().popBackStack() **
**Khi Chuyển hướng giữa các fragment . navigation cho phép chúng ta tạo bắt được sự kiện sự thay đổi chuyển hướng với destination . Ví dụ**
```
    private lateinit var navController: NavController

  navController = Navigation.findNavController(this, R.id.nav_host_container)
        navController.addOnDestinationChangedListener { _, destination, _ ->
            when (destination.id) {
            R.id.firstFragment->{
            }
            //Todo more
            }
```

**OK . trên đây là những kiến thức về việc chuyển giữa các Fragment sử dụng Navigation . Cảm ơn đã quan tâm và theo dõi . Bye !!**