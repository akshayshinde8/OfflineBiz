import React, { createContext, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [businesses, setBusinesses] = useState([]); // [{id, name}]
  const [articles, setArticles] = useState([]); // [{id, name, qty, selling_price, business_id}]

  // Business CRUD
  const createBusiness = async name => {
    const item = { id: uuidv4(), name };
    setBusinesses(prev => [...prev, item]);
    return item;
  };

  const updateBusiness = async (id, patch) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, ...patch } : b)),
    );
    return businesses.find(b => b.id === id);
  };

  const deleteBusiness = async id => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
    setArticles(prev => prev.filter(a => a.business_id !== id)); // remove related articles
    return true;
  };

  const listBusinesses = () => businesses;

  // Article CRUD
  const createArticle = async ({ name, qty, selling_price, business_id }) => {
    const item = {
      id: uuidv4(),
      name,
      qty: Number(qty),
      selling_price: Number(selling_price),
      business_id,
    };
    setArticles(prev => [...prev, item]);
    return item;
  };

  const updateArticle = async (id, patch) => {
    setArticles(prev => prev.map(a => (a.id === id ? { ...a, ...patch } : a)));
    return articles.find(a => a.id === id);
  };

  const deleteArticle = async id => {
    setArticles(prev => prev.filter(a => a.id !== id));
    return true;
  };

  const listArticlesByBusiness = business_id =>
    articles.filter(a => a.business_id === business_id);

  const value = useMemo(
    () => ({
      createBusiness,
      updateBusiness,
      deleteBusiness,
      listBusinesses,
      createArticle,
      updateArticle,
      deleteArticle,
      listArticlesByBusiness,
      businesses,
      articles,
    }),
    [businesses, articles],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
