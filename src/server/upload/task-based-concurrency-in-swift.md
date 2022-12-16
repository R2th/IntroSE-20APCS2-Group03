Giống như code tuần tự, concurrency code có thể có nhiều hình dạng và hình thức khác nhau. Tùy thuộc vào những gì chúng ta đang cố gắng đạt được. Việc đó có thể là fetch một phần dữ liệu một cách không đồng bộ , load các tệp nặng từ đĩa hoặc thực hiện một nhóm các hoạt động liên quan. Concurrency code cũng sẽ thay đổi theo các trường hợp khác nhau.
Trong bài viết này, chúng ta hãy cùng nhau xem xét một số khác biệt đó và một số tình huống trong đó các tasks có thể trở nên thực sự hữu ích.
##   The task at hand
Giả sử chúng ta đang xây dựng một ứng dụng mạng xã hội và chúng ta cung cấp cho người dùng tùy chọn đính kèm cả ảnh và video khi publish bài đăng. Hiện tại, bất cứ khi nào người dùng nhấn vào nút "Publish" - chúng tôi gọi chức năng sau, tải lên tất cả các phương tiện đính kèm và cũng tải lên dữ liệu cho chính bài đăng đó, như sau:
```
func publish(_ post: Post) {
    for photo in post.photos {
        upload(photo)
    }

    for video in post.videos {
        upload(video)
    }

    upload(post)
}
```
Mặc dù đoạn code trên rất đơn giản, nhưng có một vài vấn đề với nó. Đầu tiên, không có cách nào để chúng ta nhận được thông báo mỗi khi việc publish bài đăng kết thúc. Chúng ta cũng không thể xử lý bất kỳ loại xử lý lỗi nào, điều đó có nghĩa là nếu ảnh hoặc video không tải lên được - chúng ta sẽ tiếp tục tải lên dữ liệu bài đăng, đó là lý tưởng.
Có một số cách mà chúng ta có thể giải quyết vấn đề trên. Một có thể là sử dụng các loại built-in Operation và OperationQueue tích hợp để thực hiện tuần tự tất cả các hoạt động - nhưng điều đó đòi hỏi chúng ta phải làm cho code của chúng ta được đồng bộ hóa hoặc subclass Operation để tạo ra một giải pháp tùy chỉnh. Cả hai lựa chọn thay thế này đều hợp lệ nhưng nó yêu cầu những thay đổi khá lớn đối với mã gốc của chúng ta.
May mắn là, hóa ra tất cả những gì chúng ta phải làm để giành quyền kiểm soát là bước sâu hơn một cấp vào stack và sử dụng framework mà Operation và OperationQueue dựa trên - Grand Central Dispatch.
Giống như chúng ta đã xem xét về [“A deep dive into Grand Central Dispatch in Swift”](https://www.swiftbysundell.com/posts/a-deep-dive-into-grand-central-dispatch-in-swift), GCD cho phép chúng ta dễ dàng nhóm lại một loạt các hoạt động và để được thông báo khi tất cả chúng đã hoàn thành. Để thực hiện điều đó, chúng ta sẽ thực hiện một số điều chỉnh nhỏ cho các chức năng upload trước đó - để giờ đây chúng cung cấp cho chúng ta cách quan sát sự hoàn thành của chúng bằng cách sử dụng closure và thực hiện các balance call để truy cập và rời khỏi một DispatchGroup để có được được thông báo khi tất cả các media uploads đã kết thúc:
```
func publish(_ post: Post) {
    let group = DispatchGroup()

    for photo in post.photos {
        group.enter()

        upload(photo) {
            group.leave()
        }
    }

    for video in post.videos {
        group.enter()

        upload(video) {
            group.leave()
        }
    }

    // Calling ‘notify’ allows us to observe whenever the whole
    // group was finished using a closure.
    group.notify(queue: .main) {
        upload(post)
    }
}
```
Code Ở trên hoạt động thực sự tốt, và để lại cho chúng ta mã trông khá clean. Nhưng chúng ta vẫn còn vấn đề thiếu xử lý lỗi - vì chúng ta vẫn sẽ upload bài đăng cho dù việc upload media có được hoàn thành hay không.
Để khắc phục điều đó, hãy để thêm một biến lỗi tùy chọn mà chúng ta sẽ sử dụng để theo dõi bất kỳ lỗi nào xảy ra. Chúng ta sẽ thực hiện một chỉnh sửa khác cho các chức năng upload của mình, để chúng chuyển một optional error argument  cho các trình xử lý hoàn thành của chúng và sử dụng điều đó để ghi lại lỗi đầu tiên gặp phải - như thế này:
```
func publish(_ post: Post) {
    let group = DispatchGroup()
    var anyError: Error?

    for photo in post.photos {
        group.enter()

        upload(photo) { error in
            anyError = anyError ?? error
            group.leave()
        }
    }

    for video in post.videos {
        group.enter()

        upload(video) { error in
            anyError = anyError ?? error
            group.leave()
        }
    }

    group.notify(queue: .main) {
        // If an error was encountered while uploading the
        // post’s media, we’ll call an error handling function
        // instead of proceeding with the post data upload.
        if let error = anyError {
            return handle(error)
        }

        upload(post)
    }
}
```
Bây giờ chúng ta đã khắc phục tất cả các vấn đề về tính chính xác với đoạn mã gốc của chúng ta, nhưng trong quá trình thực hiện, chúng ta cũng làm cho nó trở nên phức tạp và khó đọc hơn nhiều. Giải pháp mới của chúng ta cũng khá nặng nề (với biến lỗi cục bộ và dispatch group calls cần phải theo dõi), đây có thể không phải là vấn đề ở đây, nhưng ngay khi chúng ta bắt đầu chuyển nhiều mã không đồng bộ của mình sang sử dụng mô hình này - mọi thứ có thể trở nên khó khăn hơn nhiều để duy trì sự nhanh chóng.
## It’s abstraction time!
Hãy để xem nếu chúng ta có thể làm cho loại hoạt động trên dễ dàng hơn để làm việc, bằng cách giới thiệu một lớp trừu tượng dựa theo task trên top của Grand Central Dispatch.

Chúng ta sẽ bắt đầu bằng cách tạo một loại được gọi là Task, về cơ bản sẽ chỉ là một trình bao bọc xung quanh một closure có quyền truy cập vào view controller để kiểm soát flow của task:
```
struct Task {
    typealias Closure = (Controller) -> Void

    private let closure: Closure

    init(closure: @escaping Closure) {
        self.closure = closure
    }
}
```
Controller type tùy theo trường hợp sẽ cung cấp method cho finish hoặc fail task mà nó liên kết và thực hiện bằng cách gọi một handler để báo cáo Kết quả của task:
```
extension Task {
    struct Controller {
        fileprivate let queue: DispatchQueue
        fileprivate let handler: (Outcome) -> Void

        func finish() {
            handler(.success)
        }

        func fail(with error: Error) {
            handler(.failure(error))
        }
    }
}
```
Giống như đoạn mã trên cho thấy, Kết quả có hai trường hợp - .success và .failure - làm cho nó rất giống với [Result type](https://www.swiftbysundell.com/posts/the-power-of-result-types-in-swift) với Void type. Trên thực tế, chúng ta có thể chọn thực hiện Kết quả dưới dạng kiểu enum của riêng mình hoặc đơn giản là sử dụng một trong các kỹ thuật từ [“The power of type aliases in Swift”](https://www.swiftbysundell.com/posts/the-power-of-type-aliases-in-swift) và biến nó thành một shorthand  chung cho Kết quả <Void>:
```
extension Task {
    enum Outcome {
        case success
        case failure(Error)
    }
}

extension Task {
    typealias Outcome = Result<Void>
}
```
Cuối cùng, chúng ta cần một cách để thực sự thực hiện các task mà chúng ta sẽ define. Để làm được điều đó, hãy thêm một perform method vào Task, method đó sẽ sử dụng một DispatchQueue rõ ràng để thực hiện Task  trên - hoặc đơn giản là thực hiện một global method nào - và một hanlder sẽ được gọi khi task hoàn thành. Trong nội bộ, sau đó chúng tôi sẽ sử dụng DispatchQueue đã cho để thực thi task không đồng bộ, bằng cách tạo một view controller và pass nó vào trong task closure - như thế này:
```
extension Task {
    func perform(on queue: DispatchQueue = .global(),
                 then handler: @escaping (Outcome) -> Void) {
        queue.async {
            let controller = Controller(
                queue: queue,
                handler: handler
            )

            self.closure(controller)
        }
    }
}
```
Với code ở trên, phiên bản ban đầu của task API đã kết thúc. Hãy bắt đầu bằng cách xác định một task để thay thế chức năng tải lên ảnh của chúng ta từ trước - gọi vào một Uploader class, sau đó sử dụng task controller để thông báo cho chúng ta về kết quả:
```
extension Task {
    static func uploading(_ photo: Photo,
                          using uploader: Uploader) -> Task {
        return Task { controller in
            uploader.upload(photo.data, to: photo.url) { error in
                if let error = error {
                    controller.fail(with: error)
                } else {
                    controller.finish()
                }
            }
        }
    }
}
```
Sau đó ta sử dụng function trên như thế này
```
for photo in photos {
    let task = Task.uploading(photo, using: uploader)

    task.perform { outcome in
        // Handle outcome
    }
}
```
Tuy nhiên, nơi mà các task thực sự phát huy tác dụng của nó là khi chúng ta bắt đầu grouping và sequencing chúng, điều này sẽ cho phép chúng ta giải quyết vấn đề ban đầu của mình một cách dễ dàng.
## Grouping
Trước đó, chúng tôi đã sử dụng một DispatchGroup được gia nhập và rời để theo dõi khi nào một nhóm hoạt động kết thúc, vì vậy hãy chuyển logic đó vào hệ thống task mới của chúng ta. Để làm điều đó, chúng ta sẽ thêm một phương thức tĩnh vào task với nhiệm vụ tạo một mảng các tasks và group chúng lại với nhau. Chúng ta vẫn sẽ sử dụng dispatch group logic như trước đó - nhưng giờ đây được wrapped trong một API tốt hơn nhiều:
```
extension Task {
    static func group(_ tasks: [Task]) -> Task {
        return Task { controller in
            let group = DispatchGroup()

            // To avoid race conditions with errors, we set up a private
            // queue to sync all assignments to our error variable
            let errorSyncQueue = DispatchQueue(label: "Task.ErrorSync")
            var anyError: Error?

            for task in tasks {
                group.enter()

                // It’s important to make the sub-tasks execute
                // on the same DispatchQueue as the group, since
                // we might cause unexpected threading issues otherwise.
                task.perform(on: controller.queue) { outcome in
                    switch outcome {
                    case .success:
                        break
                    case .failure(let error):
                        errorSyncQueue.sync {
                            anyError = anyError ?? error
                        }
                    }

                    group.leave()
                }
            }

            group.notify(queue: controller.queue) {
                if let error = anyError {
                    controller.fail(with: error)
                } else {
                    controller.finish()
                }
            }
        }
    }
}
```
Với những điều trên, chúng ta có thể đơn giản hóa rất nhiều media uploading code của mình từ trước. Tất cả những gì chúng ta phải làm là map từng phần của media vào một Task và sau đó chuyển một mảng kết hợp các nhiệm vụ đó vào group API mới của chúng ta, để nhóm tất cả chúng thành một nhiệm vụ - như thế này:
```
let photoTasks = post.photos.map { photo in
    return Task.uploading(photo, using: uploader)
}

let videoTasks = post.videos.map { video in
    return Task.uploading(video, using: uploader)
}

let mediaGroup = Task.group(photoTasks + videoTasks)
```
Groups rất phù hợp khi chúng ta không dựa vào thứ tự hoàn thành trong các grouped tasks của mình - nhưng điều đó không phải lúc nào cũng như vậy. Quay trở lại vấn đề ban đầu của chúng ta là không tải lên dữ liệu cho một bài đăng cho đến khi chúng tôi chắc chắn rằng tất cả các media đã được tải lên thành công - đó là một trường hợp như vậy. Điều chúng ta thích nhất là có thể xâu chuỗi hoặc sắp xếp các hoạt động tải lên media của chúng ta với hoạt động hoàn tất tải lên bài đăng. 
Chúng ta hãy xem cách chúng ta có thể mở rộng Task để hỗ trợ điều đó.
## Sequencing
Thay vì sử dụng Dispatchgroup (khi không có ý kiến gì về thứ tự các hoạt động của chúng), chúng ta hãy thực hiện tuần tự bằng cách theo dõi index của task hiện tại và sau đó tiếp tục thực hiện nhiệm vụ tiếp theo sau khi nhiệm vụ trược đó được hoàn thành. Khi chúng tôi đã đi đến cuối danh sách các task của mình, chúng tôi sẽ xem xét chuỗi các task đã hoàn thành:
```
extension Task {
    static func sequence(_ tasks: [Task]) -> Task {
        var index = 0

        func performNext(using controller: Controller) {
            guard index < tasks.count else {
                // We’ve reached the end of our array of tasks,
                // time to finish the sequence.
                controller.finish()
                return
            }

            let task = tasks[index]
            index += 1

            task.perform(on: controller.queue) { outcome in
                switch outcome {
                case .success:
                    performNext(using: controller)
                case .failure(let error):
                    // As soon as an error was occurred, we’ll
                    // fail the entire sequence.
                    controller.fail(with: error)
                }
            }
        }

        return Task(closure: performNext)
    }
}
```
Lý do chúng ta không chỉ đơn giản là sử dụng một DispatchQueue nối tiếp để thực hiện tuần tự là bởi vì chúng ta không thể giả định rằng chuỗi của chúng ta sẽ luôn được dispatched trên một hàng đợi serial - người dùng API có thể chọn thực hiện nó trên bất kỳ loại hàng đợi nào.
## Putting all the pieces together
Với tất cả các phần đã sẵn sàng, cuối cùng, hãy cập nhật mã publish bài đăng của chúng ta để có thể sử dụng đầy đủ mọi thứ mà hệ thống mới của chúng tôi cung cấp. Thay vì phải theo dõi lỗi hoặc gặp lỗi do tính chất không thể đoán trước của các network call, giờ đây chúng ta có thể chỉ cần tạo một chuỗi hoạt động bằng cách kết hợp một nhóm các hoạt động upload media với một task publish bài đăng - như thế này:
```
func publish(_ post: Post,
             then handler: @escaping (Outcome) -> Void) {
    let photoTasks = post.photos.map { photo in
        return Task.uploading(photo, using: uploader)
    }

    let videoTasks = post.videos.map { video in
        return Task.uploading(video, using: uploader)
    }

    let sequence = Task.sequence([
        .group(photoTasks + videoTasks),
        .uploading(post, using: uploader)
    ])

    sequence.perform(then: handler)
}
```
Cái hay của giải pháp trên là mọi thứ đều được thực hiện hoàn toàn đồng thời - sử dụng dispatch queues - nhưng với tư cách là người dùng API, tất cả những gì chúng ta phải làm là tạo một vài tasks và cho hệ thống biết cách chúng ta muốn kết hợp chúng . Nếu chúng ta gặp phải một vấn đề hoặc hành vi bất ngờ, chúng ta cũng dễ dàng để debug.
## Conclusion
Tasks có thể là một cách tuyệt vời để trừu tượng mã đồng thời, nên thực thi với càng nhiều tasks song song càng tốt hoặc chờ các task trước đó hoàn thành trước khi tiếp tục. Về cơ bản, chúng cung cấp một cách để tạo ra một layer đơn giản trên top của Grand Central Dispatch - cho phép chúng ta tận dụng tất cả sức mạnh của nó một cách thực sự tốt đẹp.
Giống như đã đề cập trước đó trong bài viết này, tất nhiên có nhiều cách khác mà đồng thời có thể được thực hiện hoặc sử dụng trong Swift. [Futures & promises](https://www.swiftbysundell.com/posts/under-the-hood-of-futures-and-promises-in-swift) giúp dễ dàng ẩn phần lớn loại concurrency đang diễn ra, với chi phí kiểm soát thấp hơn một chút - trong khi các framework như RxSwift cho phép xây dựng các chuỗi thực thi phức tạp hơn nhiều, nhưng sử dụng mạnh mẽ hơn abstraction.
Lời khuyên của tôi là hãy thử nhiều loại lập trình đồng thời khác nhau trong Swift - để xem loại nào (hoặc nhiều loại) phù hợp với bạn, nhóm của bạn và dự án của bạn là tốt nhất. Hy vọng bài viết này đã cung cấp cho bạn một cái nhìn sâu sắc về một cách triển khai các task trong Swift và cách các task có thể so sánh với các giải pháp khác thường được sử dụng trong cộng đồng.
Reference: https://www.swiftbysundell.com/posts/task-based-concurrency-in-swift