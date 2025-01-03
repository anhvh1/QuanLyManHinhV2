import React from "react";
import { useInView } from "react-intersection-observer";
import "animate.css";

const ProductSection = ({ listProduct, css }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const { spaceSection } = css;

  return (
    <div
      id="product"
      className={`lg:flex ${spaceSection} items-center px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8`}
    >
      <div className="max-w-screen-xl mx-auto">
        <div
          ref={ref} // Gắn ref vào container để theo dõi nó
          className={`w-full flex lg:mt-0 gap-10 ${
            inView ? "animate__animated" : "" // Thêm class Animate.css khi inView = true
          }`}
        >
          {listProduct &&
            listProduct.map((item, index) => (
              <div
                key={index}
                className={`basis-1/2 ${
                  inView
                    ? index % 2 === 0
                      ? "animate__slideInLeft"
                      : "animate__slideInRight"
                    : ""
                }`}
              >
                <img
                  className="min-h-full"
                  src={item}
                  alt="product"
                  style={{ animationDelay: `${index * 0.2}s` }} // Thêm độ trễ giữa các ảnh
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
