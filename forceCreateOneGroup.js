function forceCreateOneGroup() {
  var testEmail = "1511323@racketlonindia.co.in";
  
  try {
    var newGroup = { 
      email: testEmail, 
      name: "1511323", 
      description: "For Darwin" 
    };
    
    var result = AdminDirectory.Groups.insert(newGroup);
    Logger.log("SUCCESS! Group actually created. ID: " + result.id);
    
  } catch (e) {
    Logger.log("FAILED. The API rejected the creation: " + e.message);
  }
}
