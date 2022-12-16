Navigation cho phép đính kèm data trong các thao tác điều hướng bằng cách xác định  đối số cho điểm đến(destination). Ví dụ điểm đến Thông tin người dùng có thể lấy đối số ID người dùng để xác định người dùng nào được hiện thị. Điểm đến này có thể là Activity, Fragment..

Nói chung, bạn chỉ nên truyền dữ liệu tối thiểu giữa các điểm đến, ví dụ chỉ truyền ID của một đối tượng thay vì cả đối tượng đó. Vì tổng dung lượng cho các saved state được giới hạn cho các ứng dụng trong Android. Nếu bạn cần truyền một lượng lớn dữ liệu, hãy cân nhắc sử dụng ViewModel được mô tả trong [Chia sẻ dữ liệu giữa các Fragment](https://viblo.asia/p/giao-tiep-giua-fragments-va-activity-su-dung-viewmodel-bWrZnxVr5xw#comment-b85oWqMNm52).

#### Xác định đối số cho điểm đến
Để truyền dữ liệu giữa các điểm đến, trước tiên xác định đối số bằng cách thêm nó vào điểm đến trong navigation graph:
Đối số được truyền sẽ nằm trong thẻ <argument/> và được chứa trong điểm đến, ở đây là Fragment.

```xml
<fragment android:id="@+id/myFragment" >
     <argument
         android:name="myArg"
         app:argType="integer"
         android:defaultValue="0" />
 </fragment>
```

Các kiểu đối số được hỗ trợ:
![](https://images.viblo.asia/977e8feb-4571-421c-82c8-0b5145779d6b.png)

Nếu đối số hỗ trợ truyền giá trị null, bạn có thể khai báo nó bằng cách thêm thuộc tính sau vào <argument /> :
```xml
android:defaultValue="@null"
```
Khi bạn muốn chọn kiểu đối tượng bạn tạo ra trong Project, hộp thoại Select Class xuất hiện và nhắc bạn chọn Class tương ứng cho loại đó. Tab Project cho phép bạn chọn một Class từ Project hiện tại của bạn.

#### Ghi đè đối số của điểm đến trong một Action
Đối số và giá trị mặc định của đối số trong một Điểm đến được sử dụng chung cho tất cả các Action điều hướng đến điểm đến đó. Nhưng nếu cần, bạn có thể ghi đè lên  giá trị mặc định của một đối số(hoặc set nếu giá trị mặc định chưa được xác định) bằng cách định nghĩa một đối số nằm trong Action. Đối số này phải có cùng tên và kiểu với đối số nằm trong Điểm đến.

Ví dụ dưới đây định nghĩa một Action chứa một đối số ghi đè của đối số nằm trong Điểm đến:
```xml
<action android:id="@+id/startMyFragment"
    app:destination="@+id/myFragment">
    <argument
        android:name="myArg"
        app:argType="integer"
        android:defaultValue="1" />
</action>
```

#### Sử dụng Safe Args để truyền dữ liệu
Navigation Component có một Gradle Plugin là Safe Args, tạo ra các lớp đối tượng và Buildẻ đơn giản để điều hướng type-safety và truy cập vào bất kỳ đối số liên quan nào. Safe Args được khuyên dùng để điều hướng và truyền dữ liệu, vì nó đảm bảo type-safety.

Trong một số trường hợp, ví dụ nếu bạn không sử dụng Gradle, bạn không thể sử dụng plugin Safe Args. Trong những trường hợp này, bạn có thể sử dụng Bundle để truyền trực tiếp dữ liệu.

Để thêm Safe Args cho dự án của bạn, hãy thêm classpath sau trong tệp build.gradle cấp cao nhất:

```java
buildscript {
    repositories {
        google()
    }
    dependencies {
        def nav_version = "2.3.0-alpha01"
        classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
    }
}
```

Bạn cũng phải áp dụng một trong hai plugin có sẵn:

Để tạo code Java phù hợp với các mô-đun Java hoặc Java kết hợp Kotlin, hãy thêm dòng này vào tệp build.gradle của ứng dụng hoặc mô-đun của bạn:
```
apply plugin: "androidx.navigation.safeargs"
```
Ngoài ra, để tạo code Kotlin phù hợp với các mô-đun chỉ dành cho Kotlin, hãy thêm:
```
apply plugin: "androidx.navigation.safeargs.kotlin"
```
Bạn phải có android.useAndroidX = true trong gradle.properies của bạn.

Sau khi bật Safe Args, code được tự động tạo ra sẽ chứa các lớp và phương thức sau đây cho từng Action cũng như với từng đích gửi và nhận:
* Một lớp được tạo ra cho mỗi Điểm đến nới Action bắt nguồn. Tên của lớp này là tên của điểm đến ban đầu(điểm xuất phát) được gắn thêm từ "Directions". Ví dụ, điểm xuất phát là từ SpecifyAmountFragment thì class được tạo ra sẽ có tên là SpecifyAmountFragmentDirections.

    Lớp này có một phương thức cho mỗi Action được xác định từ điểm xuất phát.
* Đối với mỗi Action được sử dụng để truyền đối số, một Inner Class được tạo có tên dựa trên Action. Ví dụ Action có tên là confirmationAction thì Class được tạo ra là ConfirmationAction. Nếu Action chứa đối số không có giá trị mặc định thì bạn sử dụng lớp được tạo ra ở trên để set giá trị cho đối số đó.
* Một Class được tạo ra cho Điểm đến. Tên của Class được tạo ra là tên của điểm đến, cộng thêm "Args".  Ví dụ điểm đến là một Fragment có tên BlackPinkFragment thì Class được tạo ra là BlackPinkFragmentArgs. Sử dụng phương thức fromBundle() của Class này để lấy ra các đối số.


Ví dụ sau đây cho bạn thấy cách sử dụng các phương thức này để đặt đối số và chuyển nó sang phương thức navigate():
```java
@Override
public void onClick(View view) {
   EditText amountTv = (EditText) getView().findViewById(R.id.editTextAmount);
   int amount = Integer.parseInt(amountTv.getText().toString());
   ConfirmationAction action =
           SpecifyAmountFragmentDirections.confirmationAction()
   action.setAmount(amount)
   Navigation.findNavController(view).navigate(action);
}
```

Trong Fragment đích,sử dụng phương thức getArgument() để truy xuất  Bundle và sử dụng nội dung của nó. Khi sử dụng các -ktx dependency, người dùng Kotlin cũng có thể sử dụng thuộc tính delagate by `navArgs()` để truy cập đối số.

```java
@Override
public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
    TextView tv = view.findViewById(R.id.textViewAmount);
    int amount = ConfirmationFragmentArgs.fromBundle(getArguments()).getAmount();
    tv.setText(amount + "")
}
```
#### Sử dụng Safe Args với global action
Khi sử dụng  Safe Args với [global action](https://developer.android.com/topic/libraries/architecture/navigation/navigation-global-action), bạn phải cung cấp giá trị android: id cho phần tử <navigation> gốc của mình, như trong ví dụ sau:
```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:tools="http://schemas.android.com/tools"
            xmlns:android="http://schemas.android.com/apk/res/android"
            android:id="@+id/main_nav"
            app:startDestination="@id/mainFragment">

    ...

</navigation>
``` 
 Navigation tạo ra một lớp `Directions` cho thành phần <navigation> dựa theo giá trị trong android:id. Như ví dụ trên thì lớp được tạo ra là MainNavDirections. Tất cả các điểm đến trong  <navigation> đều được tạo phương thức để truy cập tất cả các Action bằng cách sử dụng các phương thức tương tự như ở phần trước.
    
    
```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main_nav"
    app:startDestination="...">
...

   <fragment
        android:id="@+id/home_fragment"
        android:name="com.example.ex.HomeFragment"
        android:label="HomeFragment
        tools:layout="@layout/home_fragment">
        <argument
            android:name="home"
            android:defaultValue="false"
            app:argType="boolean" />
    </fragment>

    <!--Global action-->

    <action
        android:id="@+id/action_home"
        app:destination="@id/fragment">
        <argument
            android:name="home"
            android:defaultValue="true"
            app:argType="boolean" />
    </action>
</navigation>
```
                                 
 Để lấy dữ diệu được truyền tới ở HomeFragment:
```java
public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
   ...
    boolean isHome = HomeFragmentArgs.fromBundle(getArgument()).getHome();
}
```
#### Truyền dữ liệu giữa các điểm đến bằng Bundle
Nếu bạn không sử dụng Gradle, bạn vẫn có thể chuyển đối số giữa các điểm đến bằng cách sử dụng các đối tượng Bundle. Tạo một đối tượng Bundle và chuyển nó đến đích bằng cách sử dụng navigate(), như hiển thị bên dưới:
```java
Bundle bundle = new Bundle();
bundle.putString("amount", amount);
Navigation.findNavController(view).navigate(R.id.confirmationAction, bundle);
```
Trong điểm đến, hãy sử dụng phương thức getArgument() để truy xuất Bundle:
```java
TextView tv = view.findViewById(R.id.textViewAmount);
tv.setText(getArguments().getString("amount"));
```
                                            
#### Truyền dữ liệu đến Start Destination
Bạn có thể truyền dữ liệu đến [Start Destination](https://developer.android.com/guide/navigation/navigation-principles#fixed_start_destination) của ứng dụng. Trước tiên, bạn phải tạo một Bundle rõ ràng chứa dữ liệu. Tiếp theo, sử dụng một trong các phương thứcau để gửi Bundle đến Start Destination.
* Nếu bạn tự tạo Navhost, hãy gọi NavhostFragment.create(R.navlation.graph, args), trong đó args là Bundle   chứa dữ liệu của bạn.
* Mặt khác, bạn có thể set đối số cho Start Destination bằng cách sử dụng một trong các  phương thức overload sau :
                                            
     Sử dụng ID của graph:  navControll.setGraph (R.navlation.graph, args)
                                            
    Sử dụng graph:  navController.setGraph(navGraph, args)
                                            
Để lấy dữ liệu ở Start Destination, hãy gọi Fragment.getArgument().


-----

Bài viết được dịch từ [Pass data between destinations](https://developer.android.com/guide/navigation/navigation-pass-data#java)