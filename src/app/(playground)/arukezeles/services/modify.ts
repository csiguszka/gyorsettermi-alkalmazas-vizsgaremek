import { Material } from "@/app/model/material-model";
import axios from "axios";
import URL from "@/app/url";

export const modifyStock = (
  d: Material,
  token: string,
  successFunction: (d: Material) => void,
  failedModify: () => void
) => {
  const stockData = {
    name: d._id,
    quantity: d.quantity,
    message: "Áru feltöltés",
  };
  console.log(stockData);
  axios
    .post(`${URL}/material/add`, stockData, {
      headers: { "Accept-Language": "hu", Authorization: token },
    })
    .then(function () {
      successFunction(d);
      //TODO send the unit update if we have. Do not send quantity update if we do not have
    })
    .catch(function (error) {
      console.log(error);
      failedModify();
    });
};
