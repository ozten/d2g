"use strict";

var path = require("path");

module.exports = {
  derFilePath: path.join(__dirname, "config-for-phone.der"),
  keystorePath: path.join(__dirname, "my-d2g-keystore.ks"),

  keygenParams: {
    alias : "Acme",
    commonName: "Acme Co TEST",
    organizationUnit: "Apps",
    organization: "Acme Org",
    city: "Acmetown",
    state: "CA",
    countryCode: "US",
    store_password: "keystorepassword",
    alias_password: "aliaspassword"
  }
};

module.exports.keygenParams.keystore = module.exports.keystorePath;