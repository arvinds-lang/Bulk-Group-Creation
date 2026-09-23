function whoAmI() {
  // Find out what email is executing this code
  var scriptUser = Session.getEffectiveUser().getEmail();
  Logger.log("1. The script is executing under the account: " + scriptUser);
  
  // Find out what Workspace domains this account actually controls
  try {
    var domains = AdminDirectory.Domains.list('my_customer').domains;
    var domainNames = domains.map(function(d) { return d.domainName; }).join(", ");
    Logger.log("2. This account is pushing changes to these domains: " + domainNames);
  } catch (e) {
    Logger.log("2. Error fetching domain list. This account might not be a Super Admin!");
  }
}
