// src/App.js
import React, { useEffect } from "react";
import Header from "./Header";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import { Container } from "./styled";
import Product from "./Product";
import HeaderBackground from "../../../../image/LandingPage/background_header.png";
import MoreBackground from "../../../../image/LandingPage/background_more.png";
import Avatar from "../../../../image/LandingPage/future_item.png";
import Avatar2 from "../../../../image/LandingPage/future_item2.png";
import Avatar3 from "../../../../image/LandingPage/future_item3.png";
import ProductRight from "../../../../image/LandingPage/product_show.png";
import ProductLeft from "../../../../image/LandingPage/product_show2.jpg";
import Star from "../../../../image/LandingPage/star.png";
import Conmma from "../../../../image/LandingPage/comma.png";
import MoreInfo from "./MoreInfo";
import apiConfigLandingPage from "../ConfigLandingPage/config";
import { useState } from "react";
import { message } from "antd";
function LandingPage() {
  const [dataLandingPage, setDataLandingPage] = useState({
    generalInfo: {
      SoftwareName: "",
      CompanyName: "",
    },
    header: {
      Title: "",
      file: null,
      Url: "",
      FileId: 0,
    },
    product: {
      Title: "",
      Images: [],
    },
    features: {
      Title: "",
      Items: [
        {
          Content: "",
          Url: Star,
          FileId: 0,
        },
        {
          Content: "",
          Url: Star,
          FileId: 0,
        },
        {
          Content: "",
          Url: Star,
          FileId: 0,
        },
      ],
    },
    responses: {
      Title: "",
      Items: [
        {
          Content: "",
          UserName: "",
          UserRole: "",
          Url: Avatar,
          file: null,
          FileId: 0,
        },
        {
          Content: "",
          UserName: "",
          UserRole: "",
          Url: Avatar2,
          file: null,
          FileId: 0,
        },
        {
          Content: "",
          UserName: "",
          UserRole: "",
          Url: Avatar3,
          file: null,
          FileId: 0,
        },
      ],
    },
    moreInfo: {
      file: null,
      Url: "",
      Information: "",
      Maxim: "",
      FileId: 0,
    },
    footer: {
      SocialLinks: [
        { Name: "Facebook", Url: "" },
        { Name: "Twitter", Url: "" },
        { Name: "LinkedIn", Url: "" },
        { Name: "Instagram", Url: "" },
      ],
      ContactDetails: [
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
    },
  });

  const getInfoLandingPage = () => {
    apiConfigLandingPage.GetLandingPage().then((res) => {
      if (res.data.Status > 0) {
        const data = res.data.Data;
        const {
          Features,
          Footer,
          GeneralInfo,
          Header,
          MoreInfo,
          Product,
          Responses,
        } = data;
        setDataLandingPage({
          features: Features,
          footer: Footer,
          generalInfo: GeneralInfo,
          header: Header,
          product: Product,
          responses: Responses,
          moreInfo: MoreInfo,
        });
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };

  useEffect(() => {
    getInfoLandingPage();
  }, []);

  const convertUrlImage = (url) => (url ? url.replace(/\\/g, "/") : "");

  const cssTitle =
    "leading-none font-black text-2xl lg:text-3xl xl:text-5xl text-center font-normal";
  const spaceSection = "py-16 sm:py-20 md:py-30 lg:py-30 xl:py-36 2xl:py-48";
  const {
    generalInfo,
    header,
    product,
    features,
    responses,
    moreInfo,
    footer,
  } = dataLandingPage;
  return (
    <Container>
      <div className=" bg-gray-100 text-gray-900  overflow-y-scroll max-h-screen">
        <div className="overflow-hidden">
          <Header
            css={{ cssTitle, spaceSection }}
            infoHeader={header}
            infoGeneral={generalInfo}
            onConvertUrl={convertUrlImage}
          />
          <main>
            <Product
              css={{ cssTitle, spaceSection }}
              onConvertUrl={convertUrlImage}
              infoProduct={product}
            />
            <Features
              css={{ cssTitle, spaceSection }}
              onConvertUrl={convertUrlImage}
              infoFeature={features}
            />
            <Testimonials
              css={{ cssTitle, spaceSection }}
              infoResponse={responses}
              onConvertUrl={convertUrlImage}
              imgComma={Conmma}
            />
            <MoreInfo
              css={{ cssTitle, spaceSection }}
              onConvertUrl={convertUrlImage}
              infoMore={moreInfo}
            />
          </main>
          <Footer
            onConvertUrl={convertUrlImage}
            css={{ cssTitle, spaceSection }}
            infoFooter={footer}
            infoGeneral={generalInfo}
          />
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;
