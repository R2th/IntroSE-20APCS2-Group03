Chào các bạn!
Việc dấu tài nguyên tĩnh là một việc hết sức cần thiết với các ứng dụng lớn, nó giúp **hạn chế** các thành phần xấu có thể tải toàn bộ tài nguyên tĩnh của bạn khi biết được một thông tin nào đó của tài nguyên. Hãy xem ví dụ sau:

## Tác dụng của việc dấu static Assets

Giả sử bạn có URL cho một ảnh trong album của mình là:

```https://yourdomain.com/static/images/photos/anh_1.jpg"```

Khi đó, tôi có thể viết một scripts tự động cào ảnh, chỉ cần thay "anh_1" bằng "anh_2", .... rất dễ phải không nào. Nhưng nếu bạn chuyển nó thành một URL dạng như thế này:

```https://yourdomain.com/v/t39.1997-6/p280x280/67727248_480337202751909_7014051683109961728_n.png?_nc_cat=101&ccb=1-3&_nc_sid=0572db&_nc_ohc=-U8QkxgJPa8AX82jcrk&_nc_ht=scontent.fhph1-2.fna&tp=30&oh=55a264001ab4fe3ef41a41ad4e6fb1cc&oe=60B5AA93```

Thì rõ ràng tôi không thể biết được liệu trên server của bạn còn có những ảnh nào cả, đúng không nào? Vì thế thì dù có muốn "chôm" các ảnh này tôi cũng đành phải bó tay.

## Cách dấu static Assets ở Facebook

Trong bài viết này mình sẽ bóc mẽ cho các bạn thấy rõ chiêu trò dấu tài nguyên tĩnh của Facebook, và cách mà các bạn có thể áp dụng vào dự án thực tế của mình. Dưới đây là cách mà Facebook đã dùng để bảo mật tài nguyên tĩnh.

Giả sử chúng ta cần truy vấn avatar của user có ID = 123456789, một đường dẫn PUBLIC sẽ được dùng như thế này:

URL1: ```https://graph.facebook.com/123456789/picture?width=100&height=100```

Khi thực hiện lệnh gọi lên URL này, bạn sẽ cần phải cung cấp một ```access_token```, như vậy ta hiểu URL này chỉ dùng được khi bạn đăng nhập facebook, đại khái là nó "chỉ dành cho thành viên". Ta lưu ý rằng request này luôn trả về HEADER không cho phép cache, có nghĩa là bất cứ khi nào thực hiện lệnh gọi này, đều fetch dữ liệu mới nhất của avatar. Vậy thì cache được thực hiện ở đâu?

Vẫn là lệnh gọi trên, lúc này server sẽ thực hiện truy vấn lên dữ liệu user để lấy thông tin của user có ID = 123456789, giả sử được như sau:
```
{
    id: "123456789",
    name: "Cong Nguyen",
    last_update_avatar: 1620005362126,
    ...
}
```

Tiếp theo, sử dụng một thuật toán mã hóa nào đó, để mã hóa chuỗi ```"123456789"``` thành một chuỗi tương ứng, giả sử là ```"AeTeN96AxgKxECdVleg"```.

Cuối cùng, redirect về một URL mới như sau:

URL2: ```https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=123456789&height=50&width=50&ext=1620005362126&hash=AeTeN96AxgKxECdVleg```

Đây là một URL bảo mật, vì cho dù chúng ta có biết psid (tức là ID của user), thì chúng ta cũng không thể nào biết được URL của avatar trên, vì chuỗi mã hóa ```hash=AeTeN96AxgKxECdVleg``` được sinh ra phía server nên có ngồi đoán cả ngày cũng không ra được. :D

Lưu ý rằng chúng ta sẽ thực hiện cache ở URL mới này, nên khi redirect từ URL1 sang URL2, chúng ta sẽ set một số thông tin cho HEADER, chẳng hạn như ```last_modify``` hay ```etag``` để check expires.

Có một thông tin khá hay ở URL2 này, đó là nó không yêu cầu Auth, lý do là vì khi redirect từ URL1 sang thì thông tin auth ở url cũ đã mất, mà cũng không cần phải auth vì không thể nào đoán được URL2 dựa trên ID của user, nên việc auth là thừa.

Bạn có thể thắc mắc là nếu khi biết URL2 rồi, tôi có thể lưu lại và sử dụng nó vĩnh viễn không? câu trả lời là KHÔNG, vì bạn thấy đấy, trong URL2 có đoạn ```ext=1620005362126```, đoạn này cho biết lúc nào thì URL này sẽ bị hết hạn và không sử dụng được nữa.

## Một ví dụ thực tế đơn giản

Giả sử chúng ta có một tập hợp ảnh tĩnh:

```
1.jpg, 2.jpg, 3.jpg, ...
```

Ta sẽ sử dụng một thuật toán để mã hóa dữ đường dẫn khi copy các ảnh này lên server, lưu ý rằng đừng bao giờ copy nguyên bản ảnh như trên lên server, vì lý do đã trình bày ở đầu bài viết.

Thuật toán này có dạng như sau:

```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
 // filename: copyImages.js

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const recursive = require('recursive-readdir');
const { readdirSync } = require('fs');

function isExist(src) {
    return fs.existsSync(src);
}

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

function h(b, c) {
    var d = unescape(encodeURIComponent(b));
    for (var e = 0; e < d.length; e++)
        c = (c << 5) - c + b.charCodeAt(e),
            c &= 4294967295;
    return (c & 255).toString(16)
}

function getEncodeFolderName(a, c, d) {
    var f = 1 + "/" + c + "/" + a + ".png";
    a = h(f, 317426846);
    return d + a + "/" + f;
}

let fromDir;
let toDir;
let folderPrefix;

process.argv.slice(2).map( (element, index) => {
    if (index === 0) {
        fromDir = element;
    } else if (index === 1) {
        toDir = element;
    } else if (index === 2) {
        folderPrefix = element;
    }
});

if (!isExist(fromDir)) {
    console.error(chalk.red(`Source folder is not exist: ${fromDir}`));
    return;
}

if (!toDir || toDir.length === 0) {
    console.error(chalk.red(`Target folder is undefined.`));
    return;
}

console.log(`Start copy from: ${fromDir} to ${toDir}`);

const dirs = getDirectories(fromDir);

if (dirs && dirs.length > 0) {
    dirs.map((dir) => {
        const _currentDir = path.resolve(path.join(fromDir, dir));
        recursive(_currentDir, (err, files) => {
            if (files && files.length > 0) {
                files.map((file) => {
                    const fileName = path.parse(file).name;
                    const encodeFolderName = getEncodeFolderName(fileName, dir, folderPrefix || "t");
                    fs.copySync(file, path.join(toDir, encodeFolderName));
                });
            }
        });
    });
}
```

> Thực hiện thuật toán này bằng lệnh: ```node copyImages.js FROM_FOLDER TO_FOLDER```

Thuật toán này sẽ đảm bảo khi file ```1.jpg``` được copy lên server, nó sẽ được lưu ở vị trí đại loại như: 
```/t18/1.jpg```

Trong đó ```t18``` là một chuỗi được mã hóa từ tên file ```1.jpg```. Vì vậy khi cần tìm nó, bạn chỉ cần sử dụng thuật toán mã hóa trên để tìm ra URL của nó là xong.

## Kết luận

Hi vọng qua bài này, bạn đã hiểu được tầm quan trọng của việc dấu tài nguyên tĩnh và cũng học được cách làm thế nào để dấu nó và áp dụng vào các dự án của mình.
Chào thân ái!