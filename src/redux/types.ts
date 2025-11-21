import { CartState } from './slices/cartSlice';
import { OrderState } from './slices/orderSlice';

export interface RootState {
    cart: CartState;
    order: OrderState;
}