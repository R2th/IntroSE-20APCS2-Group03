# 1. Overview
Đối với các package (gói) Android, có một số cách xuất bản thư viện mã nguồn mở, chẳng hạn như jitpack, maven và jcenter.

Dễ nhất là jitpack.io

Chỉ cần sao chép URL git repo của bạn và dán nó, và sau một vài cú nhấp chuột, bạn đã hoàn tất! Thế nhưng cũng như mọi thứ khác trong cuộc sống, bạn phải hy sinh một vài thứ để làm cho nó trở nên thật dễ dàng. 
Chúng ta cần phải thêm nó theo cách thủ công vào build.gradle (level Project) như được hiển thị bên dưới và chúng ta cũng không thể có toàn quyền kiểm soát phần mềm đã xuất bản của mình và cách nó được phân phối ra cộng đồng lập trình như chúng ta làm trong JCenter.

```java
maven {
    url 'https://maven.fabric.io/public'
}
```

Nếu bạn muốn tìm hiểu kho lưu trữ từ xa (remote repository) là gì và cách nó hoạt động, bạn có thể kiểm tra [tại đây](https://jfrog.com/knowledge-base/what-is-a-remote-repository-and-how-does-it-work/).

Bạn sẽ thắc mắc là tại sao chúng ta lại chọn JCenter mà không phải là Jitpack?

Chia sẻ thư viện trong JCenter khó hơn một chút so với Jitpack nhưng nó đi kèm với một số lợi thế lớn. Là một trong những trung tâm Maven phổ biến nhất, nó giới thiệu package của bạn cho một lượng lớn khán giả (audience), tuy nhiên, bạn vẫn có toàn quyền sở hữu và có thể kiểm soát cách package của bạn phát triển. Về cơ bản, bạn tải package của mình lên một trong các kho lưu trữ Maven công khai của mình và yêu cầu đưa nó vào JCenter. Sau khi được nhóm Bintray chấp thuận, package của bạn sẽ có thể tìm kiếm được trên JCenter và có sẵn miễn phí để tải xuống.

# 2. Publish your library

1. Đầu tiên, chúng ta sẽ cần phải publish project của mình trên Github.
2. Sau đó, chúng ta cần tạo một tài khoản trên [BintrayOss.](https://bintray.com/signup/oss). Nó phải là oss (open source plan)
3. Tại trang chính, click “Add New Repository”.

![](https://images.viblo.asia/c12c0c65-8752-4190-b4d0-e2828e374b84.jpeg)

4. Điền đầy đủ các thông tin bắt buộc
- **Name:** Tên thư viện
- **Type:** Kiểu Library :  nên đặt là Maven
- **Licenses:** Library licenses
- **Description:** mô tả về Library,  hãy chắc chắn rằng đây là một lời giải thích rõ ràng, rành mạch nhé.

![](https://images.viblo.asia/888a7b05-3a7d-4729-b683-1b6b6929e28f.png)


5. Chúng ta đã tạo thư viện. Bây giờ chúng ta nên tạo package (gói) cho thư viện. Nhấp vào “Add New Package”

![](https://images.viblo.asia/425bfff6-63e5-418c-b37a-23083896e0ee.jpeg)

6. Lại điền đầy đủ các thông tin bắt buộc:

- **Name:** Tên gói
- **Description:** mô tả
- **Licenses:**  Package licenses
- **Maturity:** Mô tả trạng thái phát triển của thư viện. Nếu đó là thư viện sẵn sàng sản xuất, bạn sẽ chọn “Official”, nếu không, bạn có thể chọn bất kỳ tùy chọn nào bạn cảm thấy gần với trạng thái của dự án nhất.
- **Website:** Git repo url of project.
- **Issue tracker:** Issues url hoặc git project repo
- **Version control:** Git repo with .git postfix

![](https://images.viblo.asia/168b4338-43ea-4997-8ffb-967bd6e8c576.jpeg)

Sau đó click “Create Package”.

7. Go to package page  sau đó click “New Version”.

![](https://images.viblo.asia/115b4a48-a43d-4307-a575-66e8797c1ac9.jpeg)

8. Set version của library  và sau đó click “Create Version”

![](https://images.viblo.asia/0e8b7c5e-5882-41f8-a37e-598e0566cd63.jpeg)

Đây là phần cuối của thiết lập Bintray. Bây giờ chúng ta sẽ thiết lập dự án của mình.

9. Đầu tiên, chúng ta nên thêm classpathes của Bintray và Maven vào gradle dependencies (level Project):

```java
dependencies {
    classpath "com.jfrog.bintray.gradle:gradle-bintray-plugin:1.8.4"
    classpath "com.github.dcendents:android-maven-gradle-plugin:2.1"
}
```

10. Sau đó, trong tệp thư viện build.gradle, chúng ta nên thêm một số trường cần thiết. Các trường này cần các tập lệnh tạo sẵn để tải thư viện lên bintray một cách dễ dàng.

```java
ext {
    bintrayRepo = 'TestLibrary' // Repo name in bintray dashboard
    bintrayName = 'com.example.testlibrary' // package name of the bintray repo

    publishedGroupId = 'com.example.testlibrary'   // this is the ID we want to see in implementation line
    libraryName = 'testlibrary'     // this is the module name of library
    artifact = 'testlibrary'        // this is the artifact we want to see in implementation line

    libraryDescription = 'Test project library description' // description of library

    siteUrl = 'https://github.com/mitsinsar/TestProject'    // git repo url
    gitUrl = 'https://github.com/mitsinsar/TestProject.git' // git repo vcs url

    libraryVersion = '1.0.3'      // library version

    developerId = 'msinansari'                // This is your bintray username
    developerName = 'Mithat Sinan Sari'              // Developer's name
    developerEmail = 'm.sinan.sari@gmail.com'                // Developer's email

    licenseName = 'The Apache Software License, Version 2.0'  // for example, The Apache Software License, Version 2.0
    licenseUrl = 'http://www.apache.org/licenses/LICENSE-2.0.txt'   // for example, http://www.apache.org/licenses/LICENSE-2.0.txt
    allLicenses = ["Apache-2.0"]    // array of licenses, for example, ["Apache-2.0"]
}
```

Đừng quên thêm “apply from x.gradle” vào cuối build.gradle của mô-đun thư viện.

publish.gradle là một tệp mà chúng ta sẽ tạo ở bước tiếp theo. Bây giờ, chỉ cần thêm đoạn mã bên dưới vào build.gradle của mô-đun của bạn.

```java
apply from: 'publish.gradle'
```

Sau đó, chúng ta cần tạo tệp gradle mới trong mô-đun thư viện và dán vào bên dưới ý chính để giúp chúng ta tải lên bintray một cách dễ dàng.

Ví dụ: publish.gradle.

```java
apply plugin: 'com.jfrog.bintray'
apply plugin: 'com.github.dcendents.android-maven'

version = libraryVersion
group = publishedGroupId    // Maven Group ID for the artifact

install {
    repositories.mavenInstaller {
        // This generates POM.xml with proper parameters
        pom {
            project {
                packaging 'aar'
                groupId publishedGroupId
                artifactId artifact

                // Add your description here
                name libraryName
                description libraryDescription
                url siteUrl

                // Set your license
                licenses {
                    license {
                        name licenseName
                        url licenseUrl
                    }
                }
                developers {
                    developer {
                        id developerId
                        name developerName
                        email developerEmail
                    }
                }
                scm {
                    connection gitUrl
                    developerConnection gitUrl
                    url siteUrl

                }
            }
        }
    }
}

task sourcesJar(type: Jar) {
    from android.sourceSets.main.java.srcDirs
    classifier = 'sources'
}

task javadoc(type: Javadoc) {
    source = android.sourceSets.main.java.srcDirs
    classpath += project.files(android.getBootClasspath().join(File.pathSeparator))
}

task javadocJar(type: Jar, dependsOn: javadoc) {
    classifier = 'javadoc'
    from javadoc.destinationDir
}
artifacts {
    archives javadocJar
    archives sourcesJar
}

// Bintray
Properties properties = new Properties()
properties.load(project.rootProject.file('local.properties').newDataInputStream())

bintray {
    user = properties.getProperty("bintray.user")
    key = properties.getProperty("bintray.apikey")

    configurations = ['archives']
    pkg {
        repo = bintrayRepo
        name = bintrayName
        desc = libraryDescription
        websiteUrl = siteUrl
        vcsUrl = gitUrl
        licenses = allLicenses
        publish = true
        publicDownloadNumbers = true
        version {
            desc = libraryDescription
            // Uncomment 4 lines below to enable gpg auto signing
            //gpg {
            //    sign = true //Determines whether to GPG sign the files. The default is false
            //    passphrase = properties.getProperty("bintray.gpg.password")
            //}
        }
    }
}
```

Cuối cùng, chúng ta cần thêm tên người dùng bintray và API Key vào tệp *local.properties* như hình dưới đây:

```java
bintray.user=###########
bintray.apikey=##############
```

Và bây giờ, chúng ta chỉ cần chạy command line dưới đây: 
- ./gradlew install
- ./gradlew bintrayUpload

>  **TRƯỜNG HỢP BUILD THẤT BẠI** <br> Thỉnh thoảng nó thất bại vì Javadoc. Đầu tiên bạn nên kiểm tra xem mọi thứ có chính xác không. Các ký tự không phải ascii cũng không build được. Nếu bạn chắc chắn rằng mọi thứ đều chính xác, thì bạn có thể disable Javadoc. Chỉ cần sao chép-dán phạm vi này vào thư viện build.gradle. <br> Bạn có thể xem [tại đây](https://docs.oracle.com/javase/8/docs/technotes/guides/javadoc/index.html) để tìm hiểu về Javadoc

```java
subprojects {
    tasks.withType(Javadoc).all { enabled = false }
}
```

> **IMPORTANT NOTE for 401 Unauthorized;** <br> Nếu bạn đang xuất bản thư viện của mình dưới một tổ chức (organisation), <br><br> Thứ nhất: Bạn nên sử dụng tên người dùng và khóa api của chủ sở hữu tổ chức <br><br> Thứ hai: Bạn nên đặt userOrg = ‘your_organisation_name’ trong publish.gradle <br><br> Thứ ba: Hoặc để có trường hợp sử dụng tốt hơn, hãy kiểm tra ý chính bên dưới

*This is in the library build.gradle*
```java
// This is in the library build.gradle
ext {
  ...
  userOrganisation = 'your_organisation_name'
  ...
}


// This is in publish.gradle
bintray {
  ...
    pkg {
      ...
      userOrg = userOrganisation
      ...
    }
}
```

Sau khi gọi hai command line trên theo thứ tự, (nếu mọi thứ đều đúng, nó sẽ thông báo  “Build Successful”). Sau đó, chúng ta sẽ có thể xem phiên bản mới nhất trong bảng điều khiển (dashboard);

![](https://images.viblo.asia/5900d63b-8bf8-4495-b980-0a2952fe1ffd.jpeg)

Sau khi click vào last version, chúng ta sẽ thấy  **“Version Publication Date”** và đoạn mã **“<dependency />”**.

![](https://images.viblo.asia/ce838b70-3fe3-4014-8f23-59a9dddc93db.jpeg)

Cuối cùng, chúng ta sẽ click vào nút “Add to JCenter”, viết mô tả thư viện và chờ phê duyệt. 

Sau khi được phê duyệt, nó sẽ được implemented giống như:

```java
dependecies {
    implementation 'com.example.testlibrary:testlibrary:1.0.3'
}
```

Vậy là xong rồi. :D

Thanks for reading.

Nguồn tham khảo: 
- https://blog.hipolabs.com/how-to-publish-library-on-jcenter-fdd60fa76b06