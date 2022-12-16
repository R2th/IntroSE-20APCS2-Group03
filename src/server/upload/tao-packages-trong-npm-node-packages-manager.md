![](https://images.viblo.asia/f40a8047-048f-4821-9f27-b90839d6594a.jpg)
Bạn đã bao giờ search "How to publish packages to npm" chưa?. Mình thì hay search thế này hơn "How to install common packages for NodeJs?" vì đơn giản là muốn sử dụng những thứ đã có chứ không nghĩ đến chuyện sẽ tạo ra một `package` riêng cho bản thân sử dụng. Vậy nay ta sẽ cùng tìm hiểu cách để tạo ra một package cho đỡ chán nào :)).

First blood, 2 bước nhỏ:
1. tạo package (gói)
2. publish (xuất bản) package của bạn

Ở đây có thể hiểu là xuất bản vô npm để có thể sử dụng. Ta bắt đầu bước đầu tiên nào.

## 1. Tạo phiên bản đầu tiên

Nếu bạn chưa từng `publish` một package nào thì hãy đọc tiếp nhé! à mà nếu từng "publish" rồi chắc không phải đọc bài post này làm gì :v

Đầu tiên, bạn cần 1 acc npm. vô link này nhé! https://www.npmjs.com/signup

Tiếp, login vào thôi :) (*nhớ cài npm vào ạ [here](https://nodejs.org/en/))

```
npm login
```

Sau đó thì  nhập username, password với email nhé

![](https://images.viblo.asia/eb316943-314d-4450-b5ce-3bd816804d1c.png)
Tiếp đến, ta bắt đầu bước quan trọng nhất - tạo package. tạo một folder trước
```

mkdir folder_name

cd folder_name

npm init // khởi tạo project
```

Ta sẽ có 1 file package.json, file này đã gồm các thứ cần thiết để "publish" project của bạn rồi

## 2. Publish package
```
npm publish
```

Nếu package đã tồn tại rồi (vì packages của bạn trung tên với 1 package khác trong npm) thì sẽ không thể `publish` nó nữa => tạo các khác nhé! À mà thôi đổi tên cái là được :), vô file packages.json đổi tên khác là ok ngay


Sau khi đổi lại tên rồi publish thì sẽ như này
![](https://images.viblo.asia/b9c5a196-5171-416c-8c8a-c381a9e324cf.png)

Đến đây thì mọi thẻ có vẻ vẫn khá dễ :)). Vậy nên ta sẽ tìm 1 case nào đó khó hơn nhé!

Nếu tất cả mấy cái tên bạn đặt đều bị trùng thì ... làm gì giờ?

Đừng lo, đó 1 lỗi mà nhiều người gặp phải khi tạo các packages trong npm, yên tâm là bạn không cô đơn :v

Để giải quyết vấn đề trên, npm cho phép bạn "publish" tới 1 phạm vi nào đó. Có nghĩa là "publish" dưới tên người dùng của riêng bạn. Như vậy thì vấn đề đặt tên đã được giải quyết.

Các bước thực hiện:
1. thay đổi tên thành @username/package-name
2. Run `npm init --scope=username`

Nếu repo của bạn bị giới hạn, bạn nên làm như sau:

`npm publish --access publish`

Vậy là ta đã publish thành công 1 `package` để sử dụng trong npm

source: [ahihi.org](https://medium.com/free-code-camp/how-to-publish-packages-to-npm-the-way-the-industry-does-things-2077ec34d7e8)

Chúc các bạn một ngày làm việc hiệu quả