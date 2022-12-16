# Giới thiệu
Ở bài viết này, chúng ta sẽ cùng làm một ứng dụng gồm hai màn hình. DogListFragment chứa một danh sách các chú chó. Và màn DogDetailsFragment sẽ hiển thị thông tin một chú chó được chỉ đinh. Chúng ta sẽ thêm hiệu ứng chuyển màn khi chuyển từ màn danh sách sang màn detail bằng cách sử dụng Material motion. Let's go
![](https://images.viblo.asia/dd97fd0b-1e57-4c7f-ab0e-9e62c538cf71.png) ![](https://images.viblo.asia/35e6eb47-9ba6-47ba-848d-66c4b16eee97.png)

# Cài đặt
Để có thể quan sát quá trình chuyển màn rõ ràng, bạn cần làm chậm hoạt ảnh trên thiết bị của mình. Để làm được điều này, hãy mở terminal và run các lệnh sau
```
adb shell settings put global window_animation_scale 10
adb shell settings put global transition_animation_scale 10
adb shell settings put global animator_duration_scale 10
```

Các lệnh này sẽ làm chậm hoạt ảnh trong tất cả các ứng dụng của bạn. Để đặt lại bất kỳ lúc nào, hãy chạy câu lệnh sau :
```
adb shell settings put global window_animation_scale 1
adb shell settings put global transition_animation_scale 1
adb shell settings put global animator_duration_scale 1
```

Đối với hướng dẫn này, chúng tôi sẽ thêm một hiệu ứng chuyển màn khi một item trong recyclerview được chọn. DogListFragment và DogDetailsFragment sẽ được liên kết trực quan nhờ vào hiệu ứng chuyển màn này.
Đầu tiên chúng ta cần thêm dependency của Material motion vào gradle module app :
```
implementation 'com.google.android.material:material:1.2.0'
```

## Cài đặt DogListFragment
Dog_list_fragment.xml chứa bố cục cho item_dog sẽ được hiển thị thông qua adapter. Đó là một view khá cơ bản bao gồm một ImageView để hiển thị hình ảnh của chú chó và một Textview để hiển thị tên giống.
```
<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/item_container"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="4dp"
    android:src="?attr/selectableItemBackground"
    app:cardCornerRadius="8dp"
    app:cardElevation="6dp">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp"
        tools:ignore="UnusedAttribute">

        <com.google.android.material.imageview.ShapeableImageView
            android:id="@+id/image_thumbnail"
            android:layout_width="150dp"
            android:layout_height="150dp"
            android:scaleType="center"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:shapeAppearanceOverlay="@style/CircleImageStyle" />

        <com.google.android.material.textview.MaterialTextView
            android:id="@+id/breed_name"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:lines="2"
            android:ellipsize="end"
            android:padding="8dp"
            android:textAlignment="center"
            android:textAppearance="?attr/textAppearanceBody1"
            android:textSize="21sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/image_thumbnail"
            tools:text="Zootopia" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</com.google.android.material.card.MaterialCardView>
```

Ở đây bạn chỉ cần chú ý tới id của MaterialCarview . Chúng ta sẽ nó để bắt đầu hiệu ứng
```
android:id="@+id/item_container"
```

Tiếp theo chúng ta sẽ xử lý adapter cho việc chọn item, cũng như statrt animation

```
class RecyclerAdapter(val callback: RecyclerViewClickListener) : ListAdapter<Dog, RecyclerAdapter.DogViewHolder>(UserDataAdapterListDiff()) {

    interface RecyclerViewClickListener {
        fun onItemClicked(view: View, dog: Dog)
    }
  ....inner class DogViewHolder(override val containerView: View) : RecyclerView.ViewHolder(containerView), LayoutContainer {
        fun bind(dog: Dog) {
            with(containerView) {
                breed_name.text = dog.breed?.capitalize()
                dog.imageUrl?.let { it1 -> ImageLoader.loadImage(containerView.context, it1, image_thumbnail) }
              //Set the transition name for each Item Container
                ViewCompat.setTransitionName(item_container, dog.imageUrl)
               // Return the VIEW and the DOG object when clicked.
               setOnClickListener { callback.onItemClicked(item_container, dog) }
            }
        }
    }
```
Bây giờ trong DogListFragment.kt,chúng ta cần implement lại interface **RecyclerViewClickListener**  và ghi đè phương thức **onItemClicked ()**.
Đối với DogDetailFragment.kt, chúng ta cần imageUrl và tên giống của item đã chọn. Tôi sử dụng SafeArgs truyền dữ liệu.
Cùng với điều này, bạn cũng cần chuyển View(item_container cùng với tên chuyển đổi duy nhất (imageUrl). Bạn có thể truyền qua DogDetailFragment bằng cách sử dụng Fragment Navigator Extras.

```
FragmentNavigatorExtras(view to dog.imageUrl.toString())
```
để tạo liên kết giữa 2 fragment, Bây giờ chúng ta sẽ navigate sang màn detail bằng Navigation nhé

```
class DogListFragment : Fragment(R.layout.dog_list_fragment), RecyclerAdapter.RecyclerViewClickListener {
   private val adapter by lazy(NONE) { RecyclerAdapter(this) }
  
  override fun onItemClicked(view: View, dog: Dog) {

        val toDogDetailsFragment = DogListFragmentDirections.actionDogListFragmentToDogDetailFragment(dog.imageUrl.toString(), dog.breed)
        val extras = FragmentNavigatorExtras(view to dog.imageUrl.toString())
        navigate(toDogDetailsFragment, extras)
    }
  
   private fun navigate(destination: NavDirections, extraInfo: FragmentNavigator.Extras) = with(findNavController()) {
        currentDestination?.getAction(destination.actionId)?.let { navigate(destination, extraInfo) }
    }
```

## Cài đặt DogDetailsFragment
Đây là layout của màn này :
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
                                                     
    //End view of the Transition                                                 
    android:id="@+id/detail_container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="false">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <androidx.appcompat.widget.AppCompatImageView
            android:id="@+id/image_dog_detail"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:scaleType="centerCrop"
            app:layout_constraintDimensionRatio="1:1.2"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/textview_dog_breed"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="20dp"
            android:fontFamily="@font/work_sans_bold"
            android:textAppearance="?attr/textAppearanceHeadline4"
            app:fontFamily="@font/work_sans"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/image_dog_detail" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
> View có id là  “@ + id/detail_container” sẽ là vị trí "end” của hiệu ứng chuyển màn.

Id view cho cả chế độ xem “bắt đầu” và chế độ xem “kết thúc” phải giống nhau. Điểu này sẽ giúp android tìm được vị trí bắt đầu và vị trí kết thúc của animation.
```
class DogDetailFragment : Fragment(R.layout.dog_detail_fragment) {

    private val args: DogDetailFragmentArgs by navArgs()
  
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val (imageUrl, breed) = args
         ImageLoader.loadImage(requireContext(), imageUrl, image_dog_detail)
        textview_dog_breed.text = breed
        //Set the unique transition name to the "end" view
        detail_container.transitionName = imageUrl
    }
}
```

## Shared Element Transition

Trong Phương thức **onCreate**, hãy đặt sharedElementEnterTransition. Android Transition sẽ tự động đảo ngược quá trình chuyển đổi khi bạn quay lại, vì vậy, bạn không cần thiết lập chuyển đổi quay lại.
```
override fun onCreate(savedInstanceState: Bundle?) {

        sharedElementEnterTransition = MaterialContainerTransform().apply {
          
            duration = 300L
            isElevationShadowEnabled = true
            setAllContainerColors(requireContext().themeColor(R.attr.colorSurface))
        }
        super.onCreate(savedInstanceState)
    }
```

## Làm cho Hoạt ảnh mượt mà và trực quan hơn
Để làm điều này bạn chỉ cần thêm đoạn code này vào màn DogListFragment
```
 override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        postponeEnterTransition()
        view.doOnPreDraw { startPostponedEnterTransition() }
        ...
    }
```
Điều này sẽ đảm bảo rằng DogListFragment được tải trước khi chạy quá trình chuyển đổi trả lại. Bây giờ quá trình chuyển đổi sẽ trông như thế này.
Nếu bạn để ý kỹ khi click vào item trong recyclerview, DogList Fragment sẽ được thay thế ngay lập tức. Chúng tôi muốn nó ở lại cho đến khi DogDetail tải lên.
Ngoài ra khi vào lại Màn hình danh sách chó khi nhấn trở lại, tôi muốn phân đoạn DogList tăng tỷ lệ một chút (chỉ là một chút hoạt ảnh). Trong phương thức **onItemClicked (**), thiết lập quá trình chuyển đổi thoát và vào lại trước khi điều hướng.

```
override fun itemClickedClicked(view: View, dog: Dog) {
  
        exitTransition = Hold().apply {
            duration = resources.getInteger(R.integer.motion_duration_large).toLong()
        }

        reenterTransition = MaterialElevationScale(true).apply {
            duration = resources.getInteger(R.integer.motion_duration_small).toLong()
        }
        val toDogDetailsFragment = DogListFragmentDirections.actionDogListFragmentToDogDetailFragment(dog.imageUrl.toString(), dog.breed)
        val extras = FragmentNavigatorExtras(view to dog.imageUrl.toString())
        navigate(toDogDetailsFragment, extras)
    }
```

## Tham khảo
https://medium.com/swlh/adding-amazing-transitions-to-your-android-app-easily-using-material-motion-f0cd92463b39