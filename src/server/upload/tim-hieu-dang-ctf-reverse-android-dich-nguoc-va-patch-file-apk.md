![](https://images.viblo.asia/be9332ab-3a29-4f1e-9aa2-2f3a336e7481.png)

Reverse Engineering (hay gọi tắt là RE) là một mảng mà hầu hết các giải CTF Jeopardy đều có. Trong các bài RE chúng ta thường thấy 1 số loại file như exe, elf, các file code,... và cả file apk.

Do việc làm hẳn 1 app android, lại cần để lại trong đó những thiếu sót về bảo mật để người chơi khai thác, tìm flag cần tốn nhiều thời gian và công sức hơn, nên dạng file apk không xuất hiện nhiều trong các cuộc thi CTF. Tuy nhiên, xét về độ khó và sự thú vị thì dạng bài reverse file apk cũng không hề kém gì các dạng file khác.

Trong bài này, chúng ta sẽ cùng tìm hiểu về dạng bài RE Android qua 1 bài CTF đơn giản: bài **Droids3 trong picoCTF 2019**.

Link tải: [Droids3](https://github.com/MinhNhatTran/Android-CTF/blob/master/pico2019/three/three.apk)

### Tools

Các công cụ cơ bản mà chúng ta cần để làm 1 bài CTF reverse apk gồm:
- Thiết bị Android đã root: máy thật hoặc giả lập đều được. Mình sử dụng giả lập [Genymotion](https://www.genymotion.com/)
- [Virtual box](https://www.virtualbox.org/wiki/Downloads) để chạy giả lập Genymotion.
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) để chạy các tools, đa số tools viết bằng java.
- ADB: công cụ giúp kết nối với máy ảo Android, có sẵn trong thư mục tools của genymotion, đường dẫn mặc định trên windows là **C:/Program Files/Genymobile/Genymotion/tools**.
- [Apktool](https://ibotpeaches.github.io/Apktool/install/): decompile và build file apk.
- [Bytecode viewer](https://bytecodeviewer.com/): công cụ reverse file apk

### Cài đặt

Sau khi cài đặt đầy đủ các tools, chúng ta khởi động Genymotion, tạo 1 thiết bị Android bất kỳ. Mình thường tạo các thiết bị Google Pixel, các thiết bị này chạy khá mượt.

Khi mọi thứ đã có đủ và giả lập android đã bật, chúng ta sẽ tiến hành cài đặt file apk vào giả lập để chạy:
- Copy file **three.apk** vào cùng thư mục với adb để tiến hành cài đặt.
- Chạy lệnh cài đặt ứng dụng vào máy ảo: adb install three.apk

Sau khi cài đặt thành công, trong thiết bị giả lập đã có thêm app PicoCTF

![](https://images.viblo.asia/e90d39f1-dc2c-42b0-85bb-d1c6471fa965.png)

### Tìm hiểu ứng dụng 

Giao diện ứng dụng có các chức năng cơ bản: 1 trường input, 1 button và 2 đoạn text.

Khi click vào button sẽ hiện text "don't wanna", và hint là "make this app your own".

### Tìm flag

Mở file three.apk bằng Bytecode Viewer chúng ta có thể thấy rất nhiều file và folder. Làm sao từ trong đống file này tìm được file có tác dụng giúp chúng ta lấy được flag thì chủ yếu dựa vào kinh nghiệm. Cách của mình là thử xem hết các file xem có khai thác được gì không.

Tất nhiên cũng không thể tìm mà không có hướng gì cả. Các file code chính của ứng dụng thường nằm trong đường dẫn dạng **com/abc/xyz/**.  Với bài này thì chúng ta thấy 1 file có cái tên đáng ngờ nằm tại **com/hellocmu/picoctf/FlagstaffHill.class**

![](https://images.viblo.asia/086681b6-a8d6-46ce-90b0-fa9dc97a927a.png)

Ở đây chúng ta để ý thấy có 2 hàm nope() và yep(). Hàm getFlag() lại trả về kết quả của hàm nope - "don't wanna". Vậy thì cái chúng ta cần ở đây là getFlag phải return yep. Để làm được điều đó chúng ta cần sử dụng kỹ thuật patch file apk.

Trước khi giới thiệu về kỹ thuật patch thì mình sẽ nói qua về cấu trúc của file apk. File apk thực chất là một dạng file nén như zip, rar, v..v.. Chúng ta hoàn toàn có thể rename three.apk thành three.zip và giải nén ra bình thường. Tất nhiên các file sau khi giải nén ra chưa thể xem trực tiếp được luôn

![](https://images.viblo.asia/cf1bd6c2-6f88-4128-a31a-31557a3679ff.png)

Trong các file giải nén ra có 1 file **class.dex**, file này chứa các class trong code java. Các lập trình viên sẽ thường code app Android bằng java/kotlin. Khi compile thì các file class sẽ được nén lại thành 1 file dex.

![](https://images.viblo.asia/9d1b0652-9e31-4012-a52d-befd7f3d7af8.png)

Khi thực hiện reverse file apk thì chúng ta sẽ không nhận được các file code bằng java đâu, thay vào đó chúng ta sẽ nhận được các file smali code. Từ các file smali này, decompiler sẽ chuyển sang code java để chúng ta đọc, nhưng sẽ không chính xác hoàn toàn, và sẽ có sự khác biệt khi sử dụng các decompiler khác nhau. Thứ có độ tin cậy cao nhất khi thực hiện reverse app là smali code (smali code trong reverse android có vai trò như assembly code trong reverse exe, elf vậy).

Mình chỉ giới thiệu sơ qua như vậy thôi. Giờ thì chúng ta sẽ bắt tay vào việc path lại app.

#### Đầu tiên chúng ta sẽ decompile file apk bằng apktool

Để file apk và apktool cùng thư mục và chạy lệnh: ``` java -jar apktool_2.4.1.jar d three.apk ```

Kết quả sẽ được folder three với các sub folder, file

![](https://images.viblo.asia/16ba9391-7d2b-4f0e-9bdd-f1229515cd7d.png)

#### Tiếp theo chúng ta sẽ tiến hành sửa code

Mở file three/smali/com/hellocmu/picoctf/FlagstaffHill.smali

Mình sử dụng VScode cài thêm extension smali để dễ nhìn hơn, tiện cho việc sửa code.

![](https://images.viblo.asia/68c52f1d-ba9f-4aab-8843-76551869da4c.png)

Chúng ta sẽ chú ý vào hàm getFlag, chỗ mình gạch chân ->nope tương ứng với return nope trong code java. Bây giờ cùng xem lại code java:
- Thứ nhất: chúng ta cần hàm getFlag phải return yep thay vì return nope
- Thứ hai: cả hai hàm yep và nope đều có cùng argument

=> Vậy, để getFlag return yep thì chúng ta chỉ cần đổi ->nope thành ->yep, sau đó save lại file.

#### Bước 3: build lại thành file apk mới

Khi đã sửa được code theo ý muốn, chúng ta cần từ các file đó build ra file apk mới. apktool cũng có chức năng cho phép build ra file apk sau khi sửa code, chỉ cần chạy lệnh: ``` java -jar apktool_2.4.1.jar b three ```

![](https://images.viblo.asia/e9ac677c-635a-4625-bae1-0f16302d99fe.png)

File apk mới nằm tại thư mục three/dist. Xóa app cũ trong giả lập đi và cài lại app mới thôi chứ còn gì nữa đúng không?

![](https://images.viblo.asia/0226054e-d409-4a1e-9511-e3c78d66fbd5.png)

File three.apk mới này không cài được ngay đâu, chúng ta cần làm tiếp bước cuối cùng.

#### Sign apk

Các bạn hãy copy 2 câu lệnh sau vào file text:

```
keytool -genkeypair -v -keystore key.keystore -alias publishingdoc -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./key.keystore %1 publishingdoc
```

Đổi tên file thành sign-apk.bat sau đó chạy lệnh cmd: ``` sign-apk.bat [file-name].apk ```

Lần lượt điền keystore và các thông tin, các bạn thích điền gì cũng được, mình để "123123" hết. Lệnh đầu tiên sẽ tạo key.keystore, lệnh thứ 2 sẽ sign apk bằng key vừa tạo.

![](https://images.viblo.asia/8dad1173-fe1d-4491-b631-8d2502c433f7.png)

![](https://images.viblo.asia/bdccad3e-04c0-4bd7-a04f-3f3499addfcd.png)

Như vậy là chúng ta đã sign thành công file apk patched. Giờ chỉ cần xóa ứng dụng cũ trong giả lập, cài ứng dụng mới đã patch vào và bấm nút để nhận flag.

![](https://images.viblo.asia/dcbfb335-4942-4533-81da-21756d8ba418.png)

**Flag: picoCTF{tis.but.a.scratch}**

-----

Qua bài viết thì chắc hẳn các bạn đều nắm được những kiến thức cơ bản để làm các bài CTF reverse apk rồi đúng không? Nếu có bất cứ thắc mắc gì, hãy comment ở phía dưới bài viết để chúng ta có thể cùng thảo luận nhé.