![](https://miro.medium.com/max/1450/1*ctTsvKlwqgDXx4W0fALqeg.png)

Kể từ khi Clean Architechture trở thành một chủ đề hot trong việc phát triển ứng dụng Android đã có rất nhiều bài viết hay những sample project để giải thích cách thức hoạt động và lợi ích của nó. Tuy nhiên tôi luôn nghe thấy những câu hỏi. Tại sao cần đến Use Cases?, Use Case để làm gì?, Sao không gọi thắng trực tiếp từ Repository cho ViewModel hay Presenter?

Ở bài viết này chúng ta cũng làm rõ chúng nhé 

### Clean Architechture Layer 
 ![](https://miro.medium.com/max/532/1*CAdK7Eqcbaof4p-N_HHv8Q.png)
 Để hiểu về use cases, điều đầu tiên chúng ta cần hiểu về các tầng trong Clean Architechture
 
 ### Tách biệt các thành phần liên quan 
 Một trong những mục đích chính của các kiến trúc là để tách biệt các thành phần trong ứng dụng làm cho chúng linh hoạt nhất có thể
 Có nhiều cách khác nhau để chia một hệ thống phần mềm thành các thành phần, nhưng sau nhiều năm phát triển đúc kết kinh nghiệm, họ đã chia thành  một số tầng tiêu chuẩn:
 1. **Presentation** : Chịu trách nghiệm việc hiển thị thông tin cho người dùng
 2. **Application** : Định nghĩa các công việc mà phần mềm được cho là thực hiện bằng cách phối hợp luồng dữ liệu từ và đến các domain model
 3. **Domain** : Thể hiện các khái niệm về business logic của ứng dụng
 4. **Data** : Chứa các domain model

### Layers implementation
Mỗi tầng có thể cài đặt theo nhiều cách khác nhau, dựa theo mô hình của ứng dụng ta có thể chọn theo nhiều phương pháp khác nhau:

* Nếu bạn đang viết một tập lệnh bash đơn giản, bạn có thể chia thủ tục chính của mình thành các chương trình con khác nhau.
* Nếu bạn đang viết một plugin Android Studio đơn giản, bạn có thể tách các tầng của mình trong các class khác nhau.
* Nếu bạn đang viết một ứng dụng đơn giản, bạn có thể tách các tầng bằng các packages
* Nếu bạn đang viết một ứng dụng hoặc Dịch vụ web phức tạp, bạn có thể tách các layer bằng các modules

Tôi chắc chắn rằng bạn đã nhìn thấy 3 module chính trong một số ví dụ sample về Clean Architechture : Presentation, Domain, Data 
Điều này được tiếp cần theo [PresentationDomainDataLayering](https://martinfowler.com/bliki/PresentationDomainDataLayering.html), khi đó Application layer nằm chung với Domain Layer 

Lúc này có lẽ bạn lại có thêm một câu hỏi. Tại sao Domain và Application lại nằm cũng nhau khi chúng là 2 tầng khác nhau?

Hừm, thực chất thì Domain và Application Layer cả 2 đều thể hiện business logic tuy nhiên bản chất của nó là 2 loại khác nhau 

1. **Domain business logic** : ở đây bạn có thể thấy các model trong ứng dụng, có thể thuộc các kiểu khác nhau và thực hiện các quy định về bussiness
2. **Application business logic** : ở đây bạn có thể tìm thấy cái gọi là usecases nằm trên đỉnh của các model cho tầng Data Layer 

Trong PresentationDomainDataLayering mỗi package đại diện cho 1 phần khác nhau: UI logicm business logic và persistence logic. Do Domain và Application đều bao gồm cùng một topic nên chúng được kết hợp với nhau thành 1 module, chúng ta có thể tách biệt 2 phần với nhau bằng package trong module
![](https://miro.medium.com/max/666/1*aiQ9uRG1LtuiPu6fTcFCjw.png)

Điều gì sẽ xảy ra khi chúng ta không chia các thành phần đúng cách? Câu trả lời là chúng ta sẽ có các "God Object"

Cùng xem một ví dụ ViewModel không sử dụng Use cases và một ViewModel sử dụng Use cases 

**Không sử dụng Use case**

```kotlin 
lass TransactionsViewModelImpl(
    private val userRepository: UserRepository,
    private val transactionRepository: TransactionRepository
) : TransactionsViewModel, ViewModel() {

    private val compositeDisposable = CompositeDisposable()

    override val transactions = MutableLiveData<List<Transaction>>()
    override val showProgress = MutableLiveData<Boolean>()
    override val showError = MutableLiveData<Boolean>()
    override val showContent = MutableLiveData<Boolean>()

    override fun loadTransactions() {
        when (val result = userRepository.getUser()) {
            is Result.Success -> loadUserTransactions(result.value)
            is Result.Failure -> setErrorState()
        }
    }

    private fun loadUserTransactions(user: User) {
        setLoadState()
        transactionRepository.getUserTransactions(user)
            .subscribeBy {
                handleResult(it)
            }.addTo(compositeDisposable)
    }

    private fun setLoadState() {
        showProgress.postValue(true)
        showError.postValue(false)
        showContent.postValue(false)
    }

    private fun handleResult(result: Result<List<Transaction>>) {
        when (result) {
            is Result.Success -> setContentState(result.value)
            is Result.Failure -> setErrorState()
        }
    }

    private fun setContentState(transactionsResult: List<Transaction>) {
        showContent.postValue(true)
        transactions.postValue(transactionsResult)
        showProgress.postValue(false)
        showError.postValue(false)
    }

    private fun setErrorState() {
        showError.postValue(true)
        showProgress.postValue(false)
        showContent.postValue(false)
    }

    override fun onCleared() {
        compositeDisposable.clear()
        super.onCleared()
    }

}
```

```kotlin 
// A wrapper for handling failing requests
sealed class Result<T> {

    data class Success<T>(val value: T) : Result<T>()

    data class Failure<T>(val throwable: Throwable) : Result<T>()

}

// The models (simplified)
data class User(val id: String)
data class Transaction(val id: String, val amount: Float)

// The repository for the transactions
interface TransactionRepository {
    fun getUserTransactions(user: User): Single<Result<List<Transaction>>>
}

// The repository for the user
interface UserRepository {
    fun getUser(): Result<User>
}

```

**Sử dụng Use cases **

```kotlin 
// User
interface GetCurrentUserUseCase {
    operator fun invoke(): Result<User>
}

class GetCurrentUserUseCaseImpl(
    private val userRepository: UserRepository
) : GetCurrentUserUseCase {
    override fun invoke(): Result<User> = userRepository.getUser()
}

// Transaction
interface GetUserTransactionsUseCase {

    operator fun invoke(): Single<Result<List<Transaction>>>

}

class GetUserTransactionsUseCaseImpl(
    private val getCurrentUserUseCase: GetCurrentUserUseCase,
    private val transactionRepository: TransactionRepository
) : GetUserTransactionsUseCase {

    override fun invoke(): Single<Result<List<Transaction>>> {
        return when (val result = getCurrentUserUseCase()) {
            is Result.Success -> transactionRepository.getUserTransactions(result.value)
            is Result.Failure -> Single.just(Result.Failure(result.throwable))
        }
    }

}
```

Tất cả các thành phần dependencies trước đó vẫn giữ nguyên như trước với sự khác biệt duy nhất là chúng ta sử dụng use cases trong ViewModels 

```kotlin 
class TransactionsViewModelImpl(
    private val getUserTransactionsUseCase: GetUserTransactionsUseCase
) : TransactionsViewModel, ViewModel() {

    private val compositeDisposable = CompositeDisposable()

    override val transactions = MutableLiveData<List<Transaction>>()
    override val showProgress = MutableLiveData<Boolean>()
    override val showError = MutableLiveData<Boolean>()
    override val showContent = MutableLiveData<Boolean>()

    override fun loadTransactions() {
        setLoadState()
        getUserTransactionsUseCase()
            .subscribeBy {
                handleResult(it)
            }.addTo(compositeDisposable)
    }

    private fun setLoadState() {
        showProgress.postValue(true)
        showError.postValue(false)
        showContent.postValue(false)
    }

    private fun handleResult(result: Result<List<Transaction>>) {
        when (result) {
            is Result.Success -> setContentState(result.value)
            is Result.Failure -> setErrorState()
        }
    }

    private fun setContentState(transactionsResult: List<Transaction>) {
        showContent.postValue(true)
        transactions.postValue(transactionsResult)
        showProgress.postValue(false)
        showError.postValue(false)
    }

    private fun setErrorState() {
        showError.postValue(true)
        showProgress.postValue(false)
        showContent.postValue(false)
    }

    override fun onCleared() {
        compositeDisposable.clear()
        super.onCleared()
    }

}
```

Nhìn thoáng qua chúng ta thấy rằng với các use cases, các viewmodels của chúng ta gọn gàng hơn nhiều vì chúng không thuộc dataflow logic

Bạn có thể thấy rằng phương pháp không sử dụng use cases không có scale tốt, nếu TransactionRepository bây giờ cần một extra parameter từ một repository khác, TransitionViewModel của ta sẽ cần sử dụng một repository bổ sung và có thể phải sử lý thêm cả logic sucess/failure nữa

Và một cái nữa là, nhờ vào use cases khi mà bạn có một logic data flow tương tự bạn có thể sử dụng lại -> tăng reusability

Nhiều khi viết use cases bạn có thể gặp một tình huống sau:

```kotlin 
class SomeUseCaseImpl(
    private val someRepository: SomeRepository
): SomeUseCase {
    override fun invoke() = someRepository.getSomething()
}
```

Tôi biết rất rõ tình huống này và trường hợp này cũng rất phổ biến hơn trường hợp use cases thực sự thực hiện một công việc gì đó

Tuy nhiên ngay cả khi không làm gì chỉ việc gọi một repository method, ta vẫn có những lí do để sử dụng use cases 

**Consistency : Tính đồng nhất** : Sẽ là khônng tốt nếu một số ViewModel gọi các use cases nhưng một số khác lại được gọi từ repository

**Tốt cho việc thay đổi trong tương lai** : Một trong những mục đích của Clean Architechture là cung cấp trong bạn codebase để bạn dễ dàng thích ứng khi thay đổi yêu câu (change spec), khi đó số lượng code thay đổi là tối thiểu

Chúng ta cùng xem xét case này 

```kotlin
interface SomeRepository {
    fun doSomething()
}
class SomeViewModel1(private val someRepository: SomeRepository) {
    //...
    fun doSomething() {
        //...
        someRepository.doSomething()
        //...
    }
    //...
}
class SomeViewModel2(private val someRepository: SomeRepository) {
    //...
    fun doSomething() {
        //...
        someRepository.doSomething()
        //...
    }
    //...
}
class SomeViewModel3(private val someRepository: SomeRepository) {
    //...
    fun doSomething() {
        //...
        someRepository.doSomething()
        //...
    }
    //...
}
```

Bạn có thể thấy rằng SomeRepository được sử dụng ở rất nhiều nơi. Vậy nếu mà yêu cầu thay đổi làm cho repository thay đổi, method doSomething cần một model từ một SomeOtherRepository nào đó -> ảnh hưởng khá lớn 

Nhưng nếu bạn sử dụng use cases, bạn chỉ cần chỉ chỉnh sửa code tại use cases 

### Screaming Architecture

Tôi nghĩ là bạn cũng không có một tài liệu cụ thể nào miêu tả ứng dụng mà bạn đang làm. Thực ra tôi cũng không yêu cầu bạn có một cái như thế, nhưng muốn biết ứng dụng làm gì thì nên xem ở đâu? . Câu trả lời là xem ở những dòng code

> the code is the only source of truth.
Khi mà bạn sử dụng use cases bạn sẽ hiểu được dự án làm gì ngay từ cái nhìn đầu tiên, đỡ tốn effort rất nhiều việc đọc hiểu dự án với một thành viên mới join vào 

![](https://miro.medium.com/max/550/1*yfG7k-4hHe8rEkf1TkekEQ.png)

### Có phải mỗi use cases đều cần repository method ?

Đây là một câu hỏi rất phổ biến và câu trả lời là: hầu hết có lẽ là có.

Hừm, câu trả lời có thể trông quá đơn giản với bạn. Nhưng vấn đề không phải là câu trả lời, là câu hỏi.

Bạn không có usecases bởi vì bạn có một Repository method, bạn sử dụng một repository method vì bạn có một use cases cần sử dụng nó 

> Clean Architecture is a Use Case driven architecture, hence each repository method exists only because it is supporting a Use Case.

Đúng là một Repository method nên được sử dụng bởi một và chỉ một, để khi chúng ta xóa use cases thì logic nghiệp vụ đó cũng sẽ biến mất

### Tổng kết 
Bây giờ chúng ta có thể trả lời được một số câu hỏi mà chúng ta đặt ra ở đầu bài viết
 
 1. Use cases dùng để làm gì? -> Chúng implement data flow logic
 2. Tại sao chúng ta không gọi trực tiếp từ repository tới Presenter và ViewModel -> chúng ta tránh việc tạo ra God Object (object sử dụng ở cả presentation logic và data flow logic). Và logic dataflow có thể dụng dụng trên các viewmodel khác nhau 
 3. Tại sao chúng ta phải sử dụng use cases mà không làm gì chỉ việc gọi từ Repository, đây có phải là một việc thừa thãi hay không? -> Đây là thể hiện tính nhất quán, tốt cho việc thay đổi logic trong tương lai đảm bảo Screaming Architecture
 4. Có cần 1 use cases cho mỗi repository method?  -> Không phải luôn luôn, nhưng chắc chắn bạn cần ít nhất một repository method cho mỗi use cases

### Tham khảo 
https://proandroiddev.com/why-you-need-use-cases-interactors-142e8a6fe576