### 1.forEach(void f(E element)) → void
Thực thi hàm f cho từng phần tử trong list
![](https://images.viblo.asia/bb21acad-e8bf-4ad8-a09f-95e0ab88d6a0.png)
### 2.map<T>(T f(E e)) → Iterable<T>
Trả về một Iterable mới, sau khi transform từng phần bằng hàm f
![](https://images.viblo.asia/fe08fd0e-bf25-4a5a-b7e5-9dca33cfc692.png)
### 3.contains(Object element) → bool
Trả về true nếu trong list có chứa phần tử bằng element (sử dụng phương thức Object.== để kiểm tra)
![](https://images.viblo.asia/90b5496b-b55e-4096-a545-b47f6bb9a61d.png)
Trong ví dụ bên dưới, ta phải override hashCode và operator ==
    
![](https://images.viblo.asia/2868c62c-7543-45b4-bb2c-376efba0b778.png)
### 4.sort([int compare(E a, E b) ]) → void
Sắp xếp list theo thứ tự được xác định bởi hàm compare (nếu compare bị bỏ qua thì sẽ sử dụng Comparable.compare)
![](https://images.viblo.asia/be8b36f2-3ab2-4355-ae14-8160521affb0.png)

![](https://images.viblo.asia/48b61742-2bf4-482f-8be4-910a43f9dd90.png)
### 5.reduce(E combine(E value, E element)) → E
###         và fold<T>(T initialValue, T combine(T previousValue, E element)) → T
Reduce các phần tử của list thành một giá trị duy nhất, sử dụng hàm combine
* Reduce: trả về giá trị có kiểu là kiểu của phần tử trong list. Nếu list rỗng thì sẽ throw IterableElementError.noElement();
* Fold: cho phép cung cấp giá trị ban đầu initialValue và trả về giá trị có kiểu có kiểu tùy ý, không nhất thiết phải giống với kiểu của các phần tử trong list. Nếu list rỗng thì sẽ trả về initialValue

![](https://images.viblo.asia/b3ea67d8-9377-43f3-ada4-952cd7843aa2.png)

![](https://images.viblo.asia/c48083e4-9145-4f19-8447-516a525883ad.png)

### 6.every(bool f(E element)) → bool
Kiểm tra xem mọi phần tử trong list có thỏa mãn hàm f hay không
![](https://images.viblo.asia/7c06061f-c90e-4e7c-86a3-b17148ab07f9.png)
### 7.where(bool test(E element)) → Iterable<E>
###     firstWhere(bool test(E element), { E orElse() }) → E
###     lastWhere(bool test(E element), { E orElse() }) → E
###     singleWhere(bool test(E element)) → E
* Where (trong các ngôn ngữ khac thường gọi là `filter`): trả về một Iterable mới, mà tất cả các phần tử thỏa mãn hàm test
* FirstWhere: trả về phần tử đầu tiên thỏa mãn hàm test. Nếu không có phần tử thỏa mãn, trả về orElse(), nếu orElse bị bỏ qua, throw IterableElementError.noElement();
* LastWhere: tương tự firstWhere, nhưng trả về phần tử cuối
* SingleWhere: trả về một phần tử thòa mãn hàm test. Nếu không có hoặc có nhiều hơn một phần tử thỏa mãn sẽ throw StateError

![](https://images.viblo.asia/e4ee7bb4-aeff-46c3-8522-9dc89f181dc7.png)
### 8.take(int count) → Iterable<E>
###     và skip(int count) → Iterable<E>
* Take: trả về Iterable mới của count phần tử đầu tiên
* Skip: trả về Iterable mới bỏ qua count phần tử đầu tiên

![](https://images.viblo.asia/9e39ae26-3b99-467c-b31d-d12878758dc3.png)

### 9.List.from(Iterable elements, { bool growable: true })
Tạo list mới chứa tất cả các phần tử của elements
![](https://images.viblo.asia/35633830-9229-4332-9295-59f9cc4371bf.png)
### 10.expand<T>(Iterable<T> f(E element)) → Iterable<T>
Expands mỗi phần tử thành không hoặc nhiều phần tử (trong các ngôn ngữ khac thường gọi là `flatMap`)
    
![](https://images.viblo.asia/e1770816-a390-4df0-95b9-c4fd212b01f4.png)

![](https://images.viblo.asia/75ce2658-5f29-41e7-a335-2ce1d5deffca.png)