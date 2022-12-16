Gần đây mình có đọc một bài viết khá thú vị được viết cách đây 13 năm của Imran Ghory - partner của Blossom Capital. Trong bài viết ông ấy nói rằng ổng đã từng chứng kiến nhiều người được phỏng vấn có bằng cấp xịn xò về khoa học máy tính, IT, ... những người này mặc dù có vốn hiểu biết sâu rộng trong ngành, nắm rõ hết các lý thuyết nhưng lại có rất ít kinh nghiệm về coding thực tế. Việc tuyển dụng một Dev là một việc không hề đơn giản, mình không nghĩ việc hỏi những câu hỏi phức tạp, lằng nhằng, yêu cầu suy nghĩ quá nhiều thời gian là một cách hay để tuyển người,  cũng như là việc phủi tay để tuyển những người "có thể" sẽ làm được việc. Để giải quyết vấn đề này thì ông Imran đã đưa ra một bài test đơn giản để đảm bảo người tìm việc ấy có thể thật sự code hay không, make sense đúng không ? Bài toán ông đưa ra như sau: 

> Hãy viết một đoạn code có thể chơi một trò chơi của trẻ con tên là Fizz Buzz. 

## Fizz Buzz là trò gì ?

Fizz Buzz (không rõ tên văn phòng của công ty mình có được lấy từ đây hay không :v ) là một trò chơi cực kì đơn giản, trong trò chơi này, một nhóm trẻ ngồi trong một nhóm và đếm từng số theo thứ tự (1,2,3,4, ... ) , nếu số đó là bội số của ba thì thay vì đọc số, chúng sẽ phải nói "Fizz", hoặc năm thì phải nói là "Buzz". Nếu một số là bội số của cả ba và năm thì sẽ phải nói là "Fizz-Buzz". Chuỗi số kết quả sẽ là: 

> 1, 2, Fizz, 4, Buzz, Fizz, 7, ... 14 , FizzBuzz , 16 

Đơn giản mà, đúng không ?

Bài toán này trong buổi phỏng vấn sẽ có dạng sau: 

> Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.

Hay
> Viết chương trình in ra các số từ 1 đến 100. Nhưng đối với bội số của 3 thì in ra "Fizz" và cho bội số của 5 thì in ra Buzz thay vì in số hiện tại. Đối với các số là bội số của cả 3 và 5 thì in "FizzBuzz".

Một bài khá đơn giản nên chắc bất cứ ai tham gia phỏng vấn đều có thể pass bài này được đúng không ? :)

Đây là một bài test cực kì hay vì một vài lý do sau: 

Đầu tiên là bài test này có CỰC KÌ nhiều cách để tiếp cận và giải quyết vấn đề. Tẹo mình sẽ show thử một vài cách, và chắc chắn là các bạn đang đọc cũng có thể viết được cả đống cách khác nhau. Cách mọi người tiếp cận vấn đề và cách họ xử lý vấn đề sẽ cung cấp cho ngừoi phỏng vấn một cái nhìn rõ nhất về cách tư duy cũng như kiểu lập trình của từng người. Họ sẽ cố nhồi nhét tất cả logic vào đoạn code cho nó chạy rồi sau đấy mới bắt đầu fix bug và sửa lại code (như mình vẫn hay làm (dab)) hay họ sẽ lên trước kế hoạch và tính toán những vấn đề có thể xảy đến trong tương lai .

Bên cạnh đó, FizzBuzz còn chứa một vấn đề khá khó để có thể thể hiện đẹp đẽ sạch sẽ trong code, đó là phải check nhiều điều kiện. Nếu số hiện tại chia hết cho 3 thì làm 1 việc A, nếu chia hết cho 5 thì làm việc B, nếu chia hết cho cả hai thì lại làm một việc C, còn lại thì làm một việc khác ...

![](https://images.viblo.asia/dbc18a88-ac7a-4f38-8776-608662fdfa32.png)

Mới nghĩ đến thì chắc hẳn bạn cũng chưa thể dịch ngay ra code được phải không ? 

Vậy sau đây mình sẽ chỉ cho các bạn cách tiếp cận nhồi nhét logic rồi fix dần :D

## Code thối

Ở đây mình sẽ dùng JavaScript cho dễ hiểu nhé:

Việc đầu tiên mình sẽ làm là viết một vòng lặp chạy 100 lần:

```javascript
for (var i = 1; i <= 100; i++) {
    // đoạn code trong này sẽ chạy 100 lần. 
    // qua mỗi vòng lặp i sẽ được tăng lên 1.
    // truyền thống là dùng biến i trong vòng lặp, mình cũng chả hiểu sao, chắc là viết tắt của index :v
}
```

Sau đấy chúng ta cần dùng cái gì đó để output ra kết quả. Trong JavaScript thì chúng ta có thể dùng `console.log()`  để output kết quả ra console, trong các ngôn ngữ khác hay hiển thị ở website thì bạn có thể dùng bất cứ cái gì để output cũng được. Để in ra giá trị của `i`, chúng ta sẽ viết như sau: 

```javascript
for (var i = 1; i <= 100; i++) {
    console.log(i)
}
```

Chạy thử thì đoạn code của chúng ta sẽ có output:

```javascript
1
2
3
4
...
99
100
```

Theo đề bài thì chúng ta phải cho hiển thị Fizz hoặc Buzz khi thoả mãn điều kiện. Do đó chúng ta sẽ nhét chúng vào câu lệnh `if` nhé: 

```javascript
for (var i = 1; i <= 100; i++) {
  if (i % 3 == 0) { // nếu i chia hết cho 3
    console.log('Fizz'); // thì in Fizz
  }
  
  if (i % 5 == 0) { // nếu i chia hết cho 5
    console.log('Buzz'); // thì in Buzz
  }

  if ((i % 3 != 0) && (i % 5 != 0)) { // nếu không chia hết cho cả 3 và 5
    console.log(i); // thì in giá trị của i
  }
}
```

Output

```javascript
1
2
Fizz
4
Buzz
...
14
Fizz // ở 15 thì lại không in ra FizzBuzz mà lại là Fizz rồi mới Buzz
Buzz // Hai dòng khác nhau, cho nên sai rồi nhé :v
16
...
```
Sai rồi thì fix thôi, nào cùng nhét thêm một đống điều kiện nữa nhé.

```javascript
for (var i = 1; i <= 100; i++) {
  if ((i % 3 == 0) && (i % 5 != 0)) { // nếu chỉ chia hết cho 3 nhưng không chia hết cho 5
    console.log('Fizz'); // thì in Fizz
  }

  if ((i % 3 != 0) && (i % 5 == 0)) { // nếu chỉ chia hết cho 5 nhưng không chia hết cho 3
    console.log('Buzz'); // thì in Buzz
  }

  if ((i % 3 == 0) && (i % 5 == 0)) { // nếu chia hết cho cả 3 và 5
    console.log('FizzBuzz'); // thì in FizzBuzz
  }

  if ((i % 3 != 0) && (i % 5 != 0)) { // nếu không chia hết cho cả 3 và 5
    console.log(i); // thì in giá trị của i
  }
}

```

Code thối kinh khủng :< , code lặp đi lặp lại như thế này chính là biểu hiện đầu tiên của code lởm. Qúa cồng kềnh, khó đọc khó maintain mặc dù nó đã đáp ứng được yêu cầu bài toán. 

Chúng ta refactor lại chút nhé.

## Thử Refactor

Chúng ta có thể dùng đến cụm câu lệnh `if()...else if()...else`  để cho gọn lại nhé:

```javascript
for (var i = 1; i <= 100; i++) {
  if ((i % 3 == 0) && (i % 5 == 0)) { // nếu chia hết cho cả 3 và 5
    console.log('FizzBuzz'); // thì in FizzBuzz
  } else if (i % 3 == 0) { // nếu chỉ chia hết cho 3
    console.log('Fizz'); // thì in Fizz
  } else if (i % 5 == 0) { //nếu chỉ chia hết cho 5
    console.log('Buzz'); // thì in Buzz
  } else { // trong trường hợp còn lại thì in giá trị của i
    console.log(i);
  }
}
```

Cách này đã ngắn hơn nhiều, tuy nhiên mình vẫn chưa ưng lắm. Nếu bây giờ có yêu cầu muốn thay đổi từ 5 -> 7 thì sao ? Đây thường sẽ là câu hỏi ngay sau khi bạn đưa ra đáp án này cho ngừoi phỏng vấn. Mình sẽ phải luôn nhớ là phải sửa tất cả các số 5, đối với đoạn code nhỏ thế này thì không phải là vấn đề, tuy nhiên với một hệ thống lớn hơn thì việc thay đổi như thế này là một việc không hề được khuyến khích. Lý tưởng nhất thì bạn không nên lặp lại một điều kiện nhiều lần, hay đơn giản là DRY (Don't Repeat Yourself).

Vậy thì chúng ta nên làm như thế nào ?

## Cách của mình

Đây là cách mà mình làm:

Đầu tiên mình sẽ tạo ra một biến `output` chỉ chứa một string rỗng, biến này sẽ được dùng để chứa giá trị cần output.

```javascript
var output = '';
```

Sau đó mình check điều kiện nếu chia hết cho 3 thì mình add thêm 'Fizz' vào string `output`, tương tự với điều kiện chia hết cho 5. Đây là hai điều kiện riêng biệt nhau, nên khi chúng cùng đúng, tức là chia hết cho cả 3 và 5 thì sẽ có string 'FizzBuzz'.

```javascript
if(i % 3 == 0) output += 'Fizz'
if(i % 5 == 0) output += 'Buzz'
```

Và cuối cùng mình sẽ không kiểm tra lại giá trị của `i` nữa mà mình sẽ check nếu output rỗng thì trả về `i`, không thì trả về `output`.

```javascript
for (var i = 1; i <= 100; i++) {
  var output = '';

  if(i % 3 == 0) output += 'Fizz'
  if(i % 5 == 0) output += 'Buzz'

  console.log(output || i);
  // console.log() hỗ trợ truyền block vào tham số của nó nên mình truyền biểu thức || vào làm tham số.
  // biểu thức || ở đây có nghĩa là nếu output không rỗng thì lấy chính nó, nếu không thì lấy i.
}
```

Đoạn code này hoàn toàn có thể sử dụng được với mọi con số khác mà bạn có thể nghĩ tới. Thêm 7, 10, 11, ... đều được hết, chỉ việc copy câu lệnh `if` ấy thôi, chứ nếu làm theo kiểu `if..else` thì đúng là ác mộng.

```javascript
for (var i = 1; i <= 100; i++) {
  var output = '';

  if(i % 3 == 0) output += 'Fizz'
  if(i % 5 == 0) output += 'Buzz'
  if(i % 7 == 0) output += 'Fuzz'
  if(i % 10 == 0) output += 'Bizz'
  // ...
   
  console.log(output || i);
}
```

Mình biết là vẫn sẽ có nhiều cách còn đỉnh hơn nhiều, có khi còn dùng one line cơ. Nếu các bạn có cách nào thì thoải mái comment bên dưới nhé (bow). 

## Tổng kết

Theo mình nghĩ thì vẫn có nhiều công ty trên thế giới vẫn dùng cách này để phỏng vấn và tuyển dụng. Bên cạnh ấy còn rất nhiều bài toán kiểu dạng như này, thứ mà không được học ở trường lớp hay trên mạng mà chủ yếu dựa vào cách tiếp cận và giải quyết vấn đề của cá nhân bạn. 

Mình vẫn thuộc thể loại mò mẫm rồi nhét hết logic vào code, sau đấy mới refactor lại cho đến khi cảm thấy đủ ổn (dab). Nhưng tốt nhất đừng code thối quá, ông Dev maintain code của bạn sẽ cáu lắm đấy. 

Cảm ơn các bạn đã đọc. Bạn có solution nào hay hơn thì cứ thoải mái comment để chia sẻ nhé (bow)

Bài viết của Imran Ghory: https://imranontech.com/2007/01/24/using-fizzbuzz-to-find-developers-who-grok-coding/ 

Cách giải bài toán FizzBuzz với nhiều ngôn ngữ khác nhau: http://rosettacode.org/wiki/FizzBuzz