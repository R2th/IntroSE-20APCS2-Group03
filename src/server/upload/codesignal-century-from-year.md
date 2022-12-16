Hello xin chào các bạn quay trở lại, hôm nay là thứ bảy rảnh rỗi nên mình làm tiếp các câu hỏi tiếp theo trong CodeSignal hehe :grinning:  
Mình sẽ để link của câu hỏi đó ở đây: [CodeSignal - The Journey Begin - 2/3](https://app.codesignal.com/arcade/intro/level-1/egbueTZRRL5Mm4TXN)
## Câu 2: Given a year, return the century it is in. The first century spans from the year 1 up to and including the year 100, the second - from the year 101 up to and including the year 200, etc.  


-----
![](https://images.viblo.asia/2d9d5995-9ea7-40a9-b606-1678f82c6f45.PNG)

## Dịch nôm na là: Cho một năm, trả lại thế kỷ của nó. Thế kỷ thứ nhất kéo dài từ năm 1 đến năm 100, năm thứ hai - từ năm 101 đến và bao gồm cả năm 200, v.v. :nerd_face::nerd_face:  
Nhìn vào ví dụ thì các bạn có thể hiểu là: ngta cho bạn 1 cái năm nào đó cụ thể thì bạn trả lại cho ngta thế kỉ tương ứng với năm đó.
### Cung cấp các test case:  
* year 1905 -> 20
* year 1700 -> 17
* year 1988 -> 20
* year 2000 -> 20
* year 1905 -> 21
* year 2001 -> 21
* year 200 -> 2
* year 374 -> 4
* year 45 -> 1
* year 8 -> 1
### Oke, các test case đã có, bây giờ mình đi vào phân tích nào.. :nerd_face:  
Thông thường có rất là nhiều hướng để giải quyết 1 bài toán, nhưng cái quan trọng là hướng nào là hướng đúng và tốt nhất. Theo mình thì có các cách sau đây.
#### Cách 1: Chia cặp:  
> Thoạt nhìn, mình sẽ chia đôi thành 2 cặp [20], [00] thì cặp đầu tiên sẽ là kết quả và cặp thứ hai sẽ là điều kiện để xét kết quả cho cặp 1. Nhìn vào các test case các bạn sẽ thấy nếu như cặp thứ hai > 0 thì kết quả sẽ cộng thêm 1 (20 + 1) và ngược lại. Nhưng các test case sau thì số năm nó giảm dần nghĩa là nó sẽ làm cho đoạn code của bạn trở nên rối rắm vì nhiều câu điều kiện **if** => không được rồi :fearful:  
#### Cách 2: áp dụng toán 
> Nếu như giả sử mình lấy số năm thử chia cho 10 (1905 / 10) thì sẽ ntn nhỉ ?? Ồ kết quả sẽ là 190.5 .. Hay chia cho 100 (1905 /100) thì sẽ ntn ?? Kết quả sẽ là 19.05 :cowboy_hat_face: Nhìn thì chẳng có tí tương lai gì.. mình cần mấy con số này làm gì chứ ?? Thật là lố bịch :upside_down_face::upside_down_face: ..  
> :thinking: Ầy, mà từ từ đã hình như **lấy số năm chia 100** **(year / 100)** có vẻ hợp lý nếu như mình áp dụng chúng với những hàm trong JavaScript.. *hàm nào bây giờ, hàm nào sẽ cho ra kết quả hợp lý* ??  :roll_eyes:  
>  **floor()** ?? oh không floor sẽ làm giảm những con số này xuống thế thì chẳng khác gì ban đầu nhỉ ??  
>  **log, sin, tan, min, max, pow, sqrt** ?? hmm nhìn chẳng có vẻ liên quan gì lắm :sleepy:  
>  Ồ khoan đã, **celi()** ?? ceil có vẻ hợp lý, để cho chắc thì mình test thử vài trường hợp xem sao: 
 > * Math.ceil(19.05) -> 20 | Trường hợp này đúng :grinning:
 > * Math.ceil(3.74) -> 4 | Trường hợp này cũng vậy nè :heart_eyes:
 > * Math.celi(0.08) -> 1 | Oh..crap, cái này cũng đúng luôn :scream:  
 > => Cách này có vẻ ổn và ít code hơn hẳn. Vậy mình sẽ chọn cách này làm lời giải cuối cùng
## Lời giải: chọn cách 2 (áp dụng toán)  


-----


![](https://images.viblo.asia/2e8301b0-a29b-4c30-8122-da0bf1045c1b.PNG)
Chà có vẻ ổn nhỉ :joy::rofl:  

-----
### Cách còn lại  


-----


![](https://images.viblo.asia/cbc975c2-19b7-45fa-9e85-9045a0a4669f.PNG)


-----

Cám ơn các bạn đã theo dõi nhé.. Hẹn gặp lại các bạn ở bài sau <3 <3 Mình xin nhận mọi comment của các bạn :100::100: