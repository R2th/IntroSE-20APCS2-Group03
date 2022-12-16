![](https://images.viblo.asia/f22bb989-c354-479a-99dd-fb40298a5cf8.jpg)

### map
#### Khái niệm
Phương thức `map()` giúp tạo ra một mảng mới với các phần tử là kết quả từ việc thực thi một hàm lên từng phần tử của mảng được gọi.
Vì vậy mà mảng mới này sẽ có length bằng với mảng đầu vào

#### Ví dụ Emoji
- Input: một mảng các nguyên liệu [:cow:, :sweet_potato:, :chicken:, :corn:]
- Output: các món ăn được nấu theo từng các nguyên liệu đó 
> **Input = ([:cow:, :sweet_potato:, :chicken:, :corn:]**
>
> **[:cow:, :sweet_potato:, :chicken:, :corn:].map( cook)**
> 
> Thực hiện phương thức `cook` qua từng phần tử của input
> 
> :cow: => :hamburger:
> 
>  :sweet_potato: => :fries:
> 
>  :chicken: =>:poultry_leg:
> 
>  :corn: => :popcorn:
> 
> **Output = [ :hamburger:,  :fries:, :poultry_leg:,  :popcorn:]**
> 
#### Sử dụng khi nào?
- Cần chuyển đổi mảng để tạo ra mảng mới.

Ví dụ:
- Chuyển một string thành một array
- Render ra một list DOM trong các thư viện JavaScript (React, Vue, Angular...)
- Khi cần format một mảng các object (thêm id, format giá trị hiển thị...)

Bạn có thể tham khảo thêm tại đây
https://scotch.io/tutorials/4-uses-of-javascripts-arraymap-you-should-know

### filter
#### Khái niệm
Khi bạn có một array, và chỉ muốn lấy một số phần tử từ nó theo điều kiện nhất định, hãy nghĩ ngay đến `filter`.
Hàm `filter`  tạo ra một mảng mới với các phần tử thỏa mãn điều kiện của một hàm nhất định. Nếu hàm trả về` true`, thì phần tử đó được giữ lại, và ngược lại,` false` thì bị loại ra

#### Ví dụ Emoji
- Input: một mảng các món ăn  [ :hamburger:,  :fries:, :poultry_leg:,  :popcorn:]
- Output: các đồ ăn chay
> **Input = ( [ :hamburger:,  :fries:, :poultry_leg:,  :popcorn:]**
>
> **[ :hamburger:,  :fries:, :poultry_leg:,  :popcorn:].filter(isVegetarian)**
> 
> Thực hiện kiểm tra điều kiện **isVegetarian** qua từng phần tử của input
> 
> :hamburger: => isVegetarian(:hamburger:) => false
> 
>  :fries: => isVegetarian(:fries:) => true
> 
>  :poultry_leg: => isVegetarian(:poultry_leg:) => false
> 
>  :popcorn:  => isVegetarian(:popcorn:) => true
>  
> Những phần tử thỏa mãn điều kiện sẽ được giữ lại
> 
> **Output = [ :fries:,  :popcorn:]**
> 

#### Sử dụng khi nào?
- Khi cần tạo ra một mảng con từ mảng đầu vào theo một điều kiện lọc nhất định

Ví dụ:
- Lọc ra tất cả các phần tử là string từ mảng
- Lọc ra các số chẵn từ mảng số
- ....

### reduce
#### Khái niệm
Reduce dùng để thực thi một hàm lên từng phần tử của mảng (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất.

#### Ví dụ Emoji
- Input: một mảng các món ăn  [ :hamburger:,  :fries:, :poultry_leg:,  :popcorn:]
- Output: tổng lượng carlo bạn nhận được sau khi ăn lần lượt các món như thứ tự trên
> **Input = ( [ :hamburger:,  :fries:, :poultry_leg:,  :popcorn:]**
>  // tương đương với giá trị carlo là [100, 200, 200, 100]
>
>  **eat = (sumCarlories, currentCarlories ) => sumCarlories + currentCarlories**
> 
> **[ :hamburger:,  :fries:, :poultry_leg:,  :popcorn:].reduce(eat)**
> 
> Thực hiện phương thức `eat` qua từng phần tử của input theo thứ tự từ trái sang phải, kết quả ở mỗi lần `eat` tại 1 phần tử sẽ là giá trị `sumCarlories` cho phần thử tiếp theo
> 
> :hamburger: => eat(:hamburger:) => sumCarlories = 100
> 
>  :fries: => eat(:fries:) => sumCarlories = 100 + 200 = 300
> 
>  :poultry_leg: => eat(:poultry_leg:) => sumCarlories = 300 + 200 = 500
> 
>  :popcorn:  => eat(:popcorn:) => sumCarlories = 500 + 100 = 600
>  
> **Output = 600**
> 

#### Sử dụng khi nào?
- Khi bạn muốn sử dụng giá trị của từng phần tử trong array để tạo ra một giá trị mới hoàn toàn, hãy nghĩ đến reduce khi cảm thấy bài toán có chút gì đó giống đệ quy

Ví dụ:
- Tỉnh tổng của dãy số theo điều kiện nào đó
- Đếm số lần xuất hiện của phần tử trong dãy
- ....

### Tổng kết
Khi xử lý dữ liệu, hãy nghĩ đến các hàm tiện ích hơn như `map`, `filter`, `reduce`, `find`... trước khi nghĩ đến việc phải dùng các vòng lặp for. Việc này sẽ giúp cho code của bạn trở nên ngắn gọn, dễ hiểu hơn. Tùy vào bài toán đưa ra mà chọn phương án phù hợp nhất:
- Muốn xử lý từng phần tử trong mảng theo cùng 1 cách, trả về mảng mới có length bằng với mảng ban đầu => `map`.
- Muốn lấy các phần tử theo 1 tiêu chuẩn nhất định => `filter`.
- Muốn sử dụng các giá trị trong mảng để tạo ra vài thứ khác hoàn toàn mới => `reduce`.



Bài viết đến đây là hết. Cảm ơn các bạn đã theo dõi bài viết. Hi vọng bài viết sẽ giúp các bạn hiểu thêm về các phương thức của mảng trong JavaScript.

**Tham khảo:**

https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464