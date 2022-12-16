OHHTTPStubs, Mockingjay là lib các thư viện cho phép control response của network request. OHHTTPStubs được viết bằng Objective -C và nó đã tồn tại rất lâu.Mockingjay
được viết bằng Swift và nó giống OHHTTPStubs.
Hôm nay mình sẽ chỉ cho các bạn làm thế nào để mock network request dùng Mockingjay. Việc tích hợp vào trong project rất đơn giản.
# 1. Cài đặt Mockingjay.
Đầu tiên các bạn hãy tải project này  xuống[ tại đây ](https://github.com/dunglh-1464/MockingjayExample)

Các bạn mở podfile và thêm đoạn code sau vào: 
```
target 'Rainstorm' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for Rainstorm

  target 'RainstormTests' do
    inherit! :search_paths
	pod 'Mockingjay'
    # Pods for testing
  end

end

```
Sau đó run pod install.

# 2. Tách các test suite
Mở file RootViewModelTests.swift và tại method seup(). Nếu chúng ta tiếp tục dùng 1 instance của class MockNetworkService thì việc dùng Mockingjay không có mấy tác dụng.
Chúng ta khởi tạo NetworkManager với 1 instance RootViewModel class truyền vào.

```
override func setUp() {
    super.setUp()

    // Initialize Mock Network Service
    networkService = MockNetworkService()

    // Configure Mock Network Service
    networkService.data = loadStub(name: "darksky", extension: "json")

    // Initialize Mock Location Service
    locationService = MockLocationService()

    // Initialize Root View Model
    viewModel = RootViewModel(networkService: NetworkManager(), locationService: locationService)
}
```
Chúng ta run lại class RootViewModelTests.swift sẽ thấy một số case unit test bị fail. OK bây giờ hãy tìm hiểu Mockingjay đã các test case đều pass nhé !.
![](https://images.viblo.asia/59025fc4-249e-4a90-ae34-906f8c2f810b.png)

# 3. Mocking Network Requests
Mockingjay có nhiều tính năng và có nhiều tuỳ chọn để mock network request.

Test case: testRefresh_Success bị fail do app fetch data với location latitude: 0.0 và longitude: 0.0. 

Mockingjay làm cho việc mock request  Dark Sky Api rất dễ dàng. Chúng ta
sẽ thêm import Mockingjay vào trong file RootViewModelTests. Trong Test case: testRefresh_Success,  chúng ta thực hiện get data từ file json.

```
func testRefresh_Success() {
        // Load Stub
        let data = loadStub(name: "darksky", extension: "json")
```
Sau đó chúng ta gọi stub() function.Nó bao gồm 2 tham số: 

- Tham số đầu là 1 matcher. (Một matcher định  nghĩa  một request có thể mock).
- Tham số thứ 2 là  một builder. (Data  lấy từ json).

Một builder sẽ xây dựng các câu trả lời cho các yêu cầu phù hợp. Các bạn hiểu câu trên như thế này: Nếu một request API thiếu  parameter thì sẽ trả về mã lỗi được server quy định , Nếu request đầy đủ parameter thì sẽ get được data thành công.

```
func testRefresh_Success() {
        // Load Stub
        let data = loadStub(name: "darksky", extension: "json")
        // Define Stub
        stub(everything, json(data))
```

Mockingjay sẽ chặn mọi yêu cầu  mà ứng dụng sử dụng URLSession để thực hiện request lên server. Các Response  trả về được stub bằng data lấy từ file json ở local.
Nếu Pass thì request Dark Sky API đã được mock bằng Mockingjay.

Test case: testRefresh_FailedToFetchWeatherData_RequestFailed bị fail.: Với input đầu vào Request failed, output ko get được data.
Mockingjay có thể fake response một cách thật đơn giản. Đầu tiên chúng ta sẽ tạo một instance NSError và đĩnh nghĩa response trả về bị fail.
```
func testRefresh_FailedToFetchWeatherData_RequestFailed() {
//         Create Error
        let error = NSError(domain: "com.cocoacasts.network", code: 1, userInfo: nil)
        
//         Define Stub
        stub(everything, failure(error))
```

Các bạn thử chạy lại test case trên : ok test case -> pass
- Tương tự test case: testRefresh_FailedToFetchWeatherData_InvalidResponse: Với Input đầu vào là data response không hợp lệ, output là ko get đươc data:
```
func testRefresh_FailedToFetchWeatherData_InvalidResponse() {
//        // Load Stub
        let body = ["some":"data"]  //  data response không hợp lệ,

        // Define Stub
        stub(everything, json(body)) // truyền data response không hợp lệ
        vào func stub
        
        // Define Expectation
        let expectation = XCTestExpectation(description: "Fetch Weather Data")
```
Thực hiện run lại test case -> test case pass
- Với Test case: testRefresh_FailedToFetchWeatherData_NoErrorNoResponse: Input đầu vào trả về response success nhưng không có bất kỳ dữ liệu nào:

```
func testRefresh_FailedToFetchWeatherData_NoErrorNoResponse() {
         Define Stub
        stub(everything) { (request) -> (Response) in
            // Create HTTP URL Response
            let response = HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)! // với response trả về succes có  status code 200

            return .success(response, .noContent) // không trả về bất kỳ dữ liệu nào
        }
```
Tại func stub() với closure là một request ở tham số thứ 2 và trả về 1 response  với statusCode = 200 nhưng ko có data trả về.
Thực hiện run lại test case -> test case pass

Trên đây là các vị dụ để các bạn có thể thực hành mock networking request. Hy vọng bài viết của mình có thể hiểu hơn về cách dùng lib Mockingjay để thực hiện viết Unit test.

# Tài liệu tham khảo:
https://cocoacasts.com/building-a-weather-application-from-scratch-mocking-network-requests-with-mockingjay