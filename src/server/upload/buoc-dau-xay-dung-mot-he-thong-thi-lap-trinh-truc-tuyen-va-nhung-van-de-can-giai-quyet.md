Chào các bạn, hôm nay mình sẽ tiếp tục series [Nhật kí xây dựng hệ thống máy chấm thi lập trình trực tuyến](https://viblo.asia/s/nhat-ki-xay-dung-he-thong-may-cham-thi-lap-trinh-tuc-tuyen-nB5pX8nY5PG). Trong bài viết hôm nay mình sẽ thuật lại từ những bước đầu tiên quá trình xây dựng máy chấm thi nhé :fist_oncoming: <br/>
## Đặt vấn đề
Khi thực hiện xây dựng máy chấm thi lập trình trức tuyến, mình có tham khảo ở rất nhiều nguồn tài liệu khác nhau, trong số đó thì có bài viết [Hệ thống Viblo Code Challenge được xây dựng như thế nào](https://nghethuatcoding.com/2019/06/05/viblo-code-challenge-duoc-xay-dung-nhu-the-nao/) đã mang lại cho mình rất nhiều kiến thức có ích và vô cùng trọng tâm.<br/>
Sau khi đọc xong bài viết trên, mình gần như có thể bắt tay vào làm luôn theo như kịch bản mà tác giả đề cập, song song với đó là việc tìm hiểu về ảo hóa và docker (tất nhiên rồi :)).<br/>
Mình có code lại một api tương tự nhưng sử dụng  Ruby On Rails, trong quá trình code lại api này có kha khá vấn đề phát sinh khi thực hiện, trong số đó có liên quan đến việc giới hạn tài nguyên cho từng bài thi và tính toán sao cho chính xác thời gian thực thi của chương trình đó. <br>
Bắt đầu từ đây mình sẽ tìm cách giải quyết từng vấn đề một nhé. Mình xin phép được sử dụng source code của tác giả bài viết đề demo (qua rất nhiều quá trình sửa đổi thì code của mình không còn được như cũ, và vì một số lý do nên cũng không xem được commit cũ nữa :v).<br>
*Chú ý: Trong khuôn khổ bài viết này, mình không có ý  nói cách làm nào đúng cách làm nào sai, điều mình muốn là chỉ ra mình gặp vấn đề chỗ nào và xử lý nó ra sao, đại ý là như vậy :joy:*<br>
## Các vấn đề cần giải quyết
### I. Thiết kế và cài đặt các ngôn ngữ cho máy chấm thế nào ?
Một máy chấm thi lập trình không thể chỉ hỗ trợ một ngôn ngữ duy nhất được, mà đòi hỏi phải hỗ trợ chấm nhiều ngôn ngữ. Như vậy theo như concept ban đầu của mình là mỗi ngôn ngữ tạo ra một images riêng và chạy ở trong 1 container riêng, khi chạy xong thì tắt, điều này đồng nghĩa với việc giả sử có 10 ngôn ngữ cần hỗ trợ thì cần đến 10 images tương ứng, với hiểu biết hạn hẹp của mình về docker thì làm cho mình khó quản lý được các images này. <br>
Vấn đề tiếp theo là vấn đề biên dịch và thông dịch cho các ngôn ngữ như c, java, ..., các ngôn ngữ này cần một lệnh để biên dịch và thông dịch riêng, như vậy để viết một template script dùng chung cho tất cả các ngôn ngữ là không khả thi đối với mình bởi vì shell script mình không biết gì :joy: <br>
### II. Vấn đề về hiệu năng
> Mình xin phép sử dụng code của bài viết khác như đã trình bày ở phần đầu, các bạn có thể tham khảo source code của bài viết gốc [ở đây](https://github.com/nooptr/code-challenge)<br>

```javascript
var content = req.body.content;

var folder = "/tmp/" + crypto.randomBytes(16).toString('hex');
fs.mkdirSync(`${folder}`);

if (req.params.language == "php") {
    var inputFile = `${folder}/main.php`;
    fs.writeFileSync(inputFile, content);
    var command = `docker run --rm -v ${folder}:${folder} ntcd_php php ${inputFile} ${folder}/output`;
} else if (req.params.language == "javascript") {
    var inputFile = `${folder}/main.js`;
    fs.writeFileSync(inputFile, content);
    var command = `docker run --rm -v ${folder}:${folder} ntcd_javascript node ${inputFile} ${folder}/output`;
}

if (command == null) {
    res.json({
        stdout: "",
        error: "language not support",
    });
}
exec(command, (error, exec_time, stderr) => {
    var stdout = fs.readFileSync(`${folder}/output`, 'utf8');
    res.json({
        stdout: stdout,
        error: stderr,
        time: exec_time
    });

    fs.remove(folder, (err) => {});
});
```
Với đoạn code trên có thể thấy rằng kịch bản để chạy một bài thi lập trình được gửi lên là:<br>
- 1. Lấy ra images tương ứng với ngôn ngữ của chương trình
- 2. Khởi chạy một container với image tương ứng để thực hiện chương trình và xuất ra file kết quả.
- 3. Đọc file output và errors tương ứng.

Tuy nhiên có thể thấy ở bước 2 việc chạy một container cho ngôn ngữ tương ứng và khi chạy xong thì xóa container đi chính là bước làm cho quá trình chấm bài bị chậm, còn chưa kể việc chạy container nhanh hay chậm còn tùy thuộc vào trạng thái trước đó của server, đại ý của vấn đề có thể hiểu rằng: Nếu trước khi chạy một bài thi mà server đang xử lý một tác vụ yêu cầu nhiều RAM nào đó, khi tác vụ này chưa xong đã phải xử lý đến việc chấm bài dẫn đến quá trình khởi chạy container bị chậm hơn bình thường. Điều này ảnh hưởng đến tính nhất quán khi tiến hành chấm thi, làm cho tính khả dụng của máy chấm không cao, mặc dù vẫn có thể hoạt động được.
### III. Vấn đề chấm nhiều ngôn ngữ cùng lúc
Theo như cách làm hiện tại, trong một phiên thì chỉ chấm được một bài thi duy nhất, khi kết thúc phiên này thì mới đến bài thi tiếp theo, vì vậy tài nguyên của máy chấm sẽ không được tận dụng tối đa, vì vậy cần các giải pháp khác để xử lý vấn đề này như multi thread, background job.
### IV. Vấn đề về tính linh hoạt và khả năng mở rộng
Khi thực hiện chấm thi thì việc nhận và xử lý nhiều request cùng một lúc là điều không thể tránh khỏi, vì vậy cần có một hệ thống có tính mở rộng cao, ví dụ như việc tiện lợi khi triển khai cân bằng tải chẳng hạn. Như vậy mỗi khi mở rộng ra một máy chấm thi mới thì cần cài lại tất cả các ngôn ngữ từ đầu, đương nhiên việc ngồi cài lại cả chục ngôn ngữ là việc tốn nhiều thời gian không cần thiết. Để xử lý vấn đề này thì việc sử dụng docker là hoàn toàn hợp lý, tuy nhiên với cách làm một ngôn ngữ build một image tương ứng thì theo suy nghĩ của mình chưa phải là cách làm tối ưu.
## Kết luận
Nhìn chung vấn đề của mình xoay quanh việc làm sao để có thể triển khai được tất cả các ngôn ngữ trên cùng một images và chạy máy chấm thi dựa trên container của image này, như vậy các vấn đề nêu ở trên sẽ được giải quyết. Tuy nhiên đến đây thì lại nảy sinh một trường hợp như sau: Giả sử người dùng không gửi lời giải lên mà gửi một chương trình có chứa đoạn mã xấu để thực hiện hành động như `rm -rf *` chẳng hạn, lúc này server của chúng ta sẽ lăn quay ra chết bởi vì khác với việc khởi chạy riêng từng container cho mỗi lần chấm thi thì giờ đây chỉ có một container duy nhất được chạy cùng với server api <br>
:cold_sweat::cold_sweat: Đây chính là điểm yếu chí mạng của giải pháp này, bao nhiêu công sức bỏ ra giờ lại phải quay về tìm hiểu lại từ đầu. <br>
Tạm gác lại và suy nghĩ về cuộc đời sao phũ phàng đến vậy :sob:

Nếu các bạn có hứng thú với series này thì theo dõi ở những phần tiếp theo nhé.