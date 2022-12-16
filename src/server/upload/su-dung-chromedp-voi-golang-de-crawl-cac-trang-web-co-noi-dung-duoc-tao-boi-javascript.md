![](https://images.viblo.asia/f9ac899e-bb33-4e1c-8d7a-5acd1c9b1927.png)

### Giới thiệu
- Với sự phổ biến của các front-end framework như Vue và Angular cho ra đời các trang web thông qua javascript, việc thu thập dữ liệu các trang web không còn giống như trước chỉ cần gửi yêu cầu GET, phân tích cú pháp HTML. Đối với trang web có nội dung được tạo bởi javascript này, trình duyệt đầy đủ tính năng phải được sử dụng để thực thi tập lệnh javascript để có thể crawl được dữ liệu mong muốn
- Đối với các ngôn ngữ quen thuộc như Python, NodeJS chúng ta có những thư viện nổi tiếng sử dụng để crawl dữ liệu có nội dung được tạo bởi javascript như puppeteer (NodeJS) hay scrapy-splash (Python). Trong bài viết này mình sẽ giới thiệu tới mọi người một thư viện nghe còn khá xa lạ tới từ ngôn ngữ lập trình Golang để crawl được những trang web có nội dung được tạo bởi javascript đó là [chromedp](https://pkg.go.dev/github.com/chromedp/chromedp) (Chrome DevTools Protocol)

### Headless chrome và giao thức gỡ lỗi từ xa
- Headless chrome là một trình duyệt dòng lệnh không có GUI cho chrome. Mặc dù không có giao diện người dùng nhưng không có sự khác biệt về chức năng so với chrome mà chúng ta sử dụng hàng ngày. Bắt đầu từ [phiên bản 59 của Chrome](https://developer.chrome.com/blog/new-in-chrome-59/), headless browser (trình duyệt không có giao diện) đã được cài đặt tự động khi chrome được cài đặt
-  Headless browser là một dạng trình duyệt chrome không có giao diện, có thể chạy chương trình với tất cả các tính năng được chrome hỗ trợ mà không cần mở trình duyệt. Nó có thể hiển thị trang web mục tiêu giống như trong các trình duyệt hiện đại khác và có thể chụp ảnh màn hình của các trang web, lấy cookie, lấy html,...
    - Ở chế độ bình thường, một cửa sổ trình duyệt sẽ bật lên trên máy tính và bạn có thể thấy tác dụng của việc thực thi mã trên trình duyệt.
    - Ở chế độ không có giao diện chrome sẽ không bật lên cửa sổ trình duyệt, chế độ này là phiên bản dòng lệnh của trình duyệt chrome không có GUI, nhưng chức năng của nó không khác gì chrome mà chúng ta thường sử dụng.
- Nếu bạn chỉ muốn thu thập thông tin nội dung của trang web được tạo bởi javascript, bạn có thể sử dụng phương pháp này để lấy html hoàn chỉnh thông qua các tập lệnh shell hoặc bất kỳ ngôn ngữ lập trình nào khác, sau đó tiến hành phân tích. Nhưng nếu bạn muốn mô phỏng các thao tác của người dùng, chẳng hạn như gửi biểu mẫu, ảnh chụp màn hình,..., điều này không dễ dàng. Điều này yêu cầu chrome cung cấp giao thức tương tác từ xa, sau đó cho phép các ngôn ngữ lập trình giao tiếp thông qua giao thức con. Đây là giao thức gỡ lỗi từ xa (remote debugging protocol)
- May mắn thay, chúng ta không cần tìm hiểu nội dung cụ thể của giao thức. Golang có một thư viện của bên thứ ba cho phép vận hành chrome thông qua giao thức gỡ lỗi từ xa theo cách lập trình đơn giản hơn [chromedp](https://github.com/chromedp)

#### Chromedp là gì ?
- Chromedp là một cách để tương tác với giao thức chrome devtools mà không cần phụ thuộc bên ngoài (selenium cần cài đặt selenium webdriver firefox hoặc chrome). Tất cả những gì bạn cần trình duyệt chrome hoặc chromium (với ubuntu) hoặc firefox.
- Chrome Developer Tool (viết tắt là DevTools) là một bộ công cụ hỗ trợ gỡ lỗi web được tích hợp vào google chrome. DevTools cung cấp cho các nhà phát triển web quyền truy cập vào trình duyệt và ứng dụng web của họ. Sử dụng DevTools để chỉnh sửa HTML, CSS, JavaScript hiệu quả.

### Mục tiêu
- Vượt qua được bước đăng nhập của 2 trang web tìm kiếm việc làm hàng đầu Việt Nam đó là [vietnamworks](https://www.vietnamworks.com/) và [itviec](https://itviec.com/) bởi phần dữ liệu của lương chỉ hiển thị khi đã đăng nhập.

### Phân tích
- Đối với từng trang lại có yêu cầu đăng nhập không giống nhau, bây giờ mình sẽ phân tích từng yêu cầu cụ thể để có thể đăng nhập vào từng trang mục tiêu sẽ như thế nào nhé, bắt đầu thôi 
    - Với [itviec](https://itviec.com/sign_in) mọi người có thể thấy họ cho phép đăng nhập bằng 2 cách:
        - Cách 1: đăng nhập bằng tài khoản được tạo trên itviec và phải tích vào ô **I'm not a robot**
        - Cách 2: đăng nhập thông qua tài khoản google
        
![](https://images.viblo.asia/48f7e89f-ef06-45b8-881e-a7fe5e1b9ce9.png)

   - Với [vietnamwork](https://www.vietnamworks.com/tim-viec-lam/tat-ca-viec-lam) họ cho phép đăng nhập bằng 3 cách:
        - Cách 1: đăng nhập bằng tài khoản được tạo trên vietnamwork
        - Cách 2: đăng nhập thông qua tài khoản google
        - Cách 3: đăng nhập thông qua tài khoản facebook
        
![](https://images.viblo.asia/2365b6cb-6116-4dc2-894f-390e52511397.png)

- Nhận xét: 
cả 2 trang đều cho phép đăng nhập thông qua tài khoản bên ngoài (bằng google) và bằng tài khoản được tạo trên từng trang (với cách đăng nhập này thì đơn giản hơn) nhưng đối với **itviec** họ yêu cầu tích vào  ô **I'm not a robot** và thực hiện bài kiểm tra với captcha để chứng minh không phải bot. 

![](https://images.viblo.asia/dc1e054b-776e-4479-93be-60a1e8e8e5d1.png)

- Trong phạm vi bài viết này mình sẽ vượt qua bước đăng nhập của cả 2 trang bằng 2 cách:
     -  Đăng nhập bằng tài khoản được tạo trên từng trang, mình giả sử mọi người đã có sẵn tài khoản (đối với vietnamwork thôi còn itviec mình sẽ mô phỏng đến bước gặp captcha nhé)
     -  Đăng nhập thông qua tài khoản google

### Cài đặt
-  Cài đặt chromedp để mô phỏng hoạt động của trình duyệt
```
go get -u github.com/chromedp/chromedp
```
- Cài đặt goquery để phân tích html
```
go get github.com/PuerkitoBio/goquery
```

### Đăng nhập vào tài khoản google
- Có thể được thực hiện bằng việc nhấp vào nút đăng nhập vào tài khoản google trên từng trang riêng itviec, vietnamwork, để chung nhất thì mình sẽ đăng nhập trực tiếp qua link [accounts google.](https://accounts.google.com)

![](https://images.viblo.asia/6ecc2417-bb88-4213-a9b5-f38a613aeb45.png)

- Thứ tự sẽ là truy cập vào đường link https://accounts.google.com -> điền vào ô email hoặc số điện thoại (mình sẽ dùng email) -> nhấp nút tiếp theo -> điền vào ô mật khẩu -> nhấp nút tiếp theo là hoàn thành quá trình đăng nhập vào tài khoản google 
- Tạo 1 tệp có tên main.go và nhập thư viện cần thiết
```
package main

import (
	"context"

	"github.com/chromedp/chromedp"
)
```

- Tạo một hằng số googleSignin chung để lưu trữ url cơ sở của trang đăng nhập google
```
const (
	googleSignin = "https://accounts.google.com"
)
```

- Tạo hàm newChromedp để khởi tạo chromedp 

```
func newChromedp() (context.Context, context.CancelFunc) {
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", false),
        chromedp.Flag("start-fullscreen", true),
	)
	allocCtx, _ := chromedp.NewExecAllocator(context.Background(), opts...)
	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithLogf(log.Printf))

	return ctx, cancel
}
```

- ```chromedp.Flag``` để chromedp cài đặt các thông số cấu hình.
    - ```headless``` false là chế độ có giao diện (GUI) như trình duyệt thông thường sử dụng để dễ dàng gỡ lỗi và theo dõi quá trình bot thực thi nhiệm vụ. Mặc định là true.
    - ```start-fullscreen``` dùng để mở full màn hình trình duyệt

- Tiếp theo cùng mình phân tích các thành phần html trên trang đăng nhập của google nhé
    - Đầu tiên sử dụng phím F12 để xem nội dung trang web, mình lấy được xpath của ô email : ```//*[@id="identifierId"]```
    
    ![](https://images.viblo.asia/815c9d35-977b-4624-8065-b63688f4b2a1.png)
    
    - Lấy xpath của đối tượng nút tiếp theo:  ```//*[@id="identifierNext"]/div/button```
    
   ![](https://images.viblo.asia/e88d7fb4-e573-4d2c-a288-d388b9caf748.png)
    
    - Lấy xpath của ô mật khẩu:  ```//*[@id="password"]/div[1]/div/div[1]/input```
    
  ![](https://images.viblo.asia/51b627b0-3d64-4946-9aac-f98ef3e71447.png)
    
    - Cuối cùng là nút tiếp theo ```//*[@id='passwordNext']/div/button/span```
    
    ![](https://images.viblo.asia/8ec58f14-3560-450d-a10d-767219af6fbb.png)
    
- Mình tạo 1 hàm có tên là **googleTask** dùng để đăng nhập theo các bước bên trên
```
func googleTask(ctx context.Context) {
	email := "//*[@id='identifierId']"
	password := "//*[@id='password']/div[1]/div/div[1]/input"
	buttonEmailNext := "//*[@id='identifierNext']/div/button"
	buttonPasswordNext := "//*[@id='passwordNext']/div/button/span"

	task := chromedp.Tasks{
		chromedp.Navigate(googleSignin),
		chromedp.SendKeys(email, "email"),
		chromedp.Sleep(2 * time.Second),

		chromedp.Click(buttonEmailNext),
		chromedp.Sleep(2 * time.Second),

		chromedp.SendKeys(password, "pw"),
		chromedp.Sleep(2 * time.Second),

		chromedp.Click(buttonPasswordNext),
		chromedp.Sleep(2 * time.Second),
	}

	if err := chromedp.Run(ctx, task); err != nil {
		fmt.Println(err)
	}
}
```
- Bạn thay email và password vào trên nhé, giải thích một chút về đoạn code trên

    | Tên | Giải thích |
    | -------- | -------- 
    | Navigate     | Đi đến một trang     |
    | Click	     | Mô phỏng nhấp chuột     |
    | SendKeys	     | Nhận đầu vào và gửi đi    |
    | Sleep	     | Đặt thời gian chờ   |
    | Run	     | Chạy các hoạt động khác nhau   |
    | Tasks	     | Danh sách tuần tự các hành động có thể được sử dụng   |

- Mã hoàn chỉnh như sau
```
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/chromedp"
)

const (
	googleSignin = "https://accounts.google.com"
)

func newChromedp() (context.Context, context.CancelFunc) {
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", false),
        chromedp.Flag("start-fullscreen", true),
	)
	allocCtx, _ := chromedp.NewExecAllocator(context.Background(), opts...)
	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithLogf(log.Printf))

	// Login google
	googleTask(ctx)

	return ctx, cancel
}

func googleTask(ctx context.Context) {
	email := "//*[@id='identifierId']"
	password := "//*[@id='password']/div[1]/div/div[1]/input"
	buttonEmailNext := "//*[@id='identifierNext']/div/button"
	buttonPasswordNext := "//*[@id='passwordNext']/div/button/span"

	task := chromedp.Tasks{
		chromedp.Navigate(googleSignin),
		chromedp.SendKeys(email, "email"),
		chromedp.Sleep(2 * time.Second),

		chromedp.Click(buttonEmailNext),
		chromedp.Sleep(2 * time.Second),

		chromedp.SendKeys(password, "pw"),
		chromedp.Sleep(2 * time.Second),

		chromedp.Click(buttonPasswordNext),
		chromedp.Sleep(3 * time.Second),
	}

	if err := chromedp.Run(ctx, task); err != nil {
		fmt.Println(err)
	}
}

func main() {
	_, cancel := newChromedp()
	defer cancel()
}
```
- Bạn có thể điều chỉnh thời gian ngủ (sleep) giữa các hành động khác nhau hoặc không cần đặt, nhưng theo mình thì nên đặt để tránh thao tác quá nhanh không giống thao tác của con người dễ bị bot phát hiện và chặn.
-  ```defer cancel()``` có nhiệm vụ đóng trình duyệt sau khi thực hiện xong mọi hành động, để thuận tiện trong quá trình gỡ lỗi bạn có thể tạm không dùng đến nó. Gõ lệnh ```go run main.go```

![](https://images.viblo.asia/5ff6d49c-ebe6-4828-813f-1c9a9a025c50.gif)

-  Có vấn đề rồi, chương trình chỉ chạy qua bước điền email và ấn nút tiếp tục thì dừng vì google cảnh báo không cho đăng nhập vì trình duyệt/ứng dụng không an toàn, có thể google đã phát hiện ra chương trình này là 1 con bot tự động. Để chắc chắn mình sẽ mở console debug lên và kiểm tra, sử dụng đoạn mã ```window.navigator.webdriver```, kết quả trả về là true 😇

![](https://images.viblo.asia/c9d64ce0-f8ab-4ffc-a2b4-9d1753defef1.png)

- Để giải quyết vấn đề này, mình cần bổ sung thêm một số cờ (flag) cho chromedp như sau
    - enable-automation: tắt thông báo rằng trình duyệt được điều khiển bằng tự động hóa 
    - remote-debugging-port: cổng của công cụ chrome-debug 9222
    - disable-extensions: tắt phần mở rộng
- Bạn có thể tìm hiểu sâu hơn nguyên nhân tại sao tại đây nhé [issues 881 của chromedp](https://github.com/chromedp/chromedp/issues/881)
- Sau khi sửa lại thì đoạn mã hiện tại là
```
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/chromedp"
)

const (
	googleSignin = "https://accounts.google.com"
)

func newChromedp() (context.Context, context.CancelFunc) {
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", false),
        chromedp.Flag("start-fullscreen", true),
		chromedp.Flag("enable-automation", false),
		chromedp.Flag("disable-extensions", false),
		chromedp.Flag("remote-debugging-port", "9222"),
	)
	allocCtx, _ := chromedp.NewExecAllocator(context.Background(), opts...)
	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithLogf(log.Printf))

	// Login google
	googleTask(ctx)

	return ctx, cancel
}

func googleTask(ctx context.Context) {
	email := "//*[@id='identifierId']"
	password := "//*[@id='password']/div[1]/div/div[1]/input"
	buttonEmailNext := "//*[@id='identifierNext']/div/button"
	buttonPasswordNext := "//*[@id='passwordNext']/div/button/span"

	task := chromedp.Tasks{
		chromedp.Navigate(googleSignin),
		chromedp.SendKeys(email, "email"),
		chromedp.Sleep(2 * time.Second),

		chromedp.Click(buttonEmailNext),
		chromedp.Sleep(2 * time.Second),

		chromedp.SendKeys(password, "pw"),
		chromedp.Sleep(2 * time.Second),

		chromedp.Click(buttonPasswordNext),
		chromedp.Sleep(2 * time.Second),
	}

	if err := chromedp.Run(ctx, task); err != nil {
		fmt.Println(err)
	}
}

func main() {
	_, _ = newChromedp()
	// defer cancel()
}
```
- Chạy lại đoạn mã với ```go run main.go``` thì ta được kết quả như mong đợi ^^. Google đã được đăng nhập thành công

![](https://images.viblo.asia/96b9cd7f-2711-4f9a-b3e7-fb3e5389cad1.gif)

- Với đoạn mã ngắn bên trên là có thể đang nhập vào google thoải mái mà không bị bot của google phát hiện rồi, hiện nay rất nhiều tài khoản được đăng nhập qua bên thứ 3 là google, đoạn mã trên không chỉ dừng lại ở việc đăng nhập vào itviec, vietnamwork qua google mà có thể được sử dụng tại nhiều trang khác nữa ^^. Tuy nhiên sau khi đăng nhập thành công tài khoản google, với mỗi trang cụ thể lại có các bước khác nhau thì mới gọi là đăng nhập thành công vào trang đó, tiếp tục cùng mình tìm hiểu nhé

### Đăng nhập vào itviec
- Khi chưa đăng nhập, giao diện hiển thị sẽ không có thông tin của phần lương

![](https://images.viblo.asia/80ffa2a2-5319-4267-ae48-2988497c2abb.png)

- Sau khi đăng nhập vào tài khoản google, cần truy cập vào https://itviec.com/sign_in, itviec sẽ tự động chuyển sang trang chủ và hiển thị toàn bộ thông tin phần lương bị ẩn vì đã đăng nhập thành công
- Bổ sung thêm đoạn mã như sau:
```
const (
	itviecBasePath = "https://itviec.com"
	itviecSignin   = "/sign_in"
)

func itviecWithGoogleTask(ctx context.Context) {
	url := fmt.Sprintf("%s%s", itviecBasePath, itviecSignin)

	task := chromedp.Tasks{
		chromedp.Navigate(url),
		chromedp.Sleep(2 * time.Second),
	}

	if err := chromedp.Run(ctx, task); err != nil {
		fmt.Println(err)
	}
}
```

![](https://images.viblo.asia/9f368a0a-2b9e-4056-b789-7cfe6cfe4508.gif)


### Đăng nhập vào vietnamworks
- Cũng giống như itviec, khi chưa đăng nhập, giao diện hiển thị sẽ không có thông tin của phần lương

![](https://images.viblo.asia/8fe3b8cc-776b-4b4d-9971-d5fe998dd1dc.png)

- Sau khi đăng nhập vào tài khoản google, cần truy cập vào https://secure.vietnamworks.com/login/vi?client_id=3 -> click vào nút **với tài khoản google** vietnamworks sẽ tự động chuyển sang trang chủ và hiển thị toàn bộ thông tin phần lương bị ẩn vì đã đăng nhập thành công
- Mình sẽ lấy xpath của nút **với tài khoản google**: ```/html/body/div[2]/div[1]/div/div/a[2]```

![](https://images.viblo.asia/470adadb-1d0f-4fa2-a0e2-b7eb135565b5.png)

- Và thêm phần code mô phỏng thao tác đăng nhập vietnamworks
```
const (
	vnwBasePath = "https://secure.vietnamworks.com"
	vnwSignin   = "/login/vi?client_id=3"
)

func vietnamworksWithGoogleTask(ctx context.Context) {
	url := fmt.Sprintf("%s%s", vnwBasePath, vnwSignin)
	button := "/html/body/div[2]/div[1]/div/div/a[2]"

	task := chromedp.Tasks{
		chromedp.Navigate(url),
		chromedp.Sleep(2 * time.Second),

		chromedp.Click(button),
		chromedp.Sleep(2 * time.Second),

		chromedp.Navigate("https://www.vietnamworks.com/tim-viec-lam/tat-ca-viec-lam"),
		chromedp.Sleep(2 * time.Second),
	}

	if err := chromedp.Run(ctx, task); err != nil {
		fmt.Println(err)
	}
}
```
- Đây là kết quả

![](https://images.viblo.asia/3ac082f9-d7c4-4606-858c-eb905a2af9dd.gif)

### Đăng nhập bằng tài khoản thường 
- Đối với việc đăng nhập bằng tài khoản thường sẽ dễ hơn mình sẽ để lại làm bài tập cho các bạn thực hành nhé, các bạn chỉ cần sử dụng F12 để lấy xpath của các đối tượng, rồi xem thứ tự các bước đăng nhập ra sao rồi vận dụng vào code thôi (các bạn nhớ thực hành trước rồi mới xem lời giải nha vì code mình sẽ đẩy lên github ở cuối bài này ^^). Dưới đây là kết quả đăng nhập vào từng trang bằng tài khoản thường
#### Với ***itviec***

![](https://images.viblo.asia/f8744669-288b-48ad-a233-95ca75259183.gif)

#### Với ***vietnamworks***
- Do không cần tích vào ô **I'm not a robot** như itviec, tức là việc đăng nhập thông thường được thực hiện hoàn toàn trên trang vietnamworks không liên quan gì tới tài khoản google, vậy nên mình sẽ không cần dùng tới các cờ này nữa:
```
chromedp.Flag("enable-automation", false),
chromedp.Flag("disable-extensions", false),
chromedp.Flag("remote-debugging-port", "9222"),
```
- Kết quả là

![](https://images.viblo.asia/5ee9b0b9-aef1-44d2-8f99-afa7fa79e1b2.gif)

### Bóc dữ liệu được hiển thị sau khi đăng nhập
- Sau khi đăng nhập phần dữ liệu về lương đã hiển thị ra làm cho việc crawl trở nên dễ hơn bao giờ hết, mình sẽ thu thập dữ liệu về lương của 1 tin tuyển dụng với đường dẫn cụ thể để làm ví dụ là [java-developer](https://itviec.com/it-jobs/java-developer-mysql-spring-oracle-cj-olivenetworks-vina-co-ltd-0324) . Khi đã thu thập được 1 url các bạn hoàn toàn có thể thu thập với tất cả url trên trang itviec ^^.
- Mình thêm 1 hàm như sau 
```
func extractItviecTask(ctx context.Context) error {
	task := chromedp.Tasks{
		chromedp.Navigate("https://itviec.com/it-jobs/java-developer-mysql-spring-oracle-cj-olivenetworks-vina-co-ltd-0324"),
		chromedp.ActionFunc(func(ctx context.Context) error {
			node, err := dom.GetDocument().Do(ctx)
			if err != nil {
				return err
			}
			res, err := dom.GetOuterHTML().WithNodeID(node.NodeID).Do(ctx)
			if err != nil {
				return err
			}
			doc, err := goquery.NewDocumentFromReader(strings.NewReader(res))
			if err != nil {
				return err
			}

			doc.Find("div.job-details__overview div.svg-icon__text").Each(func(index int, info *goquery.Selection) {
				text := info.Text()
				fmt.Println(text)
			})

			return nil
		}),
	}

	if err := chromedp.Run(ctx, task); err != nil {
		fmt.Println(err)
	}
	return nil
}
```
- Đầu tiên là truy cập vào url cho trước với ```chromedp.Navigate```, rồi thực hiện các chức năng tùy chỉnh với ```chromedp.ActionFunc```, mình thêm vào 1 hàm để bóc tách dữ liệu liên quan đến phần lương sử dụng [goquery](https://github.com/PuerkitoBio/goquery) để tìm kiếm phần tử theo element như sau: ```div.job-details__overview div.svg-icon__text```

![](https://images.viblo.asia/e03382ff-e6c1-45e1-89b5-634d1ba7c75a.png)

- Chạy với mã hoàn chỉnh thu được kết quả là

![](https://images.viblo.asia/e1e04978-ae6d-4b5a-ae0c-c64fbe12c937.gif)

- Đây là kết quả thu được có thông tin của lương ^^!
```
500 - 2,000 USD
6 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC, District 1, Ho Chi Minh
See map
Floor 2, Rivera Park Saigon, No. 7/28 Thanh Thai, Ward 14, District 10, Ho Chi Minh
See map
13 hours ago
```

### Kết luận
- Như vậy mình đã giới thiệu cho các bạn cách để thu thập dữ liệu web được tạo bởi Javascript với 1 thư viện rất mới **chromedp**, hi vọng với bài viết này sẽ giúp ích cho các bạn có thêm môt lựa chọn trong việc crawl dữ liệu với những trang web có dữ liệu được tạo bởi javascript.
- Lưu ý với các bạn là bài viết của mình chỉ crawl được trong thời điểm mình viết bài ( đầu năm 2022), các bạn cần theo dõi cập nhập giao diện từ itviec, vietnamwork và google xem có thay đổi mã html không để chỉnh lại xpath cho phù hợp, tránh trường hợp mã html bị thay đổi dẫn tới sai xpath ko crawl được.
- Bạn có thể tham khảo [mã nguồn](https://github.com/dactoankmapydev/chromedp-example-login) trên github mình nếu thấy cần thiết.
- Các bạn có thể tìm đọc [series crawl](https://viblo.asia/s/cac-ky-thuat-thu-thap-du-lieu-crawler-tren-internet-7LKXN84elV4) của mình để tìm hiểu các cách crawl khác nhau nữa nhé.
- Cảm ơn các bạn đã đọc bài viết của mình, nếu có gì còn thiếu sót, góp ý, các bạn có thể bình luận bên dưới bài viết, mình sẽ cố gắng trả lời thắc mắc của các bạn. Chúc các bạn một  năm mới nhiều sức khỏe, niềm vui và hạnh phúc ^^.

### Tham khảo
- [golang-chromedp-goquery-simple-crawling-dynamic-data](https://developpaper.com/golang-chromedp-goquery-simple-crawling-dynamic-data/)
- [chromedp-learning](https://gitee.com/avtion/chromedp-learning)
- [chromedp-examples](https://github.com/chromedp/examples)
- [blog-fireheart](https://blog.fireheart.in/a?ID=01700-933fe190-8cf5-48b3-8a7c-bf4f5c763e3f)