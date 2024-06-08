import { useLocation } from "react-router-dom";
import "./Form.css";

const FormDetails = () => {
  const location = useLocation();

  const formData = location.state;

  return (
    <div className="card">
      <center>
        <h2>Form Data</h2>
      </center>
      <div className="divider"></div>
      <ul>
        {Object.keys(formData).map((key, index) => (
          <div className="fields">
            <li className="dataList" key={index}>
              <b>{key}</b>: {formData[key]}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FormDetails;
