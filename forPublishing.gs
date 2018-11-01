/**
 * becoming a little defunct
 * but here for backwards compat
 */
function getLibraryInfo () {

  return { 
    info: {
      name:'markdownRender',
      version:'0.0.1',
      key:'MSshIRY34MzV-v-J_3pw1Miz3TLx7pV4j',
      description:'render markdown as html',
      share:'https://script.google.com/d/1OPaje8bP9LdwuJB1zbnMJR2atIDWB3qdggEziadwZYWhfpIKrkIwssFz/edit?usp=sharing'
    },
    dependencies:[
      cGitJsonApi.getLibraryInfo()
    ]
  }; 
}


function showMyScriptAppResource(s) {
  try {
    return ScriptApp.getResource(s);
  }
  catch (err) {
    throw err + " getting script " + s;
  }
}
