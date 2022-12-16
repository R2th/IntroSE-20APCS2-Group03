Hãy cùng khám phá vài điều thú vị về Javscript cùng 8 phương trình vô cùng thú vị sau đây. Nếu cảm thấy bài viết này có chút kì lạ, bạn có thể mở Chrome Developer Console bằng thao tác: (Windows: Ctrl + Shift + J)(Mac: Cmd + Option + J). Hãy thử type theo các đoạn code sau và xem kết quả nhé.

![](https://images.viblo.asia/d3f43aa4-8686-430a-9bbe-9b11525b258f.jpeg)

**3 + true == 4**

Không đùa đâu. Trong Javascript, khi đặt một toán tử cộng giữa một number và một boolean, thì boolean đó sẽ được convert thành number.
Nếu set false == 0 và true == 1, nghĩa là 3 + true sẽ thành 3 + 1 và chúng ta có tổng là 4

true + false
Tương tự như phần trên, khi một toán tử cộng được đặt giữa hai booleans, thì hai booleans đó sẽ được convert thành hai numbers. Và chúng ta có: true + false thành 1 + 0 = 1

**'4' + 8**

Chuyện gì sẽ xảy ra khi gộp một string number với một số thực. Khi toán tử cộng được đặt giữa hai toán hạng, trong đó có một chuỗi, thì nó sẽ convert number hay boolean còn lại thành một chuỗi và gộp lại với nhau.
Theo logic trên ta sẽ có: '4' + 8 thành '4' + '8' và output sẽ là '48'.

**true + '4'**

Tương tự như trên, JS sẽ convert boolean thành một string value và gộp chúng lại. Như vậy sẽ là 'true' + '4' và out là 'true4'.

**1 + 1 + '1'**

Thứ tự của các phép toán khá quan trọng. Trong tình huống này, JS sẽ xét theo phép cộng đầu tiên theo thứ tự từ trái sang phải, nghĩa là: 1 + 1 = 2. Sau đó sẽ xét đến string value '1' ở đằng sau. Như vậy ta sẽ có kết quả như sau:
```
1 + 1 + '1'
    2   + '1'
                '21'
```

**'1' + 1 + 1**

Thay đổi string value '1' lên đầu thay vì đổi xuống cuối. Nên nhớ rằng thứ tự của các phép toán luôn tính từ trái sang phải. Và ta có kết quả:
```
'1' + 1 + 1
       '11' + 1
                '111'
```

```
string + number = string
```


**-'90' + 90**

Nếu là một chuỗi phủ định kết hợp với một number thì sao? Nếu không có dấu trừ ở đằng trước string value, thì đã có output là '9090'. Tuy nhiên dấu trừ này đã làm thay đổi mọi thứ. Dấu trừ trước '69' sẽ tương ứng với một toán tử trừ và nó sẽ convert string thành một số âm. Theo đó sẽ là: -90 + 90 và output trả về là 0.

**-'idontknow' + 109**

Nếu đặt một toán tử trừ trước một string value thì sao. JS sẽ không thể convert trường hợp này thành number, và do đó chúng ta có kết quả là NaN (Not a number)

Bài viết tham khảo: [Link](https://codeburst.io/javascript-why-does-3-true-4-and-7-other-tricky-equations-9dd13cb2a92a)