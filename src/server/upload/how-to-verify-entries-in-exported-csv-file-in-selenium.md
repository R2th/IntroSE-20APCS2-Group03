Trong bài viết này, chúng ta sẽ xem xét để xác minh chức năng Xuất CSV. Chức năng xuất này đang xuất ra một bản tài liệu hoặc  tải xuống một bản tài liệu có số lượng các bản ghi hay  dữ liệu cần xác minh. Thông thường tài liệu được xuất sẽ ở dạng tệp csv. Bây giờ chúng ta sẽ đọc tệp csv với sự trợ giúp của Java FileReader và LineNumberReader

 Export button sẽ được đặt để xuất các bản ghi / dữ liệu sang hệ thống cục bộ từ ứng dụng. Nếu bạn quan sát hình ảnh bên dưới, bạn sẽ thấy các tùy chọn khác nhau để xuất dữ liệu có sẵn trong bảng.
 
 ![](https://images.viblo.asia/e1b2cb8b-f56a-4aa1-835b-102efb0ce51e.png)
 
 Chúng ta cần làm theo các bước dưới đây để xác minh chức năng xuất CSV
 
**Bước 1**: - Đầu tiên lấy số lượng mục mà bảng có.

**Bước 2**: - Nhấp vào nút Xuất (CSV trong trường hợp ví dụ bên dưới).

**Bước 3**: - Tải tài liệu xuống một thư mục cụ thể hoặc thư mục tải xuống mặc định.

**Bước 4**: - Đọc tệp csv và nhận số lượng mục trong Csv (Cần loại trừ tiêu đề khi so sánh các mục)

**Bước 5**: - So sánh các mục trong bảng và số lượng mục trong tệp csv.

Hãy nhìn ví dụ dưới đây:

```
package com.pack;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class ExportExample {
	
WebDriver driver;
	
	private static String downloadPath = "D:\\seleniumdownloads";
	private String URL="appURL"; 
	
	@BeforeClass
	public void testSetup() throws Exception{
		driver = new FirefoxDriver(firefoxProfile());	
		driver.manage().window().maximize();
	}
	
	public static FirefoxProfile firefoxProfile() throws Exception {
		FirefoxProfile firefoxProfile = new FirefoxProfile();
		firefoxProfile.setPreference("browser.download.folderList",2);
		firefoxProfile.setPreference("browser.download.manager.showWhenStarting",false);
		firefoxProfile.setPreference("browser.download.dir",downloadPath);
		firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk",
"text/csv,application/x-msexcel,application/excel,application/x-excel,application/vnd.ms-excel,image/png,image/jpeg,text/html,text/plain,application/msword,application/xml");
		
		return firefoxProfile;
	}
	
	@Test
	public void testExportAllRecords() throws InterruptedException {
		driver.get(URL);
		int noOfEntries = getNumberOfEntries();
		System.out.println("Total number of entries are :- "+noOfEntries);

		WebElement elementCSV = driver.findElement(By.xpath(".//*[@id='ToolTables_example_1']/span[contains(text(),'CSV')]"));
		elementCSV.click();

		File file = getLatestFilefromDir(downloadPath);
		String csvFileName = file.getName();
		System.out.println("CSV File Downloaded is :- "+csvFileName);

		System.out.println("Verifying number of entries with number of entries in csv");
		Assert.assertEquals(noOfEntries, getRecordsCountInCSV(downloadPath,csvFileName));
	}
```

Phương pháp dưới đây được sử dụng để có được số lượng mục trong bảng như trong hình trên.

```
public int getNumberOfEntries() {
		
		String entriesTxt = driver.findElement(By.id("example_info")).getText().trim();
		String[] aEntriesText = entriesTxt.split(" ");
		String totalEntriesText = aEntriesText[aEntriesText.length-2];
		return Integer.parseInt(totalEntriesText);
	}
```

Dưới đây là method để đọc tệp CSV và nhận số lượng mục có trong tệp csv đã xuất. Nó lấy tên tệp làm tham số

```
	public int getRecordsCountInCSV(String downloadPath, String csvFileName) {
		int lineNumberCount = 0;
		try {
			if (!csvFileName.isEmpty() || csvFileName != null) {
				String filePath =	downloadPath + System.getProperty("file.separator") + csvFileName;
				System.out.println(filePath);
				File file = new File(filePath);
				if (file.exists()) {
					System.out.println("File found :" +csvFileName);
					FileReader fr = new FileReader(file);
					LineNumberReader linenumberreader = new LineNumberReader(fr);
					while (linenumberreader.readLine() != null) {
						lineNumberCount++;
					}
					//To remove the header
					lineNumberCount=lineNumberCount-1;
					System.out.println("Total number of lines found in csv : " + (lineNumberCount));
					linenumberreader.close();
				} else {
					System.out.println("File does not exists");
				}
			}
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		
		return lineNumberCount;
	}
```

Method dưới đây được sử dụng để có được tập tin mới nhất từ  thư mục. Nó lấy đường dẫn thư mục làm tham số và trả về tệp được thêm gần đây vào thư mục.

```
	private File getLatestFilefromDir(String dirPath){
	    File dir = new File(dirPath);
	    File[] files = dir.listFiles();
	    if (files == null || files.length == 0) {
	        return null;
	    }
	
	    File lastModifiedFile = files[0];
	    for (int i = 1; i < files.length; i++) {
	       if (lastModifiedFile.lastModified() < files[i].lastModified()) {
	           lastModifiedFile = files[i];
	       }
	    }
	    return lastModifiedFile;
	}
}
```

Hy vọng bài này sẽ giúp ích cho các bạn !

link tham khảo: 
https://www.seleniumeasy.com/selenium-tutorials/verify-entries-in-exported-csv-file-using-webdriver-java