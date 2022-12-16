Trong bài viết này mình hướng dẫn cách sử dụng selenium với Laravel chạy trên môi trường ubuntu, yêu cầu cần có
1. Hệ điều hành chạy ubuntu
2. Đã cài đặt php 7.1
3. Cài đặt composer
4. Tạo 1 project laravel mới

Các link cần tham khảo
1. https://www.seleniumhq.org/download/
1. https://laravel.com/
1. https://github.com/facebook/php-webdriver
(hướng dẫn sử dụng php-webdriver có thể tham khảo https://github.com/facebook/php-webdriver/wiki)

# Tiến hành cài đặt môi trường selenium trên ubuntu
script này mình copy ở trên https://gist.github.com/ziadoz/3e8ab7e944d02fe872c3454d17af31a5 

```
#!/usr/bin/env bash
# https://developers.supportbee.com/blog/setting-up-cucumber-to-run-with-Chrome-on-Linux/
# https://gist.github.com/curtismcmullan/7be1a8c1c841a9d8db2c
# http://stackoverflow.com/questions/10792403/how-do-i-get-chrome-working-with-selenium-using-php-webdriver
# http://stackoverflow.com/questions/26133486/how-to-specify-binary-path-for-remote-chromedriver-in-codeception
# http://stackoverflow.com/questions/40262682/how-to-run-selenium-3-x-with-chrome-driver-through-terminal
# http://askubuntu.com/questions/760085/how-do-you-install-google-chrome-on-ubuntu-16-04

# Versions
CHROME_DRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`
SELENIUM_STANDALONE_VERSION=3.11.0
SELENIUM_SUBDIR=$(echo "$SELENIUM_STANDALONE_VERSION" | cut -d"." -f-2)

# Remove existing downloads and binaries so we can start from scratch.
sudo apt-get remove google-chrome-stable
rm ~/selenium-server-standalone-*.jar
rm ~/chromedriver_linux64.zip
sudo rm /usr/local/bin/chromedriver
sudo rm /usr/local/bin/selenium-server-standalone.jar

# Install dependencies.
sudo apt-get update
sudo apt-get install -y unzip openjdk-8-jre-headless xvfb libxi6 libgconf-2-4

# Install Chrome.
sudo curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
sudo echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
sudo apt-get -y update
sudo apt-get -y install google-chrome-stable

# Install ChromeDriver.
wget -N http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/bin/chromedriver
sudo chown root:root /usr/local/bin/chromedriver
sudo chmod 0755 /usr/local/bin/chromedriver

# Install Selenium.
wget -N http://selenium-release.storage.googleapis.com/$SELENIUM_SUBDIR/selenium-server-standalone-$SELENIUM_STANDALONE_VERSION.jar -P ~/
sudo mv -f ~/selenium-server-standalone-$SELENIUM_STANDALONE_VERSION.jar /usr/local/bin/selenium-server-standalone.jar
sudo chown root:root /usr/local/bin/selenium-server-standalone.jar
sudo chmod 0755 /usr/local/bin/selenium-server-standalone.jar
```

Bạn tạo script như trên cho vào file install.sh, add permission excute ``` sudo chmod +x install.sh``` , tiến hành run thui, chờ xong là có môi trường

###  Run Chrome via Selenium Server
``` xvfb-run java -Dwebdriver.chrome.driver=/usr/local/bin/chromedriver -jar /usr/local/bin/selenium-server-standalone.jar ```

## Tiến hành tạo project để test

### Tạo project laravel
``` composer create-project --prefer-dist laravel/laravel laravel_selenium ```

### Install php web driver
```composer require facebook/webdriver```

### Tạo command để test connect đến selenium
``` php ~/01.Sites/laravel_selenium/artisan make:command ReportAprCommand ```

Code tham khảo, các bạn chú ý chỗ mình comment trong code 
```
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;

class ReportAprCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report:apr';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Example connect selenium with chrome driver';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Create chrome option with profile and disable info bar
        $_chromeOtions = new ChromeOptions();
        $_chromeOtions->addArguments([
            'user-data-dir=' . env('CHROME_PROFILE_FOLDER'),
            'disable-infobars'
        ]);

        // Create setting store credentials and profile
        $prefs = [
            'credentials_enable_service' => true,
            'profile.password_manager_enabled' => true
        ];

        $_chromeOtions->setExperimentalOption('prefs', $prefs);
        $capabilities = DesiredCapabilities::chrome();
        $capabilities->setCapability(ChromeOptions::CAPABILITY, $_chromeOtions);

        // Create connect and make session throght selenium server
        $driver = RemoteWebDriver::create('http://localhost:4444/wd/hub/', $capabilities);

        // Load url for process
        $driver->get('http://google.com');

        // TODO : here you can process element for testing and do something :D
        // Guide here
        // https://github.com/facebook/php-webdriver/wiki/Finding-an-element
    }
}
```

### Tiến hành run command
``` php ~/01.Sites/laravel_selenium/artisan :apr```

---> Bạn sẽ thấy bật lên 1 brower mới, ở đó mình có thể điều khiển các DOM thông qua code php

### Tổng kết
Trên là hướng dẫn của mình về cách tạo selenium + chrome, bạn có thể thay đổi sang firefox, bài viết trên rất hữu ích cho bạn nào làm các kịch bản test hoăc làm toy tool upload tự dộng chạy trên vps 
các bạn có thể tham khảo source code tại đây
[https://github.com/ngodinhngoc/laravel_selenium/commit/101912e07f2de8be109d246fb2034cefe184ad02](https://github.com/ngodinhngoc/laravel_selenium/commit/101912e07f2de8be109d246fb2034cefe184ad02)

Thanks for reading