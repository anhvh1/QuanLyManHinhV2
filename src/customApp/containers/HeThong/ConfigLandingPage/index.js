import React, { useState, useRef } from "react";
import {
  FaSave,
  FaImage,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import {
  FcDepartment,
  FcCallback,
  FcInTransit,
  FcFeedback,
} from "react-icons/fc";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAdd,
  MdDelete,
} from "react-icons/md";
import { useCallback } from "react";
import { Upload } from "antd";
import { Input } from "../../../../components/uielements/exportComponent";
const ConfigurableLandingPage = () => {
  const featureIcon = "https://cdn-icons-png.flaticon.com/512/1246/1246307.png";
  const responseIcon =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e";

  const [generalInfo, setGeneralInfo] = useState({
    SoftwareName: "",
    CompanyName: "",
  });

  const [header, setHeader] = useState({
    Title: "",
    file: null,
    Url: "",
  });

  const [product, setProduct] = useState({
    Title: "",
    Images: [],
  });

  const [features, setFeatures] = useState({
    Title: "",
    Items: [
      {
        Content: "",
        Url: featureIcon,
      },
      {
        Content: "",
        Url: featureIcon,
      },
      {
        Content: "",
        Url: featureIcon,
      },
    ],
  });

  const [responses, setResponses] = useState({
    Title: "",
    Items: [
      {
        Content: "",
        UserName: "",
        UserRole: "",
        Url: responseIcon,
        file: null,
      },
    ],
  });

  const [moreInfo, setMoreInfo] = useState({
    file: null,
    Url: "",
    Infomation: "",
    Maxim: "",
  });

  const [footer, setFooter] = useState({
    socialLinks: [
      { Name: "Facebook", Url: "" },
      { Name: "Twitter", Url: "" },
      { Name: "LinkedIn", Url: "" },
      { Name: "Instagram", Url: "" },
    ],
    contactDetails: [
      {
        Address: "",
        Name: "",
        Phone: "",
        Email: "",
      },
      {
        Address: "",
        Name: "",
        Phone: "",
        Email: "",
      },
    ],
  });

  const handleHeaderImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeader((prev) => ({
          ...prev,
          file: file,
          Url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImagesChange = (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          Images: [...prev.Images, { Url: reader.result, file }],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMoreInfoImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMoreInfo((prev) => ({
          ...prev,
          file: file,
          Url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserImageChange = (index, gene = "response", file) => {
    if (file) {
      console.log(file, "file");
      const reader = new FileReader();
      reader.onloadend = () => {
        if (gene === "response") {
          const newItems = [...responses.Items];
          newItems[index] = {
            ...newItems[index],
            Url: reader.result,
            file: file,
          };
          setResponses({ ...responses, Items: newItems });
        } else if (gene === "feature") {
          const newItems = [...features.Items];
          newItems[index] = {
            ...newItems[index],
            Url: reader.result,
            file: file,
          };
          setFeatures({ ...responses, Items: newItems });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addFeatureItem = () => {
    setFeatures((prev) => ({
      ...prev,
      Items: [...prev.Items, { Url: featureIcon, Content: "" }],
    }));
  };

  const addResponseItem = () => {
    setResponses((prev) => ({
      ...prev,
      Items: [
        ...prev.Items,
        {
          Content: "",
          UserName: "",
          UserRole: "",
          Url: responseIcon,
          file: null,
        },
      ],
    }));
  };

  const addContactDetail = () => {
    setFooter((prev) => ({
      ...prev,
      contactDetails: [...prev.contactDetails, { type: "Address", value: "" }],
    }));
  };

  const convertNumberToWords = (number) => {
    const units = [
      "",
      "nhất",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ];
    const tens = [
      "",
      "mười",
      "hai mươi",
      "ba mươi",
      "bốn mươi",
      "năm mươi",
      "sáu mươi",
      "bảy mươi",
      "tám mươi",
      "chín mươi",
    ];

    if (number === 0) return "không";

    if (number < 10) return units[number];
    if (number < 20) return "mười " + (number > 10 ? units[number - 10] : "");
    if (number < 100) {
      let tenPart = Math.floor(number / 10);
      let unitPart = number % 10;
      if (unitPart === 0) return tens[tenPart];
      return tens[tenPart] + " " + units[unitPart];
    }

    // Phần cho số >= 100 (tùy chỉnh thêm nếu cần)
    return "Chưa hỗ trợ cho số lớn hơn 99";
  };

  const convertNumberToOrdinal = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return number + "th"; // 11th, 12th, 13th
    }

    return number + (suffixes[lastDigit] || suffixes[0]); // Default "th"
  };

  const handleSave = () => {
    console.log("Saving configuration...", {
      generalInfo,
      header,
      product,
      features,
      responses,
      moreInfo,
      footer,
    });
  };

  const UploadFileImage = (props) => {
    const { onBeforeUpload, index, gene = "feature", isMultiple } = props;
    return (
      <Upload
        multiple={isMultiple}
        className="w-full"
        style={{ width: "100%" }}
        accept=".jpg, .png"
        showUploadList={false}
        actions={false}
        beforeUpload={(file, listFile) => {
          onBeforeUpload(index, gene, file, listFile);
        }}
      >
        {props.children}
      </Upload>
    );
  };

  const cssInput =
    "w-full px-4 py-3 outline-none rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  transition-all duration-200 py-3";
  const buttonUploadImage =
    "w-full transition-all h-[43px] cursor-pointer px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center";
  const cssTitleList = "flex items-center justify-between content-center gap-5";
  const cssLabel = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* General Information */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">General Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className={cssLabel}>Software Name</label>
              <input
                type="text"
                className={cssInput}
                value={generalInfo.SoftwareName}
                onChange={(e) =>
                  setGeneralInfo({
                    ...generalInfo,
                    SoftwareName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={cssLabel}>Company Name</label>
              <input
                type="text"
                className={cssInput}
                value={generalInfo.CompanyName}
                onChange={(e) =>
                  setGeneralInfo({
                    ...generalInfo,
                    CompanyName: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Header Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Header Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className={cssLabel}>Title</label>
              <input
                type="text"
                className={cssInput}
                value={header.Title}
                onChange={(e) =>
                  setHeader({ ...header, Title: e.target.value })
                }
              />
            </div>
            <div>
              <label className={cssLabel}>Background Image</label>
              <div className="mt-1 space-y-4">
                <UploadFileImage
                  onBeforeUpload={(index, gene, file) =>
                    handleHeaderImageChange(file)
                  }
                >
                  <div type="button" className={buttonUploadImage}>
                    <FaImage className="mr-2" />
                    Upload Image
                  </div>
                </UploadFileImage>

                {header.Url && (
                  <div className="relative w-full rounded-lg overflow-hidden">
                    <img
                      src={header.Url}
                      alt="Header background"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-4 rounded-lg w-[35px] text-lg right-2 p-[3px] bg-red-500 text-white  hover:bg-red-600"
                      style={{ borderRadius: "5px" }}
                      onClick={() =>
                        setProduct({
                          ...product,
                          Images: product.Images.filter((_, i) => i !== index),
                        })
                      }
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Product Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className={cssLabel}>Title</label>
              <input
                type="text"
                className={cssInput}
                value={product.Title}
                onChange={(e) =>
                  setProduct({ ...product, Title: e.target.value })
                }
              />
            </div>
            <div>
              <label className={cssLabel}>Product Images</label>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
                {product.Images.map((img, index) => (
                  <div key={index} className="relative aspect-video">
                    <img
                      src={img.Url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 rounded-lg w-[35px] text-lg right-2 p-[3px] bg-red-500 text-white  hover:bg-red-600"
                      style={{ borderRadius: "5px" }}
                      onClick={() =>
                        setProduct({
                          ...product,
                          Images: product.Images.filter((_, i) => i !== index),
                        })
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
                <UploadFileImage
                  isMultiple={true}
                  onBeforeUpload={(index, gene, file, listFile) =>
                    handleProductImagesChange(listFile)
                  }
                >
                  <button className="flex h-48  items-center justify-center border-2 border-dashed border-gray-300 rounded-lg aspect-video hover:border-indigo-500 transition-colors">
                    <FaImage className="w-8 h-8 text-gray-400" />
                  </button>
                </UploadFileImage>
                {/* <button
                  onClick={() => productFileInputRef.current?.click()}
                  className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg aspect-video hover:border-indigo-500 transition-colors"
                >
                  <FaImage className="w-8 h-8 text-gray-400" />
                </button> */}
              </div>
            </div>
          </div>
        </section>

        {/* Features Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Features Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className={cssLabel}>Title</label>
              <input
                type="text"
                className={cssInput}
                value={features.Title}
                onChange={(e) =>
                  setFeatures({ ...features, Title: e.target.value })
                }
              />
            </div>
            <div className="space-y-4">
              {features.Items.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="relative">
                    <UploadFileImage
                      onBeforeUpload={() =>
                        handleUserImageChange(index, "feature", file)
                      }
                    >
                      <img
                        src={item.Url}
                        alt={item.UserName}
                        className="w-16 h-14 rounded-full object-cover"
                      />
                      <button className="absolute bottom-0 right-0 p-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                        <FaImage size={12} />
                      </button>
                    </UploadFileImage>
                  </div>

                  <input
                    type="text"
                    className={cssInput}
                    // className="flex-1 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 py-3 px-4"
                    value={item.Content}
                    placeholder="Feature content"
                    onChange={(e) => {
                      const newItems = [...features.Items];
                      newItems[index].Content = e.target.value;
                      setFeatures({ ...features, Items: newItems });
                    }}
                  />
                  <button
                    onClick={() => {
                      const newItems = features.Items.filter(
                        (_, i) => i !== index
                      );
                      setFeatures({ ...features, Items: newItems });
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              ))}
              <button
                onClick={addFeatureItem}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-800"
              >
                <MdAdd size={20} />
                Add Feature
              </button>
            </div>
          </div>
        </section>

        {/* Responses Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Responses Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className={cssLabel}>Title</label>
              <input
                type="text"
                className={cssInput}
                value={responses.Title}
                onChange={(e) =>
                  setResponses({ ...responses, Title: e.target.value })
                }
              />
            </div>
            <div className="space-y-5">
              <div className={cssTitleList}>
                <p className={cssLabel}>List response customer</p>
                <button
                  onClick={addResponseItem}
                  className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-800"
                >
                  <MdAdd size={20} />
                  Add Response
                </button>
              </div>
              {responses.Items.map((item, index) => (
                <div
                  key={index}
                  className="p-4  border-2 border-gray-200 rounded-lg space-y-4"
                >
                  <div className="flex gap-4 items-start">
                    <div className="relative">
                      <UploadFileImage
                        onBeforeUpload={() =>
                          handleUserImageChange(index, "response", file)
                        }
                      >
                        <img
                          src={item.Url}
                          alt={item.UserName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <button className="absolute bottom-0 right-0 p-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                          <FaImage size={12} />
                        </button>
                      </UploadFileImage>
                    </div>
                    <div className="flex-1 space-y-4">
                      <textarea
                        className={cssInput}
                        value={item.Content}
                        placeholder="Response content"
                        rows="3"
                        onChange={(e) => {
                          const newItems = [...responses.Items];
                          newItems[index].Content = e.target.value;
                          setResponses({ ...responses, Items: newItems });
                        }}
                      />
                      <div className="flex gap-4">
                        <input
                          type="text"
                          className={cssInput}
                          value={item.UserName}
                          placeholder="User Name"
                          onChange={(e) => {
                            const newItems = [...responses.Items];
                            newItems[index].UserName = e.target.value;
                            setResponses({ ...responses, Items: newItems });
                          }}
                        />
                        <input
                          type="text"
                          className={cssInput}
                          value={item.UserRole}
                          placeholder="User role"
                          onChange={(e) => {
                            const newItems = [...responses.Items];
                            newItems[index].UserRole = e.target.value;
                            setResponses({ ...responses, Items: newItems });
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newItems = responses.Items.filter(
                          (_, i) => i !== index
                        );
                        setResponses({ ...responses, Items: newItems });
                      }}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Information */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">More Information</h2>
          <div className="space-y-4">
            <div>
              <label className={cssLabel}>Background Image</label>
              <div className="mt-1 space-y-4">
                <UploadFileImage onBeforeUpload={handleMoreInfoImageChange}>
                  <div type="button" className={buttonUploadImage}>
                    <FaImage className="mr-2" />
                    Upload Image
                  </div>
                </UploadFileImage>

                {moreInfo.Url && (
                  <div className="relative w-full rounded-lg overflow-hidden">
                    <img
                      src={moreInfo.Url}
                      alt="More info background"
                      className="w-full h-full h-12 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={cssLabel}>Information</label>
              <textarea
                className={cssInput}
                rows="5"
                value={moreInfo.Infomation}
                onChange={(e) =>
                  setMoreInfo({ ...moreInfo, Infomation: e.target.value })
                }
              />
            </div>
            <div>
              <label className={cssLabel}>Maxim</label>
              <textarea
                className={`${cssInput} scrollbar-thin scrollbar-thumb-rounded-md`}
                rows="4"
                value={moreInfo.Maxim}
                onChange={(e) =>
                  setMoreInfo({ ...moreInfo, Maxim: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* Footer Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Footer Configuration</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Social Links</h3>
              <div className="space-y-4">
                {footer.socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {link.Name === "Facebook" && (
                      <FaFacebook className="text-blue-600 text-xl" />
                    )}
                    {link.Name === "Twitter" && (
                      <FaTwitter className="text-blue-400 text-xl" />
                    )}
                    {link.Name === "LinkedIn" && (
                      <FaLinkedin className="text-blue-700 text-xl" />
                    )}
                    {link.Name === "Instagram" && (
                      <FaInstagram className="text-pink-600 text-xl" />
                    )}
                    <input
                      type="Url"
                      className={cssInput}
                      placeholder={`${link.Name} URL`}
                      value={link.Url}
                      onChange={(e) => {
                        const newLinks = [...footer.socialLinks];
                        newLinks[index].Url = e.target.value;
                        setFooter({ ...footer, socialLinks: newLinks });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Contact Details</h3>
                <button
                  onClick={addContactDetail}
                  className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-800"
                >
                  <MdAdd size={20} />
                  Add Contact
                </button>
              </div>
              <div className="space-y-4">
                {footer.contactDetails.map((detail, index) => (
                  <>
                    <div className={cssTitleList}>
                      <p className="text-base font-medium">
                        {convertNumberToOrdinal(index + 1)} Address
                        {/* Địa chỉ thứ {convertNumberToWords(index + 1)} */}
                      </p>
                      <button
                        onClick={() => {
                          const newDetails = footer.contactDetails.filter(
                            (_, i) => i !== index
                          );
                          setFooter({ ...footer, contactDetails: newDetails });
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <MdDelete size={24} />
                      </button>
                    </div>
                    <div key={index} className="flex flex-col gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <FcDepartment className="text-blue-600 text-xl" />

                          <input
                            type={"text"}
                            className={cssInput}
                            placeholder={"Name"}
                            value={detail.Name}
                            onChange={(e) => {
                              const newDetails = [...footer.contactDetails];
                              newDetails[index].Name = e.target.value;
                              setFooter({
                                ...footer,
                                contactDetails: newDetails,
                              });
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <FcInTransit className="text-blue-600 text-xl" />

                          <input
                            type={"Nhập địa chỉ"}
                            className={cssInput}
                            placeholder={"Address"}
                            value={detail.Address}
                            onChange={(e) => {
                              const newDetails = [...footer.contactDetails];
                              newDetails[index].Address = e.target.value;
                              setFooter({
                                ...footer,
                                contactDetails: newDetails,
                              });
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <FcCallback className="text-blue-600 text-xl" />

                          <input
                            type={"tel"}
                            className={cssInput}
                            placeholder={"Phone"}
                            value={detail.Phone}
                            onChange={(e) => {
                              const newDetails = [...footer.contactDetails];
                              newDetails[index].Phone = e.target.value;
                              setFooter({
                                ...footer,
                                contactDetails: newDetails,
                              });
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <FcFeedback className="text-blue-600 text-xl" />

                          <input
                            type={"Email"}
                            className={cssInput}
                            placeholder={"Email"}
                            value={detail.Email}
                            onChange={(e) => {
                              const newDetails = [...footer.contactDetails];
                              newDetails[index].Email = e.target.value;
                              setFooter({
                                ...footer,
                                contactDetails: newDetails,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
          >
            <FaSave />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurableLandingPage;
