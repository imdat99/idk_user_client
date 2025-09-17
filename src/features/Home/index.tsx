import { authPath } from "lib/constants"
import { ArrowRight, ChartLine, PlayCircle } from "lucide-react"
import { Link } from "react-router"

const HomePage = () => {
    return (
        <>
            <section className=":uno: bg-[linear-gradient(135deg,#6d87fa_0%,#0c2fa3_50%,#0c09b7_100%)] overflow-hidden text-white pb-20 pt-10 md:py-24 relative before:(absolute inset-0 bg-white/10 backdrop-blur-sm content-[''] md:[clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] z-1)"> 
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center ">
                    <div className="md:w-1/2 mb-10 md:mb-0 relative z-10">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6">
                            <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                            <span className="text-sm">Hơn 50.000 Học viên đang theo học</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-[1] mb-6">
                            Học thông minh, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">Học hiệu quả</span>, <br />
                            Học giá rẻ!
                        </h1>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl">
                            Nền tảng ôn thi Đại học hàng đầu với lộ trình học tập cá nhân hóa, phương pháp giảng dạy sáng tạo và đội ngũ giáo viên tận tâm.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to={authPath.login} className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                                <span>Bắt đầu học ngay</span>
                                <ArrowRight className="fas fa-arrow-right ml-2"/> 
                            </Link>
                            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center">
                                <PlayCircle className="fas fa-play-circle mr-3"/>
                                <span>Xem giới thiệu</span>
                            </button>
                        </div>
                        <div className="flex items-center mt-10 space-x-8">
                            <div className="flex items-center">
                                <div className="flex space-x-[-6%] mr-4">
                                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="Student" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="Student" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/men/17.jpg" alt="Student" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold">+50K</div>
                                    <div className="text-sm opacity-80">Học viên theo học</div>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-white/30"></div>
                            <div>
                                <div className="font-semibold">98%</div>
                                <div className="text-sm opacity-80">Đạt hiệu quả tốt</div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center relative">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute -top-10 -left-8 w-72 h-72 bg-white/10 rounded-full animate-pulse-slow"></div>
                            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/20 rounded-full animate-pulse-slow"></div>  
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3">
                                <img src="https://hocmai.vn/media/images/home/desktop/654social-mediatrangptq5-715x400-2.png" alt="Học viên ôn thi" className="w-full h-auto" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 glass-effect rounded-2xl p-2 shadow-lg w-48 z-20">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3 overflow-hidden">
                                        {/* <Trophy size={32} className="text-blue-600 text-xl" />  */}
                                        <img src="https://randomuser.me/api/portraits/men/23.jpg" alt="Student" />
                                    </div>
                                    <div>
                                        <div className="font-bold">Học viên giỏi</div>
                                        <div className="text-sm">Toàn quốc 2023</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-6 -left-6 glass-effect rounded-2xl p-2 shadow-lg w-56 z-20">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                                        <ChartLine size={32} className="text-green-600 text-xl"/> 
                                    </div>
                                    <div>
                                        <div className="font-bold">Tiến bộ ấn tượng</div>
                                        <div className="text-sm">Chỉ sau 1 tháng</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage