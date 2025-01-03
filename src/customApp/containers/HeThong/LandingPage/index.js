// src/App.js
import React from "react";
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
function LandingPage() {
  const ListTestimonials = [Avatar, Avatar2, Avatar3];
  const ListProduct = [ProductRight, ProductLeft];
  const cssTitle =
    "leading-none font-black text-2xl lg:text-3xl xl:text-5xl text-center font-normal";
  const spaceSection = "py-16 sm:py-20 md:py-30 lg:py-30 xl:py-36 2xl:py-48";
  return (
    <Container>
      <div className=" bg-gray-100 text-gray-900  overflow-y-scroll max-h-screen">
        <div className="overflow-hidden">
          <Header
            css={{ cssTitle, spaceSection }}
            background={HeaderBackground}
          />
          <main>
            <Product
              css={{ cssTitle, spaceSection }}
              listProduct={ListProduct}
            />
            <Features css={{ cssTitle, spaceSection }} imgStar={Star} />
            <Testimonials
              css={{ cssTitle, spaceSection }}
              listImgFuture={ListTestimonials}
              imgComma={Conmma}
            />
            <MoreInfo
              css={{ cssTitle, spaceSection }}
              background={MoreBackground}
            />
          </main>
          <Footer css={{ cssTitle, spaceSection }} />
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;
