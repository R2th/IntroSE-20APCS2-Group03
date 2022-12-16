## I) MotionLayout (Hiệu ứng động trên layout)
So với phương pháp tạo animations trên android, MotionLayout cho phép chúng ta linh hoạt hơn rất nhiều trong việc chỉ định cho ứng dụng của mình.
MotionLayout là một nhánh con của Constraintlayout và cho phép bạn tạo animations giữa hai constraints. Như chúng ta đã biết, các constraints là khối xây dựng cho layout, và các view có trong constraints.
MotionLayout có thể khai báo. Điều này có nghĩa là bạn có thể dễ dàng mô tả trong tệp XML của mình, cách chuyển đổi sẽ diễn ra mà không có bất cứ dòng code nào. ó có thể animate thuộc tính của hệ thống.
Hiển thị trong ảnh dưới, màu nền của button thông tin xen kẻ giữa hình ảnh được làm động.
![](https://images.ctfassets.net/1es3ne0caaid/20pRdrddGoYu8eWeugG6gk/469b1c2399ed10a23778b9e534e0e948/constraintLayout-4-crossfade-demo.gif)
MotionLayout hỗ trợ các sự kiện chạm vào khung hình chính. Điều này làm cho nó có thể dễ dàng tùy chỉnh chuyển tiếp theo nhu cầu của riêng bạn. Trong phần sau của bài viết này, chúng ta sẽ thấy cách thức này hoạt động bằng cách sử dụng một số ví dụ.
***Sự khác nhau giữa ConstraintLayout và MotionLayout.***
*MotionLayout* là một phần của *ConstraintLayout*. Điểm khác biệt chính là *Motionlayout* không nhất thiết phải có trong cùng tệp bố cục. Thay vào đó, nó được giữ trong tệp XML riêng, *MotionScene* mà nó tham chiếu. 
MotionLayout chỉ khả dụng trên phiên bản ConstraintLayout 2.0 trở lên. 
Bạn thêm thư viện của MotionLayout vào project của bạn, build.gradle:
```
  dependencies {
        implementation 'com.android.support.constraint:constraint-layout:2.0.0-alpha1'
    }
```
***Tạo một ví dụ animation với MotionLayout***
Lưu ý: Motion cung cấp một trải nghiệm. Các đối tượng được trình bày cho người dùng mà không phá vỡ tính liên tục của trải nghiệm ngay cả khi họ biến đổi và sắp xếp lại.
Với ví dụ đầu tiên, chúng ta sẽ tạo animation, imageView tăng kích thước khi nó di chuyển xuống dưới màn hình.
![](https://images.ctfassets.net/1es3ne0caaid/1IUIB9B5U4um8gEkieOMyi/5338787d5a64bb6227cfab4a316a7115/constraintLayout-4-image-size.gif)

Để tạo được hiệu ứng này, chúng ta phải tạo 2 tệp, cho vị trí ban đầu và vị trí cuối cùng.

![](https://images.ctfassets.net/1es3ne0caaid/3OMonpMQbYaUAGmKAAKuES/3f4c6fdedf08dadc0552e788d5aca9ff/constraintLayout-4-initial-position.png)

Thuộc tính `motion_one_img_start` 

```
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:layout_marginTop="16dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/ic_android_black_24dp" />

</android.support.constraint.ConstraintLayout>
```
Tiếp theo, chúng ta tạo ra hình bằng vector. *File > New > Vector Asset* và bạn chọn color  *#4CAF50* và *Next > Finish*
![](https://images.ctfassets.net/1es3ne0caaid/7579HOjPWwYSo8ugwsscuA/a826bbfabb9a60b2615159ce7c1377a9/constraintLayout-4-config-asset.png)
Hình ảnh cuối cùng mình bố trí như này:
![](https://images.ctfassets.net/1es3ne0caaid/3ICgB0yXVm2Ay2aqueuiW2/302d2fa7d90b4f47552806a2758d4c49/constraintLayout-4-final-position.png)
Dùng thuộc tính `motion_one_img_end`
```
 <android.support.constraint.ConstraintLayout 
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="180dp"
            android:layout_height="180dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintVertical_bias="0.75"
            app:srcCompat="@drawable/ic_android_black_24dp" />

    </android.support.constraint.ConstraintLayout>
```
Bây giờ chúng ta đã xác định vị trí ban đầu và cuối cùng cho hình ảnh của mình, chúng ta cần tạo tệp bố cục MotionLayout, chúng ta sẽ gọi nó là Motion_layout_01. 
```
<android.support.constraint.motion.MotionLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutDescription="@xml/motion_scene_01"
        app:showPaths="true">

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="64dp"
            android:layout_height="64dp"
            android:layout_marginTop="16dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:srcCompat="@drawable/ic_android_black_24dp" />

    </android.support.constraint.motion.MotionLayout>
```
Chúng tôi sẽ giới thiệu 2 thuộc tính, `app:layoutDescription` và `app:showPaths` . `showPaths` dùng để hiển thị đường dẫn của hình ảnh. `layoutDescription` là thuộc tính trong XML, gọi `motion_scene_01`. Phần tử `MotionScene` sẽ cho `MotionLayout` biết cách chuyển đổi giữa layout ban đầu và layout cuối. Tất cả các tệp `MotionScene` phải được giữ trong thư mục `res/xml`
![](https://images.ctfassets.net/1es3ne0caaid/5k7YYNPxjqqwGCA6SWkGSS/ee01f6ed84988e7575bd79cc00bd80d8/constraintLayout-4-res-xml.gif)
```
<MotionScene xmlns:motion="http://schemas.android.com/apk/res-auto">
        <Transition
            motion:constraintSetStart="@layout/motion_one_img_start"
            motion:constraintSetEnd="@layout/motion_one_img_end"
            motion:duration="1000">
            <OnClick
                motion:target="@+id/imageView"
                motion:mode="toggle" />
        </Transition>
    </MotionScene>
```
Quá trình chuyển đổi `constraintSetStart` , `constraintSetEnd` , `duration` 
* `constraintSetStart` thuộc tính gắn vị trí ban đầu `motion_one_img_start`
* `constraintSetEnd` thuộc tính gắn vị trí cuối cùng `motion_one_img_end`
* `duration` Thời gian chuyển đổi lúc bắt đầu và kết thúc.
Chúng ta đã sử dụng chế độ chuyển đổi ở đây để nhìn thấy sự linh hoạt vị trí ban đầu vào cuối cùng. `transitionToEnd`, `transitionToStart`, `jumpToEnd`, `jumpToStart`
Cuối cùng mở MainActivity thay đổi tham số setContentView từ `R.layout.activity_main` thành `R.layout.motion_layout_01` trong phương thức `onCreate`

```
import android.support.v7.app.AppCompatActivity
    import android.os.Bundle

    class MainActivity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.motion_layout_01)
        }
    }
```
![](https://images.ctfassets.net/1es3ne0caaid/1IUIB9B5U4um8gEkieOMyi/5338787d5a64bb6227cfab4a316a7115/constraintLayout-4-image-size.gif)
***Đi sâu hơn về MotionScene***
`MotionScene` là hiệu ứng cho `MotionLayout` bằng các hướng dẫn `MotionLayout` phải làm gì. Đây là trung tâm điều khiển hiệu ứng.
Để chỉ định một hiệu ứng, phần tử `MotionScene` có thể chứa:
* `StateSet` mô tả trạng thái hệ thống, để xác định vị trí layout trước và sau chuyển đổi.
* `ConstraintSet` nó đóng gói tất cả các phương thức layout. nó đảm bảo chứa tất cả các constraint áp dụng cho các view. nó rất quan trọng vì mỗi constraint sẽ thay thế tất cả các constraint hiện có của view bị ảnh hưởng.
* `Transition` Phần tử mô tả quá trình chuyển đổi giữa 2 trạng thái hoặc constrainSet. Trong phần tử chuyển đổi, bạn cũng có thể chỉ định kích hoạt sự kiện `Onclick` hoặc `OnSwipe` và `KeyFrameSet`.
```
<MotionScene>
        <Transition>
            <OnClick />
            <OnSwipe />
            <KeyFrameSet >
                <KeyPosition />
                <KeyAttribute />
                <KeyCycle />
            </KeyFrameSet>
        </Transition>

        <ConstraintSet>
            <Constraint >
                <CustomAttribute/>
            </Constraint>
        </ConstraintSet>

        <StateSet>
            <State>
                <Variant />
            </State>
        </StateSet>
    </MotionScene>
```
***Dùng ConstraintSet  thay thế cho nhiều file layout***
Chúng ta sử dụng ConstraintSet và xác định ràng thuộc tính ban đầu và thuộc tính cuối cùng được áp dụng.
 ```
 <MotionScene xmlns:motion="http://schemas.android.com/apk/res-auto"
        xmlns:android="http://schemas.android.com/apk/res/android">
        <Transition
            motion:constraintSetStart="@+id/start"
            motion:constraintSetEnd="@+id/end"
            motion:duration="1000">
            <OnClick
                motion:target="@+id/imageView"
                motion:mode="toggle" />
        </Transition>

        <ConstraintSet android:id="@+id/start">
            <Constraint
                android:id="@+id/imageView"
                android:layout_width="64dp"
                android:layout_height="64dp"
                android:layout_marginTop="16dp"
                motion:layout_constraintEnd_toEndOf="parent"
                motion:layout_constraintStart_toStartOf="parent"
                motion:layout_constraintTop_toTopOf="parent"
                motion:srcCompat="@drawable/ic_android_black_24dp"/>
        </ConstraintSet>

        <ConstraintSet android:id="@+id/end">
            <Constraint
                android:id="@+id/imageView"
                android:layout_width="180dp"
                android:layout_height="180dp"
                motion:layout_constraintBottom_toBottomOf="parent"
                motion:layout_constraintEnd_toEndOf="parent"
                motion:layout_constraintStart_toStartOf="parent"
                motion:layout_constraintTop_toTopOf="parent"
                motion:layout_constraintVertical_bias="0.75"
                motion:srcCompat="@drawable/ic_android_black_24dp"  />
        </ConstraintSet>
    </MotionScene>
```
Ở trên chúng ta đã xác định 2 yếu tố ConstraintSet. Một cho layout ban đầu với ID start vào layout cuối cùng với ID - end.
***Tùy chỉnh thuộc tính***
Chúng ta đề cập với MotionLayout, thực hiện chuyển đổi trên các thuộc tính không liên quan đến vị trí, chúng được gọi là thuộc tính tùy chỉnh.
![](https://images.ctfassets.net/1es3ne0caaid/3qLhj5y5WUKeawAqiykUWc/67c9da89630e0837db79c55862ca6dd8/constraintLayout-4-color-demo.gif)
Trong ảnh trên , bạn có thể thấy màu nền thay đổi dần trong quá trình hiệu ứng và không chỉ là sự thay đổi đột ngột.
Tạo mới file trong XML `res/layouts` với đường dẫn `motion_layout_02.xml`
```
  <android.support.constraint.motion.MotionLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutDescription="@xml/motion_scene_02"
        app:showPaths="true">

        <View
            android:id="@+id/view"
            android:layout_width="64dp"
            android:layout_height="64dp"
            android:layout_marginTop="8dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

    </android.support.constraint.motion.MotionLayout>
```
Điều quan trọng cần lưu ý là phần tử view chúng ta áp dụng màu nền không có thuộc tính backgroundColor. Thay vào đó chúng ta sẽ khai báo trong tệp MotionScene.
Tạo mới file trong `res/xml` với đường dẫn `motion_scene_02`
```
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:motion="http://schemas.android.com/apk/res-auto">

        <Transition
            motion:constraintSetEnd="@+id/end"
            motion:constraintSetStart="@+id/start"
            motion:duration="1000"
            motion:interpolator="linear">
            <OnClick
                motion:target="@+id/view"
                motion:mode="toggle" />
        </Transition>

        <ConstraintSet android:id="@+id/start">
            <Constraint
                android:id="@+id/view"
                android:layout_width="64dp"
                android:layout_height="64dp"
                android:layout_marginTop="8dp"
                motion:layout_constraintEnd_toEndOf="parent"
                motion:layout_constraintStart_toStartOf="parent"
                motion:layout_constraintTop_toTopOf="parent">
                <CustomAttribute
                    motion:attributeName="backgroundColor"
                    motion:customColorValue="#000000" />
            </Constraint>
        </ConstraintSet>

        <ConstraintSet android:id="@+id/end">
            <Constraint
                android:id="@+id/view"
                android:layout_width="180dp"
                android:layout_height="180dp"
                motion:layout_constraintBottom_toBottomOf="parent"
                motion:layout_constraintEnd_toEndOf="parent"
                motion:layout_constraintStart_toStartOf="parent"
                motion:layout_constraintTop_toTopOf="parent"
                motion:layout_constraintVertical_bias="0.90" >
                <CustomAttribute
                    motion:attributeName="backgroundColor"
                    motion:customColorValue="#0e0e96" />
            </Constraint>
        </ConstraintSet>

    </MotionScene>
```
Khi xác định một thuộc tính tùy chỉnh, bạn cần xác định cả thuộc tính đầu và cuối ConstrainSet. Thuộc tính tùy chỉnh được chỉ định với `attributeName`
* getter - getAttributeName (e.g getBackgroundColor)
* setter - setAttributeName (e.g setBackgroundColor)
Kiểu giá trị setter cũng cần được chỉ định các giá trị hỗ trợ: 
*     customColorValue
*     customIntegerValue
*     customFloatValue
*     customStringValue
*     customDimension
*     customBoolean
## II) KeyFrames
Cho đến nay chúng ta chỉ thực hiện chuyển đổi giữa 2 trạng thái, bắt đầu và kết thúc. Đôi khi chúng ta muốn trạng thái bắt đầu đi qua trạng thái trung gian trước khi đến trạng thái kết thúc.
![](https://images.ctfassets.net/1es3ne0caaid/1gC5jea7zmUIq2Uo6QkIeg/b697e37fd1ef532f01973d256f1f8b01/constraintLayout-4-keyframes-demo.gif)
Trong ví dụ trên, chúng ta đã chỉ định ở mức 50% dòng thời gian hiệu ứng, hình ảnh sẽ di chuyển sang bên trái màn hình và xoay trước khi đến trạng thái cuối cùng. Để làm điều này, chúng ta cần thêm phần tử `KeyFrameSet` và `MotionScene`.
<!-- File: app/res/xml/motion_scene_01.xml -->
```
<Transition
            motion:constraintSetStart="@layout/motion_one_img_start"
            motion:constraintSetEnd="@layout/motion_one_img_end"
            motion:duration="1000">

            [...]

          <KeyFrameSet>
              <KeyPosition
                  motion:type="parentRelative"
                  motion:percentX="0.25"
                  motion:framePosition="50"
                  motion:target="@+id/imageView"/>
              <KeyAttribute
                  android:rotation="-45"
                  motion:framePosition="50"
                  motion:target="@id/imageView" />
          </KeyFrameSet>

        </Transition>
```
Để thực hiện thay đổi vị trí trong quá trình chuyển đổ, chúng ta cần thêm phần tử `KeyPocation` trong `KeyFrameSet`. hướng phần trăm trục x, phần trăm trục y.
Cuối cùng, thuộc tính `FramePocation` được sử dụng để chỉ định thời điểm trong quá trình hiệu ứng, các thay đổi sẽ được áp dụng. Lưu lý rằng chúng ta không cần thay đổi bất cứ điều gì trong MotionLayout. Chúng ta chỉ định thay đổi sẽ được thực hiện trong tệp `MotionScene`.
```
 <MotionScene xmlns:motion="http://schemas.android.com/apk/res-auto"
      xmlns:android="http://schemas.android.com/apk/res/android">
      <Transition
          motion:constraintSetStart="@+id/start"
          motion:constraintSetEnd="@+id/end"
          motion:duration="1000">
          <OnClick
              motion:target="@+id/imageView"
              motion:mode="toggle" />

          <KeyFrameSet>
              <KeyPosition
                  motion:type="parentRelative"
                  motion:percentX="0.25"
                  motion:framePosition="50"
                  motion:target="@+id/imageView"/>
              <KeyAttribute
                  android:rotation="-45"
                  motion:framePosition="50"
                  motion:target="@id/imageView" />
          </KeyFrameSet>
      </Transition>

    </MotionScene>
```
Cảm ơn bạn đã theo dõi bài viết của mình

*Nguồn tham khảo: https://pusher.com/tutorials/constraintlayout-kotlin-part-4*