Android 8.0 (API 26) giới thiệu một tính năng mới, đó là Fonts trong XML, cái này sẽ cho phép bạn sử dụng các fonts như resource (giống như color, drawable ....). Yolo, các bạn có thể thêm **font** file vào trong **res/font** folder để đóng gói fonts như là resouce. Những fonts này sẽ được compile trong file R của ứng dụng, và sẽ được Android Studio suggets cho các bạn luôn. Bạn có thể truy cập vô font resource theo 2 cách như vầy nè : **@font/myfont** hoặc **R.font.myfont**.
Ngon, nếu sử dụng Support Library 26, tính năng font XML này sẽ được chạy trên các devices có API 16 trở lên (Android 4.1). Tham khảo thêm [cái này](https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml#using-support-lib) để biết thêm thông tin chi tiết nha baby.


Sau đây là cách để thêm fonts như là một loại resource nè:
1. *Right-click* vào **res** folder và chọn **New > Android resource directory**.
2. Trong *Resource type*, chọn **font**, rồi click vô **OK**![](https://images.viblo.asia/7811ba61-c0e8-4b22-99ec-96bfeb9bc11f.png)
3. Thêm file font vào **font** folder
Cấu trúc của nó dạng dạng như nầy![](https://images.viblo.asia/ea477ddb-417b-4a3d-acf7-7d5c809c014e.png) 
4. Double-click vào một font để xem trước cái font đó như nào ![](https://images.viblo.asia/573ca01f-369b-4023-92c0-c620df168862.png)

#### Create a font family

Một font family là một tập hợp các file font chữ đi cùng nhau với style và weight riêng. Trong Android, bạn có thể tạo ra một font family mới với XML resource và truy cập nó như là một đơn vị duy nhất, thay cho việc bạn phải truy cập tới từng style của nó. Bằng cách như vầy, system có thể chọn được đúng là font dựa trên text-style bạn bạn đang dùng.
Dưới đây là cách tạo ra font family nhé :
1. Right-click vào **font** folder và chọn **New > Font resouce file**. Cửa sổ **New Resource File** sẽ xuất hiện.
2. Nhập vào tên mà bạn muốn rồi click **OK**. Font resource XML sẽ được mở ra trong editor
3. Rồi, điền vào từng font mà bạn mong muốn hiển thị trong tag *<font>*. Font mà bạn điền vào phải được add vào trong font resource rồi nhé.
```
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android">
    <font
        android:fontStyle="normal"
        android:fontWeight="400"
        android:font="@font/lobster_regular" />
    <font
        android:fontStyle="italic"
        android:fontWeight="400"
        android:font="@font/lobster_italic" />
</font-family>
```
    
#### Using fonts in XML layouts  
Ok, đến lúc lôi fonts ra dùng roài, lúc này, bạn có thể sử dụng font file riêng biệt hoặc sử dụng font family, trong TextView hoặc trong styles. Để sử dụng với **TextView** sử dụng attribute *fontFamily* nhé.
###
> Nốt: Khi sử dụng font family, TextView sẽ tự động chuyển style trong file font-family theo như nó được set style 


###
**Thêm font vào TextView**

Set font cho TextView:

* Trong XML, sử dụng thuộc tính fontFamily để truy cập vào font bạn muốn
```
<TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/lobster"/>
```
* Mở cửa sổ Properties ra, mở rộng **textAppearance** và chọn *fontFamily* ![](https://images.viblo.asia/86e82291-6d10-4a35-8e9b-f228c3339f86.png)

Và nó ngon như vầy nè 
![](https://images.viblo.asia/91a97a58-b1f4-4db7-ab90-8893ea12804e.png)

Sử dụng font trong Code
Để nhận được fonts, gọi phương thức **getFont(int)** và truyền vào id của font mà bạn muốn lấy . Phương thức này trả về một **Typeface** object. Sau đó bạn có thể sử dụng **setTypeface (typeface, int)** để set font cho text-view
```
Typeface typeface = getResources().getFont(R.font.myfont);
textView.setTypeface(typeface);
```

Using the support library
Support Library 26.0 hỗ trợ Fonts trong XML trên các thiết bị android 4.1 trở lên (nhớ sử dụng **app** namespace)
```
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:app="http://schemas.android.com/apk/res-auto">
    <font app:fontStyle="normal" app:fontWeight="400" app:font="@font/myfont-Regular"/>
    <font app:fontStyle="italic" app:fontWeight="400" app:font="@font/myfont-Italic" />
</font-family>
```

Để lấy fonts trong code, gọi phương thức **ResourceCompat.getFont(Context, int)**, truyền Context và Font id vào để lấy được font 
```
Typeface typeface = ResourcesCompat.getFont(context, R.font.myfont);
```

OK, với tính năng mới này, anh em không còn phải copy fonts vào trong thư mục asset rồi lôi ra nữa, hy vọng Android sẽ tiếp tục cho ra mắt nhiều tính năng hay hơn như này nữa trong tương lai. Bey bey anh em.

##### Tham khảo 
[Fonts in XML](https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml)