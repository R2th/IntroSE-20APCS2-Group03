Google Sheet online đang trở nên rất thông dụng và được sử dụng phổ biến trong các dự án.
Tiếp cận làm quen và sử dụng với Google Sheet khá dễ, nhưng để nói về các hàm, cú pháp của nó thì kiến thức rất rộng. 

Ngoài một số hàm cơ bản mà mọi người thường sử dụng như SUM,  AVERAGE, MIN/MAX,...
Thì mình nhận thấy có rất nhiều hàm còn rất mới lạ, hữu ích với QA để có thể linh hoạt trong việc xử lý data, tạo file report,...

Cùng mình tìm hiểu thêm về  Google Sheet trong bài này nhé 

## 1. Sao chép dữ liệu từ File này qua File khác 
Nếu file test case của bạn có quá nhiều số liệu, quá nhiều sheet. Và bạn chỉ muốn summary nó lại thành 1 file Test Report riêng biệt chỉ để get những số liệu cần thiết. 

Vậy làm sao để Test Report luôn được update realtime theo file Test Case của bạn?

Sử dụng hàm `=IMPORTRANGE("link file Test Case", "Sheet1!A1:A10")`

Lúc này file Test Report sẽ có thể get data từ file Test Case, tại Sheet1, column A từ 1 tới 10. Khi file Test Case có thay đổi thì file Test Report sẽ tự động apply theo

Sau khi paste hãy nhớ bấm chọn Allow Access nhé

![](https://images.viblo.asia/c9e28411-ca55-4dc7-b19d-4f50823265b6.jpg)

## 2. Filter 
Để có thể filter get dữ liệu theo 1 điều kiện cụ thể.

Sử dụng hàm `=FILTER (array,condition)`

`=FILTER(Sheet2!$A1:$B$100,(Sheet2!$B$1:$B$100)=Sheet2!D1)`

Như ví dụ ở dưới ta có thể filter data từ Sheet2 column A1 Đến B100 nếu giá trị của B1:B100 = D1 (=Pass)

![](https://images.viblo.asia/695e0d0e-ffa0-46fb-8f53-3ccaf487a48d.jpg)
## 3. IF
IF là một hàm rất phổ biến trong excel, nó cũng rất hữu ích và thường được sử dụng để so sánh lô-gic giữa các giá trị mà bạn mong muốn.

Một câu lệnh IF có thể có hai kết quả. Kết quả đầu tiên là nếu so sánh của bạn là True, kết quả thứ hai nếu so sánh của bạn là False.

`=IF(A1 = "Có tiền", "mua sắm", "ở nhà")` -> Một ví dụ đơn giản. Nếu A1 = "Có tiền" thì sẽ đi mua sắm, ngược lại sẽ ở nhà ^^ . Có thể thay toán tử =, < , > để có được điều kiện mong muốn.

Hoặc để kiểm tra data có bị trống hay không có thể dùng hàm ISBLANK()

`=IF(ISBLANK(A1), Công_thức_có_data, Công_thức_không_có_data)`

## 4. COUNTIF
Để count dữ liệu theo điều kiện. Sử dụng cú pháp: `=COUNTIF(array,condition)`

`=COUNTIF(B2:B10,*a*)` -> count dữ liệu từ column B2:B10 có chứa kí tự a

`=COUNTIF(B2:B10,"a")` -> count dữ liệu từ column B2:B10 = kí tự a (match 100%)


`=COUNTIF(Sheet2!$B2:B100,Sheet2!D1)`

Count số lượng ở Sheet2 column B2:B100 nếu có giá trị = D1 (Pass)
![](https://images.viblo.asia/ed29e847-426d-47a0-ac1f-88a584b6e512.jpg)

## 5. Kết nối các chuỗi trong excel 
Nếu cần sử dụng 1 đoạn text được ghép lại từ nhiều ô, hãy sử dụng cú pháp sau: 

 `CONCATENATE (text1, [text2], …)`

![](https://images.viblo.asia/17f7551f-7512-42e7-b632-c61f7d38bf22.jpg)

## 6. Tham chiếu gián tiếp tới data
Cú pháp `=INDIRECT(ref_text, [a1])`

Dùng hàm INDIRECT khi bạn muốn thay đổi tham chiếu tới một ô trong một công thức mà không thay đổi chính công thức đó.

Ví dụ ở dưới. `=INDIRECT(A2) ` Giá trị của ô A2 là B1. Lúc này hàm indirect sẽ thực hiện tham chiếu ô B1 để get giá trị = Hang

![](https://images.viblo.asia/486bae0d-4885-4ee5-aa6c-9e11d3050112.jpg)

Hàm INDIRECT kết nối các phần tử trong đối số ref_text – văn bản “B” và giá trị trong ô C1 -> giá trị trong ô C1 là số 1, được ghép lại tạo ra tham chiếu ô là B1 -> để get giá trị = Hang

![](https://images.viblo.asia/2855c2db-31bc-4fbe-afee-1064f3ffcd19.jpg)