# Kí Ức Đọng Về
Xin chào, lại là mình đây, sau gần 3 tuần vắng bóng với những chồng công việc không hồi kết, hôm nay mình cũng dành ra được thời gian để tiếp tục quay lại với [*Series NodeJS và những câu chuyện tối ưu Performance.*](https://viblo.asia/s/nodejs-va-nhung-cau-chuyen-toi-uu-performance-RNZqg86G50n)

Ở bài trước, Chúng ta đã đi qua các case làm ảnh hưởng trực tiếp đến hiệu năng, các case khiến cho EventLoop trở thành viên ngọc thông chưa bao giờ được toả sáng :gem:. Nếu bạn nào chưa xem qua phần đầu tiên, có thể quay lại bài [*NodeJS có thực sự nhanh như bạn nghĩ*](https://viblo.asia/p/nodejs-co-thuc-su-nhanh-nhu-ban-nghi-m68Z0Pe9ZkG) để tránh được việc Block EventLoop sẽ nguy hiểm như thế nào nhé.

![](https://media.giphy.com/media/n0tQZejx4Rh28/giphy.gif)



Quay lại chủ đề ngày hôm nay, đó là câu chuyện giữa Anh chàng NodeJS và Cô Nàng V8. Wow, nghe có vẻ ông tác giả này như đang mới yêu đấy nhỉ 😇. Không đâu, hãy tin tôi đi với những phép tu từ trong ngữ pháp tiếng việt này sẽ giúp bạn hiểu sâu hơn và nhớ lâu hơn với những khái niệm mang tính chất hàn lâm như các bạn đang gặp phải.

# ĂN QUẢ NHỚ KẺ TRỒNG CÂY
NodeJS vốn được biết là Platform và điều phối bởi V8 Javascript (được viết bằng C/C++). Và việc quản lý và cấp phát vùng nhớ cho các ứng dụng sẽ được đảm nhiệm bởi V8 (thật ra ông này cũng tận dụng mô hình tương đồng Java Virtual Machine-JVM).

Điều này đồng nghĩa, như việc Công Phượng thi đấu dưới dạng cho mượn ở CLB TPHCM, nhưng mọi sự quản lý và phân bổ từ cầu thủ xứ Nghệ vẫn được đảm nhiệm bởi HAGL.

![](https://paper-attachments.dropbox.com/s_D742368F1CB599228FE32BB246C3BFCA6BA515490E27467C29D3D01C1049F11A_1611307283742_bau-duc-vs-cong-phuong-1594943159-width1004height565.jpg)


Nói tóm lại V8 Engine đảm nhận vai trò **quản lý và cấp phát Memory** cho các ứng dụng NodeJS (100% Javascript). Vì vậy bất cứ vấn đề gì liên quan đến Memory, thì gốc vẫn xuất phát từ **V8**.

😅 Bingo, vẫn dễ hiểu đúng không nào.  Đây không phải là 1 bài viết đi sâu vào V8, chúng ta chỉ dừng lại ở mức cơ bản của V8, và phần còn lại cần tập trung vào NodeJS trong việc cấu hình các ảnh hưởng V8 lên NodeJS.

# Tu Luyện
Để kiểm tra lại thông tin Memory đang dùng, chúng ta có thể kiểm tra qua đoạn code sau:
```javascript
const v8 = require('v8');
let totalHeapSize = v8.getHeapStatistics().total_available_size
totalHeapSize = totalHeapSize / 1024 / 1024 / 1024;
console.log(`Total heap size: ${totalHeapSize} GB`);
   
//Total heap size: 2.043386295437813 GB
```
Vì ở mỗi version NodeJS khác nhau sẽ có Memory được cấp phát khác nhau, ở Version NodeJS v.12.x đang có cấu hình mặc định là ~**2GB**

‘Total heap size’ ở trên chính là heapTotal, là **Memory tối đa** được cấp phát cho ứng dụng NodeJS, vậy câu hỏi đặt ra là: *Chúng ta có nên thay đổi cấu hình mặc định? Nếu thay đổi, thì con số bao nhiêu là tốt nhất* :thinking:? <br>
Trước khi trả lời các câu hỏi trên, chúng ta cần điểm qua một vài khái niệm để giúp bạn có thể nhìn ở một góc độ tổng quát hơn(nếu bạn nào không quan tâm lý thuyết thì có thể next sang phần thực hành [*cấu hình tiếp theo*](https://viblo.asia/p/noi-dep-nhat-chinh-la-noi-phu-hop-nhat-va-cau-chuyen-giua-anh-chang-nodejs-va-co-nang-v8-4dbZNNOLZYM#_xuong-nui-thinh-kinh-3))


![Stack V8 Engine](https://paper-attachments.dropbox.com/s_D742368F1CB599228FE32BB246C3BFCA6BA515490E27467C29D3D01C1049F11A_1611328508128_kSgatSL.png)


Heap Memory V8 gồm 2 thành phần chính: **NewSpace** và **OldSpace**. 

- **NewSpace**: là nơi lưu trữ hầu hết objects và được quản lý bởi bộ Scavenger GC (có thể hiểu đơn giản như một bộ thu hồi rác, và diễn ra với tần suất cao). Trong NewSpace có 2 Semi-Space (giống như s0, s1 trong JVM).
- **OldSpace**: là nơi chứa các pointer tham chiếu đến các object khác (bỏ qua nếu bạn không hiểu, chúng ta sẽ làm rõ phần này ở bài **Trái tim rỉ máu khi bạn không hề quan tâm Garbage Collection trong Node? 💔**) và được thu gom bởi Mark-Sweep GC (tần suất thấp, nhưng chắc chắn và dọn toàn diện…)

Tới đây mình đã rất phân vân, không biết có nên để những phần lý thuyết trên diễn ra trong bài viết mình hay không. Nhưng tóm gọn bạn chỉ cần quan tâm các lưu ý từ bộ Heap Memory V8, như sau:

| NewSpace | OldSpace |
| -------- | -------- |
| **Scavenger** GC (bộ thu hồi rác #Lao-Công-A)     | **Mark-Sweep** GC (bộ thu hồi rác #Lao-Công-B)     | 
| #Lao-Công-A<br><br>- Lau nhiều lần trong ngày(1 khoảng thời gian nào để đo lường)<br>- Lau **nhanh**|#Lao-Công-B<br><br>- Lau với **tần suất ít hơn #A**<br>- Lau **Chậm**|

# Xuống Núi Thỉnh Kinh
Vậy Garbage(Rác) ở đây là gì, Project chúng ta có đang tồn tại rác mà bài viết đang đề cập?
Mình sẽ đề cập chuyên sâu về Garbage Collection trong những bài sau của Series, nhưng có một ví dụ minh họa sẽ giúp bạn dễ hình dung ra Garbage như sau:

```javascript
let users = [];
app.post('/users', (req, res) => {
    let newUser = req.body;
    users.push(newUser);
    //...more...
});
```

Bingo :stuck_out_tongue_winking_eye:, bạn không lầm đâu, trên là 1 ví dụ mà mình nghĩ đa số AE thấy nó rất bình thường, nhưng đó là vấn đề rất đáng để quan tâm khi mỗi request Heap sẽ cấp phát một vùng nhớ mới để lưu trữ và đối tượng users sẽ tồn tại mãi mãi, và đến khi hệ thống không còn đủ Memory để cấp phát, App sẽ Crash💔,

![quá trình cấp phát vùng nhớ trong function PUSH (javascript)](https://paper-attachments.dropbox.com/s_D742368F1CB599228FE32BB246C3BFCA6BA515490E27467C29D3D01C1049F11A_1611415103986_array.png)


 Giải pháp ở đây, chúng ta chỉ cần clear đối tượng, và trong javascript chúng ta có thể clear đơn giản như sau:
```javascript
let users = [];
app.post('/users', (req, res) => {
  let newUser = req.body;
  users.push(newUser);
  //...more...
  users = null; //<= here
});
```

 Hoặc **hạn chế cache** hoặc dùng các biến **Global** mà không kiểm soát chặt chẽ.

Quay lại câu chuyện #2-Anh-Lao-Công . NodeJS cấp phát **64MB** cho NewSpace(mặc định), nhưng với  Scavenge GC, chỉ một nửa 64MB được dùng (**= 32MB**). Như vậy, trong một thời gian dài phát triển, các ứng dụng chúng ta trở nên **lớn và số lượng các objects trong chương trình tăng dần** dẫn đến ngưỡng kích hoạt GC. <br>
→ Khi GC (Scavenger GC) được kích hoạt nó sẽ thực thi với tần số lớn, sẽ dẫn đến việc ứng dụng chúng ta sẽ có thêm độ trễ từ những lần thực thi bởi GC.

Vậy giải pháp ở đây chính là tăng giới hạn Memory cho NewSpace, và rất may NodeJS cũng đã hỗ trợ flag: ‘**--max-semi-space-size**’ để giúp chúng ta linh động cấu hình dễ dàng, bạn cũng có thể theo dõi thêm danh sách flag V8 mà Node hỗ trợ tại đây

```javascript
node --max-semi-space-size=128 app.js
```

Tại sao là **128MB** mà không phải là 1 con số lớn hơn, *nếu semi-space càng lớn thì app sẽ có hiệu năng càng tốt* :thinking:? <br>
 Mình đã xem qua các bài phân tích và cũng đã thử nghiệm trên chính các ứng dụng NodeJS của mình và thấy rằng **128MB** là con số phù hợp đại đa số các ứng dụng mình triển khai. Ở đây có một quy luật bạn cần nắm, đó chính là
 
**‘Số lượng diễn ra GC giảm khi ta tăng bộ nhớ lên (64MB mặc định -> 128MB), nhưng thời gian delay của từng GC cũng tăng lên.’**
<br> Vì vậy, việc thiết lập semi-space không tồn tại khái niệm **TUYỆT ĐỐI**, mà đó là việc đánh đổi chọn lựa ưu tiên cho từng ứng dụng của bạn.
 
Tới đây, chúng ta có thể trả lời cho những câu hỏi mà ta đã đặt ra ở đầu bài. 
1. Chúng ta có nên thay đổi cấu hình mặc định ? <br>
 → Cấu hình mặc định, là điểm tương đồng cho hầu hết các ứng dụng NodeJS mà đội ngũ phát triển NodeJS họ đã quan sát đưa ra. Hiện tại là NodeJS ver12.x **2GB được cấp phát cho OldSpace và 64MB cho NewSpace(Young Generation)**.
2.  Nếu thay đổi, thì con số bao nhiêu là tốt nhất? <br>
   **Thay vì bạn mong muốn là 1 bản sao của một người khác, hãy biến mình trở thành phiên bản tốt nhất của chính bản thân mình**. <br>
→ Điểm mấu chốt mình muốn đề cập ở đây là thay vì chúng ta đi tìm con số trong vô thức, thì hãy lên kế hoạch để đo lường và quan sát (**Stress Test + CPU Profile**) để tìm ra con số phù hợp nhất cho ứng dụng của mình.

Tương tự như phần **NewSpace**, tại vùng **OldSpace**(Old Generation) cũng có thể điều chỉnh qua flag: ‘**--max_old_space_size**’, Vẫn với các bước làm trên, bạn có thể điều chỉnh để có một ứng dụng đã được xử lý tốt ở phần Memory cho ứng dụng.

Như ở mục trên mình đã đề cập, **OldSpace** là vùng chứa các đối tượng và nơi có không gian lưu trữ **lớn nhất** trong Heap V8, nên khi cấu hình bạn nên hạn chế cấu hình **OldSpace quá thấp**, vì nó sẽ dẫn đến lỗi dưới đây:
```javascript
    [md5:]  241613/241627 97.5%  
    [md5:]  241614/241627 97.5%  
    [md5:]  241625/241627 98.1%
    Creating missing list... (79570 files missing)
    Creating new files list... (241627 new files)
    <--- Last few GCs --->
    
    11629672 ms: Mark-sweep 1174.6 (1426.5) -> 1172.4 (1418.3) MB, 659.9 / 0 ms [allocation failure] [GC in old space requested].
    11630371 ms: Mark-sweep 1172.4 (1418.3) -> 1172.4 (1411.3) MB, 698.9 / 0 ms [allocation failure] [GC in old space requested].
    11631105 ms: Mark-sweep 1172.4 (1411.3) -> 1172.4 (1389.3) MB, 733.5 / 0 ms [last resort gc].
    11631778 ms: Mark-sweep 1172.4 (1389.3) -> 1172.4 (1368.3) MB, 673.6 / 0 ms [last resort gc].
    
    
    <--- JS stacktrace --->
    
    ==== JS stack trace =========================================
    
    Security context: 0x3d1d329c9e59 <JS Object>
    1: SparseJoinWithSeparatorJS(aka SparseJoinWithSeparatorJS) [native array.js:~84] [pc=0x3629ef689ad0] (this=0x3d1d32904189 <undefined>,w=0x2b690ce91071 <JS Array[241627]>,L=241627,M=0x3d1d329b4a11 <JS Function ConvertToString (SharedFunctionInfo 0x3d1d3294ef79)>,N=0x7c953bf4d49 <String[4]\: ,\n  >)
    2: Join(aka Join) [native array.js:143] [pc=0x3629ef616696] (this=0x3d1d32904189 <undefin...
    
    FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
     1: node::Abort() [/usr/bin/node]
     2: 0xe2c5fc [/usr/bin/node]
     3: v8::Utils::ReportApiFailure(char const*, char const*) [/usr/bin/node]
     4: v8::internal::V8::FatalProcessOutOfMemory(char const*, bool) [/usr/bin/node]
     5: v8::internal::Factory::NewRawTwoByteString(int, v8::internal::PretenureFlag) [/usr/bin/node]
     6: v8::internal::Runtime_SparseJoinWithSeparator(int, v8::internal::Object**, v8::internal::Isolate*) [/usr/bin/node]
     7: 0x3629ef50961b
```

 Vậy giải pháp để xử lý lỗi trên là **tăng Memory** cho vùng OldSpace để đảm bảo việc lưu trữ các objects vẫn đảm bảo:
 
```javascript
node --max-old-space-size=1024 index.js #increase to 1gb
node --max-old-space-size=2048 index.js #increase to 2gb
node --max-old-space-size=3072 index.js #increase to 3gb
```
Với mình, nếu bạn *sử dụng máy chủ với **2GB**, bạn chỉ nên set OldSpace với **1.5GB***, <br>
Vì nếu bạn cấp phát tối đa resource của máy chủ, nó sẽ dẫn đến việc OS sẽ kill đi các *process khác(random), swap, hoặc rò rĩ bộ nhớ*, … và điều này là cơn ác mộng thật sự :scream:. <br> 

Đây chỉ là nói về NodeJS xung quanh cấu hình V8, ngoài ra tại máy chủ các bạn còn quan tâm đến các process khác. 
Và việc nhiều process hoặc service nằm cùng trên một máy chủ sẽ dẫn đến tình huống mất kiểm soát, và thật sự rất khó để suy diễn được nguyên nhân gốc. Đó cũng là lý do mình đã tách các Service: ***NodeJS Application, MongoDB, Redis, ElasticSearch***, … ra trên các **host khác nhau**. 
<br>
Tin tôi đi :frowning_face: , điều này sẽ rất hiệu quả trong quá trình kiểm soát các resource máy chủ.
Tới đây vẫn mong AE còn đủ tỉnh táo để …………….. :clap::clap::clap: Upvote cho mình đấy mà. Hi vọng ACE có thêm một vài góc nhìn và lưu ý cho những dự án sắp tới của mình. 
<br>
<br>
Bingo :stuck_out_tongue_winking_eye:, hẹn gặp lại các bạn trong những bài viết tiếp theo trong Series [*NodeJS và những câu chuyện tối ưu Performance*](https://viblo.asia/s/nodejs-va-nhung-cau-chuyen-toi-uu-performance-RNZqg86G50n).