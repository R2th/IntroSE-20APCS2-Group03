### Giới thiệu
Chào mọi người !
Hôm nay mình xin chia sẻ 2 module rất thuận tiện trong việc thao tác copy, tạo directory mới sử dụng NPM script
### NPM-Script

**1. Copy [cpx](https://www.npmjs.com/package/cpx)**<br>
 Đầu tiên là copy từ folder này sang folder kia. 
 ```
 $ npm i -D cpx
 ```
 Ví dụ copy file từ Folder B đến Folder A chả hạn. Chỉ cần setting thế này trong package.json rồi chạy `$ npm run copy`
```js
{
  "scripts": {
    "copy": "cpx './FolderB/**/*' ./FolderA"
  }
}
```
Nếu mà chỉ muốn copy 1 loại file thôi thì setting thế này, ví dụ với file `HTML` chả hạn nó sẽ chỉ chọn file HTML để copy
```js
{
  "scripts": {
    "copy": "cpx './FolderB/**/*.html' './FolderA'"
  }
}
```
Thêm nhiều file khác thì sẽ thế này
```js
{
  "scripts": {
    "copy": "cpx './FolderB/**/*.{html,css,js}' './FolderA'"
  }
}
```
Ngược lại nếu ko muốn copy chỉ file nào đó thì setting như thế này <br>
`"copy": "cpx './FolderB/**/*.!(html)' './FolderA'"`<br>
Nhiều file ko copy sẽ thế này<br>
`"copy": "cpx './FolderB/**/*.!(html | CSS | JS)' './FolderA'"`


**2. Create New [mkdirp](https://www.npmjs.com/package/mkdirp)**<br>
Tạo nhanh directory bằng module `mkdirp`
```
$ npm i -D mkdirp
```
Trong `package.json` setting như sau rồi chạy  `$ npm run mkdir`
```js
{
  "scripts": {
    "mkdir": "mkdirp ./FolderA"
  }
}
```
Chúng ta cũng có thể setting tạo thư mục con như thế này nhé <br>
`"mkdir": "mkdirp ./dist/css ./dist/js ./dist/img"`

### Lời kết
 Hi vọng với 2 module này mọi người có thể thao tác nhanh hơn thuận tiện hơn trong quá trình làm việc nhé. Cảm ơn mọi người đã đọc bài nhé.