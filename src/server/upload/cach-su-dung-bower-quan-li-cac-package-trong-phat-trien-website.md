# Bower là gì?
Bower là công cụ quản lí các nguồn tài nguyên cho lập trình viên fornt-end. Tài nguyên như là: HTML, CSS, JS, font chữ và hình ảnh. Công cụ được phát triển bởi Twitter.
# Tại sao lại dùng Bower?
Theo như cách truyền thống, khi cần sử dụng một số thư viện nào đó, lập trình viên lên mạng tìm kiếm những thư viện đó rồi tải về, sau đó lại copy những thư viện cần dùng vào project mình đang làm. Khi nào cần update thư viện đang dùng trong project lên phiên bản mới hơn thì lại phải lên mạng tìm kiếm -> tải về ->xóa thư viện cũ -> copy thư viện mới vào project. Hơn nữa, khi làm việc nhóm và sử dụng git để quản lí, khi bạn up source code của bạn lên git và kèm theo trong đó là những thư viện bạn đang sử dụng. Số lượng file đẩy lên git có thể lên tới hàng trăm đến hàng nghìn file. Và Leader team bạn ngồi check từng file để merge pull request của bạn. Điều đó là "thảm họa". Đó là lúc bạn cần sử dụng Bower. Khi sử dụng Bower bạn có thể download những thư viện mà bạn cần sử dụng trong project và có thể update lên phiên bản mới nhất mà không cần xóa thư viện phiên bản cũ đi và tải lại.
# Cách cài đặt Bower
Để có thể cài đặt và sử dụng Bower, đầu tiên bạn cần phải cài đặt node, npm, git.

Ở đây, mình sẽ hướng dẫn cách cài trên Ubuntu, còn trên Windows và Mac, mọi người có thể tìm trên google.

**Cách cài đặt node, npm:**

* Add Node.js PPA
    *  `$ sudo apt-get install curl`
    *  `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`
* Install Node.js
    * `$ sudo apt-get install nodejs`
* Check Node.js, NPM version
    * `node -v
    * `npm -v`

**Git ở trên Ubuntu đã có sẵn, vì vậy mọi người sẽ không cần cài đặt.**

**Cài đặt Bower:**

Chạy câu lệnh sau: `$ npm install -g bower`. `-g` Có nghĩa là bạn có thể sử dụng Bower bất kỳ project nào trên máy tính của bạn.

# Cách sử dụng Bower
Vào thực mục chứa project của bạn, mở command line lên và chạy câu lệnh sau:
`$ bower init`. Bạn chỉ cần ấn `enter` và `yes` cho nhanh =))))). Mục đích là để tạo file `bower.json` trong thư mục chứa project của bạn. File này sẽ chưa thông tin những thư viện bạn đã cài. Những thông tin này nằm ở thuộc tính `dependencies`. Vị dụ file `bower.json` của mình:

 ![](https://images.viblo.asia/43315919-11e1-46cc-b1e2-f0a882d03b6a.png)
 
Tiếp theo bạn cần tạo một thư mục `.bowerrc` cùng cấp với thư mực `bower.json`. Thư mục này có tác dụng config đường dẫn nơi mà các bạn tải các thư viên về. File `.bowerrc` sẽ có dạng như sau:

![](https://images.viblo.asia/c974126a-94b3-4d94-9a5c-2ed248edec75.png)

Cuối cùng, thêm vào file `.gitignore` dòng sau:

![](https://images.viblo.asia/67009852-eb78-4b0f-b027-96b3449b6a71.png)

**Cách tải các thư viện:**
Để tải các thư viện, bạn sử dụng câu lệnh sau:

![](https://images.viblo.asia/32852445-9c0e-4607-b765-a01a717320e7.png)

**Cách gỡ các thư viện:**
Để gỡ những thư viện bạn sử dụng câu lệnh sau:

![](https://images.viblo.asia/1626d1dc-2a46-48f0-9d9d-a68ba0689c26.png)

**Cách update các thư viện:**
Để update những thư viện bạn sử dụng câu lệnh sau:

![](https://images.viblo.asia/f62f14c4-4710-42a5-89ca-ef8c168d8f96.png)

**Ví dụ:** Mình muốn tải thư viên Jquery cho project của mình.

1. Tải thư viện Jquery bằng câu lệnh sau: `$ bower install jquery --save`
2. Khi đó trong thư mục mà đã config trong thư mực `.bowerrc` sẽ có thư mục jquey. Cụ thể các thư viện mình tải về sẽ được lưu trong:` public/bower_components/`

![](https://images.viblo.asia/ac1f9841-ce89-4bb7-aef5-1f9e798062e9.png)

# Cách tự tạo một package riêng cho bản
Trong trường hợp, bạn không thể tìm thấy package mà mình cần trên `https://bower.io/search/`. Bạn có thể tự tạo một package riêng cho mình bằng cách sau:

1. Đầu tiên bạn vào github cả nhân của bạn, tạo một repository mới:

![](https://images.viblo.asia/6414b141-7925-49f9-8daf-ca6131003209.png)

Bấm vào nút `new`, sau đó đặt tên repository của mình và bấm vào nút `Create repository`

![](https://images.viblo.asia/c76c5c01-70e0-4393-9066-af87e3bb8d93.png)

Sau đó tạo một file `README.md`, viết cái gì vào cũng được. `Repository` sẽ có dạng như sau:

![](https://images.viblo.asia/750a718c-b968-4b6a-b4c1-e34aa8814b52.png)

2. Tiếp theo bạn `clone` `repository` này về local bằng câu lệnh `git clone`. Bạn truy cập vào thư mục `git` sau khi bạn `clone` về. Tại thư mục đó bạn copy package bạn đã tải về vào thư mục này và đẩy lên `git`.
3. Tiếp theo copy link github `repository`:

![](https://images.viblo.asia/80bdb1f4-a8c7-4d9b-88e8-4bd5675442af.png)

4. Và chạy câu lệnh sau trên command line: `bower register bower-package https://github.com/ducls-0951/bower-package.git`, `bower-package` là tên package mình đặt, bạn có thể đặt tên gì cũng được, phía sau là link `github repostory` của bạn. Sau đó chọn `yes` để đăng ký. Tên `package` có thể trùng hoặc không, nếu trùng bạn đặt tên khác. Đây là ví dụ bị trùng:
![](https://images.viblo.asia/26ac78e0-a706-4bb0-91d4-ec2b2c9fdb68.png)

Còn đây là ví dụ khi thành công:

![](https://images.viblo.asia/2e0f4550-6b73-479a-a4af-07cd3ada0022.png)

5. Sau đó bạn chạy câu lệnh sau: `bower install --save bower-demoo`. `bower-demoo` là tên package bạn đã đăng ký. Package bạn lưu trên github sẽ được tải về và lưu trong thư mục bạn đã config.

**Bài hướng dẫn của mình đến đây là hết. Hẹn các bạn lần sau vào một ngày bị deadline dí.**

**Happy Coding!!!**