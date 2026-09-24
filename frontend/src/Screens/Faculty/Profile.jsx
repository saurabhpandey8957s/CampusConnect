/*import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { ID: router.state.loginid },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              ID: response.data.user[0].ID,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/faculty/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL()}/faculty/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="w-full mx-auto my-8 flex justify-between items-start">
      {data && (
        <>
          <div>
            <p className="text-2xl font-semibold">
              Hello {data[0].firstName} {data[0].middleName} {data[0].lastName}{" "}
              👋
            </p>
            <div className="mt-3">
              <p className="text-lg font-normal mb-2">
                Employee Id: {data[0].ID}
              </p>
              <p className="text-lg font-normal mb-2">Post: {data[0].post}</p>
              <p className="text-lg font-normal mb-2">
                Email Id: {data[0].email}
              </p>
              <p className="text-lg font-normal mb-2">
                Phone Number: {data[0].phoneNumber}
              </p>
              <p className="text-lg font-normal mb-2">
                Department: {data[0].department}
              </p>
            </div>
            <button
              className={`${
                showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
              }  px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Change Password" : "Close Change Password"}
            </button>
            {showPass && (
              <form
                className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <button
                  className="mt-4 hover:border-b-2 hover:border-blue-500"
                  onClick={checkPasswordHandler}
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
          <img
            src={process.env.REACT_APP_MEDIA_LINK + "/" + data[0].profile}
            alt="faculty profile"
            className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
          />
        </>
      )}
    </div>
  );
};

export default Profile; */










/*

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { ID: router.state.loginid },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${
                response.data.user[0].middleName || ""
              } ${response.data.user[0].lastName}`,
              ID: response.data.user[0].ID,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.state.loginid, router.state.type, dispatch]);



 useEffect(() => {
    if (data.length > 0) {
      console.log("📷 Profile image filename:", data[0].profile);
    }
  }, [data]);

  





  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${baseApiURL()}/faculty/auth/login`,
        {
          loginid: router.state.loginid,
          password: password.current,
        },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login failed");
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .put(
        `${baseApiURL()}/faculty/auth/update/${id}`,
        {
          loginid: router.state.loginid,
          password: password.new,
        },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Password update failed");
        console.error(error);
      });
  };

  // ✅ Final return JSX
  return (
    <div className="w-full mx-auto my-8 flex justify-between items-start">
      {data && data.length > 0 ? (
        <>
          <div>
            <p className="text-2xl font-semibold">
              Hello {data[0].firstName} {data[0].middleName || ""}{" "}
              {data[0].lastName} 👋
            </p>
            <div className="mt-3">
              <p className="text-lg font-normal mb-2">
                Employee Id: {data[0].ID}
              </p>
              <p className="text-lg font-normal mb-2">Post: {data[0].post}</p>
              <p className="text-lg font-normal mb-2">
                Email Id: {data[0].email}
              </p>
              <p className="text-lg font-normal mb-2">
                Phone Number: {data[0].phoneNumber}
              </p>
              <p className="text-lg font-normal mb-2">
                Department: {data[0].department}
              </p>
            </div>
            <button
              className={`${
                showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
              } px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Close Change Password" : "Change Password"}
            </button>

            {showPass && (
              <form
                className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <button
                  className="mt-4 hover:border-b-2 hover:border-blue-500"
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
          <img
            src={`http://localhost:5001/media/${data[0].profile}`}
            alt="faculty profile"
            className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
          />
        </>
      ) : (
        <p className="text-xl text-gray-600">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
*/





import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState([]);
  const [password, setPassword] = useState({ new: "", current: "" });
  const router = useLocation();
  const dispatch = useDispatch();

  // Debug router values
  useEffect(() => {
    console.log("🔍 router.state:", router.state);
  }, [router.state]);

  // Fetch details
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    const type = router.state?.type;
    const loginid = router.state?.loginid;

    if (!type || !loginid) {
      toast.error("Invalid user session. Try logging in again.");
      return;
    }

    const url = `${baseApiURL()}/${type}/details/getDetails`;
    console.log("🌐 Fetching profile from:", url, "with ID:", loginid);

    axios
      .post(url, { ID: loginid }, { headers })
      .then((response) => {
        console.log("✅ Profile API Response:", response.data);
        if (response.data.success && response.data.user.length > 0) {
          const user = response.data.user[0];
          setData(response.data.user);
          dispatch(setUserData({
            fullname: `${user.firstName} ${user.middleName || ""} ${user.lastName}`,
            ID: user.ID,
          }));
        } else {
          toast.error(response.data.message || "No profile found");
        }
      })
      .catch((error) => {
        console.error("❌ Error loading profile:", error);
        toast.error("Failed to load profile");
      });
  }, [router.state, dispatch]);

  // Debug profile image
  useEffect(() => {
    if (data.length > 0) {
      if (data[0]?.profile) {
        console.log("📷 Profile image:", data[0].profile);
      } else {
        console.warn("⚠️ No profile image found in data[0].profile");
      }
    }
  }, [data]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${baseApiURL()}/faculty/auth/login`, {
        loginid: router.state?.loginid,
        password: password.current,
      })
      .then((res) => {
        if (res.data.success) changePasswordHandler(res.data.id);
        else toast.error(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed");
      });
  };

  const changePasswordHandler = (id) => {
    axios
      .put(`${baseApiURL()}/faculty/auth/update/${id}`, {
        loginid: router.state?.loginid,
        password: password.new,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Password update failed");
      });
  };

  return (
    <div className="w-full mx-auto my-8 flex justify-between items-start">
      {data && data.length > 0 ? (
        <>
          <div>
            <p className="text-2xl font-semibold">
              Hello {data[0].firstName} {data[0].middleName || ""} {data[0].lastName} 👋
            </p>
            <div className="mt-3">
              <p className="text-lg mb-2">Employee ID: {data[0].ID}</p>
              <p className="text-lg mb-2">Post: {data[0].post}</p>
              <p className="text-lg mb-2">Email: {data[0].email}</p>
              <p className="text-lg mb-2">Phone: {data[0].phoneNumber}</p>
              <p className="text-lg mb-2">Department: {data[0].department}</p>
            </div>

            <button
              className={`${
                showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
              } px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Close Change Password" : "Change Password"}
            </button>

            {showPass && (
              <form onSubmit={checkPasswordHandler} className="mt-4 flex flex-col items-start">
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  placeholder="Current Password"
                  className="px-3 py-1 border-2 border-blue-500 rounded mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  placeholder="New Password"
                  className="px-3 py-1 border-2 border-blue-500 rounded mt-4"
                />
                <button type="submit" className="mt-4 border-b-2 border-blue-500">
                  Change Password
                </button>
              </form>
            )}
          </div>

          <img
            src={
              data[0].profile
                ? `http://localhost:5001/media/${data[0].profile}`
                : "/default-avatar.png"
            }
            alt="faculty profile"
            className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
          />
        </>
      ) : (
        <p className="text-xl text-gray-600">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
