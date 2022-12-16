## 1. Sau khi create project  Flutter bằng Android Studio, thì mở thư mục ios run pod init và pod install  để tạo pod , sau đó thêm đoạn code sau vào để setting pod : 
```
# Uncomment this line to define a global platform for your project
platform :ios, '11.0'

# CocoaPods analytics sends network stats synchronously affecting flutter build latency.
ENV['COCOAPODS_DISABLE_STATS'] = 'true'

project 'Runner', {
  'Debug' => :debug,
  'Profile' => :release,
  'Release' => :release,
}

def flutter_root
  generated_xcode_build_settings_path = File.expand_path(File.join('..', 'Flutter', 'Generated.xcconfig'), __FILE__)
  unless File.exist?(generated_xcode_build_settings_path)
    raise "#{generated_xcode_build_settings_path} must exist. If you're running pod install manually, make sure flutter pub get is executed first"
  end

  File.foreach(generated_xcode_build_settings_path) do |line|
    matches = line.match(/FLUTTER_ROOT\=(.*)/)
    return matches[1].strip if matches
  end
  raise "FLUTTER_ROOT not found in #{generated_xcode_build_settings_path}. Try deleting Generated.xcconfig, then run flutter pub get"
end

require File.expand_path(File.join('packages', 'flutter_tools', 'bin', 'podhelper'), flutter_root)

flutter_ios_podfile_setup

target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))

end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)
  end
end

```

## 2. Cần check target OS đang chạy  của pod và của target là bao nhiêu : 

![](https://images.viblo.asia/b689fc00-0c8e-4763-9871-e054fd2dbabe.png)

## 3. Cần xoá file : "Flutter.framework" để cài  lại pod hoặc xoá : 
![](https://images.viblo.asia/043d5f83-dc30-4772-a295-6d0c64bc0211.png)

## 4. Chạy lệnh  , chú ý nhớ setting schema Running là Debug hoặc Release: 

```
flutter build ios --verbose
```
 sau đó check lỗi  báo về : 
 
##  5. Đây là cách build file ipa : 
  https://stackoverflow.com/questions/51254470/how-to-create-ipa-file-for-testing-using-runner-app