Có thể các bạn cũng đã biết thì từ trên các hệ điều hành android mới giúp bảo vệ tốt hơn cho dữ liệu ứng dụng và người dùng trên bộ nhớ ngoài. Những việc thao tác trực tiếp thông qua filePath  sẽ không thể sử dụng được nữa đối với các developer android.

Và google cũng đã tạo ra một flag là `requestLegacyExternalStorage` trên Android 10 cho các developer có thêm thời gian để cập nhật ứng dụng của mình để tương thích với cập nhật mới này. Tuy nhiên flag này sẽ trở nên vô tác dụng trên Android 11
(Chi tiết hơn bạn có thể xem thêm tại [link full HD này](https://developer.android.com/preview/privacy/storage))
Việc không thể lấy được trường file path nữa sẽ gây tương đối khó khăn trong việc xử lý file trên android như: đọc file, upload file,...

Trong bài viết này mình sẽ suggest các bạn phương pháp để có thể upload file thông qua uri.

Giả sử mình có api để tạo người dùng với Body cần thiết bao gồm "name", "date_of_birth" với 1 file ảnh là ảnh đại diện của người dùng.

```java
public interface APIService {

    @Multipart
    @POST("add_user")
    Single<User> addUser(@Part("name") RequestBody name,
                                                 @Part("date_of_birth") RequestBody dateOfBirth,
                                                 @Part MultipartBody.Part avatar);
```

Chọn ảnh từ thư viện

```java
    public void pickImage(){
                   Intent intent = new Intent();
                intent.setAction(Intent.ACTION_GET_CONTENT);
                intent.setType("image/*");
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), 1);
    }
    
    @Override
    public void onActivityResult(final int requestCode, final int resultCode, @Nullable final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            if (requestCode == 1 && data != null) {
                Uri uri = data.getData();
                viewmodel.setUriImage(uri);
            }
        }
    }
```

Tạo request body từ Uri

```java
    public class FileRequestBody extends RequestBody {

    private InputStream inputStream;

    private MediaType type;

    public UploadFileRequestBody(InputStream inputStream, MediaType type) {
        this.inputStream = inputStream;
        this.type = type;
    }

    @Override
    public MediaType contentType() {
        return type;
    }

    @Override
    public long contentLength() throws IOException {
        return inputStream.available();
    }

    @Override
    public void writeTo(@NonNull BufferedSink sink) throws IOException {
        Source source = null;
        try {
            source = Okio.source(inputStream);
            sink.writeAll(source);
        } catch (Exception e) {
            if (source != null) {
                source.close();
            }
        }
    }
}
```

Hàm lấy mediaType của file trong class Utils

```java
    class Utils {
        public static String getContentType(Uri uri) {
            String type = null;
            Cursor cursor = <Your Application>.getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null) {
                    cursor.moveToFirst();
                    type = cursor.getString(cursor.getColumnIndex(Media.MIME_TYPE));
                    cursor.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return type;
        }
    }
```

Call api add User

```java
    public Single<User> addUser(String name, String dateOfbirth, Uri imageUri) {
        RequestBody nameBody = RequestBody.create(MediaType.parse("text/plain"), name);
        RequestBody dateOfBirthBody = RequestBody.create(MediaType.parse("text/plain"), dateOfbirth);
        String contentType = Utils.getContentType(uri)
        FileRequestBody requestBody = new FileRequestBody(<Your Application>.getContentResolver().openInputStream(imageUri), contentType);
        MultipartBody.Part imageBody = MultipartBody.Part.createFormData("filename", "<Your file name>", requestBody);
        
        return apiService.addUser(nameBody, dateOfBirthBody, imageBody);
    }
```