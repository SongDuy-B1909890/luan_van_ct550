import React from 'react';

import '../../index.css';

const DescriptionPage = (props) => {
    return (
        <div className="flex w-[450px] h-[675px] py-5 bg-white rounded-xl border shadow overflow-auto">
            <div className="w-full h-full custom-scrollbar-content custom-scrollbar ml-5 mr-5 ">
                <div className="font-bold">
                    Mô tả
                </div>
                <div className="ml-2 mb-2">
                    {/* {props.value} */}
                    <p > "Quà tặng cuộc sống" là một bộ phim hoạt hình đầy cảm hứng và ý nghĩa. Bộ phim này mang đến cho khán giả những câu chuyện động lòng, tạo nên những khoảnh khắc đáng nhớ và truyền cảm hứng về cuộc sống. </p>

                    <p>Với việc sử dụng thước phim hoạt hình, "Quà tặng cuộc sống" tạo ra một thế giới đầy màu sắc và phong cách độc đáo. Bộ phim hướng tới việc truyền đạt những thông điệp tích cực về tình yêu, sự đoàn kết, lòng nhân ái và ý nghĩa của cuộc sống.</p>

                    <p> Từ những nhân vật đáng yêu và tình huống hài hước, "Quà tặng cuộc sống" kể câu chuyện về những thử thách và khó khăn trong cuộc sống hàng ngày. Nhưng qua những tình huống này, nhân vật chính và khán giả được học hỏi và khám phá những giá trị quan trọng như lòng biết ơn, sự chia sẻ và niềm tin vào tương lai.</p>

                    <p>Bộ phim cũng khuyến khích khán giả tiếp tục ủng hộ và lan tỏa thông điệp tích cực bằng cách tham gia bằng cách đăng ký kênh, thích, chia sẻ và để lại bình luận. "Quà tặng cuộc sống" hy vọng truyền tải thông điệp cảm động và trở thành nguồn động lực để mọi người sống cuộc sống ý nghĩa và hạnh phúc hơn.</p>

                    <p> Note: Đây là một đoạn mô tả mẫu và không dựa trên nội dung thực tế của bộ phim "Quà tặng cuộc sống".</p>
                </div>
            </div>
        </div>
    );
};
export default DescriptionPage;