# Giới thiệu
KIểu dữ liệu trong lập trình giúp cho compiler hoặc intepreter của một ngôn ngữ lập trình có thể biết và xử lý với dữ liệu đó. Ở mức độ cơ bản, chúng ta sẽ thường làm việc với những kiểu dữ liệu như: integer, float hoặc double, string, boolean và array. Cùng tìm hiểu sâu hơn về những kiểu dữ liệu này nhé.
# Kiểu dữ liệu
## Số nguyên (integer)
Kiểu dữ liệu số nguyên là những số không có phần thập phân ở đằng sau. Lấy ví dụ như số 1, 2, 3, 5, 6, 10, 100, 145. Đây là những số nguyên vì những số này không có phần thập phân. Kiểu dữ liệu này thường dùng để tính toán, dùng làm biến đếm hoặc có thể dùng như kiểu logic. Ví dụ như đếm xem số lần thực hiện lệnh A là bao nhiêu lần.
## Số thực (float hoặc double)
Kiểu dữ liệu số thực là những số có phần thập phân ở đằng sau. Lấy ví dụ như 1.25, 189.623, 100.234, 12.47. Đây là những số thực vì có phần thập phân như `.25`, `.623`. Kiểu dữ liệu này thường được dùng để tính là chủ yếu.
## Logic (boolean)
Kiểu dữ liệu logic chỉ gồm có hai giá trị, đúng hoặc sai. Nếu đúng thì giá trị là true và sai thì giá trị là false. Kiểu dữ liệu này thường được dùng trong những mệnh đề điều kiện mà chúng ta sẽ tìm hiểu ở những bài sau. Ví dụ như nếu đúng thì làm việc A, nếu sai thì làm việc B.
## Kí tự (character)
Kiểu dữ liệu kí tự thì gồm từng kí tự một ví dụ như `H`, `e`, `L`, `o`, thường thì kiểu này chúng ta sẽ không dùng nhiều lắm mà chúng ta sẽ dùng kiểu dữ liệu chuỗi nhiều hơn.
## Chuỗi (string)
Kiểu dữ liệu chuỗi là một mảng gồm nhiều các kí tự. Những kí tự như `H`, `e`, `l`, `l`, `o` khi được xâu lại thành một mảng thì chúng ta thường hay gọi là chuỗi `Hello`. Kiểu này chúng ta đã được làm quen khá nhiều ngay từ những bài đầu tiên. Khi chúng ta in ra `Hello World` hay là gán giá trị `John Doe` cho biến `myName` thì chúng ta đang sử dụng những giá trị có kiểu dữ liệu là chuỗi.
## Mảng (array)
Kiểu dữ liệu mảng là kiểu chứ nhiêu giá trị và có index cho mỗi giá trị đó. Ví dụ như mình có một mảng gồm tên tất cả thành viên trong lớp gồm có (ở trên là giá trị và ở dưới là index tương ứng, index của mảng bắt đầu đếm bằng 0):

`|John Doe|Jane Doe|Ai Doe|Bizz Doe|` 

`-----0--------1------2--------3----`
# Kiểu dữ liệu trong PHP
Sau khi tìm hiểu tổng quan về những kiểu dữ liệu chúng ta sẽ thường gặp ở mức độ cơ bản thì trong phần này, chúng ta sẽ tìm hiểu về những kiểu dữ liệu ở trong PHP. Trước khi vào vấn đề thì tại sao lại có 2 phần, kiểu dữ liệu và kiểu dữ liệu trong PHP? Không phải ngôn ngữ lập trình nào cũng có nhiêu đó kiểu dữ liệu hả? Cơ bản thì có bao nhiêu đó kiểu dữ liệu nhưng mỗi ngôn ngữ lập trình được tạo ra với mỗi mục đích khác nhau. Vì lí do đó, nên kiểu dữ liệu cũng được điều chỉnh cho phù hợp với mục đích của ngôn ngữ lập trình đó. Lấy ví dụ như trong C, kiểu mảng sẽ chặt hơn là chỉ gồm những dữ liệu có cùng kiểu dữ liệu, trong PHP thì đỡ chặt hơn xíu xìu xiu là kiểu mảng có thể chứa nhiều giá trị có những kiểu dữ liệu khác nhau. Do đó sẽ có phần để tìm hiểu xem trong PHP có những kiểu dữ liệu nào nữa.

Trong PHP chúng ta bốn kiểu dữ liệu thuần: 
- Bool
- Int
- Float (aka double)
- String

Bốn kiểu dữ liệu hỗn hợp: 
- Array
- Object 
- Callable
- Iterable

Hai kiểu dữ liệu đặc biệt: 
- Resource 
- NULL

Wow nghe nhiều nhỉ, và một số kiểu dữ liệu hơi lạ, tuy nhiên ở mức độ cơ bản chúng ta chưa cần biết nhiều về những kiểu dữ liệu đó. Những kiểu dữ liệu chúng ta cần nắm vững là int, float, bool, string và array. Vì kiểu string với array sẽ có nhiều phương thức hỗ trợ với cũng hơi phức tạp để hiểu cho nên chúng ta sẽ có phần riêng cho hai kiểu này. Trong bài này chúng ta sẽ chỉ nói và mô phỏng về int, float và bool trong PHP thôi nhé.

## Chương trình tính toán
Đầu tiên đó là kiểu int và float. Trong ví dụ này, chúng ta sẽ viết một chương trình tính toán. In ra kết quả mỗi phép toán và in ra có tất cả bao nhiêu phép toán đã được thực hiện. 
![](https://images.viblo.asia/3a7f15cf-28a4-4969-96ba-6ffb6e5c1758.png)

Mình sẽ giải thích từng dòng để các bạn dễ hiểu. 

Dòng 3 gán giá trị 0 vào biến tên `numberOfCalculation`. Chúng ta cần gán giá trị bằng 0 để chúng ta có thể bắt đầu đếm số phép tính chúng ta thực hiện.

Dòng 5 in ra `Calculation resuls:` và xuống dòng. 

Dòng 6 gán kết quả của hai giá trị, giá trị 10 có kiểu dữ liệu là int và 23.4 có kiểu dữ liệu là float vào biến có tên là `sumTwoNumbers`. Vậy đố bạn biến `sumTwoNumbers` có kiểu dữ liệu là gì? Làm thử phép tính này chúng ta sẽ có kết quả là 33.4 và đây là kiểu float vì có phần thập phân ở phía sau. Cho nên biến `sumTwoNumbers` sẽ là kiểu float.

Dòng 7 gán kết quả của giá trị một có kiểu dữ liệu là int với biến tên `numberOfCalculation`. Vậy biến `numberOfCalculation` có kiểu dữ liệu là gì? Tính thử kết quả ta lấy 1 cộng với giá trị của biến `numberOfCalculation` lúc này là 0, sẽ ra kết quả là 1 và đây là kiển int cho nên biến `numberOfCalculation` sẽ có kiểu dữ liệu là int và giá trị lúc bấy giờ là 1. 

Tương tự cho những dòng sau, mỗi lần thực hiện một phép tính thì chúng ta sẽ tăng giá trị của biến `numberOfCalculation` lên thêm 1. Cuối cùng khi in ra kết quả, chúng ta sẽ thấy được số lần thực hiện phép toán là 3, đúng với những gì chúng ta mong muốn.

Có một cách ngắn hơn khi chúng ta muốn cộng một giá trị nào đó vào một biến có sẵn, thay vì viết `$varName = $varName + 1` chúng ta có thể viết gọn lại `$varName += 1`. Hai cái này là tương đương nhau, chúng ta có thể thay nó bằng giá trị khác ví dụ như `$varName = $varName + 10` . Như vậy, chương trình có thể viết lại như sau: 
![](https://images.viblo.asia/f704aaa4-d2f5-4215-863f-b5687c356a78.png)

Tuy nhiên, đối với việc cộng giá trị 1 vào biến có sẵn, chúng ta còn một cách nhanh hơn nữa đó là thêm hai dấu cộng phía sau tên biến, ví dụ như `$varName++` hoặc đằng trước tên biến `++$varName`. Hai cái này đều có nghĩa là cộng 1 vào biến tên `varName`, hai phép cộng trên có sự khác biệt, tuy nhiên hiện tại chúng ta không cần quan tâm đến sự khác biệt này. Như vậy, chương trình có thể viết lại như sau: 
![](https://images.viblo.asia/2a2f6ccf-da76-4e1f-a2d6-95d5d4dfa358.png)

Có một cách khác in ra màn hình mà vừa có thể check kiểu dữ liệu mà vừa có thể xem được giá trị đó là dùng var_dump. Cùng viết lại chương trình trên sử dụng var_dump để in ra kết quả nhé. Format của kết quả sẽ là kiểu dữ liệu rồi đến giá trị, ví dụ `float(33.4)` thì kiểu dữ liệu là float và giá trị là 33.4, `int(38)` thì kiểu dữ liệu là int và giá trị là 38: 
![](https://images.viblo.asia/9328f7c7-85a0-4589-b8f7-7e984ca0bfb6.png)


## Chương trình bé biết vâng lời
Tiếp theo, chúng ta sẽ viết một chương trình mô tả việc sử dụng kiểu dữ liệu boolean. Trong chương trình này, mình sẽ dùng câu lệnh điều kiện, tuy mình chưa nói đến câu lệnh điều kiện nhưng các bạn không cần phải hiểu nó là gì, mình sẽ giải thích và chú trọng vào kiểu dữ liệu boolean hơn ở trong bài này. Ý tưởng chương trình khá đơn giản, chúng ta viết chương trình để tạo ra một cậu bé biết vâng lời, nên nếu như đúng thì cậu sẽ thực hiện công việc, nếu không thì cậu từ chối hoặc không làm gì cả. Chương trình như sau:
![](https://images.viblo.asia/f82265bb-4a41-4158-8bbe-3abdb138c785.png)
Mình sẽ giải thích từng dòng:

Dòng 3 gán giá trị true có kiểu dữ liệu là bool vào trong biến tên `needToEat` dich ra là `cần ăn`. 

Dòng 5 và 6 nếu `cần ăn` thì in ra `'Eat'` tức là ăn. Giá trị của `cần ăn` hiện tai là true, cho nên sẽ in ra `'Eat'`.

Dòng 7 và 8, ngược lại in ra `'Do not eat'` tức là không cần ăn. Giá trị của `cần ăn` hiện tai là true, cho nên sẽ không in ra `'Do not eat'`.

Dễ dàng thấy là kiểu dữ liệu boolean sẽ được dùng nhiều trong những câu lện điều kiện để đưa ra kết quả, nếu true thì làm cái này, false thì làm cái kia. Cùng thử với giá trị là false xem sao nhé.
![](https://images.viblo.asia/30b8a067-1273-4253-b5b5-66a95cba36a9.png)
## Chương trình kiểm tra kiểu dữ liệu
Một ứng dụng nữa của kiểu boolean đó là cho chúng ta biết một nhận định nào đó đúng hay là sai. Trong chương trình này, chúng ta sẽ nhận định một vài số ngẫu nhiên có phải kiểu int, kiểu float và kiểu bool hay là không.
![](https://images.viblo.asia/1c56d3bc-7714-44a7-ab1e-8feb206daa3f.png)

Đầu tiên là check xem số đó phải kiểu int hay không. Đầu tiên thì sure rồi 1 là kiểu int, kết quả là 1. Khoan đã kết quả một nghĩa là gì, hơi khó hiểu nhỉ. Vậy hãy thử sử dụng var_dump nhé:
![](https://images.viblo.asia/5416456d-d46f-4c9c-a739-d31591d7f02e.png)

Các bạn sẽ thấy format là kiểu dữ liệu xong đến giá trị. `bool(true)` nghĩa là kiểu dữ liệu là bool và giá trị là true, `bool(false)` nghĩa là kiểu dữ liệu là bool và giá trị là false. Nhìn có vẻ dễ hiểu hơn rồi, đầu tiên chỉ có 1 là kiểu int, tiếp theo 1.23 là kiểu float và true là kiểu bool. Các bạn sẽ thấy kết quả của `is_int`, `is_float` và `is_bool` đều là kiểu bool. Dịch ra chúng ta sẽ thấy nó như là một nhận định  `là kiểu số nguyên`, `là kiểu số thực` và `là kiểu logic`. Câu trả lời của chúng ta là kiểu bool thì đơn giản giống như ai đó bảo:

Ai Doe: 1 là kiểu số nguyên? - is_int(1)

Bizz Doe: đúng - true

Ai Doe: 1.23 là kiểu số nguyên? - is_int(1.23)

Bizz Doe: sai - false

Ai Doe: true là kiểu số nguyên? - is_int(true)

Bizz Doe: sai - false

Và đó là một ứng dụng khác của kiểu bool cho biết một nhận định nào đó đúng hay sai.

# Kết luận
Trong bài này chúng ta đã tìm hiểu về: 
- Những kiểu dữ liệu cơ bản
- Những kiểu dữ liệu trong PHP 
- Mô phỏng cách sử dụng và ứng dụng của kiểu dữ liệu int, float và bool qua ba ứng dụng vui vẻ.

Mong là qua bài này, các bạn đã nắm được khái niệm về kiểu dữ liệu cũng như là cách sử dụng kiểu dữ liệu trong PHP.