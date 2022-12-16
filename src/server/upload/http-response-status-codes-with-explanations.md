HTTP Status Codes or Response Codes are grouped into five categories.

* 1×× Informational
* 2×× Success
* 3×× Redirection
* 4×× Client Error
* 5×× Server Error

This post contains the full list of HTTP status codes with a short description of the most common response codes.

When we do API testing, usually the first thing that we check on the response from an API call is the status code. It is essential that we are familiar with at least the most common status codes so we can identify issues quicker.


### 1×× Informational
The 1xx (Informational) class of status code indicates an interim response for communicating connection status or request progress prior to completing the requested action and sending a final response.

* **100** Continue
* **101** Switching Protocols
* **102** Processing

### 2×× Success
The 2xx (Successful) class of status code indicates that the client’s request was successfully received, understood, and accepted.

**Most common 2×× success HTTP status codes**

**200 OK**
The 200 (OK) status code indicates that the request has succeeded. The payload sent in a 200 response depends on the request method.

**201 Created**
The 201 (Created) status code indicates that the request has been fulfilled and has resulted in one or more new resources being created.

**204 No Content**
The 204 (No Content) status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response payload body.

**Other 2××**

* **202** Accepted
* **203** Non-authoritative Information
* **205** Reset Content
* **206** Partial Content
* **207** Multi-Status
* **208** Already Reported
* **226** IM Used

### 3×× Redirection
The 3xx (Redirection) class of status code indicates that further action needs to be taken by the user agent in order to fulfill the request.

**Most common 3×× redirection HTTP status codes**

**301 Moved Permanently**
The 301 (Moved Permanently) status code indicates that the target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.

**302 Found**
The 302 (Found) status code indicates that the target resource resides temporarily under a different URI.

**Other 3××**

* **304** Not Modified
* **300** Multiple Choices
* **303** See Other
* **305** Use Proxy
* **307** Temporary Redirect
* **308** Permanent Redirect

### 4×× Client Error
The 4xx (Client Error) class of status code indicates that the client seems to have erred.

**Most common 4×× client error HTTP status codes**

**400 Bad Request**
The 400 (Bad Request) status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax).

**401 Unauthorized**
The 401 (Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.

**403 Forbidden**
The 403 (Forbidden) status code indicates that the server understood the request but refuses to authorize it.

**404 Not Found**
The 404 (Not Found) status code indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.

**405 Method Not Allowed**
The 405 (Method Not Allowed) status code indicates that the method received in the request-line is known by the origin server but not supported by the target resource.

**415 Unsupported Media Type**
The 415 (Unsupported Media Type) status code indicates that the origin server is refusing to service the request because the payload is in a format not supported by this method on the target resource. The format problem might be due to the request’s indicated Content-Type or Content-Encoding, or as a result of inspecting the data directly.

**Other 4××**

* **402** Payment Required
* **406** Not Acceptable
* **407** Proxy Authentication Required
* **408** Request Timeout
* **409** Conflict
* **410** Gone
* **411** Length Required
* **412** Precondition Failed
* **413** Payload Too Large
* **414** Request-URI Too Long
* **416** Requested Range Not Satisfiable
* **417** Expectation Failed
* **418** I’m a teapot
* **421** Misdirected Request
* **422** Unprocessable Entity
* **423** Locked
* **424** Failed Dependency
* **426** Upgrade Required
* **428** Precondition Required
* **429** Too Many Requests
* **431** Request Header Fields Too Large
* **444** Connection Closed Without Response
* **451** Unavailable For Legal Reasons
* **499** Client Closed Request

### 5×× Server Error
The 5xx (Server Error) class of status code indicates that the server is aware that it has erred or is incapable of performing the requested method.

**Most common 5×× server errors HTTP status codes**

**500 Internal Server Error**
The 500 (Internal Server Error) status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.

**502 Bad Gateway**
The 502 (Bad Gateway) status code indicates that the server while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.

**503 Service Unavailable**
The 503 (Service Unavailable) status code indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.

**504 Gateway Timeout**
The 504 (Gateway Timeout) status code indicates that the server while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.

**Other 5××**

* **501** Not Implemented
* **505** HTTP Version Not Supported
* **506** Variant Also Negotiates
* **507** Insufficient Storage
* **508** Loop Detected
* **510** Not Extended
* **511** Network Authentication Required
* **599** Network Connect Timeout Error

```
Ref: 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
https://www.testingexcellence.com
```