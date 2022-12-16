Codeable là một protocol dùng để convert một object Swift thành kiểu Data. Codeable là một type alias cho protocal Encodealbe và Decodable. Đây là một protocal chính thức và dễ sử dụng để parsing JSON object từ server thành một Swift Object.

Encodable thường được sử dụng khi Swift object phải serialised và gửi lên server. Mặt khác, Decodable được sử dụng khi JSON từ Server phải được deserialised.

Hơn nữa, custom object conform Codable giờ đã có thể lưu và truy xuất từ UserDefaults trực tiếp với chỉ 3 bước. Tiết kiệm rất nhiều thời gian.

# Basic parsing — Simple JSON

```
{
    "key_str": "string value",
    "key_int": 1,
    "key_double": 100.0,
    "key_int_array": [
      1,
      2,
      3
    ]
}
```
Cùng lấy JSON trên như một ví dụ và thử parse nó sang Swift object. Nó có 4 trường với các kiểu: String, Int, Double và Int Array. Chúng đều là những kiểu thông thường trong JSON.
```
struct DemoCodableStruct: Codable {
  let key_str: String
  let key_int: Int
  let key_double: Double
  let key_int_array: [Int]
}
```
Bằng cách tạo một object conform Codable, JSON có thể decode trực tiếp thành Swift object.
```
let basicJSON = """
  {
      "key_str": "string value",
      "key_int": 1,
      "key_double": 100.0,
      "key_int_array": [
        1,
        2,
        3
      ]
  }
  """

  do {
    let basicJSONData = basicJSON.data(using: .utf8)!
    let demoCodableStruct = try JSONDecoder().decode(DemoCodableStruct.self, from: basicJSONData)
    print("\(demoCodableStruct)")
    
    /*
    Log: 
    DemoCodableStruct(
      key_str: "string value", 
      key_int: 1, 
      key_double: 100.0, 
      key_int_array: [1, 2, 3]
    )
    */
  } catch {
    print("Error during ecoding: \(error.localizedDescription)")
  }
```
![](https://images.viblo.asia/93c0ccc7-4a14-47a5-bbc4-9fe2a10afe81.png)
Mặc định tên biến trong cấu trúc swift sẽ map với tên key trong JSON.
# Key customisation
Theo coding convention, snake case (vd: foo_key) thường được sử dụng trong JSON nhưng camel case (vd: fooKey) lại thường được sử dụng trong Swift. Do đó, Apple đã giới thiệu một protocal CodeingKey để cung cấp khả năng custom key name khi chúng ta parse JSON.
```
struct DemoCodableStruct: Codable {
  let strProp: String
  let intProp: Int
  let doubleProp: Double
  let intArrayProp: [Int]
  
  enum CustomMappingKey: String, CodingKey {
    case strPropKey = "key_str"
    case intPropKey = "key_int"
    case doublePropKey = "key_double"
    case intArrayPropKey = "key_int_array"
  }
  
  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CustomMappingKey.self)
    strProp = try container.decode(String.self, forKey: .strPropKey)
    intProp = try container.decode(Int.self, forKey: .intPropKey)
    doubleProp = try container.decode(Double.self, forKey: .doublePropKey)
    intArrayProp = try container.decode([Int].self, forKey: .intArrayPropKey)
  }
}
```
# Encoding customisation
```
struct DemoCodableStruct: Codable {
  let strProp: String
  let intProp: Int
  let doubleProp: Double
  let intArrayProp: [Int]
  
  enum CustomMappingKey: String, CodingKey {
    case strPropKey = "key_str"
    case intPropKey = "key_int"
    case doublePropKey = "key_double"
    case intArrayPropKey = "key_int_array"
  }
  
  func encode(to encoder: Encoder) throws {
    var container = encoder.container(keyedBy: CustomMappingKey.self)
    try container.encode(strProp, forKey: .strPropKey)
    try container.encode(intProp, forKey: .intPropKey)
    
    /*
     Ignored properties:
     ```
     try container.encode(strProp, doubleProp: .doublePropKey)
     try container.encode(strProp, intArrayProp: .intArrayPropKey)
     ```
     */
  }
}
```

Để giảm traffic tới server, chỉ những trường cần thiết mới có thể Serialised và gửi tới server,  encode(to encoder: Encoder) cung cấp khả năng tùy biến serialisation và bỏ qua những trường dư thừa. Trong ví dụ trên, chỉ có strProp và intProp là được serialised và doubleProp và intArrayProp đều bị bỏ qua.

Nguồn tham khảo: https://itnext.io/swift-codable-json-parser-8661bb57bea7