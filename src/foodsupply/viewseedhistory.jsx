import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Viewseedhistory = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/food/viewseedhistory", {
        address: window.localStorage.getItem("address"),
      })
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, []);
  const viewseed = (e) => {
    nav("/updateseed", { state: e });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/food/deleteseed", { id: e })
      .then((response) => {
        axios.post("http://localhost:5000/food/viewseed").then((response) => {
          setData(response.data);
          setvalue(response.data);
        });
      });
  };
  const searchdata = (e) => {
    const r = [];

    for (var k of value) {
      var v = 0;

      for (var n of k) {
        n = "" + n;
        if (n.toLowerCase().indexOf(e) !== -1) {
          v = 1;
          break;
        }
      }
      if (v === 1) {
        r.push(k);
      }
    }
    setData(r);
  };

  return (
    <div className="row">
      <div className="col-2">
        <Nav />
      </div>
      <div className="col-10" style={{ width: "80%" }}>
        <h3>My Seed history</h3>
        <input
          type="search"
          onChange={(e) => searchdata(e.target.value)}
          className="form-select"
          placeholder="Search"
        />
        <div className="table-responsive">
          <table className="table table-bordered" id="table_id">
            <thead>
              <tr>
                <th>transacation id</th>
                <th>seedid</th>
                <th>fromid</th>
                <th>toid</th>
                <th>ownerid</th>
                <th>transacation</th>
                <th>remark</th>
                <th>File</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                return (
                  <tr key={d[0]}>
                    <td>{d[0]}</td>
                    <td>{d[1]}</td>
                    <td>{d[2]}</td>
                    <td>{d[3]}</td>
                    <td>{d[4]}</td>
                    <td>{d[5]}</td>
                    <td>{d[6]}</td>
                    <td>{d[7]}</td>
                    <td>{d[8]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Viewseedhistory;
