import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import URL from "@/app/url";
import axios from "axios";

export function useFetchPatch<T>(urlEndpoint: string, id: string, data?: T) {
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );
  const fetchFunction = () => {
    axios
      .patch(
        `${URL}${urlEndpoint}/${id}`,
        { data },
        {
          headers: { "Accept-Language": "hu", Authorization: token },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return fetchFunction;
}
