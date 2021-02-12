import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";
import {
  getVoituresByValidationCount,
  removeVoiture,
  updateValidation,
} from "../../JS/actions/voiture";
import Loading from "../../components/nav/Loading";
import {
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import check from "../../image marque voiture/car-check.png";

const Dashboard = ({ history }) => {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendre, setVendre] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllVoitures();
  }, []);

  const loadAllVoitures = () => {
    setLoading(true);
    getVoituresByValidationCount(false)
      .then((res) => {
        setVoitures(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    getVoituresByValidationCount(true)
      .then((res) => {
        setVendre(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleUpdateValidation = (_id) => {
    // console.log(_id);
    if (window.confirm("Valider Cette voiture à Vendre ? ")) {
      // console.log("send delete request", slug);

      updateValidation(_id, true, user.token)
        .then((res) => {
          loadAllVoitures();
          toast.success("Voiture en stock à Vendre");
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  const handleRemove = (_id) => {
    if (window.confirm("Suprimer ? ")) {
      // console.log("send delete request", slug);
      removeVoiture(_id, user.token)
        .then((res) => {
          loadAllVoitures();
          toast.error(`Voiture Suprimer`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className="container-fluid p-2 "
            style={{ backgroundColor: "white" }}
          >
            <hr />
            <div
              className="col text-center p-3 "
              style={{ backgroundColor: "#186291" }}
            >
              <h4 style={{ color: "white" }}>
                {voitures.length}/ Voiture(s) à Consulter
              </h4>
            </div>
            <hr />
            <div className="row pt-3">
              <div className="col">
                {!voitures.length ? (
                  <p>Pas de voitures non valider.</p>
                ) : (
                  <table className="table table-border text-center">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Marque</th>
                        <th scope="col">Modèle</th>
                        <th scope="col">Année</th>
                        <th scope="col">Carrosserie</th>
                        <th scope="col">Version</th>
                        <th scope="col">Prix en €</th>
                        <th scope="col">N°Téléphone</th>
                        <th scope="col">Valider</th>
                        <th scope="col">Modifier</th>
                        <th scope="col">Suprimer</th>
                      </tr>
                    </thead>
                    {voitures.map((p) => (
                      <tbody key={p._id}>
                        <tr>
                          <td>
                            <div style={{ width: "80px", height: "auto" }}>
                              <ModalImage
                                large={p.images[0] ? p.images[0].url : check}
                                small={p.images[0] ? p.images[0].url : check}
                              />
                            </div>
                          </td>
                          <td>{p.marque}</td>
                          <td>{p.modèle}</td>
                          <td>{p.année}</td>
                          <td>{p.carrosserie}</td>
                          <td>{p.version}</td>
                          <td>
                            <input
                              value={p.prix}
                              className="form-control input-nbr "
                              type="number"
                              style={{ width: "72px" }}
                            />
                          </td>
                          <td>
                            <input
                              value={p.phone}
                              className="form-control input-nbr "
                              type="number"
                              style={{ width: "118px" }}
                            />
                          </td>
                          <td className="text-center">
                            {p.validation ? (
                              <CheckCircleOutlined
                                style={{ fontSize: "20px" }}
                                className="text-success"
                              />
                            ) : (
                              <CloseCircleOutlined
                                onClick={() => handleUpdateValidation(p._id)}
                                className="text-danger"
                                style={{ fontSize: "20px", cursor: "pointer" }}
                              />
                            )}
                          </td>
                          <td className="text-center">
                            <Link to={`/admin/dashboard/${p._id}`}>
                              {" "}
                              <EditTwoTone
                                style={{ fontSize: "20px", cursor: "pointer" }}
                                className="text-danger"
                              />
                            </Link>
                          </td>
                          <td className="text-center">
                            <CloseOutlined
                              style={{ fontSize: "20px", cursor: "pointer" }}
                              className="text-danger"
                              onClick={() => handleRemove(p._id)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Separation */}

          <div
            className="container-fluid p-2 "
            style={{ backgroundColor: "white" }}
          >
            <hr />
            <div
              className="col text-center p-3"
              style={{ backgroundColor: "#186291" }}
            >
              <h4 style={{ color: "white" }}>
                {vendre.length}/ Voiture(s) à Vendre
              </h4>
            </div>
            <hr />
            <div className="row pt-3">
              <div className="col">
                {!vendre.length ? (
                  <p>Pas de voitures non valider.</p>
                ) : (
                  <table className="table table-border text-center">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Marque</th>
                        <th scope="col">Modèle</th>
                        <th scope="col">Année</th>
                        <th scope="col">Carrosserie</th>
                        <th scope="col">Version</th>
                        <th scope="col">Prix en €</th>
                        <th scope="col">N°Téléphone</th>
                        <th scope="col">Valider</th>
                        <th scope="col">Modifier</th>
                        <th scope="col">Suprimer</th>
                      </tr>
                    </thead>
                    {vendre.map((p) => (
                      <tbody key={p._id}>
                        <tr>
                          <td>
                            <div style={{ width: "80px", height: "auto" }}>
                              <ModalImage
                                large={p.images[0] ? p.images[0].url : check}
                                small={p.images[0] ? p.images[0].url : check}
                              />
                            </div>
                          </td>
                          <td>{p.marque}</td>
                          <td>{p.modèle}</td>
                          <td>{p.année}</td>
                          <td>{p.carrosserie}</td>
                          <td>{p.version}</td>
                          <td>
                            <input
                              value={p.prix}
                              className="form-control input-nbr "
                              type="number"
                              style={{ width: "72px" }}
                            />
                          </td>
                          <td>
                            <input
                              value={p.phone}
                              className="form-control input-nbr "
                              type="number"
                              style={{ width: "118px" }}
                            />
                          </td>
                          <td className="text-center">
                            {p.validation ? (
                              <CheckCircleOutlined
                                style={{ fontSize: "20px" }}
                                className="text-success"
                              />
                            ) : (
                              <CloseCircleOutlined
                                className="text-danger"
                                style={{ fontSize: "20px" }}
                              />
                            )}
                          </td>
                          <td className="text-center">
                            <Link to={`/admin/dashboard/${p._id}`}>
                              {" "}
                              <EditTwoTone
                                style={{ fontSize: "20px", cursor: "pointer" }}
                                className="text-danger"
                              />
                            </Link>
                          </td>
                          <td className="text-center">
                            <CloseOutlined
                              style={{ fontSize: "20px", cursor: "pointer" }}
                              className="text-danger"
                              onClick={() => handleRemove(p._id)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
