Thuật toán là xương sống của máy tính. Việc lựa chọn các thuật toán phù hợp sẽ giúp bạn nâng cao năng suất và tiết kiệm được thời gian chạy cho chương trình của bạn. Sau đây chúng ta sẽ cùng tìm hiểu 1 số thuật toán sắp xếp có sẵn hay được sử dụng trong ngôn ngữ Swift.

**Bubble Sort**

Đây là một thuật toán sắp xếp đơn giản, lặp đi lặp lại các bước trong danh sách cần sắp xếp, so sánh từng cặp giá trị liền kề và hoán đổi chúng nếu chúng không đúng thứ tự. Việc thông qua danh sách được lặp lại cho đến khi không cần hoán đổi. Mặc dù thuật toán rất đơn giản, nhưng nó quá chậm và không thực tế đối với hầu hết các vấn đề. Nó có độ phức tạp của O (n2) nhưng nó được coi là chậm hơn so với **insertion sort.**
```
extension Array where Element: Comparable {
func bubbleSort() -> Array<Element> {
    //check for trivial case
    guard self.count > 1 else {
        return self
}
    //mutated copy
    var output: Array<Element> = self
    for primaryIndex in 0..<self.count {
        let passes = (output.count - 1) - primaryIndex
        //"half-open" range operator
        for secondaryIndex in 0..<passes {
            let key = output[secondaryIndex]
            //compare / swap positions
            if (key > output[secondaryIndex + 1]) {
                swap(&output[secondaryIndex], &output[secondaryIndex + 1])
} }
}
    return output
}
}
```

**Insertion sort**

Insertion sort là một trong những thuật toán cơ bản hơn trong khoa học máy tính. Insertion sort xếp hạng các phần tử bằng cách lặp qua một bộ sưu tập và các phần tử vị trí dựa trên giá trị của chúng. Tập hợp được chia thành các nửa được sắp xếp và chưa sắp xếp và lặp lại cho đến khi tất cả các yếu tố được sắp xếp. Sắp xếp chèn có độ phức tạp của O (n2). Bạn có thể đặt nó trong một phần mở rộng, như trong một ví dụ dưới đây, hoặc bạn có thể tạo một phương thức cho nó.
```
extension Array where Element: Comparable {
func insertionSort() -> Array<Element> {
    guard self.count > 1 else {
        return self
}
    //mutated copy
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
```

**Selection sort**

Selection sort được ghi nhận cho sự đơn giản của nó. Nó bắt đầu với phần tử đầu tiên trong mảng, lưu giá trị của nó dưới dạng giá trị tối thiểu (hoặc tối đa, tùy thuộc vào thứ tự sắp xếp). Sau đó, nó lặp lại thông qua mảng và thay thế giá trị min bằng bất kỳ giá trị nào khác nhỏ hơn sau đó min tìm thấy trên đường đi. Giá trị tối thiểu đó sau đó được đặt ở phần ngoài cùng bên trái của mảng và quá trình được lặp lại, từ chỉ mục tiếp theo, cho đến khi kết thúc mảng. Sắp xếp lựa chọn có độ phức tạp của O (n2) nhưng nó được coi là chậm hơn so với **Quick Sort **.

```
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
        swap(&output[primaryindex], &output[minimum])
} }
return output
```

**Quick Sort**

Quicksort là một trong những thuật toán tiên tiến. Nó có tính phức tạp về thời gian của O (n log n) và áp dụng chiến lược phân chia & chinh phục. Sự kết hợp này dẫn đến hiệu suất thuật toán tiên tiến. Quicksort trước tiên chia một mảng lớn thành hai mảng con nhỏ hơn: các phần tử thấp và phần tử cao. Quicksort sau đó có thể sắp xếp đệ quy các mảng con.

Các bước là:

Chọn một phần tử, được gọi là trục, từ mảng.

Sắp xếp lại mảng sao cho tất cả các phần tử có giá trị nhỏ hơn trục xuất hiện trước trục, trong khi tất cả các phần tử có giá trị lớn hơn trục xuất hiện sau nó (giá trị bằng nhau có thể đi theo một trong hai cách). Sau khi phân vùng này, trục nằm ở vị trí cuối cùng. Đây được gọi là hoạt động phân vùng.

Áp dụng đệ quy các bước trên cho mảng con của các phần tử có giá trị nhỏ hơn và riêng biệt với mảng con của phần tử có giá trị lớn hơn.

```
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
            swap(&self[currentIndex], &self[wallIndex])
        }
        //advance wall
        wallIndex += 1
    }
}
}
    return wallIndex
}
//move pivot to final position
if wallIndex != pivot {
    swap(&self[wallIndex], &self[pivot])
```

# Tổng kết
Bên trên mình đã điểm qua các thuật toán sắp xếp hay được sử dụng. Mỗi thuật toán có độ phức tạp và tốc độ khác nhau, tuỳ theo nhu cầu sử dụng mà chúng ta sẽ sử dụng thuật toán cho hợp lý. Hy vọng bài viết này mang lại sự hữu ích cho các bạn. Xin chào và hẹn gặp lại.