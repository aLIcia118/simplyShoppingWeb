import React, { useState } from 'react';
import './App.css';

const merchandiseData = [
  {
    id: 1,
    name: 'STRAWBERRY BEAR',
    price: 50,
    description:
      'Bartholomew Bear is ready for summer fun! His removable costume of textured red fur with green suedette collar, and perky calyx hat fixed on top of his tousled fudge fur, is the perfect fruity disguise! A joyful companion for summer snuggles and beyond!',
    imageUrl: 'https://www.jellycat.com/images/products/medium/BARM2BST.jpg',
  },
  {
    id: 2,
    name: 'GUINEA PIG',
    price: 30,
    description:
      'Gordy Guinea Pig is a little ball of vanilla-fudge softness! Podgy and cosy, with biscuit fold ears, a suedette nose and fluffy cheeks, as well as tiny bobbly paws, this cavy is too cute to handle!',
    imageUrl: 'https://www.jellycat.com/images/products/medium/GOR6GP.jpg',
  },
  {
    id: 3,
    name: 'CAPYBARA',
    price: 50,
    description:
      'Clyde Capybara is chill and charismatic with a chunky tum, purple-brown snout and chocolate two-tone fur. With delicate claws, suedette ears, dreamy eyes and podgy haunches, Clyde calms any storm',
    imageUrl: 'https://www.jellycat.com/images/products/medium/CLY6C.jpg',
  },
];

const cartIconUrl =
  'https://static.vecteezy.com/system/resources/previews/027/381/351/original/shopping-cart-icon-shopping-trolley-icon-shopping-cart-logo-container-for-goods-and-products-economics-symbol-design-elements-basket-symbol-silhouette-retail-design-elements-vector.jpg';

const App = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {

      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {

      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }

    setTotalPrice(totalPrice + item.price);
  };


  const removeFromCart = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
    setCart(updatedCart.filter((cartItem) => cartItem.quantity > 0));
    setTotalPrice(totalPrice - item.price);
  };


  const showProductDescription = (item) => {
    setSelectedProduct(item);
    setShowDescription(true);
  };


  const hideProductDescription = () => {
    setSelectedProduct(null);
    setShowDescription(false);
  };

  return (
    <div className="App">
      <header>
        <h1>JELLY CAT ONLINE SHOPPY</h1>
        <div className="cart">
          <button className="cart-icon" onClick={() => setShowCart(!showCart)}>
            <img src={cartIconUrl} alt="Shopping Cart" className="cart-image" />
            <span className="cart-price">${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </header>
      <main>
        <div className="merchandise-list">
          {merchandiseData.map((item) => (
            <div key={item.id} className="item">
              <div onClick={() => showProductDescription(item)}>
                <img src={item.imageUrl} alt={item.name} className="product-image" />
                <h2>{item.name}</h2>
              </div>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="modal">
          <h2>Shopping Cart</h2>
          {cart.map((cartItem) => (
            <div key={cartItem.id} className="cart-item">
              <p>{cartItem.name} - Quantity: {cartItem.quantity}</p>
              <button onClick={() => removeFromCart(cartItem)}>Remove</button>
            </div>
          ))}
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button onClick={() => setShowCart(false)}>Close</button>
        </div>
      )}
      {/* Product Description Modal */}
      {showDescription && (
        <div className="modal">
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="product-image" />
          <p>{selectedProduct.description}</p>
          <button onClick={hideProductDescription}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
