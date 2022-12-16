Swift là một ngôn ngữ lập trình mạnh mẽ với cú pháp linh hoạt, dễ tiếp cận. Swift có một đặc điểm rất nổi trội đó là việc hỗ trợ Error Handling được tích hợp ngay trong chính nó.

So với Objective-C, Swift chặt chẽ hơn trong việc xử lý lỗi, chính vì thế mà việc bỏ sót lỗi sẽ ít xảy ra hơn. Cú pháp xử lý lỗi trong Swift cũng rõ ràng hơn: sử dụng từ khoá **try** để biểu thị rằng một method có thể gây ra lỗi. Để bắt được và xử lý lỗi đó, method cần được đặt trong câu lệnh **do - catch**.

```
do {
    // Initialize Data With Contents of URL
    let data = try NSData(contentsOfURL: URL, options: [])

    ...

} catch {
    // Error Handling
    ...
}
```

Tất cả những lỗi xảy ra trong phần **do** sẽ được bắt và xử lý trong phần **catch**. Đó chính là ý nghĩa chính của Error Handling trong Swift.

# try, try? và try!

Swift định nghĩa 03 biến thể cho từ khoá try:
- **try**
- **try?**
- **try!**

## try?
Khi sử dụng từ khoá **try?** và có lỗi xảy ra, lỗi đó sẽ được xử lý bằng cách chuyển thành một giá trị optional. Điều đó có nghĩa là method có thể gây ra lỗi không bắt buộc phải đặt trong câu lệnh **do - catch**.

Nếu method được gọi thất bại, nó sẽ trả về giá trị nil. Ngược lại, nếu thành công, nó sẽ trả về một optional chứa giá trị.

Từ khoá **try?** được sử dụng thường xuyên khi kết hợp với optional binding như ví dụ:
```
if let data = try? NSData(contentsOfURL: URL, options: []) {
    print("Data Loaded")
} else {
    print("Unable to Load Data")
}
```

## try!
Là một biến thể nguy hiểm khi sử dụng, vì khi có lỗi xảy ra, ứng dụng sẽ crash do runtime error. Chính vì vậy, nên hạn chế việc sử dụng **try!** mà thay vào đó hãy thay thế bằng **try** hoặc **try?**.

Tuy nhiên, nếu chắn chắn method không gây ra lỗi runtime error, chúng ta có thể sử dụng từ khoá **try!**.

# Tài liệu tham khảo
https://cocoacasts.com/what-is-the-difference-between-try-try-and-try