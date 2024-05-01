import axios from "axios";

export const getAllReportedListings = async () => {
  try {
    const response = await axios.get(
      "https://firsthome.me/reports/getAllReports",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error fetching reported listings", e);
    throw e;
  }
};
export const getAllListings = async (type) => {
  try {
    const response = await axios.get(
      `https://firsthome.me/listings/getAllListings?type=${type}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error fetching all listings", e);
    throw e;
  }
};
export const searchListing = async (payload) => {
  try {
    const response = await axios.post(
      "https://firsthome.me/listings/searchListings",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error filtering listings", e);
    throw e;
  }
};
export const searchListingById = async (payload) => {
  try {
    const response = await axios.get(
      `https://firsthome.me/listings/getListingbyID?id=${payload.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error searching listing by ID", e);
    throw e;
  }
};

export const getAllSellerListings = async (payload) => {
  try {
    const response = await axios.get(
      `https://firsthome.me/listings/getListingbySeller?sellerID=${payload.sellerId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error getting all seller listings", e);
    throw e;
  }
};

export const updateSellerListing = async (payload = {}) => {
  //   const payloadToSend = { ...payload, date: new Date(payload?.date) };

  try {
    const response = await axios.put(
      `https://firsthome.me/listings/updateAListing`,
      payload,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error updating listing", e);
    throw e;
  }
};

export const postSellerListing = async (payload = {}) => {
  // const payloadToSend = { ...payload, date: new Date(payload?.date) };

  try {
    const response = await axios.post(
      `https://firsthome.me/listings/postAListing`,
      payload,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error posting listing", e);
    throw e;
  }
};

export const uploadSellerImage = async (payload = {}) => {
  // const payloadToSend = { ...payload, date: new Date(payload?.date) };

  try {
    const response = await axios.post(
      `https://firsthome.me/listings/uploadToBucket`,
      payload,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error posting listing", e);
    throw e;
  }
};

export const deleteSellerListing = async (payload = {}) => {
  // const payloadToSend = { ...payload, date: new Date(payload?.date) };

  try {
    const response = await axios.delete(
      `https://firsthome.me/listings/deleteAListing?id=${payload}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error posting listing", e);
    throw e;
  }
};

export const getAllUnapprovedUsers = async () => {
  try {
    const response = await axios.get(
      `https://firsthome.me/users/getAllUnapproved`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error getting all unapproved sellers", e);
    throw e;
  }
};

export const updateSellerStatus = async (payload = {}) => {
  try {
    const response = await axios.post(
      `https://firsthome.me/users/updateOrDeleteUser`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error updating seller status", e);
    throw e;
  }
};

export const reportAListing = async (payload) => {
  try {
    const response = await axios.post(
      `https://firsthome.me/reports/postAReport`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error posting report", e);
    throw e;
  }
};


export const contactSeller = async (payload) => {
  try {
    const response = await axios.post(
      `https://firsthome.me/users/contactSeller`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error sending a message", e);
    throw e;
  }
};
