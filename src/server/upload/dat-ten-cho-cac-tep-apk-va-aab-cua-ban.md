Bài viết này sẽ khám phá cách đổi tên các artifacts của bạn, để truyền đạt ý nghĩa.

### Tại sao?
Các trường hợp sử dụng:
1. Khi ứng dụng của bạn có nhiều “flavours” khác nhau, bạn cần các output có thể nhận dạng được.
2. Khi bạn sản xuất nhiều phiên bản cùng một lúc, bạn cần cho biết đó là artifact nào.

Để kiểm tra tên artifact hiện tại của bạn, chỉ cần chạy tác vụ Gradle là `assembleDebug`. Nếu bạn chưa sửa đổi nó, output của bạn sẽ là `app-debug.apk`

Sẽ là tốt hơn nếu tên xác định nhiều thông tin và mang đầy đủ ý nghĩa hơn, chẳng hạn như mẫu sau:
```
${applicationId}-v${versionName}(${versionCode})-${buildType}.apk
```

Mẫu trên sẽ tạo ra được tên như là:
```
com.example.sampleproject-v1.0.0(101)-release.apk
```

Bằng cách sử dụng mẫu này, bạn biết APK này là gì.

### Lựa chọn 1
Bạn có thể tìm thấy cách đặt tên này trong nhiều câu trả lời trên StackOverflow.
```
applicationVariants.all { variant ->
    variant.outputs.all {
        outputFileName = "${applicationId}-v${versionName}(${versionCode})-${buildType}.apk"
    }
}
```

Phiên bản DSL:
```
applicationVariants.all {
        outputs.forEach { output ->
            if (output is com.android.build.gradle.internal.api.BaseVariantOutputImpl) {
                output.outputFileName =
                    "${applicationId}-v${versionName}(${this.versionCode})-${name}.${output.outputFile.extension}"
            }
        }
    }
```

Cách này hoạt động tốt cho APK nhưng không áp dụng được cho app bundles.

Output:
```
com.example.sampleproject-v1.0.0(101)_release.apk
```

### Lựa chọn 2
Việc thực hiện sau đây rất dễ dàng và đơn giản nhưng như thuộc tính của "archivesBaseName", nó sẽ chỉ thiết lập tên cơ sở chứ không phải tên tập tin đầy đủ.
```
android {
  ...
  defaultConfig {
    ...
    archivesBaseName = "${applicationId}-v${versionName}(${versionCode})"
  }
}
```

Phiên bản DSL:
```
android {
  ...
  defaultConfig {
    ...
    setProperty("archivesBaseName", "${applicationId}-v${versionName}(${versionCode})")
  }
}
```

Output:
```
com.example.sampleproject-v1.0.0(101)-release.apk
```

Phần “-release” được thêm vào theo kiểu build tự động.

### So sánh hiệu suất
Trong phần này, Tùy chọn 1 sẽ được so sánh với Tùy chọn 2.

Các số liệu sau đây được thực hiện trên một dự án 7 mô-đun bằng cách chạy các tác vụ sau:
* clean
* assembleDebug

| Runs | Lựa chọn 1 | Lựa chọn 2 |
| -------- | -------- | -------- |
| 1     | 15.643     | 16.519     |
| 2     | 16.539     | 14.515     |
| 3     | 14.39     | 16.592     |
| 4     | 16.536     | 14.506     |
| 5     | 16.9     | 15.391     |
| Trung bình     | 16.0016     | 15.5046     |

So sánh 2 lựa chọn
![](https://images.viblo.asia/368e74da-a1e6-4129-bc12-57323d6aff1f.png)

### Kết luận
Như bạn có thể thấy từ các biểu đồ và số liệu ở trên, hai tùy chọn có hiệu suất giống hệt nhau, sự chênh lệch là không rõ ràng.

Hãy nhớ rằng: Khi đặt tên cho artifacts của bạn, hãy chắc chắn rằng bạn đang đặt cho chúng những cái tên có ý nghĩa.

Ref: https://www.giorgosneokleous.com/2019/12/01/name-your-apk-aab-files/