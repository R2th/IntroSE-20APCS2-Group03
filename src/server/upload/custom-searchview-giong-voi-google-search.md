# I, Giới thiệu
* Xin chào mọi người lại là mình đây. Dạo gần đây mình có làm 1 dự án có chức năng search nên tiện thể chia sẻ với mọi người luôn.
* Mình thấy hầu hết các bài viết trên về search ở trên Google đều sử dụng RxJava của [MindOrks](https://blog.mindorks.com/implement-search-using-rxjava-operators-c8882b64fe1d).
* Mình cũng dựa vào nó để làm nhưng khi thực hiện trong dự án thì lại gặp các vấn đề khó khăn khác.
* Mình làm tutorial này để chia sẻ các case mà mình đã gặp phải từ đơn giản đến phức tạp.
* **Chú ý**: thời đại architecture component rồi nên mình sẽ sử dụng AndroidX, RxJava. Comming soon: coroutine.
* Nếu bạn thấy cái SearchView mặc định của Google không đẹp thì yên tâm hãy đọc hết bài này bạn cũng có thể tạo ra 1 cái search View dạng như Google mà chỉ bằng SearchView.
* Phần 1: Custom SearchView. kết quả mong muốn sẽ là:

![](https://images.viblo.asia/c81214d2-e167-4f19-9f6f-d715333afa27.png)
* Let's go.

# II, Thực hiện
* Mình sẽ bỏ qua khâu import các dependecy cần thiết nhé. Mọi người phải tự tìm hiểu nhỉ.
* **Bước 1**: Tạo 1 SearchView trong xml:
```
    <androidx.appcompat.widget.SearchView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="56dp" />
```
* Đây là kết quả bạn nhận được:

![](https://images.viblo.asia/bafe52c1-0402-407e-8591-b19516cdab94.png)
![](https://images.viblo.asia/d9ccd551-0e80-451d-9dc9-02c1c1176684.png)

*  Hai trạng thái unfocus và focus lại hiển thị 2 kiểu khác nhau. Điều này mình sẽ giải thích sau.
*  Nhìn hơi chán nhỉ :sweat_smile:.
*  **Bước 2**: Thống nhất 1 kiểu hiển thị giữa 2 trạng thái thôi
```
app:iconifiedByDefault="false"
```
*   Kết quả là chỉ có 1 kiểu hiển thị dù nó được focus hay không 

![](https://images.viblo.asia/0c36021f-f297-4e69-b080-442469ccd984.png)
* **Bước 3**: Loại bỏ submit query background:
* Ở bước 2, chúng ta thấy 1 background được insert ở bottom của SearchView. Mình sẽ phải loại bỏ nó.
```
 app:queryBackground="@null"
```
* Kết quả là:

![](https://images.viblo.asia/4a9ebd7d-d910-42bb-8d20-a1452630bf23.png)
*  **Bước 4**: Tạo cho SearchView 1 background:
*  Tạo 1 drawable trong res/drwable folder có tên là *shapebgsearch.xml*:
```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">

    <stroke
        android:width="0.5dp"
        android:color="#000000" />

    <solid android:color="#33FFFFFF" />

    <corners
        android:bottomLeftRadius="8dp"
        android:bottomRightRadius="8dp"
        android:topLeftRadius="8dp"
        android:topRightRadius="8dp" />
</shape>
```
*  Các color và dimen chỉ là mình ví dụ minh họa thôi mọi người có thể thay đổi tùy ý muốn của mình nhé.
*  Và đây là kết quả:

![](https://images.viblo.asia/c9a20cc0-d29a-4694-911f-4cd51b8a7f50.png)
*  Nhìn có đẹp và bắt mặt hơn rồi. Nhưng vẫn cần hoản thiện hơn nữa.
*  **Bước 5** (Optional): Set search icon:
*  Dùng *vector asset* tool của Android studio để tạo ra 1 vector có tên là *ic_menu.xml*:
```
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24.0"
    android:viewportHeight="24.0">

    <path
        android:fillColor="#7f000000"
        android:pathData="M3,18h18v-2L3,16v2zM3,13h18v-2L3,11v2zM3,6v2h18L21,6L3,6z" />
</vector>
```
*  Tiếp đó set search icon cho SearchView:
```
    app:searchIcon="@drawable/ic_menu"
```
*  Đây là kết quả:
![](https://images.viblo.asia/611893bd-fb46-4d0c-95ff-8112d6496138.png)

* **Bước 6** (optional): Enable voice search:
* Trong res/xml folder tạo file *searchable.xml*:
```
<?xml version="1.0" encoding="utf-8"?>
<searchable xmlns:android="http://schemas.android.com/apk/res/android"
    android:hint="@string/search_hint"
    android:label="@string/app_name"
    android:voiceSearchMode="showVoiceSearchButton|launchRecognizer" />
```
* Tiếp theo trong *AndroidManifest.xml* thêm vào trong thẻ <activity> của Activity chứa SearchView:
```
<activity android:name=".MainActivity">

    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
        <action android:name="android.intent.action.SEARCH" />
    </intent-filter>
    
    <meta-data
        android:name="android.app.searchable"
        android:resource="@xml/searchable" />
</activity>
```
* Ở Acitivy hay Fragment chứa SearchView thêm:
```
val searchManager = getSystemService(Context.SEARCH_SERVICE) as SearchManager
search.setSearchableInfo(searchManager.getSearchableInfo(componentName))
```
* Kết quả là:
![](https://images.viblo.asia/8e835776-5447-48d5-8ef2-180233c9465a.png)

* **Bước 7** (optional): Loại bỏ submit background:
* Sau khi bạn enable voice search, nếu để ý kĩ sẽ thấy 1 background với 1 gạch nằm bên dưới của voice search. Đây là background của submit layout.
* Để loại bỏ nó bạn thêm:
```
app:submitBackground="@null"
```
* Và kết quả là:

![](https://images.viblo.asia/c81214d2-e167-4f19-9f6f-d715333afa27.png)
# III, Full xml code

* Toàn bộ code trong xml được tổng hợp dưới đây:
```
<androidx.appcompat.widget.SearchView
    android:id="@+id/search"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginStart="16dp"
    android:layout_marginTop="56dp"
    android:layout_marginEnd="16dp"
    android:background="@drawable/shape_bg_search"
    app:iconifiedByDefault="false"
    app:queryBackground="@null"
    app:searchIcon="@drawable/ic_menu"
    app:submitBackground="@null" />
```

# IV, Giải thích (optional)
* Mình sẽ thực hiện câu "Điều này mình sẽ giải thích sau" ở bước 1 - II nhé.
* Mình tìm ra được những chi tiết nhỏ nhặt và ý nghĩa của SearchView: query background, submit background... là đều do mình đã xem source của nó.
* Bấm tổ hợp shift + shift và bạn find file *abcsearchview.xml*: đây chính là file cấu tạo nên SearchView của chúng ta.
* **Ví dụ**: LinearLayout có id = submit_area sẽ tương ứng với thuộc tính tương ứng như app:submitBackground chẳng hạn.
* Ngoài ra bạn cũng có thể dùng SearchView#findViewById() và điền 1 id trong layout này để custom SearchView của bạn theo ý muốn.

# V, Tổng kết
* Search là 1 tác vụ phổ biến trong Android.
* Việc custom SearchView cũng là 1 tác vụ cần thiết để UI/UX phù hợp với user.
* Hi vọng bài viết này sẽ giúp các bạn nhiều hơn trong khi làm việc với search.
* **Những thứ nhỏ nhất là những thứ quan trọng nhất**.