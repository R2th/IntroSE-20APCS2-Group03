Chào các đồng nghiệp của tôi, hôm nay tôi muốn chia sẻ một chút rằng : Khi còn là một cậu bé học sinh tôi rất thích môn toán, một đề bài đưa đến tôi, tôi luôn tìm cách giải ngắn gọn nhất và dĩ nhiên điều đó được các teacher đánh giá cao và cho điểm tốt hơn. Khi lập trình cũng vậy, vẫn cái tính cách ấy thì tôi muốn một chức năng phải được code một cách rõ ràng, ngắn gọn. Nhưng vì điều này không thể giải quyết ngày một ngày hai được vì chúng ta rất cần kinh nghiệm và kiến thức về ngôn ngữ chúng ta đang sử dụng. Swift theo tôi cảm nhận là một ngôn ngữ sinh ra để thực hiện khái niệm này. Càng 
những phiên bản về sau Swift càng mạnh mẽ hơn và để tôi ví dụ một số các functional programming đã giúp tôi khá nhiều cho điều đó.

**I. Các bài toán và cách giải**

1. Đầu bài ra ta có một array các số kiểu Int: 
 ```   
 let arrOneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ```
 Tạo 1 array mới gồm các số chia hết cho 2 từ arrOneToTen
 
 Basic: 
 ```
var evenSquares: [Int] = []
 
 for number in oneToTen {
     if number % 2 == 0 {
         evenSquares.append(number)
    }
 }
```

Advanced: 
```
let evenSquares = oneToTen.filter {$0 % 2 == 0}
```

2. Ta có 2 array như sau: 
```
let animals = ["Dog" , "Rabbit", "Horse"]
let food = ["Bone", "Carrot", "Grass"]
```

Tạo 1 array các tuple map động vật và thức ăn tương ứng 

Basic: 
```
for animal in animals {
    for food in foods {
        let tuple = (animal, food)
       arrTuple.append(tuple)
   }
}
```

Advanced:
 ```
let arrTuple = animals.flatMap { animal in
    foods.map {food in (animal, food)}
 }
```

3. Tiếp tục với 2 Set: 
```
let yearOfBirth1: Set = [1990, 1991, 1992, 1993, 1995, 2001, 2002]
let yearOfBirth2: Set = [1992, 2015, 2016, 2001, 2002, 2018, 2017]
```

a. Tạo 1 Set mới với các element yearOfBirth1 có nhưng yearOfBirth2 thì không có

Advanced: 
```
let yearOfBirthDifferent = yearOfBirth1.subtracting(yearOfBirth2)
```

```
result: [1990, 1991, 1993, 1995]
```

b. Tạo 1 Set mới với các năm sinh trùng nhau trong 2 Set trên
```
let yearOfBirthSame = yearOfBirth1.intersection(yearOfBirth2)
```

```
result: [1992, 2001, 2002]
```

c. Tạo 1 Set mới map 2 Set trên với nhau. Nếu 2 element trùng nhau thì sẽ chỉ lấy 1 element 
```
let yearOfBirthMap = yearOfBirth1.union(yearOfBirth2)
```

```
result: [1990, 1991, 1992, 1993, 1995, 2001, 2002, 2015, 2016, 2017, 2018]
```

3. Ta có 2 dictionary: 
```
let oldAddress = [
            "number" : "234",
            "district" : "South",
            "city" : "London",
            "street" : "Road One",
        ]

 let newAddress = [
            "number" : "456",
            "street" : "Road Two",
        ]        
```

Ta thấy địa chỉ mới này chỉ đổi số và tên đường. Làm thế nào để update address mới với thông tin mới và thông tin còn thiếu ở address cũ. 

Advanced: 

```
let updateAddress = oldAddress.merging(newAddress, uniquingKeysWith: { $1 })
```

```
result : ["district": "South", "number": "456", "city": "London", "street": "Road Two"]
```


**II. Kết luận**
Chúng ta đã thấy được sức mạnh của Swift. Nó đã giải quyết cho chúng ta quá nhiều thứ tưởng chừng như đơn giản nhưng nếu không có nhưng func advanced này ta có thể phải mất khá nhiều thời gian và cả những dòng code khá dài. Còn rất nhiều những thứ trong chủ đề Advanced này tôi sẽ cố gắng truyền tải cho các bạn một cách tốt nhất ở bài sau. Rất cám ơn các bạn