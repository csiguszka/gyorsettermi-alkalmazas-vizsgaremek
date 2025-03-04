import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import ENDPOINTURL from "@/app/url";
import axios from "axios";

export function useFetchPatch() {
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );
  const patchFunction = <T>(urlEndpoint: string, id: string, data?: T) => {
    console.log(data);
    axios
      .patch(
        `${ENDPOINTURL}${urlEndpoint}/${id}`,
        { data },
        {
          headers: { "Accept-Language": "hu", Authorization: token },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return patchFunction;
}
