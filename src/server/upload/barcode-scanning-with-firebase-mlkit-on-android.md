Firebase MLKit đã được ra mắt tại sự kiện Google I/O, đây là một phần của bộ Firebase dự định cung cấp cho ứng dụng khả năng hỗ trợ các tính năng thông minh dễ dàng hơn.
Đi kèm với đó là tính năng quét mã vạch, cho chúng ta khả năng quét mã vạch và mã QR để lấy dữ liệu từ thế giới thực và thao tác bên trong các ứng dụng. 
Trong bài viết này, chúng ta hãy cùng nhau đi sâu vào cách triển khai tính năng này vào các ứng dụng của mình. 
### 1. Các loại mã vạch được hỗ trợ 
Phần quét mã vạch của ML Kit hỗ trợ các định dạng sau của các định dạng mã vạch:
![](https://images.viblo.asia/99f6ee11-5279-4798-80ea-ead88f33a42d.png)
Nếu bạn cần hỗ trợ một số (hoặc tất cả) trong số này, thì phần quét mã vạch của ML Kit sẽ xử lý tất cả những điều này cho bạn.
### 2. Quét mã vạch với MLKit 
Trước khi có thể bắt đầu sử dụng tính năng quét mã vạch của MLKit, chúng ta cần bắt đầu bằng cách thêm phụ thuộc vào file build.gradle trong project:
```
implementation 'com.google.firebase:firebase-ml-vision:16.0.0'
```
Bây giờ, nếu bạn muốn phần quét mã vạch của MLKit được tải xuống tại thời điểm cài đặt ứng dụng, thì bạn có thể thêm đoạn mã sau vào application tags của file manifest. 
Mặt khác, phần quét mã vạch của thư viện MLKit sẽ được tải xuống tại điểm bắt buộc trong ứng dụng của bạn.
```
<meta-data
      android:name="com.google.firebase.ml.vision.DEPENDENCIES"
      android:value="barcode" />
```
 Sau khi đã thực hiện những điều trên thì chúng ta đã sẵn sàng để thêm quét mã vạch vào ứng dụng. Chúng ta có thể truy xuất một instance(thể hiện) của lớp VisionBarcodeDetector xử lý quá trình nhận dạng:
```
val detector = FirebaseVision.getInstance().visionBarcodeDetector
```
Tiếp theo, chúng ta có thể tùy chọn cấu hình các định dạng mã vạch muốn được hỗ trợ trong quá trình nhận dạng, điều này được thực hiện thông qua các phương tiện của instance FirebaseVisionBarcodeDetectorOptions
Chúng ta có thể tạo một instance mới của điều này bằng cách sử dụng lớp builder: 
```
val options = FirebaseVisionBarcodeDetectorOptions.Builder()
        .setBarcodeFormats(
                FirebaseVisionBarcode.FORMAT_QR_CODE,
                FirebaseVisionBarcode.FORMAT_AZTEC)
        .build()
```
Bây giờ sau khi đã xác định các tùy chọn, chúng ta có thể sử dụng function get của đối tượng FirebaseVision trong trường hợp của chúng ta:
```
val detector = FirebaseVision.getInstance().getVisionBarcodeDetector(options)
```
Tiếp theo chúng ta sẽ tiếp tục sử dụng các tùy chọn đã được xây dựng để tạo một instance của FirebaseVisionImage - đây là lớp chứa dữ liệu hình ảnh của chúng ta, sẵn sàng cho quá trình nhận dạng mã vạch.
Bây giờ, chúng ta cần một instance trước khi chúng ta có thể thực hiện bất kì hình thức nhận diện nào và để thực hiện điều này thì chúng ta cần sử dụng dữ liệu hình ảnh của mình - điều này có thể được thực hiện theo một trong năm cách:
![](https://images.viblo.asia/64312aa3-bd89-4b21-90ce-0529028102cd.png)

**Bitmap**

Để bắt đầu, chúng ta có thể tạo instance của FirebaseVisionImage bằng cách sử dụng 1 instance của Bitmap. 
Chúng ta có thể làm như vậy bằng cách chuyển một **upright** bitmap vào function fromBitmap() - điều này sẽ cung cấp cho chúng ta một FirebaseVisionImage 
```
val image = FirebaseVisionImage.fromBitmap(bitmap);
```
**media.Image**

Chúng ta cũng có thể làm như vậy bằng cách sử dụng một instance media.Image - điều này có thể thực hiện khi chụp ảnh từ camera của thiết bị. 
Khi làm như vậy, chúng ta phải phải xử lí được instance này cũng như rotation của nó, vì vậy điều này phải được tính toán trước khi gọi hàm fromMediaImage()
```
val image = FirebaseVisionImage.fromMediaImage(mediaImage,    
                rotation);
```
**ByteBuffer**

Một instance của FirebaseVisionImage cũng có thể được tạo bằng ByteBuffer, để làm như vậy trước tiên chúng ta phải tạo một phiên bản của FirebaseVisionImageMetadata. Điều này chứa dữ liệu cần thiết để xây dựng hình ảnh tầm nhìn, chẳng hạn như xoay và đo.
```
FirebaseVisionImageMetadata metadata = new 
    FirebaseVisionImageMetadata.Builder()
        .setWidth(1280)
        .setHeight(720)
        .setFormat(FirebaseVisionImageMetadata.IMAGE_FORMAT_NV21)
        .setRotation(rotation)
        .build();
```
Sau đó chúng ta có thể tạo instance với ByteBuffer:
```
val image = FirebaseVisionImage.fromByteBuffer(buffer, metadata);
```
**ByteArray**

Tạo một hình ảnh từ ByteArray hoạt động theo cách tương tự như ByteBuffer ngoại trừ chúng ta phải sử dụng hàm fromByteArray():
```
val image = FirebaseVisionImage.fromByteArray(byteArray, metadata);
```
**File**

Một instance vision image có thể được tạo từ một file bằng cách gọi function fromFilePath() với context và URI mong muốn
```
val image: FirebaseVisionImage?
try {
    image = FirebaseVisionImage.fromFilePath(context, uri);
} catch (IOException e) {
    e.printStackTrace();
}
```

Cách tiếp cận mà bạn sử dụng để truy xuất đối tượng FirebaseVisionImage sẽ phụ thuộc vào ứng dụng của bạn và cách bạn làm việc với hình ảnh. 
Tuy nhiên, làm như vậy tại thời điểm này, bạn sẽ có quyền truy cập vào một instance của lớp FirebaseVisionImage.
Vào lúc này VisionBarcodeDetector của chúng ta cũng được cấu hình và sẵn sàng hoạt động, vì vậy bây giờ chúng ta có thể đi trước và sử dụng instance FirebaseBarcodeDetector này để phát hiện mã vạch trong hình ảnh của chúng ta, điều này có thể thực hiện bằng cách gọi function DetInImage() và truyền vào instance FirebaseVisionImage:
```
detector.detectInImage(image)
    .addOnSuccessListener {
     // Task succeeded!
        for (barcode in it) {
            // Do something with barcode
        }
    }
    .addOnFailureListener {
    // Task failed with an exception
    }
```
Bây giờ, nếu call succed thì chúng ta sẽ được cung cấp một danh sách các instance FirebaseVisionBarcode. Nếu không có mã vạch nào được phát hiện thì điều này sẽ trống, vì vậy bạn cần xử lí việc này nếu tình huống này xảy ra.
Nếu không thì chúng ta có quyền truy cập vào một bộ mã vạch mà chúng ta cần phải làm gì đó với nó.
Đối với mỗi instance FirebaseVisionBarcode, chúng ta có quyền truy cập vào tập hợp các thuộc tính mà chúng ta có thể sử dụng ở đây:
* getBoundingBox(): Trả về một thể hiện Rect chứa giới hạn box cho mã vạch được nhận dạng. 
* getCornerPoints(): Trả về tọa độ cho mỗi góc của mã vạch.
* getRawValue(): Trả về giá trị mã vạch ở định dạng thô
* getDisplayValue(): Trả về giá trị mã vạch ở định dạng có thể đọc được
* getValueType(): Trả về loại định dạng của mã vạch
Phần quan trọng nhất của các thuộc tính trên mà chúng ta nhận được là loại giá trị của mã vạch, điều này cung cấp định dạng của mã vạch và sau đó mô tả loại dữ liệu mà chúng ta có thể lấy lại từ instance của FirebaseVisionBarcode.
Có 9 loại dữ liệu khác nhau(**TYPE_**) mà mã vạch có thể được biểu thị và mỗi loại sẽ có một đối tượng dữ liệu được đính kèm với nó chứa thông tin về dữ liệu từ mã vạch:
![](https://images.viblo.asia/22c55ad7-b29e-43a8-a7a8-6010ac7d8000.png)

Chúng ta hãy cùng xem những gì trong số trên sẽ có sẵn khi đọc từ mã vạch và cách chúng ta có thể truy cập chúng từ instance barcode của chúng ta:
**FirebaseVisionBarcode.CalendarEvent (TYPE_CALENDAR_EVENT)**
* getDescription(): Trả về một mô tả của sự kiện
* getStart(): Trả về một instance của FirebaseVisionBarcode.CalendarDateTime cho sự khởi đầu của sự kiện
* getEnd(): Trả về một instance của FirebaseVisionBarcode.CalendarDateTime cho sự kết thúc của sự kiện
* getLocation(): Trả về vị trí của sự kiện
* getOrganizer(): Trả về organiser(người tổ chức) của sự kiện
* getStatus(): Trả về trạng thái của sự kiện
* getSummary(): Trả về một bản tóm tắt cho sự kiện 
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_CALENDAR_EVENT -> {
        val description = barcode.calendarEvent?.description
        val start = barcode.calendarEvent?.start
        val end = barcode.calendarEvent?.end
        val organizer = barcode.calendarEvent?.organizer
        val summary = barcode.calendarEvent?.summary
        val status = barcode.calendarEvent?.status
        val location = barcode.calendarEvent?.location
    }
}
```
**FirebaseVisionBarcode.ContactInfo (TYPE_CONTACT_INFO)**
* getAddresses(): Trả về danh sách instance FirebaseVisionBarcode.Address instances cho contact
* getEmails(): Trả về danh sách instance của FirebaseVisionBarcode.Email cho contact
* getName(): Trả về một instance of FirebaseVisionBarcode.PersonName cho contact
* getOrganization(): Trả về contacts organization
* getPhones(): Trả về danh sách của FirebaseVisionBarcode.Phone cho contact
* getTitle(): Trả về tiêu đề contacts
* getUrls(): Trả về một mảng các Url cho contact
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_CONTACT_INFO -> {
        val addresses = barcode.contactInfo?.addresses
        val emails = barcode.contactInfo?.emails
        val phones = barcode.contactInfo?.phones
        val names = barcode.contactInfo?.name
        val organization = barcode.contactInfo?.organization
        val title = barcode.contactInfo?.title
        val urls = barcode.contactInfo?.urls
    }
}
```
**FirebaseVisionBarcode.DriverLicense (TYPE_DRIVER_LICENSE)**
* getAddressCity(): Trả về thành phố cho địa chỉ giấy phép 
* getAddressState(): Trả về trạng thái cho địa chỉ giấy phép 
* getAddressStreet(): Trả lại đường cho địa chỉ giấy phép 
* getAddressZip(): Trả về mã zip cho địa chỉ giấy phép 
* getBirthDate(): Trả về ngày sinh cho người giữ giấy phép 
* getDocumentType(): Trả về loại tài liệu (Driver License hoặc ID card)
* getExpiryDate(): Trả về ngày hết hạn cho giấy phép 
* getFirstName(): Trả về tên đầu tiên của chủ sở hữu giấy phép 
* getMiddleName(): Trả về tên đệm của chủ giấy phép 
* getLastName(): Trả về tên cuối cùng của chủ giấy phép 
* getGender(): Trả về giới tính của chủ giấy phép 
* getIssueDate(): Trả về ngày cấp giấy phép 
* getIssuingCountry(): Trả về nước cấp giấy phép 
* getLicenseNumber(): Trả về số giấy phép
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_DRIVER_LICENSE -> {
        val city = barcode.driverLicense?.addressCity
        val state = barcode.driverLicense?.addressState
        val street = barcode.driverLicense?.addressStreet
        val zip = barcode.driverLicense?.addressZip
        val birthDate = barcode.driverLicense?.birthDate
        val document = barcode.driverLicense?.documentType
        val expiry = barcode.driverLicense?.expiryDate
        val firstName = barcode.driverLicense?.firstName
        val middleName = barcode.driverLicense?.middleName
        val lastName = barcode.driverLicense?.lastName
        val gender = barcode.driverLicense?.gender
        val issueDate = barcode.driverLicense?.issueDate
        val issueCountry = barcode.driverLicense?.issuingCountry
        val licenseNumber = barcode.driverLicense?.licenseNumber
    }
}
```
**FirebaseVisionBarcode.Email (TYPE_EMAIL)**
* getAddress(): Trả về địa chỉ email được sử dụng cho email 
* getBody(): Trả về phần thân của email 
* getSubject(): Trả về chủ đề của email 
* getType(): Trả về loại email (HOME, WORK, UNKNOWN)
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_EMAIL -> {
        val type = barcode.email?.type
        val address = barcode.email?.address
        val body = barcode.email?.body
        val subject = barcode.email?.subject
    }
}
```
**FirebaseVisionBarcode.GeoPoint (TYPE_GEO)**
* getLat(): Trả về vĩ độ cho điểm địa lý tương ứng 
* getLng(): Trả về kinh độ cho điểm địa lý tương ứng
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_GEO -> {
        val lat = barcode.geoPoint?.lat
        val lng = barcode.geoPoint?.lng
    }
}
```
**FirebaseVisionBarcode.Phone (TYPE_PHONE)**
* getNumber(): Trả về số cho instance Phone tương ứng
* getType(): Trả về loại phone (FAX, HOME, MOBILE, WORK, UNKNOWN)
**FirebaseVisionBarcode.Sms (TYPE_SMS)**
* getMessage(): Trả về tin nhắn cho SMS đã cho 
* getPhoneNumber(): Trả về số điện thoại được liên kết với SMS đã cho
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_SMS -> {
        val message = barcode.sms?.message
        val number = barcode.sms?.phoneNumber
    }
}
```
**FirebaseVisionBarcode.UrlBookmark (TYPE_URL)**
* getTitle(): Trả về tiêu đề cho dấu trang đã cho 
* getUrl(): Trả về URL cho dấu trang đã cho
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_URL -> {
        val title = barcode.url?.title
        val url = barcode.url?.url
    }
}
```
**FirebaseVisionBarcode.Wifi (TYPE_WIFI)**
* getEncryptionType(): Trả về loại mã hóa (OPEN, WEP hoặc WPA) cho mạng đã cho
* getPassword(): Trả về mật khẩu cho mạng WIFI đã cho
* getSsid(): Trả về SSID cho mạng WIFI đã cho
```
when (valueType) {
    FirebaseVisionBarcode.TYPE_WIFI -> {
        val ssid = barcode.wifi?.ssid
        val password = barcode.wifi?.password
        val type = barcode.wifi?.encryptionType
    }
}
```

Chúng ta cũng có quyền truy cập vào những thứ như giới hạn và góc mã vạch. 
Trong hình ảnh bên dưới tại đây, chúng ta đã lấy thuộc tính boundingBox của instance FirebaseVisionBarcode được trả về bởi yêu cầu quét.
Sau đó, sử dụng các thuộc tính của boundingBox mà ta đã có thể vẽ các giới hạn này lên hình ảnh của mã vạch mà ban đầu chúng ta đã chuyển vào máy quét.
Bạn có thể sử dụng các thuộc tính này để thực hiện một điều tương tự trong các ứng dụng của mình - làm như vậy cho phép người dùng của bạn biết rằng mã vạch mà họ đang cố gắng quét đã được nhận ra thành công bởi thao tác quét hiện đang diễn ra trong ứng dụng của bạn.
Tuy nhiên, đôi khi, bạn có thể không muốn hiển thị toàn bộ giới hạn xung quanh toàn bộ mã vạch, trong trường hợp đó FirebaseVisionBarcode cũng trả lại cho chúng ta một thuộc tính anglePoints. Trong trường hợp này, bạn chỉ cần sử dụng các điểm góc này để vẽ các điểm lên khung vẽ.
![](https://images.viblo.asia/6bbaa8cb-1a8c-4323-847f-2fdb0d5ab34b.png)
### 3. Conclusion 
Qua bài viết này, bạn đã có thể thấy Firebase MLKit thực hiện quá trình quét mã vạch này đơn giản hơn cho các ứng dụng và hy vọng bạn sẽ có thể áp dụng vào dự án của mình. 

Bài viết có sử dụng nguồn tham khảo: https://medium.com/google-developer-experts/exploring-firebase-mlkit-on-android-barcode-scanning-part-three-cc6f5921a108

Cảm ơn các bạn đã đọc, xin chào và hẹn gặp lại.