import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// dyname region
const dynamoTableRegion = "us-east-2";

const dynamoDBClient = new DynamoDBClient({ region: dynamoTableRegion });
const dynamo = DynamoDBDocumentClient.from(dynamoDBClient);

// define all request methods here
const REQUEST_METHOD = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// define all status codes here
const STATUS_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

// paths
//const APIPath = "https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage005";
const usersPath = "/users";
const aboutPagePath = "/aboutPage";
const usersLoginPath = `${usersPath}/login`;

// dynamo table names
const dynamoTableNames = {
    users: "Team04-Users",
    aboutPage: "Team04-AboutPage",
    admins: "Team04-Admins",
    alerts: "Team04-Alerts",
    applicationLogs: "Team04-ApplicationLogs",
    applications: "Team04-Applications",
    auditLogs: "Team04-AuditLogs",
    drivers: "Team04-Drivers",
    loginAttemptLogs: "Team04-LoginAttemptLogs",
    orderLines: "Team04-OrderLines",
    orders: "Team04-Orders",
    passwordChangeLogs: "Team04-PasswordChangeLogs",
    pointChangeLogs: "Team04-PointChangeLogs",
    reports: "Team04-Reports",
    sponsorOrgs: "Team04-SponsorOrgs",
    sponsorUsers: "Team04-SponsorUsers",
};

export const handler = async (event, context) => {
    console.log("Request event method: ", event.httpMethod);
    console.log("EVENT\n" + event);
    console.log("CONTEXT\n" + context);
    console.log("----" + event.requestContext);

    let response;

    
  
    switch (true) {
        // Handle requests here using the functions defined below

        //Get all users
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === usersPath:
            response = await getItemsFromTable(dynamoTableNames.users);
            break;
        
        // Post Users
        case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === usersPath:
            response = await postUsers(JSON.parse(event.body));
            break;
            
        //Get about page
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === aboutPagePath:
            response = await getItemsFromTable(dynamoTableNames.aboutPage);
            break;
            
        //Get all admins
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/admins`:
            response = await getItemsFromTable(dynamoTableNames.admins);
            break;
            
        //Get all alerts
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/alerts`:
            response = await getItemsFromTable(dynamoTableNames.alerts);
            break;
        
        // Post alerts
        case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === `/alerts`:
            response = await postAlert(JSON.parse(event.body));
            break;
            
        //Get all Application Logs
        /*case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/applicationLogs`:
            response = await getItemsFromTable(dynamoTableNames.applicationLogs);
            break;*/
            
        //Get all Applications
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/applications`:
            response = await getItemsFromTable(dynamoTableNames.applications);
            break;
        
        // Post applications
        case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === `/applications`:
            response = await postApplication(JSON.parse(event.body));
            break;
        
        //Get all Audit Logs
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/auditLogs`:
            response = await getItemsFromTable(dynamoTableNames.auditLogs);
            break;
            
        //Get all Drivers
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/drivers`:
            response = await getItemsFromTable(dynamoTableNames.drivers);
            break;
            
        //Get all Login Attempt Logs
        /*case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/loginAttemptLogs`:
            response = await getItemsFromTable(dynamoTableNames.loginAttemptLogs);
            break;*/
            
        //Get all Order Lines
        /*case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/orderLines`:
            response = await getItemsFromTable(dynamoTableNames.orderLines);
            break;*/
            
        //Get all Orders
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/orders`:
            response = await getItemsFromTable(dynamoTableNames.orders);
            break;
        
        // Post Order
        case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === `/orders`:
            response = await postOrder(JSON.parse(event.body));
            break;

        // Post Orgs
        case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === `/sponsorOrgs`:
            response = await postOrgs(JSON.parse(event.body));
            break;
        
        //Get all Password Change Logs
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/passwordChangeLogs`:
            response = await getItemsFromTable(dynamoTableNames.passwordChangeLogs);
            break;
            
        //Get all Point Change Logs
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/pointChangeLogs`:
            response = await getItemsFromTable(dynamoTableNames.pointChangeLogs);
            break;
            
        //Get all Reports
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/reports`:
            response = await getItemsFromTable(dynamoTableNames.reports);
            break;
        
        // Post Reports
        case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === `/reports`:
            response = await postReport(JSON.parse(event.body));
            break;
        
        //Get all Sponsor Orgs
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/sponsorOrgs`:
            response = await getItemsFromTable(dynamoTableNames.sponsorOrgs);
            break;
            
        //Get all Sponsor Users
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/sponsorUsers`:
            response = await getItemsFromTable(dynamoTableNames.sponsorUsers);
            break;
            
        //Get all users
        /*case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === usersPath:
            response = await getUsers(event.queryStringParameters);
            break;*/

        //Add new account
        /*case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === usersPath:
            response = await postUsers(JSON.parse(event.body));
            break;*/

        //Login user
        /*case event.httpMethod === REQUEST_METHOD.POST &&
            event.requestContext.resourcePath === usersLoginPath:
            response = await postLogin(JSON.parse(event.body));
            break;*/
        
        // Get a specific Alert by AlertID
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/alerts/{AlertID}`:
            response = await getItemFromTableByID(dynamoTableNames.alerts, "AlertID", event.pathParameters.AlertID);
            break;
        
        // Get a specific Application by ApplicationID
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/applications/{ApplicationID}`:
            response = await getItemFromTableByID(dynamoTableNames.applications, "ApplicationID", event.pathParameters.ApplicationID);
            break;
        
        // Get a specific Order by OrderID
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/orders/{OrderID}`:
            response = await getItemFromTableByID(dynamoTableNames.orders, "OrderID", event.pathParameters.OrderID);
            break;

        //Get Order by UserID
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/orders/user/{UserID}`:
            response = await getOrdersByUserID(dynamoTableNames.orders, event.pathParameters.UserID);
            break;

        // Get a specific Report by ReportID
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/reports/{ReportID}`:
            response = await getItemFromTableByID(dynamoTableNames.reports, "ReportID", event.pathParameters.ReportID);
            break;
            
        // Get a specific User by UserID
        case event.httpMethod === REQUEST_METHOD.GET &&
            event.requestContext.resourcePath === `/users/{UserID}`:
            response = await getItemFromUserTableByID(dynamoTableNames.users, "UserID", event.pathParameters.UserID);
            break;
        
        // Delete a Specific Alert by AlertID
        case event.httpMethod === REQUEST_METHOD.DELETE &&
            event.requestContext.resourcePath === `/alerts/{AlertID}`:
            response = await deleteItemFromTable(dynamoTableNames.alerts, "AlertID", event.pathParameters.AlertID);
            break;
        
        // Delete a Specific Application by ApplicationID
        case event.httpMethod === REQUEST_METHOD.DELETE &&
            event.requestContext.resourcePath === `/applications/{ApplicationID}`:
            response = await deleteItemFromTable(dynamoTableNames.applications, "ApplicationID", event.pathParameters.ApplicationID);
            break;
        
        // Delete a Specific Order by OrderID
        case event.httpMethod === REQUEST_METHOD.DELETE &&
            event.requestContext.resourcePath === `/orders/{OrderID}`:
            response = await deleteItemFromTable(dynamoTableNames.orders, "OrderID", event.pathParameters.OrderID);
            break;
        
        // Delete a Specific Report by ReportID
        case event.httpMethod === REQUEST_METHOD.DELETE &&
            event.requestContext.resourcePath === `/reports/{ReportID}`:
            response = await deleteItemFromTable(dynamoTableNames.reports, "ReportID", event.pathParameters.ReportID);
            break;
            
        // PATCH a Specific Alert by AlertID
        case event.httpMethod === REQUEST_METHOD.PATCH &&
            event.requestContext.resourcePath === `/alerts/{AlertID}`:
            response = await patchItemsFromTable(dynamoTableNames.alerts, "AlertID", event.pathParameters.AlertID, JSON.parse(event.body));
            break;
        
        // PATCH a Specific Application by ApplicationID
        case event.httpMethod === REQUEST_METHOD.PATCH &&
            event.requestContext.resourcePath === `/applications/{ApplicationID}`:
            response = await patchItemsFromTable(dynamoTableNames.applications, "ApplicationID", event.pathParameters.ApplicationID, JSON.parse(event.body));
            break;
        
        // PATCH a Specific Order by OrderID
        case event.httpMethod === REQUEST_METHOD.PATCH &&
            event.requestContext.resourcePath === `/orders/{OrderID}`:
            response = await patchItemsFromTable(dynamoTableNames.orders, "OrderID", event.pathParameters.OrderID, JSON.parse(event.body));
            break;
        
        // PATCH a Specific Report by ReportID
        case event.httpMethod === REQUEST_METHOD.PATCH &&
            event.requestContext.resourcePath === `/reports/{ReportID}`:
            response = await patchItemsFromTable(dynamoTableNames.reports, "ReportID", event.pathParameters.ReportID, JSON.parse(event.body));
            break;
            
        // PATCH a Specific User by UserID
        case event.httpMethod === REQUEST_METHOD.PATCH &&
            event.requestContext.resourcePath === `/users/{UserID}`:
            response = await patchItemsFromUserTable(dynamoTableNames.users, "UserID", event.pathParameters.UserID, JSON.parse(event.body));
            break;
            
        // PATCH a Specific SponsorOrg by SponsorOrgID
        case event.httpMethod === REQUEST_METHOD.PATCH &&
            event.requestContext.resourcePath === `/sponsorOrgs/{SponsorOrgID}`:
            response = await patchItemsFromTable(dynamoTableNames.sponsorOrgs, "SponsorOrgID", event.pathParameters.SponsorOrgID, JSON.parse(event.body));
            break;

        // invalid requests
        default:
            response = buildResponse(
                STATUS_CODE.NOT_FOUND,
            );
            break;
    }

    response.headers = {
        'Access-Control-Allow-Origin': '*',
    };
    
    return response;
};

async function getItemsFromTable(tableName) {
    const commandParams = {
        TableName: tableName,
    };
    
    try {
        // get all data from the table
        const data = await dynamo.send(new ScanCommand(commandParams));
        const responseBody = {
            Operation: "GET",
            Message: "SUCCESS",
            Items: data.Items,
        };
        return {
            statusCode: STATUS_CODE.SUCCESS,
            body: JSON.stringify(responseBody),
        };
    } catch (error) {
        console.error(`Error fetching from ${tableName}:`, error);
        return {
            statusCode: STATUS_CODE.SERVER_ERROR,
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
}

/*
async function getUsers(queryStringParameters) {
    
}
*/

async function postUsers(requestBody) {
    const commandParams = {
        TableName: dynamoTableNames.users,
        Item: requestBody,
    };

    // request body must have these attributes, or else request is malformed
    if (requestBody.userID && requestBody.userType &&
    	requestBody.nameLast && requestBody.nameFirst &&
    	requestBody.dateJoin && requestBody.email &&
    	requestBody.username && requestBody.password) {
        //requestBody.userID = parseInt(requestBody.userID, 10);
    	
        const command = new PutCommand(commandParams);
        try {
            await dynamo.send(command);
            const responseBody = {
                Operation: "POST",
                Message: "SUCCESS",
                Item: requestBody,
            };

            /*const postedInUserTypeTable = await postNewUserType(requestBody);
            if(!(postedInUserTypeTable.statusCode === STATUS_CODE.SUCCESS)) {
                return buildResponse(STATUS_CODE.SERVER_ERROR, 
                    {Message: "Unexpected server error: User posted in User table, but not in UserType specific table."}
                );
            }*/

            return {
                statusCode: STATUS_CODE.SUCCESS,
                body: JSON.stringify(responseBody),
            };
        } catch (error) {
            return {
                statusCode: STATUS_CODE.SERVER_ERROR,
                body: JSON.stringify({ message: "There was an unexpected server error." }),
            };
        }
    } 
    else {
        return {
            statusCode: STATUS_CODE.BAD_REQUEST,
            body: JSON.stringify({message: "Missing user ID, user's first and last name, user type, user email, username and password, user's join date." }),
        }
    }
}

async function postNewUserType(requestBody){
    let newUserType;
    let theTable;
    
    // if driver, or sponsor, or admin
    // create post item to the correct table accordingly
    if(requestBody.userType === 'drivers'){
        newUserType = {
            UserID: requestBody.userID,
            SponsorOrganization: requestBody.sponsorOrg,
            About: "",
            Points: requestBody.points
        };
        theTable = dynamoTableNames.drivers;
    }
    else if (requestBody.userType === 'sponsors'){
        newUserType = {
            UserID: requestBody.userID,
            SponsorOrganization: requestBody.sponsorOrg
        };
        theTable = dynamoTableNames.sponsorUsers
    }
    else if (requestBody.userType === 'admins'){
        newUserType = {
            UserID: requestBody.userID
        };
        theTable = dynamoTableNames.admins;
    }

    const commandParams = {
        TableName: theTable,
        Item: newUserType
    };

    const command = new PutCommand(commandParams);
    try{
        await dynamo.send(command);
        const responseBody = {
            Operation: "POST",
            Message: "SUCCESS",
            Item: newUserType
        };

        return {
            statusCode: STATUS_CODE.SUCCESS,
            body: JSON.stringify(responseBody)
        };
    } catch (error) {
        return {
            statusCode: STATUS_CODE.SERVER_ERROR,
            body: JSON.stringify({message: "There was an unexpected server error."})
        };
    }
}

async function postLogin(requestBody) {
    if(!requestBody.username || !requestBody.password){
    const responseBody = {
      Operation: "POST",
      Message: "Bad Request: Missing username or password",
    };
    return buildResponse(STATUS_CODE.BAD_REQUEST, responseBody);
  }

    // scan and filter by username and password 
    const newUsername = requestBody.username;
    const newPassword = requestBody.password;
    const itemCommand = {TableName: dynamoTableNames.users,  
    FilterExpression: 'username= :u AND password= :p',
    ExpressionAttributeValues: {':u': newUsername, ':p': newPassword}, removeUndefinedValues: true};

    try {

        const response = await dynamo.send(new ScanCommand(itemCommand))
        //If found in the table
        if (response.Items.length > 0){
            const responseBody = {
                Message: "Login Successful",
                AccountID: response.Items[0].id,
          };
          return buildResponse(STATUS_CODE.SUCCESS, responseBody);
        }
        //the data was not found in the database, invalid login
        else{
          const responseBody = {
            Operation: "POST",
            Message: "Invalid login information",
          };
          return buildResponse(STATUS_CODE.BAD_REQUEST, responseBody);
        }

    }
    catch (error) {
        console.error(error);
        return {
        statusCode: STATUS_CODE.SERVER_ERROR,
        body: JSON.stringify({message: "Unexpected server error"}),
      };
    }
}

// add dynamic orderID ++++
async function postOrder(requestBody){
    if(requestBody.OrderID && requestBody.Order_Price && requestBody.Order_Date) {
        //requestBody.orderID = parseInt(requestBody.orderID, 10);
        const commandParams = {
            TableName: dynamoTableNames.orders,
            Item: requestBody
        };

        const command = new PutCommand(commandParams);
        try{
            await dynamo.send(command);
            const responseBody = {
                Operation: "POST",
                Message: "SUCCESS",
                Item: requestBody
            };
            return buildResponse(STATUS_CODE.SUCCESS, responseBody);
        } catch (error) {
            const responseBody = {Message: "There was an unexpected server error."};
            return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
        }
    }
    else {
        return {
            statusCode: STATUS_CODE.BAD_REQUEST,
            body: JSON.stringify({Message: "Missing orderID, orderPrice, or orderDate"})
        };
    }
}


async function postAlert(requestBody){
    if(!requestBody.Alert_Message && !requestBody.Alert_Type) {
        return buildResponse(
            STATUS_CODE.BAD_REQUEST,
            {Message: "Missing the alert type or the alert message to send."}
        );
    }
    let commandParams = {
        TableName: dynamoTableNames.alerts
    };
    let listOfAlerts;
    try {
        listOfAlerts = await dynamo.send(new ScanCommand(commandParams));
    } catch (error) {
        const responseBody = {Message: "Server Error: could not retreive Alert data"};
        return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
    }
    const alertID = listOfAlerts.Items.length < 1 ? 1 : listOfAlerts.Items.length + 1;

    const newAlert = {
        AlertID: alertID,
        Alert_Type: requestBody.Alert_Type,
        Alert_Message: requestBody.Alert_Message,
        Seen: false,
        UserID: requestBody.UserID
    };
    commandParams = {
        TableName: dynamoTableNames.alerts,
        Item: newAlert
    }

    try {
        await dynamo.send(new PutCommand(commandParams));
        const responseBody = {
            Operation: "POST",
            Message: "SUCCESS",
            Item: newAlert
        };
        return buildResponse(STATUS_CODE.SUCCESS, responseBody);
    } catch (error) {
        console.error(error);
        const responseBody = {Message: "Server Error: could not retreive Alert data"}
        return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
    }
}


async function postApplication(requestBody){
    if(!requestBody.driverName && !requestBody.sponsorOrg && !requestBody.applicationDate) {
        return buildResponse(
            STATUS_CODE.BAD_REQUEST,
            {Message: "Missing Driver Name, or Sponsor Organization, or the application date"}
        );
    }

    // Scan the applications DB to get the number of items in DB
    let commandParams = {
        TableName: dynamoTableNames.applications
    };
    let listOfApplications;
    try {
        listOfApplications = await dynamo.send(new ScanCommand(commandParams));
    } catch (error) {
        const responseBody = {Message: "Server Error: could not retreive Application data"};
        return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
    }

    // Get max id
    let appLength = listOfApplications.Items.length;
    let maxID = listOfApplications.Items[0].ApplicationID;
    for (let i = 0; i < appLength; i++) {
        if (listOfApplications.Items[i].ApplicationID > maxID) {
            maxID = listOfApplications.Items[i].ApplicationID;
        }
    }

    // if list is empty, new item is number 1, if list not empty, find next number.
    const appID = listOfApplications.Items.length < 1 ? 1 : maxID + 1;
    const appStatus = 'Processing'
    // Application statuses are "Processing", "In Review", "Reject", "Accepted"
    //if(listOfApplications.Items.length < 1){userID = 1;} else {userID = listOfApplications.Items.length + 1;}
    // Compile the new application data
    const newApplication = {
        ApplicationID: appID,
        ApplicationStatus: appStatus,
        DriverName: requestBody.driverName,
        SponsorOrg: requestBody.sponsorOrg,
        ApplicationDate: requestBody.applicationDate,
        UserID: requestBody.userId,
    };
    commandParams = {
        TableName: dynamoTableNames.applications,
        Item: newApplication
    };

    // Now post the new application
    try {
        await dynamo.send(new PutCommand(commandParams));
        const responseBody = {
            Operation: "POST",
            Message: "SUCCESS",
            Item: newApplication
        };
        return buildResponse(STATUS_CODE.SUCCESS, responseBody);
    } catch (error) {
        console.error(error);
        const responseBody = {Message: "Server Error: could not retreive Application data"};
        return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
    }
}

async function postOrgs(requestBody){
    const newOrg = {};
    newOrg.SponsorOrgID = 0;
    Object.keys(requestBody).forEach(key => {
        newOrg[key] = requestBody[key];
    });
    
    let commandParams = {
        TableName: dynamoTableNames.sponsorOrgs,
        Item: newOrg,
    };

    try {
        await dynamo.send(new PutCommand(commandParams));
        const responseBody = {
            Operation: "POST",
            Message: "SUCCESS",
            Item: newOrg
        };
        return buildResponse(STATUS_CODE.SUCCESS, responseBody);
    } catch (error) {
        console.error("Error: ", error);
        const responseBody = {Message: "Server Error: could not input Report data"};
        return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
    }
}

// Post report
async function postReport(requestBody){
    let commandParams = {
        TableName: dynamoTableNames.reports,
    };
    let listOfReports;
    try {
        listOfReports = await dynamo.send(new ScanCommand(commandParams));
    } catch (error) {
        const responseBody = {Message: "Server Error: could not retreive Report data"};
        return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
    }

    let reportLength = parseInt(listOfReports.Count, 10);
    //let maxID = reportLength;
    /*for (let i = 0; i < reportLength; i++) {
        if (listOfReports.Items[i].reportID > maxID) {
            maxID = parseInt(listOfReports.Items[i].reportID, 10);
        }
    }*/

    let reportIDNum = reportLength < 1 ? 1 : reportLength + 1;

    const newReport = {};
    newReport.ReportID = reportIDNum;
    Object.keys(requestBody).forEach(key => {
        newReport[key] = requestBody[key];
    });

    commandParams = {
        TableName: dynamoTableNames.reports,
        Item: newReport,
    };

    try {
        await dynamo.send(new PutCommand(commandParams));
        const responseBody = {
            Operation: "POST",
            Message: "SUCCESS",
            Item: newReport
        };
        return buildResponse(STATUS_CODE.SUCCESS, responseBody);
    } catch (error) {
        console.error("Error: ", error);
        const responseBody = {Message: "Server Error: could not input Report data"};
        return buildResponse(STATUS_CODE.SERVER_ERROR, responseBody);
    }
}

// Function to get orders by UserID
async function getOrdersByUserID(tableName, userID) {
    const commandParams = {
        TableName: tableName,
        FilterExpression: "UserID = :userID", // Filter for UserID
        ExpressionAttributeValues: {
            ":userID": userID, // Bind the value of UserID
        },
    };

    try {
        const result = await dynamo.send(new ScanCommand(commandParams)); // Use ScanCommand
        if (result.Items && result.Items.length > 0) {
            const responseBody = {
                Operation: "GET",
                Message: "SUCCESS",
                Items: result.Items,
            };
            return {
                statusCode: STATUS_CODE.SUCCESS,
                body: JSON.stringify(responseBody),
            };
        } else {
            return {
                statusCode: STATUS_CODE.NOT_FOUND,
                body: JSON.stringify({ message: `No orders found for UserID ${userID}` }),
            };
        }
    } catch (error) {
        console.error(`Error fetching orders for UserID ${userID}:`, error);
        return {
            statusCode: STATUS_CODE.SERVER_ERROR,
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
}

async function getItemFromUserTableByID(tableName, PK, ID) {
    
    const commandParams = {
        TableName: tableName,
        Key: {
            [PK]: ID,
        },
    };
    
    try {
        const result = await dynamo.send(new GetCommand(commandParams));
        if (result.Item) {
            const responseBody = {
                Operation: "GET",
                Message: "SUCCESS",
                Item: result.Item,
            };
            return {
                statusCode: STATUS_CODE.SUCCESS,
                body: JSON.stringify(responseBody),
            };
        } else {
            return {
                statusCode: STATUS_CODE.NOT_FOUND,
                body: JSON.stringify({ message: `Item with ID ${ID} not found` }),
            };
        }
    } catch (error) {
        console.error(`Error fetching from ${tableName} with ID ${ID}:`, error);
        return {
            statusCode: STATUS_CODE.SERVER_ERROR,
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
}

async function getItemFromTableByID(tableName, PK, ID) {
    
    // make sure userID is an integer
    ID = Number(ID);
    
    const commandParams = {
        TableName: tableName,
        Key: {
            [PK]: ID,
        },
    };
    
    try {
        const result = await dynamo.send(new GetCommand(commandParams));
        if (result.Item) {
            const responseBody = {
                Operation: "GET",
                Message: "SUCCESS",
                Item: result.Item,
            };
            return {
                statusCode: STATUS_CODE.SUCCESS,
                body: JSON.stringify(responseBody),
            };
        } else {
            return {
                statusCode: STATUS_CODE.NOT_FOUND,
                body: JSON.stringify({ message: `Item with ID ${ID} not found` }),
            };
        }
    } catch (error) {
        console.error(`Error fetching from ${tableName} with ID ${ID}:`, error);
        return {
            statusCode: STATUS_CODE.SERVER_ERROR,
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
}

async function deleteItemFromTable(tableName, PK, ID) {
    
    // make sure userID is an integer
    ID = Number(ID);
    
    const commandParams = {
        TableName: tableName,
        Key: {
            [PK]: ID,
        },
    };
    
    try {
        await dynamo.send(new DeleteCommand(commandParams));
        const responseBody = {
            Operation: "DELETE",
            Message: "SUCCESS",
            DeletedItemID: ID,
        };
        return {
            statusCode: STATUS_CODE.SUCCESS,
            body: JSON.stringify(responseBody),
        };
    } catch (error) {
        console.error(`Error deleting from ${tableName} with ID ${ID}:`, error);
        return {
            statusCode: STATUS_CODE.SERVER_ERROR,
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
}

async function patchItemsFromUserTable(tableName, PK, ID, patchValues) {
    
    let updateExpression = 'SET';
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    // loop through each attribute to be patched and create update expresions
    Object.keys(patchValues).forEach((key, index) => {
        const attributeNamePlaceholder = `#attr${index}`;
        const attributeValuePlaceholder = `:val${index}`;

        updateExpression += ` ${attributeNamePlaceholder} = ${attributeValuePlaceholder},`;

        expressionAttributeNames[attributeNamePlaceholder] = key;
        expressionAttributeValues[attributeValuePlaceholder] = patchValues[key];
    });

    updateExpression = updateExpression.slice(0, -1);

    const commandParams = {
        TableName: tableName,
        Key: {
            [PK]: ID,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW"
    };
    
    try {
        const result = await dynamo.send(new UpdateCommand(commandParams));
        const responseBody = {
            Operation: "PATCH",
            Message: "SUCCESS",
            updatedAttributes: result.Attributes,
        };
        return {
            statusCode: STATUS_CODE.SUCCESS,
            body: JSON.stringify(responseBody),
        };
    } catch (error) {
        console.error(`Error updating from ${tableName} with ID ${ID}:`, error);
        return {
            statusCode: STATUS_CODE.SERVER_ERROR,
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
}

async function patchItemsFromTable(tableName, PK, ID, patchValues) {
    // Validate ID
    if (isNaN(ID)) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Invalid ID format" }),
        };
    }


    ID = Number(ID);


    // Validate patchValues
    if (!patchValues || Object.keys(patchValues).length === 0) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "No attributes to update" }),
        };
    }


    let updateExpression = 'SET';
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};


    const entries = Object.entries(patchValues);
    entries.forEach(([key, value], index) => {
        const attributeNamePlaceholder = `#attr${index}`;
        const attributeValuePlaceholder = `:val${index}`;


        updateExpression += ` ${attributeNamePlaceholder} = ${attributeValuePlaceholder}`;
        if (index < entries.length - 1) updateExpression += ',';


        expressionAttributeNames[attributeNamePlaceholder] = key;
        expressionAttributeValues[attributeValuePlaceholder] = value;
    });


    const commandParams = {
        TableName: tableName,
        Key: {
            [PK]: ID,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
    };


    try {
        const result = await dynamo.send(new UpdateCommand(commandParams));
        const responseBody = {
            Operation: "PATCH",
            Message: "SUCCESS",
            updatedAttributes: result.Attributes,
        };
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,PATCH,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
            },
            body: JSON.stringify(responseBody),
        };
    } catch (error) {
        console.error(`Error updating from ${tableName} with ID ${ID}:`, error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Server Error", error: error.message }),
        };
    }
}




function buildResponse(statusCode, body) {
    return {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',  // Allow requests from any origin
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',  // Allowed methods
      },
      body: JSON.stringify(body),
    };
 }
