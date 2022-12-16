Hi các bạn, chào mừng quay trở lại với series của mình. Nhân tiện thì mình tên là Hoàng Anh. :innocent:  
Okay, trở lại với CodeSignal nào hehe. Với câu hỏi lần này thì cũng có vẻ hay hay :laughing::laughing:  
Vậy câu hỏi là gì?
Mình sẽ để link của câu hỏi đó ở đây: [CodeSignal - INTRO - The Journey Begins 3/3](https://app.codesignal.com/arcade/intro/level-1/s5PbmwxfECC52PWyQ/solutions)  
## Câu 3: Given the string, check if it is a `palindrome`.


-----


![](https://images.viblo.asia/683861c5-7b8c-41c2-b36a-1aa229fd850e.PNG)


-----

## Dịch nôm na là: Cho 1 đoạn chuỗi, kiểm tra xem nó có phải là dãy Palindrome
> Palindrome là dãy mà bạn đọc từ trái sang phải thì y chang như đọc từ phải sang trái. Các bạn có thể xem ví dụ ^^!
### Cung cấp các test case:  
* "aabaa" => true
* "abac" => false
* "a" => true
* "az" => false
* "abacaba" => true
* "z" => true
* "aaabaaaa" => true
* "zzzazzazz" => false
* "hlbeeykoqqqqokyeeblh" => true
* "hlbeeykoqqqokyeeblh"   => true
### Oke, các test case đã có, bây giờ mình đi vào phân tích nào.. 🤓
Để xem nào, theo mình thì đây cũng là một câu hỏi đơn giản.. nhưng chúng ta cũng phải thật hiểu sâu về nó.
> Nếu các bạn thoạt nhìn vào các test case trước mà không tim hiểu kỹ **Palindrome** là ntn thì các bạn sẽ bị dính vào 1 tình huống sau đây. Nhìn vào test case số 1 thì các bạn sẽ thấy có kí tự **"b"** nằm giữa và các kí tự còn lại đều là **"a"**. Nghĩa là "không lẽ đề bài kêu mình đi chia đôi từ vị trí kí tự **"b"** thành 2 group??? :thinking: ([a,a] [a,a])". Nhìn xuống các test case còn lại thì có vẻ nó tương đồng như nhau:
> *  ([a,b] [a,c])  
> * [a]
> *  ([a,b,a] [a,b,a])  
> ...  
> Có vẻ đúng thế thật nhỉ, sau đó các bạn làm mà vẫn không tìm hiểu kĩ **Palindrome** là gì. Nghĩa là các bạn đang làm mù quáng và điều này kéo theo các bạn tốn thời gian để **(suy nghĩ, test, code) x 100**. Nếu thật như vậy thì đây có thể sẽ là đoạn code của bạn:  


-----
```
let checkPalindrome = (inputString) => {
    if(inputString.length === 1)
        return true;
    if(inputString.length % 2 === 0){
        let mid = (0 + inputString.length)/2;
        let right_to_left = inputString.slice(mid, inputString.length);
        let left_to_right = inputString.slice(0, mid)
        return left_to_right === getReverse(right_to_left) ? true : false;
    } else{
        let mid = Math.floor( (0 + inputString.length) / 2);
        let right_to_left = inputString.slice(mid+1, inputString.length);
        let left_to_right = inputString.slice(0, mid);
        return left_to_right === getReverse(right_to_left) ? true : false;
    }
    return false;
}

function getReverse(str){
    return str.split('').reverse().join('');
}
```


-----


![](https://images.viblo.asia/876fa67f-e0cb-4817-a0e4-b6de5baa345a.jpg)


-----

Nhưng nếu các bạn biết chuỗi Panlindrome là gì mà không nhìn và test case thì có thể hướng đi sẽ khác nhiều đấy :nerd_face:
Vậy chuỗi Palindrome là gì??? Là một đoạn chuỗi mà chúng ta đọc từ trái sang phải cũng y chang như đọc từ phải sang trái :speaking_head:
> Nếu như vậy thì đối với các test case thì sẽ ntn?? Hmm chúng ta cùng test thử xem  
> * Nếu chúng ta đọc đoạn chuỗi **"aabaa"** ngược lại thì sẽ như thế nào?? Đáp án là **"aabaa"** nghĩa là chúng nó giống nhau :ok_hand:  
> * Xem thử đoạn **"zzzazzazz"** này xem. Nếu chúng ta đọc ngược lại thì thành **"zzazzazzz"** .. Oh chúng nó khác nhau rồi nghĩa là false  
> Vậy thì cái mấu chốt ở đây là chúng ta đảo lại chuỗi rồi so sánh với chuỗi ban đầu là xong => DONE!  :sunglasses:  
Bây giờ chúng ta sẽ xem đoạn code nó như thế nào??


-----

```
let checkPalindrome = (s) => s === s.split('').reverse().join('');
```


-----
Chà, có vẻ có sự khác biệt nhỉ :rofl::joy::rofl::joy: Như vậy thi các bạn có thể biết rồi đấy. **Code cho ra là 1 điều tốt nhưng cái ý tưởng nó ra sao là điều tốt hơn nhiều**  :+1::+1:. Well, vậy là bài viết của lần này đã kết thúc rồi.. Hẹn gặp các bạn lần khác nhé. :wink::wink: