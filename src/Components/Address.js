import axios from "axios";
import { useEffect, useReducer } from "react";
import { API_URL } from "../utilities";

const addressReducer = (state, { payload, type }) => {
  switch (type) {
      
    case "SET_NAME": {
      return {
        ...state,
        name: payload,
      };
    }
    case "SET_ADDRESS": {
      return {
        ...state,
        address: payload,
      };
    }
    case "SET_CITY": {
      return {
        ...state,
        city: payload,
      };
    }
    case "SET_PINCODE": {
      return {
        ...state,
        pincode: payload,
      };
    }
    default: {
      return new Error("Unhandled action type");
    }
  }
};


export const Address = () => {
  const [addressState, addressDispatch] = useReducer(addressReducer, {
    name: "",
    address: "",
    city: "",
    pincode: "0000",
  });

  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: `${API_URL}/address`,
        method: "POST",
        data: {
          name: addressState.name,
          address: addressState.address,
          city: addressState.city,
          pincode: addressState.pincode,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="address-form" onSubmit={saveAddress}>
        <h2 className="address-form__heading">Address</h2>
        <div className="address-form__fields-wrapper">
          <label>Name:</label>
          <div className="input-field-wrapper">
            <input
              value={addressState.name}
              onChange={(e) =>
                addressDispatch({ type: "SET_NAME", payload: e.target.value })
              }
              className="username-input"
              type="text"
              placeholder="john doe"
              required
            />
          </div>
          <br />
          <label>Address:</label>
          <div className="input-field-wrapper">
            <input
              value={addressState.address}
              onChange={(e) =>
                addressDispatch({
                  type: "SET_ADDRESS",
                  payload: e.target.value,
                })
              }
              className="username-input"
              placeholder="House nos 123, lane nos 24,Silver lake"
              required
            />
          </div>
          <label>City:</label>
          <div className="input-field-wrapper">
            <input
              value={addressState.city}
              onChange={(e) =>
                addressDispatch({ type: "SET_CITY", payload: e.target.value })
              }
              className="username-input"
              placeholder="Mumbai"
              required
            />
          </div>
          <label>Pincode:</label>
          <div className="input-field-wrapper">
            <input
              value={addressState.pincode}
              onChange={(e) =>
                addressDispatch({
                  type: "SET_PINCODE",
                  payload: e.target.value,
                })
              }
              className="username-input"
              placeholder="400001"
              required
            />
          </div>

          <button className="btn btn-primary stretch" type="submit" >
            {" "}
            Save{" "}
          </button>
        </div>
        <p style={{ margin: "0.5rem 0", textAlign: "center" }}>
          --------OR---------
        </p>
        <button
          className="btn btn-outline-primary stretch"
          style={{ borderWidth: "1px", marginTop: "0.5rem" }}
        >
          Use Test Address
        </button>
      </form>
    </div>
  );
};
