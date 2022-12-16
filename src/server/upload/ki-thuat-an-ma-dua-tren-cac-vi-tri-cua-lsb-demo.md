## 1. Khái niệm về Steganography
Kĩ thuật che giấu thông tin  (tiếng Anh: Steganography) là nghệ thuật và khoa học về việc viết và chuyển tải các thông điệp một cách bí mật, sao cho ngoại trừ người gửi và người nhận, không ai biết đến sự tồn tại của bức thư, là một dạng của bảo mật bằng cách che giấu thông tin trong các vật phủ.

Nhiều định dạng của vật phủ khác nhau có thể được sử dụng, nhưng hình ảnh kỹ thuật số là phổ biến nhất vì tần suất của chúng trên Internet.  Để che giấu thông tin bí mật trong hình ảnh, có rất nhiều kỹ thuật mật mã, một số phức tạp hơn những kỹ thuật khác và tất cả chúng đều có điểm mạnh và điểm yếu tương ứng.  Bài này đã đề xuất một kỹ thuật ẩn ký dựa trên hình ảnh sử dụng kỹ thuật Bit ít có ý nghĩa nhất (LSB) trong phương pháp mới ẩn các vị trí của LSB bằng với các bit ký tự trong văn bản bí mật.  

## 2. Hệ thống đề xuất  
Hệ thống được đề xuất nhằm mục đích phát triển một phương pháp tiếp cận mật mã cải tiến là Phương pháp LSB Thích ứng cho hình ảnh màu có chất lượng / không nhạy cảm cao hơn, dung lượng / trọng tải lớn và độ bền / khả năng chống lại các cuộc tấn công tốt hơn, cũng như tin nhắn văn bản có thể được ẩn trong phương pháp mới đó là ẩn các vị trí của LSB bằng các bit văn bản bí mật ở một vị trí khác của ảnh bìa và sử dụng một khóa đặc biệt.  Chìa khóa là vị trí đầu tiên bắt đầu ẩn các vị trí của LSB bằng các bit của văn bản bí mật.

Các bước nhúng tin: 
1. Nhập các tệp văn bản / hình ảnh bí mật.  
2. Chuyển đổi văn bản bí mật trong mã nhị phân và lưu trong array1.
3. Chọn ảnh phủ từ danh sách các tệp Hình ảnh được lưu trữ và các tệp văn bản. 
4. Tách hình ảnh thành hai phần và lưu part1 trong array2 và lưu part2 trong array3.  
5. Bắt đầu so sánh giữa văn bản bí mật (array1) và part1 từ hình ảnh (array2) 
	- So sánh hai bit đầu tiên với các bit có ý nghĩa nhỏ nhất của part1 (hình ảnh) trong array2 với hai bit đầu tiên của văn bản bí mật.  
	- Nếu hai bit văn bản bằng hai LSB của part1 (hình ảnh) trong array2 thì lưu vị trí của LSB (hàng, cột) trong array4.  
	- Nếu hai bit văn bản không bằng hai LSB của part1 (hình ảnh) trong array2 thì chuyển đến LSB ở pixel tiếp theo và tiếp tục so sánh cho đến khi tìm thấy LSB bằng hai bit ký tự.  
	- Lấy hai bit mới từ văn bản bí mật và chuyển sang bước a cho đến khi kết thúc văn bản bí mật. 
6. Chuyển array4 thành mã nhị phân và ẩn nó trong array3 part2 của hình ảnh. Vị trí đầu tiên sẽ bắt đầu ẩn trong đó sẽ là chìa khóa.  
7. Ghép hai phần của hình ảnh lại với nhau và lưu lại ảnh phủ.

### 1. Chi tiết quá trình nhúng tin
- Chuyển đổi văn bản thành mã nhị phân
```
Đầu vào: Văn bản bí mật
Đầu ra: Mảng mã nhị phân
	Step 1: Nhập văn bản
	Step 2: Chuyển đổi văn bản sang mã ASCII
	Step 3: Chuyển đổi mã ASCII sang mã nhị phân
	Step 4: Lưu trong Array1
	Step 5: Kết thúc  
```
Ví dụ: Chuyển : “xin chao”
->	1111000 1101001 1101110 100000 1100011 1101000 1100001 1101111
-	Tách hình ảnh 
```sql
Đầu vào: Hình ảnh
Đầu ra: Hai Array là mã nhị phân
    Step1: Mở tệp hình ảnh 
    Step2: Chia nội dung của tệp hình ảnh thành hai phần 
    Thao tác này sẽ chia hình ảnh thành nhiều phần, sử dụng phần 1 để so sánh, phần thứ 2 để ẩn 
    Step3: Lưu giá trị pixel của phần1 trong array2, lưu giá trị của pixel của phần 2 trong array3
    Step4: Kết thúc
```

![](https://images.viblo.asia/9e065377-ea5e-4b01-a6b4-763127556193.JPG)

-	Tìm vị trí 
```markdown
Đầu vào: Array2, Array1
Đầu ra: Vị trí của pixel bằng mã ASCII của hình ảnh văn bản
    Step 1: Đọc lần lượt các vị trí của array2
    Step 2: So sánh với các vị trí trong array1 ( nhị phân của văn bản bí mật)
    Step 3: 
        for i = 1 to length of array1 step2
             Read array1
             For j = 1 to length of array2 step 8
             Read array2
                        If  array1[i] = array2[j+6] and array1[i+1] = array2[j+7] then
        Array4[i] =j+6
        Array4[i+1]= j+7
        end if
        next j
        next i
    Step 4: Kết thúc
```
Ví dụ: 
![](https://images.viblo.asia/92703bd0-f37f-404e-89bf-c49d94540cf3.JPG)

-	Substation
```go
Đầu vào : Array4 , Array3
Đầu ra: Array3 sau khi ẩn trong Array4
    Step1: 
        For i= 1 to length of array4
        Read array4
        For j = Key to length of array3 step 8
        Array3[j+6]=array4[i]
        Array3[j+7]=array4[i+1]
        Next j
        Next i
    Step2: Kết thúc 
```
Ví dụ: 
![](https://images.viblo.asia/457ed8e5-09a7-4238-a997-0c70aabcc176.JPG)

-	Trích xuất hình ảnh Stego
```
Đầu vào: Array2, Array3
Đầu ra: Hình ảnh stego
	Step1: Ghi Array2 vào tập tin
	Step2: Ghi Array3 sang một tập tin khác
	Step3: Hợp nhất 2 tập tin để trích xuất hình ảnh
	Step4: Lưu lại tập tin
	Step5: Kết thúc
```
Ví dụ: 
![](https://images.viblo.asia/ffe4f8b2-f6d6-450b-ad74-611b8fdb03b7.JPG)

### 2.  Trích xuất văn bản bí mật 
1. Tách hình ảnh stego thành hai phần và lưu phần 1 trong Array5 và phần 2 trong Array6
2. Trích xuất vị trí từ Array6 và lưu trong Array7
3. Theo Array7 trích xuất văn bản bí mật từ Array5
## 3. Demo
Đây là link phần mềm demo, các bạn có thể tải  về và dùng thử: https://drive.google.com/file/d/16FiiKdLiRvsVQ3NsHOrzFli9zHHPMhtU/view?fbclid=IwAR2fhpEH1VYuqd1-CILOpZrt0tXu2tr_QBD2i885jtGD5NPj7qn_AfbJwBU
## 4. Tổng kết
Trong bài này mình đã giới thiệu cho các bạn về 1 thuật toán giấu tin trong ảnh, hi vọng bài viết này sẽ hưu ích với các bạn
Tham khảo: https://www.researchgate.net/publication/328872793_NEW_TECHNIQUE_OF_STEGANOGRAPHY_BASED_ON_LOCATIONS_OF_LSB