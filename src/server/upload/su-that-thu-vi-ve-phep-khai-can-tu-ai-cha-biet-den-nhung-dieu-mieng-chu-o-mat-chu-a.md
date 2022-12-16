**Note:**
Bài viết có nhiều nhận định cá nhân, sử dụng nhiều phép tưởng tượng ,và mang yếu tố chủ đạo là seeder cho bản thân ^^, mọi gạch đá xi măng đều được trân trọng.

Quay lại thời gian hồi còn đi học, chắc hẳn các bạn đều nhận ra rằng cái gì xuôi thì lúc nào làm cũng dễ hơn là ngược, mấy phép công, phép nhân đều dễ hơn phép chia và phép trừ. Như trường hợp lớp mình ngày xưa, 99% các bạn đều chả hiểu gì về phép trừ và phép chia cho đến khi bị ăn thước vào tay :weary: và mình lại là ngoại lệ ^^ . Với kỷ lục 8 năm liền là trò cưng của các cô dạy Toán, cho đến năm thứ 9 mọi hình tượng xây dựng trong lòng các cô đã sụp đổ vì sau khi thử mọi loại "đồ ăn" mình vẫn chưa hiểu làm sao để tính cái phép khai căn.

Đây các bác xem: 
![](https://images.viblo.asia/46c6b222-cd7d-4f39-8570-c31eedd85bab.png)

<div align="center"> 
    Thế thì Cô có oái oăm không chứ.
</div>

Và sau đó thì mình đã chấp nhận với bản thân là k có công thức tính nào cả, phải học thuộc lòng kết quả của các con số căn bậc hai cơ bản như : $\sqrt{4}$, $\sqrt{9}$... Và nếu phải tính những con số khác thì áp dụng tính chất nhân để làm nhỏ giá trị:  $\sqrt{8}$ = 2 x $\sqrt{2}$ ^^ hoặc là bấm máy tính để lấy kết quả mỗi khi thèm "ăn" gì đó.

Và đó là câu chuyện của 10 năm về trước, giờ đây sau 10 năm đã đến lúc mình báo thù, chắc chắn phải có huyền cơ trong phép tính căn bậc hai chứ, vì con máy tính cầm tay 15 nút của mẹ mình vẫn tính được cơ mà. Và đó là động lực thôi thúc giúp mình "báo thù", mình sẽ tìm ra được cách tính căn bậc hai.

Khi giờ đây mình đã là một thợ code chân chính, với sự giúp đỡ của dàn máy tính toàn RGB tâm huyết thì mình tin là mình sẽ làm được. Và đúng là trời không phụ lòng người "tài" chỉ một vài phút ngồi tĩnh tâm mình đã ngộ ra một bộ "võ công" có thể giúp mình "trả thù" và xưng bá: 

## Phương pháp tính số ở giữa
Thật vậy nếu X = $\sqrt{Y}$ thì X sẽ nằm trong khoảng từ 0 đến Y,  Thử con số ở giữa $\frac{Y}{2}$, tính bình phương nó lên rồi so sánh với Y, nếu nó lớn hơn thì sẽ thử con số tiếp theo trong khoảng  0 đến $\frac{Y}{2}$. lặp lại các lần thử và chọn đến khi chọn được một con số đủ làm đối thủ khâm phục.
```java
public static void GetTheMiddleMethod(double number, double acceptError)
{
   double start = 0;
   double end = number;
   double theMiddle = GetTheMiddle(start, end);

   double times = 0;
   while (Math.Abs(theMiddle*theMiddle - number) > acceptError)
     {
        if (theMiddle*theMiddle > number)
        {
           end = theMiddle;
        }
        else
        {
          start = theMiddle;
        }
                
       theMiddle = GetTheMiddle(start, end);
       times++;
    }
    
  Console.WriteLine(theMiddle);
  Console.WriteLine(times);
}

double number = 10;
double acceptError = 0.00001;
GetTheMiddleMethod(number, acceptError);
```

Và đây là kết quả

`result = 3.1622791290283203/ time = 19` :disappointed_relieved:

19 lần tính toán để ra kết quả với "sai số ảo" 0.00001 thì thật là đáng thất vọng, ta phải cải tiến nó thôi. ra rà xem nào: 
- hầu hết $\sqrt{Y}$ đều từ 0 cho đến $\frac{Y}{2}$, trừ vài trường hợp ngao ngáo ra như đám nhỏ hơn 4. :smirk_cat: ta thêm `if` `else` vào là nhanh hơn rồi.

...

Nhưng đó chỉ là suy nghĩ nông cạn, khi áp dụng nó cũng chỉ giảm con số từ 19 xuống 18 :(. Thế này thì còn báo cái gì nữa. Kiểu này phải tự phế thế này đi mà luyện thế mới thôi :weary:
## Áp dụng phương pháp tính Newton-Raphson
Cũng mất 1 thơi gian khá lâu để quên đi nỗi tự nhục ^^ và sau một vài đường cơ bản search google thì chúng ta có thể sẵn sàng luyện thế thứ 2 này. Về cơ bản ý tưởng sẽ đến từ lý thuyết của môn Toán, và chúng ta lại thấy rằng toán đã cứu cánh chúng ta như thế nào trong các tình huống mà nghĩ hoài ko ra cách.
Nói qua một chút về phương pháp tính Newton-Raphson, đó là cách giúp chúng ta có thể tìm được nghiệm xấp xỉ của phương trình. Ở đây mình có một hình vẽ khá dễ hiểu cho việc này:
![](https://images.viblo.asia/6e89648e-d56e-4e5e-b9ab-32c921c69136.gif)
<div align="center"> 
    Giải thích về phương pháp tính Newton-Raphson (ref: Wikipedia)
</div>
 
Giải thích:

Chúng ta sẽ cần tìm điểm $x_{0}$ - cái điểm mà hàm $f(x)$ cắt với trục $Ox$ khi đó $f(x)$ =$0$ và $x$ = $x_{0}$ cũng chính là nghiệm của phương trình $f(x)$ =$0$.
Ngắn gọi ý tưởng là mỗi lần kẻ đạo hàm chúng ta sẽ tìm được điểm $x_{n}$  sát với $x_{0}$ hơn. Đạo hàm $f'(x)$ thì là hệ số góc của tiếp tuyến của hàm $f(x)$ tại điểm $x$. 

![](https://images.viblo.asia/26f6ef21-b75f-493a-932a-5894e19f1b08.png)

Công thức như sau: 
- $f'(x)$ = $tan(\Theta$) = $\frac{f(x)}{x - x_{n}}$ => $x_{n}$ = $x$ -  $\frac{f(x)}{f'(x)}$ 

Quay lại với phép tính căn bậc hai, về cơ bản chúng ta cần tính
-  $X$ =  $\sqrt{Y}$ => $X^2$ = $Y$ 

=> Phương trình cần tính:
- $f(x)$ = $x^2$ - $y$ = $0$

Cứ thế ốp phương pháp tính vào thôi:
- $x_{n+1}$ = $x_{n}$ - $\frac{f(x_n)}{f'(x_n)}$ = $\frac{x_n}{2}$ + $\frac{Y}{2x_n}$

Kaka, implement  thôi:
```java
public static void ByTheNewtonMethod(double number, double acceptError)
{
  double root = number;
  int times = 0; 
  while (Math.Abs(root*root - number) > acceptError)
  {
     root = root / 2 + number / (2 * root);
    times++;
  }
            
  Console.WriteLine(root);
  Console.WriteLine(times);
}

double number = 10;
double acceptError = 0.00001;
ByTheNewtonMethod(number, acceptError);
```
kaka và đây là kết quả:

`result = 3.1622776604441363/ time = 4` :100::100::100:

Mê luôn mọi người ạ, Đúng là có chút kiến thức toán bỏ vào thôi nó vẫn khác, Đó đây là 1 ví dụ nhỏ về việc toán sẽ đóng vai trò gì trong lập trình đó các bạn!

**Note:** Về việc chứng minh phương pháp Newton Raphson:

Phương pháp này có thể chứng minh từ định lý Taylor:   
   - $f(x_2)$ = $f(x_1)$ + $f'(x_1)$ ($x_2$ - $x_1$) + $\frac{1}{2}$ $f''(x_1)$ $(x_2 - x_1)^2$
   -  Giả sử có $x_2$ $\approx$ $x_1$ thì có thể rút ngọn lại  là:
   -  $f(x_2)$ = $f(x_1)$ + $f'(x_1)$ ($x_2$ - $x_1$)  (1)
   
   Giả sử ta có:
   - $x_3$ = $x_2$ + $\delta$ và $f(x_3)$ = 0
   theo (1) => $f(x_3)$ = $f(x_2)$ + $f'(x_2)$ $\delta$

       => $f(x_1)$ + $f'(x_1)$ $(x_2 - x_1)$ +  $f'(x_2)$ $\delta$ = 0

       => $(x_2-x_1)$ $f'(x_1)$ = - $f(x_1)$ - $f'(x_2)$ $\delta$

       => $x_2$ = $x_1$ - $\frac{f(x_1)}{f'(x_1)}$ - $\delta$ $\frac{f'(x_2)}{f'(x_1)}$
       
       OK, Nếu $\delta$ ($x_2$ càng sát vs nghiệm $x_3$ của pt $f(x_3)$ = 0) đủ nhỏ thì ta sẽ có:
      
      $x_2$ = $x_1$ - $\frac{f(x_1)}{f'(x_1)}$ 
       
      Đây chính là phương pháp Newton Raphson của chúng ta.
       
Kaka, tầm này là hành tẩu jang hồ đi trả thù được rồi ^^ (*)
## Fast inverse square root
(*) Đó là tôi của ngày hôm qua...

Đây là phát chốt của mình, một bí kíp thất truyền được mình học đc từ sư phụ gu gự, và sự phụ vi qui. đó bí kíp Quake 3 (tên ngắn gọn hơn của fast inverse square root, bị ae fb hiểu lầm là 3 qu** e chứ :joy:)  Tác giả được biết đến là kỹ sư [ John Carmack](https://en.wikipedia.org/wiki/Fast_inverse_square_root).

Một bí kíp võ công có thể tính căn bậc hai trong 1 nốt nhạc, ko cần lặp chả cần thử. 2 bí kíp bên trên độ phức tạp thuật toán có thể tạm gọi là O(n) (tạm gọi vì mình thấy O(n) không tuyến tính theo n). tuy nhiên với bí kíp này chỉ là O(1) thôi :heart_eyes:
Chúng ta xem qua nó nhé:
```c
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
   //	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
}
```
Để cho anh em k phải chờ lâu mình sẽ đi thằng vào vấn đề luôn: để tu luyện bí kíp này ta cần 5 bước:

-  Theo tiêu chuẩn số phẩy động IEEE754 (ai tríp bồ i) được sử dụng để biểu diễn số float trong máy tính ta có: 
    - Một số float đc biểu diễn dạng 32 bit:
  
      ![](https://images.viblo.asia/ffb96f0e-befc-4197-9b2b-fe68ef6012a2.png)
      - S là bít đầu biểu thị dấu của số
      - E là 8 bít kế, biểu diễn phần mũ
      - m là 23 bít cuối, biểu diễn phần trị 
      
      Công thức liên hệ giữa số float và các bit E, m biểu diễn như sau:
      
      $a$ = (1 + $m_a$) x $2^{E_a-127}$ (1)
      
      Có một lưu ý là E tính theo hệ cơ số 2 bình thường, còn m tính hệ cơ số 2 ngược, tức là bit đầu là $2^{-1}$, bít thứ n là $2^{-n}$, Mình lấy ví dụ là số 0.15625 nhé khi biểu diễn dạng số phẩy động thì ta có: 
      
      E = 124, m = $2^{-2}$ = 0.25 
      
      => công thức liên hệ sẽ là: 0.15625 = (1+0.25) x $2^{124-127}$

- Khai triển công thức (1) ta có:

    $a$ = (1 + $m_a$) x $2^{E_a-127}$ 
    
    => $log_2(a)$ = $log_2(1 + m_a)$ + $log_2(2^{E_a-127})$
    
    => $log_2(a)$ = $log_2(1 + m_a)$ + $E_a-127$ (2)
    
     - Chúng ta sẽ bắt đầu với sự kì diệu đầu tiên:
         - Chúng ta có :  $log_2(1 + m)$ $\approx$ $m$ với tất cả $m  \in$ [0,1)
Đúng vậy m của chúng ta tính bằng dãy $2^{-1}$ ... $2^{-23}$ luôn thuộc khoảng [0,1) nên có thể áp dụng phương trình trên để phá log của (2).

        ![](https://images.viblo.asia/08f99a97-5bd9-4edb-adb1-fe56dd19f8ef.PNG)

         - $log_2(1 + m)$ $\approx$ $m$ + $\delta$. với $\delta$ được tính toán trung bình bằng 0.0450466.

        Từ đó ta tính được:

        - (2) <=> $log_2(a)$ = $m_a$ + $E_a-127$ + $\delta$ (3)

- Điều kỳ diệu của các dãy số:
        
  Mình sẽ để sẵn một cái ảnh ở đây nhé:
 ![](https://images.viblo.asia/320f7293-e6df-496c-993c-210ba4347a6b.PNG)

    **ps**: con số ví dụ của mình sai: 0.15625 chứ k phải là 0.51625
  
   Việc của chúng ta giờ là phải làm sao loại bỏ bớt các biến đi cho phương trình gọn gàng và dễ tính hơn. Điều gì sẽ xẩy ra khi chúng ta chuyển dãy số biển diễn số phẩy động sang dạng long? Well các bạn thấy trên hình rồi đó:
  - $a_I$ = E >> 23 + m >> 23
  
  Tiện thể thì mình đang dùng phép dịch bit trái, công thức là: M << n = M x $2^n$
    - Kết hợp với (3) ta có: 
    
   $log(a)$ =  $\frac{M}{2^{23}}$ + $\frac{E*2^{23}}{2^{23}}$ -127 + $\delta$ = $\frac{a_I}{2^{23}}$ -127 + $\delta$ (4)
    
- khử $log_2(a)$ :

     - Giả sử ta đang cần tính  x = $\sqrt{y}$, sử dụng $log_2$ cho cả hai vế của phương trình ta sẽ có:

        - $log_2(x)$ =  $\frac{1}{2}$ $log_2(y)$
        - Kết hợp với (3) ta có:   $\frac{x_I}{2^{23}}$ -127 + $\delta$  = $\frac{1}{2}$  ($\frac{y_I}{2^{23}}$ -127 + $\delta$ )
  
  Ok ở đoạn này ta có thể tính đuợc $x_I$ rồi convert về $x_f$ (x ở dạng số phẩy động) để ra kết quả. Tuy nhiên tại sao ta lại cần tính $\frac{1}{\sqrt{y}}$ ? Vì thuật toán có tên là fast inverse square root chứ còn sao nữa :rofl:  
  
    Đùa đó, thực ra nó liên quan đến xử lý 3D. Để tạo ra được khung hình đẹp, game của bạn sẽ phải xử lý các vấn đề liên quan đến xử lý ánh sáng, đổ bóng, phản chiếu ... các phép xử lý này đều là ứng dụng của các phép tính liên quan đến vector, cụ thể là chuẩn hóa vector. được sử dụng rất rất nhiều lần (hàng triệu lần 1s), Công thức chuẩn hóa vector thì sẽ như thế này:
    
   $\vec A$ = (x,y,z) khi chuẩn hóa sẽ thành: 
   
   $||A||$ = ($x$$\frac{1}{\sqrt(x^2 + y^2 + z^2)}$, $y$$\frac{1}{\sqrt(x^2 + y^2 + z^2)}$, $z$$\frac{1}{\sqrt(x^2 + y^2 + z^2)}$)
   
   Ảnh: Ref: [slideshare](https://www.slideshare.net/maksym_zavershynskyi/fast-inverse-square-root)
       
   ![](https://images.viblo.asia/dfaa622e-2ace-4879-b010-5dd7ef7e2ce7.jpg) 
   

  Phép chuẩn hóa vector cần dùng $\frac{1}{\sqrt x}$ chứ ko phải $\sqrt x$. Và đó là lý do tại sao chúng ta sẽ khử $log_2(a)$ theo cách khác:
  - Giả sử ta đang cần tính  x = $\frac{1}{\sqrt(y)}$,đặt $log_2$ cho cả 2 vế của phương trình ta sẽ có:
      -  $log_2(x)$ =  $log_2(\frac{1}{ \sqrt{y}})$ <=>  $log_2(x)$ =  $log_2(y^\frac{-1}{2})$ <=>  $log_2(x)$ =  $\frac{-1}{2}$ $log_2(y)$ 
      -  Kết hợp với (3) ta có:   $\frac{x_I}{2^{23}}$ -127 + $\delta$  = $\frac{-1}{2}$  ($\frac{y_I}{2^{23}}$ -127 + $\delta$ )
      -  => $x_I$ = $\frac{3}{2}$ $2^{23}$ (127 - $\delta$) - $\frac{1}{2}$ $y_I$
      -  $\frac{3}{2}$ $2^{23}$ (127 - $\delta$)  là một hằng số không phụ thuộc vào $x_I$ hay $y_I$, Tác giả của thuật toán đã tính ra được giá trị của nó là: `0x5f3759df`
      -  Kết hợp lại ta có : $x_I$ = 0x5f3759df - ($y_I$ >> 1) // dịch bit phải để chia hai

- Kết hợp phương pháp tính Newton Raphson 1 lần nữa:
    - Vì sao? Vì con số  0x5f3759df của chúng ta  là giá trị ước lượng dựa theo $\delta$ một giá trị tính toán trung bình
thế nên chúng ta sẽ sử dụng phương pháp Newton Raphson 1 lần nữa để tìm ra nghiệm chính xác hơn là đủ:
   - Phương trình: $x$ = $\frac{1}{\sqrt y}$ 
  - Áp dụng phương pháp tính Newton Raphson: $x'$ = $x$ - $\frac{1/x^2 - y}{-2 y^{-3}}$ 
  - => $x'$ = $x$ (1.5F - 0.5 $x^2$ $y$) (5)


- Kết hớp từ (1) đến (5) vào code thôi:
```java
static unsafe void Fivs(float number)
{
     float yF = number;
     long iI = *(long*) &yF; // hack ép kiểu từ float sang long
     long yI = 0x5f3759df - ( iI >> 1 );     
     float xF = * ( float * ) &yI; // hack ép kiểu từ long sang float
     float x = xF * (1.5F - 0.5F * yF * xF * xF);
            
     float real = (float) (1 / Math.Sqrt(number));
     Console.WriteLine(x);
     Console.WriteLine(real);
     Console.WriteLine(100*(Math.Abs(x) - real)/real);
}
Fivs(10);
```
Đây là kết quả: 
`-0.31568578 - 0.31622776 - 0.17139071`
Sai số của chúng ta là 0.17% khá là tuyệt vời!! :100: 

Giờ thì ko ngán bố con nào r nhé :joy::joy::joy:

## Kết luận
Các bạn thấy thế nào, những con số nghe khô khan những lại kết hợp với nhau thật kỳ diệu phải không, hẹn gặp lại các bạn vào những bài viết sau nhé:
Bonus cho các bạn về các bàn luận về comment trong code:
- The reason why "The Evil Bit Hack" is indeed Evil, is because according to the C standard, this is actually Undefined Behavior.
- "Premature optimisation is the fast inverse square root of all evil" - Donald Knuth, probably

## Ref:
- https://en.wikipedia.org/wiki/Fast_inverse_square_root
- https://www.slideshare.net/maksym_zavershynskyi/fast-inverse-square-root
- https://www.youtube.com/watch?v=p8u_k2LIZyo&t=196s&ab_channel=Nemean
- https://www.youtube.com/watch?v=YBX2EPgx7DE&t=140s&ab_channel=CoffeeBeforeArch
## Seeder:
Đây là video mình làm về bài viết, các bạn có thể tham khảo thêm, many thanks:heart_eyes:

- https://www.youtube.com/watch?v=DAiiYFdmJjw&ab_channel=AnhNguy%E1%BB%85n