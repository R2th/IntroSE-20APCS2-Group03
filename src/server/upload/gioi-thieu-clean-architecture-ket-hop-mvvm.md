# Giới thiệu về Clean Architecture
Đây là mồ hình giúp cấu trúc gíup phân tách các chức năng qua các lớp. Thông qua mô hình này, sẽ hỗ trợ rất nhiều thông qua việc suy nghĩ logic cẩn thận và hiệu quả, nhận ra sự không phù hợp giữa Use Cases và Entities, đặt ra hướng đi trong hệ thống. Nó cũng hướng tới sự độc lập tối đa của bất kì thư viện hay tool nào, để phù hợp cho việc kiểm tra và thay thế chúng.

## Áp dụng cùng MVVM 

![](https://images.viblo.asia/50be7571-237a-409f-8007-218e3cd9b9fd.png)

* Domain Layer: Entites + Use Cases + Gatway Protocols
* Data Layer: Gateway Implementations + API(Network) + Database
* Presentation Layer: ViewModels + Views+ Navigator + Scene Use Cases 

Hướng xử lý
![](https://images.viblo.asia/b874c030-e6c7-4ba8-ae02-ccb63fdffa61.png)

## Đi vào chi tiết
![](https://images.viblo.asia/2036912a-d878-4347-a5e0-ede872dfd564.png)

## Lớp Domain
![](https://images.viblo.asia/eb19d97f-9630-4c22-a721-8fbb92438eb2.png)

### Entities
Chứa các Business logic. Là lớp quan trọng nhất, nơi bạn thực hiện giải quyết các vấn đề - mục đích khi xây dựng app. 1 entity có thể là 1 object với các phương thức, hoặc nó là 1 tập hợp của struct và hàm. Điều đó không quan trọng, entities có thể sử dụng bởi nhiều cách khác nhau trong cùng 1 ứng dụng.
Entites có thể đơn giản là dữ liệu structures:
``` swift
struct Product {
    var id = 0
    var name = ""
    var price = 0.0
}
```

### Use Cases
Chưa các rule về apploaction-specific. Nó đóng gói và triển khai tất cả các ca sử dụng trong hệ thống. Các ca sử dụng cấu trúc các luồng dữ liệu tới và đi từ entites, và hướng các entities đó tới các Critical Business Rules -> mục đích của các ca sử dụng. 
UseCases là những protocol, để làm những việc cụ thể như:
``` swift
protocol GettingProductList {
    var productGateway: ProductGatewayType { get }
}

extension GettingProductList {
    func getProductList(dto: GetPageDto) -> Observable<PagingInfo<Product>> {
        return productGateway.getProductList(dto: dto)
    }
}
```

### Gateway Protocols
Về cơ bản, gateway chỉ là 1 phần trừu tượng mà sẽ hiển những công việc được triển khai phía dưới. Nó có thể là 1 Data Store (pattern Repository), 1 API gateway, v...v. Chẳng hạn với Database gateway sẽ có những phương thức để thực hiện yêu cầu của ứng dụng. Tuy nhiên, đừng cố gắng ẩn hết các quy tắc rule quan trọng qua gateway. Tất cả truy vấn tới database phải tương đối đơn giản như phương pháp CRUD , và tất nhiên 1 số bộ lọc cũng được chấp nhận. 

```
protocol ProductGatewayType {
    func getProductList(dto: GetPageDto) -> Observable<PagingInfo<Product>>
    func deleteProduct(dto: DeleteProductDto) -> Observable<Void>
    func update(_ product: ProductDto) -> Observable<Void>
}
```

## Lớp Data

![](https://images.viblo.asia/02c84ddb-c369-4028-9546-b69a8efc3289.png)

Lớp Data chứa các triển khai Gateway và 1 hoặc nhiều Data Stores. Gateway là phản hồi cho dữ liệu điều phối từ những Data Store. Data Store có thể online hoặc offline (ví dụ presistent database). Lớp Data chỉ phụ thuộc vào lớp Domain. 
### Gateway Implementations 
``` swift
struct ProductGateway: ProductGatewayType {
    func getProductList(dto: GetPageDto) -> Observable<PagingInfo<Product>> {
        return API.shared.getProductList(API.GetProductListInput())
            .map { PagingInfo(page: 1, items: $0) }
    }
    
    func deleteProduct(dto: DeleteProductDto) -> Observable<Void> { ... }
    func update(_ product: ProductDto) -> Observable<Void> { ... }
}
```

### UserDefaults
``` swift
enum AppSettings {
    @Storage(key: "didInit", defaultValue: false)
    static var didInit: Bool
}
```

### APIs

``` swift
extension API { 
    func getRepoList(_ input: GetRepoListInput) -> Observable<GetRepoListOutput> {
        return request(input)
    }
}

// MARK: - GetRepoList
extension API {
    final class GetRepoListInput: APIInput {
        init(page: Int, perPage: Int = 10) {
            let params: JSONDictionary = [
                "q": "language:swift",
                "per_page": perPage,
                "page": page
            ]
            super.init(urlString: API.Urls.getRepoList,
                       parameters: params,
                       requestType: .get,
                       requireAccessToken: true)
        }
    }
    
    final class GetRepoListOutput: APIOutput {
        private(set) var repos: [Repo]?
        
        override func mapping(map: Map) {
            super.mapping(map: map)
            repos <- map["items"]
        }
    }
}
```

Map JSON Data tới Domain Entities sử dụng ObjectMapper:
``` swift
import ObjectMapper 

extension Product: Mappable {
    init?(map: Map) {
        self.init()
    }
    
    mutating func mapping(map: Map) {
        id <- map["id"]
        name <- map["name"]
        price <- map["price"]
    }
}
```

### CoreData Repositories
Map CoreData Entities tới Domain Entitites và ngược lại:
```
import MagicalRecord

protocol UserRepository: CoreDataRepository {
   
}

extension UserRepository where Self.ModelType == User, Self.EntityType == CDUser {
    func getUsers() -> Observable<[User]> {
        return all()
    }

    func add(dto: AddUserDto) -> Observable<Void> {
        guard let users = dto.users else { return Observable.empty() }
        return addAll(users)
    }
    
    static func map(from item: User, to entity: CDUser) {
        entity.id = item.id
        entity.name = item.name
        entity.gender = Int64(item.gender.rawValue)
        entity.birthday = item.birthday
    }
    
    static func item(from entity: CDUser) -> User? {
        guard let id = entity.id else { return nil }
        return User(
            id: id,
            name: entity.name ?? "",
            gender: Gender(rawValue: Int(entity.gender)) ?? Gender.unknown,
            birthday: entity.birthday ?? Date()
        )
    }
}
```

Vậy là chúng ta đã kết thúc phần 1, về kết hợp mô hình MVVM và cấu trúc Clean Architectures. Hẹn gặp lại vào phần 2.
Nguồn bài gốc anh [Tuấn](https://github.com/tuan188/MGCleanArchitecture)