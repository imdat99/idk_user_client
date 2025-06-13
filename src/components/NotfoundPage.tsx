import { Helmet } from 'react-helmet-async';

const NotfoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen-sm font-[Roboto:100]">
      <Helmet>
        <title>Trang không tìm thấy - 404</title>
        <meta
          name="description"
          content="Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ."
        />
      </Helmet>
      <div className="p-8 space-y-lg max-w-lg w-full">
        <img src="/assets/images/logo.svg" alt="Xemdi Logo" className="h-10" />
        <p>
          <b>404.</b>{' '}
          <ins className="text-gray-500 decoration-none">Đã xảy ra lỗi.</ins>
        </p>
        <div className="font-thin">
          <p>Không tìm thấy URL được yêu cầu trên máy chủ này.</p>
        </div>
      </div>
    </div>
  );
};

export default NotfoundPage;
