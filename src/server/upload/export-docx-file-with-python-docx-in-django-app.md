Exporting files is a frequently happen feature where the user could get their data out.  As the backend side, my Django app could help me export a docx file by using a library named python-docx.

## Install python-docx and get basic knowledge

Install python-docx is super simple with one command:

> pip install python-docx

If you are working on docker and have a **requirement.txt** file where you add all your libs on it, don’t forget to add “python-docx” version to it. 

You could get exactly the version installed by calling the command “pip freeze” to get the list of libs name and version, then find out the python-docx one.

> python-docx==0.8.10

Before going into detail about the way we create a view to export docx file by python-docx. It’s will help  if you could take a look at the [official document of python-docx](https://python-docx.readthedocs.io/en/latest/) first.

## Make the view to get export docx file

As usual, to create an API for download, we write a view with allowing GET method only. 

```python
class ExportDocx(APIView):
    def get(self, request, *args, **kwargs):
        # create an empty document object
        document = Document()

        # save document info
        buffer = io.BytesIO()
        document.save(buffer)  # save your memory stream
        buffer.seek(0)  # rewind the stream

        # put them to streaming content response 
        # within docx content_type
        response = StreamingHttpResponse(
            streaming_content=buffer,  # use the stream's content
            content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )

        response['Content-Disposition'] = 'attachment;filename=Test.docx'

        return response
```

After creating an empty document, we need to save them and send it to the response. Python-docx has Document.save() method which accepts a stream instead of a file name. Thus, we could initialize an io.BytesIO() object to save the document info, then dump that to the user.

We use StreamingHttpResponse to load heavy data and use content_type **“application/vnd.openxmlformats-officedocument.wordprocessingml.document”** for docx file.

At this point, we could download .docx file name Test.docx and see empty content in it.

## Build detailed content to the document

After step downloading an empty docx file, we start on building the content for the docx. Please follow the document of python-docx.

Basically, you could add header text by use “document.add_heading()” method and some paragraphs by using “document.add_paragraph()” method.

If you want to style the text, you could add_run to a paragraph. 

For example, I created a build_document() method where build all content in document:

```python
def build_document(self):
    document = Document() 

    # add a header
    document.add_heading("This is a header")

    # add a paragraph
    document.add_paragraph("This is a normal style paragraph")

    # add a paragraph within an italic text then go on with a break.
    paragraph = document.add_paragraph()
    run = paragraph.add_run()
    run.italic = True
    run.add_text("text will have italic style")
    run.add_break()
    
    return document
```

then I will replace creating an empty document in the view by: 

> document = self.build_document()

And here is the result export for now:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/04/Screen-Shot-2021-04-10-at-22.34.48.png?w=1280&ssl=1)

### Build html content by using HTMLParser within document

Basically, I could export docx file within content in it.  Fistly, I am simply add it within the paragraph:

```python
# add paragraph for html content
document.add_paragraph("<p>Nice to see Prep note 2</p><ul><li>Prep note 2 content 1</li><li>Prep note 2 content 2</li></ul>")
```

But there was weird display when I have a field save as html.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/04/Screen-Shot-2021-04-10-at-22.44.35.png?w=1280&ssl=1)

So, I need to figure out a way to convert HTML content to text and keep it basic style like italic, bold or bullet points, like so:

```
Nice to see Prep note 2
        ●    Prep note 2 content 1
        ●    Prep note 2 content 2
```

After some researches, I know there is a python lib called “[html.parser — Simple HTML and XHTML parse](https://docs.python.org/3/library/html.parser.html)” and follow an example to create a class named DocumentHTMLParser to handle it like this:

```python
class DocumentHTMLParser(HTMLParser):
    """
    Document Within HTML Parser
    """
    def __init__(self, document):
        """
        Override __init__ method
        """
        HTMLParser.__init__(self)
        self.document = document
        self.paragraph = None
        self.run = None

    def add_paragraph_and_feed(self, html):
        """
        Custom method where add paragraph and feed
        """
        self.paragraph = self.document.add_paragraph()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        """
        Override handle_starttag method
        """
        self.run = self.paragraph.add_run()

        if tag in ["ul"]:
            self.run.add_break()
        if tag in ["li"]:
            self.run.add_text(u'        \u2022    ')

    def handle_endtag(self, tag):
        """
        Override handle_endtag method
        """
        if tag in ["li"]:
            self.run.add_break()

    def handle_data(self, data):
        """Override handle_data method"""
        self.run.add_text(data)def build_document(self):
        """Build content document"""
        document = Document()
        doc_html_parser = DocumentHTMLParser(document)

        # add a header
        document.add_heading("This is a header")

        # add a paragraph
        document.add_paragraph("This is a normal style paragraph")

        # add a paragraph within an italic text then go on with a break.
        paragraph = document.add_paragraph()
        run = paragraph.add_run()
        run.italic = True
        run.add_text("text will have italic style")
        run.add_break()
        
        # with html content, call method add_paragraph_and_feed tui build content
        html_content = "<p>Nice to see Prep note 2</p><ul><li>Prep note 2 content 1</li><li>Prep note 2 content 2</li></ul>"
        doc_html_parser.add_paragraph_and_feed(html_content)
```

Above code, in general, we go override function in class HTMLParser then use run of the paragraph to custom style by the tag start on. If the tag needs to break on end then we adding a break for it.

Then I use this custom class in my view to handle the html content:

```python
def build_document(self):
    """Build content document"""
    document = Document()
    doc_html_parser = DocumentHTMLParser(document)
    
    # like above for header, paragraph
    
    # with html content, call method add_paragraph_and_feed tui build content
    html_content = "<p>Nice to see Prep note 2</p>\n<ul>\n<li>Prep note 2 content 1</li>\n<li>Prep note 2 content 2</li>\n</ul>"
    doc_html_parser.add_paragraph_and_feed(html_content)

    return document
```

And this is the result on docx of the html content:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/04/Screen-Shot-2021-04-10-at-22.59.45.png?w=1280&ssl=1)

## Unit Testing
On the backend side, unit testing is a very important part where help you protect your application. Within my project, each pull request requires a higher 80% on testing, then writing unit tests is a required part. We use [factory_boy](https://factoryboy.readthedocs.io/en/stable/), [pytest](https://docs.pytest.org/en/stable/) as libraries helping on write unit test,  if you want to know what they are, feel free to check out links before going on.

About this part, I am not focusing on how to use them or write a unit test on a Django application. I just simply make sure my exported docx file has the correct name, type and the file includes enough of the content and style I expect.

### Unit test for general content response
I called checking the status response, content type and file name of the file exported are general contents

```python
def test_export_docx_general(self):
        """
        Ensure general content like
        status response, content type, file name exported correctly
        """
        response = self.client.get(reverse("export_docx"))
        import pdb;pdb.set_trace()
```
As using `import pdb;pdb.set_trace()` after calling the GET request on unit test, I could check the current data, here’s is what it looks like:

```
<django.http.response.StreamingHttpResponse object at 0x7fc392a61990>
(Pdb) response.status_code
200
(Pdb) response.streaming_content
<map object at 0x7fc3927aadd0>
(Pdb) response.streaming_content.__dir__()
['__getattribute__', '__iter__', '__next__', '__new__', '__reduce__', '__doc__', '__repr__', '__hash__', '__str__', '__setattr__', '__delattr__', '__lt__', '__le__', '__eq__', '__ne__', '__gt__', '__ge__', '__init__', '__reduce_ex__', '__subclasshook__', '__init_subclass__', '__format__', '__sizeof__', '__dir__', '__class__']
(Pdb) response.get("Content-Type")
'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
(Pdb) response.get("Content-Disposition")
'attachment;filename=Recipe_Pho_2021-04-15-14-34-09.docx'
```

As you could see, I could continue writing my unit test for general content like this:

```
def test_export_docx_general(self):
        """
        Ensure general content like
        status response, content type, file name exported correctly
        """
        response = self.client.get(reverse("export_docx"))
        assert response.status_code == status.HTTP_200_OK
        assert response.get("Content-Type") == \
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        filename = response.get("Content-Disposition").split("=")
        assert filename == "Test.docx"
```

Please notice the “response.streaming_content” above, it shows as a map object without any kind of data for testing. 

I was stuck a bit on how I could test exactly the content in the document and the style. I researched around but could not find a relevant solution. Then I decided to think about it by myself, and below is my solution for testing the built document.


### Unit test for the document built

I created a function for building the document named “build_document” on code, it’s stated for testing now:

```python
def build_document(self):
        """Build content document"""
        document = Document()
        doc_html_parser = DocumentHTMLParser(document)

        # with html content, call method add_paragraph_and_feed tui build content
        html_content = "<p>Nice to see Prep note 2</p><ul><li>Prep note 2 content 1</li><li>Prep note 2 content 2</li></ul>"
        doc_html_parser.add_paragraph_and_feed(html_content)
```
Then my solution is to call this function directly for testing on a mocking view. 

Here is how it looks on the test function:

```python
def test_build_document_for_docx(self):
        """Ensure document built content and style correctly"""
        # inline import just for you know where they are
        from django.http import HttpRequest
        from rest_framework.request import Request as DRFRequest

        # mock drf request
        request = HttpRequest()
        request.method = 'GET'
        drf_request = DRFRequest(request)
        drf_request.user = self.user

        # mock view with request
        view = ExportRecipesDocx()
        view.request = request

        # call function in view directly
        document = view.build_document()
        import pdb;pdb.set_trace()
```

Again, I check the document profile, here is an example of what I did, I just curious loving to check to see what they are 🥰

```python
(Pdb) document
<docx.document.Document object at 0x7fd5e65140a0>
(Pdb) document._body.paragraphs
[<docx.text.paragraph.Paragraph object at 0x7fd5e5d5fb50>]
(Pdb) document._body.paragraphs[0].runs
[<docx.text.run.Run object at 0x7fd5e5e419d0>, <docx.text.run.Run object at 0x7fd5e5eba6d0>, <docx.text.run.Run object at 0x7fd5e5eba410>, <docx.text.run.Run object at 0x7fd5e5eba3d0>]
(Pdb) document._body.paragraphs[0].runs[0].text
'Nice to see Prep note 2\n'
(Pdb) document._body.paragraphs[0].runs[0].style.name
'Default Paragraph Font'
(Pdb) document._body.paragraphs[0].runs[0].style.priority
1
(Pdb) document._body.paragraphs[0].runsp[1].text
```

Within my current build_document method, I know that I build a paragraph and some runs into it, also have some adding break where I handle the start/endtag of HTML.

And here is my final version on testing the document content and styles:

```
def test_build_document_for_docx(self):
        """Ensure document built content and style correctly"""
        # mock request and view initialize like above code
        # ...
        # call function in view directly
        document = view.build_document()

        paragraphs = document._body.paragraphs
        assert len(paragraphs) == 1
        assert paragraphs[0].style.name == "Normal"
        assert paragraphs[0].style.priority is None
        assert [
            'Nice to see Prep note 2',
            '\n',
            '        •    Prep note 2 content 1\n',
            '        •    Prep note 2 content 2\n'
        ] == [item.text for item in paragraphs[0].runs]
        assert {None} == {item.italic for item in paragraphs[0].runs}
        assert {None} == {item.bold for item in paragraphs[0].runs}
```
        

Exporting in a Django app is interesting and Python also has many useful libraries for handling the content format. 

We just go through a simple example on exporting docx files within a Django app. If you know another better way and/or anything looks not quite right, please let me know in the comment.

As usual, [the origin of this post is on my personal blog](https://beautyoncode.com/export-docx-file-with-python-docx-in-django-app/)

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