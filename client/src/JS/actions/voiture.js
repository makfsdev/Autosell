import axios from "axios";

export const createVoiture = async (voiture) => {
  return await axios.post(`${process.env.REACT_APP_API}/voiture`, voiture, {});
};

export const getVoituresByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/voitures/${count}`);
};
export const getVoituresByValidationCount = async (validation, count) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/voitures/validation/limit`,
    { validation, count }
  );
};

export const removeVoiture = async (_id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/voiture/${_id}`, {
    headers: {
      authtoken,
    },
  });
};

export const getVoiture = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/voiture/${_id}`);
};

export const updateVoiture = async (_id, voiture, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/voiture/${_id}`,
    voiture,
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const updateValidation = async (_id, validation, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/voiture/update/${_id}`,
    validation,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getVoitures = async (validation, sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/voitures`, {
    validation,
    sort,
    order,
    page,
  });
};

export const getVoituresCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/voitures/total`);
};

export const productStar = async (productId, star, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/voiture/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
};

// serach/filter

export const fetchVoituresByFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};
