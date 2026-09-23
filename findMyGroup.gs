function findMyGroup() {
  var testEmail = "123456787654@domain.in";
  
  try {
    var group = AdminDirectory.Groups.get(testEmail);
    Logger.log("SUCCESS: The API can see this group!");
    Logger.log("Group Name: " + group.name);
    Logger.log("Admin Account ID: " + group.adminCreated);
  } catch (e) {
    Logger.log("ERROR: The API cannot see this group either. Message: " + e.message);
  }
}

