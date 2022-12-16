Bạn cần đọc, ghi file CSV một cách nhanh chóng, hiệu quả trong dự án Java? Vậy bạn hãy sử dụng thư viện mới Apache Commons CSV, đảm bảo bạn sẽ hài lòng.
Apache Commons CSV là thư viện dùng cho Java để đọc, ghi file CSV một cách nhanh chóng, dễ dàng, và hiệu quả. Tất nhiên, đây là thư viện open source và hoàn toàn miễn phí.

Trước tiên ta cần thêm gói thư viện này vào trong project của ta. Với maven project, ta chỉ việc khai báo **dependency** trong file `bom.xml` như sau.
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-csv</artifactId>
    <version>1.5</version>
</dependency>
```
Giờ chúng ta thực hành ghi file csv có thên **student.csv** trong chương trình của chúng ta và so sánh tính hiệu quả với cách ghi file csv trước đây.
```
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

public class BasicCsvWriter {

    public static void main(String[] args) {

            try {
                //Create new students objects
                Student student1 = new Student(1, "Ahmed", "Mohamed", "M", 25);
                Student student2 = new Student(2, "Sara", "Said", "F", 23);
                Student student3 = new Student(3, "Ali", "Hassan", "M", 24);
                Student student4 = new Student(4, "Sama", "Karim", "F", 20);
                Student student5 = new Student(5, "Khaled", "Mohamed", "M", 22);
                Student student6 = new Student(6, "Ghada", "Sarhan", "F", 21);

                //Create a new list of student objects
                List<Student> students = new ArrayList<>();
                students.add(student1);
                students.add(student2);
                students.add(student3);
                students.add(student4);
                students.add(student5);
                students.add(student6);

                //We have to create the CSVPrinter class object 
                Writer writer = Files.newBufferedWriter(Paths.get("student.csv"));
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("Id", "FirstName", "LastName", "Gender", "Age"));

                //Writing records in the generated CSV file
                for (Student student : students) {
                    csvPrinter.printRecord(student.getId(), student.getLastName(), student.getGender(), student.getAge());
                }

                //Writing records in the form of a list
                // csvPrinter.printRecord(Arrays.asList(7, "Dev", "Bhatia", "F", 20));
                
                csvPrinter.flush();

                System.out.println("Write csv file by using new Apache lib successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
Và sau đây là cách ghi file csv kiểu cũ mà ta vẫn dùng.
```
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author ashraf
 * 
 */
public class CsvFileWriter {
	
	//Delimiter used in CSV file
	private static final String COMMA_DELIMITER = ",";
	private static final String NEW_LINE_SEPARATOR = "\n";
	
	//CSV file header
	private static final String FILE_HEADER = "id,firstName,lastName,gender,age";

	public static void writeCsvFile(String fileName) {
		
		//Create new students objects				
		//Create a new list of student objects
               // --- Same above example.
		
		FileWriter fileWriter = null;
				
		try {
			fileWriter = new FileWriter(fileName);

			//Write the CSV file header
			fileWriter.append(FILE_HEADER.toString());
			
			//Add a new line separator after the header
			fileWriter.append(NEW_LINE_SEPARATOR);
			
			//Write a new student object list to the CSV file
			for (Student student : students) {
				fileWriter.append(String.valueOf(student.getId()));
				fileWriter.append(COMMA_DELIMITER);
				fileWriter.append(student.getFirstName());
				fileWriter.append(COMMA_DELIMITER);
				fileWriter.append(student.getLastName());
				fileWriter.append(COMMA_DELIMITER);
				fileWriter.append(student.getGender());
				fileWriter.append(COMMA_DELIMITER);
				fileWriter.append(String.valueOf(student.getAge()));
				fileWriter.append(NEW_LINE_SEPARATOR);
			}
			System.out.println("CSV file was created successfully !!!");			
		} catch (Exception e) {
			System.out.println("Error in CsvFileWriter !!!");
			e.printStackTrace();
		} finally {
			try {
				fileWriter.flush();
				fileWriter.close();
			} catch (IOException e) {
				System.out.println("Error while flushing/closing fileWriter !!!");
                e.printStackTrace();
			}
		}
	}
}
```
Kết quả của cả hai phương pháp là giống nhau nhưng, chỉ nhìn qua thôi thì ta đã thấy phương pháp mới đơn giản (source code ngăn gọn) hơn và hiệu quả hơn phương pháp cũ.
```
Id,FirstName,LastName,Gender,Age
1,Mohamed,M,25
2,Said,F,23
3,Hassan,M,24
4,Karim,F,20
5,Mohamed,M,22
6,Sarhan,F,21
```
Sau đây ta thực hành đọc file csv bằng phương cách sử dụng thư viện mới của Apache, ta cũng thu được kết quả rất tốt là đơn giản, hiệu quả.
```
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

public class BasicCsvReader {

    public static void main(String[] args) throws IOException {

        BufferedReader reader = Files.newBufferedReader(Paths.get("student.csv"));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("Id", "FirstName", "LastName", "Gender", "Age").withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            // Accessing Values by Column Index
            String id = csvRecord.get(0);
            String firstName = csvRecord.get(1);
            String lastName = csvRecord.get(2);
            String gender = csvRecord.get(3);
            String age = csvRecord.get(4);

            //Accessing the values by column header name
            String fees = csvRecord.get("fees");

            //Printing the record 
            System.out.println("Record Number - " + csvRecord.getRecordNumber());
            System.out.println("Id : " + id);
            System.out.println("First name : " + firstName);
            System.out.println("Last name : " + lastName);
            System.out.println("Gender : " + gender);
            System.out.println("Age : " + age);
            System.out.println("\n\n");
        }
    }
}
```
Trên đây mình giới thiệu thư viện mới của Apache hỗ trợ việc đọc, ghi file csv một cách nhanh chóng và đơn giản. Hi vọng các bạn sẽ happy coding với thư viện mới này.

**Tài liệu tham khảo**
* [Dzone- Aphace commons CSV](https://dzone.com/articles/working-with-csv-files-in-java-using-apache-common)