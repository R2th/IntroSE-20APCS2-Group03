# Overview
Việc chuyển tiếp giữa các activity trong Android thông thường là một hiệu ứng khá đơn giản khi Activity cũ mờ đi còn activity mới đậm dần lên như gif dưới đây. 

![](https://images.viblo.asia/47bf091f-57e2-4598-9c00-1128e82b8547.gif)

Thực ra hoàn toàn có thể custom các hiệu ứng này trở nên bắt bắt hơn như hiệu ứng trượt (translate) : 

![](https://images.viblo.asia/b3a9a0c7-d079-47e6-b9e4-8c41f6ea4955.gif)

Tuy nhiên, có những trường hợp mà một phần tử xuất hiện ở cả hai Activity/Fragment cũ và mới, và việc share chúng khi chuyển tiếp sẽ tạo cho người dùng cảm giác nối tiếp giữa cái cũ và cái mới.  Trải nghiệm người dùng sẽ tốt hơn, Ứng dụng của bạn cũng xịn sò lên đôi chút ha =))

![](https://images.viblo.asia/413c7cc8-06d5-4614-b4e6-30a9afb05109.png)
![](https://images.viblo.asia/084e81e1-dc11-4b7b-bf83-1f0f2c224171.gif)

Hoặc như này, Việc mà 1 phần từ xuất hiện như này cũng khá là thường xuyên xuất hiện trong các app hiện nay khi một màn hình là danh sách, màn hình kế tiếp sẽ là item mà user nhấn vào + chi tiết của item đó. RIght?

![](https://images.viblo.asia/3f37c0d5-6ba0-4b27-a213-b6fa61fa2e38.gif)

Việc làm như vậy được gọi là **Shared elements transition** hay Chia sẻ các thành phần giữa các Activity, Fragment trong Android

## Activity Shared Elements Transitions

Cần lưu ý là Shared Elements Transition chỉ hoạt động với Android 5.0 ( API level 21) trở lên và sẽ bị mặc định bỏ qua với các API level thấp hơn.

# Các bước thực hiện

## Thêm Window Content Transitions

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="android:windowContentTransitions">true</item>
    ...
</style>
```

## Gán chung một Transition Name

Sử dụng android:transitionName để gán một Transition Name chung cho phần tử cần share ở cả 2 layout.

Ví dụ ở MainActivity.xml: 

```xml
<android.support.v7.widget.CardView
  ...>
      <ImageView
          android:id="@+id/ivProfile"
          android:transitionName="profile"
          android:scaleType="centerCrop"
          android:layout_width="match_parent"
          android:layout_height="160dp" />
      ...
</android.support.v7.widget.CardView>
```

Trong màn hình DetailActivity.xml:

```xml
<LinearLayout
  ...>
      <ImageView
          android:id="@+id/ivProfile"
          android:transitionName="profile"
          android:scaleType="centerCrop"
          android:layout_width="match_parent"
          android:layout_height="380dp" />
      ...
</LinearLayout>
```

**Chú ý**:  android:id không nhất thiết phải giống nhau giữa 2 file.  

## Start Activity

Start activity đối tượng và truyền cho nó một Bundle của những phần tử cần share

```java
Intent intent = new Intent(this, DetailsActivity.class);
intent.putExtra(DetailsActivity.EXTRA_CONTACT, contact);
ActivityOptionsCompat options = ActivityOptionsCompat.
    makeSceneTransitionAnimation(this, (View)ivProfile, "profile");
startActivity(intent, options.toBundle());
```

Việc chỉ định rõ transition name: "profile" vs view: ivProfile, đảm bảo rằng nếu có nhiều views cùng một transition thì cũng không có vấn đề gì cả.

Để đảo ngược lại hiệu ứng chuyển tiếp khi tắt layout thứ hai, ta dùng Activity.supportFinishAfterTransition() thay vì Activity.finish().

```
@Override
public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
        case android.R.id.home:
            supportFinishAfterTransition();
            return true;
    }
    return super.onOptionsItemSelected(item);
}
```

## Share nhiều phần tử

Đôi khi ta muốn share không chỉ một mà share nhiều phần tử thì làm thế nào? Để làm được thì cần phải đặt tên các transition duy nhất trong tất cả các layout: 

```java
Intent intent = new Intent(context, DetailsActivity.class);
intent.putExtra(DetailsActivity.EXTRA_CONTACT, contact);
Pair<View, String> p1 = Pair.create((View)ivProfile, "profile");
Pair<View, String> p2 = Pair.create(vPalette, "palette");
Pair<View, String> p3 = Pair.create((View)tvName, "text");
ActivityOptionsCompat options = ActivityOptionsCompat.
    makeSceneTransitionAnimation(this, p1, p2, p3);
startActivity(intent, options.toBundle());
```

**Chú ý**:  Mặc định thì *android.util.Pair* được import nhưng chúng ta sẽ chuyển nó thành: *android.support.v4.util.Pair*

Tuy nhiên đừng quá lạm dụng việc share nhiều phần tử. Nó có thể tăng tính gắn kết giữa các màn hình tuy nhiên nếu có quá nhiều thì sẽ làm giảm UX, nguời dùng sẽ không thể nào tập trung vào tất các các transition trên màn hình được. Chung quy là cái gì quá cũng không tốt. Gia đình 2 con vợ - chồng hạnh phúc =)))

## Custom các transition

Trong Andoid L, mặc định các transition là tổng hợp của ChangeBounds, ChangeTransform, ChangeImageTransform, and ChangeClipBounds. Tuy nhiên trong trường hợp ta muốn custommize chúng thì phải làm như sau. Trong file theme ta thêm các thuộc tính như sau trong AppTheme: 

```xml
<!-- Base application theme. -->
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <!-- enable window content transitions -->
    <item name="android:windowContentTransitions">true</item>

    <!-- specify enter and exit transitions -->
    <!-- options are: explode, slide, fade -->
    <item name="android:windowEnterTransition">@transition/change_image_transform</item>
    <item name="android:windowExitTransition">@transition/change_image_transform</item>

    <!-- specify shared element transitions -->
    <item name="android:windowSharedElementEnterTransition">
      @transition/change_image_transform</item>
    <item name="android:windowSharedElementExitTransition">
      @transition/change_image_transform</item>
</style>
```

*change_image_transform*  được định nghĩa như duới đây: 

```xml
<!-- res/transition/change_image_transform.xml -->
<transitionSet xmlns:android="http://schemas.android.com/apk/res/android">
  <changeImageTransform/>
</transitionSet>
```

Nếu chưa bật Window Content Transition trong theme thì có thể bật nó  tại runtime với hàm: Window.requestFeature():

```java
// inside your activity (if you did not enable transitions in your theme)
getWindow().requestFeature(Window.FEATURE_CONTENT_TRANSITIONS);
// set an enter transition
getWindow().setEnterTransition(new Explode());
// set an exit transition
getWindow().setExitTransition(new Explode());
```

## Excluding window content transitions

Đôi khi các transition khiến các thành phần vẽ chồng lên các navigation hoặc action bar. Bạn có thể loại các element bằng việc thêm thẻ target và điền id cho các element muốn loại đi như sau: 

```xml
<slide xmlns:android="http://schemas.android.com/apk/res/android"
    android:slideEdge="right"
    android:duration="1000">

    <targets>
        <!-- if using a custom Toolbar container, specify the ID of the AppBarLayout -->
        <target android:excludeId="@id/app_bar_layout" />
        <target android:excludeId="@android:id/statusBarBackground"/>
        <target android:excludeId="@android:id/navigationBarBackground"/>
    </targets>

</slide>

```

Để biết thêm thông tin bạn có thể nhấn vào [Defining Custom Animations](https://developer.android.com/training/material/animations.html#Transitions)

## Chia sẻ các element phụ thuộc vào việc load dữ liệu bất đồng bộ

Nếu các thành phần chia sẻ cần phải được load bất đồng bộ bằng AsyncTask, a Loader hoặc các thứ tương tự vậy, ... Điều này dẫn đến vấn đề là có thể các transition có thể bắt đầu trước khi data được truyền về main thread.

Để giải quyết, Activity Transition API cung cấp 1 cách để tạm thời chưa thực hiện share element cho đến khi nó sẵn sàng trên layout. 

Ta dùng hàm postponeEnterTransition()  tuy nhiên chỉ với API >= 21 hoặc supportPostponeEnterTransition() (API < 21) 

2 hàm trên gọi trong onCreate(). Sau đó các element đã được xác định vị trí và kích thước. Sau đó gọi startPostponedEnterTransition() (API >= 21) hay supportStartPostponedEnterTransition() (API < 21) để trở lại transition như sau:

```java
// ... load remote image with Glide/Picasso here

supportPostponeEnterTransition();
ivBackdrop.getViewTreeObserver().addOnPreDrawListener(
    new ViewTreeObserver.OnPreDrawListener() {
        @Override
        public boolean onPreDraw() {
            ivBackdrop.getViewTreeObserver().removeOnPreDrawListener(this);
            supportStartPostponedEnterTransition();
            return true;
        }
    }
);
```

# Fragment Shared Elements Transitions

Cách làm cũng khá tương tự như trên.

## Gán chung một Transition Name

```xml
<android.support.v7.widget.CardView
  ...>
      <ImageView
          android:id="@+id/ivProfile"
          android:transitionName="profile"
          android:scaleType="centerCrop"
          android:layout_width="match_parent"
          android:layout_height="160dp" />
      ...
</android.support.v7.widget.CardView>
```

## Tạo ra Transition

Tạo thêm một transition tên **change_image_transform.xml** trong folder **res/transition**:

```xml
<transitionSet xmlns:android="http://schemas.android.com/apk/res/android">
    <changeImageTransform />
</transitionSet>
```


## Tạo hiệu ứng chuyển tiếp trong FragmentTransaction


```java
// Tạo thực thể của mỗi fragment
FirstFragment fragmentOne = ...;
SecondFragment fragmentTwo = ...;
// Kiểm tra xem có phải phiên bản 5.0 trở lên ko.
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    // Inflate transitions
    Transition changeTransform = TransitionInflater.from(this).
          inflateTransition(R.transition.change_image_transform);
    Transition explodeTransform = TransitionInflater.from(this).
          inflateTransition(android.R.transition.explode);

    // Cài đặt hiệu ứng chuyển tiếp khi thoát khỏi fragment thứ nhất
    fragmentOne.setSharedElementReturnTransition(changeTransform);
    fragmentOne.setExitTransition(explodeTransform);

    // Cài đặt hiệu ứng chuyển tiếp khi bật fragment thứ hai
    fragmentTwo.setSharedElementEnterTransition(changeTransform);
    fragmentTwo.setEnterTransition(explodeTransform);

    // Phần tử cần share ở fragment thứ nhất
    ImageView ivProfile = (ImageView) findViewById(R.id.ivProfile);

    // Replace fragment thứ hai
    FragmentTransaction ft = getFragmentManager().beginTransaction()
            .replace(R.id.container, fragmentTwo)
            .addToBackStack("transaction")
            .addSharedElement(ivProfile, "profile");
    // Apply transaction
    ft.commit();
}
else {
    // Code để chạy trên các phiên bản thấp hơn
}
```

Nguồn tham khảo:  https://guides.codepath.com/android/shared-element-activity-transition?fbclid=IwAR3Uk-eVAaK4ZB3jwuENxDSEXBSRVwMO3xVKsV4ImVa7RLNc3yQVSuOdMSw#fragment-shared-elements-transitions