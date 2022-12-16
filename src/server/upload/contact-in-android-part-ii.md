Ở [phần đầu](https://viblo.asia/p/contact-in-android-OeVKBxjQlkW) mình đã giới thiệu với các bạn tổng quan về cấu trúc dữ liệu và cách thực hiện thêm 1 **Contact** mới vào danhb bạ.

Phần tiếp theo này mình sẽ hướng dẫn các bạn thao tác **Update** và **Delete** 1 con **Contact** trong danh bạ.

# 3. Update Contact
Ở phần trước khi các bạn [thêm 1 **Contact** mới vào bảng](https://viblo.asia/p/contact-in-android-OeVKBxjQlkW#_21-tao-id-cho-lien-he-2) `ContactsContract.RawContacts.CONTENT_URI` thì câu lệnh sẽ trả về cho bạn 1 `RawContactId`, các bạn sử dụng dữ liệu `RawContactId` này để [thêm các dữ liệu khác của **Contact**](https://viblo.asia/p/contact-in-android-OeVKBxjQlkW#_22-them-ten-lien-he-3) vào bảng `ContactsContract.Data.CONTENT_URI`. Vậy nên khi cần cập nhật 1 dữ liệu nào đó của **Contact** thì các bạn chỉ cần cập nhật lại dữ liệu trong bảng `ContactsContract.Data.CONTENT_URI`  là thông tin của **Contact** đó sẽ thay đổi theo.

VD bây giờ mình muốn thay đổi số điện thoại của **Contact** có tên là "Nguyen Huy Quyet" thì các thao tác thực hiện sẽ như sau.

## 3.1 Get RawContactId
Lấy về ID của **Contact** cần cập nhật dữ liệu.

```Java
String selection = ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME + " = 'Nguyen Huy Quyet'";

Cursor cursor = context.getContentResolver().query(ContactsContract.Data.CONTENT_URI,
                new String[]{ContactsContract.Data.RAW_CONTACT_ID},
                selection, null, null, null);

// Kiểm tra cursor != null và cursor.getCount() == 0 hay không

cursor.moveToFirst();
long rawContactId = cursor.getLong(0);

// Đóng kết nối khi đã thực hiện xong truy vấn
cursor.close();
```

Ở đây các bạn lưu ý là `cursor` có thể trả về nhiều bản ghi, nhưng mà mình viết Sample nên mình chỉ lấy bản ghi đầu tiên thôi.  Và do trong câu lệnh truy vấn mình chỉ lấy về 1 cột dữ liệu là `ContactsContract.Data.RAW_CONTACT_ID` nên mình chỉ cần sử dụng câu lệnh
```Java
long rawContactId = cursor.getLong(0);
```
để lấy về dữ liệu cần thiết.


## 3.2 Update Phone Number

```Java
String where = ContactsContract.Data.MIMETYPE + " = ? AND "
                    + ContactsContract.CommonDataKinds.Phone.TYPE + " = ? AND "
                    + ContactsContract.Data.RAW_CONTACT_ID + " = ? ";
                    
String[] params = new String[]{ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
                                String.valueOf(ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE),
                                String.valueOf(rawContactContactId)};
                    

ContentProviderOperation.Builder builder = 
            ContentProviderOperation.newUpdate(ContactsContract.Data.CONTENT_URI)
                                    .withSelection(where, params)
                                    .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, "123456");
                                                                    
 ArrayList<ContentProviderOperation> ops = new ArrayList<>();
 ops.add(builder.build());
 
 try {
    getContentResolver().applyBatch(AUTHORITY, ops);
} catch (Exception e) {
    e.printStackTrace();
}
```

Như các bạn thấy là 2 biến `where` và `params` ở đây mình thêm các ràng buộc về dữ liệu để để câu lệnh `ContentProviderOperation.newUpdate` thực hiện trỏ đến đúng hàng chứa dữ liệu mình cần thực hiện **Update**. Và cuối cùng là thực hiện thêm dữ liệu cần chỉnh sửa vào trường cần **Update**.

```Java
    .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, "123456");
```


Ở trên là mình thực hiện chỉnh sửa trường số điện thoại với kiểu là `ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE` đây là 1 kiểu mặc định cuâ hệ thống.  Trong trường hợp **Contact** này có nhiều số điện thoại với cùng kiểu là  `ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE` thì các bạn cần thêm 1 rằng buộc nữa là các bạn muốn chỉnh sửa số điện thoại nào. 

```Java
String where = ContactsContract.Data.MIMETYPE + " = ? AND "
                    + ContactsContract.CommonDataKinds.Phone.TYPE + " = ? AND "
                    + ContactsContract.CommonDataKinds.Phone.NUMBER + " = ? AND "
                    + ContactsContract.Data.RAW_CONTACT_ID + " = ? ";
                    
String[] params = new String[]{ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
                                String.valueOf(ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE),
                                "123456789",
                                String.valueOf(rawContactContactId)};
                    

ContentProviderOperation.Builder builder =
            ContentProviderOperation.newUpdate(ContactsContract.Data.CONTENT_URI)
                                    .withSelection(where, params)
                                    .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, "123456");
```

Nếu bạn không thêm `ContactsContract.CommonDataKinds.Phone.NUMBER + " = ? AND "` với dữ liệu đầu vào là `123456789` thì câu lệnh trước sẽ thực hiện cập nhật tất cả các số điện thoại có cùng kiểu là `ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE` thành `123456`.


Danh bạ trong Android cho phép bạn lưu các trường theo kiểu `ContactsContract.CommonDataKinds.Phone.TYPE_CUSTOM` với 1 nhãn do bạn tự định nghĩa mà không sử dụng các nhãn mặc định của hệ thống. Thì khi thực hiện cập nhật các trường này bạn cũng cần thêm rằng buộc về kiểu và nhãn cho câu truy vấn.

```Java
String where = ContactsContract.Data.MIMETYPE + " = ? AND "
                    + ContactsContract.CommonDataKinds.Phone.TYPE + " = ? AND "
                    + ContactsContract.CommonDataKinds.Phone.LABEL + " = ? AND "
                    + ContactsContract.Data.RAW_CONTACT_ID + " = ? ";
                    
String[] params = new String[]{ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
                                String.valueOf(ContactsContract.CommonDataKinds.Phone.TYPE_CUSTOM),
                                label,
                                String.valueOf(rawContactContactId)};
```

Cũng tương tự khi có nhiều kiểu `ContactsContract.CommonDataKinds.Phone.TYPE_CUSTOM` và `label` giống nhau  thì các bạn cần thêm rằng buộc là mình muốn thay đổi số điện thoại nào và câu truy vấn.


**Update** các kiểu dữ liệu như `Email, Name` vvv khác cũng tương tự như là **Update** PhoneNumber ở trên.

# 4. Delete Contact
Việc thực hiện xóa **Contact** đơn giản hơn rất nhiều so với việc **Update**. Việc đầu tiên là bạn cũng cần thực hiện lấy về `RawContactId` của **Contact** cần xóa, công việc này mình đã hướng dẫn các bạn ở[ mục 3.1](https://viblo.asia/p/contact-in-android-partii-3P0lPQeP5ox#_31-get-rawcontactid-1) rồi nên ở đây mình sẽ không nhắc lại nữa.
```Java
ArrayList<ContentProviderOperation> ops = new ArrayList<>();
Uri uri = ContentUris.withAppendedId(ContactsContract.Contacts.CONTENT_URI, contactId).buildUpon()
        .appendQueryParameter(ContactsContract.CALLER_IS_SYNCADAPTER, "true")
        .build();
ops.add(ContentProviderOperation.newDelete(uri).build());

try {
    context.getContentResolver().applyBatch(ContactsContract.AUTHORITY, ops);
} catch (RemoteException | OperationApplicationException e) {
    e.printStackTrace();
}
```

Khi bạn thực hiện lệnh xóa ở bảng với **Uri** là `ContactsContract.Contacts.CONTENT_URI` thông qua câu lệnh `ContentProviderOperation.newDelete(uri)` thì Android sẽ tự động xóa hết các dữ liệu của **Contact** được liên kết ở các bảng khác nhau.

> Qua 2 phần về **Contact in Android** mình cũng đã giới thiệu với các bạn về cầu trúc lưu dữ liệu và các thao tác cơ bản trên danh bạ trong Android. Hi vọng 2 bài viết sẽ giúp ích cho các bạn trong các `Project` hiện tại và sau này khi làm việc với Danh bạ trong Android.