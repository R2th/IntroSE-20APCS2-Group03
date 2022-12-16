![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/11/secret-gb0fdff521_1920.jpeg?w=1920&ssl=1)
Exporting files is a frequently happen feature where the user could get their data out. 

Today, I will try to export the data to a zip file within multiple CSV files.

(Image by [Tayeb MEZAHDIA](https://pixabay.com/users/tayebmezahdia-4194100/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3037639) from Pixabay)

## Application Models
Assume we have the simplest libraries system where a book could belong to many libraries. 

The models like this

```python
class Library(models.Model):
    name = models.TextField()


class Book(models.Model):
    title = models.TextField()
    libraries = models.ManyToManyField(
        null=True,
        blank=True,
        to='Library',
        related_name='books'
    )
```
What we trying to do here is export a zip file, which includes many CSV files where each one presentation for a library, show a list of books in that library.

## Make the view to get export zip file
As usual, to create an API for download, we write a view allowing the GET method only. 

```python
import csv
import io
import zipfile
from wsgiref.util import FileWrapper
from django.http import StreamingHttpResponse
from rest_framework.views import APIView

class ExportZip(APIView):
    def get(self):
        csv_datas = self.build_multiple_csv_files()
        
        temp_file = io.BytesIO()
        with zipfile.ZipFile(
             temp_file, "w", zipfile.ZIP_DEFLATED
        ) as temp_file_opened:
            # add csv files each library
            for data in csv_datas:
                data["csv_file"].seek(0)
                temp_file_opened.writestr(
                    f"library_{data['library_name']}.csv",
                    data["csv_file"].getvalue()
                )

        temp_file.seek(0)
        
        # put them to streaming content response 
        # within zip content_type
        response = StreamingHttpResponse(
            FileWrapper(temp_file),
            content_type="application/zip",
        )

        response['Content-Disposition'] = 'attachment;filename=Libraries.zip'
        return response

    def build_multiple_csv_files(self):
        csv_files = []
        return csv_files
```

In the above view, we use the [zipfile module](https://docs.python.org/3/library/zipfile.html), which is a Python Standard Library for Data Compressing and Archiving. 

[zipfile.ZipFile](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile) allow us to open a zip file for writing to it, where the **file** can be a [file-like object](https://docs.python.org/3/library/io.html#module-io), specific in this case is **temp_file** is a binary I/O as **temp_file_opened**.

```python
class zipfile.ZipFile(
    file, mode='r', compression=ZIP_STORED, 
    allowZip64=True, compresslevel=None, 
    *, strict_timestamps=True
)
```

We open it in a context manager by the “**with**” statement then could make sure our zip is closed after the with statement’s suite is finished – even if an exception occurs. 

```python
temp_file = io.BytesIO()
with zipfile.ZipFile(
    temp_file, "w", zipfile.ZIP_DEFLATED
) as temp_file_opened:
    # write to zip file
```

Inside the context manager, we write CSV content file to the zip **temp_file_opened**, by method [writestr](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.writestr). 

```python
ZipFile.writestr(
    zinfo_or_arcname, data, 
    compress_type=None, compresslevel=None
)
```

At here we put two required parameters is the zinfo_or_arcname and data

```python
temp_file_opened.writestr(
    f"File_library_{file['lib']}.csv",
    file["csv_file"].getvalue()
)
```

After done on writing multiple CSV files, we [seek](https://docs.python.org/3/library/io.html#io.IOBase.seek) the zip file by seek then using [FileWrapper](http://filewrapper/) to convert the file-like objects to an iterator before returning them in the StreamingHttpResponse.

At this point, we could download an empty “Libraries.zip” file.

## Build list of csv files
As you can see we prepare a method named “***buildmultiplecsvfiles***” which returns the empty list above. At this step, we will put the code to this function to build a list of CSV files.

```python
class ExportLibraries(APIView):
    header_data = {
        "name": "Name",
        "library": "Library Name"
    }
    
    def get(self):
        ...
        return response

    def build_multiple_csv_files(self, libraries, books):
        csv_files = []
        
        for library in libraries.iterator():
            mem_file = io.StringIO()
            writer = csv.DictWriter(
                mem_file, fieldnames=self.header_data.keys()
            )
            writer.writerow(self.header_data)
            
            books_in_library = books.filter(libraries__in=[library.id])
            for book in books_in_library:
                book_row = self.build_book_row(book, library)
                writer.writerow(book_row)
            
            mem_file.seek(0)
            
            csv_files.append({
                "library_name": library.name,
                "csv_file": mem_file
            })
            
        return csv_files
    
    def build_book_row(self, book, library):
        row = self.header_data.copy()
        
        row["name"] = book.name
        row["library"] = library.name
        
        return row
```

Look at the above code, we go all libraries then build each CSV file by init a writer from csv.DictWriter() with the header_data’s keys, the header_data could be like this:

```python
header_data = {
    "name": "Book Name",
    "library": "Library Name"
}
```

After that, add the header to the writer, then use a loop to add all book row by row to the writer by call method .write_row() 

After finish on the writing, append each library an object within the name of the library to help set the CSV filename, along with the CSV file content.

You could do export by adding this view to the urls file. 

```python
urlpatterns = [
    path(
        'export_libraries/',
        ExportLibraries.as_view(),
        name="export_libraries"
    )
]
```

## Unit testing

Next question is, how to test the result?

This section should do before handling the logic, as by TDD(Test Driven Development), but I want to show up how the logic work first then it might be much easier on understanding which should be tested.

I plan to have two unit tests for this: 

– **One for the API:** call the API should get a zip file exported

– **One for the CSV files and content**: call build_multiple_csv_files on the view should return a list of each library data. At here, also could check the content on each CSV file by row.

**NOTE:** Please note that my UTs below are just a hint on what it looks like, and you should do base on your feature.


### Unit test: call API to export zip file
```python
def test_export_libraries(self):
    response = self.client.get(reverse('export_libraries'))
    assert response.status_code is status.HTTP_200_OK
    assert response.get('Content-Disposition') == "Libraries.zip"
```

This UT is quite simple, we just need to check to make sure the API call 200 and the file exported is a zip within the name as expected.

### Unit test: call view function to get csv files

```python
def test_build_csvs_files(self):
    # assume we mock 2 libraries
    # library_1, library_2
    # queryset is books and libraries
    view = ExportRecipesCost()
    view.request = drf_request_for_context(self.user)
    csv_files = view.build_multiple_csv_files(
        libraries, books
    )
    # check number of csv files
    assert len(csv_files) == 2
    # first csv file
    assert csv_files[0]["library_name"] == library_1.name
    assert csv_files[0]["csv_file"]
    # go check csv content in first file here

    # second csv file
    assert csv_files[0]["library_name"] == library_2.name
    assert csv_files[0]["csv_file"]
    # go check csv content in first file here
```

I left some comments on the code to let us know there are some data for the test and what we plan to do is call the view function within a mock DRF request(which create by util function **drf_request_for_context**.

Besides the number of CSV files return, we also could check on the CSV content file based on its header.


## Improve performance

In my solution, we use two loops, one for the libraries, and nested in that is the books for each library. The better solution is to prepare all books data no matter the libraries it belongs to the use this set of data on the loop of libraries. This could help reducing the performance.

Another thing that could improve is the process of export. Instead of sending the response data to StreamingHttpResponse to download from the browser, we could run the logic exporting as a background task(celery task for example). Once it has done, upload the zip file to s3 then give a way for user to download(url or connect to 3rd side). This flow could make user experiences better and to avoid a timeout error when data is too heavy.

Let try to use the hint, and if you have a better solution, share with me.

---

In summary, today, we take a look at the way(I called it is use Django queries) to export zip file within multiple CSV files inside in a Django app. 

There is a charming way where use pandas to export data from Django app, I hope I will have a chance to share with it you in the future.

Thanks for your reading.

BeautyOnCode.

<hr/>

[The origin blog post of this content](https://beautyoncode.com/giup-robot-reebord-vuot-thu-thach/) is on my personal blog. Welcome to visit!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!