# 1. Cấu trúc danh bạ
Như các bạn biết, Contact trong Android được lưu tỏng database và cung cấp thao tác vơi lập trình viên thông qua Content Provider.
Nhưng trước hết đi sâu và cách thao tác thì mình sẽ giới thiệu qua với các bạn về cấu trúc dữ liệu của Contact.


`Tất cả thông tin của 1 Contact được chia làm 13 nhóm`

1. Email ( address, email type(home, work, mobile, other)).
2. Instant message ( protocol(qq, icq, skype etc), im id).
3. Nickname.
4 Organization ( company, department, title, job description,  office location).
5. Phone ( number, phone type(home, mobile, work, other)).
6. Address ( address, address type ( home, work , other)).
7. Name (display name, given name, family name).
9. Postal Address (country, city, region, street, postcode).
9. Identity (namespace(SSN, passport), number).
10. Photo.
11. Group (contact belongs group id).
12. Website (website url, website type()).
13. Note.


Trong đấy các bạn nhìn có 1 số group, dữ liệu được chia thành các type khác nhau.

Tất cả Contact trong Android được lưu trữ trong SQLite databse. File database được lưu trữ tại `/data /data /com.android.providers.contacts /databases /contacts2.db`
Các bạn có thể copy ra máy tính và sử dụng SQLite3 để đọc dữ liệu trong đó. Và trong database đó chúng ta có 5 bảng đáng quan tâm nhất.

![](https://images.viblo.asia/fb94e16c-5a32-45a2-94b6-2744b8a3a9d1.png)

1. **contact** -> Lưu trữ thông tin Contact
2. **data** -> Lưu trữ từng trường liên hệ. Mỗi 1 hàng sẽ có 1 `mimetype_id` để định danh dữ liệu của hàng đó. vd: mobile phone, home phone, home email, work email, company, department, title vvv. Trong bảng này ngoài các trường định nghĩa liên kết thì có 15 cột để lưu các dữ liệu khác nhau từ `data1 -> data15`
3. **group** -> Lưu trữ thông tin Group
4. **mimetypes** -> Lưu trữ thông tin về mime type
5. **raw_contact** -> Có _id trùng với bảng `contact`, sự khác biệt ở đây là bảng này chứa nhiều thông tin hơn bảng `contact`

Trong này thì các bạn nên xem kỹ data của bảng **mimetypes** vì bảng đó chưa các kiểu dữ liệu được Google định nghĩa trước. Tất cả các **mimetype _id** này đều được liên kết với bảng **data** để định nghĩa xem hàng đó chưa kiểu dữ liệu gì của `Contact`.
1. **vnd.android.cursor.item/email_v2**:  Định nghĩa trường thông tin tin Email của Conact.
2. **vnd.android.cursor.item/im**: Định nghĩa trường lưu thông tin về `messaging`.
3. **vnd.android.cursor.item/nickname**: Định nghĩa trường lưu thông tin về tên người dùng. (nickname)
4. **vnd.android.cursor.item/organization**: Định nghĩa trường lưu thông tin về công ty.
5. **vnd.android.cursor.item/phone_v2**: Định nghĩa thông tin về số điện thoại.
6. **vnd.android.cursor.item/sip_address**: Định nghĩa thông tin về địa chỉ.
7. **vnd.android.cursor.item/name**: Định nghĩa thông tin về tên người dùng.
8. **vnd.android.cursor.item/postal-address_v2**: Định nghĩa thông tin về địa chỉ bưu chính.
9. **vnd.android.cursor.item/identity**: Định nghĩa thông tin về dánh tính của người dùng (Số CMTND, số hộ chiếu vvv).
10. **vnd.android.cursor.item/photo**: Định nghĩa thông tin về ảnh đại diện.
11. **vnd.android.cursor.item/group_membership**: Định nghĩa thông tin về group.
12. **vnd.android.cursor.item/website**: Định nghĩa thông tin về Website.
13. **vnd.android.cursor.item/note**: Định nghĩa thông tin về ghi chú.

# 2. Lưu liện hệ với vào danh bạ.
Để thao tác với `Contact` bắt buộc bạn phải sử dụng thông qua `ContentProvider` vì Android không có public các data base đấy để lập trình viên có thể thao tác trực tiếp được.

Android cũng cung cấp khá nhiều các phương thức để lập tình viên có thể thao tác với các `Data base` hệ thống.

![](https://images.viblo.asia/4c243ec2-1465-4b9c-a34f-feb067f4a66d.png)

Với chức năng thêm mới liên hệ vào danh bạ này thì mình sẽ giới thiệu với các bạm hàm `applyBatch()`

## 2.1 Tạo ID cho liên hệ
```Java
ArrayList < ContentProviderOperation > ops = new ArrayList < ContentProviderOperation > ();

 ops.add(ContentProviderOperation.newInsert(
 ContactsContract.RawContacts.CONTENT_URI)
     .withValue(ContactsContract.RawContacts.ACCOUNT_TYPE, null)
     .withValue(ContactsContract.RawContacts.ACCOUNT_NAME, null)
     .build());
```

Đầu tiên là bạn tạo 1 bản ghi trong bảng `raw_contacts`, và Android cũng định nghĩa sẵn hộ bạn `Uri` để truy cập là `ContactsContract.RawContacts.CONTENT_URI`.

## 2.2 Thêm tên liên hệ
```Java
 //------------------------------------------------------ Names
 ops.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
         .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
         .withValue(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE)
         .withValue(ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME, "Nguyen Huy Quyet")
         .build());
```

Tiếp theo là mình sẽ tiếp tục ghi các dữ liệu khác như tên, email, số điện thoại vào bảng `data` thông qua `Uri` là  `ContactsContract.Data.CONTENT_URI`

Các bạn chú ý dòng
```Java
 .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
```

Định nghĩa như này thì sau khi thực hiện câu lệnh insert bản ghi đầu tiên vào bảng `raw_contacts` và trả về `_id` trong bảng `raw_contacts`  và `_id` đó sẽ được tiếp tục mang xuống câu lệnh dưới để tạo liên kết từ bảng `raw_contacts -> _id` và bảng `data -> raw_contact_id`.

```Java
 .withValue(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE)
 // public static final String CONTENT_ITEM_TYPE = "vnd.android.cursor.item/name";
```
Dòng lệnh này là định nghĩa `mimetype` cho dòng dữ liệu đó. Ở đây mình định nghĩa dòng này sẽ lưu thông tin của trường tên người dùng. "Nếu bạn chưa hiểu rõ cấu trúc thì có thể quay trở lên mục 1 để tìm hiểu kỹ hơn".

Bạn lưu ý khi thêm 1 dòng dữ liệu vào trong bảng `data` thì cột `mimetype` này là bắt buộc. Vì cột `mimetype` này định nghĩa xem dữ liệu ở hàng đó là thuộc loại dữ liệu nào.

```Java
 .withValue(ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME, "Nguyen Huy Quyet")
```

Dòng lệnh này để thêm dữ liệu vào trường. Ở đây bạn có thể thêm rất nhiều tên vào trong bảng `data` các bạn có thể tìm hiểu thêm [tại đây](https://developer.android.com/reference/android/provider/ContactsContract.CommonDataKinds.StructuredName).

Lưu ý là khi thêm các tên khác của liên hệ thì các bạn chỉ cần thêm các `.withValue(String key, Object value)` là được vì tất cả các trường tên này chỉ được thêm vào 1 hàng trong bảng `data`.
```Java
 //------------------------------------------------------ Names
         .withValue(ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME, "Nguyen Huy Quyet")
         .withValue(ContactsContract.CommonDataKinds.StructuredName.GIVEN_NAME, "Nguyen Huy Quyet")
         .withValue(ContactsContract.CommonDataKinds.StructuredName.FAMILY_NAME, "Nguyen Huy Quyet")
         .build());
```

## 2.3 Thêm số điện thoại liên hệ

```Java
//------------------------------------------------------ Mobile Number                     
     ops.add(ContentProviderOperation.
     newInsert(ContactsContract.Data.CONTENT_URI)
         .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
         .withValue(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
         .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, "12345678")
         .withValue(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE)
         .build());

     ops.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
         .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
         .withValue(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
         .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, "123456")
         .withValue(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_CUSTOM)
         .withValue(ContactsContract.CommonDataKinds.Phone.LABEL, "Home Number")
         .build());
```

Ở đoạn code này thì 3 dòng code này mình sẽ không giải thích lại nữa.
```Java
 newInsert(ContactsContract.Data.CONTENT_URI)
         .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
         .withValue(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
```

Khác với thêm tên thì thêm số điện thoại vào `Contact` thì mỗi 1 số điện thoại sẽ được thêm vào 1 dòng trong bảng `data` nên mỗi 1 số điện thoại bạn phải viết 1 câu lệnh riêng biệt.

```Java
 .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, "123456")
```
thêm số điện thoại vào 1 dòng trong bảng `data`
```Java
.withValue(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE)
```
Định nghĩa kiểu cho số điện thoại đó. Ở đây mình định nghĩa số `"12345678"` sẽ là `mobile number` và khi hiển thị lên ứng dụng danh bạ điện thoại thì sẽ số điện thoại này sẽ có nhãn là `Số di động` và sẽ hiển thị theo ngôn ngữ máy mà bạn cài đặt. 

Ở dòng  thêm số `"123456"` mình có viết khác 1 chút.
```Java
 .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, "123456")
 .withValue(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_CUSTOM)
 .withValue(ContactsContract.CommonDataKinds.Phone.LABEL, "Home Number")
```

Mình có định nghĩa kiểu số điện thoại là 1 kiểu `TYPE_CUSTOM` nên khi hiển thị lên dạnh bạ của điện thoại nó sẽ không được đính kèm 1 nhãn mặc định nào của hệ thống cả, nên mình cần phải thêm 1 trường `ContactsContract.CommonDataKinds.Phone.LABEL` để định nghĩa nhãn cho nó khi hiển thị trên ứng dụng danh bạ. Lưu ý nhãn này là cố định và không thay đổi khi bạn thay đổi ngôn ngữ hiển thị của máy.


Lưu ý khi bạn định nghĩa các `ContactsContract.CommonDataKinds.Phone.TYPE` khác với `ContactsContract.CommonDataKinds.Phone.TYPE_CUSTOM` thì khi bạn thêm thuộc tính `LABEL` thì ứng dụng danh bạ vẫn sẽ hiển thị nhãn mặc định đã được định nghĩa theo `TYPE` mà bạn đã định nghĩa.


Android cũng cung cấp sẵn cho lập trình viên khá nhiều `TYPE` mặc định, các bạn có thể tham khảo thêm [ở đây](https://developer.android.com/reference/android/provider/ContactsContract.CommonDataKinds.Phone).

## 2.4 Thêm Email liên hệ
```Java
 //------------------------------------------------------ Email
     ops.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
         .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
         .withValue(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE)
         .withValue(ContactsContract.CommonDataKinds.Email.DATA, "email@gmail.com")
         .withValue(ContactsContract.CommonDataKinds.Email.TYPE, ContactsContract.CommonDataKinds.Email.TYPE_WORK)
         .build());
```

Thêm `Email` cũng tương tự như thêm số điện thoại, mỗi 1 email bạn cũng cần viết từng câu lệnh riêng biệt và bạn cũng có thể thêm `LABEL` riêng cho từng email.


## 2.5 Thêm công ty liên hệ
```Java
 //------------------------------------------------------ Organization
     ops.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
         .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
         .withValue(ContactsContract.Data.MIMETYPE, ContactsContract.CommonDataKinds.Organization.CONTENT_ITEM_TYPE)
         .withValue(ContactsContract.CommonDataKinds.Organization.COMPANY, "FramgiaInc")
         .withValue(ContactsContract.CommonDataKinds.Organization.TYPE, ContactsContract.CommonDataKinds.Organization.TYPE_WORK)
         .withValue(ContactsContract.CommonDataKinds.Organization.TITLE, "Dev")
         .build());
```

ở đây bạn có thể thêm nhiều công ty cho 1 liên hệ nhưng mà nhớ là mỗi công ty phải viết 1 câu lệnh riêng biệt nhé.

## 2.6 Thực hiện thêm liên hệ
Tất cả các thao tác thêm dữ liệu vào biến
```Java
ArrayList < ContentProviderOperation > ops = new ArrayList < ContentProviderOperation > ();
```
ở trên thực chất chúng ta mới định nghĩa các kiểu dữ liệu sẽ thêm vào `Database`. Sau khi định nghĩa đầy đủ chúng ta sẽ thực hiện gọi `ContentProvider` để thêm các dữ liệu đó và `Database`

```Java
 // Asking the Contact provider to create a new contact                 
 try {
     getContentResolver().applyBatch(ContactsContract.AUTHORITY, ops);
 } catch (Exception e) {
     e.printStackTrace();
     Toast.makeText(context, "Exception: " + e.getMessage(), Toast.LENGTH_SHORT).show();
 }
```

Ngoài ra các bạn có thể thêm nhiều trường khác được định nghĩa trong bảng `mimetypes`  mình đã giới thiệu ở mục 1.

Trên đây mình vừa giới thiệu với các bạn cách để để thêm 1 liện hệ và trong dạnh bạ của điện thoại. Ở phần sau mình sẽ giới thiệu với các bạn về cách cập nhật, xóa liên hệ trong danh bạ