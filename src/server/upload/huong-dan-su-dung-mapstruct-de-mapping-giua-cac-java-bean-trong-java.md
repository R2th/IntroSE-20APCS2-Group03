# Lời nói đầu.    
-----

Khi phát triễn một ứng dụng nhiều lớp trong java, việc mapping giữa các đối tượng **Java Bean** với nhau là điều không thể thiếu.  Trường hợp phổ biến có thể kể đến là việc ánh xạ các entities từ lớp** Repository** trả về thành các DTO. Việc thực hiện mapping bằng tay từ Java Bean sang DTO là một công việc tẻ nhạt và dễ gây lỗi.  **MapStrust** sinh ra để giải quyết vấn đề mapping dữ liệu giữa các Java Bean một cách tự động ,thuận tiện và nhanh chóng. 

## 1.  Add dependency MapStrust vào Maven .
 Để có thể sử dụng được **MapStrust** trước tiên cần phải add thêm thư viện **MapStrust** vào **Maven** như sau:
   
 ```
<dependency>
<groupId>org.mapstruct</groupId>
<artifactId>mapstruct-jdk8</artifactId>
<version>1.3.0.Final</version>
</dependency>
```
     
 Ngoài ra **MapStrust** sử dụng *mapstruct-processor* để thực hiện ánh xạ trong quá trình chạy nên chúng ta cần phải add thêm *mapstruct-processor* vào maven-compiler-plugin plugin như sau:
        
```
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-compiler-plugin</artifactId>
<version>3.5.1</version>
<configuration>
<source>1.8</source>
<target>1.8</target>
<annotationProcessorPaths>
    <path>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct-processor</artifactId>
        <version>1.3.0.Final</version>
    </path>
</annotationProcessorPaths>
</configuration>
</plugin>
```

# 2.  Basic Mapping.
 Đầu tiên chúng ta tiến hành tạo 1 lớp đơn giản(**Source Class**) với tên **Category** như sau:
```
    @Data
    @Entity
    @AllArgsConstructor
    @NoArgsConstructor
    public class Category implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private String name;
        private String type;
    }
    
```

Chúng ta tiếp tục tạo một lớp khác (Destination class ) với tên **CategoryResDto**. Lớp này là lớp chúng ta muốn map dữ liệu đến.

```
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
public class CategoryResDto {

@JsonProperty("category_name")
private String name;
}
```

 Để có thể tiến hành Mapping thực hiện tạo một Interface như sau:
   
```
@Mapper
public interface CategoryMapper {
CategoryResDto categoryToCategoryDto(Category category);
}
```
    
Chú thích **@Mapper** đánh dấu **Interface** này như một **mapping interface** và cho phép MapStrust hoạt động trên interface này.

Phương thức  **CategoryResDto categoryToCategoryDto(Category category)** sẽ thực hiện  mapping từ lớp Category sang lớp CategoryResDto .

Để có thể kích hoạt **MapStrust** và thực hiện **mapping**,chúng ta tiến hành chạy lệnh **mvn clean install** .  **MapStrust** sẽ  tự động tạo một lớp implement ở thư mục */target/generated-sources/annotations/* với nội dung như bên dưới:

```
@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-05-22T20:50:35+0700",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_181 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryResDto categoryToCategoryDto(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResDto categoryResDto = new CategoryResDto();

        categoryResDto.setName( category.getName() );

        return categoryResDto;
    }
}
```

Để có thể sử dụng được đối tượng vừa được map, chúng ta chỉ cần thực hiện theo cách thông thường. Trong lớp service chúng ta thực hiện như sau : 
    
  ```
 @Service
    public class CategoryServiceImpl implements CategoryService

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;
    
    @Override
    public List<CategoryResDto> findAllCategory() {
        return categoryRepository.findAll().stream().
                map(categoryMapper::categoryToCategoryDto).collect(Collectors.toList());
    }
```

# 3.  Mapping với tên trường khác nhau.
 Tiến hành add thêm trường vào cả 2 lớp **Category** và **CategoryDTO** tuy nhiên với 2 tên khác nhau. Trường **statusCategory** vào **Category** và **status** vào **CategoryDTO**  như sau :
 ```
    @Data
    @Entity
    @AllArgsConstructor
    @NoArgsConstructor
    public class Category implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private String name;
        private String type;
        private String statusCategory;
    }
```
    
 ```
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
public class CategoryResDto {
@JsonProperty("category_name")
private String name;
 @JsonProperty("status")
private String status;
}
```

   Do 2 tên trường ở lớp nguồn và lớp đích đã có sự khác nhau nên chúng ta cần phải sử dụng chú thích @Mappings trên phương thức chúng ta định map với tên trường nguồn và đích được định nghĩa như phía dưới:
   
```
@Mapper
public interface CategoryMapper {
@Mapping(source = "statusCategory",target = "status")
CategoryResDto categoryToCategoryDto(Category category);
}
```
    
   Ở đây  trong giá trị source chúng ta chỉ rõ tên trường ở đối tượng nguồn(**Category.class**) và giá trị trong target là tên trường trong đối tượng đích(**CategoryResDto.class**). Thực hiện chạy lại **mvn clean install**. Lớp mapping implement sẽ được tạo  với tên trường nguồn và đích đã được map như bên dưới: 
    
```
@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-05-22T20:35:47+0700",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_181 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryResDto categoryToCategoryDto(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResDto categoryResDto = new CategoryResDto();

        categoryResDto.setStatus( category.getStatusCategory() );
        categoryResDto.setName( category.getName() );

        return categoryResDto;
    }
}          
```
## 4.   Mapping với định dạng khác nhau.
Chúng ta có thể sử dụng MapStrust để mapping 2 định dạng khác nhau giữa đối tượng nguồn và đích. Thêm một trường có tên là createDate với 2 kiểu dữ liệu khác nhau vào đối tượng nguồn và đích như sau:
   ```
        @Data
        @Entity
        @AllArgsConstructor
        @NoArgsConstructor
        public class Category implements Serializable {

            @Id
            @GeneratedValue(strategy = GenerationType.AUTO)
            private Long id;
            private String name;
            private String type;
            private String statusCategory;
            private String createDate;
        }
```
 ```
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
public class CategoryResDto {

@JsonProperty("category_name")
private String name;
 @JsonProperty("status")
private String status;
@JsonProperty("createDate")
 private LocalDate createDate;
}
```
        
   Ở 2 đối tượng trên có thể thấy lớp nguồn(**Category.class**)  với  trường **createDate** có định dạng là **String**  nhưng ở lớp đích(**CategoryResDto.class**) lại có định dạng là **LocalDate**.  Để thực hiện mapping giữa 2 lớp này chúng ta vẫn sẽ sử dụng **@Mappings** như sau:

```
@Mapper
public interface CategoryMapper {
@Mapping(source = "dateCreate",target = "dateCreate",dateFormat = "dd-MM-yyyy")
CategoryResDto categoryToCategoryDto(Category category);
}
```
                        
  Ở chú thích **@Mapping** của ví dụ trên, chúnh ta chỉ định tên trường ở lớp nguồn và đích cần map. Chúng  ta xác định kiểu dữ liệu cần map trực tiếp trong chú thích **@Mapping**. Ở ví dụ là từ string ở source nguồn sẽ được map sang định dạng **dateFormat**  **dd-MM-yyyy** với chú thích **dateForma**t. Thực hiện chạy lại **mvn clean instal**l. Lớp **Mapper Implement** sẽ được tạo ra như phía dưới :
  
  ```
@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-05-22T20:57:17+0700",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_181 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryResDto categoryToCategoryDto(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResDto categoryResDto = new CategoryResDto();

        if ( category.getDateCreate() != null ) {
            categoryResDto.setDateCreate( java.time.LocalDate.parse( category.getDateCreate(), DateTimeFormatter.ofPattern( "dd-MM-yyyy" ) ) );
        }
        categoryResDto.setName( category.getName() );

        return categoryResDto;
    }
}
```

## 5. Hỗ trợ defaultExpression

 Kể từ phiên bản 1.3.0 ,chúng ta có thể sử dụng thuộc tính **defaultExpression** của anotation **@Mapping** để chỉ định một biểu thức xác định giá trị của trường đích nếu trường nguồn là null.
Tiến hành thêm một trường id có kiểu **Long** vào lớp đích (**CategoryResDto.class**)  như sau : 
          
```
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
public class CategoryResDto {
 private Long id;
@JsonProperty("category_name")
private String name;
 @JsonProperty("status")
private String status;
@JsonProperty("createDate")
 private LocalDate createDate;
}
```
 
Nếu trường id của thực thể nguồn(**Category.class**) là null, chúng  ta sẽ tạo một id ngẫu nhiên và gán nó cho lớp **CategoryResDto**  một giá trị **random id** như sau :

```
@Mapper
public interface CategoryMapper {
@Mapping(source = "statusCategory",target = "status")
CategoryResDto categoryToCategoryDto(Category category);
}
```
Tiến hành chạy lại bằng lệnh mvn build clean. Mapstruct sẽ tạo ra một lớp implement như sau :

```
@Generated(
value = "org.mapstruct.ap.MappingProcessor",
date = "2019-05-22T21:57:44+0700",
comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_181 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

@Override
public CategoryResDto categoryToCategoryDto(Category category) {
if ( category == null ) {
return null;
}

CategoryResDto categoryResDto = new CategoryResDto();

if ( category.getId() != null ) {
categoryResDto.setId( String.valueOf( category.getId() ) );
}
else {
categoryResDto.setId( java.util.UUID.randomUUID().toString() );
}
categoryResDto.setName( category.getName() );
if ( category.getDateCreate() != null ) {
categoryResDto.setDateCreate( LocalDate.parse( category.getDateCreate() ) );
}

return categoryResDto;
}
}
```

Chúng ta có thể thấy ở khối lệnh này
```
if ( category.getId() != null ) {
categoryResDto.setId( String.valueOf( category.getId() ) );
}
else {
categoryResDto.setId( java.util.UUID.randomUUID().toString() );
}
```

**MapStruct** sẽ thực hiện kiểm tra. Nếu giá trị là **id** của **Category** là null thì Id của **categoryResDto** sẽ được set dựa vào **java.util.UUID.randomUUID().toString()**

# Kết luận

Hiện nay có rất nhiều Mapping Framework trong java , mỗi loại đều có ưu và nhược điểm riêng. Vậy khi nào chúng ta sử dụng **Mapstruct**  ? Chúng ta sử dụng Mapstruct khi chúng ta chỉ cần static mapping. Do việc thực hiện mapping được chạy trong thời gian compile time nên sẽ đảm bảo hiệu suất tốt nhất cho ứng dụng của bạn khi thực mapping giữa 2 lớp A và B .
Hy vọng qua bài việc sẽ giúp cho các bạn phần nào hiểu được về Mapstruct và cách sử dụng chúng. Hẹn gặp lại các bạn trong các bài viết tiếp theo.