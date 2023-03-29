import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

interface CartItemInterface {
    id: number;
    name: string;
    desc: string;
    price: number;
    image: string;
    cartQuantity: number;
}

interface cart {
    cartItems: CartItemInterface[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
}

const getItem = localStorage.getItem('cartItem');
const initialState: cart = {
    cartItems: getItem == null ? [] : JSON.parse(getItem),
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state: any, action: any): void {
            const itemIndex = state.cartItems.findIndex(
                (item: any) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`increased ${action.payload.name} cart quantity`, {
                    position: "bottom-left",
                    autoClose: 1000
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "bottom-left",
                    autoClose: 1000
                });
            }
            localStorage.setItem(`cartItem`, JSON.stringify(state.cartItems));
        },
        removeFromCart(state: any, action: PayloadAction<CartItemInterface>): void {
            const index = state.cartItems.findIndex(
                (p: any) => p.id === action.payload.id
            );
            if (index !== -1) {
                state.cartItems.splice(index, 1);
                toast.success(`${action.payload.name} removed from cart`,
                    {
                        position: "bottom-left",
                        autoClose: 1000
                    }
                );
                localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            }
        },
        decreaseQuantity(state: any, action: any): void {
            const index = state.cartItems.findIndex(
                (p: any) => p.id === action.payload.id
            );
            if (index >= 0 && state.cartItems[index].cartQuantity > 1) {
                state.cartItems[index].cartQuantity -= 1;
                // toast.success(`${action.payload.name} decreased from cart`,
                //     {
                //         position: "bottom-left",
                //         autoClose: 1000
                //     }
                // );
                localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            }
            else if (index >= 0 && state.cartItems[index].cartQuantity == 1) {
                if (confirm("Are you sure ?")) {
                    state.cartItems.splice(index, 1);
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
                    toast.success(`${action.payload.name} removed from cart`,
                        {
                            position: "bottom-left",
                            autoClose: 1000
                        }
                    );
                }
            }
        },
        encreaseQuantity(state: any, action: any): void {
            const index = state.cartItems.findIndex(
                (p: any) => p.id === action.payload.id
            );
            if (index >= 0) {
                state.cartItems[index].cartQuantity += 1;
                // toast.success(`${action.payload.name} encreased to cart`,
                //     {
                //         position: "bottom-left",
                //         autoClose: 1000
                //     }
                // );
                localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            }
        },
        clearCart(state: any, action: PayloadAction<void>): void {
            state.cartItems.splice(0);
            toast.success(` removed all items from cart`,
                {
                    position: "bottom-left",
                    autoClose: 1000
                }
            );

            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        },
        getTotal(state: any, action: PayloadAction<void>): void {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal: any, cartItem: any) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                }, { total: 0, quantity: 0, });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
    }
});

export const { addToCart,
    removeFromCart,
    decreaseQuantity,
    encreaseQuantity,
    clearCart,
    getTotal } = cartSlice.actions;

export default cartSlice.reducer;