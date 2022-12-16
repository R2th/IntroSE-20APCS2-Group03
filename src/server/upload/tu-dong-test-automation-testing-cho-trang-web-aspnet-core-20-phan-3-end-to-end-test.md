Đây là mục thứ ba trong một loạt các bài viết đưa ra tất cả các chiến lược test các ứng dụng web nói chung và các ứng dụng ASP.NET Core nói riêng.

Một chiến lược test bao gồm các bài test unit, test tích hợp và test E2E đã được giới thiệu. Hai bài viết trước đã nói về kiểm thử đơn vị (Unit Test) và kiểm thử tích hợp (Integration Test). Trong bài viết này, chúng ta sẽ xem xét các bài test E2E (end to end).

# Vai trò của các bài test End-to-End (E2E)
Trong các bài viết trước, chúng ta đã xem cấu trúc kim tự tháp với các bài test unit là ở dưới cùng và test toàn diện là ở trên cùng:

![](http://www.dotnetcurry.com/images/aspnet-core/integration/testing-pyramid1.png)

Hình 1: kim tự tháp test

Theo bản chất của các bài test E2E là gần nhất với cách người dùng tương tác với ứng dụng. Điều này làm cho nó trở thành một công cụ tốn công để tạo ra nhưng lại cực kỳ mạnh mẽ:

* Chúng tốn công sức để viết và duy trì vì được kết hợp chặt chẽ với giao diện người dùng. Vì UX là một trong những khía cạnh dễ thay đổi nhất của ứng dụng, các test code có nguy cơ bị phá vỡ bởi các thay đổi UX (thay đổi giao diện hoặc thay đổi hành vi thao tác trên màn hình).
* Chúng liên quan đến một trình duyệt thực sự chạy ứng dụng của bạn, vì vậy chúng là các test chạy chậm nhất trong các bài test. Chúng cũng phụ thuộc vào hành vi UX có nghĩa là chúng thường phải chờ các hành động được hoàn thành hoặc giao diện được cập nhật thì mới xong bài test.
* Tuy nhiên, chúng cũng rất có giá trị khi chúng ta nhận được phản hồi gần hơn với những gì người dùng có thể trải nghiệm khi sử dụng ứng dụng . Vì cuối cùng thì ứng dụng được sử dụng bởi người dùng  và chúng ta cần đảm bảo mọi thứ hoạt động theo đúng góc nhìn của họ.

Với những đặc điểm này, chúng ta cần phải đạt được sự cân bằng hợp lý giữa chi phí và giá trị khi thêm các test E2E. Không có test E2E nào sẽ là một nguy cơ nhưng có quá nhiều test E2E sẽ rất tốn thời gian để viết test! (Trong một số trường hợp, bạn có thể bỏ qua các bài test E2E hoàn toàn, ví dụ các ứng dụng không có UX chỉ đưa ra các API cho các hệ thống khác connect đến).
 
Áp dụng cho ví dụ đang cần test  về ứng dụng `BlogPlayground`, chúng ta có thể sử dụng các bài test E2E để đảm bảo:

* Người dùng có thể đăng nhập và đăng xuất
* Người dùng có thể xem danh sách các bài viết
* Người dùng có thể mở một bài viết
* Người dùng có thể thêm bài viết
* Người dùng có thể xóa bài viết

Về cơ bản, chúng ta đang test chức năng cơ bản của ứng dụng dưới dạng đơn giản nhất, chưa có nhiều business phức tạp.

# Selenium và Web Driver API
Selenium là một công cụ cho phép bạn tự động hóa các thao tác với trình duyệt, còn `Web Driver API` là một chuẩn để tự động hóa cácthao tác đó. Mỗi một web browser sẽ cần một Web Driver (Web Driver) riêng. Ví dụ Chrome, Firefox, Edge...mỗi cái lại cần Web Driver API của riêng nó. Bởi vì cấu trúc của trình duyệt web là hoàn toàn khác nhau nên dĩ nhiên thao tác trên nó cũng phải được điều khiển khác.

Mặc dù các công cụ này có thể được sử dụng để tự động hóa bất kỳ tác vụ nào thường liên quan đến tương tác của con người với trình duyệt, chúng được sử dụng chủ yếu là để test các ứng dụng web.

Khi sử dụng `Selenium`, bạn cần phải dựng lên một máy chủ `Selenium` kết nối với trình duyệt thông qua Web Driver. Bài test của bạn sẽ tương tác với máy chủ selenium thông qua API Web Driver JSON.

Để viết các bài test, bạn có thể sử dụng khá nhiều ngôn ngữ vì `Selenium` có sẵn các thư viện ứng dụng cho hầu hết các ngôn ngữ như C #, JavaScript, Python, Ruby hoặc Java.

![](http://www.dotnetcurry.com/images/aspnet-core/e2e/selenium-tests.png)

Hình 2: test dựa trên Selenium

Mặc dù các test của bạn có thể trực tiếp sử dụng Web Driver dành riêng cho trình duyệt, việc dùng máy chủ `Selenium` ở giữa là khôn ngoan vì bạn sẽ không cần phải quan tâm đến các trình duyệt khác nhau khi test nữa bạn chỉ cần viết test code một lần. Và dĩ nhiên là việc này có ý nghĩa là bạn test cùng lúc giao diện trên đa trình duyệt không hề khó khăn. Bạn có thể viết bài test của mình một lần bằng cách sử dụng thư viện máy khách `Selenium` và chạy với bất kỳ môi trường đích nào như các trình duyệt khác nhau trên các hệ điều hành khác nhau hoặc thậm chí là các trình duyệt trên thiết bị di động, đơn giản là để máy chủ `Selenium` biết nơi để tìm các Web Driver thích hợp và Web Driver nào trong thời gian chạy test cụ thể đó.

![](http://www.dotnetcurry.com/images/aspnet-core/e2e/selenium-drivers.png)

Hình 3: Các Web Driver `Selenium` cho phép cùng một bài test chạy với các môi trường khác nhau

Ngày nay việc sử dụng các test dựa trên `Web Driver` để test ứng dụng của bạn là rất phổ biến, có nhiều dịch vụ đám mây cho phép bạn chạy test tren nhiều trình duyệt hoặc trên nhiều thiết bị khác nhau, cả được simulator hoặc trên phần cứng thực. Có thể kể tên các nền tảng phổ biến như `BrowserStack`, `Sauce Labs` hoặc `CrossBrowserTesting`...

Trong bài viết này, chúng ta sẽ sử dụng `Nightwatch\.js`, một Framework cho phép bạn viết các bài test `Selenium Web Driver` bằng cách sử dụng thư viện JavaScript và chúng ta sẽ xem cách chạy các test này từ dòng lệnh (hoặc là từ máy chủ CI).

# Chuẩn bị ứng dụng ASP.NET Core cho các bài test E2E
Để test tự động chạy ổn định, chúng ta cần hệ thống chạy có kiểm soát. Nghĩa là có thể kiểm soát trạng thái của hệ thống lúc đang test.

Ví dụ: nếu chúng ta muốn test đăng nhập, cần có một tài khoản được tạo với tên người dùng và mật khẩu nằm sẵn trong DB. Chúng ta muốn kiểm tra dữ liệu test hiển thị trên các trang khác nhau được đúng thì cần phải tạo dữ liệu test được nhập cố định trước.

Điều này phụ thuộc rất nhiều vào cách chúng ta sẽ quản lý các máy chủ deploy code lên để test. Cần phải làm như sau:

* Chúng ta cần triển khai một môi trường test tách biệt với môi trường phát triển/ sản xuất được sử dụng cho mục đích duy nhất của test E2E, với các test hướng các trình duyệt đến URL của môi trường nói trên. Quá trình test/ CI  cần đảm bảo trạng thái của hệ thống là chuẩn trước khi các test có thể chạy, sử dụng các phương pháp như **seeding scripts** (script khởi tạo từ đầu), dùng API, hoặc lấy lại hệ thống từ bản sao lưu.
* Chúng ta có thể bật một server mới từ đầu, chạy test trên đó và xong rồi thì tắt hẳn server đó đi. Chúng ta có thể đưa **seeding scripts** vào quá trình khởi động server để tạo dữ liệu test và không cần phải lo về trạng thái server lúc trước như nào, cũng không cần làm sạch server sau khi toàn bộ môi trường bị tắt.

Trong bài viết này, tôi sẽ làm theo tùy chọn thứ hai vì nó khá giống với những gì chúng ta đã làm cho các bài test tích hợp. Trong thực tế, chúng ta có thể tái sử dụng cùng một dữ liệu đầu vào để test toàn bộ E2E. Về cơ bản chúng ta sẽ sử dụng một máy chủ **`Kestrel`** với một cơ sở dữ liệu trong bộ nhớ `SQLite`, nó sẽ được bắt đầu vào lúc bắt đầu chạy thử và sau đó tắt server.

Hãy bắt đầu bằng cách thêm một project ASP.NET Core trống mới vào solution , có tên là `BlogPlayground.E2ETest`. Thêm một tham chiếu đến các dự án `BlogPlayground` và `BlogPlayground.IntegrationTest` hiện có.

Bây giờ chúng ta có thể sửa file `Startup`,  thiết lập một cơ sở dữ liệu `SQLite` trong bộ nhớ và chạy kịch bản seeder khởi tạo cơ sở dữ liệu  đã được xác định trước:

```
public class TestStartup: BlogPlayground.Startup
{
    public TestStartup(IConfiguration configuration) : base(configuration)
    {
    }

    public override void ConfigureDatabase(IServiceCollection services)
    {
        // Replace default database connection with `SQLite` in memory
        var connectionStringBuilder = new `SQLite`ConnectionStringBuilder { DataSource = ":memory:" };
        var connection = new `SQLite`Connection(connectionStringBuilder.ToString());
        services.AddDbContext<ApplicationDbContext>(options => options.Use`SQLite`(connection));

        // Register the database seeder
        services.AddTransient<DatabaseSeeder>();
    }

    public override void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
        // Perform all the configuration in the base class
        base.Configure(app, env, loggerFactory);

        // Now create and seed the database
        using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
        using (var dbContext = serviceScope.ServiceProvider.GetService<ApplicationDbContext>())
        {
            dbContext.Database.OpenConnection();
            dbContext.Database.EnsureCreated();

            var seeder = serviceScope.ServiceProvider.GetService<DatabaseSeeder>();
            seeder.Seed().Wait();
        }
    }
}
```
Tiếp theo, chúng ta cần cập nhật file `Program.cs` để khởi chạy một máy chủ `Kestrel` bằng cách sử dụng lớp `TestStartup` mà chúng ta vừa tạo ra. Trong setting cần phải bao gồm `UseContentRoot` cho phép các views Razor được khai báo ở dự án `BlogPlayground` hiển thị chính xác khi chạy trên máy chủ `Kestrel` này:

```
public class Program
{
    public static void Main(string[] args)
    {
        BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args)
    {
        // To avoid hardcoding path to project, see: https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/testing#integration-testing
        var integrationTestsPath = PlatformServices.Default.Application.ApplicationBasePath; // e2e_tests/bin/Debug/netcoreapp2.0
        var applicationPath = Path.GetFullPath(Path.Combine(integrationTestsPath, "../../../../`BlogPlayground`"));

        return WebHost.CreateDefaultBuilder(args)
               .UseStartup<TestStartup>()
               .UseContentRoot(applicationPath)
               .UseEnvironment("Development")
               .Build();
    }
}
```
Quá trình này sẽ rất giống với quy trình mà chúng ta đã làm, bật máy chủ test tích hợp để chạy test. Khác biệt duy nhất là bây giờ chúng ta sẽ chạy một máy chủ `Kestrel` thực sự trong tiến trình riêng của nó (thay vì `TestServer`) và một cơ sở dữ liệu `SQLite` (thay vì một bộ nhớ RAM của EF).

Sau khi biên dịch, bạn sẽ có thể chạy dự án này từ `Visual Studio` hoặc dòng lệnh `dotnet run`. Ở lần test E2E này tôi sẽ sử dụng `dotnet run` để chạy server trước rồi mới bắt đầu test:

![](http://www.dotnetcurry.com/images/aspnet-core/e2e/running-test-server.png)

Hình 4: Hãy đảm bảo máy chủ test chạy bằng `dotnet run` trước khi test

# Viết và chạy test Selenium với Nightwatch.js

Bây giờ chúng ta có mọi thứ sẵn sàng để bắt đầu viết các bài test dựa trên `Selenium` .

Tôi chọn `Nightwatch.js`, một framework JavaScript phổ biến cho phép bạn viết các bài test của mình bằng cách sử dụng API đẹp hơn so với công cụ `Selenium`.

Lưu ý: Nightwatch vẫn cho phép bạn có quyền truy cập vào API cơ bản của `Selenium` khi cần.

Có một số lý do tại sao tôi đã sử dụng `Nightwatch.js` và JavaScript cho tác vụ chạy test E2E này:

* Tính năng động của nó giúp dễ dàng viết và duy trì các bài test phụ thuộc vào thứ gì đó dễ thay đổi như UX, đồng thời giữ mã kiểm thử của tôi sạch đẹp với các lệnh tùy chỉnh, xác nhận và kiểm tra phần tử trên trang.
* Cú pháp `Nightwatch` làm cho nó thực sự phù hợp với các test dựa trên trình duyệt, quản lý  bộ chọn CSS/ XPath gọn gàng và bắt được các hành động không đồng bộ (async).
* Có đồng hồ bấm giờ để tạm dừng quá trình đang chạy Selenium nếu cần. Nó cũng dễ dàng tích hợp với các nhà cung cấp đám mây như `Sauce Labs` hoặc `BrowserStack`.
* Nó gần gũi hơn với code được sử dụng bởi chính UX, có nghĩa là không cần phải học quá nhiều cú pháp giữa code và test code. Nó cũng dễ dàng viết mã JavaScript chạy được trong trình duyệt ngày khi test trong trường hợp bạn cần sử dụng Jquery để kiểm tra lúc test chẳng hạn.
* Nó có khả năng viết code NodeJS giúp dễ dàng tự động hóa các bước tiền xử lý như bật máy chủ lên và bảo đảm nó chạy từ dòng lệnh và có thể dễ dàng được thêm vào bất kỳ quá trình CI nào.

Bạn có thể tranh luận rằng việc viết các bài test XUnit trong C # sử dụng thư viện `Selenium` cũng vẫn OK, và nếu cách đó hoạt động tốt hơn cho bạn và nhóm của bạn, hãy sử dụng. Các nguyên tắc cơ bản là như nhau.

## Điều kiện tiên quyết để chạy test dựa trên Selenium

Để chạy các test dựa trên Selenium, chúng ta cần chạy một máy chủ selenium, được viết bằng Java. Điều này có nghĩa là chúng ta cần cài đặt Java trên môi trường phát triển  (và máy chủ CI sẽ chạy test trừ khi bạn sử dụng dịch vụ đám mây).

Vì `Nightwatch\.js` là một khung công tác JavaScript, chúng ta cũng sẽ cần phải cài đặt `Node.js` trên máy chạy test.

Sau khi cài đặt, hãy bắt đầu bằng cách thêm một file `package.json` vào dự án `BlogPlayground.E2ETest` . Đây là tập tin của Node sử dụng để quản lý các phụ thuộc (dependencies) và định nghĩa các scripts. Bạn có thể sử dụng vào `visual studio “Add New Item…”`, hoặc chạy lệnh `npm init` từ thư mục dự án.

Tiếp theo, hãy thêm các dependencies Node bắt buộc cho `Nightwatch\.js` và `Selenium` bằng cách chạy lệnh sau trên thư mục dự án:
```
npm install --save-dev nightwatch `Selenium`-server-standalone-jar
```

chúng ta sẽ chạy các test đối với `Chrome` và `Edge`, điều đó có nghĩa là chúng ta sẽ cần 2 `Web Driver` cho hai trình duyệt này.

Thêm một thư mục mới có tên là `Selenium-drivers` vào dự án và tải xuống phiên bản mới nhất của `Web Driver` (giả sử bạn đã cài đặt phiên bản mới nhất của các trình duyệt). Các file binary có thể được tải xuống từ trang chủ link bên dưới đây:

[Web Driver Chrome](https://sites.google.com/a/chromium.org/chromedriver/downloads)
[Web Driver Edge](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/#downloads)


Bây giờ chúng ta cần thêm một file cấu hình cho phép `Nightwatch` biết nơi cần tìm file test, nơi tìm máy chủ `Selenium`, trình duyệt để sử dụng, v.v. Mặc dù bạn có thể đọc thêm về cấu hình của `Nightwatch` trên tài liệu hướng dẫn của nó, tôi đã chú thích mã để dễ dàng theo dõi:

```
const `Selenium`Jar = require('`Selenium`-server-standalone-jar');
const settings = {
  // `Nightwatch` global settings
  src_folders: ['./tests'],
  output_folder: '.test-results/',

  // `Nightwatch` extension components (commands, pages, assertions, global hooks)
  globals_path: './globals.js',
  //custom_commands_path: './commands',
  //page_objects_path: './pages',
  //custom_assertions_path: './assertions'

  // `Selenium` settings
  `Selenium`: {
    start_process: true,
    server_path: `Selenium`Jar.path,
    start_session: true,
    log_path: '.test-results/',
    port: process.env.`Selenium`_PORT || 4444,
    host: process.env.`Selenium`_HOST || '127.0.0.1',
    cli_args: {
      'webdriver.edge.driver': './`Selenium`-drivers/MicrosoftWebDriver.exe',
      'webdriver.chrome.driver': ''
    }
  },

  test_settings: {
    default: {
      // `Nightwatch` test specific settings
      launch_url: process.env.LAUNCH_URL || 'http://localhost:56745',
      `Selenium`_port: process.env.`Selenium`_PORT || 4444,
      `Selenium`_host: process.env.`Selenium`_HOST || 'localhost',
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: '.test-results/screenshots'
      },
      // browser related settings. To be defined on each specific browser section
      desiredCapabilities: {
      },
      // user defined settings
      globals: {
        window_size: {
          width: 1280,
          height: 1024
        },
        start_app: process.env.LAUNCH_URL ? false : true,
        login_url: (process.env.LAUNCH_URL || 'http://localhost:56745') + '/Account/Login',
        user_info: {
          email: 'tester@test.com',
          password: '!Covfefe123',
        },
        navigation_timeout: 5000,
        initial_load_timeout: 10000
      }
    },
    // Define an environment per each of the target browsers
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--headless'],
        }
      },
    },
    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};

//make output folder available in code
//so we can redirect the dotnet server output to a log file there
settings.test_settings.default.globals.output_folder = settings.output_folder;

//Set path to chromedriver depending on host OS
var os = process.platform;
if (/^win/.test(os)) {
  settings.`Selenium`.cli_args['webdriver.chrome.driver'] = './`Selenium`-drivers/chromedriver-2.35-win.exe';
} else if (/^darwin/.test(os)) {
  settings.`Selenium`.cli_args['webdriver.chrome.driver'] = './`Selenium`-drivers/chromedriver-2.35-mac.exe';
} else {
  settings.`Selenium`.cli_args['webdriver.chrome.driver'] = './`Selenium`-drivers/chromedriver-2.35-linux.exe';
}

module.exports = settings;
```
Có một vài điểm đáng chú ý:

* Trong phần cài đặt bên trên, bạn có thể thấy đường dẫn đến một thư mục nơi chúng ta có thể xác định các commands, assertions (các css, js khởi tạo trang) và các pages. Những cái này đang bị comment đi, nhưng khi dùng đến chúng ta sẽ uncomment nó đi.
* Một số cài đặt có giá trị mặc định có thể được ghi đè bằng cách đặt biến môi trường, cụ thể hơn là các biến **LAUNCH_URL**, **SELENIUM_HOST**  và **SELENIUM_PORT**. Điều này cho phép các test chạy được trên docker và thậm chí chạy được trên các máy chủ khác nữa từ server CI bằng cách thiết lập các biến môi trường này.
* Phần được chú thích là “cài đặt do người dùng xác định” (“user defined settings”) cho phép bạn xác định bất kỳ dữ liệu nào bạn muốn sử dụng trong bất kỳ test nào của mình, ví dụ: tôi đã thêm thông tin login của một trong những người dùng test ở đó.
* Tham số `--headless` cho Chrome cho phép nó chạy trong chế độ không có giao diện bật lên. Bạn sẽ không thấy bất kỳ cửa sổ Chrome mới nào xuất hiện trong hệ thống của bạn trong khi chạy test, điều này là bắt buộc trên bất kỳ loại máy chủ CI nào. Nếu bạn tò mò và muốn xem cửa sổ Chrome trong khi chạy test, hãy comment dòng đó lại!


## Khởi động máy chủ khi chạy thử rất quan trọng
Bây giờ chúng ta cần thêm một file khác gọi là `globals.js`, nơi chúng ta có thể thêm các mock để toàn bộ các test E2E sử dụng chung:

* Mock trước và sau khi chạy test toàn bộ
* Mock trước và sau mỗi bài test

File này được tham chiếu từ file cấu hình dưới dạng cài đặt `globals_path` và có cấu trúc như sau (code này chưa có code  thêm vào):

```
module.exports = {
    // External before hook is ran at the beginning of the tests run, before creating the `Selenium` session
    before: function (done) {
        done();
    },

    // External after hook is ran at the very end of the tests run, after closing the `Selenium` session
    after: function (done) {
        done();
    },

    // This will be run before each test file is started
    beforeEach: function (browser, done) {
        done();
    },

    // This will be run after each test file is finished
    afterEach: function (browser, done) {
        //close the browser window then signal we are done
        browser
           .end()
           .perform(() => done());
    }
};
```
Về cơ bản, những gì chúng ta cần là chạy lệnh chạy `dotnet run` trước khi chạy test, và kill được process đó test đã chạy xong. Chúng ta sẽ sử dụng module `childProcess` của Node, trong hàm `spawn`, chúng ta trỏ các log ra một log file:


```
const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

let dotnetWebServer = null;
let dotnetWebServerStarted = false;

function startWebApplication(outputFolder, done) {
  const logFile = path.join(outputFolder, 'server.log');
  console.log('Starting web application. Log found at: ${logFile}');

  // Start web app in separated process.
  dotnetWebServer = childProcess.spawn("dotnet", ["run"]);

  // Fail test run startup if the server dies before it got properly started
  dotnetWebServer.on('close', (code) => {
    if (code !== 0 && !dotnetWebServerStarted) {
      console.error('Could not start dotnet server. Exited with code ${code}. Check log at ${logFile}');
      process.exit(-1);
    }
  });

  // Do not start the test until we see the "Application started" message from dotnet
  dotnetWebServer.stdout.on('data', (chunk) => {
    if (chunk.toString().includes("Application started")) {
      dotnetWebServerStarted = true;
      done();
    }
  });

  // Redirect the standard output of the web application to a log file  
  const appLogPath = path.join(__dirname, logFile);
  const childServerLog = fs.createWriteStream(appLogPath);
  dotnetWebServer.stdout.pipe(childServerLog);
  dotnetWebServer.stderr.pipe(childServerLog);
}
```

Bây giờ chúng ta có thể cập nhật các hàm trước và sau để đảm bảo máy chủ dotnet được started/stopped ở before/after của mỗi lần chạy thử:


```
before: function (done) {
  startWebApplication(this.output_folder, done);
},

after: function (done) {
  const os = process.platform;
  if (/^win/.test(os)) childProcess.spawn("taskkill", ["/pid", dotnetWebServer.pid, '/f', '/t']);
  else dotnetWebServer.kill('SIGINT');
  done();
},
```
Cuối cùng, chúng ta có thể muốn chạy test trên một môi trường bình thường không phải do test code gọi lên, ví dụ một môi trường test được triển khai bởi CI hoặc chạy trong một môi trường docker riêng biệt.

Chúng ta có thể sử dụng tập tin cấu hình để thiết lập cờ `start_app`, tùy thuộc vào việc một `target URL` có được cung cấp dưới dạng biến môi trường hay không và kiểm tra biến đó trong các hàm before/after:

```
// user defined settings in nightwatch.config.js
globals: {
  …
  start_app: process.env.LAUNCH_URL ? false : true,
  …
}

// Global hooks in global.js
before: function (done) {
  if (this.start_app) {
    startWebApplication(this.output_folder, done);
  } else {
    done();
  }
},

after: function (done) {
  if (this.start_app) {
    const os = process.platform;
    if (/^win/.test(os)) childProcess.spawn("taskkill", ["/pid", dotnetWebServer.pid, '/f', '/t']);
    else dotnetWebServer.kill('SIGINT');

    done();
  } else {
    done();
  }
},
```
## Viết và chạy test đầu tiên

Đã đến lúc thêm bài test đầu tiên.

Tạo một thư mục có tên là `tests` và một file mới bên trong nó có tên là `0.smoke.test.js`. Bây giờ chúng ta hãy viết một bài test đơn giản chỉ là test nếu trình duyệt tải trang chủ và chúng ta nhận được title đúng với trang web của ta:

```
module.exports = {
  '@tags': ['smoke-test', 'home-page'],

  'home page can be opened with default url': function (browser) {
      browser
         .url(browser.launchUrl)
         .waitForElementVisible('body', browser.globals.initial_load_timeout)
         .assert.title('Home Page - `BlogPlayground`')
         .assert.containsText('.body-content #myCarousel.item:first-child', 'Learn how to build ASP.NET apps that can run anywhere.');
  },
};
```
Tôi hy vọng bài test rất dễ hiểu, về cơ bản chúng ta đang sử dụng các lệnh và xác nhận của `Nightwatch` để viết bài test.

Đây là các hàm tiện lợi được cung cấp dựa trên giao thức `Web Driver`, nhưng bạn cũng có quyền truy cập vào `Web Driver cơ bản` bằng cách sử dụng cùng một đối tượng trình duyệt. Vui lòng đọc thêm tài liệu này http://nightwatchjs.org/api#protocol và xem các ví dụ test khác trên trang này nhé.

Trước khi chúng ta có thể chạy test, chúng ta sẽ định nghĩa các lệnh `npm` sẽ cho phép chúng ta dễ dàng kích hoạt chạy test đối với **Chrome** hoặc **Edge**:

```
"scripts": {
  "test:chrome": "nightwatch --config./nightwatch.config.js --env chrome",
  "test:edge": "nightwatch --config./nightwatch.config.js --env edge"
},
```
Bây giờ bạn có thể chuyển sang dòng lệnh và chạy bất kỳ lệnh nào sau đây:

```
npm run test:chrome
npm run test:edge
```


![](http://www.dotnetcurry.com/images/aspnet-core/e2e/running-the-first-test.png)

Hình 5: chạy test đầu tiên

Đến đây, một số bạn có thể tự hỏi cách chạy chỉ một bài test hoặc loại trừ một số test nhất định khi chạy toàn bộ test, v.v.

**Nightwatch** cho phép một số `command line options` cho các mục đích như vậy có thể được thêm vào bất kỳ commands nào, ví dụ (2 dấu gạch ngang là cố định phải viết như thế):

```
# runs only tests with the ‘smoke-test’ tag
npm run test:edge -- --tag smoke-test

# runs only test with specific file name
npm run test:edge -- --test tests/0.smoke.test.js
```

Điều này không chỉ hữu ích cho các nhà phát triển, mà còn để chạy các bộ test khác nhau trên các giai đoạn khác nhau của một quá trình CI phức tạp. Ví dụ, một máy chủ có thể được khởi động độc quyền cho chạy test và bộ đầy đủ được chạy, trong khi một nhóm test nhỏ hơn có thể chạy trên một môi trường prod/staging sau mỗi lần triển khai.

## Xử lý đăng nhập thông qua lệnh tùy chỉnh và mock test global

Một số trang mà chúng ta muốn test trong dự án mẫu như thêm/xóa bài viết yêu cầu phải đăng nhập với tư cách người dùng hợp lệ. Bằng cách khởi động máy chủ và tạo cơ sở dữ liệu, chúng ta biết rằng một số tài khoản người dùng nhất định sẽ tồn tại.

Bây giờ, chúng ta có thể thêm các thông tin đăng nhập đó vào cài đặt chung của nightwatch và tạo lệnh login. Hãy tạo một thư mục tên là `commands` với một file `login.js` bên trong. Hãy nhớ bỏ ghi chú các thiết lập `custom_command_path` bên trong `nightwatch.config.js`.

Cấu trúc của custom command trong nightwatch như sau:

```
exports.command = function (userInfo) {
  const browser = this;

  // Use default nightwatch API
  browser
  .url(…)
  .waitForElementVisible(…)
  .click(…);

  return this; // allows the command to be chained.
};
```
Vì tên file là `login.js`, khi gọi command login trong mã kiểm thử sẽ là `browser.login (userInfo)`;

Hãy thực hiện lệnh đó bằng cách trỏ đến url /Account/Login, điền vào form đăng nhập bằng thông tin người dùng test và kiểm tra xem chúng ta có được đăng nhập thành công với tư cách người dùng định trước:

```
exports.command = function (userInfo) {
  const browser = this;
  browser
      // go to login url
     .url(browser.globals.login_url)
     .waitForElementVisible('.form-login', browser.globals.initial_load_timeout)          
      // fill login form      
     .setValue('input[name=Email]', userInfo.email)
     .setValue('input[name=Password]', userInfo.password)
     .click('.form-login button.btn-default')
     .pause(1000)
      // After login, we should land in the home page logged in as the test user
     .assert.title('Home Page - `BlogPlayground`')
     .assert.containsText('.navbar form#logout-form', 'Hello Tester!');

  return this; // allows the command to be chained.
};
```

Hãy cập nhật bài test để test người dùng có thể đăng nhập và đăng xuất khỏi ứng dụng, lấy thông tin xác thực người dùng từ cài đặt chung ở trong `nightwatch.config.js`. Trong Nightwatch, mỗi file test được coi là một test có thể chứa nhiều bước chạy theo trình tự.

Bằng cách này, chúng ta có thể cập nhật bài test bằng bước 1 là đăng nhập, bước hai test rằng trang chủ hiển thị ra và bước cuối cùng test rằng chúng ta có thể đăng xuất:

```
module.exports = {
  '@tags': ['smoke-test', 'home-page'],

  'can login with test user': function (browser) {        
      browser.login(browser.globals.user_info);        
  },

  'home page can be opened with default url': function (browser) {
      browser
         .url(browser.launchUrl)
         .assert.title('Home Page - `BlogPlayground`')
         .waitForElementVisible('body', browser.globals.navigation_timeout)
         .assert.containsText('.body-content #myCarousel.item:first-child', 'Learn how to build ASP.NET apps that can run anywhere.');
  },

  'can logout': function (browser) {
      browser
         .assert.containsText('.navbar form#logout-form', 'Hello Tester!')
         .click('.navbar form#logout-form button[type=submit]')
         .waitForElementVisible('.navbar.navbar-login', browser.globals.initial_load_timeout)
         .assert.containsText('.navbar.navbar-login', 'Log in')
         .assert.attributeContains('.navbar.navbar-login.login-link', 'href', browser.globals.login_url);
  }
};
```
Cuối cùng, chúng ta có thể cập nhật hàm `beforeEach`  trong `globals.js` để tự động chạy lệnh đăng nhập trước khi bắt đầu bất kỳ test nào. Bằng cách này mặc định rằng chúng ta đã đăng nhập với tư cách là người dùng test trên bất kỳ test nào:

```
beforeEach: function (browser, done) {
  // Every test will need to login with the test user (except in the smokeTest where login is part of the test itself)
  if ( !browser.currentTest.module.endsWith("smoke.test")) {
      browser.login(browser.globals.user_info);
  }

  //Once all steps are finished, signal we are done
  browser.perform(() => done());
},
```
Với những thay đổi này, chúng ta đã sẵn sàng để viết bộ test E2E cuối cùng cho các trang bài viết.

# Test các trang Bài viết (Articles)
Bắt đầu bằng cách thêm một file `test.test.js` mới trong thư mục test. Bên trong bài test này, chúng ta sẽ thêm một số bước test quy trình sau:

* Trang danh sách bài viết tải và hiển thị một số bài viết được xác định trước
* Một bài viết mới có thể được thêm vào
* Bài viết mới xuất hiện trên trang danh sách và thanh bên bài viết gần đây
* Bạn có thể mở bài viết bằng cách trỏ đến trang chi tiết của bài viết đó
* Bài viết có thể bị xóa

Trong quá trình làm các bước này là có một vấn đề là phải select được class hoặc id CSS phù hợp để tìm các phần tử ở trên trang client để bạn có thể thao tác với nó, set giá trị cho nó hoặc test nội dung bên trong nó có như mong đợi.

Code bên dưới đây được viết một số select  css cơ bản như sau:

```
const testArticle = {
  title: 'Testing with Nightwatch',
  abstract: 'This is an automated test',
  contents: 'Verifying articles can be added'
}

module.exports = {
  '@tags': ['articles-page'],

  'Articles can be opened with its url': function (browser) {
    browser
      // Open the articles list page
     .url('${browser.launchUrl}/Articles')
     .assert.title('Articles - `BlogPlayground`')
     .waitForElementVisible('body', browser.globals.navigation_timeout)
      // Verify at least the 2 default articles show up in the list
     .expect.element('.body-content.article-list li:nth-child(1)').to.be.present;
  },

  'New Articles can be added': function (browser) {
    browser
      // Go to the create page
     .url('${browser.launchUrl}/Articles/Create')
     .assert.title('Create - `BlogPlayground`')
     .waitForElementVisible('body', browser.globals.navigation_timeout)
      // Enter the details and submit
     .setValue('.body-content input[name=Title]', testArticle.title)
     .setValue('.body-content textarea[name=Abstract]', testArticle.abstract)
     .setValue('.body-content textarea[name=Contents]', testArticle.contents)
     .click('.body-content input[type=submit]')
      // Verify we go back to the articles list
     .pause(browser.globals.navigation_timeout)
     .assert.title('Articles - `BlogPlayground`');
  },

  'New Articles show in the Articles page': function (browser) {
    browser
     .assert.containsText('.body-content.article-list li:first-child', testArticle.title)
     .assert.containsText('.body-content.article-list li:first-child', testArticle.abstract)
     .assert.containsText('.body-content.article-list li:first-child.author-name', 'Tester');
  },

  'Articles can be read in their details page': function (browser) {
    browser
      // Open the article from the lisdt
     .click('.body-content.article-list li:first-child h4 a')
      // Verify navigation to the article details and the right contents are displayed
     .pause(browser.globals.navigation_timeout)
     .assert.title('${testArticle.title} - `BlogPlayground`')
     .assert.containsText('.body-content.article-summary', testArticle.title)
     .assert.containsText('.body-content.article-summary', testArticle.abstract)
     .assert.containsText('.body-content.article-summary.author-name', 'Tester')
     .assert.containsText('.body-content.markdown-contents', testArticle.contents);
  },

  'Articles can be removed': function (browser) {
    browser
      // Click remove on article details
     .click('.body-content.sidebar button.dropdown-toggle')
     .waitForElementVisible('.body-content.sidebar ul.dropdown-menu', browser.globals.navigation_timeout)
     .click('.body-content.sidebar ul.dropdown-menu li:last-child a')
      // Verify navigation to the confirmation page and click delete
     .pause(browser.globals.navigation_timeout)
     .assert.title('Delete - `BlogPlayground`')
     .click('.body-content input[type=submit]')
      // Verify navigation to articles list and that it disappeared from the list
     .pause(browser.globals.navigation_timeout)
     .assert.title('Articles - `BlogPlayground`')
     .assert.containsText('.body-content.article-list li:first-child', 'Test Article 2');
  }
};
```

Giờ thì chạy các test một lần nữa, bạn sẽ thấy tất cả test xuất hiện trong output của command line:

![](http://www.dotnetcurry.com/images/aspnet-core/e2e/aspnet-core-full-test-run.png)

Hình 6: chạy test đầy đủ

## Lưu ý về CSS selectors và khả năng bảo trì các test

Như bạn có thể nhận thấy, các bài test phụ thuộc rất lớn vào cấu trúc HTML và các thuộc tính css của element. Bạn nên tìm cách viết selector css chung chung nhất có thể để tránh chúng bị phá vỡ khi trang web bị tái cấu trúc và sửa css. Đôi khi bạn phải thêm id hoặc class vào phần tử trên trang, để các test của bạn có thể tìm thấy chúng mà không phải đi tìm quá sâu trong cấu trúc HTML của trang web.

Ví dụ: thay vì một selector như `.body-content.sidebar button.dropdown-toggle`, bạn nên thêm id vào dropdown đó và chỉ cần sử dụng '#articles-actions-dropdown' là tìm được.

Điều này cho phép bạn thiết kế lại trang chi tiết bài viết của mình và test sẽ không quan tâm miễn là có dropdown có id như vậy, trong khi với selector, test của bạn có thể bị fail nếu dropdown sử dụng tag hoặc bị di chuyển ra khỏi vị trí hiện tại.

Một chú ý khác là sự lặp đi lặp lại của các selector bên trong một file test như `articles.test.js`.

Bạn có thể muốn cài đặt các selector đó thành const hoặc thậm chí tốt hơn bằng cách cài đặt[ các trang tùy chỉnh Nighwatch cung cấp](http://nightwatchjs.org/guide#page-objects) Định nghĩa trước các phần tử trên trang để tương tác và đóng gói các hàm để thực hiện các hành động trên các trang đó một cách dễ ràng. Điều này cho phép bạn sử dụng Page Models trong test của mình, thay vì tương tác trực tiếp với element trên trình duyệt.

Khi bạn đã viết nhiều test hơn và bộ test của bạn to ra, bạn sẽ muốn tận dụng khả năng mở rộng của `Nightwatch` và tạo các custom commands, pages  và assertions  để mã test của bạn luôn sạch sẽ dễ bảo trì.

Đây là một trong những lý do nên sử dụng một framework như `Nightwatch` thay vì sử dụng `Web Driver API`.

# Kết luận
Test là rất khó, không có cách nào test dễ và nhanh cả. Và trong các loại test, các bài test End-to-end (E2E) là những thử thách lớn nhất. Không chỉ phụ thuộc chặt chẽ vào giao diện người dùng vì chúng rất mong manh dễ vỡ). Test cũng phụ thuộc rất nhiều vào các hành động trên màn hình, chuyển trang, hiệu ứng javascript css...

Các test này yêu cầu ứng dụng của bạn chạy trên môi trường thực (hoặc môi trường gần nhất có thể) và có trình duyệt thực (thường là cần test trên nhiều trình duyệt khác nhau), cài Web Driver cho trình duyệt đó và môi trường `Selenium`. Như vậy là một số lượng khá lớn các quy trình cài cắm, và tất cả đều cần phải hoạt động ngon lành để các test của bạn chạy ổn định!

Có nhiều cách bạn có thể viết các bài test E2E bằng giao thức `Web Driver`, trong đó chúng ta đã thấy một cách tiếp cận khá ổn đó là dùng kết hợp `Nightwatch` và `Selenium`.

Vì tôi có nhiều kinh nghiệmsử dụng 2 công cụ này nên tôi dễ dàng xử lý các bài test khó, còn bạn có thể thích sử dụng các công cụ khác. Cái này hoàn toàn tốt, vì các nguyên tắc là như nhau và chủ yếu là bạn tìm được sự cân bằng giữa viết code và tạo test/ duy trì test.

Test E2E là một thử thách thú vị nhưng hãy nhớ rằng bạn cũng càn tận dụng các bài test bạn đã làm với bài test đơn vị và tích hợp. Nghĩa là một số phần bạn nên giảm số lượng các bài test E2E nếu hệ thống đã được test Unit và integration Test trước đó OK. Làm thế thì dự án của bạn không bị quá dàn trải và nhiều khi tập trung test không đúng mức.

Lời người dịch: Loạt bài viết đến đây là kết thúc. Hi vọng các bạn đã có một cái nhìn trực quan sinh động và chuẩn xác hơn về công cụ Test Automation trong lập trình C# ASP.NET Core 2.0.

Bài này là một bài dịch, link bài gốc đây: http://www.dotnetcurry.com/aspnet-core/1433/end-to-end-testing-aspnet-core