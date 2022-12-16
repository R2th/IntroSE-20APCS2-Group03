![](https://images.viblo.asia/c4fa24a5-9cef-4871-8dca-994677f9383c.png)
## 1. Array.Flat()
Hàm  **flat()**  tạo một mảng mới bằng cách nối đệ quy các mảng con bên trong nó theo một độ sâu được chỉ định.

![](https://images.viblo.asia/5a729820-69cb-4b72-8ef3-a524a976894b.png)
## 2.Array.flatMap()
Hàm **flatMap()** trước tiên sẽ lấy từng phần tử ra xử lý thông qua một function và làm phẳng (flat) kết quả trả về.

![](https://images.viblo.asia/c91db330-9f36-46a5-ad0a-a9e53dea43cc.png)
## 3.Object.fromEntries()
Giúp biến đổi một danh sách các cặp key-values thành một đối tượng (object)
> Lưu ý:  **Object.fromEntries** chỉ chấp nhận tham số đầu vào là các đối tượng (object) Iterable (các Map và Array)

### ví dụ 1
![](https://images.viblo.asia/a4fc8a4d-1a78-40e6-bd35-8c92b7c60455.png)

### ví dụ 2
![](https://images.viblo.asia/e53c8480-fc54-4bc7-aac6-5534c3850f4c.png)
## 4.String.trimStart() & String.trimEnd()
Hàm **trimStart()** sẽ xóa khoảng trắng từ vị trí bắt đầu của một chuỗi.

Hàm **trimEnd()** thì ngược lại, nó sẽ xóa khoảng trắng từ nới kết thúc chuỗi

![](https://images.viblo.asia/4c1919fb-526b-4572-8487-67521595b3c1.png)
## 5.Tùy chọn cho Catch
Bạn có thể tự dọ sử dụng catch mà không cần một tham số 
![](https://images.viblo.asia/35ee782f-62d2-4863-b006-24dae51c2333.png)

Trước đây, bạn cần phải dùng tham số trong block catch
![](https://images.viblo.asia/34a1e825-9c70-4cd1-98ce-da7f984400a3.png)

## 6.Function.toString()
hàm  **toString() ** trả về một chuỗi để hiển thị source code của một function. Trước đây, khoảng trắng, dòng mới hoặc hoặc comment sẽ được xóa bỏ.!
[](https://images.viblo.asia/82a36031-d268-4449-9fee-1bf331416bb8.png)
## 7.Symbol.description
Thuộc tính read-only description là một chuỗi trả về description của một Symbol Object.
![](https://images.viblo.asia/5ebfecb7-0d7e-446d-b46e-2b3cc5bacfaf.png)
## 8.JSON.Stringify()  trả về chính xác hơn.
Để chặn việc JSON.stringify() trả về những chuỗi Unicode không chính xác.
```
JSON.stringify('𝌆')
// → '"𝌆"'
JSON.stringify('\uD834\uDF06')
// → '"𝌆"'

JSON.stringify('\uDF06\uD834')
// → '"\\udf06\\ud834"'
JSON.stringify('\uDEAD')
// → '"\\udead"'
```
## 9.Array.Sort Stability
![](https://images.viblo.asia/95afc7d9-10f4-49d5-ab26-933d099e0a91.png)