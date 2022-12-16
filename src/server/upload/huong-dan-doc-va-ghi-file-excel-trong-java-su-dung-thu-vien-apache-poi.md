Excel là định dạng file rất phổ biến được tạo ra bởi Microsoft. Thông thường, các ứng dụng Java sử dụng thư viện Apache POI để đọc và ghi tập tin Excel. Trong bài này, tôi sẽ hướng dẫn cách để đọc và ghi các tập tin Excel sử dụng API của thư viện Apache POI.

![](https://images.viblo.asia/d5f2855b-ac5d-4e41-b768-3a2204dc1131.png)

## Giới thiệu về Apache POI?

Apache POI là một thư viện mã nguồn mở Java, được cung cấp bởi Apache. Thư viện này cung cấp các API (phương thức) làm việc với các tài liệu của Microsoft như Word, Excel, Power point, Visio,…

Các class của Apache POI thường có tiếp đầu ngữ HSSF, XSSF, HPSF, … Nhìn vào tiếp đầu ngữ của một class bạn có thể biết được class đó hỗ trợ loại định dạng nào.

* HSSF (Horrible SpreadSheet Format):	Đọc và ghi file định dạng Microsoft Excel (XLS – định dạng hỗ trợ của Excel 2003).
* XSSF (XML SpreadSheet Format):	Đọc và ghi định dạng file Open Office XML (XLSX – định dạng hỗ trợ của Excel 2007 trở lên).
* SXSSF (Streaming version of XSSFWorkbook)	: SXSSF là một phần mở rộng API của XSSF, được sử dụng khi xuất các file excel lớn và có bộ nhớ heap sapce hạn chế.

## Tổng quan Apache POI Excel

Microsoft Excel hiện tại có 2 phần mở rộng:

* .xls: tương ứng với phiên bản Microsoft Excel 2003 trở về trước. Định dạng này được Apache POI hỗ trợ bởi các lớp java với tiếp đầu ngữ là HSSF.
* .xlsx: tương ứng với phiên bản Microsoft Excel 2007 trở về sau. Định dạng này được Apache POI hỗ trợ bởi các lớp java với tiếp đầu ngữ là XSSF, SXSSF.

Một số khái niệm cơ bản của Apache API:

![](https://images.viblo.asia/29a36f1b-b419-47f9-932b-7bb1877d193d.png)

Apache POI cung cấp cho bạn các interface Workbook, Sheet, Row, Cell,… và các class thể hiện (implementation) tương ứng:

* Workbook: đại diện cho một file Excel. Nó được triển khai dưới hai class là: HSSFWorkbook và XSSFWorkbook tương ứng cho định dạng .xls và .xlsx .
* Sheet: đại diện cho một bảng tính Excel (một file Excel có thể có nhiều Sheet). Nó có 2 class là HSSFSheet và XSSFSheet.
* Row: đại diện cho một hàng trong một bảng tính (Sheet). Nó có 2 class là HSSFRow và XSSFRow.
* Cell: đại diện cho một ô trong một hàng (Row). Tương tự nó cũng có 2 class là HSSFCell and XSSFCell.

## Khai báo thư viện Apache POI

Tạo [Maven project](https://gpcoder.com/2916-huong-dan-su-dung-apache-maven-voi-eclipse/) và khai báo thư viện trong file pom.xml của project như sau:

```
<!-- Excel 2003 (.xls) -->
<!-- https://mvnrepository.com/artifact/org.apache.poi/poi -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>3.17</version>
</dependency>
 
<!-- Excel 2007 (.xlsx) -->
<!-- https://mvnrepository.com/artifact/org.apache.poi/poi-ooxml -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>3.17</version>
</dependency>
```

Lưu ý: Các phiên bản cũ của Apache POI chỉ hỗ trợ các định dạng file binary như doc, xls, ppt, … .Từ phiên bản 3.5 trở đi, POI hỗ trợ các định dạng file OOXML của MS-Office như docx, xlsx, pptx, …

## Ví dụ đọc và ghi file Excel

Microsoft Office các phiên bản trước đây (97-2003) các file excel có định dạng .xls và các phiên bản mới hơn (2007 trở về sau) thường sử dụng định dạng .xlsx. Để thao tác với các file .xls cần sử dụng các class có tiếp đầu ngữ HSSF. Còn đối với các file định dạng .xlsx cần sử dụng các class có tiếp đầu ngữ XSSF.

### Ví dụ ghi file excel (.xls, .xlsx)

Book.java

```
package com.gpcoder.apachepoi;
 
public class Book {
    private Integer id;
    private String title;
    private Integer quantity;
    private Double price;
    private Double totalMoney;
}
```

WriteExcelExample.java

```
package com.gpcoder.apachepoi;
 
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
 
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.BuiltinFormats;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
 
public class WriteExcelExample {
    public static final int COLUMN_INDEX_ID         = 0;
    public static final int COLUMN_INDEX_TITLE      = 1;
    public static final int COLUMN_INDEX_PRICE      = 2;
    public static final int COLUMN_INDEX_QUANTITY   = 3;
    public static final int COLUMN_INDEX_TOTAL      = 4;
    private static CellStyle cellStyleFormatNumber = null;
     
    public static void main(String[] args) throws IOException {
        final List<Book> books = getBooks();
        final String excelFilePath = "C:/demo/books.xlsx";
        writeExcel(books, excelFilePath);
    }
 
    public static void writeExcel(List<Book> books, String excelFilePath) throws IOException {
        // Create Workbook
        Workbook workbook = getWorkbook(excelFilePath);
 
        // Create sheet
        Sheet sheet = workbook.createSheet("Books"); // Create sheet with sheet name
 
        int rowIndex = 0;
         
        // Write header
        writeHeader(sheet, rowIndex);
 
        // Write data
        rowIndex++;
        for (Book book : books) {
            // Create row
            Row row = sheet.createRow(rowIndex);
            // Write data on row
            writeBook(book, row);
            rowIndex++;
        }
         
        // Write footer
        writeFooter(sheet, rowIndex);
 
        // Auto resize column witdth
        int numberOfColumn = sheet.getRow(0).getPhysicalNumberOfCells();
        autosizeColumn(sheet, numberOfColumn);
 
        // Create file excel
        createOutputFile(workbook, excelFilePath);
        System.out.println("Done!!!");
    }
 
    // Create dummy data
    private static List<Book> getBooks() {
        List<Book> listBook = new ArrayList<>();
        Book book;
        for (int i = 1; i <= 5; i++) {
            book = new Book(i, "Book " + i, i * 2, i * 1000);
            listBook.add(book);
        }
        return listBook;
    }
 
    // Create workbook
    private static Workbook getWorkbook(String excelFilePath) throws IOException {
        Workbook workbook = null;
 
        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook();
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook();
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }
 
        return workbook;
    }
 
    // Write header with format
    private static void writeHeader(Sheet sheet, int rowIndex) {
        // create CellStyle
        CellStyle cellStyle = createStyleForHeader(sheet);
         
        // Create row
        Row row = sheet.createRow(rowIndex);
         
        // Create cells
        Cell cell = row.createCell(COLUMN_INDEX_ID);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Id");
 
        cell = row.createCell(COLUMN_INDEX_TITLE);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Title");
 
        cell = row.createCell(COLUMN_INDEX_PRICE);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Price");
 
        cell = row.createCell(COLUMN_INDEX_QUANTITY);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Quantity");
 
        cell = row.createCell(COLUMN_INDEX_TOTAL);
        cell.setCellStyle(cellStyle);
        cell.setCellValue("Total money");
    }
 
    // Write data
    private static void writeBook(Book book, Row row) {
        if (cellStyleFormatNumber == null) {
            // Format number
            short format = (short)BuiltinFormats.getBuiltinFormat("#,##0");
            // DataFormat df = workbook.createDataFormat();
            // short format = df.getFormat("#,##0");
             
            //Create CellStyle
            Workbook workbook = row.getSheet().getWorkbook();
            cellStyleFormatNumber = workbook.createCellStyle();
            cellStyleFormatNumber.setDataFormat(format);
        }
         
        Cell cell = row.createCell(COLUMN_INDEX_ID);
        cell.setCellValue(book.getId());
 
        cell = row.createCell(COLUMN_INDEX_TITLE);
        cell.setCellValue(book.getTitle());
 
        cell = row.createCell(COLUMN_INDEX_PRICE);
        cell.setCellValue(book.getPrice());
        cell.setCellStyle(cellStyleFormatNumber);
 
        cell = row.createCell(COLUMN_INDEX_QUANTITY);
        cell.setCellValue(book.getQuantity());
         
        // Create cell formula
        // totalMoney = price * quantity
        cell = row.createCell(COLUMN_INDEX_TOTAL, CellType.FORMULA);
        cell.setCellStyle(cellStyleFormatNumber);
        int currentRow = row.getRowNum() + 1;
        String columnPrice = CellReference.convertNumToColString(COLUMN_INDEX_PRICE);
        String columnQuantity = CellReference.convertNumToColString(COLUMN_INDEX_QUANTITY);
        cell.setCellFormula(columnPrice + currentRow + "*" + columnQuantity + currentRow);
    }
 
    // Create CellStyle for header
    private static CellStyle createStyleForHeader(Sheet sheet) {
        // Create font
        Font font = sheet.getWorkbook().createFont();
        font.setFontName("Times New Roman"); 
        font.setBold(true);
        font.setFontHeightInPoints((short) 14); // font size
        font.setColor(IndexedColors.WHITE.getIndex()); // text color
 
        // Create CellStyle
        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        cellStyle.setFont(font);
        cellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        return cellStyle;
    }
     
    // Write footer
    private static void writeFooter(Sheet sheet, int rowIndex) {
        // Create row
        Row row = sheet.createRow(rowIndex);
        Cell cell = row.createCell(COLUMN_INDEX_TOTAL, CellType.FORMULA);
        cell.setCellFormula("SUM(E2:E6)");
    }
     
    // Auto resize column width
    private static void autosizeColumn(Sheet sheet, int lastColumn) {
        for (int columnIndex = 0; columnIndex < lastColumn; columnIndex++) {
            sheet.autoSizeColumn(columnIndex);
        }
    }
     
    // Create output file
    private static void createOutputFile(Workbook workbook, String excelFilePath) throws IOException {
        try (OutputStream os = new FileOutputStream(excelFilePath)) {
            workbook.write(os);
        }
    }
 
}
```

Thực thi chương trình trên, một file books.xlsx được tạo ra trong thư mục C:/demo như sau:

![](https://images.viblo.asia/ba8f29ea-0c4a-42ac-a378-01a8f73bf39c.png)

### Ví dụ đọc file excel (.xls, .xlsx)

```
package com.gpcoder.apachepoi;
 
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
 
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
 
public class ReadExcelExample {
    public static final int COLUMN_INDEX_ID = 0;
    public static final int COLUMN_INDEX_TITLE = 1;
    public static final int COLUMN_INDEX_PRICE = 2;
    public static final int COLUMN_INDEX_QUANTITY = 3;
    public static final int COLUMN_INDEX_TOTAL = 4;
 
    public static void main(String[] args) throws IOException {
        final String excelFilePath = "C:/demo/books.xlsx";
        final List<Book> books = readExcel(excelFilePath);
        for (Book book : books) {
            System.out.println(book);
        }
    }
 
    public static List<Book> readExcel(String excelFilePath) throws IOException {
        List<Book> listBooks = new ArrayList<>();
 
        // Get file
        InputStream inputStream = new FileInputStream(new File(excelFilePath));
 
        // Get workbook
        Workbook workbook = getWorkbook(inputStream, excelFilePath);
 
        // Get sheet
        Sheet sheet = workbook.getSheetAt(0);
 
        // Get all rows
        Iterator<Row> iterator = sheet.iterator();
        while (iterator.hasNext()) {
            Row nextRow = iterator.next();
            if (nextRow.getRowNum() == 0) {
                // Ignore header
                continue;
            }
 
            // Get all cells
            Iterator<Cell> cellIterator = nextRow.cellIterator();
 
            // Read cells and set value for book object
            Book book = new Book();
            while (cellIterator.hasNext()) {
                //Read cell
                Cell cell = cellIterator.next();
                Object cellValue = getCellValue(cell);
                if (cellValue == null || cellValue.toString().isEmpty()) {
                    continue;
                }
                // Set value for book object
                int columnIndex = cell.getColumnIndex();
                switch (columnIndex) {
                case COLUMN_INDEX_ID:
                    book.setId(new BigDecimal((double) cellValue).intValue());
                    break;
                case COLUMN_INDEX_TITLE:
                    book.setTitle((String) getCellValue(cell));
                    break;
                case COLUMN_INDEX_QUANTITY:
                    book.setQuantity(new BigDecimal((double) cellValue).intValue());
                    break;
                case COLUMN_INDEX_PRICE:
                    book.setPrice((Double) getCellValue(cell));
                    break;
                case COLUMN_INDEX_TOTAL:
                    book.setTotalMoney((Double) getCellValue(cell));
                    break;
                default:
                    break;
                }
 
            }
            listBooks.add(book);
        }
 
        workbook.close();
        inputStream.close();
 
        return listBooks;
    }
 
    // Get Workbook
    private static Workbook getWorkbook(InputStream inputStream, String excelFilePath) throws IOException {
        Workbook workbook = null;
        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(inputStream);
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook(inputStream);
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }
 
        return workbook;
    }
 
    // Get cell value
    private static Object getCellValue(Cell cell) {
        CellType cellType = cell.getCellTypeEnum();
        Object cellValue = null;
        switch (cellType) {
        case BOOLEAN:
            cellValue = cell.getBooleanCellValue();
            break;
        case FORMULA:
            Workbook workbook = cell.getSheet().getWorkbook();
            FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
            cellValue = evaluator.evaluate(cell).getNumberValue();
            break;
        case NUMERIC:
            cellValue = cell.getNumericCellValue();
            break;
        case STRING:
            cellValue = cell.getStringCellValue();
            break;
        case _NONE:
        case BLANK:
        case ERROR:
            break;
        default:
            break;
        }
 
        return cellValue;
    }
}
```

Kết quả thực thi chương trình trên:

```
Book [id=1, title=Book 1, quantity=2, price=1000.0, totalMoney=2000.0]
Book [id=2, title=Book 2, quantity=4, price=2000.0, totalMoney=8000.0]
Book [id=3, title=Book 3, quantity=6, price=3000.0, totalMoney=18000.0]
Book [id=4, title=Book 4, quantity=8, price=4000.0, totalMoney=32000.0]
Book [id=5, title=Book 5, quantity=10, price=5000.0, totalMoney=50000.0]
Book [id=null, title=null, quantity=null, price=null, totalMoney=110000.0]
```

Lưu ý:

Các kiểu dữ liệu số khi đọc từ file excel sẽ có giá trị là kiểu double.

Nguồn: https://gpcoder.com/3144-huong-dan-doc-va-ghi-file-excel-trong-java-su-dung-thu-vien-apache-poi/