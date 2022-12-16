Trong bài viết này mình sẽ hướng dẫn các bạn một số tips, tricks nhỏ nhưng mang lại hiệu quả, tăng năng suất trong Android Studio, hi vọng những thông tin này sẽ hữu ích đối với các bạn
# 1. Android Log colors
Với cách highlight mặc định của them Darcula, mình không thể nhận ra loại của log. Ngoại trừ Error màu đỏ thì còn lại đều là màu trắng.
![](https://images.viblo.asia/71eef1fb-536d-4691-bf70-9355fe5d8e58.png)

Mình khuyến khích các bạn sử dụng màu sắc tương sáng từ Android Holo theme. Dựa vào màu sắc của mỗi loại các bạn có thể dễ dàng nhận ra từng loại log
![](https://images.viblo.asia/d779b9de-b4fa-40a6-88ff-dfa54ac5c215.png)

Vậy để đổi màu của log các bạn làm như sau
* Chọn toolbar mene chọn File|Settings
* Chọn Editor|Colors & Fonts|Android Logcat
* Click Save As… và tạo một lược đồ màu mới
* Thay đổi tất cả các màu thành ‘Holo theme colors’ (Bỏ chọn ‘Use inherited attributes’ for every color)
```
Assert:  #AA66CC
Debug:   #33B5E5
Error:   #FF4444
Info:    #99CC00
Verbose: #FFFFFF
Warning: #FFBB33
```
Mã màu cơ bản 

![](https://images.viblo.asia/4faf51b9-c212-4c0b-b018-dc6592948802.png)

# 2. Ngăn Android Studio Logcat xóa log cho ứng dụng hiện tại khi ứng dụng bị crash
Để làm được điều này bạn cần mở ```Android Monitor``` và chọn ```Edit filter configuration``` ở góc trên bên tay phải

![](https://images.viblo.asia/d5047dc3-d8cd-455d-8307-823aa0a59053.gif)https://images.viblo.asia/d5047dc3-d8cd-455d-8307-823aa0a59053.gif

# 3. Áp dụng một code style phù hợp cho Android Studio của bạn

Mở ```Preferences → Code Style → Java``` và trong dropdown ```Scheme``` bạn có thể lựa chọn một code style phù hợp cho Android Studio của bạn hoặc bạn cũng có thể cài đặt 1 code style mới.

Đây là Code Style được google suggest [Square Java Code Styles with Android](https://github.com/square/java-code-styles)

Bạn có thể import code style theo ảnh gif bên dưới 

![](https://images.viblo.asia/67ccf9c6-5caf-4369-922d-ef52a7dd2403.gif)https://images.viblo.asia/67ccf9c6-5caf-4369-922d-ef52a7dd2403.gif

# 4. Sử dụng chia màn hình để tăng hiệu quả.
Trong trường hợp các bạn không có 2 màn hình để code các bạn có thể chia nhỏ màn hình Android Studio hiện tại thành 2 phần

![](https://images.viblo.asia/e444fcaa-c6b6-4c68-b927-69f40d246feb.png)

Để bật tính năng này bạn có thể click chuột phải vào tab của màn hình và chọn tính năng ```Split Vertically / Horizontally.``` tương ứng với dọc và ngang

![](https://images.viblo.asia/cee4fc53-19fe-44ac-be0d-45f3eacd8dff.png)

Tuy nhiên để có thể linh hoạt sử dụng chế độ này, bạn cũng có thể tạo keyboard shortcut. Để tạo shortcut bạn có thể chọn ```Preferences → Keymap``` và search từ khóa ```Split Vertically```. Khi dialog hiện lên bạn có thể nháy chuột phải và chọn ```Add Keyboard Shortcut```
Trong trường hợp này mình sử dung ```control + alt + v```

# 5. Hiện thị số thứ tự của dòng
Trong trường hợp các bạn sử dụng Github để quản lý source code, bạn gửi pull và bị comment vào 1 dòng nào đó trong pull request bạn có thể dễ dàng nhìn thấy dòng code bị comment đó thông qua  tính năng hiển thị số dòng của Android Studio. Mặc định thì tính năng này bị disable

![](https://images.viblo.asia/b4b4b783-7b74-401f-96e1-bba2430a0b73.png)

Để bật tính năng này bạn cần làm nhưu sau
* Trong toolbar menu chọn ```File|Settings```
* Chọn ```Editor|General|Appearance```
* Tick vào ```Show line numbers```

![](https://images.viblo.asia/b12602ed-5d8c-4ada-a5a8-31b757ec3c87.png)

và đây là kết quả

![](https://images.viblo.asia/0e66636c-cdec-4548-8273-faabfd99b685.png)

# 6. Quy ước đặt tên các biến
Nếu bạn nào đang follow theo [Google naming convention](https://source.android.com/setup/contribute/code-style#follow-field-naming-conventions)
* Non-public, non-static field names start with m.
* Static field names start with s.

Sẽ thật khó khăn cho các bạn sử dụng getter, setter vì Android Studio sẽ tự động gen ra các getter setter có dạng getm...., setm...... hay ko tự động suggest tên biến hợp lý thì các bạn có thể setting lại cho Android Studio như sau

* Trong toolbar menu chọn ```File|Settings```
* Chọn ```Editor|Code Style|Java```
* Chọn tab ```Code Generation``` 
* thêm m và s như dưới

![](https://images.viblo.asia/1cf2ba7f-5b4b-40da-b02a-73d287e4555e.png)

Kết quả

![](https://images.viblo.asia/0e100f33-647a-4312-9818-e4ae96c91bff.gif)

# 7. Sử dụng Live Template 
Nếu bạn đã viết nhiều code Android, có thể bạn đã mắc lỗi dưới đây ít nhất một lần
```
Toast.makeText(MainActivity.this, "This will not be displayed");
```
Các bạn có thể giải quyết lỗi này thông qua Live Template 

![](https://images.viblo.asia/42fe7dbe-e95c-45ae-b866-5d7e1c6d63f9.gif)

Như bạn thấy thì Live Template là một danh sách các phím tắt để có thể hoàn thành một đạon mã nào đó. Ở ví dụ trên khi mình gõ "Toast" + tab thì 1 đoạn code đã được tự động sinh ra cho mình. 
Android Studio hỗ trợ rất nhiều các phím tắt như vậy, dưới đây là một số phím tắt mình thường sử dụng

Bạn có thể vào ```File > Settings > Editor > Live Templates``` để xem danh sách đầy đủ

![](https://images.viblo.asia/a118c2ca-8eb8-4a9b-bc95-45a738b8e222.gif)


Bạn cũng có thể custom những shortcut của Live Template cho riêng bản thân mình.
Có thể bắt đầu với việc tạo một ```static start``` menthod để khởi động 1 activity

```
public static void start(android.content.Context context) {    
  android.content.Intent starter = new Intent(context, $ACT$.class);
  starter.putExtra($CURSOR$);
  context.startActivity(starter);
}
```

Bạn có thể tham khảo video dưới đây để có thể tạo ra Live Template cho mình nhé.


{@youtube: https://youtu.be/4rI4tTd7-J8}

Trên đây là một số tips, tricks mình khuyên các bạn nên áp dụng. Rất hi vọng chúng bổ ích với các bạn.

Bài viết có tham khảo một số nguồn
https://medium.com/@mmbialas/50-android-studio-tips-tricks-resources-you-should-be-familiar-with-as-an-android-developer-af86e7cf56d2
https://medium.com/google-developers/writing-more-code-by-writing-less-code-with-android-studio-live-templates-244f648d17c7