import _axios from "axios";
import { ENVIRONMENTS } from "./routes";

export const axios = _axios.create({ baseURL: ENVIRONMENTS.LOCAL, });




