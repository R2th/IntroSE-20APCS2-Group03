# I. Giới thiệu
Các thuật toán sắp xếp là một phần rất cơ bản mà lập trình viên chúng ta được học trong trường đại học. Tuy nhiên, không phải anh em nào cũng học công nghệ thông tin ra, và nhiều anh em đã từng học nhưng lâu không động tới nên cũng không nhớ rõ. Vì vậy, trong bài viết này mình xin tổng hợp lại các thuật toán sắp xếp, và cách áp dụng các thuật toán với ngôn ngữ Swift

# II. Nội dung
## 1. Bubble Soft

Bubble soft là một thuật toán sắp xếp đơn giản, với 1 danh sách có n phần tử, thuật toán của nó lần lượt như sau:
- duyệt từ đầu đến cuối danh sách, kiểm tra theo từng cặp liền kề
- nếu thứ tự của 2 phần tử trong cặp không đúng thì đổi vị trí của 2 phẩn tử
- tiếp tục thực hiện đến hết danh sách và đổi chỗ các cặp không đúng vị trí.
- sau khi duyệt qua toàn bộ danh sách, vị trí ở cuối danh sách là vị trí chính xác
- lặp lại việc duyệt danh sách với danh sách mới gồm n-1 phần tử
- lặp lại các bước trên đến khi danh sách không còn phần tử để duyệt nữa

Các bạn có thể nhìn thực tế quá trình thực hiện của bubble sort qua ảnh gif sau:

![](https://images.viblo.asia/78661d40-d799-418e-8636-0e3d368d24d6.gif)

Ưu điểm của bubble soft là thuật toán này rất đơn giản, có thể dễ dàng viết code để áp dụng. Nhưng nhược điểm là độ phức tạp lớn, độ phức tạp của thuật toán này là O(n2) 

Sau đây chúng ta cùng tham khảo code swift implement bubble soft
```Swift
extension Array where Element: Comparable {
    func bubbleSort() -> Array<Element> {
        
        guard self.count > 1 else {
            return self
        }
        
        var output: Array<Element> = self
        for primaryIndex in 0..<self.count {
            let passes = (output.count - 1) - primaryIndex
            for secondaryIndex in 0..<passes {
                let key = output[secondaryIndex]
                // compare / swap positions
                if (key > output[secondaryIndex + 1]) {
                    output.swapAt(secondaryIndex, secondaryIndex + 1)
                } }
        }
        return output
    }
}

let array = [3 ,7 ,4 ,1, 5, 9, 2, 8]
print(array.bubbleSort()) // [1, 2, 3, 4, 5, 7, 8, 9]
```

## 2. Insertion Soft

Insertion Soft là một thuật toán sắp xếp bắt chước cách sắp xếp quân bài của những người chơi bài. Các bạn tưởng tượng danh sách cần sắp xếp như bộ bài, và tay chúng ta là một danh sách con. chúng ta lần lượt rút từng quân bài trong bộ bài, so sánh với các quân bài đang có trên tay và sắp xếp quân bài mới rút vào đúng vị trí trong tập bài trên tay. Quá trình sắp xếp kết thúc khi không còn quân bài nào để rút nữa. Thuật toán sắp xếp của Insertion sort hoàn toàn giống cách chúng ta xếp bài.

Các bạn có thể nhìn quá trình thực hiện của bubble sort qua ảnh gif sau:

![](https://images.viblo.asia/230085b6-41e3-4f76-94c5-af1856a90292.gif)

Bây giờ, chúng ta tiến hành implement thuật toán insertion soft trên Swift bằng code sau:

```Swift
extension Array where Element: Comparable {
    func insertionSort() -> Array<Element> {
        
        guard self.count > 1 else {
            return self
        }
        
        var output: Array<Element> = self
        for primaryindex in 0..<output.count {
            let key = output[primaryindex]
            var secondaryindex = primaryindex
            while secondaryindex > -1 {
                if key < output[secondaryindex] {
                    //move to correct position
                    output.remove(at: secondaryindex + 1)
                    output.insert(key, at: secondaryindex)
                }
                secondaryindex -= 1
            }
        }
        return output
    }
}


let array = [3 ,7 ,4 ,1, 5, 9, 2, 8]
print(array.insertionSort()) // [1, 2, 3, 4, 5, 7, 8, 9
```

## 3. Selection sort 

Trong thuật toán selection sort, các bước được thực hiện như sau:
- lấy giá trị đầu danh sách làm giá trị nhỏ nhất (hoặc lớn nhất tuỳ cách sắp xếp)
- duyệt qua danh sách, khi tìm thấy giá trị nhỏ hơn thì lấy đó làm giá trị nhỏ nhất
- sau khi duyệt qua danh sách, lấy phần tử có giá trị nhỏ nhất, đổi vị trí với vị trí phần tử đầu danh sách. Lúc này phần tử ở đầu danh sách đã được xếp đúng vị trí
- lặp lại quá trình duyệt danh sách, với danh sách bắt đầu từ phần tử thứ 2 trở đi
- lặp lại quá trình trên đến khi danh sách không còn phần tử thì quá trình sắp xếp kết thúc

Độ phức tạp của selection sort là O(n2)

Các bạn có thể nhìn quá trình sắp xếp selection sort thông qua ảnh gif sau:

![](https://images.viblo.asia/da1b47f9-0fef-46ba-bd7d-435a503a0ebf.gif)

Bây giờ, chúng ta tiến hành implement thuật toán selection soft trên Swift bằng code sau:

```Swift
extension Array where Element: Comparable {
    func selectionSort() -> Array<Element> {
        
        guard self.count > 1 else {
            return self
        }
        
        var output: Array<Element> = self
        for primaryindex in 0..<output.count {
            var minimum = primaryindex
            var secondaryindex = primaryindex + 1
            while secondaryindex < output.count {
                //store lowest value as minimum
                if output[minimum] > output[secondaryindex] {
                    minimum = secondaryindex
                }
                secondaryindex += 1
            }
            //swap minimum value with array iteration
            if primaryindex != minimum {
                output.swapAt(primaryindex, minimum)
            } }
        return output
    }
}

let array = [3 ,7 ,4 ,1, 5, 9, 2, 8]
print(array.selectionSort()) // [1, 2, 3, 4, 5, 7, 8, 9

```

## 4. Quick sort

So với các thuật toán sắp xếp bên trên thì quick sort được coi là thuật toán cao cấp hơn, vì độ phức tạp của nó thấp hơn O(n log n)  và nó áp dụng phương pháp chia để trị. Các bước thực hiện của thuật toán này như sau:

- lấy một phần tử trong danh sách làm mốc
- sắp xếp danh sách sao cho tất cả các phần tử nhỏ hơn phần tử mốc đứng trước mốc, tất cả phần tử lớn hơn đứng sau mốc
- sau quá trình sắp xếp thì phần tử mốc đã nằm đúng vị trí
- tiếp tục đệ qui với 2 danh sách con đằng trước và sau phần tử mốc, để tìm ra 2 mốc khác, và chia được 4 danh sách con nữa
- Thuật toán dừng lại khi tất cả phần tử tìm được đúng vị trí của mình 

Các bạn có thể nhìn quá trình sắp xếp selection sort thông qua ảnh gif sau:

![](https://images.viblo.asia/a6912fc9-6e1c-4370-88e1-23cfe2a9a834.gif)

chúng ta tiến hành implement thuật toán quick soft trên Swift bằng code sau:

```Swift
extension Array where Element: Comparable {
    mutating func quickSort() -> Array<Element> {
        func qSort(start startIndex: Int, _ pivot: Int) {
            if (startIndex < pivot) {
                let iPivot = qPartition(start: startIndex, pivot)
                qSort(start: startIndex, iPivot - 1)
                qSort(start: iPivot + 1, pivot)
            } }
        qSort(start: 0, self.endIndex - 1)
        return self
    }
    mutating func qPartition(start startIndex: Int, _ pivot: Int) -> Int {
        var wallIndex: Int = startIndex
        //compare range with pivot
        for currentIndex in wallIndex..<pivot {
            if self[currentIndex] <= self[pivot] {
                if wallIndex != currentIndex {
                    self.swapAt(currentIndex, wallIndex)
                }
                //advance wall
                wallIndex += 1
            }
        }
        //move pivot to final position
        if wallIndex != pivot {
            self.swapAt(wallIndex, pivot)
        }
        return wallIndex
    }
}

Var array = [3 ,7 ,4 ,1, 5, 9, 2, 8]
print(array.quickSort()) // [1, 2, 3, 4, 5, 7, 8, 9
```

# III. Tổng kết

Trên đây chúng ta đã cùng ôn lại các thuật toán sắp xếp cơ bản của cấu trúc dữ liệu và giải thuật. Hi vọng bài viết này giúp ích cho các bạn củng cố lại kiến thức đã được học, hoặc biết thêm về các thuật toán đối với các bạn chưa biết.
Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!