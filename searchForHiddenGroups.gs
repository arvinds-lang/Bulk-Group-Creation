function searchForHiddenGroups() {
  try {
    var response = AdminDirectory.Groups.list({
      customer: 'my_customer',
      query: "email:1511*", 
      maxResults: 15
    });
    
    var groups = response.groups;
    if (groups && groups.length > 0) {
      Logger.log("FOUND " + groups.length + " MATCHING GROUPS:");
      for (var i = 0; i < groups.length; i++) {
        // The brackets will reveal if there is a space at the end of the email
        Logger.log("Name: " + groups[i].name + " | Email: [" + groups[i].email + "]");
      }
    } else {
      Logger.log("No groups starting with 1511 found at all. The directory is truly empty.");
    }
  } catch (e) {
    Logger.log("Error: " + e.message);
  }
}
