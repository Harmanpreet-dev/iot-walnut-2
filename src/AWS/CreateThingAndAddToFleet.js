const AWS = require("aws-sdk");

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

// Function to add thing to a group
function addThingToGroup(thingName, groupName) {
  const params = {
    thingName: thingName,
    thingGroupName: groupName,
  };

  iot.addThingToThingGroup(params, (err, data) => {
    if (err) {
      console.error("Error adding thing to group:", err);
    } else {
      console.log("Thing added to group successfully:", data);
    }
  });
}

// Main function to create a thing and add it to a group
function CreateThingAndAddToGroup(thingName, groupName) {
  createThing(thingName, () => {
    addThingToGroup(thingName, groupName);
  });
}

module.exports = CreateThingAndAddToGroup;

// // Call the main function with your desired thing name and group name
// createThingAndAddToGroup("MyNewThing", "MyIoTGroup"); // Replace with your desired thing name and group name
