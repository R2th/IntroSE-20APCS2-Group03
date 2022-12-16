# Plugin sử dung : image_downloader 0.30.0
Image Downloader là một plugin dùng để download ảnh và video từ internet và lưu trữ trong thư mục "Photo Library" trên IOS hoặc là một thư mục được chỉ định trên Android.
Mặc định thì plugin sẽ lấy thời gian thực để làm tên file khi download về. Nhưng bạn cũng có thể thay đổi nó.

## Bắt đầu.

### IOS

Thêm các khóa sau vào tệp Info.plist , nằm trong mục <project root>/ios/Runner/Info.plist:
  
  * NSPhotoLibraryUsageDescription - Chỉ định lý do để ứng dụng của bạn truy cập vào thư viện ảnh của người dùng. 
  * NSPhotoLibraryAddUsageDescription - Chỉ định lý do để ứng dụng của bạn có quyền truy cập chỉ ghi vào thư viện ảnh của người dùng.
  
### Android

Thêm permission in ```AndroidManifest.xml```. (Nếu bạn gọi ```AndroidDestinationType#inExternalFilesDir()```, Thì cài đặt này không cần.)

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

## Ví dụ

### Cơ bản

```dart
try {
  // Saved with this method.
  var imageId = await ImageDownloader.downloadImage("https://raw.githubusercontent.com/wiki/ko2ic/image_downloader/images/flutter.png");
  if (imageId == null) {
    return;
  }

  // Below is a method of obtaining saved image information.
  var fileName = await ImageDownloader.findName(imageId);
  var path = await ImageDownloader.findPath(imageId);
  var size = await ImageDownloader.findByteSize(imageId);
  var mimeType = await ImageDownloader.findMimeType(imageId);
} on PlatformException catch (error) {
  print(error);
}
```

Các giá trị trả về.

* imageId của hình ảnh đã lưu nếu lưu thành công.
* null nếu không được cấp quyền.
* Nếu không thì nó là một PlatformException.

### Nâng cao

Bạn có thể chỉ định một đường dẫn cụ thể.    
(hiện tại, external storage chỉ support cho Android.)

Có 3 thư mục được cung cấp mặc định.

* AndroidDestinationType.directoryDownloads -> Environment.DIRECTORY_DOWNLOADS trên Android
* AndroidDestinationType.directoryPictures -> Environment.DIRECTORY_PICTURES trên Android
* AndroidDestinationType.directoryDCIM -> Environment.DIRECTORY_DCIM trên Android
* AndroidDestinationType.directoryMovies -> Environment.DIRECTORY_MOVIES trên Android

Ví dụ: 

```dart
await ImageDownloader.downloadImage(url,
                                    destination: AndroidDestinationType.custom('sample')                                  
                                    ..subDirectory("custom/sample.png"),
        );
```
hoặc
    
 ```dart
await ImageDownloader.downloadImage(url,
                                   destination: AndroidDestinationType.directoryDownloads
                                  ..subDirectory("demo/" + filename),
        );
```
hoặc
    
```dart
 await ImageDownloader.downloadImage(url,
                                     destination: AndroidDestinationType.custom('sample')
                                     ..inExternalFilesDir()
                                     ..subDirectory("custom/sample.gif"),
         );
```
 
Chú ý: ```inExternalFilesDir()``` cần yêu cầu ```WRITE_EXTERNAL_STORAGE``` permission, nhưng hình ảnh đã tải xuống cũng sẽ bị xóa khi gỡ cài đặt.


##  Progress

Lấy giá trị progress.   
chú ý: trên iOS, ```onProgressUpdate``` không lấy được imageId.

```dart
  @override
  void initState() {
    super.initState();

    ImageDownloader.callback(onProgressUpdate: (String imageId, int progress) {
      setState(() {
        _progress = progress;
      });
    });
  }
```

## Downloading multiple files

Bạn có thể sử dụng ```await``` .

```dart
var list = [
  "https://raw.githubusercontent.com/wiki/ko2ic/image_downloader/images/bigsize.jpg",
  "https://raw.githubusercontent.com/wiki/ko2ic/image_downloader/images/flutter.jpg",
  "https://raw.githubusercontent.com/wiki/ko2ic/image_downloader/images/flutter_transparent.png",
  "https://raw.githubusercontent.com/wiki/ko2ic/flutter_google_ad_manager/images/sample.gif",
  "https://raw.githubusercontent.com/wiki/ko2ic/image_downloader/images/flutter_no.png",
  "https://raw.githubusercontent.com/wiki/ko2ic/image_downloader/images/flutter.png",
];

List<File> files = [];

for (var url in list) {
  try {
    var imageId = await ImageDownloader.downloadImage(url);
    var path = await ImageDownloader.findPath(imageId);
    files.add(File(path));
  } catch (error) {
    print(error);
  }
}
setState(() {
  _mulitpleFiles.addAll(files);
});
```

## Preview

Có một phương thức ``` open ``` để có thể xem trước ngay tệp tải xuống.
Nếu bạn gọi nó, trong trường hợp của ios, một màn hình xem trước sử dụng UIDocumentInteractionController được hiển thị. Trong trường hợp của Android, nó được hiển thị bởi Intent.

```dart
var imageId = await ImageDownloader.downloadImage(url);
var path = await ImageDownloader.findPath(imageId);
await ImageDownloader.open(path);
```

Lưu ý: trong trường hợp của Android, để sử dụng tính năng này, cần phải có các cài đặt sau.

Thêm các dòng sau vào tag ``` <application\>```  trong  ```AndroidManifest.xml``` .

```xml
        <provider
                android:name="com.ko2ic.imagedownloader.FileProvider"
                android:authorities="${applicationId}.image_downloader.provider"
                android:exported="false"
                android:grantUriPermissions="true">
            <meta-data
                    android:name="android.support.FILE_PROVIDER_PATHS"
                    android:resource="@xml/provider_paths"/>
        </provider>
```

Thêm ```provider_paths.xml```  trong  ```android/app/src/main/res/xml/``` .

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <external-path name="external_files" path="."/>
</paths>
```

## Open
Nếu không thể xem trước tệp, thì ``` preview_error ``` sẽ được log ra.

```dart
  await ImageDownloader.open(_path).catchError((error) {
    if (error is PlatformException) {
      if (error.code == "preview_error") {
        print(error.message);
      }
    }    
  });
```
## Kiểm tra file downloaded
    
 ```dart
    bool checkPhotoIsDownloaded(String filename) {
       if (Platform.isAndroid) {
         bool exists =
             new File(ANDROID_DIRECTORY_DOWNLOADS + filename).existsSync();
         return exists;
       }
       return false;
     }    
  ```
    
 ## Tài liệu tham khảo
    
https://github.com/HarryHaiVn/Downloader-Photo
https://github.com/ko2ic/image_downloader