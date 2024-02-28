import { useEffect, useState } from "react";
import "../scss/style.scss";
import axios from "axios";
export default function EmploymentList() {
  const [addNewStaff, setAddNewStaff] = useState(false);
  const [newForm, setNewForm] = useState("new");
  const [deleteStaff, setDeleteStaff] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSubmit = () => {
    const userName = document.getElementById("userName").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const newStaff = {
      userName,
      dateOfBirth,
      email,
      address,
    };
    axios
      .post("http://localhost:3000/users", newStaff)
      .then((res) => {
        console.log(res);
        setAddNewStaff(false);
      })
      .catch((err) => console.log(err));
  };

  // edit staff function
  const handleEditStaff = () => {
    const userName = document.getElementById("userName").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const editStaff = {
      userName,
      dateOfBirth,
      email,
      address,
    };
    axios
      .put("http://localhost:3000/users/1", editStaff)
      .then((res) => {
        console.log(res);
        setAddNewStaff(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      console.log(res);
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="stylesheet" href="./index.css" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />

      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button
              className="btn btn-primary"
              onClick={() => {
                setNewForm("new");
                setAddNewStaff(true);
              }}
            >
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: "350px" }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" />
          </div>
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={2}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        className={`status ${
                          user.status === "active"
                            ? "status-active"
                            : "status-block"
                        }`}
                      />
                      <span>
                        {user.status === "active"
                          ? "Đang hoạt động"
                          : "Đã bị chặn"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="button button-block"
                      onClick={() => {
                        const newStatus =
                          user.status === "active" ? "block" : "active";
                        axios
                          .patch(`http://localhost:3000/users/${user.id}`, {
                            status: newStatus,
                          })
                          .then((res) => console.log(res))
                          .catch((err) => console.log(err));
                      }}
                    >
                      {user.status === "active" ? "Chặn" : "Mở chặn"}
                    </span>
                  </td>
                  <td>
                    <span
                      className="button button-edit"
                      onClick={() => {
                        setNewForm("edit");
                        setAddNewStaff(true);
                      }}
                    >
                      Sửa
                    </span>
                  </td>
                  <td>
                    <span
                      className="button button-delete"
                      onClick={() => {
                        axios
                          .delete(`http://localhost:3000/users/${user.id}`)
                          .then((res) => {
                            console.log(res);
                            setDeleteStaff(false);
                          });
                      }}
                    >
                      Xóa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected>Hiển thị 10 bản ghi trên trang</option>
              <option>Hiển thị 20 bản ghi trên trang</option>
              <option>Hiển thị 50 bản ghi trên trang</option>
              <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>
      {/* Form thêm mới nhân viên */}
      <div className="overlay" hidden={!addNewStaff}>
        <form className="form">
          <div className="d-flex justify-content-between align-items-center">
            <h4>
              {newForm === "new"
                ? "Thêm mới nhân viên"
                : "Sửa thông tin nhân viên"}
            </h4>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setAddNewStaff(false)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input id="userName" type="text" className="form-control" />
            {/* <div class="form-text error">Họ và tên không được để trống.</div> */}
          </div>
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input id="dateOfBirth" type="date" className="form-control" />
          </div>
          {/* <div class="form-text error">
          Ngày sinh không được lớn hơn ngày hiện tại.
        </div> */}
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input id="email" type="text" className="form-control" />
          </div>
          {/* <div class="form-text error">Email không được để trống.</div> */}
          <div>
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <textarea
              className="form-control"
              id="address"
              rows={3}
              defaultValue={""}
            />
          </div>
          <div>
            {newForm === "new" ? (
              <button className="w-100 btn btn-primary" onClick={handleSubmit}>
                Thêm mới
              </button>
            ) : (
              <button
                className="w-100 btn btn-primary"
                onClick={handleEditStaff}
              >
                Cập nhật
              </button>
            )}
          </div>
        </form>
      </div>
      {/* Modal xác nhận chặn tài khoản */}
      <div className="overlay" hidden>
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn chặn tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light">Hủy</button>
            <button className="btn btn-danger">Xác nhận</button>
          </div>
        </div>
      </div>
      {/* Modal xác nhận xóa tài khoản */}
      <div className="overlay" hidden={!deleteStaff}>
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button
              className="btn btn-light"
              onClick={() => setDeleteStaff(false)}
            >
              Hủy
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setDeleteStaff(false);
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
