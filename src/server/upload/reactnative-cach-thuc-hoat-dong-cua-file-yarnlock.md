![](https://www.robertcooper.me/static/5b851c1ea6071309c6a5962f5ab70daa/2e8fb/banner.webp)

Mục đích của bài viết này là giải thích chức năng của file yarn.lock cũng như cách cập nhật dependecy với yarn. Rất nhiều người xem nó như một sự phiền toái khi có thêm file bổ xung vào project của mình và nó thường xuất hiện trong file code review mỗi khi 1 dependecy nào đó được thay đổi (đôi khi file thay đôỉ có thể khá lớn). Mặc dù khá khó chịu nhưng nó là một file quan trọng cần có nó làm việc theo team hoặc làm việc một mình với circle CI

### Cách hoạt động của lock file
Khi sử dụng yarn để quản lý npm dependecies, một file yarn.lock sẽ tự động được tạo ra. Ngoài ra bất cứ khi nào một dependecy nào được thêm hay bị xoá đi hoặc sửa đổi với yarn CLI (ví dụ chạy lệnh ***yarn install***) thì file yarn.lock cũng sẽ tự động được update 

Chú ý: Nếu dependency được thay đổi bằng cơm trong file pack.json, thì yarn sẽ update trong yarn.lock vào lần sau khi CLI yarn được sử dụng để cài hay cập nhật các dependecy. Vì vậy khi thay đổi trong file package.json, hay chắc chắn bạn phải chạy lệnh yarn install để update file yarn.lock

Mục đích của lock file là khoá cứng version của các dependecy được chỉ định trong file package.json. Điều đó có nghiã là trong yarn.lock file, có một định danh cho mọi dependecy và sub dependecy khi sử dụng project. Ý là định danh là một khối trong yarn.lock miêu tả chính xác version được cài đặt dependecy. Nó sẽ có định dạng như sau 


```json
react@16.8.3:
    version "16.8.3"
    resolved "https://registry.yarnpkg.com/react/-/react-16.8.3.tgz#c6f988a2ce895375de216edcfaedd6b9a76451d9"
    integrity sha512-3UoSIsEq8yTJuSu0luO1QQWYbgGEILm+eJl2QN/VLDi7hL+EN18M3q3oVZwmVzzBJ3DkM7RMdRwBmZZ+b4IzSA==
    dependencies:
    loose-envify "^1.1.0"
    object-assign "^4.1.1"
    prop-types "^15.6.2"
    scheduler "^0.13.3"
```

Đoạn mã định danh ở trên trong file yarn.lock miêu tả chi tiết rằng react version là 16.8.3 đã được cài đặt, và nó cung câos cho URL đăng kí nơi package có thể được cài đặt, và một hàm integrity hash (để chắc chắn rằng dependecy file không bị thay đổi) và list sub dependecies ( dependecy trong dependecy). Nhìn sâu hơn trong file yarn.lock ta sẽ thấy nó định danh cho cả sub dependencies. Ví dụ đây là một định danh khác cho object-assgin sub-dependecy

```json
object-assign@^4.1.1: version "4.1.1"
    resolved "https://registry.yarnpkg.com/object-assign/-/object-assign-4.1.1.tgz#2109adc7965887cfc05cbbd442cac8bfbb360863"
    integrity sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM=
```
    
Vậy lợi ích của việc khoá phiên bản dependecy là gì? Nếu dependency version không được khoá , sau đó tại mọi thời điểm các dependency được cài đặt bởi yarn install, các phụ thuộc được lấy có thể khác nhau, Nếu một trong số các dependency có một new version và phiên bản đó nằm trong range của package.json, thì dependency mới nhất sẽ được cài đặt

Chú ý: Nếu thấy phức tạp để nhớ và khó để nắm bắt cách hoạt động của version range. Có một tính toán online giúp ta có cái nhìn trực quan các package cho range version 

Để làm một ví dụ hay lấy một dependency được cài đặt trong package.json
```json
"dependencies": {
    "lodash": "^3.9.1"
}
```

Giả sử phiên bản hiện tại của lodash là 3.9.1, sau đó ái đó đã cài đặt dependecies với yarn install, họ sẽ nhận phiên bản 3.9.1 được cài

Bây giờ , giả sử loadash có một version mới là 3.9.2 và một nguời khác chạy run install cho package.json được show ở trên. Người đó sẽ nhận được version 3.9.2 của lodash bởi vì phạm vi version được chỉ định trong package version file là ^3.9.1 .  Bây giờ có 2 phiên bản lodash khác nhau được cài đặt là 3.9.1 và 3.9.2, mặc dù tất cả code trong repo là như nhau.  Bạn có thể thấy điều này có thể gây ra các vấn đề là cùng 1 app có thể chạy khác nhau trên 2 máy tính riêng biệt

Nào bây giờ xem lại kich bản trên nhưng yarn.lock được sử dụng để khoá các phiên bản dependency, khi ai đó cài đặt dependency, họ sẽ kết thúc theo entry với yarn.lock file 

```json
lodash@^3.9.1:
    version "3.9.1"
    ...
```

Bây giờ, gỉa sử rằng yarn.lock file được commited trong source control, ai đó có thể pull code trên về máy và chạy yarn install. Bất kể phiên bản hiện tại của lodash là gì thì phiên bản được cài đặt vẫn là 3.9.1 bởi vì nó đã được chỉ định trong yarn.lock file

## How to upgrade dependencies
Bây giờ gắn ví dụ dưới đây theo một dependencies trong package.json 
```json 
"dependencies": {
    "lodash": "^3.9.1"
}
```

Nhớ rằng yarn.lock file sẽ khoá version của lodash trong ví dụ ở đây là 3.9.1 

```json 
lodash@^3.9.1:
    version "3.9.1"
    ...
```

Bây giờ, ai đó sẽ bị nhầm lẫn về lý do tại sao chúng ta chỉ định phạm vi phiên bản trong package.json nế phiên bản được cài đặt luôn giống nhau ngay cả khi phiên bản mới được phát hành. Ví dụ phạm vi của ^3.9.1 nghĩa là nó có thể update những version lớn hơn 3.9.1 và nhỏ hơn 4.0.0 . Dĩ nhiên, nếu version là 3.9.1 được released, 3.9.2 version sẽ không được install nếu version trong lock file vẫn là 3.9.1

Đây là lúc lệnh ***yarn upgrade*** được sử dụng. yarn upgrade cho phép update tất cả các dependecy trong package.json lên version cao nhất trong phạm vi version được ghi trong package.json. Giả sử lock file đang ghi là 3.9.1 mà version hiện tại đã được realese là 3.10.3 , khi chạy yarn upgrade nó sẽ install version 3.10.3 và file yarn.lock file sẽ được thay đổi thành 3.10.3 

```json 
lodash@^3.9.1:
    version "3.10.3"
    ...
```

## Updrading dependency to lastest version 

Để nâng cấp lên version mới nhất bỏ qua phạm vi version trong file package.json ta chỉ cần chạy lệnh ***yarn upgrade --lastest***, giả sử phiên bản lodash 4.17.14 được release thì nó sẽ được install về máy, lúc này lock file cũng sẽ được cập nhật thành 4.17.14 

```json 
lodash@^4.17.14:
    version "4.17.14"
    ...
```
yarn cũng sẽ tự động update file package.json thành 

```json 
"dependencies": {
    "lodash": "^4.17.14"
}
```
## Interactive upgrade 
Với một repository có nhiều dependencies, có thể rất hữu ích để xem list dependecies có sẵn có thể upgrade . Chạy yarn ***upgrade-interactive --lastest*** sẽ hiện list tất cả dependencies có thể được cập nhật. Dependencies trong list có thể được chọn và update đến version cao nhất
Dưới đây bạn có thể trông thấy khi ta chạy yarn ***upgrade-interactive --lastest*** 
![](https://www.robertcooper.me/static/b6a8a925802bb63b62a6aa5af29c69cb/17b9f/yarn-upgrade-interactive.png)
Cái này khá hữu ích, ta có thể xem chi tiết từng dependency có thể nâng cấp và cảnh báo về việc thay đổi 

> REFER : https://www.robertcooper.me/how-yarn-lock-files-work-and-upgrading-dependencies