Hello các bạn, lại là mình đây. Chào mừng quay trở lại với series của mình hehe :grin::grin:
Well..đối với câu hỏi lần này thì có vẻ khá thú vị mà câu hỏi nào trong CodeSignal chẳng thú vị :rofl::joy:  
Mình sẽ để link của câu hỏi ở đâu [CodeSignal - INTRO - Edge of the Ocean 4/8 ](https://app.codesignal.com/arcade/intro/level-2/xzKiBHjhoinnpdh6m)  
### Câu 4: Given an array of integers, find the pair of adjacent elements that has the largest product and return that product.


-----

![](https://images.viblo.asia/e9cc871d-b899-4daa-954a-c85330533212.PNG)


-----

### Dịch nôm na là: Cho một mảng các số nguyên, tìm cặp phần tử liền kề có sản phẩm lớn nhất và trả về sản phẩm đó. hihi
> Hiểu đơn giản là đi tìm max của mỗi cặp trong mảng đó các bạn :laughing:
### Cung cấp các test case:
* [3, 6, -2, -5, 7, 3] => 21
* [-1, -2] => 2
* [5, 1, 2, 3, 1, 4] => 6
* [1, 2, 3, 0] => 6
* [9, 5, 10, 2, 24, -1, -48] => 50
* [5, 6, -4, 2, 3, 2, -23] => 30
* [4, 1, 2, 3, 1, 5] => 6
* [-23, 4, -3, 8, -12] => -12
* [1, 0, 1, 0, 1000] = 0
### Oke, các test case đã có, bây giờ mình đi vào phân tích nào.. 🤓  
> Mình đoán rằng các bạn đã biết cách làm rồi phải không nào?? :grin: Vì độ phức tạp của câu này nó không khó.
> Cách thông thường để giải quyết bài toán này là chạy 1 vòng for rồi chọn từng số trong mảng nhân vào với nhau là ra được kết quả .. quá đơn giản phải không nào :laughing:  
> Đây là lời giải.
```
let adjacentElementsProduct = (inputArray) =>{
    let len = inputArray.length;
    let max = -Infinity;
    for(let i = 0; i < len - 1; i++){
        let largets = inputArray[i] * inputArray[i+1];
        if(max < largets) max = largets;
    }
    return max;
}

```
> Nhưng nếu các bạn nào hiểu rõ đoạn code của mình thì thấy ở đây đoạn code này chưa có được sự tối ưu. Thay vì phải duyệt hết tất cả các phần tử trong mảng thì mình có thể làm như thế này.. vì đây là câu hỏi tìm ra cặp có kết quả lớn nhất khi nhân lại. Nếu như mình **nhân trước phần tử 0 và 1** rồi **đem đi so sánh** với mấy th khác thì sao??  Mình sẽ đặt tên cho cặp đầu tiên tên là **"guard" (lính canh)**
```
let adjacentElementsProduct = (inputArray) => {
    let len = inputArray.length;
    let guard = inputArray[0] * inputArray[1];
    for(let i = 1; i < len - 1; i++){
        let largets = inputArray[i] * inputArray[i+1];
        if(guard < largets) guard = largets;
    }
    return guard;
}
```
> Lúc này đoạn code sẽ giảm đi được 1 bước so với đoạn code trên. Mình có 1 câu hỏi vui cho các bạn.. làm thế nào giảm thiểu đoạn code trên khi chúng ta **gọi hàm adjacentElementsProduct()**.. hihi :laughing: Khá thú vị đấy nhỉ :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: Các bạn cứ thong thả suy nghĩ.. Mình sẽ để đáp án ở dưới.  
> Gợi nhớ: Các bạn còn nhớ **default value** của ES6 trong JavaScript chứ :nerd_face: Đáp án chỗ đó đấy
```
let adjacentElementsProduct = (inputArray, len = inputArray.length, guard = inputArray[0] * inputArray[1]) => {
    for(let i = 1; i < len - 1; i++){
        let largets = inputArray[i] * inputArray[i+1];
        if(guard < largets) guard = largets;
    }
    return guard;
}

```
> Nếu như mình không muốn dùng **câu lệnh if** nữa thì các bạn sẽ làm như thế nào?? Các bạn sẽ khá bất ngờ nếu đấy.. Cứ thong thả suy nghĩ nhé    
> Đáp án đây:
```
let adjacentElementsProduct = (inputArray, len = inputArray.length, guard = inputArray[0] * inputArray[1]) => {
    for(let i = 1; i < len - 1; i++){
        guard = Math.max(guard, inputArray[i] * inputArray[i+1]);
    }
    return guard;
}
```
> Hahaha .. ngạc nhiên lắm phải không. :flushed::flushed: Ở đoạn code trên thì mình dùng hàm **max() trong JavaScript** để tìm ra cặp phần tử có kết quả lớn nhất. Nếu như mình muốn giải quyết bài toán này theo kiểu **One Line Style** ??? :thinking::thinking: Các bạn sẽ giải quyết như thế nào? Hẳn là có vẻ hơi khó vì để giải được theo kiểu **One Line Style** thì các bạn phải nghĩ theo 1 chiều hướng khác để giải
> Code ở đây:
```
let adjacentElementsProduct = (a) => {
    return Math.max(...a.slice(1).map( (x,i) => x*a[i]) );
}
```
> Đừng bất ngờ nhé :flushed::flushed: Mình sẽ giải thích cách hoạt động của nó. Đầu tiên là:  
>  * a.slice(1) => Cắt mảng từ vị trí 1 trở về sau .. nghĩa là bỏ th phần tử đầu tiên .. VD: [3, 6, -2, -5, 7, 3] => [6, -2, -5, 7, 3]
>  * Sau đó **.map( (x,i) => x*a[i]) )** Nghĩa là chúng ta duyệt 1 vòng for và nhân các phần tử .. Các bạn để ý kĩ là **nhân với a[i]** (i có nghĩa là index). Hiểu đơn giản là chúng ta **cắt cái mảng** đó trước thì **nó sẽ sinh ra 1 mảng mới** rồi chúng ta lấy **mảng mới** đi **nhân** lại với **mảng cũ** vì hàm **slice() trả về 1 mảng mới**. Hihi nhưng mà cách này thì **độ phức tạp** của nó **không được tốt lắm** vì chúng ta phải **chạy 2 vòng for liên tiếp** :sweat_smile: Nhưng mà **xì tai** nó đẹp =)))  :rofl::rofl::rofl:  


-----
Tới đây là đã kết thúc bài viết này rồi các bạn :sob::sob: Hẹn gặp các bạn lần sau nhé !!!