Mình chưa được dùng máy mac bao giờ, nhưng thấy bài này có vẻ hot, nên dịch dạo.
Chắc ai đó sẽ cần (lol)

## Bối cảnh 

Đây là những mục cài đặt/thiết lập ngay sau khi đổi máy iMac, macbook mà tôi nghĩ các bạn nên biết:v
Những mục thiết lập này có thể set từ Terminal. Về cơ bản, các bạn chỉ cần để những mục này dưới dạng dotfile,rồi chạy khi mua máy/ đổi máy là được. 
Viết 1 lần, xong cứ mỗi lần mua/đổi máy lại lôi câu lệnh ra chạy. Trong phút chốc bạn đã có các mục thiết lập giống máy cũ.
Cũng tiện phết. 
Các bạn có thể tham khảo repo và trang web dưới đây.

https://www.defaults-write.com/
https://github.com/divio/osx-bootstrap/tree/master/core
https://github.com/mathiasbynens/dotfiles/blob/master/.macos

![](https://images.viblo.asia/af5f179a-ff3d-49eb-8ef5-fb5daf30bf4d.jpg)

## Câu lệnh defaults là gì?

Đây là câu lệnh dùng để Thêm, Thay đổi, Xóa trong file setting cho app, hệ thống có tên 「plist」.
Có thể set những chỗ khó nhằn mà Setting GUI tiêu chuẩn không xử lý được.

Chi tiết: các bạn tham khảo bài viết dưới đây.
http://tukaikta.blog135.fc2.com/blog-entry-209.html

## Lưu ý ①

Khi chạy đồng thời tất cả các mục ghi trên, có thể response sẽ bị chậm, không được mượt mà cho lắm.
Vì vậy, tôi suggest các bạn chỉ nên áp dụng những phần setting phù hợp với nhu cầu của bản thân.

## Lưu ý ②

Tùy theo app, mà có trường hợp setting sẽ bị cache.
Lúc đó, cần khởi động lại process. Vì vậy, cần phải thực hiện thao tác dưới đây.

```
$ killall APPLICATION_NAME

# Nếu là Finder
$ killall Finder
```

## Hệ thống cơ bản

```
# Thay đổi thời gian đến lúc standby thành 24 giờ (Default là 1h)
$ sudo pmset -a standbydelay 86400

# Mute sound khi boot (Không biết các bạn thế nào, chứ tôi rất khó chịu với âm thanh này, nên đã set im lặng)
$ sudo nvram SystemAudioVolume=" "

# Luôn hiển thị Scroll bar
$ defaults write NSGlobalDomain AppleShowScrollBars -string "Always"

# Tăng tốc độ thay đổi kích thước màn hình của Console app
$ defaults write NSGlobalDomain NSWindowResizeTime -float 0.001

# Tự động khởi động khi máy bị treo
$ sudo systemsetup -setrestartfreeze on

# Không để máy Sleep
$ sudo systemsetup -setcomputersleep Off > /dev/null

# Disable chức năng tự động chuyển thành chữ hoa 
$ defaults write NSGlobalDomain NSAutomaticCapitalizationEnabled -bool false

# Disable chức năng Report crash
$ defaults write com.apple.CrashReporter DialogType -string "none"

# Hiển thị ip Host name khi click vào icon đồng hồ.
$ sudo defaults write /Library/Preferences/com.apple.loginwindow AdminHostInfo HostName

# Nâng chất lượng âm thanh của Headphone/Headset lên Bluetooth
$ defaults write com.apple.BluetoothAudioAgent "Apple Bitpool Min (editable)" -int 40
```
## Liên quan tới Dock

```
# Thay đổi hiệu quả của window lên mức Max/Min
$ defaults write com.apple.dock mineffect -string "scale"

# Hiển thị indicator light (đèn tín hiệu) của app đang mở Dock
$ defaults write com.apple.dock show-process-indicators -bool true

# Chỉ hiển thị những app đang mở trên dock
$ defaults write com.apple.dock static-only -bool true

# Disable animation khi khởi động Application.
$ defaults write com.apple.dock launchanim -bool false

# Xóa tất cả app icon (default) khỏi Dock
$ defaults write com.apple.dock persistent-apps -array

# Disable Dashboard
$ defaults write com.apple.dashboard mcx-disabled -bool true
```

## Liên quan tới Finder

```
# Disable Animation
$ defaults write com.apple.finder DisableAllAnimations -bool true

# Hiển thị file bị defautl ẩn
$ defaults write com.apple.finder AppleShowAllFiles -bool true

# Hiển thị tất cả các file extension
$ defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Hiển thị Status bar
$ defaults write com.apple.finder ShowStatusBar -bool true

# Hiển thị Path bar
$ defaults write com.apple.finder ShowPathbar -bool true

# Để Sort theo tên phía trước Directory khi Select.
$ defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

# Search current directory khi thực hiện tìm kiếm
$ defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

# Disable cảnh báo khi thay đổi extension
$ defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false

# Enable Spring load của directory
$ defaults write NSGlobalDomain com.apple.springing.enabled -bool true

# Bỏ delay Spring load
$ defaults write NSGlobalDomain com.apple.springing.delay -float 0

# Không tạo file .DS_Store trong USB, Network Storage...v.v
$ defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
$ defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# Disable Disk verify
$ defaults write com.apple.frameworks.diskimages skip-verify -bool true
$ defaults write com.apple.frameworks.diskimages skip-verify-locked -bool true
$ defaults write com.apple.frameworks.diskimages skip-verify-remote -bool true

# Tự động hiển thị Finder khi  mount Volumes
$ defaults write com.apple.frameworks.diskimages auto-open-ro-root -bool true
$ defaults write com.apple.frameworks.diskimages auto-open-rw-root -bool true
$ defaults write com.apple.finder OpenWindowForNewRemovableDisk -bool true

# Disable cảnh báo trước khi Clear thùng rác
$ defaults write com.apple.finder WarnOnEmptyTrash -bool false

# Show the ~/Library folder
$ chflags nohidden ~/Library

# Show the /Volumes folder
$ sudo chflags nohidden /Volumes
```

## Liên quan tới Spotlight

```
# Không hiển thị tray icon (thanh tác vụ)
$ sudo chmod 600 /System/Library/CoreServices/Search.bundle/Contents/MacOS/Search

# Enable Index main disk
$ sudo mdutil -i on / > /dev/null

# Tái cấu trúc Index
$ sudo mdutil -E / > /dev/null
```

## Liên quan tới Safari

```
# Không gửi Search Queries cho Apple
$ defaults write com.apple.Safari UniversalSearchEnabled -bool false
$ defaults write com.apple.Safari SuppressSearchSuggestions -bool true

# Làm nổi bật các item trên Web page bằng phím tab
$ defaults write com.apple.Safari WebKitTabToLinksPreferenceKey -bool true
$ defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2TabsToLinks -bool true

# Hiển thị tất cả các URL đang hiển thị trên Address
$ defaults write com.apple.Safari ShowFullURLInSmartSearchField -bool true

# Disable việc "Tự động mở file sau khi download"
$ defaults write com.apple.Safari AutoOpenSafeDownloads -bool false

# Enable Menu debug của Safari
$ defaults write com.apple.Safari IncludeInternalDebugMenu -bool true

# Xoa Icon không cần thiết khỏi thanh bookmark trên Safari
$ defaults write com.apple.Safari ProxiesInBookmarksBar "()"

# Thực hiện spellcheck liên tục
$ defaults write com.apple.Safari WebContinuousSpellCheckingEnabled -bool true

# Disable Auto correct
$ defaults write com.apple.Safari WebAutomaticSpellingCorrectionEnabled -bool false

# Disable Auto Fill
$ defaults write com.apple.Safari AutoFillFromAddressBook -bool false
$ defaults write com.apple.Safari AutoFillPasswords -bool false
$ defaults write com.apple.Safari AutoFillCreditCardData -bool false
$ defaults write com.apple.Safari AutoFillMiscellaneousForms -bool false

# Disable Plugin
$ defaults write com.apple.Safari WebKitPluginsEnabled -bool false
$ defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2PluginsEnabled -bool false

# Disable Java
$ defaults write com.apple.Safari WebKitJavaEnabled -bool false
$ defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2JavaEnabled -bool false

# Block cửa sổ Popup
$ defaults write com.apple.Safari WebKitJavaScriptCanOpenWindowsAutomatically -bool false
$ defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2JavaScriptCanOpenWindowsAutomatically -bool false

# Disable tracking
$ defaults write com.apple.Safari SendDoNotTrackHTTPHeader -bool true

# Tự động update chức năng mở rộng (extensions)
$ defaults write com.apple.Safari InstallExtensionUpdatesAutomatically -bool true
```

## Liên quan tới mail

```
# Disable Animation khi send mail và reply
$ defaults write com.apple.mail DisableReplyAnimations -bool true
$ defaults write com.apple.mail DisableSendAnimations -bool true

# Disable Inline Attachment file
$ defaults write com.apple.mail DisableInlineAttachmentViewing -bool true

# Disable việc auto spell check
$ defaults write com.apple.mail SpellCheckingBehavior -string "NoSpellCheckingEnabled"
```

## Liên quan tới Terminal

```
# Chỉ sử dụng UTF-8
$ defaults write com.apple.terminal StringEncodings -array 4

# Cài dark theme cho iTerm
$ open "${HOME}/init/Solarized Dark.itermcolors"

# Không hiển thị Prompt khi thoát Terminal
$ defaults write com.googlecode.iterm2 PromptOnQuit -bool false
```

## Liên quan tới App Store

```
# Enable  WebKi Develop tools
$ defaults write com.apple.appstore WebKitDeveloperExtras -bool true

# Enable Menu Debug
$ defaults write com.apple.appstore ShowDebugMenu -bool true

# Enable chức năng check việc tự động Update
$ defaults write com.apple.SoftwareUpdate AutomaticCheckEnabled -bool true

# Check Update App hàng ngày
$ defaults write com.apple.SoftwareUpdate ScheduleFrequency -int 1

# Download Update app trong background
$ defaults write com.apple.SoftwareUpdate AutomaticDownload -int 1

# Cài đặt Chrome Update Security và file System Data
$ defaults write com.apple.SoftwareUpdate CriticalUpdateInstall -int 1

# Tự động download app đã mua trên máy Mac khác
$ defaults write com.apple.SoftwareUpdate ConfigDataInstall -int 1

# Enable việc tự động Update App
$ defaults write com.apple.commerce AutoUpdate -bool true

# Enable tính năng: Tự động restart trong trường hợp app bắt buộc phải restart.
$ defaults write com.apple.commerce AutoUpdateRestartRequired -bool true
```

## Liên quan tới chrome

```
# Disable tất cả các backswipe khi cảm ứng của bàn di chuột bị kém 
$ defaults write com.google.Chrome AppleEnableSwipeNavigateWithScrolls -bool false
$ defaults write com.google.Chrome.canary AppleEnableSwipeNavigateWithScrolls -bool false

# Sử dụng Dialog Print Preview trong hệ thống 
$ defaults write com.google.Chrome DisablePrintPreview -bool true
$ defaults write com.google.Chrome.canary DisablePrintPreview -bool true

# Triển khai dialog Print có sẵn
$ defaults write com.google.Chrome PMPrintingExpandedStateForPrint2 -bool true
$ defaults write com.google.Chrome.canary PMPrintingExpandedStateForPrint2 -bool true
```

## Tóm tắt

Sau khi thử viết ra, tôi lại có dự định tạo dotfiles rồi public lên GitHub.

Tôi đã public tại
dotfiles/.macos

Nếu các bạn có thêm suggest gì khi cài đặt máy, hãy comment cho tôi cùng biết với nha.

Link bài gốc: 
https://qiita.com/ryuichi1208/items/5905240f3bfce793b33d?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=d1a3318b41-Qiita_newsletter_340_12_05_2018&utm_medium=email&utm_term=0_e44feaa081-d1a3318b41-33433141

Sưu tầm & Dịch bài: Thanh Thảo