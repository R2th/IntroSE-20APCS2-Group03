Typescript là một ngôn ngữ mã nguồn mở được xây dựng trên Javascript và phát triển dưới thời Anders Hejlsberg, người cũng dẫn đầu việc tạo ra ngôn ngữ C#. TypeScript được phát hành lần đầu tiên vào tháng 10 năm 2012.
## 1. Tại sao nên học và sử dụng Typescript?
Trong vài năm trở lại đây javascript đang phát triển vượt bậc khi không chỉ còn là một ngôn ngữ phát triển cho client(vd: Angula, React, VueJs...) mà nó có thể sử dụng để phát triển server(vd: express, nestjs... ). Nhưng javascript là một ngôn ngữ lập trình động bất đồng bộ và không có hệ thống kiểu như C# hay Java, nên nó không thực sự được ưa chuộng để phát triển các ứng dụng lớn. Hệ thống kiểu giúp tăng chất lượng của code hơn, dễ đọc và quan trọng là dễ duy trì, phát triển và cấu trúc lại code hơn. Khi một ngôn ngữ có hệ thống kiểu, lỗi có thể được phát hiện ngay tại thời điểm biên dịch chứ chưa cần đến thời gian chạy code để phát hiện ra lỗi. Nếu không có hệ thống kiểu rất khó sử dụng javascript để mở rộng, xây dựng những hệ thống lớn.
Typescript hỗi trợ sử dụng hệ thống kiểu, interface, abstract, implement, override... và hầu hết các tính chất của hướng đối tượng. Do đó theo tôi nghĩ typescript trong tương lai còn được phát triển nhiều hơn nữa, nên nó cũng là một ngôn ngữ đáng học và sẽ được sử dụng nhiều.
## 2. Làm thế nào để sử dụng Typescript?
Typescript được việt trong file .ts và sau đó được biên dịch thành javascript bằng trình biên dịch Typescript. Nếu các bạn đã cài nodejs thì run 
`npm install -g typescript` 
để cài đặt typescript. Sau đó sử dụng lệnh  
`tsc -v` 
để check version.
Trước khi bắt đầu học typescript tôi nghĩ các bạn nên tìm hiểu trước về javascript và es6.
## 3. Một ví dụ nho nhỏ với Typescript.
Trong typescript khi khai báo biến các bạn có thể khai báo luôn kiểu giữ liệu của biển hay function trả về ví dụ tôi tạo một file *test.ts* có bao gồm đoạn code sau:
```
function addNumbers(a: number, b: number): number 
{ 
    return a + b; 
} 
var sum: number = addNumbers(10,15) 
console.log('Sum of the two numbers is: ' +sum);
```
Trong function *addNumbers* bạn không thể thêm 1 tham số là *string* khi gọi funtion đó được mà phải chuyền vào 2 tham số có kiểu là *number*.
Để compile typescript sang javascript thuần bạn sử dụng cú pháp:
`tsc + filename.ts` 
Như trong ví dụ của tôi sẽ là:
`tsc test.ts`
Trình biên dịch sẽ tạo cho bạn 1 file js vừa biên dịch từ typescript sang javascript như trong ảnh dưới đây:

![](https://images.viblo.asia/db540fc2-e836-46e4-b26d-f91feede5dc0.png)

Bây giờ hãy thử gọi lại function trên với 1 tham số là string *addNumbers(10, "string")* :

![](https://images.viblo.asia/6e279d32-85d3-4a04-9b93-c9188558782e.png)

Khi biên dịch đã xảy ra lỗi, trình biên dịch thông báo rằng đối số kiểu *string* không thể gán cho kiểu *number*. Đó là sự chặt chẽ trong khai báo của Typescript.
## 4. Lời kết
Trên đây tôi đã giới thiệu qua cho các bạn về typescript, ưu điểm và làm một ví dụ nhỏ nhỏ về hệ thống kiểu dữ liệu trong typescript. Để tìm hiểu sâu và học nhiều hơn nữa các bạn có thể tìm kiếm trên mạng hoặc vào trang chủ để tìm hiểu thêm về Typescript https://www.typescriptlang.org/docs. 
Nếu có góp ý gì vui lòng comment dưới bài viết của tôi, cảm ơn các bạn đã đọc bài viết này.