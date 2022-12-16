## 1. Các thuật toán tìm kiếm
* Tìm kiếm tuyến tính(Linear Search) : là một giải thuật tìm kiếm rất cơ bản. Trong kiểu tìm kiếm này, một hoạt động tìm kiếm liên tiếp được diễn ra qua tất cả từng phần tử.
* Tìm kiếm nhị phân(Binary Search): là một giải thuật tìm kiếm nhanh với độ phức tạp thời gian chạy là Ο(log n). Giải thuật tìm kiếm nhị phân làm việc dựa trên nguyên tắc chia để trị (Divide and Conquer).
* Tìm kiếm nội suy(Interpolation Search): là biến thể cải tiến của Tìm kiếm nhị phân (Binary Search). Để giải thuật tìm kiếm này làm việc chính xác thì tập dữ liệu phải được sắp xếp.

## 2. Tìm kiếm tuyến tính(Linear Search)
Mỗi phần tử đều được kiểm tra và nếu tìm thấy bất kỳ kết nối nào thì phần tử cụ thể đó được trả về; nếu không tìm thấy thì quá trình tìm kiếm tiếp tục diễn ra cho tới khi tìm kiếm hết dữ liệu.

## 2.1 Các bước thực hiện

![](https://images.viblo.asia/1a1976bb-2509-46ee-ba6c-f10af77449c9.gif)

Giải thuật tìm kiếm tuyến tính ( Mảng A, Giá trị x)

* Bước 1: Thiết lập i thành 1
* Bước 2: Nếu i > n thì chuyển tới bước 7
* Bước 3: Nếu A[i] = x thì chuyển tới bước 6
* Bước 4: Thiết lập i thành i + 1
* Bước 5: Tới bước 2
* Bước 6: In phần tử x được tìm thấy tại chỉ mục i và tới bước 8
* Bước 7: In phần tử không được tìm thấy
* Bước 8: Thoát

### 2.2 Code

Ta viết hàm linearSearch như sau, đầu vào của hàm linearSearch là 1 mảng giá trị và 1 key cần tìm trong mảng giá trị, đầu ra sẽ là index của giá trị trong mảng nếu có.

```
func linearSearch<T: Comparable>(a: [T], key: T) -> Int? {
    
    //check all possible values
    for (index, number) in a.enumerated() {
        if number == key {
            return index
        }
    }
    
    return nil
}
```

## 3. Tìm kiếm nhị phân(Binary Search)
Binary Search có lợi thế lớn về độ phức tạp thời gian khi so sánh với Linear Search. Linear Search có độ phức tạp trường hợp xấu nhất là Ο(n) trong khi Binary Search là Ο(log n).

Binary Search tìm kiếm một phần tử cụ thể bằng cách so sánh phần tử tại vị trí giữa nhất của tập dữ liệu. Nếu tìm thấy kết nối thì chỉ mục của phần tử được trả về. Nếu phần tử cần tìm là lớn hơn giá trị phần tử giữa thì phần tử cần tìm được tìm trong mảng con nằm ở bên phải phần tử giữa; nếu không thì sẽ tìm ở trong mảng con nằm ở bên trái phần tử giữa. Tiến trình sẽ tiếp tục như vậy trên mảng con cho tới khi tìm hết mọi phần tử trên mảng con này.

### 3.1 Cách Binary Search làm việc
Để Binary Search làm việc thì mảng phải cần được sắp xếp. Để tiện cho việc theo dõi, mình sẽ cung cấp thêm các hình minh họa tương ứng với mỗi bước.

Giả sử chúng ta cần tìm vị trí của giá trị 31 trong một mảng bao gồm các giá trị như hình dưới đây bởi sử dụng Binary Search:

![](https://images.viblo.asia/1251ff9a-be7c-437a-b406-46268246eea6.jpg)

Đầu tiên, chúng ta chia mảng thành hai nửa theo phép toán: midIndex = startIndex + (endIndex + startIndex) / 2

Với ví dụ trên là 0 + (9 – 0)/ 2 = 4 (giá trị là 4.5). Do đó midIndex của mảng trên là 4.

![](https://images.viblo.asia/5def993a-aa2c-4cad-bf24-65c9eb4b1fe0.jpg)

Bây giờ chúng ta so sánh giá trị phần tử giữa với phần tử cần tìm. 
Giá trị phần tử giữa là 27 và phần tử cần tìm là 31, do đó ko phải giá trị chúng ta cần tìm. 
Bởi vì giá trị cần tìm là lớn hơn nên phần tử cần tìm sẽ nằm ở mảng con bên phải phần tử giữa.

![](https://images.viblo.asia/df85fc60-567c-4d8b-b7fa-22d535fed74e.jpg)

Chúng ta thay đổi giá trị startIndex = midIndex + 1 và midIndex = startIndex + (endIndex + startIndex) / 2

Bây giờ midIndex của chúng ta là 7. Chúng ta so sánh giá trị tại chỉ mục này với giá trị cần tìm.



Giá trị midIndex tại 7 không phải giá trị cần tìm, và ngoài ra giá trị cần tìm là nhỏ hơn giá trị tại midIndex = 7 do đó chúng ta cần tìm trong mảng con bên trái của chỉ mục giữa này.

![](https://images.viblo.asia/41628cfd-ef3c-4e05-b1b7-c7763b1d8fe1.jpg)

Tiếp tục tìm midIndex lần nữa. Lần này nó có giá trị là 5.

![](https://images.viblo.asia/355d874a-077a-4af6-a3d8-e61c8bab12a6.jpg)

So sánh giá trị tại midIndex 5 với giá trị cần tìm và thấy rằng nó chính là giá trị chúng ta cần tìm.

![](https://images.viblo.asia/ea364d7d-4da1-4c17-90a2-a039b2291fe3.jpg)

Do đó chúng ta kết luận rằng giá trị cần tìm 31 có index = 5.

### 3.2 Code

Ta viết hàm binarySearch như sau: đầu vào là 1 tập các giá trị và 1 giá trị cần tim, đầu ra sẽ là index của giá trị nếu có trong tập giá trị đầu vào
Ban đầu thì vị trí dò là vị trí của phần tử nằm ở giữa nhất của tập dữ liệu.
```
func binarySearch<T: Comparable>(_ a: [T], key: T) -> Int? {
    var lowerBound = 0
    var upperBound = a.count
    while lowerBound < upperBound {
        let midIndex = lowerBound + (upperBound - lowerBound) / 2
        if a[midIndex] == key {
            return midIndex
        } else if a[midIndex] < key {
            lowerBound = midIndex + 1
        } else {
            upperBound = midIndex
        }
    }
    return nil
}
```

## 4. Tìm kiếm nội suy(Interpolation Search)
Tìm kiếm nội suy (Interpolation Search) là biến thể cải tiến của Tìm kiếm nhị phân (Binary Search). Để giải thuật tìm kiếm này làm việc chính xác thì tập dữ liệu phải được sắp xếp.

### 4.1 Dò vị trí trong tìm kiếm nội suy
Ban đầu thì vị trí dò là vị trí của phần tử nằm ở giữa nhất của tập dữ liệu.

```
mid = Lo + ((Hi - Lo) / (A[Hi] - A[Lo])) * (X - A[Lo])
```

Trong đó:
   A    = danh sách
   Lo   = chỉ mục thấp nhất của danh sách
   Hi   = chỉ mục cao nhất của danh sách
   A[n] = giá trị được lưu giữ tại chỉ mục n trong danh sách
   
Nếu phần tử cần tìm có giá trị lớn hơn phần tử ở giữa thì phần tử cần tìm sẽ ở mảng con bên phải phần tử ở giữa và chúng ta lại tiếp tục tính vị trí dò; nếu không phần tử cần tìm sẽ ở mảng con bên trái phần tử ở giữa. 
Tiến trình này tiến tụp diễn ra trên các mảng con cho tới khi kích cỡ của mảng con giảm về 0.

* Bước 1 : Bắt đầu tìm kiếm dữ liệu từ phần giữa của danh sách
* Bước 2 : Nếu đây là một so khớp (một kết nối), thì trả về chỉ mục của phần tử, và thoát.
* Bước 3 : Nếu không phải là một so khớp, thì là vị trí dò.
* Bước 4 : Chia danh sách bởi sử dụng phép tính tìm vị trí dò và tìm vị trí giữa mới.
* Bước 5 : Nếu dữ liệu cần tìm lớn hơn giá trị tại vị trí giữa, thì tìm kiếm trong mảng con bên phải.
* Bước 6 : Nếu dữ liệu cần tìm nhỏ hơn giá trị tại vị trí giữa, thì tìm kiếm trong mảng con bên trái
* Bước 7 : Lặp lại cho tới khi tìm thấy so khớp

### 4.2 Code
Hàm tìm kiếm interpolationSearch được viết như sau: đầu vào là 1 mảng số Int, key đầu ra sẽ là kết quả vị trí key trong mảng nếu có.

```
func interpolationSearch(_ a: [Int], key: Int) -> Int? {
    let lowerBound = 0
    var midIndex = -1
    var upperBound = a.count - 1
    
    while lowerBound != upperBound && a[lowerBound] != a[upperBound] {
        midIndex = lowerBound + ((upperBound - lowerBound) / (a[upperBound] - a[lowerBound])) * (key - a[lowerBound])
        
        if a[midIndex] == key {
            return midIndex
        } else {
            if a[midIndex] < key {
                upperBound = midIndex + 1
            } else if a[midIndex] > key {
                upperBound = midIndex - 1
            }
        }
    }
    
    return nil
}
```

## 5. Demo

https://github.com/pqhuy87it/MonthlyReport/tree/master/SearchAlgorithms