import React, { Component } from 'react';
import $ from 'jquery';
import { Authenticator } from '@aws-amplify/ui-react';
import Cart from './Cart';
import '../styles/Catalog.css';
import { getCurrentUser } from 'aws-amplify/auth';

class Catalog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productimage: [],
            productname: [],
            productprice: [],
            searchQuery: '',
            exchangeRate: 1,
            cart: [],
            showCart: false, // New state to track cart visibility
            sponsorOrg: ''
        };
    }

    async componentDidMount() {

        const user = await getCurrentUser();
        const currentUser = user.username;

        const savedCart = localStorage.getItem('cart');

        if (savedCart) {
            this.setState({ cart: JSON.parse(savedCart) });
            }

            const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${currentUser}`);
            const result = await response.json();
            const currentUserSponsorOrg = result.Item.SponsorOrg;

            if(currentUserSponsorOrg !== ''){
                const response2 = await fetch('https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/sponsorOrgs');
                const result2 = await response2.json();
                const Orgs = result2.Items;
                const filteredOrg = Orgs.filter(Org => Org.sponsorName === currentUserSponsorOrg);

                this.setState({exchangeRate: filteredOrg[0].exchangeRate});
                this.setState({sponsorOrg: currentUserSponsorOrg});
            }
        }

        handleChange = (event) => {
            this.setState({ searchQuery: event.target.value });
        };

        handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                this.handleSubmit(event);
            }
    };

    handleSubmit = () => {
        $.ajax({
            url: 'https://ckszaimc23.execute-api.us-east-2.amazonaws.com/EBAYAPIDepolyment1/ebay-search?search=' + this.state.searchQuery, 
            type: 'POST',
            dataType: 'json',
            success: (data) => {
                const searchResult = data['findItemsAdvancedResponse']['0']['searchResult']['0']['item'];

                const nameArr = [];
                const imgArr = [];
                const priceArr = [];

                const length = searchResult.length > 15 ? 15 : searchResult.length;
                for (let i = 0; i < length; i++) {
                    nameArr.push(searchResult[i]['title'][0]);
                    imgArr.push(searchResult[i]['galleryURL'][0]);
                    priceArr.push(
                        searchResult[i]['sellingStatus']['0']['currentPrice']['0']['__value__'] * this.state.exchangeRate
                    );
                }
		console.log(searchResult);
                this.setState({
                    productname: nameArr,
                    productimage: imgArr,
                    productprice: priceArr
                });
            },
            error: (xhr, stat, err) => {
                console.error('Error: ', err);
            }
        });
    };

    addToCart = (index) => {
        const { productname, productimage, productprice, cart } = this.state;
        const item = {
            name: productname[index],
            image: productimage[index],
            price: productprice[index]
        };
        const updatedCart = [...cart, item];
            this.setState({ cart: [...cart, item] });
        
        alert("Item Successfully Added To Cart");
        
        // Save the updated cart to localStorage, if you change tabs and come back to cart items will still exist.
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        };

        // Toggle the showCart state
        toggleCart = () => {
            this.setState((prevState) => ({ showCart: !prevState.showCart }));
        };

        //Remove Items From Cart, (***think about doing selct certain items and clear***).
        clearCart = () => {
        this.setState({ cart: [] });
        localStorage.removeItem('cart'); // Clear from localStorage
    };

    render() {
        const { productname, productimage, productprice, cart, showCart, sponsorOrg } = this.state;


        if(sponsorOrg !== ''){
            return (
                <Authenticator formFields={formFields}>
                    <div className='catalog'>
                        <h1>Driver Reward Catalog</h1>
                        <p>Call your sponsor for more details at 1800-123-5555</p>

                        <input
                            type="text"
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyPress}
                        />
                        <button type="button" onClick={this.handleSubmit}>Search</button>

                        {/* Cart button to toggle the cart display */}
                        <button type="button" onClick={this.toggleCart} className={`cart-icon ${showCart ? 'open' : ''}`}>
                🛒{this.state.cart.length}
                </button>

                        {/* Conditionally render the Cart component */}
                {/*{showCart && <Cart items={cart} />*/}

                {this.state.showCart && (
                    <Cart items={this.state.cart} clearCart={this.clearCart} />
                )}

                        <h2>Items</h2>
                        <div className="catalogGrid">
                            {productname.map((item, index) => (
                                <div
                                    className="catalogEntry clickable"
                                    key={index}
                                    onClick={() => this.addToCart(index)}
                                >
                                    <img src={productimage[index]} alt={item} />
                                    <p>{item}</p>
                                    <p>{productprice[index]} points</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Authenticator>
            );
        } else {
            return (
                <div className="no-access">
                    <h2>Access Denied</h2>
                    <p>You do not have permission to view this page. For Drivers, please Submit an Application and wait to be Approved to access the Catalog!</p>
                </div>
            )
        }
    }
}

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

export default Catalog;
