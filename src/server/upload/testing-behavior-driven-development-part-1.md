Xin chào mọi người,

Hôm nay mình muốn viết về một chủ đề mà mọi người sẽ quan tâm: Kiểm thử(Testing).

"Testing" là một chủ đề gây nhiều tranh chấp; một số người thích nó, trong khi những người khác ghét nó. Nhưng "testing" có nhiều khía cạnh khác nhau và mình hy vọng rằng vấn đề này - sẽ cung cấp thứ gì đó giúp bạn cải thiện chất lượng dự án.

Trong các bài viết về chủ đề "testing" thì bạn sẽ tìm hiểu "testing" từ nhiều khía cạnh khác nhau để cung cấp cho bạn một cái nhìn tổng quan về tất cả các kỹ thuật khác nhau có liên quan. Mình sẽ bắt đầu với BDD(behavior-driven development) và cách sử dụng nó. Sau đó, mình sẽ viết về chủ đề những cách sử dụng XCTest của Apple. Tiếp theo, mình sẽ đi sâu vào "dependency injection" và làm thế nào nó liên quan đến "testing". Nếu bạn đã từng tự hỏi về các "bad testing practices", thì mình sẽ viết về nó. Mocking là một công cụ phổ biến khác khi viết unit test, vì vậy mình sẽ nói về nó. Cuối cùng, mình kết thúc với hai bài viết về "testing" liên quan đến giao diện người dùng: UI testing và snapshot testing.

Bắt đầu viết unit test không phải là một công việc dễ dàng, đặc biệt là nếu bạn không có ai đó giúp bạn. Nếu bạn đã từng thử nó, thì có lẽ bạn nhớ khoảnh khắc đó khi bạn nghĩ: "Bạn hào hứng đọc các bài viết về unit test và cách thực hiện chúng. Bạn bắt tay vào việc"

Sau đó, bạn ngồi xuống trước máy tính của bạn. Bạn đã mở IDE. Bạn đã tạo ra các file test cho các module của bạn. Và sau đó bạn trống rỗng không biết làm gì tiếp theo. Bạn có thể đã viết một vài unit test để kiểm tra một số chức năng cơ bản, nhưng bạn cảm thấy có gì đó không đúng. Bạn cảm thấy có một câu hỏi lẩn khuất đâu đó trong đầu. Một câu hỏi cần trả lời trước khi bạn thực sự có thể tiến về phía trước:

## Tôi nên kiểm thử cái gì?

Câu trả lời cho câu hỏi đó không đơn giản. Trên thực tế, đây là một vấn đề khá phức tạp. Tin tốt là bạn không phải là người đầu tiên hỏi. Và bạn chắc chắn sẽ không phải là người cuối cùng. Nhưng bạn vẫn muốn theo đuổi ý tưởng để test được code bạn viết. Vì vậy, bạn đã viết các test case chỉ đơn giản gọi các function của bạn:

```
- (void)testDownloadData;
```

Có một vấn đề cơ bản với các unit test như thế này: chúng không thực sự cho bạn biết điều gì sẽ xảy ra. Chúng không cho bạn biết những gì đang thực sự được mong đợi. Không rõ các yêu cầu là gì.

Hơn nữa, khi một trong những unit test này thất bại, bạn phải đi sâu vào code và *hiểu tại sao nó thất bại*.

Do đó BDD ra đời. Nó nhằm mục đích giải quyết các issue một cách chính xác bằng cách giúp các lập trình viên xác định *những gì* cần được kiểm thử. Hơn nữa, nó khuyến khích các lập trình viên *làm rõ* các yêu cầu của họ và nó giới thiệu một ngôn ngữ phổ biến giúp bạn dễ dàng *hiểu mục đích* của "testing" là gì.

Câu trả lời cho câu hỏi sâu sắc này rất đơn giản, tuy nhiên nó đòi hỏi một sự thay đổi trong cách bạn nhìn nhận "testing" của mình. Như từ đầu tiên trong BDD gợi ý, bạn không nên tập trung vào các "testing" nữa mà thay vào đó bạn nên tập trung vào *các hành vi(behavior)*. Sự thay đổi dường như vô nghĩa này cung cấp một câu trả lời chính xác cho câu hỏi đã nói ở trên: bạn nên kiểm thử các behavior.

Nhưng một behavior là gì? Vâng, để trả lời câu hỏi này, chúng ta phải có thêm một chút kỹ thuật. 

Hãy xem xét một đối tượng (object) là một phần của ứng dụng bạn đã viết. Nó có một interface (protocol) xác định các phương thức và mối quan hệ của nó. Chúng được xác định cách chúng sẽ tương tác với phần còn lại của ứng dụng của bạn. Chúng được định nghĩa là *behavior*.

Và đó là những gì bạn nên hướng tới: kiểm thử cách đối tượng của bạn cư xử.

## BDD DSL

Trước khi chúng ta nói về lợi ích của DSL BDD, thì hãy tìm hiểu những điều cơ bản của nó và xem một bộ unit test đơn giản cho class "Car" trông như thế nào:

```
SpecBegin(Car)
    describe(@"Car", ^{

        __block Car *car;

        // Will be run before each enclosed it
        beforeEach(^{
            car = [Car new];
        });

        // Will be run after each enclosed it
        afterEach(^{
            car = nil;
        });

        // An actual test
        it(@"should be red", ^{
            expect(car.color).to.equal([UIColor redColor]);
        });

        describe(@"when it is started", ^{

            beforeEach(^{
                [car start];
            });

            it(@"should have engine running", ^{
                expect(car.engine.running).to.beTruthy();
            });
        });

        describe(@"move to", ^{

            context(@"when the engine is running", ^{

                beforeEach(^{
                    car.engine.running = YES;
                    [car moveTo:CGPointMake(42,0)];
                });

                it(@"should move to given position", ^{
                    expect(car.position).to.equal(CGPointMake(42, 0));
                });
            });

            context(@"when the engine is not running", ^{

                beforeEach(^{
                    car.engine.running = NO;
                    [car moveTo:CGPointMake(42,0)];
                });

                it(@"should not move to given position", ^{
                    expect(car.position).to.equal(CGPointZero);
                });
            });
        });
    });
SpecEnd
```

`SpecBegin` khai báo một lớp tên là `CarSpec`. SpecEnd đóng lại khai báo lớp.

Khối `describe` khai báo một nhóm các unit test.

Khối `context` hoạt động tương tự `describe`.

`it` là test case duy nhất.

`beforeEach` là một khối lệnh được gọi trước mỗi khối được lồng trên cùng cấp hoặc dưới nó.

Như bạn có thể nhận thấy, gần như tất cả các thành phần được xác định trong DSL này bao gồm hai phần: giá trị chuỗi xác định nội dung đang được kiểm thử và một khối có bản thân kiểm thử hoặc nhiều thành phần. Các chuỗi này có hai chức năng rất quan trọng.

Trước hết, trong các khối `describe`, các chuỗi behavior nhóm này được gắn với một phần nhất định của chức năng được kiểm thử (ví dụ: di chuyển một chiếc xe hơi). Bạn có thể chỉ định bao nhiêu khối lồng nhau theo ý muốn, bạn có thể viết các thông số kỹ thuật khác nhau dựa trên các bối cảnh trong đó đối tượng hoặc các phụ thuộc của nó.

Đó chính xác là những gì xảy ra trong quá trình` move to:` `describe`: chúng tôi đã tạo hai khối `context` để cung cấp các mong muốn khác nhau dựa trên các trạng thái khác nhau (động cơ có chạy hay không). Đây là một ví dụ về cách BDD DSL khuyến khích việc xác định các yêu cầu rõ ràng về cách đối tượng đã cho nên hành xử trong các điều kiện nhất định.

Thứ hai, các chuỗi này được sử dụng để tạo các câu thông báo cho bạn bài kiểm thử nào thất bại. Chẳng hạn, hãy giả sử rằng thử nghiệm di chuyển bằng động cơ của chúng tôi không bắt đầu thất bại. Sau đó, chúng tôi sẽ nhận được thông báo lỗi `Car move to when engine is not running should not move to given position`. Những câu này thực sự giúp bạn hiểu được những gì đã thất bại và behavior mong muốn là gì, mà không thực sự đọc bất kỳ dòng code nào. Hơn nữa, họ cung cấp một ngôn ngữ tiêu chuẩn dễ hiểu cho từng thành viên trong nhóm của bạn, kể cả những người kém kỹ thuật.

Hãy nhớ rằng bạn cũng có thể viết các unit test với các yêu cầu rõ ràng và tên dễ hiểu mà không cần cú pháp kiểu BDD (ví dụ XCtest). Tuy nhiên, BDD đã được xây dựng từ đầu với các khả năng này và nó cung cấp cú pháp và chức năng sẽ giúp cách tiếp cận như vậy dễ dàng hơn.

Nếu bạn muốn tìm hiểu thêm về cú pháp BDD, bạn nên xem hướng dẫn Specta để viết thông số kỹ thuật. (https://github.com/specta/specta#writing-specs)

### BDD Frameworks

Là nhà lập trình viên iOS hoặc Mac, bạn có thể chọn từ nhiều framework BDD khác nhau:

* Cedar (https://github.com/cedarbdd/cedar)
* Kiwi (https://github.com/kiwi-bdd/Kiwi)
* Specta (https://github.com/specta/specta)

Khi nói đến cú pháp, tất cả các framework này gần giống nhau. Sự khác biệt chính giữa chúng nằm ở khả năng cấu hình và các thành phần đi kèm.

Và nó cũng có framework BDD dành riêng cho Swift:
* Quick (https://github.com/Quick/Quick)
* Nimble (https://github.com/Quick/Nimble)
* Sleipnir (https://github.com/railsware/Sleipnir)

Đây là bài giới thiệu về BDD, bái sau mình sẽ viết các sample để test các behavior. Mong mọi người đón đọc.