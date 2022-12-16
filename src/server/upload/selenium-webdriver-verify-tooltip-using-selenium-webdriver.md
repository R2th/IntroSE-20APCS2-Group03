Xin chào các bạn.

Dạo này mình đang viết test checklist cho một project về website quản lý các đầu sách, mình nhận thấy mỗi screen đều xuất hiện rất nhiều tooltip trên website này (Nếu chưa biết tooltip là gì thì các bạn search keyword này sẽ biết ngay nhé :v ).

Vì là trang quản lý sách nên sẽ có tên sách phải không nào? Nhưng tên thì có 5, 6 loại tên dài ngắn khác nhau. Bởi vậy tooltip xuất hiện như một "công cụ" đắc lực mà khi user chỉ cần hover chuột vào là hoàn toàn có thể xem hết được tên của cuốn sách đó thay vì chỉ hiển thị dấu "..." trên màn hình. Rồi đôi khi các bạn còn bắt gặp nhưng biểu tượng mà các bạn chưa hiểu chức năng của nó, bởi thế tooltip sẽ hỗ trợ bạn nó sẽ chú thích cho bạn biết chức năng của từng phần tử mà bạn muốn thao tác. Cả những website có 3,4 cái image vậy thì bạn không biết phân biệt cái nào là Logo của web, nhưng chỉ cần hover chuột để xem tooltip thì bạn sẽ biết ngay ^^.

Vậy thì việc hiển thị đúng sai của tooltip là một điều rất quan trọng đúng không? Thế nên hôm nay mình sẽ hướng dẫn các bạn test hiển thị của tooltip xem có chuẩn như requirement không nhé. 

Nhưng trước khi đi vào phần này các bạn phải chuẩn bị một chút kiến thức về Xpath. 
Trong khi thực hiện test tự động, không phải lúc nào các bạn cũng tìm được phần tử bằng id, class, name,...Vậy nên muốn tìm được phần tử đó thì sự lựa chọn cuối cùng chính là dùng cú pháp của Xpath. Đây là lựa chọn tối ưu nhất nhưng khó nhất nên mình chưa trình bày với các bạn ở những bài đầu.

Vậy Xpath là gì? XPath được định nghĩa là đường dẫn XML. Đó là một cú pháp hoặc ngôn ngữ để tìm kiếm bất kỳ phần tử nào trên trang web bằng cách sử dụng biểu thức đường dẫn XML. Cú pháp cơ bản của Xpath là 
![](https://images.viblo.asia/48b7c2fa-d74c-427e-8815-9690f0204451.png)
Trong đó:
* // : Chọn ở phần tử hiện tại
* Tagname: Tagname của phần tử cụ thể.
* @: Chọn thuộc tính.
* Attribute: Tên thuộc tính của phần tử.
* Value: Giá trị của thuộc tính.

Các bạn tham khảo thêm ở link này https://www.swtestacademy.com/xpath-selenium/ để biết có mấy loại Xpath và cách thức hoạt động của nó có gì giống và khác nhau.

Trang web mình demo là: https://chrome.google.com/webstore/detail/firebug-lite-for-google-c/ehemiojjcpldeipjhjkepfdaohajpbdo

Thuật toán kiểm tra tooltip không khó, chỉ là 1 vòng if else là có thể giải quyết được. Vậy nếu cần kiểm tra nhiều tooltip thì test auto quả thực giảm thiểu rất nhiều thời gian đó :v.

Source code

```
package demoo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.*;

public class Tooltip {
	public static void main(String[] args) {

		String baseUrl = "https://chrome.google.com/webstore/detail/firebug-lite-for-google-c/ehemiojjcpldeipjhjkepfdaohajpbdo";
		System.setProperty("webdriver.chrome.driver", "D:\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get(baseUrl);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		// Khai báo một tooltip mong muốn là "19,235 usersghgh"
		String expectedTooltip = "19,235 usersghgh";

		// Trỏ đến phần tử cần kiểm tra tooltip bằng xpath
		WebElement github = driver.findElement(By.xpath("//*[@class='e-f-ih']"));

		// Lấy ra tootip thực tế của phần tử đó
		String actualTooltip = github.getAttribute("title");

		// In ra tooltip thực tế đó
		System.out.println("Actual Title of Tool Tip" + actualTooltip);
		// So sánh tooltip thực tế mà tooltip mong đợi
		if (actualTooltip.equals(expectedTooltip)) {
			// Nếu giống nhau thì in ra Test Case Passed
            //Case1
			System.out.println("Test Case Passed");
		} else {
			// Không giống nhau thì in ra Test Case Failed
            // Case2 
			System.out.println("Test Case Failed");
		}
		driver.close();
	}

}

```

Mình đã comment trong code rồi, nhưng nếu các bạn còn bị mắc chỗ nào thì ping mình nha.

Link video demo của mình: https://www.youtube.com/watch?v=bQ_yWexmmF0&feature=youtu.be

Link tham khảo https://www.guru99.com/selenium-tutorial.html

Hehe nhớ upvote cho bài viết của mình và theo dõi các bài viết tiếp theo nhé :-D