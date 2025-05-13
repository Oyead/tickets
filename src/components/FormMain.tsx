import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormMain() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate(); // Initialize navigate function

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 500 * 1024) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, avatar: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        avatar: "Image must be under 500KB.",
      }));
    }
  };

  const handleRemove = () => {
    setAvatar(null);
    setPreviewUrl(null);
    setErrors((prev) => ({ ...prev, avatar: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!github.trim()) newErrors.github = "GitHub username is required.";
    if (!avatar) newErrors.avatar = "Please upload an avatar image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        fullName,
        email,
        github,
        avatar: previewUrl,
        ticketNumber: Math.floor(Math.random() * 500),
      };
      localStorage.setItem("ticketData", JSON.stringify(userData));
      navigate("/ticket"); // Navigate to /ticket using React Router
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-no-repeat bg-center px-4">

      <img
        src="/src/assets/images/pattern-circle.svg"
        className="absolute top-[40%] right-[10%] md:right-[20%] w-24 md:w-40 pointer-events-none"
        alt="Pattern Circle"
      />
      <img
        src="/src/assets/images/pattern-squiggly-line-top.svg"
        className="absolute top-10 -right-4 md:w-[390px] pointer-events-none"
        alt="Squiggly Line Top"
      />
      <img
        src="/src/assets/images/pattern-squiggly-line-bottom-desktop.svg"
        className="absolute -bottom-7 -left-10 w-48 md:w-[380px] pointer-events-none"
        alt="Squiggly Line Bottom"
      />

      {/* Content */}
      <div className="w-full text-center mt-6 max-w-2xl mx-auto">
        <div className="inline-block mb-4">
          <img
            src="/src/assets/images/logo-full.svg"
            alt="Logo"
            className="mx-auto w-[350px]"
          />
        </div>

        <div className="headingText text-center px-2">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
            Your Journey to Coding Conf <br />2025 starts here!
          </h1>
          <p className="text-white text-lg sm:text-xl mt-4">
            Secure your spot at next year's biggest coding conference
          </p>
        </div>

        {/* Upload Avatar */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-md">
            <span className="absolute -top-5 left-0 text-white text-sm">
              Upload Avatar
            </span>
            <div className="border-2 border-dashed border-gray-500 rounded-xl h-[200px] flex flex-col items-center justify-center bg-white/5 mt-3 relative">
              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-36 w-36 object-cover rounded-full mb-3"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={() => document.getElementById("avatar-upload")?.click()}
                      className="text-sm text-white underline"
                    >
                      Change
                    </button>
                    <button
                      onClick={handleRemove}
                      className="text-sm text-red-400 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="avatar-upload"
                  className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                >
                  <img
                    src="/src/assets/images/icon-upload.svg"
                    alt="Upload Icon"
                    className="w-12 mb-4"
                  />
                  <p className="text-white">Drag and drop or click to upload</p>
                </label>
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {errors.avatar && (
              <p className="text-red-400 text-sm mt-1">{errors.avatar}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center w-full mt-2">
          <img
            src="/src/assets/images/icon-info.svg"
            className="relative"
            alt="Info Icon"
          />
          <p className="text-white text-sm relative -top-1 ml-2">
            Upload your photo (JPG or PNG, max size: 500KB).
          </p>
        </div>

        {/* Form */}
        <div className="flex mt-10 justify-center">
          <form
            className="relative w-full max-w-md space-y-5 text-left"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="fullName" className="text-white text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="border-2 border-white rounded-lg text-white w-full bg-transparent h-[40px] mt-1 pl-3"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-white text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="border-2 border-white rounded-lg text-white w-full bg-transparent h-[40px] mt-1 pl-3"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="github" className="text-white text-sm">
                GitHub Username
              </label>
              <input
                type="text"
                id="github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="@yourusername"
                className="border-2 border-white rounded-lg text-white w-full bg-transparent h-[40px] mt-1 pl-3"
              />
              {errors.github && (
                <p className="text-red-400 text-sm mt-1">{errors.github}</p>
              )}
            </div>

            <button className="text-[#07022E] font-semibold p-2 bg-orange-500 rounded-lg w-full">
              Generate My Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
