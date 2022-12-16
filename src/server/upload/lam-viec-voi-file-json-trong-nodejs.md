**Hello** các bạn nay mình xin chia sẻ với các bạn về cách làm việc với file trong NodeJS. File thì rất là quan trọng trong khi chúng ta muốn lưu dữ các thông tin bằng các dữ liệu, chúng ta lưu trữ để sử dụng cho các tiến trình mà phần mềm cần sử dụng.


Đầu tiên các bạn chạy `npm start` (các bạn sử dụng code của phần cũ nhá :)

Các bạn tạo giúp mình 1 file là fileSystem

```js:fileSystem.js
//fs(file system) là một modul của nodejs cho phép ta ghi và đọc file
const fs = require('fs');
// ta tạo 1 file bằng cách sử dụng createNewfile, ở đây mình sử dụng arrow function
//openSync: sẽ mở file theo một tiến trình(sync) và sẽ mở file nên với quyền write;
module.exports = {
    createNewfile: (fileName) => {
        cons fd = fs.openSync(fileName, 'w'); //fd là file description
    }
}
```

Trong `index.js` mình sẽ import tới `fileSystem` và gọi ... ra

```js:index.js
vả fileSystem = require('fileSystem');
//ta gọi tới function createNewfile và truyền vào 1 file tên là text.txt
//để thuận tiện các bạn tạo 1 folder tên là data và tao 1 file text trong nó nhá
//dirName: nghĩa là thư mục bạn đang làm việc.
// ..: quay lại 1 folder (bởi vì mình đang ở folder src)
const fileName = _dirName + '/../data/text.txt';
fileSystemt.createNewfile(fileName);
```

Tiếp theo các bạn cần tạo 1 object để thực hành nhá! các bạn có dữ liệu có sẵn thì càng tốt :), ở đây mình tạo 1 object foods chứa tên các loại đồ ăn và mô tả của nó.

```js:index.js
...

let jsonObject = {
    foods: [
        {
            foodName: "Cream Tea",
            foodDescription: "This is a cup of tea"
        },
        {
            foodName: "Japanese Salad",
            foodDescription: "Very delicious Janpanese Salad"
        },
        {
            foodName: "Cream Tea",
            foodDescription: "This is a cup of tea"
        },
        {
            foodName: "Korean Kimchi",
            foodDescription: "Traditional Korean Kimchi"
        },
        {
            foodName: "Fresh mushroom",
            foodDescription: "Fresh mushroom with vegatables"
        },
        {
            foodName: "Oysters",
            foodDescription: "Oysters with ice rock"
        },
    ],
    resultCode: 200,
    restaurantName: "Sasimi BBQ"
}
```

Trong fieSystem ta tạo thêm 1 function `saveJsonObjectToFile`mục đích để lưu dữ liệu tới file nào đó.

```js:fileSystem.js
    ...
    
    saveJsonObjectToFile: (obj, fileName) => {
        // mình sử dụng stringify để biến object của chúng ta thành 1 string.
        const jsonString = JSON.stringify(obj)
        //tiếp theo ta gọi writeFile để ghi json ta vừa convert sang string vào fileName với dạng utf-8
        fs.writeFile(fileName, jsonString, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(`Saved to file ${fileName}`);
        });
    }
```

Bây giờ ta thử truyền data vào file text.txt nhá

```js:index.js
...

fileSystem.saveJsonObjectToFile(jsonObject, fileName);
```

Chúng ta đang chạy nodemoon nên code sẽ run liên tục nhá, mọi người hãy mở file `text.txt` và xem dữ liệu chúng ta vừa lưu nào!

Bây giờ bạn muốn đọc dữ liệu mình vừa ghi thì làm như nào, cùng tạo 1 function đọc dữ liệu ra nào: 

```js:fileSystem.js
...

readJsonObjectFromFile: (fileName) => {
    //Asynchrousy(đọc không đồng bộ)
    //bởi vì lệnh readFile của fs đọc không đồng bộ, đọc không đồng bộ là gì?
    //nghĩa là quá trình đọc file sẽ tách ra 1 tiến trình riêng, nên nếu ở dưới bạn có 1
    //câu lệnh khác mà data chưa đọc xong thì chương trình vẫn sẽ bỏ qua và chạy các dòng code ở dưới trước
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        //parse nghĩa là parse dữ liệu text của chúng ta từ dạng string quay về dạng object
        let jsonObject = JSON.parse(data);
        console.log(`jsonObject.object = ${JSON.stringify(jsonObject.foods)}`);
        console.log(`jsonObject.resultCode = ${JSON.stringify(jsonObject.resultCode)}`);
        console.log(`jsonObject.restaurantName = ${JSON.stringify(jsonObject.restaurantName)}`);
    })
}
```

```js:index.js
...
fileSystem.readJsonObjectFromFile(fileName);

//nếu muốn khi thêm dữ liệu vào object
jsonObject.address = "13 floor KeangName, Abc, ...";
sau đó là gọi
fileSystem.saveJsonObjectToFile(jsonObject, fileName);
fileSystem.readJsonObjectFromFile(fileName);
// và bên fileSystem.js các bạn cũng thử gọi thêm thuộc tính address nữa xem :)
```

Tới đây là kết thúc cho bài viết này, cảm ơn các bạn đã đọc nhá, **See you!!!**