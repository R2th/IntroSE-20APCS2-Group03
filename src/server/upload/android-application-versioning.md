## I. Introduction
Nếu bạn cần cải tiến mô hình đánh phiên bản cho ứng dụng Android của mình thì bạn đang đọc một câu chuyện đúng đắn. Hãy cùng khám phá một vài cách thức thực hiện tốt và những lợi thế của chúng.
## II. Semantic versioning
Có một thứ gì đó trong thế giới phần mềm được gọi là **Semantic Versioning**. Nó bao gồm một cặp quy ước nhằm gán các số phiên bản cho phần mềm của bạn. Bạn có thể(hoặc có thể nên) đọc toàn bộ chi tiết về nó ở [đây](http://semver.org/).
Về cơ bản ý tưởng là như bên dưới:
***Quy định việc tăng version number theo cấu trúc MAJOR.MINOR.PATCH như sau:***
### 1. MAJOR version
Được tăng khi bạn thực hiện việc thay đổi API không tương thích(Có thể tự định nghĩa rules như: khi tăng minSdkVersion, Mirgrate to AndroidX, update dependencies version(Third party library version),...).

### 2. MINOR version
Được tăng khi bạn thêm vào chức năng theo kiểu tương thích ngược(backwards-compatible manner) - Thêm chức năng mới trên những cấu hình tương thích trước đó(Không thay đổi minSdkVersion, update dependencies version,...).

### 3. PATCH version
Được tăng khi bạn thực hiện sửa lỗi trên những cấu hình tương thích trước đó.

Như vậy bạn có thể hiểu được, dựa vào định nghĩa trên, MAJOR version trên một ứng dụng Android không có ý nghĩa trừ khi bạn có bất cứ loại API nào được sử dụng bởi một khách hàng khác. Nếu trong trường hợp đó, thì bạn có thể sử dụng định nghĩa Semantic Versioning thuần túy. Nếu không, bạn cần định nghĩa khi nào bạn nên tăng MAJOR version.

Một tùy chọn có thể nhằm tăng MAJOR khi ứng dụng có một tính năng mới lớn, thay đổi thiết kế, hoặc đạt được mục tiêu. Một cách thức khác là tăng MAJOR sau khi MINOR version đã đạt tới con số 9. Ví dụ bạn đã có các version: 1.0.0, 1.1.0, ..., 1.9.0 và rồi 2.0.0. Nó chỉ là một quy định nhằm xác định khi nào tăng MAJOR.

Trong trường hợp của tôi, tôi sử dụng hai cách thức, nhưng bạn có thể sử dụng bất cứ , miễn sao nó là định nghĩa tốt và được hiểu bởi tất các các bên liên quan tới ứng dụng của bạn.

## III. Pre-releases
Một khái niệm khác được định nghĩa bởi Semantic Versioning là **[pre-release](http://semver.org/#spec-item-9)** version. Một pre-release version có thể được biểu thị bằng cách thêm vào một **version classifier**(phân loại phiên bản) cái bắt đầu với một dấu "-". Ví dụ "3.1.0-beta", "1.2.0-rc", "4.1.3-preview", "2.3.0-alpha", "1.3.2-SNAPSHOT".

Bạn có thể sử dụng version classifiers nhằm chỉ ra một cách nhanh chóng loại phiên bản của ứng dụng của bạn nhằm tránh hiểu lầm giữa một pre-release và một release version. Ví dụ, trong trường hợp của tôi, tôi sử dụng "-SNAPSHOT" trong giai đoạn phát triển và xóa bỏ classifier trường quá trình release APK.

Nếu bạn sử dụng Google Play Alpha/Beta Testing hãy lưu ý rằng đó không phải là một ý tưởng hay nhằm tải lên một APK với một version name được kết thúc bằng "alpha" hay "beta". Lý do là khi bạn đã quảng bá APK cho sản phẩm, bạn không thể thay đổi version name, như vậy người dùng của bạn sẽ tin rằng họ đã cài đặt một phiên bản không ổn định.

## IV. Version code & version name
Như bạn có thể đã biết, đối với Android bạn phải định nghĩa hai trường version cho một ứng dụng: **version code**(android:versionCode) và **version name**(android:versionName). Version code là một giá trị số nguyên có thể tăng cái thể hiện phiên bản mã nguồn của ứng dụng. Version  name là một giá trị String cái thể hiện tên phiên bản một cách thân thiện hơn, cái được hiển thị với người dùng. Bạn có thể nhận được thêm thông tin chi tiết từ [đây](developer.android.com/tools/publishing/versioning.html#appversioning).

Nó là một chiến lược tốt để có được sự liên kết trực tiếp giữa các loại versions nhằm tránh khỏi những sự nhầm lẫn trong quá trình phát trieenhr và thực hiện các release. Ít nhất bạn có thể suy luận được version name từ một version code.

Như mô tả chi tiết ở đây, tại liệu đề xuất chính thức sử dụng một **version code schema** cái liên kết version code với version name, và cũng như hỗ trợ việc upload nhiều APKs lên Google Play. Đưa vào tài khoản một giá trị tuyệt vời, Google Play cho phép version code là 2,100,000,000.

Chúng tôi đề xuất sử dụng một kĩ thuật nhằm thích ứng với mô hình đó cũng như hỗ trợ Semantic Versioning(Đảm bảo rằng bạn sẽ cần tới 2 kí tự cho MAJOR, 2 kí tự cho MINOR, và hai cái khác cho PATCH version).

Theo đề xuất sử dụng version code với 9 kí tự: integers cái thể hiện cho các cấu hình được hỗ trợ nằm trong các bits có thứ tự cao hơn, và version name trong các bit có thứ tự thấp hơn.
Hai kí tự đầu tiên thển hiện API level thấp nhất cho APK của bạn, các kí tự tiếp theo là cho các screen sizes hoặc GL texture formats(gán zero nếu bạn không sử dụng các kí tự này).
Rồi đến hai kí tự cho major version, hai kí tự cho minor, và cuối cùng là hai kí tự cho patch version.

Ví dụ, khi ứng dụng có version name là 3.1.0, version code cho API level thấy nhất là 4 sẽ là **040030100**. Hai kí tự đầu tiên đại diện cho API level thấp nhất(trong trường hợp này là 4), ba kí tự tiếp theo cho kích thước màn hình hoặc GL texture formats(không được sử dụng trong ví dụ này, do đó một giá trị zero được gán), và 6 kí tự cuối cùng đại diện cho version name của ứng dụng(3.1.0).

<div align="center"><br /><img src="https://images.viblo.asia/fa215f68-2a21-4597-8f86-2e93c68da5c3.png" /></div><br />
Như bạn thấy, bạn có thể bắt đầu từ 0.0.1 tới 99.99.99. Do đó, bạn có chỗ cho 192 năm đánh versions, phát hành hằng tuần và không tính đến các bản hot fixes.

## V. Automate the versioning shceme with Gradle
Nếu bạn sử dụng Gradle nhằm build ứng dụng của mình bạn có thể tự động đánh version theo sơ đồ bằng cách thêm vào mã nguồn bên dưới cho build.gradle.

```
apply plugin: 'com.android.application'

ext.versionMajor = 1
ext.versionMinor = 2
ext.versionPatch = 3
ext.versionClassifier = null
ext.isSnapshot = true
ext.minimumSdkVersion = 19

android {
	compileSdkVersion 27
	buildToolsVersion "27.0.0"

	defaultConfig {
		applicationId "com.sample"
		targetSdkVersion 27
		minSdkVersion project.ext.minimumSdkVersion
		versionCode generateVersionCode() // 190010203
		versionName generateVersionName() // 1.2.3-SNAPSHOT
	}
}

private Integer generateVersionCode() {
	return ext.minimumSdkVersion * 10000000 + ext.versionMajor * 10000 + ext.versionMinor * 100 + ext.versionPatch
}

private String generateVersionName() {
	String versionName = "${ext.versionMajor}.${ext.versionMinor}.${ext.versionPatch}"
	if (ext.versionClassifier == null && ext.isSnapshot) {
		ext.versionClassifier = "SNAPSHOT"
	}

	if (ext.versionClassifier != null) {
		versionName += "-" + ext.versionClassifier
	}
	return versionName;
}
```

Bạn chỉ phải cấu hình **versionMajor**, **versionMinor**, **versionPatch**, **versionClassifier**, **isSnapshot**, và **minimumSdkVersion** nhằm tự động sinh ra  các giá trị version code và version name.

## VI. Conclusion
Tóm lại, ở đây có 4 đề xuất chính:
1. Sử dụng semantic versioning hoặc một sự thích nghi với nó, tùy theo những gì bạn muốn.
2. Sử dụng một versioning sheme cái liên kết version code và version name. Bạn nên có khả năng liên kết version name từ một version code.
3. Sử dụng một versioning schêm cái hỗ trợ multiple APKs upload lên Google Play. Có thể hiện tại bạn không cần multiple APKs, nhưng có thể bạn sẽ cần tới nó trong tương lai.
4. Sử dụng Gradle nhằm tự động sinh ra version code và version name cho ứng dụng của bạn.

Thử làm theeo các đề xuất ngay cho ứng dụng của bạn nhằm tránh khỏi những đau đầu có thể xảy ra trong tương lai.

## VII. Reference
1. **[Semantic Versioning](http://semver.org/)**.
2. **[Android App Versioning](developer.android.com/tools/publishing/versioning.html#appversioning)**
3. **[Multiple APK Support]( http://developer.android.com/google/play/publishing/multiple-apks.html#VersionCodes)**

## VIII. Source
**[Versioning Android apps](https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82)**

## IX. P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))