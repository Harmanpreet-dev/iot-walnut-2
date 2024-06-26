const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Set the region for AWS services
AWS.config.update({ region: "us-east-1" });

// Create an AWS IoT object
const iot = new AWS.Iot();

// Function to create a thing
function createThing(thingName, callback) {
  const params = {
    thingName: thingName,
  };

  iot.createThing(params, (err, data) => {
    if (err) {
      console.error("Error creating thing:", err);
    } else {
      console.log("Thing created successfully:", data);
      callback(data);
    }
  });
}

// Function to create a certificate for the device
function createCertificate(callback) {
  const params = {
    setAsActive: true,
  };

  iot.createKeysAndCertificate(params, (err, data) => {
    if (err) {
      console.error("Error creating certificate:", err);
    } else {
      console.log("Certificate created successfully:", data);
      callback(data);
    }
  });
}

// Function to attach certificate to the thing
function attachCertificateToThing(certificateArn, thingName, callback) {
  const params = {
    principal: certificateArn,
    thingName: thingName,
  };

  iot.attachThingPrincipal(params, (err, data) => {
    if (err) {
      console.error("Error attaching certificate to thing:", err);
    } else {
      console.log("Certificate attached to thing successfully:", data);
      callback();
    }
  });
}

// Function to add thing to a group
function addThingToGroup(thingName, groupName, callback) {
  const params = {
    thingName: thingName,
    thingGroupName: groupName,
  };

  iot.addThingToThingGroup(params, (err, data) => {
    if (err) {
      console.error("Error adding thing to group:", err);
    } else {
      console.log("Thing added to group successfully:", data);
      callback();
    }
  });
}

// Function to create a policy
function createPolicy(policyName, policyDocument, callback) {
  const params = {
    policyName: policyName,
    policyDocument: JSON.stringify(policyDocument),
  };

  iot.createPolicy(params, (err, data) => {
    if (err && err.code !== "ResourceAlreadyExistsException") {
      console.error("Error creating policy:", err);
    } else {
      if (err && err.code === "ResourceAlreadyExistsException") {
        console.log("Policy already exists:", policyName);
        data = { policyName: policyName }; // Use existing policy
      } else {
        console.log("Policy created successfully:", data);
      }
      callback(data);
    }
  });
}

// Function to attach policy to a certificate
function attachPolicyToCertificate(policyName, certificateArn, callback) {
  const params = {
    policyName: policyName,
    target: certificateArn,
  };

  iot.attachPolicy(params, (err, data) => {
    if (err) {
      console.error("Error attaching policy to certificate:", err);
    } else {
      console.log("Policy attached to certificate successfully:", data);
      callback();
    }
  });
}

// Function to save certificate and key to files
function saveCertificates(certificates, thingName) {
  const certPath = path.join(__dirname, `certificates/${thingName}`);
  if (!fs.existsSync(certPath)) {
    fs.mkdirSync(certPath);
  }

  fs.writeFileSync(
    path.join(certPath, "certificate.pem.crt"),
    certificates.certificatePem
  );
  fs.writeFileSync(
    path.join(certPath, "private.pem.key"),
    certificates.keyPair.PrivateKey
  );
  fs.writeFileSync(
    path.join(certPath, "public.pem.key"),
    certificates.keyPair.PublicKey
  );

  console.log("Certificates saved to files.");
}

// Function to download root CA certificate
function downloadRootCACertificate(thingName) {
  const url = "https://www.amazontrust.com/repository/AmazonRootCA1.pem";
  const https = require("https");
  const certPath = path.join(__dirname, `certificates/${thingName}`);

  const file = fs.createWriteStream(path.join(certPath, "AmazonRootCA1.pem"));
  https.get(url, function (response) {
    response.pipe(file);
    console.log("Root CA certificate downloaded.");
  });
}

// Main function to create a thing, create a certificate, attach it to the thing, add the thing to a group, create a policy, and attach the policy to the certificate
function CreateThingAndAddToGroup(thingName, groupName, imei, pgClient) {
  let policyName = "device-connect";
  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["iot:Connect", "iot:Publish", "iot:Subscribe", "iot:Receive"],
        Resource: "*",
      },
    ],
  };
  createThing(thingName, () => {
    createCertificate((certificates) => {
      saveCertificates(certificates, thingName);
      downloadRootCACertificate(thingName);
      attachCertificateToThing(certificates.certificateArn, thingName, () => {
        addThingToGroup(thingName, groupName, () => {
          createPolicy(policyName, policyDocument, (policyData) => {
            attachPolicyToCertificate(
              policyData.policyName,
              certificates.certificateArn,
              async () => {
                console.log(
                  "Thing created with certificate, added to group, and policy attached successfully."
                );
                await pgClient.query(
                  "INSERT INTO devices (imei,fleet,name,certificate_id) VALUES ($1,$2,$3,$4)",
                  [imei, groupName, thingName, certificates.certificateId]
                );
              }
            );
          });
        });
      });
    });
  });
}

module.exports = CreateThingAndAddToGroup;
