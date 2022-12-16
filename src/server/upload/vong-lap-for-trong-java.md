### 1. Giới thiệu
* Vòng lặp for là cấu trúc điều khiển lặp được dùng để thực hiện một lệnh hay một khối lệnh với số lần lặp xác định trước.
* Có 3 kiểu của vòng lặp for trong java:
    * Vòng lặp for đơn giản
    * Vòng lặp for cải tiến
    * Vòng lặp for gán nhãn
* Nhưng chúng ta chỉ đi tìm hiểu 2 kiểu vòng lặp phổ biến là `vòng lặp for đơn giản và cải tiến`.

 ### 2. Vòng lặp for đơn giản
* Cú pháp:
```
for (khoi_tao_bien ; check_dieu_kien ; tang/giam_bien) {  
    // Khối lệnh được thực thi
}
```

![Screen Shot 2022-08-10 at 23.00.26.png](https://images.viblo.asia/66a620c6-0981-4acd-844d-c034a6a6ca4a.png)

* Ta có:
    * `khoi_tao_bien` là `int i = 0`
    * `check_dieu_kien` là `i < month` với `month = 12`
    * `tang_bien`: vòng lặp for này sử dụng tăng biến với `i++` (tăng i lên 1 đơn vị)
* Vòng lặp trên chạy như sau:
    * Bước 1: Bắt đầu vòng lặp thứ nhất với `khoi_tao_bien` là `int i = 0` 
    * Bước 2: Check điều kiện nếu `i < month` thì thực hiện khối lệnh bên trong `for`
    * Bước 3: Sau đó biến i tăng lên 1 đơn vị (i++) và tiếp tục với vòng lặp thứ 2 giống vòng lặp 1 nhưng lúc này `i = 1` 
    * Bước 4: Cứ thế for lặp đến khi i = 12, lúc này check điều thấy `i không còn < month` nên kết thúc vòng lặp.

![Screen Shot 2022-08-10 at 23.18.24.png](https://images.viblo.asia/1dda85e7-8d0b-46f6-9f2f-7389ada20546.png)
 
 ### 3. Vòng lặp for cải tiến
*  Vòng lặp for cải tiến được sử dụng để lặp mảng(array) hoặc collection trong java.
*  Bạn có thể sử dụng nó dễ dàng, dễ hơn cả vòng lặp for đơn giản. Bởi vì bạn không cần phải tăng hay giảm giá trị của biến rồi check điều kiện, bạn chỉ cần sử dụng ký hiệu hai chấm ":"
* Cú pháp:
```
for (Type var : array) {  
    // Khối lệnh được thực thi
} 
```

![Screen Shot 2022-08-10 at 23.27.15.png](https://images.viblo.asia/d42f6b46-51b5-4b71-8cf5-c5c01182e4c5.png)

* Vòng lặp for này sẽ duyệt từ đầu đến hết mảng với giá trị `i` bằng giá trị của phần tử vị trí tương ứng với vòng lặp đó.
* Ví dụ trong vòng lặp đầu tiên thì giá trị của `i` bằng với giá trị của phần tử đầu tiên của mảng là 1.