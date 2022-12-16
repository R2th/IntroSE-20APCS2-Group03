# Env trong Quarkus
Như trong bài trước mình đã chia sẻ các cách load env của quarkus thì trong bài này mình sẽ viết các cơ chế còn lại:

3. File named .env placed in the current working directory
4. application.properties file placed in the $PWD/config/ directory
5. An application configuration file, i.e. src/main/resources/application.properties

### Các cơ chế load env của Quarkus:
##### File named .env:
Cách này thì cực kỳ đơn giản, chỉ cần tạo 1 file chứa toàn bộ thông tin invironment trong file `.env` là quarkus sẽ tự động load vào project

Giờ mình sẽ tạo 1 file `.env` trong package `demo-env`
```
demo-env
|
|
|--- src
|--- .env
```

với value:
```
QUARKUS_DEMO_TIMEZONE_2=America/Santiago
```

Build:
```
./mvnw clean package
```

Run
```
java -jar -Dserver.timezone=Asia/Tokyo target/quarkus-app/quarkus-run.jar
```

Output:
```
__  ____  __  _____   ___  __ ____  ______ 
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/ 
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \   
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/   
2021-05-20 22:57:52,825 INFO  [dem.con.ConfigTimeZone] (main) Setting service timezone: Asia/Tokyo
2021-05-20 22:57:52,941 INFO  [io.quarkus] (main) demo-env 1.0.0-SNAPSHOT on JVM (powered by Quarkus 1.13.4.Final) started in 0.953s. Listening on: http://0.0.0.0:8080
2021-05-20 22:57:52,942 INFO  [io.quarkus] (main) Profile prod activated. 
2021-05-20 22:57:52,943 INFO  [io.quarkus] (main) Installed features: [agroal, cdi, hibernate-orm, hibernate-orm-panache-kotlin, kotlin, mutiny, narayana-jta, resteasy, resteasy-jackson, smallrye-context-propagation]
```

Test:
```
 curl -X GET http://0.0.0.0:8080/current-time
```

Result:
```
2021-06-18 07:00:54
```

Ok, như vậy mình đã giới thiệu các cách load env hay dùng. Đối với 2 trường hợp còn lại dùng 
```
4. application.properties file placed in the $PWD/config/ directory
5. An application configuration file, i.e. src/main/resources/application.properties
```
thì mình nghĩ nó không linh hoạt lắm khi sử dụng file properties nên không giới thiệu. Tiếp theo ta sẽ đi vào phần chính của bài viết này là cách load env từ AWS SSM

##### AWS SSM:
Vì quarkus không support load ssm bằng cách config như springboot. Nếu bạn muốn tìm hiểu config như thế nào để SpringBoot load biến môi trường từ AWS thì có thể tham khảo bài viết [này](https://viblo.asia/p/lam-gi-de-spring-boot-lay-duoc-properties-tu-aws-parameter-store-ssm-maGK73NbKj2) 

Đối với quarkus để load env từ AWS SSM, mình sẽ cuscom config default của quarkus, không đọc env từ các cách như đã note ở trên nữa mà sử dụng SDK của AWS `aws-java-sdk-ssm`

Đầu tiên chúng ta cần import thư viện `aws-java-sdk-ssm` vào project bằng cách add dependency sau vào pom file:
```
        <dependency>
            <groupId>com.amazonaws</groupId>
            <artifactId>aws-java-sdk-ssm</artifactId>
            <version>${amazonaws.ssm.version}</version>
        </dependency>
```
tùy version mà mình setting properties `amazonaws.ssm.version`

Tiếp theo, chúng ta sẽ override config load env của quarkus bằng cách:

1. Tạo 1 class implement interface `ConfigSource` tên là `AwsSSmConfigSource`:
2. Tạo 1 file tên `org.eclipse.microprofile.config.spi.ConfigSource` đặt trong folder `src/main/resources/META-INF/services`

Phải đặt đúng tên đường dẫn, nếu không framework sẽ không load được config:
Nội dung file `org.eclipse.microprofile.config.spi.ConfigSource` sẽ chứa đường dẫn trỏ đến file `AwsSSmConfigSource` ở trên

`org.eclipse.microprofile.config.spi.ConfigSource:`
```
demo.config.AwsSSmConfigSource
```

Tạo class `AwsSSmConfigSource` ở package `src.demo.config`:
```
package demo.config

import org.eclipse.microprofile.config.spi.ConfigSource

class AwsSSmConfigSource : ConfigSource {
    override fun getProperties(): MutableMap<String, String> {
        TODO("Not yet implemented")
    }

    override fun getValue(p0: String?): String {
        TODO("Not yet implemented")
    }

    override fun getName(): String {
        TODO("Not yet implemented")
    }
}
```

trong class này mình sẽ implement `ConfigSource` như sau:

Đầu tiên mình sẽ define biến `ssmProperties` để store các env config ở AWS SSM. 
```
var ssmProperties: MutableMap<String, String> = mutableMapOf()
```

Tiếp theo mình define 1 function load env config ở AWS SSM vào `ssmProperties`. Function này sẽ đểu trong khối `companion object` để run đầu tiên:
```
companion object {
        fun fetchSsmProperties(): MutableMap<String, String> {
            val  profileActive = ProfileManager.getActiveProfile()
            return getDataSSMByProfile()
        }

        private fun getDataSSMByProfile(): MutableMap<String, String> {
            val client: AWSSimpleSystemsManagement = AWSSimpleSystemsManagementClientBuilder
                .standard()
                .withCredentials(DefaultAWSCredentialsProviderChain())
                .withRegion(Regions.AF_SOUTH_1)
                .build()

            val path = "/config/env/"
            val request = GetParametersByPathRequest().withPath(path).withWithDecryption(true)

            return client.getParametersByPath(request).parameters.associate { it.name.replace("/config/env/", "") to it.value } as MutableMap<String, String>
        }
    }
    
     init {
        ssmProperties = fetchSsmProperties()
    }
```

`path` ở đây mình sẽ setting theo như cách mình set biến ở AWS, ở đây mình set biến theo path này `/config/env/QUARKUS_DEMO_TIMEZONE_2`.

Mình sẽ có file `AwsSSmConfigSource` như sau:
```
package demo.config

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain
import com.amazonaws.regions.Regions
import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagement
import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagementClientBuilder
import com.amazonaws.services.simplesystemsmanagement.model.GetParametersByPathRequest
import io.quarkus.runtime.configuration.ProfileManager
import org.eclipse.microprofile.config.spi.ConfigSource

class AwsSSmConfigSource : ConfigSource {
    var ssmProperties: MutableMap<String, String> = mutableMapOf()

    companion object {
        fun fetchSsmProperties(): MutableMap<String, String> {
            val  profileActive = ProfileManager.getActiveProfile()
            return getDataSSMByProfile()
        }

        private fun getDataSSMByProfile(): MutableMap<String, String> {
            val client: AWSSimpleSystemsManagement = AWSSimpleSystemsManagementClientBuilder
                .standard()
                .withCredentials(DefaultAWSCredentialsProviderChain())
                .withRegion(Regions.AF_SOUTH_1)
                .build()

            val path = "/config/env/"
            val request = GetParametersByPathRequest().withPath(path).withWithDecryption(true)

            return client.getParametersByPath(request).parameters.associate { it.name to it.value } as MutableMap<String, String>
        }
    }

    init {
        ssmProperties = fetchSsmProperties()
    }

    override fun getProperties(): MutableMap<String, String> {
        return this.ssmProperties
    }

    override fun getValue(p0: String?): String {
        return this.ssmProperties[p0] ?: ""
    }

    override fun getName(): String {
        return AwsSSmConfigSource::class.java.simpleName
    }
}

```

Ok, giờ run rồi test thử thôi, nhớ đảm bảo bạn đã config key AWS_KEY và AWS_ID, ở đây mình dùng EC2 của AWS nên không cần config gì.

Build:
```
./mvnw clean package
```

Run
```
java -jar -Dserver.timezone=Asia/Tokyo target/quarkus-app/quarkus-run.jar
```

Output:
```
__  ____  __  _____   ___  __ ____  ______ 
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/ 
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \   
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/   
2021-05-20 22:57:52,825 INFO  [dem.con.ConfigTimeZone] (main) Setting service timezone: Asia/Tokyo
2021-05-20 22:57:52,941 INFO  [io.quarkus] (main) demo-env 1.0.0-SNAPSHOT on JVM (powered by Quarkus 1.13.4.Final) started in 0.953s. Listening on: http://0.0.0.0:8080
2021-05-20 22:57:52,942 INFO  [io.quarkus] (main) Profile prod activated. 
2021-05-20 22:57:52,943 INFO  [io.quarkus] (main) Installed features: [agroal, cdi, hibernate-orm, hibernate-orm-panache-kotlin, kotlin, mutiny, narayana-jta, resteasy, resteasy-jackson, smallrye-context-propagation]
```

Test:
```
 curl -X GET http://0.0.0.0:8080/current-time
```

Result:
```
2021-06-18 07:30:00
```

# Tổng kết:
Ok, như vậy là mình đang có thể load được env từ file `.env` và load từ `aws ssm`. Hy vọng bài viết này sẽ giúp được bạn.