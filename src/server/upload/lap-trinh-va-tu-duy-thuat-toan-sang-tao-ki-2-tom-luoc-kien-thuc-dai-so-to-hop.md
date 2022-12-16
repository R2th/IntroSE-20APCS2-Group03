Trong phần đầu [Lập trình và tư duy thuật toán sáng tạo (Kì 1)](https://viblo.asia/p/lap-trinh-va-tu-duy-thuat-toan-sang-tao-ki-1-E375z2425GW#_gioi-thieu-ve-series-0) Mình đã giới thiệu về khái niệm, lý do bạn cần sử dụng thuật toán và những điều cơ bản đề giải quyết một bài toán. Và giờ thì chúng ta bắt đầu tìm hiểu xem thế giới "diệu kỳ" này có gì nhé.

## Nội dung "Kì 2"
* Hoán vị
* Hoán vị vòng quanh
* Hoán vị lặp
* Chỉnh hợp
* Chỉnh hợp lặp
* Tổ hợp
* Tổ hợp lặp
* 10 bài toán ví dụ



Chuyện là Tí rất thích chơi trò xì tố 5 cây với bạn bè nhưng do tình hình giãn cách xã hội nên Tí đã quyết định viết một cong bot để có thể chơi cùng mình trong khoảng thời gian rảnh rỗi không biết làm gì.

**Luật chơi như sau:** Mỗi người có 5 quân bài, hãy:
* Chọn ra 3 quân sao cho tổng của chúng chia hết cho 10, nếu không có thì mặc định thua luôn.
* Hai quân còn lại cần có tổng lớn nhất có thể. (một trong hai quân đó sẽ là quân tẩy.)

:point_right: Như vậy, Tí phải phổ biến luật chơi cho con bot cái đã. Và sẽ có nhiều thuật toán có thể giải quyết vấn đề này, cách đơn giản mà ta có thể thấy là: "Hãy liệt kê tất cả các trường thỏa mãn rồi lựa chọn trường hợp tốt nhất". Tính nhanh, ta có thể thấy số trường hợp có thể là “tổ hợp chập 3 của 5”, cũng không nhiều lắm :)

Trước khi đi chi tiết hơn về giải thuật, mình sẽ  "Tóm tắt một số kiến thức về đại số tổ hợp ứng dụng trong tin học" để các bạn tiện theo dõi các nội dung tiếp theo

## Hoán vị

> Mỗi cách sắp xếp `n` phần tử của `A` theo một thứ tự nào đó được gọi là một hoán vị của n phần tử đó.

**Ví dụ:** với tập `A = {1, 2, 3}` có tất cả 6 hoán vị của tập gồm 3 phần tử là:

```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```
Gọi `Pₙ` là số lượng hoán vị của `n` phần tử, thì ta có công thức tính số hoán vị

![](https://images.viblo.asia/f04e4e05-3ec1-451e-9f3f-536edb3eb9bb.png)

**Giải thích:** 
* Với phần tử đầu tiên, ta có `n` cách chọn
* Với phần tử thứ hai, ta có `n-1` cách chọn (phần tử được chọn khác phần tử đầu)
* Với phần tử thứ ba, ta có `n-2` cách chọn (phần tử được chọn khác hai phần tử đầu)
* ... ...
* Đến phần tử cuối cùng, ta chỉ còn `1` cách chọn

![](https://images.viblo.asia/f28f6c83-55f1-4bc1-b9f6-fe96e2d60598.png)

Các bạn có thể theo dõi hình ảnh minh họa để hiểu hơn về tư tưởng.

## Hoán vị vòng quanh

> Mỗi cách sắp xếp `n` phần tử của tập `A` thành một vòng khép kín theo một thứ tự nào đó được gọi là một hoán vị vòng quanh của n phần tử. *(Ta phân biệt thứ tự xếp theo chiều kim đồng hồ và ngược chiều kim đồng hồ, không phân biệt điểm bắt đầu của vòng.)*


**Ví dụ:** Với tập A = {1, 2, 3}, chỉ có 2 hoán vị vòng quanh là `{1, 2, 3} và {1, 3, 2}`

Các hoán vị như `{2, 3, 1} và {3, 1, 2}` cũng chính là hoán vị `{1, 2, 3}` với điểm bắt đầu khác!

Gọi `Qₙ` là số hoán vị vòng quanh của `n` phần tử, ta có công thức

![](https://images.viblo.asia/4985619b-2032-4af8-acca-140ae8341f1a.png)

Do có `n` hoán vị bình thường sẽ cho ra cùng 1 hoán vị vòng quanh (với điểm bắt đầu khác nhau nhưng thứ tự sắp xếp giống nhau)

![](https://images.viblo.asia/f7525ae4-d155-4808-b82a-62932b16f5e4.png)


## Hoán vị lặp

> Hoán vị của `n` phần tử trong tập `A`,  nhưng trong đó có một số phần tử (giá trị) có thể lặp lại được gọi là hoán vị lặp của n phần tử đó.

**Ví dụ:** Có bao nhiêu hoán vị của các chữ cái trong chuỗi `S = "AABC"`

**Nhận xét:** Chuỗi `S` có 4 phần tử, nếu 4 phần tử này khác nhau thì ta sẽ có `P(4) = 4! = 24 hoán vị` 

Tuy nhiên do chữ `A` xuất hiện 2 lần, nên các hoán vị của 2 chữ A này (2!=2 hoán vị) sẽ không được tính! Vì vậy số lượng hoán vị trong trường hợp này sẽ là `4! / 2! = 12 hoán vị.`


Ta có thể dễ dàng liệt kê 12 hoán vị này: 
```
AABC, AACB,
ABAC, ABCA,
ACAB, ACBA,
BAAC, BACA,
BCAA, CAAB, 
CABA, CBAA.
```


Ta có công thức tính hoán vị lặp:

![](https://images.viblo.asia/022c36ad-bc92-4b4d-a3fe-feea8b6ffb6f.png)

**Trong đó:** 
* `n` là số phần tử trong tập `A`
* `k` giá trị khác nhau lặp lại với số lần xuất hiện:
    * Giá trị thứ nhất xuất hiện `n₁` lần, 
    * Giá trị thứ 2 xuất hiện `n₂` lần
    * ..., 
    * Giá trị thứ k xuất hiện `nₖ` lần


## Chỉnh hợp (Permutation)

> Mỗi cách chọn ra `k (n ≥ k ≥ 0)` phần tử của tập `A` và sắp xếp theo một thứ tự nào đó được gọi là một chỉnh hợp chập k của n phần tử.


**Ví dụ:** với tập A = {1, 2, 3, 4}, các chỉnh hợp chập 2 của A sẽ là:

```
1 2
1 3
1 4
2 1
2 3
2 4
3 1
3 2
3 4
4 1
4 2
4 3
```

**Giải thích:** Với `k` phần tử trong một chỉnh hợp, 

* Có `n` cách chọn phần tử đầu tiên
* Có `n-1` cách chọn phần tử thứ 2
* ...
* Có `n-k+1` cách chọn phần tử thứ k.

Do vậy, số lượng các chỉnh hợp chập k của n phần tử là:

![](https://images.viblo.asia/48dd9024-0fca-455c-a545-7990a1992e52.png)


**Lưu ý:** với `k = n`, các chỉnh hợp trở thành các hoán vị!

![](https://images.viblo.asia/5b480464-67b1-483c-84cb-b37be588438a.png)


## Chỉnh hợp lặp (Permutation with repetition)

> Một dãy bao gồm `k` phần tử của tập `A`, trong đó mỗi phần tử có thể được lặp lại nhiều lần, sắp xếp theo một thứ tự nhất định được gọi là một chỉnh hợp lặp chập k của n phần tử.

**Ví dụ:** với tập A = {1, 2, 3}, các chỉnh hợp lặp chập 2 của A sẽ là:


```
1 1
1 2
1 3
2 1
2 2
2 3
3 1
3 2
3 3
```


Mỗi phần tử trong số k phần tử của chỉnh hợp lặp đểu có thể nhận n giá trị khác nhau (do các giá trị có thể lặp lại). Vì vậy, số lượng các chỉnh hợp lặp chập k của n phần tử sẽ là:

![](https://images.viblo.asia/05793351-4dcb-4fd7-a80c-e2e13a6cd135.png)


## Tổ hợp (Combination)


> Mỗi cách chọn ra `k (n ≥ k ≥ 0)` phần tử của tập `A`  **(không tính đến thứ tự của chúng)** được gọi là một tổ hợp chập k của n phần tử.


**Ví dụ:** với tập A = {tennis, đạp xe, bóng chày}, các tổ hợp chập 2 của A sẽ là:


![](https://images.viblo.asia/790f725b-6c52-4fa0-bbe2-2be7e701f65b.png)



**Nhận xét:** Mỗi tổ hợp chập `k` phần tử có thể tạo ra `k!` chỉnh hợp chập `k` phần tử (bằng cách hoán vị k phần tử của tổ hợp này). 

Do vậy, số lượng tổ hợp chập k có thể dễ tính tính được thông qua số lượng chỉnh hợp như sau:

![](https://images.viblo.asia/9e72d8ec-eeca-4000-a623-b766568d860f.png)



## Tổ hợp lặp (Combination with repetition)

> Một dãy bao gồm `k` phần tử (k có thể lớn hơn n) của tập `A`, trong đó mỗi phần tử có thể được lặp lại nhiều lần (không tính đến thứ tự sắp xếp của chúng) được gọi là một tổ hợp lặp chập k của n phần tử.

**Ví dụ:** với tập A = {1, 2, 3}, các tổ hợp lặp chập 2 của A sẽ là:


```
1 1
1 2
1 3
2 2
2 3
3 3
```


Mỗi tổ hợp lặp chập `k` của `n` phần tử có thể biểu diễn bằng một dãy gồm `k dấu ?` (ứng với k phần tử) và `n-1 thanh |` (để chia k dấu `?` thành n ngăn, ứng với n giá trị).

Ở ví dụ trên, `n = 3` và `k = 2`, các tổ hợp lặp chập 2 của tập A sẽ tương ứng với các dãy ? và | như sau:

```
1 1   ->   ??||
1 2   ->   ?|?|
1 3   ->   ?||?
2 2   ->   |??|
2 3   ->   |?|?
3 3   ->   ||??
```

Như vậy, số lượng các tổ hợp lặp chập k của n phần tử chính là số cách chọn ra `k dấu ?` từ dãy `n+k-1 ký tự ? và |` 

![](https://images.viblo.asia/a6b107c1-028c-412c-95e7-95978382ead8.png)

Và để minh họa rõ hơn về khái niệm chỉnh hợp (*Permutation*), chỉnh hợp lặp (*Permutation with repetition*), tổ hợp (*Combination*), tổ hợp lặp (*Combination with repetition*). Mình sẽ sử dụng một hình ảnh minh họa

![](https://images.viblo.asia/6b70e74d-f37f-46c8-8b63-673f285bf05b.jpg)
*(Nguồn: Omnicalculator)*


## Một số bài toán ví dụ

**Bài toán 1:** 
Có bao nhiêu cách xếp 5 người thành một hàng?

***Lời giải:** P(5) = 5! = 120 cách


-----


**Bài toán 2:**
Từ các chữ số 0, 1, 2, 3, 4 có thể lập được bao nhiêu số tự nhiên có 5 chữ số khác nhau

**Lời giải:**  Xét chữ số có 5 chữ số là `abcde`

Có 4 cách để chọn ra chữ số thỏa mãn đặt vào `e` (do e ở hàng chục ngàn nên vị trí này phải khác 0). 

Với 4 vị trí còn lại, ta còn 4 chữ số và có `4!=24 hoán vị` của chúng. 

Vậy có `4 × 4! = 96 số`


-----


**Bài toán 3:**
Có bao nhiêu cách sắp xếp 5 người vào một bàn tròn có 5 chỗ, biết hai cách sắp xếp là khác nhau nếu từ cách sắp xếp thứ nhất ta không thể thu được cách xếp thứ hai khi xoay cùng chiều tất cả mọi người theo cùng một khoảng cách?

**Lời giải:**
Đây chính là số hoán vị vòng quanh của 5 phần tử, tức là `4! = 24 cách.`


-----


**Bài toán 4:**
Có bao nhiêu hoán vị của chuỗi MISSISSIPPI?

**Lời giải:** 
Chuỗi trên có 11 ký tự, trong đó có 4 chữ I, 4 chữ S, 2 chữ P và 1 chữ M. 

Đây chính là ví dụ điển hình của hoán vị lặp, và tổng số hoán vị sẽ là:


![](https://images.viblo.asia/587c32c9-dc08-4d86-bd87-e4dc89e7f8b5.png)



-----


**Bài toán 5:**
Có bao nhiêu cách xếp 5 người vào một băng ghế có 7 chỗ?

**Lời giải:** 
Đây là mô hình của bài toán chỉnh hợp, đáp số chính là số lượng chỉnh hợp chập 5 của 7, tức là: 

`7! / (7-5)! = 2520 cách`


-----


**Bài toán 6**
Có bao nhiêu số tự nhiên có 4 chữ số khác nhau, được tạo thành bởi các chữ số {0, 1, 2, 3, 4, 5}?

**Lời giải:** 

Có 5 cách chọn chữ số đầu tiên (chữ số này phải khác 0). 

Còn lại 3 vị trí và 5 chữ số, số cách chọn cho 3 vị trí này chính là số chỉnh hợp chập 3 của 5 chữ số còn lại. 

Kết quả: `5 × A(3, 5) = 5 × 5! ÷ (5-3)! = 300 số`



-----


**Bài toán 7:**
Biển đăng kí ô tô có 6 chữ số và 2 chữ cái tiếng Anh, không dùng chữ O và I . Hỏi số lượng ô tô có thể được đăng kí nhiều nhất là bao nhiêu? (Biết bảng chữ cái tiếng Anh gồm 26 chữ cái)

**Lời giải:** 

Có F(6,10) cách chọn ra 6 chữ số

Có F(2, 24) cách chọn ra 2 chữ cái (bảng chữ cái tiếng Anh có 26 chữ cái, trừ đi 2 chữ O và I do dễ nhầm với số 0 và 1). 

Vậy kết quả là: `10⁶ × 24² = 576.000.000 ôtô`



-----


**Bài toán 8:**
Một nhóm có 5 nam và 3 nữ. Có bao nhiêu cách chọn ra 3 người sao cho trong đó có ít nhất 1 nữ?

**Lời giải:** Ta có các trường hợp sau:

1 nữ, 2 nam: 3 × C(2, 5) = 30

2 nữ, 1 nam: C(2,3) × 5 = 15

3 nữ: C(3,3) = 1

Tổng cộng: `30 + 15 + 1 = 46 cách`


-----


**Bài toán 9:**
Có bao nhiêu số có 4 chữ số khác nhau mà các chữ số giảm dần theo chiều từ trái qua phải.

**Lời giải:**
Với mỗi cách chọn 4 chữ số khác nhau (từ 10 chữ số 0, 1, ..., 9), ta tạo được thành đúng 1 số có 4 chữ số thỏa mãn yêu cầu. 

Vậy số lượng các số như vậy sẽ là `C(4, 10) = 10! ÷ 4! ÷ (10-4)! = 210 số`


-----


**Bài toán 10:**
Giả sử có n viên bi giống nhau và m cái hộp (n>m), ta xếp bi vào các hộp. Gọi xᵢ (với i = 1, 2, 3 ...) và m là số bi ở hộp i. Chứng minh rằng:

a) Số cách xếp khác nhau n viên bi vào m cái hộp là C(n, m+n-1)

b) Trong C(n, m+n-1) cách xếp đó có C(m-1, n-1) cách xếp cho tất cả các hộp đều có bi.

**Lời giải:**

**a)** Ta biểu diễn n cái kẹo bởi `n dấu ?`, và dùng `m-1 vách ngăn |` để chia n cái kẹo này vào m hộp.

***Ví dụ:*** 3 vạch để chia 9 cái kẹo vào 4 hộp: `??|???||????` (hộp 1 có 2 kẹo, hộp 2 có 3 kẹo, hộp 3 có 0 kẹo, hộp 4 có 4 kẹo)

Như vậy, có `***n+m-1*** ký tự (cả ? và |)`, ta cần chọn ra `***m-1*** vị trí để đặt các vạch |` (hoặc n vị trí để đặt các dấu ?), do vậy, số cách xếp sẽ là: `C(n, m+n-1) = C(m-1, n+m-1)`


**b)** Trong trường hợp mỗi hộp cần có ít nhất một viên kẹo, các vạch | không được đứng cạnh nhau và phải đứng giữa các dấu ?. Có `n-1` vị trí giữa các dấu `?`, ta cần chọn ra `m-1` vị trí để đặt các vạch `|`

Vậy số cách sẽ là `C(m-1, n-1)`


**Hệ quả:** Từ bài toán trên ta suy ra hai hệ quả thú vị sau:
1. Số nghiệm nguyên không âm của phương trình `x₁ + x₂ + x₃ + ... + xₘ = n` là `C(n, m+n-1)`
2. Số nghiệm nguyên dương của phương trình `x₁ + x₂ + x₃ + … + xₘ = n (m≤n)` là `C(m-1, n-1)`

Và hệ quả này ta lại sinh ra 1 bài toán:
Tìm số nghiệm nguyên không âm của phương trình x₁ + x₂ + x₃ + x₄ = 20 thỏa điều kiện x₁ ≤ 3; x₂ ≥ 2; x₃ > 4.


**Hướng dẫn:**
Viết lại 3 điều kiện trên thành: `x₁ ≤ 3; x₂ ≥ 2; x₃ ≥ 5`.

Ta sẽ tính số nghiệm của phương trình với điều kiện `x₂ ≥ 2; x₃ ≥ 5` ***(1)***

Sau đó, trừ đi số nghiệm của cùng phương trình đó với điều ngược của điều kiện thứ nhất, tức là: `x₁ ≥ 4; x₂ ≥ 2; x₃ ≥ 5` ***(2)***


***(1)*** Đặt `y₁=x₁; y₂=x₂-2; y₃=x₃-5; y₄=x₄`, bài toàn trở thành tính số nghiệm nguyên không âm của phương trình: `y₁ + y₂ + y₃ + y₄ = 13 `

Theo hệ quả ở trên, số nghiệm là: `C(4-1, 4+13-1) = C(3,16) = 560`

***(2)*** Đặt `y₁=x₁-4; y₂=x₂-2; y₃=x₃-5; y₄=x₄`, bài toàn trở thành tính số nghiệm nguyên không âm của phương trình: `y₁ + y₂ + y₃ + y₄ = 9`

Theo hệ quả ở trên, số nghiệm là: `C(4-1, 9+4+-1) = C(3,12) = 220`

Kết quả cuối cùng: `(1) - (2) = 560 - 220 = 340`


## Bàn luận

Trong lập trình, một lớp bài toán phổ biến là bài toán liệt kê tất cả các cấu hình của một loại tổ hợp nào đó. Ví dụ: liệt kê các tập hợp con của một tập hợp, liệt kê tất cả các cách xếp hàng, liệt kê các hoán vị của một xâu để tìm hoán vị phù hợp...

Để giải lớp bài toán này, chúng ta có nhiều phương pháp giải thuật nhưng đơn giản và phổ biến thì có thể kể đến: Phương pháp sinh (Generation), Thuật toán quay lui (Backtracking),... Và chúng ta sẽ cùng nhau tìm hiểu chi tiết hơn về các thuật toán này trong các kỳ tới nhé.:raised_hand_with_fingers_splayed: