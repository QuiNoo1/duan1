import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    setShippingInfo,
    setPaymentMethod,
    setItemsFromCart,
    placeOrderFromCart,
    setOrderStatus,
    clearCurrentOrder,
    cancelOrder,
    selectCurrentOrder,
    selectOrderHistory,
    selectOrderById,
    selectOrderStatus,
    selectOrderError,
    type ShippingInfo,
    type PaymentMethod,
    type OrderItem,
    type OrderStatus
} from '@/redux/slices/orderSlice';

export const useOrder = () => {
    const dispatch = useAppDispatch();
    const currentOrder = useAppSelector(selectCurrentOrder);
    const orderHistory = useAppSelector(selectOrderHistory);
    const status = useAppSelector(selectOrderStatus);
    const error = useAppSelector(selectOrderError);

    const updateShipping = useCallback((info: Partial<ShippingInfo>) => {
        dispatch(setShippingInfo(info));
    }, [dispatch]);

    const updatePayment = useCallback((method: PaymentMethod) => {
        dispatch(setPaymentMethod(method));
    }, [dispatch]);

    const setItems = useCallback((items: OrderItem[]) => {
        dispatch(setItemsFromCart(items));
    }, [dispatch]);

    const placeOrder = useCallback(() => {
        dispatch(placeOrderFromCart({}));
    }, [dispatch]);

    const updateStatus = useCallback((orderId: string, status: OrderStatus) => {
        dispatch(setOrderStatus({ orderId, status }));
    }, [dispatch]);

    const clearOrder = useCallback(() => {
        dispatch(clearCurrentOrder());
    }, [dispatch]);

    const cancelOrderById = useCallback((orderId: string) => {
        dispatch(cancelOrder(orderId));
    }, [dispatch]);

    const getOrderById = useCallback((orderId: string) => {
        return useAppSelector(selectOrderById(orderId));
    }, []);

    return {
        // State
        currentOrder,
        orderHistory,
        status,
        error,

        // Actions
        updateShipping,
        updatePayment,
        setItems,
        placeOrder,
        updateStatus,
        clearOrder,
        cancelOrderById,
        getOrderById
    };
};