# Tìm hiểu cách phát hiện ngôn ngữ trong văn bản 
 Như chúng ta đã biết có tới hàng trăm loại ngôn ngữ trên thế giới, chắc hẳn chúng ta đã gặp những loại tài liệu 
được viết bằng nhiều loại ngôn ngữ khác nhau, gây khó khăn cho người đọc. Từ đó việc có một công cụ để phát hiện ngôn ngữ là cần thiết để phục vụ cho nhu cầu đọc và xử lý dữ liệu. 
Để làm được điều này có rất nhiều thư viện chúng ta có thể sử dụng. 
Ở bài này chúng ta sẽ đi tìm hiểu thư viện Guava (có rất nhiều thứ hay ho với thằng này :D)-một thư viên mã nguồn mở Java được phát triển bởi Google [(https://github.com/google/guava)].

## *  Tạo project
![](https://images.viblo.asia/1b768720-bd01-45d9-ba95-4f4bf7b5392b.png)
## *  Cấu hình thư viện 
* Với maven :
```
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>26.0-jre</version>
  <!-- or, for Android: -->
  <version>26.0-android</version>
</dependency>
```
* Với gradle:
```
dependencies {
  compile 'com.google.guava:guava:26.0-jre'
  // or, for Android:
  api 'com.google.guava:guava:26.0-android'
}
```
Ngôn ngữ của mỗi quốc gia đều được mã hóa bằng bộ mã chuẩn quốc tế Unicode, kể cả những bộ chữ cái tượng hình phức tạp như tiếng Trung Quốc, tiếng Nhật, tiếng Hàn... tham khảo tại đây [https://en.wikipedia.org/wiki/List_of_Unicode_characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters)
Ví dụ như tiếng Nhật có tới 3 bảng chữ cái là Kanji, Hiragana, Katakana, trong bảng mã unicode chúng ta xác định được range của 3 khối ký tự đó lần lượt là U+30A0..U+30FF, U+3040..U+309F , U+4E00..U+9FAF và chữ latin basic U+0000..U+007F... Tương tự với các ngôn ngữ khác đều có Unicode block tương ứng.
* LanguageUtils.java
![](https://images.viblo.asia/14cb8e33-b2e5-4ebd-8a1f-b04601977479.png)
* test.java
![](https://images.viblo.asia/cbdef6f8-71fb-4e5a-b546-903f54effd0f.png)
## * Kết quả chạy chương trình:
![](https://images.viblo.asia/a1bfcdf6-e423-46b3-930b-40b970c4b8c1.png)

## Kết luận
Với việc xác định các khối Unicode của mỗi ngôn ngữ, chúng ta có thể phát hiện loại ngôn ngữ nào đang được viết trong văn bản.
## Tài liệu tham khảo
1. http://unicode.org
2. http://www.joelonsoftware.com/articles/Unicode.html
3. https://en.wikipedia.org/wiki/UTF-8
4. https://en.wikipedia.org/wiki/Katakana_(Unicode_block)
5. https://en.wikipedia.org/wiki/Hiragana_(Unicode_block)
6. https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)
7. https://en.wikipedia.org/wiki/List_of_Unicode_characters