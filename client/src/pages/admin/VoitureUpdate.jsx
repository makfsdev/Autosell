import React, { useEffect, useState } from "react";
import { Form, Input, PageHeader, Button, Select } from "antd";
import { LoadingOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  getCategory,
  getCategories,
  getCategorySubs,
} from "../../JS/actions/category";
import { getVoiture, updateVoiture } from "../../JS/actions/voiture";
import { getSubs } from "../../JS/actions/sub";
import FileUpload from "../../components/form/FileUpload";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";

const VoitureUpdate = ({ match }) => {
  const { _id } = match.params;
  const year = new Date().getFullYear();
  const years = Array.from(new Array(30), (val, index) => year - index);

  const loadCategories = () => {
    getCategories()
      .then((c) => {
        setCategories(c.data);
      })
      .catch((err) => {
        toast.error("Loading Marques Failed ");
      });
  };
  useEffect(() => {
    loadCategories();
    loadVoiture();
  }, []);

  const loadVoiture = () => {
    getVoiture(_id)
      .then((res) => {
        setVoiture(res.data);
      })
      .catch((err) => {
        toast.error("Loading Voiture Failed ");
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
      : getCategory(slug)
          .then((res) => {
            setMarque(res.data.name);
          })
          .catch((err) => {
            toast.error("Loading Marque Failed ");
          });

    getCategorySubs(slug)
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => {
        toast.error("Loading subs Failed ");
      });
  };
  const [voiture, setVoiture] = useState("");
  const [marque, setMarque] = useState();
  const [modèle, setModèle] = useState();
  const [année, setAnnée] = useState();
  const [carrosserie, setCarrosserie] = useState();
  const [motorisation, setMotorisation] = useState();
  const [version, setVersion] = useState();
  const [kilométrage, setKilométrage] = useState();
  const [delai, setDelai] = useState();
  const [prix, setPrix] = useState();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [autre, setAutre] = useState();
  const [validation, setValidation] = useState();

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = () => {
    const values = {
      marque,
      modèle,
      année,
      carrosserie,
      motorisation,
      version,
      kilométrage,
      delai,
      autre,
      prix,
      images,
      email,
      phone,
      validation,
    };
    console.log(values);
    setLoading(true);
    updateVoiture(voiture._id, values, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);

        window.alert(`voiture enregistrer avec succès`);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  return (
    <>
      <Form
        className="p-3 Form-site-page-header"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"default"}
      >
        <PageHeader
          className="site-page-header"
          title="Modifier les informations suivantes des voiture à consulter"
          subTitle="(N° Téléphone est obligatoire)* "
        />
        <Form.Item label="Marque">
          <Select
            placeholder={voiture.marque}
            onSelect={(e) => loadSubs(e)}
            autoFocus
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Modèle">
          <Select placeholder={voiture.modèle} onSelect={(e) => setModèle(e)}>
            {subs.length > 0 &&
              subs.map((c) => (
                <Select.Option key={c._id} value={c.name}>
                  {c.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Année">
          <Select onSelect={(e) => setAnnée(e)} placeholder={voiture.année}>
            {years.map((year, index) => {
              return (
                <Select.Option key={`year${index}`} value={year}>
                  {year}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Carrosserie">
          <Select
            onSelect={(e) => setCarrosserie(e)}
            placeholder={voiture.carrosserie}
          >
            <Select.Option value="Break">Break</Select.Option>
            <Select.Option value="Berline">Berline</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Motorisation">
          <Select
            placeholder={voiture.motorisation}
            onSelect={(e) => setMotorisation(e)}
          >
            <Select.Option value="Essence">Essence</Select.Option>
            <Select.Option value="Diesel">Diesel</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Version">
          <Select placeholder={voiture.version} onSelect={(e) => setVersion(e)}>
            <Select.Option value="Boite de vitesse automatique">
              Boite de vitesse automatique
            </Select.Option>
            <Select.Option value="Boite de vitesse manuelle">
              Boite de vitesse manuelle
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Kilométrage">
          <Select
            placeholder={voiture.kilométrage}
            onSelect={(e) => setKilométrage(e)}
          >
            <Select.Option value="5000~10000">entre 5000~10000</Select.Option>
            <Select.Option value="10000~20000">entre 10000~20000</Select.Option>
            <Select.Option value="20000~30000">entre 20000~30000</Select.Option>
            <Select.Option value="30000~40000">entre 30000~40000</Select.Option>
            <Select.Option value="40000~60000">entre 40000~60000</Select.Option>
            <Select.Option value="60000~80000">entre 60000~80000</Select.Option>
            <Select.Option value="80000~100000">
              entre 80000~100000
            </Select.Option>
            <Select.Option value="100000~125000">
              entre 100000~125000
            </Select.Option>
            <Select.Option value="125000~150000">
              entre 125000~150000
            </Select.Option>
            <Select.Option value="plus de 150000">plus de 150000</Select.Option>{" "}
          </Select>
        </Form.Item>
        <Form.Item label="Delai de vente">
          <Select placeholder={voiture.delai} onSelect={(e) => setDelai(e)}>
            <Select.Option value="le plus vite possible">
              le plus vite possible{" "}
            </Select.Option>
            <Select.Option value="Dans les 4 prochaines semaines">
              Dans les 4 prochaines semaines{" "}
            </Select.Option>
            <Select.Option value="Dans les 3 mois">
              Dans les 3 mois{" "}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ajouter des Images">
          <FileUpload
            images={images}
            setImages={setImages}
            setLoading={setLoading}
            setOk={setOk}
          />
          <br />
          <br />
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
              </>
            )}
            {voiture.images &&
              voiture.images.map((image) => (
                <Badge key={image.public_id} style={{ cursor: "pointer" }}>
                  <Avatar
                    src={image.url}
                    size={60}
                    shape="square"
                    style={{ margin: "10px" }}
                  />
                </Badge>
              ))}
          </div>
        </Form.Item>
        <Form.Item label="Prix Proposé">
          <Input
            size="small"
            type="number"
            onChange={(e) => setPrix(e.target.value)}
            placeholder={`€${voiture.prix}`}
            className="text-center"
          />
        </Form.Item>
        <Form.Item label="Autres Informations">
          <Input
            placeholder={voiture.autre}
            size="small"
            onChange={(e) => setAutre(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="E-mail">
          <Input
            placeholder={voiture.email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
          />
        </Form.Item>
        <Form.Item name="phone" label="N° Téléphone">
          <Input
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            size="small"
            className="text-center"
            placeholder={voiture.phone}
          />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={handleSubmit}
            style={{ marginLeft: "180px" }}
            type="primary"
            block
            htmlType="submit"
          >
            Modifier
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default VoitureUpdate;
