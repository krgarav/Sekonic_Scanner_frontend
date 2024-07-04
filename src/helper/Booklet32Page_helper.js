import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Create Class
export const fetchProcessData = (id) => get(url.GET_PROCESS_32_PAG_DATA +`?Id=${id}`);
export const scanFiles = () => post(url.SCAN_32_PAGE_FILES);
export const refreshScanner = () => get(url.REFRESH_SCANNER);

