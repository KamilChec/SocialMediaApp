import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    const userObject = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));

    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" className={logo} />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              data-callback="handleCredentialResponse"
              onSuccess={responseGoogle}
              onError={responseGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
