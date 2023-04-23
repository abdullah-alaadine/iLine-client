import { legacy_createStore } from "redux";
import allReducers from "./reducers";

function saveToLocalStorage(store) {
  try {
    if (localStorage.getItem("expirationDate")) {
      window.localStorage.setItem("store", JSON.stringify(store));
    } else {
      window.localStorage.setItem("store", JSON.stringify(store));
      const expirationDate = 24 * 60 * 60 * 1000;
      window.localStorage.setItem("expirationDate", expirationDate);
      setTimeout(() => {
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("store");
        alert("Session is expired! Please login again");
        location.reload();
      }, expirationDate);
    }
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (!serializedStore) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = legacy_createStore(allReducers, persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;