**NPM**, Node Package Manager, là trình quản lý gói cho ngôn ngữ lập trình JavaScript. Bất kỳ nhà phát triển nào đang làm việc với Javascript đều đã sử dụng công cụ CLI tuyệt vời này để cài đặt các dependencies cho dự án của họ.

Trong bài viết này, tôi sẽ chia sẻ các mẹo và thủ thuật với NPM có thể tăng năng suất của bạn và cho phép bạn sử dụng NPM một cách thông minh và hiệu quả hơn.

## 1. Initialize your package

Chúng ta có thể chạy lệnh `npm init` để khởi tạo gói của mình nhưng nó sẽ hỏi thông tin về gói, tác giả, v.v. Có một cách khác để tự động tạo `package.json` bằng lệnh `npm init -y`.

```
npm init -y
```

Chúng ta cũng có thể thiết lập một số cấu hình init mặc định như chi tiết về tác giả, v.v. Hãy cấu hình bằng cách sử dụng lệnh `npm config`.

```
npm config set init-author-name "Bilaka Jain"
npm config set init-author-email "bilakajain@gmail.com"
```

Và hãy chạy lệnh `npm init -y` để khởi tạo package

```
{
  "name": "<name of the root dir>",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Bilaka Jain <bilakajain@gmail.com>",
  "license": "ISC"
}
```

Chúng ta cũng có thể mở rộng chức năng của `npm init` bằng cách thêm tệp javascript tùy chỉnh của riêng mình và cấu hình lại bằng `npm config`

```
npm config set init-module <path-of-the-custom-file>
```

## 2. Install a package from other sources

NPM CLI cũng cho phép cài đặt các gói javascript từ các nguồn khác như Bit, repo GitHub, Bitbucket và gist.

```
# Install a component from Bit (set Bit as a scoped registry)
npm config set @bit:registry https://node.bit.dev
npm i @bit/username.collection.component

# Install from tarball stored locally
npm i ./local-tarball-package.tgz

# Install tarball package from internet
npm i https://abc/xyz/package.tar.gz

# Install from github repo
npm i githubuser/reponame

# Install from bitbucket repo
npm i bitbucket:bitbucketuser/reponame

# Install from gist
npm i gist:gistID
```

Ví dụ: Cài đặt Button component từ Bit

Tôi đang tìm kiếm một Button component mà một trong những đồng nghiệp của tôi đã xuất bản cho bộ sưu tập thành phần của chúng tôi trên Bit.

Tôi sẽ bắt đầu bằng cách chỉ định cấu hình Bit dưới dạng scoped registry:

```
npm config set @bit:registry https://node.bit.dev
```

Sau đó, tôi sẽ đi đến bộ sưu tập của team tôi để tìm button:

![](https://images.viblo.asia/904b2063-e464-4f11-a3c5-b5eda0729eeb.png)

Sau đó vào Button component và copy câu lệnh:
![](https://images.viblo.asia/89a31c4f-ed05-4583-b71f-b781f6cf137d.png)

```
npm i @bit/the_a-team.imperfect-components.button

```

## 3. Clean install your package dependencies

Chúng ta có thể chạy `npm ci` để cài đặt các gói phụ thuộc. Nó thường được sử dụng trong các môi trường tự động như nền tảng CI / CD

```
npm ci
```

Nó khác với `npm install` :
* Nó cài đặt phiên bản chính xác của gói được đề cập trong tệp package-lock.json.
* Loại bỏ node_modules hiện có và chạy cài đặt mới.
* Nó sẽ không viết vào package.json và lock file.
* Nó không cài đặt các gói riêng lẻ tương tự như `npm install`.

## 4. Use shortcuts to install packages

Đây là tính năng hữu ích mà chúng ta có thể sử dụng để tiết kiệm thời gian trong khi cài đặt các gói

```
# Install package
npm install <package_name>
Shortcut: npm i <package_name>

# Install devDependencies
npm install --save-dev <package_name>
Shortcut: npm i -D <package_name>

# Install dependencies (This is default)
npm install --save-prod <package_name>
Shortcut: npm i -P <package_name>

# Install packages globally
npm install --global <package_name>
Shortcut: npm i -g <package_name>
```

Cài đặt nhiều gói trong một lệnh

```
npm i express cheerio axios
```

Cài đặt nhiều gói có cùng tiền tố

```
npm i eslint-{plugin-import,plugin-react,loader} express
```

## 5. NPM scripts

NPM scripts là tính năng hữu ích nhất. Nó hỗ trợ các tập lệnh tùy chỉnh pre-defined pre/post hooks (thường được gọi là tập lệnh vòng đời) như:

`preinstall`  - chạy trước khi bất kỳ gói nào được cài đặt.

`npm run env` liệt kê tất cả các biến môi trường npm có trong gói của chúng ta. Nó cũng chứa các thuộc tính gói có tiền tố `npm_package_`.

```
npm run env
```

Output giống vậy
```
npm_config_save_dev=
npm_config_legacy_bundling=
npm_config_dry_run=
npm_config_viewer=man
.
.
npm_package_license=ISC                # Package properties
npm_package_author_name=Ankit Jain
npm_package_name=npm-tips-and-tricks   # Name of our package
```

Chúng ta cũng có thể truy cập các biến env ở trên trong code của mình bằng `process.env.npm_package_name` và các biến khác tương tự

**Tự đặt các biến riêng trong package.json**

Chúng ta có thể chuyển các biến của riêng mình dưới dạng các biến môi trường npm với tiền tố `npm_package_config_` bằng cách xác định chúng trong tệp package.json, trong đối tượng config. Tạo 1 biến `myvariable` sẽ như sau:
```
"config": {
    "myvariable": "Hello World"
},
```

Bây giờ, thì hãy check biến env
```
npm run env | grep npm_package_config_
```

Kết quả
```
npm_package_config_myvariable=Hello World
```

**Define các custom scripts**

Lệnh `npm run` hiển thị tất cả các tập lệnh mà chúng ta đã xác định trong tệp package.json. Hãy thêm một số tập lệnh tùy chỉnh vào package.json của chúng ta

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "echo-hello": "echo \"Hello\"",
    "echo-helloworld": "echo \"Helloworld\"",
    "echo-both": "npm run echo-hello && npm run echo-helloworld",
    "echo-both-in-parallel": "npm run echo-hello & npm run echo-helloworld",
    "echo-packagename": "echo $npm_package_name",
    "echo-myvariable": "echo $npm_package_config_myvariable",
    "echo-passargument": "npm run echo-packagename -- \"hello\"",
    "echo-pipedata": "cat ./package.json | jq .name > package-name.txt"
},
```

Bây giờ, chúng ta có thể thấy tất cả các lệnh được thêm ở trên bằng cách chạy lệnh này

```
npm run
```

Output

```
# npm-tips-and-tricks (name of our package)
Lifecycle scripts included in npm-tips-and-tricks:
  test
    echo "Error: no test specified" && exit 1
  start
    node index.js
available via `npm run-script`:
  echo-hello
    echo "Hello"
  echo-helloworld
    echo "Helloworld"
  echo-both
    npm run echo-hello && npm run echo-helloworld
  echo-both-in-parallel
    npm run echo-hello & npm run echo-helloworld
  echo-packagename
    echo $npm_package_name
  echo-myvariable
    echo $npm_package_config_myvariable
  echo-passargument
    npm run echo-packagename -- "hello"
  echo-pipedata
    cat ./package.json | jq .name > package-name.txt
```

Chạy 1 đoạn script đơn gian

```
npm run echo-hello
# Output
> echo "Hello"
Hello
```

Chạy multiple scripts trong 1 single npm script

Chúng ta có thể chạy nhiều câu lệnh bằng cách sử dụng `&&`. 

```
npm run echo-both
# Output
> npm run echo-hello && npm run echo-helloworld
> npm-tips-and-tricks@1.0.0 echo-hello 
> echo "Hello"
Hello
> npm-tips-and-tricks@1.0.0 echo-helloworld
> echo "Helloworld"
Helloworld
```

Chúng ta cũng có thể chạy song song nhiều tập lệnh bằng cách sử dụng `&`

```
npm run echo-both-in-parallel
# Output
> npm run echo-hello & npm run echo-helloworld
> npm-tips-and-tricks@1.0.0 echo-hello
> echo "Hello"
> npm-tips-and-tricks@1.0.0 echo-helloworld
> echo "Helloworld"
Hello
Helloworld
```

Sử dụng biến môi trường npm trong tập lệnh npm

```
npm run echo-packagename
# Output
> echo $npm_package_name
npm-tips-and-tricks
-------------
npm run echo-myvariable
# Output
> echo $npm_package_config_myvariable
Hello World
```

Truyền đối số cho tập lệnh npm

Chúng ta có thể sử dụng `--` để truyền đối số cho tập lệnh npm. Trong ví dụ dưới đây, chúng ta truyền `hello` như một đối số cho tập lệnh `echo-packagename`

```
npm run echo-passargument
# Output
> npm run echo-packagename -- "hello"
> npm-tips-and-tricks@1.0.0 echo-packagename
> echo $npm_package_name "hello"
npm-tips-and-tricks hello
```

Sử dụng Pipe để truyền dữ liệu từ tập lệnh npm này sang tập lệnh khác

```
npm run echo-pipedata
# Output
> cat ./package.json | jq .name > package-name.txt
# Let's cat package-name.txt
cat package-name.txt
# Output
"npm-tips-and-tricks"

```

## 6. Quickly navigate to package docs

Chúng ta có thể nhanh chóng điều hướng đến tài liệu của bất kỳ gói npm nào bằng cách chạy lệnh này

```
npm docs <package-name>
OR
npm home <package-name>
```

Nếu chúng ta muốn kiểm tra các issue hoặc gửi bất kỳ lỗi nào trong gói npm, chúng ta cũng có thể điều hướng đến trang web bằng cách chạy lệnh này

```
npm bug <package-name>
```

Tương tự, `npm repo <package-name>` mở trang repo GitHub trong trình duyệt

## 7. Removes duplicate packages

Chúng ta có thể loại bỏ các dependencies trùng lặp bằng cách chạy lệnh `npm depupe`. Nó đơn giản hóa cấu trúc tổng thể bằng cách loại bỏ các gói trùng lặp và chia sẻ hiệu quả sự phụ thuộc chung trên nhiều gói phụ thuộc. Nó dẫn đến một cây phẳng và không trùng lặp

```
npm dedupe hoặc npm ddp
```

## 8. Scan your application for vulnerabilities

Chúng ta có thể chạy lệnh `npm audit` để quét dự án của chúng ta xem có lỗ hổng nào trong bất kỳ dependency. Nó tạo ra một đầu ra đẹp mắt ở định dạng bảng (chúng ta cũng có thể nhận đầu ra dạng JSON) , với các gói khác phụ thuộc vào gói này nếu đó là multi-level/multi dependency.

`npm audit fix` tự động cài đặt phiên bản vá (nếu có) của tất cả các gói dễ bị tấn công

```
npm audit fix
```

## 9. Check our environment

Chúng ta có thể sử dụng lệnh `npm doctor` để chạy nhiều kiểm tra trên môi trường của chúng ta, check xem npm CLI của chúng ta có đủ quyền để cài đặt các gói javascript hay không và nó có thể kết nối với sổ đăng ký npm hay không. Nó cũng kiểm tra các phiên bản node và npm, xác nhận bộ đệm cho bất kỳ gói bị hỏng nào.

```
npm doctor
```

![](https://images.viblo.asia/92f510e7-c6d3-485a-a068-a4ea3363ac79.png)

## 10. Check outdated packages

Chúng ta có thể sử dụng lệnh `npm outdated` để kiểm tra tất cả các gói npm đã lỗi thời. Nó cũng hiển thị phiên bản mới nhất sẽ được cài đặt cho bất kỳ gói lỗi thời nào.

```
npm outdated --long or npm outdated -l
```

![](https://images.viblo.asia/8ef64042-7d0a-428d-a04c-a8be1f1ca624.png)

Chúng ta cũng có thể kiểm tra phiên bản mới nhất cho bất kỳ gói npm nào bằng cách chạy lệnh này

```
# Shows the package information
npm view <package-name> or npm v <package-name>

# Shows the latest version only
npm v <package-name> version

# Shows the list of all versions
npm v <package-name> versions
```

## 11.List all the installed packages

Chúng ta có thể liệt kê tất cả các gói npm được cài đặt trong dự án của chúng ta chỉ bằng cách chạy lệnh `npm list`. Nó sẽ tạo ra một cấu trúc cây hiển thị gói đã cài đặt và các phụ thuộc của nó

```
npm list or npm ls 
```

![](https://images.viblo.asia/a406fb34-b496-45b0-8de2-da42b2f7dbd2.png)

Chúng ta có thể dùng thêm tùy chọn `--depth` để giới hạn độ sâu

```
npm ls --depth=1
```

![](https://images.viblo.asia/576bcbb6-90d0-4a39-be45-80cee2f34ef9.png)

Trong bài viết này, tôi đã chia sẻ về một số mẹo và thủ thuật NPM hữu ích mà chúng ta có thể sử dụng để tăng năng suất. Có thể có rất nhiều thủ thuật / mẹo như vậy. Tôi rất thích nghe về chúng trong phần bình luận

Nguồn [https://blog.bitsrc.io/](https://blog.bitsrc.io/)