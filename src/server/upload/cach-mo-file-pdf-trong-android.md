![](https://images.viblo.asia/ed5048a1-7d32-4e70-a874-cf1666a6fd47.png)

Mở và xem tài liệu trong các ứng dụng **Android** là một tính năng rất hữu ích và nên có trong mọi ứng dụng. Bạn có thể mở bất kỳ ứng dụng nào có trên điện thoại di động của mình và bạn sẽ thấy rằng hầu hết chúng đều chứa các file tài liệu theo các cách khác nhau.

Và trong số các tài liệu này, định dạng tài liệu phổ biến và được sử dụng rộng rãi nhất chính là định dạng **PDF**. Định dạng **PDF** hay **Portable Document Format** là một định dạng tệp chứa tất cả các yếu tố của tài liệu in. Đây là định dạng tài liệu được sử dụng nhiều nhất. Ví dụ: trong các ứng dụng thanh toán, bạn có thể nhận được hóa đơn chi phí hàng tháng của mình dưới dạng tài liệu PDF. 

Vì vậy, nếu bạn muốn hiển thị một số loại tài liệu trong ứng dụng của mình, thì bạn có thể sử dụng định dạng PDF. Và bài viết này có mục đích giới thiệu các cách để mở tệp PDF trong ứng dụng Android. Hi vọng bạn sẽ tìm được cách phù hợp với ứng dụng của mình.

## Mở tệp PDF sử dụng WebView

Cách đầu tiên và dễ nhất để hiển thị tệp PDF là hiển thị tệp đó trong **WebView**. Tất cả những gì bạn cần làm chỉ là đặt **WebView** trong file layout và tải tệp PDF thông qua URL chuyên sử dụng để xem tài liệu của **Google Docs**  bằng cách sử dụng hàm `webView.loadUrl()`.

Trong trường hợp của tôi, tên Activity là **WebViewPdf**. Và file layout là **activity_web_view_pdf.xml:**

```java
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <WebView
            android:id="@+id/webView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>
</RelativeLayout>
```

Và file **WebViewPdf.kt:**
```java
class WebViewPdf : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_web_view_pdf)

        webView.webViewClient = WebViewClient()
        webView.settings.setSupportZoom(true)
        webView.settings.javaScriptEnabled = true
        val url = "Đường dẫn file pdf của bạn"
        webView.loadUrl("https://docs.google.com/gview?embedded=true&url=$url")
    }
}
```

<br>
Hạn chế của cách này là bạn phải phụ thuộc vào đường dẫn viewer của Google, nếu nó bị thay đổi thì bạn cũng phải thay đổi theo một cách thủ công.

## Mở tệp PDF bằng thư viện

Có nhiều thư viện khác nhau trong Android có thể được sử dụng để hiển thị các tệp PDF. Một ví dụ là thư viện **PDFViewer** để đọc tệp PDF và thư viện **File-Loader** để tải xuống tệp từ Internet và sau đó hiển thị tệp đó trong ứng dụng.

Trong file **build.gradle** mức project của bạn, hãy thêm dòng mã dưới đây:
```java
repositories {
    google()
    jcenter()
    maven {url "https://jitpack.io"}//add this line
}
```
Và ở trong file **build.gradle** mức module:
```java
implementation 'com.github.barteksc:android-pdf-viewer:2.8.2'
implementation 'com.github.kk121:File-Loader:1.2'
```

Sau khi thêm xong các `dependencies`, bạn cần thêm các quyền sau trong tệp **AndroidManifest.xml:**
```java
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Từ thư mục Assets

Đầu tiên, chúng ta sẽ xem xét cách xem tệp PDF được lưu trữ trong thư mục **assets**.

Trước tiên, cần phải có giao diện cho người dùng, với các button để mở tệp PDF từ những nơi khác nhau (asset folder, ở trong thiết bị, từ internet) - **activity_main.xml**:
```java
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    
    <LinearLayout
            android:orientation="vertical"
            android:layout_centerInParent="true"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">
        <Button
                android:id="@+id/open_assets"
                android:text="From Assets"
                android:layout_width="320dp"
                android:layout_height="wrap_content" />
        <Button
                android:id="@+id/open_storage"
                android:text="From Device"
                android:layout_width="320dp"
                android:layout_height="wrap_content" />
        <Button
                android:id="@+id/open_internet"
                android:text="From Internet"
                android:layout_width="320dp"
                android:layout_height="wrap_content" />
    </LinearLayout>

</RelativeLayout>
```

Tiếp theo, tạo một Activity để hiển thị các tệp PDF trong ứng dụng - **ViewActivity** và **activity_view.xml**:
```java
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ViewActivity">

    <com.github.barteksc.pdfviewer.PDFView
            android:id="@+id/pdf_viewer"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
    </com.github.barteksc.pdfviewer.PDFView>
    <ProgressBar
            android:id="@+id/progress_bar"
            android:indeterminate="true"
            android:layout_centerInParent="true"
            android:visibility="gone"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />
</RelativeLayout>
```

Bước tiếp theo là thêm tệp PDF trong thư mục **assets**. Bạn có thể tạo một thư mục **asset** bằng cách click chuột phải vào thư mục java sau đó **New > Folder > Asset Folder**

Sau đó, thêm đoạn code dưới đây để xử lý sự kiện `onClick` cho các button:

```java
class MainActivity : AppCompatActivity() {

    val PICK_PDF_CODE = 1000
    lateinit var btn_open_assets: Button//for assets
    lateinit var btn_open_storage:Button//for phone storage
    lateinit var btn_opn_intenet:Button//for internet

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn_open_assets = findViewById(R.id.open_assets)

        btn_open_assets.setOnClickListener(object: View.OnClickListener {
            override fun onClick(view:View) {
                val intent = Intent(this@MainActivity, ViewActivity::class.java)
                intent.putExtra("ViewType", "assets")
                startActivity(intent)
            }
        })
    }
}
```

Bây giờ, chúng ta sẽ sử dụng thư viện **PDFViewer** để thực hiện các hoạt động khác nhau trên PDF, ví dụ như đặt trang mặc định bằng cách sử dụng phương thức **defaultPage()**, bật sự kiện vuốt bằng cách sử dụng **enableSwipe()** hay cho phép chạm hai lần để phóng to bằng cách sử dụng **enableDoubletap()** - **ViewActivity.kt:**
```java
class ViewActivity : AppCompatActivity() {

    lateinit var pdfView: PDFView
    lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_view)

        pdfView = findViewById(R.id.pdf_viewer)
        progressBar = findViewById(R.id.progress_bar)
        if (intent != null)
        {
            val viewType = intent.getStringExtra("ViewType")
            if (viewType != null || TextUtils.isEmpty(viewType))
            {
                if (viewType == "assets")
                {
                    pdfView.fromAsset("github_git_cheat_sheet.pdf")
                        .password(null)//enter password if PDF is password protected
                        .defaultPage(0)//set the default page
                        .enableSwipe(true)//enable the swipe to change page
                        .swipeHorizontal(false)//set horizontal swipe to false
                        .enableDoubletap(true)//double tap to zoom
                        .onDraw(object: OnDrawListener {
                            override fun onLayerDrawn(canvas: Canvas, pageWidth:Float, pageHeight:Float, displayedPage:Int) {
                            }
                        })
                        .onDrawAll(object: OnDrawListener {
                            override fun onLayerDrawn(canvas:Canvas, pageWidth:Float, pageHeight:Float, displayedPage:Int) {
                            }
                        })
                        .onPageError(object: OnPageErrorListener {
                            override fun onPageError(page:Int, t:Throwable) {
                                Toast.makeText(this@ViewActivity, "Error", Toast.LENGTH_LONG).show()
                            }
                        })
                        .onPageChange(object: OnPageChangeListener {
                            override fun onPageChanged(page:Int, pageCount:Int) {
                            }
                        })
                        .onTap(object: OnTapListener {
                            override fun onTap(e: MotionEvent):Boolean {
                                return true
                            }
                        })
                        .onRender(object: OnRenderListener {
                            override fun onInitiallyRendered(nbPages:Int, pageWidth:Float, pageHeight:Float) {
                                pdfView.fitToWidth()
                            }
                        })
                        .enableAnnotationRendering(true)
                        .invalidPageColor(Color.WHITE)
                        .load()
                }
            }
        }
    }
}
```

Tương tự bạn có thể lấy file PDF có sẵn trong thiết bị ra để hiển thị. 

## Từ Internet
Trước tiên, chúng ta sẽ phải tải xuống tập tin PDF mongm uốn bằng cách sử dụng **FileLoader** và sau đó sử dụng tệp này để hiển thị trên **ViewActivity** sử dụng quy trình tương tự như trên. Nhưng ở đây bạn sẽ phải sử dụng **fromFile()** để thêm hiển thị PDF. Đây là code cho file **ViewActivity.kt**:
```java
if (viewType == "assets") {
    ...
    ...
    //assets code    
}
else if (viewType == "storage") {
    ...
    ...
    //storage code
}
else if (viewType == "internet")
{
    progressBar.visibility = View.VISIBLE
    FileLoader.with(this)
        .load("https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf")
        .fromDirectory("PDFFiles", FileLoader.DIR_EXTERNAL_PUBLIC)
        .asFile(object: FileRequestListener<File> {
            override fun onLoad(fileLoadRequest: FileLoadRequest, fileResponse: FileResponse<File>) {
                progressBar.visibility = View.GONE
                val pdfFile = fileResponse.getBody()
                pdfView.fromFile(pdfFile)
                    .password(null)
                    .defaultPage(0)
                    .enableSwipe(true)
                    .swipeHorizontal(false)
                    .enableDoubletap(true)
                    .onDraw(object:OnDrawListener {
                        override fun onLayerDrawn(canvas:Canvas, pageWidth:Float, pageHeight:Float, displayedPage:Int) {
                        }
                    })
                    .onDrawAll(object:OnDrawListener {
                        override fun onLayerDrawn(canvas:Canvas, pageWidth:Float, pageHeight:Float, displayedPage:Int) {
                        }
                    })
                    .onPageError(object:OnPageErrorListener {
                        override fun onPageError(page:Int, t:Throwable) {
                            Toast.makeText(this@ViewActivity, "Error", Toast.LENGTH_LONG).show()
                        }
                    })
                    .onPageChange(object:OnPageChangeListener {
                        override fun onPageChanged(page:Int, pageCount:Int) {
                        }
                    })
                    .onTap(object:OnTapListener {
                        override fun onTap(e:MotionEvent):Boolean {
                            return true
                        }
                    })
                    .onRender(object:OnRenderListener {
                        override fun onInitiallyRendered(nbPages:Int, pageWidth:Float, pageHeight:Float) {
                            pdfView.fitToWidth()
                        }
                    })
                    .enableAnnotationRendering(true)
                    .invalidPageColor(Color.WHITE)
                    .load()
            }
            override fun onError(fileLoadRequest:FileLoadRequest, throwable:Throwable) {
                Toast.makeText(this@ViewActivity, "Error", Toast.LENGTH_LONG).show()
                progressBar.setVisibility(View.GONE)
            }
        })
}
```
Hoàn thành rồi, bạn hãy chạy ứng dụng và kiểm tra thử thành quả nhé.