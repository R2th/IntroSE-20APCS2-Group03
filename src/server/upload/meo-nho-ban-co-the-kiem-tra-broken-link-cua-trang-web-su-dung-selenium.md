Mỗi trang web khi được release ra thị trường cần phải đảm bảo mọi đường link trong trang web phải hoạt động đúng. Giả sử một ngày đẹp trời, khi người dùng click vào đường link nào đó trong trang web của bạn, nhưng nó lại trả về cho người sử dụng lỗi 404 Page Not Found. Chắc hẳn điều này sẽ gây khó chịu cho người dùng. Vì vậy đối với một tester, việc kiểm thử đảm bảo rằng mọi đường link trong sản phẩm đều phải hoạt động là điều rất cần thiết và rất quan trọng.

Tuy nhiển đối với một tester, thì việc phải ngồi kiểm tra từng đường link trong trang web của mình để đảm bảo rằng mọi đường link trong sản phẩm đều phải hoạt động thì quả là cực hình bởi vì mỗi trang web nhiều khi có đến hằng trăm đường link. Chưa kể rằng, việc kiểm thử này sẽ rất gây nhàm chán cho người thực hiện, sẽ rất dễ khiến người kiểm thử chủ quan và đôi lúc sẽ miss bug ở mất một vài đường link.

Mình ví dụ khi bạn test cho một trang web về thời trang, và phải đảm bảo tất cả các link hình ảnh sản phẩm phải link đúng tới được phần detail của sản phẩm, vậy bạn phải test như thế nào? Sẽ ngồi và mở từng link bằng tay?

![](https://images.viblo.asia/b0f371be-61c4-4eaa-be5a-6b820f130df1.PNG)

Vì vậy ở bài này, mình xin phép được suggest cho các bạn một phương pháp để có thể kiểm tra được “broken link” một cách tự động bằng cách sử dụng Selenium.

Gồm 2 bước:
+ Tìm ra tất cả những link trong trang web
+ Kiểm tra xem link nào sẽ là “broken link”

Tất cả các link trong trang web thường sẽ bắt đầu bằng những thẻ HTML như `</ img>` hoặc thẻ `</ a>.` Và giá trị của link sẽ được nhúng vào thuộc tính href của những thẻ HTML trên.
Ví dụ: 
`<a href=”http://google.com.vn/”>Google Link</a>`

Vì vậy dựa vào đặc điểm trên, ở bước 1, chúng ta sẽ viết 1 đoạn scrip để có thể tìm được tất cả các link trong trang web

```
  public static List<WebElement> findAllLinks(WebDriver driver)
  {
     //Tạo ra một List element để chứa tất cả những đường link chúng ta kiếm được
	  List<WebElement> elementList = new ArrayList<WebElement>();
     
     //Tìm kiếm tất cả những link có tagName là thẻ </ a>
     elementList = driver.findElements(By.tagName("a"));

    //Tìm kiếm tất cả những link có tagName là thẻ </ img>
    elementList.addAll(driver.findElements(By.tagName("img")));

    //Sau khi tìm ra tất cả những link trong trang web thì chúng ta thực hiện lọc ra những link nào có thuộc tính href
    //Và tất cả những link có chứa thuộc tính href sẽ được add vào finalList :
	List<WebElement> finalList = new ArrayList<WebElement>();
	for (WebElement element : elementList) {
		if (element.getAttribute("href") != null) {
				finalList.add(element);
		}
	}
		return finalList;
  }
```

Bây giờ sẽ tới bước 2, đó là kiềm tra xem link nào còn hoạt động và link nào không còn hoạt động nữa. Ở bước này mình sẽ giới thiệu với các bạn một Class của Java, đó là `HttpURLConnection`. Class này giúp chúng ta tạo một HTTP requests đến web server. Ý tưởng ở đây sẽ là cho mỗi đường link được tự động request lên web server, và dựa vào kết quả trả về từ server để kiểm tra xem link còn hoạt động hay không.


```
public static String isLinkBroken(URL url) throws Exception
	{
        String response = "";
        
        //Tạo một connection đến web server với url là địa chỉ của trang web cần kiểm thử:
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		try
		{
        //Thực hiện gởi request của link lên web server và nhận kết quả trả về
		     connection.connect();
		     response = connection.getResponseMessage();	        
		     connection.disconnect();
		     return response;
		}

		catch(Exception exp)
		{
			return exp.getMessage();
		}
	}
```

Như ở trên ta đã tạo ra 2 method để thực hiện 2 bước ở trên, Bây giờ ta sẽ viết 1 đoạn script để thực hiện 2 method này nhé:


```
public static void main(String[] args) throws Exception {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\doan.ngoc.vu\\Desktop\\Workspace\\DemoCucumber\\driver\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("https://trunc88.com/");

		List<WebElement> allImages = findAllLinks(driver);
		System.out.println("Total number of elements found " + allImages.size());
 
        for( WebElement element : allLinks){
        try
            {
                System.out.println("URL: " + element.getAttribute("href")+ " returned " + isLinkBroken(new URL(element.getAttribute("href"))));
            }
 
        catch(Exception exp) 
             {
                 System.out.println("At " + element.getAttribute("href") + " Exception occured -&gt; " + exp.getMessage());      
             }
    }
}
```


Sau khi run thì chúng ta sẽ check kết quả của đoạn script trên trả về như sau:
![](https://images.viblo.asia/23682a64-112c-4e19-882a-685a6f4cbc71.PNG)

Toàn bộ link sẽ được kiểm tra và đảm bảo sẽ không có link nào bị lỗi cả:
![](https://images.viblo.asia/da08c8ff-b328-45a0-bbc1-844690546069.PNG)

Như ở trên mình đã giới thiệu các bạn cách để kiềm tra xem link nào còn hoạt động và link nào không còn hoạt động nữa trong trang web của bạn một cách tự động. Sẽ vẫn có rất nhiều phương pháp để thực hiện, và đây chỉ là một trong những cách thức đó.