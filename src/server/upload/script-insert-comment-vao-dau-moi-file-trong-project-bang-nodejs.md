## Tại sao lại có bài viết này?
Đó là cả một câu chuyện mọi người ạ. Mình xin được phép tóm tắt lại như sau:

Câu chuyện được mang tên "Sếp tổng và em coder xinh xắn"

Vào một ngày đẹp trời nọ, trong lúc đang làm dự án "Về nhà đi con" ngon lành cành đào thì team mình được đón tiếp một em hot girl coder xinh xắn mới vào. Anh em náo nức chưa được bao lâu thì nhận được một chỉ thị từ sếp tổng sư huynh:

"Xin chào mọi người, bắt đầu từ hôm nay, mọi người hãy add đoạn code này vào tất cả các file trong dự án nhé <3"

Đoạn code có dạng như sau:

```js
// Day_la_du_an_cua_sep_***_dep_zai_ahihi
```

Các bạn thấy có bê đê biến thái ko chứ. Nhưng thôi kệ, nhận nhiệm vụ rồi thì phải làm thôi. Đó cũng là lý do xuất hiện bài viết này.

Mình đùa thôi chứ câu chuyện chỉ có 10% sự thật thôi nhé :v

OK, Let's get it !!

## Mục tiêu

Mục tiêu: vì các project của team mình chủ yếu là frontend nên mình sẽ thử tạo một tool bằng javascript, cụ thể hơn là mình sẽ sử dụng NodeJS để đọc và viết vào file. Sau đó sẽ add một lệnh kiểu như `npm run gencomment` vào package.json để thực thi đoạn code.

## Khởi tạo thư mục, file

Ở bài viết này, mình sẽ `create-react-app` một project để có một vài file để test. Các bạn cũng có thể `npm init` rồi tạo một vài file bất kỳ gì cũng được.

```
$ npx create-react-app gencomment
```

Tiếp theo chúng ta sẽ tạo 1 file gencomment.js và thêm script vào file package.json để test 1 xíu trước khi vào code nhé. Thành quả ban đầu:
```
├── public/
├── src/
├── gencomment.js
├── package.json
```

```js
//gencomment.js
console.log('BEGIN');
```

```js
//package.json
{
 "script": {
   "gencomment": "node gencomment.js"
 }
}
```

Chúng ta hãy run `npm run gencomment` để đảm bảo code chạy được trước khi qua phần tiếp theo nhé. Kết quả mong muốn là sẽ log ra được message 'BEGIN' mọi người nhé :v

## Code

OK, vào phần chính thôi nào. 

Thuật toán mình nghĩ cũng đơn giản thôi:
1. Đầu tiên chúng ta sẽ đọc folder để lặp qua các file và folder con (sử dụng thư viện `fs` và `path` có sẵn)
2. Tiếp đến là check xem đó là một file hay là folder, nếu folder thì lặp lại Bước 1
3. Nếu là file thì đọc dòng đầu tiên của file xem có comment chưa .Nếu chưa thì insert comment vào. Ở bước này, để chỉ đọc dòng đầu tiên của file mà không cần phải đọc toàn bộ file mình sẽ sử dụng package  [`firstline`](https://github.com/pensierinmusica/firstline/blob/master/index.js). Package này dùng read stream khá là nhanh, và chỉ có 30 dòng code thôi, mọi người có thể xem qua nhé.

Sau một hồi search google, xem document các thứ thì đây là phần code của mình:

```js
const fs = require("fs")
const path = require("path")
const firstline = require("firstline")

// just allow js and jsx file for this demo
const config = {
  COMMENT: "// Day_la_du_an_cua_sep_***_dep_zai_ahihi",
  ALLOW_FILE_EXT: ["js", "jsx"],
}

/**
 * This function will insert comment in every file with ALLOW_FILE_EXT.
 * @param {String} dir A path to directory
 */
const genComment = dir => {
  // loop through folder
  fs.readdirSync(dir).map(view => {
    // if is folder: genComment folder
    if (view.split(".")[1] === undefined) {
      genComment(path.resolve(dir, view))
    }
    // else check if is allowed file
    else if (config.ALLOW_FILE_EXT.indexOf(view.split(".").pop()) >= 0) {
      const filePath = path.resolve(dir, view)
      // check if file already has comment 
      firstline(filePath).then(firstLineContent => {
        if (!firstLineContent.includes(config.COMMENT)) {
          // store current content
          const fileCurrentContent = fs.readFileSync(filePath)
          // write comment
          fs.writeFileSync(filePath, `${config.COMMENT}\n`)
          // append current content
          fs.appendFile(filePath, fileCurrentContent, err => {
            if (err) throw err
          })
        }
      })
    }
  })
}

genComment(path.resolve(__dirname, "src"))
 ```
 
Vậy trường hợp chúng ta muốn xóa tất cả comment vừa insert vào thì sao :-?

Đối với trường hợp này chúng ta sẽ có 2 cách, một là tạo thêm một file removecomment.js xong rồi add thêm 1 script `npm removecomment` nữa hoặc là mở rộng script hiện tại sao cho nó có thể nhận tham số add hoặc remove kiểu như sau:
```
$ npm run gencomment add "some comment"
$ npm run gencomment remove "some comment"
```
Cách thứ 2 có vẻ OK hơn nhỉ, vậy chúng ta sẽ làm theo cách này xem nhé. 

Đối với trường hợp này, mình sẽ sử dụng `process.argv` để parse command line argument.

 ## Kết quả
 
Toàn bộ code của chúng ta sẽ như sau, mình có update lại 1 xíu nhé :v

```js
const fs = require("fs");
const path = require("path");
const firstline = require("firstline");

const config = {
  COMMENT_PREFIX: "//",
  ALLOW_FILE_EXT: ["js", "jsx"],
};

const MODE = {
  ADD: "add",
  REMOVE: "remove",
};

/**
 * This function will insert comment in every file with ALLOW_FILE_EXT.
 * @param {String} dir A path to directory
 */
const genComment = ({ dir, mode, comment }) => {
  const _comment = `${config.COMMENT_PREFIX} ${comment}`;

  fs.readdirSync(dir).map(view => {
    // if is folder: genComment folder
    if (view.split(".")[1] === undefined) {
      genComment({ dir: path.resolve(dir, view), mode, comment });
    }
    // else check if is allowed file
    else if (config.ALLOW_FILE_EXT.indexOf(view.split(".").pop()) >= 0) {
      const filePath = path.resolve(dir, view);
      // check if file already has comment
      firstline(filePath).then(firstLineContent => {
        if (mode === MODE.ADD) {
          if (!firstLineContent.includes(_comment)) {
            // store current content
            const fileCurrentContent = fs.readFileSync(filePath);
            // write comment
            fs.writeFileSync(filePath, `${_comment}\n`);
            // append current content
            fs.appendFile(filePath, fileCurrentContent, err => {
              if (err) throw err;
            });
          }
        } else {
          if (firstLineContent.includes(_comment)) {
            // read file
            fs.readFile(filePath, "utf8", (err, data) => {
              if (err) throw err;

              // write all content except first line
              fs.writeFileSync(
                filePath,
                data
                  .split("\n")
                  .slice(1)
                  .join("\n"),
              );
            });
          }
        }
      });
    }
  });
};

const mode = process.argv[2];
const comment = process.argv[3];

// Check if command line argument is valid
if (Object.values(MODE).includes(mode) && comment) {
  genComment({
    dir: path.resolve(__dirname, "src"),
    mode,
    comment,
  });
}
```
Chúc mọi người thành công !!