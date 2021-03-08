function getRecentlyDataStudioReportMessage(postSlacklConfig) {
  const reportTitle = postSlacklConfig.dataStudioReportTitle;
  const gmailThread = GmailApp.search(`from:data-studio-noreply@google.com subject:${reportTitle} `)
  const messages = gmailThread[0].getMessages();
  return messages[0]
}

function getAttachments(message) {
  return  message.getAttachments({includeInlineImages: true, includeAttachments: false})
}

function getPhotosData(attachments) {
  return attachments.map((attachment) => {
    return {
      blob: attachment.getAs(attachment.getContentType()),
      name: attachment.getName(),
      contentType: attachment.getContentType()
    }
  })
}

function postSlack(postSlacklConfig, photoData, isFirstPost) {
  console.log(photoData)
  var formData = {
    token: PropertiesService.getScriptProperties().getProperty("SLACK_TOKEN"),
    channels: postSlacklConfig.channels,
    content: photoData.blob,
    file: photoData.blob,
    fileName: photoData.name,
    fileType: photoData.contentType
  };

  if(isFirstPost) {
    formData.initial_comment =  `<${postSlacklConfig.dataStudioReportURL}|${postSlacklConfig.initialComment}>`
  }

  var options = {
    'method' : 'post',
    'payload' : formData
  };
  
  const response = UrlFetchApp.fetch('https://slack.com/api/files.upload', options);
  console.log(response.getContentText())
}

function main() {
  const configs = getPostSlackConfigsByGmailAddress(Session.getActiveUser().getEmail());
  configs.forEach((config) => {
    const message = getRecentlyDataStudioReportMessage(config);
    const attachments = getAttachments(message);
    const photosData = getPhotosData(attachments);
    photosData.forEach((photoData, index) => {
      const isFirstPost = index === 0 ? true : false;
      postSlack(config, photoData, isFirstPost)
    })
  })

}