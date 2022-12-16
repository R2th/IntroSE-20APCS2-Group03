Nếu bạn nâng cấp targetSDK của ứng dụng lên Android Oreo (API 26) và gặp phải lỗi crash SecurityException, bạn có thể đã đến đúng nơi cần đến rồi đó :D. Bài viết này sẽ cho bạn một ví dụ nhanh làm thế nào để sửa lỗi crash đó.

Google Play mới đây yêu cầu các ứng dụng khi phát hành hoặc cập nhật phải hỗ trợ Android Oreo. Ngày hôm qua, tôi đã nâng targetSDK của ứng dụng của tôi lên Android 8.0, kiểm tra lại ứng dụng xem có hoạt động trơn tru không thì phát hiện ra một lỗi crash đó là chọn profile photo thì dẫn đến crash mặc dù trước đó các phiên bản trước với targetSDK dưới 26 vẫn hoạt động bình thường. Tính năng đó là chọn một bức ảnh từ máy và crop thành bức ảnh vuông.
Việc chọn ảnh vẫn ổn bởi vì tôi đã có FileProvider trong AndroidManifest.xml, nhưng khi lấy Uri của file nh đã crop thì đẫn đến crash.
Code như sau:

```Java
outputUri = Uri.fromFile(new File(activity.getCacheDir(), "cropped"));
ContentResolver cr = activity.getContentResolver();
cr.notifyChange(outputUri, null);
```

Crash trong dòng cuối cùng khi gọi `notifyChange(outputUri, null)` và logcat như sau:
```
java.lang.SecurityException: Failed to find provider for user 0; expected to find a valid ContentProvider for this authority
```

Tài liệu của Android 8.0 cũng nói như sau:

> Android 8.0 (API level 26) changes how ContentResolver.notifyChange() and registerContentObserver(Uri, boolean, ContentObserver) behave for apps targeting Android 8.0.
These APIs now require that a valid ContentProvider is defined for the authority in all Uris. Defining a valid ContentProvider with relevant permissions will help defend your app against content changes from malicious apps, and prevent you from leaking potentially private data to malicious apps.

Như mọi khi thì tài liệu Android không cung cấp một ví dụ làm thế nào để sửa việc tương thích khi nâng cấp API, điều đó đã làm tôi tốn nguyên một ngày, tìm kiếm cho việc làm sao để implement một ContentProvider hợp lệ một cách tốt nhất.

Hôm nay tôi đã tìm được giải pháp. Tôi tạo một class tên là PhotoProvider kế thừa từ ContentProvider và tự động thêm các method cần implement. Tôi khai báo một static final String cho authority và cuối cùng thêm một method static trả về Uri. Toàn bộ class như bên dưới:

```Java
public class PhotoProvider extends ContentProvider {

    public static final String CONTENT_PROVIDER_AUTHORITY = "com.example.magnificentapp.PhotoProvider";

    @Override
    public boolean onCreate() {
        return true;
    }

    @Nullable
    @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        return null;
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {
        return null;
    }

    @Nullable
    @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) {
        return null;
    }

    @Override
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }

    public static Uri getPhotoUri(File file) {
        Uri outputUri = Uri.fromFile(file);
        Uri.Builder builder = new Uri.Builder()
                .authority(CONTENT_PROVIDER_AUTHORITY)
                .scheme("file")
                .path(outputUri.getPath())
                .query(outputUri.getQuery())
                .fragment(outputUri.getFragment());

        return builder.build();
    }
}
```

Authority của provider chính là giá trị của CONTENT_PROVIDER_AUTHORITY.

Và đừng quên return true bên trong onCreate method.

Cuối cùng thì getPhotoUri(File file) cũng hoạt động, tôi đã truyền đối tượng File vào method và lấy ra Uri với fromFile(file) tương tự như cách tôi làm phía trên kia, sau đó tôi sử dụng Uri.Builder và copy các trường cần thiết từ `outputUri` không hợp lệ, và cuối cùng set authority thành `CONTENT_PROVIDER_AUTHORITY`.

Thực tế rôi bắt chước theo  method `Uri.fromFile(file)` ngoại trừ việc set custom authority. nguyên bản của method đó như dưới đây, bên trong Uri class:

```Java
public static Uri fromFile(File file) {
    if (file == null) {
        throw new NullPointerException("file");
    }

    PathPart path = PathPart.fromDecoded(file.getAbsolutePath());
    return new HierarchicalUri(
            "file", Part.EMPTY, path, Part.NULL, Part.NULL);
}
```

Method này set authority là Part.EMPTY vì vậy Android Oreo crash. Set authority đã giải quyết được vấn đề và giúp Android bảo vệ dữ liệu của bạn (ảnh trong trường hợp của tôi) khỏi các ứng dụng độc hại.

Và một điều nữa xin đừng quên thêm provider vào AndroidManifest.xml

```XML
<provider
    android:name="com.example.magnificentapp.PhotoProvider"
    android:authorities="com.example.magnificentapp.PhotoProvider"
    android:exported="false"
    android:grantUriPermissions="true" />
```

Cuối cùng tôi gọi PhotoProvider.getPhotoUri(file) thay vì Uri.fromFile(file) như phía dưới:
```Java
outputUri = PhotoProvider.getPhotoUri(new File(activity.getCacheDir(), "cropped"));
ContentResolver cr = activity.getContentResolver();
cr.notifyChange(outputUri, null);
```

Bây giờ mọi thứ đã hoạt động đúng theo những gì mong muốn.

HẾT

Bài dịch từ nguồn [Fixing SecurityException requiring a valid ContentProvider on Android 8](https://medium.com/@egemenhamutcu/fixing-securityexception-requiring-a-valid-contentprovider-on-android-8-1110d840522)