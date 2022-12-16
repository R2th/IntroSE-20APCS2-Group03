Làm thế nào để tạo các request phức tạp là một vấn đề phổ biến trong phát triển Android, khi API không gửi cho bạn chính xác dữ liệu mà bạn muốn hiển thị trên view, vì vậy cần triển khai các request phức tạp hơn. Có thể ứng dụng của bạn cần thực hiện nhiều request, chờ đợi cho nhau hoặc gọi request nối tiếp sau khi request trước đó kết thúc. Có khi thậm chí cần phải kết hợp hai phương pháp này. Điều này có thể là thách thức trong Java đơn giản và thường sẽ dẫn đến code khó hiểu và không test được.

Trong bài viết này, chúng ta sẽ tìm hiểu một ví dụ đơn giản bằng cách sử dụng RxJava để giải quyết vấn đề trên. Ví dụ được viết bằng Kotlin, làm cho code ngắn gọn và dễ đọc hơn. Nếu bạn chỉ mới làm quen với RxJava hoặc Kotlin, bạn nên nắm bắt những điều cơ bản trước. Một số tài liệu có thể tham khảo như:
* [A Complete Guide to learn RxJava](https://blog.mindorks.com/a-complete-guide-to-learn-rxjava-b55c0cea3631)
* [A Complete Guide To Learn Kotlin For Android Development](https://blog.mindorks.com/a-complete-guide-to-learn-kotlin-for-android-development-b1e5d23cc2d8)

## Mô tả vấn đề
Chúng ta sẽ sử dụng API Public của StackOverflow để request chi tiết cho một user cụ thể, bao gồm 3 câu hỏi hàng đầu của user, 3 câu trả lời được chấp nhận hàng đầu và 3 câu hỏi hàng đầu mà user đã yêu thích.

Nếu chúng ta muốn đạt được kết quả này, chúng ta cần tạo ra 3 request riêng biệt cho API. Vì request không phụ thuộc vào nhau, chúng ta sẽ nhận được kết quả tốt nhất nếu chúng ta thực thi chúng song song và sau đó kết hợp kết quả của chúng. Chúng ta cũng cần thực hiện thêm một request nữa, bởi vì khi chúng ta request câu trả lời, câu trả lời không chứa câu hỏi thuộc về câu trả lời đó. Trong biểu đồ sau, bạn có thể xem các yêu cầu của chúng ta sẽ như thế nào.
![](https://images.viblo.asia/4f6fb82b-a272-4c8c-97c0-053336f458a7.png)

Phần request API này, chúng ta sẽ triển khai trong classs `UserRepository`, để cung cấp dữ liệu cho `ViewModel` hoặc `Presenter`.

## Tiến hành implement
Chúng ta sẽ triển khai phương thức `getDetails` trong `UserRepository`. Phương thức này cung cấp dữ liệu cho `DetailPresenter` về các chi tiết của user như sau:
```
class UserRepository(private val userService: UserService) {

    fun getUsers(page: Int) = userService.getUsers(page)

    fun getDetails(userId: Long) : Single<DetailsModel> {
        // TODO We will implement this method
        return Single.create { emitter ->
            val detailsModel = DetailsModel(emptyList(), emptyList(), emptyList())
            emitter.onSuccess(detailsModel)
        }
    }
}
```

Bạn có thể tự hỏi phương thức `Single.create` là gì. Nó tạo ra một `Single`, phát ra một `DetailsModel` rỗng. Chúng ta đang sử dụng `Single` thay vì `Observable`, do nó tốt hơn cho trường hợp chúng ta cần cho một request network. `Single` cũng tương tự như `Observable`, sự khác biệt là nó luôn phát ra chính xác một giá trị hoặc một lỗi.

### Sử dụng toán tử `zip` để kết hợp các kết quả của nhiều request
Trước tiên, chúng ta triển khai kết hợp 3 request. Chúng ta sẽ sử dụng toán tử `zip` từ `RxJava`. Tài liệu [ReactiveX](http://reactivex.io/documentation/operators/zip.html) cho biết thông tin về toán tử zip như sau:
> Combine the emissions of multiple Observables together via a specified function and emit single items for each combination based on the results of this function
> 

Điều này có nghĩa là gì? Nó lấy một item từ mỗi `Observable` và áp dụng một function với chúng tổng hợp thành kết quả để sau đó phát ra. Trong trường hợp này của chúng ta thậm chí còn đơn giản hơn, bởi vì `Single` chỉ phát ra một item, vì vậy chúng ta chỉ cần chỉ định một function để biến đổi từng item độc lập thành một kết quả.
```
class UserRepository(
        private val userService: UserService) {

    fun getUsers(page: Int) = userService.getUsers(page)

    fun getDetails(userId: Long) : Single<DetailsModel> {
        return Single.zip(
                userService.getQuestionsByUser(userId),
                userService.getAnswersByUser(userId),
                userService.getFavoritesByUser(userId),
                Function3<QuestionListModel, AnswerListModel, QuestionListModel, DetailsModel>
                { questions, answers, favorites ->
                    createDetailsModel(questions, answers, favorites) })
    }

    private fun createDetailsModel(questionsModel: QuestionListModel, answersModel: AnswerListModel,
                                   favoritesModel: QuestionListModel): DetailsModel {
        val questions = questionsModel.items
                .take(3)

        val favorites = favoritesModel.items
                .take(3)

        val answers = answersModel.items
                .filter { it.accepted }
                .take(3)
                .map { AnswerViewModel(it.answerId, it.score, it.accepted, "TODO") }

        return DetailsModel(questions, answers, favorites)
    }
}
```

Điều này trông có vẻ khá đơn giản phải không? Ba đối số đầu tiên của hàm `zip` là kết quả của các yêu cầu Retrofit. Cái thứ tư là một biểu thức lambda, có 3 tham số tương ứng có cùng kiểu với các response. Điều chúng ta cần làm trong lambda là áp dụng một số thao tác trên các tham số để tạo ra `DetailsModel`.

### Sử dụng Collections API của Kotlin để tạo ra `DetailsModel`
Một trong những điều tốt nhất trong Kotlin là Collections API. Nó cung cấp rất nhiều function mà bạn có thể sử dụng để thao tác các Collections. Sau đây là một số function được sử dụng trong khi triển khai phương thức `createDetailsModel`:
* `take`: Hàm này là đơn giản nhất. Nó truyền vào một tham số `Int` và trả về n phần tử đầu tiên của bộ sưu tập. Chúng ta sử dụng function này để hiển thị 3 item đầu tiên trong mỗi phần.
* `filter`: Hàm này lọc ra các item cụ thể từ bộ sưu tập theo một thuộc tính đã cho. Đối số duy nhất của nó là một `lambda`, nhận được các item và trả về một giá trị Boolean. Nếu nó trả về `true`, item sẽ được bao gồm trong bộ sưu tập. Biểu thức lambda trong đoạn code giống như sau: `answer: Answer -> answer.accepted`. Nếu chúng ta chỉ có một tham số trong lambda, chúng ta có thể bỏ qua khai báo của nó và sử dụng từ khóa đó.
* `map`: Với hàm `map`, chúng ta có thể áp dụng một phép chuyển đổi cho một collection. Trong ví dụ này, chúng ta chuyển đổi các đối tượng `Answer` sang các đối tượng `AnswerViewModel`. Việc chuyển đổi này rất đơn giản, chúng ta chỉ cần tạo ra `AnswerViewModel` với các trường của `Answer`. Lý do chúng ta cần điều này vì đối tượng `Answer` nhận được từ API Service không chứa `title` của `Question` ứng với `Answer`.

Một điều cuối cùng cần lưu ý về Collections API. Khi chúng ta sử dụng chuỗi các function này, chúng ta cần phải suy nghĩ về trật tự một cách cẩn thận.

### Sử dụng toán tử `flatmap` để nối tiếp các request
Nếu chúng ta muốn hiển thị `title` của các câu hỏi thuộc về câu trả lời, chúng tôi cần thực hiện một request khác sau khi chúng ta nhận được câu trả lời. Điều này thường được thực hiện với toán tử `flatMap` trong `RxJava`. Tài liệu `flatMap` cho các [Single](http://reactivex.io/RxJava/javadoc/io/reactivex/Single.html#flatMap%28io.reactivex.functions.Function%29) như sau:
> Returns a Single that is based on applying a specified function to the item emitted by the source Single, where that function returns a SingleSource.
> 
Ví dụ:
```
userService.getAnswersByUser(userId)
        .flatMap { answerListModel: AnswerListModel ->
            questionService.getQuestionById("1234;2345;3456") }
```

Như bạn có thể thấy `flatMap` nhận một `lambda`, sử dụng item được phát ra như một tham số từ `Single` ban đầu. Giá trị trả về của lambda là một `Single` mới, có thể phát ra một loại item khác.

Trong ví dụ trên, chúng ta đang request các câu hỏi cụ thể theo `id` của nó, nhưng điều này là không đủ. Chúng ta cần lấy các `id` câu hỏi từ các câu trả lời, sau đó request các câu hỏi và cuối cùng áp dụng một số phép biến đổi cho kết quả để tạo ra một danh sách các đối tượng `AnswerViewModel`. Đoạn mã dưới đây cho thấy cách đạt được điều này:
```
class UserRepository(
        private val userService: UserService,
        private val questionService: QuestionService) {

    fun getUsers(page: Int) = userService.getUsers(page)

    fun getDetails(userId: Long) : Single<DetailsModel> {
        return Single.zip(
                userService.getQuestionsByUser(userId),
                getAnswers(userId),
                userService.getFavoritesByUser(userId),
                Function3<QuestionListModel, List<AnswerViewModel>, QuestionListModel, DetailsModel>
                { questions, answers, favorites ->
                    createDetailsModel(questions, answers, favorites) })
    }

    private fun getAnswers(userId: Long) : Single<List<AnswerViewModel>> {
        return userService.getAnswersByUser(userId)
                .flatMap { answerListModel: AnswerListModel ->
                    mapAnswersToAnswerViewModels(answerListModel.items) }
    }

    private fun mapAnswersToAnswerViewModels(answers: List<Answer>): Single<List<AnswerViewModel>> {
        val ids = answers
                .map { it.questionId.toString() }
                .joinToString(separator = ";")

        val questionsListModel = questionService.getQuestionById(ids)

        return questionsListModel
                .map { questionListModel: QuestionListModel? ->
                    addTitlesToAnswers(answers, questionListModel?.items ?: emptyList()) }
    }

    private fun addTitlesToAnswers(answers: List<Answer>, questions: List<Question>) : List<AnswerViewModel> {
        return answers.map { (answerId, questionId, score, accepted) ->
            val question = questions.find { it.questionId == questionId }
            AnswerViewModel(answerId, score, accepted, question?.title ?: "Unknown")
        }
    }

    private fun createDetailsModel(questionsModel: QuestionListModel, answersModel: List<AnswerViewModel>,
                                   favoritesModel: QuestionListModel): DetailsModel {
        val questions = questionsModel.items
                .take(3)

        val favorites = favoritesModel.items
                .take(3)

        val answers = answersModel
                .filter { it.accepted }
                .take(3)

        return DetailsModel(questions, answers, favorites)
    }
}
```

Hãy tập trung vào phương thức `getAnswers` và hai phương thức khác mà nó đang sử dụng, phần còn lại của đoạn code gần giống với phần trên.

Phương thức `getAnswers` trông giống như ví dụ `flatMap` trước đây, nhưng trong trường hợp này chúng ta không tạo request ở đây, thay vào đó chúng ta gọi một phương thức, nơi chúng ta xây dựng và gọi request của chúng ta. Ở đây chúng ta sử dụng lại API Collections để chuyển đổi danh sách các câu trả lời thành một chuỗi các `id` được nối bởi ký tự “`;`” (Đây là định dạng StackOverflow cần).

Điều mới ở đây là hàm `joinToString`. Chúng ta có thể sử dụng nó trên bất kỳ bộ sưu tập nào để tạo một `String` đơn lẻ từ các phần tử của nó.

Sau khi chúng ta có các `id`, chúng tôi đang request các câu hỏi. Phần mã này có thể trông khó hiểu.
```
val questionsListModel = questionService.getQuestionById(ids)

return questionsListModel
        .map { questionListModel: QuestionListModel? ->
            addTitlesToAnswers(answers, questionListModel?.items ?: emptyList()) }
```
Với function `map`, bạn có thể nghĩ rằng `questionsListModel` là một bộ sưu tập, nhưng nó không phải. Đó là một `Single`, giống như kết quả của mọi request trong ví dụ của chúng ta.
Bởi vì thực ra còn có một toán tử `map` trong RxJava, nó hoạt động cũng tương tự giống như `map` trong API Collections. Nó có thể áp dụng một phép chuyển đổi cho item được phát ra bởi `Single`. Vì vậy, chúng ta đang áp dụng một phép chuyển đổi bằng cách gọi phương thức `addTitlesToAnswers`. Phương thức `addTitlesToAnswers` là một ví dụ khác về sức mạnh của API Collections.

Và bây giờ chúng ta đã có `DetailsModel` được xây dựng từ nhiều request.

## Kết luận
Làm việc với RxJava là khá khó khăn, cần tìm hiểu để nắm những điều cơ bản, đặc biệt là các khái niệm hữu ích trong phát triển Android. Một số khái niệm này là những điều được thảo luận ở trên. Việc kết hợp chúng với API Collections của Kotlin thực sự có thể giúp bạn đơn giản hóa luồng dữ liệu của mình. Còn nếu bạn vẫn đang sử dụng Java, đây có thể là một bổ sung tuyệt vời cho codebase của bạn.