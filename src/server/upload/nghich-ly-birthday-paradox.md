* Như ở trong phần trước: “Nghịch lý Birthday paradox trong sử dụng “Chữ ký điện tử và hàm băm”, mình đã trình bày một cách tổng quan về chữ ký điện tử, nguyên lý tạo ra chữ ký điện tử cơ sở và có sử dụng hàm băm, ứng dụng của nó cũng như nghịch lý Birthday pardox được các kẻ xấu lợi dụng để tấn công hệ chữ ký tạo ra dựa trên kỹ thuật băm. Trong bài này, mình sẽ giới thiệu tiếp về chi tiết nghịch lý “Birthday Paradox”, xác suất xảy ra của nó và việc áp dụng của nó trong một số mô hình thuật toán internet phổ biến khác.

**1. Đặt vấn đề**
- Nghịch lý Birthday paradox đặt ra một câu hỏi như sau: “Xác suất để có hai người trong một phòng 30 người có cùng ngày sinh nhật là bao nhiêu”? Như chúng ta đã biết, với năm nhuận là 366 ngày và năm không nhuận có 365 ngày thì hầu hết mọi người sẽ đoán xác suất nêu trong câu hỏi trên là rất nhỏ. Tuy nhiên thực tế lại hoàn toàn ngược lại. Chúng ta sẽ cùng đi tìm xem xác suất cụ thể trong phần sau.

**2. Xác suất xảy ra “Birthday paradox”**
* Giả sử trong một phòng có k người thì:

    + Gọi A là sự kiện trong phòng có ít nhất 2 người có cùng ngày sinh nhật
    - --> A là sự kiện trong phòng không có ai trùng ngày sinh nhật
    + Quy ước A là phủ định của A
           
           P(A) = 1 – P(A)
    + Số cách để cả k người này có ngày sinh nhật khác nhau là:
          
           N = 365 * 364 * ... * (365-k+1) = 365! / (365-k)!
    + Số cách để k người này có thể có ngày sinh nhật trùng nhau, hay nói cách khác là kích thước không gian ngày sinh nhật của tất cả mọi người là:
        
            D = 365 * 365 * ... * 365 = 365^k
        
            --> P(A) = N/D
        
            --> P(A) = 1 – N/D = 1 – 365!/((365-k)!(365)^k)
        
* Với trường hợp cụ thể như ở phần 1, k = 30, ta sẽ thu được xác suất để có ít nhất 2 người trong một phòng 30 người có cùng ngày sinh là:

            P = 1 – 365!/((365-30)!(365)^30)
    * Tuy nhiên công thức xác suất này còn khá phức tạp, khó tính toán, ta sẽ đi ước lượng nó trong một khoảng chấp nhận được.
* Qua trên, ta thu được công thức tổng quát cho nghịch lý “Birthday paradox”:

    * Chọn k giá trị ngẫu nhiên từ tập n giá trị khác nhau, xác suất để có ít nhất 2 giá trị trùng nhau là P(n, k) như sau:
            
            P(n, k) = 1 – n!/(n-k)!(n^k)

**3. Ước lượng giá trị xác suất trong “Birthday Paradox”**
* Như ở phần trên, ta thấy việc tính giá trị xác suất P(A) qua công thức tổng quát là khá khó khăn, do vậy để giảm thời gian và độc phức tạp tính toán, ta sẽ đi ước lượng giá trị này trong một khoảng chấp nhận được.
Dễ thấy:
+ P (2 người chọn từ n người có ngày sinh khác nhau) = 1 – 1/n
+ P (3 người có ngày sinh khác nhau) = (1-1/n)(1-2/n)
    .....
+ P (k người có ngày sinh khác nhau) = (1-1/n)(1-2/n)...(1-(n-1)/n)
* --> ln 2 vế, ta thu được: 

            ln(P) = ln(1-1/n) + ln(1-2/n) + ... + ln(1-(k-1)/n)
    * Sử dụng bổ đề sau: Với 0<x<1: ln(1-x) <= -x, ta có:
            
            ln(P) <= -(1/n + 2/n + ... + (k-1)/n)
    * Sử dụng định lý Gauss, ta có: 
            
            1 + 2 + 3 + ... + (n-1) + n = n(n+1)/2
    * Do đó, 
           
           ln(P) <= -1/2 * (k-1)k/n
            -->	P <= e^(-1/2*(k-1)k/n)
            
        (e là hằng số Ơ-le, e ~ 2.7)
* Vậy, xác suất để có ít nhất 2 người có ngày sinh trùng nhau trong k người sẽ là: 
            
            P = 1 - e^(-1/2*(k-1)k/n)
    hay 
            
            P(n , k) > 1 – e^((-k*(k-1))/2n)
* Với bài toán cụ thể ở phần 1, n = 365, k = 30, ta có:
            
            P365, 30) > 1 – e^((-30*(30-1))/2*365)
            --> P(365, 30) > 0.6963
* Như vậy, xác suất tính được là xấp sỉ 70%, một con số vô cùng lớn so với những dự đoán nếu như chúng ta chưa bắt tay vào tính, vô cùng nguy hiểm cho các hệ chữ ký điện tử sử dụng hàm băm.
    * Với n = 2 ^ 64, k = 2 ^ 32: P(2^64, 2^32) > 0.39
    * Với n = 2 ^ 64, k = 2 ^ 33: P(2^64, 2^33) > 0.86
    * Với n = 2 ^ 64, k = 2 ^ 34: P(2^64, 2^34) > 0.996
* Qua 3 trường hợp trên, ta thấy với với không gian băm có kích thước 64 bit, giả sử kẻ thù có năng lực tính toán trên tập giá trị băm đến 2^34, thì xác suất để kẻ thù có thể tìm ra được một đụng độ để tấn công là xấp sỉ 100%. Qua ví dụ trên, trong thực tế, để tránh bị kẻ thù tấn công, các nhà mật mã thường dựa trên năng lực thực tế ước lượng lớn nhất của kẻ thù tính đến thời điểm hiện tại để chọn không gian băm cho phù hợp và an toàn.

Ở bài viết sau, mình sẽ đề cập đến một bài toán kinh điển tiếp theo trong các mô hình thuật toán internet phổ biến, đó là bài toán “Ball into Bins”, liên hệ của nó với “Birthday Paradox” cũng như ứng dụng trong thực tế của nó.

***Link bài viết trước “Nghịch lý Birthday paradox trong sử dụng “Chữ ký điện tử và hàm băm””:***
https://viblo.asia/p/nghich-ly-birthday-paradox-trong-su-dung-chu-ky-dien-tu-va-ham-bam-ORNZqNr3l0n