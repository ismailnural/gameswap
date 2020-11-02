import Api from '@/services/Api';

interface SwapCreateModel {
  title: string;
  description: string;
  coverUrl: string;
  platform: number;
}

export default {
  index(search?: string) {
    return Api().get('swaps', {
      params: {
        search,
      },
    });
  },
  show(swapId: number) {
    return Api().get(`swaps/${swapId}`);
  },
  post(swap: SwapCreateModel) {
    return Api().post('swaps', swap);
  },
  put(swapId: number, swap: SwapCreateModel) {
    return Api().put(`swaps/${swapId}`, swap);
  },
};
