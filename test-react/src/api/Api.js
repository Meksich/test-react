import axios from "axios";

const BASE_URL = "http://localhost:3000/cards"

const http = axios.create({
    baseURL: "http://localhost:3000/cards",
    headers: {
        'Content-type': 'application-json'
    }
});

export const getCard = async (id) => {
    const rawResponse = await http.get(`${BASE_URL}/${id}`);
    return rawResponse.data;
}
export const getCardList = async () => {
    const rawResponse = await axios.get(`${BASE_URL}`)
    return rawResponse.data;
}
export const postCard = async (card) => {
    const rawResponse = await axios.post(`${BASE_URL}`, card)
    return rawResponse.data;
}
export const putCard = async (id, card) => {
    const rawResponse = await axios.put(`${BASE_URL}/${id}`, card);
    return rawResponse.data;
}
export const deleteCard = async (id) => {
    const rawResponse = await axios.delete(`${BASE_URL}/${id}`);
    return rawResponse.data;
}