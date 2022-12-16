# Giới thiệu  
Trong lập trình android chúng ta đã quen thuộc với thư viện Retrofit 2 để  nhận và gửi JSON từ một WebService nhưng
 trong bài viết này chúng ta  sử dụng  Retrofit 2  để download một file từ WebService
 
 URL : http://repo1.maven.org/maven2/com/squareup/retrofit/retrofit/2.0.0-beta2/retrofit-2.0.0-beta2-javadoc.jar
 
 

# Bắt đầu
## Thêm các Dependencies cần thiết cho project

Trong project mình add  thêm extensions của kotlin để hiểu rõ hơn anh em tham khảo tại (https://kotlinlang.org/docs/tutorials/android-plugin.html)
      
```
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:27.1.1'
    implementation 'com.android.support.constraint:constraint-layout:1.1.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'

    // Android
    compile 'com.android.support:recyclerview-v7:27.1.0'
    ''
    compile 'com.android.support:support-annotations:26.1.0'
    compile 'com.android.support:cardview-v7:27.1.0'
    compile 'com.android.support:design:27.1.0'

    // RxJava
    compile 'io.reactivex.rxjava2:rxjava:2.0.1'
    compile 'io.reactivex.rxjava2:rxandroid:2.0.1'

    // Retrofit
    compile 'com.squareup.retrofit2:retrofit:2.3.0'
    compile 'com.squareup.retrofit2:converter-gson:2.1.0'
    // RxJava adapter for retrofit
    compile 'com.squareup.retrofit2:adapter-rxjava2:2.2.0'

}

```

## Thêm Permissions cần thiết cho Manifest

Trong project mình cần 2  Permissions  từ hệ thống là : internet và ghi file vào external storage
     

```
  
  <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

```

## Xây dựng API Service
  
  Anh em chú ý annotation   "@Streaming"  :  được sử dung khi download các file có dung lượng lớn  
     đồng thời cần sử dụng một thread để sử lí dữ liệu
     trong  ví dụ này mình sử dụng ASyncTask 
   Chú ý **nếu không sử dung thread Android sẽ sinh ra  exception :  android.os.NetworkOnMainThreadException **   

```
 interface ApiService {
  
    @Streaming
    @GET("/maven2/com/squareup/retrofit/retrofit/2.0.0-beta2/retrofit-2.0.0-beta2-javadoc.jar")
    fun downloadFileWithFixedUrl(): Call<ResponseBody>
   
    @Streaming
    @GET
    fun downloadFileWithDynamicUrlSync(@Url fileUrl: String): Call<ResponseBody>
}

```


## Xây dựng Các phương thức chính

Trong phương thức trên mình sử dụng thêm AsyncTask để sử lí nhận và sử lí dữ liệu nhận về từ server

###  Gọi request và sử lí dữ liệu

```

fun downloadFile() {
        Log.d("downloadFile", "start")
        val retrofit = Retrofit.Builder()
                .baseUrl(Constants.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

        val service = retrofit.create(ApiService::class.java!!)

        val call = service.downloadFileWithFixedUrl()

        call.enqueue(object : Callback<ResponseBody> {

            override fun onResponse(call: Call<ResponseBody>?, response: Response<ResponseBody>?) {
                try {
                    if (response?.isSuccessful == true) {
                        val execute = object : AsyncTask<Void, Void, Void>() {
                            override fun doInBackground(vararg voids: Void): Void? {
                                val writtenToDisk = writeResponseBodyToDisk(response.body(), "retrofit-2.0.0-beta2-javadoc.jar")
                                Log.d("download", "file download was a success? $writtenToDisk")
                                 return null
                            }
                        }.execute()
                    }else {
             Log.d(TAG, "server contact failed");
           }
 
                } catch (e: IOException) {
                    Log.d("onResponse", "There is an error")
                    e.printStackTrace()
                }
            }

            override fun onFailure(call: Call<ResponseBody>?, t: Throwable?) {
                Log.d("onFailure", t.toString())
            }
        })

    }
    
```


### Đọc và Lưu file đã download vào  trong Disk
  
   ResponseBody là luồng dữ liệu đầu vào của chúng ta
 . Sau đó, chúng ta sử dụng  OutputStream để ghi dữ liệu vào một file
   và inputStream để đọc các  byte và mảng các bytes

```
private fun writeResponseBodyToDisk(body: ResponseBody?, fileName: String): Boolean {
        try {
            // todo change the file location/name according to your needs

            var retrofitBetaFile = File(getExternalFilesDir(null).toString() + File.separator + fileName)
            Log.e("retrofitBetaFile", retrofitBetaFile.path)
            var inputStream: InputStream? = null
            var outputStream: OutputStream? = null

            try {
                val fileReader = ByteArray(4096)

                val fileSize = body?.contentLength()
                var fileSizeDownloaded: Long = 0

                inputStream = body?.byteStream()
                outputStream = FileOutputStream(retrofitBetaFile)

                while (true) {
                    val read = inputStream!!.read(fileReader)
                    //Nó được sử dụng để trả về một ký tự trong mẫu ASCII. Nó trả về -1 vào cuối tập tin.
                    if (read == -1) {
                        break
                    }
                    outputStream!!.write(fileReader, 0, read)
                    fileSizeDownloaded += read.toLong()
                    Log.d("writeResponseBodyToDisk", "file download: $fileSizeDownloaded of $fileSize")
                }

                outputStream!!.flush()

                return true
            } catch (e: IOException) {
                return false
            } finally {
                if (inputStream != null) {
                    inputStream!!.close()
                }

                if (outputStream != null) {
                    outputStream!!.close()
                }
            }
        } catch (e: IOException) {
            return false
        }
    }
    
```

## Source Code

https://github.com/oTongXuanAn/retrofit2_download_file
# Refereces

https://futurestud.io/tutorials/retrofit-2-how-to-download-files-from-server