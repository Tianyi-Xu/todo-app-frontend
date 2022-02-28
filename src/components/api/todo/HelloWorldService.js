import axios from "axios";
import { API_URL } from "../../../Constants";

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get(`${API_URL}/hello-world`);
    }

    executeHelloWorldBeanService() {
        return axios.get(`${API_URL}/hello-world-bean`);
    }

    executeHelloWorldNameService(name) {
    
        return axios.get(`${API_URL}/hello-world/${name}`);
    }
}



export default new HelloWorldService();

