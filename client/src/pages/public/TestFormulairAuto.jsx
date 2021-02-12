import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getCategory,
  getCategories,
  getCategorySubs,
} from "../../JS/actions/category";
import { createVoiture } from "../../JS/actions/voiture";
import { getSubs } from "../../JS/actions/sub";
import { Button } from "antd";
import FileUpload from "../../components/form/FileUpload";
import Axios from "axios";
import { LoadingOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { Avatar, Badge } from "antd";

const TestFormulairAuto = () => {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(30), (val, index) => year - index);

  const { user } = useSelector((state) => ({ ...state }));

  const loadCategories = () => {
    getCategories()
      .then((c) => {
        setCategories(c.data);
      })
      .catch((err) => {
        toast.error("Loading categories Failed ");
      });
  };
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadSubs = (slug) => {
    getCategory(slug)
      .then((res) => {
        setMarque(res.data.name);
      })
      .catch((err) => {
        toast.error("Loading Marque Failed ");
      });
    !slug
      ? getSubs()
          .then((res) => {
            setSubs(res.data);
          })
          .catch((err) => {
            toast.error("Loading subs Failed ");
          })
      : getCategorySubs(slug)
          .then((res) => {
            setSubs(res.data);
          })
          .catch((err) => {
            toast.error("Loading subs Failed ");
          });
  };

  const [switcher, setSwitcher] = useState(1);
  const [marque, setMarque] = useState("");
  const [modèle, setModèle] = useState("");
  const [année, setAnnée] = useState("");
  const [carrosserie, setCarrosserie] = useState("");
  const [motorisation, setMotorisation] = useState("");
  const [version, setVersion] = useState("");
  const [kilométrage, setKilométrage] = useState("");
  const [delai, setDelai] = useState("");
  const [couleur, setCouleur] = useState("");
  const [prix, setPrix] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [view, setView] = useState(false);

  const handleSubmit = () => {
    if (!phone && !email) {
      toast.error("Verifier email ou numéro de télephone");
      return;
    }
    const values = {
      marque,
      modèle,
      année,
      carrosserie,
      motorisation,
      version,
      kilométrage,
      delai,
      couleur,
      prix,
      images,
      email,
      phone,
    };
    console.log(values);
    createVoiture(values)
      .then((res) => {
        // console.log(res);
        window.alert(`voiture enregistrer avec succès`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleRemoveImg = (public_id) => {
    setLoading(true);
    // console.log(public_id);
    Axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id })
      .then((res) => {
        setLoading(false);
        // console.log(res);
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setImages(filteredImages);
      })
      .catch((err) => {
        setLoading(false);
        console.log("CLOUDINARY REMOVE ERROR", err);
      });
  };

  return (
    <>
      {switcher === 1 && (
        <div className="form-auto">
          <div className="row text-center haut-form">
            <div className="col-md-4">
              <h5 className=" green"> Choix du véhicule</h5>
            </div>
            <div className="col-md-4">
              <h5 className="">Informations détaillées</h5>
            </div>
            <div className="col-md-4">
              <h5 className="">Terminer</h5>
            </div>
          </div>
          <div className="row titre text-center">
            <h2>
              Saisissez les informations suivantes et recevez une estimation de
              votre voiture
            </h2>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">Marque</label>
              </div>
              <select
                className="custom-select col-md-6"
                id="inputGroupSelect02"
                onChange={(e) => loadSubs(e.target.value)}
                name={marque}
                autoFocus
              >
                <option key="" value="">
                  choisir marque
                </option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">Modèle</label>
              </div>
              <select
                className="custom-select col-md-6"
                id="inputGroupSelect015"
                onChange={(e) => setModèle(e.target.value)}
                name="category"
              >
                <option value="">select modèle</option>
                {subs.length > 0 &&
                  subs.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">Année</label>
              </div>
              <select
                className="custom-select col-md-6"
                id="inputGroupSelect4"
                onChange={(e) => setAnnée(e.target.value)}
              >
                <option value="">choisir année</option>

                {years.map((year, index) => {
                  return (
                    <option key={`year${index}`} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">
                  Carrosserie
                </label>
              </div>
              <select
                className="custom-select col-md-6"
                id="inputGroupSelect5"
                onChange={(e) => {
                  setCarrosserie(e.target.value);
                }}
                name="Carrosserie"
              >
                <option value="">choisir un modèle</option>
                <option value="Break">Break</option>
                <option value="Berline">Berline</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Button
                style={{
                  backgroundColor: "#e87524",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "60px",
                  marginBottom: "30px",
                }}
                block
                onClick={() => setSwitcher(2)}
              >
                Dernières étapes
              </Button>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      )}
      {switcher === 2 && (
        <div className="form-auto">
          <div className="row text-center haut-form">
            <div className="col-md-4">
              <h5 className=" "> Choix du véhicule</h5>
            </div>
            <div className="col-md-4">
              <h5 className="green">Informations détaillées</h5>
            </div>
            <div className="col-md-4">
              <h5 className="">Terminer</h5>
            </div>
          </div>
          <div className="row titre text-center">
            <h2>
              Saisissez les informations suivantes et recevez une estimation de
              votre voiture
            </h2>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label
                  className="input-group-text text-center "
                  style={{ marginTop: "15px" }}
                >
                  Motorisation
                </label>
              </div>
              <input
                style={{ width: "50%", height: "50px" }}
                className="custom-select col-md-6"
                id="inputGroupSelect6"
                onChange={(e) => {
                  setMotorisation(e.target.value);
                }}
                type="text"
                placeholder="type de moteur --exp-- 1.5 DCI"
              />
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">Version</label>
              </div>
              <select
                className="custom-select col-md-6"
                id="inputGroupSelect7"
                name="Version"
                onChange={(e) => setVersion(e.target.value)}
              >
                <option value="">choisir type</option>
                <option value="Boite de vitesse automatique">
                  Boite de vitesse automatique
                </option>
                <option value="Boite de vitesse manuelle">
                  Boite de vitesse manuelle
                </option>
              </select>
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">
                  Kilométrage
                </label>
              </div>
              <select
                className="custom-select col-md-6"
                id="inputGroupSelect8"
                onChange={(e) => setKilométrage(e.target.value)}
                name="Kilométrage"
              >
                <option value="">choisir le nombre de kms</option>
                <option value="5000~10000">entre 5000~10000</option>
                <option value="10000~20000">entre 10000~20000</option>
                <option value="20000~30000">entre 20000~30000</option>
                <option value="30000~40000">entre 30000~40000</option>
                <option value="40000~60000">entre 40000~60000</option>
                <option value="60000~80000">entre 60000~80000</option>
                <option value="80000~100000">entre 80000~100000</option>
                <option value="100000~125000">entre 100000~125000</option>
                <option value="125000~150000">entre 125000~150000</option>
                <option value="plus de 150000">plus de 150000</option>
              </select>
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">
                  Delai de vente?
                </label>
              </div>
              <select
                className="custom-select col-md-6"
                id="inputGroupSelect9"
                name="delai"
                onChange={(e) => setDelai(e.target.value)}
              >
                <option value="">choisir une option</option>
                <option value="le plus vite possible">
                  le plus vite possible{" "}
                </option>
                <option value="Dans les 4 prochaines semaines">
                  Dans les 4 prochaines semaines{" "}
                </option>
                <option value="Dans les 3 mois">Dans les 3 mois </option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Button
                style={{
                  backgroundColor: "#e87524",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "60px",
                  marginBottom: "30px",
                }}
                block
                onClick={() => setSwitcher(3)}
              >
                Dernières étapes
              </Button>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      )}
      {switcher === 3 && (
        <div className="form-auto">
          <div className="row text-center haut-form">
            <div className="col-md-4">
              <h5 className=" "> Choix du véhicule</h5>
            </div>
            <div className="col-md-4">
              <h5 className="">Informations détaillées</h5>
            </div>
            <div className="col-md-4">
              <h5 className="green">Terminer</h5>
            </div>
          </div>
          <div className="row titre text-center">
            <h2>Autres Informations</h2>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">Couleur</label>
              </div>
              <input
                style={{ width: "50%", height: "50px" }}
                className="custom-select col-md-6"
                id="inputGroupSelect10"
                onChange={(e) => {
                  setCouleur(e.target.value);
                }}
                type="text"
              />
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">
                  Prix proposer
                </label>
              </div>
              <input
                style={{ width: "50%", height: "50px" }}
                className="custom-select col-md-6"
                id="inputGroupSelect11"
                onChange={(e) => {
                  setPrix(e.target.value);
                }}
                type="text"
              />
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">
                  Ajouter des images
                </label>
              </div>
              <FileUpload
                images={images}
                setImages={setImages}
                setLoading={setLoading}
                setOk={setOk}
              />
            </div>
          </div>
          <div className="col text-center" style={{ margin: "0 auto" }}>
            {loading && (
              <LoadingOutlined
                className="text-center"
                style={{ fontSize: "30px" }}
              />
            )}
            {ok && (
              <>
                <CheckCircleTwoTone
                  style={{ color: "green", fontSize: "30px" }}
                />{" "}
                <br />
                <br />
                <button
                  onClick={() =>
                    setView(true) && setOk(true) && setLoading(false)
                  }
                >
                  voir les images
                </button>
                <br />
                <br />
              </>
            )}
            {view &&
              images &&
              images.map((image) => (
                <Badge
                  key={image.public_id}
                  count="X"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveImg(image.public_id)}
                >
                  <Avatar
                    src={image.url}
                    size={60}
                    shape="square"
                    style={{ margin: "10px" }}
                  />
                </Badge>
              ))}
          </div>

          <div className="row mb-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Button
                style={{
                  backgroundColor: "#e87524",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "60px",
                  marginBottom: "30px",
                }}
                block
                onClick={() => setSwitcher(4)}
              >
                Confirmer
              </Button>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      )}
      {switcher === 4 && (
        <div className="form-auto">
          <div className="row text-center haut-form">
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
          <div className="row titre text-center">
            <h2>Email & Verification</h2>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">Email</label>
              </div>
              <input
                style={{ width: "50%", height: "50px" }}
                className="custom-select col-md-6"
                id="inputGroupSelect01"
                value={user ? user.email : email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
              />
            </div>
          </div>
          <div className="row  mt-4">
            <div className="input-group mb-3 milieu-form ">
              <div className="input-group-prepend col-md-3">
                <label className="input-group-text text-center ">
                  N° Téléphone
                </label>
              </div>
              <input
                style={{ width: "50%", height: "50px" }}
                className="custom-select col-md-6"
                id="inputGroupSelect01"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="text"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Button
                style={{
                  backgroundColor: "#e87524",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "60px",
                  marginBottom: "30px",
                }}
                block
                onClick={handleSubmit}
              >
                Valider
              </Button>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestFormulairAuto;
