import Api from '@/services/Api';

interface OfferCreateModel {
  swapid: number;
  description: string;
}

export default {
  show(swapId: number, params?: object) {
    return Api().get(`offers/${swapId}`, {
      params,
    });
  },
  add(swap: OfferCreateModel) {
    return Api().post('offers', swap);
  },
  put(swapId: number, swap: OfferCreateModel) {
    return Api().put(`offers/${swapId}`, swap);
  },
};
