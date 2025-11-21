import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for better type safety
export interface Product {
    id?: string | number;
    _id?: string | number;
    name?: string;
    price?: number;
    img?: string;
    quantity?: number;
    [key: string]: any; // For other potential fields
}

export interface CartItem {
    id: string | number;
    name: string;
    price: number;
    img?: string;
    quantity: number;
    total: number;
}

export interface CartState {
    items: CartItem[];
}

// Initial state
const initialState: CartState = {
    items: []
};

// Create slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add/Update item in cart
        // payload: { sp: Product, sl: number } where sl is the delta (can be negative)
        addToCart(state, action: PayloadAction<{ sp: Product; sl: number }>) {
            const { sp, sl } = action.payload;
            
            // Generate consistent ID
            const id = sp.id ?? sp._id ?? `${sp.name}-${String(sp.price ?? 0)}`;
            const price = Number(sp.price ?? 0);
            
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                // Update existing item
                existingItem.quantity = Math.max(0, existingItem.quantity + sl);
                existingItem.price = price; // Update price in case it changed
                existingItem.total = existingItem.quantity * price;
                
                // Remove if quantity becomes 0
                if (existingItem.quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                }
            } else if (sl > 0) {
                // Add new item only if quantity is positive
                state.items.push({
                    id,
                    name: sp.name || 'Unnamed Product',
                    price,
                    img: sp.img,
                    quantity: sl,
                    total: price * sl
                });
            }
        },

        // Remove item from cart
        removeFromCart(state, action: PayloadAction<string | number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        // Clear entire cart
        clearCart(state) {
            state.items = [];
        },

        // Update item quantity directly
        updateQuantity(
            state,
            action: PayloadAction<{ id: string | number; quantity: number }>
        ) {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            
            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                    item.total = item.price * quantity;
                }
            }
        }
    }
});

// Export actions and reducer
export const {
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
} = cartSlice.actions;

export default cartSlice.reducer;

// Selector to get cart total
export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.total, 0);

// Selector to get item count
export const selectCartItemsCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// Selector to get specific item quantity
export const selectItemQuantity = (id: string | number) => 
    (state: { cart: CartState }) => 
        state.cart.items.find(item => item.id === id)?.quantity ?? 0;
