![](https://images.viblo.asia/9fb3262b-4d15-4360-a814-4b5179b947e6.png)

Đường cong Elliptic được ứng dụng nhiều trong mật mã học và công nghệ thông tin. Phải thú thật rằng vào lần đầu tiên biết đến khái niệm **Hệ mật trên đường cong Elliptic** (Elliptic Curve Cryptography, gọi tắt là **ECC**) mình cảm thấy chẳng hiểu gì cả: "Cái thứ cao siêu gì thế này?". Việc này xảy ra cách đây 4 tháng, khi mình đọc được bài viết [này](https://viblo.asia/p/ecdsa-he-mat-dua-tren-duong-cong-elliptic-va-ung-dung-trong-blockchain-XL6lA4oDZek) của anh [@kiendinang](https://viblo.asia/u/kiendinang).

Nhưng khi tìm hiểu kỹ hơn về ECC, mình thấy đây là một "đường cong" thú vị, thú vị như nào thì chúng ta cùng tìm hiểu nhé. Yên tâm đi, mình sẽ cố gắng giải thích theo cách dễ hiểu nhất để các bạn không phải thốt lên như mình hồi trước: "Cái thứ cao siêu gì thế này?"

# 1. Cơ sở toán học 1000%
Số lượng lý thuyết toán học cần hiểu để có thể lí giải được cái đường cong ảo diệu này thì nhiều lắm luôn. Như trong một tài liệu mình đã đọc, thầy Tuấn Vietkey đã liệt kê "1 số" lý thuyết như sau:
- Lý thuyết nhóm, vành, trường trong đại số trừu tượng
- Đa tạp Affine, đa tạp Jacobian và đa tạp xạ ảnh trong hình học đại số
- Điểm Torsion, Divisor, cặp song tuyến tính Weil, Tate-Lichtenbaum
- Lý thuyết trường Galois, tự đồng cấu-ánh xạ Frobenius
- Lý thuyết Baker-Feldman, Baker-Tijdeman và lý thuyết Kummer
- Số p-adic, Isogenies, hàm Sigma và hàm Zeta 
- Nhóm đối đồng điều, đối đồng điều Galois và đối đồng điều phi giao hoán (Topo đại số)
- Nhóm Mordell–Weil, Selmer và nhóm Shafarevich–Tate
- Phương pháp hình học và Tựa tuyến tính (Quasilinear)

Với đống lí thuyết như vậy thì mình chịu, tuy nhiên về cơ bản thì đường cong Elliptic có dạng tổng quát phương trình Weierstrass như sau:

![](https://images.viblo.asia/8a5208da-e930-4ed8-b668-6aa24fab7c64.png)

Sau 1 số phép thế và phép biến đổi thì phương trình rút gọn chỉ còn:

![](https://images.viblo.asia/0b1768c5-f40c-40f4-8a5b-b55dbcbbbdac.png)

Với điều kiện:

![](https://images.viblo.asia/664479b7-e14d-4fd1-b9ae-5f59e6469d1d.png)

Và đây cũng là dạng chủ yếu xuất hiện trong các tài liệu.

Thường thì đồ thị của đường cong Elliptic được biểu diễn như sau:

![](https://images.viblo.asia/9fb3262b-4d15-4360-a814-4b5179b947e6.png)

Tuy nhiên đây chỉ là 1 mặt cắt ngang, trong không gian 3D thì đường cong Elliptic trông như này:

![](https://images.viblo.asia/41f7339d-299e-4304-89a8-7c08c101e282.gif)

## 1.1. Phép cộng trên đường cong Elliptic
Phép cộng trên đường cong này ảo thực sự!!!

![](https://images.viblo.asia/ee44171b-e4e2-400a-96dc-e84de7e0da77.gif)

Như cái gif thể hiện, phép cộng 2 điểm P và Q trên đường cong Elliptic hoạt động như sau:
- Kẻ **đường thẳng A** đi qua 2 điểm P và Q.
- Đường thẳng A cắt đường cong Elliptic tại điểm **-R = -(P + Q)**
- Lấy đối xứng giao điểm qua trục Ox ta được điểm **R = (P + Q)**

![](https://images.viblo.asia/acf4073a-54cd-4dff-a743-d3630c408880.jpg)

Trong trường hợp 2 điểm **P và Q trùng nhau**, đường thẳng A là **tiếp tuyến với đường cong tại điểm P**. Thực hiện tương tự ta được điểm **2P**.

![](https://images.viblo.asia/9aa56f16-ed01-49db-8781-763db69611a3.jpg)

## 1.2. Phép nhân trên đường cong Elliptic
Khi đã hiểu về phép cộng rồi thì chúng ta có thể dễ dàng hiểu cách phép nhân trên đường cong Elliptic hoạt động. Vì phép nhân thực chất là thực hiện phép cộng nhiều lần. Thực hiện phép nhân 3P, đầu tiên chúng ta tính 2P = P + P, sau đó tính 3P = 2P + P.

![](https://images.viblo.asia/4a5e9a51-e6e6-4f8b-8e2c-846769d00742.png)

Việc tính toán **nP** có thể thực hiện theo phương pháp **Nhân đôi và cộng**. Đầu tiên, biểu diễn số **n** thành dạng:

![](https://images.viblo.asia/77c9ecf6-415c-4c0c-8637-f2f347ae1715.png)

Với điều kiện:

![](https://images.viblo.asia/08012d60-f153-45f3-bfa9-9f329996b787.png)

Sau đó áp dụng thuật toán:
```C
Q = 0
for(i = 0; i <= m; ++i):
    if(n[i] == 1):
        Q = elliptic_combine(Q, P)      // Tính Q = Q + P
    P = elliptic_double(P)              // Tính P = 2P
return Q
```

##### Lưu ý
Trên đường cong Elliptic **không tồn tại**:
- Phép nhân 2 điểm P x Q trên đường cong Elliptic
- Phép chia vô hướng Q : n  (với Q = nP)  
  Việc tìm số ***n*** là bài toán Logarit rời rạc - một bài toán khó có thể giải được trong thời gian đa thức.
 
# 2. ECC được ứng dụng nhiều trong mật mã
## 2.1. Tính bảo mật cao
ECC thuộc loại mã hóa khóa công khai, tức là sẽ có 2 khóa khác nhau cho 2 quá trình giải mã - mã hóa. Bởi ai cũng có khả năng tiếp cận được khoá công khai, nên hệ mật phải có độ khó tính toán cao để ngăn cản việc tìm ra khóa bí mật từ khóa công khai. Tính bảo mật của ECC dựa trên độ phức tạp của bài toán Logarit rời rạc trên đường cong Elliptic. Hiện chưa thuật toán nào có khả năng tính toán với thời gian nhỏ hơn cấp lũy thừa.

Do không tồn tại phép chia trên đường cong Elliptic, nên với **Q = nP**, khi cho chúng ta điểm Q và một điểm khởi đầu P, cách để tìm ra số n thường là thử lần lượt n = 1, 2, ... n-1 đến khi tìm được kết quả nP = Q. Về cơ bản, không thể tính được n trong thời gian đa thức.

Mình sẽ nói về bài toán Logarit rời rạc sau. Tuy nhiên để dễ hình dung hơn thì chúng ta có thể nghĩ như này: Bởi phép cộng trên đường cong Elliptic khi biểu diễn hình học là 1 đường thẳng đi qua điểm **P** và **Q**, cắt **đồ thị E** tại điểm **R**. Vậy khi cho điểm Q = nP, chúng ta có thể biểu diễn hình học để xác định đường thẳng đi qua **P** và **Q**, từ đó tìm được điểm **(n-1)P**.

Nhưng như thế chúng ta mới chỉ biết được tọa độ của **(n-1)P**, còn **n** bằng bao nhiêu thì chúng ta vẫn không biết, và phải đệ quy quá trình này nhiều lần mới xác định được giá trị **n**. Về cơ bản vẫn là liên tục thử nhiều lần.

## 2.2. Tiết kiệm chi phí tính toán
Các yếu tố cần xem xét của mỗi hệ mật chính là:
- Giá thành
- Hiệu suất
- Độ an toàn

Tất nhiên khách hàng (người dùng) luôn mong muốn được sử dụng công nghệ tốt nhất, nhưng chi phí (hay giá thành) phải rẻ nhất có thể. Vì thế một hệ mật tốt, được ứng dụng rộng rãi phải cân bằng 3 tiêu chí trên thật tốt (Lưu ý rằng ***giá thành*** ở đây là lượng tài nguyên phần cứng, chi phí tính toán cần thiết cho việc mã hóa và giải mã).

ECC đã làm tốt việc này. Như mình đã đề cập ở trên, ECC thuộc loại mã hóa khóa công khai, tuy nhiên khi nói đến mã hóa công khai thì mọi người thường nghĩ đến RSA đầu tiên. RSA là một thuật toán mã hóa khóa công khai tốt, có thể ứng dụng trong xác thực chữ ký số,... Tuy nhiên độ an toàn của RSA dựa trên bài toán phân tích số nguyên lớn ra các thừa số nguyên tố. Việc này đồng thời cũng tạo ra 1 vấn đề lớn: nếu muốn đảm bảo an toàn cho hệ mật thì chúng ta sẽ cần chọn ra 2 số nguyên tố lớn, ít nhất khoảng 2048 bit hoặc theo chuẩn PCI thì độ dài khóa nên là 4096 bit. 

4096 bit là một số rất lớn, ngay cả 2048 bit cũng là lớn rồi. Điều này khiến việc tính toán với các số nguyên lớn này trở nên khó khăn và tốn nhiều tài nguyên phần cứng, thời gian tính toán,... Chưa kể nếu thuật toán không tốt thì có thể dẫn đến tính toán sai số với dữ liệu có độ dài lớn quá. ECC đã giảm được chi phí tính toán xuống rất nhiều, trong khi vẫn đảm bảo độ an toàn cho hệ mật.

Một vài số liệu so sánh giữa ECC và RSA:

| ECC | RSA |
|:--------:|:--------:|
| 256 bit key | 3072 bit key |
| 384 bit key | 7680 bit key |  

<br>ECC với độ dài khóa 384 bit được NSA đánh giá là đủ để bảo vệ các thông tin ở mức [**TOP SECRET**](https://www.google.com/search?q=nsa+top+secret+ecc+key+length).

-----

**References:**
- Giáo trình Mật mã học nâng cao, Học viện Công nghệ Bưu chính Viễn Thông.
- Hệ mật mã hóa công khai dựa trên đường cong Elliptic của thầy Đặng Minh Tuấn.
- http://antoanthongtin.vn/gp-mat-ma/mat-ma-duong-cong-elliptic-va-mat-ma-hang-nhe-101337
- https://viblo.asia/p/ecdsa-he-mat-dua-tren-duong-cong-elliptic-va-ung-dung-trong-blockchain-XL6lA4oDZek
- https://medium.com/coinmonks/elliptic-curve-cryptography-6de8fc748b8b
- https://www.youtube.com/watch?v=m-ccKQHtGQ8
- https://www.youtube.com/watch?v=NF1pwjL9-DE
- https://www.youtube.com/watch?v=nybVFJVXbww
- https://www.youtube.com/watch?v=dCvB-mhkT0w
- https://voer.edu.vn/m/phan-phoi-khoa-va-thoa-thuan-khoa/2985171b
- https://www.youtube.com/watch?v=GSIDS_lvRv4
- https://www.youtube.com/watch?v=NmM9HA2MQGI
- https://www.youtube.com/watch?v=yDXiDOJgxmg
- https://www.youtube.com/watch?v=Yjrfm_oRO0w