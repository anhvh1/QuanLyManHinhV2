import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MoreInfoSection = ({ infoMore, onConvertUrl }) => {
  const [isInView, setIsInView] = useState(false); // Theo dõi trạng thái "trong viewport"
  const sectionRef = useRef();
  const { Url, Information, Maxim } = infoMore;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Khi phần tử xuất hiện trong viewport
        } else {
          setIsInView(false); // Khi phần tử ra khỏi viewport
        }
      },
      { threshold: 0.1 } // Ngưỡng hiển thị (10% phần tử trong viewport)
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Quan sát phần tử
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Hủy quan sát
      }
    };
  }, []);

  return (
    <div
      id="moreinfo"
      ref={sectionRef} // Gắn ref để theo dõi viewport
    >
      <div
        className="px-5 bg-no-repeat bg-cover sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 flex-1 lg:mt-0 min-h-[500px] lg:h-[65vh] h-[60vh]"
        style={{ backgroundImage: `url(${onConvertUrl(Url)})` }}
      >
        <div className="max-w-screen-xl mx-auto min-h-[500px]">
          <div className="pt-12 max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10 justify-between">
            {/* Trượt từ trái qua phải */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }} // Trạng thái ban đầu
              animate={isInView ? { x: 0, opacity: 1 } : {}} // Chỉ chạy khi trong viewport
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: Maxim ? Maxim?.replace(/\n/g, "<br>") : "",
                }}
                className="text-white text-lg md:text-lg lg:text-2xl xl:text-4xl"
              ></p>
            </motion.div>

            {/* Trượt từ phải qua trái */}
            {Information ? (
              <motion.div
                className="max-w-[400px] px-10 py-7 bg-white"
                initial={{ x: "100%", opacity: 0 }} // Trạng thái ban đầu
                animate={isInView ? { x: 0, opacity: 1 } : {}} // Chỉ chạy khi trong viewport
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <p className="text-black text-sm md:text-sm lg:text-lg">
                  {Information}
                </p>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoSection;
