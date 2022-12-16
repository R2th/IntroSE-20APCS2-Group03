Swift là một ngôn ngữ có khả năng combile nhanh, tuy nhiên nếu không cẩn thận, đối với những dự án lớn, sử dụng nhiều thư viện thì thời gian build của chúng vẫn khá lớn, gây mất thời gian rất nhiều. Có rất nhiều lý do để giải thích cho vấn đề này. Nhưng chủ yếu là do logic code của người viết. Trình biên dịch của swift cực kỳ chậm khi phải phân tích cú pháp và biên dịch các ký tự Từ điển & Mảng.

Thật không may là những trường hợp đó là không thể tránh khỏi với những dự án có size lớn, tuy nhiên, tin tốt là chúng ta có thể config để giảm đáng kể thời gian build cho project
# 1) Displaying build times in Xcode
Đầu tiên, để kiểm tra thì chúng ta sẽ đo thời gian build project trước

Bật timing cho xcode

```
Product->Perform Action->Build With Timing Summary
```

Hoặc chạy trong terminal

```
defaults write com.apple.dt.Xcode ShowBuildOperationDuration YES
```

Khi build hiện như sau là thành công
![](https://images.viblo.asia/965155e7-c5dd-4493-8789-37df329d2c9d.png)

Mỗi lần trước khi đo, chúng ta sẽ xoá cache(⌘+⌥+K) và derived data để đảm bảo chính xác nhất

# 2) Xác định mã biên dịch chậm
Xcode có tính năng cho phép bạn xác định thời gian build lâu là của đối tượng nào.Bạn thể có set giới hạn build cho đối tượng, và quan sát xem đối tượng nào đang vượt quá thời gian cho phép. Mở project’s build settings và thêm vào flag sau

1.-Xfrontend -warn-long-function-bodies=100
2 -Xfrontend -warn-long-expression-type-checking=100

Số 100 được đo bằng milisecond, nó là số nguyên bạn đặt giới hạn build, nếu vượi quá thì sẽ waring. Đó là cách để xác định đối tượng ngốn nhiều thời gian, cần cải thiện

# 3) Build the active architecture only
CHúng ta chỉ nên bật mode này khi đang chạy debug.
Đi đến Build Active Architecture Only và đảm bảo rằng chỉ bật yes ở chế độ Debug

![](https://images.viblo.asia/8ff011ba-224f-4eda-bece-8f6c9643f089.png)


# 4) Module optimisation
Bạn có thể thay đổi để khi chạy compile, nó sẽ chạy một lần với tất cả tệp nguồn thay vì chạy một lần với mỗi tệp nguồn. Để triển khai tính năng này thì hãy thêm yếu tố -Onone only in the debug configuration of Other Swift Flags . Bên dưới build setting. Bạn cũng sẽ cần đặt Mức tối ưu hóa thành Nhanh chóng, Tối ưu hóa toàn bộ mô-đun trong cài đặt xây dựng gỡ lỗi của mình.

![](https://images.viblo.asia/5efe2199-192d-4f37-9790-d6654ce26b2f.png)

Nếu bạn sử dụng CocoaPods, bạn có thể tối ưu hóa tất cả các phụ thuộc của mình bằng cách thêm phần sau vào cuối Podile của bạn.

```
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      if config.name == 'Debug'
        config.build_settings['OTHER_SWIFT_FLAGS'] = ['$(inherited)', '-Onone']
        config.build_settings['SWIFT_OPTIMIZATION_LEVEL'] = '-Owholemodule'
      end
    end
  end
end
```


# 5) Third party dependencies
Thư viện bên thứ 3 phổ biến nhất chính là CocoaPods, nó dễ sử dụng tuy nhiên thì đó ko phải là lựa chọn tốt nếu bạn muốn cải thiện thời gian build.
Sự thay thế cho nó chính là Carthage, tuy khó sử dụng hơn nhưng sẽ tiết kiệm thời gian cho bạn

# 6) Xcode has a new build system
Trong Xcode 9, Apple đã giới thiệu một hệ thống xây dựng mới. Tại thời điểm viết bài, đây chỉ là bản xem trước và không được bật theo mặc định. Một trong những lợi ích chính của hệ thống xây dựng mới là thời gian xây dựng nhanh hơn.

Để sử dụng hệ thống xây dựng mới, bạn có thể bật nó trong Menu  -> Workspace Settings

![](https://images.viblo.asia/edf46d5c-7770-4fda-ac8b-2ab5ebde15c7.png)

Từ menu này, bạn sẽ có thể chọn hệ thống xây dựng mới và giảm thời gian biên dịch mã Swift của bạn.

# 7) Enable concurrency when building
Trong Xcode 9.2, Apple đã giới thiệu một tính năng thử nghiệm cho phép Xcode chạy song song các tác vụ xây dựng Swift. Theo mặc định, tính năng này không được bật và bạn sẽ cần phải tự bật nó từ dòng lệnh.

```
defaults write com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively -bool NO
```

Options này có thể giảm đến tối đa 40% thời gian build. Tuy nhiên nếu máy bạn có ít RAM thì nó có thể gây chậm hơn. Nếu là như vậy thì chúng ta có thể tắt đi

```
defaults delete com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively
```

Trên đây là 1 số tip để có thể tăng tốc độ build cho project của bạn. Chúc các bạn áp dụng thành công!
[Tham khảo](https://medium.com/@joshgare/8-tips-to-speed-up-your-swift-build-and-compile-times-in-xcode-73081e1d84ba#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc4M2VjMDMxYzU5ZTExZjI1N2QwZWMxNTcxNGVmNjA3Y2U2YTJhNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2MTA5Nzk1NjksImF1ZCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExODI4NjczNzMzOTU5OTE0Njg3NCIsImhkIjoic3VuLWFzdGVyaXNrLmNvbSIsImVtYWlsIjoibmd1eWVuLnRoZS50cmluaEBzdW4tYXN0ZXJpc2suY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJOZ3V5ZW4gVGhlIFRyaW5oIiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8td1FuVFZNLU1hWGsvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQXMvQU1adXVjbU1OUmdfOGF5OG1Tc2xoWXVfY1dFdHpwcXB4QS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiTmd1eWVuIiwiZmFtaWx5X25hbWUiOiJUaGUgVHJpbmgiLCJpYXQiOjE2MTA5Nzk4NjksImV4cCI6MTYxMDk4MzQ2OSwianRpIjoiNjA4NzcwZWQ4M2IzMDg2YTY4OGNiYTA3NmNmNmNkMWVhNGYwYWIxYSJ9.u4b3BbuG4JauZpiqcNOFnLaX2DtPJWTV_rXSPzpQXIVxsf6pRdNPTaordQ356bLPUZugMkR0UzQfjRQ3UJJJEwO7sUFHZDSaIAB_xN3Rf8Bu9Xr6qd9gdPYIl_VJN95DrBYtcXW-RGaJtKrUHxjA6Vdbgon6J23CyT2HInqCqArlPNVNnLjS3YaNL_DP9KCq2m0OSSfFUrf_3KImWHMshWJ72MCVqw5rrihtsXPY6bFEtDbGQF7WUP6n9ZAveed_bpw4afSE5_tpR7hrSeiPTvwiMoUi9VVUsV1LAhz7WZ5EiIaOC2JuPomykLqXipu5VUK5SGUWP0UfuJ8gJ0hjGA)