const AWS = require("aws-sdk");

// Set the region for AWS services
AWS.config.update({ region: "us-east-1" });

// Create an AWS IoT object
const iot = new AWS.Iot();

// Function to create a group
function CreateFleetAWS(groupName) {
  const params = {
    thingGroupName: groupName,
    thingGroupProperties: {
      thingGroupDescription: "Description of your IoT group",
      attributePayload: {
        attributes: {
          // Optional: Add attributes to your group
          // Example: 'attribute1': 'value1'
        },
        merge: false, // Set to true to merge the new attributes with existing attributes
      },
    },
  };

  iot.createThingGroup(params, (err, data) => {
    if (err) {
      console.error("Error creating group:", err);
    } else {
      console.log("Group created successfully:", data);
    }
  });
}

module.exports = CreateFleetAWS;
