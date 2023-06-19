import axios from "axios";
import React from "react";
import { useMutation, useQuery } from "react-query";

const useCustomTable = ({ url, defaultData }) => {
  // for tableData ---START------------------------------------

  const [page, setPage] = React.useState(0);
  const [length, setLength] = React.useState(0);

  const { isLoading, data, refetch } = useQuery([url, page], () =>
    axios.get("/" + url + "?page=" + page)
  );

  const rows = data?.data?.rows || [];

  React.useEffect(() => {
    setLength(data?.data?.count);
  }, [length, rows]);

  const tableData = {
    rows,
    length,
    isLoading,
    page,
    setPage,
  };

  // for tableData ---END------------------------------------
  // for tablePost/Put ---START------------------------------------
  const postRequest = (data) => axios.post( "/" + url, data);
  const putRequest = (data) =>
    axios.put(`${  "/" + url}/${data?.id}`, data);
  const { mutate } = useMutation(defaultData ? putRequest : postRequest, {
    onSuccess: () => refetch(),
    onError: (err) => console.log(err),
  });

  // for tablePost/Put ---END------------------------------------

  // for tableDelete ---START------------------------------------
  const { mutate: deleteMutate } = useMutation(
    (id) => axios.delete(  "/" + url + "/" + id),
    {
      onSuccess: () => refetch(),
    }
  );
  // for tableDelete ---END------------------------------------

  return { tableData, mutate, deleteMutate };
};

export default useCustomTable;
