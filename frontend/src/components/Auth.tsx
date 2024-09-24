import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "loh-medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    
  });
  const [error, setError] = useState<string | null>(null);

  async function sendRequest() {
    // Clear previous error
    setError(null);

    // Validate password length
    if (postInputs.password.length < 7) {
      setError("Password must be at least 7 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );

      const jwt = response.data.jwt; // Extracting the JWT correctly
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e: any) {
      // Check for specific error codes
      if (e.response) {
        if (e.response.status === 403 || e.response.status === 404) {
          setError("User not found. Redirecting to sign up...");
          // Redirect to signup after a short delay
          setTimeout(() => {
            navigate("/signup");
          }, 2000); // Redirect after 2 seconds
        } else {
          setError("An error occurred during authentication. Please try again.");
        }
      } else {
        setError("An error occurred. Please check your network connection.");
      }
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              {type === "signup" ? "Create an account" : "Sign in to your account"}
            </div>
            <div className="text-slate-400">
              {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link to={type === "signin" ? "/signup" : "/signin"} className="pl-2 underline">
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="pt-8">
            <LabelledInput
              label="Email"
              placeholder="lohitha_dev@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            
            

            <LabelledInput
              label="Password"
              type="password"
              placeholder="gfbyh#$$"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="text-white mt-8 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
            
            {error && <p className="text-red-500 pt-4">{error}</p>} {/* Display error if exists */}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type = "text",
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-black pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
