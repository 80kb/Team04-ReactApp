import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Dashboard.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import { signUp } from 'aws-amplify/auth';
<<<<<<< HEAD
import { jsPDF } from 'jspdf';
import "jspdf-autotable";

//
=======
import { updateUserAttributes } from '@aws-amplify/auth';
>>>>>>> main

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userID, setUserID] = useState(null);
    const [orders, setOrders] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');//Used For Reports Selection
<<<<<<< HEAD
    const [pdfUrl, setPdfUrl] = useState("");//Used for Displaying pdf.
=======
    const [sponsorOrganizations, setSponsorOrganizations] = useState([]);
>>>>>>> main

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

    const [newUser, setNewUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phoneNumber: '',
      birthdate: '',
      password: '',
      username: ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateSponsorUser = async (e) => {
      e.preventDefault();
    
      try {
        await signUp({
          username: newUser.email,
          password: newUser.password,
          attributes: {
            email: newUser.email,
            given_name: newUser.firstName,
            family_name: newUser.lastName,
            address: newUser.address,
            birthdate: newUser.birthdate,
            phone_number: newUser.phoneNumber,
            preferred_username: newUser.username
          },
        });

        // Create PATCH call to Dynamo table: Users to edit the UserType field to 'Sponsor'
    
        alert('User account created successfully!');
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          password: '',
          birthdate: '',
          phoneNumber: '',
          username: ''
        });
      } catch (error) {
        console.error('Error creating user:', error);
        alert(`Failed to create user: ${error.message}`);
      }
    };

    const handleCreateAdminUser = async (e) => {
      e.preventDefault();
    
      try {
        await signUp({
          username: newUser.username,
          password: newUser.password,
          attributes: {
            email: newUser.email,
            given_name: newUser.firstName,
            family_name: newUser.lastName,
            address: newUser.address,
            birthdate: newUser.birthdate,
            phone_number: newUser.phoneNumber,
            preferred_username: newUser.username
          },
        });

        // Create PATCH call to Dynamo table: Users to edit the UserType field to 'Admin'
    
        alert('User account created successfully!');
        setNewUser({
          firstName: '',
          lastName: '',
          email: '', 
          address: '',
          password: '',
          birthdate: '',
          phoneNumber: '',
          username: ''
        });
      } catch (error) {
        console.error('Error creating user:', error);
        alert(`Failed to create user: ${error.message}`);
      }
    };

    // Fetch user ID on entering the tab
    useEffect(() => {
      const fetchUserID = async () => {
          try {
              const user = await getCurrentUser();
              setUserID(user.username);
          } catch (error) {
              console.error('Error fetching user ID:', error);
          }
      };

      fetchUserID();
    }, []);
	
    // Fetch user orders when the 'orderHistory' tab is active
    useEffect(() => {
        if (activeTab === 'orderHistory' && userID) {
            fetchUserOrders();
        }
    }, [activeTab, userID]);


    //Getting all orders for a user, at first will get all orders in DB but then filter by UIDfor Users Orders.
    const fetchUserOrders = async () => {
        try {
            const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/orders/user/${userID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const result = await response.json();
		
	    console.log('Fetched orders:', result);
            // Filter orders by userID

            setOrders(result.Items);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

   //Responsible for displaying orders
    const renderOrderHistory = () => {
    return (
	    <div>
	    <h2 className="order-history-header">Order History</h2>
        <div className="order-history-container">
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order, index) => {
                        // Console log the items for debugging
                        console.log('Order Items:', order.Items);

                        return (
                            <div key={index} className="order-item">
                                <p><strong>Order ID:</strong> {order.OrderID}</p>
                                <p><strong>Status:</strong> {order.Order_Status}</p>
                                <p><strong>Price:</strong> {order.Order_Price}</p>
                                <p><strong>Order Date:</strong> {order.Order_Date}</p>
                                <p><strong>Items:</strong></p>
                                <ul>
                                    {order.Items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {typeof item === 'string' ? item : item.S}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
       </div>
    );
};

//npm audit fix, will fix minor errors.
const ReportMenuChoice = () => {
        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
	    setPdfUrl("");
        };

	const generatePdf = async () => {
        if (!selectedOption) {
            alert('Please select a report before generating the PDF.');
            return;
        }

	try {
	   let reportData = null;

	    if (selectedOption === "Sales By Driver"){
	      const response = await fetch("https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/orders",
		{
			method: "GET",
			header: {
				"Conent-Type": "application/json",
                    },
                }
	   );
		if (!response.ok) {
                throw new Error("Failed to fetch Sales By Driver data");
            }

            const data = await response.json();
            console.log(data); // Debugging log
            reportData = data.Items
	}//End of Sales By Driver if state.
         
	
	   const doc = new jsPDF();
	   doc.text(`This is the ${selectedOption} report`, 10, 10);

	   if (Array.isArray(reportData) && reportData.length > 0) {
		const tableData = reportData.map((item, index) => {
		let itemsList = "No items available";
		
		if (Array.isArray(item.Items)) {
                    itemsList = item.Items.map((subItem) =>
                        typeof subItem === "string" ? subItem : JSON.stringify(subItem)
                    ).join(", ");
                }

		return[
                index + 1, // Row number
                item.OrderID,
                itemsList,
                item.Order_Date,
                item.Order_Status,
                item.Order_Price,
		];
	     });	

		doc.autoTable({
                head: [["#", "Order ID", "Item", "Order Date", "Status", "Points"]],
                body: tableData,
                startY: 20, // Table starts below the title
                styles: { fontSize: 10 },
                headStyles: { fillColor: [22, 160, 133] }, // Custom header color
            });

	   } else{
		doc.text("No data available for this report.", 10, 20);
	   }
	   


           const blob = doc.output("blob");

	   const pdfBlobUrl = URL.createObjectURL(blob);
           setPdfUrl(pdfBlobUrl); 

	} catch (error) {
	    console.error("Error generating PDF:", error);
            alert("Failed to generate the report. Please try again later.");
       }

    };


        return (
            <div style={{ marginBottom: '20px',
			  maxHeight: "500px", // Adjust this based on your container's size
                          overflow: "auto",
	    		}}>
                <label htmlFor="dropdown">Choose a Report: </label>
                <select
                    id="dropdown"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    style={{
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                >
                    <option value="">-- Select a Report --</option>
                    <option value="Sales By Driver">Sales By Driver</option>
                    <option value="Audit Log">Audit Log</option>
                </select>

		<button
                onClick={generatePdf}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
		    marginLeft: "10px",
                }}
            >
                Generate PDF
            </button>
	
		{/* Display the PDF below */}
            {pdfUrl && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Preview:</h3>
                    <iframe
                        src={pdfUrl}
                        style={{
                            width: "100%",
                            height: "500px",
                            border: "1px solid #ccc",
                        }}
                        title="PDF Preview"
                    ></iframe>
                    <div style={{ marginTop: "10px" }}>
                        <a
                            href={pdfUrl}
                            download={`${selectedOption.replace(" ", "_")}_report.pdf`}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                borderRadius: "4px",
                                textDecoration: "none",
                            }}
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            )}

            </div>
        );
    };

    //Fetch user data on entering the tab
    useEffect(() => {
      if(activeTab === 'accountDetails' || activeTab === 'viewPoints' && userID) {
        fetchUserData();
      }
    }, [activeTab, userID]);

    // GET all user data
    const fetchUserData = useCallback(async () => {
      try {
        const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const result = await response.json();
        setUserData(result.Item);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }, [userID]);

    // Edit button clicks
    const handleEdit = () => {
      setIsEditing(true);
      setEditedData(userData);
    };

    //Fetch user data on entering the tab
    useEffect(() => {
      if(userID) {
        fetchUserData();
      }
    }, [activeTab, userID, fetchUserData]);

    // Handle input change in edit form
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
    };

    // Submit edited data
    const submitEdits = async () => {
      try {
          // Update in Cognito
          /*
          const user = await getCurrentUser();

          const attributesToUpdate = {
              given_name: editedData.FirstName,
              family_name: editedData.LastName,
              address: editedData.Address,
              phone_number: editedData.PhoneNumber,
          };

          console.log(user);
          console.log(attributesToUpdate);

          await updateUserAttributes(user, attributesToUpdate);
          */
          
          // Update in DynamoDB
          delete editedData.UserID;
          await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(editedData),
          });

          // Update local state and exit edit mode
          setUserData(editedData);
          setIsEditing(false);
          alert('Account details updated successfully!');
      } catch (error) {
          console.error('Error updating account details:', error);
          alert('There was an error updating your account details.');
      }
    };

    //Setting Up Default Values for Application.	
    const [applicationData, setApplicationData] = useState({
  	applicationID: 0,
  	applicationStatus: 'Processing',
  	driverName: '',
  	sponsorOrg: '',
  	applicationDate: new Date().toLocaleDateString(),
     });


const changeData = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field that changed
    }));
  };

 const generateUniqueID = () => Date.now();

     // Function to handle submission of all application data at once
  const submitApplication = async (event) => {
    event.preventDefault(); // Prevent form reload

    // Generate a unique ID for the application
    const uniqueID = generateUniqueID();
    const applicationDataWithID = {
        ...applicationData,
        applicationID: uniqueID
    };

    try {
        const response = await fetch('https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationDataWithID)// Send updated application data
        });

        if (!response.ok) {
            throw new Error('Failed to submit application');
        }

        const result = await response.json();
        console.log('Application submitted successfully:', result);  // Message from Lambda response
        alert('Application submitted successfully!');

    } catch (error) {
        console.error('Error submitting application:', error);
        alert('There was an error submitting the application.');
    }
  };

  const handleCreateSponsorOrg = async(event) => {
      event.preventDefault();

      try{

        const sponsorName = event.target.sponsorName.value;
        const exchangeRate = parseFloat(event.target.exchangeRate.value);
        const sponsorOrgID = Date.now();

        const SponsorOrgData = {
          SponsorOrgID: sponsorOrgID,
          exchangeRate: exchangeRate,
          sponsorName: sponsorName
        };

        const response = await fetch('https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/sponsorOrgs', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(SponsorOrgData)
      });

      if (!response.ok) {
          throw new Error('Failed to submit application');
      }

      alert('Sponsor Organization created successfully!');
    } catch (error) {
      alert('There was an error creating Sponsor Organization.');
    }

  }

  useEffect(() => {
    if (activeTab === 'ViewSponsorOrgs') {
        fetchSponsorOrgs();
    }
}, [activeTab]);

  const fetchSponsorOrgs = async () => {
    try {
      // Make a GET request to the API Gateway endpoint for sponsorOrgs
      const response = await fetch('https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/sponsorOrgs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(`Failed to fetch sponsor organizations: ${response.statusText}`);
      }
  
      setSponsorOrganizations(result.Items);

    } catch (error) {
      alert('There was an error getting Sponsor Organizations.');
    }
  }

  const renderSponsorOrgs = () => {
    return (
      <div>
        <h2>View Sponsor Organizations</h2>
        {sponsorOrganizations.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>SponsorOrgID</th>
                <th>Sponsor Name</th>
                <th>Exchange Rate</th>
              </tr>
            </thead>
            <tbody>
              {sponsorOrganizations.map((org) => (
                <tr key={org.SponsorOrgID}>
                  <td>{org.SponsorOrgID}</td>
                  <td>{org.sponsorName}</td>
                  <td>{org.exchangeRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sponsor organizations found.</p>
        )}
      </div>
    );
};

  // Conditionally render content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'viewPoints':
        return (
          <div>
              <h2>View Points</h2>
              {userData ? (
                  <div>
                      <p><strong>Points:</strong> {userData.Points}</p>
                  </div>
              ) : (
                  <p>Loading user points...</p>
              )}
          </div>
        )
      case 'accountDetails':
        return (
          <div>
              <h2>Account Details</h2>
              {isEditing ? (
                  <div>
                      <label>
                          First Name:
                          <input type="text" name="FirstName" value={editedData.FirstName || ''} onChange={handleChange} />
                      </label>
                      <br/>
                      <label>
                          Last Name:
                          <input type="text" name="LastName" value={editedData.LastName || ''} onChange={handleChange} />
                      </label>
                      <br/>
                      <label>
                          Phone Number:
                          <input type="tel" name="PhoneNumber" value={editedData.PhoneNumber || ''} onChange={handleChange} />
                      </label>
                      <br/>
                      <label>
                          Address:
                          <input type="text" name="Address" value={editedData.Address || ''} onChange={handleChange} />
                      </label>
                      <br/>
                      <label>
                          Birthdate:
                          <input type="text" name="Birthdate" value={editedData.Birthdate || ''} onChange={handleChange} />
                      </label>
                      <br/>
                      <label>
                          Username:
                          <input type="text" name="Username" value={editedData.Username || ''} onChange={handleChange} />
                      </label>
                      <br/>
                      <button onClick={submitEdits}>Save Changes</button>
                      <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
              ) : (
                  <div>
                      {userData ? (
                          <div>
                              <p><strong>First Name:</strong> {userData.FirstName}</p>
                              <p><strong>Last Name:</strong> {userData.LastName}</p>
                              <p><strong>Email:</strong> {userData.Email}</p>
                              <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
                              <p><strong>Address:</strong> {userData.Address}</p>
                              <p><strong>Birthdate:</strong> {userData.Birthdate}</p>
                              <p><strong>Username:</strong> {userData.Username}</p>
                              <p><strong>Created At:</strong> {new Date(userData.CreatedAt).toLocaleString()}</p>
                              <button onClick={handleEdit}>Edit</button>
                          </div>
                      ) : (
                          <p>Loading user details...</p>
                      )}
                  </div>
              )}
          </div>
      );
      case 'rewards':
        return <h2>Rewards: [Placeholder for Rewards]</h2>;
      case 'reports':
	return ReportMenuChoice();
      case 'application':
        return (
          <div>
            <h2>Application Details</h2>
	          <p>Below, Enter Your Name and Sponsor Orgaziation to Register for
		        a Good Drivers Rewards Account with that Sponsor.</p>
            <form>
              <div>
                <label>
                  Driver Name:
                  <input
                    type="text"
                    name="driverName"
                    value={applicationData.Driver_Name}
                    onChange={changeData}
                  />
                </label>
              </div>
              <div>
                <label>
                  Sponsor Org:
                  <input
                    type="text"
                    name="sponsorOrg"
                    value={applicationData.Sponsor_Org}
                    onChange={changeData}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <button type="button" onClick={submitApplication}>
                Submit Application
              </button>
            </form>
          </div>
        );

      case 'orderHistory':
	      return renderOrderHistory();

      case 'CreateSponsorAccount':
        return (
          <div>
            <h2>Create Sponsor Account</h2>
            <form onSubmit={handleCreateSponsorUser}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Birthdate:
                <input
                  type="Date"
                  name="birthdate"
                  value={newUser.birthdate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={newUser.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button type="submit">Create Account</button>
              </div>
            </form>
          </div>
        );

      case 'CreateAdminAccount':
        return (
          <div>
            <h2>Create Admin Account</h2>
            <form onSubmit={handleCreateAdminUser}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Birthdate:
                <input
                  type="Date"
                  name="birthdate"
                  value={newUser.birthdate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={newUser.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br/>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button type="submit">Create Account</button>
              </div>
            </form>
          </div>
        );

      case 'CreateSponsorOrg':
        return (
          <div>
            <h2>Create Sponsor Organization</h2>
            <form onSubmit={handleCreateSponsorOrg} style={{ textAlign: 'center' }}>
              <label>
                Sponsor Name:
                <br />
                <input type="text" name="sponsorName" required />
              </label>
              <br />

              <div style={{ marginTop: '20px' }}>
                <label>
                  Exchange Rate:
                  <br />
                  <input type="number" step="0.01" name="exchangeRate" required />
                </label>
              </div>
              <br />
              <button type="submit" style={{ marginTop: '5px' }}>Submit</button>
            </form>
          </div>     
        );

      case 'ViewSponsorOrgs':
        return renderSponsorOrgs();

      default:
        return <h2>Select a Tab to View</h2>;
    }

  };

    return (
        <Authenticator
        formFields={formFields}>
            <div className="dashboard">
                <div className="sidebar">
                    <h3>Dashboard</h3>
                    	{userData ? (
                    	    <div>
                    	    {userData.UserType === 'Driver' ? (
                    	        <ul>
                    	        <li onClick={() => setActiveTab('viewPoints')} className={activeTab === 'viewPoints' ? 'active' : ''}>View My Points</li>
                        	    <li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                        	    <li onClick={() => setActiveTab('application')} className={activeTab === 'application' ? 'active' : ''}>Application</li>
	    		                    <li onClick={() => setActiveTab('orderHistory')} className={activeTab === 'orderHistory' ? 'active' : ''}>Order History</li>
                    		</ul>
                    	    ) : userData.UserType === 'Sponsor' ? (
                    	        <ul>
                    	        <li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                        	    <li onClick={() => setActiveTab('rewards')} className={activeTab === 'rewards' ? 'active' : ''}>Rewards</li>
                              <li onClick={() => setActiveTab('CreateSponsorAccount')} className={activeTab === 'CreateSponsorAccount' ? 'active' : ''}>Create Sponsor Account</li>
                    		</ul>
                    	    ) : userData.UserType === 'Admin' ? (
                    	        <ul>
                              <li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                              <li onClick={() => setActiveTab('CreateSponsorOrg')} className={activeTab === 'CreateSponsorOrg' ? 'active' : ''}>Create Sponsor Organization</li>
                              <li onClick={() => setActiveTab('ViewSponsorOrgs')} className={activeTab === 'ViewSponsorOrgs' ? 'active' : ''}>View Sponsor Organizations</li>
                              <li onClick={() => setActiveTab('CreateSponsorAccount')} className={activeTab === 'CreateSponsorAccount' ? 'active' : ''}>Create Sponsor Account</li>
                              <li onClick={() => setActiveTab('CreateAdminAccount')} className={activeTab === 'CreateAdminAccount' ? 'active' : ''}>Create Admin Account</li>
                              <li onClick={() => setActiveTab('reports')} className={activeTab === 'reports' ? 'active' : ''}>Produce Reports</li>
                    		</ul>
                    	    ) : (<p> ERROR </p>)}
                    	    </div>
                    	) : (
                    	    <p> ERROR </p>
                    	)}
                </div>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </Authenticator>
    );
};

const formFields = {
	signUp: {
		given_name: {
			order:1,
			label:'First Name',
			required:true
		},
		family_name: {
			order: 2,
			label:'Last Name',
			required:true
		},
		email: {
			order: 3,
			placeholder: 'Enter your Email',
			required:true
		},
		preferred_username: {
			order: 4,
			placeholder: 'Enter username',
			required:true
		},
		password: {
			order: 5,
			placeholder: 'Enter your desired password',
			required: true
		},
		confirm_password: {
			order: 6,
			placeholder: 'Enter the same password',
			required: true
		},
		address: {
			order: 7,
			label: 'Address',
			placeholder: 'Enter address',
			required: true
		},
	},
}

export default Dashboard;
