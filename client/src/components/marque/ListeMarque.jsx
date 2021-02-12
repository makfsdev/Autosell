import React, { useEffect, useState } from "react";
import { getCategories } from "../../JS/actions/category";

const ListeMarque = () => {
  const [loading, setLoading] = useState(false);
  const [marques, setMarques] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setMarques(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          marques.map((m) => (
            <button
              key={m._id}
              className="col btn btn-outline-primary btn-block btn-raised m-3"
            >
              {m.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ListeMarque;
