Chào các bạn hôm nay mình sẽ giới thiệu đến các bạn một Framwork quen thuộc khi làm việc với SeleniumWebdriver : Data Driven Framwork. Do mình vừa tìm hiểu vừa viết bài này nên có gì sai sót mong các bạn hãy comment để góp ý thêm cho mình :D
Nội dung của bài gồm
1. Data Driven Testing là gì
2. Tại sao lại sử dụng Data Driven Testing
3. Như nào để tạo một Data Driven Automation Framework
4. Ưu  điểm của Data- Driven testing 
5. Nhược điểm của Data - Driven testing
6. Một vài ví dụ về Data Driven testing

## 1. Data Driven Testing là gì?
Data-driven là một framework của kiểm thử tự động nơi mà lưu trữ dữ liệu trong một bảng hoặc các bảng tính.Các kiểm thử viên chỉ việc viết một kịch bản kiểm thử nhưng vẫn có thể chạy trên các bộ dữ liệu test khác nhau.Trong framework này các dữ liệu được lấy vào từ f nhiều ile lưu trữ( có thể là file XLSX, XML, CSV, database) và được lưu lại tại các biến của kịch bản test.
![](https://images.viblo.asia/3f9f5a20-96f4-4f7c-bd5d-80b24e03e80c.png)https://images.viblo.asia/3f9f5a20-96f4-4f7c-bd5d-80b24e03e80c.png
## 2. Tại sao lại sử dụng Data Driven Testing ?
Khi bạn cần kiểm tra một kịch bản với hàng trăm bộ test dữ liệu bạn sẽ có 3 cách tiếp cận khác nhau
1. Tạo 100 trăm kịch bản cho 100 trăm bộ test data và chạy mỗi bộ 1 lần
2. Tạo một kịch bản test và với mỗi bản data lại test 1 lần
3.  Tạo một kịch bản test và gôm tất cả các dữ liệu thành 1 file và chỉ chạy 1 lần tất cả các dữ liệu trong file lưu trữ
Cách thứ 3 chính là cách tiếp cận của Data- Driven framework để giảm thiểu thời gian và các công việc của kiểm thử viên phải làm 
## 3. Cách tạo một Data Driven Automation Framwork
1. Dowload Apache POI (https://poi.apache.org/download.html)
2. Tích hợp Apache POI vào eclipse (https://www.softwaretestingmaterial.com/handling-excel-files-using-apache-poi/)
3. Viết kịch bản test
4. Đọc dữ liệu từ file lưu trữ 
5. Viết dữ liệu ra file lưu trữ (nếu cần)
```
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class Driver {
	private XSSFWorkbook workbook;
	private XSSFSheet sheet;
	private XSSFCell cell;
	private WebDriver driver;
	private String url = "https://www.facebook.com/";

	@BeforeTest
	public void TestSetup() {
		System.setProperty("webdriver.gecko.driver",
				"C:\\\\Users\\\\linhntd\\\\Downloads\\\\geckodriver-v0.20.1-win64\\\\geckodriver.exe");
		driver = new FirefoxDriver();
		driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
		driver.get(url);
		System.out.println("Linh");
	}

	@Test
	public void Read() {
		// Import file excel
		File src = new File("D:\\2018_STUDY\\test.xlsx");
		FileInputStream fis;
		try {
			fis = new FileInputStream(src);
			workbook = new XSSFWorkbook(fis);
			sheet = workbook.getSheet("Sheet1");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			/*
			 * I have added test data in the cell A2 as "testemailone@test.com" and B2 as
			 * "password" Cell A2 = row 1 and column 0. It reads first row as 0, second row
			 * as 1 and so on and first column (A) as 0 and second column (B) as 1 and so on
			 */

			// Import data for Email.
			cell = sheet.getRow(i).getCell(0);
			cell.setCellType(Cell.CELL_TYPE_STRING);
			driver.findElement(By.xpath("//input[@id='email']")).clear();
			driver.findElement(By.xpath("//input[@id='email']")).sendKeys(cell.getStringCellValue());

			// Import data for password.
			cell = sheet.getRow(i).getCell(1);
			cell.setCellType(Cell.CELL_TYPE_STRING);
			driver.findElement(By.id("pass")).clear();
			driver.findElement(By.id("pass")).sendKeys(cell.getStringCellValue());
			// To click on Login button
			driver.findElement(By.xpath("//input[@id='u_0_2']")).click();
			// To write data in the excel
			FileOutputStream fos = null;
			try {
				fos = new FileOutputStream(src);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// Message to be written in the excel sheet
			String message = "Pass";
			// Create cell where data needs to be written.
			sheet.getRow(i).createCell(2).setCellValue(message);

			// finally write content
			try {
				workbook.write(fos);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// To click on Account settings dropdown
			// driver.findElement(By.xpath("//div[text()='Account Settings']")).click();
			// To click on logout button
			// driver.findElement(By.xpath("//text()[.='Log
			// Out']/ancestor::span[1]")).click();
			// close the file
			try {
				fos.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		// Load he workbook.

		// Load the sheet in which data is stored.

	}
}

```
## 4. Ưu điểm của Data- Driven testing
1. Cho phép kịch bản test có thể làm việc được với nhiều bộ dữ liệu test trong quá trình test hồi quy
2. Tập các bộ kiểm thử được gộp thành một và nó được tách biệt với mã kiểm thử
3. Thay đổi ở kịch bản kiểm thử không ảnh hưởng gì đến bộ test dữ liệu và ngược lại
## 5. Nhược điểm của Data- Driven testing
1. Chất lượng của quá trình test phụ thuộc vào kỹ năng test tự tộng và thực hiện của team
2. Sẽ mất một khoảng thời gian dài để đọc và tìm kiếm nếu bộ test dữ liệu có kích thước lớn