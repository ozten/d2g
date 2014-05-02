# d2g Specification

## Introduction

Distribute to Gecko (d2g) is a webapp that makes it easier
to allow beta testers to try out privileged apps,
while they are still under development.

## Target Audiences
d2g services two main audiences

* developers
* beta testers

## Use Cases

### Developer Use Cases

A developer signs into d2g with Persona.

A developer uploads their privileged app (zip file) which
creates or updates a project.

A developer shares the install link to the latest version of their app
with their beta testers via their email client or other communication
medium.

A developer can see their list of projects and navigate to a specific project.

### Beta Tester Use Cases

A beta tester provisions their phone to be a testing device.
They follow instructions from the d2g website.
They install NSS, the Android SDK and our provisioning tool.
They connect their phone via USB and change the root certificates and trusted marketplaces.

A beta tester loads the app testing url onto the browser of their FxOS device.
They click the install button for the app to be tested.
They can launch and test the app.

The beta tester can test an update to an existing app.

A beta tester reverts provisioning their phone to be a production device.

A beta tester can browse the homepage, which links to the most recent install pages.

## Out of Scope for 1.0

In the future, d2g could manage versions of apps.

In the future, d2g could provide private apps and manage the list of email addresses of beta testers.

In the future, FirefoxOS could provide an API to install certificates. D2G could use this to make provisioning work without tethering over USB.