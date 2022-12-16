Đã làm node thì ngày nào cung phải dùng npm. Việc nắm chắc npm giúp bạn quản lý dependence tốt hơn, nâng cao độ ổn định, tính bảo mật của phần mềm, cũng như hiệu suất làm việc. Sau đây mình tổng hợp một số best practices khi sử dụng npm. 
## 1. Không tự động thay đổi version các packages.

Hãy suy nghĩ về việc dự án bạn phát triển sử dụng momentjs-x.1.4. Nhưng khi deploy tính năng này lên production version tự động tăng lên momentjs-x.1.5 và rất nhiều issue kèm theo được sinh ra. Có một số cách đảm bảo version pakages không thay đổi.
1. Config file `.npmrc`:
```npmrc
// save this as .npmrc file on the project directory
save-exact:true
```
2. Install đúng version `npm install <package>@<version> --save-exact`
3. Bỏ tiền tố `^` trong file `package.json`
```json
{
  "name": "blogss",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "3.0.0",
    "moment": "^2.29.1"
  }
}
```
Trong file ví dụ thì express sẽ không tự động tăng version còn moment thì có.
## 2. Install packages ở production với command `npm ci`

Sử dụng `npm ci` thay vì `npm i` có một số  tiện dụng:

1. Nhanh hơn gấp 2 lần `npm i`xem thêm  nguyên nhân [npm blog](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable)
2. Nếu `package.json` và `package-lock.json` khác nhau sẽ tự động báo lổi. Điều này tránh trường hợp nhiều người trong dự án tự thêm package hoặc tăng version trong dự án bằng các thay đổi file pakage.json, mà không thông qua npm cli.
3. Tự xóa follder `node modules` trước khi install. Điều này đảm bảo `node modules` là sản phẩm của `package.json` và `package-lock.json`.

## 3. Phân biệt rõ dependencies và devDependencies trong file `package.json`

- `dependencies`: Packages cần thiết cho ứng dụng ở production. 
- `devDependencies`: Packages chỉ cần thiết cho local development và testing.

Để thêm pakage và `dependencies` trong file `package.json` thực hiện command:

```bash
npm install <package-name> [--save-prod]
```
Để thêm pakage và `devDependencies` trong file `package.json` thực hiện command:

```bash
npm install <package-name> [--save-dev]
```
Có thể thực hiện bằng cách sửa file `package.json` một cách thủ công.

## 4. Không install devDependencies khi chạy production

`devDependencies` là các pakages chỉ sử dụng ở môi trường development hoặc testing. Việc phải install chúng ở production làm quá trình deploy trở nên chậm chạp hơn và còn làm ứng dụng trở nên nặng nề không cần thiết.

Để chắc chắc không install devDependencies, thì cần set `NODE_ENV=production`, install bằng command `npm ci`

Nếu muốn xóa `devDependencies` đã được install, trong trường hợp cần `devDependencies` trong quá trình build thì có thể remove bằng command: `npm prune --production`

## 5. Thường xuyên kiểm tra các package đang sử dụng:
- Kiểm tra các packages bị outdated:
```bash
npm outdated [[<@scope>/]<pkg> ...]
```
- Kiểm tra vấn đề bảo mật

```bash
npm audit [--json] [--production] [--audit-level=(low|moderate|high|critical)]
npm audit fix [--force|--package-lock-only|--dry-run|--production|--only=(dev|prod)]
common options: [--production] [--only=(dev|prod)]
```

## Bonus. Vì sao tôi không dùng yarn
- Không phải vì yarn không tốt. Yarn được biết đến là install nhanh hơn và còn nhiều tính năng khác hay hơn. Không phải tự nhiêm mà repo github của yarn có 40k sao, trong khi npm cli chỉ có 5,5k sao. *"yarn rất tốt nhưng tôi rất tiết!"*
- Nguyên nhân 1: Dùng yarn nhưng vẫn phải làm việc với npm. Yarn không lưu trữ các pakages, các pakages thường dùng được npm repository lưu trử, yarn chỉ đóng vai trò tải pakages về. Bạn muốn public một package thì vẫn phải tạo tài khoản npm. Một số command về quản lý package yarn không hỗ trợ. Ví dụ common remove pakage `npm unpublish --force` ), [issue](https://github.com/yarnpkg/yarn/issues/4746) từ năm 2017.
- Nguyên nhân 2: Dùng yarn nhưng vẫn phải cài npm
- Nguyên nhân 3: npm đủ để dùng, vì tôi code microservices. Các service có cấu trúc ngọn nhẹ với số dependence không nhiều.

*Cho mình 1 upvote để có động lực viết nhiều bài hơn nhé.*