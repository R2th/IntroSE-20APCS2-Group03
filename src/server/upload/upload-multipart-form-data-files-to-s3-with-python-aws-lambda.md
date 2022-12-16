# Upload multipart / form-data files to S3 with Python AWS Lambda
### Overview
Upload the multipart / form-data created via Lambda on AWS to S3.

I often see implementations that send files to S3 as they are with client, and send files as Blobs, but it is troublesome and many people use multipart / form-data for normal API (I think there are many), why to be Client when I had to change it in Api and Lambda.

### Repo
[Click here](https://github.com/Ntakuya/sam-multiple-form-data-sample/tree/feature/multipart-form)

# Too long, didn't read

1. Multipart / form-data Change to Form using cgi module
2. Get the file with the field name of responseBody from the Formed data

## 0. app.py looks like this at first
```
import json

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello world",
        }),
    }
```

## 1. Multipart / form-data Change the created data to Form data using cgi module
```
import json
import cgi
import io 
import logging # これは個人的に入れているのでほっておいていい
import base64

def get_file_from_request_body(headers, body):
    fp = io.BytesIO(base64.b64decode(body)) # decode
    environ = {"REQUEST_METHOD": "POST"}
    headers = {
        "content-type": headers["Content-Type"],
        "content-length": headers["Content-Length"],
    }

    fs = cgi.FieldStorage(fp=fp, environ=environ, headers=headers) # FieldStorageを利用してForm Dataとして扱う

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello world",
        }),
    }
```


## 2. Get the file with the field name of responseBody from the Formed data

It is assumed that the form of request is as follows.

* request.ts
```
{
    "file": File
}
```

* app.py
```
import json
import cgi
import io 
import logging
import base64

def get_file_from_request_body(headers, body):
    fp = io.BytesIO(base64.b64decode(body)) # decode
    environ = {"REQUEST_METHOD": "POST"}
    headers = {
        "content-type": headers["Content-Type"],
        "content-length": headers["Content-Length"],
    }

    fs = cgi.FieldStorage(fp=fp, environ=environ, headers=headers) 
    return [fs["file"], None]

def lambda_handler(event, context):
    
    file_item, file_item_error = get_file_from_request_body(
        headers=event["headers"], body=event["body"]
    )
　　 
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello world",
        }),
    }
```

It responded appropriately like this, but I think there is probably a better way to write it ...