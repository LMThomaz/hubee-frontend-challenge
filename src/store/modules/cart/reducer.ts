import produce from 'immer';
import { toast } from 'react-toastify';
import { Reducer } from 'redux';
import { ICartState } from './type';

const INITIAL_STATE: ICartState = {
  items: [],
  totalPrice: 0,
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART': {
      const { product } = action.payload;

      const productInCartIndex = draft.items.findIndex((item) => item.productId === product.id);

      if (productInCartIndex >= 0) {
        draft.items[productInCartIndex].amount += 1;
      } else {
        draft.items.push({
          productId: product.id,
          amount: 1,
        });
      }

      draft.totalPrice += product.price;

      toast.success('Produto adicionado ao carrinho');

      return draft;
    }

    case 'DELETE_PRODUCT_TO_CART': {
      const { productId, price } = action.payload;

      const newListProducts = draft.items.filter((item) => item.productId !== productId);

      const amountProduct = draft.items.find(
        (item) => item.productId === productId,
      )?.amount ?? 1;

      draft.totalPrice -= price * amountProduct;

      draft.items = newListProducts;

      toast.success('Produto deletado do carrinho');

      return draft;
    }

    case 'REMOVE_PRODUCT_TO_CART': {
      const { productId, price } = action.payload;

      const productInCartIndex = draft.items.findIndex((item) => item.productId === productId);

      if (draft.items[productInCartIndex].amount > 1) {
        draft.items[productInCartIndex].amount -= 1;
      } else {
        draft.items = draft.items.filter((item) => item.productId !== productId);
      }

      toast.success('Nova quantidade do produto');

      draft.totalPrice -= price;

      return draft;
    }

    case 'ADD_COUPON_TO_CART': {
      const { coupon } = action.payload;

      draft.coupon = coupon.key;

      toast.success(`Cupom ${coupon.key} aplicado com sucesso`);

      return draft;
    }

    case 'CLEAR_CART': {
      return INITIAL_STATE;
    }

    default: {
      return draft;
    }
  }
});

export default cart;
