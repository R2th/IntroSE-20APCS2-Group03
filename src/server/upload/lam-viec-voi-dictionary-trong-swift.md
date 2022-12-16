### Dictionary là gì?
Dictionary là một collection để lưu data dưới dạng cặp key - value không theo thứ tự.<br>
Mỗi Value được liên kết với một key duy nhất và bạn có thể tìm kiếm, truy cập value này thông qua key.<br>
Một ví dụ đơn giản, chúng ta cần tìm thủ đô của một quốc gia nào đó trên thế giới. <br>
Thì khi dùng Dictionary (key: quốc gia, value: thủ đô) để lưu trữ chúng ta có thể tìm kiếm được thủ đô một cách nhanh chóng vì chúng đã được lưu theo từng cặp key:value (quốc gia : thủ đô) do đó chỉ cần có tên quốc gia là có ngay thủ đô.<br>
Để clear hơn chúng ta hãy cùng thao tác với Dictionary ngay bây giờ.

### Cách khai báo một Dictionary
**1. Khai báo với một empty dictionary**
> Syntax:
> ```
> var someDict = [KeyType : ValueType]()
> ``` 
> Ví dụ: var someDict = [Int : String]()

<br/>

**2. Khai báo với tập hợp key và value định sẵn**

> `var someDict = [1:"One", 2:"Two", 3:"Three"]`
> 

<br>

**3. Khai báo với 2 arrays**

>```
>var cities = ["Delhi", "Bangalore", "Hyderabad"]
>var distance = [2000, 10, 620]
>let cityDistanceDic = Dictionary(uniqueKeysWithValues: zip(cities, distance))
>```

### Cách truy cập các elements trong Dictionary
**1. Truy cập trực tiếp**

>```
>let someDic = ["a":1, "b":2, "c":3, "d":4, "e":5, "f":6, "g":7, "h":8, "i":9]
>print(someDic["a"])
>print(someDic["h"])
>```
>
<br>

**2. Dùng vòng lặp để truy cập tất cả các elemements**

>```
>let someDic = ["a":1, "b":2, "c":3, "d":4, "e":5, "f":6, "g":7, "h":8, "i":9]
>for (key, value) in someDic {
>    print("key:\(key) value:\(value)")
>}
>```
### Cách modify các elememnts trong Dictionary
**1. Add thêm element**
>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>someDictionary["Japan"] = "Tokyo"
>print(someDictionary)
>```
>
<br>

**2. Update element**
>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", >"India":"NewDelhi"]
>someDictionary["Nepal"] = "KATHMANDU"
>print(someDictionary)
>```

### Các function và properties trong Dictionary
**1. isEmpty**<br>
Property này xác định dictionary có bất kỳ value nào hay không. Nếu không thì return true và ngược lại return false
>```
>let someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>print(someDictionary.isEmpty)
>```
>**return:** false


<br>**2. first**<br>
Property này dùng để truy cập phần tử đầu tiên của dictionary.
>Vì dictionary không có thứ tự, nên .first sẽ không phải là phần tử đầu tiên mà các bạn add vào dictionary đâu nhé.
>```
>let someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>print(someDictionary.first)
>```
> **result:** Optional((key: "China", value: "Beijing"))

> Nếu dictionary empty thì sẽ return nil.
>```
>var someDict = [Int:String]()
>print(someDict.first)
>```
>**result:** nil
>

<br>**3. count**<br>
Property này return tổng elements (key:value) có trong dictionary
>```
>let someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>print(someDictionary.count)
>```
>**return:** 3
>

<br>**4. keys**<br>
Property này return tất cả keys có trong dictionary
>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>let dictKeys  = Array(someDictionary.keys)
>print(dictKeys)
>```
>**return:**  ["China", "India", "Nepal"]

<br>**5. removeValue**<br>
Function này sẽ remove element ra khỏi dictionary
>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>someDictionary.removeValue(forKey: "Nepal")
>print(someDictionary)
>```
>**return:** ["India": "NewDelhi", "China": "Beijing"]

<br>**6. filter**<br>
Sẽ return các elements sau khi sàng lọc bằng một điều kiện nào đó.
>```
>var cities = ["Delhi","Bangalore","Hyderabad"]
>var distance = [2000,10,620]
>let cityDistanceDict = Dictionary(uniqueKeysWithValues: zip(cities, distance))
>var closeCities = cityDistanceDict.filter { $0.value < 1000 }
>print(closeCities)
>```
>**return:** ["Hyderabad": 620, "Bangalore": 10]<br>
>Ví dụ ở đây là in ra những cities có khoảng cách < 1000 <br>

### Những điều cần lưu ý
- Khi access vào key không tồn tại trong dictionary thì value = nil
>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>let val  = someDictionary["Japan"]
>print(val)
>```
>**return:** nil
- Keys có sự phân biệt giữa chữ hoa và chữ thường
>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>let lowerCaseVal  = someDictionary["nepal"]
>let uperCaseVal  = someDictionary["Nepal"]
>print(lowerCaseVal)
>print(uperCaseVal)
>```
>**return:** <br>
>nil<br>
>Optional("Kathmandu")
- Default value cho Key không tồn tại
>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi"]
>let val  = someDictionary["nepal", default:"Not Found"]
>print(val)
>```
>**return:** Not Found
>
>Trong trường hợp trên key = "nepal" không tồn tại nên return default value là Not Found.
>Nếu key = "nepal" tồn tại thì sẽ return value tương ứng của key này

>```
>var someDictionary = ["Nepal":"Kathmandu", "China":"Beijing", "India":"NewDelhi", "nepal":"aaaaa"]
>let val  = someDictionary["nepal", default:"Not Found"]
>print(val)
>```
>**return:** aaaa
>
### Kết:
Trên đây là tổng kết sơ lược về Dictionary. Dictionary được dùng rất phổ biến trong lập trình iOS. Hy vọng giúp ích được mọi người. :)