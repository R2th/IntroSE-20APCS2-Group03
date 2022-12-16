## 1. Giải thuật sắp xếp trong cấu trúc dữ liệu & giải thuật
Sắp xếp là sắp xếp dữ liệu theo một định dạng cụ thể. Trong khoa học máy tính, giải thuật sắp xếp xác định cách để sắp xếp dữ liệu theo một thứ tự nào đó. 

Sắp xếp theo thứ tự ở đây là sắp xếp theo thứ tự dạng số hoặc thứ tự dạng chữ cái như trong từ điển.

Tính quan trọng của việc sắp xếp dữ liệu nằm ở chỗ: việc tìm kiếm dữ liệu có thể được tối ưu nếu dữ liệu được sắp xếp theo một thứ tự nào đó (tăng hoặc giảm). 
Sắp xếp cũng được sử dụng để biểu diễn dữ liệu trong một định dạng dễ đọc hơn.

## 2. Giải thuật sắp xếp nổi bọt (Bubble Sort)
### 2.1 Các bước thực hiện
Giả sử chúng ta có một mảng không có thứ tự gồm các phần tử như dưới đây. Bây giờ chúng ta sử dụng giải thuật sắp xếp nổi bọt để sắp xếp mảng này.

![](https://images.viblo.asia/c499079b-42d3-4c65-b861-1b058719d7d3.jpg)

Giải thuật sắp xếp nổi bọt bắt đầu với hai phần tử đầu tiên, so sánh chúng để kiểm tra xem phần tử nào lớn hơn.
Trong trường hợp này, 33 lớn hơn 14, do đó hai phần tử này đã theo thứ tự. 

![](https://images.viblo.asia/46e3c602-76ab-47c6-a6a8-58c4369f464b.jpg)

Tiếp đó chúng ta so sánh 33 và 27.

![](https://images.viblo.asia/0de78270-d3c4-494d-828a-c5947f4314d7.jpg)

Chúng ta thấy rằng 33 lớn hơn 27, do đó hai giá trị này cần được tráo đổi thứ tự.

![](https://images.viblo.asia/0c4165f1-5050-4f27-8394-b7cf315a512f.jpg)

Tiếp đó chúng ta so sánh 33 và 35. Hai giá trị này đã theo thứ tự.

![](https://images.viblo.asia/01c44f0c-01c4-4db3-ad27-d1830dde8aec.jpg)

Sau đó chúng ta so sánh hai giá trị kế tiếp là 35 và 10, 10 nhỏ hơn 35 nên ta lại đổi vị trí 2 giá trị này cho nhau

![](https://images.viblo.asia/1391b241-759a-47d3-a768-5306794eca06.jpg)

Vậy là sau một vòng lặp, mảng sẽ trông như sau

![](https://images.viblo.asia/0cbd8955-540b-469d-a9a3-0dc88d93b7d6.jpg)

Chúng ta lặp lại từ đầu quá trình so sánh như vậy, sau lần lặp thứ hai, mảng sẽ trông giống như

![](https://images.viblo.asia/688782da-100f-4b80-a648-1bcec78893e1.jpg)

Lần thứ 3

![](https://images.viblo.asia/5a9776d6-5c21-4f49-a735-ffb8b3998c16.jpg)

lần thứ 4

![](https://images.viblo.asia/1fe4177d-035d-45e6-a102-509d4cde25d6.jpg)

kết thúc lần thứ 4 chúng ta thấy dãy số đã được sắp xếp đúng thứ tự, thuật toán kết thúc.

### 2.2 Code
```
func sortWithhBubbleSort(_ array: [Int]) -> [Int]{
    var insideArray = array
    for _ in 0..<insideArray.count{
        for jIndex in 0..<(insideArray.count-1){
            if insideArray[jIndex]>insideArray[jIndex+1]{
                let value = insideArray[jIndex+1]
                insideArray[jIndex+1] = insideArray[jIndex]
                insideArray[jIndex] = value
            }
        }
    }
    return insideArray
}
```

## 3. Giải thuật sắp xếp chèn (Insertion Sort)
Sắp xếp chèn là một giải thuật sắp xếp dựa trên so sánh in-place.

*in-place ở đây nghĩa là không yêu cầu thêm bất kỳ bộ nhớ phụ và việc sắp xếp được tiến hành trong chính phần bộ nhớ đã khai báo trước đó.

Một danh sách con luôn luôn được duy trì dưới dạng đã qua sắp xếp. 
Sắp xếp chèn là chèn thêm một phần tử vào danh sách con đã qua sắp xếp. 

Phần tử được chèn vào vị trí thích hợp sao cho vẫn đảm bảo rằng danh sách con đó vẫn sắp theo thứ tự.

Với cấu trúc dữ liệu mảng, chúng ta tưởng tượng là: mảng gồm hai phần: một danh sách con đã được sắp xếp và phần khác là các phần tử không có thứ tự. 
Giải thuật sắp xếp chèn sẽ thực hiện việc tìm kiếm liên tiếp qua mảng đó, và các phần tử không có thứ tự sẽ được di chuyển và được chèn vào vị trí thích hợp trong danh sách con (của cùng mảng đó).

Giải thuật này không thích hợp sử dụng với các tập dữ liệu lớn khi độ phức tạp trường hợp xấu nhất và trường hợp trung bình là Ο(n2) với n là số phần tử.

## 3.1 Các bước thực hiện
Chúng ta có 1 mảng các phần tử số như sau

![](https://images.viblo.asia/50e4bd98-1bfa-4c1c-9866-c8c9a6560c91.jpg)

Chúng ta sẽ so sánh 2 phần tử đầu tiên của mảng là 14 và 33, 2 phần tử này đã được sắp xếp nên chúng ta đưa 14 vào mảng con đã qua sắp xếp, tiếp tục so sánh đến 2 phần tử 33 và 27

![](https://images.viblo.asia/51ae9107-afbf-4583-9dc9-b1c1bfb2e8b9.jpg)

ở đây ta thấy 33 ko nằm đúng vị trí, chúng ta tiến hành tráo đổi vị trí 33 và 27

![](https://images.viblo.asia/649fd8ff-20a6-49e8-9d17-b633871f84cc.jpg)

đồng thời thêm phần tử 27 vào danh sách con đã sắp xếp, trong danh sách con này hiện có 2 phần tử 14, 27 2 phần tử này cũng đã nằm đúng vị trí nên không cần so sánh tiếp
Lại tiếp tục so sánh 33 và 10

![](https://images.viblo.asia/324b07f2-51db-4840-a4d1-121ff271b683.jpg)

2 phần tử này không đúng vị trí nên tiến hành tráo đổi chúng

![](https://images.viblo.asia/7e91cd42-992a-43b2-ac73-ba544296646e.jpg)

Việc tráo đổi dẫn đến 27 và 10 không theo thứ tự.

![](https://images.viblo.asia/b6522ab6-436f-4b3c-b5e1-f47dc14d2b6c.jpg)

Vì thế chúng ta cũng tráo đổi chúng.

![](https://images.viblo.asia/4d7ecbe2-8176-4e95-b235-e28848def01c.jpg)

Chúng ta lại thấy rằng 14 và 10 không theo thứ tự.

![](https://images.viblo.asia/817e64a6-9765-49cc-ac1e-4f4f41787488.jpg)

Và chúng ta tiếp tục tráo đổi hai số này. Cuối cùng, sau vòng lặp thứ 3 chúng ta có 4 phần tử.

![](https://images.viblo.asia/3535f573-04aa-4a4b-816a-e5e167e72df8.jpg)

Cứ tiếp tục như vậy cho đến khi tất cả các phần từ trong mảng được sắp xếp thì thuật toán kết thúc.

### 3.2 Code
```
func sortWithhinsertionSort(_ array: [Int]) -> [Int] {
    var insideArray = array

    for i in 0..<array.count {
        let value = array[i]
        var j = i - 1
        while j >= 0 {
            if array[j] > value{
                insideArray[j+1] = array[j]
            } else {
                break
            }
            j -= 1
        }
        insideArray[j+1] = value
    }

    return insideArray
}
```

## 4. Giải thuật sắp xếp chọn (Selection Sort)
Giải thuật sắp xếp chọn (Selection Sort) là một giải thuật trong đó danh sách được chia thành hai phần, phần được sắp xếp (sorted list) ở bên trái và phần chưa được sắp xếp (unsorted list) ở bên phải. Ban đầu, phần được sắp xếp là trống và phần chưa được sắp xếp là toàn bộ danh sách ban đầu.

Phần tử nhỏ nhất được lựa chọn từ mảng chưa được sắp xếp và được tráo đổi với phần bên trái nhất và phần tử đó trở thành phần tử của mảng được sắp xếp. Tiến trình này tiếp tục cho tới khi toàn bộ từng phần tử trong mảng chưa được sắp xếp đều được di chuyển sang mảng đã được sắp xếp.

Giải thuật này không phù hợp với tập dữ liệu lớn khi mà độ phức tạp trường hợp xấu nhất và trường hợp trung bình là O(n2) với n là số phần tử.

### 4.1 Các bước thực hiện
Gỉa sử lúc đầu chúng ta có 1 mảng các phần tử số như sau

![](https://images.viblo.asia/88da0ff5-9cbd-4eba-9daa-d20b7e346d28.jpg)

 Vị trí đầu tiên có giá trị 14, chúng ta tìm toàn bộ danh sách và thấy rằng 10 là giá trị nhỏ nhất.
 
 ![](https://images.viblo.asia/6705a214-9771-4494-8f0a-a1863665f03f.jpg)
 
 Do đó, chúng ta thay thế 14 với 10. Tại vị trí thứ hai, giá trị 33, chúng ta tiếp tục quét phần còn lại của danh sách theo thứ tự từng phần tử.
 
 ![](https://images.viblo.asia/c6a91616-4fe7-4258-b6ae-76093aa12c90.jpg)
 
 Chúng ta thấy rằng 14 là giá trị nhỏ nhất thứ hai trong danh sách và nó nên xuất hiện ở vị trí thứ hai. Chúng ta tráo đổi hai giá trị này.
 
 ![](https://images.viblo.asia/5f78b89c-a113-43ef-9ed2-6508ac0f46d9.jpg)
 
 Cứ thế áp dụng với phần còn lại của danh sách cho đến khi mảng được sắp xếp đúng vị trí thì thuật toán kết thúc
 
 ![](https://images.viblo.asia/30fba3c8-ec15-4558-ba36-0134c4041437.jpg)
 
 ### 4.2 Code
```
func sortWithSelectionSort(_ array: [Int]) -> [Int] {
    guard array.count > 1 else { return array }  // 1
    
    var a = array                    // 2
    
    for x in 0 ..< a.count - 1 {     // 3
        
        var lowest = x
        for y in x + 1 ..< a.count {   // 4
            if a[y] < a[lowest] {
                lowest = y
            }
        }
        
        if x != lowest {               // 5
            a.swapAt(x, lowest)
        }
    }
    return a
}
```