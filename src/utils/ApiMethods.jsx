import axios from "axios"

const BaseUrl2 = "https://almenber.codepeak.live/api/v1"
// const baseUrl = "https://pharmacy.codepeak.live/api"
const baseUrl = import.meta.env.VITE_BASE_URL
// console.log(baseUrl);

//api methods
export const getMethod = async (url, token) => {
    let result = {}
    await axios
        .get(baseUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const postMethod = async (url, data, token) => {
    let result = {}
    await axios
        .post(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const putMethod = async (url, data, token) => {
    let result = {}
    await axios
        .put(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const deleteMethod = async (url, token) => {
    let result = {}
    await axios
        .delete(baseUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const postMethodMultipart = async (url, data, token) => {
    let result = {}
    await axios
        .post(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const putMethodMultipart = async (url, data, token) => {
    let result = {}
    await axios
        .put(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const patchMethodMultipart = async (url, data, token) => {
    let result = {}
    await axios
        .patch(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}

export const patchMethod = async (url, data, token) => {
    let result = {}
    await axios
        .patch(baseUrl + url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            result = err.response?.data
        })
    return result
}
