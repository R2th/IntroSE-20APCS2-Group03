Bài viết này mình sẽ hướng dẫn cách để parse từ json thành object dựa vào type. Vì đôi khi json của chúng ta sẽ có nhiều dạng, và bạn muốn parse ra object dựa vào dạng, ví dụ json dạng A thì parse ra object A còn json dạng B thì parse ra object B.

## 1. Miêu tả project

Tưởng tượng chúng ta là một là quản lí dân cư ở 1 khu vực. Ở khu vực chúng ta có 2 dạng dân cư, một là học sinh, 2 là người trưởng thành (người đã đi làm), mỗi dạng dân cư có những property riêng và chúng ta muốn lưu những properties này dưới dạng json trong database. Khi lấy data dạng json này lên, ta muốn application của chúng ta dựa vào type (học sinh hoặc người đi làm) để parse json này ra những object cần thiết và xử lí tiếp.

## 2. Tạo project 

Chúng ta vào trang https://start.spring.io/ và tạo project spring boot
![image.png](https://images.viblo.asia/36b8a244-63db-43cb-ae71-dd2f932f897d.png)

Chúng ta sẽ sử dụng in-memory database h2 cho project.

## 3. Config project 

### 3.1 Project structure
![image.png](https://images.viblo.asia/fc4c9fe5-b77d-434b-a3ae-aec05c85b698.png)

### 3.2 Những files cần tạo
- Config application.properties:
    ```Shell
        spring.datasource.url=jdbc:h2:mem:demojsonmapping
        spring.datasource.driverClassName=org.h2.Driver
        spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
        spring.jpa.defer-datasource-initialization=true
        
- Tạo file schema.sql và data.sql
  - schema.sql:
    ```Shell
    DROP TABLE IF EXISTS resident;

    CREATE TABLE resident (
      id INT AUTO_INCREMENT  PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      address VARCHAR(250) NOT NULL,
      metadata VARCHAR(10000) NOT NULL
    );
  *metadata là column để lưu những properties của resident*
  - data.sql:
     ```Shell
     INSERT INTO
      resident (name, address, metadata)
       VALUES
    ('Thanh', 'Ho Chi Minh', '{"type": "student", "mode" : "active", "classNumber": 10}'),
    ('Bao', 'Gia Lai', '{"type": "mature", "mode" : "active", "maritalStatus": "single"}');


- Resident entity:
    ```Java
    @Getter
    @Setter
    @Entity
    public class Resident {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String name;
        private String address;
        private String metadata;
    }
- Metadata interface: đây là 1 interface chung cho metadata của những resident (học sinh và người trưởng thành)
       
   ```Java
    @JsonSubTypes({@JsonSubTypes.Type(StudentMetadata.class), @JsonSubTypes.Type(MatureMetadata.class)})
    @JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
    )
    public interface Metadata {
        String getMode();
    }
@JsonSubTypes: ở đây mình sẽ define ra những class có thể được parse ra của json metadata, cụ thể ở đây có StudentMetadata class và MatureMetadata class.

@JsonTypeInfo: chứa những thông tin cho việc serialization và deserialization JSON, chúng ta sẽ dựa vào property "type" để xác định nó thuộc vào object nào.
Cả 2 class metadata đểu có chung thuộc tính mode nên chúng ta sẽ để 1 abstract method getMode trong interface Metadata.

- StudentMetadata:
     ```Java
        @JsonTypeName("student")
        @Getter
        @Setter
        @ToString
        public class StudentMetadata implements Metadata {
            private String mode;
            private int classNumber;
        }
 @JsonTypeName: logical name của type này, dùng để xác định khi parse từ json sang object

- MatureMetadata:
    ```Java
        @JsonTypeName("mature")
        @Getter
        @Setter
        @ToString
        public class MatureMetadata implements Metadata {
            private String mode;
            private String maritalStatus;
        }
        
- StudentRepository:
    ```Java
        @Repository
        public interface ResidentRepository extends JpaRepository<Resident, Integer> {
        }
       
- StudentController:
    ```Java
        @RestController
        @RequestMapping("/residents")
        @RequiredArgsConstructor
        @Slf4j
        public class ResidentController {
            private final ResidentRepository residentRepository;

            @GetMapping("/metadata/{id}")
            public void printMetadataOfStudent(@PathVariable int id) throws JsonProcessingException {
                Resident resident = residentRepository.getById(id);
                Metadata metadata = new ObjectMapper()
                        .readerFor(Metadata.class)
                        .readValue(resident.getMetadata());
                if (metadata.getClass().equals(StudentMetadata.class)){
                    StudentMetadata studentMetadata = (StudentMetadata)metadata;
                    log.info("This is a student");
                    log.info("Student metadata: {}", studentMetadata);
                }
                else if (metadata.getClass().equals(MatureMetadata.class)){
                    MatureMetadata matureMetadata = (MatureMetadata)metadata;
                    log.info("This is a mature person");
                    log.info("Mature metadata: {}", matureMetadata);
                }
                else {
                    log.info("No matching resident");
                }
            }
        }
 Chúng ta sẽ parse từ json string ra Metadata object. Sau đó chúng ta sẽ compare class đó với StudentMetadata hoặc MatureMetadata rồi parse ra thành những object và chúng ta sẽ lấy được những property cần thiết. Ở đây mình sẽ log ra những thông tin của metadata này.
 
## 4. Test 
- Run project
- Gọi postman với id = 1 và check log
    - ![image.png](https://images.viblo.asia/8f5e4922-40b3-42db-9cfb-81dacc451b62.png)
    - ![image.png](https://images.viblo.asia/7611ac67-2a50-45bd-a7b5-0368e868f3ea.png)
- Gọi postman với id = 2 và check log
    - ![image.png](https://images.viblo.asia/edc9e171-56b9-4b6e-b49b-2108220efe5c.png)
    - ![image.png](https://images.viblo.asia/db8b84bf-9b74-495c-9cf2-8587b3576dbb.png)
    
## 5. References
- https://fasterxml.github.io/jackson-annotations/javadoc/2.4/com/fasterxml/jackson/annotation/JsonTypeInfo.html
- https://www.baeldung.com/jackson-annotations
- https://github.com/line/line-bot-sdk-java