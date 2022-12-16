Trong quá trình phát triển các ứng dụng web bằng Ruby on Rails, chúng ta thường hay gặp nhiều trường hợp phải render views trên nhiều nền tảng trình duyệt khác nhau, trên các thiết bị khác nhau như desktop, tablet, mobile. Hoặc chúng ta có các config và setting với từng lọai cụ thể version của một trình duyệt nào đó như IE 6 chẳng hạn. Trong Rails có một gem giúp ta thực hiện những việc này: gem browser, chúng ta sẽ cùng nhau tìm hiểu về nó

# Installation
 
 ```
 gem 'browser'
 ```
 
#  Setting up Variants

Thông qua variants, chúng ta có thể get thông tin và handle đối với từng loại request gửi đến:

```
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :detect_device_variant



  private

  def detect_device_variant
    request.variant = :tablet if browser.device.tablet?
    request.variant = :desktop if !browser.device.mobile? && !browser.device.tablet?
  end
end
```

# Setting up Your Layouts

Chúng ta cần tạo các base templates layouts cho từng loại thiết bị khác nhau mà chúng ta đang nhắm đến:

* application.html.haml
* application.html+desktop.haml
* application.html+tablet.haml (use erb if you wish)

# Usage

Thư viện cung cấp cho chúng ta một số method để detect thiết bị, trình duyệt, hay version...

```
require "browser"

browser = Browser.new("Some User Agent", accept_language: "en-us")

# General info
browser.bot?
browser.chrome?
browser.core_media?
browser.edge?                # Newest MS browser
browser.electron?            # Electron Framework
browser.firefox?
browser.full_version
browser.ie?
browser.ie?(6)               # detect specific IE version
browser.ie?([">8", "<10"])   # detect specific IE (IE9).
browser.known?               # has the browser been successfully detected?
browser.meta                 # an array with several attributes
browser.modern?              # Webkit, Firefox 17+, IE 9+ and Opera 12+
browser.name                 # readable browser name
browser.nokia?
browser.opera?
browser.opera_mini?
browser.phantom_js?
browser.quicktime?
browser.safari?
browser.safari_webapp_mode?
browser.to_s            # the meta info joined by space
browser.uc_browser?
browser.version         # major version number
browser.webkit?
browser.webkit_full_version
browser.yandex?
browser.wechat?         # detect the MicroMessenger(WeChat)
browser.weibo?          # detect Weibo embedded browser (Sina Weibo)

# Get bot info
browser.bot.name
browser.bot.search_engine?
browser.bot?

# Get device info
browser.device
browser.device.id
browser.device.name
browser.device.blackberry_playbook?
browser.device.console?
browser.device.ipad?
browser.device.iphone?
browser.device.ipod_touch?
browser.device.kindle?
browser.device.kindle_fire?
browser.device.mobile?
browser.device.nintendo?
browser.device.playstation?
browser.device.ps3?
browser.device.ps4?
browser.device.psp?
browser.device.silk?
browser.device.surface?
browser.device.tablet?
browser.device.tv?
browser.device.vita?
browser.device.wii?
browser.device.wiiu?
browser.device.switch?
browser.device.xbox?
browser.device.xbox_360?
browser.device.xbox_one?

# Get platform info
browser.platform
browser.platform.id
browser.platform.name
browser.platform.version  # e.g. 9 (for iOS9)
browser.platform.adobe_air?
browser.platform.android?
browser.platform.android?(4.2)   # detect Android Jelly Bean 4.2
browser.platform.android_app?     # detect webview in an Android app
browser.platform.android_webview? # alias for android_app?
browser.platform.blackberry?
browser.platform.blackberry?(10) # detect specific BlackBerry version
browser.platform.chrome_os?
browser.platform.firefox_os?
browser.platform.ios?     # detect iOS
browser.platform.ios?(9)  # detect specific iOS version
browser.platform.ios_app?     # detect webview in an iOS app
browser.platform.ios_webview? # alias for ios_app?
browser.platform.linux?
browser.platform.mac?
browser.platform.other?
browser.platform.windows10?
browser.platform.windows7?
browser.platform.windows8?
browser.platform.windows8_1?
browser.platform.windows?
browser.platform.windows_mobile?
browser.platform.windows_phone?
browser.platform.windows_rt?
browser.platform.windows_touchscreen_desktop?
browser.platform.windows_vista?
browser.platform.windows_wow64?
browser.platform.windows_x64?
browser.platform.windows_x64_inclusive?
browser.platform.windows_xp?
```

# Aliases

Để thêm các method alias như mobile? hay tablet? đến đối tượng base browser(như browser.mobile?)  cần require file browser/aliases và extend Browser::Base object  như sau:

```
require "browser/aliases"
Browser::Base.include(Browser::Aliases)

browser = Browser.new("Some user agent")
browser.mobile? #=> false
```

# What defines a modern browser?

Theo default, một trình duyệt là modern bao gồm:
* Webkit
* IE9+
* Microsoft Edge
* Microsoft Edge
* Firefox Tablet 14+
* Opera 12+

Tuy nhiên bạn có thể overide lại bằng cách:

```
# Only Chrome Canary is considered modern.
Browser.modern_rules.clear
Browser.modern_rules << -> b { b.chrome? && b.version.to_i >= 37 }
```

# Middleware

Chúng ta có thể sử dụng Browser::Middleware để redirect user request:

```
use Browser::Middleware do
  redirect_to "/upgrade" unless browser.modern?
end
```

Nếu bạn đang dùng Rails, chỉ cần add dòng sau vào file: config/initializers/browser.rb

```
Rails.configuration.middleware.use Browser::Middleware do
  redirect_to upgrade_path unless browser.modern?
end
```

Hoặc chúng ta có thể custom với đa dạng các điều kiện:

```
Rails.configuration.middleware.use Browser::Middleware do
  next if browser.bot.search_engine?
  redirect_to upgrade_path(browser: "oldie") if browser.ie? && !browser.modern?
  redirect_to upgrade_path(browser: "oldfx") if browser.firefox? && !browser.modern?
end
```

Nếu bạn cần access đến đối tượng Rack::Request

```
Rails.configuration.middleware.use Browser::Middleware do
  redirect_to upgrade_path unless browser.modern? || request.env["PATH_INFO"] == "/exclude_me"
end
```


Source:

https://github.com/fnando/browser