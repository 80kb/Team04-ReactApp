import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: 'us-east-2' });

export const handler = async (event) => {
    const { userName, request } = event;
    const userAttributes = request.userAttributes;

    if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
        const params = {
            TableName: "Team04-Users",
            Item: marshall({
                UserID: userName,
                Username: userAttributes.preferred_username,
                Email: userAttributes.email,
                FirstName: userAttributes.given_name,
                LastName: userAttributes.family_name,
                Address: userAttributes.address,
                Birthdate: userAttributes.birthdate,
                PhoneNumber: userAttributes.phone_number,
                Points: 0,
                UserType: 'Driver',
                CreatedAt: new Date().toISOString()
            })
        };

        try {
            await dynamoDbClient.send(new PutItemCommand(params));
            console.log(`User ${userName} added to DynamoDB`);
        } catch (error) {
            console.error("Error adding user to DynamoDB", error);
            throw error;
        }
    }
    return event;
};
