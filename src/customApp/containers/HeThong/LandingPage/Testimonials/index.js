import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Testimonials = ({ imgComma, listImgFuture, css }) => {
  const { cssTitle, spaceSection } = css;
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting); // Kiểm tra xem phần tử có vào viewport hay không
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

  const listNameAvatar = ["Bình", "Sang", "Hải"];
  const listPosition = ["Nhân viên", "Giám đốc", "Doanh nhân"];
  const newListImgFuture = listImgFuture
    ? listImgFuture.map((src, index) => ({
        src,
        name: listNameAvatar[index],
        position: listPosition[index],
      }))
    : [];

  const renderImageComma = () => (
    <img
      src={imgComma}
      alt="comma"
      className="h-[30px] w-[30px] lg:h-[45px] lg:w-[45px] xl:h-[60px] xl:w-[60px]"
    />
  );

  const renderImgageFuture = (index) => (
    <img
      src={newListImgFuture[index]?.src}
      alt="avatar"
      className="object-cover h-[45px] w-[45px] lg:h-[60px] lg:w-[60px] xl:h-[80px] xl:w-[80px] rounded-[50%]"
    />
  );

  const ListContentTestimonials = [
    "Sản phẩm GoSmartSignage thực sự đã giúp chúng tôi nâng cao trải nghiệm khách hàng tại các showroom. Tôi rất hài lòng!",
    "Sang, Giám đốc Đội ngũ kỹ thuật hỗ trợ rất nhiệt tình, giúp chúng tôi tùy chỉnh nội dung nhanh chóng. Đây là một giải pháp tối ưu cho các chiến dịch quảng cáo của chúng tôi.",
    "Nhờ GoSmartSignage, nhà hàng của tôi có thể trình chiếu thực đơn và các chương trình khuyến mãi một cách hấp dẫn và chuyên nghiệp. Khách hàng đánh giá cao sự hiện đại và tiện lợi này",
  ];

  return (
    <div
      className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 bg-slate-100"
      id="features"
      ref={sectionRef} // Gắn ref để theo dõi phần tử
    >
      <div className="max-w-screen-xl mx-auto">
        <h3 className={cssTitle}>Trực tiếp từ hành khách của chúng tôi</h3>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-12 ${spaceSection} justify-items-center sm:px-0`}
        >
          {ListContentTestimonials &&
            ListContentTestimonials.map((content, index) => (
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
                // whileHover={{
                //   y: -10, // Nhấc lên 10px khi hover
                //   // boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Thêm bóng mờ
                //   transition: { duration: 0.1, ease: "easeInOut" }, // Thêm thời gian chuyển động khi hover
                // }}
              >
                {/* Nội dung chính */}
                <div className="flex-1 flex flex-col">
                  {renderImageComma()}
                  <p className="mt-5 text-sm lg:text-base xl:text-lg flex-1">
                    {content}
                  </p>
                </div>

                {/* Nội dung phía dưới */}
                <div className="text-sm font-normal gap-3 text-center mt-10 flex items-center">
                  {renderImgageFuture(index)}
                  <div className="flex-1 flex flex-col items-start">
                    <p className="max-w-[80%] sm:max-w-auto text-xs xl:text-lg">
                      {newListImgFuture[index]?.name}
                    </p>
                    <p className="max-w-[80%] sm:max-w-auto text-xs xl:text-lg">
                      {newListImgFuture[index]?.position}
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
