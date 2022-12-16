## Update 
Với phiên bản mới nhất của Xcode 9.3 và Swift 4.1, "Sequence.flatMap (_ : )" đã bị deprecated và được đổi tên thành "compactMap (_ : )"
![](https://images.viblo.asia/6d07346e-2463-4faf-8419-c9ae1d051a18.png)

## 1: Map()
Map là một loại chức năng được sử dụng với các đối tượng giả lập như một mảng hoặc các set. 
Nó có thể áp dụng và biến đổi từ một loại object này sang loại object khác.
Chúng ta hãy lấy ví dụ về một chuỗi array:
```
let houseName:[String] = [“starks” ,”lanniesters” , “targaryens” ,”baratheon” , “arryn”]
```

Bây giờ chúng ta cần đếm số văn bản trong mỗi phần tử và chúng ta cần kết quả trong mảng tương ứng:
```
func characterCount(house:[String]) -> [Int]
{
    var characterCountArray = [Int]()
    for item  in house
    {
      characterCountArray.append(item.count)
    }
    return characterCountArray
}
let houseCharacterCount = characterCount(house: houseName)
print(" Characters count of each element in house name :- \(houseCharacterCount)")
```

Đoạn mã trên sẽ in ra:
```
Characters count of each element in house name :- [6, 11, 10, 9, 5]
```

Ở phía trên, bạn đang viết hàm trong đó mảng được truyền và sau đó chúng được đếm
Nhưng sử dụng map, tất cả mọi thứ có thể được thực hiện trong một dòng:
```
let mappedHouseCount = houseName.map{$0.count}
```

Chúng ta hãy xác minh cả hai kết quả:
```
let check = houseCharacterCount == mappedHouseCount
print(Check)
```

Điều này sẽ in "True", bạn đang nhận được kết quả tương tự chỉ với một dòng mã bằng cách sử dụng Map.
Map có thể được sử dụng cho bất kỳ hàm nào, giả sử chúng ta cần tất cả các chữ in hoa.
```
let upperCaseHouse = houseName.map { $0.uppercased()}
print(upperCaseHouse)
```

Kết quả trên sẽ được in như hình dưới đây:
```
[“STARKS”, “LANNIESTERS”, “TARGARYENS”, “BARATHEON”, “ARRYN”]
```

### Map cũng có thể được kết hợp với chức năng người dùng bằng văn bản
Hãy lấy một mảng số mà chúng ta cần phải tìm giai thừa cho mỗi số
```
let numberArray:[Int] = [2,5,10,15,20]
```

Vì vậy, chúng tôi tạo ra extension dưới đây để tìm giai thừa của mỗi số trong numberArray

```
extension Int
{
     func factorial() -> Int
     {
        var fact: Int = 1
        for i in 1…self
        {
            fact = fact * i
        }
        return fact
      }
}
let factorialResult = numberArray.map{$0.factorial()}
print(factorialResult)
```

Kết quả trên sẽ in ra dưới dạng:
```
[2, 120, 3628800, 1307674368000, 2432902008176640000]
```

Map cũng có thể được sử dụng cho boolean như dưới đây
```
let grade:[Int] = [30,45,50,100,12,28,46,31,34]
let boolVal:[Bool] = grade.map{$0 >= 35 ? true :false }
print(boolVal)
```

Kết quả của boolean sẽ như dưới đây:
```
[false, true, true, true, false, false, true, false, false]
```

Lưu ý: - Trong map thứ tự thực hiện không được bảo đảm theo thứ tự nhưng như trong trường hợp for-each.
```
houseName.forEach{print($0)}
let upperCaseHouse = houseName.forEach {$0.uppercased()}
```

## 2: compactmap()
compactmap giống với chức năng map với khả năng xử lý tùy chọn
```
let place:[String?] = [“winterfell” , “highgarden” , “Vale” , “iron islands” , “essos” ,”andalos”]
let printValue = place.map{$0}
print(printValue)
[Optional(“winterfell”), Optional(“highgarden”), Optional(“Vale”), Optional(“iron islands”), Optional(“essos”), Optional(“andalos”)]
```
Các giá trị được in có các tùy chọn trong đó nó có thể tránh được bằng cách sử dụng compactMap
```
let compactMapValue = place.compactMap{$0}
print(compactMapValue) // here the optionals are removed
["winterfell", "highgarden", "Vale", "iron islands", "essos", "andalos"]
```

compactMap cũng được sử dụng để lọc ra giá trị nil
```
let arrayWithNil:[String?] = [“eleven” , nil , “demogorgon” , nil , “max” , nil , “lucus” , nil , “dustin”]
let filteredNilArray = arrayWithNil.compactMap{$0}
print(filterNilArray)
print (“Array with nil = \(arrayWithNil.count) and with out nil count = \(filterNilArray.count)”)
```

Các giá trị được in là:
```
[“eleven”, “demogorgon”, “max”, “lucus”, “dustin”]
Array with nil = 9 and with out nil count = 5
```

CompactMap sẽ có ích khi bạn cần một kiểm tra trên không hoặc được làm việc trên các loại tùy chọn như dưới đây, nơi bạn cần phải chuyển đổi một chuỗi vào một số nguyên mà giá trị chuyển đổi là optionals.
```
let numArray:[String] = [“45” , “60” , “75” , “something random error” , “15” , “Another Error”]
let integerArray:[Int] = numArray.compactMap{Int($0)}
print(gradeActualArray)
```

Kết quả của một số nguyên thu được bằng cách loại bỏ các error
```
[45, 60, 75, 15]
```

## 3: filter()
filter được sử dụng để chọn mục rõ ràng dựa trên điều kiện.
```
let numbers = Array(1…100)
let evenNumbers = numbers.filter{ $0%2 == 0}
print(evenNumbers)
```

Mảng được lọc sẽ như dưới đây:
```
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100]
```

Chức năng filter để kiểm tra giá trị chuỗi
```
let name:[String] = [“jon snow” , “Arya Stark” , “Jamie Lanniester” , “Sansa Stark” , “Renly Barathon” , “Catelen Stark” ,”Theon Grayjoy” ,”Ned Stark”]
let starkFamily = name.filter{$0.hasSuffix(“Stark”)}
print(starkFamily)
[“Arya Stark”, “Sansa Stark”, “Catelen Stark”, “Ned Stark”]
```

Một ví dụ khác của bộ lọc
```
let arrayWith_min_10_char = name.filter{ $0.count > 10}
print(arrayWith_min_10_char)
```

Ở đây tên với số ký tự lớn hơn 10 được lọc và in dưới đây
```
[“Jamie Lanniester”, “Sansa Stark”, “Renly Barathon”, “Catelen Stark”, “Theon Grayjoy”]
```

Lưu ý: - Ở đây whiteSpace cũng được coi là một character

## 4: sorted()
sorted được sử dụng để sắp xếp lại các phần tử trong Array

```
let randomNumbers:[Int] = [1 ,3,45,6743,4673,435,4162,6657,2431,658,686,56,3456,8875,325,46,2,66537,6]
```

Đơn giản để phân loại số:

```
let sortednumber = randomNumbers.sorted()
print(sortednumber)
```

Các số mảng được sắp xếp là:

```
[1, 2, 3, 6, 45, 46, 56, 325, 435, 658, 686, 2431, 3456, 4162, 4673, 6657, 6743, 8875, 66537]
```

Cùng một kiểu có thể được thực hiện cho chuỗi

```
let alphabets:[Character] = [“V” ,”I” ,”S” , “H” ,”W” ,”A” ,”S” , “v” ,”i” ,”s” ,”h” , “w” ,”a” ,”s”]
let sortedAlphabets = alphabets.sorted()
print(sortedAlphabets)
```

Các chuỗi được sắp xếp Array đầu ra như dưới đây

```
[“A”, “H”, “I”, “S”, “S”, “V”, “W”, “a”, “h”, “i”, “s”, “s”, “v”, “w”]
```

Chú ý: Các dây được sắp xếp dựa trên giá trị ASCII A-Z (65-90) và a-z (97-122)

Vài ví dụ khác:

```
let evenFirstSorted = randomNumbers.sorted 
{ (a, b) -> Bool in
    return a % 2 == 0
}
print(evenFirstSorted)
[6, 2, 46, 3456, 56, 686, 658, 4162, 1, 3, 45, 6743, 4673, 435, 6657, 2431, 8875, 325, 66537]
```

sorted có thể được thực hiện dựa trên <(nhỏ hơn),> (lớn hơn)

```
let greaterThanArray = randomNumbers.sorted(by: >)
let lesserThanArray = randomNumbers.sorted(by: <)
print(greaterThanArray)
print(lesserThanArray)
// greater than
[66537, 8875, 6743, 6657, 4673, 4162, 3456, 2431, 686, 658, 435, 325, 56, 46, 45, 6, 3, 2, 1]
// lesser than
[1, 2, 3, 6, 45, 46, 56, 325, 435, 658, 686, 2431, 3456, 4162, 4673, 6657, 6743, 8875, 66537]
```

## 5: reduce()
reduce được sử dụng để kết hợp tất cả các phần tử trong Array để tạo một giá trị duy nhất.
```
let sumOfNumbers = numbers.reduce(0,{$0 + $1})
print(sumOfNumbers)
5050
```

Ở đây giá trị ban đầu ($ 0) sẽ là 0 và giá trị từ mảng num được thêm vào giá trị ban đầu, được giữ lại cho lần lặp tiếp theo. Cuối cùng, một giá trị được trả về

Cùng một kiểu có thể có được với chuỗi Array, nơi mà tất cả các yếu tố chuỗi được hợp nhất thành một chuỗi duy nhất

```
let nameString = name.reduce(“”, {$0 + $1.replacingOccurrences(of: “ “, with: “”)})
print("type of name :- \(type(of: name)) , type of nameString :-  \(type(of: nameString))")
```

Chúng ta có thể thấy sự khác nhau giữa tên và tên chuỗi bên dưới

```
type of name :- Array<String> , type of nameString :- String
```

Một số ví dụ khác về reduce

```
let stringOfNumbers = numbers.reduce(“”, {String($0) + String($1)})
print(stringOfNumbers)
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100
```

Đếm tất cả các ký tự trong một mảng:

```
let nameArrayCharactersCount = name.reduce(0, {$0 + $1.count})
print(nameArrayCharactersCount)
94
```

Tìm Tên dài nhất:

```
let longestname = name.reduce(“”, {$0.count > $1.count ? $0 : $1 } )
print(longestname)
Jamie Lanniester
```