import Api from '@/services/Api';

interface SwapCreateModel {
  title: string;
  description: string;
  coverUrl: string;
  platform: number;
}

export default {
  show(userId: number, params?: object) {
    return Api().get(`profile/${userId}`, {
      params,
    });
  },
  swaps(userId: number, params?: object) {
    return Api().get(`profile/${userId}/swaps`, {
      params,
    });
  },
};
