Khi tôi bắt đầu làm việc với React Native chưa lâu trước đây, tôi đã rất thất vọng bởi quá nhiều thông tin xung quanh việc testing ứng dụng React. React được biết đến là phát triển nhanh, thường đưa ra những thay đổi đột phá, vì vậy điều này không ngạc nhiên đối với các developer. Tuy nhiên, số lượng nội dung cũ, không dùng nữa sẽ mang laị cảm giác tệ, đặt biệt là các developer mới làm việc với React hoặc RN.

Sau vài ngày, tự mình phá bỏ các bức tường, tôi quyết định nte lại các vấn đề hiện tại của testing, với hy vọng bài đăng của tôi không trở nên lỗi thời vào thời điểm xuất hiện.

**Note**: Mặc dù ban đầu tôi định viết 1 bài post lớn và mô tả chi tiết về RN testing nhưng tôi đã quyết định chia nhỏ các phần. Bài này nói về Jest. 


# 1. Jest
Khi tôi tạo một ứng dụng React hoặc React Native thông qua một trong các công cụ Cli được cung cấp, nó sẽ tự dộng tạo một bài kiểm tra đơn vị mẫu bằng cách sử dụng một khuôn khổ có tên là Jest. Tôi phải nói trước, bạn không nhất thiết phải sử dụng Jest cho test RN, nhưng nó chắc chắn mang lại cho bạn một vài tính năng thú vị.

Như Mocha, Jest là một khung xác nhận và vận hành test được khẳng định, sử dụng cú pháp BDD quen thuộc để mô tả và xác nhận các thử nghiệm.
```
describe('check validate number', () => {

  it('should be true validate number ', () => {
    expect(validateNumber(124)).toBe(true)
  })
})
```

# 2. Setting up
Cài đặt Jest và viết test đầu tiên của bạn khá dễ dàng, do cách tiếp cận 'quy ước trên cấu hình' của nó. Mặc dù hoàn toàn có thể tinh chỉnh cấu hình Jest, nhưng có những giá trị mặc định được xác định trước cho mọi thứ. Trên thực tế, tất cả những gì bạn cần làm là đặt các test của mình dưới __tests__, và các modun giả trong __mocks__ và Jest sẽ tự động tìm thấy chúng.

# 3. Mocking
 hết, Jest tự cung cấp một vài tính năng thú vị. Một là cách tiếp cận tích cực để mock. Trước đây, lên đến một vài phiên bản, tuỳ chọn tự động hoá của Jest được đặt thành true theo mặc định. Điều này có nghĩa là trừ khi nó được định cấu hình rõ ràng để không thực hiện như vậy, Jest sẽ tạo ra một mô hình từ mọi thư viện và phần phụ thuộc có liên quan tới code của bạn. 
 Mặc dù vậy, developer đã nhận ra đây là ý tưởng quá năng nổ và mặc dù tuỳ chọn vẫn còn đó nhưng nó được đặt thành false theo mặc định: 
 
 Chúng tôi đã giới thiệu tính năng tự động hoá tại Facebook và nó đã hoạt động hiệu quả với chung tôi khi Unit test được áp dụng trong một base code lớn hiện có với ít test hiện có, nhưng theo thời gian, có vẻ như mọi người đã dành nhiều time hơn để làm với mocked/unmocked modun hơn là viết test thông thường.  Chúng tôi cũng nhận thấy rằng các tác giả thư viện thường yêu cầu một số lượng lớn các modun cơ bản luôn phải được unmock thủ công. 
 
 Tuy nhiên, việc tắt automocking, bạn có thể dễ dàng mô phỏng toàn bộ modun hoặc chỉ một vài chức năng có các lệnh gọi không cần thiết ( http requests, dish read/write ...). 
 
 
 Jest Mocking Cheatsheet

```
// Mock-related functions available via the global Jest object
jest.resetAllMocks()  
jest.clearAllTimers()  
jest.disableAutomock()  
jest.enableAutomock()  
jest.fn(?implementation)  
jest.isMockFunction(fn)  
jest.genMockFromModule(moduleName)  
jest.mock(moduleName, ?factory, ?options)  
jest.resetModules()  
jest.setMock(moduleName, moduleExports)  
jest.unmock(moduleName)  
jest.spyOn()

// Mock functions available to every mock
mockFn.mock.calls  
mockFn.mock.instances  
mockFn.mockClear()  
mockFn.mockReset()  
mockFn.mockRestore()  
mockFn.mockImplementation(fn)  
mockFn.mockImplementationOnce(fn)  
mockFn.mockReturnThis()  
mockFn.mockReturnValue(value)  
mockFn.mockReturnValueOnce(value)
```

# 4. Snapshotting
Bên cạnh mocking, snapshotting cũng là một tính năng lớn khác mà Jest cung cấp. Nếu bạn đang sử dụng React hoặc React Native Cli, bạn sẽ thấy dòng mã này trong các test code của mình: 
```
expect(tree).toMatchSnapshot();
```

Khi xác nhận với 1 snapshot, Jest sẽ tìm một ảnh hiện có trong thư mục __snapshots__ và nếu không tìm thấy, sẽ lưu ảnh hiện tại ở đó. Lần tiếp theo, khi chạy unit test, cái hiện tại sẽ được so sánh với các hiện có, nếu có thay dổi, thì test sẽ bị fail.

Snapshotting trở nên cực kì hữu ích khi testing tích hợp nhiều thành phần, trong đó kết quả thường là các components được thiét lập sẵn. Cách các developer viết các test đó là sử dụng nhiều xác nhận, viết các thành phần của kết quả mong đời bằng tay hoặc sử dụng một vài xác nhận đơn giả ( như toContain). 

Đây là ví dụ của offical Jest blog dùng để render output của 1 component React thành snapshot: 
```
import renderer from 'react-test-renderer';

test('Link renders correctly', () => {  
  const tree = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
```

 Và đây là ảnh snapshot tương ứng lưu: 
 
 ```
 exports['Link renders correctly 1'] = '  
<a  
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function bound _onMouseEnter]}
  onMouseLeave={[Function bound _onMouseLeave]}>
  Facebook
</a>  
';
 ```
 
 Mặc dù chắc chắn bạn sẽ thấy tính năng snapshot này hữu ích để xác minh việc hiển thị của các ứng dụng và component của app, nhưng đây không phải là trường hợp sử dụng duy nhất. Tôi thấy nó hữu ích khi xác minh state toàn app,ví dụ: sử dụng các thư viện Redux hoặc các cách tiếp cận tương tự khác. 
 
#  5. Tổng kết
Nói chung, tôi thấy cách tiếp cận của Jest khá thú vị . Bắt đầu làm việc cho một dự án mới, đặt biệt React hoặc React Native , bạn nên thực hiện nó, vì được đóng gói sẵn. Ngay cả khi bạn làm với lượng code UT lớn, bạn có thể chạy Jest mà không mất nhiều thời gian.

Bài viết được dịch từ: 
https://link.medium.com/xgzBlVUAqgb

Cám ơn các bạn đã đọc, hy vọng sẽ giúp ích cho mọi người! Happy coding!