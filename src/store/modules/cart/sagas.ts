import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../../services/api';
import { deleteProductToCart, deleteProductToCartRequest, removeProductToCart, removeProductToCartRequest } from './actions';
import { IProduct } from './type';

type DeleteProductToCartRequest = ReturnType<typeof deleteProductToCartRequest>;
type RemoveProductToCartRequest = ReturnType<typeof removeProductToCartRequest>;

function* getPriceProductToDelete({ payload }: DeleteProductToCartRequest) {
  const { productId } = payload;

  const productResponseResponse: AxiosResponse<IProduct> = yield call(api.get, `products/${productId}`);

  yield put(deleteProductToCart(productId, productResponseResponse.data.price));
}

function* getPriceProductToRemove({ payload }: RemoveProductToCartRequest) {
  const { productId } = payload;

  const productResponseResponse: AxiosResponse<IProduct> = yield call(api.get, `products/${productId}`);

  yield put(removeProductToCart(productId, productResponseResponse.data.price));
}

export default all([
  takeLatest('DELETE_PRODUCT_TO_CART_REQUEST', getPriceProductToDelete),
  takeLatest('REMOVE_PRODUCT_TO_CART_REQUEST', getPriceProductToRemove),
]);
