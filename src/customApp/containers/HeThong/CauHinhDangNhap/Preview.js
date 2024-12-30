import html2canvas from 'html2canvas';
import {useRef, useEffect} from 'react';
import axios from 'axios';
const LoginPagePreview = () => {
  const loginPageRef = useRef();

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = axios.get('https://kntcv2dev.gosol.com.vn/');
        const htmlContent = await response.text();
        // Set nội dung HTML vào useRef
        loginPageRef.current.innerHTML = htmlContent;

        // Tạo trình xem trước bằng html2canvas
        const canvas = await html2canvas(loginPageRef.current, {useCORS: true});
        const previewImage = new Image();
        previewImage.src = canvas.toDataURL('image/png');
        document.body.appendChild(previewImage);
      } catch (error) {
        console.error('Error fetching or rendering HTML:', error);
      }
    };

    fetchHtmlContent();
  }, []);
  return <div ref={loginPageRef} />;
};

export default LoginPagePreview;
