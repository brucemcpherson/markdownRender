'use strict';

/**
 * convert content to mark down
 * can take content=some text or url=someurl as either a post or a get
 * output is either html (default) or json {content:....} or jsonp if callback is specified
 * @return {HtmlOutput|ContentService} the converted text as htmlservice output
 */
function doGet(e) {
  return render ( e); 
}

function doPost(e) {
  return render (e)  
}
/**
 * converts some string content in markdown to html
 * @param {object} e parameters from doget/post
 * @return {HtmlOutput} the converted text
 */
function render(e) {

  var result, content;
  // some default params for testing
  e = e || {parameter:{}};
  var ouput = e.parameter.output || 'html';
  var callback = e.parameter.callback;
  
  if (e.parameter.url) {
    // get the content from a file
    result = cUrlResult.urlGet(e.parameter.url);
    content = result.success ? result.content : JSON.stringify(result);
  }
  else {
    content = e.parameter.content;
  }
  
  content = content || "No markdown text to convert from parameters:" + JSON.stringify(e);
  Logger.log(JSON.stringify(e));
  
  // do the converstion
  result = markdownToHtml(content);
  var markedUp = result.success ? result.content : JSON.stringify(result);
  
  // thanks to https://github.com/sindresorhus/github-markdown-css for the githib stylesheet
  var html = '<div class="markdown-body">' + HtmlService 
      .createTemplateFromFile("markdown")
      .evaluate()
      .getContent() + markedUp + '</div>';
  
  return output === "html" ? 
    HtmlService.createHtmlOutput( html).setSandboxMode(HtmlService.SandboxMode.IFRAME) :
    ContentService.createTextOutput(callback ? callback + "(" + html + ")" : html )
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON); 
    
}
/**
 * converts some string content in markdown to html
 * @param {string} the content
 * @return {object} a standard results object
 */
function markdownToHtml (content ) {

  //* use git hub api to convert markdown to html
    var gitApi = new cGitJsonApi.cGitJsonApi();
    return gitApi.markdownRender(content);
}
/**
 * Returns the contents of an HTML file.
 * @param {string} file The name of the file to retrieve.
 * @return {string} The content of the file.
 */
function include (file) {
  return HtmlService.createTemplateFromFile(file).evaluate().getContent();
}