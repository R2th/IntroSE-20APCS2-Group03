MotionLayout là một class mới được giới thiệu trong gói thư viện ConstraintLayout 2.0 nhằm mục đích hỗ trợ các lập trình viên quản lý các motion và widget animation trong app.
Trong series này, tôi sẽ giới thiệu cho các bạn cách để thêm thư viện này vào trong ứng dụng của mình và thử trải nghiệm các tính năng của MotionLayout.
Part 1 sẽ giới thiệu với các bạn các vấn đề cơ bản của MotionLayout:

* Vì sao lại là MotionLayout
* Thêm thứ viện ConstraintLayout 2.0 và MotionLayout và ứng dụng
* Cách dùng MotionLayout
* ConstraintSets là gì
* MotionScene là gì
* Ví dụ minh họa


Các bạn có thể xem toàn bộ source code của các ví dụ tại đây: https://github.com/googlesamples/android-ConstraintLayoutExamples

## 1. Vì sao lại là MotionLayout

Android đã cung cấp một số cách cơ bản để có thể thêm animation vào ứng dụng:
*** Animated Vector Drawable**
*** Property Animation framework**
*** LayoutTransition animations**
*** Layout transitions with TransitionManager**
*** CoordinatorLayout**

Phần dưới đây sẽ giới thiệu cho các bạn về **MotionLayout**, và điểm khác biệt của nó so với các sự lựa chọn trên.

**MotionLayout** là một ViewGroup, giống như các ViewGroup khác như LinearLayout, RelativeLayout, ConstraintLayout, cho phép bạn tổ chức các view khác bên trong của nó. **MotionLayout** là một subclass của ConstraintLayout, nó kế thừa hoàn toàn khả năng bố trí các view con bên trong nó một cách phong phú.

**MotionLayout** tạo ra giúp thu nhỏ khoảng cách giữa layout transition và việc xử lý các motion phức tạp. Nó là sự pha trộn giữa property animation framework, TransitionManager, và CoordinatorLayout.

> A mix between the property animation framework, layout transitions with TransitionManager, and CoordinatorLayout


Nó cho phép bạn miêu tả việc transition giữa 2 layout (tương tự TransitionManager), có thể animation cho bất cứ properties nào (không chỉ là layout attributes). Ngoài ra, nó còn support seekable transition, giống CoordinatorLayout (có thể transition tới bất kỳ điểm nào ngay lập tức, transition có thể điều khiển bằng touch). Nó support xử lý touch và keyframes, có thể customize transition một cách đơn giản theo ý muốn.

> MotionLayout is fully declarative


Motionlayout được khai báo một cách đầy đủ - bạn có thể mô tả một complex transition trong file XML - no code is expected. còn nếu bạn muốn một motion trong code,, animation framework property đã là một sự lựa chọn tuyệt vời để làm điều ấy).

> MotionLayout tooling


Tôi tin rằng tập trung vào mô tả các motion sẽ đơn giản hóa hơn việc tạo ra các animations, cũng như mở ra cách cung cấp công cụ đồ họa tuyệt vời trong Android Studio.

Cuối cùng, cũng như với ConstraintLayout, MotionLayout cũng support tương tác ngược tới API 14.

**Hạn chế:**
MotionLayout sẽ chỉ cung cấp khả năng của nó cho nhưng view con trực tiếp - trái ngược với TransitionManager, có thể hoạt động với hệ thống bố cục lồng nhau giống như Activity transitions.

## 2. Thêm thứ viện ConstraintLayout 2.0 và MotionLayout vào ứng dụng

Chỉ cần add thêm ConstraintLayout 2.0 vào ứng dụng là có thể sử dụng được **MotionLayout**:

```
dependencies {
   implementation 'com.android.support.constraint:constraint-layout:2.0.0-alpha2'
}
```

## 3. Cách dùng MotionLayout
Vì **MotionLayout** là một subclass của ConstraintLayout, nên bạn có thể sử dụng nó như một layout bình thường.

![](https://images.viblo.asia/e83f38c2-bb6d-4722-90e5-56334dcccf40.png)

Điểm khác biệt chính giữa **MotionLayout** và ConstrainLayout ở cấp độ XML là mô tả thực tế về những gì nó sẽ làm không nhất thiết phải có trong layout file.
Thay vào đó, **MotionLayout** thường lưu giữ tất cả thông tin này trong một tệp XML riêng (**MotionScene**) mà nó tham chiếu và thông tin này sẽ được ưu tiên hơn thông tin trong layout file. Theo cách này, layout file chỉ có thể chứa các view con và thuộc tính của chúng - không phải là vị trí hoặc chuyển động của chúng.

## 4. ConstraintSets là gì

Ý tưởng chung với **Constraintset** là chúng đóng gói tất cả các quy tắc định vị cho layout của bạn. Và bạn có thể sử dụng multiple Constraintset, sau đó bạn có thể quyết định xem Constraintset nào sẽ áp dụng cho layout của mình, một cách nhanh chóng, mà không phải tạo lại các views của bạn - thứ thay đổi ở đây chỉ là vị trí, kích thước của chúng.

Kết hợp với **TransitionManager**, điều này cung cấp một cách tương đối dễ dàng để tạo các animations với ConstraintLayout.
**MotionLayout** về cơ bản xây dựng dựa trên ý tưởng này và mở rộng khái niệm này nhiều hơn nữa.

## 5. MotionScene là gì

Như đã nói ở trên, trái ngược với các layout thông thường, các đặc tả của **MotionLayout** được giữ trong một tệp XML riêng, **MotionScene**, trong thư mục **res/xml** của bạn.

![](https://images.viblo.asia/6327a4a7-651f-4b89-9d32-0bdda9b96780.png)

**MotionScene** có thể chứa tất cả những gì cần thiết để tạo animation:
* Các ConstraintSets được sử dụng
* Sự chuyển đổi giữa các ConstraintSets đó
* Keyframes, xử lý touch, ...


Ví dụ: di chuyển một view đơn giản từ đầu này sang đầu kia của màn hình mà bạn có thể kéo thả bằng tay:

![](https://images.viblo.asia/0b1cb1e7-3aa0-4786-ba0d-f2a4de1f0d16.gif)

## 6. Ví dụ minh họa

### Example 01 : tham chiếu tới các layout có sẵn

Cùng với ConstraintLayout, bạn sẽ tạo 2 **ConstraintSets** - một cho vị trí đầu tiên (với widget ở bên trái màn hình) và một cho vị trí thứ hai (với widget ở bên phải màn hình).
Vị trí đầu tiên: ( file **motion_01_cl_start.xml**)

![](https://images.viblo.asia/5e2eb5a6-4b4a-4be9-9fae-3e68b38e3cf5.png)

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <View
        android:id="@+id/button"
        android:background="@color/colorAccent"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:layout_marginStart="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

Vị trí thứ 2: (file **motion_01_cl_end.xml**)

![](https://images.viblo.asia/7fece451-5f35-467a-bcbb-2816793618ac.png)

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <View
        android:id="@+id/button"
        android:background="@color/colorAccent"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:layout_marginEnd="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

Với ConstraintLayout, bạn có thể khởi tạo 2 **ConstraintSets** trong hai layout đó, sau đó sử dụng chúng (và nếudùng **TransitionManager**,  transition sẽ là animated). Có một vấn đề với cách tiếp cận này là một khi quá trình transition bắt đầu, nó sẽ không bị gián đoạn, bạn cũng không thể yêu cầu hệ thống đi đến một điểm cụ thể trong quá trình transition - có nghĩa là bạn không thể điều khiển quá trình transition thông qua input từ người dùng.

**MotionLayout** giải quyết tất cả những vấn đề đó. Ở đây, cách bạn có thể tạo ra điều tương tự và thậm chí sử dụng lại các bố cục hiện có để khởi tạo hai trạng thái. Đầu tiên, tôi sẽ tạo một tệp **MotionLayout** cho widget:

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/motionLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layoutDescription="@xml/scene_01"
    tools:showPaths="true">

    <View
        android:id="@+id/button"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:background="@color/colorAccent"
        android:text="Button" />

</android.support.constraint.motion.MotionLayout>
```

Chú ý rằng file layout tham chiếu một **MotionScene** file (scene_01):

```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetStart="@layout/motion_01_cl_start"
        motion:constraintSetEnd="@layout/motion_01_cl_end"
        motion:duration="1000">
        <OnSwipe
            motion:touchAnchorId="@+id/button"
            motion:touchAnchorSide="right"
            motion:dragDirection="dragRight" />
    </Transition>

</MotionScene>
```

File scene_01 chỉ định quá trình transition mặc định, bằng cách chỉ ra **Constraintset** bắt đầu và kết thúc (**motion_01_cl_start** & **motion_01_cl_end**, được hiển thị ở trên). Cũng chú ý rằng tôi đã sử dụng OnSwipe cho quá trình transition đó.
Kết quả là bạn sẽ nhận được giống như ảnh động được hiển thị ở trên.

#### OnSwipe handler:

Để ý file **scene_01.xml**, chúng ta chỉ định xử lý OnSwipe, chứa trong Transition. Ở đây nó cho phép bạn thúc đẩy transition bằng cách matching với chuyển động của ngón tay.

![](https://images.viblo.asia/99f935d6-e9ca-4b1c-94d6-59402b06393e.png)

Các thông tin cần thiết lập:
> touchAnchorId: object theo dõi (@+id/button) 

> touchAnchorSide: mặt của object cần theo dõi ngón tay (right/left/top/bottom) 

> dragDirection: hướng của motion đang theo dõi (dragRight/dragLeft/dragUp/dragDown)

### Example 02 : MotionScene độc lập

The first example gave you a taste on how to quickly set up a MotionLayout, eventually reusing layouts you may already have (if you are currently using ConstraintSets to do basic animation).
MotionLayout also supports describing the ConstraintSets directly in the MotionScene file, located in the res/xml directory. This brings several advantages:
a single file to maintain the various ConstraintSets
added functionality, handling other visual attributes and custom attributes
future-proof: the upcoming MotionEditor in Android Studio will likely only support self-contained MotionScene files.

Ví dụ đầu tiên cho bạn biết cách nhanh chống thiết lập 1 **MotionLayout**, cuối cùng sử dụng lại layoutđã có (nếu bạn hiện đang sử dụng **ConstraintSets** để làm animation cơ bản).
**MotionLayout** cũng hỗ trợ mô tả các **ConstraintSets** trực tiếp trong tệp **MotionScene**, nằm trong thư mục **res/xml**. Điều này mang lại một số lợi thế:
* Một tệp duy nhất để duy trì các **ConstraintSets** khác nhau
* Thêm các chức năng, xử lý các attributes
* **Future-proof**: **MotionEditor** sắp tới trong Android Studio có thể sẽ chỉ hỗ trợ các tệp **MotionScene** độc lập.

#### Interpolated Attributes

Các thuộc tính được chỉ định trong các phần tử **ConstraintSets** trong tệp **MotionScene** bao phủ nhiều hơn các thuộc tínhcủa layout thông thường. Ngoài vị trí và giới hạn, các thuộc tính sau sẽ tự động được nội suy bởi **MotionLayout**:
* alpha
* visibility
* elevation
* rotation, rotation[X/Y]
* translation[X/Y/Z]
* scaleX/Y

Hãy thử lại ví dụ đầu tiên với tập tin **MotionScene** độc lập. Tệp **MotionLayout** giống như trong ví dụ 01, chỉ tham chiếu tới file **scene_02.xml** như bên dưới:

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/motionLayout"
    app:layoutDescription="@xml/scene_02"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <View
        android:id="@+id/button"
        android:background="@color/colorAccent"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:text="Button" />

</android.support.constraint.motion.MotionLayout>
```

The MotionScene is where things differ; the Transition definition is the same, but we put the definition of the start and end ConstraintSets directly in the file. The main difference from a normal layout file is that we do not specify the type of widgets used here — instead we put the constraints as attribute of a Constraint element.
**MotionScene** là nơi mọi thứ khác nhau được định nghĩa: **Transition** tương tự, nhưng định nghĩa **start** và **end** **ConstraintSets** trực tiếp trong file. Khác biệt với file layout bình thường là chúng ta không chỉ định loại widget được dùng  - thay thế vào đó chúng ta sẽ đặt rằng buộc như là attribute của phần từ Constraint.

```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetStart="@+id/start"
        motion:constraintSetEnd="@+id/end"
        motion:duration="1000">
        <OnSwipe
            motion:touchAnchorId="@+id/button"
            motion:touchAnchorSide="right"
            motion:dragDirection="dragRight" />
    </Transition>

    <ConstraintSet android:id="@+id/start">
        <Constraint
            android:id="@+id/button"
            android:layout_width="64dp"
            android:layout_height="64dp"
            android:layout_marginStart="8dp"
            motion:layout_constraintBottom_toBottomOf="parent"
            motion:layout_constraintStart_toStartOf="parent"
            motion:layout_constraintTop_toTopOf="parent" />
    </ConstraintSet>

    <ConstraintSet android:id="@+id/end">
        <Constraint
            android:id="@+id/button"
            android:layout_width="64dp"
            android:layout_height="64dp"
            android:layout_marginEnd="8dp"
            motion:layout_constraintBottom_toBottomOf="parent"
            motion:layout_constraintEnd_toEndOf="parent"
            motion:layout_constraintTop_toTopOf="parent" />
    </ConstraintSet>

</MotionScene>
```

#### Thuộc tính MotionLayout

**MotionLayout** có một vài attributes bạn muốn chỉ định để giúp bạn:

* app:layoutDescription=”reference” phải trỏ đến MotionScene XML file.
* app:applyMotionScene=”boolean” cho phép áp dụng MotionScene hay không [default=true]
* app:showPaths=”boolean” hiển thị hoặc không hiển thị đường chuyển động[default=false]. Nhớ tắt nó trong quá trình build app.
* app:progress=”float” cho phép bạn chỉ định transition progress từ 0 tới 1
* app:currentState=”reference” cho phép chỉ định cụ thể 1 ConstraintSet

The End?
This first article covers the basic functionalities introduced in MotionLayout.
You can find the source code for those examples in the ConstraintLayout examples github repository.
There’s a lot more that we will cover in the next few articles:
Custom attributes, image transitions, keyframes (part II)
Taking advantage of MotionLayout in your existing layouts (CoordinatorLayout, DrawerLayout, ViewPager) (part III)
All about Keyframes! (part IV)
MotionLayout as a choreographer of root layout
Nesting MotionLayout & other Views
MotionLayout with fragments

## Kết thúc

Bài viết đầu tiên này bao gồm các chức năng cơ bản được giới thiệu trong **MotionLayout**.
Bạn có thể tìm source code cho các ví dụ đó trong kho github của **ConstraintLayout**.
Các vấn đề sẽ đề cập trong vài bài viết kế tiếp:
* Custom attributes, image transitions, keyframes (part 2)
* Tận dụng lợi thế của **MotionLayout** trong cáclayout của bạn (CoordinatorLayout, DrawerLayout, ViewPager) (part 3)
* Tất cả về Keyframes! (part 4)
* MotionLayout là một biên đạo múa của root layout
* Nesting MotionLayout & các view khác
* MotionLayout với fragment


Link bài viết gốc: https://medium.com/google-developers/introduction-to-motionlayout-part-i-29208674b10d