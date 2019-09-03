import http from "k6/http";
import {
    check,
    fail
} from "k6";


//// VARIABLES
const baseURL = "http://host.docker.internal:8080/";
const loginData = {
    "username": "client",
    "password": "test"
};
const formData = {
    "status": "DRAFT",
    "orderDate": "2019-08-28 22:20:58",
    "items": [{
        "id": 0,
        "isEditing": false,
        "product": {
            "id": "5d67e0c8478e6f10389e8861",
            "name": "Testowy produkt 3"
        },
        "quantity": 7
    }]
};
const headers = {
    headers: {
        "Content-Type": "application/json"
    }
};


//// FUNCTIONS
function loginClient() {
    const login = http.post(baseURL + "/login", loginData);
    check(login, {
        "Login successfully executed": (r) => r.status === 200,
        "Login response time was lower than 1500 ms": (r) => r.timings.duration < 1500
    });
}

function orderItems() {
    const getOrders = http.get(baseURL + "api/orders/?page=0&size=50");
    check(getOrders, {
        "Orders got succesfully": (r) => r.status === 200,
        "Get orders response time was lower than 1500 ms": (r) => r.timings.duration < 1500
    })

    const orderProducts = http.post(baseURL + "api/orders/", JSON.stringify(formData), headers);
    check(orderProducts, {
        "Product successfully ordered": (r) => r.status === 200,
        "Order response is lower than 1500 ms": (r) => r.timings.duration < 1500
    })
}


//// TEST PROCEDURE
export function setup() {
    console.log("Successfully setup");
}

export default function() {
    loginClient();
    orderItems();
}

export function teardown() {
    console.log("Successfully finished");
}