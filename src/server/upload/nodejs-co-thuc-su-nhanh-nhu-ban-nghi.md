# NodeJS dưới ánh mắt người đời
Có nhiều bạn đặt câu hỏi với mình quanh về vấn đề Hiệu Năng của NodeJS, chẳng hạn như:
- Làm sao có thể tránh tình trạng, 1 Request nặng làm ảnh hưởng đến tất cả Request khác trên 1 Ứng dụng Web bằng NodeJS? *(#1)*
- Tại sao NodeJS chạy nhanh, nhưng đôi lúc lại thấy chậm ở các API khác nhau? *(#2)*
- Có những API, NodeJS cần con số ở hàng chục đơn vị giây để có thể Response? *(#3)*

Vậy làm thế nào 1 bông hoa tươi đẹp như NodeJS đây, không được đặt đúng nơi lại trở nên khô héo như vậy, Chúng ta cùng nhau làm rõ từng vấn đề nhé!

Xin chào, mình là **Khánh Ney**, sinh ra là một người đam mê tốc độ nhưng Ba Mẹ lại bắt làm Developer 🤫, cũng vì vậy mà lúc nhỏ mình rất thích Tốc Độ và ngay cả vào sân bóng mình cũng rất thích những pha đi bóng dài và vượt qua hàng hậu vệ với những pha bức tốc của mình (1-2 pha là thay người rồi 😄).

Cũng chính vì lúc xưa, khi mới bắt đầu tìm hiểu về các nền tảng xây dựng website, nhưng không hiểu ông nào đã có những bài viết giật tít mà làm cho mình mặc định NodeJS là chạy NHANH NHẤT, nhưng đời nào như là mơ, với tư tưởng đó mình đã làm việc với các project NodeJS với ý nghĩ ‘NodeJS vô đối, T nói nó nhanh là nó sẽ nhanh nhé 😎’, …

Nào là các khái niệm mang tính chất hàn lâm như: *EventLoop, CallStack, Non-Blocking I/O, Asynchornous Code*, .. Các khái niệm này đã đầy dẫy trên mạng, nhưng thực sự chưa hiểu hết cặng kẽ và không biết khi nào mình áp dụng vào ứng dụng. Mình nghĩ nói đến đây cũng có rất nhiều AE đã/đang/sẽ gặp các vấn đề này. 

Và mình cứ mang suy nghĩ NodeJS là bá đạo trải qua nhiều project khác nhau, và điều gì tới cũng đã tới, mình đã có cơ hội ăn hành 😄 khi đối diện với các bài toán nếu dừng lại là biết thì chưa chắc giải quyết được.


![](https://paper-attachments.dropbox.com/s_3D831A187A4FF0D2E4EB9CE51291F3512A964147B5E4183A6E7BD128736D53B5_1609598605458_maxresdefault.jpg)


Để một cầu thủ có tốc độ cao, bạn phải biết sự kết hợp giữa nhịp thở và các sải chân đều để giúp cơ thể có thể trạng tốt nhất khi chạy. 


![Việc điều phối Hơi Thở ảnh hưởng rất nhiều đến các bước chạy của bạn (nguồn: wikiHow)](https://paper-attachments.dropbox.com/s_3D831A187A4FF0D2E4EB9CE51291F3512A964147B5E4183A6E7BD128736D53B5_1609596645717_v4-728px-Run-Faster-Step-12.jpg.jpg)


Và trong những điều kiện và tình huống khác nhau cũng sẽ ảnh hưởng rất nhiều đến kết quả của 1 cuộc thi Marathon

* Báo là ông vua trong chặn đường ngắn-nước rút, nhưng không phải thế mạnh cho các chặn đua dài
* Và trong môi trường có nhiệt độ CAO, con người sẽ là người chiến thắng trong chặn đua trước NGỰA, SÓI, BÁO. 

(tham khảo:  https://qr.ae/pNWVOm)

Quay lại nào, bây giờ chúng ta cùng nhau giải thích cũng như phải hiểu được lý do tại sao Bông Hoa kia đẹp nhưng phải đúng nơi nhé, không thì sẽ thế này đây 🥀.

# Non-Blocking I/O trong NodeJS
Như nhiều bài viết khác đã đề cập, NodeJS hoạt động với **MainThread** (Event Loop), Ngoài MainThread, LibUV còn cung cấp thêm 1 loại Thread khác giúp việc xử lý các tác vụ I/O tốt hơn, đó là **ThreadPool**, để giúp NodeJS có thể xử lý các tác vụ I/O hiệu quả.
Ngày nay các hệ điều hành đã cung cấp các **Asynchronous Interface** giúp NodeJS có thể tương tác với OS(Hệ Điều Hành) và gắng cờ để đẩy sang OS xử lý, ví dụ: *AIO của Linux, epool(linux), kqueue (OSX)*,… Nói tóm lại, Ngoài các tác vụ Async I/O mà có khả năng được xử lý bởi OS, thì ThreadPool xử lý.

→ Đó cũng là 1 trong những điểm mạnh của NodeJS giúp việc xử lý các tác vụ I/O trở nên đẹp hơn với thuật ngữ hay gọi ‘**Non-Blocking I/O**’.

![](https://paper-attachments.dropbox.com/s_3D831A187A4FF0D2E4EB9CE51291F3512A964147B5E4183A6E7BD128736D53B5_1609649340599_Capture.PNG)


# **Vậy còn các tác vụ tính toán qua CPU thì như thế nào**
ví dụ: 
- Duyệt qua 1 triệu item trong array để tính toán 1 biểu thức nào đó .
- Các bài toán liên quan tính toán trên việc duyệt mảng

Trong thực tế, nếu bạn gặp phải 1 trong những bài toán trên, bạn cũng có thể xử lý bằng những cách tách thành các array con, sẽ trong như sau:
```javascript
    // hugeArray= 1.000.000.000 item
    
    var i,j,temparray,chunk = 10;
    for (i=0,j=hugeArray.length; i<j; i+=chunk) {
        temparray = hugeArray.slice(i,i+chunk);
        // hàm tính toán nặng
    }
    https://stackoverflow.com/a/8495740
```

Nhưng với cách làm này, độ phức tạp vẫn là 0(n), cũng chẳng cải thiện được là bao, và quan trọng vấn đề #1 của chúng ta vẫn chưa được giải quyết. 
Nếu hệ thống có một API chứa function như trên, thì xem như chúng ta tạch, hãy nhớ rằng: 
> Hiệu năng của một hệ thống chính là hiệu năng của function có hiệu năng kém nhất.

hoặc cũng có thể ngầm hiểu ’Một con sâu làm rầu nồi canh’. Chính vì vậy, hệ thống hoàn toàn có thể bị đánh sập chỉ bởi tồn tại ít nhất một API kiểu thế này.

```javascript
    app.get('/huge-arr', (req, res) => { // 🚧 Block Route
        let times = 10000000000;
        let total = 0;
       
        for(let i=1; i<=times; i++) {
            total += +i;
        }
        res.json(`done, total: ${total}`);
    });
    
    app.get('/check-health', (req, res) => {
        res.json(`i'm fine`);
    });
```
 
Đoạn code trên mô tả việc khi một người dùng truy cập vào API: ‘*/huge-arr*’, chúng ta cần duyệt qua **10.000.000.000 item**, và mỗi lần chạy phải tính toán biểu thức có độ phức tạp và tốn thời gian (function tính tổng qua từng lần lặp), và trong lúc đó, các request vào API: ‘*/check-health*’ sẽ pending cho đến khi API ‘*/huge-arr*’ trả về kết quả qua res.json(‘done, …’).


![/huge-arr làm block tất cả các API khác](https://paper-attachments.dropbox.com/s_3D831A187A4FF0D2E4EB9CE51291F3512A964147B5E4183A6E7BD128736D53B5_1609652047892_Capture.PNG)


 
Vậy làm cách nào để có thể giải quyết vấn đề trên (tránh việc API gây nghẽn đến toàn bộ API còn lại cho đến khi được giải phóng), Chúng ta có 2 giải pháp để giải quyết:

* **Kĩ Thuật Off-loading**
* **Kĩ Thuật Partitioning**
    

Nếu các bạn để ý, Quy trình đẩy các tác vụ mà Hệ Điều Hành đã hỗ trợ xử lý các tác vụ I/O qua Interfaces giao tiếp trực tiếp với NodeJS cũng được xem là kĩ thuật Off-Loading. Nhưng đó là ở 1 level khác trong kiến trúc NodeJS.
Từ khi NodeJS v10.5 đã giới thiệu WorkerThreads và LTS tại v12.x. Với WorkerThreads, Chúng ta có thể chủ động cấu hình và xử lý các tác vụ nặng liên quan đến CPU với Kĩ Thuật Off-Loading. 

![ảnh nguồn: https://nodesource.com/blog/worker-threads-nodejs/](https://paper-attachments.dropbox.com/s_3D831A187A4FF0D2E4EB9CE51291F3512A964147B5E4183A6E7BD128736D53B5_1609603547079_worker-diagram_2x__1_.jpg)


# **Off-Loading**: 
Chúng ta vẫn chưa giảm được độ phức tạp thuật toán (O(n)), nhưng nó giúp Chúng ta có thể *sử dụng các Worker xử lý các tác vụ phức tạp cao/nặng thay thế cho 
Main-Thread*. Điều này cũng có thể hình dung đơn giản, Với những tiền tạo có Tốc Độ cao, thay vì dốc bóng từ sân nhà, Họ có thể chuyền cho các Hậu Vệ cánh, và ghi bàn sau pha tạt cánh từ Hậu Vệ 😜. 

![nguồn: giphy.com ⚽](https://media.giphy.com/media/xUNda5RSVWLzb5BET6/giphy-downsized.gif)


Nhưng số lượng Worker là Hữu Hạn, và chắc chắn sẽ có thời điểm số lượng Request lớn hơn số lượng Worker sẵn sàng nhận job (tham khảo code Off-Loading trong NodeJS: https://nodesource.com/blog/worker-threads-nodejs/). Và rồi chúng ta phải nhắc thêm về Kĩ Thuật thứ 2: Partitioning.

# **Partitioning** 
là kĩ thuật dựa vào nguyên tắc hoạt động của các Phase trong EventLoop (mình sẽ nói ở bài sau) giúp chúng ta có thể giảm O(n) → O(1) cho các bài toán duyệt mảng số lượng lớn, để dễ hình dung hơn chúng ta có ví dụ sau 📉:

```javascript
    app.get('/huge-arr-with-ronaldo', (req, res) => { // 💚 Healthy Route
        let times = 10000000;
         /**
         * @param {*} cbRunHugeArrWithRonaldo callback trả về giá trị total
         */
        function runHugeArrWithRonaldo(n, cbRunHugeArrWithRonaldo) { 
            let total = 0;
            const FIRST_ITEM_FOR_LOOP = 1;
            
            function helpSplit(i, cbHelpSplit) {
                total += i;
                if (i == times) 
                    return cbHelpSplit(total);
                setImmediate(helpSplit.bind(null, i+1, cbHelpSplit)); // setImmediate giúp chuyển sang tick tiếp theo và đợi đến phase tiếp theo với giá trị i+1 và sẵn sàng nhận các external event(request) để xử lý (tham khảo: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
            }
    
            helpSplit(FIRST_ITEM_FOR_LOOP, totalResult => {
                return cbRunHugeArrWithRonaldo(totalResult);
            })
        }
        runHugeArrWithRonaldo(times, totalReuslt => {
            res.json(`done, total: ${totalReuslt}`);
        })
    });
    
    app.get('/check-health', (req, res) => {
        res.json(`i'm fine`);
    });
```
Như các bạn cũng đã thấy, việc tách và xử lý 1 item/1 tick 🔁 (1 lần lặp, khái niệm liên quan EventLoop) đã giúp App Chúng ta có thể **tiếp tục nhận các Request khác mà không lo Request hiện tại xử lý xong chưa** (cuối mảng). khi người dùng truy cập vào ‘*/huge-arr-with-ronaldo*’, cũng không còn bị pending mà vẫn có thể nhận những request khác VD như vào API ‘*/check-health*’ mà không phải chờ phải hồi từ API ‘*/huge-arr-with-ronaldo*’;


![](https://paper-attachments.dropbox.com/s_3D831A187A4FF0D2E4EB9CE51291F3512A964147B5E4183A6E7BD128736D53B5_1609652204420_Capture.PNG)


Thường thì mình hay áp dụng với rule như sau:

*  **Offloading**: cho các tác vụ nặng + tính toán nặng 📝
*  **Partitioning**: Tác vụ duyệt mảng 🔁

# Giải đáp thắc mắc
Vậy nếu kết hợp 2 kĩ thuật trên chúng ta đã có thể giải quyết cho những câu hỏi từ đầu bài theo thứ tự như sau:
> **Câu hỏi 3**: Có những API, NodeJS cần con số ở hàng chục đơn vị giây để có thể Response? (#3)
    > →  Ở ý này cần làm rõ, nếu nút thắt nằm ở Database(Query với 1 khối lượng lớn dữ liệu) thì chúng ta có thể cải thiện qua việc Cache hoặc tối ưu Index trong Database. Nhưng nếu vấn đề nằm tại Javascript Code, chúng ta cần xác định đây là tác vụ về I/O  hay CPU.
        > *  💿  IO-intensive : Xem lại chúng ta có xử lý ổn các tác vụ I/O hay chưa, có block các tác vụ này hay không?
        > *  🖥️ CPU-intensive: Áp dụng 1 trong 2 hoặc cả 2 kĩ thuật (Offloading-Partitioning) giảm thiểu việc EventLoop (Main-Thread) phải hứng và xử lý các tác vụ nặng đó. (Bonous: Ngoài ra chúng ta cần quan tâm đến các thông số trên *Metric EventLoop, GC, Memory/CPU Profiler, Database Profiler*, … để có thể cải thiện hiệu năng ở các khâu một cách tốt nhất)

> **Câu hỏi 1**: Làm sao có thể tránh tình trạng, 1 Request nặng làm ảnh hưởng đến tất cả Request khác trên 1 Ứng dụng Web bằng NodeJS? (#1)<br />
> **Câu hỏi 2**: Tại sao người ta lại nói NodeJS chạy nhanh, nhưng đôi lúc lại thấy chậm ở các API khác nhau? (#2) <br />
     > → Như Câu Hỏi 3 mình đề cập, với các request nặng cần phân tích là liên quan đến **CPU hay I/O** để có các phương án xư lý thích hợp (sự kết hợp giữa các tools PerformanceTest + Monitoring sẽ giúp chúng ta có cái nhìn khách/trực quan và xác định được nút thắt là điều quan trọng nhất)

Hi vọng tới đây các bạn cũng đã hiểu được 1 phần nào đó về Ưu/Nhược điểm của NodeJS trong từng loại tác vụ, và đương nhiên khi có các Nhược điểm trên chúng ta lại trân trọng hơn các ưu điểm của NodeJS và không ưu muội như mình lúc vừa mới học. 

# Học, học nữa, học mãi ...
⚠️ Thật ra 2 kĩ thuật trên là một phần giúp chúng ta có thể xử lý, tất nhiên sẽ cần rất nhiều yếu tố khác, chẳng hạn như:

* Làm sao có thể detect được API nào là API Nghẽng (**Bottleneck**) ⏳?
* API đó nghẽng ở Level nào: *Network, Infrastructure, Application, Database*, … hay những yếu tố khác 🌎? 
* Bạn có sử dụng Worker(thành phần xử lý job từ WorkerThreads) có đang bị over?
* Code Javascript của bạn có thật sự tốt, ở những phần xử lý liên quan: *Code Đồng Bộ/bất đồng bộ, REDOS, Garbage Collection*,…?

Ở những bài viết tiếp theo, mình sẽ đi sâu vào từng chủ đề và trả lời từng câu hỏi qua các chủ đề mình hướng đến. 😁 Bingo, giờ thì tạm biệt và hẹn gặp lại ở các bài viết tiếp theo. <br />
Nếu quan tâm thì hãy Upvote và Clip lại bài viết này và theo dõi thêm *Serie* [**NodeJS và những câu chuyện Tối Ưu Performance**](https://viblo.asia/s/nodejs-va-nhung-cau-chuyen-toi-uu-performance-RNZqg86G50n) nhé!