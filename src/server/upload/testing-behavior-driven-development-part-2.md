Viết tiếp chủ đề [lần trước](https://viblo.asia/p/testing-behavior-driven-development-part-1-Qbq5QkoLZD8).

Bài viết này mình sẽ viết các ví dụ về cách sử dụng BDD trong các project thực tế.
Có một điều cuối cùng tôi muốn chỉ ra trước khi chúng ta chuyển sang các ví dụ trong bài viết này. Hãy nhớ rằng một trong những khía cạnh quan trọng của việc viết unit test tốt là xác định các dependency và khai báo chúng trong interface của bạn.

Hầu hết các test case của bạn sẽ khẳng định liệu một tương tác cụ thể đã xảy ra hay liệu một giá trị cụ thể đã được trả về (hoặc được chuyển cho một đối tượng khác), dựa trên trạng thái đối tượng được test của bạn. Trích xuất các dependency sẽ cho phép bạn dễ dàng giả định các giá trị và trạng thái. Hơn nữa, nó sẽ đơn giản hóa rất nhiều việc khẳng định liệu một hành động cụ thể đã xảy ra hay một giá trị cụ thể đã được tính toán.

Hãy nhớ rằng bạn không nên đặt tất cả các dependency và thuộc tính đối tượng của mình vào interface (đặc biệt là khi bạn bắt đầu testing). Điều này sẽ làm giảm khả năng đọc và rõ ràng về mục đích của đối tượng của bạn, trong khi interface của bạn sẽ nêu rõ những gì nó được thiết kế cho.

## Message Formatter
Hãy bắt đầu với một ví dụ đơn giản. Chúng tôi sẽ xây dựng một thành phần chịu trách nhiệm định dạng tin nhắn văn bản cho một đối tượng sự kiện nhất định:
```
@interface EventDescriptionFormatter : NSObject
@property(nonatomic, strong) NSDateFormatter *dateFormatter;

- (NSString *)eventDescriptionFromEvent:(id <Event>)event;

@end
```

Đây là interface của chúng tôi. Interface của `Event` xác định ba thuộc tính cơ bản của một sự kiện:
```
@protocol Event <NSObject>

@property(nonatomic, readonly) NSString *name;

@property(nonatomic, readonly) NSDate *startDate;
@property(nonatomic, readonly) NSDate *endDate;

@end
```

Mục tiêu của chúng tôi là kiểm tra xem `EventDescripFormatter` có trả về một mô tả được định dạng giống như `My Event starts at Oct 09, 12:00 AM and ends at Oct 09, 1:00 AM`.

Xin lưu ý rằng điều này (và tất cả các ví dụ khác trong bài viết này) sử dụng các mocking framework. Tôi sẽ viết 1 bài về mocking framework trong các biết theo.

Tôi sẽ bắt đầu mock dependency trong thành phần, đó là `date formatter`. Tôi sẽ sử dụng mock đã tạo để trả về chuỗi cho ngày bắt đầu và ngày kết thúc. Sau đó, tôi sẽ kiểm tra xem chuỗi trả về từ sự kiện có được khởi tạo hay không bằng cách sử dụng các giá trị mà chúng tôi vừa mock:
```
__block id mockDateFormatter;
__block NSString *eventDescription;
__block id mockEvent;

beforeEach(^{
    // Prepare mock date formatter
    mockDateFormatter = mock([NSDateFormatter class]);
    descriptionFormatter.dateFormatter = mockDateFormatter;

    NSDate *startDate = [NSDate mt_dateFromYear:2019 month:10 day:09];
    NSDate *endDate = [startDate mt_dateHoursAfter:1];

    // Pepare mock event
    mockEvent = mockProtocol(@protocol(Event));
    [given([mockEvent name]) willReturn:@"Fixture Name"];
    [given([mockEvent startDate]) willReturn:startDate];
    [given([mockEvent endDate]) willReturn:endDate];

    [given([mockDateFormatter stringFromDate:startDate]) willReturn:@"Fixture String 1"];
    [given([mockDateFormatter stringFromDate:endDate]) willReturn:@"Fixture String 2"];

    eventDescription = [descriptionFormatter eventDescriptionFromEvent:mockEvent];
});

it(@"should return formatted description", ^{
    expect(eventDescription).to.equal(@"Fixture Name starts at Fixture String 1 and ends at Fixture String 2.");
});
```

Lưu ý rằng chúng tôi chỉ kiểm tra xem `EventDescripFormatter` của chúng tôi có sử dụng `NSDateFormatter` của nó để định dạng ngày hay không. Chúng tôi đã thực sự thử nghiệm format style. Vì vậy, để có một thành phần được kiểm tra đầy đủ, chúng ta cần thêm hai bài test nữa để kiểm tra kiểu định dạng:
```
it(@"should have appropriate date style on date formatter", ^{
    expect(descriptionFormatter.dateFormatter.dateStyle).to.equal(NSDateFormatterMediumStyle);
});

it(@"should have appropriate time style on date formatter", ^{
    expect(descriptionFormatter.dateFormatter.timeStyle).to.equal(NSDateFormatterMediumStyle);
});
```

Ví dụ trên không chính xác test hành vi của `EventDescripFormatter`. Nó chủ yếu kiểm tra việc thực hiện nội bộ của nó bằng cách mocking `NSDateFormatter`. Trên thực tế, chúng tôi không thực sự quan tâm đến việc có một định dạng ngày tháng bên dưới hay không. Từ góc độ interface, chúng ta có thể đã định dạng ngày theo cách thủ công bằng cách sử dụng dateComponent. Tất cả những gì chúng ta quan tâm tại thời điểm này là liệu chúng ta có đúng chuỗi hay không. Và đó là behavior mà chúng tôi muốn kiểm tra.

Chúng ta có thể dễ dàng đạt được điều này bằng cách không mocking `NSDateFormatter`. Như đã nói, chúng tôi thậm chí không quan tâm đến việc nó có ở đó hay không, vì vậy hãy để thực sự loại bỏ nó khỏi interface:
```
@interface EventDescriptionFormatter : NSObject

- (NSString *)eventDescriptionFromEvent:(id <Event>)event;

@end
```

Bước tiếp theo, tái cấu trúc các bài test của chúng tôi. Bây giờ chúng ta không còn cần phải biết nội bộ của event formatter nữa, chúng ta có thể tập trung vào hành vi thực tế:
```
describe(@"event description from event", ^{

    __block NSString *eventDescription;
    __block id mockEvent;

    beforeEach(^{
        NSDate *startDate = [NSDate mt_dateFromYear:2019 month:10 day:09];
        NSDate *endDate = [startDate mt_dateHoursAfter:1];

        mockEvent = mockProtocol(@protocol(Event));
        [given([mockEvent name]) willReturn:@"Fixture Name"];
        [given([mockEvent startDate]) willReturn:startDate];
        [given([mockEvent endDate]) willReturn:endDate];

        eventDescription = [descriptionFormatter eventDescriptionFromEvent:mockEvent];
    });

    it(@"should return formatted description", ^{
        expect(eventDescription).to.equal(@"Fixture Name starts at Oct 09, 2019, 12:00 AM and ends at Oct 09, 2019, 1:00 AM.");
    });
});
```

Chúng tôi chỉ có một khối thiết lập tối giản, nơi chúng tôi chuẩn bị một mô hình dữ liệu và gọi một phương thức được test. Bằng cách tập trung nhiều hơn vào kết quả của behavior, thay vì cách nó thực sự hoạt động, chúng tôi đã đơn giản hóa bộ test của mình trong khi vẫn giữ lại phạm vi kiểm tra chức năng của đối tượng. Đây chính xác là những gì BDD hướng tới - cố gắng nghĩ về kết quả của các hành vi, chứ không phải việc thực hiện thực tế.

## Data Downloader

Trong ví dụ này, chúng tôi sẽ xây dựng một trình tải xuống dữ liệu đơn giản. Chúng tôi sẽ đặc biệt tập trung vào một hành vi duy nhất của trình tải xuống dữ liệu: tạo request và hủy download. Hãy bắt đầu với việc xác định interface của chúng:
```
@interface CalendarDataDownloader : NSObject

@property(nonatomic, weak) id <CalendarDataDownloaderDelegate> delegate;

@property(nonatomic, readonly) NetworkLayer *networkLayer;

- (instancetype)initWithNetworkLayer:(NetworkLayer *)networkLayer;

- (void)updateCalendarData;

- (void)cancel;

@end
```

Interface của `NetworkLayer`:
```
@interface NetworkLayer : NSObject

// Returns an identifier that can be used for canceling a request.
- (id)makeRequest:(id <NetworkRequest>)request completion:(void (^)(id <NetworkRequest>, id, NSError *))completion;

- (void)cancelRequestWithIdentifier:(id)identifier;

@end
```

Trước tiên chúng tôi sẽ kiểm tra xem việc tải xuống thực tế đã diễn ra. Network mock đã được tạo và chèn vào một khối mô tả ở trên:
```
describe(@"update calendar data", ^{
    beforeEach(^{
        [calendarDataDownloader updateCalendarData];
    });

    it(@"should make a download data request", ^{
        [verify(mockNetworkLayer) makeRequest:instanceOf([CalendarDataRequest class]) completion:anything()];
    });
});
```

Phần này khá đơn giản. Bước tiếp theo là kiểm tra xem request đó có bị hủy hay không khi chúng tôi gọi phương thức hủy. Chúng tôi cần đảm bảo rằng chúng tôi không yêu cầu gọi phương thức hủy mà không có định danh. Spec cho behavior như vậy có thể trông như thế này:
```
describe(@"cancel ", ^{
    context(@"when there's an identifier", ^{
        beforeEach(^{
            calendarDataDownloader.identifier = @"Fixture Identifier";
            [calendarDataDownloader cancel];
        });

        it(@"should tell the network layer to cancel request", ^{
            [verify(mockNetworkLayer) cancelRequestWithIdentifier:@"Fixture Identifier"];
        });

        it(@"should remove the identifier", ^{
            expect(calendarDataDownloader.identifier).to.beNil();
        });
    });

    context(@"when there's no identifier", ^{
        beforeEach(^{
            calendarDataDownloader.identifier = nil;
            [calendarDataDownloader cancel];
        });

        it(@"should not ask the network layer to cancel request", ^{
            [verifyCount(mockNetworkLayer, never()) cancelRequestWithIdentifier:anything()];
        });
    });
});
```
Mã định danh request là một thuộc tính đóng của `CalendarDataDownloader`, vì vậy chúng tôi sẽ cần trưng nó ra trong các unit test của mình:
```
@interface CalendarDataDownloader (Specs)
@property(nonatomic, strong) id identifier;
@end
```

Bạn có thể đánh giá rằng có một cái gì đó sai với các bài test này. Mặc dù chúng hợp lệ và họ kiểm tra hành vi cụ thể, nhưng chúng phơi bày các hoạt động nội bộ của `CalendarDataDownloader`. Ở đó, không cần các bài test có kiến thức về cách  `CalendarDataDownloader` giữ định danh yêu cầu của nó. Hãy cùng xem chúng tôi có thể viết các bài test của mình như thế nào mà không cần thực hiện nội bộ:
```
describe(@"update calendar data", ^{
    beforeEach(^{
        [given([mockNetworkLayer makeRequest:instanceOf([CalendarDataRequest class])
                                  completion:anything()]) willReturn:@"Fixture Identifier"];
        [calendarDataDownloader updateCalendarData];
    });

    it(@"should make a download data request", ^{
        [verify(mockNetworkLayer) makeRequest:instanceOf([CalendarDataRequest class]) completion:anything()];
    });

    describe(@"canceling request", ^{
        beforeEach(^{
            [calendarDataDownloader cancel];
        });

        it(@"should tell the network layer to cancel previous request", ^{
            [verify(mockNetworkLayer) cancelRequestWithIdentifier:@"Fixture Identifier"];
        });

        describe(@"canceling it again", ^{
            beforeEach(^{
                [calendarDataDownloader cancel];
            });

            it(@"should tell the network layer to cancel previous request", ^{
                [verify(mockNetworkLayer) cancelRequestWithIdentifier:@"Fixture Identifier"];
            });
        });
    });
});
```

Chúng tôi đã bắt đầu bằng cách khai thác phương thức `makeRequest:completion:` . Chúng tôi trả lại một định danh. Trong cùng một khối mô tả, chúng tôi đã định nghĩa một khối mô tả hủy, gọi phương thức hủy trên đối tượng `CalendarDataDownloader`. Sau đó, chúng tôi kiểm tra xem chuỗi có được truyền cho phương thức hủy bỏ network mock hay không.

Lưu ý rằng, tại thời điểm này, chúng tôi không thực sự cần một bài test để kiểm tra xem request có được thực hiện hay không - chúng tôi sẽ không nhận được mã định danh và `cancelRequestWithIdentifier` sẽ không bao giờ được gọi. Tuy nhiên, chúng tôi đã giữ lại bài test đó để đảm bảo rằng chúng tôi biết những gì đã xảy ra khi chức năng đó bị hỏng.

Chúng tôi đã quản lý để kiểm tra chính xác hành vi tương tự mà không làm lộ triển khai nội bộ của `CalendarDataDownloader`. Hơn nữa, chúng tôi đã làm như vậy chỉ với ba bài test thay vì bốn bài test. Và chúng tôi đã tận dụng các khả năng lồng nhau của DSL BDD để mô phỏng chuỗi các hành vi - trước tiên chúng tôi mô phỏng việc tải xuống, và sau đó, trong cùng một khối mô tả, chúng tôi đã mô phỏng việc hủy yêu cầu.

## Testing View Controllers

Dường như thái độ phổ biến nhất đối với việc kiểm tra các controller giữa các nhà phát triển iOS là mọi người không thấy giá trị trong đó - điều mà tôi thấy kỳ lạ, vì các controller đại diện cho khía cạnh cốt lõi của một ứng dụng. Chúng là nơi mà tất cả các thành phần được liên kết lại với nhau. Chúng là nơi kết nối giao diện người dùng với model và logic ứng dụng. Do đó, thiệt hại gây ra bởi một sự thay đổi có thể là đáng kể.

Đây là lý do tại sao tôi tin tưởng mạnh mẽ rằng bộ controller cũng nên được kiểm tra. Tuy nhiên, testing controller không phải là một nhiệm vụ dễ dàng. Các ví dụ về controller chế độ xem ảnh và đăng nhập sau đây sẽ giúp hiểu được cách thức BDD có thể được tận dụng để đơn giản hóa việc xây dựng các unit test cho các controller.

### Upload Photo View Controller
Trong ví dụ này, chúng tôi sẽ xây dựng một controller upload ảnh đơn giản. Sau khi nhấn nút, controller sẽ thông báo cho uploader của mình rằng ảnh sẽ được tải lên.
Đơn giản, phải không? Hãy bắt đầu tạo interface của `PhotoUploaderViewController`:
```
@interface PhotoUploadViewController : UIViewController
@property(nonatomic, readonly) PhotoUploader *photoUploader;

- (instancetype)initWithPhotoUploader:(PhotoUploader *)photoUploader;

@end
```

Không có rất nhiều điều xảy ra ở đây, vì chúng tôi chỉ xác định một dependency bên ngoài vào `PhotoUploader`:
```
@implementation PhotoUploadViewController

- (instancetype)initWithPhotoUploader:(PhotoUploader *)photoUploader {
    self = [super init];
    if (self) {
        _photoUploader = photoUploader;

        self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:NSLocalizedString(@"Upload", nil) style:UIBarButtonItemStyleBordered target:self action:@selector(didTapUploadButton:)];
    }

    return self;
}

#pragma mark -

- (void)didTapUploadButton:(UIBarButtonItem *)uploadButton {
    void (^completion)(NSError *) = ^(NSError* error){};
    [self.photoUploader uploadPhoto:[UIImage new] completion:completion];
}

@end
```

Hãy xem cách mà chúng tôi có thể test thành phần này. Trước hết, chúng tôi sẽ cần kiểm tra xem `bar button item` có được thiết lập đúng hay không bằng cách kiểm tra rằng title, target và action đã được khởi tạo đúng cách chưa:
```
describe(@"right bar button item", ^{

    __block UIBarButtonItem *barButtonItem;

    beforeEach(^{
        barButtonItem = [[photoUploadViewController navigationItem] rightBarButtonItem];
    });

    it(@"should have a title", ^{
        expect(barButtonItem.title).to.equal(@"Upload");
    });

    it(@"should have a target", ^{
        expect(barButtonItem.target).to.equal(photoUploadViewController);
    });

    it(@"should have an action", ^{
        expect(barButtonItem.action).to.equal(@selector(didTapUploadButton:));
    });
});
```

Nhưng đây chỉ là một nửa những gì thực sự cần phải được test - hiện tại chúng tôi chắc chắn rằng phương thức thích hợp sẽ được gọi khi nhấn nút, nhưng chúng tôi không chắc liệu hành động thích hợp sẽ được thực hiện hay không (thực tế, chúng tôi thậm chí không biết liệu phương pháp đó thực sự tồn tại). Vì vậy, hãy để test điều đó:
```
describe(@"tapping right bar button item", ^{
    beforeEach(^{
        [photoUploadViewController didTapUploadButton:nil];
    });

    it(@"should tell the mock photo uploader to upload the photo", ^{
        [verify(mockPhotoUploader) uploadPhoto:instanceOf([UIImage class])
                                    completion:anything()];
    });
});
```

Thật không may cho chúng tôi, `didTapUploadButton:` không tồn tại trong interface. Chúng tôi có thể giải quyết vấn đề này bằng cách xác định category có thể nhìn thấy trong các test của chúng tôi cho phương thức này:
```
@interface PhotoUploadViewController (Specs)
- (void)didTapUploadButton:(UIBarButtonItem *)uploadButton;
@end
```

Tại thời điểm này, chúng ta có thể nói rằng `PhotoUploadViewController` có thể được test đầy đủ.

Nhưng điều gì là sai với ví dụ trên? Vấn đề là chúng tôi đang test triển khai nội bộ của `PhotoUploadViewController`. Chúng ta không nên thực sự quan tâm các giá trị target / action trên bar button item là gì. Chúng ta chỉ nên quan tâm đến những gì xảy ra khi nó được nhấn.

Hãy quay trở lại `PhotoUploadViewController` của chúng tôi và xem cách chúng tôi có thể viết lại các unit test của mình để đảm bảo rằng chúng tôi đang test interface.

Trước hết, chúng tôi không cần phải biết rằng phương thức `didTapUploadButton:` tồn tại. Nó chỉ là một chi tiết thực hiện. Chúng tôi chỉ quan tâm đến hành vi: khi người dùng nhấn nút tải lên, `UploadManager` sẽ nhận được thông báo `uploadPhoto:`.

Thứ hai, chúng tôi không cần phải biết target / action nào được xác định trên `rightBarButtonItem`. Mối quan tâm duy nhất của chúng tôi là những gì xảy ra khi nó được nhấn. Hãy để mô phỏng hành động đó trong các bài test. Chúng tôi có thể sử dụng category trên `UIBarButtonItem` để làm điều này:
```
@interface UIBarButtonItem (Specs)

- (void)specsSimulateTap;

@end
```

Việc triển khai của nó khá đơn giản, khi chúng tôi thực hiện hành động trên mục tiêu của `UIBarButtonItem`:
```
@implementation UIBarButtonItem (Specs)

- (void)specsSimulateTap {
    [self.target performSelector:self.action withObject:self];
}

@end
```

Bây giờ chúng ta có một phương thức trợ giúp mô phỏng nhấn, chúng ta có thể đơn giản hóa các test của mình thành một khối mô tả cấp cao nhất:
```
describe(@"right bar button item", ^{

    __block UIBarButtonItem *barButtonItem;

    beforeEach(^{
        barButtonItem = [[photoUploadViewController navigationItem] rightBarButtonItem];
    });

    it(@"should have a title", ^{
        expect(barButtonItem.title).to.equal(@"Upload");
    });

    describe(@"when it is tapped", ^{
        beforeEach(^{
            [barButtonItem specsSimulateTap];
        });

        it(@"should tell the mock photo uploader to upload the photo", ^{
            [verify(mockPhotoUploader) uploadPhoto:instanceOf([UIImage class])
                                        completion:anything()];
        });
    });
});
```

Lưu ý rằng chúng tôi đã quản lý để xóa hai bài test và chúng tôi vẫn có một thành phần được test đầy đủ. Hơn nữa, bộ test case của chúng tôi ít bị phá vỡ hơn, vì chúng tôi không còn dựa vào sự tồn tại của phương thức `didTapUploadButton:`. Cuối cùng nhưng không kém phần quan trọng, chúng tôi đã tập trung nhiều hơn vào khía cạnh hành vi của controller, thay vì thực hiện bên trong của nó.

### Sign-In View Controller

Trong ví dụ này, chúng tôi sẽ xây dựng một ứng dụng đơn giản yêu cầu người dùng nhập tên người dùng và mật khẩu của họ để đăng nhập vào một dịch vụ trừu tượng.

Chúng tôi sẽ bắt đầu bằng cách xây dựng `SignInViewController` với hai textfields và nút đăng nhập. Chúng tôi muốn giữ controller của mình nhỏ nhất có thể, vì vậy chúng tôi sẽ sử dụng abstract class chịu trách nhiệm đăng nhập vào một thành phần riêng biệt được gọi là `SignInManager`.

Các yêu cầu của chúng tôi như sau: khi người dùng nhấn nút đăng nhập và khi có tên người dùng và mật khẩu, controller sẽ gọi class SignInManager thực hiện đăng nhập bằng mật khẩu và tên người dùng. Nếu không có tên người dùng hoặc mật khẩu (hoặc cả hai đều biến mất), ứng dụng sẽ hiển thị lỗi phía trên các textfields.

Điều đầu tiên mà chúng tôi sẽ muốn test là view:
```
@interface SignInViewController : UIViewController

@property(nonatomic, readwrite) IBOutlet UIButton *signInButton;

@property(nonatomic, readwrite) IBOutlet UITextField *usernameTextField;
@property(nonatomic, readwrite) IBOutlet UITextField *passwordTextField;

@property(nonatomic, readwrite) IBOutlet UILabel *fillInBothFieldsLabel;

@property(nonatomic, readonly) SignInManager *signInManager;

- (instancetype)initWithSignInManager:(SignInManager *)signInManager;

- (IBAction)didTapSignInButton:(UIButton *)signInButton;

@end
```

Đầu tiên, chúng tôi sẽ kiểm tra một số thông tin cơ bản về các textfields của chúng tôi:
```
beforeEach(^{
        // Force view load from xib
        [signInViewController view];
    });

    it(@"should have a placeholder on user name text field", ^{
        expect(signInViewController.usernameTextField.placeholder).to.equal(@"Username");
    });

    it(@"should have a placeholder on password text field", ^{
         expect(signInViewController.passwordTextField.placeholder).to.equal(@"Password");
    });
```

Tiếp theo, chúng tôi sẽ kiểm tra xem nút đăng nhập có được cấu hình đúng không và có hành động hay không:
```
describe(@"sign in button", ^{

        __block UIButton *button;

        beforeEach(^{
            button = signInViewController.signInButton;
        });

        it(@"should have a title", ^{
            expect(button.currentTitle).to.equal(@"Sign In");
        });

        it(@"should have sign in view controller as only target", ^{
            expect(button.allTargets).to.equal([NSSet setWithObject:signInViewController]);
        });

        it(@"should have the sign in action as action for login view controller target", ^{
            NSString *selectorString = NSStringFromSelector(@selector(didTapSignInButton:));
            expect([button actionsForTarget:signInViewController forControlEvent:UIControlEventTouchUpInside]).to.equal(@[selectorString]);
        });
    });
```

Và cuối cùng nhưng không kém phần quan trọng, chúng tôi sẽ kiểm tra cách controller của chúng tôi hoạt động khi nhấn nút:
```
describe(@"tapping the logging button", ^{
     context(@"when login and password are present", ^{

         beforeEach(^{
             signInViewController.usernameTextField.text = @"Fixture Username";
             signInViewController.passwordTextField.text = @"Fixture Password";

             // Make sure state is different than the one expected
             signInViewController.fillInBothFieldsLabel.alpha = 1.0f;

             [signInViewController didTapSignInButton:nil];
         });

         it(@"should tell the sign in manager to sign in with given username and password", ^{
             [verify(mockSignInManager) signInWithUsername:@"Fixture Username" password:@"Fixture Password"];
         });
     });

     context(@"when login or password are not present", ^{
         beforeEach(^{
             signInViewController.usernameTextField.text = @"Fixture Username";
             signInViewController.passwordTextField.text = nil;

             [signInViewController didTapSignInButton:nil];
         });

         it(@"should not tell the sign in manager to sign in", ^{
             [verifyCount(mockSignInManager, never()) signInWithUsername:anything() password:anything()];
         });
     });

     context(@"when neither login or password are present", ^{
         beforeEach(^{
             signInViewController.usernameTextField.text = nil;
             signInViewController.passwordTextField.text = nil;

             [signInViewController didTapSignInButton:nil];
         });

         it(@"should not tell the sign in manager to sign in", ^{
             [verifyCount(mockSignInManager, never()) signInWithUsername:anything() password:anything()];
         });
     });
 });
```

Code được trình bày trong ví dụ trên có khá nhiều vấn đề. Trước hết, chúng tôi đã trình bày rất nhiều triển khai nội bộ của `SignInViewController`, bao gồm các nút, textfields và phương thức. Sự thật là chúng tôi đã thực sự cần phải làm tất cả những điều này.
Hãy để chúng tôi xem làm thế nào chúng ta có thể cấu trúc lại các test này để đảm bảo rằng chúng ta không chạm vào việc thực hiện nội bộ. Chúng tôi sẽ bắt đầu bằng cách loại bỏ target và phương thức nào được kết nối với nút đăng nhập:
```
@interface UIButton (Specs)

- (void)specsSimulateTap;

@end

@implementation UIButton (Specs)

- (void)specsSimulateTap {
    [self sendActionsForControlEvents:UIControlEventTouchUpInside];
}

@end
```

Bây giờ chúng tôi chỉ có thể gọi phương thức này trên button và xác nhận xem class SignInManager có nhận được thông báo phù hợp hay không. Nhưng chúng ta vẫn có thể cải thiện cách viết bài test này.

Chúng ta không nên thực sự quan tâm nó ở đâu; chúng ta chỉ nên quan tâm đến việc nó có ở đâu đó trong view của view controller hay không và điều gì xảy ra khi nó được nhấn. Chúng ta có thể sử dụng phương thức trợ giúp để lấy nút đăng nhập, bất kể nó ở đâu:
```
@interface UIView (Specs)

- (UIButton *)specsFindButtonWithTitle:(NSString *)title;

@end
```

Phương pháp của chúng tôi sẽ duyệt qua subviews và trả về nút đầu tiên có tiêu đề phù hợp. Chúng ta có thể viết các phương thức tương tự cho các textfield hoặc label:
```
@interface UIView (Specs)

- (UITextField *)specsFindTextFieldWithPlaceholder:(NSString *)placeholder;
- (UILabel *)specsFindLabelWithText:(NSString *)text;

@end
```

Hãy để xem các unit test của chúng tôi bây giờ như thế nào:
```
describe(@"view", ^{

    __block UIView *view;

    beforeEach(^{
        view = [signInViewController view];
    });

    describe(@"login button", ^{

        __block UITextField *usernameTextField;
        __block UITextField *passwordTextField;
        __block UIButton *signInButton;

        beforeEach(^{
            signInButton = [view specsFindButtonWithTitle:@"Sign In"];
            usernameTextField = [view specsFindTextFieldWithPlaceholder:@"Username"];
            passwordTextField = [view specsFindTextFieldWithPlaceholder:@"Password"];
        });

        context(@"when login and password are present", ^{
            beforeEach(^{
                usernameTextField.text = @"Fixture Username";
                passwordTextField.text = @"Fixture Password";

                [signInButton specsSimulateTap];
            });

            it(@"should tell the sign in manager to sign in with given username and password", ^{
                [verify(mockSignInManager) signInWithUsername:@"Fixture Username" password:@"Fixture Password"];
            });
        });

        context(@"when login or password are not present", ^{
            beforeEach(^{
                usernameTextField.text = @"Fixture Username";
                passwordTextField.text = nil;

                [signInButton specsSimulateTap];
            });

            it(@"should not tell the sign in manager to sign in", ^{
                [verifyCount(mockSignInManager, never()) signInWithUsername:anything() password:anything()];
            });
        });

        context(@"when neither login or password are present", ^{
            beforeEach(^{
                usernameTextField.text = nil;
                passwordTextField.text = nil;

                [signInButton specsSimulateTap];
            });

            it(@"should not tell the sign in manager to sign in", ^{
                [verifyCount(mockSignInManager, never()) signInWithUsername:anything() password:anything()];
            });
        });
    });
});
```

Trông đơn giản hơn nhiều, phải không? Lưu ý rằng bằng cách tìm kiếm một nút với tiêu đề "Sign In", chúng tôi cũng đã test xem một nút như vậy có tồn tại hay không. Hơn nữa, bằng cách mô phỏng việc nhấn, chúng tôi đã kiểm tra xem hành động có được nối chính xác hay không. Và cuối cùng, bằng cách khẳng định rằng `SignInManager` của chúng tôi sẽ được gọi, chúng tôi đã kiểm tra xem phần đó có được thực hiện chính xác hay không - tất cả điều này bằng ba thử nghiệm đơn giản.

Điều tuyệt vời là chúng ta không còn cần phải phơi bày bất kỳ thuộc tính nào trong số đó. Trên thực tế, interface của chúng tôi có thể đơn giản như thế này:
```
@interface SignInViewController : UIViewController

@property(nonatomic, readonly) SignInManager *signInManager;

- (instancetype)initWithSignInManager:(SignInManager *)signInManager;

@end
```

Trong các thử nghiệm này, chúng tôi đã tận dụng các khả năng của DSL BDD. Lưu ý cách chúng tôi sử dụng các khối ngữ cảnh để xác định các yêu cầu khác nhau về cách `SignInViewController` hoạt động, dựa trên trạng thái textfield của nó. Đây là một ví dụ tuyệt vời về cách bạn có thể sử dụng BDD để làm cho các bài test của bạn đơn giản và dễ đọc hơn trong khi vẫn giữ được chức năng của chúng.

## Phần kết luận
BDD không khó như ban đầu. Tất cả những gì bạn cần làm là thay đổi suy nghĩ của mình một chút - suy nghĩ thêm về cách một đối tượng nên hành xử (và interface của nó sẽ trông như thế nào) và về cách nó nên được thực hiện. Bằng cách làm như vậy, bạn sẽ có một cơ sở mã mạnh mẽ hơn, cùng với bộ unit test tuyệt vời. Hơn nữa, các thử nghiệm của bạn sẽ trở nên ít bị phá vỡ hơn trong quá trình tái cấu trúc và chúng sẽ tập trung vào unit test của đối tượng của bạn thay vì thực hiện bên trong nó. 

Và với các công cụ tuyệt vời do cộng đồng iOS cung cấp, bạn sẽ có thể bắt đầu BDD các ứng dụng của mình ngay lập tức. Bây giờ bạn đã biết phải test những gì, có thực sự không có lý do gì không?

Tham khảo: https://www.objc.io/issues/15-testing/behavior-driven-development/#examples