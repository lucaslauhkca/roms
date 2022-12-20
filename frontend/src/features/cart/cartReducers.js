import { ADD_TO_CART, DELETE_FROM_CART } from './cartConstants'

let initialCart = {
	cart: [],
};

if (localStorage.getItem('cart')) {
	initialCart.cart = JSON.parse(localStorage.getItem('cart'));
} else {
	initialCart.cart = [];
}

const cartReducers = (state = initialCart, action) => {
	switch (action.type) {
		case ADD_TO_CART:
		case DELETE_FROM_CART:
			return {
				cart: [...action.payload],
			};
		default:
			return state;
	}
};

export default cartReducers;