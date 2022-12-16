# Confirmed running environment
* Windows10
* WSL(Ubuntu 18.04.4 LTS)
* Python 3.7.7
* icrawler 0.6.3

Apparently due to the change in Google's specifications, there are  problems that crawling from Google's search engine does not work

This time (July 18, 2020), some code changes in the latest version succeeded in crawling

Crawling from Bing and Baidu is working, so you don't have to worry about Google.

If you really want to crawl from Google, try the method at the bottom of the page

# Installing icrawler
Taking a look at https://pypi.org/project/icrawler/

> pypi v0.6.3
> 
> Anaconda Cloud 0.6.2

is written, `pypi` is newer so we will install using `pip`

```
pip install icrawler
```
Check install status
```
python -c 'import icrawler as ic;print(ic.__version__)'
```

# Using icrawler

Let's do this and crawl Bing's search engine first

* bing_sample.py

```
from icrawler.builtin import BingImageCrawler

bing_crawler = BingImageCrawler(storage={'root_dir': 'download'})
bing_crawler.crawl(keyword='cat', max_num=5)
```
```
$ python bing_sample.py
INFO - icrawler.crawler - start crawling...
INFO - icrawler.crawler - starting 1 feeder threads...
INFO - feeder - thread feeder-001 exit
INFO - icrawler.crawler - starting 1 parser threads...
INFO - icrawler.crawler - starting 1 downloader threads...
INFO - parser - parsing result page https://www.bing.com/images/async?q=cat&first=0
INFO - downloader - image #1    https://ak3.picdn.net/shutterstock/videos/3647543/thumb/12.jpg
INFO - downloader - image #2    https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/11/24/16/cat.jpg
INFO - downloader - image #3    https://images.wagwalkingweb.com/media/articles/cat/degeneration-iris-eye/degeneration-iris-eye.jpg
INFO - downloader - image #4    https://www.pethealthnetwork.com/sites/default/files/content/images/my-cat-aggressive-fb-501276867.jpg
INFO - downloader - image #5    http://s1.ibtimes.com/sites/www.ibtimes.com/files/2017/11/13/cat.jpg
INFO - downloader - downloaded images reach max num, thread downloader-001 is ready to exit
INFO - downloader - thread downloader-001 exit
INFO - icrawler.crawler - Crawling task done!
```

Check current directory

```
$ ls download
000001.jpg  000002.jpg  000003.jpg  000004.jpg  000005.jpg
```

A directory with the specified name will be created in the current folder

The specified number of images of the cat have been downloaded

Let's now crawl Google's search engine

* google_samply.py

```
from icrawler.builtin import GoogleImageCrawler

google_crawler = GoogleImageCrawler(storage={'root_dir': 'download'})
google_crawler.crawl(keyword='cat', max_num=5)
```

```
$ python google_sample.py
2020-07-18 21:59:49,783 - INFO - icrawler.crawler - start crawling...
2020-07-18 21:59:49,783 - INFO - icrawler.crawler - starting 1 feeder threads...
2020-07-18 21:59:49,785 - INFO - feeder - thread feeder-001 exit
2020-07-18 21:59:49,785 - INFO - icrawler.crawler - starting 1 parser threads...
2020-07-18 21:59:49,787 - INFO - icrawler.crawler - starting 1 downloader threads...
2020-07-18 21:59:50,646 - INFO - parser - parsing result page https://www.google.com/search?q=cat&ijn=0&start=0&tbs=&tbm=isch
Exception in thread parser-001:
Traceback (most recent call last):
  File "/home/yossy/anaconda3/envs/py37/lib/python3.7/threading.py", line 926, in _bootstrap_inner
    self.run()
  File "/home/yossy/anaconda3/envs/py37/lib/python3.7/threading.py", line 870, in run
    self._target(*self._args, **self._kwargs)
  File "/home/yossy/anaconda3/envs/py37/lib/python3.7/site-packages/icrawler/parser.py", line 104, in worker_exec
    for task in self.parse(response, **kwargs):
  File "/home/yossy/anaconda3/envs/py37/lib/python3.7/site-packages/icrawler/builtin/google.py", line 157, in parse
    meta = json.loads(txt)
  File "/home/yossy/anaconda3/envs/py37/lib/python3.7/json/__init__.py", line 348, in loads
    return _default_decoder.decode(s)
  File "/home/yossy/anaconda3/envs/py37/lib/python3.7/json/decoder.py", line 337, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
  File "/home/yossy/anaconda3/envs/py37/lib/python3.7/json/decoder.py", line 355, in raw_decode
    raise JSONDecodeError("Expecting value", s, err.value) from None
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

2020-07-18 21:59:54,788 - INFO - downloader - no more download task for thread downloader-001
2020-07-18 21:59:54,789 - INFO - downloader - thread downloader-001 exit
2020-07-18 21:59:54,792 - INFO - icrawler.crawler - Crawling task done!
```

Error !?

Apparently the parser is not working well due to Google's specification change...

I checked to see if there was a person who was in trouble with a similar error, and I found a person who seemed to manage to solve it!

https://github.com/hellock/icrawler/issues/65

The following code works for me. Hope it could help you.

```
def parse(self, response):
    soup = BeautifulSoup(
        response.content.decode('utf-8', 'ignore'), 'lxml')
    #image_divs = soup.find_all('script')
    image_divs = soup.find_all(name='script')
    for div in image_divs:
        #txt = div.text
        txt = str(div)
        #if not txt.startswith('AF_initDataCallback'):
        if 'AF_initDataCallback' not in txt:
            continue
        if 'ds:0' in txt or 'ds:1' not in txt:
            continue
        #txt = re.sub(r"^AF_initDataCallback\({.*key: 'ds:(\d)'.+data:function\(\){return (.+)}}\);?$",
        #             "\\2", txt, 0, re.DOTALL)
        #meta = json.loads(txt)
        #data = meta[31][0][12][2]
        #uris = [img[1][3][0] for img in data if img[0] == 1]

        uris = re.findall(r'http.*?\.(?:jpg|png|bmp)', txt)
        return [{'file_url': uri} for uri in uris]
```

Apply this fix into the library

Check the icralwer path

```
$ python -c 'import icrawler as ic;print(ic.__file__)'
/home/yossy/anaconda3/envs/py37/lib/python3.7/site-packages/icrawler/__init__.py
```

Change the corresponding code:
```
$ cd /home/yossy/anaconda3/envs/py37/lib/python3.7/site-packages/icrawler/builtin
$ vi google.py
```

The difference after the change is

* change.diff

```
diff --git a/google.py b/google.py
index bfec04c..b46798a 100644
--- a/google.py
+++ b/google.py
@@ -141,24 +141,27 @@ class GoogleFeeder(Feeder):

 class GoogleParser(Parser):

-    def parse(self, response):
-        soup = BeautifulSoup(
-            response.content.decode('utf-8', 'ignore'), 'lxml')
-        image_divs = soup.find_all('script')
-        for div in image_divs:
-            txt = div.string
-            if txt is None or not txt.startswith('AF_initDataCallback'):
-                continue
-            if 'ds:1' not in txt:
-                continue
-            txt = re.sub(r"^AF_initDataCallback\({.*key: 'ds:(\d)'.+data:function\(\){return (.+)}}\);?$",
-                         "\\2", txt, 0, re.DOTALL)
-
-            meta = json.loads(txt)
-            data = meta[31][0][12][2]
-
-            uris = [img[1][3][0] for img in data if img[0] == 1]
-            return [{'file_url': uri} for uri in uris]
+   def parse(self, response):
+       soup = BeautifulSoup(
+           response.content.decode('utf-8', 'ignore'), 'lxml')
+       #image_divs = soup.find_all('script')
+       image_divs = soup.find_all(name='script')
+       for div in image_divs:
+           #txt = div.text
+           txt = str(div)
+           #if not txt.startswith('AF_initDataCallback'):
+           if 'AF_initDataCallback' not in txt:
+               continue
+           if 'ds:0' in txt or 'ds:1' not in txt:
+               continue
+           #txt = re.sub(r"^AF_initDataCallback\({.*key: 'ds:(\d)'.+data:function\(\){return (.+)}}\);?$",
+           #             "\\2", txt, 0, re.DOTALL)
+           #meta = json.loads(txt)
+           #data = meta[31][0][12][2]
+           #uris = [img[1][3][0] for img in data if img[0] == 1]
+           
+           uris = re.findall(r'http.*?\.(?:jpg|png|bmp)', txt)
+           return [{'file_url': uri} for uri in uris]


 class GoogleImageCrawler(Crawler):
 ```
 
 If you don't want to fix it by hand, copy the above code
Paste around ~/diff/change.txt and execute the following command

`$ patch < ~/diff/change.diff`

Retry Google Search Engine Crawling

* google_sample.py

```
from icrawler.builtin import GoogleImageCrawler

google_crawler = GoogleImageCrawler(storage={'root_dir': 'download'})
google_crawler.crawl(keyword='cat', max_num=5)
```

```
$ python google_sample.py
2020-07-20 23:50:31,295 - INFO - icrawler.crawler - start crawling...
2020-07-20 23:50:31,296 - INFO - icrawler.crawler - starting 1 feeder threads...
2020-07-20 23:50:31,298 - INFO - feeder - thread feeder-001 exit
2020-07-20 23:50:31,299 - INFO - icrawler.crawler - starting 1 parser threads...
2020-07-20 23:50:31,302 - INFO - icrawler.crawler - starting 1 downloader threads...
2020-07-20 23:50:32,330 - INFO - parser - parsing result page https://www.google.com/search?q=cat&ijn=0&start=0&tbs=&tbm=isch
2020-07-20 23:50:32,864 - INFO - downloader - image #1  https://ichef.bbci.co.uk/news/410/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg
2020-07-20 23:50:37,042 - INFO - downloader - image #2  https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png
2020-07-20 23:50:37,252 - INFO - downloader - image #3  https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg
2020-07-20 23:50:40,720 - INFO - downloader - image #4  https://cdnuploads.aa.com.tr/uploads/Contents/2020/05/14/thumbs_b_c_88bedbc66bb57f0e884555e8250ae5f9.jpg
2020-07-20 23:50:41,437 - INFO - downloader - image #5  https://news.cgtn.com/news/77416a4e3145544d326b544d354d444d3355444f31457a6333566d54/img/37d598e5a04344da81c76621ba273915/37d598e5a04344da81c76621ba273915.jpg
2020-07-20 23:50:41,846 - INFO - downloader - downloaded images reach max num, thread downloader-001 is ready to exit
2020-07-20 23:50:41,847 - INFO - downloader - thread downloader-001 exit
2020-07-20 23:50:42,313 - INFO - icrawler.crawler - Crawling task done!
```

Confirm inside directory

```
$ ls download
000001.jpg  000002.jpg  000003.jpg  000004.jpg  000005.jpg
```

Google search engine crawling succeed !

However, there is a possibility that crawling will not be possible again due to a change in search engine specifications.
In that case, check whether similar problems occur.

https://github.com/hellock/icrawler