> Tiếp tục với bài viết ở lần trước, https://viblo.asia/p/restful-api-with-java-framework-dropwizard-do-rop-wi-dot-ByEZkJwxKQ0.
> Mình đã tạo một ứng dụng rest API đơn giản với dropwizard
> 
> Hôm nay mình sẽ tiến hành thêm config để có thể dùng thymeleaf với dropwizard!

Thêm một vài dependency vào file `pom.xml`.
```
        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-views</artifactId>
            <version>1.2.6</version>
        </dependency>

        <dependency>
            <groupId>org.thymeleaf</groupId>
            <artifactId>thymeleaf</artifactId>
            <version>3.0.1.RELEASE</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>org.thymeleaf.extras</groupId>
            <artifactId>thymeleaf-extras-java8time</artifactId>
            <version>3.0.0.RELEASE</version>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>io.dropwizard</groupId>
            <artifactId>dropwizard-assets</artifactId>
            <version>${dropwizard.version}</version>
        </dependency>
        <!-- bootstrap -->
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>bootstrap</artifactId>
            <version>4.1.3</version>
        </dependency>
```

Mình tạo một package `config/thymeleaf` trong  và tiến hành thêm các file class sau để config thymeleaf:

> `BeanContext.java`
{@embed: https://gist.github.com/tungpv-0974/abb6538088a5057ed8884b7f6009e458}

> `ClassResourceTemplateResolver.java`
{@embed: https://gist.github.com/tungpv-0974/1adeadedfcce0b3a364298291def69d3}


> `ThymeleafConfigurator.java`
{@embed: https://gist.github.com/tungpv-0974/38b602d75201992fe4bc580cfd4d772f}

> `ThymeleafViewRenderer.java`
{@embed: https://gist.github.com/tungpv-0974/be6d48992eab33c2cfdf41e63f141546}

Ở trong package resource mình tạo thêm package `META-INF/services`.
Thêm vào đấy file `io.dropwizard.views.ViewRenderer `với nội dung như sau !!
```
com.tungpv.example.config.thymeleaf.ThymeleafViewRenderer
```
là nội dung trỏ đến class `ThymeleafViewRenderer `mình tạo ở phía trên!


Thêm như sau vào class AppConfig
```
    @JsonProperty("views")
    public Map<String, Map<String, String>> views;
```


Thêm như sau vào file `config.yml`
```
views:
  .html:
    cache: false
    prefix: "/templates"
```

Thêm như sau vào initialize trong MainApplication class :
```
bootstrap.setConfigurationSourceProvider(
                new SubstitutingSourceProvider(
                        bootstrap.getConfigurationSourceProvider(),
                        new EnvironmentVariableSubstitutor(false)
                )
        );
        bootstrap.addBundle(new ViewBundle<AppConfig>(ImmutableList.of(new ThymeleafViewRenderer())) {
            @Override
            public Map<String, Map<String, String>> getViewConfiguration(final AppConfig configuration) {
                return configuration.views;
            }
        });

        bootstrap.addBundle(new AssetsBundle("/templates/com/tungpv/example/resource/web/assets/", "/assets"));
        bootstrap.addBundle(new AssetsBundle("/META-INF/resources/webjars", "/webjars", null, "webjars"));
```
Như vậy là đã có thể dùng thymeleaf với dropwizard!

Mình sẽ tạo class `UserViewResource.java` như sau để trả về view chứ không phải trả về json.

{@embed: https://gist.github.com/tungpv-0974/386cae938065f961a07f53428ab197b2}

Tạo một class `UserView.java` extends `io.dropwizard.views.View`.
{@embed: https://gist.github.com/tungpv-0974/adda46ef62cec2051634d026f63f5f4f}

Tạo file index.html để hiện thị danh sách user.
{@embed: https://gist.github.com/tungpv-0974/196af2ea5827ea778ffa619dcd0a6a62}

Và cuối cùng mình đăng ký UserViewResource vào environment ở hàm void run:
```
    @Override
    public void run(AppConfig configuration, Environment environment) {

        environment.jersey().register(new UserResource());
        environment.jersey().register(new UserViewResource());
    }
```

> Và kết quả khi mình truy cập http://localhost:8080/users như sau :
> ![](https://images.viblo.asia/807016b7-35aa-4fab-8e6f-91c0ac8d3b47.png)

> Toàn bộ việc tiến hành config thymeleaf các bạn có thể xem code ở đây ! 
> https://github.com/tungpv-0974/example-dropwizard/pull/2/files

> Và source code của toàn bộ example này mình để ở đây ! https://github.com/tungpv-0974/example-dropwizard