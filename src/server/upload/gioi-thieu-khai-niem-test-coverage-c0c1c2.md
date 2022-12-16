Bài viết được dịch từ bài viết gốc, dưới sự yêu cầu của tác giả Ishida Hiroaki:

https://viblo.asia/p/tesutokabarejjino-gai-nianno-shao-jie-c0c1c2-3P0lPmLo5ox
## C0/C1/C2 Coverage là gì?

Nếu muốn tìm hiểu khái niệm Test Coverage là gì, mời các bạn hãy đọc các bài viết khác ở Viblo. Trong bài viết này, tôi sẽ chỉ giải thích thêm về các loại test case - C0,C1,C2.
<br> <br> 
Thử suy nghĩ về test case cho đoạn code sau nhé!

```
function hogepiyo(input1, input2) {
	//Conditional branch1
	if (input1 > 10) {
		//Process1
	} else {
		//Process2
	}

	//Conditional branch2
	if (input1 % 2 == 0 || input2 % 3 == 0) {
		//Process3
	} else {
		//Process4
	}
}

```

## C0: Tỉ lệ bao phủ câu lệnh (Command coverage ratio) (Statement coverage) ## 
Việc bao phủ test toàn bộ các process ( câu lệnh) được gọi là C0.<br> <br> 
Ta sẽ quan tâm đến các process, và tạo ra test case bằng các điều kiện sao cho tất cả các process đều được thực hiện trên 1 lần. Như trong đoạn code phía trên, để viết được test case thỏa mãn C0, thì tối thiểu các Process1, Process2, Process3, Process4 đều phải trải qua test 1 lần trở lên. 
<br> <br> 
Ví dụ,

* Với input1=12, ta kiểm tra Process1 và Process3
* Với input1=9, ta kiểm tra Process2 và Process4

Bằng việc test với 2 mẫu trên, ta có thể bao phủ được C0.


| Input condition | Conditional branch1 | Conditional branch2 |
| -------- | -------- | -------- |
| input1=12     | True     | True     |
| input1=9     | False     | False     |

## C1: Tỉ lệ bao phủ nhánh (Branch Coverage)
Việc tập trung vào các nhánh điều kiện, bao phủ việc kiểm tra tất cả các tổ hợp của biểu thức điều kiện, được gọi là C1.<br> <br> 
Ta chú ý đến điều kiện, và tạo ra test case để bao phủ các kết quả đánh giá như True/False liên quan đến tất cả các điều kiện. Trong đoạn code mẫu phía trên, để viết test case thỏa mãn C1, cần có 4 tổ hợp như sau: (Process1&Process3), (Process1&Process4), (Process2&Process3), (Process2&Process4)
<br> <br> 
Ví dụ: Nếu kiểm thử với 4 mẫu sau, sẽ thoả mãn C1.
* input1=12
* input1=13
* input1=8
* input1=7

| Input condition | Conditional branch1 | Conditional branch2 |
| -------- | -------- | -------- |
| input1=12     | True     | True     |
| input1=13     | True     | False    |
| input1=8     | False     | True     |
| input1=7     | False     | False    |

## C2:Tỉ lệ bao phủ điều kiện (Condition Coverage)
C2 là việc tập trung vào điều kiện trong nhánh điều kiện, bao phủ test toàn bộ các kết quả điều kiện. Điểm khác với Bao phủ nhánh (C1) là: Cho dù nhiều điều kiện bị ràng buộc với nhau bằng AND hay OR, thì vẫn sẽ được coi như các điều kiện độc lập với nhau.<br> <br> 
Quay lại nhánh điều kiện 2 (Conditional branch2), có 2 điều kiện đang được ràng buộc bởi hàm OR
> input1 % 2 == 0 || input2 % 3 == 0
<br>  Ở C1 thì 2 điều kiện này được coi như là 1, và xác nhận xem kết quả là True hay False. Nhưng ở C2 thì ta coi đó như những điều kiện tách biệt nhau.
Tóm lại, nếu kiểm thử với các mẫu sau:
* input1=12
* input1=13
* input2=3
* input2=4

thì có thể bao phủ được mẫu thử của nhánh điều kiện mà chứa 2 biểu thức điều kiện này.

Tất nhiên, sau cùng thì vẫn cần phải suy nghĩ đến nhánh điều kiện 1 ( input1>10), nên tổng số test case sẽ là 8.
* Nhánh điều kiện 1(Conditional branch1) có 2 mẫu
* Nhánh điều kiện 2(Conditional branch2) có 4 mẫu
* Conditional branch1 ×　Conditional branch2 = 8 mẫu

| input1 | input2 | Conditional branch1|Conditional branch2<br>(input1%2==0)|Conditional branch2<br>(input2%3==0)|
| -------- | -------- | -------- |-------- |-------- |
| 12     | 3     | True |True|True|
| 12     | 4     |True |True|False|
| 13     | 3     |True |False|True|
| 13     | 4     |True |False|False|
| 8     | 3    |False|True|True |
| 8     | 4   |False|True|False |
| 9     | 3    |False|False|True |
| 9     | 4    |False|False|False|

## Nên test đến phạm vi nào?
Cho dù đạt được độ bao phủ test là 100%, nhưng việc viết test case theo điều kiện nào trong C0,C1,C2 cũng sẽ dẫn đến độ chính xác và số lượng test case khác nhau.
<br> <br> 
Giả sử: đoạn code trên có đoạn sai như sau:

```
//Conditional branch2
if (input1 % 2 == 0 || input2 % 6 == 0) {
                            ^^^
    //Process3
    } else {
    //Process4
    }
}
```
Khi viết test case theo điều kiện C1, nếu kiểm tra bằng các mẫu thử như sau, thì tất các các kết quả đều chạy ra đúng theo kì vọng (mặc dù code sai).
* input1=12 //Process1&Process3
* input1=13 //Process1&Process4
* input1=8 //Process2&Process3
* input1=9 //Process2&Process4

Hơn nữa, độ bao phủ code vẫn đạt 100%. (Nếu test như thế này thì lập trình viên không đạt chuẩn...).
<br> <br> 
Nếu bạn đã đọc đến đây thì chắc sẽ hiểu, trong trường hợp input2=3 , quá trình sẽ không như kì vọng mà phát sinh **bug**. Kết quả là, dù độ bao phủ code là 100% nhưng lại phát hiện ra bug, và tốn công sức để sửa chữa và báo cáo về bug.
<br> <br> 
Khi phát sinh bug, có khả năng phát sinh thêm nhiều thời gian hơn cả thời gian chỉ dành cho điều tra bug, hay sửa chữa bug, nên cần phải tiến hành kiểm thử một cách cẩn thận. Ngoài ra, việc các lập trình viên bàn thảo, thống nhất với nhau nên tiến hành kiểm thử như thế nào, hay sử dụng điều kiện nào trong C0,C1,C2 cũng cực kì quan trọng.