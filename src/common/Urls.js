
import Env from './Env';

const CURRENT_ENV = Env.CURR_ENV;

const BASE_URL = {
    LOCAL: 'http://localhost:8007',
    PROD: 'http://starlord.hackerearth.com',
};

export default {
    getBooksDetail: () => ({
      GET_BOOKS_DETAIL: `${BASE_URL[CURRENT_ENV]}/books`,
    }),
};
  