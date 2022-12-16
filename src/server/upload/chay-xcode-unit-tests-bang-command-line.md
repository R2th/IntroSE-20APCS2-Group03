Trong bài này, bạn sẽ học được cách chạy Unit Tests bằng Command Line.

# Command Line Tools Package for Xcode

Để có thể chạy Unit Tests bằng Command Line, cần phải cài Command Line Package. Nếu bạn chưa có thì có lên trang download của Apple để tải: 

https://developer.apple.com/downloads/index.action

# The -destination Option
Dù bạn thực thi Unit Tests bằng XCode Editor hay command line, đều phải có bước chọn máy ảo để thực thi. Ở XCode Editor thì bạn dễ dàng thao tác bằng giao diện, còn Command Line thì sao? 

Lệnh dưới đây cho biết XCode của bạn đang có những devices nào.
```
instruments -s devices
```

Kết quả:
```
Known Devices:
iPad (7th generation) (14.4) [BD61938D-5078-459B-9682-E8487875C514] (Simulator)
iPad Pro (12.9-inch) (2nd generation) (14.4) [EDE1B27E-8770-489A-A35F-A52420491E03] (Simulator)
iPhone 11 (14.4) [ED0E62E0-B6D3-4121-B7C5-FA4FEEADC3AD] (Simulator)
```
Hiện tại trên máy mình chỉ có iPad (iOS 14.4), iPad Pro (iOS 14.4) và iPhone 11 (iOS 14.4). Như vậy khi mình chạy command line, có 1 trong 3 devices để thực thi.

# Build Unit Tests Without Running
Để chạy command line, dòng lệnh cần có `xcodebuild`.

```
xcodebuild build-for-testing [-workspace <your_workspace_name>]
                             [-project <your_project_name>]
                             -scheme <your_scheme_name>
                             -destination <destination-specifier>
```

Để chạy command line, mở Terminal và trọ đến folder dự án.

Dưới đây là đoạn code ví dụ 

```
xcodebuild build-for-testing \
    -workspace weather.xcworkspace \
    -scheme weather \
    -destination 'platform=iOS Simulator,name=iPhone 11,OS=14.4'
```

- **weather.xcworkspace** là tên workspace của dự án.
- **weather** là tên của scheme để chạy Unit Tests
- **destination** ở đây mình chọn là iPhone 11 với iOS 14.4
- **build-for-testing** để build app vào máy ảo, chứ chưa chạy unit test.

Mục dưới mình sẽ hướng dẫn chạy unit tests
# Build and Run Unit Tests
Giờ để chạy Unit Test, bạn hãy xem đoạn command line của mình.
```
xcodebuild test \
    -workspace weather.xcworkspace \
    -scheme weather \
    -destination 'platform=iOS Simulator,name=iPhone 11,OS=14.4'
```

Đoạn code trên sẽ thực thi weather project với scheme là weather và chạy trên iPhone 11 với iOS 14.4. Tất cả Unit Tests trong dự án sẽ được build và thực thi kiểm nghiệm. Dưới dây là kết quả cuối:

```
Test Suite 'weatherTests' passed at 2021-07-15 16:10:16.846.
	 Executed 5 tests, with 0 failures (0 unexpected) in 0.568 (0.570) seconds
Test Suite 'weatherTests.xctest' passed at 2021-07-15 16:10:16.847.
	 Executed 6 tests, with 0 failures (0 unexpected) in 0.574 (0.578) seconds
Test Suite 'All tests' passed at 2021-07-15 16:10:16.847.
	 Executed 6 tests, with 0 failures (0 unexpected) in 0.574 (0.580) seconds
2021-07-15 16:10:17.125 xcodebuild[21946:457112] [MT] IDETestOperationsObserverDebug: 39.677 elapsed -- Testing started completed.
2021-07-15 16:10:17.125 xcodebuild[21946:457112] [MT] IDETestOperationsObserverDebug: 0.000 sec, +0.000 sec -- start
2021-07-15 16:10:17.125 xcodebuild[21946:457112] [MT] IDETestOperationsObserverDebug: 39.677 sec, +39.677 sec -- end

Test session results, code coverage, and logs:
	/Users/tran.han.huy/Library/Developer/Xcode/DerivedData/weather-dyetksizdutotxfxvwkbitefmgxv/Logs/Test/Test-weather-2021.07.15_16-09-35-+0700.xcresult

** TEST SUCCEEDED **
```

# Run a Single Unit Test
Thay vì chạy hết tất cả Unit tests, bạn có thể setup để chạy 1 unit test thôi.

```
xcodebuild test \
    -workspace weather.xcworkspace \
    -scheme weather \
    -only-testing weatherTests/modelTests/testGetBackgroundNameFromCityId \
    -destination 'platform=iOS Simulator,name=iPhone 11,OS=14.4'
```

Đoạn command line ở trên chỉ việc thêm `-only-testing`. 

Cú pháp của nó như sau:

```
-only-testing TestTarget[/TestClass[/TestMethod]]
```

Tương tự, đã có thể chọn 1 unit tests riêng lẻ thì sẽ có cách skip 1 unit tests.

# Skip Select Unit Test
```
xcodebuild test \
    -workspace weather.xcworkspace \
    -scheme weather \
    -skip-testing weatherTests/modelTests/testGetBackgroundNameFromCityId \
    -destination 'platform=iOS Simulator,name=iPhone 11,OS=14.4'
```

Cú pháp của `-skip-testing`

```
-skip-testing TestTarget[/TestClass[/TestMethod]]
```

# Kết
Từ đây bạn có thể làm 1 số điều bạn muốn như sau:
- Xây dựng cron job để chạy Unit Test bằng command line
- Tích hợp câu lệnh vào hệ thống CI
- Ngoài ra còn nhiều thứ khác nữa.

Nguồn:

https://www.appsdeveloperblog.com/run-xcode-unit-tests-from-the-command-line/