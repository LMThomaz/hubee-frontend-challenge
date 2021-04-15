import { Reducer } from 'redux';
import produce from 'immer';
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

      return draft;
    }

    default: {
      return draft;
    }
  }
});

export default cart;
