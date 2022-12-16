# 1.Giới thiệu
File văn bản định dạng **.pdf** có lẽ quá phổ biển không thể bàn cãi được. PDF được rất **nhiều người sử dụng** vì các ưu điểm cơ bản như:

- Có thể mở được trên cả điện thoại thông minh, máy tính.
- Hỗ trợ in ấn.
- Dung lượng nhỏ, dễ dàng chia sẻ.
- ...

![](https://images.viblo.asia/4a673f38-6a20-44fb-80d2-1521ffc673ed.png)

Vì vậy mình sẽ hướng dẫn mọi người dạng file này trên Android nhé :D

# 2.Lý do mình chọn cách này mà trong khi có rất nhiều thư viện hỗ trợ
Có nhiều libary hỗ trợ để tạo PDF như [apwlibrary](http://coderesearchlabs.com/androidpdfwriter/), [iText](https://itextpdf.com/), ... đều rất dễ dàng sử dụng. Nhưng mình thấy các thư viện này đều dùng [**GPL License**](https://vi.wikipedia.org/wiki/Gi%E1%BA%A5y_ph%C3%A9p_C%C3%B4ng_c%E1%BB%99ng_GNU).

![](https://images.viblo.asia/2f081f01-7b99-4f88-845e-f7cb1af1c54c.jpg)

Mà ứng dụng để **up lên CHPlay** thì không nên sử dụng. Vì sao thì bạn có thể tìm hiểu [**GPL License**](https://vi.wikipedia.org/wiki/Gi%E1%BA%A5y_ph%C3%A9p_C%C3%B4ng_c%E1%BB%99ng_GNU). 
Vì vậy chọn [**PdfDocument**](https://developer.android.com/reference/android/graphics/pdf/PdfDocument) có sẵn của Android là mình thấy hợp lý nhất:

- Của nhà nên không vấn đề gì về License.
- Dễ dàng chỉnh sửa giao diện PDF trực tiếp trên file xml.

# 3. Sử dụng

- File pdf_content.xml:
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toTopOf="@+id/textView"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@mipmap/ic_launcher" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:textSize="20sp"
        android:layout_margin="10dp"
        app:layout_constraintTop_toBottomOf="@id/imageView"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />
</android.support.constraint.ConstraintLayout>
```


- Tạo PDF dựa trên file xml trên:
```
val printAttrs = PrintAttributes.Builder()
        .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
        .setMediaSize(PrintAttributes.MediaSize.NA_LETTER)
        .setResolution(Resolution("YOUR_ID", PRINT_SERVICE, 300, 300))
        .setMinMargins(Margins.NO_MARGINS)
        .build()
val document = PrintedPdfDocument(context, printAttrs)
val pageInfo = PdfDocument.PageInfo.Builder(Resources.getSystem().getDisplayMetrics().widthPixels,
        Resources.getSystem().getDisplayMetrics().heightPixels, 1).create()
val page = document.startPage(pageInfo)
val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
val view = inflater.inflate(R.layout.pdf_content, null)
//set text cho Text View trên View 
view.textView.text = "Các bạn có thể dễ dàng chỉnh giao diện như khi tạo giao diện Android!"
val measureWidth = View.MeasureSpec.makeMeasureSpec(page.canvas.width, View.MeasureSpec.EXACTLY)
val measuredHeight = View.MeasureSpec.makeMeasureSpec(page.canvas.height, View.MeasureSpec.EXACTLY)
content.measure(measureWidth, measuredHeight)
content.layout(0, 0, page.canvas.width, page.canvas.height)
content.draw(page.canvas)
document.finishPage(page)
try {
    val pdfDirPath = File(getFilesDir(), "pdf")
    pdfDirPath.mkdirs()
    val file = File(pdfDirPath, "pdfsend.pdf")
    var os = FileOutputStream(file)
    document.writeTo(os)
    document.close()
    os.close()
} catch (e: IOException) {
    Toast.makeText(context, "Error generating file", Toast.LENGTH_LONG).show()
}
```

- Giao diện PDF khi hiển thị:
![](https://images.viblo.asia/1d89b94f-6ba3-486b-b214-9db6628c925d.png)

- Như bạn thấy trong code mình có thể set các giá trị tùy ý khi lấy được View ra và chỉnh sửa giao diện như khi tạo giao diện cho Android 1 cách dễ dàng :D.

# 4.Phần Kết
Vậy là mình đã hướng dẫn bạn tạo PDF từ file xml kết thúc tại đây.

**Cảm ơn bạn đã dành thời gian để đọc bài viết này.**