import client from "../../api/client";

const anunciosBaseUrl = '/api/v1';

export const createAdvert = (advert, state) => {
    const url = `${anunciosBaseUrl}/adverts`;
    const fd = new FormData();
  fd.append("name", advert.name);
  fd.append("price", advert.price);
  fd.append("sale", advert.sale);
  fd.append("tags", [advert.tags]);
  if (advert.photo) {
    fd.append("photo", advert.photo);
  }

    return client.post(url, fd);
};

export const getAdvertsTags = () => {
	const url = `${anunciosBaseUrl}/adverts/tags`;
	return client.get(url);
};

export const getAllAdverts = () => {
  const url = `${anunciosBaseUrl}/adverts`;
  return client.get(url);
};

export const getFilteredAds = (filter) => {
  const filterList = {
    name: filter.name,
    tags: filter.tags,
    price: [filter.priceMin, filter.priceMax],
    sale: filter.sale,
  };

  const formatFilter = (filter) => {
    const filterKeys = Object.keys(filter);
    let filteredQuery = "";
    for (const key of filterKeys) {
      const value = filter[key];
      if (value) {
        if (Array.isArray(value)) {
          for (const element of value) {
            if (element) {
              filteredQuery += `&${key}=${element}`;
            }
          }
        } else {
          filteredQuery += `&${key}=${filter[key]}`;
        }
      }
    }
    return filteredQuery;
  };
  const url = `${anunciosBaseUrl}/adverts?${formatFilter(filterList)}`;
  return client.get(url);
};

export const createAdverts = (product) => {
  const url = `${anunciosBaseUrl}/adverts`;
  const fd = new FormData();
  fd.append("name", product.name);
  fd.append("price", product.price);
  fd.append("sale", product.sale);
  fd.append("tags", [product.tags]);
  if (product.photo) {
    fd.append("photo", product.photo);
  }

  return client.post(url, fd);
};

export const getAdverts = (advertId) => {
  const url = `${anunciosBaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = (advertId) => {
  const url = `${anunciosBaseUrl}/adverts/${advertId}`;
  return client.delete(url);
};