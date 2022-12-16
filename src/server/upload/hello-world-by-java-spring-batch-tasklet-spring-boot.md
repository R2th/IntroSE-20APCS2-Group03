# Overview
Create a simple Hello World output batch program by combining Spring Batch Tasklet and Spring Boot

# Evironment
* Spring Batch 4.3.1 + Spring Boot 2.4.2
* Java 11 (AdoptOpenJDK 11.0.10+9)
* Gradle 6.8.1
* macOS Catalina

# Spring Batch execution configuration
* Job calls multiple Steps
* Step calls Tasklet

## What is job
[Spring Batch batch domain language-reference](https://spring.pleiades.io/spring-batch/docs/4.3.1/reference/html/domain.html#job)
> In Spring Batch, Job is just a container for Step instances. It combines multiple steps that logically belong together in a flow, allowing you to configure global properties for all steps, such as restartability.

## What is step
[Spring Batch batch domain language-reference](https://spring.pleiades.io/spring-batch/docs/4.3.1/reference/html/domain.html#step)
Step is a domain object that encapsulates the independent sequential phases of a batch job. Every job is fully configured in one or more steps. The Step contains all the information you need to define and control the actual batch processing.

## What is Tasklet
[Spring Batch batch domain language-reference](https://spring.pleiades.io/spring-batch/docs/4.3.1/reference/html/step.html#taskletStep)
Tasklet is a simple interface with one method called execute. execute is called repeatedly by TaskletStep until it returns `RepeatStatus.FINISHED` or throws an exception to signal a failure.

# Source code
## File list
```
├── build.gradle
└── src
    └── main
        └── java
            └── com
                └── example
                    └── hello
                        ├── HelloApplication.java
                        ├── HelloConfig.java
                        └── MessageTasklet.java
```

## build.gradle
```
plugins {
  id 'org.springframework.boot' version '2.4.2'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

group = 'com.example'
version = '0.0.1'
sourceCompatibility = '11'

repositories {
  mavenCentral()
}

dependencies {
  // Spring Batch
  implementation 'org.springframework.boot:spring-boot-starter-batch'

  // DB that will be inserted metadata of Spring Batch
  implementation 'com.h2database:h2:1.4.200'

  // Lombok
  compileOnly 'org.projectlombok:lombok:1.18.18'
  annotationProcessor 'org.projectlombok:lombok:1.18.18'
}
```

## src/main/java/com/example/hello/HelloApplication.java

```
package com.example.hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Spring Boot Application class
@SpringBootApplication
public class HelloApplication {

  public static void main(String[] args) {
    SpringApplication.run(HelloApplication.class, args);
  }
}
```

## src/main/java/com/example/hello/HelloConfig.java
```
package com.example.hello;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Batch configuration class
@Configuration // Annotation indicating that it is a Bean definition class
@EnableBatchProcessing // Enable Spring Batch
@RequiredArgsConstructor // Automatic constructor generation by Lombok
public class HelloConfig {

  private final JobBuilderFactory jobBuilderFactory;
  private final StepBuilderFactory stepBuilderFactory;

  @Bean
  public Job fooJob() {
    System.out.println("Execute fooJob method");
    return jobBuilderFactory.get("myFooJob") // Specify any unique job name
      .flow(helloStep()) // Specify any step name
      .end()
      .build();
  }

  @Bean
  public Job barJob() {
    System.out.println("Execute barJob method");
    return jobBuilderFactory.get("myBarJob") // Specify any unique job name
      .flow(helloStep()) // Specify any step name
      .next(worldStep()) // Specify any step name
      .end()
      .build();
  }

  @Bean
  public Step helloStep() {
    System.out.println("Execute helloStep method");
    return stepBuilderFactory.get("myHelloStep") // Specify any step name
      .tasklet(new MessageTasklet("Hello!")) // Specify Tasklet that will be run
      .build();
  }

  @Bean
  public Step worldStep() {
    System.out.println("Execute worldStep method");
    return stepBuilderFactory.get("myWorldStep") // Specify any unique job name
      .tasklet(new MessageTasklet("World!")) // Specify Tasklet that will be run
      .build();
  }
}
```

## src/main/java/com/example/hello/MessageTasklet.java
```
package com.example.hello;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;

// Tasklet implementation class
@RequiredArgsConstructor // Automatic constructor generation by Lombok
public class MessageTasklet implements Tasklet {

  // output message
  private final String message;

  // Method that implements concrete processing
  @Override
  public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
    System.out.println("Message: " + message); // output message
    return RepeatStatus.FINISHED; // Returns a value that indicates that processing is complete
  }
}

```

# Build
```
$ gradle build
```

# Execute
## Execute `myFooJob`
```

$ java -jar build/libs/hello-batch-0.0.1.jar --spring.batch.job.names=myBarJob --logging.level.root=ERROR

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.2)

Execute fooJob method
Execute helloStep method
Execute barJob method
Execute worldStep method
Message: Hello!
Message: World!
```

## Execute all jobs
In the Spring Boot + Spring Batch configuration, all jobs will be executed unless `spring.batch.job.names` or `spring.batch.job.enabled = false` is specified.

```
$ java -jar build/libs/hello-batch-0.0.1.jar --logging.level.root=ERROR

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.2)

Execute fooJob method
Execute helloStep method
Execute barJob method
Execute worldStep method
Message: Hello!
Message: Hello!
Message: World!
```