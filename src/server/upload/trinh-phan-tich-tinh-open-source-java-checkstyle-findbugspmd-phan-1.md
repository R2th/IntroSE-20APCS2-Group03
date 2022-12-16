Chất lượng code là hết sức quan trọng nhưng thường như bị bỏ qua khi ở khía cạnh phát triển ứng dụng.  Nó thực sự quan trọng khi bạn làm việc trong một team với một dự án lớn.

Khi chúng ta làm việc trong một team thật sự khó để mọi thành viên  đều biết và sử dụng đúng bộ quy ước đặt tên và formats code theo đúng hướng dẫn . Để giải quyết vấn đề này, chúng ta có thể sử dụng các công cụ như Checkstyle, Findbugs, PMD và Android Lint

**Tại sao chúng ta lên sử dụng ?**

Lợi ích  :
- Giúp phát hiện lỗi tiềm tàng mà ngay cả việc kiểm thử và kiểm tra thủ công đều có thể bị bỏ lỡ hay thiếu xót.
- Đặt ra những quy tắc cụ thể.
- Quét toàn bộ dự án của bạn, bao gồm cả những tập tin mà bạn có thể là chưa từng đọc.

Khi chúng ta thiệt lập tools trên, chúng ta thường muốn 2 thứ :

1. Phát hiện càng nhiều khuyết điểm thì càng tốt
2. Sẽ lỗi nếu một số vẫn đề được tìm thấy.

Nhưng 2 yêu cầu này khó để đáp ứng ở những dự án cũ. Nhất là khi bạn lần đầu thiết lập và chạy Checkstyle , Findbugs, FMD, Lint trong dự án cũ , bạn sẽ không thể sửa hết toàn bộ cùng 1 lúc mà bạn phải ứng biến với từng trường hợp.

**Cấu hình**

Bởi vì bài hướng dẫn này mình tạo dưới dạng các plugin của Gradle mà chúng ta có thể đẩy lên Github kèm theo và cùng sử dụng 1 Gradle duy nhất để gom tất cả chúng lại. Bây giờ chúng ta cùng hãy tạo 1 folder để chứa tất cả chúng để dùng nào .

Bây giờ chúng ta hãy mở Android Studio vào bên trong module app (Nhớ là bạn hãy để chế độ xem là Project nhé :) ) tạo 1 thư mục mới và đặt tên cho nó là config. Thư mục này sẽ chứa tất cả các tập tin xml và nó cũng sẽ có một tập tin quality.gradle sẽ chạy tất cả các tác vụ phân tích code tĩnh đó cho cúng ta.

![](https://images.viblo.asia/ae4b358a-d9a8-49c6-ba7a-939b8e1b2f41.png)

và sau cùng chúng ta chỉ cần làm 1 việc rất là đơn giản . Bạn truy xuất vào tập tin build.gradle trong thư mục app và thêm vào dòng code như bên dưới như sau :

`apply from: '../config/quality/quality.gradle'`

Phần 1 này mình sẽ nói cho các bạn về CheckStyle 

**CheckStyle **

Checkstyle là một mã nguồn mở được duy trì bởi cộng đồng. Vậy có nghĩ là bạn có thể điều chỉnh file xml để có thể phù hợn vs nhu cầu của bạn cần.  

```
// incorrect 
private final static String thisError = "THIS ERROR";
 
// correct
private final static String THIS_ERROR = "THIS ERROR";
```

**Thêm Checkstyle vào Android studio**

Chúng ta sẽ tạo một số quy tắc cấu hình Checkstyle mà sẽ chạy trên code của chún ta như sau :

```
<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
    "-//Puppy Crawl//DTD Check Configuration 1.3//EN"
    "http://www.puppycrawl.com/dtds/configuration_1_3.dtd">
<module name = "Checker">
    <property name="charset" value="UTF-8"/>
    <property name="severity" value="error"/>
    <module name="FileTabCharacter">
        <property name="eachLine" value="true"/>
    </module>
    <module name="TreeWalker">
        <!-- Imports -->
        <module name="RedundantImport">
            <property name="severity" value="error"/>
        </module>
        <module name="AvoidStarImport">
            <property name="severity" value="error"/>
        </module>
        <!-- General Code Style -->
        <module name="LineLength">
            <property name="max" value="100"/>
            <property name="ignorePattern" value="^package.*|^import.*|a href|href|http://|https://|ftp://"/>
        </module>
        <module name="EmptyBlock">
            <property name="option" value="TEXT"/>
            <property name="tokens" value="LITERAL_TRY, LITERAL_FINALLY, LITERAL_IF, LITERAL_ELSE, LITERAL_SWITCH"/>
        </module>
        <module name="EmptyCatchBlock">
            <property name="exceptionVariableName" value="expected"/>
        </module>
        <module name="LeftCurly">
            <property name="maxLineLength" value="100"/>
        </module>
        <module name="RightCurly">
            <property name="option" value="alone"/>
            <property name="tokens" value="CLASS_DEF, METHOD_DEF, CTOR_DEF, LITERAL_FOR, LITERAL_WHILE, LITERAL_DO, STATIC_INIT, INSTANCE_INIT"/>
        </module>
        <module name="RightCurly">
            <property name="option" value="same"/>
        </module>
        <module name="NoFinalizer"/>
        <module name="ArrayTypeStyle"/>
        <module name="ModifierOrder"/>
        <module name="Indentation">
            <property name="basicOffset" value="4"/>
            <property name="braceAdjustment" value="0"/>
            <property name="caseIndent" value="4"/>
            <property name="throwsIndent" value="4"/>
            <property name="lineWrappingIndentation" value="8"/>
            <property name="arrayInitIndent" value="2"/>
        </module>
        <!-- White Space -->
        <module name="GenericWhitespace">
            <message key="ws.followed"
                     value="GenericWhitespace ''{0}'' is followed by whitespace."/>
            <message key="ws.preceded"
                     value="GenericWhitespace ''{0}'' is preceded with whitespace."/>
            <message key="ws.illegalFollow"
                     value="GenericWhitespace ''{0}'' should followed by whitespace."/>
            <message key="ws.notPreceded"
                     value="GenericWhitespace ''{0}'' is not preceded with whitespace."/>
        </module>
        <module name="WhitespaceAround">
            <property name="allowEmptyConstructors" value="true"/>
            <property name="allowEmptyMethods" value="false"/>
            <property name="allowEmptyTypes" value="false"/>
            <property name="allowEmptyLoops" value="false"/>
            <message key="ws.notFollowed"
                     value="WhitespaceAround: ''{0}'' is not followed by whitespace. Empty blocks may only be represented as '{}' when not part of a multi-block statement (4.1.3)"/>
            <message key="ws.notPreceded"
                     value="WhitespaceAround: ''{0}'' is not preceded with whitespace."/>
            <property name="severity" value="error"/>
        </module>
        <module name="WhitespaceAfter">
            <property name="tokens" value="COMMA, SEMI, TYPECAST"/>
        </module>
        <module name="NoWhitespaceBefore">
            <property name="tokens" value="SEMI, DOT, POST_DEC, POST_INC"/>
            <property name="allowLineBreaks" value="true"/>
        </module>
        <module name="NoWhitespaceAfter">
            <property name="tokens" value="BNOT, DEC, DOT, INC, LNOT, UNARY_MINUS, UNARY_PLUS"/>
            <property name="allowLineBreaks" value="true"/>
        </module>
        <!-- Naming -->
        <module name="PackageName">
            <property name="format" value="^[a-z]+(\.[a-z][a-z0-9]*)*$"/>
            <message key="name.invalidPattern"
                     value="Package name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="MethodName">
            <property name="format" value="^[a-z][a-z0-9][a-zA-Z0-9_]*$"/>
            <message key="name.invalidPattern"
                     value="Method name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="TypeName">
            <message key="name.invalidPattern"
                     value="Type name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="MemberName">
            <property name="applyToPublic" value="false" />
            <property name="applyToPackage" value="false" />
            <property name="applyToProtected" value="false" />
            <property name="format" value="^m[A-Z][a-z0-9][a-zA-Z0-9]*$"/>
            <message key="name.invalidPattern"
                     value="Member name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="ParameterName">
            <property name="format" value="^[a-z][a-zA-Z0-9]*$"/>
            <message key="name.invalidPattern"
                     value="Parameter name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="LocalVariableName">
            <property name="tokens" value="VARIABLE_DEF"/>
            <property name="format" value="^[a-z][a-zA-Z0-9]*$"/>
            <property name="allowOneCharVarInForLoop" value="true"/>
            <message key="name.invalidPattern"
                     value="Local variable name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="ClassTypeParameterName">
            <property name="format" value="(^[A-Z][0-9]?)$|([A-Z][a-zA-Z0-9]*[T]$)"/>
            <message key="name.invalidPattern"
                     value="Class type name ''{0}'' must match pattern ''{1}''."/>
        </module>
        <module name="MethodTypeParameterName">
            <property name="format" value="(^[A-Z][0-9]?)$|([A-Z][a-zA-Z0-9]*[T]$)"/>
            <message key="name.invalidPattern"
                     value="Method type name ''{0}'' must match pattern ''{1}''."/>
        </module>
    </module>
</module>
```


Để có thể chạy được Checkstyle , chúng ta cần phải tạo 1 gradle.  Ví thế chúng ta cần phải truy xuất vào file quality.gradle , và thêm một số dòng code sau :

```
task checkstyle(type: Checkstyle, group: 'Verification', description: 'Runs code style checks') {
    configFile file("$qualityConfigDir/checkstyle/checkstyle-config.xml")
    source 'src'
    include '**/*.java'

    reports {
        xml.enabled = true
        xml {
            destination "$reportsDir/checkstyle/checkstyle.xml"
        }
    }

    classpath = files( )
}
```

Các thuộc tính mà chúng ta cần để ý như sau :

**configFile** : tập tin cấu hình Checkstyle cần sử dụng

**include** : Bộ các mẫu sẽ bao gồm

**exclude** : Bộ các mẫu không bao gồm. Trong trường hợp này , chúng ta không quét các lớp được tạo ra. 


Cuối cùng chúng ta chỉ cần chạy script Gradle bằng cách truy xuất vào cửa sổ công cụ gradle trong Android Studio như hình bên dưới :

![](https://images.viblo.asia/90da2e07-6cfb-4950-a32f-5368c173be85.png)
    
và kết quả bạn nhận được ở bên dưới ở console như sau :

![](https://images.viblo.asia/2dc1794b-ab2e-42db-b253-ea7c8f03331b.png)

Phần 2 mình sẽ chỉ thêm cho các bạn thêm : FindBugs, PMD, Java Lint.
Cám ơn các bạn đã đọc bài viết của mình ạ. có sai xót gì các bạn comment bên dưới để mình cải thiện hơn ạ

Tài liệu tham khảo : 
https://medium.com/@a_lapshin/how-to-start-using-code-quality-tools-in-legacy-android-project-96acf7e9ca7b

https://medium.com/@LiudasSurvila/writing-checkstyle-rules-with-android-studio-b1d31b30ca3a

https://www.youtube.com/watch?v=RAC_VRj2bcM