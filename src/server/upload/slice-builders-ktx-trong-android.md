# **Mở bài**
- Slice là một API mới được giới thiệu trong AndroidX 1.0.0, tương thích với API 19 trở lên. Các Slice cung cấp nội dung tương tác, năng động và phong phú từ ứng dụng của bạn sẽ được hiển thị từ trong ứng dụng `Google Search` hoặc `Google Assistant`. Hiện tại, bạn có thể kiểm tra các Slices của mình bằng [Slice Viewer app.](https://developer.android.com/guide/slices/getting-started#download-and-install-the-slice-viewer)

![](https://images.viblo.asia/b20b5895-9a7f-454c-969a-760651f2185d.png)
# **Hướng dẫn tạo 1 Slice đơn giản**
1.Thêm library `Slice` vào gradle của bạn
```
dependencies {
...
  implementation 'androidx.slice:slice-builders:1.0.0-alpha3'
  implementation 'androidx.slice:slice-builders-ktx:1.0.0-alpha3'
}
```

2.Tạo 1 File MySliceProvider và khai báo `<provider>` trong `Android Manifest`
```
class MySliceProvider() : SliceProvider() {
    // …
    override fun onBindSlice(sliceUri: Uri): Slice {
        // build and return the Slice associated with the URI 
        // passed in.
        return buildSlice(sliceUri) // method defined later.
    }
}
```
3.Hàm `buildSlice` sẽ code như sau :
```
fun buildSlice(sliceUri: Uri): Slice {
    // Create parent ListBuilder.
    val listBuilder = 
        ListBuilder(
          context,
          sliceUri,
          ListBuilder.INFINITY
        )
    // Create RowBuilder.
    val rowBuilder = new ListBuilder.RowBuilder(listBuilder)
    rowBuilder.setTitle("Hello world")
    // Add Row to List.
    listBuilder.addRow(rowBuilder)
    // Build List.
    return listBuilder.build()
}
```
4.Chúng ta có thể làm gọn code hơn với `Android KTX` như sau :
```
fun buildSlice(sliceUri: Uri): Slice {
    return list(context, sliceUri, ListBuilder.INFINITY) {
        row {
           setTitle("Hello world")
        }
    }
 }
```
5. Đây là tất cả code của hàm `buildSlice`
```
override fun buildSlice() = 
    list(context, sliceUri, ListBuilder.INFINITY) {
        header {
            setTitle("Upcoming trip to Seattle")
            setSubtitle("Feb 1–19 | 2 guests")
        }
        addAction(
            SliceAction(
                MyBroadcastReceiver.getIntent(
                    context,
                    InteractiveSliceProvider.ACTION_TOAST, 
                    "show location on map"
                ),
                IconCompat.createWithResource(
                    context, 
                    R.drawable.ic_location
                ),
                "Show reservation location"
            )
        )
        addAction(
            SliceAction(
                MyBroadcastReceiver.getIntent(
                    context,
                    InteractiveSliceProvider.ACTION_TOAST,
                    "contact host"
                ),
                IconCompat.createWithResource(
                    context,
                    drawable.ic_tex
                ),
                "Contact host"
            )
        )
        gridRow {
            cell {
                addImage(
                    IconCompat.createWithResource(
                        context,
                        R.drawable.reservation
                    ),
                    ListBuilder.LARGE_IMAGE
                )
                setContentDescription(
                    "Image of your reservation in Seattle"
                )
            }
        }
        gridRow {
            cell {
                addTitleText("Check In")
                addText("12:00 PM, Feb 1")
            }
            cell {
                addTitleText("Check Out")
                addText("11:00 AM, Feb 19")
            }
     }
 }
```
6.Kết quả sẽ như thế này 
![](https://images.viblo.asia/e24d64bc-9d12-4fe0-8fcb-266dc5546814.png)
# **Kết bài**
- Cảm ơn bạn đã đọc bài của mình.
- Nguồn : [Android Developer](https://developer.android.com/guide/slices/getting-started) và [Medium](https://medium.com/google-developers/introducing-slice-builders-ktx-2218ebde356)