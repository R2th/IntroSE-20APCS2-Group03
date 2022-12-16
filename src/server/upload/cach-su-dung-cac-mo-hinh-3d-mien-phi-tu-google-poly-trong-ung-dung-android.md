Ngày nay nhu cầu trải nghiệm các ứng dụng Android cung cấp công nghệ thực tế ảo giúp cho người dùng có thể nhập vai và trải nghiệm môi trường của ứng dụng một cách chân thực ngày càng gia tăng. Trên thực tế, để tạo ra các ứng dụng như vậy không phải quá khó khăn vì hiện nay có rất nhiều các framework hỗ trợ mạnh mẽ mà bạn có thể sử dụng để tạo các ứng dụng đó. 
   
   Tuy nhiên, để tạo ra các ứng dụng đó thì đầu tiên các bạn phải có các đối tượng 3D cho ứng dụng của mình. Vậy làm thế nào để các bạn có thể tạo các đối tượng 3D sẽ được hiển thị trong các ứng dụng của mình ? Nếu bạn mới chỉ là newbie bạn đã sẵn sàng dành hàng tháng để học cách làm việc với các chương trình mô hình 3D như Blender hay Maya chưa? Nếu bạn không có thời gian hay cũng không phải là một nghệ sĩ 3D lành nghề, bạn nên cân nhắc sử dụng một trong những công cụ vô cùng hữu ích do Google phát triển, đó là Google Poly. Nó là một kho lưu trữ trực tuyến chứa hàng ngàn mô hình 3D đi kèm với giấy phép Creative Commons. 
   
   Hầu hết các mô hình bạn có thể tìm thấy trên Poly ngày nay là các mô hình với số lượng đa giác thấp, đơn giản. Điều này được lý giải là do GPU di động trung bình vẫn chưa đủ mạnh để hiển thị các đối tượng 3D có số lượng đa giác cao trong thời gian thực.

   Trong bài viết này, mình sẽ giới thiệu cho bạn về API Poly. Mình cũng sẽ chỉ cho bạn cách sử dụng API Poly, thêm các đối tượng 3D cho ứng dụng Android của bạn.
   
#    Yêu cầu
   Để tận dụng tối đa bài viết này bạn cần có
   - Android studio phiên bản mới nhất
   - Thiết bị android API 21 trở lên
   - Google Cloud account
    
# 1. Enable Poly APi
- Đầu tiên bạn cần truy cập vào Google Clound [console](https://console.cloud.google.com/) và di chuyển đến bảng điều khiển
- Tiếp theo, chọn Enable APIs and services button, Chọn mục Other, và chọn Poly API

![](https://images.viblo.asia/f526c3c9-2ce3-4424-937d-a335ad130215.png)
- Cuối cùng chỉ cần enable Poly API là chúng ta đã hoàn thành bước đầu tiên

![](https://images.viblo.asia/8a46767b-f502-47fa-83dc-5497ba6f69be.png)

Chú ý: Để xử dụng được Poly API chúng ta cần có một API key do google cấp. Để lấy API Key các bạn có thể tham khảo [link](https://www.iperiusbackup.net/en/how-to-enable-google-drive-api-and-get-client-credentials/) này

# 2. Cài đặt Project
  - Để có thể sử dụng Poly API bạn cần thêm thư viện của nó vào build gradle(module app)
   
       `implementation 'com.github.kittinunf.fuel:fuel-android:1.13.0'`
  - Tiếp theo chúng ta cần thêm thư viện để xử lý việc hiển thị các mô hình 3D trong android
  
      `implementation 'org.p5android:processing-core:4.0.1'`
   - Cuối cùng đưng quên cấp quyền truy cập Internet cho ứng dụng của bạn để nó có thể tải các mô hình 3D từ kho Poly về
       
       `<uses-permission android:name="android.permission.INTERNET"/>`
# 3. Truy cập các mô hình 3D
Để có thể dowload các mô hình 3D, bạn cần có ID của chúng. Chúng ta có thể dễ dàng lấy ID của các mô hình 3D bằng cách sử dụng một trình duyệt hỗ trợ webGL

![](https://images.viblo.asia/390085fc-bd35-4043-96c1-66b21548d725.jpg)

Tuy nhiên, nếu bạn muốn người dùng của mình linh động trong việc lựa chọn các mô hình 3D mà họ muốn sử dụng, bạn có thể sử dụng `assets.list`. Phương thức này cho phép bạn xác định Id của mô hình 3D mà người dùng lựa chọn. Ngoài ra nó cũng cho phép bạn tìm kiếm các mô hình 3D theo các tiêu chí khác nhau như keywords, categories, and 3D file formats

Ở đây, mình sẽ lấy ví dụ thực tế, bây giờ chúng ta hãy cố gắng tìm ID của một vài mô hình 3D thuộc danh mục `Animal`. Tất nhiên, bạn được tự do lựa chọn bất kỳ danh mục hợp lệ nào khác, chẳng hạn như `Architecture`, `Food` hoặc `People`.

Trước khi gủi yêu cầu HTTP, bạn nên khai báo  API Key và URL cơ sở của API Poly

```
companion object {
    const val key = "Abcdefghabcdefgh1234567810"
    const val baseURL = "https://poly.googleapis.com/v1"
}
```

Sử dụng URL cơ sở ơ trên, chúng ta có thể xây dựng URL của phương thức `assets.list` như sau:

     val listURL = "$baseURL/assets"
Tiếp theo, chúng ta cần gửi request để lấy dữ iệu về bằng cách dùng phương thức httpGet(). Trong phương thức này chúng ta cần truyền vào các tham số như API Key (bắt buộc), ngoài ra chúng ta có thể truyền vào các tiêu chí khác như thể loại, định dạng của mô hình 3D,...
```
listURL.httpGet(listOf(
        "category" to "animals",
        "key" to key,
        "format" to "OBJ"
)).responseJson { _, _, result ->
 
    // read JSON data
    
}
```

Ở đoạn mã trên mình đã truyền vào thể loại là `animals` và định dạng của mô hình 3D là `OBJ`. Ngoài ra vì dữ liệu trả về có dạng JSON nên chúng ta cần cung cấp một trình đọc chuỗi JSON để có thể đọc dữ liệu. Dưới đây là một ví dụ bạn có thể sử dụng
```
result.fold({
    // Get assets array
    val assets = it.obj().getJSONArray("assets")
 
    // Loop through array
    for(i in 0 until assets.length()) {
        // Get id and displayName
        val id = assets.getJSONObject(i).getString("name")
        val displayName = 
                assets.getJSONObject(i).getString("displayName")
 
        // Print id and displayName
        Log.d("POLY", "(ID: $id) -- (NAME: $displayName)")
    }
}, {
    // In case of an error
    Log.e("POLY", "An error occurred")
})
```

Trên đây mình có lấy thông tin của các đối tượng được trả về và show ra log. Trường `name`  chính là `ID` của đối tượng. Và đây là kết quả khi mình chạy chương trình :

![](https://images.viblo.asia/4a0553d9-3045-4410-a616-c1ac32ec4222.png)

# 4. Tải về các mô hình 3D
Ở bước 3 mình đã hướng dẫn các bạn làm sao để truy vấn các đối tượng 3D có trong kho Poly thì ở bước này các bạn sẽ được hướng dẫn về cách dowload các mô hình và lưu trữ chúng trong bộ nhớ của thiết bị. Ở bước này chúng ta cần quan tâm tới đối tượng có key là `format` trong chuỗi JSON trả về. Nó là một mảng chứa các đối tượng chứa URL và tên của các file liên kết với các mô hình 3D. Mỗi item của mảng sẽ có 3 trường quan trọng . Đó là :
- FormatType:  cho phép bạn xác định được định dạng của mô hình 3D

- Root, chứa tên và URL của tệp chính được liên kết với các đối tượng

- Resource: chứa chi tiết về tất cả các tệp thứ cấp được liên kết với đối tượng, chẳng hạn như vật liệu và kết cấu

Nếu bạn đang làm việc với mô hình 3D có định dạng OBJ, tệp chính sẽ là tệp có đuôi .obj chứa đỉnh và các mặt của đối tượng cùng với dữ liệu và các tệp phụ thường sẽ là tệp .mtl chứa dữ liệu về các dữ liệu được sử dụng. Đoạn code dưới đây sẽ giúp bạn xác định URL của cả tệp chính và tệp phụ:

```
var objFileURL:String? = null
var mtlFileURL:String? = null
var mtlFileName:String? = null
 
val formats = asset.getJSONArray("formats")
 
// Loop through all formats
for(i in 0 until formats.length()) {
    val currentFormat = formats.getJSONObject(i)
 
    // Check if current format is OBJ
    if(currentFormat.getString("formatType") == "OBJ") {
        // Get .obj file details
        objFileURL = currentFormat.getJSONObject("root")
                                .getString("url")
 
        // Get the first .mtl file details
        mtlFileURL = currentFormat.getJSONArray("resources")
                        .getJSONObject(0)
                        .getString("url")
 
        mtlFileName = currentFormat.getJSONArray("resources")
                        .getJSONObject(0)
                        .getString("relativePath")
        break
    }
}
```

Khi đã có URL của cả tệp chính và tệp phụ, chúng tac có thể sử dụng phương thức `httpDowload() `của thư viện Fuel để bắt đầu dowload các đối tượng 3D như dưới đây:

```
// download and store obj file as asset.obj
objFileURL!!.httpDownload().destination { _, _ ->
    File(filesDir, "asset.obj")
}.response { _, _, result ->
    result.fold({}, {
        Log.e("POLY", "An error occurred")
    })
}
 
// download and store mtl file without
// changing its name
mtlFileURL!!.httpDownload().destination { _, _ ->
    File(filesDir, mtlFileName)
}.response { _, _, result ->
    result.fold({}, {
        Log.e("POLY", "An error occurred")
    })
}
```
# 5. Hiển thị mô hình 3D đã tải về lên ứng dụng

Tất nhiên rồi, đã mất công tải về thì phải hiển thị được nó lên mới đúng phép phải không ạ :)

Cũng tương tự như khi vẽ một view thì chúng ta sẽ cần một đối tượng canvas để vẽ mô hình 3D của chúng ta nên. Tuy nhiên, canvas mặc đinh của android chỉ hỗ trợ vẽ các hình 2D vì vậy chúng ta cần custom lại nó như sau:
```
val canvas = object : PApplet() {
    override fun settings() {
        fullScreen(PConstants.P3D)
    }
}
```

Để khởi tạo thuộc tính, ghi đè phương thức setup () và gọi phương thức loadShape (), chuyển đường dẫn tuyệt đối của tệp .obj mà bạn đã tải xuống làm đối số cho nó.
```
var myPolyAsset: PShape? = null
override fun setup() {
    myPolyAsset = loadShape (File (filesDir, "property.obj"). perfectPath)
}
```

Bây giờ bạn có thể bắt đầu vẽ trên canvas bằng cách ghi đè phương thức draw ()
```
override fun draw() {
    background(0)
    // More code here
}
```
Tuy nhiên, các mô hình khi được vẽ sẽ có kích thước khá nhỏ và bị đảo ngược, vì vậy chúng ta cần custom lại như sau: 
```
scale(-50f)
translate(-4f,-14f)
shape(myPolyAsset)
```
Cuối cùng hiển thị nó lên màn hình thôi
- xml file
```
<FrameLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/canvas_holder">
</FrameLayout>
```
- Fragment
```
val fragment = PFragment(canvas)
fragment.setView(canvas_holder, this)
```
Và đây là kết quả chúng ta thu được

![](https://images.viblo.asia/6bd0917e-cbaf-416e-8c7b-0552f7ec18a3.png)

Trên đây là bài viết của mình. Mong sẽ mang lại cho các bạn những kiến thức bổ ích :)
# Tài liệu tham khảo
- https://code.tutsplus.com/tutorials/how-to-use-free-3d-models-from-google-poly-in-android-apps--cms-31356
- https://developers.google.com/poly/develop/api