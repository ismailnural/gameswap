import Api from '@/services/Api';

interface SwapModel {
  id: number;
  uid: number;
  title: string;
  description: string;
  coverUrl: string;
  platform: number;
  status: number;
}

export default {
  index(search: string) {
    return Api().get('swaps', {
      params: {
        search,
      },
    });
  },
  show(swapId: string) {
    return Api().get(`swaps/${swapId}`);
  },
  post(swap: SwapModel) {
    return Api().post('swaps', swap);
  },
  put(swap: SwapModel) {
    return Api().put(`swaps/${swap.id}`, swap);
  },
};
