### I. Giới thiệu.
Chào các bạn, Google Translate là một trong những công cụ phổ biến nhất hiện nay, và hầu như ai trong chúng ta cũng đã dùng đến nó.
Trong bài viết này, chúng ta sẽ cùng sử dụng  Google Translate API để xây dựng một ứng dụng dịch ngôn ngữ cho riêng mình, đặc biệt API này được cung cấp miễn phí và không giới hạn lượt request, hãy cùng bắt đầu !
### II. Configuration 
1. Đầu tiên, tạo một project mới trong android studio bằng cách chọn File > New project 
2. Tiếp theo, đi đến file Android Manifest và thêm dòng sau để khai báo quyền truy cập Internet. 
```
    <uses-permission android:name="android.permission.INTERNET"/>
```
3.  Sau đó chuyển đến file Gradle và thêm dòng sau 
```
useLibrary 'org.apache.http.legacy'
```
### III. Implement
Bây giờ, để đơn giản chúng ta sẽ tạo class translate_api extends AsyncTask để có thể tạo kết nối Network gọi đến google translate API. Nếu bạn muốn tìm hiểu thêm về AsyncTask thì có thể xem ở [đây](https://developer.android.com/reference/android/os/AsyncTask)

Source code:
```
public class translate_api extends AsyncTask<String, String, String> {
    private OnTranslationCompleteListener listener;
    @Override
    protected String doInBackground(String... strings) {
        String[] strArr = (String[]) strings;
        String str = "";
        try {
            String encode = URLEncoder.encode(strArr[0], "utf-8");
            StringBuilder sb = new StringBuilder();
            sb.append("https://translate.googleapis.com/translate_a/single?client=gtx&sl=");
            sb.append(strArr[1]);
            sb.append("&tl=");
            sb.append(strArr[2]);
            sb.append("&dt=t&q=");
            sb.append(encode);
            HttpResponse execute = new DefaultHttpClient().execute(new HttpGet(sb.toString()));
            StatusLine statusLine = execute.getStatusLine();
            if (statusLine.getStatusCode() == 200) {
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                execute.getEntity().writeTo(byteArrayOutputStream);
                String byteArrayOutputStream2 = byteArrayOutputStream.toString();
                byteArrayOutputStream.close();
                JSONArray jSONArray = new JSONArray(byteArrayOutputStream2).getJSONArray(0);
                String str2 = str;
                for (int i = 0; i < jSONArray.length(); i++) {
                    JSONArray jSONArray2 = jSONArray.getJSONArray(i);
                    StringBuilder sb2 = new StringBuilder();
                    sb2.append(str2);
                    sb2.append(jSONArray2.get(0).toString());
                    str2 = sb2.toString();
                }
                return str2;
            }
            execute.getEntity().getContent().close();
            throw new IOException(statusLine.getReasonPhrase());
        } catch (Exception e) {
            Log.e("translate_api",e.getMessage());
            listener.onError(e);
            return str;
        }
    }
    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        listener.onStartTranslation();
    }
    @Override
    protected void onPostExecute(String text) {
        listener.onCompleted(text);
    }
    public interface OnTranslationCompleteListener{
        void onStartTranslation();
        void onCompleted(String text);
        void onError(Exception e);
    }
    public void setOnTranslationCompleteListener(OnTranslationCompleteListener listener){
        this.listener=listener;
    }
}
```

Bước tiếp theo, chúng ta sẽ tạo giao diện đơn giản để dịch văn bản cho ứng dụng. Trong layout này, ta có ba EditText, một TextView, và một Button. 
EditText đầu tiên dành cho text input, EditText thứ hai là để lấy mã ngôn ngữ cho văn bản sẽ được dịch,  EditText thứ ba dành cho mã ngôn ngữ mà bạn muốn dịch thành.

Source code: 
```
<?xml version="1.0" encoding="utf-8"?>
<ScrollView android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:android="http://schemas.android.com/apk/res/android">
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <LinearLayout
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <EditText
            android:id="@+id/text"
            android:hint="Enter text here.."
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
        <EditText
            android:id="@+id/from_lang"
            android:hint="Enter from language code"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
        <EditText
            android:id="@+id/to_lang"
            android:hint="Enter to language code"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
        <TextView
            android:text="Translated Text:"
            android:textSize="25sp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
        <TextView
            android:id="@+id/translated_text"
            android:padding="10dp"
            android:textSize="25sp"
            android:layout_width="match_parent"
            android:minHeight="100dp"
            android:layout_height="wrap_content"/>
        <Button
            android:id="@+id/btnTranslate"
            android:text="Translate"
            android:layout_gravity="center_horizontal"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
    </LinearLayout>
</RelativeLayout>
</ScrollView>
```

Cuối cùng là sử dụng class translate_api trong class MainActivity

```
public class MainActivity extends AppCompatActivity {

    EditText text,fromLangCode,toLangCode;
    TextView translatedText;
    Button btnTranslate;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initUi();
        btnTranslate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                translate_api translate=new translate_api();
                translate.setOnTranslationCompleteListener(new translate_api.OnTranslationCompleteListener() {
                    @Override
                    public void onStartTranslation() {
                        // here you can perform initial work before translated the text like displaying progress bar
                    }

                    @Override
                    public void onCompleted(String text) {
                        // "text" variable will give you the translated text
                        translatedText.setText(text);
                    }

                    @Override
                    public void onError(Exception e) {

                    }
                });
                translate.execute(text.getText().toString(),fromLangCode.getText().toString(),toLangCode.getText().toString());
            }
        });
    }

    private void initUi() {
        text=findViewById(R.id.text);
        fromLangCode=findViewById(R.id.from_lang);
        toLangCode=findViewById(R.id.to_lang);
        translatedText=findViewById(R.id.translated_text);
        btnTranslate=findViewById(R.id.btnTranslate);
    }
}
```
### IV. Language ISO Code list
Thay vì phải nhập chính xác từng loại ngôn ngữ, có thể nhập sai hoặc bất tiện với một số loại có tên dài, thì chúng ta có danh sách code iso cho từng ngôn ngữ, điều này giúp chúng ta dễ dàng hơn trong việc dịch, danh sách khá dài nhưng đầy đủ.
```
Abkhazian
ab

Afar
aa

Afrikaans
af

Akan
ak

Albanian
sq

Amharic
am

Arabic
ar

Aragonese
an

Armenian
hy

Assamese
as

Avaric
av

Avestan
ae

Aymara
ay

Azerbaijani
az

Bambara
bm

Bashkir
ba

Basque
eu

Belarusian
be

Bengali (Bangla)
bn

Bihari
bh

Bislama
bi

Bosnian
bs

Breton
br

Bulgarian
bg

Burmese
my

Catalan
ca

Chamorro
ch

Chechen
ce

Chichewa, Chewa, Nyanja
ny

Chinese
zh

Chinese (Simplified)
zh-Hans

Chinese (Traditional)
zh-Hant

Chuvash
cv

Cornish
kw

Corsican
co

Cree
cr

Croatian
hr

Czech
cs

Danish
da

Divehi, Dhivehi, Maldivian
dv

Dutch
nl

Dzongkha
dz

English
en

Esperanto
eo

Estonian
et

Ewe
ee

Faroese
fo

Fijian
fj

Finnish
fi

French
fr

Fula, Fulah, Pulaar, Pular
ff

Galician
gl

Gaelic (Scottish)
gd

Gaelic (Manx)
gv

Georgian
ka

German
de

Greek
el

Greenlandic
kl

Guarani
gn

Gujarati
gu

Haitian Creole
ht

Hausa
ha

Hebrew
he

Herero
hz

Hindi
hi

Hiri Motu
ho

Hungarian
hu

Icelandic
is

Ido
io

Igbo
ig

Indonesian
id, in

Interlingua
ia

Interlingue
ie

Inuktitut
iu

Inupiak
ik

Irish
ga

Italian
it

Japanese
ja

Javanese
jv

Kalaallisut, Greenlandic
kl

Kannada
kn

Kanuri
kr

Kashmiri
ks

Kazakh
kk

Khmer
km

Kikuyu
ki

Kinyarwanda (Rwanda)
rw

Kirundi
rn

Kyrgyz
ky

Komi
kv

Kongo
kg

Korean
ko

Kurdish
ku

Kwanyama
kj

Lao
lo

Latin
la

Latvian (Lettish)
lv

Limburgish ( Limburger)
li

Lingala
ln

Lithuanian
lt

Luga-Katanga
lu

Luganda, Ganda
lg

Luxembourgish
lb

Manx
gv

Macedonian
mk

Malagasy
mg

Malay
ms

Malayalam
ml

Maltese
mt

Maori
mi

Marathi
mr

Marshallese
mh

Moldavian
mo

Mongolian
mn

Nauru
na

Navajo
nv

Ndonga
ng

Northern Ndebele
nd

Nepali
ne

Norwegian
no

Norwegian bokmål
nb

Norwegian nynorsk
nn

Nuosu
ii

Occitan
oc

Ojibwe
oj

Old Church Slavonic, Old Bulgarian
cu

Oriya
or

Oromo (Afaan Oromo)
om

Ossetian
os

Pāli
pi

Pashto, Pushto
ps

Persian (Farsi)
fa

Polish
pl

Portuguese
pt

Punjabi (Eastern)
pa

Quechua
qu

Romansh
rm

Romanian
ro

Russian
ru

Sami
se

Samoan
sm

Sango
sg

Sanskrit
sa

Serbian
sr

Serbo-Croatian
sh

Sesotho
st

Setswana
tn

Shona
sn

Sichuan Yi
ii

Sindhi
sd

Sinhalese
si

Siswati
ss

Slovak
sk

Slovenian
sl

Somali
so

Southern Ndebele
nr

Spanish
es

Sundanese
su

Swahili (Kiswahili)
sw

Swati
ss

Swedish
sv

Tagalog
tl

Tahitian
ty

Tajik
tg

Tamil
ta

Tatar
tt

Telugu
te

Thai
th

Tibetan
bo

Tigrinya
ti

Tonga
to

Tsonga
ts

Turkish
tr

Turkmen
tk

Twi
tw

Uyghur
ug

Ukrainian
uk

Urdu
ur

Uzbek
uz

Venda
ve

Vietnamese
vi

Volapük
vo

Wallon
wa

Welsh
cy

Wolof
wo

Western Frisian
fy

Xhosa
xh

Yiddish
yi, ji

Yoruba
yo

Zhuang, Chuang
za

Zulu
zu
```

### V. Conclusion 
Như vậy là chúng ta đã thực hiện xong các bước sử dụng Google Translation API để xây dựng app dịch ngôn ngữ cho riêng mình, các bạn cũng có thể custom lại giao diện phù hợp theo ý muốn. 
Hy vọng các bạn có thể sử dụng nó cho riêng mình hoặc xây dựng như một phần chức năng cho app của các bạn (như là đọc sách, tìm kiếm, dịch văn bản...)

Cảm ơn các bạn đã đọc, xin chào và hẹn gặp lại.

Source code đầy đủ: [Link github](https://github.com/MuhammadSaudKhan/LanguageTranslator)

Bài viết có tham khảo [nguồn](https://medium0.com/swlh/free-use-google-translate-api-in-android-with-no-limit-70977726d7cf)