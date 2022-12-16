Câu 1: Độ nghiêm trọng (Pirority) và độ ưu tiên (Severity) của bug là gì  đưa ra dẫn chứng cho từng loại ? Nêu ví dụ mà một bug có độ nghiêm trọng cao và độ ưu tiên thấp
- Độ nghiêm trọng (Piority) :Đã bug thì sẽ phải sửa .Tuy nhiên , đội phát triển khó có thể sửa hết tất cả các bug một lượt cũng như không đáng để sửa hết các bug.Do đó, đội phát triển sẽ phải cần đến độ ưu tiên của con bug để biết được bug nào cần được sửa trước , bước nào sau. Độ ưu tiên của con bug được chia thành 3 - 4 cấp độ
 Mức độ 1 (Immediate)  Bug sẽ phải sửa ngay 
 Mức độ 2 (High) độ ưu tiên cao, công việc bị ngăn trở rất nhiều nếu như lỗi vẫn chưa đc sửa
 Mức độ 3 (Medium) : độ ưu tiên trung bình; công việc sẽ gặp vài khó khăn nếu như lỗi vẫn chưa đc sửa
 Mức độ 4 (low) độ ưu tiên thấp nhất; công việc không bị ảnh hưởng nhưng lỗi vẫn phải đc sửa
- Độ nghiêm trọng (Severity Bug): thường chỉ mức độ tác động của con bug đó đến sản phẩm
Mức độ 1 (Critial): rất nghiêm trọng , có thể làm phần mềm chết cứng và không sử dụng được
Mức độ 2 (Major): Nghiêm trọng ,ảnh hưởng đến chức năng chính của sản phẩm
Mức độ 3 (Minor): ảnh hưởng đến các chức năng phụ của sản phẩm 
Mức độ 4 (Cosmetic):  không ảnh hưởng đến chức năng hay hiệu năng nhưng ảnh hưởng về vấn đề thẩm mỹ hoặc thông báo sai chính tả.
-Ví dụ một bug có độ nghiêm trọng cao(Severity Bug) và độ ưu tiên thấp (Pirority Bug) :
1 app sau khi thực hiện rất nhiều thao tác bị crash độ nghiêm trọng rất cao nhưng độ ưu tiên sẽ thấp hơn một chức năng chính nào đó bị sai không vào được màn hình hoặc không thực hiện được một chức năng nào đó.
- Ví dụ một lỗi có độ nghiêm trọng thấp (Severity Bug) và độ ưu tiên cao (Pirority Bug)
Khi mở một trang web của công ty tên công ty hiển thị bị sai thì mức độ nghiêm trọng của nó không cao nhưng độ ưu tiê n của nó đc đặt lên hàng đầu .

Câu 2: Nêu ví dụ về một số phương pháp kiểm thử : 
Kiểm thử biên : 0<=x<=5  với x là các số nguyên  thì nên xét các trường hợp 0 , 5 , -1, 6 là các giá trị biên và cận biên (các giá trị cận biên là các giá trị hay gây ra lỗi nhất) . ngoài gia sẽ xét thêm các giá trị 2 , -15, 10  dựa vào phân vùng tương đương. .

Câu 3: Phương pháp kiểm thử đoán lỗi (erro guessing) thì dựa vào đâu có thể tìm ra lỗi ? 
dựa vào kinh nghiệm, dựa vào các lần phát hiện lỗi trước , 

Câu 4: Regression testing khác gì re-test: Regression testing là test các chức năng liên quan có bị ảnh hưởng bởi lỗi sau khi đc sửa xong hay không còn re-test là test chức năng mình log bug đã được fix hay chưa. :))

Câu 5: Nêu ví dụ về kiểm thử đồ thị nguyên nhân - kết quả (Cause & effect graphing)
Kỹ thuật gồm có 4 bước : 
Xác định điều kiện vào và hành động cho mỗi module cần kiểm định 
Xác định đồ thị nguyên nhân - kết quả
Đồ thị được chuyển thành bảng quyết định
Những phần trong bảng quyết định được chuyển thành test case
Ví dụ chức năng log in 
Bước 1: xác định các điều kiện đầu vào. số cột giá trị tính bằng 2 mũ n
Đầu vào                               Giá trị 1              Giá trị 2                Giá trị 3          Giá trị 4
Tên đăng nhập                   T                          F                              T                     F
Mật khẩu                             T                          F                               F                     T
Đầu ra                                 T                           F                               F                     F