import styled from 'styled-components';

const Wrapper = styled.div`
  img {
    /* Loại bỏ khả năng chọn khi kéo */
    user-select: none;
    /* Loại bỏ sự kiện chuột khi kéo */
    /* pointer-events: none; */
  }

  @keyframes slideAnimation {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(var(--offset));
    }
  }

  * {
    user-select: none;
  }
  .slide-over {
    position: relative;
  }
  .upload-wrap {
    flex-direction: column;
    .upload-target {
      cursor: pointer;
      margin-top: 20px;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 5px;
      p {
        color: #357bd0;
      }
    }
    .image-upload {
      max-width: 200px;
    }
  }
  .configure-item {
    .title-configure {
      font-size: 20px;
      border-radius: 5px;
      background: #e6e3e3;
      padding: 5px 10px;
      display: inline-block;
      margin: 20px 0;
    }
    .suggest {
      color: #ff0000;
    }
    .upload-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .plus-icon {
      font-size: 100px;
      color: #0085c6;
    }

    .swiper {
      margin: 30px 0;
      min-height: 250px;
      .swiper-slide {
        background: #eaeaea;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .custom-div:hover {
  cursor: grab;
}
`;

export default Wrapper;
