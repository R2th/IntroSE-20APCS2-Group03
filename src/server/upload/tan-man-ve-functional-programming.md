> Vài năm gần đây thì Functional Programming (FP) nổi lên như cồn, nhà nhà nói về FP, người người nói về FP.  Nào là FP để có một hiệu suất cao hơn, nào là FP sẽ là tương lai thay thế OOP, bla bla. Ế vậy thì OOP có tội tình gì mà bị hắt hủi vậy, hay đây lại là 1 vụ drama như kiểu "nosql sắp giết chết sql r".
> 

### Cái vấn đề của thằng OOP

Mọi sự bối rối, đau đầu thực ra cũng chỉ từ cái "state" mà ra và ở OOP thì việc dùng "state" nó đơn giản như thở vậy.
```
var x = 3;  // state của x là 3
x++;        // state của x giờ lại là 4
```
Cái việc chỉnh sửa "state" như này chả có gì nguy hiểm, rủi ro nguy hiểm là đến từ con người, và cái tôi muốn để cập ở đây là:

```
// 1. side effect
function saveFileToDisk(file) {
    var compressedFile = reduceFileSize(file);
    console.log('file saved');
    saveToDisk(compressedFile);
}

// 2. concurrency
// Thread A:
var x = 3;
x = 'foo';

// Thread B:
addOne(x);  // tưởng tượng thread A chạy trước, oops!
```
Nói ngắn gọn: "state is the root of all evil"!

### Tại sao lại đi chỉnh sửa state?

Một sự thật thú vị là FP lại ra đời trước OOP, cùng sinh ra từ thế kỉ 20 nhưng một đứa 3x một đứa 6x. Tức là, FP sinh ra cũng với thửơ sơ khai của máy tính và OOP lại được tạo ra để "khắc phục" yếu điểm của FP. Cái yếu điểm đó, nó chính là: RAM! FP khá là ngốn RAM.
```
// 1 dí dụ ngốc nghếch để giải thích về bộ nhớ
// giả sử ta muốn in ra 2 số 6 và 9, ở đây ta sử dụng 2 unit của RAM
var x = 6;
var y = 9;
console.log(x);
console.log(y);

// và đây là cách ta làm với OOP, bằng việc allocate lại 1 unit của RAM, ta ko cần phải dùng tới unit thứ 2
var x = 6;
console.log(x);
x = 9;
console.log(x);
```

Nghiêm trọng không? Có chứ! Hồi xửa RAM khá là tốn kém, từ đầu những năm 2000 nhà thánh nào có RAM 512 là oách xà lách nhất r. Tuy nhiên, giờ RAM nó bán theo kit 16, 32 GB mà ai ai cũng mua được.

### Ừ thế ta làm gì với cái "trend FP" này?

Nếu phải chọn giữa độ phức tạp và độ ngốn RAM, thì tất nhiên là tôi sẽ vồ ngay lấy cái thà ngốn RAM mà đỡ đau đầu, sống đơn giản cho đời nó thảnh thơi (nói nhỏ một chút chứ giờ CPU cũng đang bão hoà, người ta thêm số lõi chứ không kéo xung nhịp lên là mấy nữa, tức muốn  trình chạy nhanh hơn thì chỉ có code cho nó chạy multithread, mà multithread thì cạch mặt bọn OOP, chỉnh sửa state hoài chắc debug toang não =))). Nói vậy chứ, chốt lại thì vẫn là, hãy code theo cái server của bạn. Máy trâu hung hãn thì không ngại gì mà dùng FP để giảm bớt logic chỉnh sửa state đi cho đỡ lắm bug cả. Và máy móc oặt oẹo thì cũng không dại mà refactor code các thứ sang FP!

P/s: mà đúng là với cái tốc độ phát triển của phần cứng như vầy thì bảo rằng FP là tương lai, cũng chẳng sai.