### 1. Internal Storage  
* Internal storage là nơi lưu trữ dữ liệu cá nhân của từng ứng dụng, các dữ liệu được tạo ra và lưu trữ này sẽ được sự dụng riêng cho từng ứng dụng và các ứng dụng khác sẽ không thể truy cập vào được. Khi ứng dụng đó được gỡ bỏ khỏi thiết bị android thì các file dữ liệu được lưu tại bộ nhớ trong này sẽ bị xóa bỏ theo. Điều này làm cho Internal Storage là một nơi lưu trữ dữ liệu tốt mà người dùng không cần truy cập trực tiếp. 
*  Khi xây dựng một ứng dụng sử dụng bộ nhớ trong, HĐH Android sẽ tạo một thư mục duy nhất, chỉ có thể truy cập được từ ứng dụng, vì vậy không có ứng dụng nào khác, hoặc thậm chí người dùng cũng có thể nhìn thấy những gì trong thư mục.    
###  2. External Storage
- External Storage là nơi lưu trữ dữ liệu ngoài của Android, các file dữ liệu lưu trữ mà bạn lưu trữ tại đây không được hệ thống áp dụng bảo mật. có nghĩa là ứng dụng khác hoàn toàn có thể truy cập vào bộ nhớ ngoài này  
- Thông thường có 2 loại lưu trữ ngoài là lưu trữ ngoài tại ổ cứng điện thoại và lưu trữ tại ổ cứng di động như thẻ nhớ (SD card). Dữ liệu được tạo ra sẽ không bị ràng buộc bởi ứng dụng, nên khi xóa ứng dụng thì dữ liệu tại bộ nhớ ngoài không bị mất đi.  
Bộ nhớ ngoài giống như một bộ lưu trữ công cộng, hiện tại bây giờ nó thường là sdcard, nhưng có thể trở thành bất kỳ loại lưu trữ nào khác sau này   
- Có 2 permission cho việc đọc và ghi ở bộ nhớ ngoài  READ_EXTERNAL_STORAGE và  WRITE_EXTERNAL_STORAGE.  

- Với những thiết bị Andoird Api level 25 hoặc thấp hơn khi khai báo cả 2 permission trên vào manifest hệ thống  sẽ chấp nhận 2 permission đó tại cùng một thời điểm vì chúng cùng nằm trong một permission group là STORAGE   
- Với thiết bị Android 8 Api level 26 hệ thống chỉ cấp quyền READ_EXTERNAL_STORAGE tại thời điểm đó, tuy nhiên nếu sau đó người dùng yêu cầu thêm quyền WRITE_EXTERNAL_STORAGE thì hệ thống sẽ ngay lập tức cấp quyền đó mà ko nhắc nhở người dùng.  Nên nếu khai báo cùng một lúc 2 permissison trên trong manifest sẽ gây ra lỗi, tham khảo cách xử lí tại  [đây](https://stackoverflow.com/questions/48172519/oreo-write-external-storage-permission)
 
### 3. Scoped storage  là gì ?  
- Scoped Storage về cơ bản là giới hạn truy cập của ứng dụng vào thư mục của ứng dụng khác đc lưu trên bộ nhớ ngoài  
- Như các phiên bản Andorid nhỏ hơn 10 thì ứng dụng có thể truy cập vào các thư mục của ứng dụng khác và có thể tạo ra một số file media phân tán nhiểu nơi trên bộ nhớ ngoài của thiết bị và khi gỡ ứng dụng đi những tập tin đó cũng không bị xóa bỏ  và chiếm nhiều không gian bộ nhớ 
- Để kiểm soát các file chặt chẽ hơn, hạn chế lạm dụng các permmission để truy cập vào bộ nhớ ngoài thì từ Android 10 trở lên Google đã triển khai việc cho phép ứng dụng truy cập vào bộ nhớ ngoài mà không cần bất kì permission nào nhưng chỉ có quyền truy cập vào thư mục dành riêng cho ứng dụng đó (ko truy cập đc vào thư mục của ứng dụng khác)  hay còn gọi là implement Scoped Storage. 
- Ý tưởng của Scoped Storage là phân chia dung lượng lưu trữ thành các tập dữ liệu nhỏ hơn để giới hạn quyền truy cập vào toàn bộ external storage   
Ưu điểm của loại này : 
- Quản lí tệp tin tốt hơn : Hệ thống biết tệp nào đc tạo ra bởi ứng dụng nào và đặc biệt khi gỡ app đi thì toàn bộ dữ liệu tạo ra bởi ứng dụng đó cũng bị xóa theo (trừ trường hợp ng dùng muốn giữ lại nó).
- Bảo vệ dữ liệu ứng dụng : như đã nói ở trên bộ nhớ trong là private và ứng dụng khác ko thể truy cập vào đc. Nhưng bộ nhớ ngoài thì ngược lại có thể truy cập vào thư mục của ứng dụng khác chỉ cần có permmission. Với Scoped Storage thì dữ liệu của ứng dụng đc lưu trong bộ nhớ ngoài cũng không dễ dàng truy cập bởi ứng dụng khác    
### 4. Scoped storage in android 10  và android 11
 - Mạc định với các thiết bị chạy android 10 hoặc cao hơn sẽ được cấp quyền truy cập vào bộ nhớ ngoài mà không cần bất kì permission nào.
- Tuy nhiên để cung cấp cho các nhà phát triển thời gian thử nghiệm về phạm vi lưu trữ này, Các thiết bị android 10 có thể sử dụng cờ requestLegacyExternalStorage để từ chỗi sử dụng Scoped Storage tuy nhiên ở phiên bản android 11 thì Scope storage là bắt buộc và không thể sử dụng cờ này 
###  5. Example  
**Internal Storage Example**   
 openFileOutput() : method đc sử dụng để tạo và lưu file
 ```javascript
FileOutputStream fOut = openFileOutput("file name",Context.MODE_PRIVATE);
```
 method openFileOutput() trả về 1 instance của FileoutputStream(). Sau đó call method để ghi dữ liệu vào data 
 ```javascript
String str = "test data";
fOut.write(str.getBytes());
fOut.close();
```
 ![](https://images.viblo.asia/bfbbb0c4-57e5-4468-a45b-d0a095fdcdf6.png)
 
 openFileInput(): method đc sử dụng để mở và đọc file. nó trả về 1 instance của FileInputStream
 ```javascript
FileInputStream fin = openFileInput(file);
```
 Sau đó gọi method để đọc từng kí tự trong file 
![](https://images.viblo.asia/96707a61-70f8-43c1-a777-473bee606ed2.png)

* Vị trí lưu file 
Click Device File Explorer > data 
![](https://images.viblo.asia/bc019264-029f-42f6-9a2e-da7e6977effc.png)

**External Storage Example**   
* Cấp quyền đọc ghi trong manifest
```javascript
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```
Lưu í : Nếu bạn sử dụng android 8 chỉ cần cập quyền Write là đủ 
 ```javascript
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" tools:node="replace"/>
```
Nếu sử dụng android 10 thì thêm cờ sau vào file AndroidManifest.xml mà ko cần bất kì một permission nào 
```javascript
android:requestLegacyExternalStorage="true"
```
* Kiểm tra bộ nhớ ngoài 

![](https://images.viblo.asia/f158a1ac-0c4b-4049-97ac-5587f51ec311.png)

Method getExternalStorageState() là một static method của Enviroment kiểm tra xem bộ nhớ ngoài còn khả dụng hay không  
* Xử lí đọc ghi file 

![](https://images.viblo.asia/04091d37-f929-4fff-b8bc-380e031f4e15.png)

**Thanks for reading :D**