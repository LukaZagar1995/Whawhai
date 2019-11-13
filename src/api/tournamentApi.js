import axios from "axios";
import * as ApiKeys from '../constants/apiKeys'

export default axios.create({
  baseURL: ApiKeys.API_BASE_URL
});
