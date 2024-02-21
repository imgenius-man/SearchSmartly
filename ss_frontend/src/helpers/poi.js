import axios from "axios";

export const getSearchData = async ({ search, filters, currentPage, setResponseData, setTotalPages }) => {
  try {
    const result = await axios.get(`http://127.0.0.1:8000/?search=${search}&filter=${filters}&page=${currentPage}`);
    if (result && result.data) {
      setResponseData(result.data.data);
      setTotalPages(result.data.total_pages);
    } else {
      console.log("Error occurred");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOptions = async (setOptions) => {
  try {
    const result = await axios.get("http://127.0.0.1:8000/options");
    if (result && result.data) {
      let categories = result.data.categories.map((value, index) => {
        return { name: value, id: index };
      });
      setOptions(categories);
    } else {
      console.log("Error occurred");
    }
  } catch (error) {
    console.log(error);
  }
};
