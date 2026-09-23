function createCompleteGroups() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Loop through rows (skipping row 1 headers)
  for (var i = 1; i < data.length; i++) {
    var email = data[i][0];       
    var name = data[i][1];        
    var ownerEmail = data[i][2];  
    var desc = data[i][3];        
    
    var statusCell = sheet.getRange(i + 1, 5); 
    
    // Also check if status is already "Success" so you can re-run safely without repeating rows
    var currentStatus = statusCell.getValue();
    if (!email || currentStatus === "Success") continue; 
    
    var cleanGroupEmail = email.toString().trim();
    
    try {
      // 1. Create the Group
      try {
        var newGroup = { email: cleanGroupEmail, name: name.toString(), description: desc.toString() };
        AdminDirectory.Groups.insert(newGroup);
        Utilities.sleep(1000); 
      } catch (creationError) {
        if (!creationError.message.includes("Entity already exists")) {
          throw new Error("Creation failed: " + creationError.message);
        }
      }
      
      // 2. Apply Settings
      var groupSettings = {
        whoCanPostMessage: "ANYONE_CAN_POST", 
        isArchived: "true",
        allowExternalMembers: "true" 
      };
      AdminGroupsSettings.Groups.patch(groupSettings, cleanGroupEmail);
      
      // 3. Add Multiple Owners (Splits by comma and loops through each email)
      if (ownerEmail) {
        var emailArray = ownerEmail.toString().split(',');
        
        for (var j = 0; j < emailArray.length; j++) {
          var cleanOwnerEmail = emailArray[j].trim();
          
          if (!cleanOwnerEmail) continue; // Skip if there's a stray trailing comma
          
          var memberDetails = {
            email: cleanOwnerEmail,
            role: "OWNER"
          };
          
          try {
            AdminDirectory.Members.insert(memberDetails, cleanGroupEmail);
          } catch (memberError) {
            if (!memberError.message.includes("Entity already exists")) {
               throw new Error("Failed to add owner " + cleanOwnerEmail + ": " + memberError.message);
            }
          }
        }
      }
      
      // Update Column E with Success
      statusCell.setValue("Success");
      
    } catch (e) {
      // Update Column E with the exact error message
      statusCell.setValue("Error: " + e.message);
    }
  }
}
