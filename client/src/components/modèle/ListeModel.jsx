import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../JS/actions/category";

const ListeModel = () => {
  const [modeles, setModeles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setModeles(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          modeles.map((m) => (
            <div
              key={m._id}
              className="btn btn-outlined-primary btn-block btn-raised m-3"
            >
              {m.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListeModel;
