### javascript async await
Phần này chúng ta không nói nhiều về khái niệm async await là gì? Mà ở đây chúng ta đi sâu hơn về một vấn đề có nhiều trường hợp thực tế xảy ra khi triển khai với lập trình bất đồng bộ và async function javascript. Đó là xử lý lỗi với try catch trong js.

Xem thêm: Node async await 

Try catch js

Try catch được sử dụng để xử lý các lỗi trong lúc thực thi các function và ngăn chúng dừng việc thực thi chương trình, và hơn thế nữa try catch có thể giúp chúng ta có thể xử lý data khi bị lỗi. Để sử dụng try catch javascript trong trường hợp nào thì trước đây chúng ta đã có một buổi phân tích về "Sự thật về try catch javascript" ở đó có nhiều tình huống sử dụng, và phân tích dúng sai khi sử dụng. 

Ở đây không nói thêm nữa. Hiện tại có 3 cách để bắt lỗi khi sử dụng async/await js, chúng ta sẽ lấy ví dụ và phân tích qua một ví dụ cụ thể. Và lưu ý chúng ta không giair thích nhiều ở đây, nếu muốn tìm hiểu sâu hơn thì các bạn có thể đọc lại về "async/await javascript", ngoài ra thì bạn cũng có thể dành thời gian cho khái niệm Promise...

### async await callback function

Đầu tiên khi mới tham gia đội ngũ lập trình thì đa số viết kiểu truyền thống như sau:

```
const router = require('express').Router();
router.get('/check', check);
module.exports = router;

async function check(req, res) {
    someOtherFunction().then((a) => {
        somethingElseFunction().then((b) => {
            res.status(200).json({a: a, b: b});
        }).catch((error) => {
            res.send("error");
        })
    }).catch((error) => {
        res.send("error");
    })
}

someOtherFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("something")
        }, 10);
    })

}

somethingElseFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("not a error");
        })
    })
}
```

### async await try catch

Tiến bộ hơn thì chúng ta sử dụng thêm try catch để bắt lỗi.

```
const router = require('express').Router();
router.get('/check', check);
module.exports = router;

async function check(req, res) {
    try {
        const a = await someOtherFunction();
        const b = await somethingElseFunction();
    } catch (error) {
        res.send(error.stack);
    }
}

someOtherFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            reject("something")
        }, 10);
    })

}

somethingElseFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("ssksks"))
        })
    })
}
```

### async await without try catch

Ở trường hợp này thì được khuyến khích sử dụng nhiều hơn. Tuy nhiên có một lỗ hổng, duy nhất ở đây là trong trường hợp có lỗi, tất cả mã sau câu lệnh await sẽ vẫn thực thi. Do vậy chúng ta hãy tự bảo vệ mình bằng cách check thêm giá trị trả về như sau:

```
const router = require('express').Router();
router.get('/check', check);
module.exports = router;

async function check(req, res) {
    const a = await someOtherFunction().catch((error) => {res.send("some error")});
    const b = await somethingElseFunction().catch((error) => {res.send(("some error ", error))});
    if (a && b) res.status(200).json({a: a,b: b}); //check thêm điều kiện 
}

someOtherFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("something")
        }, 10);
    })

}

somethingElseFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("from b");
        })
    })
}
```