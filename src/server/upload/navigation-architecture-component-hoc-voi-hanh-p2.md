Chào mừng các bạn đến với phần 2 cũng là phần cuối cùng của series Navigation Architecture. Bạn nào chưa xem phần 1 có thể vào [đây](https://viblo.asia/p/navigation-architecture-component-hoc-voi-hanh-p1-LzD5dBpzZjY) xem nhé. Nội dung phần này mình sẽ trình bày các nội dung sau:

1. Navigate bằng cách sử dụng action.
2. Navigate bằng cách sử dụng menu, drawer và bottom navigation.
3. Sử dụng type safe argument cho việc navigate.
4. Deep linking đến một destination.
5. Liên kết đến một trang web bằng deep link

## Navigate bằng cách sử dụng action

### Action

Như mình đã đề cập trong bài viết trước thì đường nối mũi tên trong navigation graph là hình ảnh trực quan hóa của **action**

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/42c6a3893f022a47.png)

Trong các ví dụ trước thì việc chúng ta có thể navigate từ destination này đến destination khác không hề được phản ánh thông qua file **mobile_navigation.xml**, ngoài ra thì chắc nhiều bạn cũng sẽ thấy là navigate kiểu đấy cũng không khác như cách chúng ta thay fragment như kiểu cũ là bao :v.

Đây chính là lý do mà **action** ra đời. Bằng việc sử dụng action thì từ file resource navigation chúng ta có thể biết được là từ một destination cụ thể có thể navigate đến những destination nào. File resource navigation lúc này sẽ cho chúng ta một cái nhìn tổng quát về cách mà các destination navigate với nhau như nào.

Ngoài ra thì việc sử dụng **action** cũng làm tăng thêm độ trừu tượng cho việc navigate. Thay vì navigate đến một destination cụ thể thì giờ đây chúng ta sẽ navigate "đến" action. Lúc này thì action có thể sẽ chỉ đến các destination khác nhau tùy thuộc vào ngữ cảnh.

Mồ ví dụ đơn giản là giả sử chúng ta có một action tên là "action_next" có nhiệm vụ sẽ điều hướng chúng ta đến các màn hình khác nhau tùy thuôc vào việc destination thực tế tiếp theo là gì. Ví dụ được thể hiện dưới file xml sau:

```xml
<fragment
    android:id="@+id/launcher_home"
    android:name="com.example.android.codelabs.navigation.MainFragment">
    <action
        android:id="@+id/next_action"
        app:destination="@+id/flow_step_one" />
</fragment>
<fragment
    android:id="@+id/flow_step_one"
    android:name="com.example.android.codelabs.navigation.FlowStepFragment">
    <action
        android:id="@+id/next_action"
        app:destination="@+id/flow_step_two"/>
</fragment>

<fragment
    android:id="@+id/flow_step_two"
    android:name="com.example.android.codelabs.navigation.FlowStepFragment">
    <action
        android:id="@+id/next_action"
        app:popUpTo="@id/launcher_home"/>
</fragment>
```

Để ý chúng ta sẽ thấy:

- **id** cho action đều là **next_action** trong cả 3 fragment destination tag.
- **destination** của action là khác nhau.

Action được scope vào destination mà nó được gắn vào, vì vậy nên một action trong một destination cụ thể có thể sẽ có các hành vi khác nhau. Điều này cho phép chúng ta xây dựng các đoạn code có tính tái sử dụng cao trong trường hợp action đó thích hợp với nhiều destination.

### Navigate sử dụng một action

Giờ chúng ta sẽ thực hành! Lần này chúng ta sẽ sờ đến button **Navigate with Action**:

1. Mở file `mobile_navigation.xml` trong chế độ **Design**

2. Kéo mũi tên từ destination `launcher_home` đến `flow_step_one`:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/1ea450e9790e7e77.png)

3. Click vào mũi tên vừa tạo (sẽ có màu xanh khi chọn) và sửa đổi thuộc tính của action thông qua panel phía bên phải:
   - ID - next_action
   - Transition for Enter - slide_in_right
   - Transition for Exit - slide_out_left
   - Transitions for Pop Enter - slide_in_left
   - Transitions for Pop Exit - slide_out_right

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/267109dbc4896563.png)

4. Chọn chế độ hiển thị **Text**.
5. Để ý chúng ta sẽ thấy có **action** là `next_action` được thêm vào ở phía dưới destination `launcher_home`:

```xml
<fragment android:id="@+id/launcher_home"...>
        
        <action android:id="@+id/next_action"
            app:destination="@+id/flow_step_one"
            app:enterAnim="@anim/slide_in_right"
            app:exitAnim="@anim/slide_out_left"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right" />
```

6. Mở file `MainFragment.kt`
7. Thêm click listener cho `navigation_action_bt`:

```kotlin
view.findViewById<Button>(R.id.navigate_action_bt)?.setOnClickListener(
                Navigation.createNavigateOnClickListener(R.id.next_action, null)
        )
```

**Note**: Thay vì sử dụng **NavOptions** để khai báo các thuộc tính cho việc navigate thì chúng ta có thể khai báo các thuộc tính đó trực tiếp qua action trong file XML.

8. Run lại app, lúc này khi click vào nút **Navigate To Action** sẽ navigate đến màn hình tiếp theo.

## Navigate sử dụng menu, drawer và bottom navigation

### NavigationUI và navigation-ui-ktx

Navigation Component có bao gồm lớp **NavigationUI** và kotlin extension là  `navigation-ui-ktx`. `NavigationUI` bao gồm các phướng thức static có chức năng liên kết các menu item với các destination. Còn `navigation-ui-ktx` là các phương thức mở rộng có chức năng tương tự. Nếu `NavigationUI` tìm thấy một menu item mà có cùng ID với một destination trong graph hiện tại thì nó sẽ tự động cấu hình để menu item đấy navigate đến destination tương ứng.

### Sử dụng NavigationUI

Giờ chúng ta sẽ cùng sử dụng `NavigationUI` để cấu hình 4 menu: bottom navigation và side navigation (nếu màn hình điện thoại đủ lớn), action bar và overflow menu.

Trong ví dụ trước thì chúng ta đã thêm fragment "Setting" nhưng chưa hề được sử dụng trong ứng dụng. Chúng ta sẽ dùng nó lần này.

1. Cập nhật lại navigation drawer và overflow menu để nó include `setting_fragment`:

   `menu_nav_drawer.xml`

   ```xml
   <item
           android:id="@+id/settings_fragment"
           android:icon="@drawable/ic_settings"
           android:title="@string/settings" />
   ```

   `menu_overflow.xml`

   ```xml
   <item
           android:id="@+id/settings_fragment"
           android:icon="@drawable/ic_settings"
           android:title="@string/settings"
           android:menuCategory="secondary" />
   ```

   2. Khi run lại app thì chúng ta sẽ thấy có mục chọn Setting xuất hiện trong overflow menu trên smartphone và trên navigation drawer trong trường hợp thiết bị là tablet hoặc điện thoại đang ở chế độ split screen. Khi click vào mục chọn mới này thì app sẽ navigate đến màn hình setting.

| ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/61c8293587c76bb6.png)Overflow menu trên smartphone | ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/2818adf06bb4b178.png)Drawer trên smartphone ở chế độ split-screen |
| ---------------------------------------- | ---------------------------------------- |
|                                          |                                          |

## Sử dụng type safe argument bundle cho navigation

### Safe Args

Navigation component còn đi kèm với cả Gradle plugin được gọi là safe args. Plugin này có nhiệm vụ gen các lớp object và builder phục vụ việc truy cập một cách type-safe các argument được định nghĩa cho các destination và action.

Safe args giúp chúng ta tránh việc phải code như dưới đây khi truyền các value giữa các destination:

```kotlin
val username = arguments?.getString("usernameKey")
```

Thay vào đó chúng ta có thể viết code như dưới đây do các argument đẫ được gen sẵn setter và getter:

```kotlin
val username = args.username
```

### Truyền value sử dụng safe args

Bây giờ chúng ta cùng thực hành nào:

1. Mở file `app/build.gradle` và đảm bảo là chúng ta đã apply plugin cho safe args:

   ```gradle
   apply plugin: 'com.android.application'
   apply plugin: 'androidx.navigation.safeargs'

   android { 
      //...
   }
   ```

2. Mở file `mobile_navigation.xml` và xem cách argument được định nghĩa trong destination `flow_step_one`:

   ```xml
   <fragment
       android:id="@+id/flow_step_one"
       android:name="com.example.android.codelabs.navigation.FlowStepFragment"
       tools:layout="@layout/flow_step_one_fragment">
    <argument
        android:name="step"
        app:type="integer"
        android:defaultValue="1"/>
   </fragment>
   ```

3. Tag `<argument>` sẽ gen một class được gọi là `FlowStepFragmentArgs`.  Theo như nội dung trong tag `argument` thì nó bao gồm một argument tên là `step` được định nghĩa qua `android:name="step"`. Class được sinh ra là `FlowStepFragmentArgs` sẽ bao gồm biến tên là `step` này và cả getter và setter của nó.

   ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/c82ce35ec495b6d0.png)

4. Rào comment lại dòng dưới đây trong `FlowStepFragment`, đây là cách "cổ truyền" mà chúng ta vẫn hay làm nếu không dùng type-safe args:

   ```kotlin
   // Comment out this line
   // val step = arguments?.getInt("step")
   ```

5. Cập nhật lại `FlowStepFragment` để sử dụng file được gen ra là `FlowStepFragmentArgs`. File này sẽ cho chúng ta lấy giá trị argument của `FlowStepFragment` một cách type-safe.

   ```kotlin
   val step = arguments?.let {
       val safeArgs = FlowStepFragmentArgs.fromBundle(it)
       safeArgs.step
   }
   ```

**Note**: Ngoài ra chúng ta còn có thể sử dụng safe args để thêm argument cho action



## Deep link đến một destination

### Deep link và navigation

Navigation component còn hỗ trợ cả **deep link**. Deep link là cách để chúng ta có thể nhảy vào bất kỳ destination nào trong navigation của app từ một url link hoặc pending intent của notification.

Có một ưu điểm của việc sử dụng thư viện navigation để xử lý deep link là nó sẽ đảm bảo là ứng dụng sẽ xuất phát ở một destination thích hợp cùng với một backstack thích hợp tính từ các vị trí entry point như là widget của app, notification hoặc web link (sẽ được nói trong phần sau).

### Thêm một deep link

Chúng ta sẽ sử dụng `NavDeepLinkBuilder` để móc nối một widget đến một destination:

1. Mở file `DeepLinkAppWidgetProvider`.

2. Thêm một `PendingIntent` được dựng lên bởi `NavDeepLinkBuilder`:

   ```kotlin
   Bundle args = new Bundle();
   args.putString("myarg", "From Widget");
   PendingIntent pendingIntent = new NavDeepLinkBuilder(context)
       .setGraph(R.navigation.mobile_navigation)
       .setDestination(R.id.android)
       .setArguments(args)
       .createPendingIntent();

   remoteViews.setOnClickPendingIntent(R.id.deep_link, pendingIntent);
   ```

   Để ý chúng ta sẽ thấy:

   - `setGraph` sẽ include một navigation graph.
   - `setDestination` sẽ chỉ ra vị trí mà link sẽ đi tới.
   - Chúng ta có thể truyền argument vào deep link.

Mặc định thì `NavDeepLinkBuilder` sẽ start Aactivity launcher của app. Chúng ta có thể thay đổi điều này bằng cách truyền vào một activity khác như một context hoặc khai báo class activity ấy một cách tường minh thông qua phương thức `setComponentName()`.

3. Thêm một Deep Link widget vào màn hình home. Chạm và giữ trên màn hình home để cho tùy chọn thêm widget hiện lên.

   | ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/29e6528a760db6f6.png) | ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/5fa5b0f6a9f8909d.png) |
   | ---------------------------------------- | ---------------------------------------- |
   | Thêm một widget                          | Deep Link widget                         |

   ​

4. Chạm vào widget và chúng ta sẽ thấy rằng destination được mở lên kèm với argument được truyền vào là chính xác (sẽ có dòng chữ "From Widget" ở trên cùng bên trái).

   ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/e22c05b8d2ef5b8.png)

5. Khi nhấn vào nút back thì nó sẽ đưa chúng ta đến destination là `launcher_home`


### Backstack cho một deeplink được xác định dư lào?

Backstack cho một deep link được xác định dựa trên navigation graph mà chúng ta truyền vào. Nếu Activity mà chúng ta truyền vào mà có activity khác là [cha](https://developer.android.com/training/appbar/up-action#declare-parent) thì activity đó cũng sẽ được gộp vào.

Backstack được gen bằng cách sử dụng destination được định nghĩa qua `app:startDestination`. Trong ứng dụng chúng ta đang nghịch thì chỉ có một activity và nó chỉ có một cấp độ navigation nên backstack sẽ đưa chúng ta đến destination là `launcher_home`.

Một navigation phức tạp hơn có thể sẽ bao gồm nhiều activity và rắc rối hơn thì sẽ có cả nhiều navigation graph lồng nhau. `app:startDestination` ở mỗi cấp độ của graph được lồng sẽ xác định backstack. Để có thể hiểu rõ hơn về deep links và nested graph thì các bạn có thể xem ở [đây](http://d.android.com/topic/libraries/architecture/navigation/navigation-principles).

**Note**: Để tiện lợi thì chúng ta có thể sử dụng phương thức `createDeepLink()` của `NavController` để sử dụng `Context` và navigation graph tại thời điểm đó của nó để tạo deep link

## Liên kết một web link với một destination

### <deepLink>

Một trong những ứng dụng nhiều nahats của deep link là cho phép một web link mở một activity của app. Thông thường thì chúng ta sẽ dùng một intent-filter và liên kết một url với activity mà chúng ta muốn mở.

Với navigation component thì việc này sẽ đơn giản hơn rất nhiều! Nó cho phép chúng ta có thể viết thẳng thông tin mapping giữa url và destination trực tiếp vào navigation graph.

`<deepLink>` là tag mà chúng ta sẽ cần dùng để làm điều này. Mỗi một <deepLink> sẽ yêu cầu phải có 1 thuộc tính bắt buộc là `app:uri`.

Ngoài việc match trực tiếp Uri thì nó còn hỗ trợ các tính năng sau đây:

- Uri mà không bao gồm giao thức sẽ được coi mặc định là http và https. Ví dụ như `www.example.com` sẽ được coi là `http://www.example.com` và `https://www.example.com`

- Placeholder được viết dưới dạng `{placeholder_name}` sẽ khớp với 1 hay nhiều ký tự. String value của placeholder có thể mang giá trị của bundle argument với key là tên trùng tên của argument. Ví dụ: `http://www.example.com/users/{id}` sẽ tương ứng với `http://www.example.com/users/4`.
- Wildcard `.*` có thể được dùng để match 0 hoặc nhiều ký tự.
- `NavController` sẽ tự động xử lý **ACTION_VIEW** intent và tìm deep link phù hợp.

### Thêm một Uri based Deep Link sử dụng `<deepLink>`

Giờ chúng ta sẽ bắt tay vào thực hành :d. Nhiệm vụ của chúng ta sẽ là thêm một deep link tới `http://www.iana.org/domains/example`:

1. Mở file `mobile_navigation.xml`.

2. Thêm `<deepLink>` vào destination `<android>`:

   ```xml
   <fragment
       android:id="@+id/android"
       android:name="com.example.android.codelabs.navigation.DeepLinkFragment"
       android:label="@string/android"
       tools:layout="@layout/android_fragment">
       <argument
           android:name="myarg"
           android:defaultValue="Android!"/>
       <deepLink app:uri="www.example.com/{myarg}"/>
   </fragment>
   ```

3. Mở `AndroidManifest.xml`

4. Thêm `<nav-graph>`:

   ```xml
   <activity
      android:name=".MainActivity">
      <intent-filter>
          <action android:name="android.intent.action.MAIN"/>
          <category android:name="android.intent.category.DEFAULT"/>
          <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
      <nav-graph android:value="@navigation/mobile_navigation"/>
     </activity>
   ```

5. Sử dụng bất kỳ trình duyệt nào bạn muốn để vào trang `www.example.com/<any string>/`. Sau khi chọn app mà chúng ta đang nghịch thì chúng ta sẽ được navigate đến đúng destination mong muốn.

| ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/4f012cdd49c5c585.png) | ![](https://codelabs.developers.google.com/codelabs/android-navigation/img/908e73707d0d7ea9.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Mở trang `www.example.com/hello/` sẽ gọi đến intent chooser  | Fragment được navigate đến thông qua deep link sẽ hiển thị argument được gửi kèm khi navigate |

## Kết

Hi vọng sau khi kinh qua 2 phần về Navigation Component thì mình hi vọng các bạn đã mường tượng được nó hoạt động như nào và những tiện ích mà nó mang lại. Để hiểu sâu và thông thạo hơn về phần này thì chỉ có cách là sử dụng nó càng nhiều càng tốt thôi :)). Gặp lại các bạn ở những bài khác.

*Nguồn: https://codelabs.developers.google.com/codelabs/android-navigation/*