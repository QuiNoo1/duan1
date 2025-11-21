import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Types for shipping information
export interface ShippingInfo {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    country: string;
    note: string;
}

// Types for payment method
export type PaymentMethod = 'cod' | 'card' | 'bank';

// Types for order items
export interface OrderItem {
    id: string | number;
    name: string;
    price: number;
    img?: string;
    quantity: number;
    total?: number;
}

// Types for order status
export type OrderStatus = 'idle' | 'processing' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';

// Current order being processed
export interface CurrentOrder {
    orderId?: string;
    shipping: ShippingInfo;
    paymentMethod: PaymentMethod;
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    total: number;
    status: OrderStatus;
    createdAt?: string;
}

// Historical order with additional fields
export interface OrderHistoryEntry extends CurrentOrder {
    orderId: string;
    createdAt: string;
    status: OrderStatus;
}

// State structure
export interface OrderState {
    current: CurrentOrder;
    history: OrderHistoryEntry[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
}

// Initial state
const initialState: OrderState = {
    current: {
        shipping: {
            fullName: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            country: 'VN',
            note: ''
        },
        paymentMethod: 'cod',
        items: [],
        subtotal: 0,
        shippingFee: 3, // Default shipping fee
        total: 0,
        status: 'idle'
    },
    history: [],
    status: 'idle',
    error: null
};

// Helper function to calculate totals
const calculateTotals = (items: OrderItem[]) => {
    const subtotal = items.reduce((sum, item) => {
        const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
        return sum + itemTotal;
    }, 0);
    return subtotal;
};

// Create the slice
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // Update shipping information
        setShippingInfo(state, action: PayloadAction<Partial<ShippingInfo>>) {
            state.current.shipping = {
                ...state.current.shipping,
                ...action.payload
            };
        },

        // Set payment method
        setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
            state.current.paymentMethod = action.payload;
        },

        // Set shipping fee
        setShippingFee(state, action: PayloadAction<number>) {
            state.current.shippingFee = action.payload;
            state.current.total = state.current.subtotal + action.payload;
        },

        // Set items from cart
        setItemsFromCart(state, action: PayloadAction<OrderItem[]>) {
            const items = action.payload.map(item => ({
                ...item,
                quantity: Math.max(0, Math.floor(Number(item.quantity) || 0)),
                price: Number(item.price) || 0,
                total: (Number(item.price) || 0) * (Number(item.quantity) || 0)
            }));

            state.current.items = items;
            state.current.subtotal = calculateTotals(items);
            state.current.total = state.current.subtotal + state.current.shippingFee;
        },

        // Place order from cart
        placeOrderFromCart(state, action: PayloadAction<{ orderId?: string } | undefined>) {
            const orderId = action.payload?.orderId ?? nanoid(10);
            const entry: OrderHistoryEntry = {
                ...state.current,
                orderId,
                createdAt: new Date().toISOString(),
                status: 'confirmed',
            };

            // Add to history
            state.history.unshift(entry);

            // Reset current order
            state.current = {
                ...initialState.current,
                shippingFee: state.current.shippingFee // Preserve shipping fee setting
            };
        },

        // Update order status
        setOrderStatus(state, action: PayloadAction<{ orderId: string; status: OrderStatus }>) {
            const { orderId, status } = action.payload;
            const historyOrder = state.history.find(order => order.orderId === orderId);
            if (historyOrder) {
                historyOrder.status = status;
            }
        },

        // Clear current order
        clearCurrentOrder(state) {
            state.current = { ...initialState.current };
        },

        // Cancel order
        cancelOrder(state, action: PayloadAction<string>) {
            const order = state.history.find(o => o.orderId === action.payload);
            if (order && order.status !== 'completed') {
                order.status = 'cancelled';
            }
        },
    }
});

// Export actions
export const {
    setShippingInfo,
    setPaymentMethod,
    setShippingFee,
    setItemsFromCart,
    placeOrderFromCart,
    setOrderStatus,
    clearCurrentOrder,
    cancelOrder
} = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;



// Selectors (typed using the app's RootState)
export const selectOrderState = (state: RootState) => state.order;
export const selectCurrentOrder = (state: RootState) => selectOrderState(state).current;
export const selectOrderHistory = (state: RootState) => selectOrderState(state).history;
export const selectOrderStatus = (state: RootState) => selectOrderState(state).status;
export const selectOrderError = (state: RootState) => selectOrderState(state).error;
export const selectOrderById = (orderId: string) => 
    (state: RootState) => selectOrderHistory(state).find((order: OrderHistoryEntry) => order.orderId === orderId);
