Trong khi làm dự án, có thể một vài trường hợp thay vì bạn dùng độc lập `repositories` cho BE và FE. Có lúc nào bạn nghĩ có thể để có cùng chung một `repository` hay không. Và cách triển khai chúng ra làm sao. Vậy thì bạn hãy cùng tôi tìm hiểu về 2 khái niệm mới hôm nay nhé.
Như tiêu đề cũng đã đề cập đó là `yarn workspace` và `monolithic repository` (`monorepo`). Để hiểu thêm về nó, hay cũng tôi đi qua từng phần trong bài viết này:

### 1. `Yarn workspaces` là gì ?
`Yarn` là một `package manager` mà trong đó nó có một tính năng được gọi là `Yarn workspace`. `Yarn workspace` để cho bạn tổ chức dự án của mình sử dụng khối repository. Nghĩa là một repository chứa nhiều packages nhỏ khác. Những `package` được cô lập và tồn tại độc lập với một dự án lớn.

### 2. `Monolithic repository (monorepo)` là gì ?
Là cách tổ chức repository thành một khối thay vì bạn phải đi vào từng project vào thực hiện các xử lý một cách độc lập từng project.
Bạn có thể đặt từng `package` vào trong từng project độc lập. Nhưng cách này ảnh hưởng tới việc chia sẻ ( thay vì phải config commitlint, prettier, stylelint từng dự án cho BE, FE thì nay sẽ config ở ngoài root và dùng chung), hiểu quả và trải nghiệm (có thể start, test, build, ... cho ngoài root cho từng project con hoặc chạy song song cùng nhau thay vì phải vào từng project và làm độc lập nó) khi phát triển trên các `package`.
### 3. Tạo một project theo phong cách `monorepo`
Nói làn man về 2 khái niệm này quá rồi, giờ vào thực chiến cho thấy kết quả cho nó máu.
Chung ta sẽ tạo một dự án monorepo with `React` (FE) và `Express` (BE) sử dụng `Yarn workspaces`

Trước khi vào tạo project. Bạn nên cài đặt yarn cho máy của mình.  [Link cài đặt](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

1. Tạo dự án với  `Root workpace`
2. Tạo dự án với `React` và thêm vào `Workspace List`
3. Tạo dự án với `Express` và thêm vào `Workspace List`
4. Cài đặt tất cả Dependencies
5. Sử dung `Wildcard (*)` để `import` tất cả `packages` của bạn
6. Thêm `script` để chạy `packages`

##### 1. Tạo dự án với  `Root workpace`.
Tạo folder `example-monorepo`
Trong folder tạo `package.json`
```
$ cd example-monorepo
$ touch package.json
```
`Package` này ở chế độ `private` để tránh việc public root workspace. Thêm dòng code sau vào `package.json`
```javascript
{
   "private": true,
   "name": "example-monorepo",
   "workspaces": [],
   "scripts": {}
}
```
<br>

##### 2. Tạo dự án với  `Root workpace`
Trong bước này, chúng ta tạo dự án `React` sử dụng `create-react-app`. Tạo dự án với tên `client` trong folder packages.
```
$ mkdir packages
$ yarn create react-app packages/client
```
Khi đã tạo xong, chúng ta cần nói `Yarn` coi  dự án `client` như một `workspace`. Để làm điều này, đơn giản chỉ cần thêm `client` vào bên trong `Workspace List` ở root `package.json`. Hay đảm bảo bạn dùng cùng tên khi tạo dự án với React.
<br>
<br>

##### 3. Tạo dự án với `Express` và thêm vào `Workspace List`.
Bây giờ là lúc tạo dự án BE. Chúng ta sử dụng `express-generator` để tạo dự án `Express`.
Đảm bảo bạn đã cài đặt `express-generator` trong máy tính. Bạn có thể cài đặt nó với `Yarn`
```
yarn global add express-generator --prefix /usr/local
```
Sử dụng `express-generator`, chúng ta tạo dự án `Express` với tên `server` trong `packages` folder.
```
$ express --view=pug packages/server
```
Cuối cùng, thêm package `server` vào trong `Workspace List` trong root `package.json`
<br>
<br>
##### 4. Tạo dự án với `Express` và thêm vào `Workspace List`.
Khi mà đã tạo 2 dự án React và Express, bạn cần cài đặt tất cả dependencies. `Yarn workspaces` đơn giản hóa quá trình này và chúng ta không cần đi vào từng dự án và cài `dependencies` bằng tay. Thay vì thế, chúng ta chỉ cần thực hiện một cần dòng lệnh - `yarn íntall` - và `Yarn` sẽ cài đặt tất cả `dependencies` cho mỗi `package`.
Chạy dòng lệnh sau:
```
$ yarn install
```
Dòng lệnh này tạo ra một file `yarn.lock`. Nó chứa tất cả `dependencies` cho dự án của bạn, cũng như `version number` cho mỗi `dependency`. `Yarn` tạo file này tự động, vì vậy bạn không chỉnh sửa nó.
<br>
<br>
##### 5. Sử dung `Wildcard (*)` để `import` tất cả `packages` của bạn.
Tới bây giờ, mỗi `package` mới chúng ta đã thêm, chúng ta cần phải cập nhật roor `package.json` để chứa `package` mới trong `Worksapce List` `workspaces:[]`
Chúng ta không cần nhập tay tên từng project đưa vào workspaces, thay ví thế chỉ định nếu có package mới trong folder `packages` thì sẽ tự động được thêm vào `Workspace List` bằng cách sử dụng `Wildcard (*)`

Cập nhật nội dung file `package.json`
```
{
   "private": true,
   "name": "example-monorepo",
   "workspaces": ["packages/*"],
   "scripts": {}
}
```
<br>

##### 6. Thêm `script` để chạy `packages`.
Bước cuối cùng, Chúng ta cần một cách để chạy cả 2 package. Bạn có thể sử dụng [concurrently](https://www.npmjs.com/package/concurrently) để run nhiều commands song song.
Thêm concurrently vào root `package.json`
```
$ yarn add -W concurrently
```
Thêm 3 script mới trong root workspace `package.json`.
2 script để start độc lập dự án `React` và `Express`. Một cái khác sử dụng `concurrently` để run cả 2 dự án song song
```javascript
{
   "private": true,
   "name": "example-monorepo",
   "workspaces": ["packages/*"],
   "scripts": {
       "client": "yarn workspace client start",
       "server": "yarn workspace server start",
       "start": "concurrently --kill-others-on-fail \"yarn server\"  \"yarn client\"
   }
}
```
Hãy cập nhật Express boot-up script để run Express ở port 4000.
Đi vào `packages/server/bin/www` ở dòng 15
```
var port = normalizePort(process.env.PORT || '4000');
```
Bây giờ hãy run xem thế nào
```
$ yarn start
```
-----

Nếu thấy không hiểu hoặc có những góp ý cho bài viết thì mong các bạn để lại comment nhé !@#$%^&*