import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://kong-0fb7a2b983usvt2n9.kongcloud.dev",
    headers : {
        'Content-Type' : 'application/json'
    },
    timeout: 10000, // 10 segundos
})

// Interceptor para log de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erro na API:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;