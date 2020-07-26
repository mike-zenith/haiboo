import axios from 'axios'

export default function ProductionsApi(baseUrl) {

    return {
        getAll() {
            return axios.get(baseUrl);
        }
    }
}
