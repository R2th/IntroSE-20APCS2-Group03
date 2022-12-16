# 1. Regular Expression là gì?
Regular Expression hay còn gọi là biểu thức chính quy được dùng để xử lý chuỗi nâng cao thông qua biểu thức riêng của nó, những biểu thức này sẽ có những nguyên tắc riêng và bạn phải tuân theo nguyên tắc đó thì biểu thức của bạn mới hoạt động được. Ngoài cái tên gọi Regular Expression ra thì nó còn có thể viết tắt thành RegEx.

Nguyên tắc hoạt động của biểu thức RegEx là so khớp dựa vào khuôn mẫu, khuôn mẫu được xây dựng từ các quy tắc căn bản của biểu thức RegEx. Và để các bạn nắm rõ regular expression là gì thì tôi sẽ giới thiệu một hàm xử lý Regular Expression trong php đó là hàm preg_match, sau đó đưa ra một vài ví dụ nhỏ để các bạn thực hành trước khi tìm hiểu các phần nâng cao hơn.

## 2. Hàm Preg_match trong php
Để hiểu rõ hơn hàm này thì bạn đọc bài hàm preg_match trong PHP nhé.

Cú pháp: preg_match($pattern, $subject, $matches)

Hàm này có tổng cộng 5 tham số nhưng ở đây tôi chỉ đưa ra 3 tham số quan trọng nhất và thường hay sử dụng:

**$pattern** là chuỗi Regular Expression Pattern
**$subject** là chuỗi nguồn mà chúng ta muốn so khớp với **$pattern**
**$matches** là danh sách kết quả trả về đúng khi so khớp **$pattern** và **$subject**
Sau đây là một số ví dụ về Regular Expression, bạn có thể xem và làm theo chứ không nhất thiết phải hiểu nó 100% vì mục đích tôi muốn các bạn hiểu được ý nghĩa của  nó.

## Kiểm tra một chuỗi là số

```
if (preg_match('/^[0-9]+$/', '123', $maches)){
    var_dump($maches);
}
```

Kết quả:

```
array
  0 => string '123' (length=3)
```
  
  
## Kiểm tra một chuỗi là các ký tự thường

```
if (preg_match('/^[a-z]+$/', 'thehalfheart', $maches)){
    var_dump($maches);
}    
```

Kết quả:

```
array
  0 => string 'thehalfheart' (length=12)
```
Như vậy chuỗi thehalfheart đã được so khớp vỡi pattern /^[a-z]+$/

## Kiểm tra một chuỗi là các ký tự hoa

```
if (preg_match('/^[A-Z]+$/', 'THEHALFHEART', $maches)){
    var_dump($maches);
}
```

Kết quả:

```
array
  0 => string 'THEHALFHEART' (length=12)
```

Như vậy chuỗi THEHALFHEART đã được khớp với pattern /^[A-Z]+$/

# 3. Lời Kết
Như vậy là bạn đã tìm hiểu xong khái niệm Regular Expression là gì và biết được một thuật ngữ khác đó là biểu thức chính quy nên nếu có ai hỏi thì trả lời thực chất cả hai khái niệm là một nhé.

Qua ba ví dụ trên bạn phải hiểu được Regular Expression sử dụng những biểu thức và nguyên tắc riêng để đưa ra khuôn so sánh và những biểu thức đó có thể mô tả bằng ngôn ngữ bình thường được.