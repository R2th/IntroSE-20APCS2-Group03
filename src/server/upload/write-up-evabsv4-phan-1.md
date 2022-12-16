![](https://images.viblo.asia/259a908b-d42a-4758-990b-2e22dd43e5c9.PNG)

Trong quá trình tìm kiếm các bài Lab về Android Security mình đã tình cờ tìm được Lab EVABS này. Đây là 1 lab rất hay, thích hợp cho người bắt đầu tìm hiểu về Android Security. Tuy nhiên, việc tìm được lab này không dễ cho lắm, vì đây là một lab mới khiến đa số các tài liệu hướng dẫn cơ bản đều chưa cập nhật thông tin về EVABS.

Nói là lab cơ bản vì EVABS có tận 12 levels, mỗi level được xây dựng dựa trên một lỗ hổng bảo mật của các ứng dụng Android. Tuy nhiên để hoàn thành tất cả 12 levels với các bạn mới học không phải đơn giản.

Khi so sánh EVABS với các lab Android nổi tiếng trước đó, chúng ta có thể thấy các điểm vượt trội sau:
- **Bắt kịp công nghệ**: các lab như InsecureBankv2, DIVA,... đã được thiết kế từ khoảng 5 năm trước rồi. Và từ đó đến nay thì ứng dụng Android cũng có sự phát triển mạnh hơn. Việc EVABSv4 được update lần cuối từ khoảng 6 tháng trước (so với thời điểm mình viết bài này) giúp cho việc "phá đảo" lab này giống như việc khai thác lỗ hổng của 1 ứng dụng Android thực tế.
- **Tính thử thách cao**: cho tới khi viết bài này, mình vẫn chưa tìm được 1 bài hướng dẫn, hoặc là writeup cho EVABS (có thể do mình search chưa tốt). Trong quá trình làm lab, mình chỉ có thể tham khảo từ 1 số Lab khác và từ hint của mỗi level, và hi vọng những thứ đó giúp cho việc tìm ra flag. Thậm chí khi làm level 11, mình đã phải gửi mail cho tác giả để kiểm tra xem flag có đúng hay không.

Những thông tin khác về EVABS các bạn có thể xem tại [repo gốc](https://github.com/abhi-r3v0/EVABS). Giờ thì chúng ta sẽ "phá đảo" 12 levels của EVABSv4.

### Level 1: Debug Me

Ở level 1 chúng ta cần kiểm tra log của hệ thống. Đây cũng là một trong những điều cần làm khi kiểm tra các ứng dụng Android. Việc lộ các thông tin quan trọng ở log là do dev đã làm không cẩn thận.

Giờ thì việc làm lộ thông tin quan trọng về ứng dụng ra log đã không còn phổ biến nữa do đội ngũ dev đã được khuyến cáo về việc này. Tuy nhiên đây cũng là 1 hướng kiểm tra, biết đâu còn đoạn log nào quan trọng bị bỏ sót thì sao.

Việc kiểm tra log đơn giản với lệnh: ``` adb logcat ```.

Tuy nhiên như vậy sẽ rất rối mắt, để loại bỏ đi các dòng log của hệ thống và chỉ tập trung vào log của ứng dụng chúng ta sẽ làm như sau:
- B1: chạy lệnh ``` adb shell ps ``` để tìm PID của ứng dụng.
![](https://images.viblo.asia/a5439ddb-8229-4163-8669-7ec7657c7fb0.PNG)
- B2: khi tìm được PID của ứng dụng rồi, chạy lệnh ``` adb logcat --pid=[app's pid] ```.

Khi đọc được log rồi, ta click vào button "LOG THE KEY" và xem flag ở logcat.

![](https://images.viblo.asia/36e5b0eb-d3d2-4005-8a72-c7653e2222bf.png)

### Level 2: File Access

Các thư mục trong 1 project Android được phân cấp rất cụ thể, nhờ đó chúng ta luôn biết được một tài nguyên của ứng dụng được lưu trữ tại đâu. Một trong số những nơi ứng dụng sử dụng để lưu trữ tài nguyên là **assets** folder.

![](https://images.viblo.asia/02e18629-6ac7-4f89-aecd-ef52447afee9.png)

Tất cả những tài nguyên này đều được nén vào file apk cùng với các file code của ứng dụng. Để lấy được các tài nguyên này, chúng ta chỉ cần đổi đuôi file apk -> zip và giải nén (trên linux thì chỉ cần unzip luôn mà không cần đổi đuôi file).

Giờ thì chỉ cần vào thư mục assets và chúng ta sẽ thấy 1 file chứa flag.

### Level 3: Strings 

![](https://images.viblo.asia/caa9760e-efbb-4b61-b4c2-8d77320c8d29.png)

Các strings sử dụng trong ứng dụng được lưu tại file **strings.xml**. Quá quen thuộc, decompile bằng apktool và strings.xml thẳng tiến.

Thực tế thì ít khi các thông tin quan trọng như key giải mã,...sẽ xuất hiện trong file này, tuy nhiên việc sử dụng file này có thể hỗ trợ cho quá trình dịch ngược ứng dụng.

### Level 4: Resource

![](https://images.viblo.asia/1e9f5bfe-db81-48c7-ada1-9910b469db85.png)

Qua gợi ý, dễ dàng để biết rằng flag nằm trong 1 file nào đó giữa 1 đống file có trong thư mục **res**. Tất nhiên chúng ta sẽ chỉ dùng 1 command thôi, việc tìm hết các file là quá mệt với 1 người lười như mình: ``` grep -r "EVABS{" * ```. Và ta biết được flag nằm tại **res/raw/link.txt**

### Level 5: Shares and Preferences

SharedPreferences là một API lưu trữ dữ liệu vĩnh viễn trong các file XML. Dữ liệu được lưu trữ bởi SharedPreferences object có cấu trúc dạng key - value.

SharedPreferences object có thể được khai báo cho tất cả ứng dụng sử dụng, hoặc khai báo private. Dữ liệu được lưu trong các file XML tại ``` /data/data/<package-name>/shared_prefs/*.xml ```.

![](https://images.viblo.asia/e572a5d5-e1d4-4dfd-a957-d5b12138d6d3.png)

Sử dụng adb shell để truy cập vào hệ thống android bằng lệnh ``` cd /data/data/com.revo.evabs/shared_prefs ``` và chạy lệnh ``` grep -r "EVABS" * ``` để tìm flag giấu trong các file xml.

### Level 6: DB Leak

Các ứng dụng Android cũng cần lưu trữ dữ liệu local. Một trong những nơi ứng dụng sử dụng để lưu trữ dữ liệu là SQLite DB. Các database này luôn nằm tại ``` /data/data/<package-name>/databases ```

![](https://images.viblo.asia/5d847f5c-7854-4ab2-b62b-e1ef23ed42a9.png)

Sau khi click button "FETCH CREDS" thì sẽ có DB được sinh ra trong Local Storage.

Giờ thì chạy ``` adb shell "ls /data/data/com.revo.evabs/databases" ``` để kiểm tra xem có những db nào. Ở đây chỉ có 1 db là MAINFRAME_ACCESS.

Pull DB đó về máy thật để mở bằng SQLite browser bằng lệnh ``` adb pull "/data/data/com.revo.evabs/databases/MAINFRAME_ACCESS" ```. Xem các bảng thấy flag là password của user Dr.l33t có role admin.

### Level 7: Export

Trong ứng dụng Android có khái niệm **activity**. Activity trong Android là nơi diễn ra mọi hoạt động tương tác với người dùng, bởi vì tất cả các màn hình ứng dụng đều phải được “đính” trên một Activity.

Thông tin về các activity được lưu trong file **AndroidManifest.xml**, xuất hiện trong các thẻ **<activity ..... />**. Trong thẻ này có 1 thuộc tính quan trọng là **android:exported**. Nếu thuộc tính này có giá trị **true** thì activity đó có thể bị kích hoạt bởi các ứng dụng khác.

![](https://images.viblo.asia/14db01cc-f198-4864-b52c-d127872c138f.png)

Khi kiểm tra manifest, ở ngay dòng thứ 4 trong đã có thông tin về một Activity bị exported:

```xml
<activity android:exported="true" android:name="com.revo.evabs.ExportedActivity"/>
```

Khi một activity bị exported, chúng ta có thể khởi động nó bằng adb. Sử dụng adb để trigger các exported activity bằng lệnh: ``` adb shell am start -n [package name]/[package name].[exported activity] ```.

![](https://images.viblo.asia/c40a8525-7171-4339-9857-0b10352fc581.png)

### Level 8: Decode

Hardcoded các string quan trọng là không an toàn, khi hacker có thể dễ dàng reverse file apk và tìm được các đoạn string này.

![](https://images.viblo.asia/21a9a244-5c92-44ff-9fc1-880399add78d.png)

Reverse sang code java bằng Bytecode viewer, sau đó mở file **Decode.class** - file code java cho level 8 thấy ngay 3 đoạn text hardcoded.

![](https://images.viblo.asia/67622d0b-1f29-4b19-aadb-cde4eb104954.png)

Decode B64 với 3 string này ta có được flag.

-----

Trên đây là write up 8 levels đầu của lab EVABSv4. Để làm được những gì mình đã nói ở trên chỉ cần biết cách sử dụng máy tính và hệ điều hành Linux/Windows là có thể làm được.

Các level sau mình sẽ nói trong phần 2. Với các level 9 - 12 sẽ yêu cầu các kiến thức chuyên sâu hơn về ứng dụng Android và cách sử dụng các tools, frameworks xịn xò.