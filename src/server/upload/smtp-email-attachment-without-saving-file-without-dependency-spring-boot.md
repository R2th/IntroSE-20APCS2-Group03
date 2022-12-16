Here is samle code & instuctions to send email attachment by converting the InputStream to byte array then converting byte array to Base64. 

### CSV atachment data
Lets initial data for csv atachment
```
List<String[]> data = new ArrayList<>();
        data.add(new String[]
                {"Id", "Content", "Score"});
        data.add(new String[]
                {"1", "Alpha", "10"});
        data.add(new String[]
                {"2", "Beta", "20"});
```

### Load csv file data into StringWriter

```
StringWriter stringWriter = new StringWriter();
PrintWriter printWriter = new PrintWriter(stringWriter);
CSVData.stream()
        .map(this::convertStringToCSV)
        .forEach(printWriter::println);
```

```
private String convertStringToCSV(String[] data) {
    return Stream.of(data)
            .map(s -> escapeSpecialCharacters(s))
            .collect(Collectors.joining(","));
}
```

### Send email attachment 

```
// setup SMTP
Properties props = new Properties();
props.put("mail.smtp.host", "smtp host");
props.put("mail.smtp.starttls.enable", "true");
props.put("mail.smtp.auth", "true");
props.put("mail.smtp.port", "port");

Session session = Session.getInstance(props,
        new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("smtp account", "smtp password");
            }
        });

Message message = new MimeMessage(session);

addListRecipient(sendToEmails, message, Message.RecipientType.TO);

message.setFrom(new InternetAddress("sender email"));
message.setSubject(subject);

// StringWriter to InputStream
InputStream inputStream = new ByteArrayInputStream(stringWriter.toString().getBytes());
// Convert to byte array
byte[] byteArray = IOUtils.toByteArray(inputStream);
// Convert to Base64
byte[] base64ByteArray = java.util.Base64.getEncoder().encode(byteArray);

InternetHeaders fileHeaders = new InternetHeaders();
fileHeaders.setHeader(StringConst.CONTENT_TRANSFER_ENCODING, StringConst.BASE64);

// Body content
MimeBodyPart mimeContent = new MimeBodyPart();
mimeContent.setContent("Email content here", "text/html;charset="utf-8"");

// Attachment
MimeBodyPart mimeAttachment = new MimeBodyPart(fileHeaders, base64ByteArray);
mimeAttachment.setFileName("filename.csv");

Multipart multipart = new MimeMultipart();
multipart.addBodyPart(mimeContent);
multipart.addBodyPart(mimeAttachment);

message.setContent(multipart);
Transport.send(message);
```