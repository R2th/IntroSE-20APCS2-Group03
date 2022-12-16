## Dependent and Independent Code
Hàm callback là một khái niệm cơ bản, cốt lõi để xây dựng một ứng dụng đồng bộ với Nodejs. Chúng sẽ được sử dụng như một đối số để tham gia vào việc thực thi một ứng dụng sao cho đồng bộ. Về cơ bản, nghĩa đúng như tên, chúng sẽ được call back khi một luồng xử lý đã hoàn thành. 

Dưới đây là một số ví dụ so sánh về việc đọc tên các file của một thư mục, qua đó ta sẽ hiểu sự khác nhau giữa đồng bộ, bất đồng bộ và cách hàm callback hoạt động.

### Đồng bộ
```
var fs = require('fs'),
    filenames,
    i,
    processId;

filenames = fs.readdirSync(".");
for (i = 0; i < filenames.length; i++) {
    console.log(filenames[i]);
}
console.log("Ready.");

console.log("Done");
```
Kết quả :

-----
![](https://images.viblo.asia/e156c635-4c28-4753-9abf-df08f848bbb6.png)

### Bất đồng bộ
```
var fs = require('fs'),
    processId;

fs.readdir(".", function (err, filenames) {
    var i;
    for (i = 0; i < filenames.length; i++) {
        console.log(filenames[i]);
    }
    console.log("Ready.");
});

console.log("Done");
```
Kết quả :

-----
![](https://images.viblo.asia/06c069e8-2b7d-4c59-a262-d6f28e4f6ee6.png)

Thông qua kết quả trên, mặc dù ta thấy trình tự của các đoạn xử lý không khác nhau, nhưng với trường hợp đồng bộ thì dòng code `console.log("Done");` được thực thi cuối cùng. Còn ở trường hợp không đồng bộ, nó lại được thực thi sớm hơn các đoạn xử lý khác.
Lý giải việc này, ta có thể thấy được ở line code `filenames = fs.readdirSync(".");` của trường hợp đồng bộ, CPU sẽ chờ việc đọc tên thư mục được hoàn tất thì các đoạn code bên dưới mới được thực thi. Còn ở trường hợp bất đồng bộ, ta đang sử dụng hàm hàm `fs.readdir()` để thực thi việc đọc file, đồng thời truyền vào đối số thứ 2 một function như là một hàm callback bao gồm các đoạn xử lý sẽ được mặc định thực hiện sau khi việc đọc tên file đã hoàn tất.

Ở đây còn một điểm đáng lưu ý là line code `console.log("Done");` lại nằm ngoài tác vụ xử lý của hàm call back nên mặc nhiên nó sẽ không được thực thi. Thay vì đó, trong lúc chờ đợi việc đọc tên file hoàn thành(vốn sẽ ngốn một khoảng thời gian nhất định), CPU sẽ ưu tiên việc thực thi  line code `console.log("Done");`.

Để giải quyết việc này, ta có thể di chuyển line code `console.log("Done");` vào trong hàm callback giống như các đoạn xử lý khác. Kết quả :
![](https://images.viblo.asia/cda7ceb0-995b-4259-a124-7fa1e002151b.png)

- Một số ứng dụng thực tiễn liên quan : **Ajax**,  hàm **setTimeout()**
- Một số khái niệm, từ khóa liên quan : **Promises**, **Async/Await**

Nguồn tham khảo : https://shinesolutions.com/2011/08/26/asynchronous-code-design-with-node-js/