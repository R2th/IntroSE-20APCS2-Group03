![alt](http://i.imgur.com/2nsXHKP.png)
# Trong phần này tôi sẽ mô tả về ứng dụng đọc file epub
Trước khi đọc phần 2 này bạn nên đọc [Phần 1- Cấu trúc Epub](https://viblo.asia/p/tao-ung-dung-doc-sach-dien-tu-voi-epub-phan-1-cau-truc-epub-wjAM7abyvmWe) trước để nắm rõ được cấu trúc file EPUB như thế nào, tổ chức file ra sao.
## I. Mô tả về logic xử lý
### Bước 1. Đầu tiên khi bạn có file epub đã tải về trong máy thì sẽ phải tiến hành giải nén file epub
Nó cũng giống như bạn giải nén như 1 file zip ra.

![alt](https://i.imgur.com/61v51Qm.png)

Tương ứng đoạn code sẽ như sau:
```
 public static final void unzipAll(File zipFile, File targetDir) throws IOException {
        ZipInputStream zis = new ZipInputStream(new FileInputStream(zipFile));
        ZipEntry zentry = null;

        // if exists remove
        if (targetDir.exists()) {
            FileUtils.deleteDirectory(targetDir);
            targetDir.mkdirs();
        } else {
            targetDir.mkdirs();
        }

        // unzip all entries
        while ((zentry = zis.getNextEntry()) != null) {
            String fileNameToUnzip = zentry.getName();
            File targetFile = new File(targetDir, fileNameToUnzip);

            // if directory
            if (zentry.isDirectory()) {
                (new File(targetFile.getAbsolutePath())).mkdirs();
            } else {
                // make parent dir
                (new File(targetFile.getParent())).mkdirs();

                unzipEntry(zis, targetFile);
            }
        }
        zis.close();
    }
```
### Bước 2. vào trong folder META-INF để đọc file container.xml

![alt](https://i.imgur.com/aGt3ka9.png)

Trong file container.xml phải lấy ra được field `full-path="OEBPS/content.opf"` để link được file content.opf ở đâu

```
<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
   </rootfiles>
</container>
```
và đoạn code tương ứng

```
  @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes)
            throws SAXException {

        mStartTag = localName;

        if ("rootfile".equalsIgnoreCase(localName)) {
            String path = attributes.getValue("full-path");
            rootFilePath = path;
        }
    }
```
Hiện tại tôi đang dùng `org.xml.sax.helpers.DefaultHandler` trong thư viện [`commons-io:commons-io`](https://commons.apache.org/proper/commons-io/) để lọc file định dạng `XML`
### Bước 3. Lọc nội dung sách
từ link `OEBPS/content.opf` để tiếp tục đọc ra file `toc.ncx` (mục lục) và các thông số khác của sách như: tên sách, tác giả, và sách thuộc ngôn ngữ gì

Dưới đây là thông số:

```
<dc:title>Dế Mèn Phiêu Lưu Ký</dc:title>
<dc:creator opf:role="aut">Tô Hoài</dc:creator>
<dc:format>epub</dc:format>
<dc:coverage>images/cover.jpg</dc:coverage>
<dc:publisher>http://isach.info</dc:publisher>
<dc:identifier id="motsach_url">http://isach.info/story.php?story=de_men_phieu_luu_ky__to_hoai</dc:identifier>
<dc:language>vi</dc:language>
```
Trong file `content.opf` sẽ tiếp tục tìm ra link của file `toc.ncx` (mục lục)

`<item href="toc.ncx" id="ncx" media-type="application/x-dtbncx+xml" />`
Ở đây `toc.ncx` và `content.opf` đang nằm cùng nhau
Đoạn code cho việc lọc file **content.opf** trong `BookInfoSAXParser.java`

Và cụ thể cách lọc như sau:
```
@Override
    public void startElement(String uri, String localName, String qName,
                             Attributes attributes) throws SAXException {

        if ("dc:title".equalsIgnoreCase(qName)) {
            isTitle = true;
        }
        if ("dc:creator".equalsIgnoreCase(qName)) {
            isCreator = true;
        }
        if ("dc:publisher".equalsIgnoreCase(qName)) {
            isPublisher = true;
        }
        if ("dc:subject".equalsIgnoreCase(qName)) {
            isSubject = true;
        }

        if ("meta".equalsIgnoreCase(localName)) {
            if (attributes.getValue("name").equals("cover")) {
                cover_id = attributes.getValue("content");
            }
        }

        mStartTag = localName;
        if ("item".equalsIgnoreCase(localName)) {
            String id = attributes.getValue("id");
            if (id != null && id.equalsIgnoreCase(cover_id)) {
                bookInfo.coverPath = attributes.getValue("href");
            }
            String href = attributes.getValue("href");
            String mediaType = attributes.getValue("media-type");

            bookInfo.manifestList
                    .add(new EpubBook.Manifest(id, href, mediaType));

            // Get toc.ncx path
            if (!isFoundTOC && id.equalsIgnoreCase("ncx")) {
                bookInfo.tocPath = href;
                isFoundTOC = true;
            }
        } else if ("itemref".equalsIgnoreCase(localName)) {
            String idref = attributes.getValue("idref");
            bookInfo.spineList.add(idref);
        }
    }
```

### Bước 4. Lọc lấy các chương trong `toc.ncx`
Sau khi biết được link của file `toc.ncx` sẽ tiến hành lấy link các chương dưới định dạng `HTML`

File `toc.ncx` như sau:

```
<navPoint id="cover" playOrder="1"><navLabel><text>Bìa</text></navLabel><content src="cover.html" /></navPoint>
<navPoint id="title" playOrder="2"><navLabel><text>Tựa đề</text></navLabel><content src="title.html" /></navPoint>
<navPoint id="chapter_de_men_phieu_luu_ky__to_hoai_0001" playOrder="3"><navLabel><text>Chương 1/10</text></navLabel><content src="text/de_men_phieu_luu_ky__to_hoai_0001.html" /></navPoint>
<navPoint id="chapter_de_men_phieu_luu_ky__to_hoai_0002" playOrder="4"><navLabel><text>Chương 2/10</text></navLabel><content src="text/de_men_phieu_luu_ky__to_hoai_0002.html" /></navPoint>
<navPoint id="chapter_de_men_phieu_luu_ky__to_hoai_0003" playOrder="5"><navLabel><text>Chương 3/10</text></navLabel><content src="text/de_men_phieu_luu_ky__to_hoai_0003.html" /></navPoint>
............
```
Ở đây sẽ lấy được title của chương và đường dẫn của chương đó
### Bước 5. Hiển thị nội dung
Do nội dung truyện là file HTML nên tôi sẽ dùng `WebView` để hiển thị nội dung

**`mWebView.loadUrl( url);`**
Trong đó `url` được nối từ folder giải nén và path của chương đó
`"/storage/sdcard0/Download/de_men_phieu_luu_ky__to_hoai/OEBPS/" + "text/de_men_phieu_luu_ky__to_hoai_0001.html"`
Vậy tôi đã mô tả xong các bước làm đối với epub. Chi tiết bạn xem trong https://github.com/oTranThanhNghia/EpubReader để hiểu rõ hơn
## II. Demo app
Sau đây là 1 vài hình ảnh demo app

![alt](https://i.imgur.com/s8oZVfw.png)

![alt](https://i.imgur.com/avMlVUX.png)

# Lời kết
Tôi có một lời khuyên là muốn hiểu thật nhanh thì bạn hãy bắt đầu code ngay chứ đừng dừng lại ở đọc tài liệu. Chỉ có code mới giúp bạn hiểu rõ vấn đề và nhớ lâu được
Trong phần tiếp theo tôi sẽ trình bày rõ hơn về cách gọi function trong webview ra native và ngược lại để có thể dễ dàng xử lý sự kiện trong `WebView`. Xin cảm ơn !
# Tham khảo
1. Tạo ứng dụng đọc sách điện tử với EPUB (Phần 1- Cấu trúc Epub) https://viblo.asia/p/tao-ung-dung-doc-sach-dien-tu-voi-epub-phan-1-cau-truc-epub-wjAM7abyvmWe
2. Mẫu file epub https://github.com/oTranThanhNghia/EpubReader/blob/master/de_men_phieu_luu_ky__to_hoai.epub được lấy từ nguồn http://isach.info
3. Thư viện để lọc XML https://commons.apache.org/proper/commons-io/
4. Source code https://github.com/oTranThanhNghia/EpubReader
5. AndroidFileChooser https://github.com/MostafaNasiri/AndroidFileChooser