### Introduction

Trong bài viết [iOS Clean Architecture(P1)](https://viblo.asia/p/ios-clean-architecturep1-bWrZn1G9Kxw) Tôi đã giới thiệu với các bạn về Clean Architecture, hôm nay tôi xin giới thiệu với các bạn về việc kết hợp Clean architecture sử dụng RxSwift - Một thư viện nổi tiếng về Reactive Programming trong Swift

**Chúng ta cùng tìm hiểu nhé!**

### Tổng quan Clean architecture

![](https://images.viblo.asia/8400bf6b-915e-41d8-9695-32af8637254d.png)

**Domain**

Domain cơ bản chính là App của bạn là gì, nó có thể làm gì(Entities, UseCase, vv). Nó không phụ thuộc vào UIKit hoặc bất kể thư viện nào và nó không được implement ngoài các entities 

**Platform**

Platform implement cụ thể những khai báo từ Domain. Nó ẩn tất cả các details của implementation. Ví dụ: Database implement có thể là CoreDate, Realm hay Sqlite...

**Application**

Application có trách nhiệm cung cấp thông tin cho người dùng và xử lý thao tác của người dùng. Nó có thể được implement với bất kỳ mô hình nào(MVVM, MVC, MVP). 

### Detail overview

![](https://images.viblo.asia/adda7fb6-0525-41d7-adf5-60713a59c93f.png)
Để việc module hóa Domain, Platform và Application là các target riêng biệt trong ứng dụng, cho phép chúng ta tận dụng lợi thế của 
internal access layer trong Swift để ngăn chặn việc loại bỏ các loại mà chúng ta không muốn expose.

Để thực thi mô đun, Domain, Platform và Application là các mục tiêu riêng biệt trong ứng dụng, cho phép chúng ta tận dụng lớp truy cập nội bộ trong Swift để ngăn chặn việc loại bỏ các loại mà chúng ta không muốn phơi bày.

**Domain**

Entities được implement là kiểu Swift value types

```Swift
public struct Post {
    public let uid: String
    public let createDate: Date
    public let updateDate: Date
    public let title: String
    public let content: String
}
```

UseCases là các protocol thực hiện một việc cụ thể:

```Swift
public protocol PostsUseCase {
    func posts() -> Observable<[Post]>
    func save(post: Post) -> Observable<Void>
}
```

UseCaseProvider is a service locator. Trong ví dụ hiện tại, nó giúp việc ẩn các việc triển khai cụ thể các use cases.

**Platform**

Trong nhiều trường hợp chúng ta không thể sử dụng Swift Structs cho domain objects vì DB framework yêu cầu (Ví dụ: Cordata, Realm)

```Swift
final class CDPost: NSManagedObject {
    @NSManaged public var uid: String?
    @NSManaged public var title: String?
    @NSManaged public var content: String?
    @NSManaged public var createDate: NSDate?
    @NSManaged public var updateDate: NSDate?
}

final class RMPost: Object {
    dynamic var uid: String = ""
    dynamic var createDate: NSDate = NSDate()
    dynamic var updateDate: NSDate = NSDate()
    dynamic var title: String = ""
    dynamic var content: String = ""
}

final class PostsUseCase: Domain.PostsUseCase {
    
    private let repository: AbstractRepository<Post>

    init(repository: AbstractRepository<Post>) {
        self.repository = repository
    }

    func posts() -> Observable<[Post]> {
        return repository.query(sortDescriptors: [Post.CoreDataType.uid.descending()])
    }
    
    func save(post: Post) -> Observable<Void> {
        return repository.save(entity: post)
    }
}

final class Repository<T: CoreDataRepresentable>: AbstractRepository<T> where T == T.CoreDataType.DomainType {
    private let context: NSManagedObjectContext
    private let scheduler: ContextScheduler

    init(context: NSManagedObjectContext) {
        self.context = context
        self.scheduler = ContextScheduler(context: context)
    }

    override func query(with predicate: NSPredicate? = nil,
                        sortDescriptors: [NSSortDescriptor]? = nil) -> Observable<[T]> {
        let request = T.CoreDataType.fetchRequest()
        request.predicate = predicate
        request.sortDescriptors = sortDescriptors
        return context.rx.entities(fetchRequest: request)
            .mapToDomain()
            .subscribeOn(scheduler)
    }

    override func save(entity: T) -> Observable<Void> {
        return entity.sync(in: context)
            .mapToVoid()
            .flatMapLatest(context.rx.save)
            .subscribeOn(scheduler)
    }
}
```

Như bạn thấy, việc implementation chỉ là nội bộ vì chúng tôi không muốn để lộ dependecies của chúng tôi. Điểu duy nhất có thể được expose là từ Platform triển khai thực hiện cụ thể UseCaseProvider

```Swift
public final class UseCaseProvider: Domain.UseCaseProvider {
    private let coreDataStack = CoreDataStack()
    private let postRepository: Repository<Post>

    public init() {
        postRepository = Repository<Post>(context: coreDataStack.context)
    }

    public func makePostsUseCase() -> Domain.PostsUseCase {
        return PostsUseCase(repository: postRepository)
    }
}
```

**Application**

Trong ví dụ hiện tại, Application được implement với MVVM pattern và sử dụng RxSwift làm việc binding rất dễ dàng.

![](https://images.viblo.asia/b3a1734f-760a-4090-9625-26ecb5406e29.png)

```Swift
protocol ViewModelType {
    associatedtype Input
    associatedtype Output
    
    func transform(input: Input) -> Output
}
final class PostsViewModel: ViewModelType {
    struct Input {
        let trigger: Driver<Void>
        let createPostTrigger: Driver<Void>
        let selection: Driver<IndexPath>
    }
    struct Output {
        let fetching: Driver<Bool>
        let posts: Driver<[Post]>
        let createPost: Driver<Void>
        let selectedPost: Driver<Post>
        let error: Driver<Error>
    }
    
    private let useCase: AllPostsUseCase
    private let navigator: PostsNavigator
    
    init(useCase: AllPostsUseCase, navigator: PostsNavigator) {
        self.useCase = useCase
        self.navigator = navigator
    }
    
    func transform(input: Input) -> Output {
       ......
    }
    
```
    
ViewModel có thể được injected vào trong ViewController thông qua property injection hoặc cài đặt. Trong ví dụ hiện tại nó đã hoàn thành bởi Navigator.
    
```Swift
protocol PostsNavigator {
    func toCreatePost()
    func toPost(_ post: Post)
    func toPosts()
}

class DefaultPostsNavigator: PostsNavigator {
    private let storyBoard: UIStoryboard
    private let navigationController: UINavigationController
    private let services: ServiceLocator
    
    init(services: ServiceLocator,
         navigationController: UINavigationController,
         storyBoard: UIStoryboard) {
        self.services = services
        self.navigationController = navigationController
        self.storyBoard = storyBoard
    }
    
    func toPosts() {
        let vc = storyBoard.instantiateViewController(ofType: PostsViewController.self)
        vc.viewModel = PostsViewModel(useCase: services.getAllPostsUseCase(),
                                      navigator: self)
        navigationController.pushViewController(vc, animated: true)
    }
    ....
}

class PostsViewController: UIViewController {
    private let disposeBag = DisposeBag()
    
    var viewModel: PostsViewModel!
    
    ...
}
```
   
### Conclusion

Sự kết hợp Clean Architecture và RxSwift phần nào đã cho chúng ta thấy lợi ích của việc làm rõ từng layer trong project ngoài ra khi sử dụng RxSwift sẽ giúp cho việc binding dữ liệu trở nên rất dễ dàng và nhanh chóng.

Cám ơn bạn đã dành thời gian cho bài viết này!

##### _Nguồn:_
[https://github.com/sergdort/CleanArchitectureRxSwift)