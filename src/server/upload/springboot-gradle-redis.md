# 1.Giới thiệu
Bài trước chúng ta đã tìm hiểu về gradle cùng với những ưu nhược điểm của nó so với maven hay Ant, Quả thực gradle mạnh mẽ hơn rất nhiều so với maven hoặc Ant, tham khảo https://viblo.asia/p/tim-hieu-ve-gradle-07LKX468KV4 để biết thêm thông tin. 
Hôm nay chúng ta sẽ cùng nhau xây dựng project spring sử dụng build gradle + connect với redis database.
Với những ai chưa biết về redis thì Redis chính là hệ thống lưu trữ key-value với rất nhiều tính năng và được sử dụng rộng rãi. Redis nổi bật bởi việc hỗ trợ nhiều cấu trúc dữ liệu cơ bản (hash, list, set, sorted set, string), đồng thời cho phép scripting bằng ngôn ngữ lua. Bên cạnh lưu trữ key-value trên RAM với hiệu năng cao, redis còn hỗ trợ lưu trữ dữ liệu trên đĩa cứng (persistent redis) cho phép phục hồi dữ liệu khi gặp sự cố. Ngoài tính năng replicatation (sao chép giữa master-client), tính năng cluster (sao lưu master-master) cũng đang được phát triển . 
Tham khảo tutorial về redis các bạn có thể vào :
https://redis.io/
hoặc:
https://www.tutorialspoint.com/redis/index.htm
Bài này mình xin đi vào việc xây dựng structure và config project spring boot gradle build + redis.
# 1.Project Structure
#### - Chúng ta sẽ cùng xây dựng project spring-boot build gradle sử dụng redis với cấu trúc thư mục như sau:
![](https://images.viblo.asia/29cc37e6-3853-4c68-804f-f1489cfd57f3.png)

#### - Gradle build file to Resolve JAR Dependency
Trong file build.gradle config như sau:
```
buildscript {
    repositories {
        mavenLocal()
        jcenter()
        mavenCentral()
    }
}


apply plugin: 'java'

plugins { id "io.spring.dependency-management" version "1.0.4.RELEASE" }

jar {
    baseName = 'spring-redis'
    version = '0.0.1-SNAPSHOT'
}

dependencies {
    compile("org.springframework.boot:spring-boot-starter-data-redis")
    compile group: 'org.glassfish.jersey.media', name: 'jersey-media-json-jackson', version: '2.25.1'
    compile 'org.springframework.data:spring-data-commons:1.9.1.RELEASE'
    compile 'org.springframework.boot:spring-boot-starter-security:1.2.0.RELEASE'
}
```
![](https://images.viblo.asia/2adcb9c5-9b76-4acf-bbd4-9a5c4986368f.png)

#### - Configuration class for StringRedisTemplate
- Tạo class RedisConfig:
```
@Configuration
public class RedisConfig {

    @Bean
    public RedisConnectionFactory jedisConnectionFactory() {
		JedisPoolConfig poolConfig = new JedisPoolConfig();
		poolConfig.setMaxTotal(5);
		poolConfig.setTestOnBorrow(true);
		poolConfig.setTestOnReturn(true);
		JedisConnectionFactory ob = new JedisConnectionFactory(poolConfig);
		ob.setUsePool(true);
		ob.setHostName("localhost");
		ob.setPort(6379);
		return ob;
    }

    @Bean
    public RedisTemplate jRedisTemplate(JedisConnectionFactory jedisConnectionFactory) {
        RedisTemplate template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory);
        return template;
    }

    @Bean
    public ZSetOperations<String, String> redisZSetOperations(StringRedisTemplate template){
        return template.opsForZSet();
    }

    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        StringRedisTemplate template = new StringRedisTemplate();
        template.setEnableTransactionSupport(true);
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }
}
```
#### - Tạo class Main
```
public class Main {
	public static void main(String[] args) {
	       AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
	       ctx.register(RedisConfig.class);
	       ctx.refresh();
	       StringRedisTemplate stringRedisTemplate  = ctx.getBean(StringRedisTemplate.class);
	       // set to set value
	       stringRedisTemplate.opsForValue().set("Test1", "Spring");
	       stringRedisTemplate.opsForValue().set("Test2", "Redis");
	       //get values from set
	       System.out.println(stringRedisTemplate.opsForValue().get("Test1"));
	       System.out.println(stringRedisTemplate.opsForValue().get("Test2"));
	       //Using Hash Operation
	       String str = "Spring-data-redis";
	       stringRedisTemplate.opsForHash().put("Test3", "Name",str);
	       System.out.println(stringRedisTemplate.opsForHash().get("Test3", "Name");
    }
} 
```
#### - Chạy main class và output sẽ là:
```
Spring
Redis
Spring-data-redis 
```