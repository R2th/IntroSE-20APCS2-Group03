**Biểu thức chính quy** (hay **regex**) là một kỹ thuật xử lý chuỗi nâng cao thông qua một hoặc nhiều chuỗi các ký tự được sắp xếp một cách đặc biệt dựa trên một bộ các quy tắc của **biểu thức chính quy**(**regex**).

**Regex** ban đầu khá khó tiếp cận, mọi người sẽ mất kha khá thời gian để nhớ cũng như làm quen với các quy tắc của nó, nhưng nó sẽ trở thành một công cụ cực kỳ mạnh mẽ khi các bạn sử dụng nó một các chính xác.

Vậy nên, trong bài viết này mình đã quyết định tạo ra một sery để chia sẻ với các bạn sẽ các **regex** hay dùng. Trong bài viết đầu tiên này, mình sẽ giới thiệu cho các bạn 10 biểu thức đầu tiên trong series này nhé

## 1. Kiểm tra địa chỉ email
```
^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$
```

Kiểm tra địa chỉ email là một trong những tác vụ phổ biến nhất khi phát triển phần mềm.

## 2. Xác thực ngày có định dạng (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY)
```
/^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/
```


## 3. Độ mạnh của mật khẩu
```
/^.*(?=.{6,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
```

**Regex** ở trên sẽ bắt buộc một chuỗi phải:
* chứa một ký tự thường, một ký tự viết hoa, một số, một ký tự đặc biệt trong số: `!@#$%^&?`
* một ký tự viết hoa
* một số
* một ký tự đặc biệt trong số: `!@#$%^&?`
* dài ít nhất 6 ký tự

## 4. kiểm tra mã màu Hex
```
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/
```

## 5. kiểm tra url
```
/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
```

## 6. Địa chỉ ip4
```
/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
```

## 7. Địa chỉ ip6
```
(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))
```

## 9. Nếu một chuỗi được viết dưới dạng một thẻ html
```
<\/?[\w\s]*>|<.+[\W]>
```

## 10. Tìm các chữ bị lặp
```
(\b\w+\b)(?=.*\b\1\b)
```