import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../JS/actions/category";
import { DeleteOutlined } from "@ant-design/icons";
import Loading from "../../components/nav/Loading";

const Marque = () => {
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("Loading categories Failed ");
      });
  };

  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const createMarque = () => {
    // console.log(name);
    if (!name) {
      toast.error("Marque est invalide");
      return;
    }
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        setName("");
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
            setLoading(false);
          }
        });
    }
  };

  return (
    <div className="fluid">
      <div className="row">
        <div className="col-md-6">
          {loading ? (
            <Loading />
          ) : (
            <section className="login">
              <div className="loginContainer">
                <label>Créer des Marques</label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="btnContainer">
                  <button className="button" onClick={createMarque}>
                    Créer
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            {categories.map((c) => (
              <li className="list-group-item affiche" key={c._id}>
                {c.name}
                <DeleteOutlined
                  className="text-danger"
                  onClick={() => handleRemove(c.slug)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Marque;
