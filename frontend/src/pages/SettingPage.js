import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetting, updateSetting } from "../features/setting/settingSlice";
import { useNavigate } from "react-router-dom";
import { getStaffRole } from "../utils/roleHelper";

const SettingPage = () => {
  const { isLoading, setting } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    openHour: "",
    isOpen: true,
  });

  const role = getStaffRole();
  //only owner and managers can edit restaurant setting
  if (role !== "OWNER" && role !== "MANAGER") {
    navigate("/ManageOrder");
  }

  useEffect(() => {
    if (setting) {
      setFormData({
        name: setting.name || "",
        desc: setting.desc || "",
        openHour: setting.openHour || "",
        isOpen: setting.isOpen || "",
      });
    }
  }, [setting]);

  useEffect(() => {
    dispatch(getSetting());
  }, []);

  function handleInputChange(event) {
    const name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(updateSetting({ ...formData, _id: setting._id }));
  };

  return (
    <div className="container">
      <h2 className="text-center pt-5">Setting</h2>
      <form id="form-setting" onSubmit={onSubmit}>
        <div className="card">
          <div className="card-body">
            <div className="mb-3 row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  value={formData.name}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="desc" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  id="desc"
                  name="desc"
                  onChange={handleInputChange}
                  value={formData.desc}
                  type="text"
                  className="form-control"
                  rows={5}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="openHour" className="col-sm-2 col-form-label">
                Open Hours
              </label>
              <div className="col-sm-10">
                <textarea
                  id="openHour"
                  name="openHour"
                  onChange={handleInputChange}
                  value={formData.openHour}
                  type="text"
                  className="form-control"
                  rows={5}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">
                Status<br/>(open/close)
              </label>
              <div className="col-sm-10">
                <div className="form-check form-switch">
                  <input
                    name="isOpen"
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleInputChange}
                    checked={formData.isOpen}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex pt-4">
          <a href="/" className="btn btn-outline-primary ms-auto me-3">
          <i class="bi bi-arrow-return-left"></i> Cancel
          </a>
          <button form="form-setting" className="btn btn-primary">
          <i class="bi bi-pencil-fill"></i> Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingPage;
