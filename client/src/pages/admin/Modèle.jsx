import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSub, getSub, removeSub, getSubs } from "../../JS/actions/sub";
import { getCategories } from "../../JS/actions/category";
import { DeleteOutlined } from "@ant-design/icons";
import Loading from "../../components/nav/Loading";

const Modèle = () => {
  useEffect(() => {
    loadCategories();
    loadSubs();
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
  const loadSubs = (slug) => {
    !slug
      ? getSubs()
          .then((res) => {
            setSubs(res.data);
          })
          .catch((err) => {
            toast.error("Loading subs Failed ");
          })
      : setCategory(slug);
    getSub(slug)
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => {
        toast.error("Loading subs Failed ");
      });
  };

  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  const handleCreateSub = () => {
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          // loadSubs();
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
        <div className="col">
          {loading ? (
            <Loading />
          ) : (
            <section className="login">
              <div className="loginContainer">
                <label>Liste des Marques</label>
                <select
                  onChange={(e) => loadSubs(e.target.value)}
                  name="category"
                  className=" mode"
                  autoFocus
                >
                  <option value="">select marque</option>
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
                <label>Créer des Modèles</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="btnContainer">
                  <button className="button" onClick={handleCreateSub}>
                    Créer
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
        <div className="col-md-5">
          <ul className="list-group">
            {subs ? (
              subs.map((s) => (
                <li className="list-group-item affiche" key={s._id}>
                  {s.name}
                  <DeleteOutlined
                    className="text-danger"
                    onClick={() => handleRemove(s.slug)}
                  />
                </li>
              ))
            ) : (
              <p>liste des modèles</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modèle;
