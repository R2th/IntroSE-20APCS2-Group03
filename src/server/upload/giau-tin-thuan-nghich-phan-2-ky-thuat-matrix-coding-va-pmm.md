# KỸ THUẬT GIẤU TIN MATRIX CODING
**Giới thiệu**: Thuật toán Matrix Coding được Chi-Shiang Chan, Ching-yun Chan đề xuất 2010
**Ý tưởng**: Cho trước ma trận A kích thước 3 x 7 và tách lần lượt LSB của các điểm ảnh và tách lần lượt 3 bit dữ liệu, nhóm lần lượt LSB điểm ảnh thành 7 bit một nhân với  ma trận A, mod (phép chia lấy dư) kết quả với với 2, dùng phép XOR  dữ liệu với kết quả sau đó  tìm ra vị trí lỗi, thay thế vị trí lỗi này và khi tách chỉ cần tìm được vị trí lỗi. 
**Ví dụ**: Ví dụ: Ma trận A cho trước có kích thước 3 x 7

![](https://images.viblo.asia/775329cc-73da-49c3-a7dd-be0832a423a5.png)

Tách lần lượt LSB của 7 điểm ảnh ( 1 0 1 0 1 1 1 )
![](https://images.viblo.asia/095524fd-d6bd-4354-bd3b-25a7ff217fe7.png)
Nhân ma trận A với LSB của 7 điểm ảnh lấy kết quả mod cho 2 vậy đã tìm được vị trí lỗi

![](https://images.viblo.asia/084ba7b9-f5b9-4b77-8032-7d52afb340d1.png)

Khi đã tìm được vị trí lỗi ta lần lượt tách 3 bit dữ liệu và dùng phép XOR với vị trí lỗi và tìm ra vị trí lỗi mới 
![](https://images.viblo.asia/00372e93-955a-4fd8-b763-aa3b567e2c7e.png)

Lấy 7 bit thấp rồi nhân cho ma trận A sau đó mod cho 2

![](https://images.viblo.asia/b8c6de89-6335-4e3b-a5f3-d56802ce0da5.png)

**THUẬT TOÁN GIẤU TIN**

**Đầu vào**: Chuỗi thông điệp S, 1 ảnh cấp xám

**Đầu ra**: Ảnh giấu tin
1. Cho trước ma trận ![](https://images.viblo.asia/775329cc-73da-49c3-a7dd-be0832a423a5.png) . Tách LSB của ảnh cấp xám lưu vào một mảng X sau đó tách lần lượt 7 bít từ mảng X. Tách lần lượt 3 bit dữ liệu từ chuỗi thông điệp S. 
2. Lấy ma trận A nhân X, lấy kết quả của phép nhân mod 2 rồi lấy kết quả  XOR với 3 bít dữ liệu nếu kết quả là 0 không thay đổi vị trí 7 bit ngược lại ta tìm được vị trí lỗi trong 7 bít LSB, thay đổi bít ở vị trí lỗi này. 

**THUẬT TOÁN TÁCH TIN**

**Đầu vào**: Ảnh giấu tin

**Đầu ra**: Ảnh khôi phục và chuỗi thông điệp

1. Bước 1: Cho trước ma trận ![](https://images.viblo.asia/775329cc-73da-49c3-a7dd-be0832a423a5.png). Tách LSB của ảnh I lưu vào một mảng X sau đó tách lần lượt 7 bít từ mảng X. Tách lần lượt 3 bit dữ liệu từ chuỗi thông điệp S. 
2. Lấy ma trận A nhân với 7 bit LSB lấy kết quả mod với 2, kết quả chính là dữ liệu được tách ra, tìm được vị trí lỗi và khôi phục lại ảnh

# THUẬT TOÁN PMM 
**Giới thiệu**: Thuật toán PMM (A novel approach of data hiding using pixel mapping method)  được đề xuất vào năm 2010

**Ý tưởng**: Trong nghiên cứu này Souvik và cộng sự hướng tới một phương pháp giấu tin mới, cải tiến từ phương pháp PMM cũ. Trong đó ý tưởng chính là đánh dấu các điểm ảnh được chọn theo một thuật toán đã cho (dựa vào giá trị điểm ảnh được chọn trước đó. Sau đó ta ánh xạ 2 (phương pháp cũ) hay 4 bit (phương pháp mới được trình bày ở đây) thông điệp vào từng điểm ảnh  lân cận với nó theo ngược chiều kim đồng hồ. Quá trình nhúng kết thúc khi số bit thông điệp được nhúng hết.     

**Thuật toán giấu tin**: Đặt C là tập hợp 8 bit ảnh cấp xám ban đầu có kích thước NN. C = (Pij | 0≤  i ≤  N, 0≤ j ≤ N, Pij  0, ………. . , 255). Đặt MSG là n bit thông điệp mật được biểu diễn như là MSG = (mk | 0≤ k ≤ n, mk  0, 1). Điểm ảnh hạt giống Prc có thể được chọn với hàng(r) và cột(c). Bước tiếp theo là tìm thấy 8 lân cận Pr’c’ của điểm ảnh Prc theo r’ = r +l, c’ = c+l, -1≤ l ≤ 1. Tiến trình nhúng sẽ được kết thúc khi tất cả các bits của chuỗi thông tin được ánh xạ hay nhúng. 

![](https://images.viblo.asia/6d4b6564-16df-4539-9873-5de4ff63a459.png)

## Một số ký hiệu sử dụng trong thuật toán
```
Bincvr: Mảng chưa chuỗi bit của điểm ảnh được xét để giấu tin
Cnt: Biến chứa số số bit 1 có trong Bincvr
Count: Biến đếm số lần nhúng
Dem: Biến kiểm tra count được đưa vào trong quá trình tách (đảm bảo tách đủ thông tin).
Phép NOT: Phép phủ định một bit
e(g): Bộ đệm chuyển bit thông điệp được dùng để ánh xạ vào Bincvr
```

### Cải tiến phương pháp PMM
**Đầu vào**: ảnh ban đầu C, thông điệp msg. 

**Đầu ra**: ảnh stego, số đếm count, bản đồ M. 

***Giai đoạn 1***: Tạo bản đồ (lặp lại các bước như phương pháp nhúng 2 bit). 

***Giai đoạn 2***: Ánh xạ thông điệp vào ảnh. 
1. Lấy độ dài thông điệp  L. 
2. Lấy các bit thông điệp vào bộ đệm e(g), chuyển giá trị điểm ảnh sang chuỗi bit (bincvr), tìm số các số 1 trong chuỗi bit bincvr, gán vào cnt. 
Kiểm tra nếu g ≤ L thì: 
    * (1)  Chuyển 1 bit thông điệp vào bộ đệm e(g). 
    * (2)  Tăng biến count lên 1. 
    * (3)  Gán  bộ đệm e(g) cho bit thứ 5 của chuỗi bit bincvr (bincvr(5) tính từ phải), tăng biến g lên 1. 
    * (4)  Lặp lại (1), (2) 
    * (5) Gán bộ đệm e(g) cho bit thứ 6 của chuỗi bit bincvr (bincvr(6) tính từ phải), tăng biến g lên1. 
    * (6)  Lặp lại (1), (2)
3. 
- Nếu e(g) = 0 và e(g+1) =1 thì gán cho bit thứ 8 (tính từ bên phải) của bincvr bằng 0 (bincvr(8)=0). Kiểm tra nếu cnt chẵn thì phủ định bit thứ 7 của bincvr (phép NOT: bincvr(7)=NOT(bincvr(7) ) ). 
- Nếu e(g) = 1 và e(g+1) = 0 thì gán cho bit thứ 8 (tính từ bên phải) của bincvr bằng 1 (bincvr(8)=1). Kiểm tra nếu cnt lẻ thì phủ định bit thứ 7 của bincvr (phép NOT: bincvr(7)=NOT(bincvr(7) ) ). 
- Nếu e(g) = 0 và e(g+1) = 0 thì gán cho bit thứ 8 của bincvr bằng 0 (bincvr(8)=0). Kiểm tra nếu cnt lẻ thì phủ định bit thứ 7 của bincvr (phép NOT: bincvr(7)=NOT(bincvr(7) ) ). 
- Nếu e(g) = 1 và e(g) = 1 thì gán cho bit thứ 8 của bincvr bằng 1 (bincvr(8)=1). Kểm tra nếu cnt chẵn thì phủ định bit thứ 7 của bincvr (phép NOT: bincvr(7)=NOT(bincvr(7) ) ). 
4. Kiểm tra nếu thấy g > L thì thoát (kết thúc nhúng). 

### Phương pháp tách 4 bit
**Đầu vào**: Ảnh stego, số đếm count, bản đồ M. 

**Đầu ra**: Ảnh cover, thông điệp bmsg. 
*Bước 1*: Lấy điểm ảnh chọn từ bản đồ M, chuyển qua chọn các điểm ảnh bên cạnh (lấy theo ngược chiều kim đồng hồ), khởi tạo biến dem=1. 

*Bước 2*: Chuyển giá trị điểm ảnh sang chuỗi bit (đặt là bincvr), lấy số bit 1 trong bincvr( đặt là cnt). 

*Bước 3*: Gán bit thứ 5 của bincvr (bincvr(5)) cho thông điệp bmsg(i), tăng i lên 1. 

*Bước 4*: Kiểm tra nếu dem ≤ d thì tăng dem lên1 không thì thoát (kết thúc tách). 

*Bước 5*: Gán bit thứ 6 của bincvr  (bincvr(6)) cho thông điệp bmsg(i), tăng i lên 1. 

*Bước 6*: Lặp lại bước 4. 

*Bước 7*: Gán bit thứ 8 của bincvr  (bincvr(8)) cho thông điệp bmsg(i), tăng i lên 1. 

*Bước 8*: Kiểm tra nếu cnt chẵn thì gán cho bmsg(i)=0, lặp lại bước 4. 

Ngược lại thì gán cho bmsg(i)=1, lặp lại bước 4. 

*Ví dụ*: ![](https://images.viblo.asia/c1ec79d3-aad8-4aef-a8dd-9c0d4b3aeac0.png)

### Nhúng thông tin: 

Giả sử tại vị trí điểm ảnh chọn là 186. Ta chọn điểm nhúng tiếp theo là 11010=011011102  ta xác định được số bit 1 trong dãy cnt=5. 

*Bước 1*: Lấy 1 bit thông điệp = 0 vào e(g) S(g)=0=e(g), count =1

*Bước 2*: Count=count+1. 

*Bước 3*: Bincvr(5)=e(g), g=g+1. 

*Bước 4*: Lấy 1 bit thông điệp =1 vào e(g ) S(g)=1=e(g). 

*Bước 5*: Lặp lại bước 2. 

*Bước 6*: Bincvr(6)=e(g), g=g+1. 

*Bước 7*: Lặp lại bước 1, bước 2. 

*Bước 8*: Vì kiểm tra e(g)=0 và e(g+1)=1 nên ta gán bincvr(8)=0 và do cnt =5 nên cnt lẻ nên bincvr(7) giữ nguyên. 
### Tách thông tin:
Giả sử tại ảnh stego, vị trí điểm ảnh chọn là 186, ta chọn điểm tách tiếp theo là 110=01101110. Ta xác định được cnt=5. 

*Bước 1*: Bmsg(i)=bincvr(5)=1, i=i+1. 

*Bước 2*: Kiểm tra dem≤ d. 

*Bước 3*: Bmsg(i)=bincvr(6)=0, i=i+1. 

*Bước 4*: Lặp lại bước 2

*Bước 5*: Bmsg(i)=bincvr(8)=0, i=i+1. 

*Bước 6*: Cnt=5 suy ra cnt lẻ nên bmsg(i)=1. 

> Đây là một nghiên cứu về 2 phương pháp giấu tin Maxtrix coding và PMM được tham khảo trong một số tài liệu như:
> * REVERSIBLE DATA HIDING IN TWO STEGANOGRAPHIC IMAGES USING MATRIX CODING, Chi-Shiang Chan, Ching-yun Chan. 
> * Reversible Watermarking by Difference Expansion, Jun Tian.
> * Reversible Data Hiding by Coefficient-bias Algorithm Ching-Yu Yanga, Wu-Chih Hua and Chih-Hung Linb aDept. of Computer Science and Information Engineering, National Penghu University
> * Nguyễn Xuân Huy và Trần Quốc Dũng, “Giáo trình giấu tin và thuỷ vân ảnh”, Thông tin tư liệu, ĐHKHTN, 2003