- Khi xây dựng một ứng dụng Android, trải nghiệm người dùng là điều rất quan trọng. Các chuyển động giúp người dùng thích tương tác với ứng dụng nhiều hơn . Vì vậy, trong bài viết này, mình sẽ chia sẻ cách thực hiện animation khi chuyển đổi giữa 2 screen. 

# Tổng quan
- Mặc định, khi chúng ta chuyển tiếp giữa các Activity hoặc Fragment hiệu ứng đơn thuần là ẩn các Activity/Fragment cũ đi và hiển thị giao diện mới lên (Fade, Slide...)
- Tuy nhiên, trong một số trường hợp một phần View nào đó được xuất hiện trên cả 2 giao diện cũ và mới, việc sử dụng Share Element Transitions khi chuyển tiếp sẽ tạo cho người dùng cảm giác chuyển tiếp mượt mà và liền mạch hơn.
- Trong Android có hỗ trợ các shared elements transitions:
    *     changeBounds 
    *     changeClipBounds
    *     changeTransform
    *     changeImageTransform
- Hiểu sâu thêm về Transition: [tại đây](https://developer.android.com/reference/android/transition/Transition.html)
# Thực hành
- Một lưu ý quan trọng là Shared Element Transition chỉ hoạt động với các thiết bị từ Android 5.0 (API level 21, LOLLIPOP) trở lên. Vì vậy, khi sử dụng chúng ta phải check version trước
### Shared Elements Transition với Activity

#### Step 1: Add Window Content Transitions và file styles.xml

![](https://images.viblo.asia/581b33f0-5439-4e63-b035-b1f9e34f04cc.PNG)

#### Step 2: Specify custom transitions
- Bạn có thể tạo transitions dưới dạng file XML resource, sau đó cấu hình trong file styles.xml
    + Transition
![](https://images.viblo.asia/41677ba5-e377-454d-8eb2-6649085fa4ab.PNG)

    + styles.xml
    
![](https://images.viblo.asia/adb6bc87-9c4e-4114-90d9-50ca3d75362f.PNG)

- Bạn cũng có thể tạo transitions trong code:

![](https://images.viblo.asia/d7e37bb1-df84-47c4-abbf-fa12b0575bb1.PNG)

#### Step 3: Sử dụng thuộc tính android:transitionName để gán chung một Transition Name cho các elements cần share giữa 2 screen.
-  Ví dụ ở MainActivity.xml:

![](https://images.viblo.asia/053b7820-443a-4078-85f6-9a95def7c330.PNG)

- Và ở DetailActivity:

![](https://images.viblo.asia/c6d857b2-80cb-4209-b382-51bb74de0c30.PNG)

#### Step 4: Start an activity with a shared element
- Bạn có start activity với một hoặc nhiều shared element. Để share nhiều element sử dụng đối tượng Pair.

![](https://images.viblo.asia/7b7070a5-ffe2-4ded-9f74-b897170eb834.PNG)

### Kết quả

![](https://images.viblo.asia/57ca03b8-8e8e-41f0-96fc-107099aeefbe.gif)

### Shared Elements Transition với Fragment
- Sử dụng Shared Elements Transition với Fragment cũng tương tự như với Activity.

#### Step 1: Gán chung thuộc tính android:transitionName
- Ở fragment thứ nhất:

![](https://images.viblo.asia/0fa35b41-489d-4178-abc0-f6f15a0473e8.PNG)

- Ở fragment thứ hai:

![](https://images.viblo.asia/c2270b6e-99c6-4da3-bcb9-310278e1b5e6.PNG)

#### Step 2:  Tạo transition

![](https://images.viblo.asia/5439b94f-86d9-406d-94b1-745b38e6e05f.PNG)

#### Step 3: Tạo hiệu ứng chuyển tiếp giữa các fragment trong FragmentTransaction

![](https://images.viblo.asia/35098780-9ec0-40eb-b8ed-4303304568c8.PNG)

# Tổng kết
- Như vậy mình đã giới thiệu tới các bạn thêm hiệu ứng khi chuyển Activity/Fragment. Thật đơn giản phải không nào. Các bạn có thể tham khảo source code mình để ở dưới nhé.
# Nguồn
- Source code: https://github.com/hoangbn-1772/AnimateAndTransition
- Tham khảo: https://developer.android.com/training/transitions/start-activity#custom-trans