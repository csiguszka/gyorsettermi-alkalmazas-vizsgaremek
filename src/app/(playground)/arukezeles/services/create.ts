import { Material } from "@/app/model/material-model";
import axios from "axios";
import ENDPOINTURL from "@/app/url";

export const createStock = (
  d: Material,
  token: string,
  successFunction: (d: Material) => void,
  failedModify: () => void
) => {
  const stockData = {
    name: d._id,
    quantity: d.inStock,
    message: "Létrehozás",
  };
  console.log(stockData);
  axios
    .post(`${ENDPOINTURL}/material/add`, stockData, {
      headers: { "Accept-Language": "hu", Authorization: token },
    })
    .then(function () {
      successFunction(d);
      //TODO Send the unit create
    })
    .catch(function (error) {
      console.log(error);
      failedModify();
    });
};
