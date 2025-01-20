import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Testimonials = ({ infoResponse, css, imgComma }) => {
  const { cssTitle, spaceSection } = css;
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { Title, Items } = infoResponse;

  console.log(Items, "Items");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Khi phần tử vào viewport
        }
      },
      { threshold: 0.5 } // Ngưỡng hiển thị
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Theo dõi phần tử
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Hủy theo dõi
      }
    };
  }, []);

  const renderImageComma = () => (
    <img
      src={imgComma}
      alt="comma"
      className="h-[30px] w-[30px] lg:h-[45px] lg:w-[45px] xl:h-[60px] xl:w-[60px]"
    />
  );

  const renderImgageFuture = (src) => (
    <img
      src={src}
      alt="avatar"
      className="object-cover h-[45px] w-[45px] lg:h-[60px] lg:w-[60px] xl:h-[80px] xl:w-[80px] rounded-[50%]"
    />
  );

  return (
    <div
      className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 bg-slate-100"
      id="features"
      ref={sectionRef} // Gắn ref để theo dõi phần tử
    >
      <div className="max-w-screen-xl mx-auto">
        <h3 className={cssTitle}>{Title}</h3>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-12 ${spaceSection} justify-items-center sm:px-0`}
        >
          {Items &&
            Items.map((response, index) => (
              <motion.div
                key={index}
                className="w-full max-w-sm flex flex-col shadow bg-white p-5 lg:p-10 h-full transform transition-all hover:shadow-lg cursor-pointer"
                initial={{ y: 50, opacity: 0 }} // Vị trí ban đầu
                animate={isInView ? { y: 0, opacity: 1 } : {}} // Animation khi vào viewport
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.2, // Tạo hiệu ứng xuất hiện từng phần tử
                }}
              >
                <div className="flex-1 flex flex-col">
                  {renderImageComma()}
                  <p className="mt-5 text-sm lg:text-base xl:text-lg flex-1">
                    {response.Content}
                  </p>
                </div>

                {/* Nội dung phía dưới */}
                <div className="text-sm font-normal gap-3 text-center mt-10 flex items-center">
                  {renderImgageFuture(response.Url)}
                  <div className="flex-1 flex flex-col items-start">
                    <p className="max-w-[80%] sm:max-w-auto text-xs xl:text-lg">
                      {response?.UserName}
                    </p>
                    <p className="max-w-[80%] sm:max-w-auto text-xs xl:text-lg">
                      {response?.UserRole}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
