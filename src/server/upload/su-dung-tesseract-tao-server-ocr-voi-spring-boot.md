# Sử dụng Tesseract tạo server OCR với Spring boot
<br>
<br>
<br>

### 1. Tesseract là gì?

<br>
<br>

Tesseract là một OCR (Optical Character Recognition) engine hàng đầu hiện nay. Công cụ này được phân phối với bản quyền mã nguồn mở Apache 2.0. Nó hỗ trợ nhận diện kí tự trên các tập tin hình ảnh và xuất ra dưới dạng kí tự thuần, html, pdf, tsv, invisible-text-only pdf. Người dùng có thể sử dụng trực tiếp hoặc lập trình viên có thể sử dụng các chức năng thông qua API.
<br>

Tesseract được phát triển bởi Hewlett-Packard Laboratories Bristol tại Hewleett-Packard Co, Greeley Colorado từ 1985 đến 1994. Sau đó, nó được cập nhật một số thay đổi nhỏ và tạm ngưng phát triển từ sau 1998. Đến năm 2005, Tesseract được phân bố dưới dạng mã nguồn mở bởi HP và được phát triển bởi Google từ năm 2006.
<br>

Hiện tại, Tesseract đã phát triển đến version 3.0x và có thể hoạt động trên 3 hệ điều hành phổ biến là Window, Mac và Linux. Công cụ này hỗ trợ nhận diện kí tự của hơn 100 ngôn ngữ khác nhau, bao gồm cả tiếng Việt. Không những thế, chúng ta có thể huấn luyện chương trình dùng Tesseract để có thể nhận diện một ngôn ngữ nào đó.

<br>
<br>

### 2. Cài đặt và chuẩn bị cho project (trên môi trường Linux)

<br>
<br>

**a> Maven Dependency**

<br>

```
<dependency>
    <groupId>net.sourceforge.tess4j</groupId>
    <artifactId>tess4j</artifactId>
    <version>3.2.1</version>
</dependency>
```

<br>

**b> Tải dữ liệu tessdata từ Github**

<br>

https://github.com/tesseract-ocr/tessdata

<br>

**c> Cài đặt Tesseract cho Linux bằng câu lệnh:**

<br>

`sudo apt-get install tesseract-ocr`

<br>

![](https://images.viblo.asia/ed81c6fd-79af-4858-8a24-0568a12111d1.png)

<br>

Kiểm tra version

<br>

`tesseract -v`

<br>

![](https://images.viblo.asia/3e5eb7a4-a073-4920-a9af-a7013284a0ef.png)

<br>
<br>

### 3. Tạo project

<br>
<br>

***Bước 1:*** tạo project Spring Boot cơ bản
<br>

***Bước 2:*** Đổi tên thư mục dữ liệu tessdata-master mà bạn download từ git về thành tessdata và copy vào trong project
<br>

***Bước 3:*** Thêm Dependency vào trong project
<br>

```
<dependency>
    <groupId>net.sourceforge.tess4j</groupId>
    <artifactId>tess4j</artifactId>
    <version>3.2.1</version>
</dependency>
```

<br>

***Cấu trúc project***
<br>

Class **DemoOrcServerApplication**

```
import net.sourceforge.tess4j.Tesseract;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
 
@SpringBootApplication
public class DemoOrcServerApplication {
 
   public static void main(String[] args) {
       SpringApplication.run(DemoOrcServerApplication.class, args);
   }
 
   @Bean
   Tesseract getTesseract(){
       Tesseract tesseract = new Tesseract();
       tesseract.setDatapath("./tessdata");
       return tesseract;
   }
 
}
```

<br>
<br>

Class **OcrController**
<br>

```
import com.example.demoorcserver.dto.OcrResult;
import com.example.demoorcserver.services.OcrService;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
 
import java.io.IOException;
 
@RestController
@RequestMapping("/ocr")
public class OcrController {
   @Autowired
   private OcrService ocrService;
 
   @PostMapping("/upload")
   public ResponseEntity<OcrResult> upload(@RequestParam("file") MultipartFile file) throws IOException, TesseractException {
       return ResponseEntity.ok(ocrService.ocr(file));
   }
}
```

<br>
<br>

Class **OcrResult**

<br>

```
import lombok.Data;
 
@Data
public class OcrResult {
   private String result;
}
```

<br>
<br>

Class **OcrService**

<br>

```
import com.example.demoorcserver.dto.OcrResult;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
 
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
 
@Service
public class OcrService {
   @Autowired
   private Tesseract tesseract;
 
   public OcrResult ocr(MultipartFile file) throws IOException, TesseractException {
       File convFile = convert(file);
       String text = tesseract.doOCR(convFile);
       OcrResult ocrResult = new OcrResult();
       ocrResult.setResult(text);
       return ocrResult;
   }
 
   public static File convert(MultipartFile file) throws IOException {
       File convFile = new File(file.getOriginalFilename());
       convFile.createNewFile();
       FileOutputStream fos = new FileOutputStream(convFile);
       fos.write(file.getBytes());
       fos.close();
       return convFile;
   }
}
```

<br>
<br>

### 4. Kiểm tra kết quả

<br>
<br>

Input của chúng ta là tấm ảnh

<br>

![](https://images.viblo.asia/b8b7d56b-5932-44db-83fb-d13eb9daf5bc.png)


<br>

Dùng postman để kiểm tra:

<br>

![](https://images.viblo.asia/ecbb0299-34cc-4eaf-9876-fa25103dd5f3.png)

<br>

Như vậy chương trình của chúng ta đã hoạt động tốt.

<br>
<br>

### Bài hướng dẫn của mình đến đây là kết thúc. Cám ơn các bạn đã xem!